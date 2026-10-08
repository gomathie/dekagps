<template>
  <aside class="sidebar glass-panel" :class="{ 'is-open': isOpen }">
    <!-- Mobile close header -->
    <div class="sidebar-mobile-bar md:hidden">
      <span class="mobile-bar-title">API Navigation</span>
      <button class="close-btn" @click="$emit('close')">
        <X :size="20" />
      </button>
    </div>

    <!-- Modern Segmented Version Switcher -->
    <div class="version-switcher-container">
      <div class="version-segmented-control">
        <button 
          class="version-btn" 
          :class="{ active: currentVersion === 'v3' }"
          @click="switchVersion('v3')"
        >
          <div class="btn-main">
            <span class="version-pill">v3</span>
            <span class="btn-label">NextGen API</span>
          </div>
          <span class="endpoint-badge">96</span>
        </button>
        <button 
          class="version-btn" 
          :class="{ active: currentVersion === 'v2' }"
          @click="switchVersion('v2')"
        >
          <div class="btn-main">
            <span class="version-pill">v2</span>
            <span class="btn-label">Standard API</span>
          </div>
          <span class="endpoint-badge">74</span>
        </button>
      </div>
    </div>
    
    <div class="search-container">
      <div class="search-input-wrapper">
        <Search class="search-icon" :size="16" />
        <input 
          type="text" 
          v-model="searchQuery" 
          :placeholder="`Search ${currentVersion.toUpperCase()} endpoints...`" 
          class="search-input"
        />
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <div v-for="category in filteredEndpoints" :key="category.category" class="nav-category">
        <div class="category-header">
          <h3 class="category-title">{{ category.category }}</h3>
          <span class="category-count">{{ category.endpoints.length }}</span>
        </div>
        <ul class="api-nav-links">
          <li v-for="endpoint in category.endpoints" :key="endpoint.id">
            <a 
              :href="'#' + endpoint.id" 
              class="nav-link"
              :class="{ 'active': activeEndpoint === endpoint.id }"
              @click="$emit('close')"
            >
              <span class="method-mini" :class="endpoint.method.toLowerCase()">{{ endpoint.method }}</span>
              <span class="link-title">{{ endpoint.title }}</span>
            </a>
          </li>
        </ul>
      </div>
      
      <div v-if="filteredEndpoints.length === 0" class="no-results">
        No endpoints found matching "{{ searchQuery }}"
      </div>
    </nav>
    
    <div class="sidebar-footer">
      <a :href="'mailto:' + brand.supportEmail" class="support-link">
        <LifeBuoy :size="16" />
        Support
      </a>
      <div class="version-label">
        <span>{{ brand.name }}</span>
        <span class="active-version-tag">{{ currentVersion.toUpperCase() }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Search, X, LifeBuoy } from '@lucide/vue';
import brand from '../../api/brand.js';

const props = defineProps({
  endpoints: {
    type: Array,
    required: true
  },
  activeEndpoint: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  currentVersion: {
    type: String,
    default: 'v2'
  }
});

const emit = defineEmits(['close']);
const router = useRouter();
const searchQuery = ref('');

const switchVersion = (ver) => {
  if (props.currentVersion !== ver) {
    searchQuery.value = '';
    router.push(`/docs/api/${ver}`);
    emit('close');
  }
};

const filteredEndpoints = computed(() => {
  if (!searchQuery.value) return props.endpoints;
  
  const query = searchQuery.value.toLowerCase();
  
  return props.endpoints.map(category => {
    const filtered = category.endpoints.filter(endpoint => 
      endpoint.title.toLowerCase().includes(query) || 
      (endpoint.description && endpoint.description.toLowerCase().includes(query)) ||
      (endpoint.url && endpoint.url.toLowerCase().includes(query)) ||
      endpoint.method.toLowerCase().includes(query)
    );
    
    return {
      ...category,
      endpoints: filtered
    };
  }).filter(category => category.endpoints.length > 0);
});
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: calc(100vh - var(--nav-height, 64px));
  position: fixed;
  top: var(--nav-height, 64px);
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: transform 0.3s ease;
  border-right: 1px solid var(--glass-border);
  border-radius: 0;
  background: rgba(0, 23, 45, 0.96);
}

@media (max-width: 768px) {
  .sidebar {
    width: min(320px, 86vw);
    top: var(--nav-height, 64px);
    height: calc(100dvh - var(--nav-height, 64px));
    height: calc(100vh - var(--nav-height, 64px));
    transform: translateX(-100%);
    background: #00172d;
    box-shadow: 6px 0 28px rgba(0, 0, 0, 0.16);
  }
  
  .sidebar.is-open {
    transform: translateX(0);
  }
}

.sidebar-mobile-bar {
  padding: 12px 18px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
}

.mobile-bar-title {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-color);
}

/* Modern Segmented Control */
.version-switcher-container {
  padding: 14px 16px 6px;
}

.version-segmented-control {
  display: flex;
  background: rgba(0, 8, 18, 0.5);
  border: 1px solid var(--border-color);
  padding: 3px;
  border-radius: 8px;
  gap: 3px;
}

.version-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  border: none;
  background: transparent;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: inherit;
  color: var(--text-muted);
  outline: none;
}

.version-btn:hover {
  color: var(--text-color);
  background: rgba(255, 255, 255, 0.05);
}

.version-btn.active {
  background: #061f38;
  color: var(--text-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}

.btn-main {
  display: flex;
  align-items: center;
  gap: 6px;
}

.version-pill {
  font-size: 10px;
  font-weight: 700;
  font-family: 'Fira Code', monospace;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
  transition: all 0.18s ease;
}

.version-btn.active .version-pill {
  background: var(--primary-light);
  color: var(--primary);
}

.btn-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
}

.endpoint-badge {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  padding: 1px 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
}

.version-btn.active .endpoint-badge {
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.06);
}

.search-container {
  padding: 12px 20px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  padding: 9px 10px 9px 36px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: rgba(0, 8, 18, 0.4);
  color: var(--text-color);
  font-size: 13px;
  transition: all 0.2s;
  font-family: inherit;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  background-color: #061f38;
  box-shadow: 0 0 0 3px rgba(230, 172, 3, 0.12);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 20px;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 8px 8px;
}

.category-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin: 0;
  font-weight: 700;
}

.category-count {
  font-size: 11px;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 1px 6px;
  border-radius: 10px;
}

.api-nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  color: var(--text-color);
  font-size: 13px;
  border-radius: 6px;
  margin-bottom: 2px;
  transition: all 0.15s;
  text-decoration: none;
}

.link-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.method-mini {
  font-size: 9px;
  font-weight: 800;
  padding: 2px 5px;
  border-radius: 3px;
  letter-spacing: 0.02em;
  font-family: 'Fira Code', monospace;
  flex-shrink: 0;
}

.method-mini.get { background: #dbeafe; color: #1d4ed8; }
.method-mini.post { background: #dcfce7; color: #15803d; }
.method-mini.put { background: #fef9c3; color: #a16207; }
.method-mini.delete { background: #fee2e2; color: #b91c1c; }
.method-mini.patch { background: #f3e8ff; color: #7e22ce; }

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.06);
  color: var(--primary);
}

.nav-link.active {
  background-color: var(--primary-light);
  color: var(--primary);
  font-weight: 600;
}

.no-results {
  padding: 24px 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
}

.sidebar-footer {
  padding: 14px 20px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  background: rgba(0, 8, 18, 0.35);
}

.support-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  text-decoration: none;
}

.support-link:hover {
  color: var(--primary);
}

.version-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 12px;
}

.active-version-tag {
  background: var(--primary);
  color: #00172d;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 11px;
}

.md\:hidden {
  display: none;
}

@media (max-width: 768px) {
  .md\:hidden {
    display: flex;
  }
}
</style>
