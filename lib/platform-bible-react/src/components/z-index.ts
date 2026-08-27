// Z-INDEX SCALE — see also src/renderer/styles/_vars.scss for SCSS consumers
// rc-dock floating tabs manage their own z-index up to ~200

/** Z-index for elements that need to appear above rc-dock floating tabs and potential modals (~200) */
export const Z_INDEX_ABOVE_DOCK = 600;
/**
 * Z-index for the footnote editor's own portalled layers — its note-type and caller dropdowns.
 *
 * Must stay ABOVE {@link Z_INDEX_ABOVE_DOCK}: the footnote editor renders inside a `PopoverContent`,
 * which sets that value on itself, and a Radix dropdown portals to `document.body` rather than
 * nesting inside the popover — so the two are stacking siblings and a lower value puts the open
 * dropdown behind the popover it belongs to. Below {@link Z_INDEX_FIRST_RUN}, which gates the whole
 * app and must stay on top. Pinned by `z-index.test.ts`.
 */
export const Z_INDEX_FOOTNOTE_EDITOR = 650;
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
 * Z-index for the first-run setup wizard gate. Must sit above every other layer (including the
 * menubar at Z_INDEX_ABOVE_DOCK=600 and tooltips at 550) so the wizard fully gates the app at
 * startup and nothing behind it remains clickable or focusable.
 */
export const Z_INDEX_FIRST_RUN = 700;
