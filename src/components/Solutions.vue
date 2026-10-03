<template>
  <section class="solutions" id="solutions">
    <div class="container text-center">
      <h2>Our Solutions</h2>
      <p class="subtitle" style="margin-bottom: 4rem;">Comprehensive technology solutions tailored for your business needs</p>
      
      <div class="solutions-grid">
        <div class="solution-card">
          <div class="icon">🚛</div>
          <h3>Fleet / Fuel Management</h3>
          <p>Fuel represents a significant cost for a fleet. A comprehensive solution is necessary to effectively track and manage fuel usage and the fleet's activities.</p>
          <router-link to="/services/fleet-management" class="learn-more">Learn More →</router-link>
        </div>
        
        <div class="solution-card">
          <div class="icon">📡</div>
          <h3>Telematics</h3>
          <p>Gain essential insights for effective fleet or asset management by obtaining precise, current information on the locations of vehicles, assets, and personnel.</p>
          <router-link to="/services/tracking-solutions" class="learn-more">Learn More →</router-link>
        </div>
        
        <div class="solution-card">
          <div class="icon">🏠</div>
          <h3>IoT and Smart Homes</h3>
          <p>Advanced smart home security systems, featuring real-time monitoring, remote access, and automated alerts, ensuring your home and family are safe and secure.</p>
          <router-link to="/services/iot-smart-homes" class="learn-more">Learn More →</router-link>
        </div>
        
        <div class="solution-card">
          <div class="icon">🌐</div>
          <h3>Web Services</h3>
          <p>We deliver custom web solutions, from stunning website designs to fully functional e-commerce stores with expert digital and social media management.</p>
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
