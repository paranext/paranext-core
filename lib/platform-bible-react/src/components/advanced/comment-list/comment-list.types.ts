import {
  CommentStatus,
  LanguageStrings,
  LegacyComment,
  LegacyCommentThread,
  LocalizeKey,
} from 'platform-bible-utils';

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
export const COMMENT_LIST_STRING_KEYS: LocalizeKey[] = [
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
  '%no_comments%',
];

/** Type definition for the localized strings used in the CommentList component */
export type CommentListLocalizedStrings = {
  [localizedKey in (typeof COMMENT_LIST_STRING_KEYS)[number]]?: string;
};

/** Props for the CommentList component */
export interface CommentListProps {
  /** Additional class name for the component */
  className?: string;
  /** Class name to apply to the display of the verse text for the first comment in the thread */
  classNameForVerseText?: string;
  /** Comment threads to render */
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
  /** Handler for selecting the thread */
  handleSelectThread: (threadId: string) => void;
  /** ID of the thread */
  threadId: string;
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
