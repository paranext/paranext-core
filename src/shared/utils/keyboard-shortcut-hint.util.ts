import { rootKeyboardShortcuts } from '@shared/data/keyboard-shortcuts.data';
import type { KeyboardShortcutEntry } from '@shared/data/keyboard-shortcuts.model';
import { split } from 'platform-bible-utils';

/**
 * Splits one operating system's `keys` into its alternatives, e.g. `Ctrl+Y / Ctrl+Shift+Z` into
 * `Ctrl+Y` and `Ctrl+Shift+Z`
 */
export function splitShortcutAlternatives(keys: string): string[] {
  return split(keys, ' / ');
}

/**
 * Gets the menu hint for `command`: the first alternative of its catalogued shortcut, written for
 * `platform`.
 *
 * @param command The PAPI command the menu item runs
 * @param platform `darwin` uses the macOS keys, `win32` the Windows keys, and anything else the
 *   Linux keys
 * @param entries The catalog to search. Defaults to the application's catalog
 * @returns The hint, or `undefined` if no entry has this `command`
 */
export function getShortcutHintForCommand(
  command: string,
  platform: typeof process.platform,
  entries: KeyboardShortcutEntry[] = rootKeyboardShortcuts,
): string | undefined {
  // TODO(PT-4629): Localize the key names through `getLocalizeKeyForPhysicalKey`. The catalog
  // spells a chord as one English string, so a hint reads `Ctrl+Shift+N` in a menu whose every
  // other word is translated.
  const entry = entries.find((candidate) => candidate.command === command);
  if (!entry) return undefined;
  let keys = entry.keys.linux;
  if (platform === 'darwin') keys = entry.keys.macOS;
  else if (platform === 'win32') keys = entry.keys.windows;
  return splitShortcutAlternatives(keys)[0];
}
