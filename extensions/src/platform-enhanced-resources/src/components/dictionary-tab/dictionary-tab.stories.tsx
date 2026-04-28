import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { DictionaryTab, DICTIONARY_TAB_STRING_KEYS } from './dictionary-tab.component';
import {
  MOCK_DICT_ENTRIES_GREEK,
  MOCK_DICT_ENTRIES_HEBREW,
  MOCK_DICT_ENTRY_ELOHIM,
} from '../../data/dictionary-tab.story-data';

const localizedStrings = getLocalizedStrings([...DICTIONARY_TAB_STRING_KEYS]);

const meta: Meta<typeof DictionaryTab> = {
  title: 'Bundled Extensions/platform-enhanced-resources/DictionaryTab/DictionaryTab',
  component: DictionaryTab,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    selectedTokenId: undefined,
    isLoading: false,
    emptyState: 'none',
    showTranslations: false,
    activeDictionary: 'SDBH',
    hideNonRelevantSenses: false,
    scopeLabel: 'current verse',
    onSelectionChange: () => {},
    onSourceTextClick: () => {},
    onOccurrenceCountClick: () => {},
    onSemanticDomainClick: () => {},
    onRelatedLexemeClick: () => {},
    onEncyclopediaLinkClick: () => {},
    onVerseOccurrenceClick: () => {},
    onToggleHideNonRelevantSenses: () => {},
    onCopySurfaceForm: () => {},
    onCopyLemma: () => {},
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

type Story = StoryObj<typeof DictionaryTab>;

export const Default: Story = {
  args: {
    items: MOCK_DICT_ENTRIES_HEBREW,
    activeDictionary: 'SDBH',
  },
};

export const WithFirstSelected: Story = {
  args: {
    items: MOCK_DICT_ENTRIES_HEBREW,
    activeDictionary: 'SDBH',
    selectedTokenId: MOCK_DICT_ENTRY_ELOHIM.tokenId,
  },
};

export const HideNonRelevantSenses: Story = {
  args: {
    items: MOCK_DICT_ENTRIES_HEBREW,
    activeDictionary: 'SDBH',
    selectedTokenId: MOCK_DICT_ENTRY_ELOHIM.tokenId,
    hideNonRelevantSenses: true,
  },
};

export const WithTranslations: Story = {
  args: {
    items: MOCK_DICT_ENTRIES_HEBREW,
    activeDictionary: 'SDBH',
    showTranslations: true,
  },
};

export const GreekDict: Story = {
  args: {
    items: MOCK_DICT_ENTRIES_GREEK,
    activeDictionary: 'SDBG',
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
    filterWord: 'bereʼshiyt',
    scopeLabel: 'current chapter',
  },
};

export const EmptyWordNotInScope: Story = {
  args: {
    items: [],
    emptyState: 'word-not-in-scope',
    filterWord: 'bereʼshiyt',
    scopeLabel: 'current verse',
  },
};

export const Interactive: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render(args) {
    const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>();
    const [hideNonRelevant, setHideNonRelevant] = useState(false);
    return (
      <DictionaryTab
        {...args}
        items={MOCK_DICT_ENTRIES_HEBREW}
        activeDictionary="SDBH"
        selectedTokenId={selectedTokenId}
        onSelectionChange={setSelectedTokenId}
        hideNonRelevantSenses={hideNonRelevant}
        onToggleHideNonRelevantSenses={setHideNonRelevant}
        // Storybook-only diagnostic - production wires these to MarbleForm / drawer handlers.
        // eslint-disable-next-line no-console
        onSourceTextClick={(id) => console.log('[DictionaryTab story] source-text-click', id)}
        // Storybook-only diagnostic - production routes to MarbleForm filtered by occurrences.
        // eslint-disable-next-line no-console
        onOccurrenceCountClick={(id) => console.log('[DictionaryTab story] occurrence-click', id)}
        // Storybook-only diagnostic - production opens SemanticDomainViewer.
        // eslint-disable-next-line no-console
        onSemanticDomainClick={(id) => console.log('[DictionaryTab story] semantic-domain', id)}
        // Storybook-only diagnostic - production navigates to the related lexeme entry.
        // eslint-disable-next-line no-console
        onRelatedLexemeClick={(lemma) => console.log('[DictionaryTab story] related-lex', lemma)}
        // Storybook-only diagnostic - production opens ArticleViewer.
        // eslint-disable-next-line no-console
        onEncyclopediaLinkClick={(id) => console.log('[DictionaryTab story] encyclopedia', id)}
        // Storybook-only diagnostic - production fires goto:{verseRef} to scroll-group sync.
        // eslint-disable-next-line no-console
        onVerseOccurrenceClick={(verse) => console.log('[DictionaryTab story] verse', verse)}
        // Storybook-only diagnostic - production calls clipboard write.
        // eslint-disable-next-line no-console
        onCopySurfaceForm={(item) => console.log('[DictionaryTab story] copy-surface', item.term)}
        // Storybook-only diagnostic - production calls clipboard write.
        // eslint-disable-next-line no-console
        onCopyLemma={(item) => console.log('[DictionaryTab story] copy-lemma', item.translit)}
      />
    );
  },
};
