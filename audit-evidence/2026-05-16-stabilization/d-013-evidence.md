# D-013 Evidence — renderer crash on BCV navigation post-D-012-fix

**Status:** RESOLVED
**Iteration:** 25
**Block:** E
**Date:** 2026-05-16
**HEAD before fix:** `6806dbf9e9` (D-012 fix `9130b27b3c` on the stack)
**Author:** Claude (sub-agent)

## Bug

After D-012's fix landed (`9130b27b3c`), the renderer/main Electron process intermittently
crashed on the FIRST UI-click BCV navigation made through the ER pane's BCV combobox, even
under minimal-pane state (3 dock tabs: Home + Enhanced Resource + OHEBGRK). Symptom:
ports 1212 / 9223 / 8876 all dropped together within ~few hundred ms of the chapter-click;
extension-host survived. Log immediately prior to the silent exit showed a burst of D-008
"Failed to find start or end node of the annotation" debug lines (3-200+ within 16-20 ms),
then `[warn] Transient pipe error in main process (EPIPE); ignoring: write EPIPE` (D-010's
catcher firing correctly), then no further entries. PAPI `setScrRef` did NOT trigger the
crash — only UI-click BCV nav did, suggesting a path-specific timing window.

Root cause hypothesis (per dispatch brief): D-012 added `editor.setUsj(usj)` post-mount sync
to the scripture pane. The chunked-RAF annotation-apply effects (Effect A + Effect C) ran
synchronously right after this setUsj call, layering setAnnotation calls onto a Lexical
tree that was mid-rebuild.

## Hypotheses

1. Approach 1 (cancel/clear pending chunked queue before `setUsj`): already implemented via
   Effect A's `cancelled = true` cleanup. Insufficient — see analysis.
2. Approach 2 (defer Effect A's apply until after `setUsj` completes).
3. Approach 3 (per-item abort token inside the chunk loop).
4. Approach 4 (transactional `editor.update`): rejected — `setUsj` is not transactional in
   the editor library; it's a React state setter that schedules a re-render.

## Hypothesis tested + confirmed

**Combined Approach 2 + 3.** The race mechanism, traced through the editor source:

1. `EnhancedScripturePane` re-renders on BCV nav with the new `usj` prop.
2. D-012's effect calls `editor.setUsj(usj)` (line 612 in the fix). Looking at
   `@eten-tech-foundation/platform-editor/src/editor/Editor.tsx:204-212`, this internally
   calls React's `setUsj` state setter — which schedules a NEW render of Editor and a
   `LoadStatePlugin` remount (line 428-436) keyed on `loadTrigger`. The Lexical tree
   rebuild happens on the editor's NEXT React render cycle, NOT synchronously.
3. Effect A (declared after D-012's effect) runs immediately in the same commit. Its
   `applyChunked` started synchronously — slice.forEach called `editor.setAnnotation()`
   against the OLD Lexical tree. The annotation resolver couldn't find the new jsonPaths
   in the old tree → "Failed to find start or end node" warns fired in bulk.
4. Inside the editor lib, `setAnnotation` calls `editor.update(...)` which enqueues a
   Lexical update. When the editor's setUsj-driven re-render commits and Lexical tries to
   reconcile, the queued setAnnotation update from step 3 sometimes overlapped the
   LoadStatePlugin commit, producing a renderer crash. The crash was intermittent because
   it depended on the editor lib's exact reconciliation timing.

The "cancelled" cleanup of Effect A from the PRIOR usj's run did fire (and is fine), but it
only protects the OLD effect run from continuing. It does NOT protect the NEW effect run
from racing the editor's setUsj-driven re-render.

## Fix

`extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx`:

Two coordination signals were added to the D-012 effect (lines 597-613):

```tsx
const lastSyncedUsjRef = useRef<Usj | undefined>(usj);
const usjEpochRef = useRef(0);
const usjJustChangedRef = useRef(false);
useEffect(() => {
  if (lastSyncedUsjRef.current === usj) return;
  lastSyncedUsjRef.current = usj;
  // D-013: bump the epoch so Effect A / Effect C runs from the prior chapter abort immediately,
  // and signal that the next Effect A / Effect C run should defer its first chunk by one RAF.
  usjEpochRef.current += 1;
  usjJustChangedRef.current = true;
  const editor = editorRef.current;
  if (!editor || !usj) return;
  editor.setUsj(usj);
}, [usj]);
```

**Effect A (`applyChunked`)** now:

1. Captures `myEpoch = usjEpochRef.current` at the start of each run.
2. Reads `usjJustChangedRef.current` and clears it; if true, awaits one
   `requestAnimationFrame` before the first chunk. This gives the editor's setUsj-driven
   re-render time to commit the new Lexical tree before we hit it with setAnnotation.
3. Checks `cancelled || myEpoch !== usjEpochRef.current` BOTH at the top of each chunk
   loop AND inside each chunk before every individual setAnnotation call. Per-item abort
   tightens the race window from CHUNK_SIZE items down to 1.

**Effect C (highlight-all chunked apply)** got the same epoch+per-item guard. It does NOT
consume `usjJustChangedRef` (Effect A claims it once per swap to avoid double-deferring).

The control flow on a BCV nav under the fix:

1. New props arrive. D-012's effect runs: `usjEpochRef → N+1`, `usjJustChangedRef → true`,
   `editor.setUsj(newUsj)` → editor schedules its own React render.
2. Effect A's previous-run cleanup flips its local `cancelled` to true (no help here, but
   harmless).
3. Effect A's new run starts. `myEpoch = N+1`. `shouldDeferFirstChunk = true`.
4. `applyChunked()` awaits one RAF. During this wait, the editor's render commits and
   `LoadStatePlugin` rebuilds the Lexical tree against the new USJ.
5. RAF fires. Effect A begins applying setAnnotation calls to the fresh Lexical tree.
6. If another BCV nav arrives mid-apply, `usjEpochRef` becomes N+2 — and Effect A's per-item
   guard aborts the in-flight apply before the next setAnnotation call.

On first mount, `usjJustChangedRef` is `false` (only the D-012 effect sets it), so Effect A
applies synchronously — no first-paint latency regression.

## Tests

Added a new describe block `D-013 chunked-RAF apply coordination with setUsj` in
`scripture-pane.test.tsx` with four cases:

1. `applies annotations synchronously on first mount (no RAF deferral)` — guards the
   first-paint-latency invariant.
2. `defers the first chunk by one RAF when usj changes after mount` — direct regression
   test for the deferral.
3. `aborts an in-flight chunked apply when usj changes again before completion` — exercises
   the epoch guard with a simulated double-nav.
4. `keeps the D-012 setUsj push working alongside the D-013 epoch+RAF coordination` —
   regression guard that D-013's coordination does not break D-012's setUsj contract.

A `drainRafQueue` helper at module scope flushes stubbed requestAnimationFrame callbacks
sequentially, yielding to microtasks between each.

```
$ cd extensions && npx vitest --run scripture-pane
 ✓ src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx (60 tests) 359ms
 Test Files  1 passed (1)
      Tests  60 passed (60)
```

(All 4 new tests pass plus the 56 pre-existing tests — including the 4 D-012 tests, which
remain unmodified by the D-013 fix.)

## Live verification

App was already running with `./.erb/scripts/refresh.sh`-launched session (3 dock tabs:
Home + Enhanced Resource + OHEBGRK, BCV at ROM 8:1 from prior testing).

| Step | Action                                       | Expected                             | Observed (post-fix)                                                                        | Screenshot                                  |
| ---- | -------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------- |
| 1    | Pre-fix repro attempt (UI click BCV → JHN 1) | (No fix yet)                         | Did not crash this session but D-008 warns fired in bulk (~hundreds). The race was active. | `d-013-jhn1-no-crash.png` (pre-fix attempt) |
| 2    | (Apply fix + hot-reload extension)           | webpack rebuilds                     | `extensions/dist/platform-enhanced-resources/src/main.js` updated 21:31:31.                | n/a                                         |
| 3    | UI click BCV → Genesis 1 (from ROM 8)        | scripture pane = GEN 1 ESV; no crash | "The Creation of the World..." rendered. Ports 1212/9223/8876 all UP.                      | `d-013-after-fix-gen1.png`                  |
| 4    | UI click BCV → John 1 (from GEN 1)           | scripture pane = JHN 1 ESV; no crash | "The Word Became Flesh..." rendered. Ports all UP.                                         | `d-013-after-fix-jhn1.png`                  |
| 5    | UI click BCV → Romans 8 (from JHN 1)         | scripture pane = ROM 8 ESV; no crash | "Life in the Spirit..." rendered. Ports all UP.                                            | `d-013-after-fix-rom8.png`                  |
| 6    | UI click BCV → Genesis 1 (from ROM 8)        | scripture pane = GEN 1 ESV; no crash | GEN 1 rendered. Ports all UP.                                                              | `d-013-after-fix-gen1-final.png`            |

After all four UI-click BCV navigations, the log contained zero `[error]` entries, zero
non-suppressed `[warn]` entries, zero EPIPE markers, and zero crash markers. Total D-008
debug messages across all four navigations: **47** (vs. hundreds-per-nav in the pre-fix
log captures) — confirming the RAF deferral lets the new Lexical tree commit before
setAnnotation tries to resolve jsonPaths, eliminating the bulk of the lookup misses that
were the leading edge of the crash.

## Files changed

- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx`
  (D-012 effect: +5 lines for `usjEpochRef` / `usjJustChangedRef`; Effect A: +RAF deferral
  - epoch guard + per-item abort; Effect C: +epoch guard + per-item abort)
- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx`
  (+1 `drainRafQueue` helper, +4 D-013 test cases, refactored RAF-flush patterns)

## Test name(s) (Vitest)

```
EnhancedScripturePane > D-013 chunked-RAF apply coordination with setUsj > applies annotations synchronously on first mount (no RAF deferral)
EnhancedScripturePane > D-013 chunked-RAF apply coordination with setUsj > defers the first chunk by one RAF when usj changes after mount
EnhancedScripturePane > D-013 chunked-RAF apply coordination with setUsj > aborts an in-flight chunked apply when usj changes again before completion
EnhancedScripturePane > D-013 chunked-RAF apply coordination with setUsj > keeps the D-012 setUsj push working alongside the D-013 epoch+RAF coordination
```

## D-012 disposition

D-012 stays **RESOLVED**. The D-013 fix is purely additive — it adds coordination AROUND
the D-012 setUsj path (epoch tracking + RAF deferral on Effect A / Effect C) but does NOT
change the setUsj call itself. D-012's four regression tests still pass unmodified.

The D-012 ledger row will be updated with a brief refinement note pointing to D-013's
commit for the combined fix, but D-012's own commit hash `9130b27b3c` remains the
authoritative D-012 fix.

## Risk / regression surface

- Mid-chunk annotation apply: tighter abort window — previously the chunked apply could
  process up to CHUNK_SIZE (50) stale setAnnotation calls before bailing; now it bails at
  the next item. Net behavior: fewer stale calls hit the editor, fewer D-008 warns, less
  Lexical churn.
- First-paint latency: synchronous on mount (verified by `applies annotations
synchronously on first mount` test). The deferral only triggers when `usjJustChangedRef`
  is set, which only happens after a USJ swap. No regression in steady-state open.
- Hover popover lifecycle (D-14/D-15 fixes): unaffected. Those effects live inside Effect
  A but inside the `handleMarbleMouseEnter` / `handleMarbleMouseLeave` callbacks, which
  fire on user input, not in the chunked apply loop.
- Highlight-all toggle (Effect C): gets the same epoch guard. Per-item abort is more
  responsive; no behavior change on stable USJ.
- D-008 logger downgrade: unchanged. Fewer hits, but the suppression still works for any
  remaining misses (e.g., race-free annotations whose jsonPath happens not to resolve).
- D-010 EPIPE catcher: unchanged. The race that was triggering EPIPE-secondary symptoms is
  removed at the source.
- No PAPI or backend contract changes.
