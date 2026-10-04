<script setup>
import Hero from '../components/Hero.vue';
import Solutions from '../components/Solutions.vue';
import CTA from '../components/CTA.vue';

// We can create a new component for 'Trusted By', 'Why Partner With Us', and 'About Us', or build them inline.
// For now, let's build them inline in the Home view to match the new structure, reusing what we can.
</script>

<template>
  <div class="home-page">
    <Hero />
    
    <!-- Trusted By Section -->
    <section class="trusted-by" v-reveal>
      <div class="container">
        <p class="trusted-label">TRUSTED BY INDUSTRY LEADERS & HARDWARE PROVIDERS</p>
        <div class="logo-carousel">
          <img src="../../images/telto-e1724330667289-1-300x69.png" alt="Teltonika">
          <img src="../../images/pilot-logo-new-1-e1773316299924.png" alt="Pilot">
          <img src="../../images/xbr1-1-e1773316267570.png" alt="XBR">
          <img src="../../images/industrial-logo_logo2-1-e1773316282668.webp" alt="Industrial" @error="(e) => e.target.src='../../images/industrial-logo_logo2.webp'">
        </div>
      </div>
    </section>

    <!-- Our Solutions -->
    <Solutions />

    <!-- Why Partner With Us -->
    <section class="why-partner" id="features">
      <div class="section-header text-center" style="margin-bottom: 4rem;" v-reveal>
        <h2>Why Partner With OneGPS</h2>
        <p class="subtitle">Everything you need to scale your fleet operations</p>
      </div>
      <div class="features-grid">
        <div class="feature-card" v-reveal>

          <h3>Perfect fit for any industry</h3>
          <p>The OneGPS fleet management software fits diverse projects, from real-time fleet tracking to full digitalization and business intelligence, delivering valuable insights for strategic growth.</p>
        </div>
        <div class="feature-card" v-reveal>

          <h3>Seamless API Integrations</h3>
          <p>Seamlessly transmit processed data to visualization tools and external systems through APIs. Build a tailored solution and integrate with ERP, BI, accounting, and more.</p>
        </div>
        <div class="feature-card" v-reveal>

          <h3>Hardware-Agnostic Solution</h3>
          <p>OneGPS integrates with most GPS device models — from small scooter trackers to complex devices with multiple inputs, CAN bus, and OBD support.</p>
        </div>
        <div class="feature-card" v-reveal>

          <h3>Technical Consulting</h3>
          <p>Partners benefit from technical support in five languages, project implementation assistance, expert-led training sessions, and certification opportunities.</p>
        </div>
        <div class="feature-card" v-reveal>

          <h3>White-Labeling</h3>
          <p>Partners can use the fleet management platform under the OneGPS brand or opt for a customized, white-labeled solution with its own brand identity.</p>
        </div>
        <div class="feature-card" v-reveal>

          <h3>OneGPS Community</h3>
          <p>The largest network of telematics and IoT experts. A platform for knowledge exchange, technology sharing, and collaborative problem-solving.</p>
        </div>
      </div>
    </section>
    
    <!-- Intermediate CTA -->
    <section class="intermediate-cta" v-reveal>
      <div class="cta-inner">
        <h2>Interested in a tracker installation?</h2>
        <p>Talk to us today</p>
        <router-link to="/book-a-demo" class="btn-primary btn-large" style="margin-top: 1rem;">Book a Demo</router-link>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="about-us" v-reveal>
      <div class="about-container">
        <div class="about-visual">
           <img src="../../images/portrait-african-american-man-factory.webp" alt="Worker">
        </div>
        <div class="about-content">
          <span class="badge">ABOUT US</span>
          <h2>Our Mission & Vision</h2>
          <p>To revolutionize the way businesses manage their fleets, providing real-time insights and actionable data that drive smarter decisions, reduce costs, and improve safety.</p>
          <router-link to="/services" class="btn-outline" style="margin-top: 1rem; display: inline-block;">Learn More About Us</router-link>
        </div>
        
        <div class="about-benefits">
          <div class="benefit-item">

            <div>
              <h4 style="margin: 0 0 0.25rem 0;">Experience</h4>
              <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">We have more than 15 years of experience in providing Vehicle Tracking & Fleet Management solutions.</p>
            </div>
          </div>
          <div class="benefit-item">

            <div>
              <h4 style="margin: 0 0 0.25rem 0;">Affordability</h4>
              <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">We offer dependable and high-quality GPS hardware and software that remains budget-friendly for everyone.</p>
            </div>
          </div>
          <div class="benefit-item">

            <div>
              <h4 style="margin: 0 0 0.25rem 0;">Advanced Technologies</h4>
              <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">State-of-the-art telemetry integration, scalable architecture, and dedicated 24/7 multilingual technical support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <CTA />
  </div>
</template>

<style scoped>
.trusted-by {
  padding: 4rem 2rem;
  background: var(--bg-darker);
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.trusted-label {
  font-size: 0.85rem;
  letter-spacing: 2px;
  color: var(--text-muted);
  margin-bottom: 2rem;
  text-transform: uppercase;
}
.logo-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}
.logo-carousel img {
  height: 40px;
  filter: grayscale(100%) opacity(0.6);
  transition: var(--transition);
}
.logo-carousel img:hover {
  filter: grayscale(0%) opacity(1);
}

.why-partner {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.feature-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 2rem;
  border-radius: 12px;
}
.feature-card h3 {
  margin-bottom: 1rem;
}
.feature-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
}









.intermediate-cta {

  /* Kept the previous gradient overlay but aligned it to the brand palette. */
  background: linear-gradient(180deg, rgba(0, 16, 34, 0.86), rgba(0, 23, 45, 0.94)), url('../../images/truck-vehicle-with-trailers-background_600x316.webp') center/cover;
  border: 1px solid var(--border-gold);
  padding: 6rem 2rem;
  text-align: center;
  color: white;
  border-radius: 16px;
  max-width: 1200px;
  margin: 4rem auto;
}
.intermediate-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.about-us {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.about-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
}
.about-visual img {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
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
.about-benefits {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.benefit-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-left: 3px solid var(--accent-gold);
  padding: 1.5rem;
  border-radius: 12px;
}






@media (max-width: 768px) {
  .about-container {
    grid-template-columns: 1fr;
  }
}
</style>
