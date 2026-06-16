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
 * A2 — Delete confirmation prompt. Shown after the user clicks "Delete" in the dialog footer when
 * the action mode is "delete" and one or more books are selected. The body text is computed by the
 * caller because it varies by selection size and shared-project state.
 */
export type DeleteConfirmPromptProps = {
  /** The pending delete request (books to delete). When `undefined`, the prompt is closed. */
  confirm: { books: string[] } | undefined;
  /**
   * Pre-formatted body text describing what will be deleted (e.g. "5 book(s) will be deleted from
   * PRJ").
   */
  body: string;
  /** Localized destination project shortName (used in the title). */
  projectShortName: string;
  /** Localized-strings lookup helper from the parent. */
  t: (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) => string;
  /** Called when the user dismisses the prompt without deleting. */
  onCancel: () => void;
  /** Called when the user confirms the delete; the parent re-runs `runDelete(books)`. */
  onConfirm: (books: string[]) => void;
};

export function DeleteConfirmPrompt({
  confirm,
  body,
  projectShortName,
  t,
  onCancel,
  onConfirm,
}: DeleteConfirmPromptProps) {
  return (
    <Dialog
      open={!!confirm}
      onOpenChange={(v) => {
        if (!v) onCancel();
      }}
    >
      <DialogContent className="tw:max-w-md" role="alertdialog">
        <div className="tw:flex tw:flex-col tw:gap-4">
          <DialogHeader>
            <DialogTitle>
              {fmtTemplate(
                t('%manageBooks_delete_confirmTitle%', 'Delete books from {0}?'),
                projectShortName,
              )}
            </DialogTitle>
            <DialogDescription>{body}</DialogDescription>
          </DialogHeader>
          <div className="tw:flex tw:flex-col tw:gap-2 tw:sm:flex-row tw:sm:justify-end">
            <Button variant="outline" autoFocus onClick={onCancel}>
              {t('%manageBooks_delete_confirmCancel%', 'Cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!confirm) return;
                onConfirm(confirm.books);
              }}
            >
              {t('%manageBooks_delete_confirmAccept%', 'Delete')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
