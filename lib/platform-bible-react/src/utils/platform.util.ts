/**
 * Whether the app is running on macOS, based on the user agent. Used to pick platform-appropriate
 * keyboard shortcut behavior and display hints (e.g. `⌘` vs `Ctrl`)
 */
export function isMacOs(): boolean {
  return /Macintosh/i.test(navigator.userAgent);
}
