# Atomic Overlay Resolve/Remove Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the exported `removeOverlay` with `resolveAndRemoveOverlay` and `rejectAndRemoveOverlay` so overlay promise settlement and store removal are always atomic.

**Architecture:** Two new store functions call `entry.resolve`/`entry.reject` then delete the entry in one operation. All existing call sites (service-host + 4 UI components) migrate from the two-step pattern to single calls. `removeOverlay` becomes unexported.

**Tech Stack:** TypeScript, Vitest

**Spec:** `docs/superpowers/specs/2026-03-23-atomic-overlay-resolve-remove-design.md`

---

### Task 1: Add `resolveAndRemoveOverlay` and `rejectAndRemoveOverlay` to the store

**Files:**

- Modify: `src/renderer/services/overlays/overlay-store.ts:1-78`
- Modify: `src/renderer/services/overlays/overlay-store.test.ts`

- [ ] **Step 1: Write failing tests for `resolveAndRemoveOverlay`**

Add a new `describe` block in `overlay-store.test.ts`. Import `resolveAndRemoveOverlay` (will fail until implemented). Add tests:

```typescript
describe('resolveAndRemoveOverlay', () => {
  it('should call resolve on the entry, remove it, and return true', () => {
    const entry = createContextMenuEntry('overlay-1', 'webview-1');
    addOverlay(entry);
    const result = resolveAndRemoveOverlay('overlay-1', { itemId: 'test' });
    expect(result).toBe(true);
    expect(entry.resolve).toHaveBeenCalledWith({ itemId: 'test' });
    expect(getOverlays()).toHaveLength(0);
  });

  it('should return false and not throw when overlay not found', () => {
    const result = resolveAndRemoveOverlay('non-existent', undefined);
    expect(result).toBe(false);
  });

  it('should notify listeners', () => {
    const entry = createContextMenuEntry('overlay-1', 'webview-1');
    addOverlay(entry);
    const listener = vi.fn();
    subscribe(listener);
    resolveAndRemoveOverlay('overlay-1', undefined);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Write failing tests for `rejectAndRemoveOverlay`**

Add a `describe` block for `rejectAndRemoveOverlay`. Import it alongside the other new function. Add tests:

```typescript
describe('rejectAndRemoveOverlay', () => {
  it('should call reject on the entry, remove it, and return true', () => {
    const entry = createContextMenuEntry('overlay-1', 'webview-1');
    addOverlay(entry);
    const error = newPlatformError('test error');
    const result = rejectAndRemoveOverlay('overlay-1', error);
    expect(result).toBe(true);
    expect(entry.reject).toHaveBeenCalledWith(error);
    expect(getOverlays()).toHaveLength(0);
  });

  it('should return false when overlay not found', () => {
    const error = newPlatformError('test error');
    const result = rejectAndRemoveOverlay('non-existent', error);
    expect(result).toBe(false);
  });
});
```

Import `newPlatformError` from `platform-bible-utils` at the top of the test file. Update the import from `./overlay-store` to include `resolveAndRemoveOverlay` and `rejectAndRemoveOverlay`.

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- src/renderer/services/overlays/overlay-store.test.ts`
Expected: FAIL - `resolveAndRemoveOverlay` and `rejectAndRemoveOverlay` are not exported

- [ ] **Step 4: Implement `resolveAndRemoveOverlay` and `rejectAndRemoveOverlay`**

In `overlay-store.ts`, add after the existing `removeOverlay` function (line 33):

```typescript
/**
 * Resolves an overlay's promise with the given result and removes it from the store. Returns true
 * if the overlay was found and settled, false if not found.
 */
export function resolveAndRemoveOverlay(id: string, result: unknown): boolean {
  const entry = overlays.get(id);
  if (!entry) return false;
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (entry as { resolve: (value: unknown) => void }).resolve(result);
  overlays.delete(id);
  notifyListeners();
  return true;
}

/**
 * Rejects an overlay's promise with the given error and removes it from the store. Returns true if
 * the overlay was found and settled, false if not found.
 */
export function rejectAndRemoveOverlay(id: string, error: PlatformError): boolean {
  const entry = overlays.get(id);
  if (!entry) return false;
  entry.reject(error);
  overlays.delete(id);
  notifyListeners();
  return true;
}
```

Add the `PlatformError` import at the top of `overlay-store.ts`:

```typescript
import type { PlatformError } from 'platform-bible-utils';
```

Note: `resolveAndRemoveOverlay` needs a type assertion because `entry.resolve` is a union of functions with incompatible parameter types. Casting `entry` to `{ resolve: (value: unknown) => void }` is safe because each entry's resolve wrapper already handles its own type conversion.

`rejectAndRemoveOverlay` does NOT need a type assertion because all four overlay types have the same `reject` signature: `(error: PlatformError) => void`.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- src/renderer/services/overlays/overlay-store.test.ts`
Expected: PASS - all tests including new ones

- [ ] **Step 6: Unexport `removeOverlay`**

In `overlay-store.ts`, remove the `export` keyword from `removeOverlay` (line 26). The new functions inline their own delete+notify logic and do not call `removeOverlay`, but it's still used by `clearAllOverlays` internally.

Do NOT run tests yet - downstream files still import it and will fail until migrated.

- [ ] **Step 7: Commit**

```bash
git add src/renderer/services/overlays/overlay-store.ts src/renderer/services/overlays/overlay-store.test.ts
git commit -m "feat: add resolveAndRemoveOverlay and rejectAndRemoveOverlay to overlay store"
```

---

### Task 2: Migrate `overlay.service-host.ts` call sites

**Files:**

- Modify: `src/renderer/services/overlays/overlay.service-host.ts:1-699`

- [ ] **Step 1: Update imports**

In `overlay.service-host.ts`, change the import from `overlay-store` (lines 47-53). Replace `removeOverlay` with `resolveAndRemoveOverlay` and `rejectAndRemoveOverlay`:

```typescript
import {
  addOverlay,
  resolveAndRemoveOverlay,
  rejectAndRemoveOverlay,
  getOverlaysByWebView,
  getOverlayById,
  getOverlays,
  updateOverlayContent,
} from './overlay-store';
```

- [ ] **Step 2: Migrate `dismissAllContextMenus` (lines 204-213)**

Replace:

```typescript
overlay.resolve(undefined);
removeOverlay(overlay.id);
```

With:

```typescript
resolveAndRemoveOverlay(overlay.id, undefined);
```

- [ ] **Step 3: Migrate `dismissAllPopovers` (lines 216-225)**

Same pattern - replace `overlay.resolve(undefined); removeOverlay(overlay.id);` with `resolveAndRemoveOverlay(overlay.id, undefined);`.

- [ ] **Step 4: Migrate `dismissAllCommandPalettes` (lines 228-237)**

Same pattern - replace `overlay.resolve(undefined); removeOverlay(overlay.id);` with `resolveAndRemoveOverlay(overlay.id, undefined);`.

- [ ] **Step 5: Migrate `showContextMenu` replace-existing block (lines 268-273)**

Replace:

```typescript
existing.reject(newOverlayError('Overlay was replaced by a new request', ABORTED));
removeOverlay(existing.id);
restoreFocus(existing.id);
```

With:

```typescript
rejectAndRemoveOverlay(
  existing.id,
  newOverlayError('Overlay was replaced by a new request', ABORTED),
);
restoreFocus(existing.id);
```

- [ ] **Step 6: Migrate `showModalDialogOverlay` replace-existing block (lines 325-330)**

Same pattern as step 5.

- [ ] **Step 7: Migrate `showPopover` replace-existing block (lines 421-432)**

Replace:

```typescript
existing.reject(newOverlayError('Overlay was replaced by a new request', ABORTED));
removeOverlay(existing.id);
restoreFocus(existing.id);
// Also reject the onPopoverDismissed promise
const pending = popoverPromises.get(existing.id);
if (pending) {
  pending.reject(newOverlayError('Overlay was replaced by a new request', ABORTED));
  popoverPromises.delete(existing.id);
}
```

With:

```typescript
rejectAndRemoveOverlay(
  existing.id,
  newOverlayError('Overlay was replaced by a new request', ABORTED),
);
restoreFocus(existing.id);
```

The popover entry's `reject` wrapper (created at line 472-478) already handles `popoverPromises` cleanup, so the explicit `popoverPromises` code is removed.

- [ ] **Step 8: Migrate popover auto-dismiss timer (lines 488-494)**

Replace:

```typescript
overlay.resolve(undefined);
removeOverlay(overlayId);
```

With:

```typescript
resolveAndRemoveOverlay(overlayId, undefined);
```

Remove the `overlay` lookup (`getOverlayById`) and the `if` guard - `resolveAndRemoveOverlay` returns false if not found, which is equivalent. The updated code inside the `setTimeout` callback:

```typescript
const timer = setTimeout(() => {
  popoverTimers.delete(overlayId);
  resolveAndRemoveOverlay(overlayId, undefined);
}, request.dismissAfterMs);
```

- [ ] **Step 9: Migrate `dismissPopover` (lines 521-527)**

Replace:

```typescript
const overlay = getOverlayById(overlayId);
if (overlay && overlay.type === 'popover') {
  overlay.resolve(undefined);
  removeOverlay(overlayId);
}
```

With:

```typescript
resolveAndRemoveOverlay(overlayId, undefined);
```

Note: the type check (`overlay.type === 'popover'`) was a safety guard, but `dismissPopover` is only called with popover IDs. The resolve wrapper handles the correct behavior regardless of type.

- [ ] **Step 10: Migrate blur handler (lines 660-666)**

Replace:

```typescript
overlay.resolve(undefined);
removeOverlay(overlay.id);
```

With:

```typescript
resolveAndRemoveOverlay(overlay.id, undefined);
```

- [ ] **Step 11: Migrate `showCommandPalette` replace-existing block (lines 573-580)**

Same pattern as step 5 - replace `existing.reject(...)` + `removeOverlay(...)` with `rejectAndRemoveOverlay(...)`.

- [ ] **Step 12: Commit**

```bash
git add src/renderer/services/overlays/overlay.service-host.ts
git commit -m "refactor: migrate overlay service-host to resolveAndRemoveOverlay/rejectAndRemoveOverlay"
```

---

### Task 3: Migrate UI component call sites

**Files:**

- Modify: `src/renderer/components/overlays/overlay-context-menu.component.tsx`
- Modify: `src/renderer/components/overlays/overlay-modal-dialog.component.tsx`
- Modify: `src/renderer/components/overlays/overlay-popover.component.tsx`
- Modify: `src/renderer/components/overlays/overlay-command-palette.component.tsx`

All four components follow the same pattern. For each file:

1. Change the import from `import { removeOverlay } from '@renderer/services/overlays/overlay-store'` to `import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store'`
2. In `handleSelect`/`handleConfirm` callback: replace `removeOverlay(overlay.id); overlay.resolve(result);` with `resolveAndRemoveOverlay(overlay.id, result);`
3. In `handleDismiss` callback: replace `removeOverlay(overlay.id); overlay.resolve(undefined);` with `resolveAndRemoveOverlay(overlay.id, undefined);`

- [ ] **Step 1: Migrate `overlay-context-menu.component.tsx`**

Import change at line 12. Two call sites at lines 418-419 and 427-428.

- [ ] **Step 2: Migrate `overlay-modal-dialog.component.tsx`**

Import change at line 13. Two call sites at lines 371-372 and 380-382.

- [ ] **Step 3: Migrate `overlay-popover.component.tsx`**

Import change at line 12. One call site at lines 358-359.

- [ ] **Step 4: Migrate `overlay-command-palette.component.tsx`**

Import change at line 13. Two call sites at lines 395-396 and 404-405.

- [ ] **Step 5: Commit**

```bash
git add src/renderer/components/overlays/
git commit -m "refactor: migrate overlay UI components to resolveAndRemoveOverlay"
```

---

### Task 4: Update tests and regenerate types

**Files:**

- Modify: `src/renderer/services/overlays/overlay-store.test.ts`
- Modify: `src/renderer/services/overlays/overlay.service-host.contribution.test.ts`

- [ ] **Step 1: Update `overlay-store.test.ts` - migrate existing `removeOverlay` tests**

The existing `describe('removeOverlay', ...)` block (lines 51-64) tests the old export. Since `removeOverlay` is now unexported, these tests should be removed. The behavior they tested (remove + return entry) is covered by the new `resolveAndRemoveOverlay` and `rejectAndRemoveOverlay` tests from Task 1.

Also update the `subscribe` test at line 111 that uses `removeOverlay` - change it to use `resolveAndRemoveOverlay`:

```typescript
it('should notify listeners when overlays are resolved and removed', () => {
  const entry = createContextMenuEntry('overlay-1', 'webview-1');
  addOverlay(entry);
  const listener = vi.fn();
  subscribe(listener);
  resolveAndRemoveOverlay('overlay-1', undefined);
  expect(listener).toHaveBeenCalledTimes(1);
});
```

Remove `removeOverlay` from the import statement.

- [ ] **Step 2: Update `overlay.service-host.contribution.test.ts` mock**

At line 28, replace `removeOverlay: vi.fn()` with the new functions:

```typescript
resolveAndRemoveOverlay: vi.fn(() => true),
rejectAndRemoveOverlay: vi.fn(() => true),
```

Remove the `removeOverlay: vi.fn()` line.

- [ ] **Step 3: Run all overlay tests**

Run: `npm test -- src/renderer/services/overlays/`
Expected: PASS - all tests pass

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`
Expected: PASS - may flag `papi.d.ts` as stale if it references the old `removeOverlay` export

- [ ] **Step 5: Regenerate `papi.d.ts`**

Run: `npm run build`

This regenerates `lib/papi-dts/papi.d.ts`. The old `removeOverlay` export will be replaced by the two new functions.

- [ ] **Step 6: Run full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/renderer/services/overlays/overlay-store.test.ts \
  src/renderer/services/overlays/overlay.service-host.contribution.test.ts \
  lib/papi-dts/papi.d.ts
git commit -m "test: update overlay tests for atomic resolve/remove API"
```
