<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { CarFront, Truck } from '@lucide/vue'
import { gsap } from 'gsap'

const heroScene = ref(null)
let animationContext

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  animationContext = gsap.context(() => {
    const timeline = gsap.timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } })
    timeline.fromTo('.hero-vehicle-one', { x: '-8%', y: '4%' }, { x: '22%', y: '-2%', duration: 5 }).to('.hero-vehicle-one', { x: '42%', y: '8%', duration: 4 }).to('.hero-vehicle-one', { x: '-8%', y: '4%', duration: 5 })
    gsap.to('.hero-vehicle-two', { x: '18%', y: '-12%', duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.hero-vehicle-three', { x: '-14%', y: '10%', duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.hero-vehicle-four', { x: '12%', y: '8%', duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.hero-vehicle-five', { x: '-16%', y: '-8%', duration: 6.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.hero-vehicle-six', { x: '10%', y: '-14%', duration: 7.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.telemetry-bar', { scaleX: 0.35, duration: 1.4, repeat: -1, yoyo: true, stagger: 0.18, transformOrigin: 'left center', ease: 'power1.inOut' })
    gsap.to('.hero-signal', { opacity: 0.35, scale: 1.35, duration: 1.5, repeat: -1, yoyo: true, stagger: 0.3, transformOrigin: 'center' })
  }, heroScene.value)
})
onUnmounted(() => animationContext?.revert())
</script>

<template>
  <header class="hero">
    <div ref="heroScene" class="hero-motion" aria-hidden="true">
      <div class="map-surface">
        <span class="map-road road-one"></span>
        <span class="map-road road-two"></span>
        <span class="map-road road-three"></span>
        <span class="map-road road-four"></span>
        <span class="map-district district-one">NORTH HUB</span>
        <span class="map-district district-two">INDUSTRIAL ZONE</span>
        <span class="map-district district-three">EAST DEPOT</span>
      </div>
      <span class="route-line route-line-one"></span>
      <span class="route-line route-line-two"></span>
      <span class="hero-signal marker-one"></span>
      <span class="hero-signal marker-two"></span>
      <span class="hero-signal marker-three"></span>
      <span class="hero-vehicle hero-vehicle-one"><CarFront :size="25" /></span>
      <span class="hero-vehicle hero-vehicle-two"><Truck :size="28" /></span>
      <span class="hero-vehicle hero-vehicle-three"><CarFront :size="22" /></span>
      <span class="hero-vehicle hero-vehicle-four"><CarFront :size="20" /></span>
      <span class="hero-vehicle hero-vehicle-five"><Truck :size="24" /></span>
      <span class="hero-vehicle hero-vehicle-six"><CarFront :size="19" /></span>
      <span class="live-chip"><b></b> LIVE FLEET VIEW</span>
      <div class="telemetry-card"><span><b>24</b> active units</span><i class="telemetry-bar"></i><i class="telemetry-bar"></i><i class="telemetry-bar"></i></div>
      <div class="fleet-status"><span class="status-title">FLEET STATUS</span><span><b class="status-dot status-moving"></b> Moving <strong>18</strong></span><span><b class="status-dot status-idle"></b> Idle <strong>04</strong></span><span><b class="status-dot status-alert"></b> Alerts <strong>02</strong></span></div>
    </div>
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

<style scoped>
.hero {
  min-height: min(760px, 88vh);
  display: flex;
  align-items: center;
  position: relative;
  background: #00172d;
  padding: 5rem 0 3rem;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 8, 18, 0.54);
  z-index: 1;
}

.hero-motion { position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
.map-surface { position: absolute; inset: 0; opacity: 0.62; background-color: #06213b; background-image: linear-gradient(rgba(96,151,181,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(96,151,181,0.12) 1px, transparent 1px); background-size: 54px 54px; transform: perspective(700px) rotateX(8deg) scale(1.08); transform-origin: center bottom; }
.map-surface::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 64% 48%, transparent 0 18%, rgba(0,12,25,0.34) 70%); }
.map-road { position: absolute; height: 12px; border-top: 2px solid rgba(211,231,237,0.25); border-bottom: 1px solid rgba(211,231,237,0.1); transform-origin: left center; }
.road-one { left: -4%; top: 28%; width: 76%; transform: rotate(14deg); }
.road-two { left: 31%; top: -8%; width: 120%; transform: rotate(72deg); }
.road-three { left: 48%; top: 74%; width: 75%; transform: rotate(-22deg); }
.road-four { left: -10%; top: 71%; width: 65%; transform: rotate(-7deg); }
.map-district { position: absolute; color: rgba(207,229,237,0.38); font-size: 0.56rem; letter-spacing: 0.16em; }
.district-one { left: 8%; top: 20%; }
.district-two { left: 57%; top: 28%; }
.district-three { right: 8%; bottom: 23%; }
.route-line { position: absolute; height: 2px; width: 34%; background: var(--accent-gold); opacity: 0.55; transform-origin: left center; animation: route-draw 5s ease-in-out infinite; }
.route-line-one { left: 4%; top: 31%; width: 58%; transform: rotate(12deg); }
.route-line-two { right: 2%; top: 61%; width: 64%; transform: rotate(-18deg); animation-delay: 1.2s; }
.hero-signal { position: absolute; width: 15px; height: 15px; border: 2px solid var(--accent-gold); border-radius: 50%; background: #00172d; }
.hero-vehicle { position: absolute; display: grid; place-items: center; color: var(--accent-gold); filter: drop-shadow(0 5px 10px rgba(0,0,0,0.35)); }
.hero-vehicle-one { right: 38%; top: 39%; }
.hero-vehicle-two { right: 14%; top: 48%; color: #fff; }
.hero-vehicle-three { right: 27%; top: 66%; }
.hero-vehicle-four { left: 13%; top: 62%; color: #fff; }
.hero-vehicle-five { left: 28%; top: 24%; }
.hero-vehicle-six { right: 6%; top: 32%; color: #fff; }
.marker-one { right: 39%; top: 43%; }
.marker-two { right: 16%; top: 52%; animation-delay: 0.8s; }
.marker-three { right: 29%; top: 70%; animation-delay: 1.6s; }
.live-chip { position: absolute; right: 7%; top: 20%; padding: 0.6rem 0.8rem; border: 1px solid rgba(230,172,3,0.4); background: rgba(0,23,45,0.78); color: #fff; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; backdrop-filter: blur(8px); }
.live-chip b { display: inline-block; width: 6px; height: 6px; margin-right: 0.4rem; border-radius: 50%; background: #58d68d; box-shadow: 0 0 0 4px rgba(88,214,141,0.15); }
@keyframes marker-pulse { 0% { box-shadow: 0 0 0 0 rgba(230,172,3,0.6); } 70% { box-shadow: 0 0 0 13px rgba(230,172,3,0); } 100% { box-shadow: 0 0 0 0 rgba(230,172,3,0); } }
@keyframes route-draw { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.75; } }
.telemetry-card { position: absolute; right: 8%; bottom: 18%; display: grid; gap: 0.45rem; width: 145px; padding: 0.7rem; border: 1px solid rgba(255,255,255,0.16); background: rgba(0,23,45,0.8); color: #fff; font-size: 0.65rem; backdrop-filter: blur(8px); }
.telemetry-card b { color: var(--accent-gold); font-size: 1rem; }
.telemetry-bar { display: block; width: 100%; height: 3px; background: var(--accent-gold); opacity: 0.8; }
.fleet-status { position: absolute; left: 7%; bottom: 15%; display: grid; gap: 0.5rem; width: 132px; padding: 0.75rem; border: 1px solid rgba(255,255,255,0.14); background: rgba(0,23,45,0.78); color: rgba(255,255,255,0.76); font-size: 0.63rem; backdrop-filter: blur(8px); }
.status-title { color: rgba(255,255,255,0.45); font-size: 0.55rem; letter-spacing: 0.12em; }
.status-dot { display: inline-block; width: 6px; height: 6px; margin-right: 0.35rem; border-radius: 50%; }
.status-moving { background: #57d68d; } .status-idle { background: var(--accent-gold); } .status-alert { background: #ef7777; }
.fleet-status strong { float: right; color: #fff; }

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

  .hero-motion { opacity: 0.55; }
  .live-chip { right: 1rem; top: 6rem; font-size: 0.55rem; }
  .route-line-one { left: -20%; top: 31%; width: 85%; }
  .route-line-two { right: -18%; top: 62%; width: 82%; }
  .hero-vehicle-one { right: 35%; top: 42%; }
  .hero-vehicle-two { right: 8%; top: 50%; }
  .hero-vehicle-three { right: 22%; top: 68%; }
  .hero-vehicle-four { left: 8%; top: 73%; }
  .hero-vehicle-five { left: 18%; top: 25%; }
  .hero-vehicle-six { right: 4%; top: 35%; }
  .telemetry-card { right: 1rem; bottom: 11%; }
  .fleet-status { left: 1rem; bottom: 11%; transform: scale(0.9); transform-origin: bottom left; }
  .map-district { font-size: 0.46rem; }

  .hero-text-box .subtitle { font-size: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .route-line { animation: none; }
}
</style>
