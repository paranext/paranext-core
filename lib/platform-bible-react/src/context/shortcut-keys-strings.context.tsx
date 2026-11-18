import { PropsWithChildren, useContext, useMemo } from 'react';
import { getSharedContext } from '@/context/shared-context.util';

/**
 * Object containing all keys used for localization in `ShortcutKeys`. Platform.Bible localizes them
 * and gives them to every `ShortcutKeys` through {@link ShortcutKeysLocalizedStringsProvider}, so a
 * caller in the app never passes them.
 *
 * @experimental This export is unstable and may change or disappear without notice
 */
export const SHORTCUT_KEYS_STRING_KEYS = Object.freeze(['%shortcutKeys_tooltip%'] as const);

/**
 * Localized strings for `ShortcutKeys`, keyed by {@link SHORTCUT_KEYS_STRING_KEYS}.
 * `%shortcutKeys_tooltip%` must contain `{keys}`, which is replaced by the keys to press.
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type ShortcutKeysLocalizedStrings = {
  [key in (typeof SHORTCUT_KEYS_STRING_KEYS)[number]]?: string;
};

type ShortcutKeysLocalization = {
  localizedStrings: ShortcutKeysLocalizedStrings;
  locale?: string;
};

// Shared between copies of this library: the platform provides it from its own copy, and an
// extension's web view reads it from the copy bundled into the extension
const ShortcutKeysLocalizedStringsContext = getSharedContext<ShortcutKeysLocalization>(
  'shortcutKeysLocalization',
  { localizedStrings: {} },
);

/**
 * Props for {@link ShortcutKeysLocalizedStringsProvider}.
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type ShortcutKeysLocalizedStringsProviderProps = PropsWithChildren<{
  /** The localized strings every `ShortcutKeys` inside uses, keyed by `SHORTCUT_KEYS_STRING_KEYS` */
  localizedStrings: ShortcutKeysLocalizedStrings;
  /**
   * BCP 47 tag of the language `localizedStrings` are in, so the keys are joined into a list ("…
   * and N") in that same language. Defaults to the runtime's own locale, which can differ from the
   * interface language.
   */
  locale?: string;
}>;

/**
 * Gives every `ShortcutKeys` inside the strings for its tooltip. Platform.Bible provides it at the
 * root of the main window and of every web view, so components and extensions in the app never pass
 * the strings themselves, whichever copy of `platform-bible-react` they use; use it only where this
 * library renders outside the app, such as in Storybook.
 *
 * @experimental This component is unstable and may change or disappear without notice
 */
export function ShortcutKeysLocalizedStringsProvider({
  localizedStrings,
  locale,
  children,
}: ShortcutKeysLocalizedStringsProviderProps) {
  const value = useMemo(() => ({ localizedStrings, locale }), [localizedStrings, locale]);
  return (
    <ShortcutKeysLocalizedStringsContext.Provider value={value}>
      {children}
    </ShortcutKeysLocalizedStringsContext.Provider>
  );
}

/** The strings and their language from the nearest {@link ShortcutKeysLocalizedStringsProvider}. */
export function useShortcutKeysLocalization(): ShortcutKeysLocalization {
  return useContext(ShortcutKeysLocalizedStringsContext);
}
