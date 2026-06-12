import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'platform-bible-react';
import type {
  ManageBooksCopyStrategy,
  ManageBooksDialogLocalizedStrings,
} from './manage-books-dialog.types';
import { fmtTemplate } from './manage-books-dialog.utils';

/**
 * Copy overwrite-confirm prompt — surfaced when one or more picked books already exist in the
 * destination project on a Copy. Mirrors the import-conflict prompt structure: Cancel (ghost),
 * Replace entire books (destructive), Copy non-existing chapters (outline). Closing the dialog
 * cancels the copy entirely.
 *
 * History: Sebastian #16 introduced this prompt with a two-button shape (Cancel / Replace).
 * Vladimir #16 (follow-up) asked for the same three-way prompt that Import shows so the user can
 * also pick the "merge non-existing chapters" path. The third button is wired through the new
 * `ManageBooksCopyStrategy` union; see `manage-books-dialog.types.ts` for the wire note about the
 * backend currently honoring only the full-book replace path.
 */
export type CopyConflictPromptProps = {
  /** Pending conflict (the books being copied and which already exist in the destination). */
  conflict: { books: string[]; existing: string[] } | undefined;
  /** Destination project's display name (the project being copied INTO). */
  projectName: string;
  /** Localized-strings lookup helper from the parent. */
  t: (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) => string;
  /** Called when the user dismisses the dialog (cancels the copy). */
  onCancel: () => void;
  /** Called with the chosen strategy and the books to copy when the user picks an option. */
  onChoose: (strategy: ManageBooksCopyStrategy, books: string[]) => void;
};

export function CopyConflictPrompt({
  conflict,
  projectName,
  t,
  onCancel,
  onChoose,
}: CopyConflictPromptProps) {
  return (
    <Dialog
      open={!!conflict}
      onOpenChange={(v) => {
        if (!v) onCancel();
      }}
    >
      <DialogContent className="tw:max-w-md">
        <div className="tw:flex tw:flex-col tw:gap-4">
          <DialogHeader>
            <DialogTitle>{t('%manageBooks_copy_confirmTitle%', 'Books already exist')}</DialogTitle>
            <DialogDescription>
              {conflict
                ? // Lists the conflicting book names like the import-conflict prompt
                  // does (Manila UX follow-up: "the message should also list the book
                  // name(s)"). Proper _one/_other pluralization (matching the import
                  // filesMatched pair) instead of "book(s)"; the old count-only
                  // %manageBooks_copy_confirmBody% is redirected via metadata
                  // fallbackKey since its placeholder arity changed. The list join is
                  // locale-aware via Intl.ListFormat.
                  (() => {
                    const bookList = new Intl.ListFormat(undefined, {
                      style: 'narrow',
                      type: 'unit',
                    }).format(conflict.existing);
                    return conflict.existing.length === 1
                      ? fmtTemplate(
                          t(
                            '%manageBooks_copy_confirmBodyWithBooks_one%',
                            '1 book already exists in {0}: {1}',
                          ),
                          projectName,
                          bookList,
                        )
                      : fmtTemplate(
                          t(
                            '%manageBooks_copy_confirmBodyWithBooks_other%',
                            '{0} books already exist in {1}: {2}',
                          ),
                          conflict.existing.length,
                          projectName,
                          bookList,
                        );
                  })()
                : ''}
            </DialogDescription>
          </DialogHeader>
          {/* Sebastian UX review item 10 (2026-06-12): the prior layout
              stacked the three buttons in a column at narrow widths
              (`flex-col → sm:flex-row`), which pushed them past the dialog's
              bottom edge. Buttons now stay in a single row and individually
              shrink + wrap their text inside the button. `tw:flex-1
              tw:min-w-0` lets them share width fairly; `tw:h-auto
              tw:whitespace-normal tw:text-center` re-enables intra-button
              wrapping (the shadcn Button base hard-codes
              whitespace-nowrap/fixed height). */}
          <div className="tw:flex tw:flex-row tw:gap-2 tw:justify-end">
            <Button
              variant="ghost"
              className="tw:h-auto tw:min-w-0 tw:flex-1 tw:whitespace-normal tw:text-center"
              onClick={onCancel}
            >
              {t('%manageBooks_copy_confirmCancel%', 'Cancel')}
            </Button>
            <Button
              variant="destructive"
              className="tw:h-auto tw:min-w-0 tw:flex-1 tw:whitespace-normal tw:text-center"
              onClick={() => {
                if (!conflict) return;
                onChoose('replaceEntireBooks', conflict.books);
              }}
            >
              {t('%manageBooks_copy_confirmReplace%', 'Replace entire books')}
            </Button>
            <Button
              variant="outline"
              className="tw:h-auto tw:min-w-0 tw:flex-1 tw:whitespace-normal tw:text-center"
              onClick={() => {
                if (!conflict) return;
                onChoose('nonExistingChapters', conflict.books);
              }}
            >
              {/* The backend now implements exactly what this label promises:
                  only chapters missing/empty/scaffolding-only in the
                  destination are written (CopyBooksOrchestrator
                  TryCopyChaptersFromSource + UsfmChapterScaffolding). The key
                  was renamed from %manageBooks_copy_confirmMergeFromSource%
                  when the Manila UX follow-up changed the wire behavior from
                  PT9's chapter-overwrite merge to skip-existing-chapters. */}
              {t('%manageBooks_copy_onlyNonExistingChapters%', 'Only copy non-existing chapters')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
