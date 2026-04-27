import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  EncyclopediaEntryDetail,
  ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS,
} from './encyclopedia-entry-detail.component';
import {
  MOCK_ARTICLE_CAMEL,
  MOCK_ARTICLE_HEAVEN,
  MOCK_ARTICLE_MINIMAL,
  MOCK_ENC_ENTRY_GAMAL,
  MOCK_ENC_ENTRY_SHAMAYIM,
  MOCK_ENC_ENTRY_NO_IMAGES,
  mockImageUrlResolver,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS]);

const meta: Meta<typeof EncyclopediaEntryDetail> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EncyclopediaTab/EncyclopediaEntryDetail',
  component: EncyclopediaEntryDetail,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    imageUrlResolver: mockImageUrlResolver,
    onVerseLinkClick: () => {},
    onCrossReferenceClick: () => {},
    onImageClick: () => {},
    onViewFullArticle: () => {},
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[640px] tw-rounded tw-border tw-border-border tw-bg-muted/20 tw-p-3">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EncyclopediaEntryDetail>;

export const Default: Story = {
  args: {
    entry: MOCK_ENC_ENTRY_GAMAL.entries[0],
    articleData: MOCK_ARTICLE_CAMEL,
  },
};

export const Loading: Story = {
  args: {
    entry: MOCK_ENC_ENTRY_GAMAL.entries[0],
    articleData: undefined,
  },
};

export const NoSeeAlso: Story = {
  args: {
    entry: MOCK_ENC_ENTRY_NO_IMAGES.entries[0],
    articleData: MOCK_ARTICLE_MINIMAL,
  },
};

export const V1Format: Story = {
  args: {
    entry: MOCK_ENC_ENTRY_GAMAL.entries[0],
    articleData: MOCK_ARTICLE_CAMEL,
  },
};

export const V2Format: Story = {
  args: {
    entry: MOCK_ENC_ENTRY_SHAMAYIM.entries[0],
    articleData: MOCK_ARTICLE_HEAVEN,
  },
};
