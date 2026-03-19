# Overlay Type Relocation & PlatformError Error Codes - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move overlay types from `src/shared/` to `src/renderer/`, replace custom error classes with `PlatformError` + gRPC-based error codes, and add a `code` field to `PlatformError` in `platform-bible-utils`.

**Architecture:** `PlatformError` gains an optional `code` field typed as a union of 16 gRPC-derived string constants. The overlay model file moves from shared to renderer; its four error classes are deleted and replaced with `newPlatformError()` + code. `papi-core.service.ts` keeps type-only re-exports pointing at the new renderer path.

**Tech Stack:** TypeScript, Vitest, platform-bible-utils

---

### Task 1: Add error code constants and `code` field to PlatformError

**Files:**

- Modify: `lib/platform-bible-utils/src/platform-error.ts`
- Modify: `lib/platform-bible-utils/src/index.ts`

- [ ] **Step 1: Add the 16 gRPC error code constants and union type to `platform-error.ts`**

Add a provenance comment block and the constants before the `PlatformError` type. Add the `PlatformErrorCode` union type after the constants. Each constant gets a JSDoc describing meaning.

```ts
// Add after the `isString` import, before PLATFORM_ERROR_VERSION:

/**
 * Standard platform error codes based on gRPC status codes. These provide machine-readable,
 * cross-process error classification that survives iframe serialization boundaries.
 *
 * @see https://grpc.io/docs/guides/status-codes/ for the original gRPC specification
 */

/** The operation was cancelled, typically by the caller. */
export const CANCELLED = 'CANCELLED';
/**
 * Unknown error. This may be returned when a received error code is not recognized or is not
 * applicable in the current context.
 */
export const UNKNOWN = 'UNKNOWN';
/**
 * The client specified an invalid argument. Indicates arguments that are problematic regardless of
 * the state of the system (e.g., a malformed request, empty required field, invalid enum value).
 */
export const INVALID_ARGUMENT = 'INVALID_ARGUMENT';
/** The deadline expired before the operation could complete. */
export const DEADLINE_EXCEEDED = 'DEADLINE_EXCEEDED';
/** The requested entity (e.g., file, resource, overlay) was not found. */
export const NOT_FOUND = 'NOT_FOUND';
/** The entity that a client attempted to create already exists. */
export const ALREADY_EXISTS = 'ALREADY_EXISTS';
/**
 * The caller does not have permission to execute the specified operation. Must not be used for
 * authentication failures (use {@link UNAUTHENTICATED} instead).
 */
export const PERMISSION_DENIED = 'PERMISSION_DENIED';
/**
 * Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is
 * out of space. Also used when a rate limit or throttle rejects a request.
 */
export const RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED';
/**
 * The operation was rejected because the system is not in a state required for the operation's
 * execution. For example, a WebView must be visible to show an overlay. Unlike
 * {@link INVALID_ARGUMENT}, this error indicates a problem with the system state, not the request.
 */
export const FAILED_PRECONDITION = 'FAILED_PRECONDITION';
/**
 * The operation was aborted, typically due to a concurrency issue such as a newer request replacing
 * an in-flight one, or a transaction abort.
 */
export const ABORTED = 'ABORTED';
/**
 * The operation was attempted past the valid range. Unlike {@link INVALID_ARGUMENT}, this error
 * indicates a problem that may be fixed if the system state changes.
 */
export const OUT_OF_RANGE = 'OUT_OF_RANGE';
/** The operation is not implemented or is not supported/enabled in this service. */
export const UNIMPLEMENTED = 'UNIMPLEMENTED';
/**
 * Internal error. This means that some invariants expected by the underlying system have been
 * broken. This is a serious error; it means the system is in an unexpected state.
 */
export const INTERNAL = 'INTERNAL';
/**
 * The service is currently unavailable. This is most likely a transient condition, which can be
 * corrected by retrying with a backoff.
 */
export const UNAVAILABLE = 'UNAVAILABLE';
/** Unrecoverable data loss or corruption. */
export const DATA_LOSS = 'DATA_LOSS';
/**
 * The request does not have valid authentication credentials for the operation. Use
 * {@link PERMISSION_DENIED} for authorization failures where the caller is authenticated but not
 * permitted.
 */
export const UNAUTHENTICATED = 'UNAUTHENTICATED';

/**
 * Union of all valid platform error codes. Based on gRPC status codes.
 *
 * @see https://grpc.io/docs/guides/status-codes/
 */
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

- [ ] **Step 2: Add `code` field to `PlatformError` type**

In the same file, add the `code` field to the `PlatformError` type between `cause` and `message`:

```ts
  /**
   * Machine-readable error code indicating the class of problem. See {@link PlatformErrorCode}.
   */
  code?: PlatformErrorCode;
```

- [ ] **Step 3: Export new symbols from `index.ts`**

Add to the `// Consts` section of `lib/platform-bible-utils/src/index.ts`:

```ts
export {
  CANCELLED,
  UNKNOWN,
  INVALID_ARGUMENT,
  DEADLINE_EXCEEDED,
  NOT_FOUND,
  ALREADY_EXISTS,
  PERMISSION_DENIED,
  RESOURCE_EXHAUSTED,
  FAILED_PRECONDITION,
  ABORTED,
  OUT_OF_RANGE,
  UNIMPLEMENTED,
  INTERNAL,
  UNAVAILABLE,
  DATA_LOSS,
  UNAUTHENTICATED,
} from './platform-error';
```

Add to the `// Types` section:

```ts
export type { PlatformErrorCode } from './platform-error';
```

- [ ] **Step 4: Run existing PBU tests to verify nothing breaks**

Run: `npm test -- lib/platform-bible-utils/src/platform-error.test.ts`
Expected: All existing tests PASS (the `code` field is optional, no signature changes)

### Task 2: Add tests for `code` field on PlatformError

**Files:**

- Modify: `lib/platform-bible-utils/src/platform-error.test.ts`

- [ ] **Step 1: Add tests for `code` field behavior**

Add a new `describe` block at the end of the test file:

```ts
describe('PlatformError code field', () => {
  it('should allow setting code on a PlatformError created from a string', () => {
    const error = newPlatformError('test error');
    error.code = INVALID_ARGUMENT;
    expect(error.code).toBe('INVALID_ARGUMENT');
    expect(isPlatformError(error)).toBe(true);
  });

  it('should propagate code from Error-like objects that have a code property', () => {
    const errorObj = { message: 'validation failed', code: FAILED_PRECONDITION };
    const error = newPlatformError(errorObj);
    expect(error.code).toBe('FAILED_PRECONDITION');
    expect(isPlatformError(error)).toBe(true);
  });

  it('should include code in JSON.stringify output when set', () => {
    const error = newPlatformError('test');
    error.code = ABORTED;
    const json = JSON.stringify(error);
    expect(json).toContain('"code":"ABORTED"');
  });

  it('should not include code in JSON.stringify when not set', () => {
    const error = newPlatformError('test');
    const json = JSON.stringify(error);
    expect(json).not.toContain('"code"');
  });
});
```

Update the import at the top of the test file to include the new constants:

```ts
import {
  newPlatformError,
  isPlatformError,
  PLATFORM_ERROR_VERSION,
  INVALID_ARGUMENT,
  FAILED_PRECONDITION,
  ABORTED,
} from './platform-error';
```

- [ ] **Step 2: Run tests**

Run: `npm test -- lib/platform-bible-utils/src/platform-error.test.ts`
Expected: All tests PASS including the new `code` field tests

- [ ] **Step 3: Commit PBU changes**

```bash
git add lib/platform-bible-utils/src/platform-error.ts lib/platform-bible-utils/src/platform-error.test.ts lib/platform-bible-utils/src/index.ts
git commit -m "feat(platform-bible-utils): add PlatformErrorCode constants and code field to PlatformError

Add 16 gRPC-based error code constants (CANCELLED, INVALID_ARGUMENT, etc.)
with JSDoc descriptions and a PlatformErrorCode union type. Add optional
code field to PlatformError for machine-readable, iframe-safe error
classification."
```

### Task 3: Move overlay model file and remove error classes

**Files:**

- Delete: `src/shared/models/overlay.service-model.ts`
- Create: `src/renderer/services/overlays/overlay.service-model.ts`

- [ ] **Step 1: Copy the overlay model to its new location**

Copy `src/shared/models/overlay.service-model.ts` to `src/renderer/services/overlays/overlay.service-model.ts`.

- [ ] **Step 2: Remove the four error classes from the new file**

Delete the entire error classes section (the `eslint-disable` comment on line 1, and lines 12-60 covering `OverlayNotVisibleError`, `OverlayValidationError`, `OverlayReplacedError`, and `OverlayDebouncedError`). The file-level JSDoc and `import { LocalizeKey }` remain.

- [ ] **Step 3: Update `OverlayEntry.reject` callback types**

In the new file, change all four `reject: (error: Error) => void` occurrences in the `OverlayEntry` union to `reject: (error: PlatformError) => void`. Add the import:

```ts
import { LocalizeKey, PlatformError } from 'platform-bible-utils';
```

(Merge with the existing `LocalizeKey` import.)

- [ ] **Step 4: Update JSDoc `@throws` tags on `IOverlayService`**

Replace all `@throws {OverlayValidationError}`, `@throws {OverlayReplacedError}`, `@throws {OverlayDebouncedError}`, and `@throws {OverlayNotVisibleError}` with the new pattern. Also update the class-level JSDoc that references `OverlayReplacedError`. For example:

```ts
// On IOverlayService class-level JSDoc, replace:
//   "rejects its promise with {@link OverlayReplacedError}"
// with:
//   "rejects its promise with a PlatformError with code {@link ABORTED}"

// On showContextMenu:
 * @throws PlatformError with code {@link INVALID_ARGUMENT} if the request has no items
 * @throws PlatformError with code {@link ABORTED} if replaced by another context menu from the same WebView

// On showPopover:
 * @throws PlatformError with code {@link RESOURCE_EXHAUSTED} if a duplicate request arrives within the debounce cooldown
 * @throws PlatformError with code {@link INVALID_ARGUMENT} if the request is invalid
 * @throws PlatformError with code {@link ABORTED} if replaced by another popover from the same WebView

// On onPopoverDismissed:
 * @throws PlatformError with code {@link ABORTED} if the popover was replaced by a new one from the same WebView

// On showCommandPalette:
 * @throws PlatformError with code {@link INVALID_ARGUMENT} if the request is invalid
 * @throws PlatformError with code {@link ABORTED} if replaced by another command palette from the same WebView
```

Add `ABORTED` and `INVALID_ARGUMENT` imports if referenced with `{@link}`:

```ts
import {
  LocalizeKey,
  PlatformError,
  ABORTED,
  INVALID_ARGUMENT,
  RESOURCE_EXHAUSTED,
} from 'platform-bible-utils';
```

Note: `{@link}` references in JSDoc require the symbols to be in scope. If preferred, use plain text descriptions instead to avoid extra imports purely for documentation.

- [ ] **Step 5: Update `OverlayEntry.reject` JSDoc comments**

Replace the four `/** Rejects the caller's promise (e.g., with {@link OverlayReplacedError}) */` comments with:

```ts
/** Rejects the caller's promise (e.g., with a PlatformError with code ABORTED) */
```

- [ ] **Step 6: Delete the old file**

```bash
git rm src/shared/models/overlay.service-model.ts
```

### Task 4: Update `papi-core.service.ts`

**Files:**

- Modify: `src/shared/services/papi-core.service.ts`

- [ ] **Step 1: Update overlay imports**

Replace lines 93-112:

```ts
export type {
  CommandPaletteItem,
  CommandPaletteRequest,
  ContextMenuItem,
  ContextMenuRequest,
  ContextMenuResult,
  IOverlayService,
  ModalDialogOptions,
  ModalDialogResponse,
  ModalDialogType,
  PopoverAction,
  PopoverContent,
  PopoverRequest,
  RichTextRun,
} from '@shared/models/overlay.service-model';
export {
  OverlayNotVisibleError,
  OverlayReplacedError,
  OverlayValidationError,
} from '@shared/models/overlay.service-model';
```

With:

```ts
export type {
  CommandPaletteItem,
  CommandPaletteRequest,
  ContextMenuItem,
  ContextMenuRequest,
  ContextMenuResult,
  IOverlayService,
  ModalDialogOptions,
  ModalDialogResponse,
  ModalDialogType,
  PopoverAction,
  PopoverContent,
  PopoverRequest,
  RichTextRun,
} from '@renderer/services/overlays/overlay.service-model';
```

### Task 5: Update renderer imports and throw sites

**Files:**

- Modify: `src/renderer/services/overlays/overlay.service-host.ts`
- Modify: `src/renderer/services/overlays/overlay-validation.ts`
- Modify: `src/renderer/services/overlays/overlay-store.ts`
- Modify: `src/renderer/services/overlays/overlay-menu-converter.ts`
- Modify: `src/renderer/services/papi-frontend.service.ts`
- Modify: `src/renderer/components/overlay-host.component.tsx`
- Modify: `src/renderer/components/overlays/overlay-context-menu.component.tsx`
- Modify: `src/renderer/components/overlays/overlay-command-palette.component.tsx`
- Modify: `src/renderer/components/overlays/overlay-modal-dialog.component.tsx`
- Modify: `src/renderer/components/overlays/overlay-popover.component.tsx`

- [ ] **Step 1: Update `overlay.service-host.ts` imports and throw sites**

Replace the import block (lines 14-27):

```ts
import {
  CommandPaletteRequest,
  ContextMenuRequest,
  ContextMenuResult,
  IOverlayService,
  ModalDialogOptions,
  ModalDialogResponse,
  ModalDialogType,
  OverlayDebouncedError,
  OverlayNotVisibleError,
  OverlayReplacedError,
  PopoverContent,
  PopoverRequest,
} from '@shared/models/overlay.service-model';
```

With:

```ts
import {
  CommandPaletteRequest,
  ContextMenuRequest,
  ContextMenuResult,
  IOverlayService,
  ModalDialogOptions,
  ModalDialogResponse,
  ModalDialogType,
  PopoverContent,
  PopoverRequest,
} from './overlay.service-model';
```

Update the `platform-bible-utils` import (line 32) to add `newPlatformError`, error codes, and types:

```ts
import {
  isPlatformError,
  newGuid,
  newPlatformError,
  ReferencedItem,
  ABORTED,
  FAILED_PRECONDITION,
  RESOURCE_EXHAUSTED,
} from 'platform-bible-utils';
import type { PlatformError, PlatformErrorCode } from 'platform-bible-utils';
```

Update three `(error: Error) => void` locations to `(error: PlatformError) => void`:

- The `popoverPromises` map type (around line 186): `reject: (error: Error) => void`
- The `rejectDismissed` variable declaration (around line 429): `let rejectDismissed!: (error: Error) => void`
- The `showPopover` inner reject callback (around line 456): `reject: (error: Error) =>`

Replace all throw sites and reject calls. There are 4 patterns:

**`throw new OverlayNotVisibleError()`** (3 occurrences - lines 245, 396, 547):

```ts
const notVisibleError = newPlatformError('Requesting WebView is not visible');
notVisibleError.code = FAILED_PRECONDITION;
throw notVisibleError;
```

**`throw new OverlayDebouncedError()`** (4 occurrences - lines 250, 306, 401, 552):

```ts
const debouncedError = newPlatformError('Overlay request dropped by debounce cooldown');
debouncedError.code = RESOURCE_EXHAUSTED;
throw debouncedError;
```

**`existing.reject(new OverlayReplacedError())`** (5 occurrences - lines 256, 312, 407, 413, 560):

```ts
const replacedError = newPlatformError('Overlay was replaced by a new request');
replacedError.code = ABORTED;
existing.reject(replacedError);
```

**`pending.reject(new OverlayReplacedError())`** (1 occurrence - line 413):

```ts
const replacedError = newPlatformError('Overlay was replaced by a new request');
replacedError.code = ABORTED;
pending.reject(replacedError);
```

Consider extracting a helper at the top of the file to reduce repetition:

```ts
function newOverlayError(message: string, code: PlatformErrorCode): PlatformError {
  const error = newPlatformError(message);
  error.code = code;
  return error;
}
```

Then all sites become one-liners like `throw newOverlayError('Requesting WebView is not visible', FAILED_PRECONDITION)`.

- [ ] **Step 2: Update `overlay-validation.ts` imports and throw sites**

Replace the import (lines 6-14):

```ts
import {
  CommandPaletteRequest,
  ContextMenuRequest,
  ContextMenuItem,
  ModalDialogOptions,
  ModalDialogType,
  OverlayValidationError,
  PopoverRequest,
} from '@shared/models/overlay.service-model';
```

With:

```ts
import {
  CommandPaletteRequest,
  ContextMenuRequest,
  ContextMenuItem,
  ModalDialogOptions,
  ModalDialogType,
  PopoverRequest,
} from './overlay.service-model';
import { newPlatformError, INVALID_ARGUMENT } from 'platform-bible-utils';
```

Add a helper at the top:

```ts
function throwValidationError(message: string): never {
  const error = newPlatformError(message);
  error.code = INVALID_ARGUMENT;
  throw error;
}
```

Replace all `throw new OverlayValidationError(message)` calls (18 occurrences) with `throwValidationError(message)`. The function signatures and JSDoc `@throws` comments in this file should also be updated to reference `PlatformError` with code `INVALID_ARGUMENT`.

- [ ] **Step 3: Update `overlay-store.ts` import**

Replace line 6:

```ts
import { OverlayEntry, PopoverContent } from '@shared/models/overlay.service-model';
```

With:

```ts
import { OverlayEntry, PopoverContent } from './overlay.service-model';
```

- [ ] **Step 4: Update `overlay-menu-converter.ts` import**

Replace line 6:

```ts
import type { ContextMenuItem } from '@shared/models/overlay.service-model';
```

With:

```ts
import type { ContextMenuItem } from './overlay.service-model';
```

- [ ] **Step 5: Update `papi-frontend.service.ts` import**

Replace line 36:

```ts
import { IOverlayService } from '@shared/models/overlay.service-model';
```

With:

```ts
import { IOverlayService } from '@renderer/services/overlays/overlay.service-model';
```

- [ ] **Step 6: Update component imports**

**`overlay-host.component.tsx`** - Replace:

```ts
import { OverlayEntry } from '@shared/models/overlay.service-model';
```

With:

```ts
import { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
```

**`overlay-context-menu.component.tsx`** - Replace:

```ts
import { ContextMenuItem, OverlayEntry } from '@shared/models/overlay.service-model';
```

With:

```ts
import { ContextMenuItem, OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
```

**`overlay-command-palette.component.tsx`** - Replace:

```ts
import { CommandPaletteItem, OverlayEntry } from '@shared/models/overlay.service-model';
```

With:

```ts
import {
  CommandPaletteItem,
  OverlayEntry,
} from '@renderer/services/overlays/overlay.service-model';
```

**`overlay-modal-dialog.component.tsx`** - Replace the import from `@shared/models/overlay.service-model` with the same path from `@renderer/services/overlays/overlay.service-model`.

**`overlay-popover.component.tsx`** - Replace the import from `@shared/models/overlay.service-model` with the same path from `@renderer/services/overlays/overlay.service-model`.

### Task 6: Update tests to use `isPlatformError` + code checks

**Files:**

- Modify: `src/renderer/services/overlays/overlay.service-host.test.ts`
- Modify: `src/renderer/services/overlays/overlay-validation.test.ts`
- Modify: `src/renderer/services/overlays/overlay-store.test.ts`

- [ ] **Step 1: Update `overlay.service-host.test.ts` imports and assertions**

Replace the import (lines 2-9):

```ts
import {
  CommandPaletteRequest,
  ModalDialogOptions,
  OverlayDebouncedError,
  OverlayReplacedError,
  PopoverContent,
  PopoverRequest,
} from '@shared/models/overlay.service-model';
```

With:

```ts
import {
  CommandPaletteRequest,
  ModalDialogOptions,
  PopoverContent,
  PopoverRequest,
} from './overlay.service-model';
import { isPlatformError, ABORTED, RESOURCE_EXHAUSTED } from 'platform-bible-utils';
```

Replace all `.rejects.toThrow(OverlayReplacedError)` with:

```ts
.rejects.toSatisfy(
  (error: unknown) => isPlatformError(error) && error.code === ABORTED,
)
```

Replace all `.rejects.toThrow(OverlayDebouncedError)` with:

```ts
.rejects.toSatisfy(
  (error: unknown) => isPlatformError(error) && error.code === RESOURCE_EXHAUSTED,
)
```

Update test description strings that reference old error class names:

- `'should throw OverlayDebouncedError within debounce cooldown'` -> `'should reject with RESOURCE_EXHAUSTED within debounce cooldown'`
- `'should throw OverlayDebouncedError when debounce cooldown is active'` -> `'should reject with RESOURCE_EXHAUSTED when debounce cooldown is active'`
- Comments referencing `OverlayReplacedError` should say `ABORTED`

- [ ] **Step 2: Update `overlay-validation.test.ts` imports and assertions**

Replace the import (lines 1-8):

```ts
import {
  CommandPaletteRequest,
  ContextMenuRequest,
  ContextMenuItem,
  OverlayValidationError,
  PopoverRequest,
} from '@shared/models/overlay.service-model';
```

With:

```ts
import {
  CommandPaletteRequest,
  ContextMenuRequest,
  ContextMenuItem,
  PopoverRequest,
} from './overlay.service-model';
import { isPlatformError, INVALID_ARGUMENT } from 'platform-bible-utils';
```

Replace all `.toThrow(OverlayValidationError)` occurrences (about 30) with:

```ts
.toThrow() // still verify it throws
```

And for assertions that also check the message (pairs of expects), keep the message check but replace the class check. For example:

```ts
// Before:
expect(() => validateContextMenuRequest(request)).toThrow(OverlayValidationError);
expect(() => validateContextMenuRequest(request)).toThrow('Items array must not be empty');

// After:
expect(() => validateContextMenuRequest(request)).toThrow('Items array must not be empty');
try {
  validateContextMenuRequest(request);
  expect.unreachable('Should have thrown');
} catch (error) {
  expect(isPlatformError(error)).toBe(true);
  if (isPlatformError(error)) expect(error.code).toBe(INVALID_ARGUMENT);
}
```

Alternatively, write a test utility at the top of the file:

```ts
function expectValidationError(fn: () => void, expectedMessage?: string): void {
  try {
    fn();
    expect.unreachable('Expected a PlatformError to be thrown');
  } catch (error) {
    expect(isPlatformError(error)).toBe(true);
    if (isPlatformError(error)) {
      expect(error.code).toBe(INVALID_ARGUMENT);
      if (expectedMessage) expect(error.message).toBe(expectedMessage);
    }
  }
}
```

Then each test becomes:

```ts
it('should throw for empty items array', () => {
  const request: ContextMenuRequest = { items: [] };
  expectValidationError(() => validateContextMenuRequest(request), 'Items array must not be empty');
});
```

Update test description strings that reference `OverlayValidationError`:

- `'should throw OverlayValidationError for...'` -> `'should throw INVALID_ARGUMENT for...'`

- [ ] **Step 3: Update `overlay-store.test.ts` import**

If this file imports from `@shared/models/overlay.service-model`, update to `./overlay.service-model`.

- [ ] **Step 4: Run all overlay tests**

Run: `npm test -- src/renderer/services/overlays/`
Expected: All tests PASS

- [ ] **Step 5: Commit overlay changes**

```bash
git add src/shared/models/overlay.service-model.ts src/renderer/services/overlays/ src/shared/services/papi-core.service.ts src/renderer/services/papi-frontend.service.ts src/renderer/components/overlay-host.component.tsx src/renderer/components/overlays/
git commit -m "refactor: move overlay types to renderer, replace error classes with PlatformError codes

Move overlay.service-model.ts from src/shared/models/ to
src/renderer/services/overlays/. Delete OverlayNotVisibleError,
OverlayReplacedError, OverlayValidationError, and OverlayDebouncedError
classes. Replace with newPlatformError() using FAILED_PRECONDITION,
ABORTED, INVALID_ARGUMENT, and RESOURCE_EXHAUSTED codes respectively.
Update papi-core.service.ts to type-only re-exports from renderer path."
```

### Task 7: Regenerate `papi.d.ts` and verify

**Files:**

- Modify: `lib/papi-dts/papi.d.ts` (auto-generated)

- [ ] **Step 1: Build the project to regenerate types**

Run: `npm run build`
Expected: Build succeeds. `lib/papi-dts/papi.d.ts` is regenerated with:

- Module declaration path changed to `renderer/services/overlays/overlay.service-model`
- Error classes removed from `@papi/core` module declaration
- Overlay types still present in `@papi/core` as `export type`

- [ ] **Step 2: Verify papi.d.ts changes**

Check that:

1. `declare module 'renderer/services/overlays/overlay.service-model'` exists (was `shared/models/overlay.service-model`)
2. `OverlayNotVisibleError`, `OverlayReplacedError`, `OverlayValidationError` are gone from `@papi/core`
3. All overlay types (`ContextMenuItem`, `IOverlayService`, etc.) still exported from `@papi/core`

- [ ] **Step 3: Run full test suite**

Run: `npm test`
Expected: All tests PASS

- [ ] **Step 4: Run linting and type checking**

Run: `npm run lint && npm run typecheck`
Expected: No errors

- [ ] **Step 5: Commit generated types**

```bash
git add lib/papi-dts/papi.d.ts
git commit -m "chore: regenerate papi.d.ts after overlay type relocation"
```
