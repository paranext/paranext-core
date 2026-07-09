import { LanguageStrings } from 'platform-bible-utils';
import { KeyboardEvent } from 'react';

/**
 * Tailwind classes that render note-body HTML (PT9 blockquote/prose markup) the way both
 * CommentItem and ConflictNoteCard display note contents. Shared so the two stay in lockstep — a
 * change to the blockquote/prose treatment here reaches both. Callers layer their own extras on top
 * (CommentItem adds `tw:items-start tw:gap-2` + line-clamp; ConflictNoteCard adds its `<u>`/`<s>`
 * diff coloring).
 */
export const COMMENT_BODY_PROSE_CLASSES = [
  'tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground',
  'tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground',
  'tw:prose-quoteless',
].join(' ');

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
