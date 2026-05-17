# Walkthrough Cycle 1 - Flow 2 Report

**Date:** 2026-05-16
**Sub-agent dispatch:** D.flow-2 (BCV navigation Gen → John → Romans with scroll-sync)
**Flow ref:** `user-walkthrough-script.md` Flow 2
**Pre-condition:** Flow 1 end-state — OHEBGRK editor + ER pane (ESV16UK+) both at GEN 1, ER tab active.

## Test environment (carried over from Flow 1)

- Project used: `OHEBGRK` (Combined Hebrew + Greek; language `Ancient Greek`).
- Editor webViewId: `98d4e66f-9950-4900-f431-464d51a212c8` (per Flow 1).
- ER webViewId: `68e64489-5754-47cd-8ba2-5be09f7b14de` (per Flow 1).
- ER resourceId at start: `ESV16UK+`.

## Flow 2 step-by-step

### Step 1: Click BCV control → navigate to JHN 1

- **Expect:** editor + ER both update to JHN 1 within 1 paint cycle (≤200 ms after click).
- **Procedure followed:**
  1. Pre-state screenshot taken at GEN 1 — editor + ER scripture pane both Genesis 1 (`flow-2-step-0-precondition-gen1.png`).
  2. Clicked the global toolbar `book-chapter-trigger` button (DOM index `nth=0` — the toolbar one, not the per-editor variant at `nth=1`). Popover opened.
  3. Filled the search input inside `[data-radix-popper-content-wrapper]` with `JHN`. Result list rendered with `JHN 1:1` at the top option plus chapter chooser (1..n). Screenshot captured at this stage (`flow-2-step-1-bcv-jhn-picker.png`).
  4. Clicked the `JHN 1:1` option (the top result).
- **Observed:**
  - .NET data provider received the GetText call (`GetText OHEBGRK JHN 1 single chapter = False` then `single chapter = True` at 18:57:20.503 in main.log).
  - Approximately 200ms after the click, the renderer process died.
  - All subsequent Playwright commands in the same pipeline returned `"page.screenshot: Target page, context or browser has been closed"`, `"page.evaluate: Target page, context or browser has been closed"`, `"page.waitForTimeout: Target page, context or browser has been closed"`.
  - Reconnect attempts returned `Failed to connect to CDP at http://localhost:9223: connect ECONNREFUSED 127.0.0.1:9223`.
  - Port probe: renderer port 1212 DOWN, CDP port 9223 DOWN, WebSocket port 8876 DOWN. Only the `extension-host` Electron sub-process is still running. The main Electron process (BrowserWindow + renderer) is gone.
  - No crash dump was written under `~/.config/Electron/Crashpad/` (folder is empty except `client_id` from March 2025).
  - main.log final lines (lines 660-666):
    ```
    [2026-05-16 18:49:59.257] [info]  [main] Websocket 35 closed. Removing 1004 methods
    [2026-05-16 18:57:20.503] [info]  [.net]
    ParanextDataProvider Information: 0 : GetText OHEBGRK JHN 1 single chapter = False
        DateTime=2026-05-16T23:57:20.4853906Z
    ParanextDataProvider Information: 0 : GetText OHEBGRK JHN 1 single chapter = True
        DateTime=2026-05-16T23:57:20.4895258Z
    [/.net]
    ```
    No error, no exception, no exit message — just silence after the .NET GetText completed.
- **Verdict:** **FAIL** — the click to navigate the OHEBGRK editor + ESV ER pane from GEN 1 to JHN 1 crashed the main Electron process before either pane could repaint. Click handler latency could not be measured (renderer died). The "≤200 ms after click" expect criterion is moot — paint never happened.
- **Screenshots:**
  - `flow-2-step-0-precondition-gen1.png` (pre-click state at GEN 1)
  - `flow-2-step-1-bcv-jhn-picker.png` (BCV popover open, JHN search result visible, ABOUT to click JHN 1:1)
  - **NO** `flow-2-step-1-jhn1.png` — renderer crashed before navigation completed; the screenshot file therefore does not exist.

### Step 2: Navigate to ROM 8

- **NOT EXECUTED** — Step 1 left the app in a crashed state. Per the sub-agent dispatch rules ("DO NOT restart the app", "DO NOT fix any defects (Block E owns)"), I did not restart Platform.Bible to retry. Step 2 evidence file `flow-2-step-2-rom8.png` therefore does not exist.

### Step 3: Scroll-sync verification

- **NOT EXECUTED** — same reason as Step 2. `flow-2-step-3-scroll-sync.png` not captured.

## Watch-list observations

### Crash signature

The dispatch's watch list includes "Console errors / unhandled rejections during nav" and "Wrong/missing/empty content". Neither captures a full renderer crash — but the crash is the most severe possible flavour of "wrong/missing/empty content during BCV navigation". Filed as **D-010**.

Pre-crash console / log state (from Flow 1's tail, lines 622-656 of main.log): the 50x `Failed to find start or end node of the annotation` errors clustered at 18:49:57 are pre-existing (D-008) and not relevant to the crash itself — they occurred ~7 minutes before the JHN 1:1 click.

### Performance / UX

- Click handler latency: **UNMEASURABLE** — `performance.now()` baseline was captured (window.\_\_t0 = 1041026.5 ms) but the post-click `eval` returned `"page.evaluate: Target page, context or browser has been closed"` so no post-click delta could be computed. The renderer died before the time check could run.
- Flicker / layout shift / FOUC: not observable (renderer gone).
- Wrong/missing/empty content: ER pane never updated — but this is subsumed by the crash itself.
- Hover latency: not relevant to Flow 2.
- Popover positioning: not relevant to Flow 2; the BCV popover itself opened correctly and positioned correctly (visible in `flow-2-step-1-bcv-jhn-picker.png`).
- Scroll-sync drift: not testable (crash blocked Step 3).
- Memory growth: not testable.
- Font/style regression: not testable.

### Process state at end of dispatch

- `electron/dist/electron … src/main/main.ts` (the BrowserWindow main process): **GONE** (no matching process in `ps`).
- `electron/dist/electron … src/extension-host/extension-host.ts`: **STILL RUNNING** (pid 3445594, started 18:39).
- webpack watchers (preload, main, renderer): still running.
- .NET data provider (`paranext-data-provider.dll`): not visible in this scope but no errors logged.

This signature — main process dies while extension-host stays alive, no crash dump, no exit code logged — strongly suggests the renderer (BrowserWindow) crashed and electron-log's main-process logger lost its IPC channel before it could record the exit. The fact that no electron-log entry exists after the JHN 1:1 click (no "BrowserWindow closed", no "app quit", no "Crashed:") is itself diagnostic.

## D-NN entries produced

| ID    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Layer      | Evidence                                                                                                                                                                  |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D-010 | Renderer / main-process crash during BCV navigation from GEN 1 → JHN 1 with ER pane open. Click on `JHN 1:1` in the BCV popover triggers .NET `GetText OHEBGRK JHN 1` (logged) then the main Electron process exits silently — no electron-log entry, no Crashpad dump, no exception trace. CDP port 9223 + renderer 1212 + WebSocket 8876 all go down together. Only the `extension-host.ts` sub-process survives. **Severity: CRITICAL** — blocks the entire Flow 2 + downstream walkthrough flows. | UI / infra | flow-2-step-0-precondition-gen1.png + flow-2-step-1-bcv-jhn-picker.png + main.log tail (lines 660-666) + ps output showing only extension-host electron process surviving |

## Files

- `flow-2-step-0-precondition-gen1.png` — pre-click GEN 1 baseline (editor + ER both at GEN 1)
- `flow-2-step-1-bcv-jhn-picker.png` — BCV popover open with JHN search result visible (taken ~400ms BEFORE the JHN 1:1 click)
- `flow-2-report.md` — this file
- **NOT created (due to crash):** `flow-2-step-1-jhn1.png`, `flow-2-step-2-rom8.png`, `flow-2-step-3-scroll-sync.png`

## Verdict

**FAIL** — Flow 2 Step 1 reproduces a CRITICAL renderer/main-process crash during BCV navigation. Steps 2 and 3 could not be executed. Filed as D-010 (1 new D-NN ID this dispatch). Block E (defect cleanup) should treat D-010 as highest-severity item before further walkthrough flows are run, since the same navigation flow is implicit in Flows 3-N.
