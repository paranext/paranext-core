import type { Meta, StoryObj } from '@storybook/react-webpack5';
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
    expandedTokenIds: new Set(),
    allExpanded: false,
    isLoading: false,
    emptyState: 'none',
    showTranslations: false,
    activeDictionary: 'SDBH',
    hideNonRelevantSenses: false,
    scopeLabel: 'current verse',
    onExpandToggle: () => {},
    onExpandAll: () => {},
    onCollapseAll: () => {},
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

export const WithFirstEntryExpanded: Story = {
  args: {
    items: MOCK_DICT_ENTRIES_HEBREW,
    activeDictionary: 'SDBH',
    expandedTokenIds: new Set([MOCK_DICT_ENTRY_ELOHIM.tokenId]),
  },
};

export const AllExpanded: Story = {
  args: {
    items: MOCK_DICT_ENTRIES_HEBREW,
    activeDictionary: 'SDBH',
    expandedTokenIds: new Set(MOCK_DICT_ENTRIES_HEBREW.map((e) => e.tokenId)),
    allExpanded: true,
  },
};

export const HideNonRelevantSenses: Story = {
  args: {
    items: MOCK_DICT_ENTRIES_HEBREW,
    activeDictionary: 'SDBH',
    expandedTokenIds: new Set([MOCK_DICT_ENTRY_ELOHIM.tokenId]),
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
