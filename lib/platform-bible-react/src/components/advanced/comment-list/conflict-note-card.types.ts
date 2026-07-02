import { LanguageStrings, LegacyComment, LocalizeKey } from 'platform-bible-utils';

/**
 * The resolution a user picks for a conflict: keep the accepted (winning) side or take the rejected
 * (losing) side.
 */
export type ConflictResolution = 'accept' | 'reject';

/**
 * The resolution actions the current user may take on a conflict thread (from the comments data
 * provider's getConflictResolutionOptions). Must stay textually identical to the union declared in
 * legacy-comment-manager.d.ts.
 *
 * - 'none': controls hidden entirely (already resolved, or no permission).
 * - 'accept': the verse was edited after the merge (stale) — Reject is disabled with an explanation;
 *   Accept keeps the current text.
 * - 'acceptOrReject': fully available.
 */
export type ConflictResolutionOptions = 'none' | 'accept' | 'acceptOrReject';

/**
 * Localization keys used by the ConflictNoteCard. Pass into the useLocalizedStrings hook (in the
 * consuming extension) and forward the result via the localizedStrings prop.
 */
export const CONFLICT_NOTE_STRING_KEYS: LocalizeKey[] = [
  '%conflict_note_description_verseText%',
  '%conflict_note_choose_label%',
  '%conflict_note_choose_aria_label%',
  '%conflict_note_accept%',
  '%conflict_note_reject%',
  '%conflict_note_rejected_label%',
  '%conflict_note_accepted_label%',
  '%conflict_note_result_label%',
  '%conflict_note_resolve%',
  '%conflict_note_stale_notice%',
  '%conflict_note_resolve_failed%',
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
  /**
   * Which resolution actions are available (default 'acceptOrReject'). 'none' hides the selector
   * and Resolve button entirely (read-only regions); 'accept' disables the Reject option with a
   * stale-verse explanation tooltip.
   */
  availableActions?: ConflictResolutionOptions;
  /** Called when the user clicks Resolve, with the currently selected resolution. */
  onResolve?: (resolution: ConflictResolution) => void;
  /** Disables the selector and Resolve button while a resolve call is in flight. */
  isResolving?: boolean;
}
