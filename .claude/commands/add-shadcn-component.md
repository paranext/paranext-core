# Add Shadcn Component

This command adds a single new shadcn/ui component to `lib/platform-bible-react/src/components/shadcn-ui/` as a clean baseline, then adds the standard project customizations (`pr-twp` and TSDocs with library links) in a second commit. It follows the same two-stage commit pattern as `/upgrade-shadcn` so future upgrades can cleanly diff what shadcn generated vs. what we customized.

**Component parameter**: This command accepts an optional component name argument (e.g. `/add-shadcn-component progress`). If no component is provided, see [Determining the Component Name](#determining-the-component-name) below.

**Before doing anything else**, read [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines). It is the authoritative source for all conventions used in this command: folder structure, boilerplate baseline, `// CUSTOM:` annotations, and the standard customizations. If anything in this command conflicts with that section, trust the section.

## Determining the Component Name

If a component argument was provided to this command, record it as `$COMPONENT` and skip to [Pre-flight Checks](#pre-flight-checks).

If no component was provided, ask the user:

> Which shadcn/ui component would you like to add? (e.g. `progress`, `slider`, `toast`)

Record the response as `$COMPONENT`.

## Pre-flight Checks

Perform these checks in sequence. Do not proceed past a failed check.

### Check 1 — No uncommitted working changes

Run:

```bash
git status --porcelain
```

If any output appears, tell the user:

> There are uncommitted working changes. Please commit or stash them before continuing, then let me know when the working tree is clean.

Do not continue until `git status --porcelain` returns empty output.

### Check 2 — Component not already present

Run:

```bash
ls lib/platform-bible-react/src/components/shadcn-ui/
```

If `$COMPONENT.tsx` appears in the listing, tell the user:

> `$COMPONENT.tsx` already exists in the shadcn-ui folder. This command is for adding new components. To re-document or fix customizations on an existing component, use `/shadcn-customizations` instead.

Do not continue.

### Create Branch

After both checks pass, create a new branch:

```bash
FIRST_NAME=$(git config user.name | awk '{print tolower($1)}')
TODAY=$(date +%m-%d-%Y)
git checkout -b "ai/feature/add-shadcn-${COMPONENT}-${FIRST_NAME}-${TODAY}"
```

## Determine Preset

Run the following to detect the most recently used preset:

```bash
cd lib/platform-bible-react && npm run get-latest-preset
```

Record the output as `$PRESET`. This value is embedded in the baseline commit message so future shadcn tooling — including `get-latest-preset` itself, which greps git history for `npx shadcn apply --preset` — can locate this component's baseline even though `npx shadcn apply` is not literally run.

## Step 0 — Verify Standard Customizations Are In Sync

After reading the [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines), compare the standard customizations listed there against the standard customizations this command tracks — named in this Step 0 and in Step 2 below (currently: "TSDocs on all exports?" and "pr-twp on DOM-rendered components?").

If the style guide lists standard customizations that are not represented here, or vice versa, **stop immediately** and tell the user:

> The standard customizations in [shadcn/ui Guidelines](.context/standards/Code-Style-Guide.md#shadcnui-guidelines) no longer match what this command tracks. Please update this command, all other shadcn commands, and the `shadcn-customization-tracker` agent to reflect the current standard customizations before running.
>
> Suggested prompt to fix this:
>
> ```
> The shadcn/ui Guidelines section of .context/standards/Code-Style-Guide.md defines these standard customizations: [fill in from what you read in the style guide]. The shadcn commands and `shadcn-customization-tracker` agent are out of date — they still track: [fill in from what you read in the commands]. Read the commands and agent to determine what parts need to be updated, and update them to match the style guide.
> ```

## Step 1 — Add the Component

Run the following from `lib/platform-bible-react/` to add the component and capture output in one step:

```bash
cd lib/platform-bible-react
npm run add-shadcn-component -- $COMPONENT $PRESET 2>&1 | tee ../../shadcn-add-output.txt
```

```powershell
# Windows (PowerShell):
cd lib\platform-bible-react
npm run add-shadcn-component -- $COMPONENT $PRESET 2>&1 | Tee-Object ..\..\shadcn-add-output.txt
```

This script internally adds the new component, applies the standard project file transforms, runs formatting and lint-fix, and commits to establish a new baseline. The full output is always saved to `shadcn-add-output.txt` in the repository root, whether the script succeeds or fails — tell the user it is available there for reference.

**If the script succeeds and commits on its own**, verify that the commit message contains `npx shadcn apply --preset $PRESET`. If it does, this is **commit 1 of 2** — the fresh shadcn component with no customizations applied. Do not squash or amend it. Proceed to Step 2.

**If the script fails:**

> **Do NOT re-run `add-shadcn-component`** — the output captured above gives you all the information you need.

1. Stage changes in `lib/platform-bible-react` exactly as they came from the script (do not modify anything yet):

   ```bash
   git add lib/platform-bible-react/
   git add package-lock.json
   ```

2. **Dispatch a subagent** to fix any simple, obvious problems flagged by the script output. Give it this prompt:

   > You are fixing format and lint errors that occurred after running `add-shadcn-component` for shadcn/ui in `lib/platform-bible-react`. The script output is saved at `shadcn-add-output.txt` in the repository root — read that file to understand exactly what problems were flagged.
   >
   > Attempt to fix **simple, obvious problems** — for example, straightforward type errors, missing imports, or lint issues with clear fixes that the script identified. Do **not** run `npm run typecheck` or `npm run build`; those will be handled later after customizations are added. Stick to what the `add-shadcn-component` output flagged.
   >
   > For each problem, prefer small, targeted fixes: changing `null` to `undefined`, small type reworks, scoped type assertions with an explanation comment, or minor accessibility improvements. Add a `// CUSTOM: <explanation>` comment immediately before each change you make, explaining what you changed and why.
   >
   > **Do NOT add ESLint rule overrides or disable comments to `.eslintrc.cjs` or any other config file.** If a small code-level fix is not possible, leave the problem unfixed and record it.
   >
   > When done:
   > 1. If you fixed **all** problems, re-run the format/lint commands that `add-shadcn-component` specified to verify everything passes (typically `npm run format` and/or `npm run lint-fix` from `lib/platform-bible-react`). Include the output of those commands in your report.
   > 2. Return a complete report that includes:
   >    - Every problem you fixed: a description of the problem and exactly how you fixed it (file path, what changed)
   >    - Every problem you left unfixed: a description with concrete suggestions for how to address it
   >    - The exact format/lint commands that the `add-shadcn-component` output instructed should be run to verify everything passes
   >    - If you ran those commands: whether they passed or failed, and the output if they failed

   Wait for the subagent to complete.

3. **STOP — always wait for user review before proceeding**, even if the subagent fixed every problem and all commands passed. Show the user the subagent's complete report and say:

   > The subagent made changes after `add-shadcn-component` failed. Please review the changes above and let me know:
   >
   > - If you approve the changes and are ready for me to continue, or
   > - If you want to fix anything yourself, ask me to fix something differently, or suggest an alternative approach.
   >
   > The full script output is also available at `shadcn-add-output.txt` in the repository root for your reference.

   **Do not proceed until the user explicitly confirms they approve the changes.**

4. If you or the user made any further changes after the subagent, re-run the format/lint commands that the `add-shadcn-component` output specified to verify everything still passes:

   ```bash
   cd lib/platform-bible-react
   # run whichever commands the script output specified (typically npm run format and/or npm run lint-fix)
   ```

   If any command fails, stop and report the errors to the user before proceeding. If no further changes were made and the subagent already verified those commands passed, skip this step.

5. Once all commands pass, stage changes and commit using the message the `add-shadcn-component` output provided:

   ```bash
   git add lib/platform-bible-react/
   git add package-lock.json
   git commit --no-verify -m "<message from add-shadcn-component output>"
   ```

   **Before committing**, verify the commit message contains `npx shadcn apply --preset $PRESET`. If the script did not supply a commit message, use: `chore: add shadcn component $COMPONENT (npx shadcn apply --preset $PRESET) as a new baseline`.

This is **commit 1 of 2**: the raw shadcn component with no project customizations. Do not squash or amend it — it is the reference point for all future customization diffs, mirroring the role of `/upgrade-shadcn`'s commit 1.

## Step 2 — Add Standard Customizations

Read `lib/platform-bible-react/src/components/shadcn-ui/$COMPONENT.tsx`.

Apply the following standard customizations. Each change must be annotated with a `// CUSTOM:` comment placed **immediately before** the changed code, explaining what was changed, what it does, and why — see [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines) for the full `// CUSTOM:` convention.

**Standard customizations to apply:**

1. **`pr-twp` on DOM-rendered components** — Add `pr-twp` at the **front** of the base Tailwind class string on every DOM-rendered component (components whose props use `HTMLElement`-flavored types, `React.ComponentPropsWithoutRef<...>`, `React.HTMLAttributes<...>`, or `React.forwardRef<HTMLSomeElement, ...>`). Does NOT apply to compound state-coordinating roots (e.g. `Dialog`, `Popover` roots) or cva variant factories.

2. **TSDocs with library links on all exports** — Add a `/** ... */` TSDoc comment on every exported symbol (components, interfaces, types, constants). Each TSDoc must include hyperlinks to the upstream library docs for that component (the shadcn/ui component page, the Radix UI primitive page, the Vaul page for drawer components, etc.). A TSDoc that uses `@inheritdoc <Symbol>` pointing to a symbol whose TSDoc already has the required links also passes.

   To get the canonical shadcn/ui docs URL for the component, run:

   ```bash
   npx shadcn docs $COMPONENT --json
   ```

   Use the `docs` URL from the output as the shadcn/ui link. For Radix UI links, search [radix-ui.com/primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) manually.

## Step 3 — Code Quality

Run these commands in sequence from `lib/platform-bible-react/`. Resolve any issues in the component file before moving to the next command:

1. ```bash
   cd lib/platform-bible-react && npm run typecheck
   ```

   Fix any TypeScript errors in `src/components/shadcn-ui/$COMPONENT.tsx` before proceeding.

2. ```bash
   cd lib/platform-bible-react && npm run lint-fix
   ```

   Auto-fix lint issues. If non-auto-fixable errors remain, fix them manually in the component file. Do **not** add ESLint rule overrides or disable comments to `lib/platform-bible-react/.eslintrc.cjs` or any other config file — fix the code instead.

3. ```bash
   cd lib/platform-bible-react && npm run format
   ```

   Auto-format. No manual action needed unless it exits non-zero.

4. ```bash
   cd lib/platform-bible-react && npm run build
   ```

   The build must pass before committing. If the build fails, fix the issues in the component file before continuing.

If any issue cannot be resolved with a small, targeted fix (e.g. a type error requires understanding design intent or the build failure has an unclear root cause), **stop and discuss with the user** before proceeding. Do not commit until all four commands pass cleanly.

## Step 4 — Commit the Customizations

```bash
git add lib/platform-bible-react/
git commit -m "chore: apply standard customizations to new shadcn component $COMPONENT"
```

This is **commit 2 of 2**. Do not squash — the two-commit history allows future shadcn upgrades to cleanly diff what shadcn generated vs what we customized, the same way the three-commit history works for `/upgrade-shadcn`.

## Step 5 — Create PR

Use the `pr-creator` skill to create the PR targeting **`main`**.

The PR description must include:

- A summary of the two-commit structure: commit 1 is the raw shadcn baseline (with standard file transforms but no project customizations), commit 2 is the standard project customizations (`pr-twp` and TSDocs).
- A prominent warning:

> ⚠️ **This PR MUST NOT be squash-merged.** Use a normal merge. The two-commit history is essential for future shadcn upgrades: commit 1 shows exactly what shadcn generated (baseline with no customizations), commit 2 shows the project customizations. Squashing destroys this history.
