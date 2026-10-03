<script setup>
/**
 * ContactForm
 * Reusable request form used by /contact and /book-a-demo.
 * There is no backend endpoint wired yet, so submitting simply switches the
 * panel into a success state (no network request is made). When an endpoint is
 * available, replace the body of `handleSubmit` with the real call.
 */
import { reactive, ref } from 'vue';

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

const form = reactive({ name: '', email: '', subject: '', message: '' });
const error = ref('');
const submitted = ref(false);

const handleSubmit = () => {
  if (!form.name.trim() || !form.email.trim()) {
    error.value = 'Please add your name and email address.';
    return;
  }
  if (props.messageRequired && !form.message.trim()) {
    error.value = 'Please tell us how we can help.';
    return;
  }
  error.value = '';
  submitted.value = true;
};

const reset = () => {
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
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
          Your request has been captured. A OneGPS specialist will contact you on
          <strong>{{ form.email }}</strong> shortly.
        </p>
        <button class="btn-outline btn-large" type="button" style="margin-top: 1.5rem;" @click="reset">
          Send another request
        </button>
      </div>

      <form v-else novalidate @submit.prevent="handleSubmit">
        <h2>{{ heading }}</h2>
        <p>{{ intro }}</p>

        <p v-if="error" class="form-error">{{ error }}</p>

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

        <button class="btn-primary btn-large" type="submit">{{ buttonLabel }}</button>

        <p v-if="note" class="form-note">{{ note }}</p>
      </form>
    </div>
  </div>
</template>
