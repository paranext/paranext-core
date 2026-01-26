/**
 * Object containing all keys used for localization in the CommentEditor component. If you're using
 * this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const COMMENT_EDITOR_STRING_KEYS = Object.freeze([
  '%commentEditor_placeholder%',
  '%commentEditor_saveButton_tooltip%',
  '%commentEditor_cancelButton_tooltip%',
  '%commentEditor_assignTo_label%',
  '%commentEditor_unassigned%',
  '%commentEditor_team%',
] as const);

/** Localized strings needed for the comment editor component */
export type CommentEditorLocalizedStrings = {
  [localizedKey in (typeof COMMENT_EDITOR_STRING_KEYS)[number]]?: string;
};
