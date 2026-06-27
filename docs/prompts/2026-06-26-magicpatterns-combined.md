# Magic Patterns — combined next-step prompt (single cohesive build)

The **canonical single-prompt build** for the Q3 next-step prototype. It builds a **baseline** Paratext 10 "Simple" app that has **no** next-step feature, then **adds** the next-step feature on top — expressing the **final (round-3) design** as one cohesive spec. It supersedes the earlier pair (the round-2 cold-start `2026-06-24-r2-c-magicpatterns.md` + the round-3 follow-up `2026-06-26-r3-magicpatterns-followup.md`), which evolved and contradicted each other; use **this** for a fresh Magic Patterns project. Paste the whole fenced block. For a richer hard-coded dataset you can also paste the companion `2026-06-24-r2-c-magicpatterns-sample-data.md`.

---

````text
Build a clean, modern, low-clutter prototype of a desktop Bible-translation app (Paratext 10 "Simple"). This is a design prototype only — fake all data, no backend, no persistence. Use a React + Tailwind + shadcn/ui aesthetic: lots of whitespace, soft borders, rounded corners, a quiet neutral palette with one restrained accent, friendly and uncluttered.

Build it in TWO PARTS: first a BASELINE app that has NO next-step feature, then ADD the next-step feature on top. The next-step feature is the real subject of this prototype; the baseline is the calm app it lives in.

## The persona (design for him)
Saroj is a professional Bible translator — excellent at his craft but NOT comfortable with complex software. Too many buttons, dense tables, or nested menus overwhelm him; he has accidentally closed a tab and lost his layout before. He wants to focus on the words, not the tool. So whenever two designs are possible, choose the SIMPLER one. Power-user task-management features are out of scope. Calm, minimal, obvious. The single question the feature must answer at a glance: "What do I do next on this chapter?"

## PART 1 — The baseline app (no next-step feature yet)
A calm single-window desktop layout:
- A top bar (chrome): the project name on the left ("Translation Project 1"); a Book/Chapter navigator showing the current location (e.g. "Philippians 2"); a quiet sync status ("Synced"); a "View" menu; and an avatar / profile menu in the top-right.
- The main area: a centered manuscript EDITOR showing the current chapter's scripture text — a few placeholder verses with verse numbers, clean and readable (it does not need to be editable). Optionally a slim reference-text pane beside it.
- That is the whole baseline: an editor you navigate by book/chapter. No tasks, no progress, no "what's next" anywhere yet.

## PART 2 — Add the next-step feature
Add ONE always-present control plus its expanded view. Keep it minimal and lean HARD on progressive disclosure — one small thing by default, detail only on demand.

### The focus item (always present, top-center)
- A single small "focus item" pinned to the TOP-CENTER of the top bar (make the top bar a bit taller to host it), always visible. It answers "what's next for THIS chapter" — scoped to the CURRENT CHAPTER ONLY. Never list every task across the whole book or Priority; repeating the same task across chapters overwhelms.
- Collapsed, it is a calm one-line summary of the next thing. Clicking it EXPANDS into a one-chapter focus panel (a WIDE, user-RESIZEABLE dialog) — this is the door into the chapter view, not a separate sidebar.
- The focus item DOUBLES AS THE BOOK/CHAPTER NAVIGATOR — merge the book/chapter control into it. One control, not two.

### The expanded one-chapter focus panel (wide + resizeable)
Opening the focus item shows, for the current chapter:
- Where the chapter sits in the plan ("Stage 2 of 6") and its current stage.
- The primary, COARSE action: a single "advance / mark stage done" — the main affordance. Advancing asserts the stage's work is done. Do NOT make Saroj click through individual tasks or issues to make progress.
- On demand (expandable, never required): the steps in this stage — tasks (with a kind badge) and checks (with their issue counts and a "Resolve" affordance) — plus the chapter's other in-chapter choices. Open check-issues are SHOWN but advisory; they do not block the coarse advance.

### Don't block on teammates' offline work
If the next thing depends on a teammate's task that hasn't synced yet, still let Saroj proceed to his next available action. Only show a calm "Waiting on <person>" when that teammate's data is genuinely required to continue — never force a sync just to unblock.

## Vocabulary (use these EXACT words in all UI copy — no synonyms)
- Stage — a named phase a chapter passes through (e.g. "Drafting"). A chapter is in the earliest stage that still has unfinished work.
- Task — a unit of work a person does and marks done. Kinds: Drafting (produce the text), Review (a person reads/judges the text and leaves comments), Revision (change the text to clear issues).
- Check — an AUTOMATED evaluation of the text (spelling, quotations, biblical terms, …). It "passes" (0 issues), "has issues" (a count), or is "stale" (the text changed since it last passed). NEVER call a Check a "Review".
- Review — a HUMAN-judgment evaluation done by a person. NEVER call a Review a "Check".
- Comment — a reviewer's note left during a Review (use the word "comment", never "note"). Each open comment is an Issue.
- Issue — something to resolve, surfaced by a Check or by an open Comment.
- Revision — the Task of clearing the Issues a Check or Review raised.
- "Your next step" / "what's next" — the warm, user-facing label for the one thing the focus item surfaces (recommended automatically; Saroj can change it).
- Chapter — the unit of progression; each advances through stages independently. (It can also be a whole book or a "Priority" — treat all three the same.)
- Priority — a named, ordered scripture selection that can cross books (e.g. "Birth Narrative" = Matthew 1–2 + Luke 1–2). Optional; without one, work goes book-by-book.
- Solo — tasks a person does on their own time (assigned to him, or to "Anyone"). The focus is only ever recommended from Solo.
- Together — Team-assigned tasks done collaboratively (e.g. in a meeting); NEVER the individually-recommended next step.
- Teammate — another person on the project with their own tasks; Saroj's unfinished work can block a teammate.

## Two demo toggles (put them OUT of the workspace — inside the avatar / settings menu, labeled as prototype controls, NOT product chrome)
These let a facilitator A/B two open questions:
- Focus granularity — "Stage" vs "Step". This is END TO END: it sets BOTH what the collapsed focus line shows AND the grain at which the next thing is picked/advanced. In Stage mode the focus is the chapter's current stage; in Step mode the focus is the single next step (a task, or a check → its issues). Display grain and pick grain must always match the toggle.
- Book/Chapter coupling — "Unified" vs "Pinned". Unified: changing book/chapter moves the focus to that chapter. Pinned: the focus stays on the chapter Saroj is working on; when he navigates elsewhere, reveal small affordances to jump back to the focus chapter, or to move the focus to the chapter he's now viewing. When the viewed and focus chapters match, keep it simple.

## The six things the prototype must let Saroj do
1. See the active chapter's current STAGE.
2. Degrade gracefully when a project has NO plan: a calm, inform-only zero state with two CTAs — "Learn the value of a project plan" and "Contact your project admin" — and never let him author a plan. The focus item then shows a quiet "No plan set".
3. See which steps remain for this chapter to reach the next stage (on demand in the panel).
4. Mark progress with a single COARSE "advance" (mark the stage done) — one moment, not click-by-click.
5. For a step that depends on a Check or Review passing, see what's required (the issue counts to clear, or the comments to resolve).
6. See a clear "reached the next stage" indication when a chapter's stage work is complete.

## Seed this fake data (hard-code it)
Two projects. Saroj is the signed-in user; Maria is a consultant teammate.
Project 1 — "Translation Project 1" with the plan "SIL Compact Base Plan", whose 6 stages in order are: Drafting → Team Review & Comprehension Review → Preparing for Consultant → Consultant Review → Community Review → Final Preparation for Publication.
Scope: the book of Philippians (4 chapters), plus a Priority "Birth Narrative" (Matthew 1–2 + Luke 1–2). Each chapter sits at its own stage:
- Philippians 2 — the focal chapter; load here by default. In "Team Review & Comprehension Review": an Exegetical review and a comprehension Review available; a co-translator Review with open Comments; a "Word list" Check with 12 issues; a "Quotations" Check passing (0 issues); a "Biblical terms" Check with 5 issues; plus a later step reading "Available after Consultant Review".
- Philippians 1 — advanced to Community Review; a Check that was passing went stale (reopened) after an edit — show it needing a re-run (the forward ratchet; advisory, not blocking).
- Philippians 3 — plain Drafting in progress.
- Philippians 4 — Drafting in progress; finishing it unblocks Maria's Consultant Review (show the positive "finishing this unblocks Maria" framing, never a hard block).
- Luke 1 (in "Birth Narrative") — just cleanly finished Drafting and crossed into "Team Review & Comprehension Review": show the "reached the next stage" indication here.
Project 2 — a second project with NO plan (for the no-plan fallback).

## Visual / interaction style
- Clean, modern, minimal shadcn/ui + Tailwind: generous spacing, subtle borders, gentle rounded corners, a restrained neutral palette with one quiet accent.
- Friendly to a low-tech user: large clear hit targets, plain language, no jargon beyond the vocabulary above, no dense tables, no overwhelming option panels.
- Small, legible status badges for state (waiting / has N issues / passing / stale / done).
- The focus item / "your next step" should feel reassuring and singular — never a to-do firehose.
- Make both demo toggles and the no-plan project reachable from the seeded UI so a reviewer can walk through all six capabilities.
````
