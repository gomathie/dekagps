# OneGPS Website

Modern, high-performance website for OneGPS telematics, vehicle tracking, and IoT solutions.

## Tech Stack
- **Framework**: [Vue 3](https://vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **Styling**: Vanilla CSS (glassmorphism & dark aesthetic)

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

| Variable | Purpose |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | URL that receives contact and demo requests from `src/components/ContactForm.vue`. |

Create a local `.env` (or `.env.local`) file in the project root:

```bash
# Any backend that accepts a JSON POST works, e.g. a Formspree form
VITE_CONTACT_ENDPOINT=https://formspree.io/f/<your-form-id>
```

The form POSTs `application/json` with the payload `{ name, email, subject, message, page }`.
Vite only exposes `VITE_`-prefixed variables to the browser bundle, so this file must never
contain secrets. When `VITE_CONTACT_ENDPOINT` is empty or the request fails, the form offers a
pre-filled `mailto:` fallback to `info@onegps.africa` rather than reporting a false success.

## User Guide (`/docs`)

The product documentation is part of the site: `/docs`, `/docs/7.10` and
`/docs/7.10/:slug`. Version 7.10 is the only published guide, with 682 pages,
693 local article references, search, a navigation tree, previous/next paging and printing.
Older guide URLs redirect to an available 7.10 page or its overview.

All of it is generated and committed:

| Path | Contents |
| --- | --- |
| `tools/import-docs.mjs` | Importer: crawls the reference documentation, converts pages to structured blocks, rewrites internal links, white-labels the copy, mirrors and re-encodes images. |
| `src/docs/**` | Generated content: `versions.js`, `pages.js`, `content/<version>/chunk-*.js`, `nav/`, `search/`. Never edit by hand. |
| `src/docs/registry.js` | Hand-written runtime loader used by the docs view. |
| `public/docs-assets/images/**` | Referenced screenshots (3 082 files, ~72.5 MB). |
| `tools/check-docs.mjs` | Verification: all page references and images, data consistency, SSR rendering and white-label rules. |

```bash
# Re-import the guide (reference host must be reachable; HTML is cached, ~45 s on a repeat run)
npm run import:docs

# Verify the imported guide (navigation/map/index consistency, rendering, images, links)
npm run check:docs
```

Reference HTML is cached under `node_modules/.cache/docs-import` (not committed); the generated
output is committed, so an import is only needed when the source documentation changes.
See [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md) for the content model, the white-label rule
set and known limitations (raster screenshots still show the original product UI).

## Analytics & Tracking (Google Tag)

Every HTML page and template in this project must include the official Google Tag (`gtag.js` - ID: `G-F5BVYX6K72`) placed immediately after the opening `<head>` tag.

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

> **Note**: Do not add more than one Google tag to any page. For agent instructions, refer to [`agents.md`](file:///c:/Users/gomat/Downloads/DEV%20PROJECTS/onegps/agents.md) and [`agent-instructions.md`](file:///c:/Users/gomat/Downloads/DEV%20PROJECTS/onegps/agent-instructions.md).
