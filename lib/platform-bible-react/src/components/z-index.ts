// Z-INDEX SCALE — see also src/renderer/styles/_vars.scss for SCSS consumers
// rc-dock floating tabs manage their own z-index up to ~200

/** Z-index for elements that need to appear above rc-dock floating tabs and potential modals (~200) */
export const Z_INDEX_ABOVE_DOCK = 600;
/** Z-index for the footnote editor layer */
export const Z_INDEX_FOOTNOTE_EDITOR = 300;
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
