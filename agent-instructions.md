# Agent Instructions

## Current Context
- Project: OneGPS (Modern, premium GPS tracking company website)
- Tech Stack: Transitioning from Vite + Vanilla JS/CSS to **Vite + Vue.js 3**

## Tasks & Goals
1. Convert the existing static HTML/CSS structure into a Vue.js 3 application.
2. Break down the UI into logical Vue components (e.g., `Hero.vue`, `Features.vue`, `Solutions.vue`, `Footer.vue`).
3. Maintain the premium dark-mode aesthetic, glassmorphism, and smooth scroll animations.
4. Ensure responsive design and cross-device compatibility.

## Things to Remember
- Ensure `vite.config.js` includes the Vue plugin (`@vitejs/plugin-vue`).
- Move the contents of `index.html` (the body) into `App.vue` or child components.
- Move `style.css` contents into `<style>` blocks or keep as a global import, depending on scoping needs.
- Intersection Observer logic for scroll animations should be migrated to Vue lifecycle hooks (`onMounted`) or a custom Vue directive.
- Always use `npm run dev` to test changes after major refactoring.

## Mandatory Requirement: Google Tag (gtag.js)
Whenever creating any new page, HTML template, or entry point for this website:
- Copy and paste the official Google tag in the code of every page immediately after the `<head>` element.
- Do NOT add more than one Google tag to each page.
- Snippet:
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
