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

## What is here

Seventeen spec files, plus `test-helpers.ts` (dock and Enhanced Resource helpers) and
`scripture-text-grid.page.ts` (page helpers for the Text Collection grid). Each has one of two
statuses.

**Runs locally against a prepared app** (7 files). Someone runs them by hand when they change the
feature:

- `scripture-text-grid.spec.ts`, `scripture-text-grid-verse-row.spec.ts`,
  `scripture-text-grid-view-options.spec.ts`, `scripture-text-grid-zoom.spec.ts` and
  `cell-reorder.spec.ts` — the Text Collection grid. `scripture-text-grid.spec.ts` is out of date;
  PT-4779 covers bringing it up to date.
- `enhanced-resource-content-zoom.spec.ts` — content zoom in the Enhanced Resource window.
- `enhanced-resources-image-render.spec.ts` — images render in an Enhanced Resource.

**Parked** (10 files). The Enhanced Resources feature was built experimentally and is still to be
finished (epic PT-2021, "Enhanced Resources"). These files are its written test scenarios, kept so
that work can start from them. They have never run as a whole, no CI job runs them, and some of
their tests are `test.fixme` placeholders for behaviour or fixtures that do not exist yet:

- `enhanced-resources-functional-UI-PKG-001.spec.ts` to `-008.spec.ts` — one file per UI package
  of the Enhanced Resource window (main window shell, and the other seven packages).
- `enhanced-resources-journey.spec.ts` — flows that cross several of those packages.
- `text-collection-schema.spec.ts` — the Text Collection flags and per-user overlay of a project.

Together the parked files declare 136 `test(...)` / `test.fixme(...)` tests, 45 of them
`test.fixme`.

To bring a parked file back into use:

- Start the app in Power mode with the Marble resources the file opens (such as `ESV16UK+`) installed.
- Replace each `test.fixme` with a real test once the behaviour it describes exists, or delete the
  scenario if the design dropped it. Some `test.fixme` bodies name a missing fixture, such as a
  resource with partial book coverage or a pre-release resource.
- For `text-collection-schema.spec.ts`, set `E2E_TEST_PROJECT_ID` to an editable project on which
  you are administrator; the spec skips itself without it.
- Check the selectors and expectations against the current UI, since the specs were written before
  the feature settled, then run the file and fix what fails.
- Move the file out of "parked" here and remove its header comment once it passes.

### What collects this suite

Registered as a project in `playwright.config.ts` (`name: 'enhanced-resources'`) and also collected
by `playwright-cdp.config.ts`, which testIgnores `smoke`, `isolated`, `_example`, and
`manage-books` but not this directory. There is no dedicated npm script, and nothing in CI runs it.
This applies to the parked files too: a bare `npm run test:e2e-cdp` (or `npm run test:e2e:all`,
through the `enhanced-resources` project) lists them next to the others, so run a single file by
name instead.

Registered is not the same as runnable. These specs attach through `fixtures/cdp.fixture.ts`, via
the `enhanced-resources.fixture.ts` wrapper, so they attach to an already-running app and must go
through the CDP config — `playwright.config.ts`'s `globalSetup` rejects the very app they need. They
also need real Marble resources (e.g. `ESV16UK+`) that are not available in CI.

**Start the app in Power mode.** The "Open enhanced resource" main menu item is hidden in both
modes, so the specs open the window with the `platformEnhancedResources.openEnhancedResource`
command (`openEnhancedResource` in `test-helpers.ts`). The suite's layout is written for Power:
`enhanced-resources.fixture.ts` declares `requiredInterfaceMode: 'power'`, and attaching to a
Simple-mode app fails fast with that message. Set
`'platform.interfaceMode': 'power'` in `dev-appdata/data/settings.json` before starting the app.

The `no-silent-skips` reporter (`e2e-tests/reporters/`) fails a run in which tests are reported
skipped that nobody asked to skip, so a run of this suite is watched by it.

**Size:** 17 spec files — 171 `test(...)` declarations in all, of which 45 are `test.fixme(...)`;
the 7 locally-run files hold 35 and no `test.fixme(...)`.
