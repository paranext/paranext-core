import { useInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';

/**
 * Returns whether the app is currently in `'power'` interface mode. Falls back to `false` (simple
 * mode) while the setting is loading or if reading it fails, so power-only UI never accidentally
 * appears before the real value is known.
 *
 * Thin read-only wrapper around {@link useInterfaceMode}.
 */
export function useIsPowerMode(): boolean {
  const [mode] = useInterfaceMode();
  return mode === 'power';
}

export default useIsPowerMode;
