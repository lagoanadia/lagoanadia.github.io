# lagoanadia.github.io

My personal portfolio — designed and built from scratch with vanilla HTML, CSS and JavaScript. No frameworks, no build tools, no shortcuts.

**[lagoanadia.github.io →](https://lagoanadia.github.io)**

---

## What it is

A single-page portfolio designed to feel like reading someone, not scanning a CV. The copy, layout and interactions are intentional: every section tries to say something about how I think, not just what I've done.

---

## Technical breakdown

### Scroll reveal with Intersection Observer API

Instead of loading all animations on page load, the site uses the native `IntersectionObserver` API to detect when elements enter the viewport and trigger their reveal:

```js
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
```

Any element with the `.reveal` class starts invisible and slides up into place only when 10% of it becomes visible. No scroll event listeners, no layout thrashing — the browser handles the detection natively and efficiently.

### Dynamic project list via fetch + JSON

The work section is not hardcoded in HTML. Projects are stored in a separate `projects.json` file and fetched at runtime:

```js
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(function(project, index) {
      const div = document.createElement('div')
      // build card from data and inject into DOM
      document.querySelector('.work-body').appendChild(div)
    })
  })
```

This means adding or updating a project only requires editing the JSON — no touching the HTML. The JS reads the data, builds the card markup (number, title, description, tags), and appends it to the grid dynamically.

### Java projects page with interactive slideshow

`java.html` is a separate page for Java-specific work, with its own viewer built entirely in JS. Projects are stored as an array of objects with title, description, tags, GitHub URL and an array of screenshot paths. Clicking a selector button calls `renderProject(index)`, which rebuilds both the slideshow and the detail panel from scratch using `innerHTML`.

The slideshow handles previous/next navigation with a modulo wrap so it loops seamlessly:

```js
currentSlide = (n + slides.length) % slides.length
```

### CSS architecture

- **CSS custom properties** (`--color-bg`, `--font-serif`, `--color-accent`...) defined in `:root` and reused consistently across the entire stylesheet
- **`clamp()`** for fluid typography that scales between viewport sizes without breakpoints
- **Sticky positioning** on the experience heading — it follows you as you scroll through the timeline
- **CSS animations** for the pulsing availability dot, the bouncing scroll arrow, the elongating accent line in the work section, and the infinite language ticker at the bottom
- **`backdrop-filter: blur()`** on the scoreboard overlays in the Tic Tac Toe theme (also used in the portfolio's dark panels)
- **Hidden scrollbar** cross-browser (`scrollbar-width: none` + `::-webkit-scrollbar`)

### Typography

Three deliberate font choices loaded from Google Fonts:

| Font | Use |
|---|---|
| Cormorant Garamond | Headings — editorial, high contrast, slightly literary |
| DM Mono | Labels, tags, dates, code — technical and understated |
| Outfit | Body text — clean and readable |

### Responsive design

The layout uses CSS Grid throughout. On mobile (≤768px): the nav collapses, the hero drops to a single column (the code window disappears), the skills and experience grids restack vertically, and the Java project viewer goes single column.

---

## Structure

```
├── index.html        → Main portfolio page
├── java.html         → Java projects viewer
├── style.css         → All styles (shared across both pages)
├── script.js         → Intersection Observer + fetch + DOM rendering
├── java.js           → Java page: project data, selector, slideshow
├── projects.json     → Project data source for the work section
└── img/              → Screenshots for the Java project viewer
```

---

## Built with

- HTML, CSS, JavaScript — zero dependencies, zero build step
- Intersection Observer API
- Fetch API
- Google Fonts (Cormorant Garamond, DM Mono, Outfit)
- GitHub Pages

---

*Crafted with intent.*
