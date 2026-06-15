import {
  BookChapterControl,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  ScrollGroupSelector,
  type ScrollGroupSelectorProps,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TabToolbar,
  Tabs,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from 'platform-bible-react';
import { BookA, LibraryBig, Image as ImageIcon, Info, MapPin, Menu, X } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import type { LocalizedStringValue, ScrollGroupId } from 'platform-bible-utils';
import type { SerializedVerseRef } from '@sillsdev/scripture';

/** Object containing all keys used for localization in this component. */
export const TOOLBAR_STRING_KEYS = Object.freeze([
  '%enhancedResources_toolbar_tabMenu%',
  '%enhancedResources_toolbar_info%',
  '%enhancedResources_toolbar_highlightAllResearchTerms%',
  '%enhancedResources_toolbar_currentReference%',
  '%enhancedResources_toolbar_filterAriaLabel%',
  '%enhancedResources_toolbar_filterClear%',
  '%enhancedResources_toolbar_scopeLabel%',
  '%enhancedResources_toolbar_scope_currentVerse%',
  '%enhancedResources_toolbar_scope_currentSection%',
  '%enhancedResources_toolbar_scope_currentChapter%',
  '%enhancedResources_toolbar_scope_currentSense%',
  '%enhancedResources_toolbar_tab_dictionary%',
  '%enhancedResources_toolbar_tab_encyclopedia%',
  '%enhancedResources_toolbar_tab_media%',
  '%enhancedResources_toolbar_tab_maps%',
  '%enhancedResources_toolbar_menu_showFootnotes%',
  '%enhancedResources_toolbar_menu_showTranslations%',
  // FN-020(b): when a resource short-name is supplied, the show-translations label
  // becomes "Show translations ({resourceShortName})". The template uses {resourceShortName}.
  '%enhancedResources_toolbar_menu_showTranslationsWithResource%',
  '%enhancedResources_toolbar_menu_hebrewHeader%',
  '%enhancedResources_toolbar_menu_greekHeader%',
  '%enhancedResources_toolbar_menu_originalScript%',
  '%enhancedResources_toolbar_menu_transliteration%',
  '%enhancedResources_toolbar_menu_both%',
  '%enhancedResources_toolbar_menu_copyrightInfo%',
  '%enhancedResources_toolbar_menu_find%',
  '%enhancedResources_toolbar_menu_close%',
  '%enhancedResources_toolbar_menu_zoomIn%',
  '%enhancedResources_toolbar_menu_zoomOut%',
  '%enhancedResources_toolbar_menu_zoomReset%',
] as const);

type ToolbarLocalizedStringKey = (typeof TOOLBAR_STRING_KEYS)[number];
type ToolbarLocalizedStrings = {
  [key in ToolbarLocalizedStringKey]?: LocalizedStringValue;
};

export type ResearchTab = 'dictionary' | 'encyclopedia' | 'media' | 'maps';
export type MarbleScope = 'current-verse' | 'current-section' | 'current-chapter' | 'current-sense';
export type HighlightMode = 'none' | 'all-research-terms';
export type ScriptDisplayMode = 'script' | 'transliteration' | 'both';

export type ToolbarVerseRef = {
  book: number;
  chapter: number;
  verse: number;
};

/**
 * View-menu state surface (BHV-301..BHV-309). Lives in the top toolbar's hamburger DropdownMenu.
 * Wiring layer connects each callback to the corresponding command (FN-016).
 */
export type ViewMenuState = {
  showFootnotes: boolean;
  showTranslations: boolean;
  hebrewDisplayMode: ScriptDisplayMode;
  greekDisplayMode: ScriptDisplayMode;
};

export type ViewMenuHandlers = {
  onToggleShowFootnotes?: (next: boolean) => void;
  onToggleShowTranslations?: (next: boolean) => void;
  onHebrewDisplayModeChange?: (next: ScriptDisplayMode) => void;
  onGreekDisplayModeChange?: (next: ScriptDisplayMode) => void;
  onShowCopyrightInfo?: () => void;
  onFindInResource?: () => void;
  onCloseWindow?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
};

/* ------------------------------------------------------------------------------------------------
 * EnhancedResourceTopToolbar (Theme 7) — TabToolbar-based row above the splitter.
 * ------------------------------------------------------------------------------------------------ */

export type EnhancedResourceTopToolbarProps = {
  /** View-menu state (Show footnotes / Show translations / H+G display modes). */
  viewMenu?: ViewMenuState;
  /** View-menu callbacks. Each fires when the corresponding menu item is selected. */
  viewMenuHandlers?: ViewMenuHandlers;
  /** Highlight mode toggle (BHV-306). */
  highlightMode?: HighlightMode;
  onHighlightModeChange?: (mode: HighlightMode) => void;
  /** Info / guide button click handler (FN-016 — opens MarbleGuide Dialog). */
  onInfoClick?: () => void;
  /**
   * Current scripture reference - drives the `BookChapterControl` selection state. When omitted
   * (e.g. before the wiring layer has resolved a scroll-group), the placeholder button falls back
   * to `currentReferenceLabel` so the toolbar still renders.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  scrRef?: SerializedVerseRef;
  /**
   * Callback fired when the user picks a new reference via `BookChapterControl`. Wiring layer
   * routes this through `setScrRef` from `useWebViewScrollGroupScrRef` so the change propagates to
   * the editor + scroll-group siblings (FN-015).
   */
  // eslint-disable-next-line react/no-unused-prop-types
  onScrRefChange?: (scrRef: SerializedVerseRef) => void;
  /**
   * Optional add-recent-search hook. Forwarded straight to `BookChapterControl` so the recent picks
   * can be persisted across sessions.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  onAddRecentSearch?: (scrRef: SerializedVerseRef) => void;
  /** Recent scripture references shown above the book list in the BCV popover. */
  // eslint-disable-next-line react/no-unused-prop-types
  recentSearches?: SerializedVerseRef[];
  /**
   * Reference-button click handler. Retained for stories / fallback when `scrRef` is undefined,
   * since `BookChapterControl` is only mounted when the wiring layer has supplied a real scrRef.
   */
  onReferenceClick?: () => void;
  /** Currently selected scroll-group id (or undefined for none). */
  scrollGroupId?: ScrollGroupId | undefined;
  /** Available scroll-group ids for the selector. */
  availableScrollGroupIds?: ScrollGroupSelectorProps['availableScrollGroupIds'];
  /** Callback fired when the user picks a different scroll group. */
  onScrollGroupChange?: ScrollGroupSelectorProps['onChangeScrollGroupId'];
  /** Optional label of the current verse reference (formatted by parent). */
  currentReferenceLabel?: string;
  /**
   * Short-name of the active resource (e.g. "ESV16UK+"). When provided, the hamburger menu "Show
   * translations" entry renders as "Show translations ({resourceShortName})" per FN-020(b).
   * Optional - the wiring layer may not have it during loading or for the empty state.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  resourceShortName?: string;
  /** Optional localized strings forwarded to the ScrollGroupSelector. */
  scrollGroupLocalizedStrings?: ScrollGroupSelectorProps['localizedStrings'];
  localizedStringsWithLoadingState?: [ToolbarLocalizedStrings, boolean];
};

const DEFAULT_VIEW_MENU: ViewMenuState = {
  showFootnotes: false,
  showTranslations: true,
  hebrewDisplayMode: 'both',
  greekDisplayMode: 'both',
};

/**
 * Top row: TabToolbar
 *
 * Hosts the hamburger view-menu (DropdownMenu with the FN-016 menu items: Show footnotes, Show
 * translations, Hebrew/Greek display modes, Copyright info, Find, Close, Zoom in/out/reset), the
 * BCV reference button (placeholder for phase-3-ui BookChapterControl wiring — FN-015), the "all
 * research terms" highlight toggle, the info/guide icon, and the ScrollGroupSelector.
 *
 * The actual `BookChapterControl` is wired in phase-3-ui because it requires
 * `useWebViewScrollGroupScrRef`. We expose `currentReferenceLabel` plus an `onReferenceClick` slot
 * so the wiring layer can swap in the real picker without restructuring the toolbar.
 *
 * [Revised: 2026-04-29] — extracted from the original monolithic Toolbar; the hand-rolled top-row
 * markup is replaced with the platform-bible-react `TabToolbar` advanced component (Theme 7).
 */
export function EnhancedResourceTopToolbar({
  viewMenu = DEFAULT_VIEW_MENU,
  viewMenuHandlers = {},
  highlightMode = 'none',
  onHighlightModeChange = () => {},
  onInfoClick = () => {},
  scrRef,
  onScrRefChange,
  onAddRecentSearch,
  recentSearches,
  onReferenceClick = () => {},
  scrollGroupId = undefined,
  availableScrollGroupIds = [undefined, 0, 1, 2],
  onScrollGroupChange = () => {},
  currentReferenceLabel,
  resourceShortName,
  scrollGroupLocalizedStrings,
  localizedStringsWithLoadingState = [{}, false],
}: EnhancedResourceTopToolbarProps) {
  const getLocalizedString = (key: ToolbarLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const tabMenuLabel = String(getLocalizedString('%enhancedResources_toolbar_tabMenu%'));
  const infoLabel = String(getLocalizedString('%enhancedResources_toolbar_info%'));
  const highlightLabel = String(
    getLocalizedString('%enhancedResources_toolbar_highlightAllResearchTerms%'),
  );
  const referenceLabel = String(getLocalizedString('%enhancedResources_toolbar_currentReference%'));
  const showFootnotesLabel = String(
    getLocalizedString('%enhancedResources_toolbar_menu_showFootnotes%'),
  );
  // FN-020(b): when we have a resource short-name, build the "Show translations
  // ({resourceShortName})" form from the dedicated localization key. Otherwise fall back to the
  // bare "Show translations" label so the menu still renders during loading.
  const showTranslationsBare = String(
    getLocalizedString('%enhancedResources_toolbar_menu_showTranslations%'),
  );
  const showTranslationsTemplate = String(
    getLocalizedString('%enhancedResources_toolbar_menu_showTranslationsWithResource%'),
  );
  const showTranslationsLabel =
    resourceShortName && showTranslationsTemplate
      ? formatReplacementString(showTranslationsTemplate, { resourceShortName })
      : showTranslationsBare;
  const hebrewHeader = String(getLocalizedString('%enhancedResources_toolbar_menu_hebrewHeader%'));
  const greekHeader = String(getLocalizedString('%enhancedResources_toolbar_menu_greekHeader%'));
  const originalScriptLabel = String(
    getLocalizedString('%enhancedResources_toolbar_menu_originalScript%'),
  );
  const transliterationLabel = String(
    getLocalizedString('%enhancedResources_toolbar_menu_transliteration%'),
  );
  const bothLabel = String(getLocalizedString('%enhancedResources_toolbar_menu_both%'));
  const copyrightInfoLabel = String(
    getLocalizedString('%enhancedResources_toolbar_menu_copyrightInfo%'),
  );
  const findLabel = String(getLocalizedString('%enhancedResources_toolbar_menu_find%'));
  const closeLabel = String(getLocalizedString('%enhancedResources_toolbar_menu_close%'));
  const zoomInLabel = String(getLocalizedString('%enhancedResources_toolbar_menu_zoomIn%'));
  const zoomOutLabel = String(getLocalizedString('%enhancedResources_toolbar_menu_zoomOut%'));
  const zoomResetLabel = String(getLocalizedString('%enhancedResources_toolbar_menu_zoomReset%'));

  const {
    onToggleShowFootnotes = () => {},
    onToggleShowTranslations = () => {},
    onHebrewDisplayModeChange = () => {},
    onGreekDisplayModeChange = () => {},
    onShowCopyrightInfo = () => {},
    onFindInResource = () => {},
    onCloseWindow = () => {},
    onZoomIn = () => {},
    onZoomOut = () => {},
    onZoomReset = () => {},
  } = viewMenuHandlers;

  const handleHebrewModeChange = (value: string) => {
    if (value === 'script' || value === 'transliteration' || value === 'both') {
      onHebrewDisplayModeChange(value);
    }
  };
  const handleGreekModeChange = (value: string) => {
    if (value === 'script' || value === 'transliteration' || value === 'both') {
      onGreekDisplayModeChange(value);
    }
  };

  const projectMenuTrigger = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={tabMenuLabel}>
          <Menu className="tw:h-4 tw:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="tw:min-w-56">
        <DropdownMenuCheckboxItem
          checked={viewMenu.showFootnotes}
          onCheckedChange={onToggleShowFootnotes}
        >
          {showFootnotesLabel}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={viewMenu.showTranslations}
          onCheckedChange={onToggleShowTranslations}
        >
          {showTranslationsLabel}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{hebrewHeader}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={viewMenu.hebrewDisplayMode}
          onValueChange={handleHebrewModeChange}
        >
          <DropdownMenuRadioItem value="script">{originalScriptLabel}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="transliteration">
            {transliterationLabel}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="both">{bothLabel}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{greekHeader}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={viewMenu.greekDisplayMode}
          onValueChange={handleGreekModeChange}
        >
          <DropdownMenuRadioItem value="script">{originalScriptLabel}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="transliteration">
            {transliterationLabel}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="both">{bothLabel}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onShowCopyrightInfo}>{copyrightInfoLabel}</DropdownMenuItem>
        <DropdownMenuItem onSelect={onFindInResource}>{findLabel}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onZoomIn}>{zoomInLabel}</DropdownMenuItem>
        <DropdownMenuItem onSelect={onZoomOut}>{zoomOutLabel}</DropdownMenuItem>
        <DropdownMenuItem onSelect={onZoomReset}>{zoomResetLabel}</DropdownMenuItem>
        {/* FN-020(b): Close is intentionally the LAST entry per Sebastian's round-2 feedback. */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onCloseWindow}>{closeLabel}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // FN-015: when the wiring layer supplies a real `scrRef` + `onScrRefChange`, mount the actual
  // `BookChapterControl` from platform-bible-react. This replaces the placeholder
  // outline-styled label with a true reference picker that drives scroll-group sync. If `scrRef`
  // is missing (e.g. before the wiring layer resolves) we fall back to the simple labelled
  // button so the toolbar still renders.
  const startArea = (
    <div className="tw:flex tw:items-center tw:gap-2">
      {scrRef && onScrRefChange ? (
        <BookChapterControl
          scrRef={scrRef}
          handleSubmit={onScrRefChange}
          recentSearches={recentSearches}
          onAddRecentSearch={onAddRecentSearch}
        />
      ) : (
        <Button
          variant="outline"
          size="sm"
          aria-label={referenceLabel}
          className="tw:font-mono"
          onClick={onReferenceClick}
        >
          {currentReferenceLabel ?? referenceLabel}
        </Button>
      )}
    </div>
  );

  const centerArea = (
    <Button
      variant={highlightMode === 'all-research-terms' ? 'secondary' : 'ghost'}
      size="sm"
      aria-pressed={highlightMode === 'all-research-terms'}
      aria-label={highlightLabel}
      onClick={() =>
        onHighlightModeChange(
          highlightMode === 'all-research-terms' ? 'none' : 'all-research-terms',
        )
      }
      className={cn('tw:text-xs', highlightMode === 'all-research-terms' && 'tw:bg-accent')}
    >
      {highlightLabel}
    </Button>
  );

  const endArea = (
    <div className="tw:flex tw:items-center tw:gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={infoLabel} onClick={onInfoClick}>
            <Info className="tw:h-4 tw:w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{infoLabel}</TooltipContent>
      </Tooltip>
      <ScrollGroupSelector
        availableScrollGroupIds={availableScrollGroupIds}
        scrollGroupId={scrollGroupId}
        onChangeScrollGroupId={onScrollGroupChange}
        localizedStrings={scrollGroupLocalizedStrings}
      />
    </div>
  );

  // TabToolbar's `projectMenuData` slot expects MultiColumnMenu data wired via the PAPI menu
  // service. Since this design-phase component drives the menu directly via DropdownMenu (no PAPI),
  // we render the trigger inside `startAreaChildren` and pass an empty handler to satisfy the
  // required `onSelectViewInfoMenuItem` prop. Phase-3-ui (FN-016) replaces this with the real menu
  // contribution.
  return (
    <TooltipProvider>
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        startAreaChildren={
          <div className="tw:flex tw:items-center tw:gap-2">
            {projectMenuTrigger}
            {startArea}
          </div>
        }
        centerAreaChildren={centerArea}
        endAreaChildren={endArea}
      />
    </TooltipProvider>
  );
}

/* ------------------------------------------------------------------------------------------------
 * EnhancedResourceTabBar (Theme 8) — tabs + filter input + scope selector. Mounts inside the
 * lower split panel.
 * ------------------------------------------------------------------------------------------------ */

export type EnhancedResourceTabBarProps = {
  /** Currently selected research-pane tab. */
  activeTab: ResearchTab;
  /** Callback fired when the user picks a different research tab. */
  onTabChange: (tab: ResearchTab) => void;
  /** Currently selected scope for filtering research-pane data. */
  scope: MarbleScope;
  /** Callback fired when the user picks a different scope. */
  onScopeChange: (scope: MarbleScope) => void;
  /** Whether the dynamic "Current Sense" scope option should be available. */
  hasSenseScope?: boolean;
  /**
   * Current text in the filter input. Empty string hides the filter input entirely (Theme 9 — the
   * input only appears once a word has been clicked, populating the filter).
   */
  searchValue?: string;
  /** Callback fired when the filter input or its X button changes the value. */
  onSearchChange?: (value: string) => void;
  /**
   * Theme 9 — whether the current `searchValue` matched any results in the active research pane.
   * Drives the "has matches" green tint vs "no matches" orange tint described in
   * `ui-spec-marble-form.md` line 36 (`filterBox`).
   *
   * [Revised: 2026-04-30 SB#2] Preserved Toolbar capability NOT currently consumed by the ER
   * backend - the green/orange tint behavior originates in Biblical Terms integration and is
   * retained here so the BT integration (when ported) can reuse this surface without further UI
   * changes. Default `true` keeps the input visually neutral when ER alone drives the tab bar.
   */
  hasMatches?: boolean;
  localizedStringsWithLoadingState?: [ToolbarLocalizedStrings, boolean];
};

/**
 * Lower-split header row: tab selector, filter input (only shown when filtered), scope selector.
 *
 * [Revised: 2026-04-29] Theme 8 — split out from the original monolithic Toolbar; mounts as the
 * FIRST child inside the lower ResizablePanel so it sits directly above the tab content. Theme 9 —
 * filter is now a plain `Input` + ghost X button, no SearchBar, no placeholder, `readOnly`, hidden
 * when `searchValue` is empty. Theme 8 (responsive) — uses `@container` queries on the parent so
 * tab labels collapse to icon-only at narrow widths and the row never wraps to two lines.
 */
export function EnhancedResourceTabBar({
  activeTab,
  onTabChange,
  scope,
  onScopeChange,
  hasSenseScope = false,
  searchValue = '',
  onSearchChange = () => {},
  hasMatches = true,
  localizedStringsWithLoadingState = [{}, false],
}: EnhancedResourceTabBarProps) {
  const getLocalizedString = (key: ToolbarLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const filterAriaLabel = String(getLocalizedString('%enhancedResources_toolbar_filterAriaLabel%'));
  const filterClearLabel = String(getLocalizedString('%enhancedResources_toolbar_filterClear%'));
  const scopeLabel = String(getLocalizedString('%enhancedResources_toolbar_scopeLabel%'));
  const scopeVerseLabel = String(
    getLocalizedString('%enhancedResources_toolbar_scope_currentVerse%'),
  );
  const scopeSectionLabel = String(
    getLocalizedString('%enhancedResources_toolbar_scope_currentSection%'),
  );
  const scopeChapterLabel = String(
    getLocalizedString('%enhancedResources_toolbar_scope_currentChapter%'),
  );
  const scopeSenseLabel = String(
    getLocalizedString('%enhancedResources_toolbar_scope_currentSense%'),
  );
  const tabDictLabel = String(getLocalizedString('%enhancedResources_toolbar_tab_dictionary%'));
  const tabEncycLabel = String(getLocalizedString('%enhancedResources_toolbar_tab_encyclopedia%'));
  const tabMediaLabel = String(getLocalizedString('%enhancedResources_toolbar_tab_media%'));
  const tabMapsLabel = String(getLocalizedString('%enhancedResources_toolbar_tab_maps%'));

  const handleTabChange = (value: string) => {
    if (
      value === 'dictionary' ||
      value === 'encyclopedia' ||
      value === 'media' ||
      value === 'maps'
    ) {
      onTabChange(value);
    }
  };

  const handleScopeChange = (value: string) => {
    if (
      value === 'current-verse' ||
      value === 'current-section' ||
      value === 'current-chapter' ||
      value === 'current-sense'
    ) {
      onScopeChange(value);
    }
  };

  const filterActive = searchValue.length > 0;
  // FN-024: Sebastian's round-2 feedback ask was for an always-visible filter input with
  // min-width: 80px so the toolbar shrinks based on real available space rather than hiding
  // the input until clicked. We render the filter box at all times; the X button only shows when
  // there's something to clear so the empty input visually matches an idle search bar. The tint
  // (green when there are matches, orange when no matches) only fires when a filter is active so
  // the empty state stays visually neutral. (BT integration may consume `hasMatches` later — see
  // SB#2 / Theme 9 origin notes.) The two tint colors are sourced from extension-local CSS
  // custom properties declared centrally in `extensions/src/platform-enhanced-resources/src/
  // _tokens.scss` (`--er-filter-input-match-bg` / `--er-filter-input-no-match-bg`); the `.dark`
  // selector in that file handles dark-mode contrast.
  let filterTintClass = 'tw:bg-background';
  if (filterActive) {
    filterTintClass = hasMatches
      ? 'tw:bg-[var(--er-filter-input-match-bg)]'
      : 'tw:bg-[var(--er-filter-input-no-match-bg)]';
  }

  return (
    // FN-024: `tw-@container/toolbar` establishes a named container-query context so the
    // `@sm:` variants below resolve against this element's inline-size, not the viewport.
    // The named form (`tw-@container/toolbar`) is necessary if other ancestors also declare
    // containers; using a name makes the resolution deterministic.
    <div className="tw-@container/toolbar tw:w-full">
      <div className="tw:flex tw:flex-nowrap tw:items-center tw:gap-2 tw:overflow-hidden tw:border-b tw:px-2 tw:py-1.5">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="tw:shrink-0">
          <TabsList>
            {/* Each trigger is wrapped in a Tooltip so the label surfaces on hover when the
                toolbar is narrow enough that the inline text (`tw:hidden tw:@sm/toolbar:inline`)
                collapses to icon-only. At @sm+ the visible label and the tooltip text are
                redundant by design - the tooltip stays harmless (same text) and we don't need
                container-aware JS to suppress it. */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="dictionary" aria-label={tabDictLabel}>
                    <BookA className="tw:h-4 tw:w-4 tw:@sm/toolbar:me-1" />
                    <span className="tw:hidden tw:@sm/toolbar:inline">{tabDictLabel}</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>{tabDictLabel}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="encyclopedia" aria-label={tabEncycLabel}>
                    <LibraryBig className="tw:h-4 tw:w-4 tw:@sm/toolbar:me-1" />
                    <span className="tw:hidden tw:@sm/toolbar:inline">{tabEncycLabel}</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>{tabEncycLabel}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="media" aria-label={tabMediaLabel}>
                    <ImageIcon className="tw:h-4 tw:w-4 tw:@sm/toolbar:me-1" />
                    <span className="tw:hidden tw:@sm/toolbar:inline">{tabMediaLabel}</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>{tabMediaLabel}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="maps" aria-label={tabMapsLabel}>
                    <MapPin className="tw:h-4 tw:w-4 tw:@sm/toolbar:me-1" />
                    <span className="tw:hidden tw:@sm/toolbar:inline">{tabMapsLabel}</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>{tabMapsLabel}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsList>
        </Tabs>

        {/*
         * FN-024: filter input is now ALWAYS rendered with min-width: 80px so the toolbar shrinks
         * based on available space (and the tab labels collapse to icon-only via the @sm/toolbar
         * container query) rather than hiding the input until the user clicks a word. The X clear
         * button only appears when there's something to clear so the empty input stays clean.
         */}
        <div
          data-testid="er-filter-box"
          className={cn(
            'tw:flex tw:min-w-[80px] tw:flex-1 tw:shrink tw:items-center tw:gap-1 tw:rounded tw:border tw:px-1',
            filterTintClass,
          )}
        >
          <Input
            value={searchValue}
            readOnly
            aria-label={filterAriaLabel}
            className="tw:h-7 tw:min-w-0 tw:flex-1 tw:border-0 tw:bg-transparent tw:text-xs tw:focus-visible:ring-0"
          />
          {filterActive && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={filterClearLabel}
              onClick={() => onSearchChange('')}
              className="tw:h-6 tw:w-6 tw:shrink-0"
            >
              <X className="tw:h-3.5 tw:w-3.5" />
            </Button>
          )}
        </div>

        <Select value={scope} onValueChange={handleScopeChange}>
          <SelectTrigger
            aria-label={scopeLabel}
            className="tw:w-32 tw:shrink-0 tw:@sm/toolbar:w-44"
            role="combobox"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-verse">{scopeVerseLabel}</SelectItem>
            <SelectItem value="current-section">{scopeSectionLabel}</SelectItem>
            <SelectItem value="current-chapter">{scopeChapterLabel}</SelectItem>
            {hasSenseScope && <SelectItem value="current-sense">{scopeSenseLabel}</SelectItem>}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Backward-compat combined Toolbar (kept for stories / single-mount consumers). Renders the top
 * toolbar followed immediately by the tab bar. The web-view shell mounts the two pieces separately
 * (Theme 8 Action 2) so the tab bar lives at the top of the lower split panel.
 * ------------------------------------------------------------------------------------------------ */

export type ToolbarProps = EnhancedResourceTopToolbarProps & EnhancedResourceTabBarProps;

/**
 * Pure presentational composite toolbar for the Enhanced Resource window — backward-compat wrapper
 * around the two split components introduced in Theme 8. New consumers should mount
 * `EnhancedResourceTopToolbar` and `EnhancedResourceTabBar` independently so the tab bar can sit
 * inside the lower ResizablePanel.
 *
 * [Revised: 2026-04-29] Themes 7-9.
 */
export function Toolbar(props: ToolbarProps) {
  const {
    // top-toolbar slice
    viewMenu,
    viewMenuHandlers,
    highlightMode,
    onHighlightModeChange,
    onInfoClick,
    onReferenceClick,
    scrollGroupId,
    availableScrollGroupIds,
    onScrollGroupChange,
    currentReferenceLabel,
    scrollGroupLocalizedStrings,
    // tab-bar slice
    activeTab,
    onTabChange,
    scope,
    onScopeChange,
    hasSenseScope,
    searchValue,
    onSearchChange,
    hasMatches,
    localizedStringsWithLoadingState,
  } = props;

  return (
    <div className="tw:flex tw:flex-col">
      <EnhancedResourceTopToolbar
        viewMenu={viewMenu}
        viewMenuHandlers={viewMenuHandlers}
        highlightMode={highlightMode}
        onHighlightModeChange={onHighlightModeChange}
        onInfoClick={onInfoClick}
        onReferenceClick={onReferenceClick}
        scrollGroupId={scrollGroupId}
        availableScrollGroupIds={availableScrollGroupIds}
        onScrollGroupChange={onScrollGroupChange}
        currentReferenceLabel={currentReferenceLabel}
        scrollGroupLocalizedStrings={scrollGroupLocalizedStrings}
        localizedStringsWithLoadingState={localizedStringsWithLoadingState}
      />
      <EnhancedResourceTabBar
        activeTab={activeTab}
        onTabChange={onTabChange}
        scope={scope}
        onScopeChange={onScopeChange}
        hasSenseScope={hasSenseScope}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        hasMatches={hasMatches}
        localizedStringsWithLoadingState={localizedStringsWithLoadingState}
      />
    </div>
  );
}

export default Toolbar;
