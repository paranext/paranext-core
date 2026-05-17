# Walkthrough Cycle 1 — Flows 2 (retry-3), 3, 5 Combined Report

**Date:** 2026-05-16
**Sub-agent dispatch:** D.flows-2-3-5-combined (run Flow 2 retry-3 + Flow 3 + Flow 5 in one dispatch under minimal-pane state)
**HEAD under test:** `9130b27b3c` (`[stabilize][FIX][D-012] enhanced-resources: ER scripture pane stale on BCV nav`)
**Iteration:** 24

## TL;DR

- **Flow 2 retry-3: FAIL — REGRESSION.** Clicking JHN 1 in the BCV popover crashed the renderer/main Electron process within ~few hundred ms after click, even under **minimal-pane state** (3 dock tabs: Home, Enhanced Resource, OHEBGRK). The triple-port-drop signature (1212/9223/8876 all DOWN) is the same family as D-010 / D-011 but the precondition is much lighter than either prior repro and includes the D-012 fix on the stack.
- **Flow 3: NOT EXECUTED.** App was down after Flow 2 step 1. Per dispatch rules (`DO NOT restart app`), no further flows could run.
- **Flow 5: NOT EXECUTED.** Same reason as Flow 3.
- **New defect filed: D-013** — renderer crash on first BCV navigation after D-012 fix, minimal-pane state. Distinct precondition surface than D-010 / D-011.

## Pre-conditions on dispatch entry

- HEAD: `9130b27b3c` (D-012 RESOLVED per stabilization-defects.md line 46).
- Ports: 1212 / 9223 / 8876 all UP (verified via `curl -s -m 2`).
- Dock tabs: **3** (`Home`, `Enhanced Resource` active, `OHEBGRK`). Well below the ≤4 minimum required by the dispatch.
- BCV at GEN 1:1 for both the editor and the ER scripture pane.
- Editor scripture pane (right) was mirroring the OHEBGRK editor — both showing GEN 1 "The Creation of the World". Per D-012 fix, this is the expected initial state.
- Screenshot: `flow-2-r3-step-0-precondition.png`.

## Phase A: Minimal pane state verification

`{"cmd":"locators","selector":".dock-tab"}` returned:

| index | text              | active  |
| ----- | ----------------- | ------- |
| 0     | Home              | no      |
| 1     | Enhanced Resource | **yes** |
| 2     | OHEBGRK           | no      |

Total = 3. No closure step needed. Pane state matches the intended Flow 2 precondition (1 editor + 1 ER + Home + maybe 1 spare).

## Phase B: Flow 2 retry-3

### Step 1: BCV → JHN 1 — **CRASH (D-013)**

**Procedure** (via `pw-server.mjs` pipeline):

1. `{"cmd":"click","selector":"button[aria-label=\"book-chapter-trigger\"] >> nth=0"}` — opened toolbar BCV combobox. PASS.
2. `{"cmd":"fill","selector":"[data-radix-popper-content-wrapper] input","text":"John"}` — filtered to `John (JHN)`, `1 John (1JN)`, `2 John (2JN)`, `3 John (3JN)`. PASS.
3. `{"cmd":"click","selector":"[data-radix-popper-content-wrapper] div[role=\"option\"][aria-label=\"John (JHN)\"]"}` — selected John, chapter grid 1-21 displayed. PASS. (Confirmed via screenshot `/tmp/john-chapter-list.png`.)
4. `{"cmd":"click","selector":"[data-radix-popper-content-wrapper] >> text=/^1$/"}` — clicked chapter 1. PASS (click acknowledged).
5. `{"cmd":"wait-ms","ms":1500}` — **ERROR: `page.waitForTimeout: Target page, context or browser has been closed`**.

Subsequent commands (`screenshot`, `text` on BCV) also failed with the same target-closed error.

**Post-click port probe:**

- Renderer 1212 → DOWN
- CDP 9223 → DOWN
- WebSocket 8876 → DOWN

**Process check (`ps aux`):**

- Electron main + renderer processes: **gone**.
- Extension-host: **alive** (orphan PID 3563493).
- Webpack watch processes: **alive**.

Same triple-port-drop signature as D-010 / D-011, but extension-host being the lone survivor.

**Log evidence** (`~/.config/Electron/logs/main.log`, tail; `[debug]` D-008-suppressed lines elided):

```
[2026-05-16 21:07:01.352] [debug]
[rend] EnhancedScripturePane (D-008 suppressed): Failed to find start or end node of the annotation.
[2026-05-16 21:07:01.361] [debug]
[rend] EnhancedScripturePane (D-008 suppressed): Failed to find start or end node of the annotation.
[2026-05-16 21:07:01.367] [debug]
[rend] EnhancedScripturePane (D-008 suppressed): Failed to find start or end node of the annotation.
[2026-05-16 21:07:01.368] [warn]  [main] Transient pipe error in main process (EPIPE); ignoring: write EPIPE
```

— and the log ends there. Three EnhancedScripturePane annotation-lookup failures (the same D-008-suppressed message stream that normally fires harmlessly when ER pane mounts) fired within 16 ms, immediately followed by main's EPIPE handler. D-010's catcher fired correctly (downgraded to `[warn]`) but the renderer was already gone — same secondary-symptom pattern as D-011.

**Screenshot anchor:** `flow-2-r3-step-1-jhn1.png` — **NOT CAPTURED** (app dead before screenshot could run). The `flow-2-r3-step-0-precondition.png` is the last live image of the session.

### Step 2: BCV → ROM 8 — **NOT EXECUTED.**

### Step 3: Scroll within editor — **NOT EXECUTED.**

### Flow 2 verdict: **FAIL**

## Phase C: Flow 3 — **NOT EXECUTED.**

Per dispatch rule "DO NOT restart app", and given the renderer was dead after Flow 2 step 1, hover popovers cannot be tested. All three sub-steps deferred to a later cycle.

## Phase D: Flow 5 — **NOT EXECUTED.**

Same reason. Domain link → SDV → breadcrumb flow requires the renderer to be alive.

## New defect: D-013

### D-013 (NEW)

**Title:** Renderer crash on first BCV navigation after D-012 fix, under minimal-pane state (3 dock tabs)
**Layer:** UI/infra
**Source:** walkthrough
**Scope:** in-scope (blocks Flow 2 / Flow 3 / Flow 5 — and likely all post-open BCV navigation walkthroughs)
**Status:** OPEN
**HEAD at repro:** `9130b27b3c`

**Repro recipe:**

1. Fresh launch (`./.erb/scripts/refresh.sh`).
2. Open one OHEBGRK editor and one Enhanced Resource pane against the same scroll group.
3. ER pane scripture mirror renders GEN 1 correctly (D-012 fix path active).
4. Click the toolbar BCV → search `John` → select `John (JHN)` → click chapter `1`.
5. **Observed:** within ~few hundred ms of the chapter-1 click, the renderer process exits silently; ports 1212 / 9223 / 8876 all drop together. Extension-host survives.

**Differs from D-010:**

- D-010 was on broadcast fanout under heavy load (5 editors + 4 ER panes = 9 subscribers). D-013 is on **minimal** load (1 editor + 1 ER pane = 2 subscribers on scroll group 0).
- D-010's specific fault (uncaughtException kill on EPIPE during setScrRef broadcast) is verified RESOLVED — the `[warn] Transient pipe error in main process (EPIPE); ignoring` line shows D-010's handler fired correctly. But the renderer is still going down.

**Differs from D-011:**

- D-011 required 23 dock tabs + 3-min idle + external WS probe to repro, and was eventually marked RESOLVED-AS-LOOP-ARTIFACT after non-repro under minimal-pane state.
- D-013 reproes under exactly the minimal-pane state that D-011 was thought to be safe under.

**Relationship to D-012:**

- D-012 fix (`9130b27b3c`) added `editor.setUsj(usj)` post-mount sync to `EnhancedScripturePane`. The D-008-suppressed annotation-lookup-failure burst at 21:07:01 (3 in 16 ms) appears to be the ER pane re-rendering on the new JHN 1 USJ, exactly the path D-012 enabled. The crash timing strongly suggests D-013 is a side-effect of D-012's setUsj path firing during scroll-group fanout — possibly the editor's `setUsj` triggers a renderer-side teardown/rebuild that races with the main-process scroll-group broadcast.
- This is consistent with the D.flows-2-4-min iter 22 verdict — that dispatch ran BEFORE D-012 fix and Flow 2 PASSED on the minimal state. D-012 fix then unblocked Flow 2 step 1 visually (per D-012 evidence `d-012-after-fix-jhn1.png`), but the live-verification in the fix's own commit may not have exercised the full BCV-click path the same way this dispatch did, or the crash may be intermittent and the fix's manual verify happened on a lucky run.

**Suggested next action (out-of-scope for this dispatch):**

- Capture more verbose `[rend]` logging during BCV nav to identify whether `setUsj` is firing before or after the scroll-group broadcast settles.
- Confirm whether the crash repros 100% or is intermittent — re-run after fresh restart on identical 1-editor + 1-ER state.
- Consider whether D-012's `setUsj` should be deferred (e.g., `requestIdleCallback` or `React.startTransition`) to avoid racing with scroll-group fanout.

**Evidence:**

- `audit-evidence/2026-05-16-stabilization/walkthrough-cycle-1/flow-2-r3-step-0-precondition.png` (live pre-crash state)
- `~/.config/Electron/logs/main.log` lines around 21:07:01 (in the running session; will be archived as `main.old-1.log` on next restart)
- This report (`flows-2-3-5-report.md`)

## Watch-list observations during this dispatch

- **D-008..D-011:** D-008 suppressed messages fired but did not trigger errors (working as designed). D-010 EPIPE handler fired correctly. D-011's stated "RESOLVED-AS-LOOP-ARTIFACT" was technically true for that exact precondition but a different crash path (D-013) hits a similar surface.
- **D-012:** the fix is on the stack at HEAD — pre-crash precondition screenshot shows ER scripture pane correctly mirroring GEN 1 from the editor, confirming D-012's setUsj sync is taking effect on mount.
- **Hover latency:** NOT MEASURED (Flow 3 didn't run).
- **Popover positioning:** NOT MEASURED.
- **Console errors:** none in the renderer logs before the crash other than the D-008 stream (which is correctly downgraded to `[debug]`).

## Outputs

| Item                         | Path / Value                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| Pre-crash precondition image | `audit-evidence/2026-05-16-stabilization/walkthrough-cycle-1/flow-2-r3-step-0-precondition.png` |
| Flow 2 step 1 image          | NOT CAPTURED (app crashed before screenshot ran)                                                |
| Flow 2 step 2/3 images       | NOT EXECUTED                                                                                    |
| Flow 3 step 1/2/3 images     | NOT EXECUTED                                                                                    |
| Flow 5 step 1/2/3 images     | NOT EXECUTED                                                                                    |
| New D-NN entries             | D-013                                                                                           |
| App restarted?               | NO (dispatch forbidden from restarting)                                                         |
| Verdict line appended        | yes — to `stabilization-verdicts.jsonl`                                                         |

## Tool calls used

~24 (pre-flight + flow execution + log analysis + report write).
