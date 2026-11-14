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
through `window.papi`. The renderer itself opens no WebSocket to port 8876.
`blockWebSocketsToPapiNetwork` stops a web view's own `window.WebSocket` (replaced with
`papi.WebSocket`) from connecting to it, but not the native constructor on `window.top`, which the
web view can still reach: the web view preamble's `delete window.top` can't remove a
non-configurable property.

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
compares digests in constant time. A wrong secret is refused outright; main proves itself to the
child by returning the server secret in its handshake reply. Secrets never appear on a command line,
in main's own environment, or in a log.

**Unidentified clients keep everything except a short restricted list.** Browser clients are
legitimate: `platform.openDeveloperDocumentationUrl` opens the OpenRPC playground against this
WebSocket, and developers test PAPI calls from browsers and tools. The table in
`src/shared/data/request-access.data.ts` restricts these request types:

| Request type | Who may call | Who may register |
| --- | --- | --- |
| `requestRegistryTokens:` (whole category) | `extensionHost` | `dotnetDataProvider` |
| The internet settings setters | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.setParatextRegistrationData` | `renderer`, `extensionHost` | `dotnetDataProvider` |
| `command:paratextRegistration.resetForFirstRun` | main only | `dotnetDataProvider` |
| `command:platform.resetFirstRun` | `renderer` | `main` |
| `object:DataProtectionService.encryptString` / `.decryptString` | `extensionHost` | `main` |
| `command:platform.getLogFileContent` | `renderer` | `main` |

Main is always allowed to call. A request type with no row can be registered by anyone, as before.
A process that registered a restricted request type may call it only if the row lists it. The same
check runs on the in-process shortcut in `RpcClient.request`, so a handler in the calling process
answers only callers the rules allow. Refusals answer `MethodNotFound` with
`'<method>' is not available on this connection` and are logged with the identity.

**An extension can restrict its own handlers.** `allowedCallers` on `registerCommand` /
`registerRequestHandler` names the processes that may call the handler (see
[Extension-Development-Guide.md](Extension-Development-Guide.md)). It cannot widen a table row, and a
client that registers the name first can receive the calls but cannot make the real handler act.

**The guarantee is "only the extension host process", not "only extensions with the privilege".**
Main cannot tell extensions apart: they share the extension host's connection. Deciding how to keep
one extension from acting as another is PT-5072.

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
The C# handler does not check the allowlist itself, and the extension name it logs is the one the
extension host process supplies. Extension code is not kept from sending the request type: it runs
in the extension host and shares its connection, so the allowlist is what stands between an
extension and a token.

The allowlist stops honest mistakes, not a malicious installed extension. All extensions share one
JavaScript realm in the extension host, so an installed extension can wrap shared built-ins (for
example `JSON.parse`, `Promise.prototype.then`, the writable `globalThis.fetch`, or `Object.freeze`
before activation) and see another extension's tokens without holding the privilege, or send the
request type on the extension host's connection itself. `createProcess` has the same limit. The real
control is which extensions get installed.

### What connection identity does not protect against

- **A malicious installed extension.** Every extension shares one realm and one connection with the
  extension host. It can patch shared built-ins to send any request on the host's connection, or to
  read another extension's token. Main cannot tell that traffic from the host's own. The real
  boundary is which extensions get installed, until extensions run in separate processes.
- **A bad extension's WebView** for rows that allow `renderer`: a WebView can drive its window's PAPI
  connection.
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
