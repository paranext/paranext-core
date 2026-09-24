# smoke E2E Tests

Fast, CI-wired E2E tests that share a single Electron instance per worker.

## What belongs here

- Core happy-path tests: app launches, basic navigation, fundamental platform behaviors
- Tests that don't mutate persistent state (settings, projects, layout)
- Tests fast enough to run on every PR in CI

## What does NOT belong here

Feature-specific or state-mutating tests belong in `isolated/` instead.

## How to run

```bash
# All smoke tests (also runs in CI)
npm run test:e2e:smoke

# A single file
npx playwright test --config e2e-tests/playwright.config.ts --project=smoke e2e-tests/tests/smoke/<file>.spec.ts
```
