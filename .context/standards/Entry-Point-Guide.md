---
title: Entry Point Registration Guide
description: How to register menu entry points (menu items, commands, keyboard shortcuts) for Platform.Bible extensions.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Entry Point Registration Guide

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
- Commands must match exactly what's registered in main.ts

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
