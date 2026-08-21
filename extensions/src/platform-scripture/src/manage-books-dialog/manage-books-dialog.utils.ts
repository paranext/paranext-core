/**
 * Shared utility helpers used by `manage-books-dialog.component.tsx` and its sub-modals (the
 * extracted prompt / confirmation components). Keep this file dependency-free so any sub-component
 * can import without dragging in React or PAPI.
 */

import { ScrVersType } from '@sillsdev/scripture';
import type {
  ManageBooksAction,
  ManageBooksComparisonState,
  ManageBooksCreateMethod,
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
 * Precedence rule: the shared-project warning must survive in EVERY shared case — the original
 * branch order dropped it exactly in the highest-impact case (deleting ALL books of a shared
 * project). Pure function so the 2x2 precedence is unit-testable.
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
 * Compare state for the Import grid. The picked file's date is day-granular (`YYYY-MM-DD`, derived
 * from `File.lastModified`), whereas the destination's date is a full ISO timestamp (the project
 * book's `GetLastWriteTime`). Comparing those directly biases a same-day import toward
 * `sourceIsOlder` — the day-only pick parses as midnight and loses to the dest's intra-day time. We
 * normalize the destination to the same day granularity so a file imported the same day a book was
 * last written reads as `filesAreSame`, not `sourceIsOlder`. See I9.
 */
export const computeImportCompareState = (
  pickDate: string | undefined,
  destDate: string | undefined,
): ManageBooksComparisonState =>
  computeCompareState(pickDate, destDate ? destDate.slice(0, 10) : undefined);

/**
 * Map a versification value (numeric `ScrVersType` enum or its stringified form, as returned by
 * `pdp.getSetting('platformScripture.versification')`) to the localization key for its display
 * name. The raw numeric enum (e.g. "4") is meaningless to users, so the dialog's header subtitle
 * resolves the value through this helper and the surrounding template appends "Versification" so
 * e.g. `ScrVersType.English` reads as "English Versification".
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

/**
 * Whether a visible book is _not creatable_ from the current Create-from-template reference
 * project, and so must be treated as non-selectable. In Create > Based on template a book that is
 * not present in the reference project has no template content to base a new book on; the grid
 * disables its pill (see `gridItems` in the component) and the selection logic must exclude it
 * too.
 *
 * This is the single source of truth for that determination, shared by the grid (pill disabling)
 * and `computeSelectableVisibleBooks` (Select-All / counts). Keeping both on one predicate is what
 * prevents the two notions of "selectable" from drifting — the drift that let Select-All re-add
 * not-in-reference books, inflating the selection count and tripping the missing-model preflight.
 *
 * Returns `false` for any action/method other than Create-from-template, or while no reference
 * project / book set is available yet (nothing is disabled until we know the reference's book
 * set).
 *
 * @param book 3-letter USFM book id to test.
 * @param params.action Current dialog action.
 * @param params.createMethod Current create method.
 * @param params.hasReferenceProject Whether a reference project is currently selected.
 * @param params.referencePresentBooks The reference project's present-book set, once loaded
 *   (`undefined` while it is still loading).
 * @returns `true` when the book is not in the reference project and so is not selectable.
 */
export const isBookNotInCreateReference = (
  book: string,
  params: {
    action: ManageBooksAction;
    createMethod: ManageBooksCreateMethod;
    hasReferenceProject: boolean;
    referencePresentBooks: ReadonlySet<string> | undefined;
  },
): boolean =>
  params.action === 'create' &&
  params.createMethod === 'fromTemplate' &&
  params.hasReferenceProject &&
  params.referencePresentBooks !== undefined &&
  !params.referencePresentBooks.has(book);

/**
 * Compute the genuinely _selectable_ visible books for the dialog's current action — the set that
 * Select-All, the header tri-state checkbox, the selection count, and the "{n} of {m} selected"
 * announcement all derive from.
 *
 * "Selectable" excludes books the grid renders as disabled: in Create > Based on template, books
 * not present in the reference project (`isBookNotInCreateReference`). Excluding them here is what
 * keeps Select-All from selecting non-creatable books — the bug where Select-All inflated the count
 * and tripped the missing-model preflight with books that the orchestrator would only filter out at
 * submit time anyway.
 *
 * Mirrors the dialog's per-action rules: `view` selects nothing; `import` is limited to books with
 * an attached file; every other action starts from all visible books — then the not-in-reference
 * books are removed.
 *
 * @param params.action Current dialog action.
 * @param params.visibleBooks Books currently visible (already text/status filtered).
 * @param params.hasImportFile Predicate: does this book have an attached import file? Only
 *   consulted for the `import` action (kept as a callback so this helper stays free of the
 *   importFiles shape).
 * @param params.createMethod Current create method.
 * @param params.hasReferenceProject Whether a reference project is currently selected.
 * @param params.referencePresentBooks The reference project's present-book set, once loaded.
 * @returns The visible books the user can actually select, in `visibleBooks` order.
 */
export const computeSelectableVisibleBooks = (params: {
  action: ManageBooksAction;
  visibleBooks: readonly string[];
  hasImportFile: (book: string) => boolean;
  createMethod: ManageBooksCreateMethod;
  hasReferenceProject: boolean;
  referencePresentBooks: ReadonlySet<string> | undefined;
}): string[] => {
  const { action, visibleBooks, hasImportFile } = params;
  if (action === 'view') return [];
  const base = action === 'import' ? visibleBooks.filter((b) => hasImportFile(b)) : visibleBooks;
  return base.filter(
    (b) =>
      !isBookNotInCreateReference(b, {
        action,
        createMethod: params.createMethod,
        hasReferenceProject: params.hasReferenceProject,
        referencePresentBooks: params.referencePresentBooks,
      }),
  );
};
