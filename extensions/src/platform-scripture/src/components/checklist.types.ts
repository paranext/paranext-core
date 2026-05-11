import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { ReactNode } from 'react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { ScriptureRange } from 'platform-scripture';

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
  // UX-2 finding #6: placeholder shown on the comparative-texts trigger when empty.
  '%markersChecklist_toolbar_comparativeTextsPlaceholder%',
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
  // Empty-result fallbacks (UX-2 finding #3): generic "no markers" message when
  // data is loaded but rows is empty AND no comparatives — replaces the
  // misleading "identical markers" fallback that surfaced on first load.
  '%markersChecklist_emptyResult_noResults%',
  '%markersChecklist_emptyResult_selectProject%',
  // Error banner + retry (T-R-2 rendering contract)
  '%markersChecklist_errorTitle%',
  '%markersChecklist_errorRetry%',
  // Banner dismiss button (shared aria-label for both error + helpText alerts — Sebastian
  // PR #2219 #3137366113 "be dismiss-able")
  '%markersChecklist_alert_dismiss%',
  // Per-row edit affordance (rendered when wiring layer supplies onEditLinkClick)
  '%markersChecklist_edit%',
  // Per-row aria-label patterns (spec §Edit/Goto Link Accessible Names); `{ref}` is replaced
  '%markersChecklist_edit_aria%',
  // Goto aria-label / tooltip — used by the LinkedScrRefButton on the reference cell
  '%markersChecklist_goto_aria%',
  // Column-header full-name tooltip (PT10 enhancement #3092235610)
  '%markersChecklist_columnHeader_aria%',
  // Reference column screen-reader label (Ref column header is intentionally unlabeled visually)
  '%markersChecklist_columnHeader_referenceAria%',
  // Per-paragraph marker aria-label; `{marker}` is replaced client-side
  '%markersChecklist_marker_aria%',
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
  | { type: 'link'; reference: ScriptureRange; displayText: string }
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
  /**
   * Structured verse reference (bridge-capable — `{ start }` is a single verse, `{ start, end }` a
   * verse bridge). `undefined` for an empty-placeholder cell (a column with no verse at this row).
   * The display string is derived client-side via `formatScrRef` — there is no separate
   * server-supplied displayed reference.
   */
  reference?: ScriptureRange | undefined;
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
  /**
   * Earliest verse reference in this row (a single verse), used for the reference column and
   * per-row aria-label on edit/goto links. `undefined` when no cell carries a reference.
   */
  firstRef?: ScriptureRange | undefined;
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

  /**
   * Map of projectId → text direction, resolved by the wiring layer from
   * `pdp.getSetting('platform.textDirection')`. Each cell inherits its column's direction so RTL
   * projects (Hebrew, Arabic, Persian, Urdu, etc.) render right-to-left. Per `Localization-Guide.md
   * → Text Direction (RTL/LTR)`, direction comes from the per-project setting (the platform derives
   * it from the language definition by default; admins can override). Missing entries fall back to
   * the document direction.
   */
  columnDirections?: Record<string, 'ltr' | 'rtl' | undefined>;

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
  // The three toolbar selectors (primary project, comparative texts, verse range) are passed
  // as `*Selector` ReactNodes — typically `<ProjectSelector ... />` or `<ScopeSelector variant=
  // 'dropdown' ... />` from `platform-bible-react`. The wiring layer (`checklist.web-view.tsx`)
  // assembles each node with its data + handlers; Storybook stories pass simple Button
  // placeholders for visual review.

  /** Primary-project selector — typically `<ProjectSelector mode="project" ... />`. */
  primaryProjectSelector?: ReactNode;

  /** Comparative-texts selector — typically `<ProjectSelector mode="project-multi" ... />`. */
  comparativeTextsSelector?: ReactNode;

  /** Verse-range selector — typically `<ScopeSelector variant="dropdown" ... />`. */
  verseRangeSelector?: ReactNode;

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

  /** Retry button click handler (shown inside the error Alert). */
  onRetry?: () => void;

  // UX-2 finding #1 (WP3): the inner TabToolbar was removed because the outer Platform.Bible
  // tab chrome already surfaces the hamburger. Menu items (Open Project Settings, Copy,
  // Settings) reach the outer chrome via `WebViewMenu.topMenu` contributions wired in
  // `main.ts` — they no longer flow through this component as props.

  // ----- Row-level handlers -----
  //
  // Per Sebastian PR #2219 #3137862427 ("Providing a callback to the checklist component should
  // enable them"), affordances are rendered ONLY when the wiring layer supplies the callback.
  // No more disabled stubs (DEF-UI-003 just means the wiring layer doesn't pass `onEditLinkClick`
  // until scripture-editor integration lands). The goto affordance is the `LinkedScrRefButton`
  // on the reference cell — providing `onGotoLinkClick` activates the link-button rendering;
  // omitting it falls back to plain text.

  /**
   * Edit-link click handler. The component renders an inline ghost/link button (variant="link" with
   * `tw:text-muted-foreground`) on the primary column's row when this is provided AND the row's
   * `includeEditLink` flag is true. Receives the row + the row's earliest verse ref (the start of
   * `firstRef`, or the cell's reference when the row carries none).
   */
  onEditLinkClick?: (row: ChecklistRow, verseRef: SerializedVerseRef) => void;

  /**
   * Goto-link click handler. When provided, the reference column renders the verse ref as a
   * `LinkedScrRefButton` (link-button + tooltip "Go to {ref}"). When absent, the reference column
   * falls back to plain mono-text (read-only context). Receives the row + the start verse of the
   * row's `firstRef`.
   */
  onGotoLinkClick?: (row: ChecklistRow, verseRef: SerializedVerseRef) => void;
};
