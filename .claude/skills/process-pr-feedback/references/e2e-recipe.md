# The one correct way to run e2e locally

Used by **P5 — Verify effectiveness**. Read the whole thing before the first attempt, and pass
it to any agent that will run e2e — verbatim or by file path. Per-brief rule-passing is not
enough; every agent that rediscovers these live burns 20–60 minutes of visible thrash.

> *Provenance: copied verbatim from the session-memory reference `e2e-run-recipe` (2026-08-07),
> written after an agent was watched thrashing through a stuck → fail → self-kill → restart
> loop. Paths below are from that machine; see "Reading this in a fresh checkout" at the end.*

---

Hard-learned recipe for local e2e runs (multi-window era, 2026-08). Rolf watched an agent
thrash (stuck → fail → self-kill → restart loop) and called it out; per-brief rule-passing was
not enough — every e2e-running agent must get this WHOLE recipe, verbatim or by file pointer.

**Invocation** (from the worktree root):
`npx playwright test --config e2e-tests/playwright.config.ts --project=isolated e2e-tests/tests/isolated/multi-window --workers=1`
— never omit `--project=isolated` (ECONNREFUSED without it); always `--workers=1` locally;
output redirected to a file; NO outer timeout wrapper (first Electron launch after a rebuild
takes 60–90 s and reads as a hang).

**Before any attempt — full cleanup once:** `npm stop` from ~/git/paranext-core (kills by
process name, works from any checkout); verify 8876/9223/1212 free (`ss -ltn`); no stray
electron/xvfb. The isolated global-setup kills whatever holds 8876 — never run the dev app
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
erodes Rolf's trust in the whole pipeline.

---

## Reading this in a fresh checkout

- `npm stop` is a script in this repo's `package.json`; run it from the **repo root** of any
  paranext-core checkout. It kills by process name, so it stops an app launched from a
  different checkout too. Never hand-roll `pkill`.
- **The suite path above will not work as written.** `e2e-tests/tests/isolated/multi-window`
  existed only on the 2026-08 multi-window stack and is not on `main`. Copying the headline
  command verbatim gets "no tests found". List what actually exists first —
  `ls e2e-tests/tests/isolated/` — and substitute the suite the fix touches. The parts that
  transfer unchanged are `--config e2e-tests/playwright.config.ts`, `--project=isolated`,
  `--workers=1`, redirecting to a file, and no outer timeout wrapper.
- The "known pre-existing local failures" list, and "the multi-window suite exists only from
  #2639 upward", are both 2026-08 snapshots. Do not treat either as current — the durable rule
  is the method: **record base-vs-branch**. Run the suite at the merge-base as well as at the
  branch tip and compare, so a pre-existing failure is proven pre-existing instead of assumed.
- "Report with the remaining evidence" means the e2e result is not the only gate: unit tests,
  typecheck, lint, and a live smoke run are independent evidence and should be reported
  together with a failed or flaky e2e attempt.
