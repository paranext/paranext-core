import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { ArticleRenderer, ARTICLE_RENDERER_STRING_KEYS } from './article-renderer.component';
import {
  MOCK_ARTICLE_CAMEL,
  MOCK_ARTICLE_HEAVEN,
  MOCK_ARTICLE_MINIMAL,
  mockImageUrlResolver,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ARTICLE_RENDERER_STRING_KEYS]);

const meta: Meta<typeof ArticleRenderer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EncyclopediaTab/ArticleRenderer',
  component: ArticleRenderer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    imageUrlResolver: mockImageUrlResolver,
    onVerseLinkClick: () => {},
    onCrossReferenceClick: () => {},
    onImageClick: () => {},
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[640px] tw-rounded tw-border tw-border-border tw-p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ArticleRenderer>;

export const PreviewMode: Story = {
  args: {
    article: MOCK_ARTICLE_CAMEL,
    mode: 'preview',
    previewParagraphCount: 2,
  },
};

export const FullMode: Story = {
  args: {
    article: MOCK_ARTICLE_CAMEL,
    mode: 'full',
  },
};

export const WithInlineImages: Story = {
  args: {
    article: MOCK_ARTICLE_CAMEL,
    mode: 'full',
  },
};

export const WithCrossRefs: Story = {
  args: {
    article: MOCK_ARTICLE_HEAVEN,
    mode: 'full',
  },
};

export const MinimalArticle: Story = {
  args: {
    article: MOCK_ARTICLE_MINIMAL,
    mode: 'full',
  },
};

export const Empty: Story = {
  args: {
    article: undefined,
    mode: 'preview',
  },
};
