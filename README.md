# MangoAppTakeHome

## Onboarding Roadmap & Status Tracker

A small onboarding dashboard. It needs no build step, package install, or backend.

## Download and run it

1. Open the [MangoAppTakeHome repository](https://github.com/Shri002/MangoAppTakeHome).
2. Select **Code → Download ZIP**, then extract the archive.
3. Open a terminal in the extracted folder containing `index.html`.
4. Start a local web server:

   ```powershell
   py -m http.server 8000
   ```

5. Open <http://localhost:8000> in your browser. Keep the terminal window open while using the app.

If `py` is not available, install Python or use the VS Code Live Server extension.

## Progress and data

This demo saves task completion and templates in the browser's local storage. Each person's browser keeps its own copy; it does not create accounts or send progress to a shared server. A manager and employee on separate computers will not see each other's changes. Multi-device team use requires a backend and sign-in.

## Files

- `index.html` — dashboard markup, styles, and sample onboarding data
- `modal.js` — task views, task details, completion, and local persistence
- `manager.js` — manager dashboard, reusable templates, and assignments
- `manager-preview.html` — the preview entry point, with matching preview script copies
- `manager-preview.js` and `modal-preview.js` — preview copies of the manager and modal scripts
- `README.md` — these setup instructions
