import { SerializedEditorState } from 'lexical';
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
}

/**
 * A comment the user has typed but not committed — an unsent reply, an unsaved edit to an existing
 * comment, or both at once (the reply compose box stays visible while editing an existing comment
 * whenever it already has content). Held by the consumer rather than by the thread component, so it
 * survives the component unmounting (a filter change does that routinely).
 */
export type CommentDraft = {
  /** Serialized contents of the unsent reply, or `undefined` when nothing has been typed. */
  editorState?: SerializedEditorState;
  /** Pending assignee, or `undefined` when none has been chosen. */
  assignedUser?: string;
  /**
   * Unsaved edits to existing comments in this thread, keyed by comment id. A thread can hold an
   * unsent reply and an in-progress edit at the same time, so these are tracked separately rather
   * than sharing one editor state.
   */
  commentEdits?: Readonly<Record<string, SerializedEditorState>>;
};

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
  '%comment_aria_cancel_edit%',
  '%comment_aria_save_edit%',
] as const);

/**
 * Type definition for the localized strings used in the CommentList component. Handy for typing the
 * object a consumer builds from `useLocalizedStrings(COMMENT_LIST_STRING_KEYS)`, so a mistyped key
 * is caught at compile time.
 */
export type CommentListLocalizedStrings = {
  [localizedKey in (typeof COMMENT_LIST_STRING_KEYS)[number]]?: string;
};

/**
 * DOM id of the CommentList container element. Exported so consumers that need to interact with the
 * rendered list (e.g. scrolling it into view) can look it up by a shared, typed name instead of a
 * hardcoded string that could silently drift from the actual markup.
 */
export const COMMENT_LIST_ELEMENT_ID = 'comment-list';

/**
 * Returns the DOM id used for a comment thread's rendered element, given its thread id. Currently
 * an identity function — the thread element's id is the thread id itself — but centralizes that
 * contract in one place so CommentThread (which sets the id) and any external consumer (which looks
 * it up) can never silently disagree.
 */
export function getCommentThreadElementId(threadId: string): string {
  return threadId;
}

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
  /**
   * Uncommitted drafts by thread id. A thread with no entry has no draft.
   *
   * Pass this together with `onDraftChange`, or omit both — `CommentThreadProps.draft` documents
   * what goes wrong with only one of the pair.
   */
  drafts?: Readonly<Record<string, CommentDraft>>;
  /**
   * Called when a thread's draft changes. `draft` is `undefined` when the draft becomes empty, so a
   * consumer can drop the entry rather than keep an empty one that would read as a draft.
   */
  onDraftChange?: (threadId: string, draft: CommentDraft | undefined) => void;
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
  /**
   * This thread's uncommitted draft — reply-box contents, a pending assignee, or both. When
   * provided (even as `{}`), it is rendered instead of internal state (see
   * {@link CommentListProps.drafts}). Falls back to internal state when omitted, so callers that
   * don't manage drafts keep working.
   *
   * Pass `draft` and `onDraftChange` together, or omit both — either one without the other silently
   * freezes the tracked draft, and in a way that is easy to miss: the underlying Lexical editor
   * keeps its own internal typing buffer regardless (its initial content is read once at mount, not
   * on every render), so characters keep appearing as the user types. What breaks is everything
   * that reads the _tracked_ draft instead of the editor's live buffer — most visibly, the Submit
   * button (gated on the tracked draft having content) stays disabled forever with content visibly
   * in the box. Concretely:
   *
   * - `onDraftChange` supplied, `draft` omitted: this component is "controlled" and stops writing its
   *   own internal fallback state, but with no `draft` prop to read back from, the tracked draft
   *   stays at its empty initial value forever.
   * - `draft` supplied (to any fixed value, `{}` included), `onDraftChange` omitted: this component
   *   keeps updating its internal fallback state on every keystroke as normal, but the defined
   *   `draft` prop always takes precedence over that internal state, so the tracked draft stays
   *   pinned at whatever `draft` was on the first render.
   */
  draft?: CommentDraft;
  /**
   * Called when this thread's draft changes. See {@link CommentListProps.onDraftChange}. Falls back
   * to purely internal state when omitted.
   */
  onDraftChange?: (threadId: string, draft: CommentDraft | undefined) => void;
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
  /**
   * Controlled contents of an in-progress edit to this comment. When provided, it is rendered
   * instead of internal state, and entering/leaving edit mode is derived from whether it is
   * defined. Falls back to internal state when omitted.
   *
   * Pass `draftEditorState` and `onDraftEditorStateChange` together, or omit both — this follows
   * the same sometimes-controlled shape as `CommentThreadProps.draft`, and either prop without the
   * other is dangerous in its own way, not merely inert:
   *
   * - `onDraftEditorStateChange` supplied, `draftEditorState` omitted: this component stops writing
   *   its internal fallback state, but with nothing to read back from, the tracked state stays
   *   `undefined` forever — `isEditing` (derived from it) never becomes true, so entering edit mode
   *   never visibly happens at all.
   * - `draftEditorState` supplied (to any defined value), `onDraftEditorStateChange` omitted: this
   *   component keeps updating its internal fallback state as the user types, but the defined
   *   `draftEditorState` prop always takes precedence over it, so the tracked state stays pinned at
   *   whatever was passed on the first render. Because Lexical's own editing buffer is independent
   *   of that prop after mount, the user still sees their keystrokes — but Save reads the frozen
   *   tracked state, not the buffer, so it silently commits the stale content instead of what was
   *   typed.
   */
  draftEditorState?: SerializedEditorState;
  /**
   * Called when the in-progress edit's contents change. `undefined` when the edit is cancelled or
   * saved, so a consumer can drop a stored draft rather than keep an empty one. Falls back to
   * purely internal state when omitted.
   */
  onDraftEditorStateChange?: (editorState: SerializedEditorState | undefined) => void;
}
