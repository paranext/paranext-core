# Magic Patterns — next-step ADD-ON prompt (for the existing prototype)

**This is an ADD-ON, not a new build.** Earlier attempts failed because the prompt read like "build an app," so Magic Patterns recreated the whole interface. This version does the opposite: it tells Magic Patterns to **keep the prototype you already have** (its columns, its style, its example data like John) and only **add** the next-step feature plus the fake data that feature needs.

### What to hand Magic Patterns (the handoff)

1. **Paste the fenced block below into your EXISTING Magic Patterns project as a follow-up message** — not a new project. It is self-contained: the data recipe is inline, so Magic Patterns can generate next-step data for the books you already have (John, etc.) plus the curated Philippians showcase. This one paste is the whole handoff.
2. **Optional, only if you'd rather hand it exact JSON than let it generate data:** also paste the companion `2026-06-24-r2-c-magicpatterns-sample-data.md` (a dense ready-made Philippians dataset). The recipe below already covers this, so it's optional — and note it uses its own project/people names, so the inline recipe is the safer, "keep what you have" path.

(Supersedes the round-2 cold-start `2026-06-24-r2-c-magicpatterns.md` and the round-3 follow-up `2026-06-26-r3-magicpatterns-followup.md` — use this one.)

---

```text
You are ADDING ONE FEATURE to the prototype you ALREADY have. This is NOT a new app and NOT a redesign. Read the preservation rules first and follow them strictly — changing less is better than changing more.

## 1. KEEP WHAT YOU ALREADY HAVE (this is the most important instruction)
Your current prototype already works: it has a multi-COLUMN layout (like a real translation editor), its own visual style, and its own example data (e.g. the book of John). KEEP ALL OF IT:
- Do NOT rebuild, regenerate, "clean up", or re-lay-out the interface. Do NOT remove or rearrange any existing column or panel — keep every one of them, and keep them all working exactly as they do now.
- Do NOT restyle anything and do NOT introduce a new look, theme, color palette, or component library. MATCH the style you already have. (I do not want to see a new design — only the new feature, in your existing style.)
- Keep ALL existing example data, books, and locations (John, etc.). Do not delete, rename, or replace them. You will ADD next-step data on top of them (see §5), not swap them out.
- Everything below is ADDITIVE. If a sentence below seems to call for rebuilding or restyling, ignore that reading and add minimally instead.

## 2. WHAT TO ADD — a "next-step" feature
Add ONE always-present control and its expanded view, woven into your existing chrome. Lean hard on progressive disclosure: one small thing by default, detail only on demand.
- A small "focus item" pinned to the TOP-CENTER of your existing top bar (you may make that bar slightly taller to fit it — but keep everything else in it). It answers "what's next for THIS chapter," scoped to the CURRENT CHAPTER ONLY. Never list every task across a whole book or Priority.
- Collapsed, it is a calm one-line summary. Clicking it EXPANDS into a one-chapter focus panel (a WIDE, user-RESIZEABLE dialog) — the door into the chapter view, not a new sidebar or column.
- MERGE it with your EXISTING book/chapter (BCV) navigator — if you already have a book/chapter control, fold the focus item into it (or place it adjacent) so there is ONE navigator, not two. Do not add a second one.
- In the expanded panel, show: where the chapter sits in the plan ("Stage 2 of 6") and its current stage; a single COARSE primary action — "advance / mark stage done" (advancing asserts the stage's work is done — do NOT make the user click through tasks/issues one by one); and ON DEMAND (expandable, never required) the steps in this stage — tasks (with a kind badge) and checks (with issue counts + a "Resolve" affordance) — plus the chapter's other in-chapter choices. Open check-issues are shown but ADVISORY; they don't block the coarse advance.
- DON'T BLOCK on teammates' offline work: still let the user proceed to his next available action; only show a calm "Waiting on <person>" when that teammate's data is genuinely required.

## 3. Design intent (for the feature's behavior only — not the app's style)
The user, Saroj, is a professional translator who is uncomfortable with complex software; too many buttons or dense tables overwhelm him. Keep the feature calm, singular, and obvious; when two designs are possible, choose the simpler one. (This governs the feature's behavior — keep using your existing visual style for the look.)

## 4. Vocabulary (use these EXACT words in the feature's copy — no synonyms)
- Stage — a named phase a chapter passes through. A chapter is in the earliest stage with unfinished work.
- Task — a unit of work a person does and marks done. Kinds: Drafting, Review (a person reads/judges the text and leaves comments), Revision (change the text to clear issues).
- Check — an AUTOMATED evaluation (spelling, quotations, biblical terms…): "passes" (0 issues) / "has issues" (a count) / "stale" (text changed since it last passed). NEVER call a Check a "Review".
- Review — a HUMAN-judgment evaluation by a person. NEVER call it a "Check".
- Comment — a reviewer's note (use "comment", never "note"). Each open comment is an Issue.
- Issue — something to resolve, from a Check or an open Comment.
- Revision — the Task of clearing the Issues a Check or Review raised.
- "Your next step" / "what's next" — the warm user-facing label for the one thing the focus item surfaces.
- Chapter — the unit of progression; advances through stages independently. (May also be a whole book or a "Priority".)
- Priority — a named, ordered scripture selection that can cross books (e.g. "Birth Narrative" = Matthew 1–2 + Luke 1–2).
- Solo — tasks done on one's own time (assigned to him, or to "Anyone"); the focus is only ever recommended from Solo.
- Together — Team-assigned tasks done collaboratively; NEVER the individually-recommended next step.
- Teammate — another person with their own tasks; the user's unfinished work can block a teammate.

## 5. THE FAKE DATA THE FEATURE NEEDS (build this — KEEP your existing data and ADD this on top)
The feature needs tasking / assignment / progress data. Your existing data (John, etc.) currently has NONE, so the feature would have nothing to show there. Generate it — without deleting anything you already have.

THE PLAN (one plan, "SIL Compact Base Plan") — 6 stages in order, each with these tasks (and a shared catalog of automated checks):
1. Drafting — tasks: Exegesis; Create the first draft.
2. Team Review & Comprehension Review — tasks: Exegetical review; Naturalness review; Draft supplementary materials; Format check; Prepare for comprehension testing; Perform comprehension testing; Revise from feedback.
3. Preparing for Consultant — tasks: Draft the back translation; Check back translation.
4. Consultant Review — tasks: Preliminary evaluation of text; Consultant review session; Revise from consultant feedback; Receive consultant approval.
5. Community Review — tasks: Review Biblical terms and revise; Review for naturalness and revise; Report on community review.
6. Final Preparation for Publication — tasks: Check and link glossary entries; Enter Publication Information; Submit to the DBL; Publish.
Automated CHECKS catalog (these are Checks, not Reviews): Chapter/verse numbers, Markers, Translator notes, Spelling, Consultant notes, Characters, Punctuation, Capitalization, Repeated words, Unmatched pairs, Matched pairs, Quotations, Numbers, Biblical terms, Word list, References, Spelling-discussion notes, Rendering-discussion notes, Parallel passages.

PER-CHAPTER DATA MODEL (invent values per chapter): a current stage (the earliest stage with unfinished work — derive it, don't just store it); which of the stage's tasks are done; each relevant check's state (passing / has N issues / stale); each task's assignment (a specific person / Anyone / Team) and whether it's Solo or Together; and any teammate dependency.

RECIPE — apply the plan to EVERYTHING you already show:
- For EACH book and chapter your prototype already has (John and any others), seed a PLAUSIBLE spread: some chapters early (Drafting), some mid-pipeline, some nearly done — with a few tasks done, one or two checks carrying issues, and realistic assignments. The point is that wherever the user navigates in your EXISTING data, the focus item has something real to show.
- The signed-in user is Saroj (a drafter). Add a consultant teammate, Maria. If your prototype already has people, reuse them; otherwise add Saroj, Maria, and one or two more.

CURATED SHOWCASE — ADD the book of Philippians (4 chapters) and a Priority "Birth Narrative" (Matthew 1–2 + Luke 1–2) ALONGSIDE your existing books (don't replace John), with these exact states so the demo has a reliable walk-through:
- Philippians 2 — focal; default the demo here. In "Team Review & Comprehension Review": an Exegetical review and a comprehension Review available; a co-translator Review with open Comments; "Word list" Check = 12 issues; "Quotations" Check = passing; "Biblical terms" Check = 5 issues; a later step "Available after Consultant Review".
- Philippians 1 — advanced to Community Review; a Check that was passing went stale (reopened) after an edit — show it needing a re-run (advisory, not blocking).
- Philippians 3 — plain Drafting in progress.
- Philippians 4 — Drafting in progress; finishing it unblocks Maria's Consultant Review (show "finishing this unblocks Maria", never a hard block).
- Luke 1 (Birth Narrative) — just cleanly finished Drafting and crossed into "Team Review & Comprehension Review": show the "reached the next stage" indication here.
- Also seed one project (or a state) with NO plan, for the no-plan fallback (§6.2).

## 6. Demo controls + data coverage (add to your EXISTING avatar/settings menu — as prototype controls, not product chrome)
- Toggle "Focus granularity": Stage vs Step. END TO END — it sets BOTH what the collapsed focus line shows AND the grain at which the next thing is picked. Stage = the chapter's current stage; Step = the single next step (a task, or a check → its issues). Display grain and pick grain must always match.
- Toggle "Book/Chapter coupling": Unified vs Pinned. Unified = changing book/chapter moves the focus there. Pinned = the focus stays on the working chapter; when the user navigates elsewhere, reveal small affordances to jump back to the focus chapter or move the focus to the viewed chapter; when they match, keep it simple.
- DATA COVERAGE INDICATOR + GRACEFUL FALLBACK (important so the demo never breaks): show, in the demo controls, a short list of which locations have next-step data seeded (e.g. "John 1–N, Philippians 1–4, Birth Narrative"). And for ANY location that has no next-step data, the focus item must show a calm "No next-step data seeded for this location" — never blank, never broken.

## 6.2 The feature must let Saroj do these six things
1. See the active chapter's current STAGE.
2. Degrade gracefully when a project has NO plan: a calm inform-only zero state with two CTAs — "Learn the value of a project plan" and "Contact your project admin" — never let him author a plan; the focus item shows a quiet "No plan set".
3. See which steps remain for this chapter to reach the next stage (on demand).
4. Mark progress with a single COARSE "advance" (mark the stage done) — one moment, not click-by-click.
5. For a step that depends on a Check or Review passing, see what's required (issue counts to clear, comments to resolve).
6. See a clear "reached the next stage" indication when a chapter's stage work is complete.

Remember: keep everything you already have (columns, style, data); ADD only the feature above and the data it needs.
```
