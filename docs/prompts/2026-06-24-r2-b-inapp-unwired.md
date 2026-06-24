# Build prompt — Round 2, Vehicle B: in-app unwired surface

**You are the implementer.** Build the Q3 "next-step workflow" prototype into the **running Platform.Bible app** as an **unwired surface**: faked/local data only — **no PAPI, no C#, no extension host**. This is **Vehicle B** of three parallel prototype vehicles (see [ADR-0001](../adr/0001-prototype-vehicle-storybook-in-repo.md)).

> **Why this vehicle is special.** Vehicle B is the **highest-fidelity** vehicle and the **eventual epic target** — it tests the design against the app as it really is. Vehicle A (Storybook `TenSimpleView`) and Vehicle B **mount the same reusable components** built into `platform-bible-react` (PBR); only the host differs. Build the shared components in PBR first, then wire them into the renderer here.

---

## 0. Read these first (do not redesign — the design is decided)

The design, vocabulary, and fixture are **already resolved**. Your job is integration, not design. Read and obey, in order:

1. [`CONTEXT.md`](../../CONTEXT.md) — the vocabulary. **Use it exactly.** Stage; Task (kinds: Drafting / Review / Revision); Check (automated); Review (human-judgment); Comment; Issue; Revision; Current Task; Solo / Together; Anyone / Unassigned; Priority; "chapter" stands in for book/Priority. **"Step" is colloquial only — never a data type or a list row.** User-facing copy may say "your next step"; code, types, and component names must say Task / Check / Review.
2. [Prototype brief](../plans/2026-06-22-q3-saroj-next-task-prototype-brief.md) — why/scope, the **6 non-negotiables** (§ "Non-negotiables"), and the data-model recommendation (reuse `project-plan-draft` plan types; synthesize a PT10 progress layer).
3. [Resolved design](../plans/2026-06-22-q3-next-step-prototype-design.md) — **§1** two concepts (PRIMARY = Current Task indicator + chooser; SECONDARY = chapter panel), **§2–§7** the resolved behavior, **§8** NN coverage, **§9** the seeded fixture, **§10** where surfaces slot in Simple chrome.
4. [ADR-0001](../adr/0001-prototype-vehicle-storybook-in-repo.md) (three vehicles; this vehicle needs PBR rebuilds; eventual epic target) and [ADR-0002](../adr/0002-required-checks-block-within-stage.md) (required checks block within their stage — a deliberate, provisional PT10 divergence).

**DRY rule:** those four documents are canonical for design / vocabulary / fixture. Do **not** restate them here. This prompt only specifies what is **platform-specific** to the in-app integration.

---

## 1. What you are building (the two concepts + 6 NNs)

Build **both** concepts from design §1, mounting the shared PBR components into the real renderer chrome of the **Simple layout**:

| Concept | Surface | Where it slots (design §10) |
| --- | --- | --- |
| **PRIMARY** — "one thing to focus on" | **Current Task indicator** (persistent) + a **chooser** (deeper "pick a task" surface) | indicator → **global toolbar**; chooser → a **dialog** opened from the indicator |
| **SECONDARY** — "the chapter's full picture" | **Chapter panel** (prominent next Task over an expandable remaining-in-stage list) | a native **tab in the Model Text column** |

A **variant switcher** (primary ↔ secondary) must live **out of the way** (design §1) — an avatar/profile-menu item or a dev-only control — **never** in Saroj's workspace chrome.

Cover all **6 non-negotiables** (brief; mapping in design §8): (1) current stage, (2) no-plan fallback, (3) tasks remaining, (4) mark a task done, (5) a task that must earn a Check/Review pass, (6) all-complete → next stage. Encode the **§9 fixture** (see §5 below).

---

## 2. Prior art — reuse the Round-1 Vehicle B build

A round-1 Vehicle B build exists on branch **`proto/steps/r1/b-realapp`**. It built the **secondary chapter panel** end-to-end and is your template for the integration mechanics. **Read it before writing code** (`git show proto/steps/r1/b-realapp:<path>`):

- `lib/platform-bible-react/src/components/advanced/chapter-panel/` — the reusable PBR component, its `types.ts`, `derive-chapter-view.util.ts` (+ test), and the seed data (`sil-compact-plan.data.ts`, `philippians-progress.data.ts`).
- `lib/platform-bible-react/src/index.ts` — how the new component/types/data were **exported** from PBR.
- `lib/platform-bible-react/src/stories/advanced/chapter-panel.stories.tsx` — the shared Storybook story (this is what Vehicle A mounts).
- `src/renderer/components/docking/chapter-panel-tab.component.tsx` — **the renderer integration**: a native (non-WebView) tab that follows the live chapter and renders the fixture.
- `src/renderer/components/docking/simple-layout.data.ts` and `…/platform-dock-layout-storage.util.ts` — **the two registration edits**.

**What round-1 did NOT build** (and you must add this round): the **PRIMARY** concept — the toolbar **Current Task indicator**, the **chooser dialog**, and the **variant switcher**; the **no-plan fallback (NN2)**; the second `EMPTY_PROJECT_PLAN` project.

**Vocabulary caveat:** round-1 predates the current `CONTEXT.md` vocabulary — it uses "step" pervasively (`DerivedStep`, `onAssert`, "Manual Check"). When you reuse or extend it, **rename to current vocab**: `Task` / `Check` / `Review`, and "your next step" only as user-facing copy. Treat round-1 as a mechanics reference, not a vocabulary reference.

---

## 3. Integration mechanics (concrete file edits, with file:line)

### 3a. Secondary chapter panel → native tab in the Model Text column

The Simple layout is a static rc-dock `LayoutBase`; the chapter panel is a **native renderer React tab**, not a WebView — so it needs **no extension host / PAPI**. Three edits (exactly as round-1 did):

1. **Create** `src/renderer/components/docking/chapter-panel-tab.component.tsx`. It must:
   - export a tab-type constant `TAB_TYPE_CHAPTER_PANEL` and a `loadChapterPanelTab(savedTabInfo): TabInfo` loader (returns `{ ...savedTabInfo, tabTitle, tabTooltip, content: <ChapterPanelTab /> }`).
   - read the live current Scripture reference via `useScrollGroupScrRef` from `@renderer/hooks/papi-hooks`. **Hook signature (verify before calling):** `useScrollGroupScrRef(scrollGroupScrRef: ScrollGroupScrRef | undefined, setScrollGroupScrRef: (scrollGroupScrRef) => boolean)` — defined at `src/renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook.ts:49`. The panel only **reads** the chapter (it never sets the scroll group), so pass scroll group `0` and a no-op setter: `useScrollGroupScrRef(0, () => false)`. **Both args are required — omitting the second is a renderer type error (see §7).**
   - `scrRef` is a `SerializedVerseRef` with a 3-letter `book` id (e.g. `"PHP"`) and `chapterNum`. Convert with `Canon.bookIdToNumber(scrRef.book)` from `@sillsdev/scripture` to key the fixture (fixture is keyed by canonical book number).
   - render the reusable `ChapterPanel` (imported from `platform-bible-react`) with the derived view for the chapter in view; when the chapter is outside the seeded range, show a quiet "seeded only for Philippians 1–4 / Birth Narrative" message (this is the **data ceiling**, distinct from the NN2 no-plan fallback).
   - end with a `// #region Vehicle B ceiling` comment documenting what would need PAPI/C#/extension wiring to ship for real (plan+progress over PAPI; per-project scoping; asserting a task / resolving issues persisting to `ProjectProgress.xml`; registering as a contribution instead of a core-renderer edit). Round-1's ceiling comment is a good template — keep it.

2. **Register the loader** in `src/renderer/components/docking/platform-dock-layout-storage.util.ts`: import `{ TAB_TYPE_CHAPTER_PANEL, loadChapterPanelTab }`, and add `[TAB_TYPE_CHAPTER_PANEL, loadChapterPanelTab]` to **both** `tabLoaderMap` initializers (the noisy-dev-mode map ~line 66 **and** the normal map ~line 78 — there are two; round-1 added to both).

3. **Place the tab** in `src/renderer/components/docking/simple-layout.data.ts`: import `TAB_TYPE_CHAPTER_PANEL`, and add a tab `{ id: <fresh uuid>, tabType: TAB_TYPE_CHAPTER_PANEL, data: {} }` as the **first** tab in the **Model Text column** (column 1 — the `platformScriptureEditor.modelText` webview tab block) so it is the active tab on Simple startup.

### 3b. Primary Current Task indicator → global toolbar

The persistent top bar is `PlatformBibleToolbar` (`src/renderer/components/platform-bible-toolbar.tsx`, component fn ~line 78), mounted once in `src/renderer/app.component.tsx:17` (above `<PlatformDockLayout />`). It is the **same toolbar in Simple and Power modes** — Simple-vs-Power gates individual children, not the toolbar itself (`useIsPowerMode()` from `src/renderer/hooks/use-is-power-mode.hook.ts`).

- The toolbar already reads the live ref: `BookChapterControl` renders at `platform-bible-toolbar.tsx:394-400` inside the center content slot, consuming `[scrRef, setScrRef, …] = useScrollGroupScrRef(...)` (~lines 80-97).
- **Mount the Current Task indicator** as a sibling React element **right after the `BookChapterControl` block (after line 400, before `</Toolbar>` ~line 410)**, reusing the same `scrRef` already in scope — no extra hook call needed. Alternatively pin it right via the `configAreaChildren` prop cluster (~lines 245-315). The underlying flex containers in PBR's `Toolbar` primitive (`lib/platform-bible-react/src/components/advanced/toolbar.component.tsx`, children slot ~line 136, config slot ~line 146) already accept arbitrary children — **no edit to the PBR `Toolbar` primitive is required.**
- The indicator component itself is a **new reusable PBR component** (see §4). It takes the derived Current Task (or a "No plan set" state) as props/context and renders the persistent badge; clicking it opens the **chooser dialog**. Gate its mount to Simple mode if it should not appear in Power (`!useIsPowerMode()`), per the design intent that this is the Simple experience.

### 3c. Primary chooser → dialog opened from the indicator

Per design §6, the chooser is PT9's "My Tasks" lineage trimmed for Simple: defaults to **My Tasks** (Saroj's available tasks, grouped by active scope with prev/next Priority navigation), **Solo / Together** sections, an unobtrusive **All Tasks** toggle, and **"Available after <Stage>"** positive status wording. Drop the assignee column in My-Tasks mode.

- Build the chooser as a **reusable PBR component** (`ChooserDialog` or similar) rendered inside a shadcn `Dialog`. For the unwired vehicle, the simplest reliable path is to render the dialog **locally in the renderer** (controlled `open` state in the indicator's host, or a small renderer wrapper) rather than going through the app's `DIALOGS` registry / extension dialog system — that registry path needs more wiring and is out of scope for an unwired surface. Open it on indicator click.
- Do **not** reproduce PT9's dense table. Keep it lean (design §6).

### 3d. Variant switcher (primary ↔ secondary)

Put it **out of Saroj's workspace chrome** (design §1). Cheapest unwired option: a small dev-only control (e.g. a query param, a `localStorage` flag, or an item in the existing user-profile popover — `src/renderer/components/.../user-profile-popover.component.tsx`). It must read as a meta control, not a product feature. Both concepts may be mounted simultaneously behind it, or it toggles which one is active.

---

## 4. The reusable PBR components (shared with Vehicle A)

Build all surfaces as **reusable, shadcn-style components under `lib/platform-bible-react/src/components/advanced/…`** so Vehicles A & B mount the **same** components (ADR-0001; design §10). Reuse/extend round-1's `chapter-panel/` directory; add the new primary surfaces alongside it. Suggested layout (extend round-1, do not fork it):

```
lib/platform-bible-react/src/components/advanced/next-step/   (or reuse chapter-panel/)
  types.ts                      # plan-def types REUSED from project-plan-draft (verbatim) + INVENTED progress/assignment/derived types
  derive-chapter-view.util.ts   # derives current Stage + remaining Tasks from plan + progress (PT9 GetFirstIncompleteStageIndex logic; design §2)
  chapter-panel.component.tsx   # SECONDARY surface
  current-task-indicator.component.tsx   # PRIMARY indicator (toolbar)
  chooser-dialog.component.tsx           # PRIMARY chooser (dialog)
  sil-compact-plan.data.ts      # the SIL Compact Base Plan (see §5)
  philippians-progress.data.ts  # INVENTED per-chapter progress fixture (§9)
  birth-narrative-progress.data.ts  # INVENTED Priority fixture (§9) — if you build the Priority scope
```

**Styling & i18n:** Tailwind v4 `tw:` prefix + shadcn semantic colors (design §10). Compose from existing shadcn primitives (`@/components/shadcn-ui/{card,badge,button,dialog,separator}`). Any user-facing string belongs in `assets/localization/*.json` (Code-Style-Guide localization rules); for the unwired prototype, English strings inline are acceptable if localization adds disproportionate friction — prefer the localization store where it's cheap.

**shadcn discipline:** if you must edit any file under `lib/platform-bible-react/src/components/shadcn-ui/`, every change needs a `// CUSTOM:` annotation (see `.claude/rules/code-quality/shadcn-discipline.md`). Prefer composing over editing primitives — you likely need **zero** shadcn-ui edits.

**Export everything** the renderer imports from `lib/platform-bible-react/src/index.ts` (round-1 added a Q3 block there). A component/type/datum is only importable as `from 'platform-bible-react'` if it is exported from that aggregator.

---

## 5. The faked / unwired data (no PAPI, no C#)

Per the brief and design §2/§9: **reuse the real plan definition; synthesize the PT10 progress layer.** Nothing reads the backend.

- **Plan definition — reuse, don't re-author.** The typed plan model lives on `origin/project-plan-draft` at `lib/platform-bible-react/src/components/advanced/project-plan-dialog/types.ts` (`ProjectPlan` → `PlanStage[]` → `PlanTask[]`, `CheckSetting`, etc.). The 11 PT9-derived **factory plans** are at `lib/platform-bible-react/src/stories/advanced/project-plan-dialog/factory-plans.ts` (and handwritten samples + `EMPTY_PROJECT_PLAN` at `…/sample-data.ts`) on that branch.
  - **Pull these via `git show origin/project-plan-draft:<path>`** — they are **not** on `proto/steps-2026Q3`. (The brief cites `stories/advanced/…`; the **actual** path on the branch is `lib/platform-bible-react/src/stories/advanced/…` — use the actual path.)
  - **Recommended approach (matches round-1):** **hand-author a self-contained `sil-compact-plan.data.ts`** holding just the SIL Compact Base Plan (6 stages, real task/check ids), copying the relevant slice from the factory data, rather than importing the 10k-line `factory-plans.ts` story file into the shipped PBR bundle. Copy the plan-definition **types** verbatim into the component's `types.ts` (round-1 did exactly this, with a `#region REUSED` marker) so PBR stays self-contained and the bundle stays small. **Do not re-author the plan content** — copy the real ids/names from the factory data.
- **Progress layer — invent it (the only thing you make up).** A small PT10-shaped model: `ChapterProgress { unit, currentStageId-is-DERIVED-not-stored, completedTaskIds, openChecks: { checkId, state: 'passing' | 'has-issues' | 'stale', issueCount? } }`. The **current stage is derived** (earliest stage with an unfinished Task or unpassed required Check — PT9's `GetFirstIncompleteStageIndex`; design §2), **never stored**. Encode Priority ordering, Assignment, and the Solo/Together split here too (PT10 enhancements with no PT9 equivalent).
- **Seeded fixture (design §9) — encode exactly:**
  > **Display relabel (UX fix B1):** the two human-judgment stages show **Review** vocabulary — "Team Review & Comprehension Review" and "Consultant Review" — a thin display-name relabel over the **real** plan ids (ids/structure/lookup unchanged; not a re-authoring). Automated Checks stay **Check**. Derived wording follows: "Available after Consultant **Review**."
  - **Plan:** SIL Compact Base Plan (6 stages: Drafting → Team Review & Comprehension Review → Preparing for Consultant → Consultant Review → Community Review → Final Preparation for Publication).
  - **Two scopes:** **Philippians** (4 ch, book-by-book) **and** **Priority "Birth Narrative"** (Matt 1–2 / Luke 1–2, cross-book).
  - **Roles:** Saroj drafts; consultant **Maria** owns Consultant Review (enables the teammate-block).
  - **Per-chapter spread (Philippians):**
    - **Php 1** — advanced to **Community Review**; carries a **stale reopened Check** — the **forward-ratchet + content-addressed staleness** story (it does NOT demonstrate NN6 just-advanced; that lives on Luke 1 below).
    - **Php 2** — the **dense focal chapter** in Team Review & Comprehension Review: comprehension Review available; a co-translator Review with comments/issues; `spelling.word-list` = 12 issues; `basic.quotations` = no issues; `other.biblical-terms` = 5 issues; plus a later Task reading **"Available after Consultant Review."**
    - **Php 3** — Drafting (plain next).
    - **Php 4** — Drafting that **blocks Maria** (Saroj's unfinished Drafting is the direct prerequisite of Maria's Consultant Review → drives the Current Task "unblock a teammate" precedence, design §4 rule 0).
  - **NN6 dedicated chapter — Luke 1** (Birth Narrative Priority): just finished all of Drafting with no open issues and **cleanly crossed into "Team Review & Comprehension Review"** — show the explicit "reached next stage" indication here (the dedicated NN6 chapter, not Php 1).
  - **Second project on `EMPTY_PROJECT_PLAN`** for the **no-plan fallback (NN2)**: indicator shows a quiet "No plan set"; a zero state (reuse the `saroj-studies` `no-project-zero-state` pattern if available) with two CTAs — "learn the value of a project plan" and "contact your project admin." **Inform-only — never let Saroj author a plan** (authoring is out of scope).

How the fixture reaches the surfaces: the chapter panel reads the live `scrRef` and looks the chapter up in the fixture; the indicator computes the recommended Current Task from the same fixture (Solo only; teammate-unblock precedence). Per the round-1 structural note, panels in `SIMPLE_LAYOUT` receive per-chapter state via React **context or live hooks, not props** — read the live ref via the hook, do not thread props through `LayoutData` (it is a static module-load object).

---

## 6. Build, rebuild, run, and visually verify

This is the **load-bearing platform mechanic for Vehicle B**: the renderer consumes PBR from its **built `dist/`** (and, in dev, from a **pre-bundled webpack DLL**) — **not** from PBR source. New PBR exports are invisible to the running app until you rebuild **both** PBR **and** the DLL, then restart. (Verified: root `package.json` declares `"platform-bible-react": "file:./lib/platform-bible-react"`; PBR's `package.json` points `main`/`module`/`types` at `dist/`; the renderer dev DLL bundles all root deps incl. PBR — `.erb/configs/webpack.config.renderer.dev.dll.ts:29-31`, consumed via `DllReferencePlugin` at `webpack.config.renderer.dev.ts:127-131`.)

**The dev loop to see PBR changes in the running app:**

1. Export the new component(s)/type(s)/data from `lib/platform-bible-react/src/index.ts`.
2. Rebuild PBR dist: **`npm run build:pbr`** (= `cd lib/platform-bible-react && npm run build`). Heavy (~1–2 min: Vite prod bundle + `dts-bundle-generator` + typedoc). For faster inner loops you may run `cd lib/platform-bible-react && npm run build:basic` (skips lint-fix/typedoc) — but run the full `build:pbr` before you finish.
3. Rebuild the renderer DLL so the new dist is re-bundled: **`npm run build:dll`**. **Skipping this is the #1 trap** — the renderer keeps serving the stale PBR baked into the old DLL, and your new exports silently won't appear.
4. Start/restart the app. **Renderer-only edits** (the toolbar/tab/layout files in `src/renderer/`) hot-reload via webpack-dev-server; **PBR edits do not** — repeat 2–3 and restart.

**Running for visual verification (pick one):**
- **Headless with CDP** (for the `visual-verification` / Playwright-over-CDP path): `./.erb/scripts/refresh.sh` (runs `npm run build` then `npm start`). **Note:** `npm run build` does **not** build PBR or the DLL — run steps 2–3 **before** `refresh.sh`.
- **Visible window** (manual review): `env -u ELECTRON_RUN_AS_NODE npm start`. (Always strip `ELECTRON_RUN_AS_NODE`, which the editor sets and which breaks app startup.) Switch to the **Simple** interface mode (user-profile popover → `platform.interfaceMode = 'simple'`) so the seeded Simple layout loads.

**Verify visually that:**
- the **Current Task indicator** is in the toolbar and shows the recommended Task (and "No plan set" on the empty-plan project);
- the **chapter panel** is the active tab in the Model Text column, follows the editor, and shows the correct derived stage + remaining tasks for Php 1–4 (esp. the dense Php 2);
- the **chooser** opens from the indicator with Solo/Together sections and "Available after <Stage>" wording;
- the **variant switcher** flips primary ↔ secondary from out-of-the-way chrome;
- all **6 NNs** are demonstrable against the fixture.

Use the `visual-verification` skill (Playwright over CDP) to screenshot and click through, or `app-runner` to manage lifecycle.

---

## 7. Quality gate (mandatory — the Round-1 lesson)

**Round-1 lesson — a real compile error an isolated typecheck masked.** Round-1's first cut called `useScrollGroupScrRef(0)` — passing only the scroll-group id and **omitting the required second argument** (`setScrollGroupScrRef`). PBR typechecks clean in isolation (the bug is in the **renderer**, not PBR), so a PBR-only check would have shipped it green. It was a genuine renderer type error, fixed by `useScrollGroupScrRef(0, () => false)`.

**Therefore: run the FULL repo typecheck and build — never just the isolated PBR/component check.** Before reporting done:

1. **Full typecheck:** `npm run typecheck` (root — runs `typecheck:core` **and** every workspace). Not just the PBR workspace.
2. **Full lint:** `npm run lint` (root — same command CI runs). Fix unfixable errors inline; do not punt (`.claude/rules/code-quality/lint-sweep-verification.md`). Fix code, don't suppress (`.claude/rules/code-quality/eslint-disable-discipline.md`).
3. **Tests:** `npm test` (include any `derive-chapter-view.util.test.ts` you carry over/extend).
4. **A build that exercises the renderer's consumption of PBR** — e.g. `npm run build:pbr && npm run build:dll && npm run build:renderer` — so a renderer-side type/compile error against the new PBR surface is caught **before** runtime, not masked by an isolated PBR build. (The §6 dev loop already does most of this; the point is to treat the renderer↔PBR boundary as the thing under test.)

Only when the **full** typecheck + lint + tests + renderer build are green, and you have **visually verified** in the running app, is this done.

---

## 8. Guardrails

- **No PAPI / no C# / no extension host.** Faked local data only. `ChangeBooksInProjectPlan` and all backend exposure are **deferred** — out of scope.
- **Don't redesign.** The four canonical docs decide design/vocab/fixture. If you find a genuine ambiguity, surface it — don't silently pick (`CLAUDE.md` coding discipline).
- **Scope discipline.** Build the two concepts + 6 NNs + fixture. Don't add features beyond the spec; **choose simpler** on every tie (the brief's overriding rule). NN4's "mark done" affordance is **intentionally open** — a reasonable checkbox-or-button is fine; don't over-invest.
- **Use current vocabulary** (`CONTEXT.md`) in all new code, types, and component names — not round-1's "step"-everywhere naming.
- **Authorship:** Alex Mercado is the author; attribute AI as a generator only (no `Co-Authored-By: Claude`). Branch + commit only if asked.
