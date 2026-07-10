---
description: Coach an Epic Lead through refining a Shape-Up PRD draft — soundness, contradictions, Paratext 9 mismatches, what Paratext 10 already ships — in product language with no implementation detail. Pass the PRD path. e.g. /refine-prd docs/prds/sync-project.md
---

# Refine PRD

Review the PRD draft at **$ARGUMENTS** and give the Epic Lead product-level feedback to refine
it. You are a coach — not a ghostwriter, and not an engineering investigator.

## The contract (read first)

- **The human drafts; you refine.** Never rewrite the PRD's prose. Point at problems, ask
  questions, and suggest at the capability level ("say which projects can be selected") — never
  supply replacement paragraphs.
- **Product language only.** No file paths, class names, repo names, or code terms in anything
  shown to the user. Name Paratext features by their user-facing names.
- **No work items, no implementation plans, no time estimates.** Those belong to engineering,
  later (`/investigate-prd`).
- **Flag, don't answer, engineering questions.** An open technical question in a PRD is healthy;
  check that it's logged, don't resolve it.
- The PRD is the Epic Lead's to change — present findings, let them decide.

## Step 1: Prepare

If `$ARGUMENTS` is empty, ask for the PRD path and stop until provided.

## Step 2: Parse the PRD

Dispatch the `prd-interpreter` agent (`subagent_type: "prd-interpreter"`,
`PRD_PATH: $ARGUMENTS`). You will use: the NN/NTH tables, the aspect breakdown, Goals and
success criteria, the CLARIFICATION items (feedback content here — not a stop-gate), and the
`PT9 claims to verify` list.

## Step 3: Check the PT9 claims against the bundled reference

For each `PC-n` claim, check it against the bundled PT9 feature inventory
(`.context/research/paratext-9-features/` — pick the category file) and, where useful, the
manual (`.context/research/paratext-manual/`). Verdicts: **matches our reference** /
**contradicts our reference** / **our reference doesn't say**. Phrase every verdict as "per our
PT9 reference" — the bundle has been wrong before. When a claim matters and the reference is
silent or in doubt, flag it for engineering verification instead of guessing.

## Step 4: Scan what Paratext 10 already ships

Probe the PT10 repos with your file tools (`~/git/paranext-core`, `~/git/paratext-10-studio`,
`~/git/paratext-bible-extensions`, `~/git/paratext-bible-internal-extensions`). If readable,
dispatch `pt10-reuse-scout` (`subagent_type: "pt10-reuse-scout"`) with the PRD summary, the
NN/NTH tables, the aspect breakdown, and `DEPTH: capability-scan`. Translate its findings to
product language yourself — capability names and product modes, never file:line. If the repos
aren't readable, skip the scan and say so in the feedback ("not checked against the running
product — engineering will catch this during /investigate-prd").

## Step 5: Present the feedback

Present inline; offer to save a copy to a file if the user wants one. Sections (product language
throughout; `None.` where empty):

```markdown
## What your PRD asks
The non-negotiable and nice-to-have tables as parsed, with a testability flag per item
("a tester could verify this" / "two people could read this differently: …").

## Reality check
- Per our PT9 reference: claims the reference contradicts, claims it confirms, claims it can't
  settle (flagged for engineering).
- Already in Paratext 10: capabilities the PRD asks for that ship today — and in which product
  mode — so scope and appetite can account for them.

## Contradictions and gaps
Internal inconsistencies (two sections that disagree), non-negotiables resting on an open
question, boundary-table cells that run several requirements together.

## Appetite sanity
Scope versus the stated appetite and the PRD's own cut line — commentary only, no estimates.

## Questions to settle in the PRD
Product decisions in disguise (who may do X; which option is the default) — each with a
suggested answer.

## Fine to leave open
Engineering questions the PRD correctly defers — confirmed as logged, not answered.
```

## Step 6: Iterate

The Epic Lead edits their PRD; re-run on request. When they're satisfied:

> PRD settled? Hand it to engineering to run `/investigate-prd` — that produces the work-item
> breakdown and, after team approval, the Jira epic.

## Error handling

- **No PRD path** → ask (Step 1).
- **The PRD isn't Shape-Up-shaped** → coach on what's there and note which template sections are
  missing.
- **Bundled reference missing** (not run from a paranext-core checkout) → PRD-text-only
  coaching; say so.
- **`prd-interpreter` returns `BLOCKED`** → stop and report why.
