# Upgrade Shadcn

This command upgrades all shadcn/ui components in `lib/platform-bible-react/src/components/shadcn-ui/` to the latest version defined by a shadcn preset, while preserving all project-specific customizations. It will: archive the existing components, apply a shadcn preset to establish a clean new baseline, propagate relevant changes to extension files, re-apply every customization from `CUSTOMIZATIONS.md` via parallel subagents, and create a PR.

**Preset parameter**: This command accepts an optional preset argument (e.g. `/upgrade-shadcn <preset-url-or-name>`). If no preset is provided, see [Determining the Preset](#determining-the-preset) below.

**Before doing anything else**, read [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines). It is the authoritative source for all conventions used in this command: folder structure, boilerplate baseline, `// CUSTOM:` annotations, and the standard customizations. If anything in this command conflicts with that section, trust the section.

## Determining the Preset

If a preset argument was provided to this command, record it as `$PRESET` and skip to [Pre-flight Checks](#pre-flight-checks).

If no preset was provided:

1. Run the following to detect the most recently used preset:

```bash
cd lib/platform-bible-react && npm run get-latest-preset
```

2. Note the preset URL/name from the output and ask the user:

> The last-used preset is: `<detected-preset>`
>
> Would you like to:
> - **Reuse** this preset (just type "reuse" or press enter)
> - **Provide a different preset** (paste or type the new preset URL/name)

Record whichever preset the user confirms as `$PRESET`.

## Pre-flight Checks

Perform these checks in sequence. Do not proceed past a failed check.

### Check 1 — CUSTOMIZATIONS.md exists and is current

`CUSTOMIZATIONS.md` is the source of truth for every project-specific customization that must be re-applied after the upstream shadcn baseline is replaced. This file is **not** kept in the repo between upgrades — it is regenerated on demand. If it does not exist, you must regenerate it before continuing.

1. **Verify the file exists**: check whether `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md` is present.

   If it does **not** exist, instruct the user:

   > `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md` does not exist. This file is required to drive the upgrade and must be regenerated from the current shadcn-ui components before continuing.
   >
   > Please run `/shadcn-customizations` to generate it, then run `/shadcn-customizations` again after applying any fixes to confirm everything is documented. Let me know when it is in place and current.

   Do not continue until the file exists.

2. **Verify it is current**: ask the user:

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

## Step 0 — Verify Standard Customizations Are In Sync

After reading the [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines), compare the standard customizations listed there against the standard customizations this command tracks — named in Step 0 and the Step 5 subagent instructions (currently: "TSDocs on all exports?" and "pr-twp on DOM-rendered components?").

If the style guide lists standard customizations that are not represented as table columns, or vice versa, **stop immediately** and tell the user:

> The standard customizations in [shadcn/ui Guidelines](.context/standards/Code-Style-Guide.md#shadcnui-guidelines) no longer match what this command tracks. Please update this command (the standard customizations named in Step 0 and the Step 5 subagent instructions), all other shadcn commands, and the `shadcn-customization-tracker` agent to reflect the current standard customizations before running.
>
> Suggested prompt to fix this:
>
> ```
> The shadcn/ui Guidelines section of .context/standards/Code-Style-Guide.md defines these standard customizations: [fill in from what you read in the style guide]. The shadcn commands and `shadcn-customization-tracker` agent are out of date — they still track: [fill in from what you read in the commands]. Read the commands and agent to determine what parts need to be updated, and update them to match the style guide.
> ```

## Step 1 — Copy Files to `shadcn-ui-old/`

Run the appropriate platform command. No subagent is needed — the operation produces no file-content output.

```bash
# Linux / macOS / WSL2:
mkdir -p lib/platform-bible-react/src/components/shadcn-ui-old
cp lib/platform-bible-react/src/components/shadcn-ui/*.tsx lib/platform-bible-react/src/components/shadcn-ui-old/

# Windows (PowerShell):
New-Item -ItemType Directory -Force lib\platform-bible-react\src\components\shadcn-ui-old
Copy-Item lib\platform-bible-react\src\components\shadcn-ui\*.tsx lib\platform-bible-react\src\components\shadcn-ui-old\
```

`shadcn-ui-old/` is gitignored, so the copied files will not appear in git. The originals remain in place. The folder is left after this command completes so the customization subagents can refer back to it in Step 5.

## Step 2 — Apply Preset

Run the following from `lib/platform-bible-react/` to apply the preset and capture output in one step:

```bash
cd lib/platform-bible-react
npm run apply-shadcn-preset-destructive -- $PRESET 2>&1 | tee ../../shadcn-apply-output.txt
```

This script internally applies the new preset to all shadcn components, adds any missing ones from the updated preset, runs formatting, and commits to establish a new baseline. The full output is always saved to `shadcn-apply-output.txt` in the repository root, whether the script succeeds or fails — tell the user it is available there for reference.

**If the script succeeds and commits on its own**, verify that the commit message contains `npx shadcn apply --preset $PRESET`. If it does, this is **commit 1 of 3** — the fresh shadcn baseline with no customizations applied. Do not squash or amend it. Proceed to Step 3.

**If the script fails:**

> **Do NOT re-run `apply-shadcn-preset-destructive`** — the output captured above gives you all the information you need.

1. Stage changes in `lib/platform-bible-react` exactly as they came from the script (do not modify anything yet):

   ```bash
   git add lib/platform-bible-react/
   git add package-lock.json
   ```

2. **Dispatch a subagent** to fix any simple, obvious problems flagged by the script output. Give it this prompt:

   > You are fixing format and lint errors that occurred after running `apply-shadcn-preset-destructive` for shadcn/ui in `lib/platform-bible-react`. The script output is saved at `shadcn-apply-output.txt` in the repository root — read that file to understand exactly what problems were flagged.
   >
   > Attempt to fix **simple, obvious problems** — for example, straightforward type errors, missing imports, or lint issues with clear fixes that the script identified. Do **not** run `npm run typecheck` or `npm run build`; those will be handled later after customizations are re-applied. Stick to what the `apply-shadcn-preset-destructive` output flagged.
   >
   > For each problem, prefer small, targeted fixes: changing `null` to `undefined`, small type reworks, scoped type assertions with an explanation comment, or minor accessibility improvements. Add a `// CUSTOM: <explanation>` comment immediately before each change you make, explaining what you changed and why.
   >
   > **Do NOT add ESLint rule overrides or disable comments to `.eslintrc.cjs` or any other config file.** If a small code-level fix is not possible, leave the problem unfixed and record it.
   >
   > When done:
   > 1. If you fixed **all** problems, re-run the format/lint commands that `apply-shadcn-preset-destructive` specified to verify everything passes (typically `npm run format` and/or `npm run lint-fix` from `lib/platform-bible-react`). Include the output of those commands in your report.
   > 2. Return a complete report that includes:
   >    - Every problem you fixed: a description of the problem and exactly how you fixed it (file path, what changed)
   >    - Every problem you left unfixed: a description with concrete suggestions for how to address it
   >    - The exact format/lint commands that the `apply-shadcn-preset-destructive` output instructed should be run to verify everything passes
   >    - If you ran those commands: whether they passed or failed, and the output if they failed

   Wait for the subagent to complete.

3. **STOP — always wait for user review before proceeding**, even if the subagent fixed every problem and all commands passed. Show the user the subagent's complete report and say:

   > The subagent made changes after `apply-shadcn-preset-destructive` failed. Please review the changes above and let me know:
   > - If you approve the changes and are ready for me to continue, or
   > - If you want to fix anything yourself, ask me to fix something differently, or suggest an alternative approach.
   >
   > The full script output is also available at `shadcn-apply-output.txt` in the repository root for your reference.

   **Do not proceed until the user explicitly confirms they approve the changes.**

4. If the user or you made any further changes after the subagent, re-run the format/lint commands that the `apply-shadcn-preset-destructive` output specified to verify everything still passes:

   ```bash
   cd lib/platform-bible-react
   # run whichever commands the script output specified (typically npm run format and/or npm run lint-fix)
   ```

   If any command fails, stop and report the errors to the user before proceeding. If no further changes were made and the subagent already verified those commands passed, skip this step.

5. Once all commands pass, stage changes and commit using the message the `apply-shadcn-preset-destructive` output provided:

   ```bash
   git add lib/platform-bible-react/
   git add package-lock.json
   git commit --no-verify -m "<message from apply-shadcn-preset-destructive output>"
   ```

   **Before committing**, verify the commit message contains `npx shadcn apply --preset $PRESET`. If the script did not supply a commit message, use: `chore: apply shadcn preset (npx shadcn apply --preset $PRESET) to re-add shadcn components from latest version as a new baseline`.

This is **commit 1 of 3**: the fresh shadcn baseline with no customizations applied. Do not squash or amend it — it is the reference point for all future customization diffs.

## Step 3 — Propagate Changes to Extensions

After the baseline commit, **dispatch a general-purpose subagent** to propagate relevant changes from `lib/platform-bible-react` to all extension files. Give it this prompt:

> You are propagating changes from a shadcn/ui upgrade in `lib/platform-bible-react` to all extensions in the `extensions/` directory.
>
> **3a — Propagate CSS changes**
>
> Find all extension `tailwind.css` files:
> ```bash
> find extensions -name "tailwind.css"
> ```
> Read the diff of `lib/platform-bible-react/src/index.css` from the most recent git commit to understand exactly what changed:
> ```bash
> git diff HEAD~1 HEAD -- lib/platform-bible-react/src/index.css
> ```
> Apply those same changes to each found `tailwind.css` file.
>
> **3b — Propagate package.json changes**
>
> Read the diff of `lib/platform-bible-react/package.json` from the most recent commit:
> ```bash
> git diff HEAD~1 HEAD -- lib/platform-bible-react/package.json
> ```
>
> Apply two types of changes to package.json files:
>
> 1. **Updated packages**: For any package already present in an extension's `package.json` whose version changed in `lib/platform-bible-react/package.json`, update the extension's version to match.
> 2. **New packages**: For any new package added to `lib/platform-bible-react/package.json` by this commit, add it as **`devDependencies`** (not `dependencies`) to every qualifying extension's `package.json`. Extensions are bundled differently from `platform-bible-react` — almost no packages should be in `dependencies`.
>
> Which files to update:
> - Individual extension `package.json` files (in the same directory as each `tailwind.css` found in step 3a) — add all new/updated packages here
> - The root `extensions/package.json` (if it exists) — add all new/updated packages **except** packages that are used only via CSS `@import` or font `url()` references (i.e., purely CSS-referenced font or asset packages that are not imported anywhere in JS/TS). Those CSS-only packages belong in the individual extensions that reference them, not in the shared root.
>
> When done, return a summary of every file you changed and what you changed in each one (package name, old version → new version, or "added as devDependency").

Wait for the subagent to complete. Then commit its changes:

```bash
git add extensions/
git add package-lock.json
git commit -m "chore: propagate shadcn preset CSS and package changes to extensions"
```

This is **commit 2 of 3**.

## Step 4 — List Component Files

```bash
ls lib/platform-bible-react/src/components/shadcn-ui/
```

Collect all `.tsx` filenames (exclude `CUSTOMIZATIONS.md`). Note which filenames are **new** — i.e., present here but absent from `shadcn-ui-old/` — because these were added by the new preset and will have no entry in `CUSTOMIZATIONS.md`.

Record the **filenames** (e.g. `button.tsx`) — used for subagents in Step 5.

## Step 5 — Re-apply Customizations

Divide the component list from Step 4 into **5 roughly equal consecutive chunks** by splitting the sorted list (e.g. files 1–7, 8–13, 14–19, 20–25, 26–32 for 32 components). Dispatch **5 general-purpose subagents in a single message** so they run in parallel. Do not use worktree isolation — each subagent works on a non-overlapping set of files.

Copy the block below verbatim into each subagent's prompt, substituting the assigned filenames:

---

**Instructions for each subagent:**

You are re-applying project customizations to a set of freshly updated shadcn/ui component files. For each component file assigned to you:

1. **Check whether this component has an entry in CUSTOMIZATIONS.md** — read `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md`. If the component has **no entry**, it is a new component added by the updated preset. Skip steps 2–5 and apply only the standard customizations listed in step 6. If the component **has an entry**, continue with all steps.

2. **Read the CUSTOMIZATIONS.md entry** for this component. Identify every customization listed under "Explicit `// CUSTOM:` customizations", "Other comment-indicated customizations", and "Uncalled-out customizations (from git history)".

3. **Read the old file** from `lib/platform-bible-react/src/components/shadcn-ui-old/<filename>` to understand how the customization was previously implemented.

4. **Read the new file** from `lib/platform-bible-react/src/components/shadcn-ui/<filename>` to understand the current structure from the latest shadcn version.

5. **Re-apply every customization by hand.** Do NOT copy code from the old file literally — the new file may have a different structure. Instead, understand the *intent* of each customization (what it does and why) from CUSTOMIZATIONS.md and the old file, then implement that intent in the new file's context.

6. **Add a `// CUSTOM:` comment** immediately before every changed line or block. The comment must state what was changed, what it does, and why. Example:
   ```
   // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
   ```

7. **Standard customizations** that must be present on every applicable component (from the shadcn/ui Guidelines):
   - `pr-twp` at the **front** of the base Tailwind class string on every DOM-rendered component (components with HTMLElement props, `React.ComponentPropsWithoutRef`, or `React.forwardRef`). Does NOT apply to state-coordinating roots (Dialog, Popover) or cva factories.
   - TSDoc (`/** ... */`) on every exported symbol, with hyperlinks to the upstream library docs (shadcn/ui page, Radix UI primitive page, etc.).

If a customization in CUSTOMIZATIONS.md no longer makes sense (e.g. the new version already implements the same behavior), skip it — do NOT leave a comment in the file. Instead, include it in your report using this exact format at the end of your response:

```
## Skipped Customizations

### <filename.tsx>
- **Customization:** <brief description of the customization from CUSTOMIZATIONS.md>
  **Reason skipped:** <why it no longer applies>

### <filename.tsx>
- **Customization:** <brief description>
  **Reason skipped:** <why>
```

If you skipped no customizations, omit the section entirely.

---
End of subagent instructions.

After all 5 subagents complete:

1. **Collect skipped customizations** from each subagent's report. If any subagents reported skipped customizations, compile them all into `lib/platform-bible-react/src/components/shadcn-ui/SKIPPED-CUSTOMIZATIONS.md`:

   ```markdown
   # Skipped Customizations

   These customizations from `CUSTOMIZATIONS.md` were not re-applied during the shadcn upgrade because they no longer made sense in the new version. Review and delete this file once you have decided whether any of these need to be addressed differently.

   ### <filename.tsx>
   - **Customization:** <description>
     **Reason skipped:** <reason>
   ```

   If no subagents reported any skipped customizations, do not create this file.

2. **Stage all changes** in the shadcn-ui folder (component files + SKIPPED-CUSTOMIZATIONS.md if created):

```bash
git add lib/platform-bible-react/src/components/shadcn-ui/
```

3. **If any skipped customizations were found**, stop and tell the user:

   > Some customizations were skipped during the upgrade and recorded in `lib/platform-bible-react/src/components/shadcn-ui/SKIPPED-CUSTOMIZATIONS.md`. Please review that file and let me know:
   > - If any skipped customizations need to be reconsidered (describe what you'd like to do and I'll handle it), or
   > - If everything looks fine and you're ready for me to continue.

   Do not proceed until the user confirms they are ready. If no skipped customizations were found, proceed directly.

4. **Dispatch a subagent** to verify and fix code quality. Give it this prompt:

   > You are verifying and fixing code quality for freshly customized shadcn/ui components in `lib/platform-bible-react`. Run the following commands in sequence, resolving any issues that arise before moving on to the next:
   >
   > 1. `cd lib/platform-bible-react && npm run typecheck` — fix any TypeScript errors in `src/components/shadcn-ui/` before proceeding
   > 2. `cd lib/platform-bible-react && npm run lint-fix` — auto-fix lint issues; if any non-auto-fixable errors remain, fix them manually in the component files
   > 3. `cd lib/platform-bible-react && npm run format` — auto-format; no manual action needed unless it exits non-zero
   > 4. `cd lib/platform-bible-react && npm run build` — the build must pass before you finish
   >
   > For each issue you encounter, try your best to resolve it by editing files in `lib/platform-bible-react/src/components/shadcn-ui/`. Prefer small, targeted fixes: changing `null` to `undefined`, small type reworks, scoped type assertions with an explanation comment, or minor accessibility improvements. Re-run the relevant command after each fix to confirm it passes before moving to the next step.
   >
   > **Do NOT add ESLint rule overrides or disable comments to `lib/platform-bible-react/.eslintrc.cjs` or any other config file.** If small code-level fixes cannot resolve a lint issue, record the problem as unresolved and move on — do not reach for config overrides. The orchestrator will discuss with the user whether an override is appropriate.
   >
   > When you cannot resolve an issue (e.g. a type error requires understanding design intent, or a build failure has an unclear root cause), record the problem — including the exact error output and what you tried — and **continue attempting to fix all remaining issues** before returning. Do not stop at the first failure; exhaust all issues first, then return a summary listing every unresolved problem.
   >
   > When all four commands pass, return a brief success summary. If any issues remain unresolved, return a detailed description of each one — exact error output, what you tried, and why you could not fix it.

   Wait for the subagent to complete. If it reports unresolved problems, **stop and discuss with the user** before proceeding. Do not commit until all four commands pass cleanly.

5. **Commit all changes** (component files, SKIPPED-CUSTOMIZATIONS.md if created, and build artifacts from `npm run build`):

```bash
git add lib/platform-bible-react/
git commit -m "chore: re-apply project customizations to upgraded shadcn components"
```

This is **commit 3 of 3**. Using `git add lib/platform-bible-react/` (not just the shadcn-ui subfolder) ensures the rebuilt dist output and any other generated files are included in the same commit rather than as a separate one.

## Step 6 — Create PR

Use the `pr-creator` skill to create the PR targeting **`main`**.

The PR description must include:

- A summary of the three-commit structure: what each commit represents (shadcn preset baseline → extension propagation → re-applied customizations)
- A prominent warning:

> ⚠️ **This PR MUST NOT be squash-merged.** Use a normal merge. The three-commit history is essential for future shadcn upgrades: commit 1 shows exactly what the new shadcn preset changed (baseline with no customizations), commit 2 propagates CSS and package changes to extensions, and commit 3 shows the re-applied customizations. Squashing destroys this history.
