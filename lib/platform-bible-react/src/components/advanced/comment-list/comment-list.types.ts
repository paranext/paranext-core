import {
  CommentStatus,
  LanguageStrings,
  LegacyComment,
  LegacyCommentThread,
} from 'platform-bible-utils';
import { ReactNode } from 'react';
import { ConflictResolution, ConflictResolutionOptions } from './conflict-note-card.types';

/**
 * Conflict-resolution callbacks a conflict thread needs: apply a resolution, and query which
 * resolutions are available. Bundled into one optional slot so the generic list/thread props stay
 * conflict-agnostic - only ConflictThread reads it.
 */
export interface ConflictResolutionCallbacks {
  /**
   * Applies a conflict resolution via the comments data provider's resolveConflict. Returns true on
   * success, false on failure (the card re-enables its controls).
   */
  resolve: (threadId: string, resolution: ConflictResolution) => Promise<boolean>;
  /**
   * Returns which resolution actions the current user may take on a conflict thread (the
   * getConflictResolutionOptions capability). Treat missing as 'none'.
   */
  getOptions: (threadId: string) => Promise<ConflictResolutionOptions>;
  /** Undo a resolved conflict (restore the auto-merge winner + reopen). Resolves false on failure. */
  unresolve: (threadId: string) => Promise<boolean>;
  /** Capability query: may the current user undo this conflict's resolution? */
  getUndoAvailability: (threadId: string) => Promise<boolean>;
}

/** Options for adding a comment to a thread */
export type AddCommentToThreadOptions = {
  /** The ID of the thread to add the comment to */
  threadId: string;
  /** The content of the comment (optional - can be omitted when only changing status or assignment) */
  contents?: string;
  /** Status to set on the thread ('Resolved' or 'Todo') */
  status?: CommentStatus;
  /** User to assign to the thread. Use "" for unassigned, "Team" for team assignment. */
  assignedUser?: string;
};

/**
 * Object containing all keys used for localization in the CommentList component. If you're using
 * this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const COMMENT_LIST_STRING_KEYS = Object.freeze([
  '%comment_assign_team%',
  '%comment_assign_unassigned%',
  '%comment_assigned_to%',
  '%comment_assigning_to%',
  '%comment_dateAtTime%',
  '%comment_date_today%',
  '%comment_date_yesterday%',
  '%comment_deleteComment%',
  '%comment_editComment%',
  '%comment_replyOrAssign%',
  '%comment_reopenResolved%',
  '%comment_status_resolved%',
  '%comment_status_todo%',
  '%comment_thread_multiple_replies%',
  '%comment_thread_single_reply%',
  '%comment_aria_assign_user%',
  '%comment_aria_submit_comment%',
  '%comment_aria_mark_as_read%',
  '%comment_aria_mark_as_unread%',
  '%comment_aria_resolve_thread%',
] as const);

/**
 * Type definition for the localized strings used in the CommentList component. Handy for typing the
 * object a consumer builds from `useLocalizedStrings(COMMENT_LIST_STRING_KEYS)`, so a mistyped key
 * is caught at compile time.
 */
export type CommentListLocalizedStrings = {
  [localizedKey in (typeof COMMENT_LIST_STRING_KEYS)[number]]?: string;
};

/** Props for the CommentList component */
export interface CommentListProps {
  /** Additional class name for the component */
  className?: string;
  /** Class name to apply to the display of the verse text for the first comment in the thread */
  classNameForVerseText?: string;
  /**
   * Comment threads to render. The component filters out threads where all comments are deleted,
   * but does not deduplicate threads. Callers are responsible for pre-filtering (e.g. excluding
   * `isSpellingNote` and `isBTNote` threads, which belong in Wordlist and Biblical Terms
   * respectively) and for deduplicating threads with repeated IDs before passing them in.
   */
  threads: LegacyCommentThread[];
  /** Name of the current user, retrieved from the current user's Paratext Registry user information */
  currentUser: string;
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  /**
   * Externally controlled selected thread ID. When provided, this will be used as the selected
   * thread instead of internal state. The parent component is responsible for updating this value
   * when the selection changes.
   */
  selectedThreadId?: string;
  /**
   * Callback when the selected thread changes. Called when a thread is selected via click or
   * keyboard navigation. Parent components can use this to sync their state with the internal
   * selection.
   */
  onSelectedThreadChange?: (threadId: string | undefined) => void;
  /**
   * Handler for adding a comment to a thread. This unified handler supports:
   *
   * - Adding a comment (provide contents)
   * - Resolving/unresolving a thread (provide status: 'Resolved' or 'Todo')
   * - Assigning a user (provide assignedUser)
   * - Any combination of the above
   *
   * If successful, returns the auto-generated comment ID (format: "threadId/userName/date").
   * Otherwise, returns undefined.
   */
  handleAddCommentToThread: (options: AddCommentToThreadOptions) => Promise<string | undefined>;
  /** Handler for updating a comment's content */
  handleUpdateComment: (commentId: string, contents: string) => Promise<boolean>;
  /** Handler for deleting a comment */
  handleDeleteComment: (commentId: string) => Promise<boolean>;
  /** Handler for updating a thread's read status */
  handleReadStatusChange: (threadId: string, markRead: boolean) => Promise<boolean>;
  /**
   * Users that can be assigned to threads. Includes special values: "Team" for team assignment, ""
   * (empty string) for unassigned.
   */
  assignableUsers?: string[];
  /**
   * Whether the current user can add comments to existing threads in this project. When false, UI
   * elements for adding comments to threads should be hidden or disabled.
   */
  canUserAddCommentToThread?: boolean;
  /**
   * Callback to check if the current user can assign a specific thread. Returns a promise that
   * resolves to true if the user can assign the thread, false otherwise.
   */
  canUserAssignThreadCallback?: (threadId: string) => Promise<boolean>;
  /**
   * Callback to check if the current user can resolve or re-open a specific thread. Returns a
   * promise that resolves to true if the user can resolve the thread, false otherwise.
   */
  canUserResolveThreadCallback?: (threadId: string) => Promise<boolean>;
  /**
   * Callback to check if the current user can edit or delete a specific comment. Returns a promise
   * that resolves to true if the user can edit or delete the comment, false otherwise.
   */
  canUserEditOrDeleteCommentCallback?: (commentId: string) => Promise<boolean>;
  /** Callback when the user clicks a verse reference in a comment thread. */
  onVerseRefClick?: (thread: LegacyCommentThread) => void;
  /**
   * Conflict-resolution callbacks (resolve + getOptions). Conflict threads render a read-only card
   * when this is not provided.
   */
  conflictResolution?: ConflictResolutionCallbacks;
}

/** Props for the CommentThread component */
export interface CommentThreadProps {
  /** Class name to apply to the display of the verse text for the first comment in the thread */
  classNameForVerseText?: string;
  /** Comments in the thread */
  comments: LegacyComment[];
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  /** Whether the thread is selected */
  isSelected?: boolean;
  /** Verse reference for the thread */
  verseRef?: string;
  /** Name of the current user, retrieved from the current user's Paratext Registry user information */
  currentUser: string;
  /** User assigned to the thread */
  assignedUser?: string;
  /**
   * User to pre-select in the reply "Assign to" dropdown when the thread is expanded. Used to
   * persist the last chosen assignee across consecutive replies within a session.
   */
  initialAssignedUser?: string;
  /** Handler for selecting the thread */
  handleSelectThread: (threadId: string) => void;
  /** ID of the thread */
  threadId: string;
  /** The full thread object, passed through so the onVerseRefClick callback can access all data */
  thread: LegacyCommentThread;
  /** Status of the thread */
  threadStatus?: CommentStatus;
  /**
   * Handler for adding a comment to a thread. This unified handler supports:
   *
   * - Adding a comment (provide contents)
   * - Resolving/unresolving a thread (provide status: 'Resolved' or 'Todo')
   * - Assigning a user (provide assignedUser)
   * - Any combination of the above
   *
   * If successful, returns the auto-generated comment ID (format: "threadId/userName/date").
   * Otherwise, returns undefined.
   */
  handleAddCommentToThread: (options: AddCommentToThreadOptions) => Promise<string | undefined>;
  /** Handler for updating a comment's content */
  handleUpdateComment: (commentId: string, contents: string) => Promise<boolean>;
  /** Handler for deleting a comment */
  handleDeleteComment: (commentId: string) => Promise<boolean>;
  /** Handler for updating read status */
  handleReadStatusChange?: (threadId: string, markRead: boolean) => void;
  /**
   * Users that can be assigned to threads. Includes special values: "Team" for team assignment, ""
   * (empty string) for unassigned.
   */
  assignableUsers?: string[];
  /**
   * Whether the current user can add comments to existing threads in this project. When false, UI
   * elements for adding comments to threads should be hidden or disabled.
   */
  canUserAddCommentToThread?: boolean;
  /**
   * Callback to check if the current user can assign a specific thread. Returns a promise that
   * resolves to true if the user can assign the thread, false otherwise.
   */
  canUserAssignThreadCallback?: (threadId: string) => Promise<boolean>;
  /**
   * Callback to check if the current user can resolve or re-open a specific thread. Returns a
   * promise that resolves to true if the user can resolve the thread, false otherwise.
   */
  canUserResolveThreadCallback?: (threadId: string) => Promise<boolean>;
  /**
   * Callback to check if the current user can edit or delete a specific comment. Returns a promise
   * that resolves to true if the user can edit or delete the comment, false otherwise.
   */
  canUserEditOrDeleteCommentCallback?: (commentId: string) => Promise<boolean>;
  /** Whether the thread has been read (by the current user) */
  isRead?: boolean;
  /** Delay in seconds before auto-marking as read when selected, default 5s */
  autoReadDelay?: number;
  /** Callback when the user clicks a verse reference in a comment thread. */
  onVerseRefClick?: (thread: LegacyCommentThread) => void;
  /**
   * Pre-computed non-deleted comments. When provided (e.g. by ConflictThread, which already derives
   * them for its own logic), the thread uses these instead of re-filtering `comments`, avoiding a
   * duplicate pass each render. Omitted for direct consumers, which filter `comments` themselves.
   */
  activeComments?: LegacyComment[];
  /**
   * Overrides the root-comment render (the collapsed root area). When omitted, the thread renders
   * the standard CommentItem for its first comment. ConflictThread uses this to show the conflict
   * summary (collapsed) or the ConflictNoteCard (expanded) for verseText conflicts.
   */
  rootContentSlot?: ReactNode;
  /**
   * Overrides the header hover resolve affordance. When omitted, the thread renders its generic
   * status-resolve check (gated on canUserResolveThreadCallback). Pass a node to replace it, or
   * `false` to render nothing. ConflictThread uses this to supply the conflict-gated resolve
   * check.
   */
  resolveActionSlot?: ReactNode;
  /**
   * Adds a small vertical gap between the root content and the replies when the thread is expanded
   * and has visible replies, so a resolution card isn't flush against its replies.
   */
  spaceRootContentFromReplies?: boolean;
}

/**
 * Props for the ConflictThread container: the generic CommentThread shell's props plus the
 * conflict-only resolution callbacks that ConflictThread (not the shell) consumes. Kept off
 * CommentThreadProps so the conflict-agnostic shell's contract stays clean.
 */
export interface ConflictThreadProps extends CommentThreadProps {
  /**
   * Conflict-resolution callbacks (resolve + getOptions). When omitted, the conflict thread renders
   * a read-only card.
   */
  conflictResolution?: ConflictResolutionCallbacks;
}

/** Props for the CommentItem component */
export interface CommentItemProps {
  /** Comment to render */
  comment: LegacyComment;
  /** Whether the comment is a reply or a top-level comment */
  isReply?: boolean;
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  /** Whether the thread is expanded */
  isThreadExpanded?: boolean;
  /** Current status of the thread */
  threadStatus?: CommentStatus;
  /**
   * Handler for adding a comment to a thread (used for resolving). If successful, returns the
   * auto-generated comment ID. Otherwise, returns undefined.
   */
  handleAddCommentToThread?: (options: AddCommentToThreadOptions) => Promise<string | undefined>;
  /** Handler for updating a comment's content */
  handleUpdateComment?: (commentId: string, contents: string) => Promise<boolean>;
  /** Handler for deleting a comment */
  handleDeleteComment?: (commentId: string) => Promise<boolean>;
  /** Callback when editing state changes */
  onEditingChange?: (isEditing: boolean) => void;
  /** Whether the current user can edit or delete this comment */
  canEditOrDelete?: boolean;
  /** Whether the current user can resolve or re-open this thread. */
  canUserResolveThread?: boolean;
}
