# Next-Step Workflow

The prototype context for "Saroj advances a chapter through the steps and stages of a project plan." This glossary fixes the language the prototype, the focus-group feedback, and the eventual epic all share. Scope: this Q3 2026 prototype only — not the whole platform.

## Language

**Next-Step Workflow**:
The initiative and prototype: a translator advancing a chapter through the steps and stages of a project plan, knowing what to do next.
_Avoid_: next-task workflow (the external proposal doc keeps that name; internally we say next-step).

**Saroj**:
The persona — a translator using PT10 Simple who needs to know what's next for the chapter in front of them.

**Chapter**:
The base unit of progression — each chapter independently advances through the plan's stages — and the editor's current-view lens (the manuscript editor shows one chapter at a time). The smallest unit that can belong to a Priority.

**Project Plan**:
The ordered set of stages (and their steps) every chapter passes through.
_Avoid_: workflow (reserved for the initiative name), process.

**Stage**:
A named phase a chapter is in, composed of steps. A chapter's current stage is the earliest stage that still has unfinished steps for it; it advances when all of that stage's steps are done.
_Avoid_: phase, status, milestone.

**Priority**:
A named, ordered selection of scripture — chapters, ranges, books, or book-groups, possibly slicing into or across books (e.g. "Birth Narrative" = Mat 1–2, Luk 1–2) — that orders which chapters the team works next. Optional; absent any Priority, work proceeds book-by-book.
_Avoid_: grouping, filter, assignment.

**Step**:
The umbrella term for one unit of work that gates a chapter's advance through a stage. Every step is either a **Task** or a **Check**.
_Avoid_: item, to-do, activity, requirement, criterion.

**Task**:
A step completed by human **assertion** (the translator checks it off) that surfaces no issues. (e.g. "Draft the text.")
_Avoid_: to-do, action.

**Check**:
A step whose purpose is to surface **issues**; it **passes** only when none remain. Completion is either **manual** — a human performs the activity and asserts it (e.g. exegetical, naturalness check) — or **automated** — an engine evaluates it, deterministic today and possibly AI-based later (e.g. basic checks, spelling). In a given stage a check is **required** (it gates that stage) or **notify-only** (advisory there).
_Avoid_: validation, test, rule.

**Issue**:
A problem a check surfaces that must be resolved before the check can pass; it can **reopen** if later edits change the text.
_Avoid_: error, flag, warning.

**Pass**:
A check's satisfied state — performed (manual) or evaluated (automated) with no open issues. A check result is tied to the text it was run against, so editing the text can make a prior pass **stale**.

**Current Step**:
The single step Saroj is focused on at a given moment, surfaced persistently in his workspace. The system recommends one by default (so there is always a "what's next"); Saroj can change it. May be a Task or a Check.
_Avoid_: current task (the step in focus may be a check), active step.

**Teammate**:
Another user on the project who is assigned steps of their own. Saroj's work can block, or be blocked by, a teammate's steps.
_Avoid_: collaborator, colleague, reviewer.

**Project administrator**:
The role that authors and configures a project's plan. Out of scope this quarter — the no-plan fallback points Saroj to *contact* them, and does not let him configure a plan himself.
_Avoid_: owner, manager.

**Assignment**:
The pairing of a step (for given chapters) with who will do it: a specific person, **Multiple** specific people, **Anyone**, or the **Team**. A step can be assigned differently for different chapters.
_Avoid_: allocation.

**Anyone**:
The assignment for a step no specific person has claimed — whoever's looking may pick it up.
_Avoid_: unassigned (implies the step is no one's job).

**Solo**:
The grouping of steps a person does on their own time — those assigned to them, to **Multiple** people including them, or to **Anyone**. The **Current Step** is only ever recommended from Solo.
_Avoid_: individual tasks, my tasks.

**Together**:
The grouping of **Team**-assigned steps the team does in a team meeting. Parked from Solo work until team-meeting time; never recommended as the individual Current Step. (First-class distinction grounded in observed behavior — teams used PT9's "(Team)" label to mean "save for the meeting.")
_Avoid_: team tasks (as the bucket label), group work.

**Team-meeting mode**:
A mode the current user (e.g. Saroj) turns on from within the next-step UI when the team meets. While on, the **Together** grouping comes forward and the **Current Step** is recommended from Together instead of Solo; turning it off reverts to Solo work.
_Avoid_: meeting mode, group mode.

## Relationships

- A **Project Plan** has one or more ordered **Stages**
- A **Stage** contains one or more **Steps**
- A **Step** is either a **Task** (asserted) or a **Check** (manual or automated; must pass)
- A **Check** surfaces zero or more **Issues**; any open issue blocks the check from passing
- A **Chapter** is the base unit of progression: it independently advances through the **Stages** by completing all of each stage's **Steps** for that chapter
- A step is satisfied per-chapter, per-book, or once per-project — a book- or project-level step is shared across all the chapters it covers, so it can gate many chapters at once
- A **Priority** orders which **Chapters** are worked next; absent any Priority, work proceeds book-by-book
- Saroj's **Current Step** is one available **Step** — recommended by default, overridable — surfaced persistently in the workspace
- A **Step** may be **assigned** to a user for specific chapters
- Saroj's unfinished step **blocks** a **Teammate** when it is the direct prerequisite of a step assigned to that teammate who is otherwise ready; unblocking a teammate takes precedence in the **Current Step** recommendation

### Dynamics

- Asserting a task's completion **advances** the chapter; a **required check** blocks the chapter from leaving the stage that requires it until it **passes**. (This within-stage blocking is a PT10 design behavior — PT9's engine advances on task completion alone and treats checks as advisory. Provisional; see ADR-0002.)
- **Forward ratchet:** once a chapter passes a stage, a later regression of that stage's check is *advisory* (surfaced, not demoting) — unless a subsequent stage also requires that check, where it gates again.
- Checks are **content-addressed:** editing text can make a prior pass **stale**, reopening the check. Whether a reopened check blocks depends on whether the chapter's current or next stage requires it.
- Within a stage, **several steps can be available at once** — the plan is not strictly single-file. A step reads as *waiting* (available after an earlier stage), *has issues* (a count), or *done / no issues*. The **Current Step** recommendation features one available step; the chapter view lists them all.
- A **Together** step is never offered as the individual **Current Step** — it is parked until the current user turns on **Team-meeting mode** from within the next-step UI, when the Together grouping comes forward and the Current Step is drawn from it.

## Example dialogue

> **Dev:** "Saroj checks off the draft for Mark 2 — does the chapter move to the next stage?"
> **Domain expert:** "Only if that was the last **step** in the stage, and only for Mark 2 — Mark 1 and Mark 3 are tracked separately. Drafting is a **Task**: he just asserts it. But the next stage has an exegetical **Check** — that's a *manual* check; he performs it and asserts it, but if it surfaces **Issues**, the chapter stalls until they're resolved."
> **Dev:** "And the spelling check?"
> **Domain expert:** "That's an *automated* check — the engine evaluates it; it **passes** when there are no issues. Watch out: if he edits Mark 2's text later, a check that already passed can **reopen**."

## Flagged ambiguities

- "step" (the non-negotiables' word) vs. "task"/"check" (the data model's words) — resolved: **Step** is the user-facing umbrella; **Task** and **Check** are its two subtypes. A **Check** is further **manual** (asserted by a human) or **automated** (evaluated by an engine). There is no third kind of step.
- **Subtype naming — Scheme A adopted; Scheme B (with "Review") to be advocated.** We use **Scheme A** (Task / Manual Check / Automated Check) as the working scheme. **Alex intends to advocate Scheme B (Task / Review / Check) separately with the team** — renaming the human-judgment "manual check" to **Review**. Supporting rationale (a data-alignment finding from the SIL Compact plan):
  > One data-alignment note worth flagging (it bears on our taxonomy): in the actual data, the manual checks (Comprehension Check, exegetical, naturalness) are modeled as by-chapter Tasks, not as catalog checks. Only the automated checks are the `requiredInStage` entries. So in the data the assert-vs-evaluate line is Task-vs-Check — our "manual check" subtype has no distinct data flag; we'd infer it from the task's name/intent. Conceptually Scheme A still holds; just know the seeded data represents a manual check as a task.

  Under Scheme B the data aligns one-to-one — **a Check is automated (evaluated); a Task is asserted** — with **Review** as the named human-judgment kind of Task. That would reduce or remove the need for the umbrella **Step** and the qualifier **automated check**. Revisit this glossary if the team adopts B.
- "grouping" — resolved: a grouping is a **Priority's** scripture selection, not a separate concept.
- chapter vs. grouping as the progression unit — resolved: the **Chapter** is the base unit. Because a Priority can slice into or across books, chapters must be independently trackable and cannot inherit a single stage from their book.
- "next-task workflow" vs. "next-step workflow" — resolved: internally **next-step workflow**; the external proposal/Google Doc keeps its original "Next-task workflow" title.
