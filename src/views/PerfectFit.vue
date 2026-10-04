<script setup>

import CTA from '../components/CTA.vue';

const industries = [
  { title: 'Logistics & Transportation', desc: 'Live visibility on every route, depot and drop-off point.' },
  { title: 'Construction & Heavy Equipment', desc: 'Track plant, trailers and site machinery across dispersed sites.' },
  { title: 'Courier & Delivery', desc: 'Proof of delivery, route optimisation and customer ETAs.' },
  { title: 'Service Providers', desc: 'Dispatch, job verification and timesheets for field teams.' },
  { title: 'Agriculture', desc: 'Monitor field activity, machinery use and fuel per hectare.' },
  { title: 'Waste Management', desc: 'Route compliance, collections proof and bin-level reporting.' }
];

const adaptations = [
  'Modular platform that scales with your operations',
  'Custom integrations and APIs available',
  'Easy-to-use interfaces for industry-specific workflows',
  'Ongoing support and updates based on your feedback'
];

const benefits = [
  'Real-Time Tracking & Alerts',
  'Advanced Reporting & Analytics',
  'Seamless Integration',
  'Data Security & Compliance',
  'Mobile-Friendly Access',
  'Customizable for Any Scale'
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
            <span>Industries</span>
            <span>/</span>
            <span>Perfect Fit</span>
          </nav>
          <span class="eyebrow">Perfect fit</span>
          <h1>One Platform. Endless Possibilities.</h1>
          <p class="subtitle">
            From logistics to smart homes, OneGPS adapts to your industry's needs with flexible,
            scalable tech solutions.
          </p>
          <div class="hero-buttons">
            <router-link to="/book-a-demo" class="btn-primary btn-large">Book a Demo</router-link>
            <router-link to="/industries" class="btn-secondary btn-large">See All Industries</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <h2>Industries We Serve</h2>
          <p>Purpose-built workflows for the sectors we know best.</p>
        </div>
        <div class="grid-3">
          <article v-for="industry in industries" :key="industry.title" class="card">
            <h3>{{ industry.title }}</h3>
            <p>{{ industry.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container split">
        <div>
          <span class="eyebrow">Adaptability</span>
          <h2 class="section-title">How OneGPS Adapts to You</h2>
          <ul class="check-list" style="margin-top: 1.75rem;">
            <li v-for="item in adaptations" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="split__media">
          <img src="../../images/d8e67f7a-0d74-4f29-907e-415968aed5ca-300x300.jpeg" alt="Operations adapted to OneGPS" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <h2>Key Benefits Across All Industries</h2>
          <p>The fundamentals every operation gains on day one.</p>
        </div>
        <div class="grid-3">
          <article v-for="benefit in benefits" :key="benefit" class="card">
            <h3>{{ benefit }}</h3>
          </article>
        </div>
      </div>
    </section>

    <CTA />
  </div>
</template>
