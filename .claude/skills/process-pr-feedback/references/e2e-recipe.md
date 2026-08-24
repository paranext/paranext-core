# The one correct way to run e2e locally

Used by **P5 — Verify effectiveness**. Read the whole thing before the first attempt, and pass
it to any agent that will run e2e — verbatim or by file path. Per-brief rule-passing is not
enough; every agent that rediscovers these live burns 20–60 minutes of visible thrash.

> *Provenance: copied from the session-memory reference `e2e-run-recipe` (2026-08-07), written
> after an agent was watched thrashing through a stuck → fail → self-kill → restart loop.*
>
> **The dated specifics below are 2026-08 snapshots, not current state** — the suite path, the
> "known pre-existing local failures" list, and the claim about which branch carries the
> multi-window suite. Read the method as live and every named suite as historical; "Reading this
> in a fresh checkout" at the end says how to re-derive each one.

---

Hard-learned recipe for local e2e runs (multi-window era, 2026-08), written after an agent was
watched thrashing (stuck → fail → self-kill → restart loop) and called out for it; per-brief
rule-passing was not enough — every e2e-running agent must get this WHOLE recipe, verbatim or by
file pointer.

**Invocation** — prefer the repo's own wrapper, from the worktree root:

```bash
npm run test:e2e:isolated                 # lists the subsets that exist, runs nothing
npm run test:e2e:isolated <subset>        # runs one, e.g. scroll-groups
npm run test:e2e:isolated <subset> -- --workers=1
```

`e2e-tests/run-isolated.mjs` already supplies `--config e2e-tests/playwright.config.ts` and
`--project=isolated`, enumerates the real subset directories, and fails with the actual list on
an unknown name instead of a silent "no tests found". Use it rather than reconstructing the
command.

`--project=isolated` matters because `e2e-tests/playwright.config.ts` defines three projects —
`smoke`, `isolated` and `enhanced-resources` — as plain `testDir` splits. Omitting it runs all
three, including `enhanced-resources`, which needs real Marble resources that are not present
locally or in CI. Neither config declares a `webServer`, so a failure to connect is about which
projects ran and whether the app is up, not about a dev server that did not start;
`.context/standards/Testing-Guide.md` § Running E2E Tests attributes *that* symptom to a missing
`--config`, which is a different flag and a different failure. Do not conflate them.

The raw form, for when a flag the wrapper does not pass through is needed:
`npx playwright test --config e2e-tests/playwright.config.ts --project=isolated <suite-path> --workers=1`
— never omit `--project=isolated`; always `--workers=1` locally;
output redirected to a file; NO outer timeout wrapper (first Electron launch after a rebuild
takes 60–90 s and reads as a hang).

**Before any attempt — full cleanup once:** `npm stop` from the root of any paranext-core
checkout (it kills by process name, so it stops an app launched from a different one); verify
8876/9223/1212 free (`ss -ltn` on Linux, `lsof -iTCP -sTCP:LISTEN -P` on macOS,
`netstat -ano` on Windows); no stray electron/xvfb. The isolated global-setup kills whatever holds 8876 — never run the dev app
concurrently. `dev-appdata/local-storage/main/` is SHARED across e2e launches (main-process
localStorage polyfill) — clear it if a spec asserts fresh-store state.

**Retry policy — the anti-thrash rule:** at most TWO clean attempts. Same failure signature
twice = a RESULT (report with logs + remaining evidence: unit, typecheck, live smoke), not an
obstacle. Different signatures = dirty environment → cleanup, one final attempt. Never build
pgrep watch-loops or watchdog respawners (they self-match and must be SIGTERMed; caused the
visible thrashing).

**Other traps:** never pipe long-running starters (redirect); never edit source mid-run
(webpack watch rebuilds under the test); delete `.erb/dll/main.bundle.dev.js` when comparing
across commits; the multi-window suite exists only from the trio branch (#2639) upward; known
pre-existing local failures (record base-vs-branch, don't chase): scroll-groups
`waitForHomeTab`, navigation-history, internet-settings.

**Why:** each agent rediscovering these live burns 20–60 min of visible thrash per run and
erodes trust in the whole pipeline.

---

## Reading this in a fresh checkout

- `npm stop` is a script in this repo's `package.json`; run it from the **repo root** of any
  paranext-core checkout. It kills by process name, so it stops an app launched from a
  different checkout too. Never hand-roll `pkill`.
- **Never copy a suite name out of this file.** `multi-window`, named in the traps below,
  existed only on the 2026-08 multi-window stack and is not on `main`; the raw `npx` form gets
  "no tests found" for it. Run `npm run test:e2e:isolated` with no argument — it prints the
  subsets that exist in this checkout — and pick the one the fix touches. The parts that
  transfer unchanged are `--project=isolated`, `--workers=1`, redirecting to a file, and no
  outer timeout wrapper.
- The "known pre-existing local failures" list, and "the multi-window suite exists only from
  #2639 upward", are both 2026-08 snapshots. Do not treat either as current — the durable rule
  is the method: **record base-vs-branch**. Run the suite at the merge-base as well as at the
  branch tip and compare, so a pre-existing failure is proven pre-existing instead of assumed.
- "Report with the remaining evidence" means the e2e result is not the only gate: unit tests,
  typecheck, lint, and a live smoke run are independent evidence and should be reported
  together with a failed or flaky e2e attempt.
