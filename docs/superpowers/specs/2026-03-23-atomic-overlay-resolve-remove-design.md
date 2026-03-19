# Atomic Overlay Resolve/Remove

**Date:** 2026-03-23
**Status:** Approved

## Summary

Replace the exported `removeOverlay` store function with two atomic alternatives - `resolveAndRemoveOverlay` and `rejectAndRemoveOverlay` - that settle the overlay's promise and remove it from the store in a single call. This eliminates the risk of removing an overlay without settling its promise (which would hang the caller forever).

## Motivation

Currently, every call site that dismisses an overlay must perform two separate operations: call `overlay.resolve(result)` (or `overlay.reject(error)`) and call `removeOverlay(overlay.id)`. This pattern appears ~15 times across the service-host and 4 UI component files, with inconsistent ordering (some resolve-then-remove, some remove-then-resolve). If any code path calls `removeOverlay` without settling the promise, the caller's `await` hangs indefinitely with no error.

## Design

### New Store Functions

Add two new exports to `overlay-store.ts`:

```typescript
/**
 * Resolves an overlay's promise with the given result and removes it from the store. Returns true
 * if the overlay was found and settled, false if not found.
 */
export function resolveAndRemoveOverlay(id: string, result: unknown): boolean;

/**
 * Rejects an overlay's promise with the given error and removes it from the store. Returns true if
 * the overlay was found and settled, false if not found.
 */
export function rejectAndRemoveOverlay(id: string, error: PlatformError): boolean;
```

Both functions:

1. Look up the entry by ID
2. Call `resolve(result)` or `reject(error)` on the entry
3. Delete the entry from the map
4. Notify listeners
5. Return whether the entry existed

The `result` parameter is typed as `unknown` because the store holds a heterogeneous union of overlay types with incompatible resolve signatures. A single type assertion is needed inside `resolveAndRemoveOverlay` to call `entry.resolve` on the union. This is safe because each entry's resolve wrapper (created in the `show*` functions) already handles type conversion internally.

### Removed Export

`removeOverlay` becomes a private function (unexported). It is no longer used directly - all removal goes through the two new functions.

### Call Site Migration

**Service-host (`overlay.service-host.ts`):**

The `dismissAll*` helpers and replace-existing blocks currently do:

```typescript
existing.reject(newOverlayError('Overlay was replaced by a new request', ABORTED));
removeOverlay(existing.id);
```

Becomes:

```typescript
rejectAndRemoveOverlay(
  existing.id,
  newOverlayError('Overlay was replaced by a new request', ABORTED),
);
```

The resolve-based dismissals (auto-dismiss timer, `dismissPopover`, `dismissAll*` with `overlay.resolve(undefined)`) become:

```typescript
resolveAndRemoveOverlay(overlay.id, undefined);
```

**UI components (4 files):**

Each overlay component's `handleSelect` and `handleDismiss` callbacks currently do:

```typescript
removeOverlay(overlay.id);
overlay.resolve(result);
```

Becomes:

```typescript
resolveAndRemoveOverlay(overlay.id, result);
```

Components stop importing `removeOverlay` and stop accessing `overlay.resolve` / `overlay.reject` directly. They import `resolveAndRemoveOverlay` from the store instead.

The `hasResolved` ref guard remains in UI components - it prevents React re-renders from triggering duplicate settlement attempts before the store notifies subscribers of the removal.

### Popover Promise Cleanup

The popover flow has a secondary `popoverPromises` map managed in the service-host. The popover entry's `resolve` and `reject` wrappers (created in `showPopover`) already handle cleaning up `popoverPromises` internally, so no additional changes are needed - `resolveAndRemoveOverlay` calls the wrapper, which handles both the caller's promise and the `popoverPromises` cleanup.

## Scope

- `overlay-store.ts` - add 2 functions, unexport `removeOverlay`
- `overlay.service-host.ts` - update ~10 call sites
- `overlay-context-menu.component.tsx` - update 2 call sites
- `overlay-modal-dialog.component.tsx` - update 2 call sites
- `overlay-popover.component.tsx` - update 1 call site
- `overlay-command-palette.component.tsx` - update 2 call sites
- `overlay-store.test.ts` - update tests for new API
- `overlay.service-host.contribution.test.ts` - update `removeOverlay` mock
- `papi.d.ts` / generated types - regenerate

## Out of Scope

- Eliminating the eslint-disable comments in `showModalDialogOverlay` (those stem from generic type erasure, not from the resolve/remove split)
- Changing the `OverlayEntry` type definition (resolve/reject remain on the entry for now)
- Removing `hasResolved` guards from UI components
