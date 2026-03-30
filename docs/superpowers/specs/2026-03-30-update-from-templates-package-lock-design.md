# Design: Auto-resolve `package-lock.json` conflicts in `update-from-templates`

**Date:** 2026-03-30
**Status:** Approved

## Background

The `extensions/` directory and each `extensions/src/*` extension folder are npm workspaces.
Because they are workspaces, the `package-lock.json` files that the template repos include are
unused and should not exist in paranext-core. However, deleting them causes a recurring
modify/delete merge conflict every time the templates update their `package-lock.json`.

The goal is to make the `npm run update-from-templates` process automatically resolve these
conflicts (by deleting the files) so that only genuine conflicts in other files interrupt the
process.

## Scope

Changes are confined to two files:

- `extensions/lib/git.util.ts` — shared git utilities
- `extensions/lib/update-from-templates.ts` — the update script

## Design

### 1. Workspace safety check (shared utility, `git.util.ts`)

A helper used by all deletion logic:

```
isUnusedWorkspacePackageLock(repoRootRelativePath: string): Promise<boolean>
```

Returns `true` if:

1. The path's parent directory (via `path.dirname`) is `extensions` exactly, OR begins with
   `extensions/` — i.e. `parentDir === 'extensions' || parentDir.startsWith('extensions/')`.
   This guards against accidentally touching lock files in `lib/*` or other workspaces. **and**
2. The parent directory matches one of the workspace glob patterns in the root `package.json`
   `workspaces` array, using `minimatch` (added as an explicit dependency to `extensions/package.json`).

This prevents accidentally deleting `package-lock.json` files that are genuinely in use (e.g.,
standalone tools outside the workspace).

The root `package.json` is read from `<repo-root>/package.json` (resolved via `__dirname`).

### 2. `resolvePackageLockConflicts` (`git.util.ts`)

New exported async function called from the `catch` blocks of `git subtree pull` commands.

**Algorithm:**

1. Run `git status --porcelain` (v1 format — intentionally different from `checkForWorkingChanges`
   which uses `--porcelain=v2`; v1 is simpler for conflict-code parsing).
2. Parse every line: first two characters are the XY status code; the rest (after one space) is
   the repo-root-relative path.
3. Identify conflict lines — those whose XY code is one of:
   `DD`, `AU`, `UD`, `UA`, `DU`, `AA`, `UU`.
4. Partition conflict lines into:
   - `packageLockConflicts` — conflict lines where path ends with `package-lock.json` **and**
     `isUnusedWorkspacePackageLock` returns `true`
   - `otherConflicts` — all other conflict lines
5. For each entry in `packageLockConflicts`: run `git rm <path>`. If any `git rm` throws, the
   error propagates immediately (no partial-success swallowing).
   - Works for both `UU` (both modified — file on disk with conflict markers) and `DU`
     (deleted by us, modified by them — git leaves their version on disk during the conflict).
6. Return `{ resolved: number; remainingConflicts: string[] }`.
   - `resolved` = number of `package-lock.json` files successfully removed and staged
   - `remainingConflicts` = paths of all other conflicted files (not `package-lock.json`)

### 3. Catch block logic (`update-from-templates.ts`)

Applied to **both** catch blocks: the multi-template merge and each per-extension
single-template merge.

```
resolved, remainingConflicts = await resolvePackageLockConflicts()

if resolved > 0 and remainingConflicts.length === 0:
    // MERGE_HEAD exists; git prepared a commit message for this squash merge.
    // --no-edit reuses that message without opening an editor.
    await execCommand('git commit --no-edit')
    log: "Auto-resolved package-lock.json conflicts by deleting unused lock files. Continuing."
    // do NOT return 1 — continue the script

else if resolved > 0 and remainingConflicts.length > 0:
    log: "Auto-resolved package-lock.json conflicts, but other conflicts remain: <list>"
    return 1

else if resolved === 0 and remainingConflicts.length > 0:
    // Conflicts exist but none were package-lock.json — nothing was auto-resolved
    log: "Merge conflicts in: <remainingConflicts list>"
    log original error
    return 1

else:  // resolved === 0, remainingConflicts.length === 0 — not a conflict error
    log original error
    return 1
```

For the **per-extension loop**: when auto-resolution succeeds (first branch above), push the
extension to `extensionsBasedOnTemplate` before continuing the loop, since the subtree pull
effectively succeeded.

### 4. `formatExtensionsRoot` (`git.util.ts`)

New exported async function for formatting the `extensions/` root folder (the multi-extension
template subtree). Created as a named function rather than inline code to serve as a home for
future extensions-root formatting steps.

**Initial behavior:** Delete `extensions/package-lock.json` if it exists and
`isUnusedWorkspacePackageLock('extensions/package-lock.json')` returns `true`. Silent no-op if
the file is absent.

**Called from `update-from-templates.ts`:** After the multi-template merge completes
successfully (both the normal success path and the auto-resolved conflict path).

### 5. `formatExtensionFolder` cleanup (`git.util.ts`)

At the **start** of the existing `formatExtensionFolder` function, add: delete
`<extensionFolderPath>/package-lock.json` if it exists and passes the workspace safety check.
Silent no-op if absent.

This handles extensions where `git subtree pull` succeeded without a conflict but the template's
`package-lock.json` still landed in the working tree (e.g., newly created extensions).

## Data flow summary

```
git subtree pull (multi-template)
  ├── success → formatExtensionsRoot() [deletes extensions/package-lock.json if present]
  └── catch   → resolvePackageLockConflicts()
                  ├── only package-lock.json conflicts → git commit --no-edit
                  │     → log auto-resolution → formatExtensionsRoot()
                  ├── package-lock.json + other conflicts → log remaining, return 1
                  ├── no package-lock.json conflicts, but other conflicts → log conflicts + original error, return 1
                  └── no conflict lines at all → log original error, return 1

for each extension:
  git subtree pull (single-template)
    ├── success → extensionsBasedOnTemplate.push(ext)
    └── catch   → resolvePackageLockConflicts()
                    ├── only package-lock.json conflicts → git commit --no-edit
                    │     → log auto-resolution → extensionsBasedOnTemplate.push(ext)
                    ├── package-lock.json + other conflicts → log remaining, return 1
                    ├── no package-lock.json conflicts, but other conflicts → log conflicts + original error, return 1
                    └── no conflict lines at all → (existing error handling unchanged)

formatExtensionFolder (for each extensionsBasedOnTemplate entry)
  → delete <ext>/package-lock.json if present and is unused workspace lock file
  → ... existing formatting steps ...
```

## Files changed

| File                                      | Change                                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `extensions/lib/git.util.ts`              | Add `isUnusedWorkspacePackageLock`, `resolvePackageLockConflicts`, `formatExtensionsRoot`; update `formatExtensionFolder` |
| `extensions/lib/update-from-templates.ts` | Call `resolvePackageLockConflicts` in catch blocks; call `formatExtensionsRoot` after multi-template merge                |
| `extensions/package.json`                 | Add `minimatch` as a dependency                                                                                           |

## Not in scope

- Changes to `create-extension.ts` (new extensions get the `package-lock.json` deleted by
  `formatExtensionFolder` when they are first updated from the template)
- Changes to CI or git configuration
- Deleting `package-lock.json` files from `lib/*` workspaces
