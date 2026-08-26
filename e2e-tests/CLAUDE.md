# E2E Test Instructions

## Where to put new E2E tests

| What you're testing | Where it goes | How to run |
|---|---|---|
| Core happy path (app launch, basic nav) | `tests/smoke/` | `npm run test:e2e:smoke` (also CI) |
| Feature tests, state-mutating flows | `tests/isolated/` | `npm run test:e2e:isolated <subset>` (`all` does not currently pass — see below; the bare form lists the subsets and exits 1) |
| Tests needing real Marble resources | `tests/enhanced-resources/` | app running, then `npx playwright test --config e2e-tests/playwright-cdp.config.ts tests/enhanced-resources/` |

On WSL2, prefix a suite that launches its own Electron with `e2e-tests/run-e2e-wsl.sh --wrap` to
keep its windows off the Windows desktop — e.g.
`e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated find`.

This does nothing for suites that attach to an app you started separately — `fixtures/cdp.fixture.ts`
over port 9223, and the two `*-commands.spec.ts` files' `fixtures/papi-live.fixture.ts` over port
8876. Between them that is all of `tests/enhanced-resources/`, `tests/manage-books/` and
`tests/markers-checklist/`, plus the `title-bar/` and `navigation-history/` isolated subsets. Start
the app with `./.erb/scripts/refresh.sh` — on Linux that already runs it under its own Xvfb — and
run those suites through `playwright-cdp.config.ts`, which has no globalSetup.

`title-bar/` and `navigation-history/` are the exception to the exception: they sit under
`tests/isolated/`, which `playwright-cdp.config.ts` ignores, while the `isolated` project's
globalSetup refuses to start while an app holds port 8876. Until they move or globalSetup gains an
opt-out, there is no way to run them.

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
