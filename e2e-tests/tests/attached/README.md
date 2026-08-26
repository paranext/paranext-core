# Attached E2E tests

Specs here use `fixtures/cdp.fixture.ts`: they **attach over CDP (port 9223) to an app you started
separately**, rather than launching their own Electron.

That is why they live outside `tests/isolated/`. The `isolated` project's `globalSetup` refuses to
start while port 8876 is bound — which is exactly the state these specs require — so an attach spec
under `tests/isolated/` can never run alongside its launch-based neighbours, and
`npm run test:e2e:isolated all` could not pass while one was there.

## How to run

```bash
./.erb/scripts/refresh.sh          # starts the app with --remote-debugging-port=9223 (under Xvfb on Linux)
npx playwright test --config e2e-tests/playwright-cdp.config.ts tests/attached/
```

`playwright-cdp.config.ts` has no `globalSetup`, so it does not reject the running app. This
directory is collected by it automatically; there is nothing to register.

## What belongs here

Only specs that genuinely cannot launch their own app — normally because they need to observe an app
started with particular arguments, or OS-level window state that a test-managed launch cannot
reproduce.

A spec that _can_ launch its own Electron belongs in `tests/isolated/` instead, where it runs
without a manual setup step. `title-bar-narrow-width.spec.ts` stayed there for that reason even
though it is about the same feature as the spec here.
