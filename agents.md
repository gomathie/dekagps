# Agent Guidelines & Project Instructions - OneGPS

## Critical Requirement: Google Tag (gtag.js)

Whenever creating any new HTML page, HTML entrypoint, or template for this website, **you MUST copy and paste the Google tag in the code of every page, immediately after the opening `<head>` element.**

### Rules:
1. **Placement**: Immediately after the `<head>` tag (before any other head tags or meta tags).
2. **No Duplicates**: Do NOT add more than one Google tag to each page.
3. **Exact Tag Snippet**:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-F5BVYX6K72"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-F5BVYX6K72');
</script>
```

---

## Project Overview & Tech Stack
- **Project**: OneGPS (Modern, premium GPS tracking and telematics solutions)
- **Tech Stack**: Vite + Vue 3 + Vue Router + CSS
- **Entry HTML**: [`index.html`](file:///c:/Users/gomat/Downloads/DEV%20PROJECTS/onegps/index.html)
- **Styling**: Vanilla CSS with curated color palette, dark mode aesthetics, and glassmorphism.

## Page & Component Creation Guidelines
- If creating a standalone HTML page (e.g. landing page, legal page, error page, or secondary Vite HTML page), ensure the Google tag snippet above is included immediately below the `<head>` tag.
- For Vue views and components, build under `src/views/` and `src/components/`, and register any new routes in [`src/router/index.js`](file:///c:/Users/gomat/Downloads/DEV%20PROJECTS/onegps/src/router/index.js).
- Ensure all interactive elements and pages adhere to the responsive design and premium visual standards established in the project.

---

## Agent Changelog & Documentation Requirement

**CRITICAL RULE FOR ALL AGENTS:** 
Whenever an agent completes a significant task, feature, or refactor in this project, they **MUST** document their changes in this section of `agents.md`. State clearly what was changed, which files were impacted, and the reasoning behind it. This maintains project continuity.

### Recent Changes Log

**Date:** 2026-10-04
**Agent Action:** Vue 3 SPA Finalization, UI Refinement, and Content Overhaul
**Changes Made:**
1. **Analytics Routing Fix:** The Google Analytics tag (`gtag.js`) is correctly placed in `index.html`. Since the project is an SPA, I updated `src/router/index.js` with a `router.afterEach` hook to manually send Google Analytics pageview events on route change. This guarantees accurate page tracking as users navigate without triggering a hard reload.
2. **UI & Aesthetics Refinement:** 
   - Added a global Vue directive (`v-reveal`) in `src/main.js` and CSS classes in `src/style.css` to introduce smooth scroll-triggered fade-in animations across all pages.
   - Enhanced `feature-card`, `solution-card`, and `btn-primary` in `style.css` with a premium glassmorphism aesthetic (`backdrop-filter: blur(12px)`) and modern gradients.
3. **Content Research & Optimization:** 
   - Refined the copy in `Home.vue`, `Solutions.vue`, and `Industries.vue` to sound more professional and technical (utilizing industry terms like *CAN bus, capacitive fuel sensors, IoT environments, OBD-II*), accurately reflecting a top-tier GPS telematics provider.
   - Internal service pages like `FleetManagement.vue` were verified to be extremely accurate and highly technical.
4. **HTML Cleanup:** Fixed duplicate nested `.feature-card` and `.benefit-card` `<div>` tags in `Home.vue` and `FleetManagement.vue` that were causing potential layout and spacing anomalies.
