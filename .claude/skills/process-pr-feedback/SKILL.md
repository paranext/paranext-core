---
name: process-pr-feedback
description: "[paranext-core ONLY] Work a round of reviewer feedback on a paranext-core PR end to end: check the branch, verify each item is real, propose fixes, implement, self-review, verify live, draft replies, then push and post. Two hard stops where the user rules. Use when handling PR review comments, a review round, reviewer findings, or a feedback document tied to a PR."
---

# Process PR feedback

```
/process-pr-feedback <pr>… [--scout-only]
```

Pass every PR the round covers — one reviewer's round routinely spans a stack, and splitting it
into one run per PR makes the user rule on half an argument twice.

**Eleven steps. Two hard stops: 4 and 9.** Nothing is pushed or posted before 10. Approval is
per-run and explicit — a general "keep going" crosses neither stop.

## Working notes

Keep the round's notes in `.feedback-packets/<pr>[-<pr>…]-<YYYY-MM-DD>/`, repo-relative so they sit
beside the checkout they are about. Create it self-ignoring rather than touching the repo's
`.gitignore` — the branch is usually not yours, and an ignore entry would land in the reviewer's
diff:

```bash
mkdir -p .feedback-packets && printf '*\n' > .feedback-packets/.gitignore
git check-ignore -v .feedback-packets/<dir>/findings.md   # must name the packet-local .gitignore
```

Three files, written as you go: `findings.md` (steps 1–3), `rulings.md` (step 4, verbatim),
`replies.md` (step 8). Sessions die; notes don't. A second round the same day gets `-2`.

---

## 0. Is the branch in good shape?

```bash
gh pr view <pr> --json state,isDraft,mergeable,mergeStateStatus,baseRefName,headRefOid
gh api repos/paranext/paranext-core/compare/<base>...<headRefOid> --jq '{ahead_by,behind_by}'
```

`behind_by > 0` or `mergeable: CONFLICTING` → **rebase before anything else**; every fix estimate is
against a tree that will change. On a stack each PR's base is the branch below it, not `main`.

Two traps:
- **`mergeStateStatus` cannot answer the behind-question.** It reports `BEHIND` only under a branch
  protection this repo does not use, so a badly stale branch reads `BLOCKED` or `CLEAN`.
- **A conflicted PR silently stops CI.** GitHub cannot compute a merge ref, so no `pull_request`
  workflow runs at all. "No checks reported" is not "checks passed".

Rebasing is the user's call or an explicit hand-back; no step here rebases on its own initiative.

## 1. Read the feedback

```bash
gh api repos/paranext/paranext-core/pulls/<pr>/reviews  --paginate   # review bodies
gh api repos/paranext/paranext-core/pulls/<pr>/comments --paginate   # inline threads
gh api repos/paranext/paranext-core/issues/<pr>/comments --paginate  # issue comments
```

Then drop threads the reviewer already resolved — REST cannot see resolution state, so a second
round re-collects everything round one answered. Copy the GraphQL query out of
`.claude/commands/triage-feedback.md`; **read that file, never run it as a command** — its own later
steps post and resolve with no gate in between.

Record per item: the verbatim quote, the thread's **root** comment id, its GraphQL node id, and the
revision the reviewer read — `original_commit_id`, **not** `commit_id`, which GitHub rewrites as it
repositions comments under force-pushes.

Feedback arrives off-PR routinely — a document, a DM, Discord. Ask which surfaces the reviewer used
before calling the list complete. Reviewable-native "no related file" discussions are invisible to
every API; say "none were reported", never "there are none".

## 2. Verify each item is real

Read the code at the ref the reviewer read and decide what it actually does, rather than whether
their story is plausible.

- **Run runtime claims instead of arguing about them.** Ten lines in the real runtime settles what a
  page of reasoning cannot, and is usually cheaper.
- Check: already fixed upstream · right conclusion, wrong mechanism · self-refuting · two reviewers
  contradicting each other · a suggested fix that does not do what it claims.
- Not everything is a claim. Questions, offers and status reports need an answer, not a verdict —
  and an unanswered question is a debt that is invisible if you only track fixes.
- Say plainly what you could not settle and name the measurement that would settle it.

## 3. Propose

Per item: the smallest change that answers the concern, and **which branch it lands on** — on a
stack, often not the PR the comment appeared on. Sort into: fixes · design preferences (you
recommend, the user rules) · cross-reviewer conflicts (present both, never pick a side) · declines
and deferrals, each with where the residue is recorded.

A deferral needs a not-yet-started ticket. **Never create a Jira ticket** — propose it.

## 4. STOP — present 1–3

## 5. Implement

Re-derive the heads first. The gate may have taken hours, and a cited file may have moved; a verdict
taken at a ref that is gone is not a basis for a fix.

Use the Superpowers flow — `superpowers:brainstorming` → `superpowers:writing-plans` →
`superpowers:test-driven-development` — scaled to the ruling; a one-line correction needs the TDD
skill and nothing above it. **The rulings are fixed constraints on that flow, not inputs to it.**
Brainstorming widens a solution space; step 4 closed one. If the design work surfaces a reason a
ruling is wrong, stop and put it back to the user as a new decision.

Implement only what was ruled. Red-first for every behaviour change. Never `--no-verify`. New public
API needs the `@experimental` marker on **both** surfaces — TSDoc on the type-visible one and
`'x-experimental': true` in the registration's OpenRPC docs; the authoritative table is
`.context/standards/Paranext-Core-Patterns.md` § Experimental APIs.

## 6. Review your own diff

`/code-review` at `high`, or `max` for a large or risky round. Its findings are hypotheses: verify
each before acting, and record the ones you refuted with the reason.

**A guard is not done until breaking it turns a test red.** Mutate the thing you just fixed and
confirm the suite fails. A test that passes either way is not evidence, and it is the failure this
flow has shipped most often.

## 7. Verify it works

```bash
npm run build:types    # state the expected papi.d.ts delta BEFORE running
npm run build:main     # writes buildInfo.json, which typecheck imports
npm run typecheck && npm test && npm run lint && npm run format:check
cd c-sharp-tests && dotnet test    # when C# changed
```

Then **run the app and reproduce the reviewer's scenario** — `app-runner` to start it,
`visual-verification` to drive it, `log-inspector` for logs, `papi-client` to hit a command
directly. Where a change is e2e-testable, follow `.context/standards/Testing-Guide.md` § Running E2E
Tests exactly; `--config` and `--project` fail in different ways and both are required. A fix on a
runtime path is not verified until it has been seen running; "theoretical" is not a verdict.

Screenshots worth showing go in the packet — `pr-attach` can embed them in a reply.

Not working? Back to 5. **Committing is fine here. Pushing is not.**

## 8. Draft replies

One per thread. `🤖 Claude: ` once at the top. Verdict in the first sentence, then what is
confirmed, then the correction, then the disposition. Concede before correcting. Never attribute a
reversal to the reviewer; when the sequencing was ours, say so.

- Cite a revision with every claim, re-derived at drafting.
- Use only labels the reviewer has seen — their own numbering is ideal; ids that exist only in our
  notes are jargon to them.
- Reply to the thread's **root** comment id. The replies endpoint rejects a reply-to-a-reply, which
  is what a reviewer's comment is whenever they answered inside a thread we opened.

## 9. STOP — present the changes and the drafts

Per item: disposition, fix, commit, branch. The step-7 results including the live verification. The
**full reply texts**, flagging each one that refutes the reviewer, asks them for something, retracts
something already posted, announces a decline, or names a deferral with no ticket — those are the
ones to read word for word. Approval must name what it covers.

## 10. Push, restack, post

1. **Push** `--force-with-lease=<branch>:<the remote SHA you recorded>`, never bare — with no
   expected value the lease is checked against the remote-tracking ref, which any fetch across the
   two stops has already advanced. Bottom of the stack first, one command at a time.
   A force-push can dismiss approvals; record `reviewDecision` before and after, and re-request
   review from whoever had approved.
2. **Restack** the branches above, then **re-run step 7's battery at the new tip** — the restack
   rewrote the commits that battery passed on.
3. **Post** one comment at a time, no retries, **spaced a second or two apart**. Around 40 rapid
   comment POSTs trip GitHub's secondary rate limit, which answers `HTTP 422` with `"code":"abuse"`
   in the body — not the 403 you would expect, and it reads like a bad body. If one fails: stop,
   read the live state back, and only re-post once you have a clean stray list. A `gh` failure does
   **not** prove nothing was created.
4. **Read back** what landed and compare it against what you meant to post. "Posted successfully"
   without a read-back is not a result.

**Do not resolve the reviewer's threads** — `.context/standards/Code-Review-Guide.md` reserves that
to them. Threads *we* opened are ours to close, after a visible reply.

Then copy anything that lives only in a thread somewhere durable — an ADR, a standards entry, an
agreed ticket. Review threads die with the squash-merge.

---

## Presenting a gate

Steps 4 and 9 are where a human decides. The notes are the evidence; the gate is the **ask**, and it
is read by someone who has not read the notes, has not read the reviewer's text, and has been
elsewhere while the run worked. Write every item as if that is literally true, because it is.

**Every decision item carries four parts, in this order:**

1. **Context** — one or two plain sentences on what happened or what the reviewer said. This is the
   part that gets dropped, and dropping it is what makes a gate unanswerable.
2. **The question** — one interrogative sentence that can be answered as asked. A topic, a noun
   phrase, or "thoughts?" is not a question.
3. **Options** — lettered, one line each, each one a thing the user can say yes to by naming it.
4. **Recommendation** — which option and why, in a line. Every item gets one, *including* design
   preferences. The exception is a cross-reviewer conflict: there, say what each reviewer is owed
   under each option and state that you are not choosing.

**Banned:** internal ids or labels as the *subject* of an item, reviewer shorthand, a bare file or
symbol name standing in for an explanation, and "as discussed" / "as above". An id may trail an item
as a pointer; it may never be the thing the reader has to decode first.

**Pure information is not a decision.** Facts worth carrying go under their own **"No decision
needed"** heading *after* the list. Mixed in, the user has to sort the list before they can answer
it, and the items needing an answer are the entire reason for stopping.

**The test:** read the item with only that message in front of you. Can you say what happened, what
is being asked, what the choices are, and what is recommended? **If the user has to ask "what are
you asking me?", the gate failed** — and a gate they cannot read is one they approve blind.

> **Bad** — every word of context lives somewhere the reader is not:
>
> 1. **R3-04 / the cache staleness — which option?** A, **B + A′ (recommended)**, or C. And: do the
>    XS logging fix regardless?

> **Good** — same item, self-contained:
>
> **A reviewer found that a value we cache is never invalidated when the user switches projects, so
> the second project can be shown the first project's data.** We reproduced it. The cache predates
> this PR — the bug is on `main` today.
>
> **Do we fix it here, or keep the PR to its stated scope and record the bug for you to place?**
>
> - **A.** Fix it here — clear the cache on project change. ~15 lines and one test.
> - **B.** Keep this PR scoped, record the bug, and tell the reviewer that is what we did.
> - **C.** Fix it here *and* re-key the cache by project so the class of bug goes away. Larger, and
>   a design change we would want the lead dev on.
>
> **Recommendation: B** — it ships on `main` today, so it is not a regression this PR introduces,
> and A adds an unrelated behaviour change to a round that is otherwise ready to land.

## `--scout-only`, and running this as a routine

Runs **steps 0–3 and stops at gate 4**. Read-only outside the packet: no commits, no pushes, no
comments, no app, no e2e. That is the subset that is safe to schedule unattended — run to the gate,
write the notes, stop. A later interactive session picks it up.

A scheduled run cannot wait for anyone, so its **digest is the deliverable**: the run header (each
PR, its branch and base state, every ref with its SHA), item counts, and **the full gate-4 decision
list in the form above** — not a pointer to notes the user may never see. The routine's own run log
on claude.ai/code is where that lands.

Where a verdict genuinely turns on something scout mode may not do — running the app, running e2e —
state it **conditionally** and name the measurement exactly, rather than guessing or downgrading it
to "needs investigation". A conditional verdict is a decision item: the options are the branches of
the condition.

## Feedback that arrived off-PR

A document or a DM answered in kind keeps the conversation off the PR, and the next reader of the
code sees none of it. Convert it instead: anchor each item as a review thread on the code it is
about, so the reviewer is reading the diff and the question at the same time, then post one index
comment listing them.

Anchor at the docblock or declaration the question is about, not an arbitrary line inside an
implementation. Verify each anchor resolves at the PR head before posting, and re-verify after any
restack. Each thread must stand alone: someone opening it cold sees the code, the question, and what
we propose — never "see the doc".

## Two traps worth naming

**A rebase after posting** orphans every SHA the replies cite. They still resolve — GitHub keeps
force-pushed commits — but they leave the PR's commit list, and anything *renumbered*, such as an
`Architecture-Decisions.md` entry, now points at something else entirely. Post after the restack, or
own the correction publicly.

**A check that cannot observe its subject reports success.** An empty `comm`, a `grep` that errored,
a CI poll that saw a network error, a test asserting against a copy of the code. Every green result
in this flow should be one you could make red on purpose — and if you cannot, it is not evidence.
