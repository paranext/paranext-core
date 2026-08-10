# Reply conventions

Used by **P6 — Integrate** when drafting, and by **G2** when presenting. Every reply posts under
the user's name, in public, on a repo the whole team reads.

> *Provenance: the excerpts below are real, posted replies from PR #2621 round 4 (2026-08-07) and
> the follow-up corrections of 2026-08-10. They are public text and are quoted as-is.*
>
> **Frozen record** — the quoted replies are reproduced verbatim as posted. Their SHAs, symbol
> names, and file:line citations were true at that time and are not expected to resolve on
> current `main`. They are here as models of tone and structure, not as statements about the
> code today.

---

## Hard rules

1. **`🤖 Claude: ` once, at the top** of every body. Not repeated, not in the middle. When you
   quote a previous reply — which Example 3 requires — quote its substance and drop its prefix,
   as Example 3 does. A verbatim copy carries the prefix into the middle of the body, and the
   dry-run check in `posting-mechanics.md` hard-fails the whole batch on it; the poster is
   forbidden from editing a body to get past a check, so the fix has to happen here, at drafting.
2. **Factual about disposition.** Fixed, declined, or deferred — say which, plainly. "We'll look
   into it" is not a disposition.
3. **Deferrals cite a ticket.** A deferral is a promise. The only valid home is a ticket that
   has not been started, named by key in the reply. PR bodies and PR comments are never re-read
   after merge and do not count. If there is no ticket yet, the reply says where the item is
   tracked instead — and it says so honestly, as the follow-up example below does with
   "kept on our small-items list".
4. **Never create a Jira ticket to satisfy this.** Propose it at G1/G2 and let the user decide.
5. **Name a revision with every claim.** File:line at a stated ref, or a commit SHA re-derived
   at drafting time and re-checked at posting. A SHA orphaned by a restack in a public reply is
   its own small embarrassment, and it has happened.
6. **No labels the reviewer has never seen.** The test is visibility, not format. An id the
   reviewer themselves assigned — their own review's finding numbers — is the clearest possible
   way to say which item you are answering, and Example 3 below uses exactly that. An id that
   exists only in our packet, or a working label from a document they were never sent, is
   noise that reads as jargon. Before drafting, decide which labels are shared vocabulary for
   this round and record that list in the packet; the dry-run check in `posting-mechanics.md`
   takes it as configuration, so it flags the internal ones without flagging the shared ones.

## Structure

Lead with what is confirmed, then what is corrected, then the disposition. Reviewers read the
first sentence and skim the rest, so the first sentence carries the verdict.

```
🤖 Claude: <one-line verdict, including where it landed if it is fixed>

Confirmed: <the parts that are right, specifically, with file:line or SHA>

<The correction or refutation, with the trace that produced it>

<Disposition, and what happens next>
```

## Tone

Meet the reviewer at the code. State the trace, not the confidence — "we traced the whole
unsubscriber rather than arguing from the shape" is worth more than "we're confident this is
fine". Concede what is right before correcting what is not. Never attribute a reversal to the
reviewer. When the sequencing was ours, say so.

---

## Example 1 — refutation

Refuting the stated *harm* while confirming the observation, and showing the trace that settles
it. From `main.ts:1197`, round 4:

> 🤖 Claude: Fixed in `e98b77ea6c8`, refined in `c2fb09bdfdd`. The facts around it are right, the
> consequence is not, and we traced the whole unsubscriber rather than arguing from the shape.
>
> Confirmed: it runs twice. […] And it is a regression against the merge-base […]. All accurate.
>
> **The second call cannot reject.** `subscribeCurrentMacosMenubar` returns […] the base ones in
> `platform-event-emitter.model.ts`, which return `false` when the callback (or the whole
> subscription list) is gone and **never throw and never touch the network**. Second call
> resolves `false`. […]
>
> Residual harm of the early/double call: the menubar stops receiving menu-data updates a few
> seconds earlier during a quit. […] That is cosmetic.

What makes it work: the confirmation is specific and generous, the refutation is one bolded
claim followed by the actual call chain, and the residual harm is quantified rather than waved
away. The fix was taken anyway — a refutation does not have to end in a decline.

## Example 2 — explaining a deviation from what the reviewer asked for

Two shapes, both from round 4. **Doing more than asked**, in the same reply as above:

> `c2fb09bdfdd` also bounds it, so a quit cannot wait on an unsubscribe that never settles; that
> is not something you asked for, but "unawaited during shutdown" and "unbounded during
> shutdown" are the same category of problem and it would have been odd to fix one and leave the
> other.

**Fixing somewhere other than where they asked**, from `platform-scripture-editor/src/main.ts:279`:

> Disposition: […] the slot decision moving into the window-scoped web view service — is a design
> call rather than a patch, and it goes to the lead dev […] rather than being patched on #2621
> this round. PT-4281's scope is being checked first, as you flagged; if it already owns this,
> the fix belongs there rather than in a new place.

The pattern: name the deviation explicitly, give the reason in one clause, and say where the
work actually goes. Silence about a deviation reads as an oversight when the reviewer notices
it later — and they do notice.

## Example 3 — retraction of something already posted

When a later ruling contradicts a reply already sent, the correction goes as a threaded reply
inside the same thread (or one issue comment covering the items that have no thread). From the
2026-08-10 follow-ups on #2621:

> 🤖 Claude: Two corrections to what I told you on 2026-08-07, both from a scope ruling that came
> after those replies went out.
>
> **R4-07.** I called this "confirmed end to end… the cleanest example in the cluster", and said
> the disposition was FIX-B. The behaviour is confirmed — that part was not wrong — but its
> classification is. Our lead dev has ruled that a view registered as one-instance-at-a-time is
> an app-wide singleton by design […]. FIX-B is declined on that basis.
>
> What survives from your finding is the part that made it visible: […] That is now fixed […].
>
> **R4-08.** I partly refuted this and then conceded the duplicate-minting half […]. I am
> retracting that concession; it does not hold once PT-4285's layout persistence is in the
> picture. […] I checked this against the code rather than taking it on authority, and it holds.
>
> Sorry for the churn on both. The ruling arrived after the replies did, which is on our
> sequencing, not on your findings.

On the labels: `R4-07` and `R4-08` are the reviewer's own numbering from the round being
corrected, and `FIX-B` / `FIX-D` were named in a document he had been sent — all four were
shared vocabulary, which is why they belong in the body. The same reply would be wrong to cite
an item id that only ever existed in our packet.

Four things this does, and all four are required:

- **Quotes what was said before**, so the reviewer does not have to reconstruct it.
- **Separates what survives from what is withdrawn** — the finding usually survives even when
  the disposition does not.
- **Re-verifies rather than deferring to authority.** The second retraction says explicitly that
  the code was checked, not that the ruling was accepted.
- **Puts the churn on us.** "The ruling arrived after the replies did, which is on our
  sequencing, not on your findings."

And from the same run, on the first of those threads, the model for withdrawing a commitment:

> That branch is withdrawn. […] So the caller-facing half of FIX-D is not being built, and I
> should not have committed to a branch before that call was made.

Note also what did **not** get a reply: a fourth, softer divergence was left undrafted because
the lead dev had already cleared it with the reviewer directly, and a reply from us would only
have muddied it. That was flagged for the user to decide rather than decided by the skill.

---

## Before presenting at G2

Flag every reply that:

- refutes the reviewer or contradicts them on a point they stated confidently,
- asks them for something,
- retracts or corrects something already posted,
- announces a decline, or
- names a deferral without a ticket key.

Those are the ones the user actually needs to read word for word. Present the rest as a list.
