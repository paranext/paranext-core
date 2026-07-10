# PRD Tooling Feedback Round 2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the eight changes in `.context/designs/2026-07-10-prd-tooling-feedback-round-2-design.md` — question routing, scout completeness, PT9-divergence audit, the `/refine-prd` coach, completeness critic, audience tags, CLARIFICATION routing, and the inventory correction loop.

**Architecture:** All changes are markdown prompt files. Agents (`.claude/agents/`) are the shared units; the two commands (`.claude/commands/investigate-prd.md`, new `refine-prd.md`) stay thin dispatchers over them. Agent edits land first, then the commands that reference the new agent blocks, then the standalone inventory fix, then a cross-file consistency battery.

**Tech Stack:** Markdown prompt files; prettier for formatting; grep for verification. No runnable tests exist for prompt files — each task's verification is exact greps + prettier + the AI-branch pre-commit hooks.

## Global Constraints

- Repo: worktree `/home/paratext/git/workspaces/prd-donna-syncs-projects/paranext-core`, branch `ai/investigate-prd-command`. All paths relative to it. Never run git ops in the canonical checkout.
- Never introduce time estimates (hours/days/weeks) into any template or example.
- User-facing template text must avoid AI jargon (no "aspect breakdown", "constellation", "sub-flow" in brief/feedback templates).
- No `%key%`-shaped tokens anywhere (AI-009 pre-commit hook scans comments too).
- No ticket IDs or PR numbers in the authored prompt files (transient-ref rule) — design docs may cite them, command/agent files may not.
- Every commit: `npx prettier --check` the touched files first; commit messages end with `Co-authored-by: Claude Fable 5 <noreply@anthropic.com>` and `Session-URL: https://claude.ai/code/session_01HPQh3ZyPgiRd72FcTY7PXb`.
- Exact section names are load-bearing across files: `PT9 claims to verify`, `New in Paratext 10 — confirm these are intentional`, `Questions for the product owner`, `Engineering decisions`, `DEPTH`, `capability-scan`, `PC-` id prefix. Task 7 greps for drift.

---

### Task 1: prd-interpreter — PT9 claims list + CLARIFICATION audience

**Files:**
- Modify: `.claude/agents/prd-interpreter.md`

**Interfaces:**
- Produces: output block `## PT9 claims to verify` with rows `PC-{n} | {assertion} | {PRD section}`; CLARIFICATION blocks gain an `**Audience**: product | engineering` field. Tasks 2, 4, 5 consume both.

- [ ] **Step 1: Add claim collection to Step 1 of the agent**

After the paragraph that ends "These IDs are load-bearing: the brief's work items, the requirement-coverage table, and the Jira tickets all reference them." append a new bullet at the same list level:

```markdown
- **PT9-behavior assertions** — while parsing, collect every individual claim the PRD makes
  about how Paratext 9 behaves (a feature it supposedly has, a key binding, an option list, a
  workflow). Record each one verbatim (tight paraphrase is fine) with the PRD section it appears
  in, numbered `PC-1…`. PRDs routinely misdescribe PT9 — these claims get verified against PT9
  source during `/investigate-prd`, or against the bundled reference during `/refine-prd`.
```

- [ ] **Step 2: Add the output block to the Output template**

In the `## Output` template, immediately after the `## Aspect breakdown` table block, insert:

```markdown
## PT9 claims to verify
| # | PRD assertion about PT9 | PRD section |
| PC-1 | … | … |
(`None.` if the PRD asserts nothing about PT9 behavior.)
```

- [ ] **Step 3: Add the Audience field to the CLARIFICATION block format**

In the CLARIFICATION block template (Step 4 of the agent), after the `**Impact**:` line, add:

```
**Audience**: {product | engineering} — product = a scope/intent/priority call someone who
doesn't read code can make; engineering = needs code knowledge to answer.
```

- [ ] **Step 4: Verify**

Run: `grep -c "PT9 claims to verify" .claude/agents/prd-interpreter.md` → Expected: `2` (instruction + output template).
Run: `grep -c "Audience" .claude/agents/prd-interpreter.md` → Expected: `2` or more.
Run: `npx prettier --check .claude/agents/prd-interpreter.md` → Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add .claude/agents/prd-interpreter.md
git commit -m "feat(prd-interpreter): extract PT9-behavior claims; tag CLARIFICATION audience"
```

---

### Task 2: pt9-archaeologist — verify the claims

**Files:**
- Modify: `.claude/agents/pt9-archaeologist.md`

**Interfaces:**
- Consumes: `PT9_CLAIMS` rows (`PC-n | assertion | PRD section`) from Task 1.
- Produces: output section `### Claim verdicts` with `PC-n | assertion | Confirmed / Refuted / Partly | file:line evidence`. Task 4's brief section and Task 7's greps rely on the exact heading `### Claim verdicts`.

- [ ] **Step 1: Add the input**

In the agent's `## Inputs` section, add:

```markdown
- `PT9_CLAIMS` (optional) — the PRD's numbered assertions about PT9 behavior (`PC-n` rows from
  the PRD interpreter). Verify each against source; PRDs routinely misdescribe PT9, and a
  refuted claim is a headline finding, not a footnote.
```

- [ ] **Step 2: Add the output section**

In the agent's output template (the `## PT9 behavior: {feature}` block), after the `### Review Flags` entry, add:

```markdown
### Claim verdicts  (when PT9_CLAIMS provided)
| # | PRD assertion | Verdict | Evidence |
| PC-1 | … | Confirmed / Refuted / Partly | file:line |
Refuted or Partly rows must quote what PT9 actually does.
```

- [ ] **Step 3: Verify**

Run: `grep -c "PT9_CLAIMS" .claude/agents/pt9-archaeologist.md` → Expected: `2`.
Run: `grep -c "### Claim verdicts" .claude/agents/pt9-archaeologist.md` → Expected: `1`.
Run: `npx prettier --check .claude/agents/pt9-archaeologist.md` → Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add .claude/agents/pt9-archaeologist.md
git commit -m "feat(pt9-archaeologist): verdict per PRD claim about PT9 behavior"
```

---

### Task 3: pt10-reuse-scout — mode matrix, lifecycle surfaces, in-flight work, DEPTH knob

**Files:**
- Modify: `.claude/agents/pt10-reuse-scout.md`

**Interfaces:**
- Consumes: nothing new.
- Produces: `DEPTH` input (`full` default / `capability-scan`); `Mode` column in the landscape table. Task 5 dispatches with `DEPTH: capability-scan`.

- [ ] **Step 1: Add the DEPTH input**

In `## Inputs`, after the existing input bullet(s), add:

```markdown
- `DEPTH` (optional; default `full`) — `full`: everything below. `capability-scan`: the shallow
  mode for `/refine-prd` — answer only "what related user-facing capability already exists, and
  in which product mode?". Run Step 1 (discovery, including the product-mode matrix and
  lifecycle sweeps) and skip Step 2 (command surface), Step 3 (placement) and Step 4
  (reuse-vs-build); output only `### Relevant existing code`, `### Open questions`, and
  `### Review Flags`. Keep citing `file:line` — the calling command owns any translation to
  product language.
```

- [ ] **Step 2: Add the three completeness sweeps to Step 1 of the agent**

At the end of the agent's Step 1 bullet list (after the "Read the 2–3 most-likely files in full" bullet), add:

```markdown
- **Product-mode matrix (ALWAYS)** — Paratext 10 ships in more than one product mode (Simple,
  Power). For each relevant behavior found, record which mode(s) it exists in, and explicitly
  check how the OTHER mode already handles the PRD's need — mode differences are where prior art
  hides (e.g. Simple-only auto-sync at startup/shutdown).
- **Lifecycle & contribution surfaces (ALWAYS)** — sweep `src/main/startup-tasks.ts`,
  `src/main/shutdown-tasks.ts`, extension `contributions/` files (menus, settings, toolbars),
  and notification usage for the feature's key terms; these carry shipped behavior that
  `c-sharp/` keyword greps miss.
- **In-flight and recent work (ALWAYS)** — existing work includes unmerged work: check
  `gh pr list --search "{keyword}" --state open` for the relevant repos and
  `git log --oneline --since='90 days ago' -- {relevant paths}`; report in-flight PRs in the
  landscape with their PR numbers and treat them as reuse candidates contingent on landing.
```

- [ ] **Step 3: Add the Mode column**

In the `## Output` template, change the landscape table header line from
`| Repo | File:line | What it does | Similarity |` to
`| Repo | File:line | What it does | Mode | Similarity |`
(the `Mode` cell = Simple / Power / both / n-a).

- [ ] **Step 4: Verify**

Run: `grep -c "capability-scan" .claude/agents/pt10-reuse-scout.md` → Expected: `2` (input + skip list mention or similar; at least 1).
Run: `grep -c "Product-mode matrix" .claude/agents/pt10-reuse-scout.md` → Expected: `1`.
Run: `grep -c "| Mode |" .claude/agents/pt10-reuse-scout.md` → Expected: `1`.
Run: `npx prettier --check .claude/agents/pt10-reuse-scout.md` → Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add .claude/agents/pt10-reuse-scout.md
git commit -m "feat(pt10-reuse-scout): mode matrix, lifecycle/in-flight sweeps, capability-scan depth"
```

---

### Task 4: investigate-prd command — routing, critic, divergence section, audience tags; prd-to-jira renumber

**Files:**
- Modify: `.claude/commands/investigate-prd.md`
- Modify: `.claude/commands/prd-to-jira.md`

**Interfaces:**
- Consumes: `PT9 claims to verify` + `Audience` (Task 1), `### Claim verdicts` (Task 2), critic prompt (self-contained).
- Produces: brief sections renumbered 1–7 with exact names: `3. New in Paratext 10 — confirm these are intentional`, `6. Questions for the product owner`, `7. Engineering decisions`. `prd-to-jira.md` precondition references updated to match.

- [ ] **Step 1: Update the Overview list**

Replace the 6-item Overview list body (keep the surrounding paragraphs) with:

```markdown
1. Parse the PRD into a normalized structure: numbered non-negotiables (`NN-1…`), nice-to-haves
   (`NTH-1…`), no-gos, the PRD's claims about PT9 behavior (`PC-1…`), and the
   port-PT9 / net-new breakdown.
2. Investigate: map + read PT9 source for ported parts (verifying the PRD's PT9 claims); always
   sweep the PT10 repos for what already exists, in every product mode.
3. Run a completeness check over the findings, then answer what can be answered and route the
   rest: engineering questions to the user running the command, product questions to the brief.
4. Write the brief: what the PRD asks for, what already exists, what would be new in Paratext 10,
   proposed work items, requirement coverage, open questions by audience.
5. **Checkpoint** — the product owner and implementation owner discuss the brief and revise the
   PRD/brief until the non-negotiables fit the appetite. Iterate on their edits.
6. Once the team is happy, offer to create the Jira epic + work items (`/prd-to-jira`).
```

- [ ] **Step 2: Extend Step 3 (soundness gate) with audience-aware handling**

After the gate's "Wait for the user. Do not invent answers." line, append:

```markdown
Use each CLARIFICATION's `Audience` tag: engineering-tagged items are questions the user (usually
the implementation owner) can often answer on the spot — ask them directly. For product-tagged
items, offer the default of proceeding with the suggested assumption and carrying the question to
brief §6 for the product owner.
```

- [ ] **Step 3: Pass claims into Wave B**

In the Wave B bullet, extend the parenthetical that currently reads `pass that source's \`PT9_MAP\`` to:

```
pass that source's `PT9_MAP` **and the interpreter's `PT9 claims to verify` rows that touch this
source (all rows if unsure)** — the archaeologist returns a verdict per claim
```

- [ ] **Step 4: Insert new Step 5 (completeness check) after Step 4, renumbering the rest**

Insert:

```markdown
## Step 5: Completeness check

Dispatch one lightweight critic agent with the collected landscape and behavior digest:

> Name related existing behavior this investigation missed. Check: other product modes
> (Simple / Power), app lifecycle hooks (startup/shutdown tasks), extension contributions
> (menus, settings, toolbars), notifications, sibling-PRD in-flight PRs, recently merged work.
> Return specific misses with evidence, or "clean".

If it names something real, run at most **one** targeted follow-up dispatch to cover it; note
misses and their resolution in the brief. Don't loop.
```

- [ ] **Step 5: Replace the old Step 5 (interview) with the routed version (now Step 6)**

```markdown
## Step 6: Answer, then route, the open questions

Gather every unresolved item: CLARIFICATIONs the user deferred, agent Review Flags and
`NEEDS_CONTEXT` asks, and gaps the work-item draft (Step 7) exposes.

1. **Self-answer pass.** Classify each item FACT (a true answer exists in some repo) or DECISION
   (someone must choose). For facts, run one targeted follow-up dispatch (`pt9-archaeologist`
   for PT9 facts, `pt10-reuse-scout` for PT10 facts) — at most one extra wave for the whole run.
   A fact nobody can verify becomes a flagged unknown in §2/§3, not a question.
2. **Route the decisions.** Product decisions (scope, intent, priority — answerable without
   reading code) go to brief §6. Engineering decisions: ask the user running the command NOW,
   as a short batch, each with a suggested answer (use the question tool if available). Whatever
   they can't answer goes to brief §7.
3. **No informational "questions".** A finding with no decision attached belongs in §2 or §3,
   never in §6/§7.

The routing test, applied to every question: *could someone who doesn't read code answer this?*
```

- [ ] **Step 6: Update the brief template (now Step 7)**

Replace the template block and keep the work-item rules below it, with these changes: audience tag lines under each heading; new §3; questions split into §6/§7. Full replacement template:

```markdown
# {Feature name}: investigation

## 1. What the PRD asks for
*(for: everyone)*
{Problem in one short paragraph. Appetite.}

| ID | Non-negotiable |
| NN-1 | {PRD wording} |

| ID | Nice-to-have |
| NTH-1 | {PRD wording} |

No-gos: {list}

## 2. What already exists
*(for: engineers — §3 carries the product-owner view of the same facts)*
- **Paratext 9:** {where the feature lives (file:line) and the behaviors that matter}
- **Paratext 10:** {what already works today, in which product mode, and where}
- **Reusable as-is:** {…}  **Needs building:** {…}

## 3. New in Paratext 10 — confirm these are intentional
*(for: product owner)*
| PRD item | What Paratext 9 actually does | Intentional? |
Product language only. Every PRD detail with no PT9 antecedent (refuted or unmatched `PC-n`
claims, net-new details inside ported areas) — plus the mirror: PT9 capabilities in this
feature's area the PRD doesn't mention (dropped deliberately?). `None.` for a fully net-new
feature or a clean port.

## 4. Proposed work items
*(for: epic lead + engineers)*
| # | Work item | Repo | Complexity | Depends on | Covers |
| WI-1 | {implementation-shaped title} | {repo} | Simple/Moderate/Complex | — | NN-1, NTH-2 |

**WI-1 — {title}.** {What it does. What it produces and which sibling item consumes it. Files it
likely touches. What it deliberately leaves to other items. Any spike to run before its design.}

## 5. Requirement coverage
*(for: everyone)*
| Requirement | Work item(s) | Notes |
| NN-1 {short name} | WI-2 | {how it's met} |
| NTH-1 {short name} | WI-4 | included / cut first when time is tight |

## 6. Questions for the product owner
*(for: product owner)*
Scope and intent decisions only, in product language — zero code references. Each with a
suggested answer.

## 7. Engineering decisions
*(for: epic lead / implementation owner)*
Technical calls investigation couldn't settle, each with a recommendation. `None.` if all
settled.
```

In the work-item rules below the template, update the last rule's cross-reference from `§5` to `§6`.

- [ ] **Step 7: Update the checkpoint (now Step 8) and Jira step (now Step 9)**

In the checkpoint step: renumber heading to `## Step 8: Checkpoint`; change "the work-item table, the requirement-coverage table, and the §5 questions" to "the work-item table, the coverage table, §3 (confirm-intent items), and the §6/§7 questions". Renumber the Jira step heading to `## Step 9: …` and its `$SLUG` example line stays unchanged. In the `## Agent status protocol` section, update "material for the Step 5 interview and brief §5" to "material for Step 6 (answer/route) and brief §6–§7"; in Error handling, update "surface the gap at the interview/checkpoint" to "surface the gap at Step 6 / the checkpoint".

- [ ] **Step 8: Add the inventory-correction rule to Error handling**

Append to the Error handling list:

```markdown
- **Investigation contradicts the bundled inventory** (`.context/research/paratext-9-features/`)
  → say so explicitly in the brief AND correct the inventory file in the same change — the
  bundled reference is only useful while it's true (`/refine-prd` depends on it).
```

- [ ] **Step 9: Fix prd-to-jira's section references**

In `.claude/commands/prd-to-jira.md` preconditions, change `If §5 (questions for the product owner) still contains` to `If §6 (questions for the product owner) still contains`.

- [ ] **Step 10: Verify**

Run: `grep -n "Step [0-9]" .claude/commands/investigate-prd.md | head -12` → Expected: Steps 1–9 in order, no duplicates.
Run: `grep -c "New in Paratext 10 — confirm these are intentional" .claude/commands/investigate-prd.md` → Expected: `1`.
Run: `grep -c "Questions for the product owner" .claude/commands/investigate-prd.md` → Expected: ≥ `2` (template + routing text).
Run: `grep -c "§6" .claude/commands/prd-to-jira.md` → Expected: `1`.
Run: `npx prettier --check .claude/commands/investigate-prd.md .claude/commands/prd-to-jira.md` → Expected: pass.

- [ ] **Step 11: Commit**

```bash
git add .claude/commands/investigate-prd.md .claude/commands/prd-to-jira.md
git commit -m "feat(investigate-prd): question routing, completeness critic, confirm-intent section, audience tags"
```

---

### Task 5: New /refine-prd command

**Files:**
- Create: `.claude/commands/refine-prd.md`

**Interfaces:**
- Consumes: `prd-interpreter` output incl. `PT9 claims to verify` (Task 1); `pt10-reuse-scout` with `DEPTH: capability-scan` (Task 3).
- Produces: the Epic-Lead-facing command; referenced by nothing (entry point).

- [ ] **Step 1: Write the file** — full content:

```markdown
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

```
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
```

- [ ] **Step 2: Verify**

Run: `grep -c "capability-scan" .claude/commands/refine-prd.md` → Expected: `1`.
Run: `grep -cE "file:line|work item" .claude/commands/refine-prd.md` → Expected: mentions only inside prohibition/translation rules (manually confirm each hit is a "don't" statement).
Run: `npx prettier --check .claude/commands/refine-prd.md` → Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/refine-prd.md
git commit -m "feat(refine-prd): PRD-refinement coach command for Epic Leads"
```

---

### Task 6: Inventory F9 correction

**Files:**
- Modify: `.context/research/paratext-9-features/10_Collaboration_Sync.md` (line ~70 + any other F9-for-S/R mentions)

- [ ] **Step 1: Find every F9 reference**

Run: `grep -n "F9" .context/research/paratext-9-features/10_Collaboration_Sync.md`

- [ ] **Step 2: Correct the entry-point line**

Change the Send/Receive entry-point text `Project > Send/Receive this project (F9)` to:

```
Project > Send/Receive this project (no shortcut — PT9 binds F9 to Next Book; the multi-project dialog uses Ctrl+Shift+S)
```

Apply the equivalent correction to any other line the grep found that ties F9 to Send/Receive.

- [ ] **Step 3: Verify**

Run: `grep -n "F9" .context/research/paratext-9-features/10_Collaboration_Sync.md` → Expected: every remaining F9 mention says F9 is Next Book / not S/R.
Run: `npx prettier --check .context/research/paratext-9-features/10_Collaboration_Sync.md` → Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add .context/research/paratext-9-features/10_Collaboration_Sync.md
git commit -m "fix(research): correct the F9 error in the S/R inventory entry (F9 = Next Book in PT9)"
```

---

### Task 7: Cross-file consistency battery + push

**Files:** none (verification only)

- [ ] **Step 1: Section-name consistency**

Run each; every count must match:

```bash
grep -c "PT9 claims to verify" .claude/agents/prd-interpreter.md .claude/commands/investigate-prd.md .claude/commands/refine-prd.md
# expected: interpreter 2, investigate-prd ≥1, refine-prd ≥1
grep -c "capability-scan" .claude/agents/pt10-reuse-scout.md .claude/commands/refine-prd.md
# expected: ≥1 in each; spelled identically
grep -rn "Aspect breakdown\|constellation\|sub-flow" .claude/commands/investigate-prd.md .claude/commands/refine-prd.md
# expected: no hits inside the user-facing template blocks (internal step text referencing the interpreter's aspect table is fine)
grep -n "hours\|days\|weeks" .claude/commands/refine-prd.md
# expected: no time-estimate language (the word "days" may appear only in '90 days ago' — not applicable here)
```

- [ ] **Step 2: Full prettier + status check**

Run: `npx prettier --check .claude/commands/*.md .claude/agents/prd-interpreter.md .claude/agents/pt9-archaeologist.md .claude/agents/pt10-reuse-scout.md` → Expected: pass.
Run: `git status --short` → Expected: clean (everything committed).

- [ ] **Step 3: Push**

```bash
git push origin ai/investigate-prd-command
```

Expected: fast-forward push of Tasks 1–6 commits.
```
