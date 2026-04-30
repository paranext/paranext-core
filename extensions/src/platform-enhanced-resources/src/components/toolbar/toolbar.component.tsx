import {
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
import { BookOpen, Book, Image as ImageIcon, Info, MapPin, Menu, X } from 'lucide-react';
import type { LocalizedStringValue, ScrollGroupId } from 'platform-bible-utils';

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
  /** Reference-button click handler (placeholder for BCV control wiring in phase-3-ui — FN-015). */
  onReferenceClick?: () => void;
  /** Currently selected scroll-group id (or undefined for none). */
  scrollGroupId?: ScrollGroupId | undefined;
  /** Available scroll-group ids for the selector. */
  availableScrollGroupIds?: ScrollGroupSelectorProps['availableScrollGroupIds'];
  /** Callback fired when the user picks a different scroll group. */
  onScrollGroupChange?: ScrollGroupSelectorProps['onChangeScrollGroupId'];
  /** Optional label of the current verse reference (formatted by parent). */
  currentReferenceLabel?: string;
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
  onReferenceClick = () => {},
  scrollGroupId = undefined,
  availableScrollGroupIds = [undefined, 0, 1, 2],
  onScrollGroupChange = () => {},
  currentReferenceLabel,
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
  const showTranslationsLabel = String(
    getLocalizedString('%enhancedResources_toolbar_menu_showTranslations%'),
  );
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
          <Menu className="tw-h-4 tw-w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="tw-min-w-56">
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
        <DropdownMenuItem onSelect={onCloseWindow}>{closeLabel}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onZoomIn}>{zoomInLabel}</DropdownMenuItem>
        <DropdownMenuItem onSelect={onZoomOut}>{zoomOutLabel}</DropdownMenuItem>
        <DropdownMenuItem onSelect={onZoomReset}>{zoomResetLabel}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const startArea = (
    <div className="tw-flex tw-items-center tw-gap-2">
      <Button
        variant="outline"
        size="sm"
        aria-label={referenceLabel}
        className="tw-font-mono"
        onClick={onReferenceClick}
      >
        {currentReferenceLabel ?? referenceLabel}
      </Button>
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
      className={cn('tw-text-xs', highlightMode === 'all-research-terms' && 'tw-bg-accent')}
    >
      {highlightLabel}
    </Button>
  );

  const endArea = (
    <div className="tw-flex tw-items-center tw-gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={infoLabel} onClick={onInfoClick}>
            <Info className="tw-h-4 tw-w-4" />
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
          <div className="tw-flex tw-items-center tw-gap-2">
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

  const filterVisible = searchValue.length > 0;
  // Theme 9 — match `filterBox` semantics from ui-spec-marble-form.md line 36:
  //   green-ish (has matches) vs orange-ish (no matches).
  const filterTintClass = hasMatches
    ? 'tw-bg-emerald-100 dark:tw-bg-emerald-900/40'
    : 'tw-bg-orange-100 dark:tw-bg-orange-900/40';

  return (
    // `@container` enables responsive collapse without any media-query plumbing — the parent panel
    // resize drives label visibility. At narrow widths (<640px container, the @sm breakpoint) the
    // tab labels collapse to icon-only and the row stays on a single line. Width 300-400px is
    // exercised in toolbar.stories.tsx.
    <div className="tw-@container tw-w-full">
      <div className="tw-flex tw-flex-nowrap tw-items-center tw-gap-2 tw-overflow-hidden tw-border-b tw-px-2 tw-py-1.5">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="tw-flex-shrink-0">
          <TabsList>
            <TabsTrigger value="dictionary" aria-label={tabDictLabel}>
              <BookOpen className="tw-h-4 tw-w-4 @sm:tw-me-1" />
              <span className="tw-hidden @sm:tw-inline">{tabDictLabel}</span>
            </TabsTrigger>
            <TabsTrigger value="encyclopedia" aria-label={tabEncycLabel}>
              <Book className="tw-h-4 tw-w-4 @sm:tw-me-1" />
              <span className="tw-hidden @sm:tw-inline">{tabEncycLabel}</span>
            </TabsTrigger>
            <TabsTrigger value="media" aria-label={tabMediaLabel}>
              <ImageIcon className="tw-h-4 tw-w-4 @sm:tw-me-1" />
              <span className="tw-hidden @sm:tw-inline">{tabMediaLabel}</span>
            </TabsTrigger>
            <TabsTrigger value="maps" aria-label={tabMapsLabel}>
              <MapPin className="tw-h-4 tw-w-4 @sm:tw-me-1" />
              <span className="tw-hidden @sm:tw-inline">{tabMapsLabel}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {filterVisible && (
          <div
            data-testid="er-filter-box"
            className={cn(
              'tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-1 tw-rounded tw-border tw-px-1',
              filterTintClass,
            )}
          >
            <Input
              value={searchValue}
              readOnly
              aria-label={filterAriaLabel}
              className="tw-h-7 tw-min-w-0 tw-flex-1 tw-border-0 tw-bg-transparent tw-text-xs focus-visible:tw-ring-0"
            />
            <Button
              variant="ghost"
              size="icon"
              aria-label={filterClearLabel}
              onClick={() => onSearchChange('')}
              className="tw-h-6 tw-w-6 tw-flex-shrink-0"
            >
              <X className="tw-h-3.5 tw-w-3.5" />
            </Button>
          </div>
        )}

        {!filterVisible && <div className="tw-flex-1" />}

        <Select value={scope} onValueChange={handleScopeChange}>
          <SelectTrigger
            aria-label={scopeLabel}
            className="tw-w-32 tw-flex-shrink-0 @sm:tw-w-44"
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
    <div className="tw-flex tw-flex-col">
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
