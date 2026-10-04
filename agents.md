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

---

**Date:** 2026-10-04 (Session 2)
**Agent Action:** Favicon Rebrand, Changelog Setup, HTML Bug Fix, and Full Session Documentation

---

### 1. Favicon Update

**What was asked:** Update the favicon.

**What was done:**
- Replaced the existing `public/favicon.svg` (a generic purple lightning bolt, unrelated to the brand) with a custom-designed, brand-aligned SVG favicon.
- The new favicon uses:
  - **Dark navy background** (`#00172D`) — the primary brand background color
  - **Gold GPS location pin** (`#E6AC03`) — a teardrop/pin shape representing GPS tracking
  - **Hollow center ring + gold inner dot** — conveying precision location/tracking
- Additionally updated `index.html` with supplementary meta tags for cross-browser favicon support:
  - `<link rel="mask-icon">` with `color="#E6AC03"` — for Safari pinned tab tinting
  - `<meta name="theme-color" content="#00172D">` — tints the Chrome/Android browser toolbar to match the brand
  - `<meta name="msapplication-TileColor" content="#00172D">` — colors the Windows pinned tile for Edge/IE

**Files changed:**
- `public/favicon.svg` — full SVG rewrite
- `index.html` — added mask-icon, theme-color, and msapplication-TileColor meta tags

**Why:**
The original favicon was the Vite default (purple lightning bolt) and had zero connection to OneGPS's brand identity. A browser tab favicon is a critical micro-branding touchpoint — the first thing users see when they have the site open in a tab. Replacing it with a branded GPS pin in gold/navy ensures visual consistency with the site's color system. The extra meta tags improve the experience on Safari, Chrome Android, and Windows, where a bare SVG link tag is insufficient for full browser integration.

**Method:**
- Read the existing `public/favicon.svg` to understand its current structure
- Designed a new minimal SVG from scratch using brand CSS variables as hex values
- Used SVG `<rect>`, `<path>` (teardrop), `<circle>` primitives — no dependencies
- Overwrote `favicon.svg` in-place so the existing `<link rel="icon">` in `index.html` required no path change

---

### 2. CHANGELOG.md Creation

**What was asked:** Create a changelog markdown file for recording changes.

**What was done:**
- Created `CHANGELOG.md` at the project root following the [Keep a Changelog](https://keepachangelog.com) format, compatible with Semantic Versioning.
- Populated it with an `[Unreleased]` section documenting all changes from the current session under `Added`, `Changed`, and `Fixed` categories.

**Files changed:**
- `CHANGELOG.md` — new file created at project root

**Why:**
A `CHANGELOG.md` provides a human-readable history of the project that is separate from Git commit messages. It is especially important in team/multi-agent workflows where multiple contributors need to quickly understand what changed between versions without reading raw diffs.

**Method:**
- Used the standard Keep a Changelog format (industry standard)
- Wrote the initial entry retroactively covering all changes made in the session

---

### 3. agents.md Documentation Requirement (This Session)

**What was asked:** Document all changes to `agents.md` and instruct all future agents to do the same.

**What was done:**
- Updated `agents.md` to include a `## Agent Changelog & Documentation Requirement` section
- Added a **CRITICAL RULE** directive instructing all future agents to log their changes here, including: what was changed, which files were impacted, the method used, and the reasoning
- Populated the log with entries for all work done in Sessions 1 and 2

**Files changed:**
- `agents.md` — appended changelog section with all entries

**Why:**
In a multi-agent / multi-session workflow, context is easily lost between sessions. Without a persistent change log inside the project repo itself, a new agent starting fresh has no way to know what design decisions were made, what bugs were fixed, or what patterns were established. Embedding this in `agents.md` (which is already a project-level agent instruction file) ensures it is always discoverable by any future agent reading its instructions.

---

## Standing Instructions for ALL Future Agents

> **READ THIS BEFORE MAKING ANY CHANGES.**

1. **Always read `agents.md` and `CHANGELOG.md` first** to understand the history and current state of the project before doing any work.
2. **After completing any task**, add an entry to:
   - `agents.md` → under `## Agent Changelog & Documentation Requirement > Recent Changes Log`
   - `CHANGELOG.md` → under the appropriate `[Unreleased]` section (`Added`, `Changed`, `Fixed`, `Removed`)
3. **Entry format for `agents.md`:**
   ```
   **Date:** YYYY-MM-DD
   **Agent Action:** Short summary of task
   **What was done:** Detailed explanation
   **Files changed:** List of all affected files
   **Why:** Reasoning behind the approach
   **Method:** Technical steps taken
   ```
4. **Never add more than one Google tag** (`gtag.js`) per HTML file.
5. **All new Vue views** go in `src/views/`, components in `src/components/`, and routes must be registered in `src/router/index.js`.
6. **Maintain the glassmorphism dark aesthetic** — navy backgrounds, gold accents, backdrop-filter blur on cards.
