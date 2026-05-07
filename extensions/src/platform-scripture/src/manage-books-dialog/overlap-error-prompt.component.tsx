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
 * A10 — Overlap validation error. Surfaced when two distinct picked files would import into the
 * same book. The user can only dismiss; the orchestrator removes one of the files itself.
 */
export type OverlapErrorPromptProps = {
  /** Details of the conflicting files. When `undefined`, the dialog is closed. */
  error: { book: string; existingFile: string; newFile: string } | undefined;
  /** Localized-strings lookup helper from the parent. */
  t: (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) => string;
  /** Called when the user dismisses the dialog. */
  onDismiss: () => void;
};

export function OverlapErrorPrompt({ error, t, onDismiss }: OverlapErrorPromptProps) {
  return (
    <Dialog
      open={!!error}
      onOpenChange={(v) => {
        if (!v) onDismiss();
      }}
    >
      <DialogContent className="tw-max-w-md" role="alertdialog">
        <div className="tw-flex tw-flex-col tw-gap-4">
          <DialogHeader>
            <DialogTitle>
              {t('%manageBooks_import_overlapTitle%', 'Two files map to the same book')}
            </DialogTitle>
            <DialogDescription>
              {/* B2 — reuse existing backend key for the canonical message, augmented with file names */}
              {t(
                '%manageBooks_import_errorOverlappingFiles%',
                'Two files contain information for the same book. They can not both be selected.',
              )}
            </DialogDescription>
          </DialogHeader>
          {error && (
            <p className="tw-text-sm tw-text-muted-foreground">
              {fmtTemplate(
                t(
                  '%manageBooks_import_overlapBody%',
                  'Cannot import: {0} would be supplied by both "{1}" and "{2}".',
                ),
                error.book,
                error.existingFile,
                error.newFile,
              )}
            </p>
          )}
          <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
            <Button autoFocus onClick={onDismiss}>
              {t('%manageBooks_import_overlapDismiss%', 'Got it')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
