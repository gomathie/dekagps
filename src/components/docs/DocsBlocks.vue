<script setup>
/**
 * Renders the block tree of one guide page. Recursive: lists, table cells and
 * quotes contain block trees of their own.
 *
 * Screenshots open in a lightbox — the mirrored images are downscaled to 900px
 * wide, which is too small to read UI labels on a phone.
 */
import { onBeforeUnmount, ref } from 'vue'
import DocsInline from './DocsInline.vue'

defineOptions({ name: 'DocsBlocks' })

defineProps({
  blocks: { type: Array, default: () => [] }
})

const zoomed = ref(null)

function openImage(node) {
  zoomed.value = node
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
}

function closeImage() {
  zoomed.value = null
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
}

function onKeydown(event) {
  if (event.key === 'Escape') closeImage()
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <template v-for="(block, index) in blocks" :key="index">
    <component
      :is="`h${block.lvl}`"
      v-if="block.t === 'h'"
      :id="block.id"
      class="docs-heading"
      :class="`docs-heading--${block.lvl}`"
    >
      <DocsInline :nodes="block.in" />
      <a class="docs-heading__link" :href="`#${block.id}`" :aria-label="`Link to ${block.id}`">#</a>
    </component>

    <p v-else-if="block.t === 'p'" class="docs-p"><DocsInline :nodes="block.in" /></p>

    <component
      :is="block.ordered ? 'ol' : 'ul'"
      v-else-if="block.t === 'list'"
      class="docs-list"
      :start="block.start"
    >
      <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
        <DocsBlocks :blocks="item" />
      </li>
    </component>

    <figure v-else-if="block.t === 'img'" class="docs-figure">
      <button type="button" class="docs-figure__trigger" @click="openImage(block)">
        <img
          :src="block.src"
          :alt="block.alt || ''"
          :width="block.w"
          :height="block.h"
          loading="lazy"
          decoding="async"
        />
      </button>
      <figcaption v-if="block.alt">{{ block.alt }}</figcaption>
    </figure>

    <div v-else-if="block.t === 'table'" class="docs-table-wrap">
      <table class="docs-table">
        <thead v-if="block.header">
          <tr>
            <th v-for="(cell, cellIndex) in block.rows[0]" :key="cellIndex">
              <DocsBlocks :blocks="cell" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in block.header ? block.rows.slice(1) : block.rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              <DocsBlocks :blocks="cell" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <pre v-else-if="block.t === 'code'" class="docs-code"><code>{{ block.v }}</code></pre>

    <blockquote v-else-if="block.t === 'quote'" class="docs-quote">
      <DocsBlocks :blocks="block.blocks" />
    </blockquote>

    <figure v-else-if="block.t === 'embed'" class="docs-embed">
      <a :href="block.href" target="_blank" rel="noopener noreferrer">{{ block.label }}</a>
    </figure>

    <hr v-else-if="block.t === 'hr'" class="docs-hr" />

    <Teleport to="body">
      <div v-if="zoomed" class="docs-lightbox" role="dialog" aria-modal="true" @click.self="closeImage">
        <button type="button" class="docs-lightbox__close" aria-label="Close image" @click="closeImage">
          &times;
        </button>
        <img :src="zoomed.src" :alt="zoomed.alt || ''" />
        <p v-if="zoomed.alt" class="docs-lightbox__caption">{{ zoomed.alt }}</p>
      </div>
    </Teleport>
  </template>
</template>

<style scoped>
.docs-heading {
  scroll-margin-top: 7rem;
}

.docs-heading--2 {
  font-size: 1.6rem;
  margin: 2.5rem 0 1rem;
}

.docs-heading--3 {
  font-size: 1.25rem;
  margin: 2rem 0 0.75rem;
  color: var(--accent-gold);
}

.docs-heading--4 {
  font-size: 1.05rem;
  margin: 1.5rem 0 0.5rem;
}

.docs-heading__link {
  margin-left: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
  opacity: 0;
  transition: var(--transition-fast);
}

.docs-heading:hover .docs-heading__link,
.docs-heading__link:focus {
  opacity: 1;
}

.docs-p {
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 1.1rem;
}

.docs-list {
  margin: 0 0 1.25rem 1.25rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.docs-list ::v-deep(.docs-p) {
  margin-bottom: 0.5rem;
}

.docs-list ::v-deep(.docs-list) {
  margin-bottom: 0;
}

.docs-figure {
  margin: 1.75rem 0;
}

.docs-figure__trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  background: rgba(0, 0, 0, 0.25);
  cursor: zoom-in;
  overflow: hidden;
}

.docs-figure__trigger img {
  display: block;
  width: 100%;
  height: auto;
}

.docs-figure figcaption {
  margin-top: 0.5rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}

.docs-table-wrap {
  overflow-x: auto;
  margin: 1.75rem 0;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}

.docs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.docs-table th,
.docs-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-light);
  vertical-align: top;
  color: var(--text-secondary);
}

.docs-table th {
  background: rgba(230, 172, 3, 0.08);
  color: var(--text-primary);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.docs-table ::v-deep(.docs-p) {
  margin-bottom: 0;
}

.docs-table ::v-deep(.docs-list) {
  margin-bottom: 0;
}

.docs-code {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  overflow-x: auto;
  font-size: 0.85rem;
  color: var(--accent-gold-light);
  margin-bottom: 1.5rem;
}

.docs-quote {
  border-left: 3px solid var(--accent-gold);
  background: rgba(230, 172, 3, 0.06);
  padding: 1.25rem 1.5rem;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-bottom: 1.5rem;
}

.docs-embed a {
  display: inline-block;
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-md);
  padding: 0.75rem 1.25rem;
  color: var(--accent-gold);
}

.docs-hr {
  border: none;
  border-top: 1px solid var(--border-light);
  margin: 2.5rem 0;
}
</style>

<style>
/* The lightbox is teleported to <body>, so it cannot be scoped. */
.docs-lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  background: rgba(0, 8, 18, 0.94);
  backdrop-filter: blur(6px);
}

.docs-lightbox img {
  max-width: 100%;
  max-height: 82vh;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-elevated);
}

.docs-lightbox__caption {
  color: var(--text-secondary);
  font-size: 0.85rem;
  max-width: 900px;
  text-align: center;
}

.docs-lightbox__close {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: rgba(0, 23, 45, 0.8);
  color: var(--text-primary);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.docs-lightbox__close:hover {
  border-color: var(--border-gold);
  color: var(--accent-gold);
}
</style>
