<template>
  <header class="hero" :style="{ backgroundImage: `url('${bgImage}')` }">
    <div class="container">
      <div class="hero-inner">
        <div class="hero-text-box" v-reveal>
          <p class="hero-eyebrow">ONEGPS TELEMATICS PLATFORM</p>
          <h1>Clarity for every mile your business moves.</h1>
          <div class="gold-divider"></div>
          <p class="subtitle">Track assets in real time, reduce operating costs, and turn fleet data into confident decisions with one connected platform.</p>
          <div class="hero-actions">
            <router-link to="/book-a-demo" class="btn-primary">Book a Demo <i class="fas fa-arrow-right"></i></router-link>
            <router-link to="/services" class="btn-ghost">Explore solutions <i class="fas fa-arrow-right"></i></router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Imported so Vite fingerprints the file and rewrites the URL for the production
// bundle. A raw relative string only resolves while the dev server serves the
// project root, which is why the hero background disappeared after `vite build`.
import bgImage from '../../images/Is-Your-Fleet-Ready-for-GPS-Tracking-Solutions_-Find-Out-Why-Its-Crucial.webp';
</script>

<style scoped>
.hero {
  min-height: min(760px, 88vh);
  display: flex;
  align-items: center;
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 5rem 0 3rem;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 8, 18, 0.54);
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
  min-height: min(760px, 88vh);
}

.hero-text-box {
  max-width: 680px;
  padding: 2rem 0;
}

.hero-eyebrow {
  color: var(--accent-gold);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  margin-bottom: 1.25rem;
}

.hero-text-box h1 {
  font-size: clamp(2.75rem, 5vw, 4.75rem);
  text-transform: capitalize;
  letter-spacing: 0;
  color: #ffffff;
  margin-bottom: 0;
  line-height: 1.04;
}

.gold-divider {
  width: 10%;
  height: 2px;
  background: var(--accent-gold);
  margin: 12px 0;
}

.hero-text-box .subtitle {
  max-width: 560px;
  font-size: 1.08rem;
  color: var(--text-primary);
  opacity: 0.85;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 1.75rem;
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
    min-height: 620px;
    padding: 4rem 0 2rem;
  }

  .hero-inner {
    min-height: 620px;
  }

  .hero-text-box {
    padding: 1.5rem 0;
    max-width: 100%;
  }

  .hero-text-box h1 {
    font-size: 2.65rem;
  }

  .hero-text-box .subtitle { font-size: 1rem; }
}
</style>
