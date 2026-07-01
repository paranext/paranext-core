import { LanguageStrings, LegacyComment, LocalizeKey } from 'platform-bible-utils';

/**
 * The resolution a user picks for a conflict: keep the accepted (winning) side or take the rejected
 * (losing) side.
 */
export type ConflictResolution = 'accept' | 'reject';

/**
 * Localization keys used by the ConflictNoteCard. Pass into the useLocalizedStrings hook (in the
 * consuming extension) and forward the result via the localizedStrings prop.
 */
export const CONFLICT_NOTE_STRING_KEYS: LocalizeKey[] = [
  '%conflict_note_description_verseText%',
  '%conflict_note_choose_label%',
  '%conflict_note_accept%',
  '%conflict_note_reject%',
  '%conflict_note_rejected_label%',
  '%conflict_note_accepted_label%',
  '%conflict_note_result_label%',
];

/** Props for the ConflictNoteCard component */
export interface ConflictNoteCardProps {
  /**
   * The conflict comment. Reads rejected/accepted/result/rejectedResultText + conflictType; falls
   * back to contents.
   */
  comment: LegacyComment;
  /** Localized strings for the component */
  localizedStrings: LanguageStrings;
  /**
   * Controlled selected resolution. When omitted, the card manages its own state (default
   * 'accept').
   */
  selectedResolution?: ConflictResolution;
  /** Called when the user changes the Accept/Reject selection */
  onResolutionChange?: (resolution: ConflictResolution) => void;
  /** Whether the current user may accept/reject; disables the selector when false */
  canAcceptReject?: boolean;
}
