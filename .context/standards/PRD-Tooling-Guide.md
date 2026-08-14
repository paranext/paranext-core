# PRD Tooling Guide

Why the PRD tooling is shaped the way it is: three sibling commands over four reusable agents,
serving two audiences that must not be mixed.

The command and agent files hold the mechanics and are authoritative for behaviour. This
document holds the reasoning behind their shape — the decisions that are expensive to rediscover
and easy to undo by accident.

| Piece | File |
| --- | --- |
| `/refine-prd` — PRD coach for Epic Leads | [`.claude/commands/refine-prd.md`](../../.claude/commands/refine-prd.md) |
| `/investigate-prd` — engineering investigation | [`.claude/commands/investigate-prd.md`](../../.claude/commands/investigate-prd.md) |
| `/prd-to-jira` — brief to tickets | [`.claude/commands/prd-to-jira.md`](../../.claude/commands/prd-to-jira.md) |
| `prd-interpreter` · `feature-mapper` · `pt9-archaeologist` · `pt10-reuse-scout` | [`.claude/agents/`](../../.claude/agents/) |
| Paratext 9 Feature Inventory | [`.context/research/paratext-9-features/`](../research/paratext-9-features/README.md) |

A PRD is a Shape Up document. `category` and `systems involved` are the fields that bridge it to
the Feature Inventory and to Paratext 9.

## Two audiences, kept apart

This is the invariant the whole design serves. Epic Leads own the PRD; engineers own the
investigation. Dragging an Epic Lead into implementation detail is the failure mode the tooling
exists to prevent.

- `/refine-prd` speaks product language only. It never emits `file:line`, repo names, class
  names, or time estimates, and it never rewrites the PRD's prose — it suggests at capability
  level and the human drafts. The PRD is the Epic Lead's to change.
- `/investigate-prd` is an engineering task and may be as technical as it needs to be.
- Inside the brief, the two are separated by an explicit routing test: **could someone who
  doesn't read code answer this?** Yes → *Questions for the product owner*. No → *Engineering
  decisions*. Every brief section also carries an audience tag so a reader knows what is theirs.

## Why four agents rather than one

The command is a thin orchestrator: it dispatches agents, collates their structured output,
runs one human checkpoint, and hands off to planning. It owns no investigation logic.

The four agents split along **when they run**, not merely by topic — which is what makes the
split earn its keep:

- `prd-interpreter` — always. Parses the PRD and produces the aspect breakdown.
- `feature-mapper` — only when an aspect ports a Paratext 9 feature. Inventory lookup.
- `pt9-archaeologist` — only for port aspects, and only when the PT9 source is reachable.
- `pt10-reuse-scout` — always. For net-new aspects it is the primary investigation.

A single agent would run all of it every time. Because a PRD is classified **per aspect** rather
than carrying one PORT-or-NET-NEW label, one PRD can port a PT9 feature *and* introduce
something new; a fully net-new PRD simply never dispatches the two PT9 agents. The agents are
also independently invocable, and merging them would remove that.

Merging `feature-mapper` into `pt9-archaeologist` was considered and rejected during planning:
inventory lookup succeeds in cases where reading PT9 source is impossible, and collapsing them
loses the graceful-degradation path below.

## Why `/refine-prd` is a sibling command, not a mode

A `--coach` flag on `/investigate-prd` was designed and rejected. The reasons are worth keeping,
because "just add a flag" is the obvious-looking suggestion that will recur:

- It forked the prose in seven to nine places, leaving roughly 40% of the document dead on any
  given run.
- It forced a single frontmatter description to address two different audiences, which is
  precisely the separation this tooling exists to maintain.
- Repository precedent is uniformly sibling commands sharing agents, never mode flags that
  change a command's workflow identity.

The two commands share agents instead. `pt10-reuse-scout` takes a `DEPTH` input — `full`
(default) or `capability-scan` — so the coach gets a shallow "what related capability already
exists, and in which product mode?" answer without command-surface mapping or reuse-vs-build
classification. The scout still cites `file:line` internally as its own quality bar; translating
to product language is the *coach command's* job, not the agent's.

## Access model and degradation

- **The bundled Feature Inventory is canonical.** It was brought over once and has no upstream
  sync. Correct it in place.
- **Sibling repositories are read live** from the `~/git/<repo>` convention: `Paratext` (PT9
  source), `paranext-core`, `paratext-10-studio`, `paratext-bible-extensions`,
  `paratext-bible-internal-extensions`.
- **Absence degrades, it does not fail.** Any unreachable repository is reported as a named gap
  and the brief is still produced from what is available. `/refine-prd` skips its PT10 scan with
  an explicit note rather than guessing.

## Standing invariants

These are load-bearing. Changing one changes what the output is worth.

- **The inventory is corrected in the same change that contradicts it.** When investigation
  disproves the bundled inventory, the run says so and the fix lands with it. Everything the
  coach asserts about PT9 is capped by the bundle's accuracy — this is not hypothetical: the
  inventory once asserted F9 = Send/Receive, which two archaeology runs disproved.
- **Present options, do not auto-decide.** Scope decisions reach the human as a three-way option
  set (reduce / expand / stub-or-defer) with a recommendation, at the checkpoint.
- **No Paratext 10 implementation leakage in archaeology.** `pt9-archaeologist` records what
  exists and where, at `file:line`. Proposing PT10 service names or signatures belongs to
  `pt10-reuse-scout`, and mixing them produces confident designs built on unverified ground.
- **Facts get answered, decisions get asked.** Before a question enters the brief it is
  classified fact-vs-decision; fact-shaped ones get at most one bounded follow-up dispatch. Only
  unresolvable facts and genuine decisions survive. A finding with no decision attached is not a
  question and belongs in the landscape section.
- **In-flight work counts as existing work.** The scout checks open PRs and recent merges on
  relevant paths, not just the current tree.

## Deliberately not included

The tooling replaced a phase-gated automated porting pipeline, and kept its investigation
technique while dropping its harness. Not present, and not to be reintroduced without a reason
that names what changed: phase gates and `phase-status` bookkeeping, golden-master and
characterization capture, traceability ID schemes, the split-PR lifecycle, step-reviewer and
iterate-until-good loops, capability isolation, and the utility registry. The tooling produces a
brief and a plan, not gated artifacts.

Two further ideas were considered and rejected in the second round:

- **A maintained "what Paratext 10 ships today" summary document** — it would go stale in weeks;
  one feature went from PRD to shipped in about one. The live capability scan replaces it.
- **The coach answering engineering questions** — it validates that they are logged and routed
  correctly, and nothing more.

One exception is worth noting because it looks like a contradiction: the architecture-decisions
log was *not* dropped along with the pipeline's ADR governance gate. The heavy gate machinery
went; a lightweight, gate-free log stayed, and `pt10-reuse-scout` reads it. See
[Architecture-Decisions.md](Architecture-Decisions.md).

## Related Documentation

- [Agentic-Engineering-Guide.md](Agentic-Engineering-Guide.md) — the surrounding workflow
- [Architecture-Decisions.md](Architecture-Decisions.md) — where a decision goes once it is durable
- [`.claude/rules/architecture/discover-before-implementing.md`](../../.claude/rules/architecture/discover-before-implementing.md) — the rule `pt10-reuse-scout` composes with

## Version Log

| Version | Date       | Change                                                                     |
| ------- | ---------- | -------------------------------------------------------------------------- |
| 1.0.0   | 2026-08-14 | Initial version — durable rationale converted from `.context/designs/`      |
