/**
 * Shared utility helpers used by `manage-books-dialog.component.tsx` and its sub-modals (the
 * extracted prompt / confirmation components). Keep this file dependency-free so any sub-component
 * can import without dragging in React or PAPI.
 */

import { Canon, ScrVersType } from '@sillsdev/scripture';
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
 * Paratext's book-number filename prefix, mirroring ParatextData
 * `ProjectSettings.BookFileNameDigits` (`bookNum` is the 1-based canonical number, GEN=1):
 * `01`-`09`, `10`-`39`, then a `+1` gap for 40-99 (so Matthew=40 is `41`), and `A0`/`B0`/`C0`
 * letter codes for 100+.
 */
function bookFileNamePrefix(bookNum: number): string {
  if (bookNum < 10) return `0${bookNum}`;
  if (bookNum < 40) return `${bookNum}`;
  if (bookNum < 100) return `${bookNum + 1}`;
  if (bookNum < 110) return `A${bookNum - 100}`;
  if (bookNum < 120) return `B${bookNum - 110}`;
  return `C${bookNum - 120}`;
}

/**
 * Detect the book id for an import file from its `\id` marker (preferred) or its filename.
 *
 * The book id is taken from the first `\id` marker in the SFM `content` when present and valid.
 * Otherwise it falls back to the filename, which covers USX/XML imports (whose content never
 * carries a `\id` marker), story decorators, and files whose text could not be read.
 *
 * Paratext names book files `<bookNumberDigits><bookId><projectShortName>` — or, in the `MAT`
 * filename form, just `<bookId><projectShortName>` (see ParatextData
 * `ProjectSettings.GetFileNameBookPart`). The fallback reconstructs each book's expected stem and
 * returns the one the filename actually starts with. This replaces the old canonical-order
 * substring scan, which returned the first book id appearing _anywhere_ in the name and so
 * mis-detected:
 *
 * - Ids that appear earlier as a substring — `38ZECCUNP89T` contains `ECC` (Ecclesiastes) inside
 *   `ZEC...`, so Zechariah was read as Ecclesiastes; and
 * - Project short names that contain a book code.
 *
 * Anchoring to the reconstructed `<prefix><id>` keeps digit-leading ids correct too: `471COLXX` (1
 * Corinthians from a project named `LXX...`) resolves to `1CO`, not `COL`, and `41MAT` resolves to
 * `MAT`, not `1MA`. A leftmost-occurrence scan remains only as a last resort for names that match
 * neither expected form.
 *
 * @param filename Import file name (e.g. `38ZECCUNP89T.SFM`).
 * @param content Optional file text; the `\id` marker is used when present and recognized.
 * @param allBooks Recognized book ids to match against, in canonical order.
 * @returns The detected book id, or `undefined` when nothing matches.
 */
export function resolveImportBookId(
  filename: string,
  content: string | undefined,
  allBooks: readonly string[],
): string | undefined {
  if (content) {
    const idMatch = content.match(/^\s*\\id\s+([A-Za-z0-9]{2,4})/m);
    if (idMatch) {
      const candidate = idMatch[1].toUpperCase();
      if (allBooks.includes(candidate)) return candidate;
    }
  }
  const upper = filename.toUpperCase();
  // Standard form: the name starts with the book's number prefix followed by its id.
  const standard = allBooks.find((book) => {
    const bookNum = Canon.bookIdToNumber(book);
    return bookNum > 0 && upper.startsWith(`${bookFileNamePrefix(bookNum)}${book}`);
  });
  if (standard) return standard;
  // `MAT` filename form: the name starts with the bare id (no number prefix).
  const bareId = allBooks.find((book) => upper.startsWith(book));
  if (bareId) return bareId;
  // Last resort for names that follow neither form: the book id that occurs earliest in the name
  // (position-based, so an earlier-canon substring no longer wins over the real book).
  let detected: string | undefined;
  let detectedIndex = Number.POSITIVE_INFINITY;
  allBooks.forEach((book) => {
    const index = upper.indexOf(book);
    if (index !== -1 && index < detectedIndex) {
      detectedIndex = index;
      detected = book;
    }
  });
  return detected;
}
