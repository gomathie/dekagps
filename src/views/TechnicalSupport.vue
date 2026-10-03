<script setup>
import CTA from '../components/CTA.vue';

const topics = [
  { icon: '🔐', title: 'Account Setup', desc: 'Get your organisation, users and roles configured correctly from day one.' },
  { icon: '🔌', title: 'Device Installation Guides', desc: 'Wiring diagrams and step-by-step installation support for every tracker we supply.' },
  { icon: '📱', title: 'Dashboard and App Navigation', desc: 'Find reports, build geofences and set notifications without guesswork.' },
  { icon: '🛰️', title: 'GPS Accuracy & Signal Issues', desc: 'Diagnose antenna placement, SIM connectivity and jamming interference.' },
  { icon: '⬆️', title: 'Firmware Update', desc: 'Guidance on safe over-the-air and wired firmware upgrades.' },
  { icon: '💳', title: 'Billing and Subscription', desc: 'Invoices, plan changes, SIM renewals and account renewals handled fast.' }
];

const commitments = [
  'Fast, friendly responses from trained experts',
  'Multilingual support options',
  '98% satisfaction score',
  'Proactive updates and status tracking'
];

const channels = [
  { title: 'Live Chat', lines: ['Available in-app and on website', 'Mon–Sat, 8am – 6pm'] },
  { title: 'Email Support', lines: ['support@onegps.africa', 'Response within one business day'] },
  { title: 'Phone Support', lines: ['+233-20-794-9676', 'Mon–Sat, 8AM – 6PM'] }
];
</script>

<template>
  <div class="page-wrap">
    <section class="page-hero">
      <div class="container">
        <div class="page-hero__inner">
          <nav class="breadcrumbs">
            <router-link to="/">Home</router-link>
            <span>/</span>
            <span>Resources</span>
            <span>/</span>
            <span>Technical Support</span>
          </nav>
          <span class="eyebrow">Support</span>
          <h1>We're Here to Help — Anytime, Anywhere</h1>
          <p class="subtitle">
            Get expert support for your OneGPS services. Whether you need setup help or
            troubleshooting, our team is just a click away.
          </p>
          <div class="hero-buttons">
            <a href="https://wa.me/233207949676" target="_blank" rel="noopener" class="btn-primary btn-large">
              Start Live Chat
            </a>
            <a href="mailto:support@onegps.africa" class="btn-secondary btn-large">Email Support</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <h2>Common Support Topics</h2>
          <p>The quickest answers to the questions our support desk handles every day.</p>
        </div>
        <div class="grid-3">
          <article v-for="topic in topics" :key="topic.title" class="card">
            <span class="card__icon">{{ topic.icon }}</span>
            <h3>{{ topic.title }}</h3>
            <p>{{ topic.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container split">
        <div>
          <span class="eyebrow">Personalised help</span>
          <h2 class="section-title">Need Personalised Help?</h2>
          <p class="lead">
            Our team is ready to assist via live chat or by responding to your support request.
          </p>
          <ul class="check-list" style="margin-top: 1.75rem;">
            <li>Real-time chat available Mon–Sat, 8am – 6pm</li>
            <li>Submit a ticket anytime for priority email response</li>
          </ul>
          <div class="hero-buttons" style="margin-top: 2rem;">
            <a href="https://wa.me/233207949676" target="_blank" rel="noopener" class="btn-primary btn-large">Live Chat</a>
            <router-link to="/faq" class="btn-outline btn-large">Browse the FAQ</router-link>
          </div>
        </div>
        <div class="split__media">
          <img
            src="../../images/Download-Business-expert-team-icon-Business-executive-team-leadership-Creative-business-team-support-team-for-free-300x300.jpeg"
            alt="OneGPS support team"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container split">
        <div class="split__media">
          <img src="../../images/african-american-dispatch-operator-gives-directions-gps-coordinates.webp" alt="Support operator" loading="lazy" />
        </div>
        <div>
          <span class="eyebrow">Service level</span>
          <h2 class="section-title">Our Commitment to You</h2>
          <ul class="check-list" style="margin-top: 1.75rem;">
            <li v-for="item in commitments" :key="item">{{ item }}</li>
          </ul>
          <div class="metric-strip" style="margin-top: 2rem;">
            <div class="metric"><strong>98%</strong><span>Satisfaction</span></div>
            <div class="metric"><strong>&lt; 24h</strong><span>Email response</span></div>
            <div class="metric"><strong>6</strong><span>Days a week</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container">
        <div class="section-header">
          <h2>Contact Options</h2>
          <p>Pick the channel that suits you — a real person will answer.</p>
        </div>
        <div class="grid-3">
          <article v-for="channel in channels" :key="channel.title" class="card">
            <h3>{{ channel.title }}</h3>
            <p v-for="line in channel.lines" :key="line">{{ line }}</p>
          </article>
        </div>
      </div>
    </section>

    <CTA />
  </div>
</template>
