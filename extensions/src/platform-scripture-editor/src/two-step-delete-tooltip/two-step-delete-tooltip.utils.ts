import { getLocalizeKeyForPhysicalKey, LocalizeKey } from 'platform-bible-utils';

/**
 * The armed two-step-delete state the editor publishes on its root element. The scripture editor
 * (shared-react's StructureKeyboardPlugin) never renders the hint itself; it sets
 * `data-verse-delete-intent` and `data-verse-delete-kind` on the editor root so the host app can
 * render a localized, ShadCN-styled tooltip. For a paragraph merge, `kind` names what the second
 * press does: join the paragraph to the one before, pull the next one up, or remove an empty one.
 */
export type ArmedHint = {
  intent: 'deleteBackward' | 'deleteForward';
  kind: ArmedHintKind;
};

const ARMED_HINT_KINDS = [
  'verse',
  'selection',
  'joinPreviousPara',
  'joinNextPara',
  'removeEmptyPara',
] as const;

/** What an armed two-step delete removes, as the editor names it in `data-verse-delete-kind`. */
export type ArmedHintKind = (typeof ARMED_HINT_KINDS)[number];

function isArmedHintKind(kind: string | null | undefined): kind is ArmedHintKind {
  return ARMED_HINT_KINDS.some((armedHintKind) => armedHintKind === kind);
}

/** The hint's message for each armed kind; `{key}` is replaced with the confirming key's name. */
const MESSAGE_KEYS: Record<ArmedHintKind, LocalizeKey> = {
  verse: '%webView_platformScriptureEditor_twoStepDelete_removeVerseNumber%',
  selection: '%webView_platformScriptureEditor_twoStepDelete_deleteSelection%',
  joinPreviousPara: '%webView_platformScriptureEditor_twoStepDelete_joinPreviousParagraph%',
  joinNextPara: '%webView_platformScriptureEditor_twoStepDelete_joinNextParagraph%',
  removeEmptyPara: '%webView_platformScriptureEditor_twoStepDelete_removeEmptyParagraph%',
};

/** Every message the hint can show, for fetching translations via `useLocalizedStrings`. */
export const TWO_STEP_DELETE_MESSAGE_STRING_KEYS: LocalizeKey[] = Object.values(MESSAGE_KEYS);

/** Localization key of the hint's message for an armed delete. */
export function hintMessageKey(hint: ArmedHint): LocalizeKey {
  return MESSAGE_KEYS[hint.kind];
}

/**
 * Localization keys naming the physical keys `confirmingKey` can return; callers need this list to
 * fetch translations via `useLocalizedStrings`.
 */
export const CONFIRMING_KEY_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  getLocalizeKeyForPhysicalKey('Backspace'),
  getLocalizeKeyForPhysicalKey('Delete'),
];

/**
 * Reads the armed-delete hint the editor published on `root`, or undefined when nothing is armed.
 * Both attributes must be present and valid; anything else (cleared state, a kind this host does
 * not know, unrelated element) yields undefined so the tooltip stays hidden.
 */
export function readArmedHint(root: Element | null | undefined): ArmedHint | undefined {
  const intent = root?.getAttribute('data-verse-delete-intent');
  const kind = root?.getAttribute('data-verse-delete-kind');
  if ((intent === 'deleteBackward' || intent === 'deleteForward') && isArmedHintKind(kind)) {
    return { intent, kind };
  }
  return undefined;
}

export type AnchorRect = { top: number; left: number; width: number; height: number };

/**
 * Class the editor puts on an armed paragraph's gutter marker, or on the paragraph when it shows
 * none.
 */
const PARA_MERGE_ARMED_CLASS = 'para-merge-armed';

/** Class of the element the editor marks for each armed kind; the hint anchors to that element. */
const ARMED_ELEMENT_CLASSES: Record<ArmedHintKind, string> = {
  verse: 'verse-selected',
  selection: 'verse-selected',
  joinPreviousPara: PARA_MERGE_ARMED_CLASS,
  joinNextPara: PARA_MERGE_ARMED_CLASS,
  removeEmptyPara: PARA_MERGE_ARMED_CLASS,
};

/**
 * Converts `clientRect`, in viewport coordinates, to `positionAnchor` content coordinates.
 *
 * `positionAnchor` is the position:relative wrapper; the editor's scroll container is an ancestor
 * of it, so whatever `clientRect` measures and `positionAnchor` move together as the user scrolls,
 * and the viewport-space delta already gives the correct content-relative position (no scrollTop
 * addition needed).
 */
function toAnchorRect(clientRect: DOMRect, positionAnchor: HTMLElement): AnchorRect {
  const anchorRect = positionAnchor.getBoundingClientRect();
  return {
    top: clientRect.top - anchorRect.top,
    left: clientRect.left - anchorRect.left,
    width: clientRect.width,
    height: clientRect.height,
  };
}

/**
 * Computes the armed marker's rect in `positionAnchor` content coordinates, used to place the
 * invisible tooltip trigger over the marker so Radix anchors the tooltip to it.
 */
export function computeAnchorRect(marker: HTMLElement, positionAnchor: HTMLElement): AnchorRect {
  return toAnchorRect(marker.getBoundingClientRect(), positionAnchor);
}

/**
 * The caret's rect in `positionAnchor` content coordinates, for an armed paragraph that shows no
 * marker: the editor leaves the caret where it was, so the hint sits there rather than at an edge
 * of a paragraph that may be many lines tall. Undefined when `selection` is not a caret inside
 * `positionAnchor`, or the browser gives the caret no box (as at an empty element), so the caller
 * can fall back to the paragraph's own rect.
 */
export function computeCaretAnchorRect(
  selection: Selection | null | undefined,
  positionAnchor: HTMLElement,
): AnchorRect | undefined {
  if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) return undefined;
  const range = selection.getRangeAt(0);
  if (!positionAnchor.contains(range.startContainer)) return undefined;
  const caretRect = range.getBoundingClientRect();
  if (caretRect.width === 0 && caretRect.height === 0) return undefined;
  return toAnchorRect(caretRect, positionAnchor);
}

/**
 * Narrows `rect`, the armed gutter marker's box, to the marker's text, so the hint points at the
 * tinted glyph rather than the middle of the box. The editor publishes where the text sits within
 * the box as `--para-merge-armed-text-left` and `--para-merge-armed-text-width` on the marker (the
 * paragraph's first-line indent carries the text outside the box); without them, `rect` is returned
 * unchanged.
 */
export function narrowToArmedMarkerText(rect: AnchorRect, marker: HTMLElement): AnchorRect {
  const textLeft = parseFloat(marker.style.getPropertyValue('--para-merge-armed-text-left'));
  const textWidth = parseFloat(marker.style.getPropertyValue('--para-merge-armed-text-width'));
  if (Number.isNaN(textLeft) || Number.isNaN(textWidth)) return rect;
  return { ...rect, left: rect.left + textLeft, width: textWidth };
}

/**
 * Where the hint for `hint` goes, in `positionAnchor` content coordinates, or undefined when the
 * editor has marked no element for it:
 *
 * - A verse or selection arm: the armed verse marker.
 * - A paragraph arm on a gutter marker (the armed element is the marker glyph, which the editor tags
 *   `data-text-type="marker"`): the marker's text, see {@link narrowToArmedMarkerText}.
 * - A paragraph arm with no marker shown (the armed element is the paragraph): the caret, which the
 *   editor leaves where it was, else the paragraph's box.
 */
export function resolveArmedAnchorRect(
  hint: ArmedHint,
  positionAnchor: HTMLElement,
  selection: Selection | null | undefined,
): AnchorRect | undefined {
  const armedClass = ARMED_ELEMENT_CLASSES[hint.kind];
  const armedElement = positionAnchor.querySelector<HTMLElement>(`.${armedClass}`);
  if (!armedElement) return undefined;
  const elementRect = computeAnchorRect(armedElement, positionAnchor);
  if (armedClass !== PARA_MERGE_ARMED_CLASS) return elementRect;
  if (armedElement.getAttribute('data-text-type') === 'marker')
    return narrowToArmedMarkerText(elementRect, armedElement);
  return computeCaretAnchorRect(selection, positionAnchor) ?? elementRect;
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
