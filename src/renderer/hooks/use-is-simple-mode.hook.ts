import { useInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';

/**
 * Returns whether the app is _known_ to be in `'simple'` interface mode. Unlike
 * `!useIsPowerMode()`, this is `false` while the mode is still unknown, so simple-only UI stays
 * hidden until the real mode is settled rather than appearing on the `'simple'` placeholder and
 * vanishing a moment later.
 *
 * Use this — not the negation of {@link useIsPowerMode} — for anything that must never be seen in
 * power mode. Prefer `!useIsPowerMode()` only where showing the simple-mode treatment early is
 * harmless (layout defaults such as toolbar height, which need _some_ value on the first render).
 *
 * Thin read-only wrapper around {@link useInterfaceMode}.
 */
export function useIsSimpleMode(): boolean {
  const [mode, , isModeKnown] = useInterfaceMode();
  return isModeKnown && mode === 'simple';
}

export default useIsSimpleMode;
