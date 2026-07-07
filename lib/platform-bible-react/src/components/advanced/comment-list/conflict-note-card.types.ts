import { LegacyComment } from 'platform-bible-utils';

/**
 * The resolution a user picks for a conflict: keep the accepted (winning) side or take the rejected
 * (losing) side.
 */
export type ConflictResolution = 'accept' | 'reject';

/**
 * Object containing all keys used for localization in the ConflictNoteCard component. If you're
 * using this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component.
 */
export const CONFLICT_NOTE_STRING_KEYS = Object.freeze([
  '%conflictNote_description_verseText%',
  '%conflictNote_chooseLabel%',
  '%conflictNote_chooseAriaLabel%',
  '%conflictNote_accept%',
  '%conflictNote_reject%',
  '%conflictNote_rejectedLabel%',
  '%conflictNote_acceptedLabel%',
  '%conflictNote_resultLabel%',
  '%conflictNote_resultUnavailable%',
] as const);

/** Type definition for the localized strings used in the ConflictNoteCard component */
export type ConflictNoteCardLocalizedStrings = {
  [localizedKey in (typeof CONFLICT_NOTE_STRING_KEYS)[number]]?: string;
};

/** Props for the ConflictNoteCard component */
export interface ConflictNoteCardProps {
  /**
   * The conflict comment. Reads rejected/accepted/result/rejectedResultText + conflictType; falls
   * back to contents.
   */
  comment: LegacyComment;
  /** Optional localized strings for the component; English fallbacks apply when omitted */
  localizedStrings?: ConflictNoteCardLocalizedStrings;
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
