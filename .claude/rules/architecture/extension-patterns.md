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

## Service Lifecycle

- Create service → Register with PAPI → Add to `context.registrations`
- If service has cleanup: `context.registrations.add({ dispose: () => service.cleanup() })`
- Track multiple unsubscribers if needed

## PR Screenshots for UI Changes

A PR that changes an extension's UI should include before/after screenshots (or a short clip) in its description. See [media.md](../docs/media.md) for where to host them (not the code repo).

## What's Enforced by Linting (Don't Duplicate)

- Registration cleanup → ESLint: registration-cleanup
- Method metadata → ESLint: registration-structure
- File naming → ESLint: webview-file-naming, service-file-naming

See [Extension-Development-Guide.md](../../../.context/standards/Extension-Development-Guide.md) for details.
