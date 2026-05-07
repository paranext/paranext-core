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
 * A9 — USX confirmation prompt. Shown when the user picks one or more `.usx` / `.xml` files in
 * Import mode; USX import is a separate code path (replace-entire-book). Cancel removes the USX
 * files from the import grid entirely; Confirm imports them immediately.
 */
export type UsxConfirmPromptProps = {
  /** Pending USX confirmation (the full list of `.usx`/`.xml` filenames to confirm). */
  confirm: { files: string[] } | undefined;
  /** Destination project's display name (rendered in the body). */
  projectName: string;
  /** Localized-strings lookup helper from the parent. */
  t: (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) => string;
  /** Called when the user dismisses (the parent removes the USX files from the grid). */
  onCancel: () => void;
  /** Called when the user confirms (the parent runs the USX import). */
  onConfirm: () => void;
};

export function UsxConfirmPrompt({
  confirm,
  projectName,
  t,
  onCancel,
  onConfirm,
}: UsxConfirmPromptProps) {
  return (
    <Dialog
      open={!!confirm}
      onOpenChange={(v) => {
        if (!v) onCancel();
      }}
    >
      <DialogContent className="tw-max-w-md" role="alertdialog">
        <div className="tw-flex tw-flex-col tw-gap-4">
          <DialogHeader>
            <DialogTitle>
              {t('%manageBooks_import_usxConfirmTitle%', 'Import USX files?')}
            </DialogTitle>
            <DialogDescription>
              {fmtTemplate(
                t(
                  '%manageBooks_import_usxConfirmBody%',
                  'Import the following USX files into project {0}?',
                ),
                projectName,
              )}
            </DialogDescription>
          </DialogHeader>
          <ul className="tw-flex tw-flex-col tw-gap-0.5 tw-pl-5 tw-text-xs tw-text-muted-foreground">
            {confirm?.files.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
            <Button variant="outline" autoFocus onClick={onCancel}>
              {t('%manageBooks_import_usxConfirmCancel%', 'Cancel')}
            </Button>
            <Button onClick={onConfirm}>
              {t('%manageBooks_import_usxConfirmAccept%', 'Import')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
