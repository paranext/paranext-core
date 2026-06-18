---
title: Platform.Bible Architecture
description: Multi-process architecture, data providers, network objects, WebViews, and security boundaries.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Platform.Bible Architecture

This document provides detailed architectural information for Platform.Bible (paranext-core).

---

## 1. Process Communication

### Overview

Platform.Bible uses **JSON-RPC 2.0 over WebSocket** for inter-process communication. All processes connect to the Main process which acts as the message broker.

```
┌─────────────────────────────────────────────────────────┐
│                    Main Process (Electron)               │
│  • WebSocket server on port 8876                         │
│  • Routes messages between processes                     │
└────────────────┬────────────────────────────────────────┘
                 │ JSON-RPC over WebSocket (port 8876)
    ┌────────────┼────────────┬───────────────────┐
    │            │            │                   │
┌───▼────────┐ ┌─▼──────────┐ ┌▼────────────────┐
│ Renderer   │ │ Extension  │ │ .NET Data       │
│ (React UI) │ │ Host       │ │ Provider        │
└────────────┘ └────────────┘ └─────────────────┘
```

### Communication Patterns

| Pattern | Use Case | Example |
|---------|----------|---------|
| Request/Response | Single operation with result | `papi.commands.sendCommand()` |
| Events | Broadcast notifications | Data provider updates |
| Subscriptions | Continuous data streaming | `useData()` hook subscriptions |

### Key Files

- `src/shared/services/network.service.ts` - Core network communication
- `src/main/services/rpc-server.ts` - WebSocket server
- `src/main/services/rpc-websocket-listener.ts` - Connection handling

---

## 2. Service Layer Patterns

### Service Host vs Service

Platform.Bible uses a **host/proxy pattern** for cross-process services:

- **Service Host** (`*-host.ts`): Runs on one process, contains actual implementation
- **Service** (`*.service.ts`): Proxy that forwards calls to the host

```
Extension Host Process              Main Process
┌─────────────────────┐            ┌─────────────────────┐
│ settings.service-   │  JSON-RPC  │ settings.service.ts │
│ host.ts             │ ◄────────► │ (proxy)             │
│ (implementation)    │            │                     │
└─────────────────────┘            └─────────────────────┘
```

> For the **authoring shape** of a service — stateless function-exports vs stateful module-state
> with `initialize()`/`shutdown()` vs a process-specific factory — see
> [`shared-patterns.md`](../../.claude/rules/architecture/shared-patterns.md) § "TypeScript Service
> Authoring". This section covers the cross-process host/proxy axis; that one covers how to structure
> the implementation.

### Main Process Services (`src/main/services/`)

| Service | Purpose |
|---------|---------|
| `extension-host.service.ts` | Spawns and manages Extension Host process |
| `dotnet-data-provider.service.ts` | Spawns and manages .NET process |
| `app.service-host.ts` | App metadata and lifecycle |
| `data-protection.service-host.ts` | Encryption/decryption |
| `rpc-server.ts` | WebSocket JSON-RPC server |

### Shared Services (`src/shared/services/`)

| Service | Purpose |
|---------|---------|
| `network.service.ts` | JSON-RPC communication layer |
| `network-object.service.ts` | Cross-process object exposure |
| `command.service.ts` | Command registration and dispatch |
| `data-provider.service.ts` | Data provider registration |
| `settings.service.ts` | Persistent configuration |
| `localization.service.ts` | i18n support |

### Extension Host Services (`src/extension-host/services/`)

| Service | Purpose |
|---------|---------|
| `extension.service.ts` | Extension loading and lifecycle |
| `papi-backend.service.ts` | PAPI backend implementation |
| `settings.service-host.ts` | Settings storage implementation |
| `menu-data.service-host.ts` | Menu contribution management |
| `theme-data.service-host.ts` | Theme management |

---

## 3. Data Provider Pattern

Data providers are the primary abstraction for exposing data across processes with subscription-based updates.

### Lifecycle

1. **Registration**: Extension registers a data provider engine
2. **Exposure**: Engine is wrapped and exposed as a network object
3. **Subscription**: Consumers subscribe to data types
4. **Updates**: Changes trigger `onDidUpdate` events to subscribers

### Structure

```typescript
// Data Provider Engine (implementation)
class MyDataProviderEngine implements IDataProviderEngine<MyDataTypes> {
  async getBook(selector: string): Promise<BookData> { /* ... */ }
  async setBook(selector: string, data: BookData): Promise<DataProviderUpdateInstructions<MyDataTypes>> { /* ... */ }
}

// Registration
const myDataProvider = await papi.dataProviders.registerEngine(
  'myExtension.myDataProvider',
  myDataProviderEngine
);
```

### Subscription Pattern

```typescript
// In a React component
const [data, setData, isLoading] = useData('myExtension.myDataProvider').Book('GEN');

// Manual subscription
const unsubscribe = await papi.dataProviders.get('myExtension.myDataProvider')
  .subscribeBook('GEN', (bookData) => { /* handle update */ });
```

### Key Files

- `src/shared/services/data-provider.service.ts` - Registration and routing
- `src/shared/models/data-provider.model.ts` - Type definitions
- `src/shared/models/data-provider-engine.model.ts` - Engine interface

---

## 4. Network Objects

Network objects allow any object to be exposed across process boundaries via JSON-RPC.

### How It Works

1. **Set**: Object is registered with a unique ID
2. **Proxy**: Remote processes get a proxy that forwards method calls
3. **Serialization**: Arguments and return values are JSON-serialized

```typescript
// Expose an object
const disposable = await networkObjectService.set('myObject', {
  async doSomething(arg: string): Promise<string> {
    return `Processed: ${arg}`;
  }
});

// Get from another process
const myObject = await networkObjectService.get<MyObjectType>('myObject');
const result = await myObject.doSomething('test'); // JSON-RPC call
```

### Limitations

- **No `instanceof`**: Objects are proxies, not real instances
- **Serializable only**: Arguments/returns must be JSON-serializable
- **No class instances**: Don't pass class instances over the network
- **Async only**: All method calls become async

### Key Files

- `src/shared/services/network-object.service.ts` - Registration and proxy creation
- `src/shared/models/network-object.model.ts` - Type definitions

---

## 5. Extension/WebView Isolation

### Extension Execution

Extensions run in the Extension Host process, isolated from the main Electron process:

```
Extension Host Process
┌─────────────────────────────────────────────────────┐
│  Extension A     Extension B     Extension C        │
│  ┌───────────┐   ┌───────────┐   ┌───────────┐     │
│  │ main.ts   │   │ main.ts   │   │ main.ts   │     │
│  │           │   │           │   │           │     │
│  │ Has `papi`│   │ Has `papi`│   │ Has `papi`│     │
│  └───────────┘   └───────────┘   └───────────┘     │
└─────────────────────────────────────────────────────┘
```

### WebView Isolation

WebViews run in isolated renderer contexts within iframes:

```
Renderer Process
┌─────────────────────────────────────────────────────┐
│  Platform Shell (React)                             │
│  ┌───────────────────────────────────────────────┐  │
│  │ Docking Framework                             │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │ WebView  │  │ WebView  │  │ WebView  │    │  │
│  │  │ (iframe) │  │ (iframe) │  │ (iframe) │    │  │
│  │  │          │  │          │  │          │    │  │
│  │  │ Has papi │  │ Has papi │  │ Has papi │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘    │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Why `instanceof` Doesn't Work

Objects crossing process boundaries are serialized and deserialized:

```typescript
// In Extension Host
class MyClass { value = 42; }
const obj = new MyClass();
await networkObjectService.set('myObj', obj);

// In Renderer - THIS FAILS
const proxy = await networkObjectService.get('myObj');
proxy instanceof MyClass; // false! It's a proxy, not the original
```

### PAPI as the Bridge

Extensions and WebViews interact with the platform through the PAPI (Platform API):

```typescript
// Extension main.ts
export async function activate(context: ExecutionActivationContext) {
  const { papi } = context;

  // Register commands
  papi.commands.registerCommand('myExt.doThing', handler);

  // Register data providers
  papi.dataProviders.registerEngine('myExt.data', engine);

  // Register web views
  papi.webViewProviders.register('myExt.view', webViewProvider);
}
```

---

## 6. Process Boundaries

### Import Restrictions

Webpack enforces strict boundaries between processes:

| Process | Can Import | Cannot Import |
|---------|------------|---------------|
| Main | `@main/*`, `@shared/*`, `@node/*` | `@renderer/*`, `@extension-host/*` |
| Renderer | `@renderer/*`, `@shared/*` | `@main/*`, `@extension-host/*`, `@node/*` |
| Extension Host | `@extension-host/*`, `@shared/*`, `@node/*` | `@main/*`, `@renderer/*` |

### Shared Code Rules

Code in `src/shared/` must:
- Be process-agnostic (no Node.js or browser-specific APIs)
- Not import from process-specific directories
- Use platform abstractions for environment differences

### Path Aliases

Defined in `tsconfig.json`:

```json
{
  "paths": {
    "@main/*": ["src/main/*"],
    "@renderer/*": ["src/renderer/*"],
    "@extension-host/*": ["src/extension-host/*"],
    "@shared/*": ["src/shared/*"],
    "@node/*": ["src/node/*"]
  }
}
```

### Violation Detection

Webpack will fail the build if:
- Renderer imports from `@main/*` or `@extension-host/*`
- Main imports from `@renderer/*`
- Any process imports from another process's directory

---

## 7. Security Model

Platform.Bible implements a Content Security Policy (CSP) framework to protect against malicious code execution.

### Security Goals

1. **Extension-Defined Code Protection**: Extension code runs in the same origin but is restricted by CSP and iframe sandbox
2. **Third-Party Code Isolation**: Non-extension code runs in a different origin with limited communication channels
3. **Balanced Security**: Reasonable defaults with granular configuration for advanced needs

### Extension Module Restrictions

Extensions run in a partially sandboxed environment with restricted module imports:

| Allowed | Blocked | Alternative |
|---------|---------|-------------|
| `@papi/core`, `@papi/backend`, `@papi/frontend` | `fs` | `papi.storage` |
| `@sillsdev/scripture` | `http`, `https` | `fetch` |
| `platform-bible-utils`, `platform-bible-react` | `child_process` | `elevatedPrivileges.createProcess` |
| `react`, `react-dom` | `util` | N/A |
| `crypto` (backend only) | | |

For complete security documentation, see [Security-Guide.md](Security-Guide.md).

---

## 8. Key Patterns Summary

| Pattern | Description | Used For |
|---------|-------------|----------|
| Service Host/Proxy | Implementation in one process, proxy in others | Settings, menu data, themes |
| Data Provider | Subscription-based data access | Project data, resources |
| Network Object | Cross-process object exposure | Commands, services |
| Event Emitter | Pub/sub pattern for notifications | Data updates, lifecycle events |
| Factory | Create instances on demand | Project data provider factory |

---

## Related Documentation

- [Security-Guide.md](Security-Guide.md) - Full security policies and module restrictions
- [Extension-Development-Guide.md](Extension-Development-Guide.md) - Extension development patterns
- [Paranext-Core-Patterns.md](Paranext-Core-Patterns.md) - Implementation patterns

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
