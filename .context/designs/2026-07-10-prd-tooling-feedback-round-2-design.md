# PRD tooling, feedback round 2: question routing, divergence audit, PT10 awareness, and a PRD coach

> Design for the second revision of the PRD tooling (`/investigate-prd`, `/prd-to-jira`), driven
> by first-use feedback from the engineering manager (Matt) and product manager (Josh), plus
> research runs on the four real sync PRDs. Approved in discussion 2026-07-10.

## Why

Matt's feedback after real use: (1) the brief's "questions for the product owner" were mostly
engineering questions, some of which the command could have answered itself with more
archaeology; (2) the investigation missed existing PT10 behavior (Simple already auto-syncs at
startup/shutdown) without prompting; (3) POs need a section asking "did you intend this to be new
in PT10?" — PRDs assert PT9 behaviors that don't exist (e.g. a "weekly" sync interval).

Josh's feedback: he wants a coach that helps Epic Leads refine PRDs *after* a human first draft —
and a clear line: `/investigate-prd` is an engineering task; Epic Leads must not be dragged into
implementation detail.

Research findings that shaped the design (see the comparison discussion for evidence):
- Most coaching value needs only the PRD text; PT9-reality checks need only the bundled feature
  inventory. But PT10 awareness ("does PT10 already ship part of this?") needs a live capability
  scan — it caught the two biggest real-world misses (Simple auto-sync; the shipped S/R feature).
- Repo precedent is uniformly sibling commands sharing agents (shadcn trio,
  investigate-prd → prd-to-jira), never mode flags that change workflow identity. A `--coach`
  mode was considered and rejected: 7–9 prose forks, ~40% dead doc per run, a two-audience
  frontmatter description, no precedent.
- The bundled PT9 inventory itself carries errors (it asserts F9 = Send/Receive; two archaeology
  runs proved F9 = Next Book). Coach reliability is capped by bundle accuracy.

## Changes

### C1. Question routing + self-answer pass (`/investigate-prd`) — from Matt

- The brief's single "Questions for the product owner" section splits into two:
  **Questions for the product owner** (scope/intent, product language, zero code references) and
  **Engineering decisions** (for the epic lead / implementation owner, technical language fine).
  Routing test, stated in the command: *could someone who doesn't read code answer this?*
- **Self-answer pass**: before any question enters the brief, classify it fact-vs-decision.
  Fact-shaped questions get one bounded follow-up dispatch (archaeologist for PT9 facts, scout
  for PT10 facts — at most one extra wave); only unresolvable facts and genuine decisions survive.
- **No informational "questions"**: findings with no decision attached belong in §2, not the
  question sections.

### C2. Scout completeness: product-mode axis + lifecycle surfaces — from Matt

`pt10-reuse-scout` additions:
- **Mode matrix**: for every relevant behavior found, record which product mode (Simple / Power)
  has it, and explicitly check how the *other* mode already handles the PRD's need.
- Named easy-to-miss sweep targets: `src/main/startup-tasks.ts`, `src/main/shutdown-tasks.ts`,
  extension contributions (menus, settings, toolbars), notifications.
- Explicit step: check open PRs and recent merges on relevant paths (`gh pr list --search`,
  `git log --since` — in-flight work counts as existing work).

### C3. PT9-divergence audit → "New in Paratext 10 — confirm intent" — from Matt

- `prd-interpreter` gains an output block **"PT9 claims to verify"**: each individual PRD
  assertion about PT9 behavior ("PT9 does X"), with its PRD section. (Shared by both commands.)
- `pt9-archaeologist` receives that claims list and returns a verdict per claim.
- The brief gains a section **"New in Paratext 10 — confirm these are intentional"**, addressed
  to the PO in product language: each PRD detail with no PT9 antecedent
  (PRD item | what PT9 actually does | intentional upgrade or accident?), plus the mirror —
  PT9 capabilities in the feature's area that the PRD silently omits. `None.` when empty.

### C4. `/refine-prd` — the PRD coach for Epic Leads — from Josh

A separate sibling command (not a mode), deliberately shallower than `/investigate-prd`:

- **Flow**: parse PRD (`prd-interpreter`, unchanged dispatch) → cross-check its "PT9 claims to
  verify" against the **bundled** feature inventory only (verdicts phrased "per our PT9
  reference", never as ground truth) → **PT10 capability scan**: `pt10-reuse-scout` at a new
  shallow depth (below) — skipped with an explicit note when the sibling repos aren't readable →
  feedback presented inline (offer to save a copy; Epic Leads work in their own docs) → iterate →
  two-line handoff: "PRD settled → engineering runs `/investigate-prd`."
- **Feedback sections** (product language throughout): what your PRD asks (NN/NTH echo with
  per-item testability flags) · reality check (PT9 mismatches; what PT10 already ships) ·
  contradictions & gaps (internal inconsistencies; non-negotiables resting on open questions) ·
  appetite sanity (no time estimates — scope-vs-appetite commentary only) · questions to settle
  in the PRD (product decisions in disguise) · fine to leave open (engineering questions
  correctly deferred — validated as logged, never answered).
- **Hard rules**: never rewrite the PRD's text (capability-level suggestions only — the human
  drafts); no work items; no `file:line`, repo, or class names in output; no time estimates;
  the PRD is the Epic Lead's to change.
- **Scout depth knob**: scout input gains `DEPTH: full (default) | capability-scan`.
  Capability-scan answers only "what related user-facing capability already exists, and in which
  product mode?" — skipping command-surface mapping, reuse-vs-build classification, and
  integration options. The scout still cites `file:line` internally (its quality bar);
  the *coach command* owns translating output to product language.

### C5. Completeness critic (`/investigate-prd`) — new idea from this round

After the investigation waves, one cheap agent reviews the collected landscape: "what related
existing behavior did this miss? Check other product modes, app lifecycle hooks, contributions,
settings, notifications, sibling-PRD in-flight PRs, recent merges." Findings trigger at most one
targeted follow-up; otherwise they're noted in the brief.

### C6. Audience tags on brief sections — new idea from this round

Each brief section header carries a one-line audience tag (*for: product owner* / *for: epic
lead* / *for: engineers*), so readers know what's theirs.

### C7. CLARIFICATION routing at the soundness gate — new idea from this round

`prd-interpreter` tags each CLARIFICATION with an audience (product / engineering). The Step 3
gate presents engineering ones to the engineer running the command (who can often just answer),
and carries product ones forward rather than blocking on the wrong person.

### C8. Inventory correction loop — from research

- Fix `.context/research/paratext-9-features/10_Collaboration_Sync.md:70`: remove the erroneous
  "(F9)" on Send/Receive (PT9 binds F9 to Next Book; the S/R accelerator is Ctrl+Shift+S).
- Standing rule in `/investigate-prd`: when investigation contradicts the bundled inventory, the
  run's output must say so and the inventory gets corrected in the same change. The coach's
  PT9 checks are only as good as the bundle.

## Not doing (considered and rejected)

- **`--coach` mode on `/investigate-prd`** — rejected on precedent, doc-structure cost, and
  audience-split description (see Why).
- **A maintained "what PT10 ships today" summary doc** for the coach — would go stale in weeks
  (S/R went PRD-to-shipped in about one); the live capability scan replaces it.
- **Coach answering engineering questions** — it validates they're logged and routed, nothing more.

## Validation

- Re-run the shakedown on the third sync PRD ("Donna keeps her project in sync automatically" —
  likely Matt's run): C2/C3/C5 should surface Simple's startup/shutdown auto-sync unprompted and
  flag "weekly" in the New-in-PT10 section.
- Run `/refine-prd` on one PRD and check the output against Josh's line: no engineering detail,
  no rewritten prose, correct question routing.
- Existing checks: prettier on all touched `.md`; AI-branch pre-commit hooks.
