/**
 * Web view state key under which a web view declares the project ids whose scripture it displays
 * beyond its own `projectId`.
 *
 * A web view that shows text from several projects at once — the Scripture Text Grid is the
 * motivating case — is a single web view in the dock layout, so its members are invisible to
 * anything reading open web view definitions. Declaring them here lets global navigation UI (the
 * toolbar's book/chapter/verse control) offer those projects' books without knowing what the view
 * is or how it chose them. The declaring view owns the resolution; readers just union the lists.
 *
 * Values written here MUST pass {@link isNavigableProjectIds}: installed project ids, not resource
 * reference ids or DBL entry UIDs, since readers use them to open project data providers.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY = 'navigableProjectIds';

/**
 * Narrows a value read from web view state to the shape
 * {@link NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY} promises.
 *
 * Web view state is `Record<string, unknown>` written by whichever view owns it and persisted into
 * saved layouts, so a reader can encounter a value from an older build or a buggy writer. Guard, do
 * not assume.
 *
 * Checks SHAPE ONLY. A string that passes is not thereby a usable project id — an empty string, or
 * an id whose project has since been removed, both pass. Readers open project data providers from
 * these values, so validating individual ids stays the reader's job.
 *
 * @param value The raw value read from a web view's state
 * @returns Whether `value` is an array of strings
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function isNavigableProjectIds(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}
