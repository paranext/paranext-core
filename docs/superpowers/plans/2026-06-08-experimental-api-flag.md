# Experimental API Flag Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce a uniform `experimental` marker across PAPI surfaces (TypeScript types + live OpenRPC document), and as a side-benefit add central registration for network events with shared/exclusive semantics.

**Architecture:** Additive, non-breaking. The TSDoc `@experimental` tag flows through `papi.d.ts` via existing JSDOC SOURCE/DESTINATION machinery. The wire-level `x-experimental` field rides as a vendor extension on OpenRPC `Method`/`Notification`/`NetworkObjectDocumentation` types. Events become first-class in OpenRPC through a new `createNetworkEventEmitterAsync` that centrally registers with `RpcWebsocketListener`; the deprecated sync `createNetworkEventEmitter` continues working unchanged.

**Tech Stack:** TypeScript, Electron, WebSocket JSON-RPC, Vitest, TypeDoc 0.28.3.

**Spec:** [`../specs/2026-06-08-experimental-api-flag-design.md`](../specs/2026-06-08-experimental-api-flag-design.md)
**Companion wiki page (must be kept in sync):** [`../specs/2026-06-08-experimental-apis-wiki-page.md`](../specs/2026-06-08-experimental-apis-wiki-page.md)

---

## File Structure

### Created files

- `src/shared/services/__tests__/network.service.shared-events.test.ts` — new Vitest file for the `SHARED_EVENT_NAMES` ↔ `SharedNetworkEventTypes` sync assertion and central-registration behavior tests.
- `src/shared/models/__tests__/openrpc.model.test.ts` — type-shape tests (if not already covered) for the new `Notification` shape and `x-experimental` field.

### Modified files (by phase)

**Phase 1 — Foundational types**

- `src/shared/models/openrpc.model.ts` — Method+x-experimental, new Notification type, NetworkObjectDocumentation top-level x-experimental, root `methods` accepts `Method | Notification`.
- `src/declarations/papi-shared-types.ts` — closed `SharedNetworkEventTypes` alias + augmentable `NetworkEventTypes` interface that extends it.
- `lib/platform-bible-utils/src/extension-contributions/menus.model.ts` — `isExperimental?: boolean` on `OrderedExtensibleContainer`, `ColumnsWithHeaders`, `WebViewMenu`, plus JSON Schema entries.

**Phase 2 — Foundational runtime**

- `src/shared/services/network.service.ts` — `SHARED_EVENT_NAMES` constant, `createNetworkEventEmitterAsync`, `@deprecated` on sync `createNetworkEventEmitter`, `getNetworkEvent` typed + deprecated overloads, `PapiNetworkService` interface additions.
- `src/shared/models/rpc.interface.ts` — `registerEvent` method (parallel to `registerMethod`).
- `src/main/services/rpc-server.ts` — `registerRemoteEvent` (parallel to `registerRemoteMethod`), `rpcEventDetailsByEventName` reference.
- `src/main/services/rpc-websocket-listener.ts` — `rpcEventDetailsByEventName: Map<>` field, REGISTER_EVENT special-method dispatch, `generateOpenRpcSchema()` emits notifications.
- `src/shared/data/rpc.model.ts` (or wherever `REGISTER_METHOD` is defined as a constant) — add `REGISTER_EVENT` constant.

**Phase 3 — Registration surfaces**

- `src/shared/services/network-object.service.ts` — fanout `documentation['x-experimental']` onto every method's docs inside `set`.
- `src/shared/services/data-provider.service.ts` — new `NetworkObjectDocumentation` parameter on `registerEngine` and `registerEngineByType`; thread to `networkObjectService.set`.
- `src/shared/services/web-view-provider.service.ts` — new `attributes` parameter then new `NetworkObjectDocumentation` parameter on `registerWebViewProvider`.
- `src/shared/services/project-data-provider.service.ts` — new `attributes` + `documentation` params on `registerProjectDataProviderEngineFactory`; consume `{ projectDataProviderEngine, attributes?, documentation? }` from the factory.
- `src/shared/models/project-data-provider-engine-factory.model.ts` — augment factory return type union.

**Phase 4 — Event migration (25 sites)**

- `src/shared/services/network-object.service.ts:124-144` — 2 emitters
- `src/shared/services/shared-store.service.ts:84` — 1 emitter
- `src/shared/services/data-provider.service.ts:817` — 1 emitter (type-assertion pattern)
- `src/extension-host/services/extension.service.ts` — 2 emitters
- `src/renderer/services/scroll-group.service-host.ts` — 1 emitter
- `src/renderer/services/web-view.service-host.ts:96,101,120,128` — 4 emitters (init refactor)
- `extensions/src/platform-scripture/src/checks/check-aggregator.service.ts:410` — 1 emitter (init refactor)
- `extensions/src/hello-rock3/src/main.ts:462` — 1 emitter
- `extensions/src/platform-scripture-editor/src/main.ts:286,290,1234` — 3 emitters
- 4 test files: `src/shared/services/shared-store.service.test.ts`, `src/renderer/app.component.test.tsx`, `src/renderer/hooks/use-project-picker-data.hook.test.ts`

**Phase 5 — Docs**

- TSDoc additions on `Method`, `Notification`, `NetworkObjectDocumentation`, `SingleMethodDocumentation`, `SingleNotificationDocumentation` in `openrpc.model.ts`.
- TSDoc additions on `OrderedExtensibleContainer`, `ColumnsWithHeaders`, `WebViewMenu` in `menus.model.ts`.
- `.context/standards/Extension-Development-Guide.md` (or `Paranext-Core-Patterns.md` — pick whichever has more API-author guidance today).
- Wiki page at `docs/superpowers/specs/2026-06-08-experimental-apis-wiki-page.md` updated as each implementation task lands.

---

## Conventions for this plan

- **TDD:** Tests come first wherever the behavior is testable. For pure type-only changes, use a small "compile-time" assertion test that asserts the shape.
- **Commits:** Commit at the end of every task. Commit messages start with `feat(experimental):`, `refactor(experimental):`, or `docs(experimental):` and are short and specific.
- **Test command:** `npm test -- <path> --run` (Vitest, single-run). Use `--watch` only for local iteration.
- **Type-check command:** `npm run typecheck`
- **Lint command:** `npm run lint` (do not auto-fix; review output)
- **No `unknown as` chains** unless explicitly noted. The data-provider migration is the only sanctioned double-assertion site.
- **Wiki page maintenance:** Each task that changes a behavior the wiki page documents updates the wiki page in the same commit.

---

## Phase 1 — Foundational types

### Task 1: Extend `openrpc.model.ts` with `Notification` and `x-experimental`

**Files:**

- Modify: `src/shared/models/openrpc.model.ts`
- Create: `src/shared/models/__tests__/openrpc.model.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/shared/models/__tests__/openrpc.model.test.ts`:

```typescript
import { describe, it, expectTypeOf } from 'vitest';
import type {
  Method,
  Notification,
  NetworkObjectDocumentation,
  OpenRpc,
  SingleNotificationDocumentation,
} from '@shared/models/openrpc.model';

describe('openrpc.model — experimental marker types', () => {
  it('Method accepts an optional x-experimental boolean', () => {
    const m: Method = {
      name: 'x',
      params: [],
      result: { name: 'r', schema: {} },
      'x-experimental': true,
    };
    expectTypeOf(m['x-experimental']).toEqualTypeOf<boolean | undefined>();
  });

  it('Notification has no result field', () => {
    const n: Notification = {
      name: 'x',
      params: [],
      'x-experimental': true,
    };
    // @ts-expect-error — Notification cannot have a result
    const bad: Notification = { name: 'x', params: [], result: { name: 'r', schema: {} } };
    void bad;
    expectTypeOf(n.name).toEqualTypeOf<string>();
  });

  it('NetworkObjectDocumentation accepts x-experimental at top level and methods are Method[] only', () => {
    const d: NetworkObjectDocumentation = { 'x-experimental': true, methods: [] };
    expectTypeOf(d['x-experimental']).toEqualTypeOf<boolean | undefined>();
  });

  it('OpenRpc.methods accepts both Method and Notification', () => {
    const doc: OpenRpc = {
      openrpc: '1.2.6',
      info: { title: 't', version: 'v' },
      methods: [
        { name: 'a', params: [], result: { name: 'r', schema: {} } },
        { name: 'b', params: [] }, // notification
      ],
    };
    expectTypeOf(doc.methods).toEqualTypeOf<(Method | Notification)[]>();
  });

  it('SingleNotificationDocumentation has notification omitting name and result', () => {
    const d: SingleNotificationDocumentation = {
      notification: { params: [], 'x-experimental': true },
    };
    expectTypeOf(d.notification).toEqualTypeOf<Omit<Omit<Method, 'result'>, 'name'>>();
  });
});
```

- [ ] **Step 2: Run the test — expect type-shape failures**

Run: `npm test -- src/shared/models/__tests__/openrpc.model.test.ts --run`
Expected: FAIL — `Notification`, `SingleNotificationDocumentation`, `'x-experimental'` not exported.

- [ ] **Step 3: Implement the type changes in `openrpc.model.ts`**

In `src/shared/models/openrpc.model.ts`, modify the `Method` type to add `'x-experimental'?: boolean;` after `result`. Add new types directly after the existing `MethodDocumentationWithoutName`:

```typescript
export type Method = {
  /** The canonical name for the method. The name MUST be unique within the methods array. */
  name: string;
  params: (ContentDescriptor | Reference)[];
  result: ContentDescriptor | Reference;
  /**
   * Set to `true` to mark this method as experimental — its shape may change without notice.
   * Informational only; does not affect runtime behavior. See the experimental APIs wiki page.
   */
  'x-experimental'?: boolean;
  /** A short summary of what the method does. */
  summary?: string;
  /** ... existing fields unchanged ... */
  description?: string;
  deprecated?: boolean;
  servers?: Server[];
  tags?: (Tag | Reference)[];
  paramStructure?: 'by-name' | 'by-position' | 'either';
  errors?: (Error | Reference)[];
  links?: (Link | Reference)[];
  examples?: (ExamplePairingObject | Reference)[];
  externalDocs?: ExternalDocumentation;
};

/**
 * An OpenRPC notification — same shape as a Method, but without `result`. Used for events / one-way
 * messages from server to client. Per the OpenRPC convention (no `result` ⇒ notification), these
 * are serialized into the same root `methods` array as Methods on the wire.
 */
export type Notification = Omit<Method, 'result'>;

/** Documentation about a single notification */
export type SingleNotificationDocumentation = {
  notification: Omit<Notification, 'name'>;
  components?: Components;
};
```

Then update `NetworkObjectDocumentation` to add the top-level `'x-experimental'` field:

```typescript
export type NetworkObjectDocumentation = {
  summary?: string;
  description?: string;
  methods?: Method[];
  components?: Components;
  /**
   * Set to `true` to mark every method registered for this network object as experimental. The
   * marker is fanned out onto each method's `'x-experimental'` field inside
   * `networkObjectService.set`.
   */
  'x-experimental'?: boolean;
};
```

And update `OpenRpc` to accept `Method | Notification` at the root:

```typescript
export type OpenRpc = {
  openrpc: string;
  info: Info;
  servers?: Server[];
  methods: (Method | Notification)[];
  components?: Components;
  externalDocs?: ExternalDocumentation;
};
```

- [ ] **Step 4: Run the test — expect pass**

Run: `npm test -- src/shared/models/__tests__/openrpc.model.test.ts --run`
Expected: PASS.

- [ ] **Step 5: Run typecheck — verify no downstream breakage**

Run: `npm run typecheck`
Expected: PASS. If a downstream file passed a `Method[]` where `(Method | Notification)[]` is now expected, fix the producer's typing (e.g., explicit `Method[]` cast on `NetworkObjectDocumentation.methods` consumers).

- [ ] **Step 6: Commit**

```bash
git add src/shared/models/openrpc.model.ts src/shared/models/__tests__/openrpc.model.test.ts
git commit -m "feat(experimental): add Notification type and x-experimental field to openrpc.model"
```

---

### Task 2: Add `SharedNetworkEventTypes` and `NetworkEventTypes` to `papi-shared-types.ts`

**Files:**

- Modify: `src/declarations/papi-shared-types.ts`

The platform-shared event payload types referenced (`NetworkObjectDetails`, `StoreChangeEvent`) already exist in the codebase. Grep for them to confirm import paths:

- `NetworkObjectDetails` — in `src/shared/models/network-object-info.model.ts` (or similar; confirm)
- `StoreChangeEvent` — in `src/shared/services/shared-store.service.ts`

- [ ] **Step 1: Add the type declarations**

Insert near the other module-augmentation interfaces (e.g., after `CommandHandlers`):

````typescript
declare module 'papi-shared-types' {
  /**
   * Network events emitted from multiple processes (each process emits its own local event under
   * the same name). Declared by the platform; not extensible by extensions.
   *
   * The names listed here are the source of truth for which event names use shared semantics at the
   * central registry. An event name in this type allows registration from multiple processes (each
   * process registers once, all emitters are valid sources). Any other event name uses exclusive
   * semantics (one registrant ever).
   *
   * Subscribers do not need to know which events are shared — `getNetworkEvent` handles both kinds
   * identically.
   */
  export type SharedNetworkEventTypes = {
    'network-object.onDidCreateNetworkObject': NetworkObjectDetails;
    'network-object.onDidDisposeNetworkObject': string;
    'shared-store.onDidChange': StoreChangeEvent;
  };

  /**
   * All known network events. Extensions augment this to declare their own events. Inherits the
   * platform's shared events automatically.
   *
   * To declare a new event for use with `createNetworkEventEmitterAsync`:
   *
   * ```ts
   * declare module 'papi-shared-types' {
   *   export interface NetworkEventTypes {
   *     'myExt.somethingHappened': { foo: string };
   *   }
   * }
   * ```
   *
   * Mark a single event as experimental by adding `/** @experimental *\/` directly above its entry.
   */
  export interface NetworkEventTypes extends SharedNetworkEventTypes {}
}
````

If `NetworkObjectDetails` or `StoreChangeEvent` aren't imported in this file, add the imports near the top.

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS. Confirm the new types are exported and resolvable.

- [ ] **Step 3: Commit**

```bash
git add src/declarations/papi-shared-types.ts
git commit -m "feat(experimental): add NetworkEventTypes and SharedNetworkEventTypes registries"
```

---

### Task 3: Add `isExperimental` to menus model + JSON Schema

**Files:**

- Modify: `lib/platform-bible-utils/src/extension-contributions/menus.model.ts`

- [ ] **Step 1: Write the failing test**

Append to (or create) `lib/platform-bible-utils/src/extension-contributions/__tests__/menus.model.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import Ajv from 'ajv';
import {
  menuDocumentSchema,
  type ColumnsWithHeaders,
  type WebViewMenu,
  type OrderedExtensibleContainer,
} from '../menus.model';

describe('menus.model — isExperimental field', () => {
  it('OrderedExtensibleContainer permits isExperimental', () => {
    const c: OrderedExtensibleContainer = { order: 1, isExtensible: true, isExperimental: true };
    expect(c.isExperimental).toBe(true);
  });

  it('ColumnsWithHeaders permits isExperimental at the columns-collection level', () => {
    const c: ColumnsWithHeaders = { isExtensible: true, isExperimental: true };
    expect(c.isExperimental).toBe(true);
  });

  it('WebViewMenu permits isExperimental', () => {
    const m: WebViewMenu = {
      includeDefaults: undefined,
      topMenu: undefined,
      contextMenu: undefined,
      isExperimental: true,
    };
    expect(m.isExperimental).toBe(true);
  });

  it('JSON schema accepts isExperimental on column entries', () => {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(menuDocumentSchema);
    const doc = {
      mainMenu: {
        columns: { 'a.b': { label: '%x%', order: 1, isExtensible: true, isExperimental: true } },
        groups: {},
        items: [],
      },
      defaultWebViewTopMenu: { columns: {}, groups: {}, items: [] },
      defaultWebViewContextMenu: { groups: {}, items: [] },
      webViewMenus: {},
    };
    expect(validate(doc)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test — expect failure**

Run: `npm test -- lib/platform-bible-utils/src/extension-contributions/__tests__/menus.model.test.ts --run`
Expected: FAIL — `isExperimental` not on the types or in the schema.

- [ ] **Step 3: Update the types**

In `lib/platform-bible-utils/src/extension-contributions/menus.model.ts`, modify `OrderedExtensibleContainer`, add `isExperimental` to `ColumnsWithHeaders`, and add `isExperimental` to `WebViewMenu`:

```typescript
export type OrderedExtensibleContainer = OrderedItem & {
  /** Determines whether other items can be added to this after it has been defined */
  isExtensible?: boolean;
  /**
   * Set to `true` to mark this extension point as experimental. Extensions reading menu data should
   * check this before contributing to the point. Informational only.
   */
  isExperimental?: boolean;
};

export type ColumnsWithHeaders = {
  [property: ReferencedItem]: MenuColumnWithHeader;
  /** Defines whether columns can be added to this multi-column menu */
  isExtensible?: boolean;
  /**
   * Set to `true` to mark the entire columns-collection as an experimental extension point.
   * Informational only.
   */
  isExperimental?: boolean;
};

export type WebViewMenu = {
  /** Indicates whether the platform default menus should be included for this webview */
  includeDefaults: boolean | undefined;
  topMenu: MultiColumnMenu | undefined;
  contextMenu: SingleColumnMenu | undefined;
  /** Set to `true` to mark this entire WebView menu shape as experimental. Informational only. */
  isExperimental?: boolean;
};
```

- [ ] **Step 4: Update the JSON schema**

Edit the `menuDocumentSchema` `$defs` section. Inside `columnsWithHeaders.patternProperties.<column>.properties`, add `isExperimental` next to `isExtensible`:

```javascript
isExperimental: {
  description: 'Marks this extension point as experimental. Informational only.',
  type: 'boolean',
},
```

And add the same property at the `columnsWithHeaders.properties` level (the columns-collection level), in `menuGroups.patternProperties.<group>.oneOf[*].properties` (both alternatives), and in `menusForOneWebView.properties` (for `WebViewMenu`'s schema).

- [ ] **Step 5: Run the test — expect pass**

Run: `npm test -- lib/platform-bible-utils/src/extension-contributions/__tests__/menus.model.test.ts --run`
Expected: PASS.

- [ ] **Step 6: Update the wiki page**

The wiki page already includes the menus example with `isExperimental` — no change needed for this task. Verify by skimming `docs/superpowers/specs/2026-06-08-experimental-apis-wiki-page.md` § Menu extensibility.

- [ ] **Step 7: Commit**

```bash
git add lib/platform-bible-utils/src/extension-contributions/menus.model.ts lib/platform-bible-utils/src/extension-contributions/__tests__/menus.model.test.ts
git commit -m "feat(experimental): add isExperimental to menus model + JSON schema"
```

---

## Phase 2 — Foundational runtime

### Task 4: Add `SHARED_EVENT_NAMES` constant and sync-check test

**Files:**

- Modify: `src/shared/services/network.service.ts`
- Create: `src/shared/services/__tests__/network.service.shared-events.test.ts`

- [ ] **Step 1: Write the sync-check failing test**

Create the file:

```typescript
import { describe, it, expect } from 'vitest';
import { SHARED_EVENT_NAMES } from '@shared/services/network.service';
import type { SharedNetworkEventTypes } from 'papi-shared-types';

describe('SHARED_EVENT_NAMES stays in sync with SharedNetworkEventTypes', () => {
  it('contains every key of SharedNetworkEventTypes', () => {
    type RequiredKeys = keyof SharedNetworkEventTypes;
    const required: RequiredKeys[] = [
      'network-object.onDidCreateNetworkObject',
      'network-object.onDidDisposeNetworkObject',
      'shared-store.onDidChange',
    ];
    for (const name of required) expect(SHARED_EVENT_NAMES.has(name)).toBe(true);
  });

  it('contains no names absent from SharedNetworkEventTypes', () => {
    type AllowedKeys = keyof SharedNetworkEventTypes;
    for (const name of SHARED_EVENT_NAMES) {
      // The cast verifies the runtime constant only contains keys SharedNetworkEventTypes declares.
      // If a new entry is added to SHARED_EVENT_NAMES without adding it to SharedNetworkEventTypes,
      // this assignment is a type error and the test fails to compile.
      const typed: AllowedKeys = name;
      expect(typeof typed).toBe('string');
    }
  });
});
```

- [ ] **Step 2: Run test — expect failure**

Run: `npm test -- src/shared/services/__tests__/network.service.shared-events.test.ts --run`
Expected: FAIL — `SHARED_EVENT_NAMES` not exported.

- [ ] **Step 3: Add the constant**

Near the top of `src/shared/services/network.service.ts` (after imports, before the existing emitter logic):

```typescript
import type { SharedNetworkEventTypes } from 'papi-shared-types';

/**
 * Source of truth for which event names use shared semantics at the central registry. Must stay in
 * sync with the `SharedNetworkEventTypes` type alias in `papi-shared-types.ts` — the test
 * `network.service.shared-events.test.ts` enforces the invariant.
 *
 * Add entries here when adding a new shared event to `SharedNetworkEventTypes`.
 */
export const SHARED_EVENT_NAMES = new Set<keyof SharedNetworkEventTypes>([
  'network-object.onDidCreateNetworkObject',
  'network-object.onDidDisposeNetworkObject',
  'shared-store.onDidChange',
]);
```

- [ ] **Step 4: Run test — expect pass**

Run: `npm test -- src/shared/services/__tests__/network.service.shared-events.test.ts --run`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/shared/services/network.service.ts src/shared/services/__tests__/network.service.shared-events.test.ts
git commit -m "feat(experimental): add SHARED_EVENT_NAMES constant mirroring SharedNetworkEventTypes"
```

---

### Task 5: Add `REGISTER_EVENT` plumbing (constant + RPC interface + rpc-server + listener)

**Files:**

- Modify: `src/shared/data/rpc.model.ts` (or wherever `REGISTER_METHOD` is defined — confirm with grep)
- Modify: `src/shared/models/rpc.interface.ts`
- Modify: `src/main/services/rpc-server.ts`
- Modify: `src/main/services/rpc-websocket-listener.ts`

- [ ] **Step 1: Locate `REGISTER_METHOD` to mirror its plumbing**

Run: `grep -rn "REGISTER_METHOD" src/`
Expected output: shows the constant definition (likely in `src/shared/data/rpc.model.ts` or `src/main/services/rpc-server.ts`) plus its uses in the listener and the server. Mirror every appearance with a `REGISTER_EVENT` analog.

- [ ] **Step 2: Add `REGISTER_EVENT` constant alongside `REGISTER_METHOD`**

```typescript
export const REGISTER_EVENT = 'register-event';
```

- [ ] **Step 3: Add `registerEvent` to the RPC interface**

In `src/shared/models/rpc.interface.ts`, after the existing `registerMethod` declaration:

```typescript
/**
 * Register a centrally-tracked network event with the main process. Determines shared vs
 * exclusive semantics by looking up the event name in `SHARED_EVENT_NAMES`.
 *
 * Returns `true` if the registration was accepted, `false` otherwise. Used by
 * `createNetworkEventEmitterAsync`; not for direct caller use.
 */
registerEvent(
  eventName: string,
  documentation?: SingleNotificationDocumentation,
): Promise<boolean>;
```

Add an import for `SingleNotificationDocumentation` from `@shared/models/openrpc.model`.

- [ ] **Step 4: Implement `registerRemoteEvent` on `RpcServer`**

In `src/main/services/rpc-server.ts`, after `registerRemoteMethod`:

```typescript
registerRemoteEvent(
  eventName: string,
  documentation?: SingleNotificationDocumentation,
): boolean {
  return this.rpcEventDetailsByEventName.tryRegister(this, eventName, documentation);
}

unregisterRemoteEvent(eventName: string): boolean {
  return this.rpcEventDetailsByEventName.tryUnregister(this, eventName);
}
```

The `rpcEventDetailsByEventName` field is added in the next step (it's typed as a small helper class to hide the shared/exclusive lookup behind a method).

- [ ] **Step 5: Add `RpcEventRegistry` helper and field on `RpcWebsocketListener`**

In `src/main/services/rpc-websocket-listener.ts`, near the existing `rpcMethodDetailsByMethodName`:

```typescript
import { SHARED_EVENT_NAMES } from '@shared/services/network.service';
import type { SingleNotificationDocumentation } from '@shared/models/openrpc.model';

interface EventRegistrant {
  handler: RpcServer | RpcWebsocketListener;
  documentation?: SingleNotificationDocumentation;
}

class RpcEventRegistry {
  private byName = new Map<string, EventRegistrant[]>();

  tryRegister(
    handler: RpcServer | RpcWebsocketListener,
    eventName: string,
    documentation?: SingleNotificationDocumentation,
  ): boolean {
    const isShared = SHARED_EVENT_NAMES.has(eventName as keyof SharedNetworkEventTypes);
    const existing = this.byName.get(eventName);

    if (!existing) {
      this.byName.set(eventName, [{ handler, documentation }]);
      return true;
    }

    if (isShared) {
      // Reject only if THIS handler already registered (same-process duplicate).
      if (existing.some((r) => r.handler === handler)) return false;
      existing.push({ handler, documentation });
      return true;
    }

    // Exclusive: any subsequent registration is rejected.
    return false;
  }

  tryUnregister(handler: RpcServer | RpcWebsocketListener, eventName: string): boolean {
    const existing = this.byName.get(eventName);
    if (!existing) return false;
    const index = existing.findIndex((r) => r.handler === handler);
    if (index < 0) return false;
    existing.splice(index, 1);
    if (existing.length === 0) this.byName.delete(eventName);
    return true;
  }

  entries(): IterableIterator<[string, EventRegistrant[]]> {
    return this.byName.entries();
  }
}
```

Add `private rpcEventDetailsByEventName = new RpcEventRegistry();` as a field on `RpcWebsocketListener`. Also pass a reference to each `RpcServer` so its `registerRemoteEvent` can call into it (mirror how `rpcMethodDetailsByMethodName` is shared today).

- [ ] **Step 6: Wire `REGISTER_EVENT` into the listener's special-method dispatch**

In the same file, find where `REGISTER_METHOD` is matched and dispatched (parallel of `registerRemoteMethod` call). Add a sibling case:

```typescript
case REGISTER_EVENT:
  return this.rpcEventDetailsByEventName.tryRegister(this, params[0] as string, params[1]);
```

Add an analogous case for `UNREGISTER_EVENT` if `UNREGISTER_METHOD` exists.

- [ ] **Step 7: Run typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 8: Write a behavior test**

Append to `src/shared/services/__tests__/network.service.shared-events.test.ts`:

```typescript
import { RpcWebsocketListener } from '@main/services/rpc-websocket-listener'; // use the actual class path

describe('central event registry — shared vs exclusive policy', () => {
  // These are unit tests against the registry's tryRegister method. Use a minimal fake handler.
  const fakeA = {} as never;
  const fakeB = {} as never;

  it('exclusive: first registrant wins; subsequent registrations from any handler rejected', () => {
    const listener = new RpcWebsocketListener(/* construct as in other tests */);
    const reg = (listener as any).rpcEventDetailsByEventName;
    expect(reg.tryRegister(fakeA, 'myExt.exclusive')).toBe(true);
    expect(reg.tryRegister(fakeA, 'myExt.exclusive')).toBe(false); // same handler
    expect(reg.tryRegister(fakeB, 'myExt.exclusive')).toBe(false); // different handler
  });

  it('shared: multiple handlers may register; same handler twice rejected', () => {
    const listener = new RpcWebsocketListener(/* */);
    const reg = (listener as any).rpcEventDetailsByEventName;
    expect(reg.tryRegister(fakeA, 'network-object.onDidCreateNetworkObject')).toBe(true);
    expect(reg.tryRegister(fakeB, 'network-object.onDidCreateNetworkObject')).toBe(true);
    expect(reg.tryRegister(fakeA, 'network-object.onDidCreateNetworkObject')).toBe(false);
  });
});
```

- [ ] **Step 9: Run test — expect pass**

Run: `npm test -- src/shared/services/__tests__/network.service.shared-events.test.ts --run`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add src/shared/data/rpc.model.ts src/shared/models/rpc.interface.ts src/main/services/rpc-server.ts src/main/services/rpc-websocket-listener.ts src/shared/services/__tests__/network.service.shared-events.test.ts
git commit -m "feat(experimental): add REGISTER_EVENT RPC plumbing with shared/exclusive policy"
```

---

### Task 6: Implement `createNetworkEventEmitterAsync`; deprecate sync

**Files:**

- Modify: `src/shared/services/network.service.ts`

- [ ] **Step 1: Write the behavior test**

Append to `src/shared/services/__tests__/network.service.shared-events.test.ts`:

```typescript
import { createNetworkEventEmitterAsync, getNetworkEvent } from '@shared/services/network.service';

describe('createNetworkEventEmitterAsync', () => {
  it('resolves to a functional emitter for a declared event name', async () => {
    // Assumes test setup provides a working network service.
    const emitter = await createNetworkEventEmitterAsync('myExt.testEvent' as never);
    let received: unknown;
    getNetworkEvent('myExt.testEvent' as never)((event) => {
      received = event;
    });
    emitter.emit({ value: 42 } as never);
    await new Promise((r) => setTimeout(r, 10));
    expect((received as { value: number }).value).toBe(42);
  });

  it('rejects a second registration of the same exclusive event name within one process', async () => {
    await createNetworkEventEmitterAsync('myExt.unique' as never);
    await expect(createNetworkEventEmitterAsync('myExt.unique' as never)).rejects.toThrow();
  });
});
```

- [ ] **Step 2: Run test — expect failure (function not exported)**

- [ ] **Step 3: Implement the function**

In `src/shared/services/network.service.ts`, after the existing `createNetworkEventEmitter`:

```typescript
import type { NetworkEventTypes } from 'papi-shared-types';
import type { SingleNotificationDocumentation } from '@shared/models/openrpc.model';
import { REGISTER_EVENT } from '@shared/data/rpc.model';

/**
 * Create a network event emitter that participates in central registration. The returned emitter
 * appears in the OpenRPC document if `documentation` is provided.
 *
 * If the event name is in `SharedNetworkEventTypes`, the central registry uses shared semantics:
 * multiple processes may register the same name (each process registers once); all corresponding
 * emitters are valid sources.
 *
 * Otherwise the registry uses exclusive semantics: only one process may register a given name;
 * subsequent registrations from any process are rejected.
 *
 * Intra-process duplicate registration is always rejected regardless of the event's domain.
 *
 * @param eventType A key of `NetworkEventTypes` (which inherits `SharedNetworkEventTypes`).
 * @param documentation Optional notification documentation. Carries `'x-experimental': true` to
 *   mark the event as experimental.
 */
export const createNetworkEventEmitterAsync = async <EventType extends keyof NetworkEventTypes>(
  eventType: EventType,
  documentation?: SingleNotificationDocumentation,
): Promise<PlatformEventEmitter<NetworkEventTypes[EventType]>> => {
  await initialize();
  if (!jsonRpc) throw new Error('RPC handler not set');
  const accepted = await jsonRpc.registerEvent(eventType, documentation);
  if (!accepted) {
    throw new Error(
      `Event "${eventType}" was rejected by the central registry (likely already registered from another process).`,
    );
  }
  return createNetworkEventEmitterInternal<NetworkEventTypes[EventType]>(
    eventType,
    true,
  ) as PlatformEventEmitter<NetworkEventTypes[EventType]>;
};
```

- [ ] **Step 4: Add `@deprecated` to the sync variant**

Update the JSDoc on `createNetworkEventEmitter` in the same file:

```typescript
/**
 * Creates an event emitter that works properly over the network.
 *
 * @deprecated 8 June 2026. Use `createNetworkEventEmitterAsync`. Events created via the sync API
 *   are not centrally registered and do not appear in the OpenRPC document. The async version
 *   properly restricts event registration to prevent multiple sources from emitting the same
 *   network event (unless the event is declared in `SharedNetworkEventTypes`, in which case it
 *   accepts multiple registrants by design).
 * @param eventType Unique network event type for coordinating between connections
 * @returns Event emitter whose event works between connections
 */
export const createNetworkEventEmitter = <T>(eventType: string): PlatformEventEmitter<T> =>
  createNetworkEventEmitterInternal(eventType, true);
```

- [ ] **Step 5: Surface `createNetworkEventEmitterAsync` on `PapiNetworkService`**

In the same file, extend the `PapiNetworkService` interface and the exported instance:

```typescript
export interface PapiNetworkService {
  /** @deprecated 8 June 2026. Use createNetworkEventEmitterAsync. */
  createNetworkEventEmitter: typeof createNetworkEventEmitter;
  createNetworkEventEmitterAsync: typeof createNetworkEventEmitterAsync;
  getNetworkEvent: typeof getNetworkEvent;
}

export const papiNetworkService: PapiNetworkService = {
  createNetworkEventEmitter,
  createNetworkEventEmitterAsync,
  getNetworkEvent,
};
```

- [ ] **Step 6: Run tests — expect pass**

Run: `npm test -- src/shared/services/__tests__/network.service.shared-events.test.ts --run`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/shared/services/network.service.ts src/shared/services/__tests__/network.service.shared-events.test.ts
git commit -m "feat(experimental): add createNetworkEventEmitterAsync; deprecate sync variant"
```

---

### Task 7: Add `getNetworkEvent` typed overload + deprecate explicit-`<T>` form

**Files:**

- Modify: `src/shared/services/network.service.ts`

- [ ] **Step 1: Write the test**

Append to `src/shared/services/__tests__/network.service.shared-events.test.ts`:

```typescript
import { getNetworkEvent as gne } from '@shared/services/network.service';

describe('getNetworkEvent overloads', () => {
  it('typed call infers payload from NetworkEventTypes', () => {
    // Compile-time test — if this compiles, the typed overload exists.
    const ev = gne('network-object.onDidCreateNetworkObject');
    // ev is PlatformEvent<NetworkObjectDetails>
    void ev;
  });

  it('explicit <T> call still resolves (deprecated overload)', () => {
    const ev = gne<{ foo: string }>('arbitraryName');
    void ev;
  });
});
```

- [ ] **Step 2: Replace the single `getNetworkEvent` definition with two overloads**

Update `src/shared/services/network.service.ts`:

```typescript
/**
 * Subscribe to a typed network event. Declare the event in `NetworkEventTypes` (or rely on
 * `SharedNetworkEventTypes` inheritance for platform events) and the payload type is inferred.
 */
export function getNetworkEvent<EventType extends keyof NetworkEventTypes>(
  eventType: EventType,
): PlatformEvent<NetworkEventTypes[EventType]>;
/**
 * @deprecated 8 June 2026. Use the typed signature: declare the event in `NetworkEventTypes` and
 *   call `getNetworkEvent('your.event.name')` without an explicit type parameter. If your event
 *   name is dynamic (e.g., per-instance data-provider events), this signature continues to work
 *   functionally; suppress the deprecation warning at the call site with a brief comment.
 */
export function getNetworkEvent<T>(eventType: string): PlatformEvent<T>;
export function getNetworkEvent(eventType: string): PlatformEvent<unknown> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return createNetworkEventEmitterInternal(eventType, false).event as PlatformEvent<unknown>;
}
```

- [ ] **Step 3: Run tests + typecheck — expect pass**

Run: `npm test -- src/shared/services/__tests__/network.service.shared-events.test.ts --run && npm run typecheck`
Expected: PASS. The typecheck may report deprecation warnings on existing call sites that use explicit `<T>` — leave those for the migration phase.

- [ ] **Step 4: Commit**

```bash
git add src/shared/services/network.service.ts src/shared/services/__tests__/network.service.shared-events.test.ts
git commit -m "feat(experimental): add typed getNetworkEvent overload; deprecate explicit-T form"
```

---

### Task 8: Emit notifications in `generateOpenRpcSchema()`

**Files:**

- Modify: `src/main/services/rpc-websocket-listener.ts`

- [ ] **Step 1: Locate `generateOpenRpcSchema()`**

Around `src/main/services/rpc-websocket-listener.ts:157-244`. It iterates `rpcMethodDetailsByMethodName` and emits method entries.

- [ ] **Step 2: Extend iteration to include events**

After the existing methods loop, add:

```typescript
for (const [eventName, registrants] of this.rpcEventDetailsByEventName.entries()) {
  // First registration's documentation wins (matches the conflict policy).
  const docs = registrants.find((r) => r.documentation)?.documentation;
  if (!docs) continue; // events with no documentation are not surfaced in OpenRPC

  const notificationEntry: Notification = {
    name: eventName,
    ...docs.notification,
  };
  result.methods.push(notificationEntry);
  // Merge any components the notification's docs declare
  if (docs.components) mergeComponents(result.components ?? {}, docs.components);
}
```

(Use the file's existing `mergeComponents` helper or pattern. Confirm name by reading the file.)

- [ ] **Step 3: Write a snapshot test**

In `src/main/services/__tests__/rpc-websocket-listener.openrpc.test.ts` (create if missing), add a test that:

1. Constructs a `RpcWebsocketListener` instance with a mock setup.
2. Registers a method (with `'x-experimental': true`).
3. Registers an event (with `'x-experimental': true`).
4. Calls `generateOpenRpcSchema()`.
5. Asserts the output's `methods[]` contains both, with the notification entry lacking `result` and both carrying the `x-experimental` flag.

- [ ] **Step 4: Run test — expect pass**

Run: `npm test -- src/main/services/__tests__/rpc-websocket-listener.openrpc.test.ts --run`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/main/services/rpc-websocket-listener.ts src/main/services/__tests__/rpc-websocket-listener.openrpc.test.ts
git commit -m "feat(experimental): include notifications in generated OpenRPC schema"
```

---

## Phase 3 — Registration surfaces

### Task 9: Fanout `documentation['x-experimental']` inside `networkObjectService.set`

**Files:**

- Modify: `src/shared/services/network-object.service.ts`

- [ ] **Step 1: Write the test**

In `src/shared/services/__tests__/network-object.service.test.ts` (create if missing):

```typescript
import { describe, it, expect } from 'vitest';
import { networkObjectService } from '@shared/services/network-object.service';

describe('networkObjectService.set — x-experimental fanout', () => {
  it('marks every registered method experimental when documentation has top-level x-experimental: true', async () => {
    const impl = { method1: async () => 'a', method2: async () => 'b' };
    // Use test helpers / mocks for the network layer.
    const result = await networkObjectService.set('test-obj', impl, 'object', undefined, {
      'x-experimental': true,
    });
    // Assert the registered method docs include 'x-experimental': true.
    // (Test inspects internal state — pull from rpcMethodDetailsByMethodName or similar.)
    expect(/* docs for object.test-obj.method1 */).toMatchObject({ 'x-experimental': true });
    expect(/* docs for object.test-obj.method2 */).toMatchObject({ 'x-experimental': true });
    await result.dispose();
  });
});
```

- [ ] **Step 2: Run test — expect failure**

- [ ] **Step 3: Implement the fanout**

In `src/shared/services/network-object.service.ts:424-486` (the `set` function and its internal `registerRequestHandler` calls): when `objectDocumentation['x-experimental']` is `true`, ensure each call to `networkService.registerRequestHandler(...)` includes a `methodDocs.method['x-experimental']: true` field — synthesizing minimal docs (`{ method: { 'x-experimental': true, params: [], result: { name: 'r', schema: {} } } }`) if the caller didn't supply per-method docs.

```typescript
const objectIsExperimental = objectDocumentation['x-experimental'] === true;

for (const [functionName, handler] of /* iterate object.functions */) {
  const methodName = serializeRequestType(id, functionName);
  const perMethodDocs = objectDocumentation.methods?.find((m) => m.name === functionName);
  const methodDocs: SingleMethodDocumentation | undefined =
    perMethodDocs
      ? {
          method: { ...perMethodDocs, 'x-experimental': perMethodDocs['x-experimental'] ?? objectIsExperimental },
          components: objectDocumentation.components,
        }
      : objectIsExperimental
        ? { method: { 'x-experimental': true, params: [], result: { name: 'return', schema: {} } } }
        : undefined;
  await networkService.registerRequestHandler(methodName, handler, methodDocs);
}
```

(Adjust to match the actual structure of the existing loop.)

- [ ] **Step 4: Run test — expect pass**

- [ ] **Step 5: Update the wiki page**

The wiki page already shows the fanout example. Verify wording still matches.

- [ ] **Step 6: Commit**

```bash
git add src/shared/services/network-object.service.ts src/shared/services/__tests__/network-object.service.test.ts
git commit -m "feat(experimental): fanout x-experimental from network object onto its method docs"
```

---

### Task 10: Add `documentation` parameter to `dataProviderService.registerEngine` + `registerEngineByType`

**Files:**

- Modify: `src/shared/services/data-provider.service.ts`

- [ ] **Step 1: Write the test**

In `src/shared/services/__tests__/data-provider.service.test.ts` (extend if exists), assert that registering with `{ 'x-experimental': true }` propagates through to `networkObjectService.set`.

- [ ] **Step 2: Run test — expect failure**

- [ ] **Step 3: Add the parameter**

Locate `registerEngine` and `registerEngineByType` exports. Add a trailing parameter:

```typescript
export const registerEngine = async <DataProviderName extends DataProviderNames>(
  providerName: DataProviderName,
  engine: IDataProviderEngine<DataProviderTypes[DataProviderName]>,
  // ... existing parameters ...
  attributes?: DataProviderAttributes,
  documentation?: NetworkObjectDocumentation,
): Promise<DisposableDataProvider<DataProviderTypes[DataProviderName]>> => {
  // ... existing logic ...
  return networkObjectService.set(
    serializeRequestType(CATEGORY_DATA_PROVIDER, providerName),
    dataProvider,
    'data-provider',
    attributes,
    documentation,
  );
};
```

Mirror for `registerEngineByType`.

- [ ] **Step 4: Run tests + typecheck — expect pass**

- [ ] **Step 5: Commit**

```bash
git add src/shared/services/data-provider.service.ts src/shared/services/__tests__/data-provider.service.test.ts
git commit -m "feat(experimental): add NetworkObjectDocumentation parameter to data provider registration"
```

---

### Task 11: Add `attributes` then `documentation` to `webViewProviderService.registerWebViewProvider`

**Files:**

- Modify: `src/shared/services/web-view-provider.service.ts`

- [ ] **Step 1: Write the test**

In `src/shared/services/__tests__/web-view-provider.service.test.ts`, register a provider with `{ 'x-experimental': true }` and assert the underlying network object set received the documentation.

- [ ] **Step 2: Implement the parameter additions**

Locate `registerWebViewProvider` (around line 138 by earlier exploration). Today it does not pass `objectAttributes` or `objectDocumentation` to `networkObjectService.set`. Update:

```typescript
const registerWebViewProvider = async (
  webViewType: WebViewType,
  webViewProvider: IWebViewProvider | IWebViewProviderWithSubscribe,
  attributes?: { [property: string]: unknown },
  documentation?: NetworkObjectDocumentation,
): Promise<DisposableWebViewProvider> => {
  // ... existing logic ...
  return networkObjectService.set(
    getWebViewProviderObjectId(webViewType),
    webViewProvider,
    'web-view-provider',
    attributes,
    documentation,
  );
};
```

- [ ] **Step 3: Update the `PapiWebViewProviderService` deprecated `register` alias to forward**

Confirm the deprecated `register` alias signature on line 296-298 in the same file still passes through. Since it uses `Parameters<typeof registerWebViewProvider>`, it inherits the new parameters automatically.

- [ ] **Step 4: Run tests + typecheck — expect pass**

- [ ] **Step 5: Commit**

```bash
git add src/shared/services/web-view-provider.service.ts src/shared/services/__tests__/web-view-provider.service.test.ts
git commit -m "feat(experimental): add attributes and documentation params to WebView provider registration"
```

---

### Task 12: Augment `registerProjectDataProviderEngineFactory` (attributes, documentation, factory return)

**Files:**

- Modify: `src/shared/services/project-data-provider.service.ts`
- Modify: `src/shared/models/project-data-provider-engine-factory.model.ts`

- [ ] **Step 1: Augment the factory return type**

In `project-data-provider-engine-factory.model.ts`:

```typescript
import type { NetworkObjectDocumentation } from '@shared/models/openrpc.model';

export interface IProjectDataProviderEngineFactory<PI extends ProjectInterfaces> {
  createProjectDataProviderEngine(projectId: string): Promise<
    | IProjectDataProviderEngine<PI>
    | {
        /**
         * Discriminating property name chosen specifically so it cannot collide with a property an
         * engine itself exposes — the platform's narrowing check on this return value is
         * unambiguous.
         */
        projectDataProviderEngine: IProjectDataProviderEngine<PI>;
        /** Per-PDP attributes. The platform overwrites `projectId` regardless of what you supply. */
        attributes?: { [property: string]: unknown };
        /** Per-PDP documentation. Carries `'x-experimental': true` to mark the PDP experimental. */
        documentation?: NetworkObjectDocumentation;
      }
  >;
}
```

- [ ] **Step 2: Write the test**

In `src/shared/services/__tests__/project-data-provider.service.test.ts`, register a factory whose `createProjectDataProviderEngine` returns the new envelope; assert the per-PDP `documentation` and `attributes` reach the underlying `networkObjectService.set`.

- [ ] **Step 3: Update `registerProjectDataProviderEngineFactory`**

Add `attributes` and `documentation` parameters, spread `attributes` then overlay `projectInterfaces`:

```typescript
export const registerProjectDataProviderEngineFactory = async <PI extends ProjectInterfaces>(
  projectInterfaces: PI[],
  factory: IProjectDataProviderEngineFactory<PI>,
  attributes?: { [property: string]: unknown },
  documentation?: NetworkObjectDocumentation,
): Promise<UnsubscriberAsync> => {
  // ... existing logic ...
  const effectiveAttributes = { ...attributes, projectInterfaces };
  // Pass attributes + documentation through to the underlying network object registration.
  // For each PDP instance created by factory.createProjectDataProviderEngine, check whether the
  // return value matches the envelope shape (has `projectDataProviderEngine`) and merge.
};
```

The narrowing check at the call site:

```typescript
const factoryReturn = await factory.createProjectDataProviderEngine(projectId);
const isEnvelope =
  typeof factoryReturn === 'object' &&
  factoryReturn !== null &&
  'projectDataProviderEngine' in factoryReturn;
const engine = isEnvelope ? factoryReturn.projectDataProviderEngine : factoryReturn;
const perPdpAttributes = isEnvelope ? factoryReturn.attributes : undefined;
const perPdpDocs = isEnvelope ? factoryReturn.documentation : undefined;

const mergedAttributes = { ...attributes, ...perPdpAttributes, projectId };
const mergedDocs = perPdpDocs ?? documentation;
```

Locate the actual PDP registration site within `project-data-provider.service.ts` and apply this pattern.

- [ ] **Step 4: TSDoc the overwrite behavior**

Add explicit TSDoc on `registerProjectDataProviderEngineFactory` warning that `projectInterfaces` (at the registration level) and `projectId` (at the per-PDP level) are overwritten if supplied through `attributes`.

- [ ] **Step 5: Update the wiki page**

Verify the wiki page's "Project data providers" section shows the new shape with `projectDataProviderEngine` discriminator. (It already does — verify wording.)

- [ ] **Step 6: Run tests + typecheck — expect pass**

- [ ] **Step 7: Commit**

```bash
git add src/shared/services/project-data-provider.service.ts src/shared/models/project-data-provider-engine-factory.model.ts src/shared/services/__tests__/project-data-provider.service.test.ts
git commit -m "feat(experimental): add attributes, documentation, and factory return augmentation to PDP registration"
```

---

## Phase 4 — Event migration (25 sites)

### Task 13: Migrate the 3 shared platform events (network-object lifecycle + shared-store change)

**Files:**

- Modify: `src/shared/services/network-object.service.ts:124-127, 142-144`
- Modify: `src/shared/services/shared-store.service.ts:84`

The event names are already in `SharedNetworkEventTypes` (Phase 1 Task 2). Migration replaces sync calls with async calls.

- [ ] **Step 1: Convert `onDidCreateNetworkObjectEmitter` and `onDidDisposeNetworkObjectEmitter`**

In `src/shared/services/network-object.service.ts`, the two module-level `const` emitters need to move into the existing `initialize` function (or equivalent) so they can `await`. Replace:

```typescript
const onDidCreateNetworkObjectEmitter =
  networkService.createNetworkEventEmitter<NetworkObjectDetails>(
    serializeRequestType(CATEGORY_NETWORK_OBJECT, 'onDidCreateNetworkObject'),
  );
```

with:

```typescript
let onDidCreateNetworkObjectEmitter: PlatformEventEmitter<NetworkObjectDetails> | undefined;
// inside initialize():
onDidCreateNetworkObjectEmitter = await networkService.createNetworkEventEmitterAsync(
  'network-object.onDidCreateNetworkObject',
);
```

Update `export const onDidCreateNetworkObject = onDidCreateNetworkObjectEmitter.event;` to an accessor:

```typescript
export const onDidCreateNetworkObject = (callback: PlatformEventHandler<NetworkObjectDetails>) => {
  if (!onDidCreateNetworkObjectEmitter) throw new Error('network-object.service not initialized');
  return onDidCreateNetworkObjectEmitter.event(callback);
};
```

Repeat for `onDidDisposeNetworkObjectEmitter` / `onDidDisposeNetworkObject`.

- [ ] **Step 2: Convert `storeChangeEmitter`**

In `src/shared/services/shared-store.service.ts:84`:

```typescript
storeChangeEmitter = await networkService.createNetworkEventEmitterAsync(
  'shared-store.onDidChange',
);
```

(The variable `storeChangeEmitter` is already declared `let` and assigned inside an init function.)

- [ ] **Step 3: Run all relevant tests**

Run: `npm test -- src/shared/services/__tests__/network-object.service.test.ts src/shared/services/shared-store.service.test.ts --run`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/shared/services/network-object.service.ts src/shared/services/shared-store.service.ts
git commit -m "refactor(experimental): migrate shared platform events to createNetworkEventEmitterAsync"
```

---

### Task 14: Migrate easy single-process platform events

**Files:**

- Modify: `src/extension-host/services/extension.service.ts` (2 emitters)
- Modify: `src/renderer/services/scroll-group.service-host.ts` (1 emitter)

For each emitter, declare the event name in `NetworkEventTypes` (in `papi-shared-types.ts`) with its payload type, then replace the sync call with async + `await`.

- [ ] **Step 1: Declare event types**

In `src/declarations/papi-shared-types.ts`, augment `NetworkEventTypes`:

```typescript
declare module 'papi-shared-types' {
  export interface NetworkEventTypes {
    'platform.onDidReloadExtensions': boolean;
    // ... other extension-service event ...
    'scroll-group.onDidUpdateScrRef': ScrollGroupUpdateInfo;
  }
}
```

(Confirm the second extension-service event name by reading the file.)

- [ ] **Step 2: Migrate `extension.service.ts:1566`**

```typescript
reloadFinishedEventEmitter = await createNetworkEventEmitterAsync('platform.onDidReloadExtensions');
```

(Replace `createNetworkEventEmitter` import with `createNetworkEventEmitterAsync` import.)

- [ ] **Step 3: Migrate the second `extension.service.ts` emitter**

(Confirm location, name; same pattern.)

- [ ] **Step 4: Migrate `scroll-group.service-host.ts:59`**

The emitter is module-level; refactor into the service's init function with a `let` binding and an accessor that throws if invoked before initialization (same pattern as Task 13 Step 1).

- [ ] **Step 5: Run tests + typecheck — expect pass**

- [ ] **Step 6: Commit**

```bash
git add src/extension-host/services/extension.service.ts src/renderer/services/scroll-group.service-host.ts src/declarations/papi-shared-types.ts
git commit -m "refactor(experimental): migrate single-process platform events to createNetworkEventEmitterAsync"
```

---

### Task 15: Migrate WebView lifecycle emitters (4 emitters, init refactor)

**Files:**

- Modify: `src/renderer/services/web-view.service-host.ts:96,101,120,128`

- [ ] **Step 1: Declare event types**

In `src/declarations/papi-shared-types.ts`:

```typescript
export interface NetworkEventTypes {
  // ... existing ...
  'web-view.onDidAddWebView': OpenWebViewEvent;
  'web-view.onDidOpenWebView': OpenWebViewEvent;
  'web-view.onDidUpdateWebView': UpdateWebViewEvent;
  'web-view.onDidCloseWebView': CloseWebViewEvent;
}
```

Confirm exact wire names by reading `EVENT_NAME_ON_DID_*_WEB_VIEW` constants — they may differ slightly.

- [ ] **Step 2: Move emitters into the service's init function**

The four module-level `const` emitters at lines 96, 101, 120, 128 become `let` bindings declared at module scope, assigned inside the existing `initialize` function. Each call site that today references `onDidAddWebViewEmitter`, `onDidOpenWebViewEmitter`, `onDidUpdateWebViewEmitter`, `onDidCloseWebViewEmitter` is wrapped in accessors that throw if the service isn't initialized:

```typescript
let onDidAddWebViewEmitter: PlatformEventEmitter<OpenWebViewEvent> | undefined;

async function initialize() {
  // ... existing init ...
  onDidAddWebViewEmitter = await createNetworkEventEmitterAsync('web-view.onDidAddWebView');
  // ... three more ...
}

function getOnDidAddWebViewEmitter() {
  if (!onDidAddWebViewEmitter) throw new Error('web-view.service-host not initialized');
  return onDidAddWebViewEmitter;
}
```

Update any direct uses of the emitters to go through the getters.

- [ ] **Step 3: Run tests — expect pass**

Run: `npm test -- src/renderer/services --run`

- [ ] **Step 4: Commit**

```bash
git add src/renderer/services/web-view.service-host.ts src/declarations/papi-shared-types.ts
git commit -m "refactor(experimental): migrate WebView lifecycle emitters with lazy-init pattern"
```

---

### Task 16: Migrate `check-aggregator.service.ts` emitter (init refactor)

**Files:**

- Modify: `extensions/src/platform-scripture/src/checks/check-aggregator.service.ts:410`

- [ ] **Step 1: Declare the event type in the extension's `.d.ts`**

In `extensions/src/platform-scripture/src/types/platform-scripture.d.ts` (or similar):

```typescript
declare module 'papi-shared-types' {
  export interface NetworkEventTypes {
    'platform-scripture.checkResultsInvalidated': CheckResultsInvalidated;
  }
}
```

(Confirm the `CHECK_RESULTS_INVALIDATED_EVENT` constant's value.)

- [ ] **Step 2: Refactor the module-level emitter**

Move into an `initialize` function with a `let` binding + accessor pattern (same as Task 15 Step 2).

- [ ] **Step 3: Run tests, typecheck**

- [ ] **Step 4: Commit**

```bash
git add extensions/src/platform-scripture
git commit -m "refactor(experimental): migrate check-aggregator emitter to async"
```

---

### Task 17: Migrate data-provider per-instance emitter (type-assertion pattern)

**Files:**

- Modify: `src/shared/services/data-provider.service.ts:817`

- [ ] **Step 1: Replace the sync call with the documented type-assertion pattern**

```typescript
const dynamicName = serializeRequestType(dataProviderObjectId, ON_DID_UPDATE);
// Per-instance data provider events have dynamic names that can't be declared in
// NetworkEventTypes. Cast the name to satisfy the constraint; the payload type is
// recovered from the surrounding function's generic context.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const onDidUpdateEmitter = (await networkService.createNetworkEventEmitterAsync(
  dynamicName as keyof NetworkEventTypes,
)) as unknown as PlatformEventEmitter<
  DataProviderUpdateInstructions<DataProviderTypes[DataProviderName]>
>;
```

- [ ] **Step 2: Run tests + typecheck**

- [ ] **Step 3: Commit**

```bash
git add src/shared/services/data-provider.service.ts
git commit -m "refactor(experimental): migrate data-provider per-instance emitter with type assertion"
```

---

### Task 18: Migrate extension main.ts emitters (3 extensions)

**Files:**

- Modify: `extensions/src/hello-rock3/src/main.ts:462`
- Modify: `extensions/src/platform-scripture-editor/src/main.ts:286,290,1234`

For each: declare the event in the extension's `.d.ts` augmentation, then `await createNetworkEventEmitterAsync(...)` in the existing async `activate`/lifecycle function.

- [ ] **Step 1: Declare event types in each extension's `.d.ts`**

For hello-rock3:

```typescript
declare module 'papi-shared-types' {
  export interface NetworkEventTypes {
    'hello-rock3.onHelloRock3': HelloRock3Event;
  }
}
```

For platform-scripture-editor:

```typescript
declare module 'papi-shared-types' {
  export interface NetworkEventTypes {
    'platform-scripture-editor.projectSwitchWillStart': Record<string, never>;
    'platform-scripture-editor.projectSwitchDidFinish': Record<string, never>;
    'platform-scripture-editor.editorSelectionChanged': SelectionChangeEvent;
  }
}
```

(Confirm exact wire names from the constants `PROJECT_SWITCH_WILL_START_EVENT` etc.)

- [ ] **Step 2: Replace the four sync calls with async + await**

- [ ] **Step 3: Run extension tests + typecheck**

- [ ] **Step 4: Commit**

```bash
git add extensions/src/hello-rock3 extensions/src/platform-scripture-editor
git commit -m "refactor(experimental): migrate extension emitters to createNetworkEventEmitterAsync"
```

---

### Task 19: Migrate test files (4 test files)

**Files:**

- Modify: `src/shared/services/shared-store.service.test.ts`
- Modify: `src/renderer/app.component.test.tsx`
- Modify: `src/renderer/hooks/use-project-picker-data.hook.test.ts`

(One of the 4 listed earlier — `shared-store.service.test.ts` — has 3 occurrences. Migrate each.)

- [ ] **Step 1: For each test file, replace `createNetworkEventEmitter` with `createNetworkEventEmitterAsync` and `await` in the surrounding async setup**

If the event name is well-known (in `NetworkEventTypes`/`SharedNetworkEventTypes`), pass it directly. If it's a test-controlled name, declare it in `NetworkEventTypes` (in a test-scoped augmentation if possible, or in the global declaration file with a `// test only` comment).

- [ ] **Step 2: Run all 4 test files — expect pass**

```bash
npm test -- src/shared/services/shared-store.service.test.ts src/renderer/app.component.test.tsx src/renderer/hooks/use-project-picker-data.hook.test.ts --run
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/services/shared-store.service.test.ts src/renderer/app.component.test.tsx src/renderer/hooks/use-project-picker-data.hook.test.ts
git commit -m "refactor(experimental): migrate test fixtures to createNetworkEventEmitterAsync"
```

---

## Phase 5 — Docs

### Task 20: Add TSDoc to documentation types explaining where to set `'x-experimental': true`

**Files:**

- Modify: `src/shared/models/openrpc.model.ts`

- [ ] **Step 1: Add or extend TSDoc on each relevant type**

For each of `Method`, `Notification`, `SingleMethodDocumentation`, `SingleNotificationDocumentation`, `NetworkObjectDocumentation`: ensure the TSDoc explicitly says where to set `'x-experimental': true` to mark the documented entity experimental. (Some were added in Task 1; this task ensures completeness and consistency.)

Sample additions:

```typescript
/**
 * Documentation about a single method.
 *
 * To mark the method experimental, set `method['x-experimental']: true`. This becomes visible in
 * the generated OpenRPC document under `methods[].'x-experimental'`.
 */
export type SingleMethodDocumentation = {
  /* ... */
};

/**
 * Documentation about a single notification (event).
 *
 * To mark the notification experimental, set `notification['x-experimental']: true`. This becomes
 * visible in the generated OpenRPC document under the notification's entry in `methods[]`.
 */
export type SingleNotificationDocumentation = {
  /* ... */
};

/**
 * Documentation about all methods on a network object.
 *
 * Set top-level `'x-experimental': true` to mark every method of the object as experimental.
 * Alternatively, set it per-method via `methods[].'x-experimental'`. The platform fans out the
 * top-level marker onto each method when the object is registered.
 */
export type NetworkObjectDocumentation = {
  /* ... */
};
```

- [ ] **Step 2: Run typecheck (verifies docs propagate through JSDOC SOURCE/DESTINATION)**

Run: `npm run typecheck && cd lib/papi-dts && npm run build` to regenerate `papi.d.ts` and confirm the docs appear in the generated file.

- [ ] **Step 3: Commit**

```bash
git add src/shared/models/openrpc.model.ts lib/papi-dts/papi.d.ts
git commit -m "docs(experimental): add TSDoc on doc types explaining where to set x-experimental"
```

---

### Task 21: Update `.context/standards/` with experimental authoring conventions

**Files:**

- Modify: `.context/standards/Extension-Development-Guide.md` (or `Paranext-Core-Patterns.md` — pick the file with more API-authoring guidance; check both)

- [ ] **Step 1: Determine the appropriate target file**

Read both standards files briefly. Pick the one that already covers PAPI authoring conventions. If neither does, prefer `Extension-Development-Guide.md`.

- [ ] **Step 2: Add an "Experimental APIs" section**

The section should cover:

- What `@experimental` means and that it's informational only.
- Where to put it: TSDoc tag on type declarations, `'x-experimental': true` in registration documentation.
- A surface-by-surface quick reference (lift from the wiki page; do NOT duplicate the wiki — link to it).
- Decision guidance: mark as experimental whenever the API is not a confident, solid, general-purpose contract.
- Note on `createNetworkEventEmitter` deprecation in favor of `…Async`.

Cross-link to the wiki page at `docs/superpowers/specs/2026-06-08-experimental-apis-wiki-page.md` for full authoring details.

- [ ] **Step 3: Commit**

```bash
git add .context/standards/<file>.md
git commit -m "docs(experimental): add Experimental APIs section to standards"
```

---

### Task 22: Final wiki page sync + complete the rollout

**Files:**

- Modify: `docs/superpowers/specs/2026-06-08-experimental-apis-wiki-page.md`

- [ ] **Step 1: Diff the wiki page against the implemented behavior**

Read the wiki page top to bottom. For each code snippet, verify it matches the as-implemented signatures (parameter order, factory return shape, etc.). Fix any drift.

- [ ] **Step 2: Run the full test suite as a final gate**

Run: `npm test -- --run && npm run typecheck && npm run lint`
Expected: PASS across the board.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-06-08-experimental-apis-wiki-page.md
git commit -m "docs(experimental): final wiki page sync after implementation"
```

---

## Self-review checklist

After completing all tasks, run:

- [ ] `npm test -- --run` — all tests pass
- [ ] `npm run typecheck` — no type errors
- [ ] `npm run lint` — no lint errors introduced (existing warnings OK)
- [ ] `npm run build` — full build succeeds; `papi.d.ts` regenerates cleanly
- [ ] `git log --oneline tjc/experimental-api-flag ^main` — review the commit series for clarity and atomicity
- [ ] Open `lib/papi-dts/papi.d.ts` and search for `x-experimental` and `@experimental` — confirm the markers appear in the generated public types
- [ ] Manually inspect the wiki page for any remaining drift vs implementation

Then either:

- Open a PR with the design and wiki page as part of the change set; or
- Cherry-pick the implementation commits onto a fresh branch off `main` and open PR from there.
