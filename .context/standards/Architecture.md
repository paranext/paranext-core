---
title: Platform.Bible Architecture
description: Multi-process architecture, data providers, network objects, WebViews, and security boundaries.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Platform.Bible Architecture

> Verified against paranext-core origin/main `998ca09a087` — 2026-08-03.

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
    ┌────────────┼─────────────┬───────────────────┐
    │            │             │                   │
┌───▼────────┐ ┌─▼──────────┐ ┌▼───────────┐ ┌─────▼───────────┐
│ Renderer   │ │ Renderer   │ │ Extension  │ │ .NET Data       │
│ (window 1) │ │ (window N) │ │ Host       │ │ Provider        │
└────────────┘ └────────────┘ └────────────┘ └─────────────────┘
```

One renderer process per window, not one for the application: a window is a full renderer hosting
its own dock layout and its own window-scoped services, and main is the only process all of them
have in common. Services that must answer for the whole application therefore live in main, which
outlives any individual window.

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

### Service router and service shard

The host/service pair above assumes the implementation lives in exactly ONE process. Several
services are per-window instead: open web views, notification toasts, dialogs, and focus are each
one window's business, and the app can have several windows. Those services use a third shape.

| Term | File suffix | Lives | Role |
| ---- | ----------- | ----- | ---- |
| **Service router** | `*.service-router.ts` | main | Registers the generic global name. Holds no logic; resolves a target window and forwards. Fans out only where the operation is inherently cross-window |
| **Service shard** | `*.service-shard.ts` | each renderer | The real implementation for **one** window. Registered under a window-scoped network object id with an `objectType` of its own |

```
Renderer (window 1)          Main Process                  Renderer (window 2)
┌──────────────────────┐    ┌────────────────────────┐    ┌──────────────────────┐
│ web-view.service-    │    │ web-view.service-      │    │ web-view.service-    │
│ shard.ts             │◄──►│ router.ts              │◄──►│ shard.ts             │
│ id: WebViewService-1 │    │ id: WebViewService     │    │ id: WebViewService-2 │
│ objectType:          │    │ (the generic name      │    │ objectType:          │
│  webViewServiceShard │    │  consumers call)       │    │  webViewServiceShard │
└──────────────────────┘    └────────────────────────┘    └──────────────────────┘
```

Consumers never see any of this: they call the generic name, exactly as they did before there was
more than one window.

**Rules of the pattern:**

- **Platform code in the renderer registers zero globally-unique names, and no request or command
  names at all.** Every global name is registered by main, and a renderer only ever registers
  window-scoped network objects, which makes "a second window cannot start because the name is
  taken" structurally impossible rather than fixed case by case. The window-scoped services got
  there by scoping their network object names; the two app-global services got there by being hosted
  in main — `src/main/services/scroll-group.service-host.ts` (`adr-scroll-group-hosted-in-main`) and
  `src/main/services/theme.service-host.ts` (`adr-theme-hosted-in-main`). Main outlives every window, so a
  globally-unique name it registers is held for the life of the app and no window's close can free
  it.

  Commands and request names went further than scoping: a renderer registers none of them. Every
  command a window used to host — the dialogs, the settings tabs, the Usersnap forms, the
  BookChapterControl, the scripture navigation steps — is registered in main and forwarded to a
  window's shard as a method call (`adr-renderer-registers-no-names`). There is nothing left to keep a per-window name list
  in step with.

  **Two exceptions.** Extension and web-view code calls `papi.commands.registerCommand(...)` exactly
  as it always has — that mechanism is unchanged and deliberately unguarded, and the rule above is
  about platform code in `src/renderer`. And a name derived from a PER-INSTANCE id that only one
  window can hold is not a globally-unique name at all: the web view message channel
  (`webViewMessage:{webViewId}`, registered by `src/renderer/components/web-view.component.tsx`) is
  the one such name platform code still registers, and a web view lives in exactly one window, so
  two windows cannot collide on it.
- **A shard declares what it is, and which window it is for.** It registers with a distinct
  `objectType` per service (`'webViewServiceShard'`, `'notificationServiceShard'`, …) and a
  `windowId` attribute — see `src/shared/models/service-shard.model.ts`. The window-scoped id stays
  (`object:{id}.{method}` derives from it), but nothing DISCOVERS a shard by rebuilding that id.
- **A router keeps an index, not a scan.** `createServiceShardIndex`
  (`src/main/services/service-shard-index.ts`) subscribes once to the network object create/dispose
  announcements, filters on the object type, and maintains a `windowId → shard` map. Lookups are
  O(1), and a window closing removes its shard for free.
- **A router that publishes a network object is a plain object declared as the service it answers
  for.** `const router: WebViewServiceType = { ... }` plus `networkObjectService.set`, so a member
  added to the service interface fails to compile until the router publishes it. The one piece that
  is shared is `createTargetShardResolver` (`src/main/services/target-shard-resolver.util.ts`),
  which resolves the shard of whichever window a call should currently run in. There is no router
  factory: with one genuinely plain forward across the routers that have one, generating them costs
  more than it saves and gives up the free coverage the type annotation provides.
- **A router may claim command or request names instead of a network object** — the dialog, Usersnap
  and BookChapterControl routers do, as does the scripture navigation command module. There is no
  service interface to declare such a router as, so nothing type-checks the set of names it claims:
  each one pins that set with an exact-set test in `src/main/services/__tests__/`, and each states
  how it routes every command it claims so `assertCommandRoutingMatchesDocs`
  (`src/main/services/owner-routed-command.util.ts`) can report a command whose OpenRPC parameters
  say otherwise.
- **The pattern does not depend on the transport.** Most routers and shards are plain network
  objects; the window service's are data providers, because it has subscription semantics.
  `registerEngine` passes `dataProviderType` / `dataProviderAttributes` straight through to
  `networkObjectService.set`, so a data provider shard is discovered exactly like any other.

"Router", not "aggregator": a router selects ONE shard by policy and forwards; the check aggregator
(`extensions/src/platform-scripture/src/checks/check-aggregator.service.ts`) is a different shape —
N sources holding different data, combined into one view.

`theme.service-host.ts` and `scroll-group.service-host.ts` are NOT shards. They are app-global (one
current theme, one scroll group 0), they keep the service-host name, and both now live in
`src/main/services/`.

An app-global host in main pairs with a `*.service.ts` that is more than a proxy: where the UI needs
a synchronous read, the service keeps a cache of the host's state, and where it needs a synchronous
write it predicts the host's answer and reconciles afterwards. The cache is seeded synchronously at
module load from the state main puts on the window's URL, so the first render is already right, and
again from the host once the network is up — the scroll group from a snapshot call, the theme from
its subscription's immediate delivery — and kept current by the host's events after that. In the
renderer `papi.scrollGroups` and `papi.themes` resolve to those same caches, so everything in one
window agrees. `src/renderer/services/scroll-group.service.ts` (predicting) and
`src/renderer/services/theme.service.ts` (read-only) are the worked examples; the Do/Don't list is in
[Paranext-Core-Patterns.md](Paranext-Core-Patterns.md#app-global-services-service-host-in-main--predicting-cache).

### Main Process Services (`src/main/services/`)

| Service | Purpose |
|---------|---------|
| `extension-host.service.ts` | Spawns and manages Extension Host process |
| `dotnet-data-provider.service.ts` | Spawns and manages .NET process |
| `app.service-host.ts` | App metadata and lifecycle |
| `data-protection.service-host.ts` | Encryption/decryption |
| `scroll-group.service-host.ts` | App-global scroll group references and reference history |
| `theme.service-host.ts` | App-global current theme, system-theme matching, and user themes |
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
  papi.webViewProviders.registerWebViewProvider('myExt.view', webViewProvider); // `register` is deprecated (renamed 2024-11)
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
| Service Router/Shard | One shard per window in the renderer, one router in main that selects a shard by policy and forwards | Web view, window, notification, dialog, renderer-hosted commands |
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
