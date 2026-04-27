import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MediaMapsTab, MEDIA_MAPS_TAB_STRING_KEYS } from './media-maps-tab.component';
import { MOCK_MEDIA_MAPS, mockMediaThumbnailUrlResolver } from '../../data/media-tab.story-data';

const localizedStrings = getLocalizedStrings([...MEDIA_MAPS_TAB_STRING_KEYS]);

const meta: Meta<typeof MediaMapsTab> = {
  title: 'Bundled Extensions/platform-enhanced-resources/MediaTab/MediaMapsTab',
  component: MediaMapsTab,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    isLoading: false,
    loaded: true,
    scopeLabel: 'current chapter',
    thumbnailUrlResolver: mockMediaThumbnailUrlResolver,
    onThumbnailClick: () => {},
  },
  decorators: [
    (Story) => (
      <div className="tw-h-[640px] tw-w-[480px] tw-border tw-border-border">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MediaMapsTab>;

export const Default: Story = {
  args: {
    items: MOCK_MEDIA_MAPS,
  },
};

export const SingleEntry: Story = {
  args: {
    items: MOCK_MEDIA_MAPS.slice(0, 1),
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
};

export const DeferredNotYetLoaded: Story = {
  // BHV-359: maps tab also defers thumbnail loading until visible.
  args: {
    items: MOCK_MEDIA_MAPS,
    loaded: false,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    scopeLabel: 'current verse',
  },
};
