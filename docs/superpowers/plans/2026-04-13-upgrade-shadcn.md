# `/upgrade-shadcn` Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write the `.claude/commands/upgrade-shadcn.md` command file that orchestrates a full shadcn/ui component upgrade while preserving all project customizations.

**Architecture:** Single markdown command file following the conventions of `.claude/commands/shadcn-customizations.md` — same "before doing anything else" preamble, same Step 0 sync check, same parallel-subagent dispatch pattern for the heavy work. The command is written to ai-prompts (via the `.claude/` symlink) and should eventually be cherry-picked to an `ai/main` PR.

**Tech Stack:** Claude Code command markdown, Bash, shadcn CLI (`npx shadcn`), Git

---

## Reference Material

Before writing any section, read these two files to stay aligned:

- **Spec:** `docs/superpowers/specs/2026-04-10-upgrade-shadcn-design.md`
- **Model command:** `.claude/commands/shadcn-customizations.md` (match its style and conventions)

---

## File Structure

| Action | Path                                 |
| ------ | ------------------------------------ |
| Create | `.claude/commands/upgrade-shadcn.md` |

`.claude/` is a symlink to the ai-prompts repo. Writes to `.claude/commands/upgrade-shadcn.md` land in ai-prompts automatically. After completing this plan, cherry-pick the commit to a `ai/workflow/` branch in ai-prompts for a PR to `ai/main`.

---

## Task 1: Preamble and Pre-flight Checks

**Files:**

- Create: `.claude/commands/upgrade-shadcn.md`

Write the top of the command file covering: the h1 title, the overview paragraph, the "before doing anything else" guideline read instruction, and the two pre-flight checks (CUSTOMIZATIONS.md currency check + shadcn-ui-old existence check) plus branch creation.

- [ ] **Step 1: Write the file opening**

Create `.claude/commands/upgrade-shadcn.md` with this content:

````markdown
# Upgrade Shadcn

This command upgrades all shadcn/ui components in `lib/platform-bible-react/src/components/shadcn-ui/` to the latest installed version while preserving all project-specific customizations. It will: archive the existing components, re-add them fresh from the shadcn CLI (establishing a clean new baseline), re-apply every customization from `CUSTOMIZATIONS.md` via parallel subagents, and create a PR.

**Before doing anything else**, read [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines). It is the authoritative source for all conventions used in this command: folder structure, boilerplate baseline, `// CUSTOM:` annotations, and the standard customizations. If anything in this command conflicts with that section, trust the section.

## Pre-flight Checks

Perform these checks in sequence. Do not proceed past a failed check.

### Check 1 — CUSTOMIZATIONS.md is current

Ask the user:

> Is `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md` up to date? (i.e., have you already run `/shadcn-customizations`, applied fixes, and run it again to confirm everything is documented?)

If the user says **no**: tell them they must run `/shadcn-customizations` first and confirm all customizations are documented before continuing. Do not continue until they confirm it is current.

### Check 2 — `shadcn-ui-old/` does not exist

Check whether `lib/platform-bible-react/src/components/shadcn-ui-old/` exists. If it does, instruct the user:

> A `shadcn-ui-old/` folder already exists. Please review and delete or move it, then let me know when it's gone.
>
> - Linux / macOS / WSL2: `rm -rf lib/platform-bible-react/src/components/shadcn-ui-old`
> - Windows (PowerShell): `Remove-Item -Recurse -Force lib\platform-bible-react\src\components\shadcn-ui-old`

Do not continue until the user confirms it is gone and you have verified the folder is absent.

### Create Branch

After both checks pass, create a new branch:

```bash
FIRST_NAME=$(git config user.name | awk '{print tolower($1)}')
TODAY=$(date +%m-%d-%Y)
git checkout -b "ai/feature/upgrade-shadcn-${FIRST_NAME}-${TODAY}"
```
````

````

- [ ] **Step 2: Verify Check 1 matches spec**

Re-read `docs/superpowers/specs/2026-04-10-upgrade-shadcn-design.md` section "Check 1". Confirm the written text matches: asks if CUSTOMIZATIONS.md is current, halts if user says no, does not continue until confirmed.

- [ ] **Step 3: Verify Check 2 matches spec**

Re-read the spec section "Check 2". Confirm: checks for folder existence, instructs user to delete (not asks permission), provides platform-specific commands, verifies folder is gone before proceeding.

- [ ] **Step 4: Verify branch creation matches spec**

Confirm branch name follows `ai/feature/upgrade-shadcn-{first-name}-{MM-DD-YYYY}` pattern and derives first-name from `git config user.name`.

---

## Task 2: Step 0 and Steps 1–3

**Files:**
- Modify: `.claude/commands/upgrade-shadcn.md`

Append Step 0 (standards sync check) and Steps 1–3 (list files, move to shadcn-ui-old, commit deletions).

- [ ] **Step 1: Append Step 0**

Add to the command file:

```markdown
## Step 0 — Verify Standard Customizations Are In Sync

After reading the [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines), compare the standard customizations listed there against the standard customizations this command tracks — which are the table columns in the `## Standard Customizations` section of `CUSTOMIZATIONS.md` (currently: "TSDocs on all exports?" and "pr-twp on DOM-rendered components?").

If the style guide lists standard customizations that are not represented as table columns, or vice versa, **stop immediately** and tell the user:

> The standard customizations in [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines) no longer match what this command tracks. Please update this command (Step 0 list and Step 6 subagent instructions) and the `shadcn-customization-tracker` agent to reflect the current standard customizations before running.
````

- [ ] **Step 2: Append Steps 1–3**

````markdown
## Step 1 — List Component Files

```bash
ls lib/platform-bible-react/src/components/shadcn-ui/
```
````

Collect all `.tsx` filenames (exclude `CUSTOMIZATIONS.md`). Record both:

- The **filenames** (e.g. `button.tsx`) — used to identify files later and for subagents in Step 6
- The **component names** (e.g. `button`) — passed to the shadcn CLI in Step 4

## Step 2 — Move Files to `shadcn-ui-old/`

Run the appropriate platform command. No subagent is needed — the operation produces no file-content output.

```bash
# Linux / macOS / WSL2:
mkdir -p lib/platform-bible-react/src/components/shadcn-ui-old
mv lib/platform-bible-react/src/components/shadcn-ui/*.tsx lib/platform-bible-react/src/components/shadcn-ui-old/

# Windows (PowerShell):
New-Item -ItemType Directory -Force lib\platform-bible-react\src\components\shadcn-ui-old
Move-Item lib\platform-bible-react\src\components\shadcn-ui\*.tsx lib\platform-bible-react\src\components\shadcn-ui-old\
```

`shadcn-ui-old/` is gitignored, so Git will see the `.tsx` files as deleted. The folder is left in place after this command completes in case you need to refer back to it.

## Step 3 — Commit Deletions

```bash
git add lib/platform-bible-react/src/components/shadcn-ui/
git commit -m "chore: remove shadcn components before re-adding from latest version"
```

This is **commit 1 of 3**: the clean deletion baseline. It is critical for future upgrades — do not squash or amend it.

````

- [ ] **Step 3: Verify against spec**

Confirm Step 1 records both filenames and component names. Confirm Step 2 has both platform variants. Confirm Step 3 commit message matches spec.

---

## Task 3: Steps 4–5

**Files:**
- Modify: `.claude/commands/upgrade-shadcn.md`

Append Steps 4–5 (re-add via shadcn CLI, commit new baseline).

- [ ] **Step 1: Append Steps 4–5**

```markdown
## Step 4 — Re-add All Components via shadcn CLI

Run a single command from `lib/platform-bible-react/`, listing all component names from Step 1:

```bash
cd lib/platform-bible-react
npx shadcn add --yes --overwrite <component1> <component2> ... <componentN>
````

This uses the locally installed `shadcn` from devDependencies. `--yes` accepts defaults non-interactively. `--overwrite` prevents the CLI from blocking on any overwrite prompts.

Capture the full output and review it to identify any components that failed to be added.

**If any components failed:** save the full CLI output to `shadcn-add-output.txt` in the repo root so the user can inspect it, then stop and report which components failed. Instruct the user to re-add those components manually:

```bash
cd lib/platform-bible-react
npx shadcn add --yes --overwrite <failed-component>
```

Tell them **not to make any other modifications** to the resulting files — just re-add them from shadcn as-is. Tell them to let you know once done. Do not continue until they confirm completion.

## Step 5 — Commit New Baseline

```bash
git add lib/platform-bible-react/src/components/shadcn-ui/
git commit -m "chore: re-add shadcn components from latest version (new baseline)"
```

This is **commit 2 of 3**: the fresh shadcn baseline with no customizations applied. Do not squash or amend it — it is the reference point for all future customization diffs.

````

- [ ] **Step 2: Verify against spec**

Confirm: single combined CLI command, `--yes --overwrite`, runs from `lib/platform-bible-react/`, captures output, saves to file on failure, halts with instructions if any fail.

---

## Task 4: Step 6 — Re-apply Customizations

**Files:**
- Modify: `.claude/commands/upgrade-shadcn.md`

This is the most complex section. Write the subagent dispatch instructions for re-applying customizations.

- [ ] **Step 1: Append Step 6 header and dispatch setup**

```markdown
## Step 6 — Re-apply Customizations

Divide the component list from Step 1 into **5 roughly equal consecutive chunks** by splitting the sorted list (e.g. files 1–7, 8–13, 14–19, 20–25, 26–32 for 32 components). Dispatch **5 general-purpose subagents in a single message** so they run in parallel. Do not use worktree isolation — each subagent works on a non-overlapping set of files.

Pass each subagent its chunk as a list of filenames along with these instructions:
````

- [ ] **Step 2: Append the subagent instruction block**

```markdown
---

**Instructions for each subagent:**

You are re-applying project customizations to a set of freshly re-added shadcn/ui component files. For each component file assigned to you:

1. **Read the CUSTOMIZATIONS.md entry** for this component from `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md`. Identify every customization listed under "Explicit `// CUSTOM:` customizations", "Other comment-indicated customizations", and "Uncalled-out customizations (from git history)".

2. **Read the old file** from `lib/platform-bible-react/src/components/shadcn-ui-old/<filename>` to understand how the customization was previously implemented.

3. **Read the new file** from `lib/platform-bible-react/src/components/shadcn-ui/<filename>` to understand the current structure from the latest shadcn version.

4. **Re-apply every customization by hand.** Do NOT copy code from the old file literally — the new file may have a different structure. Instead, understand the _intent_ of each customization (what it does and why) from CUSTOMIZATIONS.md and the old file, then implement that intent in the new file's context.

5. **Add a `// CUSTOM:` comment** immediately before every changed line or block. Follow the annotation convention from the [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines): the comment must state what was changed, what it does, and why. Example:
```

// CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation

```

6. **Standard customizations** that must be present on every applicable component (from the shadcn/ui Guidelines):
- `pr-twp` at the **front** of the base Tailwind class string on every DOM-rendered component (components with HTMLElement props, `React.ComponentPropsWithoutRef`, or `React.forwardRef`). Does NOT apply to state-coordinating roots (Dialog, Popover) or cva factories.
- TSDoc (`/** ... */`) on every exported symbol, with hyperlinks to the upstream library docs (shadcn/ui page, Radix UI primitive page, etc.).

If a customization in CUSTOMIZATIONS.md no longer makes sense (e.g. the new version already implements the same behavior), skip it and note why in a comment.

---
```

- [ ] **Step 3: Append the post-subagent commit**

````markdown
After all 5 subagents complete, commit their changes:

```bash
git add lib/platform-bible-react/src/components/shadcn-ui/
git commit -m "chore: re-apply project customizations to upgraded shadcn components"
```
````

This is **commit 3 of 3**.

````

- [ ] **Step 4: Verify against spec**

Confirm: 5 parallel general-purpose subagents, single dispatch message, no worktree isolation, each receives filenames + instructions, each reads CUSTOMIZATIONS.md + old file + new file, adapts (does not copy), adds `// CUSTOM:` on every change, includes standard customizations guidance, commits after all complete.

---

## Task 5: Step 7 — PR Creation and Final Commit

**Files:**
- Modify: `.claude/commands/upgrade-shadcn.md`

Append Step 7 (PR creation) and commit the whole command file.

- [ ] **Step 1: Append Step 7**

```markdown
## Step 7 — Create PR

Use the `pr-creator` skill to create the PR targeting **`main`** (not `ai/main`).

The PR description must include:

- A summary of the three-commit structure: what each commit represents (deletion baseline → fresh shadcn baseline → re-applied customizations)
- A prominent warning:

> ⚠️ **This PR MUST NOT be squash-merged.** Use a normal merge. The three-commit history is essential for future shadcn upgrades: commit 1 enables diffing what was in the project before, commit 2 shows exactly what changed in the new shadcn version, and commit 3 shows the re-applied customizations. Squashing destroys this history.
````

- [ ] **Step 2: Commit the command file**

```bash
git add .claude/commands/upgrade-shadcn.md
git commit -m "feat: add /upgrade-shadcn command"
```

- [ ] **Step 3: Verify the full command file against spec**

Read the completed `.claude/commands/upgrade-shadcn.md` and check:

- [ ] Overview paragraph explains what the command does
- [ ] "Before doing anything else" reads the shadcn/ui Guidelines
- [ ] Check 1 asks about CUSTOMIZATIONS.md currency, halts if not current
- [ ] Check 2 detects shadcn-ui-old, instructs user to delete (with platform commands), verifies gone
- [ ] Branch creation uses `ai/feature/upgrade-shadcn-{first-name}-{MM-DD-YYYY}` from `git config user.name`
- [ ] Step 0 compares standard customizations from Guidelines against those tracked; halts on divergence
- [ ] Step 1 records both filenames and component names
- [ ] Step 2 has Linux/macOS and Windows commands
- [ ] Step 3 commits with correct message; labels it commit 1 of 3
- [ ] Step 4 runs single combined `npx shadcn add --yes --overwrite` from `lib/platform-bible-react/`, captures output, saves to file on failure, halts with instructions
- [ ] Step 5 commits with correct message; labels it commit 2 of 3
- [ ] Step 6 dispatches 5 parallel general-purpose subagents with full re-application instructions; commits after all complete (commit 3 of 3)
- [ ] Step 7 uses pr-creator skill, targets `main`, prominently warns against squash-merge

---

## Task 6: Cherry-pick to ai-prompts workflow branch

After the command file is committed on the feature branch, promote the generic change to ai-prompts for a PR to `ai/main`.

- [ ] **Step 1: Get the commit hash**

```bash
git log --oneline -5
```

Record the hash of the `feat: add /upgrade-shadcn command` commit.

- [ ] **Step 2: Check for existing workflow PRs**

```bash
cd $(cat .context/repo-paths.json | python3 -c "import sys,json; print(json.load(sys.stdin)['repositories']['ai-prompts'])")
git fetch origin
gh pr list --base ai/main --search "ai/workflow/" --state open
```

If a closely related workflow PR exists, cherry-pick onto that branch instead of creating a new one. Otherwise continue.

- [ ] **Step 3: Create workflow branch and cherry-pick**

```bash
AI_PROMPTS_REPO=$(cat /home/tj_co/source/repos/paranext-core/.context/repo-paths.json | python3 -c "import sys,json; print(json.load(sys.stdin)['repositories']['ai-prompts'])")
cd "$AI_PROMPTS_REPO"
git checkout ai/main && git pull origin ai/main
FIRST_NAME=$(git config user.name | awk '{print tolower($1)}')
TODAY=$(date +%m-%d-%Y)
git checkout -b "ai/workflow/upgrade-shadcn-command-${FIRST_NAME}-${TODAY}"
git cherry-pick <COMMIT_HASH>
git push -u origin HEAD
gh pr create --base ai/main --title "feat: add /upgrade-shadcn command"
cd -
```

- [ ] **Step 4: Return to feature branch**

```bash
git checkout ai/feature/upgrade-shadcn-<first-name>-<date>
```
