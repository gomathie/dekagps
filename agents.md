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

**Date:** 2026-10-04 (Session 3)

**Agent Action:** Production-build audit — fixed the hero background image that disappeared after `vite build`, and repaired a dead `@error` asset fallback.

**What was done:**

1. **Hero background not shipped to production (`src/components/Hero.vue`).**
   - The component stored the background image as a raw *string* in `<script setup>` (`const bgImage = '../../images/Leverage-1.webp'`) and used it through a CSS-in-JS binding (`:style="{ backgroundImage: url(...) }"`).
   - Vite only rewrites *asset imports*, so no image was emitted for the hero: it worked in `npm run dev` (project root is served statically, so the relative path resolved) and silently 404'd in the built bundle.
   - Replaced the string with a real static import (`import bgImage from '../../images/Leverage-1.webp'`) and intentionally kept the existing `:style` binding.
2. **Dead `@error` fallback on the home page (`src/views/Home.vue`).**
   - The industrial partner logo had `@error="(e) => e.target.src='../../images/industrial-logo_logo2.webp'"`.
   - That fallback is *runtime* code: the relative string is never processed by Vite, so if the primary asset ever failed to load, the fallback would fail in exactly the same way (and it also tripped over Vue's `transformAssetUrls`, which rewrote the literal inside the handler into a bare module specifier).
   - Imported the fallback asset (`industrialLogoFallback`) and pointed the handler at that binding; also removed the two stale “build these sections inline for now” comments from the script block.
3. **Audit of every other asset reference.** Verified that all remaining image references are either Vue template `src`/`url()` attributes (processed by Vite) or static `new URL('../../images/…', import.meta.url).href` calls with string literals (also processed). No other dev-only paths were found.

**Files changed:**
- `src/components/Hero.vue` — asset import instead of raw path string
- `src/views/Home.vue` — working `@error` fallback + import, stale comments removed
- `CHANGELOG.md` — entries under `Fixed`/`Changed`

**Why:**
The hero image is the first visual the visitor sees on the landing page; it rendered in development and was missing in every production build, which is the single most damaging class of bug for a marketing site. The `@error` fallback was a latent bug of the same origin (an asset path sitting in JavaScript instead of in an import), so it was corrected in the same pass rather than left to fail later.

**Method:**
- Traced the hero from `Home.vue` → `Hero.vue` → the string binding, and compared against sibling components, which already use `import x from '../../images/…'` (the established project pattern).
- Confirmed the root cause by running `npm run build` and inspecting `dist/assets`, where `Leverage-1*.webp` was absent while every other image was emitted.
- Applied the same pattern to the `@error` fallback, keeping the behaviour (fall back to a second logo) but making the fallback path build-safe.

**Verification:**
- `npm run build` → `✓ built in 1.72s`, no warnings or errors.
- `dist/assets/Leverage-1-B8X9433S.webp` now exists and the hashed URL is referenced from the built entry chunk.
- A regex sweep of `dist/assets/index-*.js` for `../../images` returns no matches, i.e. no un-processed asset paths remain in the production bundle.

---

**Date:** 2026-10-04 (Session 4)

**Agent Action:** Added per-route meta descriptions (SEO/social), fixed the `<meta name="description">`-never-updates SPA problem, and made the contact/demo form actually deliver submissions instead of faking a success state.

**What was done:**

1. **Per-route descriptions (`src/router/index.js`).** Every route now carries a `meta.description` alongside its existing `meta.title` (21 routes). The existing `router.afterEach` hook — which already handled `<title>` and the Analytics pageview — now also calls a new local `setMeta()` helper that writes `description`, `og:title` and `og:description` after each client-side navigation, and falls back to a shared `DEFAULT_DESCRIPTION` constant when a route has no description.
   - Root cause: Analytics was fixed for SPA navigation in an earlier session but metadata was not. A `createWebHistory` navigation never reloads the document, so whatever `index.html` shipped with (or whatever was set on the first route) stayed in `<head>` for the entire session.
   - `setMeta()` creates the tag if it is missing, so a future edit to `index.html` cannot silently break the feature.
2. **Static metadata defaults (`index.html`).** Added `description`, `og:type`, `og:site_name`, `og:title` and `og:description` immediately after the viewport tag, using the same text as the home route so the pre-JS crawler snapshot matches what the SPA renders. The Google tag remains untouched at the very top of `<head>` (single copy, unchanged).
3. **Contact form delivery (`src/components/ContactForm.vue`).** The component previously showed "Your request has been captured" after client-side validation only — no network request was ever made (the old comment even admitted this). It now:
   - POSTs `application/json` (`{ name, email, subject, message, page }`) to `import.meta.env.VITE_CONTACT_ENDPOINT`.
   - Reports success **only** after an `ok` HTTP response, and shows a `Sending…` disabled state while in flight.
   - On a missing endpoint or a failed/thrown request, logs the error and offers a `mailto:` fallback pre-filled from the form fields (link provided by a `computed`), matching the address already published on `/contact` and in the footer.
   - Adds email-format validation (the previous code only checked that the fields were non-empty) and resets the new error/submitting state in `reset()`.
   - Props, `defineExpose({ reset })` and the confirmation UI are unchanged, so `Contact.vue` and `BookADemo.vue` (the only consumers) needed no edits.
4. **Styles (`src/style.css`).** Added `.btn-primary:disabled` (busy state) and link styling inside `.form-error` for the fallback anchor, reusing the existing `--accent-gold` token.
5. **Configuration docs (`README.md`, `.gitignore`).** Documented `VITE_CONTACT_ENDPOINT` in a new README "Configuration" section (payload shape, JSON POST, Formspree example, warning that `VITE_` variables are public) and added `.env` / `.env.*` (with `!.env.example` negation) to `.gitignore`.

**Files changed:**
- `src/router/index.js` — `meta.description` for all routes, `DEFAULT_DESCRIPTION`, `setMeta()` helper, extended `afterEach`
- `index.html` — default description + Open Graph tags
- `src/components/ContactForm.vue` — real JSON submission, submitting/error/fallback states, email validation
- `src/style.css` — `.btn-primary:disabled`, `.form-error a`
- `README.md` — Configuration section
- `.gitignore` — ignore environment files
- `CHANGELOG.md` — entries under `Added`/`Changed`/`Fixed`

**Why:**
- The site is a marketing/SEO product, yet every route shared one description: search and social previews could not tell `/fuel-monitoring` from `/pricing`, and because `document.head` is never re-evaluated in an SPA, the first-visited page's metadata leaked into every other page of the session.
- The contact form was the project's most concrete violation of the "no fake implementations" rule: `/contact` and `/book-a-demo` are the two conversion pages, and both accepted leads, told the visitor they had been received, and dropped them. Making it work was the priority; the endpoint is configuration rather than hard-coded data, per the project's no-hard-coded-production-data rule, and an email fallback keeps the page usable until a backend is chosen.

**Method:**
- Traced the existing `afterEach` hook first (rather than adding a second metadata mechanism) and extended it, following the pattern already established for Analytics.
- Wrote descriptions from each view's own content and the existing FAQ/pricing copy so no capability was invented; kept them under ~160 characters.
- Reused the published contact address instead of introducing a new constant elsewhere.
- No new dependencies, and no changes to `main.js`, `vite.config.js` or `package.json`.

**Verification:**
- `npm run build` → `✓ built in 1.49s`, no errors or warnings; 128 modules transformed.
- Grepped for `ContactForm`/`formRef` consumers to confirm the shared component's props/exposed API stayed compatible.
- Confirmed `gtag.js` still appears exactly once in `index.html`.
- Out of scope but noted: the user still needs to set `VITE_CONTACT_ENDPOINT` (e.g. a Formspree form) for online delivery; until then the form shows the email fallback rather than a false success.

---

**Date:** 2026-10-04 (Session 5)

**Agent Action:** Repaired a corrupted `README.md` (UTF-16 fragment + NUL bytes made Git treat it as a binary file) and audited the repository for the same defect.

**What was done:**

1. **`README.md` no longer binary.** The file ended with 21 stray bytes: a UTF-16LE fragment (`# dekagps` plus a trailing `0A`) appended after the final newline. The NUL bytes made Git classify the whole file as binary, so every diff for it displayed as "Binary files differ" and the Markdown was hidden from normal review. The corrupted tail was removed byte-precisely at the last valid newline (index 2069); the legitimate UTF-8 content is otherwise untouched.
2. **Root cause identified.** PowerShell `>` / `>>` redirection writes UTF-16LE by default (as does `Out-File` / `Set-Content`), which is exactly the byte pattern found. The corrupt tail is the shell-encoded text `# dekagps` — a string that appears nowhere else in the repository, i.e. an accidental redirect artifact, not intentional content.
3. **Repository-wide scan.** Every tracked text file was checked for NUL bytes. The only text file affected was `README.md`; all other NUL hits are legitimate binary media (`images/**`, `references/*.pdf`, `src/assets/*`). No other file needed repair.
4. **Caution added for future agents:** do not write project text files through PowerShell redirection. Use the editor/file tools (or `Set-Content -Encoding utf8NoBOM`) so UTF-16 is never introduced into source files.

**Files changed:**
- `README.md` — removed the 21-byte UTF-16 `# dekagps` tail; file is now valid UTF-8 (2070 bytes, 0 NUL bytes)
- `agents.md` — this entry (and the redirection caution above)
- `CHANGELOG.md` — entry under `Fixed`

**Why:**
A corrupted `README.md` is the first file a contributor or reviewer opens, and Git refusing to diff it as text hides the entire project onboarding/configuration documentation from review. The corruption was already committed to `HEAD`, so it was silently present for anyone cloning the repo. Removing the stray bytes fixes the actual cause rather than masking the symptom with a `.gitattributes` `-diff`/`text` override.

**Method:**
- Compared the working tree against `HEAD` byte-for-byte and located the first NUL at offset 2071 (HEAD carried the identical corrupted tail).
- Verified the last valid byte was `0x0A` at index 2069 and the following byte `0x23` (`#`), then truncated to the first 2070 bytes so nothing legitimate was dropped.
- Re-read the file to confirm 0 NUL bytes and used `git diff --text` to confirm the only change is the removal of the corrupted tail.

**Verification:**
- `README.md` → 2070 bytes, 0 NUL bytes; reads as clean Markdown.
- `git diff --text -- README.md` shows only the two removed garbage lines and the blank line; no other lines changed.
- `npm run build` → `✓ built in 1.11s`, no errors (documentation-only change; the app bundle is unaffected).
- Tracked-text-file NUL sweep → only `README.md` matched, and it is now clean.
- Note: the corrected `README.md` sits in the working tree; committing it will also replace the corrupt blob currently in `HEAD`.

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

# Agent Guidelines & Project Instructions — OneGPS

> **READ THIS FILE COMPLETELY BEFORE MODIFYING THE PROJECT.**
>
> This project is an existing, working application. Your responsibility is to **understand, preserve, improve, and extend the existing system** — not to continuously invent replacement implementations.

---

# 1. Core Engineering Principles

## 1.1 Fix the Root Cause — Never Build Around a Bug

When something is broken, investigate and fix the actual problem.

**DO NOT:**
- Build a second implementation to bypass a broken implementation.
- Create a new component because the existing component has a bug.
- Add another API endpoint because the existing endpoint is malfunctioning.
- Create duplicate state because existing state is not behaving correctly.
- Add CSS overrides repeatedly until the visual problem disappears.
- Add condition after condition to hide an underlying defect.
- Create a new helper when an existing helper should be corrected.
- Replace working architecture just because fixing it requires investigation.

**Required approach:**

```text
Problem
   ↓
Reproduce
   ↓
Trace existing implementation
   ↓
Find root cause
   ↓
Fix root cause
   ↓
Verify affected flows
```

Do not use:

```text
Problem
   ↓
Add workaround
   ↓
Problem still exists
   ↓
Add another workaround
   ↓
Technical debt
```

If an existing implementation is fundamentally incorrect, explain why before replacing it.

---

# 2. Existing Code First

Before writing new code, determine whether the project already contains code that performs the same or a similar function.

Search for:

- components
- composables
- utilities
- services
- API clients
- layouts
- CSS classes
- variables
- router logic
- validation logic
- state management
- helper functions
- constants
- configuration
- existing patterns

The default priority is:

```text
1. Reuse existing code
2. Extend existing code
3. Refactor existing code if necessary
4. Write new code only when none of the above are appropriate
```

New code is the **last option**, not the first.

---

# 3. Do Not Duplicate Existing Functionality

Never create two implementations responsible for the same thing unless there is a documented architectural reason.

Examples:

If the project already has:

```javascript
formatDate()
```

do not create:

```javascript
convertDate()
formatMyDate()
prettyDate()
```

unless their responsibilities are genuinely different.

If there is already a reusable:

```text
Button.vue
Modal.vue
Card.vue
Navbar.vue
ApiService
```

extend or reuse it instead of creating:

```text
NewButton.vue
CustomModal2.vue
BetterCard.vue
NavbarNew.vue
ApiServiceV2
```

Avoid naming patterns such as:

```text
ComponentNew
ComponentFixed
Component2
ComponentFinal
ComponentUpdated
ComponentWorking
```

Those are usually signs that the existing architecture was not properly understood.

---

# 4. Read Before You Write

Before implementing any non-trivial change:

1. Read `agents.md`.
2. Read `CHANGELOG.md`.
3. Inspect the relevant directory.
4. Read the files directly involved.
5. Search for related functionality elsewhere in the project.
6. Identify existing architectural patterns.
7. Trace the current behavior.
8. Determine the root cause or proper extension point.
9. Decide on the smallest safe change.
10. Only then modify the project.

Do not begin coding immediately after receiving a task.

---

# 5. Smallest Correct Change

Prefer the smallest change that completely solves the problem.

Avoid unnecessary:

- rewrites
- abstractions
- dependencies
- components
- services
- directories
- configuration
- global state
- database fields
- CSS systems
- architectural layers

A task affecting one component should generally not result in changes across twenty unrelated files.

Before modifying a file, ask:

> Does this file actually need to change for the requested feature or fix?

If not, leave it alone.

---

# 6. Preserve Working Code

Working code should not be rewritten simply because another implementation appears cleaner.

Refactoring is appropriate when it:

- fixes a demonstrated problem
- removes meaningful duplication
- improves maintainability required by the task
- resolves architectural inconsistency
- prevents an identified bug
- is necessary for the requested feature

Do not perform unrelated refactors while implementing a feature.

For example:

```text
Task: Add a pricing CTA
```

does **not** justify:

```text
Rewrite Navbar
Replace router
Reorganize CSS
Rename every component
Change folder structure
Replace existing animation system
```

Stay within scope.

---

# 7. Follow Existing Architecture

The existing project architecture is the source of truth.

Do not introduce a new architectural pattern unless there is a strong technical reason.

If the project uses:

```text
src/views/
src/components/
src/router/
```

continue using them.

If similar pages use a shared component, use that component.

If API calls go through an existing service layer, do not call APIs directly from random components.

If styling is centralized, do not introduce another styling framework.

Consistency is more valuable than introducing a theoretically cleaner pattern in one isolated feature.

---

# 8. Never Mask Errors

Do not "fix" errors by suppressing them without understanding them.

Avoid:

```javascript
try {
   ...
} catch (e) {}
```

or hiding console errors simply to make the application appear functional.

Errors should either:

- be fixed
- be handled intentionally
- be logged appropriately
- result in a useful user-facing state

Never silently swallow important failures.

---

# 9. Avoid Patch-on-Patch Development

Before adding a new condition, CSS override, watcher, timeout, event listener, or workaround, determine why the current implementation requires it.

Be especially suspicious of:

```css
!important
```

nested overrides, repeated media queries, duplicated event listeners, repeated `setTimeout()` fixes, duplicated watchers, route-specific hacks, and hard-coded exceptions.

One justified exception is acceptable.

Five exceptions usually indicate that the underlying implementation needs correction.

---

# 10. Components Must Have Clear Ownership

Every component should have a clear responsibility.

Do not:

- duplicate business logic across components
- place unrelated functionality into large components
- create components for trivial markup with no reuse value
- create near-identical components for minor visual variations

When multiple screens share substantial UI or behavior, extract or extend a shared component.

When only one small piece differs, use:

- props
- slots
- configuration
- variants

instead of duplicating the entire component.

---

# 11. Prefer Existing Design Tokens and CSS

Before adding a new:

- color
- font size
- spacing rule
- border radius
- shadow
- button style
- card style

search the existing stylesheet.

Use the existing OneGPS design system wherever possible.

Do not introduce slightly different values such as:

```css
#E5AB03
#E6AD03
#E7AC04
```

when the project already defines:

```css
#E6AC03
```

Maintain visual consistency.

---

# 12. No New Dependency Without Need

Do not install a package merely to solve something that:

- Vue already supports
- JavaScript already supports
- CSS already supports
- the project already implements

Before installing a dependency:

1. Verify there is no existing equivalent.
2. Confirm native functionality is insufficient.
3. Consider bundle-size impact.
4. Consider maintenance/security implications.
5. Explain why the dependency is necessary.

Never replace an existing library simply because you personally prefer another one.

---

# 13. Do Not Break Existing Public Contracts

Be careful when changing:

- component props
- event names
- route names
- route paths
- API request formats
- API response handling
- local storage keys
- query parameters
- CSS class contracts
- environment variable names

Search for consumers before changing any shared interface.

If an existing contract must change, update all affected consumers.

---

# 14. Do Not Guess About the Codebase

Never assume that something:

- does not exist
- is unused
- works a certain way
- can safely be deleted
- is legacy
- is duplicated

without searching the project first.

Verify assumptions against the actual repository.

The repository is the source of truth.

---

# 15. Debug Before Rebuilding

When a feature does not work:

1. reproduce the issue
2. identify the responsible component
3. trace data flow
4. inspect relevant state
5. inspect events
6. inspect router behavior if applicable
7. inspect API responses if applicable
8. inspect console/runtime errors
9. identify root cause
10. modify only what is necessary

Do not respond to a bug by rebuilding the feature from scratch unless the existing implementation is demonstrably unrecoverable.

---

# 16. Respect Existing Data Flow

Do not create redundant copies of data unless necessary.

Avoid patterns such as:

```text
API data
→ copied to component state
→ copied to another object
→ watched
→ copied again
```

Prefer a clear source of truth.

For derived values, prefer computed properties when appropriate.

For shared state, follow whatever shared-state architecture already exists in the project.

---

# 17. No Hard-Coded Production Data

Do not hard-code values that should come from:

- configuration
- environment variables
- props
- APIs
- CMS/content objects
- shared constants

Examples include:

- production URLs
- API keys
- credentials
- environment-specific endpoints
- tokens
- secrets

Never commit secrets to the frontend repository.

---

# 18. Preserve Responsive Behaviour

Every frontend change must be checked conceptually against:

- mobile
- tablet
- laptop
- desktop

Do not fix desktop layout by breaking mobile layout.

Avoid arbitrary fixed widths unless required by the design.

Use the project's existing responsive breakpoints where possible.

---

# 19. Preserve Accessibility

Interactive elements should remain semantically correct.

Prefer:

```html
<button>
<a>
<input>
<label>
<nav>
```

over clickable generic elements such as:

```html
<div @click="">
```

Ensure relevant functionality remains usable with:

- keyboard navigation
- focus states
- semantic HTML
- appropriate labels
- reasonable contrast

---

# 20. Remove Dead Code Created by Your Changes

After completing the implementation:

- remove unused imports
- remove obsolete variables
- remove superseded CSS
- remove debug logs
- remove temporary comments
- remove abandoned implementations

Do not leave:

```javascript
// old code
// temporary fix
// maybe use this later
```

unless the comment provides genuine long-term engineering value.

Git provides history. The source code should represent the current implementation.

---

# 21. No Fake Implementations

Do not create functionality that visually appears complete but does not actually work unless the task explicitly asks for a prototype.

Do not add:

- fake buttons
- fake API integrations
- placeholder forms presented as operational
- nonfunctional controls
- fabricated backend responses

If backend functionality is unavailable, clearly separate the UI from the missing integration.

---

# 22. Avoid Overengineering

Do not create enterprise-level abstractions for simple requirements.

For example, a simple reusable CTA does not require:

```text
CTAFactory
CTARepository
CTAService
CTAProvider
CTAAdapter
CTAManager
```

Use straightforward Vue patterns appropriate to the scale of OneGPS.

---

# 23. Security Comes Before Convenience

Never weaken security merely to make a feature work.

Do not:

- expose secrets in frontend code
- disable validation globally
- bypass authentication
- disable authorization checks
- trust client-supplied authorization decisions
- use unsafe HTML unnecessarily
- expose internal debugging data to users

Any authentication or authorization change should preserve existing security boundaries.

---

# 24. Verify Before Declaring Success

Do not claim a feature is fixed merely because code was changed.

After changing the project:

1. review the modified code
2. check imports
3. check syntax
4. check affected routes
5. check related components
6. run available lint/build/test commands
7. inspect errors
8. resolve errors introduced by the change

At minimum, run the project's available production build when feasible.

For Vite projects this will commonly include:

```bash
npm run build
```

Do not ignore build errors.

---

# 25. Do Not Change Unrelated Files

Avoid formatter-driven or automated changes that modify large amounts of unrelated code.

A Git diff should make it easy to understand:

> "These lines changed because of this task."

Large unrelated diffs make debugging and review difficult.

---

# 26. Preserve User-Facing Behaviour Unless Requested

Bug fixes should generally preserve existing:

- layout
- copy
- interaction behavior
- URLs
- navigation patterns

unless changing them is explicitly part of the task.

Do not use a bug report as an opportunity to redesign the product.

---

# 27. Existing Functionality Takes Priority Over New Features

A new feature must not knowingly break an existing one.

When there is tension between the new feature and established behavior, modify the implementation so both work where reasonably possible.

Do not simply remove old functionality to make new functionality easier to implement.

---

# 28. Refactor Before Duplicating

If existing code is almost reusable but not quite, consider safely generalizing it.

Example:

Instead of:

```text
VehicleFeatureCard.vue
MotorbikeFeatureCard.vue
TruckFeatureCard.vue
```

consider:

```text
FeatureCard.vue
```

with appropriate props or slots.

However, do not over-generalize unrelated concepts simply to reduce file count.

---

# 29. Maintain Naming Consistency

Study existing naming conventions before introducing:

- files
- functions
- props
- events
- CSS classes
- route names
- constants

Do not mix naming styles arbitrarily.

If the repository uses:

```text
FleetManagement.vue
VehicleTracking.vue
FuelMonitoring.vue
```

follow the same convention.

---

# 30. Comments Explain Why, Not What

Avoid comments such as:

```javascript
// increment count
count++
```

Useful comments explain architectural reasoning:

```javascript
// SPA navigation does not trigger a full page load,
// so Analytics pageviews must be sent after route changes.
```

Prefer readable code over excessive comments.

---

# 31. No Premature "Cleanup"

Do not delete unfamiliar files merely because they appear unused.

Before deletion:

- search imports
- search route references
- search dynamic usage
- inspect build/config references

Some assets and files may be referenced dynamically.

---

# 32. Protect Project Configuration

Take extra care when modifying:

```text
package.json
vite.config.*
src/main.js
src/router/index.js
.env*
index.html
```

These files have application-wide effects.

Do not modify them unnecessarily for a local component problem.

---

# 33. Task Scope Discipline

For every task determine:

```text
Requested change
↓
Files directly responsible
↓
Dependencies affected
↓
Minimum implementation
```

Do not turn small tasks into broad architecture projects unless the existing architecture makes the requested change impossible or unsafe.

---

# 34. Stop and Reassess When Complexity Explodes

If a seemingly simple task starts requiring:

- many new files
- multiple workarounds
- duplicated logic
- global configuration changes
- extensive CSS overrides

stop implementation and reassess the root cause.

Unexpected complexity is often evidence that the wrong extension point is being used.

---

# 35. Change Priority

When deciding how to implement something, use this order:

```text
Correctness
↓
Security
↓
Preservation of existing behavior
↓
Consistency with current architecture
↓
Maintainability
↓
Performance
↓
Developer convenience
```

---

# 36. Required Agent Workflow

For any significant task follow:

## Step 1 — Understand

Read:

```text
agents.md
CHANGELOG.md
relevant source files
related components
related styles
related routes
```

## Step 2 — Investigate

Determine:

```text
How does it currently work?
Where does the behavior originate?
Is similar functionality already implemented?
Is this a bug or a missing feature?
What is the root cause?
```

## Step 3 — Plan

Identify:

- files that genuinely need modification
- existing functionality to reuse
- risks
- expected behavior

## Step 4 — Implement

Make the smallest correct change.

## Step 5 — Verify

Check:

- requested functionality
- existing related functionality
- responsive behavior
- runtime errors
- build errors

## Step 6 — Clean

Remove:

- temporary code
- console logs
- obsolete imports
- superseded code

## Step 7 — Document

Update:

```text
agents.md
CHANGELOG.md
```

for significant changes.

---

# Critical Requirement: Google Tag (`gtag.js`)

Whenever creating any **new HTML page, HTML entrypoint, or HTML template**, you MUST copy the Google tag immediately after the opening `<head>` element.

## Rules

1. **Placement:** Immediately after `<head>`, before other head elements.
2. **No duplicates:** Never add more than one Google tag to an HTML document.
3. **Vue SPA views do not require independent copies of the script.** SPA route navigation is handled by the existing router Analytics implementation.
4. Before inserting the tag, verify that it is not already present.

## Exact Google Tag

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-F5BVYX6K72"></script>
<script>
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', 'G-F5BVYX6K72');
</script>
```

---

# Project Overview & Tech Stack

- **Project:** OneGPS
- **Product:** Modern premium GPS tracking and telematics solutions
- **Framework:** Vue 3
- **Build Tool:** Vite
- **Routing:** Vue Router
- **Styling:** Vanilla CSS
- **Visual Direction:** Premium dark interface, navy backgrounds, gold accents and restrained glassmorphism
- **Primary HTML Entry:** `index.html`

---

# Vue Project Structure

Follow the established structure.

```text
src/
├── components/
├── views/
├── router/
│   └── index.js
├── main.js
└── style.css
```

## Views

Full pages belong under:

```text
src/views/
```

## Components

Reusable UI belongs under:

```text
src/components/
```

Do not put full pages inside the component directory.

Do not create a component for every trivial piece of markup.

## Routing

Any navigable Vue view must be registered appropriately in:

```text
src/router/index.js
```

Before creating a route:

1. check that it does not already exist
2. follow existing route naming conventions
3. preserve existing URLs unless a URL change is requested

---

# OneGPS Design Standards

Maintain the established premium OneGPS visual identity.

Primary characteristics:

- dark navy backgrounds
- gold accents
- clean typography
- generous spacing
- restrained gradients
- subtle glass effects
- responsive layouts
- professional telematics imagery
- polished enterprise appearance

Avoid excessive:

- glow effects
- animations
- gradients
- blur
- oversized typography
- decorative elements

Premium design should feel deliberate rather than visually noisy.

---

# Existing Animation System

The application already contains the global:

```text
v-reveal
```

directive.

Before introducing another animation library or implementation, determine whether `v-reveal` can satisfy the requirement.

Do not create competing scroll-animation systems without a documented reason.

---

# Analytics Architecture

OneGPS is a Vue SPA.

The Google Analytics base tag is located in:

```text
index.html
```

Route changes are tracked through the existing:

```javascript
router.afterEach(...)
```

implementation in:

```text
src/router/index.js
```

Do not create another router Analytics implementation unless replacing the existing one intentionally.

Do not insert repeated Google Analytics scripts into Vue components.

---

# Content Standards

OneGPS should communicate as a professional telematics platform.

Where relevant, use accurate industry terminology such as:

- GNSS/GPS tracking
- fleet telematics
- geofencing
- CAN bus
- OBD-II
- fuel monitoring
- capacitive fuel sensors
- driver behavior
- immobilization
- IoT devices
- telemetry
- API integration
- real-time tracking
- overspeed monitoring

Do not invent product capabilities.

Existing or requested capabilities should guide product copy.

---

# Agent Changelog & Documentation Requirement

## CRITICAL RULE FOR ALL AGENTS

After completing a **significant**:

- feature
- bug fix
- integration
- architectural change
- refactor
- configuration change

document the work.

Update:

```text
agents.md
```

and:

```text
CHANGELOG.md
```

Do not create entries for extremely trivial changes that add no useful historical context.

---

# CHANGELOG.md Requirements

Follow the existing Keep a Changelog structure.

Add entries under:

```text
[Unreleased]

Added
Changed
Fixed
Removed
Security
```

Use the category appropriate to the change.

Keep entries concise and user/developer meaningful.

---

# agents.md Change Log Format

Use:

```markdown
**Date:** YYYY-MM-DD

**Agent Action:** Short description

**What was done:**
- Change 1
- Change 2

**Files changed:**
- path/to/file
- path/to/file

**Why:**
Explanation of why the change was necessary.

**Method:**
Technical explanation of how it was implemented.

**Verification:**
- Build/test performed
- Relevant behavior checked
```

---

# Existing Project History

## Date: 2026-10-04

### Agent Action
Vue 3 SPA finalization, UI refinement and content overhaul.

### Changes

#### Analytics Routing Fix

Google Analytics is loaded from `index.html`.

Because Vue Router performs client-side navigation without full HTML reloads, `src/router/index.js` contains a `router.afterEach` hook that sends Analytics pageview events after navigation.

Do not duplicate this functionality.

#### UI & Aesthetics

Introduced a global Vue:

```text
v-reveal
```

directive in:

```text
src/main.js
```

and corresponding reveal styles in:

```text
src/style.css
```

Enhanced:

```text
feature-card
solution-card
btn-primary
```

with the established OneGPS premium visual style.

#### Content

Professionalized copy in:

```text
Home.vue
Solutions.vue
Industries.vue
```

including relevant telematics terminology.

#### HTML Cleanup

Corrected duplicate nested:

```text
.feature-card
.benefit-card
```

elements in:

```text
Home.vue
FleetManagement.vue
```

---

# Date: 2026-10-04 — Session 2

## Favicon Update

Replaced the generic Vite favicon with a custom OneGPS favicon.

Brand colors:

```text
Navy: #00172D
Gold: #E6AC03
```

Updated:

```text
public/favicon.svg
index.html
```

Additional browser metadata was added for Safari, Chrome/Android and Windows integration.

Do not replace these values with arbitrary alternatives without a branding requirement.

---

# CHANGELOG.md Creation

A project-level:

```text
CHANGELOG.md
```

was introduced using the Keep a Changelog convention.

Future significant changes must continue using this file.

---

# Final Standing Rules

Every future agent working on OneGPS must follow these rules:

1. Read `agents.md` before modifying the project.
2. Read `CHANGELOG.md` before significant work.
3. Understand existing functionality before coding.
4. Search the repository before creating anything new.
5. Fix root causes rather than layering workarounds over problems.
6. Reuse existing code whenever possible.
7. Extend existing code before creating parallel implementations.
8. Never duplicate functionality without a documented reason.
9. Follow existing architecture and conventions.
10. Make the smallest correct change.
11. Do not rewrite working code unnecessarily.
12. Do not perform unrelated refactors.
13. Do not introduce dependencies unnecessarily.
14. Do not suppress errors merely to hide them.
15. Do not create duplicate state or competing sources of truth.
16. Preserve existing public interfaces where possible.
17. Never expose secrets in frontend code.
18. Preserve responsive behavior.
19. Preserve accessibility.
20. Avoid patch-on-patch CSS and JavaScript.
21. Remove temporary and obsolete code after implementation.
22. Do not create fake or nonfunctional production features.
23. Do not guess about the repository — inspect it.
24. Do not delete unfamiliar code without checking its usage.
25. Do not modify global configuration for local problems unless necessary.
26. Test or build the project after significant modifications.
27. Never claim success when verification fails.
28. Document significant changes in `agents.md`.
29. Document significant changes in `CHANGELOG.md`.
30. Never add duplicate `gtag.js` implementations.
31. Preserve the existing OneGPS visual language.
32. Prefer maintainability and consistency over cleverness.
33. When implementation complexity unexpectedly grows, stop and investigate why.
34. A bug should normally result in a **fix**, not a second implementation.
35. Existing code is the starting point. **Build on it; do not build around it.**

---

# Golden Rule

> **Understand first. Reuse second. Modify third. Create new code only when necessary.**

And when something is broken:

> **Do not build a new solution on top of the problem. Find the cause and fix the problem at its source.**
