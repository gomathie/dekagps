# Docs White-Label Implementation Plan

## Objective

Add a fully white-labeled Docs page to the existing website using https://docs.pilot-gps.africa/ as the reference and content source.

The Docs page is a normal page inside the existing Vue 3 SPA: same header, main navigation, footer, typography, colors and responsive behaviour. No iframe, no redirect, no runtime dependency on the reference site.

## Status

In Progress

## Steps

- [x] 1. Inspect existing website architecture
- [x] 2. Inspect reference documentation
- [x] 3. Map documentation structure
- [ ] 4. Collect/recreate documentation content
- [ ] 5. Collect/recreate documentation assets
- [x] 6. Design documentation content architecture
- [ ] 7. Implement Docs page
- [ ] 8. Add Docs to main navigation
- [ ] 9. Implement documentation navigation
- [ ] 10. Implement documentation search
- [ ] 11. Implement version navigation
- [ ] 12. Implement previous/next navigation
- [ ] 13. White-label branding
- [ ] 14. Fix internal documentation links
- [ ] 15. Implement responsive behavior
- [ ] 16. Accessibility review
- [ ] 17. Performance review
- [ ] 18. Test all documentation pages
- [ ] 19. Test mobile/tablet/desktop
- [ ] 20. Final QA
- [ ] 21. Finalize implementation

## Completed Work

### Step 1 — Existing architecture inspected

- Application is a **Vue 3 + Vite** SPA with **Vue Router** (`src/router/index.js`) and **vanilla CSS** (`src/style.css`).
- Single HTML entry `index.html`; the Google tag lives there and Analytics pageviews are dispatched from the existing `router.afterEach` hook. Docs routes inherit this — no extra tag needed.
- Header/navigation: `src/components/Navbar.vue`. Footer: `src/components/Footer.vue`. Both are rendered once in `src/App.vue`, so any route automatically gets the site header/footer.
- No markdown/MDX pipeline, no CMS, no existing search system, no external UI dependency beyond Font Awesome.
- Design tokens already exist in `src/style.css` (`--bg-primary`, `--bg-secondary`, `--accent-gold`, `--text-primary`, `--glass-border`, …) plus reusable classes (`container`, `btn-primary`, `section-pad`, `tab-btn`, `form-control`, `breadcrumbs`, …).
- Decision: **no new dependency**. Documentation content is generated as plain ES modules and rendered by small, purpose-built Vue components; `import.meta.glob` provides lazy loading and code splitting.

### Step 2 — Reference documentation inspected

- The reference is a **Dr.Explain** static export (`de_style.css`, `js/drexplain.data.index.js`).
- Structure:
  - `/` — home page listing the current guide version and previous versions.
  - `/contents.html` — the full table of contents (also the print entry point).
  - Current guide pages live at the site root (e.g. `/concepts.html`).
  - Previous guides live under version folders: `/7.9/`, `/7.8/`, `/7.7/` (each with its own `contents.html` and `images/`).
- Page bodies are rendered inside `<div id="hiddenContent"> <article> <div class="description_on_page">`; the visible shell (menu / search / breadcrumbs / print button) around it is generated at runtime from `js/drexplain.data.index.js`.
- Page body constructs found: `h1`–`h4`, paragraphs wrapped in `div.p`, Dr.Explain lists (`ul.de_list` with `list-marker` divs), hand-typed `•` bullet paragraphs, `<table>`, screenshots (`img.de_custom_img` / `img.de_wndimg` / `img.de_ctrlimg` with `data-full-src` and image maps), internal links (`a.local_link` → `page.html#anchor`), anchors (`a.anchor[id]`), inline bold/code.
- Shell features to reproduce in the SPA: version switcher, menu tree, search, previous/next, print.
- **Corpus size (measured):**

  | Version | Pages | Notes |
  | --- | --- | --- |
  | 7.10 (current) | 688 | live at site root |
  | 7.9 | 632 | `/7.9/` |
  | 7.8 | 559 | `/7.8/` |
  | 7.7 | 539 | `/7.7/` |
  | **Total** | **2418** | |

- Measured average page HTML ≈ 36 KB; ≈ 6.2 image references per page (≈ 15 000 references corpus-wide), average image ≈ 134 KB (≈ 2 GB if mirrored as-is). Measured reference throughput ≈ 90–250 KB/s.

### Step 3 — Documentation structure mapped

- Navigation hierarchy comes from the reference `contents.html`: each entry is an `<a>` with `padding-left: Npt`, so depth = `Npt / 20` (levels 0–5 observed).
- Page identity = source file name (`logging_in_1.html` → `logging-in-1`), so internal links can be rewritten deterministically.
- Previous/next order = document order of the navigation tree.
- Versions are independent: each version has its own page set, nav tree and image folder.

### Step 6 — Content architecture designed

```
tools/import-docs.mjs                 one-off/repeatable importer (crawl → convert → write)
tools/docs-recon.ps1                  single-page markup inspector used while writing the importer
src/docs/
  versions.js                         generated: version metadata (id, label, path, page count)
  pages.js                            generated: { version: { slug: chunkIndex } }
  content/<version>/chunk-<n>.js      generated: 25 pages of structured blocks per file
  nav/<version>.js                    generated: navigation tree (slug, title, children)
  search/<version>.js                 generated: per-version full-text search index
  registry.js                         runtime loader (import.meta.glob) + prev/next helpers
src/components/docs/
  DocsSidebar.vue                     nav tree (active page, expand/collapse, mobile friendly)
  DocsSearch.vue                      accessible search field + results (keyboard navigable)
  DocsArticle.vue                     article renderer (blocks) + on-page heading list
  Blocks.vue                          recursive block renderer (headings, lists, tables, images, tabs)
  Inline.vue                          inline renderer (bold, code, links, inline images)
src/views/Docs.vue                    the /docs route shell (versions, sidebar, search, prev/next, print)
public/docs-assets/images/…           mirrored documentation images
```

Rationale for chunking rather than one file per page: 2 418 individual modules would slow the Vite build down substantially; 25-page chunks keep each editable file small while keeping the module count (≈ 100) build-friendly. Pages are still loaded lazily, per chunk.

## Issues / Decisions

### D1 — Images are mirrored with a size budget (documented limitation)

The reference stores ≈ 15 000 screenshots totalling ≈ 2 GB. Measured reference throughput is 90–250 KB/s, i.e. a full mirror would need hours of transfer and would add ≈ 2 GB to the repository and to every deployment.

Decision:

1. Mirror the **current version (7.10)** images fully, downscaled to a maximum width of 900 px and re-encoded as JPEG (quality 72) — screenshots stay legible at ≈ 20–30 KB each instead of ≈ 134 KB.
2. For the **archive versions (7.9, 7.8, 7.7)**, reuse an already-mirrored image when the source file name is the same, and otherwise omit the image block.
3. Never hotlink: an image that is not mirrored is dropped at import time, so no page ever renders a broken or remote image.

This keeps the archived guides complete in text and structure while keeping the repository and deployment size sane. It is the one deliberate deviation from "mirror everything" and the only place where the white-label copy is a subset of the reference.

### D2 — Hotspots, image maps and embedded media

Dr.Explain image maps (`<map>/<area>` hotspots over screenshots) are dropped; the screenshot itself is kept. `oembed`/iframe embeds, if any are found during the import, are rendered as a labelled external link instead of an embedded third-party frame (no third-party runtime requests).

### D3 — Brand replacement

Text and attributes are rewritten with an explicit rule set (`PILOT GPS Africa`, `PILOT`, `Pilot`, `pilot-gps.africa` → OneGPS / onegps.africa), including file/page slugs (`what_s_new_in_pilot_7_10` → `what-s-new-in-onegps-7-10`). Screenshots of the product UI still show the original product name — they are product screenshots, not branding elements, and cannot be re-rendered.

## Final Verification

- [ ] Docs appears in main navigation
- [ ] All documentation content is available
- [ ] Branding is white-labeled
- [ ] Search works
- [ ] Documentation navigation works
- [ ] Version navigation works
- [ ] Previous/next navigation works
- [ ] Internal links work
- [ ] Images/assets work
- [ ] Mobile layout works
- [ ] Desktop layout works
- [ ] Accessibility checked
- [ ] No console errors
- [ ] No broken links
- [ ] Existing website functionality unaffected
