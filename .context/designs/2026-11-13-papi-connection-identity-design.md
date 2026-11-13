# PAPI network: identify connections and restrict sensitive request types

> **Frozen record** — design approved by TJ Couch on 2026-11-13, for the
> `pt-2893-papi-connection-identity` branch in paranext-core and the matching branch in
> paratext-bible-internal-extensions. Once implemented, the code is the authority; read the current
> files rather than this document.

PT-2893 · context: PT-4865 (Registry access tokens, done), PT-4109 (port 8876 collisions, shelved
here) · related: PT-1566 / PR #3007 (extension sandbox), PT-2900 (secure WebSocket)

## Problem

The PAPI network does not know who a connection is, so it cannot decide what a connection may do.

- **No authentication.** The WebSocket server on `localhost:8876` checks nothing when a client
  connects. Any local process, and any page open in the user's browser, can call every registered
  request type.
- **No ownership.** Method registration is first-come: any client can claim a name nobody has
  registered yet, including a sensitive one before its real handler starts.
- **One stopgap.** Main refuses `requestRegistryTokens:getAccessToken` on connections whose
  handshake carried an `Origin` header and on renderer ports. It trusts a header instead of
  identifying the caller, so any local process that leaves `Origin` out can still get a Paratext
  Registry token for any resource. Its own comments call it insecure and name PT-2893 as the
  replacement.

A read-only sweep on 2026-11-13 found that a browser page can today:

1. Change the proxy and DBL server addresses while keeping the saved passwords in use (see
   [Internet settings](#6-internet-settings-saved-passwords)).
2. Delete or switch the user's registration.
3. Decrypt anything protected with `papi.dataProtection`.
4. Read the whole main log.
5. If the Marketplace extension is installed: point the catalog at another server and install an
   extension from it. This chain is **not verified end to end**.

### What the code does today (origin/main `a3e88e61938`)

- **Server.** `RpcWebSocketListener` (`src/main/services/rpc-websocket-listener.ts`) creates the
  `ws` server bound to `localhost`. `onClientConnect` gives each socket a number and records one
  boolean, whether the handshake had no `Origin`. Each connection gets its own `RpcServer`
  (`src/main/services/rpc-server.ts`).
- **Renderer.** Not a WebSocket client. Main's port broker
  (`src/main/services/papi-port-broker.service.ts`) hands each window one MessagePort and calls
  `acceptLocalClient(socket, 'renderer:<windowId>')`. So main already knows which connections are
  renderers.
- **Extension host.** Forked by main (`src/main/services/extension-host.service.ts`) with an IPC
  channel that carries only the started and graceful-shutdown messages. It connects with `ws` to
  the hardcoded port and presents nothing.
- **.NET data provider.** Spawned by main (`src/main/services/dotnet-data-provider.service.ts`):
  the published binary when packaged, `dotnet watch` or `dotnet run --no-build` in dev. It connects
  with `ClientWebSocket` (`c-sharp/PapiClient.cs`) and presents nothing. `npm run start:data` and
  VS Code's "Debug .NET Core" start it without main.
- **Routing.** `RpcServer.processMessage` routes on the method name alone. `registerRemoteMethod`
  accepts any unclaimed name. Only the owning connection can unregister.
- **In-process shortcut.** A process that calls a request type it registered itself runs the
  handler directly and never asks main (`RpcClient.request` in
  `src/client/services/rpc-client.ts`; `PapiClient.SendRequestAsync` in C#).
- **Events.** Main tracks who registered each event and only warns on a foreign announcement.
- **Extensions.** All extensions share one JavaScript realm and the extension host's single
  connection. Main cannot tell them apart.

## Goals

1. Main knows, for every connection, which process it is: without trusting anything the
   connection says about itself.
2. A short list of sensitive request types can be called only by the processes listed for them,
   and registered only by the one process listed for them.
3. The `Origin` stopgap is gone.
4. Extensions can protect their own request handlers the same way, without core naming them.

## Non-goals

- **Locking out unidentified clients in general.** Browser pages, the OpenRPC playground, E2E
  fixtures and the `papi-client` skill keep today's access to everything not on the list. The
  Security Guide's "browser clients are legitimate" stands.
- **Telling extensions apart.** The guarantee for a restricted request type is "only the extension
  host process", not "only extensions that declared the privilege". See
  [What this does not protect against](#what-this-does-not-protect-against).
- **Event ownership.** Blocking foreign event announcements waits for the June 2026 deprecations to
  age. Tracked separately.
- **Dynamic ports** (PT-4109). Shelved. This design leaves a channel it can reuse.
- **WebView isolation** (`window.top`, renderer CSP). Tracked in PT-2801, PT-2896 and PT-2985.
- **Encrypting the socket** (`wss`). Considered and rejected; see [Approaches](#approaches).

## Anti-goals

- A check that depends on a header, a name or an argument the caller supplies.
- A table that anything can change at runtime.
- A secret that appears on a command line, in main's own environment, or in a log.
- A change that breaks a client which presents nothing. Unidentified clients must keep working for
  everything not on the list.

## Constraints

- The server stays bound to loopback (`adr-papi-websocket-hostname-bind`).
- The renderer stays on MessagePort (`adr-renderer-papi-transport-is-messageport`).
- No client reconnects today: `RpcClient` cannot (TODO PT-4495), the extension host exits when it
  loses its connection, and C# `PapiClient` connects once. This design does not add reconnect. Each
  child uses its secrets once, at connect, and then drops them; reconnect work (PT-4495) will need
  a way to obtain a fresh secret.
- `dotnet watch` restarts the .NET process in dev; whatever delivers its secret must survive that.
- Modules imported by `papi.d.ts` sources are published. The existing stopgap spells its request
  type out as a string for that reason; the shared table has the same concern.

## Approaches

### What unidentified connections may do

| Option | Trade-off |
| --- | --- |
| **A. Stay open, minus a sensitive list** (chosen) | Small, breaks no tooling beyond the listed request types. A browser page can still write project data and settings. |
| B. Deny by default | Closes the browser-page hole. Every external client needs a credential route, and it reverses the Security Guide's position on browser clients. |
| C. Tiered (read-only unless identified) | Middle ground, with the cost of classifying every request type. |

TJ chose A: it matches what was already agreed in the PR #2899 review.

### How a child presents its secret

| Option | Trade-off |
| --- | --- |
| **In the WebSocket handshake request** (chosen) | Identity is fixed before the connection can send anything, so no registration can arrive first. Browser pages cannot set handshake headers. |
| In a grown `network:announcePeer` message | Reuses an existing message, but the connection exists unidentified until it arrives. |

### Whether to encrypt (`wss`)

Rejected. Loopback traffic never leaves the machine and capturing it needs administrator rights.
The server check below already proves the server to its children. `wss` does nothing to identify
clients. It would need a certificate generated per launch (a new dependency), pinning code in `ws`
and C#, and browsers refuse a self-signed certificate on `wss://` unless the user installs it as
trusted, which breaks the playground. **The PR description must state this decision and ask
reviewers for feedback on it.**

### Protecting an extension's own request types

| Option | Trade-off |
| --- | --- |
| **Registrant declares allowed callers at registration** (chosen) | About a day. Core does not name extension commands. A client that claims the name first can receive calls but cannot make the real handler act. |
| Hard-code extension commands in core's table | Strongest against squatting. Core has to know another repo's command names. |
| A WebViewController with a secret shared with its WebView | Does not work today: same-origin WebViews can read each other's content and share one PAPI connection. |

## Decisions

### 1. Connection identity

Every connection has one identity, set when main accepts it and never changed:

| Identity | How main knows |
| --- | --- |
| `main` | Main's own in-process calls. Always allowed. |
| `renderer` | The connection came from main's port broker. |
| `extensionHost` | The handshake presented the extension host's secret. |
| `dotnetDataProvider` | The handshake presented the .NET data provider's secret. |
| `unidentified` | A WebSocket connection that presented no secret. |

- The identity replaces `isWebSocketWithoutOrigin` on `RpcServer`.
- A handshake that presents a **wrong** secret is rejected outright and logged. Presenting nothing
  is `unidentified`.
- One open connection per launched identity. A second valid handshake is refused while the first
  connection is open, and accepted again once it has closed. This is the port broker's rule for
  renderer windows. `dotnet watch` restarts fit it: the old process's socket closes before the new
  process connects with the same secret. If the new process arrives first it is refused, so .NET
  retries the connect briefly.
- When main starts a child again it issues new secrets. A connection made with the previous
  launch's secret is closed when the new launch connects, so a restarted extension host is never
  blocked by its predecessor's lingering socket.

### 2. Launch secrets and the server check

Main creates two values per child per launch with `crypto.randomBytes(32)`:

- the **client secret**, which the child presents in its handshake request;
- the **server secret**, which main returns in its handshake reply, only to a connection that
  presented the valid client secret. The child closes the connection if the reply lacks it.

The server check is wanted but not make-or-break: if `ws` or `ClientWebSocket` cannot expose
handshake reply headers cleanly, drop it and say so in the PR.

Delivery:

| Child | Mode | Channel |
| --- | --- | --- |
| Extension host | forked by main (dev and packaged) | A message on the existing fork IPC channel, sent before any extension loads. The host waits for it before connecting and fails loudly on a timeout. |
| Extension host | standalone (no IPC channel) | None. See decision 9. |
| .NET | packaged | Standard input. |
| .NET | dev (`dotnet watch`, `dotnet run --no-build`) | An environment variable set only in the `spawn` options. .NET clears its own copy on read so its children do not inherit it. `dotnet watch` keeps the variable and passes it to each restarted child. |

- Main compares SHA-256 digests of the presented and expected secrets with `timingSafeEqual`.
- Each child presents its client secret and checks the server secret once, at connect, then drops
  both. The extension host connects before any extension loads, so no extension code runs while
  the host holds them.
- After handing the secrets over, main keeps only the SHA-256 digest of each client secret, plus
  the server secret it has to send back.
- Secrets are never logged and never placed on a command line or in main's own environment.
- Both .NET delivery paths get tests.

### 3. The access table

One frozen table in `src/shared`, imported by main and by every TypeScript client. No function
adds or changes rows at runtime; a test pins that.

| Request type | Allowed callers | Registrant |
| --- | --- | --- |
| `requestRegistryTokens:` (whole category) | `extensionHost` | `dotnetDataProvider` |
| Internet-settings setter (`object:paratextRegistration.internetSettingsDataProvider-data.setInternetSettings` and the deprecated `command:paratextRegistration.setParatextDataInternetSettings`) | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.setParatextRegistrationData` | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.resetForFirstRun` | none (main only) | `dotnetDataProvider` |
| `command:platform.resetFirstRun` | `renderer` | `main` |
| `object:DataProtectionService.encryptString` / `.decryptString` | `extensionHost` | `main` |
| `command:platform.getLogFileContent` | `renderer` | `main` |

Rules:

- A row matches an exact request type or a whole category prefix. A new request type in a
  controlled category is refused until listed.
- **Register:** only the row's registrant; refused for everyone else, including a client that asks
  first.
- **Call:** only the row's callers. `main` is always allowed.
- **As an event:** the call check runs before the event branch, as the stopgap's does today.
- **Unregister / re-register:** unregister is already owner-only; re-registration follows the
  registrant rule.
- **No automatic self-permission.** A process may call a request type it registered only if the
  row lists it.
- Refusals return an error to the caller and log the identity and connection.
- A legitimate handler whose registration is refused fails loudly.
  `RegistryAccessTokenService.InitializeAsync` currently ignores a failed registration.

### 4. In-process enforcement

The in-process shortcut in `RpcClient.request` checks the same table before running a local
handler, using the process's own identity. Registrant-declared restrictions (below) are applied
there too, since the registering process knows its own options.

This makes the rule consistent, not stronger: code inside a process can still call a handler
function directly. C# gets no copy of the table. No third-party code runs in the .NET process, and
a second copy would have to be kept in agreement.

### 5. Registrant-declared restrictions

`registerRequestHandler` (and the command and network-object registration paths built on it) takes
an option naming the identities allowed to call the handler. The option travels with
`network:registerMethod`; main stores it with the method and enforces it in the same place as the
table.

- A registrant can only restrict its own handlers. It cannot widen a table row.
- First use: the Marketplace extension's install, enable and disable commands, restricted to
  `renderer` and `extensionHost`.

### 6. Internet settings: saved passwords

Today the setter keeps the saved proxy and DBL passwords whenever the caller sends back the
`********` placeholder (`InternetSettingsLogic.cs`), even when the caller changes the host those
passwords are sent to.

**C#:** refuse a change of host that arrives with the placeholder for the matching password. The
caller must supply the real password in the same request.

| Changed field | Password that must be supplied |
| --- | --- |
| `ProxyHost`, `ProxyPort` | `ProxyPassword` |
| `OverrideDBLServer`, `OverrideDBLApiServer` | `DBLPassword` |

- `SelectedServer` is exempt: it is a choice among known servers, and the settings form changes it
  while echoing the placeholders back.
- `ProxyUsername`, `DBLEmail` and `OverrideGbcServer` are exempt. (Builder: confirm no saved
  credential is sent to the GBC server; if one is, add it to the table.)
- Keeping `SelectedServer` exempt also matters to users: some use the same registration across
  registry servers.
- Refusing is chosen over clearing the saved password: nothing in the app today lets a user
  re-enter a proxy or DBL password, so clearing would strand them.

**No UI change.** Neither internet-settings form has a proxy, password or override-server field:
the `paratext-registration` form's only server control is `selectedServer`, and the first-run step
only writes `permittedInternetUse`. Those fields exist only in the type declaration and the C#
setter. A form that adds them later must ask for the password whenever the host changes.

Whether ParatextData actually sends the saved credentials to a changed host is unverified; the fix
is worth making either way.

### 7. Marketplace (paratext-bible-internal-extensions)

- Restrict the install, enable and disable commands with the registrant option.
- Stop reading the catalog address from the `paratext-bible-marketplace.apiUrl` setting in
  production builds; use a build-time constant. The setting is honoured only in dev builds.
- Update the setting's description to say it is ignored in production, with a new localized string
  if the existing one cannot simply be reworded.
- Verify the browser-page chain before describing it as code execution anywhere.

### 8. Tooling that the table breaks

- **E2E:** `e2e-tests/tests/isolated/internet-settings.page.ts` and
  `e2e-tests/tests/isolated/first-run/first-run.spec.ts` call `setInternetSettings` over a raw
  socket. Move them to call through the app window, as the same page file already does elsewhere.
- **`papi-client` skill:** it documents `command:platform.getLogFileContent` over a raw socket.
  Point it at the log file instead.
- A grep on 2026-11-13 found no other raw-socket caller in core's E2E fixtures, `.erb/scripts` or
  `.claude/`, and no caller of any listed request type in paratext-10-studio,
  paratext-bible-extensions or paratext-bible-internal-extensions. A request type built by string
  concatenation would not have matched, so repeat the sweep before treating this as complete.

### 9. Standalone children

Two children can be started without main, for debugging:

- **.NET:** `npm run start:data` and VS Code's "Debug .NET Core".
- **Extension host:** `npm run start:extension-host` and VS Code's "Debug Extension Host". It has
  no IPC channel, which the host already allows for.

Neither has a secret, so each connects as `unidentified`:

- The extension host skips the wait when it has no IPC channel. Its calls to Registry tokens,
  `papi.dataProtection` and the two setters are refused.
- Main refuses .NET's registration of its four rows: Registry tokens, the internet-settings setter,
  `setParatextRegistrationData` and `resetForFirstRun`. .NET logs each refusal and keeps running.
  The rest of the internet-settings data provider, including its getter, still works.

TJ accepted this: running a child standalone is uncommon. If someone later needs these features
while debugging a standalone child, the route to add is dev-only: in unpackaged builds main writes
both children's secrets to a user-only file, and a standalone child reads it when it was handed
nothing. The new decision record notes this limit and that route.

## What this does not protect against

- **A malicious installed extension.** Every extension shares one realm and one connection with
  the extension host. It can patch shared built-ins to send any request on the host's connection,
  or to read another extension's token. Main cannot tell that traffic
  from the host's own. PR #3007 narrows the routes to a private socket but does not, and cannot
  in-process, close these. The real boundary is which extensions get installed, until extensions
  run in separate processes.
- **A bad extension's WebView** for rows that allow `renderer`: a WebView can drive its window's
  PAPI connection.
- **Malware running as the same user.** It can read process memory and, on Linux, a process's
  initial environment.

**The PR description must state the "extension host process only" guarantee and ask reviewers
whether that is acceptable.**

## Components

paranext-core:

- `src/main/services/rpc-websocket-listener.ts` — verify the handshake, assign the identity, return
  the server secret, reject a wrong secret, refuse a second open connection of the same identity.
- `src/main/services/rpc-server.ts` — carry the identity; enforce the table and registrant options
  on call and on register; remove `REQUEST_TYPES_REFUSED_TO_BROWSERS_AND_RENDERERS` and
  `isWebSocketWithoutOrigin`.
- A new launch-secret module in `src/main/services/` — create, hold and compare secrets.
- `src/main/services/extension-host.service.ts`, `src/extension-host/extension-host.ts` — send and
  receive the secrets over fork IPC before extensions load.
- `src/main/services/dotnet-data-provider.service.ts`, `c-sharp/Program.cs`,
  `c-sharp/PapiClient.cs` — deliver by standard input or environment variable; present the client
  secret; check the server secret.
- `src/client/services/rpc-client.ts` and the extension host's WebSocket factory — present the
  client secret, check the server secret, enforce the table on the in-process shortcut.
- A new shared table module in `src/shared/` — the frozen table and the matching function.
- `src/shared/services/network.service.ts` and `src/shared/data/rpc.model.ts` — the allowed-callers
  registration option and its travel in `network:registerMethod`.
- `c-sharp/Users/RegistryAccessTokenService.cs` — fail loudly on a refused registration; drop the
  "unverified extension name" caveat. `PapiClient.RegisterRequestHandlerAsync` leaves the local
  handler in `_localMethods` after a refusal; remove it there.
- `c-sharp/Users/InternetSettingsLogic.cs` and `InternetSettingsDataProvider.cs` — decision 6.
- E2E and skill fixes — decision 8.
- Docs: `Security-Guide.md` (replace the stopgap paragraphs; add the loopback and identity model;
  correct the claims that extension code "can't send" the token request type and that the listed
  modules are blocked beyond plain `require`), `Architecture.md` WebSocket invariants,
  `Architecture-Decisions.md` (a new entry for connection identity and the table, including the
  `wss` rejection and the standalone-children limit; update `adr-registry-tokens-via-elevated-privilege`), the
  Extension-Development-Guide for the registration option, and `papi.d.ts` regenerated.

paratext-bible-internal-extensions:

- `src/paratext-bible-marketplace/src/main.ts` — the registration option on install, enable and
  disable.
- `src/paratext-bible-marketplace/src/util/extension-utils.ts`, `contributions/settings.json` and
  the localized strings — decision 7.

One PR per repo. The internal-extensions PR depends on the core PR for the registration option.

## Hidden case

Not applicable: nothing here synchronizes views.

## Testing

- **Listener, real sockets:** valid secret gives the right identity; wrong secret is rejected;
  no secret is `unidentified`; a second valid connection is refused while the first is open and
  accepted after it closes; the reply carries the
  server secret only for a valid client secret.
- **`RpcServer`:** for each table row and each identity, call and register are allowed or refused
  as the table says, including the event branch and re-registration after the owner disconnects.
- **Table:** frozen; exact and prefix matching; every row's request-type string matches the
  constant the real handler registers with, so the two cannot drift.
- **Single entry point:** every remote request reaches a handler only through the enforcing path.
- **In-process shortcut:** a local call to a row that excludes the calling process is refused.
- **Registrant option:** enforced by main and locally; cannot widen a table row.
- **Extension host:** waits for the IPC message before connecting; times out loudly; with no IPC
  channel, connects without waiting.
- **C# (NUnit):** reads the secret from standard input and from the environment variable; clears
  the variable; presents the header; closes on a missing server secret; logs a refused
  registration; a host change with a placeholder password is refused, a host change with a real
  password is accepted, and a `SelectedServer` change with placeholders is accepted.
- **E2E:** an unidentified socket is refused each listed request type and cannot register one; the
  app still starts and the playground still lists methods.
- **Manual:** packaged build on Windows, macOS and Linux (standard-input delivery); dev with
  `dotnet watch`, including a C# edit that restarts .NET.

## Out of scope and follow-ups

Jira, filed 2026-11-13:

- PT-5072: decide how to stop one extension acting as another or as the platform (carries the
  back-door sweep findings).
- PT-5073: let only the process that registered an event send it.
- PT-5074: Marketplace catalog address and command restriction (internal-extensions); blocked by
  PT-2893 for the command restriction.
- PT-4109: comment describing the secret-delivery channel a dynamic port can reuse, and the server
  check.
- PT-2801, PT-2896, PT-2985: comments with the WebView findings.
- PT-2900 (figure out secure WebSocket): closed by the `wss` decision once the ADR entry merges.

Left to the builder:

- Header names and secret encoding.
- How the shared table avoids being published through `papi.d.ts`.
- How the Marketplace extension detects a production build.
- The exact shape and name of the allowed-callers registration option. `NetworkMethodHandlerOptions`
  on `registerRequestHandler` already exists and is passed through by the command service.
