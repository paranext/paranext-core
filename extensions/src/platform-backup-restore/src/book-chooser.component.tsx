/**
 * BookChooser — sub-modal launched from BackupForm "Choose..." (SUBFLOW-001).
 *
 * Pure presentational component:
 *
 * - Accepts the SUBFLOW-001 input shape via props (availableBooks, selectedBooks, caption, helpText).
 * - Surfaces SUBFLOW-001 output via `onSubmit({ selectedBooks })` and `onCancel()`.
 * - Reuses `BookGridSelector` from platform-scripture directly with `groupBy='canon'` (FN-011 /
 *   ui-alignment.md "Option A — direct reuse, no adapter").
 *
 * Localization:
 *
 * - Caller-owned text (caption, helpText) flows in via props from PT9 keys `BackupForm_1` /
 *   `BackupForm_2`.
 * - Component chrome (Submit / Cancel button labels, aria labels, BookGridSelector canon-group
 *   titles) is exposed as a `localizedStrings` map keyed by stable `%book_chooser_*%` keys, with
 *   sensible English fallbacks so the component renders standalone in Storybook.
 *
 * PAPI / wiring: none. The caller (UI-PKG-004 BackupForm) is responsible for opening the modal,
 * supplying the data, and routing the output back into BackupFormState. There are zero `@papi/*`
 * imports here.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  TooltipProvider,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import {
  BookGridItem,
  BookGridLocalizedStrings,
  BookGridSelector,
} from 'platform-scripture/src/manage-books-dialog/book-grid.component';

/** Bag of book IDs with a human-readable summary string. Mirrors SUBFLOW-001 / `BookSet`. */
export type BookSet = {
  bookIds: string[];
  summary: string;
};

/**
 * Localization keys consumed by `BookChooser` chrome (button labels, aria labels, canon-group
 * titles). Caption and helpText are passed in directly via props (SUBFLOW-001).
 */
export const BOOK_CHOOSER_STRING_KEYS = Object.freeze([
  '%book_chooser_submit%',
  '%book_chooser_cancel%',
  '%book_chooser_grid_aria_label%',
  '%book_chooser_canon_group_ot%',
  '%book_chooser_canon_group_nt%',
  '%book_chooser_canon_group_dc%',
  '%book_chooser_canon_group_extra%',
] as const);

type BookChooserLocalizedStringKey = (typeof BOOK_CHOOSER_STRING_KEYS)[number];
type BookChooserLocalizedStrings = {
  [key in BookChooserLocalizedStringKey]?: LocalizedStringValue;
};

/** English fallbacks used when a localization key is missing from the strings map. */
const FALLBACK_STRINGS: Record<BookChooserLocalizedStringKey, string> = Object.freeze({
  '%book_chooser_submit%': 'OK',
  '%book_chooser_cancel%': 'Cancel',
  '%book_chooser_grid_aria_label%': 'Choose books',
  '%book_chooser_canon_group_ot%': 'Old Testament',
  '%book_chooser_canon_group_nt%': 'New Testament',
  '%book_chooser_canon_group_dc%': 'Deuterocanon',
  '%book_chooser_canon_group_extra%': 'Extra',
});

/** SUBFLOW-001 output payload returned on submit. */
export type BookChooserOutput = {
  selectedBooks: BookSet;
};

/** Props accepted by `BookChooser`. Field names mirror SUBFLOW-001 exactly. */
export type BookChooserProps = {
  /** Whether the modal is open. Controlled by the caller (BackupForm). */
  open: boolean;

  /** Books available for selection. (SUBFLOW-001 input.) */
  availableBooks: BookSet;

  /** Initial selection. The component owns local state from this seed. (SUBFLOW-001 input.) */
  selectedBooks: BookSet;

  /**
   * Modal caption. PT9 `BackupForm_1`: "Books to Backup". The caller passes the already-localized
   * string. (SUBFLOW-001 input.)
   */
  caption: string;

  /**
   * Modal help text shown beneath the caption. PT9 `BackupForm_2`: "Choose the books which will be
   * backed up." (SUBFLOW-001 input.)
   */
  helpText: string;

  /**
   * Called when the user confirms a selection. (SUBFLOW-001 output, action `'submit'`.) Payload
   * carries the user's selection as a `BookSet`; the caller computes the new `summary` field
   * authoritatively.
   */
  onSubmit?: (output: BookChooserOutput) => void;

  /**
   * Called when the user dismisses the modal without confirming. (SUBFLOW-001 output, action
   * `'cancel'`.) Caller keeps its prior selection.
   */
  onCancel?: () => void;

  /** Component-chrome localization map (button labels, aria labels, group titles). */
  localizedStrings?: BookChooserLocalizedStrings;
};

/**
 * Compute the bag of `BookGridItem`s fed into `BookGridSelector`. The grid is purely visual; the
 * "selected" set is tracked separately and threaded through `selected` / `onToggle`.
 */
function buildGridItems(availableBookIds: readonly string[]): BookGridItem[] {
  return availableBookIds.map((book) => ({
    book,
    present: true,
    tone: 'neutral',
    statusLabel: '',
  }));
}

/** Pure presentational BookChooser sub-modal. See file-level TSDoc for SUBFLOW-001 wiring. */
export function BookChooser({
  open,
  availableBooks,
  selectedBooks,
  caption,
  helpText,
  onSubmit = () => undefined,
  onCancel = () => undefined,
  localizedStrings = {},
}: BookChooserProps) {
  const t = useCallback(
    (key: BookChooserLocalizedStringKey): string => {
      const v = localizedStrings[key];
      if (typeof v === 'string') return v;
      return FALLBACK_STRINGS[key];
    },
    [localizedStrings],
  );

  // Local working selection — seeded from the `selectedBooks` prop. Cancel surfaces only
  // `onCancel()`; we never mutate the incoming prop (EDGE-002).
  const [workingSelection, setWorkingSelection] = useState<Set<string>>(
    () => new Set(selectedBooks.bookIds),
  );

  // Re-seed when the caller passes a new selection (e.g., re-open with a different project).
  useEffect(() => {
    setWorkingSelection(new Set(selectedBooks.bookIds));
  }, [selectedBooks]);

  const items = useMemo<BookGridItem[]>(
    () => buildGridItems(availableBooks.bookIds),
    [availableBooks],
  );

  const handleToggle = useCallback((book: string) => {
    setWorkingSelection((prev) => {
      const next = new Set(prev);
      if (next.has(book)) {
        next.delete(book);
      } else {
        next.add(book);
      }
      return next;
    });
  }, []);

  const handleRangeToggle = useCallback((books: string[], select: boolean) => {
    setWorkingSelection((prev) => {
      const next = new Set(prev);
      books.forEach((b) => {
        if (select) {
          next.add(b);
        } else {
          next.delete(b);
        }
      });
      return next;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    // SUBFLOW-001 contract: `selectedBooks.bookIds` is the source of truth. The caller
    // (BackupForm) authoritatively recomputes `summary` against its own localized strings
    // (PT9 `BookSet.Summary()` equivalent), so we deliberately emit an empty placeholder
    // here — keeping the BookChooser free of any locale-aware summary formatting.
    const result: BookSet = {
      bookIds: Array.from(workingSelection),
      summary: '',
    };
    onSubmit({ selectedBooks: result });
  }, [workingSelection, onSubmit]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const bookGridLocalized = useMemo<BookGridLocalizedStrings>(
    () => ({
      canonGroupOT: t('%book_chooser_canon_group_ot%'),
      canonGroupNT: t('%book_chooser_canon_group_nt%'),
      canonGroupDC: t('%book_chooser_canon_group_dc%'),
      canonGroupExtra: t('%book_chooser_canon_group_extra%'),
    }),
    [t],
  );

  return (
    <TooltipProvider delayDuration={200}>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) handleCancel();
        }}
      >
        <DialogContent
          className="tw:flex tw:max-h-[80vh] tw:max-w-2xl tw:flex-col tw:gap-3"
          data-testid="book-chooser-modal"
        >
          <DialogHeader>
            <DialogTitle data-testid="book-chooser-caption">{caption}</DialogTitle>
            <DialogDescription data-testid="book-chooser-help-text">{helpText}</DialogDescription>
          </DialogHeader>

          <div
            className="tw:min-h-0 tw:flex-1 tw:overflow-y-auto tw:py-2"
            data-testid="book-chooser-grid"
          >
            <BookGridSelector
              items={items}
              selected={workingSelection}
              onToggle={handleToggle}
              onRangeToggle={handleRangeToggle}
              groupBy="canon"
              ariaLabel={t('%book_chooser_grid_aria_label%')}
              ariaMultiselectable
              localizedStrings={bookGridLocalized}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              aria-label={t('%book_chooser_cancel%')}
              data-testid="book-chooser-cancel"
            >
              {t('%book_chooser_cancel%')}
            </Button>
            <Button
              onClick={handleSubmit}
              aria-label={t('%book_chooser_submit%')}
              data-testid="book-chooser-submit"
            >
              {t('%book_chooser_submit%')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
