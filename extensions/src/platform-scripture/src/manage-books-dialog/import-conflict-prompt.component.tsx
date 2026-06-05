import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'platform-bible-react';
import type {
  ManageBooksDialogLocalizedStrings,
  ManageBooksImportStrategy,
} from './manage-books-dialog.types';
import { fmtTemplate } from './manage-books-dialog.utils';

/**
 * Existing import-conflict prompt — surfaced when one or more picked books already exist in the
 * destination project. The user picks `replaceEntireBooks` (overwrite) or `nonExistingChapters`
 * (merge non-existing chapters only). Closing the dialog cancels the import entirely.
 */
export type ImportConflictPromptProps = {
  /** Pending conflict (the books being imported and which already exist). */
  conflict: { books: string[]; existing: string[] } | undefined;
  /** Destination project's display name. */
  projectName: string;
  /** Localized-strings lookup helper from the parent. */
  t: (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) => string;
  /** Called when the user dismisses the dialog (cancels the import). */
  onCancel: () => void;
  /** Called with the chosen strategy when the user picks one. */
  onChoose: (strategy: ManageBooksImportStrategy, books: string[]) => void;
};

export function ImportConflictPrompt({
  conflict,
  projectName,
  t,
  onCancel,
  onChoose,
}: ImportConflictPromptProps) {
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
            <DialogTitle>
              {t('%manageBooks_import_conflictTitle%', 'Books already exist')}
            </DialogTitle>
            <DialogDescription>
              {conflict
                ? fmtTemplate(
                    t('%manageBooks_import_conflictBody%', '{0} book(s) already exist in {1}: {2}'),
                    conflict.existing.length,
                    projectName,
                    conflict.existing.join(', '),
                  )
                : ''}
            </DialogDescription>
          </DialogHeader>
          <p className="tw:text-sm tw:text-muted-foreground">
            {t('%manageBooks_import_conflictBody2%', 'Choose how to proceed with the import.')}
          </p>
          <div className="tw:flex tw:flex-col tw:gap-2 tw:sm:flex-row tw:sm:flex-wrap tw:sm:justify-end">
            <Button variant="ghost" onClick={onCancel}>
              {t('%manageBooks_import_conflictCancel%', 'Cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!conflict) return;
                onChoose('replaceEntireBooks', conflict.books);
              }}
            >
              {t('%manageBooks_import_replaceEntireBooks%', 'Replace entire books')}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (!conflict) return;
                onChoose('nonExistingChapters', conflict.books);
              }}
            >
              {/* Label honestly describes PT9's WriteChaptersToBook semantic:
                  source chapters overwrite their dest counterparts; dest
                  chapters not in source survive. "Merge from files" parallels
                  the Copy prompt's "Merge from source" and names what is
                  being merged. The localize key is
                  %manageBooks_import_mergeFromFiles% — the prior
                  "nonExistingChapters" key promised a behavior the wire never
                  implemented, so the key was renamed along with the English
                  copy so existing translations don't silently mis-apply to
                  the changed semantic. */}
              {t('%manageBooks_import_mergeFromFiles%', 'Merge from files')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
