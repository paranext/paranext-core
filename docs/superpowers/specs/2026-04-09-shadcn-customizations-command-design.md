# Design: shadcn-customizations Command

**Date:** 2026-04-09
**Status:** Approved

## Problem

`lib/platform-bible-react/src/components/shadcn-ui/` contains shadcn component files that were copied from the shadcn boilerplate at various points in time and later customized in this repo. When upgrading to a new shadcn boilerplate in the future, there is no single place to look up what customizations need to be re-applied. This command creates that reference.

## Goal

A slash command that produces `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md` — a single document recording all customizations made to all shadcn components in this repo, organized to make re-applying them to a new boilerplate as straightforward as possible.

## Deliverables

1. **Command:** `.claude/commands/shadcn-customizations.md` (saved in the ai-prompts repo, symlinked into paranext-core)
2. **Agent:** `.claude/agents/shadcn-customization-tracker.md` (same repo/symlink)
3. **Output:** `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md` (in paranext-core)

## Architecture

**Option chosen: Command + standalone reusable subagent (Option A)**

The command orchestrates; the agent does the per-file analysis. Agents run in parallel since they are read-only and don't need worktree isolation.

## Command Design

**File:** `.claude/commands/shadcn-customizations.md`

### Steps

1. List all files in `lib/platform-bible-react/src/components/shadcn-ui/` excluding `CUSTOMIZATIONS.md` itself
2. Dispatch one `shadcn-customization-tracker` agent per file **in parallel** (no worktree isolation — agents are read-only)
3. Collect all per-file reports
4. Assemble and write `CUSTOMIZATIONS.md` (overwrite on each run)

### Assembling CUSTOMIZATIONS.md from per-file reports

Each agent returns a structured markdown report with these sections:

- `### Standard customizations` — a narrative block with TSDocs status and DOM-rendered component list
- `### Explicit // CUSTOM: customizations`
- `### Other comment-indicated customizations`
- `### Uncalled-out customizations (from git history)`

The command transforms these into the final document as follows:

**Standard Customizations table:** Extract the standard customizations narrative from every agent report and collapse all of them into a single shared table at the top of CUSTOMIZATIONS.md. Each row represents one component file. The table columns are: Component, TSDocs on all exports?, DOM-rendered components (with pr-twp status per component).

**Per-Component sections:** For each file's remaining three sections (explicit `// CUSTOM:`, other comment-indicated, uncalled-out), emit them under a `### filename.tsx` heading inside a `## Per-Component Customizations` section. The heading levels are re-leveled: agent uses `###` for subsections, final doc uses `####`.

**Skipped files:** If an agent skips a file (non-shadcn determination), include a note in both the Standard Customizations table and the Per-Component Customizations section.

### CUSTOMIZATIONS.md Structure

```
> This file is AI-generated at specific times for use with updating shadcn components
> and may not reflect current code. It is retained for ease of reference only.

# Shadcn UI Component Customizations

## Standard Customizations

| Component | TSDocs on all exports? | DOM-rendered components |
|-----------|------------------------|-------------------------|
| button.tsx | ✅ | Button ✅ |
| popover.tsx | ✅ | PopoverContent ✅ |
| sidebar.tsx | ⚠️ skipped — see note | ⚠️ skipped — see note |
...

## Per-Component Customizations

### button.tsx

#### Explicit `// CUSTOM:` customizations
...

#### Other comment-indicated customizations
...

#### Uncalled-out customizations (from git history)
...

### popover.tsx
...

### sidebar.tsx

⚠️ Skipped: [reason why agent determined this may not be a standard shadcn component]
```

Components with no non-standard customizations get a brief note: "No non-standard customizations."

## Subagent Design

**File:** `.claude/agents/shadcn-customization-tracker.md`
**Tools:** `Bash`, `Read`, `Grep`
**Input:** Single file path relative to repo root

### Algorithm

**Step 1 — Read current file**

- Extract all `// CUSTOM:` comments with surrounding context
- Extract any other comments that indicate customization intent
- Identify all exported members (for TSDocs check)
- Identify all DOM-rendered components — look for components that produce actual DOM output. Detection patterns:
  - Prop types include HTML element types: `HTMLDivElement`, `HTMLButtonElement`, `HTMLInputElement`, etc.
  - Prop types use `React.ComponentPropsWithoutRef<typeof SomePrimitive>`, `React.ComponentProps<...>`, or `React.HTMLAttributes<...>` — these wrap an underlying DOM element
  - Component uses `React.forwardRef` with an HTML element ref type
  - When unsure, look at what the component renders: if it renders an HTML tag or a Radix primitive that itself maps to a DOM element, it is DOM-rendered

**Step 2 — Get boilerplate diff**

```bash
FIRST_ADD=$(git log --diff-filter=A --oneline --follow -- <file> | head -1 | awk '{print $1}')
```

`--diff-filter=A` finds only commits where the file was Added (not modified). `head -1` takes the most recent such commit, which is correct even when a file has been deleted and re-added — the most recent add is the last known boilerplate state, which is the right diff base.

**Edge case — no add commit found:** If `$FIRST_ADD` is empty (e.g., the file was introduced via a squash-merge that git doesn't surface with `--diff-filter=A`), the agent must not silently produce an empty diff. Instead, report in the "Uncalled-out customizations" section: "⚠️ Could not determine boilerplate baseline: no add commit found via `git log --diff-filter=A`. Uncalled-out customizations from git history are unavailable for this file."

**Edge case — diff is empty:** If `$FIRST_ADD` is found but `git diff ${FIRST_ADD}..HEAD -- <file>` produces no output, it means the file was added in its already-customized form and has not changed since. Report: "File appears unchanged since it was added. Either all customizations were present at add time, or no customizations have been made."

```bash
git diff ${FIRST_ADD}..HEAD -- <file>
```

**Step 3 — Non-shadcn heuristic check**

Check the boilerplate state (`git show ${FIRST_ADD}:<file>`) for recognizable shadcn patterns: imports from `@radix-ui`, use of `cva`, use of the `cn` utility, etc. If none are present, the file may not be a standard shadcn component — inspect the commit message and file structure more carefully before proceeding.

**Important limitation:** This heuristic only catches files that look nothing like shadcn. Custom components that follow the same conventions (radix imports, cva, cn) will pass the check even if they were not copied from the boilerplate. This is a known limitation; the check is a safety net, not a guarantee. If genuinely uncertain after checking, skip with a note in the report rather than produce a potentially misleading analysis.

**Step 4 — Analyze diff for uncalled-out changes**

Cross-reference changes found in the diff against the two comment-based lists. Only include changes in the "uncalled-out" list that are not already documented by a comment.

**Step 5 — Return structured markdown report**

### Output Format (per agent)

The agent returns markdown with this structure (heading levels use `###` for sections, `####` not used at this level):

```markdown
## button.tsx

### Standard customizations

- TSDocs: [present on all exports / missing on: X, Y]
- DOM-rendered components:
  - `Button` → pr-twp ✅
  - `buttonVariants` — not DOM-rendered (it is a cva variant factory, not a component)

### Explicit `// CUSTOM:` customizations

- **Where:** `buttonVariants` base class string
  **What:** Added `pr-twp` class
  **Why:** Scoped preflight must apply to all rendered content

### Other comment-indicated customizations

(none)

### Uncalled-out customizations (from git history)

- **Where:** Import statement
  **What:** Changed `import * as React from 'react'` → `import React from 'react'`
  **Why:** Likely code style standardization (default import preferred)
  **Note:** Uncertain — may be auto-applied by linter/formatter
```

## Key Design Decisions

| Decision                                                 | Rationale                                                                                                                                                                       |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parallel agents, no worktree                             | Agents are read-only; worktrees would waste disk space unnecessarily                                                                                                            |
| Most recent add commit for diff base                     | Files may be deleted and re-added; `--diff-filter=A \| head -1` selects the last boilerplate state, which is the correct diff base                                              |
| Explicit empty-diff and no-add-commit handling           | Prevents silently missing customizations in edge cases                                                                                                                          |
| Standard customizations in one shared section            | Enables a single-glance audit of TSDocs and `pr-twp` coverage across all components                                                                                             |
| Per-component sections for other customizations          | Makes it easy to look up "what changed in table.tsx?"                                                                                                                           |
| Command re-levels headings when assembling               | Agent uses `###` sections for its own output; the final doc promotes these to `####` under `### filename.tsx`                                                                   |
| Overwrite on each run                                    | CUSTOMIZATIONS.md is a snapshot, not a changelog; the disclaimer communicates this                                                                                              |
| Non-shadcn heuristic with skip-and-note fallback         | Prevents false analysis when a file in the directory happens not to be a shadcn component; limitation (custom shadcn-patterned files pass) is acknowledged                      |
| DOM-rendered detection includes ComponentPropsWithoutRef | Many shadcn components wrap Radix primitives without direct HTML type references; checking forwardRef and ComponentPropsWithoutRef patterns is necessary for accurate detection |
