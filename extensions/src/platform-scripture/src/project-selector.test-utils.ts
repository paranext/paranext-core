import { PROJECT_SELECTOR_STRING_KEYS } from 'platform-bible-react/experimental';

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
