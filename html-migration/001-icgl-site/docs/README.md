# ICGL Website Documentation

**System:** Impact Credit Guarantee Limited (ICGL) website  
**Documentation baseline:** 28 September 2026  
**Status:** Implementation and local-build documentation; production deployment and business acceptance are not certified by this document set.

## Document index

| Document | Purpose |
|---|---|
| [Architecture](./architecture.md) | System context, application structure, routes, data flow, integrations, and constraints |
| [Quality Assurance](./quality-assurance.md) | QA strategy, test levels, regression scope, quality gates, and known risks |
| [UAT Plan](./uat.md) | Business-facing scenarios, expected results, acceptance criteria, and sign-off sheet |
| [Test Evidence](./test-evidence.md) | Checks run for this documentation baseline and their recorded outcomes |
| [Operations & Release](./operations.md) | Local setup, build, deployment assumptions, release checks, and maintenance |
| [Stakeholder report (Word)](./ICGL-Website-Stakeholder-Report.docx) | Consolidated architecture, SQA, UAT, test evidence, screenshots, and operations report |
| [Website screenshots](./images/) | Locally captured screenshots referenced by the test evidence |

To regenerate the Word report on Windows, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\docs\generate-word-report.ps1
```

## Reading the status correctly

- **Passed** means the described check was executed in the local development environment and produced the recorded result.
- **Pending** means the check still needs to be performed by a responsible tester or business user.
- **Known limitation** means the behavior is present in the current source and should be addressed or explicitly accepted before the affected workflow is relied on in production.
- Screenshots are visual evidence for the local build, not a substitute for an accessibility audit, cross-browser test, or production check.

## Current release blockers / decisions to resolve

1. Contact message submission is a front-end-only success state; no server submission is configured.
2. Complaints submission relies on the visitor's email application (`mailto:`); delivery is not confirmed by ICGL's server.
3. Publication cards render a Download label but do not currently link to publication files.
4. The Whistleblowing Policy card currently links to the Anti-Bribery & Corruption PDF; confirm with the policy owner that this is the intended document, or provide the approved Whistleblowing PDF.
5. Cookie preferences are stored in local storage, but optional categories are not connected to analytics or marketing scripts in this repository.
6. No automated unit, integration, or end-to-end test runner is configured in `package.json`.

These are documented implementation boundaries, not assertions that the system is ready for production.
