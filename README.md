# MangoAppTakeHome

## Onboarding Roadmap & Status Tracker

A small, static onboarding dashboard. It needs no build step, package install, or backend.

## Run it on your computer

1. Download or clone this folder.
2. Open a terminal in the folder containing `index.html`.
3. Start a local web server:

   ```powershell
   py -m http.server 8000
   ```

   If `py` is not available, install Python or use the VS Code Live Server extension.
4. Open <http://localhost:8000> in your browser. Keep the terminal window open while using the app.

## Publish it with GitHub Pages

1. Create a new repository on GitHub, for example `onboarding-roadmap`.
2. Add the four files in this folder to the repository root: `index.html`, `modal.js`, `manager.js`, and `README.md`. You can use **Add file → Upload files** on GitHub, or use Git to push the folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. When deployment finishes, GitHub shows the site URL in the Pages settings. It will usually look like `https://YOUR-USERNAME.github.io/onboarding-roadmap/`.

GitHub's current guide: [Configure a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Progress and data

This demo saves task completion and templates in the browser's local storage. Each person's browser keeps its own copy; it does not create accounts or send progress to a shared server. A manager and employee on separate computers will not see each other's changes. Multi-device team use requires a backend and sign-in.

## Files

- `index.html` — dashboard markup, styles, and sample onboarding data
- `modal.js` — task views, task details, completion, and local persistence
- `manager.js` — manager dashboard, reusable templates, and assignments
- `README.md` — these setup instructions
