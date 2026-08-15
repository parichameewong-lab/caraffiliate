# CLUBROD Recovery Report

## Capture

Source: Chrome DevTools HAR captured from:
`https://carconfirm-affiliate.chadoe.chatgpt.site/`

20 network entries were captured.

## Main captured files

- `assets/index-pCGOCx8i.js` — 80,717 bytes
- `assets/framework-CXnKph_e.js` — 189,805 bytes
- `assets/page-BkeqTED8.js` — 143,375 decoded bytes
- `assets/index-lYfuH_xj.css` — 85,564 bytes
- `assets/layout-segment-context-B3HHlNyH.js` — 288 bytes
- `assets/rolldown-runtime-S-ySWqyJ.js` — 694 bytes
- `index.html` — 22,421 bytes
- 11 captured font files and favicon assets

## Important finding

`page-BkeqTED8.js` contains most of the CLUBROD application-specific client logic and sample data. It also references the API routes listed in the README.

The captured bundle uses browser `localStorage` keys including:

- `cc-agents`
- `cc-advertisers`
- `cc-cars`
- `cc-leads`
- `cc-first-touch`

The captured bundle also contains application-specific demo/sample records. These are retained in the recovery files because the goal of this package is to preserve the captured production build, but they should be replaced before real deployment.

## Not recoverable from this HAR

- original source files such as `app/**`, `components/**`, `lib/**`
- original `package.json` and lockfile
- server/API route implementations
- database schema/migrations
- Supabase project credentials/configuration
- source maps (none captured)
- private Site storage that was not requested by the browser

## Recommended next step

Use this recovery package as the preservation copy. Then reconstruct an editable Next.js/Vinext project around the recovered UI and move persistent data/auth/storage to Supabase. Keep the original published Site untouched until the local replacement passes feature-by-feature checks.
