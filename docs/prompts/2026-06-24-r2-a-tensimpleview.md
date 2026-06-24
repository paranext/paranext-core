# Vehicle A — Storybook (`TenSimpleView`) build prompt

**Round 2 next-step prototype.** You are an implementer agent. Build the Q3 "Saroj advances a chapter through the steps and stages of a project plan" prototype as **Vehicle A**: mount the two next-step surfaces into the **real `rc-dock` Simple layout** (`TenSimpleView`) in the **root Storybook** (port 6006), using the real `BookChapterControl`/editor and real `platform-bible-react` (PBR) components. No Electron, no PAPI, no C#.

Repo: `/Users/merc/Developer/paranext/core-q3-prototype` · Branch: `proto/steps-2026Q3`.

## Read first (the design is already decided — do NOT redesign)

These are the source of truth. Reference them; do not restate their content.

- **`CONTEXT.md`** — the vocabulary. Use these exact words in all UI copy: Stage, Task (Drafting/Review/Revision), Check (automated), Review (human), Comment, Issue, Revision, Pass/stale, Current Task ("your next step"), Solo/Together, Anyone/Unassigned, Teammate. "Chapter" stands in for book/Priority.
- **`docs/plans/2026-06-22-q3-saroj-next-task-prototype-brief.md`** — why/scope, the **6 non-negotiables**, the data-model recommendation (reuse `project-plan-draft` plan types + factory plans; synthesize a PT10 progress layer).
- **`docs/plans/2026-06-22-q3-next-step-prototype-design.md`** — the resolved design. Implement to these sections specifically:
  - **§1** two concepts (PRIMARY = Current Task indicator + chooser; SECONDARY = chapter panel) + variant switcher out of workspace chrome.
  - **§2** progress model (derived current stage; per-chapter; `markComplete` granularity; Priority ordering).
  - **§3** checks/issues (`passing` / `has-issues` count / `stale`; required check blocks within stage; ratchets forward).
  - **§4** Current Task recommendation precedence (unblock-teammate → first available in chapter).
  - **§5** Solo/Together.
  - **§6** the chooser ("My Tasks" lean list, prev/next Priority nav, Solo/Together sections, "Available after …" wording).
  - **§7** no-plan fallback (inform-only; two CTAs).
  - **§9** the seeded fixture — reproduce it exactly (restated below for convenience).
  - **§10** where surfaces slot in Simple chrome.
- **`docs/adr/0001-prototype-vehicle-storybook-in-repo.md`** — vehicles + shared build approach (reuse real substrate; build low-wiring reusable components; this is Vehicle A — **use `TenSimpleView`, not `WorkspaceShell`**).
- **`docs/adr/0002-required-checks-block-within-stage.md`** — required checks block within their stage (deliberate PT10 divergence; ratchet forward).

**Scope discipline:** invent only the progress / Priority / assignment / Solo-Together layers. Reuse real components + real plan data. Do not build plan-authoring UI (out of scope). When simpler vs. more powerful tie, choose simpler.

---

## Where the surfaces slot in (design §10) — the platform-specific mounting

The Simple layout lives in `src/stories/platform/ten-layout-shared.tsx`, assembled by `TenSimpleView()` (currently `ten-layout-shared.tsx:1822`) and rendered by the story `src/stories/platform/ten-simple-layout.stories.tsx`. Study these before editing.

- **PRIMARY — Current Task indicator** → the **chrome toolbar slot**: `SimpleChromeBar()` (`ten-layout-shared.tsx:1264`). Add the indicator into its center/flex region (where `John 1 ▾` etc. sit today, lines 1271–1285).
- **SECONDARY — chapter panel** → the **Model Text column**: in `SIMPLE_LAYOUT` (`ten-layout-shared.tsx:1550`), the Model Text column is the first headless child — the `gnb-scripture` panel (`size: 420`, lines 1554–1565, content `<GnbScripturePanel />`). Mount the chapter panel as a tab here (the ADR's "~6-line rc-dock tab").
- **CHOOSER** → a **dialog** opened from the toolbar indicator (primary). Use PBR `Dialog` (exported from `platform-bible-react`).

### rc-dock structural rules you MUST follow

1. **A panel is a `TabData` in a `LayoutData` column.** Adding a surface = adding a `{ id, title, content: <X/>, group }` entry to a column's `tabs` array. See `rightPanelTabs` (`ten-layout-shared.tsx:1437`) and `SIMPLE_LAYOUT` (`:1550`) for the exact shape. The `as TabData[]` cast and `group: TAB_GROUP` / `HEADLESS_GROUP` pattern is established — match it.
2. **`LayoutData` is a static module-load object — panels CANNOT receive per-chapter state as props.** `SIMPLE_LAYOUT` is built once at import time. Per-chapter state (the `scrRef` the surfaces follow) must flow through **React context, not props**. The file already has the mechanism: `InteractiveContext` + `InteractiveStateProvider` (`ten-layout-shared.tsx:181–191`), consumed via `useContext(InteractiveContext)` / `useInteractiveOrThrow()` (`:1097`). **Gotcha:** today `TenSimpleView` is NOT wrapped in `InteractiveStateProvider` (only the power-interactive view is) and the simple panels (`GnbScripturePanel`, `MarkersOnlyPanel`) are static. You must wrap `TenSimpleView` in the provider and read `scrRef` from context inside your surfaces so they **follow the editor** (design §4: "the indicator follows the editor by default").
3. **Switching variants needs a dock rebuild.** Because `defaultLayout` is only read once, build the layout via a `buildSimpleLayout(variant)` function and pass `key={variant}` to `<DockLayout>` so rc-dock remounts when the switcher flips. (The PRIMARY variant omits the secondary panel tab; SECONDARY includes it.)

### Reference implementation — a prior round-1 build did exactly this

Round 1 already wired these surfaces into `TenSimpleView` on branch `proto/steps/r1/a-tensimpleview`. **Study it as the proven mounting recipe** (then improve fidelity for round 2):

```
git show proto/steps/r1/a-tensimpleview:src/stories/platform/ten-layout-shared.tsx
git show proto/steps/r1/a-tensimpleview:src/stories/platform/ten-simple-layout.stories.tsx
git diff proto/steps-2026Q3...proto/steps/r1/a-tensimpleview -- src/stories/platform/ten-layout-shared.tsx
```

Round-1 it established: `SimpleVariant = 'primary' | 'secondary'`; `InteractiveStateProvider` extended to accept `initialScrRef`; `buildSimpleLayout(variant)` injecting the secondary tab into the Model Text column; `<DockLayout key={variant} …>`; the indicator mounted in `SimpleChromeBar`; surfaces reading `scrRef` from `InteractiveContext`. Reuse this skeleton.

**Carry these round-1 component files forward as a starting point** (under `src/stories/platform/components/chapter-panel/`): `chapter-panel.component.tsx`, `current-step-indicator.component.tsx`, `chapter-progress.ts`, `current-step.ts`, `philippians-fixture.ts`. Improve fidelity, add the **chooser dialog** and the **no-plan fallback** (round-1 may not have them), and fix the data-sourcing gotcha below.

---

## The data: reuse real plan data — do NOT re-author it (the round-1 correction)

Design §9, §10 and ADR-0001 say: **reuse the real `project-plan-draft` types + factory plans; do not re-author plans.** Round 1 instead *copied and trimmed* the types into `plan-types.ts` and *re-authored* a trimmed SIL Compact plan into `sil-compact-plan.ts`. **Do not repeat that.** Import the real data instead.

**Gotcha — the plan data is on a different branch and is NOT present on `proto/steps-2026Q3`.** You must bring the files onto this branch first:

```bash
git checkout origin/project-plan-draft -- \
  lib/platform-bible-react/src/components/advanced/project-plan-dialog/ \
  lib/platform-bible-react/src/stories/advanced/project-plan-dialog/factory-plans.ts \
  lib/platform-bible-react/src/stories/advanced/project-plan-dialog/sample-data.ts
```

Then import the real model and data:

- **Types:** `lib/platform-bible-react/src/components/advanced/project-plan-dialog/types.ts` — `ProjectPlan`, `PlanStage`, `PlanTask` (`markComplete`, `taskStart`, `requiresEditing`), `CheckSetting { checkId, requiredInStage, notifyOnlyInStage }`, `CheckCatalogItem`, `CheckGroup`.
- **Factory plans:** `…/stories/advanced/project-plan-dialog/factory-plans.ts` exports `FACTORY_PLANS: OrgProvidedPlan[]`. The SIL Compact Base Plan is `FACTORY_PLANS.find((p) => p.name === 'SIL Compact Base Plan')`.
- **Ready-made fixtures:** `…/stories/advanced/project-plan-dialog/sample-data.ts` already exports **`SAMPLE_PROJECT_PLAN`** (= the SIL Compact plan, cloned) and **`EMPTY_PROJECT_PLAN`** (NN2 no-plan fallback). Import these directly — don't reconstruct them.
- **Check catalog:** `CHECK_GROUPS: CheckGroup[]` is defined in `…/components/advanced/project-plan-dialog/checks-tab.component.tsx` (it includes `spelling.word-list` "Word list", `basic.quotations` "Quotations", `other.biblical-terms` "Biblical terms" — the exact check IDs the §9 fixture uses). Use it to map `checkId` → display name.

**Webpack/import paths already resolve:** the root Storybook webpack (`.storybook/main.ts:127–143`) aliases `@` → `lib/platform-bible-react/src` and `platform-bible-react$` → that package's `src/index.ts`. So from `src/stories/…` you can `import { … } from 'platform-bible-react'` for components, and import the plan data by relative path or `@/` alias the same way `sample-data.ts` does (`@/components/advanced/project-plan-dialog`). If the project-plan-dialog components aren't re-exported from PBR's `index.ts`, import the data by direct path — do not edit the auto-generated barrel unnecessarily.

The **6 stages** of the SIL Compact Base Plan (confirmed from real data) are: Drafting → Team Check & Comprehension Check → Preparing for Consultant → Consultant Check → Community Review → Final Preparation for Publication. Real stage ids exist in the data; reference them by lookup, not by hand-copying.

### The synthesized layers (invent these — they don't exist on `project-plan-draft`)

Author one small PT10 progress + assignment module (e.g. `chapter-progress.ts`). Shape it to PT9's model per the brief:

- **Progress:** per unit (chapter | book | Priority) → `currentStageId` is **derived** (earliest stage with an unfinished task or unpassed required check — design §2; do not store it), plus `completedTaskIds` and per-check state.
- **Check state (content-addressed, design §3):** `passing` (0 issues) / `has-issues` (a count) / `stale` (reopened after edit). Author the states; no real issue engine.
- **Assignment + Solo/Together (design §5):** specific person · Multiple · Anyone · Team. Current Task drawn only from Solo; Together never recommended.
- **Priority (design §2):** invented ordering/filter layer (the "Birth Narrative" cross-book Priority). Does not exist in `project-plan-draft`.
- **Current Task recommendation (design §4):** unblock-a-teammate first, else first available unfinished Solo task in the chapter in view; "available" = `taskStart` satisfied.

Mind `markComplete` granularity (design §2, brief NN-table): only `by-chapter` tasks are per-chapter; `by-book`/`by-project` tasks gate at a coarser grain — decide how they read in the chapter-centric view.

---

## The seeded fixture (design §9 — reproduce exactly)

- **Plan:** SIL Compact Base Plan (the real `SAMPLE_PROJECT_PLAN`).
- **Two scopes:** **Philippians** (4 ch, book-by-book) + **Priority "Birth Narrative"** (Matt 1–2 / Luke 1–2, cross-book).
- **Roles from stages:** Saroj drafts; consultant **Maria** owns Consultant Check (enables the teammate-block).
- **Per-chapter spread (Philippians):**
  - **Php 1** — advanced to **Community Review**; carries a **stale, reopened check**.
  - **Php 2** — the **dense focal chapter** (open the fixture here by default): comprehension review available; a co-translator review with comments; `spelling.word-list` = **12 issues**; `basic.quotations` = **no issues** (passing); `other.biblical-terms` = **5 issues**; plus a later task showing **"Available after Consultant Check."**
  - **Php 3** — Drafting (plain next step).
  - **Php 4** — Drafting that **blocks Maria** (drives the §4 unblock-teammate recommendation).
- **Second project on `EMPTY_PROJECT_PLAN`** for the no-plan fallback (NN2).

Default the editor's `scrRef` to **PHP 2** so the dense chapter is what loads (round-1 used `initialScrRef={{ book: 'PHP', chapterNum: 2, verseNum: 1 }}`).

---

## What to build — concrete file plan

Create reusable, low-wiring surface components so Vehicle A and Vehicle B can mount the same thing (ADR-0001). Place them under `src/stories/platform/components/chapter-panel/` (Vehicle A's home; B will import/port them). Use Tailwind v4 `tw:` prefix + shadcn semantic color tokens; keep them prop-driven (plan + progress in, callbacks out) so they're vehicle-agnostic.

| File | Purpose |
| --- | --- |
| `…/chapter-panel/plan-data.ts` | Thin re-export/lookup wrapper over the **real** imported `SAMPLE_PROJECT_PLAN` / `EMPTY_PROJECT_PLAN` / `CHECK_GROUPS` (do NOT re-author the plan). |
| `…/chapter-panel/chapter-progress.ts` | The synthesized progress/assignment/Priority/Solo-Together model + the §9 fixture data + derive-current-stage + recommend-current-task logic. |
| `…/chapter-panel/chapter-panel.component.tsx` | **SECONDARY surface** — chapter-anchored panel: prominent next Task over an expandable *remaining-in-this-stage* list (design §1). Covers NN1/3/4/5/6 in-chapter. |
| `…/chapter-panel/current-step-indicator.component.tsx` | **PRIMARY surface** — persistent Current Task indicator for the toolbar (design §1, §4). Shows "your next step" or quiet "No plan set" fallback; opens the chooser. |
| `…/chapter-panel/chooser.component.tsx` | **The chooser** dialog (design §6): "My Tasks" lean list grouped by scope, prev/next Priority nav, Solo/Together sections, "Available after …" status wording, unobtrusive "All Tasks" toggle. PBR `Dialog`. |
| `…/chapter-panel/no-plan-fallback.component.tsx` | **NN2** inform-only zero state (design §7): two CTAs — "learn the value of a project plan" + "contact your project admin". Never lets Saroj author a plan. |

Then **edit** `src/stories/platform/ten-layout-shared.tsx`:

1. Extend `InteractiveStateProvider` to accept `initialScrRef`; **wrap `TenSimpleView`** in it (default `scrRef` = PHP 2).
2. Add `export type SimpleVariant = 'primary' | 'secondary'` and `buildSimpleLayout(variant)` that injects the SECONDARY chapter-panel tab into the **Model Text column** (`gnb-scripture` panel) for `'secondary'` only.
3. Mount the PRIMARY indicator into `SimpleChromeBar` for `'primary'`.
4. Render `<DockLayout key={variant} defaultLayout={buildSimpleLayout(variant)} …>`.
5. Surfaces read `scrRef` via `useContext(InteractiveContext)` so they **follow the editor**.

And **edit** `src/stories/platform/ten-simple-layout.stories.tsx`:

- Expose **variants as separate stories** (`Default` = secondary, `Primary` = primary) AND a Storybook **`argTypes` control** named e.g. "Next-step UI" (inline-radio `secondary`/`primary`). The variant switcher is a **Storybook-level control — NOT in Saroj's workspace chrome** (design §1). Document this in the meta description.

Localization strings (where you add UI copy) go in `assets/localization/*.json` per design §10 if you wire i18n; otherwise keep copy inline but use the exact `CONTEXT.md` vocabulary.

---

## Cover all 6 non-negotiables (brief) — checklist

1. **Current stage** — derived stage shown in both surfaces (NN1).
2. **No-plan fallback** — `no-plan-fallback.component.tsx` on the `EMPTY_PROJECT_PLAN` project; indicator shows quiet "No plan set" (NN2, §7).
3. **Tasks remaining** — chapter panel lists all current-stage tasks; chooser lists Saroj's tasks (NN3, §1/§6).
4. **Mark a task done** — provide a "mark done" affordance (checkbox or other — **intentionally open**, explore it; design §11/NN4). Flips progress + may advance the chapter.
5. **Task that must earn a pass** — for a Check/Review, show what's required to pass or the flagged issue count (`spelling.word-list` 12, `other.biblical-terms` 5, `basic.quotations` passing; the stale check on Php 1) (NN5, §3).
6. **All complete → next stage** — a "reached next stage" state; demonstrate on **Php 1** advancing (NN6, §1).

Both prototype concepts must be present and switchable (variants as separate stories + out-of-chrome switcher).

---

## Build & run

```bash
# from repo root
npm install            # if deps changed after the project-plan-draft checkout (use CI=true if pnpm prompts)
npm run storybook      # storybook dev -p 6006  → open the "platform/10Simple layout" stories
```

Verify in Storybook: both variants render; the secondary panel sits in the Model Text column; the primary indicator sits in the toolbar and opens the chooser; switching the "Next-step UI" control rebuilds the dock; PHP 2 loads dense; the no-plan project shows the fallback. Run `npm run typecheck && npm run lint` before finishing (Vehicle A is story/PBR-source only — no C#).

## Guardrails

- `TenSimpleView`, not `WorkspaceShell`.
- Reuse real `project-plan-draft` plan data verbatim — don't re-author it (the round-1 mistake).
- Per-chapter state via **context, not props** (`LayoutData` is static).
- Keep surfaces prop-driven and reusable (Vehicle B mounts the same components).
- Use exact `CONTEXT.md` vocabulary in every label.
- Don't wire PAPI/C#; all data is faked locally.
- Any edit under `lib/platform-bible-react/src/components/shadcn-ui/` needs a `// CUSTOM:` annotation (project rule) — avoid editing those; prefer composing.
