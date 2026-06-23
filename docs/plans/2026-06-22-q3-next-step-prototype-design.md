# Q3 2026 Next-Step Prototype — Resolved Design

Companion to the [prototype brief](./2026-06-22-q3-saroj-next-task-prototype-brief.md) (the *why / scope*), [`CONTEXT.md`](../../CONTEXT.md) (the *language*), and the ADRs (the two hard calls). This doc captures the *resolved how* from the design grilling session on 2026-06-22 — the prototype design itself.

> Status: provisional. Several decisions are deliberately held loosely and exist to be tested with designees. Where a decision diverges from PT9 or is held with an open hand, that is called out.

---

## 1. Two prototypes

We build **two distinct concepts** to put in front of designees, not one:

- **Primary — "one thing to focus on."** A persistent **Current Step** indicator in the global toolbar (top or side), always visible, plus a deeper **chooser** for picking which available step becomes the focus. Philosophy: *go where you're most needed.*
- **Secondary — "the chapter's full picture."** A chapter-anchored panel showing a prominent next step over an expandable *remaining-in-this-stage* list. Philosophy: *here's everything about the chapter in front of you.*

**Variant switcher** (primary ↔ secondary) lives **out of the way** — an avatar menu or a meta/Storybook-level control — never in Saroj's workspace chrome, so it doesn't read as a product feature.

## 2. Progress model

- The **Chapter** is the base unit of progression; each chapter advances independently (a Priority can slice into/across books — "Birth Narrative" = Matt 1–2, Luke 1–2 — so chapters can't inherit one book-wide stage).
- A chapter's **current stage is derived** (PT9-confirmed: `ReadOnlyProjectProgressInfo.GetFirstIncompleteStageIndex`), not stored — it is the earliest stage with an unfinished step. Reopening a check recomputes it backward for free.
- **Gating granularity** comes from each step's `markComplete` (chapter / book / project): a by-book or by-project step is shared across the chapters it covers, so it can gate many at once.
- **Priority** is an ordering/filter layer over chapters (PT9 `TranslationPriorities`); absent any Priority, work proceeds book-by-book. Priorities are invented/faked for the prototype — they do not exist in `project-plan-draft`.

## 3. Checks & issues

- A required **Check** blocks a chapter from leaving the stage that requires it until it **passes**; once advanced, it **ratchets forward** (a later regression is advisory unless a subsequent stage re-requires it). This within-stage blocking is a deliberate PT10 divergence — see [ADR-0002](../adr/0002-required-checks-block-within-stage.md).
- Check state is **content-addressed**: `passing` (0 issues at current text) / `has-issues` (a count) / `stale` (no result for current text). **Reopening = staleness** after an edit. No issue-tracking engine; in mockups we author the states, in the epic-candidate we fake the flip on a scripted edit.
- In the data, **manual checks** (Comprehension, exegetical, naturalness) are modeled as by-chapter **Tasks**; only **automated** checks are `requiredInStage`. (This underpins the "Review" naming proposal — see `CONTEXT.md` flagged ambiguities.)

## 4. Current Step recommendation

The single recommended step, in precedence order:

0. **Unblock a teammate** — Saroj has an unfinished step that is the *direct* prerequisite of a step assigned to a teammate who is otherwise ready. In the **primary** prototype this may pull the indicator to a *different chapter*; in the **secondary** it never does (no cross-chapter pull — it only elevates an in-chapter step).
1. **First available unfinished step in the chapter in view** (the default). "Available" = its `taskStart` condition is satisfied. The step's *type + state* decide what Saroj sees (do & check off / perform & confirm / resolve issues) — no separate ranking.

Other rules:
- The indicator **follows the editor** by default (re-recommends per chapter in view). Pinning to an explicit pick is deferred ("maybe later — keep it simple").
- The Current Step is **only ever recommended from Solo** (see §5). **Together** steps surface only in **Team-meeting mode**.
- Multiple steps can be available at once; the indicator features one, the chapter view lists all.

## 5. Collaboration: Solo / Together

- **Assignment** values: a specific person · **Multiple** (display when >1 named person) · **Anyone** (claimable — never "unassigned") · **Team**.
- Tasks bifurcate into two first-class buckets (grounded in observed behavior — teams hoard "(Team)" work for meetings):
  - **Solo** — assigned to Saroj, to Multiple-including-Saroj, or to Anyone. Done on his own time. Current Step is drawn from here.
  - **Together** — Team-assigned steps, done in a team meeting; parked from solo work.
- **Team-meeting mode** — the current user (Saroj) toggles it **from within the next-step UI**. While on, Together comes forward and the Current Step is drawn from it; off, it reverts to Solo. Manual trigger for now (scheduling deferred).

## 6. The chooser (primary's "choose a task" surface)

PT9's "My Tasks" view is the lineage, trimmed for Simple (do *not* reproduce PT9's dense table):

- Defaults to **"My Tasks"**, a lean list of Saroj's available steps grouped by the active scope (book, or Priority with **prev/next** navigation as in PT9's "Current priority: Gospels / Next priority: ACT").
- Each row = step + chapter + status. Drop the *assignee* column in My-Tasks mode (it's all Saroj). Unobtrusive **"All Tasks"** toggle for the team picture.
- Split into **Solo** and **Together** sections.
- Status wording flips PT9's negative "Blocked by stage: Drafting" to the informative-but-positive **"Available after Drafting"**.

## 7. No-plan fallback (NN2)

Inform-only — never lets Saroj author a plan (authoring is out of scope; see [Project administrator] in `CONTEXT.md`):

- The Current Step indicator shows a quiet "No plan set" rather than a step.
- A zero state (reuse the `saroj-studies` `no-project-zero-state` pattern) with two CTAs: **learn the value of a project plan** (article — content to be written) and **contact your project admin**.
- *Deferred:* once built, route users with the proper privileges to configure a plan.

## 8. Non-negotiables coverage

| NN | Covered by |
| --- | --- |
| 1 — active chapter's current stage | Derived stage (§2), shown in both prototypes |
| 2 — fallback if no plan | Inform-only zero state (§7) |
| 3 — which steps remain | Chapter view lists all current-stage steps (§1 secondary; §6 chooser) |
| 4 — check off a step | **Intentionally open** — checkbox-vs-other affordance is a mockup exploration |
| 5 — step that must earn a pass | Check + its actions/procedure or flagged issues (§3) |
| 6 — all complete → next stage | Derived advance + a "reached next stage" state (§1 secondary, Php 1 in fixture) |

## 9. Seeded fixture

- **Plan:** SIL Compact Base Plan (real, 6 stages: Drafting → Team Check & Comprehension Check → Preparing for Consultant → Consultant Check → Community Review → Final Preparation for Publication). Reuse `project-plan-draft` types + factory plans; do not re-author.
- **Two scopes:** **Philippians** (4 ch, book-by-book) + **Priority "Birth Narrative"** (Matt 1–2 / Luke 1–2, cross-book).
- **Roles** fall out of stages — Saroj drafts; consultant *Maria* owns Consultant Check (enables the teammate-block).
- **Per-chapter spread (Philippians):** Php 1 advanced (Community Review; a **stale reopened check**), Php 2 *dense* multi-step focal chapter (Comprehension Check available; Co-Translator Review with issues; `spelling.word-list` 12 issues; `basic.quotations` no issues; `other.biblical-terms` 5 issues; a later task "Available after Consultant Check"), Php 3 drafting (plain next), Php 4 drafting that **blocks Maria**.
- A **second project** on `EMPTY_PROJECT_PLAN` for the no-plan fallback.

## 10. Build approach — the "saroj-studies pattern" (ADR-0001)

Concretely, building the prototype the `proto/saroj-studies` way means:

- **Storybook stories, not the running app.** Each surface is a folder under `lib/platform-bible-react/src/stories/...` with a `.component.tsx` + `.stories.tsx` (plus `.data.ts` / `.utils.ts` as needed). Viewed in Storybook; ships nothing into Electron.
- **`WorkspaceShell` decorator** (`src/storybook/decorators/workspace-shell.tsx`) fakes PT10 Simple chrome: a top **stub toolbar** (where the BCV control "lives") over **three columns** — *Model Text · Editor · Resources & Tools* — with non-focused columns dimmed so a story spotlights one. This tells us where our surfaces slot:
  - Primary **Current Step** indicator → the **top toolbar** slot (or a side rail).
  - Secondary chapter panel → the **Resources & Tools** column.
  - The **chooser** → a deeper surface (dialog) opened from the toolbar/panel.
- **Reuse the real component library** (`platform-bible-react`, shadcn-based) and **real plan data** (`project-plan-draft` `types.ts` + factory plans). Only the progress, Priority, assignment, and Solo/Together layers are invented.
- **Tailwind v4 `tw:` prefix** and shadcn semantic colors; localization strings in `assets/localization/*.json`.
- **Variants are separate stories** (the branch merged several variant stories per surface).

This keeps the prototype "standalone, separate from the app" per the brief while staying close enough to real components that the ~7 Jul epic-candidate can converge toward buildable without re-platforming.

## 11. Open / deferred

- **NN4 affordance** (checkbox vs. other "mark done") — explore in mockups, don't decide in conversation.
- **"Review" naming (Scheme B)** — Alex to advocate Task / Review / Check with the team; the prototype keeps Scheme A for now (`CONTEXT.md` flagged ambiguities).
- **Scheduling trigger** for Team-meeting mode — deferred; manual toggle for now.
- **Pinning** the Current Step (vs. follow-editor) — deferred.
- **`project-plan-redesign-1` types** — its availability enum mirrors PT9 more faithfully; consider for the epic-candidate.
- **PRD due 29 Jul; epic dev starts 11 Aug** — fidelity ramps toward the epic-candidate (~7 Jul).
