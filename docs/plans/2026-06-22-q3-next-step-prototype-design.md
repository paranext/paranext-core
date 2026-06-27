# Q3 2026 Next-Step Prototype — Resolved Design

Companion to the [prototype brief](./2026-06-22-q3-saroj-next-task-prototype-brief.md) (the _why / scope_), [`CONTEXT.md`](../../CONTEXT.md) (the _language_), and the ADRs (the two hard calls). This doc captures the _resolved how_ from the design grilling session on 2026-06-22 — the prototype design itself.

> Status: provisional. Several decisions are deliberately held loosely and exist to be tested with designees. Where a decision diverges from PT9 or is held with an open hand, that is called out.

---

## 1. Two prototypes

We build **two distinct concepts** to put in front of designees, not one:

- **Primary — "one thing to focus on."** A persistent **Current Task** indicator in the global toolbar (top or side), always visible, plus a deeper **chooser** for picking which available task becomes the focus. Philosophy: _go where you're most needed._
- **Secondary — "the chapter's full picture."** A chapter-anchored panel showing the prominent next task over an expandable _remaining-in-this-stage_ list. Philosophy: _here's everything about the chapter in front of you._

**Variant switcher** (primary ↔ secondary) lives **out of the way** — an avatar menu or a meta/Storybook-level control — never in Saroj's workspace chrome, so it doesn't read as a product feature.

## 2. Progress model

- The **Chapter** is the base unit of progression; each chapter advances independently (a Priority can slice into/across books — "Birth Narrative" = Matt 1–2, Luke 1–2 — so chapters can't inherit one book-wide stage).
- A chapter's **current stage is derived** (PT9-confirmed: `ReadOnlyProjectProgressInfo.GetFirstIncompleteStageIndex`), not stored — it is the earliest stage with an unfinished task or unpassed required check. Reopening a check recomputes it backward for free.
- **Gating granularity** comes from each task's `markComplete` (chapter / book / project): a by-book or by-project task is shared across the chapters it covers, so it can gate many at once.
- **Priority** is an ordering/filter layer over chapters (PT9 `TranslationPriorities`); absent any Priority, work proceeds book-by-book. Priorities are invented/faked for the prototype — they do not exist in `project-plan-draft`.

## 3. Checks & issues

- A required **Check** blocks a chapter from leaving the stage that requires it until it **passes**; once advanced, it **ratchets forward** (a later regression is advisory unless a subsequent stage re-requires it). This within-stage blocking is a deliberate PT10 divergence — see [ADR-0002](../adr/0002-required-checks-block-within-stage.md).
- Check state is **content-addressed**: `passing` (0 issues at current text) / `has-issues` (a count) / `stale` (no result for current text). **Reopening = staleness** after an edit. No issue-tracking engine; in mockups we author the states, in the epic-candidate we fake the flip on a scripted edit.
- In the data, **reviews** (comprehension, exegetical, naturalness) are modeled as by-chapter **Tasks**; only automated **Checks** are `requiredInStage`. (This is why Check = automated, Review = human — see `CONTEXT.md`.)

## 4. Current Task recommendation

The single recommended task, in precedence order:

0. **Unblock a teammate** — Saroj has an unfinished task that is the _direct_ prerequisite of one assigned to a teammate who is otherwise ready. In the **primary** prototype this may pull the indicator to a _different chapter_; in the **secondary** it never does (it only elevates an in-chapter task).
1. **First available unfinished task in the chapter in view** (the default). "Available" = its `taskStart` condition is satisfied. The task's _type + state_ decide what Saroj sees (do & mark done / perform a review / clear issues) — no separate ranking.

Other rules:

- The indicator **follows the editor** by default (re-recommends per chapter in view). Pinning to an explicit pick is deferred.
- The Current Task is **only ever recommended from Solo** (see §5); **Together** tasks are worked collaboratively, never individually recommended.
- Multiple tasks can be available at once; the indicator features one, the chapter view lists all.

## 5. Collaboration: Solo / Together

- **Assignment** values: a specific person · **Multiple** (>1 named person) · **Anyone** (any member may do it individually) · **Team**. _(Whether **Unassigned** is distinct from **Anyone** is an open UXR question — see `CONTEXT.md`.)_
- Tasks split into two first-class buckets (grounded in observed behavior — teams hoard "(Team)" work for meetings):
  - **Solo** — assigned to Saroj, to Multiple-including-Saroj, or to Anyone. Done on his own time. The **Current Task** is drawn from here.
  - **Together** — Team-assigned tasks, worked collaboratively (e.g. in a team meeting); never offered as the individual Current Task.

## 6. The chooser (primary's "choose a task" surface)

PT9's "My Tasks" view is the lineage, trimmed for Simple (do _not_ reproduce PT9's dense table):

- Defaults to **"My Tasks"**, a lean list of Saroj's available tasks grouped by the active scope (book, or Priority with **prev/next** navigation as in PT9's "Current priority: Gospels / Next priority: ACT").
- Each row = task + chapter + status. Drop the _assignee_ column in My-Tasks mode (it's all Saroj). Unobtrusive **"All Tasks"** toggle for the team picture.
- Split into **Solo** and **Together** sections.
- Status wording flips PT9's negative "Blocked by stage: Drafting" to the informative-but-positive **"Available after Drafting"**.

## 7. No-plan fallback (NN2)

Inform-only — never lets Saroj author a plan (authoring is out of scope; see [Project administrator] in `CONTEXT.md`):

- The Current Task indicator shows a quiet "No plan set" rather than a task.
- A zero state (reuse the `saroj-studies` `no-project-zero-state` pattern) with two CTAs: **learn the value of a project plan** (article — content to be written) and **contact your project admin**.
- _Deferred:_ once built, route users with the proper privileges to configure a plan.

## 8. Non-negotiables coverage

| NN                                 | Covered by                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| 1 — active chapter's current stage | Derived stage (§2), shown in both prototypes                                                |
| 2 — fallback if no plan            | Inform-only zero state (§7)                                                                 |
| 3 — which tasks remain             | Chapter view lists all current-stage tasks (§1 secondary; §6 chooser)                       |
| 4 — mark a task done               | **Intentionally open** — checkbox-vs-other affordance is a mockup exploration               |
| 5 — task that must earn a pass     | Check or Review + what's required, or flagged issues (§3)                                   |
| 6 — all complete → next stage      | Derived advance + a "reached next stage" state (§1 secondary; **Luke 1** in fixture, §9 B2) |

## 9. Seeded fixture

> **Display-name relabel (UX fix B1):** the two human-judgment stages show **Review** vocabulary — "Team Review & Comprehension Review" and "Consultant Review" — a thin display relabel over the **real** plan ids (ids/structure/lookup unchanged; not a re-authoring). Automated Checks (spelling/quotations/biblical-terms/etc.) stay **Check**.

- **Plan:** SIL Compact Base Plan (real, 6 stages: Drafting → Team Review & Comprehension Review → Preparing for Consultant → Consultant Review → Community Review → Final Preparation for Publication). Reuse `project-plan-draft` types + factory plans; do not re-author (only the shown stage names are relabeled per the note above).
- **Two scopes:** **Philippians** (4 ch, book-by-book) + **Priority "Birth Narrative"** (Matt 1–2 / Luke 1–2, cross-book).
- **Roles** fall out of stages — Saroj drafts; consultant _Maria_ owns Consultant Review (enables the teammate-block).
- **Per-chapter spread (Philippians):** Php 1 advanced (Community Review) carrying a **stale reopened check** — the **forward-ratchet + staleness** story (it does _not_ demonstrate NN6 just-advanced; that lives on Luke 1), Php 2 _dense_ multi-task focal chapter (comprehension review available; co-translator review with comments; `spelling.word-list` 12 issues; `basic.quotations` no issues; `other.biblical-terms` 5 issues; a later task "Available after Consultant Review"), Php 3 drafting (plain next), Php 4 drafting that **blocks Maria**.
- **NN6 dedicated chapter — Luke 1** (Birth Narrative Priority): just finished all of Drafting with no open issues and **cleanly crossed into "Team Review & Comprehension Review"** — show the explicit "reached next stage" indication here.
- A **second project** on `EMPTY_PROJECT_PLAN` for the no-plan fallback.

## 10. Build approach

The three vehicles and the shared build approach live in **[ADR-0001](../adr/0001-prototype-vehicle-storybook-in-repo.md)** (don't restate them). Surface-specific notes for builders:

- **Where surfaces slot in Simple chrome:** the **Current Task** indicator → top toolbar (or side rail); the secondary chapter panel → the **Model Text** column; the **chooser** → a dialog opened from the toolbar/panel.
- Build each surface as a **reusable low-wiring component** (shadcn-style, under `components/…`) so vehicles A & B mount the same thing; variants as separate stories.
- Tailwind v4 `tw:` prefix + shadcn semantic colors; localization strings in `assets/localization/*.json`.

## 11. Open / deferred

- **NN4 affordance** (checkbox vs. other "mark done") — explore in mockups, don't decide in conversation.
- **Terminology rollout** — Check / Review / Revision / Comment is adopted in the prototype (`CONTEXT.md`); the outward-facing shift still needs stakeholder buy-in (see the overloading report).
- **Anyone vs. Unassigned** — open UXR question (§5).
- **Pinning** the Current Task (vs. follow-editor) — deferred.
- **`project-plan-redesign-1` types** — its availability enum mirrors PT9 more faithfully; consider for the epic-candidate.
- **PRD due 29 Jul; epic dev starts 11 Aug** — fidelity ramps toward the epic-candidate (~7 Jul).

## 12. Round 3 — post-demo revision (Matt demo, 2026-06-26)

The Magic Patterns prototype (the two §1 variants) was demoed to Matt. Direction: **combine the variants** and **lean coarse**. This evolves §1 (one combined concept, not two) and §4 (teammate rule).

- **Combine the variants.** The always-present **single focus item** (top-center) becomes the **entry point** into the **one-chapter focus** view (Matt liked both — merge them). Collapsed = a one-line "what's next"; expand = this chapter's stages/steps + where the chapter sits in the plan. The expandable panel _is_ the chapter view — not a separate sidebar.
- **Scope the focus to the current chapter only** — not all the Priority's tasks. Repeating the same task across chapters overwhelmed (Matt's main critique of the single-item variant).
- **Coarse by default (Matt's instruction).** Primary action = advance the chapter through **stages** with a single "mark done / advance"; tasks/issues stay on-demand via progressive disclosure, never required clicks. Asserting a stage done asserts its steps done. Bring the granularity question to designees; if they want finer, honor it.
- **Combine BCV with the task UI** — the focus item doubles as the BCV navigator (one control, not two).
- **Don't block on teammates' offline work** — proceed to the next available action; only show a calm "waiting on \<person\>" when that teammate's data is genuinely required (no forced send/receive). Reframes §4 rule 0.
- **Progress-reporting finding (PT codebase):** what gets _reported_ is the **asserted manual tasks**, not issue resolution — so issues don't drive progress reporting. Reinforces the coarse default; issues are advisory to the assert.
- **Central tension (nannying vs. vague):** help Saroj know what's next and stay _sincere_ about real practice without _demanding_ insincerity. The live pull is best-practice accountability (#2, consultant-driven, tends to nanny) vs. scalable real use (#3).

### Round-3 A/B explorations (build as demoable toggles; resolve with designees)

- **1a vs 1b — focus granularity:** single focus = **Stage** (1a, coarse) vs = **Step** (1b — a Task, or a Check → its Issues). Tests Toulmin's hypothesis (step-focus over-nannies / overwhelms) vs Mercado's (step-focus helpfully narrows attention).
- **3a vs 3b — BCV/focus coupling:** changing book/chapter moves the focus too (3a, unified) vs focus stays **pinned** while navigating, with progressive-disclosure affordances to jump back to the focus chapter or re-point the focus to the viewed one (3b). When viewed = focus, keep it simple; complexity appears only when they diverge.

### Tension to resolve (flagged)

- **Coarse advance vs required-checks-block (ADR-0002).** A single coarse "advance" is in tension with "required checks block within the stage." Round-3 leans: the assert covers the manual tasks (what's reported); open issues are surfaced but **advisory**, not hard-gating the coarse assert — softening ADR-0002 (which was provisional). Confirm with designees before hardening.
