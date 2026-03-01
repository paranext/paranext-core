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
import WarningBannerStack from '../components/warning-banner.component';
import type { WarningState } from '../components/warning-banner.component';
import GuideContent from '../components/guide-content.component';
import DictionaryTab from '../components/dictionary-tab.component';
import EncyclopediaTab from '../components/encyclopedia-tab.component';
import MediaTab from '../components/media-tab.component';
import MapsTab from '../components/maps-tab.component';

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

/** Active overlay viewer type */
type ActiveOverlay =
  | { type: 'article'; entryId: string }
  | { type: 'media'; imageId: string }
  | undefined;

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
  '%platformEnhancedResources_scope_current_verse%',
  '%platformEnhancedResources_scope_current_section%',
  '%platformEnhancedResources_scope_current_chapter%',
] as const;

/** Tab value constants matching the 4 research tabs */
const TAB_VALUES = ['dictionary', 'encyclopedia', 'media', 'maps'] as const;
type TabValue = (typeof TAB_VALUES)[number];

/** Scope filter type */
type ScopeFilterValue = 'currentVerse' | 'currentSection' | 'currentChapter';

/** Key for storing splitter position in localStorage for cross-session persistence */
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
  const [selectedTab, setSelectedTab] = useWebViewState<TabValue>('selectedTab', DEFAULT_TAB);

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

  // Guide "show on open" checkbox state (BHV-410)
  const [showGuideOnOpen, setShowGuideOnOpen] = useState(true);

  // Warning banner state (BHV-411)
  // Backend not yet registered -- use fallback state showing representative banners
  const [warningState] = useState<WarningState>({
    missingBook: false,
    reviewStatus: true,
    imageWarning: false,
    copyrightWarning: true,
    updateRequiredData: false,
    updateAvailable: true,
  });

  // Filter state for linked word clicks
  const [filterLemma, setFilterLemma] = useState<string | undefined>(undefined);
  const [filterDisplayText, setFilterDisplayText] = useState('');
  const [filterHasResults, setFilterHasResults] = useState(true);
  const isFilterActive = filterLemma !== undefined;

  // Overlay viewer state (BHV-406: article viewer, media viewer)
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(undefined);

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

  const handleCloseGuide = useCallback(() => {
    setGuideVisible(false);
  }, []);

  const handleToggleShowGuideOnOpen = useCallback(() => {
    setShowGuideOnOpen((prev) => !prev);
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

  // Handle tab change - set the selected tab and clear overlay
  const handleTabChange = useCallback(
    (value: string) => {
      if (isValidTab(value)) {
        setSelectedTab(value);
        setActiveOverlay(undefined);
      }
    },
    [setSelectedTab],
  );

  // Overlay handlers
  const handleOpenArticle = useCallback((entryId: string) => {
    setActiveOverlay({ type: 'article', entryId });
  }, []);

  const handleOpenMedia = useCallback((imageId: string) => {
    setActiveOverlay({ type: 'media', imageId });
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setActiveOverlay(undefined);
  }, []);

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

  // Helper to get localized string with fallback (useLocalizedStrings returns
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

      {/* Guide panel (BHV-410, BHV-604) - toggled by info icon */}
      {guideVisible && (
        <GuideContent
          showOnOpen={showGuideOnOpen}
          onToggleShowOnOpen={handleToggleShowGuideOnOpen}
          onClose={handleCloseGuide}
        />
      )}

      {/* Warning banners (BHV-411) - conditional banners below toolbar */}
      <WarningBannerStack warnings={warningState} />

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
                className={`tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-border-b tw-text-sm tw-transition-colors tw-duration-400 tw-shrink-0 ${
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
              className="tw-flex tw-flex-col tw-flex-1 tw-min-h-0"
              data-testid="research-tabs"
            >
              <TabsList className="tw-w-full tw-justify-start tw-shrink-0">
                <TabsTrigger
                  value="dictionary"
                  aria-label={tabLabels.dictionary}
                  data-testid="tab-dictionary"
                >
                  {tabLabels.dictionary}
                </TabsTrigger>
                <TabsTrigger
                  value="encyclopedia"
                  aria-label={tabLabels.encyclopedia}
                  data-testid="tab-encyclopedia"
                >
                  {tabLabels.encyclopedia}
                </TabsTrigger>
                <TabsTrigger value="media" aria-label={tabLabels.media} data-testid="tab-media">
                  {tabLabels.media}
                </TabsTrigger>
                <TabsTrigger value="maps" aria-label={tabLabels.maps} data-testid="tab-maps">
                  {tabLabels.maps}
                </TabsTrigger>
              </TabsList>

              {/* Tab content with overlay support */}
              <TabsContent value="dictionary" className="tw-flex-1 tw-overflow-auto">
                <DictionaryTab scopeFilter={scopeFilter} filteredLemma={filterLemma} />
              </TabsContent>
              <TabsContent value="encyclopedia" className="tw-flex-1 tw-overflow-auto">
                {activeOverlay?.type === 'article' ? (
                  <div data-testid="article-viewer" className="tw-p-4">
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                      <h2 className="tw-text-lg tw-font-semibold">{activeOverlay.entryId}</h2>
                      <button
                        type="button"
                        onClick={handleCloseOverlay}
                        className="tw-text-muted-foreground hover:tw-text-foreground"
                        aria-label="Close article viewer"
                      >
                        X
                      </button>
                    </div>
                    <p className="tw-text-sm tw-text-muted-foreground">
                      Article content loading...
                    </p>
                  </div>
                ) : (
                  <EncyclopediaTab
                    scopeFilter={scopeFilter}
                    filteredLemma={filterLemma}
                    onOpenArticle={handleOpenArticle}
                  />
                )}
              </TabsContent>
              <TabsContent value="media" className="tw-flex-1 tw-overflow-auto">
                {activeOverlay?.type === 'media' ? (
                  <div data-testid="media-viewer" className="tw-p-4">
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                      <h2 className="tw-text-lg tw-font-semibold">{activeOverlay.imageId}</h2>
                      <button
                        type="button"
                        onClick={handleCloseOverlay}
                        className="tw-text-muted-foreground hover:tw-text-foreground"
                        aria-label="Close media viewer"
                      >
                        X
                      </button>
                    </div>
                    <div className="tw-bg-muted tw-h-48 tw-rounded tw-flex tw-items-center tw-justify-center tw-text-muted-foreground">
                      Image loading...
                    </div>
                  </div>
                ) : (
                  <MediaTab
                    scopeFilter={scopeFilter}
                    filteredLemma={filterLemma}
                    onOpenMedia={handleOpenMedia}
                  />
                )}
              </TabsContent>
              <TabsContent value="maps" className="tw-flex-1 tw-overflow-auto">
                <MapsTab
                  scopeFilter={scopeFilter}
                  filteredLemma={filterLemma}
                  onOpenMedia={handleOpenMedia}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
