# Converting off-PR feedback into PR-anchored threads

Used by **P6 — Integrate** whenever feedback arrived as a document, a DM, or a chat message
rather than as PR comments — and whenever the reply contains a question we need answered.

> *Provenance: the pattern is the skill design's §2.1. The worked example is
> `2026-08-10-tj-pr-thread-packet.md` in the epic's PRD folder — one lead-dev document with zero
> PR presence, converted into 8 anchored threads plus 3 index comments across three stacked PRs,
> all 11 posted and verified in one pass.*
>
> **Frozen record** — the example PR numbers, branches, and file:line anchors below describe that
> 2026-08 stack and are not expected to resolve on current `main`. The pattern is what transfers.

---

## The default

**Anything we need an answer on ships as an inline review thread anchored at the exact code
site, on the PR that carries that code** — plus **one index comment per PR** gathering that PR's
open questions.

Documents are for private, pre-decision material: verification packets, triage, drafts. They are
not where the ask lives. A reviewer should never have to hold a document and a diff side by side
to answer a question about the diff.

Answering a document with a document feels natural and is the wrong move. It buries the ask
where nobody who reviews the PR will see it, it dies when the document does, and it forces the
reviewer to do the anchoring work themselves.

## Framing: no scaffolding

Threads are written **neutrally**. Each one states:

1. the **current verified facts** — file:line at that PR's head,
2. **our position**,
3. **the options**, and
4. **one concrete ask**.

No "your document said", no "your correction was wrong", no reference to the source document at
all. The reviewer's own text is not the subject; the code is. Fact-fixes that carry no open
question are folded, **without provenance**, into the current-state notes block of the index
comment for the PR they concern.

This is not politeness for its own sake. A thread framed as a rebuttal to a document is
unreadable to everyone except its author and its target — including the same reviewer six weeks
later.

### The cold-read acceptance test

Before a body is final, read it as someone who has never seen the source document, is not the
person who wrote the feedback, and has only this PR open. They must be able to tell: what the
code currently does, what is being proposed, what the alternatives are, and what is being asked
of them. If any of those requires the document, rewrite the body — do not attach the document.

## Anchoring

**Every anchor is verified against that PR's own diff before drafting**, not after. Two
properties must hold:

1. The line's content at the PR head matches the line the draft quotes.
2. The line is an **added** line in that PR's own diff (`merge-base(base, head)...head`).

Anchoring to a line the PR did not touch produces a comment on unrelated context, and anchoring
to a stale line number produces a comment pointing at the wrong code entirely.

When no suitable added line exists, fall back to a **file-level comment** and say in the body
which lines it concerns. That is a deliberate fallback, not a failure — but note it, because a
comment that silently degrades to file-level when a line anchor was intended is a different
artifact than the one that was approved (the poster checks `subject_type` for exactly this).

**Anchor at the docblock or the declaration that frames the question**, not at an arbitrary line
inside an implementation. The anchor is context for the reader, so it should be the thing the
question is about.

### Anchor verification script

Run it **twice**. It reads `bodies.json`, which `extract_bodies.py` writes — so at drafting time,
write the item→anchor mapping table below into that same shape (`item`, `pr`, `path`, `line`,
`side`, `anchor_line`) and run it before a single body is written; then run it again at posting
time over the real `bodies.json`, against the re-derived heads. The first pass is what keeps a bad
anchor out of a draft; the second is what keeps a moved head out of a post. Skipping the first
because the file does not exist yet is how an anchor error survives all the way to G2.

```bash
<skill-dir>/scripts/verify_anchors.py "$PACKET" <repo-root>
```

Both paths are arguments and every git call inside is `git -C <repo-root>`. Inheriting the working
directory would make each check depend on where the process happened to be launched, and the
failure surfaces as the uniform "not present at head", which reads as *the code moved* rather than
*we ran in the wrong directory*.

It reads `<packet>/heads.json` and `<packet>/bases.json` — `{"2659": "<40-char-sha>"}` and
`{"2659": "<base-branch-name>"}` — and checks two things per inline item:

1. **The line's content at the PR head matches what the draft quotes.** The file is split with
   `splitlines()`, not `split("\n")`: a newline-terminated file yields `N+1` elements under
   `split()`, so line `N+1` clears a `line > len(...)` guard and then indexes the empty trailing
   element — which compares equal to a blank `anchor_line` and passes silently. An empty
   `anchor_line` is itself an error, since it quotes nothing.
2. **The line is an ADDED line in that PR's own diff**, taken against the merge-base so the
   comparison is the branch's own work rather than everything that landed on the base since it
   forked.

## The index comment

One per PR, titled for the reviewer, gathering that PR's open questions so they are visible from
the conversation tab rather than only from the diff.

```
🤖 Claude: For the reviewer — open questions on this PR

**1. <Short title of the question>.** See the inline thread at `<path>:<line>`. <One paragraph:
what the PR currently does, what the alternative would cost, and why it needs them rather than
us. The concrete ask stays in the thread.>

**2. <Second question.>** <Same shape. Include ordering constraints even where there is no
question — "no question here, flagging the ordering so it is visible" is a legitimate entry.>

**Current state notes on this PR** (facts, for reading the diff)

- <Fact with file:line, at this PR's head. Folded in without provenance.>
- <One per line, four or five at most.>
```

Keep the questions in the threads and the *summary* in the index comment. Duplicating the full
argument in both is how a reviewer ends up answering in the wrong place.

## Which PR gets which item

Each item goes on the PR **that carries the code it is about** — not on the PR the conversation
started under. On a stack that means walking the items against branch geometry first, and it is
worth writing that mapping down explicitly before drafting:

| Item | PR | Kind | Anchor |
|---|---|---|---|
| T1 | #2649 | inline | `src/main/services/web-view.service-router.ts:223` |
| I-2649 | #2649 | index | — |

Record the verification basis in the packet too — for each PR: branch, head SHA, base, commit
count, with ancestry confirmed along the chain (`git merge-base --is-ancestor` in both
directions). Everything downstream is measured against that table.

## Head SHAs are re-derived at posting time

Always, without exception. Stacks get force-pushed, sometimes between drafting and posting.
`gh pr view <n> --json headRefOid --jq .headRefOid` at the moment of posting, and re-run the
anchor verification against those heads. If a head moved since drafting, the anchors are
re-checked before anything posts — a moved head does not automatically invalidate an anchor, but
it does invalidate the *evidence* that the anchor was good.

Walk order when posting: group by PR, threads before that PR's index comment, so the reviewer's
notifications arrive as a coherent sequence.

## Items that should not be converted

Not everything belongs on a PR. Flag rather than force:

- Items about work that has no PR yet.
- Items that are really a conversation for the person, not the repo — those go in a DM the user
  sends, pointing at the threads.
- Items already resolved by code, which post nothing and are stated as a fact inside the index
  comment instead.

## After the round: the durability rule

Review threads **die with the squash-merge**. Every decision that lives only in a thread must be
copied into a durable home before the PR merges — an ADR, a standards entry, a ticket the user
has agreed to, or the ledger. That is P8's job, and it is the step most easily lost when a round
ends on a successful post.
