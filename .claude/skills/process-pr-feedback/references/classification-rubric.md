# Classification rubric

Used by **P1 — Verify**. Every inventory item that **makes a claim about the code** gets exactly
one classification, decided by reading the code at the named revision — never by judging whether
the reviewer's story sounds plausible. Items that make no claim — questions, offers, status
reports — take the non-claim carve-out below instead.

> *Provenance: the five-way scheme and the worked examples come from the 2026-08 review rounds
> on the multi-window stack (PR #2621 round 4 and the lead dev's document round), where a
> 38-item round produced examples of all five and four reviewer-suggested fixes turned out to be
> wrong in ways that only mechanism-level tracing exposed.*
>
> **Frozen record** — the worked examples below are a point-in-time account of that round. Their
> symbol names, SHAs, and file:line citations describe branches as they stood in 2026-08 and are
> not expected to resolve on current `main`. Read them for the method, not for the facts.

---

## The five classifications

| Class | Means | What the reply owes the reviewer |
|---|---|---|
| **VALID** | The claim is true at the revision they read and still true now. | Confirmation, and where the fix landed. |
| **VALID-WITH-CORRECTIONS** | The concern is real; some stated detail is wrong — the mechanism, the blast radius, the severity, or the consequence. | Confirmation of the substance **and** the correction, explicitly framed as a correction to the mechanism rather than a downgrade of the finding. |
| **INVALID** | The claim does not hold at any revision in play. | A refutation with the evidence — file:line at a named ref — and no hedging. |
| **DESIGN-PREFERENCE** | Both positions are defensible; there is no fact that settles it. | Nothing until the user rules. Never silently converted into a fix. |
| **ALREADY-SATISFIED** | True when they read it, not true now — fixed upstream, or fixed by another item in the same round. | The commit that closed it, and an explicit note that their read was honest at their snapshot. |

Two classifications can apply at different revisions, and that is information, not ambiguity.
Say so: *"CONFIRMED at your base — REFUTED at the top of the stack."* Always name which revision
each verdict belongs to.

### The non-claim carve-out — `ASK` · `OFFER` · `STATUS`

**The five-way applies to items that make a claim about the code.** A reviewer's round routinely
contains items that do not:

| Kind | Looks like | What it owes the reviewer |
|---|---|---|
| **`ASK`** | *"Is this intentional?"* · *"Why not use the existing helper?"* · *"What happens on Windows?"* | An answer, in the thread, with the same evidence standard as a verdict. If the answer is "we don't know yet", say when they will know. |
| **`OFFER`** | *"Want me to instrument that path?"* · *"I can take this one if it helps."* | Accept, decline, or counter-offer — explicitly, by the user's ruling. Silence reads as a refusal and costs the reviewer's next offer. |
| **`STATUS`** | *"I've started on X."* · *"This overlaps the work in #NNNN."* | Usually an acknowledgement, plus whatever it changes about our plan. Sometimes it changes a disposition — check before filing it as noise. |

These items get **a disposition and a reply target, and skip the five-way entirely.** Do not
force them through it. `VALID` says nothing about a question, and a question wearing a
classification badge looks answered when nobody has answered it — which is how a reviewer ends
up waiting on a reply that the round has already marked complete.

Two things they still get, in full: the same **verification rigour** where an answer depends on
what the code does (an `ASK` answered from memory is as wrong as a verdict guessed from memory),
and a place on the **G1 decision list** whenever the answer is the user's to give — every `OFFER`
is, and any `ASK` whose answer commits us to something.

### Cost is a pair

Every **claim** item that is not `INVALID` carries **`(edit-cost, verification-cost)`**, each on
the same scale:
**XS** (a line or a word), **S** (one file, no design), **M** (several files or a test rewrite),
**L** (a design change or a new API surface). G1 sizing and `--fast-lane` both key on the pair,
and `--fast-lane` requires XS on **both** halves.

They are separate because they come apart, and the direction they come apart in is the dangerous
one:

| Item | Pair | Why |
|---|---|---|
| Rename a misleading local variable | `(XS, XS)` | Type-check covers it. |
| Flip a boolean default on a startup path | `(XS, L)` | The edit is one word; proving it needs a build, an app launch, and the reviewer's scenario reproduced with a negative control. |
| Rewrite a test to assert behaviour instead of implementation | `(M, XS)` | Sizeable edit; the suite verifies itself. |
| Add a field to a public API surface | `(S, M)` | Small edit, but `build:types`, the two-surface experimental marker, and the wire contract all need checking. |

Non-claim items (`ASK` / `OFFER` / `STATUS`) get **no cost pair** unless the user's ruling turns
one into work — a cost pair on *"is this intentional?"* is noise that makes the real ones harder
to scan. If an `OFFER` is accepted or an `ASK` resolves into a fix, it is sized then, as the item
it became.

A single number collapses to the edit cost every time, because the edit is the part in front of
you. That is what turns "an XS fix, ten minutes" into an afternoon — and, worse, what lets a fix
reach a reviewer verified only in theory, because the verification the item actually needed was
never sized and so never scheduled.

### Conditional verdicts

When settling an item needs something this run cannot do — start the app, run e2e, ask a human —
**state the verdict conditionally rather than guessing or deferring**. `--scout-only` runs meet
this constantly by construction; they are read-only and unattended.

The shape: the verdict, the condition, the exact measurement that would settle it, and what the
verdict becomes in each branch.

> CONFIRMED at `<ref>` **if** the handler runs before teardown — which this run cannot observe.
> Measurement: `<the specific command or scenario, and what to look for>`. If it does, the item
> is VALID and the smallest fix is `<…>`; if it does not, the item is INVALID because
> `<mechanism>`.

That is a complete answer, not a hedge: the analysis is finished and the one open input is named
precisely enough for anyone to close it in a minute. "Needs investigation" throws that analysis
away, and a guess dressed as a verdict is worse than either. A conditional verdict is always a
**G1 decision item** — the user is being asked to authorise, run, or wait for the measurement,
and the branches of the condition are the item's options.

---

## Worked example 1 — already-fixed-upstream

**The item.** A reviewer filed that `getAllOpenWebViewDefinitionsWithReachability` fanned out
over ready windows only, so a tracked-but-unready window produced
`{ definitions: [], unreachableWindowIds: [] }` — an authoritative-looking "nothing is open"
that was really "nobody was asked".

**What verification found.** Correct exactly as filed at the revision reviewed. Also already
fixed — a commit landed on the step branch roughly an hour after the reviewer's snapshot,
implementing *their* predicate: consult the not-ready windows and push any tracked window that
has not registered its services onto `unreachableWindowIds`, with a red-first test named for
the behavior.

**Classification.** VALID at the reviewed base; ALREADY-SATISFIED at the tip.

**The lesson.** Reviews go stale under a moving stack, and a stale finding is not a wrong
finding. The reply named the fixing commit, quoted the test name, and said plainly that the code
moved under the reviewer and their re-check was honest. Getting this wrong in either direction
is costly: "already fixed" said dismissively reads as a brush-off, and re-fixing something
already fixed wastes a cycle and muddies the diff. **Always establish which revision the
reviewer read before classifying anything.**

The same reply also caught a second-order error worth copying: the reviewer had written that the
needed predicate was "the one already written at `:229`". It was not — that guard's predicate
was a single-window `isWindowReady(windowId)` test, not the fan-out property. The *principle*
was theirs; the specific reuse claim was wrong. Confirming a finding does not mean ratifying
every sentence in it.

## Worked example 2 — right conclusion, wrong mechanism

**The item.** A reviewer filed that Simple mode's one-editor-slot logic was being applied to a
cross-window list, and narrated the outcome: the editor in window 1 is silently replaced while
window 2 shows nothing.

**What verification found.** The premise was confirmed in full — the list really is a
cross-window merge, and the Simple branch really does take element `[0]` with no window
qualification. But the narrated outcome was wrong for one of the two code paths. The
`focus-existing` path behaved exactly as described. The `replace-tab` path did **not**: it never
passes `existingId`, so it never takes the owner-finding branch, and it routes to the *focused*
window instead. When the target tab lives in another window the receiving window throws
`Replacing tab failed: target tab with id … not found` — after several side effects have
already run. So the real outcome is either an ordinary same-window replace, or a failed open
with half-applied side effects.

**Classification.** VALID-WITH-CORRECTIONS.

**The lesson.** The corrected mechanism was *worse* than the one filed — harder to diagnose, not
milder. That is why the correction was framed as "a correction to the mechanism, not a downgrade
of the finding", and why the reply led with what was confirmed before what was corrected. A
reviewer whose conclusion is right and whose mechanism is wrong has still found the bug; treat
the correction as owed information rather than as a scoring exercise. And note what produced it:
tracing both code paths separately instead of accepting that one narrated path described both.

## Worked example 3 — the self-refuting correction

**The item.** The reviewer corrected a PR body: *"the webpack commit is `67369e272a7` on the
current branch; `54e6dd1f8ab` is a pre-rebase hash."*

**What verification found.** `54e6dd1f8ab` was indeed pre-rebase — it lived only on a retired
branch. But `67369e272a7` existed as a git object and was **on no branch either**. It was also
pre-rebase. The current commit was a third SHA entirely, established with `git branch --contains`.

**Classification.** INVALID — while the underlying complaint (the PR body cites stale SHAs) was
independently VALID, and was fixed with the correct SHA.

**The lesson.** A correction is a claim like any other and gets verified like any other. This
one was an error of exactly the class it was correcting. Two habits catch it: **re-derive every
SHA rather than trusting it from a document** (`git cat-file -t` to prove it exists, `git branch
--contains` to prove where it lives), and **separate the complaint from the correction** — the
reviewer was right that stale SHAs were a problem and wrong about which SHA was current, and
those are two dispositions, not one.

A related trap on the same round: the round's own reply drafts cited a SHA that the later
restack had orphaned. Any SHA that appears in a reply body must be re-derived at drafting time
and re-checked at posting time, for the same reason.

---

## Mandatory sub-checks

Run all of these on every **claim** item, and on any `ASK` whose answer depends on what the code
does. They are the checks that produced the three examples above, and each one has caught
something the plain read did not.

1. **Already-fixed-upstream.** What revision did the reviewer read? Is the claim still true at
   the branch tip, and at the top of the stack? Name the revision with every verdict.
2. **Right-conclusion-wrong-mechanism.** Does the code actually reach the state described, by
   the route described? Trace every code path the item touches, separately. A plausible
   narration that describes one of two paths is a correction, not a confirmation.
3. **Self-refuting claims.** Verify the reviewer's *evidence*, not only their conclusion:
   re-derive SHAs, re-read cited file:line at the named ref, and check that quoted code says
   what the item says it says. A correction can be wrong in the way it is correcting.
4. **Cross-reviewer conflicts.** Does this ruling contradict another reviewer, or contradict
   something already posted to a reviewer? If so it goes to G1 verbatim, both positions with
   their verified facts, plus what each reviewer is owed either way. **Never pick a side.**
5. **Reviewer-suggested fixes traced before trust.** A proposed fix is a hypothesis. Trace it
   through the code and ask what it does to *every* caller, not just the one under discussion.
   Four suggested fixes in one week were wrong at mechanism level — one silently inverted a
   behavior, and one that had been dismissed proved right when actually run. Verify in both
   directions: that the suggestion works, and that dismissing it was justified.
6. **Grep safety net.** When an item requires selecting from a large list — all callers of a
   symbol, all registrations of a kind, every mention of a term — bracket the semantic scan with
   a deterministic `grep` over the same corpus, per `.claude/rules/grep-safety-net.md`. Every
   grep hit must appear in the result or be explained as a false positive.

## Read-only discipline, and reading by ref

Verification touches nothing. `git show` / `git diff` / `git log` at explicit refs. No checkout,
no commit, no push, no PR or comment mutation.

**Establish the checkout's branch before reading anything**, and say so at the top of the report:

```bash
git rev-parse --abbrev-ref HEAD   # literally "HEAD" when detached — pair it with the SHA
git rev-parse HEAD
git status --short
```

**Whenever HEAD is not the ref the verdict is about, or the tree is dirty, every read is
`git show <ref>:<path>`.** Never a working-tree read. This is the single highest-yield habit in
the phase, because the failure it prevents is wrong, confident, and invisible all at once: the
file exists on the other branch too, the line numbers resolve, the quote looks right, and the
report contains nothing that records which branch it came from. Every downstream check passes and
the error arrives at G1 wearing the same evidence format as a correct verdict. Checkouts are
shared and move under a run, so establishing the branch once at the start does not make later
reads safe — putting the ref in the command does. That is also what makes the evidence auditable
later: `git show <ref>:src/main/main.ts` records which revision it read; "main.ts:412" does not.

## Report shape

One section per item: the item id, the verbatim claim, the classification with its revision (or
the non-claim kind), the evidence (`file:line` at a named ref), the cost pair, the smallest change
that would satisfy the concern, and any sub-check that fired. Items that need the user's ruling
are marked for G1 with the reason, and conditional verdicts name their measurement. State the
refs used, and the branch the checkout was on, at the top — so a later reader can tell what
"confirmed" was confirmed against.
