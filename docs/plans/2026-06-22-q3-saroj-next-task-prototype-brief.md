# Q3 2026 Prototype Brief — "Saroj advances a chapter through steps in project plan"

**Branch:** `prototype/2026-q3-advance-chapter-through-plan-steps`
**Distilled from:** Discord thread, 29 May – 22 Jun 2026 (Alex Mercado, Matt Toulmin, Ian Hewerdine, Megan Mercado)
**Status of this doc:** reflects the _latest_ agreed state of the thread, not the opening proposal. See [How the plan evolved](#how-the-plan-evolved-dont-trust-the-top-of-the-thread) for what changed.

> ⚠️ The thread evolves. The 29 May proposal at the top is partly superseded — vocabulary, focus-group framing, timeline, and prototype architecture all shifted in later messages. Trust this brief, then the most recent messages, over the opening post.

---

## What we're building

A **Simple**, prototype-only experience for the persona "Saroj" to **advance a chapter through the steps/stages of a project plan** — i.e. _Saroj knows what to do next_ for the chapter in front of him, marks a step done, and moves the chapter forward.

This is the headline epic the Board has committed to partners (per Escrow): _the translator knowing "what's next for this chapter" and advancing a chapter through steps of a project plan._ It is a legal commitment, not a nice-to-have.

**The one rule that overrides ties:** when choosing between a simpler and a more powerful design, **choose simpler**. Power task-management features will come later; this quarter must be Simple.

---

## Non-negotiables (the prototype spec)

These six are the agreed, in-focus requirements. They are what the prototype must let Saroj do. (Matt proposed them 7 Jun; Alex confirmed all six in focus 8 Jun.)

> Throughout, **chapter** is a fine-grain stand-in for the unit of progression — it can equally be a **book** or a **Priority**. Where a requirement says "chapter," read "the chapter, book, or Priority in view." (See [`CONTEXT.md`](../../CONTEXT.md).)

1. **View the active chapter's current stage** (as per the project plan).
2. **Fallback if no project plan is selected** (the experience must degrade gracefully).
3. **View which tasks remain** for this chapter to progress to the next stage.
4. **Mark a task done** for this chapter. _(The affordance — a literal checkbox or some other "mark done" control — is a design question; the capability is fixed.)_
5. **For a task that depends on a Check or Review passing,** Saroj can see what's required to earn the pass.
6. **See an indication when all of a stage's work is complete** and the chapter has reached the next stage.

---

## Scope

**In scope**

- Advancing a _chapter_ (or book, or Priority) through its tasks and stages — viewing current stage, what remains, marking progress, seeing completion.
- The six non-negotiables above.

**Out of scope (this quarter)**

- _Who_ sets the project plan, _how_, and _when_ — i.e. admin authoring/configuration of the plan. Deferred to a later roadmap point. We may _learn_ about it incidentally, but we are not designing it.
- General Simple usability as a systematic target (see Prototype approach). It comes along "for free" only incidentally.
- A 1:1 port of the PT9 project-plan / progress-tracking UI. We are proposing _new_ design, not reproducing PT9.

**Posture:** right-size the design to the team's limited implementation appetite. Don't design UI we have no appetite to build. If an activity or feature isn't pulling its weight, cut it.

---

## Data model & example data

**Short answer:** the _plan definition_ already exists as real, PT9-derived, reusable data — reuse it. The _progress layer_ (the thing Saroj advances — which chapter/book/Priority is at which stage, what's done, by whom) **also exists in PT9** at the model level (`ProjectProgress.xml`, `ReadOnlyProjectProgressInfo`, per-book/chapter task completion, `GetFirstIncompleteStageIndex`). What's missing is a **PT10 representation**: nothing is exposed over PAPI / from C# yet, and `project-plan-draft` models the _plan_ but not _progress_. So for the prototype we **synthesize PT10-shaped progress data** — not because the concept is new, but because PT10 doesn't surface PT9's yet.

> Note: this product is not Paratext 9 and isn't recreating it — but it consumes PT9 project-plan data and builds on PT9's progress model. The factory plans below _are_ that real PT9 data; the progress layer is that PT9 model **reinterpreted and enhanced** for PT10 (Priority ordering, assignment, Solo/Together, within-stage check-blocking).

### What already exists — reuse, don't reinvent

Not on `main`. It lives on three experimental branches: **`project-plan-draft`** (primary), `project-plan-draft2`, and `project-plan-redesign-1`.

On **`project-plan-draft`**:

- **Typed plan-definition model** — `lib/platform-bible-react/src/components/advanced/project-plan-dialog/types.ts`:
  - `ProjectPlan` → `PlanStage[]` → `PlanTask[]`
  - `PlanTask`: `markComplete: 'by-book' | 'by-chapter' | 'by-project'`, `taskStart` (ordering/dependency between tasks/stages), `requiresEditing: 'no' | 'scripture-text'`, `effort`, localized `names`/`descriptions`.
  - `CheckSetting { checkId, requiredInStage, notifyOnlyInStage }` + `CheckCatalogItem` / `CheckGroup` — this is the model for the **"pass" steps** (non-negotiable #5): a check that is _required in a stage_.
- **11 real PT9-derived factory plans** — `stories/advanced/project-plan-dialog/factory-plans.ts` (10,683 lines, auto-generated from PT9 `_StandardPlans` XMLs). Real org plans, not synthetic: BI Base Plan, Biblica, GILLBT, PBT, SIL (×4 incl. "SIL Compact Base Plan"), TSC, UBS Standard Translation, UBS Study Bible.
- **Handwritten sample/org plans** — `stories/advanced/project-plan-dialog/sample-data.ts`: ETEN Quickstart, Acme, plus `EMPTY_PROJECT_PLAN` (covers NN #2 no-plan fallback) and `CUSTOM_PROJECT_PLAN`.
- **Full UI implementations + Storybook** for several design variants (hierarchical, ER-UI, checks-merged). `project-plan-redesign-1` renames this to `project-plan-editor` with a richer task-availability enum (`WhenStageIsComplete`, `WhenStageIsCompleteByChapter`, …) and its own `mock-data.ts`. **Caveat:** these are plan-_authoring_ UIs — i.e. the "who sets the plan" work that is **out of scope** this quarter. Reuse them as reference and for their data/types, not as the thing we're prototyping.

### What PT10 doesn't surface yet — we synthesize it

The progress _concept and data_ exist in PT9; what's absent is any **PT10/paranext-core** representation. So we synthesize it for the prototype:

- **A PT10 progress model + example data**: which chapter/book/Priority is at which stage, which tasks are done (by whom/when), which checks/reviews are outstanding. PT9 has this; paranext-core has no model and no example data for it — not on `main`, not on the draft branches (they model the _plan_, not _progress_).
- **No backend / PAPI exposure.** C# can reach `Paratext.Data` but does not read `ProjectProgress.xml` and exposes no plan/stage/task/progress over PAPI; `ChangeBooksInProjectPlan` is explicitly deferred. The PT9 `_StandardPlans` XMLs are **not** committed. (`c-sharp/ParatextUtils/ProgressUtilsRunImmediately.cs` on the draft branches is unrelated — a UI-threading helper, not plan progress.)
- **PT10 enhancements** with no PT9 equivalent: Priority ordering, assignment, the Solo/Together split.

### How the existing model maps to the non-negotiables

The progress behind every NN below **already exists in PT9**. The third column asks only what **PT10 must newly represent or synthesize** — since PT9's progress isn't exposed to paranext-core yet — _not_ whether the concept is missing.

| NN                               | Covered by existing plan-def model?            | Needs new PT10 representation?                     |
| -------------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| 1 — current stage                | stages exist                                   | **yes** — unit→stage pointer (synthesized)        |
| 2 — fallback if no plan          | `EMPTY_PROJECT_PLAN`                           | no                                                |
| 3 — tasks remaining              | ordered tasks via `taskStart`                  | **yes** — need completions to compute "remaining" |
| 4 — mark a task done             | `markComplete:'by-chapter'` tasks              | **yes** — record completion                       |
| 5 — task that must earn a "pass" | `CheckSetting.requiredInStage` + check catalog | partial — surface "what's required to pass"       |
| 6 — all complete → next stage    | derivable                                      | **yes** — needs the synthesized progress          |

### Recommendation

1. **Reuse** `types.ts` + the factory/sample plans from `project-plan-draft` as the plan-definition substrate. Don't re-author plans.
2. **Author one small PT10 progress model**, shaped to PT9's (a unit→stage pointer + task completions + outstanding checks/reviews) — the main thing we synthesize. Something like `Progress { unit /* chapter | book | priority */, currentStageId, completedTaskIds, openChecks }`.
3. **Synthesize realistic example progress**: pick one real factory plan (e.g. _SIL Compact Base Plan_) + a short NT book, and seed a few chapters at different stages so the prototype demonstrates a believable "what's next."
4. **Mind the `markComplete` granularity**: only `by-chapter` tasks are per-chapter. `by-book` / `by-project` tasks (e.g. "Complete translation brief") complete once at a coarser level — decide how (or whether) they surface in a chapter-centric "what's next" view.

---

## Design principles

- **Design for the gap.** _Designees give us the expected process; Sarojes give us the actual one. Design for the gap._ What partners say they do ≠ what translators actually do.
- **Watch, don't (only) ask.** People are poor at describing their own workflow in the abstract or predicting what they'd use. We weigh observation of real behavior and walk-throughs of past scenarios over stated preference. ([NN/g: first rule of usability](https://www.nngroup.com/articles/first-rule-of-usability-dont-listen-to-users/))
- **New design, not a PT9 comparison.** Most partners/users don't use the PT9 project plan, and a _small minority_ uses PT9 progress tracking consistently — that under-use is precisely the problem we're solving. Don't frame the prototype as "PT9 vs PT10." For teams that _do_ know PT9, we can map which PT9 features this corresponds to, but that mapping is not the focus.
- **De-risk decisions at the cheapest point.** Each research activity exists to retire a specific assumption before it gets expensive (catch it in a conversation or observation, not after we've built it).
- **Harmonize with the PT9 data model when possible.** PT9 already models plans and progress; shape the synthesized PT10 layer to it (units, stages, task completion, checks) rather than inventing a parallel structure. Diverge deliberately and only where PT10 needs it — and say so (see the ADRs).

---

## Prototype approach

- **Three parallel vehicles** — Storybook (`TenSimpleView`), an in-app unwired surface, and Magic Patterns; see [ADR-0001](../adr/0001-prototype-vehicle-storybook-in-repo.md). Spanning standalone-blue-sky → close-to-the-app lets us compare how each portrays the design and which best de-risks the epic. None wires up PAPI/C# this quarter; data is faked.
- **Fidelity ramps up.** Start with **rough mockups** (fast, low investment, directional) and converge toward higher fidelity over the quarter.
- **"Epic-candidate" prototype** introduced **mid-quarter (~7 Jul)** — the version close enough to what engineering might actually build that exercising it de-risks the epic.
- **Usability testing is non-blocking.** It runs in the ongoing-observation swimlane against the epic-candidate prototype; its learnings _can_ feed the focus-group share-back, but that's discretionary. This round tests **only** "Saroj advances a chapter," not general Simple usability (defer that to ~August, against the real implementation).

---

## Key dates (the constraints that bound this work)

| Date                | Milestone                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **before 21 Jun**   | Focus-group invitations out to designees (rolling sign-ups)                                                       |
| **22–26 Jun**       | Mockups available for **internal team review** (≤ 1 week before focus groups)                                     |
| **29 Jun – 24 Jul** | **Focus groups** (4 weeks — spread out for margin, late sign-ups, continuous synthesis, prototype convergence)    |
| **~7 Jul**          | "Epic-candidate" prototype introduced                                                                             |
| **29 Jul**          | **PRD ready to be shaped**                                                                                        |
| **11 Aug**          | **Epic development begins** (engineers start "Saroj moves his chapter through the project-plan steps and stages") |
| ~Aug                | Defer general Simple usability testing against the real app to here                                               |

Everything upstream is driven by the **11 Aug** engineering start and the **29 Jul** PRD deadline.

---

## Focus groups — framing (so we don't re-litigate it)

- Focus groups are a **legal commitment to funders/partners**, with irreversible consequences if skipped. The non-cuttable core is: _present our design of these specific features to partner designees and get their input._
- **Designees choose WHO.** Partner orgs nominate their designees — we don't recruit by team profile, so "do we have enough teams that use PT9 project plan?" is the wrong worry. The right worry is "have we invited the partner designees?"
- **We choose WHAT/WHICH** features to put in front of them.
- Vocabulary: where the original proposal said **"stakeholders,"** read **"designees."**
- Familiarity with the PT9 project plan is _not_ a sampling requirement — at most it rounds out the sample for direct observation.

---

## Open questions / watch-outs

- **Checkbox vs. other "mark done" affordance** (non-negotiable #4) is deliberately unresolved — a design question for the mockups.
- **Ownership / the "catch":** UX (Alex) relocates internationally mid-quarter. The timeline only holds if Product co-owns the stakeholder/designee-facing rounds (originally framed as Rounds 1b and 3). Megan is running observations/interviews and piloting scheduling tooling.
- **Roadmap drift:** adjacent epics moved (e.g. _Saroj's workspace is stable and uncluttered_ → 14 Jul; _Saroj navigates all the Simple functionality smoothly and intuitively_ → 28 Jul). Re-confirm dates against the live roadmap before committing.

---

## Glossary

- **Saroj** — the persona: a translator using PT10 Simple who needs to know what to do next on a chapter.
- **Designee** — the person a partner organization nominates for focus groups. (= "stakeholder" in the original proposal.)
- **Simple vs. Power** — PT10 Simple is the minimal, opinionated experience; Power features (richer task management) are a later, separate track.
- **Project plan** — the ordered set of stages/steps a chapter passes through. **Progress tracking** — recording that those steps are done; the belief driving this work is that PT9 progress tracking is _not_ used consistently by most teams.

---

## How the plan evolved (don't trust the top of the thread)

What changed from the 29 May proposal to the latest messages:

| Topic                  | Original (29 May)                         | Current                                                            |
| ---------------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| Terminology            | "stakeholders"                            | **"designees"** (partner-nominated)                                |
| Focus-group purpose    | framed as part of UX research rounds      | **legal partner commitment**; designees choose WHO, we choose WHAT |
| Focus-group length     | 2–3 weeks                                 | **4 weeks (29 Jun – 24 Jul)**                                      |
| PT9 project-plan teams | wanted teams familiar with PT9 plan       | **not a requirement**; sever the PT9 mental-model link             |
| Anchor deadline        | R3 share-back before 25 Aug expanded beta | **PRD 29 Jul / dev starts 11 Aug**                                 |
| Invitations            | (Matt suggested 17 Jun)                   | agreed **before 21 Jun**                                           |
| Prototype architecture | "AI-based" usability prototype            | **standalone, separate from the app**                              |

### Sources

- [Q3 2026 Research Proposal · Next-task workflow (Google Doc)](https://docs.google.com/document/d/1KqiL897H9cGyxJrhSJIEfdk5Dnxi_YeLKy6vqkFW_5w/edit?usp=sharing)
- [Asana timeline](https://app.asana.com/1/1204589679983904/project/1215638939727660/timeline/1215638809256027) (access via Ian)
- Project-plan usage BI (474 users, 2024) — Power BI dashboard linked in thread (Ian, 9 Jun)
