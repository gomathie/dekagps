<script setup>
import CTA from '../../components/CTA.vue';
</script>

<template>
  <div class="service-page">
    <header class="service-hero">
      <div class="hero-content">
        <div class="badge">WEB SERVICES</div>
        <h1>Build, Launch, and Scale <span class="highlight-gradient">with Confidence</span></h1>
        <p class="subtitle">Custom web development, fast deployment, and secure, scalable solutions tailored to your business goals.</p>
        <a href="#" class="btn-primary btn-large" style="margin-top: 1rem; display: inline-block;">Get Started</a>
      </div>
      <div class="hero-visual">
         <img src="../../../images/be-change-inspired-active-thunder-website.webp" alt="Web Services" class="main-image">
      </div>
    </header>

    <section class="service-section alternate-bg">
      <div class="container layout-grid">
        <div class="text-content">
          <span class="badge">MODERN ENGINEERING</span>
          <h2>Digital Experiences That Drive Measurable Growth</h2>
          <p>From enterprise portals to e-commerce storefronts and custom cloud applications, our engineering team crafts fast, intuitive, and responsive web platforms.</p>
          <div class="stats-row" style="margin-top: 2rem;">
            <div class="stat-item">
              <span class="stat-number highlight">100%</span>
              <span class="stat-label">Mobile Responsive</span>
            </div>
            <div class="stat-item">
              <span class="stat-number highlight">Speed</span>
              <span class="stat-label">Optimized Core Web Vitals</span>
            </div>
            <div class="stat-item">
              <span class="stat-number highlight">SEO</span>
              <span class="stat-label">Engineered for Ranking</span>
            </div>
          </div>
        </div>
        <div class="visual-content">
           <img src="../../../images/Web-Hosting-explained-for-beginners-_E2_80_93-Top-5-Web-Hosting-Providers.jpeg" alt="Web Development" style="width: 100%; border-radius: 12px;" @error="(e) => e.target.style.display='none'">
        </div>
      </div>
      
      <div class="container grid-3" style="margin-top: 4rem;">
        <div class="benefit-card">
          <div class="icon">🌐</div>
          <h3>Custom Website Development</h3>
          <p>Responsive, SEO-ready websites built to engage and convert.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">💻</div>
          <h3>Web Application Development</h3>
          <p>Powerful, cloud-based apps designed for scale and performance.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">🛒</div>
          <h3>E-commerce Solutions</h3>
          <p>Fully integrated online stores with secure payments and real-time inventory.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">🔌</div>
          <h3>API Development & Integration</h3>
          <p>Connect your systems with scalable, secure REST and GraphQL APIs.</p>
        </div>
        <div class="benefit-card">
          <div class="icon">🛠️</div>
          <h3>Maintenance & Support</h3>
          <p>Ongoing updates, security patches, and performance monitoring.</p>
        </div>
      </div>
    </section>

    <section class="service-section">
      <div class="container text-center">
        <h2>Industries We Serve</h2>
        
        <div class="tags-container">
          <span class="tag">E-commerce & Retail</span>
          <span class="tag">Logistics & Transportation</span>
          <span class="tag">Healthcare</span>
          <span class="tag">Startups & Tech Firms</span>
          <span class="tag">Real Estate</span>
          <span class="tag">Education</span>
        </div>
      </div>
    </section>

    <section class="service-section alternate-bg">
      <div class="container text-center">
        <h2>Our Process</h2>
        <p class="subtitle">From idea to launch, our 6-step lifecycle ensures perfection.</p>
        
        <div class="workflow-steps grid-6">
          <div class="step">
            <div class="step-number">01</div>
            <h3>Discovery</h3>
            <p>Understanding your goals and audience.</p>
          </div>
          <div class="step">
            <div class="step-number">02</div>
            <h3>Design</h3>
            <p>Wireframes and prototypes for clear vision.</p>
          </div>
          <div class="step">
            <div class="step-number">03</div>
            <h3>Development</h3>
            <p>Clean, modern code using best practices.</p>
          </div>
          <div class="step">
            <div class="step-number">04</div>
            <h3>Testing</h3>
            <p>Speed, security, and cross-device compatibility.</p>
          </div>
          <div class="step">
            <div class="step-number">05</div>
            <h3>Launch</h3>
            <p>Go live with confidence and precision.</p>
          </div>
          <div class="step">
            <div class="step-number">06</div>
            <h3>Support</h3>
            <p>We're here to help post-launch.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="service-section">
      <div class="container text-center">
        <h2>Why Choose OneGPS Web Services</h2>
        
        <div class="checklist dual-column">
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Experienced full-stack developers and designers</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Agile, client-focused approach</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Scalable solutions for growth</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>High-speed hosting and top-tier security</p>
          </div>
          <div class="check-item">
            <span class="check-icon">✓</span>
            <p>Transparent communication and timelines</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <div class="cta-box glass-panel">
        <h2>Let's Build Something Great Together</h2>
        <p>From concept to code, we deliver web solutions that drive real business results.</p>
        <div class="cta-buttons">
           <a href="#" class="btn-primary btn-large">Book a Demo</a>
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
.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}
.tag {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  color: var(--text-primary);
}
.workflow-steps {
  display: grid;
  gap: 2rem;
  margin-top: 4rem;
}
.grid-6 {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
.step h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.step p {
  font-size: 0.9rem;
  color: var(--text-muted);
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;
  max-width: 900px;
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
  color: #10b981;
  font-weight: bold;
}
@media (max-width: 768px) {
  .dual-column {
    grid-template-columns: 1fr;
  }
}
</style>
