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
              {t('%manageBooks_import_conflictCancel%', 'Cancel')}
            </Button>
            <Button
              variant="destructive"
              className="tw:h-auto tw:min-w-0 tw:flex-1 tw:whitespace-normal tw:text-center"
              onClick={() => {
                if (!conflict) return;
                onChoose('replaceEntireBooks', conflict.books);
              }}
            >
              {t('%manageBooks_import_replaceEntireBooks%', 'Replace entire books')}
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
                  destination are written (ImportBooksOrchestrator
                  TryMergeChaptersFromSource + UsfmChapterScaffolding). The key
                  was renamed from %manageBooks_import_mergeFromFiles% (per the
                  semantic-change-renames-the-key convention) when the Manila
                  UX follow-up changed the wire behavior from PT9's
                  chapter-overwrite merge to skip-existing-chapters. */}
              {t(
                '%manageBooks_import_onlyNonExistingChapters%',
                'Only import non-existing chapters',
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
