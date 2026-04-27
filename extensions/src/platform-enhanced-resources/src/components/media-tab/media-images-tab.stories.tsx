import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MediaImagesTab, MEDIA_IMAGES_TAB_STRING_KEYS } from './media-images-tab.component';
import { MOCK_MEDIA_IMAGES, mockMediaThumbnailUrlResolver } from '../../data/media-tab.story-data';

const localizedStrings = getLocalizedStrings([...MEDIA_IMAGES_TAB_STRING_KEYS]);

const meta: Meta<typeof MediaImagesTab> = {
  title: 'Bundled Extensions/platform-enhanced-resources/MediaTab/MediaImagesTab',
  component: MediaImagesTab,
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

type Story = StoryObj<typeof MediaImagesTab>;

export const Default: Story = {
  args: {
    items: MOCK_MEDIA_IMAGES,
  },
};

export const SingleEntry: Story = {
  args: {
    // Singular count label variant.
    items: MOCK_MEDIA_IMAGES.slice(0, 1),
  },
};

export const Loading: Story = {
  // Shell-level loading - skeleton rows in the list area.
  args: {
    items: [],
    isLoading: true,
  },
};

export const DeferredNotYetLoaded: Story = {
  // BHV-359: rows are present but thumbnail bytes have not arrived yet (tab not yet visible).
  args: {
    items: MOCK_MEDIA_IMAGES,
    loaded: false,
  },
};

export const Empty: Story = {
  // BHV-352: "No images for {scope}." rendered when no entries match.
  args: {
    items: [],
    scopeLabel: 'current verse',
  },
};
