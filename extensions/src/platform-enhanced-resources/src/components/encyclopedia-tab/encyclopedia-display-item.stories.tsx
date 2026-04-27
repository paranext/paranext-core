import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  EncyclopediaDisplayItem,
  ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS,
} from './encyclopedia-display-item.component';
import {
  MOCK_ENC_ENTRY_GAMAL,
  MOCK_ENC_ENTRY_KAMELOS,
  MOCK_ENC_ENTRY_NO_IMAGES,
  MOCK_ENC_ENTRY_SHAMAYIM,
  mockThumbnailUrlResolver,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS]);

const meta: Meta<typeof EncyclopediaDisplayItem> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EncyclopediaTab/EncyclopediaDisplayItem',
  component: EncyclopediaDisplayItem,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    thumbnailUrlResolver: mockThumbnailUrlResolver,
    onSourceTextClick: () => {},
    onArticleTitleClick: () => {},
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

type Story = StoryObj<typeof EncyclopediaDisplayItem>;

export const Hebrew: Story = {
  args: {
    item: MOCK_ENC_ENTRY_GAMAL,
  },
};

export const Greek: Story = {
  args: {
    item: MOCK_ENC_ENTRY_KAMELOS,
  },
};

export const MultipleEntries: Story = {
  args: {
    item: MOCK_ENC_ENTRY_SHAMAYIM,
  },
};

export const NoThumbnails: Story = {
  args: {
    item: MOCK_ENC_ENTRY_NO_IMAGES,
  },
};
