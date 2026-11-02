# Operations and Release Guide

## 1. Prerequisites

- Node.js LTS version supported by Vite 5 (Node 18+; use the current organization-approved LTS).
- npm.
- Repository dependencies installed from the committed `package-lock.json`.
- A browser for local manual checks.

Do not copy local `.env` values into public client code or publish local environment files. The current site does not have an application API/backend configured.

## 2. Local development

From the repository root:

```powershell
npm ci
npm run dev
```

Vite prints the local URL. Stop the development server with Ctrl+C in the terminal where it is running.

## 3. Build and preview

```powershell
npm run build
npm run preview
```

`npm run build` writes the static production bundle to `dist/`. `npm run preview` serves that output locally. The build emits a bundle-size advisory for a JavaScript chunk over 500 kB; review the analyzer/performance impact when optimizing.

There is no configured `npm test`, lint, or type-check script in `package.json` at this baseline. A successful build verifies bundling, not all user workflows.

## 4. Deployment assumptions

1. Publish the contents of `dist/` to an approved static hosting/CDN target.
2. Configure rewrite/fallback behavior so nested SPA paths resolve to `index.html`.
3. Ensure hashed assets under `dist/assets/` are served with correct MIME types and caching.
4. Keep the entry HTML revalidated or short-lived so it references the current hashed assets; immutable caching is appropriate for content-hashed assets.
5. Use HTTPS in production.
6. Confirm hosting headers, CSP and any privacy/security headers with the hosting/security owners; no production hosting platform is defined in this repository.
7. Smoke-test the deployed domain and all critical routes before announcing release.

## 5. Release checklist

### Before build

- [ ] Approved content, impact metrics, dates, addresses and all phone/email destinations.
- [ ] Current approved PDFs and publication assets attached to the correct controls.
- [ ] Policy owner has confirmed that the Whistleblowing card opens its approved document (the current mapping uses the Anti-Bribery & Corruption PDF).
- [ ] Contact and complaints submission behavior accurately described and approved.
- [ ] Cookie preference behavior and any optional tracking integrations reviewed.
- [ ] No secrets or private values included in client-side assets.

### Build and verification

- [ ] Clean dependency install (`npm ci`).
- [ ] Production build (`npm run build`) succeeds.
- [ ] Review warnings, especially bundle-size advisory.
- [ ] Execute P0 QA/regression cases and complete UAT/sign-off.
- [ ] Verify direct route loads, policy PDFs, images/videos and external links against staging.
- [ ] Check keyboard navigation, reduced motion and phone/tablet layouts.
- [ ] Review browser console/network for failed asset, map, font and script requests.

### Deploy and recover

- [ ] Record release identifier, build time, deployment URL and approver.
- [ ] Deploy only the generated `dist/` output.
- [ ] Run post-deploy smoke on Home, Eligibility, Impact, Contact, News, Publications, Policies, Privacy, Whistleblowing and Complaints.
- [ ] Confirm SPA fallback, HTTPS, caching and expected consent state on a clean browser profile.
- [ ] If release is faulty, restore the previously approved static artifact using the hosting provider's rollback mechanism; retain incident details and rerun smoke checks.

## 6. Content and asset maintenance

- Shared structured data: edit `src/data/content.js` or `src/data/pfiLogos.js`.
- Page-specific content: edit the relevant component in `src/pages/`.
- Policy documents: store approved PDFs in `src/assets/files/`, import them from the Policies page, and verify each link opens the matching document.
- Publications: the current cards are local data in `src/pages/resources/Publications.jsx`; update metadata and attach actual file links before presenting a working download control.
- Images: prefer existing optimized assets, meaningful alt text for informative images, and decorative empty alt text only for decorative imagery.
- Screenshots in this documentation are review evidence; recapture after substantial page or feature changes and update their descriptions.

## 7. Runtime support and limitations

- The application is client-side; there are no application logs or server-side submission receipts in this codebase.
- Contact form success is local UI state only; complaints uses a `mailto:` handoff.
- Cookie choices are browser-local storage. If analytics/marketing tags are added, ensure they do not execute until consent and test the network behavior.
- Google Maps, external social links and outbound organization sites can fail independently of the SPA.
- Maintain a separate deployment/hosting runbook for DNS, TLS, CDN, backups, alerting and access control once the production host is selected.
