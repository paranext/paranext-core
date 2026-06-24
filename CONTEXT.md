# Next-Step Workflow

The prototype context for "Saroj advances a chapter through the steps and stages of a project plan." This glossary fixes the language the prototype, the focus-group feedback, and the eventual epic all share. Scope: this Q3 2026 prototype only — not the whole platform.

## The Problem

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
The ordered set of **Stages** (and their **Tasks** and **Checks**) every chapter passes through.
_Avoid_: workflow (reserved for other purposes), process.

**Stage**:
A named phase a chapter, book, or Priority is in, composed of its **Tasks** and **Checks**. A chapter's (or book's, or Priority's) current stage is the earliest stage that still has unfinished work for it; it advances when all of that stage's tasks are done and its required checks pass.
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
An **automated** evaluation of the text — basic/catalog checks, spelling, AI checks; automated in *how* it runs, even when a human triggers it. Surfaces **Issues** and **passes** when none remain. In a stage it is **required** (gates it) or **notify-only**.
_Avoid_: using "check" for human-judgment work (that is a **Review**); validation, test, rule.

**Review**:
A **human-judgment** evaluation of the text by a person — exegetical, naturalness, comprehension, consultant, community. (PT9 called these "checks"; we use **review**.) A Review is a **Task** the reviewer performs and asserts done; the **Comments** it raises are cleared by **Revision** before the chapter advances. Ratchets forward.
_Avoid_: "manual check", "consultant/community check"; "reviewer" as a synonym for the activity.

**Comment**:
A reviewer's note on the text — **comment** in PT10 (PT9 called it a *note*). Each **open** comment is an **Issue** to clear by **Revision**.
_Avoid_: note (the PT9 term; PT10 uses **comment**).

**Revision**:
The **Task** of changing the text or project to clear the **Issues** a **Check** or **Review** raised — often done by someone other than the reviewer.
_Avoid_: fix, correction, generic "edit".

**Issue**:
Something to resolve, surfaced by a **Check** — from the **text** (e.g. punctuation) or from an **open Comment** in a **Review**. Can **reopen** when the text changes.
_Avoid_: error, flag, warning.

**Pass**:
A **Check**'s satisfied state — no open issues. Content-addressed, so editing the text can make a pass go **stale** and reopen.

**Current Task**:
The one **Task** the system surfaces as Saroj's focus — shown to the user colloquially as "your next step." Recommended by default (so there's always a "what's next"); Saroj can change it.
_Avoid_: "Current Step" / "active step" as the modeled name (the unit is a **Task**; "next step" is fine as user-facing copy).

**Teammate**:
Another user on the project with **Tasks** of their own. Saroj's work can block, or be blocked by, a teammate's.
_Avoid_: collaborator, colleague.

**Project administrator**:
The role that authors and configures a project's plan. Out of scope this quarter — the no-plan fallback points Saroj to *contact* them, and does not let him configure a plan himself.
_Avoid_: owner, manager.

**Assignment**:
The pairing of a **Task** (for given chapters) with who will do it: a specific person, **Multiple** people, **Anyone**, or the **Team**. A task can be assigned differently for different chapters.
_Avoid_: allocation.

**Anyone**:
The **Assignment** for a **Task** any project member may do **individually** — whoever's looking may claim it.

**Unassigned**:
An **Assignment** not yet determined. _(UXR question: should this behave the same as **Anyone**, or stay distinct?)_

**Solo**:
The grouping of **Tasks** a person does on their own time — assigned to them, to **Multiple** including them, or to **Anyone**. The **Current Task** is only ever recommended from Solo.

**Together**:
The grouping of **Team**-assigned **Tasks** the team does collaboratively (e.g. in a team meeting) rather than alone; never recommended as the individual Current Task. (Grounded in observed behavior — teams used PT9's "(Team)" label to mean "save for the meeting.")

## Relationships

- A **Project Plan** has one or more ordered **Stages**
- A **Stage** contains **Tasks** (Drafting / Review / Revision) and **Checks** (required or notify-only)
- A **Review** raises **Comments**; open Comments — and problems in the text — surface as **Issues** via **Checks**, cleared by **Revision**
- A **Chapter** is the base unit of progression: it advances through the **Stages** by completing each stage's Tasks and clearing its required Checks
- A Task or Check is satisfied per-chapter, per-book, or once per-project — a book-/project-level one is shared across the chapters it covers, so it can gate many at once
- A **Priority** orders which **Chapters** are worked next; absent any Priority, work proceeds book-by-book
- Saroj's **Current Task** is the recommended **Task** — overridable — surfaced persistently in the workspace
- A **Task** may be **assigned** to a user for specific chapters
- Saroj's unfinished task **blocks** a **Teammate** when it is the direct prerequisite of one assigned to that teammate; unblocking takes precedence in the **Current Task** recommendation

### Dynamics

- Asserting a **Task** **advances** the chapter; a **required Check** blocks the chapter from leaving its stage until it **passes**. (Within-stage blocking is a PT10 design behavior — PT9 advances on task completion alone; provisional, see ADR-0002.)
- **Forward ratchet:** once a chapter passes a stage, a later regression is *advisory* — unless a subsequent stage also requires that check.
- **Content-addressed:** editing text can make a passed check go **stale** and reopen.
- **Several Tasks/Checks can be available at once** — the plan is not strictly single-file. Each reads as *waiting*, *has issues* (a count), or *done*. The **Current Task** features one; the chapter view lists them all.
- **Together** tasks are worked collaboratively, never offered as the individual **Current Task**.

## Example dialogue

> **Dev:** "Saroj checks off the draft for Mark 2 — does the chapter move to the next stage?"
> **Domain expert:** "Only if it was the last thing in the stage, and only for Mark 2 — Mark 1 and Mark 3 are tracked separately. Drafting is a **Task**: he just asserts it. The next stage has an exegetical **Review** — a person performs it and leaves **Comments**; the chapter stalls until those comments are cleared by **Revision**."
> **Dev:** "And the spelling check?"
> **Domain expert:** "That's an automated **Check** — it **passes** when there are no **Issues**. If he edits Mark 2 later, a passed check can **reopen**."

## Flagged ambiguities

_The terminology calls below are settled in the glossary above; this records the reasoning a future reader would otherwise wonder about._

- **Task is the spine; "step" is colloquial; "check" = automated, "review" = human.** This fixes a real PT9 overload: PT9 names human work "…check" (e.g. "Naturalness check", `ManualByChapter`) *and also* "review" (e.g. "Naturalness review", "Review by the Community"). Adopting **review** uniformly — and **comment** for the PT9 "note" — is a deliberate, outward-facing shift needing stakeholder buy-in. Full evidence: `docs/reports/2026-06-23-check-terminology-overloading.md`.
- **A Review is a Task that raises Comments → Issues (via the automated unresolved-comments check) → Revision.** PT9 keeps the reviewer's assertion and the comments-check as separate gates; the prototype may present them as one "review." Reviews ratchet forward.
- **Open / flexible (UXR):** **Anyone** vs **Unassigned**; whether a **Revision** is a planned task or emergent.
- **grouping / progression unit:** a "grouping" is a **Priority's** scripture selection (not a separate concept). The base unit of progression is the **Chapter** (a Priority can slice across books, so chapters can't inherit a book's stage) — though "chapter" stands in for book or Priority where progression is tracked at that grain.
- "next-task workflow" vs. "next-step workflow" — resolved: internally **next-step workflow**; the external proposal/Google Doc keeps its original "Next-task workflow" title.
