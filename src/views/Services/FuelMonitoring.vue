<script setup>
import CTA from '../../components/CTA.vue';
</script>

<template>
  <div class="service-page">
    <header class="service-hero">
      <div class="hero-content">
        <div class="badge">FUEL MANAGEMENT</div>
        <h1>Fuel <span class="highlight-gradient">Monitoring</span></h1>
        <p class="subtitle">Monitor fuel usage for each vehicle in your fleet. Utilize fleet fuel tracking to lower expenses, decrease CO2 emissions, and encourage fuel-efficient practices!</p>
        <router-link to="/book-a-demo" class="btn-primary btn-large" style="margin-top: 1rem; display: inline-block;">Get Started</router-link>
      </div>
      <div class="hero-visual">
         <img src="../../../images/real-time-fuel-monitoring.webp" alt="Fuel Monitoring" class="main-image">
      </div>
    </header>

    <section class="service-section alternate-bg">
      <div class="container text-center">
        <h2>Fuel Management Features</h2>
        <p class="subtitle">Gain absolute control over your fleet's fuel expenditure and consumption patterns.</p>
        
        <div class="grid-3">
          <div class="benefit-card">
            <div class="icon">🛡️</div>
            <h3>Safeguard Fuel Against Theft</h3>
            <p>Implement fuel monitoring systems to identify irregularities and safeguard your assets.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">👤</div>
            <h3>Improve Driving Culture</h3>
            <p>Combine fuel monitoring with driver behavior analysis to identify fuel-wasting habits.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">📈</div>
            <h3>Enhance Fuel Efficiency</h3>
            <p>Immediate insights into fuel consumption trends. Detect inefficiencies and optimize usage.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">🦅</div>
            <h3>Aerial Perspective</h3>
            <p>Track every ounce of filled or used fuel and understand how it impacts the budget.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">⚡</div>
            <h3>Real-time Control</h3>
            <p>Track fuel consumption and current tank levels with just a few clicks.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">🕒</div>
            <h3>Past Records</h3>
            <p>Consistently review fuel data and pinpoint areas for improvement.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">🎯</div>
            <h3>Accuracy Throughout Projects</h3>
            <p>Receive precise data for different vehicles, regardless of landscape or project conditions.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="service-section">
      <div class="container layout-grid reverse">
        <div class="text-content">
          <span class="badge">ANALYTICS</span>
          <h2>Automated Fuel Reports & Drain Detection</h2>
          <p>The fleet fuel monitoring system offers details on fuel refills and withdrawals, including exact date, time, location, starting and ending fuel levels, and volume.</p>
          <div class="checklist">
            <div class="check-item">
              <span class="check-icon">✓</span>
              <p>Instant alerts for sudden fuel drops (siphoning/theft)</p>
            </div>
            <div class="check-item">
              <span class="check-icon">✓</span>
              <p>Accurate tank level readings under all operational conditions</p>
            </div>
            <div class="check-item">
              <span class="check-icon">✓</span>
              <p>Exportable audit logs for finance and tax reporting</p>
            </div>
          </div>
        </div>
        <div class="visual-content">
           <img src="../../../images/fuel-fillings-and-drain-detection.webp" alt="Automated Fuel Reports" style="width: 100%; border-radius: 12px;">
        </div>
      </div>
    </section>

    <section class="service-section alternate-bg">
      <div class="container text-center">
        <h2>How Fuel Data Reaches You</h2>
        <p class="subtitle">Choose the right sensor setup for your vehicle models and operating environments.</p>
        
        <div class="grid-3">
          <div class="sensor-card">
            <img src="../../../images/fleet-fuel-management-fuel-level-sensor.webp" alt="Fuel Level Sensor">
            <h3>Fuel Level Sensor</h3>
            <p>Monitors the fuel level and its fluctuations in the tank. Interfaces with the GPS tracking device through a digital output.</p>
          </div>
          <div class="sensor-card">
            <img src="../../../images/fleet-fuel-management-fuel-consumption-sensor.webp" alt="Fuel Consumption Sensor">
            <h3>Fuel Consumption Sensor</h3>
            <p>Monitors the amount of fuel flowing through a vehicle's fuel line. Widely used in rail, air, and maritime transportation.</p>
          </div>
          <div class="sensor-card">
            <img src="../../../images/fleet-fuel-management-can-bus.webp" alt="CAN Bus Integration">
            <h3>CAN Bus Integration</h3>
            <p>Transmits live fuel level information from the vehicle's onboard computer to the satellite monitoring system. Simple to install and maintain.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <div class="cta-box glass-panel">
        <h2>Start Saving on Fuel Today</h2>
        <p>Our specialists will show you how fuel tracking can transform your fleet.</p>
        <div class="cta-buttons">
           <router-link to="/book-a-demo" class="btn-primary btn-large">Book a Demo</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.service-hero {
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: var(--text-muted);
}
.main-image {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
.service-section {
  padding: 6rem 2rem;
}
.alternate-bg {
  background: var(--bg-darker);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  justify-content: center;
}
.benefit-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 2rem;
  border-radius: 12px;
  text-align: left;
}
.sensor-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}
.sensor-card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}
.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.layout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.check-icon {
  color: #10b981;
  font-weight: bold;
}
</style>
