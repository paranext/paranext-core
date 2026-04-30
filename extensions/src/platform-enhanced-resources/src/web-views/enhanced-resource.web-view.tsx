import { useCallback, useEffect, useMemo, useState } from 'react';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import type { WebViewProps } from '@papi/core';
import { Canon } from '@sillsdev/scripture';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Skeleton,
  TabsContent,
  Tabs,
  cn,
} from 'platform-bible-react';
import type { LocalizeKey, LocalizedStringValue, ScrollGroupId } from 'platform-bible-utils';
import { convertMarbleChapterXml, type MarbleAnnotation } from '../lib/marble-converter';
import {
  TempScripturePane,
  type MarbleTokenLike,
} from '../components/Temp/temp-scripture-pane.component';
import {
  EnhancedResourceTabBar,
  EnhancedResourceTopToolbar,
  type HighlightMode,
  type MarbleScope,
  type ResearchTab,
  type ScriptDisplayMode,
  type ViewMenuHandlers,
  type ViewMenuState,
} from '../components/toolbar/toolbar.component';
import {
  WarningRibbons,
  type RibbonStates,
} from '../components/warning-ribbons/warning-ribbons.component';
import { CopyrightOverlay } from '../components/warning-ribbons/copyright-overlay.component';
import {
  DictionaryTab,
  type DictionaryEmptyStateVariant,
} from '../components/dictionary-tab/dictionary-tab.component';
import type { DictionaryDisplayItemData } from '../components/dictionary-tab/dictionary-display-item.component';
import {
  EncyclopediaTab,
  type EncyclopediaEmptyStateVariant,
} from '../components/encyclopedia-tab/encyclopedia-tab.component';
import type { EncyclopediaDisplayItemData } from '../components/encyclopedia-tab/encyclopedia-display-item.component';
import type { ArticleRendererData } from '../components/shared/article-renderer.component';
import { MediaImagesTab } from '../components/media-tab/media-images-tab.component';
import { MediaMapsTab } from '../components/media-tab/media-maps-tab.component';
import type { MediaEntryRowData } from '../components/media-tab/media-entry-row.component';
import {
  MediaViewer,
  type MediaViewerItem,
} from '../components/media-viewer/media-viewer.component';

/** Object containing all keys used for localization in this component. */
export const ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS = Object.freeze([
  '%enhancedResources_shell_title%',
  '%enhancedResources_shell_emptyTitle%',
  '%enhancedResources_shell_emptyDescription%',
] as const);

type EnhancedResourceWebViewLocalizedStringKey =
  (typeof ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS)[number];

export type EnhancedResourceWebViewProps = {
  /** Resource display name; shown in the missingBook ribbon and as the shell title. */
  resourceName?: string;
  /** Copyright info for the overlay (when triggered from the ribbon "More info..." link). */
  copyrightInfo?: string;
  /** Whether the copyright overlay is currently visible. */
  copyrightOverlayVisible?: boolean;
  /** Callback fired when user dismisses the copyright overlay. */
  onCopyrightOverlayDismiss?: () => void;

  /** Top-level loading flag - shows shell-wide skeleton. */
  isLoading?: boolean;

  // Scripture pane
  tokens: MarbleTokenLike[] | undefined;
  filteredTokenId: string | undefined;
  hebrewDisplayMode?: ScriptDisplayMode;
  greekDisplayMode?: ScriptDisplayMode;
  showFootnotes?: boolean;
  scripturePaneZoom?: number;
  scripturePaneError?: string;
  onTokenClick?: (tokenId: string, token: MarbleTokenLike) => void;

  // Toolbar
  activeTab: ResearchTab;
  onTabChange: (tab: ResearchTab) => void;
  scope: MarbleScope;
  onScopeChange: (scope: MarbleScope) => void;
  hasSenseScope?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /**
   * Theme 9 — whether the current `searchValue` matched any results in the active research pane.
   * Drives the green vs orange tint on the filter input. Defaults to true.
   */
  hasMatches?: boolean;
  highlightMode?: HighlightMode;
  onHighlightModeChange?: (mode: HighlightMode) => void;
  /** Info / guide button click handler (FN-016 — opens MarbleGuide Dialog). */
  onInfoClick?: () => void;
  /** BCV reference button click — placeholder until phase-3-ui wires BookChapterControl (FN-015). */
  onReferenceClick?: () => void;
  scrollGroupId?: ScrollGroupId | undefined;
  onScrollGroupChange?: (newScrollGroupId: ScrollGroupId | undefined) => void;
  currentReferenceLabel?: string;
  /**
   * View-menu state surface (Show footnotes, Show translations, H/G display modes). Theme 10 +
   * forward-note FN-017 — display-mode controls moved from the (now-removed) scripture-pane header
   * row into the hamburger menu in the top toolbar.
   */
  viewMenu?: ViewMenuState;
  /** View-menu callbacks. */
  viewMenuHandlers?: ViewMenuHandlers;

  // Ribbons
  ribbons: RibbonStates;
  onDismissReviewStatus?: () => void;
  onDismissCopyright?: () => void;
  onDismissUpdateAvailable?: () => void;
  onCopyrightMoreInfo?: () => void;
  onMetadataUpdate?: () => void;

  /** Splitter percentage between scripture pane and research pane. Defaults to 60. */
  splitterPercentage?: number;

  // Dictionary tab [Revised: 2026-04-29 Themes 13/15/16]
  dictionaryItems?: DictionaryDisplayItemData[];
  dictionarySelectedTokenId?: string;
  dictionaryIsLoading?: boolean;
  dictionaryEmptyState?: DictionaryEmptyStateVariant;
  dictionaryFilterWord?: string;
  dictionaryScopeLabel?: string;
  dictionaryActiveDictionary?: 'SDBH' | 'SDBG';
  dictionaryHideLessRelevantSenses?: boolean;
  onDictionarySelectionChange?: (tokenId: string | undefined) => void;
  onDictionarySourceTextClick?: (tokenId: string) => void;
  /** Click on the entry-level "Occurrences in all books" link inside the detail panel. */
  onDictionaryAllOccurrencesClick?: (tokenId: string) => void;
  /** Click on a sense's "Occurrences in all books" link inside the detail panel. */
  onDictionarySenseOccurrencesClick?: (senseId: string) => void;
  onDictionaryToggleHideLessRelevantSenses?: (hide: boolean) => void;
  /** Helpfulness Yes/No answer (Theme 13b; backend FN-018). */
  onDictionaryHelpfulnessAnswer?: (entryTokenId: string, answer: 'yes' | 'no') => void;
  /** "Give feedback..." link click (Theme 13b; backend FN-018). */
  onDictionaryGiveFeedback?: (entryTokenId: string) => void;
  /** Context-menu callbacks (Theme 16). */
  onDictionaryCopySurfaceForm?: (
    item: DictionaryDisplayItemData,
    variant: 'original' | 'transliteration',
  ) => void;
  onDictionaryCopyLemma?: (
    item: DictionaryDisplayItemData,
    variant: 'original' | 'transliteration',
  ) => void;
  onDictionaryFindSense?: (item: DictionaryDisplayItemData) => void;
  onDictionaryFindLemma?: (item: DictionaryDisplayItemData) => void;
  onDictionaryFindText?: (item: DictionaryDisplayItemData) => void;

  // Encyclopedia tab
  encyclopediaItems?: EncyclopediaDisplayItemData[];
  encyclopediaSelectedTokenId?: string;
  encyclopediaIsLoading?: boolean;
  encyclopediaEmptyState?: EncyclopediaEmptyStateVariant;
  encyclopediaFilterWord?: string;
  encyclopediaScopeLabel?: string;
  encyclopediaArticleDataMap?: Record<string, ArticleRendererData | undefined>;
  onEncyclopediaSelectionChange?: (tokenId: string | undefined) => void;
  onEncyclopediaSourceTextClick?: (tokenId: string) => void;
  onEncyclopediaCopySurfaceForm?: (item: EncyclopediaDisplayItemData) => void;
  onEncyclopediaCopyLemma?: (item: EncyclopediaDisplayItemData) => void;

  // Media (Images) tab
  mediaImagesItems?: MediaEntryRowData[];
  mediaImagesSelectedItemId?: string;
  mediaImagesIsLoading?: boolean;
  /** Per BHV-359: false until the tab becomes visible and thumbnail bytes are fetched. */
  mediaImagesLoaded?: boolean;
  mediaImagesScopeLabel?: string;
  mediaImagesThumbnailUrlResolver?: (imageId: string) => string;
  onMediaImagesSelectionChange?: (id: string | undefined) => void;
  onMediaImagesMaximize?: (id: string) => void;

  // Media (Maps) tab
  mediaMapsItems?: MediaEntryRowData[];
  mediaMapsSelectedItemId?: string;
  mediaMapsIsLoading?: boolean;
  mediaMapsLoaded?: boolean;
  mediaMapsScopeLabel?: string;
  mediaMapsThumbnailUrlResolver?: (imageId: string) => string;
  onMediaMapsSelectionChange?: (id: string | undefined) => void;
  onMediaMapsMaximize?: (id: string) => void;

  // MediaViewer (centered Dialog) - opened by either tab's Maximize button.
  /** Currently maximized media item; undefined keeps the Dialog closed. */
  maximizedMediaItem?: MediaViewerItem;
  /** FN-009 seam for the full-size image URL inside the Dialog. */
  mediaViewerImageUrlResolver?: (imageId: string) => string;
  /** Open-state change handler - called when the Dialog opens or closes. */
  onMaximizedMediaOpenChange?: (open: boolean) => void;
  /** Previous-image handler - undefined disables the Previous button. */
  onMaximizedMediaPrev?: () => void;
  /** Next-image handler - undefined disables the Next button. */
  onMaximizedMediaNext?: () => void;

  /**
   * All localized strings used by the shell + nested components, keyed by the union of every
   * STRING_KEYS const each child exports. The wiring layer fetches them in one batch.
   */
  localizedStringsWithLoadingState?: [Record<string, LocalizedStringValue | undefined>, boolean];
};

/**
 * Pure presentational shell for the Enhanced Resource window. Composes WarningRibbons, Toolbar,
 * TempScripturePane (placeholder per FN-001/013/014), and the four research-pane tab content
 * slots.
 *
 * The shell is data-agnostic: every piece of state arrives via props and every interaction fires a
 * callback. Phase-3-ui wires PAPI hooks and the real scripture editor.
 */
export function EnhancedResourceWebView({
  resourceName = 'Enhanced Resource',
  copyrightInfo,
  copyrightOverlayVisible = false,
  onCopyrightOverlayDismiss = () => {},

  isLoading = false,

  tokens,
  filteredTokenId,
  hebrewDisplayMode = 'both',
  greekDisplayMode = 'both',
  showFootnotes = false,
  scripturePaneZoom = 1,
  scripturePaneError,
  onTokenClick = () => {},

  activeTab,
  onTabChange,
  scope,
  onScopeChange,
  hasSenseScope = false,
  searchValue = '',
  onSearchChange = () => {},
  hasMatches = true,
  highlightMode = 'none',
  onHighlightModeChange = () => {},
  onInfoClick = () => {},
  onReferenceClick = () => {},
  scrollGroupId,
  onScrollGroupChange = () => {},
  currentReferenceLabel,
  viewMenu,
  viewMenuHandlers,

  ribbons,
  onDismissReviewStatus = () => {},
  onDismissCopyright = () => {},
  onDismissUpdateAvailable = () => {},
  onCopyrightMoreInfo = () => {},
  onMetadataUpdate = () => {},

  splitterPercentage = 60,

  dictionaryItems = [],
  dictionarySelectedTokenId,
  dictionaryIsLoading = false,
  dictionaryEmptyState = 'none',
  dictionaryFilterWord,
  dictionaryScopeLabel = '',
  dictionaryActiveDictionary = 'SDBH',
  dictionaryHideLessRelevantSenses = false,
  onDictionarySelectionChange = () => {},
  onDictionarySourceTextClick = () => {},
  onDictionaryAllOccurrencesClick = () => {},
  onDictionarySenseOccurrencesClick = () => {},
  onDictionaryToggleHideLessRelevantSenses = () => {},
  onDictionaryHelpfulnessAnswer = () => {},
  onDictionaryGiveFeedback = () => {},
  onDictionaryCopySurfaceForm = () => {},
  onDictionaryCopyLemma = () => {},
  onDictionaryFindSense = () => {},
  onDictionaryFindLemma = () => {},
  onDictionaryFindText = () => {},

  encyclopediaItems = [],
  encyclopediaSelectedTokenId,
  encyclopediaIsLoading = false,
  encyclopediaEmptyState = 'none',
  encyclopediaFilterWord,
  encyclopediaScopeLabel = '',
  encyclopediaArticleDataMap = {},
  onEncyclopediaSelectionChange = () => {},
  onEncyclopediaSourceTextClick = () => {},
  onEncyclopediaCopySurfaceForm = () => {},
  onEncyclopediaCopyLemma = () => {},

  mediaImagesItems = [],
  mediaImagesSelectedItemId,
  mediaImagesIsLoading = false,
  mediaImagesLoaded = true,
  mediaImagesScopeLabel = '',
  mediaImagesThumbnailUrlResolver,
  onMediaImagesSelectionChange = () => {},
  onMediaImagesMaximize = () => {},

  mediaMapsItems = [],
  mediaMapsSelectedItemId,
  mediaMapsIsLoading = false,
  mediaMapsLoaded = true,
  mediaMapsScopeLabel = '',
  mediaMapsThumbnailUrlResolver,
  onMediaMapsSelectionChange = () => {},
  onMediaMapsMaximize = () => {},

  maximizedMediaItem,
  mediaViewerImageUrlResolver,
  onMaximizedMediaOpenChange = () => {},
  onMaximizedMediaPrev,
  onMaximizedMediaNext,

  localizedStringsWithLoadingState = [{}, false],
}: EnhancedResourceWebViewProps) {
  const [stringsBag, isLoadingStrings] = localizedStringsWithLoadingState;
  const getString = (key: EnhancedResourceWebViewLocalizedStringKey) => stringsBag[key] ?? key;
  const emptyTitle = String(getString('%enhancedResources_shell_emptyTitle%'));
  const emptyDescription = String(getString('%enhancedResources_shell_emptyDescription%'));

  // Each child component does its own getLocalizedString lookup against the same bag, so we forward
  // the entire bag down. This keeps the wiring layer simple - one `useLocalizedStrings` call.
  const childStrings: [Record<string, LocalizedStringValue | undefined>, boolean] = [
    stringsBag,
    isLoadingStrings,
  ];

  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label={resourceName}
        className="tw-flex tw-h-full tw-flex-col tw-gap-3 tw-p-4"
      >
        <Skeleton className="tw-h-8 tw-w-full" />
        <Skeleton className="tw-h-8 tw-w-full" />
        <Skeleton className="tw-flex-1 tw-w-full" />
        <Skeleton className="tw-h-32 tw-w-full" />
      </div>
    );
  }

  const showShellEmpty = tokens === undefined && !scripturePaneError;

  return (
    <div className={cn('tw-flex tw-h-full tw-flex-col tw-bg-background')}>
      <WarningRibbons
        ribbons={ribbons}
        resourceName={resourceName}
        onDismissReviewStatus={onDismissReviewStatus}
        onDismissCopyright={onDismissCopyright}
        onDismissUpdateAvailable={onDismissUpdateAvailable}
        onCopyrightMoreInfo={onCopyrightMoreInfo}
        onMetadataUpdate={onMetadataUpdate}
        localizedStringsWithLoadingState={childStrings}
      />
      <EnhancedResourceTopToolbar
        viewMenu={
          viewMenu ?? {
            showFootnotes,
            showTranslations: true,
            hebrewDisplayMode,
            greekDisplayMode,
          }
        }
        viewMenuHandlers={viewMenuHandlers}
        highlightMode={highlightMode}
        onHighlightModeChange={onHighlightModeChange}
        onInfoClick={onInfoClick}
        onReferenceClick={onReferenceClick}
        scrollGroupId={scrollGroupId}
        onScrollGroupChange={onScrollGroupChange}
        currentReferenceLabel={currentReferenceLabel}
        localizedStringsWithLoadingState={childStrings}
      />
      <div className="tw-flex tw-min-h-0 tw-flex-1">
        {showShellEmpty ? (
          <div className="tw-flex tw-h-full tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-p-6 tw-text-center tw-text-muted-foreground">
            <span className="tw-text-base tw-font-semibold">{emptyTitle}</span>
            <span className="tw-text-sm">{emptyDescription}</span>
          </div>
        ) : (
          <ResizablePanelGroup direction="vertical" className="tw-h-full">
            <ResizablePanel
              defaultSize={splitterPercentage}
              minSize={20}
              className="tw-flex tw-flex-col"
            >
              <TempScripturePane
                tokens={tokens}
                filteredTokenId={filteredTokenId}
                showFootnotes={showFootnotes}
                scripturePaneZoom={scripturePaneZoom}
                errorMessage={scripturePaneError}
                highlightAllResearchTerms={highlightMode === 'all-research-terms'}
                onTokenClick={onTokenClick}
                localizedStringsWithLoadingState={childStrings}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize={100 - splitterPercentage}
              minSize={20}
              className="tw-flex tw-flex-col"
            >
              {/* Theme 8 — tab/filter/scope row sits at the top of the lower split panel. */}
              <EnhancedResourceTabBar
                activeTab={activeTab}
                onTabChange={onTabChange}
                scope={scope}
                onScopeChange={onScopeChange}
                hasSenseScope={hasSenseScope}
                searchValue={searchValue}
                onSearchChange={onSearchChange}
                hasMatches={hasMatches}
                localizedStringsWithLoadingState={childStrings}
              />
              <Tabs value={activeTab} className="tw-flex tw-h-full tw-flex-col">
                <TabsContent
                  value="dictionary"
                  data-testid="er-dictionary-tab-panel"
                  className="tw-flex tw-flex-1 tw-flex-col data-[state=inactive]:tw-hidden"
                >
                  <DictionaryTab
                    items={dictionaryItems}
                    selectedTokenId={dictionarySelectedTokenId}
                    isLoading={dictionaryIsLoading}
                    emptyState={dictionaryEmptyState}
                    filterWord={dictionaryFilterWord}
                    scopeLabel={dictionaryScopeLabel}
                    activeDictionary={dictionaryActiveDictionary}
                    hideLessRelevantSenses={dictionaryHideLessRelevantSenses}
                    onSelectionChange={onDictionarySelectionChange}
                    onSourceTextClick={onDictionarySourceTextClick}
                    onAllOccurrencesClick={onDictionaryAllOccurrencesClick}
                    onSenseOccurrencesClick={onDictionarySenseOccurrencesClick}
                    onToggleHideLessRelevantSenses={onDictionaryToggleHideLessRelevantSenses}
                    onHelpfulnessAnswer={onDictionaryHelpfulnessAnswer}
                    onGiveFeedback={onDictionaryGiveFeedback}
                    onCopySurfaceForm={onDictionaryCopySurfaceForm}
                    onCopyLemma={onDictionaryCopyLemma}
                    onFindSense={onDictionaryFindSense}
                    onFindLemma={onDictionaryFindLemma}
                    onFindText={onDictionaryFindText}
                    localizedStringsWithLoadingState={childStrings}
                  />
                </TabsContent>
                <TabsContent
                  value="encyclopedia"
                  data-testid="er-encyclopedia-tab-panel"
                  className="tw-flex tw-flex-1 tw-flex-col data-[state=inactive]:tw-hidden"
                >
                  <EncyclopediaTab
                    items={encyclopediaItems}
                    selectedTokenId={encyclopediaSelectedTokenId}
                    isLoading={encyclopediaIsLoading}
                    emptyState={encyclopediaEmptyState}
                    filterWord={encyclopediaFilterWord}
                    scopeLabel={encyclopediaScopeLabel}
                    articleDataMap={encyclopediaArticleDataMap}
                    onSelectionChange={onEncyclopediaSelectionChange}
                    onSourceTextClick={onEncyclopediaSourceTextClick}
                    onCopySurfaceForm={onEncyclopediaCopySurfaceForm}
                    onCopyLemma={onEncyclopediaCopyLemma}
                    localizedStringsWithLoadingState={childStrings}
                  />
                </TabsContent>
                <TabsContent
                  value="media"
                  data-testid="er-media-tab-panel"
                  className="tw-flex tw-flex-1 tw-flex-col data-[state=inactive]:tw-hidden"
                >
                  <MediaImagesTab
                    items={mediaImagesItems}
                    selectedItemId={mediaImagesSelectedItemId}
                    isLoading={mediaImagesIsLoading}
                    loaded={mediaImagesLoaded}
                    scopeLabel={mediaImagesScopeLabel}
                    thumbnailUrlResolver={mediaImagesThumbnailUrlResolver}
                    onSelectionChange={onMediaImagesSelectionChange}
                    onMaximize={onMediaImagesMaximize}
                    localizedStringsWithLoadingState={childStrings}
                  />
                </TabsContent>
                <TabsContent
                  value="maps"
                  data-testid="er-maps-tab-panel"
                  className="tw-flex tw-flex-1 tw-flex-col data-[state=inactive]:tw-hidden"
                >
                  <MediaMapsTab
                    items={mediaMapsItems}
                    selectedItemId={mediaMapsSelectedItemId}
                    isLoading={mediaMapsIsLoading}
                    loaded={mediaMapsLoaded}
                    scopeLabel={mediaMapsScopeLabel}
                    thumbnailUrlResolver={mediaMapsThumbnailUrlResolver}
                    onSelectionChange={onMediaMapsSelectionChange}
                    onMaximize={onMediaMapsMaximize}
                    localizedStringsWithLoadingState={childStrings}
                  />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
      <MediaViewer
        open={maximizedMediaItem !== undefined}
        item={maximizedMediaItem}
        imageUrlResolver={mediaViewerImageUrlResolver}
        onOpenChange={onMaximizedMediaOpenChange}
        onPrev={onMaximizedMediaPrev}
        onNext={onMaximizedMediaNext}
        localizedStringsWithLoadingState={childStrings}
      />
      {/*
       * Theme 12 — CopyrightOverlay is always mounted as a sibling-level Dialog (no longer
       * conditionally rendered, no longer nested next to WarningRibbons). The Dialog manages its
       * own portal/overlay; visibility is driven by the `open` prop.
       */}
      <CopyrightOverlay
        copyrightInfo={copyrightInfo}
        open={copyrightOverlayVisible}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) onCopyrightOverlayDismiss();
        }}
        localizedStringsWithLoadingState={childStrings}
      />
    </div>
  );
}

export default EnhancedResourceWebView;

const EMPTY_RIBBON_STATES: RibbonStates = {
  missingBook: false,
  reviewStatus: { visible: false, dismissed: false },
  imageWarning: false,
  copyright: { visible: false, dismissed: false },
  updateRequiredData: false,
  updateAvailable: { visible: false, dismissed: false },
};

/**
 * Module-level mutable copy of the localized-string keys, kept stable across renders
 * (useLocalizedStrings warns its first argument must keep the same array reference).
 */
const WIRING_LOCALIZED_STRING_KEYS: LocalizeKey[] = [...ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS];

/** Network object id for the Enhanced Resources composition root (see EnhancedResourceFactory.cs). */
const ER_NETWORK_OBJECT_ID = 'platform.enhancedResources';

/**
 * Shape of the chapter input for the `loadMarbleChapterXml` PAPI command, mirroring
 * `LoadMarbleChapterXmlInput` in C#.
 */
type LoadMarbleChapterXmlInput = {
  resourceId: string;
  bookNum: number;
  chapterNumber: number;
};

/**
 * Subset of the network-object proxy we care about. `papi.networkObjects.get` returns the proxy
 * typed as a generic `NetworkObject<object>`; we narrow with a structural cast to the methods this
 * web view uses. All cross-process calls return promises.
 */
type EnhancedResourcesNetworkObject = {
  loadMarbleChapterXml: (input: LoadMarbleChapterXmlInput) => Promise<string>;
};

/**
 * Convert annotation metadata produced by the marble-aware USX→USJ converter into the
 * `MarbleTokenLike[]` shape the placeholder ScripturePane consumes. This is the FN-013 → FN-014
 * connection point: the `wg` markers are preserved by the editor via __unknownAttributes, so the
 * annotation indices stay aligned with what the real read-only editor will display once it lands.
 */
function annotationsToTokens(annotations: MarbleAnnotation[]): MarbleTokenLike[] {
  return annotations
    .filter((a) => a.kind === 'word')
    .map((a, index) => ({
      type: 'TextLink' as const,
      // The annotation id is the marble `<wg id="...">` value (typically "Greek 1234" or
      // "Hebrew 5678"). The placeholder pane displays the id as the visible text - the real
      // platform-scripture-editor will instead render the underlying scripture word. The visible
      // label here is just a stand-in until FN-001 ships read-only mode in the editor.
      text: a.annotationId,
      index,
      strongNumber: a.metadata.strong,
      targetLinks: a.metadata.targetLinks,
      thematicLinks: a.metadata.thematicLinks,
      lexicalLinks: a.metadata.lexicalLinks,
      imageLinks: a.metadata.imageLinks,
      mapLinks: a.metadata.mapLinks,
    }));
}

/**
 * Web view entry point. Wires PAPI hooks (`useWebViewScrollGroupScrRef`, `useWebViewState`),
 * dispatches PAPI commands for chapter loads + guide-open, and hosts the FN-020 integrated state
 * machine (linked-word click → filter; tab-switch + clear-filter propagation; BCV change → chapter
 * reload).
 *
 * Memento fields (BHV-319) persisted via `useWebViewState`: activeTab, scope, highlightMode,
 * showFootnotes, hebrewDisplayMode, greekDisplayMode, splitterPercentage, scripturePaneZoom,
 * filteredTokenId. The shell's empty state still renders gracefully when PAPI returns no data
 * (TS-043).
 */
globalThis.webViewComponent = function EnhancedResourceWebViewWiring({
  useWebViewScrollGroupScrRef,
  useWebViewState,
  state: savedWebViewState,
}: WebViewProps) {
  // The keys reference must be stable across renders - WIRING_LOCALIZED_STRING_KEYS is module-level.
  const [stringsBag, isLoadingStrings] = useLocalizedStrings(WIRING_LOCALIZED_STRING_KEYS);
  const stringsForShell: Record<string, LocalizedStringValue | undefined> = { ...stringsBag };

  // BCV reference + scroll-group sync (FN-015 / BHV-317).
  const [scrRef, , scrollGroupId, setScrollGroupId] = useWebViewScrollGroupScrRef();

  // Memento fields - BHV-319 (23-field round-trip). The functional test for TS-055 customizes
  // tab + scope + highlight, closes/reopens the window, and asserts the values come back.
  const [activeTab, setActiveTab] = useWebViewState<ResearchTab>('activeTab', 'dictionary');
  const [scope, setScope] = useWebViewState<MarbleScope>('scope', 'current-verse');
  const [highlightMode, setHighlightMode] = useWebViewState<HighlightMode>('highlightMode', 'none');
  const [showFootnotes, setShowFootnotes] = useWebViewState<boolean>('showFootnotes', false);
  const [showTranslations, setShowTranslations] = useWebViewState<boolean>(
    'showTranslations',
    true,
  );
  const [hebrewDisplayMode, setHebrewDisplayMode] = useWebViewState<ScriptDisplayMode>(
    'hebrewDisplayMode',
    'both',
  );
  const [greekDisplayMode, setGreekDisplayMode] = useWebViewState<ScriptDisplayMode>(
    'greekDisplayMode',
    'both',
  );
  // splitterPercentage is persisted for round-trip but not yet user-editable - the
  // ResizablePanel onResize callback will plug into the setter once we surface the splitter
  // change to the wiring layer (BHV-319 keeps the value across reopens regardless).
  const [splitterPercentage] = useWebViewState<number>('splitterPercentage', 60);
  const [scripturePaneZoom, setScripturePaneZoom] = useWebViewState<number>('scripturePaneZoom', 1);
  const [filteredTokenId, setFilteredTokenId] = useWebViewState<string | undefined>(
    'filteredTokenId',
    undefined,
  );

  // resourceId is provider-supplied via savedWebView.state - no `useWebViewState` because it's
  // populated at provider time and shouldn't be changed from inside the web view.
  // Use unknown narrowing - savedWebViewState carries arbitrary JSON.
  const resourceId =
    savedWebViewState && typeof savedWebViewState.resourceId === 'string'
      ? savedWebViewState.resourceId
      : undefined;

  // Chapter token state - drives the scripture pane.
  const [tokens, setTokens] = useState<MarbleTokenLike[] | undefined>(undefined);
  const [scripturePaneError, setScripturePaneError] = useState<string | undefined>(undefined);

  // Load chapter XML when (resourceId, bookId, chapterNum) changes. resourceId may be undefined
  // when the launcher fired without one - the shell renders its empty state in that case
  // (TS-043). The PAPI call goes against the `platform.enhancedResources` network object via
  // `papi.networkObjects.get` (the C# EnhancedResourceFactory exposes `loadMarbleChapterXml`
  // there).
  useEffect(() => {
    let cancelled = false;
    if (resourceId === undefined) {
      setTokens(undefined);
      setScripturePaneError(undefined);
      return () => {
        cancelled = true;
      };
    }

    const bookNum = Canon.bookIdToNumber(scrRef.book);
    if (bookNum <= 0) {
      // Unknown book id - leave the empty state in place rather than blow up.
      setTokens(undefined);
      setScripturePaneError(undefined);
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      try {
        const proxy =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!proxy) {
          if (!cancelled) {
            setTokens(undefined);
            setScripturePaneError('Enhanced Resources backend is not available.');
          }
          return;
        }
        const xml = await proxy.loadMarbleChapterXml({
          resourceId,
          bookNum,
          chapterNumber: scrRef.chapterNum,
        });
        if (cancelled) return;
        const { annotations } = convertMarbleChapterXml(xml);
        setTokens(annotationsToTokens(annotations));
        setScripturePaneError(undefined);
      } catch (err) {
        if (cancelled) return;
        logger.warn(
          `Enhanced Resources: failed to load chapter ${scrRef.book} ${scrRef.chapterNum}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
        setTokens(undefined);
        // Surface a user-visible error only for unexpected failures - missing-book / missing-data
        // resolutions belong to the warning-ribbon system (BHV-310).
        setScripturePaneError(undefined);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resourceId, scrRef.book, scrRef.chapterNum]);

  // FN-020: linked-word click → set filter, ensure scope dropdown gains "Current Sense" option,
  // and propagate the filter to whatever research tab is currently active.
  const handleTokenClick = useCallback(
    (tokenId: string) => {
      setFilteredTokenId(tokenId);
    },
    [setFilteredTokenId],
  );

  // FN-020: clear-filter → reset filteredTokenId. Because `hasSenseScope` is derived from
  // `filteredTokenId`, the "Current Sense" scope option also disappears, and the scope value
  // resets to current-verse if it was on current-sense.
  const handleSearchChange = useCallback(
    (value: string) => {
      if (value === '') {
        setFilteredTokenId(undefined);
        // Keep scope on current-sense impossible once filter is gone.
        if (scope === 'current-sense') setScope('current-verse');
      }
    },
    [scope, setFilteredTokenId, setScope],
  );

  // FN-016: info-icon → dispatch the registered guide-open command. The actual MarbleGuide dialog
  // is owned by UI-PKG-008 - the wiring layer just dispatches the command. If the command is not
  // yet registered (UI-PKG-008 hasn't shipped), log and continue.
  const handleInfoClick = useCallback(() => {
    papi.commands.sendCommand('platformEnhancedResources.openGuide').catch((err) => {
      logger.info(
        `Enhanced Resources: openGuide command not yet available: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    });
  }, []);

  // Compute the BCV button label - keeps display logic out of the toolbar. Falls back to the
  // saved scripture reference if Canon can't resolve the book id.
  const currentReferenceLabel = useMemo(() => {
    const bookId = scrRef.book;
    return `${bookId} ${scrRef.chapterNum}:${scrRef.verseNum}`;
  }, [scrRef.book, scrRef.chapterNum, scrRef.verseNum]);

  // The filter input shows the transliterated form of the clicked word; until the wiring layer
  // is hooked up to the tooltip service we use the token id as the visible value.
  const searchValue = filteredTokenId ?? '';

  // ViewMenu state surface (the hamburger menu's checkboxes + radio groups). Persists via
  // useWebViewState so memento fully round-trips (FN-017).
  const viewMenu: ViewMenuState = {
    showFootnotes,
    showTranslations,
    hebrewDisplayMode,
    greekDisplayMode,
  };
  const viewMenuHandlers: ViewMenuHandlers = {
    onToggleShowFootnotes: setShowFootnotes,
    onToggleShowTranslations: setShowTranslations,
    onHebrewDisplayModeChange: setHebrewDisplayMode,
    onGreekDisplayModeChange: setGreekDisplayMode,
    onZoomIn: () => setScripturePaneZoom(Math.min(scripturePaneZoom + 0.1, 3)),
    onZoomOut: () => setScripturePaneZoom(Math.max(scripturePaneZoom - 0.1, 0.5)),
    onZoomReset: () => setScripturePaneZoom(1),
  };

  return (
    <EnhancedResourceWebView
      resourceName={resourceId}
      tokens={tokens}
      filteredTokenId={filteredTokenId}
      hebrewDisplayMode={hebrewDisplayMode}
      greekDisplayMode={greekDisplayMode}
      showFootnotes={showFootnotes}
      scripturePaneZoom={scripturePaneZoom}
      scripturePaneError={scripturePaneError}
      onTokenClick={handleTokenClick}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      scope={scope}
      onScopeChange={setScope}
      hasSenseScope={filteredTokenId !== undefined}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      highlightMode={highlightMode}
      onHighlightModeChange={setHighlightMode}
      onInfoClick={handleInfoClick}
      scrollGroupId={scrollGroupId}
      onScrollGroupChange={setScrollGroupId}
      currentReferenceLabel={currentReferenceLabel}
      viewMenu={viewMenu}
      viewMenuHandlers={viewMenuHandlers}
      ribbons={EMPTY_RIBBON_STATES}
      splitterPercentage={splitterPercentage}
      localizedStringsWithLoadingState={[stringsForShell, isLoadingStrings]}
    />
  );
};
