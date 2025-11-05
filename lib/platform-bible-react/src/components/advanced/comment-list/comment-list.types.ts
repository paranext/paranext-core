import {
  CommentStatus,
  LanguageStrings,
  LegacyComment,
  LegacyCommentThread,
} from 'platform-bible-utils';

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
  className?: string;
  threads: LegacyCommentThread[];
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
}

export interface CommentThreadProps {
  comments: LegacyComment[];
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  isSelected?: boolean;
  verseRef?: string;
  assignedUser?: string;
  handleSelectThread: (threadId: string) => void;
  threadId: string;
  threadStatus?: CommentStatus;
}

export interface CommentItemProps {
  comment: LegacyComment;
  isReply?: boolean;
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  isThreadExpanded?: boolean;
}
