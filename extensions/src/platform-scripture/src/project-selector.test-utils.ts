import { PROJECT_SELECTOR_STRING_KEYS } from 'platform-bible-react/experimental';

/*
 * Why every `useLocalizedStrings` stub in these suites looks the way it does.
 *
 * The real hook seeds its state with `defaultState[key] = key` and returns that same seed until
 * strings load — and permanently if the localization provider errors. So a lookup hands back the
 * literal `'%some_key%'`, which is a defined, non-empty string: `?? 'Default'` never fires on it,
 * and the raw key renders at the user. That is the defect these suites guard.
 *
 * It cuts both ways in a stub. A stub that echoes every key back as its own value puts the picker
 * on its English fallback path, so a test asserting localized wording would silently assert the
 * fallback instead. {@link localizedValueFor} is the resolved-looking value for keys a test wants
 * resolved; echoing the key back is how a test reaches the UNRESOLVED path on purpose.
 */

/**
 * The resolved value a test stub gives a key the `ProjectSelector` reads. It NAMES the key without
 * being equal to it, so assertions stay independent of the shipped English wording, and without
 * tripping `isResolvedLocalizedValue` — a stub that echoed the key back, or left it blank, would
 * put the picker on its English fallback path and assert the fallback instead.
 */
export const localizedValueFor = (key: string) => `localized ${key}`;

const PROJECT_SELECTOR_KEY_SET: ReadonlySet<string> = new Set(PROJECT_SELECTOR_STRING_KEYS);

/**
 * Whether a key belongs to the shared `%projectSelector_*%` block the picker resolves itself.
 * Membership in {@link PROJECT_SELECTOR_STRING_KEYS}, not a spelling check, so stubs track the
 * picker's real key set through renames.
 */
export function isProjectSelectorSharedKey(key: string): boolean {
  return PROJECT_SELECTOR_KEY_SET.has(key);
}
