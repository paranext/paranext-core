// #region Enums

/** Possible status of a comment/note as defined in Paratext 9 */
export type CommentStatus = 'Unspecified' | 'Todo' | 'Done' | 'Resolved';

/**
 * Possible types of comment/note as defined in Paratext 9. P9 also defines a "Unspecified" type,
 * which used to be used for filtering. It now gets treating the same as Normal, so we don't need to
 * include it here.
 */
export type CommentType = 'Normal' | 'Conflict';

// #endregion

// #region Legacy Types

/**
 * Represents a single comment/note in a scripture text
 *
 * This is the C# Comment type from Paratext.Data.ProjectComments
 */
export type LegacyComment = {
  /**
   * Only present on the FIRST comment of a `verseText` conflict thread: HTML diff of the accepted
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
   * message when displaying the note. Only meaningful on the first comment of a thread; never
   * present on replies.
   */
  conflictType?: string;
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
   * Only present on the FIRST comment of a `verseText` conflict thread (never on replies): the
   * resulting verse USFM (plain, no diff markup) if the change is REJECTED — i.e. the losing side.
   * Pairs with {@link resultText} (the accepted outcome) to drive a dynamic result preview. Absent
   * when the reject outcome decodes to an empty verse (e.g. the losing side deleted the verse) or
   * the note carries no decodable diff. May be absent even when {@link rejectedText} is present —
   * the two are independently optional.
   */
  rejectedResultText?: string;
  /**
   * Only present on the FIRST comment of a `verseText` conflict thread, and only when the rejected
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
   * Only present on the first comment of a `verseText` conflict thread when the merged result verse
   * USFM is non-empty: the resulting verse USFM (plain, no diff markup) already written into the
   * text at merge time. Equals the accepted side in v1. Absent otherwise. For `verseText` conflict
   * roots this value equals the serialized {@link verse} field — it is kept as a distinct field for
   * the conflict-card contract and its empty-collapse guarantee, so consumers should not treat
   * `resultText` and `verse` as independent data.
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
  /** Original USFM content of verse */
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
  /** All comments in this thread */
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
