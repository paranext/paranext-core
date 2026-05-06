import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'platform-bible-react';
import type { ManageBooksDialogLocalizedStrings } from './manage-books-dialog.types';
import { fmtTemplate } from './manage-books-dialog.utils';

/**
 * Copy overwrite-confirm prompt — surfaced when one or more picked books already exist in the
 * destination project on a Copy. Mirrors the import-conflict prompt structure but only offers two
 * choices: Cancel (ghost) or Replace entire books (destructive). Closing the dialog cancels the
 * copy entirely. Sebastian #16 — without this prompt, Copy silently overwrites existing books.
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
  /** Called with the books to copy when the user confirms the overwrite. */
  onConfirm: (books: string[]) => void;
};

export function CopyConflictPrompt({
  conflict,
  projectName,
  t,
  onCancel,
  onConfirm,
}: CopyConflictPromptProps) {
  return (
    <Dialog
      open={!!conflict}
      onOpenChange={(v) => {
        if (!v) onCancel();
      }}
    >
      <DialogContent className="tw-max-w-md">
        <div className="tw-flex tw-flex-col tw-gap-4">
          <DialogHeader>
            <DialogTitle>{t('%manageBooks_copy_confirmTitle%', 'Books already exist')}</DialogTitle>
            <DialogDescription>
              {conflict
                ? fmtTemplate(
                    t(
                      '%manageBooks_copy_confirmBody%',
                      '{0} of the books you are copying already exist in {1}.',
                    ),
                    conflict.existing.length,
                    projectName,
                  )
                : ''}
            </DialogDescription>
          </DialogHeader>
          {/* Bug 2 mirror — wrap on narrow widths so multiple long-label buttons fit the dialog. */}
          <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-flex-wrap sm:tw-justify-end">
            <Button variant="ghost" onClick={onCancel}>
              {t('%manageBooks_copy_confirmCancel%', 'Cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!conflict) return;
                onConfirm(conflict.books);
              }}
            >
              {t('%manageBooks_copy_confirmReplace%', 'Replace entire books')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
