<script setup>
import { onMounted, ref } from 'vue';

const featureCards = ref([]);

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  featureCards.value.forEach((card, index) => {
    if (card) {
      card.style.opacity = 0;
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
      observer.observe(card);
    }
  });
});
</script>

<template>
  <section class="features" id="features">
    <div class="section-header">
      <h2>Powerful tracking capabilities</h2>
      <p>Everything you need to manage your fleet, protect assets, and streamline operations.</p>
    </div>
    <div class="features-grid">
      <div class="feature-card" ref="featureCards">
        <h3>Real-Time Location</h3>
        <p>Pinpoint accuracy with sub-second updates across our global satellite network. Never lose sight of what matters.</p>
      </div>
      <div class="feature-card" ref="featureCards">
        <h3>Smart Geofencing</h3>
        <p>Set custom boundaries and receive instant alerts when assets enter or leave designated zones.</p>
      </div>
      <div class="feature-card" ref="featureCards">
        <h3>Advanced Analytics</h3>
        <p>Turn movement data into actionable insights. Optimize routes, reduce fuel consumption, and improve efficiency.</p>
      </div>
      <div class="feature-card" ref="featureCards">
        <h3>Instant Alerts</h3>
        <p>Customizable notifications for speed violations, harsh braking, unauthorized movement, or maintenance needs.</p>
      </div>
    </div>
  </section>
</template>
