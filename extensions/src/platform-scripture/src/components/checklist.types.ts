import type { Localized, LocalizedStringValue, MultiColumnMenu } from 'platform-bible-utils';

/**
 * Localization keys consumed by `ChecklistTool` and its Storybook stories.
 *
 * The wiring layer (phase-3-ui) passes this array to `useLocalizedStrings` and forwards the
 * resulting tuple to the component via `localizedStringsWithLoadingState`. Storybook stories
 * resolve the keys against `extensions/src/platform-scripture/contributions/localizedStrings.json`
 * (and overlay English fallbacks for keys that aren't contributed yet).
 *
 * The `emptyResult_identicalMarkers` key ALREADY exists in the localizedStrings JSON and is reused
 * unchanged. All other keys are new and should be contributed as part of phase-3-ui.
 */
export const CHECKLIST_STRING_KEYS = Object.freeze([
  // Toolbar — selector trigger labels (aria-label on the outline-button stand-ins)
  '%markersChecklist_toolbar_primaryProject%',
  '%markersChecklist_toolbar_comparativeTexts%',
  '%markersChecklist_toolbar_verseRange%',
  // Toolbar — action buttons + view dropdown
  '%markersChecklist_toolbar_copy%',
  '%markersChecklist_toolbar_view%',
  '%markersChecklist_toolbar_hideMatches%',
  '%markersChecklist_toolbar_showVerseText%',
  '%markersChecklist_toolbar_aria%',
  // Match-count live region (BHV-303; `{count}` placeholder is replaced client-side)
  '%markersChecklist_matches_omitted%',
  // Data table + landmark
  '%markersChecklist_table_aria%',
  '%markersChecklist_noResults%',
  // Help text banner (fallback copy when the backend doesn't supply one)
  '%markersChecklist_helptext%',
  // Empty result — reuse the existing key so we don't duplicate the translation
  '%markersChecklist_emptyResult_identicalMarkers%',
  // Error banner + retry (T-R-2 rendering contract)
  '%markersChecklist_errorTitle%',
  '%markersChecklist_errorRetry%',
  // Per-row edit / goto affordances (disabled stubs per DEF-UI-003)
  '%markersChecklist_edit%',
  '%markersChecklist_goto%',
  // Per-row aria-label patterns (spec §Edit/Goto Link Accessible Names); `{ref}` is replaced
  '%markersChecklist_edit_aria%',
  '%markersChecklist_goto_aria%',
  '%markersChecklist_edit_disabled_tooltip%',
  // Column-header full-name tooltip (PT10 enhancement #3092235610)
  '%markersChecklist_columnHeader_aria%',
] as const);

/** Union of the localization keys declared above. */
export type ChecklistLocalizedStringKey = (typeof CHECKLIST_STRING_KEYS)[number];

/**
 * Map of localization keys to resolved strings. Values are optional because the platform's
 * `useLocalizedStrings` returns a partial map while the localization data is loading.
 */
export type ChecklistLocalizedStrings = {
  [key in ChecklistLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Reference to a scripture text project displayed in a column.
 *
 * Mirrors `ScrTextRef` from `ui-state-contracts.md` but is intentionally redeclared locally so the
 * component doesn't take on a dependency on the full state-contract interface (which carries wiring
 * concerns not relevant here). The wiring layer supplies the `fullName` via the
 * `columnProjectFullNames` prop, resolved from `pdp.getSetting('platform.fullName')`.
 */
export type ChecklistProjectRef = {
  /** Project short name shown in the column header. */
  name: string;
  /** Project unique identifier (GUID / HexId). */
  id: string;
};

/** One item inside a paragraph — mirrors `ChecklistContentItem` from `data-contracts.md` §3.5. */
export type ChecklistContentItem =
  | { type: 'text'; text: string; characterStyle?: string | undefined }
  | { type: 'verse'; verseNumber: string }
  | { type: 'editLink'; bookNum: number; chapterNum: number; verseNum: number }
  | { type: 'link'; reference: string; displayText: string }
  | { type: 'error'; message: string }
  | { type: 'message'; message: string };

/** One paragraph within a cell — mirrors `ChecklistParagraph` from `data-contracts.md` §3.4. */
export type ChecklistParagraph = {
  /** USFM marker without backslash (e.g. `p`, `q1`). The component prepends `\` for display. */
  marker: string;
  /** Ordered content items. */
  items: ChecklistContentItem[];
};

/** One cell in a row — mirrors `ChecklistCell` from `data-contracts.md` §3.3. */
export type ChecklistCell = {
  paragraphs: ChecklistParagraph[];
  /** Verse reference string (e.g. `GEN 1:1`). */
  reference: string;
  /** Displayed reference (may differ from `reference` for verse bridges). */
  displayedReference: string;
  /** Language identifier for text direction (e.g. `en`, `he`, `ar`). */
  language: string;
  /** Cell-level error message (when present, overrides paragraph rendering). */
  error?: string | undefined;
};

/** One row in the table — mirrors `ChecklistRow` from `data-contracts.md` §3.2. */
export type ChecklistRow = {
  cells: ChecklistCell[];
  /** True when all cells have equivalent content; filters out when `hideMatches` is on. */
  isMatch: boolean;
  /** Whether this row should include an edit affordance (first-cell gate). */
  includeEditLink: boolean;
  /** Earliest verse reference in this row, used for per-row aria-label on edit/goto links. */
  firstRef: string | undefined;
};

/** Empty-result variant — mirrors `EmptyResultMessage` from `data-contracts.md` §3.8. */
export type ChecklistEmptyResultMessage = {
  variant: 'identical' | 'noResults';
  /** Pre-localized message text supplied by the backend. */
  message: string;
  /** Markers that were searched (only for `noResults`). */
  searchedMarkers?: string[] | undefined;
  /** Books that were searched (only for `noResults`). */
  searchedBooks?: string[] | undefined;
};

/**
 * Aligned checklist payload passed to the component — mirrors `ChecklistResult` from
 * `data-contracts.md` §3.1 (success variant). The component is agnostic to the discriminated-union
 * wrapper: the wiring layer narrows on `response.success` and passes the success body here (with
 * the `success: true` discriminator flattened away), and passes the error branch via the `error`
 * prop.
 */
export type ChecklistData = {
  /** Aligned rows of data. Empty array = render the empty-result message. */
  rows: ChecklistRow[];
  /** Short names for each column (primary project at index 0). */
  columnHeaders: string[];
  /** Project IDs parallel to `columnHeaders` — used for full-name tooltip resolution. */
  columnProjectIds: string[];
  /** Number of matching rows excluded when `hideMatches` is on. */
  excludedCount: number;
  /** True when results were truncated at 5000 rows (INV-012). */
  truncated?: boolean;
  /** Empty-result payload (only populated when `rows.length === 0`). */
  emptyResultMessage?: ChecklistEmptyResultMessage | undefined;
};

/**
 * Props for the `ChecklistTool` presentational component.
 *
 * All state flows through props — the component does not own any persisted settings. The wiring
 * layer reads/writes the six `useWebViewState` slots from UI-PKG-004 and forwards the current
 * values + callbacks. Per `phase-3-ui-design-scope.md`, the toolbar selectors use abstract stand-in
 * triggers instead of the draft-PR `ProjectSelector` / `ScopeSelector` components.
 */
export type ChecklistToolProps = {
  /** Tuple matching the platform's `useLocalizedStrings` return shape. */
  localizedStringsWithLoadingState?: [ChecklistLocalizedStrings, boolean];

  /** Aligned checklist data. `undefined` while the backend request is in flight or before mount. */
  data?: ChecklistData | undefined;

  /**
   * Map of projectId → full project name, resolved by the wiring layer from
   * `pdp.getSetting('platform.fullName')`. Used for column-header tooltips. Missing entries fall
   * back to the short name.
   */
  columnProjectFullNames?: Record<string, string>;

  /** When true, DataTable renders its built-in Skeleton rows and the wrapper is `aria-busy`. */
  isLoading: boolean;

  /**
   * Error message from the most recent `buildChecklistData` failure (null/undefined = no error).
   * When non-empty, a destructive shadcn `Alert` is rendered between the toolbar and the data
   * table, with a Retry button that calls `onRetry`. See `ui-state-contracts.md` T-R-2 contract.
   */
  error?: string | null | undefined;

  /**
   * Optional help-text banner content (rendered in a default shadcn `Alert`). Mutually exclusive
   * with `error` — the error Alert suppresses helpText until the next successful refresh.
   */
  helpText?: string | null | undefined;

  // ----- Toolbar selectors -----
  //
  // The three toolbar selectors (primary project, comparative texts, verse range) may be
  // rendered in two ways:
  //
  //  1. STAND-IN (default for Storybook stories): pass a `*Label` + optional `*TriggerClick`
  //     callback. The component renders an outline-button with a chevron icon; the parent
  //     chooses what to open on click (or does nothing). Used for presentational review.
  //
  //  2. REAL (wiring phase): pass a `*Selector` ReactNode containing a fully-functional
  //     popover trigger — typically `<ProjectSelector ... />` or `<ScopeSelector variant=
  //     'dropdown' ... />` from `platform-bible-react`. When provided, the stand-in button
  //     is NOT rendered; the custom ReactNode takes its place inline in the TabToolbar.
  //
  // If both a `*Selector` ReactNode AND the stand-in props are provided, `*Selector` wins.

  /** Already-resolved label text for the primary project trigger (e.g. project short name). */
  primaryProjectLabel: string;
  /** Called when the user clicks the primary-project trigger. Parent opens its popover/dialog. */
  onPrimaryProjectTriggerClick?: () => void;
  /**
   * Real primary-project selector — typically `<ProjectSelector mode="project" ... />`. When
   * provided, replaces the stand-in button.
   */
  primaryProjectSelector?: React.ReactNode;

  /** Already-resolved label for the comparative-texts trigger (e.g. "3 selected" or a list). */
  comparativeTextsLabel: string;
  onComparativeTextsTriggerClick?: () => void;
  /**
   * Real comparative-texts selector — typically `<ProjectSelector mode="project-multi" ... />`.
   * When provided, replaces the stand-in button.
   */
  comparativeTextsSelector?: React.ReactNode;

  /** Already-resolved label for the verse-range trigger (e.g. "GEN 1:1 - REV 22:21"). */
  verseRangeLabel: string;
  onVerseRangeTriggerClick?: () => void;
  /**
   * Real verse-range selector — typically `<ScopeSelector variant="dropdown" ... />`. When
   * provided, replaces the stand-in button.
   */
  verseRangeSelector?: React.ReactNode;

  // ----- View dropdown toggles (bound to UI-PKG-004 slots in the wiring phase) -----

  /** Current hide-matches value. (BHV-314) */
  hideMatches: boolean;
  onHideMatchesChange?: (next: boolean) => void;

  /** Current show-verse-text value. (BHV-315) */
  showVerseText: boolean;
  onShowVerseTextChange?: (next: boolean) => void;

  // ----- Match-count label (BHV-303) -----

  /**
   * Pre-localized match-count label (e.g. "12 Matches Omitted"). When non-empty, the component
   * renders it in `endAreaChildren` wrapped in `aria-live='polite'` + `aria-atomic='true'`.
   */
  matchCountLabel?: string | undefined;

  // ----- Action callbacks -----

  /** Copy button click handler. The wiring layer owns the clipboard implementation (BHV-313). */
  onCopy?: () => void;

  /** Retry button click handler (shown inside the error Alert). */
  onRetry?: () => void;

  // ----- Tab menu -----

  /**
   * Localized menu data for the three-dot tab menu. In the wiring phase this comes from
   * `useData(papi.menuData.dataProviderName).WebViewMenu(...)`. Stories may pass a minimal stub.
   */
  tabViewMenuData?: Localized<MultiColumnMenu> | undefined;

  /**
   * Called when the user selects an item in the tab menu. Defaults to a no-op. The wiring layer
   * forwards the selected command to `papi.commands.sendCommand`.
   */
  onSelectTabMenuItem?: (selectedMenuItem: {
    [key: string]: unknown;
    command: string;
  }) => void | Promise<void>;

  // ----- Row-level handlers (deferred per DEF-UI-003 — prop contract is stable) -----

  onEditLinkClick?: (row: ChecklistRow, verseRef: string) => void;
  onGotoLinkClick?: (row: ChecklistRow, verseRef: string) => void;

  /**
   * When true, per-row edit/goto affordances are rendered enabled and wired to the handlers. When
   * false (default, per DEF-UI-003), they render as disabled stubs with a "coming in a future
   * release" tooltip. Stories flip this to `true` to illustrate the target state.
   */
  isEditLinkEnabled?: boolean;
};
