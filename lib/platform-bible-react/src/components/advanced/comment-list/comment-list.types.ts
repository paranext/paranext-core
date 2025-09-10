import { LanguageStrings } from "platform-bible-utils";

/**
 * Object containing all keys used for localization in the CommentList component. If you're
 * using this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const COMMENT_LIST_STRING_KEYS = Object.freeze([
  '%first_one_here%',
] as const);

/** Type definition for the localized strings used in the CommentList component */
export type CommentListLocalizedStrings = {
  [localizedKey in (typeof COMMENT_LIST_STRING_KEYS)[number]]?: string;
};

export type CommentData = {
  assignedUser?: string;
  // biblicalTermId?: string;
  // conflictType?: string;
  /** details of the comment in markdown format */
  contents: string;
  // contextAfter?: string;
  // contextBefore?: string;
  date: Date;
  deleted?: boolean;
  // extraHeadingInfo?: string;
  // hideInTextWindow: boolean;
  id: string;
  //language: string;
  // parentId?: string;
  replies?: CommentData[];
  // replyToUser?: string;
  // selectedText?: string;
  // shared?: string;
  // startPosition: number;
  status?: string;
  // tagAdded?: string;
  // tagRemoved?: string;
  thread: string;
  // type?: string;
  user: string;
  verse?: string;
  verseRef: string;
};

export interface CommentListProps {
  className?: string;
  comments: CommentData[];
  formatDate?: (date: Date) => string;
  /** Optional localized strings for the component */
  localizedStrings?: LanguageStrings;
}

export interface CommentThreadProps {
  comment: CommentData;
  formatDate?: (date: Date) => string;
  /** Optional localized strings for the component */
  localizedStrings?: LanguageStrings;
  selected?: boolean;
}

export interface CommentItemProps {
  comment: CommentData;
  formatDate?: (date: Date) => string;
  isReply?: boolean;
  /** Optional localized strings for the component */
  localizedStrings?: LanguageStrings;
}
