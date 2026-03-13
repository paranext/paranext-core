/**
 * Thin wrapper that connects the presentational OverlayContextMenu from platform-bible-react to the
 * renderer's overlay store. Resolves any LocalizeKey values in menu items before passing them to
 * the presentational component.
 */

import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { removeOverlay } from '@renderer/services/overlay-store';
import { ContextMenuItem, OverlayEntry } from '@shared/models/overlay.service-model';
import { OverlayContextMenu as PresentationalContextMenu } from 'platform-bible-react';
import { useCallback, useMemo, useRef } from 'react';
import type { OverlayContextMenuResult } from 'platform-bible-react';
import { isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

/** Recursively collects all LocalizeKey values from context menu items */
function collectContextMenuKeys(items: ContextMenuItem[]): LocalizeKey[] {
  return items.reduce<LocalizeKey[]>((keys, item) => {
    if (item.type === 'separator') return keys;
    if (isLocalizeKey(item.label)) keys.push(item.label);
    if (item.type === 'submenu') keys.push(...collectContextMenuKeys(item.items));
    return keys;
  }, []);
}

/** Recursively resolves LocalizeKey labels in context menu items using localized strings */
function localizeContextMenuItems(
  items: ContextMenuItem[],
  localizedStrings: LanguageStrings,
): ContextMenuItem[] {
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

type OverlayContextMenuProps = {
  overlay: Extract<OverlayEntry, { type: 'contextMenu' }>;
};

export function OverlayContextMenu({ overlay }: OverlayContextMenuProps) {
  const hasResolved = useRef(false);

  const localizeKeys = useMemo(() => collectContextMenuKeys(overlay.items), [overlay.items]);
  const [localizedStrings] = useLocalizedStrings(localizeKeys);

  const localizedItems = useMemo(
    () => localizeContextMenuItems(overlay.items, localizedStrings),
    [overlay.items, localizedStrings],
  );

  const handleSelect = useCallback(
    (result: OverlayContextMenuResult) => {
      if (hasResolved.current) return;
      hasResolved.current = true;
      removeOverlay(overlay.id);
      overlay.resolve(result);
    },
    [overlay],
  );

  const handleDismiss = useCallback(() => {
    if (hasResolved.current) return;
    hasResolved.current = true;
    removeOverlay(overlay.id);
    overlay.resolve(undefined);
  }, [overlay]);

  return (
    <PresentationalContextMenu
      items={localizedItems}
      position={overlay.position}
      onSelect={handleSelect}
      onDismiss={handleDismiss}
    />
  );
}
