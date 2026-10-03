<script setup>
import { ref } from 'vue';
import CTA from '../components/CTA.vue';
import trackingImg from '../../images/real-time-vehicle-tracking.webp';
import geofenceImg from '../../images/custom-geofences.webp';
import notificationsImg from '../../images/notifications.webp';
import engineImg from '../../images/remote-engine-shut-off.webp';
import reportsImg from '../../images/reports.webp';

const heroImages = [geofenceImg, trackingImg, engineImg];

const capabilities = [
  {
    label: 'Real-time vehicle tracking',
    img: trackingImg,
    desc: "LeaseControl retrieves data from trackers and offers round-the-clock access to a vehicle's precise location."
  },
  {
    label: 'Custom geofences',
    img: geofenceImg,
    desc: 'Establishing a geofenced zone enables the user to receive alerts when a vehicle enters or leaves it.'
  },
  {
    label: 'Notifications',
    img: notificationsImg,
    desc: 'Users select their preferred method of receiving messages from LeaseControl: push notifications, emails, or SMS.'
  },
  {
    label: 'Remote engine shut-off',
    img: engineImg,
    desc: 'Users can easily send commands to remotely block and unblock a car engine.'
  },
  {
    label: 'Reports',
    img: reportsImg,
    desc: "An email is sent containing a performance report on the vehicle's trips, stops and parking sessions."
  }
];

const activeTab = ref(0);
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
            <span>Vehicle Leasing Solution</span>
          </nav>
          <span class="eyebrow">LeaseControl</span>
          <h1>Vehicle Leasing GPS Tracking Solution: Lease Management</h1>
          <p class="subtitle">
            A dependable vehicle leasing solution for tracking locations and recovery.
          </p>
          <div class="hero-buttons">
            <router-link to="/book-a-demo" class="btn-primary btn-large">Book a Demo</router-link>
            <router-link to="/contact" class="btn-secondary btn-large">Talk to Sales</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container split">
        <div>
          <span class="eyebrow">The problem</span>
          <h2 class="section-title">Financing vehicles is a risky market — until you can see them</h2>
          <p class="lead">
            Car financing, auto loans, and vehicle leasing present an appealing but notably risky
            market. Issues such as auto theft, late payments, defaults, and costly recovery
            processes hinder auto dealers and finance companies from expanding or even sustaining
            their current operations. Additionally, unreliable GPS tracking tools fail to provide
            adequate support.
          </p>
          <p class="lead" style="margin-top: 1rem;">
            This is where LeaseControl, an innovative auto leasing software, transforms the
            landscape. By incorporating telematics and IoT capabilities, it enhances the security of
            financed vehicles, safeguards dealers' profits, and delivers genuine business value.
          </p>
        </div>
        <div class="image-strip" style="grid-template-columns: 1fr;">
          <img v-for="image in heroImages" :key="image" :src="image" alt="LeaseControl capability" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container split">
        <div>
          <span class="eyebrow">How it helps</span>
          <h2 class="section-title">Built for dealers, financiers and leasing companies</h2>
        </div>
        <div>
          <p class="lead">
            To facilitate quick onboarding and user-friendliness, LeaseControl offers powerful tools
            for monitoring and managing a financed vehicle, including geofences, notifications and
            remote engine start/stop commands.
          </p>
          <p class="lead" style="margin-top: 1rem;">
            By providing round-the-clock tracking of leased vehicles, users can always know the
            precise location of their assets, ensuring peace of mind.
          </p>
          <p class="lead" style="margin-top: 1rem;">
            Reaction time? The user selects what they deem a suspicious activity — such as leaving a
            specific area or losing connectivity — and configures alarms that activate automatically
            when an incident occurs.
          </p>
          <p class="lead" style="margin-top: 1rem;">
            Users can personalise notifications to their preference, receiving them via SMS, email,
            or push notifications through the web interface.
          </p>
          <p class="lead" style="margin-top: 1rem;">
            To prevent additional financial losses, auto dealers can issue a command to remotely
            activate or deactivate the ignition if a borrower falls behind on their loan payments.
          </p>
          <p class="lead" style="margin-top: 1rem;">
            LeaseControl can be accessed via the OneGPS app. Users can download the app at no cost to
            manage their vehicles remotely.
          </p>
          <router-link to="/contact" class="btn-outline btn-large" style="margin-top: 2rem;">
            Read More
          </router-link>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <h2>Discover the capabilities of LeaseControl</h2>
          <p>Five tools that protect financed assets from handover to final payment.</p>
        </div>

        <div class="tab-bar">
          <button
            v-for="(capability, index) in capabilities"
            :key="capability.label"
            class="tab-btn"
            :class="{ active: activeTab === index }"
            type="button"
            @click="activeTab = index"
          >
            {{ capability.label }}
          </button>
        </div>

        <div class="split" style="align-items: center;">
          <div class="split__media">
            <img :src="capabilities[activeTab].img" :alt="capabilities[activeTab].label" loading="lazy" />
          </div>
          <div>
            <h3 class="section-title" style="font-size: 1.35rem;">{{ capabilities[activeTab].label }}</h3>
            <p class="lead">{{ capabilities[activeTab].desc }}</p>
            <ul class="check-list" style="margin-top: 1.5rem;">
              <li>Configured inside the OneGPS web platform and mobile app</li>
              <li>Alerts delivered by push notification, email or SMS</li>
              <li>Full trip, stop and parking history retained for recovery cases</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <CTA />
  </div>
</template>
