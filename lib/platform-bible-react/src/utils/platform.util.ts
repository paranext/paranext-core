/**
 * Whether the app is running on macOS, based on the user agent. Used to pick platform-appropriate
 * keyboard shortcut behavior and display hints (e.g. `⌘` vs `Ctrl`)
 */
export function isMacOs(): boolean {
  // Electron/Chromium reports macOS with "Macintosh" in its user agent (e.g.
  // "... (Macintosh; Intel Mac OS X 10_15_7) ..."). Case-insensitive substring match; it only ever
  // appears in the OS segment, so no anchoring is needed. See platform.util.test.ts for
  // match/non-match examples across macOS, Windows, Linux, and Android user agents.
  return /Macintosh/i.test(navigator.userAgent);
}
