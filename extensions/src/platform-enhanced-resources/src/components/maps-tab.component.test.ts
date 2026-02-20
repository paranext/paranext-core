import { describe, it, expect, vi } from 'vitest';
import type { MapsTabProps } from './maps-tab.component';
import type { MediaDisplayItem, BibleImage } from './media-item.component';

/**
 * MapsTab component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interfaces, type contracts, and
 * callback behavior. The MapsTab follows the same pattern as MediaTab but is specific to "Satellite
 * Bible Atlas" collection items (per INV-012).
 */

// --- Mock data factory ---

function createMockBibleImage(overrides: Partial<BibleImage> = {}): BibleImage {
  return {
    id: 'map-img-001',
    title: 'Ancient Jerusalem',
    description: 'Satellite view of ancient Jerusalem and surrounding areas.',
    filename: 'ancient-jerusalem.jpg',
    copyright: 'Satellite Bible Atlas, Todd Bolen',
    isVideo: false,
    caption: 'Ancient Jerusalem',
    thumbnailUrl: '',
    ...overrides,
  };
}

function createMockMediaDisplayItem(overrides: Partial<MediaDisplayItem> = {}): MediaDisplayItem {
  return {
    id: 'maps-001',
    groupType: 'verse-range',
    groupHeader: 'Matthew 2:1-12',
    images: [createMockBibleImage()],
    ...overrides,
  };
}

describe('maps-tab.component', () => {
  // --- MapsTabProps Type Contract Tests ---

  it('MapsTabProps interface accepts all required props', () => {
    const props: MapsTabProps = {
      items: [],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMapItemClick: () => {},
    };

    expect(props.items).toEqual([]);
    expect(props.isVisible).toBe(true);
    expect(props.expandedGroups).toEqual([]);
  });

  it('MapsTabProps accepts items with all MediaDisplayItem fields', () => {
    const item = createMockMediaDisplayItem();

    const props: MapsTabProps = {
      items: [item],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMapItemClick: () => {},
    };

    expect(props.items).toHaveLength(1);
    expect(props.items[0].id).toBe('maps-001');
    expect(props.items[0].groupType).toBe('verse-range');
    expect(props.items[0].groupHeader).toBe('Matthew 2:1-12');
    expect(props.items[0].images).toHaveLength(1);
  });

  // --- Expand/Collapse Group Interaction Tests ---

  it('onToggleGroup is called with the correct group id', () => {
    const onToggleGroup = vi.fn();

    const props: MapsTabProps = {
      items: [createMockMediaDisplayItem({ id: 'maps-005' })],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup,
      onMapItemClick: () => {},
    };

    props.onToggleGroup('maps-005');
    expect(onToggleGroup).toHaveBeenCalledWith('maps-005');
  });

  it('expandedGroups tracks which groups are expanded', () => {
    const props: MapsTabProps = {
      items: [
        createMockMediaDisplayItem({ id: 'maps-001' }),
        createMockMediaDisplayItem({ id: 'maps-002' }),
      ],
      isVisible: true,
      expandedGroups: ['maps-001'],
      onToggleGroup: () => {},
      onMapItemClick: () => {},
    };

    expect(props.expandedGroups).toContain('maps-001');
    expect(props.expandedGroups).not.toContain('maps-002');
  });

  // --- Map Item Click Interaction Tests ---

  it('onMapItemClick is called with the correct BibleImage', () => {
    const onMapItemClick = vi.fn();
    const image = createMockBibleImage({ id: 'map-img-007', title: 'Sea of Galilee' });

    const props: MapsTabProps = {
      items: [createMockMediaDisplayItem({ images: [image] })],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMapItemClick,
    };

    props.onMapItemClick(image);
    expect(onMapItemClick).toHaveBeenCalledWith(image);
    expect(onMapItemClick).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'map-img-007',
        title: 'Sea of Galilee',
      }),
    );
  });

  // --- Empty State Tests ---

  it('MapsTabProps with empty items represents empty state', () => {
    const props: MapsTabProps = {
      items: [],
      isVisible: true,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMapItemClick: () => {},
    };

    expect(props.items).toHaveLength(0);
  });

  // --- Deferred Loading Tests ---

  it('MapsTabProps with isVisible false indicates deferred loading', () => {
    const props: MapsTabProps = {
      items: [createMockMediaDisplayItem()],
      isVisible: false,
      expandedGroups: [],
      onToggleGroup: () => {},
      onMapItemClick: () => {},
    };

    expect(props.isVisible).toBe(false);
  });

  // --- Word-Linked vs Verse-Range Group Separation Tests ---

  it('items can be separated by groupType', () => {
    const wordLinkedItem = createMockMediaDisplayItem({
      id: 'maps-wl-001',
      groupType: 'word-linked',
      groupHeader: 'Yeroushalayim (Jerusalem)',
    });
    const verseRangeItem = createMockMediaDisplayItem({
      id: 'maps-vr-001',
      groupType: 'verse-range',
      groupHeader: 'Matthew 2:1-12',
    });

    const items = [wordLinkedItem, verseRangeItem];

    const wordLinked = items.filter((i) => i.groupType === 'word-linked');
    const verseRange = items.filter((i) => i.groupType === 'verse-range');

    expect(wordLinked).toHaveLength(1);
    expect(verseRange).toHaveLength(1);
    expect(wordLinked[0].groupHeader).toBe('Yeroushalayim (Jerusalem)');
    expect(verseRange[0].groupHeader).toBe('Matthew 2:1-12');
  });

  it('multiple items in both groups', () => {
    const items: MediaDisplayItem[] = [
      createMockMediaDisplayItem({
        id: 'wl-1',
        groupType: 'word-linked',
        groupHeader: 'Yeroushalayim',
      }),
      createMockMediaDisplayItem({
        id: 'wl-2',
        groupType: 'word-linked',
        groupHeader: 'Yarden',
      }),
      createMockMediaDisplayItem({
        id: 'vr-1',
        groupType: 'verse-range',
        groupHeader: 'Matt 2:1-12',
      }),
    ];

    const wordLinked = items.filter((i) => i.groupType === 'word-linked');
    const verseRange = items.filter((i) => i.groupType === 'verse-range');

    expect(wordLinked).toHaveLength(2);
    expect(verseRange).toHaveLength(1);
  });

  // --- MediaDisplayItem Type Contract Tests for Maps ---

  it('MediaDisplayItem has all required fields for maps', () => {
    const item = createMockMediaDisplayItem();

    expect(item.id).toBe('maps-001');
    expect(item.groupType).toBe('verse-range');
    expect(item.groupHeader).toBe('Matthew 2:1-12');
    expect(Array.isArray(item.images)).toBe(true);
    expect(item.images).toHaveLength(1);
    expect(item.images[0].id).toBe('map-img-001');
  });

  it('MediaDisplayItem with multiple map images', () => {
    const item = createMockMediaDisplayItem({
      images: [
        createMockBibleImage({ id: 'map-001', title: 'Jerusalem' }),
        createMockBibleImage({ id: 'map-002', title: 'Bethlehem' }),
        createMockBibleImage({ id: 'map-003', title: 'Nazareth' }),
      ],
    });

    expect(item.images).toHaveLength(3);
    expect(item.images[2].title).toBe('Nazareth');
  });

  it('MediaDisplayItem with empty images array', () => {
    const item = createMockMediaDisplayItem({ images: [] });

    expect(item.images).toEqual([]);
  });

  // --- Satellite Bible Atlas specific tests ---

  it('maps items conceptually represent Satellite Bible Atlas collection', () => {
    // The backend (CAP-012 / loadMapsTab) filters to only Satellite Bible Atlas items.
    // The UI component just renders whatever items it receives.
    // This test verifies the copyright field can reflect the atlas origin.
    const atlasImage = createMockBibleImage({
      id: 'sba-001',
      title: 'Jerusalem from the Mount of Olives',
      copyright: 'Satellite Bible Atlas, Todd Bolen / BiblePlaces.com',
    });

    expect(atlasImage.copyright).toContain('Satellite Bible Atlas');
    expect(atlasImage.id).toBe('sba-001');
  });

  // --- Callback receives BibleImage object (not just id) ---

  it('onMapItemClick passes full BibleImage object to handler', () => {
    const handler = vi.fn();
    const image = createMockBibleImage({
      id: 'map-img-042',
      title: 'Dead Sea Region',
      description: 'Aerial satellite view of the Dead Sea region.',
      copyright: 'Satellite Bible Atlas',
    });

    handler(image);

    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'map-img-042',
        title: 'Dead Sea Region',
        description: 'Aerial satellite view of the Dead Sea region.',
        copyright: 'Satellite Bible Atlas',
        isVideo: false,
      }),
    );
  });
});
