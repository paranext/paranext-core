import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  DictionaryDisplayItem,
  DICTIONARY_DISPLAY_ITEM_STRING_KEYS,
} from './dictionary-display-item.component';
import {
  MOCK_DICT_ENTRY_BERESHIT,
  MOCK_DICT_ENTRY_ELOHIM,
  MOCK_DICT_ENTRY_LOGOS,
} from '../../data/dictionary-tab.story-data';

const localizedStrings = getLocalizedStrings([...DICTIONARY_DISPLAY_ITEM_STRING_KEYS]);

const meta: Meta<typeof DictionaryDisplayItem> = {
  title: 'Bundled Extensions/platform-enhanced-resources/DictionaryTab/DictionaryDisplayItem',
  component: DictionaryDisplayItem,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    onSourceTextClick: () => {},
    onOccurrenceCountClick: () => {},
    onCopySurfaceForm: () => {},
    onCopyLemma: () => {},
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[720px] tw-rounded tw-border tw-border-border tw-p-3">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DictionaryDisplayItem>;

export const Hebrew: Story = {
  args: {
    item: MOCK_DICT_ENTRY_ELOHIM,
    showTranslations: false,
  },
};

export const HebrewWithTranslations: Story = {
  args: {
    item: MOCK_DICT_ENTRY_ELOHIM,
    showTranslations: true,
  },
};

export const Greek: Story = {
  args: {
    item: MOCK_DICT_ENTRY_LOGOS,
    showTranslations: false,
  },
};

export const NoGlosses: Story = {
  args: {
    item: { ...MOCK_DICT_ENTRY_BERESHIT, glosses: [] },
    showTranslations: false,
  },
};
