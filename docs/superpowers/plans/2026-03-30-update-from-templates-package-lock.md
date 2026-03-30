# Auto-resolve package-lock.json Conflicts in update-from-templates

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `npm run update-from-templates` automatically delete unused `package-lock.json` files from workspace extension folders so they never cause merge conflict interruptions.

**Architecture:** Add `isUnusedWorkspacePackageLock` (safety check), `resolvePackageLockConflicts` (git-level conflict resolver), and `formatExtensionsRoot` (post-merge cleanup for the extensions root) to `git.util.ts`. Update both `git subtree pull` catch blocks in `update-from-templates.ts` to call the resolver, and update `formatExtensionFolder` to delete lock files after a clean pull.

**Tech Stack:** TypeScript, Node.js `fs/promises`, `minimatch` v9 (new explicit dep in `extensions/package.json`), `git` CLI (via existing `execCommand` helper)

---

## File Map

| File                                      | Change                                                                                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `extensions/package.json`                 | Add `minimatch` dependency                                                                                                                          |
| `extensions/lib/git.util.ts`              | Add `isUnusedWorkspacePackageLock`, `resolvePackageLockConflicts`, `formatExtensionsRoot`; prepend package-lock deletion to `formatExtensionFolder` |
| `extensions/lib/update-from-templates.ts` | Update multi-template catch block; update per-extension catch block; call `formatExtensionsRoot` after multi-template merge                         |

---

## Pre-flight

- [ ] **Verify git state is clean before starting**

  Run from repo root:

  ```bash
  git status
  ```

  Expected: clean working tree. If a merge is in progress (e.g. from manual testing), abort it first:

  ```bash
  git merge --abort
  ```

---

## Task 1: Install minimatch

`minimatch` is a transitive dependency of `glob` (already in `extensions/package.json`) but must be listed explicitly.

**Files:**

- Modify: `extensions/package.json`
- Modified by install: `package-lock.json` (root)

- [ ] **Step 1: Install minimatch into the extensions workspace**

  Run from repo root:

  ```bash
  npm install minimatch --workspace extensions
  ```

  Expected: minimatch added to `extensions/package.json` `dependencies` and root `package-lock.json` updated.

- [ ] **Step 2: Verify the installed version is v9**

  ```bash
  node -e "console.log(require('./extensions/node_modules/minimatch/package.json').version)"
  ```

  Expected: a `9.x.x` version string.

- [ ] **Step 3: Commit**

  ```bash
  git add extensions/package.json package-lock.json
  git commit -m "chore: add minimatch dependency to extensions"
  ```

---

## Task 2: Add `isUnusedWorkspacePackageLock` to `git.util.ts`

This function is the safety gate used by all lock-file deletion logic. It confirms a path is a `package-lock.json` living inside an `extensions/`-based npm workspace before we ever touch it.

**Files:**

- Modify: `extensions/lib/git.util.ts`

- [ ] **Step 1: Add the import for `minimatch` at the top of `git.util.ts`**

  Add after the existing imports (around line 6, after the `replaceInFile` import):

  ```typescript
  import { minimatch } from 'minimatch';
  ```

- [ ] **Step 2: Add the function body**

  Add this block anywhere before `formatExtensionFolder` (e.g. just before the `replaceInFileIgnoreGlobs` constant at line 163):

  ```typescript
  /**
   * Returns true if the given repo-root-relative path is a `package-lock.json` file whose parent
   * directory is an npm workspace under `extensions/`. Such files are unused (because the folder is a
   * workspace) and are safe to delete automatically.
   *
   * @param repoRootRelativePath Repo-root-relative path, e.g.
   *   `extensions/src/hello-rock3/package-lock.json`
   */
  export async function isUnusedWorkspacePackageLock(
    repoRootRelativePath: string,
  ): Promise<boolean> {
    const parentDir = path.dirname(repoRootRelativePath);

    // Must be the extensions root or somewhere inside it
    if (parentDir !== 'extensions' && !parentDir.startsWith('extensions/')) return false;

    // Must match a workspace pattern from the root package.json
    const rootPackageJsonPath = path.resolve(path.join(__dirname, '..', '..', 'package.json'));
    const rootPackageContent = await fs.readFile(rootPackageJsonPath, 'utf-8');
    const rootPackageJson = JSON.parse(rootPackageContent) as { workspaces?: string[] };
    const workspaces = rootPackageJson.workspaces ?? [];

    return workspaces.some((pattern) => minimatch(parentDir, pattern));
  }
  ```

- [ ] **Step 3: Check TypeScript compiles**

  Run from repo root:

  ```bash
  cd extensions && npx tsc --noEmit --project tsconfig.json 2>&1 | head -20
  ```

  Expected: no errors relating to the new code.

- [ ] **Step 4: Commit**

  ```bash
  git add extensions/lib/git.util.ts
  git commit -m "feat: add isUnusedWorkspacePackageLock safety check to git.util"
  ```

---

## Task 3: Add `resolvePackageLockConflicts` to `git.util.ts`

This function runs after a `git subtree pull` throws. It detects which files are conflicted, deletes any unused workspace `package-lock.json` conflicts, and returns what remains.

**Files:**

- Modify: `extensions/lib/git.util.ts`

- [ ] **Step 1: Add the conflict XY codes constant and the function**

  Add immediately after `isUnusedWorkspacePackageLock`:

  ```typescript
  /** Git status --porcelain v1 XY codes that indicate an unmerged (conflict) entry */
  const CONFLICT_XY_CODES = new Set(['DD', 'AU', 'UD', 'UA', 'DU', 'AA', 'UU']);

  /**
   * After a `git subtree pull` fails, call this to auto-resolve any conflicts that are solely unused
   * workspace `package-lock.json` files.
   *
   * Uses `git status --porcelain` (v1 format) — intentionally different from `checkForWorkingChanges`
   * which uses `--porcelain=v2`. V1 is simpler for conflict-code parsing.
   *
   * For each conflicted `package-lock.json` that passes {@link isUnusedWorkspacePackageLock}, runs
   * `git rm <path>` to delete and stage the file. Works for both:
   *
   * - `UU` (both modified): file is on disk with conflict markers
   * - `DU` (deleted by us, modified by them): git leaves their version on disk during the conflict
   *
   * @returns `resolved` — number of lock files removed and staged. `remainingConflicts` —
   *   repo-root-relative paths of all OTHER conflicted files.
   */
  export async function resolvePackageLockConflicts(): Promise<{
    resolved: number;
    remainingConflicts: string[];
  }> {
    const status = await execCommand('git status --porcelain', { quiet: true });

    const lines = status.stdout.split('\n').filter((line) => line.length > 0);
    const conflictLines = lines.filter((line) => CONFLICT_XY_CODES.has(line.slice(0, 2)));

    const packageLockPaths: string[] = [];
    const otherConflictPaths: string[] = [];

    await Promise.all(
      conflictLines.map(async (line) => {
        const filePath = line.slice(3); // skip "XY "
        if (
          filePath.endsWith('package-lock.json') &&
          // eslint-disable-next-line no-await-in-loop
          (await isUnusedWorkspacePackageLock(filePath))
        ) {
          packageLockPaths.push(filePath);
        } else {
          otherConflictPaths.push(filePath);
        }
      }),
    );

    // Remove and stage each conflicted package-lock.json. Errors propagate immediately.
    // eslint-disable-next-line no-restricted-syntax
    for (const filePath of packageLockPaths) {
      // eslint-disable-next-line no-await-in-loop
      await execCommand(`git rm "${filePath}"`);
    }

    return { resolved: packageLockPaths.length, remainingConflicts: otherConflictPaths };
  }
  ```

  > **Note on the loop:** The `for...of` with sequential `await` is intentional — `execCommand` logs each command to stdout and we want the output in order. The same pattern is used elsewhere in this file.

- [ ] **Step 2: Check TypeScript compiles**

  ```bash
  cd extensions && npx tsc --noEmit --project tsconfig.json 2>&1 | head -20
  ```

  Expected: no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add extensions/lib/git.util.ts
  git commit -m "feat: add resolvePackageLockConflicts to git.util"
  ```

---

## Task 4: Add `formatExtensionsRoot` and update `formatExtensionFolder`

Add a formatting function for the `extensions/` root (home for future steps), and prepend lock-file cleanup to the existing `formatExtensionFolder`.

**Files:**

- Modify: `extensions/lib/git.util.ts`

- [ ] **Step 1: Add `formatExtensionsRoot` before `formatExtensionFolder`**

  Insert this function immediately before the existing `formatExtensionFolder` function (around line 216):

  ```typescript
  /**
   * Format the `extensions/` root folder after a merge from the multi-extension template.
   *
   * Currently: deletes `extensions/package-lock.json` if present and unused (it is unused because
   * `extensions/` is an npm workspace). This is a named function rather than inline code to serve as
   * a home for future extensions-root formatting steps.
   */
  export async function formatExtensionsRoot() {
    const lockFilePath = `${subtreeRootFolder}/package-lock.json`;
    if (await isUnusedWorkspacePackageLock(lockFilePath)) {
      try {
        await fs.unlink(lockFilePath);
        console.log(`Deleted unused ${lockFilePath}`);
      } catch (error: unknown) {
        // File not present — nothing to delete
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
      }
    }
  }
  ```

  > `subtreeRootFolder` is already imported from `../webpack/webpack.util` at the top of the file.
  > Its value is `extensions` (the prefix used for the multi-extension template subtree).

- [ ] **Step 2: Prepend lock-file deletion to `formatExtensionFolder`**

  The existing `formatExtensionFolder` function starts with the `extensionFolderPathFromExtensions` computation. Add the deletion block right after that computation, before the `replaceInFile` call.

  Find this code near the start of `formatExtensionFolder` (around line 225):

  ```typescript
  const extensionFolderPathFromExtensions = extensionFolderPath.replace(
    `${subtreeRootFolder}/`,
    '',
  );
  ```

  Insert immediately after it:

  ```typescript
  // Delete package-lock.json if present — it is unused because this folder is an npm workspace
  const lockFilePath = `${extensionFolderPath}/package-lock.json`;
  if (await isUnusedWorkspacePackageLock(lockFilePath)) {
    try {
      await fs.unlink(path.join(extensionFolderPathFromExtensions, 'package-lock.json'));
      console.log(`Deleted unused ${lockFilePath}`);
    } catch (error: unknown) {
      // File not present — nothing to delete
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
  }
  ```

  > `fs.unlink` operates relative to the process cwd (the `extensions/` folder when the npm
  > script runs), so we use `extensionFolderPathFromExtensions` for the actual file operation
  > but `extensionFolderPath` (repo-root-relative) for the safety check and log message.

- [ ] **Step 3: Check TypeScript compiles**

  ```bash
  cd extensions && npx tsc --noEmit --project tsconfig.json 2>&1 | head -20
  ```

  Expected: no errors.

- [ ] **Step 4: Commit**

  ```bash
  git add extensions/lib/git.util.ts
  git commit -m "feat: add formatExtensionsRoot, delete package-lock.json in formatExtensionFolder"
  ```

---

## Task 5: Update `update-from-templates.ts`

Wire up the conflict resolver and root formatter in the script.

**Files:**

- Modify: `extensions/lib/update-from-templates.ts`

- [ ] **Step 1: Add `formatExtensionsRoot` and `resolvePackageLockConflicts` to the import from `./git.util`**

  The existing import block at the top of the file looks like:

  ```typescript
  import {
    ERROR_STRINGS,
    MULTI_TEMPLATE_BRANCH,
    MULTI_TEMPLATE_NAME,
    SINGLE_TEMPLATE_BRANCH,
    SINGLE_TEMPLATE_NAME,
    checkForWorkingChanges,
    execCommand,
    fetchFromSingleTemplate,
    formatExtensionFolder,
  } from './git.util';
  ```

  Add `formatExtensionsRoot` and `resolvePackageLockConflicts` to that import:

  ```typescript
  import {
    ERROR_STRINGS,
    MULTI_TEMPLATE_BRANCH,
    MULTI_TEMPLATE_NAME,
    SINGLE_TEMPLATE_BRANCH,
    SINGLE_TEMPLATE_NAME,
    checkForWorkingChanges,
    execCommand,
    fetchFromSingleTemplate,
    formatExtensionFolder,
    formatExtensionsRoot,
    resolvePackageLockConflicts,
  } from './git.util';
  ```

- [ ] **Step 2: Update the multi-template merge catch block**

  The current catch block (lines ~29-35) is:

  ```typescript
  } catch (e) {
    console.error(`Error merging from ${MULTI_TEMPLATE_NAME}: ${e}`);
    return 1;
  }
  ```

  Replace with:

  ```typescript
  } catch (e) {
    const { resolved, remainingConflicts } = await resolvePackageLockConflicts();

    if (resolved > 0 && remainingConflicts.length === 0) {
      // MERGE_HEAD exists; git prepared a squash-merge commit message. --no-edit reuses it.
      await execCommand('git commit --no-edit');
      console.log(
        `Auto-resolved ${resolved} package-lock.json conflict(s) by deleting unused lock files. Continuing.`,
      );
      // Fall through — do not return 1
    } else if (resolved > 0 && remainingConflicts.length > 0) {
      console.error(
        `Auto-resolved package-lock.json conflicts, but other merge conflicts remain:\n  ${remainingConflicts.join('\n  ')}`,
      );
      return 1;
    } else if (remainingConflicts.length > 0) {
      // No package-lock.json conflicts resolved — other conflicts exist
      console.error(
        `Merge conflicts remain:\n  ${remainingConflicts.join('\n  ')}\n\nOriginal error: ${e}`,
      );
      return 1;
    } else {
      // No conflict lines at all — error was something other than a merge conflict
      console.error(`Error merging from ${MULTI_TEMPLATE_NAME}: ${e}`);
      return 1;
    }
  }
  ```

- [ ] **Step 3: Call `formatExtensionsRoot` on both paths after the multi-template merge**

  After the try/catch block for the multi-template merge (so it runs on both the clean-success path and the auto-resolved path), add:

  ```typescript
  await formatExtensionsRoot();
  ```

  The surrounding code should look like:

  ```typescript
  // Merge changes from MULTI_TEMPLATE_REMOTE_NAME into this repo
  try {
    await execCommand(
      `git subtree pull --prefix ${subtreeRootFolder} ${MULTI_TEMPLATE_NAME} ${MULTI_TEMPLATE_BRANCH} --squash`,
    );
  } catch (e) {
    // ... updated catch block from Step 2 ...
  }

  await formatExtensionsRoot(); // <-- add this line here

  // Fetch latest on SINGLE_TEMPLATE_REMOTE_NAME ...
  ```

- [ ] **Step 4: Update the per-extension catch block**

  The current per-extension catch block (lines ~64-82) handles two cases: subtree-never-added (continue) and everything else (return 1). Update the "everything else" branch to call `resolvePackageLockConflicts`:

  ```typescript
  } else {
    const { resolved, remainingConflicts } = await resolvePackageLockConflicts();

    if (resolved > 0 && remainingConflicts.length === 0) {
      await execCommand('git commit --no-edit');
      console.log(
        `Auto-resolved ${resolved} package-lock.json conflict(s) in ${ext.dirName} by deleting unused lock files. Continuing.`,
      );
      extensionsBasedOnTemplate.push(ext);
    } else if (resolved > 0 && remainingConflicts.length > 0) {
      console.error(
        `Auto-resolved package-lock.json conflicts in ${ext.dirName}, but other merge conflicts remain:\n  ${remainingConflicts.join('\n  ')}`,
      );
      return 1;
    } else if (remainingConflicts.length > 0) {
      console.error(
        `Merge conflicts in ${ext.dirName}:\n  ${remainingConflicts.join('\n  ')}\n\nOriginal error: ${e}`,
      );
      return 1;
    } else {
      console.error(`Error pulling from ${SINGLE_TEMPLATE_NAME} to ${ext.dirName}: ${e}`);
      return 1;
    }
  }
  ```

- [ ] **Step 5: Check TypeScript compiles with no errors**

  ```bash
  cd extensions && npx tsc --noEmit --project tsconfig.json 2>&1 | head -30
  ```

  Expected: no errors.

- [ ] **Step 6: Commit**

  ```bash
  git add extensions/lib/update-from-templates.ts
  git commit -m "feat: auto-resolve package-lock.json conflicts in update-from-templates"
  ```

---

## Task 6: Integration test

Verify the full flow works end-to-end against the real template remotes.

**Pre-conditions:** The `package-lock.json` files under `extensions/src/*/` must be deleted from the repo. They were deleted on the `dependabot-remove-lock-files` branch already. Confirm:

```bash
find extensions/src -name "package-lock.json"
```

Expected: no output.

- [ ] **Step 1: Run `update-from-templates` and observe the output**

  ```bash
  cd extensions && npm run update-from-templates
  ```

  **Expected when there are package-lock.json conflicts (the common case):** Output contains lines like:

  ```
  Auto-resolved N package-lock.json conflict(s) by deleting unused lock files. Continuing.
  ```

  The script should complete without stopping, ending with either:

  - A message about working changes needing to be committed (if templates had other changes), or
  - Silent completion (if only lock-file changes were pulled)

  **If the templates have no pending package-lock.json changes** (e.g. recently updated): the script should complete normally with no auto-resolve message. That is also correct.

- [ ] **Step 2: Verify no `package-lock.json` files were re-introduced**

  ```bash
  find extensions -name "package-lock.json" -not -path "*/node_modules/*"
  ```

  Expected: no output.

- [ ] **Step 3: Verify git state is either clean or has only expected working changes**

  ```bash
  git status
  ```

  Expected: either clean, or working changes that are NOT `package-lock.json` files (e.g. version bumps or other template updates that need committing).

- [ ] **Step 4: If there are working changes, commit them**

  ```bash
  git add -A
  git commit -m "chore: apply template updates"
  ```

---

## Notes

- The `isUnusedWorkspacePackageLock` function reads the root `package.json` on every call. This is intentional — the workspace list may evolve, and caching across calls in a long-running process is not needed here (the script is short-lived).
- `formatExtensionsRoot` is a stub for future formatting steps on the multi-extension-template root. When adding future steps, follow the same pattern as `formatExtensionFolder`.
- The `for...of` loop in `resolvePackageLockConflicts` runs `git rm` calls sequentially on purpose — this matches the pattern used elsewhere in `git.util.ts` and keeps the terminal output readable.
