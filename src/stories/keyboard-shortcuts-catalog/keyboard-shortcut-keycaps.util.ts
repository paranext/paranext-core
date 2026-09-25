import { startsWith } from 'platform-bible-utils';
import { getShortcutKeycaps } from 'platform-bible-react/experimental';
import {
  NO_EQUIVALENT_PREFIX,
  splitShortcutAlternatives,
} from '@shared/utils/keyboard-shortcut-hint.util';

/**
 * One key combination, split into the keys the user presses together. The shared
 * `getShortcutKeycaps` (`platform-bible-react`) is the single parser for this split; the catalog
 * only adds the no-equivalent marker and alternative splitting above it.
 */
export type KeycapGroup = ReturnType<typeof getShortcutKeycaps>;

/** The result of reading one OS's `keys` string. */
export type ShortcutKeycaps =
  | {
      /** The OS has no equivalent, so show {@link text} as plain text rather than as keycaps. */
      kind: 'no-equivalent';
      text: string;
    }
  | {
      /** The OS has at least one key combination to show as keycaps. */
      kind: 'combo';
      /** One group per alternative way to invoke the shortcut, in the order they were listed. */
      groups: KeycapGroup[];
    };

/**
 * Reads one OS's `keys` string from the keyboard shortcuts catalog into the keycaps to render.
 *
 * Each alternative (the catalog separates them with `/`) becomes its own {@link KeycapGroup}, split
 * by the same {@link getShortcutKeycaps} a menu hint renders with, so a caller can keep the
 * alternatives visibly distinct.
 *
 * @param keys One OS's `keys` string, e.g. `⌥⇧⌘L`, `Ctrl+Y / Ctrl+Shift+Z`, or `F12`
 * @returns The keycaps to render, or the `no-equivalent` marker text to render as plain text
 */
export function parseShortcutKeycaps(keys: string): ShortcutKeycaps {
  if (startsWith(keys, NO_EQUIVALENT_PREFIX)) return { kind: 'no-equivalent', text: keys };
  const groups = splitShortcutAlternatives(keys).map((alternative) =>
    getShortcutKeycaps(alternative),
  );
  return { kind: 'combo', groups };
}
