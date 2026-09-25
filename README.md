# LL Match Logger — Windows Desktop App v1.1

This version uses a hidden Chromium window inside the Electron app to load Sky Sports' client-rendered Scores & Fixtures page, then isolates exactly these nine competitions:

- Premier League
- Championship
- League One
- League Two
- WSL
- EFL Trophy
- Carabao Cup
- UEFA Europa League
- UEFA Europa Conference League

It no longer relies on browser CORS or generic public proxies for fixtures. The app loads the dated Sky Sports daily page through the desktop process, waits for Sky's page/data layer to render, then extracts only the selected date and permitted competitions.

## Build on GitHub

1. Replace the repository's `index.html`, `main.js`, `package.json`, and `README.md` with these files.
2. Keep `.github/workflows/build-windows.yml`.
3. Commit the changes.
4. Actions → Build Windows App → Run workflow.
5. Download the `LL-Match-Logger-Windows` artifact.
6. Extract it and run `LL-Match-Logger-1.1.0-portable.exe`.

No Node.js is required on the work laptop.
