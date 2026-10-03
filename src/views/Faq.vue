<script setup>


import { ref } from 'vue';
import CTA from '../components/CTA.vue';

const faqs = [
  {
    q: "How does 'Fuel management' work?",
    a: [
      'Our fuel management solution provides insightful reports and charts, helping you make data-driven decisions to improve overall fuel consumption, compare vehicles and drivers, and even spot fuel theft.',
      "Our solution offers precise fuel tracking with high-accuracy sensors, allowing you to monitor your fleet's fuel levels and see average consumption over time, helping identify vehicles with the highest fuel usage and their routes."
    ]
  },
  {
    q: 'How do I request assistance with API methods?',
    a: ['If you are experiencing any issues setting up an API key and need assistance, reach out to our support team by email. To get assistance you will need to:'],
    list: [
      'Provide the API key that is being used for data sharing',
      'Include the third-party platform IT specialist in the recipients of the email, so we can assist them with API method settings',
      'Describe what kind of information needs to be shared via the API key'
    ]
  },
  {
    q: 'How can I be alerted of camera issues and other events?',
    a: [
      "Our platform offers Camera Technical Alerts to keep you informed about technical issues related to camera devices. It's crucial to receive timely alerts in case of problems such as a removed memory card, device shutdown, or technical malfunctions that prevent the device from recording important events on the road.",
      'You can customise your notification preferences, choosing which technical events you want to receive alerts for, and how you want to receive them — via email, SMS, or platform notifications.'
    ]
  },
  {
    q: 'How do GPS devices work?',
    a: [
      'GPS devices use a system called GPS (Global Positioning System) to find their exact location anywhere on Earth. Each device is equipped with a SIM card and a GPS antenna to facilitate communication and location tracking.',
      'There are three main terms related to GPS tracking devices:'
    ],
    list: [
      'GPS — the global navigation satellite system that gives accurate location information to GPS trackers.',
      'GSM — Global System for Mobile communications, the technology that lets mobile devices connect and communicate through cell towers.',
      'GPRS — an enhancement to GSM that helps devices connect to the internet and transfer data more efficiently.'
    ],
    after: [
      'All GPS devices use mobile networks to send real-time data to fleet management providers, supporting remote monitoring and management. If a stable connection to the mobile operator cannot be established, the device will not be able to transmit any data.'
    ]
  },
  {
    q: 'What is CAN bus data, and how does it improve fleet management?',
    a: [
      'CAN bus (Controller Area Network) is a communication protocol used in different industries, especially vehicles and factories. It lets microcontrollers and devices talk to each other directly, without a main computer in between.',
      "In telematics, CAN bus collects and transmits data from vehicles to central systems for analysis, monitoring and reporting. The telematics device acts as a messenger between the vehicle's computer and the fleet management platform — it doesn't change or calculate anything, it simply sends the raw data to the server. In most cases, what you see in the monitoring software is exactly what has been read from the vehicle's systems.",
      'The most common data received from CAN bus connections:'
    ],
    list: [
      'Real-time odometer readings',
      'Fuel data (level and consumption)',
      'Engine performance (engine hours, RPM, temperature)'
    ]
  },
  {
    q: 'Can I track usage in kilometers or engine hours?',
    a: [
      'Yes! You can track vehicle usage in miles, kilometres or hours. The usage "type" can be configured as an account-level default and modified for each vehicle asset.'
    ]
  },
  {
    q: 'Can I set up custom maintenance or service schedules for my vehicles and equipment?',
    a: [
      'Yes. OneGPS makes it easy to track exactly what type of service work is being done on your vehicles and equipment, from both in-house and outsourced maintenance. The system comes with a list of standard tasks and categories, and you can customise these for your fleet needs. Our reporting capabilities make it easy to keep tabs on costs, common service items and systems at any given time.'
    ]
  },
  {
    q: 'Can I update mileage information from an external source, like a GPS system?',
    a: [
      'Yes. OneGPS offers GPS integrations with a large list of GPS providers. In addition to receiving geolocation data and automatic odometer updates, some integrations also offer fuel location exception reporting, DVIR defect management and DTC handling.'
    ]
  },
  {
    q: 'Can I export my data?',
    a: [
      'Yes, you can export all your data to a spreadsheet at any time. You can also use data connectors to send clean OneGPS data to supported BI systems and data warehouses. For non-supported systems, developers can create integrations using the OneGPS public API.'
    ]
  },
  {
    q: 'Is it possible to read CAN data from all types of vehicles?',
    a: [
      'In most cases a tracking device can read CAN data from various types of vehicles. However, the ability to do so may depend on factors such as the vehicle\'s make, model and year, as well as the compatibility of the tracking device with the vehicle\'s systems.',
      'If you need CAN data from a specific vehicle, contact us with the details and our team will assess the possibility and come back with a solution.'
    ]
  }
];

const openIndex = ref(0);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};
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
            <span>FAQ</span>
          </nav>
          <span class="eyebrow">Help centre</span>
          <h1>Frequently Asked Questions</h1>
          <p class="subtitle">
            Answers to the questions we hear most often about tracking hardware, fuel monitoring,
            CAN bus data, integrations and reporting.
          </p>
          <div class="hero-buttons">
            <router-link to="/book-a-demo" class="btn-primary btn-large">Book a Demo</router-link>
            <router-link to="/technical-support" class="btn-secondary btn-large">Contact Support</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="faq.q"
            class="faq-item"
            :class="{ open: openIndex === index }"
          >
            <button
              class="faq-question"
              type="button"
              :aria-expanded="openIndex === index"
              @click="toggle(index)"
            >
              <span>{{ faq.q }}</span>
              <span class="faq-toggle">{{ openIndex === index ? '−' : '+' }}</span>
            </button>
            <div v-show="openIndex === index" class="faq-answer">
              <p v-for="paragraph in faq.a" :key="paragraph">{{ paragraph }}</p>
              <ul v-if="faq.list">
                <li v-for="item in faq.list" :key="item">{{ item }}</li>
              </ul>
              <p v-for="paragraph in faq.after || []" :key="paragraph" style="margin-top: 0.85rem;">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container text-center">
        <h2 class="section-title">Still need an answer?</h2>
        <p class="lead" style="max-width: 620px; margin: 0 auto 2rem;">
          Our support desk is available Monday to Saturday, 8am – 6pm.
        </p>
        <div class="hero-buttons" style="justify-content: center;">
          <router-link to="/contact" class="btn-primary btn-large">Send a Message</router-link>
          <a href="mailto:support@onegps.africa" class="btn-outline btn-large">support@onegps.africa</a>
        </div>
      </div>
    </section>

    <CTA />
  </div>
</template>
