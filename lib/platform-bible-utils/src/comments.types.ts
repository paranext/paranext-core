// #region Enums

/** Possible status of a comment/note as defined in Paratext 9 */
export type CommentStatus = 'Unspecified' | 'Todo' | 'Done' | 'Resolved';

/**
 * Possible types of comment/note as defined in Paratext 9. P9 also defines a "Unspecified" type,
 * which used to be used for filtering. It now gets treating the same as Normal, so we don't need to
 * include it here.
 */
export type CommentType = 'Normal' | 'Conflict';

/**
 * The resolution actions the current user may take on a `verseText` conflict thread, as reported by
 * the legacy comment data provider's `getConflictResolutionOptions`. Defined here so the comment
 * data provider's type declaration and the conflict-note-card UI share a single source of truth.
 *
 * - `'none'`: no actions available - the thread is already resolved, is not a `verseText` conflict,
 *   or the user lacks permission. UIs should hide the accept/reject controls entirely.
 * - `'accept'`: the verse was edited after the merge (stale), so only "accept" (keep the current
 *   text) is available; reject/merge are disabled.
 * - `'acceptOrReject'`: accept and reject are available, but the two sides overlap and cannot be
 *   auto-merged, so merge is not offered.
 * - `'acceptRejectOrMerge'`: accept, reject, and merge are all available.
 */
export type ConflictResolutionOptions =
  | 'none'
  | 'accept'
  | 'acceptOrReject'
  | 'acceptRejectOrMerge';

// #endregion

// #region Legacy Types

/**
 * Represents a single comment/note in a scripture text
 *
 * This is the C# Comment type from Paratext.Data.ProjectComments
 */
export type LegacyComment = {
  /**
   * Only present on the ROOT comment of a `verseText` conflict thread: HTML diff of the accepted
   * (winning) side (same `<u>`/`<s>` markup as {@link rejectedText}). Also absent for `verseText`
   * conflicts that have no common ancestor (two translators independently drafted the same
   * previously-absent verse, so no accepted-side diff exists), and when the accepted-side diff has
   * no visible content. Never present on replies. Consumers must treat this field as optional even
   * on `verseText` conflict notes.
   */
  acceptedText?: string;
  /** Present in a note when it has been assigned to a particular user */
  assignedUser?: string;
  /** Present when there is a Biblical Term Id associated with the note */
  biblicalTermId?: string;
  /**
   * Type of conflict. Only applicable for conflict notes and it used to give a more specific
   * message when displaying the note. Only meaningful on a thread's ROOT comment (not necessarily
   * `comments[0]` — see {@link LegacyCommentThread.comments}); never present on replies.
   */
  conflictType?: string;
  /**
   * The conflict-resolution action recorded on a conflict thread's resolution comment, present only
   * when text was written into the verse:
   *
   * - `'replaced'` — the conflict was rejected, so the previously-rejected side was written into the
   *   text (replacing what Paratext had accepted).
   * - `'merged'` - the conflict was resolved via PT10's merge action, which writes PT9's auto-merged
   *   (both-sides) text into the verse; data synced from a PT9 three-way merge may also carry it.
   *
   * Absent means the conflict was accepted (no text write) or this is not a resolution comment.
   * Unlike the four `verseText` decode fields, this is NOT gated on `conflictType`: the resolution
   * comment has type `Conflict` but no `conflictType`, so it must be read directly from this
   * field.
   */
  conflictResolutionAction?: 'replaced' | 'merged';
  /** Contents of the comment, represented in HTML that includes some Paratext 9 specific tags */
  contents: string;
  /**
   * If SelectedText is not empty, some optional context of the selected text occurs immediately
   * after the selection.
   */
  contextAfter?: string;
  /**
   * If SelectedText is not empty, some optional context of the selected text occurs immediately
   * before the selection.
   */
  contextBefore?: string;
  /** Date the comment was created (format like 2008-04-10T06:30:00.0000000-07:00) */
  date: string;
  /** True if the comment has been deleted */
  deleted: boolean;
  /** Additional information for the note header, added for Biblical Term notes. */
  extraHeadingInfo?: string;
  /** Present in a comment to hide the note when showing notes in teh Scripture text windows. */
  hideInTextWindow: boolean;
  /** Unique id of the comment, unchanged by subsequent editing */
  id: string;
  /** Whether the comment has been read (by the current user) */
  isRead: boolean;
  /** Language of note */
  language: string;
  /**
   * The PT9 "merge all changes" diff preview (same markup as {@link acceptedText}/
   * {@link rejectedText}); present only when the two changes are independent.
   */
  mergedText?: string;
  /**
   * Only present on the ROOT comment of a `verseText` conflict thread (never on replies): the
   * resulting verse USFM (plain, no diff markup) if the change is REJECTED — i.e. the losing side.
   * Pairs with {@link resultText} (the accepted outcome) to drive a dynamic result preview. Absent
   * when the reject outcome decodes to an empty verse (e.g. the losing side deleted the verse) or
   * the note carries no decodable diff. May be absent even when {@link rejectedText} is present —
   * the two are independently optional.
   */
  rejectedResultText?: string;
  /**
   * Only present on the ROOT comment of a `verseText` conflict thread, and only when the rejected
   * (losing) side's rendered diff has visible content: HTML diff of the rejected side, using
   * Paratext 9's `<u>` (inserted) and `<s>` (deleted) markup. This is full HTML,
   * `<blockquote>`-wrapped like {@link contents}. Coloring is applied by the UI, not carried in the
   * markup. Absent for normal notes, non-`verseText` conflicts, replies, and conflicts whose
   * rejected-side diff body is empty.
   */
  rejectedText?: string;
  /** Present in a note when it has been assigned to reply-to a particular user */
  replyToUser?: string;
  /**
   * Only present on the ROOT comment of a `verseText` conflict thread when the merged result verse
   * USFM is non-empty: the resulting verse USFM (plain, no diff markup) already written into the
   * text at merge time. Equals the accepted side in v1. Absent otherwise. On a `verseText` conflict
   * ROOT this value equals the serialized {@link verse} field, but the two are deliberately
   * distinct: `verse` is ungated per-comment verse-history data whose meaning varies by position
   * (on a reply it is the verse text captured at reply time, possibly stale), while `resultText` is
   * root-only conflict metadata. Conflict-card consumers must read `resultText`, never `verse`.
   */
  resultText?: string;
  /** Text which was selected in comment, or "" for none */
  selectedText?: string;
  /** Present in a note when it has been marked to be shared in teh Global Consultant Notes */
  shared?: string;
  /** Approximate position where the comment begins. Zero for attached to a verse. */
  startPosition: number;
  /** Can be "todo", "done", or "deleted." Empty string falls back to previous status in thread. */
  status?: CommentStatus;
  /** Tags added in this note, joined with (',') */
  tagAdded?: string;
  /** Tags removed in this note, joined with (',') */
  tagRemoved?: string;
  /** Guid of the thread of comments */
  thread: string;
  /**
   * Type of note. Normal notes have no type (""), but conflicts that are stored as notes have type
   * "conflict."
   */
  type?: string;
  /** Name of the user who created this comment */
  user: string;
  /**
   * The verse USFM captured on this comment. Per-comment history data, present on replies too:
   * Paratext 9 stores the current verse text on any comment written after the verse changed. Only
   * on a conflict thread's ROOT comment does it hold the merged result — conflict-card consumers
   * should read {@link resultText} instead of this field.
   */
  verse?: string;
  /** Verse reference in which comment appears */
  verseRef: string;
};

/**
 * Represents a comment thread - a collection of related comments
 *
 * This is the C# CommentThread type from Paratext.Data.ProjectComments
 */
export type LegacyCommentThread = {
  /** Thread identifier (from first comment) */
  id: string;
  /**
   * All comments in this thread.
   *
   * The conflict-only fields ({@link LegacyComment.conflictType}, {@link LegacyComment.rejectedText},
   * {@link LegacyComment.acceptedText}, {@link LegacyComment.resultText}, and
   * {@link LegacyComment.rejectedResultText}) live on this thread's ROOT comment — the
   * earliest-`date` comment — which after thread-fragment deduplication is NOT necessarily
   * `comments[0]`. Locate the root by earliest `date` (or simply read whichever comment carries the
   * fields); never assume a fixed array position.
   */
  comments: LegacyComment[];
  /** Thread status (aggregated from most recent non-Unspecified comment) */
  status: CommentStatus;
  /** Thread type (from first comment) */
  type: CommentType;
  /**
   * User to whom the thread is assigned
   *
   * - `undefined` or not present if there is no assignment info
   * - Empty string means explicitly unassigned
   */
  assignedUser?: string;
  /** User to reply to */
  replyToUser?: string;
  /** Last modified date (ISO 8601 string) */
  modifiedDate: string;
  /** Scripture reference for this thread */
  verseRef: string;
  /** Name of the context scripture text */
  contextScrTextName?: string;
  /** Whether this is a spelling note */
  isSpellingNote: boolean;
  /** Whether this is a biblical terms note */
  isBTNote: boolean;
  /** Whether this is a consultant note */
  isConsultantNote: boolean;
  /** Whether the thread has been read (by the current user) */
  isRead: boolean;
  /** Biblical term ID if this is a biblical term note */
  biblicalTermId?: string;
};

// #endregion
