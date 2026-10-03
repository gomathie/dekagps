<script setup>
import { onMounted, ref } from 'vue';

/**
 * Reusable closing call-to-action.
 * Defaults match the wording used across the site; copy and destinations can be
 * overridden per page.
 */
const props = defineProps({
  title: { type: String, default: 'Ready to Get Started?' },
  text: {
    type: String,
    default: "Let's transform the way you monitor, manage, and maintain your fleet."
  },
  to: { type: String, default: '/book-a-demo' },
  label: { type: String, default: 'Book a Demo' },
  secondaryTo: { type: String, default: '/contact' },
  secondaryLabel: { type: String, default: 'Contact Us' }
});

const ctaBox = ref(null);

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
        entry.target.style.transform = 'scale(1)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  if (ctaBox.value) {
    ctaBox.value.style.opacity = 0;
    ctaBox.value.style.transform = 'scale(0.95)';
    ctaBox.value.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(ctaBox.value);
  }
});
</script>

<template>
  <section class="cta-section">
    <div class="cta-box glass-panel" ref="ctaBox">
      <h2>{{ props.title }}</h2>
      <p>{{ props.text }}</p>
      <div class="cta-buttons">
        <router-link :to="props.to" class="btn-primary btn-large">{{ props.label }}</router-link>
        <router-link :to="props.secondaryTo" class="btn-outline btn-large">{{ props.secondaryLabel }}</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}
.cta-box {
  background: var(--bg-darker);
  border: 1px solid var(--glass-border);
  padding: 4rem 2rem;
  border-radius: 16px;
  text-align: center;
}
.cta-box h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.cta-box p {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .cta-section {
    padding: 3.5rem 1rem;
  }
  .cta-box {
    padding: 2.5rem 1.5rem;
  }
  .cta-box h2 {
    font-size: 1.75rem;
  }
}
</style>
