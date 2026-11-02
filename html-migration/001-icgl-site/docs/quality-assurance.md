# Software Quality Assurance Plan

**Baseline:** 28 September 2026  
**Applies to:** ICGL public website SPA and its static assets

## 1. Quality objectives

1. Every declared route renders without a fatal client error.
2. Navigation, filters, animations, consent UI and forms behave consistently at supported viewport sizes.
3. Content and impact metrics match owner-approved source material.
4. Forms, email handoffs, policy files and external links communicate their actual behavior.
5. Keyboard access, readable contrast, meaningful alternatives and reduced-motion preferences are verified before release.
6. Production output builds reproducibly and can be served with SPA route fallback.

## 2. Current verification baseline

| Check | Result at baseline | Evidence |
|---|---|---|
| Production build (`npm run build`) | Passed; Vite produced `dist/` | [Test evidence](./test-evidence.md) |
| Route smoke test | 15 of 15 sampled routes rendered their expected page heading | [Test evidence](./test-evidence.md) |
| News keyword filter | Passed for sample keyword `MSME`; 3 stories shown | [Screenshot](./images/news-search.png) |
| Publication year/category filters | Passed for `2025` + `Annual Report`; 1 item shown | [Screenshot](./images/publications-filters.png) |
| Policy action rendering | Five “Read … policy” links are present; owner confirmation of the shared Whistleblowing/Anti-Bribery PDF is pending | [Test evidence](./test-evidence.md) |
| Diagnostics on cookie consent/layout | No diagnostics errors reported for those files after cookie-consent changes | Prior editor diagnostics; not a repository-wide lint run |
| Automated unit/integration/e2e suite | Not configured | No test script or test framework in `package.json` |
| Cross-browser, mobile device, accessibility audit, production monitoring | Pending | Must be performed for the target deployment |

## 3. Test levels and responsibility

| Level | Scope | Suggested owner | Minimum evidence |
|---|---|---|---|
| Static/build | Syntax, module resolution, asset inclusion, production bundling | Developer | Successful `npm run build` output |
| Component/manual | Consent choices, navigation, filters, form validation, empty states | Developer/QA | Test ID, steps, result, browser and date |
| Route integration | Direct route load, shared shell, links and bundled document access | QA | Route matrix plus failures/console details |
| Responsive/accessibility | Desktop/tablet/mobile, keyboard, screen reader, reduced motion, contrast | QA/accessibility reviewer | Device/browser matrix and WCAG findings |
| UAT | User tasks using approved content and expected organization workflows | ICGL business owner / representative users | Completed [UAT record](./uat.md) and sign-off |
| Production smoke | Deployed URL, redirects, SPA fallback, assets, contact links, maps and consent | Release owner | Dated release checklist and URL/version |

## 4. Local test environment

- Runtime: Node.js version supported by Vite 5; use a maintained LTS release.
- Install dependencies from the lockfile with `npm ci` in CI or a clean checkout.
- Run `npm run dev` for local interactive checks.
- Run `npm run build` before release.
- Run `npm run preview` to serve the compiled `dist/` output locally.
- No automated test command exists in the current `package.json`. Do not report manual browser checks as automated tests.

## 5. Regression suite

| ID | Area | Test intent | Priority |
|---|---|---|---|
| QA-001 | Build | Install from lockfile and create a production bundle | P0 |
| QA-002 | Routing | Direct-load every declared route and confirm expected title/content | P0 |
| QA-003 | Navigation | Navigate desktop links, resources submenu, mobile menu and browser back/forward | P1 |
| QA-004 | Cookie consent | First visit, accept all, reject optional, customize/save, reload persistence, reopen settings | P0 |
| QA-005 | Cookie consent | Block local storage and confirm the visitor receives the storage error message | P1 |
| QA-006 | News | Search title/body/category, select year/category, combine filters, clear filters, empty state | P1 |
| QA-007 | Publications | Search, filter year/category, clear filters, empty state, verify each download destination | P1 |
| QA-008 | Policies | Open each policy PDF, verify correct document mapping and response; confirm new-tab behavior | P0 |
| QA-009 | Contact | Required fields, email format, privacy consent, submit behavior, map and direct contact links | P0 |
| QA-010 | Complaints | Required fields/category, mailto subject/body, success explanation and direct contact links | P0 |
| QA-011 | Impact | Counter values, labels, units, period switch and reduced-motion behavior | P1 |
| QA-012 | Career | Testimonial next/previous, indicators, autoplay, pause behavior and reduced motion | P2 |
| QA-013 | Visual assets | Image loading, alt text, cropping, lazy loading and broken assets | P1 |
| QA-014 | Responsive | No horizontal overflow or obscured content at phone/tablet/desktop widths | P0 |
| QA-015 | Accessibility | Keyboard order, focus visibility, headings/landmarks, contrast, form labels and screen-reader names | P0 |
| QA-016 | External dependencies | Verify map, social, DBN, Deloitte and CBN links and behavior | P1 |
| QA-017 | Static deployment | Verify nested routes and PDF/image assets through production host/CDN | P0 |

## 6. Defect severity

- **Critical:** Site unavailable, unsafe data exposure, or a major public workflow cannot be used.
- **High:** Core content, route, consent choice, policy/document, or form workflow is materially wrong or blocked.
- **Medium:** Important feature has a workaround, or responsive/accessibility defect affects a meaningful group.
- **Low:** Cosmetic/content issue with limited impact.

Every defect report should contain: identifier, title, environment, preconditions, reproduction steps, expected result, actual result, severity, screenshot/log evidence, and retest outcome.

## 7. Known gaps to resolve or formally accept

| Gap | Why it matters | Suggested action |
|---|---|---|
| No automated test runner | Regressions are not checked automatically in CI | Select and configure a unit/e2e stack with the project owner |
| Contact form only changes local UI state | A success message can be mistaken for delivered correspondence | Wire an approved endpoint or replace the success copy with the real handoff behavior |
| Complaints uses `mailto:` | Submission depends on the visitor's email client and sending action | Confirm this is the approved channel or add a server-side intake |
| Publications show a Download affordance without a target | A visible action is not functional | Attach approved publication assets/URLs or remove the affordance |
| Whistleblowing card points to the same Anti-Bribery PDF | The policy identity may be ambiguous to users | Confirm the shared document is intended with the policy owner; otherwise replace the mapping with the approved Whistleblowing PDF |
| Cookie categories have no tracking integration | Preferences are recorded but do not currently gate optional scripts | Implement script gating before analytics/marketing scripts are added |
| Production bundle has a >500 kB minified chunk warning | May affect first-load performance | Profile bundle and prioritize/code-split when acceptable |
| Full accessibility/device/browser test not run | Visual build alone does not establish conformance | Complete manual and automated accessibility checks |

## 8. Release quality gate

Do not mark a release ready until all P0 regression items pass, all high/critical defects are closed or explicitly accepted by the owner, required policy assets are confirmed, form behavior is accurately described, and UAT sign-off is recorded. See [Operations & Release](./operations.md).
