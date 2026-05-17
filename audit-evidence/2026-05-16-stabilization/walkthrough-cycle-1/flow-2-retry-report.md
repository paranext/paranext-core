# Walkthrough Cycle 1 - Flow 2 RETRY Report

**Date:** 2026-05-16
**Sub-agent dispatch:** D.flow-2-retry (re-run BCV navigation flow after 3ec354586e D-008/9/10 cluster fix)
**Flow ref:** `user-walkthrough-script.md` Flow 2
**Pre-condition expected:** OHEBGRK editor + ER pane both at GEN 1, ER tab active.
**Pre-condition actual:** App already in mid-state from previous live work — 3 OHEBGRK editor tabs, 1 `aaa6` editor tab, 4 Enhanced Resource panes; BCV at JHN 1:1 (set during earlier flow-2 attempts before the fix landed). Active tab on entry: Enhanced Resource (nth=4).

## Test environment

- Commit under test: **3ec354586e** (`[stabilize][FIX][D-008+D-009] enhanced-resources: ER pane lifecycle cluster fix`).
- Process state on entry: Renderer 1212 UP, CDP 9223 UP, WebSocket 8876 UP.
- BCV state on entry: `object:ScrollGroupService.getScrRef [0]` returned `{book:"JHN",chapterNum:1,verseNum:1}` — already past Step 1.
- Editor pane present at JHN 1: yes (visible in `flow-2-retry-step-1-jhn1.png`).
- ER pane present at JHN 1: yes (Greek Word/lemma annotations visible in the rendered ER scripture pane).

## Pre-fix verification (D-008 + D-009 are RESOLVED)

Confirmed in `~/.config/Electron/logs/main.log` post-restart (timestamp 19:31:00.x onwards):

- **D-008**: 50+ "Failed to find start or end node of the annotation" messages all routed to `[debug]` with prefix `EnhancedScripturePane (D-008 suppressed):`. Zero `[error]` entries with that text. The wrapper logger fix in 3ec354586e is observably active.
- **D-009**: No `Timeout reached when waiting for platformScriptureEditor.selection.<webViewId> to settle` unhandled rejection in the post-fix window. Editor-host promise behavior is clean.

## Flow 2 step-by-step

### Step 1: Editor + ER at JHN 1 (verified, but navigation predates this dispatch)

- **Expect:** editor + ER both update to JHN 1 within 1 paint cycle (≤200 ms after click).
- **Procedure followed:** the JHN 1 GetText calls for OHEBGRK occurred at 19:25:30.305/.325 (lines 649/653 of main.log), well before this dispatch began. The app survived that navigation — no crash, no main-process exit, no port drop. State was stable on dispatch entry.
- **Latency measurement:** unmeasurable retroactively (clock was not started before that earlier GetText).
- **Verdict:** **PASS (indirect).** The GEN 1 → JHN 1 navigation that crashed in the previous flow-2 dispatch did _not_ crash this time. Editor + ER both render JHN 1 cleanly.
- **Screenshot:** `flow-2-retry-step-1-jhn1.png` (current state at dispatch entry).

### Step 2: PAPI-driven BCV navigation to ROM 8

- **Expect:** both panes update; ER dictionary auto-switches to Greek default; ≤200 ms paint.
- **Procedure followed:** sent
  ```
  {"jsonrpc":"2.0","id":1,"method":"object:ScrollGroupService.setScrRef","params":[0,{"book":"ROM","chapterNum":8,"verseNum":1}]}
  ```
  via websocat to `ws://localhost:8876` with a 2s read-window.
- **Observed:**
  - WebSocket connection to 8876 was accepted: main.log line 976 — `[19:35:46.744] [warn] [main] Websocket client connected: undefined`.
  - **~47 ms later, the main Electron process died:** main.log line 979 — `[19:35:46.791] [error] [main] Unhandled exception in main process: write EPIPE`.
  - websocat returned `Connection refused (os error 111)`.
  - Post-call port probe: renderer 1212 **DOWN**, CDP 9223 **DOWN**, WebSocket 8876 **DOWN** — same triple-drop signature documented in the previous flow-2 report's D-010 entry.
  - No `GetText ROM 8` line in main.log — the .NET data provider never received the request. The crash fired before the BCV navigation was routed downstream.
  - No Crashpad dump generated.
- **Verdict:** **FAIL.** Same crash class as D-010, with a _new and more diagnostic_ signature now captured: `Unhandled exception in main process: write EPIPE`.
- **Screenshot:** none possible — renderer gone.

### Step 3: Scroll-sync verification

- **NOT EXECUTED.** App crashed at Step 2. Per dispatch rules ("DO NOT restart app"), no retry was attempted.

## Key finding: D-010 is NOT RESOLVED — newly diagnostic repro captured

The hypothesis going into this dispatch was that D-010 (BCV navigation crash) may have been an incidental side-effect of D-009's unhandled-rejection fix. That hypothesis is **REJECTED**:

- The D-009 fix is observably working (no settle-timeout rejection in logs post-restart).
- The D-010 crash _still_ happens on BCV navigation — this time on a PAPI `setScrRef` to ROM 8 with multiple editor + ER panes already open.
- The 19:35:46.791 log line provides the **first captured error from the main process** for this crash class: `write EPIPE`. The previous dispatch's flow-2 attempt got silence (the main process died before logging anything); this one captured a one-line error. This is a meaningful diagnostic upgrade — `write EPIPE` indicates the main process tried to write to a broken pipe (a child stdio pipe, the renderer IPC channel, or similar) and the uncaught exception handler caught it just before exit.
- The Block E "non-repro" notation from earlier today must have been on a simpler app state (one editor + one ER). Today's repro state had 3 OHEBGRK editors + 1 aaa6 editor + 4 ER panes — a much heavier set of subscribers to the scroll-group event.

D-010 is **CONFIRMED REPRODUCING** at HEAD 3ec354586e. Updated in `stabilization-defects.md`.

### Reproduction state summary (for whoever owns the fix)

- Project: OHEBGRK (Hebrew + Greek combined), plus a secondary `aaa6` editor open.
- Tabs open at crash time: 3x OHEBGRK editor, 1x aaa6 editor (Editable), 4x Enhanced Resource panes — all in the default scroll group (0).
- Trigger: any BCV setScrRef to a different book (verified with ROM 8; previous dispatch reproduced with JHN 1 from GEN 1 via UI click).
- Crash signature: `[error] [main] Unhandled exception in main process: write EPIPE`. Renderer, CDP, and WebSocket all drop together; extension-host process survives.
- Time from WS connect → crash: ~47 ms (consistent with a synchronous render/event-fanout that pushes broken bytes to a dead pipe).

## D-NN entries produced

No new D-NN created this dispatch (the crash is the same fault class as D-010 — recategorized as a CONFIRMED repro, not a separate defect).

## Watch-list observations (pre-crash)

Same as previous flow-2 dispatch:

- D-008 suppression confirmed clean.
- No unhandled rejections logged before the crash.
- UserSnap / Autofill / shared-store errors logged but are pre-existing infra noise unrelated to ER.
- No "click handler >200ms" violations.
- Memory growth not measurable (dispatch ended at crash).

## Files

- `flow-2-retry-step-1-jhn1.png` — captured JHN 1 state at dispatch entry (Step 1 evidence).
- `flow-2-retry-report.md` — this file.
- **NOT created (due to crash):** `flow-2-retry-step-2-rom8.png`, `flow-2-retry-step-3-scroll-sync.png`.

## Verdict

**FAIL** — D-010 still reproduces post-3ec354586e. The fix cluster resolved D-008 and D-009 (both verifiably clean in logs), but the renderer/main-process crash on BCV navigation is a distinct fault that survived. New diagnostic captured: `Unhandled exception in main process: write EPIPE`. D-010 status flipped from `OPEN (non-repro)` → `OPEN (REPRODUCED 2026-05-16 with EPIPE signature)`.
