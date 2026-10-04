# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Analytics Routing Hook:** Added a global `router.afterEach` hook in `src/router/index.js` to manually dispatch Google Analytics pageview events on route navigation, ensuring accurate tracking across the SPA.
- **Scroll Reveal Animations:** Created a global custom Vue directive (`v-reveal`) in `src/main.js` and CSS classes in `src/style.css` to add smooth scroll-triggered fade-in and slide-up animations across multiple sections.

### Changed
- **UI & Aesthetics Refinements:**
  - Upgraded `.feature-card` and `.solution-card` components with premium glassmorphism (`backdrop-filter: blur(12px)`) and subtle glowing borders.
  - Redesigned primary buttons (`.btn-primary`) with modern gold gradients and dynamic hover glow effects.
  - Added a `.gradient-text` utility class and applied it to the Hero section heading.
- **Content Optimization:** Refined the copy in `Home.vue`, `Solutions.vue`, and `Industries.vue`. Integrated more advanced, professional telematics vocabulary (e.g., CAN bus integration, capacitive fuel sensors, OBD-II diagnostics) to better reflect a top-tier GPS tracking and IoT solutions provider.

### Fixed
- **HTML Layout Bugs:** Removed duplicated, improperly nested `.feature-card` and `.benefit-card` `<div>` tags in `src/views/Home.vue` and `src/views/Services/FleetManagement.vue` that were causing layout inconsistencies.
