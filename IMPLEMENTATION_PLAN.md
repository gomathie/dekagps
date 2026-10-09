# Docs White-Label Implementation Plan

## Objective

Add a fully white-labeled Docs section to the existing website, using the upstream Dr.Explain export as the private import source.

The Docs section is a normal part of the existing Vue 3 SPA: same header, main navigation, footer, typography, colours and responsive behaviour. No iframe, no redirect, no runtime dependency on the reference site.

## Status

**Implemented and verified** — 7.10 is the only published guide: 574 pages, 23 content chunks, 13 sections and 688 local article references. The legacy API branch is now a separate structured portal with 74 v2 and 96 v3 endpoints. Archive guides and duplicate API prose pages have been removed. Docs checks, API checks, the production build and desktop/mobile Chrome navigation checks pass.

## Steps

- [x] 1. Inspect existing website architecture
- [x] 2. Inspect reference documentation
- [x] 3. Map documentation structure
- [x] 4. Collect/recreate documentation content — 7.10 only, 574 guide pages
- [x] 5. Collect/recreate documentation assets — 3 082 referenced images retained
- [x] 6. Design documentation content architecture
- [x] 7. Implement Docs page (`/docs`, `/docs/:version`, `/docs/:version/:slug`)
- [x] 8. Add Docs to main navigation (navbar *Resources* dropdown + footer *Company* column)
- [x] 9. Implement documentation navigation (574-entry tree, collapsible, filterable)
- [x] 10. Implement documentation search (per-version index, ranked, keyboard navigable)
- [x] 11. Publish 7.10 only; replace the version selector with a version label
- [x] 12. Implement previous/next navigation (reading order of the navigation tree)
- [x] 13. White-label branding (text, titles, slugs, file names, source-vendor hosts and outbound docs links; D3)
- [x] 14. Preserve all 688 guide references, including linked headings, bullet lists and section jumps
- [x] 15. Implement responsive behavior (sidebar becomes a drawer under 992 px)
- [x] 16. Accessibility review (landmarks, labels, roles, focus, keyboard, alt text)
- [x] 17. Performance review (per-version, per-chunk lazy loading; D5, D6)
- [x] 18. Test all documentation pages and article targets; SSR-render nine representative pages
- [x] 19. Check desktop and mobile in Chrome: layout, images, sidebar, section jumps and archive URL redirects
- [x] 20. Final QA (build, SSR render, image and link checks)
- [x] 21. Finalize implementation
- [x] 22. Import the structured v2/v3 API portal and separate it from the User Guide

## Completed Work

### Step 1 — Existing architecture inspected

- Vue 3 + Vite SPA, Vue Router (`src/router/index.js`), vanilla CSS (`src/style.css`).
- Single HTML entry `index.html`; the Google tag lives there once and Analytics pageviews come from the existing `router.afterEach` hook, so docs routes inherit tracking with no extra snippet.
- `src/components/Navbar.vue` and `src/components/Footer.vue` are rendered once in `src/App.vue`, so every route automatically gets the site chrome.
- No markdown/MDX pipeline, no CMS, no existing search. Design tokens already exist (`--bg-primary`, `--accent-gold`, `--text-secondary`, `--glass-bg`, `--radius-md`, …) together with reusable classes (`container`, `btn-primary`, `section-pad`, `breadcrumbs`, `form-control`).
- Decision: **no new dependency**. Content is generated as plain ES modules and rendered by small purpose-built components; `import.meta.glob` provides lazy loading and code splitting.

### Step 2 — Reference documentation inspected

- The reference is a **Dr.Explain** static export (`de_style.css`, `js/drexplain.data.index.js`).
- The 7.10 guide is at the source site root; `contents.html` is the table of contents and also the print entry point. Archive guides are excluded from import.
- Page bodies live in `<div id="hiddenContent"><article><div class="description_on_page">`; the shell (menu, search, breadcrumbs, print button) is generated at runtime by the reference's own JS.
- Body constructs: `h1`–`h4`, `div.p` paragraphs, Dr.Explain lists (`ul.de_list` with `list-marker` divs), `<table>` (often used for layout), screenshots (`img.de_custom_img` / `de_wndimg` / `de_ctrlimg`), internal links (`a.local_link` → `page.html#anchor`), anchors (`a.anchor[id]`), inline bold/code.

### Step 3 — Structure mapped

- Hierarchy comes from `contents.html`: each entry is an `<a>` with `padding-left: Npt`, so depth = `Npt / 20`.
- Page identity = source file name (`logging_in_1.html` → `logging-in-1`), which makes internal link rewriting deterministic.
- Previous/next order = document order of the navigation tree.
- The importer supports only 7.10 and excludes the historical release-note branch. The 7.10 release summary is retained.

### Step 4 — Content imported

`tools/import-docs.mjs` crawls the upstream export once (HTML cached under `node_modules/.cache/docs-import`), converts each page into a structured block tree, resolves internal links against the other pages of the same version and writes the generated modules. Result:

| Version | Pages | Chunk files |
| --- | --- | --- |
| 7.10 | **574** | **23** |

### Step 5 — Assets imported

| Metric | Value |
| --- | --- |
| Referenced images retained | 3 082 |
| On disk | 72.5 MB |
| Unresolved references | 0 |
| Unreferenced images removed | 1 593 |

### Steps 7–17 — Implementation

```
tools/import-docs.mjs                  importer (crawl → convert → write)
                                       --fresh, --no-images, --only, --versions, --rename-assets
tools/resize-images.ps1                image downscale/re-encode helper (Windows PowerShell + System.Drawing)
tools/check-docs.mjs                   verification: data consistency + SSR render pass
tools/docs-recon.ps1                   single-page markup inspector used while writing the importer
src/docs/
  versions.js                          generated: version metadata (id, label, note, pageCount)
  pages.js                             generated: { version: { slug: chunkIndex } }
  content/<version>/chunk-<n>.js       generated: 25 pages of structured blocks per file
  nav/<version>.js                     generated: navigation tree (slug, title, children)
  search/<version>.js                  generated: per-version search index
  registry.js                          runtime loader (import.meta.glob), nav flattening, link helpers
src/components/docs/
  DocsSidebar.vue                      nav tree (active page, expand/collapse, filter, mobile drawer)
  DocsSearch.vue                       search field + ranked results (keyboard navigable, `/` shortcut)
  DocsArticle.vue                      breadcrumbs, on-page headings, blocks, pager, print
  DocsBlocks.vue                       recursive block renderer (headings, paragraphs, lists, tables, images, quotes, code, rules)
  DocsInline.vue                       recursive inline renderer (text, bold, italic, code, sup/sub, links, inline images)
src/views/Docs.vue                     route shell (version label, sidebar, search, overview)
public/docs-assets/images/             mirrored documentation images
```

## Decisions

### D1 — Assets are mirrored, downscaled and re-encoded

Screenshots are mirrored, downscaled to a maximum width of 900 px and re-encoded as JPEG (quality 72). `tools/resize-images.ps1` uses Windows PowerShell and `System.Drawing`, called in batches by the importer. Only the 3 082 files referenced by the retained 7.10 content are published; unreferenced archive assets were removed.

Consequences to keep in mind:

- `public/docs-assets` adds 72.5 MB to the repository and each deployment; copying it into `dist` accounts for most build time.
- Image optimisation is Windows-only. On other platforms the importer warns and stores the untouched original, or `--no-images` skips image work entirely.

### D2 — Hotspots, embeds and the tab widget

- Dr.Explain image maps (`<map>/<area>` hotspots) are dropped; the screenshot itself is kept, because the labelled detail table next to it already carries the text.
- The reference's tab widget is **not** converted. Measured across all four versions: 0 `tabs`, 0 `blockquote`, 0 `pre` and 0 `iframe` blocks, so no support was added for them. A future version that ships a tab widget would need a `tabs` branch in the converter and in `DocsBlocks.vue`; that is the one construct that would not appear until then.
- `img.de_ctrlimg` icons are not mirrored: they are UI-sprite fragments inside tables with no meaning outside their original layout.

### D3 — White-label replacement and outbound-link policy

Two passes, applied in this order:

1. **Word pass** — `PILOT GPS Africa`, `PILOT GPS`, `PILOT`, `Pilot`, `pilot` → `OneGPS`. This renames visible copy, page titles, navigation entries and breadcrumbs.
2. **Token pass** — the same word rules plus `_pilot_` → `_OneGPS_`, used for file names, slugs and image names (there is no `\b` word boundary between `_` and a letter, so `what_s_new_in_pilot_7_10` needs its own rule). Slugs are then normalised to lower-case kebab-case.

URL-like tokens are still protected from the generic word pass, because applying word replacement inside a host name creates broken strings. After masking, the importer applies an explicit white-label URL/identifier table:

- source-vendor apex hosts become OneGPS hosts;
- source-vendor technical subdomains become neutral placeholders such as `<server_address>` or OneGPS service names;
- source-vendor package IDs, bot handles, Swagger hosts and extension identifiers are replaced with OneGPS or generic equivalents;
- external HTTP(S) anchors are unwrapped so the text remains but the page does not link visitors away from the OneGPS guide;
- source documentation links are rewritten to internal SPA docs routes when they target an imported page;
- links around headings, paragraphs made entirely of links, and links next to bullet markers remain clickable;
- source section IDs are associated with generated headings before paragraph regrouping, so section links reach the intended heading;
- the stale Round Trips report reference is mapped to the existing timetable-adherence report page.

`tools/check-docs.mjs` now enforces this rule by failing when generated docs contain outbound HTTP(S) `href` fields or source-vendor host references. The latest audit reports `0` outbound HTTP links and `0` source-vendor host references in `src/docs/**`.

Screenshots still show the original product UI, including its logo and name. They are genuine product screenshots and cannot be re-rendered; that is the boundary of a text-level white-label.

### D4 — Content model: structured blocks, chunked per version (no new dependency)

Every page becomes `{ title, toc, blocks }` where `blocks` is a recursive tree (`h`, `p`, `list`, `table`, `img`, `quote`, `code`, `hr`). 25 pages per chunk, one chunk set per version. Rationale:

- 574 single-page modules would bloat the Vite module graph; 23 chunks keep the build fast while staying easy to inspect.
- Chunks, navigation and the 7.10 search index are loaded on demand.
- A markdown/MDX pipeline plus a sanitising renderer would have been a new dependency and an XSS surface for content we do not control; rendering a typed block tree with `v-for`/`v-if` is safer and smaller.

### D5 — Search

Per-version index (`slug`, `title`, headings, body text), loaded lazily on the first search. Scoring is title-prefix > title > heading > body; results show the surrounding text; the input is a `combobox` with arrow-key/Enter/Escape handling. The index is the biggest single file (1.2–1.4 MB raw, ~360 KB gzip) and Vite warns about that chunk size — expected, and paid once per version on first search. The alternative (server-side search) would add a backend this project does not have.

### D6 — Assets are published from `public/`

Mirrored images live in `public/docs-assets/images/` and are referenced by absolute URL (`/docs-assets/images/<file>.jpg`). Dev and production therefore behave identically (no hashed URLs, no build-time asset graph), at the cost of the copy into `dist` noted in D1.

### D7 — Routing and metadata

```
/docs                 → version overview (defaults to the current version)
/docs/:version        → version overview
/docs/:version/:slug  → one guide page
```

The guide routes (`/docs`, `/docs/:version`, `/docs/:version/:slug`) use one view, while the structured API portal has `/docs/api`, `/docs/api/v2` and `/docs/api/v3`. API routes use a standalone reference layout with its own responsive sidebar, version switcher, endpoint search and code examples, while linking back to the OneGPS site and User Guide.

### D8 — Removed-version URLs resolve to 7.10

Only 7.10 is available, so the selector and archive overview cards were removed. Visiting an unsupported version URL redirects to the same slug in 7.10 when it exists, or to the 7.10 overview otherwise. The importer rejects requests for removed versions and rebuilds the page map without their entries.

### D9 — Print

The reference ships separate print pages. Instead, `@media print` rules in `src/style.css` make the guide print as clean black-on-white pages (chrome, sidebar, pager and hero hidden; headings, figures and table rows kept off page boundaries).

## Verification

Commands (both pass):

```bash
npm run build       # production build; existing search-index size warning
npm run check:docs  # 574 pages, 688 article links, 9 pages SSR-rendered
npm run check:api   # 74 v2 + 96 v3 endpoints and OneGPS-only address checks
```

`tools/check-docs.mjs` asserts that:

- navigation, page map and search index describe exactly the same page set in every version;
- the page count announced in `versions.js` matches the navigation;
- sampled pages render a title, their headings and no `undefined` markup;
- every image referenced anywhere in the guide exists on disk;
- every article reference resolves to an available page and, when present, a real heading ID;
- every heading anchor in the on-page navigation has a real target;
- the sidebar renders entries and its filter returns matches;
- generated docs contain no outbound HTTP(S) `href` fields and no source-vendor host references;
- metadata, content, navigation and search files contain only the supported 7.10 guide;
- representative linked headings, bullet references and the corrected timetable report reference render as clickable links.

Additional checks performed:

- sampled complex pages render with recursive blocks, tables and images intact;
- self-referencing components resolve (`resolveComponent("DocsBlocks", true)` is resolved through the explicit `name` in each SFC);
- no retained page or search entry is left without its module;
- cached imports made `0` network requests;
- comparing the retained cached source pages with generated content found 688 source cross-references and 688 generated local links;
- API portal checks covered 74 v2 endpoints, 96 v3 endpoints, category search, code tabs, copy controls and responsive navigation;
- Chrome checks at 1440 × 1000 and 390 × 844 covered overview layout, loaded screenshots, mobile sidebar navigation, section jumps, linked release headings and removed-version redirects.

## Follow-ups (not defects)

1. **Remaining browser coverage** — exhaustive keyboard focus order and print output have not been tested in a browser.
2. **Screenshots** show the reference product UI and brand.
3. **Repository size** — 72.5 MB of retained screenshots. `IMAGE_MAX_WIDTH` / `IMAGE_JPEG_QUALITY` control future image imports.
4. **Re-import prerequisites** — the upstream export must be reachable; the cached HTML under `node_modules/.cache/docs-import` is not committed. The generated output *is* committed, so an import is only needed when the source content changes. Image optimisation additionally requires Windows PowerShell (D1).
5. **Recon leftovers** — `docs_contents.html`, `docs_home.html` and `drex_index.js` in the repository root are saved reference pages from Step 3. Nothing references them; they can be deleted.
