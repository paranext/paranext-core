import { useCallback, useEffect, useMemo, useState } from 'react';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import type { WebViewProps } from '@papi/core';
import { Canon, type SerializedVerseRef } from '@sillsdev/scripture';
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
import { formatScrRef, formatScrRefRange } from 'platform-bible-utils';
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
  DICTIONARY_TAB_STRING_KEYS,
  type DictionaryEmptyStateVariant,
} from '../components/dictionary-tab/dictionary-tab.component';
import type { DictionaryDisplayItemData } from '../components/dictionary-tab/dictionary-display-item.component';
import type { DictionarySenseDisplay } from '../components/shared/dictionary-sense-item.component';
import {
  presentDictionaryEntry,
  type DictionaryEntryDataInput,
} from '../presenters/dictionary-presenter';
import {
  presentEncyclopediaItems,
  type EncyclopediaDisplayItemInput,
} from '../presenters/encyclopedia-presenter';
import {
  EncyclopediaTab,
  ENCYCLOPEDIA_TAB_STRING_KEYS,
  type EncyclopediaEmptyStateVariant,
} from '../components/encyclopedia-tab/encyclopedia-tab.component';
import type {
  EncyclopediaDisplayItemData,
  EncyclopediaEntryRefData,
} from '../components/encyclopedia-tab/encyclopedia-display-item.component';
import type {
  ArticleRendererData,
  ArticleParagraphData,
  ArticleVerseLinkData,
  ArticleCrossRefData,
} from '../components/shared/article-renderer.component';
import {
  MediaImagesTab,
  MEDIA_IMAGES_TAB_STRING_KEYS,
} from '../components/media-tab/media-images-tab.component';
import {
  MediaMapsTab,
  MEDIA_MAPS_TAB_STRING_KEYS,
} from '../components/media-tab/media-maps-tab.component';
import type { MediaEntryRowData } from '../components/media-tab/media-entry-row.component';
import {
  MediaViewer,
  MEDIA_VIEWER_STRING_KEYS,
  type MediaViewerItem,
} from '../components/media-viewer/media-viewer.component';
import {
  ArticleViewer,
  ARTICLE_VIEWER_STRING_KEYS,
} from '../components/article-viewer/article-viewer.component';
import {
  presentMediaItems,
  type MediaDisplayItemInput,
  type MediaTabType,
} from '../presenters/media-presenter';

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
  /**
   * Click handler for the "View article" link inside an encyclopedia entry detail panel. The wiring
   * layer routes this to `setActiveArticleId` which opens the ArticleViewer Dialog (UI-PKG-006).
   */
  onEncyclopediaArticleLinkClick?: (articleId: string) => void;

  // ArticleViewer (centered Dialog) — opened by the encyclopedia entry detail's "View article"
  // link. Surface for full-article reading; reachable from any encyclopedia entry. Article
  // cross-references (seealso) re-enter the same dialog with a different articleId.
  /** Currently active article id; undefined keeps the Dialog closed. */
  activeArticleId?: string;
  /** Loaded article data; undefined while a fetch is in flight (Dialog shows skeleton). */
  activeArticleData?: ArticleRendererData;
  /** FN-009 image URL resolver forwarded to ArticleRenderer for inline article images. */
  articleViewerImageUrlResolver?: (imageId: string) => string;
  /** Open-state change handler. When closing, the wiring layer clears activeArticleId. */
  onArticleViewerOpenChange?: (open: boolean) => void;
  /** Verse-link click — wiring layer dispatches to scroll-group via useWebViewScrollGroupScrRef. */
  onArticleVerseLinkClick?: (link: ArticleVerseLinkData) => void;
  /** Cross-reference click — `seealso` re-enters dialog; `launchViewer` opens MediaViewer. */
  onArticleCrossReferenceClick?: (ref: ArticleCrossRefData) => void;
  /** Inline image click — opens MediaViewer with the clicked image id. */
  onArticleImageClick?: (imageId: string) => void;

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
  onEncyclopediaArticleLinkClick,

  activeArticleId,
  activeArticleData,
  articleViewerImageUrlResolver,
  onArticleViewerOpenChange = () => {},
  onArticleVerseLinkClick = () => {},
  onArticleCrossReferenceClick = () => {},
  onArticleImageClick = () => {},

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
                    onArticleLinkClick={onEncyclopediaArticleLinkClick}
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
      <ArticleViewer
        open={activeArticleId !== undefined}
        articleId={activeArticleId}
        articleData={activeArticleData}
        imageUrlResolver={articleViewerImageUrlResolver}
        onOpenChange={onArticleViewerOpenChange}
        onVerseLinkClick={onArticleVerseLinkClick}
        onCrossReferenceClick={onArticleCrossReferenceClick}
        onImageClick={onArticleImageClick}
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
 *
 * The wiring layer batches every key the shell + nested children consume into a single
 * `useLocalizedStrings` call, so the entire children tree resolves through one bag. This is the
 * same pattern UI-PKG-001 established; UI-PKG-002 just adds the dictionary-tab keys.
 */
const WIRING_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  ...ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS,
  ...DICTIONARY_TAB_STRING_KEYS,
  ...ENCYCLOPEDIA_TAB_STRING_KEYS,
  ...MEDIA_IMAGES_TAB_STRING_KEYS,
  ...MEDIA_MAPS_TAB_STRING_KEYS,
  ...MEDIA_VIEWER_STRING_KEYS,
  ...ARTICLE_VIEWER_STRING_KEYS,
  // Toolbar / scope labels surface in empty-state templates.
  '%enhancedResources_toolbar_scope_currentVerse%',
  '%enhancedResources_toolbar_scope_currentSection%',
  '%enhancedResources_toolbar_scope_currentChapter%',
  '%enhancedResources_toolbar_scope_currentSense%',
];

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
 * VerseRef wire shape consumed by the C# Enhanced Resources network object methods. Mirrors
 * `SIL.Scripture.VerseRef` JSON serialization (the .NET data provider uses `BookNum`, `ChapterNum`,
 * `VerseNum` PascalCase keys).
 */
type VerseRefDto = {
  bookNum: number;
  chapterNum: number;
  verseNum: number;
};

/** Mirror of the C# `WordFilterInput` record (data-contracts.md §2.7), camelCase on the wire. */
type WordFilterInputDto = {
  tokenId: string;
  lemma: string;
  source: string;
  translit: string;
  senses: string;
  targetLinks: string;
  clickOrigin: 'ScripturePane' | 'DictionaryTab' | 'OtherTab';
};

/** Input for the `loadDictionary` PAPI command (mirrors C# `DictionaryLoadInput`). */
type DictionaryLoadInputDto = {
  currentReference: VerseRefDto;
  scope: 'CurrentVerse' | 'CurrentSection' | 'CurrentChapter';
  filter: WordFilterInputDto | undefined;
  showTranslations: boolean;
  glossLanguage: string;
  resourceId: string;
};

/** Output of `loadDictionary` (mirrors C# `DictionaryDisplayItem`). */
type DictionaryDisplayItemDto = {
  tokenId: string;
  entryId: string;
  term: string;
  sourceText: string;
  translit: string;
  glosses: string[];
  partOfSpeech: string;
  occurrenceCount: number;
  definition?: string | null;
};

type DictionaryLoadResultDto = {
  items: DictionaryDisplayItemDto[];
  activeDictionary: string;
  emptyStateMessage: string | null | undefined;
};

/** Mirror of C# `DictionaryEntryInput`. */
type DictionaryEntryInputDto = {
  entryId: string;
  glossLanguage: string;
  subItemId?: string;
};

/** Mirror of C# `DictionaryEntryData` (no FN-019 forward fields yet — presenter handles absence). */
type DictionaryEntryDataDto = {
  entryId: string;
  lemma: string;
  senses: {
    senseId: string;
    glosses: { language: string; text: string }[];
    definition: string;
  }[];
  semanticDomains: string[];
  relatedLexemes: { lemma: string; entryId: string; relationship: string; gloss: string }[];
  morphology: string;
};

/**
 * Input for the `loadEncyclopedia` PAPI command (mirrors C# `EncyclopediaLoadInput`).
 *
 * Note: the C# record uses `CurrentReference` (full word), not `currentRef` like some other inputs.
 * Wire-side keys are camelCase per the data-provider's JSON serializer.
 */
type EncyclopediaLoadInputDto = {
  currentReference: VerseRefDto;
  scope: 'CurrentVerse' | 'CurrentSection' | 'CurrentChapter';
  filter: WordFilterInputDto | undefined;
  userLanguage: string;
  resourceId: string;
};

/** Mirror of C# `EncyclopediaEntryRef` (data-contracts.md §3.8). */
type EncyclopediaEntryRefDto = {
  articleId: string;
  key: string;
  title: string;
  teaserText: string;
  formatVersion: 1 | 2;
  inlineImageIds?: string[] | null;
};

/** Mirror of C# `EncyclopediaDisplayItem`. */
type EncyclopediaDisplayItemDto = {
  tokenId: string;
  lemma: string;
  sourceText: string;
  translit: string;
  glosses: string[];
  entries: EncyclopediaEntryRefDto[];
  imageIds: string[];
  collection: string;
};

/** Mirror of C# `EncyclopediaLoadResult`. */
type EncyclopediaLoadResultDto = {
  items: EncyclopediaDisplayItemDto[];
  emptyStateMessage: string | null | undefined;
};

/** Mirror of C# `ArticleInput`. */
type ArticleInputDto = {
  articleId: string;
  resourceId: string;
  userLanguage: string;
};

/** Mirror of C# `ArticleVerseLink` — verse refs use `book` / `chapter` / `verse` int trio. */
type ArticleVerseLinkDto = {
  reference: { book: number; chapter: number; verse: number };
  displayText: string;
  rawReference: string;
};

/** Mirror of C# `ArticleAbbreviation`. */
type ArticleAbbreviationDto = {
  abbrev: string;
  fullText: string;
};

/** Mirror of C# `ArticleParagraph`. */
type ArticleParagraphDto = {
  text: string;
  verseLinks: ArticleVerseLinkDto[];
  abbreviations: ArticleAbbreviationDto[];
  inlineImageIds: string[];
};

/** Mirror of C# `ArticleCrossRef`. */
type ArticleCrossRefDto = {
  targetArticleId: string;
  displayText: string;
  type: 'seealso' | 'launchViewer' | string;
};

/** Mirror of C# `ArticleData`. */
type ArticleDataDto = {
  articleId: string;
  title: string;
  paragraphs: ArticleParagraphDto[];
  crossReferences: ArticleCrossRefDto[];
  imageIds: string[];
};

/**
 * Mirror of C# `MediaLoadInput` (data-contracts.md §2.9). The C# enum `MediaTabType` serializes as
 * the literal strings `"Images"` and `"Maps"` via the System.Text.Json default converter.
 */
type MediaLoadInputDto = {
  currentReference: VerseRefDto;
  scope: 'CurrentVerse' | 'CurrentSection' | 'CurrentChapter';
  filter: WordFilterInputDto | undefined;
  tabType: MediaTabType;
  userLanguage: string;
  resourceId: string;
};

/**
 * Mirror of C# `MediaDisplayItem` (data-contracts.md §3.9). `startRef` / `endRef` carry the full
 * SIL `VerseRef` shape (incl. `book` id, `chapterNum`, `verseNum`); the wiring layer narrows them
 * to the presenter's `MediaVerseRefInput` shape before passing them in. `path` and `fileName` are
 * back-end internals used by `fetchImageBytes` and are ignored here.
 */
type MediaDisplayItemDto = {
  imageId: string;
  imageSource: string;
  title: string;
  thumbnailSource: string;
  startRef: SerializedVerseRef;
  endRef: SerializedVerseRef;
  collection: string;
  languageCode: string;
  displayIndex: number;
  path?: string;
  fileName?: string;
};

/** Mirror of C# `MediaLoadResult` (data-contracts.md §3.9). */
type MediaLoadResultDto = {
  items: MediaDisplayItemDto[];
  countLabel: string;
  emptyStateMessage: string | null | undefined;
};

/**
 * Subset of the network-object proxy we care about. `papi.networkObjects.get` returns the proxy
 * typed as a generic `NetworkObject<object>`; we narrow with a structural cast to the methods this
 * web view uses. All cross-process calls return promises.
 */
type EnhancedResourcesNetworkObject = {
  loadMarbleChapterXml: (input: LoadMarbleChapterXmlInput) => Promise<string>;
  loadDictionary: (input: DictionaryLoadInputDto) => Promise<DictionaryLoadResultDto>;
  readDictionaryEntry: (input: DictionaryEntryInputDto) => Promise<DictionaryEntryDataDto>;
  loadEncyclopedia: (input: EncyclopediaLoadInputDto) => Promise<EncyclopediaLoadResultDto>;
  readArticle: (input: ArticleInputDto) => Promise<ArticleDataDto>;
  /**
   * Backend method registered as `"loadMedia"` (NOT `"loadMediaResources"`) in
   * `EnhancedResourceFactory.BuildFunctionList`. The factory routes to
   * `MediaService.LoadResources(input)` which applies the SBA filter server-side per `tabType`.
   */
  loadMedia: (input: MediaLoadInputDto) => Promise<MediaLoadResultDto>;
};

/**
 * Adapt the toolbar's `ScriptDisplayMode` (`'transliteration'`) to the presenter's narrower mode
 * vocabulary (`'translit'`). The two have always meant the same thing — the presenter type was
 * sized to the contract test fixtures while the toolbar type predates it.
 */
function toPresenterMode(mode: ScriptDisplayMode): 'script' | 'translit' | 'both' {
  switch (mode) {
    case 'transliteration':
      return 'translit';
    case 'script':
    case 'both':
    default:
      return mode;
  }
}

/** Map a UI MarbleScope (the toolbar's value) to the C# ScopeEnum string. */
function marbleScopeToBackend(
  scope: MarbleScope,
): 'CurrentVerse' | 'CurrentSection' | 'CurrentChapter' {
  switch (scope) {
    case 'current-section':
      return 'CurrentSection';
    case 'current-chapter':
      return 'CurrentChapter';
    case 'current-sense':
    case 'current-verse':
    default:
      return 'CurrentVerse';
  }
}

/** OT books are 1-39 in SIL canon; everything from 40 (Matthew) onward routes to SDBG. */
function isOldTestamentBook(bookNum: number): boolean {
  return bookNum >= 1 && bookNum <= 39;
}

/** Adapt the presenter's DomainLink to the UI's lighter DictionarySenseDomain (id + label only). */
function senseDisplaysFromPresentation(
  senses: {
    id: string;
    senseNumber: number;
    definition: string;
    glosses: string;
    domains: { id: string; label: string }[];
    notes: string;
    comment: string;
    commentsAndNotes: string;
    isRelevant: boolean;
    senseOccurrences: { count: number; tooltip: string };
  }[],
): DictionarySenseDisplay[] {
  return senses.map((s) => ({
    id: s.id,
    senseNumber: s.senseNumber,
    definition: s.definition,
    glosses: s.glosses || undefined,
    domains:
      s.domains.length > 0 ? s.domains.map((d) => ({ id: d.id, label: d.label })) : undefined,
    notes: s.notes || undefined,
    comment: s.comment || undefined,
    commentsAndNotes: s.commentsAndNotes || undefined,
    occurrencesInAllBooksCount: s.senseOccurrences.count,
    occurrencesTooltip: s.senseOccurrences.tooltip,
    isRelevant: s.isRelevant,
  }));
}

/**
 * Adapt the C# `DictionaryEntryData` wire DTO into the presenter input. The C# DTO uses PascalCase
 * field names; the presenter expects camelCase. This is the single conversion point.
 */
function entryDtoToPresenterInput(dto: DictionaryEntryDataDto): DictionaryEntryDataInput {
  return {
    entryId: dto.entryId,
    lemma: dto.lemma,
    morphology: dto.morphology,
    semanticDomains: dto.semanticDomains,
    relatedLexemes: dto.relatedLexemes.map((r) => ({
      lemma: r.lemma,
      entryId: r.entryId,
      relationship: r.relationship,
      gloss: r.gloss,
    })),
    senses: dto.senses.map((s) => ({
      senseId: s.senseId,
      definition: s.definition,
      glosses: s.glosses.map((g) => ({ language: g.language, text: g.text })),
      // FN-019 forward fields are absent in today's C# DTO — presenter emits blank rows.
    })),
  };
}

/**
 * Adapt the C# `EncyclopediaDisplayItem` DTO into the presenter input. The DTO is camelCase on the
 * wire so the conversion is mostly a passthrough; we normalize `inlineImageIds` from null/undefined
 * to an explicit `undefined` so the presenter's optional field stays clean.
 */
function encyclopediaDtoToPresenterInput(
  dto: EncyclopediaDisplayItemDto,
): EncyclopediaDisplayItemInput {
  return {
    tokenId: dto.tokenId,
    lemma: dto.lemma,
    sourceText: dto.sourceText,
    translit: dto.translit,
    glosses: dto.glosses,
    entries: dto.entries.map((e) => ({
      articleId: e.articleId,
      key: e.key,
      title: e.title,
      teaserText: e.teaserText,
      formatVersion: e.formatVersion,
      inlineImageIds: e.inlineImageIds ?? undefined,
    })),
    imageIds: dto.imageIds,
    collection: dto.collection,
  };
}

/** Adapt the C# `ArticleData` DTO to the React `ArticleRendererData` shape. */
function articleDtoToRendererData(dto: ArticleDataDto): ArticleRendererData {
  const paragraphs: ArticleParagraphData[] = dto.paragraphs.map((p) => ({
    text: p.text,
    verseLinks: p.verseLinks.map<ArticleVerseLinkData>((v) => ({
      reference: { book: v.reference.book, chapter: v.reference.chapter, verse: v.reference.verse },
      displayText: v.displayText,
      rawReference: v.rawReference,
    })),
    abbreviations: p.abbreviations.map((a) => ({ abbrev: a.abbrev, fullText: a.fullText })),
    inlineImageIds: p.inlineImageIds,
  }));
  const crossReferences: ArticleCrossRefData[] = dto.crossReferences.map((c) => ({
    targetArticleId: c.targetArticleId,
    displayText: c.displayText,
    // Narrow the wire 'string' type to the presenter union; unknown values fall through as
    // 'launchViewer' so the renderer doesn't blow up on a future backend extension.
    type: c.type === 'seealso' ? 'seealso' : 'launchViewer',
  }));
  return {
    articleId: dto.articleId,
    title: dto.title,
    paragraphs,
    crossReferences,
    imageIds: dto.imageIds,
  };
}

/** Map the row-level `EncyclopediaItemPresentation` into the component's prop shape. */
function presentationToItemData(p: {
  tokenId: string;
  lemma: string;
  sourceText: string;
  translit: string;
  displaySource: string;
  entries: EncyclopediaDisplayItemInput['entries'];
  imageIds: string[];
  collection: string;
}): EncyclopediaDisplayItemData {
  const entries: EncyclopediaEntryRefData[] = p.entries.map((e) => ({
    articleId: e.articleId,
    key: e.key,
    title: e.title,
    teaserText: e.teaserText,
    formatVersion: e.formatVersion,
    inlineImageIds: e.inlineImageIds,
  }));
  return {
    tokenId: p.tokenId,
    lemma: p.lemma,
    // sourceText holds the source-language form rendered into the row; the FN-023 e2e test
    // matches on the original-script element (data-source-language-text) which the component
    // now renders from `item.lemma`. We forward the loader's sourceText unchanged so PT9's
    // related-form pattern (e.g., "beker, bikrah") is preserved.
    sourceText: p.sourceText,
    translit: p.translit,
    entries,
    imageIds: p.imageIds,
    collection: p.collection,
  };
}

/**
 * Adapt the C# `MediaDisplayItem` DTO into the presenter input. Drops backend-internal fields
 * (`imageSource`, `thumbnailSource`, `displayIndex`, `languageCode`, `path`, `fileName`) the UI
 * does not consume; narrows `startRef` / `endRef` from the full `SerializedVerseRef` to the
 * presenter's minimal verse-ref shape.
 */
function mediaDtoToPresenterInput(dto: MediaDisplayItemDto): MediaDisplayItemInput {
  return {
    imageId: dto.imageId,
    title: dto.title,
    startRef: {
      book: dto.startRef.book,
      chapterNum: dto.startRef.chapterNum,
      verseNum: dto.startRef.verseNum,
    },
    endRef: {
      book: dto.endRef.book,
      chapterNum: dto.endRef.chapterNum,
      verseNum: dto.endRef.verseNum,
    },
    collection: dto.collection,
  };
}

/**
 * FN-009 seam: build a `papi-er://` URL for the renderer's `<img src>`. The custom protocol is
 * registered by `src/main/services/enhanced-resource-protocol.service.ts` and resolves the bytes
 * via `platform.enhancedResources.fetchImageBytes`. CSP is augmented in `src/renderer/index.ejs`
 * and `web-view.service-host.ts` so `<img src="papi-er://...">` works directly. The protocol does
 * not appear in `connect-src` by design - calling `fetch('papi-er://...')` will be CSP-blocked.
 */
function buildPapiErImageUrl(imageId: string, size?: 'full'): string {
  const encoded = encodeURIComponent(imageId);
  const suffix = size === 'full' ? '?size=full' : '';
  return `papi-er://images/${encoded}${suffix}`;
}

/**
 * Format a media item's verse-range label using the platform-bible-utils formatters. Matches the
 * PT9 convention BHV-612 documents (single-verse: "GEN 1:1"; multi-verse: "ACT 2:1 - 5:42").
 *
 * `start` and `end` come from the C# loader; we project them onto `SerializedVerseRef` (the shape
 * the formatters consume) without re-parsing book ids.
 */
function formatMediaReferenceLabel(
  start: { book: string; chapterNum: number; verseNum: number },
  end: { book: string; chapterNum: number; verseNum: number },
): string {
  const startRef: SerializedVerseRef = {
    book: start.book,
    chapterNum: start.chapterNum,
    verseNum: start.verseNum,
  };
  const endRef: SerializedVerseRef = {
    book: end.book,
    chapterNum: end.chapterNum,
    verseNum: end.verseNum,
  };
  // Same start and end → format as a single ref. Otherwise format the range, suppressing the book
  // id at the end ref when both refs share a book.
  if (
    startRef.book === endRef.book &&
    startRef.chapterNum === endRef.chapterNum &&
    startRef.verseNum === endRef.verseNum
  ) {
    return formatScrRef(startRef, 'id');
  }
  return formatScrRefRange(startRef, endRef, {
    optionOrLocalizedBookName: 'id',
    rangeSeparator: '-',
  });
}

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
  const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useWebViewScrollGroupScrRef();

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

  // ---------------------------------------------------------------------------
  // Dictionary tab wiring (UI-PKG-002)
  // ---------------------------------------------------------------------------
  // The dictionary list comes from the backend `loadDictionary` PAPI command on every
  // (resourceId, scrRef, scope, filter, glossLanguage) change. The detail panel is loaded lazily
  // via `readDictionaryEntry` whenever the user selects a row, then run through the pure
  // `presentDictionaryEntry` adapter so the UI types stay decoupled from the wire shape.

  const [dictionaryItems, setDictionaryItems] = useState<DictionaryDisplayItemData[]>([]);
  const [dictionaryActiveDictionary, setDictionaryActiveDictionary] = useState<'SDBH' | 'SDBG'>(
    'SDBH',
  );
  const [dictionaryIsLoading, setDictionaryIsLoading] = useState(false);
  const [dictionarySelectedTokenId, setDictionarySelectedTokenId] = useWebViewState<
    string | undefined
  >('dictionarySelectedTokenId', undefined);
  const [dictionaryHideLessRelevantSenses, setDictionaryHideLessRelevantSenses] =
    useWebViewState<boolean>('dictionaryHideLessRelevantSenses', false);

  // FN-022 verse-occurrences-by-sense: backend does not yet emit per-sense verse refs. We pass an
  // empty map so the presenter emits count=0 / blank-tooltip rows; FN-019 backend follow-up will
  // populate this without a UI change.
  const EMPTY_VERSE_OCCURRENCES: Record<string, never> = useMemo(() => ({}), []);

  // Default gloss language (FN-017 / settings TBD): English for now. Will become a setting.
  const glossLanguage = 'en';

  // Compute current book number for (a) routing the chapter loader (already done) and (b) deciding
  // whether the active dictionary should default to SDBH or SDBG when the backend returns empty.
  const bookNum = useMemo(() => Canon.bookIdToNumber(scrRef.book), [scrRef.book]);

  // Effect: load the dictionary entry list whenever the relevant inputs change.
  useEffect(() => {
    let cancelled = false;
    if (!resourceId || bookNum <= 0) {
      setDictionaryItems([]);
      setDictionaryIsLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const filter: WordFilterInputDto | undefined = filteredTokenId
      ? {
          tokenId: filteredTokenId,
          lemma: '',
          source: '',
          translit: filteredTokenId, // best-effort until we wire a token→lemma resolver
          senses: '',
          targetLinks: '',
          clickOrigin: 'ScripturePane',
        }
      : undefined;

    const input: DictionaryLoadInputDto = {
      currentReference: {
        bookNum,
        chapterNum: scrRef.chapterNum,
        verseNum: scrRef.verseNum,
      },
      scope: marbleScopeToBackend(scope),
      filter,
      showTranslations,
      glossLanguage,
      resourceId,
    };

    setDictionaryIsLoading(true);
    (async () => {
      try {
        const proxy =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!proxy) {
          if (!cancelled) {
            setDictionaryItems([]);
            setDictionaryActiveDictionary(isOldTestamentBook(bookNum) ? 'SDBH' : 'SDBG');
          }
          return;
        }
        const result = await proxy.loadDictionary(input);
        if (cancelled) return;

        const mapped: DictionaryDisplayItemData[] = result.items.map((it) => ({
          tokenId: it.tokenId,
          sourceText: it.sourceText,
          translit: it.translit,
          totalOccurrencesInAllBooks: it.occurrenceCount,
        }));
        setDictionaryItems(mapped);

        let active: 'SDBH' | 'SDBG';
        if (result.activeDictionary === 'SDBH' || result.activeDictionary === 'SDBG') {
          active = result.activeDictionary;
        } else {
          active = isOldTestamentBook(bookNum) ? 'SDBH' : 'SDBG';
        }
        setDictionaryActiveDictionary(active);
      } catch (err) {
        if (cancelled) return;
        logger.warn(
          `Enhanced Resources: loadDictionary failed: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
        setDictionaryItems([]);
        setDictionaryActiveDictionary(isOldTestamentBook(bookNum) ? 'SDBH' : 'SDBG');
      } finally {
        if (!cancelled) setDictionaryIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    resourceId,
    bookNum,
    scrRef.chapterNum,
    scrRef.verseNum,
    scope,
    filteredTokenId,
    showTranslations,
  ]);

  // Effect: load entry detail (senses + presentation) whenever the user selects a row.
  useEffect(() => {
    let cancelled = false;
    if (!dictionarySelectedTokenId) return () => {};
    const targetItem = dictionaryItems.find((i) => i.tokenId === dictionarySelectedTokenId);
    if (!targetItem) return () => {};
    // If senses already loaded for this token, no-op.
    if (targetItem.senses && targetItem.senses.length > 0) return () => {};

    (async () => {
      try {
        const proxy =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!proxy) return;
        const dto = await proxy.readDictionaryEntry({
          entryId: dictionarySelectedTokenId,
          glossLanguage,
        });
        if (cancelled) return;

        const presentation = presentDictionaryEntry(entryDtoToPresenterInput(dto), {
          glossLanguage,
          resourceLanguage: dictionaryActiveDictionary === 'SDBH' ? 'heb' : 'grc',
          hebrewDisplayMode: toPresenterMode(hebrewDisplayMode),
          greekDisplayMode: toPresenterMode(greekDisplayMode),
          hideLessRelevantSenses: dictionaryHideLessRelevantSenses,
          // Without per-sense relevance from backend, mark every sense relevant so the user sees
          // them all. FN-019/SDBG enrichment can later populate this from real link data.
          relevantSenseIds: new Set(dto.senses.map((s) => s.senseId)),
          lexeme: dto.lemma,
          totalOccurrencesCount: targetItem.totalOccurrencesInAllBooks ?? 0,
          // No live transliteration service yet (FN-017 roadmap) — fall back to the row's translit.
          transliterate: () => targetItem.translit ?? '',
          // POS translation backend is `translatePartOfSpeech(tag, lang, form)`; for now pass the
          // raw morphology through unchanged so the UI shows what the data provides.
          translatePartOfSpeech: (raw) => raw,
          verseOccurrencesBySenseId: EMPTY_VERSE_OCCURRENCES,
          formatSenseOccurrencesTooltip: ({ senseNumber, lexeme, count, verseRangeLabel }) =>
            verseRangeLabel
              ? `Find sense ${senseNumber} of ${lexeme} in all books (${count} occurrences in ${verseRangeLabel})`
              : `Find sense ${senseNumber} of ${lexeme} in all books (${count} occurrences)`,
          formatVerseRange: () => '',
        });

        if (!presentation) return;

        setDictionaryItems((prev) =>
          prev.map((item) =>
            item.tokenId === dictionarySelectedTokenId
              ? {
                  ...item,
                  senses: senseDisplaysFromPresentation(presentation.senses),
                  totalOccurrencesInAllBooks:
                    presentation.totalOccurrencesInAllBooks || item.totalOccurrencesInAllBooks,
                }
              : item,
          ),
        );
      } catch (err) {
        logger.warn(
          `Enhanced Resources: readDictionaryEntry failed for ${dictionarySelectedTokenId}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    dictionarySelectedTokenId,
    dictionaryItems,
    dictionaryActiveDictionary,
    hebrewDisplayMode,
    greekDisplayMode,
    dictionaryHideLessRelevantSenses,
    EMPTY_VERSE_OCCURRENCES,
  ]);

  // ---------------------------------------------------------------------------
  // Encyclopedia tab wiring (UI-PKG-003)
  // ---------------------------------------------------------------------------
  // Mirrors the dictionary tab pattern: `loadEncyclopedia` returns the row list (one entry per
  // scoped token with thematic links); `readArticle` is fired lazily per selected row to populate
  // the side-drawer detail panel. The pure `presentEncyclopediaItems` adapter resolves FN-023
  // source-language-aware rendering before the data hits the component.

  const [encyclopediaItems, setEncyclopediaItems] = useState<EncyclopediaDisplayItemData[]>([]);
  const [encyclopediaIsLoading, setEncyclopediaIsLoading] = useState(false);
  const [encyclopediaSelectedTokenId, setEncyclopediaSelectedTokenId] = useWebViewState<
    string | undefined
  >('encyclopediaSelectedTokenId', undefined);
  const [encyclopediaArticleDataMap, setEncyclopediaArticleDataMap] = useState<
    Record<string, ArticleRendererData | undefined>
  >({});

  // Effect: load encyclopedia rows whenever (resourceId, BCV, scope, filter) changes.
  useEffect(() => {
    let cancelled = false;
    if (!resourceId || bookNum <= 0) {
      setEncyclopediaItems([]);
      setEncyclopediaIsLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const filter: WordFilterInputDto | undefined = filteredTokenId
      ? {
          tokenId: filteredTokenId,
          lemma: '',
          source: '',
          translit: filteredTokenId,
          senses: '',
          targetLinks: '',
          clickOrigin: 'ScripturePane',
        }
      : undefined;

    const input: EncyclopediaLoadInputDto = {
      currentReference: {
        bookNum,
        chapterNum: scrRef.chapterNum,
        verseNum: scrRef.verseNum,
      },
      scope: marbleScopeToBackend(scope),
      filter,
      userLanguage: glossLanguage,
      resourceId,
    };

    setEncyclopediaIsLoading(true);
    (async () => {
      try {
        const proxy =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!proxy) {
          if (!cancelled) setEncyclopediaItems([]);
          return;
        }
        const result = await proxy.loadEncyclopedia(input);
        if (cancelled) return;

        // Resource language drives the FN-023 display-mode selection. The encyclopedia loader
        // routes through SDBH for OT books and SDBG for NT books, mirroring the dictionary
        // active-dictionary heuristic.
        const resourceLanguage: 'heb' | 'grc' = isOldTestamentBook(bookNum) ? 'heb' : 'grc';

        const presentations = presentEncyclopediaItems(
          result.items.map(encyclopediaDtoToPresenterInput),
          {
            resourceLanguage,
            hebrewDisplayMode: toPresenterMode(hebrewDisplayMode),
            greekDisplayMode: toPresenterMode(greekDisplayMode),
            // No live transliteration service yet; presenter falls back to the row's translit
            // when present (which the C# loader populates from MarbleEntry.Transliteration), and
            // returns '' for rows without one. FN-017 follow-up wires a real transliterator.
            transliterate: () => '',
          },
        );

        setEncyclopediaItems(presentations.map(presentationToItemData));
      } catch (err) {
        if (cancelled) return;
        logger.warn(
          `Enhanced Resources: loadEncyclopedia failed: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
        setEncyclopediaItems([]);
      } finally {
        if (!cancelled) setEncyclopediaIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    resourceId,
    bookNum,
    scrRef.chapterNum,
    scrRef.verseNum,
    scope,
    filteredTokenId,
    hebrewDisplayMode,
    greekDisplayMode,
  ]);

  // Effect: load article data for the selected encyclopedia row's first article reference. Only
  // fires when the cache doesn't already have it (each article is keyed by tokenId so the panel
  // re-renders without refetching when the user reopens an entry).
  useEffect(() => {
    let cancelled = false;
    if (!encyclopediaSelectedTokenId || !resourceId) return () => {};
    const target = encyclopediaItems.find((i) => i.tokenId === encyclopediaSelectedTokenId);
    if (!target) return () => {};
    // Already loaded? bail.
    if (encyclopediaArticleDataMap[encyclopediaSelectedTokenId]) return () => {};
    const firstEntry = target.entries[0];
    if (!firstEntry) return () => {};

    (async () => {
      try {
        const proxy =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!proxy) return;
        const dto = await proxy.readArticle({
          articleId: firstEntry.articleId,
          resourceId,
          userLanguage: glossLanguage,
        });
        if (cancelled) return;
        const rendererData = articleDtoToRendererData(dto);
        setEncyclopediaArticleDataMap((prev) => ({
          ...prev,
          [encyclopediaSelectedTokenId]: rendererData,
        }));
      } catch (err) {
        logger.warn(
          `Enhanced Resources: readArticle failed for ${firstEntry.articleId}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [encyclopediaSelectedTokenId, encyclopediaItems, encyclopediaArticleDataMap, resourceId]);

  // FN-020(d) — when filteredTokenId changes (scripture-pane click or cross-tab propagation),
  // automatically open the matching encyclopedia row's detail drawer if there's a row for that
  // token. Symmetrical to the dictionary tab's selection semantics.
  useEffect(() => {
    if (!filteredTokenId) return;
    const match = encyclopediaItems.find((i) => i.tokenId === filteredTokenId);
    if (match && encyclopediaSelectedTokenId !== match.tokenId) {
      setEncyclopediaSelectedTokenId(match.tokenId);
    }
  }, [
    filteredTokenId,
    encyclopediaItems,
    encyclopediaSelectedTokenId,
    setEncyclopediaSelectedTokenId,
  ]);

  // ---------------------------------------------------------------------------
  // Media tabs wiring (UI-PKG-004)
  // ---------------------------------------------------------------------------
  // Two near-identical effects, one per tab, each calling the same backend method `loadMedia` with
  // a different `tabType`. The C# `MediaService.LoadResources` applies the Satellite Bible Atlas
  // filter server-side (TS-071 / BHV-601) so the wiring layer trusts the result and does not
  // re-filter. The pure `presentMediaItems` adapter formats the verse-range label and emits the
  // flat `MediaEntryRowData` shape the tabs consume.
  //
  // BHV-359 (deferred loading): the load fires only after the user has activated the tab at least
  // once. We track this via two `useState` flags that flip from `false` -> `true` when
  // `activeTab === 'media'` / `activeTab === 'maps'` is seen for the first time. Subsequent
  // BCV/scope/filter changes re-fire the load on the already-activated tab.

  const [mediaImagesItems, setMediaImagesItems] = useState<MediaEntryRowData[]>([]);
  const [mediaImagesIsLoading, setMediaImagesIsLoading] = useState(false);
  const [mediaImagesLoaded, setMediaImagesLoaded] = useState(false);
  const [mediaImagesEverActivated, setMediaImagesEverActivated] = useState(false);
  const [mediaImagesSelectedItemId, setMediaImagesSelectedItemId] = useWebViewState<
    string | undefined
  >('mediaImagesSelectedItemId', undefined);

  const [mediaMapsItems, setMediaMapsItems] = useState<MediaEntryRowData[]>([]);
  const [mediaMapsIsLoading, setMediaMapsIsLoading] = useState(false);
  const [mediaMapsLoaded, setMediaMapsLoaded] = useState(false);
  const [mediaMapsEverActivated, setMediaMapsEverActivated] = useState(false);
  const [mediaMapsSelectedItemId, setMediaMapsSelectedItemId] = useWebViewState<string | undefined>(
    'mediaMapsSelectedItemId',
    undefined,
  );

  // BHV-359: flip the activation flag the first time each tab becomes the active tab.
  useEffect(() => {
    if (activeTab === 'media' && !mediaImagesEverActivated) {
      setMediaImagesEverActivated(true);
    }
    if (activeTab === 'maps' && !mediaMapsEverActivated) {
      setMediaMapsEverActivated(true);
    }
  }, [activeTab, mediaImagesEverActivated, mediaMapsEverActivated]);

  // Effect: load Images tab whenever (resourceId, BCV, scope, filter) changes AND the tab has been
  // activated at least once. Fires on activation immediately because the dependency array includes
  // `mediaImagesEverActivated`.
  useEffect(() => {
    let cancelled = false;
    if (!mediaImagesEverActivated) return () => {};
    if (!resourceId || bookNum <= 0) {
      setMediaImagesItems([]);
      setMediaImagesIsLoading(false);
      setMediaImagesLoaded(true);
      return () => {
        cancelled = true;
      };
    }

    const filter: WordFilterInputDto | undefined = filteredTokenId
      ? {
          tokenId: filteredTokenId,
          lemma: '',
          source: '',
          translit: filteredTokenId,
          senses: '',
          targetLinks: '',
          clickOrigin: 'ScripturePane',
        }
      : undefined;

    const input: MediaLoadInputDto = {
      currentReference: {
        bookNum,
        chapterNum: scrRef.chapterNum,
        verseNum: scrRef.verseNum,
      },
      scope: marbleScopeToBackend(scope),
      filter,
      tabType: 'Images',
      userLanguage: glossLanguage,
      resourceId,
    };

    setMediaImagesIsLoading(true);
    setMediaImagesLoaded(false);
    (async () => {
      try {
        const proxy =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!proxy) {
          if (!cancelled) {
            setMediaImagesItems([]);
            setMediaImagesLoaded(true);
          }
          return;
        }
        const result = await proxy.loadMedia(input);
        if (cancelled) return;
        const presentations = presentMediaItems(result.items.map(mediaDtoToPresenterInput), {
          tabType: 'Images',
          formatReferenceLabel: formatMediaReferenceLabel,
        });
        setMediaImagesItems(presentations);
        setMediaImagesLoaded(true);
      } catch (err) {
        if (cancelled) return;
        logger.warn(
          `Enhanced Resources: loadMedia (Images) failed: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
        setMediaImagesItems([]);
        setMediaImagesLoaded(true);
      } finally {
        if (!cancelled) setMediaImagesIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    mediaImagesEverActivated,
    resourceId,
    bookNum,
    scrRef.chapterNum,
    scrRef.verseNum,
    scope,
    filteredTokenId,
  ]);

  // Effect: load Maps tab. Mirrors the Images-tab effect with `tabType: 'Maps'`.
  useEffect(() => {
    let cancelled = false;
    if (!mediaMapsEverActivated) return () => {};
    if (!resourceId || bookNum <= 0) {
      setMediaMapsItems([]);
      setMediaMapsIsLoading(false);
      setMediaMapsLoaded(true);
      return () => {
        cancelled = true;
      };
    }

    const filter: WordFilterInputDto | undefined = filteredTokenId
      ? {
          tokenId: filteredTokenId,
          lemma: '',
          source: '',
          translit: filteredTokenId,
          senses: '',
          targetLinks: '',
          clickOrigin: 'ScripturePane',
        }
      : undefined;

    const input: MediaLoadInputDto = {
      currentReference: {
        bookNum,
        chapterNum: scrRef.chapterNum,
        verseNum: scrRef.verseNum,
      },
      scope: marbleScopeToBackend(scope),
      filter,
      tabType: 'Maps',
      userLanguage: glossLanguage,
      resourceId,
    };

    setMediaMapsIsLoading(true);
    setMediaMapsLoaded(false);
    (async () => {
      try {
        const proxy =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!proxy) {
          if (!cancelled) {
            setMediaMapsItems([]);
            setMediaMapsLoaded(true);
          }
          return;
        }
        const result = await proxy.loadMedia(input);
        if (cancelled) return;
        const presentations = presentMediaItems(result.items.map(mediaDtoToPresenterInput), {
          tabType: 'Maps',
          formatReferenceLabel: formatMediaReferenceLabel,
        });
        setMediaMapsItems(presentations);
        setMediaMapsLoaded(true);
      } catch (err) {
        if (cancelled) return;
        logger.warn(
          `Enhanced Resources: loadMedia (Maps) failed: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
        setMediaMapsItems([]);
        setMediaMapsLoaded(true);
      } finally {
        if (!cancelled) setMediaMapsIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    mediaMapsEverActivated,
    resourceId,
    bookNum,
    scrRef.chapterNum,
    scrRef.verseNum,
    scope,
    filteredTokenId,
  ]);

  // MediaViewer (centered Dialog) state. Driven by either tab's Maximize button via the
  // `onMaximize` callback. Tracks which tab the maximized item came from so prev/next cycles
  // through the right list. A parallel `maximizedMediaAdHoc` state holds single-image entries
  // surfaced from the ArticleViewer (inline image clicks + `launchViewer` cross-references) which
  // do not exist in the Images / Maps tab lists.
  const [maximizedMediaContext, setMaximizedMediaContext] = useState<
    { tab: MediaTabType; index: number } | undefined
  >(undefined);
  const [maximizedMediaAdHoc, setMaximizedMediaAdHoc] = useState<MediaViewerItem | undefined>(
    undefined,
  );

  const handleMediaImagesMaximize = useCallback(
    (id: string) => {
      const index = mediaImagesItems.findIndex((i) => i.imageId === id);
      if (index < 0) return;
      setMaximizedMediaContext({ tab: 'Images', index });
    },
    [mediaImagesItems],
  );

  const handleMediaMapsMaximize = useCallback(
    (id: string) => {
      const index = mediaMapsItems.findIndex((i) => i.imageId === id);
      if (index < 0) return;
      setMaximizedMediaContext({ tab: 'Maps', index });
    },
    [mediaMapsItems],
  );

  const maximizedMediaList = useMemo(() => {
    if (!maximizedMediaContext) return undefined;
    return maximizedMediaContext.tab === 'Maps' ? mediaMapsItems : mediaImagesItems;
  }, [maximizedMediaContext, mediaImagesItems, mediaMapsItems]);

  const maximizedMediaItem: MediaViewerItem | undefined = useMemo(() => {
    // Ad-hoc items (article inline images / launchViewer cross-refs) take precedence — they only
    // appear when there is no indexed context.
    if (maximizedMediaAdHoc) return maximizedMediaAdHoc;
    if (!maximizedMediaContext || !maximizedMediaList) return undefined;
    const entry = maximizedMediaList[maximizedMediaContext.index];
    if (!entry) return undefined;
    return {
      imageId: entry.imageId,
      title: entry.title,
      mediaType: entry.mediaType,
      caption: entry.referenceLabel,
    };
  }, [maximizedMediaContext, maximizedMediaList, maximizedMediaAdHoc]);

  const handleMaximizedMediaOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setMaximizedMediaContext(undefined);
      setMaximizedMediaAdHoc(undefined);
    }
  }, []);

  // Prev / next through the active list. Returning `undefined` from these callbacks disables the
  // Dialog button (component contract). Ad-hoc items always disable both buttons (single image).
  const handleMaximizedMediaPrev = useMemo(() => {
    if (maximizedMediaAdHoc) return undefined;
    if (!maximizedMediaContext || !maximizedMediaList) return undefined;
    if (maximizedMediaContext.index <= 0) return undefined;
    return () =>
      setMaximizedMediaContext((prev) => (prev ? { tab: prev.tab, index: prev.index - 1 } : prev));
  }, [maximizedMediaContext, maximizedMediaList, maximizedMediaAdHoc]);

  const handleMaximizedMediaNext = useMemo(() => {
    if (maximizedMediaAdHoc) return undefined;
    if (!maximizedMediaContext || !maximizedMediaList) return undefined;
    if (maximizedMediaContext.index >= maximizedMediaList.length - 1) return undefined;
    return () =>
      setMaximizedMediaContext((prev) => (prev ? { tab: prev.tab, index: prev.index + 1 } : prev));
  }, [maximizedMediaContext, maximizedMediaList, maximizedMediaAdHoc]);

  // FN-009 resolvers: thumbnails (tab + drawer) and full-size image (MediaViewer Dialog).
  const mediaThumbnailUrlResolver = useCallback(
    (imageId: string) => buildPapiErImageUrl(imageId),
    [],
  );
  const mediaViewerImageUrlResolver = useCallback(
    (imageId: string) => buildPapiErImageUrl(imageId, 'full'),
    [],
  );

  // ---------------------------------------------------------------------------
  // ArticleViewer (centered Dialog) wiring (UI-PKG-006)
  // ---------------------------------------------------------------------------
  // Triggered by the "View article" link inside an encyclopedia entry detail panel. The flat state
  // model holds a single `activeArticleId` (no sequence prev/next per Theme 14); cross-references
  // (`seealso`) re-enter the same dialog by setting a new id while clearing the data so the user
  // sees a loading skeleton between articles. `launchViewer` cross-refs and inline-image clicks
  // dispatch into the MediaViewer ad-hoc state defined above.
  const [activeArticleId, setActiveArticleId] = useState<string | undefined>(undefined);
  const [activeArticleData, setActiveArticleData] = useState<ArticleRendererData | undefined>(
    undefined,
  );

  // Effect: fetch article data whenever activeArticleId changes. Clears existing data on every
  // change so the dialog shows a skeleton between articles (matches the controlled-Dialog
  // contract — parent owns `articleData` and it's allowed to be undefined while loading).
  useEffect(() => {
    let cancelled = false;
    if (!activeArticleId || !resourceId) {
      setActiveArticleData(undefined);
      return () => {
        cancelled = true;
      };
    }
    setActiveArticleData(undefined);
    (async () => {
      try {
        const proxy =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!proxy) return;
        const dto = await proxy.readArticle({
          articleId: activeArticleId,
          resourceId,
          userLanguage: glossLanguage,
        });
        if (cancelled) return;
        setActiveArticleData(articleDtoToRendererData(dto));
      } catch (err) {
        if (cancelled) return;
        logger.warn(
          `Enhanced Resources: ArticleViewer readArticle failed for ${activeArticleId}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeArticleId, resourceId]);

  const handleEncyclopediaArticleLinkClick = useCallback((articleId: string) => {
    setActiveArticleId(articleId);
  }, []);

  const handleArticleViewerOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setActiveArticleId(undefined);
      setActiveArticleData(undefined);
    }
  }, []);

  // Verse-link click → drive the platform scroll-group via setScrRef. The article verse link
  // carries (book, chapter, verse) ints; we project them to the SerializedVerseRef shape that
  // useWebViewScrollGroupScrRef expects via Canon.bookNumberToId.
  const handleArticleVerseLinkClick = useCallback(
    (link: ArticleVerseLinkData) => {
      const bookId = Canon.bookNumberToId(link.reference.book);
      if (!bookId) return;
      setScrRef({
        book: bookId,
        chapterNum: link.reference.chapter,
        verseNum: link.reference.verse,
      });
    },
    [setScrRef],
  );

  const handleArticleCrossReferenceClick = useCallback((ref: ArticleCrossRefData) => {
    if (ref.type === 'seealso') {
      // Re-enter the dialog with the new article id. The fetch effect above clears
      // activeArticleData and reloads.
      setActiveArticleId(ref.targetArticleId);
      return;
    }
    // launchViewer: surface the targetArticleId as an ad-hoc image in MediaViewer.
    setMaximizedMediaAdHoc({
      imageId: ref.targetArticleId,
      title: ref.displayText,
      mediaType: 'image',
    });
  }, []);

  const handleArticleImageClick = useCallback((imageId: string) => {
    setMaximizedMediaAdHoc({
      imageId,
      title: imageId,
      mediaType: 'image',
    });
  }, []);

  // Empty-state classification for encyclopedia (BHV-352, three variants).
  let encyclopediaEmptyState: EncyclopediaEmptyStateVariant;
  if (encyclopediaItems.length > 0) {
    encyclopediaEmptyState = 'none';
  } else if (filteredTokenId) {
    encyclopediaEmptyState = 'word-not-in-scope';
  } else {
    encyclopediaEmptyState = 'no-data';
  }

  // Empty-state classification — three variants per BHV-352.
  let dictionaryEmptyState: DictionaryEmptyStateVariant;
  if (dictionaryItems.length > 0) {
    dictionaryEmptyState = 'none';
  } else if (filteredTokenId) {
    dictionaryEmptyState = 'word-not-in-scope';
  } else {
    dictionaryEmptyState = 'no-data';
  }

  // Localized scope label for the empty-state {scope} placeholder.
  const dictionaryScopeLabel = (() => {
    switch (scope) {
      case 'current-section':
        return String(stringsBag['%enhancedResources_toolbar_scope_currentSection%'] ?? 'section');
      case 'current-chapter':
        return String(stringsBag['%enhancedResources_toolbar_scope_currentChapter%'] ?? 'chapter');
      case 'current-sense':
        return String(stringsBag['%enhancedResources_toolbar_scope_currentSense%'] ?? 'sense');
      case 'current-verse':
      default:
        return String(stringsBag['%enhancedResources_toolbar_scope_currentVerse%'] ?? 'verse');
    }
  })();

  // FN-020: linked-word click → set filter, ensure scope dropdown gains "Current Sense" option,
  // and propagate the filter to whatever research tab is currently active.
  const handleTokenClick = useCallback(
    (tokenId: string) => {
      setFilteredTokenId(tokenId);
    },
    [setFilteredTokenId],
  );

  // FN-020 (c): clicking a source-language word in DictionaryTab sets the filter to that lemma so
  // the scripture pane (and other research tabs) propagate. We reuse the existing token-click
  // handler — both paths terminate in `setFilteredTokenId`.
  const handleDictionarySourceTextClick = useCallback(
    (tokenId: string) => {
      setFilteredTokenId(tokenId);
    },
    [setFilteredTokenId],
  );

  // FN-020 (c) — encyclopedia variant. Clicking the translit headline in an encyclopedia row
  // sets the filter to that token so the scripture pane and dictionary tab propagate the same
  // way they do from a dictionary click.
  const handleEncyclopediaSourceTextClick = useCallback(
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
      dictionaryItems={dictionaryItems}
      dictionarySelectedTokenId={dictionarySelectedTokenId}
      dictionaryIsLoading={dictionaryIsLoading}
      dictionaryEmptyState={dictionaryEmptyState}
      dictionaryFilterWord={filteredTokenId}
      dictionaryScopeLabel={dictionaryScopeLabel}
      dictionaryActiveDictionary={dictionaryActiveDictionary}
      dictionaryHideLessRelevantSenses={dictionaryHideLessRelevantSenses}
      onDictionarySelectionChange={setDictionarySelectedTokenId}
      onDictionarySourceTextClick={handleDictionarySourceTextClick}
      onDictionaryToggleHideLessRelevantSenses={setDictionaryHideLessRelevantSenses}
      encyclopediaItems={encyclopediaItems}
      encyclopediaSelectedTokenId={encyclopediaSelectedTokenId}
      encyclopediaIsLoading={encyclopediaIsLoading}
      encyclopediaEmptyState={encyclopediaEmptyState}
      encyclopediaFilterWord={filteredTokenId}
      encyclopediaScopeLabel={dictionaryScopeLabel}
      encyclopediaArticleDataMap={encyclopediaArticleDataMap}
      onEncyclopediaSelectionChange={setEncyclopediaSelectedTokenId}
      onEncyclopediaSourceTextClick={handleEncyclopediaSourceTextClick}
      onEncyclopediaArticleLinkClick={handleEncyclopediaArticleLinkClick}
      activeArticleId={activeArticleId}
      activeArticleData={activeArticleData}
      articleViewerImageUrlResolver={mediaThumbnailUrlResolver}
      onArticleViewerOpenChange={handleArticleViewerOpenChange}
      onArticleVerseLinkClick={handleArticleVerseLinkClick}
      onArticleCrossReferenceClick={handleArticleCrossReferenceClick}
      onArticleImageClick={handleArticleImageClick}
      mediaImagesItems={mediaImagesItems}
      mediaImagesSelectedItemId={mediaImagesSelectedItemId}
      mediaImagesIsLoading={mediaImagesIsLoading}
      mediaImagesLoaded={mediaImagesLoaded}
      mediaImagesScopeLabel={dictionaryScopeLabel}
      mediaImagesThumbnailUrlResolver={mediaThumbnailUrlResolver}
      onMediaImagesSelectionChange={setMediaImagesSelectedItemId}
      onMediaImagesMaximize={handleMediaImagesMaximize}
      mediaMapsItems={mediaMapsItems}
      mediaMapsSelectedItemId={mediaMapsSelectedItemId}
      mediaMapsIsLoading={mediaMapsIsLoading}
      mediaMapsLoaded={mediaMapsLoaded}
      mediaMapsScopeLabel={dictionaryScopeLabel}
      mediaMapsThumbnailUrlResolver={mediaThumbnailUrlResolver}
      onMediaMapsSelectionChange={setMediaMapsSelectedItemId}
      onMediaMapsMaximize={handleMediaMapsMaximize}
      maximizedMediaItem={maximizedMediaItem}
      mediaViewerImageUrlResolver={mediaViewerImageUrlResolver}
      onMaximizedMediaOpenChange={handleMaximizedMediaOpenChange}
      onMaximizedMediaPrev={handleMaximizedMediaPrev}
      onMaximizedMediaNext={handleMaximizedMediaNext}
      localizedStringsWithLoadingState={[stringsForShell, isLoadingStrings]}
    />
  );
};
