import { LanguageStrings } from 'platform-bible-utils';

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
