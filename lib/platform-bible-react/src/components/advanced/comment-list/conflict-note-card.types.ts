import {
  ConflictResolutionOptions,
  LanguageStrings,
  LegacyComment,
  LocalizeKey,
} from 'platform-bible-utils';

/**
 * The resolution a user picks for a conflict: keep the accepted (winning) side, take the rejected
 * (losing) side, or merge (combine) both sides.
 */
export type ConflictResolution = 'accept' | 'reject' | 'merge';

/**
 * How an already-resolved conflict was resolved, derived from the resolution comment's
 * `conflictResolutionAction`:
 *
 * - `'accept'`: resolved by accepting (no text was written); the accepted side stands.
 * - `'reject'`: resolved by rejecting (the rejected side was written into the verse).
 * - `'merged'`: resolved by combining both changes (PT10's "Combine both changes" option, or a PT9
 *   three-way merge). The card shows the merged verse text (`mergedText`); the outcome itself is
 *   stated in prose by CommentItem's resolution-reply banner, not on the card.
 *
 * Distinct from {@link ConflictResolution} (the live accept/reject choice) because it adds the
 * `'merged'` legacy outcome and is only meaningful for a conflict that is already resolved.
 */
export type ConflictResolutionOutcome = 'accept' | 'reject' | 'merged';

/**
 * Localization keys used by the ConflictNoteCard. Pass into the useLocalizedStrings hook (in the
 * consuming extension) and forward the result via the localizedStrings prop.
 */
export const CONFLICT_NOTE_STRING_KEYS: LocalizeKey[] = [
  '%conflict_note_description_verseText%',
  // Accessible name for the resolution radio group (the group has no other visible <label>).
  '%conflict_note_choose_aria_label%',
  '%conflict_note_stale_notice%',
  '%conflict_note_resolve_failed%',
  '%conflict_note_choose_prompt%',
  '%conflict_note_option_keep_current%',
  '%conflict_note_option_use_other%',
  '%conflict_note_option_combine%',
  '%conflict_note_save_and_resolve%',
  // Tooltip when Save is disabled (keeping the current text is a no-op).
  '%conflict_note_save_disabled_tooltip%',
  // Tooltip when Save is enabled (the resolution is irreversible).
  '%conflict_note_save_warning%',
  // Consumed by CommentItem for a conflict thread's resolution banner (not by ConflictNoteCard):
  // the neutral outcome line derived from conflictResolutionAction.
  '%conflict_note_outcome_used_other%',
  '%conflict_note_outcome_combined%',
  // Consumed by ConflictThreadSummary (the collapsed conflict-thread preview): a status-aware
  // one-liner shown instead of the raw PT9 note body. Unresolved shows the prompt plus the diff;
  // resolved shows only the outcome sentence keyed off resolvedResolution.
  '%conflict_note_summary_unresolved%',
  '%conflict_note_summary_resolved_kept_current%',
  '%conflict_note_summary_resolved_used_other%',
  '%conflict_note_summary_resolved_combined%',
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
  /**
   * Which way an already-resolved conflict was resolved. Used ONLY when `availableActions` is
   * `'none'` (read-only): it makes the Result region show the text that was actually applied
   * ('accept' -> resultText, 'reject' -> rejectedResultText, 'merged' -> mergedText) instead of the
   * live selector state. Ignored while the conflict is still resolvable.
   */
  resolvedResolution?: ConflictResolutionOutcome;
  /** Called when the user clicks Resolve, with the currently selected resolution. */
  onResolve?: (resolution: ConflictResolution) => void;
  /** Disables the selector and Resolve button while a resolve call is in flight. */
  isResolving?: boolean;
}
