# Contribution-Only Context Menus

**Date:** 2026-03-23
**Status:** Approved

## Problem

The overlay service has two parallel type systems for context menus:

1. **`ContextMenuItem`** - a discriminated union (`item`, `separator`, `submenu`, `checkbox`, `radio`) used by the direct `showContextMenu(request)` API
2. **`SingleColumnMenu`** - the menu.json contribution format (`MenuItemContainingCommand`, `MenuItemContainingSubmenu` with groups and ordering)

The overlay service bridges them via `convertContributionToContextMenuItems()` and `showContextMenuFromContribution()`. This duplication means two ways to define the same thing, with the direct API supporting types (checkbox, radio, destructive) that have no contribution equivalent.

## Decision

Eliminate `ContextMenuItem` as a public type. Context menus are always defined via menu.json contributions. The overlay service fetches, converts, renders, and auto-executes the selected command.

## Public API

```typescript
interface OverlayService {
  /**
   * Show a context menu from menu.json contributions registered for the given webViewType. Fetches
   * menu data, renders the menu, and auto-executes the selected command. Returns the command string
   * that was executed, or undefined if dismissed.
   */
  showContextMenu(
    webViewType: string,
    webViewId: string,
    options?: { position?: { x: number; y: number } },
  ): Promise<string | undefined>;
}
```

Changes from current API:

- Replaces both `showContextMenu(request, webViewId)` and `showContextMenuFromContribution(menuId, webViewId, context)`
- Returns `string | undefined` (selected command string) instead of `ContextMenuResult | undefined`
- Auto-executes the selected command via `papi.commands.sendCommand()` before returning
- If no `contextMenu` is defined for the given `webViewType`, returns `undefined` without rendering

## Internal Rendering Types

`ContextMenuItem` becomes an internal (non-exported) type in a shared internal file (e.g., `overlay-context-menu.types.ts`) imported by both the converter and the React component:

```typescript
// Internal to overlay service - not exported from the package
type ContextMenuItem =
  | {
      type: 'item';
      id: string; // command string
      label: string; // already localized
      icon?: string;
      shortcut?: string; // display-only hint
      disabled?: boolean;
    }
  | { type: 'separator' }
  | {
      type: 'submenu';
      label: string;
      icon?: string;
      items: ContextMenuItem[];
    };
```

Removed from current type:

- `checkbox` variant
- `radio` variant
- `destructive` field on `item`
- `LocalizeKey` union on labels (localization happens during conversion; internal types hold already-localized strings)

## Converter and Command Execution

**Converter** (`overlay-menu-converter.ts`): No logic changes needed. Already only produces `item`, `separator`, and `submenu` types from `Localized<SingleColumnMenu>`. Import path changes to reference the new internal types file.

**Command execution flow** in `showContextMenu()`:

1. Fetch `WebViewMenu` from menu data service using `webViewType`
2. If no `contextMenu` defined, return `undefined`
3. Convert to internal `ContextMenuItem[]`
4. If conversion produces zero items, return `undefined`
5. Render and wait for user selection or dismissal
6. If an item is selected, execute the command via `papi.commands.sendCommand(commandId)`
7. Return the command string, or `undefined` if dismissed

**`sendCommand` type safety:** The command string from menu contributions is a `ReferencedItem` (branded `${string}.${string}`), not a typed `CommandNames` member. The implementation will need a cast or an untyped command dispatch helper, consistent with how the top menu bar handles this.

## Types Removed from Public Surface

- `ContextMenuItem` (becomes internal, non-exported)
- `ContextMenuRequest`
- `ContextMenuResult`

Updates required:

- `overlay.service-model.ts`: Remove exports, update `OverlayEntry` resolve type from `ContextMenuResult | undefined` to `string | undefined`
- `papi.d.ts`: Generated types will reflect the new `showContextMenu` signature

## Component Changes

`overlay-context-menu.component.tsx` drops:

- Checkbox item rendering
- Radio item rendering
- Destructive item styling

## Existing Caller Migration

One caller exists: `hello-rock3` (demo extension). Currently uses direct `showContextMenu()` with inline `ContextMenuItem[]` including checkbox, radio, destructive items, and a manual switch statement to dispatch actions.

Migration:

1. Strip checkbox, radio, and destructive demo items entirely (these demonstrated now-removed features)
2. Define remaining menu items in hello-rock3's menu.json contributions
3. Register remaining actions as PAPI commands where they aren't already
4. Replace `showContextMenu(request, webViewId)` with `showContextMenu('helloRock3.helloRock3', webViewId, { position })`
5. Remove the manual switch statement - commands auto-execute
6. Update any related e2e tests (e.g., `overlay-contribution-menu.spec.ts`)

## Out of Scope

- **Conditional menu items** (`when` clauses, enable/disable at display time): Known gap across all menu types. Will be solved as a common mechanism, not context-menu-specific.
- **Command arguments/context passing**: Commands that need runtime context (e.g., which verse was right-clicked) is the same cross-cutting gap as conditional items. Will be solved for all menus together.
- **Extending `SingleColumnMenu` with checkbox/radio**: Can be added later if needed, at which point the internal rendering types can be re-extended.
