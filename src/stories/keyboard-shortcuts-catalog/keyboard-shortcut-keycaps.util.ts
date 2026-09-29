import { slice, split, startsWith } from 'platform-bible-utils';
import {
  NO_EQUIVALENT_PREFIX,
  splitShortcutAlternatives,
} from '@shared/utils/keyboard-shortcut-hint.util';

/**
 * The macOS key symbols a combo may string together with no separator — modifiers plus the symbols
 * that stand in for named keys (tab, return, delete, escape, space, arrows). Anything outside this
 * set is spelled out as a word or a literal character and is the combo's final key.
 */
const MACOS_SYMBOL_KEYS: ReadonlySet<string> = new Set([
  '⌘',
  '⌥',
  '⌃',
  '⇧',
  '⇥',
  '⏎',
  '⌫',
  '⎋',
  '␣',
  '↑',
  '↓',
  '←',
  '→',
]);

/** One key combination, split into the keys the user presses together. */
export type KeycapGroup = {
  /** Each key to show in its own keycap, in press order. */
  keycaps: string[];
  /**
   * What to show between the keycaps: `'+'` for the Windows/Linux spelling, `''` for the macOS
   * spelling, where the symbols sit adjacent with nothing between them.
   */
  separator: '+' | '';
};

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
 * Splits one alternative written the macOS way — leading symbols with no separator, optionally
 * followed by a spelled-out key, e.g. `⌘F8` or `⌃Space`.
 *
 * @returns The keycaps, or `undefined` if the alternative does not start with a macOS symbol
 */
function parseMacOsAlternative(alternative: string): string[] | undefined {
  const graphemes = split(alternative, '');
  let symbolCount = 0;
  while (symbolCount < graphemes.length && MACOS_SYMBOL_KEYS.has(graphemes[symbolCount]))
    symbolCount += 1;
  if (symbolCount === 0) return undefined;
  const symbols = graphemes.slice(0, symbolCount);
  // Whatever follows the symbols is one key, however many characters it is spelled with (`F8`,
  // `Space`, `]`).
  const finalKey = slice(alternative, symbolCount);
  return finalKey ? [...symbols, finalKey] : symbols;
}

/**
 * Splits one alternative written the Windows/Linux way, e.g. `Ctrl+Shift+N`. A `+` directly after
 * another `+` is the key itself rather than a separator, so `Ctrl++` is `Ctrl` and `+`.
 */
function parsePlusJoinedAlternative(alternative: string): string[] {
  const keycaps: string[] = [];
  let current = '';
  split(alternative, '').forEach((grapheme) => {
    if (grapheme === '+' && current) {
      keycaps.push(current);
      current = '';
    } else current += grapheme;
  });
  if (current) keycaps.push(current);
  return keycaps;
}

/**
 * Reads one OS's `keys` string from the keyboard shortcuts catalog into the keycaps to render.
 *
 * Each alternative (the catalog separates them with `/`) becomes its own {@link KeycapGroup} so a
 * caller can keep the alternatives visibly distinct.
 *
 * @param keys One OS's `keys` string, e.g. `⌥⇧⌘L`, `Ctrl+Y / Ctrl+Shift+Z`, or `F12`
 * @returns The keycaps to render, or the `no-equivalent` marker text to render as plain text
 */
export function parseShortcutKeycaps(keys: string): ShortcutKeycaps {
  if (startsWith(keys, NO_EQUIVALENT_PREFIX)) return { kind: 'no-equivalent', text: keys };
  const groups = splitShortcutAlternatives(keys).map((alternative): KeycapGroup => {
    const macOsKeycaps = parseMacOsAlternative(alternative);
    if (macOsKeycaps) return { keycaps: macOsKeycaps, separator: '' };
    return { keycaps: parsePlusJoinedAlternative(alternative), separator: '+' };
  });
  return { kind: 'combo', groups };
}
