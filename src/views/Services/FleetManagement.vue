<script setup>
import CTA from '../../components/CTA.vue';
</script>

<template>
  <div class="service-page">
    <header class="service-hero">
      <div class="hero-content">
        <div class="badge">FLEET MANAGEMENT</div>
        <h1>Your Fleet's <span class="highlight-gradient">Efficiency and Safety</span></h1>
        <p class="subtitle">From real-time GPS tracking to AI-driven fuel analytics, OneGPS provides the end-to-end visibility you need to reduce operational costs, eliminate unscheduled downtime, and scale.</p>
        <router-link to="/book-a-demo" class="btn-primary btn-large" style="margin-top: 1rem; display: inline-block;">Get Started</router-link>
      </div>
      <div class="hero-visual">
         <img src="../../../images/truck-vehicle-with-trailers-background_600x316.webp" alt="Fleet Management" class="main-image">
      </div>
    </header>

    <section class="service-section">
      <div class="container layout-grid">
        <div class="text-content">
          <h2>Fleet Maintenance & Operational Control</h2>
          <p>Fleet maintenance management solution: planning, monitoring, and expense tracking. Lower operational costs, prevent major breakdowns, and minimize time spent in service stations.</p>
          <div class="stats-row" style="margin-top: 2rem;">
            <div class="stat-item">
              <span class="stat-number highlight">-25%</span>
              <span class="stat-label">Maintenance Costs</span>
            </div>
            <div class="stat-item">
              <span class="stat-number highlight">+30%</span>
              <span class="stat-label">Vehicle Lifespan</span>
            </div>
            <div class="stat-item">
              <span class="stat-number highlight">99%</span>
              <span class="stat-label">On-Time Schedule</span>
            </div>
          </div>
        </div>
        <div class="visual-content">
           <img src="../../../images/freepik__adjust__45541.webp" alt="Dashboard" style="width: 100%; border-radius: 12px;">
        </div>
      </div>
      <div class="container grid-4">
        <div class="benefit-card">
          <div class="icon">👥</div>
          <h3>Oversee Multi-Level Fleets</h3>
          <p>Define complex user hierarchies and granular access permissions. Allocate specific responsibilities to branch managers or dispatchers while maintaining a unified global view.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">⚠️</div>
          <h3>Critical Event Management</h3>
          <p>Respond instantly to overdue services, unauthorized vehicle use, or sudden financial spikes. Our dashboard prioritizes high-impact alerts.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">📊</div>
          <h3>Optimize Asset Utilization</h3>
          <p>Strategically organize workloads based on live vehicle health data. Identify inoperable units early and redistribute tasks.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">🔄</div>
          <h3>Data-Driven Asset Renewal</h3>
          <p>Use detailed breakdown analytics to evaluate vehicle ROI. Pinpoint high-mileage assets that have become financial liabilities.</p>
        </div>
      </div>
    </section>

    <section class="service-section alternate-bg">
      <div class="container text-center">
        <h2>Operation of the Fleet Management System</h2>
        <p class="subtitle">Four interconnected workflows designed to maintain vehicle readiness and operational transparency.</p>
        
        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">01</div>
            <h3>Compile a list of vehicles</h3>
            <p>Catalog vehicle profiles, VINs, license plates, engine classifications, driver assignments, and fuel tank dimensions.</p>
          </div>
          <div class="step">
            <div class="step-number">02</div>
            <h3>Define service frequency</h3>
            <p>Configure automated triggers based on cumulative mileage (e.g. 5,000 km oil change), engine operating hours, or calendar dates.</p>
          </div>
          <div class="step">
            <div class="step-number">03</div>
            <h3>Add services & tasks</h3>
            <p>Assign work orders to authorized garages, log replacement parts, invoice amounts, and mechanic completion checklists.</p>
          </div>
          <div class="step">
            <div class="step-number">04</div>
            <h3>Examine maintenance with reports</h3>
            <p>Review total cost of ownership (TCO) dashboards, cost-per-kilometer trends, and predictive failure analysis reports.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="service-section">
      <div class="container text-center">
        <h2>System Capabilities & Telemetry Support</h2>
        <p class="subtitle">Engineered to interface seamlessly with heavy trucks, construction equipment, and light commercial vehicles.</p>
        
        <div class="checklist">
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Availability of data regarding mileage, engine hours, services, and detailed information for each vehicle.</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Automated service generation based on time, mileage, and engine hours for designated vehicles.</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>System registration of works: categories, timeframes, replacement parts, costs, and inspection outcomes.</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Evaluation of services conducted across fleets, vehicle categories, and selected reporting periods.</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Integration with ERP, accounting, and parts inventory systems via secure REST webhooks.</p>
          </div>
        </div>

        <div class="tech-grid">
          <div class="benefit-card">
            <h3 class="highlight">Vehicle Bus Interface</h3>
            <p>J1939 (Heavy duty trucks), J1708, OBD-II (ISO 15765-4 CAN), K-Line.</p>
          </div>
          <div class="benefit-card">
            <h3 class="highlight">Sensor Input Options</h3>
            <p>RS232/RS485 digital probes, 0-10V Analog inputs, 1-Wire iButton & RFID reader.</p>
          </div>
          <div class="benefit-card">
            <h3 class="highlight">Connectivity & Failover</h3>
            <p>4G LTE Cat-1 / Cat-M1 with 2G fallback and offline flash memory for 100,000+ records.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section overridden for this page -->
    <section class="cta-section">
      <div class="cta-box glass-panel">
        <h2>Optimize Your Fleet Today</h2>
        <p>Start managing your fleet more efficiently with customized telematics.</p>
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
.layout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
}
.grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
.benefit-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 2rem;
  border-radius: 12px;
}
.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.text-center {
  text-align: center;
}
.workflow-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}
.step {
  text-align: center;
}
.step-number {
  width: 60px;
  height: 60px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 3rem auto;
  text-align: left;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 1rem 2rem;
  border-radius: 8px;
}
.check-icon {
  color: #10b981;
  font-weight: bold;
}
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  text-align: left;
}
.tech-grid h3 {
  font-size: 1.1rem;
}
</style>
