# PAPI Connection Identity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this
> plan task-by-task in one session (TJ chose single-agent execution). Steps use checkbox (`- [ ]`)
> syntax for tracking.

**Goal:** Main identifies every PAPI connection by process, and a frozen table plus a
registrant-declared option restrict sensitive request types to named processes.

**Architecture:** Main issues two per-launch secrets to each child it starts. The child presents
one in its WebSocket handshake request and checks the other in main's reply; main tags the
connection with an identity. A frozen table in `src/shared` and an `allowedCallers` registration
option are enforced in `RpcServer` (remote calls and registrations) and on the in-process shortcut
in `RpcClient`.

**Tech Stack:** TypeScript (Electron main, Node extension host, `ws`, `json-rpc-2.0`, Vitest),
C# / .NET 10 (`ClientWebSocket`, StreamJsonRpc, NUnit), Playwright E2E.

**Spec:** `.context/designs/2026-11-13-papi-connection-identity-design.md` (read it first; this
plan argues from it).

**Workspace:** `~/source/repos/workspaces/pt-2893-papi-connection-identity/` holds worktrees of
`paranext-core` and `paratext-bible-internal-extensions`, both on branch
`pt-2893-papi-connection-identity`. Tasks 1–12 are in `paranext-core`; Task 13 is in
`paratext-bible-internal-extensions`.

## Global Constraints

- Unidentified connections keep access to every request type not restricted by the table or by a
  registrant's `allowedCallers`. Nothing else may start failing for a client that presents nothing.
- No check may depend on a header value, name or argument the caller supplies, other than the
  launch secret.
- The table is frozen; no function adds or changes rows at runtime.
- A secret never appears on a command line, in main's own `process.env`, or in a log line.
- Each child uses its secrets once, at connect, then drops them. Main keeps only the SHA-256
  digest of each client secret, plus the server secret.
- The server stays bound to `localhost`. The renderer stays on MessagePort.
- No C# copy of the table.
- No dynamic port, no event-ownership change, no `wss`, no internet-settings UI change.
- Repo rules that apply to every task: forward-facing comments only (no `PT-2893`, "previously",
  "stopgap removed"); no secrets in tests beyond obvious fakes; fix lint findings rather than
  suppressing them; write `WebView`/`WebViews`; never `--no-verify`.
- Per the user's Context7 rule, look up the `ws` and `System.Net.WebSockets.ClientWebSocket` APIs
  with Context7 before writing code that uses them (Tasks 3, 6 and 8).

Fixed names used throughout:

| Thing | Value |
| --- | --- |
| Handshake request header | `x-papi-client-secret` |
| Handshake reply header | `x-papi-server-secret` |
| Secret encoding | 32 random bytes, base64url |
| Fork IPC message | `{ type: 'papiLaunchSecrets', clientSecret: string, serverSecret: string }` |
| .NET dev environment variable | `PAPI_LAUNCH_SECRETS` = `{"clientSecret":"…","serverSecret":"…"}` |
| .NET packaged delivery | the same JSON as the first line on standard input |
| Rejected handshake status | `401` wrong secret; `409` same secret already has an open connection |
| Refused call error | JSON-RPC `MethodNotFound`, message `'<method>' is not available on this connection` |

## Review Focus

1. **Extension host restart while the old socket lingers.** `platform.restartExtensionHost` forks a
   new host with new secrets. The new host must connect even if the old host's socket has not
   closed yet; main closes the connection that used the previous launch's secret. (Task 3)
2. **`dotnet watch` restart racing the old socket.** The restarted .NET presents the same secret
   and may get `409`. It must retry briefly instead of exiting, or the dev loop stalls. (Task 8)
3. **Malformed secret header.** Empty, wrong length, non-base64url, or repeated header: rejected
   with `401`, no throw (`timingSafeEqual` throws on unequal lengths, so compare digests). (Tasks
   2, 3)
4. **A restricted request sent as a notification or inside a batch.** Each request in a JSON-RPC
   batch is checked on its own, and a restricted type with no `id` is refused before the event
   branch. (Task 4)
5. **A hostile `allowedCallers` on registration.** An unidentified client sending a non-array, an
   unknown identity, or `'main'` must not crash main or produce a rule that widens a table row;
   the registration is refused. (Task 5)

---

### Task 1: Workspace setup and docs commit

**Files:** none changed.

- [ ] **Step 1:** In `paranext-core`, run `npm install` (a real install; symlinked `node_modules`
  makes the gates unrunnable), then `npm run build:types`.
- [ ] **Step 2:** Baseline. Run `npm run typecheck`, then
  `npx vitest run src/main/services/__tests__/rpc-websocket-listener.real-socket.test.ts --pool=forks`.
  Expected: both pass. Record any pre-existing failure before changing code.
- [ ] **Step 3:** Commit the two design documents.

```bash
git add .context/designs/2026-11-13-papi-connection-identity-design.md .context/designs/2026-11-13-papi-connection-identity-plan.md
git commit -m "PT-2893: Design and plan for PAPI connection identity"
```

---

### Task 2: Access table and launch secrets (pure modules)

**Files:**
- Create: `src/shared/data/request-access.data.ts`
- Create: `src/shared/data/request-access.data.test.ts`
- Create: `src/main/services/launch-secrets.service.ts`
- Create: `src/main/services/__tests__/launch-secrets.service.test.ts`
- Modify: `src/shared/models/network.model.ts`

**Interfaces — produces:**

```ts
// src/shared/models/network.model.ts (public; appears in papi.d.ts)
/** A process main can identify on the PAPI network */
export type RequestCallerProcess = 'renderer' | 'extensionHost' | 'dotnetDataProvider';
// add to NetworkMethodHandlerOptions:
//   allowedCallers?: RequestCallerProcess[];

// src/shared/data/request-access.data.ts
export type ConnectionIdentity = 'main' | RequestCallerProcess | 'unidentified';
export type RequestAccessRule = Readonly<{
  callers: readonly RequestCallerProcess[];
  registrant: Exclude<ConnectionIdentity, 'unidentified'>;
}>;
export function getRequestAccessRule(requestType: string): RequestAccessRule | undefined;
export function isRegistrationAllowed(requestType: string, registrant: ConnectionIdentity): boolean;
/** `registrantAllowedCallers` is the option the registering process declared, if any */
export function isCallAllowed(
  requestType: string,
  caller: ConnectionIdentity,
  registrantAllowedCallers?: readonly RequestCallerProcess[],
): boolean;
/** Undefined when `value` is absent; throws on anything but an array of RequestCallerProcess */
export function parseAllowedCallers(value: unknown): RequestCallerProcess[] | undefined;

// src/main/services/launch-secrets.service.ts
export type LaunchedIdentity = 'extensionHost' | 'dotnetDataProvider';
export type LaunchSecrets = { clientSecret: string; serverSecret: string };
/** Replaces any secrets issued earlier for the identity */
export function issueLaunchSecrets(identity: LaunchedIdentity): LaunchSecrets;
/** `launchId` changes each time secrets are issued for the identity */
export function identifyClientSecret(
  presented: string,
): { identity: LaunchedIdentity; serverSecret: string; launchId: number } | undefined;
export function revokeLaunchSecrets(identity: LaunchedIdentity): void;
```

Table rows (exact strings; `requestRegistryTokens:` is a category prefix, the rest are exact):

| Request type | callers | registrant |
| --- | --- | --- |
| prefix `requestRegistryTokens:` | `extensionHost` | `dotnetDataProvider` |
| `object:paratextRegistration.internetSettingsDataProvider-data.setInternetSettings` | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.setParatextDataInternetSettings` | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.setParatextRegistrationData` | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.resetForFirstRun` | (none) | `dotnetDataProvider` |
| `command:platform.resetFirstRun` | `renderer` | `main` |
| `object:DataProtectionService.encryptString` | `extensionHost` | `main` |
| `object:DataProtectionService.decryptString` | `extensionHost` | `main` |
| `command:platform.getLogFileContent` | `renderer` | `main` |

Rules: `main` may always call. With no table row, registration is open to anyone, and a call is
allowed unless `registrantAllowedCallers` is given and excludes the caller. A table row wins over
`registrantAllowedCallers`. `'unidentified'` is never allowed a restricted call.

- [ ] **Step 1: Write failing tests** in `request-access.data.test.ts`:
  - `it('refuses an unidentified caller every table row')` — for each row's request type,
    `isCallAllowed(type, 'unidentified')` is `false` and `isCallAllowed(type, 'main')` is `true`.
  - `it('allows exactly the listed callers')` — e.g.
    `isCallAllowed('requestRegistryTokens:getAccessToken', 'extensionHost')` true; `'renderer'` and
    `'dotnetDataProvider'` false; `isCallAllowed('command:platform.resetFirstRun', 'extensionHost')`
    false.
  - `it('covers a new request type in a controlled category')` —
    `isCallAllowed('requestRegistryTokens:somethingNew', 'renderer')` false.
  - `it('does not treat a longer category name as the controlled one')` —
    `getRequestAccessRule('requestRegistryTokensX:foo')` is `undefined`.
  - `it('lets only the registrant register')` —
    `isRegistrationAllowed('requestRegistryTokens:getAccessToken', 'dotnetDataProvider')` true;
    `'unidentified'`, `'extensionHost'`, `'main'` false;
    `isRegistrationAllowed('command:anything.else', 'unidentified')` true.
  - `it('applies a registrant restriction to unlisted request types')` —
    `isCallAllowed('command:x.y', 'unidentified', ['renderer'])` false; `'renderer'` true; `'main'`
    true; with no third argument, `'unidentified'` true.
  - `it('does not let a registrant restriction widen a table row')` —
    `isCallAllowed('command:platform.getLogFileContent', 'extensionHost', ['extensionHost'])` false.
  - `it('is frozen')` — the module exports no setter, and mutating the rule returned by
    `getRequestAccessRule` throws in strict mode (`Object.isFrozen` on the rule and its `callers`).
  - `it('rejects a malformed allowedCallers')` — `parseAllowedCallers(undefined)` is `undefined`;
    `parseAllowedCallers(['renderer'])` equals `['renderer']`; `'renderer'`, `[1]`, `['main']`,
    `['unidentified']` and `{}` each throw.
  - `it('matches the request types the real handlers register')` — import
    `REGISTRY_TOKEN_REQUEST_TYPE` from `@node/services/request-registry-tokens.service-model` and
    `dataProtectionServiceNetworkObjectName`; assert each has a rule. (Test files may import them;
    the data module must not, because that would publish those modules through `papi.d.ts`.)
- [ ] **Step 2:** Run `npx vitest run src/shared/data/request-access.data.test.ts`. Expected: FAIL
  (module not found).
- [ ] **Step 3:** Implement `request-access.data.ts` and the `network.model.ts` additions. Deep-freeze
  the table. Spell request types as string literals.
- [ ] **Step 4:** Run the test. Expected: PASS.
- [ ] **Step 5: Write failing tests** in `launch-secrets.service.test.ts`:
  - `it('issues two different base64url secrets of 32 bytes')` — both match `/^[A-Za-z0-9_-]{43}$/`
    and differ.
  - `it('identifies a presented client secret')` — returns the identity and that launch's
    `serverSecret`.
  - `it('rejects malformed input without throwing')` — `''`, `'short'`, a 43-character string of
    `=`, and a 10,000-character string each return `undefined`.
  - `it('forgets the previous launch when secrets are issued again')` — the old client secret
    returns `undefined`, and the new `launchId` differs.
  - `it('never matches the server secret as a client secret')`.
  - `it('revokes')`.
- [ ] **Step 6:** Run it. Expected: FAIL.
- [ ] **Step 7:** Implement with `crypto.randomBytes(32)`, storing `sha256(clientSecret)` and
  comparing `sha256(presented)` with `timingSafeEqual` (digests are equal length, so it cannot
  throw).
- [ ] **Step 8:** Run both test files. Expected: PASS. Run `npm run build:types` and confirm the
  only `papi.d.ts` change is `RequestCallerProcess` and `allowedCallers`.
- [ ] **Step 9:** Commit: `PT-2893: Add the request access table and launch secrets`.

---

### Task 3: Handshake identity in the listener

**Files:**
- Modify: `src/main/services/rpc-websocket-listener.ts` (the `new WebSocketServer({...})` call,
  `onClientConnect`, `serveClient`, `acceptLocalClient`)
- Modify: `src/main/services/rpc-server.ts` (constructor: add `identity`)
- Create: `src/main/services/__tests__/rpc-websocket-listener.identity.test.ts`

**Interfaces:**
- Consumes: `identifyClientSecret`, `ConnectionIdentity`.
- Produces: `RpcServer` constructor takes `identity: ConnectionIdentity` as a new last parameter
  (after `isWebSocketWithoutOrigin`, which Task 4 removes) and exposes `readonly identity`.
  `acceptLocalClient` passes `'renderer'`.

Behavior:
- No `x-papi-client-secret` header: accept as `'unidentified'`.
- Header present, `identifyClientSecret` returns `undefined`: reject the upgrade with `401`.
- Valid secret, and a connection made with the same `launchId` is open: reject with `409`.
- Valid secret, and a connection for the same identity made with an **older** `launchId` is open:
  accept, and close the older connection (main replaced that process).
- On accept with a valid secret: the reply carries `x-papi-server-secret`.
- Log the identity on connect; never log a secret.

- [ ] **Step 1:** Use Context7 to confirm how `ws` rejects an upgrade with a status code and adds a
  reply header per request (`verifyClient` and the server's `headers` event are the candidates).
- [ ] **Step 2: Write failing tests** in `rpc-websocket-listener.identity.test.ts`, with a real
  listener on an ephemeral port (follow `rpc-websocket-listener.real-socket.test.ts`) and
  `ws` clients:
  - `it('serves a client that presents no secret as unidentified')`.
  - `it('identifies the extension host by its secret and returns the server secret')` — capture the
    client's `upgrade` event; `response.headers['x-papi-server-secret']` equals the issued one.
  - `it('does not return the server secret to an unidentified client')`.
  - `it('rejects a wrong secret with 401')` — the client's `unexpected-response` event has status
    401 and no `RpcServer` is created.
  - `it('rejects an empty or oversized secret header with 401 and stays up')` — then a valid client
    still connects.
  - `it('refuses a second connection with the same secret while the first is open (409)')`.
  - `it('accepts the same secret again after the first connection closes')`.
  - `it('closes the previous launch when a new launch of the same identity connects')` — issue,
    connect A, issue again, connect B: B is served and A receives a close.
  - `it('serves a local client as renderer')`.
- [ ] **Step 3:** Run it. Expected: FAIL.
- [ ] **Step 4:** Implement. Carry the verified identity from the upgrade check to
  `onClientConnect` in a `WeakMap<IncomingMessage, …>`.
- [ ] **Step 5:** Run the new file plus the existing `rpc-websocket-listener.*.test.ts` and
  `rpc-over-message-port.integration.test.ts`. Expected: PASS.
- [ ] **Step 6:** Commit: `PT-2893: Identify PAPI connections from the handshake`.

---

### Task 4: Enforce the table in `RpcServer`; remove the Origin check

**Files:**
- Modify: `src/main/services/rpc-server.ts` (`processMessage`, `registerRemoteMethod`, constructor)
- Modify: `src/main/services/rpc-websocket-listener.ts` (`serveClient`, `onClientConnect`,
  `registerMethod`)
- Modify: `src/main/services/__tests__/rpc-websocket-listener.real-socket.test.ts` and
  `rpc-websocket-listener.local-client.test.ts` (their Origin cases)
- Create: `src/main/services/__tests__/rpc-server.access.test.ts`

**Interfaces:**
- Consumes: `isCallAllowed`, `isRegistrationAllowed`, `RpcServer.identity`.
- Produces: `RpcServer` constructor no longer takes `isWebSocketWithoutOrigin`;
  `REQUEST_TYPES_REFUSED_TO_BROWSERS_AND_RENDERERS` is gone.

- [ ] **Step 1: Write failing tests** in `rpc-server.access.test.ts` (use
  `fake-web-socket-test.util.ts`), parameterized over every table row and every identity:
  - call allowed or refused exactly as `isCallAllowed` says; a refusal answers
    `MethodNotFound` with `'<method>' is not available on this connection` and logs a warning
    naming the identity.
  - `it('refuses a restricted type sent as a notification and does not propagate it')`.
  - `it('checks every request in a batch separately')` — a batch of one allowed and one restricted
    request yields one result and one error.
  - `it('refuses registration by anyone but the registrant')` — `network:registerMethod` returns
    `false` and the registry is unchanged.
  - `it('lets the registrant re-register after it disconnects')`.
  - `it('refuses main registering a row it does not own')` — listener `registerMethod` for
    `requestRegistryTokens:getAccessToken` returns `false`.
  - `it('still serves unrestricted request types to an unidentified client')`.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Implement. The call check stays ahead of the event branch. Delete the Origin flag,
  its constant, and both `TODO(PT-2893)` comments here and in `onClientConnect`.
- [ ] **Step 4:** Rewrite the Origin cases in the two existing test files as identity cases: a
  socket with an `Origin` header and no secret is `unidentified` and refused; a renderer local
  client is refused Registry tokens; a client with the .NET secret can register the token type; a
  client with the extension host secret can call it.
- [ ] **Step 5:** Run `npx vitest run src/main/services/__tests__ --pool=forks`. Expected: PASS.
- [ ] **Step 6:** Commit: `PT-2893: Enforce the request access table by connection identity`.

---

### Task 5: Registrant-declared `allowedCallers`

**Files:**
- Modify: `src/shared/models/rpc.interface.ts` (`IRpcMethodRegistrar.registerMethod`)
- Modify: `src/shared/services/network.service.ts` (`registerRequestHandler`)
- Modify: `src/client/services/rpc-client.ts` (`registerMethod`)
- Modify: `src/main/services/rpc-server.ts` (`registerRemoteMethod`, `RegisteredRpcMethodDetails`)
- Modify: `src/main/services/rpc-websocket-listener.ts` (`registerMethod`)
- Modify: `src/shared/services/network-object.service.ts` only if its registration path drops
  options (check; pass them through)
- Test: `src/main/services/__tests__/rpc-server.access.test.ts`,
  `src/client/services/__tests__/rpc-client.test.ts`

**Interfaces — produces:**

```ts
// IRpcMethodRegistrar
registerMethod: (
  methodName: string,
  method: InternalRequestHandler,
  methodDocs?: SingleMethodDocumentation,
  options?: { allowedCallers?: RequestCallerProcess[] },
) => Promise<boolean>;
// wire: network:registerMethod params are [methodName, methodDocs?, { allowedCallers }?]
// RegisteredRpcMethodDetails gains: allowedCallers?: readonly RequestCallerProcess[]
```

`registerCommand(name, handler, docs, { allowedCallers: ['renderer', 'extensionHost'] })` already
reaches `registerRequestHandler`.

- [ ] **Step 1: Write failing tests:**
  - `it('refuses a caller the registrant did not allow')` — client A registers `command:a.b` with
    `['renderer']`; an unidentified client's call is refused; a renderer's is routed.
  - `it('keeps a registration without the option open to everyone')`.
  - `it('refuses a malformed allowedCallers and registers nothing')` — `'renderer'`, `['main']`,
    `[42]` each make `network:registerMethod` return `false`; main does not throw.
  - `it('ignores allowedCallers on a table row')` — the .NET identity registering
    `command:paratextRegistration.setParatextRegistrationData` with `['dotnetDataProvider']` still
    leaves the row's callers in force.
  - in `rpc-client.test.ts`: `it('sends allowedCallers as the third registerMethod argument')`.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement, using `parseAllowedCallers` in `registerRemoteMethod`.
- [ ] **Step 4:** Run the two test files and `npm run typecheck`. Expected: PASS. Run
  `npm run build:types`; commit the regenerated `lib/papi-dts/papi.d.ts`.
- [ ] **Step 5:** Commit: `PT-2893: Let a registrant restrict who may call its request handler`.

---

### Task 6: Extension host receives and presents its secrets

**Files:**
- Modify: `src/node/models/interprocess-messages.model.ts`
- Create: `src/client/services/launch-credentials.ts` and `__tests__/launch-credentials.test.ts`
- Modify: `src/client/services/web-socket.factory.ts`, `__tests__/web-socket.factory.test.ts`
- Modify: `src/main/services/extension-host.service.ts` (after `fork`), its test file
- Modify: `src/extension-host/extension-host.ts` (before `networkService.initialize()`)

**Interfaces — produces:**

```ts
// interprocess-messages.model.ts
export const LAUNCH_SECRETS_MESSAGE_TYPE = 'papiLaunchSecrets';
export type LaunchSecretsMessage = {
  type: typeof LAUNCH_SECRETS_MESSAGE_TYPE; clientSecret: string; serverSecret: string;
};
export function isLaunchSecretsMessage(message: unknown): message is LaunchSecretsMessage;

// src/client/services/launch-credentials.ts
export function setLaunchCredentials(credentials: { clientSecret: string; serverSecret: string }): void;
/** Returns the credentials once, then forgets them */
export function takeLaunchCredentials(): { clientSecret: string; serverSecret: string } | undefined;
/** 'unidentified' until a handshake with credentials has passed the server check */
export function getLocalConnectionIdentity(): ConnectionIdentity;
export function markLocalConnectionIdentified(identity: ConnectionIdentity): void;
```

Behavior:
- Main: `issueLaunchSecrets('extensionHost')` before each `fork`, and `child.send` the message
  right after it. Never put the secrets in `extensionHostArgs` or `extensionHostEnv`. Revoke when
  the child exits.
- Host: when `process.send` exists, wait for the message (timeout 10 s) before
  `networkService.initialize()`; on timeout log an error and `process.exit(1)`. When it does not
  exist, skip the wait. Remove the one-shot listener after it fires.
- Factory, extension-host branch: `takeLaunchCredentials()`; when present, connect with the request
  header; on the client's `upgrade` event compare the reply header to `serverSecret`; on mismatch
  or absence close the socket and fail the connect; on match call
  `markLocalConnectionIdentified('extensionHost')`. The renderer branch calls
  `markLocalConnectionIdentified('renderer')` when it uses the MessagePort bridge.

- [ ] **Step 1:** Use Context7 to confirm how the `ws` client sets a request header and exposes the
  handshake reply headers.
- [ ] **Step 2: Write failing tests:**
  - `launch-credentials.test.ts`: `it('hands the credentials out once')`;
    `it('is unidentified until marked')`.
  - `web-socket.factory.test.ts`: `it('sends the client secret header')`;
    `it('fails the connect when the reply lacks the server secret')`;
    `it('fails the connect when the reply has the wrong server secret')`;
    `it('connects with no header when there are no credentials')`.
  - `extension-host.service.test.ts`: `it('sends the launch secrets right after forking')` and
    `it('keeps the secrets out of the arguments and environment')` — assert the fork mock's
    `args` and `options.env` do not contain either secret; `it('issues new secrets on a restart')`.
- [ ] **Step 3:** Run. Expected: FAIL.
- [ ] **Step 4:** Implement. Put the wait in a small exported function in `extension-host.ts`'s
  directory so it can be unit-tested (`it('exits when no secrets arrive')`,
  `it('does not wait without an IPC channel')`).
- [ ] **Step 5:** Run the touched test files. Expected: PASS.
- [ ] **Step 6:** Commit: `PT-2893: Give the extension host its launch secrets over fork IPC`.

---

### Task 7: Enforce the table on the in-process shortcut

**Files:**
- Modify: `src/client/services/rpc-client.ts` (`request`, `registerMethod`)
- Test: `src/client/services/__tests__/rpc-client.test.ts`

**Interfaces — consumes:** `isCallAllowed`, `getLocalConnectionIdentity`, and the `allowedCallers`
each local method was registered with (keep them in a `Map<string, RequestCallerProcess[]>` beside
the local JSON-RPC server).

- [ ] **Step 1: Write failing tests:**
  - `it('refuses a local call the table denies this process')` — identity `'renderer'`, a locally
    registered `command:platform.getLogFileContent` stand-in is allowed; with identity
    `'extensionHost'` the same local call returns the `MethodNotFound` error without running the
    handler.
  - `it('refuses a local call the registrant option denies this process')` — registered with
    `['renderer']`, called as `'extensionHost'`.
  - `it('runs a local call the rules allow')`.
  - `it('treats an unidentified process as unidentified')`.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement: in `request`, when `isLocal`, check before `jsonRpcServer.receive`.
- [ ] **Step 4:** Run `npx vitest run src/client --pool=forks`. Expected: PASS.
- [ ] **Step 5:** Commit: `PT-2893: Apply the access table to in-process requests`.

---

### Task 8: .NET receives and presents its secrets

**Files:**
- Modify: `src/main/services/dotnet-data-provider.service.ts` (`startDotnetDataProvider`), its test
- Create: `c-sharp/LaunchSecrets.cs`, `c-sharp-tests/LaunchSecretsTests.cs`
- Modify: `c-sharp/PapiClient.cs` (`ConnectAsync`, `RegisterRequestHandlerAsync`),
  `c-sharp/Program.cs`
- Modify: `c-sharp/Users/RegistryAccessTokenService.cs` (`InitializeAsync`, the handout log)
- Test: `c-sharp-tests/Users/RegistryAccessTokenServiceTests.cs`, a new
  `c-sharp-tests/PapiClientHandshakeTests.cs`

**Interfaces — produces:**

```csharp
// c-sharp/LaunchSecrets.cs
internal sealed record LaunchSecrets(string ClientSecret, string ServerSecret)
{
    public const string ENVIRONMENT_VARIABLE = "PAPI_LAUNCH_SECRETS";
    /// Reads the environment variable (and clears it), else one line of standard input when it
    /// is redirected (5 s limit). Null when neither holds valid secrets.
    public static LaunchSecrets? ReadFromEnvironmentOrStandardInput(
        Func<string, string?> getEnvironmentVariable,
        Action<string> clearEnvironmentVariable,
        Func<TimeSpan, string?>? readStandardInputLine);
    public static LaunchSecrets? Parse(string? json);
}
// PapiClient: new constructor parameter LaunchSecrets? launchSecrets = null
```

Behavior:
- Main: `issueLaunchSecrets('dotnetDataProvider')` before `spawn`. Packaged: write the JSON line to
  `dotnet.stdin`, then end it. Dev (`dotnet watch` and `dotnet run --no-build`): add
  `PAPI_LAUNCH_SECRETS` to the `env` passed to `spawn` only. Revoke on exit.
- C#: `Program.cs` reads the secrets before constructing `PapiClient`. `ConnectAsync` sets the
  request header when it has secrets, checks the reply header, and throws if the server secret is
  missing or wrong. On a `409` reply it retries up to 10 times, 500 ms apart. After a successful
  connect it drops its reference to the secrets.
- `RegisterRequestHandlerAsync`: when main answers `false`, remove the handler from `_localMethods`
  (and the local RPC method if StreamJsonRpc allows) and log
  `Registration refused for request type "<type>"`.
- `RegistryAccessTokenService.InitializeAsync`: when registration returns `false`, log an error
  that the Registry token service is unavailable and why (the data provider was not started by the
  app). Do not throw: standalone .NET must keep running.
- Drop the "unverified extension name" wording from the handout log and from the remarks; say the
  name comes from the extension host process.

- [ ] **Step 1:** Use Context7 to confirm `ClientWebSocketOptions.SetRequestHeader`,
  `CollectHttpResponseDetails`, `ClientWebSocket.HttpResponseHeaders` and how a non-101 status
  surfaces (`WebSocketException` / `HttpStatusCode`) on .NET 10.
- [ ] **Step 2: Write failing tests:**
  - `LaunchSecretsTests`: `Parse_ValidJson_ReturnsSecrets`; `Parse_Garbage_ReturnsNull` (null,
    empty, `"{}"`, non-JSON, missing field); `Read_EnvironmentVariable_IsUsedAndCleared`;
    `Read_NoVariable_ReadsOneStandardInputLine`; `Read_Neither_ReturnsNull`;
    `Read_StandardInputTimesOut_ReturnsNull`.
  - `PapiClientHandshakeTests` against an in-process `HttpListener` WebSocket endpoint on an
    ephemeral port: `Connect_SendsClientSecretHeader`; `Connect_WrongServerSecret_Throws`;
    `Connect_MissingServerSecret_Throws`; `Connect_NoSecrets_SendsNoHeader`;
    `Connect_ConflictThenAccept_Retries`.
  - `RegistryAccessTokenServiceTests`: `Initialize_RegistrationRefused_LogsAndDoesNotThrow`.
  - `dotnet-data-provider.service.test.ts`: `it('passes the secrets by environment in dev')`,
    `it('writes the secrets to standard input when packaged')`,
    `it('never puts the secrets in the arguments')`.
- [ ] **Step 3:** Run `dotnet test c-sharp-tests/ --filter "FullyQualifiedName~LaunchSecrets|FullyQualifiedName~PapiClientHandshake"`
  and the Vitest file. Expected: FAIL.
- [ ] **Step 4:** Implement. `PapiClient` needs the connection URI injectable for the handshake
  tests (a protected constructor overload is enough).
- [ ] **Step 5:** Run the same commands, then `cd c-sharp && dotnet csharpier .`. Expected: PASS.
- [ ] **Step 6:** Commit: `PT-2893: Give the data provider its launch secrets`.

---

### Task 9: Internet settings refuse a host change sent with the placeholder password

**Files:**
- Modify: `c-sharp/Users/InternetSettingsLogic.cs`, `c-sharp/Users/InternetSettingsDataProvider.cs`
- Test: `c-sharp-tests/Users/InternetSettingsLogicTests.cs`,
  `c-sharp-tests/Users/InternetSettingsDataProviderTests.cs`

**Interfaces — produces:**

```csharp
/// The name of the password that must be supplied for real, or null when the change is fine.
public static string? PasswordRequiredForChange(
    string? currentProxyHost, string? newProxyHost, int? currentProxyPort, int? newProxyPort,
    string? submittedProxyPassword, bool hasSavedProxyPassword,
    string? currentDblServer, string? newDblServer,
    string? currentDblApiServer, string? newDblApiServer,
    string? submittedDblPassword, bool hasSavedDblPassword);
```

Adjust parameter types to the memento's real ones. The setter refuses with a `PlatformError`-style
`INVALID_ARGUMENT` failure in the same shape the provider's other validation failures use.

- [ ] **Step 1: Write failing tests** in `InternetSettingsLogicTests`:
  - `ProxyHostChanged_PlaceholderPassword_SavedPassword_RequiresProxyPassword`
  - `ProxyPortChanged_PlaceholderPassword_SavedPassword_RequiresProxyPassword`
  - `ProxyHostChanged_RealPassword_Allowed`
  - `ProxyHostChanged_Placeholder_NoSavedPassword_Allowed`
  - `DblServerChanged_PlaceholderPassword_RequiresDblPassword`
  - `DblApiServerChanged_PlaceholderPassword_RequiresDblPassword`
  - `SelectedServerChanged_Placeholders_Allowed`
  - `ProxyUsernameOrDblEmailOrGbcServerChanged_Placeholders_Allowed`
  - `NothingChanged_Placeholders_Allowed`
  and in `InternetSettingsDataProviderTests`:
  `SetInternetSettings_HostChangedWithPlaceholder_IsRefusedAndNothingIsSaved`.
- [ ] **Step 2:** Run with `--filter "FullyQualifiedName~InternetSettings"`. Expected: FAIL.
- [ ] **Step 3:** Implement. Check before any write, inside the existing `EnterWrite` scope rules
  for that setter (do not add a second scope).
- [ ] **Step 4:** Before finishing, check whether ParatextData sends a saved credential to
  `OverrideGbcServer`. If it does, add it to the rule with a test and say so in the PR body.
- [ ] **Step 5:** Run the filter again. Expected: PASS. `dotnet csharpier .`
- [ ] **Step 6:** Commit:
  `PT-2893: Refuse an internet-settings host change that keeps a saved password`.

---

### Task 10: Tooling the table breaks

**Files:**
- Modify: `e2e-tests/tests/isolated/internet-settings.page.ts` (the raw-socket
  `sendPapiRequestOnce(… .setInternetSettings …)` near the top)
- Modify: `e2e-tests/tests/isolated/first-run/first-run.spec.ts` (the raw-socket
  `setInternetSettings` call)
- Modify: `.claude/skills/papi-client/SKILL.md`, `.claude/skills/papi-client/reference.md`
- Create: `e2e-tests/tests/isolated/papi-access.spec.ts`

- [ ] **Step 1:** Move both raw-socket `setInternetSettings` calls to go through the app window,
  copying the existing page-evaluate pattern later in `internet-settings.page.ts` (the function
  that gets the provider in the page and calls `provider.setInternetSettings`).
- [ ] **Step 2:** In the skill files, replace the `command:platform.getLogFileContent` examples
  with reading the log file (point at the `log-inspector` skill), and add one line saying which
  request types an unidentified client is refused.
- [ ] **Step 3:** Add `papi-access.spec.ts`:
  - `test('an unidentified socket is refused the restricted request types')` — for
    `requestRegistryTokens:getAccessToken`, `command:platform.getLogFileContent`,
    `command:paratextRegistration.resetForFirstRun` and the internet-settings setter, the response
    is the `MethodNotFound` error.
  - `test('an unidentified socket cannot register a restricted request type')`.
  - `test('an unidentified socket can still list methods and run an open command')` —
    `rpc.discover` succeeds.
- [ ] **Step 4:** Repeat the sweep, by bare identifier so string concatenation cannot hide a hit:
  `grep -rnE "getLogFileContent|resetFirstRun|resetForFirstRun|setParatextRegistrationData|setInternetSettings|setParatextDataInternetSettings|DataProtectionService|requestRegistryTokens" e2e-tests .erb .claude extensions/src src --include=*.ts --include=*.tsx --include=*.md --include=*.sh`.
  Every hit that calls over a raw socket or from a process the row excludes must be fixed or
  listed as a false positive in the commit message. Run the same grep in
  `~/source/repos/paratext-10-studio` and `~/source/repos/paratext-bible-extensions` (read-only)
  and report hits to TJ.
- [ ] **Step 5:** `npm run build:data`, then run the isolated E2E suite for the
  `internet-settings`, `first-run` and `papi-access` specs in the foreground (check
  `package.json`'s `test:e2e:isolated` script for how it takes a subset). Expected: PASS.
- [ ] **Step 6:** Commit: `PT-2893: Move tooling off restricted raw-socket requests`.

---

### Task 11: Run the app

- [ ] **Step 1:** Start the dev app headless (the `app-runner` skill). In the main log confirm:
  the extension host and the data provider each connect with their identity logged; no
  `Registration refused` and no `is not available on this connection` lines. Grep the logs for
  `clientSecret`, `serverSecret` and `PAPI_LAUNCH_SECRETS`; none may appear with a value.
- [ ] **Step 2:** Edit a C# file to trigger a `dotnet watch` restart; confirm .NET reconnects with
  its identity and re-registers the four .NET rows.
- [ ] **Step 3:** Run `command:platform.restartExtensionHost` from the app; confirm the new host is
  identified.
- [ ] **Step 4:** Record what was and was not checked for the PR body. A packaged build on
  Windows, macOS and Linux (standard-input delivery) is a manual check for TJ; do not claim it.

---

### Task 12: Documentation

**Files:**
- Modify: `.context/standards/Security-Guide.md`, `.context/standards/Architecture.md`,
  `.context/standards/Architecture-Decisions.md`,
  `.context/standards/Extension-Development-Guide.md`,
  `src/node/services/request-registry-tokens.service-model.ts` (its `TODO(PT-2893)`),
  `c-sharp/Users/RegistryAccessTokenService.cs` (its `TODO(PT-2893)` and remarks)

- [ ] **Step 1:** Security Guide: replace the stopgap paragraphs under "Paratext Registry access
  tokens" with the identity model, the table, the registrant option and the "extension host
  process only" guarantee; add the loopback bind; correct the claims that extension code "can't
  send" the token request type and that the listed modules are blocked beyond plain `require`;
  list what is not protected (design doc, "What this does not protect against").
- [ ] **Step 2:** `Architecture.md` WebSocket invariants: add connection identity and the one-open-
  connection rule.
- [ ] **Step 3:** `Architecture-Decisions.md`: add `adr-papi-connection-identity-and-access-table`
  in byte-order slug position (date, status, context, decision, alternatives including `wss` and
  deny-by-default, consequences including the standalone-children limit and the dev-only secrets
  file as the route to add, and that a reconnecting child has no secret). Update
  `adr-registry-tokens-via-elevated-privilege` to point at it and drop its stopgap text.
- [ ] **Step 4:** Extension-Development-Guide: document `allowedCallers` on command and request
  handler registration, with the Marketplace-style example, and say what it does not protect
  against.
- [ ] **Step 5:** Remove every remaining `TODO(PT-2893)`:
  `grep -rn "PT-2893" src c-sharp extensions lib .context/standards .claude` must return nothing
  outside `.context/designs/`.
- [ ] **Step 6:** Re-read every comment added or changed in the whole diff
  (`git diff origin/main...HEAD`) and delete backward-facing ones.
- [ ] **Step 7:** Run `/verify-standards` (read-only) and fix what it reports for the touched docs.
- [ ] **Step 8:** Commit: `PT-2893: Document PAPI connection identity and the access table`.

---

### Task 13: Marketplace (paratext-bible-internal-extensions)

Read that repo's `CLAUDE.md` first, including how it consumes paranext-core's `papi.d.ts`; point
it at this workspace's core worktree so `allowedCallers` type-checks.

**Files:**
- Modify: `src/paratext-bible-marketplace/src/main.ts` (the `INSTALL_EXTENSION_COMMAND_NAME`,
  enable and disable `registerCommand` calls)
- Modify: `src/paratext-bible-marketplace/src/util/extension-utils.ts` (`getApiUrlEndpoint`)
- Modify: `src/paratext-bible-marketplace/contributions/settings.json`,
  `contributions/localizedStrings.json`
- Test: beside `extension-utils.ts`

**Interfaces — produces:**

```ts
/** The catalog address released builds always use */
export const PRODUCTION_API_URL = 'https://api-extensions.paratextstudio.org';
/** `isProductionBuild` defaults to `process.env.NODE_ENV === 'production'` (set by webpack) */
export async function getApiUrlEndpoint(endpoint: string, isProductionBuild?: boolean): Promise<string>;
```

- [ ] **Step 1:** Confirm the release build of this extension runs webpack in production mode
  (`webpack/webpack.config.base.ts` reads `NODE_ENV`); if the packaging script does not set it,
  fix the script and say so in the PR body.
- [ ] **Step 2: Write failing tests:** `it('ignores the setting in a production build')` — with the
  setting mocked to `https://example.invalid`, `getApiUrlEndpoint('/extensions', true)` is
  `https://api-extensions.paratextstudio.org/v1/extensions`;
  `it('uses the setting in a development build')`.
- [ ] **Step 3:** Run `npx vitest run src/paratext-bible-marketplace`. Expected: FAIL.
- [ ] **Step 4:** Implement. Pass `{ allowedCallers: ['renderer', 'extensionHost'] }` as the fourth
  argument of the three `registerCommand` calls (docs argument `undefined` if there is none).
- [ ] **Step 5:** Reword the setting's description to say released builds ignore it and always use
  the official address. Change the existing localized string's text if its key still fits;
  otherwise add a new key and use it. If a key is added, check whether any WebView requests
  settings strings by an explicit key list and add it there.
- [ ] **Step 6:** `npm run typecheck && npm run lint && npm test`. Expected: PASS.
- [ ] **Step 7:** Do not run the browser-page chain against production. If a dev build with a local
  test catalog is practical, try the PT-5074 reproduction before and after and write the result on
  PT-5074; otherwise leave that item open on the ticket and say so.
- [ ] **Step 8:** Commit: `PT-5074: Fix the Marketplace catalog address and restrict its commands`.

---

### Task 14: Gates and hand-back

- [ ] **Step 1:** In `paranext-core`: `npm run typecheck && npm run lint && npm test && dotnet test c-sharp-tests/`.
  Expected: all pass. If root Vitest runs out of memory, rerun with `--pool=forks` and say so.
- [ ] **Step 2:** `npm run test:e2e:isolated` for the specs touched in Task 10, in the foreground.
- [ ] **Step 3:** Draft, but do not open, one PR description per repo. Each must include:
  - the "extension host process only" guarantee and a request for reviewers' view on whether it is
    acceptable (link PT-5072);
  - that `wss` was considered and rejected, with the reasons from the design doc, and a request
    for feedback on that decision;
  - what was verified and what was not (packaged builds on three platforms; hand QA not done);
  - that the standalone extension host and standalone .NET lose the restricted features;
  - `AI-assisted` with the session link.
- [ ] **Step 4:** Push both branches (plain push). Report to TJ: commits, gate output, the draft PR
  bodies, anything skipped, and every decision made that the design left to the builder. Ask
  before opening the PRs.
