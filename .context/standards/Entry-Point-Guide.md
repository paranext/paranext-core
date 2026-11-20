---
title: Entry Point Registration Guide
description: How to register menu entry points (menu items, commands, keyboard shortcuts) for Platform.Bible extensions.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Entry Point Registration Guide

> Verified against paranext-core origin/main `998ca09a087` — 2026-08-03.

This guide documents how to register menu entry points for Platform.Bible extensions. Entry points are how users access features from the UI (menus, toolbar buttons, etc.).

## When to Use This Guide

Use this guide when:
- Adding menu items to access web views or dialogs
- Registering commands that open features
- Wiring up keyboard shortcuts
- Understanding the menu contribution system

---

## Overview

Entry point registration involves four files:
1. **menus.json** - Menu structure and item definitions
2. **main.ts** - Command handler registration
3. **types/{ext}.d.ts** - TypeScript command type declarations
4. **localizedStrings.json** - Localized labels for menu items

---

## Step 1: Identify Entry Points

Gather the menu items and commands the feature needs. For each entry point, note the menu path it should appear under, the command it invokes, and the label users will see.

---

## Step 2: Determine Menu Groups

Find the appropriate menu group by examining existing contributions:

```bash
# Check existing menu structure in the extension
cat extensions/src/{ext}/contributions/menus.json

# Check core menu groups (if needed)
grep -r "mainMenu" extensions/src/*/contributions/menus.json
```

### Common Menu Groups

| Group | Use Case |
|-------|----------|
| `platform.projectProjects` | Project creation, restore, management |
| `platform.help` | Help and documentation |
| `{ext}.tools` | Extension-specific tools |

### Creating New Groups

For new groups, define them in `menus.json`:

```json
{
  "mainMenu": {
    "groups": {
      "{ext}.{newGroup}": {
        "column": "platform.project",
        "order": 10
      }
    }
  }
}
```

---

## Step 3: Update Menu Contributions

For each entry point, add to `extensions/src/{ext}/contributions/menus.json`:

### Menu Item Structure

```json
{
  "mainMenu": {
    "columns": {},
    "groups": {},
    "items": [
      {
        "label": "%mainMenu_{feature}_{action}%",
        "localizeNotes": "Application main menu > {Column} > {Item}",
        "command": "{ext}.{commandName}",
        "group": "{groupName}",
        "order": {number}
      }
    ]
  }
}
```

**Notes:**
- Use `localizeNotes` to document the menu path for translators
- Order numbers determine sort order within the group
- Commands must match exactly what's registered in main.ts — with one exception: a web view's
  top-menu item can name a command id that its own `SelectMenuItemHandler` handles before any PAPI
  call, never registered in `main.ts`, and so can a context-menu item the web view runs itself
  (`shouldRunCommand: false`, see "Web View Context Menus"). The scripture editor's Edit flyout
  (Undo/Redo/Cut/Copy/Paste) and the clipboard items of its context menus work this way, because
  the clipboard needs the click's user activation, which a PAPI round trip loses.
  `EDIT_MENU_COMMANDS` in `extensions/src/platform-scripture-editor/src/edit-menu-actions.util.ts`
  is the list the handlers intercept, and a test keeps it matched to the menu. See
  `adr-menu-per-mode-layout-via-mode-gated-columns` in
  [Architecture-Decisions.md](Architecture-Decisions.md).

### Menu Availability: Gate Declaratively With Context Keys

A menu item can state when it is shown, enabled or checked with three optional properties in
`menus.json`, each a when-expression over context keys:

- `when` shows the item only while the expression is true (otherwise it is removed).
- `enabledWhen` greys the item out while the expression is false. Prefer this over `when`: a
  disabled item tells the user the feature exists. Use `when` instead when the item can never
  become enabled for that kind of target (the Scripture editor's Insert footnote, Undo and Comments
  items on a resource, `!platform.project.{projectId}.isResource`). On a resource the editor hides
  the whole Edit ▸ flyout this way and shows an "Edit" section instead, holding Copy (and Find in
  Power): items with the opposite `when`, in a group of the existing Edit column.
- `checkedWhen` shows a check mark on a command item while the expression is true.

**Hiding by interface mode.** `hiddenInterfaceModes` on an item still hides it in the named
interface modes. `filterItemsForInterfaceMode` in
`src/extension-host/services/menu-data.service-host.ts` applies it before any when-expression is
evaluated, and it is the tool for mode-based hiding; when-expressions are for runtime facts.

**Grammar.** Expressions combine context key references with `&&`, `||`, `!`, `==`, `!=` and
parentheses; operands are single-quoted strings, numbers, `true`/`false` and keys. A key is at
least two dot-separated segments, and a segment may be a `{templateVar}` filled in per menu. A key
that no producer has published is unknown and counts as false, so a gate on a negated fact
(`!…isResource`) is enabled until the producer publishes. Expressions are validated when the
contribution loads: a malformed expression or a template variable the surface does not provide
rejects the extension's whole `menus.json` contribution (extension-host log: 'Could not add menu
contribution'). So is `checkedWhen` on an item of a tab menu or overlay context menu, or
`enabledWhen` on a submenu item there. At runtime an expression that still fails to evaluate fails safe
(`when` hides, `enabledWhen` disables, `checkedWhen` unchecks).

**Template variables per surface.** Re-evaluation "including while open" is provisional until UX
review (PT-5037) confirms it; see "Choosing `when` vs `enabledWhen`" below.

| Surface | Variables | Honors |
|---|---|---|
| Main menu (toolbar, macOS menubar) | none | `when`, `enabledWhen`, `checkedWhen`; the macOS menubar updates enabled/checked in place and rebuilds when visibility or structure changes |
| Web view top menu | `{webViewId}`, `{webViewType}`, `{projectId}` | `when`, `enabledWhen`, `checkedWhen`, re-evaluated whenever a key it reads changes, including while open |
| Web view that renders its own menu | `{webViewId}`, `{webViewType}`, `{projectId}` (contribution validation rejects the whole contribution if any other is used); the web view evaluates through `useEvaluatedMenu` from `@papi/frontend/react`, supplying their values as a memoized object | same |
| Web view tab menu | `{webViewId}`, `{webViewType}` | `when`, `enabledWhen` (command items); re-evaluated whenever a key it reads changes, including while open; `checkedWhen` rejected at load |
| Web view overlay context menu | `{webViewId}`, `{webViewType}`, `{projectId}` | `when`, `enabledWhen` (command items); re-evaluated whenever a key it reads changes, including while open; `checkedWhen` rejected at load. `{projectId}` is looked up once per open, only when an item uses it. Also reads the request's own keys (`contextKeys`, experimental; see "Web View Context Menus" below) |

**Choosing `when` vs `enabledWhen`.** Provisional until UX review confirms it (as of 2026-11-05 that
review has not happened), together with menus updating while open, which the table above
describes; see D3 in `adr-menus-gate-declaratively-with-context-keys`. TODO(PT-5037): settle or
change this rule per that review, then drop the provisional wording here and above. Use
`enabledWhen` and `checkedWhen` for state that can change while a menu is open, and `when` for
state that does not. The one exception is tab menus and overlay
context menus, which show no check marks: there only `when` and `enabledWhen` (on command items)
apply. Menus re-evaluate only when a key they read changes.

**Key vocabulary.** Prefix every key with its owner. The platform uses
`platform.project.{projectId}.*` and `platform.*`; an extension uses
`<extension>.project.{projectId}.*` for facts about a project and
`<extension>.webView.{webViewId}.*` for facts about one tab. `{projectId}` is substituted in its
normalized upper-case form (`normalizeProjectId` from platform-bible-utils), the form C# publishes
under (`ProjectMetadata.Id` is upper case), so producers must build keys from that form. Keys are
plain facts (`isEditable`, `isSyncing`), never answers to "should this item show"; the expression
combines them. The Scripture editor's per-tab keys (`isReadOnly`, `isPreview`, `isSyncBlocked`,
`footnotesPaneVisible`, `hasSelection`) are examples: `isReadOnly` is the tab's read-only state,
which is fixed when the tab opens, so an item that edits text reads it next to the live project key
`platform.project.{projectId}.isEditable` and stays disabled in a tab that cannot edit (see PT-4786
for the snapshot).

Request-scoped keys (experimental) are plain facts too, but about one right-click only. They are
never published, so the producer rule below does not apply to them. The Scripture editor's context
menus read `platformScriptureEditor.contextMenu.hasSelection`,
`platformScriptureEditor.contextMenu.isMainEditor` and
`platformScriptureEditor.contextMenu.canFind`; the Enhanced Resources Scripture pane's reads
`platformEnhancedResources.contextMenu.hasSelection`. The short name `hasSelection` is used twice on
purpose: the shared per-tab key `platformScriptureEditor.webView.{webViewId}.hasSelection` drives
the top menu, and the request key `platformScriptureEditor.contextMenu.hasSelection` drives the
right-click menu. See "Web View Context Menus" below.

Each key has exactly **one producer process**: a TypeScript process refuses (logs, does not throw)
a write to a key another process wrote first; the .NET store does not check, so a C# write to
another process's key takes it over. A key released after its writer disconnected is claimable by
any process, and so is a key its producer withdrew with `remove`; a `set` refused because another
live process owned the key is applied once the key is released. C# `Remove` writes a live default
value (for example `null`, or `false` for a bool), not a release. Either way two producers on one
key race, so keep exactly one.

**Handlers still check.** Keyboard shortcuts and direct PAPI calls bypass menus, and a key can lag
the state it describes, so the command handler keeps its submission-time check and its
`PlatformError` (`PERMISSION_DENIED`, `FAILED_PRECONDITION`, ...). The menu gate is a courtesy to
the user, not the enforcement.

See `adr-menus-gate-declaratively-with-context-keys` in
[Architecture-Decisions.md](Architecture-Decisions.md) for the rationale, and the Context Keys
section of [Paranext-Core-Patterns.md](Paranext-Core-Patterns.md) for how to produce keys.

When a mode needs a different *section* structure, not just fewer items, give that mode its own
columns and gate items into them — see `adr-menu-per-mode-layout-via-mode-gated-columns`.

### Web View Context Menus

A web view's right-click menu is the `contextMenu` of its type under `webViewMenus` in
`menus.json`. The web view shows it by calling
`papi.overlays.showContextMenu(webViewType, webViewId, options)`. Everything in this section is
`@experimental` and may change without notice.

**Adding an item to another extension's context menu.** The groups of the Scripture editor's and
Enhanced Resources' context menus are not extensible, so add a group of your own under that web
view type's `contextMenu`, and put your items in it:

- Name the group with your own extension's prefix (`myExtension.contextTools`); the menu combiner
  rejects a group named after another extension.
- Give it an `order` no other group in that menu uses. The platform's two default groups take 1
  and 2, and the five menus listed under "What another extension's item receives" use 3 to 5. A
  duplicate order rejects your whole `menus.json` contribution.
- Put `"isExperimental": true` on the group, never on an item: an item carrying it rejects the
  whole `menus.json`.

**Showing your own context menu.** `showContextMenu` resolves with the picked command, or with
`undefined` when the user dismissed the menu or the menu has no visible item. Its `options`:

- **`position`**: where the menu opens, in coordinates relative to the web view's own frame (for
  example a mouse event's `clientX` / `clientY`).
- **`shouldRunCommand`**: `true` by default, which means the platform runs the picked command with
  no arguments. With `false` it runs nothing and the web view runs the pick itself. Use `false` for
  actions that must run in the web view's own frame, such as clipboard actions. Cut and Copy need
  the right-click's user activation, which a PAPI round trip loses. Paste reads the clipboard, which
  needs the web view's frame to hold focus, so the web view focuses its editor itself before it
  pastes.
- **`contextKeys`**: keys for this request only, for facts about the one right-click (is text
  selected in the editor that was clicked?). Each value is a `string`, `number` or `boolean`
  (`ContextKeyValue`). They are consulted first when the menu's `when` and `enabledWhen` are
  evaluated, for that menu only, and are never written to the shared context key service. Name them
  under your own prefix (`<extension>.contextMenu.*`) and never after a shared key: a request key
  shadows a shared key of the same name. Shared keys the expressions read still re-evaluate while
  the menu is open; a request key does not change.

The call rejects with a `PlatformError` in three normal cases; treat each as "no menu" and do not
report it: `ABORTED` (a newer context menu from the same web view replaced this one),
`RESOURCE_EXHAUSTED` (the request came within 50 ms of the previous one from that web view) and
`FAILED_PRECONDITION` (the tab is not visible). Report any other error.

```typescript
// `papi` and `logger` from '@papi/frontend'; the rest from 'platform-bible-utils'
const { webViewId } = globalThis;
const QUIET_CODES: string[] = [ABORTED, RESOURCE_EXHAUSTED, FAILED_PRECONDITION];

element.addEventListener('contextmenu', async (event) => {
  event.preventDefault();
  const hasSelection = !document.getSelection()?.isCollapsed;
  try {
    const command = await papi.overlays.showContextMenu('myExtension.myView', webViewId, {
      position: { x: event.clientX, y: event.clientY },
      shouldRunCommand: false,
      contextKeys: { 'myExtension.contextMenu.hasSelection': hasSelection },
    });
    if (command === 'myExtension.copySelection') document.execCommand('copy'); // in this frame
    else if (command) await papi.commands.sendCommand(command, webViewId);
  } catch (error) {
    if (!isPlatformError(error) || !QUIET_CODES.includes(error.code))
      logger.warn(`Context menu failed: ${getErrorMessage(error)}`);
  }
});
```

For an editor-like surface, use `useEditorContextMenu` from `platform-bible-react/experimental`
instead of writing this yourself. It claims the right-click (and Shift+F10 / the Menu key) inside
the editor's element, reads the browser's selection at that moment, claims the keyboard until the
menu request finishes or two seconds have passed, closes the menu on a scroll in the frame or on
unmount, ignores the three normal rejections, and calls back with the pick. The web view passes in the two platform calls
(`showContextMenu` and `dismissContextMenu`). The app's Scripture editors use it.

**More of the context-menu surface:**

- **`dismissContextMenu(webViewId)`** closes the web view's open context menu (its
  `showContextMenu` promise resolves `undefined`) and cancels one still being prepared, so it never
  opens. Use it when the web view knows the menu is stale: a scroll inside the frame never reaches
  the app window, and a book change moves the text under the menu.
- **Icons.** A context-menu item shows an icon before its label from `iconNameBefore` (a curated
  icon name) or `iconPathBefore` (an image), as a top-menu item does.
- **Two visible items with the same command cannot be told apart.** Items are identified by their
  command. Variants hidden by `when` or by interface mode are fine.

**What another extension's item receives.** Two kinds of context menu exist. In the menus of
`platformScriptureEditor.react`, `platformScriptureEditor.bibleTexts`,
`platformScriptureEditor.commentaries`, `platformScriptureEditor.modelText` and
`platformEnhancedResources.enhancedResource`, the web view runs the pick itself
(`shouldRunCommand: false`) and sends another extension's command as `(command, webViewId)`, so the
command learns which tab was clicked. In the menu of every other web view type the platform runs the
command with no arguments. So a command you put in both kinds of menu must work both with and
without the web view id.

See `adr-editor-context-menus-use-the-platform-menu` in
[Architecture-Decisions.md](Architecture-Decisions.md).

### Section Headings and Shortcut Hints

- **Headings come from columns.** In a tab's top menu each column is a section. When two or more
  columns have items, each is headed by its `label`; a column with no items (including one whose
  items are all hidden in the current interface mode) is not shown at all. So label columns as
  section titles, and hide a section by hiding its items. See `adr-menu-section-headings-from-column-labels`.
- **A section with no heading** sets `"isHeaderHidden": true` on its column. It is still divided
  from its neighbors, and while two or more sections are shown its `label` still names it for
  screen readers. A section left on its own — including one left alone by interface-mode
  filtering — gets neither a heading nor a name. Give it a real label regardless. The application
  menubar ignores the flag. See `adr-menu-per-mode-layout-via-mode-gated-columns`.
- **Do not add `shortcut` to `menus.json`** — the schema rejects it and the whole file fails to
  load. Hints come from the keyboard shortcuts catalog's `command` join; see
  `.claude/rules/keyboard-shortcuts-catalog.md` and `adr-menu-shortcut-hints-joined-from-catalog`.

---

## Step 4: Register Command Handlers

In `extensions/src/{ext}/src/main.ts`:

### Step A: Import WebView Types

Import options types from web view providers:

```typescript
import {
  ProjectPropertiesWebViewOptions,
  ProjectPropertiesWebViewProvider,
  PROJECT_PROPERTIES_WEB_VIEW_TYPE,
} from './project-properties.web-view-provider';
```

### Step B: Create Handler Function

Create a handler function with properly typed options:

```typescript
async function openNewProject(): Promise<string | undefined> {
  const options: ProjectPropertiesWebViewOptions = { mode: 'create' };
  return papi.webViews.openWebView(
    PROJECT_PROPERTIES_WEB_VIEW_TYPE,
    { type: 'float', floatSize: { width: 700, height: 800 } },
    options,
  );
}
```

### Step C: Register the Command

Register the command in the `activate()` function:

```typescript
const openNewProjectPromise = papi.commands.registerCommand(
  '{ext}.openNewProject',
  openNewProject,
  {
    method: {
      summary: 'Open the New Project dialog to create a new scripture project',
      params: [],
      result: {
        name: 'return value',
        summary: 'The ID of the opened web view',
        schema: { type: 'string' },
      },
    },
  },
);
```

### Step D: Add to Registrations

**Critical for proper lifecycle/cleanup:**

```typescript
context.registrations.add(
  // ... existing registrations ...
  await openNewProjectPromise,
);
```

---

## Step 5: Add Command Type Declarations

In `extensions/src/{ext}/src/types/{ext}.d.ts`, add command signatures to the `CommandHandlers` interface:

```typescript
export interface CommandHandlers {
  // ... existing commands ...

  /** Open the New Project dialog to create a new scripture project */
  '{ext}.openNewProject': () => Promise<string | undefined>;

  /** Open the Restore Project dialog to restore from backup */
  '{ext}.openRestoreProject': () => Promise<string | undefined>;

  /** Open the Interlinear Setup dialog (requires project context) */
  '{ext}.openInterlinearSetup': (
    projectId?: string | undefined,
  ) => Promise<string | undefined>;
}
```

**This is required for TypeScript type checking to pass.** Without these declarations, you'll get errors like:
```
error TS2345: Argument of type '"platformScripture.openNewProject"' is not assignable to parameter of type 'keyof CommandHandlers'.
```

---

## Step 6: Add Localized Strings

In `extensions/src/{ext}/contributions/localizedStrings.json`, add labels for **all supported languages**:

```json
{
  "localizedStrings": {
    "en": {
      "%mainMenu_newProject%": "New Project...",
      "%mainMenu_restoreProject%": "Restore Project...",
      "%mainMenu_interlinearSetup%": "Interlinear Setup..."
    },
    "es": {
      "%mainMenu_newProject%": "Nuevo proyecto...",
      "%mainMenu_restoreProject%": "Restaurar proyecto...",
      "%mainMenu_interlinearSetup%": "Configurar interlineal..."
    }
  }
}
```

### Conventions

- Use ellipsis (`...`) for menu items that open dialogs
- Match the string key pattern: `%mainMenu_{feature}_{action}%`
- Provide translations for both `en` and `es` sections

---

## WebView Layout Options Reference

When opening dialogs via commands, specify appropriate layout:

| Type | Use Case | Example Options |
|------|----------|-----------------|
| `float` | Modal dialogs, property sheets | `{ type: 'float', floatSize: { width: 700, height: 800 } }` |
| `panel` | Side panels, tool windows | `{ type: 'panel', direction: 'right', targetTabId: id }` |
| `tab` | Main content area | `{ type: 'tab' }` |

### Recommended Sizes

| Dialog Type | Dimensions |
|-------------|------------|
| Small dialogs | `{ width: 500, height: 400 }` |
| Medium dialogs | `{ width: 700, height: 600 }` |
| Large dialogs (property sheets) | `{ width: 700, height: 800 }` |
| Wide dialogs (grids/tables) | `{ width: 900, height: 700 }` |

---

## Entry Point Checklist

Complete this checklist for each entry point:

| Menu Path | Command | Label Key | menus.json | main.ts | types.d.ts | localized | Status |
|-----------|---------|-----------|------------|---------|------------|-----------|--------|
| Platform > New Project | {ext}.openNewProject | %mainMenu_newProject% | | | | | |
| Platform > Restore Project | {ext}.openRestoreProject | %mainMenu_restoreProject% | | | | | |

---

## Build Verification

Run build checks to verify the implementation:

```bash
# Run lint
npm run lint

# Run typecheck (critical - catches missing type declarations)
npm run typecheck

# Run build
npm run build

# Run tests
npm test
```

**Note:** When running `npm run typecheck`, you may encounter pre-existing issues in files you didn't modify. Check if errors are in files you changed vs. elsewhere. Pre-existing issues may need `@ts-expect-error` comments or separate fixes. Don't let unrelated issues block entry point implementation.

---

## Commit Entry Points

```bash
git add extensions/src/{ext}/contributions/menus.json
git add extensions/src/{ext}/contributions/localizedStrings.json
git add extensions/src/{ext}/src/main.ts
git add extensions/src/{ext}/src/types/{ext}.d.ts
git commit -m "{feature}: Register menu entry points

- Added {count} menu items to menus.json
- Registered {count} commands in main.ts
- Added command type declarations
- Added localized strings (en, es)"
```

---

## Troubleshooting

### TypeScript Errors

If you get `TS2345` errors about commands not being assignable:
1. Check `types/{ext}.d.ts` has the command declaration
2. Ensure the command name matches exactly in all locations
3. Run `npm run typecheck` to verify

### Menu Item Not Appearing

1. Verify `menus.json` is valid JSON
2. Check the `group` name matches a defined group
3. Verify the command name matches exactly in `main.ts`
4. Check console for registration errors

### Command Not Working

1. Check command handler is exported correctly
2. Verify `context.registrations.add()` includes the command
3. Check console for errors during `activate()`

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
| 1.1.0   | 2026-11-19 | Add "Web View Context Menus": adding an item to another extension's context menu, showing your own (`position`, `shouldRunCommand: false`, request-scoped `contextKeys`, the result and the normal rejections, an example, `useEditorContextMenu`), `dismissContextMenu`, icons, and what another extension's item receives (all experimental). |
