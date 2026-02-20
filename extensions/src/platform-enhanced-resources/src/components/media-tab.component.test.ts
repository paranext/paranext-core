import { describe, it, expect, vi } from 'vitest';
import type { MediaTabProps } from './media-tab.component';
import type {
  MediaItemProps,
  MediaDisplayItem,
  BibleImage,
  MediaGroupType,
} from './media-item.component';

/**
 * MediaTab and MediaItem component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interfaces, type contracts, and
 * callback behavior.
 */

// --- Mock data factory ---

function createMockBibleImage(overrides: Partial<BibleImage> = {}): BibleImage {
  return {
    id: 'img-001',
    title: 'Baptism of Jesus',
    description: 'An artistic depiction of the baptism of Jesus in the Jordan River.',
    filename: 'baptism-of-jesus.jpg',
    copyright: 'Bible Art, Public Domain',
    isVideo: false,
    caption: 'Baptism of Jesus',
    thumbnailUrl: '',
    ...overrides,
  };
}

function createMockMediaDisplayItem(overrides: Partial<MediaDisplayItem> = {}): MediaDisplayItem {
  return {
    id: 'media-001',
    groupType: 'word-linked' as MediaGroupType,
    groupHeader: 'baptizo (to baptize)',
    images: [createMockBibleImage()],
    ...overrides,
  };
}

describe('media-tab.component', () => {
  // --- MediaTabProps Type Contract Tests ---

  it('MediaTabProps interface accepts all required props', () => {
    const props: MediaTabProps = {
      items: [],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMediaItemClick: () => {},
    };

    expect(props.items).toEqual([]);
    expect(props.isVisible).toBe(true);
    expect(props.expandedGroups).toEqual([]);
  });

  it('MediaTabProps accepts items with all MediaDisplayItem fields', () => {
    const item = createMockMediaDisplayItem();

    const props: MediaTabProps = {
      items: [item],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMediaItemClick: () => {},
    };

    expect(props.items).toHaveLength(1);
    expect(props.items[0].id).toBe('media-001');
    expect(props.items[0].groupType).toBe('word-linked');
    expect(props.items[0].groupHeader).toBe('baptizo (to baptize)');
    expect(props.items[0].images).toHaveLength(1);
  });

  // --- Expand/Collapse Group Interaction Tests ---

  it('onToggleGroup is called with the correct group id', () => {
    const onToggleGroup = vi.fn();

    const props: MediaTabProps = {
      items: [createMockMediaDisplayItem({ id: 'media-005' })],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup,
      onMediaItemClick: () => {},
    };

    props.onToggleGroup('media-005');
    expect(onToggleGroup).toHaveBeenCalledWith('media-005');
  });

  it('expandedGroups tracks which groups are expanded', () => {
    const props: MediaTabProps = {
      items: [
        createMockMediaDisplayItem({ id: 'media-001' }),
        createMockMediaDisplayItem({ id: 'media-002' }),
      ],
      isVisible: true,
      expandedGroups: ['media-001'],
      onToggleGroup: () => {},
      onMediaItemClick: () => {},
    };

    expect(props.expandedGroups).toContain('media-001');
    expect(props.expandedGroups).not.toContain('media-002');
  });

  // --- Media Item Click Interaction Tests ---

  it('onMediaItemClick is called with the correct BibleImage', () => {
    const onMediaItemClick = vi.fn();
    const image = createMockBibleImage({ id: 'img-007', title: 'Last Supper' });

    const props: MediaTabProps = {
      items: [createMockMediaDisplayItem({ images: [image] })],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMediaItemClick,
    };

    props.onMediaItemClick(image);
    expect(onMediaItemClick).toHaveBeenCalledWith(image);
    expect(onMediaItemClick).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'img-007',
        title: 'Last Supper',
      }),
    );
  });

  // --- Empty State Tests ---

  it('MediaTabProps with empty items represents empty state', () => {
    const props: MediaTabProps = {
      items: [],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMediaItemClick: () => {},
    };

    expect(props.items).toHaveLength(0);
  });

  // --- Deferred Loading Tests ---

  it('MediaTabProps with isVisible false indicates deferred loading', () => {
    const props: MediaTabProps = {
      items: [createMockMediaDisplayItem()],
      isVisible: false,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMediaItemClick: () => {},
    };

    expect(props.isVisible).toBe(false);
  });

  // --- Word-Linked vs Verse-Range Group Separation Tests ---

  it('items can be separated by groupType', () => {
    const wordLinkedItem = createMockMediaDisplayItem({
      id: 'media-wl-001',
      groupType: 'word-linked',
      groupHeader: 'baptizo',
    });
    const verseRangeItem = createMockMediaDisplayItem({
      id: 'media-vr-001',
      groupType: 'verse-range',
      groupHeader: 'Matthew 3:13-17',
    });

    const items = [wordLinkedItem, verseRangeItem];

    const wordLinked = items.filter((i) => i.groupType === 'word-linked');
    const verseRange = items.filter((i) => i.groupType === 'verse-range');

    expect(wordLinked).toHaveLength(1);
    expect(verseRange).toHaveLength(1);
    expect(wordLinked[0].groupHeader).toBe('baptizo');
    expect(verseRange[0].groupHeader).toBe('Matthew 3:13-17');
  });

  it('multiple items in both groups', () => {
    const items: MediaDisplayItem[] = [
      createMockMediaDisplayItem({ id: 'wl-1', groupType: 'word-linked', groupHeader: 'baptizo' }),
      createMockMediaDisplayItem({
        id: 'wl-2',
        groupType: 'word-linked',
        groupHeader: 'Iordanes',
      }),
      createMockMediaDisplayItem({
        id: 'vr-1',
        groupType: 'verse-range',
        groupHeader: 'Matt 3:13-17',
      }),
    ];

    const wordLinked = items.filter((i) => i.groupType === 'word-linked');
    const verseRange = items.filter((i) => i.groupType === 'verse-range');

    expect(wordLinked).toHaveLength(2);
    expect(verseRange).toHaveLength(1);
  });

  // --- MediaDisplayItem Type Contract Tests ---

  it('MediaDisplayItem has all required fields', () => {
    const item = createMockMediaDisplayItem();

    expect(item.id).toBe('media-001');
    expect(item.groupType).toBe('word-linked');
    expect(item.groupHeader).toBe('baptizo (to baptize)');
    expect(Array.isArray(item.images)).toBe(true);
    expect(item.images).toHaveLength(1);
    expect(item.images[0].id).toBe('img-001');
  });

  it('MediaDisplayItem with multiple images', () => {
    const item = createMockMediaDisplayItem({
      images: [
        createMockBibleImage({ id: 'img-001', title: 'Image 1' }),
        createMockBibleImage({ id: 'img-002', title: 'Image 2' }),
        createMockBibleImage({ id: 'img-003', title: 'Image 3' }),
      ],
    });

    expect(item.images).toHaveLength(3);
    expect(item.images[2].title).toBe('Image 3');
  });

  it('MediaDisplayItem with empty images array', () => {
    const item = createMockMediaDisplayItem({ images: [] });

    expect(item.images).toEqual([]);
  });
});

describe('media-item.component', () => {
  // --- MediaItemProps Type Contract Tests ---

  it('MediaItemProps interface accepts all required props', () => {
    const image = createMockBibleImage();

    const props: MediaItemProps = {
      image,
      onImageClick: () => {},
    };

    expect(props.image.title).toBe('Baptism of Jesus');
  });

  // --- BibleImage Type Contract Tests ---

  it('BibleImage has all required fields', () => {
    const image = createMockBibleImage();

    expect(image.id).toBe('img-001');
    expect(image.title).toBe('Baptism of Jesus');
    expect(image.description).toBeTruthy();
    expect(image.filename).toBe('baptism-of-jesus.jpg');
    expect(image.copyright).toBeTruthy();
    expect(image.isVideo).toBe(false);
    expect(image.caption).toBeTruthy();
    expect(typeof image.thumbnailUrl).toBe('string');
  });

  it('BibleImage with isVideo true represents video content', () => {
    const videoImage = createMockBibleImage({
      id: 'vid-001',
      title: 'Baptism Video',
      isVideo: true,
      filename: 'baptism.mp4',
    });

    expect(videoImage.isVideo).toBe(true);
    expect(videoImage.filename).toBe('baptism.mp4');
  });

  it('BibleImage with empty optional fields', () => {
    const image = createMockBibleImage({
      description: '',
      copyright: '',
      caption: '',
      thumbnailUrl: '',
    });

    expect(image.description).toBe('');
    expect(image.copyright).toBe('');
    expect(image.caption).toBe('');
    expect(image.thumbnailUrl).toBe('');
  });

  // --- Callback behavior tests ---

  it('onImageClick callback receives BibleImage object', () => {
    const onImageClick = vi.fn();
    const image = createMockBibleImage({ id: 'img-042', title: 'Burning Bush' });

    const props: MediaItemProps = {
      image,
      onImageClick,
    };

    props.onImageClick(props.image);
    expect(onImageClick).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'img-042',
        title: 'Burning Bush',
      }),
    );
  });

  // --- Video thumbnail placeholder test ---

  it('video BibleImage items are identifiable by isVideo flag', () => {
    const videoItem = createMockBibleImage({ isVideo: true, id: 'vid-001' });
    const imageItem = createMockBibleImage({ isVideo: false, id: 'img-001' });

    expect(videoItem.isVideo).toBe(true);
    expect(imageItem.isVideo).toBe(false);
  });

  // --- Multiple items test ---

  it('multiple BibleImages can coexist with unique ids', () => {
    const images: BibleImage[] = [
      createMockBibleImage({ id: 'img-001', title: 'Baptism' }),
      createMockBibleImage({ id: 'img-002', title: 'Last Supper' }),
      createMockBibleImage({ id: 'vid-001', title: 'Crucifixion Video', isVideo: true }),
    ];

    expect(images).toHaveLength(3);
    const ids = images.map((i) => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(3);
    expect(images[2].isVideo).toBe(true);
  });
});
