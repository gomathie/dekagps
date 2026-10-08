<template>
  <main class="content-area">
    <div class="content-container">
      <header class="content-header">
        <div class="header-badge-row">
          <span class="version-tag">{{ version === 'v3' ? 'NextGen API (v3)' : 'Standard API (v2)' }}</span>
          <span class="endpoints-count-badge">{{ totalEndpoints }} endpoints available</span>
        </div>
        <h1>{{ brand.name }} {{ version === 'v3' ? 'NextGen API' : 'Standard API' }} Documentation</h1>
        <p class="subtitle">
          {{ version === 'v3' 
            ? 'Modern NextGen REST API with Bearer token authentication, JSON payloads, and full telematics capabilities.' 
            : 'Standard API endpoints for telematics, vehicle status, and command execution.' 
          }}
        </p>

        <!-- V3 Quick Overview Card -->
        <div v-if="version === 'v3'" class="quickstart-card glass-panel">
          <div class="quickstart-title">
            <Key :size="18" class="icon-accent" />
            <h3>NextGen API (v3) Authentication & Node Routing</h3>
          </div>
          <div class="quickstart-grid">
            <div class="quickstart-step">
              <span class="step-num">1</span>
              <div>
                <strong>Get Access Token:</strong>
                <p>Send a POST request to <code>/api/v3/auth/token</code> with your login credentials to receive a Bearer token.</p>
              </div>
            </div>
            <div class="quickstart-step">
              <span class="step-num">2</span>
              <div>
                <strong>Authorize Requests:</strong>
                <p>Include the token in all requests in the header: <code>Authorization: Bearer {token}</code>.</p>
              </div>
            </div>
            <div class="quickstart-step">
              <span class="step-num">3</span>
              <div>
                <strong>Cluster Node Header:</strong>
                <p>If authentication returns a non-zero <code>node_id</code>, include <code>X-Node-Id: {node_id}</code> in subsequent requests.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- V2 Quick Overview Card -->
        <div v-else class="quickstart-card glass-panel">
          <div class="quickstart-title">
            <Layers :size="18" class="icon-accent" />
            <h3>Standard API (v2) Overview</h3>
          </div>
          <p class="quickstart-text">
            Standard v2 endpoints support standard <code>GET</code> requests with query parameters (e.g. <code>cmd=list</code>) and <code>POST</code> requests with <code>multipart/form-data</code>.
          </p>
        </div>
      </header>
      
      <div class="endpoints-list">
        <template v-for="category in endpoints" :key="category.category">
          <div class="category-section" :id="'cat-' + category.category.toLowerCase().replace(/\s+/g, '-')">
            <div class="category-heading">
              <h2>{{ category.category }}</h2>
              <span class="category-badge">{{ category.endpoints.length }} {{ category.endpoints.length === 1 ? 'endpoint' : 'endpoints' }}</span>
            </div>
            
            <ApiEndpoint
              v-for="endpoint in category.endpoints" 
              :key="endpoint.id" 
              :endpoint="endpoint"
            />
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { Key, Layers } from '@lucide/vue';
import ApiEndpoint from './ApiEndpoint.vue';
import brand from '../../api/brand.js';

const props = defineProps({
  endpoints: {
    type: Array,
    required: true
  },
  version: {
    type: String,
    default: 'v2'
  }
});

const totalEndpoints = computed(() => {
  return props.endpoints.reduce((acc, cat) => acc + cat.endpoints.length, 0);
});
</script>

<style scoped>
.content-area {
  margin-left: var(--sidebar-width);
  margin-top: var(--nav-height, 64px);
  min-height: calc(100vh - var(--nav-height, 64px));
  padding: 40px 64px 80px;
  transition: margin-left 0.3s ease;
  flex: 1;
  min-width: 0;
  width: calc(100% - var(--sidebar-width));
  max-width: 100%;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
    margin-top: var(--nav-height, 64px);
    padding: 24px 14px 48px;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
}

.content-container {
  width: 100%;
  max-width: 860px;
  min-width: 0;
  margin: 0 auto;
}

.content-header {
  margin-bottom: 56px;
}

.header-badge-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.version-tag {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 9999px;
  background: var(--primary);
  color: #00172d;
  letter-spacing: 0.04em;
}

.endpoints-count-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-muted);
}

h1 {
  font-size: clamp(20px, 5vw, 32px);
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: 0;
  color: var(--text-color);
  line-height: 1.25;
  overflow-wrap: break-word;
  word-break: break-word;
}

.subtitle {
  font-size: clamp(13px, 3.5vw, 15px);
  color: var(--text-muted);
  margin-bottom: 24px;
  line-height: 1.55;
  overflow-wrap: break-word;
  word-break: break-word;
}

.quickstart-card {
  padding: 16px 18px;
  border-radius: 8px;
  margin-top: 16px;
  background: rgba(0, 18, 37, 0.76);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.quickstart-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.quickstart-title h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.35;
  overflow-wrap: break-word;
  word-break: break-word;
}

.icon-accent {
  color: var(--primary);
}

.quickstart-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 640px) {
  .quickstart-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.quickstart-step {
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: var(--text-muted);
}

.quickstart-step strong {
  color: var(--text-color);
  display: block;
  margin-bottom: 4px;
}

.quickstart-step p {
  margin: 0;
  line-height: 1.4;
}

.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--primary);
  color: #00172d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 11px;
  flex-shrink: 0;
  margin-top: 2px;
}

.quickstart-text {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

.category-section {
  margin-bottom: 48px;
}

.category-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--border-color);
}

.category-heading h2 {
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  color: var(--text-color);
}

.category-badge {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 3px 10px;
  border-radius: 9999px;
}
</style>
