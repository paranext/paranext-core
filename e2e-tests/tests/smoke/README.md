# smoke E2E Tests

Fast, CI-wired E2E tests that share a single Electron instance per worker, except the bare-Electron
checks below, which launch their own.

## What belongs here

- Core happy-path tests: app launches, basic navigation, fundamental platform behaviors
- Tests that don't mutate persistent state (settings, projects, layout)
- Tests fast enough to run on every PR in CI
- Platform-level regression specs that launch a bare Electron of their own (not the app) to pin an
  Electron/Chromium behavior the app depends on and that the dev app cannot show — e.g.
  `window-zoom.spec.ts`. Keep them fast and state-free, and show a window only when the behavior
  depends on whether it is shown.

## What does NOT belong here

Feature-specific or state-mutating tests belong in `isolated/` instead.

## How to run

```bash
# All smoke tests (also runs in CI)
npm run test:e2e:smoke

# A single file
npx playwright test --config e2e-tests/playwright.config.ts --project=smoke e2e-tests/tests/smoke/<file>.spec.ts
```
