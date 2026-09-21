# ICGL HTML/CSS Migration

A dependency-free multi-page HTML, CSS, and JavaScript conversion of the ICGL React/Vite experience. Every public and admin route has its own HTML document. The existing React project remains untouched.

## Run

From this folder on Windows:

```bash
node server.js
```

Then visit http://localhost:4173.

The public UI, responsive navigation, FAQ interaction, contact form state, admin sign-in state, and admin workspace shell are included. API-backed content remains represented by the same UI contracts and can be connected in the next migration phase.

Direct documents include `index.html`, `about.html`, `services.html`, `impact.html`, `eligibility.html`, `career.html`, `contact.html`, the `resources-*.html` pages, `admin.html`, and `admin-sign-in.html`.
