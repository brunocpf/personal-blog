---
name: "Bruno Fernandes — Blog"
description: "A personal software blog with warm surfaces, expressive headings, and readable article rows."
colors:
  background: "hsl(40 13% 96%)"
  foreground: "hsl(225 9% 18%)"
  secondary: "hsl(348 58% 35%)"
  secondary-foreground: "hsl(0 0% 100%)"
  border: "hsl(30 6% 79%)"
  surface-soft: "#e9e6e3"
  color-quiet: "#646168"
  accent-fill: "#8d263b"
  accent-ink: "#fff6f5"
  dark-background: "hsl(330 5% 11%)"
  dark-foreground: "hsl(30 10% 88%)"
  dark-secondary: "hsl(348 43% 73%)"
  dark-secondary-foreground: "hsl(345 25% 14%)"
  dark-border: "hsl(330 4% 29%)"
  dark-surface-soft: "#292628"
  dark-color-quiet: "#b2a9ae"
  dark-accent-fill: "#422c34"
  dark-accent-ink: "#f1dce2"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(2.8rem, 5.4vw, 4.7rem)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(2.5rem, 5.2vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  featured-title:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.022em"
  author-title:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  reading:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "14px"
    fontWeight: 400
rounded:
  inline-code: "4px"
  portrait: "16px"
  media: "12px"
  feature: "16px"
  pill: "99px"
  circle: "50%"
spacing:
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "20": "20px"
  "24": "24px"
  "28": "28px"
  "32": "32px"
  "38": "38px"
  "42": "42px"
components:
  button-solid:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
  button-icon:
    textColor: "{colors.foreground}"
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
  button-icon-hover:
    backgroundColor: "{colors.surface-soft}"
  link-text:
    textColor: "{colors.secondary}"
  nav-link:
    textColor: "{colors.color-quiet}"
  nav-link-current:
    textColor: "{colors.foreground}"
  chip-topic:
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  chip-topic-current:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
  card-featured:
    backgroundColor: "{colors.accent-fill}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.feature}"
    padding: "42px 38px"
  code-block:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.media}"
---

# Design System: Bruno Fernandes — Blog

## Overview

**Creative North Star: "The Personal Reading Room"**

A calm, personal setting for published writing and software projects. Warm surfaces, expressive sans-serif headings, and precise rules give the blog character without competing with the author’s words. The compact author masthead and open index establish the current homepage; their composition is specified in `.impeccable/surfaces/blog.md`.

The system is flat, readable, and quietly responsive. Color marks links, selected categories, and the featured article. Motion explains navigation and state changes; portrait photography stays still. This description records the implemented design and the user’s delegated creative direction, not a new marketing message.

**Key Characteristics:**
- Warm paper and charcoal themes with burgundy and muted rose accents.
- Bricolage Grotesque headings with Source Sans 3 reading text.
- Open rows, date columns, thin rules, and a narrow reading measure.
- Clear keyboard focus, stable page geometry, and optional motion.

The frontmatter records the reused values in `src/styles/`; `src/app/layout.tsx` supplies the two font families. The `dark-` entries record the same semantic variables under `.dark`, not additional CSS variable names. The sidecar contains illustrative tonal ramps, stateful component specimens, motion, and breakpoints. Review evidence is in `.impeccable/review/v4-*.png` (latest squircle pass) and `v2-*.png` (earlier layout evidence).

## Colors

The palette pairs warm neutrals with a wine-colored accent family. Names retain the source semantics: the visual accent is called `secondary` in CSS.

### Primary

- **Burgundy / muted rose (`secondary`, `dark-secondary`):** links, selected category filters, focus outlines, active navigation marks, and the brand symbol.
- **Wine / deep burgundy (`accent-fill`, `dark-accent-fill`):** the featured post; paired with its own pale `accent-ink` foreground.
- **Accent foreground:** white in light mode and a deep wine neutral in dark mode, for readable filled controls.

### Neutral

- **Warm paper / warm charcoal (`background`):** page and sticky header.
- **Charcoal ink / warm light ink (`foreground`):** headings and primary text.
- **Soft stone / raised charcoal (`surface-soft`):** code blocks, image frames, skeletons, and control hover fills.
- **Quiet ink (`color-quiet`):** descriptions, dates, metadata, and inactive navigation.
- **Warm rule (`border`):** separators and outlined controls.

**The Semantic Theme Rule.** Use the same semantic roles in both themes; burgundy becomes muted rose for controls while the featured surface remains a deep burgundy.

Increased contrast preferences deepen quiet light-mode text and lighten dark-mode quiet text; border contrast also increases. Do not use the sidecar’s synthesized tonal ramps as replacement theme tokens.

## Typography

**Display font:** Bricolage Grotesque, with sans-serif fallback.
**Body font:** Source Sans 3, with sans-serif fallback.

Rounded, compact display shapes add personality while the body face keeps long technical posts readable. Headings use balanced wrapping and a semibold weight. Dates and pagination use tabular numbers. Code retains monospace treatment rather than adopting the display face.

### Hierarchy

- **Display:** archive, About, Contact, and status-page headings; fluid, tightly tracked.
- **Headline:** article title; its own fluid size and tight leading.
- **Featured title:** largest title in the post index, within the filled feature.
- **Author title:** compact name beside the photograph; it is not a landing-page headline.
- **Body:** general interface copy; on narrow screens the base size becomes 17px.
- **Reading:** article prose; 20px with 1.8 leading, becoming 18px on narrow screens. Decks and summaries stay within 65ch; the prose column is capped at 740px.
- **Label:** dates, category links, and footer; regular weight and sentence case. Navigation and text actions use 16px; text actions are semibold.

## Layout

The main container is `min(100% - 112px, 1248px)`, centered. At 1000px and below its gutters become 32px; at 700px and below they become 20px. The sticky header is 96px high on desktop and 76px on mobile, with a matching fallback placeholder. The page reserves a stable scrollbar gutter.

Desktop article rows use a 175px date column and flexible content separated by 25px. At the intermediate breakpoint the date column becomes 135px; mobile rows stack. The featured entry adds a trailing reading action, then collapses progressively to a single-column mobile block. The article header is capped at 1050px and the reading column at 740px. Mobile article titles use 37px and the reading column retains 20px gutters.

The current author masthead uses a 160 × 160px photograph opposite the name and factual introduction; mobile uses 88 × 88px beside a two-line name. A separate burgundy squircle outline settles around the stationary portrait, and a text link opens About. The About page uses a larger portrait alongside text and stacks below 700px. These are surface-specific expressions of the same type, shape, and spacing vocabulary.

Spacing is drawn from the repeated pixel values in frontmatter, not an invented uniform scale. Preserve deliberate reading whitespace and the compact masthead. Print removes the site navigation, footer, share control, and decorative progress indicator; prose becomes a full-width print column.

## Elevation & Depth

**The Flat Surface Rule.** Use spacing, rules, and tonal fills to separate content; the blog shell and article list have no decorative box shadows.

The header uses a opaque page fill. The featured entry is differentiated by tone, not elevation. Expanded images use a native modal dialog and a translucent black backdrop (`#000b`); this is functional separation from the page. Legacy demo primitives are outside this blog-surface specification.

## Shapes

Article rows remain open, divided with one-pixel rules. The featured surface and image dialog have the largest recurring corners. The header mark uses authored squircle SVG geometry shared with the favicon and app icons. Interface icons share a 24px viewBox, 1.75px strokes, round terminals, and softly squared copy/share/display shapes. Icon buttons and square portraits use native continuous corners where supported, with 14px and 16px rounded fallbacks. Topic filters remain pills. The featured entry retains its 32px native squircle radius and 16px fallback.

## Components

### Buttons and text actions

Solid buttons are reserved for status/recovery actions: accent fill and contrasting text, pill shape, at least 48px high, with a slight brightness increase on hover. Most navigation uses semibold text actions with a minimum 44px height, underline on hover, and an arrow that moves slightly. Icon buttons are 44px circles with a thin border and soft hover fill. Every keyboard action retains the global accent focus outline (2px, 5px offset).

### Navigation

Desktop navigation is a compact horizontal row. Active and hovered links gain a thin accent underline and foreground text. Below 700px, the mobile menu exposes a two-column list beneath the header, with 22px labels and at least 52px row targets. The theme button cycles system, light, and dark with an accessible action label.

### Category filters and tags

Archive filters use outlined pills with at least 44px height. The current category is filled in accent color; hover adds the soft surface. Categories within article rows are plain text links rather than pills, with underlines becoming stronger on hover.

### Article rows and featured entry

Standard entries align date, linked heading, summary, and categories across an open ruled row. Hover colors the heading and nudges the arrow. The featured entry uses its dedicated fill/ink pair and larger title. Its heading underlines on hover; the separate Read post arrow rotates gently. Keep the featured background and text paired in both themes.

### Reading media and code

Code blocks use the soft surface, a ruled toolbar, native horizontal overflow, and a copy control with status feedback. Inline code has compact inset padding and small corners. Image frames preserve the source colors and offer a clearly labeled circular expand control. The native dialog carries a title and close control; article images are not color-inverted in dark mode.

### Loading and motion

Loading boundaries belong to CMS-backed pieces rather than entire pages. Post-list placeholders follow the date/body grid; text placeholders have no shimmer. Cached content prerenders, so Contact has no placeholder. Its optional introduction renders only when the CMS supplies prose. The portrait is non-draggable and stationary; only its separate outline has a brief settle animation or hover turn, both disabled for reduced motion. The page reserves scrollbar space, including during dialog use.

Supported browsers share each article’s title, date, summary and backing surface through native view transitions. The surface keeps the featured entry’s light text backed by its burgundy panel on return navigation. Shared text and surface snapshots use the incoming view without an opacity crossfade; their geometry still morphs. The surface snapshot fills its interpolated height. The root declares `data-scroll-behavior="smooth"` so Next.js settles scroll restoration before capturing route transitions. The sticky header has its own `site-header` snapshot at transition z-index 100; its old snapshot is hidden and its new snapshot stays stationary above the page animation. State changes use short transitions; page changes use the existing ease-out curve. Scroll progress is a decorative three-pixel line enabled only where scroll timelines and normal motion preferences are available. Reduced motion removes menu/view-transition animations and animated arrow/underline transitions. Unsupported browsers use ordinary navigation.

## Do's and Don'ts

### Do:
- **Do** use the existing semantic CSS variables so both themes remain coherent.
- **Do** preserve the author’s published writing and factual biography.
- **Do** keep article images in their original colors in both themes.
- **Do** retain visible keyboard focus, accessible control names, and reduced-motion behavior.
- **Do** use static loading geometry and a stable scrollbar gutter.

### Don't:
- **Don’t** bring back the large marketing hero, slogans, or draggable portrait on the blog homepage.
- **Don’t** reintroduce blue accents as the dark theme’s identity.
- **Don’t** animate the author portrait or add shimmer to the content skeleton.
- **Don’t** turn every article into a filled or elevated card.
- **Don’t** add visible loading prose that displaces the reading layout.

Asset provenance is recorded in `.impeccable/assets.md`. Existing photography and CMS screenshots are source material, not generated decoration.
