# isolated E2E Tests

Feature and state-mutating E2E tests that do not share an Electron instance with other suites.
How each subset gets its app differs — see "Subdirectories" below.

## What belongs here

- Feature-specific tests that can't share app state with other tests
- Tests that mutate settings, projects, or layout state that would affect later tests if shared
- Tests that need the app in a specific initial state (e.g., a particular interface mode)

## How to run

```bash
# Every subset. Does not currently pass end to end — title-bar/ and navigation-history/ attach
# to a running app, which this project's global setup refuses to start alongside (it aborts when
# port 8876 is bound). Run the other subsets individually.
# The bare form runs nothing: it lists the subsets and exits 1.
npm run test:e2e:isolated all

# A single file
npx playwright test --config e2e-tests/playwright.config.ts --project=isolated e2e-tests/tests/isolated/<file>.spec.ts

# On WSL2, wrap a subset that launches its own Electron to keep its windows off the desktop.
# Not title-bar/ or navigation-history/ — those use fixtures/cdp.fixture.ts and attach to an app
# started separately by ./.erb/scripts/refresh.sh, which already runs it under its own Xvfb.
e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated <subset>
```

## Subdirectories

- `comment-assignment/` (one Electron per worker) — tests for assigning comments to users
- `find/` (one Electron per worker) — tests for the find/replace flow
- `first-run/` — tests for the first-run wizard (PT-4175 / PT-4179)
- `multi-window/` — tests for multi-window lifecycle (second-window startup, focus routing, app-global service hosting takeover, single shutdown-task run on quit), window layout persistence (windows, layouts, and bounds surviving relaunches; a deliberately closed window staying closed; the pre-multi-window single-window upgrade path), and per-window UI isolation (overlays, dialogs, notifications, navigation targets, and web-view placement staying in their own window; scroll groups deliberately app-global)
- `navigation-history/` (attaches over CDP; see "How to run") — tests for back/forward reference history navigation
- `overlay/` — tests for the project-switch transition overlay
- `scroll-groups/` — tests for scroll-group synchronization between scripture editors
- `title-bar/` (attaches over CDP; see "How to run") — tests for title bar layout, e.g. reserved space for native window controls
- `verse-navigation/` (one Electron per worker) — tests for verse navigation keyboard shortcuts
