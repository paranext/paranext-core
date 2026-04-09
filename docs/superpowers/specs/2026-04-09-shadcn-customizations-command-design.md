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
4. Write `CUSTOMIZATIONS.md` (overwrite on each run)

### CUSTOMIZATIONS.md Structure

```
> This file is AI-generated at specific times for use with updating shadcn components
> and may not reflect current code. It is retained for ease of reference only.

# Shadcn UI Component Customizations

## Standard Customizations

[Table covering all components:]
| Component | TSDocs on all exports? | DOM-rendered components with pr-twp |
|-----------|------------------------|--------------------------------------|
| button.tsx | ✅ | Button ✅ |
| popover.tsx | ✅ | PopoverContent ✅, Popover ❌ (not DOM-rendered) |
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
- Identify all DOM-rendered components (look for components whose prop types include HTML element types like `HTMLDivElement`, `HTMLButtonElement`, etc.)

**Step 2 — Get boilerplate diff**

```bash
FIRST_ADD=$(git log --diff-filter=A --oneline --follow -- <file> | head -1 | awk '{print $1}')
git diff ${FIRST_ADD}..HEAD -- <file>
```

The `--diff-filter=A` flag finds commits where the file was added (not just modified), and `head -1` selects the most recent such commit — correct even if the file was deleted and re-added.

**Step 3 — Non-shadcn heuristic check**
If the boilerplate state (content at `$FIRST_ADD`) shows no recognizable shadcn patterns (no radix-ui imports, no `cva`, no `cn` utility, no `@radix-ui` or similar), flag the file as possibly not a shadcn component and inspect the commit message and file structure more carefully. If genuinely uncertain after checking, skip with a note in the report.

**Step 4 — Analyze diff for uncalled-out changes**
Cross-reference changes found in the diff against the two comment-based lists. Only include changes in the "uncalled-out" list that are not already documented by a comment.

**Step 5 — Return structured markdown report**

### Output Format (per agent)

```markdown
## button.tsx

### Standard customizations

- TSDocs: [present on all exports / missing on: X, Y]
- DOM-rendered components:
  - Button: pr-twp ✅
  - (buttonVariants is not DOM-rendered)

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

| Decision                                         | Rationale                                                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Parallel agents, no worktree                     | Agents are read-only; worktrees would waste disk space unnecessarily                                            |
| Most recent add commit for diff base             | Files may be deleted and re-added; `--diff-filter=A \| head -1` correctly identifies the last boilerplate state |
| Standard customizations in one shared section    | Enables a single-glance audit of TSDocs and `pr-twp` coverage across all components                             |
| Per-component sections for other customizations  | Makes it easy to look up "what changed in table.tsx?"                                                           |
| Overwrite on each run                            | CUSTOMIZATIONS.md is a snapshot, not a changelog; the disclaimer communicates this                              |
| Non-shadcn heuristic with skip-and-note fallback | Prevents false analysis when a file in the directory happens not to be a shadcn component                       |
