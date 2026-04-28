import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Skeleton,
  TabsContent,
  Tabs,
  cn,
} from 'platform-bible-react';
import type { LocalizedStringValue, ScrollGroupId } from 'platform-bible-utils';
import {
  ScripturePane,
  type MarbleTokenLike,
  type ScriptDisplayMode,
  type ScripturePaneVerseRef,
} from '../components/scripture-pane/scripture-pane.component';
import {
  Toolbar,
  type HighlightMode,
  type MarbleScope,
  type ResearchTab,
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
import type { VerseOccurrenceLink } from '../components/dictionary-tab/dictionary-entry-detail.component';
import {
  EncyclopediaTab,
  type EncyclopediaEmptyStateVariant,
} from '../components/encyclopedia-tab/encyclopedia-tab.component';
import type {
  EncyclopediaDisplayItemData,
  EncyclopediaEntryRefData,
} from '../components/encyclopedia-tab/encyclopedia-display-item.component';
import type {
  ArticleCrossRefData,
  ArticleRendererData,
  ArticleVerseLinkData,
} from '../components/shared/article-renderer.component';
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
  currentReference: ScripturePaneVerseRef;
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
  highlightMode?: HighlightMode;
  onHighlightModeChange?: (mode: HighlightMode) => void;
  onInfoClick?: () => void;
  onTabMenuClick?: () => void;
  scrollGroupId?: ScrollGroupId | undefined;
  onScrollGroupChange?: (newScrollGroupId: ScrollGroupId | undefined) => void;
  currentReferenceLabel?: string;

  // Ribbons
  ribbons: RibbonStates;
  onDismissReviewStatus?: () => void;
  onDismissCopyright?: () => void;
  onDismissUpdateAvailable?: () => void;
  onCopyrightMoreInfo?: () => void;
  onMetadataUpdate?: () => void;

  /** Splitter percentage between scripture pane and research pane. Defaults to 60. */
  splitterPercentage?: number;

  // Dictionary tab
  dictionaryItems?: DictionaryDisplayItemData[];
  dictionarySelectedTokenId?: string;
  dictionaryIsLoading?: boolean;
  dictionaryEmptyState?: DictionaryEmptyStateVariant;
  dictionaryFilterWord?: string;
  dictionaryScopeLabel?: string;
  dictionaryShowTranslations?: boolean;
  dictionaryActiveDictionary?: 'SDBH' | 'SDBG';
  dictionaryHideNonRelevantSenses?: boolean;
  onDictionarySelectionChange?: (tokenId: string | undefined) => void;
  onDictionarySourceTextClick?: (tokenId: string) => void;
  onDictionaryOccurrenceCountClick?: (tokenId: string) => void;
  onDictionarySemanticDomainClick?: (domainId: string) => void;
  onDictionaryRelatedLexemeClick?: (lemma: string) => void;
  onDictionaryEncyclopediaLinkClick?: (articleId: string) => void;
  onDictionaryVerseOccurrenceClick?: (verse: VerseOccurrenceLink) => void;
  onDictionaryToggleHideNonRelevantSenses?: (hide: boolean) => void;
  onDictionaryCopySurfaceForm?: (item: DictionaryDisplayItemData) => void;
  onDictionaryCopyLemma?: (item: DictionaryDisplayItemData) => void;

  // Encyclopedia tab
  encyclopediaItems?: EncyclopediaDisplayItemData[];
  encyclopediaSelectedTokenId?: string;
  encyclopediaIsLoading?: boolean;
  encyclopediaEmptyState?: EncyclopediaEmptyStateVariant;
  encyclopediaFilterWord?: string;
  encyclopediaScopeLabel?: string;
  encyclopediaArticleDataMap?: Record<string, ArticleRendererData | undefined>;
  encyclopediaImageUrlResolver?: (imageId: string) => string;
  onEncyclopediaSelectionChange?: (tokenId: string | undefined) => void;
  onEncyclopediaSourceTextClick?: (tokenId: string) => void;
  onEncyclopediaCopySurfaceForm?: (item: EncyclopediaDisplayItemData) => void;
  onEncyclopediaCopyLemma?: (item: EncyclopediaDisplayItemData) => void;
  onEncyclopediaVerseLinkClick?: (link: ArticleVerseLinkData) => void;
  onEncyclopediaCrossReferenceClick?: (ref: ArticleCrossRefData) => void;
  onEncyclopediaImageClick?: (imageId: string) => void;
  onEncyclopediaViewFullArticle?: (entry: EncyclopediaEntryRefData) => void;

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
 * ScripturePane (placeholder per FN-001/013/014), and the four research-pane tab content slots.
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
  currentReference,
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
  highlightMode = 'none',
  onHighlightModeChange = () => {},
  onInfoClick = () => {},
  onTabMenuClick = () => {},
  scrollGroupId,
  onScrollGroupChange = () => {},
  currentReferenceLabel,

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
  dictionaryShowTranslations = false,
  dictionaryActiveDictionary = 'SDBH',
  dictionaryHideNonRelevantSenses = false,
  onDictionarySelectionChange = () => {},
  onDictionarySourceTextClick = () => {},
  onDictionaryOccurrenceCountClick = () => {},
  onDictionarySemanticDomainClick = () => {},
  onDictionaryRelatedLexemeClick = () => {},
  onDictionaryEncyclopediaLinkClick = () => {},
  onDictionaryVerseOccurrenceClick = () => {},
  onDictionaryToggleHideNonRelevantSenses = () => {},
  onDictionaryCopySurfaceForm = () => {},
  onDictionaryCopyLemma = () => {},

  encyclopediaItems = [],
  encyclopediaSelectedTokenId,
  encyclopediaIsLoading = false,
  encyclopediaEmptyState = 'none',
  encyclopediaFilterWord,
  encyclopediaScopeLabel = '',
  encyclopediaArticleDataMap = {},
  encyclopediaImageUrlResolver,
  onEncyclopediaSelectionChange = () => {},
  onEncyclopediaSourceTextClick = () => {},
  onEncyclopediaCopySurfaceForm = () => {},
  onEncyclopediaCopyLemma = () => {},
  onEncyclopediaVerseLinkClick = () => {},
  onEncyclopediaCrossReferenceClick = () => {},
  onEncyclopediaImageClick = () => {},
  onEncyclopediaViewFullArticle = () => {},

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
      {copyrightOverlayVisible && (
        <CopyrightOverlay
          copyrightInfo={copyrightInfo}
          dismissed={false}
          onDismiss={onCopyrightOverlayDismiss}
          localizedStringsWithLoadingState={childStrings}
        />
      )}
      <Toolbar
        activeTab={activeTab}
        onTabChange={onTabChange}
        scope={scope}
        onScopeChange={onScopeChange}
        hasSenseScope={hasSenseScope}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        highlightMode={highlightMode}
        onHighlightModeChange={onHighlightModeChange}
        onInfoClick={onInfoClick}
        onTabMenuClick={onTabMenuClick}
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
              <ScripturePane
                tokens={tokens}
                currentReference={currentReference}
                filteredTokenId={filteredTokenId}
                hebrewDisplayMode={hebrewDisplayMode}
                greekDisplayMode={greekDisplayMode}
                showFootnotes={showFootnotes}
                scripturePaneZoom={scripturePaneZoom}
                errorMessage={scripturePaneError}
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
              <Tabs value={activeTab} className="tw-flex tw-h-full tw-flex-col">
                <TabsContent
                  value="dictionary"
                  className="tw-flex tw-flex-1 tw-flex-col data-[state=inactive]:tw-hidden"
                >
                  <DictionaryTab
                    items={dictionaryItems}
                    selectedTokenId={dictionarySelectedTokenId}
                    isLoading={dictionaryIsLoading}
                    emptyState={dictionaryEmptyState}
                    filterWord={dictionaryFilterWord}
                    scopeLabel={dictionaryScopeLabel}
                    showTranslations={dictionaryShowTranslations}
                    activeDictionary={dictionaryActiveDictionary}
                    hideNonRelevantSenses={dictionaryHideNonRelevantSenses}
                    onSelectionChange={onDictionarySelectionChange}
                    onSourceTextClick={onDictionarySourceTextClick}
                    onOccurrenceCountClick={onDictionaryOccurrenceCountClick}
                    onSemanticDomainClick={onDictionarySemanticDomainClick}
                    onRelatedLexemeClick={onDictionaryRelatedLexemeClick}
                    onEncyclopediaLinkClick={onDictionaryEncyclopediaLinkClick}
                    onVerseOccurrenceClick={onDictionaryVerseOccurrenceClick}
                    onToggleHideNonRelevantSenses={onDictionaryToggleHideNonRelevantSenses}
                    onCopySurfaceForm={onDictionaryCopySurfaceForm}
                    onCopyLemma={onDictionaryCopyLemma}
                    localizedStringsWithLoadingState={childStrings}
                  />
                </TabsContent>
                <TabsContent
                  value="encyclopedia"
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
                    imageUrlResolver={encyclopediaImageUrlResolver}
                    onSelectionChange={onEncyclopediaSelectionChange}
                    onSourceTextClick={onEncyclopediaSourceTextClick}
                    onCopySurfaceForm={onEncyclopediaCopySurfaceForm}
                    onCopyLemma={onEncyclopediaCopyLemma}
                    onVerseLinkClick={onEncyclopediaVerseLinkClick}
                    onCrossReferenceClick={onEncyclopediaCrossReferenceClick}
                    onImageClick={onEncyclopediaImageClick}
                    onViewFullArticle={onEncyclopediaViewFullArticle}
                    localizedStringsWithLoadingState={childStrings}
                  />
                </TabsContent>
                <TabsContent
                  value="media"
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
    </div>
  );
}

export default EnhancedResourceWebView;
