# Next-Step Workflow

The prototype context for "Saroj advances a chapter through the steps and stages of a project plan." This glossary fixes the language the prototype, the focus-group feedback, and the eventual epic all share. Scope: this Q3 2026 prototype only — not the whole platform.

## The Problem**

*Primary: Known unknown*  
**Next-step workflow.** Assignments and Progress is often too hard for whole teams to adopt — and the feature only delivers value when the whole team uses it. A single member who can't or won't use Assignments & Progress breaks the workflow for everyone. How might *Saroj* know what to do *next* and how to get there?

*Supplemental: Unknown unknowns*  
**Blind spots and personas.** We need Paratext 10 to be usable at the end of Q3, and we need to develop awareness of our blind spots by having users interact with the product and its prototypes.

### **Context**

We're unsure how Saroj will figure out the next thing to work on. Paratext 9 has a UI for this, but prior research suggests usage may be missing, incomplete, or performative (after-the-fact). The Paratext 10 feature set currently lacks a next-step workflow.1 Without evidence, we are betting the project-plan and task-navigation work on a model of behavior that may not match real Sarojes.

### **Hypotheses we will test**

* **H1 — The next-step workflow must be embedded in the user's working context, not in a separate plan view.** If Saroj has to navigate *to* a plan to know what's next, the workflow fails regardless of how well-designed the plan itself is. Adoption failure in PT9 is a symptom of this structural mismatch, not a discoverability problem. *Tested by:* Round 1a observation (do teams actually consult the plan, or work around it?) and Round 2 prototype testing (embedded-task vs. plan-first flows).  
* **H2 — Stakeholders' model of the next-step workflow diverges from what translation teams actually do.** *Tested by:* comparing Round 1a (team observation) against Round 1b (stakeholder sessions), which are designed to run in parallel for exactly this comparison.

### **Who has this problem?**

* **Saroj.** Translators who would benefit from a next-step workflow but currently don't get one.  
* **Donna and team leads.** Need everyone using Assignments & Progress for the feature to deliver any value.  
* **Consultants, translation orgs, funders.** Depend on progress data that Assignments & Progress would produce if used consistently.

### **How do we know?**

**52.5% of survey respondents say they don't use Assignments and Progress** (n \= 295 actionable responses).

* **"Don't know how" is the \#1 actionable barrier (49 responses).** Discoverability and onboarding failure, not a design failure.  
  *"Never heard of it. I do translation consulting, and my boss tells me what to do next."*  
* **No project plan \= no entry point (60 responses, largest category).** Assignments & Progress is downstream of a project plan existing.  
* **Spreadsheets and Rev79 are winning alternatives (20).**  
  *"We found Paratext and other project planners hard to use, so I developed our own task planner — and they found even that simple version hard to use."*  
* **Workflow mismatch is underreported but vocal (7).** Too linear; incompatible with Oral Bible Translation; stage logic blocks partial-book workflows.  
  *"The options I am given are too linear and awkward to work with, so I just ignore paying attention to the whole thing."*  
* **Team resistance is a real secondary barrier (11).** Discipline, computer skills, leaders not using Paratext, tasks assigned verbally.  
  *"Many teams have been unwilling to learn or use the planning tools — it's not a hill I'm willing to die on."*  
* **Low perceived ROI (10).** Too much admin work for the benefit; entrenched prior systems.  
  *"To much extra work for too litle benfit."* \[sic\]  
* **Navigation heuristics support the diagnosis.** Established heuristics — primary tasks should be reachable from the user's current context, recognition over recall, system status visible without traversal — are all violated by a project plan that lives off-screen. The survey signal and the design heuristics point at the same root cause.

1 Marvin interview of stakeholder: *"If I have a translator and they're assigned different roles or different tasks, where would they go to figure out, kind of like, 'All right, we finished drafting John 1\. What do I need to be doing next?…Being able to hyperlink it to the correct screen…What windows do I need to have open?'"* — [recording](https://app.heymarvin.com/note/38fbb19c-87da-402e-bea1-dbdd0190535d/)

### **What happens if we do nothing?**

* Saroj self-manages his tasks, doesn't follow a plan, or has no plan at all. Saroj struggles to navigate P10simple.  
* Funders receive poorer progress data because Assignments & Progress isn't populated.  
* We build the project-plan and task-navigation system on assumptions → high risk of rework after beta.  
* Dev capacity is misallocated against an untested workflow model.  
* Partner trust in PT10 simple's persona alignment is compromised.


## Language

**Next-Step Workflow**:
The initiative and prototype: a translator advancing through the steps and stages of a project plan, knowing what to do next.
_Avoid_: next-task workflow (the external proposal doc keeps that name; internally we say next-step to avoid conflating the work "task").

**Saroj**:
The persona — a translator using PT10 Simple who needs to know what's next for the chapter in front of them. Saroj is a professional translator, and he is good at his job, but he is not comfortable with complex software or technology; he is a “low tech preference translator”. If there are too many buttons or complex menus, Saroj feels overwhelmed. It slows him down and makes him feel like the technology is working against him. Sometimes Saroj might close the wrong tab or move a panel in Paratext 9 and he loses his layout. Saroj wants to be able to focus on the words, not on the software.

**Chapter**:
The base unit of progression — each chapter independently advances through the plan's stages — and the editor's current-view lens (the manuscript editor shows one chapter at a time). The smallest unit that can belong to a Priority.

**Project Plan**:
The ordered set of stages (and their steps) every chapter passes through.
_Avoid_: workflow (reserved for other purposes), process.

**Stage**:
A named phase a chapter, book, or Priority is in, composed of steps. A chapter's, book's, or Priority's current stage is the earliest stage that still has unfinished steps for it; it advances when all of that stage's steps are done.
_Avoid_: phase, status, milestone.

**Priority**:
A named, ordered selection of scripture — chapters, ranges, books, or book-groups, possibly slicing into or across books (e.g. "Birth Narrative" = Mat 1–2, Luk 1–2) — that orders which chapters the team works next and is in sequence with other Priorities. Optional; absent any Priority, work proceeds book-by-book and chapter-by-chapter.
_Avoid_: grouping, filter, assignment.

**Step**:
Colloquial only — "what's my next step?" **Not a modeled entity.** The initiative name _next-step workflow_ uses it loosely; the modeled units are **Stage**, **Task** (kinds: Drafting / Review / Revision), and **Check**. Neither PT9's progress subsystem nor the plan data has a "step" type.
_Avoid_: using "step" as a data type, an umbrella, or a row in a list.

**Task**:
The umbrella for a unit of work a **person** does and asserts complete — everything Saroj actively does is a Task. Its kinds:
- **Drafting** — produce the text.
- **Review** — perform a human-judgment evaluation of the text (see **Review**).
- **Revision** — change the text/project to satisfy issues a **Check** or **Review** raised (see **Revision**).
_Avoid_: step (colloquial only), to-do, action.

**Check**:
An **automated** evaluation run against the text — catalog/basic checks, spelling, and AI checks. _Automated in **how** it is performed_, even when a human triggers the run. A Check is **not** a unit of human work; it is a **source of demand** — when it surfaces **issues**, the work to clear them is a **Revision** task. It **passes** when no issues remain. In a given stage a check is **required** (gates that stage) or **notify-only** (advisory there).
_Avoid_: using "check" for human-judgment work (that is a **Review**); validation, test, rule.

**Review**:
A human-judgment evaluation of the text by a person — exegetical, naturalness, comprehension, consultant, community. (PT9 called these "checks"; we deliberately call them **reviews**.) A Review is a **Task**: a person performs it and **asserts** it done, and progress **stalls** until they do. The reviewer leaves **Notes**; each open note is surfaced as an **Issue** by the automated **unresolved-notes** check and cleared by **Revision**. Reviews **ratchet forward** — once asserted done, a later edit does not auto-reopen them (verified in PT9). _[Open design decision: is a Review complete on the reviewer's **assertion alone** — PT9 keeps the manual-task checkbox **separate** from the unresolved-notes check — or do we **unify** so a Review isn't "done" until all its notes are resolved? Being decided.]_ The "review" rename is a deliberate, outward-facing shift — see `docs/reports/2026-06-23-check-terminology-overloading.md`.
_Avoid_: "manual check", "consultant check", "community check"; "reviewer" as a synonym for the activity.

**Note**:
What a reviewer records on the text during a **Review** (PT9: a _project note_; paranext-core: the **unresolved-notes** check group — `notes.consultant`, `notes.translator`, `notes.spelling-discussion`, `notes.rendering-discussion`). Each **open** note is surfaced as an **Issue** by the unresolved-notes check; **Revision** resolves it.
_Avoid_: comment (an internal code class only; the user-facing word is **note**).

**Revision**:
The **Task** of changing the text or project to satisfy the issues a **Check** or a **Review** raised. Typical flow: the team **drafts** → a teammate **reviews** → a reviser **revises** to satisfy that review; the text is also **checked** automatically, and **revisions** clear those issues too.
_Avoid_: fix, correction, generic "edit".

**Issue**:
A problem that must be resolved, surfaced by a **Check**. It comes from the **text** (e.g. a punctuation violation) or from an **open Note** left during a **Review** (via the unresolved-notes check). An issue can **reopen** when later edits change the text.
_Avoid_: error, flag, warning.

**Pass**:
A **Check**'s satisfied state — evaluated by the engine with **no open issues**. A check result is **content-addressed** (tied to the text it ran against), so editing the text can make a prior pass go **stale** and reopen. _[completion wording — a check **passes**; a **Review** is **satisfied** — being grilled.]_

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
The grouping of **Team**-assigned steps the team does collaboratively, such as in a team meeting. Parked from Solo work until team-meeting time; never recommended as the individual Current Step. (First-class distinction grounded in observed behavior — teams used PT9's "(Team)" label to mean "save for the meeting.")
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

- **"step" vs "task"/"check" — RESOLVED (2026-06-23): Task is the spine; "step" is colloquial only.** Everything a person does is a **Task** (kinds: Drafting / Review / Revision); **Step** is no longer a modeled umbrella. Ground truth: PT9's `ProjectProgress` subsystem uses Stage/Task/Check with **zero** uses of "step", and the plan data is `PlanStage`/`PlanTask` (+ a `checks` catalog) — no "step".
- **Check vs Review — RESOLVED (2026-06-23): "check" = automated only; human-judgment work = "review".** A **Check** is automated (catalog/basic, spelling, AI). A **Review** is human-judgment (exegetical, naturalness, comprehension, consultant, community). Both are **sources of demand**, satisfied by **Revision** tasks. This fixes a genuine PT9 overload — PT9 names human work "…check" (e.g. "Naturalness check", `<Type>ManualByChapter</Type>`) *and also* uses "review" for the same kind of work (e.g. "Naturalness review", "Review by the Community"). Adopting "review" uniformly is a deliberate, outward-facing shift (needs stakeholder buy-in) — see `docs/reports/2026-06-23-check-terminology-overloading.md`.
- **Open (being grilled):** whether a **Review** shares a **Check**'s full lifecycle (raises Issues → Revision clears → satisfied, content-addressed/stale on edit) or has a different shape; whether **Revision** is a *planned* task or *emergent*; the rename of **Current Step**; and the completion vocabulary (Check "passes" — does a Review?). Relationships/Dynamics/Current Step entries below still reflect the old Step model and will be reworked as these resolve.
- "grouping" — resolved: a grouping is a **Priority's** scripture selection, not a separate concept.
- chapter vs. grouping as the progression unit — resolved: the **Chapter** is the base unit. Because a Priority can slice into or across books, chapters must be independently trackable and cannot inherit a single stage from their book.
- "next-task workflow" vs. "next-step workflow" — resolved: internally **next-step workflow**; the external proposal/Google Doc keeps its original "Next-task workflow" title.
