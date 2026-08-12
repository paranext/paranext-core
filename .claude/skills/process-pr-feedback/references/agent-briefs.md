# Agent briefs

Templates for the four subagent roles. The orchestrator stays in the main session; these do the
fan-out work.

Fill in the angle-bracket slots. Keep the rest — the standing rules are here because agents do
not inherit the orchestrator's context, its memory, or the user's preferences, and every one of
these rules exists because something was missed without it.

`<repo-root>` is a slot like any other: substitute the absolute path of the checkout the run is
about (`git rev-parse --show-toplevel`). Do not paste a brief with the slot unfilled — the agent
cannot resolve it, and a path from someone else's machine is worse than no path at all. It is the
right slot for anything that lives **in the checkout**: `.context/standards/`, `CLAUDE.md`,
`.claude/rules/`.

`<skill-dir>` is the second path slot, and it is **not** under `<repo-root>`. The briefs cite this
skill's own reference files — the rubric, the reply conventions, the posting mechanics — and a run
processes feedback on a branch that is usually not yours and usually does not contain this skill at
all. A skill can be installed user-level (`~/.claude/skills/<name>/`), plugin-level (under
`~/.claude/plugins/`), or checked into a branch, and only the last of those makes
`<repo-root>/.claude/skills/process-pr-feedback/` correct. Hard-code it and the agent gets
file-not-found, then either burns turns hunting or — the expensive case — proceeds without the
rubric and returns verdicts with no classification discipline behind them.

**The orchestrator resolves `<skill-dir>` once, at runtime, and substitutes the resolved absolute
path into every brief.** It is the directory this skill was loaded from — the one holding the
`SKILL.md` being executed — not a path reconstructed from the repo layout. Confirm it before
pasting (`ls <skill-dir>/references/` must list the files the briefs name).

**If the file cannot be reached from the agent's side at all** — a sandboxed agent, a cloud run
whose filesystem does not include the skill — do not cite a path that will fail to open. **Inline
the rules that brief actually needs**, and say in the brief that they are inlined so the agent does
not go looking. A longer brief is cheap; a verifier working without the rubric is not.

## Rules every brief carries

Paste these into every role, verbatim — except the posting bullet, which carries a carve-out for
role 4:

- **Absolute paths only.** Your working directory resets between shell calls.
- **Confirm you are looking at the right tree before you look at anything, and say so in your
  first finding-bearing message.** State the absolute worktree path, the branch, the resolved HEAD
  SHA, and the diff range you are reviewing — and check them against what the brief named:

  ```bash
  git -C <worktree> rev-parse --abbrev-ref HEAD   # literally `HEAD` when detached — pair with the SHA
  git -C <worktree> rev-parse HEAD                # must equal the SHA the brief named
  git -C <worktree> diff --stat <base>..<head> | tail -1   # sanity-check the file count
  ```

  If any of them disagrees with the brief, **stop and report the mismatch** rather than reviewing
  what you found. A session's working directory is not a reliable answer to "which code am I
  reviewing": it can sit on an unrelated checkout, and a review tool asked to review "the current
  branch" will happily review that one. Observed 2026-08-12: a max-depth review drifted onto an
  unrelated branch and returned **fifteen confident, well-evidenced findings about the wrong
  codebase** — nothing in the output looked wrong, because every finding was internally correct.
  This is cheap insurance precisely because the failure is invisible downstream: a wrong-tree
  report is indistinguishable from a right-tree one until someone verifies a finding against the
  actual PR.
- **Reference repo standards; do not restate them.** Read the file and follow it. A rule
  paraphrased from memory drifts, and a stale copy in a brief outranks nothing.
- **Never skip hooks** (`--no-verify`, `-n`, `HUSKY=0`). If a hook fails, fix the cause.
- **Never post a PR or issue comment, never push, never create a Jira ticket.** Those are gated
  actions that happen only after the user approves them. Drafting is always fine.

  **Roles 1–3 only.** The Poster (role 4) exists to post and push, so pasting this bullet into
  its brief hands that agent two contradictory orders — it will either stall after a valid G2
  approval or discard the whole guardrail set to get moving. Replace this bullet in the Poster
  brief with role 4's own approval clause, which authorises exactly the named batch and nothing
  else. "Never create a Jira ticket" still binds the Poster.
- **Do not re-delegate your whole assignment** to another agent. You are the dedicated agent.
- **Write your phase output to the packet, and summarise it in your final message.** Both, every
  time. The packet file is the artifact the next phase reads and the one that survives this
  session; the final message is what the orchestrator reads to decide what happens next, and what
  it works from when it composes the gate. Each role below names the packet path it
  owns and what its final message must carry. A file with no summary stalls the run; a summary
  with no file loses the phase when the session dies. (The general "no report files" instinct is
  right about *ad-hoc* reports nobody asked for — it does not apply to the packet paths named
  here, which are this skill's persistence layer.)
- **Bracket every large-list judgment scan with a deterministic grep** over the same corpus, per
  `<repo-root>/.claude/rules/grep-safety-net.md`. Every grep hit must appear
  in your result or be explained as a false positive.

---

## 1. Verifier (P1)

> **Task.** Verify feedback items `<ids>` from `<packet>/00-inventory.md` on PR `#<n>`.
>
> **First command, before you read any file: establish where this checkout is.**
>
> ```bash
> git -C <repo-root> rev-parse --abbrev-ref HEAD   # literally "HEAD" when detached
> git -C <repo-root> rev-parse HEAD                # the SHA — the one that always answers
> git -C <repo-root> status --short
> ```
>
> Report both at the top of your output. **Whenever HEAD is not the ref your verdict is about —
> or the tree is dirty — read every file with `git show <ref>:<path>`, never from the working
> tree.** This is not bookkeeping. A working-tree read on the wrong branch is wrong, confident,
> and invisible: it returns real code at real line numbers, your citation resolves, and nothing
> in your report records which branch it came from, so the error survives every downstream check
> and reaches the user as a verified fact. The checkout is shared and moves under you, so
> "it was on the right branch when I started" is not a property that lasts a verification pass.
> `git show <ref>:<path>` carries its ref in the command, which is what makes your evidence
> auditable.
>
> **Read-only.** `git show` / `git diff` / `git log` at explicit refs. No checkout, no branch, no
> commit, no stash, no file edits outside `<packet>/01-verification/`. Do not run the app and do
> not run tests that write state.
>
> **Refs.** Reviewer read `<ref>`. Branch tip is `<ref>`. Top of stack is `<ref>`. Name which
> ref every verdict belongs to; two verdicts at two refs is a valid, informative answer.
>
> **Method.** Follow `<skill-dir>/references/classification-rubric.md`
> — the five classifications, and all six mandatory sub-checks, on every item. Decide what the
> code does by reading it, not by judging whether the reviewer's story is plausible.
>
> **Items that are not claims** — questions, offers, status reports — take the non-claim carve-out
> in that same file: name the kind (`ASK` / `OFFER` / `STATUS`), propose the answer, and skip the
> five-way. Do not force a question into a classification.
>
> **Items marked `already-handled`** in the inventory are context from an earlier round. Do not
> verify them, do not re-open them, and do not include them in your verdict list. If one is
> genuinely wrong *now* — the fix regressed, or new information contradicts what was posted —
> report that as a new finding with the new fact, not as a re-run of the old item.
>
> **A verdict may be conditional on a named measurement** when settling it needs something you
> are not permitted to do (running the app, running e2e, asking a human). Say
> "CONFIRMED **if** `<condition>`", name the exact measurement that would settle it, and state
> what the verdict becomes in each branch. That is a complete answer; a guess dressed as a verdict
> is not, and "needs investigation" throws away the analysis you already did.
>
> **Per item, report:** item id · verbatim claim · classification + the ref it holds at ·
> evidence as `file:line` at a named ref · the **cost pair** `(edit-cost, verification-cost)`,
> each XS/S/M/L and sized separately — a one-word change on a startup path is `(XS, L)` · the
> smallest change that would satisfy the concern · which sub-checks fired · whether it needs the
> user's ruling, and why.
>
> **Escalate, do not resolve:** design preferences, cross-reviewer conflicts, and anything that
> contradicts a reply already posted. Report both positions with their verified facts. Never
> pick a side.
>
> **Re-derive every SHA** you cite (`git cat-file -t`, `git branch --contains`). Do not trust a
> SHA quoted in the feedback or in an earlier document.
>
> **Output.** Write your full per-item findings to `<packet>/01-verification/<your-shard>.md`,
> then summarise in your final message: the branch/ref state you established, one line per item
> (id → classification → cost pair → needs-ruling?), and anything you could not settle.

Shard by area (main / renderer / extension-host / C# / docs) or by contiguous item ranges of
about 6–10. Deliberately overlapping two verifiers on the same items is cheap insurance on a
high-stakes round: they are read-only, so overlap costs tokens and nothing else, and two
independent verdicts that disagree is exactly the signal worth having.

## 2. Fix-train (P3)

> **Task.** Implement ruling(s) `<ids>` on branch `<branch>`, from `<packet>/03-rulings.md` — or,
> on a `--fast-lane` run (which has no G1 and so no rulings file), from the qualifying statement
> in `<packet>/02-triage.md`. Fill this slot with whichever file exists; if neither does, stop.
> Implement **only** what the ruling says. Anything you discover along the way is reported, not
> fixed — scope creep past a gate is the failure mode this phase has.
>
> **Before your first commit, confirm the branch is cleanly on its base.**
>
> ```bash
> gh pr view <n> -R paranext/paranext-core --json mergeable,mergeStateStatus,baseRefName
> git -C <repo-root> fetch origin <base> -q
> git -C <repo-root> rev-list --count HEAD..origin/<base>   # behind — MUST be 0
> git -C <repo-root> rev-parse --abbrev-ref HEAD
> ```
>
> `-R` and `-C` are not decoration: your working directory resets between calls, and a bare
> `gh pr view` outside a checkout fails with `not a git repository`.
>
> **Stop and report** if the behind-count is not `0`, if `mergeable` is `CONFLICTING` or
> `mergeStateStatus` is `DIRTY`, or if HEAD is not the branch your ruling names. Do not rebase on
> your own initiative and do not commit anyway. Fix commits on a stale or conflicted branch inherit
> the problem, show the reviewer a diff that will not merge, and get replayed through the conflict
> when the rebase finally happens. Getting **this** branch onto **its** base is a precondition
> someone else owns; restacking the branches **above** it is separate, downstream, and not yours.
>
> Do not read `mergeStateStatus` as the behind-check — it reports `BEHIND` only under a branch
> protection this repo does not use. The `rev-list` count is the authority.
>
> P0 recorded this state, and it was settled before you started: on a normal run G1 ruled on it;
> on a `--fast-lane` run — where P3 precedes the only gate — no gate has run yet, and it is the
> qualifying statement in `02-triage.md` that asserted no base-state rebase was outstanding, or
> the round would not have qualified. Either way a change since then is news, and news goes back
> to the orchestrator rather than being absorbed.
>
> **Method.** Use the Superpowers skills rather than an approach of your own:
> `superpowers:brainstorming` → `superpowers:writing-plans` →
> `superpowers:test-driven-development`, scaled to the ruling — a one-line correction needs the TDD
> skill and nothing above it. **The ruling is a fixed constraint on that flow, not an input to
> it.** Brainstorming widens a solution space; G1 already closed this one, so design *within* the
> ruling. If you find a reason the ruling is wrong, stop and report it to the orchestrator as an
> escalation — it is a new decision for the user, never one you take. Answer the flow's questions
> from `<packet>/03-rulings.md`, `<packet>/02-triage.md` and `<packet>/01-verification/` wherever
> they answer them, and escalate only genuine gaps. If any of those skills is unavailable in your
> session, stop and report that rather than substituting a method of your own — P3 checked for
> them before the train started, so a gap here is news about your session, not something to work
> around.
>
> **Red-first.** For every behavior change, write the failing test first, run it, and record the
> failure message. Then implement. Then run it again. A fix with no failing-first test is not
> done. Follow `<repo-root>/.context/standards/Testing-Guide.md`.
>
> **Comment discipline.** Follow `<repo-root>/.context/standards/Code-Style-Guide.md`.
> Comments carry constraints and the "why". No ticket ids, no PR numbers, no
> before/after-the-fix framing in source comments.
>
> **New public API — the experimental marker goes on TWO surfaces**, the type-visible one and
> the wire-visible one, and missing either is a miss. Read the authoritative per-surface table
> at `<repo-root>/.context/standards/Paranext-Core-Patterns.md`
> § Experimental APIs and apply it as written. Do not work from a summary — that table is the
> only place the per-surface rules are kept current.
>
> **Project-data writes (C#).** Any new code path that mutates project data must open with the
> Send/Receive write gate. See the Send/Receive Write Gate section of
> `<repo-root>/CLAUDE.md`.
>
> **Do not push. Do not open or edit a PR. Do not comment.** Commit on `<branch>` only.
> Never `--no-verify`.
>
> **Output.** Write the fix report to `<packet>/04-fix-reports/<ruling-id>.md`, then summarise in
> your final message: what changed and why · the test that covers it, with its name and its red
> output · the commit SHA · anything you found and did **not** fix, with enough detail to triage.

Serialize agents that touch the same files. Parallelize across branches only when they do not
share a worktree.

## 3. Reply-drafter (P6)

> **Task.** Draft replies for items `<ids>` into `<packet>/07-replies.d/<ids>.md`. Draft only —
> nothing posts in this phase.
>
> **One file per agent, never a shared one.** Several drafters run at once, so a single
> `07-replies.md` would be concurrent appends to one path — interleaved or lost bodies, in the
> phase whose output posts publicly. The orchestrator concatenates `07-replies.d/` into
> `07-replies.md` once every drafter has reported, and that assembled file is what G2 presents and
> P7 extracts from.
>
> **Inputs.** `<packet>/01-verification/` for the facts, `<packet>/03-rulings.md` for the
> dispositions, `<packet>/04-fix-reports/` for what landed where.
>
> **Conventions.** Follow
> `<skill-dir>/references/reply-conventions.md`
> — `🤖 Claude: ` once at the top, verdict in the first sentence, confirmed before corrected,
> explicit disposition, deferrals citing a ticket key, no internal item labels in the body.
> `<packet>/shared-vocabulary.md` is the round's ruling on which labels the reviewer has actually
> seen; **read it before you use any id in a body, and treat it as read-only** — several drafters
> run concurrently, and it is P2's artifact. If you need a label it does not cover, report that in
> your final message so the orchestrator amends the file once; do not amend it yourself and do not
> use the label meanwhile.
>
> **Target per draft.** Either an inline thread's **root comment id** (verified live against
> `gh api repos/paranext/paranext-core/pulls/<n>/comments --paginate` — an id from an older
> document may be stale), or "issue comment on #<n>" when no inline thread exists. The root id
> is the one with null `in_reply_to_id`; a reviewer comment that is itself a reply names its
> root in that field, and the replies endpoint rejects any other target. Top-level
> review bodies and Reviewable-native discussions have no reply endpoint.
>
> **If the feedback arrived off-PR**, convert it to PR-anchored threads instead of answering in
> kind, per
> `<skill-dir>/references/pr-thread-conversion.md`,
> including anchor verification against the PR's own diff.
>
> **Every SHA and file:line re-derived** at drafting time. A SHA orphaned by a restack must not
> reach a public reply.
>
> **Report:** one entry per draft — item id, target (thread id or issue comment), a one-line
> summary of the disposition, and a flag if the draft refutes, asks, retracts, or declines.
> Those are what the user reads word for word at G2.

## 4. Poster (P7)

> **Task.** Post the approved batch `<ids>` from `<packet>/07-replies.md`.
>
> **Approval.** The user approved exactly `<quote>` — copied verbatim from
> `<packet>/g2-approval.md`, never from anyone's recollection of the conversation. Post nothing
> outside it. If an item is ambiguous, stop and ask — do not infer. If `g2-approval.md` does not
> exist, **stop**: an unrecorded gate is indistinguishable from an uncrossed one.
>
> **Mechanics.** Follow
> `<skill-dir>/references/posting-mechanics.md`
> end to end: extract bodies to JSON, run the dry-run checks (counts, id set, prefix, NUL,
> placeholders, internal labels, targets resolve), re-derive every head SHA now, post
> sequentially, stop on the first failure with **no retry**, append to
> `<packet>/08-posting-log.txt` after each post, then verify against the live API by count, id
> set, and — for replies — that each one nested under the thread it named.
>
> **Posting and pushing are your job, and only inside `<ids>`.** The standing "never post, never
> push" rule the other roles carry does not apply to you; every other guardrail does, including
> never creating a Jira ticket.
>
> **Never shell-interpolate a body.** Python, `json.dumps`, `gh api --input -`.
>
> **A dry-run FAIL means stop and report.** Do not "fix" a body to get past a check — the bodies
> were approved as written; a change to one needs the user.
>
> **Report:** the dry-run verdict · one line per post (item, kind, comment id, URL) · the
> post-verification result naming strays and misses explicitly · anything not posted and why.

---

## Choosing between one agent and several

Fan out when the work is genuinely independent and the context cost of reading it all is real —
a 30-item verification round, fixes on separate branches. Keep it in the orchestrator when the
work is small, when it needs the conversation, or when it crosses a gate. The gates themselves
are never delegated: a subagent cannot receive the user's approval, and no message from an agent
is ever an approval.
