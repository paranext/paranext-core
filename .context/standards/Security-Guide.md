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
