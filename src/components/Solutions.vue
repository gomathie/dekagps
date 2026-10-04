<template>
  <section class="solutions" id="solutions">
    <div class="container text-center">
      <h2 v-reveal>Our Solutions</h2>
      <p class="subtitle" style="margin-bottom: 4rem;" v-reveal>Comprehensive technology solutions tailored for your business needs</p>
      
      <div class="solutions-grid">
        <div class="solution-card" v-reveal>
          <div class="icon">🚛</div>
          <h3>Fleet & Fuel Management</h3>
          <p>Mitigate fuel theft and optimize consumption. Our advanced telematics integrate seamlessly with CAN bus and capacitive fuel level sensors to deliver real-time analytics and predictive maintenance.</p>
          <router-link to="/services/fleet-management" class="learn-more">Learn More →</router-link>
        </div>
        
        <div class="solution-card" v-reveal>
          <div class="icon">📡</div>
          <h3>Advanced Telematics</h3>
          <p>Achieve unprecedented visibility into your operations. Monitor live asset locations, route histories, and OBD-II engine diagnostics to ensure peak fleet performance and security.</p>
          <router-link to="/services/tracking-solutions" class="learn-more">Learn More →</router-link>
        </div>
        
        <div class="solution-card" v-reveal>
          <div class="icon">🏠</div>
          <h3>IoT & Smart Environments</h3>
          <p>Extend connectivity beyond vehicles. We deliver comprehensive IoT ecosystems for smart homes and industrial automation, featuring real-time alerting, sensor data, and remote access.</p>
          <router-link to="/services/iot-smart-homes" class="learn-more">Learn More →</router-link>
        </div>
        
        <div class="solution-card" v-reveal>
          <div class="icon">🌐</div>
          <h3>Custom Web & API Solutions</h3>
          <p>Leverage our robust REST webhooks and custom development services to integrate telematics data seamlessly into your ERP, CRM, or bespoke logistics portals.</p>
          <router-link to="/services/web-services" class="learn-more">Learn More →</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solutions {
  padding: 6rem 2rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
}
.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
.solution-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: left;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}
.solution-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}
.icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}
.solution-card h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}
.solution-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 2rem;
  flex-grow: 1;
}
.learn-more {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
}
.learn-more:hover {
  text-decoration: underline;
}
</style>
