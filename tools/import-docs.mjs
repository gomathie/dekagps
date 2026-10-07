#!/usr/bin/env node
/**
 * tools/import-docs.mjs
 *
 * Imports the upstream Dr.Explain user guide export into this project as
 * white-labeled, structured content.
 *
 * Why a generator instead of a runtime fetch: the reference site must never be
 * a runtime dependency of this website, and the content has to be reviewable
 * and editable in the repository (see IMPLEMENTATION_PLAN.md).
 *
 * Per version it:
 *   1. reads the reference `contents.html` and rebuilds the navigation tree
 *      from the entry indentation (`padding-left: Npt` → depth = Npt / 20);
 *   2. fetches every page, extracts the body region
 *      (`<div class="description_on_page">`) and converts it into a small typed
 *      block tree (headings, paragraphs, lists, tables, images, quotes, …);
 *   3. rewrites branding and source-vendor hostnames in text, attributes and slugs;
 *   4. mirrors images, downscaled + re-encoded (IMPLEMENTATION_PLAN.md D1);
 *   5. writes `src/docs/**` ES modules consumed by the Vue docs view.
 *
 * External HTTP(S) links are intentionally unwrapped. A white-label guide must
 * not send users back to the source vendor, and the imported output is verified
 * to contain no outbound documentation links.
 *
 * The Dr.Explain tab widget is not converted — none of the imported versions
 * uses it (0 tab blocks across all four versions). A future version that ships
 * one would need a `tabs` branch both here and in src/components/docs/DocsBlocks.vue;
 * until then those panels are the one construct that would not appear.
 *
 * Usage:
 *   node tools/import-docs.mjs                          # every version
 *   node tools/import-docs.mjs --versions=7.10          # one or more versions
 *   node tools/import-docs.mjs --versions=7.10 --fresh  # ignore cache and generated files
 *   node tools/import-docs.mjs --only=concepts.html     # debug one page (prints blocks)
 *   node tools/import-docs.mjs --no-images               # import text only
 *   node tools/import-docs.mjs --rename-assets           # re-apply the asset naming rules
 *
 * Runs are resumable: HTML is cached in node_modules/.cache/docs-import and
 * already mirrored images are reused instead of re-downloaded.
 */

import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, rename, stat, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import https from 'node:https'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const REF_ORIGIN = 'https://docs.pilot-gps.africa/'
const CACHE_DIR = path.join(ROOT, 'node_modules', '.cache', 'docs-import')
const STAGING_DIR = path.join(CACHE_DIR, 'staging')
const ASSET_DIR = path.join(ROOT, 'public', 'docs-assets', 'images')
const RESIZE_SCRIPT = path.join(ROOT, 'tools', 'resize-images.ps1')
const DOCS_DIR = path.join(ROOT, 'src', 'docs')
const CONTENT_DIR = path.join(DOCS_DIR, 'content')
const NAV_DIR = path.join(DOCS_DIR, 'nav')
const SEARCH_DIR = path.join(DOCS_DIR, 'search')

const PAGES_PER_CHUNK = 25
const PAGE_BATCH = 40
const IMAGE_BATCH = 50
const IMAGE_MAX_WIDTH = 900
const IMAGE_JPEG_QUALITY = 72
const PAGE_CONCURRENCY = 6
const IMAGE_CONCURRENCY = 10

/**
 * Brand replacement. Order matters: the specific company name first.
 * `pilot` (lower case) also appears in page and asset file names, which is why
 * slugs are derived after this replacement.
 */
const BRAND_REPLACEMENTS = [
  [/\bPilot\s+GPS\s+Africa\b/g, 'OneGPS'],
  [/\bPILOT\s+GPS\b/g, 'OneGPS'],
  [/\bPILOT\b/g, 'OneGPS'],
  [/\bPilot\b/g, 'OneGPS'],
  [/\bpilot\b/g, 'OneGPS']
]

/** Hosts that belong to the source documentation and become SPA links. */
const DOCS_HOSTS = ['docs.pilot-gps.africa']
const PRODUCT_HOSTS = [/^https?:\/\/(?:www\.)?pilot-gps\.(?:africa|com)(?:\/|$)/i]

/**
 * Source-vendor URL and identifier text must not leak into the white-label docs.
 * These replacements run only on protected URL-like tokens, before normal brand
 * replacement resumes on the surrounding text.
 */
const SOURCE_URL_REPLACEMENTS = [
  [/\bdocs\.pilot-gps\.africa\b/gi, 'onegps.africa/docs'],
  [/\b([a-z0-9-]+)\.pilot-gps\.(?:africa|com|ru)\b/gi, '$1.<server_address>'],
  [/\b(?:www\.)?pilot-gps\.(?:africa|com|ru)\b/gi, 'onegps.africa'],
  [/\bpilot-telematics\.com\b/gi, 'telematics-vendor.example'],
  [/\bgithub\.com\/pilot-telematics\/pilot_extensions\b/gi, 'github.com/<vendor>/extensions'],
  [/\bcom\.pilot\./gi, 'com.onegps.'],
  [/\bcom\.octys\.pilottracker\b/gi, 'com.onegps.tracker'],
  [/\bitunes\.apple\.com\/us\/app\/pilot\b/gi, 'itunes.apple.com/us/app/onegps'],
  [/\bru\.octys\.pilot(?:or|tracker)?\b/gi, 'com.onegps.mobile']
]

const SOURCE_IDENTIFIER_REPLACEMENTS = [
  [/\bPilotGpsBot\b/g, 'OneGPSBot'],
  [/\bPilotAfricaBot\b/g, 'OneGPSAfricaBot'],
  [/\bksa_pilot_bot\b/gi, 'onegps_bot'],
  [/\bpilot2285_bot\b/gi, 'onegps_bot'],
  [/\bpilot_map_url\b/gi, 'onegps_map_url'],
  [/\bpilot_task_id\b/gi, 'onegps_task_id'],
  [/\bpilot_extensions\b/gi, 'onegps_extensions'],
  [/\blanguages_pilot_edit\b/gi, 'languages_onegps_edit'],
  [/\bget_waybill_for_pilot\b/gi, 'get_waybill'],
  [/\b_waybill_for_pilot\b/gi, '_waybill'],
  [/\bpilot-swagger\b/gi, 'onegps-swagger'],
  [/\bpilot-gps\b/gi, 'onegps'],
  [/\bpilotgps\b/gi, 'onegps']
]

/**
 * URLs, hosts and dotted identifiers are protected from the generic word pass:
 * applying the word-level brand rules inside them turns `pilot-gps.com` into
 * the nonsense `OneGPS-gps.com`. Source-vendor URL tokens are then explicitly
 * white-labeled by `whiteLabelProtectedToken()`.
 */
const URL_LIKE = /(?:[A-Za-z][A-Za-z0-9+.-]*:\/\/|www\.)[^\s"'<>()]+|[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/g

const args = new Map(
  process.argv.slice(2).map((raw) => {
    const [key, value] = raw.replace(/^--/, '').split('=')
    return [key, value ?? true]
  })
)

const FRESH = args.has('fresh')
const SKIP_IMAGES = args.has('no-images')
const RENAME_ASSETS = args.has('rename-assets')
const ONLY_PAGE = typeof args.get('only') === 'string' ? args.get('only') : null
const ONLY_VERSIONS = (() => {
  const value = args.get('versions')
  if (value === true) return new Set(['7.10'])
  if (typeof value === 'string') return new Set(value.split(',').map((v) => v.trim()))
  return null
})()

const VERSIONS = [
  { id: '7.10', label: '7.10', base: REF_ORIGIN, current: true, note: 'Current version' },
  { id: '7.9', label: '7.9', base: `${REF_ORIGIN}7.9/`, note: 'Previous version' },
  { id: '7.8', label: '7.8', base: `${REF_ORIGIN}7.8/`, note: 'Previous version' },
  { id: '7.7', label: '7.7', base: `${REF_ORIGIN}7.7/`, note: 'Previous version' }
]

/* ─────────────────────────────── network ─────────────────────────────── */

const agent = new https.Agent({ keepAlive: true, maxSockets: IMAGE_CONCURRENCY + 2 })
const fetchStats = { requests: 0, bytes: 0 }

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { agent, headers: { 'user-agent': 'OneGPS-docs-importer' } }, (response) => {
      if (response.statusCode !== 200) {
        response.resume()
        reject(new Error(`HTTP ${response.statusCode} for ${url}`))
        return
      }
      const chunks = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => {
        const buffer = Buffer.concat(chunks)
        fetchStats.requests++
        fetchStats.bytes += buffer.length
        resolve(buffer)
      })
    })
    request.on('error', reject)
    request.setTimeout(60000, () => request.destroy(new Error(`timeout for ${url}`)))
  })
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await httpGet(url)
    } catch (error) {
      lastError = error
      if (attempt < attempts) await sleep(500 * attempt)
    }
  }
  throw lastError
}

const fetchText = async (url) => (await fetchWithRetry(url)).toString('utf8')

async function pool(items, limit, worker) {
  const results = new Array(items.length)
  let cursor = 0
  const runners = Array.from({ length: Math.min(limit, items.length) || 0 }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await worker(items[index], index)
    }
  })
  await Promise.all(runners)
  return results
}

/* ────────────────────────────── text helpers ────────────────────────────── */

const brandAudit = new Set()

function whiteLabelProtectedToken(value) {
  let out = value
  for (const [pattern, replacement] of SOURCE_URL_REPLACEMENTS) {
    out = out.replace(pattern, replacement)
  }
  return out
}

function whiteLabelIdentifiers(value) {
  let out = value
  for (const [pattern, replacement] of SOURCE_IDENTIFIER_REPLACEMENTS) {
    out = out.replace(pattern, replacement)
  }
  return out
}

function brandify(value) {
  if (!value) return value

  const protectedTokens = []
  const marker = '\u0000'
  const masked = value.replace(URL_LIKE, (token) => {
    protectedTokens.push(token)
    return `${marker}${protectedTokens.length - 1}${marker}`
  })

  let out = masked
  for (const [pattern, replacement] of BRAND_REPLACEMENTS) {
    out = out.replace(pattern, () => {
      brandAudit.add(replacement)
      return replacement
    })
  }

  return whiteLabelIdentifiers(
    out.replace(/\u0000(\d+)\u0000/g, (match, index) => whiteLabelProtectedToken(protectedTokens[Number(index)]))
  )
}

/**
 * Slug/file-name variant of `brandify`. `\b` does not match between `_` and a
 * letter, so identifiers such as `pilot_tracker` or `what_s_new_in_pilot_7_10`
 * (file names, link targets, image names) need their own pass.
 *
 * Compound identifiers that are not the product name are deliberately left
 * alone (see IMPLEMENTATION_PLAN.md, decision D3):
 *   copilotDoor, pilotgps.com, PilotGpsBot, pilot_map_url …
 */
function brandifyToken(value) {
  return brandify(value.replace(/(^|[^A-Za-z0-9])(pilot)(?=[^A-Za-z0-9]|$)/gi, (match, prefix) => prefix + 'OneGPS'))
}

function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Page slug from a reference file name, white-labeled. */
function pageSlugFromHref(href) {
  const file = decodeURIComponent(String(href).split('#')[0].replace(/^.*\//, '')).replace(/\.html?$/i, '')
  return brandifyToken(file)
    .replace(/_+/g, '-')
    .replace(/[^A-Za-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

function imageFileName(source) {
  const base = decodeURIComponent(String(source).split('/').pop())
  return brandifyToken(base).replace(/[^A-Za-z0-9._-]/g, '_')
}

/* ───────────────────────────── HTML parsing ───────────────────────────── */

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
])

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', times: '\u00d7',
  mdash: '\u2014', ndash: '\u2013', hellip: '\u2026', laquo: '\u00ab', raquo: '\u00bb',
  lsquo: '\u2018', rsquo: '\u2019', ldquo: '\u201c', rdquo: '\u201d', bull: '\u2022',
  copy: '\u00a9', reg: '\u00ae', deg: '\u00b0', middot: '\u00b7', eacute: '\u00e9', sect: '\u00a7'
}

function decodeEntities(value) {
  if (!value || value.indexOf('&') === -1) return value
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (match, entity) => {
    if (entity[0] === '#') {
      const code = entity[1] === 'x' || entity[1] === 'X' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : match
    }
    const named = NAMED_ENTITIES[entity.toLowerCase()]
    return named === undefined ? match : named
  })
}

function findTagEnd(html, start) {
  let quote = null
  for (let i = start + 1; i < html.length; i++) {
    const char = html[i]
    if (quote) {
      if (char === quote) quote = null
    } else if (char === '"' || char === "'") {
      quote = char
    } else if (char === '>') {
      return i
    }
  }
  return -1
}

function parseAttributes(source) {
  const attrs = {}
  const re = /([^\s"'>/=]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g
  let match
  while ((match = re.exec(source))) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[3] ?? match[4] ?? match[5] ?? '')
  }
  return attrs
}

/** Minimal, dependency-free HTML parser producing a node tree. */
function parseHtml(html) {
  const root = { tag: '#root', attrs: {}, children: [] }
  const stack = [root]
  const top = () => stack[stack.length - 1]
  const pushText = (text) => {
    if (text) top().children.push({ tag: '#text', text })
  }

  let i = 0
  while (i < html.length) {
    const lt = html.indexOf('<', i)
    if (lt === -1) {
      pushText(html.slice(i))
      break
    }
    if (lt > i) pushText(html.slice(i, lt))

    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt)
      i = end === -1 ? html.length : end + 3
      continue
    }
    if (html.startsWith('<!', lt) || html.startsWith('<?', lt)) {
      const end = html.indexOf('>', lt)
      i = end === -1 ? html.length : end + 1
      continue
    }

    const gt = findTagEnd(html, lt)
    if (gt === -1) {
      pushText(html.slice(lt))
      break
    }

    const raw = html.slice(lt + 1, gt)
    if (raw.startsWith('/')) {
      const name = raw.slice(1).trim().toLowerCase()
      for (let s = stack.length - 1; s > 0; s--) {
        if (stack[s].tag === name) {
          stack.length = s
          break
        }
      }
      i = gt + 1
      continue
    }

    const selfClosing = raw.endsWith('/')
    const nameMatch = /^([^\s/>]+)/.exec(raw)
    const tag = (nameMatch ? nameMatch[1] : '').toLowerCase()
    const node = { tag, attrs: parseAttributes(raw.slice(tag.length)), children: [] }
    top().children.push(node)

    if (!VOID_ELEMENTS.has(tag) && !selfClosing) {
      stack.push(node)
      if (tag === 'script' || tag === 'style') {
        const close = html.toLowerCase().indexOf(`</${tag}`, gt)
        i = close === -1 ? html.length : html.indexOf('>', close) + 1
        stack.pop()
        continue
      }
    }
    i = gt + 1
  }

  return root
}

function textOf(node) {
  if (!node) return ''
  if (node.tag === '#text') return node.text
  return (node.children || []).map(textOf).join('')
}

function findFirst(node, predicate) {
  if (!node) return null
  if (predicate(node)) return node
  for (const child of node.children || []) {
    const found = findFirst(child, predicate)
    if (found) return found
  }
  return null
}

const classOf = (node) => node?.attrs?.class || ''
const hasClass = (node, name) => classOf(node).split(/\s+/).includes(name)

/* ───────────────────────────── image mirroring ───────────────────────────── */

/** key → { src, file?, width?, height? } | null (not mirrored). */
const mirroredImages = new Map()
let imageQueue = []
let stagingCounter = 0
let droppedImages = 0
let resizeUnavailableWarned = false

function existingImageFor(key) {
  const jpeg = path.join(ASSET_DIR, `${key.replace(/\.[^.]+$/, '')}.jpg`)
  if (existsSync(jpeg)) return { src: `/docs-assets/images/${path.basename(jpeg)}`, file: jpeg }
  const original = path.join(ASSET_DIR, key)
  if (existsSync(original)) return { src: `/docs-assets/images/${key}`, file: original }
  return null
}

/**
 * Resolves one image reference. Already mirrored images resolve immediately,
 * new ones are queued (only for versions allowed to download) and resolved by
 * `mirrorQueuedImages()` before the page is finalised.
 */
function registerImage(version, source) {
  const key = imageFileName(source)
  if (mirroredImages.has(key)) return mirroredImages.get(key)

  const existing = existingImageFor(key)
  if (existing) {
    const info = { src: existing.src, file: existing.file, reused: true }
    mirroredImages.set(key, info)
    return info
  }

  if (SKIP_IMAGES) {
    mirroredImages.set(key, null)
    droppedImages++
    return null
  }

  imageQueue.push({ key, source, version })
  return null
}

async function downloadToStaging(job) {
  const url = `${job.version.base}images/${job.source.replace(/^images\//, '')}`
  const buffer = await fetchWithRetry(url)
  await mkdir(STAGING_DIR, { recursive: true })
  const file = path.join(STAGING_DIR, `${stagingCounter++}-${job.key}`)
  await writeFile(file, buffer)
  return { ...job, staging: file, bytes: buffer.length }
}

/**
 * Runs one PowerShell process for a batch of images. The process is considered
 * finished when it has written its marker file: GDI+ can hold the process open
 * for a long time after the work is done (see tools/resize-images.ps1).
 */
async function runResizeBatch(jobs) {
  // The resizer is a Windows PowerShell + GDI+ helper (tools/resize-images.ps1).
  // Elsewhere the batch is skipped straight away instead of stalling until the
  // timeout; the caller then stores the untouched original image.
  if (process.platform !== 'win32' || !existsSync(RESIZE_SCRIPT)) {
    if (!resizeUnavailableWarned) {
      resizeUnavailableWarned = true
      console.warn('  ! image optimisation needs Windows PowerShell (tools/resize-images.ps1) — storing untransformed images')
    }
    return new Map()
  }

  const stamp = `${process.pid}-${Date.now()}`
  const manifestFile = path.join(CACHE_DIR, `manifest-${stamp}.json`)
  const resultsFile = path.join(CACHE_DIR, `results-${stamp}.txt`)
  const markerFile = path.join(CACHE_DIR, `marker-${stamp}.txt`)
  const manifest = {
    maxWidth: IMAGE_MAX_WIDTH,
    quality: IMAGE_JPEG_QUALITY,
    results: resultsFile,
    marker: markerFile,
    jobs: jobs.map((job, index) => ({
      id: String(index),
      in: job.staging,
      out: path.join(ASSET_DIR, `${job.key.replace(/\.[^.]+$/, '')}.jpg`)
    }))
  }
  await writeFile(manifestFile, JSON.stringify(manifest), 'utf8')

  const child = execFile(
    'powershell.exe',
    ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', path.join(ROOT, 'tools', 'resize-images.ps1'), '-Manifest', manifestFile],
    { windowsHide: true },
    () => {}
  )

  const deadline = Date.now() + 10 * 60 * 1000
  while (!existsSync(markerFile)) {
    if (Date.now() > deadline) throw new Error('image resize batch timed out')
    await sleep(250)
  }
  child.kill()

  const lines = (await readFile(resultsFile, 'utf8')).split(/\r?\n/).filter(Boolean)
  const results = new Map()
  for (const line of lines) {
    const [id, width, height] = line.split('|')
    results.set(Number(id), {
      width: Number(width) || undefined,
      height: Number(height) || undefined,
      error: width === 'error' ? height : undefined
    })
  }
  return results
}

/** Downloads + resizes everything queued and fills `mirroredImages`. */
async function mirrorQueuedImages() {
  if (!imageQueue.length) return
  const queue = imageQueue
  imageQueue = []
  await mkdir(ASSET_DIR, { recursive: true })

  const downloaded = await pool(queue, IMAGE_CONCURRENCY, async (job) => {
    try {
      return await downloadToStaging(job)
    } catch (error) {
      console.warn(`  ! image download failed: ${job.key} (${error.message})`)
      mirroredImages.set(job.key, null)
      droppedImages++
      return null
    }
  })
  const usable = downloaded.filter(Boolean)

  for (let i = 0; i < usable.length; i += IMAGE_BATCH) {
    const batch = usable.slice(i, i + IMAGE_BATCH)
    let results = null
    try {
      results = await runResizeBatch(batch)
    } catch (error) {
      console.warn(`  ! resize batch failed: ${error.message}`)
    }

    for (const [index, job] of batch.entries()) {
      const result = results?.get(index)
      const target = path.join(ASSET_DIR, `${job.key.replace(/\.[^.]+$/, '')}.jpg`)
      if (!result || result.error || !existsSync(target)) {
        // Optimisation unavailable: keep the untouched original instead.
        const originalPath = path.join(ASSET_DIR, job.key)
        await writeFile(originalPath, await readFile(job.staging))
        mirroredImages.set(job.key, { src: `/docs-assets/images/${job.key}`, file: originalPath })
      } else {
        mirroredImages.set(job.key, {
          src: `/docs-assets/images/${path.basename(target)}`,
          file: target,
          bytes: (await stat(target)).size,
          width: result.width,
          height: result.height
        })
      }
    }
  }

  // Staging files are only needed until the resize has run.
  for (const job of usable) {
    try {
      await writeFile(job.staging, '')
    } catch {
      /* best effort */
    }
  }
}

/* ────────────────────────────── conversion ────────────────────────────── */

const BLOCK_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
  'blockquote', 'pre', 'hr', 'figure', 'figcaption', 'article', 'section', 'header', 'footer', 'nav', 'form', 'dl', 'dt', 'dd', 'iframe'
])

function hasBlockDescendant(node) {
  for (const child of node.children || []) {
    if (child.tag === '#text') continue
    if (BLOCK_TAGS.has(child.tag)) return true
    if (hasBlockDescendant(child)) return true
  }
  return false
}

class PageConverter {
  constructor(version, pageSlug) {
    this.version = version
    this.pageSlug = pageSlug
    this.headings = []
    this.usedHeadingIds = new Set()
    this.anchorPoints = []
    this.pendingLinks = []
    this.blockCursor = 0
  }

  uniqueHeadingId(text) {
    const base = slugify(text) || 'section'
    let id = base
    let n = 2
    while (this.usedHeadingIds.has(id)) id = `${base}-${n++}`
    this.usedHeadingIds.add(id)
    return id
  }

  makeImage(attrs) {
    const source = attrs.src || attrs['data-full-src']
    if (!source || /^https?:/i.test(source)) return null
    const alt = brandify(attrs.alt || '').trim()
    const width = Number(attrs.width) || undefined
    const height = Number(attrs.height) || undefined
    const resolved = registerImage(this.version, source)
    if (!resolved) return { t: 'img', pendingKey: imageFileName(source), alt, w: width, h: height }
    return { t: 'img', src: resolved.src, alt, w: width, h: height }
  }

  makeLink(attrs, children) {
    const href = (attrs.href || '').trim()
    if (!href) return { drop: children }
    const text = textOf({ children }).trim()

    if (href.startsWith('#')) {
      const link = { t: 'a', res: 'anchor', v: this.version.id, anchor: href.slice(1), in: children }
      this.pendingLinks.push(link)
      return link
    }

    if (/^(mailto:|tel:)/i.test(href)) return { drop: children }

    if (DOCS_HOSTS.some((host) => href.includes(host))) {
      const relative = href.replace(/^https?:\/\/[^/]+\//, '')
      const versionMatch = /^([0-9]+\.[0-9]+)\/(.*)$/.exec(relative)
      return this.internalLink(
        versionMatch ? versionMatch[1] : this.version.id,
        versionMatch ? versionMatch[2] : relative,
        children
      )
    }

    if (PRODUCT_HOSTS.some((pattern) => pattern.test(href))) {
      return { drop: children }
    }

    if (/^https?:/i.test(href)) return { drop: children }

    const crossVersion = /^\.\.\/([0-9]+\.[0-9]+)\/?$/.exec(href)
    if (crossVersion) return { t: 'a', href: `/docs/${crossVersion[1]}`, external: false, in: children }

    if (/\.html?($|#)/i.test(href)) return this.internalLink(this.version.id, href, children)

    if (text && !href.startsWith('javascript:')) return { drop: children }
    return { drop: children }
  }

  internalLink(versionId, href, children) {
    const [rawPath, anchor] = href.split('#')
    const link = {
      t: 'a',
      res: 'page',
      v: versionId,
      slug: pageSlugFromHref(rawPath),
      anchor: anchor || '',
      in: children
    }
    this.pendingLinks.push(link)
    return link
  }

  inline(nodes) {
    const out = []
    for (const node of nodes || []) {
      if (node.tag === '#text') {
        const value = brandify(decodeEntities(node.text)).replace(/\s+/g, ' ')
        if (value.trim()) out.push({ t: 'text', v: value })
        continue
      }

      switch (node.tag) {
        case 'br':
          out.push({ t: 'br' })
          break
        case 'img': {
          const image = this.makeImage(node.attrs)
          if (image) out.push(image)
          break
        }
        case 'b':
        case 'strong':
        case 'u':
          out.push({ t: 'b', in: this.inline(node.children) })
          break
        case 'i':
        case 'em':
          out.push({ t: 'i', in: this.inline(node.children) })
          break
        case 'code':
        case 'kbd':
        case 'samp':
        case 'var':
          out.push({ t: 'code', v: brandify(decodeEntities(textOf(node))).trim() })
          break
        case 'sup':
        case 'sub':
          out.push({ t: node.tag, in: this.inline(node.children) })
          break
        case 'a': {
          const inner = this.inline(node.children)
          const link = this.makeLink(node.attrs, inner)
          if (link.drop) out.push(...link.drop)
          else out.push(link)
          break
        }
        case 'script':
        case 'style':
        case 'map':
        case 'area':
          break
        default:
          out.push(...this.inline(node.children))
      }
    }

    // Merge adjacent text nodes and trim the whitespace at both edges.
    const merged = []
    for (const node of out) {
      const last = merged[merged.length - 1]
      if (node.t === 'text' && last?.t === 'text') last.v += node.v
      else merged.push(node)
    }
    while (merged.length && merged[0].t === 'text' && !merged[0].v.trim()) merged.shift()
    while (merged.length && merged[merged.length - 1].t === 'text' && !merged[merged.length - 1].v.trim()) merged.pop()
    if (merged.length && merged[0].t === 'text') merged[0].v = merged[0].v.replace(/^\s+/, '')
    const lastNode = merged[merged.length - 1]
    if (lastNode?.t === 'text') lastNode.v = lastNode.v.replace(/\s+$/, '')
    return merged
  }

  inlineText(nodes) {
    return this.inline(nodes)
      .map((node) => (node.t === 'text' || node.t === 'code' ? node.v : node.t === 'br' ? ' ' : ''))
      .join('')
      .trim()
  }

  blocksFrom(nodes) {
    const out = []
    for (const node of nodes || []) this.block(node, out)
    return out
  }

  recordAnchors(node, blockIndex) {
    if (node.tag === '#text') return
    const id = node.attrs?.id
    if (id && id !== 'top' && !id.startsWith('controlmap_')) {
      this.anchorPoints.push({ sourceAnchorId: id, blockIndex })
    }
    for (const child of node.children || []) this.recordAnchors(child, blockIndex)
  }

  block(node, out) {
    if (node.tag === '#text') {
      const value = brandify(decodeEntities(node.text)).replace(/\s+/g, ' ').trim()
      if (value) out.push({ t: 'p', in: [{ t: 'text', v: value }] })
      return
    }

    // Anchors are collected per top-level node, in document order, so a link to
    // `page.html#anchor` can be re-pointed at the closest generated heading.
    this.recordAnchors(node, out.length)

    if (/^h[1-6]$/.test(node.tag)) {
      const text = this.inlineText(node.children)
      if (!text) return
      const level = Math.min(4, Math.max(2, Number(node.tag[1]) + 1))
      const id = this.uniqueHeadingId(text)
      out.push({ t: 'h', lvl: level, id, in: this.inline(node.children) })
      this.headings.push({ level, id, text })
      return
    }

    if (node.tag === 'ul' || node.tag === 'ol') {
      const items = []
      for (const child of node.children || []) {
        if (child.tag !== 'li') continue
        const blocks = this.blocksFrom(child.children)
        if (blocks.length) items.push(blocks)
      }
      if (!items.length) return
      const start = Number(node.attrs.start)
      out.push({ t: 'list', ordered: node.tag === 'ol', start: Number.isFinite(start) && start > 1 ? start : undefined, items })
      return
    }

    if (node.tag === 'table') {
      const rows = []
      let header = false
      const collectRows = (rowContainer) => {
        for (const child of rowContainer.children || []) {
          if (child.tag === 'tr') {
            const cells = []
            for (const cell of child.children || []) {
              if (cell.tag !== 'td' && cell.tag !== 'th') continue
              if (cell.tag === 'th') header = true
              const blocks = this.blocksFrom(cell.children)
              cells.push(blocks.length ? blocks : [{ t: 'p', in: [{ t: 'text', v: '' }] }])
            }
            if (cells.length) rows.push(cells)
          } else if (['thead', 'tbody', 'tfoot'].includes(child.tag)) {
            collectRows(child)
          }
        }
      }
      collectRows(node)
      if (!rows.length) return
      out.push({ t: 'table', header, rows })
      return
    }

    if (node.tag === 'hr') {
      out.push({ t: 'hr' })
      return
    }

    if (node.tag === 'pre') {
      const text = brandify(decodeEntities(textOf(node))).replace(/\r/g, '').trimEnd()
      if (text.trim()) out.push({ t: 'code', v: text })
      return
    }

    if (node.tag === 'blockquote') {
      const blocks = this.blocksFrom(node.children)
      if (blocks.length) out.push({ t: 'quote', blocks })
      return
    }

    if (node.tag === 'iframe') {
      if (node.attrs.src) {
        out.push({ t: 'embed', label: brandify(node.attrs.title || '').trim() || 'External content', href: node.attrs.src })
      }
      return
    }

    if (node.tag === 'img') {
      const image = this.makeImage(node.attrs)
      if (image) out.push(image)
      return
    }

    if (hasClass(node, 'list-marker')) return

    if (hasBlockDescendant(node)) {
      for (const child of node.children || []) this.block(child, out)
      return
    }

    const inner = this.inline(node.children)
    if (!inner.length) return
    const text = inner.map((item) => (item.t === 'text' ? item.v : '')).join('').trim()
    if (!text) {
      for (const item of inner) if (item.t === 'img') out.push(item)
      return
    }
    out.push({ t: 'p', in: inner })
  }

  /**
   * The reference mixes real lists with paragraphs that start with a hand-typed
   * bullet ("— item"). Those paragraphs are grouped into real lists here.
   */
  static groupBullets(blocks) {
    const out = []
    let list = null
    for (const block of blocks) {
      const text = block.t === 'p' ? block.in.map((node) => (node.t === 'text' ? node.v : '')).join('') : null
      if (text !== null && /^\s*[\u2022\u00b7\u25cf\u25aa\u2014\u2013]\s+/.test(text)) {
        const inlined = structuredClone(block.in)
        for (const node of inlined) {
          if (node.t === 'text') {
            node.v = node.v.replace(/^\s*[\u2022\u00b7\u25cf\u25aa\u2014\u2013]\s*/, '')
            break
          }
        }
        if (!list) {
          list = { t: 'list', ordered: false, items: [] }
          out.push(list)
        }
        list.items.push([{ t: 'p', in: inlined }])
        continue
      }
      list = null
      out.push(block)
    }
    return out
  }
}

/* ───────────────────────────── navigation ───────────────────────────── */

async function loadNavigation(version) {
  const file = path.join(CACHE_DIR, `${version.id}-contents.html`)
  let html
  if (!FRESH && existsSync(file)) {
    html = await readFile(file, 'utf8')
  } else {
    html = await fetchText(`${version.base}contents.html`)
    await mkdir(CACHE_DIR, { recursive: true })
    await writeFile(file, html, 'utf8')
  }

  const start = html.indexOf('<!-- START TOC -->')
  const end = html.indexOf('<!-- END TOC -->')
  const region = start >= 0 && end > start ? html.slice(start, end) : html

  const re = /<a href="([^"]+)"[^>]*?padding-left:\s*([0-9.]+)pt[^>]*?>([\s\S]*?)<\/a>/g
  const entries = []
  const seen = new Set()
  for (const match of region.matchAll(re)) {
    const href = match[1]
    if (!/\.html?$/i.test(href.split('#')[0])) continue
    const slug = pageSlugFromHref(href)
    if (seen.has(slug)) continue
    seen.add(slug)
    entries.push({
      href,
      slug,
      title: brandify(decodeEntities(match[3].replace(/<[^>]+>/g, ''))).replace(/\s+/g, ' ').trim(),
      depth: Math.round(parseFloat(match[2]) / 20)
    })
  }

  const tree = []
  const stack = []
  for (const entry of entries) {
    const node = { slug: entry.slug, title: entry.title, children: [] }
    if (entry.depth === 0) tree.push(node)
    else {
      const parent = stack[entry.depth - 1] || stack[stack.length - 1] || null
      if (parent) parent.children.push(node)
      else tree.push(node)
    }
    stack[entry.depth] = node
    stack.length = entry.depth + 1
  }

  return { entries, tree }
}

/* ───────────────────────────── page import ───────────────────────────── */

async function loadPageHtml(version, entry) {
  const file = path.join(CACHE_DIR, `${version.id}-${entry.href.replace(/[^A-Za-z0-9._-]/g, '_')}`)
  if (!FRESH && existsSync(file)) return readFile(file, 'utf8')
  const html = await fetchText(`${version.base}${entry.href}`)
  await mkdir(CACHE_DIR, { recursive: true })
  await writeFile(file, html, 'utf8')
  return html
}

async function collectPage(version, entry) {
  const html = await loadPageHtml(version, entry)
  const region = findFirst(parseHtml(html), (node) => hasClass(node, 'description_on_page'))
  if (!region) throw new Error(`no content region in ${entry.href}`)

  const converter = new PageConverter(version, entry.slug)
  const blocks = PageConverter.groupBullets(converter.blocksFrom(region.children))

  return {
    slug: entry.slug,
    title: entry.title,
    source: entry.href,
    blocks,
    toc: converter.headings,
    anchors: converter.anchorPoints,
    linkCount: converter.pendingLinks.length
  }
}

/** Fills in `src` for images that were queued while a batch was converted. */
function applyMirroredImages(page) {
  const patchInline = (nodes) => {
    for (let i = (nodes || []).length - 1; i >= 0; i--) {
      const node = nodes[i]
      if (node.t === 'img' && node.pendingKey) {
        const info = mirroredImages.get(node.pendingKey)
        if (!info) {
          nodes.splice(i, 1)
          continue
        }
        node.src = info.src
        if (info.width) node.w = node.w || info.width
        if (info.height) node.h = node.h || info.height
        delete node.pendingKey
        continue
      }
      if (node.in) patchInline(node.in)
    }
  }

  const patchBlocks = (blocks) => {
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i]
      if (block.t === 'img' && block.pendingKey) {
        const info = mirroredImages.get(block.pendingKey)
        if (!info) {
          blocks.splice(i, 1)
          continue
        }
        block.src = info.src
        if (info.width) block.w = block.w || info.width
        if (info.height) block.h = block.h || info.height
        delete block.pendingKey
        continue
      }
      if (block.t === 'p' || block.t === 'h') {
        patchInline(block.in)
        if (!block.in.length) blocks.splice(i, 1)
      } else if (block.t === 'list') {
        for (const item of block.items) patchBlocks(item)
        block.items = block.items.filter((item) => item.length)
        if (!block.items.length) blocks.splice(i, 1)
      } else if (block.t === 'table') {
        for (const row of block.rows) for (const cell of row) patchBlocks(cell)
      } else if (block.t === 'quote') {
        patchBlocks(block.blocks)
        if (!block.blocks.length) blocks.splice(i, 1)
      }
    }
  }

  patchBlocks(page.blocks)
  return page
}

/* ────────────────────────────── link pass ────────────────────────────── */

/**
 * Rewrites internal links:
 *   - `page.html#anchor` becomes { page, anchor }, where the anchor is the id of
 *     the heading that follows the source anchor in the target page;
 *   - links to a page that does not exist in that version are unwrapped (the
 *     text is kept) so no broken link is ever produced.
 */
function resolveLinks(pages, pageSlugs) {
  const anchorIndex = new Map()
  for (const page of pages) {
    const headings = []
    page.blocks.forEach((block, index) => {
      if (block.t === 'h' && block.id) headings.push({ index, id: block.id })
    })
    const anchorToHeading = new Map()
    for (const anchor of [...page.anchors].sort((a, b) => a.blockIndex - b.blockIndex)) {
      const heading = [...headings].reverse().find((item) => item.index <= anchor.blockIndex)
      anchorToHeading.set(anchor.sourceAnchorId, heading?.id || '')
    }
    anchorIndex.set(page.slug, anchorToHeading)
  }

  const unresolved = new Set()
  const walkInline = (nodes) => {
    for (let i = (nodes || []).length - 1; i >= 0; i--) {
      const node = nodes[i]
      if (node.t === 'a') {
        if (node.res === 'page') {
          if (!pageSlugs.has(node.slug)) {
            unresolved.add(node.slug)
            nodes.splice(i, 1, ...(node.in || []))
            continue
          }
          node.page = node.slug
          delete node.slug
          delete node.res
        } else if (node.res === 'anchor') {
          const headingId = anchorIndex.get(node.v)?.get(node.anchor) || ''
          if (headingId) node.anchor = headingId
          else delete node.anchor
          delete node.res
        }
      }
      if (node.in) walkInline(node.in)
    }
  }
  const walkBlocks = (blocks) => {
    for (const block of blocks) {
      if (block.t === 'p' || block.t === 'h') walkInline(block.in)
      else if (block.t === 'list') for (const item of block.items) walkBlocks(item)
      else if (block.t === 'table') for (const row of block.rows) for (const cell of row) walkBlocks(cell)
      else if (block.t === 'quote') walkBlocks(block.blocks)
    }
  }
  for (const page of pages) walkBlocks(page.blocks)

  return unresolved
}

/* ─────────────────────────────── writing ─────────────────────────────── */

/**
 * JSON with `\uXXXX` escapes expanded, so generated modules stay readable and
 * diffable for accented text.
 */
function serialize(value) {
  return JSON.stringify(value).replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
    const code = parseInt(hex, 16)
    return code > 127 ? String.fromCodePoint(code) : match
  })
}

const GENERATED_HEADER =
  '/* Generated by tools/import-docs.mjs — do not edit by hand; re-run the importer instead. */\n'

function plainText(blocks) {
  const inline = (nodes) =>
    (nodes || [])
      .map((node) => {
        if (node.t === 'text' || node.t === 'code') return node.v
        if (node.t === 'br') return ' '
        if (node.in) return inline(node.in)
        return ''
      })
      .join('')

  const parts = []
  const walk = (list) => {
    for (const block of list) {
      if (block.t === 'h' || block.t === 'p') parts.push(inline(block.in))
      else if (block.t === 'code') parts.push(block.v)
      else if (block.t === 'list') for (const item of block.items) walk(item)
      else if (block.t === 'table') for (const row of block.rows) for (const cell of row) walk(cell)
      else if (block.t === 'quote') walk(block.blocks)
    }
  }
  walk(blocks)
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

function flattenNav(tree) {
  const out = []
  const walk = (nodes) => {
    for (const node of nodes) {
      out.push(node)
      if (node.children?.length) walk(node.children)
    }
  }
  walk(tree)
  return out
}

async function writeVersionFiles(version, pages, tree) {
  const dir = path.join(CONTENT_DIR, version.id)
  await mkdir(dir, { recursive: true })
  const pageMap = {}
  const files = []

  for (let i = 0; i < pages.length; i += PAGES_PER_CHUNK) {
    const index = Math.floor(i / PAGES_PER_CHUNK)
    const payload = {}
    for (const page of pages.slice(i, i + PAGES_PER_CHUNK)) {
      pageMap[page.slug] = index
      payload[page.slug] = { title: page.title, blocks: page.blocks, toc: page.toc }
    }
    const file = `chunk-${String(index).padStart(3, '0')}.js`
    files.push(file)
    await writeFile(path.join(dir, file), `${GENERATED_HEADER}export default ${serialize(payload)}\n`, 'utf8')
  }

  for (const file of await readdir(dir)) {
    if (file.startsWith('chunk-') && !files.includes(file)) {
      await writeFile(path.join(dir, file), `${GENERATED_HEADER}export default {}\n`, 'utf8')
    }
  }

  await mkdir(NAV_DIR, { recursive: true })
  await writeFile(path.join(NAV_DIR, `${version.id}.js`), `${GENERATED_HEADER}export default ${serialize(tree)}\n`, 'utf8')

  await mkdir(SEARCH_DIR, { recursive: true })
  const index = pages.map((page) => ({
    s: page.slug,
    t: page.title,
    h: page.toc.map((heading) => heading.text),
    x: plainText(page.blocks)
  }))
  await writeFile(path.join(SEARCH_DIR, `${version.id}.js`), `${GENERATED_HEADER}export default ${serialize(index)}\n`, 'utf8')

  return pageMap
}

/* ──────────────────────────── maintenance ──────────────────────────── */

/**
 * Mirrored files are named with `imageFileName()`, so changing the white-label
 * rules in that function would orphan every file already on disk (and cause a
 * full re-download). This renames them to the current rules instead.
 */
async function renameMirroredAssets() {
  if (!existsSync(ASSET_DIR)) return 0
  let renamed = 0
  for (const file of await readdir(ASSET_DIR)) {
    const target = imageFileName(file)
    if (target === file) continue
    await rename(path.join(ASSET_DIR, file), path.join(ASSET_DIR, target))
    renamed++
  }
  return renamed
}

/* ──────────────────────────────── main ──────────────────────────────── */

async function importVersion(version) {
  if (ONLY_VERSIONS && !ONLY_VERSIONS.has(version.id)) return null

  const started = Date.now()
  console.log(`\n=== ${version.id} — ${version.base} ===`)
  const { entries, tree } = await loadNavigation(version)
  console.log(`nav: ${entries.length} pages, ${tree.length} top-level sections`)

  if (ONLY_PAGE) {
    const entry = entries.find((item) => item.href === ONLY_PAGE || item.slug === pageSlugFromHref(ONLY_PAGE))
    if (!entry) throw new Error(`${ONLY_PAGE} is not part of ${version.id}`)
    const page = await collectPage(version, entry)
    await mirrorQueuedImages()
    console.log(JSON.stringify(applyMirroredImages(page), null, 1).slice(0, 12000))
    return null
  }

  const pages = []
  let batchNumber = 0
  for (let i = 0; i < entries.length; i += PAGE_BATCH) {
    const batch = entries.slice(i, i + PAGE_BATCH)
    const results = await pool(batch, PAGE_CONCURRENCY, async (entry) => {
      try {
        return await collectPage(version, entry)
      } catch (error) {
        console.warn(`  ! page failed: ${entry.href} (${error.message})`)
        return null
      }
    })
    const collected = results.filter(Boolean)

    // One image flush per page batch: downloads and the resize process overlap
    // with the next batch instead of blocking on a per-image basis.
    await mirrorQueuedImages()
    for (const page of collected) pages.push(applyMirroredImages(page))

    batchNumber++
    console.log(
      `  batch ${batchNumber}: ${Math.min(i + PAGE_BATCH, entries.length)}/${entries.length} pages · ` +
        `${(fetchStats.bytes / 1048576).toFixed(1)} MB fetched · ${mirroredImages.size} images known`
    )
  }

  const unresolved = resolveLinks(pages, new Set(pages.map((page) => page.slug)))
  if (unresolved.size) console.log(`  ${unresolved.size} links to missing pages kept as plain text`)

  const pageMap = await writeVersionFiles(version, pages, tree)
  const order = flattenNav(tree)

  console.log(
    `  done in ${((Date.now() - started) / 1000).toFixed(0)}s · ${pages.length}/${entries.length} pages · ` +
      `${mirroredImages.size} images known`
  )

  return {
    id: version.id,
    label: version.label,
    current: !!version.current,
    note: version.note,
    pageCount: pages.length,
    sectionCount: tree.length,
    pages: pageMap,
    firstPage: order[0]?.slug || ''
  }
}

async function writeVersionIndex(summaries) {
  const versionsFile = path.join(DOCS_DIR, 'versions.js')
  const pagesFile = path.join(DOCS_DIR, 'pages.js')

  const pagesMap = {}
  if (existsSync(pagesFile) && !FRESH) {
    try {
      Object.assign(pagesMap, JSON.parse(/export default ([\s\S]*?)\n?$/.exec(await readFile(pagesFile, 'utf8'))[1]))
    } catch {
      /* unreadable previous file: it is rebuilt below */
    }
  }
  for (const summary of summaries) pagesMap[summary.id] = summary.pages

  const previousCounts = {}
  if (existsSync(versionsFile) && !FRESH) {
    try {
      const previous = JSON.parse(/export default ([\s\S]*?)\n?$/.exec(await readFile(versionsFile, 'utf8'))[1])
      for (const version of previous) previousCounts[version.id] = version.pageCount
    } catch {
      /* ignore */
    }
  }

  const versions = VERSIONS.map((version) => ({
    id: version.id,
    label: version.label,
    current: !!version.current,
    note: version.note,
    pageCount: previousCounts[version.id] || 0
  }))
  for (const summary of summaries) {
    const target = versions.find((version) => version.id === summary.id)
    if (target) target.pageCount = summary.pageCount
  }

  await writeFile(versionsFile, `${GENERATED_HEADER}export default ${serialize(versions)}\n`, 'utf8')
  await writeFile(pagesFile, `${GENERATED_HEADER}export default ${serialize(pagesMap)}\n`, 'utf8')
  return versions
}

async function main() {
  await mkdir(CACHE_DIR, { recursive: true })

  if (RENAME_ASSETS) {
    const renamed = await renameMirroredAssets()
    console.log(`renamed ${renamed} mirrored asset file(s) to the current naming rules`)
    return
  }

  const summaries = []
  for (const version of VERSIONS) {
    const summary = await importVersion(version)
    if (summary) summaries.push(summary)
  }

  if (summaries.length) {
    const versions = await writeVersionIndex(summaries)
    console.log('\n=== summary ===')
    for (const version of versions) {
      const summary = summaries.find((item) => item.id === version.id)
      console.log(
        `${version.id}: ${version.pageCount} pages, ${summary ? `${summary.sectionCount} sections` : '—'}` +
          `${version.current ? ' (current)' : ''}`
      )
    }
  }

  console.log(`\nnetwork: ${fetchStats.requests} requests, ${(fetchStats.bytes / 1048576).toFixed(1)} MB`)
  console.log(`images known: ${mirroredImages.size}${droppedImages ? ` (${droppedImages} not mirrored)` : ''}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
