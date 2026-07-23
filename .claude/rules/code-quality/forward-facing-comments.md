## Prefer Forward-Facing Comments Over Backward-Facing Ones

A code comment earns its place only if it helps someone who reads or changes the code later and
never saw this PR. Before keeping any comment you add or change, apply one test:

**Strip the PR/development context — does the comment still help?** If it only explains how the
code reached its current state during this PR, cut it. If it points forward — to open work, a
constraint, or rationale that can't be inlined — keep it.

### Backward-facing — cut these

These record development history. They rot the moment the PR merges and mean nothing to a future
reader:

- Ticket/PR references for work done *in this PR*: `PT-4214`, `PR #2561`, review-finding IDs like
  `(review C61-2)`.
- "Fixes error E1 found in a test pass", "addressed in review round 2".
- Stage/epic tags: `Stage U`, `Phase 3`.
- Dated development notes: `found live in E2E 2026-07-16`.

The right home for "this change was made because of PT-1234" is the commit message or PR body, not
the source file.

### Forward-facing — keep these

These tell a future maintainer something they still need:

- An **open** `PT-XXXX` for follow-up work deliberately *not* done in this PR — best written as a
  TODO, so the ID signals exactly when the code can be cleaned up:
  ```ts
  // TODO(PT-1234): Remove this workaround once the upstream bug is fixed
  ```
- A non-inlinable rationale or deep link, e.g. a specific comment thread:
  ```ts
  // The API rejects empty ranges on purpose; see PT-2196?focusedCommentId=... for the reasoning.
  ```
- A constraint, invariant, or gotcha the code depends on.
- Why the code takes a surprising or non-obvious approach.

A `PT-XXXX` reference is legitimate here — the test is whether it points *forward* (open work or
context that survives the merge), not the mere presence of an ID.

### Why this needs a deliberate pass

AI-authored diffs over-produce backward-facing comments *systematically*: the failing test, the
review finding, and the ticket in play are exactly what is in the model's context while the comment
is written, so it narrates provenance instead of what a maintainer needs. `eslint` and the
`/code-review` conventions/cleanup angles don't reliably catch these, so make it an explicit step:

**Before you treat a change as complete, re-read every comment you added or changed in the diff,
apply the strip-the-PR-context test to each, and delete the backward-facing ones** — moving
anything still worth saying into the commit message or PR body.

(When you are *reviewing* someone else's diff and the pattern is pervasive, raise it once at the PR
level rather than flagging every site.)
