# PT-4030 — ConflictThread extraction (PR #2497 review, finding #15 + absorbed fixes)

## Goal

Make the shared `CommentThread` conflict-agnostic by extracting a `ConflictThread`
container, and in the same refactor land the conflict-card fixes that share its state
model. Addresses #2497 review findings #15, #1/#584, #4/#502, #2/#146, #3/#286, #10/#147,
#8/#151, #12/#300, #5/#655, #6, #148, #11. (The contract cluster #14/#16/#17/#18 and the
isolated standalone #9/#13/#19 are handled separately.)

## Architecture — slot-exposing shell

`CommentThread` stays the single owner of the thread chrome (header, replies, selection,
read-status) and becomes conflict-agnostic. It exposes three optional render slots, each
with a generic default:

- `rootCommentSlot?` — the root-comment render. Default: `<CommentItem>` for the root.
- `expandedBodySlot?` — extra body content shown when the thread is selected. Default: none.
- `resolveActionSlot?` — the header hover resolve affordance. Default: the generic
  status-resolve ✓.

All conflict props/state/effects/branches are removed from `CommentThread`.

`useConflictResolution(threadId, conflictResolution, { isSelected, threadStatus,
activeComments, firstComment })` owns all conflict state and logic:

- `conflictOptions: 'loading' | 'none' | 'accept' | 'acceptOrReject' | 'acceptRejectOrMerge'`
  — adds the `'loading'` sentinel. Starts `'loading'`; fetched only when `isSelected`
  (fixes #10), inside a try/catch that degrades to `'none'` (fixes #8).
- `resolve(resolution)` — resolve handler with optimistic outcome threading: on success it
  records the chosen outcome instead of forcing `'none'`, so a reject/merge shows the
  correct side immediately (fixes #2 flash).
- `resolvedResolution` — status-aware: an action counts as a resolved outcome only when
  `threadStatus === 'Resolved'` (fixes #3).
- `showResolveCheck` — true only when options are loaded and resolvable (fixes #1 and #4).
- `isVerseTextConflictNote(comment)` — the one shared verseText predicate (fixes #12),
  gated on `conflictType` alone so empty-result conflicts stay resolvable (fixes #6; without
  it, the pt-4029 A1 backend guard makes them unresolvable through any path).

`ConflictThread` wraps `CommentThread` and fills the slots:

- `rootCommentSlot` → `ConflictThreadSummary` for verseText, else `CommentItem` fallback so
  non-verseText conflicts keep author/date/status/menu (fixes #5).
- `expandedBodySlot` → `ConflictNoteCard`, uncontrolled (drops `selectedResolution`, #11),
  rendering a skeleton while `conflictOptions === 'loading'` (no flash) and an empty-state
  Result region (#148).
- `resolveActionSlot` → the conflict ✓, gated on `showResolveCheck`.

## Props boundary (#15 proper)

The two conflict-only callbacks (`handleResolveConflict`,
`getConflictResolutionOptionsCallback`) collapse from scattered props on the generic
`CommentListProps` / `CommentThreadProps` into one optional
`conflictResolution?: { resolve; getOptions }` slot consumed only by `ConflictThread`.
`canUserResolveThreadCallback` stays generic (it gates the non-conflict ✓ too).

## Testing

- Existing conflict tests re-point at `ConflictThread`.
- New: a no-flash test (resolving reject never transiently renders the accepted text) and a
  ✓-gating test (a non-assignee sees no ✓).
- Generic-list/thread tests must still pass with `CommentThread` now conflict-agnostic.
- Then run the app and drive the resolve flow to confirm no flash.

## Out of scope

Broader list/thread restructuring beyond the conflict boundary; the I-3 a11y tooltip work
(deferred to a UX ticket).
