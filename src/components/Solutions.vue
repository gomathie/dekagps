<script setup>
import { ArrowUpRight, Fuel, Gauge, Home, PlugZap } from '@lucide/vue'
</script>

<template>
  <section class="solutions" id="solutions">
    <div class="container">
      <div class="solutions-heading" v-reveal>
        <div>
          <p class="section-kicker">ONE PLATFORM. MANY POSSIBILITIES.</p>
          <h2>Solutions that keep your operation moving.</h2>
        </div>
        <p class="subtitle">From fleet visibility to connected environments, OneGPS brings the data, tools, and integrations your team needs into one clear view.</p>
      </div>
      <div class="solutions-grid">
        <div class="solution-card" v-reveal><div class="solution-card-top"><span class="solution-icon"><Fuel :size="22" /></span><span class="solution-index">01</span></div><h3>Fleet &amp; Fuel Management</h3><p>Mitigate fuel theft and optimize consumption with real-time analytics, CAN bus data, and capacitive fuel level sensors.</p><router-link to="/services/fleet-management" class="learn-more">Explore fleet management <ArrowUpRight :size="17" /></router-link></div>
        <div class="solution-card" v-reveal><div class="solution-card-top"><span class="solution-icon"><Gauge :size="22" /></span><span class="solution-index">02</span></div><h3>Advanced Telematics</h3><p>Monitor live asset locations, route histories, and OBD-II engine diagnostics to improve fleet performance and security.</p><router-link to="/services/tracking-solutions" class="learn-more">Explore telematics <ArrowUpRight :size="17" /></router-link></div>
        <div class="solution-card" v-reveal><div class="solution-card-top"><span class="solution-icon"><Home :size="22" /></span><span class="solution-index">03</span></div><h3>IoT &amp; Smart Environments</h3><p>Extend connectivity beyond vehicles with real-time alerts, sensor data, remote access, and industrial automation.</p><router-link to="/services/iot-smart-homes" class="learn-more">Explore smart environments <ArrowUpRight :size="17" /></router-link></div>
        <div class="solution-card" v-reveal><div class="solution-card-top"><span class="solution-icon"><PlugZap :size="22" /></span><span class="solution-index">04</span></div><h3>Custom Web &amp; API Solutions</h3><p>Connect telematics data to your ERP, CRM, or bespoke logistics portal through robust REST webhooks and custom development.</p><router-link to="/services/web-services" class="learn-more">Explore integrations <ArrowUpRight :size="17" /></router-link></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solutions { padding: 7rem 2rem; background: #061b31; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
.container { max-width: 1200px; margin: 0 auto; }
.solutions-heading { display: flex; align-items: end; justify-content: space-between; gap: 4rem; margin-bottom: 3.5rem; }
.section-kicker { margin-bottom: 0.85rem; color: var(--accent-gold); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; }
.solutions-heading h2 { max-width: 620px; margin: 0; font-size: clamp(2rem, 4vw, 3.25rem); line-height: 1.08; }
.solutions-heading .subtitle { max-width: 390px; margin: 0 0 0.25rem; line-height: 1.7; }
.solutions-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.solution-card { min-height: 330px; background: rgba(0, 23, 45, 0.72); border: 1px solid var(--glass-border); padding: 2rem; border-radius: 8px; text-align: left; display: flex; flex-direction: column; transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease; }
.solution-card:hover { transform: translateY(-6px); border-color: rgba(230, 172, 3, 0.55); background: rgba(0, 30, 54, 0.9); }
.solution-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
.solution-icon { display: grid; place-items: center; width: 46px; height: 46px; border: 1px solid rgba(230, 172, 3, 0.35); border-radius: 50%; color: var(--accent-gold); background: rgba(230, 172, 3, 0.08); }
.solution-index { color: rgba(255,255,255,0.42); font-family: var(--font-serif); font-size: 1.1rem; }
.solution-card h3 { margin-bottom: 1rem; font-size: 1.15rem; line-height: 1.25; }
.solution-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.65; margin-bottom: 2rem; flex-grow: 1; }
.learn-more { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--accent-gold); font-weight: 600; text-decoration: none; font-size: 0.85rem; transition: gap 0.2s ease, color 0.2s ease; }
.learn-more:hover { color: var(--primary-hover); gap: 0.65rem; }
@media (max-width: 1000px) { .solutions-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .solutions { padding: 5rem 1.25rem; } .solutions-heading { display: block; margin-bottom: 2.5rem; } .solutions-heading .subtitle { margin-top: 1rem; } .solution-card { min-height: 0; } }
</style>
