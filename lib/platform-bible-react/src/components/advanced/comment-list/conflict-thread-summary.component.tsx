import { LanguageStrings, LegacyComment, LocalizeKey } from 'platform-bible-utils';
import { ConflictResolutionOutcome } from './conflict-note-card.types';
import { DiffHtml, sanitizeDiffHtml } from './conflict-diff';

/** The localized resolved-outcome sentence for each resolution, keyed by resolvedResolution. */
const RESOLVED_SUMMARY: Record<ConflictResolutionOutcome, { key: LocalizeKey; fallback: string }> = {
  accept: {
    key: '%conflict_note_summary_resolved_kept_current%',
    fallback: 'Conflicting edits were resolved. Kept the current text.',
  },
  reject: {
    key: '%conflict_note_summary_resolved_used_other%',
    fallback: 'Conflicting edits were resolved. Used the other change.',
  },
  merged: {
    key: '%conflict_note_summary_resolved_combined%',
    fallback: 'Conflicting edits were resolved. Combined both changes.',
  },
};

/** Props for {@link ConflictThreadSummary}. */
export interface ConflictThreadSummaryProps {
  /** The conflict thread's root note. Unresolved: its `rejectedText` diff is previewed. */
  comment: LegacyComment;
  /** Localized strings (the same set passed to ConflictNoteCard). */
  localizedStrings: LanguageStrings;
  /**
   * How the conflict was resolved, or undefined while unresolved. When set, the summary shows only
   * the matching outcome sentence (no verse text); when undefined, it shows the prompt plus the diff.
   */
  resolvedResolution?: ConflictResolutionOutcome;
}

/**
 * The collapsed preview of a verseText conflict thread. Replaces the raw PT9 note body (which
 * references an "in red" coloring the collapsed view never applied, and never updates after
 * resolution) with a status-aware one-liner. Unresolved: a prompt sentence plus the note's diff
 * rendered with the shared red/green coloring. Resolved: only the outcome sentence, no verse text.
 */
export function ConflictThreadSummary({
  comment,
  localizedStrings,
  resolvedResolution,
}: ConflictThreadSummaryProps) {
  if (resolvedResolution) {
    const { key, fallback } = RESOLVED_SUMMARY[resolvedResolution];
    return (
      <p className="tw:text-sm tw:font-normal tw:text-muted-foreground">
        {localizedStrings[key] ?? fallback}
      </p>
    );
  }

  const prompt =
    localizedStrings['%conflict_note_summary_unresolved%'] ??
    'Conflicting edits. Choose which change to keep.';
  const diffHtml = sanitizeDiffHtml(comment.rejectedText ?? '');

  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <p className="tw:text-sm tw:font-normal tw:text-muted-foreground">{prompt}</p>
      {diffHtml ? <DiffHtml html={diffHtml} /> : undefined}
    </div>
  );
}
