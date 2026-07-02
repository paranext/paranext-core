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
```

## Subdirectories

- `comment-assignment/` — tests for assigning comments to users
- `overlay/` — tests for the project-switch transition overlay
