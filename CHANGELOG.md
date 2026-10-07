# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **User Guide (`/docs`):** The complete OneGPS product documentation is now part of the site instead of an external link. Three routes (`/docs`, `/docs/:version`, `/docs/:version/:slug`) render 2 413 pages across four versions (7.10 current, plus 7.9, 7.8 and 7.7 archives), with a collapsible 687-entry navigation tree, an on-page heading list, previous/next paging, a version switcher that keeps your place and a print stylesheet. Linked from the navbar *Resources* dropdown and the footer *Company* column.
- **Guide search:** Per-version full-text index (title, headings, body), ranked results with surrounding text, keyboard navigable (`/` focuses the field, arrows/Enter/Escape), loaded lazily on first search so it costs nothing until used.
- **Documentation pipeline:** `tools/import-docs.mjs` crawls the upstream documentation export once, converts every page to a typed block tree, rewrites internal links to SPA routes and slugs, white-labels the copy, mirrors and re-encodes the screenshots, and writes the generated ES modules under `src/docs/**` + `public/docs-assets/images/**`. `npm run import:docs` re-runs it (HTML is cached, so a repeat import takes ~45 s).
- **Documentation verification:** `tools/check-docs.mjs` (`npm run check:docs`) checks that navigation, page map and search index agree on every page of every version, then SSR-renders a sample of pages per version and validates headings, image files, internal links, heading anchors, outbound docs links and source-vendor host references. Exits non-zero on failure.
- **Print support for the guide:** `@media print` rules in `src/style.css` replace the reference's separate print pages with clean black-on-white output (chrome, sidebar and pager hidden, figures and table rows kept off page boundaries).

### Changed
- **Docs white-label hardening:** The docs importer now unwraps external HTTP(S) links, neutralizes source-vendor hostnames and identifiers in visible docs text, and regenerates the 2 413-page corpus without outbound documentation links.
- **Navbar and footer:** A *User Guide* entry was added to the existing *Resources* dropdown and *Company* column — no new navigation pattern was introduced.
- **Analytics Routing Hook:** Added a global `router.afterEach` hook in `src/router/index.js` to manually dispatch Google Analytics pageview events on route navigation, ensuring accurate tracking across the SPA.
- **Scroll Reveal Animations:** Created a global custom Vue directive (`v-reveal`) in `src/main.js` and CSS classes in `src/style.css` to add smooth scroll-triggered fade-in and slide-up animations across multiple sections.
- **Per-Route Meta Descriptions:** Every route in `src/router/index.js` now carries a `meta.description`, and a shared `setMeta()` helper in the `router.afterEach` hook re-applies `<meta name="description">`, `og:title` and `og:description` on each client-side navigation (an SPA navigation does not reload `index.html`). `index.html` gained the default `description` and Open Graph tags for crawlers and link previews. Guide pages additionally set `document.title` and the meta description from the imported page.
- **Contact Form Delivery:** `src/components/ContactForm.vue` now POSTs the request as JSON to the endpoint configured through the new `VITE_CONTACT_ENDPOINT` environment variable (documented in `README.md`), with a submitting state, email-format validation and clickable `mailto:` fallback when delivery fails.
- **UI & Aesthetics Refinements:**
  - Upgraded `.feature-card` and `.solution-card` components with premium glassmorphism (`backdrop-filter: blur(12px)`) and subtle glowing borders.
  - Redesigned primary buttons (`.btn-primary`) with modern gold gradients and dynamic hover glow effects.
  - Added a `.gradient-text` utility class and applied it to the Hero section heading.
- **Content Optimization:** Refined the copy in `Home.vue`, `Solutions.vue`, and `Industries.vue`. Integrated more advanced, professional telematics vocabulary (e.g., CAN bus integration, capacitive fuel sensors, OBD-II diagnostics) to better reflect a top-tier GPS tracking and IoT solutions provider.
- **Contact Form Honesty:** The form used to switch to a "request captured" success state without sending anything. It now only reports success after an accepted HTTP response; otherwise it explains the failure and offers the email fallback. The `:disabled` state of `.btn-primary` and link styling inside `.form-error` were added to `src/style.css` to support this.

### Fixed
- **Docs external link leakage:** Removed generated outbound HTTP(S) links and source-vendor host references from the white-labeled User Guide, and added automated checks so they cannot return unnoticed.
- **Non-functional Contact Form:** Submitting `ContactForm.vue` (used by `/contact` and `/book-a-demo`) previously showed a fake success message and never sent the enquiry — a silent lead loss. See the delivery changes above.
- **HTML Layout Bugs:** Removed duplicated, improperly nested `.feature-card` and `.benefit-card` `<div>` tags in `src/views/Home.vue` and `src/views/Services/FleetManagement.vue` that were causing layout inconsistencies.
- **Hero Background Missing in Production:** The home page hero background (`Leverage-1.webp`) was referenced as a raw relative path string inside `Hero.vue`, so Vite never emitted the file and the image 404'd in the built site. It is now a static asset import, which Vite fingerprints and rewrites for the production bundle.
- **Broken Partner Logo Fallback:** The `@error` fallback on the industrial partner logo in `Home.vue` pointed at another raw relative asset path, which could never resolve once bundled. The fallback now uses an imported asset, so it works in both dev and production.
- **Corrupted `README.md` (Git saw it as binary):** The file ended with a UTF-16LE fragment (`# dekagps`) and NUL bytes — an accidental PowerShell redirection artifact — which made Git classify the whole README as binary and hide it from diffs and review. The stray bytes were removed byte-precisely, so the README is valid UTF-8 and diffs as text again.
