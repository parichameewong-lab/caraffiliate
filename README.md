# CLUBROD — Local Recovery Package

This package was recovered from the published CLUBROD website using a Chrome DevTools HAR capture.

## Important

This is a **production-build recovery**, not the original editable source project. The captured site contains compiled JavaScript/CSS and the HTML delivered to the browser. The original Next.js/Vinext source tree, package manifest, server implementation, and private environment variables were not present in the HAR.

## Run locally

Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (normally http://localhost:5173/).

## What is included

- index.html — captured HTML shell and server-rendered homepage
- assets/*.js — JavaScript bundles captured from the published site
- assets/*.css — captured stylesheet
- assets/_vinext_fonts/* — captured font files
- favicon.svg
- package.json — minimal Vite wrapper so the recovered static build can be served locally
- .env.example — placeholder only; no secrets included

## Detected application behavior

The captured page bundle contains client-side data and logic for:

- CLUBROD marketplace homepage
- car search/filtering
- featured/selected car logic
- agent registration/login/dashboard
- advertiser/dealer registration/login/dashboard
- admin area
- customer lead flow
- affiliate/referral attribution using a `ref` query parameter
- localStorage persistence for cars, agents, advertisers and leads
- inspection-report upload endpoint
- chat endpoints
- inspection coupon UI

## Detected API routes in the captured bundle

- POST /api/inspection-reports
- GET/POST /api/chats
- POST /api/chats?action=read
- POST /api/chats?action=reply
- POST /api/chats?action=create
- GET /api/chats?...query parameters...

The server implementations for these routes were **not captured** by this HAR and therefore are not included.

## Supabase status

The word `supabase` appears in the client bundle in setup/instruction content, but no Supabase client initialization or Supabase API URL/key was detected in the captured production bundle. This means the HAR does not prove that the current published site is actually connected to Supabase.

## Source-map status

No `.map` source-map asset was captured in the HAR. Therefore the original editable component/source tree cannot be reconstructed exactly from this capture alone.

## Security note

The production bundle contains demo/test account data and other client-side sample data. Treat all embedded credentials as compromised demo credentials and replace/remove them before production use. Do not commit real passwords, API keys, service-role keys, or other secrets to GitHub.
