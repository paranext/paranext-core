import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';
import {
  SHORTCUT_KEYS_STRING_KEYS,
  ShortcutKeysLocalizedStringsProvider,
} from 'platform-bible-react/experimental';
import { PropsWithChildren } from 'react';

const SHORTCUT_KEYS_LOCALIZE_KEYS: LocalizeKey[] = [...SHORTCUT_KEYS_STRING_KEYS];

/**
 * Localizes the strings every `ShortcutKeys` inside uses for its tooltip. It wraps the main
 * window's root and every web view's root, so no menu, tooltip or extension has to pass them.
 */
export function ShortcutKeysLocalizationRoot({ children }: PropsWithChildren) {
  const [localizedStrings] = useLocalizedStrings(SHORTCUT_KEYS_LOCALIZE_KEYS);
  return (
    <ShortcutKeysLocalizedStringsProvider localizedStrings={localizedStrings}>
      {children}
    </ShortcutKeysLocalizedStringsProvider>
  );
}
