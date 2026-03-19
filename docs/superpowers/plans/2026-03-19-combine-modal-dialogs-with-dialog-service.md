# Combine Modal Dialogs with Dialog Service — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move alert/confirm modal dialogs from the overlay service's PAPI interface into the dialog service, making `papi.dialogs` the single entry point for all dialogs.

**Architecture:** The dialog service host (renderer process) gains a routing branch that detects `platform.alert` and `platform.confirm` dialog types and delegates to the overlay service's internal modal rendering instead of creating rc-dock tabs. The overlay service retains its modal rendering infrastructure internally but removes `showModalDialog` from its public `IOverlayService` interface.

**Tech Stack:** TypeScript, React

**Spec:** `docs/superpowers/specs/2026-03-19-combine-modal-dialogs-with-dialog-service-design.md`

---

## File Map

| File                                                                | Action     | Responsibility                                                                                   |
| ------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `src/renderer/components/dialogs/dialog-definition.model.ts`        | Modify     | Add alert/confirm type constants, option types, `TabDialogTypes`, `DialogTypes` entries          |
| `src/renderer/components/dialogs/index.ts`                          | Modify     | Change `DIALOGS` mapped type to use `TabDialogTypes`                                             |
| `src/shared/models/overlay.service-model.ts`                        | Modify     | Remove `showModalDialog` from `IOverlayService`                                                  |
| `src/renderer/services/overlay.service-host.ts`                     | Modify     | Extract `showModalDialogOverlay`, remove `showModalDialog` from exported service object          |
| `src/renderer/services/overlay.service-host.test.ts`                | Modify     | Update tests: remove `showModalDialog` tests from public API, add `showModalDialogOverlay` tests |
| `src/renderer/services/dialog.service-host.ts`                      | Modify     | Add routing branch + `localizeIfNeeded` helper                                                   |
| `src/renderer/services/dialog.service-host.test.ts`                 | Create     | Tests for alert/confirm routing through dialog service                                           |
| `extensions/src/hello-rock3/src/web-views/hello-rock3.web-view.tsx` | Modify     | Migrate `papi.overlays.showModalDialog` → `papi.dialogs.showDialog`                              |
| `lib/papi-dts/papi.d.ts`                                            | Regenerate | Reflects type changes (done via `npm run build` or type generation)                              |

---

## Task 1: Add Alert/Confirm Types and Update DIALOGS Registry

These two changes must be atomic — adding new keys to `DialogTypes` without simultaneously updating the `DIALOGS` mapped type will cause a compilation error (the `DIALOGS` object requires an entry for every key in `DialogTabTypes`).

**Files:**

- Modify: `src/renderer/components/dialogs/dialog-definition.model.ts`
- Modify: `src/renderer/components/dialogs/index.ts`

- [ ] **Step 1: Add type constants and option types to `dialog-definition.model.ts`**

Add `LocalizeKey` to the imports from `platform-bible-utils`:

```typescript
import { LocalizeKey } from 'platform-bible-utils';
```

Add after line 13 (after `SELECT_BOOKS_DIALOG_TYPE`):

```typescript
/** The dialogType for alert dialogs rendered via overlay */
export const ALERT_DIALOG_TYPE = 'platform.alert';
/** The dialogType for confirm dialogs rendered via overlay */
export const CONFIRM_DIALOG_TYPE = 'platform.confirm';
```

Add after line 30 (after `SelectBooksDialogOptions`):

```typescript
/** Options to provide when showing an alert dialog */
export type AlertDialogOptions = DialogOptions & {
  /** The message body displayed in the dialog. Required for alert dialogs. */
  prompt: string | LocalizeKey;
  /** Custom label for the OK button. Defaults to a localized "OK". */
  okLabel?: string | LocalizeKey;
};

/** Options to provide when showing a confirm dialog */
export type ConfirmDialogOptions = DialogOptions & {
  /** The message body displayed in the dialog. Required for confirm dialogs. */
  prompt: string | LocalizeKey;
  /** Custom label for the OK button. Defaults to a localized "OK". */
  okLabel?: string | LocalizeKey;
  /** Custom label for the Cancel button. Defaults to a localized "Cancel". */
  cancelLabel?: string | LocalizeKey;
  /** Whether to style the OK button as a destructive action (e.g., red) */
  destructive?: boolean;
};
```

- [ ] **Step 2: Add entries to `DialogTypes` interface and split tab types**

Update the `DialogTypes` interface JSDoc comment (lines 32-37) to remove the `DIALOGS` cross-reference since not all dialog types map to `DIALOGS` entries:

```typescript
/**
 * Mapped type for dialog functions to use in getting various types for dialogs
 *
 * Keys should be dialog names, and values should be {@link DialogDataTypes}
 */
```

Add inside the `DialogTypes` interface (after the `SELECT_BOOKS_DIALOG_TYPE` entry at line 46):

```typescript
  [ALERT_DIALOG_TYPE]: DialogDataTypes<AlertDialogOptions, true>;
  [CONFIRM_DIALOG_TYPE]: DialogDataTypes<ConfirmDialogOptions, boolean>;
```

Replace the existing `DialogTabTypes` definition (line 49-50) with both types:

```typescript
/** Dialog types that render as rc-dock floating tabs (have a DialogDefinition) */
export type TabDialogTypes =
  | typeof ABOUT_DIALOG_TYPE
  | typeof SELECT_PROJECT_DIALOG_TYPE
  | typeof SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE
  | typeof SELECT_BOOKS_DIALOG_TYPE;

/** All dialog types including overlay-routed dialogs */
export type DialogTabTypes = keyof DialogTypes;
```

- [ ] **Step 3: Update `DIALOGS` registry in `index.ts`**

Change the import at line 4 to include `TabDialogTypes`:

```typescript
import { DialogDefinition, TabDialogTypes } from './dialog-definition.model';
```

Change the `DIALOGS` type at line 12 from `DialogTabTypes` to `TabDialogTypes`:

```typescript
export const DIALOGS: { [DialogTabType in TabDialogTypes]: DialogDefinition<DialogTabType> } = {
```

Change `DIALOG_TAB_TYPES` at line 22 to use `TabDialogTypes`:

```typescript
export const DIALOG_TAB_TYPES = Object.keys(DIALOGS) as TabDialogTypes[];
```

Note: The dock layout files (`platform-dock-layout-positioning.util.ts`, `platform-dock-layout-storage.util.ts`) import the `DIALOGS` runtime object and use `Object.entries(DIALOGS)` — they don't import `DialogTabTypes` directly, so they require no changes.

- [ ] **Step 4: Verify compilation**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors in these files.

- [ ] **Step 5: Commit**

```bash
git add src/renderer/components/dialogs/dialog-definition.model.ts src/renderer/components/dialogs/index.ts
git commit -m "feat: add alert and confirm dialog types, split TabDialogTypes from DialogTabTypes"
```

---

## Task 2: Remove showModalDialog from Overlay Service Public API

**Files:**

- Modify: `src/shared/models/overlay.service-model.ts`
- Modify: `src/renderer/services/overlay.service-host.ts`

- [ ] **Step 1: Remove `showModalDialog` from `IOverlayService` interface**

In `src/shared/models/overlay.service-model.ts`, delete the `showModalDialog` method and its JSDoc from the `IOverlayService` interface (lines 401-417). Also update the interface JSDoc (lines 352-367) to remove references to "modal dialogs":

```typescript
/**
 * JSDOC SOURCE overlayService
 *
 * Service for showing overlays (context menus, popovers, command palettes) that render outside
 * iframe boundaries in the renderer's top-level document. Renderer-only service.
 *
 * Extensions in sandboxed WebView iframes cannot render UI above other content or outside their
 * iframe bounds. This service accepts overlay requests from WebViews, translates their
 * iframe-relative coordinates to document-level coordinates, and renders the overlay in the
 * renderer's React tree. Each method returns a promise that resolves when the user interacts with
 * the overlay or it is dismissed.
 *
 * Only one overlay of each type (context menu, popover, command palette) can be active per WebView
 * at a time. Requesting a new overlay of the same type from the same WebView replaces the previous
 * one and rejects its promise with {@link OverlayReplacedError}.
 */
```

- [ ] **Step 2: Extract `showModalDialogOverlay` in overlay service host**

In `src/renderer/services/overlay.service-host.ts`, rename the existing `showModalDialog` function (line 307) to `showModalDialogOverlay` and export it. Change the `webViewId` parameter to default to `'dialog-service'` instead of `DEFAULT_WEB_VIEW_ID`:

```typescript
/**
 * Shows a modal dialog overlay. Called internally by the dialog service host.
 * Not exposed on PAPI.
 *
 * @internal
 */
export async function showModalDialogOverlay<T extends ModalDialogType>(
  dialogType: T,
  options: ModalDialogOptions[T],
  webViewId: string = 'dialog-service',
): Promise<ModalDialogResponse[T] | undefined> {
```

The function body stays exactly the same.

- [ ] **Step 3: Remove `showModalDialog` from the exported service object**

In `src/renderer/services/overlay.service-host.ts`, remove `showModalDialog` from the `overlayService` object (line 613):

```typescript
export const overlayService: IOverlayService = {
  showContextMenu,
  showContextMenuFromContribution,
  showPopover,
  updatePopover,
  dismissPopover,
  onPopoverDismissed,
  showCommandPalette,
};
```

- [ ] **Step 4: Verify compilation**

Run: `npx tsc --noEmit --pretty 2>&1 | head -50`
Expected: Errors only in consumer files (`hello-rock3`) that still call `papi.overlays.showModalDialog` — those are fixed in Task 6. No errors in the overlay service files themselves.

- [ ] **Step 5: Commit**

```bash
git add src/shared/models/overlay.service-model.ts src/renderer/services/overlay.service-host.ts
git commit -m "feat: remove showModalDialog from overlay service public API, extract internal function"
```

---

## Task 3: Add Routing in Dialog Service Host

**Files:**

- Modify: `src/renderer/services/dialog.service-host.ts`

- [ ] **Step 1: Add imports**

Add at the top of `src/renderer/services/dialog.service-host.ts`:

```typescript
import {
  ALERT_DIALOG_TYPE,
  CONFIRM_DIALOG_TYPE,
  AlertDialogOptions,
  ConfirmDialogOptions,
} from '@renderer/components/dialogs/dialog-definition.model';
import { showModalDialogOverlay } from '@renderer/services/overlay.service-host';
import { isLocalizeKey, LocalizeKey } from 'platform-bible-utils';
```

Note: `isLocalizeKey` and `LocalizeKey` may already be imported — check and merge with existing imports. `localizationService` is already imported.

- [ ] **Step 2: Add `localizeIfNeeded` helper**

Add a helper function before the `showDialog` function (around line 185):

```typescript
/** Localizes a string value if it is a LocalizeKey, otherwise returns it as-is */
async function localizeIfNeeded(
  value: string | LocalizeKey | undefined,
): Promise<string | undefined> {
  if (!value) return undefined;
  if (isLocalizeKey(value)) {
    const result = await localizationService.getLocalizedStrings({
      localizeKeys: [value],
    });
    return result[value] ?? value;
  }
  return value;
}
```

- [ ] **Step 3: Add routing branch in `showDialog`**

In the `showDialog` function (line 186), add routing after `localizeDialogOptions` and before the dialog ID generation (line 195). Insert after line 192 (`const optionsLocalized = await localizeDialogOptions(options);`):

```typescript
// Route overlay-based modal dialogs — no rc-dock tab needed
if (dialogType === ALERT_DIALOG_TYPE) {
  const alertOptions = optionsLocalized as AlertDialogOptions;
  const okLabel = await localizeIfNeeded(alertOptions?.okLabel);
  // DialogOptions.prompt maps to overlay's ModalDialogOptions.message
  return showModalDialogOverlay('alert', {
    title: alertOptions?.title,
    message: alertOptions?.prompt,
    okLabel,
  }) as Promise<DialogTypes[DialogTabType]['responseType'] | undefined>;
}
if (dialogType === CONFIRM_DIALOG_TYPE) {
  const confirmOptions = optionsLocalized as ConfirmDialogOptions;
  const okLabel = await localizeIfNeeded(confirmOptions?.okLabel);
  const cancelLabel = await localizeIfNeeded(confirmOptions?.cancelLabel);
  return showModalDialogOverlay('confirm', {
    title: confirmOptions?.title,
    message: confirmOptions?.prompt,
    okLabel,
    cancelLabel,
    destructive: confirmOptions?.destructive,
  }) as Promise<DialogTypes[DialogTabType]['responseType'] | undefined>;
}
```

Note the `as Promise<...>` cast — `showModalDialogOverlay` returns `ModalDialogResponse[T] | undefined` which TypeScript can't automatically narrow to the generic `DialogTypes[DialogTabType]['responseType']`.

- [ ] **Step 4: Update `startDialogService` JSON Schema**

In the `startDialogService` function, update the `dialogType` enum schema (around line 279) to include the new types. Find the `schema` with `enum: Object.values(DialogTypesValues)` and verify that `ALERT_DIALOG_TYPE` and `CONFIRM_DIALOG_TYPE` are exported from `DialogTypesValues` (they are constants exported from `dialog-definition.model.ts`, so `Object.values(DialogTypesValues)` should pick them up automatically since the import is `import * as DialogTypesValues`).

Also add the new option properties to the `options` schema `properties` (around line 289):

```typescript
okLabel: { type: 'string' },
cancelLabel: { type: 'string' },
destructive: { type: 'boolean' },
```

- [ ] **Step 5: Verify compilation**

Run: `npx tsc --noEmit --pretty 2>&1 | head -50`
Expected: Errors only in `hello-rock3` consumer (fixed in Task 6).

- [ ] **Step 6: Commit**

```bash
git add src/renderer/services/dialog.service-host.ts
git commit -m "feat: route alert/confirm dialog types to overlay service from dialog service"
```

---

## Task 4: Update Overlay Service Host Tests

**Files:**

- Modify: `src/renderer/services/overlay.service-host.test.ts`

- [ ] **Step 1: Read the existing test file**

Read `src/renderer/services/overlay.service-host.test.ts` to understand the test structure and how `showModalDialog` tests are organized.

- [ ] **Step 2: Update tests to use `showModalDialogOverlay` instead of `overlayService.showModalDialog`**

The tests at lines 163, 186, 214, 220, 243, 262 call `overlayService.showModalDialog(...)`. These should now import and call `showModalDialogOverlay(...)` directly (it's a named export, not on the service object):

```typescript
import { showModalDialogOverlay } from './overlay.service-host';
```

Update each test call:

- `overlayService.showModalDialog('alert', options, 'test-webview')` → `showModalDialogOverlay('alert', options, 'test-webview')`
- `overlayService.showModalDialog('confirm', options, 'test-webview')` → `showModalDialogOverlay('confirm', options, 'test-webview')`

- [ ] **Step 3: Run the tests**

Run: `npm test -- src/renderer/services/overlay.service-host.test.ts`
Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/renderer/services/overlay.service-host.test.ts
git commit -m "test: update overlay service tests to use internal showModalDialogOverlay"
```

---

## Task 5: Migrate hello-rock3 Consumer

**Files:**

- Modify: `extensions/src/hello-rock3/src/web-views/hello-rock3.web-view.tsx`

- [ ] **Step 1: Update alert call (line 540)**

Replace:

```typescript
papi.overlays.showModalDialog(
  'alert',
  {
    title: overlayAlertTitle,
    message: overlayAlertMessage,
  },
  globalThis.webViewId,
);
```

With:

```typescript
papi.dialogs.showDialog('platform.alert', {
  title: overlayAlertTitle,
  prompt: overlayAlertMessage,
});
```

Note: `message` becomes `prompt` (using `DialogOptions` field name). `webViewId` is no longer needed (the dialog service handles it). Use the string literal `'platform.alert'` rather than importing the constant — extension WebView code may not have access to `@renderer/` import paths.

- [ ] **Step 2: Update confirm call (line 771)**

Replace:

```typescript
const confirmed = await papi.overlays.showModalDialog(
  'confirm',
  {
    title: overlayDeletePersonTitle,
    message: overlayDeletePersonMessage,
    okLabel: overlayDeletePersonOkLabel,
    cancelLabel: overlayCancel,
    destructive: true,
  },
```

With:

```typescript
const confirmed = await papi.dialogs.showDialog('platform.confirm', {
  title: overlayDeletePersonTitle,
  prompt: overlayDeletePersonMessage,
  okLabel: overlayDeletePersonOkLabel,
  cancelLabel: overlayCancel,
  destructive: true,
});
```

Note the closing — check if the original had a trailing `globalThis.webViewId` argument on the next line that also needs removal.

- [ ] **Step 3: Verify full compilation**

Run: `npx tsc --noEmit --pretty 2>&1 | head -50`
Expected: No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add extensions/src/hello-rock3/src/web-views/hello-rock3.web-view.tsx
git commit -m "refactor: migrate hello-rock3 from overlay showModalDialog to dialog service"
```

---

## Task 6: Write Dialog Service Routing Tests

**Files:**

- Create: `src/renderer/services/dialog.service-host.test.ts`

`showDialog` is a module-private function — it's not exported. It's registered as a network request handler via `registerRequestHandler`. The test strategy is to capture the handler function from the `registerRequestHandler` mock and call it directly.

- [ ] **Step 1: Write tests for alert and confirm routing**

Create `src/renderer/services/dialog.service-host.test.ts`:

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock overlay service host before import
const mockShowModalDialogOverlay = vi.fn();
vi.mock('@renderer/services/overlay.service-host', () => ({
  showModalDialogOverlay: mockShowModalDialogOverlay,
}));

// Mock web-view service (needed by dialog service initialize)
vi.mock('@renderer/services/web-view.service-host', () => ({
  initialize: vi.fn().mockResolvedValue(undefined),
  addTab: vi.fn(),
  closeTab: vi.fn(),
}));

// Mock localization service
vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    getLocalizedStrings: vi.fn().mockResolvedValue({}),
  },
}));

// Capture the showDialog handler from registerRequestHandler
let capturedShowDialog: (...args: unknown[]) => Promise<unknown>;
const mockRegisterRequestHandler = vi
  .fn()
  .mockImplementation((requestType: string, handler: (...args: unknown[]) => Promise<unknown>) => {
    if (requestType.includes('showDialog')) {
      capturedShowDialog = handler;
    }
    return Promise.resolve(vi.fn());
  });
vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mockRegisterRequestHandler,
}));

// Mock command service
vi.mock('@shared/services/command.service', () => ({
  registerCommand: vi.fn().mockResolvedValue(vi.fn()),
}));

// Mock dialog base data
vi.mock('@renderer/components/dialogs/dialog-base.data', () => ({
  hookUpDialogService: vi.fn(),
}));

describe('dialog.service-host modal dialog routing', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    // Import the module to trigger startDialogService registration
    const mod = await import('./dialog.service-host');
    await mod.startDialogService();
  });

  it('routes alert dialog to showModalDialogOverlay', async () => {
    mockShowModalDialogOverlay.mockResolvedValue(true);

    const result = await capturedShowDialog('platform.alert', {
      title: 'Test Alert',
      prompt: 'Alert message',
    });

    expect(mockShowModalDialogOverlay).toHaveBeenCalledWith('alert', {
      title: 'Test Alert',
      message: 'Alert message',
      okLabel: undefined,
    });
    expect(result).toBe(true);
  });

  it('routes confirm dialog to showModalDialogOverlay', async () => {
    mockShowModalDialogOverlay.mockResolvedValue(true);

    await capturedShowDialog('platform.confirm', {
      prompt: 'Are you sure?',
      okLabel: 'Delete',
      cancelLabel: 'Keep',
      destructive: true,
    });

    expect(mockShowModalDialogOverlay).toHaveBeenCalledWith('confirm', {
      title: undefined,
      message: 'Are you sure?',
      okLabel: 'Delete',
      cancelLabel: 'Keep',
      destructive: true,
    });
  });

  it('returns undefined when alert dialog is dismissed', async () => {
    mockShowModalDialogOverlay.mockResolvedValue(undefined);

    const result = await capturedShowDialog('platform.alert', {
      prompt: 'Dismissed alert',
    });

    expect(result).toBeUndefined();
  });

  it('returns false when confirm dialog cancel is clicked', async () => {
    mockShowModalDialogOverlay.mockResolvedValue(false);

    const result = await capturedShowDialog('platform.confirm', {
      prompt: 'Cancelled confirm',
    });

    expect(result).toBe(false);
  });

  it('localizes okLabel when it is a LocalizeKey', async () => {
    mockShowModalDialogOverlay.mockResolvedValue(true);
    const { localizationService } = await import('@shared/services/localization.service');
    vi.mocked(localizationService.getLocalizedStrings).mockResolvedValue({
      '%some_key%': 'Localized OK',
    });

    await capturedShowDialog('platform.alert', {
      prompt: 'Test',
      okLabel: '%some_key%',
    });

    expect(mockShowModalDialogOverlay).toHaveBeenCalledWith(
      'alert',
      expect.objectContaining({ okLabel: 'Localized OK' }),
    );
  });
});
```

Note: The exact mock structure may need adjustment. Read `dialog.service-host.ts` and `dialog-base.data.ts` carefully. The key approach is capturing the `showDialog` handler from the `registerRequestHandler` mock — look for the registration call whose `requestType` contains `'showDialog'`.

- [ ] **Step 2: Run the tests**

Run: `npm test -- src/renderer/services/dialog.service-host.test.ts`
Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/renderer/services/dialog.service-host.test.ts
git commit -m "test: add dialog service routing tests for alert/confirm modal dialogs"
```

---

## Task 7: Regenerate Types and Final Verification

**Files:**

- Regenerate: `lib/papi-dts/papi.d.ts`

- [ ] **Step 1: Build the project to regenerate papi.d.ts**

Run: `npm run build`
Expected: Build succeeds. `papi.d.ts` is regenerated with:

- `showModalDialog` removed from overlay service types
- `AlertDialogOptions`, `ConfirmDialogOptions` visible in dialog types

- [ ] **Step 2: Verify papi.d.ts changes**

Run: `git diff lib/papi-dts/papi.d.ts | head -100`
Expected: Shows removal of `showModalDialog` from overlay service, addition of alert/confirm dialog types.

- [ ] **Step 3: Run all tests**

Run: `npm test`
Expected: All tests pass.

- [ ] **Step 4: Run linting**

Run: `npm run lint`
Expected: No new lint errors.

- [ ] **Step 5: Commit**

```bash
git add lib/papi-dts/papi.d.ts
git commit -m "chore: regenerate papi.d.ts with modal dialog type changes"
```
