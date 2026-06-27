# Round 3 — Magic Patterns follow-up prompt (post-demo revision)

Paste this **as a follow-up** into the existing Magic Patterns project (the one built from `2026-06-24-r2-c-magicpatterns.md` + its seed data). It's a follow-up, so it leads with the preserve-guard and only describes the deltas from Matt's demo feedback (2026-06-26). Don't recreate the prototype from scratch.

```text
Keep as much of the existing prototype as possible. We're refining it based on user feedback — do NOT revert features, data, or layout. Build on what's already there. Keep everything minimal and uncluttered, matching the current look, and lean heavily on progressive disclosure: one small thing by default, more detail only on demand.

Make these changes:

1. SINGLE FOCUS ITEM — always present, top-center of the screen. Scope it to the CURRENT CHAPTER ONLY: show the one next thing to work on for the chapter Saroj is currently in. Do NOT list every task for the whole priority or book — repeating the same task across chapters is overwhelming. Add a small demo toggle (keep it OUT of the main workspace — in the avatar/settings menu) for what the single focus shows:
   - Mode 1a: focus = the chapter's current STAGE (coarse — e.g. "Drafting", "Team Review & Comprehension Review").
   - Mode 1b: focus = the next STEP (a single Task, or a Check and its Issues).
   (We're testing whether step-level focus over-nannies and overwhelms, or instead helpfully narrows attention — so both modes must be demoable.)

2. ENTRY POINT into a ONE-CHAPTER FOCUS view. The top-center item is the door into the chapter view, not a separate sidebar. Collapsed, it's a one-line "what's next." Clicking/expanding it opens a panel showing the focus detail plus other choices — this chapter's stages and steps, and where the chapter sits in the overall plan. Fold the old full-chapter-pane content into this expandable panel. It is the always-present door INTO the chapter view.

3. COMBINE BCV WITH THE TASK UI. The top-center item doubles as the Book/Chapter/Verse navigator — one unified control, not two separate ones. Add a small demo toggle:
   - Mode 3a: changing the book/chapter navigates Scripture AND moves the "what's next" focus to that chapter (focus follows navigation).
   - Mode 3b: changing the book/chapter navigates Scripture but the focus stays PINNED to the chapter Saroj was working on — so he can glance at another passage for reference and one-click back. When the viewed chapter and the focus chapter differ, reveal (progressive disclosure) a small affordance to (a) jump back to the focus chapter and (b) explicitly move the focus to the chapter he's now in. When they're the same, keep it simple and unified.

4. DEFAULT TO COARSE, STAGE-LEVEL granularity. The primary action is advancing the chapter through STAGES with a single "mark done / advance" action — NOT clicking through individual tasks and issues one at a time. Fine-grained tasks and issues stay available on demand (expandable detail) but are never required clicks in the main flow. Saroj asserts a stage is done in one moment; doing so asserts its steps are done too. Open issues from checks are shown but advisory — they don't block the coarse "advance."

5. DON'T BLOCK ON TEAMMATES' OFFLINE WORK. If the next thing depends on a teammate's task that hasn't synced yet, still let Saroj proceed to the next available action. Only show a calm "Waiting on <person>" state when that teammate's data is genuinely required to continue — never force a send/receive just to unblock.

Vocabulary fix: rename the human REVIEW tasks still labeled "check" — "Exegetical check" → "Exegetical review", "Naturalness check" → "Naturalness review", "Consultant checking session" → "Consultant review session". Automated Checks (spelling, quotations, biblical terms, etc.) stay "Check".
```
