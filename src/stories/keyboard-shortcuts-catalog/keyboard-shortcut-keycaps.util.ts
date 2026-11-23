import { startsWith } from 'platform-bible-utils';
import {
  NO_EQUIVALENT_PREFIX,
  splitShortcutAlternatives,
} from '@shared/utils/keyboard-shortcut-hint.util';

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
      /**
       * Each alternative way to invoke the shortcut, in the order they were listed, as the single
       * key combination `ShortcutKeys` (`platform-bible-react/experimental`) renders.
       */
      alternatives: string[];
    };

/**
 * Reads one OS's `keys` string from the keyboard shortcuts catalog into what to render: its
 * alternatives (the catalog separates them with `/`), each shown as keycaps on its own so a caller
 * can keep them visibly distinct, or its no-equivalent marker.
 *
 * @param keys One OS's `keys` string, e.g. `⌥⇧⌘L`, `Ctrl+Y / Ctrl+Shift+Z`, or `F12`
 * @returns The alternatives to render as keycaps, or the `no-equivalent` marker text to render as
 *   plain text
 */
export function parseShortcutKeycaps(keys: string): ShortcutKeycaps {
  if (startsWith(keys, NO_EQUIVALENT_PREFIX)) return { kind: 'no-equivalent', text: keys };
  return { kind: 'combo', alternatives: splitShortcutAlternatives(keys) };
}
