// Z-INDEX SCALE — see also src/renderer/styles/_vars.scss for SCSS consumers
// rc-dock floating tabs manage their own z-index up to ~200

/**
 * Z-index for elements that need to appear above rc-dock floating tabs and potential modals (~200)
 * — the menubar, and every `PopoverContent`.
 *
 * At 600 this sits above the overlay and modal layers, which is why content portalled out of a
 * popover needs {@link Z_INDEX_ABOVE_POPOVER} to stay visible. One consequence is unresolved and
 * deliberately not papered over here: a popover renders OVER a modal dialog ({@link Z_INDEX_MODAL},
 * 500). That wants the scale re-ordered rather than another constant raised.
 */
export const Z_INDEX_ABOVE_DOCK = 600;
/**
 * Z-index for content that is portalled OUT of a popover and must still render over it — a Radix
 * dropdown, menu, or select opened from inside `PopoverContent`.
 *
 * Radix portals such content to `document.body` rather than nesting it inside the popover, so the
 * two become stacking SIBLINGS: the popover's own {@link Z_INDEX_ABOVE_DOCK} competes directly with
 * whatever the portalled child asks for, and anything lower renders behind the popover it belongs
 * to. Must therefore stay above {@link Z_INDEX_ABOVE_DOCK} and below {@link Z_INDEX_FIRST_RUN}, which
 * gates the whole app. Pinned by `z-index.test.tsx`.
 *
 * Note this is only needed because {@link Z_INDEX_ABOVE_DOCK} sits so high; see its own doc.
 */
export const Z_INDEX_ABOVE_POPOVER = 650;
/**
 * Z-index for the renderer's in-page overlay service (`src/renderer/components/overlays/`) and the
 * character-marker bar.
 */
export const Z_INDEX_OVERLAY = 400;
/** Z-index for the semi-transparent backdrop behind modal dialogs */
export const Z_INDEX_MODAL_BACKDROP = 450;
/** Z-index for modal dialog content */
export const Z_INDEX_MODAL = 500;
/**
 * Z-index for tooltips. Must sit above every layer that can contain a tooltip trigger — modal
 * dialogs, the popover layer, and content portalled out of a popover ({@link Z_INDEX_ABOVE_POPOVER})
 * — or a tooltip on a control inside one of them renders behind it.
 */
export const Z_INDEX_TOOLTIP = 675;
/**
 * Z-index for the first-run setup wizard gate. Must sit above every other layer (including the
 * popover layers and tooltips) so the wizard fully gates the app at startup and nothing behind it
 * remains clickable or focusable.
 */
export const Z_INDEX_FIRST_RUN = 700;
