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

/**
 * Default - fully interactive. Reviewers can:
 *
 * - Click a row to open the side drawer with the thumbnail preview (sets `selectedItemId`).
 * - Click the same row to close the drawer.
 * - Click "Maximize" inside the drawer to promote the image into a centered MediaViewer Dialog.
 * - Use prev / next inside the dialog to switch items without closing.
 * - Toggle the "Defer thumbnails" checkbox to flip `loaded` and demonstrate BHV-359 deferred-load
 *   skeletons.
 * - Cycle the row count via the "Items" selector to demonstrate the singular/plural count label
 *   variants (1, 2, 4 entries).
 */
function InteractiveMediaImagesTabDemo() {
  const [itemCount, setItemCount] = useState<number>(MOCK_MEDIA_IMAGES.length);
  const [loaded, setLoaded] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
  const [maximizedId, setMaximizedId] = useState<string | undefined>();

  const items = MOCK_MEDIA_IMAGES.slice(0, itemCount);
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
    <div className="tw-flex tw-h-full tw-flex-col tw-gap-2">
      <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3 tw-text-xs">
        <label className="tw-flex tw-items-center tw-gap-1">
          Items:
          <select
            value={String(itemCount)}
            onChange={(e) => {
              setItemCount(Number(e.target.value));
              setSelectedItemId(undefined);
              setMaximizedId(undefined);
            }}
          >
            <option value="1">1 (singular count label)</option>
            <option value="2">2</option>
            <option value="4">4 (default)</option>
          </select>
        </label>
        <label className="tw-flex tw-items-center tw-gap-1">
          <input type="checkbox" checked={!loaded} onChange={(e) => setLoaded(!e.target.checked)} />
          Defer thumbnails (BHV-359 skeleton)
        </label>
        <span className="tw-text-muted-foreground">
          selected: {selectedItemId ?? '(none)'} · maximized: {maximizedId ?? '(none)'}
        </span>
      </div>
      <div className="tw-flex-1 tw-min-h-0">
        <MediaImagesTab
          items={items}
          selectedItemId={selectedItemId}
          onSelectionChange={setSelectedItemId}
          onMaximize={setMaximizedId}
          loaded={loaded}
          thumbnailUrlResolver={mockMediaThumbnailUrlResolver}
          localizedStringsWithLoadingState={[localizedStrings, false]}
          scopeLabel="current chapter"
        />
      </div>
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
    </div>
  );
}

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <InteractiveMediaImagesTabDemo />,
};

/** Loading - shell-level skeleton rows (cannot be reached from interactive Default). */
export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
};

/** Empty - "No images for {scope}." rendered when no entries match (BHV-352). */
export const Empty: Story = {
  args: {
    items: [],
    scopeLabel: 'current verse',
  },
};
