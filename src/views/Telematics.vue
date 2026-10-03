<script setup>



import CTA from '../components/CTA.vue';

const features = [
  { title: 'Live GPS Tracking', desc: "Monitor every vehicle's real-time location." },
  { title: 'Vehicle Diagnostics', desc: 'Get instant alerts for engine faults, maintenance needs, and fuel levels.' },
  { title: 'Driver Behavior Monitoring', desc: 'Track speed, harsh braking, acceleration, and idling.' },
  { title: 'Fuel Monitoring', desc: "Monitor every vehicle's fuel consumption rate." },
  { title: 'Trip History & Playback', desc: 'Review route histories with speed and stop reports.' },
  { title: 'Custom Reports', desc: 'Generate automated insights for performance, safety, and compliance.' },
  { title: 'AI Video Monitoring', desc: 'Utilize cutting-edge AI-driven video technology to safeguard your most valuable assets.' },
  { title: 'Geofencing', desc: 'Create custom zones and receive instant exit/entry notifications.' }
];

const industries = [
  'Logistics & Transport',
  'Public Transportation',
  'Construction & Equipment Fleets',
  'Corporate Vehicle Management',
  'Emergency Services'
];

const benefits = [
  'Lower fuel and maintenance costs',
  'Improve driver safety and compliance',
  'Reduce downtime with proactive maintenance',
  'Boost productivity with smarter routing',
  'Enhance customer satisfaction through ETA accuracy'
];

const gallery = [
  { src: new URL('../../images/truck-vehicle-with-trailers-background_600x316.webp', import.meta.url).href, alt: 'Fleet trucks' },
  { src: new URL('../../images/bacf3db8-d48b-4a3c-b636-094978eeb601.jpeg', import.meta.url).href, alt: 'Connected vehicle' },
  { src: new URL('../../images/hitrcae.com-construction-500x332-1.webp', import.meta.url).href, alt: 'Construction equipment' },
  { src: new URL('../../images/c7ae9ae9-f68f-421f-b86c-c06e4a318f81.jpeg', import.meta.url).href, alt: 'Fleet on the road' },
  { src: new URL('../../images/06f687e3-15d6-4a37-b4e4-1b75687a8e69-500x332-1.webp', import.meta.url).href, alt: 'Waste management vehicle' }
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
            <router-link to="/services">Services</router-link>
            <span>/</span>
            <span>Telematics</span>
          </nav>
          <span class="eyebrow">Telematics</span>
          <h1>Smarter Vehicles. Better Decisions.</h1>
          <p class="subtitle">
            Harness real-time data with OneGPS telematics solutions to improve fleet performance,
            safety, and operational efficiency.
          </p>
          <div class="hero-buttons">
            <router-link to="/book-a-demo" class="btn-primary btn-large">Request a Demo</router-link>
            <router-link to="/technical-support" class="btn-secondary btn-large">Technical Support</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container split">
        <div>
          <span class="eyebrow">The basics</span>
          <h2 class="section-title">What is Telematics?</h2>
          <p class="lead">
            Telematics is the fusion of telecommunications and informatics — delivering data from
            your vehicles to your fingertips. With OneGPS you get real-time insight into your
            fleet's movement, health, and driver behaviour.
          </p>
          <div class="metric-strip" style="margin-top: 2rem;">
            <div class="metric"><strong>24/7</strong><span>Live visibility</span></div>
            <div class="metric"><strong>CAN</strong><span>Bus data support</span></div>
            <div class="metric"><strong>5</strong><span>Support languages</span></div>
          </div>
        </div>
        <div class="split__media">
          <img src="../../images/V2X_-The-Basics-of-Connected-Vehicle-Technology.jpeg" alt="Connected vehicle technology" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container">
        <div class="section-header">
          <h2>Our Key Features</h2>
          <p>Everything you need to run a safer, leaner and more predictable operation.</p>
        </div>
        <div class="grid-4">
          <article v-for="feature in features" :key="feature.title" class="card">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container split">
        <div class="split__media">
          <img src="../../images/photo_2025-05-14_00-31-08.webp" alt="Telematics dashboard" loading="lazy" />
        </div>
        <div>
          <span class="eyebrow">How it works</span>
          <h2 class="section-title">From installation to action in four steps</h2>
          <ol class="steps" style="margin-top: 2rem;">
            <li>Install telematics devices in your vehicles</li>
            <li>Transmit data to OneGPS's secure cloud</li>
            <li>Access insights from your custom dashboard</li>
            <li>Take action to reduce risks and boost performance</li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container">
        <div class="section-header">
          <h2>Industries We Serve</h2>
          <p>One platform, configured for the way your sector actually works.</p>
        </div>
        <ul class="check-list" style="max-width: 640px; margin: 0 auto 3rem;">
          <li v-for="industry in industries" :key="industry">{{ industry }}</li>
        </ul>
        <div class="image-strip">
          <img v-for="image in gallery" :key="image.src" :src="image.src" :alt="image.alt" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container split">
        <div>
          <span class="eyebrow">Why it pays off</span>
          <h2 class="section-title">Benefits of OneGPS Telematics</h2>
          <ul class="check-list" style="margin-top: 1.75rem;">
            <li v-for="benefit in benefits" :key="benefit">{{ benefit }}</li>
          </ul>
        </div>
        <div class="quote-card">
          <blockquote>
            "The telematics insights from OneGPS helped us cut fuel costs by 25% and drastically
            improved our driver performance."
          </blockquote>
          <cite>Tayo E. — Logistics Supervisor</cite>
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container text-center">
        <h2 class="section-title">Unlock the Full Potential of Your Fleet</h2>
        <p class="lead" style="max-width: 620px; margin: 0 auto 2rem;">
          Let's transform the way you monitor, manage, and maintain your vehicles.
        </p>
        <router-link to="/contact" class="btn-primary btn-large">Talk to an Expert</router-link>
      </div>
    </section>

    <CTA />
  </div>
</template>
