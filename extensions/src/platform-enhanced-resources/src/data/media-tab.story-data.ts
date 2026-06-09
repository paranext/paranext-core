/**
 * Shared mock data for media-tab Storybook stories. Derived from golden masters in
 * `.context/features/enhanced-resources/golden-masters/`:
 *
 * - Gm-012-image-reference-range (1CO 1:0 single-verse match) - shape for single-verse images
 * - Gm-013-image-grouping (ACT 2:0 -> ACT 5:last range) - shape for verse-range entries
 * - Gm-018-media-satellite-atlas-filter (Images vs Maps tab routing rules)
 *
 * Mirrors data-contracts.md MediaDisplayItem; rendered as MediaEntryRowData (display-only shape).
 *
 * No PAPI types are imported - all shapes are local to this design phase.
 */

import type { MediaEntryRowData } from '../components/media-tab/media-entry-row.component';

// ---------------------------------------------------------------------------
// Image fixtures - Images tab (collection != "Satellite Bible Atlas")
// ---------------------------------------------------------------------------

/** Single-verse image (gm-012 matchedImageId "one" at 1CO 1:0). */
export const MOCK_MEDIA_ENTRY_CORINTH: MediaEntryRowData = {
  imageId: 'corinth-ruins',
  title: 'Ruins of ancient Corinth',
  referenceLabel: '1CO 1:1',
  collection: 'General',
  mediaType: 'image',
};

/** Verse-range image (gm-013 ACT 2:0 -> ACT 5:last). Verse-ref-only (no lemma) per BHV-612. */
export const MOCK_MEDIA_ENTRY_PENTECOST: MediaEntryRowData = {
  imageId: 'pentecost-jerusalem',
  title: 'Pentecost gathering in Jerusalem',
  referenceLabel: 'ACT 2:1-5:42',
  collection: 'General',
  mediaType: 'image',
};

export const MOCK_MEDIA_ENTRY_TABERNACLE: MediaEntryRowData = {
  imageId: 'tabernacle-layout',
  title: 'Tabernacle layout diagram',
  referenceLabel: 'EXO 26:1-30',
  collection: 'General',
  mediaType: 'image',
};

export const MOCK_MEDIA_ENTRY_OLIVE_PRESS: MediaEntryRowData = {
  imageId: 'olive-press',
  title: 'First-century olive press',
  referenceLabel: 'MAT 26:36',
  collection: 'General',
  mediaType: 'image',
};

/** Images tab: 4 General entries (gm-018 row 1: General valid for Images). */
export const MOCK_MEDIA_IMAGES: MediaEntryRowData[] = [
  MOCK_MEDIA_ENTRY_CORINTH,
  MOCK_MEDIA_ENTRY_PENTECOST,
  MOCK_MEDIA_ENTRY_TABERNACLE,
  MOCK_MEDIA_ENTRY_OLIVE_PRESS,
];

// ---------------------------------------------------------------------------
// Map fixtures - Maps tab (collection === "Satellite Bible Atlas")
// ---------------------------------------------------------------------------

export const MOCK_MAP_ENTRY_GALILEE: MediaEntryRowData = {
  imageId: 'sba-galilee',
  title: 'Galilee region (Satellite Bible Atlas)',
  referenceLabel: 'MAT 4:12-25',
  collection: 'Satellite Bible Atlas',
  mediaType: 'map',
};

export const MOCK_MAP_ENTRY_ROMAN_EMPIRE: MediaEntryRowData = {
  imageId: 'sba-roman-empire',
  title: 'Roman Empire in the 1st century',
  referenceLabel: 'ACT 1:1-28:31',
  collection: 'Satellite Bible Atlas',
  mediaType: 'map',
};

export const MOCK_MAP_ENTRY_EXODUS: MediaEntryRowData = {
  imageId: 'sba-exodus-route',
  title: 'Exodus route from Egypt to Sinai',
  referenceLabel: 'EXO 12:37-19:2',
  collection: 'Satellite Bible Atlas',
  mediaType: 'map',
};

/** Maps tab: 3 Satellite Bible Atlas entries (gm-018 row 4: SBA valid for Maps). */
export const MOCK_MEDIA_MAPS: MediaEntryRowData[] = [
  MOCK_MAP_ENTRY_GALILEE,
  MOCK_MAP_ENTRY_ROMAN_EMPIRE,
  MOCK_MAP_ENTRY_EXODUS,
];

// ---------------------------------------------------------------------------
// Resolvers (FN-009 seam) - production code injects a papi-er:// resolver; stories use
// placehold.co so thumbnails render without a backend.
// ---------------------------------------------------------------------------

/** Thumbnail URL resolver for the media-tab list (small thumbs ~120x80). */
export function mockMediaThumbnailUrlResolver(imageId: string): string {
  const labels: Record<string, string> = {
    'corinth-ruins': 'Corinth',
    'pentecost-jerusalem': 'Pentecost',
    'tabernacle-layout': 'Tabernacle',
    'olive-press': 'OlivePress',
    'sba-galilee': 'Galilee',
    'sba-roman-empire': 'Roman+Empire',
    'sba-exodus-route': 'Exodus',
  };
  const label = labels[imageId] ?? imageId;
  return `https://placehold.co/120x80?text=${encodeURIComponent(label)}`;
}
