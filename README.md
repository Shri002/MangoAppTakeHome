# MangoAppTakeHome

## Onboarding Roadmap & Status Tracker

A small onboarding dashboard. It needs no build step, package install, or backend.

## Download and run it

1. Open the [MangoAppTakeHome repository](https://github.com/Shri002/MangoAppTakeHome).
2. Select **Code → Download ZIP**, then extract the archive.
3. Open a terminal in the extracted folder.
4. Start a local web server:

   ```powershell
   py -m http.server 8000
   ```

5. Open <http://localhost:8000/manager-preview.html> in your browser. This is the selected manager preview. Keep the terminal window open while using the app.

If `py` is not available, install Python or use the VS Code Live Server extension, then open `manager-preview.html`.

## Progress and data

This demo saves task completion and templates in the browser's local storage. Each person's browser keeps its own copy; it does not create accounts or send progress to a shared server. A manager and employee on separate computers will not see each other's changes. Multi-device team use requires a backend and sign-in.

## Files

- `manager-preview.html` — selected dashboard entry point
- `manager-preview.js` and `modal-preview.js` — scripts used by the preview
- `index.html`, `manager.js`, and `modal.js` — alternate entry point and scripts
- `README.md` — these setup instructions
