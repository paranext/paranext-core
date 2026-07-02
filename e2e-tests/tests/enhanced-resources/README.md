# enhanced-resources E2E Tests

Local-only E2E tests that require real Marble resources (e.g., ESV16UK+) unavailable in CI.

## What belongs here

Tests that exercise features requiring licensed or large external resources that cannot be
included in the repository or CI environment.

## Prerequisites

- A local Platform.Bible installation with the required Marble resources installed
- The app running with CDP enabled: `./.erb/scripts/refresh.sh`

## How to run

```bash
# Boot the app with CDP enabled (once)
./.erb/scripts/refresh.sh

# Run the tests
npm run test:e2e:enhanced-resources
```

These tests are **not** wired into CI (`test:e2e:smoke`).
