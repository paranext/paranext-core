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

### Paratext Registry access tokens

The `requestRegistryTokens` elevated privilege hands extensions Paratext Registry access tokens
made from the user's registration code. The code stays in the C# data provider. The extension host
checks the caller's `paratextRegistryTokenResources` before forwarding a request on
`requestRegistryTokens:getAccessToken`, a request type extension code can't send through PAPI.
Tokens carry read scopes only, expire after the Registry-set lifetime (currently 20 minutes), and
are valid only at the named service.

The allowlist stops honest mistakes, not a malicious installed extension. All extensions share one
JavaScript realm in the extension host, so an installed extension can wrap shared built-ins (for
example `JSON.parse`, `Promise.prototype.then`, the writable `globalThis.fetch`, or `Object.freeze`
before activation) and see another extension's tokens without holding the privilege. `createProcess`
has the same limit. The real control is which extensions get installed.

The C# handler does not check the allowlist itself. Main refuses the request type to browser pages
and web views with the stopgap below, but anything else that can reach the unauthenticated PAPI
WebSocket can call it for any resource registered with the Registry. Local processes already run
as the user and can read the user's Paratext data directly, so they gain nothing new.

**Insecure temporary stopgap, not a security boundary; PT-2893 must replace it.** Main refuses
`requestRegistryTokens:getAccessToken` from any WebSocket connection whose handshake carried an
`Origin` header, and from renderer connections (`RpcServer.processMessage` in
`src/main/services/rpc-server.ts`). Browsers always send `Origin` on a WebSocket handshake, and page
script can't remove it. The extension host's `ws` client and the C# `ClientWebSocket` send none.
This keeps out two callers that can already call every other PAPI method, and that this request
type would hand a credential that works off the machine:

- A web page open in the user's browser, which can connect to `ws://localhost:8876` because
  connections are not authenticated.
- Any installed extension's web view, privilege or not. It can open a native WebSocket to port 8876
  through `window.top.WebSocket` (see [The renderer's PAPI port](#the-renderers-papi-port)), since
  the window's CSP allows `ws:` connections, or drive its window's PAPI connection.

The stopgap trusts a header instead of identifying the caller, so any process that leaves `Origin`
out gets through. Don't treat it as the fix or build on it.

Rejecting browser connections outright is not the fix: browser clients are legitimate too.
`platform.openDeveloperDocumentationUrl` opens the OpenRPC playground against this WebSocket, and
developers test PAPI calls from browsers; the stopgap refuses them only this request type. As of
2026-10, authenticating the clients the main process launches, so that sensitive request types like
this one can be limited to the extension host, is open work in PT-2893. A renderer connection can't
be trusted with them even once identified, because a web view can drive its window's PAPI
connection.

Rationale: `adr-registry-tokens-via-elevated-privilege` in `Architecture-Decisions.md`.

### Pasting into the focused window

`platform.pasteIntoFocusedWindow` (main, `src/main/paste-into-focused-window.command.ts`) runs
Chromium's own paste into whatever has focus in the focused window, so a hidden-marker Scripture
editor gets the clipboard's every format. It returns only whether the paste was issued and hands the
caller nothing from the clipboard, but the paste lands in the user's text and is saved: a caller that
can also read the project back can read the clipboard — often a password just copied from a password
manager — and the `true` result tells it when.

Who may call it:

- **Renderers** (and so extension web views, which can drive their renderer's PAPI connection):
  served. The Scripture editor's web view needs it, and a web view can already read the clipboard
  in its own frame.
- **WebSocket clients without `Origin`** (the extension host, the .NET data provider, any local
  process): served. They run as the user and could read the clipboard directly.
- **WebSocket clients with `Origin`** (a web page open in the user's browser, which can connect to
  `ws://localhost:8876`): refused, by the same header stopgap as the Registry token request type,
  through a second set in `rpc-server.ts` (`REQUEST_TYPES_REFUSED_TO_BROWSERS`) that a renderer
  connection is not refused. The same limits apply: it trusts a header and does not identify the
  caller, and PT-2893 must replace it.

As of 2026-10, no other PAPI request reads or writes the clipboard; a web view reads it only inside
its own frame, which a WebSocket client cannot reach.

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
