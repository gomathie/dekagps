/**
 * Verification for the imported user guide (tools/import-docs.mjs).
 *
 *   npm run check:docs
 *
 * Two passes:
 *   1. data consistency — navigation, page map and search index of every version
 *      must describe exactly the same set of pages;
 *   2. render pass — a sample of pages per version is rendered to HTML with Vue's
 *      SSR renderer, which exercises the whole chain (registry → Docs.vue
 *      components → DocsArticle → DocsBlocks/DocsInline), then the produced
 *      markup, image references and internal links are checked.
 *
 * Exits non-zero when anything is wrong, so it can gate a build.
 */
import { existsSync } from 'node:fs'
import { createSSRApp, h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { renderToString } from 'vue/server-renderer'

import DocsArticle from '../src/components/docs/DocsArticle.vue'
import DocsSidebar from '../src/components/docs/DocsSidebar.vue'
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

  if (entries.length !== version.pageCount) {
    fail(`${version.id}: versions.js announces ${version.pageCount} pages, navigation has ${entries.length}`)
  }
  if (mapped.length) fail(`${version.id}: ${mapped.length} navigation entries have no page (${mapped[0].slug}…)`)
  const missing = [...slugs].filter((slug) => !indexed.has(slug))
  if (missing.length) fail(`${version.id}: ${missing.length} pages missing from the search index (${missing[0]}…)`)

  return entries
}

async function checkRender(version, entries) {
  const sample = samplePages(entries)
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
for (const version of versions) {
  const entries = await checkData(version)
  if (entries.length) rendered += await checkRender(version, entries)
  console.log(`${version.id}: checked ${entries.length} pages and ${Math.min(entries.length, 5)} rendered pages`)
}

console.log(`\nrendered ${rendered} pages across ${versions.length} versions`)
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`)
  for (const message of failures.slice(0, 25)) console.error(`  - ${message}`)
  process.exitCode = 1
} else {
  console.log('docs content, navigation and rendering are consistent')
}
