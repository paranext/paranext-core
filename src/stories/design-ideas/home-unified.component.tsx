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
  presetLabel: 'Select & filter:',
  presetEdited: 'Edited',
  presetEditedTooltip: 'Projects edited by you or others',
  presetUpdated: 'Updated',
  presetUpdatedTooltip: 'Updated resources',
  presetNew: 'New',
  presetNewTooltip: 'Projects new for you',
  presetOnComputer: 'On this computer',
  presetOnComputerTooltip: 'Projects and resources installed on this computer',
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
  /**
   * Layout variant. `'default'` keeps the original two-combobox header. `'buttons'` swaps the type
   * combobox for a row of big toggle buttons, replaces the language filter with a compact
   * count-only combobox, shows status badges next to each item's short name, and exposes "Select
   * All / None / Edited / New" preselection buttons above the table.
   */
  variant?: 'default' | 'buttons';
};

type SortKey = 'shortName' | 'fullName' | 'language' | 'type' | 'lastUsed' | 'status' | 'action';
type SortConfig = { key: SortKey; direction: 'ascending' | 'descending' };

const TYPE_LABEL: Record<UnifiedItemType, string> = {
  Project: STRINGS.typeProject,
  ScriptureResource: STRINGS.typeScripture,
  CommentaryResource: STRINGS.typeCommentary,
  EnhancedResource: STRINGS.typeER,
  SourceLanguageResource: STRINGS.typeSLR,
  XmlResource: STRINGS.typeXR,
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
}: HomeUnifiedProps) {
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

  const handleContentScroll = (e: UIEvent<HTMLDivElement>) => {
    // Skip fetch-more while a batch button is being hovered — the table is showing a preview of
    // the click's scope, not the actual list, so pulling more DBL results in would be misleading.
    if (!hasMore || !onFetchMore || presetStatusFilter || hoveredBatchKind !== undefined) return;
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) {
      onFetchMore();
    }
  };

  const typeOptions: MultiSelectComboBoxEntry[] = useMemo(() => {
    const count = (type: UnifiedItemType) =>
      String(items.filter((item) => item.type === type).length);
    const allTypes: UnifiedItemType[] = [
      'Project',
      'ScriptureResource',
      'CommentaryResource',
      'EnhancedResource',
      'SourceLanguageResource',
      'XmlResource',
    ];
    return allTypes
      .filter((type) => items.some((item) => item.type === type))
      .map((type) => ({
        value: type,
        label: TYPE_LABEL[type],
        secondaryLabel: count(type),
      }));
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
  const enterHover = (kind: BatchHoverKind) => {
    if (hoverLeaveTimeoutRef.current !== undefined) {
      clearTimeout(hoverLeaveTimeoutRef.current);
      hoverLeaveTimeoutRef.current = undefined;
    }
    setHoveredBatchKind(kind);
  };
  const leaveHover = () => {
    if (hoverLeaveTimeoutRef.current !== undefined) {
      clearTimeout(hoverLeaveTimeoutRef.current);
    }
    hoverLeaveTimeoutRef.current = setTimeout(() => {
      setHoveredBatchKind(undefined);
      hoverLeaveTimeoutRef.current = undefined;
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
  const runBatchAction = (
    kind: Exclude<UnifiedItemAction['kind'], 'remove'>,
    predicate: (item: UnifiedItem) => boolean,
  ) => {
    setHoveredBatchKind(undefined);
    items
      .filter((item) => selectedIds.has(item.id) && predicate(item))
      .forEach((item) => {
        // Wrap in Promise.resolve() so both sync (void) and async (Promise<void>) callback
        // return types can be handled uniformly. Rejections are swallowed here since the
        // selection is preserved either way — per-item failure surfacing would need a dedicated
        // channel (out of scope for this design idea).
        Promise.resolve(onItemAction(item, { kind, batch: true })).catch(() => {});
      });
  };

  const runOpenBatch = () => runBatchAction('open', (item) => isLocallyInstalled(item.status));

  const buildHead = (key: SortKey, label: string, className?: string) => (
    <TableHead
      onClick={() => handleSort(key)}
      className={cn('tw:cursor-pointer tw:px-2', className)}
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
    if (variant === 'buttons') return button;
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

  return (
    <TooltipProvider>
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
          </div>
          {variant === 'buttons' && !isNarrow && (
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
                    {option.label}
                  </Button>
                );
              })}
            </div>
          )}
          {variant !== 'buttons' && (
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
            {variant === 'buttons' && isNarrow && (
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
            {variant === 'buttons' && (
              /* Buttons variant — row 2: language selector is now a plain combobox whose trigger
                 shows only a count (no badges). A Tooltip on the whole trigger enumerates the
                 selected language names on hover — and pops open programmatically when the user
                 toggles "Only my languages" on, so they immediately see which languages were
                 seeded. Any hover/focus change hands control back over via onOpenChange. */
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
            {activeFilterCount > 0 && (
              <Button size="sm" className="tw:h-6 tw:text-xs" onClick={clearFilters}>
                {STRINGS.clearAll}
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Preselection row lives outside the scrollable CardContent so it never scrolls away.
            `-mb-4` cancels the Card's default `gap-4` between children so the preset row sits
            flush against the list below. */}
        {variant === 'buttons' && !isLoading && sorted.length > 0 && (
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
                  {renderPreset(
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
            {sorted.length === 0 ? (
              <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:p-8 tw:text-center">
                <Label className="tw:text-muted-foreground">
                  {items.length === 0 ? STRINGS.browseDblCta : STRINGS.noResults}
                </Label>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" onClick={clearFilters}>
                    {STRINGS.clearFiltersCta}
                  </Button>
                )}
              </div>
            ) : (
              <Table stickyHeader>
                <TableHeader stickyHeader>
                  <TableRow>
                    {/* Match the checkbox cell's padding + inner square so the X icon sits exactly
                        where each row's checkbox does. */}
                    <TableHead className="tw:w-8 tw:ps-3 tw:pe-0">
                      {selectedIds.size > 0 && (
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
                      )}
                    </TableHead>
                    {buildHead('shortName', STRINGS.shortName, 'tw:ps-4')}
                    {buildHead('fullName', STRINGS.fullName, 'tw:hidden tw:md:!table-cell')}
                    {buildHead('language', STRINGS.language, 'tw:hidden tw:sm:!table-cell')}
                    {buildHead('type', STRINGS.type, 'tw:hidden tw:lg:!table-cell')}
                    {buildHead('lastUsed', STRINGS.lastUsed, 'tw:hidden tw:xl:!table-cell')}
                    {buildHead('action', STRINGS.action)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    // While a batch button is hovered, collapse the list to only *selected* rows —
                    // unselected rows are hidden. Matching selections (the ones the click will run
                    // on) come first at full opacity; non-matching selections come below, styled
                    // as disabled (dimmed + non-interactive) so the user sees what stays untouched
                    // in the same selection. Hidden-by-filter selections are folded in too so the
                    // preview covers the entire selection regardless of the current filter.
                    if (!hoveredBatchKind) return sorted;
                    const visibleIdsForHover = new Set(sorted.map((item) => item.id));
                    const allSelected = [
                      ...sorted.filter((item) => selectedIds.has(item.id)),
                      ...items.filter(
                        (item) => selectedIds.has(item.id) && !visibleIdsForHover.has(item.id),
                      ),
                    ];
                    return [
                      ...allSelected.filter((item) => rowMatchesBatchKind(item, hoveredBatchKind)),
                      ...allSelected.filter((item) => !rowMatchesBatchKind(item, hoveredBatchKind)),
                    ];
                  })().map((item) => {
                    const kind = primaryActionFor(item.status);
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
                        className={cn('tw:cursor-pointer', {
                          // Not-locally-available rows dim by default, but a selected row overrides
                          // that back to full foreground so it visually asserts the user's choice.
                          'tw:text-muted-foreground/80':
                            rowIsDim(item.status) && !selectedIds.has(item.id),
                          // Selected-row highlight — suppressed for the "disabled" state below so
                          // non-matching selections read as inert, not merely dimmed.
                          'tw:bg-muted/40':
                            selectedIds.has(item.id) &&
                            !(
                              hoveredBatchKind !== undefined &&
                              !rowMatchesBatchKind(item, hoveredBatchKind)
                            ),
                          // While a batch button is hovered, non-matching selected rows are shown
                          // as disabled — grayscale to strip color from the checkbox / action
                          // button / status badge, half opacity, strikethrough, and no pointer
                          // interaction so hover state on the batch button isn't lost when the
                          // pointer crosses one. Together these make it unambiguous that those
                          // rows are being *excluded* from the batch, not just de-emphasized.
                          'tw:pointer-events-none tw:line-through tw:opacity-50 tw:grayscale':
                            hoveredBatchKind !== undefined &&
                            !rowMatchesBatchKind(item, hoveredBatchKind),
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
                            {variant === 'buttons' &&
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
                            {primaryButton(item)}
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
                              {overflowMenu(item)}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            {hasMore &&
              sorted.length > 0 &&
              !presetStatusFilter &&
              hoveredBatchKind === undefined && (
                <div className="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:py-4 tw:text-muted-foreground">
                  <Spinner className="tw:h-4" />
                  <Label className="tw:text-xs tw:text-muted-foreground">
                    {STRINGS.loadingMore}
                  </Label>
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
          if (sorted.length === 0) return undefined;
          const visibleIds = new Set(sorted.map((item) => item.id));
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
          const selectionContent = selectedIds.size > 0 && (
            <div className="tw:flex tw:items-center tw:gap-2">
              <Label className="tw:text-xs">
                {selectedIds.size} {STRINGS.selectionSuffix}
              </Label>
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
            </div>
          );
          // Batch actions for the current selection. One button per needed kind (Get, Sync,
          // Update, Install) — any subset can appear depending on what's in the selection. The
          // Open button, when applicable, is rendered last so it sits at the right. Hidden when
          // the list is empty ("no filter matches") since there's nothing to act on.
          const batchContent = (
            <div className="tw:flex tw:items-center tw:justify-center tw:gap-2">
              {sorted.length > 0 &&
                neededKinds.map((kind) => {
                  const affectedCount = items.filter(
                    (item) => selectedIds.has(item.id) && primaryActionFor(item.status) === kind,
                  ).length;
                  return (
                    <Button
                      key={kind}
                      size="sm"
                      onMouseEnter={() => enterHover(kind)}
                      onMouseLeave={leaveHover}
                      onFocus={() => enterHover(kind)}
                      onBlur={leaveHover}
                      onClick={() =>
                        runBatchAction(kind, (item) => primaryActionFor(item.status) === kind)
                      }
                    >
                      {actionLabel(kind)}
                      <span className="tw:ms-1">{affectedCount}</span>
                    </Button>
                  );
                })}
              {sorted.length > 0 &&
                canOpenSome &&
                (() => {
                  const affectedOpenCount = items.filter(
                    (item) => selectedIds.has(item.id) && isLocallyInstalled(item.status),
                  ).length;
                  return (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="tw:bg-muted"
                      onMouseEnter={() => enterHover('open')}
                      onMouseLeave={leaveHover}
                      onFocus={() => enterHover('open')}
                      onBlur={leaveHover}
                      onClick={runOpenBatch}
                    >
                      {STRINGS.open}
                      <span className="tw:ms-1">{affectedOpenCount}</span>
                    </Button>
                  );
                })()}
            </div>
          );
          // With a preset status filter active the list is already restricted to local + S/R
          // items — a bounded set with no "hasMore" pull-in — so the "x of y items" framing
          // (which contrasts current view against the full catalog) no longer applies. Show a
          // simple "x items" instead.
          const countContent = (
            <Label className="tw:text-xs tw:text-muted-foreground">
              {presetStatusFilter ? (
                <>
                  {sorted.length} {STRINGS.itemsSuffix}
                </>
              ) : (
                <>
                  {sorted.length} {STRINGS.ofSuffix} {items.length}
                  {hasMore ? '+' : ''} {STRINGS.itemsSuffix}
                </>
              )}
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
