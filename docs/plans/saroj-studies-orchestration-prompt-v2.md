# Orchestration Prompt v2: `proto/saroj-studies`

## Paratext 10 Simple — Workspace Component Prototypes

> Revised to match the real `paranext-core` repo layout, the existing `ResourcePickerDialog` work on `pt-3976-shared-resource-picker-ui`, and the PRD's "consistency over novelty" guidance for the picker.

Copy everything below the line into Claude Code.

---

```
You are the ORCHESTRATOR for the proto/saroj-studies prototype effort. You will set up
worktrees and then spawn three subagents in parallel using the `Agent` tool. You do not
write component code yourself.

REPO IS ALREADY THE CWD: this session is running inside the paranext-core checkout.

# 1. Background

We are prototyping UI for "Paratext 10 Simple" (PT10 / 10Simple) — a focused 3-column
workspace for Bible translation teams:

  [ Model Text  |  Editor (out of scope)  |  Resources & Tools (Bible texts / Commentaries) ]

The PRD lives in this conversation. Key points the agents need:

- Personas: Saroj (translator, end user) and Donna (project admin, sets up resources for the team).
- Sync rules:
    - Model text — single value. Donna's choice OVERRIDES Saroj's on sync.
    - Resource texts and commentaries — multi-value. Donna's choices ADD to Saroj's on sync.
    - Saroj cannot remove an item that Donna added. Tooltip on disabled remove button:
      "This resource was added by your project administrator."
- BCV scroll-sync lives in the main app toolbar, NOT inside any column. No BCV in columns.
- Column 3 has two tabs: Bible texts | Commentaries. Tabs prefer icons + tooltips (space-constrained;
  future tabs include Source language texts, Text collection, Comments, Find Biblical Terms,
  AI Assistant, Checks). Tab headers must NOT look draggable / must NOT mimic PT10Power tabs.
- Columns are resizable; columns cannot be moved or closed (in this iteration).
- "Projects-as-reference-text" is a rare, deliberate, secondary affordance — only for users who
  are named team members. Not part of the main resource list.
- A Magic Patterns prototype was user-tested in Q1 2026 and is the design baseline:
  https://www.magicpatterns.com/c/hlhzc4kt5kucjcxdumaga8/preview?hideToolbar=true&disableComments=true
- Demo to UBS consultants: June 19, 2026. Fidelity target: clickable prototype, not production.

# 2. Repo facts

- This is a monorepo-ish layout. The shared UI library is at:  `lib/platform-bible-react/`
  NOT `packages/...`.
- Two Storybook instances:
  - Root app Storybook: `.storybook/main.ts`, picks up `src/**` and `extensions/src/**`,
    runs on port 6006 (`npm run storybook` from repo root).
  - Library Storybook: `lib/platform-bible-react/.storybook/main.ts`, picks up
    `lib/platform-bible-react/src/**`, runs on port 6007
    (`npm run storybook` from `lib/platform-bible-react/`).
- Tailwind uses prefix `tw-` (see `lib/platform-bible-react/components.json` → `"prefix": "tw"`).
  Use `tw-flex`, `tw-bg-background`, etc. — NOT bare `flex`, `bg-background`.
- Story sort order (from `lib/platform-bible-react/.storybook/preview.ts`):
    Home → Guidelines → Guides → Shadcn → Basics → Advanced → Demo.
  Use `'Advanced/<ComponentName>'` style titles for library prototypes; `'Platform/<...>'` for
  app-level stories under `src/stories/platform/`.
- Co-location convention (newer, used by the in-flight picker — match this):
    lib/platform-bible-react/src/components/advanced/<kebab-name>/
        <kebab-name>.component.tsx
        <kebab-name>.stories.tsx
        <kebab-name>.data.ts        (optional, for fake data)
        <kebab-name>.utils.ts       (optional)
- Story import: `import type { Meta, StoryObj } from '@storybook/react-vite';`
  (NOT `@storybook/react` — the lib Storybook uses the Vite builder.)
- Pre-commit hooks (Husky) run on commit. If a hook fails, FIX THE ISSUE, do not pass --no-verify.

# 3. Existing work the agents must build on

Branch `pt-3976-shared-resource-picker-ui` contains a fully-built shared picker:

- Component: `lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.component.tsx`
- Stories:   `…/resource-picker-dialog.stories.tsx` (Storybook path: Advanced/ResourcePickerDialog)
- Sample data: `…/resource-picker-dialog.data.ts` — exports `SAMPLE_RESOURCES`,
  `SAMPLE_SELECTED_IDS`, `LARGE_SAMPLE_RESOURCES`. USE THESE — do not invent new sample data.
- Props (real, not invented):
    interface ResourcePickerDialogProps {
      allResources: DblResourceData[];
      isResourcesLoading?: boolean;
      resourceType?: ResourceType;          // 'ScriptureResource' | 'EnhancedResource' | 'XmlResource' | 'SourceLanguageResource'
      selectedResourceIds?: string[];       // already-selected ids (multi-select-friendly)
      localizedStrings: ResourcePickerDialogLocalizedStrings;
      onSelect: (resource: DblResourceData) => void;
    }
- Resource model (real type, from `lib/platform-bible-utils/src/resources.model.ts`):
    export type DblResourceData = {
      dblEntryUid: string;          // unique id — use this, NOT `id`
      displayName: string;          // short name — use this, NOT `title`/`abbreviation`
      fullName: string;
      bestLanguageName: string;     // human-readable language — NOT `language`/`languageCode`
      type: 'ScriptureResource' | 'EnhancedResource' | 'XmlResource' | 'SourceLanguageResource';
      size: number;
      installed: boolean;           // local download state — NOT `isDownloaded`
      updateAvailable: boolean;
      projectId: string;
    };

There is NO `addedBy`, NO `isAssociatedWithProject`, NO user-language auto-filter.
Model "admin vs user" association as a parallel string[] (e.g. `adminAssociatedIds`), not a flag.
Model "associated with project" via `selectedResourceIds: string[]` — the same pattern the
picker already uses.

Commentaries are not a separate `type`. UBS Handbook is `type: 'XmlResource'` in the sample data.

# 4. One-time setup (run before spawning agents)

# IMPORTANT: branch off pt-3976-shared-resource-picker-ui so the picker is in scope.
git fetch origin pt-3976-shared-resource-picker-ui:pt-3976-shared-resource-picker-ui
git checkout -B proto/saroj-studies pt-3976-shared-resource-picker-ui

# Create three worktrees. Each worktree shares .git but has its own working tree.
# We will NOT run Storybook in each worktree (port collision, install time). A single
# Storybook run on the merged branch is the review surface.
git worktree add ../pt-worktree-a -b proto/saroj-studies--model-text proto/saroj-studies
git worktree add ../pt-worktree-b -b proto/saroj-studies--resources  proto/saroj-studies
git worktree add ../pt-worktree-c -b proto/saroj-studies--no-project proto/saroj-studies

# Symlink node_modules so agents don't reinstall (3 fresh installs is real time).
# Only the lib/platform-bible-react and repo-root node_modules are needed for Storybook
# build/typecheck.
for W in ../pt-worktree-a ../pt-worktree-b ../pt-worktree-c; do
  [ -d "$W/node_modules" ] || ln -s "$(pwd)/node_modules" "$W/node_modules"
  [ -d "$W/lib/platform-bible-react/node_modules" ] || \
    ln -s "$(pwd)/lib/platform-bible-react/node_modules" "$W/lib/platform-bible-react/node_modules"
done

When spawning agents, set the Agent tool's working directory to the worktree (pass cwd via
the prompt and instruct the agent to use absolute paths). Subagents in Claude Code do not
inherit cwd automatically — every Bash/Edit/Read call must use the absolute worktree path.

# 5. Shared context block — paste into every agent prompt verbatim

(see "SHARED CONTEXT" block below)

# 6. Pre-assigned filenames (avoid merge conflicts)

Agent A — Model Text (Column 1):
  lib/platform-bible-react/src/components/advanced/model-text-zero-state/
    model-text-zero-state.component.tsx
    model-text-zero-state.stories.tsx
    model-text-zero-state.data.ts
  Storybook title: 'Advanced/ModelTextZeroState'

Agent B — Resources tab (Column 3, Bible Texts only):
  lib/platform-bible-react/src/components/advanced/scripture-resources-tab/
    scripture-resources-tab.component.tsx
    scripture-resources-tab.stories.tsx
    scripture-resources-tab.data.ts
  Storybook title: 'Advanced/ScriptureResourcesTab'

Agent C — Full-screen no-project zero state (app-level, NOT a lib component):
  src/stories/platform/no-project-zero-state/
    no-project-zero-state.component.tsx
    no-project-zero-state.stories.tsx
  Storybook title: 'Platform/NoProjectZeroState'
  Note: this lives in the ROOT app Storybook (port 6006), not the lib Storybook.

# 7. After agents complete: merge

cd <repo-root>
git checkout proto/saroj-studies
git merge --no-ff proto/saroj-studies--model-text -m "proto: merge model text variants"
git merge --no-ff proto/saroj-studies--resources  -m "proto: merge scripture resources tab variants"
git merge --no-ff proto/saroj-studies--no-project -m "proto: merge no-project zero state variants"

# Cleanup
git worktree remove ../pt-worktree-a
git worktree remove ../pt-worktree-b
git worktree remove ../pt-worktree-c

# Storybook smoke test (both instances):
( cd lib/platform-bible-react && npm run storybook ) &   # port 6007
npm run storybook &                                       # port 6006

Conflicts: filenames are pre-assigned so file-level conflicts should not occur.
If anything overlaps (e.g. shared util added to platform-bible-react/src/index.ts),
keep all entries — do not drop any export.

##################################################################################
##################################################################################
SHARED CONTEXT BLOCK (paste verbatim into each agent prompt)
##################################################################################
##################################################################################

App: Paratext 10 Simple (PT10 / 10Simple)
Repo: paratext-core (you are inside it)
UI library: lib/platform-bible-react/   (NOT packages/*)
Design system: shadcn + Tailwind (prefix: "tw-") + Radix UI
Storybook (lib): port 6007, Vite builder. Import:
    import type { Meta, StoryObj } from '@storybook/react-vite';
Storybook (root app): port 6006, Webpack5 builder. Same Meta/StoryObj import works.
DO NOT start Storybook locally — the orchestrator will run it once after merge.
To sanity-check that your stories compile, you may run:
    ( cd lib/platform-bible-react && npx tsc --noEmit )    # if you touched lib
    ( cd <repo-root> && npx tsc --noEmit )                  # if you touched root src

Personas:
- Saroj: translator, end user. Day-to-day workspace.
- Donna: project admin / language team lead. Configures resources for the team.
  Donna's selections sync to Saroj. For model text, Donna's overrides Saroj's;
  for resource texts and commentaries, Donna's adds to Saroj's.
- Saroj cannot remove an item Donna added — disabled remove with tooltip:
  "This resource was added by your project administrator."

Resource model — USE THIS EXACT SHAPE:
    type ResourceType = 'ScriptureResource' | 'EnhancedResource' | 'XmlResource' | 'SourceLanguageResource';
    type DblResourceData = {
      dblEntryUid: string;
      displayName: string;
      fullName: string;
      bestLanguageName: string;
      type: ResourceType;
      size: number;
      installed: boolean;
      updateAvailable: boolean;
      projectId: string;
    };
Import the type from 'platform-bible-utils'. DO NOT invent new fields. In particular:
- there is NO `id` (use `dblEntryUid`)
- there is NO `title`/`abbreviation` (use `displayName` / `fullName`)
- there is NO `language`/`languageCode` (use `bestLanguageName`)
- there is NO `isDownloaded` (use `installed`)
- there is NO `addedBy` field — model admin-vs-user via a PARALLEL string[]:
    type StoryArgs = {
      adminAssociatedIds: string[];   // Donna added these
      userAssociatedIds: string[];    // Saroj added these (Saroj can remove)
      selectedResourceIds: string[];  // currently selected (intersect with admin to determine disabled state)
    };
- there is NO `isAssociatedWithProject` flag — use `selectedResourceIds: string[]`
- there is NO automatic user-language filter — the existing picker has an in-dialog language combobox
- Commentaries are NOT a separate `type` — UBS Handbook is `type: 'XmlResource'`

Sample data — REUSE the existing fixture:
    import {
      SAMPLE_RESOURCES,
      SAMPLE_SELECTED_IDS,
    } from '@/components/advanced/resource-picker-dialog/resource-picker-dialog.data';
You may extend it inline (e.g. tag a subset as adminAssociatedIds for your stories) but do
NOT define a parallel resource model.

Existing shared picker:
    import ResourcePickerDialog from '@/components/advanced/resource-picker-dialog/resource-picker-dialog.component';
The PRD asks for ONE consistent picker UX (Rabbit Hole #3: "Follow the example of the
project selection UI"). DO NOT build alternate picker UIs. Instead, design how your column
triggers the existing picker (button label, placement, opened state in story).

Localized strings:
The codebase uses %key% tokens + a LocalizedStrings map. For prototype stories you may
hardcode English directly in the component, but expose any user-facing string as a const
near the top of the component file so it's easy to extract later.

Tailwind:
Use the `tw-` prefix everywhere. e.g. `<div className="tw-flex tw-h-full tw-bg-background">`.

3-column context shell — use this (uses tw- classes, dark-mode aware, leaves room for
the Column 3 tab strip):

  export function WorkspaceShell({
    children,
    columnIndex,
    column3TabIcons = ['Bible', 'Commentaries'],
  }: {
    children: React.ReactNode;
    columnIndex: 0 | 1 | 2;
    column3TabIcons?: string[];
  }) {
    const cols = ['Model Text', 'Editor', 'Resources & Tools'];
    return (
      <div className="tw-flex tw-h-[600px] tw-w-full tw-flex-col tw-border tw-bg-background tw-font-sans">
        {/* stub toolbar so the BCV control's location is visible */}
        <div className="tw-flex tw-h-9 tw-items-center tw-border-b tw-px-3 tw-text-xs tw-text-muted-foreground">
          [main toolbar — BCV control lives here, not in columns]
        </div>
        <div className="tw-flex tw-flex-1 tw-min-h-0">
          {cols.map((label, i) => {
            const focused = i === columnIndex;
            return (
              <div
                key={i}
                className={[
                  'tw-flex tw-min-w-0 tw-flex-1 tw-flex-col',
                  i < 2 ? 'tw-border-r' : '',
                  focused ? 'tw-bg-background' : 'tw-bg-muted/30 tw-opacity-40',
                ].join(' ')}
              >
                <div className="tw-flex tw-h-8 tw-items-center tw-justify-between tw-border-b tw-px-3 tw-text-[11px] tw-text-muted-foreground">
                  <span>{label}</span>
                  {i === 2 && (
                    <span className="tw-flex tw-gap-1">
                      {column3TabIcons.map((t) => (
                        <span key={t} className="tw-rounded tw-border tw-px-1.5 tw-py-0.5">{t}</span>
                      ))}
                    </span>
                  )}
                </div>
                {focused ? <div className="tw-flex tw-min-h-0 tw-flex-1">{children}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

Place this shell at:
    lib/platform-bible-react/src/storybook/decorators/workspace-shell.tsx
…and import it from each story. The first agent to write it owns it; if you find it
already exists, just import it. (Merge conflicts on this file should be resolved by
keeping the version with the most recent commit on the integration branch.)

##################################################################################
##################################################################################
AGENT A — Model Text Tab (Column 1)
##################################################################################
##################################################################################

WORKING DIRECTORY (absolute path): /home/user/pt-worktree-a
YOUR BRANCH: proto/saroj-studies--model-text
All paths in your tool calls must start with /home/user/pt-worktree-a/.

[PASTE SHARED CONTEXT BLOCK HERE]

TASK
====

Build prototype Storybook stories for the Model Text column (Column 1).
This column shows ONE scripture reference text the translation is based on (single value).

You are NOT building a picker. The shared ResourcePickerDialog already exists. Your job
is the column itself in three states + how it invokes the existing picker.

Areas:
  1. Zero state — Saroj/Donna sees "this project has no model text yet"
  2. Populated state — model text selected, scripture-like content placeholder shown
  3. "Replace model text" affordance from the populated state (deliberate, since this
     is a single-value override scenario per the PRD sync rules)

Required variants — 3 meaningfully different zero-state patterns:
  A. Illustrated/editorial — centered, headline + 1-sentence explanation + primary button
     that opens <ResourcePickerDialog resourceType="ScriptureResource" />
  B. Inline prompt — column renders as if it could have content; subtle "no model text
     selected" message anchored where text would appear, with a small "Choose model text"
     action
  C. Persistent setup panel — picker rendered INLINE in the column (still using
     <ResourcePickerDialog> but with the dialog wrapper omitted via a story decorator);
     "Select your model text here" feels like a config panel

Hard constraints:
- Each variant uses <ResourcePickerDialog> with `resourceType="ScriptureResource"` and
  passes `selectedResourceIds` so the user's existing project-associated resources appear
  in the "Already selected" section.
- Explain "model text" in plain language (it's the scripture this translation is BASED ON,
  distinct from general reference resources).
- No BCV controls, no navigation in this column.
- For "Project as reference" (rare, deliberate): include a single subtle affordance in
  one variant (your choice) — "Use a project as model text…" link that opens a separate
  flow (story-stub only; no need to implement the project list).

Story coverage (each variant gets at least these stories):
- ZeroStateClosed
- ZeroStateWithPickerOpen
- Populated (placeholder paragraph; show how "Change model text" is invoked)

Files (work ONLY in your worktree):
    /home/user/pt-worktree-a/lib/platform-bible-react/src/components/advanced/model-text-zero-state/
        model-text-zero-state.component.tsx       (3 named exports, one per variant)
        model-text-zero-state.stories.tsx         (Storybook title: 'Advanced/ModelTextZeroState')
        model-text-zero-state.data.ts             (optional)

Commit message: "proto: model text column variants"

##################################################################################
##################################################################################
AGENT B — Scripture Resources Tab (Column 3, Bible Texts)
##################################################################################
##################################################################################

WORKING DIRECTORY (absolute path): /home/user/pt-worktree-b
YOUR BRANCH: proto/saroj-studies--resources
All paths in your tool calls must start with /home/user/pt-worktree-b/.

[PASTE SHARED CONTEXT BLOCK HERE]

TASK
====

Build prototype Storybook stories for the Bible Texts tab of Column 3.
Commentaries tab is out of scope (similar shape; not duplicating effort here).

You are NOT building a picker. Use <ResourcePickerDialog> from the existing branch for
adding resources. Your job is the tab's zero state, populated state, and how it triggers
the picker.

Areas:
  1. Zero state — no resource texts associated with this project yet
  2. Populated state — 2–4 resource texts associated; user switches between them
  3. Removal interaction — admin-added resources have disabled remove with tooltip;
     user-added are removable

Required variants — 3 meaningfully different zero-state patterns:
  A. Standard empty state — icon, headline, supporting text, "Add resource texts" button
     that opens <ResourcePickerDialog resourceType="ScriptureResource" />
  B. Suggestions-first — surface 3 recommended resources from the existing
     SAMPLE_RESOURCES (pick a stable subset) with one-click "Add" buttons; "See all"
     opens the full picker
  C. Split panel — top half explains, bottom half shows a compact embedded scripture-only
     list (read-only preview style; clicking opens the full picker)

Required variants — 3 meaningfully different populated-state patterns:
  A. Icon tabs at top — matches the PRD's "icons + tooltips" preference for Column 3 tabs;
     each downloaded resource gets a small icon; overflow into a "More" dropdown.
     IMPORTANT: tabs MUST NOT look draggable / must not mimic PT10Power tab chrome.
  B. Sidebar list within column — vertical list of resources on the left of Column 3;
     active resource fills the rest. Compact.
  C. Dropdown selector — single compact selector at the top of the column; maximum
     reading space below.

For ALL populated variants:
- Show one resource active at a time.
- Remove button on each:
    - if dblEntryUid is in adminAssociatedIds (story arg) → disabled + tooltip
    - else → enabled + working onRemove handler stub
- "Add more" entry point that opens <ResourcePickerDialog>.

Constraints:
- No BCV controls.
- Use the WorkspaceShell with columnIndex={2}.
- Leave a stub for the Column 3 tab strip (Bible / Commentaries) — the WorkspaceShell
  already shows these as labels.

Story coverage (use story args for `adminAssociatedIds` and `userAssociatedIds`):
- For each zero-state variant: Default, WithPickerOpen
- For each populated-state variant: Default (3 resources, mix of admin/user),
  AdminRemoveAttempted (tooltip showing)

Files (work ONLY in your worktree):
    /home/user/pt-worktree-b/lib/platform-bible-react/src/components/advanced/scripture-resources-tab/
        scripture-resources-tab.component.tsx
        scripture-resources-tab.stories.tsx        (title: 'Advanced/ScriptureResourcesTab')
        scripture-resources-tab.data.ts            (extends SAMPLE_RESOURCES with admin/user tagging)

Commit message: "proto: scripture resources tab variants"

##################################################################################
##################################################################################
AGENT C — Full-screen No-Project Zero State
##################################################################################
##################################################################################

WORKING DIRECTORY (absolute path): /home/user/pt-worktree-c
YOUR BRANCH: proto/saroj-studies--no-project
All paths in your tool calls must start with /home/user/pt-worktree-c/.

[PASTE SHARED CONTEXT BLOCK HERE]

TASK
====

Build prototype Storybook stories for the full-screen "no project open" state — what
a user sees when PT10 Simple opens and they have no project loaded.

This is APP-LEVEL, not a library component. It lives in the ROOT Storybook (port 6006),
NOT the library Storybook (port 6007). Place files under `src/stories/platform/` so the
root Storybook glob picks them up.

WorkspaceShell DOES NOT apply here — this is full-screen. Use a 100% width / 100vh-min
container in your stories. shadcn/Tailwind (`tw-` prefix) is still expected.

Context:
Projects in Paratext are managed via the Paratext Registry — a separate web app at
https://registry.paratext.org. Local creation MAY also be supported (uncertain — build
both variants and we'll decide).

Required variants — 3 mental models:

  A. Registry-required flow
     - Primary CTA: "Open Paratext Registry" → `onOpenRegistry` prop, which in the story
       handler logs/redirects to https://registry.paratext.org
     - Secondary: "Open existing local project" (only shown when hasLocalProjects)
     - Communicates this is normal for new users — not an error

  B. Local creation available
     - Primary CTA: "Create new project" (onCreateProject prop, stubbed)
     - Secondary: "Open Paratext Registry" (for joining a team project)
     - Tertiary: "Open existing local project"

  C. Your choice — different mental model. Suggested directions:
     - Project gallery with empty "no projects yet" panel + actions where cards would be
     - Wizard-style step-by-step onboarding
     - Ambient/minimal — one sentence, one button

Constraints for all variants:
- Use TS, shadcn (Button, Card) where appropriate, `tw-` Tailwind utilities.
- Handler stubs as onClick props — no real navigation in story args.
- Must look intentional, not like an error screen.
- App name "Paratext 10 Simple" may appear as light branding.

Story args:
- `hasLocalProjects: boolean` (default false). When true, show a "Recent projects" affordance.

Files (work ONLY in your worktree):
    /home/user/pt-worktree-c/src/stories/platform/no-project-zero-state/
        no-project-zero-state.component.tsx      (3 named exports)
        no-project-zero-state.stories.tsx        (title: 'Platform/NoProjectZeroState')

Commit message: "proto: no-project zero state variants"
```

---

## Notes on what changed vs v1

- Worktree base: `pt-3976-shared-resource-picker-ui`, not `main`.
- Picker variants: dropped. All three agents consume the existing `ResourcePickerDialog`.
- Data shape: real `DblResourceData`; reuse `SAMPLE_RESOURCES` from the existing branch.
- Tailwind: `tw-` prefix throughout; rewritten `WorkspaceShell` using `tw-` and a tab-strip-aware Column 3.
- File locations: pre-assigned, kebab-case, co-located component+stories+data folder under `lib/platform-bible-react/src/components/advanced/` (Agents A/B) and `src/stories/platform/` (Agent C).
- Storybook story titles: pre-assigned to land in the right section of the side panel.
- Story file imports: `@storybook/react-vite`.
- Sub-agent cwd: explicit absolute paths in every tool call; node_modules symlinked from the base checkout.
- No per-worktree Storybook (port collision avoidance).
- PRD nuances added: PT10Power-tab anti-pattern warning, icons-with-tooltips for Column 3, projects-as-reference as a deliberate secondary affordance, sync rules (override vs additive), Magic Patterns prototype link, June 19 demo timeline.
