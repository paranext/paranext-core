import { LanguageStrings, LegacyComment } from 'platform-bible-utils';
import { KeyboardEvent } from 'react';
import { ConflictResolutionOutcome, VERSE_TEXT_CONFLICT } from './conflict-note-card.types';

/**
 * Tailwind classes that render note-body HTML (PT9 blockquote/prose markup) the way note contents
 * are displayed across the comment list. Shared so every consumer stays in lockstep — a change to
 * the blockquote/prose treatment here reaches all of them. Callers compose their own extras on top
 * via `cn()`: CommentItem adds `tw:items-start tw:gap-2` + line-clamp; conflict-diff's
 * `DIFF_HTML_CLASSES` (shared by ConflictNoteCard and ConflictThreadSummary) adds its `<u>`/`<s>`
 * diff coloring.
 */
export const COMMENT_BODY_PROSE_CLASSES = [
  'tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground',
  'tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground',
  'tw:prose-quoteless',
].join(' ');

/**
 * True when the note is a verseText merge conflict - the only conflict type whose root note carries
 * discrete accept/reject/merge diff+result text and drives the ConflictNoteCard. Gated on
 * `conflictType` ALONE (not `resultText`): an empty-result verseText conflict must still render the
 * resolve UI, or it would be unresolvable, because the backend blocks resolving a verseText
 * conflict through a plain status change.
 */
export function isVerseTextConflictNote(comment: LegacyComment | undefined): boolean {
  return comment?.conflictType === VERSE_TEXT_CONFLICT;
}

/**
 * Maps a resolution comment's {@link LegacyComment.conflictResolutionAction} to the outcome it
 * represents. The single source for this classification, shared by the read-only card, the
 * collapsed summary (via useConflictResolution), and CommentItem's resolution banner so they cannot
 * drift:
 *
 * - `'replaced'` → `'reject'` (the rejected side was written into the verse)
 * - `'merged'` → `'merged'` (both changes combined)
 * - Absent → `'accept'` (accepted, no text written)
 */
export function actionToOutcome(
  action: LegacyComment['conflictResolutionAction'],
): ConflictResolutionOutcome {
  if (action === 'replaced') return 'reject';
  if (action === 'merged') return 'merged';
  return 'accept';
}

/**
 * Gets the display name for an assigned user, with localized names for special values.
 *
 * @param user - The user identifier (empty string for unassigned, 'Team' for team)
 * @param localizedStrings - The localized strings to use for display names
 * @returns The display name for the user
 */
export function getAssignedUserDisplayName(
  user: string,
  localizedStrings: LanguageStrings,
): string {
  if (user === '') {
    return localizedStrings['%comment_assign_unassigned%'] ?? 'Unassigned';
  }
  if (user === 'Team') {
    return localizedStrings['%comment_assign_team%'] ?? 'Team';
  }
  return user;
}

/**
 * Checks if the Ctrl+Enter (or Cmd+Enter on Mac) keyboard shortcut was pressed
 *
 * Used for submitting comments in the CommentEditor component
 *
 * @param event OnKeyDownCapture event
 * @returns `true` if Ctrl+Enter or Cmd+Enter was pressed, otherwise `false`
 */
export function didPressCtrlOrCmdEnter(event: KeyboardEvent): boolean {
  const isMac = /Macintosh/i.test(navigator.userAgent);
  return event.key === 'Enter' && ((isMac && event.metaKey) || (!isMac && event.ctrlKey));
}
