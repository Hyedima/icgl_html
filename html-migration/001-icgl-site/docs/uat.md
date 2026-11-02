# User Acceptance Testing Plan

**System:** ICGL public website  
**Document baseline:** 28 September 2026  
**UAT status:** Scenarios prepared; business execution and sign-off pending

## 1. Purpose

UAT confirms the website supports the public information and navigation tasks expected by MSMEs, PFIs, media, job seekers, and other visitors. A technical build or developer smoke test is not business acceptance.

## 2. Participants and responsibilities

- **Business owner:** confirms terminology, claims, metric values, contact details, official policy documents, and final acceptance.
- **UAT coordinator:** prepares test data/browser, records pass/fail, raises defects, and obtains evidence.
- **Representative users:** complete visitor tasks without developer assistance where possible.
- **Developer/release owner:** investigates defects and provides a candidate build for retest.

## 3. Environment and prerequisites

Record the candidate URL/build ID, date, browser/version, operating system, screen size, and tester for each execution. For local review, run `npm run dev`; for release acceptance, use a deployed staging URL.

Before starting:

1. Clear site local storage or use a fresh browser profile for first-visit consent cases.
2. Confirm all approved copy, impact figures, images, PDF files, email/phone details, social links, and map location.
3. Use a test email client or do not submit real personal information to `mailto:` actions.
4. Ensure screenshots contain no real user/customer data.
5. Confirm with the policy owner whether the Anti-Bribery & Corruption PDF is also the intended Whistleblowing policy document; supply the correct separate file if it is not.

## 4. User scenarios

| ID | Persona / task | Steps | Expected result | Priority | Status |
|---|---|---|---|---|---|
| UAT-01 | First-time visitor reviews consent | Open the site with clean storage; inspect options; accept or reject optional categories | Consent panel is clear, usable, describes optional choices and closes after saving | P0 | Pending business execution |
| UAT-02 | Returning visitor changes choice | Reopen Cookie settings; customize a category; save; reload and reopen | Saved settings persist and can be changed; necessary storage remains on | P0 | Pending business execution |
| UAT-03 | MSME learns about offerings | Open Services; identify Individual, Blanket, Portfolio and assistance offers | Each offering is understandable, imagery relevant, CTA destination correct | P1 | Pending |
| UAT-04 | PFI checks eligibility | Use Check eligibility and review criteria | Eligibility information is clear and linked correctly | P0 | Pending |
| UAT-05 | Visitor explores impact | Open Impact; inspect reporting date/period, metric values and stories | Values, units and as-of date match approved data; animations do not obstruct reading | P0 | Pending |
| UAT-06 | Visitor searches news | Search a known word; filter by year and category; clear filters; enter a no-match term | Results update correctly, result count and empty state are understandable | P1 | Developer smoke sample passed; full UAT pending |
| UAT-07 | Visitor searches publications | Combine year/category/keyword filters; inspect a publication action | Correct publication is shown and the Download action opens the approved file | P0 | Pending; downloads need targets |
| UAT-08 | Visitor reads policies | Open each policy action, including Whistleblowing | Correct approved PDF opens in a new tab and is readable | P0 | Pending; policy owner must verify shared PDF mapping |
| UAT-09 | Visitor contacts ICGL | Enter required details, check privacy consent, submit; use contact links | Validation works; UI accurately explains whether message was sent or handed off | P0 | Pending; contact form has no backend |
| UAT-10 | Visitor raises complaint | Complete category/message, submit using the provided action | Prepared message is addressed correctly and user understands they must send it | P0 | Pending; mail client required |
| UAT-11 | Visitor uses mobile navigation | At phone width, open Resources menu, follow a route, reopen/close menu | Menu is operable, content remains visible, no horizontal overflow | P0 | Pending |
| UAT-12 | Keyboard/screen-reader user navigates | Use keyboard only through menus, forms, consent and filters | Visible focus, logical order, named controls, readable status feedback | P0 | Pending |
| UAT-13 | Reduced-motion visitor views animation | Enable OS reduced-motion setting; visit animated pages | Essential content remains available; nonessential motion is suitably reduced | P1 | Pending |
| UAT-14 | Visitor checks location and external links | Use map, phone, email, social and partner links | Correct destinations open; address and pin are accurate | P1 | Pending |

## 5. Acceptance criteria

The business owner may accept the candidate when:

- All P0 scenarios pass on the agreed staging build.
- The content, service terminology, contact information, impact values, policy mappings, and footer trust marks are approved.
- The full end-user behavior of contact, complaint, publication-download, and consent flows matches their labels and privacy commitments.
- No open Critical/High defect remains, unless the accountable owner documents an explicit exception, impact, workaround and target date.
- Responsive and accessibility checks are complete for agreed devices/browsers.
- The final accepted build identifier and deployment URL are recorded below.

## 6. Execution record and sign-off

| Field | Value |
|---|---|
| Staging URL | To be completed |
| Build/release identifier | To be completed |
| UAT start/end | To be completed |
| Browsers/devices | To be completed |
| Open defects / accepted exceptions | To be completed |
| Business owner decision | Pending |
| Name / role | To be completed |
| Date | To be completed |

Record each scenario outcome as **Pass**, **Fail**, **Blocked**, or **Not Run**. Attach screenshots without personal data and link defects to their reproduction record.
