/**
 * Verification for the imported user guide (tools/import-docs.mjs).
 *
 *   npm run check:docs
 *
 * Three passes:
 *   1. data consistency — navigation, page map and search index of every version
 *      must describe exactly the same set of pages;
 *   2. references — all article links, section targets and image files;
 *   3. render pass — a sample of pages per version is rendered to HTML with Vue's
 *      SSR renderer, which exercises the whole chain (registry → Docs.vue
 *      components → DocsArticle → DocsBlocks/DocsInline), then the produced
 *      markup, image references and internal links are checked.
 *
 * Exits non-zero when anything is wrong, so it can gate a build.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { createSSRApp, h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { renderToString } from 'vue/server-renderer'

import DocsArticle from '../src/components/docs/DocsArticle.vue'
import DocsSidebar from '../src/components/docs/DocsSidebar.vue'
import pageMap from '../src/docs/pages.js'
import {
  flattenNav,
  getVersion,
  hasPage,
  loadNav,
  loadPage,
  loadSearchIndex,
  versions
} from '../src/docs/registry.js'

// The components touch a few client-only APIs; the render pass runs in Node.
globalThis.document = {
  title: '',
  head: { querySelector: () => null },
  getElementById: () => null,
  addEventListener() {},
  removeEventListener() {},
  body: { style: {} }
}
globalThis.window = {
  addEventListener() {},
  removeEventListener() {},
  scrollTo() {},
  print() {}
}

const failures = []
const fail = (message) => failures.push(message)
const ROOT = process.cwd()
const GENERATED_DOCS_DIR = path.join(ROOT, 'src', 'docs')
const FORBIDDEN_SOURCE_REFS =
  /\b(?:docs\.)?pilot-gps\.(?:africa|com|ru)\b|\bpilot-telematics\.com\b|\bgithub\.com\/pilot-telematics\b/i

function generatedFiles(dir = GENERATED_DOCS_DIR, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) generatedFiles(file, out)
    else if (entry.name.endsWith('.js')) out.push(file)
  }
  return out
}

function checkWhiteLabelOutput() {
  if (versions.length !== 1 || versions[0].id !== '7.10') fail('Only guide version 7.10 should be published')
  for (const id of Object.keys(pageMap)) {
    if (!getVersion(id)) fail(`Page map still contains removed version ${id}`)
  }
  for (const dir of ['content', 'nav', 'search']) {
    for (const entry of readdirSync(path.join(GENERATED_DOCS_DIR, dir))) {
      const id = dir === 'content' ? entry : entry.replace(/\.js$/, '')
      if (!getVersion(id)) fail(`${dir}: files for removed version ${id} remain`)
    }
  }
  for (const file of generatedFiles()) {
    const source = readFileSync(file, 'utf8')
    const relative = path.relative(ROOT, file)
    const outbound = source.match(/"href":"https?:\/\//)
    if (outbound) fail(`${relative}: generated docs must not contain outbound HTTP links`)
    const sourceRef = source.match(FORBIDDEN_SOURCE_REFS)
    if (sourceRef) fail(`${relative}: source-vendor reference remains (${sourceRef[0]})`)
  }
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/:all(.*)', component: { render: () => null } }]
})

const render = (component, props) => {
  const app = createSSRApp({ render: () => h(component, props) })
  app.use(router)
  return renderToString(app)
}

/** Deterministic sample: first, last and three evenly spaced pages. */
function samplePages(entries, count = 5) {
  if (entries.length <= count) return entries
  const step = (entries.length - 1) / (count - 1)
  return Array.from({ length: count }, (_, index) => entries[Math.round(index * step)])
}

async function checkData(version) {
  const nav = await loadNav(version.id)
  const entries = flattenNav(nav)
  const index = await loadSearchIndex(version.id)

  const slugs = new Set(entries.map((entry) => entry.slug))
  const mapped = entries.filter((entry) => !hasPage(version.id, entry.slug))
  const indexed = new Set(index.map((page) => page.s))

  if (hasPage(version.id, 'release-notes')) fail(`${version.id}: archived release-note pages remain`)

  if (entries.length !== version.pageCount) {
    fail(`${version.id}: versions.js announces ${version.pageCount} pages, navigation has ${entries.length}`)
  }
  if (mapped.length) fail(`${version.id}: ${mapped.length} navigation entries have no page (${mapped[0].slug}…)`)
  const missing = [...slugs].filter((slug) => !indexed.has(slug))
  if (missing.length) fail(`${version.id}: ${missing.length} pages missing from the search index (${missing[0]}…)`)

  return entries
}

function visitContent(value, visit) {
  if (Array.isArray(value)) value.forEach((child) => visitContent(child, visit))
  else if (value && typeof value === 'object') {
    visit(value)
    for (const child of Object.values(value)) visitContent(child, visit)
  }
}

async function checkReferences(version, entries) {
  let checked = 0
  for (const entry of entries) {
    const page = await loadPage(version.id, entry.slug)
    if (!page) {
      fail(`${version.id}/${entry.slug}: page could not be loaded`)
      continue
    }
    const links = []
    visitContent(page.blocks, (node) => {
      if (node.t === 'a') links.push(node)
      if (node.t === 'img' && (!node.src || !existsSync(path.join(ROOT, 'public', node.src.slice(1))))) {
        fail(`${version.id}/${entry.slug}: missing image ${node.src}`)
      }
    })
    for (const link of links) {
      checked++
      if (link.page) {
        const target = await loadPage(link.v, link.page)
        if (!getVersion(link.v) || !target) {
          fail(`${version.id}/${entry.slug}: broken link to ${link.v}/${link.page}`)
        } else if (link.anchor && !target.toc.some((heading) => heading.id === link.anchor)) {
          fail(`${version.id}/${entry.slug}: missing target ${link.v}/${link.page}#${link.anchor}`)
        }
      } else if (!link.href || !/^\/docs\/7\.10\/?$/.test(link.href)) {
        fail(`${version.id}/${entry.slug}: unresolved link`)
      }
    }
  }
  return checked
}

const NAVIGATION_EXAMPLES = {
  'what-s-new-in-onegps-7-10': '/docs/7.10/top-panel#ai-assistant',
  'top-panel': '/docs/7.10/top-panel#navigation-menu',
  'user-card': '/docs/7.10/settings-1',
  'timetable-': '/docs/7.10/report-on-timetable-adherence-'
}

async function checkRender(version, entries) {
  const sample = samplePages(entries)
  for (const slug of Object.keys(NAVIGATION_EXAMPLES)) {
    const entry = entries.find((entry) => entry.slug === slug)
    if (entry && !sample.some((item) => item.slug === slug)) sample.push(entry)
  }
  const meta = getVersion(version.id)

  for (const entry of sample) {
    const page = await loadPage(version.id, entry.slug)
    if (!page) {
      fail(`${version.id}/${entry.slug}: page could not be loaded`)
      continue
    }

    const html = await render(DocsArticle, {
      page,
      version: meta,
      previous: null,
      next: null
    })

    if (!html.includes(page.title)) fail(`${version.id}/${entry.slug}: title missing from the rendered article`)
    if (page.blocks.some((block) => block.t === 'h') && !html.includes('docs-heading')) {
      fail(`${version.id}/${entry.slug}: headings did not render`)
    }
    if (html.includes('undefined')) fail(`${version.id}/${entry.slug}: rendered markup contains "undefined"`)
    const expectedLink = NAVIGATION_EXAMPLES[entry.slug]
    if (expectedLink && !html.includes(`href="${expectedLink}"`)) {
      fail(`${version.id}/${entry.slug}: article navigation link ${expectedLink} did not render`)
    }

    for (const match of html.matchAll(/src="(\/docs-assets\/images\/[^"]+)"/g)) {
      if (!existsSync(`public${match[1]}`)) fail(`${version.id}/${entry.slug}: missing image ${match[1]}`)
    }

    for (const match of html.matchAll(/href="\/docs\/([^/"]+)\/([^"#]+)/g)) {
      if (!hasPage(match[1], match[2])) {
        fail(`${version.id}/${entry.slug}: broken internal link to ${match[1]}/${match[2]}`)
      }
    }

    for (const match of html.matchAll(/href="#([^"]+)"/g)) {
      const anchor = page.toc.some((heading) => heading.id === match[1])
      if (!anchor && !html.includes(`id="${match[1]}"`)) {
        fail(`${version.id}/${entry.slug}: heading anchor #${match[1]} has no target`)
      }
    }
  }

  const sidebar = await render(DocsSidebar, {
    versionId: version.id,
    entries,
    activeSlug: entries[0].slug,
    filter: ''
  })
  if (!sidebar.includes('docs-sidebar__link')) fail(`${version.id}: the sidebar rendered no navigation`)

  const filtered = await render(DocsSidebar, {
    versionId: version.id,
    entries,
    activeSlug: entries[0].slug,
    filter: 'fuel'
  })
  if (!filtered.includes('docs-sidebar__link')) fail(`${version.id}: filtering the sidebar returns nothing`)

  return sample.length
}

let rendered = 0
checkWhiteLabelOutput()
for (const version of versions) {
  const entries = await checkData(version)
  const links = await checkReferences(version, entries)
  const renderedPages = entries.length ? await checkRender(version, entries) : 0
  rendered += renderedPages
  console.log(`${version.id}: checked ${entries.length} pages, ${links} article links and ${renderedPages} rendered pages`)
}

console.log(`\nrendered ${rendered} pages across ${versions.length} versions`)
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`)
  for (const message of failures.slice(0, 25)) console.error(`  - ${message}`)
  process.exitCode = 1
} else {
  console.log('docs content, navigation and rendering are consistent')
}
