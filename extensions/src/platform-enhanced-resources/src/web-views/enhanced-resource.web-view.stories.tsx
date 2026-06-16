import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useCallback, useMemo, useState } from 'react';
import type { SemanticDomain } from 'platform-bible-react/internal';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  MOCK_FILTERED_TOKEN_ID,
  MOCK_RIBBONS_ALL,
  MOCK_RIBBONS_NONE,
  MOCK_COPYRIGHT_TEXT,
} from '../data/marble-form.story-data';
import { ENHANCED_SCRIPTURE_PANE_STRING_KEYS } from '../components/scripture-pane/scripture-pane.component';
import {
  TOOLBAR_STRING_KEYS,
  type HighlightMode,
  type MarbleScope,
  type ResearchTab,
  type ScriptDisplayMode,
  type ViewMenuState,
} from '../components/toolbar/toolbar.component';
import { WARNING_RIBBONS_STRING_KEYS } from '../components/warning-ribbons/warning-ribbons.component';
import { COPYRIGHT_OVERLAY_STRING_KEYS } from '../components/warning-ribbons/copyright-overlay.component';
import { DICTIONARY_TAB_STRING_KEYS } from '../components/dictionary-tab/dictionary-tab.component';
import {
  MOCK_DICT_ENTRIES_HEBREW,
  MOCK_DICT_ENTRY_ELOHIM,
} from '../data/dictionary-tab.story-data';
import { ENCYCLOPEDIA_TAB_STRING_KEYS } from '../components/encyclopedia-tab/encyclopedia-tab.component';
import {
  MOCK_ARTICLE_DATA_MAP,
  MOCK_ENC_ENTRIES_HEBREW,
  mockImageUrlResolver,
} from '../data/encyclopedia-tab.story-data';
import { MEDIA_IMAGES_TAB_STRING_KEYS } from '../components/media-tab/media-images-tab.component';
import { MEDIA_MAPS_TAB_STRING_KEYS } from '../components/media-tab/media-maps-tab.component';
import {
  MEDIA_VIEWER_STRING_KEYS,
  type MediaViewerItem,
} from '../components/media-viewer/media-viewer.component';
import {
  MOCK_MEDIA_IMAGES,
  MOCK_MEDIA_MAPS,
  mockMediaThumbnailUrlResolver,
} from '../data/media-tab.story-data';
import { mockMediaViewerImageUrlResolver } from '../data/media-viewer.story-data';
import {
  SemanticDomainViewer,
  SEMANTIC_DOMAIN_VIEWER_STRING_KEYS,
  type SemanticDomainFilteredItem,
} from '../components/semantic-domain-viewer/semantic-domain-viewer.component';
import {
  ArticleViewer,
  ARTICLE_VIEWER_STRING_KEYS,
} from '../components/article-viewer/article-viewer.component';
import { MarbleGuide, MARBLE_GUIDE_STRING_KEYS } from '../components/guide/marble-guide.component';
import {
  MOCK_DICT_ENTRIES_FILTERED,
  MOCK_DOMAIN_TREE,
} from '../data/semantic-domain-viewer.story-data';
import {
  EnhancedResourceWebView,
  ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS,
} from './enhanced-resource.web-view';

const allKeys = [
  ...ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS,
  ...ENHANCED_SCRIPTURE_PANE_STRING_KEYS,
  ...TOOLBAR_STRING_KEYS,
  ...WARNING_RIBBONS_STRING_KEYS,
  ...COPYRIGHT_OVERLAY_STRING_KEYS,
  ...DICTIONARY_TAB_STRING_KEYS,
  ...ENCYCLOPEDIA_TAB_STRING_KEYS,
  ...MEDIA_IMAGES_TAB_STRING_KEYS,
  ...MEDIA_MAPS_TAB_STRING_KEYS,
  ...MEDIA_VIEWER_STRING_KEYS,
  ...SEMANTIC_DOMAIN_VIEWER_STRING_KEYS,
  ...ARTICLE_VIEWER_STRING_KEYS,
  ...MARBLE_GUIDE_STRING_KEYS,
];
const localizedStrings = getLocalizedStrings(allKeys);

/**
 * Minimal mock USJ document used by stories so the EnhancedScripturePane has _something_ to render.
 * The annotations array is empty - the stories don't exercise marble overlays directly; the
 * dictionary / encyclopedia tabs and ribbons are the focus of the shell stories. Component-level
 * overlay behavior is covered by the EnhancedScripturePane's own Storybook + Vitest suites.
 */
const MOCK_USJ: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    {
      type: 'book',
      marker: 'id',
      code: 'GEN',
      content: [],
    },
    {
      type: 'chapter',
      marker: 'c',
      number: '1',
    },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1' },
        'In the beginning, God created the heavens and the earth.',
      ],
    },
  ],
};

/**
 * Story-only placeholder for handlers that phase-3-ui will wire to real PAPI commands or webView
 * APIs. We use `alert` (not console.log) so reviewers exercising the Storybook flow get visible
 * confirmation that the design-layer handler fired, without needing the dev tools panel.
 */
// eslint-disable-next-line no-alert
const placeholderAction = (message: string) => alert(message);

/**
 * Story-only adapter from the dictionary mock entries to the SemanticDomainFilteredItem shape that
 * `SemanticDomainViewer` consumes. Production wiring will swap in the real backend filter; this
 * passes the entries through unchanged so the dialog has rows to render.
 *
 * [Revised: 2026-04-29 Themes 13/15] The dictionary tab no longer surfaces a per-entry
 * semantic-domain click path (semantic domains are sense-level only, and currently not
 * click-routed). The SemanticDomainViewer story can still be exercised via its own Default story
 * (`semantic-domain-viewer.stories.tsx`); this web-view shell story leaves the SDV mounted but
 * dormant unless it is opened from another path.
 */
function buildFilteredEntries(): SemanticDomainFilteredItem[] {
  return MOCK_DICT_ENTRIES_FILTERED;
}

/** Build a MediaViewerItem from a media-tab row for the shell-level MediaViewer Dialog. */
function buildMediaViewerItem(itemId: string): MediaViewerItem | undefined {
  const all = [...MOCK_MEDIA_IMAGES, ...MOCK_MEDIA_MAPS];
  const row = all.find((entry) => entry.imageId === itemId);
  if (!row) return undefined;
  return {
    imageId: row.imageId,
    title: row.title,
    mediaType: row.mediaType,
    caption: row.referenceLabel,
  };
}

const meta: Meta<typeof EnhancedResourceWebView> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EnhancedResourceWebView',
  component: EnhancedResourceWebView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EnhancedResourceWebView>;

/**
 * [Revised: 2026-04-29] Themes 3 + 4 — `Default` is the fully-interactive de-facto reference
 * implementation of the spec's downstream state model. Wires every control with real components and
 * sample data:
 *
 * - Hamburger view-menu (`DropdownMenu` from platform-bible-react) with the 13 menu items from
 *   `ui-spec-marble-form.md` lines 66-79: Show footnotes / Show translations / Hebrew script radios
 *   / Greek script radios / Copyright info / Find / Close / Zoom in/out/reset. Each item flips
 *   story state.
 * - Real `ScrollGroupSelector` driving scroll-group state.
 * - Info-icon button toggles the real `MarbleGuide` Dialog open/closed via `useState`.
 * - "All research terms" highlight toggle drives `highlightMode` state (the visual badge tint).
 * - Tab clicks (Dictionary/Encyclopedia/Media/Maps) really swap the lower-panel content using the
 *   real `DictionaryTab` / `EncyclopediaTab` / `MediaImagesTab` / `MediaMapsTab` components with
 *   sample data — no static screenshots, no `<div>` placeholders.
 * - Filter input (Theme 9): a "Simulate word click" button populates `searchValue` so the read-only
 *   Input becomes visible; the X button clears it and re-hides it. Toggle `hasMatches` to exercise
 *   the green vs orange tint.
 * - Dictionary entry → semantic-domain link opens `SemanticDomainViewer` Dialog; encyclopedia entry →
 *   article link opens `ArticleViewer` Dialog; Media maximize opens `MediaViewer` Dialog (all real,
 *   controlled, dismissable).
 * - Copyright info from the hamburger menu opens the controlled `CopyrightOverlay` Dialog.
 *
 * NOT wired here (forwarded to phase-3-ui — see UI-PKG-001 forward-notes):
 *
 * - FN-015 — BCV control via `useWebViewScrollGroupScrRef` (BCV button is a labeled placeholder).
 * - FN-016 — "all research terms" highlight + info-icon command/menu registration (story drives state
 *   directly; phase-3-ui contributes the menu/command and binds it).
 */
type DefaultStoryState = {
  activeTab: ResearchTab;
  scope: MarbleScope;
  hasSenseScope: boolean;
  highlightMode: HighlightMode;
  scrollGroupId: number | undefined;
  searchValue: string;
  hasMatches: boolean;
  marbleGuideOpen: boolean;
  marbleGuideNeverShowAgain: boolean;
  copyrightOverlayVisible: boolean;
  selectedDictionaryTokenId?: string;
  selectedEncyclopediaTokenId?: string;
  selectedMediaImageId?: string;
  selectedMediaMapId?: string;
  semanticDomainPath?: SemanticDomain[];
  activeArticleId?: string;
  maximizedMediaItem?: MediaViewerItem;
  viewMenu: ViewMenuState;
};

const INITIAL_STATE: DefaultStoryState = {
  activeTab: 'dictionary',
  scope: 'current-verse',
  hasSenseScope: false,
  highlightMode: 'none',
  scrollGroupId: 0,
  searchValue: '',
  hasMatches: true,
  marbleGuideOpen: false,
  marbleGuideNeverShowAgain: false,
  copyrightOverlayVisible: false,
  viewMenu: {
    showFootnotes: false,
    showTranslations: true,
    hebrewDisplayMode: 'both',
    greekDisplayMode: 'both',
  },
};

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [state, setState] = useState<DefaultStoryState>(INITIAL_STATE);
    const update = useCallback(
      (patch: Partial<DefaultStoryState>) => setState((prev) => ({ ...prev, ...patch })),
      [],
    );

    const filteredEntries = useMemo(() => buildFilteredEntries(), []);
    const articleData = state.activeArticleId
      ? MOCK_ARTICLE_DATA_MAP[state.activeArticleId]
      : undefined;

    const setHebrew = (next: ScriptDisplayMode) =>
      update({ viewMenu: { ...state.viewMenu, hebrewDisplayMode: next } });
    const setGreek = (next: ScriptDisplayMode) =>
      update({ viewMenu: { ...state.viewMenu, greekDisplayMode: next } });
    const setShowFootnotes = (next: boolean) =>
      update({ viewMenu: { ...state.viewMenu, showFootnotes: next } });
    const setShowTranslations = (next: boolean) =>
      update({ viewMenu: { ...state.viewMenu, showTranslations: next } });

    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: 8,
            right: 8,
            zIndex: 50,
            display: 'flex',
            gap: 6,
            padding: 6,
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid #ccc',
            borderRadius: 4,
            fontSize: 11,
          }}
        >
          <button
            type="button"
            onClick={() => update({ searchValue: state.searchValue ? '' : 'beˈrēšīṯ' })}
          >
            Simulate word click → {state.searchValue ? 'clear' : 'set'} filter
          </button>
          <label>
            <input
              type="checkbox"
              checked={state.hasMatches}
              onChange={(e) => update({ hasMatches: e.target.checked })}
            />{' '}
            hasMatches
          </label>
        </div>

        <EnhancedResourceWebView
          localizedStringsWithLoadingState={[localizedStrings, false]}
          resourceName="SDBH/SDBG"
          copyrightInfo={MOCK_COPYRIGHT_TEXT}
          copyrightOverlayVisible={state.copyrightOverlayVisible}
          onCopyrightOverlayDismiss={() => update({ copyrightOverlayVisible: false })}
          activeTab={state.activeTab}
          onTabChange={(activeTab) => update({ activeTab })}
          scope={state.scope}
          onScopeChange={(scopeNext) => update({ scope: scopeNext })}
          hasSenseScope={state.hasSenseScope}
          searchValue={state.searchValue}
          onSearchChange={(searchValue) => update({ searchValue })}
          hasMatches={state.hasMatches}
          highlightMode={state.highlightMode}
          onHighlightModeChange={(highlightMode) => update({ highlightMode })}
          onInfoClick={() => update({ marbleGuideOpen: true })}
          onReferenceClick={() =>
            placeholderAction(
              'Phase-3-ui wires this to the BookChapterControl driven by useWebViewScrollGroupScrRef (FN-015).',
            )
          }
          scrollGroupId={state.scrollGroupId}
          onScrollGroupChange={(next) => update({ scrollGroupId: next })}
          currentReferenceLabel="GEN 1:1"
          viewMenu={state.viewMenu}
          viewMenuHandlers={{
            onToggleShowFootnotes: setShowFootnotes,
            onToggleShowTranslations: setShowTranslations,
            onHebrewDisplayModeChange: setHebrew,
            onGreekDisplayModeChange: setGreek,
            onShowCopyrightInfo: () => update({ copyrightOverlayVisible: true }),
            onFindInResource: () =>
              placeholderAction('Phase-3-ui wires this to FindReplaceForm in ER mode.'),
            onCloseWindow: () =>
              placeholderAction('Phase-3-ui wires this to webView.close() (Ctrl+F4 in PT9).'),
            onZoomIn: () => placeholderAction('Zoom in (wired in phase-3-ui).'),
            onZoomOut: () => placeholderAction('Zoom out (wired in phase-3-ui).'),
            onZoomReset: () => placeholderAction('Zoom reset (wired in phase-3-ui).'),
          }}
          ribbons={MOCK_RIBBONS_NONE}
          usj={MOCK_USJ}
          annotations={[]}
          filteredTokenId={undefined}
          showFootnotes={state.viewMenu.showFootnotes}
          hebrewDisplayMode={state.viewMenu.hebrewDisplayMode}
          greekDisplayMode={state.viewMenu.greekDisplayMode}
          dictionaryItems={MOCK_DICT_ENTRIES_HEBREW}
          dictionaryActiveDictionary="SDBH"
          dictionaryScopeLabel="current verse"
          dictionarySelectedTokenId={state.selectedDictionaryTokenId}
          onDictionarySelectionChange={(selectedDictionaryTokenId) =>
            update({ selectedDictionaryTokenId })
          }
          onDictionaryFindSense={(entry) => {
            // Storybook-only diagnostic: production routes to MarbleForm filtered by sense.
            // eslint-disable-next-line no-console
            console.log('[story] dictionary find-sense', entry.sourceText);
          }}
          onDictionaryFindLemma={(entry) => {
            // Storybook-only diagnostic: production routes to MarbleForm filtered by lemma.
            // eslint-disable-next-line no-console
            console.log('[story] dictionary find-lemma', entry.sourceText);
          }}
          encyclopediaItems={MOCK_ENC_ENTRIES_HEBREW}
          encyclopediaScopeLabel="current verse"
          encyclopediaArticleDataMap={MOCK_ARTICLE_DATA_MAP}
          encyclopediaSelectedTokenId={state.selectedEncyclopediaTokenId}
          onEncyclopediaSelectionChange={(selectedEncyclopediaTokenId) =>
            update({ selectedEncyclopediaTokenId })
          }
          mediaImagesItems={MOCK_MEDIA_IMAGES}
          mediaImagesScopeLabel="current verse"
          mediaImagesThumbnailUrlResolver={mockMediaThumbnailUrlResolver}
          mediaImagesSelectedItemId={state.selectedMediaImageId}
          onMediaImagesSelectionChange={(selectedMediaImageId) => update({ selectedMediaImageId })}
          onMediaImagesMaximize={(id) => update({ maximizedMediaItem: buildMediaViewerItem(id) })}
          mediaMapsItems={MOCK_MEDIA_MAPS}
          mediaMapsScopeLabel="current verse"
          mediaMapsThumbnailUrlResolver={mockMediaThumbnailUrlResolver}
          mediaMapsSelectedItemId={state.selectedMediaMapId}
          onMediaMapsSelectionChange={(selectedMediaMapId) => update({ selectedMediaMapId })}
          onMediaMapsMaximize={(id) => update({ maximizedMediaItem: buildMediaViewerItem(id) })}
          maximizedMediaItem={state.maximizedMediaItem}
          mediaViewerImageUrlResolver={mockMediaViewerImageUrlResolver}
          onMaximizedMediaOpenChange={(open) => !open && update({ maximizedMediaItem: undefined })}
        />
        <SemanticDomainViewer
          open={state.semanticDomainPath !== undefined}
          domainPath={state.semanticDomainPath}
          allDomains={MOCK_DOMAIN_TREE}
          filteredEntries={filteredEntries}
          onOpenChange={(open) => !open && update({ semanticDomainPath: undefined })}
          onDomainChange={(semanticDomainPath) => update({ semanticDomainPath })}
          onAllOccurrencesClick={(tokenId) => {
            // Storybook-only diagnostic: production routes to MarbleForm filtered by occurrences.
            // eslint-disable-next-line no-console
            console.log('[story] sdv all-occurrences-click', tokenId);
          }}
          onSenseOccurrencesClick={(senseId) => {
            // Storybook-only diagnostic: production routes to MarbleForm filtered by sense.
            // eslint-disable-next-line no-console
            console.log('[story] sdv sense-occurrences-click', senseId);
          }}
          localizedStringsWithLoadingState={[localizedStrings, false]}
        />
        <ArticleViewer
          open={state.activeArticleId !== undefined}
          articleId={state.activeArticleId}
          articleData={articleData}
          imageUrlResolver={mockImageUrlResolver}
          onOpenChange={(open) => !open && update({ activeArticleId: undefined })}
          onCrossReferenceClick={(ref) => {
            if (ref.type === 'launchViewer') return;
            update({ activeArticleId: ref.targetArticleId });
          }}
          localizedStringsWithLoadingState={[localizedStrings, false]}
        />
        <MarbleGuide
          open={state.marbleGuideOpen}
          neverShowAgain={state.marbleGuideNeverShowAgain}
          onClose={() => update({ marbleGuideOpen: false })}
          onNeverShowAgainChange={(next) => update({ marbleGuideNeverShowAgain: next })}
          localizedStringsWithLoadingState={[localizedStrings, false]}
        />
      </>
    );
  },
};

/** Loading state — top-level skeleton; unreachable as a starting state from the interactive flow. */
export const Loading: Story = {
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    resourceName: 'SDBH/SDBG',
    isLoading: true,
    activeTab: 'dictionary',
    onTabChange: () => {},
    scope: 'current-verse',
    onScopeChange: () => {},
    ribbons: MOCK_RIBBONS_NONE,
    usj: MOCK_USJ,
    annotations: [],
    filteredTokenId: undefined,
  },
};

/** All warning ribbons visible — exercise the ribbon stack layout. */
export const WithAllRibbons: Story = {
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    resourceName: 'SDBH/SDBG',
    activeTab: 'dictionary',
    onTabChange: () => {},
    scope: 'current-verse',
    onScopeChange: () => {},
    currentReferenceLabel: 'GEN 1:1',
    ribbons: MOCK_RIBBONS_ALL,
    usj: MOCK_USJ,
    annotations: [],
    filteredTokenId: undefined,
    dictionaryItems: MOCK_DICT_ENTRIES_HEBREW,
    dictionaryActiveDictionary: 'SDBH',
    dictionaryScopeLabel: 'current verse',
    encyclopediaItems: MOCK_ENC_ENTRIES_HEBREW,
    encyclopediaScopeLabel: 'current verse',
    encyclopediaArticleDataMap: MOCK_ARTICLE_DATA_MAP,
    mediaImagesItems: MOCK_MEDIA_IMAGES,
    mediaImagesScopeLabel: 'current verse',
    mediaImagesThumbnailUrlResolver: mockMediaThumbnailUrlResolver,
    mediaMapsItems: MOCK_MEDIA_MAPS,
    mediaMapsScopeLabel: 'current verse',
    mediaMapsThumbnailUrlResolver: mockMediaThumbnailUrlResolver,
    mediaViewerImageUrlResolver: mockMediaViewerImageUrlResolver,
  },
};

/** Empty (no resource selected / no chapter loaded) — unreachable from interactive Default. */
export const Empty: Story = {
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    resourceName: 'SDBH/SDBG',
    activeTab: 'dictionary',
    onTabChange: () => {},
    scope: 'current-verse',
    onScopeChange: () => {},
    ribbons: MOCK_RIBBONS_NONE,
    usj: undefined,
    annotations: [],
    filteredTokenId: undefined,
  },
};

/**
 * Pre-filtered + footnotes pane visible + sense scope active — illustrates the post-click state the
 * user would reach by clicking a token; useful as a starting point for design review without having
 * to click through the interactive flow.
 */
export const WithFilterAndFootnotes: Story = {
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    resourceName: 'SDBH/SDBG',
    activeTab: 'dictionary',
    onTabChange: () => {},
    scope: 'current-sense',
    onScopeChange: () => {},
    hasSenseScope: true,
    searchValue: 'beˈrēšīṯ',
    hasMatches: true,
    showFootnotes: true,
    currentReferenceLabel: 'GEN 1:1',
    ribbons: MOCK_RIBBONS_NONE,
    usj: MOCK_USJ,
    annotations: [],
    filteredTokenId: MOCK_FILTERED_TOKEN_ID,
    dictionaryItems: MOCK_DICT_ENTRIES_HEBREW,
    dictionaryActiveDictionary: 'SDBH',
    dictionaryScopeLabel: 'current sense',
    dictionarySelectedTokenId: MOCK_DICT_ENTRY_ELOHIM.tokenId,
  },
};
