import {
  type ReactElement,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BookPlus,
  Copy,
  Download,
  ExternalLink,
  Filter,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Label,
  SearchBar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sonner,
  sonner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Z_INDEX_OVERLAY,
} from 'platform-bible-react';
import {
  ProjectSelectorOpenTab,
  ProjectSelector,
  ProjectSelectorLocalizedStrings,
  ProjectSelectorProject,
} from 'platform-bible-react/internal';
import { ManageBooksSidebar } from './manage-books-sidebar.component';
import {
  BookGridGroupBy,
  BookGridGroupByToggle,
  BookGridItem,
  BookGridLocalizedStrings,
  BookGridSelector,
  type BookGridStatusGroup,
  toneForComparisonState,
} from './book-grid.component';
import {
  EstherTemplate,
  ManageBooksAction,
  ManageBooksComparisonState,
  ManageBooksCopyStrategy,
  ManageBooksCreateMethod,
  ManageBooksDialogBookInfo,
  ManageBooksDialogLocalizedStrings,
  ManageBooksDialogProject,
  ManageBooksImportFile,
  ManageBooksImportStrategy,
  MutationResult,
} from './manage-books-dialog.types';
import {
  computeCompareState,
  deleteConfirmVariant,
  fmtTemplate,
  versificationFallbackName,
  versificationLabelKey,
} from './manage-books-dialog.utils';
import { DeleteConfirmPrompt } from './delete-confirm-prompt.component';
import { CreatePreflightPrompt } from './create-preflight-prompt.component';
import { UsxConfirmPrompt } from './usx-confirm-prompt.component';
import { OverlapErrorPrompt } from './overlap-error-prompt.component';
import { ImportConflictPrompt } from './import-conflict-prompt.component';
import { CopyConflictPrompt } from './copy-conflict-prompt.component';

// Re-export the public types for backwards compatibility with the original cherry-pick.
export type {
  AlertEntry,
  EstherTemplate,
  ManageBooksAction,
  ManageBooksComparisonState,
  ManageBooksCopyStrategy,
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
  /*
   * NOTE: `onOpenChange` was previously part of this interface (Cancel/Close
   * footer button + close-self DOM walk). It was removed 2026-05-03 along with
   * the in-component close buttons — the dock-tab X is the canonical close
   * affordance for the web view, and sub-modal dismissals use local state
   * setters. Storybook stories now omit the prop too.
   */

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
  /**
   * Cross-launch: open project canons for this project. Optional — when omitted the corresponding
   * View-mode toolbar button renders disabled with a "Not yet available — coming soon" tooltip
   * (Phase 3 UI Decision 28, 2026-05-04).
   */
  onOpenProjectCanons?: (projectId: string) => void;
  /**
   * Cross-launch: open registry for this project. Optional — when omitted the corresponding
   * View-mode toolbar button renders disabled with a "Not yet available — coming soon" tooltip
   * (Phase 3 UI Decision 28, 2026-05-04).
   */
  onOpenRegistry?: (projectId: string) => void;

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

  /**
   * Commit a Copy-books operation.
   *
   * `strategy` mirrors the Import flow's `replaceEntireBooks` / `nonExistingChapters` choice (see
   * Vladimir review #16 — Copy now surfaces the same three-button conflict prompt as Import).
   * `strategy` is `undefined` when no conflict prompt was shown (the picked books did not exist in
   * the destination, so the question never came up). Wiring layers should treat `undefined` as
   * "destination had nothing in the way — write through".
   */
  onCopyBooks: (args: {
    destProjectId: string;
    sourceProjectId: string;
    books: string[];
    strategy?: ManageBooksCopyStrategy;
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
   * (A2) Whether the project is shared with other users (PT9: `ScrText.IsProjectShared` with more
   * than one registered user). When true, the delete-confirm prompt warns that the books will be
   * deleted for all users when they next Send/Receive — in both the partial and the all-books
   * variants. Defaults to false.
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
   *
   * Entries may optionally carry `isEditable` (sourced from `ProjectSummary.IsEditable`). When
   * supplied, the dialog uses it as a fast-path for the read-only-target gating decision so the
   * Create / Copy / Import / Delete sections lock immediately on project switch even before the
   * dialog's slower internal `projects` fetch (which does extra per-project pdp.getSetting calls)
   * has caught up. Sebastian UX review item 6 (2026-06-12).
   */
  sidebarProjects?: readonly (ProjectSelectorProject & { isEditable?: boolean })[];

  /**
   * Currently-open project-bound tabs across the app. Forwarded straight through to the sidebar
   * `<ProjectSelector openTabs={…}>` so the popover's "Open Tabs" grouping section reflects actual
   * app state. The wiring layer typically supplies this via `useOpenProjectTabs`. Empty array (the
   * default) is fine — the section just won't render.
   */
  openTabs?: readonly ProjectSelectorOpenTab[];

  /**
   * Localized strings for the popover internals of every `<ProjectSelector>` inside the dialog
   * (sidebar / Copy "From" / Create "Based on"). Optional — each picker falls back to
   * ProjectSelector's English defaults when omitted, but the wiring layer typically passes a
   * fully-populated object sourced from `manageBooks_projectSelector_*` localize keys.
   */
  projectSelectorLocalizedStrings?: ProjectSelectorLocalizedStrings;
};

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

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

/**
 * Reads the text contents of a picked file when it is a real `File` / `Blob` (browser-native picker
 * or `onPickImportFiles` returning `File[]`). Returns `undefined` for plain `{name}` shapes
 * (Storybook decorators) or when the underlying `text()` call rejects (e.g. permission denied, file
 * deleted between pick and read). The undefined branch lets the wiring layer skip / report the
 * entry as a per-file ENCODING_ERROR rather than crashing the import.
 */
async function readFileTextIfAvailable(
  picked: File | { name: string },
): Promise<string | undefined> {
  // `File extends Blob` exposes `.text()`; story-shape objects do not. The structural narrowing
  // `'text' in picked` would itself be `as`-equivalent here, so we use the union-type discriminant
  // (presence of `.text` as a function on `File`) which TypeScript narrows safely.
  if ('text' in picked && typeof picked.text === 'function') {
    try {
      return await picked.text();
    } catch {
      return undefined;
    }
  }
  return undefined;
}

/** Narrow runtime check for a create-method dropdown value. */
const isCreateMethod = (v: string): v is ManageBooksCreateMethod =>
  v === 'empty' || v === 'chapterVerse' || v === 'fromTemplate';

type ViewPresenceFilter = 'all' | 'new' | 'existing';

/**
 * A3: minimum on-screen lifetime of the spinner / disabled-buttons state, in milliseconds. PAPI
 * mutations frequently complete in well under 100 ms when called against a local data provider;
 * without a floor, the spinner and mid-mutation button-disabled affordances would flicker for a
 * single render frame and never be perceptible to either users (UX problem) or assistive tech / e2e
 * tests asserting the contract (testability problem). The 1500 ms floor sits comfortably above the
 * 500 ms perceptual flicker threshold (Nielsen 1993) and is wide enough that sequential Playwright
 * assertions (e.g. assert apply disabled, then assert cancel disabled) both land inside the same
 * disabled-window even with the back-to-back polling and locator-resolution overhead Electron + CDP
 * introduces. Co-locates with runCreate/runDelete/runCopy/runImport so all four paths get the same
 * treatment.
 */
const MIN_SUBMITTING_VISIBLE_MS = 1500;

/**
 * Tooltip wrapper for a disabled "stub" button (View-mode cross-launches whose target action is not
 * yet wired up). Renders an sr-only hint span (referenced by the disabled button's
 * `aria-describedby`) plus a hover-tooltip wrapping the button. Three near-identical instances
 * collapsed into one helper to keep the View-mode JSX scannable.
 *
 * The disabled `<Button>` itself does not accept pointer events, so the tooltip needs an
 * intermediate `<span>` as the `TooltipTrigger` target — Radix Tooltip's standard pattern.
 */
function DisabledStubButtonTooltip({
  hintId,
  tooltipText,
  children,
}: {
  hintId: string;
  tooltipText: string;
  children: ReactElement;
}) {
  return (
    <>
      <span id={hintId} className="tw:sr-only">
        {tooltipText}
      </span>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{children}</span>
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
    </>
  );
}

// Sebastian review item 8 (2026-05-06): the Copy-mode comparison-state filter (New/Newer/Older/
// Same/Undetermined) was removed entirely — the New/Newer/Older/Same options didn't actually
// filter anything (the chip selection was decorative without a backing state-set), and the
// All/Undetermined options were equivalent. Per Sebastian's verdict the simplest fix is to drop
// the affordance until comparison-state filtering is genuinely needed; the per-book status
// labels and badges already give users the same information at a glance.

/**
 * Presence-filter dropdown shared by View and Import modes. Replaces the chip rows that used to sit
 * in the filter bar (per Sebastian review item 8, 2026-05-06): the trigger is a Filter-icon Button
 * that opens a `<DropdownMenuRadioGroup>` of the three presence states (All / New / Existing). The
 * trigger picks up an accent background when a non-`all` filter is active so the affordance still
 * reads as "filter applied" without a chip row.
 *
 * E2E tests use `data-testid` on each radio item — preserve the existing tokens
 * (`presence-filter-{all|new|existing}` and `import-presence-filter-{…}`) so the tests just need to
 * open the trigger first and then click the same item.
 */
type PresenceFilterMenuProps = {
  testIdPrefix: 'presence-filter' | 'import-presence-filter';
  value: ViewPresenceFilter;
  onValueChange: (next: ViewPresenceFilter) => void;
  ariaLabel: string;
  menuLabel: string;
  presenceFilterLabel: (s: ViewPresenceFilter) => string;
};
function PresenceFilterMenu({
  testIdPrefix,
  value,
  onValueChange,
  ariaLabel,
  menuLabel,
  presenceFilterLabel,
}: PresenceFilterMenuProps) {
  const isFilterActive = value !== 'all';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'tw:ml-auto tw:h-8 tw:w-8 tw:shrink-0 tw:p-0',
            isFilterActive &&
              'tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent',
          )}
          aria-label={ariaLabel}
          aria-pressed={isFilterActive}
          title={ariaLabel}
          data-testid={`${testIdPrefix}-trigger`}
          data-active={isFilterActive ? 'true' : 'false'}
        >
          <Filter className="tw:h-4 tw:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="tw:w-44" style={{ zIndex: Z_INDEX_OVERLAY }}>
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => {
            if (v === 'all' || v === 'new' || v === 'existing') onValueChange(v);
          }}
        >
          {(['all', 'new', 'existing'] as const).map((s) => (
            // Default `onSelect` behavior closes the dropdown after a radio pick — that's what
            // we want here (single-select). PS's `FilterMenu` uses `event.preventDefault()`
            // because its checkboxes allow multi-toggle without re-opening; that doesn't apply
            // to a radio group.
            <DropdownMenuRadioItem key={s} value={s} data-testid={`${testIdPrefix}-${s}`}>
              {presenceFilterLabel(s)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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

/**
 * Unified Manage Books dialog for create / delete / copy / import / view of project books, plus a
 * View action toggle that surfaces the project's current book inventory. The dialog is
 * presentational: callers wire `loadBooks`, `loadProjects`, `loadVersification`, and the four
 * `onCreateBooks` / `onDeleteBooks` / `onCopyBooks` / `onImportBooks` handlers to PAPI in the
 * extension layer. See `manage-books-dialog.types.ts` for the full props contract and the FN-008
 * spec in `.context/features/manage-books/` for behavior catalog references.
 */
/**
 * JS-driven responsive collapse flag: observes the ref'd element's width and flips when it crosses
 * the 28rem (448px) breakpoint. Used instead of Tailwind container queries because `@md/...:`
 * variants are not emitted into the webview bundle (only the `@container` declaration survives the
 * extension's Tailwind build — verified at runtime 2026-06-12).
 *
 * React refs are typed `RefObject<HTMLDivElement | null>` (null is the canonical initial value for
 * DOM refs).
 */
function useIsNarrow(ref: RefObject<HTMLDivElement | null>, open: boolean): boolean {
  const NARROW_BREAKPOINT_PX = 448;
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const next = el.getBoundingClientRect().width < NARROW_BREAKPOINT_PX;
      setIsNarrow((prev) => (prev === next ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, open]);
  return isNarrow;
}

export function ManageBooksDialog({
  open,
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
  openTabs,
  projectSelectorLocalizedStrings,
}: ManageBooksDialogProps) {
  const allBooks = useMemo(() => bookIds ?? DEFAULT_BOOK_IDS, [bookIds]);

  // Dialog-root collapse drives the sidebar icon-rail + header subtitle; the
  // filter-bar flag drives the count span. Same hook, two containers.
  // eslint-disable-next-line no-null/no-null
  const dialogRootRef = useRef<HTMLDivElement | null>(null);
  const dialogIsNarrow = useIsNarrow(dialogRootRef, open);
  // null is the canonical initial value for React DOM refs.
  // eslint-disable-next-line no-null/no-null
  const filterBarRef = useRef<HTMLDivElement | null>(null);
  const filterBarIsNarrow = useIsNarrow(filterBarRef, open);

  const t = useCallback(
    (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) =>
      localizedStrings[key] ?? fallback,
    [localizedStrings],
  );

  const liveRegionId = useId();
  const cvDisabledHintId = useId();
  const applyDisabledHintId = useId();
  const projectCanonsDisabledHintId = useId();
  const registryDisabledHintId = useId();
  const viewDiffDisabledHintId = useId();

  // -- Loaded data ---------------------------------------------------------
  const [projects, setProjects] = useState<ManageBooksDialogProject[]>([]);
  // Sebastian UX review item 1 (2026-06-12): track whether the initial
  // `loadProjects` fetch has completed at least once. Used to drive the
  // project-trigger disabled state and the right-pane skeleton placeholder
  // so the user doesn't see the projectId GUID render in the header subtitle
  // ("random number" — the fallback projectDisplayName) or a half-rendered
  // body before the project list has resolved.
  const [hasLoadedProjects, setHasLoadedProjects] = useState(false);
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
    if (!open) {
      setHasLoadedProjects(false);
      return;
    }
    Promise.resolve(loadProjects())
      .then((next) => {
        setProjects(next);
        setHasLoadedProjects(true);
        return undefined;
      })
      .catch(() => {
        // Mark as loaded even on failure so the UI stops blocking on a fetch
        // that will never resolve; the user sees the empty-projects body
        // rather than an indefinite skeleton.
        setHasLoadedProjects(true);
      });
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
  // Default Create method is "Create based on" (FromTemplate). Per Sebastian item 11 (2026-05-06)
  // the prompt copy now reads "Create based on" rather than "Based on", and the most useful default
  // for users is to start by picking a reference project; they can switch to Empty or
  // ChapterAndVerse if they prefer.
  const [createMethod, setCreateMethod] = useState<ManageBooksCreateMethod>('fromTemplate');
  const [createReferenceId, setCreateReferenceId] = useState<string | undefined>(undefined);
  const [importFiles, setImportFiles] = useState<Record<string, ManageBooksImportFile>>({});
  const [importConflict, setImportConflict] = useState<
    | {
        books: string[];
        existing: string[];
      }
    | undefined
  >(undefined);
  // Copy overwrite-confirm — Sebastian #16. Without this, Copy with mixed existence silently
  // overwrites the books that already exist in the destination project.
  const [copyConfirm, setCopyConfirm] = useState<
    | {
        books: string[];
        existing: string[];
        sourceId: string;
      }
    | undefined
  >(undefined);
  const [usxConfirm, setUsxConfirm] = useState<{ files: string[] } | undefined>(undefined);
  const [overlapError, setOverlapError] = useState<
    { book: string; existingFile: string; newFile: string } | undefined
  >(undefined);
  const [importPresenceFilter, setImportPresenceFilter] = useState<ViewPresenceFilter>('all');
  const [viewPresenceFilter, setViewPresenceFilter] = useState<ViewPresenceFilter>('all');
  // BookGridSelector grouping state. Initial mount defaults to canon grouping
  // (the dialog opens in View mode where "OT / NT / DC" reads naturally). Per
  // Sebastian item 10 (2026-05-06) the user's choice is preserved across
  // workflow switches so changing modes doesn't undo their grouping preference.
  const [gridGroupBy, setGridGroupBy] = useState<BookGridGroupBy>('canon');
  // Using null for React ref compatibility
  // eslint-disable-next-line no-null/no-null
  const importFileInputRef = useRef<HTMLInputElement>(null);

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
  // Sebastian UX review item 6 (2026-06-12): the gating decision used to read
  // `isEditable` only from the dialog's slower internal `projects` array
  // (loaded via the `loadProjects` prop, which awaits two pdp.getSetting
  // calls per project for display names). When the user switched projects
  // before that fetch finished — easy to do because `sidebarProjects` arrives
  // much faster — `projects.find` returned undefined and the fallback's
  // `isEditable` was undefined, so the sidebar treated the project as
  // potentially editable and kept Create / Copy / Import / Delete enabled.
  //
  // We now consult the sidebar list first (which carries `isEditable` from
  // the wire) and treat its value as authoritative for the gating decision.
  // The full `projects` entry, if available, still wins because it carries
  // every field the dialog body needs; sidebarProjects is the fast fallback.
  const sidebarProjectForGating = useMemo(
    () => sidebarProjects.find((p) => p.id === projectId),
    [sidebarProjects, projectId],
  );
  const fallbackProject: ManageBooksDialogProject = {
    id: projectId,
    shortName: sidebarProjectForGating?.shortName ?? projectId,
    name: sidebarProjectForGating?.shortName ?? projectId,
    fullName: sidebarProjectForGating?.fullName,
    isEditable: sidebarProjectForGating?.isEditable,
  };
  const project = projects.find((p) => p.id === projectId) ?? fallbackProject;
  const otherProjects = projects.filter((p) => p.id !== projectId);
  // The Copy "From" and Create "Based on" pickers are <ProjectSelector mode="project">, which
  // takes a `ProjectSelectorProject` shape (`{ id, shortName, fullName }`). Map the dialog's
  // `ManageBooksDialogProject` to that shape — `p.fullName` (sourced from `platform.fullName`
  // upstream) becomes the secondary label, falling back to `shortName` when no fullName is
  // configured. The target project itself is filtered out (already done in `otherProjects`).
  // Sebastian UX new-requirement 4 (2026-06-12): commentaries are excluded
  // from both the Copy "From" and Create "Based on" pickers — neither flow
  // benefits from sourcing/referencing a commentary. The flag is set in the
  // wiring layer's `loadProjects` from `ProjectSummary.ProjectType ===
  // 'CommentaryResource'`.
  //
  // Sebastian UX new-requirement 3 (2026-06-12): the picker is also enriched
  // with versification id + localized name so the consumer can opt into
  // versification-grouping (Create "Based on" does; Copy "From" leaves it
  // off). The name resolution lives here on the dialog side because we own
  // the `t()` + `versificationLabelKey` map.
  const allOtherProjectsAsPS = useMemo<ProjectSelectorProject[]>(
    () =>
      otherProjects
        .filter((p) => !p.isCommentary)
        .map((p) => ({
          id: p.id,
          shortName: p.shortName,
          fullName: p.fullName ?? p.shortName,
          versificationId: p.versificationId,
          versificationName: p.versificationId
            ? t(
                versificationLabelKey(p.versificationId),
                versificationFallbackName(p.versificationId),
              )
            : undefined,
        })),
    [otherProjects, t],
  );
  // The Copy "From" picker excludes resources for licensing reasons — copying
  // text OUT of a published resource into a project is not permitted (PT9
  // parity: CopyBooksForm only lists IsNonProtectedText() sources). Read-only
  // non-resource projects remain valid copy sources.
  //
  // The Create "Based on" picker deliberately INCLUDES resources: it only
  // reads the reference's book/chapter structure to scaffold empty books, no
  // text is copied (PT9 parity: CreateBooksForm's model combobox lists all
  // accessible scripture texts including resources; Manila UX follow-up
  // confirmed this).
  const copyFromProjectsAsPS = useMemo<ProjectSelectorProject[]>(
    () =>
      otherProjects
        .filter((p) => !p.isResource && !p.isCommentary)
        .map((p) => ({
          id: p.id,
          shortName: p.shortName,
          fullName: p.fullName ?? p.shortName,
        })),
    [otherProjects],
  );
  const copySourceProject = copySourceId ? projects.find((p) => p.id === copySourceId) : undefined;
  const createReferenceProject = createReferenceId
    ? projects.find((p) => p.id === createReferenceId)
    : undefined;

  const current = useMemo<ProjectBookState>(
    () => toProjectBookState(booksByProjectId[projectId]),
    [booksByProjectId, projectId],
  );
  // Both pickers below stay undefined until the picked project's books have
  // actually LOADED (booksByProjectId[id] set — an empty array means "loaded,
  // no books"). toProjectBookState(undefined) would yield a truthy empty
  // state, which made the Sebastian-item-27 prune effect below fire in the
  // load gap right after picking a reference and wipe the user's entire
  // selection (and made every pill briefly render as not-in-reference
  // disabled). The copy-source picker gets the same guard so the A7
  // selection-seed effect can't churn on an empty universe during its load
  // gap.
  const copySource = useMemo<ProjectBookState | undefined>(
    () =>
      copySourceId && booksByProjectId[copySourceId]
        ? toProjectBookState(booksByProjectId[copySourceId])
        : undefined,
    [copySourceId, booksByProjectId],
  );
  const createReferenceBookState = useMemo<ProjectBookState | undefined>(
    () =>
      createReferenceId && booksByProjectId[createReferenceId]
        ? toProjectBookState(booksByProjectId[createReferenceId])
        : undefined,
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

  // Reset per-action filters when the action changes. Per Sebastian item 10
  // (2026-05-06) the gridGroupBy preference is intentionally NOT reset — the
  // user's grouping choice persists across workflow switches.
  useEffect(() => {
    setImportPresenceFilter('all');
    setViewPresenceFilter('all');
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

  // Read-only target → bounce mutating actions back to "view". The sidebar already disables the
  // four mutating sections, but if the user is mid-flow (e.g. on Create) and switches to a
  // read-only project, we redirect them to "view" so the body doesn't sit in a state the user
  // can no longer apply.
  useEffect(() => {
    if (project.isEditable === false && action !== 'view') {
      setAction('view');
    }
  }, [project.isEditable, action]);

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
        // Sebastian review item 22 (2026-05-06): Import mode starts empty and only shows books
        // the user has actually attached files for. As `runImport` removes successfully-imported
        // entries from `importFiles`, the grid shrinks too — books vanish on success without
        // needing any extra clean-up. Sort by canonical book number so multi-file picks render
        // in the same order as the OT/NT/DC sections.
        return Object.keys(importFiles).sort(
          (a, b) => Canon.bookIdToNumber(a) - Canon.bookIdToNumber(b),
        );
      default:
        return [];
    }
  }, [action, allBooks, current, copySource, importFiles]);

  // Per Sebastian review item 27 (2026-05-06): when the user picks a different
  // reference project (or clears it / changes createMethod), prune any books from
  // the current Create selection that are NOT in the new reference project's book
  // set. Without this, switching reference projects could leave a stale selection
  // that the grid renders as disabled while the footer still counts them as
  // selected — the user would see a phantom selection count and the apply button
  // would submit books the orchestrator can't template.
  useEffect(() => {
    if (action !== 'create') return;
    if (createMethod !== 'fromTemplate') return;
    if (!createReferenceBookState) return;
    setSelectionsByAction((prev) => {
      const currentSelection = prev.create;
      if (!currentSelection || currentSelection.size === 0) return prev;
      const filtered = new Set<string>();
      let changed = false;
      currentSelection.forEach((b) => {
        if (createReferenceBookState.present.has(b)) {
          filtered.add(b);
        } else {
          changed = true;
        }
      });
      if (!changed) return prev;
      return { ...prev, create: filtered };
    });
  }, [action, createMethod, createReferenceBookState]);

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

  // Sebastian UX review item 11 (2026-06-12): book-id detection must rely on
  // the `\id` marker in the file content, not the filename. A filename like
  // `38ZECCUNP89T.SFM` contains "ECC" before "ZEC", so the old filename-only
  // substring scan misidentified the book. We now read the first `\id`
  // marker and only fall back to a filename match when the content is missing
  // or carries no usable id (story decorators / unreadable files).
  const detectBookId = useCallback(
    (filename: string, content?: string): string | undefined => {
      if (content) {
        const idMatch = content.match(/^\s*\\id\s+([A-Za-z0-9]{2,4})/m);
        if (idMatch) {
          const candidate = idMatch[1].toUpperCase();
          if (allBooks.includes(candidate)) return candidate;
        }
      }
      const upper = filename.toUpperCase();
      return allBooks.find((b) => upper.includes(b));
    },
    [allBooks],
  );

  /**
   * (A10) Ingest a list of picked files into the import grid. Detects the book ID per file,
   * surfaces unmatched files via a sonner warning, and rejects the addition with an in-dialog
   * validation error if two files map to the same book.
   *
   * When the picked entries are real `File` objects (browser native picker or `onPickImportFiles`
   * returning `File[]`), the file's text contents are read via `File.text()` and stored alongside
   * the display name on the resulting `ManageBooksImportFile`. The wiring layer forwards `content`
   * to the C# `importBooks` orchestrator (`ImportFileEntry.content` per data-contracts.md §2.5).
   * Story decorators that pass plain `{name}` objects still work — the resulting entries simply
   * omit `content`, which the wiring layer treats as an empty file.
   */
  const ingestImportFiles = useCallback(
    async (picked: ReadonlyArray<File | { name: string }>): Promise<{ addedBooks: string[] }> => {
      const emptyResult: { addedBooks: string[] } = { addedBooks: [] };
      if (picked.length === 0) return emptyResult;
      // Pre-read each picked file's text contents in parallel. A failure to read (e.g. permission
      // denied, race with file deletion) yields `undefined` so the entry still appears in the grid
      // but with no content; the wiring layer's wire call surfaces the empty content as an
      // "ENCODING_ERROR" / "MISSING_ID_LINE" via the orchestrator's per-file error path rather
      // than crashing.
      const contents = await Promise.all(picked.map(readFileTextIfAvailable));
      const additions: Record<string, ManageBooksImportFile> = {};
      const addedBooks: string[] = [];
      const unmatched: string[] = [];
      const usxFiles: string[] = [];
      // A10: guard against two files mapping to the same book within this batch.
      const seenInBatch: Record<string, string> = {};
      let aborted = false;
      picked.forEach((f, idx) => {
        if (aborted) return;
        const book = detectBookId(f.name, contents[idx]);
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
        // Sebastian UX review item 9 (2026-06-12): the import grid must show
        // the file's last-modified date so the newer/older comparison reflects
        // the real source date. `File.lastModified` is always populated for
        // real File objects coming from the browser picker or
        // `onPickImportFiles`; story decorators that pass `{name}` shapes
        // still get a date but without `lastModified` it would always read 0
        // — for those we keep `todayISO()` to avoid an epoch-zero "1970"
        // pill in the grid, but production paths never hit that branch.
        const lastModified =
          'lastModified' in f && typeof f.lastModified === 'number' ? f.lastModified : undefined;
        const date =
          lastModified !== undefined
            ? new Date(lastModified).toISOString().slice(0, 10)
            : todayISO();
        additions[book] = { file: f.name, date, content: contents[idx] };
        addedBooks.push(book);
        if (isUsxFileName(f.name)) usxFiles.push(f.name);
      });
      if (aborted) return emptyResult;
      if (unmatched.length > 0) {
        sonner.warning(
          unmatched.length === 1
            ? fmtTemplate(
                t('%manageBooks_import_unmatchedOne%', 'Could not detect a matching book in "{0}"'),
                unmatched[0],
              )
            : fmtTemplate(
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
    // Fire-and-forget: ingestImportFiles's async work is internally tracked via setImportFiles;
    // callers don't need to await here.
    ingestImportFiles(Array.from(picked)).catch(() => undefined);
  };

  const triggerFileBrowser = useCallback(async (): Promise<{ pickedAny: boolean }> => {
    if (onPickImportFiles) {
      const files = await onPickImportFiles();
      if (!files || files.length === 0) return { pickedAny: false };
      const { addedBooks } = await ingestImportFiles(files);
      return { pickedAny: addedBooks.length > 0 };
    }
    importFileInputRef.current?.click();
    // We can't easily await the native picker; treat this as "pickedAny=undefined".
    return { pickedAny: true };
  }, [ingestImportFiles, onPickImportFiles]);

  // Per Sebastian review item 23 (2026-05-06): auto-browse on Import-mode entry was reversed.
  // The file picker now opens only when the user explicitly clicks the "Choose files…" /
  // "Add files…" button (rendered around line 1759-1768). Decision A8's "auto-browse on entry"
  // behavior is superseded — the prior `useEffect` that called `triggerFileBrowser()` and the
  // `importAutoBrowseFired` ref have both been removed.

  const filterTerm = filter.trim().toLowerCase();

  const actionFilteredBooks = useMemo<string[]>(() => {
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
  }, [action, universe, current, importPresenceFilter, viewPresenceFilter]);

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

  // Belt-and-suspenders: the `project.isEditable === false` redirect above
  // switches to `view` when the target becomes read-only, but the state
  // update has a render-frame gap. Block apply explicitly so the orchestrator
  // is never invoked on a read-only target, even mid-redirect. Sidebar
  // disablement covers entry; this covers the dialog body's submit path.
  const canApply =
    action !== 'view' &&
    selectedArr.length > 0 &&
    project.isEditable !== false &&
    (action !== 'copy' || !!copySourceId) &&
    !(action === 'create' && createMethod === 'fromTemplate' && !createReferenceId) &&
    !isSubmitting;

  // -- Mutations -----------------------------------------------------------

  // Theme C1: dispatch a thrown-mutation error as a single-error MutationResult
  // so the wiring layer's toast surface can render it consistently with the
  // orchestrator-returned warnings/errors. Using a helper keeps the four
  // run* paths uniform.
  //
  // `String(e)` as the non-Error fallback renders `"[object Object]"` when
  // the backend rejects with a structured object (typical for PAPI / JSON-RPC
  // rejections — the C# data provider doesn't throw Error instances). Extract
  // a sensible message from common rejection shapes before falling back to
  // JSON stringification.
  const extractErrorMessage = (e: unknown): string => {
    if (e instanceof Error) return e.message;
    if (typeof e === 'string') return e;
    if (e && typeof e === 'object') {
      // Use `in` narrowing rather than type assertions; this preserves
      // type-safety while letting us probe common JSON-RPC / PAPI rejection
      // shapes ({ message }, { error: { message } }, { data: { text|message } }).
      if ('message' in e && typeof e.message === 'string') return e.message;
      if (
        'error' in e &&
        e.error &&
        typeof e.error === 'object' &&
        'message' in e.error &&
        typeof e.error.message === 'string'
      ) {
        return e.error.message;
      }
      if ('data' in e && e.data && typeof e.data === 'object') {
        if ('text' in e.data && typeof e.data.text === 'string') return e.data.text;
        if ('message' in e.data && typeof e.data.message === 'string') return e.data.message;
      }
      // Last-resort: JSON stringify; never let "[object Object]" leak through.
      try {
        return JSON.stringify(e);
      } catch {
        // circular ref or BigInt — fall through to generic
      }
    }
    return t('%manageBooks_genericError%', 'An unexpected error occurred.');
  };

  const emitThrownError = (e: unknown) => {
    emitResult({
      success: false,
      warnings: [],
      errors: [
        {
          level: 'error',
          caption: '',
          text: extractErrorMessage(e),
        },
      ],
    });
  };

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
      // Sebastian review item 26 (2026-05-06, FE half): re-fetch the project's current book set
      // before issuing the delete. If another tab/process has deleted some of the user's selected
      // books since the dialog last loaded, those books are now absent from the destination — the
      // C# `DeleteBooksOrchestrator` would either no-op or surface a confusing error per book. We
      // intersect the user's selection with the freshly-loaded inventory and continue with only
      // the still-present subset; the dropped books are reported back to the user via a toast so
      // they understand why the count shrank. The backend's AlertCapture wrap (BE half of #26)
      // remains a separate PR.
      const fresh = await Promise.resolve(loadBooks(projectId));
      setBooksByProjectId((prev) => ({ ...prev, [projectId]: fresh }));
      const freshPresent = new Set(fresh.map((b) => b.id));
      const stillPresent = books.filter((b) => freshPresent.has(b));
      const alreadyGone = books.filter((b) => !freshPresent.has(b));
      if (alreadyGone.length > 0) {
        sonner.warning(
          fmtTemplate(
            t(
              '%manageBooks_delete_alreadyDeletedWarning%',
              '{0} of the selected books have already been deleted in another window. Skipping them.',
            ),
            alreadyGone.length,
          ),
          { description: alreadyGone.join(', '), duration: 6000, closeButton: true },
        );
      }
      if (stillPresent.length === 0) {
        // Everything the user selected has already been deleted elsewhere — nothing left for
        // `onDeleteBooks` to do. Drop the selection (so the empty grid is reflected in the footer)
        // and bail before the orchestrator call.
        setSelected(new Set());
        return;
      }
      const raw = await Promise.resolve(onDeleteBooks({ projectId, books: stillPresent }));
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

  const runCopy = async (books: string[], sourceId: string, strategy?: ManageBooksCopyStrategy) => {
    if (books.length === 0) return;
    setIsSubmitting(true);
    const minDisplay = minDelay(MIN_SUBMITTING_VISIBLE_MS);
    try {
      const raw = await Promise.resolve(
        onCopyBooks({
          destProjectId: projectId,
          sourceProjectId: sourceId,
          books,
          strategy,
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
        // Sebastian UX new-requirement 2 (2026-06-12): the prompt body must
        // show the localized versification NAME (e.g. "English", "Vulgate"),
        // not the numeric ScrVersType id (e.g. "0", "4"). Resolve here so the
        // prompt component stays presentational.
        setCreatePrompt({
          kind: 'versification',
          destVrs: t(versificationLabelKey(destVrs), versificationFallbackName(destVrs)),
          modelVrs: t(versificationLabelKey(modelVrs), versificationFallbackName(modelVrs)),
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
      case 'copy': {
        if (!copySourceId) break;
        // Sebastian #16: gate Copy with an overwrite-confirm prompt when the selection contains
        // books that already exist in the destination project. Mixed-existence selections used to
        // silently overwrite — now the user has to confirm.
        const existing = selectedArr.filter((b) => current.present.has(b));
        if (existing.length > 0) {
          setCopyConfirm({ books: selectedArr, existing, sourceId: copySourceId });
          break;
        }
        runCopy(selectedArr, copySourceId).catch(() => undefined);
        break;
      }
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

  // Vladimir review item 21 (2026-05-06): the subtitle was rewritten from
  // "{count} of {88} canonical books in {short} ({vrs})" to "{count} books in {full} ⋅ {vrs name}
  // Versification". The new copy reports the absolute number of books currently in the project
  // (not capped to canonical) so users with deuterocanonical or extra books see them counted.
  const totalPresent = current.present.size;

  // Vladimir review item 21 (2026-05-06): the subtitle now reads
  // "{count} books in {full project name} ⋅ {versification name} Versification". The
  // versification name is resolved from the numeric `ScrVersType` enum (which `loadVersification`
  // returns as a string) via `versificationLabelKey` + `t()`. The trailing literal " Versification"
  // is part of the template, not the localized name (the names are bare — "English", "Vulgate",
  // …). Falls back to the no-versification template when the versification setting is absent.
  // Project label prefers `fullName` (the project's `platform.fullName` setting) and falls back to
  // `shortName` so the subtitle reads naturally for both fully-configured and bare-bones projects.
  const projectDisplayName = project.fullName ?? project.shortName;
  const subtitleTemplate = versification
    ? t('%manageBooks_header_subtitle%', '{0} books in {1} ⋅ {2} Versification')
    : t('%manageBooks_header_subtitleNoVersification%', '{0} books in {1}');
  const versificationName = versification
    ? t(versificationLabelKey(versification), versificationFallbackName(versification))
    : '';
  const headerSubtitle = versification
    ? fmtTemplate(subtitleTemplate, totalPresent, projectDisplayName, versificationName)
    : fmtTemplate(subtitleTemplate, totalPresent, projectDisplayName);

  // Sebastian UX new-requirement 1 (2026-06-12): the right-pane headline now
  // tracks the active section ("Show books", "Create books", …) instead of the
  // static "Manage books". We reuse the existing sidebar localized labels —
  // they're already translated and exactly match the desired text, so no new
  // localize keys are needed.
  const headerTitle = (() => {
    switch (action) {
      case 'create':
        return t('%manageBooks_sidebar_create_label%', 'Create books');
      case 'copy':
        return t('%manageBooks_sidebar_copy_label%', 'Copy books');
      case 'import':
        return t('%manageBooks_sidebar_import_label%', 'Import books');
      case 'delete':
        return t('%manageBooks_sidebar_delete_label%', 'Delete books');
      case 'view':
      default:
        return t('%manageBooks_sidebar_show_label%', 'Show books');
    }
  })();

  // Per Sebastian review item 8 (2026-05-06): only the All/New/Existing presence-filter labels
  // are used now that the Copy comparison-state filter has been removed. The remaining
  // newer/older/same/undetermined chip-label localized strings are still consumed by the per-row
  // status section headers in the BookGrid (see `gridItems` above) — leave them in
  // localizedStrings.json untouched.
  // Filter dropdown labels align with the grid's group-header strings — "Not
  // in project" / "In project" rather than "New" / "Existing". The
  // new/newer/older/same labels for Copy/Import slot in here once the
  // status-comparison backend is in place.
  const presenceFilterLabel = (s: ViewPresenceFilter): string => {
    switch (s) {
      case 'all':
        return t('%manageBooks_filter_state_all%', 'All');
      case 'new':
        return t('%manageBooks_grid_statusGroup_notInProject%', 'Not in project');
      case 'existing':
      default:
        return t('%manageBooks_grid_statusGroup_inProject%', 'In project');
    }
  };

  const isFilterEmptyState =
    visibleBooks.length === 0 &&
    universe.length > 0 &&
    !(action === 'copy' && !copySourceId) &&
    action !== 'import';
  const emptyStateMessage = (() => {
    if (action === 'copy' && !copySourceId)
      return t(
        '%manageBooks_copy_emptyState_chooseSource%',
        'Choose a source project to see books available to copy.',
      );
    // Sebastian review item 22 (2026-05-06): Import mode renders an empty grid until the user
    // attaches files. The "Add files…" / "Choose files…" affordance lives in the per-action
    // header just above; this empty-state message gives the otherwise-blank grid area a hint.
    if (action === 'import' && universe.length === 0) {
      return t('%manageBooks_import_emptyState_addFiles%', 'Add files to begin importing.');
    }
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

    // Map a (compareState, present) tuple to the locale-stable group key + display label pair.
    // Used by both copy and import branches so the two paths can't drift.
    const compStateToGroup = (
      compState: ManageBooksComparisonState,
      isPresent: boolean,
    ): { key: BookGridStatusGroup; label: string } => {
      switch (compState) {
        case 'sourceIsNewer':
          return { key: 'newer', label: newerLabel };
        case 'sourceIsOlder':
          return { key: 'older', label: olderLabel };
        case 'destDoesNotExist':
          return { key: 'new', label: newLabel };
        case 'filesAreSame':
          return { key: 'same', label: sameLabel };
        default:
          // sourceDoesNotExist / undetermined keep the present/absent label.
          return isPresent
            ? { key: 'inProject', label: inProjectLabel }
            : { key: 'notInProject', label: notInProjectLabel };
      }
    };

    return visibleBooks.map<BookGridItem>((book) => {
      const present = current.present.has(book);
      const destDate = current.dates[book];
      let tone: BookGridItem['tone'] = 'neutral';
      let statusGroupKey: BookGridStatusGroup = present ? 'inProject' : 'notInProject';
      let statusLabel: string = present ? inProjectLabel : notInProjectLabel;
      let primaryDate: string | undefined;
      let secondaryDate: string | undefined;

      if (action === 'copy' && copySource) {
        const sourceDate = copySource.dates[book];
        const compState = computeCompareState(sourceDate, present ? destDate : undefined);
        const t1 = toneForComparisonState(compState);
        if (t1 !== 'hidden') tone = t1;
        const group = compStateToGroup(compState, present);
        statusGroupKey = group.key;
        statusLabel = group.label;
        primaryDate = present ? destDate : undefined;
        secondaryDate = sourceDate;
      } else if (action === 'import') {
        const pick = importFiles[book];
        if (pick) {
          const compState = computeCompareState(pick.date, present ? destDate : undefined);
          const t1 = toneForComparisonState(compState);
          if (t1 !== 'hidden') tone = t1;
          const group = compStateToGroup(compState, present);
          statusGroupKey = group.key;
          statusLabel = group.label;
          primaryDate = present ? destDate : undefined;
          secondaryDate = pick.date;
        } else {
          primaryDate = present ? destDate : undefined;
        }
      } else if (action === 'create') {
        statusGroupKey = 'new';
        statusLabel = newLabel;
        primaryDate = undefined;
      } else {
        // view + delete: just show the destination date in the tooltip
        primaryDate = destDate;
      }

      // Per Sebastian review item 27 (2026-05-06): in Create > Based on,
      // books not present in the reference project are not selectable —
      // there is no template content to base the new book on. Disable the
      // pill at the grid level (defense in depth alongside the existing
      // EXT-102 / TS-054 missing-model pre-flight prompt the dialog falls
      // back to if the reference book set hadn't yet loaded).
      let disabled: boolean | undefined;
      let disabledReason: string | undefined;
      if (
        action === 'create' &&
        createMethod === 'fromTemplate' &&
        createReferenceBookState &&
        createReferenceProject &&
        !createReferenceBookState.present.has(book)
      ) {
        disabled = true;
        disabledReason = fmtTemplate(
          t('%manageBooks_create_book_notInReference%', 'Not in {0}'),
          createReferenceProject.shortName,
        );
        // Manila UX follow-up ("disabled vs not in project is too subtle"):
        // cluster the non-creatable books in their own status group at the
        // bottom (notInProject sorts last via STATUS_GROUP_PRIORITY) instead
        // of interleaving them with creatable "New" books. Pairs with the
        // inert-gray disabled pill styling in book-grid.component.tsx.
        statusGroupKey = 'notInProject';
        statusLabel = disabledReason;
      }

      return {
        book,
        present,
        tone,
        statusGroupKey,
        statusLabel,
        primaryDate,
        secondaryDate,
        disabled,
        disabledReason,
      };
    });
  }, [
    action,
    visibleBooks,
    current,
    copySource,
    importFiles,
    createMethod,
    createReferenceBookState,
    createReferenceProject,
    t,
  ]);

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
        return fmtTemplate(t('%manageBooks_selection_selectBook%', 'Select {0}'), englishName);
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
        ? fmtTemplate(t('%manageBooks_footer_apply_create_one%', 'Create 1 book in {0}'), dest)
        : fmtTemplate(
            t('%manageBooks_footer_apply_create_many%', 'Create {0} books in {1}'),
            n,
            dest,
          );
    if (action === 'delete')
      return single
        ? fmtTemplate(t('%manageBooks_footer_apply_delete_one%', 'Delete 1 book from {0}'), dest)
        : fmtTemplate(
            t('%manageBooks_footer_apply_delete_many%', 'Delete {0} books from {1}'),
            n,
            dest,
          );
    if (action === 'copy')
      return single
        ? fmtTemplate(t('%manageBooks_footer_apply_copy_one%', 'Copy 1 book into {0}'), dest)
        : fmtTemplate(
            t('%manageBooks_footer_apply_copy_many%', 'Copy {0} books into {1}'),
            n,
            dest,
          );
    if (action === 'import')
      return single
        ? fmtTemplate(t('%manageBooks_footer_apply_import_one%', 'Import 1 book into {0}'), dest)
        : fmtTemplate(
            t('%manageBooks_footer_apply_import_many%', 'Import {0} books into {1}'),
            n,
            dest,
          );
    return '';
  })();

  // -- Footer summary line ------------------------------------------------
  const summaryText = (() => {
    if (action === 'view')
      return fmtTemplate(t('%manageBooks_footer_summary_view%', 'Viewing {0}'), project.shortName);
    if (action === 'create') {
      if (createMethod === 'empty')
        return t('%manageBooks_footer_summary_create_empty%', 'Create from scratch');
      if (createMethod === 'chapterVerse')
        return t(
          '%manageBooks_footer_summary_create_chapterVerse%',
          'Create with chapter and verse numbers',
        );
      // fromTemplate
      if (createReferenceProject)
        return fmtTemplate(
          t('%manageBooks_footer_summary_create_fromTemplate_with%', 'Create based on {0}'),
          createReferenceProject.shortName,
        );
      return t('%manageBooks_footer_summary_create_fromTemplate_without%', 'Create based on…');
    }
    if (action === 'delete') return t('%manageBooks_footer_summary_delete%', 'Delete books');
    if (action === 'copy') {
      if (copySourceProject)
        return fmtTemplate(
          t('%manageBooks_footer_summary_copy_with%', 'Copy from {0}'),
          copySourceProject.shortName,
        );
      return t('%manageBooks_footer_summary_copy_without%', 'Copy from…');
    }
    if (action === 'import')
      return fmtTemplate(
        t('%manageBooks_footer_summary_import%', 'Import {0} file(s)'),
        Object.keys(importFiles).length,
      );
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
      return fmtTemplate(
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
  // Four body variants: {all, partial} x {shared, not shared}. The shared
  // warning takes precedence in BOTH selection shapes — PT9 always replaced
  // the standard confirm with the shared-users warning (DeleteBooksForm.cs),
  // and the previous PT10 branch order dropped it exactly in the
  // highest-impact case (deleting every book of a shared project). The
  // wording is S/R-accurate per the Manila UX follow-up: deletion is local
  // until other users Send/Receive — the old copy falsely claimed "they will
  // see this change immediately" (old key redirected via metadata
  // fallbackKey).
  // Variant selection (the shared-warning precedence) is a pure function in
  // manage-books-dialog.utils.ts so the 2x2 matrix is unit-tested; this block
  // only maps the variant to its localized string.
  const deleteConfirmBody = (() => {
    if (!deleteConfirm) return '';
    const n = deleteConfirm.books.length;
    const dest = project.shortName;
    switch (deleteConfirmVariant(n === current.present.size, isSharedProject === true)) {
      case 'allShared':
        return fmtTemplate(
          t(
            '%manageBooks_delete_confirmBodyAllShared%',
            'All books will be deleted from {0}, which is shared with other users. The books will be deleted for all users when they next Send/Receive. The project itself will not be deleted. This cannot be undone.',
          ),
          dest,
        );
      case 'all':
        return fmtTemplate(
          t(
            '%manageBooks_delete_confirmBodyAll%',
            'All books will be deleted from {0}. The project itself will not be deleted. This cannot be undone.',
          ),
          dest,
        );
      case 'partialShared':
        return fmtTemplate(
          t(
            '%manageBooks_delete_confirmBodySharedSendReceive%',
            '{0} book(s) will be deleted from {1}, which is shared with other users. The books will be deleted for all users when they next Send/Receive. This cannot be undone.',
          ),
          n,
          dest,
        );
      case 'partial':
      default:
        return fmtTemplate(
          t(
            '%manageBooks_delete_confirmBodyPartial%',
            '{0} book(s) will be deleted from {1}. This cannot be undone.',
          ),
          n,
          dest,
        );
    }
  })();

  if (!open) {
    // The web view stays mounted but we render nothing when the dialog is "closed".
    // (In tab mode `open` is always true; this guard preserves the legacy storybook contract.)
    return undefined;
  }
  return (
    <>
      {/* Outer dialog wrapper drives the responsive collapse. At narrow widths
          the sidebar drops to an icon-only rail and the header subtitle hides.
          Tailwind container queries (`@md/dialog:` variants) don't reliably
          reach the webview's iframe stylesheets despite being emitted in the
          dist, so a JS-driven ResizeObserver flag is used instead — fewer
          moving parts, no CSS-loader surprises. The `dialogIsNarrow` flag is
          forwarded to ManageBooksSidebar where it conditionally swaps class
          sets. */}
      <div
        ref={dialogRootRef}
        className="tw:flex tw:h-full tw:min-h-0"
        data-testid="manage-books-dialog"
        data-action={action}
        data-narrow={dialogIsNarrow ? 'true' : undefined}
      >
        <TooltipProvider delayDuration={200}>
          <ManageBooksSidebar
            active={action}
            onSelectAction={(next) => {
              if (!isSubmitting) setAction(next);
            }}
            projects={sidebarProjects}
            openTabs={openTabs}
            projectId={projectId}
            onProjectIdChange={onProjectIdChange}
            // Sebastian UX review item 1 (2026-06-12): during the initial
            // `loadProjects` fetch the sidebar is fully locked — the
            // ProjectSelector disables (no clicks until the list is ready)
            // and the action rows disable because there's nothing actionable
            // yet. Once `hasLoadedProjects` flips true the usual `isSubmitting`
            // gating takes over.
            isSubmitting={isSubmitting || !hasLoadedProjects}
            isTargetEditable={project.isEditable}
            targetShortName={project.shortName}
            t={t}
            projectSelectorLocalizedStrings={projectSelectorLocalizedStrings}
            isNarrow={dialogIsNarrow}
          />
          <div className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col">
            <header className="tw:flex tw:items-center tw:gap-3 tw:border-b tw:px-6 tw:py-4">
              <div className="tw:flex tw:flex-col">
                <h2 className="tw:text-lg tw:font-semibold">{headerTitle}</h2>
                {/* Header subtitle hides when the dialog is narrow. Driven by
                    the JS-resize-observer flag on the dialog root.
                    Sebastian UX review item 1 (2026-06-12): while the initial
                    `loadProjects` fetch is in flight we render a placeholder
                    skeleton bar instead of the subtitle template, otherwise
                    the user briefly sees the projectId GUID render in place
                    of the project name ("random number") and a book count of
                    zero before the real data arrives. */}
                {!dialogIsNarrow && hasLoadedProjects && (
                  <p className="tw:text-xs tw:text-muted-foreground">{headerSubtitle}</p>
                )}
                {!dialogIsNarrow && !hasLoadedProjects && (
                  <div
                    className="tw:mt-1 tw:h-3 tw:w-48 tw:animate-pulse tw:rounded tw:bg-muted"
                    aria-hidden
                  />
                )}
              </div>
            </header>
            {/* Sebastian UX review item 1 (2026-06-12): while projects are
                loading the action body / filter bar / grid / footer below
                are replaced with a skeleton placeholder so the user doesn't
                see real-but-stale content (book pills against a different
                project's data, "0 of 0 books" counts, empty grouping etc.)
                bleed through. Once the project list resolves the real body
                renders normally. */}
            {!hasLoadedProjects && (
              <div
                className="tw:flex tw:flex-1 tw:flex-col tw:gap-4 tw:px-6 tw:py-6"
                aria-busy="true"
                aria-live="polite"
                data-testid="manage-books-dialog-loading"
              >
                <div className="tw:flex tw:gap-2">
                  <div className="tw:h-8 tw:w-32 tw:animate-pulse tw:rounded tw:bg-muted" />
                  <div className="tw:h-8 tw:w-24 tw:animate-pulse tw:rounded tw:bg-muted" />
                  <div className="tw:h-8 tw:w-28 tw:animate-pulse tw:rounded tw:bg-muted" />
                </div>
                <div className="tw:grid tw:grid-cols-2 tw:gap-2 tw:sm:grid-cols-3 tw:md:grid-cols-4 tw:lg:grid-cols-6">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      // The skeleton pills have no identity beyond their position; the array
                      // index IS the stable key for them. The no-array-index-key rule guards
                      // against using indices for reorderable data — irrelevant here.
                      // eslint-disable-next-line react/no-array-index-key
                      key={`mb-loading-pill-${i}`}
                      className="tw:h-12 tw:animate-pulse tw:rounded tw:bg-muted"
                    />
                  ))}
                </div>
              </div>
            )}
            {hasLoadedProjects && (
              <>
                <div className="tw:flex tw:flex-col tw:items-start tw:gap-2 tw:border-b tw:px-6 tw:py-3 tw:@container/actions">
                  {action === 'view' && (
                    /* Sebastian UX review item 4 (2026-06-12): the row used to wrap
                   (tw:flex-wrap) which ate two extra rows of vertical real
                   estate. It now stays single-line and overflows horizontally
                   with a hidden scrollbar — the user can shift+scroll if a
                   button is off-screen, and the buttons keep their compact
                   layout at the narrowest reasonable widths. */
                    <div className="tw:flex tw:items-center tw:gap-1 tw:overflow-x-auto tw:whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="tw:h-8 tw:px-2 tw:text-xs"
                        onClick={() => onOpenScriptureReferenceSettings(projectId)}
                      >
                        {t(
                          '%manageBooks_view_openScrRefSettings%',
                          'Scripture reference settings…',
                        )}
                      </Button>
                      {/*
                    DEF-UI-007 / DEF-UI-008 / DEF-UI-001 stub buttons (Phase 3 UI Decision 13,
                    2026-05-04): Project canons, Registry, and View differences are not yet
                    implemented in PT10. We render each as a disabled Button wrapped in a Tooltip
                    so hover surfaces "Not yet available — coming soon" — the convention used
                    elsewhere in this dialog (e.g., the apply button when invalid). The handler
                    props are optional in ManageBooksDialogProps; when an `onOpen*` handler is
                    eventually supplied, the corresponding button auto-enables and wires the
                    real cross-launch.
                  */}
                      {(() => {
                        const stubTooltip = t(
                          '%manageBooks_view_disabledStub_notYetAvailable%',
                          'Not yet available — coming soon',
                        );
                        const enableProjectCanons = Boolean(onOpenProjectCanons);
                        const enableRegistry = Boolean(onOpenRegistry);
                        const projectCanonsButton = (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="tw:h-8 tw:px-2 tw:text-xs"
                            disabled={!enableProjectCanons}
                            aria-disabled={!enableProjectCanons}
                            aria-describedby={
                              !enableProjectCanons ? projectCanonsDisabledHintId : undefined
                            }
                            onClick={
                              enableProjectCanons
                                ? () => onOpenProjectCanons?.(projectId)
                                : undefined
                            }
                          >
                            {t('%manageBooks_view_openProjectCanons%', 'Project canons…')}
                          </Button>
                        );
                        const registryButton = (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="tw:h-8 tw:gap-1.5 tw:px-2 tw:text-xs"
                            disabled={!enableRegistry}
                            aria-disabled={!enableRegistry}
                            aria-describedby={!enableRegistry ? registryDisabledHintId : undefined}
                            onClick={enableRegistry ? () => onOpenRegistry?.(projectId) : undefined}
                          >
                            {t('%manageBooks_view_openRegistry%', 'Registry')}
                            <ExternalLink
                              className="tw:h-3 tw:w-3 tw:text-muted-foreground"
                              aria-hidden
                            />
                          </Button>
                        );
                        const viewDiffButton = (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="tw:h-8 tw:px-2 tw:text-xs"
                            disabled
                            aria-disabled
                            aria-describedby={viewDiffDisabledHintId}
                          >
                            {t('%manageBooks_view_compareVersions_label%', 'Compare versions…')}
                          </Button>
                        );
                        return (
                          <>
                            {!enableProjectCanons ? (
                              <DisabledStubButtonTooltip
                                hintId={projectCanonsDisabledHintId}
                                tooltipText={stubTooltip}
                              >
                                {projectCanonsButton}
                              </DisabledStubButtonTooltip>
                            ) : (
                              projectCanonsButton
                            )}
                            {!enableRegistry ? (
                              <DisabledStubButtonTooltip
                                hintId={registryDisabledHintId}
                                tooltipText={stubTooltip}
                              >
                                {registryButton}
                              </DisabledStubButtonTooltip>
                            ) : (
                              registryButton
                            )}
                            <DisabledStubButtonTooltip
                              hintId={viewDiffDisabledHintId}
                              tooltipText={stubTooltip}
                            >
                              {viewDiffButton}
                            </DisabledStubButtonTooltip>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {action === 'copy' && (
                    <div className="tw:flex tw:w-full tw:min-w-0 tw:items-center tw:gap-2">
                      <Label htmlFor="af-source" className="tw:text-xs tw:text-muted-foreground">
                        {t('%manageBooks_copy_fromLabel%', 'From')}
                      </Label>
                      {/* Flexible width (mirrors the create-mode method picker) so the trigger
                      shrinks with the dialog instead of overflowing at narrow widths. */}
                      <div
                        id="af-source"
                        data-testid="manage-books-copy-source-trigger"
                        className="tw:min-w-0 tw:max-w-xs tw:flex-1 tw:basis-48"
                      >
                        <ProjectSelector
                          mode="project"
                          projects={copyFromProjectsAsPS}
                          openTabs={openTabs ?? []}
                          selection={{ projectId: copySourceId }}
                          onChangeSelection={({ projectId: nextId }) =>
                            setCopySourceId(nextId || undefined)
                          }
                          isDisabled={isSubmitting}
                          ariaLabel={t('%manageBooks_copy_sourcePlaceholder%', 'Select project')}
                          buttonPlaceholder={t(
                            '%manageBooks_copy_sourcePlaceholder%',
                            'Select project',
                          )}
                          localizedStrings={projectSelectorLocalizedStrings}
                          // Mirror the prior <SelectTrigger> "primary fill while empty" affordance —
                          // the picker reads as a call-to-action until a source project is set.
                          buttonClassName={cn(
                            'tw:h-8 tw:w-full',
                            !copySourceId &&
                              'tw:border-primary tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/90',
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {action === 'import' && (
                    /* tw:flex-wrap: "N files matched" + Clear wrap under the Choose-files
                   button at narrow widths instead of overflowing. */
                    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
                      <input
                        ref={importFileInputRef}
                        type="file"
                        multiple
                        accept=".sfm,.usfm,.usx,.xml"
                        className="tw:hidden"
                        onChange={(e) => {
                          handleImportFilesPicked(e.target.files);
                          e.target.value = '';
                        }}
                        aria-hidden
                      />
                      <Button
                        variant={hasInlineFiles ? 'outline' : 'default'}
                        size="sm"
                        className="tw:h-8"
                        onClick={() => {
                          triggerFileBrowser().catch(() => undefined);
                        }}
                        disabled={isSubmitting}
                      >
                        <FolderOpen className="tw:mr-1.5 tw:h-3.5 tw:w-3.5" aria-hidden />
                        {hasInlineFiles
                          ? t('%manageBooks_import_addMore%', 'Add files…')
                          : t('%manageBooks_import_choose%', 'Choose files…')}
                      </Button>
                      {hasInlineFiles && (
                        <>
                          <span className="tw:text-xs tw:text-muted-foreground">
                            {Object.keys(importFiles).length === 1
                              ? t('%manageBooks_import_filesMatched_one%', '1 file matched')
                              : fmtTemplate(
                                  t('%manageBooks_import_filesMatched_other%', '{0} files matched'),
                                  Object.keys(importFiles).length,
                                )}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="tw:h-8"
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

                {/* tw:flex-wrap (not nowrap): at extreme narrowness the presence-filter /
                group-by controls wrap to a second row rather than pushing the bar into
                horizontal overflow. The count span hides below 28rem via the
                filterBarIsNarrow resize observer. */}
                <div
                  ref={filterBarRef}
                  className="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:border-b tw:px-6 tw:py-2"
                >
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
                                ? fmtTemplate(
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
                          ? fmtTemplate(
                              t('%manageBooks_selection_xSelected%', '{0} selected'),
                              visibleSelectedCount,
                            )
                          : t('%manageBooks_selection_selectAll%', 'Select all')}
                      </TooltipContent>
                    </Tooltip>
                  )}
                  <SearchBar
                    value={filter}
                    onSearch={setFilter}
                    placeholder={t('%manageBooks_filter_placeholder%', 'Filter books…')}
                    // SearchBar's inner shadcn Input defaults to tw:h-10, making
                    // the search component visibly taller than its siblings
                    // (BookGridGroupByToggle, PresenceFilterMenu — all tw:h-8).
                    // The wrapper className already sets tw:h-8 but the Input's
                    // intrinsic height wins; use Tailwind's arbitrary descendant
                    // selector to push the height into the Input itself.
                    className="tw:h-8 tw:min-w-0 tw:max-w-xs tw:flex-1 tw:basis-24 tw:[&_input]:h-8"
                    isDisabled={isSubmitting}
                  />
                  {/* Hidden when the filter bar is narrow, in every mode — at tight widths
                  the count is the least useful filter-bar item and its space keeps the
                  search input usable. */}
                  {!filterBarIsNarrow && (
                    <span className="tw:whitespace-nowrap tw:text-xs tw:text-muted-foreground">
                      {universe.length === 0
                        ? t('%manageBooks_filter_zero%', '0 books')
                        : fmtTemplate(
                            t('%manageBooks_filter_count%', '{0} of {1}'),
                            visibleBooks.length,
                            universe.length,
                          )}
                    </span>
                  )}
                  {/* Sebastian review item 8 (2026-05-06): the View / Import presence-filter chip
                  rows were replaced with a single Filter-icon button that opens a popover
                  containing the radio choices. Mirrors the pattern in
                  `lib/platform-bible-react/src/components/advanced/project-selector/
                  project-selector.component.tsx` (`FilterMenu`). The trigger picks up an
                  accent background when a filter is active so the affordance still reads as
                  "filter applied" without dragging the user's eye to a chip row. The Copy-
                  mode comparison-state filter (New/Newer/Older/Same/Undetermined) was
                  removed entirely — see comment block on `ViewPresenceFilter` declaration. */}
                  {action === 'view' && (
                    <PresenceFilterMenu
                      testIdPrefix="presence-filter"
                      value={viewPresenceFilter}
                      onValueChange={setViewPresenceFilter}
                      ariaLabel={t('%manageBooks_filter_buttonAriaLabel%', 'Filter')}
                      menuLabel={t('%manageBooks_filter_menuLabel%', 'Show')}
                      presenceFilterLabel={presenceFilterLabel}
                    />
                  )}
                  {action === 'import' && (
                    <PresenceFilterMenu
                      testIdPrefix="import-presence-filter"
                      value={importPresenceFilter}
                      onValueChange={setImportPresenceFilter}
                      ariaLabel={t('%manageBooks_filter_buttonAriaLabel%', 'Filter')}
                      menuLabel={t('%manageBooks_filter_menuLabel%', 'Show')}
                      presenceFilterLabel={presenceFilterLabel}
                    />
                  )}
                  <BookGridGroupByToggle
                    value={gridGroupBy}
                    onChange={setGridGroupBy}
                    localizedStrings={bookGridStrings}
                  />
                </div>

                <div className="tw:min-h-0 tw:flex-1 tw:overflow-auto tw:px-3 tw:py-2">
                  {visibleBooks.length === 0 ? (
                    <div className="tw:flex tw:min-h-40 tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:text-center tw:text-sm tw:text-muted-foreground">
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
                      ariaLabel={fmtTemplate(
                        t('%manageBooks_grid_label%', 'Books in {0}'),
                        project.shortName,
                      )}
                      ariaMultiselectable={action !== 'view'}
                      primaryDateLabel={primaryDateLabel}
                      secondaryDateLabel={secondaryDateLabel}
                      interactive={action !== 'view'}
                      localizedStrings={bookGridStrings}
                      getRowAriaLabel={gridRowAriaLabel}
                      // Leave BookGridSelector's default tw:p-1 in place so the
                      // first pill checkbox horizontally aligns with the
                      // toolbar's select-all checkbox. A `tw:px-0` override would
                      // move the grid 4px left of the toolbar items.
                    />
                  )}
                </div>

                {/* The create-mode method picker + reference-project picker live
                between the book grid and the footer so the user sees the grid
                first and configures the create method just before applying. */}
                {action === 'create' && (
                  <div className="tw:flex tw:w-full tw:min-w-0 tw:flex-wrap tw:items-center tw:gap-2 tw:border-t tw:px-6 tw:py-2">
                    <Select
                      value={createMethod}
                      onValueChange={(v) => {
                        if (isCreateMethod(v)) setCreateMethod(v);
                      }}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id="af-method"
                        className="tw:h-8 tw:min-w-0 tw:flex-1 tw:basis-48"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="empty">
                          {t('%manageBooks_create_method_empty%', 'Create empty book')}
                        </SelectItem>
                        <SelectItem
                          value="chapterVerse"
                          disabled={!cvAllowed}
                          aria-describedby={!cvAllowed ? cvDisabledHintId : undefined}
                        >
                          {t(
                            '%manageBooks_create_method_chapterVerse%',
                            'Create with all chapter and verse numbers',
                          )}
                        </SelectItem>
                        <SelectItem value="fromTemplate">
                          {t('%manageBooks_create_method_referenceText%', 'Create based on')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {!cvAllowed && (
                      <span id={cvDisabledHintId} className="tw:sr-only">
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
                            className="tw:h-4 tw:w-4 tw:shrink-0 tw:text-muted-foreground"
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
                      <div id="af-reference" data-testid="manage-books-create-reference-trigger">
                        <ProjectSelector
                          mode="project"
                          projects={allOtherProjectsAsPS}
                          openTabs={openTabs ?? []}
                          selection={{ projectId: createReferenceId }}
                          onChangeSelection={({ projectId: nextId }) =>
                            setCreateReferenceId(nextId || undefined)
                          }
                          isDisabled={isSubmitting}
                          ariaLabel={t(
                            '%manageBooks_create_referenceProjectPlaceholder%',
                            'Select reference project',
                          )}
                          buttonPlaceholder={t(
                            '%manageBooks_create_referenceProjectPlaceholder%',
                            'Select reference project',
                          )}
                          localizedStrings={projectSelectorLocalizedStrings}
                          // Sebastian UX new-requirement 3 (2026-06-12): group
                          // reference candidates by versification so the user
                          // can pick one whose canon matches the destination
                          // project. The destination's own versification group
                          // is pinned to the top.
                          groupByVersification
                          priorityVersificationId={versification}
                          // Mirror the prior <SelectTrigger> "primary fill while empty" affordance —
                          // the picker reads as a call-to-action until a reference project is set.
                          buttonClassName={cn(
                            'tw:h-8 tw:min-w-0 tw:flex-1 tw:basis-48',
                            !createReferenceId &&
                              'tw:border-primary tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/90',
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Theme C1 (FN-008 v2.6.0+, 2026-05-01): the in-dialog
                  role="alert" result panel was removed. AlertEntry warnings
                  and errors now flow through the `onMutationResult` callback
                  prop and are surfaced as toasts by the wiring layer. */}

                <footer className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border-t tw:px-6 tw:py-3">
                  <span className="tw:text-xs tw:text-muted-foreground">{summaryText}</span>
                  {/* C4: aria-live region for selection-count + status */}
                  <span id={liveRegionId} aria-live="polite" className="tw:sr-only">
                    {liveAnnouncement}
                  </span>
                  <div className="tw:flex tw:items-center tw:gap-2">
                    {isSubmitting && (
                      <span className="tw:flex tw:items-center tw:gap-1.5 tw:text-xs tw:text-muted-foreground">
                        <Loader2 className="tw:h-3.5 tw:w-3.5 tw:animate-spin" aria-hidden />
                        {liveAnnouncement}
                      </span>
                    )}
                    {action !== 'view' &&
                      (() => {
                        const disabled = !canApply;
                        const renderActionIcon = () => {
                          if (isSubmitting)
                            return (
                              <Loader2
                                className="tw:mr-1.5 tw:h-4 tw:w-4 tw:animate-spin"
                                aria-hidden
                              />
                            );
                          if (action === 'create')
                            return <BookPlus className="tw:mr-1.5 tw:h-4 tw:w-4" aria-hidden />;
                          if (action === 'delete')
                            return <Trash2 className="tw:mr-1.5 tw:h-4 tw:w-4" aria-hidden />;
                          if (action === 'copy')
                            return <Copy className="tw:mr-1.5 tw:h-4 tw:w-4" aria-hidden />;
                          if (action === 'import')
                            return <Download className="tw:mr-1.5 tw:h-4 tw:w-4" aria-hidden />;
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
                        // Tooltip body: when disabled use disabledTooltip; when enabled, only Create
                        // and Copy have defined enabled-state tooltips per Sebastian item 20
                        // (2026-05-06). Delete and Import fall through with no enabled tooltip and
                        // render the bare button.
                        let tooltipBody: string | undefined;
                        if (disabled) {
                          tooltipBody = disabledTooltip;
                        } else if (action === 'create') {
                          if (createMethod === 'empty') {
                            tooltipBody = t(
                              '%manageBooks_footer_enabledTooltip_create_empty%',
                              'Create empty',
                            );
                          } else if (createMethod === 'chapterVerse') {
                            tooltipBody = t(
                              '%manageBooks_footer_enabledTooltip_create_chapterVerse%',
                              'Create with all chapters and verses',
                            );
                          } else {
                            // fromTemplate — prefer the picked reference project's short name; fall
                            // back to a single ellipsis (U+2026) when no project is picked yet (the
                            // disabled-state tooltip has already kicked in by then, but defend
                            // against the case anyway).
                            tooltipBody = fmtTemplate(
                              t(
                                '%manageBooks_footer_enabledTooltip_create_fromTemplate%',
                                'Create based on {0}',
                              ),
                              createReferenceProject?.shortName ?? '…',
                            );
                          }
                        } else if (action === 'copy') {
                          tooltipBody = fmtTemplate(
                            t('%manageBooks_footer_enabledTooltip_copy%', 'Copy from {0}'),
                            copySourceProject?.shortName ?? '…',
                          );
                        }
                        if (!tooltipBody) return actionButton;
                        return (
                          <>
                            {disabled && (
                              <span id={applyDisabledHintId} className="tw:sr-only">
                                {tooltipBody}
                              </span>
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>{actionButton}</span>
                              </TooltipTrigger>
                              <TooltipContent>{tooltipBody}</TooltipContent>
                            </Tooltip>
                          </>
                        );
                      })()}
                  </div>
                </footer>
              </>
            )}
          </div>
        </TooltipProvider>
      </div>

      <DeleteConfirmPrompt
        confirm={deleteConfirm}
        body={deleteConfirmBody}
        projectShortName={project.shortName}
        t={t}
        onCancel={() => setDeleteConfirm(undefined)}
        onConfirm={(books) => {
          setDeleteConfirm(undefined);
          runDelete(books).catch(() => undefined);
        }}
      />

      <CreatePreflightPrompt
        prompt={createPrompt}
        projectShortName={project.shortName}
        referenceProject={createReferenceProject}
        t={t}
        onCancel={() => {
          setCreatePrompt(undefined);
          pendingEstherRef.current = undefined;
        }}
        onContinue={async (prompt) => {
          setCreatePrompt(undefined);
          if (prompt.kind === 'missing-model') {
            // Continue versification check next.
            const destVrs = versification ?? '';
            const modelVrs = createReferenceId
              ? await Promise.resolve(loadVersification(createReferenceId)).catch(() => '')
              : '';
            if (destVrs && modelVrs && destVrs !== modelVrs) {
              // Sebastian UX new-requirement 2 (2026-06-12): same name (not
              // number) treatment as the primary apply path above.
              setCreatePrompt({
                kind: 'versification',
                destVrs: t(versificationLabelKey(destVrs), versificationFallbackName(destVrs)),
                modelVrs: t(versificationLabelKey(modelVrs), versificationFallbackName(modelVrs)),
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
      />

      <UsxConfirmPrompt
        confirm={usxConfirm}
        projectName={project.name}
        t={t}
        onCancel={() => {
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
        onConfirm={() => {
          if (!usxConfirm) return;
          // A9: Confirm imports immediately. Find the books mapped to these USX files.
          const fileSet = new Set(usxConfirm.files);
          const usxBooks = Object.keys(importFiles).filter((book) =>
            fileSet.has(importFiles[book].file),
          );
          setUsxConfirm(undefined);
          if (usxBooks.length > 0) runImport(usxBooks, 'replaceEntireBooks').catch(() => undefined);
        }}
      />

      <OverlapErrorPrompt error={overlapError} t={t} onDismiss={() => setOverlapError(undefined)} />

      <ImportConflictPrompt
        conflict={importConflict}
        projectName={project.name}
        t={t}
        onCancel={() => setImportConflict(undefined)}
        onChoose={(strategy, books) => {
          runImport(books, strategy).catch(() => undefined);
          setImportConflict(undefined);
        }}
      />
      <CopyConflictPrompt
        conflict={copyConfirm}
        projectName={project.name}
        t={t}
        onCancel={() => setCopyConfirm(undefined)}
        onChoose={(strategy, books) => {
          if (copyConfirm) runCopy(books, copyConfirm.sourceId, strategy).catch(() => undefined);
          setCopyConfirm(undefined);
        }}
      />
      <Sonner position="top-center" />
    </>
  );
}

export default ManageBooksDialog;
