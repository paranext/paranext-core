/**
 * Shared utility helpers used by `manage-books-dialog.component.tsx` and its sub-modals (the
 * extracted prompt / confirmation components). Keep this file dependency-free so any sub-component
 * can import without dragging in React or PAPI.
 */

import type { ManageBooksComparisonState } from './manage-books-dialog.types';

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

/**
 * Parse a date string into a numeric timestamp for ordering. Accepts ISO-8601 (the documented
 * `ManageBooksDialogBookInfo.lastModified` contract) and falls back to anything else `Date.parse`
 * can read; returns `NaN` when both fail. Callers must check for `NaN` before comparing.
 */
const parseDateForCompare = (value: string): number => Date.parse(value);

/**
 * Compute a `ManageBooksComparisonState` for a (source, destination) pair of `lastModified` dates.
 *
 * Returns `'undetermined'` when either date is missing AND we can't otherwise infer a state, or
 * when the dates can't be parsed. The previous string-compare implementation worked only when both
 * dates were strict ISO-8601 (lexically sortable); a non-ISO format leaked in via a custom loader
 * would silently misorder. Parsing to numeric timestamps avoids that pitfall.
 */
export const computeCompareState = (
  sourceDate: string | undefined,
  destDate: string | undefined,
): ManageBooksComparisonState => {
  if (!sourceDate && !destDate) return 'undetermined';
  if (!sourceDate) return 'sourceDoesNotExist';
  if (!destDate) return 'destDoesNotExist';
  if (sourceDate === destDate) return 'filesAreSame';
  const sourceMs = parseDateForCompare(sourceDate);
  const destMs = parseDateForCompare(destDate);
  if (Number.isNaN(sourceMs) || Number.isNaN(destMs)) return 'undetermined';
  if (sourceMs === destMs) return 'filesAreSame';
  return sourceMs > destMs ? 'sourceIsNewer' : 'sourceIsOlder';
};
