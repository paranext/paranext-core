import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { EncyclopediaTab, ENCYCLOPEDIA_TAB_STRING_KEYS } from './encyclopedia-tab.component';
import {
  MOCK_ARTICLE_DATA_MAP,
  MOCK_ENC_ENTRIES_GREEK,
  MOCK_ENC_ENTRIES_HEBREW,
  MOCK_ENC_ENTRY_GAMAL,
  MOCK_ENC_ENTRY_SHAMAYIM,
  mockImageUrlResolver,
  mockThumbnailUrlResolver,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ENCYCLOPEDIA_TAB_STRING_KEYS]);

const meta: Meta<typeof EncyclopediaTab> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EncyclopediaTab/EncyclopediaTab',
  component: EncyclopediaTab,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    expandedTokenIds: new Set(),
    allExpanded: false,
    isLoading: false,
    emptyState: 'none',
    scopeLabel: 'current verse',
    articleDataMap: MOCK_ARTICLE_DATA_MAP,
    imageUrlResolver: mockImageUrlResolver,
    thumbnailUrlResolver: mockThumbnailUrlResolver,
    onExpandToggle: () => {},
    onExpandAll: () => {},
    onCollapseAll: () => {},
    onSourceTextClick: () => {},
    onArticleTitleClick: () => {},
    onCopySurfaceForm: () => {},
    onCopyLemma: () => {},
    onVerseLinkClick: () => {},
    onCrossReferenceClick: () => {},
    onImageClick: () => {},
    onViewFullArticle: () => {},
  },
  decorators: [
    (Story) => (
      <div className="tw-h-[640px] tw-w-[800px] tw-border tw-border-border">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EncyclopediaTab>;

export const Default: Story = {
  args: {
    items: MOCK_ENC_ENTRIES_HEBREW,
  },
};

export const WithFirstEntryExpanded: Story = {
  args: {
    items: MOCK_ENC_ENTRIES_HEBREW,
    expandedTokenIds: new Set([MOCK_ENC_ENTRY_GAMAL.tokenId]),
  },
};

export const AllExpanded: Story = {
  args: {
    items: MOCK_ENC_ENTRIES_HEBREW,
    expandedTokenIds: new Set(MOCK_ENC_ENTRIES_HEBREW.map((e) => e.tokenId)),
    allExpanded: true,
  },
};

export const Greek: Story = {
  args: {
    items: MOCK_ENC_ENTRIES_GREEK,
  },
};

export const MultipleArticlesPerLemma: Story = {
  args: {
    items: [MOCK_ENC_ENTRY_SHAMAYIM],
    expandedTokenIds: new Set([MOCK_ENC_ENTRY_SHAMAYIM.tokenId]),
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
};

export const EmptyNoData: Story = {
  args: {
    items: [],
    emptyState: 'no-data',
    scopeLabel: 'current chapter',
  },
};

export const EmptyNoMatch: Story = {
  args: {
    items: [],
    emptyState: 'no-match',
    filterWord: 'gamal',
    scopeLabel: 'current chapter',
  },
};

export const EmptyWordNotInScope: Story = {
  args: {
    items: [],
    emptyState: 'word-not-in-scope',
    filterWord: 'gamal',
    scopeLabel: 'current verse',
  },
};
