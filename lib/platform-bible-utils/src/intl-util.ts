import DateTimeFormat from './intl-date-time-format';

/**
 * Retrieves the current locale of the user's environment.
 *
 * @returns A string representing the current locale. If the locale cannot be determined, the
 *   function returns an empty string.
 */
export default function getCurrentLocale(): string {
  // Use navigator when available
  if (typeof navigator !== 'undefined' && navigator.languages) {
    return navigator.languages[0];
  }
  // For Node.js
  return new DateTimeFormat().resolvedOptions().locale;
}
