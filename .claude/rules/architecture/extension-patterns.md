---
paths:
  - "extensions/src/**"
---

# Extension Development Decisions

Design decisions when building extensions (not enforceable by linting).

## Type Declaration Pattern (Two-Module)

Every extension needs `src/types/{extension-name}.d.ts`:

```typescript
// 1. Local module types
declare module 'extension-name' {
  export type MyDataTypes = {
    /* ... */
  };
}

// 2. PAPI augmentations (exposes to other extensions)
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'extensionName.commandName': (param: Type) => Promise<Result>;
  }
}
```

## WebView Provider Choice

| Use Class (`WebViewFactory`) | Use Object Literal    |
| ---------------------------- | --------------------- |
| State tracking needed        | Simple stateless views |
| Complex initialization       | Minimal setup         |
| Multiple view types          | Single view type      |

## Command Signature: Conform to Established Siblings

When adding a net-new command that joins a family of existing commands (e.g. another `open*` command alongside sibling inventory/tool openers), match the siblings' signature exactly rather than designing a richer one. The sibling `open*` commands lead with **the triggering web view's id** (`(webViewId: string | undefined) => Promise<string | undefined>`, returning the opened web-view id; see `openPlatformCharactersInventory` and `openFind` in `extensions/src/platform-scripture/src/main.ts`) and resolve everything else internally. A new sibling should do the same. (`openManageBooks` accepts `webViewIdOrProjectId` to serve two dispatch paths; the plain web-view-id shape is the default.)

A command may append **one-shot launch parameters** after that leading argument as further optional scalars — never a structured request object, and never a new sibling command per variant. `openFind`'s `selectedText` and `openManageBooks`' `intent` are the two examples. Carry each as a field on that web view's `*WebViewOptions`, and write it into the web view's `state` in `getWebView` by **unconditional assignment from the current options**: that is what scrubs a stale value off a restored layout, and a conditional spread — which reads as tidier — is what lets one survive. Pass only the caller's *intent*; anything derivable (`projectId`, the current reference, the current book) is resolved from the triggering web view's definition instead. Consumers read the value in ordinary mount-time initializers, because a reload remounts the web view (see "Single-instance web views" in [react-patterns.md](react-patterns.md)).

Derive contextual inputs from state — do not add them as open parameters:

- **`projectId`** — resolve from the triggering editor's web-view definition (`papi.webViews.getOpenWebViewDefinition`), not a passed argument.
- **reference** — read from the editor's scroll-group context inside the web view (e.g. `useWebViewScrollGroupScrRef()`), not plumbed through the open call.
- **mode flags (e.g. SBA)** — derive on the backend from project state, not surfaced as an open param.

A structured request object / discriminated-union result that diverges from the sibling shape is over-engineering unless you can name a behavior the bare signature genuinely can't express. Internal behavior (e.g. dedup — reuse an existing web view instead of opening a duplicate) can still be preserved behind the conforming signature by passing the existing id to the web-view open helper, so conforming the public shape does not force you to drop it.

## Service Lifecycle

- Create service → Register with PAPI → Add to `context.registrations`
- If service has cleanup: `context.registrations.add({ dispose: () => service.cleanup() })`
- Track multiple unsubscribers if needed

## What's Enforced by Linting (Don't Duplicate)

- Registration cleanup → ESLint: registration-cleanup
- Method metadata → ESLint: registration-structure
- File naming → ESLint: webview-file-naming, service-file-naming

See [Extension-Development-Guide.md](../../../.context/standards/Extension-Development-Guide.md) for details.
