import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MediaImagesTab, MEDIA_IMAGES_TAB_STRING_KEYS } from './media-images-tab.component';
import {
  MediaViewer,
  MEDIA_VIEWER_STRING_KEYS,
  type MediaViewerItem,
} from '../media-viewer/media-viewer.component';
import { MOCK_MEDIA_IMAGES, mockMediaThumbnailUrlResolver } from '../../data/media-tab.story-data';
import { mockMediaViewerImageUrlResolver } from '../../data/media-viewer.story-data';

const allKeys = [...MEDIA_IMAGES_TAB_STRING_KEYS, ...MEDIA_VIEWER_STRING_KEYS];
const localizedStrings = getLocalizedStrings(allKeys);

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
    onSelectionChange: () => {},
    onMaximize: () => {},
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

export const WithFirstSelected: Story = {
  args: {
    items: MOCK_MEDIA_IMAGES,
    selectedItemId: MOCK_MEDIA_IMAGES[0].imageId,
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

/**
 * Interactive: parent owns selection + maximization state. Selecting a row opens the side drawer
 * with a thumbnail preview; clicking Maximize promotes the image into a centered MediaViewer Dialog
 * with prev/next + zoom controls.
 */
export const Interactive: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const items = MOCK_MEDIA_IMAGES;
    const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
    const [maximizedId, setMaximizedId] = useState<string | undefined>();

    const maximizedIndex = maximizedId ? items.findIndex((m) => m.imageId === maximizedId) : -1;
    const maximizedEntry = maximizedIndex >= 0 ? items[maximizedIndex] : undefined;
    const maximizedItem: MediaViewerItem | undefined = maximizedEntry
      ? {
          imageId: maximizedEntry.imageId,
          title: maximizedEntry.title,
          mediaType: maximizedEntry.mediaType,
          caption: maximizedEntry.referenceLabel,
        }
      : undefined;

    const handlePrev =
      maximizedIndex > 0 ? () => setMaximizedId(items[maximizedIndex - 1].imageId) : undefined;
    const handleNext =
      maximizedIndex >= 0 && maximizedIndex < items.length - 1
        ? () => setMaximizedId(items[maximizedIndex + 1].imageId)
        : undefined;

    return (
      <>
        <MediaImagesTab
          items={items}
          selectedItemId={selectedItemId}
          onSelectionChange={setSelectedItemId}
          onMaximize={setMaximizedId}
          thumbnailUrlResolver={mockMediaThumbnailUrlResolver}
          localizedStringsWithLoadingState={[localizedStrings, false]}
          scopeLabel="current chapter"
        />
        <MediaViewer
          open={maximizedId !== undefined}
          item={maximizedItem}
          imageUrlResolver={mockMediaViewerImageUrlResolver}
          onOpenChange={(open) => {
            if (!open) setMaximizedId(undefined);
          }}
          onPrev={handlePrev}
          onNext={handleNext}
          localizedStringsWithLoadingState={[localizedStrings, false]}
        />
      </>
    );
  },
};
