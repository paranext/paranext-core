/**
 * Shared Storybook helpers for the bundled-extension webview component stories.
 *
 * See `.storybook/storybook-interactivity.md` for the full guidelines on writing fully-interactive,
 * real-app-like stories (the split pattern, reproducing the web view's filtering/search derivation,
 * callback conventions, editor styling, and verification).
 *
 * Webview components are split into a presentational component (covered by these stories) and a
 * thin data-loading `*.web-view.tsx` wrapper. In the real app the wrapper implements the `on*`
 * action callbacks with PAPI commands; in Storybook we mock them here so reviewers can exercise the
 * UI in isolation:
 *
 * - `alertCommand` makes a happy-path action visible by announcing the real command name and its
 *   arguments via `alert(...)` (e.g. `platformScriptureEditor.openScriptureEditor(projectId="abc",
 *   isEditable=true)`).
 * - `rejectingMock` simulates a _business_ failure (e.g. "cannot delete item") so error-handling
 *   stories can verify the component surfaces the error. It deliberately does NOT model "backend
 *   unavailable".
 */

/**
 * Format a single argument for display in an alert. Strings are quoted, everything else is rendered
 * as JSON so arrays/objects/booleans/numbers read naturally (e.g. `["p1"]`, `true`, `42`).
 */
function formatArg(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

/**
 * Announce the command (and its arguments) that a webview's data-loader would run when an action
 * callback fires. Use this for the happy-path callbacks in stories so reviewers can see exactly
 * which command/method gets invoked with which arguments.
 *
 * @example
 *
 * ```tsx
 * onOpenProject: (projectId, isEditable) =>
 *   alertCommand('platformScriptureEditor.openScriptureEditor', { projectId, isEditable });
 * // alerts: platformScriptureEditor.openScriptureEditor(projectId="abc", isEditable=true)
 * ```
 *
 * @param command The PAPI command / method name the real webview would invoke.
 * @param args Optional map of argument names to values, rendered as `name=value` pairs.
 */
export function alertCommand(command: string, args?: Record<string, unknown>): void {
  const argList = args
    ? Object.entries(args)
        .map(([name, value]) => `${name}=${formatArg(value)}`)
        .join(', ')
    : '';
  // Stories use alert() purely for demonstration so reviewers can see which command fires. This is
  // the single centralized place the rule is suppressed for that purpose.
  // eslint-disable-next-line no-alert
  alert(`${command}(${argList})`);
}

/**
 * Build a mock action callback that rejects with a _business_ error after a short delay, for
 * error-handling stories. Assign it to any `on*` action callback whose component is expected to
 * surface failures (e.g. "cannot delete item").
 *
 * @example
 *
 * ```tsx
 * onDeleteComment: rejectingMock('Cannot delete comment: it has already been resolved');
 * ```
 *
 * @param businessError The user-facing business reason the operation failed (not "backend
 *   unavailable").
 * @param delayMs How long to wait before rejecting, to mimic a real async round-trip. Defaults to
 *   300ms.
 * @returns An async callback (usable for any action signature) that rejects with `businessError`.
 */
export function rejectingMock(
  businessError: string,
  delayMs = 300,
): (...args: unknown[]) => Promise<never> {
  return () =>
    new Promise<never>((_resolve, reject) => {
      setTimeout(() => reject(new Error(businessError)), delayMs);
    });
}
