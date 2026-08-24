# isolated E2E Tests

Feature and state-mutating E2E tests that each run against their own Electron instance.

## What belongs here

- Feature-specific tests that can't share app state with other tests
- Tests that mutate settings, projects, or layout state that would affect later tests if shared
- Tests that need the app in a specific initial state (e.g., a particular interface mode)

## How to run

```bash
# All isolated tests
npm run test:e2e:isolated

# A single file
npx playwright test --config e2e-tests/playwright.config.ts --project=isolated e2e-tests/tests/isolated/<file>.spec.ts

# On WSL2, wrap any of the above to keep Electron windows off the Windows desktop
e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated <subset>
```

## Subdirectories

- `comment-assignment/` — tests for assigning comments to users
- `find/` — tests for the find/replace flow
- `first-run/` — tests for the first-run wizard (PT-4175 / PT-4179)
- `multi-window/` — tests for multi-window lifecycle (second-window startup, focus routing, app-global service hosting takeover, single shutdown-task run on quit), window layout persistence (windows, layouts, and bounds surviving relaunches; a deliberately closed window staying closed; the pre-multi-window single-window upgrade path), and per-window UI isolation (overlays, dialogs, notifications, navigation targets, and web-view placement staying in their own window; scroll groups deliberately app-global)
- `navigation-history/` — tests for back/forward reference history navigation
- `overlay/` — tests for the project-switch transition overlay
- `scroll-groups/` — tests for scroll-group synchronization between scripture editors
- `title-bar/` — tests for title bar layout, e.g. reserved space for native window controls
- `verse-navigation/` — tests for verse navigation keyboard shortcuts
