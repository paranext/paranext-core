import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  DictionaryEntryDetail,
  DICTIONARY_ENTRY_DETAIL_STRING_KEYS,
} from './dictionary-entry-detail.component';
import {
  MOCK_DICT_ENTRY_ELOHIM,
  MOCK_DICT_ENTRY_LOGOS,
} from '../../data/dictionary-tab.story-data';

const localizedStrings = getLocalizedStrings([...DICTIONARY_ENTRY_DETAIL_STRING_KEYS]);

const meta: Meta<typeof DictionaryEntryDetail> = {
  title: 'Bundled Extensions/platform-enhanced-resources/DictionaryTab/DictionaryEntryDetail',
  component: DictionaryEntryDetail,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
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

type Story = StoryObj<typeof DictionaryEntryDetail>;

export const Hebrew: Story = {
  args: {
    definition: MOCK_DICT_ENTRY_ELOHIM.definition,
    senses: MOCK_DICT_ENTRY_ELOHIM.senses,
    semanticDomains: MOCK_DICT_ENTRY_ELOHIM.semanticDomains,
    relatedLexemes: MOCK_DICT_ENTRY_ELOHIM.relatedLexemes,
    encyclopediaLinks: MOCK_DICT_ENTRY_ELOHIM.encyclopediaLinks,
    verseOccurrences: MOCK_DICT_ENTRY_ELOHIM.verseOccurrences,
    hideNonRelevantSenses: false,
  },
};

export const Greek: Story = {
  args: {
    definition: MOCK_DICT_ENTRY_LOGOS.definition,
    senses: MOCK_DICT_ENTRY_LOGOS.senses,
    semanticDomains: MOCK_DICT_ENTRY_LOGOS.semanticDomains,
    relatedLexemes: MOCK_DICT_ENTRY_LOGOS.relatedLexemes,
    encyclopediaLinks: MOCK_DICT_ENTRY_LOGOS.encyclopediaLinks,
    verseOccurrences: MOCK_DICT_ENTRY_LOGOS.verseOccurrences,
    hideNonRelevantSenses: false,
  },
};

export const HiddenNonRelevantSenses: Story = {
  args: {
    definition: MOCK_DICT_ENTRY_ELOHIM.definition,
    senses: MOCK_DICT_ENTRY_ELOHIM.senses,
    semanticDomains: MOCK_DICT_ENTRY_ELOHIM.semanticDomains,
    relatedLexemes: MOCK_DICT_ENTRY_ELOHIM.relatedLexemes,
    encyclopediaLinks: MOCK_DICT_ENTRY_ELOHIM.encyclopediaLinks,
    verseOccurrences: MOCK_DICT_ENTRY_ELOHIM.verseOccurrences,
    hideNonRelevantSenses: true,
  },
};

export const Minimal: Story = {
  args: {
    definition: 'A short definition with no other expanded data.',
  },
};

export const EmptyDetail: Story = {
  args: {},
};
