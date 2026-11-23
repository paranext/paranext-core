---
name: extension-creator
description: "[paranext-core ONLY] Create new extensions using the proper template workflow. Ensures git subtree tracking is set up correctly so extensions can receive future template updates. Use whenever a new extension is needed for feature implementation."
allowed-tools: Bash, Read
---

# Extension Creator Skill

Create new extensions in paranext-core/extensions following the proper template workflow.

## CRITICAL: Why This Skill Exists

Extensions MUST be created using the template workflow to:
1. Set up **git subtree tracking** for future template updates
2. Ensure proper **merge/squash commits** that Git uses for diffs
3. Enable automatic updates when `paranext-extension-template` improves

**DO NOT manually create extension folders.** This breaks template tracking.

## Quick Reference

| Action | Command |
|--------|---------|
| Create extension | `npm run create-extension -- <extension-name>` |
| Update from templates | `npm run update-from-templates` |
| Check remotes | `git remote -v \| grep template` |

## Prerequisites

Before creating an extension:

```bash
# Verify you're in the extensions directory
cd /path/to/paranext-core/extensions

# Check for uncommitted changes (MUST be clean)
git status
# If dirty, commit or stash changes first

# Verify template remotes exist
git remote -v | grep -E "(paranext-multi-extension-template|paranext-extension-template)"
# If missing, run: npm install (adds remotes automatically)
```

## Creating a New Extension

### Step 1: Ensure Clean Working Directory

```bash
cd /path/to/paranext-core/extensions
git status
# Must show "nothing to commit, working tree clean"
```

### Step 2: Run the Create Script

```bash
# Use kebab-case for extension names
npm run create-extension -- <extension-name>

# Examples:
npm run create-extension -- project-notes
npm run create-extension -- checking-tool
npm run create-extension -- parallel-passages
```

### Step 3: Apply Required Post-Creation Fixes (CRITICAL)

The template creates placeholder content that **MUST** be customized before the extension will typecheck correctly. Apply ALL fixes below:

#### 3a. Verify tsconfig.json typeRoots

The template's path-fixing regex should set `typeRoots` to use `../../../` relative paths (monorepo-relative). **Verify they are correct:**

```jsonc
// extensions/src/<ext>/tsconfig.json - typeRoots MUST look like this:
"typeRoots": [
  "../../../node_modules/@types",
  "../../../lib",
  "../../../extensions/src",
  "../../../src/@types",
  "src/types"
]
```

If any paths start with `../paranext-core/` or `../../`, they are WRONG. Fix them to `../../../` (three levels up from `extensions/src/<ext>/`).

**Reference**: `extensions/src/platform-scripture/tsconfig.json` is the canonical pattern.

#### 3b. Add `typecheck` Script to package.json

The template may not include a `typecheck` script. Without it, `npm run typecheck` at the repo root **silently skips** the extension.

```bash
# Check if script exists
grep '"typecheck"' extensions/src/<ext>/package.json || echo "MISSING - must add"
```

If missing, add to `scripts` section:

```json
"typecheck": "tsc -p ./tsconfig.json"
```

#### 3c. Declare Commands in papi-shared-types

Any PAPI commands the extension registers MUST be declared in the extension's `.d.ts` file:

```typescript
// src/types/<ext>.d.ts
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    '<extCamelCase>.<commandName>': (args...) => Promise<ReturnType>;
  }
}
```

Without this declaration, TypeScript will reject `papi.commands.registerCommand('<extCamelCase>.<commandName>', ...)`.

#### 3d. Use `global.webViewComponent` (NOT `globalThis`)

The template may use `globalThis.webViewComponent`. In strict TypeScript mode, this causes:

```
Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature
```

**Fix**: Use `global.webViewComponent` instead:

```typescript
// WRONG - TypeScript strict mode error
globalThis.webViewComponent = function MyWebView({ ... }: WebViewProps) { ... };

// CORRECT - works with strict mode
global.webViewComponent = function MyWebView({ ... }: WebViewProps) { ... };
```

**Reference**: `extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx` uses `global.webViewComponent`.

#### 3e. Type Custom WebView Options Correctly

When opening web views with custom options, create a typed interface and pass a typed variable (NOT an inline object literal):

```typescript
// In web-view-provider.ts
import { OpenWebViewOptions } from '@papi/core';

export interface MyWebViewOptions extends OpenWebViewOptions {
  mode?: string;
  projectId?: string;
}

// In main.ts - CORRECT: typed variable
const options: MyWebViewOptions = { mode: 'create' };
return papi.webViews.openWebView(webViewType, layoutOptions, options);

// WRONG: inline object literal triggers excess property check
return papi.webViews.openWebView(webViewType, layoutOptions, { mode: 'create' });
```

#### 3f. Verify TypeScript Compiles (MANDATORY)

After ALL customizations, run typecheck to catch errors early:

```bash
npx tsc --noEmit --project extensions/src/<ext>/tsconfig.json
```

`npm run build` uses transpile-only mode (webpack) and **will NOT catch type errors**. Always run the explicit typecheck.

### Step 4: Customize Extension Content

After the required fixes, customize these files in `src/<extension-name>/`:

| File | Customization |
|------|---------------|
| `package.json` | Update description, ownership, replace `paranextExtensionTemplate` placeholders with <extension-name> |
| `manifest.json` | Set display name, permissions, web view types, replace `paranextExtensionTemplate` placeholders with <extension-name> |
| `src/main.ts` | Implement extension entry point |
| `src/types/<ext>.d.ts` | Define extension's PAPI types + CommandHandlers, replace `paranextExtensionTemplate` placeholders with <extension-name> |
| `assets/displayData.json` | Replace `paranextExtensionTemplate` placeholders with <extension-name> |
| `contributions/localizedStrings.json` | Add localized strings (English + Spanish) |

### Step 5: Commit the New Extension

The `create-extension` script creates merge commits automatically. Commit any additional customizations:

```bash
git add .
git commit -m "Add <extension-name> extension

Initial setup from paranext-extension-template"
```

## Extension Naming Conventions

| Context | Case | Example |
|---------|------|---------|
| Folder name | kebab-case | `project-notes` |
| npm package | kebab-case | `project-notes` |
| PAPI commands | lowerCamelCase | `projectNotes.getData` |
| TypeScript types | PascalCase | `ProjectNotesDataProvider` |
| .d.ts module | kebab-case | `project-notes.d.ts` |

## Updating Extensions from Template

When `paranext-extension-template` receives updates:

```bash
cd /path/to/paranext-core/extensions
npm run update-from-templates
```

If merge conflicts occur:
1. Resolve conflicts
2. Complete the commit
3. Run the script again

## What the Script Does

The `npm run create-extension` script:

1. Fetches latest `paranext-extension-template main`
2. Creates folder via `git subtree add --prefix extensions/src/<name>`
3. Uses `--squash` to create proper merge commit
4. Runs regex replacements to fix relative paths
5. Sets up tracking for future template merges

## DO NOT Do This

❌ **Manual folder creation** - loses template tracking:
```bash
# WRONG - don't do this!
mkdir -p extensions/src/my-extension
cp -r some-template/* extensions/src/my-extension/
```

❌ **Direct git subtree** without path fixes:
```bash
# INCOMPLETE - missing path corrections
git subtree add --prefix extensions/src/my-ext paranext-extension-template main --squash
```

## NEVER Rename Extensions

⛔ **Extensions cannot be renamed after creation.**

Renaming an extension folder will break:
- Git subtree tracking (template updates fail)
- Extension loading (Platform.Bible expects original name)
- User settings and data tied to extension ID
- Other extensions that depend on it

**Choose the extension name carefully when creating it.** The name is permanent.

If you absolutely must change an extension's identity:
1. Create a NEW extension with the desired name
2. Migrate code and data manually
3. Deprecate the old extension (do not delete immediately)
4. Coordinate migration with users/dependent extensions

## Verifying Template Tracking

Check that template remotes are configured:

```bash
git remote -v | grep -E "paranext.*template"
```

Expected output:
```
paranext-extension-template    https://github.com/paranext/paranext-extension-template (fetch)
paranext-extension-template    https://github.com/paranext/paranext-extension-template (push)
paranext-multi-extension-template    https://github.com/paranext/paranext-multi-extension-template (fetch)
paranext-multi-extension-template    https://github.com/paranext/paranext-multi-extension-template (push)
```

## Troubleshooting

### "Template remote not found"

```bash
npm install  # Adds remotes automatically
# Or manually:
git remote add paranext-extension-template https://github.com/paranext/paranext-extension-template
```

### "Working tree not clean"

```bash
git stash  # Save changes temporarily
npm run create-extension -- <name>
git stash pop  # Restore changes
```

### "Subtree merge conflict"

Resolve conflicts manually, then:
```bash
git add .
git commit  # Complete the merge
```

## See Also

- [extensions/README.md](../../../extensions/README.md) - Full extension development guide
- [Extension Anatomy wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy) - File structure details
