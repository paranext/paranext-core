// Z-INDEX SCALE — see also src/renderer/styles/_vars.scss for SCSS consumers
// rc-dock floating tabs manage their own z-index up to ~200

/** Z-index for elements that need to appear above rc-dock floating tabs (~200) */
export const Z_INDEX_ABOVE_DOCK = 250;
/** Z-index for the footnote editor layer */
export const Z_INDEX_FOOTNOTE_EDITOR = 300;
/** Z-index for overlay popovers and context menus */
export const Z_INDEX_OVERLAY = 400;
/** Z-index for the semi-transparent backdrop behind modal dialogs */
export const Z_INDEX_MODAL_BACKDROP = 450;
/** Z-index for modal dialog content */
export const Z_INDEX_MODAL = 500;
