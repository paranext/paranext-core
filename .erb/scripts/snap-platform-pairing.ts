/**
 * Facts about the GNOME platform snap the Linux build mounts, shared by the two guards that check
 * it from opposite ends: `electron-builder-snap-config.test.ts` reads the inputs (this repo's
 * config and the patched snapcraft template), and `assert-generated-snap-metadata.util.ts` reads
 * the metadata electron-builder actually generates.
 *
 * They live here rather than in either guard because a second copy that drifted from the first
 * would defeat both: each would keep passing against its own stale idea of the correct pairing.
 */

/**
 * The GNOME platform content snap that pairs with each snap base.
 *
 * These must stay in step: a base and a platform snap from different Ubuntu releases put the app's
 * staged libraries and the mounted platform libraries out of sync, and the app fails to launch. The
 * full rationale lives beside `base` in `electron-builder.json5`.
 */
export const GNOME_PLATFORM_BY_BASE: Readonly<Partial<Record<string, string>>> = {
  core18: 'gnome-3-28-1804',
  core20: 'gnome-3-38-2004',
  core22: 'gnome-42-2204',
  core24: 'gnome-46-2404',
};

/** Mount point the snap's launch scripts read the GNOME platform from. */
export const GNOME_PLATFORM_TARGET = '$SNAP/gnome-platform';
