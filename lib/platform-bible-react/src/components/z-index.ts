// Z-INDEX SCALE — see also src/renderer/styles/_vars.scss for SCSS consumers
// rc-dock floating tabs manage their own z-index up to ~200

/**
 * Z-index for elements that need to appear above rc-dock floating tabs and potential modals (~200)
 * — the menubar, and every `PopoverContent`.
 *
 * At 600 this sits above the overlay, modal, and tooltip layers, which is why content portalled out
 * of a popover needs {@link Z_INDEX_ABOVE_POPOVER} to stay visible. Two consequences are unresolved
 * and deliberately not papered over here: a tooltip triggered from inside a popover
 * (`Z_INDEX_TOOLTIP`, 550) renders BEHIND it, and a popover renders OVER a modal dialog
 * ({@link Z_INDEX_MODAL}, 500). Both want the scale re-ordered rather than another constant raised.
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
 * gates the whole app. Pinned by `z-index.test.ts`.
 *
 * Note this is only needed because {@link Z_INDEX_ABOVE_DOCK} sits so high; see its own doc.
 */
export const Z_INDEX_ABOVE_POPOVER = 650;
/** Z-index for overlay popovers and context menus */
export const Z_INDEX_OVERLAY = 400;
/** Z-index for the semi-transparent backdrop behind modal dialogs */
export const Z_INDEX_MODAL_BACKDROP = 450;
/** Z-index for modal dialog content */
export const Z_INDEX_MODAL = 500;
/**
 * Z-index for tooltips — must render above modal dialogs since tooltips can be triggered from
 * elements inside a modal (e.g. help icons in form fields).
 */
export const Z_INDEX_TOOLTIP = 550;
/**
 * Z-index for the one-shot onboarding tour spotlight. Sits above Z_INDEX_ABOVE_DOCK and
 * Z_INDEX_TOOLTIP so it can spotlight toolbar buttons and columns, but below Z_INDEX_FIRST_RUN so
 * the wizard always wins if both are mounted.
 */
export const Z_INDEX_ONBOARDING_TOUR = 650;
/**
 * Z-index for the first-run setup wizard gate. Must sit above every other layer (including
 * Z_INDEX_ABOVE_DOCK and Z_INDEX_TOOLTIP) so the wizard fully gates the app at startup and nothing
 * behind it remains clickable or focusable.
 */
export const Z_INDEX_FIRST_RUN = 700;
