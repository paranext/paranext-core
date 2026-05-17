# D-010 - `write EPIPE` Main-Process Crash on BCV Navigation with Multi-Webview Fanout

**Date:** 2026-05-16
**Iteration:** 20 (Block E, stabilization sub-agent dispatch)
**Defect:** D-010 from `stabilization-defects.md` (REPRODUCED with EPIPE signature on 2026-05-16 by flow-2-retry)
**Status pre-fix:** OPEN (reproducing reliably under multi-editor + multi-ER fan-out)
**Status post-fix:** RESOLVED

## Reproduction (pre-fix)

State required: scroll group 0 has many subscribers — historical repro used 3x OHEBGRK editors + 1x aaa6 editor + 4x Enhanced Resource panes. Any BCV `setScrRef` to a different book triggers the broadcast and the main process logs `Unhandled exception in main process: write EPIPE` and then exits silently. Renderer (1212), CDP (9223), and WebSocket (8876) ports drop together; only the extension-host child survives.

The 47 ms gap between "Websocket client connected" and the EPIPE log (per `flow-2-retry-report.md`) is consistent with a synchronous fan-out write at the connect → setScrRef → broadcast cascade.

## Root cause (single paragraph)

`RpcWebSocketListener.propagateEvent` (and the sibling `emitEventOnNetwork`) iterated `rpcServerBySocket` and synchronously called `RpcServer.emitEventOnNetwork` → `jsonRpcClient.notify` → `sendPayloadToWebSocket` → `ws.send` for each subscriber. When one of the underlying TCP sockets was half-closed (peer process dead or shutting down but the WebSocket close event had not yet propagated), `ws.send` could throw synchronously (e.g. "WebSocket is not open" on a fast CLOSING state) or surface an `EPIPE`-coded error from the low-level write. With no try/catch on the fan-out path and only a top-level `process.on('uncaughtException')` that called `logger.error` (which itself can fail when writing into a broken stdio pipe inherited from the parent `webpack-dev-server`), the exception escalated into a process exit. Reproducibility correlated with subscriber count — the more sockets in the fan-out, the higher the probability that at least one peer was in a transient bad state during a heavy BCV broadcast.

## Fix

Layered defense — all minimal, no error masking beyond the transient-pipe class:

1. `src/shared/data/rpc.model.ts:105` — `sendPayloadToWebSocket` now short-circuits when `readyState !== OPEN (1)` and wraps `ws.send` in try/catch with a `logger.warn`. Dead/closing sockets no longer throw out of this primitive.
2. `src/main/services/rpc-websocket-listener.ts:246` and `:262` — both fan-out loops (`emitEventOnNetwork` and `propagateEvent`) wrap each subscriber's emit in try/catch with `logger.warn`. One bad subscriber cannot abort the broadcast to healthy ones.
3. `src/main/services/rpc-server.ts:140` — `RpcServer.emitEventOnNetwork` wraps `jsonRpcClient.notify` in try/catch for defense in depth (notify's own promise rejection is already swallowed by json-rpc-2.0, but a synchronous throw inside the client could escape).
4. `src/main/main.ts:204` — `process.on('uncaughtException')` recognises transient-pipe error codes (`EPIPE`, `ECONNRESET`, `ERR_STREAM_DESTROYED`) and downgrades them to `logger.warn`; both unhandled-error and unhandled-rejection handlers now wrap their own logger call in try/catch so a logger failure during the catch cannot synthesize a recursive uncaught exception that terminates main.

## Regression test

New file: `src/shared/data/rpc.model.test.ts` (7 tests, all passing).

Key cases:

- `catches synchronous throw from ws.send and logs warn (D-010 EPIPE path)` — exact crash signature: simulated `Error('write EPIPE') {code:'EPIPE'}` thrown from `ws.send`; asserts no rethrow and a `logger.warn` with `EPIPE` in the message.
- `broadcast fan-out simulation: M dead subscribers do not stop N healthy ones` — 8 subscribers, 3 throwing EPIPE; asserts every healthy `send` is reached and exactly the dead ones produce warnings. This is the test that mirrors the multi-webview scroll-group broadcast.
- `skips send when readyState is CLOSING/CLOSED` — guards the cheaper early-return path.
- Three happy-path tests preserved (string, serialized object, ws-undefined contract).

**Verified RED on unfixed code:** stashed the fixed `rpc.model.ts`, re-ran the test file — 4 of 7 tests failed (the four that target the fix). Restored the fix; all 7 GREEN.

## Live verification (post-fix)

App restarted via `./.erb/scripts/refresh.sh` on the fixed commit. State built up via PAPI:

- 5 scripture editors opened (aaa6, AVD, BGT, CRSB, DARBY) via `command:platformScriptureEditor.openScriptureEditor`.
- 4 Enhanced Resource panes opened via `command:platformEnhancedResources.openEnhancedResource` (resourceId `ESV16UK+`).
- All 9 webviews on scroll group 0 by default.

Test sequence:

1. Initial scrRef confirmed at JHN 1:1 via `object:ScrollGroupService.getScrRef [0]`.
2. `object:ScrollGroupService.setScrRef [0, {book:"ROM", chapterNum:8, verseNum:1}]` via websocat — returned `{"result":true}`, immediately followed by the propagated `scrollGroup:onDidUpdateScrRef` notification. Main.log grew from 1167 → 2113 lines; .NET data provider logged `GetText` for BGT, CRSB, DARBY at ROM 1 then ROM 8 (single chapter = True). No `EPIPE`, no `Unhandled exception`. Ports remained UP.
3. Rapid stress: 6 consecutive `setScrRef` calls — GEN 1:1, EXO 2:5, ISA 53:5, MAT 28:18, REV 22:21, PSA 23:1. All returned `result:true`. Final BCV verified at PSA 23:1. `grep -c EPIPE main.log` → `0`.
4. Final port probe: Renderer 1212 UP, WS 8876 UP, CDP 9223 UP.

**Verdict:** D-010 no longer reproduces. The previous fault class (synchronous broadcast EPIPE → uncaught exception → silent main exit) is closed by the four-layer fix.

## Files changed

| File                                          | Change                                                                 |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| `src/shared/data/rpc.model.ts`                | `sendPayloadToWebSocket`: readyState gate + try/catch around `ws.send` |
| `src/main/services/rpc-websocket-listener.ts` | try/catch per subscriber in both fan-out loops                         |
| `src/main/services/rpc-server.ts`             | try/catch around `jsonRpcClient.notify`                                |
| `src/main/main.ts`                            | Transient-pipe error downgrade + logger-failure suppression            |
| `src/shared/data/rpc.model.test.ts`           | NEW — 7-test regression covering the EPIPE crash signature             |

## Open items

None for D-010. The fix is layered such that any future low-level write error in a single subscriber is logged at `warn` and does not interrupt the broadcast or terminate the main process.
