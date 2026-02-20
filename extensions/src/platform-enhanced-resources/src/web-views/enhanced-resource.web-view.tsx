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
import type { MediaDisplayItem, BibleImage } from '../components/media-tab.component';
import ArticleViewer from '../components/article-viewer.component';
import type { OverlayStackEntry } from '../components/article-viewer.component';
import ImageViewer from '../components/image-viewer.component';
import type { MediaViewerInput } from '../components/image-viewer.component';

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

/**
 * Default empty media items (will be populated by backend integration -
 * platformEnhancedResources.loadMediaTab)
 */
const DEFAULT_MEDIA_ITEMS: MediaDisplayItem[] = [];

/**
 * Default empty maps items (will be populated by backend integration -
 * platformEnhancedResources.loadMapsTab / CAP-012)
 */
const DEFAULT_MAPS_ITEMS: MediaDisplayItem[] = [];

/** Default empty article viewer overlay stack */
const DEFAULT_ARTICLE_OVERLAY_STACK: OverlayStackEntry[] = [];

/** Default media viewer overlay input (null = closed) */
const DEFAULT_MEDIA_VIEWER_INPUT: MediaViewerInput | undefined = undefined;

/** Maximum depth for nested article overlays */
const MAX_OVERLAY_DEPTH = 10;

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

  // --- Media tab state ---
  // Media items will be populated by backend integration (platformEnhancedResources.loadMediaTab / CAP-011)
  const [mediaItems] = useWebViewState<MediaDisplayItem[]>('mediaItems', DEFAULT_MEDIA_ITEMS);

  // Media expanded groups: track which group IDs are expanded
  const [mediaExpandedGroups, setMediaExpandedGroups] = useWebViewState<string[]>(
    'mediaExpandedGroups',
    [],
  );

  // --- Maps tab state ---
  // Maps items will be populated by backend integration (platformEnhancedResources.loadMapsTab / CAP-012)
  const [mapsItems] = useWebViewState<MediaDisplayItem[]>('mapsItems', DEFAULT_MAPS_ITEMS);

  // Maps expanded groups: track which group IDs are expanded
  const [mapsExpandedGroups, setMapsExpandedGroups] = useWebViewState<string[]>(
    'mapsExpandedGroups',
    [],
  );

  // --- Article viewer overlay stack state ---
  const [articleOverlayStack, setArticleOverlayStack] = useWebViewState<OverlayStackEntry[]>(
    'articleOverlayStack',
    DEFAULT_ARTICLE_OVERLAY_STACK,
  );

  // --- Media viewer overlay state ---
  const [mediaViewerInput, setMediaViewerInput] = useWebViewState<MediaViewerInput | undefined>(
    'mediaViewerInput',
    DEFAULT_MEDIA_VIEWER_INPUT,
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

  // Compute encyclopedia items with expanded state applied
  // (moved above article overlay handlers that reference it)
  const encyclopediaItemsWithExpanded = useMemo(
    () =>
      encyclopediaItems.map((item) => ({
        ...item,
        expanded: expandedEncyclopediaEntries.includes(item.id),
      })),
    [encyclopediaItems, expandedEncyclopediaEntries],
  );

  // Keep a ref to the current article overlay stack for use in callbacks
  const articleOverlayStackRef = useRef(articleOverlayStack);
  useEffect(() => {
    articleOverlayStackRef.current = articleOverlayStack;
  }, [articleOverlayStack]);

  // Open article viewer when "Read full article" is clicked in encyclopedia tab
  const handleEncyclopediaReadArticle = useCallback(
    (entry: EncyclopediaEntry) => {
      const currentStack = articleOverlayStackRef.current;
      if (currentStack.length >= MAX_OVERLAY_DEPTH) return;

      // Find the display index of the entry in the encyclopedia items list
      const displayIndex = encyclopediaItemsWithExpanded.findIndex(
        (item) => item.entry.id === entry.id,
      );

      const newEntry: OverlayStackEntry = {
        entry,
        displayIndex: displayIndex >= 0 ? displayIndex : 0,
        totalItems: encyclopediaItemsWithExpanded.length,
      };

      setArticleOverlayStack([...currentStack, newEntry]);
    },
    [encyclopediaItemsWithExpanded, setArticleOverlayStack],
  );

  // Close the topmost article overlay (pop from stack)
  const handleArticleOverlayClose = useCallback(() => {
    const currentStack = articleOverlayStackRef.current;
    if (currentStack.length === 0) return;
    setArticleOverlayStack(currentStack.slice(0, -1));
  }, [setArticleOverlayStack]);

  // Navigate to a scripture verse reference from article content
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleArticleNavigateVerse = useCallback((_verseRef: string) => {
    // Verse navigation will be fully wired during backend integration.
    // This callback receives the verse reference string from article links.
  }, []);

  // Open a linked article (see-also cross-reference) - push onto overlay stack
  const handleArticleOpenArticle = useCallback(
    (entry: EncyclopediaEntry) => {
      const currentStack = articleOverlayStackRef.current;
      if (currentStack.length >= MAX_OVERLAY_DEPTH) return;

      const newEntry: OverlayStackEntry = {
        entry,
        displayIndex: 0,
        totalItems: 1,
      };

      setArticleOverlayStack([...currentStack, newEntry]);
    },
    [setArticleOverlayStack],
  );

  // Open an image from article content (for MediaViewer overlay)
  const handleArticleOpenImage = useCallback(
    (openImageId: string) => {
      // Create a minimal media viewer input for a single image from article content
      const singleDisplayItem: MediaDisplayItem = {
        id: `article-image-${openImageId}`,
        groupType: 'word-linked',
        groupHeader: '',
        images: [
          {
            id: openImageId,
            title: openImageId,
            description: '',
            filename: '',
            copyright: '',
            isVideo: false,
            caption: openImageId,
            thumbnailUrl: '',
          },
        ],
      };
      setMediaViewerInput({
        imageId: openImageId,
        displayIndex: 0,
        showControls: false,
        parentTabType: 'encyclopedia',
        displayItems: [singleDisplayItem],
      });
    },
    [setMediaViewerInput],
  );

  // Navigate to the previous article in the display list
  const handleArticleNavigatePrev = useCallback(() => {
    const currentStack = articleOverlayStackRef.current;
    if (currentStack.length === 0) return;

    const topEntry = currentStack[currentStack.length - 1];
    if (topEntry.displayIndex <= 0) return;

    const prevIndex = topEntry.displayIndex - 1;
    const prevItem = encyclopediaItemsWithExpanded[prevIndex];
    if (!prevItem) return;

    const updatedStack = [...currentStack.slice(0, -1)];
    updatedStack.push({
      entry: prevItem.entry,
      displayIndex: prevIndex,
      totalItems: topEntry.totalItems,
    });

    setArticleOverlayStack(updatedStack);
  }, [encyclopediaItemsWithExpanded, setArticleOverlayStack]);

  // Navigate to the next article in the display list
  const handleArticleNavigateNext = useCallback(() => {
    const currentStack = articleOverlayStackRef.current;
    if (currentStack.length === 0) return;

    const topEntry = currentStack[currentStack.length - 1];
    if (topEntry.displayIndex >= topEntry.totalItems - 1) return;

    const nextIndex = topEntry.displayIndex + 1;
    const nextItem = encyclopediaItemsWithExpanded[nextIndex];
    if (!nextItem) return;

    const updatedStack = [...currentStack.slice(0, -1)];
    updatedStack.push({
      entry: nextItem.entry,
      displayIndex: nextIndex,
      totalItems: topEntry.totalItems,
    });

    setArticleOverlayStack(updatedStack);
  }, [encyclopediaItemsWithExpanded, setArticleOverlayStack]);

  // --- Media tab handlers ---

  // Keep a ref to the current expanded media groups for use in callbacks
  const mediaExpandedGroupsRef = useRef(mediaExpandedGroups);
  useEffect(() => {
    mediaExpandedGroupsRef.current = mediaExpandedGroups;
  }, [mediaExpandedGroups]);

  const handleMediaToggleGroup = useCallback(
    (groupId: string) => {
      const prev = mediaExpandedGroupsRef.current;
      if (prev.includes(groupId)) {
        setMediaExpandedGroups(prev.filter((g: string) => g !== groupId));
      } else {
        setMediaExpandedGroups([...prev, groupId]);
      }
    },
    [setMediaExpandedGroups],
  );

  const handleMediaItemClick = useCallback(
    (image: BibleImage) => {
      // Find the display index containing this image
      const displayIdx = mediaItems.findIndex((item) =>
        item.images.some((img) => img.id === image.id),
      );
      setMediaViewerInput({
        imageId: image.id,
        displayIndex: displayIdx >= 0 ? displayIdx : 0,
        showControls: true,
        parentTabType: 'media',
        displayItems: mediaItems,
      });
    },
    [mediaItems, setMediaViewerInput],
  );

  // --- Maps tab handlers ---

  // Keep a ref to the current expanded maps groups for use in callbacks
  const mapsExpandedGroupsRef = useRef(mapsExpandedGroups);
  useEffect(() => {
    mapsExpandedGroupsRef.current = mapsExpandedGroups;
  }, [mapsExpandedGroups]);

  const handleMapsToggleGroup = useCallback(
    (groupId: string) => {
      const prev = mapsExpandedGroupsRef.current;
      if (prev.includes(groupId)) {
        setMapsExpandedGroups(prev.filter((g: string) => g !== groupId));
      } else {
        setMapsExpandedGroups([...prev, groupId]);
      }
    },
    [setMapsExpandedGroups],
  );

  const handleMapItemClick = useCallback(
    (image: BibleImage) => {
      // Find the display index containing this image
      const displayIdx = mapsItems.findIndex((item) =>
        item.images.some((img) => img.id === image.id),
      );
      setMediaViewerInput({
        imageId: image.id,
        displayIndex: displayIdx >= 0 ? displayIdx : 0,
        showControls: true,
        parentTabType: 'maps',
        displayItems: mapsItems,
      });
    },
    [mapsItems, setMediaViewerInput],
  );

  // --- Media viewer overlay close handler ---
  const handleMediaViewerClose = useCallback(() => {
    setMediaViewerInput(undefined);
  }, [setMediaViewerInput]);

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

        {/* Research Pane (with overlay container for ArticleViewer) */}
        <ResizablePanel
          defaultSize={100 - splitterPercentage}
          minSize={15}
          className="tw-flex tw-flex-col tw-min-h-0 tw-relative"
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
            mediaItems={mediaItems}
            mediaExpandedGroups={mediaExpandedGroups}
            onMediaToggleGroup={handleMediaToggleGroup}
            onMediaItemClick={handleMediaItemClick}
            mapsItems={mapsItems}
            mapsExpandedGroups={mapsExpandedGroups}
            onMapsToggleGroup={handleMapsToggleGroup}
            onMapItemClick={handleMapItemClick}
          />

          {/* Article Viewer overlay - renders above research pane content */}
          {articleOverlayStack.length > 0 ? (
            <ArticleViewer
              overlayStack={articleOverlayStack}
              onClose={handleArticleOverlayClose}
              onNavigateVerse={handleArticleNavigateVerse}
              onOpenArticle={handleArticleOpenArticle}
              onOpenImage={handleArticleOpenImage}
              onNavigatePrev={handleArticleNavigatePrev}
              onNavigateNext={handleArticleNavigateNext}
            />
          ) : undefined}

          {/* Media Viewer overlay - renders above research pane content */}
          {mediaViewerInput ? (
            <ImageViewer
              imageId={mediaViewerInput.imageId}
              displayIndex={mediaViewerInput.displayIndex}
              showControls={mediaViewerInput.showControls}
              parentTabType={mediaViewerInput.parentTabType}
              displayItems={mediaViewerInput.displayItems}
              onClose={handleMediaViewerClose}
            />
          ) : undefined}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
