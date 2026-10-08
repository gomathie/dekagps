<template>
  <div class="endpoint-detail" :id="endpoint.id">
    <div class="endpoint-header">
      <div class="title-row">
        <h2>{{ endpoint.title }}</h2>
        <div class="badges-row">
          <span class="method-badge" :class="endpoint.method.toLowerCase()">
            {{ endpoint.method }}
          </span>
          <span v-if="endpoint.auth" class="auth-badge" title="Bearer token required">
            <Lock :size="12" />
            Bearer Auth
          </span>
        </div>
      </div>
    </div>
    
    <div class="endpoint-url glass-panel">
      <div class="url-badge-group">
        <span class="method-tag" :class="endpoint.method.toLowerCase()">{{ endpoint.method }}</span>
        <code>{{ endpoint.url }}</code>
      </div>
      <button class="copy-url-btn" @click="copyUrl" :title="copiedUrl ? 'Copied!' : 'Copy URL'">
        <Copy v-if="!copiedUrl" :size="14" />
        <Check v-else :size="14" class="text-green" />
      </button>
    </div>
    
    <p v-if="endpoint.description" class="description">{{ endpoint.description }}</p>
    
    <!-- Parameters (Query, Path, Header) -->
    <div v-if="endpoint.parameters && endpoint.parameters.length > 0" class="section">
      <h3>Parameters</h3>
      <div class="table-container glass-panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type / In</th>
              <th>Description</th>
              <th>Required</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="param in endpoint.parameters" :key="param.name">
              <td class="param-name"><code>{{ param.name }}</code></td>
              <td>
                <span class="type-tag">{{ param.type || 'string' }}</span>
                <span v-if="param.in" class="in-tag">{{ param.in }}</span>
              </td>
              <td class="param-desc">{{ param.description || '—' }}</td>
              <td>
                <span v-if="param.required" class="badge required">Required</span>
                <span v-else class="badge optional">Optional</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Request Body (JSON payload) -->
    <div v-if="endpoint.requestBody && endpoint.requestBody.parameters && endpoint.requestBody.parameters.length > 0" class="section">
      <div class="section-header-inline">
        <h3>Request Body</h3>
        <span class="content-type-badge">{{ endpoint.requestBody.contentType || 'application/json' }}</span>
      </div>
      <div class="table-container glass-panel">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
              <th>Required</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="field in endpoint.requestBody.parameters" :key="field.name">
              <td class="param-name"><code>{{ field.name }}</code></td>
              <td>
                <span class="type-tag">{{ field.type || 'string' }}</span>
              </td>
              <td class="param-desc">{{ field.description || '—' }}</td>
              <td>
                <span v-if="field.required" class="badge required">Required</span>
                <span v-else class="badge optional">Optional</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Code Samples & Response Tabs -->
    <div class="section code-samples-section">
      <div class="code-tabs-header">
        <div class="tab-buttons">
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'curl' }"
            @click="activeTab = 'curl'"
          >
            cURL
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'javascript' }"
            @click="activeTab = 'javascript'"
          >
            JavaScript
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'python' }"
            @click="activeTab = 'python'"
          >
            Python
          </button>
          <button 
            v-if="endpoint.responseExample && endpoint.responseExample !== '{}'"
            class="tab-btn" 
            :class="{ active: activeTab === 'response' }"
            @click="activeTab = 'response'"
          >
            Response (200 OK)
          </button>
        </div>
      </div>

      <div class="code-tab-content">
        <ApiCodeBlock
          v-if="activeTab === 'curl'" 
          :code="curlCode" 
          language="bash" 
        />
        <ApiCodeBlock
          v-else-if="activeTab === 'javascript'" 
          :code="jsCode" 
          language="javascript" 
        />
        <ApiCodeBlock
          v-else-if="activeTab === 'python'" 
          :code="pythonCode" 
          language="python" 
        />
        <ApiCodeBlock
          v-else-if="activeTab === 'response'" 
          :code="endpoint.responseExample" 
          language="json" 
        />
      </div>
    </div>
    
    <hr class="divider" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Lock, Copy, Check } from '@lucide/vue';
import ApiCodeBlock from './ApiCodeBlock.vue';

const props = defineProps({
  endpoint: {
    type: Object,
    required: true
  }
});

const activeTab = ref('curl');
const copiedUrl = ref(false);

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(props.endpoint.url);
    copiedUrl.value = true;
    setTimeout(() => { copiedUrl.value = false; }, 2000);
  } catch (e) {
    console.error(e);
  }
};

// Build mock request body object
const mockBody = computed(() => {
  if (!props.endpoint.requestBody?.parameters) return null;
  const obj = {};
  props.endpoint.requestBody.parameters.forEach(p => {
    if (p.example !== undefined) {
      obj[p.name] = p.example;
    } else if (p.type === 'integer' || p.type === 'number') {
      obj[p.name] = 0;
    } else if (p.type === 'boolean') {
      obj[p.name] = true;
    } else {
      obj[p.name] = `<${p.name}>`;
    }
  });
  return obj;
});

// Generate cURL snippet
const curlCode = computed(() => {
  const lines = [`curl -X ${props.endpoint.method} "${props.endpoint.url}"`];
  if (props.endpoint.auth) {
    lines.push('  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN>"');
  }
  if (mockBody.value) {
    lines.push('  -H "Content-Type: application/json"');
    lines.push(`  -d '${JSON.stringify(mockBody.value, null, 2)}'`);
  }
  return lines.join(' \\\n');
});

// Generate JavaScript fetch snippet
const jsCode = computed(() => {
  const headers = {};
  if (props.endpoint.auth) {
    headers['Authorization'] = 'Bearer <YOUR_ACCESS_TOKEN>';
  }
  if (mockBody.value) {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method: props.endpoint.method,
    headers
  };
  if (mockBody.value) {
    options.body = 'JSON.stringify(' + JSON.stringify(mockBody.value, null, 2) + ')';
  }

  return `const response = await fetch("${props.endpoint.url}", {
  method: "${props.endpoint.method}",
  headers: ${JSON.stringify(headers, null, 4)}${mockBody.value ? ',\n  body: JSON.stringify(' + JSON.stringify(mockBody.value, null, 4) + ')' : ''}
});

const data = await response.json();
console.log(data);`;
});

// Generate Python requests snippet
const pythonCode = computed(() => {
  let code = `import requests\n\nurl = "${props.endpoint.url}"\n`;
  code += `headers = {\n`;
  if (props.endpoint.auth) {
    code += `    "Authorization": "Bearer <YOUR_ACCESS_TOKEN>",\n`;
  }
  code += `    "Content-Type": "application/json"\n}\n`;

  if (mockBody.value) {
    code += `\npayload = ${JSON.stringify(mockBody.value, null, 4)}\n`;
    code += `\nresponse = requests.${props.endpoint.method.toLowerCase()}(url, headers=headers, json=payload)\n`;
  } else {
    code += `\nresponse = requests.${props.endpoint.method.toLowerCase()}(url, headers=headers)\n`;
  }
  code += `print(response.json())`;
  return code;
});
</script>

<style scoped>
.endpoint-detail {
  margin-bottom: 64px;
  scroll-margin-top: 100px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: hidden;
}

.endpoint-header {
  margin-bottom: 16px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 640px) {
  .title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

h2 {
  margin: 0;
  font-size: clamp(17px, 4.5vw, 24px);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.35;
  overflow-wrap: break-word;
  word-break: break-word;
}

.badges-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.method-badge {
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.method-badge.get { background-color: #dbeafe; color: #1d4ed8; }
.method-badge.post { background-color: #dcfce7; color: #15803d; }
.method-badge.put { background-color: #fef9c3; color: #a16207; }
.method-badge.delete { background-color: #fee2e2; color: #b91c1c; }
.method-badge.patch { background-color: #f3e8ff; color: #7e22ce; }

.auth-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.06);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.endpoint-url {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: rgba(0, 8, 18, 0.38);
  gap: 8px;
}

.url-badge-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.method-tag {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  flex-shrink: 0;
}

.method-tag.get { background: #dbeafe; color: #1d4ed8; }
.method-tag.post { background: #dcfce7; color: #15803d; }
.method-tag.put { background: #fef9c3; color: #a16207; }
.method-tag.delete { background: #fee2e2; color: #b91c1c; }
.method-tag.patch { background: #f3e8ff; color: #7e22ce; }

.endpoint-url code {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 12px;
  color: var(--text-color);
  word-break: break-all;
}

.copy-url-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.copy-url-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-color);
}

.text-green {
  color: #10b981;
}

.description {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 24px;
  line-height: 1.6;
}

.section {
  margin-bottom: 24px;
}

h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-color);
}

.section-header-inline {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.section-header-inline h3 {
  margin-bottom: 0;
}

.content-type-badge {
  font-size: 11px;
  font-family: 'Fira Code', monospace;
  padding: 2px 7px;
  border-radius: 4px;
  background-color: var(--primary-light);
  color: var(--primary);
  border: 1px solid var(--border-gold);
}

.table-container {
  border-radius: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--border-color);
}

table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}

th, td {
  padding: 9px 12px;
  border-bottom: 1px solid var(--border-color);
}

th {
  background-color: rgba(255, 255, 255, 0.04);
  font-weight: 600;
  color: var(--text-muted);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

tr:last-child td {
  border-bottom: none;
}

.param-name code {
  background-color: rgba(255, 255, 255, 0.07);
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  color: var(--primary);
}

.type-tag {
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  color: var(--text-muted);
  margin-right: 4px;
}

.in-tag {
  font-size: 9px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 1px 4px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
}

.param-desc {
  color: var(--text-color);
  font-size: 12px;
  line-height: 1.4;
}

.badge {
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 999px;
  font-weight: 600;
}

.badge.required {
  background-color: #fee2e2;
  color: #b91c1c;
}

.badge.optional {
  background-color: rgba(255, 255, 255, 0.06);
  color: var(--text-muted);
}

/* Code Tabs */
.code-samples-section {
  margin-top: 32px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.code-tabs-header {
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 14px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.code-tabs-header::-webkit-scrollbar {
  display: none;
}

.tab-buttons {
  display: flex;
  gap: 2px;
  min-width: max-content;
}

.tab-btn {
  padding: 7px 12px;
  border: none;
  background: transparent;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  border-radius: 6px 6px 0 0;
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--text-color);
  background: rgba(255, 255, 255, 0.04);
}

.tab-btn.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  background: var(--primary-light);
}

.divider {
  border: 0;
  height: 1px;
  background: var(--border-color);
  margin: 40px 0 0 0;
}
</style>
