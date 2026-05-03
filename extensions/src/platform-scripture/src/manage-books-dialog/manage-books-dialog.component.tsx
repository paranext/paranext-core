import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  BookPlus,
  Copy,
  Download,
  ExternalLink,
  FolderOpen,
  Info,
  Loader2,
  Trash2,
} from 'lucide-react';
import { Canon } from '@sillsdev/scripture';
import {
  Button,
  Checkbox,
  cn,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  Input,
  Label,
  ProjectSelectorProject,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sonner,
  sonner,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { ManageBooksSidebar } from './manage-books-sidebar.component';
import {
  BookGridGroupBy,
  BookGridGroupByToggle,
  BookGridItem,
  BookGridLocalizedStrings,
  BookGridSelector,
  toneForComparisonState,
} from './book-grid.component';
import {
  EstherTemplate,
  ManageBooksAction,
  ManageBooksComparisonState,
  ManageBooksCreateMethod,
  ManageBooksDialogBookInfo,
  ManageBooksDialogLocalizedStrings,
  ManageBooksDialogProject,
  ManageBooksImportFile,
  ManageBooksImportStrategy,
  MutationResult,
} from './manage-books-dialog.types';

// Re-export the public types for backwards compatibility with the original cherry-pick.
export type {
  AlertEntry,
  EstherTemplate,
  ManageBooksAction,
  ManageBooksComparisonState,
  ManageBooksCreateMethod,
  ManageBooksDialogBookInfo,
  ManageBooksDialogLocalizedStrings,
  ManageBooksDialogProject,
  ManageBooksImportFile,
  ManageBooksImportStrategy,
  MutationResult,
} from './manage-books-dialog.types';
export { MANAGE_BOOKS_DIALOG_STRING_KEYS } from './manage-books-dialog.types';

/** Props accepted by `ManageBooksDialog`. */
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

  /**
   * Commit a Create-books operation. Optional return shape carries `AlertEntry[]` warnings/errors
   * which the wiring layer routes to toast notifications via the `onMutationResult` callback; the
   * dialog itself no longer renders an in-dialog result panel (FN-008 v2.6.0+ Theme C1,
   * 2026-05-01).
   */
  onCreateBooks: (args: {
    projectId: string;
    books: string[];
    method: ManageBooksCreateMethod;
    referenceProjectId?: string;
    estherTemplate?: EstherTemplate;
  }) => Promise<MutationResult | undefined> | MutationResult | undefined | void;

  /** Commit an Import-books operation. */
  onImportBooks: (args: {
    projectId: string;
    files: Record<string, ManageBooksImportFile>;
    strategy: ManageBooksImportStrategy;
  }) => Promise<MutationResult | undefined> | MutationResult | undefined | void;

  /** Commit a Copy-books operation. */
  onCopyBooks: (args: {
    destProjectId: string;
    sourceProjectId: string;
    books: string[];
  }) => Promise<MutationResult | undefined> | MutationResult | undefined | void;

  /** Commit a Delete-books operation. */
  onDeleteBooks: (args: {
    projectId: string;
    books: string[];
  }) => Promise<MutationResult | undefined> | MutationResult | undefined | void;

  /**
   * (A1) Open the Greek-Esther template picker. Returns the chosen template or undefined if the
   * user cancels. The picker itself (WP-002) is built separately; the dialog only knows it must
   * call this callback when ESG is being created from a reference text.
   */
  onOpenEstherPicker?: (selectedBooks: string[]) => Promise<EstherTemplate | undefined>;

  /**
   * (A8) Optional override for the Import file picker. When omitted, the dialog falls back to a
   * native `<input type="file">`. Story decorators provide a programmatic mock here.
   */
  onPickImportFiles?: () => Promise<File[] | undefined>;

  /**
   * Theme C1 (FN-008 v2.6.0+, 2026-05-01): mutation result sink. Called after every successful
   * mutation (create/delete/copy/import) with the AlertEntry-bearing result the orchestrator
   * returned. The wiring layer iterates `result.warnings` and `result.errors` and routes each entry
   * to `notificationService.send` (severity mapped from `AlertEntry.level`). The dialog does NOT
   * render an in-dialog result panel — toasts are the canonical surface (per
   * `ui-spec-manage-books.md:118` and phase-3-backend Decision 26).
   */
  onMutationResult?: (result: MutationResult) => void;

  /**
   * (A2) Whether the project is shared with other users. When true, the delete-confirm prompt shows
   * enhanced "they will see this change immediately" copy. Defaults to false.
   */
  isSharedProject?: boolean;

  /**
   * Canonical book id list shown in the dialog. Defaults to the OT+NT+DC canonical books in
   * canonical order.
   */
  bookIds?: string[];

  /**
   * Localization strings. Pass a map keyed by `%manageBooks_*%` tokens (see
   * `MANAGE_BOOKS_DIALOG_STRING_KEYS`). When a key is missing the component falls back to the
   * English copy embedded inline.
   */
  localizedStrings?: ManageBooksDialogLocalizedStrings;

  /**
   * Project list passed to the sidebar's `<ProjectSelector>`. The wiring layer typically derives
   * this from `papi.projectLookup.getMetadataForAllProjects` and filters to scripture projects.
   * Defaults to an empty array, which makes the ProjectSelector render an empty popover.
   */
  sidebarProjects?: readonly ProjectSelectorProject[];
};

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

const computeCompareState = (
  sourceDate: string | undefined,
  destDate: string | undefined,
): ManageBooksComparisonState => {
  if (!sourceDate && !destDate) return 'undetermined';
  if (!sourceDate) return 'sourceDoesNotExist';
  if (!destDate) return 'destDoesNotExist';
  if (sourceDate === destDate) return 'filesAreSame';
  return sourceDate > destDate ? 'sourceIsNewer' : 'sourceIsOlder';
};

/** A7 default-eligibility per comparison state. */
const isDefaultEligible = (state: ManageBooksComparisonState): boolean => {
  // from-only ('destDoesNotExist' here) and from-newer ('sourceIsNewer') checked by default;
  // identical/Same, to-newer/Older, undetermined left unchecked.
  return state === 'destDoesNotExist' || state === 'sourceIsNewer';
};

// Default book range covers the canonical OT (1-39), NT (40-66), and DC (67-88) books PLUS the
// non-canonical "extras" that PT9 surfaced in the Manage Books book chooser: XXA-XXG (93-99) and
// FRT/BAK/OTH (100-102). This matches PT9 `BookChooserForm` behavior and lets the
// CV-disabled-when-non-canonical guard (A6 / VAL-105.1) actually exercise non-canonical selections.
// Books 103+ (3ES, EZA, 5EZ, etc.) are deuterocanonical "Latin Vulgate" extensions that PT9 did not
// surface in the manage-books flow; we likewise omit them.
const DEFAULT_BOOK_IDS: string[] = (() => {
  const ids: string[] = [];
  for (let n = 1; n <= 102; n += 1) {
    const id = Canon.bookNumberToId(n, '');
    if (id) ids.push(id);
  }
  return ids;
})();

const todayISO = () => new Date().toISOString().slice(0, 10);

const isCanonicalId = (book: string): boolean => Canon.isCanonical(book);

const isUsxFileName = (name: string): boolean => {
  const lower = name.toLowerCase();
  return lower.endsWith('.usx') || lower.endsWith('.xml');
};

/** Narrow runtime check for a create-method dropdown value. */
const isCreateMethod = (v: string): v is ManageBooksCreateMethod =>
  v === 'empty' || v === 'chapterVerse' || v === 'fromTemplate';

type ViewPresenceFilter = 'all' | 'new' | 'existing';
type CopyStateFilter = 'all' | 'new' | 'newer' | 'older' | 'same' | 'undetermined';

const isPresenceFilter = (v: string): v is ViewPresenceFilter =>
  v === 'all' || v === 'new' || v === 'existing';
const isCopyStateFilter = (v: string): v is CopyStateFilter =>
  v === 'all' ||
  v === 'new' ||
  v === 'newer' ||
  v === 'older' ||
  v === 'same' ||
  v === 'undetermined';

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

/** Format a localized template string by substituting positional `{0}`, `{1}`, … placeholders. */
const fmt = (template: string, ...values: ReadonlyArray<string | number>): string =>
  template.replace(/\{(\d+)\}/g, (_, idx) => {
    const v = values[Number(idx)];
    return v === undefined ? '' : String(v);
  });

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Unified Manage Books dialog for create / delete / copy / import / view of project books, plus a
 * View action toggle that surfaces the project's current book inventory. The dialog is
 * presentational: callers wire `loadBooks`, `loadProjects`, `loadVersification`, and the four
 * `onCreateBooks` / `onDeleteBooks` / `onCopyBooks` / `onImportBooks` handlers to PAPI in the
 * extension layer. See `manage-books-dialog.types.ts` for the full props contract and the FN-008
 * spec in `.context/features/manage-books/` for behavior catalog references.
 */
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
  onOpenEstherPicker,
  onPickImportFiles,
  onMutationResult,
  isSharedProject = false,
  bookIds,
  localizedStrings = {},
  sidebarProjects = [],
}: ManageBooksDialogProps) {
  const allBooks = useMemo(() => bookIds ?? DEFAULT_BOOK_IDS, [bookIds]);

  const t = useCallback(
    (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) =>
      localizedStrings[key] ?? fallback,
    [localizedStrings],
  );

  const liveRegionId = useId();
  const cvDisabledHintId = useId();
  const applyDisabledHintId = useId();

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
    Promise.resolve(loadProjects())
      .then((next) => {
        setProjects(next);
        return undefined;
      })
      .catch(() => undefined);
  }, [open, loadProjects]);

  useEffect(() => {
    if (!open) return;
    refreshBooks(projectId).catch(() => undefined);
  }, [open, projectId, refreshBooks]);

  // -- UI state ------------------------------------------------------------
  const [action, setAction] = useState<ManageBooksAction>('view');
  const [selectionsByAction, setSelectionsByAction] = useState<Record<string, Set<string>>>({});
  const [filter, setFilter] = useState('');
  const [copySourceId, setCopySourceId] = useState<string | undefined>(undefined);
  // Default Create method is Empty (matches PT9 `CreateBooksForm.Designer.cs` `rbnEmpty.Checked = true`).
  // Empty allows the Create apply button to enable immediately once a book is selected; the user can
  // change to ChapterAndVerse or FromTemplate for richer templates.
  const [createMethod, setCreateMethod] = useState<ManageBooksCreateMethod>('empty');
  const [createReferenceId, setCreateReferenceId] = useState<string | undefined>(undefined);
  const [importFiles, setImportFiles] = useState<Record<string, ManageBooksImportFile>>({});
  const [importConflict, setImportConflict] = useState<
    | {
        books: string[];
        existing: string[];
      }
    | undefined
  >(undefined);
  const [usxConfirm, setUsxConfirm] = useState<{ files: string[] } | undefined>(undefined);
  const [overlapError, setOverlapError] = useState<
    { book: string; existingFile: string; newFile: string } | undefined
  >(undefined);
  const [copyStateFilter, setCopyStateFilter] = useState<
    'all' | 'new' | 'newer' | 'older' | 'same' | 'undetermined'
  >('all');
  const [importPresenceFilter, setImportPresenceFilter] = useState<'all' | 'new' | 'existing'>(
    'all',
  );
  const [viewPresenceFilter, setViewPresenceFilter] = useState<'all' | 'new' | 'existing'>('all');
  // BookGridSelector grouping state. Defaults to canon grouping in View mode (so
  // the user reads "OT / NT / DC" at a glance) and to status grouping in
  // Create/Copy/Import (so the comparison badges drive the section ordering).
  const [gridGroupBy, setGridGroupBy] = useState<BookGridGroupBy>('canon');
  // Using null for React ref compatibility
  // eslint-disable-next-line no-null/no-null
  const importFileInputRef = useRef<HTMLInputElement>(null);
  // Using null for React ref compatibility
  // eslint-disable-next-line no-null/no-null
  const toggleGroupRef = useRef<HTMLDivElement>(null);
  const [toggleGroupWidth, setToggleGroupWidth] = useState<number | undefined>(undefined);

  // A2: delete confirm state
  const [deleteConfirm, setDeleteConfirm] = useState<{ books: string[] } | undefined>(undefined);
  // A4: pre-flight prompts (versification + missing model books)
  const [createPrompt, setCreatePrompt] = useState<
    | { kind: 'missing-model'; missing: string[]; available: string[] }
    | { kind: 'versification'; destVrs: string; modelVrs: string; books: string[] }
    | undefined
  >(undefined);
  // A3: loading state during mutations
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Theme C1 (FN-008 v2.6.0+, 2026-05-01): mutation results route to the
  // wiring layer via `onMutationResult` (toast surface). The dialog no longer
  // holds a `result` state or renders an in-dialog result panel.
  const emitResult = useCallback(
    (mutation: MutationResult) => {
      // Drop empty results (no warnings, no errors) — they convey nothing the
      // user can act on. The `success` flag alone is implicit from the lack of
      // entries.
      if (mutation.errors.length === 0 && mutation.warnings.length === 0) return;
      onMutationResult?.(mutation);
    },
    [onMutationResult],
  );
  // A8: track auto-browse to fire only once per Import-mode entry
  const importAutoBrowseFired = useRef(false);
  // -- Load source-project books on demand when Copy picks a source --------
  useEffect(() => {
    if (!open) return;
    if (!copySourceId) return;
    if (booksByProjectId[copySourceId]) return;
    refreshBooks(copySourceId);
  }, [open, copySourceId, booksByProjectId, refreshBooks]);

  // -- Load versification for the current project -------------------------
  const [versification, setVersification] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!open) {
      setVersification(undefined);
      return undefined;
    }
    let cancelled = false;
    Promise.resolve(loadVersification(projectId))
      .then((v) => {
        if (!cancelled) setVersification(v);
        return undefined;
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [open, projectId, loadVersification]);

  // -- Derived state -------------------------------------------------------
  const fallbackProject: ManageBooksDialogProject = {
    id: projectId,
    shortName: projectId,
    name: projectId,
  };
  const project = projects.find((p) => p.id === projectId) ?? fallbackProject;
  const otherProjects = projects.filter((p) => p.id !== projectId);
  const copySourceProject = copySourceId ? projects.find((p) => p.id === copySourceId) : undefined;
  const createReferenceProject = createReferenceId
    ? projects.find((p) => p.id === createReferenceId)
    : undefined;

  const current = useMemo<ProjectBookState>(
    () => toProjectBookState(booksByProjectId[projectId]),
    [booksByProjectId, projectId],
  );
  const copySource = useMemo<ProjectBookState | undefined>(
    () => (copySourceId ? toProjectBookState(booksByProjectId[copySourceId]) : undefined),
    [copySourceId, booksByProjectId],
  );
  const createReferenceBookState = useMemo<ProjectBookState | undefined>(
    () => (createReferenceId ? toProjectBookState(booksByProjectId[createReferenceId]) : undefined),
    [createReferenceId, booksByProjectId],
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

  // Changing the copy source invalidates the copy selection (we re-seed it below with defaults).
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
    // Default View grouping to canon (OT/NT/DC reads naturally as a "what's in
    // this project" overview). Mutation modes default to status grouping so
    // comparison badges (Newer/Older/New/Same) drive the section order.
    setGridGroupBy(action === 'view' ? 'canon' : 'status');
  }, [action]);

  // Clear the reference project when the creation method is no longer referenceText.
  useEffect(() => {
    if (createMethod !== 'fromTemplate') setCreateReferenceId(undefined);
  }, [createMethod]);

  // Source and reference projects can never equal destination.
  useEffect(() => {
    if (copySourceId === projectId) setCopySourceId(undefined);
    if (createReferenceId === projectId) setCreateReferenceId(undefined);
  }, [copySourceId, createReferenceId, projectId]);

  // GAP-002 (P3U.1 ui-spec-validator): when the user picks a "Based on" reference project in
  // Create mode, eagerly load that project's book set so EXT-102's missing-model pre-flight
  // prompt can compare the user's selection against a real book inventory. Without this, the
  // first call to `createReferenceBookState` returns an empty `present` set (because
  // booksByProjectId never populated for the reference project), making every selected book
  // appear "missing" — EXT-102 then fires with bogus data, or worse, fires when it shouldn't.
  useEffect(() => {
    if (!open || !createReferenceId) return;
    refreshBooks(createReferenceId).catch(() => undefined);
  }, [open, createReferenceId, refreshBooks]);

  // Same lazy-load pattern for the Copy-mode source project so the comparison grid has the
  // source's book set without waiting for the user to interact further. Mirrors the
  // createReferenceId fix and reduces surprise for downstream comparison-grid logic.
  useEffect(() => {
    if (!open || !copySourceId) return;
    refreshBooks(copySourceId).catch(() => undefined);
  }, [open, copySourceId, refreshBooks]);

  // Mirror the ToggleGroup width for the create-mode method-row sizing.
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

  // A7: seed copy selection with default-eligible books when source picked.
  useEffect(() => {
    if (action !== 'copy') return;
    if (!copySource || !copySourceId) return;
    setSelectionsByAction((prev) => {
      if (prev.copy && prev.copy.size > 0) return prev;
      const seed = new Set<string>();
      universe.forEach((b) => {
        const destHas = current.present.has(b);
        const state = computeCompareState(
          copySource.dates[b],
          destHas ? current.dates[b] : undefined,
        );
        if (isDefaultEligible(state)) seed.add(b);
      });
      return { ...prev, copy: seed };
    });
  }, [action, copySource, copySourceId, universe, current]);

  const detectBookId = useCallback(
    (filename: string): string | undefined => {
      const upper = filename.toUpperCase();
      return allBooks.find((b) => upper.includes(b));
    },
    [allBooks],
  );

  /**
   * (A10) Ingest a list of picked files into the import grid. Detects the book ID per file,
   * surfaces unmatched files via a sonner warning, and rejects the addition with an in-dialog
   * validation error if two files map to the same book.
   */
  const ingestImportFiles = useCallback(
    (picked: { name: string }[]): { addedBooks: string[] } => {
      const emptyResult: { addedBooks: string[] } = { addedBooks: [] };
      if (picked.length === 0) return emptyResult;
      const additions: Record<string, ManageBooksImportFile> = {};
      const addedBooks: string[] = [];
      const unmatched: string[] = [];
      const usxFiles: string[] = [];
      // A10: guard against two files mapping to the same book within this batch.
      const seenInBatch: Record<string, string> = {};
      let aborted = false;
      picked.forEach((f) => {
        if (aborted) return;
        const book = detectBookId(f.name);
        if (!book) {
          unmatched.push(f.name);
          return;
        }
        if (seenInBatch[book]) {
          setOverlapError({ book, existingFile: seenInBatch[book], newFile: f.name });
          aborted = true;
          return;
        }
        // A10: also block if the grid already has a different file for this book.
        const existing = importFiles[book];
        if (existing && existing.file !== f.name) {
          setOverlapError({ book, existingFile: existing.file, newFile: f.name });
          aborted = true;
          return;
        }
        seenInBatch[book] = f.name;
        additions[book] = { file: f.name, date: todayISO() };
        addedBooks.push(book);
        if (isUsxFileName(f.name)) usxFiles.push(f.name);
      });
      if (aborted) return emptyResult;
      if (unmatched.length > 0) {
        sonner.warning(
          unmatched.length === 1
            ? fmt(
                t('%manageBooks_import_unmatchedOne%', 'Could not detect a matching book in "{0}"'),
                unmatched[0],
              )
            : fmt(
                t(
                  '%manageBooks_import_unmatchedMany%',
                  'Could not detect a matching book in {0} files',
                ),
                unmatched.length,
              ),
          {
            description: unmatched.length > 1 ? unmatched.join(', ') : undefined,
            duration: Infinity,
            closeButton: true,
          },
        );
      }
      if (addedBooks.length === 0) return { addedBooks };
      setImportFiles((prev) => ({ ...prev, ...additions }));
      setSelected((prev) => {
        const next = new Set(prev);
        addedBooks.forEach((b) => next.add(b));
        return next;
      });
      // A9: if any USX/XML files were added, prompt to confirm immediate import.
      if (usxFiles.length > 0) {
        setUsxConfirm({ files: usxFiles });
      }
      return { addedBooks };
    },
    [detectBookId, importFiles, setSelected, t],
  );

  const handleImportFilesPicked = (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;
    ingestImportFiles(Array.from(picked));
  };

  const triggerFileBrowser = useCallback(async (): Promise<{ pickedAny: boolean }> => {
    if (onPickImportFiles) {
      const files = await onPickImportFiles();
      if (!files || files.length === 0) return { pickedAny: false };
      const { addedBooks } = ingestImportFiles(files);
      return { pickedAny: addedBooks.length > 0 };
    }
    importFileInputRef.current?.click();
    // We can't easily await the native picker; treat this as "pickedAny=undefined".
    return { pickedAny: true };
  }, [ingestImportFiles, onPickImportFiles]);

  // A8: auto-browse on Import mode entry.
  useEffect(() => {
    if (!open) {
      importAutoBrowseFired.current = false;
      return;
    }
    if (action !== 'import') {
      importAutoBrowseFired.current = false;
      return;
    }
    if (importAutoBrowseFired.current) return;
    if (Object.keys(importFiles).length > 0) return;
    importAutoBrowseFired.current = true;
    triggerFileBrowser()
      .then(({ pickedAny }) => {
        if (!pickedAny && Object.keys(importFiles).length === 0) {
          // A8: silently revert to View when the user cancels the auto-picker.
          setAction('view');
        }
        return undefined;
      })
      .catch(() => undefined);
  }, [open, action, importFiles, triggerFileBrowser]);

  const filterTerm = filter.trim().toLowerCase();

  const actionFilteredBooks = useMemo<string[]>(() => {
    if (action === 'copy' && copySource && copyStateFilter !== 'all') {
      return universe.filter((b) => {
        const destHas = current.present.has(b);
        const state = computeCompareState(
          copySource.dates[b],
          destHas ? current.dates[b] : undefined,
        );
        if (copyStateFilter === 'undetermined') return state === 'undetermined';
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

  // A6: CV radio disabled when only non-canonical books selected.
  const cvAllowed = useMemo<boolean>(() => {
    if (selectedArr.length === 0) return true;
    return selectedArr.some(isCanonicalId);
  }, [selectedArr]);

  // If user had CV selected and selection becomes only-non-canonical, fall back to empty.
  useEffect(() => {
    if (action === 'create' && createMethod === 'chapterVerse' && !cvAllowed) {
      setCreateMethod('empty');
    }
  }, [action, createMethod, cvAllowed]);

  const canApply =
    action !== 'view' &&
    selectedArr.length > 0 &&
    (action !== 'copy' || !!copySourceId) &&
    !(action === 'create' && createMethod === 'fromTemplate' && !createReferenceId) &&
    !isSubmitting;

  // -- Mutations -----------------------------------------------------------

  // Theme C1: dispatch a thrown-mutation error as a single-error MutationResult
  // so the wiring layer's toast surface can render it consistently with the
  // orchestrator-returned warnings/errors. Using a helper keeps the four
  // run* paths uniform.
  const emitThrownError = (e: unknown) => {
    emitResult({
      success: false,
      warnings: [],
      errors: [
        {
          level: 'error',
          caption: '',
          text: e instanceof Error ? e.message : String(e),
        },
      ],
    });
  };

  /**
   * A3: minimum on-screen lifetime of the spinner / disabled-buttons state, in milliseconds. PAPI
   * mutations frequently complete in well under 100 ms when called against a local data provider;
   * without a floor, the spinner and mid-mutation button-disabled affordances would flicker for a
   * single render frame and never be perceptible to either users (UX problem) or assistive tech /
   * e2e tests asserting the contract (testability problem). The 1500 ms floor sits comfortably
   * above the 500 ms perceptual flicker threshold (Nielsen 1993) and is wide enough that sequential
   * Playwright assertions (e.g. assert apply disabled, then assert cancel disabled) both land
   * inside the same disabled-window even with the back-to-back polling and locator-resolution
   * overhead Electron + CDP introduces. Co-locates with runCreate/runDelete/runCopy/runImport so
   * all four paths get the same treatment.
   */
  const MIN_SUBMITTING_VISIBLE_MS = 1500;
  const minDelay = (ms: number) =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });

  const runCreate = async (books: string[], estherTemplate?: EstherTemplate) => {
    if (books.length === 0) return;
    setIsSubmitting(true);
    const minDisplay = minDelay(MIN_SUBMITTING_VISIBLE_MS);
    try {
      const raw = await Promise.resolve(
        onCreateBooks({
          projectId,
          books,
          method: createMethod,
          referenceProjectId: createMethod === 'fromTemplate' ? createReferenceId : undefined,
          estherTemplate,
        }),
      );
      if (raw) emitResult(raw);
      setSelected(new Set());
      await refreshBooks(projectId);
    } catch (e) {
      emitThrownError(e);
    } finally {
      await minDisplay;
      setIsSubmitting(false);
    }
  };

  const runDelete = async (books: string[]) => {
    if (books.length === 0) return;
    setIsSubmitting(true);
    const minDisplay = minDelay(MIN_SUBMITTING_VISIBLE_MS);
    try {
      const raw = await Promise.resolve(onDeleteBooks({ projectId, books }));
      if (raw) emitResult(raw);
      setSelected(new Set());
      await refreshBooks(projectId);
    } catch (e) {
      emitThrownError(e);
    } finally {
      await minDisplay;
      setIsSubmitting(false);
    }
  };

  const runCopy = async (books: string[], sourceId: string) => {
    if (books.length === 0) return;
    setIsSubmitting(true);
    const minDisplay = minDelay(MIN_SUBMITTING_VISIBLE_MS);
    try {
      const raw = await Promise.resolve(
        onCopyBooks({ destProjectId: projectId, sourceProjectId: sourceId, books }),
      );
      if (raw) emitResult(raw);
      setSelected(new Set());
      await refreshBooks(projectId);
    } catch (e) {
      emitThrownError(e);
    } finally {
      await minDisplay;
      setIsSubmitting(false);
    }
  };

  const runImport = async (books: string[], strategy: ManageBooksImportStrategy) => {
    if (books.length === 0) return;
    const files: Record<string, ManageBooksImportFile> = {};
    books.forEach((b) => {
      if (importFiles[b]) files[b] = importFiles[b];
    });
    setIsSubmitting(true);
    const minDisplay = minDelay(MIN_SUBMITTING_VISIBLE_MS);
    try {
      const raw = await Promise.resolve(onImportBooks({ projectId, files, strategy }));
      if (raw) emitResult(raw);
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
      await refreshBooks(projectId);
    } catch (e) {
      emitThrownError(e);
    } finally {
      await minDisplay;
      setIsSubmitting(false);
    }
  };

  const pendingEstherRef = useRef<EstherTemplate | undefined>(undefined);

  /** A1+A4: orchestrate Create-mode submit (Esther picker + missing-model + versification). */
  const beginCreateFlow = async () => {
    let estherTemplate: EstherTemplate | undefined;
    // A1: Greek Esther picker (if ESG selected and method is referenceText/fromTemplate).
    if (createMethod === 'fromTemplate' && selectedArr.includes('ESG') && onOpenEstherPicker) {
      const chosen = await onOpenEstherPicker(selectedArr);
      if (!chosen) return; // user cancelled
      estherTemplate = chosen;
    }

    // A4: missing-model-books pre-flight (only if a reference project is chosen).
    if (createMethod === 'fromTemplate' && createReferenceId && createReferenceBookState) {
      const missing = selectedArr.filter((b) => !createReferenceBookState.present.has(b));
      const available = selectedArr.filter((b) => createReferenceBookState.present.has(b));
      if (missing.length > 0) {
        setCreatePrompt({ kind: 'missing-model', missing, available });
        // Stash the chosen template until prompt resolution.
        pendingEstherRef.current = estherTemplate;
        return;
      }
    }

    // A4: versification mismatch pre-flight.
    if (createMethod === 'fromTemplate' && createReferenceId) {
      const destVrs = versification ?? '';
      const modelVrs = await Promise.resolve(loadVersification(createReferenceId)).catch(() => '');
      if (destVrs && modelVrs && destVrs !== modelVrs) {
        setCreatePrompt({
          kind: 'versification',
          destVrs,
          modelVrs,
          books: selectedArr,
        });
        pendingEstherRef.current = estherTemplate;
        return;
      }
    }

    await runCreate(selectedArr, estherTemplate);
  };

  const apply = () => {
    if (!canApply) return;
    switch (action) {
      case 'create':
        beginCreateFlow().catch(() => undefined);
        break;
      case 'delete':
        // A2: open delete-confirm prompt.
        setDeleteConfirm({ books: selectedArr });
        break;
      case 'copy':
        if (copySourceId) runCopy(selectedArr, copySourceId).catch(() => undefined);
        break;
      case 'import': {
        const existing = selectedArr.filter((b) => current.present.has(b));
        if (existing.length > 0) {
          setImportConflict({ books: selectedArr, existing });
          break;
        }
        runImport(selectedArr, 'nonExistingChapters').catch(() => undefined);
        break;
      }
      default:
        break;
    }
  };

  // Subtitle reports counts over the canonical-only subset (matching PT9 "X of 88 canonical books"
  // copy). The wider `allBooks` universe includes XXA/FRT/etc. as creatable options but those are
  // not "canonical books" by definition.
  const canonicalBooks = useMemo(() => allBooks.filter((b) => isCanonicalId(b)), [allBooks]);
  const totalPresent = canonicalBooks.filter((b) => current.present.has(b)).length;

  const subtitleTemplate = versification
    ? t('%manageBooks_header_subtitle%', '{0} of {1} canonical books in {2} ({3})')
    : t('%manageBooks_header_subtitleNoVersification%', '{0} of {1} canonical books in {2}');
  const headerSubtitle = versification
    ? fmt(subtitleTemplate, totalPresent, canonicalBooks.length, project.shortName, versification)
    : fmt(subtitleTemplate, totalPresent, canonicalBooks.length, project.shortName);

  const filterChipLabel = (s: string): string => {
    switch (s) {
      case 'all':
        return t('%manageBooks_filter_state_all%', 'All');
      case 'new':
        return t('%manageBooks_filter_state_new%', 'New');
      case 'existing':
        return t('%manageBooks_filter_state_existing%', 'Existing');
      case 'newer':
        return t('%manageBooks_filter_state_newer%', 'Newer');
      case 'older':
        return t('%manageBooks_filter_state_older%', 'Older');
      case 'same':
        return t('%manageBooks_filter_state_same%', 'Same');
      case 'undetermined':
        return t('%manageBooks_filter_state_undetermined%', 'Undetermined');
      default:
        return s;
    }
  };

  const isFilterEmptyState =
    visibleBooks.length === 0 && universe.length > 0 && !(action === 'copy' && !copySourceId);
  const emptyStateMessage = (() => {
    if (action === 'copy' && !copySourceId)
      return t(
        '%manageBooks_copy_emptyState_chooseSource%',
        'Choose a source project to see books available to copy.',
      );
    if (universe.length === 0) {
      if (action === 'create')
        return t(
          '%manageBooks_create_emptyState_allPresent%',
          'This project already contains every canonical book.',
        );
      if (action === 'delete')
        return t('%manageBooks_delete_emptyState_noBooks%', 'This project has no books to delete.');
      if (action === 'copy')
        return t(
          '%manageBooks_copy_emptyState_noBooks%',
          'The chosen source project has no books to copy.',
        );
    }
    return t('%manageBooks_filter_emptyState%', 'No books match the current filter.');
  })();
  const clearActiveFilters = () => {
    setFilter('');
    setCopyStateFilter('all');
    setImportPresenceFilter('all');
    setViewPresenceFilter('all');
  };

  // -- BookGridSelector wiring --------------------------------------------
  // Derive the localized strings the BookGrid itself consumes (group-by
  // toggle labels, canon/status group headers, select-all aria template).
  const bookGridStrings = useMemo<BookGridLocalizedStrings>(
    () => ({
      groupByCanon: t('%manageBooks_grid_groupBy_canon%', 'Canon'),
      groupByStatus: t('%manageBooks_grid_groupBy_status%', 'Status'),
      groupByNone: t('%manageBooks_grid_groupBy_none%', 'None'),
      groupByLabel: t('%manageBooks_grid_groupBy_label%', 'Group by'),
      canonGroupOT: t('%manageBooks_grid_canonGroup_OT%', 'Old Testament'),
      canonGroupNT: t('%manageBooks_grid_canonGroup_NT%', 'New Testament'),
      canonGroupDC: t('%manageBooks_grid_canonGroup_DC%', 'Deuterocanon'),
      canonGroupExtra: t('%manageBooks_grid_canonGroup_Extra%', 'Extra'),
      selectAllInGroup: t('%manageBooks_grid_selectAll%', 'Select all in {0}'),
      outOfScope: t('%manageBooks_grid_outOfScope%', 'Out of scope'),
      untracked: t('%manageBooks_grid_untracked%', 'Untracked'),
      filterPlaceholder: t('%manageBooks_filter_placeholder%', 'Filter books…'),
    }),
    [t],
  );

  // Build per-pill BookGridItem rows from the orchestrator's existing universe
  // + selection state. We map the per-action `compState` (Copy/Import) into
  // both a `tone` (drives the badge color) and a `statusLabel` (drives the
  // status-grouping section header AND the badge text). For Show / Create /
  // Delete the badge is suppressed via `tone: 'neutral'` and the status
  // section header reads "In project" / "Not in project".
  const gridItems = useMemo<BookGridItem[]>(() => {
    const inProjectLabel = t('%manageBooks_grid_statusGroup_inProject%', 'In project');
    const notInProjectLabel = t('%manageBooks_grid_statusGroup_notInProject%', 'Not in project');
    const newerLabel = t('%manageBooks_grid_statusGroup_newer%', 'Newer');
    const olderLabel = t('%manageBooks_grid_statusGroup_older%', 'Older');
    const newLabel = t('%manageBooks_grid_statusGroup_new%', 'New');
    const sameLabel = t('%manageBooks_grid_statusGroup_same%', 'Same');

    return visibleBooks.map<BookGridItem>((book) => {
      const present = current.present.has(book);
      const destDate = current.dates[book];
      let tone: BookGridItem['tone'] = 'neutral';
      let statusLabel: string = present ? inProjectLabel : notInProjectLabel;
      let primaryDate: string | undefined;
      let secondaryDate: string | undefined;

      if (action === 'copy' && copySource) {
        const sourceDate = copySource.dates[book];
        const compState = computeCompareState(sourceDate, present ? destDate : undefined);
        const t1 = toneForComparisonState(compState);
        if (t1 !== 'hidden') tone = t1;
        switch (compState) {
          case 'sourceIsNewer':
            statusLabel = newerLabel;
            break;
          case 'sourceIsOlder':
            statusLabel = olderLabel;
            break;
          case 'destDoesNotExist':
            statusLabel = newLabel;
            break;
          case 'filesAreSame':
            statusLabel = sameLabel;
            break;
          default:
            // sourceDoesNotExist / undetermined keep the present/absent label
            statusLabel = present ? inProjectLabel : notInProjectLabel;
            break;
        }
        primaryDate = present ? destDate : undefined;
        secondaryDate = sourceDate;
      } else if (action === 'import') {
        const pick = importFiles[book];
        if (pick) {
          const compState = computeCompareState(pick.date, present ? destDate : undefined);
          const t1 = toneForComparisonState(compState);
          if (t1 !== 'hidden') tone = t1;
          switch (compState) {
            case 'sourceIsNewer':
              statusLabel = newerLabel;
              break;
            case 'sourceIsOlder':
              statusLabel = olderLabel;
              break;
            case 'destDoesNotExist':
              statusLabel = newLabel;
              break;
            case 'filesAreSame':
              statusLabel = sameLabel;
              break;
            default:
              statusLabel = present ? inProjectLabel : notInProjectLabel;
              break;
          }
          primaryDate = present ? destDate : undefined;
          secondaryDate = pick.date;
        } else {
          primaryDate = present ? destDate : undefined;
        }
      } else if (action === 'create') {
        statusLabel = newLabel;
        primaryDate = undefined;
      } else {
        // view + delete: just show the destination date in the tooltip
        primaryDate = destDate;
      }

      return {
        book,
        present,
        tone,
        statusLabel,
        primaryDate,
        secondaryDate,
      };
    });
  }, [action, visibleBooks, current, copySource, importFiles, t]);

  // Per-pill aria label, mirroring what the previous inline `<li>` provided.
  // Workflows where the row isn't toggleable still get the english book name
  // so screen readers announce something meaningful.
  const gridRowAriaLabel = useCallback(
    (item: BookGridItem) => {
      const showCheckbox =
        action === 'create' ||
        action === 'delete' ||
        action === 'copy' ||
        (action === 'import' && !!importFiles[item.book]);
      const englishName = Canon.bookIdToEnglishName(item.book) || item.book;
      if (showCheckbox) {
        return fmt(t('%manageBooks_selection_selectBook%', 'Select {0}'), englishName);
      }
      return englishName;
    },
    [action, importFiles, t],
  );

  // Primary date label used in the tooltip — the destination project's short
  // name. For Copy/Import we want "From: <date>" / "File: <date>" too.
  const primaryDateLabel = project.shortName;
  const secondaryDateLabel = (() => {
    if (action === 'copy' && copySourceProject) return copySourceProject.shortName;
    if (action === 'import') return 'File';
    return undefined;
  })();

  // -- Footer apply-button label ------------------------------------------
  const applyButtonLabel = (() => {
    if (!canApply) {
      switch (action) {
        case 'create':
          return t('%manageBooks_footer_apply_create%', 'Create');
        case 'delete':
          return t('%manageBooks_footer_apply_delete%', 'Delete');
        case 'copy':
          return t('%manageBooks_footer_apply_copy%', 'Copy');
        case 'import':
          return t('%manageBooks_footer_apply_import%', 'Import');
        default:
          return '';
      }
    }
    const n = selectedArr.length;
    const dest = project.shortName;
    const single = n === 1;
    if (action === 'create')
      return single
        ? fmt(t('%manageBooks_footer_apply_create_one%', 'Create 1 book in {0}'), dest)
        : fmt(t('%manageBooks_footer_apply_create_many%', 'Create {0} books in {1}'), n, dest);
    if (action === 'delete')
      return single
        ? fmt(t('%manageBooks_footer_apply_delete_one%', 'Delete 1 book from {0}'), dest)
        : fmt(t('%manageBooks_footer_apply_delete_many%', 'Delete {0} books from {1}'), n, dest);
    if (action === 'copy')
      return single
        ? fmt(t('%manageBooks_footer_apply_copy_one%', 'Copy 1 book into {0}'), dest)
        : fmt(t('%manageBooks_footer_apply_copy_many%', 'Copy {0} books into {1}'), n, dest);
    if (action === 'import')
      return single
        ? fmt(t('%manageBooks_footer_apply_import_one%', 'Import 1 book into {0}'), dest)
        : fmt(t('%manageBooks_footer_apply_import_many%', 'Import {0} books into {1}'), n, dest);
    return '';
  })();

  // -- Footer summary line ------------------------------------------------
  const summaryText = (() => {
    if (action === 'view')
      return fmt(t('%manageBooks_footer_summary_view%', 'Viewing {0}'), project.shortName);
    if (action === 'create') {
      let methodLabel = t('%manageBooks_create_method_referenceText%', 'Based on');
      if (createMethod === 'empty') {
        methodLabel = t('%manageBooks_create_method_empty%', 'Empty book');
      } else if (createMethod === 'chapterVerse') {
        methodLabel = t(
          '%manageBooks_create_method_chapterVerse%',
          'With all chapter and verse numbers',
        );
      }
      return fmt(
        t('%manageBooks_footer_summary_create%', 'Create in {0} — {1}'),
        project.shortName,
        methodLabel,
      );
    }
    if (action === 'delete')
      return fmt(t('%manageBooks_footer_summary_delete%', 'Delete from {0}'), project.shortName);
    if (action === 'copy') {
      if (copySourceProject)
        return fmt(
          t('%manageBooks_footer_summary_copy_with%', 'Copy from {0} into {1}'),
          copySourceProject.shortName,
          project.shortName,
        );
      return fmt(
        t('%manageBooks_footer_summary_copy_without%', 'Copy into {0}'),
        project.shortName,
      );
    }
    if (action === 'import')
      return fmt(t('%manageBooks_footer_summary_import%', 'Import into {0}'), project.shortName);
    return '';
  })();

  // -- aria-live announcements --------------------------------------------
  const liveAnnouncement = (() => {
    if (isSubmitting) {
      switch (action) {
        case 'create':
          return t('%manageBooks_footer_loading_create%', 'Creating books…');
        case 'delete':
          return t('%manageBooks_footer_loading_delete%', 'Deleting books…');
        case 'copy':
          return t('%manageBooks_footer_loading_copy%', 'Copying books…');
        case 'import':
          return t('%manageBooks_footer_loading_import%', 'Importing books…');
        default:
          return t('%manageBooks_footer_loading%', 'Working…');
      }
    }
    if (action !== 'view' && selectableVisibleBooks.length > 0) {
      return fmt(
        t('%manageBooks_selection_announcement%', '{0} of {1} books selected'),
        visibleSelectedCount,
        selectableVisibleBooks.length,
      );
    }
    return '';
  })();

  // -- Disabled-button tooltip --------------------------------------------
  const disabledTooltip = (() => {
    if (canApply || action === 'view') return undefined;
    if (action === 'copy' && !copySourceId)
      return t('%manageBooks_footer_disabledTooltip_chooseSource%', 'Choose a source project');
    if (action === 'create' && createMethod === 'fromTemplate' && !createReferenceId)
      return t(
        '%manageBooks_footer_disabledTooltip_chooseReference%',
        "Choose a reference project or change 'based on'",
      );
    if (selectedArr.length === 0)
      return action === 'import'
        ? t('%manageBooks_footer_disabledTooltip_addFile%', 'Add a file or select a book')
        : t('%manageBooks_footer_disabledTooltip_selectBook%', 'Select at least one book');
    return undefined;
  })();

  // -- A2 Delete confirm helpers ------------------------------------------
  const deleteConfirmBody = (() => {
    if (!deleteConfirm) return '';
    const n = deleteConfirm.books.length;
    const dest = project.shortName;
    const allSelected = n === current.present.size;
    if (allSelected)
      return fmt(
        t(
          '%manageBooks_delete_confirmBodyAll%',
          'All books will be deleted from {0}. The project itself will not be deleted. This cannot be undone.',
        ),
        dest,
      );
    if (isSharedProject)
      return fmt(
        t(
          '%manageBooks_delete_confirmBodyShared%',
          '{0} book(s) will be deleted from {1}, which is shared with other users. They will see this change immediately. This cannot be undone.',
        ),
        n,
        dest,
      );
    return fmt(
      t(
        '%manageBooks_delete_confirmBodyPartial%',
        '{0} book(s) will be deleted from {1}. This cannot be undone.',
      ),
      n,
      dest,
    );
  })();

  if (!open) {
    // The web view stays mounted but we render nothing when the dialog is "closed".
    // (In tab mode `open` is always true; this guard preserves the legacy storybook contract.)
    return undefined;
  }
  return (
    <>
      <div
        className="tw-flex tw-h-full tw-min-h-0"
        data-testid="manage-books-dialog"
        data-action={action}
      >
        <TooltipProvider delayDuration={200}>
          <ManageBooksSidebar
            active={action}
            onSelectAction={(next) => {
              if (!isSubmitting) setAction(next);
            }}
            projects={sidebarProjects}
            projectId={projectId}
            onProjectIdChange={onProjectIdChange}
            isSubmitting={isSubmitting}
            t={t}
          />
          <div className="tw-flex tw-min-w-0 tw-flex-1 tw-flex-col">
            <header className="tw-flex tw-items-center tw-gap-3 tw-border-b tw-px-6 tw-py-4">
              <div className="tw-flex tw-flex-col">
                <h2 className="tw-text-lg tw-font-semibold">
                  {t('%manageBooks_dialog_title%', 'Manage Books')}
                </h2>
                <p className="tw-text-xs tw-text-muted-foreground">{headerSubtitle}</p>
              </div>
            </header>

            <div
              ref={toggleGroupRef}
              className="tw-flex tw-flex-col tw-items-start tw-gap-2 tw-border-b tw-px-6 tw-py-3 tw-@container/actions"
            >
              {action === 'view' && (
                <div className="tw-flex tw-items-center tw-gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="tw-h-8 tw-px-2 tw-text-xs"
                    onClick={() => onOpenScriptureReferenceSettings(projectId)}
                  >
                    {t('%manageBooks_view_openScrRefSettings%', 'Scripture reference settings…')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="tw-h-8 tw-px-2 tw-text-xs"
                    onClick={() => onOpenProjectCanons(projectId)}
                  >
                    {t('%manageBooks_view_openProjectCanons%', 'Project canons…')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="tw-h-8 tw-gap-1.5 tw-px-2 tw-text-xs"
                    onClick={() => onOpenRegistry(projectId)}
                  >
                    {t('%manageBooks_view_openRegistry%', 'Registry')}
                    <ExternalLink className="tw-h-3 tw-w-3 tw-text-muted-foreground" aria-hidden />
                  </Button>
                  {/* F1: DEF-UI-001 stub for "View differences" — Theme C3
                        (FN-008 v2.6.0+, 2026-05-01) replaced the
                        Tooltip-wrapped empty-onClick Button with a true
                        shadcn ContextMenu containing a disabled
                        ContextMenuItem. The trigger button keeps the visible
                        affordance; right-click opens the menu, which conveys
                        "not yet available" through a disabled item rather
                        than via a Tooltip on a no-op left-click. */}
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="tw-h-8 tw-px-2 tw-text-xs"
                        aria-haspopup="menu"
                      >
                        {t('%manageBooks_view_diff_label%', 'View differences')}
                      </Button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem disabled>
                        {t(
                          '%manageBooks_view_diff_tooltip%',
                          'View differences (not yet available)',
                        )}
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
              )}

              {action === 'create' && (
                <div
                  className="tw-flex tw-items-center tw-gap-2"
                  style={{ width: toggleGroupWidth }}
                >
                  <Select
                    value={createMethod}
                    onValueChange={(v) => {
                      if (isCreateMethod(v)) setCreateMethod(v);
                    }}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="af-method" className="tw-h-8 tw-min-w-0 tw-flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empty">
                        {t('%manageBooks_create_method_empty%', 'Empty book')}
                      </SelectItem>
                      <SelectItem
                        value="chapterVerse"
                        disabled={!cvAllowed}
                        aria-describedby={!cvAllowed ? cvDisabledHintId : undefined}
                      >
                        {t(
                          '%manageBooks_create_method_chapterVerse%',
                          'With all chapter and verse numbers',
                        )}
                      </SelectItem>
                      <SelectItem value="fromTemplate">
                        {t('%manageBooks_create_method_referenceText%', 'Based on')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {!cvAllowed && (
                    <span id={cvDisabledHintId} className="tw-sr-only">
                      {t(
                        '%manageBooks_create_method_chapterVerse_disabledTooltip%',
                        'Disabled because the selection contains only non-canonical books.',
                      )}
                    </span>
                  )}
                  {createMethod === 'fromTemplate' && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info
                          className="tw-h-4 tw-w-4 tw-shrink-0 tw-text-muted-foreground"
                          aria-label={t('%manageBooks_create_basedOnInfo%', 'Based on info')}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        {t(
                          '%manageBooks_create_basedOnInfo%',
                          'Prefill with the same markers as a selected project',
                        )}
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {createMethod === 'fromTemplate' && (
                    <Select
                      value={createReferenceId ?? ''}
                      onValueChange={(v) => setCreateReferenceId(v || undefined)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id="af-reference"
                        className={cn(
                          'tw-h-8 tw-min-w-0 tw-flex-1',
                          !createReferenceId &&
                            'tw-border-primary tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90 [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground',
                        )}
                      >
                        <SelectValue
                          placeholder={t(
                            '%manageBooks_create_referenceProjectPlaceholder%',
                            'Select reference project',
                          )}
                        />
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
                    {t('%manageBooks_copy_fromLabel%', 'From')}
                  </Label>
                  <Select
                    value={copySourceId ?? ''}
                    onValueChange={(v) => setCopySourceId(v || undefined)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      id="af-source"
                      className={cn(
                        'tw-h-8 tw-w-52',
                        !copySourceId &&
                          'tw-border-primary tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90 [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground',
                      )}
                    >
                      <SelectValue
                        placeholder={t('%manageBooks_copy_sourcePlaceholder%', 'Select project')}
                      />
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
                    aria-hidden
                  />
                  <Button
                    variant={hasInlineFiles ? 'outline' : 'default'}
                    size="sm"
                    className="tw-h-8"
                    onClick={() => {
                      triggerFileBrowser().catch(() => undefined);
                    }}
                    disabled={isSubmitting}
                  >
                    <FolderOpen className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                    {hasInlineFiles
                      ? t('%manageBooks_import_addMore%', 'Add files…')
                      : t('%manageBooks_import_choose%', 'Choose files…')}
                  </Button>
                  {hasInlineFiles && (
                    <>
                      <span className="tw-text-xs tw-text-muted-foreground">
                        {Object.keys(importFiles).length === 1
                          ? t('%manageBooks_import_filesMatched_one%', '1 file matched')
                          : fmt(
                              t('%manageBooks_import_filesMatched_other%', '{0} files matched'),
                              Object.keys(importFiles).length,
                            )}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="tw-h-8"
                        onClick={() => setImportFiles({})}
                        disabled={isSubmitting}
                      >
                        {t('%manageBooks_import_clearFiles%', 'Clear')}
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
                        disabled={selectableVisibleBooks.length === 0 || isSubmitting}
                        onCheckedChange={toggleAllVisible}
                        aria-label={
                          visibleSelectedCount > 0
                            ? fmt(
                                t('%manageBooks_selection_xSelected%', '{0} selected'),
                                visibleSelectedCount,
                              )
                            : t('%manageBooks_selection_selectAll%', 'Select all')
                        }
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {visibleSelectedCount > 0
                      ? fmt(
                          t('%manageBooks_selection_xSelected%', '{0} selected'),
                          visibleSelectedCount,
                        )
                      : t('%manageBooks_selection_selectAll%', 'Select all')}
                  </TooltipContent>
                </Tooltip>
              )}
              <Input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder={t('%manageBooks_filter_placeholder%', 'Filter books…')}
                className="tw-h-8 tw-min-w-0 tw-max-w-xs tw-flex-1 tw-basis-24"
                aria-label={t('%manageBooks_filter_books%', 'Filter books')}
                disabled={isSubmitting}
              />
              <span
                className={cn(
                  'tw-whitespace-nowrap tw-text-xs tw-text-muted-foreground',
                  action === 'copy' && 'tw-hidden @md/filterbar:tw-inline',
                )}
              >
                {universe.length === 0
                  ? t('%manageBooks_filter_zero%', '0 books')
                  : fmt(
                      t('%manageBooks_filter_count%', '{0} of {1}'),
                      visibleBooks.length,
                      universe.length,
                    )}
              </span>
              {action === 'view' && (
                <ToggleGroup
                  type="single"
                  value={viewPresenceFilter}
                  onValueChange={(v) => {
                    if (v && isPresenceFilter(v)) setViewPresenceFilter(v);
                  }}
                  className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  data-testid="presence-filter"
                >
                  {(['all', 'new', 'existing'] as const).map((s) => (
                    <ToggleGroupItem
                      key={s}
                      value={s}
                      data-testid={`presence-filter-${s}`}
                      className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                    >
                      {filterChipLabel(s)}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
              {action === 'copy' && copySourceId && (
                <ToggleGroup
                  type="single"
                  value={copyStateFilter}
                  onValueChange={(v) => {
                    if (v && isCopyStateFilter(v)) setCopyStateFilter(v);
                  }}
                  className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  data-testid="copy-state-filter"
                >
                  {(['all', 'new', 'newer', 'older', 'same', 'undetermined'] as const).map((s) => (
                    <ToggleGroupItem
                      key={s}
                      value={s}
                      data-testid={`copy-state-filter-${s}`}
                      className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                    >
                      {filterChipLabel(s)}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
              {action === 'import' && (
                <ToggleGroup
                  type="single"
                  value={importPresenceFilter}
                  onValueChange={(v) => {
                    if (v && isPresenceFilter(v)) setImportPresenceFilter(v);
                  }}
                  className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  data-testid="import-presence-filter"
                >
                  {(['all', 'new', 'existing'] as const).map((s) => (
                    <ToggleGroupItem
                      key={s}
                      value={s}
                      data-testid={`import-presence-filter-${s}`}
                      className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                    >
                      {filterChipLabel(s)}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
              <BookGridGroupByToggle
                value={gridGroupBy}
                onChange={setGridGroupBy}
                localizedStrings={bookGridStrings}
              />
            </div>

            <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-3 tw-py-2">
              {visibleBooks.length === 0 ? (
                <div className="tw-flex tw-min-h-40 tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-text-center tw-text-sm tw-text-muted-foreground">
                  <span>{emptyStateMessage}</span>
                  {isFilterEmptyState && (
                    <Button variant="outline" size="sm" onClick={clearActiveFilters}>
                      {t('%manageBooks_filter_clearButton%', 'Clear filter')}
                    </Button>
                  )}
                </div>
              ) : (
                <BookGridSelector
                  items={gridItems}
                  selected={selected}
                  onToggle={(book) => {
                    const showCheckbox =
                      action === 'create' ||
                      action === 'delete' ||
                      action === 'copy' ||
                      (action === 'import' && !!importFiles[book]);
                    if (showCheckbox) toggleOne(book);
                  }}
                  groupBy={gridGroupBy}
                  ariaLabel={fmt(t('%manageBooks_grid_label%', 'Books in {0}'), project.shortName)}
                  ariaMultiselectable={action !== 'view'}
                  primaryDateLabel={primaryDateLabel}
                  secondaryDateLabel={secondaryDateLabel}
                  interactive={action !== 'view'}
                  localizedStrings={bookGridStrings}
                  getRowAriaLabel={gridRowAriaLabel}
                  contentClassName="tw-px-0 tw-py-0"
                />
              )}
            </div>

            {/* Theme C1 (FN-008 v2.6.0+, 2026-05-01): the in-dialog
                  role="alert" result panel was removed. AlertEntry warnings
                  and errors now flow through the `onMutationResult` callback
                  prop and are surfaced as toasts by the wiring layer. */}

            <footer className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-border-t tw-px-6 tw-py-3">
              <span className="tw-text-xs tw-text-muted-foreground">{summaryText}</span>
              {/* C4: aria-live region for selection-count + status */}
              <span id={liveRegionId} aria-live="polite" className="tw-sr-only">
                {liveAnnouncement}
              </span>
              <div className="tw-flex tw-items-center tw-gap-2">
                {isSubmitting && (
                  <span className="tw-flex tw-items-center tw-gap-1.5 tw-text-xs tw-text-muted-foreground">
                    <Loader2 className="tw-h-3.5 tw-w-3.5 tw-animate-spin" aria-hidden />
                    {liveAnnouncement}
                  </span>
                )}
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  {action === 'view'
                    ? t('%manageBooks_footer_close%', 'Close')
                    : t('%manageBooks_footer_cancel%', 'Cancel')}
                </Button>
                {action !== 'view' &&
                  (() => {
                    const disabled = !canApply;
                    const renderActionIcon = () => {
                      if (isSubmitting)
                        return (
                          <Loader2
                            className="tw-mr-1.5 tw-h-4 tw-w-4 tw-animate-spin"
                            aria-hidden
                          />
                        );
                      if (action === 'create')
                        return <BookPlus className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />;
                      if (action === 'delete')
                        return <Trash2 className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />;
                      if (action === 'copy')
                        return <Copy className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />;
                      if (action === 'import')
                        return <Download className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />;
                      return undefined;
                    };
                    const actionButton = (
                      <Button
                        variant={action === 'delete' ? 'destructive' : 'default'}
                        aria-disabled={disabled}
                        aria-describedby={disabled ? applyDisabledHintId : undefined}
                        disabled={disabled}
                        onClick={apply}
                      >
                        {renderActionIcon()}
                        {applyButtonLabel}
                      </Button>
                    );
                    if (!disabledTooltip) return actionButton;
                    return (
                      <>
                        <span id={applyDisabledHintId} className="tw-sr-only">
                          {disabledTooltip}
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{actionButton}</span>
                          </TooltipTrigger>
                          <TooltipContent>{disabledTooltip}</TooltipContent>
                        </Tooltip>
                      </>
                    );
                  })()}
              </div>
            </footer>
          </div>
        </TooltipProvider>
      </div>

      {/* A2 — Delete confirmation prompt */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={(v) => {
          if (!v) setDeleteConfirm(undefined);
        }}
      >
        <DialogContent className="tw-max-w-md" role="alertdialog">
          <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <h2 className="tw-text-base tw-font-semibold">
                {fmt(
                  t('%manageBooks_delete_confirmTitle%', 'Delete books from {0}?'),
                  project.shortName,
                )}
              </h2>
              <p className="tw-text-sm tw-text-muted-foreground">{deleteConfirmBody}</p>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
              <Button variant="outline" autoFocus onClick={() => setDeleteConfirm(undefined)}>
                {t('%manageBooks_delete_confirmCancel%', 'Cancel')}
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (!deleteConfirm) return;
                  const { books } = deleteConfirm;
                  setDeleteConfirm(undefined);
                  runDelete(books).catch(() => undefined);
                }}
              >
                {t('%manageBooks_delete_confirmAccept%', 'Delete')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* A4 — Create pre-flight prompts (missing model / versification mismatch) */}
      <Dialog
        open={!!createPrompt}
        onOpenChange={(v) => {
          if (!v) {
            setCreatePrompt(undefined);
            pendingEstherRef.current = undefined;
          }
        }}
      >
        <DialogContent className="tw-max-w-md" role="alertdialog">
          <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <h2 className="tw-text-base tw-font-semibold">
                {createPrompt?.kind === 'missing-model'
                  ? t(
                      '%manageBooks_create_missingModelBooksTitle%',
                      'Some books are not in the model project',
                    )
                  : t('%manageBooks_create_versificationMismatchTitle%', 'Versification mismatch')}
              </h2>
              <p className="tw-text-sm tw-text-muted-foreground">
                {(() => {
                  if (createPrompt?.kind === 'missing-model')
                    return fmt(
                      t(
                        '%manageBooks_create_missingModelBooksBody%',
                        '{0} of the selected books are not in the model project {1}. Proceed with the {2} book(s) that are available?',
                      ),
                      createPrompt.missing.length,
                      createReferenceProject?.name ?? '',
                      createPrompt.available.length,
                    );
                  if (createPrompt?.kind === 'versification')
                    return fmt(
                      t(
                        '%manageBooks_create_versificationMismatchBody%',
                        '{0} uses {1} versification but the model project {2} uses {3}. Continue?',
                      ),
                      project.shortName,
                      createPrompt.destVrs,
                      createReferenceProject?.shortName ?? '',
                      createPrompt.modelVrs,
                    );
                  return '';
                })()}
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
              <Button
                variant="outline"
                autoFocus
                onClick={() => {
                  setCreatePrompt(undefined);
                  pendingEstherRef.current = undefined;
                }}
              >
                {t('%manageBooks_prompt_cancel%', 'Cancel')}
              </Button>
              <Button
                onClick={async () => {
                  const prompt = createPrompt;
                  if (!prompt) return;
                  setCreatePrompt(undefined);
                  if (prompt.kind === 'missing-model') {
                    // Continue versification check next.
                    const destVrs = versification ?? '';
                    const modelVrs = createReferenceId
                      ? await Promise.resolve(loadVersification(createReferenceId)).catch(() => '')
                      : '';
                    if (destVrs && modelVrs && destVrs !== modelVrs) {
                      setCreatePrompt({
                        kind: 'versification',
                        destVrs,
                        modelVrs,
                        books: prompt.available,
                      });
                      return;
                    }
                    runCreate(prompt.available, pendingEstherRef.current).catch(() => undefined);
                    pendingEstherRef.current = undefined;
                    return;
                  }
                  runCreate(prompt.books, pendingEstherRef.current).catch(() => undefined);
                  pendingEstherRef.current = undefined;
                }}
              >
                {t('%manageBooks_prompt_continue%', 'Continue')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* A9 — USX confirmation prompt */}
      <Dialog
        open={!!usxConfirm}
        onOpenChange={(v) => {
          if (!v) setUsxConfirm(undefined);
        }}
      >
        <DialogContent className="tw-max-w-md" role="alertdialog">
          <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <h2 className="tw-text-base tw-font-semibold">
                {t('%manageBooks_import_usxConfirmTitle%', 'Import USX files?')}
              </h2>
              <p className="tw-text-sm tw-text-muted-foreground">
                {fmt(
                  t(
                    '%manageBooks_import_usxConfirmBody%',
                    'Import the following USX files into project {0}?',
                  ),
                  project.name,
                )}
              </p>
              <ul className="tw-mt-1 tw-flex tw-flex-col tw-gap-0.5 tw-pl-5 tw-text-xs tw-text-muted-foreground">
                {usxConfirm?.files.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
              <Button
                variant="outline"
                autoFocus
                onClick={() => {
                  // A9: cancel removes the USX files from the grid.
                  if (usxConfirm) {
                    const fileSet = new Set(usxConfirm.files);
                    setImportFiles((prev) => {
                      const next = { ...prev };
                      Object.keys(next).forEach((book) => {
                        if (fileSet.has(next[book].file)) delete next[book];
                      });
                      return next;
                    });
                  }
                  setUsxConfirm(undefined);
                }}
              >
                {t('%manageBooks_import_usxConfirmCancel%', 'Cancel')}
              </Button>
              <Button
                onClick={() => {
                  if (!usxConfirm) return;
                  // A9: Confirm imports immediately. Find the books mapped to these USX files.
                  const fileSet = new Set(usxConfirm.files);
                  const usxBooks = Object.keys(importFiles).filter((book) =>
                    fileSet.has(importFiles[book].file),
                  );
                  setUsxConfirm(undefined);
                  if (usxBooks.length > 0)
                    runImport(usxBooks, 'replaceEntireBooks').catch(() => undefined);
                }}
              >
                {t('%manageBooks_import_usxConfirmAccept%', 'Import')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* A10 — Overlap validation error */}
      <Dialog
        open={!!overlapError}
        onOpenChange={(v) => {
          if (!v) setOverlapError(undefined);
        }}
      >
        <DialogContent className="tw-max-w-md" role="alertdialog">
          <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <h2 className="tw-text-base tw-font-semibold">
                {t('%manageBooks_import_overlapTitle%', 'Two files map to the same book')}
              </h2>
              <p className="tw-text-sm tw-text-muted-foreground">
                {/* B2 — reuse existing backend key for the canonical message, augmented with file names */}
                {t(
                  '%manageBooks_import_errorOverlappingFiles%',
                  'Two files contain information for the same book. They can not both be selected.',
                )}
              </p>
              {overlapError && (
                <p className="tw-text-sm tw-text-muted-foreground">
                  {fmt(
                    t(
                      '%manageBooks_import_overlapBody%',
                      'Cannot import: {0} would be supplied by both "{1}" and "{2}".',
                    ),
                    overlapError.book,
                    overlapError.existingFile,
                    overlapError.newFile,
                  )}
                </p>
              )}
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
              <Button autoFocus onClick={() => setOverlapError(undefined)}>
                {t('%manageBooks_import_overlapDismiss%', 'OK')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Existing import-conflict prompt (replace-entire vs non-existing) */}
      <Dialog
        open={!!importConflict}
        onOpenChange={(v) => {
          if (!v) setImportConflict(undefined);
        }}
      >
        <DialogContent className="tw-max-w-md">
          <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <h2 className="tw-text-base tw-font-semibold">
                {t('%manageBooks_import_conflictTitle%', 'Books already exist')}
              </h2>
              <p className="tw-text-sm tw-text-muted-foreground">
                {importConflict
                  ? fmt(
                      t(
                        '%manageBooks_import_conflictBody%',
                        '{0} book(s) already exist in {1}: {2}',
                      ),
                      importConflict.existing.length,
                      project.name,
                      importConflict.existing.join(', '),
                    )
                  : ''}
              </p>
              <p className="tw-text-sm tw-text-muted-foreground">
                {t(
                  '%manageBooks_import_conflictBody2%',
                  'Choose how to proceed with the import or close to cancel.',
                )}
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  if (!importConflict) return;
                  runImport(importConflict.books, 'replaceEntireBooks').catch(() => undefined);
                  setImportConflict(undefined);
                }}
              >
                {t('%manageBooks_import_replaceEntireBooks%', 'Replace entire books')}
              </Button>
              <Button
                onClick={() => {
                  if (!importConflict) return;
                  runImport(importConflict.books, 'nonExistingChapters').catch(() => undefined);
                  setImportConflict(undefined);
                }}
              >
                {t('%manageBooks_import_nonExistingChapters%', 'Import non-existing chapters')}
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
