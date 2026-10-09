# Bruno Fernandes — personal blog

A Next.js App Router site with Sanity-managed writing, categories, author information, and contact details.

## Development

Use Node 24 (see `.nvmrc`).

```sh
npm ci
npm run dev
```

The app runs at http://localhost:3000. `SANITY_API_READ_TOKEN` is optional for authenticated draft previews in development. Production always queries the published perspective. `NEXT_PUBLIC_BASE_URL` may override the canonical site URL; it defaults to https://bruno-fernandes.dev.

The independent Sanity Studio lives in `studio/`:

```sh
npm --prefix studio ci
npm run studio
```

## Architecture

- `src/app/`: routes, metadata, loading/error/not-found UI. Existing article/category URLs and demo routes are preserved.
- `src/lib/content.ts`: typed Sanity queries and the `use cache` boundary. Metadata and page rendering reuse the same query. Published content uses `cacheLife("hours")`; authenticated development previews revalidate on the server after one second, with a five-minute client stale/expiry window so they remain eligible for prefetching. Reload to request refreshed preview content.
- `src/lib/blog-categories.ts` and `blog-pagination.ts`: cached archive data. All CMS cache entries share the `blog-content` tag, ready for a future authenticated publish webhook. No webhook is exposed by this change.
- `src/components/`: server-rendered page sections plus small client components for navigation, themes, sharing, copying, and the image dialog.
- `src/styles/`: theme tokens, shell, homepage, reading/archive, secondary pages, footer, motion, and responsive overrides. `globals.css` defines the import order.
- `src/proxy.ts`: existing archive/category rewrites.

Next.js 16.4 Cache Components and Partial Prefetching provide reusable route shells. Story links explicitly prefetch their cached URL-specific content; native React 19.3 `ViewTransition` pairs article titles, dates, summaries, and their backing surfaces between the index and reading page. Unsupported browsers retain ordinary navigation. Decorative scroll progress is feature-detected and disabled for reduced motion. Portraits remain static and non-draggable.

Page headings and structural UI sit outside CMS loading boundaries. The archive resolves URL-dependent results separately from its heading and topics. About keeps its portrait and heading visible. Contact is fully prerendered from cached content, with no skeleton or empty introduction. Article back navigation sits outside its CMS boundary. Cached content is included in the prerender rather than deliberately delayed to show a fallback. The standalone uncached special page keeps a route-local fallback; the Gekkou starfield uses deterministic positions for hydration.

`src/components/site-icon.tsx` owns the drawn interface icon set. `src/lib/brand.ts` is the shared squircle monogram source; `npm run icons` regenerates the adaptive SVG favicon, manifest icons, PNG fallbacks, and Apple touch icon. The introduction uses a 160px portrait (88px on mobile), a separate animated outline, and the existing factual bio.

The design system is documented in `DESIGN.md`. The route concept and constraints live in `.impeccable/surfaces/blog.md`.

## Validation

```sh
npm run lint
npm run typecheck
npm test
EXPOSE_TESTING_API=1 npm run build
npx playwright install chromium
npm run test:e2e
```

`npm test` includes dependency compatibility tests for both the app and Studio, so install both dependency trees first. The opt-in `EXPOSE_TESTING_API` build flag enables Next’s `instant()` test lock for local verification; ordinary production builds leave it off. Browser tests run against a production server on port 3001, starting it automatically if needed. Rebuild and restart an existing server after changing code.

Browser coverage includes cached instant article navigation, published-only content, category and page navigation, streamed not-found handling, mobile menus, theme persistence, reduced motion, keyboard access, native image-dialog dismissal, WCAG AA checks, and overflow at 320, 390, 768, and 1440 pixels.

For manual review:

```sh
npm start -- --port 3001
```

## CMS content

Articles retain their markdown and project screenshots. The reading page owns the single `h1`, removing the leading markdown title when present. Contact links from Sanity remain available and are consolidated with the site's existing email/GitHub/LinkedIn destinations. Article images load lazily; the homepage author portrait is preloaded.

## Dependency audit

The October 2026 redesign upgrades Next.js to 16.4.0 and React to 19.3.0 and removes `next-view-transitions`. At verification, `npm audit` still reports 20 dependency findings (14 high, 6 moderate), principally in the Sanity CLI and lint/build dependency chains; Studio separately reports 15. They are not represented as resolved by the framework upgrade. Avoid `npm audit fix --force`, which currently proposes major downgrades of Next linting and Sanity. The existing security compatibility tests pass.
