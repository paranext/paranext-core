# Agentic Engineering Guide

How we build substantial changes with coding agents: a human-operated workflow where design
stays with the person, agents do the typing and the checking, and nothing reaches a pull
request until the review backlog is empty and the planning tree is gone.

This is a **house workflow, not a gate**. Nothing in CI enforces it. It describes what has
worked; deviate when you have a reason, and see [Opting out](#opting-out).

## When it applies

`CONSTITUTION.md` § 2 governs: *"Scale process to the task. Do not impose specification,
planning, or approval ceremony on straightforward work."* That rule wins here.

| Kind of work | What to do |
| --- | --- |
| Typo, comment, version bump, a fix whose shape is obvious | Just do it. No design, no spec, no plan. |
| A bounded change to a flow that already exists | Agree the approach first, then implement. Skip the spec and the plan. |
| New subsystem, cross-process contract, anything that restructures how components fit together | The full workflow below. |

Two clarifications, because they have caused confusion:

- The Superpowers `brainstorming` skill states that its approval gate never scales down. In
  this repository § 2 overrides that for straightforward work. The gate applies from
  "bounded" upward.
- A skill you explicitly invoke keeps its own gates. If a skill defines approval checkpoints,
  those still apply — § 2 governs baseline behaviour, not the internals of a workflow you
  asked for by name. This is § 7's "use skills for specialized repeatable workflows, not
  baseline behavior".

## Prerequisites

Both are per-machine and optional; the repository behaves identically without them.

- **Superpowers** — supplies `brainstorming`, `writing-plans`,
  `subagent-driven-development`, and `verification-before-completion`. Install from the
  official plugin marketplace: `/plugin install superpowers@claude-plugins-official`.
- **roborev** — background review of every commit. Setup, including the failure mode where
  reviews silently never run, is in
  [Code-Review-Guide.md § Automated Per-Commit Review](Code-Review-Guide.md#automated-per-commit-review-roborev-optional).

Without roborev, phases 4 and 5 lose their verification layer and you are relying on PR
review alone to catch what the agent got wrong.

## The workflow

Six phases. You lean in hardest at **1** and **5**; agents run the rest while you hold the
checkpoints.

### 1. Design together

Engage with every design decision yourself. Do not delegate design to an agent and then
approve the result — approving a design you did not participate in is how slop enters a
codebase that otherwise looks reviewed.

Concretely: the agent proposes approaches and trade-offs, you choose. If you find yourself
agreeing to sections you have not thought about, stop and slow the phase down.

### 2. Write the spec

Once the design is settled, turn it into a specification. **The spec is written for the
agents that will implement it, not for you.** If you were genuinely engaged in phase 1, you
do not need to line-read the spec for reassurance — that is what phase 3 is for.

Specs live outside the repository. See [Where artifacts live](#where-artifacts-live).

### 3. Adversarial spec review

A **separate agent session** — one with no memory of the design conversation — reviews the
spec and reports findings. Fix, re-review, repeat until it converges.

The point is independence: a session that helped write the spec will defend it.

> **Honest limitation.** The workflow this is modelled on runs this review on a *different
> model family* from the implementer, so the reviewer does not share the author's blind
> spots. We only have Claude available, so our version is a fresh Claude session — genuinely
> independent of the conversation, but not of the model. Treat it as the weaker form it is:
> it catches contradictions, gaps, and ambiguity well, and shared-model blind spots poorly.
> If a second agent family is ever installed, route this review to it — roborev already
> supports Codex, Gemini, Copilot, and others.

### 4. Plan, then implement in small pieces

Convert the converged spec into an implementation plan (`writing-plans`), then execute it
with a fresh implementer and reviewer per task (`subagent-driven-development`). Commit
frequently, after validating each piece against the spec.

roborev reviews each commit in the background while you keep working.

**Review cadence.** If the plan has more than about ten tasks, pause every five or so and
run `/roborev-fix` so reviews never pile up. For ten tasks or fewer, closing them out at the
end is fine. A stack of unread reviews is the failure mode here: the findings arrive after
the agent has moved on, which is the problem this whole layer exists to avoid.

### 5. Close-out gate

**Both boxes checked before any pull request:**

- [ ] Every roborev review is closed out (`roborev list` shows nothing outstanding).
- [ ] Specs and plans are converted into durable documentation, or deleted.

This is the second place to lean in hard. It is also the easiest phase to skip, because at
this point the code works and the PR is the only thing standing between you and being done.

### 6. Make the work durable

Durable artifacts state their invariants directly, in domain language, at stable paths. A
durable document explains what is true; a planning document explains what someone intended
to do about it on a particular day.

**Planning may point to durable artifacts — never the reverse.** Nothing under
`.context/standards/`, `.claude/rules/`, or the source tree may cite a spec or a plan as its
explanation, because those documents are about to be deleted.

The test: delete the whole planning tree, and the repository still explains itself. The
default branch alone should be enough to operate and recover the system.

In this repository the durable homes are `.context/standards/` (universal policies),
`.claude/rules/` (focused, path-scoped guidance), `.context/research/` (Paratext 9 and
Paratext 10 domain knowledge), and TSDoc/XML doc comments on the API surface itself. See
[.claude/rules/where-to-add-guidance.md](../../.claude/rules/where-to-add-guidance.md) for
which one to pick.

### Then: explain the change, open the PR, own the merge

Agents can do the typing and the checking. You remain accountable for the result.

PR descriptions lead with the outcome in plain language, and describe the pull request as it
exists now — not as a history of the approaches that were tried and discarded. See
`CONSTITUTION.md` § 6.

## Where artifacts live

| Artifact | Where | Why |
| --- | --- | --- |
| Design docs, specs, implementation plans | **Outside the repository** | They are build-time scaffolding. Their value is spent once the work lands. |
| Standards, rules, architecture decisions, API docs | **In the repository** | They state what is true, and stay true after the change ships. |
| Paratext 9 / Paratext 10 domain research | `.context/research/` | Domain knowledge, not planning history. `/investigate-prd` both reads it and writes new investigations into it. |

A planning document lands on the default branch only with a stated reason — for example, a
follow-up PR depends on it — and it is deleted when that reason expires.

This repository has no exceptions to that rule. The one it had —
`.context/designs/`, four planning documents for the PRD tooling — was converted into
[PRD-Tooling-Guide.md](PRD-Tooling-Guide.md) and deleted, which is the worked example of what
phase 6 asks for: the reasoning survived, the plans did not.

## Opting out

- **The workflow** is guidance. Nothing in CI checks it.
- **roborev** is opt-in per developer and completely inert if you have not installed it. See
  the Code Review Guide.
- **Superpowers** is a personal plugin install; this repository neither requires nor
  configures it.
- **`CONSTITUTION.md`** is the one thing that is not optional, because it is imported by
  `CLAUDE.md` and therefore loads for every agent session in this repository. It is 500
  words of default operating behaviour, and § 1 makes direct user instructions and more
  specific repository instructions override it anyway.

## Attribution

The workflow is adapted, with permission of its license, from Wes McKinney's
[How Kenn is doing Agentic Engineering](https://wesmckinney.com/blog/agentic-engineering-aug-2026/)
(August 2026) and the accompanying *How Kenn Builds* diagram. `CONSTITUTION.md` is a pinned
verbatim copy of the [Clanker Constitution](https://github.com/kenn-io/constitution),
© 2026 Kenn Software LLC, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Related Documentation

- [Code-Review-Guide.md](Code-Review-Guide.md) — roborev setup, reviewer and author responsibilities
- [Git-Guide.md](Git-Guide.md) — branch structure, squash-merge
- [Testing-Guide.md](Testing-Guide.md) — what "verified" means here
- [Architecture-Decisions.md](Architecture-Decisions.md) — where a decision goes once it is durable

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-08-14 | Initial version |
