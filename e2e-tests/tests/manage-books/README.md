# manage-books E2E Tests

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

### ⚠ This suite mutates REAL project data, and is collected by nothing on purpose

`playwright-cdp.config.ts` now testIgnores `**/manage-books/**`, and this directory is not a project
in `playwright.config.ts`. **Do not remove that exclusion without first giving these specs a
disposable project fixture.**

Three of the four specs here write to whatever real projects the running app has, with no restore:

- `manage-books-journey.spec.ts` selects every visible book and clicks **"Replace entire books"**
  against a rotation pool of real local project short names.
- `manage-books-functional-WP-001.spec.ts` deletes GEN.
- `manage-books-functional-WP-002.spec.ts` creates books through `manageBooks.createBooks`, which
  writes USFM stub files under `~/.platform.bible/projects/Paratext 9 Projects/<project>` that
  survive a restart. Its own `ROTATION_FIXTURES_REQUIRING_MISSING_BOOK` docblock carries the manual
  cleanup procedure, including restoring each project's `Settings.xml` from its `.BAK`.

The fourth, `manage-books-commands.spec.ts`, drives the same book-mutating commands against real
projects, but only down paths that cannot mutate anything: a bogus project id that fails before
touching disk, a permission-denied gate, or a book that is already present and gets filtered out.

`npm run test:e2e-cdp` excludes this directory (`testIgnore` in `playwright-cdp.config.ts`).
Without that exclusion a bare CDP run against a live app can overwrite real project data on the
developer's machine, so do not remove it without giving these specs a disposable project fixture.

**Size:** 4 spec files — 68 `test(...)` declarations and 6 `test.fixme(...)`.
