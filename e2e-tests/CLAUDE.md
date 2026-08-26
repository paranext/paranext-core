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
`tests/markers-checklist/`, plus the `title-bar/` isolated subset. Start the app with
`./.erb/scripts/refresh.sh` — on Linux that already runs it under its own Xvfb — and run those
suites through `playwright-cdp.config.ts`, which has no globalSetup.

`title-bar/` is the exception to the exception: it sits under `tests/isolated/`, which
`playwright-cdp.config.ts` ignores, while the `isolated` project's globalSetup refuses to start
while an app holds port 8876. Until it moves or globalSetup gains an opt-out, there is no way to
run it.

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

## State that leaks between runs

None of this is visible in CI: CI runs on a fresh checkout with no `dev-appdata/`, so it always
sees defaults while a developer machine accumulates residue. "Green in CI, red for me" is usually
one of these.

- **`preConfigureSettings` MERGES into `dev-appdata/data/settings.json` and only restores in an
  `afterAll`.** A run killed before teardown never restores. The three `multi-window` specs pin
  `'platform.interfaceMode': 'power'`, so a killed multi-window run leaves the whole checkout in
  Power mode. A suite that pins nothing inherits it. With no pin at all the app falls back to
  `'simple'` (`src/renderer/hooks/use-interface-mode.hook.ts`).
  - Check it first when a suite behaves differently than it did yesterday: `cat dev-appdata/data/settings.json`
  - A suite that depends on a mode should pin it AND declare `test.use({ requiredInterfaceMode })`,
    which asserts the pin took effect against `document.body[data-interface-mode]` instead of
    failing later on an element the other mode never renders.
- **Find search history persists to `dev-appdata/extensions/platformScripture/user-data/`**, caps at
  15 entries, and survives the test, the Electron process, and the whole run. A history assertion
  that passed yesterday can fail today on what an earlier run left behind.

## Reading a failing run

- **`Window URL: chrome-error://chromewebdata/`** — the renderer dev server on port 1212 is dead;
  the app cannot load anything. Every subsequent test fails at its full timeout. This is an
  environment failure, not a branch regression. Its output is captured at
  `e2e-tests/.dev-server.log`.
- **A whole file reported "did not run" / "skipped"** — a worker died. Read the FIRST failing test in
  that file; the skips are downstream of it. The `no-silent-skips` reporter fails a run in which
  tests are reported skipped that nobody asked to skip.
- **`%localization_key%` text in a failure screenshot** — the assertion ran before the localization
  data provider answered. `waitForAppReady` does not cover this. The raw keys are WIDER than the
  strings they stand for, so geometry assertions report overflow that is not real.
- **Fail-then-pass is reported as "flaky", and flaky is a defect.** `retries` is 1 locally and 2 in
  CI. Never re-run to get green: an order-dependent test is telling you it depends on state it does
  not control.

## Window size and DevTools

- Docked DevTools takes ~555px out of the renderer's layout viewport, so an 800px window lays the
  title bar out in 245px and every geometry assertion is wrong. Launch with `PT_NO_DEVTOOLS=true`.
- `--maximize` is a no-op under a bare Xvfb — there is no compositor to honour it. Pass an explicit
  size.
- The size must be its own argv token: `--window-size 1920x1080`. The `--window-size=WxH` form never
  matches, because the flag is looked up by exact token (`src/node/utils/command-line.util.ts`).

## Killing a run

**Killing Electron is not killing the run.** Playwright respawns it. Kill the runner tree from the
`xvfb-run`/`npm` root, then confirm with `pstree` that nothing survives. A surviving runner keeps
spawning Electron on `:0`, outside any Xvfb wrapper, alongside a correctly wrapped run — which looks
exactly like the wrapper having failed.

Ports are shared across sessions and worktrees: 8876 (PAPI), 1212 (renderer dev server), 9223 (CDP).
The `isolated` project's globalSetup refuses to start while 8876 is bound. `npm stop` kills by
process NAME machine-wide and will take out another session's app, so identify the owner first with
`readlink /proc/<pid>/cwd`.

## Inspecting an Xvfb display

```bash
# xvfb-run's display needs its own auth file, or these fail with "Authorization required"
XAUTHORITY=$(pgrep -af 'Xvfb :99' | grep -oP -- '-auth \K[^ ]+') xlsclients -display :99
XAUTHORITY=$(pgrep -af 'Xvfb :99' | grep -oP -- '-auth \K[^ ]+') xwininfo -display :99 -root -children
```

`xvfb-run --auto-servernum` silently moves to the next free number when one is taken. **Pin the
display (`xvfb-run -n 105`) before concluding anything from what is on it** — otherwise you may be
reading another session's run.
