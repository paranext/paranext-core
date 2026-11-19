---
title: Security Guide
description: CSP design, module import restrictions, extension sandboxing, and security best practices for Platform.Bible.
---

# Security Guide

This document covers security policies and restrictions for Platform.Bible development, with a focus on the extension sandbox.

For secret-handling rules (no hardcoded credentials, no `.env` files, etc.), see the "Never Commit Secrets" section in root `CLAUDE.md`.

---

## Content Security Policy (CSP)

Platform.Bible implements a CSP framework with three objectives:

### 1. Extension-Defined Code Protection

Code defined by the extension is allowed to run in the same origin as the parent, but must be restricted by CSP and iframe sandbox. This prevents:

- Unauthorized code execution
- XSS attacks
- Extension code accessing the parent platform UI context

### 2. Third-Party Code Isolation

Code not specifically defined by the extension is only allowed to run in a different origin from the parent. Extensions communicate with third-party code through:

- Message passing
- WebAssembly function sharing

This prevents granting excessive permissions or executing arbitrary downloaded code in the parent origin.

### 3. Balanced Security with Developer Empowerment

The framework provides reasonable defaults that empower extension developers without significantly compromising security, while also offering granular configuration for advanced functionality.

For the full CSP design visualization, see the [CSP Design wiki](https://github.com/paranext/paranext/wiki/Content-Security-Policy-Design).

---

## Module Import Restrictions

Platform.Bible runs extension code in a partially sandboxed environment. Only specific modules are available to extensions.

### Security Approval Criteria

Modules must not enable:

- Access to arbitrary files on the file system
- Execution of code outside the extension host sandbox
- Execution of unintended arbitrary code
- Access to data from the application or other extensions
- Internet access when the application does not allow it

### Allowed Modules

#### Universal (all extension code)

| Module                | Purpose                         |
| --------------------- | ------------------------------- |
| `@papi/core`          | Core PAPI types and utilities   |
| `@sillsdev/scripture` | Scripture reference handling    |
| `platform-bible-utils`| Shared utility functions        |

#### Backend (extension entry file)

| Module          | Purpose                |
| --------------- | ---------------------- |
| `@papi/backend` | Backend PAPI services  |
| `crypto`        | Cryptographic operations |

#### Frontend (WebView files)

| Module                 | Purpose                 |
| ---------------------- | ----------------------- |
| `react`                | React library           |
| `react/jsx-runtime`    | JSX transformation      |
| `react-dom`            | React DOM rendering     |
| `react-dom/client`     | React 18 client APIs    |
| `@papi/frontend`       | Frontend PAPI services  |
| `@papi/frontend/react` | React hooks for PAPI    |
| `platform-bible-react` | UI component library    |

### Blocked Modules and Alternatives

| Blocked           | Use Instead                         | Reason                             |
| ----------------- | ----------------------------------- | ---------------------------------- |
| `fs`              | `papi.storage`                      | File system access control         |
| `http`, `https`   | `fetch`                             | Network access control             |
| `child_process`   | `elevatedPrivileges.createProcess`  | Process spawning control           |
| `util`            | (no direct replacement)             | `getCallSites` / `inspect` concerns |

Extensions may bundle additional packages into their own code, provided they meet the security requirements above.

These restrictions apply to an extension's own `require` of a module. They are not a sandbox:
backend extensions share one JavaScript realm in the extension host, so they guard against honest
mistakes rather than against a malicious installed extension (see
[What connection identity does not protect against](#what-connection-identity-does-not-protect-against)).

For the complete and up-to-date list, see the [Module Import Restrictions wiki](https://github.com/paranext/paranext/wiki/Module-import-restrictions).

---

## Extension Sandboxing

Extensions run in isolated contexts:

1. **Extension Host Process** — backend extension code runs in a separate Node.js process.
2. **WebView Isolation** — frontend code runs in sandboxed iframes with restricted capabilities.
3. **PAPI as Bridge** — all cross-process communication goes through the Platform API.

### The renderer's PAPI port

Each window obtains its connection to main as an Electron `MessagePort`: the preload exposes
`electronAPI.papi.requestPort()` and forwards main's reply into the page with `window.postMessage`.
React and HTML web views are same-origin `srcdoc` iframes, so extension code in them can reach that
bridge on `window.top`. This is defence in depth rather than a boundary: main refuses requests that
do not come from the window's page frame, but a web view can drive that frame's bridge, so what
stops a second channel is that main serves one open port per window and the page keeps the first
port it is handed; an intercepted port gives an extension no capability it does not already hold
through `window.papi`. The renderer itself opens no WebSocket to port 8876, so the main process
cancels every WebSocket request to that port from the windows' session
(`registerPapiPortRequestBlock` in `src/main/services/papi-port-request-block.util.ts`). That covers
every frame and every constructor, including the ones a same-origin web view can borrow from the
renderer: `window.top.WebSocket` (the web view preamble's `delete window.top` can't remove a
non-configurable property), the `constructor` of a socket it was handed, and a fresh iframe added
to the top document. Electron keeps one `onBeforeRequest` listener per session, so registering
another on the default session silently removes the block. As defence in depth, the renderer also
makes `PapiRendererWebSocket` refuse the port (`blockWebSocketsToPapiNetwork`) and puts it in place
of the top window's `WebSocket` and the native `constructor` (`replaceTopWindowWebSocket`), so the
first two routes fail with a clear `Invalid URL` error. See `adr-papi-port-blocked-at-the-session`.

### The renderer's `createElement` guard

Web views are same-origin with the renderer, so `installCreateElementGuard`
(`renderer-create-element-guard.util.ts`, installed by `initialize` in `web-view.service-shard.ts`)
lets only the renderer bundle and the Usersnap widget create restricted tags on the app window. To
do that it takes over parts of the renderer realm, which constrains all renderer code:

- **Do not reassign `window.Error`, or redefine or delete `Error.prepareStackTrace`.** Both are
  locked after startup and such code throws. Assigning `Error.prepareStackTrace` still works.
- **Do not reassign `Document.prototype.createElement` / `createElementNS`, or assign them on a
  document.** Both are non-writable; wrap at a call site instead.
- **Unit tests that call `initialize()` must mock `installCreateElementGuard`**, as the
  `web-view.service-shard.*.test.ts` files do: the real installer locks the test realm and refuses
  a second install. Its own behaviour is tested in `renderer-create-element-guard.install.test.ts`.

What the guard does not stop, and why, is in `adr-create-element-guard-trusts-call-sites` in
[Architecture-Decisions.md](./Architecture-Decisions.md).

### PAPI connection identity

Main's PAPI WebSocket listens on `localhost:8876` only, so nothing off the machine can reach it.
On the machine, main knows which process each connection belongs to without trusting anything the
connection says about itself:

| Identity | How main knows |
| --- | --- |
| `main` | Main's own in-process calls |
| `renderer` | The connection came from main's port broker (see [The renderer's PAPI port](#the-renderers-papi-port)) |
| `extensionHost` | The handshake presented the client secret main gave the extension host it launched |
| `dotnetDataProvider` | The handshake presented the client secret main gave the data provider it launched |
| `unidentified` | A WebSocket connection that presented no secret: a browser page, an external tool, a child started without main |

Main creates both secrets per launch with `crypto.randomBytes(32)` and hands them over by fork IPC
(extension host), standard input (packaged .NET) or an environment variable set only in the spawn
options (`dotnet watch` in development). It keeps only a SHA-256 digest of each client secret and
compares digests in constant time. A wrong secret is refused outright (401); main proves itself to the
child by returning the server secret in its handshake reply. Secrets never appear on a command line,
in main's own environment, or in a log.

The child presents its client secret in the `x-papi-client-secret` handshake header and checks main's
`x-papi-server-secret` reply, then drops its secrets: they are used once, at connect. Each launched
identity has **one open connection**: a second handshake with the same launch's secret is refused
with 409 until the first closes (.NET retries briefly, for `dotnet watch` restarts), and a
connection from an earlier launch is closed when the next launch connects. The renderer is not a
WebSocket client, so its identity comes from the port broker, not a header.

**Unidentified clients keep everything except a short restricted list.** Browser clients are
legitimate: `platform.openDeveloperDocumentationUrl` opens the OpenRPC playground against this
WebSocket, and developers test PAPI calls from browsers and tools. The table in
`src/shared/data/request-access.data.ts` restricts these request types:

| Request type | Who may call | Who may register |
| --- | --- | --- |
| `requestRegistryTokens:` (whole category) | `extensionHost` | `dotnetDataProvider` |
| The internet settings setters | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.setParatextRegistrationData` | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.validateParatextRegistrationData` | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.getParatextRegistryUrl` | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.resetForFirstRun` | main only | `dotnetDataProvider` |
| `command:platform.resetFirstRun` | `renderer` | `main` |
| `object:DataProtectionService.encryptString` / `.decryptString` | `extensionHost` | `main` |
| `command:platform.getLogFileContent` | `renderer` | `main` |

Main is always allowed to call. A request type with no row can be registered by anyone, and the
first to register it receives every call: a request type whose handler is handed a secret, or whose
answer decides where the user is sent, needs a row for its registrant even when its callers are
harmless, as `validateParatextRegistrationData` and `getParatextRegistryUrl` have. A TS process
applies the same check to its own handlers in `RpcClient.request`, so a handler in the calling
process answers only callers the rules allow. .NET's `PapiClient` calls its own handlers directly,
because no third-party code runs there. Refusals answer `MethodNotFound` with
`'<method>' is not available on this connection` and are logged with the identity.

**An extension can restrict its own handlers.** `allowedCallers` on `registerCommand` names
the processes that may call the handler (see
[Extension-Development-Guide.md](Extension-Development-Guide.md)). It is ignored for a request type
the table restricts, and a client that registers the name first can receive the calls but cannot
make the real handler act.

**The guarantee is "only the extension host process", not "only extensions with the privilege".**
See [What connection identity does not protect against](#what-connection-identity-does-not-protect-against).
Deciding how to keep one extension from acting as another is PT-5072.

**A child started without main loses the restricted features.** `npm run start:extension-host` and
VS Code's "Debug Extension Host" have no IPC channel, and `npm run start:data` and "Debug .NET Core"
have no secret, so each connects unidentified: the extension host is refused Registry tokens,
`papi.dataProtection` and the setters, and main refuses .NET's registration of its rows (.NET logs
each refusal and keeps running).

### Paratext Registry access tokens

The `requestRegistryTokens` elevated privilege hands extensions Paratext Registry access tokens
made from the user's registration code. The code stays in the C# data provider. The extension host
checks the caller's `paratextRegistryTokenResources` before forwarding a request on
`requestRegistryTokens:getAccessToken`. Tokens carry read scopes only, expire after the
Registry-set lifetime (currently 20 minutes), and are valid only at the named service.

Main lets only the extension host process call `requestRegistryTokens:` request types and only the
data provider main launched register them (see [PAPI connection identity](#papi-connection-identity)).
The C# handler does not check the allowlist itself. The public PAPI surface gives extensions no way
to send this request type, so an honest extension reaches it only through the privilege getter,
which checks the allowlist. Main cannot tell extensions apart on the host's connection, so a
malicious extension can still send it directly (see
[What connection identity does not protect against](#what-connection-identity-does-not-protect-against)).

### What connection identity does not protect against

- **A malicious installed extension.** Every extension shares one JavaScript realm and one
  connection with the extension host. It can wrap shared built-ins (for example `JSON.parse`,
  `Promise.prototype.then`, the writable `globalThis.fetch`, or `Object.freeze` before activation)
  to read another extension's token without holding the privilege, act as another extension, or
  send any request on the host's connection, including ones the privilege APIs guard
  (`requestRegistryTokens:`, `createProcess`). Main cannot tell that traffic from the host's own, so
  the allowlists stop honest mistakes, not this. The real boundary is which extensions get
  installed, until extensions run in separate processes.
- **A bad extension's WebView** for rows that allow `renderer`: a WebView can drive its window's PAPI
  connection, and reach other renderer internals through `window.top` (open work: PT-5065).
- **Malware running as the same user.** It can read process memory and, on Linux, a process's
  initial environment (where the development .NET secret travels).
- **Anything not on the restricted list.** A browser page can still call every other request type,
  including ones that write project data and settings.

The connection is not encrypted (`wss`): loopback traffic never leaves the machine, the server
secret already proves main to its children, and browsers refuse a self-signed certificate on
`wss://` unless the user installs it, which would break the playground.

Rationale: `adr-papi-connection-identity-and-access-table` and
`adr-registry-tokens-via-elevated-privilege` in `Architecture-Decisions.md`.

---

## Security Best Practices

When developing extensions:

- Use PAPI services instead of direct system access.
- Validate all input data, especially from external sources.
- Avoid storing sensitive data in plain text.
- Use the provided storage APIs for persistence.
- Follow the principle of least privilege.

---

## Related Documentation

- [Content Security Policy Design wiki](https://github.com/paranext/paranext/wiki/Content-Security-Policy-Design)
- [Module Import Restrictions wiki](https://github.com/paranext/paranext/wiki/Module-import-restrictions)
