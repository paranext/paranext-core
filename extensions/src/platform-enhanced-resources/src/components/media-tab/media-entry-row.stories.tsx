import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MediaEntryRow, MEDIA_ENTRY_ROW_STRING_KEYS } from './media-entry-row.component';
import {
  MOCK_MEDIA_ENTRY_CORINTH,
  MOCK_MEDIA_ENTRY_PENTECOST,
  MOCK_MAP_ENTRY_GALILEE,
  mockMediaThumbnailUrlResolver,
} from '../../data/media-tab.story-data';

const localizedStrings = getLocalizedStrings([...MEDIA_ENTRY_ROW_STRING_KEYS]);

const meta: Meta<typeof MediaEntryRow> = {
  title: 'Bundled Extensions/platform-enhanced-resources/MediaTab/MediaEntryRow',
  component: MediaEntryRow,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    loaded: true,
    thumbnailUrlResolver: mockMediaThumbnailUrlResolver,
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[420px] tw-border tw-border-border tw-p-2">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MediaEntryRow>;

export const Default: Story = {
  args: {
    item: MOCK_MEDIA_ENTRY_CORINTH,
  },
};

export const VerseRange: Story = {
  args: {
    // gm-013 multi-chapter range entry (verse-ref-only, no lemma).
    item: MOCK_MEDIA_ENTRY_PENTECOST,
  },
};

export const SatelliteAtlas: Story = {
  args: {
    // gm-018 SBA entry; renders the same way - tab routing is the parent's responsibility.
    item: MOCK_MAP_ENTRY_GALILEE,
  },
};

export const LongTitle: Story = {
  args: {
    item: {
      imageId: 'long-title',
      title:
        'A very long title that should truncate gracefully when the row width is constrained by the parent layout',
      referenceLabel: 'PSA 119:1-176',
      collection: 'General',
      mediaType: 'image',
    },
  },
};

export const DeferredNotYetLoaded: Story = {
  // BHV-359: thumbnail bytes have not arrived yet; row renders with a Skeleton thumbnail.
  args: {
    item: MOCK_MEDIA_ENTRY_CORINTH,
    loaded: false,
  },
};

export const NoThumbnailResolver: Story = {
  args: {
    item: MOCK_MEDIA_ENTRY_CORINTH,
    thumbnailUrlResolver: undefined,
  },
};
