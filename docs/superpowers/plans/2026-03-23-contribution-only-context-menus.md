# Contribution-Only Context Menus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate the custom `ContextMenuItem` public type and make context menus exclusively use menu.json contributions, with auto-execution of the selected command.

**Architecture:** The overlay service's `showContextMenu()` changes from accepting inline items to accepting a `webViewType` string. It fetches menu data from the menu data service, converts it internally, renders the menu, and auto-executes the selected command. `ContextMenuItem` becomes internal to the overlay service.

**Tech Stack:** TypeScript, React, Radix DropdownMenu, platform-bible-utils menu types

---

## File Map

| Action | File                                                                       | Responsibility                                                                                                                                             |
| ------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Modify | `src/renderer/components/overlays/overlay-context-menu.component.tsx`      | Remove checkbox/radio/destructive rendering; simplify `OverlayContextMenuItem`; update localization helpers to use own type                                |
| Modify | `src/renderer/components/overlays/overlay-context-menu.component.test.tsx` | Remove checkbox/radio tests                                                                                                                                |
| Modify | `src/renderer/components/overlays/overlay-context-menu.stories.tsx`        | Remove checkbox/radio/destructive stories                                                                                                                  |
| Modify | `src/renderer/services/overlays/overlay.service-model.ts`                  | Remove `ContextMenuItem`, `ContextMenuRequest`, `ContextMenuResult` exports; update `IOverlayService` interface; update `OverlayEntry` contextMenu variant |
| Modify | `src/renderer/services/overlays/overlay.service-host.ts`                   | Merge `showContextMenuFromContribution` into `showContextMenu`; add command auto-execution                                                                 |
| Modify | `src/renderer/services/overlays/overlay.service-host.test.ts`              | Update context menu tests for new signature                                                                                                                |
| Modify | `src/renderer/services/overlays/overlay.service-host.contribution.test.ts` | Rename `showContextMenuFromContribution` tests to `showContextMenu` tests                                                                                  |
| Modify | `src/renderer/services/overlays/overlay-menu-converter.ts`                 | Update import to use component's internal type                                                                                                             |
| Modify | `src/renderer/services/overlays/overlay-validation.ts`                     | Update to validate internal type only (remove public import)                                                                                               |
| Modify | `src/renderer/services/overlays/overlay-validation.test.ts`                | Update for renamed function and removed types                                                                                                              |
| Modify | `src/renderer/services/overlays/overlay-store.test.ts`                     | Update import to use component type                                                                                                                        |
| Modify | `src/shared/services/papi-core.service.ts`                                 | Remove `ContextMenuItem`, `ContextMenuRequest`, `ContextMenuResult` re-exports                                                                             |
| Modify | `extensions/src/hello-rock3/src/web-views/hello-rock3.web-view.tsx`        | Replace inline context menu with contribution-based call                                                                                                   |
| Modify | `extensions/src/hello-rock3/contributions/menus.json`                      | Add context menu contributions for projectWebView                                                                                                          |

**Note on `papi.d.ts`:** This is a generated file. It will be regenerated automatically by `npm run build` in the final verification step. Do not edit it manually.

---

### Task 1: Simplify Context Menu Component, Tests, and Stories

Remove checkbox, radio, and destructive support from the React component and its types. Update the component's localization helpers to reference `OverlayContextMenuItem` (its own type) instead of importing `ContextMenuItem` from the service model.

**Files:**

- Modify: `src/renderer/components/overlays/overlay-context-menu.component.tsx`
- Modify: `src/renderer/components/overlays/overlay-context-menu.component.test.tsx`
- Modify: `src/renderer/components/overlays/overlay-context-menu.stories.tsx`

- [ ] **Step 1: Update `OverlayContextMenuItem` type**

In `overlay-context-menu.component.tsx`, simplify the `OverlayContextMenuItem` type to only `item`, `separator`, `submenu`. Remove `checkbox`, `radio` variants and `destructive` field from `item`:

```typescript
export type OverlayContextMenuItem =
  | {
      type: 'item';
      id: string;
      label: string | LocalizeKey;
      icon?: PlatformIconName;
      shortcut?: string;
      disabled?: boolean;
    }
  | { type: 'separator' }
  | {
      type: 'submenu';
      label: string | LocalizeKey;
      icon?: PlatformIconName;
      items: OverlayContextMenuItem[];
    };
```

Also simplify `OverlayContextMenuResult` to just return the item ID string:

```typescript
export type OverlayContextMenuResult = {
  itemId: string;
};
```

- [ ] **Step 2: Remove checkbox/radio rendering from `renderMenuItems`**

Remove the `else if (item.type === 'checkbox')` block (lines 226-237), the `else if (item.type === 'radio')` block (lines 239-276), and the `destructive` className from the `item` block (line 217, remove `item.destructive && 'tw-text-destructive'`).

Remove unused imports: `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`.

- [ ] **Step 3: Update localization helpers to use own type**

The `collectContextMenuKeys` and `localizeContextMenuItems` functions (lines 363-386) currently import and use `ContextMenuItem` from `overlay.service-model.ts`. Update these to use `OverlayContextMenuItem` (the component's own type) instead. Remove the `ContextMenuItem` import from `overlay.service-model`. The `OverlayEntry` import must remain for the store-connected component.

```typescript
function collectContextMenuKeys(items: OverlayContextMenuItem[]): LocalizeKey[] {
  // ... same logic, now using OverlayContextMenuItem
}

function localizeContextMenuItems(
  items: OverlayContextMenuItem[],
  localizedStrings: LanguageStrings,
): OverlayContextMenuItem[] {
  // ... same logic, now using OverlayContextMenuItem
}
```

- [ ] **Step 4: Update tests**

In `overlay-context-menu.component.test.tsx`:

- Remove the checkbox toggle test ("should call onSelect with checked state when a checkbox item is toggled")
- Remove the radio select test ("should call onSelect with checked state when a radio item is selected")
- Keep the plain item, disabled item, and separator tests

- [ ] **Step 5: Update stories**

In `overlay-context-menu.stories.tsx`:

- Remove `CheckboxItems` story and its `checkboxItems` data
- Remove `RadioGroup` story and its `radioItems` data
- Remove `destructive: true` from items in `basicItems` and `kitchenSinkItems`
- Remove checkbox/radio items from `kitchenSinkItems`
- Update the component description string to remove mention of checkboxes and radio groups

- [ ] **Step 6: Run tests**

Run: `npm test -- src/renderer/components/overlays/overlay-context-menu.component.test.tsx`
Expected: All remaining tests PASS

- [ ] **Step 7: Commit**

```
git add src/renderer/components/overlays/overlay-context-menu.component.tsx src/renderer/components/overlays/overlay-context-menu.component.test.tsx src/renderer/components/overlays/overlay-context-menu.stories.tsx
git commit -m "Remove checkbox/radio/destructive from context menu component"
```

---

### Task 2: Update All Overlay Service Types, Converter, Validation, and Service Host

This is an atomic task that updates all interdependent files together to avoid intermediate compilation failures. It removes the public context menu types, updates the service interface, merges `showContextMenuFromContribution` into `showContextMenu`, adds command auto-execution, and updates the converter and validation.

**Files:**

- Modify: `src/renderer/services/overlays/overlay.service-model.ts`
- Modify: `src/renderer/services/overlays/overlay.service-host.ts`
- Modify: `src/renderer/services/overlays/overlay-menu-converter.ts`
- Modify: `src/renderer/services/overlays/overlay-validation.ts`

- [ ] **Step 1: Update service model types**

In `overlay.service-model.ts`:

- Remove `ContextMenuItem` export (lines 25-74)
- Remove `ContextMenuRequest` export (lines 83-91)
- Remove `ContextMenuResult` export (lines 99-104)
- Remove `PlatformIconName` type alias (line 14, it's only used by `ContextMenuItem`)

Import `OverlayContextMenuItem` from the component for `OverlayEntry`:

```typescript
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
```

Replace the two context menu methods on `IOverlayService` with one:

```typescript
/**
 * Shows a context menu from menu.json contributions registered for the given webViewType. Fetches
 * menu data, renders the menu, and auto-executes the selected command. Returns the command string
 * that was executed, or undefined if dismissed.
 *
 * @param webViewType The webViewType to look up in the menu data service
 * @param webViewId The ID of the WebView requesting the context menu. Pass
 *   `globalThis.webViewId` from within a WebView iframe.
 * @param options Optional context including the position for the menu
 * @returns The command string that was executed, or `undefined` if dismissed
 * @throws PlatformError with code ABORTED if replaced by another context menu from the same
 *   WebView
 */
showContextMenu(
  webViewType: string,
  webViewId: string,
  options?: { position?: { x: number; y: number } },
): Promise<string | undefined>;
```

Update `OverlayEntry` contextMenu variant:

- Change `items` type from `ContextMenuItem[]` to `OverlayContextMenuItem[]`
- Change `resolve` type from `(result: ContextMenuResult | undefined) => void` to `(result: string | undefined) => void`

- [ ] **Step 2: Update converter import**

In `overlay-menu-converter.ts`, change import from:

```typescript
import type { ContextMenuItem } from './overlay.service-model';
```

To:

```typescript
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
```

Rename all `ContextMenuItem` references to `OverlayContextMenuItem` in function signatures and local variables.

- [ ] **Step 3: Update validation**

In `overlay-validation.ts`, change import to:

```typescript
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
```

Remove `ContextMenuRequest` and `ContextMenuItem` from the model import.

Rename `validateContextMenuRequest` to `validateContextMenuItems` with updated signature:

```typescript
export function validateContextMenuItems(items: OverlayContextMenuItem[]): void {
  if (!items || items.length === 0) {
    throwValidationError('Items array must not be empty');
  }
  validateMenuItems(items, 0);
}
```

Update `validateMenuItems` parameter type to `OverlayContextMenuItem[]`.

- [ ] **Step 4: Rewrite `showContextMenu` in service host**

In `overlay.service-host.ts`:

Update imports - remove `ContextMenuRequest`, `ContextMenuResult` from model import. Add command service import:

```typescript
import { commandService } from '@shared/services/command.service';
```

Update validation import:

```typescript
import { validateContextMenuItems, ... } from './overlay-validation';
```

Replace `showContextMenu` function with the merged version:

```typescript
async function showContextMenu(
  webViewType: string,
  webViewId: string,
  options?: { position?: { x: number; y: number } },
): Promise<string | undefined> {
  // Fetch menu contributions for this webViewType
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const webViewMenu = await menuDataService.getWebViewMenu(webViewType as ReferencedItem);

  if (!webViewMenu.contextMenu) {
    return undefined;
  }

  const items = convertContributionToContextMenuItems(webViewMenu.contextMenu);

  if (items.length === 0) {
    return undefined;
  }

  validateContextMenuItems(items);

  if (!isWebViewVisible(webViewId)) {
    throw newOverlayError('Requesting WebView is not visible', FAILED_PRECONDITION);
  }

  if (!debounceCheck('contextMenu', webViewId)) {
    throw newOverlayError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED);
  }

  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'contextMenu');
  existingOverlays.forEach((existing) => {
    rejectAndRemoveOverlay(
      existing.id,
      newOverlayError('Overlay was replaced by a new request', ABORTED),
    );
    restoreFocus(existing.id);
  });

  const overlayId = newGuid();
  saveFocus(overlayId);

  const rawPosition = options?.position ?? { x: 0, y: 0 };
  const translatedPosition = translateCoordinates(webViewId, rawPosition);
  const clampedPosition = clampToViewport(translatedPosition, 4);

  announceToScreenReader('Context menu opened');
  lastOverlayCreatedAt = Date.now();

  const selectedCommand = await new Promise<string | undefined>((resolve, reject) => {
    addOverlay({
      type: 'contextMenu',
      id: overlayId,
      webViewId,
      items,
      position: clampedPosition,
      resolve: (result) => {
        restoreFocus(overlayId);
        resolve(result);
      },
      reject,
    });
  });

  if (selectedCommand) {
    try {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      await commandService.sendCommand(selectedCommand as never);
    } catch (error) {
      logger.warn(`Failed to execute context menu command "${selectedCommand}": ${error}`);
    }
  }

  return selectedCommand;
}
```

- [ ] **Step 5: Remove `showContextMenuFromContribution` and update exports**

Delete the `showContextMenuFromContribution` function entirely. Remove it from the `overlayService` export object.

- [ ] **Step 6: Verify types compile**

Run: `npx tsc --noEmit --pretty 2>&1 | head -50`
Expected: Errors only in test files and papi-core.service.ts (not yet updated), not in the source files modified here.

---

### Task 3: Update All Test Files

Update tests that reference the removed types and methods.

**Files:**

- Modify: `src/renderer/services/overlays/overlay.service-host.test.ts`
- Modify: `src/renderer/services/overlays/overlay.service-host.contribution.test.ts`
- Modify: `src/renderer/services/overlays/overlay-validation.test.ts`
- Modify: `src/renderer/services/overlays/overlay-store.test.ts`

- [ ] **Step 1: Update `overlay.service-host.test.ts`**

The context menu tests (around lines 73-150) call `overlayService.showContextMenu(validRequest, 'test-webview')` with the old signature using a `ContextMenuRequest` object. Update them to use the new signature.

The test mocks `overlay-store`'s `addOverlay` to auto-resolve. Update the mock to resolve with a command string instead of `{ itemId: ... }`:

```typescript
addOverlay: vi.fn((entry: { resolve: (v: unknown) => void }) => {
  // For context menu tests, resolve with a command string
  if (entry.type === 'contextMenu') entry.resolve('ext.doSomething');
  // For other types, resolve as before
}),
```

Must also mock `menuDataService.getWebViewMenu` to return a valid menu and mock `commandService.sendCommand`. Update the test calls:

```typescript
const promise = overlayService.showContextMenu('ext.testWebView', 'test-webview');
```

Update assertions from `{ itemId: 'cut' }` to `'cut'` (or whatever command string the mock returns).

- [ ] **Step 2: Update `overlay.service-host.contribution.test.ts`**

Rename the describe block from `showContextMenuFromContribution` to `showContextMenu`. Update all calls from `overlayService.showContextMenuFromContribution(...)` to `overlayService.showContextMenu(...)`.

Update the mock's auto-resolve to return a command string instead of `{ itemId: '...' }`:

```typescript
addOverlay: vi.fn((entry: { resolve: (v: unknown) => void }) => {
  entry.resolve('ext.doSomething');
}),
```

Add a mock for `commandService`:

```typescript
vi.mock('@shared/services/command.service', () => ({
  commandService: { sendCommand: vi.fn() },
}));
```

Update assertion from `expect(result).toEqual({ itemId: 'ext.doSomething' })` to `expect(result).toBe('ext.doSomething')`.

- [ ] **Step 3: Update `overlay-validation.test.ts`**

Replace `ContextMenuRequest` and `ContextMenuItem` imports with `OverlayContextMenuItem`:

```typescript
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
```

Replace `validateContextMenuRequest` import with `validateContextMenuItems`.

Update all test calls from `validateContextMenuRequest({ items: [...] })` to `validateContextMenuItems([...])` (passing items array directly, not wrapped in a request object).

Update type annotations from `ContextMenuItem[]` to `OverlayContextMenuItem[]`.

Remove checkbox/radio-specific validation tests (they tested that checkbox and radio items pass validation - those types no longer exist).

- [ ] **Step 4: Update `overlay-store.test.ts`**

Replace `ContextMenuItem` import from `overlay.service-model` with `OverlayContextMenuItem` from the component:

```typescript
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
```

Update the helper function that creates context menu overlay entries to use `OverlayContextMenuItem[]` and `(result: string | undefined) => void` for the resolve callback.

- [ ] **Step 5: Run all overlay tests**

Run: `npm test -- src/renderer/services/overlays/ src/renderer/components/overlays/`
Expected: All tests PASS

- [ ] **Step 6: Commit**

```
git add src/renderer/services/overlays/ src/renderer/components/overlays/ src/shared/services/papi-core.service.ts
git commit -m "Make context menus contribution-only with auto-execution"
```

---

### Task 4: Remove Public Re-exports and Migrate hello-rock3

**Files:**

- Modify: `src/shared/services/papi-core.service.ts`
- Modify: `extensions/src/hello-rock3/contributions/menus.json`
- Modify: `extensions/src/hello-rock3/src/web-views/hello-rock3.web-view.tsx`

- [ ] **Step 1: Remove context menu type re-exports from papi-core**

Remove `ContextMenuItem`, `ContextMenuRequest`, and `ContextMenuResult` from the re-export list in `papi-core.service.ts` (around lines 96-98).

- [ ] **Step 2: Add context menu contributions to hello-rock3 menus.json**

Add a `contextMenu` section to the existing `helloRock3.projectWebView` entry in `webViewMenus`. Keep it simple - just demonstrate the contribution-based context menu with a couple of command items and a submenu:

```json
"helloRock3.projectWebView": {
  "topMenu": { ... existing ... },
  "contextMenu": {
    "groups": {
      "helloRock3.contextActions": {
        "order": 1
      },
      "helloRock3.contextMoreActions": {
        "order": 2,
        "menuItem": "helloRock3.moreActionsSubmenu"
      }
    },
    "items": [
      {
        "label": "%helloRock3_overlay_openEditor%",
        "group": "helloRock3.contextActions",
        "order": 1,
        "command": "platformScriptureEditor.openScriptureEditor"
      },
      {
        "id": "helloRock3.moreActionsSubmenu",
        "label": "%helloRock3_overlay_moreActions%",
        "group": "helloRock3.contextActions",
        "order": 2
      },
      {
        "label": "%helloRock3_overlay_showAlert%",
        "group": "helloRock3.contextMoreActions",
        "order": 1,
        "command": "helloRock3.helloRock3"
      }
    ]
  }
}
```

Note: `platformScriptureEditor.openScriptureEditor` will fire without arguments (the command argument problem is out of scope - see spec). `helloRock3.helloRock3` is the hello command - it's a different behavior than the original "Show Alert" dialog, but acceptable for a demo.

- [ ] **Step 3: Simplify the context menu handler in the WebView**

In `hello-rock3.web-view.tsx`, replace the entire `handleContextMenu` callback (lines 480-576+) with:

```typescript
const handleContextMenu = useCallback(async (e: MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  await papi.overlays.showContextMenu('helloRock3.projectWebView', globalThis.webViewId, {
    position: { x: e.clientX, y: e.clientY },
  });
}, []);
```

- [ ] **Step 4: Clean up unused imports and state**

Remove from the file:

- `ContextMenuItem` import from `@papi/core` (line 1)
- The `verboseLogging`, `autoSave`, `textSize` state variables and their setters (lines 475-477) - only used by the old context menu
- All `overlay*` LocalizeKey variables (lines 91-104) that are no longer used by the handler. **Check each one** - some may be used by the popover or delete-confirm demos elsewhere in the file. Keep those.
- Remove the items array, switch statement, and dependency array entries that referenced the removed state

- [ ] **Step 5: Run type checking and tests**

Run: `npm run typecheck && npm test`
Expected: No type errors, all tests pass

- [ ] **Step 6: Commit**

```
git add src/shared/services/papi-core.service.ts extensions/src/hello-rock3/
git commit -m "Migrate hello-rock3 context menu to contribution-based API"
```

---

### Task 5: Final Verification

- [ ] **Step 1: Run linting**

Run: `npm run lint`
Expected: No new lint errors

- [ ] **Step 2: Run full build**

Run: `npm run build`
Expected: Build succeeds (this also regenerates `papi.d.ts`)

- [ ] **Step 3: Run all tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Verify no stale references**

Search for removed types across the codebase (excluding `papi.d.ts` and `node_modules`):

- `ContextMenuRequest` - should be zero hits
- `ContextMenuResult` - should be zero hits
- `showContextMenuFromContribution` - should be zero hits
- `ContextMenuItem` as an import from `@papi/core` or `overlay.service-model` - should be zero hits (internal `OverlayContextMenuItem` is fine)

- [ ] **Step 5: Commit any cleanup**

If any cleanup was needed, commit it.
