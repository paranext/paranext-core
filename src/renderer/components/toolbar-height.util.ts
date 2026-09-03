/**
 * Height in px of the main toolbar, which every layer positioned below it must clear.
 *
 * These mirror the toolbar's own Tailwind heights — `tw:h-12` in Power mode, `tw:h-14` in Simple —
 * applied in `platform-bible-toolbar.tsx`. That component cannot export them, because the value it
 * holds is a class name rather than a number, so this is the one place the px equivalents live.
 * Anything that needs to sit below the toolbar must read them from here rather than restating the
 * literals, so a toolbar height change lands in a single place.
 *
 * This module deliberately has no imports. Consumers include the connection-lost overlay, which
 * must render when the PAPI websocket is dead, so it cannot reach the toolbar clearance through a
 * module that pulls in the network services.
 */
export const POWER_MODE_TOOLBAR_HEIGHT = 48;
export const SIMPLE_MODE_TOOLBAR_HEIGHT = 56;

/** Height in px of the main toolbar in the given interface mode. */
export function getToolbarHeight(isPowerMode: boolean): number {
  return isPowerMode ? POWER_MODE_TOOLBAR_HEIGHT : SIMPLE_MODE_TOOLBAR_HEIGHT;
}
