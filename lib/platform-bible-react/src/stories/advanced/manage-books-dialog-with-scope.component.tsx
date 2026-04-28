import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BookOpenCheck,
  BookPlus,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  Info,
  Minus,
  Plus,
  Settings2,
  Trash2,
} from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import { Canon } from '@sillsdev/scripture';
import {
  doesBookFitScope,
  getExpectedBookCountForScope,
  PROJECT_SCOPES,
  type ProjectScopeId,
} from 'platform-bible-utils';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';
import { Sonner, sonner } from '@/components/shadcn-ui/sonner';
import { cn } from '@/utils/shadcn-ui.util';

/** A project that can appear in the Manage Books dropdown. */
export type ManageBooksDialogProject = {
  id: string;
  shortName: string;
  name: string;
};

/**
 * Presence/metadata for a single book in a project. A project's book list is
 * the set of books currently present in it; anything in the canonical list but
 * not returned is treated as absent ("new" for create/copy/import purposes).
 */
export type ManageBooksDialogBookInfo = {
  /** 3-letter USFM book code, e.g. 'GEN'. */
  id: string;
  /** ISO-formatted date the book was last modified in this project. */
  lastModified?: string;
};

export type ManageBooksCreateMethod = 'empty' | 'chapterVerse' | 'referenceText';

export type ManageBooksImportStrategy =
  | 'replaceEntireBooks'
  | 'nonExistingChapters';

/** A single inline-picked file associated with a book. */
export type ManageBooksImportFile = {
  /** The picked file's display name. */
  file: string;
  /** ISO date representing the picked file's last-modified timestamp. */
  date: string;
};

/** A project scope: the set of books planned to exist in the project. */
export type ManageBooksScope = {
  /** Registry scope id — determines the expected book set and rules. */
  id: ProjectScopeId;
  /** Human-readable scope name, e.g. "Bible without Deuterocanon". */
  name: string;
  /** Book ids planned for this project. */
  bookIds: string[];
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
  loadProjects: () =>
    | Promise<ManageBooksDialogProject[]>
    | ManageBooksDialogProject[];
  /** Load the books present in a given project. */
  loadBooks: (
    projectId: string,
  ) =>
    | Promise<ManageBooksDialogBookInfo[]>
    | ManageBooksDialogBookInfo[];
  /** Load the versification identifier for a given project. */
  loadVersification: (projectId: string) => Promise<string> | string;

  /** Cross-launch: open scripture reference settings for this project. */
  onOpenScriptureReferenceSettings: (projectId: string) => void;
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
  onDeleteBooks: (args: {
    projectId: string;
    books: string[];
  }) => void | Promise<void>;

  /**
   * Canonical book id list shown in the dialog. Defaults to the OT+NT+DC
   * canonical books in canonical order.
   */
  bookIds?: string[];

  /**
   * Current project scope — the set of books planned for this project. When
   * provided, the View mode switches to scope-focused behaviors: the toggle
   * label changes to "Scope", the list is grouped by OT/NT/DC/Extra, each row
   * gets a Missing/Unplanned badge relative to the scope, and the delete
   * per-row icon is replaced by a "remove from scope" action.
   */
  scope?: ManageBooksScope;
  /** Called when the user adds books to the scope via the footer button. */
  onAddBooksToScope?: (args: {
    projectId: string;
    books: string[];
  }) => void | Promise<void>;
  /** Called when the user removes a single book from the scope. */
  onRemoveBookFromScope?: (args: {
    projectId: string;
    book: string;
  }) => void | Promise<void>;
};

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

type Action = 'view' | 'names' | 'create' | 'import' | 'copy' | 'delete';

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
  empty: 'Create empty book',
  chapterVerse: 'Create with all chapter and verse numbers',
  referenceText: 'Create based on',
};

type BookCategory = 'OT' | 'NT' | 'DC' | 'Extra';

const BOOK_CATEGORY_ORDER: BookCategory[] = ['OT', 'NT', 'DC', 'Extra'];
const BOOK_CATEGORY_LABELS: Record<BookCategory, string> = {
  OT: 'Old Testament',
  NT: 'New Testament',
  DC: 'Deuterocanon',
  Extra: 'Extra',
};

const classifyBook = (bookId: string): BookCategory => {
  const n = Canon.bookIdToNumber(bookId);
  if (n >= 1 && n <= 39) return 'OT';
  if (n >= 40 && n <= 66) return 'NT';
  if (n >= 67 && n <= 84) return 'DC';
  return 'Extra';
};

const DEFAULT_BOOK_IDS: string[] = (() => {
  const ids: string[] = [];
  // Default to OT + NT + DC only (numbers 1-88). Extra codes beyond this
  // range (XX*, extra-canonical) are only surfaced when they're actually
  // in the project or explicitly added to scope — see the view universe.
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

const toProjectBookState = (
  books: ManageBooksDialogBookInfo[] | undefined,
): ProjectBookState => {
  const present = new Set<string>();
  const dates: Record<string, string> = {};
  (books ?? []).forEach((b) => {
    present.add(b.id);
    if (b.lastModified) dates[b.id] = b.lastModified;
  });
  return { present, dates };
};

/**
 * Combobox-only variant of the BookSelector pattern: a searchable list of
 * books with checkboxes and an explicit "Add" button. Unlike the shared
 * BookSelector it has no section toggle buttons and no selected-book badges —
 * just the picker — and it never applies directly. The caller receives the
 * staged selection only when the user presses Add.
 *
 * When `fitsScope` is provided the list is split into a "Matching scope" group
 * first, followed by an "Unplanned (out of project scope)" group so the user
 * can see the expected books up top.
 */
function BookSelectorCombobox({
  availableBookInfo,
  onAdd,
  fitsScope,
  addTooltip,
}: {
  availableBookInfo: string;
  onAdd: (books: string[]) => void | Promise<void>;
  fitsScope?: (bookId: string) => boolean;
  /**
   * Optional tooltip shown on the Add button. When a function is passed, it
   * receives the current staged count so the title can reflect it (e.g. "Add
   * 3 books to project scope of WEB").
   */
  addTooltip?:
    | { title: string; description?: string }
    | ((count: number) => { title: string; description?: string });
}) {
  const [staged, setStaged] = useState<Set<string>>(() => new Set());
  const available = useMemo(
    () =>
      Canon.allBookIds.filter((_, i) => availableBookInfo[i] === '1'),
    [availableBookInfo],
  );
  const { matching, nonMatching } = useMemo(() => {
    if (!fitsScope) return { matching: available, nonMatching: [] as string[] };
    const m: string[] = [];
    const n: string[] = [];
    available.forEach((b) => (fitsScope(b) ? m.push(b) : n.push(b)));
    return { matching: m, nonMatching: n };
  }, [available, fitsScope]);
  const toggle = (book: string) =>
    setStaged((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });
  const count = staged.size;
  const renderItem = (book: string) => {
    const checked = staged.has(book);
    return (
      <CommandItem
        key={book}
        value={`${book} ${Canon.bookIdToEnglishName(book)}`}
        onSelect={() => toggle(book)}
        className="tw-flex tw-items-center tw-gap-2"
      >
        <Checkbox
          checked={checked}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={() => toggle(book)}
          aria-label={`Select ${book}`}
        />
        <span className="tw-font-medium">{book}</span>
        <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
          {Canon.bookIdToEnglishName(book)}
        </span>
      </CommandItem>
    );
  };
  return (
    <div className="tw-flex tw-w-80 tw-flex-col">
      <Command>
        <CommandInput placeholder="Search books" />
        <CommandList className="tw-max-h-72">
          <CommandEmpty>No books available.</CommandEmpty>
          {fitsScope ? (
            <>
              {matching.length > 0 && (
                <CommandGroup heading="Matching scope">
                  {matching.map(renderItem)}
                </CommandGroup>
              )}
              {nonMatching.length > 0 && (
                <CommandGroup heading="Out of scope">
                  {nonMatching.map(renderItem)}
                </CommandGroup>
              )}
            </>
          ) : (
            <CommandGroup>{available.map(renderItem)}</CommandGroup>
          )}
        </CommandList>
      </Command>
      <div className="tw-border-t tw-p-2">
        {(() => {
          const addButton = (
            <Button
              size="sm"
              className="tw-w-full"
              disabled={count === 0}
              onClick={async () => {
                if (count === 0) return;
                await onAdd(Array.from(staged));
                setStaged(new Set());
              }}
            >
              {count === 0
                ? 'Add'
                : `Add ${count} book${count === 1 ? '' : 's'}`}
            </Button>
          );
          if (!addTooltip) return addButton;
          const tooltip =
            typeof addTooltip === 'function' ? addTooltip(count) : addTooltip;
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <span>{addButton}</span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <div>{tooltip.title}</div>
                {tooltip.description && (
                  <div className="tw-text-xs tw-text-muted-foreground">
                    {tooltip.description}
                  </div>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })()}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

export function ManageBooksDialogWithScope({
  open,
  onOpenChange,
  projectId,
  onProjectIdChange,
  loadProjects,
  loadBooks,
  loadVersification,
  onOpenScriptureReferenceSettings,
  onOpenRegistry,
  onCreateBooks,
  onImportBooks,
  onCopyBooks,
  onDeleteBooks,
  bookIds,
  scope,
  onAddBooksToScope,
  onRemoveBookFromScope,
}: ManageBooksDialogProps) {
  // Terminology used throughout this component:
  // - Selected books: books the user has chosen for this project. Stored on
  //   the prop as `scope.bookIds`; represented locally as `scopeSet`.
  // - Planned books: Selected ∧ NOT created — books the user has selected
  //   but which don't yet physically exist in the project.
  // - Existing books: Selected ∧ created — books present in the project that
  //   are part of the selection.
  // - Untracked books: created ∧ NOT selected — books present in the project
  //   but not part of the selection (outside progress tracking).
  // - Registry scope: the (possibly fuzzy) intent from `PROJECT_SCOPES` — it
  //   describes what books should be in the project but is an estimation, not
  //   a hard fact. A book can fit or not fit the registry scope (via
  //   `doesBookFitScope`) independently of whether it's selected or created.
  const allBooks = useMemo(() => bookIds ?? DEFAULT_BOOK_IDS, [bookIds]);
  const scopeSet = useMemo(
    () => (scope ? new Set(scope.bookIds) : undefined),
    [scope],
  );
  const isScopeView = scope !== undefined;

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
  const [selectionsByAction, setSelectionsByAction] = useState<
    Record<string, Set<string>>
  >({});
  const [filter, setFilter] = useState('');
  const [copySourceId, setCopySourceId] = useState<string | undefined>(undefined);
  const [namesImportSourceId, setNamesImportSourceId] = useState<
    string | undefined
  >(undefined);
  const [createMethod, setCreateMethod] =
    useState<ManageBooksCreateMethod>('referenceText');
  const [createReferenceId, setCreateReferenceId] = useState<string | undefined>(
    undefined,
  );
  const [importFiles, setImportFiles] = useState<
    Record<string, ManageBooksImportFile>
  >({});
  const [importConflict, setImportConflict] = useState<
    | {
        books: string[];
        existing: string[];
      }
    | null
  >(null);
  const [copyStateFilter, setCopyStateFilter] = useState<
    'all' | 'missing' | 'existing'
  >('all');
  const [importPresenceFilter, setImportPresenceFilter] = useState<
    'all' | 'missing' | 'existing'
  >('all');
  const [viewPresenceFilter, setViewPresenceFilter] = useState<
    'all' | 'missing' | 'existing' | 'untracked'
  >('all');
  const importFileInputRef = useRef<HTMLInputElement>(null);
  const toggleGroupRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [pendingScrollTo, setPendingScrollTo] = useState<string | undefined>(
    undefined,
  );
  const [toggleGroupWidth, setToggleGroupWidth] = useState<number | undefined>(
    undefined,
  );
  const [addScopeOpen, setAddScopeOpen] = useState(false);

  // -- Load source-project books on demand when Copy picks a source --------
  useEffect(() => {
    if (!open) return;
    if (!copySourceId) return;
    if (booksByProjectId[copySourceId]) return;
    refreshBooks(copySourceId);
  }, [open, copySourceId, booksByProjectId, refreshBooks]);

  // -- Load versification for the current project (exposed to consumer via
  // their own callback side-effects; we also surface it in the header).
  const [versification, setVersification] = useState<string | undefined>(
    undefined,
  );
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
  const copySourceProject = copySourceId
    ? projects.find((p) => p.id === copySourceId)
    : undefined;

  const current = useMemo<ProjectBookState>(
    () => toProjectBookState(booksByProjectId[projectId]),
    [booksByProjectId, projectId],
  );
  // availableBookInfo for the Add-to-scope picker: '1' only for canonical
  // books that are neither already in scope nor already present in the project
  // — existing, untracked and unplanned books are all physically in the
  // project, so the picker shouldn't offer to add them again.
  const scopeAvailableBookInfo = useMemo(
    () =>
      Canon.allBookIds
        .map((bookId) =>
          scopeSet?.has(bookId) || current.present.has(bookId) ? '0' : '1',
        )
        .join(''),
    [scopeSet, current],
  );
  const copySource = useMemo<ProjectBookState | undefined>(
    () =>
      copySourceId
        ? toProjectBookState(booksByProjectId[copySourceId])
        : undefined,
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

  // Reset per-action filters when the action changes, and dismiss any
  // lingering toasts from the previous action so context-specific messages
  // (e.g. scope add/remove undo, import warnings) don't survive a tab change.
  useEffect(() => {
    setCopyStateFilter('all');
    setImportPresenceFilter('all');
    setViewPresenceFilter('all');
    sonner.dismiss();
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

  // Workaround: in this repo, Radix ships two installed copies of
  // @radix-ui/react-dismissable-layer (nested under react-dialog vs the root
  // used by react-select/-popover). They do NOT share a DismissableLayerContext,
  // so Dialog and a nested Select/Popover each think they are the topmost
  // layer. Dialog's handler fires first (registered earlier) and calls
  // preventDefault() as part of its own dismissal path, which makes Select's
  // handler skip its `onDismiss`. Net effect: ESC closes the Dialog and leaves
  // Select open.
  //
  // We intercept ESC at the window level in the capture phase — which fires
  // before any document-level handler — and, if a Radix popper is currently
  // open, stop the keyboard event from reaching Dialog's handler and instead
  // synthesize an outside-pointer event. The DialogContent preventsDefault on
  // `onPointerDownOutside`, so the Dialog stays open, while the nested
  // popper's DismissableLayer happily dismisses through the outside-pointer
  // path. ESC with no popper open falls through normally.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const popper = document.querySelector(
        '[data-radix-popper-content-wrapper][data-state="open"]',
      );
      if (!popper) return;
      event.stopImmediatePropagation();
      document.body.dispatchEvent(
        new PointerEvent('pointerdown', { bubbles: true, cancelable: true }),
      );
    };
    window.addEventListener('keydown', handler, { capture: true });
    return () => window.removeEventListener('keydown', handler, { capture: true });
  }, []);

  const universe = useMemo<string[]>(() => {
    switch (action) {
      case 'view':
        if (scopeSet) {
          // Preserve canonical order: a book is shown if it's in scope or
          // present in the project (unplanned). Removing from scope therefore
          // doesn't reshuffle the row — it stays put and just changes badge.
          // Extra/XX* codes that sit outside allBooks still surface when
          // they're in scope or present, so the user can operate on what
          // they've explicitly added or what exists in the project.
          const canonical = allBooks.filter(
            (b) => scopeSet.has(b) || current.present.has(b),
          );
          const canonicalSet = new Set(allBooks);
          const extras = Canon.allBookIds.filter(
            (b) =>
              !canonicalSet.has(b) &&
              (scopeSet.has(b) || current.present.has(b)),
          );
          return [...canonical, ...extras];
        }
        return allBooks;
      case 'names':
        return allBooks;
      case 'create':
        return allBooks.filter((b) => !current.present.has(b));
      case 'delete':
        return allBooks.filter((b) => current.present.has(b));
      case 'copy':
        return copySource ? allBooks.filter((b) => copySource.present.has(b)) : [];
      case 'import':
        // Mirror Copy's "choose a source first" empty state: before any file
        // is picked, show no rows so the user gets an explicit nudge to pick
        // files. Once files are picked, only the matched books appear.
        return allBooks.filter((b) => !!importFiles[b]);
      default:
        return [];
    }
  }, [action, allBooks, current, copySource, scopeSet, importFiles]);

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
          description:
            unmatched.length > 1 ? unmatched.join(', ') : undefined,
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
        // 'missing' (labeled 'planned' in UI): book not in destination.
        // 'existing': book is in destination (regardless of date comparison).
        if (copyStateFilter === 'missing') return !destHas;
        return destHas;
      });
    }
    if (action === 'import' && importPresenceFilter !== 'all') {
      return universe.filter((b) =>
        importPresenceFilter === 'missing'
          ? !current.present.has(b)
          : current.present.has(b),
      );
    }
    if (action === 'view' && viewPresenceFilter !== 'all') {
      if (scopeSet) {
        return universe.filter((b) => {
          const isPresent = current.present.has(b);
          const inScope = scopeSet.has(b);
          switch (viewPresenceFilter) {
            case 'missing':
              // Planned (in scope) but not yet in the project.
              return inScope && !isPresent;
            case 'existing':
              // Tracked: present AND selected (scope.bookIds). Untracked
              // books are reachable via the "untracked" bucket below.
              return isPresent && inScope;
            case 'untracked':
              // Present in the project but not in scope.bookIds — i.e.
              // created books that are explicitly not selected for tracking.
              return isPresent && !inScope;
            default:
              return true;
          }
        });
      }
      return universe.filter((b) =>
        viewPresenceFilter === 'existing'
          ? current.present.has(b)
          : !current.present.has(b),
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
    scopeSet,
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

  // After the user adds books to scope, scroll the first newly-added book to
  // the top of the list so they can see/operate on what they just added.
  useEffect(() => {
    if (!pendingScrollTo) return;
    const container = listContainerRef.current;
    if (!container) return;
    const row = container.querySelector<HTMLElement>(
      `[data-book-id="${pendingScrollTo}"]`,
    );
    if (row) row.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setPendingScrollTo(undefined);
  }, [pendingScrollTo, visibleBooks]);

  const toggleOne = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });

  const selectableVisibleBooks = useMemo<string[]>(() => {
    if (action === 'view') {
      // In scope view, every row is selectable. The footer Track / Untrack
      // buttons compute per-operation eligibility from the selection, so
      // rows that can't participate in a given action just leave its button
      // disabled rather than being unselectable.
      if (!isScopeView || !scopeSet) return [];
      return visibleBooks.filter(
        (b) => scopeSet.has(b) || current.present.has(b),
      );
    }
    if (action === 'names') return [];
    if (action === 'import') return visibleBooks.filter((b) => !!importFiles[b]);
    return visibleBooks;
  }, [action, isScopeView, scopeSet, visibleBooks, importFiles, current]);
  const visibleSelectedCount = selectableVisibleBooks.filter((b) =>
    selected.has(b),
  ).length;

  const headerSelectState: boolean | 'indeterminate' = (() => {
    if (selectableVisibleBooks.length === 0 || visibleSelectedCount === 0)
      return false;
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
  // Scope-view footer-button eligibility. Track: every selected row is
  // untracked (present && !in scope). Untrack: every selected row is in
  // scope. Mixed selections leave both disabled until the user narrows.
  const trackEligible =
    selectedArr.length > 0 &&
    !!scopeSet &&
    selectedArr.every((b) => !scopeSet.has(b) && current.present.has(b));
  const untrackEligible =
    selectedArr.length > 0 &&
    !!scopeSet &&
    selectedArr.every((b) => scopeSet.has(b));

  // -- Mutations -----------------------------------------------------------
  const runCreate = async (books: string[]) => {
    if (books.length === 0) return;
    await onCreateBooks({
      projectId,
      books,
      method: createMethod,
      referenceProjectId:
        createMethod === 'referenceText' ? createReferenceId : undefined,
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

  const runImport = async (
    books: string[],
    strategy: ManageBooksImportStrategy,
  ) => {
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

  const handleAddBooksToScope = useCallback(
    async (books: string[]) => {
      if (books.length === 0) return;
      await onAddBooksToScope?.({ projectId, books });
      // Reset filters so the newly-added books are visible in the list.
      setFilter('');
      setViewPresenceFilter('all');
      // Expand any collapsed category that holds a newly-added book so the
      // user immediately sees what they just added.
      const touchedCategories = new Set<BookCategory>(
        books.map((b) => classifyBook(b)),
      );
      setCollapsedCategories((prev) => {
        if (touchedCategories.size === 0) return prev;
        const next = new Set(prev);
        let changed = false;
        touchedCategories.forEach((c) => {
          if (next.delete(c)) changed = true;
        });
        return changed ? next : prev;
      });
      const label =
        books.length === 1
          ? `Added ${books[0]} to scope`
          : `Added ${books.length} books to scope`;
      sonner.success(label, {
        id: 'manage-books-scope-mutation',
        description: `Project: ${project.shortName}`,
        duration: Infinity,
        closeButton: true,
        position: 'bottom-center',
        action: {
          label: 'Undo',
          onClick: () => {
            books.forEach((book) =>
              onRemoveBookFromScope?.({ projectId, book }),
            );
          },
        },
      });
    },
    [onAddBooksToScope, onRemoveBookFromScope, projectId, project.shortName],
  );

  const handleRemoveBooksFromScope = useCallback(
    async (books: string[]) => {
      if (books.length === 0) return;
      await Promise.all(
        books.map((book) =>
          Promise.resolve(onRemoveBookFromScope?.({ projectId, book })),
        ),
      );
      const label =
        books.length === 1
          ? `Removed ${books[0]} from progress tracking`
          : `Removed ${books.length} books from progress tracking`;
      sonner.success(label, {
        id: 'manage-books-scope-mutation',
        description: `Project: ${project.shortName}`,
        duration: Infinity,
        closeButton: true,
        position: 'bottom-center',
        // Primary action (right) is Dismiss; Undo sits to its left as the
        // secondary/cancel action styled as outline.
        cancel: {
          label: 'Undo',
          onClick: () => {
            onAddBooksToScope?.({ projectId, books });
          },
        },
        action: {
          label: 'Dismiss',
          onClick: () => {},
        },
      });
    },
    [onAddBooksToScope, onRemoveBookFromScope, projectId, project.shortName],
  );

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
  ) => {
    // Display the 'New' comparison state as "Missing" to match the
    // scope-oriented vocabulary used elsewhere in this prototype.
    const label = state === 'New' ? 'Missing' : state;
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={comparisonVariant(state)}>{label}</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div>{`${sideALabel}: ${sideADate ?? '—'}`}</div>
          <div>{`${sideBLabel}: ${sideBDate ?? '—'}`}</div>
        </TooltipContent>
      </Tooltip>
    );
  };

  const renderMeta = (book: string) => {
    const isPresent = current.present.has(book);
    const destDate = current.dates[book];
    if (action === 'copy' && copySource && copySourceProject) {
      const sourceDate = copySource.dates[book];
      const state = computeCompareState(
        sourceDate,
        isPresent ? destDate : undefined,
      );
      if (state === 'New') {
        return (
          <Badge
            variant="outline"
            className="tw-font-normal tw-text-muted-foreground"
          >
            Planned
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
        <Badge
          variant="outline"
          className="tw-font-normal tw-text-muted-foreground"
        >
          Planned
        </Badge>
      );
    }
    if (action === 'import') {
      const pick = importFiles[book];
      if (pick) {
        const state = computeCompareState(
          pick.date,
          isPresent ? destDate : undefined,
        );
        return (
          <>
            <span
              className="tw-max-w-[12rem] tw-truncate tw-text-xs tw-text-muted-foreground"
              title={pick.file}
            >
              {pick.file}
            </span>
            {state === 'New' ? (
              <Badge
                variant="outline"
                className="tw-font-normal tw-text-muted-foreground"
              >
                Planned
              </Badge>
            ) : (
              renderComparisonBadge(
                state,
                'File',
                pick.date,
                project.shortName,
                isPresent ? destDate : undefined,
              )
            )}
          </>
        );
      }
    }
    if (action === 'view' && scopeSet) {
      const isSelected = scopeSet.has(book);
      if (isSelected && !isPresent) {
        // Selected but not yet created — this is a "planned" book.
        return (
          <Badge
            variant="outline"
            className="tw-font-normal tw-text-muted-foreground"
          >
            Planned
          </Badge>
        );
      }
      // Creation dates and the "Present" pill are suppressed in scope
      // view; the right-side slot is reserved for status badges like
      // Untracked and Out of scope rendered in renderBookRow.
      return undefined;
    }
    if (action === 'view' && !isPresent) return undefined;
    return isPresent ? (
      <Badge variant="secondary" className="tw-font-normal">
        {destDate ?? 'Present'}
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="tw-font-normal tw-text-muted-foreground"
      >
        Planned
      </Badge>
    );
  };

  const renderBookRow = (book: string) => {
    const isSelected = selected.has(book);
    const isPresent = current.present.has(book);
    const inScope = scopeSet?.has(book) ?? false;
    const fitsScope = scope
      ? doesBookFitScope(PROJECT_SCOPES[scope.id], book)
      : true;
    const showCheckbox =
      action === 'create' ||
      action === 'delete' ||
      action === 'copy' ||
      (action === 'import' && !!importFiles[book]) ||
      // In scope view, checkboxes only appear once a homogeneous filter
      // (tracked / planned / untracked) is active — in the "all" view the
      // user operates row-by-row via per-row +/− buttons instead.
      (action === 'view' &&
        isScopeView &&
        viewPresenceFilter !== 'all' &&
        (inScope || isPresent));
    const showCheckboxPlaceholder =
      action === 'import' && !importFiles[book];
    const isMissingInView = action === 'view' && !isPresent;
    // Scope-only inline status. Untracked marks present-but-not-selected
    // rows. Out-of-scope marks any book (selected or untracked) that
    // doesn't fit the registry scope — the two can combine on a book that
    // is both untracked and out of registry bounds.
    const showStatusBadges = action === 'view' && isScopeView;
    const isUntracked = showStatusBadges && !inScope && isPresent;
    const isScopeMismatch =
      showStatusBadges && !fitsScope && (inScope || isPresent);
    const statusBadges: {
      label: 'Untracked' | 'Out of scope';
      tooltip: string;
      variant: 'destructive' | 'outline';
    }[] = [];
    if (isUntracked)
      statusBadges.push({
        label: 'Untracked',
        tooltip: `${book} is created but not part of progress tracking.`,
        variant: 'destructive',
      });
    if (isScopeMismatch)
      statusBadges.push({
        label: 'Out of scope',
        tooltip: scope
          ? `${book} does not fit the registered scope (${scope.name}).`
          : `${book} does not match the project scope in registry`,
        variant: 'outline',
      });
    return (
      <li
        key={book}
        data-book-id={book}
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
        <div className="tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2">
          <span
            className={cn(
              'tw-font-medium',
              isMissingInView && 'tw-text-muted-foreground tw-line-through',
            )}
          >
            {book}
          </span>
          <span
            className={cn(
              'tw-truncate tw-text-xs tw-text-muted-foreground',
              isMissingInView && 'tw-line-through',
            )}
          >
            {Canon.bookIdToEnglishName(book)}
          </span>
          {statusBadges
            .filter((badge) => badge.label === 'Out of scope')
            .map((badge) => (
              <Badge
                key={badge.label}
                variant={badge.variant}
                className="tw-font-normal"
              >
                {badge.label}
              </Badge>
            ))}
        </div>
        <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
          {statusBadges
            .filter((badge) => badge.label !== 'Out of scope')
            .map((badge) => (
              <Badge
                key={badge.label}
                variant={badge.variant}
                className="tw-font-normal"
              >
                {badge.label}
              </Badge>
            ))}
          {renderMeta(book)}
        </div>
      </li>
    );
  };

  const groupedVisibleBooks = useMemo(() => {
    // Only group books into OT/NT/DC/Extra when the user is looking at
    // the mixed "all" bucket in scope view. Filtered buckets (tracked,
    // planned, untracked) render as a flat list.
    if (
      !(
        action === 'view' &&
        isScopeView &&
        viewPresenceFilter === 'all'
      )
    )
      return undefined;
    const groups = new Map<BookCategory, string[]>();
    BOOK_CATEGORY_ORDER.forEach((c) => groups.set(c, []));
    visibleBooks.forEach((b) => groups.get(classifyBook(b))!.push(b));
    return groups;
  }, [action, isScopeView, viewPresenceFilter, visibleBooks]);
  const [collapsedCategories, setCollapsedCategories] = useState<
    Set<BookCategory>
  >(() => new Set());
  const toggleCategoryCollapsed = (cat: BookCategory) =>
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });

  const isFilterEmptyState =
    visibleBooks.length === 0 &&
    universe.length > 0 &&
    !(action === 'copy' && !copySourceId) &&
    !(action === 'import' && !hasInlineFiles);
  const emptyStateMessage = (() => {
    if (action === 'copy' && !copySourceId)
      return 'Choose a source project to see books available to copy.';
    if (action === 'import' && !hasInlineFiles)
      return 'Choose files to see books available to import.';
    if (universe.length === 0) {
      if (action === 'create')
        return 'This project already contains every canonical book.';
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

  // For non-scope view, Y falls back to the registry's estimated book
  // count (for fixed scopes, requiredBookIds.length; for fuzzy scopes,
  // the consumer's bookIds.length). This number is a registry estimation
  // and does not reflect per-project planned or created books.
  const registryEstimatedBookCount = scope
    ? getExpectedBookCountForScope(PROJECT_SCOPES[scope.id], scope.bookIds)
    : allBooks.length;
  // In scope view, Y counts every book involved in the project: the union
  // of Selected books (scope.bookIds) and Created books (current.present).
  // Untracked books (created but not selected) therefore still count toward
  // Y alongside selected books that may or may not be created yet.
  const selectedOrCreatedCount = useMemo(() => {
    if (!scope) return 0;
    const union = new Set(scope.bookIds);
    allBooks.forEach((b) => {
      if (current.present.has(b)) union.add(b);
    });
    return union.size;
  }, [scope, allBooks, current]);
  // X = Created books (every book physically present in the project).
  const headerX = totalPresent;
  // Y = |Selected ∪ Created| in scope view, else registry estimation.
  const headerY = scope ? selectedOrCreatedCount : registryEstimatedBookCount;
  const headerNoun = scope ? 'books' : 'canonical books';
  const headerSubtitle = versification
    ? `${headerX} of ${headerY} ${headerNoun} in ${project.shortName} (${versification})`
    : `${headerX} of ${headerY} ${headerNoun} in ${project.shortName}`;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          // Radix fires escape/outside-click handlers outer-first, so an ESC
          // inside an open Select/Popover/Dropdown reaches this Dialog's
          // onDismiss before the nested layer gets a chance to dismiss. If we
          // detect that any popper is still mounted when the Dialog wants to
          // close, refuse the close so only the nested layer handles ESC —
          // the Dialog stays open.
          if (!nextOpen) {
            const popper = document.querySelector(
              '[data-radix-popper-content-wrapper]',
            );
            if (popper) return;
          }
          onOpenChange(nextOpen);
        }}
        modal={false}
      >
        <DialogContent
          className="tw-h-[80vh] tw-w-[95vw] tw-max-w-4xl tw-gap-0 tw-overflow-hidden tw-p-0"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onFocusOutside={(e) => e.preventDefault()}
        >
          <TooltipProvider delayDuration={200}>
            <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
              <header className="tw-flex tw-items-center tw-gap-3 tw-border-b tw-px-6 tw-py-4">
                <BookOpenCheck
                  className="tw-h-5 tw-w-5 tw-text-muted-foreground"
                  aria-hidden
                />
                <div className="tw-flex tw-flex-col">
                  <h2 className="tw-text-lg tw-font-semibold">Manage Books</h2>
                  <p className="tw-text-xs tw-text-muted-foreground">
                    {headerSubtitle}
                  </p>
                </div>
                <div className="tw-ml-auto tw-mr-8 tw-flex tw-items-center tw-gap-2">
                  <Label
                    htmlFor="af-project"
                    className="tw-text-xs tw-text-muted-foreground"
                  >
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
                      className="tw-hidden tw-h-4 tw-w-4 @lg/actions:tw-inline"
                      aria-hidden
                    />
                    {isScopeView ? 'Scope' : 'View'}
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="names"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <FileText
                      className="tw-hidden tw-h-4 tw-w-4 @lg/actions:tw-inline"
                      aria-hidden
                    />
                    Names
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="create"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <BookPlus
                      className="tw-hidden tw-h-4 tw-w-4 @lg/actions:tw-inline"
                      aria-hidden
                    />
                    Create
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="import"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <Download
                      className="tw-hidden tw-h-4 tw-w-4 @lg/actions:tw-inline"
                      aria-hidden
                    />
                    Import
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="copy"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <Copy
                      className="tw-hidden tw-h-4 tw-w-4 @lg/actions:tw-inline"
                      aria-hidden
                    />
                    Copy
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="delete"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-l-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <Trash2
                      className="tw-hidden tw-h-4 tw-w-4 @lg/actions:tw-inline"
                      aria-hidden
                    />
                    Delete
                  </ToggleGroupItem>
                </ToggleGroup>

                {action === 'view' && (
                  <div className="tw-flex tw-items-center tw-gap-1">
                    {scope && (
                      <>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="tw-h-8 tw-gap-1.5 tw-px-2 tw-text-xs"
                              aria-label="Change scope in registry"
                              onClick={() => onOpenRegistry(projectId)}
                            >
                              <Badge
                                variant="outline"
                                className="tw-font-normal hover:tw-bg-transparent"
                              >
                                {scope.name}
                              </Badge>
                              <ExternalLink
                                className="tw-h-3 tw-w-3 tw-text-muted-foreground"
                                aria-hidden
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="tw-max-w-xs">
                            <div className="tw-font-medium">
                              {`Registered scope: ${scope.name}`}
                            </div>
                            <div className="tw-mt-1 tw-text-xs tw-text-muted-foreground">
                              Describes the intended set of books in the
                              registry. The list below shows what&apos;s
                              actually planned and created — they may differ.
                            </div>
                            <div className="tw-mt-1 tw-text-xs tw-text-muted-foreground">
                              Click to change the scope in registry.
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </>
                    )}
                    {!scope && (
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
                    )}
                  </div>
                )}

                {action === 'names' && (
                  <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
                    <Label
                      htmlFor="af-names-import"
                      className="tw-text-xs tw-text-muted-foreground"
                    >
                      Import booknames
                    </Label>
                    <Select
                      value={namesImportSourceId ?? ''}
                      onValueChange={(v) =>
                        setNamesImportSourceId(v || undefined)
                      }
                    >
                      <SelectTrigger
                        id="af-names-import"
                        className="tw-h-8 tw-w-44"
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="tw-h-8"
                          disabled={!namesImportSourceId}
                          onClick={() => {
                            if (!namesImportSourceId) return;
                            const src = projects.find(
                              (p) => p.id === namesImportSourceId,
                            );
                            const name = src?.name ?? namesImportSourceId;
                            sonner.success(
                              `Overwrote book names from ${name}`,
                              {
                                duration: Infinity,
                                closeButton: true,
                                cancel: {
                                  label: 'Undo',
                                  onClick: () => {
                                    sonner.info(
                                      'Reverted book names to the previous values',
                                    );
                                  },
                                },
                                action: {
                                  label: 'Dismiss',
                                  onClick: () => {},
                                },
                              },
                            );
                            setNamesImportSourceId(undefined);
                          }}
                        >
                          Import
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Import and overwrite booknames
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}

                {action === 'create' && (
                  <div
                    className="tw-flex tw-items-center tw-gap-2"
                    style={{ width: toggleGroupWidth }}
                  >
                    <Select
                      value={createMethod}
                      onValueChange={(v) =>
                        setCreateMethod(v as ManageBooksCreateMethod)
                      }
                    >
                      <SelectTrigger
                        id="af-method"
                        className="tw-h-8 tw-min-w-0 tw-flex-1"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(
                          CREATE_METHOD_LABELS,
                        ) as ManageBooksCreateMethod[]).map((m) => (
                          <SelectItem key={m} value={m}>
                            {CREATE_METHOD_LABELS[m]}
                          </SelectItem>
                        ))}
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
                        onValueChange={(v) =>
                          setCreateReferenceId(v || undefined)
                        }
                      >
                        <SelectTrigger
                          id="af-reference"
                          className={cn(
                            'tw-h-8 tw-min-w-0 tw-flex-1',
                            !createReferenceId &&
                              'tw-border-primary tw-bg-primary tw-text-primary-foreground [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground hover:tw-bg-primary/90',
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
                    <Label
                      htmlFor="af-source"
                      className="tw-text-xs tw-text-muted-foreground"
                    >
                      Copy from
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
                            'tw-border-primary tw-bg-primary tw-text-primary-foreground [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground hover:tw-bg-primary/90',
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
                      <FolderOpen
                        className="tw-mr-1.5 tw-h-3.5 tw-w-3.5"
                        aria-hidden
                      />
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
                {((action === 'view' && isScopeView) ||
                  (action !== 'view' &&
                    action !== 'names' &&
                    (action !== 'import' || hasInlineFiles))) &&
                  (() => {
                    // In scope view's "all" filter, per-row checkboxes are
                    // hidden, so the select-all header control has nothing
                    // to act on. In Copy, hide the control entirely when
                    // there are no candidate rows (no source picked, or
                    // source has no books).
                    const isScopeAll =
                      action === 'view' &&
                      isScopeView &&
                      viewPresenceFilter === 'all';
                    if (
                      action === 'copy' &&
                      selectableVisibleBooks.length === 0
                    )
                      return undefined;
                    const checkbox = (
                      <Checkbox
                        id="af-sel-all"
                        checked={headerSelectState}
                        disabled={
                          selectableVisibleBooks.length === 0 || isScopeAll
                        }
                        onCheckedChange={toggleAllVisible}
                        aria-label={
                          visibleSelectedCount > 0
                            ? `${visibleSelectedCount} selected`
                            : 'Select all'
                        }
                      />
                    );
                    // Suppress the tooltip in the scope "all" bucket since
                    // the checkbox is inert there.
                    if (isScopeAll) return checkbox;
                    return (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>{checkbox}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {visibleSelectedCount > 0
                            ? `${visibleSelectedCount} selected`
                            : 'Select all'}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })()}
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
                    action === 'copy' &&
                      'tw-hidden @md/filterbar:tw-inline',
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
                    onValueChange={(v) => {
                      if (!v) return;
                      setViewPresenceFilter(v as typeof viewPresenceFilter);
                      // A deliberate filter change from the user clears the
                      // current selection so it doesn't leak into a new
                      // bucket where it would make no sense. Row-button
                      // jumps bypass this because they set a preselection
                      // directly after switching the filter.
                      setSelected(new Set());
                    }}
                    className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  >
                    {(isScopeView
                      ? ([
                          { value: 'all', label: 'all' },
                          { value: 'existing', label: 'tracked' },
                          { value: 'untracked', label: 'untracked' },
                          { value: 'missing', label: 'planned' },
                        ] as const)
                      : ([
                          { value: 'all', label: 'all' },
                          { value: 'existing', label: 'existing' },
                          { value: 'missing', label: 'planned' },
                        ] as const)
                    ).map((s) => (
                      <ToggleGroupItem
                        key={s.value}
                        value={s.value}
                        className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                      >
                        {s.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
                {action === 'copy' && copySourceId && (
                  <ToggleGroup
                    type="single"
                    value={copyStateFilter}
                    onValueChange={(v) =>
                      v && setCopyStateFilter(v as typeof copyStateFilter)
                    }
                    className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  >
                    {(
                      [
                        { value: 'all', label: 'all' },
                        { value: 'missing', label: 'planned' },
                        { value: 'existing', label: 'existing' },
                      ] as const
                    ).map((s) => (
                      <ToggleGroupItem
                        key={s.value}
                        value={s.value}
                        className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                      >
                        {s.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
                {action === 'import' &&
                  (() => {
                    const picked = Object.keys(importFiles);
                    const hasMissing = picked.some(
                      (b) => !current.present.has(b),
                    );
                    const hasExisting = picked.some((b) =>
                      current.present.has(b),
                    );
                    if (!(hasMissing && hasExisting)) return undefined;
                    return (
                      <ToggleGroup
                        type="single"
                        value={importPresenceFilter}
                        onValueChange={(v) =>
                          v &&
                          setImportPresenceFilter(
                            v as typeof importPresenceFilter,
                          )
                        }
                        className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                      >
                        {(
                          [
                            { value: 'all', label: 'all' },
                            { value: 'existing', label: 'existing' },
                            { value: 'missing', label: 'planned' },
                          ] as const
                        ).map((s) => (
                          <ToggleGroupItem
                            key={s.value}
                            value={s.value}
                            className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                          >
                            {s.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    );
                  })()}
              </div>

              {action === 'view' &&
                scope &&
                (() => {
                  const registryScope = PROJECT_SCOPES[scope.id];
                  if (!registryScope.matchesScope) return undefined;
                  if (registryScope.matchesScope(scope.bookIds))
                    return undefined;
                  return (
                    <div className="tw-flex tw-items-center tw-gap-2 tw-border-b tw-px-6 tw-py-2 tw-text-xs tw-text-muted-foreground">
                      <Info
                        className="tw-h-3.5 tw-w-3.5 tw-shrink-0"
                        aria-hidden
                      />
                      <span>
                        {`Planned books don't yet satisfy "${scope.name}".`}
                      </span>
                    </div>
                  );
                })()}

              <div
                ref={listContainerRef}
                className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-3 tw-py-2"
              >
                {action === 'names' ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="tw-w-16">Book</TableHead>
                        <TableHead>Abbreviation (TOC3)</TableHead>
                        <TableHead>Short name (TOC2)</TableHead>
                        <TableHead>Long name (TOC1)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visibleBooks.map((book) => {
                        const shortName = Canon.bookIdToEnglishName(book);
                        // Prototype-only TOC values: in real consumers these
                        // would come from the project's versification/metadata.
                        const toc3 =
                          shortName.slice(0, 3).charAt(0).toUpperCase() +
                          shortName.slice(1, 3).toLowerCase();
                        const toc1 = `The Book of ${shortName}`;
                        return (
                          <TableRow key={book}>
                            <TableCell className="tw-font-medium">
                              {book}
                            </TableCell>
                            <TableCell>{toc3}</TableCell>
                            <TableCell>{shortName}</TableCell>
                            <TableCell>{toc1}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : visibleBooks.length === 0 ? (
                  <div className="tw-flex tw-min-h-40 tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-text-center tw-text-sm tw-text-muted-foreground">
                    <span>{emptyStateMessage}</span>
                    {isFilterEmptyState && (
                      <Button variant="outline" size="sm" onClick={clearActiveFilters}>
                        Clear filter
                      </Button>
                    )}
                  </div>
                ) : groupedVisibleBooks ? (
                  <div className="tw-flex tw-flex-col tw-gap-3">
                    {BOOK_CATEGORY_ORDER.map((cat) => {
                      const books = groupedVisibleBooks.get(cat) ?? [];
                      if (books.length === 0) return undefined;
                      const collapsed = collapsedCategories.has(cat);
                      return (
                        <div key={cat}>
                          <button
                            type="button"
                            onClick={() => toggleCategoryCollapsed(cat)}
                            aria-expanded={!collapsed}
                            className="tw-flex tw-w-full tw-items-center tw-gap-1 tw-px-3 tw-py-1 tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground hover:tw-text-foreground"
                          >
                            {collapsed ? (
                              <ChevronRight
                                className="tw-h-3.5 tw-w-3.5"
                                aria-hidden
                              />
                            ) : (
                              <ChevronDown
                                className="tw-h-3.5 tw-w-3.5"
                                aria-hidden
                              />
                            )}
                            <span>
                              {`${BOOK_CATEGORY_LABELS[cat]} (${books.length})`}
                            </span>
                          </button>
                          {!collapsed && (
                            <ul className="tw-flex tw-flex-col tw-gap-0.5">
                              {books.map(renderBookRow)}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <ul className="tw-flex tw-flex-col tw-gap-0.5">
                    {visibleBooks.map(renderBookRow)}
                  </ul>
                )}
              </div>

              <footer className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-border-t tw-px-6 tw-py-3">
                <span className="tw-text-xs tw-text-muted-foreground">
                  {action === 'view'
                    ? `Viewing ${project.shortName}`
                    : action === 'names'
                      ? `Names in ${project.shortName}`
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
                  {action === 'view' && isScopeView && (
                    <>
                      <Popover
                        open={addScopeOpen}
                        onOpenChange={setAddScopeOpen}
                      >
                        <Tooltip>
                          <PopoverTrigger asChild>
                            <TooltipTrigger asChild>
                              <Button variant="outline">
                                <BookPlus
                                  className="tw-mr-1.5 tw-h-4 tw-w-4"
                                  aria-hidden
                                />
                                Plan books…
                              </Button>
                            </TooltipTrigger>
                          </PopoverTrigger>
                          <TooltipContent>
                            Add new books to progress tracking
                          </TooltipContent>
                        </Tooltip>
                        <PopoverContent
                          align="end"
                          side="top"
                          className="tw-w-auto tw-p-0"
                        >
                          <BookSelectorCombobox
                            availableBookInfo={scopeAvailableBookInfo}
                            addTooltip={(count) => ({
                              title: `Add ${count} book${count === 1 ? '' : 's'} to progress tracking in ${project.shortName}`,
                              description:
                                'CAUTION: This will change progress',
                            })}
                            fitsScope={
                              scope
                                ? (b) =>
                                    doesBookFitScope(
                                      PROJECT_SCOPES[scope.id],
                                      b,
                                    )
                                : undefined
                            }
                            onAdd={async (books) => {
                              setAddScopeOpen(false);
                              await handleAddBooksToScope(books);
                              if (books.length > 0) {
                                setSelected((prev) => {
                                  const next = new Set(prev);
                                  books.forEach((b) => next.add(b));
                                  return next;
                                });
                                setPendingScrollTo(books[0]);
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      {(() => {
                        // Footer bulk buttons only appear when the filter
                        // has narrowed to a homogeneous bucket: 'untracked'
                        // shows Track, 'tracked'/'missing' (planned) shows
                        // Untrack. In the 'all' bucket per-row +/− buttons
                        // handle mutations instead.
                        const showTrack = viewPresenceFilter === 'untracked';
                        const showUntrack =
                          viewPresenceFilter === 'existing' ||
                          viewPresenceFilter === 'missing';
                        const trackDisabledHint =
                          selectedArr.length === 0
                            ? 'Select one or more untracked books'
                            : 'Select only untracked books';
                        const untrackDisabledHint =
                          selectedArr.length === 0
                            ? 'Select one or more books to untrack'
                            : 'Select only tracked or planned books';
                        return (
                          <>
                            {showTrack && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>
                                    <Button
                                      variant="outline"
                                      disabled={!trackEligible}
                                      onClick={() => {
                                        const toAdd = [...selectedArr];
                                        setSelected(new Set());
                                        handleAddBooksToScope(toAdd);
                                      }}
                                    >
                                      <Plus
                                        className="tw-mr-1.5 tw-h-4 tw-w-4"
                                        aria-hidden
                                      />
                                      Track
                                    </Button>
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div>
                                    {trackEligible
                                      ? `Add ${selectedArr.length} book${selectedArr.length === 1 ? '' : 's'} to progress tracking in ${project.shortName}`
                                      : trackDisabledHint}
                                  </div>
                                  {trackEligible && (
                                    <div className="tw-text-xs tw-text-muted-foreground">
                                      CAUTION: This will change progress
                                    </div>
                                  )}
                                </TooltipContent>
                              </Tooltip>
                            )}
                            {showUntrack && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>
                                    <Button
                                      disabled={!untrackEligible}
                                      onClick={() => {
                                        const toRemove = [...selectedArr];
                                        setSelected(new Set());
                                        handleRemoveBooksFromScope(toRemove);
                                      }}
                                    >
                                      <Minus
                                        className="tw-mr-1.5 tw-h-4 tw-w-4"
                                        aria-hidden
                                      />
                                      Untrack
                                    </Button>
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div>
                                    {untrackEligible
                                      ? `Remove ${selectedArr.length} book${selectedArr.length === 1 ? '' : 's'} from progress tracking in ${project.shortName}`
                                      : untrackDisabledHint}
                                  </div>
                                  {untrackEligible && (
                                    <div className="tw-text-xs tw-text-muted-foreground">
                                      CAUTION: This will change progress
                                    </div>
                                  )}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </>
                        );
                      })()}
                    </>
                  )}
                  {action === 'names' && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="tw-h-8 tw-w-8 tw-p-0"
                          aria-label="Scripture reference settings"
                          onClick={() =>
                            onOpenScriptureReferenceSettings(projectId)
                          }
                        >
                          <Settings2
                            className="tw-h-4 tw-w-4 tw-text-muted-foreground"
                            aria-hidden
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Scripture reference settings
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {action !== 'view' &&
                    action !== 'names' &&
                    (() => {
                      const actionButton = (
                        <Button
                          variant={action === 'delete' ? 'destructive' : 'default'}
                          disabled={!canApply}
                          onClick={apply}
                        >
                          {action === 'create' && (
                            <BookPlus
                              className="tw-mr-1.5 tw-h-4 tw-w-4"
                              aria-hidden
                            />
                          )}
                          {action === 'delete' && (
                            <Trash2 className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />
                          )}
                          {action === 'copy' && (
                            <Copy className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />
                          )}
                          {action === 'import' && (
                            <Download
                              className="tw-mr-1.5 tw-h-4 tw-w-4"
                              aria-hidden
                            />
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
                          missing.push(
                            "choose a reference project or change 'based on'",
                          );
                        if (selectedArr.length === 0)
                          missing.push(
                            action === 'import'
                              ? hasInlineFiles
                                ? 'select at least one book'
                                : 'select file(s) to import'
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
                        tooltip = `Copy from ${copySourceProject?.name ?? '…'}`;
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

export default ManageBooksDialogWithScope;
