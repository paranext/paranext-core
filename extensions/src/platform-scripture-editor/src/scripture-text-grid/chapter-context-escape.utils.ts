/**
 * Windows and menus Escape closes by itself, such as a cell's copyright details, its right-click
 * menu, or its zoom menu
 */
const ESCAPE_DISMISSIBLE_LAYER_SELECTOR = '[role="dialog"], [role="alertdialog"], [role="menu"]';

/**
 * Whether a key press should close the chapter view: Escape, unless it was pressed in an open
 * window or menu, which Escape closes first.
 */
export function isEscapeForChapterContext(event: Pick<KeyboardEvent, 'key' | 'target'>): boolean {
  if (event.key !== 'Escape') return false;
  return !(
    event.target instanceof Element && event.target.closest(ESCAPE_DISMISSIBLE_LAYER_SELECTOR)
  );
}
