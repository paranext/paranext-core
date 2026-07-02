import { LanguageStrings, LegacyComment, LocalizeKey } from 'platform-bible-utils';

/**
 * The resolution a user picks for a conflict: keep the accepted (winning) side or take the rejected
 * (losing) side.
 */
export type ConflictResolution = 'accept' | 'reject';

/**
 * How an already-resolved conflict was resolved, derived from the resolution comment's
 * `conflictResolutionAction`:
 *
 * - `'accept'`: resolved by accepting (no text was written); the accepted side stands.
 * - `'reject'`: resolved by rejecting (the rejected side was written into the verse).
 * - `'merged'`: a PT9 three-way merge (only possible in data synced from PT9; PT10 never produces
 *   it). Neither stored result field can represent the merged verse, so the card hides its Result
 *   region for this outcome.
 *
 * Distinct from {@link ConflictResolution} (the live accept/reject choice) because it adds the
 * `'merged'` legacy outcome and is only meaningful for a conflict that is already resolved.
 */
export type ConflictResolutionOutcome = 'accept' | 'reject' | 'merged';

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
  '%conflict_note_outcome_replaced%',
  '%conflict_note_outcome_merged%',
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
   * `'none'` (read-only): it makes the Result region show the outcome that was actually applied
   * ('accept' -> resultText, 'reject' -> rejectedResultText) instead of the live selector state,
   * and hides the Result region for a 'merged' outcome. Ignored while the conflict is still
   * resolvable.
   */
  resolvedResolution?: ConflictResolutionOutcome;
  /** Called when the user clicks Resolve, with the currently selected resolution. */
  onResolve?: (resolution: ConflictResolution) => void;
  /** Disables the selector and Resolve button while a resolve call is in flight. */
  isResolving?: boolean;
}
