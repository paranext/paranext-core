# Donna resolves conflicting edits after syncing: investigation

> PRD: `PRD-Power-Donna resolves conflicting edits after syncing_0-002.md` (v0-002, owner Vladimir).
> Shakedown run of `/investigate-prd`, 2026-07-02. Note: three of the work items below were found
> already in flight as open PRs — this brief reflects the backlog as of today, not a blind plan.

## 1. What the PRD asks for

Two people edited the same verse between syncs; auto-merge can't decide. PT10 must flag the
conflict, show both versions, and let an authorized user choose — without Mercurial knowledge or
fear of silent data loss. Appetite: 2 weeks (1 developer + designer).

| ID   | Non-negotiable                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------- |
| NN-1 | PT detects and flags merge conflicts after sync completes, and notifies Donna about them            |
| NN-2 | A conflict-resolution dialog showing both versions side-by-side                                     |
| NN-3 | The dialog makes unambiguous: (1) what text is rejected, (2) what is accepted, (3) how the result will look |
| NN-4 | Accept/reject per individual conflicting change                                                     |
| NN-5 | Project returns to a clean state after resolution, ready for the next sync                          |

| ID    | Nice-to-have                                                          |
| ----- | --------------------------------------------------------------------- |
| NTH-1 | Inline preview of the merged result as Donna chooses                   |
| NTH-2 | Bulk 'accept all mine' / 'accept all theirs' shortcuts with safeguards |
| NTH-3 | Attribution: who made each conflicting change                          |

No-gos: auto-resolution strategies beyond accept/reject · character-level or sub-verse merge
editing in v1 · Paratext Live (separate epic).

## 2. What already exists

- **Paratext 9:** conflicts never block sync. Auto-merge picks a winner per chapter
  (`BookFileMerger.cs:165-172` — "most changes wins", receiving machine wins ties) and
  materializes each conflict as a specially-typed project note (`NoteType.Conflict`) carrying the
  losing change as a diff, the winning diff, and the winner's verse snapshot
  (`RecordConflict`, `BookFileMerger.cs:494-556`). Resolution is per-note with three actions —
  accept (note-only), replace (splice rejected text via `PutText`), merge (only when diffs don't
  overlap) — gated by admin-or-(assignee with chapter edit) plus a stale-verse guard
  (`CommentHtmlBuilder.cs:101-132`, `CommentEditHelper.cs:339-418`). The merge is committed at
  receive time, so there is no dirty state to clean; resolving the notes IS the clean-up (NN-5).
- **Paratext 10, shipped:** conflict count already surfaces post-sync in the S/R results dialog
  and sync status (`results-view.component.tsx:240-260`, `sync-status.web-view.tsx:93-206`);
  comments PDP models conflict notes and resolve permissions
  (`ParatextProjectDataProvider.cs:916-1012`); comment-list web view threads
  `canUserResolveThreadCallback` to the UI.
- **Paratext 10, in flight (open PRs):** the conflict read-contract — rejected/accepted/result
  text fields (PR #2482); the presentational `ConflictNoteCard` with live result preview
  (PR #2484); `resolveConflict(accept|reject)` on the comments PDP with the permission gate
  (PR #2495).
- **Reusable as-is:** everything above. **Needs building:** the glue — post-sync notification,
  the unresolved-conflicts filter, and wiring the card + resolve call into the comments panel.

## 3. Proposed work items

| #    | Work item                                                              | Repo                                       | Complexity | Depends on       | Covers               |
| ---- | ---------------------------------------------------------------------- | ------------------------------------------ | ---------- | ---------------- | -------------------- |
| WI-1 | Land conflict read-contract: rejected/accepted/result fields (PR #2482) | paranext-core                              | Complex    | —                | NN-3                 |
| WI-2 | Land presentational conflict-note card (PR #2484)                       | paranext-core                              | Complex    | WI-1             | NN-2, NN-3, NTH-1    |
| WI-3 | Land resolveConflict accept/reject on comments PDP (PR #2495)           | paranext-core                              | Complex    | —                | NN-4, NN-5           |
| WI-4 | Notify on post-sync conflicts, link to the conflict list                | paratext-bible-internal-extensions + core  | Simple     | WI-5             | NN-1                 |
| WI-5 | Add "Unresolved conflicts" view to the comments panel filter            | paranext-core                              | Simple     | —                | NN-1 (landing view)  |
| WI-6 | Integrate the card into the comments list and wire resolution           | paranext-core                              | Moderate   | WI-1, WI-2, WI-3 | NN-2, NN-3, NN-4     |

**WI-1 — Conflict read-contract.** In flight (PR #2482). `PlatformCommentWrapper` decodes conflict
notes via ParatextData and emits `rejectedText` / `acceptedText` / `resultText` /
`rejectedResultText`; types mirrored in `comments.types.ts`. Scope: `verseText` conflicts; other
types leave the fields empty (card falls back). Remaining: review + land.

**WI-2 — Conflict-note card.** In flight (PR #2484). Presentational card in
`lib/platform-bible-react` comment-list family: Accept/Reject selector, Accepted/Rejected diff
regions, read-only Result preview tracking the selection (NTH-1 comes free), restricted/no-ancestor
states. No PAPI calls — wiring is WI-6. Remaining: review + land.

**WI-3 — Resolve backend.** In flight (PR #2495). `resolveConflict(threadId, 'accept'|'reject')`
on the comments PDP: accept resolves the note only; reject splices the losing USFM via PT9's
`CommentEditHelper` then resolves; admin-or-assignee gate enforced backend-side; fires comment +
scripture update events. PT9-compatible round-trip. Remaining: review + land.

**WI-4 — Post-sync notification.** Build. When S/R results carry `conflictCount > 0`, send a
platform notification ("merge conflicts occurred") whose click opens the comments panel on the
unresolved-conflicts view (`legacyCommentManager.openCommentList`); pattern already at
`paratext-bible-send-receive/src/main.ts:309-316`. Also style the existing results-dialog conflict
row as a warning with the same link. Leaves to siblings: the destination view (WI-5).

**WI-5 — Unresolved-conflicts filter.** Build. Add the filter option to the comments panel
toolbar; the data layer already selects by type + status. PT9 has this list (reached from menu +
post-sync link) but hides it from its filter dropdown — PT10 exposes it (deliberate divergence).

**WI-6 — Card integration.** Build. Render `ConflictNoteCard` for `type: 'Conflict'` threads in
the comments panel, feed WI-1 fields, call WI-3 on confirm, surface errors (note stays unresolved
on failure), respect `canUserResolveThread`, contribute the `%conflict_note_*%` localized strings
(defined but contributed nowhere yet). Ensure the WI-4 link lands on and selects the right thread.

## 4. Requirement coverage

| Requirement                    | Work item(s)     | Notes                                                                  |
| ------------------------------ | ---------------- | ---------------------------------------------------------------------- |
| NN-1 detect + notify           | WI-4, WI-5       | Detection + count already ship in S/R results; WI-4 adds the notify half |
| NN-2 both versions shown       | WI-2, WI-6       | Stacked regions in the comments panel, not a separate dialog (see §5)    |
| NN-3 rejected/accepted/result  | WI-1, WI-2, WI-6 | Data / presentation / live wiring halves                                 |
| NN-4 accept/reject per change  | WI-3, WI-6       | Per conflict note = per verse (PT9's unit of "individual change")        |
| NN-5 clean state after resolve | WI-3             | No dirty merge state exists in PT9's model; resolving notes is the clean-up |
| NTH-1 inline result preview    | WI-2             | Included — the card's Result region tracks the selection live            |
| NTH-2 bulk accept-all          | —                | Cut first (PRD's own rule). If pulled in: small TS loop over WI-3's method |
| NTH-3 attribution              | —                | Out of v1 — PT9 parity doesn't include it (see §5)                       |

## 5. Questions for the product owner

1. **"Dialog" vs in-panel card (NN-2).** The in-flight card stacks Accepted/Rejected/Result inside
   the comments panel (PT9's layout, fits the narrow panel) rather than a separate side-by-side
   dialog. Suggested: accept the card as satisfying NN-2; the three-clarity contract (NN-3) is
   what matters. *(Assumed yes for this brief.)*
2. **Attribution (NTH-3).** PT9's verse conflict notes deliberately carry no author names ("Two
   different people made conflicting changes…"); per-side authorship exists only via Verse
   History / the change summary. Surfacing names per change needs a new data surface (authorship
   lives in Mercurial changesets, behind the closed Studio overlay). Suggested: keep out of v1.
3. **Non-verseText conflict types.** The in-flight stack targets `verseText`; the six other PT9
   conflict-note types render as a read-only fallback. Suggested: fine for v1 — chapter-level
   conflicts are rare and PT9 auto-picks a winner for them anyway.
4. **Two inherited PT9 hazards** (flagged from source): replace/merge silently no-op if the verse
   marker isn't found (thread can resolve with no text change), and the merge path lacks a
   null-guard PT9's UI compensates for. WI-3 currently inherits best-effort behavior. Suggested:
   keep PT9 behavior for v1 compatibility, file a follow-up hardening item.
5. **PT9's "Delete all conflict notes" dev gesture** (Shift-menu). Wanted in PT10? Suggested: no
   for this epic; note it in the dev-access inventory (proposed DEV-008).
