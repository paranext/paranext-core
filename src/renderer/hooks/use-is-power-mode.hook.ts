import { useInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';

/**
 * Returns whether the app is currently in `'power'` interface mode. Falls back to `false` (simple
 * mode) while the setting is loading or if reading it fails, so power-only UI never accidentally
 * appears before the real value is known.
 *
 * **Do not negate this for simple-only UI.** `!useIsPowerMode()` is `true` both when the mode is
 * really simple and when it is not yet known, so a simple-only control gated on it renders in the
 * power toolbar at startup and then vanishes. Read `isModeKnown` from {@link useInterfaceMode} and
 * gate on `isModeKnown && mode === 'simple'` instead. Negating is fine only for layout defaults
 * that need _some_ value on the first render, such as a height or a variant.
 *
 * Thin read-only wrapper around {@link useInterfaceMode}.
 */
export function useIsPowerMode(): boolean {
  const [mode] = useInterfaceMode();
  return mode === 'power';
}

export default useIsPowerMode;
