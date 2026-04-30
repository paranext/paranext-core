/* eslint-disable -- Frozen design artifact from paranext-core PR #2224 (Sebastian Wiehe).
 * Lint compliance is intentionally deferred to phase-3-ui per FN-008 in
 * .context/features/manage-books/forward-notes.md (refactor + wire-in cycle). The cherry-pick
 * brings this file in verbatim so reviewers can compare against Sebastian's design source. */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpenCheck,
  BookPlus,
  Copy,
  Download,
  ExternalLink,
  FolderOpen,
  Info,
  Trash2,
} from 'lucide-react';
import { Canon } from '@sillsdev/scripture';
import { Dialog, DialogContent } from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Badge } from '@/components/shadcn-ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { Sonner, sonner } from '@/components/shadcn-ui/sonner';
import { cn } from '@/utils/shadcn-ui.util';

/** A project that can appear in the Manage Books dropdown. */
export type ManageBooksDialogProject = {
  id: string;
  shortName: string;
  name: string;
};

/**
 * Presence/metadata for a single book in a project. A project's book list is the set of books
 * currently present in it; anything in the canonical list but not returned is treated as absent
 * ("new" for create/copy/import purposes).
 */
export type ManageBooksDialogBookInfo = {
  /** 3-letter USFM book code, e.g. 'GEN'. */
  id: string;
  /** ISO-formatted date the book was last modified in this project. */
  lastModified?: string;
};

export type ManageBooksCreateMethod = 'empty' | 'chapterVerse' | 'referenceText';

export type ManageBooksImportStrategy = 'replaceEntireBooks' | 'nonExistingChapters';

/** A single inline-picked file associated with a book. */
export type ManageBooksImportFile = {
  /** The picked file's display name. */
  file: string;
  /** ISO date representing the picked file's last-modified timestamp. */
  date: string;
};

export type ManageBooksDialogProps = {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog requests to be closed. */
  onOpenChange: (open: boolean) => void;

  /** Id of the project currently being managed (controlled). */
  projectId: string;
  /** Called when the user picks a different project in the header. */
  onProjectIdChange: (projectId: string) => void;

  /** Load the list of projects available for selection. */
  loadProjects: () => Promise<ManageBooksDialogProject[]> | ManageBooksDialogProject[];
  /** Load the books present in a given project. */
  loadBooks: (
    projectId: string,
  ) => Promise<ManageBooksDialogBookInfo[]> | ManageBooksDialogBookInfo[];
  /** Load the versification identifier for a given project. */
  loadVersification: (projectId: string) => Promise<string> | string;

  /** Cross-launch: open scripture reference settings for this project. */
  onOpenScriptureReferenceSettings: (projectId: string) => void;
  /** Cross-launch: open project canons for this project. */
  onOpenProjectCanons: (projectId: string) => void;
  /** Cross-launch: open registry for this project. */
  onOpenRegistry: (projectId: string) => void;

  /** Commit a Create-books operation with one of the three methods. */
  onCreateBooks: (args: {
    projectId: string;
    books: string[];
    method: ManageBooksCreateMethod;
    referenceProjectId?: string;
  }) => void | Promise<void>;

  /** Commit an Import-books operation using the supplied inline files. */
  onImportBooks: (args: {
    projectId: string;
    files: Record<string, ManageBooksImportFile>;
    strategy: ManageBooksImportStrategy;
  }) => void | Promise<void>;

  /** Commit a Copy-books operation from another project. */
  onCopyBooks: (args: {
    destProjectId: string;
    sourceProjectId: string;
    books: string[];
  }) => void | Promise<void>;

  /** Commit a Delete-books operation. */
  onDeleteBooks: (args: { projectId: string; books: string[] }) => void | Promise<void>;

  /**
   * Canonical book id list shown in the dialog. Defaults to the OT+NT+DC canonical books in
   * canonical order.
   */
  bookIds?: string[];
};

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

type Action = 'view' | 'create' | 'import' | 'copy' | 'delete';

type ComparisonState = 'Same' | 'Newer' | 'Older' | 'Missing' | 'New';

const comparisonVariant = (
  state: ComparisonState,
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (state) {
    case 'Same':
      return 'secondary';
    case 'Newer':
    case 'New':
      return 'default';
    case 'Older':
      return 'destructive';
    default:
      return 'outline';
  }
};

const computeCompareState = (
  sourceDate: string | undefined,
  destDate: string | undefined,
): ComparisonState => {
  if (!sourceDate) return 'Missing';
  if (!destDate) return 'New';
  if (sourceDate === destDate) return 'Same';
  return sourceDate > destDate ? 'Newer' : 'Older';
};

const CREATE_METHOD_LABELS: Record<ManageBooksCreateMethod, string> = {
  empty: 'Empty book',
  chapterVerse: 'With all chapter and verse numbers',
  referenceText: 'Based on',
};

const DEFAULT_BOOK_IDS: string[] = (() => {
  const ids: string[] = [];
  // Canon numbers 1-39 are OT, 40-66 NT, 67+ deuterocanon. Use whatever the
  // Canon module resolves so we stay in sync with @sillsdev/scripture.
  for (let n = 1; n <= 88; n += 1) {
    const id = Canon.bookNumberToId(n, '');
    if (id) ids.push(id);
  }
  return ids;
})();

const todayISO = () => new Date().toISOString().slice(0, 10);

type ProjectBookState = {
  present: Set<string>;
  dates: Record<string, string>;
};

const toProjectBookState = (books: ManageBooksDialogBookInfo[] | undefined): ProjectBookState => {
  const present = new Set<string>();
  const dates: Record<string, string> = {};
  (books ?? []).forEach((b) => {
    present.add(b.id);
    if (b.lastModified) dates[b.id] = b.lastModified;
  });
  return { present, dates };
};

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

export function ManageBooksDialog({
  open,
  onOpenChange,
  projectId,
  onProjectIdChange,
  loadProjects,
  loadBooks,
  loadVersification,
  onOpenScriptureReferenceSettings,
  onOpenProjectCanons,
  onOpenRegistry,
  onCreateBooks,
  onImportBooks,
  onCopyBooks,
  onDeleteBooks,
  bookIds,
}: ManageBooksDialogProps) {
  const allBooks = useMemo(() => bookIds ?? DEFAULT_BOOK_IDS, [bookIds]);

  // -- Loaded data ---------------------------------------------------------
  const [projects, setProjects] = useState<ManageBooksDialogProject[]>([]);
  const [booksByProjectId, setBooksByProjectId] = useState<
    Record<string, ManageBooksDialogBookInfo[]>
  >({});

  const refreshBooks = useCallback(
    async (pid: string) => {
      const books = await Promise.resolve(loadBooks(pid));
      setBooksByProjectId((prev) => ({ ...prev, [pid]: books }));
    },
    [loadBooks],
  );

  useEffect(() => {
    if (!open) return;
    Promise.resolve(loadProjects()).then(setProjects);
  }, [open, loadProjects]);

  useEffect(() => {
    if (!open) return;
    refreshBooks(projectId);
  }, [open, projectId, refreshBooks]);

  // -- UI state ------------------------------------------------------------
  const [action, setAction] = useState<Action>('view');
  // One selection set per action; a filter only affects visibility, so items
  // outside the filter stay in the selection for when the user switches back.
  const [selectionsByAction, setSelectionsByAction] = useState<Record<string, Set<string>>>({});
  const [filter, setFilter] = useState('');
  const [copySourceId, setCopySourceId] = useState<string | undefined>(undefined);
  const [createMethod, setCreateMethod] = useState<ManageBooksCreateMethod>('referenceText');
  const [createReferenceId, setCreateReferenceId] = useState<string | undefined>(undefined);
  const [importFiles, setImportFiles] = useState<Record<string, ManageBooksImportFile>>({});
  const [importConflict, setImportConflict] = useState<{
    books: string[];
    existing: string[];
  } | null>(null);
  const [copyStateFilter, setCopyStateFilter] = useState<
    'all' | 'new' | 'newer' | 'older' | 'same'
  >('all');
  const [importPresenceFilter, setImportPresenceFilter] = useState<'all' | 'new' | 'existing'>(
    'all',
  );
  const [viewPresenceFilter, setViewPresenceFilter] = useState<'all' | 'new' | 'existing'>('all');
  const importFileInputRef = useRef<HTMLInputElement>(null);
  const toggleGroupRef = useRef<HTMLDivElement>(null);
  const [toggleGroupWidth, setToggleGroupWidth] = useState<number | undefined>(undefined);

  // -- Load source-project books on demand when Copy picks a source --------
  useEffect(() => {
    if (!open) return;
    if (!copySourceId) return;
    if (booksByProjectId[copySourceId]) return;
    refreshBooks(copySourceId);
  }, [open, copySourceId, booksByProjectId, refreshBooks]);

  // -- Load versification for the current project (exposed to consumer via
  // their own callback side-effects; we also surface it in the header).
  const [versification, setVersification] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!open) {
      setVersification(undefined);
      return;
    }
    let cancelled = false;
    Promise.resolve(loadVersification(projectId)).then((v) => {
      if (!cancelled) setVersification(v);
    });
    return () => {
      cancelled = true;
    };
  }, [open, projectId, loadVersification]);

  // -- Derived state -------------------------------------------------------
  const project =
    projects.find((p) => p.id === projectId) ??
    ({ id: projectId, shortName: projectId, name: projectId } as ManageBooksDialogProject);
  const otherProjects = projects.filter((p) => p.id !== projectId);
  const copySourceProject = copySourceId ? projects.find((p) => p.id === copySourceId) : undefined;

  const current = useMemo<ProjectBookState>(
    () => toProjectBookState(booksByProjectId[projectId]),
    [booksByProjectId, projectId],
  );
  const copySource = useMemo<ProjectBookState | undefined>(
    () => (copySourceId ? toProjectBookState(booksByProjectId[copySourceId]) : undefined),
    [copySourceId, booksByProjectId],
  );

  const selected = useMemo(
    () => selectionsByAction[action] ?? new Set<string>(),
    [selectionsByAction, action],
  );
  const setSelected = useCallback(
    (updater: Set<string> | ((prev: Set<string>) => Set<string>)) =>
      setSelectionsByAction((prev) => {
        const currentSel = prev[action] ?? new Set<string>();
        const next = typeof updater === 'function' ? updater(currentSel) : updater;
        return { ...prev, [action]: next };
      }),
    [action],
  );

  // Project change wipes selections; nothing carries across projects.
  useEffect(() => setSelectionsByAction({}), [projectId]);

  // Changing the copy source invalidates the copy selection.
  useEffect(() => {
    setSelectionsByAction((prev) => {
      if (!prev.copy) return prev;
      const next = { ...prev };
      delete next.copy;
      return next;
    });
  }, [copySourceId]);

  // Reset per-action filters when the action changes.
  useEffect(() => {
    setCopyStateFilter('all');
    setImportPresenceFilter('all');
    setViewPresenceFilter('all');
  }, [action]);

  // Clear the reference project when the creation method is no longer referenceText.
  useEffect(() => {
    if (createMethod !== 'referenceText') setCreateReferenceId(undefined);
  }, [createMethod]);

  // Source and reference projects can never equal destination.
  useEffect(() => {
    if (copySourceId === projectId) setCopySourceId(undefined);
    if (createReferenceId === projectId) setCreateReferenceId(undefined);
  }, [copySourceId, createReferenceId, projectId]);

  // Mirror the ToggleGroup width so the Create dropdown row can span the same
  // width (single dropdown fills; referenceText splits 50/50).
  useLayoutEffect(() => {
    const el = toggleGroupRef.current;
    if (!el) return undefined;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setToggleGroupWidth(rect.width);
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [action, open]);

  const universe = useMemo<string[]>(() => {
    switch (action) {
      case 'view':
        return allBooks;
      case 'create':
        return allBooks.filter((b) => !current.present.has(b));
      case 'delete':
        return allBooks.filter((b) => current.present.has(b));
      case 'copy':
        return copySource ? allBooks.filter((b) => copySource.present.has(b)) : [];
      case 'import':
        return allBooks;
      default:
        return [];
    }
  }, [action, allBooks, current, copySource]);

  const detectBookId = useCallback(
    (filename: string): string | undefined => {
      const upper = filename.toUpperCase();
      return allBooks.find((b) => upper.includes(b));
    },
    [allBooks],
  );

  const handleImportFilesPicked = (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;
    const additions: Record<string, ManageBooksImportFile> = {};
    const addedBooks: string[] = [];
    const unmatched: string[] = [];
    Array.from(picked).forEach((f) => {
      const book = detectBookId(f.name);
      if (!book) {
        unmatched.push(f.name);
        return;
      }
      additions[book] = { file: f.name, date: todayISO() };
      addedBooks.push(book);
    });
    if (unmatched.length > 0) {
      sonner.warning(
        unmatched.length === 1
          ? `Could not detect a matching book in "${unmatched[0]}"`
          : `Could not detect a matching book in ${unmatched.length} files`,
        {
          description: unmatched.length > 1 ? unmatched.join(', ') : undefined,
          duration: Infinity,
          closeButton: true,
        },
      );
    }
    if (addedBooks.length === 0) return;
    setImportFiles((prev) => ({ ...prev, ...additions }));
    setSelected((prev) => {
      const next = new Set(prev);
      addedBooks.forEach((b) => next.add(b));
      return next;
    });
  };

  const filterTerm = filter.trim().toLowerCase();

  const actionFilteredBooks = useMemo<string[]>(() => {
    if (action === 'copy' && copySource && copyStateFilter !== 'all') {
      return universe.filter((b) => {
        const destHas = current.present.has(b);
        const state = computeCompareState(
          copySource.dates[b],
          destHas ? current.dates[b] : undefined,
        );
        return state.toLowerCase() === copyStateFilter;
      });
    }
    if (action === 'import' && importPresenceFilter !== 'all') {
      return universe.filter((b) =>
        importPresenceFilter === 'new' ? !current.present.has(b) : current.present.has(b),
      );
    }
    if (action === 'view' && viewPresenceFilter !== 'all') {
      return universe.filter((b) =>
        viewPresenceFilter === 'existing' ? current.present.has(b) : !current.present.has(b),
      );
    }
    return universe;
  }, [
    action,
    universe,
    copyStateFilter,
    copySource,
    current,
    importPresenceFilter,
    viewPresenceFilter,
  ]);

  const textFilteredBooks = filterTerm
    ? actionFilteredBooks.filter(
        (b) =>
          b.toLowerCase().includes(filterTerm) ||
          Canon.bookIdToEnglishName(b).toLowerCase().includes(filterTerm),
      )
    : actionFilteredBooks;

  const visibleBooks = useMemo<string[]>(() => {
    if (action !== 'import') return textFilteredBooks;
    const withFiles = textFilteredBooks.filter((b) => importFiles[b]);
    const withoutFiles = textFilteredBooks.filter((b) => !importFiles[b]);
    return [...withFiles, ...withoutFiles];
  }, [action, textFilteredBooks, importFiles]);

  const toggleOne = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });

  const selectableVisibleBooks = useMemo<string[]>(() => {
    if (action === 'view') return [];
    if (action === 'import') return visibleBooks.filter((b) => !!importFiles[b]);
    return visibleBooks;
  }, [action, visibleBooks, importFiles]);
  const visibleSelectedCount = selectableVisibleBooks.filter((b) => selected.has(b)).length;

  const headerSelectState: boolean | 'indeterminate' = (() => {
    if (selectableVisibleBooks.length === 0 || visibleSelectedCount === 0) return false;
    if (visibleSelectedCount === selectableVisibleBooks.length) return true;
    return 'indeterminate';
  })();
  const toggleAllVisible = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      const allSel = selectableVisibleBooks.every((b) => next.has(b));
      if (allSel) selectableVisibleBooks.forEach((b) => next.delete(b));
      else selectableVisibleBooks.forEach((b) => next.add(b));
      return next;
    });

  const selectedArr = selectableVisibleBooks.filter((b) => selected.has(b));
  const hasInlineFiles = Object.keys(importFiles).length > 0;
  const canApply =
    action !== 'view' &&
    selectedArr.length > 0 &&
    (action !== 'copy' || !!copySourceId) &&
    !(action === 'create' && createMethod === 'referenceText' && !createReferenceId);

  // -- Mutations -----------------------------------------------------------
  const runCreate = async (books: string[]) => {
    if (books.length === 0) return;
    await onCreateBooks({
      projectId,
      books,
      method: createMethod,
      referenceProjectId: createMethod === 'referenceText' ? createReferenceId : undefined,
    });
    setSelected(new Set());
    refreshBooks(projectId);
  };

  const runDelete = async (books: string[]) => {
    if (books.length === 0) return;
    await onDeleteBooks({ projectId, books });
    setSelected(new Set());
    refreshBooks(projectId);
  };

  const runCopy = async (books: string[], sourceId: string) => {
    if (books.length === 0) return;
    await onCopyBooks({
      destProjectId: projectId,
      sourceProjectId: sourceId,
      books,
    });
    setSelected(new Set());
    refreshBooks(projectId);
  };

  const runImport = async (books: string[], strategy: ManageBooksImportStrategy) => {
    if (books.length === 0) return;
    const files: Record<string, ManageBooksImportFile> = {};
    books.forEach((b) => {
      if (importFiles[b]) files[b] = importFiles[b];
    });
    await onImportBooks({ projectId, files, strategy });
    setSelected((prev) => {
      const next = new Set(prev);
      books.forEach((b) => next.delete(b));
      return next;
    });
    setImportFiles((prev) => {
      const next = { ...prev };
      books.forEach((b) => delete next[b]);
      return next;
    });
    refreshBooks(projectId);
  };

  const apply = () => {
    if (!canApply) return;
    switch (action) {
      case 'create':
        runCreate(selectedArr);
        return;
      case 'delete':
        runDelete(selectedArr);
        return;
      case 'copy':
        if (copySourceId) runCopy(selectedArr, copySourceId);
        return;
      case 'import': {
        const existing = selectedArr.filter((b) => current.present.has(b));
        if (existing.length > 0) {
          setImportConflict({ books: selectedArr, existing });
          return;
        }
        runImport(selectedArr, 'nonExistingChapters');
        return;
      }
      default:
        return;
    }
  };

  const totalPresent = allBooks.filter((b) => current.present.has(b)).length;

  const actionVerb = (() => {
    if (action === 'create') return 'Create';
    if (action === 'delete') return 'Delete';
    if (action === 'copy') return 'Copy';
    if (action === 'import') return 'Import';
    return '';
  })();

  const actionButtonLabel = (() => {
    if (!canApply) return actionVerb;
    const n = selectedArr.length;
    const suffix = `${n} book${n === 1 ? '' : 's'}`;
    const dest = project.shortName;
    if (action === 'create') return `Create ${suffix} in ${dest}`;
    if (action === 'delete') return `Delete ${suffix} from ${dest}`;
    if (action === 'copy') return `Copy ${suffix} into ${dest}`;
    if (action === 'import') return `Import ${suffix} into ${dest}`;
    return actionVerb;
  })();

  const renderComparisonBadge = (
    state: ComparisonState,
    sideALabel: string,
    sideADate: string | undefined,
    sideBLabel: string,
    sideBDate: string | undefined,
  ) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant={comparisonVariant(state)}>{state}</Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div>{`${sideALabel}: ${sideADate ?? '—'}`}</div>
        <div>{`${sideBLabel}: ${sideBDate ?? '—'}`}</div>
      </TooltipContent>
    </Tooltip>
  );

  const renderMeta = (book: string) => {
    const isPresent = current.present.has(book);
    const destDate = current.dates[book];
    if (action === 'copy' && copySource && copySourceProject) {
      const sourceDate = copySource.dates[book];
      const state = computeCompareState(sourceDate, isPresent ? destDate : undefined);
      if (state === 'New') {
        return (
          <Badge variant="outline" className="tw-font-normal tw-text-muted-foreground">
            New
          </Badge>
        );
      }
      return renderComparisonBadge(
        state,
        copySourceProject.shortName,
        sourceDate,
        project.shortName,
        isPresent ? destDate : undefined,
      );
    }
    if (action === 'delete') {
      return (
        <Badge variant="secondary" className="tw-font-normal">
          {destDate ?? 'Present'}
        </Badge>
      );
    }
    if (action === 'create') {
      return (
        <Badge variant="outline" className="tw-font-normal tw-text-muted-foreground">
          New
        </Badge>
      );
    }
    if (action === 'import') {
      const pick = importFiles[book];
      if (pick) {
        const state = computeCompareState(pick.date, isPresent ? destDate : undefined);
        return (
          <>
            <span
              className="tw-max-w-[12rem] tw-truncate tw-text-xs tw-text-muted-foreground"
              title={pick.file}
            >
              {pick.file}
            </span>
            {renderComparisonBadge(
              state,
              'File',
              pick.date,
              project.shortName,
              isPresent ? destDate : undefined,
            )}
          </>
        );
      }
    }
    if (action === 'view' && !isPresent) return undefined;
    return isPresent ? (
      <Badge variant="secondary" className="tw-font-normal">
        {destDate ?? 'Present'}
      </Badge>
    ) : (
      <Badge variant="outline" className="tw-font-normal tw-text-muted-foreground">
        New
      </Badge>
    );
  };

  const isFilterEmptyState =
    visibleBooks.length === 0 && universe.length > 0 && !(action === 'copy' && !copySourceId);
  const emptyStateMessage = (() => {
    if (action === 'copy' && !copySourceId)
      return 'Choose a source project to see books available to copy.';
    if (universe.length === 0) {
      if (action === 'create') return 'This project already contains every canonical book.';
      if (action === 'delete') return 'This project has no books to delete.';
      if (action === 'copy') return 'The chosen source project has no books to copy.';
    }
    return 'No books match the current filter.';
  })();
  const clearActiveFilters = () => {
    setFilter('');
    setCopyStateFilter('all');
    setImportPresenceFilter('all');
    setViewPresenceFilter('all');
  };

  const headerSubtitle = versification
    ? `${totalPresent} of ${allBooks.length} canonical books in ${project.shortName} (${versification})`
    : `${totalPresent} of ${allBooks.length} canonical books in ${project.shortName}`;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
        <DialogContent
          className="tw-h-[80vh] tw-w-[95vw] tw-max-w-4xl tw-gap-0 tw-overflow-hidden tw-p-0"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onFocusOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => {
            const wrapper = document.querySelector(
              '[data-radix-popper-content-wrapper][data-state="open"]',
            );
            if (wrapper) e.preventDefault();
          }}
        >
          <TooltipProvider delayDuration={200}>
            <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
              <header className="tw-flex tw-items-center tw-gap-3 tw-border-b tw-px-6 tw-py-4">
                <BookOpenCheck className="tw-h-5 tw-w-5 tw-text-muted-foreground" aria-hidden />
                <div className="tw-flex tw-flex-col">
                  <h2 className="tw-text-lg tw-font-semibold">Manage Books</h2>
                  <p className="tw-text-xs tw-text-muted-foreground">{headerSubtitle}</p>
                </div>
                <div className="tw-ml-auto tw-mr-8 tw-flex tw-items-center tw-gap-2">
                  <Label htmlFor="af-project" className="tw-text-xs tw-text-muted-foreground">
                    Project
                  </Label>
                  <Select value={projectId} onValueChange={onProjectIdChange}>
                    <SelectTrigger id="af-project" className="tw-h-8 tw-w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.shortName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </header>

              <div className="tw-flex tw-flex-col tw-items-start tw-gap-2 tw-border-b tw-px-6 tw-py-3 tw-@container/actions">
                <ToggleGroup
                  ref={toggleGroupRef}
                  type="single"
                  variant="outline"
                  value={action}
                  onValueChange={(v) => v && setAction(v as Action)}
                  className="tw-gap-0"
                >
                  <ToggleGroupItem
                    value="view"
                    className="tw-h-9 tw-gap-1.5 !tw-rounded-r-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <BookOpenCheck
                      className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline"
                      aria-hidden
                    />
                    View
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="create"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <BookPlus
                      className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline"
                      aria-hidden
                    />
                    Create
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="import"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <Download
                      className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline"
                      aria-hidden
                    />
                    Import
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="copy"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <Copy className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline" aria-hidden />
                    Copy
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="delete"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-l-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <Trash2 className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline" aria-hidden />
                    Delete
                  </ToggleGroupItem>
                </ToggleGroup>

                {action === 'view' && (
                  <div className="tw-flex tw-items-center tw-gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="tw-h-8 tw-px-2 tw-text-xs"
                      onClick={() => onOpenScriptureReferenceSettings(projectId)}
                    >
                      Scripture reference settings...
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="tw-h-8 tw-px-2 tw-text-xs"
                      onClick={() => onOpenProjectCanons(projectId)}
                    >
                      Project canons...
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="tw-h-8 tw-gap-1.5 tw-px-2 tw-text-xs"
                      onClick={() => onOpenRegistry(projectId)}
                    >
                      Registry
                      <ExternalLink
                        className="tw-h-3 tw-w-3 tw-text-muted-foreground"
                        aria-hidden
                      />
                    </Button>
                  </div>
                )}

                {action === 'create' && (
                  <div
                    className="tw-flex tw-items-center tw-gap-2"
                    style={{ width: toggleGroupWidth }}
                  >
                    <Select
                      value={createMethod}
                      onValueChange={(v) => setCreateMethod(v as ManageBooksCreateMethod)}
                    >
                      <SelectTrigger id="af-method" className="tw-h-8 tw-min-w-0 tw-flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(CREATE_METHOD_LABELS) as ManageBooksCreateMethod[]).map(
                          (m) => (
                            <SelectItem key={m} value={m}>
                              {CREATE_METHOD_LABELS[m]}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    {createMethod === 'referenceText' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            className="tw-h-4 tw-w-4 tw-shrink-0 tw-text-muted-foreground"
                            aria-label="Based on info"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          Prefill with the same markers as a selected project
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {createMethod === 'referenceText' && (
                      <Select
                        value={createReferenceId ?? ''}
                        onValueChange={(v) => setCreateReferenceId(v || undefined)}
                      >
                        <SelectTrigger
                          id="af-reference"
                          className={cn(
                            'tw-h-8 tw-min-w-0 tw-flex-1',
                            !createReferenceId &&
                              'tw-border-primary tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90 [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground',
                          )}
                        >
                          <SelectValue placeholder="Select reference project" />
                        </SelectTrigger>
                        <SelectContent>
                          {otherProjects.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}

                {action === 'copy' && (
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <Label htmlFor="af-source" className="tw-text-xs tw-text-muted-foreground">
                      From
                    </Label>
                    <Select
                      value={copySourceId ?? ''}
                      onValueChange={(v) => setCopySourceId(v || undefined)}
                    >
                      <SelectTrigger
                        id="af-source"
                        className={cn(
                          'tw-h-8 tw-w-52',
                          !copySourceId &&
                            'tw-border-primary tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90 [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground',
                        )}
                      >
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {otherProjects.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {action === 'import' && (
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <input
                      ref={importFileInputRef}
                      type="file"
                      multiple
                      accept=".sfm,.usfm,.usx,.xml"
                      className="tw-hidden"
                      onChange={(e) => {
                        handleImportFilesPicked(e.target.files);
                        e.target.value = '';
                      }}
                    />
                    <Button
                      variant={hasInlineFiles ? 'outline' : 'default'}
                      size="sm"
                      className="tw-h-8"
                      onClick={() => importFileInputRef.current?.click()}
                    >
                      <FolderOpen className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                      {hasInlineFiles ? 'Add files…' : 'Choose files…'}
                    </Button>
                    {hasInlineFiles && (
                      <>
                        <span className="tw-text-xs tw-text-muted-foreground">
                          {`${Object.keys(importFiles).length} file${Object.keys(importFiles).length === 1 ? '' : 's'} matched`}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="tw-h-8"
                          onClick={() => setImportFiles({})}
                        >
                          Clear
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="tw-flex tw-flex-nowrap tw-items-center tw-gap-2 tw-border-b tw-px-6 tw-py-2 tw-@container/filterbar">
                {action !== 'view' && (action !== 'import' || hasInlineFiles) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Checkbox
                          id="af-sel-all"
                          checked={headerSelectState}
                          disabled={selectableVisibleBooks.length === 0}
                          onCheckedChange={toggleAllVisible}
                          aria-label={
                            visibleSelectedCount > 0
                              ? `${visibleSelectedCount} selected`
                              : 'Select all'
                          }
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {visibleSelectedCount > 0 ? `${visibleSelectedCount} selected` : 'Select all'}
                    </TooltipContent>
                  </Tooltip>
                )}
                <Input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter books…"
                  className="tw-h-8 tw-min-w-0 tw-max-w-xs tw-flex-1 tw-basis-24"
                  aria-label="Filter books"
                />
                <span
                  className={cn(
                    'tw-whitespace-nowrap tw-text-xs tw-text-muted-foreground',
                    action === 'copy' && 'tw-hidden @md/filterbar:tw-inline',
                  )}
                >
                  {universe.length === 0
                    ? '0 books'
                    : `${visibleBooks.length} of ${universe.length}`}
                </span>
                {action === 'view' && (
                  <ToggleGroup
                    type="single"
                    value={viewPresenceFilter}
                    onValueChange={(v) =>
                      v && setViewPresenceFilter(v as typeof viewPresenceFilter)
                    }
                    className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  >
                    {(['all', 'new', 'existing'] as const).map((s) => (
                      <ToggleGroupItem
                        key={s}
                        value={s}
                        className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                      >
                        {s}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
                {action === 'copy' && copySourceId && (
                  <ToggleGroup
                    type="single"
                    value={copyStateFilter}
                    onValueChange={(v) => v && setCopyStateFilter(v as typeof copyStateFilter)}
                    className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  >
                    {(['all', 'new', 'newer', 'older', 'same'] as const).map((s) => (
                      <ToggleGroupItem
                        key={s}
                        value={s}
                        className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                      >
                        {s}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
                {action === 'import' && (
                  <ToggleGroup
                    type="single"
                    value={importPresenceFilter}
                    onValueChange={(v) =>
                      v && setImportPresenceFilter(v as typeof importPresenceFilter)
                    }
                    className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  >
                    {(['all', 'new', 'existing'] as const).map((s) => (
                      <ToggleGroupItem
                        key={s}
                        value={s}
                        className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                      >
                        {s}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
              </div>

              <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-3 tw-py-2">
                {visibleBooks.length === 0 ? (
                  <div className="tw-flex tw-min-h-40 tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-text-center tw-text-sm tw-text-muted-foreground">
                    <span>{emptyStateMessage}</span>
                    {isFilterEmptyState && (
                      <Button variant="outline" size="sm" onClick={clearActiveFilters}>
                        Clear filter
                      </Button>
                    )}
                  </div>
                ) : (
                  <ul className="tw-flex tw-flex-col tw-gap-0.5">
                    {visibleBooks.map((book) => {
                      const isSelected = selected.has(book);
                      const showCheckbox =
                        action === 'create' ||
                        action === 'delete' ||
                        action === 'copy' ||
                        (action === 'import' && !!importFiles[book]);
                      const showCheckboxPlaceholder = action === 'import' && !importFiles[book];
                      const isMissingInView = action === 'view' && !current.present.has(book);
                      return (
                        <li
                          key={book}
                          onClick={() => {
                            if (showCheckbox) toggleOne(book);
                          }}
                          className={cn(
                            'tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-px-3 tw-py-1.5 tw-text-sm hover:tw-bg-accent/60',
                            isSelected && 'tw-bg-accent',
                            showCheckbox && 'tw-cursor-pointer',
                          )}
                        >
                          {showCheckbox && (
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleOne(book)}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Select ${book}`}
                            />
                          )}
                          {showCheckboxPlaceholder && (
                            <span className="tw-h-4 tw-w-4 tw-shrink-0" aria-hidden />
                          )}
                          <div
                            className={cn(
                              'tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2',
                              isMissingInView && 'tw-text-muted-foreground tw-line-through',
                            )}
                          >
                            <span className="tw-font-medium">{book}</span>
                            <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
                              {Canon.bookIdToEnglishName(book)}
                            </span>
                          </div>
                          <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
                            {renderMeta(book)}
                            {action === 'view' &&
                              (current.present.has(book) ? (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="tw-h-7 tw-w-7 tw-p-0"
                                      aria-label={`Delete ${book}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectionsByAction((prev) => ({
                                          ...prev,
                                          delete: new Set([book]),
                                        }));
                                        setAction('delete');
                                      }}
                                    >
                                      <Trash2 className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">Go to Delete screen</TooltipContent>
                                </Tooltip>
                              ) : (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="tw-h-7 tw-px-2 tw-text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectionsByAction((prev) => ({
                                          ...prev,
                                          create: new Set([book]),
                                        }));
                                        setAction('create');
                                      }}
                                    >
                                      Create
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">Go to Create screen</TooltipContent>
                                </Tooltip>
                              ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <footer className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-border-t tw-px-6 tw-py-3">
                <span className="tw-text-xs tw-text-muted-foreground">
                  {action === 'view'
                    ? `Viewing ${project.shortName}`
                    : action === 'create'
                      ? `Create in ${project.shortName} — ${CREATE_METHOD_LABELS[createMethod]}`
                      : action === 'delete'
                        ? `Delete from ${project.shortName}`
                        : action === 'copy'
                          ? copySourceProject
                            ? `Copy from ${copySourceProject.shortName} into ${project.shortName}`
                            : `Copy into ${project.shortName}`
                          : `Import into ${project.shortName}`}
                </span>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    {action === 'view' ? 'Close' : 'Cancel'}
                  </Button>
                  {action !== 'view' &&
                    (() => {
                      const actionButton = (
                        <Button
                          variant={action === 'delete' ? 'destructive' : 'default'}
                          disabled={!canApply}
                          onClick={apply}
                        >
                          {action === 'create' && (
                            <BookPlus className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />
                          )}
                          {action === 'delete' && (
                            <Trash2 className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />
                          )}
                          {action === 'copy' && (
                            <Copy className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />
                          )}
                          {action === 'import' && (
                            <Download className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />
                          )}
                          {actionButtonLabel}
                        </Button>
                      );
                      let tooltip: string | undefined;
                      if (!canApply) {
                        const missing: string[] = [];
                        if (action === 'copy' && !copySourceId)
                          missing.push('choose a source project');
                        if (
                          action === 'create' &&
                          createMethod === 'referenceText' &&
                          !createReferenceId
                        )
                          missing.push("choose a reference project or change 'based on'");
                        if (selectedArr.length === 0)
                          missing.push(
                            action === 'import'
                              ? 'add a file or select a book'
                              : 'select at least one book',
                          );
                        if (missing.length > 0) {
                          const next = missing[0];
                          tooltip = `${next[0].toUpperCase()}${next.slice(1)}`;
                        }
                      } else if (action === 'create') {
                        if (createMethod === 'empty') tooltip = 'Create empty';
                        else if (createMethod === 'chapterVerse')
                          tooltip = 'Create with all chapters and verses';
                        else {
                          const ref = createReferenceId
                            ? projects.find((p) => p.id === createReferenceId)
                            : undefined;
                          tooltip = `Create based on ${ref?.name ?? '…'}`;
                        }
                      } else if (action === 'copy') {
                        tooltip = `Create from ${copySourceProject?.name ?? '…'}`;
                      }
                      if (!tooltip) return actionButton;
                      return (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{actionButton}</span>
                          </TooltipTrigger>
                          <TooltipContent>{tooltip}</TooltipContent>
                        </Tooltip>
                      );
                    })()}
                </div>
              </footer>
            </div>
          </TooltipProvider>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!importConflict}
        onOpenChange={(v) => {
          if (!v) setImportConflict(null);
        }}
      >
        <DialogContent className="tw-max-w-md">
          <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <h2 className="tw-text-base tw-font-semibold">Books already exist</h2>
              <p className="tw-text-sm tw-text-muted-foreground">
                {importConflict &&
                  `${importConflict.existing.length} book${importConflict.existing.length === 1 ? '' : 's'} already exist${importConflict.existing.length === 1 ? 's' : ''} in ${project.name}: ${importConflict.existing.join(', ')}`}
              </p>
              <p className="tw-text-sm tw-text-muted-foreground">
                Choose how to proceed with the import or close to cancel.
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  if (!importConflict) return;
                  runImport(importConflict.books, 'replaceEntireBooks');
                  setImportConflict(null);
                }}
              >
                Replace entire books
              </Button>
              <Button
                onClick={() => {
                  if (!importConflict) return;
                  runImport(importConflict.books, 'nonExistingChapters');
                  setImportConflict(null);
                }}
              >
                Import non-existing chapters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Sonner position="top-center" />
    </>
  );
}

export default ManageBooksDialog;
