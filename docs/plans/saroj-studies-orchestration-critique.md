# Critique: `proto/saroj-studies` orchestration prompt

A pre-flight review of the draft orchestration prompt against the actual state of `paranext-core` (this repo) and the PRD. Severity-tiered. Fix the **Critical** items before running; the **Important** items will save real time mid-run; the **Minor** items are nice-to-haves.

> Repo facts referenced below were verified against `main` and `pt-3976-shared-resource-picker-ui` on 2026-05-14.

---

## Critical — will break the run

### C1. Wrong package path

- **Prompt says:** `platform-bible-react (packages/platform-bible-react or similar — explore to confirm path)`
- **Reality:** No `packages/` directory. The shared lib is at `lib/platform-bible-react/`.
- **Impact:** If agents "explore to confirm path" they'll figure it out, but they may waste cycles or place files wrong. Hard-code the right path.

### C2. Two Storybook instances; the stories must land in the right tree

There are two independent Storybook configs in this repo:

| Storybook | Config | Glob | Port | Builder |
|---|---|---|---|---|
| Root (app) | `.storybook/main.ts` | `src/**`, `extensions/src/**` | `6006` | Webpack5 |
| Library | `lib/platform-bible-react/.storybook/main.ts` | `lib/platform-bible-react/src/**` | `6007` | Vite |

The URL the user shared (`http://localhost:6007/?path=/docs/advanced-resourcepickerdialog--docs`) is the **library** Storybook. So Agent A/B stories belong under `lib/platform-bible-react/src/...`. Agent C's full-screen "no project open" state is **app-level**, not a library component — it more naturally lives under `src/stories/platform/` (root Storybook, port 6006).

The prompt collapses both into "the shared component library," which mis-files Agent C.

### C3. Made-up data shape

The prompt invents this resource model:

```ts
{ id, title, abbreviation, language, languageCode, isDownloaded, isAssociatedWithProject, addedBy: 'admin' | 'user' }
```

The real type, defined in `lib/platform-bible-utils/src/resources.model.ts` and used by the in-flight picker:

```ts
export type DblResourceData = {
  dblEntryUid: string;
  displayName: string;
  fullName: string;
  bestLanguageName: string;
  type: 'ScriptureResource' | 'EnhancedResource' | 'XmlResource' | 'SourceLanguageResource';
  size: number;
  installed: boolean;
  updateAvailable: boolean;
  projectId: string;
};
```

Field-by-field deltas:
- `id` → `dblEntryUid`
- `title` → `displayName` (or `fullName`)
- `abbreviation` → no equivalent; `displayName` typically *is* the short name (e.g. `"NIV"`)
- `language`, `languageCode` → `bestLanguageName`
- `isDownloaded` → `installed`
- `isAssociatedWithProject` → not a flag; modeled in the picker via a parallel `selectedResourceIds: string[]`
- `addedBy: 'admin' | 'user'` → not in the model. Maps to "synced via project settings vs added locally"; would need a parallel list, e.g. `adminAssociatedIds: string[]`
- **"Commentaries"** are not a type. In the stub data, "UBS Handbook" is `type: 'XmlResource'`. There is no `'Commentary'` enum value.

**Impact:** Agents will produce stories whose data shapes don't match the real picker / PAPI. Reconciling later is significant churn.

### C4. The shared picker already exists on `pt-3976-shared-resource-picker-ui`

The prompt notes the stub exists but tells Agent A and Agent B to build their *own* pickers (single-select and multi-select variants). The reality on that branch:

- Full component at `lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.component.tsx`
- Stories at `…/resource-picker-dialog.stories.tsx` (title: `'Advanced/ResourcePickerDialog'`)
- Sample data at `…/resource-picker-dialog.data.ts` (export `SAMPLE_RESOURCES`, `SAMPLE_SELECTED_IDS`, `LARGE_SAMPLE_RESOURCES`)
- Props already support `selectedResourceIds: string[]` (multi-select-friendly), a `resourceType` filter, `localizedStrings`, an `onSelect` callback, and a language-filter UI inside the dialog

It is also **wired into the app**: `src/renderer/components/dialogs/resource-picker.dialog.tsx`.

Plus, the integration branch is created from `main`, which **doesn't include this work**. Agents won't see it.

**Impact:** Re-inventing the picker is wasted effort, and worse, conflicts with the PRD's explicit guidance (see C5). At minimum, base `proto/saroj-studies` off `pt-3976-shared-resource-picker-ui` (or merge it in), and reframe the picker variants as "different *entry points* / different *containers* for the existing picker."

### C5. Direct conflict with the PRD on "variants"

The orchestration says: produce 3 meaningfully different variants per area.

The PRD (Rabbit Hole #3) says the opposite, in plain English:

> Selection UI for bible texts and commentaries — It's easy to make different UI for everything. UI should be largely consistent for selecting the project to have open in the workspace vs. UI for choosing/downloading resources. **Suggested approach: Follow the example of the project selection UI.**

The PRD also explicitly proposes the picker shape it wants:

> Prototype show: Search / 5 recently opened items / List of all items. If the list of all items is short, there is no need to show "recent" and "all" separately.

And the prototype-tested-with-users line:

> Usability — 🟢 The prototype tested well for comprehension in Q1.

So variants make sense for the **zero states and column shells** (where the question is open), but **not for the picker** (where there's already a tested direction and a partly-built implementation).

**Recommendation:** Drop the picker variants from Agents A and B. Have them consume the existing `ResourcePickerDialog` (or a thin stub of it) and focus their variants on the **column shells, zero states, and active/populated states**.

### C6. Made-up utility: `filterResourcesByUserLanguages`

- **Prompt says:** "Assume a utility exists: `filterResourcesByUserLanguages(resources, userLanguages)`. Do not implement this utility."
- **Reality:** No such utility (`grep` returns nothing). The PRD never mentions "user languages" as a filter input. The PRD's filtering inputs are:
  - **DBL licensing permissions** (gates what the user can download, not what's preferred)
  - **Resources already associated with the project** (the actual preference signal)
  - **Already downloaded on the user's computer** (per Rabbit Hole #4 — "for the same handbook on 3 projects, don't re-download")
- The existing picker uses an explicit per-dialog language filter (combobox), not an automatic user-language filter.

**Impact:** Agents will build to a fictional API. Drop `userLanguages`. Use `selectedResourceIds: string[]` for "associated with project" preference, and `installed: boolean` for the downloaded indicator.

### C7. Tailwind requires the `tw-` prefix

`lib/platform-bible-react/components.json` sets `"prefix": "tw"`. All Tailwind utilities in this lib are written `tw-flex`, `tw-bg-background`, etc. The orchestration's `WorkspaceShell` snippet uses **inline `style={...}` objects**, which works but is inconsistent with the codebase and won't pick up theme tokens (e.g. `tw-bg-background` respects dark mode; `background: '#f5f5f5'` doesn't).

**Impact:** Agents will likely mimic the inline style and ship inconsistent UI. Either (a) rewrite the shell with `tw-` classes, or (b) explicitly mark it as a throwaway prototype shell and tell agents to use `tw-` for the actual components.

### C8. Worktrees + node_modules + Storybook ports

- `git worktree add` creates new working trees that share `.git` but each needs its own `node_modules` (root and `lib/platform-bible-react/`). A clean install in this repo is not fast.
- All three agents running Storybook will collide on port `6007` (lib) or `6006` (root).
- The prompt doesn't address either.

**Impact:** Real time burn at startup. Either (a) symlink `node_modules` from the base checkout into each worktree (risky but fast), or (b) tell agents *not* to start Storybook locally — review will happen post-merge in a single Storybook instance.

### C9. "Use the Task tool" — wrong name

The prompt says "spawn the three agents below in parallel using the Task tool." In current Claude Code the tool is named `Agent` (its tool definition is loaded above). Subagents also do **not** automatically `cd` into a different working directory — the orchestrator must pass `cwd` (via shell prefix or `isolation: "worktree"`) or instruct the agent to operate via absolute paths.

Also: `isolation: "worktree"` on the Agent tool creates *one* worktree per agent, not 3 named worktrees off a shared integration branch. The hand-rolled `git worktree add` flow in the prompt is the right approach for this, but it has to be reconciled with how sub-agents actually receive a working directory (they don't, by default).

**Impact:** Either the agents will operate in the wrong directory, or the orchestrator will spend a turn discovering this and patching the plan mid-run.

---

## Important — will cost time or quality mid-run

### I1. The Magic Patterns prototype is not referenced

PRD links: <https://www.magicpatterns.com/c/hlhzc4kt5kucjcxdumaga8/preview?hideToolbar=true&disableComments=true>

It was tested with users in Q1 2026 and the PRD calls it the baseline for design discussions. Not telling agents about it means they'll re-derive comprehension that's already been validated.

### I2. Storybook story conventions in this repo

The library has **two** colocation conventions:

- Older: `lib/platform-bible-react/src/stories/advanced/<name>.stories.tsx` (story only; component elsewhere)
- Newer (used by the in-flight picker): `lib/platform-bible-react/src/components/advanced/<name>/<name>.stories.tsx` (component + story + data + utils + test co-located)

Story title convention: `'<Section>/<ComponentName>'` (e.g. `'Advanced/ResourcePickerDialog'`). Storybook sort order, from `.storybook/preview.ts`: `Home → Guidelines → Guides → Shadcn → Basics → Advanced → Demo`.

Newer components also import from `@storybook/react-vite`, not `@storybook/react`.

The prompt says "follow the conventions you find," which is vague enough that all three agents could pick differently and break Storybook's sort. Lock it down.

### I3. Localization convention

The lib uses `%key%` localization tokens passed in as a `LocalizedStrings` prop, with a `RESOURCE_PICKER_DIALOG_STRING_KEYS` list pattern. Prototypes can hardcode English, but agents should at least know the pattern so the components are migration-friendly.

### I4. Variant count vs. demo timeline

3 variants × ~5 areas = ~15 variants total, plus shells, plus three full-screen no-project states. With the June 19 demo target, this is a lot. The PRD's Q1 prototype already converged on much of this. Consider:

- Agent A: 2 variants for the zero state, **drop picker variants** (use the shared picker), 1 populated state.
- Agent B: 2 variants for zero state, **drop picker variants** (use shared picker), 2 variants for populated state.
- Agent C: 3 variants as planned (this is the most genuinely open area).

### I5. PRD nuances missing from the prompt

These are in the PRD but not in the agent briefs:

- **Tab headers should not look draggable / shouldn't mimic 10Power tabs.** Affects Agent B variant A ("Tab strip at top of column"). Risk of producing exactly the thing the PRD warns against.
- **Column 3 tab UI prefers icons + tooltips** (nice-to-have but called out, because of future expansion to many tabs).
- **Future Column 3 tabs** (not in scope, but the shell should leave room): Bible texts, Source language texts, Text collection, Commentaries, Comments, Find Biblical Terms, AI Assistant, Checks.
- **Projects-as-reference**: "In rare cases a team can select a *project* as a reference text, but it should require an extra, deliberate, step to reveal projects in the selection UI. The user will only see projects on which they are a named team member." Agent A's model-text picker brief should call this out as a "secondary, deliberate" affordance, not just a normal list entry.
- **Sync model**: Donna's selection *overrides* Saroj's for model text (single-value) but *adds to* Saroj's for resource texts and commentaries (multi-value, additive). The "admin can't be removed" rule in Agent B's brief captures the additive case but not the override case for model text.
- **Removing resources is flagged as the most important nice-to-have** (footnote 1 in the PRD). Agent B's spec covers it; just confirm it's prioritized.

### I6. "WorkspaceShell" is inline styles, no resize handles, no dark mode

It's a throwaway, which is fine — but it doesn't communicate any of the actual Column-3 affordances (resizable widths, multi-tab header, sync-scroll indicator). Stories built inside it will *look* like the workspace but won't *demonstrate* the workspace. If the goal is to evaluate columns in context, consider a more honest shell that uses `tw-` classes, shows the tab strip in Column 3, and stubs the BCV control in the main toolbar area above the columns.

### I7. Branching strategy: start from `pt-3976-shared-resource-picker-ui`, not `main`

Otherwise agents won't have the picker, the sample data, or the localized strings infrastructure that's already in flight. Make the integration branch:

```bash
git fetch origin
git checkout -b proto/saroj-studies origin/pt-3976-shared-resource-picker-ui
```

(If there's a reason to stay on `main` — e.g., PT-3976 is contentious — explicitly say so and provide the sample data file as a copy.)

### I8. Pre-commit hooks

Husky is configured (`.husky/pre-commit`) and there's an ESLint provenance-comment rule (`Paranext/require-provenance-comment`) for extensions. Story files in `lib/platform-bible-react/` shouldn't trigger it, but agents should know to fix hook failures rather than `--no-verify`. The session system prompt already enforces that; just reinforce in agent briefs if you're worried.

---

## Minor — polish

- **M1.** Demo date is **June 19, 2026**; today (per session context) is 2026-05-14. ~5 weeks. Worth saying out loud in the brief so agents calibrate fidelity (prototype, not production).
- **M2.** The prompt's `REPO=<PATH_TO_PARATEXT_CORE>` placeholder isn't filled in. If you're running this from inside Claude Code, the working directory is already the repo; the placeholder dance is unnecessary.
- **M3.** "Open Registry" CTA → `https://registry.paratext.org`. Worth noting whether this should be a real `<a href>` or stubbed `onOpenRegistry` prop (so the story is reviewable without leaving Storybook). The agent briefs say "handler stubs (onClick props)" — good; just be consistent across all three agents.
- **M4.** "Don't drop any story" on merge: stories aren't typically barrel-imported in this repo (Storybook auto-discovers via glob), so file-level merges should generally be conflict-free *unless* two agents pick the same filename. Pre-assign filenames in the briefs to eliminate the risk.
- **M5.** PRD uses "PT10 / 10Simple" interchangeably; "Paratext 10 Simple" is the long form. The prompt uses all three. Consistent labeling in story titles helps reviewers.
- **M6.** The PRD lists English variants of UBS Handbook and SIL TNN/TND as the *initial* commentaries. The shared picker's sample data has "UBS HB" as `XmlResource` already — re-use that, don't invent new sample rows that conflict.

---

## Open questions (please decide before running)

1. **Should the picker variants in Agents A and B be dropped** in favor of reusing `ResourcePickerDialog` from `pt-3976-shared-resource-picker-ui`? *(My strong recommendation: yes — drop them.)*
2. **Where should Agent C's full-screen "no project" state live** — root Storybook (`src/stories/platform/`, port 6006) or library Storybook (`lib/platform-bible-react/src/stories/`, port 6007)?
3. **Is `proto/saroj-studies` allowed to branch from `pt-3976-shared-resource-picker-ui`** instead of `main`? If not, what's the policy for getting the picker stub in front of the prototype work?
4. **Are reviewers OK with a single merged Storybook run** (no per-worktree Storybook), or do agents need to verify their own work locally? The latter forces a port-allocation scheme.
5. **Localization in prototypes** — hardcoded English, or follow the `%key%` + `LocalizedStrings` pattern from day one?
6. **Variant ambition** — keep "3 meaningfully different patterns" everywhere, or trim to 2 for the populated/zero states given the demo timeline?

---

## Suggested revised orchestration prompt

See `docs/plans/saroj-studies-orchestration-prompt-v2.md` for a paste-ready version that addresses all Critical items and most Important items above. Key changes:

- Anchors paths to `lib/platform-bible-react/` and the existing co-located convention.
- Branches off `pt-3976-shared-resource-picker-ui` so the existing picker, sample data, and localized-strings infra are in scope.
- Uses the real `DblResourceData` shape (no invented fields, no invented utilities).
- Drops the "build your own picker" variants in Agents A and B; agents consume the existing `ResourcePickerDialog` and focus on shells / zero states / populated states.
- Rewrites `WorkspaceShell` with `tw-` classes and a tab-strip-aware Column 3.
- Pre-assigns story filenames and titles to eliminate merge conflicts.
- Tells agents not to run Storybook locally (single post-merge review run instead) and how to verify their stories statically (`npm run build:storybook` from `lib/platform-bible-react`).
- Uses the `Agent` tool with explicit cwd handling.
- Acknowledges the Magic Patterns prototype, the demo timeline, and the PRD's "consistency over novelty" guidance for the picker.
