<script setup>
import CTA from '../components/CTA.vue';
</script>

<template>
  <div class="industries-page">
    <header class="service-hero">
      <div class="hero-content">
        <div class="badge">INDUSTRIES</div>
        <h1>Perfect Fit for <span class="highlight-gradient">Any Industry</span></h1>
        <p class="subtitle">Leverage advanced telematics, IoT sensors, and data analytics to streamline operations, ensure compliance, and maximize safety across diverse sectors.</p>
        <router-link to="/book-a-demo" class="btn-primary btn-large" style="margin-top: 1rem; display: inline-block;">Get Started</router-link>
      </div>
    </header>

    <section class="industries-details">
      <div class="container">
        <div class="benefits-grid">
          <div class="industry-card">
            <img src="../../images/Trucks-parked-lined-up-_-Premium-Photo.webp" alt="Transport & Logistics">
            <div class="card-content">
              <h3>Transport & Logistics</h3>
              <p>Optimize routing, ensure strict regulatory compliance, monitor driver behavior, and secure your cargo in transit.</p>
              <router-link to="/industries/perfect-fit" class="learn-more">Learn More →</router-link>
            </div>
          </div>
          <div class="industry-card">
            <img src="../../images/hitrcae.com-construction-500x332-1.webp" alt="Construction">
            <div class="card-content">
              <h3>Construction</h3>
              <p>Protect heavy machinery with geofencing, track engine hours for maintenance, and monitor site productivity remotely.</p>
              <router-link to="/industries/perfect-fit" class="learn-more">Learn More →</router-link>
            </div>
          </div>
          <div class="industry-card">
            <img src="../../images/courier-delivery-industry.jpg" alt="Courier & Delivery">
            <div class="card-content">
              <h3>Courier & Delivery</h3>
              <p>Achieve real-time dispatch visibility, optimize delivery routes, and provide accurate ETAs to end-customers.</p>
              <router-link to="/industries/perfect-fit" class="learn-more">Learn More →</router-link>
            </div>
          </div>
          <div class="industry-card">
            <img src="../../images/1gV-Wcn3-bAx5DBELHEPtdg-768x513.webp" alt="Service Providers" @error="(e) => e.target.style.display='none'">
            <div class="card-content">
              <h3>Service Providers</h3>
              <p>Digitize field operations with live location tracking, digital dispatching, and automated mileage reporting.</p>
              <router-link to="/industries/perfect-fit" class="learn-more">Learn More →</router-link>
            </div>
          </div>
          <div class="industry-card">
            <img src="../../images/tractor-agricultural-machine-cultivating-field-500x332-1.webp" alt="Agriculture">
            <div class="card-content">
              <h3>Agriculture</h3>
              <p>Deploy precision farming techniques using IoT environmental sensors and track exact tractor acreage.</p>
              <router-link to="/industries/perfect-fit" class="learn-more">Learn More →</router-link>
            </div>
          </div>
          <div class="industry-card">
            <img src="../../images/06f687e3-15d6-4a37-b4e4-1b75687a8e69-500x332-1.webp" alt="Waste Management" @error="(e) => e.target.style.display='none'">
            <div class="card-content">
              <h3>Waste Management</h3>
              <p>Optimize collection routes, monitor PTO (Power Take-Off) events, and reduce operational carbon footprint.</p>
              <router-link to="/industries/perfect-fit" class="learn-more">Learn More →</router-link>
            </div>
          </div>
          <div class="industry-card">
            <img src="../../images/PTS-Vehicle-Hire-Berkshire-_-Ambulance-Hire-in-Berkshire.webp" alt="Emergency Services">
            <div class="card-content">
              <h3>Emergency Services</h3>
              <p>Ensure rapid incident response, optimize dispatch paths, and maintain strict driver safety protocols.</p>
              <router-link to="/industries/perfect-fit" class="learn-more">Learn More →</router-link>
            </div>
          </div>
          <div class="industry-card">
            <img src="../../images/pharmaceutical-industry.jpg" alt="Pharmaceutical">
            <div class="card-content">
              <h3>Pharmaceutical</h3>
              <p>Enforce cold chain integrity with live temperature/humidity monitoring and automated deviation alerts.</p>
              <router-link to="/industries/perfect-fit" class="learn-more">Learn More →</router-link>
            </div>
          </div>
          <div class="industry-card">
            <img src="../../images/oil-gas-industry.jpg" alt="Oil & Gas">
            <div class="card-content">
              <h3>Oil & Gas</h3>
              <p>Secure hazardous cargo transports with live telemetry, valve monitoring, and strict driver vetting.</p>
              <router-link to="/industries/perfect-fit" class="learn-more">Learn More →</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <div class="cta-box glass-panel">
        <h2>Find Your Industry Solution</h2>
        <p>Contact us for a tailored fleet management plan.</p>
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
  text-align: center;
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
.industries-details {
  padding: 2rem 2rem 6rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}
.industry-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  overflow: hidden;
  text-align: left;
  display: flex;
  flex-direction: column;
}
.industry-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid var(--glass-border);
}
.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.card-content h3 {
  margin-bottom: 0.5rem;
}
.card-content p {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
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
