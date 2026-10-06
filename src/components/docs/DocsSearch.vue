<script setup>
/**
 * Guide-wide search. The search index of the version being read is loaded on
 * first use (it is the largest generated file) and searched in memory.
 *
 * Results are ranked: title start > title hit > heading hit > body hit, and each
 * result shows the text around the match so the query is recognisable.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { loadSearchIndex } from '../../docs/registry.js'

defineOptions({ name: 'DocsSearch' })

const props = defineProps({
  versionId: { type: String, required: true }
})

const emit = defineEmits(['navigate'])

const query = ref('')
const index = ref(null)
const isLoading = ref(false)
const open = ref(false)
const activeIndex = ref(0)

async function ensureIndex() {
  if (index.value || isLoading.value) return
  isLoading.value = true
  try {
    index.value = await loadSearchIndex(props.versionId)
  } finally {
    isLoading.value = false
  }
}

const results = computed(() => {
  const needle = query.value.trim().toLowerCase()
  if (needle.length < 2 || !index.value) return []

  const scored = []
  for (const page of index.value) {
    const title = page.t.toLowerCase()
    const heading = page.h.find((text) => text.toLowerCase().includes(needle))
    const body = page.x.toLowerCase().indexOf(needle)
    let score = 0
    let context = ''

    if (title.startsWith(needle)) score = 100
    else if (title.includes(needle)) score = 80
    else if (heading) score = 60
    else if (body !== -1) score = 40
    else continue

    if (score >= 60) context = heading
    else context = `${body > 40 ? '…' : ''}${page.x.slice(Math.max(0, body - 40), body + 80).trim()}`

    scored.push({ slug: page.s, title: page.t, context, score })
  }

  return scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, 12)
})

const target = (result) => `/docs/${props.versionId}/${result.slug}`

function reset() {
  query.value = ''
  open.value = false
  activeIndex.value = 0
}

function onInput() {
  open.value = true
  activeIndex.value = 0
  ensureIndex()
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    open.value = false
    return
  }
  if (!results.value.length) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % results.value.length
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length
  } else if (event.key === 'Enter') {
    const result = results.value[activeIndex.value]
    if (result) select(result)
  }
}

function select(result) {
  emit('navigate', result)
  reset()
}

watch(() => props.versionId, reset)

function onDocumentClick(event) {
  if (!event.target.closest('.docs-search')) open.value = false
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div class="docs-search">
    <label class="docs-search__label" for="docs-search-input">Search the guide</label>
    <div class="docs-search__field">
      <i class="fas fa-search" aria-hidden="true"></i>
      <input
        id="docs-search-input"
        v-model="query"
        type="search"
        class="form-control"
        placeholder="Search 600+ pages…"
        autocomplete="off"
        role="combobox"
        aria-controls="docs-search-results"
        :aria-expanded="open && results.length > 0"
        @input="onInput"
        @focus="onInput"
        @keydown="onKeydown"
      />
    </div>

    <ul v-if="open && query.trim().length >= 2" id="docs-search-results" class="docs-search__results" role="listbox">
      <li v-if="isLoading" class="docs-search__state">Loading the index…</li>
      <li v-else-if="!results.length" class="docs-search__state">No page found for “{{ query }}”.</li>
      <li
        v-for="(result, index) in results"
        v-else
        :key="result.slug"
        role="option"
        :aria-selected="index === activeIndex"
        class="docs-search__result"
        :class="{ 'is-active': index === activeIndex }"
        @mouseenter="activeIndex = index"
      >
        <router-link :to="target(result)" @click="select(result)">
          <span class="docs-search__result-title">{{ result.title }}</span>
          <span v-if="result.context" class="docs-search__result-context">{{ result.context }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.docs-search {
  position: relative;
  width: 100%;
}

.docs-search__label {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.docs-search__field {
  position: relative;
}

.docs-search__field i {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 0.85rem;
}

.docs-search__field .form-control {
  padding-left: 2.4rem;
}

.docs-search__results {
  position: absolute;
  z-index: 30;
  width: 100%;
  max-height: 22rem;
  overflow-y: auto;
  margin: 0.5rem 0 0;
  padding: 0.35rem;
  list-style: none;
  background: var(--glass-panel);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: var(--shadow-elevated);
}

.docs-search__result a {
  display: block;
  padding: 0.55rem 0.65rem;
  border-radius: var(--radius-sm);
}

.docs-search__result.is-active a,
.docs-search__result a:hover {
  background: rgba(230, 172, 3, 0.12);
}

.docs-search__result-title {
  display: block;
  color: var(--text-primary);
  font-size: 0.88rem;
}

.docs-search__result-context {
  display: block;
  margin-top: 0.15rem;
  color: var(--text-muted);
  font-size: 0.78rem;
  line-height: 1.4;
}

.docs-search__state {
  padding: 0.65rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>
