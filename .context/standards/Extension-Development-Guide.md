---
title: Extension Development Guide
description: Extension anatomy, lifecycle, PAPI usage, WebViews, and contribution points for Platform.Bible.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Extension Development Guide

This document provides a concise overview of extension development for Platform.Bible. For comprehensive details, refer to the linked wiki pages.

---

## Extension Anatomy

Extensions follow a standardized directory structure:

```
extension-name/
├── assets/              # Static files (icons, JSON marketplace data)
├── contributions/       # Configuration files (menus, settings, localized strings)
├── src/
│   ├── main.ts          # Backend entry point (must be named main.ts)
│   ├── types/
│   │   └── extension-name.d.ts  # Type declarations
│   └── web-views/        # (or flat in src/ — both layouts are used)
│       ├── *.web-view.tsx   # React WebView components
│       └── *.web-view.scss  # WebView styles
├── manifest.json        # Extension metadata and entry points
├── package.json         # NPM package configuration
└── webpack/             # Build configuration
```

For complete details, see [Extension Anatomy wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy).

### Presentational Components vs. WebView Entry Points

Keep pure presentational React in `src/components/*.component.tsx`, separate from the
`*.web-view.tsx` files that serve as WebView entry points.

- **Decision:** Reusable presentational components (those with dedicated Storybook
  stories, free of WebView provider plumbing) live in `src/components/` as
  `*.component.tsx`. The matching `*.web-view.tsx` entry point imports the component and
  supplies the PAPI/data wiring.
- **Avoid:** putting `*.web-view.tsx` (a WebView entry point) under `src/components/`.
- **Rationale:** `*.component.tsx` is a different concern from `*.web-view.tsx` — pure
  presentation versus the WebView entry point — so the two are kept in separate
  locations. `paratext-registration`, `platform-lexical-tools`, and `platform-scripture`
  follow this layout (e.g. `platform-scripture/src/checklist.web-view.tsx` imports
  `ChecklistTool` from `./components/checklist.component`).

#### Component import purity (PAPI-decoupled)

A presentational `*.component.tsx` must be free of any PAPI/platform runtime coupling:
all data flows in via props, and all platform wiring (data fetching, settings, the
`globalThis.webViewComponent` assignment) lives in the matching `*.web-view.tsx` entry
point or web view provider. This keeps components reusable, Storybook-renderable, and
unit-testable without a running app.

The rule is grep-enforceable — none of the following should match in any
`*.component.tsx` file:

```bash
grep -rnE "@papi/frontend|useData\b|useDataProvider\b|useSetting\b|papi\.|globalThis\.webViewComponent" \
  extensions/src/{ext}/src/components/
```

Any hit is a coupling leak: move it into the web view entry point/provider and pass the
result down as a prop.

---

## Backend Entry Point (main.ts)

The extension backend must export two functions:

```typescript
export async function activate(context: ExecutionActivationContext): Promise<void> {
  // Register commands, data providers, web views, etc.
  context.registrations.add(
    await commandPromise,
    await webViewProviderPromise,
    // ... all other registrations
  );
}

export async function deactivate(): Promise<boolean> {
  // Cleanup when extension unloads
  return true;
}
```

Extensions cannot use static imports—code must be bundled with webpack.

---

## PAPI (Platform API)

The Platform API enables extensions to interact with Platform.Bible:

### Core Services

| Service | Purpose |
|---------|---------|
| `papi.commands` | Register and send commands |
| `papi.dataProviders` | Register and access data providers |
| `papi.webViewProviders` | Register WebView providers |
| `papi.storage` | Extension-specific data storage |
| `papi.settings` | Access application settings |
| `papi.dialogs` | Show user dialogs |

### React Hooks (Frontend)

| Hook | Purpose |
|------|---------|
| `useData` | Subscribe to data provider data |
| `useDataProvider` | Access a data provider |
| `useProjectData` | Subscribe to project-specific data |
| `useSetting` | Access application settings |
| `useProjectSetting` | Access project-specific settings |

For complete PAPI documentation, see [PAPI wiki](https://github.com/paranext/paranext-extension-template/wiki/PAPI).

---

## Data Providers

Data providers mediate communication between frontend and backend:

```typescript
class MyDataProviderEngine implements IDataProviderEngine<MyDataTypes> {
  async getDataType(selector: string): Promise<Data> { /* ... */ }
  async setDataType(selector: string, data: Data): Promise<DataProviderUpdateInstructions> { /* ... */ }
}

// Registration
const provider = await papi.dataProviders.registerEngine(
  'extensionName.dataProviderName',
  new MyDataProviderEngine()
);
context.registrations.add(provider);
```

---

## WebViews

WebViews are React components rendered in sandboxed iframes:

```typescript
// my-component.web-view.tsx
import { useData } from '@papi/frontend/react';

globalThis.webViewComponent = function MyWebView() {
  const [data] = useData('extensionName.dataProvider').DataType('selector');
  return <div>{data}</div>;
};
```

### Sandbox Constraints

WebViews run in sandboxed iframes with restricted permissions:

#### No `<form>` Elements

The sandbox does not have `allow-forms` permission. Form submissions are blocked even with `e.preventDefault()`.

**Pattern:** Use `<div>` with handlers instead:

```tsx
// ❌ BAD - causes sandbox error
<form onSubmit={handleSubmit}>
  <Button type="submit">OK</Button>
</form>

// ✅ GOOD - works in sandbox
<div onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
  <Button type="button" onClick={handleSubmit}>OK</Button>
</div>
```

#### Select Component Constraints

The Select component's value prop cannot be an empty string:

```tsx
// ❌ BAD - crashes with "value prop cannot be empty string"
<SelectItem value="">(None)</SelectItem>

// ✅ GOOD - use sentinel value
<SelectItem value="__none__">(None)</SelectItem>
// Handle in onChange: value === '__none__' ? undefined : value
```

#### React Key Anti-Patterns

Never use editable content in list item keys:

```tsx
// ❌ BAD - key changes when name changes, causing focus loss
{items.map(item => <Input key={item.name} value={item.name} />)}

// ✅ GOOD - stable key
{items.map(item => <Input key={item.id} value={item.name} />)}
```

### Styling Requirements

- Use **TailwindCSS** (Tailwind v4) with the `tw:` prefix for theming
- Use semantic color variables (e.g., `tw:bg-card`) instead of hardcoded colors
- Support RTL/LTR layouts using logical properties (`start`/`end` instead of `left`/`right`)

---

## Contributions

Extensions contribute to Platform.Bible through JSON configuration files in `contributions/`:

### Settings (`settings.json`)

`settings.json` is an **array of setting groups**. Each group has a `label` and a
`properties` object keyed by `<extension>.<settingId>`:

```json
[
  {
    "label": "%settings_group_label%",
    "properties": {
      "extensionName.settingName": {
        "label": "%setting_label%",
        "default": "defaultValue"
      }
    }
  }
]
```

### Menus (`menus.json`)

The main menu is defined under a `"mainMenu"` object with `columns`, `groups`, and
an `items` **array**. Each item references a `group` and a `command` (there is no
`"mainMenu.file"` key):

```json
{
  "mainMenu": {
    "columns": {},
    "groups": {},
    "items": [
      {
        "label": "%item_label%",
        "localizeNotes": "Application main menu > Column > Item",
        "group": "groupName",
        "order": 1,
        "command": "extensionName.commandName"
      }
    ]
  }
}
```

### Localized Strings (`localizedStrings.json`)

The language map is nested under a `"localizedStrings"` key, alongside a sibling
`"metadata"` object (use `{}` when there is no metadata):

```json
{
  "metadata": {},
  "localizedStrings": {
    "en": {
      "%setting_label%": "My Setting",
      "%item_label%": "My Menu Item"
    }
  }
}
```

For complete contribution examples, see [Extension Development How-To Guide wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Development-'How-To'-Guide).

---

## Type Declarations

Declare shared types in `src/types/extension-name.d.ts`:

```typescript
declare module 'extension-name' {
  import type { DataProviderDataType, IDataProvider } from '@papi/core';

  export type MyDataTypes = {
    DataTypeName: DataProviderDataType<Selector, ReturnType, SetType>;
  };

  export type IMyProvider = IDataProvider<MyDataTypes>;
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'extensionName.commandName': (param: Type) => Promise<Result>;
  }

  export interface DataProviders {
    'extensionName.dataName': IMyProvider;
  }
}
```

---

## Running Extensions

Load extensions via command-line arguments:

```bash
# Load specific extension
platform-bible --extensions /path/to/extension

# Load from extension directory
platform-bible --extensionDirs /path/to/extensions/folder
```

---

## Merging Template Updates

Keep your extension synchronized with template improvements:

```bash
# One-time: Add template as remote
git remote add template https://github.com/paranext/paranext-extension-template.git

# Fetch and merge updates
git fetch template
git checkout main
git merge template/main --allow-unrelated-histories
```

**Important:** Never squash template merges—use normal merge to preserve git history.

For details, see [Merging Template Changes wiki](https://github.com/paranext/paranext-extension-template/wiki/Merging-Template-Changes-into-Your-Extension).

---

## Related Documentation

- [Extension Anatomy wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy)
- [PAPI wiki](https://github.com/paranext/paranext-extension-template/wiki/PAPI)
- [Extension Development How-To Guide wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Development-'How-To'-Guide)
- [System Architecture wiki](https://github.com/paranext/paranext-extension-template/wiki/System-Architecture)
- [Security-Guide.md](Security-Guide.md) - Module restrictions and sandboxing
- [Code-Style-Guide.md](Code-Style-Guide.md) - Coding conventions
- [Paranext-Core-Patterns.md](Paranext-Core-Patterns.md) - Implementation patterns

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
