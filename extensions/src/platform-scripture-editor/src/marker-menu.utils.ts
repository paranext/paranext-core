import { MarkerMenuItem } from 'platform-bible-react';

/**
 * Wraps each item's action so that picking it also closes the host's menu.
 *
 * A single-select marker control must close on pick, but `MarkerMenu` wires `onSelect` straight to
 * `item.action` and knows nothing about its host's open state, so the host wraps each action rather
 * than the menu closing itself. The item's own action runs first, then `close`.
 *
 * @param items The menu items to wrap
 * @param close Closes the host's menu; runs after the picked item's action
 * @returns New items with the same fields and wrapped actions; the input items are not modified
 */
export function wrapMarkerMenuItemsWithClose(
  items: MarkerMenuItem[],
  close: () => void,
): MarkerMenuItem[] {
  return items.map((item) => ({
    ...item,
    action: () => {
      item.action();
      close();
    },
  }));
}
