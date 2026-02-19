# Platform.Bible (paranext-core) - AI Coding Guidelines

## Architecture Overview

Platform.Bible is an Electron app with a multi-process architecture for extensible Bible translation software:

| Process              | Location              | Description                                           |
| -------------------- | --------------------- | ----------------------------------------------------- |
| **Main**             | `src/main/`           | Electron main process, app lifecycle                  |
| **Renderer**         | `src/renderer/`       | React frontend with WebViews                          |
| **Extension Host**   | `src/extension-host/` | Runs extensions, provides PAPI backend                |
| **C# Data Provider** | `c-sharp/`            | .NET 8 process for Paratext data (WebSocket JSON-RPC) |

**Shared code**: `src/shared/` contains models and services used across processes.

**Libraries** (`lib/`):

- `platform-bible-react` - React component library (Shadcn UI + Tailwind with `tw-` prefix)
- `platform-bible-utils` - Utility functions, types, Scripture types
- `papi-dts` - Generated type definitions for the Platform API

**Extensions** (`extensions/src/`): Core extensions bundled with the app. Each extension has `manifest.json`, `src/main.ts` entry point, and `src/types/<name>.d.ts` for type declarations.

## Critical Code Conventions

### TypeScript/JavaScript (enforced by ESLint)

- **No `any` type** - Use specific types, `unknown`, or generics instead of `any`
- **No type assertions (`as`)** - Use type guards or proper typing instead
- **No `null`** - Use `undefined` instead (exception: DOM APIs that require null)
- **No `for`/`for...in`/`for...of` loops** - Use `map`, `filter`, `reduce` for iteration
- **No unused variables** - Remove or use all declared variables and parameters
- **No variable shadowing** - Don't reuse variable names in nested scopes
- **Use strict equality** - Use `===`/`!==` instead of `==`/`!=`
- **No direct internal imports** - Don't import from `shared/*`, `renderer/*`, `node/*`, etc
- **Handle promises properly** - Always return or catch promises; use `async/await`
- **React hooks rules** - Follow rules of hooks; include all dependencies in `useEffect`
- **Avoid `console.*`** - Use the logger instead (warns on console usage)
- **Do not use `instanceof`** when values may cross execution environments (processes, extensions)
- **Prefer truthy/falsy checks** over `=== undefined` unless specifically needed

### File Naming

- Use **kebab-case** for filenames: `network-object.service.ts`
- Use pattern `<feature>.<type>.{ts,tsx}`: `.component.tsx`, `.hook.ts`, `.service.ts`, `.model.ts`
- Interface files use `.interface.ts`; class interfaces are prefixed with `I` (e.g., `INetworkConnector`)

### Cross-Process Communication

- **Always use `papi`** for cross-process calls - Never import from `shared/*`, `renderer/*`, `node/*` directly in extensions
- Extensions import from `@papi/backend` (extension host) or `@papi/frontend` (WebViews)
- **Do not pass functions or class instances** over the PAPI - only serializable data

### Naming Conventions

```typescript
// Commands: 'extensionName.commandName'
papi.commands.registerCommand('platformScripture.openResource', handler);

// Settings: 'extensionName.settingName'
('platform.interfaceLanguage');

// Network objects: lowercase with dashes
('quickVerse-data-provider');
```

### Code Style Patterns

- **Early return pattern** (guard clauses) - Add blank line after early returns
- **Use string unions** instead of multiple related booleans for finite states
- **Use `#` prefix** for truly private class methods (TypeScript `private` only works at compile time)
- **Use `throw new Error()`** not `throw Error()`
- **Use `async/await`** by default, comment if using `.then()` chains

## Git Conventions

- **Branch naming**: `pt-1234-my-feature` (JIRA task ID prefix, lowercase, kebab-case)
- **Always squash and merge** PRs - EXCEPT when updating from templates (use normal merge)
- **Announce breaking changes** in Discord `#platform-changes`

## Extension Development Patterns

### Entry Point Structure

```typescript
// extensions/src/<name>/src/main.ts
export async function activate(context: ExecutionActivationContext): Promise<void> {
  const disposable = await papi.commands.registerCommand('myExt.cmd', handler);
  context.registrations.add(disposable); // Always register for cleanup
}

export async function deactivate(): Promise<boolean> {
  return true;
}
```

### Type Extension Pattern

Extend PAPI types via declaration merging in `src/types/<name>.d.ts`:

```typescript
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'myExtension.myCommand': (arg: string) => Promise<void>;
  }
  export interface SettingTypes {
    'myExtension.mySetting': boolean;
  }
}
```

### Data Provider Pattern

```typescript
class MyDataProviderEngine extends DataProviderEngine<MyDataTypes> {
  async getMyData(selector: string): Promise<string> {
    /* ... */
  }
  async setMyData(
    selector: string,
    data: string,
  ): Promise<DataProviderUpdateInstructions<MyDataTypes>> {
    // Return '*' to update all, 'MyData' for specific type, false for no update
    return '*';
  }

  @papi.dataProviders.decorators.ignore // Exclude from data type methods
  private helperMethod() {
    /* ... */
  }
}
```

## Developer Commands

```powershell
# Install and build
npm install
npm run build

# Development (hot reload)
npm start

# Run tests
npm test                           # All TS tests
cd c-sharp-tests; dotnet test      # C# tests

# Build libraries (required after changes to lib/)
npm run build:platform-bible-react
npm run build:platform-bible-utils

# Linting
npm run lint
npm run format
```

## Key Files Reference

- `src/shared/services/papi-core.service.ts` - Core PAPI exports
- `src/shared/models/` - Data provider and network object interfaces
- `extensions/src/quick-verse/` - Example extension with data provider
- `extensions/src/hello-rock3/` - Fully featured extension example
- `extensions/src/hello-someone/` - Simpler extension example
- `lib/platform-bible-utils/src/` - Utility functions (check here before implementing common logic)

## Additional Resources

- [Code Style Guide](https://github.com/paranext/paranext/wiki/Code-Style-Guide)
- [Extension Template Wiki](https://github.com/paranext/paranext-extension-template/wiki)
- [Platform.Bible API Docs](https://paranext.github.io/paranext-core/)
