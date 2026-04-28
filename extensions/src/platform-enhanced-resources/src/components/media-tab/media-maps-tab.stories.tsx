import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MediaMapsTab, MEDIA_MAPS_TAB_STRING_KEYS } from './media-maps-tab.component';
import {
  MediaViewer,
  MEDIA_VIEWER_STRING_KEYS,
  type MediaViewerItem,
} from '../media-viewer/media-viewer.component';
import { MOCK_MEDIA_MAPS, mockMediaThumbnailUrlResolver } from '../../data/media-tab.story-data';
import { mockMediaViewerImageUrlResolver } from '../../data/media-viewer.story-data';

const allKeys = [...MEDIA_MAPS_TAB_STRING_KEYS, ...MEDIA_VIEWER_STRING_KEYS];
const localizedStrings = getLocalizedStrings(allKeys);

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

export const WithFirstSelected: Story = {
  args: {
    items: MOCK_MEDIA_MAPS,
    selectedItemId: MOCK_MEDIA_MAPS[0].imageId,
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

/**
 * Interactive: parent owns selection + maximization state. Selecting a row opens the side drawer
 * with a thumbnail preview; clicking Maximize promotes the map into a centered MediaViewer Dialog
 * with prev/next + zoom controls.
 */
export const Interactive: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const items = MOCK_MEDIA_MAPS;
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
        <MediaMapsTab
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
