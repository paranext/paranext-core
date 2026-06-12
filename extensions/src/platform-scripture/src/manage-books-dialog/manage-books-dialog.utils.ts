/**
 * Shared utility helpers used by `manage-books-dialog.component.tsx` and its sub-modals (the
 * extracted prompt / confirmation components). Keep this file dependency-free so any sub-component
 * can import without dragging in React or PAPI.
 */

import { ScrVersType } from '@sillsdev/scripture';
import type {
  ManageBooksComparisonState,
  ManageBooksDialogLocalizedStrings,
} from './manage-books-dialog.types';

/** All localized string keys consumed by the dialog. */
type DialogLocalizationKey = keyof ManageBooksDialogLocalizedStrings;

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
/**
 * Which of the four delete-confirmation bodies applies, given whether the user selected every
 * present book and whether the project is shared (Send/Receive).
 *
 * Precedence rule (UX Manila follow-up): the shared-project warning must survive in EVERY shared
 * case — the original branch order dropped it exactly in the highest-impact case (deleting ALL
 * books of a shared project). Pure function so the 2x2 precedence is unit-testable.
 */
export type DeleteConfirmVariant = 'allShared' | 'all' | 'partialShared' | 'partial';

export const deleteConfirmVariant = (
  allSelected: boolean,
  isShared: boolean,
): DeleteConfirmVariant => {
  if (allSelected) return isShared ? 'allShared' : 'all';
  return isShared ? 'partialShared' : 'partial';
};

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

/**
 * Map a versification value (numeric `ScrVersType` enum or its stringified form, as returned by
 * `pdp.getSetting('platformScripture.versification')`) to the localization key for its display
 * name. Per Vladimir review item 21 (2026-05-06), the dialog's header subtitle previously rendered
 * the raw numeric enum (e.g. "4"), which is meaningless to users. The header now resolves the value
 * through this helper and the surrounding template appends "Versification" so e.g.
 * `ScrVersType.English` reads as "English Versification".
 *
 * Keep the switch arms aligned with `@sillsdev/scripture`'s `ScrVersType` enum order (Unknown=0,
 * Original=1, Septuagint=2, Vulgate=3, English=4, RussianProtestant=5, RussianOrthodox=6).
 */
export const versificationLabelKey = (value: number | string): DialogLocalizationKey => {
  const num = typeof value === 'string' ? Number(value) : value;
  switch (num) {
    case ScrVersType.Original:
      return '%manageBooks_versification_original%';
    case ScrVersType.Septuagint:
      return '%manageBooks_versification_septuagint%';
    case ScrVersType.Vulgate:
      return '%manageBooks_versification_vulgate%';
    case ScrVersType.English:
      return '%manageBooks_versification_english%';
    case ScrVersType.RussianProtestant:
      return '%manageBooks_versification_russianProtestant%';
    case ScrVersType.RussianOrthodox:
      return '%manageBooks_versification_russianOrthodox%';
    case ScrVersType.Unknown:
    default:
      return '%manageBooks_versification_unknown%';
  }
};

/**
 * English-fallback display name for a versification value. Mirrors `versificationLabelKey` and is
 * supplied as the second argument to `t()` so the subtitle still reads sensibly when the matching
 * localized string is absent (for unrecognised numeric inputs the dialog falls back to "Unknown",
 * matching the `%manageBooks_versification_unknown%` localized copy).
 */
export const versificationFallbackName = (value: number | string): string => {
  const num = typeof value === 'string' ? Number(value) : value;
  switch (num) {
    case ScrVersType.Original:
      return 'Original';
    case ScrVersType.Septuagint:
      return 'Septuagint';
    case ScrVersType.Vulgate:
      return 'Vulgate';
    case ScrVersType.English:
      return 'English';
    case ScrVersType.RussianProtestant:
      return 'Russian Protestant';
    case ScrVersType.RussianOrthodox:
      return 'Russian Orthodox';
    case ScrVersType.Unknown:
    default:
      return 'Unknown';
  }
};
