---
name: process-pr-feedback
description: "[paranext-core ONLY] Use when a reviewer has left feedback on a paranext-core PR — review comments, a review round, reviewer findings, or a feedback document tied to a PR — and the round needs working end to end with the user ruling at two hard stops."
---

# Process PR feedback

```
/process-pr-feedback <pr>… [--scout-only]
```

Pass every PR the round covers — one reviewer's round routinely spans a stack, and splitting it
into one run per PR makes the user rule on half an argument twice.

**Eleven steps. Two hard stops: 4 and 9** — unconditional; every other stop in this file is a
condition that may not arise. Nothing is pushed or posted before 10. Approval is per-gate and
explicit — a general "keep going" crosses neither stop.

## Working notes

Keep the round's notes in `.review/<pr>[-<pr>…]-<YYYY-MM-DD>/`, dated by the day the round
started; a later session finds it with `ls -d .review/<pr>*`. `.review` is already ignored by git,
prettier and eslint, so the notes stay out of the diff under review and out of step 7's format
check. A second round the same day gets `-2`.

Five files, written as you go:

- `findings.md` — steps 0–3, opening with step 0's branch table. Steps 5 and 10 update the
  table's `pin` column and nothing else in it; anything else they learn goes below the table.
- `rulings.md` — the step 4 presentation as sent, followed by the user's answer **verbatim**, and
  the same for any question steps 5–7 put to the user. Appended, never overwritten: a ruling
  refers to the numbering of the presentation it answered, and a later session has neither
  without this file.
- `verification.md` — steps 6–7: refuted review findings with the reason, each battery result,
  the live reproduction; then step 10's re-check, `reviewDecision` comparison, read-back and CI
  outcome. Conflict hunks saved by step 5 sit beside it as `conflict-<branch>-<nn>.diff`.
- `replies.md` — step 8, the index: one line per draft with its target, and after step 10 the id
  of the comment it became. Each body is its own `reply-<nn>.md`, posted byte-for-byte.
- `approval.md` — the step 9 presentation and the answer verbatim, and the same for anything
  step 10 has to ask or re-present; appended per pass, and step 10 reads the last entry.

The gates can take days, and the session that takes a ruling is rarely the one that implements
it — step 10 pushes and posts under the user's name on the strength of `approval.md`, so its
absence has to mean "ask again". Superpowers' specs and plans, and screenshots, go in the same
directory.

---

## 0. Is the branch in good shape?

**This step measures.** It runs one `git fetch`, which updates remote-tracking refs and nothing
else — no branch moves, no rebase, no push, no checkout. What it finds is a stop, a decision item
for step 4, or a warning carried to step 4.

```bash
git fetch origin
git rev-parse --abbrev-ref HEAD     # which branch this checkout is on
git status --porcelain              # tracked modifications
```

Then per branch, for **every branch in every stack the round touches — from the branch directly
above `main` to the top**, whether or not it has feedback. A fix routinely lands below the PR that
was commented on, and every branch we own above a changed one gets restacked and pushed, so each
needs a row. Walk down from a PR's `baseRefName` with
`gh pr list --head <baseRefName> --state all` until `main`, and up from its `headRefName` with
`gh pr list --base <headRefName> --state all` until nothing answers — every PR, open or not,
because a merged or closed one is where its branch's `baseRefName` and `author` still live. A
branch with several PRs is read from the open one, else the most recently updated:
`--json number,state,baseRefName,author,updatedAt --jq 'sort_by(.state != "OPEN", .updatedAt) | .[0]'`
with `--limit 20`. Only
**open** PRs join the stack that step 5 restacks and step 10 pushes. A merged or closed PR below
ours ends the stack there and is decision item one at step 4: our branch's real base is now
whatever that PR merged into. A closed PR above ours is simply not in the stack:

```bash
gh pr view <pr> --json \
  headRefName,baseRefName,headRefOid,state,mergeable,mergeStateStatus,reviewDecision,author
gh api repos/paranext/paranext-core/compare/<baseRefName>...<headRefOid> --jq '{ahead_by,behind_by}'
git rev-list --left-right --count origin/<headRefName>...<headRefName>   # remote-only, local-only
```

Record a row per branch in `findings.md`: PR · branch · base · `headRefOid` · `pin` ·
`reviewDecision` · behind-count · mergeable · local-only · remote-only · owner (`.author.login`
versus `gh api user --jq .login`). `pin` starts equal to `headRefOid` and is the only column
steps 5 and 10 change; `headRefOid` itself is never overwritten, because step 5 may need the tip
this
round started from. Take both from the API, not from `git rev-parse origin/<branch>`, which
reports only what was last fetched. A base branch with no PR at all gets a row from
`git rev-parse origin/<branch>` — fresh, after the fetch above — with empty PR fields, and is ours
only if `git log -1 --format=%ae origin/<branch>` equals
`git config user.email`; step 5 re-checks it the same way. `main` itself
has no row: it is never rewritten, so
plain `merge-base` is always right against it.

**Stop — about this checkout, which is ours whoever owns the PR:**

- **HEAD is detached, or on none of the branches in the table.** Every fix lands somewhere no
  PR in the round displays, and nothing later in the flow notices.
- **Tracked modifications in the working tree.** They get folded into this round's commits and
  into step 10's push. Untracked and ignored files are fine; the notes directory is one. This is
  what "a clean tree" means everywhere below.

**On a branch we own:**

- **Remote-only commits — stop.** Someone pushed to it. Step 10's lease is pinned to the remote
  head *including* those commits, so the force-push would pass and delete them. Put it to the
  user; integrating them is a step 5 action if the user rules it.
- **`behind_by > 0` or `mergeable: CONFLICTING` — decision item one at step 4.** The fixes are
  being sized against a tree that will change; every estimate below it is provisional. Moving a
  branch onto a new base is the user's call and no step here does it unasked; restacking a
  branch onto its own base's new tip is part of whatever moved the base, and needs no ruling — so
  a ruling to leave a behind child alone holds only while its base goes untouched this round.
- **Local-only commits — decision item at step 4: do they ride along?** The reviewer read
  something older than this tree, so some items may already be fixed; step 2 checks each one
  against both refs. If they ride, step 10 pushes them with the rest; if not, the ruling says what
  step 5 does with them, since step 10 pushes the branch as it stands.

**On a branch someone else owns**, those three are warnings, listed at step 4 under "No decision
needed". It is not ours to tidy, and this flow never restacks or pushes such a branch: where one
sits above a branch we will change, that is a fourth warning for step 4, step 9 lists it again,
and its owner restacks it.

Three traps:

- **`mergeable: UNKNOWN` is a non-answer, not a pass.** GitHub computes it lazily, so the first
  query on a PR usually returns `UNKNOWN` and an agent reads "not `CONFLICTING`" as "fine";
  re-query until it settles. `behind_by` from the compare call is always computed, so prefer it.
  On a merged or closed PR (`state`, which is why it is in the query) `UNKNOWN` is permanent and
  correct.
- **`mergeStateStatus` cannot answer the behind-question.** It reports `BEHIND` only where branch
  protection requires branches to be up to date; where that is not enabled, a badly stale branch
  reads `BLOCKED` or `CLEAN` instead. `behind_by` from the compare call is the authority.
- **A conflicted PR silently stops CI.** GitHub cannot compute a merge ref, so no `pull_request`
  workflow runs at all. "No checks reported" is not "checks passed".

## 1. Read the feedback

Per PR, all three surfaces:

```bash
gh api repos/paranext/paranext-core/pulls/<pr>/reviews  --paginate   # review bodies
gh api repos/paranext/paranext-core/pulls/<pr>/comments --paginate   # inline threads
gh api repos/paranext/paranext-core/issues/<pr>/comments --paginate  # conversation comments
```

Then drop threads the reviewer already resolved — REST cannot see resolution state, so a second
round re-collects everything round one answered. Copy the GraphQL query out of
`.claude/commands/triage-feedback.md`; **read that file, never run it as a command** — its own later
steps post and resolve with no gate in between. Widen it so each thread node carries `id`,
`isResolved`, and `comments(first: 50) { nodes { databaseId author { login } } }`: the thread
`id` is what closes a thread of ours at step 10, and the root author is how we tell
ours from theirs — guessing that later resolves a reviewer's thread in public.

**An item is one of:** an inline thread — its root comment *and every reply in it*, the reviewer's
follow-ups included; a review body; a conversation comment; a piece of off-PR feedback (see
**Feedback that arrived off-PR**). Record per item, in `findings.md`: the PR, the surface, the
verbatim text, and the id the reply goes to — a thread's **root** comment id (the REST
`in_reply_to_id` of any reply, or the first `databaseId` in the GraphQL thread) plus its author
and thread id; a review's id; a conversation comment's id; nothing yet for off-PR. For threads
also record the revision the reviewer read: `original_commit_id`, **not** `commit_id`, which
GitHub rewrites as it repositions comments under force-pushes. Reviews carry the reviewed head as
`commit_id`; conversation comments and off-PR items carry no revision and are read at the head.

Feedback arrives off-PR routinely — a document, a DM, Discord. The list of surfaces you collected
from is a decision item at step 4: were there others? Do not call the list complete before then.
Reviewable-native "no related file" discussions are invisible to every API; say "none were
reported", never "there are none".

## 2. Verify each item is real

Read the code at the ref the reviewer read and decide what it actually does, rather than whether
their story is plausible. That ref is usually one a force-push orphaned, so `git checkout` on it
fails and the tempting fallback — reading the working tree — silently answers a different question:
`gh api repos/paranext/paranext-core/contents/<path>?ref=<sha> --jq .content | base64 -d` reads any
commit GitHub still holds. Where step 0 found local-only commits, check the item at the reviewer's
ref *and* at the local tip: it may be fixed already, and the reply should say so.

When you need a PR's own changes, the range depends on the command, and its ends are **that PR's
base and head branches** — not `main`, and not `HEAD`, or the branches below get attributed to it,
or the ones above do. For `git diff` the range is `origin/<base>...<branch>` — **three dots** —
because the two-dot form diffs the endpoint trees and renders the base's later changes as
spurious deletions. For `git log` and `git rev-list` it inverts: three dots is the symmetric
difference and pulls the base's own commits in alongside ours, so there `origin/<base>..<branch>`
— **two dots** — is the form that means "ours".

- **Run runtime claims instead of arguing about them.** Ten lines in the real runtime settles what a
  page of reasoning cannot, and is usually cheaper.
- Check: already fixed upstream · right conclusion, wrong mechanism · self-refuting · two reviewers
  contradicting each other · a suggested fix that does not do what it claims.
- Not everything is a claim. Questions, offers and status reports need an answer, not a verdict —
  and an unanswered question is a debt that is invisible if you only track fixes. A review body
  that only points at inline comments ("one concern below") needs no answer of its own; record
  that disposition rather than replying to a pointer.
- Say plainly what you could not settle and name the measurement that would settle it.

## 3. Propose

Per item: the smallest change that answers the concern, and **which branch it lands on** — on a
stack, often not the PR the comment appeared on. Sort into: fixes · design preferences (you
recommend, the user rules) · cross-reviewer conflicts (present both, never pick a side) · declines
and deferrals, each with where the residue is recorded · no reply needed.

Before sizing a reviewer's "do it properly" suggestion, check whether anything needs it. A reviewer
proposing a general mechanism — a config knob, an interface, a second implementation — is reasoning
from the diff in front of them, not from the call sites. Grep for real usage first, and where there
is exactly one, "the specific fix, plus a note that the general one is a one-caller change if a
second arrives" belongs at step 4 alongside the general one. It is an **option to present, never a
decline to take** — the reviewer asked, so the user rules.

A deferral needs a not-yet-started ticket. **Never create a Jira ticket** — propose it, and the
reply names the ticket only once the user has created it.

## 4. STOP — present 0–3

Present per **Presenting a gate** below, and do not start implementing in the same turn. The list
carries step 0's decision items first, then the items, then the surfaces question; step 0's
warnings go under "No decision needed".

Write the presentation and then the ruling into `rulings.md`, the ruling **verbatim**. A
paraphrase is how a decision gets quietly widened three steps later. Approval covers only the
items it names: anything unanswered stays unimplemented, and if the answer settles some items and
reopens others, re-present the remainder rather than reading silence as assent.

## 5. Implement

Read `rulings.md` first, then `git fetch origin` and re-query `headRefOid` for every row. The gate
may have taken days. On a branch we own, a value that differs from the row is step 0's remote-only
stop, and it goes to the user before anything is built on the branch; on someone else's branch it
is a warning, noted below the table.

Use the Superpowers flow — `superpowers:brainstorming` → `superpowers:writing-plans` →
`superpowers:test-driven-development` — scaled to the ruling; a one-line correction needs the TDD
skill and nothing above it. Point their specs and plans at the notes directory: they default to
`docs/superpowers/` inside the working tree, which is the one place this flow works to keep clean.
**The rulings are fixed constraints on that flow, not inputs to it.** Brainstorming widens a
solution space; step 4 closed one. If the design work surfaces a reason a ruling is wrong, stop,
put it back to the user as a new decision, and append the exchange to `rulings.md`.

Implement only what was ruled. A ruled rebase goes onto the branch's **own** base, using the
block under **Finish the stack** with `origin/<baseRefName>` as `<base>` — a plain
`git rebase <upstream>` uses `merge-base` and fails the way that block describes when the base was
rewritten. Ruled integration of remote-only commits is `git rebase origin/<branch> <branch>`. After
that ruling — and equally after a ruling to overwrite them — the row's `pin` becomes the
re-queried `headRefOid`, or step 10's lease can only fail.
Red-first for every behaviour change. Never `--no-verify`. As each fix lands, append
"item → commit → branch" below the table in `findings.md`; step 9 presents from that.
New public API needs the `@experimental` marker on **both** surfaces — TSDoc on the type-visible
one and `'x-experimental': true` in the
registration's OpenRPC docs; the authoritative table is
`.context/standards/Paranext-Core-Patterns.md` § Experimental APIs.

**Finish the stack before leaving this step.** Every branch we own that sits above a branch this
round rewrote or added a commit to — anywhere in the stack, a rewrite or a plain commit, it makes
no difference — gets restacked, bottom up, once the last commit of the round has landed. The same
applies again to any commit added at step 6 or 7. Run it with a clean tree; the block checks out
each child in turn and leaves HEAD on the last one:

```bash
FORK=$(git merge-base --fork-point <base> <child>) \
  || echo "STOP: reflog cannot place <child> on <base>"
[ -n "$FORK" ] && git rebase --onto <base> "$FORK" <child>
```

`--fork-point` reads the base's reflog for the tip the child was actually built on, so it is right
whether the base gained commits or was rewritten, and nothing needs capturing beforehand. Plain
`merge-base` is wrong after a rewrite: it falls below the base's own commits, the rebase replays
the base's work onto the child, stops on a conflict inside the base's change, and resolving that
undoes the rewrite. When the reflog cannot answer — a fresh clone, an expired reflog — the first
line prints STOP and the second does nothing; the block's exit status of 1 is that STOP, not an
error. The upstream then is the tip the child was last built on: plain
`git merge-base <base> <child>` where the base has only gained commits since the child last sat
on it, or the base's `headRefOid` from step 0's table — the column that is never overwritten —
for a child never restacked this round, provided that base had no local-only commits. Neither
applies? There is no safe value; it goes to the user.

A restack that conflicts does so here, in front of you. The rule for the hunk: the base's lines
win, and only the child's own insertion is the child's — resolving the other way reverts the
base's change on the child's PR. In a rebase the `<<<<<<< HEAD` side *is* the base, and
`git show REBASE_HEAD -- <file>` marks the child's own lines with `+`. Before touching anything,
save the conflict: `git diff > .review/<dir>/conflict-<child>-<nn>.diff`. Then resolve, `git add`,
`git rebase --continue`; never blanket `--continue || --skip` in a loop, since `--skip` silently
drops real commits and an untracked-file collision or a hook failure looks exactly like an empty
commit. Every saved conflict is shown at step 9, with its resolution, as content the user has not
seen. A restack triggered from step 6 or 7 follows this whole section, saving included. The stack
is finished before step 8, so the commits step 8 cites are the commits that will be on the PRs.

## 6. Review your own diff

`/code-review` at `high`, or `max` for a large or risky round, over the range the branch was
rebased onto: `<base>...<branch>` where this round changed `<base>` locally — rewrote it or added
to it, since nothing is pushed yet and `origin/<base>` is still what the round started from — and
`origin/<base>...<branch>` otherwise, `main` included, since local `main` is whatever was last
checked out. Its findings are
hypotheses: verify each before acting, and write the ones you refuted into `verification.md` with
the reason. A verified defect in this round's own changes is fixed here, and a fix on a branch
with branches above it re-runs **Finish the stack**. Anything beyond what was ruled stops now and
goes back to the user as a new decision
item in the form step 4 uses, appended to `rulings.md`.

**A guard is not done until breaking it turns a test red.** Mutate the thing you just fixed and
confirm the suite fails; a test that passes either way is not evidence. The same applies to every
check in this flow — a diff that errored, a poll that read a network error as green, a watcher that
concluded over an incomplete list. A check that cannot observe its subject reports success.

## 7. Verify it works

**The battery**, per branch tip that changed:

```bash
npm run build:types    # state the expected papi.d.ts delta BEFORE running
npm run build:main     # writes buildInfo.json, which typecheck imports
npm run typecheck && npm run lint && npm run format:check
```

then the test suites through the `test-runner` skill. Keep `format:check` named: `lint` is eslint
over script files plus stylelint over styles, so a JSON or YAML change is checked by nothing but
the separate prettier pass that CI gates on.

**The live reproduction**, once, at the top of the stack: run the app and reproduce the reviewer's
scenario — `app-runner` to start it, `visual-verification` to drive it, `log-inspector` for logs,
`papi-client` to hit a command directly. Where a change is e2e-testable, follow
`.context/standards/Testing-Guide.md` § Running E2E Tests exactly, including which flags belong to
which mode. Standalone e2e needs port 8876 free, so run it before starting the app, or stop only the
app this session started — `npm stop` kills every Electron on the machine, other sessions'
included. A fix on a runtime path is not verified until it has been seen running.

Both go in `verification.md`: the papi delta stated and observed, each battery's result, and what
the live run showed. Screenshots worth showing go beside it.

Not working? Back to 5, including **Finish the stack**. **Committing is fine here. Pushing is
not.**

## 8. Draft replies

One draft per item that gets one; on a later pass, posted drafts keep their numbers and files, and
new drafts take new numbers. The body goes in its own `reply-<nn>.md`; `replies.md` indexes
them, one line each: number, PR, surface, the id from step 1's record, the endpoint, and for an
off-PR thread its anchor — `path` and `line`, the `commit_id` being supplied when posted. What is
approved at step 9 is the body
file, and step 10 posts it unchanged.

`🤖 Claude: ` once at the top. Verdict in the first sentence, then what is confirmed, then the
correction, then the disposition. Concede before correcting. Never attribute a reversal to the
reviewer; when the sequencing was ours, say so.

- Cite a revision with every claim. The stack was finished before this step and step 10 rewrites
  nothing, so a SHA cited now is the one that will be on GitHub. Where the fix landed on a
  different PR
  from the one commented on — routine on a stack — say which, or the reviewer looks for the commit
  in the wrong PR.
- Use only labels the reviewer has seen — their own numbering is ideal; ids that exist only in our
  notes are jargon to them.
- Endpoints: an inline thread through
  `POST repos/paranext/paranext-core/pulls/<pr>/comments/<root id>/replies` — it rejects a
  reply-to-a-reply, and a reviewer's own comment *is* a reply whenever they answered inside a
  thread. A review body or a conversation comment has no thread; answer it with
  `POST repos/paranext/paranext-core/issues/<pr>/comments`, quoting enough to anchor it. Off-PR
  items become new threads per **Feedback that arrived off-PR**.

## 9. STOP — present the changes and the drafts

Present per **Presenting a gate** below. Per item: disposition, fix, commit, branch. The contents of
`verification.md`. Every conflict resolved by hand at steps 5–7: the saved diff, and
`git show <replayed commit> -- <file>` as the resolution. The **full reply texts** with
their targets, flagging each that refutes the reviewer, asks them for something, retracts something
already posted, announces a decline, or names a deferral with no ticket — those are the ones to
read word for word. Then everything step 10 will do under the user's name, as a list they can
strike from: the branches to push — every branch we own that was touched, restacked, or carries
local-only commits, stack by stack — any branch of someone else's that now needs restacking by
its owner, the replies, any threads to open, whether to re-request review, and any of our own
threads to close.

Write the presentation and then the approval into `approval.md`, the approval **verbatim**. A
partial approval covers only what it names. Branches are named by stack: naming any branch names
every branch we own in its stack that was rewritten below it or restacked above it, because
pushing a child without its base — or a base without its restacked children — makes a PR display
another branch's commits as its own diff, and striking any one of them strikes the stack — a
strike beats a name. A PR names its branch. Replies may be named one by one or as "PR <n>'s
replies"; threads, re-requests and closures one by one. Anything not named stays unpushed and
unposted. A reply that must change — because it cites something now unpushed,
or for any other reason — is re-presented, not reworded on the way out. Anything agreed in a
thread that belongs somewhere durable — an ADR, a standards entry — is proposed here, because
review threads die with the squash-merge; it is not committed silently after step 10.

## 10. Re-check, push, post

0. **Check the approval before anything else.** Open `approval.md` and read its last entry.
   Missing means stop and ask: a session running step 10 days later has no other record that
   this round was approved. Act only on what it names.
1. **Re-check the stack, without touching it.** The tree must be clean, and every branch we own
   above a changed one must sit on its base's tip — a plain read, no reflog involved:

   ```bash
   [ "$(git merge-base <base> <child>)" = "$(git rev-parse <base>)" ] \
     && echo "<child> sits on <base>" || echo "STOP: <child> does not sit on <base>"
   ```

   Every child must print the first message. A STOP means the stack moved since approval, and
   step 10 does not rebase: record it in `verification.md`, then back to step 5 and through
   every step after it, with a fresh approval entry at 9. This is the reason step 8 can cite
   SHAs: nothing in step 10 rewrites a commit.
2. **Push** every branch we own in every stack the approval names — never one of someone
   else's — bottom of the stack first, one command at a time:

   ```bash
   git push --force-with-lease=<branch>:<pin> origin <branch>
   ```

   The pin is the row's `pin` column; after a successful push, overwrite it with the SHA you
   pushed, so a second pass through this step leases against it. Name the branch in the
   refspec: a push carrying only a lease flag pushes the **current** branch under
   `push.default=simple`, so the one you meant silently does not go and the one that does carries
   a lease naming a different ref. Keep the lease flag first: the repo's permission gate on
   force-pushes matches on the command's prefix. Never a bare `--force-with-lease` — with no
   expected value it is checked against the remote-tracking ref, which the fetch at step 0
   already advanced. A rejected lease means one of two things: the row's pin was not overwritten
   after an earlier push this round — check that first — or someone else moved the branch. Never
   re-pin to the current remote, which is the defeated form; read the remote back and put it to
   the user as a new decision. A ruling to integrate or overwrite is step 5's, so it goes back
   there and through every step after it. A push with nothing to send does not evaluate the lease
   at all, so
   "Everything up-to-date" proves nothing about the pin. A force-push can dismiss approvals:
   compare `reviewDecision` against the row afterwards and note the result in `verification.md`.
3. **Post** — one comment at a time, no automatic retries, **spaced a second or two apart**, each
   body
   wrapped mechanically from its file and sent to the target its index line names; a new thread
   for an off-PR item adds the index line's `path` and `line` to the same payload, with
   `commit_id` set to that branch's remote head as read back after 10.2.
   Record each new comment's id on its index line as it lands, and on a second pass through this
   step post only lines that have none:

   ```bash
   jq -Rs '{body: .}' reply-<nn>.md | gh api --method POST <endpoint> --input -
   ```

   If a POST fails with `422` and `"code":"abuse"` in the body, that is the secondary rate limit
   and not a malformed body — however much "Validation Failed" invites it, do not edit a reply
   the user has already approved to get past it. Stop and read the live state back. An approved
   body that landed despite the failure gets its id written to its index line first, so it is
   not posted twice; every comment now on the PR that is *not* an approved body is a stray, and
   only an empty stray list licenses a re-post. A `gh` failure does **not** prove nothing was
   created.
4. **Read back** what landed and compare it against the body files. "Posted successfully" without
   a read-back is not a result. The comparison goes in `verification.md`.
5. **Watch CI to a conclusion.** A watcher must report every terminal state, treat an incomplete
   check list as incomplete rather than passed, and say whether it ended by completion or by its
   own timeout; the outcome goes in `verification.md`. Red means back to step 5 and through every
   step after it, with a fresh approval entry at 9 — and any posted reply whose cited commit that
   pass rewrote gets a follow-up draft naming the new one, since posted text is never edited.
   Green: where the approval named them, re-request review
   (`gh pr edit <pr> --add-reviewer <login>`) and close the threads *we* opened — by thread id,
   re-running step 1's query first so threads opened this round have one. Both outcomes go in
   `verification.md`.

**Do not resolve the reviewer's threads.** `.context/standards/Code-Review-Guide.md` does allow an
author to self-resolve items the reviewer marked *Discussing*; this flow declines that latitude on
purpose. Resolving someone else's thread by mistake is public and awkward, and leaving one open
costs nothing.

---

## Presenting a gate

Steps 4 and 9 are where a human decides. The notes are the evidence; the gate is the **ask**, and it
is read by someone who has not read the notes, has not read the reviewer's text, and has been
elsewhere while the run worked. Write every item as if that is literally true, because it is.

**A stop is a conversation, not a handoff.** Expect part of the plan to come back changed;
re-present what changed and stop again, until the user says it is settled. One presentation and
one answer is the lucky case, not the shape to design for.

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

Runs **steps 0–3 and stops at gate 4 without waiting for an answer** — nobody is there to give one.
Read-only outside the notes directory, step 0's fetch aside: no commits, no pushes, no comments, no
app, no e2e.

That is the subset that is safe to schedule unattended — run to the gate, write the notes, stop, and
let a later interactive session pick it up. Since such a run cannot wait for anyone, its **digest is
the deliverable**: the run header (each PR, its branch and base state, every ref with its SHA), item
counts, and **the full gate-4 decision list in the form above** — written to `rulings.md` as the
presentation and also into the routine's own run log on claude.ai/code, not a pointer to notes the
user may never see.

Where a verdict genuinely turns on something scout mode may not do — running the app, running e2e —
state it **conditionally** and name the measurement exactly, rather than guessing or downgrading it
to "needs investigation". A conditional verdict is a decision item: the options are the branches of
the condition.

## Feedback that arrived off-PR

A document or a DM answered in kind keeps the conversation off the PR, and the next reader of the
code sees none of it. Convert it instead: at step 8, draft each off-PR item as a new review thread
anchored on the code it is about — `POST repos/paranext/paranext-core/pulls/<pr>/comments` with
`commit_id`, `path` and `line`. They are presented at step 9 with the replies and posted at 10.3
with them.

Anchor at the docblock or declaration the question is about, not an arbitrary line inside an
implementation. Verify each anchor resolves at the PR head before posting. Each thread must stand
alone: someone opening it cold sees the code, the question, and what we propose — never "see the
doc".
