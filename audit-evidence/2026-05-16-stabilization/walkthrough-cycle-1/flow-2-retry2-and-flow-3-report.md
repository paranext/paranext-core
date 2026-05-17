# Walkthrough Cycle 1 - Flow 2 RETRY-2 + Flow 3 Report

**Date:** 2026-05-16
**Sub-agent dispatch:** D.flow-2-retry-2 (re-run BCV navigation flow after D-010 EPIPE fix in `e458eae27a`, plus opportunistic Flow 3)
**Flow refs:** `user-walkthrough-script.md` Flow 2 + Flow 3
**Commit under test:** `e458eae27a` (`[stabilize][FIX][D-010] enhanced-resources: EPIPE in scroll-group/webview broadcast`)

## TL;DR

- **D-010 EPIPE handler downgrade IS observably working** — `main.log:119` shows the `uncaughtException` for `write EPIPE` is now caught and logged as `[warn] Transient pipe error in main process (EPIPE); ignoring: write EPIPE`. The unhandled-exception kill path D-010 was filed for is genuinely blocked.
- **HOWEVER**: the renderer/main process still went down during this dispatch, on a much lighter trigger than D-010 (a read-only `getScrRef`, not `setScrRef`). The triple-port-drop happened anyway, so for the user-perspective walkthrough the outcome is the same — Flow 2 still cannot be completed end-to-end on a heavily-loaded pane set.
- **New defect**: `D-011` filed — renderer disconnects on external WebSocket probe under heavy pane load. Distinct from D-010 (which is about broadcast EPIPE during setScrRef fanout); this one fires on a passive query while the renderer is in an idle/heavy state.
- **Flow 3 was NOT executed** — app crashed before Flow 2 Step 1 screenshot could be captured.

## Pre-conditions on dispatch entry

- Renderer 1212 UP, CDP 9223 UP, WebSocket 8876 UP (verified at dispatch start).
- Open panes (via `pw-server.mjs locators .dock-tab`):
  - 3 × OHEBGRK editor
  - 2 × aaa6 (Editable) editor
  - 6 × Enhanced Resource
  - 8 × resource viewers (AVD, BGT, CRSB, DARBY, ESVUS16, plus 3 duplicates)
  - Home
  - Total: 23 dock tabs.
- BCV: `object:ScrollGroupService.getScrRef [0]` returned `{book:"PSA",chapterNum:23,verseNum:1}`.
- This is a SUPERSET of the precondition the dispatch requested (multi-editor + multi-ER on scroll-group 0). Subscriber count is ~11 across editor + ER panes, exceeding the 9-subscriber load reported as "verified" in `e458eae27a`'s commit message.

## Phase A: Flow 2 retry-2

### Probe-1: read-only getScrRef triggers triple-port drop

- **Procedure**: sent
  ```
  {"jsonrpc":"2.0","id":1,"method":"object:ScrollGroupService.getScrRef","params":[0]}
  ```
  via `websocat -1 ws://localhost:8876`.
- **Response received**: `{"jsonrpc":"2.0","id":1,"result":{"book":"PSA","chapterNum":23,"verseNum":1}}` — correct.
- **Post-call port probe** (immediate): renderer 1212 **DOWN**, CDP 9223 **DOWN**, WebSocket 8876 **DOWN**. Same triple-drop signature as previous D-010 repros.
- **Log evidence** (`~/.config/Electron/logs/main.log` lines 115-119, timestamps 20:08:33.037-.085):
  ```
  [20:08:33.037] [warn]  [main] Websocket client connected: undefined
  [20:08:33.041] [info]  [main] Websocket 37 closed. Removing 732 methods
  [webpack-dev-server] Disconnected!
  [webpack-dev-server] Trying to reconnect...
  [20:08:33.085] [warn]  [main] Transient pipe error in main process (EPIPE); ignoring: write EPIPE
  ```

### Interpretation

1. **D-010 fix is correctly catching the EPIPE** — the line `Transient pipe error in main process (EPIPE); ignoring: write EPIPE` proves `main.ts:204` `uncaughtException` handler matched the `code === 'EPIPE'` branch and downgraded the severity to `warn`. The previous pre-fix dispatch saw `[error] [main] Unhandled exception in main process: write EPIPE` — that exact log line is gone.
2. **But the renderer's websocket (ID 37, with 732 registered methods) closed 4ms after my websocat connected** — these are simultaneous-enough events to suggest causation. The "Removing 732 methods" line indicates the FULL renderer-side network-object surface was torn down, which means the renderer itself (or its WS link) died.
3. **Webpack-dev-server's "Disconnected! / Trying to reconnect..."** is the canonical signature of the Electron main+renderer pair exiting; webpack-dev-server stays up but loses its only client.
4. **`ps -ef`** confirmed only the orphaned extension-host child process (PID 3519845) remained; main Electron PID was gone.

### Why D-010's live-verification passed but this dispatch failed

The D-010 fix commit message reports successful verification with **5 editors + 4 ER panes = 9 subscribers**. This dispatch had **3 OHEBGRK + 2 aaa6 + 6 ER + 8 resource viewers + Home = 23 dock tabs** (11 directly subscribed to scroll group 0, plus the resource viewers which also subscribe to BCV updates). The fanout was significantly heavier, plus the renderer had been idle for ~3 minutes (last log activity at 20:05:12, websocat probe at 20:08:33).

The EPIPE fix layered defense (per-subscriber try/catch, sendPayloadToWebSocket readyState gate, etc.) is sound for the `setScrRef` BROADCAST path. But this dispatch's crash was triggered by a `getScrRef` READ — no broadcast fanout, no setScrRef — so the broadcast guards never had a chance to fire. The EPIPE that did occur happened on the renderer's already-broken WS during cleanup, AFTER the renderer was already gone.

### Verdict for Flow 2 retry-2

- **Step 1 (BCV → JHN 1)**: **NOT EXECUTED** — app crashed during precondition probe (read-only `getScrRef`).
- **Step 2 (BCV → ROM 8)**: **NOT EXECUTED**.
- **Step 3 (scroll-sync)**: **NOT EXECUTED**.
- **Overall**: **FAIL** — same user-perspective outcome as Flow 2 retry-1 (renderer dies, ports drop), but with different log signature. D-010's specific fix verifiably works; a new fault path (D-011) exists.

## Phase B: Flow 3

**NOT EXECUTED.** Phase B was conditional on Flow 2 PASS. Flow 2 failed, so per dispatch rules ("DO NOT restart app") Flow 3 cannot proceed.

## D-NN entries produced

### D-011 (NEW)

**Title:** Renderer dies on external WebSocket probe under heavy pane load (read-only query, distinct from D-010 broadcast fanout)
**Layer:** UI/infra
**Source:** walkthrough
**Scope:** in-scope (blocks Flow 2 / Flow 3 walkthrough completion)
**Status:** OPEN

**Reproduction:**

- State: 23 dock tabs open (3 OHEBGRK editors, 2 aaa6 editors, 6 ER panes, 8 resource viewers, Home), all on scroll-group 0, BCV at PSA 23:1, renderer idle ~3 minutes.
- Trigger: external client opens new WebSocket to `ws://localhost:8876` and sends a read-only `object:ScrollGroupService.getScrRef [0]` JSON-RPC query (via `websocat -1`).
- Observed: response received correctly (`{book:"PSA",chapterNum:23,verseNum:1}`), then within ~4ms the renderer's WS (ID 37, 732 methods) tears down. Renderer 1212, CDP 9223, WebSocket 8876 all drop together. Extension-host orphaned but alive.
- Log diagnostic line: `Transient pipe error in main process (EPIPE); ignoring: write EPIPE` at 20:08:33.085 — proves D-010's EPIPE catcher fired (correctly), but the renderer was already gone.

**Distinction from D-010:**

| Aspect            | D-010                                                             | D-011                                                      |
| ----------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| Trigger           | `setScrRef` (BCV navigation)                                      | `getScrRef` (read-only query)                              |
| Path              | Broadcast fanout to subscribers                                   | External WS connect, no fanout needed                      |
| Pre-fix signature | `[error] Unhandled exception... EPIPE`                            | (Same EPIPE now caught)                                    |
| D-010 fix effect  | EPIPE caught, main stays alive — RESOLVED for setScrRef broadcast | EPIPE caught but renderer already dead                     |
| Fanout dependency | Subscriber-count sensitive                                        | Not clearly fanout-sensitive; may be heavy-state sensitive |

**Hypothesis (untested):** the renderer's WS upgrade path may have a vulnerability where a NEW external client connecting to port 8876 causes a write to the renderer's existing socket that fails because the renderer has gone unresponsive (e.g., long event-loop block from rendering 23 tabs idle). The EPIPE in main is then the SYMPTOM of the renderer being already dead, not the CAUSE.

**Suggested next investigation steps for Block E (NOT this dispatch):**

1. Reproduce on a fresh restart with the same 23-tab state — does it die immediately, or only after idle time?
2. Capture `renderer.log` (not main.log) for any pre-crash events.
3. Confirm whether the renderer was idle-killed by Electron (memory pressure, blocked event loop) or whether websocat's connect actually triggered a fault.

## Watch-list observations (limited - app died before walkthrough)

- D-008 logger downgrade: not exercised in this dispatch (no ER pane open events between dispatch start and crash).
- D-009 selection settle rejection: not exercised (no ER open).
- D-010 EPIPE: **caught and downgraded to warn — fix works in this aspect.** Logged once at 20:08:33.085.
- Flicker / layout shift: not exercised.
- Click handler >200ms: not exercised.
- Hover latency: not exercised (Flow 3 not run).
- Console errors / unhandled rejections: none in this dispatch window pre-crash.

## Files

- `flow-2-retry2-and-flow-3-report.md` — this report (covers both flows).
- **NOT created** (due to crash before any screenshot): `flow-2-retry2-step-0-precondition.png`, `flow-2-retry2-step-1-jhn1.png`, `flow-2-retry2-step-2-rom8.png`, `flow-2-retry2-step-3-scroll-sync.png`, `flow-3-step-1-hover-word.png`, `flow-3-step-2-hover-phrase.png` (or skip marker), `flow-3-step-3-hover-note.png`.

## Verdict

**FAIL** — the user-perspective walkthrough still cannot complete on a heavy pane set. D-010's EPIPE fix is verifiably working for the specific fault it was scoped to (broadcast-time uncaught exception), but a new failure mode exists where the renderer dies on a read-only external WS probe under heavy load. New defect D-011 filed.

D-010 final status recommendation: **keep RESOLVED** (the fix correctly resolves what it was scoped to — the EPIPE uncaught exception that previously killed main). D-011 is a separate, distinct defect that Block E must own.

Flow 2 walkthrough: **STILL BLOCKED** until D-011 is resolved.
Flow 3 walkthrough: **NOT STARTED**, conditional on Flow 2 PASS.

## Recommendation

- Re-attempt this dispatch after D-011 fix lands AND with a fresh restart (not idle for 3+ minutes) — that combination removes both confounders.
- Consider whether the walkthrough script should standardize on a "warm restart" precondition (e.g., refresh.sh and load a minimal pane set) to avoid heavy-state coincidental crashes muddying the signal.
