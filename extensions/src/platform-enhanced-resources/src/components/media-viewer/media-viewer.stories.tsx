import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MediaViewer, MEDIA_VIEWER_STRING_KEYS } from './media-viewer.component';
import {
  MOCK_VIEWER_IMAGES,
  MOCK_VIEWER_IMAGE_LONG_CAPTION,
  MOCK_VIEWER_MAP_GALILEE,
  mockMediaViewerImageUrlResolver,
} from '../../data/media-viewer.story-data';

const localizedStrings = getLocalizedStrings([...MEDIA_VIEWER_STRING_KEYS]);

const meta: Meta<typeof MediaViewer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/MediaViewer',
  component: MediaViewer,
  tags: ['autodocs'],
  args: {
    open: true,
    imageUrlResolver: mockMediaViewerImageUrlResolver,
    onOpenChange: () => {},
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      // The Dialog renders into a portal at document.body, so the surrounding container exists
      // mostly to provide a stable backdrop in the Storybook canvas.
      <div className="tw:relative tw:h-[720px] tw:w-[1024px] tw:border tw:border-border tw:bg-muted/40">
        <div className="tw:p-4 tw:text-sm tw:text-muted-foreground">
          MediaViewer Dialog is rendered in a portal - look at the center of the viewport.
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MediaViewer>;

/**
 * Default (Interactive): parent owns state and reacts to all callbacks. Demonstrates the full
 * UI-PKG-005 acceptance criteria in action - open/close from a trigger, prev/next navigation across
 * a multi-image group (Previous disabled at start, Next disabled at end), and zoom in/out via the
 * toolbar buttons (which exercise the component's internal zoom state and the reset-on-item-change
 * behavior).
 */
export const Default: StoryObj<typeof MediaViewer> = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = MOCK_VIEWER_IMAGES;
    const currentItem = items[currentIndex];

    const handleNext =
      currentIndex < items.length - 1 ? () => setCurrentIndex((i) => i + 1) : undefined;
    const handlePrev = currentIndex > 0 ? () => setCurrentIndex((i) => i - 1) : undefined;

    return (
      <div className="tw:flex tw:flex-col tw:gap-3 tw:p-4">
        <Button
          type="button"
          onClick={() => {
            setCurrentIndex(0);
            setOpen(true);
          }}
        >
          Open MediaViewer
        </Button>
        <p className="tw:text-sm tw:text-muted-foreground">
          Use the toolbar arrows to navigate, the zoom buttons to scale, and Escape to close.
          Previous is disabled at the first image and Next is disabled at the last image.
        </p>
        <MediaViewer
          open={open}
          item={currentItem}
          imageUrlResolver={mockMediaViewerImageUrlResolver}
          localizedStringsWithLoadingState={[localizedStrings, false]}
          onOpenChange={setOpen}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    );
  },
};

/**
 * Map media-type variant: content-driven story showing the same Dialog layout with a map item
 * (Galilee). Kept as a separate static story so the map vs image presentation can be reviewed
 * side-by-side without driving the cycle through the interactive Default.
 */
export const Map: Story = {
  args: {
    item: MOCK_VIEWER_MAP_GALILEE,
  },
};

/**
 * Long caption variant: content-driven story exercising multi-line caption wrapping in the Dialog
 * footer. Kept separate so the wrapping evidence is stable for visual review.
 */
export const LongCaption: Story = {
  args: {
    item: MOCK_VIEWER_IMAGE_LONG_CAPTION,
  },
};
