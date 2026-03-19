# Combine Modal Dialogs with Dialog Service

## Problem

The overlay service currently exposes `showModalDialog` (alert/confirm) on its PAPI interface. The platform already has a dialog service (`papi.dialogs`) for user-facing dialogs. Having two separate services for dialogs is confusing. Modal dialogs should be part of the dialog service, leaving the overlay service focused on context menus, popovers, and command palettes.

## Approach

**Approach C: Dialog service routes to overlay service, remove modal from overlay public API.**

The dialog service becomes the single PAPI surface for all dialogs. Alert/confirm are new `DialogTypes` entries. The dialog service host routes these to the overlay service's internal modal rendering. The overlay service retains its modal rendering infrastructure but removes `showModalDialog` from its public interface.

This is a breaking change to the overlay service API, which is acceptable because the overlay service has not been released yet.

## Design

### 1. New Dialog Types

In `dialog-definition.model.ts`, add two new dialog type constants and option types:

```typescript
export const ALERT_DIALOG_TYPE = 'platform.alert';
export const CONFIRM_DIALOG_TYPE = 'platform.confirm';

export type AlertDialogOptions = DialogOptions & {
  /** The message body displayed in the dialog. Required for alert dialogs. */
  prompt: string | LocalizeKey;
  okLabel?: string | LocalizeKey;
};

export type ConfirmDialogOptions = DialogOptions & {
  /** The message body displayed in the dialog. Required for confirm dialogs. */
  prompt: string | LocalizeKey;
  okLabel?: string | LocalizeKey;
  cancelLabel?: string | LocalizeKey;
  destructive?: boolean;
};
```

These extend `DialogOptions`, reusing its `title` and `prompt` fields. `prompt` is redeclared as required (narrowing from optional).

Add to the `DialogTypes` interface using the standard `DialogDataTypes` pattern:

```typescript
[ALERT_DIALOG_TYPE]: DialogDataTypes<AlertDialogOptions, true>;
[CONFIRM_DIALOG_TYPE]: DialogDataTypes<ConfirmDialogOptions, boolean>;
```

#### Splitting Tab-Based vs All Dialog Types

The existing `DIALOGS` object in `src/renderer/components/dialogs/index.ts` is a mapped type over all `DialogTabTypes` keys, requiring a `DialogDefinition` for each entry. Alert/confirm have no rc-dock component and cannot provide a `DialogDefinition`. To resolve this, split the types:

- **`TabDialogTypes`** — keys of dialog types that render as rc-dock tabs. Used by the `DIALOGS` mapped type and dock layout utilities.
- **`DialogTabTypes`** (renamed or kept) — all dialog type keys including overlay-routed ones. Used by `showDialog`.

```typescript
/** Dialog types that render as rc-dock floating tabs */
export type TabDialogTypes =
  | typeof ABOUT_DIALOG_TYPE
  | typeof SELECT_PROJECT_DIALOG_TYPE
  | typeof SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE
  | typeof SELECT_BOOKS_DIALOG_TYPE;

/** All dialog types including overlay-routed dialogs */
export type DialogTabTypes = keyof DialogTypes;
```

The `DIALOGS` object and dock layout utilities (`platform-dock-layout-positioning.util.ts`, `platform-dock-layout-storage.util.ts`) use `TabDialogTypes` instead of `DialogTabTypes`. The `showDialog` function continues to use `DialogTabTypes` (all dialog types).

The `DialogDataTypes` `props` field will be structurally present for alert/confirm but never used at runtime — these dialogs don't render as tab components. This is an acceptable trade-off for keeping the `DialogTypes` interface uniform.

### 2. Localization

`DialogOptions` and `DIALOG_OPTIONS_LOCALIZABLE_PROPERTY_KEYS` remain unchanged. The shared `localizeDialogOptions` function continues to handle `title` and `prompt` for all dialog types.

For alert/confirm-specific fields (`okLabel`, `cancelLabel`), localization is handled inline in the routing code in `dialog.service-host.ts` before passing options to the overlay service. This avoids adding properties to the base `DialogOptions` type that don't apply to other dialog types.

Note: `AlertDialogOptions` and `ConfirmDialogOptions` inherit `iconUrl` from `DialogOptions`, which the overlay modal dialog component currently ignores. This is an acceptable minor imperfection — `iconUrl` support could be added to modal dialogs in the future.

### 3. Overlay Service: Internal Function

In `overlay.service-host.ts`, extract a new internal function that the dialog service host can import directly:

```typescript
/** @internal Called by the dialog service host. Not exposed on PAPI. */
export function showModalDialogOverlay<T extends ModalDialogType>(
  dialogType: T,
  options: ModalDialogOptions[T],
): Promise<ModalDialogResponse[T] | undefined>;
```

This is the existing `showModalDialog` logic without the `webViewId` parameter — since dialog service calls come from the network (not a specific WebView), there is no WebView visibility check or one-per-WebView enforcement. The internal function uses a fixed sentinel `webViewId` (e.g., `'dialog-service'`) for the overlay store's one-per-type tracking. This means rapid sequential calls from the dialog service will replace the previous modal (same behavior as the overlay service's one-per-WebView rule, but scoped to the dialog service as a single "caller").

### 4. Overlay Service: Public API Removal

Remove `showModalDialog` from the `IOverlayService` interface in `overlay.service-model.ts`. The interface retains:

- `showContextMenu` / `showContextMenuFromContribution`
- `showPopover` / `updatePopover` / `dismissPopover` / `onPopoverDismissed`
- `showCommandPalette`

`ModalDialogType`, `ModalDialogOptions`, and `ModalDialogResponse` remain in `overlay.service-model.ts` as internal types (the overlay rendering still needs them), but they are no longer part of the public PAPI contract.

All internal overlay modal infrastructure is untouched:

- `overlay-modal-dialog.component.tsx` — still renders modals
- `OverlayEntry` union — keeps the `'modalDialog'` variant
- Overlay store — still stores modal dialog entries
- Overlay validation — still validates modal dialog options
- `overlay-host.component.tsx` — still renders modal dialog entries from the store

### 5. Dialog Service Host: Routing

In `dialog.service-host.ts`, add a routing branch at the top of `showDialog` before the rc-dock tab logic:

```typescript
async function showDialog<DialogTabType extends DialogTabTypes>(
  dialogType: DialogTabType,
  options?: DialogTypes[DialogTabType]['options'],
): Promise<DialogTypes[DialogTabType]['responseType'] | undefined> {
  await initialize();

  const optionsLocalized = await localizeDialogOptions(options);

  // Route overlay-based dialogs — no rc-dock tab needed
  if (dialogType === ALERT_DIALOG_TYPE) {
    const alertOptions = optionsLocalized as AlertDialogOptions;
    // Localize button label inline (not in shared localizeDialogOptions)
    const okLabel = await localizeIfNeeded(alertOptions?.okLabel);
    return showModalDialogOverlay('alert', {
      title: alertOptions?.title,
      message: alertOptions?.prompt,
      okLabel,
    });
  }
  if (dialogType === CONFIRM_DIALOG_TYPE) {
    const confirmOptions = optionsLocalized as ConfirmDialogOptions;
    // Localize button labels inline
    const okLabel = await localizeIfNeeded(confirmOptions?.okLabel);
    const cancelLabel = await localizeIfNeeded(confirmOptions?.cancelLabel);
    return showModalDialogOverlay('confirm', {
      title: confirmOptions?.title,
      message: confirmOptions?.prompt,
      okLabel,
      cancelLabel,
      destructive: confirmOptions?.destructive,
    });
  }

  // Existing rc-dock tab flow for all other dialog types
  // ...
}
```

`localizeIfNeeded` is a small helper that checks `isLocalizeKey` and calls `localizationService.getLocalizedString` if so, otherwise returns the value as-is. This keeps button label localization out of the shared `localizeDialogOptions` function.

The mapping from `DialogOptions.prompt` to the overlay's internal `message` field happens at this single translation point. The overlay's `ModalDialogOptions` uses `message` while `DialogOptions` uses `prompt` — these are semantically the same field. The translation is contained here so consumers only see `prompt` and the overlay rendering only sees `message`.

The `startDialogService` function's JSON Schema metadata for the `showDialog` network handler should also be updated to document the new `okLabel`, `cancelLabel`, and `destructive` option properties.

### 6. Call Flow

```
Extension (any process)
  → network call: dialog:showDialog('platform.alert', options)
    → dialog.service-host.ts (renderer)
      → localizeDialogOptions(options)
      → checks dialogType
      → 'platform.alert' or 'platform.confirm':
          → showModalDialogOverlay(type, mappedOptions)
            → overlay store + overlay-modal-dialog.component.tsx
            → user interacts → resolves promise
      → other types (selectProject, selectBooks, etc.):
          → webViewService.addTab() (rc-dock tab, as today)
```

Both the dialog service host and overlay service host run in the renderer process, so the internal call is a direct function import with no network hop.

## Files Changed

| File                                                                       | Change                                                                                                                                    |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `src/renderer/components/dialogs/dialog-definition.model.ts`               | Add `ALERT_DIALOG_TYPE`, `CONFIRM_DIALOG_TYPE`, `AlertDialogOptions`, `ConfirmDialogOptions`, `TabDialogTypes`, new `DialogTypes` entries |
| `src/renderer/services/dialog.service-host.ts`                             | Add routing branch with inline button label localization for alert/confirm → `showModalDialogOverlay()`                                   |
| `src/shared/models/overlay.service-model.ts`                               | Remove `showModalDialog` from `IOverlayService`                                                                                           |
| `src/renderer/services/overlay.service-host.ts`                            | Extract internal `showModalDialogOverlay()`. Remove `showModalDialog` from PAPI service object                                            |
| `src/renderer/components/dialogs/index.ts`                                 | Change `DIALOGS` mapped type to use `TabDialogTypes` instead of `DialogTabTypes`                                                          |
| `src/renderer/components/docking/platform-dock-layout-positioning.util.ts` | Update to use `TabDialogTypes`                                                                                                            |
| `src/renderer/components/docking/platform-dock-layout-storage.util.ts`     | Update to use `TabDialogTypes`                                                                                                            |
| `lib/papi-dts/papi.d.ts`                                                   | Regenerated — overlay service loses `showModalDialog`, dialog types gain alert/confirm                                                    |
| Extension consumers (e.g., `hello-rock3`)                                  | Migrate from `papi.overlays.showModalDialog()` to `papi.dialogs.showDialog('platform.alert', ...)`                                        |
| Tests                                                                      | Update overlay service tests to remove `showModalDialog`. Add dialog service tests for alert/confirm routing                              |
