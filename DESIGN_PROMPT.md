# Claude Design prompt — portfolio redesign

Attach these files when you paste the prompt: `index.html`, `java.html`, `style.css`, `script.js`, `java.js`, `projects.json` and the `img/` folder. Then paste everything below the line.

---

Redesign my personal portfolio (Nadia Lagoa Vilela, lagoanadia.github.io). I've attached the current code. **This is a visual redesign only.** Every word, section, link, project and skill stays. Only the look, layout and motion change.

## 1. Hard rules (do not break these)

- **Content is frozen.** Keep every piece of text exactly as it is: headings, the hero quote, the code window lines, the skill names and their dot levels, the experience entries, the contact copy, the language ticker, the footer. Don't rewrite, shorten, translate or "improve" any of it. Don't add new copy (no fake location, no fake clients, no stock photos of people, no invented stats).
- **Keep every section and its order:** nav → hero (`#hero`) → work (`#work`) → skills (`#skills`) → experience (`#experience`) → contact (`#contact`) + language ticker → footer. Keep the separate `java.html` page.
- **Keep every link and target:** all nav anchors, the `java.html` link, "See my work", "Get in touch", "VIEW ALL ON GITHUB ↗", the email, LinkedIn and GitHub links, "← Back to all work", "View on GitHub ↗".
- **Keep the tech stack:** vanilla HTML, CSS and JavaScript. No frameworks, no build step, no Tailwind, no npm. One shared `style.css`. Google Fonts is fine.
- **Don't break the JavaScript.** These hooks must keep working:
  - `.reveal` elements get `.visible` from the IntersectionObserver in `script.js` / `java.js`.
  - Projects are still **fetched from `projects.json`** and rendered into `.work-body` as `.works` cards containing `.project-num`, `.project-title` (link), `.project-desc`, `.project-tags` / `.tag`. All 10 projects must show, numbered 01–10. Don't hardcode them.
  - Keep the empty `<p id="secondLine">` in the work header.
  - On `java.html`, keep `#selector`, `.selector-btn` / `.active`, `#viewer`, `#slideshow`, `.slide` / `.active`, `.slide-controls`, `.slide-btn`, `#counter`, `#detail`, and the `prevSlide()` / `nextSlide()` / `renderProject()` functions.
- Keep CSS custom properties in `:root`, `clamp()` for fluid type, the hidden scrollbar, and a working mobile layout at ≤768px.

## 2. Visual direction

Mix three references:

1. **"Mōno™ Studio"**: a white canvas split by **hairline grid lines** (1px) with tiny tick marks where the lines cross, a small black dot at the centre, a tiny stacked text menu in the top-left corner, and a **huge, tightly tracked grotesk wordmark** sitting on the bottom edge of the layout.
2. **"Bungee®"**: pure white page, a **massive bold geometric wordmark** with a small one-line tagline under it, **vertical rotated micro-text** running along the left edge, a small monogram top-left and a "+" icon top-right, and a row of **tall cards with fully rounded (arch) tops** filled with bold colour and gradients.
3. **"Lewis Gordon"**: an **app-shell layout**, meaning a floating rounded sidebar card on the left with the nav list and a pill CTA at the bottom, a slim top bar with a **status pill that has a green dot**, a centred bold headline with an **inline rounded chip** in the middle of the sentence, and a **horizontal card carousel where the centre card is bigger**.

Overall mood: editorial, gallery-like, confident, lots of white space. Swiss precision (it fits my 12 years in Switzerland). Monochrome UI, with colour appearing **only inside the cards and images**.

## 3. Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | page background |
| `--bg-soft` | `#F3F3F1` | outer frame / app-shell backdrop, input-like surfaces |
| `--ink` | `#0B0B0B` | text, primary buttons, wordmarks |
| `--ink-2` | `#5E5E5E` | body copy, descriptions |
| `--ink-3` | `#A3A3A3` | labels, numbers, dates, tick marks |
| `--line` | `#E4E4E2` | hairline grid lines and borders (1px) |
| `--dark` | `#111111` | the one dark surface: sidebar card and code window |
| `--live` | `#22C55E` | "Available" dot only |
| `--accent` | `#FF4A1C` | one hot signal colour, used sparingly: hover states, the `™`/`®`-style superscript mark, focus ring |

Card colours (for the arch project cards, which have no photos): pick from `#FF4A1C` (signal orange), `#E23B3B` (red), `#1F4FD8` (klein blue), `#F2C94C` (yellow), `#F7C6D0` (blush), `#0F3D2E` (deep green), plus soft mesh gradients mixing two of them (like the pink→purple→red gradient card in Bungee). Each project gets one, in a fixed order.

No beige, no navy and no gold from the old theme. The old syntax colours in the code window can stay but should be softened to match (muted red, yellow, blue, green on `--dark`).

## 4. Typography

- **Display / headings:** `Inter Tight` (or `Manrope`), weight 600–700, letter-spacing `-0.045em`, line-height `0.9`. The biggest wordmarks go up to `clamp(4rem, 13vw, 12rem)`.
- **Emphasis (`<em>` words like *LAGOA*, *built*, *hello*, *Java*, the category titles):** keep them emphasised, but render them in `Instrument Serif` italic, same size, weight 400. This is the only serif on the site. It keeps the "literary" personality of the old design inside a modern grotesk layout.
- **Labels, numbers, dates, tags, code, nav micro-text:** `Geist Mono` (or `JetBrains Mono`), 11–12px, uppercase, letter-spacing `0.08em`.
- **Body:** `Inter Tight` 400, 15–16px, line-height 1.55, colour `--ink-2`, max width about 60ch.

## 5. Layout, section by section

### Global shell (desktop ≥1024px)
- The page sits on `--bg-soft` with a white **main panel** (radius 28px, 12px inset from the viewport), like the Lewis Gordon frame.
- **Left sidebar card** (sticky, 260px wide, radius 22px, `--dark` background, white text), inside the frame:
  - top: the `NLV` monogram in a small rounded square, then "Nadia Lagoa Vilela" and the existing "DAM student" text below in mono;
  - middle: the nav links as a vertical list (About, Work, Java, Skills, Experience, Contact) with small line icons, the active section highlighted with a subtle white/8% pill and a `→`;
  - bottom: three small square icon buttons (email, LinkedIn, GitHub, using the existing links) and a full-width white pill button with the existing "Get in touch" text linking to `#contact`.
- **Top bar** inside the main panel: left, a pill that says "Available for opportunities" with a pulsing green dot; right, the existing "↓ scroll for more" hint in mono.
- **Vertical micro-text** (Bungee style) rotated 90° on the left edge of the main panel, showing the existing footer line "© 2026 Nadia Lagoa Vilela".
- Tablet/mobile: the sidebar collapses into a top bar with the `NLV` monogram left and a "+" button right that opens a full-screen white menu with the nav in large grotesk type.

### Hero (`#hero`), the "Mōno Studio" canvas
- A white card split by a 2×2 **hairline grid** (1px `--line`), with little `+`-shaped tick marks at the line crossings and a 6px black dot where the lines meet.
- **Top-left cell:** the availability label (if it isn't already in the top bar) plus a tiny stacked list of the nav links in 11px mono, like Mono Studio's corner menu.
- **Top-right cell:** the hero quote ("I've been translating between worlds my whole life, / *Code is just the newest one.*") at 18–20px, max 32ch, followed by two pills: a black filled "See my work" and an outlined "Get in touch".
- **Bottom row, full width:** the name as a giant wordmark on the baseline. "NADIA" pinned bottom-left and "VILELA" bottom-right (like "Mōno™" … "Studio"), with *LAGOA* in Instrument Serif italic between them, or stacked above on smaller screens. Put a small superscript `™`-style mark after "VILELA" in `--accent` (visual only, not new text: use a CSS `::after` dot/mark or a small circle).
- **Code window (`nadia.js`):** keep it, with all its lines unchanged. Restyle it as a floating dark card (radius 18px, `--dark`, soft shadow) in the right half, overlapping the grid lines slightly. Keep the three traffic-light dots but make them 8px and muted. Mono 13px.
- Behind the canvas on very wide screens (≥1440px), a mosaic of tiles around the card like Mono Studio: use the existing screenshots in `img/` plus solid card-colour tiles. No stock photos.

### Work (`#work`), the "Bungee" arch rail plus the "Lewis" carousel
- Header: "Projects" as a mono label with "VIEW ALL ON GITHUB ↗" beside it. The heading "Things I've *built*" goes big, centred, Bungee style, with a small `®`-style superscript dot in `--accent`.
- `.work-body` becomes a **horizontal scroll-snap rail** of tall cards (about 280×420px, gap 12px). Each `.works` card:
  - top 60%: a colour block with an **arch top** (`border-radius: 999px 999px 24px 24px`) using the card palette / gradients in order;
  - the big `.project-num` (01, 02…) in white mono sits on the colour block;
  - below it: `.project-title` in 22px grotesk (the whole card is the link area, hover shows ↗), `.project-desc` clamped to 3 lines, then `.tag` chips as small outlined pills.
- Carousel behaviour: the card nearest the centre scales to 1.06 and gets full opacity, while its neighbours sit at 0.85 opacity (Lewis Gordon). Add small prev/next circular buttons and drag-to-scroll. Keep it keyboard accessible.
- Mobile: the rail stays horizontal with snap, cards 78vw wide.

### Skills (`#skills`), a Swiss grid
- Left column: the "Skills" mono label and "What I / bring to / the table" as big grotesk, sticky.
- Right: the 4 groups (*LANGUAGES*, *TOOLS*, *HUMAN LANGUAGES*, *SOFT SKILLS*) as a 2×2 grid of cells separated by hairlines, with tick marks at the crossings to echo the hero.
- Each `.skill-row`: the name on the left, and on the right the **5 dots restyled as 5 small squares (8px, radius 2px)**. Full = `--ink`, half = half-filled (a linear-gradient split), empty = 1px `--line` outline. The levels stay exactly the same.
- Soft skills: render them as a wrap of outlined pills instead of rows.

### Experience (`#experience`)
- Left: "Experience" mono label and "How I / got here" in huge grotesk, sticky while scrolling (as it is now).
- Right: the 4 entries as full-width rows separated by hairlines, like a table. Mono date on the left (`--ink-3`), role in 28px grotesk, company in mono, description in body text. A small index `(01)`–`(04)` in mono. On hover, the row gets a `--bg-soft` fill and a → slides in.

### Contact (`#contact`)
- A **full-bleed dark block** (`--dark`, radius 28px) with the hairline grid overlay (white at 6% opacity) and a centre dot, mirroring the hero.
- "// Let's build something" in mono, then "Say *hello* / in any language" as a giant white wordmark, and the sub copy in `--ink-3`.
- Buttons: "Send an email ↗" as a white filled pill; "LinkedIn ↗" and "GitHub ↗" as outlined white pills.
- **Language ticker:** keep the infinite marquee and all 7 languages with their levels. Make it huge (`clamp(2.5rem, 7vw, 6rem)`) grotesk, white, with the level text (`· Nativa ·` etc.) in Instrument Serif italic `--ink-3`, separated by small `--accent` dots.

### Footer
- One thin row: "© 2026 Nadia Lagoa Vilela" left, "Crafted with intent." right, 11px mono, hairline top border.

### `java.html`
- Same shell (sidebar, top bar, frame). The nav keeps the same links it has now.
- Hero: "Java Projects" mono label and "Built in *Java*" as a big grotesk wordmark on a hairline grid, with "← Back to all work" as a small outlined pill.
- `#selector`: a **segmented pill control** (rounded track in `--bg-soft`, where the active `.selector-btn` becomes a black pill with white text).
- `#viewer`: 2 columns. The slideshow sits in a rounded 20px card with a soft border, the screenshot fills it, and `.slide-controls` become two circular icon buttons with the `#counter` between them in mono (`1 / 3`). `#detail` shows the label, the title with the `/` in `--accent` Instrument Serif, the description, the tag pills and "View on GitHub ↗" as a black pill.
- Mobile: a single column, with the slideshow on top.

## 6. Components and details

- **Buttons:** pills (`border-radius: 999px`), 44px tall, 0 20px padding, 14px grotesk 500. Primary is `--ink` background with white text; ghost is a 1px `--ink` border. On hover, primary moves to `--accent` and the arrow ↗ nudges 2px up-right.
- **Tags:** 1px `--line` border pills, 10px mono uppercase.
- **Radii:** frame 28px, cards 20–24px, chips 999px. No sharp rectangles except the hairline grid.
- **Shadows:** almost none. Only floating cards (code window, carousel centre card) get `0 20px 60px -20px rgba(0,0,0,.25)`.
- **Status dot:** keep the pulse animation, now in `--live` green with a soft halo ring.

## 7. Motion

- Keep the `.reveal` scroll-in, but make it a 24px rise plus a slight blur fade (0.9s, `cubic-bezier(0.16, 1, 0.3, 1)`), staggered 60ms between siblings.
- Hero wordmark: letters slide up from a masked baseline on load.
- Hairline grid lines "draw" in (scaleX/scaleY from 0 to 1) on first view.
- Carousel centre-card scaling as described above, marquee ticker as it is now.
- Respect `prefers-reduced-motion`: turn off the transforms and the marquee, keep opacity only.

## 8. Accessibility and quality

- Contrast AA for all text. Visible focus rings (2px `--accent`, 3px offset).
- Keep semantic tags, a single `<h1>` per page (fix heading levels visually only if needed, without changing the text).
- Fully responsive from 360px to 1920px with no horizontal page scroll (only the carousel scrolls sideways).

## 9. Deliverable

Give me the updated `index.html`, `java.html`, `style.css`, `script.js` and `java.js` (JS changes only where needed for the sidebar active state, the mobile menu and the carousel controls). `projects.json` stays untouched. Don't touch the sub-projects in `web/`, `Weather/` or `larder/`. At the end, list every file you changed and confirm that no text content was altered.
