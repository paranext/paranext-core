import { LanguageStrings } from 'platform-bible-utils';
import { KeyboardEvent } from 'react';

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
