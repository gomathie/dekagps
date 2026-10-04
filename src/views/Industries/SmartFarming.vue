<script setup>
import CTA from '../../components/CTA.vue';
</script>

<template>
  <div class="service-page">
    <header class="service-hero">
      <div class="hero-content">
        <div class="badge">AGRICULTURE</div>
        <h1>Smart Farming <span class="highlight-gradient">Solutions</span></h1>
        <p class="subtitle">A straightforward yet powerful solution for the agribusiness sector, enabling the management of field activities through telematics data.</p>
        <router-link to="/book-a-demo" class="btn-primary btn-large" style="margin-top: 1rem; display: inline-block;">Request a Demo</router-link>
      </div>
      <div class="hero-visual">
         <img src="../../../images/tractor-agricultural-machine-cultivating-field-500x332-1.webp" alt="Smart Farming" class="main-image">
      </div>
    </header>

    <section class="service-section alternate-bg">
      <div class="container layout-grid">
        <div class="text-content">
          <span class="badge">AGRITECH</span>
          <h2>Field Activities & Telematics Management</h2>
          <p>Monitor plowing, harvesting, and cultivation cycles in real-time. Calculate exact acreage covered, track fuel rates across tractors, and prevent machinery misuse.</p>
          <div class="checklist" style="margin-top: 2rem;">
            <div class="check-item">
              <span class="check-icon">✓</span>
              <p>Comprehensive field mapping & boundary geofences</p>
            </div>
            <div class="check-item">
              <span class="check-icon">✓</span>
              <p>Engine hour tracking for preventive maintenance</p>
            </div>
            <div class="check-item">
              <span class="check-icon">✓</span>
              <p>Real-time fuel siphoning & wastage detection</p>
            </div>
          </div>
        </div>
        <div class="visual-content">
           <img src="../../../images/field-cultivations.webp" alt="Field Cultivations" style="width: 100%; border-radius: 12px;">
        </div>
      </div>
      
      <div class="container grid-3" style="margin-top: 4rem;">
        <div class="benefit-card">
          <div class="icon">📍</div>
          <h3>Field Activity Tracking</h3>
          <p>Monitor every single field operation in real-time. Precisely track plowing, planting, spraying, and harvesting routes to ensure total coverage without costly overlaps.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">🚜</div>
          <h3>Equipment Management</h3>
          <p>Protect your high-value agricultural machinery. Schedule proactive maintenance based on actual engine hours rather than calendar days to eliminate unexpected breakdowns during peak seasons.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">🌡️</div>
          <h3>Environmental Monitoring</h3>
          <p>Integrate advanced sensors to track ambient temperature, soil moisture, and humidity. Use this granular environmental data to optimize watering and fertilization schedules.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">⛽</div>
          <h3>Fuel Optimization</h3>
          <p>Stop agricultural fuel theft and reduce waste. High-precision tank sensors monitor fuel levels 24/7, instantly alerting you to sudden drops or highly inefficient operating rates.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">📊</div>
          <h3>Performance Analytics</h3>
          <p>Transform raw farm data into actionable insights. Generate detailed reports comparing yields, machine utilization rates, and operator efficiency across different plots of land.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">⏱️</div>
          <h3>Work Hour Tracking</h3>
          <p>Automate your agricultural workforce management. Accurately track operator hours, verify timesheets, and optimize labor allocation based on real-time field activity.</p>
        </div>
      </div>
    </section>

    <section class="service-section">
      <div class="container layout-grid reverse">
        <div class="visual-content">
           <img src="../../../images/fields-and-crops.webp" alt="Agro Analytics" style="width: 100%; border-radius: 12px;">
        </div>
        <div class="text-content">
          <h2>Actionable Agro Analytics</h2>
          <p>Generate detailed operational reports by season, machinery type, or field plots. Compare operator performance and maximize harvest yields.</p>
          <router-link to="/book-a-demo" class="btn-primary" style="margin-top: 1.5rem; display: inline-block;">Get Agri Solutions</router-link>
        </div>
      </div>
    </section>

    <section class="service-section alternate-bg">
      <div class="container text-center">
        <h2>Key Benefits for Agribusiness</h2>
        
        <div class="checklist dual-column">
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Dramatically increase overall crop yields and field productivity through precision agriculture</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Slash expensive equipment downtime and prevent catastrophic breakdowns with predictive maintenance</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Drastically reduce farming overhead by optimizing fuel consumption, water, and fertilizer usage</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Digitize your operations to automatically track, verify, and document all seasonal field activities</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Make confident, data-driven agricultural decisions that maximize profitability year after year</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <div class="cta-box glass-panel">
        <h2>Modernize Your Farm Operations</h2>
        <p>Get precise data-driven insights for your agricultural fleet.</p>
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
.layout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.reverse {
  direction: ltr;
}
.reverse > .visual-content {
  order: 1;
}
.reverse > .text-content {
  order: 2;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.benefit-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 2rem;
  border-radius: 12px;
  text-align: left;
}
.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.dual-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
}
.check-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
  background: var(--glass-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
}
.check-item p {
  margin: 0;
}
.check-icon {
  color: #10b981;
  font-weight: bold;
  margin-top: 2px;
}
@media (max-width: 768px) {
  .dual-column {
    grid-template-columns: 1fr;
  }
  .layout-grid {
    grid-template-columns: 1fr;
  }
  .reverse > .visual-content {
    order: 2;
  }
  .reverse > .text-content {
    order: 1;
  }
}
</style>
