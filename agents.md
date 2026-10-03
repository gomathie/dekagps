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
