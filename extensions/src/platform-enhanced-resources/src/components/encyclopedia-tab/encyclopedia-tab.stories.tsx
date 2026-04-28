import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { EncyclopediaTab, ENCYCLOPEDIA_TAB_STRING_KEYS } from './encyclopedia-tab.component';
import {
  MOCK_ARTICLE_DATA_MAP,
  MOCK_ENC_ENTRIES_GREEK,
  MOCK_ENC_ENTRIES_HEBREW,
  MOCK_ENC_ENTRY_GAMAL,
  MOCK_ENC_ENTRY_SHAMAYIM,
  mockImageUrlResolver,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ENCYCLOPEDIA_TAB_STRING_KEYS]);

const meta: Meta<typeof EncyclopediaTab> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EncyclopediaTab/EncyclopediaTab',
  component: EncyclopediaTab,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    selectedTokenId: undefined,
    isLoading: false,
    emptyState: 'none',
    scopeLabel: 'current verse',
    articleDataMap: MOCK_ARTICLE_DATA_MAP,
    imageUrlResolver: mockImageUrlResolver,
    onSelectionChange: () => {},
    onSourceTextClick: () => {},
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

export const WithFirstSelected: Story = {
  args: {
    items: MOCK_ENC_ENTRIES_HEBREW,
    selectedTokenId: MOCK_ENC_ENTRY_GAMAL.tokenId,
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
    selectedTokenId: MOCK_ENC_ENTRY_SHAMAYIM.tokenId,
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

export const Interactive: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render(args) {
    const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>();
    return (
      <EncyclopediaTab
        {...args}
        items={MOCK_ENC_ENTRIES_HEBREW}
        selectedTokenId={selectedTokenId}
        onSelectionChange={setSelectedTokenId}
        // Storybook-only diagnostic - production routes to MarbleForm.
        // eslint-disable-next-line no-console
        onSourceTextClick={(id) => console.log('[EncyclopediaTab story] source-text-click', id)}
        onCopySurfaceForm={(item) => {
          // Storybook-only diagnostic - production calls clipboard write.
          // eslint-disable-next-line no-console
          console.log('[EncyclopediaTab story] copy-surface', item.lemma);
        }}
        // Storybook-only diagnostic - production calls clipboard write.
        // eslint-disable-next-line no-console
        onCopyLemma={(item) => console.log('[EncyclopediaTab story] copy-lemma', item.translit)}
        // Storybook-only diagnostic - production fires goto:{verseRef}.
        // eslint-disable-next-line no-console
        onVerseLinkClick={(link) => console.log('[EncyclopediaTab story] verse-link', link)}
        // Storybook-only diagnostic - production opens cross-ref overlay.
        // eslint-disable-next-line no-console
        onCrossReferenceClick={(ref) => console.log('[EncyclopediaTab story] cross-ref', ref)}
        // Storybook-only diagnostic - production opens MediaViewer.
        // eslint-disable-next-line no-console
        onImageClick={(id) => console.log('[EncyclopediaTab story] image', id)}
        onViewFullArticle={(entry) => {
          // Storybook-only diagnostic - production opens ArticleViewer (UI-PKG-006).
          // eslint-disable-next-line no-console
          console.log('[EncyclopediaTab story] view-full-article', entry.articleId);
        }}
      />
    );
  },
};

export const MultipleArticleReferences: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render(args) {
    // SHAMAYIM has 2 article refs in the mock data; synthesize a 3rd to exercise the dense-stack
    // case (3+ EncyclopediaEntryDetail panels rendered in the side drawer).
    const seed = MOCK_ENC_ENTRY_SHAMAYIM;
    const denseItem = {
      ...seed,
      entries: [
        ...seed.entries,
        {
          ...seed.entries[0],
          articleId: 'REALIA:5.4',
          key: '5.4',
          title: 'Cosmic waters',
          teaserText:
            'Many texts also speak of waters above the firmament, an upper sea separated from the lower sea by the dome...',
        },
      ],
    };
    const items = [denseItem];
    const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>(items[0]?.tokenId);
    return (
      <EncyclopediaTab
        {...args}
        items={items}
        selectedTokenId={selectedTokenId}
        onSelectionChange={setSelectedTokenId}
      />
    );
  },
};
