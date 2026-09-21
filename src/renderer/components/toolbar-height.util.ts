/**
 * Height in px of the main toolbar, which every layer positioned below it must clear.
 *
 * These mirror the toolbar's own Tailwind heights — `tw:h-12` in Power mode, `tw:h-14` in Simple —
 * applied in `platform-bible-toolbar.tsx`. That component cannot export them, because the value it
 * holds is a class name rather than a number, so this is the one place the px equivalents live.
 * Anything that needs to sit below the toolbar must read them from here rather than restating the
 * literals, so a toolbar height change lands in a single place.
 *
 * This module deliberately has no imports, so anything that needs the clearance can take it without
 * taking a dependency graph with it. In particular the constants cannot live in
 * `platform-dock-layout-positioning.util.ts` alongside the other layout geometry: that module
 * imports the dialogs barrel, and from there cycles back through `use-project-picker-data.hook.ts`
 * to `web-view.service-host.ts` — the same cycle `dock-tab-group.util.ts` was extracted to avoid,
 * and the reason that module's own header explains.
 *
 * Note this is an import-cycle constraint, not a runtime one. The connection-lost overlay's
 * PAPI-free invariant is about round TRIPS on the reaction path — its hooks resolve while the
 * socket is alive and hold their values afterwards — not about which modules it imports; it already
 * reaches the network services transitively through `platform-bible-react` and its PAPI hooks. A
 * dead websocket does not make an imported module fail.
 */
export const POWER_MODE_TOOLBAR_HEIGHT = 48;
export const SIMPLE_MODE_TOOLBAR_HEIGHT = 56;

/** Height in px of the main toolbar in the given interface mode. */
export function getToolbarHeight(isPowerMode: boolean): number {
  return isPowerMode ? POWER_MODE_TOOLBAR_HEIGHT : SIMPLE_MODE_TOOLBAR_HEIGHT;
}
