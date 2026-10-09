# Dependency security updates

## Follow-up — 2026-10-09

New advisories published since the original update affected four underlying packages. This follow-up resolves three:

| Dependency | Change | Verification |
| --- | --- | --- |
| `source-map-js` | Pin the patched 1.2.2 release in the blog | Reject excessive indexed-map offsets, including combined nested offsets; preserve ordinary mappings |
| `@tailwindcss/typography` → `postcss-selector-parser` | Override the pinned 6.0.10 dependency with patched 7.1.6 | Complex-selector round trip, production CSS build and browser checks |
| `argparse@1.0.10` → `sprintf-js` | Override only argparse 1.0.10 with 2.0.1 in both projects, removing sprintf-js entirely | YAML `safeLoad`, CLI stdin conversion, legacy flags and help work through argparse's v1 compatibility layer |

Fresh audits report **13 high findings in the blog and 11 in Studio**, all propagated from the single [braces advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). The prior zero-audit results below describe the October 2 advisory database, not the current state.

`braces` 3.0.3 remains the latest release and has no published fix. It is used by tooling through micromatch and Sanity codegen's Chokidar 3. The application source does not accept user-supplied glob patterns or call these APIs directly; this is not proof that every transitive path is unreachable. Replacing Chokidar 3 with a current major would remove its glob support, and changing the glob parser wholesale would require a maintained compatibility solution. No local fork or speculative replacement is included.

The existing audit commands and severity threshold remain unchanged, so security CI still fails on this unresolved advisory. Upgrade when a patched release or compatible upstream dependency change becomes available. Remove the argparse override when its parent stops requiring version 1, and the typography override when its manifest accepts a patched parser.

Validation on Node 24.15.0: clean lockfile installs for both projects, both linters, both type checks, 18 unit/compatibility tests and both production builds passed. Desktop/light and mobile/dark browser smoke checks passed with no page errors or accessibility violations; article screenshots were inspected for typography regressions. The normal production build keeps the Next.js testing API disabled.

References: [source-map-js advisory](https://github.com/advisories/GHSA-68fv-2mgg-jv7q), [selector parser advisory](https://github.com/advisories/GHSA-rj75-hqrm-r3gf), [sprintf-js advisory](https://github.com/advisories/GHSA-hp3w-g68c-fv3c).

## Original update — 2026-10-02

The baseline commit is `232e0391ffdc9d6253653c8e9691c9f60704c519`. GitHub reported 275 open Dependabot alerts across 32 packages (4 critical, 128 high, 122 medium, 21 low). These counts include duplicate advisories across manifests and lockfiles. Both npm projects are covered.

## Dependency changes

- Next.js, `@next/mdx`, and `eslint-config-next`: aligned to 16.3.8, covering the critical image-optimization and Windows-server RCE alerts, plus the newer upstream security fixes.
- React/React DOM: 19.2.8 in both projects; Studio moves from React 18.
- Sanity: 6.17.0 in both projects; `next-sanity` 13.3.4, Vision 6.17.0, code-input 7.3.9, Markdown plugin 9.0.14.
- Refreshed vulnerable transitive packages, including parsers, archive/image processing, HTTP libraries and build tools. Fresh npm audits report zero vulnerabilities, including development dependencies.
- Added the `picomatch` 4 peer needed by Sanity's file walker. Retained the existing root `legacy-peer-deps` policy for the legacy Geist icons package.

Some current upstream packages still pin vulnerable dependencies. Narrow overrides apply only to those parents:

| Parent                          | Override                            | Compatibility check                                         |
| ------------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| `@module-federation/dts-plugin` | `adm-zip` 0.6.1; `undici` 7.30.0    | ZIP round trip, async decompression and mocked HTTP request |
| `@vercel/frameworks`            | `js-yaml` 3.15.2; `smol-toml` 1.9.0 | Existing YAML `safeLoad` and TOML APIs                      |
| `typeid-js@1.2.0`               | `uuid` 11.1.1                       | 1,000 unique TypeIDs, UUIDv7 and string/UUID round trips    |

Remove these overrides when the respective upstream manifests accept patched versions. UUID 11 retains CommonJS compatibility; no blanket UUID major override is used.

## Compatibility and application fixes

- Use Node 24 (`.nvmrc`). Both manifests require Node >=22.13; Sanity 6 requires >=22.12. The native TypeScript tests are exercised on Node 24.
- Sanity 5 requires React >=19.2.2. Sanity 6 enables development Strict Mode and defaults Studio search to `groq2024`; this project has no custom auth providers or Vite overrides requiring migration.
- `next-sanity` v13 removes deprecated live-preview APIs; none are used here. Existing GROQ, Portable Text and plain-text imports compile successfully.
- Move Studio `autoUpdates` into `deployment.autoUpdates`, preserving its setting. Use the named image URL builder export.
- Migrate Studio lint to ESLint 9 flat config, keep explicit lint/typecheck commands for each project, and recognize App Router folder names.
- Replace the theme mount effect with hydration snapshots to satisfy the React hooks lint rule without changing the rendered initial state.
- Visual QA exposed a category proxy loop and pagination reset: canonical category URLs now pass through, and category query pagination preserves the requested page. Six regression tests cover rewrites and canonical paths.

## Validation

Passed locally on Node 24.15.0:

- `npm ci`; independent Studio install from the regenerated lockfile.
- `npm audit --audit-level=low` and `npm audit --prefix studio --audit-level=low`: zero vulnerabilities.
- `npm run lint` and `npm run lint --prefix studio`.
- `npm run typecheck` and `npm run typecheck --prefix studio`.
- `npm test`: 14 tests (6 routing; 8 dependency compatibility tests across both installations).
- `npm run build`: all 48 static pages generated; `npm run build --prefix studio`.
- Compared installed versions against all 275 captured GitHub alert ranges: no remaining matches. GitHub will only close default-branch alerts after merge and rescan.
- Playwright/Chrome screenshots inspected at desktop 1440×1000 and iPhone 13 emulation: home, blog, article with highlighted code, about, contact, category and pagination. All 14 page loads returned 200, without console/runtime errors or horizontal overflow. Clicked navigation, light/dark toggle, pagination, category filter and mobile menu controls successfully.
- Studio login screen loads without runtime/console errors at `http://localhost:3333`. The alternative `127.0.0.1` origin is not allowed by the existing Sanity CORS settings; no remote settings were changed.

Added `.github/workflows/security-validation.yml` to explicitly run installs, audits, both linters, both type checks, tests and both builds on PRs and pushes to main. Next.js build does not substitute for lint. This workflow has read-only repository permissions and no deployment steps.

## Limitations

- Studio content editing, authenticated preview and actual publishing were not exercised. No migrations, deploys or content writes were performed.
- `npm ls --all` on the site still reports the pre-existing missing `@geist-ui/core` peer declared by `@geist-ui/icons`, plus optional Sharp WASM install artifacts as extraneous on this Mac. The icon package's shipped JavaScript does not import that peer; build and browser checks pass. Studio's dependency tree is valid.
- Existing nonfatal warnings remain: automatic Studio updates have no `appId`; Node reparses the existing untyped-module package configuration. These are not security audit findings.

References: [Sanity v4→v5](https://www.sanity.io/docs/help/v4-to-v5), [Sanity v5→v6](https://www.sanity.io/docs/help/v5-to-v6), [next-sanity v13](https://www.sanity.io/docs/changelog/1b810aef-7d2e-4422-bece-dc317bbd2995), [Next.js security update](https://nextjs.org/blog/nextjs-security-update-september-22-2026).
