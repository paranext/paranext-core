# Vehicle C — Magic Patterns prompt (copy-paste)

This is the ready-to-paste prompt for [magicpatterns.com](https://www.magicpatterns.com). It is deliberately self-contained — Magic Patterns cannot read our repo, components, or docs, so the design is restated in full prose below. Paste everything inside the fenced block.

> **Companion seed data:** paste the companion seed dataset ([`2026-06-24-r2-c-magicpatterns-sample-data.md`](./2026-06-24-r2-c-magicpatterns-sample-data.md)) alongside this prompt — Magic Patterns can't read the repo, so the hard-coded fixture has to be supplied inline.
>
> **Display relabel (UX fix B1):** the two human-judgment stages use **Review** vocabulary — "Team Review & Comprehension Review" and "Consultant Review" — a thin display-name relabel over the real plan ids (structure unchanged; not a re-authoring). Automated Checks stay **Check**.

---

````text
Build a clean, modern, low-clutter prototype UI for a desktop Bible-translation app. This is a design prototype only — fake all data, no backend, no real persistence. Use a React + Tailwind, shadcn/ui aesthetic: lots of whitespace, soft borders, rounded corners, a quiet neutral palette, friendly and uncluttered. Optimize for ONE persona and ONE question.

## The persona (design for him)

Saroj is a professional Bible translator who is excellent at his craft but does NOT like complex software. Too many buttons, dense tables, or nested menus overwhelm him and make him feel the software is fighting him. He has accidentally closed the wrong tab and lost his layout before. He wants to focus on the words, not the tool. So: when two designs are possible, always choose the SIMPLER one. Power-user task-management features are explicitly out of scope. Calm, minimal, obvious.

The single question this UI must answer at a glance: "What do I do next on this chapter?"

## Vocabulary (use these exact words in all UI copy — do not invent synonyms)

- **Stage** — a named phase a chapter passes through (e.g. "Drafting"). A chapter is in the earliest stage that still has unfinished work.
- **Task** — a unit of work a person does and marks complete. Three kinds:
  - **Drafting** — produce the text.
  - **Review** — a human-judgment evaluation of the text (a person reads it and leaves notes).
  - **Revision** — change the text to clear problems a Check or Review raised.
- **Check** — an AUTOMATED evaluation of the text (spelling, quotations, biblical terms, etc.). It "passes" when it has zero Issues, shows a count when it "has issues", or is "stale" when the text changed after it last passed and it needs re-running. Never call a Check a "Review".
- **Review** — a HUMAN-judgment evaluation done by a person. Never call a Review a "Check".
- **Comment** — a reviewer's note left during a Review (use the word "comment", never "note"). Each open Comment is an Issue to clear.
- **Issue** — something to resolve, surfaced by a Check or by an open Comment.
- **Revision** — the Task of clearing the Issues a Check or Review raised.
- **Current Task** — the one Task the system surfaces as Saroj's focus. In user-facing copy, present it warmly as "your next step." It is recommended automatically but Saroj can change it.
- **Chapter** — the unit of progression; each chapter advances through stages independently. (It can also be a whole book or a "Priority" — treat all three the same way.)
- **Priority** — a named, ordered selection of scripture that can slice across books (e.g. "Birth Narrative" = Matthew 1–2 and Luke 1–2). Optional; without one, work goes book-by-book.
- **Solo** — Tasks a person does on their own time (assigned to him, or to "Anyone"). The Current Task is only ever recommended from Solo.
- **Together** — Team-assigned Tasks the team does collaboratively (e.g. in a meeting). NEVER recommended as the individual Current Task.
- **Anyone** — a Task any project member may claim and do individually.
- **Teammate** — another person on the project with their own Tasks. Saroj's unfinished work can block a teammate.

## What to build: TWO switchable variants of the SAME prototype

Build both of the following as variants the viewer can switch between. The variant switcher must live OUT of the main workspace — put it inside an avatar / settings dropdown in the top-right corner (label it something like "Prototype variant: Focus / Chapter"). It must NOT look like a real product feature or appear in the main toolbar.

### Variant A — PRIMARY: "One thing to focus on"
Philosophy: go where you're most needed.
- A persistent **Current Task indicator** that always lives in the global top toolbar, visible no matter what Saroj is doing. It shows ONE task framed as "Your next step", with the chapter it belongs to, the task kind, and its state (e.g. waiting / has 5 issues / ready to mark done). It is calm and singular — never a list.
- Clicking the indicator opens a deeper **chooser** dialog (see "The chooser" below) for picking which available task becomes the focus.
- The indicator follows the editor by default: when Saroj is viewing a different chapter, it re-recommends for that chapter.

### Variant B — SECONDARY: "The chapter's full picture"
Philosophy: here's everything about the chapter in front of you.
- A chapter-anchored panel docked to the right side of the editor (think of it as a column next to the manuscript). It shows ONE prominent next task at top, then an expandable "Remaining in this stage" list of the chapter's other current-stage tasks and checks below it.
- Each row reads as one of: waiting, has issues (with a count), or done.
- No persistent toolbar indicator in this variant — the panel IS the surface.

Both variants share the same fake editor: a faked single-chapter manuscript view in the center (a few verses of placeholder scripture text with verse numbers is enough — it does not need to be editable or real).

## The Current Task recommendation logic (how the "next step" is chosen)

Recommend exactly one task, in this precedence order:
0. **Unblock a teammate first.** If Saroj has an unfinished task that is the direct prerequisite of a task assigned to a teammate who is otherwise ready and waiting, recommend that one — even if it lives on a different chapter (Variant A may jump chapters for this; Variant B only elevates a task within the current chapter).
1. Otherwise, the **first available unfinished task in the chapter currently in view**.

Only ever recommend from **Solo** tasks — never from **Together** tasks.

## The chooser (opened from the Current Task indicator in Variant A)

A lean, simple dialog — do NOT build a dense data table. It is Saroj's calm "pick my focus" surface.
- Defaults to a "My Tasks" view: a short, scannable list of Saroj's available tasks for the active scope (the current book, or the current Priority with prev / next buttons to move between Priorities).
- Each row = the task + its chapter + its status. In "My Tasks" mode, do NOT show an assignee column (everything is Saroj's already). Include a small, unobtrusive "All Tasks" toggle that brings in the team picture.
- Split the list into two sections: **Solo** and **Together**.
- For tasks not yet available, phrase the status POSITIVELY and informatively as "Available after Drafting" (etc.) — never as "Blocked by Drafting".

## The no-plan fallback (must be reachable)

There is a second project that has no project plan. When Saroj is in it:
- The Current Task indicator (Variant A) shows a quiet "No plan set" instead of a task — calm, not alarming.
- The main area shows a friendly zero state with two call-to-action buttons: "Learn the value of a project plan" and "Contact your project admin". Do NOT let Saroj author or configure a plan himself — that is intentionally out of scope; he can only learn or reach out.

## The six things the prototype must let Saroj do (cover all of them)

1. See the active chapter's **current stage**.
2. Degrade gracefully when **no project plan** is selected (the fallback above).
3. See **which tasks remain** for this chapter to reach the next stage.
4. **Mark a task done** for this chapter (use a clear, simple "mark done" control — a checkbox or a button is fine).
5. For a task that depends on a **Check or Review passing**, see what's required to earn the pass (e.g. the count of Issues to clear, or the Comments to resolve).
6. See a clear indication when **all of a stage's work is complete and the chapter has reached the next stage**.

## Seed this exact fake data (hard-code it)

Two projects. Saroj is the signed-in user; his teammate is **Maria**, a consultant.

**Project 1 — "Philippians" (has a plan).**
Plan name: **SIL Compact Base Plan**, with these 6 stages in order:
1. Drafting
2. Team Review & Comprehension Review
3. Preparing for Consultant
4. Consultant Review
5. Community Review
6. Final Preparation for Publication

Scope: the book of **Philippians (4 chapters)**, worked book-by-book, PLUS a Priority named **"Birth Narrative"** (Matthew 1–2 and Luke 1–2) for the scope/Priority navigation. Each chapter sits at its own stage:

- **Philippians 1** — advanced all the way to **Community Review** (stage 5). It also has a Check that was passing but went **stale** (reopened) because the text was edited — show it as needing a re-run. Use this chapter for the **forward-ratchet + staleness** story (a stage already passed does not un-pass; the stale Check just needs a re-run). It does NOT demonstrate non-negotiable #6 — that lives on Luke 1 below.
- **Philippians 2** — the DENSE focal chapter (show off the full picture here). It currently has, all at once:
  - a **comprehension Review** that is available for Saroj to perform,
  - a co-translator **Review** that already has **Comments** on it (open Comments = Issues to clear by Revision),
  - a spelling **Check** with **12 Issues**,
  - a quotations **Check** that is **passing** (0 issues),
  - a biblical-terms **Check** with **5 Issues**,
  - and a later Task marked **"Available after Consultant Review"**.
- **Philippians 3** — plain **Drafting** in progress (the simple, ordinary "next" case).
- **Philippians 4** — **Drafting** in progress, and this drafting task is the one that **blocks Maria** the consultant from starting her Consultant Review. This is what triggers the "unblock a teammate" recommendation.
- **Luke 1** (in the "Birth Narrative" Priority) — the DEDICATED chapter for non-negotiable #6. It just finished all of **Drafting** with no open issues and **cleanly crossed into "Team Review & Comprehension Review"** — show the explicit "reached the next stage" indication here.

**Project 2 — "(second project)" with NO plan** — used only to demonstrate the no-plan fallback above.

## Visual / interaction style

- Clean, modern, minimal — shadcn/ui + Tailwind look. Generous spacing, subtle borders, gentle rounded corners, a restrained neutral color palette with one quiet accent color.
- Friendly to a low-tech user: large clear hit targets, plain language, no jargon beyond the vocabulary above, no dense tables, no overwhelming option panels.
- Use small, legible status badges for task/check state (waiting, has N issues, passing, stale, done) rather than walls of text.
- The Current Task / "your next step" should feel reassuring and singular, never like a to-do firehose.
- Make both variants and the no-plan project navigable from the seeded UI so a reviewer can walk through all six capabilities above.
````

---

## Iterating on an existing prototype — preserve, don't revert

Magic Patterns works **iteratively**: the block above is the cold-start build; you refine by pasting follow-up prompts. On a follow-up, Magic Patterns tends to regenerate from scratch and can quietly drop features or layout you already had. So whenever a prototype **already exists** and you're only adding to it, lead the follow-up prompt with the preservation guard below — then describe the specific change you want.

Paste this at the **top of any follow-up prompt**:

````text
Keep as much of the existing prototype as possible. We're adding a feature — I don't want to see important features or layout reverted.

For example:
- Disallowed: replacing the Model Text column with a Next Task column.
- Allowed: wrapping the Model Text in a tab UI and adding a Next Task tab.

The single-task-focus variant and the chapter-focus variant are exclusive of one another. Use the existing View menu to swap between them (useful for demoing multiple ideas without the UI getting too busy).
````
