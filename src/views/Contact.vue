<script setup>
import ContactForm from '../components/ContactForm.vue';
import CTA from '../components/CTA.vue';
import websiteIcon from '../../images/website.png';
import locationIcon from '../../images/location-3.png';
import timeIcon from '../../images/time.png';
import sendIcon from '../../images/send.png';

const details = [
  {
    icon: locationIcon,
    title: 'Address',
    lines: ['Kasoa, Human Rights Road', 'Accra, Ghana, Ring Road Barrier']
  },
  {
    icon: timeIcon,
    title: 'Phone',
    lines: ['+233-20-794-9676', 'Mon – Sat: 8am – 6pm; Sun CLOSED']
  },
  {
    icon: sendIcon,
    title: 'Contact',
    lines: ['info@onegps.africa']
  },
  {
    icon: websiteIcon,
    title: 'Technical Support',
    lines: ['support@onegps.africa']
  }
];
</script>

<template>
  <div class="page-wrap">
    <section class="page-hero">
      <div class="container">
        <div class="page-hero__inner">
          <span class="eyebrow">Contact</span>
          <h1>Talk to the OneGPS team</h1>
          <p class="subtitle">
            Whether you're comparing trackers, planning a nationwide rollout or need help with an
            existing installation, we're ready to help.
          </p>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <ContactForm
          heading="Fill out a form to get started"
          intro="Send us a message and a OneGPS specialist will respond within one business day."
          button-label="Send Message"
          :message-required="true"
          note="By submitting this form you agree to be contacted about your enquiry. We never share your details with third parties."
        />
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container">
        <div class="section-header">
          <h2>Reach us directly</h2>
          <p>Head office, support desk and business hours at a glance.</p>
        </div>
        <div class="grid-4">
          <article v-for="detail in details" :key="detail.title" class="card text-center">
            <img :src="detail.icon" :alt="detail.title" class="contact-icon" loading="lazy" />
            <h3>{{ detail.title }}</h3>
            <p v-for="line in detail.lines" :key="line">{{ line }}</p>
          </article>
        </div>

        <div class="text-center" style="margin-top: 3rem;">
          <a href="https://wa.me/233207949676" target="_blank" rel="noopener" class="btn-outline btn-large">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>

    <CTA />
  </div>
</template>

<style scoped>
.contact-icon {
  width: 46px;
  height: 46px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: grayscale(1) brightness(1.6) sepia(1) hue-rotate(-10deg) saturate(4);
}
</style>
