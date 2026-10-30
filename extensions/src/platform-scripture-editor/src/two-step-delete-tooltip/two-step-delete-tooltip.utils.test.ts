import { describe, it, expect } from 'vitest';
import {
  computeAnchorRect,
  computeCaretAnchorRect,
  confirmingKey,
  getConfirmingKeyDisplayLabel,
  hintMessageKey,
  narrowToArmedMarkerText,
  readArmedHint,
  resolveArmedAnchorRect,
} from './two-step-delete-tooltip.utils';

type Rect = { top: number; left: number; width: number; height: number };

// Mock factories — avoid a jsdom dependency for pure-function tests. Each implements only the
// members the utils read. A missing attribute or element yields undefined here where the DOM gives
// null; the utils treat the two the same.
/* eslint-disable no-type-assertion/no-type-assertion */
const makeAttrEl = (attrs: Record<string, string>): Element =>
  ({
    getAttribute: (name: string) => attrs[name],
  }) as unknown as Element;

const toDomRect = (rect: Rect): DOMRect => ({
  top: rect.top,
  left: rect.left,
  right: rect.left + rect.width,
  bottom: rect.top + rect.height,
  width: rect.width,
  height: rect.height,
  x: rect.left,
  y: rect.top,
  toJSON: () => ({}),
});

const makeRectEl = (rect: Rect): HTMLElement =>
  ({ getBoundingClientRect: () => toDomRect(rect) }) as unknown as HTMLElement;

const makeStyledEl = (properties: Record<string, string>) =>
  ({
    style: { getPropertyValue: (name: string) => properties[name] ?? '' },
  }) as unknown as HTMLElement;

/** An element the editor marked as armed, with a box, attributes and custom properties. */
const makeArmedEl = (
  rect: Rect,
  attrs: Record<string, string> = {},
  properties: Record<string, string> = {},
): HTMLElement =>
  ({
    getBoundingClientRect: () => toDomRect(rect),
    getAttribute: (name: string) => attrs[name],
    style: { getPropertyValue: (name: string) => properties[name] ?? '' },
  }) as unknown as HTMLElement;

/**
 * A position anchor at `rect` that contains `contained` (for a caret check) and finds the elements
 * in `elementsByClass` by a single-class selector such as `.verse-selected`.
 */
const makePositionAnchor = (
  rect: Rect,
  {
    contained,
    elementsByClass = {},
  }: { contained?: unknown; elementsByClass?: Partial<Record<string, HTMLElement>> } = {},
): HTMLElement =>
  ({
    getBoundingClientRect: () => toDomRect(rect),
    contains: (node: unknown) => node === contained,
    querySelector: (selector: string) => elementsByClass[selector.replace(/^\./, '')],
  }) as unknown as HTMLElement;

const makeSelection = (
  caret: Rect,
  {
    isCollapsed = true,
    startContainer,
    rangeCount = 1,
  }: { isCollapsed?: boolean; startContainer?: unknown; rangeCount?: number } = {},
) =>
  ({
    rangeCount,
    isCollapsed,
    getRangeAt: () => ({ startContainer, getBoundingClientRect: () => toDomRect(caret) }),
  }) as unknown as Selection;
/* eslint-enable no-type-assertion/no-type-assertion */

describe('readArmedHint', () => {
  it('reads a backward verse arm', () => {
    const el = makeAttrEl({
      'data-verse-delete-intent': 'deleteBackward',
      'data-verse-delete-kind': 'verse',
    });
    expect(readArmedHint(el)).toEqual({ intent: 'deleteBackward', kind: 'verse' });
  });

  it('reads a forward selection arm', () => {
    const el = makeAttrEl({
      'data-verse-delete-intent': 'deleteForward',
      'data-verse-delete-kind': 'selection',
    });
    expect(readArmedHint(el)).toEqual({ intent: 'deleteForward', kind: 'selection' });
  });

  it('returns undefined when attributes are missing', () => {
    expect(readArmedHint(makeAttrEl({}))).toBeUndefined();
  });

  it('returns undefined for an undefined root (optional chaining also covers a null root)', () => {
    expect(readArmedHint(undefined)).toBeUndefined();
  });

  it.each(['joinPreviousPara', 'joinNextPara', 'removeEmptyPara'] as const)(
    'reads a paragraph arm of kind %s',
    (kind) => {
      const el = makeAttrEl({
        'data-verse-delete-intent': 'deleteForward',
        'data-verse-delete-kind': kind,
      });
      expect(readArmedHint(el)).toEqual({ intent: 'deleteForward', kind });
    },
  );

  it('returns undefined for an unrecognized kind', () => {
    const el = makeAttrEl({
      'data-verse-delete-intent': 'deleteBackward',
      'data-verse-delete-kind': 'para',
    });
    expect(readArmedHint(el)).toBeUndefined();
  });

  it('returns undefined for an unrecognized intent', () => {
    const el = makeAttrEl({
      'data-verse-delete-intent': 'sideways',
      'data-verse-delete-kind': 'verse',
    });
    expect(readArmedHint(el)).toBeUndefined();
  });
});

describe('hintMessageKey', () => {
  it.each([
    ['verse', '%webView_platformScriptureEditor_twoStepDelete_removeVerseNumber%'],
    ['selection', '%webView_platformScriptureEditor_twoStepDelete_deleteSelection%'],
    ['joinPreviousPara', '%webView_platformScriptureEditor_twoStepDelete_joinPreviousParagraph%'],
    ['joinNextPara', '%webView_platformScriptureEditor_twoStepDelete_joinNextParagraph%'],
    ['removeEmptyPara', '%webView_platformScriptureEditor_twoStepDelete_removeEmptyParagraph%'],
  ] as const)('names the %s arm with %s', (kind, key) => {
    expect(hintMessageKey({ intent: 'deleteBackward', kind })).toBe(key);
  });
});

describe('confirmingKey', () => {
  it('maps deleteBackward to the Backspace localization key', () => {
    expect(confirmingKey('deleteBackward')).toBe('%physicalKey_backspace%');
  });

  it('maps deleteForward to the Delete localization key', () => {
    expect(confirmingKey('deleteForward')).toBe('%physicalKey_delete%');
  });
});

describe('getConfirmingKeyDisplayLabel', () => {
  it('uses the macOS Backspace symbol instead of the localized word on macOS', () => {
    expect(getConfirmingKeyDisplayLabel('deleteBackward', 'Backspace', true)).toBe('⌫');
  });

  it('uses the macOS Forward Delete symbol instead of the localized word on macOS', () => {
    expect(getConfirmingKeyDisplayLabel('deleteForward', 'Delete', true)).toBe('⌦');
  });

  it('uses the localized word on non-macOS platforms', () => {
    expect(getConfirmingKeyDisplayLabel('deleteBackward', 'Retroceso', false)).toBe('Retroceso');
    expect(getConfirmingKeyDisplayLabel('deleteForward', 'Supr', false)).toBe('Supr');
  });
});

describe('computeAnchorRect', () => {
  it('returns the marker rect relative to the position anchor', () => {
    const anchor = makeRectEl({ top: 0, left: 0, width: 800, height: 600 });
    const marker = makeRectEl({ top: 120, left: 40, width: 18, height: 20 });
    expect(computeAnchorRect(marker, anchor)).toEqual({
      top: 120,
      left: 40,
      width: 18,
      height: 20,
    });
  });

  it('subtracts the anchor offset (anchor and marker move together on scroll)', () => {
    // Scrolled 200px: both anchor and marker viewport tops shift up by 200.
    const anchor = makeRectEl({ top: -200, left: 50, width: 800, height: 600 });
    const marker = makeRectEl({ top: -100, left: 90, width: 18, height: 20 });
    // top = -100-(-200)=100; left = 90-50=40
    expect(computeAnchorRect(marker, anchor)).toEqual({
      top: 100,
      left: 40,
      width: 18,
      height: 20,
    });
  });
});

describe('narrowToArmedMarkerText', () => {
  const rect = { top: 100, left: 40, width: 48, height: 20 };

  it('narrows the rect to the published text bounds', () => {
    const marker = makeStyledEl({
      '--para-merge-armed-text-left': '30px',
      '--para-merge-armed-text-width': '14.5px',
    });
    expect(narrowToArmedMarkerText(rect, marker)).toEqual({
      top: 100,
      left: 70,
      width: 14.5,
      height: 20,
    });
  });

  it('keeps the rect when no text bounds are published', () => {
    expect(narrowToArmedMarkerText(rect, makeStyledEl({}))).toEqual(rect);
  });
});

describe('computeCaretAnchorRect', () => {
  const caretNode = {};
  const positionAnchor = makePositionAnchor(
    { top: -200, left: 50, width: 800, height: 600 },
    { contained: caretNode },
  );
  const caretSelection = (caret: Rect, options: Parameters<typeof makeSelection>[1] = {}) =>
    makeSelection(caret, { startContainer: caretNode, ...options });

  it('returns the caret rect relative to the position anchor', () => {
    const selection = caretSelection({ top: -100, left: 90, width: 1, height: 18 });
    expect(computeCaretAnchorRect(selection, positionAnchor)).toEqual({
      top: 100,
      left: 40,
      width: 1,
      height: 18,
    });
  });

  it('returns undefined without a selection', () => {
    expect(computeCaretAnchorRect(undefined, positionAnchor)).toBeUndefined();
  });

  it('returns undefined for a selection with no range', () => {
    const selection = caretSelection({ top: 0, left: 0, width: 1, height: 18 }, { rangeCount: 0 });
    expect(computeCaretAnchorRect(selection, positionAnchor)).toBeUndefined();
  });

  it('returns undefined for a range that is not collapsed', () => {
    const selection = caretSelection(
      { top: 0, left: 0, width: 40, height: 18 },
      { isCollapsed: false },
    );
    expect(computeCaretAnchorRect(selection, positionAnchor)).toBeUndefined();
  });

  it('returns undefined for a caret outside the position anchor', () => {
    const selection = caretSelection(
      { top: 0, left: 0, width: 1, height: 18 },
      { startContainer: {} },
    );
    expect(computeCaretAnchorRect(selection, positionAnchor)).toBeUndefined();
  });

  it('returns undefined when the browser gives the caret no box', () => {
    const selection = caretSelection({ top: 0, left: 0, width: 0, height: 0 });
    expect(computeCaretAnchorRect(selection, positionAnchor)).toBeUndefined();
  });
});

describe('resolveArmedAnchorRect', () => {
  const anchorRect = { top: 0, left: 0, width: 800, height: 600 };
  const caretNode = {};
  const caret = makeSelection(
    { top: 130, left: 220, width: 1, height: 18 },
    { startContainer: caretNode },
  );
  const noCaretBox = makeSelection(
    { top: 0, left: 0, width: 0, height: 0 },
    { startContainer: caretNode },
  );
  const verseMarker = makeArmedEl({ top: 100, left: 40, width: 18, height: 20 });
  const gutterMarker = makeArmedEl(
    { top: 120, left: 0, width: 48, height: 20 },
    { 'data-text-type': 'marker' },
    { '--para-merge-armed-text-left': '30px', '--para-merge-armed-text-width': '14px' },
  );
  const paragraph = makeArmedEl({ top: 120, left: 48, width: 600, height: 80 });

  it.each([
    {
      name: 'a verse arm anchors to the armed verse marker',
      kind: 'verse',
      elementsByClass: { 'verse-selected': verseMarker, 'para-merge-armed': gutterMarker },
      selection: caret,
      expected: { top: 100, left: 40, width: 18, height: 20 },
    },
    {
      name: "a paragraph arm on a gutter marker anchors to the marker's text",
      kind: 'joinPreviousPara',
      elementsByClass: { 'verse-selected': verseMarker, 'para-merge-armed': gutterMarker },
      selection: caret,
      expected: { top: 120, left: 30, width: 14, height: 20 },
    },
    {
      name: 'a paragraph arm with no marker shown anchors to the caret',
      kind: 'joinNextPara',
      elementsByClass: { 'para-merge-armed': paragraph },
      selection: caret,
      expected: { top: 130, left: 220, width: 1, height: 18 },
    },
    {
      name: "a paragraph arm with no marker and no caret box falls back to the paragraph's box",
      kind: 'removeEmptyPara',
      elementsByClass: { 'para-merge-armed': paragraph },
      selection: noCaretBox,
      expected: { top: 120, left: 48, width: 600, height: 80 },
    },
  ] as const)('$name', ({ kind, elementsByClass, selection, expected }) => {
    const positionAnchor = makePositionAnchor(anchorRect, {
      contained: caretNode,
      elementsByClass,
    });
    expect(
      resolveArmedAnchorRect({ intent: 'deleteBackward', kind }, positionAnchor, selection),
    ).toEqual(expected);
  });

  it('returns undefined when the editor marked no element for the armed kind', () => {
    const positionAnchor = makePositionAnchor(anchorRect, {
      elementsByClass: { 'verse-selected': verseMarker },
    });
    expect(
      resolveArmedAnchorRect(
        { intent: 'deleteBackward', kind: 'joinPreviousPara' },
        positionAnchor,
        caret,
      ),
    ).toBeUndefined();
  });
});
