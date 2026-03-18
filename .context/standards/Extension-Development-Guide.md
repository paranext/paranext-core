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
│   └── web-views/
│       ├── *.web-view.tsx   # React WebView components
│       └── *.web-view.scss  # WebView styles
├── manifest.json        # Extension metadata and entry points
├── package.json         # NPM package configuration
└── webpack/             # Build configuration
```

For complete details, see [Extension Anatomy wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy).

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

- Use **TailwindCSS** with the `pr-` prefix for theming
- Use semantic color variables (e.g., `pr-bg-card`) instead of hardcoded colors
- Support RTL/LTR layouts using logical properties (`start`/`end` instead of `left`/`right`)

---

## Contributions

Extensions contribute to Platform.Bible through JSON configuration files in `contributions/`:

### Settings (`settings.json`)

```json
{
  "extensionName.settingName": {
    "label": "%setting_label%",
    "default": "defaultValue"
  }
}
```

### Menus (`menus.json`)

```json
{
  "mainMenu.file": {
    "label": "%menu_label%",
    "order": 1,
    "items": [
      {
        "label": "%item_label%",
        "command": "extensionName.commandName"
      }
    ]
  }
}
```

### Localized Strings (`localizedStrings.json`)

```json
{
  "en": {
    "%setting_label%": "My Setting",
    "%menu_label%": "My Menu"
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
- [paranext-core-patterns.md](paranext-core-patterns.md) - Implementation patterns

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
