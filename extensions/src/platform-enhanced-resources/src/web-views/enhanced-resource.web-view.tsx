import { useCallback, useMemo, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { WebViewProps } from '@papi/core';
import ScripturePane from '../components/scripture-pane.component';

/** Localized string keys used by this web view */
const LOCALIZED_STRING_KEYS = [
  '%platformEnhancedResources_title%',
  '%platformEnhancedResources_tab_dictionary%',
  '%platformEnhancedResources_tab_encyclopedia%',
  '%platformEnhancedResources_tab_media%',
  '%platformEnhancedResources_tab_maps%',
  '%platformEnhancedResources_scripture_placeholder%',
  '%platformEnhancedResources_research_placeholder%',
  '%platformEnhancedResources_filter_label%',
] as const;

/** Tab value constants matching the 4 research tabs */
const TAB_VALUES = ['dictionary', 'encyclopedia', 'media', 'maps'] as const;
type TabValue = (typeof TAB_VALUES)[number];

/** Key for storing selected tab in localStorage for cross-session persistence */
const STORAGE_KEY_SELECTED_TAB = 'platformEnhancedResources.selectedTab';
const STORAGE_KEY_SPLITTER = 'platformEnhancedResources.splitterPosition';

/** Check if a value is one of the valid tab values */
function isValidTab(value: string): value is TabValue {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return TAB_VALUES.includes(value as TabValue);
}

/** Read a persisted value from localStorage with type safety */
function readPersistedValue<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    // eslint-disable-next-line no-null/no-null
    if (stored !== null) {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return JSON.parse(stored) as T;
    }
  } catch {
    // Ignore parse errors, return default
  }
  return defaultValue;
}

/** Write a value to localStorage for cross-session persistence */
function persistValue<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors (quota exceeded, etc.)
  }
}

/** Default tab value for initial render */
const DEFAULT_TAB: TabValue = 'dictionary';

globalThis.webViewComponent = function EnhancedResourceWebView({
  useWebViewScrollGroupScrRef,
  useWebViewState,
}: WebViewProps) {
  const [scrRef] = useWebViewScrollGroupScrRef();

  // Persisted state via useWebViewState (within-session) + localStorage (cross-session)
  const [splitterPosition, setSplitterPosition] = useWebViewState<number>(
    'splitterPosition',
    readPersistedValue(STORAGE_KEY_SPLITTER, 50),
  );
  const [selectedTab, setSelectedTab] = useWebViewState<TabValue>(
    'selectedTab',
    readPersistedValue(STORAGE_KEY_SELECTED_TAB, DEFAULT_TAB),
  );

  const [localizedStrings] = useLocalizedStrings(useMemo(() => [...LOCALIZED_STRING_KEYS], []));

  // Filter state for linked word clicks
  const [filterLemma, setFilterLemma] = useState<string | undefined>(undefined);
  const [filterDisplayText, setFilterDisplayText] = useState('');
  const isFilterActive = filterLemma !== undefined;

  // Handle linked word click - activate filter
  const handleWordClick = useCallback((lemma: string, displayText: string) => {
    setFilterLemma(lemma);
    setFilterDisplayText(displayText);
  }, []);

  // Handle clear filter
  const handleClearFilter = useCallback(() => {
    setFilterLemma(undefined);
    setFilterDisplayText('');
  }, []);

  // Handle splitter resize - persist the new position
  const handleResize = useCallback(
    (sizes: number[]) => {
      if (sizes.length >= 1) {
        setSplitterPosition(sizes[0]);
        persistValue(STORAGE_KEY_SPLITTER, sizes[0]);
      }
    },
    [setSplitterPosition],
  );

  // Handle tab change - persist the selected tab
  const handleTabChange = useCallback(
    (value: string) => {
      if (isValidTab(value)) {
        setSelectedTab(value);
        persistValue(STORAGE_KEY_SELECTED_TAB, value);
      }
    },
    [setSelectedTab],
  );

  // Localized tab labels with fallbacks
  const tabLabels = useMemo(
    () => ({
      dictionary: localizedStrings['%platformEnhancedResources_tab_dictionary%'] || 'Dictionary',
      encyclopedia:
        localizedStrings['%platformEnhancedResources_tab_encyclopedia%'] || 'Encyclopedia',
      media: localizedStrings['%platformEnhancedResources_tab_media%'] || 'Media',
      maps: localizedStrings['%platformEnhancedResources_tab_maps%'] || 'Maps',
    }),
    [localizedStrings],
  );

  const filterLabel =
    localizedStrings['%platformEnhancedResources_filter_label%'] || 'Filtered by:';

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-[100dvh]" data-testid="er-web-view">
      <ResizablePanelGroup direction="vertical" data-testid="er-split-pane" onLayout={handleResize}>
        {/* Scripture Pane (top) */}
        <ResizablePanel defaultSize={splitterPosition} minSize={15}>
          <ScripturePane
            scrRef={scrRef}
            onWordClick={handleWordClick}
            onClearFilter={handleClearFilter}
            isFilterActive={isFilterActive}
          />
        </ResizablePanel>

        {/* Draggable splitter divider */}
        <ResizableHandle withHandle data-testid="main-splitter" />

        {/* Research Pane (bottom) */}
        <ResizablePanel defaultSize={100 - splitterPosition} minSize={15}>
          <div
            className="tw-h-full tw-flex tw-flex-col tw-overflow-hidden"
            data-testid="research-pane-container"
          >
            {/* Filter box - visible when a word is clicked */}
            {isFilterActive && (
              <div
                data-testid="filter-box"
                className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-green-100 tw-border-b tw-text-sm"
              >
                <span className="tw-font-medium">{filterLabel}</span>
                <span>{filterDisplayText}</span>
                <button
                  type="button"
                  onClick={handleClearFilter}
                  className="tw-ml-auto tw-text-muted-foreground hover:tw-text-foreground"
                  aria-label="Clear filter"
                >
                  X
                </button>
              </div>
            )}

            {/* Research tabs */}
            <Tabs
              value={selectedTab}
              onValueChange={handleTabChange}
              className="tw-flex tw-flex-col tw-h-full"
              data-testid="research-tabs"
            >
              <TabsList className="tw-w-full tw-justify-start tw-shrink-0">
                <TabsTrigger value="dictionary" aria-label={tabLabels.dictionary}>
                  {tabLabels.dictionary}
                </TabsTrigger>
                <TabsTrigger value="encyclopedia" aria-label={tabLabels.encyclopedia}>
                  {tabLabels.encyclopedia}
                </TabsTrigger>
                <TabsTrigger value="media" aria-label={tabLabels.media}>
                  {tabLabels.media}
                </TabsTrigger>
                <TabsTrigger value="maps" aria-label={tabLabels.maps}>
                  {tabLabels.maps}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dictionary" className="tw-flex-1 tw-overflow-auto tw-p-4">
                {/* Placeholder for DictionaryTab component (WP-006) */}
              </TabsContent>
              <TabsContent value="encyclopedia" className="tw-flex-1 tw-overflow-auto tw-p-4">
                {/* Placeholder for EncyclopediaTab component (WP-006) */}
              </TabsContent>
              <TabsContent value="media" className="tw-flex-1 tw-overflow-auto tw-p-4">
                {/* Placeholder for MediaTab component (WP-006) */}
              </TabsContent>
              <TabsContent value="maps" className="tw-flex-1 tw-overflow-auto tw-p-4">
                {/* Placeholder for MapsTab component (WP-006) */}
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
