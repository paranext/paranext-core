import {
  CommentStatus,
  LanguageStrings,
  LegacyComment,
  LegacyCommentThread,
} from 'platform-bible-utils';
import { MouseEvent } from 'react';

/**
 * Object containing all keys used for localization in the CommentList component. If you're using
 * this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const COMMENT_LIST_STRING_KEYS = Object.freeze([
  '%no_comments%',
  '%comment_thread_single_reply%',
  '%comment_thread_multiple_replies%',
  '%comment_assigned_to%',
  '%comment_date_today%',
  '%comment_date_yesterday%',
  '%comment_replyOrAssign%',
] as const);

/** Type definition for the localized strings used in the CommentList component */
export type CommentListLocalizedStrings = {
  [localizedKey in (typeof COMMENT_LIST_STRING_KEYS)[number]]?: string;
};

export interface CommentListProps {
  /** Additional class name for the component */
  className?: string;
  /** Comment threads to render */
  threads: LegacyCommentThread[];
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  /**
   * Handler for adding a comment to a thread. If successful, returns the auto-generated comment ID
   * (format: "threadId/userName/date"). Otherwise, returns undefined.
   */
  handleAddComment: (threadId: string, contents: string) => Promise<string | undefined>;
  /** Handler for resolving the comment thread */
  handleResolveCommentThread: (threadId: string) => void;
}

export interface CommentThreadProps {
  /** Comments in the thread */
  comments: LegacyComment[];
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  /** Whether the thread is selected */
  isSelected?: boolean;
  /** Verse reference for the thread */
  verseRef?: string;
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
  /** Handler for resolving the comment thread */
  handleResolveCommentThread: (threadId: string) => void;
}

export interface CommentItemProps {
  /** Comment to render */
  comment: LegacyComment;
  /** Whether the comment is a reply or a top-level comment */
  isReply?: boolean;
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  /** Whether the thread is expanded */
  isThreadExpanded?: boolean;
  /** Handler for clicking the comment text */
  handleClickCommentText?: (event: MouseEvent<HTMLDivElement>) => void;
  /** Handler for mousedown on the comment text */
  handleMouseDownCommentText?: (event: MouseEvent<HTMLDivElement>) => void;
}
