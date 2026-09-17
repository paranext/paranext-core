import { PROJECT_SELECTOR_STRING_KEYS } from 'platform-bible-react/experimental';

/**
 * The resolved value a test stub gives a key the `ProjectSelector` reads. It NAMES the key without
 * being equal to it, so assertions stay independent of the shipped English wording.
 *
 * It must not BE the key, and must not be blank. `useLocalizedStrings` seeds its state with
 * `defaultState[key] = key` and returns that same state on a platform error, so a key echoed back
 * as its own value is precisely what the picker treats as "not localized yet" — as is an empty or
 * whitespace-only value. Either one puts the picker on its English fallback path, so a stub built
 * from one would assert the fallback rather than the localized string.
 *
 * Shared by every suite that renders a `ProjectSelector`: a verbatim copy per suite drifts, and the
 * picker's notion of "unresolved" is one rule, not one per consumer.
 */
export const localizedValueFor = (key: string) => `localized ${key}`;

const PROJECT_SELECTOR_KEY_SET: ReadonlySet<string> = new Set(PROJECT_SELECTOR_STRING_KEYS);

/**
 * Whether a key belongs to the shared `%projectSelector_*%` block the picker resolves itself.
 *
 * Membership in {@link PROJECT_SELECTOR_STRING_KEYS} rather than a spelling check, so a stub tracks
 * the picker's real key set: a key added to or renamed in that block changes what the stubs resolve
 * without any suite having to be updated.
 */
export function isProjectSelectorSharedKey(key: string): boolean {
  return PROJECT_SELECTOR_KEY_SET.has(key);
}
