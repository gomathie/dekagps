<template>
  <div class="page-wrap">
    <section class="page-hero not-found">
      <div class="container">
        <div class="page-hero__inner">
          <span class="eyebrow">Error 404</span>
          <h1>This page has moved out of range</h1>
          <p class="subtitle">
            The page you were looking for doesn't exist, or the address has changed. Let's get you
            back on the map.
          </p>
          <div class="hero-buttons">
            <router-link to="/" class="btn-primary btn-large">Back to Home</router-link>
            <router-link to="/contact" class="btn-secondary btn-large">Report a Broken Link</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <h2>Popular destinations</h2>
          <p>Jump straight to the pages our visitors use most.</p>
        </div>
        <div class="grid-3">
          <router-link to="/services" class="card">
            <h3>Our Services</h3>
            <p>Tracking, fuel, maintenance, IoT and web services in one place.</p>
          </router-link>
          <router-link to="/industries" class="card">
            <h3>Industries</h3>
            <p>See how OneGPS is deployed across nine demanding sectors.</p>
          </router-link>
          <router-link to="/book-a-demo" class="card">
            <h3>Book a Demo</h3>
            <p>See the platform on your own routes with a live walkthrough.</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.not-found {
  background:
    radial-gradient(700px 360px at 50% 0%, rgba(230, 172, 3, 0.2), transparent 65%),
    linear-gradient(180deg, rgba(0, 23, 45, 0.96), rgba(0, 16, 34, 1));
}

.card {
  text-decoration: none;
}
</style>
