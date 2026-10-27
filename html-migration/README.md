# ICGL HTML project

This is the editable, framework-free HTML/CSS/JavaScript version of the ICGL
website. Pages, shared navigation/footer interactions, page styling, motion,
videos, and image assets are maintained as source files in this folder. The
React app remains a separate project at the repository root.

## Run locally

From the repository root:

```powershell
node html-migration/server.js
```

Open http://localhost:4173. The server serves the source HTML documents and
supports the React app's public routes as well as direct refreshes on those
routes. To edit content, update the relevant `.html` file; shared presentation
is in `styles.css` and `pages/`, while shared navigation, footer, and browser
interactions are in `interaction.js`.

The public pages work without the React runtime. Contact-message submission and
admin authentication require the application's API backend. Configure the API
base URL with the `icgl-api-base` meta tag on the relevant page; it defaults to
`http://localhost:5000/api`.
