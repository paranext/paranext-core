import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useCallback, useMemo, useState } from 'react';
import type { SemanticDomain } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  MOCK_FILTERED_TOKEN_ID,
  MOCK_GEN_1_1,
  MOCK_GEN_1_TOKENS,
  MOCK_RIBBONS_ALL,
  MOCK_RIBBONS_NONE,
  MOCK_COPYRIGHT_TEXT,
} from '../data/marble-form.story-data';
import { TEMP_SCRIPTURE_PANE_STRING_KEYS } from '../components/Temp/temp-scripture-pane.component';
import { TOOLBAR_STRING_KEYS, type ResearchTab } from '../components/toolbar/toolbar.component';
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
  MOCK_ENC_ENTRY_GAMAL,
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
import {
  MOCK_DICT_ENTRIES_FILTERED,
  MOCK_DOMAIN_PATH_DEEP,
  MOCK_DOMAIN_TREE,
} from '../data/semantic-domain-viewer.story-data';
import {
  EnhancedResourceWebView,
  ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS,
} from './enhanced-resource.web-view';

const allKeys = [
  ...ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS,
  ...TEMP_SCRIPTURE_PANE_STRING_KEYS,
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
];
const localizedStrings = getLocalizedStrings(allKeys);

/**
 * Resolve a SemanticDomain id to a breadcrumb path by walking the domain tree. Returns the deepest
 * matching path; falls back to the deep mock path when the id is not present in the tree (mock
 * dictionary entries reference domain ids like "5.1" that are real nodes in MOCK_DOMAIN_TREE).
 */
function resolveDomainPath(domainId: string): SemanticDomain[] {
  const findPath = (
    nodes: SemanticDomain[],
    targetId: string,
    trail: SemanticDomain[],
  ): SemanticDomain[] | undefined => {
    return nodes.reduce<SemanticDomain[] | undefined>((acc, node) => {
      if (acc) return acc;
      const next = [...trail, node];
      if (node.id === targetId) return next;
      return node.children ? findPath(node.children, targetId, next) : undefined;
    }, undefined);
  };
  return findPath(MOCK_DOMAIN_TREE, domainId, []) ?? MOCK_DOMAIN_PATH_DEEP;
}

/**
 * Story-only adapter from the dictionary mock entries to the SemanticDomainFilteredItem shape that
 * `SemanticDomainViewer` consumes. Production wiring will swap in the real backend filter; this
 * passes the entries through unchanged so the dialog has rows to render.
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
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    resourceName: 'SDBH/SDBG',
    copyrightInfo: MOCK_COPYRIGHT_TEXT,
    copyrightOverlayVisible: false,
    activeTab: 'dictionary',
    onTabChange: () => {},
    scope: 'current-verse',
    onScopeChange: () => {},
    hasSenseScope: false,
    searchValue: '',
    highlightMode: 'none',
    currentReference: MOCK_GEN_1_1,
    currentReferenceLabel: 'GEN 1:1',
    filteredTokenId: undefined,
    hebrewDisplayMode: 'both',
    greekDisplayMode: 'both',
    showFootnotes: false,
    scripturePaneZoom: 1,
    scrollGroupId: 0,
    splitterPercentage: 60,
    ribbons: MOCK_RIBBONS_NONE,
    tokens: MOCK_GEN_1_TOKENS,
    dictionaryItems: MOCK_DICT_ENTRIES_HEBREW,
    dictionaryActiveDictionary: 'SDBH',
    dictionaryScopeLabel: 'current verse',
    encyclopediaItems: MOCK_ENC_ENTRIES_HEBREW,
    encyclopediaScopeLabel: 'current verse',
    encyclopediaArticleDataMap: MOCK_ARTICLE_DATA_MAP,
    encyclopediaImageUrlResolver: mockImageUrlResolver,
    mediaImagesItems: MOCK_MEDIA_IMAGES,
    mediaImagesScopeLabel: 'current verse',
    mediaImagesThumbnailUrlResolver: mockMediaThumbnailUrlResolver,
    mediaMapsItems: MOCK_MEDIA_MAPS,
    mediaMapsScopeLabel: 'current verse',
    mediaMapsThumbnailUrlResolver: mockMediaThumbnailUrlResolver,
    mediaViewerImageUrlResolver: mockMediaViewerImageUrlResolver,
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

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithAllRibbons: Story = {
  args: {
    ribbons: MOCK_RIBBONS_ALL,
  },
};

export const Empty: Story = {
  args: {
    tokens: undefined,
    ribbons: MOCK_RIBBONS_NONE,
  },
};

export const WithFilterAndFootnotes: Story = {
  args: {
    filteredTokenId: MOCK_FILTERED_TOKEN_ID,
    hasSenseScope: true,
    scope: 'current-sense',
    showFootnotes: true,
  },
};

export const CopyrightOverlayVisible: Story = {
  args: {
    copyrightOverlayVisible: true,
    ribbons: { ...MOCK_RIBBONS_NONE, copyright: { visible: true, dismissed: false } },
  },
};

export const DictionaryTabSelected: Story = {
  args: {
    activeTab: 'dictionary',
    dictionaryItems: MOCK_DICT_ENTRIES_HEBREW,
    dictionarySelectedTokenId: MOCK_DICT_ENTRY_ELOHIM.tokenId,
    dictionaryScopeLabel: 'current verse',
  },
};

export const DictionaryTabEmpty: Story = {
  args: {
    activeTab: 'dictionary',
    dictionaryItems: [],
    dictionaryEmptyState: 'no-data',
    dictionaryScopeLabel: 'current verse',
  },
};

export const EncyclopediaTabExpanded: Story = {
  args: {
    activeTab: 'encyclopedia',
    encyclopediaItems: MOCK_ENC_ENTRIES_HEBREW,
    encyclopediaSelectedTokenId: MOCK_ENC_ENTRY_GAMAL.tokenId,
    encyclopediaScopeLabel: 'current verse',
  },
};

export const MediaTab: Story = {
  args: {
    activeTab: 'media',
    mediaImagesItems: MOCK_MEDIA_IMAGES,
    mediaImagesScopeLabel: 'current verse',
  },
};

export const MediaTabDeferredNotYetLoaded: Story = {
  // BHV-359: rows present, thumbnails not yet fetched.
  args: {
    activeTab: 'media',
    mediaImagesItems: MOCK_MEDIA_IMAGES,
    mediaImagesLoaded: false,
    mediaImagesScopeLabel: 'current verse',
  },
};

export const MediaTabEmpty: Story = {
  args: {
    activeTab: 'media',
    mediaImagesItems: [],
    mediaImagesScopeLabel: 'current verse',
  },
};

export const MapsTab: Story = {
  args: {
    activeTab: 'maps',
    mediaMapsItems: MOCK_MEDIA_MAPS,
    mediaMapsScopeLabel: 'current verse',
  },
};

export const MapsTabEmpty: Story = {
  args: {
    activeTab: 'maps',
    mediaMapsItems: [],
    mediaMapsScopeLabel: 'current verse',
  },
};

/**
 * Interactive - parent owns tab + per-tab selection state. Demonstrates tab switching and
 * dictionary entry expand/collapse without overlay Dialogs (covered by `EndToEndWorkflow`).
 */
export const Interactive: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [activeTab, setActiveTab] = useState<ResearchTab>('dictionary');
    const [selectedDictionaryTokenId, setSelectedDictionaryTokenId] = useState<string | undefined>(
      MOCK_DICT_ENTRY_ELOHIM.tokenId,
    );
    const [selectedEncyclopediaTokenId, setSelectedEncyclopediaTokenId] = useState<
      string | undefined
    >();
    const [selectedMediaImageId, setSelectedMediaImageId] = useState<string | undefined>();
    const [selectedMediaMapId, setSelectedMediaMapId] = useState<string | undefined>();
    const [maximizedMediaItem, setMaximizedMediaItem] = useState<MediaViewerItem | undefined>();

    const handleMaximizeImage = useCallback((id: string) => {
      setMaximizedMediaItem(buildMediaViewerItem(id));
    }, []);
    const handleMaximizeMap = useCallback((id: string) => {
      setMaximizedMediaItem(buildMediaViewerItem(id));
    }, []);
    const handleMaximizedOpenChange = useCallback((open: boolean) => {
      if (!open) setMaximizedMediaItem(undefined);
    }, []);

    return (
      <EnhancedResourceWebView
        localizedStringsWithLoadingState={[localizedStrings, false]}
        resourceName="SDBH/SDBG"
        copyrightInfo={MOCK_COPYRIGHT_TEXT}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        scope="current-verse"
        onScopeChange={() => {}}
        currentReference={MOCK_GEN_1_1}
        currentReferenceLabel="GEN 1:1"
        ribbons={MOCK_RIBBONS_NONE}
        tokens={MOCK_GEN_1_TOKENS}
        filteredTokenId={undefined}
        dictionaryItems={MOCK_DICT_ENTRIES_HEBREW}
        dictionaryActiveDictionary="SDBH"
        dictionaryScopeLabel="current verse"
        dictionarySelectedTokenId={selectedDictionaryTokenId}
        onDictionarySelectionChange={setSelectedDictionaryTokenId}
        encyclopediaItems={MOCK_ENC_ENTRIES_HEBREW}
        encyclopediaScopeLabel="current verse"
        encyclopediaArticleDataMap={MOCK_ARTICLE_DATA_MAP}
        encyclopediaImageUrlResolver={mockImageUrlResolver}
        encyclopediaSelectedTokenId={selectedEncyclopediaTokenId}
        onEncyclopediaSelectionChange={setSelectedEncyclopediaTokenId}
        mediaImagesItems={MOCK_MEDIA_IMAGES}
        mediaImagesScopeLabel="current verse"
        mediaImagesThumbnailUrlResolver={mockMediaThumbnailUrlResolver}
        mediaImagesSelectedItemId={selectedMediaImageId}
        onMediaImagesSelectionChange={setSelectedMediaImageId}
        onMediaImagesMaximize={handleMaximizeImage}
        mediaMapsItems={MOCK_MEDIA_MAPS}
        mediaMapsScopeLabel="current verse"
        mediaMapsThumbnailUrlResolver={mockMediaThumbnailUrlResolver}
        mediaMapsSelectedItemId={selectedMediaMapId}
        onMediaMapsSelectionChange={setSelectedMediaMapId}
        onMediaMapsMaximize={handleMaximizeMap}
        maximizedMediaItem={maximizedMediaItem}
        mediaViewerImageUrlResolver={mockMediaViewerImageUrlResolver}
        onMaximizedMediaOpenChange={handleMaximizedOpenChange}
      />
    );
  },
};

/**
 * EndToEndWorkflow - de-facto reference implementation of the spec's downstream state model. Wires
 * the full nav graph: tab switch, dict entry selection, semantic-domain link ->
 * SemanticDomainViewer Dialog, encyclopedia link -> ArticleViewer Dialog, and Media maximize ->
 * MediaViewer Dialog.
 *
 * Phase-3-ui later lifts this state surface into a real provider; the Storybook story exists so
 * design + product can review the full overlay reachability without backend wiring.
 */
type EndToEndState = {
  activeTab: ResearchTab;
  selectedDictionaryTokenId?: string;
  selectedEncyclopediaTokenId?: string;
  selectedMediaImageId?: string;
  selectedMediaMapId?: string;
  semanticDomainPath?: SemanticDomain[];
  activeArticleId?: string;
  maximizedMediaItem?: MediaViewerItem;
};

export const EndToEndWorkflow: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [state, setState] = useState<EndToEndState>({ activeTab: 'dictionary' });
    const update = useCallback(
      (patch: Partial<EndToEndState>) => setState((prev) => ({ ...prev, ...patch })),
      [],
    );

    const filteredEntries = useMemo(() => buildFilteredEntries(), []);
    const articleData = state.activeArticleId
      ? MOCK_ARTICLE_DATA_MAP[state.activeArticleId]
      : undefined;

    return (
      <>
        <EnhancedResourceWebView
          localizedStringsWithLoadingState={[localizedStrings, false]}
          resourceName="SDBH/SDBG"
          copyrightInfo={MOCK_COPYRIGHT_TEXT}
          activeTab={state.activeTab}
          onTabChange={(activeTab) => update({ activeTab })}
          scope="current-verse"
          onScopeChange={() => {}}
          currentReference={MOCK_GEN_1_1}
          currentReferenceLabel="GEN 1:1"
          ribbons={MOCK_RIBBONS_NONE}
          tokens={MOCK_GEN_1_TOKENS}
          filteredTokenId={undefined}
          dictionaryItems={MOCK_DICT_ENTRIES_HEBREW}
          dictionaryActiveDictionary="SDBH"
          dictionaryScopeLabel="current verse"
          dictionarySelectedTokenId={state.selectedDictionaryTokenId}
          onDictionarySelectionChange={(selectedDictionaryTokenId) =>
            update({ selectedDictionaryTokenId })
          }
          onDictionarySemanticDomainClick={(domainId) =>
            update({ semanticDomainPath: resolveDomainPath(domainId) })
          }
          onDictionaryEncyclopediaLinkClick={(activeArticleId) => update({ activeArticleId })}
          encyclopediaItems={MOCK_ENC_ENTRIES_HEBREW}
          encyclopediaScopeLabel="current verse"
          encyclopediaArticleDataMap={MOCK_ARTICLE_DATA_MAP}
          encyclopediaImageUrlResolver={mockImageUrlResolver}
          encyclopediaSelectedTokenId={state.selectedEncyclopediaTokenId}
          onEncyclopediaSelectionChange={(selectedEncyclopediaTokenId) =>
            update({ selectedEncyclopediaTokenId })
          }
          onEncyclopediaViewFullArticle={(entry) => update({ activeArticleId: entry.articleId })}
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
          onEncyclopediaLinkClick={(activeArticleId) => update({ activeArticleId })}
          onSemanticDomainClick={(domainId) =>
            update({ semanticDomainPath: resolveDomainPath(domainId) })
          }
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
      </>
    );
  },
};
