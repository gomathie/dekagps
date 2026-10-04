<template>
  <header class="hero" :style="{ backgroundImage: `url('${bgImage}')` }">
    <div class="container">
      <div class="hero-inner">
        <div class="hero-text-box" v-reveal>
          <h1 class="gradient-text">Cutting-Edge Fleet &amp;<br>Technology Solutions</h1>
          <div class="gold-divider"></div>
          <p class="subtitle">Our cutting-edge technologies optimize all business processes to give the highest efficiency. The best solutions you can always trust!</p>
          <router-link to="/services" class="btn-primary" style="margin-top: 1rem;">
            Explore More <i class="fas fa-long-arrow-alt-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Imported so Vite fingerprints the file and rewrites the URL for the production
// bundle. A raw relative string only resolves while the dev server serves the
// project root, which is why the hero background disappeared after `vite build`.
import bgImage from '../../images/Leverage-1.webp';
</script>

<style scoped>
.hero {
  min-height: 660px;
  display: flex;
  align-items: center;
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 0;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero .container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}

.hero-inner {
  display: flex;
  align-items: center;
  min-height: 660px;
}

.hero-text-box {
  background: rgba(0, 0, 17, 0.47);
  border-radius: 4px;
  padding: 60px 50px;
  max-width: 550px;
}

.hero-text-box h1 {
  font-size: 1.625rem;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: #ffffff;
  margin-bottom: 0;
  line-height: 1.4;
}

.gold-divider {
  width: 10%;
  height: 2px;
  background: var(--accent-gold);
  margin: 12px 0;
}

.hero-text-box .subtitle {
  font-size: 0.95rem;
  color: var(--text-primary);
  opacity: 0.85;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.hero-text-box .btn-ghost {
  color: #ffffff;
  border-bottom: 2px solid #ffffff;
}

.hero-text-box .btn-ghost:hover {
  color: var(--accent-gold);
  border-color: var(--accent-gold);
}

.hero-text-box .btn-ghost i {
  margin-left: 4px;
}

@media (max-width: 768px) {
  .hero {
    min-height: 500px;
  }

  .hero-inner {
    min-height: 500px;
  }

  .hero-text-box {
    padding: 30px 25px;
    max-width: 100%;
  }

  .hero-text-box h1 {
    font-size: 1.3rem;
  }
}
</style>
