# React 19 Backwards Compatibility Design

## Problem

Upgrading Platform.Bible from React 18 to React 19 breaks some extensions because:

### Breaking change 1: `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` removed

React 19 completely removed `React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` from its module exports — accessing it returns `undefined`. Libraries bundled inside extensions that access `React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner` crash with:

```
TypeError: Cannot read properties of undefined (reading 'ReactCurrentOwner')
```

**Confirmed affected extension:** Text Collection (`paratext-bible-text-collection`)
**Confirmed affected library:** `allotment` (pre-minified production bundle, so the property access is not visible as a string literal in source)

### Breaking change 2: React 19 detects stale bundled copies of React

React 19's reconciler now throws when it encounters elements created by a different React version in the same tree:

```
Error: A React Element from an older version of React was rendered. This is not supported.
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
```

**Root cause:** `@eten-tech-foundation/platform-editor` v0.8.13 (installed in `paratext-bible-extensions`) has a **nested** `node_modules` containing `@lexical/react` v0.40.0 and `lexical` at an older version. When webpack builds an extension bundle, it resolves `@lexical/react/*` imports from the platform-editor dist to this nested v0.40.0 (nearest `node_modules` wins). Code compiled against @lexical/react v0.40.0 may create React elements that React 19's reconciler considers stale.

**Why the nested copy exists:** npm creates a nested `node_modules` inside a package when the package's dependency versions conflict with what the parent resolved. The nested v0.40.0 likely persists from a time when platform-editor depended on an older lexical version.

## What is NOT fixable at the platform level

Third-party extensions that directly bundle their own copy of React (i.e., their webpack config does not list `react` as external and the extension's source code imports React directly without going through `webViewRequire`) cannot be rescued by any platform-level shim. The platform can only provide compatibility for libraries that:

1. Access React via `require('react')` / `webViewRequire` (so the platform controls what they receive), and
2. Use React APIs that existed in React 18 and still exist (or can be shimmed) in React 19.

## Solution

Three coordinated changes across two repositories.

---

### Change 1: `__SECRET_INTERNALS` compat shim (paranext-core)

**File:** `src/renderer/global-this-web-view.model.ts`

Instead of registering the raw React 19 module in `moduleMap`, register a wrapped version that adds back `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` with a minimal stub:

```ts
const reactCompat = {
  ...ReactModule,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: { current: null },
    ReactCurrentBatchConfig: { transition: null },
  },
};
moduleMap.set('react', reactCompat);
```

**Semantics:** The stubbed `ReactCurrentOwner` is inert — React 19 no longer uses it for rendering. Libraries that only check for its existence or set flags on it (the common usage in `allotment`, `rc-util`, etc.) will stop crashing. Libraries that relied on it carrying real rendering state (e.g., reading the current fiber for error reporting) will not behave exactly as they did under React 18, but this is acceptable since those internals were always private and unsupported.

**Scope:** This fixes libraries that access the removed internal via `require('react')` (i.e., through `webViewRequire`). It does not fix libraries that have React bundled inside them.

---

### Change 2: Add `yjs` to the provided modules (paranext-core)

**File:** `src/renderer/global-this-web-view.model.ts`

Add `yjs` to the `moduleMap` alongside `react` and `react-dom`:

```ts
import * as Yjs from 'yjs';
// ...
moduleMap.set('yjs', Yjs);
```

Also add `yjs` to `package.json` dependencies if not already present.

**Rationale:** `@eten-tech-foundation/platform-editor` (and any extension using collaborative editing) depends on `yjs`. yjs uses shared document state internally; having multiple instances (one per extension, one in the platform) means collaborative CRDT operations between extensions would silently fail or diverge. Providing a single shared `yjs` instance from the platform ensures all extensions share one document state, the same way `react` is shared.

**Scope:** Once `yjs` is in `moduleMap`, extension webpack configs can list `'yjs'` as external (same pattern as `'react'`), and `webViewRequire('yjs')` will resolve to the platform's instance.

---

### Change 3: Fix `scripture-editors` platform package (scripture-editors repo)

**File:** `scripture-editors/packages/platform/vite.config.mts`

The vite config already correctly externalizes `react`, `react-dom`, `react/jsx-runtime`, `yjs`, and all `@lexical/*` / `lexical*` packages. The dist output (`dist/index.js`) uses proper ESM `import` statements for all of these — nothing is bundled inside.

**The real problem** is not in the dist itself but in how npm resolves `@lexical/react` when an extension uses platform-editor as a dependency. npm installed a nested `@lexical/react` v0.40.0 inside platform-editor's `node_modules`, and webpack uses this nested copy (nearest wins) rather than the outer compatible v0.43.0.

**Fix:** Move lexical packages from `dependencies` to `peerDependencies` in `packages/platform/package.json`:

```json
{
  "peerDependencies": {
    "react": ">=18.3.1",
    "react-dom": ">=18.3.1",
    "yjs": ">=13.5.22",
    "@lexical/react": "^0.43.0",
    "@lexical/selection": "^0.43.0",
    "@lexical/text": "^0.43.0",
    "@lexical/utils": "^0.43.0",
    "@lexical/yjs": "^0.43.0",
    "lexical": "^0.43.0"
  },
  "peerDependenciesMeta": {
    "yjs": { "optional": true },
    "@lexical/yjs": { "optional": true }
  }
}
```

With lexical in `peerDependencies`, npm will not create a nested `node_modules` for it. Consumers (extensions) must provide a compatible version themselves, which they will — either by having it in their own `node_modules` or via webpack resolving it from the paranext-core monorepo.

The vite `external` array already spreads both `Object.keys(packageData.peerDependencies ?? {})` and `Object.keys(packageData.dependencies ?? {})`, plus the `@lexical/*` and `lexical*` regexes. No change to `vite.config.mts` is needed — moving lexical from `dependencies` to `peerDependencies` in `package.json` is sufficient, because peerDependencies are already included in the external spread.

**Workspace dependency check:**

- `@eten-tech-foundation/scripture-utilities` (`packages/utilities`): No React or lexical dependencies. Only `@xmldom/xmldom`. No changes needed.
- `@eten-tech-foundation/scribe-editor` (`packages/scribe`): Has `react`, `react-dom`, `react/jsx-runtime`, `@lexical/*`, and `lexical*` already externalized in its vite config. Does NOT currently externalize `yjs` — add it. `scribe` is not a dependency of `platform`, so this is a separate consumer-side fix.

**After these changes:** Rebuild and publish a new version (e.g., `0.8.16`) of `@eten-tech-foundation/platform-editor`. Update `paratext-bible-extensions` and `paranext-core` to use the new version.

---

### Extension webpack config changes

Once the platform provides `yjs` via `webViewRequire`, update the extension template and existing extensions to add `yjs` to the externals list:

**File:** `extensions/src/*/webpack/webpack.config.base.ts` (and the multi-extension template)

```ts
externals: [
  'crypto',
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  'yjs',          // ← add
  '@papi/backend',
  '@papi/core',
  '@papi/frontend',
  '@papi/frontend/react',
  '@sillsdev/scripture',
  'platform-bible-utils',
],
```

---

## Limitations and known gaps

- **Third-party extensions that bundle their own React** cannot be fixed by this approach. The error message clearly identifies these ("A library pre-bundled an old copy of 'react'"). Extension authors must ensure all React-dependent libraries they bundle treat React as a peer dependency (not a bundled dependency).
- **The `ReactCurrentOwner` stub is inert.** Libraries that relied on it for real rendering semantics (reading the current fiber owner) will not behave identically to React 18. In practice, the known use cases (warning suppression, defensive checks) are safe.
- **Lexical version pinning.** Moving `@lexical/react` to peerDependencies shifts the version responsibility to extension authors. Extensions that use platform-editor's Lexical-based components must ensure they have a compatible `@lexical/react` version available. This is documented as a requirement.

## Files changed summary

| Repo              | File                                              | Change                                                                       |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------- |
| paranext-core     | `src/renderer/global-this-web-view.model.ts`      | Add `__SECRET_INTERNALS` compat shim to React module; add `yjs` to moduleMap |
| paranext-core     | `package.json`                                    | Add `yjs` to dependencies                                                    |
| paranext-core     | `extensions/src/*/webpack/webpack.config.base.ts` | Add `yjs` to externals                                                       |
| scripture-editors | `packages/platform/package.json`                  | Move lexical packages from dependencies to peerDependencies                  |
| scripture-editors | `packages/platform/vite.config.mts`               | No change needed (already spreads peerDependencies)                          |
| scripture-editors | `packages/scribe/vite.config.mts`                 | Add `yjs` to external                                                        |
