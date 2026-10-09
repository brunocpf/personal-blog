# Raster asset provenance

Recorded for the October 2026 blog redesign.

| Asset | Provenance | Use | Treatment |
| --- | --- | --- | --- |
| `public/img/hero.jpg` | Existing user-provided author photograph already present in the repository. No generated raster source. | Compact homepage author masthead and About portrait. | Original file retained; CSS crops with `object-fit: cover`. No pixel edits, recoloring, filters, or generated replacement. |
| Sanity/CMS project screenshots and article imagery | Existing user-provided published article assets. The redesign reuses the CMS content and its image references. | Inline article figures and native expanded-image dialog. | Original source colors retained in light and dark themes; framework/CMS image sizing is delivery optimization. No source pixels edited. |
| `.impeccable/review/v4-*.png` and `v2-*.png` | Browser captures of the implemented blog during visual verification. | Review evidence only. | Not site imagery or generated artwork. The v4 captures show the final squircle pass; v2 captures show the preceding layout. Older captures show superseded iterations. |

No AI-generated raster assets were created or used for this implementation. Asset authorship and licenses beyond the existing user-provided provenance were not independently established; do not infer a stock provider or attribution.

Author photograph SHA-256 at documentation time: `6960a0a31ccee9bf36af5034861cce771908f5c29a7e434696d46d639d8944e2`.

The current source-to-screen usage is `src/components/hero-section.tsx` and `src/app/about/page.tsx` for the portrait, and the existing Sanity content plus Markdown/portable-text image renderers for published imagery. Keep future asset replacements separately traceable.

## Authored icons

The October icon pass adds original vector geometry in `src/lib/brand.ts` and `src/components/site-icon.tsx`. `scripts/generate-icons.mjs` exports the brand as SVG and rasterizes that vector with Sharp for Apple and manifest PNG assets. These PNGs are deterministic vector exports, not generated photographic imagery. Run `npm run icons` after changing brand geometry. The existing author portrait remains untouched.
