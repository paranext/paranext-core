import {
  Button,
  ScrollGroupSelector,
  type ScrollGroupSelectorProps,
  SearchBar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from 'platform-bible-react';
import { BookOpen, Book, Image as ImageIcon, Info, MapPin, Menu } from 'lucide-react';
import type { LocalizedStringValue, ScrollGroupId } from 'platform-bible-utils';

/** Object containing all keys used for localization in this component. */
export const TOOLBAR_STRING_KEYS = Object.freeze([
  '%enhancedResources_toolbar_tabMenu%',
  '%enhancedResources_toolbar_info%',
  '%enhancedResources_toolbar_highlightAllResearchTerms%',
  '%enhancedResources_toolbar_currentReference%',
  '%enhancedResources_toolbar_searchPlaceholder%',
  '%enhancedResources_toolbar_scopeLabel%',
  '%enhancedResources_toolbar_scope_currentVerse%',
  '%enhancedResources_toolbar_scope_currentSection%',
  '%enhancedResources_toolbar_scope_currentChapter%',
  '%enhancedResources_toolbar_scope_currentSense%',
  '%enhancedResources_toolbar_tab_dictionary%',
  '%enhancedResources_toolbar_tab_encyclopedia%',
  '%enhancedResources_toolbar_tab_media%',
  '%enhancedResources_toolbar_tab_maps%',
] as const);

type ToolbarLocalizedStringKey = (typeof TOOLBAR_STRING_KEYS)[number];
type ToolbarLocalizedStrings = {
  [key in ToolbarLocalizedStringKey]?: LocalizedStringValue;
};

export type ResearchTab = 'dictionary' | 'encyclopedia' | 'media' | 'maps';
export type MarbleScope = 'current-verse' | 'current-section' | 'current-chapter' | 'current-sense';
export type HighlightMode = 'none' | 'all-research-terms';

export type ToolbarVerseRef = {
  book: number;
  chapter: number;
  verse: number;
};

export type ToolbarProps = {
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
  /** Current text in the search bar. */
  searchValue?: string;
  /** Callback fired when search bar text changes. */
  onSearchChange?: (value: string) => void;
  /** Highlight mode toggle (BHV-306). */
  highlightMode?: HighlightMode;
  /** Callback fired when the highlight toggle changes. */
  onHighlightModeChange?: (mode: HighlightMode) => void;
  /** Callback fired when the info / guide button is clicked. */
  onInfoClick?: () => void;
  /** Callback fired when the project / view tab menu button is clicked. */
  onTabMenuClick?: () => void;
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

/**
 * Pure presentational composite toolbar for the Enhanced Resource window.
 *
 * Top row (TabToolbar-style): [TabMenu] | [BCV / current ref] | [Highlight toggle] | [Info] |
 * [ScrollGroup]
 *
 * Bottom row (Toolbar-style): [Tabs: Dictionary / Encyclopedia / Media / Maps] | [SearchBar] |
 * [Scope selector]
 *
 * The actual `BookChapterControl` is wired in phase-3-ui because it requires
 * `useWebViewScrollGroupScrRef`. We expose `currentReferenceLabel` plus an `onTabMenuClick` slot so
 * the wiring layer can swap in the real picker without restructuring the toolbar.
 */
export function Toolbar({
  activeTab,
  onTabChange,
  scope,
  onScopeChange,
  hasSenseScope = false,
  searchValue = '',
  onSearchChange = () => {},
  highlightMode = 'none',
  onHighlightModeChange = () => {},
  onInfoClick = () => {},
  onTabMenuClick = () => {},
  scrollGroupId = undefined,
  availableScrollGroupIds = [undefined, 0, 1, 2],
  onScrollGroupChange = () => {},
  currentReferenceLabel,
  scrollGroupLocalizedStrings,
  localizedStringsWithLoadingState = [{}, false],
}: ToolbarProps) {
  const getLocalizedString = (key: ToolbarLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const tabMenuLabel = String(getLocalizedString('%enhancedResources_toolbar_tabMenu%'));
  const infoLabel = String(getLocalizedString('%enhancedResources_toolbar_info%'));
  const highlightLabel = String(
    getLocalizedString('%enhancedResources_toolbar_highlightAllResearchTerms%'),
  );
  const referenceLabel = String(getLocalizedString('%enhancedResources_toolbar_currentReference%'));
  const searchPlaceholder = String(
    getLocalizedString('%enhancedResources_toolbar_searchPlaceholder%'),
  );
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

  return (
    <TooltipProvider>
      <div className="tw-flex tw-flex-col tw-border-b">
        {/* Upper TabToolbar row */}
        <div className="tw-flex tw-items-center tw-gap-2 tw-border-b tw-px-2 tw-py-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tabMenuLabel}
                onClick={onTabMenuClick}
              >
                <Menu className="tw-h-4 tw-w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tabMenuLabel}</TooltipContent>
          </Tooltip>

          <Button
            variant="outline"
            size="sm"
            aria-label={referenceLabel}
            className="tw-font-mono"
            onClick={onTabMenuClick}
          >
            {currentReferenceLabel ?? referenceLabel}
          </Button>

          <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center">
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
          </div>

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

        {/* Lower Toolbar row: tabs, search, scope */}
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2 tw-px-2 tw-py-2">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="tw-flex-shrink-0">
            <TabsList>
              <TabsTrigger value="dictionary" aria-label={tabDictLabel}>
                <BookOpen className="tw-me-1 tw-h-4 tw-w-4" />
                <span className="tw-hidden sm:tw-inline">{tabDictLabel}</span>
              </TabsTrigger>
              <TabsTrigger value="encyclopedia" aria-label={tabEncycLabel}>
                <Book className="tw-me-1 tw-h-4 tw-w-4" />
                <span className="tw-hidden sm:tw-inline">{tabEncycLabel}</span>
              </TabsTrigger>
              <TabsTrigger value="media" aria-label={tabMediaLabel}>
                <ImageIcon className="tw-me-1 tw-h-4 tw-w-4" />
                <span className="tw-hidden sm:tw-inline">{tabMediaLabel}</span>
              </TabsTrigger>
              <TabsTrigger value="maps" aria-label={tabMapsLabel}>
                <MapPin className="tw-me-1 tw-h-4 tw-w-4" />
                <span className="tw-hidden sm:tw-inline">{tabMapsLabel}</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <SearchBar
            value={searchValue}
            onSearch={onSearchChange}
            placeholder={searchPlaceholder}
            className="tw-flex-1 tw-min-w-40"
          />

          <Select value={scope} onValueChange={handleScopeChange}>
            <SelectTrigger
              aria-label={scopeLabel}
              className="tw-w-44 tw-flex-shrink-0"
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
    </TooltipProvider>
  );
}

export default Toolbar;
