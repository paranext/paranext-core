import { createContext, PropsWithChildren, useContext } from 'react';
import type { ShortcutKeysLocalizedStrings } from '@/components/basics/shortcut-keys.component';

const ShortcutKeysLocalizedStringsContext = createContext<ShortcutKeysLocalizedStrings>({});

/**
 * Props for {@link ShortcutKeysLocalizedStringsProvider}.
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type ShortcutKeysLocalizedStringsProviderProps = PropsWithChildren<{
  /** The localized strings every `ShortcutKeys` inside uses, keyed by `SHORTCUT_KEYS_STRING_KEYS` */
  localizedStrings: ShortcutKeysLocalizedStrings;
}>;

/**
 * Gives every `ShortcutKeys` inside the strings for its tooltip. Platform.Bible provides it at the
 * root of the main window and of every web view, so components and extensions in the app never pass
 * the strings themselves; use it only where `platform-bible-react` renders outside the app, such as
 * in Storybook.
 *
 * @experimental This component is unstable and may change or disappear without notice
 */
export function ShortcutKeysLocalizedStringsProvider({
  localizedStrings,
  children,
}: ShortcutKeysLocalizedStringsProviderProps) {
  return (
    <ShortcutKeysLocalizedStringsContext.Provider value={localizedStrings}>
      {children}
    </ShortcutKeysLocalizedStringsContext.Provider>
  );
}

/** The strings the nearest {@link ShortcutKeysLocalizedStringsProvider} gives, or none. */
export function useShortcutKeysLocalizedStrings(): ShortcutKeysLocalizedStrings {
  return useContext(ShortcutKeysLocalizedStringsContext);
}
