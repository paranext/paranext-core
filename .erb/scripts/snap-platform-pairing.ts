// Shared by the two snap guards rather than copied into both, since copies that drifted would
// leave each passing against its own stale idea of the correct pairing. See
// `assert-generated-snap-metadata.ts` for what each guard covers.

/**
 * The GNOME platform content snap that pairs with each snap base. Mismatched releases put the app's
 * staged libraries and the mounted platform libraries out of sync and it fails to launch; full
 * rationale sits beside `base` in `electron-builder.json5`.
 */
export const GNOME_PLATFORM_BY_BASE: Readonly<Partial<Record<string, string>>> = {
  core18: 'gnome-3-28-1804',
  core20: 'gnome-3-38-2004',
  core22: 'gnome-42-2204',
  core24: 'gnome-46-2404',
};

/** Mount point the snap's launch scripts read the GNOME platform from. */
export const GNOME_PLATFORM_TARGET = '$SNAP/gnome-platform';
