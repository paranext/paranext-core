/**
 * The width of the popovers that host `MarkerMenu` from the editor, shared by every menu that shows
 * the same kind of row (marker code + description) so they stay the same width: currently the
 * insert-marker menu (the editor web view's `showMarkersMenu` popover, opened by the marker-menu
 * trigger key) and the Simple-mode character-style menu.
 *
 * Width only. A narrow-pane cap (e.g. `tw:max-w-(--radix-popover-content-available-width)`) is not
 * included; add one separately where a consumer needs it.
 */
export const MARKER_MENU_POPOVER_WIDTH_CLASSES = 'tw:w-[500px]';
