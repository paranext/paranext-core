# Classification rubric

Used by **P1 — Verify**. Every inventory item gets exactly one classification, decided by
reading the code at the named revision — never by judging whether the reviewer's story sounds
plausible.

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

### Cost class

Every non-INVALID item also carries a cost class, because G1 and `--fast-lane` both depend on
it: **XS** (a line or a word), **S** (one file, no design), **M** (several files or a test
rewrite), **L** (a design change or a new API surface).

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

Run all of these on every item. They are the checks that produced the three examples above, and
each one has caught something the plain read did not.

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

## Read-only discipline

Verification touches nothing. `git show` / `git diff` / `git log` at explicit refs, plus reads of
the working tree. No checkout, no commit, no push, no PR or comment mutation. State the refs
used at the top of the report, so a later reader can tell what "confirmed" was confirmed
against.

## Report shape

One section per item: the item id, the verbatim claim, the classification with its revision, the
evidence (file:line at a named ref), the cost class, the smallest change that would satisfy the
concern, and any sub-check that fired. Items that need the user's ruling are marked for G1 with
the reason.
