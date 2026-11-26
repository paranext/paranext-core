import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';
import {
  SHORTCUT_KEYS_STRING_KEYS,
  ShortcutKeysLocalizedStringsProvider,
} from 'platform-bible-react/experimental';
import { PropsWithChildren } from 'react';

/**
 * Names the language the tooltip template resolved in. A locale that has not translated the
 * template falls back to the English template and, with it, to `en` here, so the key names are
 * joined with the template's own "and" rather than the interface language's.
 */
const TOOLTIP_LANGUAGE_KEY: LocalizeKey = '%shortcutKeys_tooltip_language%';

const SHORTCUT_KEYS_LOCALIZE_KEYS: LocalizeKey[] = [
  ...SHORTCUT_KEYS_STRING_KEYS,
  TOOLTIP_LANGUAGE_KEY,
];

/**
 * Localizes the strings every `ShortcutKeys` inside uses for its tooltip. It wraps the main
 * window's root and every web view's root, so no menu, tooltip or extension has to pass them; a web
 * view's own copy of `platform-bible-react` reaches it through the contexts that library shares.
 */
export function ShortcutKeysLocalizationRoot({ children }: PropsWithChildren) {
  const [localizedStrings] = useLocalizedStrings(SHORTCUT_KEYS_LOCALIZE_KEYS);
  const tooltipLanguage = localizedStrings[TOOLTIP_LANGUAGE_KEY];
  // While the strings load, the value is the key itself, which is no language tag
  const locale =
    tooltipLanguage && tooltipLanguage !== TOOLTIP_LANGUAGE_KEY ? tooltipLanguage : undefined;
  return (
    <ShortcutKeysLocalizedStringsProvider localizedStrings={localizedStrings} locale={locale}>
      {children}
    </ShortcutKeysLocalizedStringsProvider>
  );
}
