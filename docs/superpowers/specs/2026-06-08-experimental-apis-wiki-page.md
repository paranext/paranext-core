# Experimental APIs in Platform.Bible

This page explains what "experimental" means for a Platform.Bible API, how to recognize one, and how to mark one when you're authoring an API yourself.

> **Note for maintainers:** this page is kept in sync with the implementation. Every PR that changes any of the API surfaces below updates this page in the same commit. When the work is complete, the contents here will be the canonical wiki content.

## What does experimental mean

An API marked **experimental** is one whose shape is not yet considered stable enough to depend on. It may change or be removed in any future release without following semantic versioning. The marker is informational only: experimental APIs behave identically to stable ones at runtime — nothing is gated, no consent is required.

Mark an API experimental whenever it is not a confident, solid, general-purpose contract. Specifically:

- APIs designed for one particular UI or use case rather than a broad audience.
- APIs whose shape is likely to change as you learn how they're used.
- APIs added to unblock a feature without long-term-suitability review.
- APIs not yet covered by tests in a meaningful way.

When the API has stabilized and earned confidence, remove the experimental marker. Promote out of experimental deliberately, not by accident.

## Recognizing experimental APIs

Two ways:

**In your editor.** Hover over an API in TypeScript and look for the `@experimental` tag in the docstring. Members of an interface marked `@experimental` inherit the marker — every method on an experimental type is itself experimental in the generated documentation.

**At runtime.** Inspect the live OpenRPC document (call the `rpc.discover` JSON-RPC method against the platform's WebSocket on port 8876). Experimental methods, notifications, and network objects carry `"x-experimental": true`.

## Marking an API experimental — by surface

For each surface there are two complementary places to apply the marker: the TypeScript types (so IDE consumers see it) and the registration call's documentation (so the OpenRPC document reflects it). Apply both whenever you can.

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

`networkObjectService.set` already accepts a `NetworkObjectDocumentation` parameter. Setting `'x-experimental': true` at the top level fans out to every method exposed by the object — no need to mark each method individually.

```typescript
await papi.networkObjects.set('myObj', impl, 'object', /* attributes */ undefined, {
  'x-experimental': true,
});
```

To mark only a specific method on the object, set it on that method's entry in `documentation.methods[]` instead of at the top level.

### Data providers

Data providers are network objects underneath, so the same fanout applies. The documentation parameter is new — pass it as `NetworkObjectDocumentation`:

```typescript
await papi.dataProviders.registerEngine('myDP', engine, dataTypes, attributes, {
  'x-experimental': true,
});
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

Marking a WebView provider experimental implies the provider's WebView state shape and `getWebView` options shape are also experimental. There's no per-property granularity for state/options at this level — graduate the whole provider out of experimental when ready.

### Project data providers

PDPs need marking in two places: the `projectInterfaces` declaration (TypeScript) and the registration call (wire).

```typescript
declare module 'papi-shared-types' {
  export interface ProjectDataProviderInterfaces {
    /** @experimental */
    'myExt.expInterface': IProjectDataProvider<MyDataTypes>;
  }
}

await papi.projectDataProviders.registerProjectDataProviderEngineFactory(
  ['myExt.expInterface'],
  factory,
  /* attributes */ {},
  /* documentation */ { 'x-experimental': true },
);
```

`registerProjectDataProviderEngineFactory` lets you specify both registration-level attributes and per-PDP-instance attributes (the latter via the return value of `createProjectDataProviderEngine`). The platform overlays canonical `projectInterfaces` and `projectId` over whatever you supply — those fields cannot be overridden through attributes.

For per-PDP-instance customization, the factory's `createProjectDataProviderEngine` method can return `{ projectDataProviderEngine, attributes?, documentation? }` instead of just the engine. The unusual property name (`projectDataProviderEngine` rather than `engine`) is deliberate — it cannot accidentally collide with a property an engine itself exposes, so the platform's narrowing check on the return value is unambiguous.

### Network events

Declare your event in the `NetworkEventTypes` interface and create the emitter — the payload type is inferred from the registry, and the platform handles registration uniformly.

```typescript
declare module 'papi-shared-types' {
  export interface NetworkEventTypes {
    /** @experimental */
    'myExt.somethingHappened': { foo: string };
  }
}

const emitter = await papi.network.createNetworkEventEmitterAsync('myExt.somethingHappened', {
  notification: {
    'x-experimental': true,
    summary: 'Fires when something experimental happens',
    params: [
      { name: 'event', schema: { type: 'object', properties: { foo: { type: 'string' } } } },
    ],
  },
});
// emitter is PapiEventEmitter<{ foo: string }> — the payload type is inferred
```

If any other process tries to register the same event name, the platform rejects the second registration. Each event has exactly one source.

Subscribing is symmetric — pass the same name, no explicit type parameter needed:

```typescript
papi.network.getNetworkEvent('myExt.somethingHappened')((event) => {
  // event is { foo: string } — inferred from the registry
});
```

#### Subscribing to platform events

A small set of platform infrastructure events (network-object lifecycle, shared-store changes) are emitted from every process that hosts the corresponding service. These are declared in `SharedNetworkEventTypes`, which `NetworkEventTypes` inherits from, so they show up in IntelliSense alongside extension-declared events. As a subscriber, you don't need to know which events are shared — `getNetworkEvent` handles both the same way.

The platform owns this list; extensions don't author shared events. If you ever find yourself wanting a single name emitted from multiple processes (rare), you can either:

1. Pick the more natural pattern: each process emits its own distinctly-named event (`myExt.fromMain.thing`, `myExt.fromExtHost.thing`) and subscribers listen to whichever they care about.
2. Open a platform issue describing the use case — the shared-event surface is intentionally small.

#### Deprecated sync API

The synchronous `createNetworkEventEmitter` is deprecated as of 8 June 2026. It continues to function but does not participate in central event registration, so events created via the sync API:

- Are invisible in the OpenRPC document.
- Cannot be marked as experimental on the wire.
- Don't enforce the "single registrant per event name" guarantee.

Migrate new code to `createNetworkEventEmitterAsync`.

The legacy `getNetworkEvent<T>(name)` overload that takes an explicit type parameter is also deprecated — IntelliSense will show strikethrough on calls that resolve to it. Migrate by declaring your event in `NetworkEventTypes` and dropping the explicit `<T>`:

```typescript
// Before (deprecated)
const ev = papi.network.getNetworkEvent<MyType>('myExt.somethingHappened');

// After
declare module 'papi-shared-types' {
  export interface NetworkEventTypes {
    'myExt.somethingHappened': MyType;
  }
}
const ev = papi.network.getNetworkEvent('myExt.somethingHappened');
```

If your event name is dynamic (e.g., per-instance data-provider events that include an object id), the deprecated explicit-`<T>` overload remains functional — suppress the warning at the call site with a brief comment explaining why a static declaration isn't possible.

### Menu extensibility

Mark an extension point (a column, group, or whole WebView menu) experimental so other extensions know not to depend on its shape:

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

Available on `OrderedExtensibleContainer` (columns, groups), `ColumnsWithHeaders`, and `WebViewMenu`. Extensions reading menu data should check `isExperimental` before contributing to it.

## Encoding reference

Three field-name conventions show up across the surfaces — each follows the surrounding code style:

| Where you see it                         | Field                    |
| ---------------------------------------- | ------------------------ |
| TSDoc tag in `.ts` source                | `@experimental`          |
| OpenRPC document (over the wire)         | `"x-experimental": true` |
| Menus model JSON                         | `"isExperimental": true` |
| Internal TypeScript registration options | `isExperimental: true`   |

You write all of them; nothing is auto-extracted. The TSDoc tag is for IDE/documentation consumers. The OpenRPC field is for runtime tooling that reads the live document. The menus field is data on a menu contribution that other extensions can read.

## What experimental does NOT do

- It does **not** prevent extensions from calling the API.
- It does **not** require any opt-in or manifest acknowledgement.
- It does **not** emit runtime warnings when called.
- It does **not** affect the generated `papi.d.ts` types beyond rendering the tag in TypeDoc HTML.

The marker is purely informational — its purpose is to set expectations, not to enforce them.

## When to graduate an API out of experimental

Once the API has:

- Settled on a stable shape that hasn't needed change in some time.
- Meaningful test coverage exercising its real use.
- Demonstrated suitability for a broader audience than the original use case.

Remove the `@experimental` TSDoc tag from the type declaration. Remove the `'x-experimental'` field from the registration documentation. Note the promotion in the changelog or release notes so consumers see the API has stabilized.

## See also

- [`@deprecated` convention][deprecated] — sibling marker for APIs being phased out.
- [`createNetworkEventEmitterAsync` migration guide][migration] — for moving existing event emitters to the new async API.

[deprecated]: # 'Existing pattern: /** @deprecated 3 December 2024. Renamed to X. */ — date plus reason.'
[migration]: # 'Replace createNetworkEventEmitter with await createNetworkEventEmitterAsync. Module-level constants become let bindings inside an initialize function with accessor functions that throw if not yet initialized.'
