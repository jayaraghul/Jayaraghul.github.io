---
name: JTK Portfolio — Jayaraghul Thangaraj Kannan
description: Materials & Process Engineer portfolio. Committed navy system with a single process signal accent and a commendation gold reserved for recognition only.
colors:
  midnight-ore: "#0F2744"
  ore-mid: "#1E3A5F"
  ore-light: "#2B5282"
  process-signal: "#3B82F6"
  signal-wash: "#EBF4FF"
  commendation-gold: "#C5A028"
  page-ground: "#F7F9FC"
  surface-white: "#FFFFFF"
  border-grey: "#EDF2F7"
  text-primary: "#1A202C"
  text-secondary: "#4A5568"
  text-tertiary: "#718096"
typography:
  display:
    fontFamily: "Raleway, sans-serif"
    fontSize: "clamp(2.2rem, 4vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Raleway, sans-serif"
    fontSize: "2.4rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Raleway, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Raleway, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "3px"
rounded:
  pill: "50px"
  frame: "20px"
  card: "12px"
  btn: "8px"
  nav: "6px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "64px"
  3xl: "80px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.process-signal}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.btn}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "#2563EB"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.btn}"
    padding: "14px 28px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.btn}"
    padding: "14px 28px"
  button-white:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.midnight-ore}"
    rounded: "{rounded.btn}"
    padding: "14px 28px"
  nav-cta:
    backgroundColor: "{colors.process-signal}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.nav}"
    padding: "8px 18px"
  skill-tag:
    backgroundColor: "{colors.page-ground}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  skill-tag-hover:
    backgroundColor: "{colors.midnight-ore}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  award-badge:
    backgroundColor: "{colors.commendation-gold}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "3px 12px"
---

# Design System: JTK Portfolio

## 1. Overview

**Creative North Star: "The Technical Memoir"**

This design system reads like a document written by the person who did the work — not by an agency hired to sell them. The aesthetic is built on a committed navy field that dominates the primary surfaces (hero, education, contact), offset by a tightly controlled signal accent and the specific warmth of a person who has actually shipped things. Every typographic choice, every spacing decision, and every color appears because it is earning something: credibility, hierarchy, or connection.

The palette is committed, not restrained. Midnight Ore covers more than half the site's total surface area across three full-bleed sections. This is intentional. The navy isn't a brand color applied tastefully; it is the environment the reader enters. Process Signal Blue appears only where it means something: active links, call-to-action buttons, company names in timeline entries, and section eyebrows. Its restraint is the point. Commendation Gold appears exactly twice — on award badges — and should never be extended to other uses.

Motion is minimal and functional: fade-in on scroll for content sections, translate-up on card hover for tactile feedback, nothing choreographed, nothing ambient. The site should feel like it responds to you, not performs at you.

**Key Characteristics:**
- Committed navy palette; Midnight Ore is the dominant surface, not an accent
- Single signal accent (Process Signal Blue) used to mean "active" or "interactive"
- Commendation Gold is reserved exclusively for recognition and award elements
- Raleway for all display and heading hierarchy; Open Sans for body prose
- Cards lift on hover; sections fade in on scroll; no bounce, no elastic easing
- Typography hierarchy built on weight contrast (400 body / 700 title / 800 display)
- Prose line length capped at approximately 70ch in body sections

---

## 2. Colors: The Ore and Signal Palette

A committed navy system. The surface is the brand.

### Primary

- **Midnight Ore** (`#0F2744`): The dominant surface. Used for hero section, education section, contact section, and footer. Also the scrolled navbar state. This is the heaviest material in the system — dense, earned, deep.
- **Ore Mid** (`#1E3A5F`): Gradient midpoint and date badge backgrounds in timeline entries. Slightly lighter; used to create depth within navy surfaces without introducing a new hue.
- **Ore Light** (`#2B5282`): The light end of the navy gradient family. Appears in hero `::before` pseudo-element subtle sphere and at the tail of linear gradients.

### Secondary

- **Process Signal Blue** (`#3B82F6`): The interactive signal. Used on: primary buttons, nav CTA, section eyebrow labels, timeline company names, project tags, award event lines, hobby tags, and the timeline dot. Represents "active, live, interactive." Its rarity signals its meaning.
- **Signal Wash** (`#EBF4FF`): The lightest expression of the signal hue. Skills section background and hobby tag chip backgrounds. Never used as text. Creates a warm, cool-tinted light surface.

### Tertiary

- **Commendation Gold** (`#C5A028`): Reserved exclusively for award cards (`border-top`) and the Award badge chip. Must not be extended to decorative use. Its rarity is its value — it marks the two highest-signal moments on the page (Vestas Award, peer-reviewed publication).

### Neutral

- **Page Ground** (`#F7F9FC`): The warm-tinted off-white used as alternating section backgrounds (About, Projects) and card surfaces within navy sections. Cooler than pure white; sits at the blue end of neutral.
- **Surface White** (`#FFFFFF`): Card interiors, stat card backgrounds, skill group cards. The lightest surface.
- **Border Grey** (`#EDF2F7`): Dividers, skill group separator lines, gallery placeholder borders, and section category underlines. Never text. Never fills.
- **Text Primary** (`#1A202C`): Body text on light surfaces. Near-black with a slight warm-neutral lean.
- **Text Secondary** (`#4A5568`): Supporting paragraphs, timeline bullets, project descriptions. The workhorse reading color.
- **Text Tertiary** (`#718096`): Captions, location labels, stat labels, course lists. Fades into the surface.

### Named Rules

**The One Signal Rule.** Process Signal Blue appears on fewer than 15% of any light-background screen. It is the indicator light on a control panel; if it's everywhere, it means nothing.

**The Gold Lock Rule.** Commendation Gold (`#C5A028`) is locked to award and recognition contexts. It does not appear on buttons, decorative elements, dividers, hover states, or section accents of any kind.

---

## 3. Typography: The Memoir Stack

**Display Font:** Raleway (Google Fonts, weights 300–800)
**Body Font:** Open Sans (Google Fonts, weights 300, 400, 600)

**Character:** Raleway carries strong geometric bones at heavy weights — the 800 weight hero name reads like a nameplate. Open Sans at 400 is warm and readable over long prose, without the corporate neutrality of Inter. The pairing has a slight retro-technical register that suits an engineer writing about physical processes.

### Hierarchy

- **Display** (800, clamp(2.2rem–3.4rem), lh 1.1): Hero name only. Stacked two lines. Never used below the fold.
- **Headline** (800, 2.4rem, lh 1.2): Section titles ("About Me", "Experience", "Projects"). The authoritative level. Also used as project hero titles with a wider range (clamp 1.8–3rem).
- **Title** (700, 1.02–1.1rem, lh 1.3): Card headings, timeline role names, award titles, hobby titles. The reading-level heading inside a component.
- **Body** (Open Sans 400, 1rem, lh 1.75–1.85): All prose. About text, timeline bullets, project descriptions. Max line length approximately 70ch (enforced by container max-widths of 900–1200px with 24px padding).
- **Label** (Raleway 700, 0.78rem, ls 3px, uppercase): Section eyebrow text above each headline ("MATERIALS & PROCESS ENGINEER", "CAREER HISTORY"). This is the structural signal; always precedes a headline, never standalone.
- **Caption** (Raleway 600–700, 0.68–0.82rem, ls 1–2px, often uppercase): Badge text, date chips, project tags, gallery labels, CS labels. Small but structured.

### Named Rules

**The Raleway Boundary Rule.** Open Sans is prose only. Navigation, headings, labels, badges, captions, section eyebrows, and CTA buttons use Raleway. Never use Open Sans for UI text.

**The Weight Contrast Rule.** A minimum step of one full weight level (200 points) between hierarchy levels in close proximity. Body at 400, title at 700, headline at 800. Flat-weight sections feel like the typography gave up.

---

## 4. Elevation

This system uses layered ink-tinted shadows to create depth, not tonal surface elevation. Surfaces are flat by default; shadows emerge only in response to state (hover, interaction) or to lift interactive cards above their background.

The shadow tint is derived from Midnight Ore (`rgba(15,39,68,...)`) — not generic black — so shadows feel consistent with the navy palette rather than sitting as neutral grey blobs on the surface.

### Shadow Vocabulary

- **Ambient Rest** (`0 4px 20px rgba(15,39,68,0.10)`): Cards in their default state. Very soft; communicates containment without lifting the element visually. Used on stat cards, skill groups, and project cards at rest.
- **Elevated Hover** (`0 8px 40px rgba(15,39,68,0.18)`): Cards on hover. Stronger diffusion, larger offset — the card visibly lifts 4–8px upward (via `transform: translateY`). The shadow and transform work together; neither is applied without the other.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. No resting shadow on the hero image frame (which uses a border instead), no shadow on nav items. Shadows are earned by interaction.

**The Navy Tint Rule.** All shadows use `rgba(15,39,68,...)` as the shadow base, not `rgba(0,0,0,...)`. A black shadow on a navy-heavy site looks like a different product.

---

## 5. Components

### Buttons

Tactile and direct. Solid fills, clear edges, a 2px transparent border that becomes visible on outline variants. All buttons lift 2px on hover (`transform: translateY(-2px)`) and gain a blue glow shadow on the primary variant.

- **Shape:** Gently rounded edges (8px radius). Not a pill, not a rectangle — a confident midpoint.
- **Primary** (`btn-primary`): Process Signal Blue fill, white text, `14px 28px` padding. Hover: deepens to `#2563EB`, lifts 2px, gains `0 8px 25px rgba(59,130,246,0.4)` glow.
- **Outline** (`btn-outline`): Transparent fill, white text, `rgba(255,255,255,0.4)` border. Used on dark/navy backgrounds only. Hover: slight white fill overlay, border brightens.
- **White** (`btn-white`): White fill, Midnight Ore text. Used in contact section on navy background. Hover: shifts to Page Ground, lifts, gains box shadow.
- **Outline White** (`btn-outline-white`): Transparent, white border at 50% opacity. Hover: white border at 100%, subtle fill.
- **Nav CTA**: Process Signal Blue, 6px radius (tighter than main buttons), smaller padding (`8px 18px`). The only button in the navbar.
- **Typography:** Raleway 700, 0.9rem, letter-spacing 0.5px. Always Raleway, never Open Sans.

### Chips / Badges

- **Skill Tag** (`.skill-tags span`): Page Ground background, Text Secondary color, 50px pill radius, 1px Border Grey border. On hover: fills with Midnight Ore, text goes white. Transitions on background + border + color.
- **Section Eyebrow** (`.section-label`): No background. Raleway 700, 0.78rem, 3px letter-spacing, uppercase, Process Signal Blue. Precedes every section headline.
- **Award Badge** (`.award-badge`): Commendation Gold fill, white text, 50px pill radius, small padding (`3px 12px`). Used exclusively on award cards. The pub variant uses Ore Mid fill.
- **Date Chip** (`.timeline-date`): Ore Mid fill, white text, 50px pill radius, `4px 14px`. Appears in timeline entries, right-aligned.
- **Hobby Tag** (`.hobby-tag`): Signal Wash background, Process Signal Blue text, 50px pill radius. Very low-contrast light variant.

### Cards / Containers

Cards vary by section — no identical card grid.

- **Project Card**: White fill, 12px radius, Ambient Rest shadow at rest. Image area 200px tall. On hover: lifts 8px (`translateY(-8px)`), shadow becomes Elevated Hover, image scales 5% (`scale(1.05)`). A full anchor element — the entire card is clickable.
- **Stat Card**: White fill, 12px radius, 4px Process Signal Blue `border-top`. Lifts 4px on hover. Internal padding `28px 20px`. The top accent is structural, not decorative — it frames the metric.
- **Award Card**: Page Ground fill, 12px radius, 4px Commendation Gold `border-top`. Horizontal layout with icon and text side-by-side. Lifts 4px on hover.
- **Education Card** (on navy background): `rgba(255,255,255,0.07)` fill, `1px solid rgba(255,255,255,0.13)` border, 12px radius, `backdrop-filter: blur(8px)`. On hover: fill becomes 0.11. Used only on navy surfaces.
- **Skill Group**: White fill, 12px radius, Ambient Rest shadow. No top-accent. Internal padding `32px 28px`.

### Navigation

- **Transparent by default**; transitions to Midnight Ore fill + box shadow on scroll (`.navbar.scrolled`). Padding compresses from `20px` to `14px` — the navbar gets denser as you read.
- **Logo:** Raleway 800, 1.5rem, 2px letter-spacing. Monogram "JTK".
- **Links:** Raleway 600, 0.86rem, 6px radius hover state with `rgba(255,255,255,0.1)` fill. White at 85% opacity by default.
- **Mobile:** Links collapse to a vertical dropdown at `≤768px`. The toggle is a 24px three-bar icon, white.

### Timeline Entries

A signature component — the primary carrier of experience content.

- **Spine:** 2px Border Grey vertical line, left-positioned.
- **Dot:** 16px Process Signal Blue circle with a 3px white border and a 2px Process Signal Blue outer ring. Anchored to the spine.
- **Content block:** Page Ground fill, 12px radius, left-side 4px Process Signal Blue `border-left`. Padding `28px 32px`. On hover: translates 4px right and gains Ambient Rest shadow. (Note: the side-stripe border is an existing pattern in this section; for new components, prefer `border-top` accents or background tints over `border-left` stripes.)

---

## 6. Do's and Don'ts

### Do:

- **Do** use Midnight Ore for full-bleed hero, education, and contact sections. The navy should cover at least two major sections — its dominance is the visual identity.
- **Do** keep Process Signal Blue to interactive and semantic roles only: buttons, links, active states, section eyebrows, company names. Its rarity makes it legible as a signal.
- **Do** animate cards with `transform: translateY` and the matched shadow change together. Never animate shadows in isolation or layout properties.
- **Do** cap body text columns at approximately 70ch. The project detail pages use a 900px max-width container for this reason.
- **Do** use Raleway at weight 800 for all display and section headline text. Weight contrast is the hierarchy, not size alone.
- **Do** match shadow tint to Midnight Ore (`rgba(15,39,68,...)`), not black. Shadows that read as navy-family feel like part of the system.
- **Do** reserve Commendation Gold exclusively for the awards section and recognition badges.
- **Do** respect `prefers-reduced-motion`. The fade-in animation and card lifts should reduce to instant state changes with no transform when the user has reduced motion enabled.

### Don't:

- **Don't** add a third accent color. The system has one signal (Process Signal Blue) and one recognition mark (Commendation Gold). Adding a third breaks both.
- **Don't** use an identical card grid: same icon, same heading, same body, same size, repeated identically. The project, award, skill, and stat card components are already differentiated by structure. Preserve that variation.
- **Don't** add decorative animations, entrance choreography, scroll-driven parallax, or ambient motion. The site should feel like a document that responds to interaction, not a product demo. Per PRODUCT.md: "overly decorative or animation-heavy designs distract from the engineering work."
- **Don't** use a dark hacker / terminal aesthetic: no green-on-black, no code-rain, no monospace-only type hierarchy. Wrong field, wrong signal.
- **Don't** let the design drift into corporate grey sterility. Page Ground (`#F7F9FC`) and Signal Wash (`#EBF4FF`) carry the warmth; using pure grey neutrals instead loses the brand hue connection.
- **Don't** use generic Bootstrap-style card grids or template navy-plus-card-grid layouts. The system is already past that; any new sections must use layout variation (timeline, asymmetric grid, full-bleed, horizontal flex) not another 3-column card repeat.
- **Don't** use `border-left` or `border-right` greater than 1px as a standalone colored accent on new components. Prefer `border-top` accents (as used on stat and award cards), full borders, or background tints. The timeline's existing `border-left` is a legacy pattern.
- **Don't** animate `height`, `width`, `padding`, `margin`, `top`, `left`, or other layout properties. Animate `transform` and `opacity` only.
- **Don't** use gradient text (`background-clip: text` with a gradient). Emphasis is via weight, not decoration.
