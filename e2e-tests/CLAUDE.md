# E2E Test Instructions

## Where to put new E2E tests

| What you're testing | Where it goes | How to run |
|---|---|---|
| Core happy path (app launch, basic nav) | `tests/smoke/` | `npm run test:e2e:smoke` (also CI) |
| Feature tests, state-mutating flows | `tests/isolated/` | `npm run test:e2e:isolated` |
| Tests needing real Marble resources | `tests/enhanced-resources/` | `npx playwright test --config e2e-tests/playwright.config.ts --project=enhanced-resources` |

On WSL2, prefix a suite that launches its own Electron with `e2e-tests/run-e2e-wsl.sh --wrap` to
keep its windows off the Windows desktop — e.g.
`e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated find`.

This does nothing for suites built on `fixtures/cdp.fixture.ts`, which attach over port 9223 to an
app you started separately: all of `tests/enhanced-resources/`, plus the `title-bar/` and
`navigation-history/` isolated subsets. Start those with `./.erb/scripts/refresh.sh`, which on
Linux already runs the app under its own Xvfb.

**Feature-specific isolated tests belong in `tests/isolated/`** — not in their own directory.
The `isolated` project covers the whole `tests/isolated/` tree, so a new spec file there is
immediately discoverable and runnable without any config changes.

Only create a new top-level directory under `tests/` if the tests genuinely cannot share a
project entry with `isolated/` (e.g., they need a completely different fixture or launch
strategy). If you do, register a named project in `playwright.config.ts` — see
`enhanced-resources` as the template — and add a `test:e2e:<name>` npm script if the suite is
meant to be run routinely.

## What NOT to do

- Do not put feature tests in `smoke/` — smoke tests are for the core happy path and must stay
  fast and CI-green.
- Do not use `manage-books/` or `markers-checklist/` as models — those are legacy AI-porting
  experiments not wired into any standard test run. See the README in each directory.
- Do not create a new top-level directory just to give a feature its own folder; prefer adding
  a well-named spec file to `isolated/` instead.
