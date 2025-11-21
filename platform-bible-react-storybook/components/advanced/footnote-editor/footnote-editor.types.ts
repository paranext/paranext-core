/**
 * Object containing all keys used for localization in the FootnoteEditor component. If you're using
 * this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const FOOTNOTE_EDITOR_STRING_KEYS = Object.freeze([
  '%footnoteEditor_callerDropdown_label%',
  '%footnoteEditor_callerDropdown_item_generated%',
  '%footnoteEditor_callerDropdown_item_hidden%',
  '%footnoteEditor_callerDropdown_item_custom%',
  '%footnoteEditor_callerDropdown_tooltip%',
  '%footnoteEditor_cancelButton_tooltip%',
  '%footnoteEditor_copyButton_tooltip%',
  '%footnoteEditor_noteType_crossReference_label%',
  '%footnoteEditor_noteType_endNote_label%',
  '%footnoteEditor_noteType_footnote_label%',
  '%footnoteEditor_noteType_tooltip%',
  '%footnoteEditor_noteTypeDropdown_label%',
  '%footnoteEditor_saveButton_tooltip%',
] as const);

export type FootnoteEditorLocalizedStrings = {
  [localizedKey in (typeof FOOTNOTE_EDITOR_STRING_KEYS)[number]]?: string;
};

export type FootnoteCallerType = 'generated' | 'hidden' | 'custom';
