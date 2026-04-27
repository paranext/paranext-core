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

/** Object containing all keys used for localization in this component. */
export const ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS = Object.freeze([
  '%enhancedResources_shell_title%',
  '%enhancedResources_shell_emptyTitle%',
  '%enhancedResources_shell_emptyDescription%',
  '%enhancedResources_shell_tabPlaceholder%',
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
  localizedStringsWithLoadingState = [{}, false],
}: EnhancedResourceWebViewProps) {
  const [stringsBag, isLoadingStrings] = localizedStringsWithLoadingState;
  const getString = (key: EnhancedResourceWebViewLocalizedStringKey) => stringsBag[key] ?? key;
  const tabPlaceholder = String(getString('%enhancedResources_shell_tabPlaceholder%'));
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
                {(['dictionary', 'encyclopedia', 'media', 'maps'] as const).map((tab) => (
                  <TabsContent
                    key={tab}
                    value={tab}
                    className="tw-flex tw-flex-1 tw-flex-col tw-gap-2 tw-p-3 data-[state=inactive]:tw-hidden"
                  >
                    {/* Per A11Y-002, the tab body is a Skeleton placeholder until UI-PKG-002+ build the real tabs */}
                    <span className="tw-text-xs tw-italic tw-text-muted-foreground">
                      {tabPlaceholder.replace('{tab}', tab)}
                    </span>
                    <Skeleton className="tw-h-12 tw-w-full" />
                    <Skeleton className="tw-h-12 tw-w-full" />
                    <Skeleton className="tw-h-12 tw-w-full" />
                  </TabsContent>
                ))}
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}

export default EnhancedResourceWebView;
