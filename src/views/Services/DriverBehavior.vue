<script setup>
import CTA from '../../components/CTA.vue';
</script>

<template>
  <div class="service-page">
    <header class="service-hero">
      <div class="hero-content">
        <div class="badge">SAFETY</div>
        <h1>Driver Behavior <span class="highlight-gradient">Monitoring</span></h1>
        <p class="subtitle">Assess driver performance by evaluating skills through penalty points for violations such as speeding, excessive acceleration, and harsh braking.</p>
        <router-link to="/book-a-demo" class="btn-primary btn-large" style="margin-top: 1rem; display: inline-block;">Request a Demo</router-link>
      </div>
      <div class="hero-visual">
         <img src="../../../images/freepik__adjust__45541.webp" alt="Driver Behavior" class="main-image">
      </div>
    </header>

    <section class="service-section alternate-bg">
      <div class="container layout-grid">
        <div class="text-content">
          <h2>Safety, Scoring & Risk Reduction</h2>
          <p>Combine telematics metrics with intelligent scoring algorithms to benchmark driver performance. Reward safe driving and identify risk patterns before accidents occur.</p>
          <div class="stats-row" style="margin-top: 2rem;">
            <div class="stat-item highlight-box">
              <span class="stat-label bold">Reduced Fuel Waste</span>
              <p class="small-text">Curb aggressive acceleration and high-rev idling.</p>
            </div>
            <div class="stat-item highlight-box">
              <span class="stat-label bold">Lower Insurance Risk</span>
              <p class="small-text">Proven safety records lead to lower fleet premiums.</p>
            </div>
          </div>
        </div>
        <div class="visual-content">
           <img src="../../../images/report.webp" alt="Driver Scoring" style="width: 100%; border-radius: 12px;">
        </div>
      </div>
      
      <div class="container grid-3" style="margin-top: 4rem;">
        <div class="benefit-card">
        <div class="benefit-card">
          <h3>Speed Monitoring</h3>
          <p>Ensure absolute compliance with road speed limits. Our system triggers instant alerts for excessive speeding, allowing managers to intervene before costly fines or severe accidents occur.</p>
        </div>
        <div class="benefit-card">
        <div class="benefit-card">
          <h3>Harsh Braking Detection</h3>
          <p>Pinpoint dangerous, aggressive braking patterns. Use hard data to proactively coach drivers, improve overall road safety, and significantly reduce wear and tear on brake pads and rotors.</p>
        </div>
        <div class="benefit-card">
        <div class="benefit-card">
          <h3>Rapid Acceleration Tracking</h3>
          <p>Monitor jackrabbit starts and erratic acceleration. Eliminating this aggressive driving style is proven to substantially cut fuel waste and minimize stress on the vehicle drivetrain.</p>
        </div>
        <div class="benefit-card">
        <div class="benefit-card">
          <h3>Idle Time Monitoring</h3>
          <p>Combat unnecessary fuel burn and emissions. Identify drivers who leave engines running during extended stops and enforce corporate anti-idling policies to drastically reduce overhead.</p>
        </div>
        <div class="benefit-card">
        <div class="benefit-card">
          <h3>Safety Scoring</h3>
          <p>Automatically compile comprehensive telemetry data into a straightforward 0-100 safety score for each driver, giving you a clear, objective benchmark of fleet risk levels.</p>
        </div>
        <div class="benefit-card">
        <div class="benefit-card">
          <h3>Driver Ranking</h3>
          <p>Foster a healthy culture of competition. Rank drivers on a dynamic leaderboard and introduce gamification to incentivize and reward your safest, most efficient operators.</p>
        </div>
      </div>
    </section>

    <section class="service-section">
      <div class="container text-center">
        <h2>Key Benefits</h2>
        
        <div class="checklist dual-column">
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Dramatically reduce accident rates, liability claims, and insurance premiums</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Improve fleet-wide fuel efficiency by coaching out aggressive driving habits</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Enhance public brand reputation by ensuring your branded vehicles are driven safely</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Extend the lifespan of your vehicles by minimizing harsh mechanical wear and tear</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Create a transparent, accountable, and highly responsible corporate driving culture</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <div class="cta-box glass-panel">
        <h2>Improve Driver Safety Today</h2>
        <p>Get real-time insights into driver performance and reduce fleet risk.</p>
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
/* Emoji clip-art icons were removed in favour of a gold accent rule so the
   legacy service pages match the design system of the rest of the site. */
.benefit-card h3::before {
  content: '';
  display: block;
  width: 34px;
  height: 3px;
  border-radius: 2px;
  background: var(--accent-gold);
  margin-bottom: 1rem;
}
.highlight-box {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  margin-bottom: 1rem;
}
.bold {
  font-weight: bold;
  color: var(--text-primary);
  display: block;
  margin-bottom: 0.5rem;
}
.small-text {
  font-size: 0.9rem;
  color: var(--text-muted);
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.dual-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
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
.check-icon {
  color: var(--accent-gold);
  font-weight: bold;
  margin-top: 2px;
}
@media (max-width: 768px) {
  .dual-column {
    grid-template-columns: 1fr;
  }
}
</style>
