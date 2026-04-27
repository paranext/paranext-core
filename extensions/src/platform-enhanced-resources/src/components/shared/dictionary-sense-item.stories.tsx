import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  DictionarySenseItem,
  DICTIONARY_SENSE_ITEM_STRING_KEYS,
  type DictionarySenseDisplay,
} from './dictionary-sense-item.component';

const localizedStrings = getLocalizedStrings([...DICTIONARY_SENSE_ITEM_STRING_KEYS]);

const RELEVANT_SENSE: DictionarySenseDisplay = {
  id: 'sense-1',
  definition: 'The supreme deity of Israel; the one true God.',
  glosses: ['God'],
  partOfSpeech: 'noun (masc. plural)',
  isRelevant: true,
};

const NON_RELEVANT_SENSE: DictionarySenseDisplay = {
  id: 'sense-2',
  definition: 'A general term for divine beings or judges acting on behalf of God.',
  glosses: ['gods', 'rulers', 'judges'],
  partOfSpeech: 'noun (masc. plural)',
  isRelevant: false,
};

const meta: Meta<typeof DictionarySenseItem> = {
  title: 'Bundled Extensions/platform-enhanced-resources/Shared/DictionarySenseItem',
  component: DictionarySenseItem,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[480px] tw-p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DictionarySenseItem>;

export const Relevant: Story = {
  args: {
    sense: RELEVANT_SENSE,
    hideNonRelevant: false,
  },
};

export const NonRelevantVisible: Story = {
  args: {
    sense: NON_RELEVANT_SENSE,
    hideNonRelevant: false,
  },
};

export const NonRelevantHidden: Story = {
  args: {
    sense: NON_RELEVANT_SENSE,
    hideNonRelevant: true,
  },
};
