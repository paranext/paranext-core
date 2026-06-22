---
name: shadcn-customization-tracker
description: "Analyzes a batch of shadcn component files in lib/platform-bible-react/src/components/shadcn-ui/ and reports all customizations made relative to the original boilerplate. Returns one structured markdown report block per file for aggregation by the shadcn-customizations command. Input: a list of file paths relative to the paranext-core repo root."
allowed-tools: Bash, Read, Grep
---

# Shadcn Customization Tracker

You analyze a batch of shadcn component files and produce a structured markdown report of all customizations made to each one relative to the original boilerplate.

**Before doing anything else**, read [shadcn/ui Guidelines](../../.context/standards/Code-Style-Guide.md#shadcnui-guidelines). It is the authoritative source for all conventions you will apply: boilerplate baseline, `// CUSTOM:` annotations, and the standard customizations. If anything in these instructions conflicts with that section, trust the section.

## Input

You will be given a list of file paths relative to the paranext-core repo root, one per line, e.g.:

```
lib/platform-bible-react/src/components/shadcn-ui/button.tsx
lib/platform-bible-react/src/components/shadcn-ui/card.tsx
lib/platform-bible-react/src/components/shadcn-ui/checkbox.tsx
```

The repo root can be resolved via `git rev-parse --show-toplevel` from anywhere inside the repo.

**Run the full algorithm below for each file in the list, in order.** Output one `## filename.tsx` report block per file. Concatenate all blocks in the order the files were given.

## Algorithm

Run Steps 1–4 for each file, then output its Step 5 report block before moving on to the next file.

### Step 1 — Read the current file

Read the full file. As you read:

- Collect every `// CUSTOM:` comment and the code it annotates (the line(s) immediately after)
- Collect any other comments that clearly indicate customization intent (e.g. "CUSTOM JSDoc comments added", "Changed from X to Y", "Added for accessibility")
- List every exported symbol (functions, interfaces, constants, types) for the TSDocs check, and for each:
  - **Presence**: Does it have a TSDoc comment (`/** ... */`)?
  - **Library links**: Does the TSDoc contain a URL linking to the upstream library docs? Required links depend on what the file imports:
    - shadcn/ui boilerplate → link to the shadcn/ui component page (e.g., `https://ui.shadcn.com/docs/components/...`)
    - `@radix-ui/*` imports → link to Radix UI docs (e.g., `https://www.radix-ui.com/...`)
    - `vaul` → link to Vaul docs; other notable upstream libraries → link to their docs
  - **`@inheritdoc` handling**: If a TSDoc consists of `@inheritdoc <Symbol>` (or `{@inheritdoc}`), locate that symbol's TSDoc (same file or imported) and check it for library links — if the linked TSDoc has the required links, count this export as passing both checks.
- Identify all DOM-rendered components (see criteria below)

**Identifying DOM-rendered components:** A component is DOM-rendered if it produces actual DOM output and could be used standalone. Criteria:

- Prop types include an HTML element type directly: `HTMLDivElement`, `HTMLButtonElement`, `HTMLInputElement`, `HTMLSpanElement`, etc.
- Prop types use `React.ComponentPropsWithoutRef<typeof SomePrimitive>`, `React.ComponentProps<...>`, or `React.HTMLAttributes<...>` — these wrap an underlying DOM element via a Radix primitive
- Component is declared with `React.forwardRef<HTMLSomeElement, Props>(...)`
- When uncertain: look at what the component renders — if it renders an HTML tag or a Radix primitive (`PopoverPrimitive.Content`, `DialogPrimitive.Content`, etc.), it is DOM-rendered

**Not DOM-rendered:** compound root components that coordinate state without a DOM representation (e.g. `Popover`, `Dialog`, `DropdownMenu` roots); cva variant factories like `buttonVariants` (these are functions, not components).

**For each exported symbol**, determine:
1. Is it DOM-rendered? → check for `pr-twp` in its rendered output (either directly in its JSX or via a variant factory it applies as className). Record `ComponentName → pr-twp ✅` or `ComponentName → pr-twp ❌`.
2. Is it not DOM-rendered? → record `ExportName — not DOM-rendered (reason)`.
3. Include ALL exported symbols (components, interfaces, variant factories, types) in the DOM-rendered components list so the reader has a complete picture. Interfaces/types that are not components can be noted as `TypeName — type/interface, not a component`.

### Step 2 — Get boilerplate diff

Run exactly:

```bash
REPO_ROOT=$(git rev-parse --show-toplevel)
FILE="<the file path you were given, relative to repo root>"
FIRST_ADD=$(git -C "$REPO_ROOT" log --grep 'npx shadcn apply --preset' --follow --pretty=format:%h -1 -- "$FILE")
if [ -z "$FIRST_ADD" ]; then
  FIRST_ADD=$(git -C "$REPO_ROOT" log --diff-filter=A --follow --pretty=format:%h -1 -- "$FILE")
fi
echo "Boilerplate baseline commit: $FIRST_ADD"
git -C "$REPO_ROOT" diff "${FIRST_ADD}..HEAD" -- "$FILE"
```

**Why `--grep 'npx shadcn apply --preset' --follow --pretty=format:%h -1`:** Finds only commits where the baseline was re-applied. `--follow` ensures we find the commit even if the file was renamed. `--pretty=format:%h` takes just the commit hash. `-1` takes the most recent matching commit — correct even if the baseline was applied multiple times, because the most recent matching commit is the last known boilerplate state.

**Edge case — `$FIRST_ADD` is empty:** The file was introduced in a way git doesn't surface with `--diff-filter=A` (e.g., a squash-merge). Do NOT silently skip. In the Uncalled-out section, write:

> ⚠️ Could not determine boilerplate baseline: no new baseline commit found via `git log --grep 'npx shadcn apply --preset' --follow`. Uncalled-out customizations from git history are unavailable for this file.

**Edge case — diff is empty (but `$FIRST_ADD` exists):** The file was added in its already-customized form and hasn't changed since. In the Uncalled-out section, write:

> File appears unchanged since its baseline commit (diff is empty). Either all customizations were already present at the time of the baseline commit, or no customizations have been made since.

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

### Step 5 — Output this file's report block

After completing Steps 1–4 for the current file, output its report block before proceeding to the next file. Use `(none)` for empty sections, never leave them blank.

```markdown
## <filename.tsx>

### Standard customizations

- TSDocs present: [✅ all exports / ❌ missing on: ExportA, ExportB]
- TSDocs library links: [✅ all have links / ❌ missing links on: ExportC, ExportD (via @inheritdoc: ✅ ExportE)]
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
