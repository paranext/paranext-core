# E2E Test Instructions

## Where to put new E2E tests

| What you're testing | Where it goes | How to run |
|---|---|---|
| Core happy path (app launch, basic nav) | `tests/smoke/` | `npm run test:e2e:smoke` (also CI) |
| Feature tests, state-mutating flows | `tests/isolated/` | `npm run test:e2e:isolated` |
| Tests needing real Marble resources | `tests/enhanced-resources/` | `npm run test:e2e:enhanced-resources` |

**Feature-specific isolated tests belong in `tests/isolated/`** — not in their own directory.
The `isolated` project covers the whole `tests/isolated/` tree, so a new spec file there is
immediately discoverable and runnable without any config changes.

Only create a new top-level directory under `tests/` if the tests genuinely cannot share a
project entry with `isolated/` (e.g., they need a completely different fixture or launch
strategy). If you do, register a named project in `playwright.config.ts` and add a
`test:e2e:<name>` npm script — see `enhanced-resources` as the template.

## What NOT to do

- Do not put feature tests in `smoke/` — smoke tests are for the core happy path and must stay
  fast and CI-green.
- Do not use `manage-books/` or `markers-checklist/` as models — those are legacy AI-porting
  experiments not wired into any standard test run. See the README in each directory.
- Do not create a new top-level directory just to give a feature its own folder; prefer adding
  a well-named spec file to `isolated/` instead.
