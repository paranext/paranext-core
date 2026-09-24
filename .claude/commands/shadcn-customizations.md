# Shadcn Customizations

Analyze all shadcn component files in `lib/platform-bible-react/src/components/shadcn-ui/` and write a `CUSTOMIZATIONS.md` documenting every customization made relative to the original boilerplate.

**Before doing anything else**, read [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines). It is the authoritative source for all conventions used in this command: folder structure, boilerplate baseline, `// CUSTOM:` annotations, and the standard customizations. If anything in this command conflicts with that section, trust the section.

## Steps

### Step 0 — Verify standard customizations are in sync

After reading the [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines), compare the standard customizations listed there against the standard customizations this command tracks — which are the table columns in the `## Standard Customizations` section of `CUSTOMIZATIONS.md` (currently: "TSDocs on all exports?" and "pr-twp on DOM-rendered components?").

If the style guide lists standard customizations that are not represented as table columns in this command, or vice versa, **stop immediately** and tell the user:

> The standard customizations in [shadcn/ui Guidelines](.context/standards/Code-Style-Guide.md#shadcnui-guidelines) no longer match what this command tracks. Please update this command (table columns and assembly instructions), all other shadcn commands, and the `shadcn-customization-tracker` agent to reflect the current standard customizations before running.
>
> Suggested prompt to fix this:
>
> ```
> The shadcn/ui Guidelines section of .context/standards/Code-Style-Guide.md defines these standard customizations: [fill in from what you read in the style guide]. The shadcn commands and `shadcn-customization-tracker` agent are out of date — they still track: [fill in from what you read in the commands]. Read the commands and agent to determine what parts need to be updated, and update them to match the style guide.
> ```

### Step 1 — List files

```bash
ls "$(git rev-parse --show-toplevel)/lib/platform-bible-react/src/components/shadcn-ui/"
```

Collect all filenames excluding `CUSTOMIZATIONS.md`. These are the files to analyze.

### Step 2 — Dispatch agents in parallel

Divide the file list into **5 roughly equal groups** by splitting the sorted list into consecutive chunks (e.g. files 1–7, 8–13, 14–19, 20–25, 26–31). Dispatch **5 `shadcn-customization-tracker` agents** in a **single message** so they run in parallel. Pass each agent its chunk as a plain list of repo-relative paths, e.g.:

```
Analyze these files:
lib/platform-bible-react/src/components/shadcn-ui/alert.tsx
lib/platform-bible-react/src/components/shadcn-ui/avatar.tsx
lib/platform-bible-react/src/components/shadcn-ui/badge.tsx
...
```

Do not use worktree isolation — agents are read-only. Each agent returns one `## filename.tsx` report block per file. Collect all blocks from all 5 agents.

### Step 3 — Assemble CUSTOMIZATIONS.md

Once all agents return their reports, write `lib/platform-bible-react/src/components/shadcn-ui/CUSTOMIZATIONS.md` (overwrite if it already exists).

**Document structure:**

#### Disclaimer and h1 heading (exact text)

```
> This file is AI-generated at specific times for use with updating shadcn components and may not reflect current code. It is retained for ease of reference only. To regenerate, run `/shadcn-customizations` in Claude Code.

# Shadcn UI Component Customizations

This document captures all customizations made to shadcn/ui components relative to their original boilerplate, to aid future shadcn version upgrades. For each component, it records: whether TSDocs are present on all exports, whether DOM-rendered components have the `pr-twp` Tailwind scope class applied, and the specific code changes made (explicit annotations, other comment-indicated changes, and uncalled-out changes detected via git history).
```

#### `## Standard Customizations`

Emit this exact text before the table:

```
The table below summarizes the two standard customizations that every shadcn component should have:

- **TSDocs on all exports?** — Whether every exported symbol (components, interfaces, types, constants) has a TSDoc comment (`/** ... */`) that includes links to the upstream libraries it uses (e.g. the shadcn/ui component page, the Radix UI primitive page, the Vaul page for drawer components). ✅ means all exports have TSDocs with appropriate library links; ❌ lists exports that are missing TSDocs or missing library links. A TSDoc that uses `@inheritdoc` pointing to a symbol whose TSDoc has the required links also passes.
- **pr-twp on DOM-rendered components?** — Whether each component that renders actual DOM output has `pr-twp` in its base Tailwind class string. `pr-twp` is a scope marker required for Platform.Bible's Tailwind CSS isolation (see `tailwind.config.ts`). ✅ means the class is present; ❌ means it is missing. Only components that produce DOM output are listed — compound root components (e.g. `Dialog`, `Popover`) that coordinate state without rendering DOM nodes are excluded, as are cva variant factories.
```

Build a single table from the `### Standard customizations` section of every agent report. Sort rows alphabetically by component filename.

| Component | TSDocs on all exports? | pr-twp on DOM-rendered components? |
| --------- | ---------------------- | ---------------------------------- |

- **TSDocs column:** ✅ only if all exports have TSDocs AND all TSDocs have library links. Otherwise: `❌ missing TSDocs: ExportA` and/or `❌ missing links: ExportB`. These can both appear in the same cell separated by ` / `.
- **pr-twp on DOM-rendered components? column:** list each DOM-rendered component with its `pr-twp` status (✅ or ❌). Components the agent identified as not DOM-rendered should NOT appear in this column. For skipped files: `⚠️ skipped — see note below`

#### `## Per-Component Customizations`

Emit this exact text before the per-component entries:

```
Each section below details the non-standard customizations for one component. There are three subsections:

- **Explicit `// CUSTOM:` customizations** — changes that are already annotated in the source with a `// CUSTOM:` comment.
- **Other comment-indicated customizations** — changes documented by other comments that indicate intent (e.g. "Changed from X to Y", "Added for accessibility").
- **Uncalled-out customizations (from git history)** — changes detected by diffing the current file against its first-add commit, which were not already documented by a comment.
```

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

### Step 4 — Offer to apply fixes

After writing `CUSTOMIZATIONS.md`, ask the user:

> `CUSTOMIZATIONS.md` is written. Would you like me to apply fixes to the component source files? This will:
>
> 1. **Document uncalled-out customizations** — add `// CUSTOM:` comments in the source for every customization reported under "Other comment-indicated" and "Uncalled-out customizations (from git history)" that does not already have a `// CUSTOM:` annotation.
> 2. **Apply missing standard customizations** — for every component with ❌ in the Standard Customizations table, add the missing TSDocs (with library links) and/or add `pr-twp` to the base class string, each annotated with a `// CUSTOM:` comment.
>
> Changes will be applied by 5 parallel subagents, each handling a batch of component files. Proceed?

If the user says yes, collect all component files that have any work to do, divide them into **5 roughly equal groups**, and dispatch **5 editing agents** in a **single message** so they work in parallel. Pass each agent its group of files along with the full tracker report for each file in that group, so it knows exactly what to add.

Once all agents complete, commit the changes:

```bash
git add lib/platform-bible-react/src/components/shadcn-ui/
git commit -m "chore: apply shadcn standard customizations and annotate uncalled-out changes"
```

Then tell the user:

> Changes committed. Note: `CUSTOMIZATIONS.md` now reflects the state **before** these fixes were applied. If you plan to upgrade shadcn with `/upgrade-shadcn`, re-run `/shadcn-customizations` first to regenerate it against the updated source files.
