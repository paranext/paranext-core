import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  ColumnDef,
  DataTable,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from 'platform-bible-react';
import type { HyphenationEntry } from 'platform-scripture';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useCallback, useId, useMemo, useState } from 'react';
import {
  filterEntries,
  HyphenationLocalizedStrings,
  isValidHyphenation,
  isValidNewWord,
} from './hyphenation.utils';

/** State of the add/edit dialog */
type EntryDialogState = {
  isOpen: boolean;
  /** 'add' lets the user type a new word; 'edit' fixes the word and edits its hyphenation */
  mode: 'add' | 'edit';
  word: string;
  hyphenation: string;
  /** Error from the backend save call (already localized), shown inline */
  saveError?: string;
};

const CLOSED_DIALOG: EntryDialogState = { isOpen: false, mode: 'add', word: '', hyphenation: '' };

/** Localized labels needed by the table columns */
type ColumnLabels = {
  word: string;
  hyphenation: string;
  approved: string;
  toggleApproved: string;
  edit: string;
  delete: string;
};

/**
 * Builds the table column definitions. Defined at module scope (not inside the component) so cell
 * renderers are not recreated as new component types on every render
 * (react/no-unstable-nested-components).
 */
function createColumns(
  labels: ColumnLabels,
  projectTextDirection: 'ltr' | 'rtl' | '',
  onToggleApproved: (entry: HyphenationEntry) => void,
  onEdit: (entry: HyphenationEntry) => void,
  onDelete: (entry: HyphenationEntry) => void,
): ColumnDef<HyphenationEntry>[] {
  return [
    {
      accessorKey: 'word',
      header: labels.word,
      cell: ({ row }) => <span dir={projectTextDirection}>{row.original.word}</span>,
    },
    {
      accessorKey: 'hyphenation',
      header: labels.hyphenation,
      cell: ({ row }) => <span dir={projectTextDirection}>{row.original.hyphenation}</span>,
    },
    {
      accessorKey: 'isApproved',
      header: labels.approved,
      cell: ({ row }) => (
        <Checkbox
          checked={row.original.isApproved}
          onCheckedChange={() => onToggleApproved(row.original)}
          aria-label={labels.toggleApproved}
        />
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="tw:flex tw:gap-1 tw:justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(row.original)}
            aria-label={labels.edit}
          >
            <Pencil className="tw:h-4 tw:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(row.original)}
            aria-label={labels.delete}
          >
            <Trash2 className="tw:h-4 tw:w-4" />
          </Button>
        </div>
      ),
    },
  ];
}

/** Props for the {@link Hyphenation} component — pure presentational */
export type HyphenationProps = {
  /** All hyphenation entries for the project, ordered by word */
  entries: HyphenationEntry[];
  /** Whether the entries are still loading */
  isLoading: boolean;
  /** True if the hyphenation file contained duplicate words with conflicting hyphenation */
  hadRedundancy?: boolean;
  /** True if the hyphenation file contained words with capital letters */
  hadUppercase?: boolean;
  /** Text direction of project content (words). UI chrome follows the app direction. */
  projectTextDirection?: 'ltr' | 'rtl' | '';
  /** Resolved localized strings (may be partially resolved while loading) */
  localizedStrings: HyphenationLocalizedStrings;
  /**
   * Add or update a word's hyphenation. Resolves to an error message (already localized) on
   * failure, or `undefined` on success.
   */
  onSaveEntry: (
    word: string,
    hyphenation: string,
    isApproved: boolean,
  ) => Promise<string | undefined>;
  /**
   * Delete a word's hyphenation entry entirely. Resolves to an error message (already localized) on
   * failure, or `undefined` on success.
   */
  onDeleteEntry: (word: string) => Promise<string | undefined>;
};

/**
 * === PORTED FROM PT9 === Source: PT9/Paratext/WordList/WordListForm.cs:1041-1062 (approve/edit
 * hyphenation links), 1310-1387 (approve/edit menu handlers), 2227-2252 (hyphenation column
 * rendering) Method: WordListForm hyphenation column UI, reimagined as a standalone PT10 tool Maps
 * to: research/paratext-9-features/05_Spelling_Wordlist.md §5.6
 *
 * Standalone Hyphenation tool: lists a project's hyphenation entries with approved status, supports
 * searching, adding, editing, approving/unapproving, and deleting word hyphenations. In PT9 this
 * functionality lives inside the Wordlist tool; the Wordlist tool is not yet ported to PT10, so
 * this tool stands alone (see PR description for the scope rationale).
 */
export function Hyphenation({
  entries,
  isLoading,
  hadRedundancy = false,
  hadUppercase = false,
  projectTextDirection = 'ltr',
  localizedStrings,
  onSaveEntry,
  onDeleteEntry,
}: HyphenationProps) {
  const [searchText, setSearchText] = useState('');
  const [dialogState, setDialogState] = useState<EntryDialogState>(CLOSED_DIALOG);
  const [actionError, setActionError] = useState<string | undefined>(undefined);
  const wordInputId = useId();
  const hyphenationInputId = useId();

  const t = useCallback(
    (key: keyof HyphenationLocalizedStrings, fallback: string): string =>
      localizedStrings[key] ?? fallback,
    [localizedStrings],
  );

  const filteredEntries = useMemo(() => filterEntries(entries, searchText), [entries, searchText]);

  const handleToggleApproved = useCallback(
    async (entry: HyphenationEntry) => {
      setActionError(undefined);
      const error = await onSaveEntry(entry.word, entry.hyphenation, !entry.isApproved);
      if (error) setActionError(error);
    },
    [onSaveEntry],
  );

  const handleDelete = useCallback(
    async (entry: HyphenationEntry) => {
      setActionError(undefined);
      const error = await onDeleteEntry(entry.word);
      if (error) setActionError(error);
    },
    [onDeleteEntry],
  );

  const openAddDialog = useCallback(() => {
    setDialogState({ isOpen: true, mode: 'add', word: '', hyphenation: '' });
  }, []);

  const openEditDialog = useCallback((entry: HyphenationEntry) => {
    setDialogState({
      isOpen: true,
      mode: 'edit',
      word: entry.word,
      hyphenation: entry.hyphenation,
    });
  }, []);

  const isWordValid = dialogState.mode === 'edit' || isValidNewWord(dialogState.word.trim());
  const isHyphenationValid = isValidHyphenation(
    dialogState.word.trim(),
    dialogState.hyphenation.trim(),
  );
  const canSaveDialog = isWordValid && isHyphenationValid;

  const handleDialogSave = useCallback(async () => {
    const word = dialogState.word.trim();
    const hyphenation = dialogState.hyphenation.trim();
    if (!isValidHyphenation(word, hyphenation)) return;

    // Saving from the dialog always marks the entry approved, matching PT9 where an explicit
    // user edit records an approved (starred) hyphenation
    const error = await onSaveEntry(word, hyphenation, true);
    if (error) {
      setDialogState((prev) => ({ ...prev, saveError: error }));
      return;
    }
    setDialogState(CLOSED_DIALOG);
  }, [dialogState.hyphenation, dialogState.word, onSaveEntry]);

  const handleDialogKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      // Sandboxed web views cannot use <form>, so handle Enter manually
      if (event.key === 'Enter' && canSaveDialog) handleDialogSave();
    },
    [canSaveDialog, handleDialogSave],
  );

  const columns = useMemo(
    () =>
      createColumns(
        {
          word: t('%webView_hyphenation_wordLabel%', 'Word'),
          hyphenation: t('%webView_hyphenation_hyphenationLabel%', 'Hyphenation'),
          approved: t('%webView_hyphenation_approvedLabel%', 'Approved'),
          toggleApproved: t('%webView_hyphenation_toggleApproved%', 'Toggle approved'),
          edit: t('%webView_hyphenation_edit%', 'Edit'),
          delete: t('%webView_hyphenation_delete%', 'Delete'),
        },
        projectTextDirection,
        handleToggleApproved,
        openEditDialog,
        handleDelete,
      ),
    [handleDelete, handleToggleApproved, openEditDialog, projectTextDirection, t],
  );

  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-2 tw:p-2">
      <div className="tw:flex tw:items-center tw:gap-2">
        <Input
          className="tw:max-w-72"
          placeholder={t('%webView_hyphenation_searchPlaceholder%', 'Filter words...')}
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <Button onClick={openAddDialog}>
          <Plus className="tw:h-4 tw:w-4" />
          {t('%webView_hyphenation_addWord%', 'Add word...')}
        </Button>
      </div>

      {hadUppercase && (
        <Alert>
          <AlertDescription>
            {t(
              '%webView_hyphenation_uppercaseNotice%',
              'Words with capital letters were detected in the hyphenation data file. Paratext stores only lowercase words, so they are shown and saved in lowercase.',
            )}
          </AlertDescription>
        </Alert>
      )}
      {hadRedundancy && (
        <Alert>
          <AlertDescription>
            {t(
              '%webView_hyphenation_redundancyNotice%',
              'Duplicate words with conflicting hyphenation were found in the hyphenation data file. Only one hyphenation per word is kept.',
            )}
          </AlertDescription>
        </Alert>
      )}
      {actionError && (
        <Alert variant="destructive">
          <AlertDescription>{actionError}</AlertDescription>
        </Alert>
      )}

      <div className="tw:min-h-0 tw:flex-1 tw:overflow-auto">
        <DataTable
          columns={columns}
          data={filteredEntries}
          isLoading={isLoading}
          enablePagination
          showPaginationControls
          stickyHeader
          noResultsMessage={t(
            '%webView_hyphenation_noEntries%',
            'No hyphenation entries. Add a word to define its hyphenation points.',
          )}
        />
      </div>

      <Dialog
        open={dialogState.isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) setDialogState(CLOSED_DIALOG);
        }}
      >
        <DialogContent onKeyDown={handleDialogKeyDown}>
          <DialogHeader>
            <DialogTitle>
              {dialogState.mode === 'add'
                ? t('%webView_hyphenation_addWordTitle%', 'Add word hyphenation')
                : t('%webView_hyphenation_enterHyphenation%', 'Enter hyphenation')}
            </DialogTitle>
            <DialogDescription>
              {t(
                '%webView_hyphenation_hyphenationHelp%',
                "Enter the hyphenation by adding equal signs '=' at hyphenation points",
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="tw:flex tw:flex-col tw:gap-4">
            {dialogState.mode === 'add' && (
              <div className="tw:flex tw:flex-col tw:gap-2">
                <Label htmlFor={wordInputId}>{t('%webView_hyphenation_wordLabel%', 'Word')}</Label>
                <Input
                  id={wordInputId}
                  dir={projectTextDirection}
                  value={dialogState.word}
                  aria-invalid={!isWordValid && dialogState.word.length > 0}
                  onChange={(event) =>
                    setDialogState((prev) => ({
                      ...prev,
                      word: event.target.value,
                      saveError: undefined,
                    }))
                  }
                />
                {!isWordValid && dialogState.word.length > 0 && (
                  <p className="tw:text-sm tw:text-destructive">
                    {t(
                      '%webView_hyphenation_invalidWordError%',
                      "Words cannot contain spaces or '=' and cannot start with '*' or '#'",
                    )}
                  </p>
                )}
              </div>
            )}
            <div className="tw:flex tw:flex-col tw:gap-2">
              <Label htmlFor={hyphenationInputId}>
                {t('%webView_hyphenation_hyphenationLabel%', 'Hyphenation')}
              </Label>
              <Input
                id={hyphenationInputId}
                dir={projectTextDirection}
                value={dialogState.hyphenation}
                aria-invalid={!isHyphenationValid && dialogState.hyphenation.length > 0}
                onChange={(event) =>
                  setDialogState((prev) => ({
                    ...prev,
                    hyphenation: event.target.value,
                    saveError: undefined,
                  }))
                }
              />
              {!isHyphenationValid && dialogState.hyphenation.length > 0 && (
                <p className="tw:text-sm tw:text-destructive">
                  {t(
                    '%platformScripture_hyphenation_invalidHyphenationError%',
                    "Hyphenation must be done with '=' character and match original word",
                  )}
                </p>
              )}
              {dialogState.saveError && (
                <p className="tw:text-sm tw:text-destructive">{dialogState.saveError}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogState(CLOSED_DIALOG)}>
              {t('%webView_hyphenation_cancel%', 'Cancel')}
            </Button>
            <Button onClick={handleDialogSave} disabled={!canSaveDialog}>
              {t('%webView_hyphenation_save%', 'Save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Hyphenation;
