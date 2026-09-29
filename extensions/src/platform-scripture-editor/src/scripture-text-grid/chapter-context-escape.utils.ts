/** Windows Escape closes by itself, such as a cell's copyright details */
const DIALOG_SELECTOR = '[role="dialog"], [role="alertdialog"]';

/**
 * Whether a key press should close the chapter view: Escape, unless it was pressed in an open
 * window, which Escape closes first.
 */
export function isEscapeForChapterContext(event: Pick<KeyboardEvent, 'key' | 'target'>): boolean {
  if (event.key !== 'Escape') return false;
  return !(event.target instanceof Element && event.target.closest(DIALOG_SELECTOR));
}
