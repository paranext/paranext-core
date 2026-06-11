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
                ? fmtTemplate(
                    // Lists the conflicting book names like the import-conflict
                    // prompt does (Manila UX follow-up: "the message should
                    // also list the book name(s)"). New key — the old
                    // %manageBooks_copy_confirmBody% (count-only, 2 args) is
                    // redirected via metadata fallbackKey since its
                    // placeholder arity changed.
                    t(
                      '%manageBooks_copy_confirmBodyWithBooks%',
                      '{0} book(s) already exist in {1}: {2}',
                    ),
                    conflict.existing.length,
                    projectName,
                    conflict.existing.join(', '),
                  )
                : ''}
            </DialogDescription>
          </DialogHeader>
          {/* Bug 2 mirror — wrap on narrow widths so multiple long-label buttons fit the dialog.
              Per-button tw:h-auto + tw:whitespace-normal overrides the shadcn
              Button base's whitespace-nowrap/fixed height so a long label wraps
              INSIDE its button instead of growing past the dialog bounds
              (Manila UX follow-up). */}
          <div className="tw:flex tw:flex-col tw:gap-2 tw:sm:flex-row tw:sm:flex-wrap tw:sm:justify-end">
            <Button variant="ghost" className="tw:h-auto tw:whitespace-normal" onClick={onCancel}>
              {t('%manageBooks_copy_confirmCancel%', 'Cancel')}
            </Button>
            <Button
              variant="destructive"
              className="tw:h-auto tw:whitespace-normal"
              onClick={() => {
                if (!conflict) return;
                onChoose('replaceEntireBooks', conflict.books);
              }}
            >
              {t('%manageBooks_copy_confirmReplace%', 'Replace entire books')}
            </Button>
            <Button
              variant="outline"
              className="tw:h-auto tw:whitespace-normal"
              onClick={() => {
                if (!conflict) return;
                onChoose('nonExistingChapters', conflict.books);
              }}
            >
              {/* Label honestly describes the PT9 WriteChaptersToBook semantic;
                  see import-conflict-prompt for the rationale. The localize key
                  is %manageBooks_copy_confirmMergeFromSource% — the prior
                  "confirmNonExistingChapters" key promised a behavior the wire
                  never implemented, so the key was renamed along with the
                  English copy so existing translations don't silently
                  mis-apply to the new semantic. */}
              {t('%manageBooks_copy_confirmMergeFromSource%', 'Merge from source')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
