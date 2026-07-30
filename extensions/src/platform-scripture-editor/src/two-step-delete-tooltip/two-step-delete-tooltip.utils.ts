import { getLocalizeKeyForPhysicalKey, LocalizeKey } from 'platform-bible-utils';

/**
 * The armed two-step-delete state the editor publishes on its root element. The scripture editor
 * (shared-react's StructureKeyboardPlugin) never renders the hint itself; it sets
 * `data-verse-delete-intent` and `data-verse-delete-kind` on the editor root so the host app can
 * render a localized, ShadCN-styled tooltip. `kind` is only ever `verse` or `selection` — a
 * paragraph merge exposes no hint.
 */
export type ArmedHint = {
  intent: 'deleteBackward' | 'deleteForward';
  kind: 'verse' | 'selection';
};

/**
 * Localization keys naming the physical keys `confirmingKey` can return; callers need this list to
 * fetch translations via `useLocalizedStrings`.
 */
export const CONFIRMING_KEY_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  getLocalizeKeyForPhysicalKey('Backspace'),
  getLocalizeKeyForPhysicalKey('Delete'),
];

/**
 * Reads the armed-delete hint the editor published on `root`, or undefined when nothing hint-worthy
 * is armed. Both attributes must be present and valid; anything else (paragraph merge, cleared
 * state, unrelated element) yields undefined so the tooltip stays hidden.
 */
export function readArmedHint(root: Element | null | undefined): ArmedHint | undefined {
  const intent = root?.getAttribute('data-verse-delete-intent');
  const kind = root?.getAttribute('data-verse-delete-kind');
  if (
    (intent === 'deleteBackward' || intent === 'deleteForward') &&
    (kind === 'verse' || kind === 'selection')
  ) {
    return { intent, kind };
  }
  return undefined;
}

export type AnchorRect = { top: number; left: number; width: number; height: number };

/**
 * Computes the armed marker's rect in `positionAnchor` content coordinates, used to place the
 * invisible tooltip trigger over the marker so Radix anchors the tooltip to it.
 *
 * `positionAnchor` is the position:relative wrapper; the editor's scroll container is an ancestor
 * of it, so `marker` and `positionAnchor` move together as the user scrolls and the viewport-space
 * delta already gives the correct content-relative position (no scrollTop addition needed).
 */
export function computeAnchorRect(marker: HTMLElement, positionAnchor: HTMLElement): AnchorRect {
  const anchorRect = positionAnchor.getBoundingClientRect();
  const markerRect = marker.getBoundingClientRect();
  return {
    top: markerRect.top - anchorRect.top,
    left: markerRect.left - anchorRect.left,
    width: markerRect.width,
    height: markerRect.height,
  };
}

/**
 * Localization key naming the physical key whose second press confirms the delete, for the given
 * arming intent. Returns a `LocalizeKey` (rather than the literal `'Backspace'`/`'Delete'`) so
 * callers can look up the localized key name via `useLocalizedStrings`.
 */
export function confirmingKey(intent: ArmedHint['intent']): LocalizeKey {
  return getLocalizeKeyForPhysicalKey(intent === 'deleteForward' ? 'Delete' : 'Backspace');
}

/**
 * Platform symbol macOS uses for each confirming key, per the Keyboard shortcuts guideline's
 * "Preferred representations by OS" table (Backspace `⌫`, Forward Delete `⌦`). These are OS
 * symbols, not translated text, so they bypass localization entirely.
 */
const MAC_KEY_SYMBOLS: Record<ArmedHint['intent'], string> = {
  deleteBackward: '⌫',
  deleteForward: '⌦',
};

/**
 * Display label for the confirming key, following each OS's own convention: macOS shows the
 * platform symbol (`⌫`/`⌦`); other platforms show the localized word (e.g. "Backspace"/"Delete").
 */
export function getConfirmingKeyDisplayLabel(
  intent: ArmedHint['intent'],
  localizedWord: string,
  isMac: boolean,
): string {
  return isMac ? MAC_KEY_SYMBOLS[intent] : localizedWord;
}
