<template>
  <header class="top-navbar glass-panel">
    <div class="nav-left">
      <!-- Mobile hamburger toggle button -->
      <button class="menu-btn md:hidden" @click="$emit('toggle-sidebar')" aria-label="Toggle navigation">
        <Menu :size="22" />
      </button>

      <router-link to="/" class="brand-link">
        <span class="brand-mark">O</span>
        <span class="brand-text">One<span>GPS</span></span>
        <div class="brand-divider"></div>
        <span class="nav-app-title">API Docs</span>
      </router-link>

      <span class="nav-version-badge">
        {{ currentVersion === 'v3' ? 'NextGen (v3)' : 'Standard (v2)' }}
      </span>
    </div>

    <div class="nav-right">
      <router-link to="/docs" class="nav-link-item hidden sm:flex">
        <BookOpen :size="15" />
        <span>User Guide</span>
      </router-link>
      <a :href="'mailto:' + brand.supportEmail" class="nav-link-item hidden sm:flex">
        <LifeBuoy :size="15" />
        <span>Support</span>
      </a>

      <a 
        :href="brand.platformUrl"
        target="_blank" 
        rel="noopener noreferrer" 
        class="signin-btn"
      >
        <span>OneGPS Platform</span>
        <ExternalLink :size="14" class="signin-icon" />
      </a>
    </div>
  </header>
</template>

<script setup>
import { BookOpen, Menu, ExternalLink, LifeBuoy } from '@lucide/vue';
import brand from '../../api/brand.js';

defineProps({
  currentVersion: {
    type: String,
    default: 'v2'
  }
});

defineEmits(['toggle-sidebar']);
</script>

<style scoped>
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height, 64px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
  border-bottom: 1px solid var(--border-color);
  background: rgba(0, 23, 45, 0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.menu-btn {
  background: none;
  border: none;
  padding: 6px;
  border-radius: 6px;
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.06);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-color);
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--primary);
  border-radius: 50%;
  color: var(--primary);
  font-family: var(--font-heading);
  font-weight: 700;
}

.brand-text {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0;
  color: var(--text-color);
}

.brand-text span {
  color: var(--primary);
}

.brand-divider {
  width: 1px;
  height: 18px;
  background-color: var(--border-color);
}

.nav-app-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
}

.nav-version-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--primary-light);
  color: var(--primary);
  border: 1px solid var(--border-gold);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-link-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link-item:hover {
  color: var(--primary);
  background: rgba(255, 255, 255, 0.05);
}

/* Modern Sign In Button */
.signin-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--primary);
  color: #00172d !important;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(230, 172, 3, 0.22);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.signin-btn:hover {
  background: var(--primary-hover);
  box-shadow: 0 4px 14px rgba(230, 172, 3, 0.32);
  transform: translateY(-1px);
}

.signin-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(230, 172, 3, 0.2);
}

.signin-icon {
  transition: transform 0.2s ease;
}

.signin-btn:hover .signin-icon {
  transform: translate(1px, -1px);
}

.md\:hidden {
  display: none;
}

.hidden {
  display: none;
}

@media (min-width: 640px) {
  .sm\:flex {
    display: flex;
  }
}

@media (max-width: 768px) {
  .md\:hidden {
    display: flex;
  }
  
  .top-navbar {
    padding: 0 12px;
  }
  
  .brand-mark {
    width: 28px;
    height: 28px;
  }

  .brand-text {
    font-size: 16px;
  }
  
  .nav-app-title,
  .brand-divider {
    display: none;
  }

  .signin-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .nav-version-badge {
    display: none;
  }
  
  .nav-left {
    gap: 8px;
  }
}
</style>
