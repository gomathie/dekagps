<script setup>
/**
 * One page of the guide: heading, mini table of contents, content and the
 * previous/next pager.
 */
import { computed } from 'vue'
import DocsBlocks from './DocsBlocks.vue'

defineOptions({ name: 'DocsArticle' })

const props = defineProps({
  page: { type: Object, required: true },
  version: { type: Object, required: true },
  sectionLabel: { type: String, default: 'User Guide' },
  sectionPath: { type: String, default: '/docs' },
  previous: { type: Object, default: null },
  next: { type: Object, default: null }
})

const emit = defineEmits(['print'])

const sections = computed(() => props.page.toc.filter((heading) => heading.level <= 3))

const target = (slug) => `/docs/${props.version.id}/${slug}`
</script>

<template>
  <article class="docs-article">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <router-link :to="sectionPath">{{ sectionLabel }}</router-link>
      <span aria-hidden="true">/</span>
      <router-link :to="`/docs/${version.id}`">{{ version.label }}</router-link>
      <span aria-hidden="true">/</span>
      <span>{{ page.title }}</span>
    </nav>

    <header class="docs-article__header">
      <h1>{{ page.title }}</h1>
      <button type="button" class="docs-article__print" @click="emit('print')">
        <i class="fas fa-print" aria-hidden="true"></i> Print this page
      </button>
    </header>

    <nav v-if="sections.length > 1" class="docs-onpage" aria-label="On this page">
      <p class="docs-onpage__title">On this page</p>
      <ul>
        <li v-for="heading in sections" :key="heading.id" :class="`is-level-${heading.level}`">
          <a :href="`#${heading.id}`">{{ heading.text }}</a>
        </li>
      </ul>
    </nav>

    <DocsBlocks :blocks="page.blocks" />

    <nav class="docs-pager" :aria-label="`${sectionLabel} pages`">
      <router-link v-if="previous" :to="target(previous.slug)" class="docs-pager__link">
        <span class="docs-pager__label">Previous</span>
        <span class="docs-pager__title">{{ previous.title }}</span>
      </router-link>
      <span v-else class="docs-pager__spacer"></span>
      <router-link v-if="next" :to="target(next.slug)" class="docs-pager__link docs-pager__link--next">
        <span class="docs-pager__label">Next</span>
        <span class="docs-pager__title">{{ next.title }}</span>
      </router-link>
      <span v-else class="docs-pager__spacer"></span>
    </nav>
  </article>
</template>

<style scoped>
.docs-article__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.docs-article__header h1 {
  font-size: 2rem;
  margin: 0;
  letter-spacing: 0.5px;
}

.docs-article__print {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.9rem;
  color: var(--text-secondary);
  font-family: var(--font-heading);
  font-size: 0.78rem;
  cursor: pointer;
  transition: var(--transition-fast);
}

.docs-article__print:hover {
  border-color: var(--border-gold);
  color: var(--accent-gold);
}

.docs-onpage {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
}

.docs-onpage__title {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.docs-onpage ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.25rem;
}

.docs-onpage a {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.docs-onpage a:hover {
  color: var(--accent-gold);
}

.docs-onpage .is-level-3 {
  padding-left: 0.75rem;
}

.docs-onpage .is-level-3 a {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.docs-pager {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
}

.docs-pager__link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 0.9rem 1.1rem;
  transition: var(--transition-fast);
}

.docs-pager__link:hover {
  border-color: var(--border-gold);
  background: rgba(230, 172, 3, 0.06);
}

.docs-pager__link--next {
  text-align: right;
}

.docs-pager__label {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
}

.docs-pager__title {
  color: var(--text-primary);
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .docs-pager {
    grid-template-columns: 1fr;
  }

  .docs-pager__link--next {
    text-align: left;
  }
}
</style>
