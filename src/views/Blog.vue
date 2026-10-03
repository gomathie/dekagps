<script setup>


import CTA from '../components/CTA.vue';
import webDesignImg from '../../images/Laptop-Screen.jpg';
import transitImg from '../../images/images.jpg';
import connectedFleetImg from '../../images/2149093905-768x512.webp';
import videoTelematicsImg from '../../images/BP-1-768x576.png';
import assetMonitoringImg from '../../images/122698-768x512.webp';
import aiTelematicsImg from '../../images/2151662975-768x512.webp';
import valuePropositionImg from '../../images/Value-768x513.jpg';

/**
 * NOTE: individual article pages from the previous platform are still being
 * migrated, so the listing intentionally renders without per-post links instead
 * of pointing at routes that do not exist yet.
 */
const posts = [
  { title: 'The Importance of Responsive Web Design', category: 'Web Design', img: webDesignImg },
  { title: 'Revolutionizing Transit: The Intersection of Technology and Transportation', category: 'Transportation', img: transitImg },
  { title: 'Connected Fleet Management: The Future Ahead', category: 'Fleet Management', img: connectedFleetImg },
  { title: 'Safeguarding Cargo, Drivers, and Reputation — The Intelligent Approach', category: 'Telematics' },
  { title: 'Navigating Tomorrow: The Impact of Intelligent Telematics on Fleet Management', category: 'Telematics' },
  { title: 'The role of video telematics in improving driver safety and cargo security', category: 'Video Telematics', img: videoTelematicsImg },
  { title: 'Understanding Asset Monitoring in the Telematics Ecosystem', category: 'Asset Monitoring', img: assetMonitoringImg },
  { title: 'The Impact of AI on Telematics: Transforming Fleet Management', category: 'AI & Telematics', img: aiTelematicsImg },
  { title: 'The Value Proposition: Benefits of Offering Asset Monitoring Solutions', category: 'Asset Monitoring', img: valuePropositionImg }
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
            <span>Blog</span>
          </nav>
          <span class="eyebrow">Insights</span>
          <h1>Ideas, research and field notes on telematics</h1>
          <p class="subtitle">
            Practical guidance on fleet technology, asset monitoring, video telematics and the
            digital tools that keep operations moving.
          </p>
          <div class="hero-buttons">
            <router-link to="/book-a-demo" class="btn-primary btn-large">Book a Demo</router-link>
            <router-link to="/services" class="btn-secondary btn-large">Explore Services</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="blog-grid">
          <article v-for="post in posts" :key="post.title" class="blog-card">
            <div class="blog-card__media">
              <img v-if="post.img" :src="post.img" :alt="post.title" loading="lazy" />
            </div>
            <div class="blog-card__body">
              <span class="blog-card__cat">{{ post.category }}</span>
              <h3>{{ post.title }}</h3>
              <span class="pending-note">Full article migration in progress</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad section-tint">
      <div class="container text-center">
        <h2 class="section-title">Need the full brief today?</h2>
        <p class="lead" style="max-width: 660px; margin: 0 auto 2rem;">
          Individual articles are being migrated from our previous platform. In the meantime our
          team is happy to walk you through the research, benchmarks and case studies behind them.
        </p>
        <div class="hero-buttons" style="justify-content: center;">
          <router-link to="/contact" class="btn-primary btn-large">Request an Article</router-link>
          <router-link to="/faq" class="btn-outline btn-large">Read the FAQ</router-link>
        </div>
      </div>
    </section>

    <CTA />
  </div>
</template>

<style scoped>
.blog-card__media {
  background: linear-gradient(135deg, rgba(230, 172, 3, 0.18), rgba(0, 23, 45, 0.9));
  min-height: 190px;
}

.pending-note {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  border-top: 1px solid var(--border-light);
  padding-top: 0.75rem;
}
</style>
