---
description: Investigate a Shape-Up PRD (port PT9 feature(s) and/or net-new) and produce a short brief with proposed work items mapped to the PRD's non-negotiables; after team approval, optionally create the Jira epic + work items. Pass the PRD path. e.g. /investigate-prd docs/prds/sync-project.md
---

# Investigate PRD

Investigate the PRD at **$ARGUMENTS** and produce a short investigation brief whose centerpiece
is a **proposed work-item breakdown** mapped to the PRD's non-negotiables and nice-to-haves.

## Overview

1. Parse the PRD into a normalized structure: numbered non-negotiables (`NN-1…`), nice-to-haves
   (`NTH-1…`), no-gos, and the port-PT9 / net-new breakdown.
2. Investigate: map + read PT9 source for ported parts; always sweep the PT10 repos for what
   already exists.
3. Interview the user about anything that blocks shaping the work items. Don't decide for them.
4. Write the brief: what the PRD asks for, what already exists, proposed work items, requirement
   coverage, open questions.
5. **Checkpoint** — the product owner and implementation owner discuss the brief and revise the
   PRD/brief until the non-negotiables fit the appetite. Iterate on their edits.
6. Once the team is happy, offer to create the Jira epic + work items (`/prd-to-jira`).

The command stays thin: it dispatches agents, collates their structured outputs, runs the
interview + checkpoint, and hands off to Jira creation. It owns no investigation logic of its own.

**One team.** A single team works on all the repos involved (paranext-core, paratext-10-studio,
paratext-bible-extensions, paratext-bible-internal-extensions, and PT9's Paratext). Place each
work item in whatever repo is architecturally right and never treat repo boundaries as team
boundaries — cross-repo work carries no coordination cost and is not a risk to flag.

## Repo access

Investigations read sibling checkouts under `~/git/` — `Paratext` (PT9) and the PT10 repos
(`paranext-core`, `paratext-10-studio`, `paratext-bible-extensions`,
`paratext-bible-internal-extensions`). These live **outside this working directory**, so your
file tools (`Read`/`Glob`) need access to them. In the default paranext-core checkout this
**works out of the box** — its `.claude/settings.json` broadly allows `Read`/`Glob`, so the file
tools reach siblings under `~/git/` with no extra flags. If your setup restricts file reads, grant
access at launch instead (e.g. `claude --add-dir ~/git`). Bash can reach them regardless, but the
agents rely on `Read` for their deep source reads. **Step 1 preflights this empirically — it only
warns if reads actually fail**, so you normally won't be asked to relaunch. If a repo is still
unreachable mid-run, the owning agent degrades and notes the gap. This is a **convention**, not a
hard requirement — never pin paths into the user's settings for them.

## Step 1: Prepare the run

If `$ARGUMENTS` is empty, ask the user for the PRD path and stop until they provide it.

Derive a slug from the PRD filename (lowercase; spaces and punctuation → hyphens; drop the
extension). Briefs live in the **shared, tracked** research area
`.context/research/investigations/<slug>/` so collaborators get them via git.

```bash
SLUG="<derived-slug>"
mkdir -p ".context/research/investigations/$SLUG"
```

Do **not** auto-commit the brief — the developer commits it as part of their normal flow.

**Preflight — repo access.** Before going further, probe each expected repo with your file tools
(e.g. `Glob ~/git/Paratext/*`, and a `Glob` of each PT10 repo — or `Read` a file under each).
Treat an *outside-the-allowed-directories / access* error (not an empty result) as
**unreachable**. If any are unreachable, **stop and warn the user before investigating**:

> ⚠️ My file tools can't read these repos: {list}. Either your config restricts file reads
> (relaunch with `claude --add-dir ~/git`, or broaden the `Read` permission in
> `.claude/settings.json`) or they aren't checked out under `~/git/`. Without them my coverage
> shrinks — I'll fall back to the bundled inventory and flag the gaps. Continue anyway, or relaunch?

An unreachable **PT10** repo degrades `pt10-reuse-scout` (affects every PRD — it always runs);
an unreachable **`~/git/Paratext`** degrades `pt9-archaeologist` (only matters if the PRD ports
PT9 features). Wait for the user. If they choose to proceed, continue and let the agents degrade
per their own `## Degradation` rules.

## Step 2: Interpret the PRD

Dispatch the `prd-interpreter` agent with the Agent tool (`subagent_type: "prd-interpreter"`),
passing `PRD_PATH: $ARGUMENTS`. Read its normalized output — the numbered `NN-n` / `NTH-n`
tables and the aspect breakdown — and its status token.

## Step 3: Soundness gate (present, don't decide)

If `prd-interpreter` returned `DONE_WITH_CONCERNS` with `CLARIFICATION-{N}` items, **STOP** and
present them to the user before investigating:

> The PRD has open questions that affect the investigation:
> {list each CLARIFICATION-N with its suggested resolution}
> Want me to proceed with my best assumptions, or would you like to clarify first?

Wait for the user. Do not invent answers.

## Step 4: Investigate (parallel fan-out)

Dispatch the investigation agents. `pt10-reuse-scout` **always** runs. For aspects tagged
`PT9-port` or `hybrid`, run `feature-mapper` then `pt9-archaeologist` (the map feeds the
archaeologist). A fully net-new PRD runs only the scout.

**Dedupe to distinct PT9 sources first.** Multiple aspects commonly cite the **same** PT9 form /
category (e.g. nine Send/Receive aspects that all derive from `SendReceiveProjectsForm`). Do **not**
run one mapper/archaeologist per aspect — that re-investigates the same source N times. Group the
`PT9-port`/`hybrid` aspects by their distinct `(PT9 form, category)` key and investigate **each
distinct source once**, recording which aspects it covers. The unit of fan-out is the distinct PT9
source, not the aspect.

- **Wave A (single response, in parallel):** one `feature-mapper` (`subagent_type: "feature-mapper"`)
  **per distinct PT9 source**, passing that source's `PT9_REFERENCES` **and the list of aspects it
  covers**, **and** `pt10-reuse-scout` (`subagent_type: "pt10-reuse-scout"`, pass the PRD summary,
  **the numbered NN/NTH tables**, and the full aspect breakdown — the scout sweeps the PT10 repos
  by each distinct PT9 form/category and tags what it finds by the NN/NTH it covers). Dispatch all
  of these in one message.
- **Wave B (single response, in parallel):** for each `feature-mapper` that returned a map, one
  `pt9-archaeologist` (`subagent_type: "pt9-archaeologist"`, pass that source's `PT9_MAP`). Pair each
  archaeologist with the `feature-mapper` output whose `## PT9 map: {feature}` heading matches that
  source — keep the **distinct-PT9-source → mapper → archaeologist** correspondence strictly 1:1
  (each may cover several aspects). **Exception:** if two mappers come back with maps of the
  *same* PT9 feature (matching or overlapping `## PT9 map` headings — it happens when the PRD's
  named systems turn out to share one implementation), merge those maps and run **one**
  archaeologist over the combined map; two would deep-read the same files twice.

Each agent prompt ends with: "Follow the instructions in your agent definition exactly. Return
output in the specified format." Collect every agent's output and status token. If an agent
reports `NEEDS_CONTEXT` (e.g. PT9 not checked out), capture what it asked for — you'll surface it
at the interview.

## Step 5: Interview the user

Before writing the brief, draft the work-item breakdown (rules in Step 6) and collect everything
that **blocks or materially shapes it**:

- CLARIFICATION items the user chose to defer at Step 3.
- Scope calls the investigation surfaced: unclear boundaries, dependencies on functionality that
  doesn't exist yet, places where the PRD's ask is already partly built and the remaining scope
  needs an owner decision.
- Which nice-to-haves to fold into work items now vs. mark "cut first".

Ask these as a short batch of direct questions, **each with a suggested answer** (use the
question tool if available; otherwise plain text). Skip the interview entirely if nothing blocks
the breakdown — don't manufacture questions. Do not invent answers to skipped questions; anything
unresolved goes in brief §5 as a question for the product owner.

## Step 6: Write the brief

Write `.context/research/investigations/$SLUG/brief.md` (use `None.` for empty sections):

```markdown
# {Feature name}: investigation

## 1. What the PRD asks for
{Problem in one short paragraph. Appetite.}

| ID | Non-negotiable |
| NN-1 | {PRD wording} |

| ID | Nice-to-have |
| NTH-1 | {PRD wording} |

No-gos: {list}

## 2. What already exists
- **Paratext 9:** {where the feature lives (file:line) and the behaviors that matter}
- **Paratext 10:** {what already works today, and where}
- **Reusable as-is:** {…}  **Needs building:** {…}

## 3. Proposed work items
| # | Work item | Repo | Complexity | Depends on | Covers |
| WI-1 | {implementation-shaped title} | {repo} | Simple/Moderate/Complex | — | NN-1, NTH-2 |

**WI-1 — {title}.** {What it does. What it produces and which sibling item consumes it. Files it
likely touches. What it deliberately leaves to other items. Any spike to run before its design.}

## 4. Requirement coverage
| Requirement | Work item(s) | Notes |
| NN-1 {short name} | WI-2 | {how it's met} |
| NTH-1 {short name} | WI-4 | included / cut first when time is tight |

## 5. Questions for the product owner
{Each unresolved question, with a suggested answer.}
```

**Work-item rules:**

- **Split along architectural seams, not one item per requirement.** Separate the read path from
  the write path, presentational components from data wiring, and end with an integration item
  that consumes the others. A requirement may need several items; one item may serve several
  requirements.
- **Each item ≈ one PR on one branch.** Titles in implementation terms naming the layer
  ("Update C# comments data provider to expose …", "Create {x} card"), not user-story phrasing.
- **Coverage is the contract:** every NN maps to at least one work item (a gap here means the
  breakdown is wrong or the PRD needs renegotiating — say which); every NTH is either inside an
  item or explicitly "cut first".
- **Complexity** comes from the scout's per-unit tiers (Simple / Moderate / Complex).
  **Never emit time estimates** — no hours, days, or weeks, anywhere.
- Findings that contradict the PRD (feature mostly built already, appetite clearly mis-sized,
  a "port" that never existed in PT9) go in §5 as questions with suggested answers — the PRD is
  the product owner's to change, not yours.

## Step 7: Checkpoint

Present a concise **inline** summary — the work-item table, the requirement-coverage table, and
the §5 questions — and point to the full brief:

> Brief written to `.context/research/investigations/$SLUG/brief.md`. Summary:
> {work items; coverage; open questions}
> This is meant to be discussed between the product owner and the implementation owner and
> revised until the non-negotiables fit the appetite. Tell me what to change and I'll update it.

Iterate on requested changes and re-present. Decide nothing on the user's behalf.

## Step 8: Create the Jira epic + work items (optional, gated)

When the user says the team is happy with the brief, offer to create the epic and work items in
Jira. Follow `.claude/commands/prd-to-jira.md` — do not duplicate its steps here. It is also a
standalone command, so this can happen days later in a fresh session:
`/prd-to-jira .context/research/investigations/$SLUG/brief.md`.

Per-work-item design and implementation planning (e.g. `superpowers:writing-plans`) happen
**after** Jira creation, one work item at a time — not in this command.

## Error handling

- **No PRD path** → ask for it (Step 1).
- **PRD references a PT9 feature not in the inventory** → `feature-mapper` notes the gap;
  `pt9-archaeologist` searches PT9 directly from the PRD's named form.
- **A PT10 repo / PT9 not checked out** → the owning agent degrades and reports what's
  missing; the brief is still produced; surface the gap at the interview/checkpoint.
- **The PRD is part of an epic** (cites sibling PRDs as "separate PRD") → note the dependencies;
  scope the investigation to this one PRD.

## Agent status protocol

The token sets differ by agent: `prd-interpreter` ends with `DONE` / `DONE_WITH_CONCERNS` /
`BLOCKED`; the three investigation agents end with `DONE` / `DONE_WITH_CONCERNS` /
`NEEDS_CONTEXT`. Handle by phase:
- `prd-interpreter`'s `DONE_WITH_CONCERNS` → its `CLARIFICATION-{N}` items trigger the **Step 3
  soundness gate** (stop and ask before investigating); do **not** defer these to the interview.
- an investigation agent's `DONE_WITH_CONCERNS` or `NEEDS_CONTEXT` → material for the Step 5
  interview and brief §5; not a stop.
- any `BLOCKED` → stop-and-ask.
