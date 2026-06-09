# Experimental API Flag — Design

**Status:** Draft for review
**Date:** 2026-06-08
**Owner:** tjcouch-sil
**Related:** wiki page at `2026-06-08-experimental-apis-wiki-page.md` (companion to this spec)

## Summary

Introduce a uniform `experimental` marker for PAPI APIs that surfaces on both the TypeScript types (via the `@experimental` TSDoc modifier tag) and the live OpenRPC document over the WebSocket (via an `x-experimental: true` field). The marker applies to every PAPI surface — commands, network objects, data providers, project data providers, WebView providers, network events, types referenced by methods, and extensible menu features.

The marker is **informational only**. It changes no runtime behavior. It exists so consumers — extension developers, IDE tooling, and the future API documentation site — can identify APIs whose shape is not yet stable.

## Goals

- One marker convention covering every PAPI surface.
- Both authoring locations work: a TSDoc tag on the type/member, and a registration-time field for the wire representation.
- Both layers participate: the marker appears in `papi.d.ts` (for IDE consumers) and in the generated OpenRPC document (for runtime introspection tooling).
- Non-breaking — additive across the codebase. Existing code continues to work unchanged.
- Establish a side benefit: central registration for network events with a duplicate-registration warning across processes.

## Non-goals

- No runtime gate, opt-in, or manifest acknowledgement. Experimental APIs work identically to stable ones at runtime.
- No date or message in the OpenRPC encoding — boolean only. Prose belongs in the regular `description` field of the doc objects.
- No automatic extraction from TSDoc tags to OpenRPC. Developers fill in both intentionally; the locations are documented in the wiki page.
- No JSON Schema lift of shared types into OpenRPC `components.schemas`. Per-provider granularity is achieved by the provider-level mark.
- No `tsdoc.json`. TypeDoc 0.28.3 recognizes `@experimental` as a built-in modifier tag and cascades it to members by default. Held in reserve for the future if TSDoc-strict linting is adopted.
- No backfill of currently-experimental APIs as part of this design. That follows in a separate cleanup PR.

## Authoring model

The marker can be applied two complementary ways. Both are encouraged together:

- **TSDoc `@experimental` modifier tag** on the type, interface, member, or augmentation entry. Surfaces in IDE tooltips and TypeDoc-generated HTML. Cascades to child members.
- **Registration-time documentation** carrying `'x-experimental': true`. Surfaces in the live OpenRPC document.

### Commands

```typescript
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /** @experimental */
    'myExt.expCmd': (arg: string) => Promise<void>;
  }
}

await papi.commands.registerCommand('myExt.expCmd', handler, {
  method: {
    'x-experimental': true,
    summary: 'Does the experimental thing',
    params: [{ name: 'arg', schema: { type: 'string' } }],
    result: { name: 'returns', schema: { type: 'null' } },
  },
});
```

### Network objects

```typescript
await papi.networkObjects.set(
  'myObj',
  impl,
  'object',
  undefined,
  { 'x-experimental': true }, // 5th param: NetworkObjectDocumentation
);
```

### Data providers

```typescript
await papi.dataProviders.registerEngine(
  'myDP',
  engine,
  dataTypes,
  attributes,
  { 'x-experimental': true }, // new NetworkObjectDocumentation parameter
);
```

### Project data providers

```typescript
declare module 'papi-shared-types' {
  export interface ProjectDataProviderInterfaces {
    /** @experimental */
    'myExt.expInterface': IProjectDataProvider<MyDataTypes>;
  }
}

await papi.projectDataProviders.registerProjectDataProviderEngineFactory(
  ['myExt.expInterface'],
  {
    async createProjectDataProviderEngine(projectId) {
      // Option A — return engine only
      return new MyEngine(projectId);

      // Option B — return engine plus per-PDP-instance attributes + docs
      return {
        projectDataProviderEngine: new MyEngine(projectId),
        attributes: {
          /* per-PDP attributes; projectId and projectInterfaces overwritten */
        },
        documentation: { 'x-experimental': true },
      };
    },
  },
  /* attributes */ {
    /* registration-level attributes; projectInterfaces overwritten */
  },
  /* documentation */ { 'x-experimental': true },
);
```

### WebView providers

```typescript
await papi.webViewProviders.registerWebViewProvider(
  'myView',
  provider,
  /* attributes */ undefined,
  /* documentation */ { 'x-experimental': true },
);
```

### Network events

```typescript
declare module 'papi-shared-types' {
  export interface NetworkEvents {
    /** @experimental */
    'myExt.somethingHappened': { foo: string };
  }
}

const emitter = await papi.network.createNetworkEventEmitterAsync('myExt.somethingHappened', {
  notification: {
    'x-experimental': true,
    summary: 'Fires when something experimental happens',
    params: [
      {
        name: 'event',
        schema: {
          /* json schema for { foo: string } */
        },
      },
    ],
  },
});
// emitter is PapiEventEmitter<{ foo: string }> — inferred from the event name
```

A small set of platform infrastructure events (e.g., `network-object.onDidCreateNetworkObject`) are intentionally emitted from multiple processes. They live in a closed `MultiSourceNetworkEvents` type that `NetworkEvents` inherits from. Extensions don't author multi-source events — but they can subscribe to them like any other event. See the "Event registration plumbing" section for how this is enforced at the central registry.

### Menus

```jsonc
{
  "columns": {
    "myExt.myColumn": {
      "label": "%myColumn.label%",
      "order": 1,
      "isExtensible": true,
      "isExperimental": true,
    },
  },
}
```

## Encoding

| Surface                         | Field name         | Type      | Notes                                                                                               |
| ------------------------------- | ------------------ | --------- | --------------------------------------------------------------------------------------------------- |
| TSDoc tag                       | `@experimental`    | modifier  | Built-in TypeDoc tag; cascades by default in 0.28.3+                                                |
| TypeScript registration options | `isExperimental`   | `boolean` | Used on the menus model (parallels existing `isExtensible`)                                         |
| OpenRPC wire                    | `'x-experimental'` | `boolean` | Vendor extension on `Method`, `Notification`, `NetworkObjectDocumentation`, and JSON Schema objects |

`@experimental` is the TSDoc convention (no `@isExperimental` form). `'x-experimental'` follows OpenRPC's existing field-naming style (matches `deprecated`/`summary`/etc., which also are not `is`-prefixed). `isExperimental` is used on our internal types where the code style guide applies.

## `openrpc.model.ts` changes

Two distinct types so each registration site can constrain what it accepts:

```typescript
export type Method = {
  name: string;
  params: (ContentDescriptor | Reference)[];
  result: ContentDescriptor | Reference;
  'x-experimental'?: boolean;
  // ... existing fields unchanged
};

export type Notification = Omit<Method, 'result'>;

export type SingleNotificationDocumentation = {
  notification: Omit<Notification, 'name'>;
  components?: Components;
};

export type NetworkObjectDocumentation = {
  summary?: string;
  description?: string;
  methods?: Method[]; // Method only — object methods always have a return value
  components?: Components;
  'x-experimental'?: boolean; // object-wide; fans out to every method registered for this object
};

export type OpenRpc = {
  openrpc: string;
  info: Info;
  servers?: Server[];
  methods: (Method | Notification)[]; // both at root — spec convention is no-result == notification
  components?: Components;
  externalDocs?: ExternalDocumentation;
};
```

Spec compliance: the root `methods` array holds both, distinguishable by the absence of `result` on notifications. This matches the current OpenRPC convention (issue #230 lineage). The local `Notification` type gives us tighter compile-time guarantees at every site where notifications are not allowed (e.g., `NetworkObjectDocumentation.methods`).

## Event registration plumbing

Today's events have no central registry. Each process holds a local `eventEmittersByEventType` Map and emission propagates via JSON-RPC notifications across processes. Adding events to the OpenRPC document requires central registration.

### Type registry shape

A single augmentable interface for events, with a closed type alias declaring the platform's multi-source events. The multi-source alias is the source of truth at both the type level and the runtime registry.

````typescript
declare module 'papi-shared-types' {
  /**
   * Network events emitted from multiple processes (each process emits its own local event under
   * the same name). Declared by the platform; not extensible by extensions.
   *
   * The names listed here are the source of truth for which event names use multi-source semantics
   * at the central registry. An event name in this type allows registration from multiple processes
   * (each process registers once, all emitters are valid sources). Any other event name uses
   * single-source semantics (one registrant ever).
   *
   * Subscribers do not need to know which events are multi-source — `getNetworkEvent` handles both
   * kinds identically.
   */
  export type MultiSourceNetworkEvents = {
    'network-object.onDidCreateNetworkObject': NetworkObjectDetails;
    'network-object.onDidDisposeNetworkObject': string;
    'shared-store.onDidChange': StoreChangeEvent;
  };

  /**
   * Mapping of network event names to their payload types. Extensions augment this to declare their
   * own events. Inherits the platform's multi-source events automatically.
   *
   * To declare a new event for use with `createNetworkEventEmitterAsync`:
   *
   * ```ts
   * declare module 'papi-shared-types' {
   *   export interface NetworkEvents {
   *     'myExt.somethingHappened': { foo: string };
   *   }
   * }
   * ```
   */
  export interface NetworkEvents extends MultiSourceNetworkEvents {}

  /** Union of all known network event names (keys of {@link NetworkEvents}). */
  export type NetworkEventTypes = keyof NetworkEvents;
}
````

The runtime mirror is a constant in `network.service.ts`:

```typescript
const MULTI_SOURCE_EVENT_NAMES = new Set<keyof MultiSourceNetworkEvents>([
  'network-object.onDidCreateNetworkObject',
  'network-object.onDidDisposeNetworkObject',
  'shared-store.onDidChange',
]);
```

The constant and the type alias must stay in sync; a build-time assertion (or a unit test) verifies that every key in `MultiSourceNetworkEvents` appears in `MULTI_SOURCE_EVENT_NAMES`.

### New emitter creator — single function

One function. Whether the runtime treats a registration as multi-source or single-source is determined by the name's presence in `MULTI_SOURCE_EVENT_NAMES`, not by which function the caller invokes.

```typescript
/**
 * Create a network event emitter that participates in central registration. The returned emitter
 * appears in the OpenRPC document if `documentation` is provided.
 *
 * If the event name is in `MultiSourceNetworkEvents`, the central registry uses **multi-source**
 * semantics: multiple processes may register the same name (each process registers once); all
 * corresponding emitters are valid sources.
 *
 * Otherwise the central registry uses **single-source** semantics: only one process may register a
 * given name; subsequent registrations from any process are rejected.
 *
 * Intra-process duplicate registration is always rejected regardless of the event's domain.
 *
 * @param eventType  Must be a key of `NetworkEvents` (which inherits `MultiSourceNetworkEvents`).
 *                   Equivalently, must satisfy the `NetworkEventTypes` string-union alias.
 * @param documentation  Optional notification documentation. Carries `'x-experimental': true` to
 *                       mark the event as experimental.
 */
createNetworkEventEmitterAsync<EventType extends NetworkEventTypes>(
  eventType: EventType,
  documentation?: SingleNotificationDocumentation,
): Promise<PapiEventEmitter<NetworkEvents[EventType]>>;
```

### Subscriber — typed overload + deprecated fallback

```typescript
/**
 * Subscribe to a typed network event. Declare the event in `NetworkEvents` (or rely on
 * `MultiSourceNetworkEvents` inheritance for platform events) and the payload type is inferred.
 */
function getNetworkEvent<EventType extends NetworkEventTypes>(
  eventType: EventType,
): PlatformEvent<NetworkEvents[EventType]>;

/**
 * @deprecated 8 June 2026. Use the typed signature: declare the event in `NetworkEvents` and call
 *   `getNetworkEvent('your.event.name')` without an explicit type parameter. If your event name is
 *   dynamic (e.g., per-instance data-provider events), this signature continues to work
 *   functionally; suppress the deprecation warning at the call site.
 */
function getNetworkEvent<T>(eventType: string): PlatformEvent<T>;
```

Per-overload `@deprecated` is honored by TypeScript-language-server clients (VSCode and equivalents), so existing call sites that pass an explicit `<T>` show the strikethrough; migrated call sites that omit `<T>` resolve to the non-deprecated overload.

### Deprecation of the sync emitter

The sync `createNetworkEventEmitter` signature is **unchanged** — preserving full backward compatibility. Only the deprecation tag is added.

```typescript
/**
 * @deprecated 8 June 2026. Use createNetworkEventEmitterAsync. Events created via the sync API
 *   are not centrally registered and do not appear in the OpenRPC document. The async version
 *   properly restricts event registration to prevent multiple sources from emitting the same
 *   network event (unless the event is declared in `MultiSourceNetworkEvents`, in which case it
 *   accepts multiple registrants by design).
 */
createNetworkEventEmitter<T>(eventType: string): PapiEventEmitter<T>;
```

### Wire-level plumbing

1. Add a new `REGISTER_EVENT` RPC method on the main process, modeled directly on `REGISTER_METHOD` at `src/main/services/rpc-server.ts:141-145`. The payload carries the event name and optional `SingleNotificationDocumentation`. No domain discriminator is sent over the wire — the registry decides multi-source vs single-source by looking up the name in `MULTI_SOURCE_EVENT_NAMES`.
2. Add `rpcEventDetailsByEventName: Map<string, { registrants: { processId: string; documentation?: SingleNotificationDocumentation }[] }>` to `RpcWebsocketListener`, parallel to the existing `rpcMethodDetailsByMethodName` at `src/main/services/rpc-websocket-listener.ts:47`.
3. `createNetworkEventEmitterAsync` invokes `REGISTER_EVENT` and awaits the response before resolving the returned emitter.
4. `generateOpenRpcSchema()` iterates the event registry and includes each event once as a `Notification` entry in the root `methods` array. Whether the event is multi-source or single-source is not exposed in OpenRPC output — both kinds appear as notifications, indistinguishable on the wire.

### Conflict policy

The central registry decides behavior per registration by checking the event name against `MULTI_SOURCE_EVENT_NAMES`:

**Name in `MULTI_SOURCE_EVENT_NAMES` (multi-source).** Multiple processes may register; each process may register only once. The first registration's documentation is used for OpenRPC output; subsequent documentation is ignored with a debug-level log noting that the documentation was already established.

**Name not in `MULTI_SOURCE_EVENT_NAMES` (single-source).** First registrant wins. Any subsequent registration from any process is rejected with an error that names the existing registrant's process ID.

**Intra-process duplicate (either kind).** Always rejected — preserves today's hard error at `src/shared/services/network.service.ts:328-329`.

The sync `createNetworkEventEmitter` (deprecated) bypasses all of the above — it doesn't participate in central registration at all. That preserves today's behavior.

### Sync emitter behavior is unchanged

The deprecated sync `createNetworkEventEmitter` continues to function exactly as today — no central registration, not visible in OpenRPC. This is the back-compat guarantee. Migration is opt-in.

## Event migration

`createNetworkEventEmitter` has 36 occurrences in the codebase. 11 of those are foundational — the API implementation in `src/shared/services/network.service.ts` (7), the emitter model in `src/shared/models/papi-network-event-emitter.model.ts` (1), and generated `lib/papi-dts/papi.d.ts` references (3) — and are touched as part of the foundational work below, not the migration.

The remaining 25 are user-level call sites that all migrate to the same `createNetworkEventEmitterAsync` function. Whether an event is treated as multi-source or single-source is determined at the central registry by name lookup against `MULTI_SOURCE_EVENT_NAMES`, not by which function is called — so the migration code path is identical regardless. The categorization below only determines **where each event name's type is declared**: in `MultiSourceNetworkEvents` (closed alias in core, for the 3 platform multi-source events) or in `NetworkEvents` (the augmentable interface, for everything else).

### Events whose names go in `MultiSourceNetworkEvents` (3 sites)

These live in `src/shared/services/*` and are emitted by every process that hosts the service. Their names are added to the closed `MultiSourceNetworkEvents` type alias in core declarations and to the `MULTI_SOURCE_EVENT_NAMES` runtime constant:

- `src/shared/services/network-object.service.ts:124-127` — `onDidCreateNetworkObjectEmitter`. Every process emits when it creates a local network object.
- `src/shared/services/network-object.service.ts:142-144` — `onDidDisposeNetworkObjectEmitter`. Every process emits when it disposes a local network object (comment at lines 139-141 explicitly notes the multi-process intent).
- `src/shared/services/shared-store.service.ts:84` — `storeChangeEmitter`. Every process emits when its local store changes.

### Events whose names go in `NetworkEvents` (22 sites)

Single-source emitters. Names are added to the augmentable `NetworkEvents` interface (in core declarations for platform events; in extension `.d.ts` files for extension events). One site (the data-provider per-instance emitter) has a dynamic name and uses the type-assertion pattern shown below. Categorized by migration ease:

**Easy** — already in an async initialization context, straightforward `await` swap:

- All 4 test files: `src/shared/services/shared-store.service.test.ts`, `src/renderer/app.component.test.tsx`, `src/renderer/hooks/use-project-picker-data.hook.test.ts`
- `extensions/src/hello-rock3/src/main.ts:462`
- `extensions/src/platform-scripture-editor/src/main.ts:286,290,1234`
- `src/extension-host/services/extension.service.ts` (2 occurrences)
- `src/renderer/services/scroll-group.service-host.ts` (1 emitter + 1 import line)

**Dynamic-name (type-assertion pattern)** — one site has a name that can't be a literal in the registry:

- `src/shared/services/data-provider.service.ts:817` — the name is `serializeRequestType(dataProviderObjectId, ON_DID_UPDATE)`, computed per data-provider instance. The payload type is statically known from the surrounding function's generics. Migration uses a double assertion (name into `NetworkEventTypes` to satisfy the constraint, then result into the known emitter type) with a comment explaining why the literal-name path isn't available:

  ```ts
  const dynamicName = serializeRequestType(dataProviderObjectId, ON_DID_UPDATE);
  const onDidUpdateEmitter = (await networkService.createNetworkEventEmitterAsync(
    // Per-instance data provider events have dynamic names that can't be declared in
    // NetworkEvents. Cast the name to satisfy the NetworkEventTypes constraint; the payload
    // type is recovered from the surrounding function's generic context.
    dynamicName as NetworkEventTypes,
  )) as unknown as PapiEventEmitter<
    DataProviderUpdateInstructions<DataProviderTypes[DataProviderName]>
  >;
  ```

  Runtime behavior is identical to the typed path; the cast is purely to thread the static-name constraint at the API boundary.

**Trickier** — module-level `const` emitters that need lazy-init refactoring:

- `src/renderer/services/web-view.service-host.ts:96,101,120,128` — four lifecycle emitters at module top level. Move into the existing service-host initialization function, store in `let` bindings, expose via accessor functions that throw with a descriptive error if invoked before initialization.
- `extensions/src/platform-scripture/src/checks/check-aggregator.service.ts:410` — same pattern.

### Foundational work (this design)

The core implementation — included in this design, not deferred:

- `src/shared/services/network.service.ts` — add `createNetworkEventEmitterAsync` alongside the deprecated sync variant; extend `createNetworkEventEmitterInternal` to optionally perform central registration; update the `PapiNetworkService` interface.
- `src/main/services/rpc-websocket-listener.ts` — add `rpcEventDetailsByEventName` and emit notifications during schema generation.
- `src/main/services/rpc-server.ts` — implement `REGISTER_EVENT` handler.

Bootstrap-order note: the `REGISTER_EVENT` RPC method itself must be registered before any emitter creation calls it. Main process registers its own handler at startup, same way it does for `REGISTER_METHOD`. Same-process emitter creation on main does not need to await network availability — it registers directly into the central map.

### Dynamic event-name escape hatch

Some core code (data-provider change events, etc.) creates emitters with names not declared in `NetworkEvents`. The async signature requires `NetworkEventTypes` (the string-union alias), so these sites use `as NetworkEventTypes` to type-assert. Document the reason inline with a brief comment.

## Registration surfaces — fanout

A single registration-time mark on a network-object-backed surface fans out `'x-experimental': true` onto every method's `methodDocs` that the object exposes. The fanout happens at the one site where method registration is centralized — inside `networkObjectService.set` and its callers.

| Registration                                                         | Where the mark goes                                                                |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `commandService.registerCommand`                                     | Existing 3rd parameter `commandDocs.method['x-experimental']`                      |
| `networkObjectService.set`                                           | Existing 5th parameter `objectDocumentation['x-experimental']`                     |
| `dataProviderService.registerEngine` / `registerEngineByType`        | New `NetworkObjectDocumentation` parameter                                         |
| `webViewProviderService.registerWebViewProvider`                     | New `attributes?` parameter followed by new `NetworkObjectDocumentation` parameter |
| `papi.projectDataProviders.registerProjectDataProviderEngineFactory` | New parameters; see PDP section below                                              |
| `createNetworkEventEmitterAsync`                                     | Documentation parameter `notification['x-experimental']`                           |

### PDP registration changes

`registerProjectDataProviderEngineFactory` needs to match the network-object-backed registration pattern used elsewhere:

```typescript
registerProjectDataProviderEngineFactory(
  projectInterfaces: ProjectInterfaces[],
  factory: IProjectDataProviderEngineFactory,
  attributes?: ProjectDataProviderFactoryAttributes,
  documentation?: NetworkObjectDocumentation,
): Promise<UnsubscriberAsync>;
```

The platform spreads `attributes` and then overlays the canonical `projectInterfaces` on top. Setting `projectInterfaces` inside `attributes` has no effect — the platform-computed value wins. Document this in TSDoc.

The factory's `createProjectDataProviderEngine` return type is augmented:

```typescript
interface IProjectDataProviderEngineFactory<PI extends ProjectInterfaces> {
  createProjectDataProviderEngine(projectId: string): Promise<
    | IProjectDataProviderEngine<PI>
    | {
        projectDataProviderEngine: IProjectDataProviderEngine<PI>;
        /** Per-PDP attributes. `projectId` will be overwritten by the platform. */
        attributes?: ProjectDataProviderAttributes;
        /** Per-PDP documentation. */
        documentation?: NetworkObjectDocumentation;
      }
  >;
}
```

Existing factories that return just the engine continue to work. New factories that need per-PDP customization return the object form. The platform handles both via a narrow union check at the call site that invokes the factory — the discriminating property `projectDataProviderEngine` is named specifically so it cannot accidentally collide with a property an engine itself might expose, eliminating any risk of misreading an engine as an envelope.

## Menus

Add `isExperimental?: boolean` to the menus model at `lib/platform-bible-utils/src/extension-contributions/menus.model.ts`:

- `OrderedExtensibleContainer` (cascades into `MenuGroupDetailsInColumn`, `MenuGroupDetailsInSubMenu`, `MenuColumnWithHeader`)
- `ColumnsWithHeaders` (sibling to existing `isExtensible`)
- `WebViewMenu` (sibling to `includeDefaults`, `topMenu`, `contextMenu`)

Add matching `isExperimental: { type: 'boolean' }` entries to the JSON Schema at the bottom of the same file alongside each existing `isExtensible` schema entry.

No runtime plumbing. The field is data on the contribution; extensions reading menu data check it before extending an experimental anchor point.

## TSDoc on the documentation types

Each of the following types receives a TSDoc block explaining where to put `'x-experimental': true` to mark the documented entity experimental:

- `Method` — "Set `'x-experimental': true` to mark this method as experimental."
- `Notification` — same, for notifications.
- `NetworkObjectDocumentation` — "Set top-level `'x-experimental': true` to mark every method on this object experimental, or set it per-method via `methods[].'x-experimental'`."
- `SingleMethodDocumentation`, `SingleNotificationDocumentation` — references the inner type.
- Menus model: `OrderedExtensibleContainer`, `ColumnsWithHeaders`, `WebViewMenu` — "Set `isExperimental: true` to mark this extension point as experimental."

These TSDocs are part of the implementation, not separate docs files.

## Testing

### Unit tests

`generateOpenRpcSchema()` snapshot tests:

- Method registered with `commandDocs.method['x-experimental']: true` appears with `x-experimental: true` in the OpenRPC output.
- Network object registered with `objectDocumentation['x-experimental']: true` fans out to all its methods.
- Notification registered via `createNetworkEventEmitterAsync` with `notification['x-experimental']: true` appears in `methods[]` with no `result` and with `x-experimental: true`.
- Components schema with `x-experimental: true` round-trips through generation.

`network.service.ts` tests:

- `createNetworkEventEmitterAsync` resolves to a functional emitter for any name in `NetworkEvents`; central registry is populated.
- For a name in `MULTI_SOURCE_EVENT_NAMES`: same-name re-registration from a different process succeeds; the new registrant is appended to `registrants[]`; subsequent documentation is ignored.
- For a name not in `MULTI_SOURCE_EVENT_NAMES`: same-name re-registration (from any process) rejects with an error naming the existing registrant's process ID.
- Intra-process duplicate (either kind) rejects with the existing error.
- Build-time/test-time assertion: every key in `MultiSourceNetworkEvents` appears in `MULTI_SOURCE_EVENT_NAMES` and vice versa — the two sources must stay in sync.
- Events created via the deprecated sync API do **not** appear in OpenRPC output and do **not** populate the central registry.

`getNetworkEvent` overload tests:

- New call without `<T>` for a name in `NetworkEvents` resolves to the typed overload and the returned payload type is correctly inferred.
- New call without `<T>` for a name in `MultiSourceNetworkEvents` (inherited) likewise infers correctly.
- Existing call with explicit `<T>` (e.g., `getNetworkEvent<MyType>('foo')`) continues to compile and returns `PlatformEvent<MyType>`; resolves to the deprecated overload.
- IDE strikethrough on the deprecated overload verified (manual / snapshot).

Menu tests:

- Existing menu-document validation accepts `isExperimental` on `OrderedExtensibleContainer`, `ColumnsWithHeaders`, and `WebViewMenu`.
- Menu data merge preserves `isExperimental` through `menuDocumentCombiner`.

### Integration

- Generate OpenRPC for a running platform with at least one experimental command, one experimental network object, and one experimental event registered. Verify the generated document at the `GET_METHODS` endpoint contains all three markers.

## Documentation

### In-source TSDoc

See the "TSDoc on the documentation types" section above.

### Context standards

Update `.context/standards/Extension-Development-Guide.md` (or `Paranext-Core-Patterns.md` — placement chosen during implementation) with:

- Authoring conventions covering every surface from this design.
- The `createNetworkEventEmitter` → `…Async` deprecation note.
- Cross-reference to the wiki page.

### Wiki page

A separate output of this brainstorming session: `2026-06-08-experimental-apis-wiki-page.md`. Intended for the Paranext wiki, covering what experimental means, when to apply it, how to apply it on each surface, and what it means for consumers.

**The wiki page must be kept in sync with the implementation as the work proceeds.** Every implementation PR that changes any of the API surfaces touched by this design — registration signatures, factory return shapes, type-registry names, event creator APIs, encoding fields — updates `2026-06-08-experimental-apis-wiki-page.md` in the same commit. The wiki page is treated as part of the implementation artifact, not as a one-time output of brainstorming. When the implementation is complete, the file's contents are copied to the public Paranext wiki page.

## Rollout

All changes are additive and non-breaking.

In one PR / change set:

1. `openrpc.model.ts` type changes (`Method`, `Notification`, `NetworkObjectDocumentation`, root `OpenRpc.methods`).
2. `papi-shared-types.ts` additions: `MultiSourceNetworkEvents` (closed type alias with platform multi-source events), `NetworkEvents` (augmentable interface extending `MultiSourceNetworkEvents`), and `NetworkEventTypes` (= `keyof NetworkEvents`); TSDoc on each explaining authoring and the `@experimental` convention.
3. `MULTI_SOURCE_EVENT_NAMES` constant in `network.service.ts` mirroring `MultiSourceNetworkEvents`; build-time / test-time assertion that the two stay in sync.
4. `createNetworkEventEmitterAsync` implementation + `createNetworkEventEmitter` deprecation tag (signature unchanged).
5. `getNetworkEvent` typed overload + deprecated explicit-`<T>` overload (signature behavior unchanged for existing callers).
6. `REGISTER_EVENT` RPC method + `rpcEventDetailsByEventName` in `RpcWebsocketListener` (storing registrants list; shared-vs-exclusive decided by name lookup on each registration).
7. `generateOpenRpcSchema()` extended to include notifications.
8. Registration site updates: commands (existing docs param), `networkObjectService.set` (existing 5th param), `dataProviderService.registerEngine` / `registerEngineByType` (new docs param after existing attributes), `webViewProviderService.registerWebViewProvider` (new `attributes` param, then new docs param), PDP factory (new attributes + docs params; return shape augmented with `projectDataProviderEngine` discriminator).
9. Menus model `isExperimental` additions on `OrderedExtensibleContainer`, `ColumnsWithHeaders`, `WebViewMenu`, plus matching JSON Schema entries.
10. 25-site migration of `createNetworkEventEmitter` to `createNetworkEventEmitterAsync` (single function; 3 of the names go into `MultiSourceNetworkEvents`, the rest into `NetworkEvents`).
11. TSDoc on documentation types pointing out where to set `'x-experimental': true`.
12. Context standards update.
13. Wiki page kept in sync with each implementation PR; final contents published to the Paranext wiki at the end.

Follow-up (separate PR): backfill `@experimental` and `x-experimental` on currently-experimental APIs in the codebase (e.g., `platform.interfaceMode` setting at `src/declarations/papi-shared-types.ts:190`).

## Open questions

None at this point. All design decisions resolved during brainstorming.

## References

- TypeDoc 0.28.3 — `package.json:270`. `@experimental` is built-in; `cascadedModifierTags` default includes it.
- OpenRPC 1.2.6 spec — locked at this version by `src/shared/models/openrpc.model.ts:14-16` due to playground tool support.
- OpenRPC notifications convention — open-rpc/spec issue #230 (method without `result` represents a notification/event).
- Existing `@deprecated` usage as a reference for tag style (e.g., `src/declarations/papi-shared-types.ts:94`).
- Existing ad-hoc experimental warning at `src/declarations/papi-shared-types.ts:190` (the marker this design replaces).
