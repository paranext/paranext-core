import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  MOCK_FILTERED_TOKEN_ID,
  MOCK_GEN_1_1,
  MOCK_GEN_1_TOKENS,
  MOCK_RIBBONS_ALL,
  MOCK_RIBBONS_NONE,
  MOCK_COPYRIGHT_TEXT,
} from '../data/marble-form.story-data';
import { SCRIPTURE_PANE_STRING_KEYS } from '../components/scripture-pane/scripture-pane.component';
import { TOOLBAR_STRING_KEYS } from '../components/toolbar/toolbar.component';
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
  mockThumbnailUrlResolver,
} from '../data/encyclopedia-tab.story-data';
import {
  EnhancedResourceWebView,
  ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS,
} from './enhanced-resource.web-view';

const allKeys = [
  ...ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS,
  ...SCRIPTURE_PANE_STRING_KEYS,
  ...TOOLBAR_STRING_KEYS,
  ...WARNING_RIBBONS_STRING_KEYS,
  ...COPYRIGHT_OVERLAY_STRING_KEYS,
  ...DICTIONARY_TAB_STRING_KEYS,
  ...ENCYCLOPEDIA_TAB_STRING_KEYS,
];
const localizedStrings = getLocalizedStrings(allKeys);

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
    encyclopediaThumbnailUrlResolver: mockThumbnailUrlResolver,
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

export const DictionaryTabExpanded: Story = {
  args: {
    activeTab: 'dictionary',
    dictionaryItems: MOCK_DICT_ENTRIES_HEBREW,
    dictionaryExpandedTokenIds: new Set([MOCK_DICT_ENTRY_ELOHIM.tokenId]),
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
    encyclopediaExpandedTokenIds: new Set([MOCK_ENC_ENTRY_GAMAL.tokenId]),
    encyclopediaScopeLabel: 'current verse',
  },
};
