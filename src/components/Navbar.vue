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
        <button class="nav-drop-toggle" type="button">
          Services <i class="fas fa-chevron-down"></i>
        </button>
        <ul class="dropdown-menu">
          <li><router-link to="/services" @click="closeMobileMenu">All Services</router-link></li>
          <li><router-link to="/tracking-solutions" @click="closeMobileMenu">Tracking Solutions</router-link></li>
          <li><router-link to="/fuel-monitoring" @click="closeMobileMenu">Fuel Monitoring</router-link></li>
          <li><router-link to="/fleet-management" @click="closeMobileMenu">Fleet Management</router-link></li>
          <li><router-link to="/driver-behavior" @click="closeMobileMenu">Driver Behavior</router-link></li>
          <li><router-link to="/telematics" @click="closeMobileMenu">Telematics</router-link></li>
          <li><router-link to="/iot-smart-homes" @click="closeMobileMenu">IoT and Smart Homes</router-link></li>
          <li><router-link to="/web-services" @click="closeMobileMenu">Web Services</router-link></li>
          <li><router-link to="/vehicle-leasing-solution" @click="closeMobileMenu">Vehicle Leasing Solution</router-link></li>
        </ul>
      </li>

      <li class="dropdown">
        <button class="nav-drop-toggle" type="button">
          Industries <i class="fas fa-chevron-down"></i>
        </button>
        <ul class="dropdown-menu">
          <li><router-link to="/industries" @click="closeMobileMenu">All Industries</router-link></li>
          <li><router-link to="/smart-farming" @click="closeMobileMenu">Smart Farming</router-link></li>
          <li><router-link to="/industries/perfect-fit" @click="closeMobileMenu">Perfect Fit for Any Industry</router-link></li>
        </ul>
      </li>

      <li class="dropdown">
        <button class="nav-drop-toggle" type="button">
          Resources <i class="fas fa-chevron-down"></i>
        </button>
        <ul class="dropdown-menu">
          <li><router-link to="/docs" @click="closeMobileMenu">User Guide</router-link></li>
          <li><router-link to="/blog" @click="closeMobileMenu">Blog</router-link></li>
          <li><router-link to="/faq" @click="closeMobileMenu">FAQ</router-link></li>
          <li><router-link to="/technical-support" @click="closeMobileMenu">Technical Support</router-link></li>
          <li><router-link to="/privacy-policy" @click="closeMobileMenu">Privacy Policy</router-link></li>
        </ul>
      </li>

      <li><router-link to="/pricing" @click="closeMobileMenu">Pricing</router-link></li>
    </ul>
    <div class="nav-actions">
      <router-link to="/contact" class="btn-ghost">Contact</router-link>
      <router-link to="/book-a-demo" class="btn-primary">Book a Demo</router-link>
    </div>
    <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
      <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>
  </nav>
</template>

<style scoped>
/* The dropdown triggers are <button>s so they are keyboard reachable.
   They intentionally inherit the look of the other nav links. */
.nav-drop-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0;
  transition: var(--transition-fast);
}

.nav-drop-toggle i {
  font-size: 0.65rem;
}

.dropdown:hover .nav-drop-toggle,
.dropdown:focus-within .nav-drop-toggle,
.nav-drop-toggle:hover {
  color: var(--accent-gold);
}

.dropdown:focus-within .dropdown-menu {
  display: block;
}

/* Mobile menu */
@media (max-width: 768px) {
  .nav-links.mobile-open {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    background: rgba(0, 23, 45, 0.98);
    backdrop-filter: blur(12px);
    padding: 2rem;
    gap: 1.25rem;
    z-index: 999;
    border-bottom: 1px solid var(--border-light);
  }

  .nav-actions {
    display: none;
  }

  /* Inside the mobile drawer the dropdowns are expanded lists */
  .nav-links.mobile-open .dropdown-menu {
    display: block;
    position: static;
    background: rgba(0, 23, 45, 0.5);
    border: none;
    box-shadow: none;
    margin-top: 0.5rem;
    min-width: 100%;
  }
}
</style>
