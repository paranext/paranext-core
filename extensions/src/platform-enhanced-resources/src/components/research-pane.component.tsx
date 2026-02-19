import { useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'platform-bible-react';
import { X } from 'lucide-react';
import type { WordFilterData } from './scripture-pane.component';

// --- Types ---

/** Research tab identifiers */
export type ResearchTab = 'dictionary' | 'encyclopedia' | 'media' | 'maps';

/** Scope filter values for the research pane dropdown */
export type ScopeFilterValue =
  | 'current-verse'
  | 'current-section'
  | 'current-chapter'
  | 'current-sense';

/** Props for the ResearchPane component */
export interface ResearchPaneProps {
  /** Currently active tab */
  activeTab: ResearchTab;
  /** Callback when tab changes */
  onTabChange: (tab: ResearchTab) => void;
  /** Current scope filter value */
  scopeFilter: ScopeFilterValue;
  /** Callback when scope filter changes */
  onScopeFilterChange: (scope: ScopeFilterValue) => void;
  /** Active word filter data, or undefined if no filter */
  wordFilter?: WordFilterData;
  /** Callback to clear the word filter */
  onClearWordFilter: () => void;
}

// --- Constants ---

/** Tab definitions for iteration */
const RESEARCH_TABS: { value: ResearchTab; labelKey: LocalizeKey }[] = [
  { value: 'dictionary', labelKey: '%enhancedResources_dictionaryTab%' },
  { value: 'encyclopedia', labelKey: '%enhancedResources_encyclopediaTab%' },
  { value: 'media', labelKey: '%enhancedResources_mediaTab%' },
  { value: 'maps', labelKey: '%enhancedResources_mapsTab%' },
];

/** Base scope filter options (always shown) */
const BASE_SCOPE_OPTIONS: { value: ScopeFilterValue; labelKey: LocalizeKey }[] = [
  { value: 'current-verse', labelKey: '%enhancedResources_currentVerse%' },
  { value: 'current-section', labelKey: '%enhancedResources_currentSection%' },
  { value: 'current-chapter', labelKey: '%enhancedResources_currentChapter%' },
];

/** Current Sense option (shown conditionally) */
const CURRENT_SENSE_OPTION: { value: ScopeFilterValue; labelKey: LocalizeKey } = {
  value: 'current-sense',
  labelKey: '%enhancedResources_currentSense%',
};

// --- Localization keys ---

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%enhancedResources_dictionaryTab%',
  '%enhancedResources_encyclopediaTab%',
  '%enhancedResources_mediaTab%',
  '%enhancedResources_mapsTab%',
  '%enhancedResources_currentVerse%',
  '%enhancedResources_currentSection%',
  '%enhancedResources_currentChapter%',
  '%enhancedResources_currentSense%',
  '%enhancedResources_clearFilter%',
  '%enhancedResources_scopeFilter%',
  '%enhancedResources_emptyState%',
  '%enhancedResources_wordFilterLabel%',
];

// --- Component ---

export default function ResearchPane({
  activeTab,
  onTabChange,
  scopeFilter,
  onScopeFilterChange,
  wordFilter,
  onClearWordFilter,
}: ResearchPaneProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // Determine whether to show the "Current Sense" scope option:
  // only when word filter is active AND the Dictionary tab is selected
  const showCurrentSense = !!wordFilter && activeTab === 'dictionary';

  const scopeOptions = useMemo(() => {
    if (showCurrentSense) {
      return [...BASE_SCOPE_OPTIONS, CURRENT_SENSE_OPTION];
    }
    return BASE_SCOPE_OPTIONS;
  }, [showCurrentSense]);

  // If the current scope filter is "current-sense" but the condition is no longer met,
  // reset to "current-verse"
  const effectiveScopeFilter =
    scopeFilter === 'current-sense' && !showCurrentSense ? 'current-verse' : scopeFilter;

  // Determine the word filter bar background color based on source pane
  const wordFilterBgClass =
    wordFilter?.sourcePane === 'dictionary'
      ? 'tw-bg-blue-100 tw-border-blue-300'
      : 'tw-bg-green-100 tw-border-green-300';

  /** Map of valid tab values for type-safe lookups */
  const TAB_HANDLERS: Record<string, ResearchTab> = {
    dictionary: 'dictionary',
    encyclopedia: 'encyclopedia',
    media: 'media',
    maps: 'maps',
  };

  /** Map of valid scope values for type-safe lookups */
  const SCOPE_HANDLERS: Record<string, ScopeFilterValue> = {
    'current-verse': 'current-verse',
    'current-section': 'current-section',
    'current-chapter': 'current-chapter',
    'current-sense': 'current-sense',
  };

  const handleTabChange = (value: string) => {
    const tab = TAB_HANDLERS[value];
    if (tab) onTabChange(tab);
  };

  const handleScopeChange = (value: string) => {
    const scope = SCOPE_HANDLERS[value];
    if (scope) onScopeFilterChange(scope);
  };

  return (
    <div data-testid="research-pane" className="tw-flex tw-flex-col tw-h-full tw-min-h-0">
      {/* Header area: scope filter and word filter bar */}
      <div className="tw-flex tw-flex-col tw-shrink-0 tw-px-2 tw-pt-2 tw-gap-2">
        {/* Scope filter dropdown */}
        <div className="tw-flex tw-items-center tw-gap-2">
          <span className="tw-text-sm tw-text-muted-foreground tw-shrink-0">
            {localizedStrings['%enhancedResources_scopeFilter%']}
          </span>
          <Select value={effectiveScopeFilter} onValueChange={handleScopeChange}>
            <SelectTrigger
              size="sm"
              className="tw-w-44"
              aria-label={localizedStrings['%enhancedResources_scopeFilter%']}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {scopeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {localizedStrings[option.labelKey]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Word filter bar - shown only when word filter is active */}
        {wordFilter ? (
          <div
            data-testid="word-filter-bar"
            className={`tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1.5 tw-rounded-md tw-border ${wordFilterBgClass}`}
          >
            <span className="tw-text-xs tw-text-muted-foreground tw-shrink-0">
              {localizedStrings['%enhancedResources_wordFilterLabel%']}
            </span>
            <span className="tw-text-sm tw-font-medium tw-flex-1 tw-truncate">
              {wordFilter.surfaceForm}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="tw-h-6 tw-w-6 tw-p-0 tw-shrink-0"
              onClick={onClearWordFilter}
              aria-label={localizedStrings['%enhancedResources_clearFilter%']}
            >
              <X className="tw-h-3.5 tw-w-3.5" />
            </Button>
          </div>
        ) : undefined}
      </div>

      {/* Tabs area */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="tw-flex tw-flex-col tw-flex-1 tw-min-h-0 tw-px-2 tw-pt-2"
      >
        <TabsList className="tw-w-full tw-shrink-0">
          {RESEARCH_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="tw-flex-1">
              {localizedStrings[tab.labelKey]}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab content panels - placeholder content for now; will be replaced in UI-PKG-005 through UI-PKG-008 */}
        <TabsContent value="dictionary" className="tw-flex-1 tw-overflow-auto tw-min-h-0">
          <div data-testid="dictionary-tab-content" className="tw-p-4">
            <p className="tw-text-muted-foreground tw-text-sm">
              {localizedStrings['%enhancedResources_emptyState%']}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="encyclopedia" className="tw-flex-1 tw-overflow-auto tw-min-h-0">
          <div data-testid="encyclopedia-tab-content" className="tw-p-4">
            <p className="tw-text-muted-foreground tw-text-sm">
              {localizedStrings['%enhancedResources_emptyState%']}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="media" className="tw-flex-1 tw-overflow-auto tw-min-h-0">
          <div data-testid="media-tab-content" className="tw-p-4">
            <p className="tw-text-muted-foreground tw-text-sm">
              {localizedStrings['%enhancedResources_emptyState%']}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="maps" className="tw-flex-1 tw-overflow-auto tw-min-h-0">
          <div data-testid="maps-tab-content" className="tw-p-4">
            <p className="tw-text-muted-foreground tw-text-sm">
              {localizedStrings['%enhancedResources_emptyState%']}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
