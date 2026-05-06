# Design: Skip Command Retry on Shutdown

**Date**: 2026-05-06
**Branch**: pt-3817-auto-sync-on-shutdown

## Problem

When Ctrl+C kills the webpack-dev-server WebSocket in dev mode, the main window's `close` handler fires and attempts to send `cancelSync` and `syncProjects` commands. Because the WebSocket server is already dead, the commands receive a `MethodNotFound` response. The retry loop in `requestWithRetry` (`rpc.model.ts`) retries up to 10 times with 1-second delays, causing a ~10-second freeze before the window closes. The errors are already swallowed by `try/catch`, so the delay is the only observable problem.

## Goal

Commands sent during shutdown should fail fast (try once, give up immediately) rather than waiting through the retry loop.

## Non-Goal

This does not add a "check if commands are registered" API. The existing `try/catch` in the close handler already handles the unavailable-command case correctly. The only fix needed is eliminating the retry delay.

## Design

### Approach

Thread a `skipRetry` flag from `commandService.sendCommandNoRetry` down to `requestWithRetry`. When `skipRetry` is `true`, `requestWithRetry` caps `MAX_REQUEST_ATTEMPTS` at 1, returning the `MethodNotFound` error immediately on the first failed attempt. All existing callers use the default (`skipRetry = false`) and are unaffected.

### Call Chain

```
main.ts (close handler)
  └─ commandService.sendCommandNoRetry        [command.service.ts — new export]
       └─ networkService.requestNoRetry       [network.service.ts — new export]
            └─ jsonRpc.request(..., skipRetry=true)
                 ├─ RpcWebSocketListener.request  [thread skipRetry through]
                 ├─ RpcServer.request             [thread skipRetry through]
                 └─ RpcClient.request             [thread skipRetry through]
                      └─ requestWithRetry(..., skipRetry=true)  [max 1 attempt]
```

### File-by-File Changes

**`src/shared/data/rpc.model.ts`**

Add `skipRetry = false` as the last parameter to `requestWithRetry`. When `true`, the loop runs for at most 1 attempt:

```typescript
export async function requestWithRetry(
  requestCallback: () => Promise<JSONRPCResponse>,
  name: string,
  requestType: string,
  skipRetry = false,
): Promise<JSONRPCResponse>;
```

**`src/shared/models/rpc.interface.ts`**

Add optional `skipRetry?: boolean` to `IRpcHandler.request`:

```typescript
request: (requestType: SerializedRequestType, requestParams: RequestParams, skipRetry?: boolean) =>
  Promise<JSONRPCResponse>;
```

**`src/main/services/rpc-websocket-listener.ts`**
**`src/main/services/rpc-server.ts`**
**`src/client/services/rpc-client.ts`**

Each: add `skipRetry = false` parameter to `request`, pass it through to `requestWithRetry`. One-line change per file.

**`src/shared/services/network.service.ts`**

Extract the body of `request` into a private `doRequest` helper that accepts `skipRetry`. Expose two public functions — the existing `request` (passes `false`) and a new `requestNoRetry` (passes `true`):

```typescript
// private
async function doRequest<TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
  args: TParam,
  skipRetry: boolean,
): Promise<TReturn>;

// unchanged public API
export const request = async <TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
  ...args: TParam
): Promise<TReturn> => doRequest(requestType, args, false);

// new
export const requestNoRetry = async <TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
  ...args: TParam
): Promise<TReturn> => doRequest(requestType, args, true);
```

**`src/shared/services/command.service.ts`**

Add `sendCommandNoRetry` mirroring the existing `sendCommand`:

```typescript
export const sendCommandNoRetry = async <CommandName extends CommandNames>(
  commandName: CommandName,
  ...args: Parameters<CommandHandlers[CommandName]>
): Promise<Awaited<ReturnType<CommandHandlers[CommandName]>>>
```

**`src/main/main.ts`**

In the `close` event handler, replace `sendCommand` with `sendCommandNoRetry` for both the `cancelSync` and `syncProjects` calls.

### Error Handling

- `skipRetry = false` is the default — zero impact on existing callers.
- `requestWithRetry` still runs the callback once when `skipRetry` is `true`. Non-`MethodNotFound` errors already short-circuit the loop, so those paths are unchanged.
- With `sendCommandNoRetry`, a dead extension host causes the `syncProjects` call to throw immediately. The `catch` in the close handler swallows it and `mainWindow.destroy()` is called without delay. This is the correct behavior.
- The `waitForDuration` 10-minute timeout now reflects actual sync time rather than retry time.

### Testing

No new automated tests. The close handler has no test coverage by established convention (`src/main/` uses Electron APIs that are not unit-testable). Manual verification: run in dev mode, Ctrl+C, confirm the window closes immediately instead of after ~10 seconds.
