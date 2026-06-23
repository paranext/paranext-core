# The overloaded word "check"

**To:** Product Management & Stakeholders
**From:** Alex Mercado
**Date:** 2026-06-23
**Re:** "Check" means two unrelated things in Paratext — a vocabulary decision before the PT10 next-step epic

---

## 1. Executive summary

In Paratext, the single word **"check"** is used for two fundamentally different things: (a) an **automated evaluation** the software runs against the text (punctuation, quotations, chapter/verse, capitalization, spelling, …), and (b) a **manual, human-judgment process** a person performs (exegetical, comprehension, naturalness, consultant, community). These behave differently — one is a button the computer executes, the other is weeks of human work — yet they share a word. The clearest proof sits inside a single shipped plan file, where the *same activity* is labeled **"Naturalness check"** in one stage and **"Naturalness review"** in another.

This overload quietly taxes design, focus-group research, documentation, and the upcoming PT10 next-step epic, where the data model has *already* split the two concepts apart while the user-facing words have not. **Recommendation:** reserve **"check"** for automated evaluations, adopt **"review"** for human-judgment evaluations, and introduce **"revision"** for the editing work that follows — a deliberate, communicated vocabulary shift, not a silent rename.

---

## 2. The two senses of "check"

| | Sense A — automated check | Sense B — manual "check" |
|---|---|---|
| **What it is** | A rule the software runs against the text | A judgment task a person carries out |
| **Examples** | Punctuation, Quotation, Chapter/verse, Capitalization, Numbers, Matched pairs, Spelling | Exegetical, Comprehension, Naturalness, Consultant, Community |
| **Who/what does it** | The computer (may be manually triggered, but automated in *how* it runs) | A human translator, consultant, or community |
| **Output** | A list of flagged issues to resolve | An expert/community opinion, often notes and conversation |
| **Duration** | Seconds | Days to weeks |
| **Code model (PT9)** | `Check` objects (`CheckType` enum) | `Task` objects (`ManualBy*` types) — *not* `Check` objects |

The two are not variations on a theme; they live in different classes in the code (Section 4) and the model treats them as different kinds of thing. Only the **word** unites them.

---

## 3. The smoking gun: "Naturalness check" vs "Naturalness review" in one file

Inside the shipped **SIL Base Plan - Rev 1.34**, the same human activity is named two different ways:

- **"Naturalness check"** — `SIL Base Plan - Rev 1.34.xml:333`, structurally a `<Type>ManualByChapter</Type>` task (`:326` Type line, `:333` English name).
- **"Naturalness review"** — `SIL Base Plan - Rev 1.34.xml:1121`, *also* a `<Type>ManualByChapter</Type>` task (`:1114` Type line, `:1121` English name): *"The community does a naturalness review of the text…"*

Same structural type. Same family of activity. Two different words — **"check"** and **"review"** — in the same file. There is no behavioral difference to justify the different word; it is an accident of authoring. This is the overload made visible.

The same plan keeps drifting between the two words for community-tier work:

- **"Community review of Biblical key terms"** — `SIL Base Plan - Rev 1.34.xml:1186` (`ManualByChapter`, Type at `:1176`).
- Stage named **"Review by the Community"** — `SILP Base Plan - Rev 1.7.xml:1277` (the `<Names>` of the Stage opened at `:1162`).
- Meanwhile manual *consultant* work uses "check": **"Consultant Check"** (`SIL Base Plan - Rev 1.34.xml:1098`), **"Consultant check - final items"** (`:1680`).

So in one product, community work is sometimes a "review" and sometimes a "check," and consultant work is a "check" — with nothing in the data distinguishing them.

---

## 4. Evidence

### 4a. PT9 code model — `Check` and `Task` are different classes

The legacy Paratext (PT9, C# at `~/Developer/Paratext`) draws the line in the type system:

- A **Stage** holds *separate* lists — `List<Task> Tasks` and `List<Check> Checks` (plus `OptionalChecks`), exposed jointly as `TasksAndChecks`:
  `ParatextData/ProjectProgress/Stage.cs:40` (`Tasks`), `:44` (`Checks`), `:63` (`OptionalChecks`), `:47` (`TasksAndChecks`).
- A **Check** is its own sealed class: `public sealed class Check : TaskBase` — `ParatextData/ProjectProgress/Check.cs:14`.
- Both inherit `TaskBase` — `ParatextData/ProjectProgress/TaskBase.cs:15`.
- The `TaskType` enum (`TaskBase.cs:418`) lumps **automated** types (`BasicCheck` `:421`, `SpellCheckUnknown` `:425`, `SpellCheckIncorrect` `:427`, `NoteCheck` `:435`, `PassageCheck` `:447`, …) together with **manual** types (`ManualByBook` `:449`, `ManualByChapter` `:451`, `ManualByProject` `:453`). The code itself separates them with `IsManual()` (`TaskBase.cs:534`), and `Stage.AddTask` asserts the type *is* manual (`Stage.cs:280`) while `Stage.AddCheck` asserts it is *not* (`Stage.cs:292`).
- The **automated** check catalog is a distinct enum, `CheckType` — `ParatextData/Checking/CheckType.cs:13`. Its members are unmistakably software rules: `ChapterVerse` (`:17`), `MatchedPairs` (`:20`), `Numbers` (`:21`), `Quotation` (`:22`), `Punctuation` (`:23`), `Capitalization` (`:24`), and more (`:15`–`:33`).

So the code *already* knows the two senses are different things. The word "check" is what blurs them — including in method and field names that mix manual concepts ("`NoteCheck`", "`NotesAssignedToMeCheck`") with automated ones.

### 4b. PT9 plan strings — the overload reaches the user

The drift in Section 3 is not hypothetical; it is in shipped plan data that users read every day. Within the ProjectProgress subsystem the three structural words appear at roughly these case-insensitive frequencies (`grep -rioE` over `ParatextData/ProjectProgress/`):

| Term | Occurrences | Notes |
|---|---|---|
| `task` | 953 | structural |
| `stage` | 915 | structural |
| `check` | 416 | structural **and** as a manual-task label |
| `step` | **0** | not a domain term at all |

"Check" is heavily used and, unlike "stage" and "task," does double duty — sometimes the automated `Check` class, sometimes a word inside a manual task's name/description.

### 4c. PT10 draft data — the model split the concepts, the words didn't follow

The PT10 project-plan draft (paranext-core, ref `origin/project-plan-draft`, commit `f199954631`) re-models plans in TypeScript and **already separates** the two senses structurally:

- The model defines `PlanStage` (`…/project-plan-dialog/types.ts:39`) and `PlanTask` (`types.ts:26`) for human work, and a *separate* check apparatus: `CheckSetting { checkId; notifyOnlyInStage?; requiredInStage? }` (`types.ts:50`–`:53`) and `CheckCatalogItem { id; name; group }` (`types.ts:85`).
- The check catalog is a **catalog of automated checks only**. Its groups, `CheckGroupId` (`types.ts:91`–`:96`), are exactly: `'basic-checks' | 'spelling' | 'unresolved-notes' | 'other' | 'back-translation'`. The actual catalog (`…/project-plan-dialog/checks-tab.component.tsx:21`, `CHECK_GROUPS`) lists only software rules — Markers, Punctuation, Capitalization, Quotations, Numbers, References, Chapter/verse numbers, etc. (`checks-tab.component.tsx:26`–`:37`). None of "naturalness / exegetical / comprehension / community" appears in the catalog.
- The **manual checks are modeled as `PlanTask`s, not catalog checks.** In the factory plan data (`…/stories/advanced/project-plan-dialog/factory-plans.ts`), "Exegetical check" is a `PlanTask` (`factory-plans.ts:214` name, with `PlanTask` fields `markComplete` `:219`, `requiresEditing` `:221`, `effort` `:222`), and "Consultant check" is a `PlanStage` whose children are tasks (`factory-plans.ts:522`).

Word frequency on that ref, across the 24 files matching `*project-plan*` (`git grep -ioE … -- '*project-plan*'`):

| Term | Occurrences | Notes |
|---|---|---|
| `task` | 1727 | structural |
| `stage` | 1249 | structural |
| `check` | 951 | structural (catalog) **and** manual-task labels |
| `step` | **2** | incidental prose only — see below |

The only two "step" hits are ordinary English inside PT9-derived description strings, **not** structural terms:

- `factory-plans.ts:3198` — *"…This is a critical **step** to complete before making the text available to the consultant."*
- `factory-plans.ts:5656` — *"…for use in the drafting of the text in the next **step**."*

**The key alignment fact:** the data already says automated = "check" (catalog) and manual = task/stage. The words on screen have not caught up — manual `PlanTask`s are still *named* "Exegetical check," "Naturalness check," "Consultant check." The model is ready for disambiguation; the vocabulary is the lagging piece.

---

## 5. Why the overload is costly

1. **Design ambiguity.** When a spec or UI says "checks," engineers and designers must guess: the catalog of automated rules, or the human consultant process? The two need different UI, different completion semantics (a button vs. weeks of assignments), and different permissions. PT9's own code carries the cost as branching on `IsManual()` and parallel `AddTask`/`AddCheck` paths (Section 4a).
2. **Focus-group miscommunication.** Ask a translation team "how do your checks go?" and one person answers about punctuation runs while another answers about the consultant visit. The research signal is contaminated before analysis begins.
3. **Documentation drift.** The same plan file already disagrees with itself ("Naturalness check" vs "Naturalness review," Section 3). Help text, training, and localized strings inherit and multiply that inconsistency across languages (the line-333 task ships French/Spanish/Portuguese/Chinese translations of "check").
4. **Epic risk (PT10 next-step).** The next-step epic must tell a user *what to do next*. "Run a check" and "do a consultant review" are different instructions with different effort, owners, and durations. If the word doesn't distinguish them, the feature can't either — and the data model (Section 4c) is already ahead of the words, so we will keep translating between "catalog check" and "task named *check*" in code and copy indefinitely.

---

## 6. Recommendation: a disambiguated taxonomy

| Term | Meaning | Replaces / absorbs | Why |
|---|---|---|---|
| **Check** | An **automated evaluation** the software runs against the text — the catalog of basic checks plus AI checks. *Automated in HOW it runs, even if a human triggers it.* | PT9 `Check`/`CheckType`; PT10 `CheckCatalogItem` | Matches the existing data model (Section 4a, 4c); the catalog is already automated-only. |
| **Review** | A **human-judgment evaluation** — a person forms an opinion about the text. | "check" when it means exegetical / comprehension / naturalness / consultant / community | Already in use ("Naturalness review," "Review by the Community"); just made consistent. |
| **Revision** | The **work of changing the text or project** to satisfy issues a check raised or demands a review made. | the editing follow-on currently folded into "checking" | Names the distinct activity of *fixing*, separate from *evaluating*. |
| **Task** | Umbrella for **human work** of any kind — drafting, review, revision. | PT9 `Task` / `ManualBy*` | Keeps the existing structural word for human work; reviews and revisions are kinds of tasks. |
| **"Step"** | **Not a domain term.** Colloquial only. | — | 0 uses in PT9 (Section 4b); only incidental prose in PT10 (Section 4c). Do not promote it to a structural term. |

In one sentence: **a *check* is run by the software; a *review* is performed by a person; a *revision* is the editing that follows; both reviews and revisions are kinds of *task*.**

---

## 7. Impact & risk — this is an outward-facing vocabulary shift

This is **not** a cosmetic rename. Changing "community check" → "community review," and relabeling the manual exegetical/naturalness/consultant tasks away from "check," changes user-facing language across the product and out to the translation community — people who have used "check" for human work for years, in many languages (the line-333 task alone ships five locales). It must not be taken lightly and needs explicit stakeholder buy-in before any string changes.

Recommended guardrails:

1. **Decide the taxonomy first** (this document), then change strings — never the reverse.
2. **Stage the rollout.** Apply the new vocabulary to *new* PT10 surfaces (the next-step epic, the project-plan dialog) before retrofitting PT9-era plan strings, so the model and the words align where we are building fresh (Section 4c).
3. **Localization plan.** Every renamed string is re-translated, not just re-keyed; budget translator time and review for each affected locale.
4. **Community communication.** A short note to plan authors and consultants explaining "check vs. review vs. revision" — framed as *clarification of a long-standing ambiguity*, with the "Naturalness check"/"Naturalness review" example as the motivating story.
5. **Migration for existing plans.** Existing plan files keep working; decide whether to leave legacy labels as-is, offer an opt-in relabel, or normalize on next save. This is a product decision, flagged here as open.

---

## 8. Appendix — provenance table

PT9 = C# at `~/Developer/Paratext`. PT10 = paranext-core, ref `origin/project-plan-draft` @ `f199954631`. Plan XML under `~/Developer/Paratext/My Paratext Projects/_StandardPlans/`.

| # | Claim | Provenance | Value |
|---|---|---|---|
| 1 | Stage holds separate `Tasks` and `Checks` | PT9 `ParatextData/ProjectProgress/Stage.cs:40,44` | — |
| 2 | `OptionalChecks` + `TasksAndChecks` | PT9 `Stage.cs:63,47` | — |
| 3 | `Check` is its own class extending `TaskBase` | PT9 `ParatextData/ProjectProgress/Check.cs:14` | `Check : TaskBase` |
| 4 | `TaskBase` base class | PT9 `ParatextData/ProjectProgress/TaskBase.cs:15` | — |
| 5 | `TaskType` enum mixes automated + manual | PT9 `TaskBase.cs:418`; manual at `:449,451,453`; automated at `:421,425,427,435,447` | — |
| 6 | `IsManual()` separates the two | PT9 `TaskBase.cs:534` | — |
| 7 | `AddTask`/`AddCheck` assert opposite halves | PT9 `Stage.cs:280` (manual), `:292` (not manual) | — |
| 8 | `CheckType` enum = automated checks | PT9 `ParatextData/Checking/CheckType.cs:13`; members `:15`–`:33` | Punctuation, Quotation, ChapterVerse, Capitalization, Numbers, MatchedPairs, … |
| 9 | **"Naturalness check"** is a `ManualByChapter` task | PT9 `SIL Base Plan - Rev 1.34.xml:333` (name), `:326` (Type) | `ManualByChapter` |
| 10 | **"Naturalness review"** is *also* `ManualByChapter` | PT9 `SIL Base Plan - Rev 1.34.xml:1121` (name), `:1114` (Type) | `ManualByChapter` |
| 11 | "Community review of Biblical key terms" | PT9 `SIL Base Plan - Rev 1.34.xml:1186` (name), `:1176` (Type) | `ManualByChapter` |
| 12 | Stage "Review by the Community" | PT9 `SILP Base Plan - Rev 1.7.xml:1277` (Stage `<Names>`; Stage opens `:1162`) | stage name |
| 13 | "Consultant Check" / "Consultant check - final items" | PT9 `SIL Base Plan - Rev 1.34.xml:1098,1680` | manual labels |
| 14 | PT9 ProjectProgress frequency | `grep -rioE` over `ParatextData/ProjectProgress/` | task=953, stage=915, check=416, **step=0** |
| 15 | PT10 model: `PlanStage`, `PlanTask`, `CheckSetting`, `CheckCatalogItem` | PT10 `…/project-plan-dialog/types.ts:39,26,50,85` | — |
| 16 | PT10 `CheckSetting` fields | PT10 `types.ts:51,52,53` | `checkId`, `notifyOnlyInStage?`, `requiredInStage?` |
| 17 | PT10 `CheckGroupId` union (note: 5 values, incl. `'other'`) | PT10 `types.ts:91`–`:96` | `basic-checks \| spelling \| unresolved-notes \| other \| back-translation` |
| 18 | PT10 catalog = automated checks only | PT10 `…/project-plan-dialog/checks-tab.component.tsx:21` (`CHECK_GROUPS`), members `:26`–`:37` | — |
| 19 | PT10 manual checks modeled as `PlanTask`/`PlanStage` | PT10 `…/stories/advanced/project-plan-dialog/factory-plans.ts:214` ("Exegetical check" PlanTask), `:522` ("Consultant check" PlanStage) | — |
| 20 | PT10 `*project-plan*` frequency (24 files) | `git grep -ioE … -- '*project-plan*'` on `origin/project-plan-draft` | task=1727, stage=1249, check=951, **step=2** |
| 21 | PT10 "step" = incidental prose only | PT10 `factory-plans.ts:3198,5656` | "a critical step", "the next step" |

*Note on numbers:* PT10 counts here are the verified values for ref `f199954631` (24 files matching `*project-plan*`); they supersede earlier rough estimates of stage≈788 / task≈1505 / check≈884. PT9 frequencies are case-insensitive substring counts within `ParatextData/ProjectProgress/`.
