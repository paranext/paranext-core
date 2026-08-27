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

# Run the tests. There is no dedicated npm script; these specs attach over CDP, so they go through
# playwright-cdp.config.ts, which has no globalSetup to reject the running app.
npx playwright test --config e2e-tests/playwright-cdp.config.ts tests/enhanced-resources/
```

These tests are **not** wired into CI (`test:e2e:smoke`).

## These tests have never run

No configuration has been found in which this suite runs to completion, and it is not part of any
routine test run. Nothing reports on it, so nothing notices when the app changes underneath it: the
tests here have silently absorbed fixture refactors, menu-label renames, a Tailwind prefix
migration, and UI redesigns without anyone seeing a failure.

**Read anything below as a record of intent, not as coverage.** A test in this directory passing
review is not evidence the behaviour it describes works, and its absence of failures is not evidence
of health.

The `no-silent-skips` reporter (`e2e-tests/reporters/`) exists to stop exactly this from recurring —
it fails a run in which tests are reported skipped that nobody asked to skip. It can only see suites
that are actually collected, which is why this one is invisible to it.

Whether to fix, delete, or keep these is an open decision.

### What collects this suite today

Registered as a project in `playwright.config.ts` (`name: 'enhanced-resources'`) and also collected
by `playwright-cdp.config.ts`, which testIgnores `smoke`, `isolated`, `_example`, and
`manage-books` but not this directory. There is no dedicated npm script.

Registered is not the same as runnable. These specs use `fixtures/cdp.fixture.ts`, so they attach to
an already-running app and must go through the CDP config — `playwright.config.ts`'s `globalSetup`
rejects the very app they need. They also need real Marble resources (e.g. `ESV16UK+`) that are not
available in CI. Two specs are additionally quarantined from type-checking in
`e2e-tests/tsconfig.json`.

**Size:** 15 spec files — 113 `test(...)` declarations and 45 `test.fixme(...)`. The `fixme` ones
cannot run even in principle; they are disabled by their own authors.
