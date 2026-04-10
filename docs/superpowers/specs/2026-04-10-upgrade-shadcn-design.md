# Design: `/upgrade-shadcn` Command

**Date:** 2026-04-10
**Status:** Approved

## Overview

The `/upgrade-shadcn` command upgrades all shadcn/ui components in `lib/platform-bible-react/src/components/shadcn-ui/` to the latest version while preserving all project-specific customizations documented in `CUSTOMIZATIONS.md`. It does this by archiving the existing components, re-adding them fresh from the shadcn CLI, then re-applying every customization via parallel subagents.

---

## Command Structure

The command is organized as follows:

1. **Preamble** — overview for the user, read shadcn/ui Guidelines
2. **Pre-flight checks** — user confirmations before any destructive work
3. **Step 0** — verify standard customizations are in sync
4. **Steps 1–7** — the upgrade sequence

---

## Preamble

The command opens with a short paragraph explaining what it will do (archive existing components, re-add from shadcn, re-apply customizations, create a PR), then instructs the agent to read the [shadcn/ui Guidelines](../../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines) **before doing anything else**, per the same pattern as `/shadcn-customizations`.

---

## Pre-flight Checks (before Step 0)

Performed in sequence. The command does not proceed past a failed check.

### Check 1 — CUSTOMIZATIONS.md is current

Ask the user:

> Is `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md` up to date? (i.e., have you already run `/shadcn-customizations`, applied fixes, and run it again?)

If the user says **no**: instruct them to run `/shadcn-customizations` first. Do not continue until they confirm it is current.

### Check 2 — `shadcn-ui-old/` does not exist

Check whether `lib/platform-bible-react/src/components/shadcn-ui-old/` exists. If it does, ask the user:

> A `shadcn-ui-old/` folder already exists. OK to delete it?

- If **yes**: delete it using the appropriate platform command (no need to read its contents), then verify the folder is gone before continuing.
- If **no**: instruct the user they must remove or relocate the folder themselves before running this command. Do not continue until they confirm it is gone and the folder has been verified as absent.

Platform-specific delete commands:

- Linux / macOS / WSL2: `rm -rf lib/platform-bible-react/src/components/shadcn-ui-old`
- Windows (PowerShell): `Remove-Item -Recurse -Force lib\platform-bible-react\src\components\shadcn-ui-old`

### Create Branch

After both checks pass, create a new branch:

```bash
git checkout -b ai/feature/upgrade-shadcn-{first-name}-{MM-DD-YYYY}
```

where `{first-name}` is derived from `git config user.name` (lowercase).

---

## Step 0 — Verify Standard Customizations Are In Sync

Same sync check as `/shadcn-customizations`: after reading the shadcn/ui Guidelines, compare the standard customizations defined there against those tracked in this command (the table columns in CUSTOMIZATIONS.md's `## Standard Customizations` section). If they diverge, stop and prompt the user to update the command and the `shadcn-customization-tracker` agent before proceeding.

---

## Step 1 — List Component Files

```bash
ls lib/platform-bible-react/src/components/shadcn-ui/
```

Collect all `.tsx` filenames (exclude `CUSTOMIZATIONS.md`). Record both:

- The **filenames** (e.g. `button.tsx`) — used to identify files later
- The **component names** (e.g. `button`) — passed to the shadcn CLI in Step 4

---

## Step 2 — Move Files to `shadcn-ui-old/`

Run the appropriate platform command (no subagent needed — the operation produces no file-content output):

```bash
# Linux / macOS / WSL2:
mkdir -p lib/platform-bible-react/src/components/shadcn-ui-old
mv lib/platform-bible-react/src/components/shadcn-ui/*.tsx lib/platform-bible-react/src/components/shadcn-ui-old/

# Windows (PowerShell):
New-Item -ItemType Directory -Force lib\platform-bible-react\src\components\shadcn-ui-old
Move-Item lib\platform-bible-react\src\components\shadcn-ui\*.tsx lib\platform-bible-react\src\components\shadcn-ui-old\
```

`shadcn-ui-old/` is gitignored, so Git will see the `.tsx` files as deleted.

---

## Step 3 — Commit Deletions

```bash
git add lib/platform-bible-react/src/components/shadcn-ui/
git commit -m "chore: remove shadcn components before re-adding from latest version"
```

This establishes **commit 1 of 3**: the clean deletion baseline.

---

## Step 4 — Re-add All Components via shadcn CLI

Run from `lib/platform-bible-react/`:

```bash
npx shadcn add --yes <component>
```

for each component name from Step 1. This uses the locally installed `shadcn` from devDependencies. `--yes` accepts defaults non-interactively. No `--overwrite` flag — the files were deleted in Step 2 so there is nothing to overwrite, and omitting it preserves error visibility.

**If any component fails to be added:** stop at the end of this step and tell the user which components failed. Instruct them to re-add those components manually using the same command (`npx shadcn add --yes <component>` from `lib/platform-bible-react/`) without making any modifications to the resulting files. Tell them to report back once done. Do not continue until they confirm completion.

---

## Step 5 — Commit New Baseline

```bash
git add lib/platform-bible-react/src/components/shadcn-ui/
git commit -m "chore: re-add shadcn components from latest version (new baseline)"
```

This establishes **commit 2 of 3**: the fresh shadcn baseline with no customizations applied.

---

## Step 6 — Re-apply Customizations (5 Parallel Subagents)

Divide the component list from Step 1 into **5 roughly equal consecutive chunks**. Dispatch **5 general-purpose subagents in a single message** so they run in parallel. Do not use worktree isolation — each subagent works on a non-overlapping set of files.

Each subagent receives:

- Its list of assigned component filenames
- Instructions to, for each component:
  1. Read `CUSTOMIZATIONS.md` for the customization entries for that component
  2. Read the old file from `shadcn-ui-old/` to understand the original implementation
  3. Read the new file from `shadcn-ui/` to understand the current structure
  4. Re-apply every customization from `CUSTOMIZATIONS.md` by hand, adapting to the new file's structure rather than copying literally (the new file may differ from the old baseline)
  5. Add a `// CUSTOM:` comment immediately before every changed line or block, following the annotation conventions from the shadcn/ui Guidelines

After all 5 subagents complete, commit their changes:

```bash
git add lib/platform-bible-react/src/components/shadcn-ui/
git commit -m "chore: re-apply project customizations to upgraded shadcn components"
```

This establishes **commit 3 of 3**.

---

## Step 7 — Create PR

Use the `pr-creator` skill to create the PR targeting **`main`**.

The PR description must:

- Summarize the three-commit structure (delete → new baseline → re-applied customizations)
- **Prominently warn that this PR MUST NOT be squash-merged.** It must use a normal merge to preserve the three-commit history, which future shadcn upgrades depend on to diff customizations against the correct baseline.

---

## Design Decisions

| Decision                                                       | Rationale                                                                                                                                                                          |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Move files to gitignored `shadcn-ui-old/` rather than deleting | Preserves originals for subagent reference during re-application; `shadcn-ui-old/` left in place after command completes in case user needs it                                     |
| No subagent for file move (Step 2)                             | `mv` produces no file-content output; no context risk                                                                                                                              |
| General-purpose subagents for re-application (Step 6)          | Task is one-time and workflow-specific; detailed instructions inline in the dispatch prompt are sufficient; a dedicated agent would add maintenance overhead with no reuse benefit |
| `--yes` but no `--overwrite` on shadcn CLI                     | `--yes` handles non-interactive prompts; `--overwrite` is unnecessary (files deleted) and would silence legitimate errors                                                          |
| Three separate commits                                         | Enables future upgrades to diff each commit independently: what changed in shadcn (commit 2 vs 1) vs what customizations were applied (commit 3 vs 2)                              |
| PR targets `main`                                              | This is a real component upgrade, not an AI workflow artifact                                                                                                                      |
