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

---

## WebView Definition Security Keys

Four `WebViewDefinition` properties gate a WebView's execution environment: `allowScripts`,
`allowSameOrigin`, `allowedFrameSources`, and `allowPopups`. A WebView provider supplies these
values, and only the provider can — none of the four is in the WebView definition's
updatable-property list, so a running WebView's own content cannot widen its own sandbox. Even so,
the platform never treats a value that merely passed through as trustworthy on its own:

- **Stripped on save.** `SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS` (`web-view.model.ts`) excludes all
  four from what gets persisted into a saved layout, so a WebView never gets reloaded with a stale
  or tampered value for one of these keys — the provider must re-supply them every time it provides
  the WebView's content.
- **Derived on read.** `openOrReloadWebView` (`web-view.service-shard.ts`) recomputes each of the
  four from the provider's freshly-returned `WebViewDefinition` and assigns them into the resulting
  `WebViewTabProps` after the initial object spread — never copying them straight through from the
  provider's raw object. `allowSameOrigin` gets an explicit default when unset, as does
  `allowScripts` for every content type except URL WebViews, where the provider's value is left as
  it came; `allowedFrameSources` is filtered down to `https:`, `papi-extension:`, and
  `http://localhost:` schemes (HTML and React WebViews) or matched against the WebView's own
  patterns (URL WebViews); `allowPopups` defaults to `false` when unset. The derived values are what
  reach the iframe, never the provider's raw object — `allowScripts`, `allowSameOrigin` and
  `allowPopups` through the `sandbox` attribute the WebView component builds, and
  `allowedFrameSources` through the `frame-src` directive of the CSP, which is built into the
  WebView's content by `openOrReloadWebView` itself before the component ever sees it.

Any key added to `SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS` for the same reason (a provider-supplied
value that must not reach the iframe unmediated) should get the same treatment: an explicit default
and an assignment after the `{ ...webView }` spread, not a bare pass-through.

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
