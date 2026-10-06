<script setup>
/**
 * Renders one run of inline content (text, emphasis, links, inline images).
 * Recursive: bold/italic/link nodes contain their own inline runs.
 */
defineOptions({ name: 'DocsInline' })

defineProps({
  nodes: { type: Array, default: () => [] }
})

const target = (node) => `/docs/${node.v}/${node.page}${node.anchor ? `#${node.anchor}` : ''}`
</script>

<template>
  <template v-for="(node, index) in nodes" :key="index">
    <template v-if="node.t === 'text'">{{ node.v }}</template>
    <strong v-else-if="node.t === 'b'"><DocsInline :nodes="node.in" /></strong>
    <em v-else-if="node.t === 'i'"><DocsInline :nodes="node.in" /></em>
    <code v-else-if="node.t === 'code'">{{ node.v }}</code>
    <sup v-else-if="node.t === 'sup'"><DocsInline :nodes="node.in" /></sup>
    <sub v-else-if="node.t === 'sub'"><DocsInline :nodes="node.in" /></sub>
    <br v-else-if="node.t === 'br'" />
    <img
      v-else-if="node.t === 'img'"
      class="docs-inline-image"
      :src="node.src"
      :alt="node.alt || ''"
      :width="node.w"
      :height="node.h"
      loading="lazy"
      decoding="async"
    />
    <router-link v-else-if="node.page" class="docs-link" :to="target(node)">
      <DocsInline :nodes="node.in" />
    </router-link>
    <a
      v-else-if="node.href"
      class="docs-link"
      :href="node.href"
      target="_blank"
      rel="noopener noreferrer"
    >
      <DocsInline :nodes="node.in" />
    </a>
    <span v-else><DocsInline :nodes="node.in" /></span>
  </template>
</template>

<style scoped>
.docs-link {
  color: var(--accent-gold);
  text-decoration: underline;
  text-decoration-color: rgba(230, 172, 3, 0.4);
  text-underline-offset: 2px;
}

.docs-link:hover {
  text-decoration-color: var(--accent-gold);
}

code {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 0.1rem 0.35rem;
  font-size: 0.86em;
  color: var(--accent-gold-light);
}

.docs-inline-image {
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
}
</style>
