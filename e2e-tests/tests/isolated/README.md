# isolated E2E Tests

Feature and state-mutating E2E tests that do not share an Electron instance with other suites.
How each subset gets its app differs — see "Subdirectories" below.

## What belongs here

- Feature-specific tests that can't share app state with other tests
- Tests that mutate settings, projects, or layout state that would affect later tests if shared
- Tests that need the app in a specific initial state (e.g., a particular interface mode)

## How to run

```bash
# Every subset. Does not currently pass end to end — title-bar/ attaches to a running app, which
# this project's global setup refuses to start alongside (it aborts when port 8876 is bound).
# Run the other subsets individually.
# The bare form runs nothing: it lists the subsets and exits 1.
npm run test:e2e:isolated all

# A single file, or any path — this also reaches the specs directly under tests/isolated/, which
# belong to no subset because run-isolated.mjs derives subsets from directories only
npm run test:e2e:isolated tests/isolated/comments-tab.spec.ts
npx playwright test --config e2e-tests/playwright.config.ts --project=isolated e2e-tests/tests/isolated/<file>.spec.ts

# On WSL2, wrap a subset that launches its own Electron to keep its windows off the desktop.
# Not title-bar/ — it uses fixtures/cdp.fixture.ts and attaches to an app started separately by
# ./.erb/scripts/refresh.sh, which already runs it under its own Xvfb.
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
- `multi-window/` (one Electron per test, except `window-layout-persistence.spec.ts`, which uses no
  fixture and calls `launchElectronApp` itself — several launches per test to exercise relaunch) — tests for multi-window lifecycle (second-window startup, focus routing, app-global scroll group and theme state reaching every window and surviving any window's close, single shutdown-task run on quit), window layout persistence (windows, layouts, and bounds surviving relaunches; a deliberately closed window staying closed; the pre-multi-window single-window upgrade path), and per-window UI isolation (overlays, dialogs, notifications, navigation targets, and web-view placement staying in their own window; scroll groups deliberately app-global)
- `overlay/` (one Electron per test) — tests for the project-switch transition overlay
- `scroll-groups/` (one Electron per test) — tests for scroll-group synchronization between scripture editors
- `title-bar/` (attaches over CDP; see "How to run") — tests for title bar layout, e.g. reserved space for native window controls
- `verse-navigation/` (one Electron per worker) — tests for verse navigation keyboard shortcuts
