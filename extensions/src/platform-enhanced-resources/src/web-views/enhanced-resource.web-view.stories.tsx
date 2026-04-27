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
