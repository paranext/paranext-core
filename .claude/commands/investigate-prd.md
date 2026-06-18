---
description: Investigate a Shape-Up PRD (port PT9 feature(s) and/or net-new) and produce a discovery brief, then an implementation plan. Pass the PRD path. e.g. /investigate-prd docs/prds/sync-project.md
---

# Investigate PRD

Investigate the PRD at **$ARGUMENTS** and produce a discovery brief, then — after one human
checkpoint — an implementation plan.

## Overview

1. Parse the PRD into a normalized structure + a per-aspect breakdown (port PT9 / net-new / both).
2. Investigate each aspect: map + read PT9 source for port aspects; sweep the PT10 constellation
   always.
3. Synthesize a discovery brief.
4. **Checkpoint** — present the brief; the human reviews / edits / approves.
5. Hand off to `superpowers:writing-plans` to turn the approved brief into an implementation plan.

The command stays thin: it dispatches agents, collates their structured outputs, runs the
checkpoint, and transitions to planning. It owns no investigation logic of its own.

## Repo access

Investigations read sibling checkouts under `~/git/` — `Paratext` (PT9) and the PT10
constellation (`paranext-core`, `paratext-10-studio`, `paratext-bible-extensions`,
`paratext-bible-internal-extensions`). These live **outside this working directory**, so your
file tools (`Read`/`Glob`) can only reach them if they were granted at launch (e.g.
`claude --add-dir ~/git`); Bash can reach them regardless, but the agents rely on `Read` for
their deep source reads. **Step 1 preflights this and warns up front.** If a repo is still
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
(e.g. `Glob ~/git/Paratext/*`, and a `Glob` of each constellation repo — or `Read` a file under
each). Treat an *outside-the-allowed-directories / access* error (not an empty result) as
**unreachable**. If any are unreachable, **stop and warn the user before investigating**:

> ⚠️ My file tools can't read these repos: {list}. Either they aren't granted to me (relaunch
> with `claude --add-dir ~/git`) or they aren't checked out under `~/git/`. Without them I'll
> degrade — fall back to the bundled inventory and flag the gaps. Proceed degraded, or relaunch?

An unreachable **constellation** repo degrades `pt10-reuse-scout` (affects every PRD — it always
runs); an unreachable **`~/git/Paratext`** degrades `pt9-archaeologist` (only matters if the PRD
ports PT9 features). Wait for the user. If they choose to proceed, continue and let the agents
degrade per their own `## Degradation` rules.

## Step 2: Interpret the PRD

Dispatch the `prd-interpreter` agent with the Agent tool (`subagent_type: "prd-interpreter"`),
passing `PRD_PATH: $ARGUMENTS`. Read its Aspect Breakdown and its status token.

## Step 3: Soundness gate (present, don't decide)

If `prd-interpreter` returned `DONE_WITH_CONCERNS` with `CLARIFICATION-{N}` items, **STOP** and
present them to the user before investigating:

> The PRD has open questions that affect the investigation:
> {list each CLARIFICATION-N with its suggested resolution}
> Want me to proceed with my best assumptions, or would you like to clarify first?

Wait for the user. Do not invent answers.

## Step 4: Investigate (parallel fan-out)

Dispatch the investigation agents. `pt10-reuse-scout` **always** runs. For each aspect tagged
`PT9-port` or `hybrid`, run `feature-mapper` then `pt9-archaeologist` (the map feeds the
archaeologist). A fully net-new PRD runs only the scout.

- **Wave A (single response, in parallel):** one `feature-mapper` (`subagent_type: "feature-mapper"`,
  pass that aspect's `PT9_REFERENCES`) per port/hybrid aspect, **and**
  `pt10-reuse-scout` (`subagent_type: "pt10-reuse-scout"`, pass the PRD summary **and the aspect
  breakdown** — the scout sweeps the constellation by each port aspect's PT9 form/category). Dispatch
  all of these in one message.
- **Wave B (single response, in parallel):** for each `feature-mapper` that returned a map, one
  `pt9-archaeologist` (`subagent_type: "pt9-archaeologist"`, pass that aspect's `PT9_MAP`). Pair
  each archaeologist with the `feature-mapper` output whose `## PT9 map: {feature}` heading matches
  that aspect — keep the aspect → mapper → archaeologist correspondence strictly 1:1.

Each agent prompt ends with: "Follow the instructions in your agent definition exactly. Return
output in the specified format." Collect every agent's output and status token. If an agent
reports `NEEDS_CONTEXT` (e.g. PT9 not checked out), capture what it asked for — you'll surface it
at the checkpoint.

## Step 5: Synthesize the discovery brief

Write `.context/research/investigations/$SLUG/brief.md` with these sections (use `None.` for empty ones):

```markdown
# Discovery brief: {PRD problem name}

## 1. Feature summary
Problem, appetite, non-negotiables, no-gos (from the PRD).

## 2. Aspect breakdown
Each aspect tagged: ports PT9 feature {X} / net-new / hybrid.

## 3. PT9 reference  (port/hybrid aspects)
Where the logic lives (forms/data/flow at file:line), key behaviors, the backend it talks to.

## 4. PT10 landscape
What already exists across the constellation, where the feature should live, reuse-vs-build.

## 5. Open questions & rabbit holes
From the PRD + anything investigation surfaced (incl. any agent NEEDS_CONTEXT requests).

## 6. PRD alignment
| PRD section | Original | Discovery finding | Proposed update |
Reconcile the PRD against what investigation found (scope expansion/reduction, goal conflicts,
missing success criteria, complexity surprises).

## 7. Scope decisions  (present options, do NOT auto-decide)
For each unclear boundary, dependency on un-built functionality, or heavy sub-flow, a 3-way
option set — **reduce / expand / stub-or-defer** — each with a size + reuse + required-vs-optional
summary and a recommendation. These are for the human to decide at the checkpoint.

## 8. Recommended first slice
The smallest valuable increment that fits the appetite. This seeds the implementation plan.
```

## Step 6: Checkpoint (the one human gate)

Present a concise **inline** summary — the aspect breakdown, the Scope decisions (§7) with your
recommendations, and the Recommended first slice (§8) — and point to the full brief:

> Discovery brief written to `.context/research/investigations/$SLUG/brief.md`. Summary:
> {aspect breakdown; scope options with recommendations; recommended first slice}
> Review and edit the brief as you like. Approve it (or tell me what to change) and I'll turn it
> into an implementation plan.

Wait for approval. If the user requests changes, update the brief and re-present. Decide nothing
on the user's behalf.

## Step 7: Hand off to planning

On approval, invoke the **superpowers:writing-plans** skill to turn the approved brief —
especially §8 (the first slice) — into an implementation plan. Pass the brief path as context.

## Error handling

- **No PRD path** → ask for it (Step 1).
- **PRD references a PT9 feature not in the inventory** → `feature-mapper` notes the gap;
  `pt9-archaeologist` searches PT9 directly from the PRD's named form.
- **A constellation repo / PT9 not checked out** → the owning agent degrades and reports what's
  missing; the brief is still produced; surface the gap at the checkpoint.
- **The PRD is part of an epic** (cites sibling PRDs as "separate PRD") → note the dependencies;
  scope the investigation to this one PRD.

## Agent status protocol

The token sets differ by agent: `prd-interpreter` ends with `DONE` / `DONE_WITH_CONCERNS` /
`BLOCKED`; the three investigation agents end with `DONE` / `DONE_WITH_CONCERNS` /
`NEEDS_CONTEXT`. Handle by phase:
- `prd-interpreter`'s `DONE_WITH_CONCERNS` → its `CLARIFICATION-{N}` items trigger the **Step 3
  soundness gate** (stop and ask before investigating); do **not** defer these to §5.
- an investigation agent's `DONE_WITH_CONCERNS` or `NEEDS_CONTEXT` → material for §5 (open
  questions) and the checkpoint; not a stop.
- any `BLOCKED` → stop-and-ask.
