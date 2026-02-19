import { useCallback, useEffect, useMemo, useRef } from 'react';
import { WebViewProps } from '@papi/core';
import { LocalizeKey } from 'platform-bible-utils';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'platform-bible-react';
import ERToolbar, { TrackedProjectOption } from '../components/er-toolbar.component';
import ScripturePane, { WordFilterData } from '../components/scripture-pane.component';
import ResearchPane, { ResearchTab, ScopeFilterValue } from '../components/research-pane.component';
import type {
  DictionaryDisplayItem,
  DictionarySortField,
} from '../components/dictionary-tab.component';
import type {
  EncyclopediaDisplayItem,
  EncyclopediaEntry,
} from '../components/encyclopedia-tab.component';

// --- Types ---

/** Banner state for individual warning banners */
interface BannerState {
  visible: boolean;
  message: string;
  dismissed: boolean;
}

/** All warning banner states */
interface WarningBannerStates {
  missingBook: BannerState;
  reviewStatus: BannerState;
  imageWarning: BannerState;
  copyrightWarning: BannerState;
  updateRequired: BannerState;
  updateAvailable: BannerState;
}

/** Highlight toggle state for the toolbar */
interface HighlightState {
  researchTerms: boolean;
  found: boolean;
  missing: boolean;
}

// --- Default values ---

const DEFAULT_SPLITTER_PERCENTAGE = 50;
const DEFAULT_ZOOM_LEVEL = 100;

const DEFAULT_BANNER_STATE: BannerState = {
  visible: false,
  message: '',
  dismissed: false,
};

const DEFAULT_BANNERS: WarningBannerStates = {
  missingBook: { ...DEFAULT_BANNER_STATE },
  reviewStatus: { ...DEFAULT_BANNER_STATE },
  imageWarning: { ...DEFAULT_BANNER_STATE },
  copyrightWarning: { ...DEFAULT_BANNER_STATE },
  updateRequired: { ...DEFAULT_BANNER_STATE },
  updateAvailable: { ...DEFAULT_BANNER_STATE },
};

const DEFAULT_HIGHLIGHTS: HighlightState = {
  researchTerms: true,
  found: false,
  missing: false,
};

// --- Localization keys ---

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%enhancedResources_title%',
  '%enhancedResources_scripturePanePlaceholder%',
  '%enhancedResources_researchPanePlaceholder%',
  '%enhancedResources_dismiss%',
];

// --- Banner configuration: which banners are dismissable ---

const DISMISSABLE_BANNERS: Set<keyof WarningBannerStates> = new Set([
  'reviewStatus',
  'copyrightWarning',
  'updateAvailable',
]);

/** Order in which banners are displayed */
const BANNER_DISPLAY_ORDER: (keyof WarningBannerStates)[] = [
  'missingBook',
  'reviewStatus',
  'imageWarning',
  'copyrightWarning',
  'updateRequired',
  'updateAvailable',
];

/** Default empty project list (will be populated by backend integration) */
const DEFAULT_AVAILABLE_PROJECTS: TrackedProjectOption[] = [];

/** Default empty scripture content (will be populated by backend integration) */
const DEFAULT_SCRIPTURE_HTML = '';
const DEFAULT_FOOTNOTE_HTML = '';

/** Default empty dictionary items (will be populated by backend integration) */
const DEFAULT_DICTIONARY_ITEMS: DictionaryDisplayItem[] = [];

/** Default dictionary assessments */
const DEFAULT_DICTIONARY_ASSESSMENTS: Record<string, boolean | undefined> = {};

/** Default empty encyclopedia items (will be populated by backend integration) */
const DEFAULT_ENCYCLOPEDIA_ITEMS: EncyclopediaDisplayItem[] = [];

// --- Component ---

global.webViewComponent = function EnhancedResourceWebView({
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  // --- Localized strings ---
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // --- Scroll group verse synchronization ---
  // scrRef will be used by scripture pane and research tabs in future work packages
  useWebViewScrollGroupScrRef();

  // --- Persisted state ---
  const [splitterPercentage, setSplitterPercentage] = useWebViewState<number>(
    'splitterPercentage',
    DEFAULT_SPLITTER_PERCENTAGE,
  );

  // --- Warning banner states ---
  const [banners, setBanners] = useWebViewState<WarningBannerStates>('banners', DEFAULT_BANNERS);

  // --- Toolbar state ---
  const [highlights, setHighlights] = useWebViewState<HighlightState>(
    'highlights',
    DEFAULT_HIGHLIGHTS,
  );

  const [trackedProjectName, setTrackedProjectName] = useWebViewState<string | undefined>(
    'trackedProjectName',
    undefined,
  );

  // --- Scripture pane state ---
  const [showFootnotes, setShowFootnotes] = useWebViewState<boolean>('showFootnotes', false);
  const [zoomLevel, setZoomLevel] = useWebViewState<number>('zoomLevel', DEFAULT_ZOOM_LEVEL);
  // Word filter state: used by both scripture pane (setter) and research pane (getter + clear)
  const [wordFilter, setWordFilter] = useWebViewState<WordFilterData | undefined>(
    'wordFilter',
    undefined,
  );

  // --- Research pane state ---
  const [activeTab, setActiveTab] = useWebViewState<ResearchTab>('activeTab', 'dictionary');
  const [scopeFilter, setScopeFilter] = useWebViewState<ScopeFilterValue>(
    'scopeFilter',
    'current-verse',
  );

  // Scripture content will be populated by backend integration (platformEnhancedResources.getScriptureContent)
  const [scriptureHtml] = useWebViewState<string>('scriptureHtml', DEFAULT_SCRIPTURE_HTML);
  const [footnoteHtml] = useWebViewState<string>('footnoteHtml', DEFAULT_FOOTNOTE_HTML);

  // --- Dictionary tab state ---
  // Dictionary items will be populated by backend integration (platformEnhancedResources.loadDictionaryTab)
  const [dictionaryItems] = useWebViewState<DictionaryDisplayItem[]>(
    'dictionaryItems',
    DEFAULT_DICTIONARY_ITEMS,
  );
  const [dictionarySortColumn, setDictionarySortColumn] = useWebViewState<
    DictionarySortField | undefined
  >('dictionarySortColumn', undefined);
  const [dictionarySortAscending, setDictionarySortAscending] = useWebViewState<boolean>(
    'dictionarySortAscending',
    true,
  );
  const [hideIrrelevantMeanings, setHideIrrelevantMeanings] = useWebViewState<boolean>(
    'hideIrrelevantMeanings',
    false,
  );
  const [dictionaryAssessments, setDictionaryAssessments] = useWebViewState<
    Record<string, boolean | undefined>
  >('dictionaryAssessments', DEFAULT_DICTIONARY_ASSESSMENTS);

  // Dictionary expanded state: track which terms are expanded
  const [expandedTerms, setExpandedTerms] = useWebViewState<string[]>('expandedTerms', []);

  // --- Encyclopedia tab state ---
  // Encyclopedia items will be populated by backend integration (platformEnhancedResources.loadEncyclopediaTab)
  const [encyclopediaItems] = useWebViewState<EncyclopediaDisplayItem[]>(
    'encyclopediaItems',
    DEFAULT_ENCYCLOPEDIA_ITEMS,
  );

  // Encyclopedia expanded state: track which entry IDs are expanded
  const [expandedEncyclopediaEntries, setExpandedEncyclopediaEntries] = useWebViewState<string[]>(
    'expandedEncyclopediaEntries',
    [],
  );

  // Keep a ref to the current banners for use in callbacks
  const bannersRef = useRef(banners);
  useEffect(() => {
    bannersRef.current = banners;
  }, [banners]);

  // --- Debounced splitter persistence ---
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const debouncedSetSplitterPercentage = useCallback(
    (size: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setSplitterPercentage(size), 50);
    },
    [setSplitterPercentage],
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // --- Layout callback for splitter ---
  const onLayout = useCallback(
    (sizes: number[]) => {
      if (sizes && sizes.length >= 2) {
        debouncedSetSplitterPercentage(sizes[0]);
      }
    },
    [debouncedSetSplitterPercentage],
  );

  // --- Banner dismiss handler ---
  const handleDismissBanner = useCallback(
    (bannerKey: keyof WarningBannerStates) => {
      const currentBanners = bannersRef.current;
      setBanners({
        ...currentBanners,
        [bannerKey]: { ...currentBanners[bannerKey], dismissed: true, visible: false },
      });
    },
    [setBanners],
  );

  // --- Toolbar handlers ---
  const handleHighlightChange = useCallback(
    (newHighlights: HighlightState) => {
      setHighlights(newHighlights);
    },
    [setHighlights],
  );

  const handleTrackedProjectChange = useCallback(
    (projectName: string | undefined) => {
      setTrackedProjectName(projectName);
    },
    [setTrackedProjectName],
  );

  const handleToggleGuide = useCallback(() => {
    // Guide toggle will be wired to guide visibility in a future work package
  }, []);

  // --- Scripture pane handlers ---
  const handleShowFootnotesChange = useCallback(
    (show: boolean) => {
      setShowFootnotes(show);
    },
    [setShowFootnotes],
  );

  const handleZoomChange = useCallback(
    (zoom: number) => {
      setZoomLevel(zoom);
    },
    [setZoomLevel],
  );

  const handleWordClick = useCallback(
    (wordFilterData: WordFilterData) => {
      setWordFilter(wordFilterData);
    },
    [setWordFilter],
  );

  // --- Research pane handlers ---
  const handleTabChange = useCallback(
    (tab: ResearchTab) => {
      setActiveTab(tab);
    },
    [setActiveTab],
  );

  const handleScopeFilterChange = useCallback(
    (scope: ScopeFilterValue) => {
      setScopeFilter(scope);
    },
    [setScopeFilter],
  );

  const handleClearWordFilter = useCallback(() => {
    setWordFilter(undefined);
  }, [setWordFilter]);

  // --- Dictionary tab handlers ---
  const handleDictionarySortChange = useCallback(
    (column: DictionarySortField, ascending: boolean) => {
      setDictionarySortColumn(column);
      setDictionarySortAscending(ascending);
    },
    [setDictionarySortColumn, setDictionarySortAscending],
  );

  // Keep a ref to the current expanded terms for use in callbacks
  const expandedTermsRef = useRef(expandedTerms);
  useEffect(() => {
    expandedTermsRef.current = expandedTerms;
  }, [expandedTerms]);

  const handleDictionaryToggleExpand = useCallback(
    (term: string) => {
      const prev = expandedTermsRef.current;
      if (prev.includes(term)) {
        setExpandedTerms(prev.filter((t: string) => t !== term));
      } else {
        setExpandedTerms([...prev, term]);
      }
    },
    [setExpandedTerms],
  );

  const handleHideIrrelevantChange = useCallback(
    (value: boolean) => {
      setHideIrrelevantMeanings(value);
    },
    [setHideIrrelevantMeanings],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSemanticDomainClick = useCallback((_domainNumber: string) => {
    // Semantic domain viewer will be wired in UI-PKG-012
  }, []);

  // Keep a ref to the current assessments for use in callbacks
  const dictionaryAssessmentsRef = useRef(dictionaryAssessments);
  useEffect(() => {
    dictionaryAssessmentsRef.current = dictionaryAssessments;
  }, [dictionaryAssessments]);

  const handleDictionaryAssessmentChange = useCallback(
    (term: string, isHelpful: boolean) => {
      setDictionaryAssessments({
        ...dictionaryAssessmentsRef.current,
        [term]: isHelpful,
      });
    },
    [setDictionaryAssessments],
  );

  // --- Encyclopedia tab handlers ---

  // Keep a ref to the current expanded encyclopedia entries for use in callbacks
  const expandedEncyclopediaEntriesRef = useRef(expandedEncyclopediaEntries);
  useEffect(() => {
    expandedEncyclopediaEntriesRef.current = expandedEncyclopediaEntries;
  }, [expandedEncyclopediaEntries]);

  const handleEncyclopediaToggleExpand = useCallback(
    (id: string) => {
      const prev = expandedEncyclopediaEntriesRef.current;
      if (prev.includes(id)) {
        setExpandedEncyclopediaEntries(prev.filter((e: string) => e !== id));
      } else {
        setExpandedEncyclopediaEntries([...prev, id]);
      }
    },
    [setExpandedEncyclopediaEntries],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEncyclopediaReadArticle = useCallback((_entry: EncyclopediaEntry) => {
    // Article viewer overlay will be wired in UI-PKG-010
  }, []);

  // Compute encyclopedia items with expanded state applied
  const encyclopediaItemsWithExpanded = useMemo(
    () =>
      encyclopediaItems.map((item) => ({
        ...item,
        expanded: expandedEncyclopediaEntries.includes(item.id),
      })),
    [encyclopediaItems, expandedEncyclopediaEntries],
  );

  // Compute dictionary items with expanded state applied
  const dictionaryItemsWithExpanded = useMemo(
    () =>
      dictionaryItems.map((item) => ({
        ...item,
        expanded: expandedTerms.includes(item.term),
      })),
    [dictionaryItems, expandedTerms],
  );

  return (
    <div data-testid="enhanced-resource-viewer" className="pr-twp tw-flex tw-flex-col tw-h-screen">
      {/* ERToolbar */}
      <ERToolbar
        showResearchTerms={highlights.researchTerms}
        showFound={highlights.found}
        showMissing={highlights.missing}
        onHighlightChange={handleHighlightChange}
        trackedProjectName={trackedProjectName}
        availableProjects={DEFAULT_AVAILABLE_PROJECTS}
        onTrackedProjectChange={handleTrackedProjectChange}
        onToggleGuide={handleToggleGuide}
      />

      {/* Warning banners area */}
      <div className="tw-flex tw-flex-col tw-shrink-0">
        {BANNER_DISPLAY_ORDER.map((bannerKey) => {
          const banner = banners[bannerKey];
          if (!banner.visible || banner.dismissed) return undefined;

          const isDismissable = DISMISSABLE_BANNERS.has(bannerKey);

          return (
            <Alert
              key={bannerKey}
              className="tw-rounded-none tw-border-x-0 tw-border-t-0 tw-py-2 tw-px-4"
            >
              <AlertDescription className="tw-flex tw-items-center tw-justify-between">
                <span>{banner.message}</span>
                {isDismissable ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="tw-ml-2 tw-shrink-0"
                    onClick={() => handleDismissBanner(bannerKey)}
                    aria-label={localizedStrings['%enhancedResources_dismiss%']}
                  >
                    X
                  </Button>
                ) : undefined}
              </AlertDescription>
            </Alert>
          );
        })}
      </div>

      {/* Split pane: Scripture (top) / Research (bottom) */}
      <ResizablePanelGroup
        direction="vertical"
        className="tw-flex-1 tw-min-h-0"
        onLayout={onLayout}
      >
        {/* Scripture Pane */}
        <ResizablePanel
          defaultSize={splitterPercentage}
          minSize={15}
          className="tw-flex tw-flex-col tw-min-h-0"
        >
          <ScripturePane
            scriptureHtml={scriptureHtml}
            footnoteHtml={footnoteHtml}
            showFootnotes={showFootnotes}
            onShowFootnotesChange={handleShowFootnotesChange}
            zoomLevel={zoomLevel}
            onZoomChange={handleZoomChange}
            onWordClick={handleWordClick}
            highlightState={highlights}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Research Pane */}
        <ResizablePanel
          defaultSize={100 - splitterPercentage}
          minSize={15}
          className="tw-flex tw-flex-col tw-min-h-0"
        >
          <ResearchPane
            activeTab={activeTab}
            onTabChange={handleTabChange}
            scopeFilter={scopeFilter}
            onScopeFilterChange={handleScopeFilterChange}
            wordFilter={wordFilter}
            onClearWordFilter={handleClearWordFilter}
            dictionaryItems={dictionaryItemsWithExpanded}
            dictionarySortColumn={dictionarySortColumn}
            dictionarySortAscending={dictionarySortAscending}
            onDictionarySortChange={handleDictionarySortChange}
            onDictionaryToggleExpand={handleDictionaryToggleExpand}
            hideIrrelevantMeanings={hideIrrelevantMeanings}
            onHideIrrelevantChange={handleHideIrrelevantChange}
            onSemanticDomainClick={handleSemanticDomainClick}
            onDictionaryAssessmentChange={handleDictionaryAssessmentChange}
            dictionaryAssessments={dictionaryAssessments}
            encyclopediaItems={encyclopediaItemsWithExpanded}
            onEncyclopediaToggleExpand={handleEncyclopediaToggleExpand}
            onEncyclopediaReadArticle={handleEncyclopediaReadArticle}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
