import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
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
  type SemanticDomain,
} from 'platform-bible-react';
import type { LocalizeKey, LocalizedStringValue, ScrollGroupId } from 'platform-bible-utils';
import { formatScrRef, formatScrRefRange, isPlatformError } from 'platform-bible-utils';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { convertMarbleChapterXml, type MarbleAnnotation } from '../lib/marble-converter';
import { computeScopeKeyedRefKey } from '../lib/scope-keyed-ref-key';
import {
  useEnhancedResourcesProxy,
  type WordFilterInputDto,
  type DictionaryLoadInputDto,
  type DictionaryEntryDataDto,
  type EncyclopediaLoadInputDto,
  type EncyclopediaDisplayItemDto,
  type ArticleDataDto,
  type MediaLoadInputDto,
  type MediaDisplayItemDto,
} from '../lib/use-enhanced-resources-proxy';
import {
  EnhancedScripturePane,
  ENHANCED_SCRIPTURE_PANE_STRING_KEYS,
} from '../components/scripture-pane/scripture-pane.component';
import {
  EnhancedResourceTabBar,
  EnhancedResourceTopToolbar,
  TOOLBAR_STRING_KEYS,
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
import type {
  DictionarySenseDisplay,
  DictionarySenseDomain,
} from '../components/shared/dictionary-sense-item.component';
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
  SemanticDomainViewer,
  SEMANTIC_DOMAIN_VIEWER_STRING_KEYS,
  type SemanticDomainFilteredItem,
} from '../components/semantic-domain-viewer/semantic-domain-viewer.component';
import {
  presentMediaItems,
  type MediaDisplayItemInput,
  type MediaTabType,
} from '../presenters/media-presenter';
import { MarbleGuide, MARBLE_GUIDE_STRING_KEYS } from '../components/guide/marble-guide.component';

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
  usj: Usj | undefined;
  annotations: MarbleAnnotation[];
  filteredTokenId: string | undefined;
  hebrewDisplayMode?: ScriptDisplayMode;
  greekDisplayMode?: ScriptDisplayMode;
  showFootnotes?: boolean;
  scripturePaneZoom?: number;
  scripturePaneError?: string;
  onTokenClick?: (tokenId: string, annotation: MarbleAnnotation) => void;
  onTokenContextMenu?: (
    tokenId: string,
    annotation: MarbleAnnotation,
    event: ReactMouseEvent,
  ) => void;

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
   * Short-name of the active resource (e.g. "ESV16UK+"). Threaded through to the toolbar so the
   * hamburger menu can render "Show translations ({resourceShortName})" per FN-020(b).
   */
  resourceShortName?: string;
  /** Current scripture reference - forwarded to the scripture pane for Editorial scrRef wiring. */
  scrRef?: SerializedVerseRef;
  /**
   * FN-015: callback to update the scripture reference. Wired to `setScrRef` from
   * `useWebViewScrollGroupScrRef` so changes via the toolbar's `BookChapterControl` propagate
   * through the scroll-group to sibling editor windows.
   */
  onScrRefChange?: (next: SerializedVerseRef) => void;
  /**
   * Optional callback fired when the user picks a recent search inside the BCV control. Forwarded
   * straight to `BookChapterControl.onAddRecentSearch`.
   */
  onAddRecentSearch?: (next: SerializedVerseRef) => void;
  /** Recent searches surfaced inside the BCV control (FN-015). */
  recentSearches?: SerializedVerseRef[];
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
  /**
   * UI-PKG-007 / FN-021 - click on a Domain row inside a sense definition table. Wiring layer
   * dispatches a SemanticDomainViewer-open with the full DomainLink payload (filtered-list mode).
   */
  onDictionarySenseDomainClick?: (domain: DictionarySenseDomain) => void;
  /**
   * UI-PKG-007 cold-entry - "Browse semantic domains" button click in the dictionary tab header.
   * Wiring layer dispatches a SemanticDomainViewer-open with no preselected domain (tree-overlay
   * mode).
   */
  onBrowseSemanticDomainsClick?: () => void;

  // SemanticDomainViewer (centered Dialog) — UI-PKG-007. Opened either from a Dictionary `Domain:`
  // link (filtered-list mode, FN-021) or from the dictionary tab's "Browse semantic domains"
  // button (tree-overlay / cold-entry mode). Closes on entry click (BHV-456 displaydomain),
  // breadcrumb segment navigation re-renders without closing (displaycat).
  /** Whether the SDV Dialog is open. */
  semanticDomainViewerOpen?: boolean;
  /** Resolved breadcrumb path from root to focused domain. Undefined => cold-entry / browse mode. */
  semanticDomainViewerPath?: SemanticDomain[];
  /** Full domain hierarchy (root nodes) for the active SDV dictionary (SDBH or SDBG). */
  semanticDomainViewerAllDomains?: SemanticDomain[];
  /** Dictionary entries belonging to the focused domain. */
  semanticDomainViewerFilteredEntries?: SemanticDomainFilteredItem[];
  /** Loading flag while filtered entries are being fetched. */
  semanticDomainViewerIsLoading?: boolean;
  /** Open-state change handler — called by Dialog X / Esc / click-outside. */
  onSemanticDomainViewerOpenChange?: (open: boolean) => void;
  /** Domain-path change handler — called when breadcrumb popover navigates within the tree. */
  onSemanticDomainViewerDomainChange?: (newPath: SemanticDomain[]) => void;
  /** Click on a filtered entry's source-text Button — BHV-456 displaydomain (closes SDV). */
  onSemanticDomainViewerEntryClick?: (entry: DictionaryDisplayItemData) => void;

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

  // MarbleGuide ("Getting started in Enhanced Resources") — UI-PKG-008. Rendered as a sibling-level
  // shadcn Dialog whose visibility is fully controlled by the wiring layer. The guide auto-shows
  // once per app session on the first ER open (BHV-461 / BHV-463) when the
  // `platformEnhancedResources.showMarbleGuide` setting is true. The toolbar info-icon
  // (FN-016) toggles it on demand. The guide's "Don't show this again" checkbox value, plus its
  // change/close callbacks, are driven from the wiring layer so settings persistence and session
  // suppression live in one place.
  /** Whether the MarbleGuide Dialog is open. */
  marbleGuideOpen?: boolean;
  /** "Don't show this again" checkbox state — controlled. */
  marbleGuideNeverShowAgain?: boolean;
  /** Close handler. Wiring layer persists `showMarbleGuide = !neverShowAgain` and closes. */
  onMarbleGuideClose?: () => void;
  /** Checkbox-toggle handler. */
  onMarbleGuideNeverShowAgainChange?: (next: boolean) => void;
};

/**
 * Pure presentational shell for the Enhanced Resource window. Composes WarningRibbons, Toolbar,
 * EnhancedScripturePane (FN-001/013/014 — wraps the platform-scripture-editor in read-only mode
 * with marble word/note overlay), and the four research-pane tab content slots.
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

  usj,
  annotations,
  filteredTokenId,
  hebrewDisplayMode = 'both',
  greekDisplayMode = 'both',
  showFootnotes = false,
  scripturePaneZoom = 1,
  scripturePaneError,
  onTokenClick = () => {},
  onTokenContextMenu = () => {},

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
  resourceShortName,
  scrRef,
  onScrRefChange,
  onAddRecentSearch,
  recentSearches,
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
  onDictionarySenseDomainClick,
  onBrowseSemanticDomainsClick,

  semanticDomainViewerOpen = false,
  semanticDomainViewerPath,
  semanticDomainViewerAllDomains = [],
  semanticDomainViewerFilteredEntries = [],
  semanticDomainViewerIsLoading = false,
  onSemanticDomainViewerOpenChange = () => {},
  onSemanticDomainViewerDomainChange = () => {},
  onSemanticDomainViewerEntryClick = () => {},

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

  marbleGuideOpen = false,
  marbleGuideNeverShowAgain = false,
  onMarbleGuideClose = () => {},
  onMarbleGuideNeverShowAgainChange = () => {},

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
        className="tw-flex tw-h-[100dvh] tw-flex-col tw-gap-3 tw-p-4"
      >
        <Skeleton className="tw-h-8 tw-w-full" />
        <Skeleton className="tw-h-8 tw-w-full" />
        <Skeleton className="tw-flex-1 tw-w-full" />
        <Skeleton className="tw-h-32 tw-w-full" />
      </div>
    );
  }

  const showShellEmpty = usj === undefined && !scripturePaneError;

  return (
    <div className={cn('tw-flex tw-h-[100dvh] tw-flex-col tw-bg-background')}>
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
        resourceShortName={resourceShortName}
        scrRef={scrRef}
        onScrRefChange={onScrRefChange}
        onAddRecentSearch={onAddRecentSearch}
        recentSearches={recentSearches}
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
              <EnhancedScripturePane
                usj={usj}
                annotations={annotations}
                filteredTokenId={filteredTokenId}
                showFootnotes={showFootnotes}
                scripturePaneZoom={scripturePaneZoom}
                errorMessage={scripturePaneError}
                highlightAllResearchTerms={highlightMode === 'all-research-terms'}
                scrRef={scrRef}
                onTokenClick={onTokenClick}
                onTokenContextMenu={onTokenContextMenu}
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
                    onSenseDomainClick={onDictionarySenseDomainClick}
                    onBrowseSemanticDomainsClick={onBrowseSemanticDomainsClick}
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
      {/*
       * UI-PKG-007: SemanticDomainViewer (centered Dialog) - opened either by clicking a sense
       * `Domain:` link in the Dictionary tab (filtered-list mode, FN-021) or by the dictionary
       * tab header's "Browse semantic domains" button (tree-overlay / cold-entry mode). The
       * wiring layer drives `open`, `domainPath`, `allDomains`, and `filteredEntries` from real
       * PAPI data; click on a filtered entry routes through `onSemanticDomainViewerEntryClick`
       * which sets `filteredTokenId` and closes the dialog (BHV-456 displaydomain).
       */}
      <SemanticDomainViewer
        open={semanticDomainViewerOpen}
        domainPath={semanticDomainViewerPath}
        allDomains={semanticDomainViewerAllDomains}
        filteredEntries={semanticDomainViewerFilteredEntries}
        isLoading={semanticDomainViewerIsLoading}
        onOpenChange={onSemanticDomainViewerOpenChange}
        onDomainChange={onSemanticDomainViewerDomainChange}
        onEntryClick={onSemanticDomainViewerEntryClick}
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
      {/*
       * UI-PKG-008: MarbleGuide ("Getting started in Enhanced Resources") rendered as a sibling
       * Dialog. Visibility is fully controlled by the wiring layer (see `marbleGuideOpen`). The
       * inner shadcn Dialog handles Escape, click-outside, focus management, and its own close
       * button — `onClose` runs when any of those fire so the wiring layer can persist the
       * "Don't show this again" preference.
       */}
      <MarbleGuide
        open={marbleGuideOpen}
        neverShowAgain={marbleGuideNeverShowAgain}
        onClose={onMarbleGuideClose}
        onNeverShowAgainChange={onMarbleGuideNeverShowAgainChange}
        localizedStringsWithLoadingState={childStrings}
      />
    </div>
  );
}

export default EnhancedResourceWebView;

// Retained for stories/tests as the canonical "all-off" baseline; the wiring layer now derives
// real ribbon states (GAP-002) but tooling and Storybook still import this constant when they
// want a known-empty starting point.
export const EMPTY_RIBBON_STATES: RibbonStates = {
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
  ...ENHANCED_SCRIPTURE_PANE_STRING_KEYS,
  ...TOOLBAR_STRING_KEYS,
  ...DICTIONARY_TAB_STRING_KEYS,
  ...ENCYCLOPEDIA_TAB_STRING_KEYS,
  ...MEDIA_IMAGES_TAB_STRING_KEYS,
  ...MEDIA_MAPS_TAB_STRING_KEYS,
  ...MEDIA_VIEWER_STRING_KEYS,
  ...ARTICLE_VIEWER_STRING_KEYS,
  ...SEMANTIC_DOMAIN_VIEWER_STRING_KEYS,
  ...MARBLE_GUIDE_STRING_KEYS,
];

/*
 * Network-object id, the `EnhancedResourcesNetworkObject` proxy type, and all PAPI DTO types
 * (`LoadMarbleChapterXmlInput`, `*LoadInputDto`, `*ResultDto`, etc.) live in
 * `../lib/use-enhanced-resources-proxy.ts`. The `useEnhancedResourcesProxy()` hook resolves the
 * proxy once per webview and shares it across all consumer effects, replacing the previous
 * per-effect `papi.networkObjects.get<...>(ER_NETWORK_OBJECT_ID)` calls.
 */

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

/**
 * Adapt the presenter's DomainLink shape into the UI's `DictionarySenseDomain`. Forwards the full
 * {id, label, domainPath, dictionaryId} payload so `DictionarySenseItem` can render each row as a
 * clickable Button (UI-PKG-007 / FN-021) and the parent webview can dispatch a
 * SemanticDomainViewer-open with a real filtered-list target.
 */
function senseDisplaysFromPresentation(
  senses: {
    id: string;
    senseNumber: number;
    definition: string;
    glosses: string;
    domains: { id: string; label: string; domainPath: string; dictionaryId: 'SDBH' | 'SDBG' }[];
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
      s.domains.length > 0
        ? s.domains.map((d) => ({
            id: d.id,
            label: d.label,
            domainPath: d.domainPath,
            dictionaryId: d.dictionaryId,
          }))
        : undefined,
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
  // The keys reference must be stable across renders. WIRING_LOCALIZED_STRING_KEYS is module-level.
  const [stringsBag, isLoadingStrings] = useLocalizedStrings(WIRING_LOCALIZED_STRING_KEYS);
  const stringsForShell: Record<string, LocalizedStringValue | undefined> = { ...stringsBag };

  // Resolve the Enhanced Resources network-object proxy once per webview. Replaces eight
  // per-effect `await papi.networkObjects.get<...>(...)` calls that previously fired on every
  // BCV move (Fix 3 of UI Performance Fix plan).
  const erProxy = useEnhancedResourcesProxy();

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

  // Chapter USJ + annotations state - drives the scripture pane.
  const [usj, setUsj] = useState<Usj | undefined>(undefined);
  const [annotations, setAnnotations] = useState<MarbleAnnotation[]>([]);
  const [scripturePaneError, setScripturePaneError] = useState<string | undefined>(undefined);

  // Load chapter XML when (resourceId, bookId, chapterNum) changes. resourceId may be undefined
  // when the launcher fired without one - the shell renders its empty state in that case
  // (TS-043). The PAPI call goes against the `platform.enhancedResources` network object via
  // `papi.networkObjects.get` (the C# EnhancedResourceFactory exposes `loadMarbleChapterXml`
  // there).
  useEffect(() => {
    let cancelled = false;
    if (resourceId === undefined) {
      setUsj(undefined);
      setAnnotations([]);
      setScripturePaneError(undefined);
      return () => {
        cancelled = true;
      };
    }

    const bookNum = Canon.bookIdToNumber(scrRef.book);
    if (bookNum <= 0) {
      // Unknown book id - leave the empty state in place rather than blow up.
      setUsj(undefined);
      setAnnotations([]);
      setScripturePaneError(undefined);
      return () => {
        cancelled = true;
      };
    }

    if (!erProxy) {
      setUsj(undefined);
      setAnnotations([]);
      setScripturePaneError('Enhanced Resources backend is not available.');
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      try {
        const xml = await erProxy.loadMarbleChapterXml({
          resourceId,
          bookNum,
          chapterNumber: scrRef.chapterNum,
        });
        if (cancelled) return;
        const { usj: convertedUsj, annotations: convertedAnnotations } =
          convertMarbleChapterXml(xml);
        setUsj(convertedUsj);
        setAnnotations(convertedAnnotations);
        setScripturePaneError(undefined);
      } catch (err) {
        if (cancelled) return;
        logger.warn(
          `Enhanced Resources: failed to load chapter ${scrRef.book} ${scrRef.chapterNum}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
        setUsj(undefined);
        setAnnotations([]);
        // Surface a user-visible error only for unexpected failures - missing-book / missing-data
        // resolutions belong to the warning-ribbon system (BHV-310).
        setScripturePaneError(undefined);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [erProxy, resourceId, scrRef.book, scrRef.chapterNum]);

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

  // PT9 Scope semantics: research-tab effects key on this single value rather
  // than putting scrRef.verseNum in their dep arrays. At scope=current-chapter
  // (and larger) cursor moves within the chapter no longer fan out to four
  // concurrent backend loads. Reconstruct a minimal ref object inside the memo
  // so the dep array can list the primitive fields directly (avoids stale
  // reads if the parent passes a new scrRef reference with unchanged fields).
  const scrRefBook = scrRef.book;
  const scrRefChapterNum = scrRef.chapterNum;
  const scrRefVerseNum = scrRef.verseNum;
  const scopeKeyedRefKey = useMemo(
    () =>
      computeScopeKeyedRefKey(scope, {
        book: scrRefBook,
        chapterNum: scrRefChapterNum,
        verseNum: scrRefVerseNum,
      }),
    [scope, scrRefBook, scrRefChapterNum, scrRefVerseNum],
  );

  // The current verseNum is still needed when constructing the load input
  // (every backend method takes a `currentReference`). Read it through a ref
  // inside each effect so the effect's dep array stays clean.
  const scrRefRef = useRef(scrRef);
  useEffect(() => {
    scrRefRef.current = scrRef;
  }, [scrRef]);

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

    // Read the live scrRef through the ref so the effect's dep array can stay
    // keyed on `scopeKeyedRefKey` (PT9-faithful) rather than scrRef.verseNum.
    const currentRef = scrRefRef.current;

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
        chapterNum: currentRef.chapterNum,
        verseNum: currentRef.verseNum,
      },
      scope: marbleScopeToBackend(scope),
      filter,
      showTranslations,
      glossLanguage,
      resourceId,
    };

    if (!erProxy) {
      setDictionaryItems([]);
      setDictionaryActiveDictionary(isOldTestamentBook(bookNum) ? 'SDBH' : 'SDBG');
      return () => {
        cancelled = true;
      };
    }

    setDictionaryIsLoading(true);
    (async () => {
      try {
        const result = await erProxy.loadDictionary(input);
        if (cancelled) return;

        const mapped: DictionaryDisplayItemData[] = result.items.map((it) => ({
          tokenId: it.tokenId,
          // GAP-021 fix: pass the lexicon entry key (lemma) through so a later
          // readDictionaryEntry call can resolve to the right entry. Previously
          // dropped from the mapping, which made the lookup fall back to tokenId
          // and the C# service returned "Lexicon entry not found".
          entryId: it.entryId,
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
  }, [erProxy, resourceId, bookNum, scopeKeyedRefKey, scope, filteredTokenId, showTranslations]);

  // Effect: load entry detail (senses + presentation) whenever the user selects a row.
  useEffect(() => {
    let cancelled = false;
    if (!dictionarySelectedTokenId) return () => {};
    const targetItem = dictionaryItems.find((i) => i.tokenId === dictionarySelectedTokenId);
    if (!targetItem) return () => {};
    // If senses already loaded for this token, no-op.
    if (targetItem.senses && targetItem.senses.length > 0) return () => {};
    if (!erProxy)
      return () => {
        cancelled = true;
      };

    (async () => {
      try {
        const dto = await erProxy.readDictionaryEntry({
          // GAP-021 fix: use the lemma from the display item, not the numeric
          // token id. The C# DictionaryService keys entries by NFD-normalized
          // lemma; passing tokenId here returned "Lexicon entry not found".
          entryId: targetItem.entryId,
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
    erProxy,
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

    // Read the live scrRef through the ref so the effect's dep array can stay
    // keyed on `scopeKeyedRefKey` (PT9-faithful) rather than scrRef.verseNum.
    const currentRef = scrRefRef.current;

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
        chapterNum: currentRef.chapterNum,
        verseNum: currentRef.verseNum,
      },
      scope: marbleScopeToBackend(scope),
      filter,
      userLanguage: glossLanguage,
      resourceId,
    };

    if (!erProxy) {
      setEncyclopediaItems([]);
      return () => {
        cancelled = true;
      };
    }

    setEncyclopediaIsLoading(true);
    (async () => {
      try {
        const result = await erProxy.loadEncyclopedia(input);
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
    erProxy,
    resourceId,
    bookNum,
    scopeKeyedRefKey,
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
    if (!erProxy)
      return () => {
        cancelled = true;
      };

    (async () => {
      try {
        const dto = await erProxy.readArticle({
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
  }, [
    erProxy,
    encyclopediaSelectedTokenId,
    encyclopediaItems,
    encyclopediaArticleDataMap,
    resourceId,
  ]);

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

  // FN-020(c) - dictionary auto-open. When the user clicks a word in the scripture pane (or any
  // other source that sets filteredTokenId), select the matching dictionary row so the detail
  // panel opens automatically. Sebastian's round-2 ask: "A word filter applied to the list should
  // filter the list by the selected word and open its details." Auto-selecting the row is the
  // observable "open its details" behavior.
  useEffect(() => {
    if (!filteredTokenId) return;
    const match = dictionaryItems.find((i) => i.tokenId === filteredTokenId);
    if (match && dictionarySelectedTokenId !== match.tokenId) {
      setDictionarySelectedTokenId(match.tokenId);
    }
  }, [filteredTokenId, dictionaryItems, dictionarySelectedTokenId, setDictionarySelectedTokenId]);

  // ---------------------------------------------------------------------------
  // SemanticDomainViewer wiring (UI-PKG-007)
  // ---------------------------------------------------------------------------
  // SDV opens via two paths (FN-021 + cold-entry):
  //   (a) filtered-list mode  - click on a `Domain:` link in the dictionary tab. We receive the
  //       full DomainLink payload (id, label, domainPath, dictionaryId) and open the dialog
  //       with the breadcrumb resolved to that path.
  //   (b) tree-overlay mode   - click "Browse semantic domains" in the dictionary tab header.
  //       We open with no preselected path; the SemanticDomainViewer falls back to the first
  //       top-level domain so the breadcrumb popovers are usable from root.
  //
  // BHV-456 distinguishes:
  //   - `displaycat` - breadcrumb-driven domain change. Re-renders the tree without closing
  //     (handled by `handleSDVDomainChange` setting `sdvDomainPath` only).
  //   - `displaydomain` - filtered-entry click. Closes SDV and routes to the dictionary entry
  //     by setting `filteredTokenId` (parent flow re-uses the existing FN-020 propagation).
  //
  // Backend status [Forward note]: the C# `EnhancedResourceFactory` does not yet expose a
  // dedicated "load semantic domain hierarchy" method - the tree must be derived from data we
  // already have. We assemble it on the fly from the DomainLinks emitted by the dictionary
  // presenter for whichever entries are currently loaded. This keeps SDV functional with the
  // current backend; the breadcrumb popovers expand to show only the branches we have observed
  // (a real tree-load API is the next backend task: see strategic-plan-ui.md UI-PKG-007 PAPI
  // integration row + ui-spec-semantic-domain-viewer.md). The filtered-entries listbox uses
  // the same `loadDictionary` PAPI call already used by the dictionary tab, then narrows on
  // the focused domain locally.

  const [sdvOpen, setSdvOpen] = useState(false);
  const [sdvDomainPath, setSdvDomainPath] = useState<SemanticDomain[] | undefined>(undefined);
  const [sdvDictionaryId, setSdvDictionaryId] = useState<'SDBH' | 'SDBG' | undefined>(undefined);
  const [sdvFilteredEntries, setSdvFilteredEntries] = useState<SemanticDomainFilteredItem[]>([]);
  const [sdvIsLoading, setSdvIsLoading] = useState(false);
  /**
   * Map of `dictionaryId -> domainId -> SemanticDomain`. Populated lazily as DomainLinks come in
   * from the presenter. Used to (a) build the `allDomains` tree forwarded to SDV and (b) resolve a
   * `domainPath` (slash-delimited) into the full ancestor chain when SDV opens in filtered-list
   * mode. Path strings come straight from `DomainLink.domainPath`; the catalog is a flat lookup.
   */
  const [sdvDomainCatalog, setSdvDomainCatalog] = useState<{
    SDBH: Map<string, { id: string; label: string; parentId: string | undefined }>;
    SDBG: Map<string, { id: string; label: string; parentId: string | undefined }>;
  }>({ SDBH: new Map(), SDBG: new Map() });

  /**
   * Folds the DomainLinks from a presented entry into the catalog. Each link contributes its leaf
   * node and (best-effort) its ancestor chain via the slash-delimited `domainPath`. We synthesize
   * ancestor labels from the last `.`-segment of each path piece (e.g. the path `5/5.1/5.1.1`
   * produces labels `5`, `5.1`, `5.1.1`); the leaf's real label always wins for its own slot. This
   * keeps the SDV breadcrumb tree usable even before the backend exposes a full hierarchy load.
   */
  const ingestDomainsIntoCatalog = useCallback(
    (links: { id: string; label: string; domainPath: string; dictionaryId: 'SDBH' | 'SDBG' }[]) => {
      if (links.length === 0) return;
      setSdvDomainCatalog((prev) => {
        const next = {
          SDBH: new Map(prev.SDBH),
          SDBG: new Map(prev.SDBG),
        };
        links.forEach((link) => {
          const dictMap = next[link.dictionaryId];
          // Path may be like "5/5.1/5.1.1" - walk segments, register each as id/label with the
          // immediate predecessor as parent.
          const parts = link.domainPath.split('/').filter((p) => p.length > 0);
          let parentId: string | undefined;
          parts.forEach((part, i) => {
            const isLeaf = i === parts.length - 1;
            const id = part;
            const label = isLeaf ? link.label : (dictMap.get(id)?.label ?? part);
            const existing = dictMap.get(id);
            // Only overwrite when the new entry adds parent info or upgrades the leaf label.
            if (
              !existing ||
              (isLeaf && existing.label !== link.label) ||
              (existing.parentId === undefined && parentId !== undefined)
            ) {
              dictMap.set(id, { id, label, parentId });
            }
            parentId = id;
          });
        });
        return next;
      });
    },
    [],
  );

  /**
   * Build a SemanticDomain[] tree (root nodes with nested `children`) from the flat catalog for the
   * active SDV dictionary. Roots are catalog entries with `parentId === undefined`; the recursion
   * follows `parentId -> children` chains. Returns an empty array when the catalog has not seen any
   * links for that dictionary yet.
   */
  const sdvAllDomains = useMemo<SemanticDomain[]>(() => {
    if (!sdvDictionaryId) return [];
    const flat = sdvDomainCatalog[sdvDictionaryId];
    if (flat.size === 0) return [];

    // Index children by parentId for one-shot traversal.
    const childrenByParent = new Map<string | undefined, { id: string; label: string }[]>();
    flat.forEach((entry) => {
      const arr = childrenByParent.get(entry.parentId) ?? [];
      arr.push({ id: entry.id, label: entry.label });
      childrenByParent.set(entry.parentId, arr);
    });

    const buildNode = (id: string, label: string): SemanticDomain => {
      const kids = childrenByParent.get(id) ?? [];
      return {
        id,
        label,
        children: kids
          .slice()
          .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
          .map((c) => buildNode(c.id, c.label)),
      };
    };

    return (childrenByParent.get(undefined) ?? [])
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
      .map((root) => buildNode(root.id, root.label));
  }, [sdvDictionaryId, sdvDomainCatalog]);

  /**
   * Resolve a slash-delimited DomainLink.domainPath into the SemanticDomain[] ancestor chain rooted
   * at a top-level node. Returns undefined when the path is empty or any segment is missing from
   * the catalog (caller falls back to cold-entry / first-root behaviour).
   */
  const resolveDomainPath = useCallback(
    (dictionaryId: 'SDBH' | 'SDBG', pathString: string): SemanticDomain[] | undefined => {
      const flat = sdvDomainCatalog[dictionaryId];
      const segments = pathString.split('/').filter((p) => p.length > 0);
      if (segments.length === 0) return undefined;
      const chain: SemanticDomain[] = [];
      const allFound = segments.every((segment) => {
        const entry = flat.get(segment);
        if (!entry) return false;
        chain.push({ id: entry.id, label: entry.label, children: [] });
        return true;
      });
      return allFound ? chain : undefined;
    },
    [sdvDomainCatalog],
  );

  /**
   * Filtered-list entry handler (FN-021). Open SDV pre-positioned at the clicked DomainLink.
   * `domains` carries the full {id, label, domainPath, dictionaryId} payload - we resolve the path
   * against the catalog (the link itself was just ingested before the click fired) and fall back to
   * a single-segment path when ancestor lookup fails (transient state on first click before catalog
   * population).
   */
  const handleSenseDomainClick = useCallback(
    (domain: DictionarySenseDomain) => {
      if (!domain.dictionaryId || !domain.domainPath) return;
      ingestDomainsIntoCatalog([
        {
          id: domain.id,
          label: domain.label,
          domainPath: domain.domainPath,
          dictionaryId: domain.dictionaryId,
        },
      ]);
      setSdvDictionaryId(domain.dictionaryId);
      const resolved = resolveDomainPath(domain.dictionaryId, domain.domainPath);
      // If catalog lookup fails (race between ingest + read), fall back to a single-segment
      // path containing just the leaf so the dialog still opens at a sensible breadcrumb.
      setSdvDomainPath(resolved ?? [{ id: domain.id, label: domain.label, children: [] }]);
      setSdvOpen(true);
    },
    [ingestDomainsIntoCatalog, resolveDomainPath],
  );

  /**
   * Cold-entry handler. Opens SDV with no preselected domain so the component falls back to the
   * first top-level domain. We pick the dictionary that matches the current book (SDBH for OT, SDBG
   * for NT/DC) so the user sees the relevant tree.
   */
  const handleBrowseSemanticDomains = useCallback(() => {
    setSdvDictionaryId(isOldTestamentBook(bookNum) ? 'SDBH' : 'SDBG');
    setSdvDomainPath(undefined);
    setSdvOpen(true);
  }, [bookNum]);

  /**
   * Breadcrumb-driven domain change (BHV-456 displaycat). Updates the path so the filtered list
   *
   * - Breadcrumbs re-render; does NOT close the dialog.
   */
  const handleSDVDomainChange = useCallback((newPath: SemanticDomain[]) => {
    setSdvDomainPath(newPath);
  }, []);

  /**
   * Open-state change. When the dialog closes (X / Esc / click-outside) clear the focused domain so
   * the next open with the same path doesn't see stale state.
   */
  const handleSDVOpenChange = useCallback((nextOpen: boolean) => {
    setSdvOpen(nextOpen);
    if (!nextOpen) {
      setSdvDomainPath(undefined);
      setSdvDictionaryId(undefined);
      setSdvFilteredEntries([]);
    }
  }, []);

  /**
   * Filtered-entry click (BHV-456 displaydomain). Closes SDV, routes to the dictionary entry by
   * setting `filteredTokenId` (the existing FN-020 propagation surfaces it in the dictionary tab
   * and scripture pane).
   */
  const handleSDVEntryClick = useCallback(
    (entry: DictionaryDisplayItemData) => {
      setSdvOpen(false);
      setSdvDomainPath(undefined);
      setSdvDictionaryId(undefined);
      setSdvFilteredEntries([]);
      setFilteredTokenId(entry.tokenId);
      setDictionarySelectedTokenId(entry.tokenId);
      // Make sure the dictionary tab is showing so the user sees the routed entry.
      setActiveTab('dictionary');
    },
    [setActiveTab, setDictionarySelectedTokenId, setFilteredTokenId],
  );

  // Effect: whenever the dictionary tab loads new senses, fold their DomainLinks into the
  // catalog so SDV's tree grows organically as the user explores entries. This is the only
  // way to populate the catalog today (no dedicated tree-load PAPI yet).
  useEffect(() => {
    const links: {
      id: string;
      label: string;
      domainPath: string;
      dictionaryId: 'SDBH' | 'SDBG';
    }[] = [];
    dictionaryItems.forEach((item) => {
      (item.senses ?? []).forEach((sense) => {
        (sense.domains ?? []).forEach((domain) => {
          if (domain.domainPath !== undefined && domain.dictionaryId !== undefined) {
            links.push({
              id: domain.id,
              label: domain.label,
              domainPath: domain.domainPath,
              dictionaryId: domain.dictionaryId,
            });
          }
        });
      });
    });
    if (links.length > 0) ingestDomainsIntoCatalog(links);
  }, [dictionaryItems, ingestDomainsIntoCatalog]);

  // Effect: when SDV is open with a focused domain, fetch the dictionary entries belonging to
  // it. We reuse `loadDictionary` (the same PAPI command the dictionary tab uses) and narrow
  // the result locally to entries whose senses carry a domain matching the focused
  // domainPath. Without a dedicated `loadDomainEntries` backend method this is the closest we
  // can get with current data; it surfaces every entry currently loaded for the active scope
  // that has at least one sense in the focused domain.
  //
  // Each entry must also have its sense data hydrated (lazy `readDictionaryEntry`); we trigger
  // that opportunistically by reading senses already on the row. Entries without senses loaded
  // yet are simply not included until the user opens them in the regular dictionary tab.
  useEffect(() => {
    if (!sdvOpen) {
      return;
    }
    // Cold-entry / no path => no filtered list yet; SDV's component falls back to the first
    // top-level domain visually but the listbox is empty until the user navigates.
    if (!sdvDomainPath || sdvDomainPath.length === 0) {
      setSdvFilteredEntries([]);
      setSdvIsLoading(false);
      return;
    }
    setSdvIsLoading(true);
    // Use the focused domain's leaf id as the match key; an entry "belongs to" the domain if
    // any of its loaded senses carry a domain whose id (or domainPath ending) matches.
    const focusedLeaf = sdvDomainPath[sdvDomainPath.length - 1];
    const focusedLeafId = focusedLeaf.id;
    const matched: SemanticDomainFilteredItem[] = [];
    dictionaryItems.forEach((item) => {
      const senses = item.senses ?? [];
      const hit = senses.some((sense) =>
        (sense.domains ?? []).some(
          (d) =>
            d.id === focusedLeafId ||
            (d.domainPath !== undefined && d.domainPath.split('/').includes(focusedLeafId)),
        ),
      );
      if (hit) {
        matched.push({
          id: item.tokenId,
          primaryText: item.sourceText,
          sourceLanguageText: item.sourceText,
          transliteration: item.translit,
          ...item,
        });
      }
    });
    setSdvFilteredEntries(matched);
    setSdvIsLoading(false);
  }, [sdvOpen, sdvDomainPath, dictionaryItems]);

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

    // Read the live scrRef through the ref so the effect's dep array can stay
    // keyed on `scopeKeyedRefKey` (PT9-faithful) rather than scrRef.verseNum.
    const currentRef = scrRefRef.current;

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
        chapterNum: currentRef.chapterNum,
        verseNum: currentRef.verseNum,
      },
      scope: marbleScopeToBackend(scope),
      filter,
      tabType: 'Images',
      userLanguage: glossLanguage,
      resourceId,
    };

    if (!erProxy) {
      setMediaImagesItems([]);
      setMediaImagesLoaded(true);
      return () => {
        cancelled = true;
      };
    }

    setMediaImagesIsLoading(true);
    setMediaImagesLoaded(false);
    (async () => {
      try {
        const result = await erProxy.loadMedia(input);
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
    erProxy,
    mediaImagesEverActivated,
    resourceId,
    bookNum,
    scopeKeyedRefKey,
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

    // Read the live scrRef through the ref so the effect's dep array can stay
    // keyed on `scopeKeyedRefKey` (PT9-faithful) rather than scrRef.verseNum.
    const currentRef = scrRefRef.current;

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
        chapterNum: currentRef.chapterNum,
        verseNum: currentRef.verseNum,
      },
      scope: marbleScopeToBackend(scope),
      filter,
      tabType: 'Maps',
      userLanguage: glossLanguage,
      resourceId,
    };

    if (!erProxy) {
      setMediaMapsItems([]);
      setMediaMapsLoaded(true);
      return () => {
        cancelled = true;
      };
    }

    setMediaMapsIsLoading(true);
    setMediaMapsLoaded(false);
    (async () => {
      try {
        const result = await erProxy.loadMedia(input);
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
    erProxy,
    mediaMapsEverActivated,
    resourceId,
    bookNum,
    scopeKeyedRefKey,
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
    if (!erProxy)
      return () => {
        cancelled = true;
      };
    (async () => {
      try {
        const dto = await erProxy.readArticle({
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
  }, [erProxy, activeArticleId, resourceId]);

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

  // FN-020 / BHV-308: context-menu placeholder. The real context-menu wiring
  // will populate this callback in a follow-up; passing a stable useCallback
  // reference now prevents the EnhancedScripturePane annotation effect from
  // re-running on every parent re-render. Typed via NonNullable<...> so we can
  // omit the (currently unused) parameter names without tripping
  // @typescript-eslint/no-unused-vars - mirrors the NOOP_TOKEN_CONTEXT_MENU
  // pattern from scripture-pane.component.tsx.
  const handleTokenContextMenu = useCallback<
    NonNullable<EnhancedResourceWebViewProps['onTokenContextMenu']>
  >(() => {
    // Intentionally empty until BHV-308 lands the context menu.
  }, []);

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

  // UI-PKG-008: MarbleGuide ("Getting started in Enhanced Resources") wiring.
  //
  // Visibility is local to this web view — info-icon click toggles the dialog directly, and the
  // first ER open per app session asks the backend `requestAutoShowGuide` command whether it
  // should auto-show. The backend owns the cross-tab session-flag (so opening a second ER tab in
  // the same session does NOT re-trigger the guide — TS-067).
  //
  // Persistence: `useSetting('platformEnhancedResources.showMarbleGuide')` reads the boolean
  // (default true). The "Don't show this again" checkbox starts at `!showMarbleGuide` so a
  // previously-suppressed user sees it pre-checked when they reopen via info-icon. On Close, the
  // wiring layer writes `showMarbleGuide = !neverShowAgain`, then closes the dialog.
  const [showMarbleGuidePossiblyError, setShowMarbleGuide] = useSetting(
    'platformEnhancedResources.showMarbleGuide',
    true,
  );
  const showMarbleGuide = useMemo(() => {
    if (isPlatformError(showMarbleGuidePossiblyError)) {
      logger.warn(
        'Failed to load setting platformEnhancedResources.showMarbleGuide; treating as true',
        showMarbleGuidePossiblyError,
      );
      return true;
    }
    return showMarbleGuidePossiblyError;
  }, [showMarbleGuidePossiblyError]);

  const [marbleGuideOpen, setMarbleGuideOpen] = useState<boolean>(false);
  const [marbleGuideNeverShowAgain, setMarbleGuideNeverShowAgain] = useState<boolean>(false);
  // Track whether THIS web-view instance has already attempted the auto-show check, so a re-render
  // doesn't fire the command twice (the backend session flag is the cross-tab guard, but this
  // ref also prevents intra-tab duplicate dispatches before the first response returns).
  const autoShowCheckedRef = useRef<boolean>(false);

  useEffect(() => {
    if (autoShowCheckedRef.current) return;
    autoShowCheckedRef.current = true;
    (async () => {
      try {
        const shouldShow = await papi.commands.sendCommand(
          'platformEnhancedResources.requestAutoShowGuide',
        );
        if (shouldShow) {
          // Sync the checkbox to the persisted preference at open time (auto-show implies
          // showMarbleGuide===true, so the checkbox is unchecked — but we still re-derive it from
          // the current setting to be defensive in case the setting flipped between the request
          // and the response).
          setMarbleGuideNeverShowAgain(!showMarbleGuide);
          setMarbleGuideOpen(true);
        }
      } catch (err) {
        logger.info(
          `Enhanced Resources: requestAutoShowGuide command not yet available: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    })();
    // showMarbleGuide is read inside the effect as the latest value at first-mount only;
    // intentionally not a dependency because we never want to re-run the auto-show check.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FN-016: info-icon click toggles the MarbleGuide dialog locally (no PAPI round-trip needed —
  // the dialog lives inside this web view). When opening, sync the checkbox state to the current
  // persisted preference so a re-enable-from-suppression flow shows it pre-checked.
  const handleInfoClick = useCallback(() => {
    setMarbleGuideOpen((prevOpen) => {
      const nextOpen = !prevOpen;
      if (nextOpen) {
        setMarbleGuideNeverShowAgain(!showMarbleGuide);
      }
      return nextOpen;
    });
  }, [showMarbleGuide]);

  const handleMarbleGuideClose = useCallback(() => {
    const nextShowMarbleGuide = !marbleGuideNeverShowAgain;
    if (nextShowMarbleGuide !== showMarbleGuide) {
      // Fire-and-forget: setting writes return a DataProviderUpdateInstructions promise we don't
      // need to await — the inner Dialog has already closed visually by the time this resolves.
      Promise.resolve(setShowMarbleGuide(nextShowMarbleGuide)).catch((err) => {
        logger.warn(
          `Failed to persist platformEnhancedResources.showMarbleGuide: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      });
    }
    setMarbleGuideOpen(false);
  }, [marbleGuideNeverShowAgain, setShowMarbleGuide, showMarbleGuide]);

  // Compute the BCV button label - keeps display logic out of the toolbar. Falls back to the
  // saved scripture reference if Canon can't resolve the book id.
  const currentReferenceLabel = useMemo(() => {
    const bookId = scrRef.book;
    return `${bookId} ${scrRef.chapterNum}:${scrRef.verseNum}`;
  }, [scrRef.book, scrRef.chapterNum, scrRef.verseNum]);

  // GAP-002: Warning ribbon state. Until the backend exposes
  // `enhancedResources.getResourceWarnings`, ribbon visibility is derived from the locally
  // available signals (scripturePaneError implies missingBook). Dismissed flags persist across
  // window reopens via useWebViewState. Replace the constant `false` defaults with the real
  // backend subscription once `getResourceWarnings` is wired (see post-phase-3-followups.md).
  const [reviewStatusDismissed, setReviewStatusDismissed] = useWebViewState<boolean>(
    'reviewStatusDismissed',
    false,
  );
  const [copyrightDismissed, setCopyrightDismissed] = useWebViewState<boolean>(
    'copyrightDismissed',
    false,
  );
  const [updateAvailableDismissed, setUpdateAvailableDismissed] = useWebViewState<boolean>(
    'updateAvailableDismissed',
    false,
  );

  // TODO: replace these no-op `false` literals with the real backend wiring once
  // `enhancedResources.getResourceWarnings` is available. The shape mirrors RibbonStates so
  // that wiring will be a one-line swap.
  const ribbonVisibility = useMemo(
    () => ({
      missingBook: scripturePaneError !== undefined && resourceId !== undefined,
      reviewStatusVisible: false, // TODO: backend `getResourceWarnings.reviewStatusVisible`
      imageWarning: false, // TODO: backend `getResourceWarnings.imageWarning`
      copyrightVisible: false, // TODO: backend `getResourceWarnings.copyrightVisible`
      updateRequiredData: false, // TODO: backend `getResourceWarnings.updateRequiredData`
      updateAvailableVisible: false, // TODO: backend `getResourceWarnings.updateAvailableVisible`
    }),
    [scripturePaneError, resourceId],
  );

  const ribbonStates: RibbonStates = useMemo(
    () => ({
      missingBook: ribbonVisibility.missingBook,
      reviewStatus: {
        visible: ribbonVisibility.reviewStatusVisible,
        dismissed: reviewStatusDismissed,
      },
      imageWarning: ribbonVisibility.imageWarning,
      copyright: {
        visible: ribbonVisibility.copyrightVisible,
        dismissed: copyrightDismissed,
      },
      updateRequiredData: ribbonVisibility.updateRequiredData,
      updateAvailable: {
        visible: ribbonVisibility.updateAvailableVisible,
        dismissed: updateAvailableDismissed,
      },
    }),
    [ribbonVisibility, reviewStatusDismissed, copyrightDismissed, updateAvailableDismissed],
  );

  const handleDismissReviewStatus = useCallback(() => {
    setReviewStatusDismissed(true);
  }, [setReviewStatusDismissed]);
  const handleDismissCopyright = useCallback(() => {
    setCopyrightDismissed(true);
  }, [setCopyrightDismissed]);
  const handleDismissUpdateAvailable = useCallback(() => {
    setUpdateAvailableDismissed(true);
  }, [setUpdateAvailableDismissed]);
  const handleMetadataUpdate = useCallback(() => {
    // TODO: dispatch backend `enhancedResources.updateResourceMetadata` once the command exists.
    logger.info('Enhanced Resources: metadata-update action triggered (backend wiring pending)');
  }, []);

  // GAP-013: Copyright "More info..." opens the CopyrightOverlay. Both the ribbon action and
  // the view-menu "Copyright info" item route through the same setter.
  const [copyrightOverlayVisible, setCopyrightOverlayVisible] = useState<boolean>(false);
  const handleCopyrightMoreInfo = useCallback(() => {
    setCopyrightOverlayVisible(true);
  }, []);
  const handleCopyrightOverlayDismiss = useCallback(() => {
    setCopyrightOverlayVisible(false);
  }, []);

  // GAP-007: Dictionary / Encyclopedia copy + find handlers. Copy uses navigator.clipboard;
  // find sets the filteredTokenId so the scripture pane + research tabs converge.
  const handleDictionaryCopySurfaceForm = useCallback(
    (item: DictionaryDisplayItemData, variant: 'original' | 'transliteration') => {
      // Dictionary items only carry sourceText (original script) and translit. The "lemma" and
      // "surface" distinction collapses for the dictionary tab — both menu items copy the same
      // pair, with `variant` choosing original vs transliteration.
      const text = variant === 'transliteration' ? item.translit : item.sourceText;
      if (text) {
        navigator.clipboard.writeText(text).catch((err) => {
          logger.warn('Enhanced Resources: clipboard write failed', err);
        });
      }
    },
    [],
  );
  const handleDictionaryCopyLemma = useCallback(
    (item: DictionaryDisplayItemData, variant: 'original' | 'transliteration') => {
      const text = variant === 'transliteration' ? item.translit : item.sourceText;
      if (text) {
        navigator.clipboard.writeText(text).catch((err) => {
          logger.warn('Enhanced Resources: clipboard write failed', err);
        });
      }
    },
    [],
  );
  const handleDictionaryFindSense = useCallback(
    (item: DictionaryDisplayItemData) => {
      // BHV-308: "Find sense" puts that token's id into the filter so the scripture pane and
      // other research tabs all narrow to that lemma.
      setFilteredTokenId(item.tokenId);
    },
    [setFilteredTokenId],
  );
  const handleDictionaryFindLemma = useCallback(
    (item: DictionaryDisplayItemData) => {
      setFilteredTokenId(item.tokenId);
    },
    [setFilteredTokenId],
  );
  const handleDictionaryFindText = useCallback(
    (item: DictionaryDisplayItemData) => {
      setFilteredTokenId(item.tokenId);
    },
    [setFilteredTokenId],
  );
  const handleEncyclopediaCopySurfaceForm = useCallback((item: EncyclopediaDisplayItemData) => {
    const text = item.sourceText ?? '';
    if (text) {
      navigator.clipboard.writeText(text).catch((err) => {
        logger.warn('Enhanced Resources: clipboard write failed', err);
      });
    }
  }, []);
  const handleEncyclopediaCopyLemma = useCallback((item: EncyclopediaDisplayItemData) => {
    const text = item.lemma ?? '';
    if (text) {
      navigator.clipboard.writeText(text).catch((err) => {
        logger.warn('Enhanced Resources: clipboard write failed', err);
      });
    }
  }, []);

  // GAP-008: Helpfulness Yes/No + give-feedback handlers. FN-018 forward dependency: the
  // backend feedback collector does not yet exist, so we log to console for now.
  const handleDictionaryHelpfulnessAnswer = useCallback(
    (entryTokenId: string, answer: 'yes' | 'no') => {
      // FN-018 forward: dispatch real `enhancedResources.recordHelpfulnessAnswer` once shipped.
      logger.info(
        `Enhanced Resources: helpfulness=${answer} for entry=${entryTokenId} (FN-018 backend pending)`,
      );
    },
    [],
  );
  const handleDictionaryGiveFeedback = useCallback((entryTokenId: string) => {
    // FN-018 forward: open the feedback panel/dialog once FN-018 ships.
    logger.info(
      `Enhanced Resources: give-feedback clicked for entry=${entryTokenId} (FN-018 backend pending)`,
    );
  }, []);

  // GAP-012: Keyboard shortcuts. F7 toggles footnotes; Ctrl+Plus / Ctrl+Minus / Ctrl+0 adjust
  // the scripture pane zoom. Listener is attached to window so it works regardless of focus
  // within the iframe. Cleanup on unmount per BHV-451.
  // useWebViewState setters take a plain value (not React's functional updater), so we read
  // the latest state via refs to avoid stale closures inside the keydown handler.
  const showFootnotesRef = useRef(showFootnotes);
  const scripturePaneZoomRef = useRef(scripturePaneZoom);
  useEffect(() => {
    showFootnotesRef.current = showFootnotes;
  }, [showFootnotes]);
  useEffect(() => {
    scripturePaneZoomRef.current = scripturePaneZoom;
  }, [scripturePaneZoom]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // F7: toggle showFootnotes (no modifiers).
      if (
        event.key === 'F7' &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        setShowFootnotes(!showFootnotesRef.current);
        return;
      }

      // Ctrl/Cmd + Plus / Equals (zoom in), Minus (zoom out), 0 (reset).
      if (event.ctrlKey || event.metaKey) {
        if (event.key === '+' || event.key === '=') {
          event.preventDefault();
          setScripturePaneZoom(Math.min(scripturePaneZoomRef.current + 0.1, 3));
        } else if (event.key === '-' || event.key === '_') {
          event.preventDefault();
          setScripturePaneZoom(Math.max(scripturePaneZoomRef.current - 0.1, 0.5));
        } else if (event.key === '0') {
          event.preventDefault();
          setScripturePaneZoom(1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFootnotes, setScripturePaneZoom]);

  // FN-020(c): the filter input shows the actual word text (sourceText) of the clicked token, not
  // the opaque numeric token id. We look up the matching item in the lemma-keyed lists (dictionary
  // and encyclopedia). Media rows are verse-ref-keyed (per the round-2 cutoff strategy), so they
  // don't contribute to the lookup. Falls back to the bare filteredTokenId if no match is found
  // yet (the data may still be loading).
  const searchValue = useMemo(() => {
    if (!filteredTokenId) return '';
    const dictMatch = dictionaryItems.find((i) => i.tokenId === filteredTokenId);
    if (dictMatch) return dictMatch.sourceText;
    const encMatch = encyclopediaItems.find((i) => i.tokenId === filteredTokenId);
    if (encMatch) return encMatch.sourceText;
    return filteredTokenId;
  }, [filteredTokenId, dictionaryItems, encyclopediaItems]);

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
    // GAP-013: hamburger "Copyright info" menu item also opens the overlay, alongside the
    // ribbon "More info..." action.
    onShowCopyrightInfo: handleCopyrightMoreInfo,
    onZoomIn: () => setScripturePaneZoom(Math.min(scripturePaneZoom + 0.1, 3)),
    onZoomOut: () => setScripturePaneZoom(Math.max(scripturePaneZoom - 0.1, 0.5)),
    onZoomReset: () => setScripturePaneZoom(1),
  };

  return (
    <EnhancedResourceWebView
      resourceName={resourceId}
      usj={usj}
      annotations={annotations}
      scrRef={scrRef}
      // FN-015: surface the real BookChapterControl in the toolbar via setScrRef from
      // useWebViewScrollGroupScrRef. Picking a new ref drives the scroll-group, which in turn
      // updates sibling editor / scripture panes.
      onScrRefChange={setScrRef}
      filteredTokenId={filteredTokenId}
      hebrewDisplayMode={hebrewDisplayMode}
      greekDisplayMode={greekDisplayMode}
      showFootnotes={showFootnotes}
      scripturePaneZoom={scripturePaneZoom}
      scripturePaneError={scripturePaneError}
      onTokenClick={handleTokenClick}
      onTokenContextMenu={handleTokenContextMenu}
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
      // FN-020(b): pass the active resource id as the short-name so the hamburger menu's
      // "Show translations" entry renders as "Show translations ({resourceShortName})". GAP-019
      // (resolveResourceInfo) will eventually let us substitute a friendlier display name; for
      // now resourceId itself is the shortest stable label the wiring layer has.
      resourceShortName={resourceId}
      viewMenu={viewMenu}
      viewMenuHandlers={viewMenuHandlers}
      ribbons={ribbonStates}
      onDismissReviewStatus={handleDismissReviewStatus}
      onDismissCopyright={handleDismissCopyright}
      onDismissUpdateAvailable={handleDismissUpdateAvailable}
      onCopyrightMoreInfo={handleCopyrightMoreInfo}
      onMetadataUpdate={handleMetadataUpdate}
      copyrightOverlayVisible={copyrightOverlayVisible}
      onCopyrightOverlayDismiss={handleCopyrightOverlayDismiss}
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
      onDictionaryHelpfulnessAnswer={handleDictionaryHelpfulnessAnswer}
      onDictionaryGiveFeedback={handleDictionaryGiveFeedback}
      onDictionaryCopySurfaceForm={handleDictionaryCopySurfaceForm}
      onDictionaryCopyLemma={handleDictionaryCopyLemma}
      onDictionaryFindSense={handleDictionaryFindSense}
      onDictionaryFindLemma={handleDictionaryFindLemma}
      onDictionaryFindText={handleDictionaryFindText}
      onDictionarySenseDomainClick={handleSenseDomainClick}
      onBrowseSemanticDomainsClick={handleBrowseSemanticDomains}
      semanticDomainViewerOpen={sdvOpen}
      semanticDomainViewerPath={sdvDomainPath}
      semanticDomainViewerAllDomains={sdvAllDomains}
      semanticDomainViewerFilteredEntries={sdvFilteredEntries}
      semanticDomainViewerIsLoading={sdvIsLoading}
      onSemanticDomainViewerOpenChange={handleSDVOpenChange}
      onSemanticDomainViewerDomainChange={handleSDVDomainChange}
      onSemanticDomainViewerEntryClick={handleSDVEntryClick}
      encyclopediaItems={encyclopediaItems}
      encyclopediaSelectedTokenId={encyclopediaSelectedTokenId}
      encyclopediaIsLoading={encyclopediaIsLoading}
      encyclopediaEmptyState={encyclopediaEmptyState}
      encyclopediaFilterWord={filteredTokenId}
      encyclopediaScopeLabel={dictionaryScopeLabel}
      encyclopediaArticleDataMap={encyclopediaArticleDataMap}
      onEncyclopediaSelectionChange={setEncyclopediaSelectedTokenId}
      onEncyclopediaSourceTextClick={handleEncyclopediaSourceTextClick}
      onEncyclopediaCopySurfaceForm={handleEncyclopediaCopySurfaceForm}
      onEncyclopediaCopyLemma={handleEncyclopediaCopyLemma}
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
      marbleGuideOpen={marbleGuideOpen}
      marbleGuideNeverShowAgain={marbleGuideNeverShowAgain}
      onMarbleGuideClose={handleMarbleGuideClose}
      onMarbleGuideNeverShowAgainChange={setMarbleGuideNeverShowAgain}
      localizedStringsWithLoadingState={[stringsForShell, isLoadingStrings]}
    />
  );
};
