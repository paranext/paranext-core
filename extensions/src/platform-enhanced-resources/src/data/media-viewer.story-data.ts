/**
 * Shared mock data for media-viewer Storybook stories. Derived from golden masters in
 * `.context/features/enhanced-resources/golden-masters/`:
 *
 * - Gm-012-image-reference-range (1CO 1:0 single-verse match) - shape for single image
 * - Gm-013-image-grouping (ACT 2:0 -> ACT 5:last range) - shape for multi-image navigation
 * - Gm-018-media-satellite-atlas-filter (separate Image vs Map collections)
 *
 * Mirrors ui-state-contracts.md MediaImageRef. No PAPI types imported - shapes are local to the
 * design phase. Production wiring maps `imageId` -> `papi-er://images/{id}` (FN-009 seam); stories
 * use placehold.co.
 */

import type { MediaImageRef } from '../components/media-viewer/media-viewer.component';

/** Single-verse image (gm-012 matched at 1CO 1:0). */
export const MOCK_VIEWER_IMAGE_CORINTH: MediaImageRef = {
  imageId: 'corinth-ruins',
  imageSource: 'corinth-ruins',
  title: 'Ruins of ancient Corinth (Acrocorinth in background)',
  referenceRange: {
    start: { book: 'CO1', chapterNum: 1, verseNum: 1 },
    end: { book: 'CO1', chapterNum: 1, verseNum: 1 },
  },
};

/** Verse-range image (gm-013 ACT 2:0 -> ACT 5:last). */
export const MOCK_VIEWER_IMAGE_PENTECOST: MediaImageRef = {
  imageId: 'pentecost-jerusalem',
  imageSource: 'pentecost-jerusalem',
  title: 'Pentecost gathering in Jerusalem',
  referenceRange: {
    start: { book: 'ACT', chapterNum: 2, verseNum: 1 },
    end: { book: 'ACT', chapterNum: 5, verseNum: 42 },
  },
};

export const MOCK_VIEWER_IMAGE_TABERNACLE: MediaImageRef = {
  imageId: 'tabernacle-layout',
  imageSource: 'tabernacle-layout',
  title: 'Tabernacle layout diagram',
  referenceRange: {
    start: { book: 'EXO', chapterNum: 26, verseNum: 1 },
    end: { book: 'EXO', chapterNum: 26, verseNum: 30 },
  },
};

export const MOCK_VIEWER_IMAGE_OLIVE_PRESS: MediaImageRef = {
  imageId: 'olive-press',
  imageSource: 'olive-press',
  title: 'First-century olive press at Gethsemane',
  referenceRange: {
    start: { book: 'MAT', chapterNum: 26, verseNum: 36 },
    end: { book: 'MAT', chapterNum: 26, verseNum: 36 },
  },
};

/** Long caption for the LongCaption story - exercises wrapping. */
export const MOCK_VIEWER_IMAGE_LONG_CAPTION: MediaImageRef = {
  imageId: 'cosmology-diagram',
  imageSource: 'cosmology-diagram',
  title:
    'Ancient Near Eastern cosmology diagram: the three-tiered universe with the heavens above, ' +
    'the earth and seas in the middle, and the underworld (Sheol) below - reconstructed from ' +
    'various biblical and extra-biblical sources including Genesis 1, Job 38, and the Enuma Elish.',
  referenceRange: {
    start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    end: { book: 'GEN', chapterNum: 1, verseNum: 31 },
  },
};

/** Multi-image group (4 images) for navigation stories. */
export const MOCK_VIEWER_IMAGES: MediaImageRef[] = [
  MOCK_VIEWER_IMAGE_CORINTH,
  MOCK_VIEWER_IMAGE_PENTECOST,
  MOCK_VIEWER_IMAGE_TABERNACLE,
  MOCK_VIEWER_IMAGE_OLIVE_PRESS,
];

// ---------------------------------------------------------------------------
// Resolver (FN-009 seam) - production code injects a papi-er://images/{id} resolver.
// Stories use placehold.co at large display size so the viewer renders without a backend.
// ---------------------------------------------------------------------------

const FULL_SIZE_LABELS: Record<string, string> = {
  'corinth-ruins': 'Corinth+Ruins',
  'pentecost-jerusalem': 'Pentecost',
  'tabernacle-layout': 'Tabernacle',
  'olive-press': 'Olive+Press',
  'cosmology-diagram': 'Cosmology+Diagram',
};

/** Full-size image URL resolver for the viewer (~800x600). */
export function mockMediaViewerImageUrlResolver(imageId: string): string {
  const label = FULL_SIZE_LABELS[imageId] ?? imageId;
  return `https://placehold.co/800x600?text=${encodeURIComponent(label)}`;
}
