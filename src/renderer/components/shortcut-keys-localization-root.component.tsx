import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { usePrimaryInterfaceLanguage } from '@renderer/hooks/use-primary-interface-language.hook';
import { LocalizeKey } from 'platform-bible-utils';
import {
  SHORTCUT_KEYS_STRING_KEYS,
  ShortcutKeysLocalizedStringsProvider,
} from 'platform-bible-react/experimental';
import { PropsWithChildren } from 'react';

const SHORTCUT_KEYS_LOCALIZE_KEYS: LocalizeKey[] = [...SHORTCUT_KEYS_STRING_KEYS];

/**
 * Localizes the strings every `ShortcutKeys` inside uses for its tooltip. It wraps the main
 * window's root and every web view's root, so no menu, tooltip or extension has to pass them; a web
 * view's own copy of `platform-bible-react` reaches it through the contexts that library shares.
 */
export function ShortcutKeysLocalizationRoot({ children }: PropsWithChildren) {
  const [localizedStrings] = useLocalizedStrings(SHORTCUT_KEYS_LOCALIZE_KEYS);
  // The keys are joined into a list ("… and N") in the interface language the strings are in,
  // which can differ from the operating system's
  const locale = usePrimaryInterfaceLanguage();
  return (
    <ShortcutKeysLocalizedStringsProvider localizedStrings={localizedStrings} locale={locale}>
      {children}
    </ShortcutKeysLocalizedStringsProvider>
  );
}
