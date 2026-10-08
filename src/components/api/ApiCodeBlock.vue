<template>
  <div class="code-block-wrapper">
    <div class="code-header">
      <div class="lang-tag">
        <span class="dot"></span>
        <span class="lang-name">{{ language }}</span>
      </div>
      <button class="copy-btn" @click="copyCode" :class="{ 'copied': copied }">
        <Copy v-if="!copied" :size="13" />
        <Check v-else :size="13" />
        <span>{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </div>
    <pre><code :class="language">{{ code }}</code></pre>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Copy, Check } from '@lucide/vue';

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'json'
  }
});

const copied = ref(false);

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch (err) {
    console.error('Failed to copy', err);
  }
};
</script>

<style scoped>
.code-block-wrapper {
  border-radius: 8px;
  overflow: hidden;
  margin: 14px 0 20px;
  background-color: #0f172a;
  border: 1px solid #334155;
  color: #e2e8f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  background-color: #1e293b;
  border-bottom: 1px solid #334155;
  font-size: 12px;
}

.lang-tag {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
}

.lang-name {
  font-size: 11px;
  font-family: 'Fira Code', monospace;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
  font-weight: 600;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.18s ease;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.2);
}

.copy-btn.copied {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.3);
}

pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 13px;
  line-height: 1.6;
}

code {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
