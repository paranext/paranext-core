import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MediaViewer,
  MEDIA_VIEWER_STRING_KEYS,
  type MediaImageRef,
} from './media-viewer.component';
import {
  MOCK_VIEWER_IMAGES,
  MOCK_VIEWER_IMAGE_CORINTH,
  MOCK_VIEWER_IMAGE_LONG_CAPTION,
  mockMediaViewerImageUrlResolver,
} from '../../data/media-viewer.story-data';

const localizedStrings = getLocalizedStrings([...MEDIA_VIEWER_STRING_KEYS]);

const meta: Meta<typeof MediaViewer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/MediaViewer',
  component: MediaViewer,
  tags: ['autodocs'],
  args: {
    open: true,
    images: MOCK_VIEWER_IMAGES,
    currentIndex: 0,
    zoomLevel: 1,
    panOffset: { x: 0, y: 0 },
    isLoading: false,
    imageUrlResolver: mockMediaViewerImageUrlResolver,
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      // The Drawer renders into a portal at document.body, so the surrounding container exists
      // mostly to provide a stable backdrop in the Storybook canvas.
      <div className="tw-relative tw-h-[720px] tw-w-[1024px] tw-border tw-border-border tw-bg-muted/40">
        <div className="tw-p-4 tw-text-sm tw-text-muted-foreground">
          MediaViewer Drawer is rendered in a portal - look at the bottom of the viewport.
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MediaViewer>;

/** Single image - prev/next buttons hidden per BHV-452 single-image rule. */
export const Default: Story = {
  args: {
    images: [MOCK_VIEWER_IMAGE_CORINTH],
    currentIndex: 0,
  },
};

/** Multi-image group, viewer positioned mid-sequence (currentIndex=1 of 4). */
export const WithNavigation: Story = {
  args: {
    images: MOCK_VIEWER_IMAGES,
    currentIndex: 1,
  },
};

/** First image of multi-image group - Previous button disabled. */
export const AtStart: Story = {
  args: {
    images: MOCK_VIEWER_IMAGES.slice(0, 3),
    currentIndex: 0,
  },
};

/** Last image of multi-image group - Next button disabled. */
export const AtEnd: Story = {
  args: {
    images: MOCK_VIEWER_IMAGES.slice(0, 3),
    currentIndex: 2,
  },
};

/** Zoomed-in 2x with a non-zero pan offset - drag-to-pan is enabled. */
export const ZoomedIn: Story = {
  args: {
    images: MOCK_VIEWER_IMAGES,
    currentIndex: 0,
    zoomLevel: 2,
    panOffset: { x: 60, y: -40 },
  },
};

/** 1x zoom - Zoom-out button disabled (cannot go below fit-to-view). */
export const ZoomedOut: Story = {
  args: {
    images: MOCK_VIEWER_IMAGES,
    currentIndex: 0,
    zoomLevel: 1,
  },
};

/** Long caption that wraps in the footer (edge case from ui-spec wireframes). */
export const LongCaption: Story = {
  args: {
    images: [MOCK_VIEWER_IMAGE_LONG_CAPTION],
    currentIndex: 0,
  },
};

/** Loading overlay covers the canvas while bytes are being fetched. */
export const Loading: Story = {
  args: {
    images: MOCK_VIEWER_IMAGES,
    currentIndex: 0,
    isLoading: true,
  },
};

/**
 * Interactive variant: parent owns state and reacts to all callbacks. Demonstrates the full
 * UI-PKG-005 acceptance criteria in action - close, prev/next, zoom in/out, pan, keyboard nav. The
 * trigger button restores focus per Drawer focus management.
 */
export const Interactive: StoryObj<typeof MediaViewer> = {
  args: {
    open: false,
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open ?? false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const images: MediaImageRef[] = MOCK_VIEWER_IMAGES;

    const handleNext = () => {
      setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    };
    const handlePrev = () => {
      setCurrentIndex((i) => Math.max(i - 1, 0));
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    };
    const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 4));
    const handleZoomOut = () => {
      setZoomLevel((z) => {
        const next = Math.max(z - 0.25, 1);
        if (next <= 1) setPanOffset({ x: 0, y: 0 });
        return next;
      });
    };

    return (
      <div className="tw-flex tw-flex-col tw-gap-3 tw-p-4">
        <Button
          type="button"
          onClick={() => {
            setCurrentIndex(0);
            setZoomLevel(1);
            setPanOffset({ x: 0, y: 0 });
            setOpen(true);
          }}
        >
          Open MediaViewer
        </Button>
        <p className="tw-text-sm tw-text-muted-foreground">
          Try ArrowLeft/ArrowRight to navigate, +/- to zoom, drag to pan when zoomed, Escape to
          close.
        </p>
        <MediaViewer
          {...args}
          open={open}
          images={images}
          currentIndex={currentIndex}
          zoomLevel={zoomLevel}
          panOffset={panOffset}
          imageUrlResolver={mockMediaViewerImageUrlResolver}
          localizedStringsWithLoadingState={[localizedStrings, false]}
          onClose={() => setOpen(false)}
          onPrevious={handlePrev}
          onNext={handleNext}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onPanChange={setPanOffset}
        />
      </div>
    );
  },
};
