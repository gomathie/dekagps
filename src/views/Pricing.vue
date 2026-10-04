<script setup>
import { ref } from 'vue';
import CTA from '../components/CTA.vue';

const isAnnual = ref(false);
</script>

<template>
  <div class="pricing-page">
    <header class="service-hero">
      <div class="hero-content">
        <div class="badge">PRICING PLANS</div>
        <h1>Simple, Transparent <span class="highlight-gradient">Pricing</span></h1>
        <p class="subtitle">Flexible plans engineered for individual vehicle owners, growing logistics fleets, and enterprise operations. No hidden fees.</p>
        
        <div class="billing-toggle">
          <span :class="{ active: !isAnnual }">Monthly Billing</span>
          <label class="switch">
            <input type="checkbox" v-model="isAnnual">
            <span class="slider round"></span>
          </label>
          <span :class="{ active: isAnnual }">Annual Billing <span class="discount-badge">Save 20%</span></span>
        </div>
      </div>
    </header>

    <section class="pricing-details">
      <div class="container">
        <div class="pricing-grid">
          <div class="pricing-card">
            <h3>Basic</h3>
            <p class="plan-desc">Standard Tracking</p>
            <div class="price">
              <span class="currency">$</span><span class="amount">{{ isAnnual ? '12' : '15' }}</span><span class="period">/ vehicle / mo</span>
            </div>
            <p class="small-text text-center" style="margin-bottom: 2rem;">Ideal for individual vehicles & small delivery vans</p>
            <ul>
              <li><span class="check">✓</span> Real-time GPS Live Tracking (10s refresh)</li>
              <li><span class="check">✓</span> Geofencing (up to 10 zones)</li>
              <li><span class="check">✓</span> 30-Day Trip History & Route Playback</li>
              <li><span class="check">✓</span> Speed & Idling Alarm Notifications</li>
              <li><span class="check">✓</span> Mobile App (iOS & Android) + Web Portal</li>
              <li><span class="check">✓</span> Daily Ignition & Mileage Reports</li>
              <li><span class="check">✓</span> Standard Email & Phone Support</li>
            </ul>
            <router-link to="/book-a-demo" class="btn-ghost" style="width: 100%; text-align: center; margin-top: auto;">Get Started</router-link>
          </div>
          
          <div class="pricing-card featured dark-card">
            <div class="badge absolute-badge">MOST POPULAR</div>
            <h3>Standard</h3>
            <p class="plan-desc highlight">Fleet & Fuel Control</p>
            <div class="price">
              <span class="currency">$</span><span class="amount">{{ isAnnual ? '20' : '25' }}</span><span class="period">/ vehicle / mo</span>
            </div>
            <p class="small-text text-center" style="margin-bottom: 2rem;">Recommended for commercial fleets & logistics trucks</p>
            <ul>
              <li><span class="check">✓</span> Everything in Basic Plan</li>
              <li><span class="check">✓</span> Digital Fuel Monitoring & Drain Alerts</li>
              <li><span class="check">✓</span> Driver Behavior Scoring (Harsh braking, speeding)</li>
              <li><span class="check">✓</span> Automated Maintenance & Service Reminders</li>
              <li><span class="check">✓</span> Unlimited Geofences & Landmark Points</li>
              <li><span class="check">✓</span> 90-Day Comprehensive Data History</li>
              <li><span class="check">✓</span> Restricted Area & Night-Driving Curfew Alerts</li>
              <li><span class="check">✓</span> REST API Access for ERP & Accounting Systems</li>
              <li><span class="check">✓</span> Priority Support (Phone & WhatsApp)</li>
            </ul>
            <router-link to="/book-a-demo" class="btn-primary" style="width: 100%; text-align: center; margin-top: auto;">Choose Standard</router-link>
          </div>
          
          <div class="pricing-card">
            <h3>Premium</h3>
            <p class="plan-desc">Enterprise & AI Video</p>
            <div class="price">
              <span class="currency">$</span><span class="amount">{{ isAnnual ? '36' : '45' }}</span><span class="period">/ vehicle / mo</span>
            </div>
            <p class="small-text text-center" style="margin-bottom: 2rem;">For heavy equipment, corporate fleets & enterprise transport</p>
            <ul>
              <li><span class="check">✓</span> Everything in Standard Plan</li>
              <li><span class="check">✓</span> AI Video Telematics & Dual Dashcam Streaming</li>
              <li><span class="check">✓</span> CAN Bus Telemetry (RPM, Engine Temp, Odometer)</li>
              <li><span class="check">✓</span> Driver RFID / iButton Identification</li>
              <li><span class="check">✓</span> Temperature Monitoring for Cold-Chain Cargo</li>
              <li><span class="check">✓</span> Full White-Label Portal & Custom Branding</li>
              <li><span class="check">✓</span> 365-Day Unlimited Cloud Storage</li>
              <li><span class="check">✓</span> Dedicated Account Manager & 99.9% SLA</li>
              <li><span class="check">✓</span> 24/7 Stolen Vehicle Recovery Priority Dispatch</li>
            </ul>
            <router-link to="/contact" class="btn-ghost" style="width: 100%; text-align: center; margin-top: auto;">Contact Enterprise</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="service-section alternate-bg">
      <div class="container text-center">
        <h2>Hardware & Add-On Services</h2>
        <p class="subtitle">All plans include standard GSM connectivity, cloud storage, and platform maintenance.</p>
        
        <div class="grid-3" style="margin-top: 3rem;">
          <div class="hardware-card">
            <h3>GPS Hardware Trackers</h3>
            <p class="price-text highlight">From GHC 450 <span class="small-text">one-time</span></p>
            <p class="small-text">High-precision Teltonika 4G tracking devices with internal backup battery and tamper alerts.</p>
          </div>
          <div class="hardware-card">
            <h3>Digital Fuel Sensors</h3>
            <p class="price-text highlight">From GHC 850 <span class="small-text">one-time</span></p>
            <p class="small-text">High-accuracy capacitive level sensors with ±1% calibration for fuel theft detection.</p>
          </div>
          <div class="hardware-card">
            <h3>AI Dual Dashcam</h3>
            <p class="price-text highlight">From GHC 1,200 <span class="small-text">one-time</span></p>
            <p class="small-text">Forward-facing & driver-facing HD video monitoring with ADAS driver distraction warnings.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="service-section">
      <div class="container text-center">
        <h2>Frequently Asked Pricing Questions</h2>
        
        <div class="faq-grid" style="margin-top: 3rem;">
          <div class="faq-item">
            <h3>Are there long-term contracts required?</h3>
            <p>No, our monthly plans can be cancelled at any time with 30 days notice. Annual plans provide a 20% discount and include free device installation.</p>
          </div>
          <div class="faq-item">
            <h3>Do you offer discounts for large fleets?</h3>
            <p>Yes! Fleets with more than 20 vehicles qualify for custom volume pricing and dedicated service level agreements (SLAs).</p>
          </div>
          <div class="faq-item">
            <h3>Is installation included?</h3>
            <p>Our certified technicians provide on-site installation anywhere in Ghana. Installation fees are waived on annual subscriptions.</p>
          </div>
          <div class="faq-item">
            <h3>What warranty is provided on devices?</h3>
            <p>All hardware comes with a 12-month replacement warranty and lifetime software maintenance.</p>
          </div>
        </div>

        <div style="margin-top: 4rem;">
          <p class="subtitle">Need a customized multi-country or white-label fleet solution?</p>
          <router-link to="/contact" class="btn-primary">Request a Custom Quote</router-link>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <div class="cta-box glass-panel">
        <h2>Not Sure Which Plan is Right for You?</h2>
        <p>Our fleet specialists will analyze your vehicle operations and recommend the most cost-effective setup.</p>
        <div class="cta-buttons">
           <router-link to="/contact" class="btn-primary btn-large">Talk to Sales</router-link>
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
.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}
.billing-toggle span {
  font-weight: 600;
  color: var(--text-muted);
  transition: var(--transition);
}
.billing-toggle span.active {
  color: var(--text-primary);
}
.discount-badge {
  background: #10b981;
  color: white !important;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 0.5rem;
  vertical-align: middle;
}
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--glass-bg);
  border: 1px solid var(--glass-border);
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
}
input:checked + .slider {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
input:checked + .slider:before {
  transform: translateX(24px);
}
.slider.round {
  border-radius: 24px;
}
.slider.round:before {
  border-radius: 50%;
}

.pricing-details {
  padding: 2rem 2rem 6rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.pricing-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 3rem 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.pricing-card.dark-card {
  background: rgba(0, 0, 0, 0.4);
  border-color: var(--primary-color);
}
.absolute-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: white;
  margin: 0;
}
.plan-desc {
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 0.5rem;
}
.price {
  font-size: 3rem;
  font-weight: 700;
  margin: 1.5rem 0;
  color: var(--text-primary);
  text-align: center;
}
.currency, .period {
  font-size: 1.2rem;
  color: var(--text-muted);
}
.period {
  font-size: 0.9rem;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex-grow: 1;
}
ul li {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  color: var(--text-muted);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}
.check {
  color: #10b981;
  font-weight: bold;
}
.text-center {
  text-align: center;
}
.small-text {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.service-section {
  padding: 6rem 2rem;
}
.alternate-bg {
  background: var(--bg-darker);
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.hardware-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 2rem;
  border-radius: 12px;
  text-align: left;
}
.price-text {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 1rem 0;
}
.faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  text-align: left;
}
.faq-item {
  background: var(--glass-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
}
.faq-item h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}
@media (max-width: 768px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
