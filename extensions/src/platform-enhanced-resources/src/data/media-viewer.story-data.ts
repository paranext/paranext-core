/**
 * Shared mock data for media-viewer Storybook stories. Derived from golden masters in
 * `.context/features/enhanced-resources/golden-masters/`:
 *
 * - Gm-012-image-reference-range (1CO 1:0 single-verse match) - shape for single image
 * - Gm-013-image-grouping (ACT 2:0 -> ACT 5:last range) - shape for multi-image navigation
 * - Gm-018-media-satellite-atlas-filter (separate Image vs Map collections)
 *
 * Mirrors the simplified MediaViewerItem shape - no verse-ref payload (the parent owns the
 * navigation logic and only passes the displayable item). Production wiring maps `imageId` ->
 * `papi-er://images/{id}` (FN-009 seam); stories use placehold.co.
 */

import type { MediaViewerItem } from '../components/media-viewer/media-viewer.component';

/** Single-verse image (gm-012 matched at 1CO 1:0). */
export const MOCK_VIEWER_IMAGE_CORINTH: MediaViewerItem = {
  imageId: 'corinth-ruins',
  title: 'Ruins of ancient Corinth (Acrocorinth in background)',
  mediaType: 'image',
  caption: '1CO 1:1',
};

/** Verse-range image (gm-013 ACT 2:0 -> ACT 5:last). */
export const MOCK_VIEWER_IMAGE_PENTECOST: MediaViewerItem = {
  imageId: 'pentecost-jerusalem',
  title: 'Pentecost gathering in Jerusalem',
  mediaType: 'image',
  caption: 'ACT 2:1-5:42',
};

export const MOCK_VIEWER_IMAGE_TABERNACLE: MediaViewerItem = {
  imageId: 'tabernacle-layout',
  title: 'Tabernacle layout diagram',
  mediaType: 'image',
  caption: 'EXO 26:1-30',
};

export const MOCK_VIEWER_IMAGE_OLIVE_PRESS: MediaViewerItem = {
  imageId: 'olive-press',
  title: 'First-century olive press at Gethsemane',
  mediaType: 'image',
  caption: 'MAT 26:36',
};

/** Long caption for the LongCaption story - exercises wrapping. */
export const MOCK_VIEWER_IMAGE_LONG_CAPTION: MediaViewerItem = {
  imageId: 'cosmology-diagram',
  title:
    'Ancient Near Eastern cosmology diagram: the three-tiered universe with the heavens above, ' +
    'the earth and seas in the middle, and the underworld (Sheol) below - reconstructed from ' +
    'various biblical and extra-biblical sources including Genesis 1, Job 38, and the Enuma Elish.',
  mediaType: 'image',
  caption:
    'A long caption that wraps in the Dialog footer to validate multi-line layout for verbose ' +
    'image descriptions (GEN 1:1-31).',
};

/** Map fixture - exercises the map media-type for the Map story. */
export const MOCK_VIEWER_MAP_GALILEE: MediaViewerItem = {
  imageId: 'sba-galilee',
  title: 'Galilee region (Satellite Bible Atlas)',
  mediaType: 'map',
  caption: 'MAT 4:12-25',
};

/** Multi-image group (4 images) for navigation stories. */
export const MOCK_VIEWER_IMAGES: MediaViewerItem[] = [
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
  'sba-galilee': 'Galilee+Map',
};

/** Full-size image URL resolver for the viewer (~800x600). */
export function mockMediaViewerImageUrlResolver(imageId: string): string {
  const label = FULL_SIZE_LABELS[imageId] ?? imageId;
  return `https://placehold.co/800x600?text=${encodeURIComponent(label)}`;
}
