import { formatReplacementStringToArray, includes, slice, split } from 'platform-bible-utils';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Kbd, KbdGroup } from '@/components/shadcn-ui/kbd';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { useIsInTooltip } from '@/context/in-tooltip.context';
import { useShortcutKeysLocalization } from '@/context/shortcut-keys-strings.context';
import { readDirection } from '@/utils/dir-helper.util';

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
 * Names for the keycaps whose glyph or abbreviation does not say the key's name in full. Any keycap
 * not listed is already its own name (`Shift`, `F8`, `+`).
 */
// TODO(PT-4629): Localize these names along with the hint's own key names.
const KEY_NAMES: Readonly<Record<string, string>> = {
  '⌘': 'Command',
  '⌥': 'Option',
  '⌃': 'Control',
  '⇧': 'Shift',
  '⇥': 'Tab',
  '⏎': 'Return',
  '⌫': 'Delete',
  '⎋': 'Escape',
  '␣': 'Space',
  '↑': 'Up Arrow',
  '↓': 'Down Arrow',
  '←': 'Left Arrow',
  '→': 'Right Arrow',
  Ctrl: 'Control',
  Esc: 'Escape',
  Del: 'Delete',
  // The Windows/Linux spelling of the arrow keys, which macOS writes as symbols
  Up: 'Up Arrow',
  Down: 'Down Arrow',
  Left: 'Left Arrow',
  Right: 'Right Arrow',
  PageUp: 'Page Up',
  PageDown: 'Page Down',
};

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
 * Gets the full name of each key in one already-resolved keyboard shortcut hint, in press order —
 * `Control` for `⌃` or `Ctrl`, `Command` for `⌘` — for text that reads the shortcut out rather than
 * showing it as keycaps.
 *
 * Exported for tests only; not part of the package's API.
 *
 * @param hint One key combination, as for {@link getShortcutKeycaps}
 */
export function getShortcutKeyNames(hint: string): string[] {
  return getShortcutKeycaps(hint).keycaps.map((keycap) => KEY_NAMES[keycap] ?? keycap);
}

/**
 * Makes the list format for `locale`, or for the runtime's own locale if `locale` is not a valid
 * language tag, so a misconfigured provider costs the language of the "and", not the menu.
 */
function getListFormat(locale: string | undefined): Intl.ListFormat {
  const options: Intl.ListFormatOptions = { style: 'long', type: 'conjunction' };
  try {
    return new Intl.ListFormat(locale, options);
  } catch {
    return new Intl.ListFormat(undefined, options);
  }
}

/**
 * Joins key names as a list in `locale`, like `Intl.ListFormat` but with no serial comma: `Control,
 * Shift and N` rather than `Control, Shift, and N`. The separator before the last key is the one
 * the locale puts between the last two keys on their own, which never has a serial comma but keeps
 * any form that depends on the last key (Spanish `e I`, not `y I`); the others are the list's own.
 */
function getKeyListParts(
  keyNames: string[],
  locale: string | undefined,
): { type: 'element' | 'literal'; value: string }[] {
  const listFormat = getListFormat(locale);
  const parts = listFormat.formatToParts(keyNames);
  if (keyNames.length < 3) return parts;
  const lastPairParts = listFormat.formatToParts(keyNames.slice(-2));
  const pairSeparator = lastPairParts[lastPairParts.findLastIndex(isElement) - 1];
  const lastSeparatorIndex = parts.findLastIndex(isElement) - 1;
  if (pairSeparator?.type !== 'literal' || parts[lastSeparatorIndex]?.type !== 'literal')
    return parts;
  return parts.map((part, index) => (index === lastSeparatorIndex ? pairSeparator : part));
}

function isElement(part: { type: string }): boolean {
  return part.type === 'element';
}

/**
 * Reads a shortcut out, e.g. "Press [Control] and [+]": the localized template with `{keys}`
 * replaced by each key's full name as a keycap, joined as a list in the template's own language,
 * `locale`. Rendered inside the tooltip's content, so it is worked out only while the tooltip is
 * open, not for every shortcut in every menu.
 */
function ShortcutReadout({
  template,
  hint,
  locale,
}: {
  template: string;
  hint: string;
  locale: string | undefined;
}) {
  const keys = getKeyListParts(getShortcutKeyNames(hint), locale).map((part, index) =>
    // A key name can repeat, so it is not a safe key; the parts never reorder, so position is.
    // eslint-disable-next-line react/no-array-index-key
    part.type === 'element' ? <Kbd key={index}>{part.value}</Kbd> : part.value,
  );
  return formatReplacementStringToArray<ReactNode>(template, { keys }).map((part, index) => (
    // One fixed template and one list per render, so the parts never reorder
    // eslint-disable-next-line react/no-array-index-key
    <Fragment key={index}>{part}</Fragment>
  ));
}

/**
 * The side of the keycaps at the inline end of the layout, where the tooltip goes: right in a
 * left-to-right layout, left in a right-to-left one. Exported for tests only; not part of the
 * package's API.
 */
export function getInlineEndSide(): 'left' | 'right' {
  return readDirection() === 'rtl' ? 'left' : 'right';
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
 * It does not detect the operating system: it follows the spelling of the hint it is given, so the
 * caller picks the spelling for the user's OS (e.g. `isMacOs() ? '⌘Z' : 'Ctrl+Z'`).
 *
 * Hovering the keycaps shows a tooltip that reads the shortcut out ("Press Control and +"), using
 * the strings from the nearest `ShortcutKeysLocalizedStringsProvider`. There is no tooltip inside
 * another tooltip's content, where it could not open, or until the strings have loaded.
 *
 * @experimental This component is unstable and may change or disappear without notice
 */
export function ShortcutKeys({ hint }: ShortcutKeysProps) {
  const isInTooltip = useIsInTooltip();
  const { localizedStrings, locale } = useShortcutKeysLocalization();
  const { keycaps, separator } = getShortcutKeycaps(hint);
  // Menu shortcut slots set wide letter spacing for a plain-text hint; keycaps inherit it, which
  // spreads a keycap's letters apart ("C t r l"), so reset it here for every caller.
  const keys =
    keycaps.length === 1 ? (
      <Kbd className="tw:tracking-normal">{keycaps[0]}</Kbd>
    ) : (
      // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
      // flex item order follows `direction`, so this keeps the keycap order in a right-to-left
      // layout. The gap is narrower than `KbdGroup`'s so a combo reads as one unit.
      <KbdGroup dir="ltr" className="tw:gap-0.5 tw:tracking-normal">
        {keycaps.map((keycap, index) => (
          // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so
          // the keycap text is not a safe key; position is stable because the keycaps never
          // reorder.
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            {index > 0 && separator && (
              // The `+` is drawn about half a pixel left of the middle of its advance, so centered
              // as is it leaves a wider gap after it than before it. A pixel of start padding in a
              // whole-pixel box moves the center half a pixel right, which measured closest to
              // centered at 100 % and stays within half a pixel at 125 %–200 %. The group is always
              // `ltr`, so the padding is always on the left.
              <span className="tw:inline-flex tw:w-2 tw:justify-center tw:ps-px">{separator}</span>
            )}
            <Kbd>{keycap}</Kbd>
          </Fragment>
        ))}
      </KbdGroup>
    );

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  // The open tooltip is the topmost Radix layer, and Radix lets only the topmost layer answer
  // Escape, so a menu holding these keycaps would ignore its first Escape. Close the tooltip on any
  // key before anything else sees the key: `window` capture runs ahead of the menu's own listeners
  // on `document`, and `flushSync` takes the tooltip's layer off the stack before they run. Any key,
  // not only Escape, since an arrow key moves the menu away from the item the tooltip describes.
  // This relies on the tooltip's content unmounting at once: an exit animation that Radix's
  // `Presence` waits for would keep the layer on top and bring the second Escape back.
  useEffect(() => {
    if (!isTooltipOpen) return undefined;
    const closeTooltip = () => flushSync(() => setIsTooltipOpen(false));
    window.addEventListener('keydown', closeTooltip, { capture: true });
    return () => window.removeEventListener('keydown', closeTooltip, { capture: true });
  }, [isTooltipOpen]);

  const tooltipTemplate = localizedStrings?.['%shortcutKeys_tooltip%'];
  // A template without `{keys}` is no template: while the strings load, the value is the key itself
  if (isInTooltip || !tooltipTemplate || !includes(tooltipTemplate, '{keys}')) return keys;
  return (
    // Its own provider, so the keycaps get a tooltip in any menu, whether or not one is above them
    <TooltipProvider>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        {/* A wrapper rather than `asChild` on the keycaps: the trigger would replace their `data-slot`,
          and `Kbd` ignores the pointer, so the hover has to land on something around it */}
        <TooltipTrigger asChild>
          <span className="tw:inline-flex">{keys}</span>
        </TooltipTrigger>
        {/* Beside the keycaps at the inline end, past the menu's edge, so the tooltip covers
          neither the menu items above or below nor, in a right-to-left menu, the item's label.
          Where there is no room on that side (near the window's edge, or in a narrow web view)
          Radix flips it to the other side, which beats clipping it. The shared tooltip nudges its
          arrow flush against the content only for top and bottom tooltips; without the same nudge
          here the side arrow's tip pokes into the keycaps */}
        <TooltipContent side={getInlineEndSide()} arrowClassName="tw:translate-y-[calc(-50%-1px)]">
          <ShortcutReadout template={tooltipTemplate} hint={hint} locale={locale} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
