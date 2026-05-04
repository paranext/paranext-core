/**
 * Shared utility helpers used by `manage-books-dialog.component.tsx` and its sub-modals (the
 * extracted prompt / confirmation components). Keep this file dependency-free so any sub-component
 * can import without dragging in React or PAPI.
 */

/**
 * Format a localized template string by substituting positional `{0}`, `{1}`, … placeholders with
 * the provided values. Missing positions render as empty strings.
 *
 * Examples:
 *
 * - `fmtTemplate('Delete books from {0}?', 'PRJ')` → `'Delete books from PRJ?'`
 * - `fmtTemplate('{0} of {1}', 5, 10)` → `'5 of 10'`
 */
export const fmtTemplate = (template: string, ...values: ReadonlyArray<string | number>): string =>
  template.replace(/\{(\d+)\}/g, (_, idx) => {
    const v = values[Number(idx)];
    return v === undefined ? '' : String(v);
  });
