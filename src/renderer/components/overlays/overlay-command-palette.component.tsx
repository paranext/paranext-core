/**
 * Thin wrapper that connects the presentational OverlayCommandPalette from platform-bible-react to
 * the renderer's overlay store. Resolves any LocalizeKey values in items before passing them to the
 * presentational component.
 */

import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { removeOverlay } from '@renderer/services/overlay-store';
import { CommandPaletteItem, OverlayEntry } from '@shared/models/overlay.service-model';
import { OverlayCommandPalette as PresentationalCommandPalette } from 'platform-bible-react';
import { useCallback, useMemo, useRef } from 'react';
import { isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

/** Helper to push a value to the keys array if it is a LocalizeKey */
function pushIfKey(keys: LocalizeKey[], value: string | LocalizeKey | undefined): void {
  if (typeof value === 'string' && isLocalizeKey(value)) keys.push(value);
}

/** Collects all LocalizeKey values from command palette items and placeholder */
function collectCommandPaletteKeys(
  items: CommandPaletteItem[],
  placeholder: string | LocalizeKey | undefined,
): LocalizeKey[] {
  const keys: LocalizeKey[] = [];
  pushIfKey(keys, placeholder);
  items.forEach((item) => {
    pushIfKey(keys, item.label);
    pushIfKey(keys, item.description);
    pushIfKey(keys, item.badge);
  });
  return keys;
}

/** Resolves a string-or-LocalizeKey value using the localized strings map */
function resolveValue(
  value: string | LocalizeKey,
  localizedStrings: LanguageStrings,
): string | LocalizeKey {
  return isLocalizeKey(value) ? (localizedStrings[value] ?? value) : value;
}

/** Resolves LocalizeKey values in command palette items using localized strings */
function localizeCommandPaletteItems(
  items: CommandPaletteItem[],
  localizedStrings: LanguageStrings,
): CommandPaletteItem[] {
  return items.map((item) => ({
    ...item,
    label: resolveValue(item.label, localizedStrings),
    description: item.description ? resolveValue(item.description, localizedStrings) : undefined,
    badge: item.badge ? resolveValue(item.badge, localizedStrings) : undefined,
  }));
}

type Props = {
  overlay: Extract<OverlayEntry, { type: 'commandPalette' }>;
};

export function OverlayCommandPalette({ overlay }: Props) {
  const hasResolved = useRef(false);

  const localizeKeys = useMemo(
    () => collectCommandPaletteKeys(overlay.items, overlay.request.placeholder),
    [overlay.items, overlay.request.placeholder],
  );
  const [localizedStrings] = useLocalizedStrings(localizeKeys);

  const localizedItems = useMemo(
    () => localizeCommandPaletteItems(overlay.items, localizedStrings),
    [overlay.items, localizedStrings],
  );

  const localizedPlaceholder = useMemo(() => {
    if (!overlay.request.placeholder) return undefined;
    return isLocalizeKey(overlay.request.placeholder)
      ? (localizedStrings[overlay.request.placeholder] ?? overlay.request.placeholder)
      : overlay.request.placeholder;
  }, [overlay.request.placeholder, localizedStrings]);

  const handleSelect = useCallback(
    (itemId: string) => {
      if (hasResolved.current) return;
      hasResolved.current = true;
      removeOverlay(overlay.id);
      overlay.resolve(itemId);
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
    <PresentationalCommandPalette
      items={localizedItems}
      position={overlay.position}
      anchor={{
        width: overlay.request.anchor?.width,
        height: overlay.request.anchor?.height,
      }}
      side={overlay.request.side}
      placeholder={localizedPlaceholder}
      maxWidth={overlay.request.maxWidth}
      maxHeight={overlay.request.maxHeight}
      onSelect={handleSelect}
      onDismiss={handleDismiss}
    />
  );
}
