---
description: Investigate a Shape-Up PRD (port PT9 feature(s) and/or net-new) and produce a short brief with proposed work items mapped to the PRD's non-negotiables; after team approval, optionally create the Jira epic + work items. Pass the PRD path. e.g. /investigate-prd docs/prds/sync-project.md
---

# Investigate PRD

Investigate the PRD at **$ARGUMENTS** and produce a short investigation brief whose centerpiece
is a **proposed work-item breakdown** mapped to the PRD's non-negotiables and nice-to-haves.

## Overview

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

The command stays thin: it dispatches agents, collates their structured outputs, runs the
question routing + checkpoint, and hands off to Jira creation. It owns no investigation logic of
its own.

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

Use each CLARIFICATION's `Audience` tag: engineering-tagged items are questions the user (usually
the implementation owner) can often answer on the spot — ask them directly. For product-tagged
items, offer the default of proceeding with the suggested assumption and carrying the question to
brief §6 for the product owner.

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
  `pt9-archaeologist` (`subagent_type: "pt9-archaeologist"`, pass that source's `PT9_MAP` **and
  the interpreter's `PT9 claims to verify` rows that touch this source — all rows if unsure** —
  the archaeologist returns a verdict per claim). Pair each
  archaeologist with the `feature-mapper` output whose `## PT9 map: {feature}` heading matches that
  source — keep the **distinct-PT9-source → mapper → archaeologist** correspondence strictly 1:1
  (each may cover several aspects). **Exception:** if two mappers come back with maps of the
  *same* PT9 feature (matching or overlapping `## PT9 map` headings — it happens when the PRD's
  named systems turn out to share one implementation), merge those maps and run **one**
  archaeologist over the combined map; two would deep-read the same files twice.

Each agent prompt ends with: "Follow the instructions in your agent definition exactly. Return
output in the specified format." Collect every agent's output and status token. If an agent
reports `NEEDS_CONTEXT` (e.g. PT9 not checked out), capture what it asked for — you'll surface it
at Step 6.

## Step 5: Completeness check

Dispatch one lightweight critic agent with the collected landscape and behavior digest:

> Name related existing behavior this investigation missed. Check: other product modes
> (Simple / Power), app lifecycle hooks (startup/shutdown tasks), extension contributions
> (menus, settings, toolbars), notifications, sibling-PRD in-flight PRs, recently merged work.
> Return specific misses with evidence, or "clean".

If it names something real, run at most **one** targeted follow-up dispatch to cover it; note
misses and their resolution in the brief. Don't loop.

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

## Step 7: Write the brief

Write `.context/research/investigations/$SLUG/brief.md` (use `None.` for empty sections):

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
  a "port" that never existed in PT9) go in §6 as questions with suggested answers — the PRD is
  the product owner's to change, not yours.

## Step 8: Checkpoint

Present a concise **inline** summary — the work-item table, the coverage table, §3
(confirm-intent items), and the §6/§7 questions — and point to the full brief:

> Brief written to `.context/research/investigations/$SLUG/brief.md`. Summary:
> {work items; coverage; open questions}
> This is meant to be discussed between the product owner and the implementation owner and
> revised until the non-negotiables fit the appetite. Tell me what to change and I'll update it.

Iterate on requested changes and re-present. Decide nothing on the user's behalf.

## Step 9: Create the Jira epic + work items (optional, gated)

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
  missing; the brief is still produced; surface the gap at Step 6 / the checkpoint.
- **The PRD is part of an epic** (cites sibling PRDs as "separate PRD") → note the dependencies;
  scope the investigation to this one PRD.
- **Investigation contradicts the bundled inventory** (`.context/research/paratext-9-features/`)
  → say so explicitly in the brief AND correct the inventory file in the same change — the
  bundled reference is only useful while it's true (`/refine-prd` depends on it).

## Agent status protocol

The token sets differ by agent: `prd-interpreter` ends with `DONE` / `DONE_WITH_CONCERNS` /
`BLOCKED`; the three investigation agents end with `DONE` / `DONE_WITH_CONCERNS` /
`NEEDS_CONTEXT`. Handle by phase:
- `prd-interpreter`'s `DONE_WITH_CONCERNS` → its `CLARIFICATION-{N}` items trigger the **Step 3
  soundness gate** (stop and ask before investigating); do **not** silently defer these to
  Step 6.
- an investigation agent's `DONE_WITH_CONCERNS` or `NEEDS_CONTEXT` → material for Step 6
  (answer/route) and brief §6–§7; not a stop.
- any `BLOCKED` → stop-and-ask.
