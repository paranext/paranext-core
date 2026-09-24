import { isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';

/**
 * Recursively collects every LocalizeKey label in a tree of context menu items.
 *
 * Shared rather than owned by the overlay context menu because the tab menu renders the same item
 * union through its own ContextMenu primitives, and both have to resolve their labels before
 * rendering them — a contributed menu can arrive carrying raw keys.
 *
 * @param items Context menu items to walk, submenus included
 * @returns Every LocalizeKey found, in the order encountered
 * @experimental This function is unstable and may change or disappear without notice
 */
export function collectContextMenuKeys(items: OverlayContextMenuItem[]): LocalizeKey[] {
  return items.reduce<LocalizeKey[]>((keys, item) => {
    if (item.type === 'separator') return keys;
    if (isLocalizeKey(item.label)) keys.push(item.label);
    if (item.type === 'submenu') keys.push(...collectContextMenuKeys(item.items));
    return keys;
  }, []);
}

/**
 * Recursively resolves LocalizeKey labels in context menu items using localized strings.
 *
 * Used as a pair with {@link collectContextMenuKeys}: collect the keys, resolve them through
 * `useLocalizedStrings`, then map the items through this. A label with no resolution is left as it
 * is, so a missing string shows the key rather than nothing.
 *
 * @param items Context menu items to resolve, submenus included
 * @param localizedStrings Resolved strings, keyed by LocalizeKey
 * @returns The items with their labels resolved
 * @experimental This function is unstable and may change or disappear without notice
 */
export function localizeContextMenuItems(
  items: OverlayContextMenuItem[],
  localizedStrings: LanguageStrings,
): OverlayContextMenuItem[] {
  return items.map((item) => {
    if (item.type === 'separator') return item;
    const label = isLocalizeKey(item.label)
      ? (localizedStrings[item.label] ?? item.label)
      : item.label;
    if (item.type === 'submenu')
      return { ...item, label, items: localizeContextMenuItems(item.items, localizedStrings) };
    return { ...item, label };
  });
}
