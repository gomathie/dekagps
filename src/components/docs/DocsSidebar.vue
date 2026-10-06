<script setup>
/**
 * Guide navigation. The reference ships a 687 entry tree, so the entries are
 * rendered from the flattened navigation (see `flattenNav`) and a branch is only
 * shown when all of its ancestors are expanded. The branch of the page that is
 * currently open is expanded automatically.
 */
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'DocsSidebar' })

const props = defineProps({
  versionId: { type: String, required: true },
  entries: { type: Array, default: () => [] },
  activeSlug: { type: String, default: '' },
  filter: { type: String, default: '' }
})

const expanded = ref(new Set())

const isVisible = (entry) => entry.ancestors.every((slug) => expanded.value.has(slug))

const matches = (entry) => {
  const query = props.filter.trim().toLowerCase()
  if (!query) return true
  return entry.title.toLowerCase().includes(query)
}

/**
 * When a filter is active the whole tree is walked instead of only the expanded
 * branches, otherwise matches inside collapsed sections would be invisible.
 */
const visibleEntries = computed(() => {
  const searching = props.filter.trim().length > 0
  return props.entries.filter((entry) => (searching ? true : isVisible(entry)) && matches(entry))
})

const target = (entry) => `/docs/${props.versionId}/${entry.slug}`

function toggle(entry) {
  const next = new Set(expanded.value)
  if (next.has(entry.slug)) next.delete(entry.slug)
  else next.add(entry.slug)
  expanded.value = next
}

watch(
  () => [props.entries, props.activeSlug],
  ([entries, activeSlug]) => {
    if (!entries.length) return
    const next = new Set(expanded.value)
    // Open the first level, so the guide does not look empty on arrival.
    if (!next.size) for (const entry of entries) if (entry.depth === 0) next.add(entry.slug)
    const active = entries.find((item) => item.slug === activeSlug)
    if (active) for (const ancestor of active.ancestors) next.add(ancestor)
    expanded.value = next
  },
  { immediate: true }
)

// A different version has an entirely different tree.
watch(() => props.versionId, () => { expanded.value = new Set() })
</script>

<template>
  <nav id="docs-navigation" class="docs-sidebar" aria-label="User guide navigation">
    <p v-if="!visibleEntries.length" class="docs-sidebar__empty">
      No page matches “{{ filter }}”.
    </p>
    <ul class="docs-sidebar__list">
      <li
        v-for="entry in visibleEntries"
        :key="entry.slug"
        :style="{ paddingLeft: `${entry.depth * 0.85}rem` }"
      >
        <div class="docs-sidebar__row" :class="{ 'is-active': entry.slug === activeSlug }">
          <button
            v-if="entry.hasChildren"
            type="button"
            class="docs-sidebar__toggle"
            :aria-expanded="expanded.has(entry.slug)"
            :aria-label="`${expanded.has(entry.slug) ? 'Collapse' : 'Expand'} ${entry.title}`"
            @click="toggle(entry)"
          >
            <i :class="expanded.has(entry.slug) ? 'fas fa-chevron-down' : 'fas fa-chevron-right'"></i>
          </button>
          <span v-else class="docs-sidebar__spacer"></span>
          <router-link :to="target(entry)" class="docs-sidebar__link">{{ entry.title }}</router-link>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.docs-sidebar {
  font-size: 0.875rem;
}

.docs-sidebar__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.docs-sidebar__row {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  border-radius: var(--radius-sm);
  padding: 0.2rem 0.35rem;
}

.docs-sidebar__row.is-active {
  background: rgba(230, 172, 3, 0.12);
  box-shadow: inset 2px 0 0 var(--accent-gold);
}

.docs-sidebar__toggle {
  flex: 0 0 1.1rem;
  width: 1.1rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: none;
  color: var(--text-muted);
  font-size: 0.62rem;
  cursor: pointer;
}

.docs-sidebar__toggle:hover {
  color: var(--accent-gold);
}

.docs-sidebar__spacer {
  flex: 0 0 1.1rem;
}

.docs-sidebar__link {
  color: var(--text-secondary);
  line-height: 1.5;
  padding: 0.15rem 0;
}

.docs-sidebar__link:hover {
  color: var(--accent-gold);
}

.docs-sidebar__row.is-active .docs-sidebar__link {
  color: var(--accent-gold);
  font-weight: 500;
}

.docs-sidebar__empty {
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>
