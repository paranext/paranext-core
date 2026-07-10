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
 * Returns a _physical_ direction only. The main process dispatches the matching physical command
 * (`platform.navigateLeftInReferenceHistory` / `...Right...`); the renderer resolves physical →
 * logical back/forward for the current UI layout direction via `resolveReferenceHistoryDirection`
 * in platform-bible-utils (shared with the toolbar's shortcut-hint display). This keeps the RTL
 * swap in one place and means the main process never needs to know the UI direction.
 *
 * @returns `'left'` (the Left / `[` key) or `'right'` (the Right / `]` key), or `undefined` if this
 *   is not a history navigation key
 */
export function getPhysicalHistoryNavigationDirection(
  input: HistoryKeyInput,
  platform: typeof process.platform,
): 'left' | 'right' | undefined {
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
  return input.key === 'ArrowLeft' || input.key === '[' ? 'left' : 'right';
}
