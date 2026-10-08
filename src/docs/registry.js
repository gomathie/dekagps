/**
 * Single entry point for the generated user-guide content (see
 * tools/import-docs.mjs). Everything under src/docs is generated, this file is
 * the only part that is maintained by hand.
 *
 * Content is split into chunks per version and loaded on demand, so visiting
 * one page only downloads that page's chunk plus the navigation and search
 * index of the version being read.
 */
import versionMetadata from './versions.js'
import pageMap from './pages.js'

const navModules = import.meta.glob('./nav/*.js')
const contentModules = import.meta.glob('./content/*/chunk-*.js')
const searchModules = import.meta.glob('./search/*.js')

const navCache = new Map()
const pageCache = new Map()
const searchCache = new Map()

export const versions = versionMetadata

export const defaultVersion = (versions.find((version) => version.current) || versions[0])?.id

export const getVersion = (id) => versions.find((version) => version.id === id) || null

export const docsPath = (versionId, slug = '', anchor = '') =>
  `/docs/${versionId}${slug ? `/${slug}` : ''}${anchor ? `#${anchor}` : ''}`

/** Navigation tree of a version (cached per session). */
export async function loadNav(versionId) {
  if (!navCache.has(versionId)) {
    const loader = navModules[`./nav/${versionId}.js`]
    const tree = loader ? (await loader()).default : []
    navCache.set(versionId, tree)
  }
  return navCache.get(versionId)
}

/**
 * Navigation as a flat list in reading order. `ancestors` is used by the
 * sidebar to know whether an entry is visible and by the pager for
 * previous/next links.
 */
export function flattenNav(tree, depth = 0, ancestors = []) {
  const out = []
  for (const node of tree) {
    out.push({
      slug: node.slug,
      title: node.title,
      depth,
      ancestors,
      hasChildren: Boolean(node.children?.length)
    })
    if (node.children?.length) out.push(...flattenNav(node.children, depth + 1, [...ancestors, node.slug]))
  }
  return out
}

/** Whether a version contains a given page (used when switching versions). */
export const hasPage = (versionId, slug) => Boolean(slug) && pageMap[versionId]?.[slug] !== undefined

/** One page of the guide, or null when the slug does not exist in that version. */
export async function loadPage(versionId, slug) {
  const chunkIndex = pageMap[versionId]?.[slug]
  if (chunkIndex === undefined) return null

  const cacheKey = `${versionId}/${slug}`
  if (!pageCache.has(cacheKey)) {
    const loader = contentModules[`./content/${versionId}/chunk-${String(chunkIndex).padStart(3, '0')}.js`]
    if (!loader) return null
    const chunk = (await loader()).default
    pageCache.set(cacheKey, chunk[slug] ? { ...chunk[slug], slug } : null)
  }
  return pageCache.get(cacheKey)
}

/** Search index of a version: [{ s, t, h, x }] (slug, title, headings, text). */
export async function loadSearchIndex(versionId) {
  if (!searchCache.has(versionId)) {
    const loader = searchModules[`./search/${versionId}.js`]
    searchCache.set(versionId, loader ? (await loader()).default : [])
  }
  return searchCache.get(versionId)
}
