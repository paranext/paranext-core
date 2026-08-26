# markers-checklist E2E Tests

> **Note:** These tests are experimental and were generated as part of an AI-assisted
> porting workflow. See below for what actually collects them, and what that means.

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

Collected only by `playwright-cdp.config.ts`, which testIgnores `smoke`, `isolated`, `_example`, and
`manage-books` but not this directory. It is not a project in `playwright.config.ts`, so
`test:e2e:all` does not see it, and there is no dedicated npm script.

**Size:** 5 spec files — 43 `test(...)` declarations and 3 `test.fixme(...)`.
