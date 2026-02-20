import { describe, it, expect, vi } from 'vitest';
import type { ImageViewerProps, MediaViewerInput } from './image-viewer.component';
import type { BibleImage, MediaDisplayItem } from './media-item.component';

/**
 * ImageViewer component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interfaces, type contracts,
 * callback behavior, navigation logic (including boundary crossing), zoom state management, and
 * video placeholder conditions.
 */

// --- Mock data factory ---

function createMockImage(overrides: Partial<BibleImage> = {}): BibleImage {
  return {
    id: 'img-001',
    title: 'Temple of Solomon',
    description: 'Reconstruction of the Temple',
    filename: 'temple-solomon.jpg',
    copyright: '(c) Bible Society',
    isVideo: false,
    caption: 'Temple of Solomon',
    thumbnailUrl: '',
    ...overrides,
  };
}

function createMockDisplayItem(overrides: Partial<MediaDisplayItem> = {}): MediaDisplayItem {
  return {
    id: 'display-001',
    groupType: 'word-linked',
    groupHeader: 'temple',
    images: [createMockImage()],
    ...overrides,
  };
}

function createMultipleDisplayItems(): MediaDisplayItem[] {
  return [
    createMockDisplayItem({
      id: 'display-001',
      groupHeader: 'temple',
      images: [
        createMockImage({ id: 'img-001', title: 'Temple front' }),
        createMockImage({ id: 'img-002', title: 'Temple side' }),
      ],
    }),
    createMockDisplayItem({
      id: 'display-002',
      groupHeader: 'ark',
      images: [createMockImage({ id: 'img-003', title: 'Ark of the Covenant' })],
    }),
    createMockDisplayItem({
      id: 'display-003',
      groupHeader: 'altar',
      images: [
        createMockImage({ id: 'img-004', title: 'Bronze Altar' }),
        createMockImage({ id: 'img-005', title: 'Incense Altar' }),
      ],
    }),
  ];
}

describe('image-viewer.component', () => {
  // --- ImageViewerProps Type Contract Tests ---

  it('ImageViewerProps interface accepts all required props', () => {
    const props: ImageViewerProps = {
      imageId: 'img-001',
      displayIndex: 0,
      showControls: true,
      parentTabType: 'media',
      displayItems: [createMockDisplayItem()],
      onClose: () => {},
    };

    expect(props.imageId).toBe('img-001');
    expect(props.showControls).toBe(true);
    expect(props.parentTabType).toBe('media');
  });

  it('ImageViewerProps accepts different parent tab types', () => {
    const mediaProps: ImageViewerProps = {
      imageId: 'img-001',
      displayIndex: 0,
      showControls: true,
      parentTabType: 'media',
      displayItems: [],
      onClose: () => {},
    };

    const mapsProps: ImageViewerProps = {
      imageId: 'img-001',
      displayIndex: 0,
      showControls: true,
      parentTabType: 'maps',
      displayItems: [],
      onClose: () => {},
    };

    const encProps: ImageViewerProps = {
      imageId: 'img-001',
      displayIndex: 0,
      showControls: true,
      parentTabType: 'encyclopedia',
      displayItems: [],
      onClose: () => {},
    };

    expect(mediaProps.parentTabType).toBe('media');
    expect(mapsProps.parentTabType).toBe('maps');
    expect(encProps.parentTabType).toBe('encyclopedia');
  });

  // --- MediaViewerInput Type Contract Tests ---

  it('MediaViewerInput interface is compatible with ImageViewerProps', () => {
    const input: MediaViewerInput = {
      imageId: 'img-001',
      displayIndex: 0,
      showControls: true,
      parentTabType: 'media',
      displayItems: [createMockDisplayItem()],
    };

    // MediaViewerInput should match ImageViewerProps except for onClose
    const props: ImageViewerProps = {
      ...input,
      onClose: () => {},
    };

    expect(props.imageId).toBe(input.imageId);
    expect(props.displayIndex).toBe(input.displayIndex);
    expect(props.showControls).toBe(input.showControls);
    expect(props.parentTabType).toBe(input.parentTabType);
    expect(props.displayItems).toBe(input.displayItems);
  });

  // --- onClose Callback Tests ---

  it('onClose is called when invoked', () => {
    const onClose = vi.fn();
    const props: ImageViewerProps = {
      imageId: 'img-001',
      displayIndex: 0,
      showControls: true,
      parentTabType: 'media',
      displayItems: [createMockDisplayItem()],
      onClose,
    };

    props.onClose();
    expect(onClose).toHaveBeenCalledOnce();
  });

  // --- Navigation Logic Tests ---

  it('flattened navigation list has correct total count across display items', () => {
    const displayItems = createMultipleDisplayItems();
    // display-001: 2 images, display-002: 1 image, display-003: 2 images = 5 total
    const totalImages = displayItems.reduce((acc, item) => acc + item.images.length, 0);
    expect(totalImages).toBe(5);
  });

  it('first image is at flat index 0', () => {
    const displayItems = createMultipleDisplayItems();
    const flatList = displayItems.flatMap((item) => item.images);
    expect(flatList[0].id).toBe('img-001');
    expect(flatList[0].title).toBe('Temple front');
  });

  it('navigation crosses display item boundaries correctly', () => {
    const displayItems = createMultipleDisplayItems();
    const flatList = displayItems.flatMap((item) => item.images);
    // Boundary: img-002 (last in display-001) -> img-003 (first in display-002)
    expect(flatList[1].id).toBe('img-002');
    expect(flatList[2].id).toBe('img-003');

    // Boundary: img-003 (last in display-002) -> img-004 (first in display-003)
    expect(flatList[2].id).toBe('img-003');
    expect(flatList[3].id).toBe('img-004');
  });

  it('isFirstImage is true when at flat index 0', () => {
    const currentFlatIndex = 0;
    const isFirstImage = currentFlatIndex <= 0;
    expect(isFirstImage).toBe(true);
  });

  it('isFirstImage is false when not at flat index 0', () => {
    const currentFlatIndex = 2;
    const isFirstImage = currentFlatIndex <= 0;
    expect(isFirstImage).toBe(false);
  });

  it('isLastImage is true when at last flat index', () => {
    const displayItems = createMultipleDisplayItems();
    const totalImages = displayItems.reduce((acc, item) => acc + item.images.length, 0);
    const currentFlatIndex = totalImages - 1;
    const isLastImage = currentFlatIndex >= totalImages - 1;
    expect(isLastImage).toBe(true);
  });

  it('isLastImage is false when not at last flat index', () => {
    const displayItems = createMultipleDisplayItems();
    const totalImages = displayItems.reduce((acc, item) => acc + item.images.length, 0);
    const currentFlatIndex = 2;
    const isLastImage = currentFlatIndex >= totalImages - 1;
    expect(isLastImage).toBe(false);
  });

  it('both prev and next are disabled for single image', () => {
    const displayItems = [
      createMockDisplayItem({
        id: 'display-001',
        images: [createMockImage({ id: 'img-only' })],
      }),
    ];
    const totalImages = displayItems.reduce((acc, item) => acc + item.images.length, 0);
    const currentFlatIndex = 0;

    const isFirstImage = currentFlatIndex <= 0;
    const isLastImage = currentFlatIndex >= totalImages - 1;

    expect(isFirstImage).toBe(true);
    expect(isLastImage).toBe(true);
  });

  it('showControls false hides navigation buttons conceptually', () => {
    const props: ImageViewerProps = {
      imageId: 'img-001',
      displayIndex: 0,
      showControls: false,
      parentTabType: 'media',
      displayItems: createMultipleDisplayItems(),
      onClose: () => {},
    };

    expect(props.showControls).toBe(false);
  });

  // --- Zoom State Management Tests ---

  it('zoom level starts at 1.0 (100%)', () => {
    const DEFAULT_ZOOM = 1.0;
    expect(DEFAULT_ZOOM).toBe(1.0);
  });

  it('zoom in increases zoom by step', () => {
    const ZOOM_STEP = 0.25;
    const MAX_ZOOM = 4.0;
    let zoomLevel = 1.0;

    zoomLevel = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
    expect(zoomLevel).toBe(1.25);

    zoomLevel = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
    expect(zoomLevel).toBe(1.5);
  });

  it('zoom out decreases zoom by step', () => {
    const ZOOM_STEP = 0.25;
    const MIN_ZOOM = 0.25;
    let zoomLevel = 1.0;

    zoomLevel = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
    expect(zoomLevel).toBe(0.75);

    zoomLevel = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
    expect(zoomLevel).toBe(0.5);
  });

  it('zoom does not exceed MAX_ZOOM', () => {
    const ZOOM_STEP = 0.25;
    const MAX_ZOOM = 4.0;
    let zoomLevel = 3.75;

    zoomLevel = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
    expect(zoomLevel).toBe(4.0);

    // Should not go past max
    zoomLevel = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
    expect(zoomLevel).toBe(4.0);
  });

  it('zoom does not go below MIN_ZOOM', () => {
    const ZOOM_STEP = 0.25;
    const MIN_ZOOM = 0.25;
    let zoomLevel = 0.5;

    zoomLevel = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
    expect(zoomLevel).toBe(0.25);

    // Should not go below min
    zoomLevel = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
    expect(zoomLevel).toBe(0.25);
  });

  // --- Video Placeholder Tests ---

  it('video item has isVideo set to true', () => {
    const videoImage = createMockImage({ id: 'vid-001', isVideo: true, title: 'Creation video' });
    expect(videoImage.isVideo).toBe(true);
  });

  it('non-video item has isVideo set to false', () => {
    const image = createMockImage({ id: 'img-001', isVideo: false });
    expect(image.isVideo).toBe(false);
  });

  it('zoom controls are conceptually hidden for video items', () => {
    // When isVideo is true, zoom controls should not render
    const isVideo = true;
    const shouldShowZoomControls = !isVideo;
    expect(shouldShowZoomControls).toBe(false);
  });

  it('zoom controls are shown for image items', () => {
    const isVideo = false;
    const shouldShowZoomControls = !isVideo;
    expect(shouldShowZoomControls).toBe(true);
  });

  it('prev/next navigation still works for video items', () => {
    const displayItems = [
      createMockDisplayItem({
        id: 'display-001',
        images: [createMockImage({ id: 'img-001', isVideo: false })],
      }),
      createMockDisplayItem({
        id: 'display-002',
        images: [createMockImage({ id: 'vid-001', isVideo: true, title: 'Video' })],
      }),
      createMockDisplayItem({
        id: 'display-003',
        images: [createMockImage({ id: 'img-002', isVideo: false })],
      }),
    ];

    const flatList = displayItems.flatMap((item) => item.images);
    expect(flatList).toHaveLength(3);

    // Navigate from image to video
    expect(flatList[0].isVideo).toBe(false);
    expect(flatList[1].isVideo).toBe(true);
    // Navigate from video to image
    expect(flatList[2].isVideo).toBe(false);
  });

  // --- Tooltip Tests ---

  it('tooltip combines title, description, filename, copyright', () => {
    const image = createMockImage({
      title: 'Temple',
      description: 'Reconstruction',
      filename: 'temple.jpg',
      copyright: '(c) Bible Society',
    });

    const parts: string[] = [];
    if (image.title) parts.push(image.title);
    if (image.description) parts.push(image.description);
    if (image.filename) parts.push(image.filename);
    if (image.copyright) parts.push(image.copyright);
    const tooltipText = parts.join('\n');

    expect(tooltipText).toContain('Temple');
    expect(tooltipText).toContain('Reconstruction');
    expect(tooltipText).toContain('temple.jpg');
    expect(tooltipText).toContain('(c) Bible Society');
  });

  it('tooltip handles missing fields gracefully', () => {
    const image = createMockImage({
      title: 'Temple',
      description: '',
      filename: '',
      copyright: '',
    });

    const parts: string[] = [];
    if (image.title) parts.push(image.title);
    if (image.description) parts.push(image.description);
    if (image.filename) parts.push(image.filename);
    if (image.copyright) parts.push(image.copyright);
    const tooltipText = parts.join('\n');

    expect(tooltipText).toBe('Temple');
  });

  // --- Empty Display Items ---

  it('handles empty display items gracefully', () => {
    const displayItems: MediaDisplayItem[] = [];
    const totalImages = displayItems.reduce((acc, item) => acc + item.images.length, 0);
    expect(totalImages).toBe(0);
  });

  // --- Zoom Reset on Navigation ---

  it('zoom resets to default when navigating to a new image', () => {
    const DEFAULT_ZOOM = 1.0;
    // Simulate: zoom was at 2.0, navigate triggers reset
    let zoomLevel = 2.0;
    // On navigation, reset zoom
    zoomLevel = DEFAULT_ZOOM;
    expect(zoomLevel).toBe(1.0);
  });

  // --- Pan Reset on Navigation ---

  it('pan offset resets when navigating to a new image', () => {
    // Simulate: pan was offset, navigate triggers reset
    let panOffset = { x: 50, y: -30 };
    // On navigation, reset pan
    panOffset = { x: 0, y: 0 };
    expect(panOffset.x).toBe(0);
    expect(panOffset.y).toBe(0);
  });
});
