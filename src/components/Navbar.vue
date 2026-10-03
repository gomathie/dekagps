<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <router-link to="/" class="logo" @click="closeMobileMenu">
      <span class="logo-icon">O</span>
      <span class="logo-text">One<span class="highlight">GPS</span></span>
    </router-link>
    <ul class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
      <li><router-link to="/" @click="closeMobileMenu">Home</router-link></li>
      <li class="dropdown">
        <a href="#">Services ▾</a>
        <ul class="dropdown-menu">
          <li><router-link to="/fleet-management" @click="closeMobileMenu">Fleet Management</router-link></li>
          <li><router-link to="/fuel-monitoring" @click="closeMobileMenu">Fuel Monitoring</router-link></li>
          <li><router-link to="/driver-behavior" @click="closeMobileMenu">Driver Behavior</router-link></li>
          <li><router-link to="/tracking-solutions" @click="closeMobileMenu">Tracking Solutions</router-link></li>
          <li><router-link to="/iot-smart-homes" @click="closeMobileMenu">IoT and Smart Homes</router-link></li>
          <li><router-link to="/web-services" @click="closeMobileMenu">Web Services</router-link></li>
        </ul>
      </li>
      <li><router-link to="/industries" @click="closeMobileMenu">Industries</router-link></li>
      <li><router-link to="/pricing" @click="closeMobileMenu">Pricing</router-link></li>
    </ul>
    <div class="nav-actions">
      <a href="#" class="btn-ghost">Log In</a>
      <a href="#" class="btn-primary">Get Started</a>
    </div>
    <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
      <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>
  </nav>
</template>

<style scoped>
/* Mobile menu */
@media (max-width: 768px) {
  .nav-links.mobile-open {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(0, 23, 45, 0.98);
    backdrop-filter: blur(12px);
    padding: 2rem;
    gap: 1.5rem;
    z-index: 999;
    border-bottom: 1px solid var(--border-light);
  }

  .nav-actions {
    display: none;
  }

  .dropdown-menu {
    position: static !important;
    background: rgba(0, 23, 45, 0.5) !important;
    border: none !important;
    box-shadow: none !important;
    margin-top: 0.5rem;
  }
}
</style>
