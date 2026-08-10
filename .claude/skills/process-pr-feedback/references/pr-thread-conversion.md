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

```python
#!/usr/bin/env python3
"""Verify every inline anchor: the content at the PR head matches the quoted anchor line,
and the line is an ADDED line in that PR's own diff (base...head)."""
import json, re, subprocess, sys

items = [i for i in json.load(open("bodies.json", encoding="utf-8"))
         if i["kind"] == "inline"]
HEADS = {2649: "<full-40-char-sha>"}          # gh pr view <n> --json headRefOid
BASES = {2649: "<base-branch-name>"}          # gh pr view <n> --json baseRefName


def sh(*args):
    return subprocess.run(args, capture_output=True, text=True, check=True).stdout


fails = []
for it in items:
    pr, path, line, head = it["pr"], it["path"], it["line"], HEADS[it["pr"]]

    # 1. the line's content at the PR head must match what the draft quotes
    try:
        flines = sh("git", "show", f"{head}:{path}").split("\n")
    except subprocess.CalledProcessError:
        fails.append(f"{it['item']}: {path} not present at head {head[:11]}")
        continue
    if line > len(flines):
        fails.append(f"{it['item']}: line {line} beyond EOF ({len(flines)}) in {path}")
        continue
    actual, expected = flines[line - 1], it["anchor_line"]
    if actual.strip() != expected.strip():
        fails.append(f"{it['item']}: anchor mismatch at {path}:{line}\n"
                     f"    draft:   {expected!r}\n    at head: {actual!r}")

    # 2. the line must be an ADDED line in this PR's own diff
    mb = sh("git", "merge-base", f"origin/{BASES[pr]}", head).strip()
    added, new_ln = set(), None
    for dl in sh("git", "diff", "--unified=0", mb, head, "--", path).split("\n"):
        h = re.match(r"^@@ -\S+ \+(\d+)(?:,(\d+))? @@", dl)
        if h:
            new_ln = int(h.group(1))
        # `new_ln is None` covers the ---/+++ file headers, which always precede the first @@.
        # Do NOT also skip on startswith("+++"): an added line whose own text begins with "++"
        # renders as "+++…", and skipping it without advancing new_ln shifts every later line
        # number in the file by one. That is reachable from any doc containing a diff snippet.
        elif new_ln is None:
            continue
        elif dl.startswith("+"):
            added.add(new_ln)
            new_ln += 1
        elif dl.startswith(" "):
            new_ln += 1
    if line not in added:
        fails.append(f"{it['item']}: {path}:{line} is not an ADDED line in PR #{pr} "
                     f"({mb[:11]}...{head[:11]})")

if fails:
    print("ANCHOR VERIFY: FAIL")
    for f_ in fails:
        print("  - " + f_)
    sys.exit(1)
print(f"ANCHOR VERIFY: PASS - all {len(items)} anchors resolve as added lines at their PR head")
```

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
