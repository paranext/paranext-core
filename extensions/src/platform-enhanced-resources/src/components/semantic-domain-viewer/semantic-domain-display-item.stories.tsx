import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  SemanticDomainDisplayItem,
  SEMANTIC_DOMAIN_DISPLAY_ITEM_STRING_KEYS,
  type SemanticDomainFilteredEntry,
} from './semantic-domain-display-item.component';
import {
  MOCK_FILTERED_ENTRIES_GOSPEL,
  MOCK_FILTERED_ENTRIES_MESSAGE,
  MOCK_FILTERED_ENTRIES_WORD,
} from '../../data/semantic-domain-viewer.story-data';

const localizedStrings = getLocalizedStrings([...SEMANTIC_DOMAIN_DISPLAY_ITEM_STRING_KEYS]);

const NO_GLOSS_ENTRY: SemanticDomainFilteredEntry = {
  ...MOCK_FILTERED_ENTRIES_MESSAGE[0],
  entryId: 'aggelia-no-gloss',
  gloss: '',
};

const meta: Meta<typeof SemanticDomainDisplayItem> = {
  title:
    'Bundled Extensions/platform-enhanced-resources/SemanticDomainViewer/SemanticDomainDisplayItem',
  component: SemanticDomainDisplayItem,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[480px] tw-rounded tw-border tw-border-border tw-bg-background tw-p-3">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SemanticDomainDisplayItem>;

/** Entry with a single sense (rhema). */
export const SingleSense: Story = {
  args: {
    item: MOCK_FILTERED_ENTRIES_WORD[1],
  },
};

/** Entry with two senses (logos: word + message). */
export const MultipleSenses: Story = {
  args: {
    item: MOCK_FILTERED_ENTRIES_WORD[0],
  },
};

/** Entry without a headline gloss - relies on the sense list to communicate meaning. */
export const WithoutGloss: Story = {
  args: {
    item: NO_GLOSS_ENTRY,
  },
};

/** Long-gloss entry (euangelion). */
export const LongGloss: Story = {
  args: {
    item: MOCK_FILTERED_ENTRIES_GOSPEL[0],
  },
};
