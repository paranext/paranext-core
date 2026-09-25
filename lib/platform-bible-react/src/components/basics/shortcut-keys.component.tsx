import { slice, split } from 'platform-bible-utils';
import { Fragment } from 'react';
import { Kbd, KbdGroup } from '@/components/shadcn-ui/kbd';

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

/**
 * Splits one hint written the macOS way — leading symbols with no separator, optionally followed by
 * a spelled-out key, e.g. `⌘F8` or `⌃Space`.
 *
 * @returns The keycaps, or `undefined` if `hint` does not start with a macOS symbol
 */
function parseMacOsHint(hint: string): string[] | undefined {
  const graphemes = split(hint, '');
  let symbolCount = 0;
  while (symbolCount < graphemes.length && MACOS_SYMBOL_KEYS.has(graphemes[symbolCount]))
    symbolCount += 1;
  if (symbolCount === 0) return undefined;
  const symbols = graphemes.slice(0, symbolCount);
  // Whatever follows the symbols is one key, however many characters it is spelled with (`F8`,
  // `Space`, `]`).
  const finalKey = slice(hint, symbolCount);
  return finalKey ? [...symbols, finalKey] : symbols;
}

/**
 * Splits one hint written the Windows/Linux way, e.g. `Ctrl+Shift+N`. A `+` directly after another
 * `+` is the key itself rather than a separator, so `Ctrl++` is `Ctrl` and `+`.
 */
function parsePlusJoinedHint(hint: string): string[] {
  const keycaps: string[] = [];
  let current = '';
  split(hint, '').forEach((grapheme) => {
    if (grapheme === '+' && current) {
      keycaps.push(current);
      current = '';
    } else current += grapheme;
  });
  if (current) keycaps.push(current);
  return keycaps;
}

/**
 * Splits one already-resolved keyboard shortcut hint — a single key combination, with no `/`
 * alternatives and no catalog no-equivalent marker — into the keys {@link ShortcutKeys} renders as
 * separate keycaps.
 *
 * @param hint One key combination, e.g. `⌥⇧⌘L`, `Ctrl+Shift+N`, or `F12`
 * @returns The keys in press order, and what to show between their keycaps: `'+'` for the
 *   Windows/Linux spelling, `''` for the macOS spelling, where the symbols sit adjacent
 * @experimental This function is unstable and may change or disappear without notice
 */
export function getShortcutKeycaps(hint: string): { keycaps: string[]; separator: '+' | '' } {
  const macOsKeycaps = parseMacOsHint(hint);
  if (macOsKeycaps) return { keycaps: macOsKeycaps, separator: '' };
  return { keycaps: parsePlusJoinedHint(hint), separator: '+' };
}

/**
 * Props for {@link ShortcutKeys}.
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type ShortcutKeysProps = {
  /**
   * One already-resolved keyboard shortcut hint to render as keycaps — a single key combination,
   * such as a menu item's `shortcut` string. Not a raw keyboard shortcuts catalog `keys` string:
   * that may hold several `/`-separated alternatives or a no-equivalent marker, neither of which
   * this component parses.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  hint: string;
};

/**
 * Renders a keyboard shortcut hint as keycaps: a single key is a lone {@link Kbd}, while a
 * combination puts every key in its own `Kbd` inside a `KbdGroup`. The Windows/Linux `+` renders as
 * plain text between the keycaps rather than as part of one; macOS symbols sit adjacent with
 * nothing between them.
 *
 * `dir="ltr"` is set on the `KbdGroup` itself, not an enclosing element, so the keycap order
 * survives a right-to-left layout: `KbdGroup` is `inline-flex`, and flex item order follows the
 * `direction` property.
 *
 * @experimental This component is unstable and may change or disappear without notice
 */
export function ShortcutKeys({ hint }: ShortcutKeysProps) {
  const { keycaps, separator } = getShortcutKeycaps(hint);
  // Menu shortcut slots set wide letter spacing for a plain-text hint; keycaps inherit it, which
  // spreads a keycap's letters apart ("C t r l"), so reset it here for every caller.
  if (keycaps.length === 1) return <Kbd className="tw:tracking-normal">{keycaps[0]}</Kbd>;
  return (
    <KbdGroup dir="ltr" className="tw:tracking-normal">
      {keycaps.map((keycap, index) => (
        // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
        // keycap text is not a safe key; position is stable because the keycaps never reorder.
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          {index > 0 && separator && <span>{separator}</span>}
          <Kbd>{keycap}</Kbd>
        </Fragment>
      ))}
    </KbdGroup>
  );
}
