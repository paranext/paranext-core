/*
 * Design-ideas prototype: a copy of the Home component (extensions/src/platform-get-resources/src/
 * home.component.tsx) *combined* with the Get Resources component
 * (extensions/src/platform-get-resources/src/get-resources.component.tsx) into a SINGLE table-based
 * UI.
 *
 * This file lives in the core Storybook's "Design ideas" folder (src/stories/design-ideas/) so it
 * can be iterated on without touching production code. Nothing here is imported by the real app.
 * Once a direction is chosen, the real Home/GetResources components in
 * `extensions/src/platform-get-resources/` will be updated to match.
 *
 * What is being explored:
 *   - Single unified list showing installed projects, S/R-able projects on the server, and DBL
 *     resources that are not yet installed — searchable/filterable together.
 *   - Clear per-row status (locally-available / S/R available / DBL only / update-available).
 *   - Filters for type + language, with local-language quick toggle and active-filter chips.
 *   - Sort by columns, plus a "recent first" toggle that floats last-used items to the top.
 *   - Actions unified into a single "primary action" button (Open / Get / Sync / Update) plus an
 *     overflow menu for less-common actions (Remove, Send when locally available, etc.).
 *   - Optional multi-select gate: multi-select is only allowed among items with the same status
 *     (per the "Multiselect operations" nice-to-have in the user story).
 *
 * The prop / callback shape mirrors the real Home + GetResources components so the wiring back into
 * PAPI is straightforward.
 */

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Checkbox,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Filter,
  Label,
  MultiSelectComboBox,
  MultiSelectComboBoxEntry,
  SearchBar,
  Spinner,
  Switch,
  Table,
  Tabs,
  TabsList,
  TabsTrigger,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import {
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  Globe,
  Minus,
  ScrollText,
  Shapes,
  Star,
  X,
} from 'lucide-react';
import { ReactNode, UIEvent, useEffect, useMemo, useRef, useState } from 'react';

// User-facing strings collected in one place. In production these would be pulled from the
// localization store; the prototype uses English defaults so the design idea is legible in isolation.
const STRINGS = {
  headerTitle: 'Home',
  searchPlaceholder: 'Search projects & resources by name, language, or type',
  filterType: 'Type',
  filterLanguage: 'Language',
  anyType: 'Any type',
  anyLanguage: 'Any language',
  onlyMyLanguages: 'Only my languages',
  onlyMyLanguagesTooltip:
    'Filter to languages that are already installed among your projects and resources.',
  clearAll: 'Clear filters',
  filtersActive: 'Filters:',
  shortName: 'Short name',
  fullName: 'Full name',
  language: 'Language',
  type: 'Type',
  lastUsed: 'Last used',
  action: 'Action',
  status: 'Status',
  open: 'Open',
  install: 'Install',
  get: 'Get',
  sync: 'Sync',
  update: 'Update',
  remove: 'Remove',
  installed: 'Installed',
  itemsSuffix: 'items',
  ofSuffix: 'of',
  selectionSuffix: 'selected',
  clearSelection: 'Select None',
  clearSelectionAria: 'Select None',
  headerSelectAll: 'Select all',
  headerClearAll: 'Clear all',
  presetLabel: 'Select & filter:',
  presetEdited: 'Edited',
  presetEditedTooltip: 'Projects edited by you or others',
  presetUpdated: 'Updated',
  presetUpdatedTooltip: 'Updated resources',
  presetNew: 'New',
  presetNewTooltip: 'Projects new for you',
  presetOnComputer: 'On this computer',
  presetOnComputerTooltip: 'Projects and resources installed on this computer',
  downloadPrefix: 'Download',
  downloadAvailableSuffix: 'available',
  downloadTypeResourcesPlural: 'resources',
  typeProjectPlural: 'Projects',
  typeScripturePlural: 'Scriptures',
  typeCommentaryPlural: 'Commentaries',
  typeERPlural: 'Enhanced Resources',
  typeSLRPlural: 'Source Languages',
  typeXRPlural: 'XML Resources',
  downloadMoreTooltip:
    'Browse and install additional resources from DBL that match your current search.',
  downloadMoreZero: 'No additional resources on DBL match your current search.',
  modalRowUiOpenPrimary: 'Open on right',
  modalRowUiOpenInline: 'Open inline + actions right',
  modalRowUiActionInline: 'Action inline',
  downloadModalTitle: 'Download/install resources',
  downloadModalDescription:
    'Browse resources from DBL and manage the ones already installed on this computer. Search and filter to find what you need.',
  downloadModalInstall: 'Install',
  downloadModalUpdate: 'Update',
  downloadModalInstalled: 'Installed',
  downloadModalDone: 'Done',
  downloadModalNoResults: 'No resources match your search.',
  downloadModalCount: 'resources',
  hiddenSelectedSingular: 'selected item is hidden by the current filter',
  hiddenSelectedPlural: 'selected items are hidden by the current filter',
  badgeEdited: 'Edited',
  badgeUpdate: 'Update',
  badgeNew: 'New',
  badgeDbl: 'DBL',
  languageSelectedSingular: 'language selected',
  languageSelectedPlural: 'languages selected',
  typeSelectedSingular: 'type selected',
  typeSelectedPlural: 'types selected',
  noResults: 'No projects or resources match your filters.',
  clearFiltersCta: 'Clear filters',
  browseDblCta: 'Nothing local yet — search or browse resources on DBL to get started.',
  loadingMore: 'Loading more…',
  actionTipInstall: 'Available on DBL — install to open.',
  actionTipGet: 'Available on the send/receive server — get to work with it locally.',
  actionTipUpdate: 'A newer version is available on DBL.',
  actionTipOpenProject: 'Editable project on this machine.',
  actionTipOpenResource: 'Read-only resource on this machine.',
  editedOnServer: 'Edited on the server:',
  editedLocally: 'Edited locally:',
  syncNoDetails: 'Local edits are not yet on the send/receive server.',
  removeConfirmTitlePrefix: 'Remove',
  removeConfirmBody: 'This deletes the local copy. You can re-download it from DBL later.',
  cancel: 'Cancel',
  confirmRemove: 'Remove',
  sizeMbSuffix: 'MB',
  typeScripture: 'Scripture',
  typeCommentary: 'Commentary',
  typeER: 'Enhanced Resource',
  typeSLR: 'Source Language',
  typeXR: 'XML Resource',
  typeProject: 'Project',
  never: 'Never',
} as const;

/**
 * Combined type covering the union of a local project, a shared (S/R) project, and a DBL resource.
 * A single row in the unified list resolves to exactly one of these states via `deriveStatus`.
 */
export type UnifiedItemType =
  | 'Project'
  | 'ScriptureResource'
  | 'CommentaryResource'
  | 'EnhancedResource'
  | 'SourceLanguageResource'
  | 'XmlResource';

/**
 * A row's status. The status column and primary action button both key off this — mapping is
 * intentionally exhaustive so the UI is fully deterministic given the input data.
 */
export type UnifiedStatus =
  | 'installedProject'
  | 'installedResource'
  | 'installedNeedsSync'
  | 'installedNeedsUpdate'
  | 'sharedNotInstalled'
  | 'dblNotInstalled';

export type UnifiedItem = {
  id: string;
  shortName: string;
  fullName: string;
  language: string;
  type: UnifiedItemType;
  status: UnifiedStatus;
  /** ISO date string of the last time the user opened or synced this item (undefined = never). */
  lastUsedIso?: string;
  /** DBL bundle size in MB (only meaningful for DBL resources). */
  sizeMb?: number;
  /** ISO date of the newest edit on the send/receive server (only meaningful for Sync rows). */
  editedOnServerIso?: string;
  /** ISO date of the newest local edit that has not been sent (only meaningful for Sync rows). */
  editedLocallyIso?: string;
};

export type UnifiedItemAction =
  | { kind: 'open'; batch?: boolean }
  | { kind: 'install'; batch?: boolean }
  | { kind: 'get'; batch?: boolean }
  | { kind: 'sync'; batch?: boolean }
  | { kind: 'update'; batch?: boolean }
  | { kind: 'remove' };

export type HomeUnifiedProps = {
  items: UnifiedItem[];
  isLoading?: boolean;
  headerContent?: ReactNode;
  /**
   * Callback fired when the user takes an action on a row. May return a Promise; a rejected Promise
   * keeps the row selected after a batch operation so the user can retry it. `action.batch` is set
   * to `true` when the action originates from a footer batch button so the callback can differ
   * between one-off and batch semantics (e.g. suppressing side effects that would reorder the
   * list).
   */
  onItemAction?: (item: UnifiedItem, action: UnifiedItemAction) => void | Promise<void>;
  /** IDs currently in-flight — those rows show a spinner in place of the action button. */
  inFlightIds?: string[];
  /**
   * True when more items exist beyond `items` and can be paged in via `onFetchMore` (e.g. because
   * only the first N were fetched initially). Enables the bottom "Loading more…" affordance and the
   * scroll-triggered fetch.
   */
  hasMore?: boolean;
  /**
   * Callback to request the next batch (or all remaining items). Fires on near-bottom scroll and
   * whenever the user starts filtering/searching, so filters always apply against the full set.
   */
  onFetchMore?: () => void;
  // downloadMore variant only. Total count of DBL-not-installed resources available for
  // download, supplied by the caller via a lightweight count-only backend call (not by iterating
  // `items`). Lets the Home view show `Download resources {n} available` without paging in the
  // full DBL catalog upfront — the catalog is only fetched when the user opens the modal. If
  // omitted, the button falls back to "Download resources" with no count.
  dblAvailableCount?: number;
  /** Layout variant. See the exported `HomeUnifiedVariant` doc for behavior differences. */
  variant?: HomeUnifiedVariant;
};

// Layout variant.
//   'default'          — original two-combobox header.
//   'buttons'          — S/R-integration variant: type-toggle buttons, count-only language
//                        combobox, status badges next to short names, and preset select-and-filter
//                        buttons.
//   'downloadMore'     — S/R integration + hides DBL rows from the main table. The table shows
//                        only projects/resources on the computer plus new-on-server projects. A
//                        "Download more" button below the list opens a near-full-screen modal
//                        with the full DBL catalog and its own filters. The summary switches
//                        from `x of y+ items` to the definite `x of y (+z)` form.
//   'downloadMoreTabs' — Same as 'downloadMore' outside the modal. Inside the modal, a Tabs bar
//                        at the top switches the row-action UI between three shapes:
//                          - Open-primary: row button is always Open (disabled for DBL); every
//                            other action lives in the ellipsis menu.
//                          - Open-inline: right-side action buttons keep their state-based
//                            shape (Install/Update/Open); an extra Open sits next to the short
//                            name for locally-available rows.
//                          - Action-inline: like Open-primary on the right, but the state badge
//                            next to the short name is replaced by the row's individual
//                            state-based action button.
export type HomeUnifiedVariant = 'default' | 'buttons' | 'downloadMore' | 'downloadMoreTabs';

type SortKey = 'shortName' | 'fullName' | 'language' | 'type' | 'lastUsed' | 'status' | 'action';
type SortConfig = { key: SortKey; direction: 'ascending' | 'descending' };

// Canonical order for the type filter — used by the header type-button row, the modal type-button
// row, and the single-type-filter recognition that specializes the "Download more" button label.
const ALL_UNIFIED_ITEM_TYPES: readonly UnifiedItemType[] = [
  'Project',
  'ScriptureResource',
  'CommentaryResource',
  'EnhancedResource',
  'SourceLanguageResource',
  'XmlResource',
];

const TYPE_LABEL: Record<UnifiedItemType, string> = {
  Project: STRINGS.typeProject,
  ScriptureResource: STRINGS.typeScripture,
  CommentaryResource: STRINGS.typeCommentary,
  EnhancedResource: STRINGS.typeER,
  SourceLanguageResource: STRINGS.typeSLR,
  XmlResource: STRINGS.typeXR,
};

// Plural forms used on the buttons-chrome type-toggle buttons (buttons variant and the modal in
// the downloadMore variant). The compact button label reads more naturally in the plural — the
// filter is "show me items of these types" — while the singular `TYPE_LABEL` still applies to
// the default variant's Filter combobox and narrow-mode combobox entries.
const TYPE_LABEL_PLURAL: Record<UnifiedItemType, string> = {
  Project: STRINGS.typeProjectPlural,
  ScriptureResource: STRINGS.typeScripturePlural,
  CommentaryResource: STRINGS.typeCommentaryPlural,
  EnhancedResource: STRINGS.typeERPlural,
  SourceLanguageResource: STRINGS.typeSLRPlural,
  XmlResource: STRINGS.typeXRPlural,
};

// Narrow a string coming from a `MultiSelectComboBoxEntry.value` back to a `UnifiedItemType`
// via the canonical list, then look up the plural. Falls back to the input on the impossible
// case where the value isn't one of the canonical types — the type filter buttons only ever
// carry those values, so this is a defensive fallback rather than a runtime path.
const typeLabelPlural = (value: string): string => {
  const type = ALL_UNIFIED_ITEM_TYPES.find((t) => t === value);
  return type ? TYPE_LABEL_PLURAL[type] : value;
};

/**
 * Map a row's status to its primary (single-click) action. Every row has exactly one primary action
 * so users don't have to hunt through menus for the most common operation.
 */
function primaryActionFor(status: UnifiedStatus): UnifiedItemAction['kind'] {
  switch (status) {
    case 'dblNotInstalled':
      return 'install';
    case 'sharedNotInstalled':
      return 'get';
    case 'installedNeedsUpdate':
      return 'update';
    case 'installedNeedsSync':
      return 'sync';
    case 'installedProject':
    case 'installedResource':
      return 'open';
    default:
      return 'open';
  }
}

/** Actions listed in the overflow menu, per status. */
function secondaryActionsFor(status: UnifiedStatus): UnifiedItemAction['kind'][] {
  switch (status) {
    case 'installedProject':
      return ['sync'];
    case 'installedResource':
      return ['remove'];
    case 'installedNeedsUpdate':
      return ['open', 'remove'];
    case 'installedNeedsSync':
      return ['open'];
    case 'sharedNotInstalled':
      return [];
    case 'dblNotInstalled':
      return [];
    default:
      return [];
  }
}

function actionLabel(kind: UnifiedItemAction['kind']): string {
  switch (kind) {
    case 'open':
      return STRINGS.open;
    case 'install':
      return STRINGS.install;
    case 'get':
      return STRINGS.get;
    case 'sync':
      return STRINGS.sync;
    case 'update':
      return STRINGS.update;
    case 'remove':
      return STRINGS.remove;
    default:
      return kind;
  }
}

function formatRelative(iso: string | undefined, formatter: Intl.RelativeTimeFormat): string {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffMs = then - Date.now();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (Math.abs(diffDays) < 1)
    return formatter.format(Math.round(diffMs / (1000 * 60 * 60)), 'hour');
  if (Math.abs(diffDays) < 30) return formatter.format(diffDays, 'day');
  if (Math.abs(diffDays) < 365) return formatter.format(Math.round(diffDays / 30), 'month');
  return formatter.format(Math.round(diffDays / 365), 'year');
}

function formatLastUsed(iso: string | undefined, formatter: Intl.RelativeTimeFormat): string {
  if (!iso) return STRINGS.never;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return STRINGS.never;
  const diffMs = then - Date.now();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (Math.abs(diffDays) < 1)
    return formatter.format(Math.round(diffMs / (1000 * 60 * 60)), 'hour');
  if (Math.abs(diffDays) < 30) return formatter.format(diffDays, 'day');
  if (Math.abs(diffDays) < 365) return formatter.format(Math.round(diffDays / 30), 'month');
  return formatter.format(Math.round(diffDays / 365), 'year');
}

/**
 * Build the language filter options, marking languages that already appear among locally-installed
 * items with a star (mirrors the "prioritized languages" behavior from GetResources).
 */
function buildLanguageOptions(items: UnifiedItem[]): MultiSelectComboBoxEntry[] {
  const localLanguages = new Set(
    items.filter((item) => isLocallyInstalled(item.status)).map((item) => item.language),
  );
  const uniqueLanguages = Array.from(new Set(items.map((item) => item.language)));
  const sorted = uniqueLanguages.sort((a, b) => {
    const aStar = localLanguages.has(a);
    const bStar = localLanguages.has(b);
    if (aStar && !bStar) return -1;
    if (!aStar && bStar) return 1;
    return a.localeCompare(b);
  });
  return sorted.map((language) => ({
    label: language,
    value: language,
    starred: localLanguages.has(language),
    secondaryLabel: String(items.filter((item) => item.language === language).length),
  }));
}

function isLocallyInstalled(status: UnifiedStatus): boolean {
  return (
    status === 'installedProject' ||
    status === 'installedResource' ||
    status === 'installedNeedsSync' ||
    status === 'installedNeedsUpdate'
  );
}

// "Select & filter" preset ids. Ones that mirror a status use the status name; `onComputer` is a
// synthetic id whose matcher spans every locally-installed status.
type PresetFilterId =
  | 'installedNeedsSync'
  | 'installedNeedsUpdate'
  | 'sharedNotInstalled'
  | 'onComputer';
// Module-scope matchers so the filter useMemo has a stable dependency reference.
const presetMatchers: Record<PresetFilterId, (item: UnifiedItem) => boolean> = {
  installedNeedsSync: (item) => item.status === 'installedNeedsSync',
  installedNeedsUpdate: (item) => item.status === 'installedNeedsUpdate',
  sharedNotInstalled: (item) => item.status === 'sharedNotInstalled',
  onComputer: (item) => isLocallyInstalled(item.status),
};

/**
 * The prototype UI. Combines Home + GetResources into a single searchable/filterable table with
 * per-row status, primary action, and overflow menu.
 */
export function HomeUnified({
  items,
  isLoading = false,
  headerContent,
  onItemAction = () => {},
  inFlightIds = [],
  hasMore = false,
  onFetchMore,
  variant = 'default',
  dblAvailableCount,
}: HomeUnifiedProps) {
  // The downloadMore variant reuses the buttons variant's chrome (type-toggle buttons, count-only
  // language combobox, badges, preset row) so the two flags travel together everywhere below.
  // The `-Tabs` sub-variant behaves identically outside the modal — the only difference is a
  // Tabs bar inside the modal that switches the row-action UI.
  const isDownloadMoreTabsVariant = variant === 'downloadMoreTabs';
  const isDownloadMoreVariant = variant === 'downloadMore' || isDownloadMoreTabsVariant;
  const isButtonsChrome = variant === 'buttons' || isDownloadMoreVariant;
  const [textFilter, setTextFilter] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  // "Select & filter" presets (buttons variant only) both select the matching subset and narrow
  // the list to it. Only one preset can be active at a time; undefined = no preset applied.
  const [presetStatusFilter, setPresetStatusFilter] = useState<PresetFilterId | undefined>(
    undefined,
  );
  // `onlyMyLanguages` is a "sticky" UI marker for the language toggle: it's only true right after
  // the user clicked the toggle ON. Any subsequent language removal turns it off (per user story),
  // even though selectedLanguages may still be non-empty.
  const [onlyMyLanguages, setOnlyMyLanguages] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pendingRemove, setPendingRemove] = useState<UnifiedItem | undefined>(undefined);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'lastUsed',
    direction: 'descending',
  });
  // Declared up here so scroll/fetch-more handlers can consult it — the full hover machinery
  // (rowMatchesBatchKind, enterHover, leaveHover) is defined further down where the batch-action
  // logic sits.
  type BatchHoverKind = 'get' | 'sync' | 'update' | 'install' | 'open';
  const [hoveredBatchKind, setHoveredBatchKind] = useState<BatchHoverKind | undefined>(undefined);
  // While a batch click is running (any dispatched item still resolving its promise), the
  // collapsed hover preview stays pinned to that scope and the clicked button flips to an
  // in-progress spinner. See `runBatchAction` below for the lifecycle.
  type PendingBatch = {
    kind: Exclude<UnifiedItemAction['kind'], 'remove'>;
    ids: Set<string>;
  };
  const [pendingBatch, setPendingBatch] = useState<PendingBatch | undefined>(undefined);

  // Download-more modal (downloadMore variant only). Its filter state is intentionally separate
  // from the main list's filters — the modal is an isolated DBL browser and the user often wants
  // to open it, cast a wider net there, then come back to the same narrowed home view.
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [modalTextFilter, setModalTextFilter] = useState<string>('');
  const [modalSelectedTypes, setModalSelectedTypes] = useState<string[]>([]);
  const [modalSelectedLanguages, setModalSelectedLanguages] = useState<string[]>([]);
  // Modal-local selection. Kept separate from the outer table's selection so opening the modal
  // doesn't perturb whatever the user had selected on the Home view. Cleared on modal close.
  const [modalSelectedIds, setModalSelectedIds] = useState<Set<string>>(new Set());
  // "Only my languages" is only exposed inside the modal in the downloadMore variant — see the
  // note next to where it was suppressed on the outer view. Sticky flag: true only right after
  // the user flipped it on; any manual removal of a language turns it back off (matches the
  // outer view's semantics).
  const [modalOnlyMyLanguages, setModalOnlyMyLanguages] = useState<boolean>(false);
  // Modal-local column sort. Separate from the outer table's sort so the two lists stay
  // independent — a sort chosen in the modal doesn't perturb the Home view and vice versa.
  // Default: action ascending → already-installed (Open) first, then Update, then Install.
  const [modalSortConfig, setModalSortConfig] = useState<SortConfig>({
    key: 'action',
    direction: 'ascending',
  });
  // Hovering the modal's Install button collapses the table to a preview of exactly what the
  // click will act on — the actionable subset of the current selection (dblNotInstalled +
  // installedNeedsUpdate) at full opacity, then any non-actionable selected rows below them
  // dimmed. Same pattern the outer table's batch buttons use.
  type ModalBatchKind = 'open' | 'install' | 'update';
  // Modal pending-batch state. Mirrors the outer `pendingBatch` — freezes the collapsed
  // preview and flips the clicked footer button to a spinner while Promise.all is resolving.
  type ModalPendingBatch = { kind: ModalBatchKind; ids: Set<string> };
  const [modalPendingBatch, setModalPendingBatch] = useState<ModalPendingBatch | undefined>(
    undefined,
  );
  // Row-action UI within the `downloadMoreTabs` variant. Ignored by the plain `downloadMore`
  // variant. Reset to the first tab on modal close so re-opening starts consistent.
  //   'openPrimary'   — row button is always Open (disabled for DBL); state action + Remove
  //                     live in the ellipsis menu.
  //   'openInline'    — right-side row button keeps its state-based shape; a small Open sits
  //                     inline after the short name for locally-available rows.
  //   'actionInline'  — right-side row button is always Open (like openPrimary); the state
  //                     badge next to the short name is replaced by the row's individual
  //                     state-based action button.
  type ModalRowUi = 'openPrimary' | 'openInline' | 'actionInline';
  const [modalRowUi, setModalRowUi] = useState<ModalRowUi>('openPrimary');
  const [modalHoveredBatch, setModalHoveredBatch] = useState<ModalBatchKind | undefined>(undefined);
  const modalHoverLeaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const enterModalBatchHover = (kind: ModalBatchKind) => {
    // Ignore hover changes while a batch is running — the preview is pinned to the pending
    // batch's scope; pointing at a different button shouldn't preview it.
    if (modalPendingBatch !== undefined) return;
    if (modalHoverLeaveTimeoutRef.current !== undefined) {
      clearTimeout(modalHoverLeaveTimeoutRef.current);
      modalHoverLeaveTimeoutRef.current = undefined;
    }
    setModalHoveredBatch(kind);
  };
  const leaveModalBatchHover = () => {
    if (modalPendingBatch !== undefined) return;
    if (modalHoverLeaveTimeoutRef.current !== undefined) {
      clearTimeout(modalHoverLeaveTimeoutRef.current);
    }
    modalHoverLeaveTimeoutRef.current = setTimeout(() => {
      modalHoverLeaveTimeoutRef.current = undefined;
      setModalHoveredBatch(undefined);
    }, 100);
  };
  useEffect(
    () => () => {
      if (modalHoverLeaveTimeoutRef.current !== undefined) {
        clearTimeout(modalHoverLeaveTimeoutRef.current);
      }
    },
    [],
  );

  // Track whether we're at the narrowest breakpoint (below Tailwind's `sm` = 640px), where the
  // table shows only the short-name and action columns and there's no room on the left of the
  // action button for its tooltip. Kept in JS state because Radix consumes `side` as a prop, not
  // a CSS class.
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mql = window.matchMedia('(max-width: 639.98px)');
    const update = () => setIsNarrow(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const myLanguages = useMemo(
    () =>
      new Set(items.filter((item) => isLocallyInstalled(item.status)).map((item) => item.language)),
    [items],
  );

  // Search / type / language / only-my-languages interactions eagerly page in the rest so
  // filtering runs against the full catalog — the user needs to see *all* matching resources
  // for a language or type, not just what happened to be paged in already. The scroll-to-bottom
  // trigger below handles the "just browsing" case. The preset status filter (Edited / Updated
  // / New) is excluded: those categories only touch already-known local + S/R items, so pulling
  // more DBL pages would be wasted work.
  useEffect(() => {
    if (presetStatusFilter) return;
    if (
      hasMore &&
      onFetchMore &&
      (textFilter.trim() !== '' ||
        selectedTypes.length > 0 ||
        selectedLanguages.length > 0 ||
        onlyMyLanguages)
    ) {
      onFetchMore();
    }
  }, [
    hasMore,
    onFetchMore,
    textFilter,
    selectedTypes,
    selectedLanguages,
    onlyMyLanguages,
    presetStatusFilter,
  ]);

  // downloadMore variant: DBL rows are only ever surfaced through the modal. The Home view uses
  // the fast `dblAvailableCount` prop for the button (a lightweight count-only backend call), so
  // it does not need to iterate the full catalog to know the total. The full catalog is only
  // paged in when the user actually opens the modal — that's what needs the item bodies. If
  // still-more pages arrive between opens, this effect fires again to top them up.
  useEffect(() => {
    if (isDownloadMoreVariant && isDownloadModalOpen && hasMore && onFetchMore) {
      onFetchMore();
    }
  }, [isDownloadMoreVariant, isDownloadModalOpen, hasMore, onFetchMore]);

  const handleContentScroll = (e: UIEvent<HTMLDivElement>) => {
    // Skip fetch-more while a batch button is being hovered — the table is showing a preview of
    // the click's scope, not the actual list, so pulling more DBL results in would be misleading.
    // Also skip in the downloadMore variant: the inline list never renders DBL rows, so paging
    // more DBL data in on scroll-to-bottom would silently grow memory with nothing to show for
    // it. The modal fires its own on-open fetch via the eager-fetch effect above.
    if (
      !hasMore ||
      !onFetchMore ||
      presetStatusFilter ||
      hoveredBatchKind !== undefined ||
      isDownloadMoreVariant
    )
      return;
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) {
      onFetchMore();
    }
  };

  const typeOptions: MultiSelectComboBoxEntry[] = useMemo(() => {
    const count = (type: UnifiedItemType) =>
      String(items.filter((item) => item.type === type).length);
    return ALL_UNIFIED_ITEM_TYPES.filter((type) => items.some((item) => item.type === type)).map(
      (type) => ({
        value: type,
        label: TYPE_LABEL[type],
        secondaryLabel: count(type),
      }),
    );
  }, [items]);

  const languageOptions = useMemo(() => buildLanguageOptions(items), [items]);

  const filtered = useMemo(() => {
    const needle = textFilter.trim().toLowerCase();
    return items.filter((item) => {
      if (needle) {
        const hay = [item.shortName, item.fullName, item.language, TYPE_LABEL[item.type]]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) return false;
      if (selectedLanguages.length > 0 && !selectedLanguages.includes(item.language)) return false;
      if (presetStatusFilter && !presetMatchers[presetStatusFilter](item)) return false;
      return true;
    });
  }, [items, textFilter, selectedTypes, selectedLanguages, presetStatusFilter]);

  const sorted = useMemo(() => {
    const clone = [...filtered];
    const compareStrings = (a: string, b: string) => a.localeCompare(b);
    clone.sort((a, b) => {
      let cmp = 0;
      switch (sortConfig.key) {
        case 'shortName':
          cmp = compareStrings(a.shortName, b.shortName);
          break;
        case 'fullName':
          cmp = compareStrings(a.fullName, b.fullName);
          break;
        case 'language':
          cmp = compareStrings(a.language, b.language);
          break;
        case 'type':
          cmp = compareStrings(TYPE_LABEL[a.type], TYPE_LABEL[b.type]);
          break;
        case 'status':
          cmp = compareStrings(a.status, b.status);
          break;
        case 'lastUsed':
          cmp = (a.lastUsedIso ?? '').localeCompare(b.lastUsedIso ?? '');
          break;
        case 'action': {
          // Action-column ordering (ascending): Sync → Update → Get → Open → Install. Sync +
          // Update float to the top because they're the ones the user most likely wants to
          // triage; Install goes last since DBL rows are the largest bucket and are usually the
          // "browse later" pile.
          const rank: Record<ReturnType<typeof primaryActionFor>, number> = {
            sync: 0,
            update: 1,
            get: 2,
            open: 3,
            install: 4,
            remove: 5,
          };
          cmp = rank[primaryActionFor(a.status)] - rank[primaryActionFor(b.status)];
          break;
        }
        default:
          cmp = 0;
      }
      return sortConfig.direction === 'ascending' ? cmp : -cmp;
    });
    return clone;
  }, [filtered, sortConfig]);

  // In the downloadMore variant DBL rows are pulled out of the inline list and reached only via
  // the "Download more" modal. `sorted` still uses the full filter chain (so counts and preset
  // behavior stay consistent); `displayedItems` is what actually renders in the main <Table>.
  const displayedItems = useMemo(
    () =>
      isDownloadMoreVariant ? sorted.filter((item) => item.status !== 'dblNotInstalled') : sorted,
    [sorted, isDownloadMoreVariant],
  );

  // Opening the modal seeds its filters from the outer view so the modal picks up where the
  // Home filters left off. Project is stripped from the seeded type list because DBL has no
  // projects — carrying it over would open the modal at zero results and force the user to
  // notice, then clear it, before seeing anything useful.
  const openDownloadModal = () => {
    setModalTextFilter(textFilter);
    setModalSelectedTypes(selectedTypes.filter((t) => t !== 'Project'));
    setModalSelectedLanguages(selectedLanguages);
    setIsDownloadModalOpen(true);
  };

  // Global counts for the definite "x of y (+z)" summary line the downloadMore variant uses in
  // place of "x of N+ items". These count the whole `items` array, not the filtered subset, so
  // the y/z halves of the ratio stay stable as the user narrows the filter.
  const onComputerCount = useMemo(
    () => items.filter((item) => isLocallyInstalled(item.status)).length,
    [items],
  );
  const sharedNotInstalledCount = useMemo(
    () => items.filter((item) => item.status === 'sharedNotInstalled').length,
    [items],
  );

  const relativeFormatter = useMemo(
    () => new Intl.RelativeTimeFormat(undefined, { style: 'long', numeric: 'auto' }),
    [],
  );

  // `onlyMyLanguages` isn't counted separately here — when it's on, the languages it seeded are
  // already reflected in `selectedLanguages.length`.
  const activeFilterCount =
    (textFilter ? 1 : 0) +
    selectedTypes.length +
    selectedLanguages.length +
    (presetStatusFilter ? 1 : 0);

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'ascending' ? 'descending' : 'ascending' };
      }
      return { key, direction: 'ascending' };
    });
  };

  const clearFilters = () => {
    setTextFilter('');
    setSelectedTypes([]);
    setSelectedLanguages([]);
    setOnlyMyLanguages(false);
    setPresetStatusFilter(undefined);
  };

  // Selected language values are stored (and rendered as badges) in alphabetical order so the
  // badge strip stays readable no matter what order the user picked things in.
  const sortLanguages = (langs: string[]) => [...langs].sort((a, b) => a.localeCompare(b));

  // Controls the language combobox's own tooltip so that toggling "Only my languages" ON
  // programmatically shows the list of languages that were just seeded. Left uncontrolled at rest
  // so normal hover/focus still works.
  const [isLanguageTooltipOpen, setIsLanguageTooltipOpen] = useState<boolean | undefined>(
    undefined,
  );

  // Selecting "Only my languages" seeds the language filter with the languages of the user's
  // locally-installed items. Turning it off always clears the language filter.
  const handleOnlyMyLanguagesToggle = (checked: boolean) => {
    if (checked) {
      setSelectedLanguages(sortLanguages(Array.from(myLanguages)));
      setOnlyMyLanguages(true);
      // Pop the language tooltip open so the user immediately sees which languages were seeded.
      // Hover-out (or any interaction that fires onOpenChange) hands control back over.
      setIsLanguageTooltipOpen(true);
    } else {
      setSelectedLanguages([]);
      setOnlyMyLanguages(false);
      setIsLanguageTooltipOpen(undefined);
    }
  };

  // Changes to selectedLanguages that don't come from the toggle turn the toggle off — the moment
  // the user starts curating the list by hand, the "only my languages" invariant is gone.
  const handleLanguagesChange = (next: string[]) => {
    setSelectedLanguages(sortLanguages(next));
    if (onlyMyLanguages) setOnlyMyLanguages(false);
  };

  const toggleSelected = (item: UnifiedItem) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
      }
      return next;
    });
  };

  // Multi-select footer buttons:
  //   Left  = a single combined button labeled with the needed actions from Get/Sync/Update/Install,
  //           joined by " / " when there's more than one; each item dispatches its own primary
  //           action. Remove is never batched.
  //   Right = an "Open" button, shown only when every selected item is locally available (installed
  //           items — including sync-needed and update-needed ones).
  type NeededKind = 'get' | 'sync' | 'update' | 'install';
  const NEEDED_KINDS_ORDER: NeededKind[] = ['get', 'sync', 'update', 'install'];
  const neededKinds: NeededKind[] = useMemo(() => {
    if (selectedIds.size === 0) return [];
    const primaries = new Set(
      items.filter((item) => selectedIds.has(item.id)).map((item) => primaryActionFor(item.status)),
    );
    return NEEDED_KINDS_ORDER.filter((kind) => primaries.has(kind));
    // NEEDED_KINDS_ORDER is a stable module-level constant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, selectedIds]);

  // Show the Open button when at least one selected item is locally available — same "any of the
  // selection matches" rule as the Get/Sync/Update/Install buttons. Clicking Open then runs only on
  // those matching items; DBL-only rows in the selection are left untouched.
  const canOpenSome = useMemo(() => {
    if (selectedIds.size === 0) return false;
    return items.some((item) => selectedIds.has(item.id) && isLocallyInstalled(item.status));
  }, [items, selectedIds]);

  // Hover state is declared near the other state hooks at the top of the component (scroll and
  // fetch-more handlers consult it). This helper is defined here where the batch-action logic
  // lives — it keys off the primary action for non-Open kinds and "locally installed" for Open.
  const rowMatchesBatchKind = (item: UnifiedItem, kind: BatchHoverKind): boolean =>
    kind === 'open' ? isLocallyInstalled(item.status) : primaryActionFor(item.status) === kind;

  // Delay clearing the hover state on mouse-leave so sweeping the pointer between adjacent
  // batch buttons doesn't flicker the table back and forth. If the pointer lands on another
  // batch button within the grace period, `enterHover` cancels the pending reset before it
  // fires and the table transitions straight from one preview to the next.
  const hoverLeaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Hover-preview state transitions used to run through `document.startViewTransition` so rows
  // could fade+collapse and slide into their new positions. That approach was pulled back for
  // now: view-transition pseudo-elements live in the top layer and are positioned in absolute
  // page coordinates, so a row's OLD-position snapshot can bleed *over* the CardFooter during
  // the animation — visible as row content flickering across the batch button. The scroll
  // container that would naturally clip that in normal rendering is bypassed by the top layer.
  // A future revision could add row animation via a dedicated FLIP/exit library that keeps the
  // animation confined to the scroll container.
  const enterHover = (kind: BatchHoverKind) => {
    // Ignore hover changes while a batch is running — the collapsed view is pinned to the
    // pending batch's scope, and pointing at a different button shouldn't preview it.
    if (pendingBatch !== undefined) return;
    if (hoverLeaveTimeoutRef.current !== undefined) {
      clearTimeout(hoverLeaveTimeoutRef.current);
      hoverLeaveTimeoutRef.current = undefined;
    }
    setHoveredBatchKind(kind);
  };
  const leaveHover = () => {
    if (pendingBatch !== undefined) return;
    if (hoverLeaveTimeoutRef.current !== undefined) {
      clearTimeout(hoverLeaveTimeoutRef.current);
    }
    hoverLeaveTimeoutRef.current = setTimeout(() => {
      hoverLeaveTimeoutRef.current = undefined;
      setHoveredBatchKind(undefined);
    }, 100);
  };
  useEffect(
    () => () => {
      if (hoverLeaveTimeoutRef.current !== undefined) {
        clearTimeout(hoverLeaveTimeoutRef.current);
      }
    },
    [],
  );

  // Batch dispatch: fires the action for every selected row that matches the predicate. Selection
  // is preserved wholesale — including succeeded items — so the user can chain more batch actions
  // on the same set (e.g. Sync all, then Update the same rows once statuses shift) without having
  // to re-select. Also clears the hover preview so opacity resets even if the pointer stays
  // parked on the button.
  const runBatchAction = async (
    kind: Exclude<UnifiedItemAction['kind'], 'remove'>,
    predicate: (item: UnifiedItem) => boolean,
  ) => {
    if (pendingBatch !== undefined) return;
    const matched = items.filter((item) => selectedIds.has(item.id) && predicate(item));
    if (matched.length === 0) return;
    setPendingBatch({ kind, ids: new Set(matched.map((item) => item.id)) });
    setHoveredBatchKind(kind);
    // Wrap each in Promise.resolve() so both sync (void) and async (Promise<void>) callback
    // return types can be handled uniformly. Per-item failure surfacing would need a dedicated
    // channel (out of scope for this design idea); the batch still resolves via Promise.all.
    await Promise.all(
      matched.map((item) =>
        Promise.resolve(onItemAction(item, { kind, batch: true })).catch(() => {}),
      ),
    );
    setPendingBatch(undefined);
    setHoveredBatchKind(undefined);
  };

  const runOpenBatch = () => runBatchAction('open', (item) => isLocallyInstalled(item.status));

  const buildHead = (key: SortKey, label: string, className?: string) => (
    <TableHead
      onClick={() => handleSort(key)}
      className={cn('tw:cursor-default tw:px-2', className)}
    >
      <div className="tw:flex tw:items-center tw:gap-1 tw:text-sm tw:font-normal">
        {label}
        {sortConfig.key !== key && <ChevronsUpDown size={14} />}
        {sortConfig.key === key &&
          (sortConfig.direction === 'ascending' ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          ))}
      </div>
    </TableHead>
  );

  // Builds the tooltip content for the primary action button. Absorbs what used to be shown as a
  // dedicated Status column: reason for the action, plus (for Sync) the newest edit dates on both
  // sides so users can decide whether they want to publish first or pull first.
  const actionTooltip = (item: UnifiedItem): ReactNode => {
    const kind = primaryActionFor(item.status);
    switch (kind) {
      case 'install':
        return (
          <>
            {STRINGS.actionTipInstall}
            {item.sizeMb ? ` (${item.sizeMb} ${STRINGS.sizeMbSuffix})` : ''}
          </>
        );
      case 'get':
        return STRINGS.actionTipGet;
      case 'update':
        return STRINGS.actionTipUpdate;
      case 'sync': {
        const serverDate = formatRelative(item.editedOnServerIso, relativeFormatter);
        const localDate = formatRelative(item.editedLocallyIso, relativeFormatter);
        if (!serverDate && !localDate) return STRINGS.syncNoDetails;
        return (
          <div className="tw:flex tw:flex-col tw:gap-1">
            {serverDate && (
              <div>
                {STRINGS.editedOnServer} {serverDate}
              </div>
            )}
            {localDate && (
              <div>
                {STRINGS.editedLocally} {localDate}
              </div>
            )}
          </div>
        );
      }
      case 'open':
        return item.status === 'installedProject'
          ? STRINGS.actionTipOpenProject
          : STRINGS.actionTipOpenResource;
      default:
        return actionLabel(kind);
    }
  };

  const primaryButton = (item: UnifiedItem) => {
    const kind = primaryActionFor(item.status);
    const inFlight = inFlightIds.includes(item.id);
    const isPrimaryVariant =
      kind === 'update' || kind === 'sync' || kind === 'get' || kind === 'install';
    const button = (
      <Button
        size="sm"
        disabled={inFlight}
        variant={isPrimaryVariant ? 'default' : 'ghost'}
        className={cn('tw:h-7', kind === 'open' ? 'tw:bg-muted' : '')}
        onClick={(e) => {
          e.stopPropagation();
          onItemAction(item, { kind });
        }}
      >
        {inFlight ? <Spinner className="tw:h-4" /> : actionLabel(kind)}
      </Button>
    );
    // In the "buttons" variant the explanatory tooltip lives on the row's status badge (see the
    // name-cell rendering), so the action button is bare. Everywhere else the tooltip anchors to
    // the button itself, flipping from left → top at the narrowest breakpoint (sm-) where the
    // table only shows short-name + action columns.
    if (isButtonsChrome) return button;
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side={isNarrow ? 'top' : 'left'}>{actionTooltip(item)}</TooltipContent>
      </Tooltip>
    );
  };

  const overflowMenu = (item: UnifiedItem) => {
    const extras = secondaryActionsFor(item.status);
    if (extras.length === 0) return undefined;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="tw:h-7 tw:w-7">
            <Ellipsis className="tw:h-4 tw:w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {extras.map((extra) => (
            <DropdownMenuItem
              key={extra}
              onClick={() => {
                // Remove is destructive → gate on a confirmation dialog instead of firing
                // immediately. Every other secondary action fires straight through.
                if (extra === 'remove') {
                  setPendingRemove(item);
                  return;
                }
                onItemAction(item, { kind: extra });
              }}
            >
              {actionLabel(extra)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const rowIsDim = (status: UnifiedStatus) => !isLocallyInstalled(status);

  const isModalRowUi = (value: string): value is ModalRowUi =>
    value === 'openPrimary' || value === 'openInline' || value === 'actionInline';

  // downloadMoreTabs sub-variant flags mirrored onto the outer Home table. Hoisted here so the
  // TableHeader (which is outside the row map) can align its column count with the row body.
  const outerOpenPrimary =
    isDownloadMoreTabsVariant && (modalRowUi === 'openPrimary' || modalRowUi === 'actionInline');
  const outerOpenInline = isDownloadMoreTabsVariant && modalRowUi === 'openInline';
  const outerActionInline = isDownloadMoreTabsVariant && modalRowUi === 'actionInline';
  const hasInlineActionColumn = outerOpenInline || outerActionInline;

  return (
    <TooltipProvider>
      {/* Row-action UI tabs — only in the `downloadMoreTabs` variant. Rendered outside the
          Card and (crucially) outside the modal Dialog so switching sub-variants stays available
          while the modal is open — the modal backdrop must NOT paint over these. Fixed position
          with a z-index above Z_INDEX_MODAL_BACKDROP + Z_INDEX_MODAL so it wins over both. */}
      {isDownloadMoreTabsVariant && (
        <div
          className="tw:fixed tw:start-1/2 tw:top-2 tw:-translate-x-1/2 tw:rounded-lg tw:bg-background/95 tw:p-1 tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:rtl:translate-x-1/2"
          style={{ zIndex: 600 }}
        >
          <Tabs
            value={modalRowUi}
            onValueChange={(next) => {
              if (isModalRowUi(next)) setModalRowUi(next);
            }}
          >
            <TabsList>
              <TabsTrigger value="openPrimary">{STRINGS.modalRowUiOpenPrimary}</TabsTrigger>
              <TabsTrigger value="openInline">{STRINGS.modalRowUiOpenInline}</TabsTrigger>
              <TabsTrigger value="actionInline">{STRINGS.modalRowUiActionInline}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
      <Card className="tw:flex tw:h-screen tw:flex-col tw:rounded-none tw:border-0">
        <CardHeader className="tw:shrink-0 tw:gap-3">
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
            {headerContent}
            <div className="tw:min-w-72 tw:flex-1">
              <SearchBar
                value={textFilter}
                onSearch={setTextFilter}
                placeholder={STRINGS.searchPlaceholder}
              />
            </div>
            {/* Primary "Download resources" entry point in the header — pinned to the right of
                the search bar so the affordance is discoverable without scrolling past the list.
                Kept label-only (no count) so the header stays scannable; the mid-list secondary
                button below the table still carries the available-count badge. Shares the
                mid-list tooltip so hover explanation is identical from either entry point. */}
            {isDownloadMoreVariant && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={openDownloadModal} disabled={dblAvailableCount === 0}>
                    {STRINGS.downloadPrefix} {STRINGS.downloadTypeResourcesPlural}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {dblAvailableCount === 0 ? STRINGS.downloadMoreZero : STRINGS.downloadMoreTooltip}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          {isButtonsChrome && !isNarrow && (
            /* Wide-buttons variant: individual toggle buttons per type (outline, aria-pressed).
               In narrow mode the type filter collapses into row 2 (inlined with the language
               combobox) — see the row-2 block below. */
            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
              {typeOptions.map((option) => {
                const isSelected = selectedTypes.includes(option.value);
                return (
                  <Button
                    key={option.value}
                    variant="outline"
                    aria-pressed={isSelected}
                    data-state={isSelected ? 'on' : 'off'}
                    className="tw:data-[state=on]:bg-muted tw:data-[state=on]:text-foreground"
                    onClick={() => {
                      setSelectedTypes(
                        isSelected
                          ? selectedTypes.filter((t) => t !== option.value)
                          : [...selectedTypes, option.value],
                      );
                    }}
                  >
                    {typeLabelPlural(option.value)}
                  </Button>
                );
              })}
              {/* downloadMore variant: Clear filters lives inline with the type-toggle buttons —
                  in this variant there is no language row for it to trail, so it would otherwise
                  float alone on its own row. Other variants keep Clear on the trailing row next
                  to the language filter and "Only my languages" toggle. */}
              {isDownloadMoreVariant && activeFilterCount > 0 && (
                <Button size="sm" className="tw:h-6 tw:text-xs" onClick={clearFilters}>
                  {STRINGS.clearAll}
                </Button>
              )}
            </div>
          )}
          {!isButtonsChrome && (
            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
              {/* Scoped muted color only on the badgesPlaceholder (a shadcn Label with
                  data-slot="label"). The trigger button inside MultiSelectComboBox uses a native
                  <button>, not a Label, so it keeps the normal foreground color. Portal-rendered
                  popover contents aren't DOM descendants of this wrapper, so they're unaffected. */}
              <div className="tw:[&_[data-slot=label]]:text-muted-foreground">
                <Filter
                  entries={typeOptions}
                  selected={selectedTypes}
                  onChange={setSelectedTypes}
                  placeholder={STRINGS.filterType}
                  icon={<Shapes />}
                  badgesPlaceholder={STRINGS.anyType}
                />
              </div>
              <div className="tw:[&_[data-slot=label]]:text-muted-foreground">
                <Filter
                  entries={languageOptions}
                  selected={selectedLanguages}
                  onChange={handleLanguagesChange}
                  placeholder={STRINGS.filterLanguage}
                  icon={<Globe />}
                  sortSelected
                  badgesPlaceholder={STRINGS.anyLanguage}
                />
              </div>
            </div>
          )}
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            {isButtonsChrome && isNarrow && (
              /* Narrow-buttons variant: type filter is inlined here as a count-only combobox
                 (same style as the language combobox to its right). The popover entries drop
                 secondaryLabel so no per-type counts appear inside the dropdown itself — the
                 count is only surfaced in the trigger and the hover tooltip. */
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <MultiSelectComboBox
                      entries={typeOptions.map((option) => ({
                        value: option.value,
                        label: option.label,
                        starred: option.starred,
                      }))}
                      selected={selectedTypes}
                      onChange={setSelectedTypes}
                      placeholder={STRINGS.filterType}
                      icon={<Shapes />}
                      customSelectedText={
                        selectedTypes.length > 0
                          ? `${STRINGS.filterType} · ${selectedTypes.length}`
                          : undefined
                      }
                    />
                  </div>
                </TooltipTrigger>
                {selectedTypes.length > 0 && (
                  <TooltipContent side="bottom">
                    <div className="tw:flex tw:flex-col tw:gap-0.5">
                      <div className="tw:text-xs tw:opacity-70">
                        {selectedTypes.length}{' '}
                        {selectedTypes.length === 1
                          ? STRINGS.typeSelectedSingular
                          : STRINGS.typeSelectedPlural}
                      </div>
                      {selectedTypes.map((typeValue) => (
                        <div key={typeValue}>
                          {typeOptions.find((opt) => opt.value === typeValue)?.label ?? typeValue}
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            )}
            {isButtonsChrome && !isDownloadMoreVariant && (
              /* Buttons variant — row 2: language selector is now a plain combobox whose trigger
                 shows only a count (no badges). A Tooltip on the whole trigger enumerates the
                 selected language names on hover — and pops open programmatically when the user
                 toggles "Only my languages" on, so they immediately see which languages were
                 seeded. Any hover/focus change hands control back over via onOpenChange.

                 downloadMore variant: language filter is exposed *only* inside the modal; the
                 outer view has no DBL rows to filter by language, so keeping the combobox here
                 would restrict projects/S-R rows to a language set the user picked to narrow the
                 DBL catalog — the wrong scope. */
              <Tooltip
                open={isLanguageTooltipOpen}
                onOpenChange={(open) => setIsLanguageTooltipOpen(open ? true : undefined)}
              >
                <TooltipTrigger asChild>
                  <div>
                    <MultiSelectComboBox
                      entries={languageOptions.map((option) => ({
                        value: option.value,
                        label: option.label,
                        starred: option.starred,
                      }))}
                      selected={selectedLanguages}
                      onChange={handleLanguagesChange}
                      placeholder={STRINGS.filterLanguage}
                      icon={<Globe />}
                      sortSelected
                      customSelectedText={
                        selectedLanguages.length > 0
                          ? `${STRINGS.filterLanguage} · ${selectedLanguages.length}`
                          : undefined
                      }
                    />
                  </div>
                </TooltipTrigger>
                {selectedLanguages.length > 0 && (
                  <TooltipContent side="bottom">
                    <div className="tw:flex tw:flex-col tw:gap-0.5">
                      <div className="tw:text-xs tw:opacity-70">
                        {selectedLanguages.length}{' '}
                        {selectedLanguages.length === 1
                          ? STRINGS.languageSelectedSingular
                          : STRINGS.languageSelectedPlural}
                      </div>
                      {selectedLanguages.map((lang) => (
                        <div key={lang}>{lang}</div>
                      ))}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            )}
            {/* "Only my languages" lives on the outer view for default/buttons variants where it
                narrows the mixed catalog (local + S/R + DBL) inline. The downloadMore variant
                strips DBL from the outer list entirely, so restricting the outer languages here
                would only ever cut into projects/S-R rows — the wrong scope. The toggle is moved
                into the modal where it can filter the DBL catalog to just the user's languages. */}
            {!isDownloadMoreVariant && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="tw:flex tw:items-center tw:gap-2">
                    <Switch
                      id="only-my-langs"
                      checked={onlyMyLanguages}
                      onCheckedChange={handleOnlyMyLanguagesToggle}
                    />
                    <Label htmlFor="only-my-langs">{STRINGS.onlyMyLanguages}</Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">{STRINGS.onlyMyLanguagesTooltip}</TooltipContent>
              </Tooltip>
            )}
            {/* downloadMore variant in wide mode renders its Clear filters inline with the type
                buttons above, so this trailing copy would be a duplicate — suppress here. */}
            {activeFilterCount > 0 && !(isDownloadMoreVariant && !isNarrow) && (
              <Button size="sm" className="tw:h-6 tw:text-xs" onClick={clearFilters}>
                {STRINGS.clearAll}
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Preselection row lives outside the scrollable CardContent so it never scrolls away.
            `-mb-4` cancels the Card's default `gap-4` between children so the preset row sits
            flush against the list below. */}
        {isButtonsChrome && !isLoading && displayedItems.length > 0 && (
          <div className="tw:-mb-4 tw:flex tw:shrink-0 tw:flex-wrap tw:items-center tw:justify-end tw:gap-x-1 tw:gap-y-1 tw:px-3 tw:pb-2">
            <Label className="tw:me-2 tw:text-xs tw:text-muted-foreground tw:uppercase">
              {STRINGS.presetLabel}
            </Label>
            {(() => {
              // "Select & filter" presets: each button both selects the matching subset AND
              // narrows the visible list to that same subset. Counts are *global* — computed
              // from the whole catalog, not the current filter — so the user can see the true
              // category size before clicking. `data-state=on` marks the active preset so its
              // pressed styling reads at a glance. Clicking an already-active preset toggles it
              // off (same behavior as None for that filter).
              const renderPreset = (label: string, tooltip: string, presetId: PresetFilterId) => {
                const matches = items.filter(presetMatchers[presetId]);
                const isActive = presetStatusFilter === presetId;
                return (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-pressed={isActive}
                        data-state={isActive ? 'on' : 'off'}
                        className="tw:h-6 tw:data-[state=on]:bg-muted tw:data-[state=on]:text-foreground"
                        onClick={() => {
                          if (isActive) {
                            setPresetStatusFilter(undefined);
                            setSelectedIds(new Set());
                            return;
                          }
                          setPresetStatusFilter(presetId);
                          setSelectedIds(new Set(matches.map((item) => item.id)));
                        }}
                      >
                        {label}
                        <span className="tw:ms-1 tw:text-muted-foreground">{matches.length}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">{tooltip}</TooltipContent>
                  </Tooltip>
                );
              };
              return (
                <>
                  {renderPreset(
                    STRINGS.presetEdited,
                    STRINGS.presetEditedTooltip,
                    'installedNeedsSync',
                  )}
                  {renderPreset(
                    STRINGS.presetUpdated,
                    STRINGS.presetUpdatedTooltip,
                    'installedNeedsUpdate',
                  )}
                  {renderPreset(STRINGS.presetNew, STRINGS.presetNewTooltip, 'sharedNotInstalled')}
                  {/* "On this computer" is redundant in the downloadMore variant — the inline
                      table already only shows on-computer + new-on-server rows, so a preset that
                      further narrows to "on this computer" duplicates most of the default view.
                      Hidden here; still shown in the plain buttons variant where the outer list
                      also contains DBL rows to filter away. */}
                  {!isDownloadMoreVariant &&
                    renderPreset(
                      STRINGS.presetOnComputer,
                      STRINGS.presetOnComputerTooltip,
                      'onComputer',
                    )}
                </>
              );
            })()}
          </div>
        )}

        {isLoading ? (
          <CardContent className="tw:flex tw:flex-grow tw:items-center tw:justify-center">
            <Spinner />
          </CardContent>
        ) : (
          <CardContent
            className="tw:flex-grow tw:overflow-auto tw:px-0"
            onScroll={handleContentScroll}
          >
            {displayedItems.length === 0 ? (
              <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:p-8 tw:text-center">
                <Label className="tw:text-muted-foreground">
                  {items.length === 0 ? STRINGS.browseDblCta : STRINGS.noResults}
                </Label>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" onClick={clearFilters}>
                    {STRINGS.clearFiltersCta}
                  </Button>
                )}
                {/* Even with no on-computer/S-R rows to show, the downloadMore variant surfaces the
                    DBL "Download more" button so the user still has a way to browse resources —
                    the modal is the *only* entry to DBL in this variant. */}
                {isDownloadMoreVariant && (
                  <Button
                    variant="outline"
                    onClick={openDownloadModal}
                    disabled={dblAvailableCount === 0}
                  >
                    {STRINGS.downloadPrefix} {STRINGS.downloadTypeResourcesPlural}
                    {dblAvailableCount !== undefined && (
                      <span className="tw:ms-2 tw:text-muted-foreground">
                        {dblAvailableCount} {STRINGS.downloadAvailableSuffix}
                      </span>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <Table stickyHeader>
                <TableHeader stickyHeader>
                  <TableRow>
                    {/* downloadMore variant: 3-state header checkbox (empty / indeterminate /
                        all-checked) that toggles the whole visible selection. Other variants
                        keep the plain X clear-selection button that only appears when something
                        is selected. */}
                    <TableHead className="tw:w-8 tw:ps-3 tw:pe-0">
                      {(() => {
                        // downloadMore variant: 3-state header checkbox (empty / indeterminate /
                        // all-checked) toggling the whole visible selection.
                        if (isDownloadMoreVariant) {
                          const allSelected =
                            displayedItems.length > 0 &&
                            displayedItems.every((item) => selectedIds.has(item.id));
                          const someSelected = selectedIds.size > 0 && !allSelected;
                          const anySelected = allSelected || someSelected;
                          const tooltipLabel = anySelected
                            ? STRINGS.headerClearAll
                            : STRINGS.headerSelectAll;
                          const handleToggle = () => {
                            if (anySelected) setSelectedIds(new Set());
                            else setSelectedIds(new Set(displayedItems.map((item) => item.id)));
                          };
                          return (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                {/* Wrapping div so the tooltip has a stable anchor while the
                                    Checkbox flips between checked states. The absolute Minus
                                    overlays the checkbox to signal indeterminate — shadcn's
                                    indicator only renders IconCheck, so a data-state=
                                    indeterminate render would look identical to unchecked. */}
                                <div className="tw:relative tw:inline-flex">
                                  <Checkbox
                                    checked={allSelected}
                                    onCheckedChange={handleToggle}
                                    aria-label={tooltipLabel}
                                  />
                                  {someSelected && (
                                    <Minus
                                      className="tw:pointer-events-none tw:absolute tw:inset-0 tw:m-auto tw:size-3"
                                      aria-hidden
                                    />
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>{tooltipLabel}</TooltipContent>
                            </Tooltip>
                          );
                        }
                        // Other variants: plain X clear-selection button, only when something
                        // is selected.
                        if (selectedIds.size === 0) return undefined;
                        return (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="tw:size-4 tw:p-0"
                                onClick={() => setSelectedIds(new Set())}
                                aria-label={STRINGS.clearSelectionAria}
                              >
                                <X className="tw:size-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{STRINGS.clearSelection}</TooltipContent>
                          </Tooltip>
                        );
                      })()}
                    </TableHead>
                    {buildHead('shortName', STRINGS.shortName, 'tw:ps-4')}
                    {/* Empty header for the inline-action column — only present in the
                        openInline / actionInline sub-variants of downloadMoreTabs. Keeps the
                        buttons vertically aligned across rows. */}
                    {hasInlineActionColumn && <TableHead className="tw:w-1" />}
                    {buildHead('fullName', STRINGS.fullName, 'tw:hidden tw:md:!table-cell')}
                    {buildHead('language', STRINGS.language, 'tw:hidden tw:sm:!table-cell')}
                    {buildHead('type', STRINGS.type, 'tw:hidden tw:lg:!table-cell')}
                    {buildHead('lastUsed', STRINGS.lastUsed, 'tw:hidden tw:xl:!table-cell')}
                    {buildHead('action', STRINGS.action)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    // While a batch button is hovered — or while a batch is currently running —
                    // collapse the list to only *selected* rows. Unselected rows are hidden.
                    // Matching selections (the ones the click ran or will run on) come first at
                    // full opacity; non-matching selections come below, styled as disabled
                    // (dimmed + non-interactive) so the user sees what stays untouched in the
                    // same selection. Hidden-by-filter selections are folded in too so the
                    // preview covers the entire selection regardless of the current filter.
                    // During pending, the match set is FROZEN to the dispatched batch's ids —
                    // even if a row's status changes mid-flight (e.g. install completes and it
                    // becomes `installedResource`), the row stays in the "matched" bucket so
                    // the user sees the same list until every item finishes.
                    if (!hoveredBatchKind) return displayedItems;
                    const matches = (item: UnifiedItem) =>
                      pendingBatch !== undefined
                        ? pendingBatch.ids.has(item.id)
                        : rowMatchesBatchKind(item, hoveredBatchKind);
                    const visibleIdsForHover = new Set(displayedItems.map((item) => item.id));
                    const allSelected = [
                      ...displayedItems.filter((item) => selectedIds.has(item.id)),
                      ...items.filter(
                        (item) => selectedIds.has(item.id) && !visibleIdsForHover.has(item.id),
                      ),
                    ];
                    return [
                      ...allSelected.filter(matches),
                      ...allSelected.filter((item) => !matches(item)),
                    ];
                  })().map((item) => {
                    const kind = primaryActionFor(item.status);
                    const rowMatchesPreview =
                      pendingBatch !== undefined
                        ? pendingBatch.ids.has(item.id)
                        : hoveredBatchKind !== undefined &&
                          rowMatchesBatchKind(item, hoveredBatchKind);
                    // `outerOpenPrimary`, `outerOpenInline`, `outerActionInline`, and
                    // `hasInlineActionColumn` are computed at the top of the component so the
                    // TableHeader can align columns with the row body.
                    const rowInFlight = inFlightIds.includes(item.id);
                    return (
                      <TableRow
                        key={item.id}
                        onClick={(e) => {
                          // A double-click still fires two clicks; skip the toggle on the second
                          // one so double-clicking to Open doesn't flip the selection back off.
                          if (e.detail > 1) return;
                          toggleSelected(item);
                        }}
                        onDoubleClick={() => onItemAction(item, { kind })}
                        onMouseDown={(e) => {
                          if (e.detail > 1) e.preventDefault();
                        }}
                        className={cn('tw:cursor-default', {
                          // Not-locally-available rows dim by default, but a selected row overrides
                          // that back to full foreground so it visually asserts the user's choice.
                          'tw:text-muted-foreground/80':
                            rowIsDim(item.status) && !selectedIds.has(item.id),
                          // Selected-row highlight — suppressed for the "disabled" state below so
                          // non-matching selections read as inert, not merely dimmed.
                          'tw:bg-muted/40':
                            selectedIds.has(item.id) &&
                            !(hoveredBatchKind !== undefined && !rowMatchesPreview),
                          // While a batch button is hovered (or a batch is running), non-matching
                          // selected rows show as disabled — grayscale + line-through + opacity
                          // + no pointer events — so it's unambiguous they're excluded.
                          'tw:pointer-events-none tw:line-through tw:opacity-50 tw:grayscale':
                            hoveredBatchKind !== undefined && !rowMatchesPreview,
                        })}
                      >
                        {/* Clicks inside the checkbox cell already toggle via `onCheckedChange`;
                            stopping propagation here avoids the row-level click also toggling and
                            landing us back where we started. */}
                        <TableCell className="tw:ps-3 tw:pe-0" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedIds.has(item.id)}
                            onCheckedChange={() => toggleSelected(item)}
                            aria-label={item.shortName}
                          />
                        </TableCell>
                        <TableCell className="tw:ps-4">
                          <div className="tw:flex tw:items-center tw:gap-3">
                            {item.type === 'Project' ? (
                              <ScrollText className="tw:shrink-0" size={16} />
                            ) : (
                              <BookOpen className="tw:shrink-0" size={16} />
                            )}
                            <span className="tw:font-medium tw:whitespace-nowrap">
                              {item.shortName}
                            </span>
                            {isButtonsChrome &&
                              !outerOpenInline &&
                              !outerActionInline &&
                              (() => {
                                /* S/R-style status badges next to the short name — mirrors the
                                   badges shown in the send/receive dialog. Each badge carries the
                                   same explanatory tooltip that used to live on the row's action
                                   button (Sync date pair, install size, etc.) so the info follows
                                   the visual indicator. Anchored to the top of the badge so it
                                   doesn't compete with the wider row content on the sides. */
                                let badge: ReactNode;
                                switch (item.status) {
                                  case 'installedNeedsSync':
                                    badge = (
                                      <Badge variant="secondary">{STRINGS.badgeEdited}</Badge>
                                    );
                                    break;
                                  case 'installedNeedsUpdate':
                                    badge = (
                                      <Badge variant="secondary">{STRINGS.badgeUpdate}</Badge>
                                    );
                                    break;
                                  case 'sharedNotInstalled':
                                    badge = <Badge variant="secondary">{STRINGS.badgeNew}</Badge>;
                                    break;
                                  case 'dblNotInstalled':
                                    badge = <Badge variant="muted">{STRINGS.badgeDbl}</Badge>;
                                    break;
                                  default:
                                    return undefined;
                                }
                                return (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="tw:inline-flex">{badge}</div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                      {actionTooltip(item)}
                                    </TooltipContent>
                                  </Tooltip>
                                );
                              })()}
                          </div>
                        </TableCell>
                        {/* Inline-action column — dedicated cell for the openInline / actionInline
                            sub-variants so the inline buttons align vertically across rows. */}
                        {hasInlineActionColumn && (
                          <TableCell
                            className="tw:w-1 tw:ps-0 tw:pe-2"
                            onClick={(e) => e.stopPropagation()}
                            role="presentation"
                          >
                            {outerOpenInline && isLocallyInstalled(item.status) && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="tw:h-6 tw:bg-muted"
                                disabled={rowInFlight}
                                onClick={() => onItemAction(item, { kind: 'open' })}
                              >
                                {STRINGS.open}
                              </Button>
                            )}
                            {outerActionInline &&
                              (() => {
                                const isPrimaryVariant =
                                  kind === 'update' ||
                                  kind === 'sync' ||
                                  kind === 'get' ||
                                  kind === 'install';
                                return (
                                  <Button
                                    size="sm"
                                    disabled={rowInFlight}
                                    variant={isPrimaryVariant ? 'default' : 'ghost'}
                                    className={cn('tw:h-6', kind === 'open' ? 'tw:bg-muted' : '')}
                                    onClick={() => onItemAction(item, { kind })}
                                  >
                                    {rowInFlight ? (
                                      <Spinner className="tw:h-4" />
                                    ) : (
                                      actionLabel(kind)
                                    )}
                                  </Button>
                                );
                              })()}
                          </TableCell>
                        )}
                        <TableCell className="tw:hidden tw:wrap-anywhere tw:whitespace-normal tw:md:!table-cell">
                          {item.fullName}
                        </TableCell>
                        <TableCell className="tw:hidden tw:sm:!table-cell">
                          <div className="tw:flex tw:items-center tw:gap-1">
                            {myLanguages.has(item.language) && (
                              <Star className="tw:h-3 tw:w-3 tw:text-muted-foreground" />
                            )}
                            {item.language}
                          </div>
                        </TableCell>
                        <TableCell className="tw:hidden tw:lg:!table-cell">
                          {TYPE_LABEL[item.type]}
                        </TableCell>
                        <TableCell className="tw:hidden tw:xl:!table-cell">
                          {formatLastUsed(item.lastUsedIso, relativeFormatter)}
                        </TableCell>
                        <TableCell className="tw:px-2">
                          <div className="tw:flex tw:items-center tw:gap-1">
                            {outerOpenPrimary ? (
                              /* openPrimary/actionInline sub-variants: the right-side button is
                                 always Open. Disabled for rows that aren't locally installed;
                                 the state-changing action moves into the overflow menu below. */
                              <Button
                                size="sm"
                                variant="ghost"
                                className="tw:h-7 tw:bg-muted"
                                disabled={rowInFlight || !isLocallyInstalled(item.status)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onItemAction(item, { kind: 'open' });
                                }}
                              >
                                {rowInFlight ? <Spinner className="tw:h-4" /> : STRINGS.open}
                              </Button>
                            ) : (
                              primaryButton(item)
                            )}
                            {/* Push the overflow menu to the far right of the action cell, while
                                the primary action button stays left-aligned. Rows without an
                                overflow menu leave the right side empty. Stopping propagation
                                keeps the row-level click from also toggling the selection when
                                the user opens the menu. */}
                            <div
                              className="tw:ms-auto"
                              onClick={(e) => e.stopPropagation()}
                              role="presentation"
                            >
                              {outerOpenPrimary
                                ? (() => {
                                    // Ellipsis for the openPrimary/actionInline sub-variants:
                                    // state action (install/update/sync/get) + Remove for
                                    // installed resources. Nothing to show when the row has no
                                    // state action AND isn't removable.
                                    const overflowKinds: UnifiedItemAction['kind'][] = [];
                                    if (kind !== 'open') overflowKinds.push(kind);
                                    if (
                                      item.status === 'installedResource' ||
                                      item.status === 'installedNeedsUpdate'
                                    )
                                      overflowKinds.push('remove');
                                    if (overflowKinds.length === 0) return undefined;
                                    return (
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="tw:h-7 tw:w-7"
                                          >
                                            <Ellipsis className="tw:h-4 tw:w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          {overflowKinds.map((k) => (
                                            <DropdownMenuItem
                                              key={k}
                                              onClick={() => {
                                                if (k === 'remove') {
                                                  setPendingRemove(item);
                                                  return;
                                                }
                                                onItemAction(item, { kind: k });
                                              }}
                                            >
                                              {actionLabel(k)}
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    );
                                  })()
                                : overflowMenu(item)}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            {/* Loading-more affordance: only meaningful when DBL rows can appear in the inline
                list. The downloadMore variant hides DBL rows entirely, so paging in more DBL
                pages here would show nothing — the "Download more" button below is the
                replacement entry point for that catalog. */}
            {hasMore &&
              !isDownloadMoreVariant &&
              displayedItems.length > 0 &&
              !presetStatusFilter &&
              hoveredBatchKind === undefined && (
                <div className="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:py-4 tw:text-muted-foreground">
                  <Spinner className="tw:h-4" />
                  <Label className="tw:text-xs tw:text-muted-foreground">
                    {STRINGS.loadingMore}
                  </Label>
                </div>
              )}
            {/* "Download more" pinned below the populated table in the downloadMore variant. The
                trailing count is `dblMatchingCount` — the number of DBL rows matching the current
                outer search/type/language filter, computed globally over `items` so the user sees
                the true remaining-on-DBL size before opening the modal. Suppressed while a batch
                button is hovered (the table is showing a batch-preview overlay and any UI outside
                the preview scope would just add noise). */}
            {isDownloadMoreVariant &&
              displayedItems.length > 0 &&
              hoveredBatchKind === undefined && (
                <div className="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:py-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={openDownloadModal}
                        disabled={dblAvailableCount === 0}
                      >
                        {STRINGS.downloadPrefix} {STRINGS.downloadTypeResourcesPlural}
                        {dblAvailableCount !== undefined && (
                          <span className="tw:ms-2 tw:text-muted-foreground">
                            {dblAvailableCount} {STRINGS.downloadAvailableSuffix}
                          </span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {dblAvailableCount === 0
                        ? STRINGS.downloadMoreZero
                        : STRINGS.downloadMoreTooltip}
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
          </CardContent>
        )}

        {(() => {
          // Count selections that are currently outside the filtered/sorted view. Batch buttons
          // in the footer act on the whole selection (visible or not), so surfacing this so the
          // user isn't surprised when a batch touches rows they can't see. Suppressed when:
          //   - a batch button is being hovered (table already shows the exact scope), OR
          //   - the list is empty (the "no matches" placeholder already tells the same story more
          //     clearly, so a second warning would be noise).
          if (hoveredBatchKind !== undefined) return undefined;
          if (displayedItems.length === 0) return undefined;
          const visibleIds = new Set(displayedItems.map((item) => item.id));
          const hiddenSelectedCount = Array.from(selectedIds).filter(
            (id) => !visibleIds.has(id),
          ).length;
          if (hiddenSelectedCount === 0) return undefined;
          return (
            /* -mb-4 cancels the Card's default `gap-4` between its direct children so the banner
               sits flush with the footer, reading as one composite bar. The X button next to it
               clears every filter so the hidden selections become visible — the fastest way out
               of the "why are my batch actions touching rows I can't see?" surprise. */
            <div className="tw:-mb-4 tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:gap-2 tw:border-t tw:bg-muted tw:px-3 tw:py-2 tw:text-xs tw:text-muted-foreground">
              <span>
                {hiddenSelectedCount}{' '}
                {hiddenSelectedCount === 1
                  ? STRINGS.hiddenSelectedSingular
                  : STRINGS.hiddenSelectedPlural}
              </span>
              <Button variant="ghost" size="sm" className="tw:h-6" onClick={clearFilters}>
                <X className="tw:h-3.5 tw:w-3.5" />
                {STRINGS.clearAll}
              </Button>
            </div>
          );
        })()}

        {(() => {
          // Extract the three footer chunks so the wide (single-row, 3-col) and narrow (two-row:
          // batch on top, selection + count below) layouts can share the exact same content.
          // downloadMore variant: the tri-state header checkbox already covers clearing the
          // selection, so the footer just names the count. Other variants keep the trailing X
          // as a redundant fast-path.
          const selectionContent = selectedIds.size > 0 && (
            <div className="tw:flex tw:items-center tw:gap-2">
              <Label className="tw:text-xs">
                {selectedIds.size} {STRINGS.selectionSuffix}
              </Label>
              {!isDownloadMoreVariant && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="tw:h-7 tw:w-7 tw:bg-muted"
                      onClick={() => setSelectedIds(new Set())}
                      aria-label={STRINGS.clearSelectionAria}
                    >
                      <X className="tw:h-4 tw:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{STRINGS.clearSelection}</TooltipContent>
                </Tooltip>
              )}
            </div>
          );
          // Batch actions for the current selection. One button per needed kind (Get, Sync,
          // Update, Install) — any subset can appear depending on what's in the selection. The
          // Open button, when applicable, is rendered last so it sits at the right. Hidden when
          // the list is empty ("no filter matches") since there's nothing to act on.
          const batchContent = (
            <div className="tw:flex tw:items-center tw:justify-center tw:gap-2">
              {/* Open sits leftmost — it acts on the user's existing library and reads as the
                  "safe" action; the state-changing batches (Get/Sync/Update/Install) come to
                  its right. */}
              {displayedItems.length > 0 &&
                canOpenSome &&
                (() => {
                  const affectedOpenCount = items.filter(
                    (item) => selectedIds.has(item.id) && isLocallyInstalled(item.status),
                  ).length;
                  const isRunning = pendingBatch?.kind === 'open';
                  return (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="tw:bg-muted"
                      disabled={pendingBatch !== undefined}
                      onMouseEnter={() => enterHover('open')}
                      onMouseLeave={leaveHover}
                      onClick={runOpenBatch}
                    >
                      {isRunning ? <Spinner className="tw:h-4" /> : STRINGS.open}
                      <span className="tw:ms-1">{affectedOpenCount}</span>
                    </Button>
                  );
                })()}
              {displayedItems.length > 0 &&
                neededKinds.map((kind) => {
                  const affectedCount = items.filter(
                    (item) => selectedIds.has(item.id) && primaryActionFor(item.status) === kind,
                  ).length;
                  const isRunning = pendingBatch?.kind === kind;
                  return (
                    // Only mouse events drive the hover preview — onFocus/onBlur were also
                    // wired here but caused a flicker: after the collapse animation the button
                    // could briefly gain/lose focus (or the pointer cross the transition
                    // pseudo-element), toggling the state on/off in a loop.
                    <Button
                      key={kind}
                      size="sm"
                      disabled={pendingBatch !== undefined}
                      onMouseEnter={() => enterHover(kind)}
                      onMouseLeave={leaveHover}
                      onClick={() =>
                        runBatchAction(kind, (item) => primaryActionFor(item.status) === kind)
                      }
                    >
                      {isRunning ? <Spinner className="tw:h-4" /> : actionLabel(kind)}
                      <span className="tw:ms-1">{affectedCount}</span>
                    </Button>
                  );
                })}
            </div>
          );
          // Summary line. Three shapes, picked from most-specific to least:
          //   - downloadMore variant → "x of y (+z) items". DBL rows are hidden from the inline
          //     list, so both halves of the ratio are stable regardless of preset state:
          //     y = on-computer, z = new on the S/R server. Takes precedence over the preset
          //     shape below because the counts remain meaningful even under a preset filter.
          //   - Preset filter active (non-downloadMore) → "x items". The preset narrows to a
          //     bounded local + S/R subset, so contrasting against the total no longer means
          //     anything useful.
          //   - Otherwise → "x of Y+ items", the original mixed-catalog framing where the `+`
          //     reflects that more DBL rows may still be fetched.
          const countContent = (
            <Label className="tw:text-xs tw:text-muted-foreground">
              {(() => {
                if (isDownloadMoreVariant)
                  return (
                    <>
                      {displayedItems.length} {STRINGS.ofSuffix} {onComputerCount} (+
                      {sharedNotInstalledCount}) {STRINGS.itemsSuffix}
                    </>
                  );
                if (presetStatusFilter)
                  return (
                    <>
                      {displayedItems.length} {STRINGS.itemsSuffix}
                    </>
                  );
                return (
                  <>
                    {displayedItems.length} {STRINGS.ofSuffix} {items.length}
                    {hasMore ? '+' : ''} {STRINGS.itemsSuffix}
                  </>
                );
              })()}
            </Label>
          );
          if (isNarrow) {
            return (
              <CardFooter className="tw:flex tw:shrink-0 tw:flex-col tw:gap-2 tw:border-t tw:p-3">
                {batchContent}
                <div className="tw:flex tw:w-full tw:items-center tw:justify-between tw:gap-2">
                  <div>{selectionContent}</div>
                  {countContent}
                </div>
              </CardFooter>
            );
          }
          return (
            <CardFooter className="tw:grid tw:shrink-0 tw:grid-cols-3 tw:items-center tw:gap-2 tw:border-t tw:p-3">
              <div>{selectionContent}</div>
              {batchContent}
              <div className="tw:justify-self-end">{countContent}</div>
            </CardFooter>
          );
        })()}

        {/* Download-more modal (downloadMore variant only). A near-full-screen browser over the
            DBL catalog: independent search + type + language filters (matching the S/R
            integration chrome), one row per DBL item, checkbox multi-select mirroring the Home
            table, and per-row Install buttons. Clearing modal selection is scoped to the modal
            so the Home selection outside is untouched. Once installed, an item transitions to
            `installedResource` in the parent `items` array via the same onItemAction path any
            other row uses. */}
        <Dialog
          open={isDownloadModalOpen}
          onOpenChange={(open) => {
            setIsDownloadModalOpen(open);
            // Wipe modal-scoped selection, toggle state, sort, and hover-preview on close so a
            // fresh open starts clean — the modal filters are re-seeded from the outer view on
            // open, and inheriting stale state from a previous session would surprise the user.
            if (!open) {
              setModalSelectedIds(new Set());
              setModalOnlyMyLanguages(false);
              setModalSortConfig({ key: 'action', direction: 'ascending' });
              setModalHoveredBatch(undefined);
              setModalPendingBatch(undefined);
              // `modalRowUi` intentionally persists across opens — the tab bar lives outside
              // the modal so the user's sub-variant choice should stay the same regardless of
              // whether the modal is currently open.
            }
          }}
        >
          <DialogContent
            className="tw:h-[90vh] tw:max-h-[90vh] tw:!max-w-[min(1100px,calc(100%-2rem))] tw:!p-0"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <DialogHeader className="tw:shrink-0 tw:px-4 tw:pt-4">
              <DialogTitle>{STRINGS.downloadModalTitle}</DialogTitle>
              <DialogDescription>{STRINGS.downloadModalDescription}</DialogDescription>
            </DialogHeader>
            {(() => {
              // Modal scope: every "resource" (i.e. anything that isn't a Project). Downloadable
              // DBL rows appear alongside already-installed resources and update-available
              // resources so the modal is a single place to manage the resource library — the
              // list survives installs (the row transitions to `installedResource` in-place)
              // and installed rows carry a Remove action via the row's overflow menu.
              const resourceItems = items.filter((item) => item.type !== 'Project');
              // Modal-scoped inline-action column: present in the openInline / actionInline
              // sub-variants so their inline buttons align vertically across rows.
              const modalHasInlineActionColumn =
                isDownloadMoreTabsVariant &&
                (modalRowUi === 'openInline' || modalRowUi === 'actionInline');
              const modalTypeOptions: MultiSelectComboBoxEntry[] = ALL_UNIFIED_ITEM_TYPES.filter(
                (type) => type !== 'Project' && resourceItems.some((item) => item.type === type),
              ).map((type) => ({
                value: type,
                label: TYPE_LABEL[type],
                secondaryLabel: String(resourceItems.filter((item) => item.type === type).length),
              }));
              const modalLanguageOptions: MultiSelectComboBoxEntry[] = (() => {
                const localLanguages = new Set(
                  items
                    .filter((item) => isLocallyInstalled(item.status))
                    .map((item) => item.language),
                );
                const uniqueLanguages = Array.from(
                  new Set(resourceItems.map((item) => item.language)),
                );
                const sortedLanguages = uniqueLanguages.sort((a, b) => {
                  const aStar = localLanguages.has(a);
                  const bStar = localLanguages.has(b);
                  if (aStar && !bStar) return -1;
                  if (!aStar && bStar) return 1;
                  return a.localeCompare(b);
                });
                return sortedLanguages.map((language) => ({
                  label: language,
                  value: language,
                  starred: localLanguages.has(language),
                  secondaryLabel: String(
                    resourceItems.filter((item) => item.language === language).length,
                  ),
                }));
              })();
              const needle = modalTextFilter.trim().toLowerCase();
              const modalFilteredUnsorted = resourceItems.filter((item) => {
                if (needle) {
                  const hay = [item.shortName, item.fullName, item.language, TYPE_LABEL[item.type]]
                    .join(' ')
                    .toLowerCase();
                  if (!hay.includes(needle)) return false;
                }
                if (modalSelectedTypes.length > 0 && !modalSelectedTypes.includes(item.type))
                  return false;
                if (
                  modalSelectedLanguages.length > 0 &&
                  !modalSelectedLanguages.includes(item.language)
                )
                  return false;
                return true;
              });
              // Apply the modal's own sort. Only the columns the modal actually renders are
              // supported; anything else falls back to a stable no-op comparator.
              const modalFiltered = (() => {
                const clone = [...modalFilteredUnsorted];
                const cmpStr = (a: string, b: string) => a.localeCompare(b);
                clone.sort((a, b) => {
                  let cmp = 0;
                  switch (modalSortConfig.key) {
                    case 'shortName':
                      cmp = cmpStr(a.shortName, b.shortName);
                      break;
                    case 'fullName':
                      cmp = cmpStr(a.fullName, b.fullName);
                      break;
                    case 'language':
                      cmp = cmpStr(a.language, b.language);
                      break;
                    case 'type':
                      cmp = cmpStr(TYPE_LABEL[a.type], TYPE_LABEL[b.type]);
                      break;
                    case 'action': {
                      // Ascending: Open (installedResource) → Update (installedNeedsUpdate) →
                      // Install (dblNotInstalled). Surfaces the user's existing library first
                      // and pushes downloadable rows to the bottom.
                      const rank: Record<UnifiedStatus, number> = {
                        installedResource: 0,
                        installedNeedsUpdate: 1,
                        dblNotInstalled: 2,
                        installedProject: 3,
                        installedNeedsSync: 3,
                        sharedNotInstalled: 3,
                      };
                      cmp = rank[a.status] - rank[b.status];
                      break;
                    }
                    default:
                      cmp = 0;
                  }
                  return modalSortConfig.direction === 'ascending' ? cmp : -cmp;
                });
                return clone;
              })();
              const handleModalSort = (key: SortKey) => {
                setModalSortConfig((prev) =>
                  prev.key === key
                    ? {
                        key,
                        direction: prev.direction === 'ascending' ? 'descending' : 'ascending',
                      }
                    : { key, direction: 'ascending' },
                );
              };
              const modalHead = (key: SortKey, label: string, className?: string) => (
                <TableHead
                  onClick={() => handleModalSort(key)}
                  className={cn('tw:cursor-default tw:px-2', className)}
                >
                  <div className="tw:flex tw:items-center tw:gap-1 tw:text-sm tw:font-normal">
                    {label}
                    {modalSortConfig.key !== key && <ChevronsUpDown size={14} />}
                    {modalSortConfig.key === key &&
                      (modalSortConfig.direction === 'ascending' ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      ))}
                  </div>
                </TableHead>
              );
              // Clear-all also drops the "Only my languages" flag — otherwise the toggle would
              // stay on while the languages it seeded are gone, leaving the switch out of sync
              // with the visible filter state.
              const modalClearFilters = () => {
                setModalTextFilter('');
                setModalSelectedTypes([]);
                setModalSelectedLanguages([]);
                setModalOnlyMyLanguages(false);
              };
              const modalActiveFilterCount =
                (modalTextFilter ? 1 : 0) +
                modalSelectedTypes.length +
                modalSelectedLanguages.length;
              const toggleModalSelected = (item: UnifiedItem) => {
                setModalSelectedIds((prev) => {
                  const next = new Set(prev);
                  if (next.has(item.id)) next.delete(item.id);
                  else next.add(item.id);
                  return next;
                });
              };
              // Split batch operations: Install acts only on DBL-not-installed rows, Update
              // acts only on already-installed rows that have a new version available. Keeping
              // them separate makes the intent explicit — the user sees exactly what each
              // button will do, and can choose to run one without the other. Already-installed
              // rows with no update in the selection are silently skipped by both.
              const modalBatchInstallIds = new Set<string>(
                resourceItems
                  .filter(
                    (item) => modalSelectedIds.has(item.id) && item.status === 'dblNotInstalled',
                  )
                  .map((item) => item.id),
              );
              const modalBatchUpdateIds = new Set<string>(
                resourceItems
                  .filter(
                    (item) =>
                      modalSelectedIds.has(item.id) && item.status === 'installedNeedsUpdate',
                  )
                  .map((item) => item.id),
              );
              // Open batch acts on any locally-available resource in the selection —
              // installedResource + installedNeedsUpdate (an update-available resource is still
              // openable at its current version). DBL-only rows are skipped.
              const modalBatchOpenIds = new Set<string>(
                resourceItems
                  .filter(
                    (item) => modalSelectedIds.has(item.id) && isLocallyInstalled(item.status),
                  )
                  .map((item) => item.id),
              );
              const modalBatchIdsFor = (kind: ModalBatchKind): Set<string> => {
                if (kind === 'install') return modalBatchInstallIds;
                if (kind === 'update') return modalBatchUpdateIds;
                return modalBatchOpenIds;
              };
              const runModalBatch = async (kind: ModalBatchKind) => {
                if (modalPendingBatch !== undefined) return;
                const ids = modalBatchIdsFor(kind);
                const matched = resourceItems.filter((item) => ids.has(item.id));
                if (matched.length === 0) return;
                // Freeze the collapsed preview to this batch's scope for the whole run — even
                // if a row's status changes mid-flight, it stays in the "matched" bucket until
                // every dispatched item resolves.
                setModalPendingBatch({ kind, ids: new Set(matched.map((item) => item.id)) });
                setModalHoveredBatch(kind);
                await Promise.all(
                  matched.map((item) =>
                    Promise.resolve(onItemAction(item, { kind, batch: true })).catch(() => {}),
                  ),
                );
                setModalPendingBatch(undefined);
                setModalHoveredBatch(undefined);
              };
              // Turning the toggle on seeds the modal's language filter with the languages of
              // the user's locally-installed items — same behavior the outer view had before
              // this variant moved it inside. Off clears them.
              const handleModalOnlyMyLanguagesToggle = (checked: boolean) => {
                if (checked) {
                  setModalSelectedLanguages(
                    sortLanguages(Array.from(myLanguages)).filter((lang) =>
                      resourceItems.some((item) => item.language === lang),
                    ),
                  );
                  setModalOnlyMyLanguages(true);
                } else {
                  setModalSelectedLanguages([]);
                  setModalOnlyMyLanguages(false);
                }
              };
              // Manual language edits break the toggle's invariant — flip it off the moment the
              // user starts curating.
              const handleModalLanguagesChange = (next: string[]) => {
                setModalSelectedLanguages(next);
                if (modalOnlyMyLanguages) setModalOnlyMyLanguages(false);
              };
              return (
                <>
                  <div className="tw:flex tw:shrink-0 tw:flex-col tw:gap-2 tw:border-b tw:px-4 tw:pb-3">
                    {/* Row 1: search takes the remaining flex space; language combobox and
                        "Only my languages" toggle live inline to its right so language-driven
                        narrowing sits next to the free-text filter it complements. */}
                    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
                      <div className="tw:min-w-64 tw:flex-1">
                        <SearchBar
                          value={modalTextFilter}
                          onSearch={setModalTextFilter}
                          placeholder={STRINGS.searchPlaceholder}
                        />
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <MultiSelectComboBox
                              entries={modalLanguageOptions.map((option) => ({
                                value: option.value,
                                label: option.label,
                                starred: option.starred,
                              }))}
                              selected={modalSelectedLanguages}
                              onChange={handleModalLanguagesChange}
                              placeholder={STRINGS.filterLanguage}
                              icon={<Globe />}
                              sortSelected
                              customSelectedText={
                                modalSelectedLanguages.length > 0
                                  ? `${STRINGS.filterLanguage} · ${modalSelectedLanguages.length}`
                                  : undefined
                              }
                            />
                          </div>
                        </TooltipTrigger>
                        {modalSelectedLanguages.length > 0 && (
                          <TooltipContent side="bottom">
                            <div className="tw:flex tw:flex-col tw:gap-0.5">
                              <div className="tw:text-xs tw:opacity-70">
                                {modalSelectedLanguages.length}{' '}
                                {modalSelectedLanguages.length === 1
                                  ? STRINGS.languageSelectedSingular
                                  : STRINGS.languageSelectedPlural}
                              </div>
                              {modalSelectedLanguages.map((lang) => (
                                <div key={lang}>{lang}</div>
                              ))}
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="tw:flex tw:items-center tw:gap-2">
                            <Switch
                              id="modal-only-my-langs"
                              checked={modalOnlyMyLanguages}
                              onCheckedChange={handleModalOnlyMyLanguagesToggle}
                              disabled={myLanguages.size === 0}
                            />
                            <Label htmlFor="modal-only-my-langs">{STRINGS.onlyMyLanguages}</Label>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          {STRINGS.onlyMyLanguagesTooltip}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {/* Row 2: type toggle buttons, then Clear filters. Placing Clear next to the
                        type buttons keeps it close to the filter it most often needs to reset —
                        row 1's filters are lightweight (single input, single combobox, single
                        switch) and are cleared inline by the user. */}
                    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
                      {modalTypeOptions.map((option) => {
                        const isSelected = modalSelectedTypes.includes(option.value);
                        return (
                          <Button
                            key={option.value}
                            variant="outline"
                            size="sm"
                            aria-pressed={isSelected}
                            data-state={isSelected ? 'on' : 'off'}
                            className="tw:data-[state=on]:bg-muted tw:data-[state=on]:text-foreground"
                            onClick={() => {
                              setModalSelectedTypes(
                                isSelected
                                  ? modalSelectedTypes.filter((t) => t !== option.value)
                                  : [...modalSelectedTypes, option.value],
                              );
                            }}
                          >
                            {typeLabelPlural(option.value)}
                            <span className="tw:ms-1 tw:text-muted-foreground">
                              {option.secondaryLabel}
                            </span>
                          </Button>
                        );
                      })}
                      {modalActiveFilterCount > 0 && (
                        // Primary variant to match the outer Home view's inline Clear filters
                        // button. Sits at the end of the type-filter row, same shape as the
                        // underlying UI so the pattern reads the same in both places.
                        <Button size="sm" className="tw:h-6 tw:text-xs" onClick={modalClearFilters}>
                          {STRINGS.clearAll}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="tw:min-h-0 tw:flex-grow tw:overflow-auto">
                    {modalFiltered.length === 0 ? (
                      <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:p-8 tw:text-center">
                        <Label className="tw:text-muted-foreground">
                          {STRINGS.downloadModalNoResults}
                        </Label>
                        {modalActiveFilterCount > 0 && (
                          <Button variant="ghost" onClick={modalClearFilters}>
                            {STRINGS.clearFiltersCta}
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Table stickyHeader>
                        <TableHeader stickyHeader>
                          <TableRow>
                            <TableHead className="tw:w-8 tw:ps-3 tw:pe-0">
                              {(() => {
                                // Header checkbox is *clear-only* in the modal — selection is
                                // made row-by-row (or via a batch button hover-preview flow),
                                // so a "Select all visible" affordance here would nudge users
                                // toward mass-selecting DBL rows they haven't reviewed. When
                                // nothing is selected the cell is empty; otherwise the checkbox
                                // shows as checked/indeterminate and clicking clears.
                                if (modalSelectedIds.size === 0) return undefined;
                                const allSelected =
                                  modalFiltered.length > 0 &&
                                  modalFiltered.every((item) => modalSelectedIds.has(item.id));
                                const someSelected = !allSelected;
                                return (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="tw:relative tw:inline-flex">
                                        <Checkbox
                                          checked={allSelected}
                                          onCheckedChange={() => setModalSelectedIds(new Set())}
                                          aria-label={STRINGS.headerClearAll}
                                        />
                                        {someSelected && (
                                          <Minus
                                            className="tw:pointer-events-none tw:absolute tw:inset-0 tw:m-auto tw:size-3"
                                            aria-hidden
                                          />
                                        )}
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>{STRINGS.headerClearAll}</TooltipContent>
                                  </Tooltip>
                                );
                              })()}
                            </TableHead>
                            {modalHead('shortName', STRINGS.shortName, 'tw:ps-4')}
                            {/* Empty header for the modal's inline-action column — only in
                                the openInline / actionInline sub-variants. */}
                            {modalHasInlineActionColumn && <TableHead className="tw:w-1" />}
                            {modalHead('fullName', STRINGS.fullName, 'tw:hidden tw:md:!table-cell')}
                            {modalHead('language', STRINGS.language, 'tw:hidden tw:sm:!table-cell')}
                            {modalHead('type', STRINGS.type, 'tw:hidden tw:lg:!table-cell')}
                            {modalHead('action', STRINGS.action)}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(() => {
                            // Batch-hover preview: collapse to only selected rows, with the
                            // matching subset (for the specific batch button being hovered) at
                            // the top; non-matching selections fold in below, rendered as
                            // disabled (grayscale + line-through + no pointer events) so it's
                            // clear they'll be skipped by that click. Hidden-by-filter
                            // selections are also included so the preview covers the entire
                            // selection regardless of the modal's current filter.
                            if (!modalHoveredBatch) return modalFiltered;
                            // Match set is FROZEN to the pending batch's ids while running so
                            // rows that already flipped statuses stay in the "matched" bucket.
                            const matchingIds = modalPendingBatch
                              ? modalPendingBatch.ids
                              : modalBatchIdsFor(modalHoveredBatch);
                            const visibleIdsForHover = new Set(
                              modalFiltered.map((item) => item.id),
                            );
                            const allSelectedRows = [
                              ...modalFiltered.filter((item) => modalSelectedIds.has(item.id)),
                              ...resourceItems.filter(
                                (item) =>
                                  modalSelectedIds.has(item.id) && !visibleIdsForHover.has(item.id),
                              ),
                            ];
                            return [
                              ...allSelectedRows.filter((item) => matchingIds.has(item.id)),
                              ...allSelectedRows.filter((item) => !matchingIds.has(item.id)),
                            ];
                          })().map((item) => {
                            const inFlight = inFlightIds.includes(item.id);
                            const isModalSelected = modalSelectedIds.has(item.id);
                            const matchingIdsForHover = (() => {
                              if (modalPendingBatch) return modalPendingBatch.ids;
                              if (modalHoveredBatch) return modalBatchIdsFor(modalHoveredBatch);
                              return undefined;
                            })();
                            const isDimmedByHover =
                              matchingIdsForHover !== undefined &&
                              !matchingIdsForHover.has(item.id);
                            // Sub-variant flags. `useOpenPrimary` means the right-side row
                            // button is always Open; state changes move to the ellipsis menu.
                            // `useActionInline` additionally replaces the state badge next to
                            // the short name with the row's individual state-based action.
                            // `useOpenInline` keeps the state-based button on the right and
                            // adds a small inline Open next to the short name for locally-
                            // available rows.
                            const useOpenPrimary =
                              isDownloadMoreTabsVariant &&
                              (modalRowUi === 'openPrimary' || modalRowUi === 'actionInline');
                            const useOpenInline =
                              isDownloadMoreTabsVariant && modalRowUi === 'openInline';
                            const useActionInline =
                              isDownloadMoreTabsVariant && modalRowUi === 'actionInline';
                            // State-based row action derived from the row's status.
                            const stateBasedKind: UnifiedItemAction['kind'] = (() => {
                              if (item.status === 'installedNeedsUpdate') return 'update';
                              if (item.status === 'dblNotInstalled') return 'install';
                              return 'open';
                            })();
                            const stateBasedLabel = (() => {
                              if (stateBasedKind === 'update') return STRINGS.downloadModalUpdate;
                              if (stateBasedKind === 'install') return STRINGS.downloadModalInstall;
                              return STRINGS.open;
                            })();
                            return (
                              <TableRow
                                key={item.id}
                                onClick={(e) => {
                                  if (e.detail > 1) return;
                                  toggleModalSelected(item);
                                }}
                                onDoubleClick={() => onItemAction(item, { kind: 'install' })}
                                onMouseDown={(e) => {
                                  if (e.detail > 1) e.preventDefault();
                                }}
                                className={cn('tw:cursor-default', {
                                  // Suppress the "selected" highlight on dimmed rows so the
                                  // disabled state reads as inert, not just muted.
                                  'tw:bg-muted/40': isModalSelected && !isDimmedByHover,
                                  'tw:pointer-events-none tw:line-through tw:opacity-50 tw:grayscale':
                                    isDimmedByHover,
                                })}
                              >
                                <TableCell
                                  className="tw:ps-3 tw:pe-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Checkbox
                                    checked={isModalSelected}
                                    onCheckedChange={() => toggleModalSelected(item)}
                                    aria-label={item.shortName}
                                  />
                                </TableCell>
                                <TableCell className="tw:ps-4">
                                  <div className="tw:flex tw:items-center tw:gap-3">
                                    <BookOpen className="tw:shrink-0" size={16} />
                                    <span className="tw:font-medium tw:whitespace-nowrap">
                                      {item.shortName}
                                    </span>
                                    {/* State badge is only shown in the openPrimary sub-variant.
                                        `actionInline` replaces it with an inline action button
                                        in the dedicated column; `openInline` conveys state via
                                        the inline Open + the right-side state-based button. */}
                                    {!useActionInline &&
                                      !useOpenInline &&
                                      item.status === 'installedResource' && (
                                        <Badge variant="muted">
                                          {STRINGS.downloadModalInstalled}
                                        </Badge>
                                      )}
                                    {!useActionInline &&
                                      !useOpenInline &&
                                      item.status === 'installedNeedsUpdate' && (
                                        <Badge variant="secondary">{STRINGS.badgeUpdate}</Badge>
                                      )}
                                  </div>
                                </TableCell>
                                {/* Dedicated inline-action column, so the inline buttons align
                                    vertically across rows for the openInline / actionInline
                                    sub-variants. */}
                                {modalHasInlineActionColumn && (
                                  <TableCell
                                    className="tw:w-1 tw:ps-0 tw:pe-2"
                                    onClick={(e) => e.stopPropagation()}
                                    role="presentation"
                                  >
                                    {useOpenInline && isLocallyInstalled(item.status) && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="tw:h-6 tw:bg-muted"
                                        disabled={inFlight}
                                        onClick={() => onItemAction(item, { kind: 'open' })}
                                      >
                                        {STRINGS.open}
                                      </Button>
                                    )}
                                    {useActionInline && (
                                      <Button
                                        size="sm"
                                        disabled={inFlight}
                                        variant={stateBasedKind === 'open' ? 'ghost' : 'default'}
                                        className={cn(
                                          stateBasedKind === 'open'
                                            ? 'tw:h-6 tw:bg-muted'
                                            : 'tw:h-6',
                                        )}
                                        onClick={() => onItemAction(item, { kind: stateBasedKind })}
                                      >
                                        {stateBasedLabel}
                                        {item.sizeMb && item.status === 'dblNotInstalled' ? (
                                          <span className="tw:ms-1 tw:text-xs tw:opacity-70">
                                            {item.sizeMb} {STRINGS.sizeMbSuffix}
                                          </span>
                                        ) : undefined}
                                      </Button>
                                    )}
                                  </TableCell>
                                )}
                                <TableCell className="tw:hidden tw:wrap-anywhere tw:whitespace-normal tw:md:!table-cell">
                                  {item.fullName}
                                </TableCell>
                                <TableCell className="tw:hidden tw:sm:!table-cell">
                                  {item.language}
                                </TableCell>
                                <TableCell className="tw:hidden tw:lg:!table-cell">
                                  {TYPE_LABEL[item.type]}
                                </TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()} role="presentation">
                                  {(() => {
                                    // Right-side action:
                                    //   Base + openInline (#2)       → state-based button.
                                    //   openPrimary (#1) + actionInline (#3) → always Open
                                    //     (disabled for DBL rows), with the state action moved
                                    //     into the ellipsis alongside Remove.
                                    const primaryKind: UnifiedItemAction['kind'] = useOpenPrimary
                                      ? 'open'
                                      : stateBasedKind;
                                    const primaryLabel = (() => {
                                      if (primaryKind === 'update')
                                        return STRINGS.downloadModalUpdate;
                                      if (primaryKind === 'install')
                                        return STRINGS.downloadModalInstall;
                                      return STRINGS.open;
                                    })();
                                    const primaryDisabled =
                                      inFlight ||
                                      (primaryKind === 'open' && !isLocallyInstalled(item.status));
                                    const overflowKinds: UnifiedItemAction['kind'][] = (() => {
                                      if (useOpenPrimary) {
                                        // Ellipsis carries the state action (install/update)
                                        // and Remove for installed rows. DBL rows list just
                                        // Install.
                                        const kinds: UnifiedItemAction['kind'][] = [];
                                        if (stateBasedKind !== 'open') kinds.push(stateBasedKind);
                                        if (
                                          item.status === 'installedResource' ||
                                          item.status === 'installedNeedsUpdate'
                                        )
                                          kinds.push('remove');
                                        return kinds;
                                      }
                                      // Default modal behavior: Update rows carry both Open
                                      // (jump to the current install) and Remove; installed
                                      // rows carry just Remove; DBL rows have no overflow.
                                      if (item.status === 'installedNeedsUpdate')
                                        return ['open', 'remove'];
                                      if (item.status === 'installedResource') return ['remove'];
                                      return [];
                                    })();
                                    return (
                                      <div className="tw:flex tw:items-center tw:gap-1">
                                        <Button
                                          size="sm"
                                          disabled={primaryDisabled}
                                          variant={primaryKind === 'open' ? 'ghost' : 'default'}
                                          className={cn(
                                            primaryKind === 'open' ? 'tw:h-7 tw:bg-muted' : '',
                                          )}
                                          onClick={() => onItemAction(item, { kind: primaryKind })}
                                        >
                                          {inFlight ? (
                                            <Spinner className="tw:h-4" />
                                          ) : (
                                            <>
                                              {primaryLabel}
                                              {item.sizeMb && item.status === 'dblNotInstalled' ? (
                                                <span className="tw:ms-1 tw:text-xs tw:opacity-70">
                                                  {item.sizeMb} {STRINGS.sizeMbSuffix}
                                                </span>
                                              ) : undefined}
                                            </>
                                          )}
                                        </Button>
                                        {overflowKinds.length > 0 && (
                                          <div className="tw:ms-auto">
                                            <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="tw:h-7 tw:w-7"
                                                >
                                                  <Ellipsis className="tw:h-4 tw:w-4" />
                                                </Button>
                                              </DropdownMenuTrigger>
                                              {/* Dropdown menus render via portal at
                                                  document.body with a base tw:z-50, which is
                                                  below the modal's Z_INDEX_MODAL (500). Bump
                                                  to 550 (matching Z_INDEX_TOOLTIP) so the menu
                                                  paints above the dialog. `!` guarantees the
                                                  override beats the base class regardless of
                                                  the compiled Tailwind order. */}
                                              <DropdownMenuContent
                                                align="end"
                                                className="tw:!z-[550]"
                                              >
                                                {overflowKinds.map((kind) => (
                                                  <DropdownMenuItem
                                                    key={kind}
                                                    onClick={() => {
                                                      if (kind === 'remove') {
                                                        setPendingRemove(item);
                                                        return;
                                                      }
                                                      onItemAction(item, { kind });
                                                    }}
                                                  >
                                                    {actionLabel(kind)}
                                                  </DropdownMenuItem>
                                                ))}
                                              </DropdownMenuContent>
                                            </DropdownMenu>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })()}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                  {/* Custom footer bar — DialogFooter is unsuitable here because it has -mx-4/-mb-4
                      negative margins that assume DialogContent's default p-4. This modal sets
                      p-0 for edge-to-edge search + table layout, so those negative margins would
                      push the footer past the container edge and clip the Done button. This div
                      pins to the container edges cleanly. */}
                  <div className="tw:flex tw:shrink-0 tw:flex-wrap tw:items-center tw:justify-end tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:px-4 tw:py-3">
                    <Label className="tw:me-auto tw:text-xs tw:text-muted-foreground">
                      {modalFiltered.length} {STRINGS.ofSuffix} {resourceItems.length}{' '}
                      {STRINGS.downloadModalCount}
                      {modalSelectedIds.size > 0 && (
                        <>
                          {' '}
                          ({modalSelectedIds.size} {STRINGS.selectionSuffix})
                        </>
                      )}
                    </Label>
                    {/* Batch buttons — Open (locally-available rows) sits leftmost since it
                        acts on the user's existing library; Update then Install to the right
                        for downloads/refreshes. Each button has its own hover preview that
                        filters the table to only the selected rows that button will run on. */}
                    {modalBatchOpenIds.size > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="tw:bg-muted"
                        disabled={modalPendingBatch !== undefined}
                        onClick={() => runModalBatch('open')}
                        onMouseEnter={() => enterModalBatchHover('open')}
                        onMouseLeave={leaveModalBatchHover}
                      >
                        {modalPendingBatch?.kind === 'open' ? (
                          <Spinner className="tw:h-4" />
                        ) : (
                          STRINGS.open
                        )}
                        <span className="tw:ms-1">{modalBatchOpenIds.size}</span>
                      </Button>
                    )}
                    {modalBatchUpdateIds.size > 0 && (
                      <Button
                        size="sm"
                        disabled={modalPendingBatch !== undefined}
                        onClick={() => runModalBatch('update')}
                        onMouseEnter={() => enterModalBatchHover('update')}
                        onMouseLeave={leaveModalBatchHover}
                      >
                        {modalPendingBatch?.kind === 'update' ? (
                          <Spinner className="tw:h-4" />
                        ) : (
                          STRINGS.downloadModalUpdate
                        )}
                        <span className="tw:ms-1">{modalBatchUpdateIds.size}</span>
                      </Button>
                    )}
                    {modalBatchInstallIds.size > 0 && (
                      <Button
                        size="sm"
                        disabled={modalPendingBatch !== undefined}
                        onClick={() => runModalBatch('install')}
                        onMouseEnter={() => enterModalBatchHover('install')}
                        onMouseLeave={leaveModalBatchHover}
                      >
                        {modalPendingBatch?.kind === 'install' ? (
                          <Spinner className="tw:h-4" />
                        ) : (
                          STRINGS.downloadModalInstall
                        )}
                        <span className="tw:ms-1">{modalBatchInstallIds.size}</span>
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => setIsDownloadModalOpen(false)}>
                      {STRINGS.downloadModalDone}
                    </Button>
                  </div>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>

        <Dialog
          open={pendingRemove !== undefined}
          onOpenChange={(open) => {
            if (!open) setPendingRemove(undefined);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {pendingRemove
                  ? `${STRINGS.removeConfirmTitlePrefix} ${pendingRemove.shortName} - ${pendingRemove.fullName}`
                  : STRINGS.removeConfirmTitlePrefix}
              </DialogTitle>
              <DialogDescription>{STRINGS.removeConfirmBody}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setPendingRemove(undefined)}>
                {STRINGS.cancel}
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (pendingRemove) onItemAction(pendingRemove, { kind: 'remove' });
                  setPendingRemove(undefined);
                }}
              >
                {STRINGS.confirmRemove}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </TooltipProvider>
  );
}
