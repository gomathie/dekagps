<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowUp } from '@lucide/vue'
import ApiNavbar from '../components/api/ApiNavbar.vue'
import ApiSidebar from '../components/api/ApiSidebar.vue'
import ApiContent from '../components/api/ApiContent.vue'
import endpointsV2 from '../api/data/v2.json'
import endpointsV3 from '../api/data/v3.json'

const route = useRoute()
const sidebarOpen = ref(false)
const activeEndpoint = ref('')
const showBackToTop = ref(false)

const currentVersion = computed(() => route.name === 'ApiDocsV3' ? 'v3' : 'v2')
const currentEndpoints = computed(() => currentVersion.value === 'v3' ? endpointsV3 : endpointsV2)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function updateScrollState() {
  const scrollPosition = window.scrollY + 140
  showBackToTop.value = window.scrollY > 400

  const sections = currentEndpoints.value
    .flatMap((category) => category.endpoints)
    .map((endpoint) => document.getElementById(endpoint.id))
    .filter(Boolean)

  for (let index = sections.length - 1; index >= 0; index--) {
    if (scrollPosition >= sections[index].offsetTop) {
      activeEndpoint.value = sections[index].id
      return
    }
  }

  activeEndpoint.value = ''
}

async function syncRoute() {
  activeEndpoint.value = ''
  sidebarOpen.value = false
  await nextTick()

  if (route.hash) {
    document.getElementById(route.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  window.setTimeout(updateScrollState, 150)
}

watch(() => route.fullPath, syncRoute)

onMounted(() => {
  window.addEventListener('scroll', updateScrollState, { passive: true })
  syncRoute()
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScrollState))
</script>

<template>
  <div class="api-docs">
    <ApiNavbar :current-version="currentVersion" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <button
      v-if="sidebarOpen"
      type="button"
      class="api-overlay"
      aria-label="Close API navigation"
      @click="sidebarOpen = false"
    ></button>

    <ApiSidebar
      :endpoints="currentEndpoints"
      :active-endpoint="activeEndpoint"
      :is-open="sidebarOpen"
      :current-version="currentVersion"
      @close="sidebarOpen = false"
    />

    <ApiContent :key="currentVersion" :endpoints="currentEndpoints" :version="currentVersion" />

    <transition name="api-fade">
      <button
        v-if="showBackToTop"
        type="button"
        class="api-back-to-top"
        aria-label="Back to top"
        title="Back to top"
        @click="scrollToTop"
      >
        <ArrowUp :size="18" />
      </button>
    </transition>
  </div>
</template>

<style>
.api-docs {
  --primary: #e6ac03;
  --primary-hover: #f0c04d;
  --primary-light: rgba(230, 172, 3, 0.12);
  --text-color: #f7f9fc;
  --text-muted: #aeb8c7;
  --border-color: rgba(234, 234, 234, 0.14);
  --sidebar-width: 320px;
  --nav-height: 64px;
  --glass-bg: rgba(0, 23, 45, 0.9);
  --glass-border: rgba(234, 234, 234, 0.12);
  --glass-shadow: 0 4px 20px rgba(0, 0, 0, 0.22);
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
  background: #00172d;
  color: var(--text-color);
}

.api-docs .glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

.api-overlay {
  display: none;
  position: fixed;
  inset: var(--nav-height) 0 0;
  z-index: 45;
  border: 0;
  background: rgba(0, 8, 18, 0.68);
  backdrop-filter: blur(4px);
}

.api-back-to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 60;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--border-gold);
  border-radius: 50%;
  background: #061f38;
  color: var(--primary);
  box-shadow: var(--shadow-card);
  cursor: pointer;
  transition: var(--transition-fast);
}

.api-back-to-top:hover {
  background: var(--primary);
  color: #00172d;
  transform: translateY(-2px);
}

.api-fade-enter-active,
.api-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.api-fade-enter-from,
.api-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .api-overlay {
    display: block;
  }

  .api-back-to-top {
    right: 18px;
    bottom: 18px;
    width: 38px;
    height: 38px;
  }
}
</style>
