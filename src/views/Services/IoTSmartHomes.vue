<script setup>
import CTA from '../../components/CTA.vue';
</script>

<template>
  <div class="service-page">
    <header class="service-hero">
      <div class="hero-content">
        <div class="badge">SMART LIVING</div>
        <h1>IoT & Smart Home <span class="highlight-gradient">Solutions</span></h1>
        <p class="subtitle">Install smart sensors, cameras, and controllers. Advanced smart home security systems featuring real-time monitoring, remote access, and automated alerts.</p>
        <router-link to="/book-a-demo" class="btn-primary btn-large" style="margin-top: 1rem; display: inline-block;">Request a Demo</router-link>
      </div>
      <div class="hero-visual">
         <img src="../../../images/Smart-Home-Interface.webp" alt="Smart Home" class="main-image">
      </div>
    </header>

    <section class="service-section alternate-bg">
      <div class="container layout-grid">
        <div class="text-content">
          <span class="badge">INTELLIGENT AUTOMATION</span>
          <h2>Complete Control of Your Living Space</h2>
          <p>From automated climate and ambient lighting to smart biometrics and intrusion detection, OneGPS transforms residential and commercial properties into connected, secure ecosystems.</p>
          <div class="stats-row" style="margin-top: 2rem;">
            <div class="stat-item highlight-box">
              <span class="stat-label bold">Smart Locks & Surveillance</span>
              <p class="small-text">24/7 HD camera streaming and encrypted access.</p>
            </div>
            <div class="stat-item highlight-box">
              <span class="stat-label bold">Energy Optimization</span>
              <p class="small-text">Automated power saving on AC and lighting.</p>
            </div>
          </div>
        </div>
        <div class="visual-content">
           <img src="../../../images/8-key-factors-for-an-effective-Internet-of-Things-IoT-network-1.webp" alt="IoT Network" style="width: 100%; border-radius: 12px;" @error="(e) => e.target.style.display='none'">
        </div>
      </div>
      
      <div class="container grid-4" style="margin-top: 4rem;">
        <div class="benefit-card">
          <h3>Smart Automation</h3>
          <p>Schedule lighting, climate, and appliances to suit your lifestyle.</p>
        </div>
        <div class="benefit-card">
          <h3>Remote Control</h3>
          <p>Manage devices from your phone—anytime, anywhere.</p>
        </div>
        <div class="benefit-card">
          <h3>Energy Efficiency</h3>
          <p>Track energy usage and reduce utility costs.</p>
        </div>
        <div class="benefit-card">
          <h3>Home Security</h3>
          <p>Live surveillance, smart locks, and real-time alerts to keep your home secure.</p>
        </div>
      </div>
    </section>

    <section class="service-section">
      <div class="container text-center">
        <h2>How It Works</h2>
        <p class="subtitle">Simple 4-step deployment from hardware installation to cloud synchronization.</p>
        
        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">01</div>
            <h3>Install Devices</h3>
            <p>Install smart sensors, cameras, and controllers.</p>
          </div>
          <div class="step">
            <div class="step-number">02</div>
            <h3>Connect Platform</h3>
            <p>Connect via secure cloud-powered IoT platform.</p>
          </div>
          <div class="step">
            <div class="step-number">03</div>
            <h3>Control & Monitor</h3>
            <p>Control and monitor from your phone or voice assistant.</p>
          </div>
          <div class="step">
            <div class="step-number">04</div>
            <h3>Automate</h3>
            <p>Automate based on your preferences and routines.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="service-section alternate-bg">
      <div class="container text-center">
        <h2>Why Choose OneGPS IoT & Smart Home Solutions?</h2>
        
        <div class="checklist dual-column">
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Simple setup and seamless integration</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Scalable for homes and smart buildings</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>End-to-end support and customization</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Secure, encrypted device communication</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Affordable, future-ready technology</p>
          </div>
        </div>
      </div>
    </section>

    <section class="service-section testimonial-section">
      <div class="container text-center">
        <div class="testimonial-content">
          <blockquote>"OneGPS made our home smart—easy to control and totally secure."</blockquote>
          <cite>— Amara K., Homeowner</cite>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <div class="cta-box glass-panel">
        <h2>Ready to Make Your Home Smarter?</h2>
        <p>Connect with our team to build a custom smart home system today.</p>
        <div class="cta-buttons">
           <router-link to="/contact" class="btn-primary btn-large">Contact Us</router-link>
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
  align-items: center;
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
  color: var(--accent-gold);
  font-weight: bold;
}
.testimonial-section {
  padding: 6rem 2rem;
}
.testimonial-content {
  max-width: 600px;
  margin: 0 auto;
}
.testimonial-content::before {
  content: '';
  display: block;
  width: 44px;
  height: 3px;
  border-radius: 2px;
  background: var(--accent-gold);
  margin: 0 auto 1.5rem;
}
blockquote {
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}
cite {
  color: var(--text-muted);
  font-weight: bold;
}
@media (max-width: 768px) {
  .dual-column {
    grid-template-columns: 1fr;
  }
}
</style>
