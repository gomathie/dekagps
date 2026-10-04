<script setup>
/**
 * ContactForm
 * Reusable request form used by /contact and /book-a-demo.
 *
 * Submissions are POSTed as JSON to the endpoint configured through the
 * VITE_CONTACT_ENDPOINT environment variable (see the README) — any form backend
 * that accepts a JSON POST works, e.g. Formspree. When that endpoint is missing
 * or the request fails, the panel offers a pre-filled email fallback instead of
 * pretending the request was delivered.
 */
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

/** Public address also listed on /contact and in the footer. */
const FALLBACK_EMAIL = 'info@onegps.africa';

/** Validated loosely on purpose: the backend remains the source of truth. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT || '').trim();

const props = defineProps({
  heading: { type: String, default: 'Fill out a form to get started' },
  intro: {
    type: String,
    default: 'Tell us a little about your fleet and one of our specialists will get back to you within one business day.'
  },
  buttonLabel: { type: String, default: 'Send Request' },
  messageRequired: { type: Boolean, default: false },
  note: { type: String, default: '' }
});

const route = useRoute();

const form = reactive({ name: '', email: '', subject: '', message: '' });
const error = ref('');
const submitting = ref(false);
const submitted = ref(false);

/** True when the failure was about delivery, so the email fallback is offered. */
const deliveryFailed = ref(false);

const mailtoLink = computed(() => {
  const subject = form.subject.trim() || `OneGPS enquiry from ${form.name.trim() || 'website visitor'}`;
  const body = [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    '',
    form.message.trim()
  ].join('\n');

  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const handleSubmit = async () => {
  if (submitting.value) return;

  if (!form.name.trim() || !form.email.trim()) {
    error.value = 'Please add your name and email address.';
    return;
  }
  if (!EMAIL_PATTERN.test(form.email.trim())) {
    error.value = 'Please check your email address.';
    return;
  }
  if (props.messageRequired && !form.message.trim()) {
    error.value = 'Please tell us how we can help.';
    return;
  }

  error.value = '';
  deliveryFailed.value = false;

  if (!endpoint) {
    deliveryFailed.value = true;
    error.value = `Our online form is not connected right now. Please send your details to ${FALLBACK_EMAIL} and we'll respond within one business day.`;
    return;
  }

  submitting.value = true;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        page: route.path
      })
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    submitted.value = true;
  } catch (err) {
    console.error('Contact form submission failed:', err);
    deliveryFailed.value = true;
    error.value = `We couldn't send your request. Please try again, or send it to ${FALLBACK_EMAIL}.`;
  } finally {
    submitting.value = false;
  }
};

const reset = () => {
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
  error.value = '';
  deliveryFailed.value = false;
  submitted.value = false;
};

defineExpose({ reset });
</script>

<template>
  <div class="form-panel">
    <div class="form-panel__aside">
      <slot name="visual">
        <img src="../../images/hand-woman-using-digital-tablet.webp" alt="OneGPS team member using a tablet" />
      </slot>
    </div>

    <div class="form-panel__body">
      <div v-if="submitted" class="form-success">
        <h3>Thank you, {{ form.name.split(' ')[0] }}!</h3>
        <p>
          Your request has been sent. A OneGPS specialist will reply to
          <strong>{{ form.email }}</strong> within one business day.
        </p>
        <button class="btn-outline btn-large" type="button" style="margin-top: 1.5rem;" @click="reset">
          Send another request
        </button>
      </div>

      <form v-else novalidate @submit.prevent="handleSubmit">
        <h2>{{ heading }}</h2>
        <p>{{ intro }}</p>

        <p v-if="error" class="form-error">
          {{ error }}
          <template v-if="deliveryFailed">
            <br />
            <a :href="mailtoLink">Send it as an email instead</a>
          </template>
        </p>

        <div class="form-group">
          <label for="cf-name">Your name <span class="req">*</span></label>
          <input id="cf-name" v-model="form.name" class="form-control" type="text" name="name" placeholder="Full name" required />
        </div>

        <div class="form-group">
          <label for="cf-email">Your email <span class="req">*</span></label>
          <input id="cf-email" v-model="form.email" class="form-control" type="email" name="email" placeholder="you@company.com" required />
        </div>

        <div class="form-group">
          <label for="cf-subject">Subject</label>
          <input id="cf-subject" v-model="form.subject" class="form-control" type="text" name="subject" placeholder="Vehicle tracking, fuel monitoring, IoT…" />
        </div>

        <div class="form-group">
          <label for="cf-message">
            Your message <span v-if="messageRequired" class="req">*</span>
            <template v-else>(optional)</template>
          </label>
          <textarea id="cf-message" v-model="form.message" class="form-control" name="message" placeholder="How can we help?"></textarea>
        </div>

        <button class="btn-primary btn-large" type="submit" :disabled="submitting">
          {{ submitting ? 'Sending…' : buttonLabel }}
        </button>

        <p v-if="note" class="form-note">{{ note }}</p>
      </form>
    </div>
  </div>
</template>
