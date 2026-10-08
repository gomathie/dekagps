<script setup>
/**
 * User guide (/docs, /docs/:version, /docs/:version/:slug).
 *
 * The guide content is generated from the reference documentation export by
 * tools/import-docs.mjs; this view is the reader around it:
 * the navigation tree, search and the article.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  defaultVersion,
  docsPath,
  flattenNav,
  getVersion,
  hasPage,
  loadNav,
  loadPage
} from '../docs/registry.js'
import DocsArticle from '../components/docs/DocsArticle.vue'
import DocsSearch from '../components/docs/DocsSearch.vue'
import DocsSidebar from '../components/docs/DocsSidebar.vue'

const route = useRoute()
const router = useRouter()

const nav = ref([])
const page = ref(null)
const isLoading = ref(false)
const sidebarFilter = ref('')
const isSidebarOpen = ref(false)
let loadedVersion = null

const versionId = computed(() => {
  const requested = route.params.version
  return getVersion(requested) ? requested : defaultVersion
})

const version = computed(() => getVersion(versionId.value))

const slug = computed(() => route.params.slug || '')

const entries = computed(() => flattenNav(nav.value))

const currentIndex = computed(() => entries.value.findIndex((entry) => entry.slug === slug.value))
const previous = computed(() => (currentIndex.value > 0 ? entries.value[currentIndex.value - 1] : null))
const next = computed(() =>
  currentIndex.value > -1 && currentIndex.value < entries.value.length - 1
    ? entries.value[currentIndex.value + 1]
    : null
)

const firstPage = computed(() => entries.value[0] || null)

const sections = computed(() => {
  const counts = new Map()
  for (const entry of entries.value) {
    if (!entry.ancestors.length) continue
    const root = entry.ancestors[0]
    counts.set(root, (counts.get(root) || 0) + 1)
  }
  return entries.value
    .filter((entry) => entry.depth === 0)
    .map((entry) => ({ ...entry, pageCount: (counts.get(entry.slug) || 0) + 1 }))
})

const loadVersion = async () => {
  nav.value = await loadNav(versionId.value)
}

const loadContent = async () => {
  if (!slug.value) {
    page.value = null
    return
  }

  isLoading.value = true
  const loaded = await loadPage(versionId.value, slug.value)
  isLoading.value = false

  if (!loaded) {
    page.value = null
    document.title = `Page not found | ${version.value.label} user guide | OneGPS`
    return
  }

  page.value = loaded
  document.title = `${loaded.title} | OneGPS ${version.value.label} user guide`

  const description = loaded.blocks
    .filter((block) => block.t === 'p')
    .map((block) => block.in.map((node) => node.v || '').join(''))
    .join(' ')
    .slice(0, 155)
  if (description) {
    const tag = document.head.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', description)
  }
}

/**
 * Deep links such as /docs/7.10/top-panel#information-tab point at headings that
 * only exist once the page content has been fetched, so the router's own
 * scrollBehaviour cannot find them.
 */
const scrollToHash = async () => {
  await nextTick()
  if (!route.hash) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const target = document.getElementById(route.hash.slice(1))
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(
  () => route.fullPath,
  async () => {
    if (route.params.version && !getVersion(route.params.version)) {
      await router.replace({
        path: docsPath(defaultVersion, hasPage(defaultVersion, slug.value) ? slug.value : ''),
        hash: route.hash,
        query: route.query
      })
      return
    }

    if (versionId.value !== loadedVersion) {
      loadedVersion = versionId.value
      sidebarFilter.value = ''
      await loadVersion()
    }

    if (slug.value) await loadContent()
    else page.value = null

    isSidebarOpen.value = false
    await scrollToHash()
  },
  { immediate: true }
)

const print = () => window.print()

function goToResult() {
  isSidebarOpen.value = false
}

/**
 * Keyboard shortcut: '/' focuses the search field, like most documentation
 * sites. Ignored while typing in another field.
 */
function onKeydown(event) {
  if (event.key === 'Escape' && isSidebarOpen.value) {
    isSidebarOpen.value = false
    return
  }
  if (event.key !== '/' || event.metaKey || event.ctrlKey) return
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  const input = document.getElementById('docs-search-input')
  if (input) {
    event.preventDefault()
    input.focus()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="docs">
    <section class="docs-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <router-link to="/">Home</router-link>
          <span aria-hidden="true">/</span>
          <span>User guide</span>
        </nav>
        <h1>OneGPS user guide</h1>
        <p class="lead">
          The complete product documentation: every screen, module and integration of the OneGPS
          platform, from first login to API commands.
        </p>

        <div class="docs-hero__controls">
          <div class="docs-version">
            <span>Version</span>
            <strong>{{ version.label }}</strong>
          </div>
          <DocsSearch :version-id="versionId" @navigate="goToResult" />
        </div>
      </div>
    </section>

    <div class="container docs-layout">
      <aside class="docs-aside" :class="{ 'is-open': isSidebarOpen }">
        <div class="docs-aside__inner">
          <input
            v-model="sidebarFilter"
            type="search"
            class="form-control docs-aside__filter"
            placeholder="Filter pages…"
            aria-label="Filter guide pages"
          />
          <DocsSidebar
            :version-id="versionId"
            :entries="entries"
            :active-slug="slug"
            :filter="sidebarFilter"
          />
        </div>
      </aside>

      <main class="docs-main">
        <button
          type="button"
          class="docs-aside__toggle"
          :aria-expanded="isSidebarOpen"
          aria-controls="docs-navigation"
          @click="isSidebarOpen = !isSidebarOpen"
        >
          <i class="fas fa-list" aria-hidden="true"></i>
          {{ isSidebarOpen ? 'Close navigation' : 'Browse the guide' }}
        </button>

        <p v-if="isLoading" class="docs-state">Loading…</p>

        <DocsArticle
          v-else-if="page"
          :page="page"
          :version="version"
          :previous="previous"
          :next="next"
          @print="print"
        />

        <div v-else-if="slug" class="docs-state">
          <h2>This page is not part of version {{ version.label }}</h2>
          <p>
            It may have been renamed or removed from the guide.
          </p>
          <router-link v-if="firstPage" :to="docsPath(versionId, firstPage.slug)" class="btn-primary">
            Start reading the {{ version.label }} guide
          </router-link>
        </div>

        <div v-else class="docs-overview">
          <h2 class="section-title">Browse the guide</h2>
          <p class="lead">
            Version {{ version.label }} documents {{ version.pageCount }} pages across
            {{ sections.length }} sections. Pick a section below or use the navigation on the left.
          </p>

          <h3 class="docs-overview__heading">Sections</h3>
          <ul class="docs-overview__sections">
            <li v-for="entry in sections" :key="entry.slug">
              <router-link :to="docsPath(versionId, entry.slug)">
                {{ entry.title }}
                <span>{{ entry.pageCount }} pages</span>
              </router-link>
            </li>
          </ul>

          <router-link v-if="firstPage" :to="docsPath(versionId, firstPage.slug)" class="btn-primary">
            Start with “{{ firstPage.title }}”
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.docs {
  background: var(--bg-primary);
  min-height: 100vh;
}

.docs-hero {
  padding: 9rem 0 3rem;
  background:
    radial-gradient(900px 420px at 12% -10%, rgba(230, 172, 3, 0.16), transparent 60%),
    linear-gradient(180deg, rgba(0, 23, 45, 0.96), rgba(0, 16, 34, 1));
  border-bottom: 1px solid var(--border-light);
}

.docs-hero h1 {
  font-size: 2.375rem;
  margin-bottom: 0.75rem;
  letter-spacing: 1px;
}

.docs-hero .lead {
  max-width: 680px;
  margin-bottom: 2rem;
}

.docs-hero__controls {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: end;
}

.docs-version span {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.docs-version strong {
  display: block;
  color: var(--accent-gold);
  font-size: 1.1rem;
  padding: 0.6rem 0;
}

.docs-layout {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 3rem;
  align-items: start;
  padding: 3rem 0 6rem;
}

.docs-aside__inner {
  position: sticky;
  top: 6rem;
  max-height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
}

.docs-aside__inner :deep(.docs-sidebar) {
  overflow-y: auto;
}

.docs-aside__filter {
  padding: 0.6rem 0.85rem;
  font-size: 0.85rem;
}

.docs-aside__toggle {
  display: none;
  width: 100%;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background: var(--glass-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  cursor: pointer;
}

.docs-state {
  color: var(--text-secondary);
}

.docs-state h2 {
  color: var(--text-primary);
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
}

.docs-state p {
  margin-bottom: 1.5rem;
}

.docs-overview__heading {
  font-size: 1.125rem;
  margin-bottom: 1rem;
}

.docs-overview__sections {
  list-style: none;
  margin: 0 0 2.5rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.5rem;
}

.docs-overview__sections a {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: var(--transition-fast);
}

.docs-overview__sections a:hover {
  border-color: var(--border-gold);
  color: var(--text-primary);
}

.docs-overview__sections span {
  flex: 0 0 auto;
  color: var(--text-muted);
  font-size: 0.75rem;
}

@media (max-width: 992px) {
  .docs-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .docs-aside {
    position: fixed;
    inset: 0;
    z-index: 1100;
    display: none;
    padding: 5rem 1.5rem 1.5rem;
    background: rgba(0, 10, 22, 0.97);
    backdrop-filter: blur(10px);
    overflow-y: auto;
  }

  .docs-aside.is-open {
    display: block;
  }

  .docs-aside__inner {
    position: static;
    max-height: none;
  }

  .docs-aside__toggle {
    display: inline-flex;
  }

  .docs-hero__controls {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .docs-hero {
    padding-top: 7rem;
  }

  .docs-hero h1 {
    font-size: 1.85rem;
  }
}
</style>
