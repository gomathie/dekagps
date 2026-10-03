<script setup>

import CTA from '../components/CTA.vue';
import trackingImg from '../../images/Comment-envoyer-votre-emplacement-par-SMS-en-cas-durgence-_-e1770109968257.webp';
import iotImg from '../../images/Modern-technologies_-Collage-with-yo-1.webp';
import webImg from '../../images/Cursos-de-Desenvolvimento-Web.webp';
import telematicsImg from '../../images/Is-Your-Fleet-Ready-for-GPS-Tracking-Solutions_-Find-Out-Why-Its-Crucial.webp';
import maintenanceImg from '../../images/car-mechanic-green-screen-tablet.jpg';
import fuelImg from '../../images/driver-checking-stock-market-his-phone-while-car.webp';

const services = [
  {
    title: 'Tracking Solutions',
    to: '/tracking-solutions',
    img: trackingImg,
    desc: 'Complete Visibility. Track vehicles, assets, and personnel in real-time. Gain a 24/7 view of your entire operation from one centralized dashboard.'
  },
  {
    title: 'IoT and Smart Homes',
    to: '/iot-smart-homes',
    img: iotImg,
    desc: 'Security You Can Trust. Protect what matters most with real-time monitoring and instant alerts, so you stay informed and proactive about your home 24/7.'
  },
  {
    title: 'Web Services',
    to: '/web-services',
    img: webImg,
    desc: 'High-Speed Web Solutions. We develop custom, lightning-fast websites designed to provide a seamless user experience and boost engagement.'
  },
  {
    title: 'Telematics',
    to: '/telematics',
    img: telematicsImg,
    desc: 'Know Where Your Fleet Is. Real-time GPS tracking gives you a bird\u2019s-eye view of every vehicle, ensuring your team stays on schedule and on the map.'
  },
  {
    title: 'Fleet Maintenance Management',
    to: '/fleet-management',
    img: maintenanceImg,
    desc: 'Efficiently manage fleet maintenance by handling planning, controlling maintenance activities, and tracking all expenditures.'
  },
  {
    title: 'Fuel Monitoring System',
    to: '/fuel-monitoring',
    img: fuelImg,
    desc: 'Detect fuel misuse and monitor the entire fuel distribution cycle, from filling stations to vehicle tanks.'
  }
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
            <span>Services</span>
          </nav>
          <span class="eyebrow">What we do</span>
          <h1>Technology that keeps every asset in sight</h1>
          <p class="subtitle">
            One connected platform for tracking, fuel, maintenance and IoT — engineered to fit
            transport, construction, agriculture and everything in between.
          </p>
          <div class="hero-buttons">
            <router-link to="/book-a-demo" class="btn-primary btn-large">Book a Demo</router-link>
            <router-link to="/contact" class="btn-secondary btn-large">Talk to an Expert</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive technology solutions tailored for your business needs.</p>
        </div>

        <div class="grid-3">
          <article v-for="service in services" :key="service.title" class="card card--media">
            <img :src="service.img" :alt="service.title" loading="lazy" />
            <div class="card__body">
              <h3>{{ service.title }}</h3>
              <p>{{ service.desc }}</p>
              <router-link :to="service.to" class="learn-more" style="margin-top: 1.25rem;">
                Learn More →
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container split">
        <div>
          <span class="eyebrow">Bundled deployments</span>
          <h2 class="section-title">Need a solution that spans several services?</h2>
          <p class="lead">
            Most operations don't fit a single box. We combine tracking, fuel monitoring,
            video telematics and maintenance planning into one contract, one dashboard and one
            support team — then scale it as your fleet grows.
          </p>
          <ul class="check-list" style="margin-top: 1.75rem;">
            <li>Hardware-agnostic: works with the trackers you already own</li>
            <li>White-label options for partners and resellers</li>
            <li>Onboarding, installation and staff training included</li>
            <li>Open API for ERP, BI and accounting integrations</li>
          </ul>
          <router-link to="/contact" class="btn-outline btn-large" style="margin-top: 2rem;">
            Request a Tailored Quote
          </router-link>
        </div>
        <div class="split__media">
          <img src="../../images/extra-accuracy-for-every-project.webp" alt="OneGPS platform accuracy" loading="lazy" />
        </div>
      </div>
    </section>

    <CTA />
  </div>
</template>
