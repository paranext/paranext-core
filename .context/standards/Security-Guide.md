---
title: Security Guide
description: CSP design, module restrictions, extension sandboxing, and vulnerability patterns to avoid.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Security Guide

This document covers security policies and restrictions for Platform.Bible extension development.

---

## Content Security Policy (CSP) Design

Platform.Bible implements a Content Security Policy framework with three core security objectives:

### 1. Extension-Defined Code Protection

Code specifically defined by the extension is allowed to run in the same origin as the parent, but must be restricted by CSP and iframe sandbox. This prevents:
- Unauthorized code execution
- XSS attacks
- Extension code accessing the parent platform UI context

### 2. Third-Party Code Isolation

Code not specifically defined by the extension is only allowed to run in a different origin from the parent. Extensions communicate through secure channels:
- Message passing
- WebAssembly function sharing

This prevents granting excessive permissions or executing arbitrary downloaded code in the parent origin.

### 3. Balanced Security with Developer Empowerment

The framework provides reasonable defaults that empower extension developers without significantly compromising security, while also providing granular configuration for advanced functionality.

For the full CSP design visualization, see the [CSP Design wiki](https://github.com/paranext/paranext/wiki/Content-Security-Policy-Design).

---

## Module Import Restrictions

Platform.Bible runs extension code in a partially sandboxed environment to promote user safety. The application provides specific modules for extensions while preventing imports of others.

### Security Approval Criteria

Modules must not enable:
- Access to arbitrary files on the file system
- Execution of code outside the extension host sandbox
- Execution of unintended arbitrary code
- Access to data from the application or other extensions
- Internet access when the application does not allow it

### Allowed Modules

#### Universal Imports (All Extension Code)

| Module | Purpose |
|--------|---------|
| `@papi/core` | Core PAPI types and utilities |
| `@sillsdev/scripture` | Scripture reference handling |
| `platform-bible-utils` | Shared utility functions |

#### Backend (Extension Entry File)

| Module | Purpose |
|--------|---------|
| `@papi/backend` | Backend PAPI services |
| `crypto` | Cryptographic operations |

#### Frontend (WebView Files)

| Module | Purpose |
|--------|---------|
| `react` | React library |
| `react/jsx-runtime` | JSX transformation |
| `react-dom` | React DOM rendering |
| `react-dom/client` | React 18 client APIs |
| `@papi/frontend` | Frontend PAPI services |
| `@papi/frontend/react` | React hooks for PAPI |
| `platform-bible-react` | UI component library |

### Blocked Modules and Alternatives

| Blocked | Use Instead | Reason |
|---------|-------------|--------|
| `fs` | `papi.storage` | File system access control |
| `http`, `https` | `fetch` | Network access control |
| `child_process` | `elevatedPrivileges.createProcess` | Process spawning control |
| `util` | N/A | Security concerns with `getCallSites` and `inspect` |

### Bundling Additional Packages

Extensions may bundle additional packages into their code as needed, provided they meet security requirements.

For the complete list and updates, see the [Module Import Restrictions wiki](https://github.com/paranext/paranext/wiki/Module-import-restrictions).

---

## Extension Sandboxing

Extensions run in isolated contexts:

1. **Extension Host Process**: Backend extension code runs in a separate Node.js process
2. **WebView Isolation**: Frontend code runs in sandboxed iframes with restricted capabilities
3. **PAPI as Bridge**: All cross-process communication goes through the Platform API

See [Architecture.md](Architecture.md) for more details on process isolation.

---

## Security Best Practices

When developing extensions:

- Use PAPI services instead of direct system access
- Validate all input data, especially from external sources
- Avoid storing sensitive data in plain text
- Use the provided storage APIs for persistence
- Follow the principle of least privilege

---

## Related Documentation

- [Architecture.md](Architecture.md) - Process isolation details
- [Extension-Development-Guide.md](Extension-Development-Guide.md) - Extension development patterns
- [Content Security Policy Design wiki](https://github.com/paranext/paranext/wiki/Content-Security-Policy-Design)
- [Module Import Restrictions wiki](https://github.com/paranext/paranext/wiki/Module-import-restrictions)

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
