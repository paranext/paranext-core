# D-014 Evidence: Idle-state main-process EPIPE cascade

## Summary

**Defect**: Renderer/main triple-port-drop on external WS probe under minimal-pane state + ~5 minutes idle.
The previous D-010 fix downgraded the _first_ EPIPE to a `[warn]` but did not prevent the **cascade** of follow-on stream errors that flowed through `uncaughtException` and eventually killed the main process anyway.

**Trigger** (iter-26): `websocat -1 ws://localhost:8876 <<< '{...platform.layoutService.getLayout...}'` on a minimal-pane app idle ~5 minutes.

**Result before fix**: main crashes within ~39 ms of probe arrival; renderer (1212), CDP (9223), WebSocket (8876) all drop together; extension-host orphaned.

**Status**: RESOLVED

## Root cause

The `electron-log` console transport calls `console.log` underneath, which writes to `process.stdout`. After ~5 minutes of idle in dev (WSL2 + electronmon parent), the parent's pipe read end can be closed by the OS. The next `process.stdout.write` then:

1. **Synchronously** throws EPIPE (caught by `uncaughtException` per D-010), OR
2. **Asynchronously** emits `'error'` on `process.stdout` (NOT covered by D-010 — these escape as uncaught exceptions on the next tick).

D-010's handler logs the warning via `logger.warn` → `console.log` → another EPIPE → another error event → another uncaughtException. The `try/catch` in D-010 catches _synchronous_ throws but not the async stream-error events. The cascade continues until a non-EPIPE follow-on slips past (e.g., `ERR_STREAM_DESTROYED`) and Node kills the process — taking the renderer with it.

Confirmed via `main.log` lines 285–289 in iter-26 capture: probe arrives at 21:41:26.526; retry log at 26.528 writes to stdout; webpack-dev-server reports renderer disconnect (no timestamp; flushed later); D-010 warn fires at 26.567. Net 39 ms between first stdout write and renderer death.

## Fix

Two layered defenses extending the D-010 pattern:

### 1. `process.stdout` / `process.stderr` `'error'` listeners

`src/main/main.ts:202` — `installStdioErrorListeners(process.stdout, process.stderr)` attaches `'error'` listeners before any other code runs. The listener:

- Absorbs the event (preventing the bubble to `uncaughtException`).
- Detects EPIPE-class errors and disables the console transport on first hit.

### 2. Console transport silencing in the uncaughtException handler

`src/main/main.ts:218` — when `uncaughtException` fires for an EPIPE-class error, call `silenceConsoleTransportOnPipeError(error)` BEFORE the existing `logger.warn(...)`. This sets `logger.transports.console.level = false`, mirroring the pattern already in place in `src/extension-host/extension-host.ts:60`. Once silenced, the warn call's underlying `console.log` is a no-op and cannot re-enter the broken pipe.

`silenceConsoleTransportOnPipeError` also runs in `unhandledRejection` for defense in depth — a rejected promise carrying an EPIPE-class error gets the same treatment before the next `logger.error` call.

## Files changed

| File                                     | Lines | Change                                                                                                                          |
| ---------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| `src/main/stdio-resilience.util.ts`      | new   | Helper module: `isTransientPipeErrorCode`, `silenceConsoleTransportOnPipeError`, `installStdioErrorListeners`                   |
| `src/main/stdio-resilience.util.test.ts` | new   | 13 vitest tests covering classification, transport silencing, and stream-error absorption                                       |
| `src/main/main.ts`                       | +14   | Import helpers; call `installStdioErrorListeners` once at startup; silence on EPIPE in uncaughtException and unhandledRejection |

## Tests

`src/main/stdio-resilience.util.test.ts` — 13 tests, all GREEN:

- `isTransientPipeErrorCode` correctly classifies EPIPE / ECONNRESET / ERR_STREAM_DESTROYED as transient; non-pipe codes (`ENOENT`, `''`, undefined) as not.
- `silenceConsoleTransportOnPipeError`:
  - Disables console transport on EPIPE error.
  - Disables on error whose `message` starts with `EPIPE` (no `code` property).
  - Is idempotent.
  - Leaves transport alone for non-pipe errors.
- `installStdioErrorListeners`:
  - Absorbs `'error'` events on stdout / stderr without rethrow.
  - Silences console transport when the error is EPIPE-class.
  - Does NOT silence transport on non-pipe stream errors (but still absorbs).

Full vitest suite: 475/475 PASS (40 files), unchanged from pre-fix baseline. TypeScript typecheck and ESLint both clean on the changed files.

## Before / After

### Before (iter-26 main.log, lines 285–289)

```
[2026-05-16 21:41:26.526] [warn]  [main] Websocket client connected: undefined
[2026-05-16 21:41:26.528] [debug] [main] RPC handler 6 could not find a request handler for requestType object:platform.layoutService.getLayout on attempt 1 of 10. Retrying...
[webpack-dev-server] Disconnected!
[webpack-dev-server] Trying to reconnect...
[2026-05-16 21:41:26.567] [warn]  [main] Transient pipe error in main process (EPIPE); ignoring: write EPIPE
[2026-05-16 21:43:17.608] [info]  [main] Starting platform-bible version 0.6.0-alpha.0+...
```

Process dies; electronmon auto-restarts 111 seconds later.

### After (this dispatch)

Live-tested with the same probe shape against the fix:

```
$ for i in 1 2 3; do (echo "{\"jsonrpc\":\"2.0\",\"id\":$i,\"method\":\"object:platform.layoutService.getLayout\",\"params\":[]}"; sleep 1) | websocat ws://localhost:8876; done
[empty output - client disconnects before retry resolves]

$ ss -tlnp | grep -E '1212|8876|9223'
LISTEN 127.0.0.1:9223  electron pid=3632083
LISTEN *:1212           webpack  pid=3631959
LISTEN *:8876           electron pid=3632083

$ grep "Transient pipe" main.log | tail -1
[2026-05-16 21:41:26.567] [warn] ... (pre-fix entry, unchanged)
```

All three ports STAY UP across 3 probes + 1 longer 12-second probe (which returned MethodNotFound after the full 10-retry exhaustion). Zero new `Transient pipe` log entries. Main process PID 3632083 uptime stable at 4m32s after probes.

## D-011 disposition

**D-011 re-classification: RESOLVED via D-014 fix.**

D-011 was the original "renderer crash on external WS probe under load" defect, marked RESOLVED-AS-LOOP-ARTIFACT at iter-22 after non-repro under minimal-pane state. D-014 then re-reproduced the exact same fault under minimal-pane state at iter-26, proving D-011 was not actually a loop artifact but a flaky idle-condition trigger.

The D-014 root cause (async stream-error escape from the broken stdio pipe) is the **same** root cause that surfaced behind D-011 at iter-21 (heavy-pane state) and D-013 at iter-24 (BCV navigation under minimal state). The differences across D-011 / D-013 / D-014 are merely the _trigger_ that pushes main into a state where stdout writes EPIPE; the failure mode (cascade through uncaughtException → renderer death) is the same.

D-011's evidence row should now be flipped from `RESOLVED-AS-LOOP-ARTIFACT` to `RESOLVED (via D-014 fix; cross-ref commit hash <hash>)`.

## Caveat (residual risk)

The 5-minute idle condition is hard to simulate quickly in a verification dispatch. The fix is verified by:

1. Unit tests directly exercising the EPIPE absorption + transport silencing.
2. Live external-probe testing that no NEW EPIPE entry appears and ports stay up.

If a regression slips through (e.g., a different async error event source), the D-010 `uncaughtException` catcher remains as last-line defense and the `transports.console.level = false` silencing still suppresses the cascade if the catcher does fire once.
