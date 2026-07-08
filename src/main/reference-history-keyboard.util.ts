import { Input } from 'electron';

/** The parts of Electron's `Input` that reference-history key detection reads */
type HistoryKeyInput = Pick<Input, 'key' | 'alt' | 'control' | 'shift' | 'meta'>;

/**
 * Determine whether `input` is a reference-history navigation key on `platform` and, if so, which
 * physical direction it points (PT-4033). Windows/Linux: Alt+Left / Alt+Right (Paratext 9 parity).
 * macOS: Cmd+[ / Cmd+] — the platform's history convention; Option+arrows is the system-wide
 * move-by-word shortcut and must not be intercepted. An exact modifier match is required — e.g. the
 * shift guard keeps Cmd+Shift+[/] free for tab focus navigation.
 *
 * @returns `'back'` or `'forward'` in _physical_ terms (`'back'` = the left/`[` key), or
 *   `undefined` if this is not a history navigation key. Pass the result through
 *   {@link resolveHistoryNavigationDirection} to get the logical direction in the current UI layout
 *   direction.
 */
export function getPhysicalHistoryNavigationDirection(
  input: HistoryKeyInput,
  platform: typeof process.platform,
): 'back' | 'forward' | undefined {
  const isHistoryNavigationKey =
    platform === 'darwin'
      ? input.meta &&
        !input.shift &&
        !input.alt &&
        !input.control &&
        (input.key === '[' || input.key === ']')
      : input.alt &&
        !input.control &&
        !input.shift &&
        !input.meta &&
        (input.key === 'ArrowLeft' || input.key === 'ArrowRight');
  if (!isHistoryNavigationKey) return undefined;
  return input.key === 'ArrowLeft' || input.key === '[' ? 'back' : 'forward';
}

/**
 * Resolve a physical history navigation direction to the logical one for the current UI layout
 * direction. In RTL the key pairs swap meaning (physical-direction-preserving, like Paratext 9 and
 * Chromium — see docs/specs/2026-07-06-reference-history-design.md).
 */
export function resolveHistoryNavigationDirection(
  physicalDirection: 'back' | 'forward',
  interfaceDirection: 'ltr' | 'rtl',
): 'back' | 'forward' {
  if (interfaceDirection !== 'rtl') return physicalDirection;
  return physicalDirection === 'back' ? 'forward' : 'back';
}
