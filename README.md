# LL Match Logger — Windows Desktop Build

This package converts the Sky Sports logger into a Windows desktop application using Electron. The renderer keeps the existing logger UI, while Sky Sports HTTP requests are made by the desktop main process rather than browser JavaScript, removing browser CORS as the fixture-fetching bottleneck.

## Build without Node on the work laptop

The included GitHub Actions workflow builds a portable Windows `.exe` on Microsoft's hosted Windows runner. You do not need Node on the work laptop.

1. Create a private GitHub repository.
2. Upload the contents of this folder.
3. Open **Actions** → **Build Windows App** → **Run workflow**.
4. When it finishes, open the workflow run and download the **LL-Match-Logger-Windows** artifact.
5. Inside it is `LL-Match-Logger-1.0.0-portable.exe`.

The app is portable: it is designed to run by double-clicking the EXE without installing Node or npm.

## Important network test

The desktop bridge only requests `https://www.skysports.com/...`. It does not use BBC or public CORS proxies. If the Sky corporate network blocks the domain itself, the app will still be unable to retrieve Sky data; that is a network-policy issue rather than a browser CORS issue.
