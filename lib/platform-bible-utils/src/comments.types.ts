// #region Enums

/** Possible status of a comment/note as defined in Paratext 9 */
export type CommentStatus = 'Unspecified' | 'Todo' | 'Done' | 'Resolved';

/** Possible types of comment/note as defined in Paratext 9 */
export type CommentType = 'Unspecified' | 'Normal' | 'Conflict';

// #endregion

// #region Legacy Types

/**
 * Represents a single comment/note in a scripture text
 *
 * This is the C# Comment type from Paratext.Data.ProjectComments
 */
export type LegacyComment = {
  /** Present in a note when it has been assigned to a particular user */
  assignedUser?: string;
  /** Present when there is a Biblical Term Id associated with the note */
  biblicalTermId?: string;
  /**
   * Type of conflict. Only applicable for conflict notes and it used to give a more specific
   * message when displaying the note.
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
  /** Language of note */
  language: string;
  /** Present in a note when it has been assigned to reply-to a particular user */
  replyToUser?: string;
  /** Text which was selected in comment, or "" for none */
  selectedText?: string;
  /** Present in a note when it has been marked to be shared in teh Global Consultant Notes */
  shared?: string;
  /** Approximate position where the comment begins. Zero for attached to a verse. */
  startPosition: number;
  /** Can be "todo", "done", or "deleted." Empty string falls back to previous status in thread. */
  status?: string;
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
  /** User to whom the thread is assigned */
  assignedUser: string;
  /** User to reply to */
  replyToUser: string;
  /** Last modified date (ISO 8601 string) */
  modifiedDate: string;
  /** Scripture reference for this thread */
  verseRef: string;
  /** Name of the context scripture text */
  contextScrTextName?: string;
  /** Whether this is a spelling note */
  isSpellingNote: boolean;
  /** Whether this is a back translation note */
  isBTNote: boolean;
  /** Whether this is a consultant note */
  isConsultantNote: boolean;
  /** Biblical term ID if this is a biblical term note */
  biblicalTermId?: string;
};

// #endregion
