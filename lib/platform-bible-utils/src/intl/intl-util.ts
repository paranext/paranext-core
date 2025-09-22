import { DateTimeFormat } from './intl-date-time-format';

/**
 * Retrieves the current locale of the user's environment.
 *
 * @returns A string representing the current locale. If the locale cannot be determined, the
 *   function returns an empty string.
 */
export function getCurrentLocale(): string {
  // Use navigator when available
  if (typeof navigator !== 'undefined' && navigator.languages) {
    const rawLocale = navigator.languages[0];
    // According to the MDN page for navigator.languages it should always return a valid BCP 47 tag.
    // However, some environments (e.g., certain Linux distros) may use the 'POSIX locale format'.
    // This code removes a (potential) trailing "@posix" so we will always return a valid BCP 47 tag
    // You can find the MDN page for navigator.languages here:
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    // You can learn more about the 'POSIX locale format' here:
    // https://learn.microsoft.com/en-us/globalization/locale/other-locale-names
    return rawLocale.replace(/@posix$/i, '');
  }
  // For Node.js
  return new DateTimeFormat().resolvedOptions().locale;
}

export default getCurrentLocale;
