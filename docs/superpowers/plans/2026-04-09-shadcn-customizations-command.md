# Shadcn Customizations Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a `/shadcn-customizations` command and a `shadcn-customization-tracker` subagent that together analyze all shadcn components in `lib/platform-bible-react/src/components/shadcn-ui/` and produce a `CUSTOMIZATIONS.md` file documenting every customization made relative to the original boilerplate.

**Architecture:** A Claude command file orchestrates parallel dispatch of a reusable agent — one per component file. Each agent reads the current file and its git history to produce a structured customization report. The command aggregates all reports into a single `CUSTOMIZATIONS.md`.

**Tech Stack:** Claude agent/command markdown files, git (`--diff-filter=A`), paranext-core TypeScript/React codebase.

---

## File Map

| File                              | Location                                                                                        | Action                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `shadcn-customization-tracker.md` | `/home/tj_co/source/repos/ai-prompts/ai-porting/.claude/agents/shadcn-customization-tracker.md` | Create                                           |
| `shadcn-customizations.md`        | `/home/tj_co/source/repos/ai-prompts/ai-porting/.claude/commands/shadcn-customizations.md`      | Create                                           |
| `CUSTOMIZATIONS.md`               | `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md` (paranext-core)           | Generated output — committed on a feature branch |

**Note on symlinks:** `.claude/` in paranext-core is a symlink to `/home/tj_co/source/repos/ai-prompts/ai-porting/.claude/`. Write files directly to the ai-prompts path. After writing, verify the symlink is working: `ls /home/tj_co/source/repos/paranext-core/.claude/agents/shadcn-customization-tracker.md` should resolve.

**Note on branching:** Two branches are needed:

- **ai-prompts:** `ai/feature/shadcn-customizations-tj-04-09-2026` — for the agent and command files, PR targeting `ai/main` in `paranext/ai-prompts`
- **paranext-core:** `ai/feature/shadcn-customizations-tj-04-09-2026` — for `CUSTOMIZATIONS.md`, PR targeting `ai/main` in `paranext/paranext-core`

Never commit directly to `main` in either repo.

---

## Task 1: Create the `shadcn-customization-tracker` agent

**Files:**

- Create: `/home/tj_co/source/repos/ai-prompts/ai-porting/.claude/agents/shadcn-customization-tracker.md`

- [ ] **Step 1: Create a new branch in ai-prompts**

```bash
cd /home/tj_co/source/repos/ai-prompts/ai-porting
git fetch origin
git checkout ai/main
git pull origin ai/main
git checkout -b ai/feature/shadcn-customizations-tj-04-09-2026
```

Expected: new branch created from latest `ai/main`.

- [ ] **Step 2: Write the agent file**

Write `/home/tj_co/source/repos/ai-prompts/ai-porting/.claude/agents/shadcn-customization-tracker.md` with this exact content:

````markdown
---
name: shadcn-customization-tracker
description: 'Analyzes a single shadcn component file in lib/platform-bible-react/src/components/shadcn-ui/ and reports all customizations made relative to the original boilerplate. Returns a structured markdown report for aggregation by the shadcn-customizations command. Input: a single file path relative to the paranext-core repo root.'
allowed-tools: Bash, Read, Grep
---

# Shadcn Customization Tracker

You analyze a single shadcn component file and produce a structured markdown report of all customizations made to it relative to the original boilerplate.

## Input

You will be given a single file path relative to the paranext-core repo root (e.g., `lib/platform-bible-react/src/components/shadcn-ui/button.tsx`). The repo root is `/home/tj_co/source/repos/paranext-core` (or resolve via `git rev-parse --show-toplevel` from anywhere inside the repo).

## Algorithm

### Step 1 — Read the current file

Read the full file. As you read:

- Collect every `// CUSTOM:` comment and the code it annotates (the line(s) immediately after)
- Collect any other comments that clearly indicate customization intent (e.g. "CUSTOM JSDoc comments added", "Changed from X to Y", "Added for accessibility")
- List every exported symbol (functions, interfaces, constants, types) for the TSDocs check
- Identify all DOM-rendered components (see criteria below)

**Identifying DOM-rendered components:** A component is DOM-rendered if it produces actual DOM output and could be used standalone. Criteria:

- Prop types include an HTML element type directly: `HTMLDivElement`, `HTMLButtonElement`, `HTMLInputElement`, `HTMLSpanElement`, etc.
- Prop types use `React.ComponentPropsWithoutRef<typeof SomePrimitive>`, `React.ComponentProps<...>`, or `React.HTMLAttributes<...>` — these wrap an underlying DOM element via a Radix primitive
- Component is declared with `React.forwardRef<HTMLSomeElement, Props>(...)`
- When uncertain: look at what the component renders — if it renders an HTML tag or a Radix primitive (`PopoverPrimitive.Content`, `DialogPrimitive.Content`, etc.), it is DOM-rendered

**Not DOM-rendered:** compound root components that coordinate state without a DOM representation (e.g. `Popover`, `Dialog`, `DropdownMenu` roots); cva variant factories like `buttonVariants` (these are functions, not components).

### Step 2 — Get boilerplate diff

Run exactly:

```bash
REPO_ROOT=$(git -C /home/tj_co/source/repos/paranext-core rev-parse --show-toplevel)
FILE="<the file path you were given, relative to repo root>"
FIRST_ADD=$(git -C "$REPO_ROOT" log --diff-filter=A --oneline --follow -- "$FILE" | head -1 | awk '{print $1}')
echo "Boilerplate baseline commit: $FIRST_ADD"
git -C "$REPO_ROOT" diff "${FIRST_ADD}..HEAD" -- "$FILE"
```

**Why `--diff-filter=A | head -1`:** Finds only commits where the file was Added (not modified or renamed). `head -1` takes the most recent add — correct even if the file was deleted and re-added, because the most recent add is the last known boilerplate state.

**Edge case — `$FIRST_ADD` is empty:** The file was introduced in a way git doesn't surface with `--diff-filter=A` (e.g., a squash-merge). Do NOT silently skip. In the Uncalled-out section, write:

> ⚠️ Could not determine boilerplate baseline: no "add" commit found via `git log --diff-filter=A`. Uncalled-out customizations from git history are unavailable for this file.

**Edge case — diff is empty (but `$FIRST_ADD` exists):** The file was added in its already-customized form and hasn't changed since. In the Uncalled-out section, write:

> File appears unchanged since it was added to this repo (diff is empty). Either all customizations were already present at the time of the add commit, or no customizations have been made since.

### Step 3 — Non-shadcn heuristic check

Inspect the boilerplate state:

```bash
git -C "$REPO_ROOT" show "${FIRST_ADD}:${FILE}" | head -30
```

Check whether the boilerplate content includes recognizable shadcn patterns: imports from `@radix-ui`, use of `cva`, use of the `cn` utility. If none are present, inspect the commit message (`git -C "$REPO_ROOT" show --no-patch "$FIRST_ADD"`) and the file's overall structure before continuing.

**Known limitation:** This heuristic only catches files that look nothing like shadcn. A custom component that uses the same conventions (radix, cva, cn) will pass the check even if it was never copied from the shadcn boilerplate. The check is a safety net, not a guarantee. If genuinely uncertain, skip with a note rather than produce a potentially misleading analysis.

### Step 4 — Analyze uncalled-out changes

Go through the diff line by line. For each changed section:

1. Determine whether it is already documented by a `// CUSTOM:` comment or another custom-indicating comment in the current file
2. If not documented: record it as an uncalled-out customization with:
   - **Where**: which component, which element, prop, or class string
   - **What**: what changed from the boilerplate to now
   - **Why**: your best assessment of the purpose (note uncertainty if unsure)

Be thorough. If in doubt about whether something should be listed, list it with a note that you weren't certain.

### Step 5 — Return your report

Return markdown in exactly this structure. Use `(none)` for empty sections, never leave them blank.

```markdown
## <filename.tsx>

### Standard customizations

- TSDocs: [✅ present on all exports / ❌ missing on: ExportA, ExportB]
- DOM-rendered components:
  - `ComponentName` → pr-twp ✅
  - `OtherComponent` → pr-twp ❌
  - `VariantFactory` — not DOM-rendered (cva variant factory, not a component)
  - `RootComponent` — not DOM-rendered (compound root, coordinates state only)

### Explicit `// CUSTOM:` customizations

- **Where:** [exact location — component name, prop, class string, etc.]
  **What:** [what was changed or added]
  **Why:** [the explanation from the comment]

### Other comment-indicated customizations

- **Where:** [location]
  **What:** [what was changed]
  **Note:** [explanation from the comment]

### Uncalled-out customizations (from git history)

- **Where:** [location]
  **What:** [what changed from boilerplate to current]
  **Why:** [your assessment]
  **Note:** [if uncertain, say so here]
```

**If you skip the file**, return:

```markdown
## <filename.tsx>

⚠️ Skipped: [reason — e.g., "boilerplate state contains no shadcn patterns and commit message does not reference shadcn"]

### Standard customizations

⚠️ Skipped — see above

### Explicit `// CUSTOM:` customizations

⚠️ Skipped — see above

### Other comment-indicated customizations

⚠️ Skipped — see above

### Uncalled-out customizations (from git history)

⚠️ Skipped — see above
```
````

- [ ] **Step 3: Verify the symlink resolves**

```bash
ls /home/tj_co/source/repos/paranext-core/.claude/agents/shadcn-customization-tracker.md
```

Expected: file listed (symlink resolves through to ai-prompts).

- [ ] **Step 4: Commit the agent file**

```bash
cd /home/tj_co/source/repos/ai-prompts/ai-porting
git add .claude/agents/shadcn-customization-tracker.md
git commit -m "feat: add shadcn-customization-tracker agent"
```

---

## Task 2: Test the agent on `button.tsx`

No automated tests exist for Claude agents — validation is done by running the agent and inspecting output.

- [ ] **Step 1: Dispatch the agent on `button.tsx`**

Using the Agent tool, dispatch `shadcn-customization-tracker` with this prompt:

```
Analyze this file: lib/platform-bible-react/src/components/shadcn-ui/button.tsx
```

- [ ] **Step 2: Verify the output structure**

The agent's response must contain:

- `## button.tsx` heading
- `### Standard customizations` with TSDocs status and DOM-rendered component list
- `### Explicit // CUSTOM: customizations` section
- `### Other comment-indicated customizations` section
- `### Uncalled-out customizations (from git history)` section
- The git command `git log --diff-filter=A` must have found commit `b96ee0fe3f` as `$FIRST_ADD`
- The diff must show changes (tw- prefix, pr-twp, TSDocs additions, export keyword changes)

Check against what we know about button.tsx from the brainstorming session:

- TSDocs were added to `buttonVariants`, `ButtonProps`, and `Button`
- `pr-twp` was added to the base class string in `buttonVariants`
- Tailwind prefix changed from `pr-` to `tw-`
- `export` keyword added inline; trailing `export { Button, buttonVariants }` removed
- `import * as React` changed to `import React`
- `tw-gap-2` and SVG classes added
- `buttonVariants` was made exported (was internal in boilerplate)

If output is missing key items or sections are malformed, note the issues and fix the agent file before continuing.

- [ ] **Step 3: Fix agent if needed, re-run**

If Step 2 reveals issues, edit the agent file and re-test until output is correct.

---

## Task 3: Create the `shadcn-customizations` command

**Files:**

- Create: `/home/tj_co/source/repos/ai-prompts/ai-porting/.claude/commands/shadcn-customizations.md`

- [ ] **Step 1: Write the command file**

Write `/home/tj_co/source/repos/ai-prompts/ai-porting/.claude/commands/shadcn-customizations.md` with this exact content:

````markdown
# Shadcn Customizations

Analyze all shadcn component files in `lib/platform-bible-react/src/components/shadcn-ui/` and write a `CUSTOMIZATIONS.md` documenting every customization made relative to the original boilerplate.

## Steps

### Step 1 — List files

```bash
ls /home/tj_co/source/repos/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/
```

Collect all filenames excluding `CUSTOMIZATIONS.md`. These are the files to analyze.

### Step 2 — Dispatch agents in parallel

For every file collected in Step 1, dispatch one `shadcn-customization-tracker` agent. Pass each agent a prompt like:

```
Analyze this file: lib/platform-bible-react/src/components/shadcn-ui/<filename>
```

Dispatch ALL agents in a **single message** so they run in parallel. Do not use worktree isolation — agents are read-only.

### Step 3 — Assemble CUSTOMIZATIONS.md

Once all agents return their reports, write `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md` (overwrite if it already exists).

**Document structure:**

#### Disclaimer and h1 heading (exact text)

```
> This file is AI-generated at specific times for use with updating shadcn components and may not reflect current code. It is retained for ease of reference only.

# Shadcn UI Component Customizations
```

#### `## Standard Customizations`

Build a single table from the `### Standard customizations` section of every agent report. Sort rows alphabetically by component filename.

| Component | TSDocs on all exports? | DOM-rendered components |
| --------- | ---------------------- | ----------------------- |

- **TSDocs column:** ✅ if all exports have TSDocs; otherwise list the missing exports (e.g., `❌ missing: ButtonProps`)
- **DOM-rendered components column:** list each DOM-rendered component with its `pr-twp` status (✅ or ❌). Components the agent identified as not DOM-rendered should NOT appear in this column. For skipped files: `⚠️ skipped — see note below`

#### `## Per-Component Customizations`

For each component (alphabetical order), emit a `### filename.tsx` section containing the agent's three non-standard sections, re-leveled from `###` to `####`:

```markdown
### filename.tsx

#### Explicit `// CUSTOM:` customizations

[content from agent]

#### Other comment-indicated customizations

[content from agent]

#### Uncalled-out customizations (from git history)

[content from agent]
```

If all three sections are `(none)`, replace with a single line:

> No non-standard customizations.

For skipped files, emit:

```markdown
### filename.tsx

⚠️ Skipped: [reason from agent report]
```
````

- [ ] **Step 2: Verify the symlink resolves**

```bash
ls /home/tj_co/source/repos/paranext-core/.claude/commands/shadcn-customizations.md
```

Expected: file listed.

- [ ] **Step 3: Commit the command file**

```bash
cd /home/tj_co/source/repos/ai-prompts/ai-porting
git add .claude/commands/shadcn-customizations.md
git commit -m "feat: add shadcn-customizations command"
```

---

## Task 4: Run the full command and produce CUSTOMIZATIONS.md

- [ ] **Step 1: Run `/shadcn-customizations`**

Invoke the `shadcn-customizations` command (either via the Skill tool or by following its instructions directly). This dispatches ~31 agents in parallel.

- [ ] **Step 2: Verify CUSTOMIZATIONS.md structure**

Check that the generated file at `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md`:

- Starts with the disclaimer blockquote
- Has a `## Standard Customizations` table with one row per component
- Has a `## Per-Component Customizations` section with `### filename.tsx` entries sorted alphabetically
- Each component entry uses `####` subheadings
- Components with no non-standard customizations say "No non-standard customizations."
- Any skipped files have a note in both sections

Spot-check `button.tsx` and `popover.tsx` entries for accuracy against what we know.

- [ ] **Step 3: Create a feature branch in paranext-core and commit CUSTOMIZATIONS.md**

```bash
cd /home/tj_co/source/repos/paranext-core
git fetch origin
git checkout ai/main
git pull origin ai/main
git checkout -b ai/feature/shadcn-customizations-tj-04-09-2026
git add lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md
git commit -m "docs: add AI-generated shadcn UI customizations reference"
```

---

## Task 5: Open PR for agent and command in ai-prompts

- [ ] **Step 1: Push the ai-prompts branch**

```bash
cd /home/tj_co/source/repos/ai-prompts/ai-porting
git push -u origin ai/feature/shadcn-customizations-tj-04-09-2026
```

- [ ] **Step 2: Open PR targeting `ai/main` in `paranext/ai-prompts`**

```bash
cd /home/tj_co/source/repos/ai-prompts/ai-porting
gh pr create \
  --repo paranext/ai-prompts \
  --base ai/main \
  --head ai/feature/shadcn-customizations-tj-04-09-2026 \
  --title "feat: add shadcn-customizations command and tracker agent" \
  --body "$(cat <<'EOF'
## Summary

- Adds `shadcn-customization-tracker` agent: analyzes a single shadcn component file and reports all customizations relative to the original boilerplate (explicit `// CUSTOM:` comments, other comments, and uncalled-out git-history changes)
- Adds `shadcn-customizations` command: dispatches tracker agents in parallel for all files in `lib/platform-bible-react/src/components/shadcn-ui/` and aggregates into `CUSTOMIZATIONS.md`
- Design spec: `docs/superpowers/specs/2026-04-09-shadcn-customizations-command-design.md`

## Test plan

- [ ] Agent tested manually on `button.tsx` — output verified against known customizations
- [ ] Full command run against all 31 component files — `CUSTOMIZATIONS.md` produced and spot-checked

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Task 6: Open PR for CUSTOMIZATIONS.md in paranext-core

- [ ] **Step 1: Push the paranext-core branch**

```bash
cd /home/tj_co/source/repos/paranext-core
git push -u origin ai/feature/shadcn-customizations-tj-04-09-2026
```

- [ ] **Step 2: Open PR targeting `ai/main` in `paranext/paranext-core`**

```bash
cd /home/tj_co/source/repos/paranext-core
gh pr create \
  --repo paranext/paranext-core \
  --base ai/main \
  --head ai/feature/shadcn-customizations-tj-04-09-2026 \
  --title "docs: add AI-generated shadcn UI customizations reference" \
  --body "$(cat <<'EOF'
## Summary

- Adds `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md`: AI-generated snapshot of all customizations made to shadcn components relative to their original boilerplate, for use when upgrading to a new shadcn version
- Generated by the `/shadcn-customizations` command (see ai-prompts PR for the command and agent)

## Test plan

- [ ] Spot-checked `button.tsx` and `popover.tsx` entries for accuracy
- [ ] All 31 component files have entries in the Standard Customizations table

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
