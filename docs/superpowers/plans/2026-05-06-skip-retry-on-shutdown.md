# Skip Retry on Shutdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `sendCommandNoRetry` to the command service so that shutdown commands fail immediately when the extension host is unavailable, eliminating a ~10-second delay caused by the `requestWithRetry` loop.

**Architecture:** Thread a `skipRetry` flag from `commandService.sendCommandNoRetry` → `networkService.requestNoRetry` → `IRpcHandler.request` → each RPC handler implementation. When `skipRetry` is `true`, handlers call the request callback directly instead of passing it to `requestWithRetry`. `requestWithRetry` itself is not modified.

**Tech Stack:** TypeScript, Electron main process, JSON-RPC 2.0 WebSocket (`json-rpc-2.0` package), `platform-bible-utils` (AsyncVariable, wait)

---

### Task 1: Add `skipRetry?` to `IRpcHandler.request` interface

**Files:**

- Modify: `src/shared/models/rpc.interface.ts:52-55`

The `IRpcHandler` interface defines the `request` method signature that all three RPC handlers implement. Adding the optional `skipRetry?` param here forces TypeScript to verify it's threaded correctly in Tasks 2–4.

- [ ] **Step 1: Edit the interface**

In `src/shared/models/rpc.interface.ts`, change lines 52–55 from:

```typescript
request: (requestType: SerializedRequestType, requestParams: RequestParams) =>
  Promise<JSONRPCResponse>;
```

To:

```typescript
request: (requestType: SerializedRequestType, requestParams: RequestParams, skipRetry?: boolean) =>
  Promise<JSONRPCResponse>;
```

- [ ] **Step 2: Verify typecheck catches implementation mismatches**

```bash
cd /home/lwenger/Documents/Development/paranext-core
npm run typecheck 2>&1 | grep -E "rpc-websocket-listener|rpc-server|rpc-client|error TS"
```

Expected: TypeScript errors pointing at the three handler implementations that don't yet have the new param. This confirms the interface change propagated. (If no errors, the implementations may already be compatible — still proceed with Tasks 2–4.)

---

### Task 2: Thread `skipRetry` through `RpcWebSocketListener.request`

**Files:**

- Modify: `src/main/services/rpc-websocket-listener.ts:100-131`

`RpcWebSocketListener` is the main-process WebSocket server's request handler. It currently passes its entire callback to `requestWithRetry`. When `skipRetry` is true, we call the callback directly instead.

- [ ] **Step 1: Replace the `request` method**

In `src/main/services/rpc-websocket-listener.ts`, replace lines 100–131 with:

```typescript
  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
    skipRetry = false,
  ): Promise<JSONRPCResponse> {
    const doRequest = async () => {
      const methodDetails = this.rpcMethodDetailsByMethodName.get(requestType);
      if (!methodDetails)
        return createErrorResponse(
          `No handler found for ${requestType}`,
          JSONRPCErrorCode.MethodNotFound,
        );
      const { handler } = methodDetails;
      if (handler !== this) return handler.request(requestType, requestParams, skipRetry);
      const method = this.localMethodsByMethodName.get(requestType);
      if (!method)
        return createErrorResponse(
          `Locally registered method name missing the actual method`,
          JSONRPCErrorCode.InternalError,
        );
      try {
        const result = method(...requestParams);
        const awaitedResult = result instanceof Promise ? await result : result;
        return createSuccessResponse(awaitedResult);
      } catch (error) {
        return createErrorResponse(getErrorMessage(error), JSONRPCErrorCode.InternalError);
      }
    };
    return skipRetry ? doRequest() : requestWithRetry(doRequest, 'rpc-websocket-listener', requestType);
  }
```

Key changes from the original:

- Added `skipRetry = false` parameter
- Extracted the inline callback into `doRequest`
- Passed `skipRetry` to `handler.request(...)` on the delegating path
- Final line: call `doRequest()` directly when `skipRetry`, otherwise use `requestWithRetry`

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck 2>&1 | grep -E "rpc-websocket-listener|error TS" | head -20
```

Expected: no errors referencing `rpc-websocket-listener.ts`.

---

### Task 3: Thread `skipRetry` through `RpcServer.request`

**Files:**

- Modify: `src/main/services/rpc-server.ts:101-136`

`RpcServer` is used for inter-process communication between the extension host client and the main-process server. Same pattern as Task 2.

- [ ] **Step 1: Replace the `request` method**

In `src/main/services/rpc-server.ts`, replace lines 101–136 with:

```typescript
  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
    skipRetry = false,
  ): Promise<JSONRPCResponse> {
    const doRequest = async () => {
      const requestId = this.createNextRequestId();
      const requestToSend = createRequest(requestType, requestParams, requestId);
      // Need to use null since it's part of the API
      // eslint-disable-next-line no-null/no-null
      let response: JSONRPCResponse | null = null;
      const isLocal = this.jsonRpcServer.hasMethod(requestType);
      if (isLocal) response = await this.jsonRpcServer.receive(requestToSend);
      else {
        const methodDetails = this.rpcMethodDetailsByMethodName.get(requestType);
        if (!methodDetails)
          return createErrorResponse(
            `'${requestType}' not found`,
            JSONRPCErrorCode.MethodNotFound,
            requestId,
          );
        const { handler } = methodDetails;
        if (handler === this) response = await this.jsonRpcClient.requestAdvanced(requestToSend);
        else return handler.request(requestType, requestParams, skipRetry);
      }
      if (response) return response;
      return createErrorResponse(
        `No response from ${isLocal ? 'local' : 'remote'} RPC server`,
        JSONRPCErrorCode.InternalError,
        requestId,
      );
    };
    return skipRetry ? doRequest() : requestWithRetry(doRequest, this.name, requestType);
  }
```

Key changes:

- Added `skipRetry = false` parameter
- Extracted the inline callback into `doRequest`
- Passed `skipRetry` to `handler.request(...)` on the delegating path (line `else return handler.request(...)`)
- Final line: direct call vs `requestWithRetry`

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck 2>&1 | grep -E "rpc-server|error TS" | head -20
```

Expected: no errors referencing `rpc-server.ts`.

---

### Task 4: Add `skipRetry` param to `RpcClient.request`

**Files:**

- Modify: `src/client/services/rpc-client.ts:128-144`

`RpcClient` is the renderer/extension-host-side client. It does not use `requestWithRetry` — it calls `jsonRpcServer.receive` or `jsonRpcClient.requestAdvanced` directly (no retry loop). The parameter is added solely to satisfy the `IRpcHandler` interface; behavior is unchanged.

- [ ] **Step 1: Add `_skipRetry` parameter**

In `src/client/services/rpc-client.ts`, replace lines 128–131 (the method signature) from:

```typescript
  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
  ): Promise<JSONRPCResponse> {
```

To:

```typescript
  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _skipRetry = false,
  ): Promise<JSONRPCResponse> {
```

The underscore prefix (`_skipRetry`) signals intentionally unused. The ESLint disable comment is for the `@typescript-eslint/no-unused-vars` rule. The body (lines 132–144) is unchanged.

- [ ] **Step 2: Verify typecheck clears all handler errors**

```bash
npm run typecheck 2>&1 | grep "error TS" | head -20
```

Expected: no TypeScript errors at all (or only pre-existing unrelated errors if any).

---

### Task 5: Extract `doRequest` and add `requestNoRetry` to `network.service.ts`

**Files:**

- Modify: `src/shared/services/network.service.ts:184-225`

`network.service.ts` exposes the public `request` function used by the command service. Extract its body into a private `doRequest` helper that accepts `skipRetry`, then expose both `request` (always `false`) and `requestNoRetry` (always `true`).

- [ ] **Step 1: Replace lines 184–225**

In `src/shared/services/network.service.ts`, replace lines 184–225 with:

```typescript
async function doRequest<TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
  args: TParam,
  skipRetry: boolean,
): Promise<TReturn> {
  validateRequestTypeFormatting(requestType);
  await initialize();
  if (!jsonRpc) throw new Error('RPC handler not set');
  const responseAsyncVariable = new AsyncVariable<JSONRPCResponse | PlatformError>(
    `response to ${requestType}`,
    getTimeoutMsForRequestType(requestType),
  );
  // Resolve the async variable to the JSONRPC response in an IIFE
  (async () => {
    try {
      responseAsyncVariable.resolveToValue(
        fixupResponse(await jsonRpc.request(requestType, args, skipRetry)),
      );
    } catch (e) {
      responseAsyncVariable.resolveToValue(newPlatformError(e));
    }
  })();

  let response: JSONRPCResponse | PlatformError | string | undefined;
  try {
    // Wait for the JSONRPC response to resolve or the timeout to be hit, whichever comes first
    response = await responseAsyncVariable.promise;
  } catch (e) {
    response = getErrorMessage(e);
  }

  if (isJsonRpcResponse(response)) {
    if (!response.error) return response.result;
    response = `JSON-RPC Request error (${response.error.code}): ${response.error.message}`;
  } else if (isPlatformError(response)) {
    logger.debug(response.message);
    throw response;
  } else {
    response = responseAsyncVariable.hasTimedOut
      ? `JSON-RPC Request timed out: ${requestType} ${JSON.stringify(args)}`
      : `Invalid JSON-RPC Response: ${response}`;
  }
  logger.debug(response);
  throw newPlatformError(response);
}

/** Send a request on the network and resolve the response contents. */
export const request = async <TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
  ...args: TParam
): Promise<TReturn> => doRequest(requestType, args, false);

/**
 * Send a request on the network and resolve the response contents without retrying if the handler
 * is not yet registered. Use this for requests where immediate failure is preferable to waiting,
 * such as commands sent during app shutdown.
 */
export const requestNoRetry = async <TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
  ...args: TParam
): Promise<TReturn> => doRequest(requestType, args, true);
```

Note: `jsonRpc.request(requestType, args, skipRetry)` inside the IIFE — TypeScript may warn that `jsonRpc` could be `undefined` inside an async callback. If typecheck fails with this error, change `jsonRpc.request(...)` to `jsonRpc!.request(...)` (non-null assertion is safe here because we checked `if (!jsonRpc) throw` immediately above and `jsonRpc` is only set/unset during `initialize`/`shutdown` which are sequential).

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck 2>&1 | grep -E "network.service|error TS" | head -20
```

Expected: no errors referencing `network.service.ts`.

---

### Task 6: Add `sendCommandNoRetry` to `command.service.ts`

**Files:**

- Modify: `src/shared/services/command.service.ts`

Add `sendCommandNoRetry` immediately after `sendCommand`, mirroring its structure but calling `networkService.requestNoRetry`.

- [ ] **Step 1: Add the function**

In `src/shared/services/command.service.ts`, after the closing `};` of `sendCommand` (line 54), insert:

```typescript
/** Send a command without retrying if the handler is not registered. Use during shutdown. */
export const sendCommandNoRetry = async <CommandName extends CommandNames>(
  commandName: CommandName,
  ...args: Parameters<CommandHandlers[CommandName]>
): Promise<Awaited<ReturnType<CommandHandlers[CommandName]>>> => {
  // This type assertion is needed when the return type is unknown or when it's not Awaited<...>.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
  return networkService.requestNoRetry(
    serializeRequestType(CATEGORY_COMMAND, commandName),
    ...args,
  ) as Promise<Awaited<ReturnType<CommandHandlers[CommandName]>>>;
};
```

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck 2>&1 | grep -E "command.service|error TS" | head -20
```

Expected: no errors referencing `command.service.ts`.

---

### Task 7: Use `sendCommandNoRetry` in `main.ts` close handler

**Files:**

- Modify: `src/main/main.ts:531-542`

`commandService` is already imported as `import * as commandService from '@shared/services/command.service'`, so `sendCommandNoRetry` is available immediately.

- [ ] **Step 1: Replace `sendCommand` with `sendCommandNoRetry` in the close handler**

In `src/main/main.ts`, replace lines 531–542:

From:

```typescript
try {
  await commandService.sendCommand('paratextBibleSendReceive.cancelSync');
} catch {
  /* no sync in progress, or extension unavailable */
}

try {
  await waitForDuration(
    () => commandService.sendCommand('paratextBibleSendReceive.syncProjects', undefined),
    SHUTDOWN_SYNC_TIME_OUT,
  );
} catch {
  /* sync failed or extension unavailable — proceed with shutdown */
}
```

To:

```typescript
try {
  await commandService.sendCommandNoRetry('paratextBibleSendReceive.cancelSync');
} catch {
  /* no sync in progress, or extension unavailable */
}

try {
  await waitForDuration(
    () => commandService.sendCommandNoRetry('paratextBibleSendReceive.syncProjects', undefined),
    SHUTDOWN_SYNC_TIME_OUT,
  );
} catch {
  /* sync failed or extension unavailable — proceed with shutdown */
}
```

- [ ] **Step 2: Verify typecheck, lint, and format**

```bash
npm run typecheck 2>&1 | grep "error TS" | head -20
npm run lint 2>&1 | grep -E "error|warning" | grep -v "warning" | head -20
npm run format
```

Expected: typecheck — no errors. Lint — no errors. Format — may auto-fix whitespace.

- [ ] **Step 3: Run tests**

```bash
npm test
```

Expected: all tests pass (the close handler has no unit tests by established convention, but other services may have tests that exercise the retry path — verify none regress).

- [ ] **Step 4: Commit**

```bash
git add \
  src/shared/models/rpc.interface.ts \
  src/main/services/rpc-websocket-listener.ts \
  src/main/services/rpc-server.ts \
  src/client/services/rpc-client.ts \
  src/shared/services/network.service.ts \
  src/shared/services/command.service.ts \
  src/main/main.ts
git commit -m "feat: add sendCommandNoRetry to skip retry loop on shutdown (PT-3817)"
```

---

### Manual Verification

After all tasks complete:

1. Start the app in dev mode: `./.erb/scripts/refresh.sh`
2. Wait for it to fully load
3. Press Ctrl+C in the console
4. Verify the main window closes **immediately** (within ~1 second) instead of after ~10 seconds
5. Check the log file — you should see `Syncing projects on shutdown...` followed quickly by `Sync on shutdown complete` (or an error swallowed silently if the extension host was already down)
