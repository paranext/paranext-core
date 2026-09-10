# isolated E2E Tests

Feature and state-mutating E2E tests that do not share an Electron instance with other suites.
How each subset gets its app differs — see "Subdirectories" below.

## What belongs here

- Feature-specific tests that can't share app state with other tests
- Tests that mutate settings, projects, or layout state that would affect later tests if shared
- Tests that need the app in a specific initial state (e.g., a particular interface mode)

## How to run

```bash
# Every subset. Every spec here launches its own Electron, so this runs as one command.
# The bare form runs nothing: it lists the subsets and exits 1.
npm run test:e2e:isolated all

# A single file, or any path — this also reaches the specs directly under tests/isolated/, which
# belong to no subset because run-isolated.mjs derives subsets from directories only
npm run test:e2e:isolated tests/isolated/comments-tab.spec.ts
npx playwright test --config e2e-tests/playwright.config.ts --project=isolated e2e-tests/tests/isolated/<file>.spec.ts

# On WSL2, wrap a subset to keep its windows off the desktop. Everything here launches its own
# Electron, so the wrap applies to all of it.
e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated <subset>
```

## Spec files directly under `tests/isolated/`

These belong to no subset; run them by path (see "How to run").

- `comments-tab.spec.ts` (one Electron per worker)
- `first-run-wizard.spec.ts` (one Electron per test)
- `internet-settings.spec.ts` (one Electron per test)

## Subdirectories

- `comment-assignment/` (one Electron per worker) — tests for assigning comments to users
- `find/` (one Electron per worker) — tests for the find/replace flow
- `first-run/` (one Electron per test) — tests for the first-run wizard (PT-4175 / PT-4179)
- `multi-window/` (one Electron per test, except `window-layout-persistence.spec.ts` and two tests
  in `window-close-rule.spec.ts`, which use no fixture and call `launchElectronApp` themselves —
  several launches per test to exercise relaunch) — tests for multi-window lifecycle (second-window startup, focus routing, app-global scroll group and theme state reaching every window and surviving any window's close, single shutdown-task run on quit), window layout persistence (windows, layouts, and bounds surviving relaunches; a deliberately closed window staying closed; the pre-multi-window single-window upgrade path), and per-window UI isolation (overlays, dialogs, notifications, navigation targets, and web-view placement staying in their own window; scroll groups deliberately app-global)
- `navigation-history/` (one Electron per test) — tests for back/forward reference history navigation
- `overlay/` (one Electron per test) — tests for the project-switch transition overlay
- `scroll-groups/` (one Electron per test) — tests for scroll-group synchronization between scripture editors
- `title-bar/` (one Electron per test) — tests for title bar layout at narrow window widths. The reserved-space spec, which attaches to a running app, lives in `tests/attached/`
- `verse-navigation/` (one Electron per worker) — tests for verse navigation keyboard shortcuts

## Running on Windows

Run the suite the same way as anywhere else, from a normal PowerShell or cmd prompt:

```
npm run test:e2e:isolated all
```

Each test launches and tears down its own app window. Windows has no Xvfb equivalent to keep those
windows off the desktop, so expect them to open and close in front of you for the whole run — leave
the machine alone and keep the session unlocked while it runs. A locked session (Win+L), or anything
else that steals focus, breaks the tests that assert real window focus (the `multi-window` subset).

A healthy teardown prints `[teardown] Port 8876 is free` between tests, with no `still in use` or
`EBUSY` lines.

### If it goes wrong

- **Tests fail at their full timeout one after another, some passing only on the automatic
  retry** — usually alongside `PAPI websocket server failed to bind: listen EADDRINUSE: address
already in use ::1:8876` in the new app's log and `Settings service undefined` in the test
  output. This means something is still holding port 8876 — an app instance you started
  separately, or an orphan left by a run that crashed or was interrupted with Ctrl+C. Find and
  clear it:
  ```
  netstat -ano | findstr :8876
  tasklist /FI "IMAGENAME eq electron.exe"
  npm run stop
  ```
  `npm run stop` stops every app and dotnet process on the machine by name, so use it only once
  nothing else on the machine needs them running.
- **Leftover `%LOCALAPPDATA%\Temp\paranext-e2e-*` folders** are safe to delete once no app is
  running — each one is a temporary profile from a past run.
- **A test that fails only around window focus or activation** — check whether the session was
  locked or another window stole focus during the run.
- **A test reported as "skipped"** means its worker died, not that it was intentionally excluded —
  treat it as a failure and read the first failing test in that file.
