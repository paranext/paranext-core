import { useCallback, useMemo, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  usePromise,
} from 'platform-bible-react';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { WebViewProps } from '@papi/core';
import ScripturePane from '../components/scripture-pane.component';
import ERToolbar from '../components/er-toolbar.component';

/** Tracked project type */
interface TrackedProject {
  id: string;
  name: string;
}

/** Fallback projects shown when backend is unavailable */
const FALLBACK_PROJECTS: TrackedProject[] = [{ id: 'project-sample', name: 'Sample Project' }];

/** Enhanced resources service interface for available projects */
interface ERServiceProjectList {
  getAvailableProjects: () => Promise<TrackedProject[]>;
}

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
  '%platformEnhancedResources_guide_title%',
  '%platformEnhancedResources_guide_content%',
] as const;

/** Tab value constants matching the 4 research tabs */
const TAB_VALUES = ['dictionary', 'encyclopedia', 'media', 'maps'] as const;
type TabValue = (typeof TAB_VALUES)[number];

/** Scope filter type */
type ScopeFilterValue = 'currentVerse' | 'currentSection' | 'currentChapter';

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

  // Highlight toggle state (BHV-404)
  const [researchTermsOn, setResearchTermsOn] = useState(true);
  const [foundOn, setFoundOn] = useState(false);
  const [missingOn, setMissingOn] = useState(false);

  // Tracked project state (BHV-404)
  const [trackedProjectId, setTrackedProjectId] = useState<string | undefined>(undefined);

  // Scope filter state (BHV-402)
  const [scopeFilter, setScopeFilter] = useState<ScopeFilterValue>('currentVerse');

  // Guide panel visibility (BHV-604)
  const [guideVisible, setGuideVisible] = useState(false);

  // Filter state for linked word clicks
  const [filterLemma, setFilterLemma] = useState<string | undefined>(undefined);
  const [filterDisplayText, setFilterDisplayText] = useState('');
  const [filterHasResults, setFilterHasResults] = useState(true);
  const isFilterActive = filterLemma !== undefined;

  // Fetch available projects from backend (BHV-404); fallback when backend unavailable
  const [projectsFromBackend] = usePromise(
    useCallback(async () => {
      try {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const erService = (await papi.networkObjects.get('enhancedResources')) as
          | ERServiceProjectList
          | undefined;
        if (erService) {
          return erService.getAvailableProjects();
        }
      } catch {
        // Backend not available — use fallback
      }
      return FALLBACK_PROJECTS;
    }, []),
    FALLBACK_PROJECTS,
  );

  const availableProjects = projectsFromBackend ?? FALLBACK_PROJECTS;
  const trackedProject =
    trackedProjectId !== undefined
      ? (availableProjects.find((p) => p.id === trackedProjectId) ?? {
          id: trackedProjectId,
          name: trackedProjectId,
        })
      : undefined;

  // Handle linked word click - activate filter
  const handleWordClick = useCallback((lemma: string, displayText: string) => {
    setFilterLemma(lemma);
    setFilterDisplayText(displayText);
    // Default to having results; backend would determine this
    setFilterHasResults(true);
  }, []);

  // Handle clear filter
  const handleClearFilter = useCallback(() => {
    setFilterLemma(undefined);
    setFilterDisplayText('');
    setFilterHasResults(true);
  }, []);

  // Toolbar toggle handlers
  const handleToggleResearchTerms = useCallback(() => {
    setResearchTermsOn((prev) => !prev);
  }, []);

  const handleToggleFound = useCallback(() => {
    setFoundOn((prev) => !prev);
  }, []);

  const handleToggleMissing = useCallback(() => {
    setMissingOn((prev) => !prev);
  }, []);

  const handleTrackedProjectChange = useCallback((projectId: string | undefined) => {
    setTrackedProjectId(projectId);
    // When project is cleared, turn off Found and Missing (BHV-404)
    if (projectId === undefined) {
      setFoundOn(false);
      setMissingOn(false);
    }
  }, []);

  const handleScopeFilterChange = useCallback((scope: ScopeFilterValue) => {
    setScopeFilter(scope);
  }, []);

  const handleToggleGuide = useCallback(() => {
    setGuideVisible((prev) => !prev);
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
  const guideTitle =
    localizedStrings['%platformEnhancedResources_guide_title%'] || 'Getting Started';
  const guideContent =
    localizedStrings['%platformEnhancedResources_guide_content%'] ||
    'Click on highlighted words in the scripture pane to explore dictionary entries, encyclopedia articles, images, and maps.';

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-[100dvh]" data-testid="er-web-view">
      {/* ERToolbar (BHV-402, BHV-404, BHV-412, BHV-414, BHV-604) */}
      <ERToolbar
        researchTermsOn={researchTermsOn}
        onToggleResearchTerms={handleToggleResearchTerms}
        foundOn={foundOn}
        onToggleFound={handleToggleFound}
        missingOn={missingOn}
        onToggleMissing={handleToggleMissing}
        trackedProject={trackedProject}
        availableProjects={availableProjects}
        onTrackedProjectChange={handleTrackedProjectChange}
        scopeFilter={scopeFilter}
        onScopeFilterChange={handleScopeFilterChange}
        guideVisible={guideVisible}
        onToggleGuide={handleToggleGuide}
      />

      {/* Guide panel (BHV-604) - toggled by info icon */}
      {guideVisible && (
        <div
          data-testid="guide-panel"
          className="tw-px-4 tw-py-3 tw-bg-blue-50 tw-border-b tw-text-sm"
        >
          <h3 className="tw-font-semibold tw-mb-1">{guideTitle}</h3>
          <p className="tw-text-muted-foreground">{guideContent}</p>
        </div>
      )}

      <ResizablePanelGroup direction="vertical" data-testid="er-split-pane" onLayout={handleResize}>
        {/* Scripture Pane (top) */}
        <ResizablePanel defaultSize={splitterPosition} minSize={15}>
          <ScripturePane
            scrRef={scrRef}
            onWordClick={handleWordClick}
            onClearFilter={handleClearFilter}
            isFilterActive={isFilterActive}
            researchTermsOn={researchTermsOn}
            foundOn={foundOn}
            missingOn={missingOn}
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
            {/* Filter box - visible when a word is clicked (BHV-403) */}
            {isFilterActive && (
              <div
                data-testid="filter-box"
                data-state={filterHasResults ? 'results' : 'empty'}
                className={`tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-border-b tw-text-sm tw-transition-colors tw-duration-400 ${
                  filterHasResults ? 'tw-bg-green-100' : 'tw-bg-orange-100'
                }`}
              >
                <span className="tw-font-medium">{filterLabel}</span>
                <span>{filterDisplayText}</span>
                <button
                  type="button"
                  data-testid="btn-clear-filter"
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
