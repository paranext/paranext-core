# Overlay Type Relocation & PlatformError Error Codes

## Problem

The overlay service types are defined in `src/shared/models/overlay.service-model.ts` and exported through `@papi/core`, but the service implementation runs exclusively in the renderer. This unnecessarily exposes types more broadly than needed. Additionally, the overlay service defines four custom error classes that are value-exported through `papi-core.service.ts`, creating a runtime dependency from `src/shared/` into renderer code that breaks the extension-host bundle if the source file moves.

## Design

### 1. Add `code` field to `PlatformError`

Add an optional `code` field to the existing `PlatformError` type in `platform-bible-utils/src/platform-error.ts`. This provides a machine-readable, iframe-safe error discriminator that replaces `instanceof` checks (which are brittle across iframe boundaries).

```ts
export type PlatformError = {
  cause?: unknown;
  /** Machine-readable error code indicating the class of problem. See {@link PlatformErrorCode}. */
  code?: PlatformErrorCode;
  message: string;
  platformErrorVersion: number;
  stack?: string;
};
```

`PLATFORM_ERROR_VERSION` remains at `1`. The `isPlatformError` check only tests for `platformErrorVersion` existence, and `code` is optional, so no version bump is needed.

**Setting `code`:** Callers create the error with `newPlatformError(message)` and set `code` on the returned object:

```ts
const error = newPlatformError('WebView is not visible');
error.code = FAILED_PRECONDITION;
throw error;
```

The existing `Object.defineProperties` copy in `newPlatformError` already propagates `code` from Error-like inputs that have a `code` property (e.g., Node.js `SystemError`). No additional `newPlatformError` signature changes are needed.

### 2. Define gRPC-based error code constants and union type

Define all 16 gRPC status codes as string constants in `platform-bible-utils/src/platform-error.ts`, along with a `PlatformErrorCode` union type. These are application-level error codes complementary to the existing JSON-RPC transport-level codes (`JSONRPCErrorCode`).

The file should include:

- A file-level comment documenting the origin (gRPC) and a provenance URL to https://grpc.io/docs/guides/status-codes/
- JSDoc on each constant describing its meaning and when to use it
- A union type for compile-time safety

```ts
/** Union of all valid platform error codes. */
export type PlatformErrorCode =
  | typeof CANCELLED
  | typeof UNKNOWN
  | typeof INVALID_ARGUMENT
  | typeof DEADLINE_EXCEEDED
  | typeof NOT_FOUND
  | typeof ALREADY_EXISTS
  | typeof PERMISSION_DENIED
  | typeof RESOURCE_EXHAUSTED
  | typeof FAILED_PRECONDITION
  | typeof ABORTED
  | typeof OUT_OF_RANGE
  | typeof UNIMPLEMENTED
  | typeof INTERNAL
  | typeof UNAVAILABLE
  | typeof DATA_LOSS
  | typeof UNAUTHENTICATED;
```

Constants to define (all 16 gRPC status codes):

| Constant              | Value                   | Overlay usage                     |
| --------------------- | ----------------------- | --------------------------------- |
| `CANCELLED`           | `'CANCELLED'`           | -                                 |
| `UNKNOWN`             | `'UNKNOWN'`             | -                                 |
| `INVALID_ARGUMENT`    | `'INVALID_ARGUMENT'`    | Replaces `OverlayValidationError` |
| `DEADLINE_EXCEEDED`   | `'DEADLINE_EXCEEDED'`   | -                                 |
| `NOT_FOUND`           | `'NOT_FOUND'`           | -                                 |
| `ALREADY_EXISTS`      | `'ALREADY_EXISTS'`      | -                                 |
| `PERMISSION_DENIED`   | `'PERMISSION_DENIED'`   | -                                 |
| `RESOURCE_EXHAUSTED`  | `'RESOURCE_EXHAUSTED'`  | Replaces `OverlayDebouncedError`  |
| `FAILED_PRECONDITION` | `'FAILED_PRECONDITION'` | Replaces `OverlayNotVisibleError` |
| `ABORTED`             | `'ABORTED'`             | Replaces `OverlayReplacedError`   |
| `OUT_OF_RANGE`        | `'OUT_OF_RANGE'`        | -                                 |
| `UNIMPLEMENTED`       | `'UNIMPLEMENTED'`       | -                                 |
| `INTERNAL`            | `'INTERNAL'`            | -                                 |
| `UNAVAILABLE`         | `'UNAVAILABLE'`         | -                                 |
| `DATA_LOSS`           | `'DATA_LOSS'`           | -                                 |
| `UNAUTHENTICATED`     | `'UNAUTHENTICATED'`     | -                                 |

These constants and the `PlatformErrorCode` type are exported from `platform-bible-utils` and do not need re-export through `@papi/core`. All 16 constants plus the union type are exported as named exports following PBU's existing pattern.

### 3. Move overlay types to renderer

Move `src/shared/models/overlay.service-model.ts` to `src/renderer/services/overlays/overlay.service-model.ts`.

This places the type definitions alongside the service implementation, store, validation, coordinates, and menu converter code that all live in `src/renderer/services/overlays/`.

### 4. Delete custom error classes

Remove the four error classes from the overlay model:

- `OverlayNotVisibleError` - replace with `FAILED_PRECONDITION`
- `OverlayReplacedError` - replace with `ABORTED`
- `OverlayValidationError` - replace with `INVALID_ARGUMENT`
- `OverlayDebouncedError` - replace with `RESOURCE_EXHAUSTED`

All throw sites switch to creating a `PlatformError` with the appropriate `code`:

```ts
// Before
throw new OverlayValidationError('Items array must not be empty');

// After
const error = newPlatformError('Items array must not be empty');
error.code = INVALID_ARGUMENT;
throw error;
```

Note: `OverlayDebouncedError` was only used internally in the renderer and was never exported from `papi-core.service.ts`. The other three (`OverlayNotVisibleError`, `OverlayReplacedError`, `OverlayValidationError`) were exported as value exports and are removed.

### 5. Update `OverlayEntry.reject` callback type

The `OverlayEntry` union type's `reject` callbacks are currently typed as `(error: Error) => void`. Since `PlatformError` is a plain object (not an `Error` instance), update these to `(error: PlatformError) => void`.

### 6. Update JSDoc `@throws` tags

The `IOverlayService` interface methods have JSDoc `@throws` tags referencing the old error classes (e.g., `@throws {OverlayValidationError}`). Update these to reference the `PlatformError` type and document which `code` values are thrown:

```ts
/**
 * @throws PlatformError with code {@link INVALID_ARGUMENT} if request validation fails
 * @throws PlatformError with code {@link FAILED_PRECONDITION} if the WebView is not visible
 * @throws PlatformError with code {@link RESOURCE_EXHAUSTED} if called within debounce cooldown
 * @throws PlatformError with code {@link ABORTED} if replaced by a newer overlay of the same type
 */
```

### 7. Update `papi-core.service.ts`

- Change overlay type re-exports from `@shared/models/overlay.service-model` to `@renderer/services/overlays/overlay.service-model`
- All overlay re-exports become `export type` only (no value exports) - safe for extension-host runtime import
- Remove the `export { OverlayNotVisibleError, OverlayReplacedError, OverlayValidationError }` block entirely

### 8. Update renderer imports

All renderer files importing from `@shared/models/overlay.service-model` update to `@renderer/services/overlays/overlay.service-model`:

- `overlay.service-host.ts`
- `overlay.service-host.test.ts`
- `overlay-validation.ts`
- `overlay-validation.test.ts`
- `overlay-store.ts`
- `overlay-store.test.ts`
- `overlay-menu-converter.ts`
- `overlay-host.component.tsx`
- `overlay-context-menu.component.tsx`
- `overlay-modal-dialog.component.tsx`
- `overlay-popover.component.tsx`
- `overlay-command-palette.component.tsx`
- `papi-frontend.service.ts`

Note: `dialog.service-host.ts` does not import from the overlay model directly (it imports `showModalDialogOverlay` from the service host) and requires no changes.

### 9. Update tests

All tests that check for overlay error types switch from `.toThrow(ErrorClass)` to checking `isPlatformError` + `code`:

**Before:**

```ts
await expect(promise).rejects.toThrow(OverlayReplacedError);
```

**After:**

```ts
await expect(promise).rejects.toSatisfy(
  (error: unknown) => isPlatformError(error) && error.code === ABORTED,
);
```

Or with a test helper if the pattern is frequent enough:

```ts
function expectPlatformError(error: unknown, code: PlatformErrorCode): void {
  expect(isPlatformError(error)).toBe(true);
  expect((error as PlatformError).code).toBe(code);
}
```

### 10. Regenerate `papi.d.ts`

Run the type generation to update `lib/papi-dts/papi.d.ts`. The overlay types will still appear in `@papi/core` (via `export type` re-exports), but the internal module declaration path will change from `shared/models/overlay.service-model` to `renderer/services/overlays/overlay.service-model`. The error class declarations will be removed.

Extensions import overlay types from `@papi/core` (e.g., `import type { ContextMenuRequest } from '@papi/core'`), not from internal module paths. The internal path change does not affect extensions.

## Files changed

| File                                                                 | Change                                                                                                                     |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `lib/platform-bible-utils/src/platform-error.ts`                     | Add `code` field, `PlatformErrorCode` union type, 16 gRPC error code constants with JSDoc                                  |
| `lib/platform-bible-utils/src/platform-error.test.ts`                | Tests for `code` propagation                                                                                               |
| `lib/platform-bible-utils/src/index.ts`                              | Export 16 constants and `PlatformErrorCode` type by name                                                                   |
| `src/shared/models/overlay.service-model.ts`                         | Delete                                                                                                                     |
| `src/renderer/services/overlays/overlay.service-model.ts`            | Create (moved from shared; error classes removed; `OverlayEntry.reject` typed to `PlatformError`; JSDoc `@throws` updated) |
| `src/shared/services/papi-core.service.ts`                           | Update import path to `@renderer/...`, change to `export type` only, remove error class value exports                      |
| `src/renderer/services/overlays/overlay.service-host.ts`             | Update import, use `newPlatformError` + codes                                                                              |
| `src/renderer/services/overlays/overlay-validation.ts`               | Update import, use `newPlatformError` + codes                                                                              |
| `src/renderer/services/overlays/overlay-store.ts`                    | Update import                                                                                                              |
| `src/renderer/services/overlays/overlay-menu-converter.ts`           | Update import                                                                                                              |
| `src/renderer/services/overlays/overlay.service-host.test.ts`        | Update import, switch to `isPlatformError` + code checks                                                                   |
| `src/renderer/services/overlays/overlay-validation.test.ts`          | Update import, switch to `isPlatformError` + code checks                                                                   |
| `src/renderer/services/overlays/overlay-store.test.ts`               | Update import                                                                                                              |
| `src/renderer/components/overlay-host.component.tsx`                 | Update import                                                                                                              |
| `src/renderer/components/overlays/overlay-*.component.tsx` (4 files) | Update import                                                                                                              |
| `src/renderer/services/papi-frontend.service.ts`                     | Update import                                                                                                              |
| `lib/papi-dts/papi.d.ts`                                             | Regenerated                                                                                                                |

## What does not change

- `IOverlayService` remains on the `papi` object in `papi-frontend.service.ts`
- Extension WebViews can still call `papi.overlays.*` methods
- Overlay request/response types remain available to extensions via `@papi/core`
- JSON-RPC transport-level error codes (`JSONRPCErrorCode`) are unaffected
- `PLATFORM_ERROR_VERSION` stays at `1`
- `newPlatformError` function signature is unchanged
- `dialog.service-host.ts` is unaffected (imports from service host, not overlay model)
- No behavioral changes to the overlay service itself
