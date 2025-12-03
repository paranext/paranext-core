import {
  CommentStatus,
  LanguageStrings,
  LegacyComment,
  LegacyCommentThread,
  LocalizeKey,
} from 'platform-bible-utils';

/**
 * Object containing all keys used for localization in the CommentList component. If you're using
 * this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const COMMENT_LIST_STRING_KEYS: LocalizeKey[] = [
  '%comment_assigned_to%',
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
  /** Comment threads to render */
  threads: LegacyCommentThread[];
  /** Name of the current user, retrieved from the current user's Paratext Registry user information */
  currentUser: string;
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  /**
   * Handler for adding a comment to a thread. If successful, returns the auto-generated comment ID
   * (format: "threadId/userName/date"). Otherwise, returns undefined.
   */
  handleAddComment: (threadId: string, contents: string) => Promise<string | undefined>;
  /** Handler for setting the comment thread status (resolve/unresolve) */
  handleResolveCommentThread: (
    threadId: string,
    resolve: boolean,
    contents?: string,
  ) => Promise<boolean>;
  /** Handler for updating a comment's content */
  handleUpdateComment: (commentId: string, contents: string) => Promise<boolean>;
  /** Handler for deleting a comment */
  handleDeleteComment: (commentId: string) => Promise<boolean>;
}

/** Props for the CommentThread component */
export interface CommentThreadProps {
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
   * Handler for adding a comment to a thread. If successful, returns the auto-generated comment ID
   * (format: "threadId/userName/date"). Otherwise, returns undefined.
   */
  handleAddComment: (threadId: string, contents: string) => Promise<string | undefined>;
  /** Handler for setting the comment thread status (resolve/unresolve) */
  handleResolveCommentThread: (
    threadId: string,
    resolve: boolean,
    contents?: string,
  ) => Promise<boolean>;
  /** Handler for updating a comment's content */
  handleUpdateComment: (commentId: string, contents: string) => Promise<boolean>;
  /** Handler for deleting a comment */
  handleDeleteComment: (commentId: string) => Promise<boolean>;
}

/** Props for the CommentItem component */
export interface CommentItemProps {
  /** Comment to render */
  comment: LegacyComment;
  /** Whether the comment is a reply or a top-level comment */
  isReply?: boolean;
  /**
   * Whether the comment is editable or not. Only the most recent comment on a thread can be edited
   * and it can only be edited by its author.
   */
  isEditable?: boolean;
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  /** Whether the thread is expanded */
  isThreadExpanded?: boolean;
  /** Current status of the thread */
  threadStatus?: CommentStatus;
  /** Handler for setting the comment thread status (resolve/unresolve) */
  handleResolveCommentThread?: (threadId: string, resolve: boolean) => Promise<boolean>;
  /** Handler for updating a comment's content */
  handleUpdateComment?: (commentId: string, contents: string) => Promise<boolean>;
  /** Handler for deleting a comment */
  handleDeleteComment?: (commentId: string) => Promise<boolean>;
  /** Callback when editing state changes */
  onEditingChange?: (isEditing: boolean) => void;
}
