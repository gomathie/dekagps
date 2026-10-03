<script setup>
import ContactForm from '../components/ContactForm.vue';

const expectations = [
  { title: 'Discovery call', desc: 'We map your fleet size, routes, pain points and the metrics you need to move.' },
  { title: 'Live platform walkthrough', desc: 'See tracking, fuel, maintenance, reporting and mobile access on real data.' },
  { title: 'Hardware recommendation', desc: 'A tracker and sensor configuration that fits your vehicles — no over-selling.' },
  { title: 'Rollout & pricing plan', desc: 'Installation schedule, training plan and a transparent per-vehicle quote.' }
];

const promises = [
  'No obligation, no pressure',
  '30–45 minute session',
  'Available in English and French',
  'Bring your questions — engineers on the call'
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
            <span>Book a Demo</span>
          </nav>
          <span class="eyebrow">Book a demo</span>
          <h1>Book a Demo</h1>
          <p class="subtitle">Fill out a request form to get started.</p>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <ContactForm
          heading="Fill out a request form to get started"
          intro="Tell us what you'd like to see and we'll tailor the demonstration to your fleet."
          button-label="Request My Demo"
          note="We'll confirm your slot by email or phone within one business day."
        />
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container split">
        <div>
          <span class="eyebrow">What to expect</span>
          <h2 class="section-title">Your demo, step by step</h2>
          <ol class="steps" style="margin-top: 2rem;">
            <li v-for="item in expectations" :key="item.title">
              <span>
                <strong style="color: var(--text-primary);">{{ item.title }}</strong><br />
                {{ item.desc }}
              </span>
            </li>
          </ol>
        </div>
        <div>
          <div class="card" style="padding: 2.25rem;">
            <h3>Our promise</h3>
            <ul class="check-list" style="margin-top: 1.25rem;">
              <li v-for="item in promises" :key="item">{{ item }}</li>
            </ul>
            <p class="form-note" style="margin-top: 1.5rem;">
              Prefer to talk right now? Call
              <a href="tel:+233207949676" class="highlight">+233-20-794-9676</a> or
              <a href="mailto:info@onegps.africa" class="highlight">email us</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
