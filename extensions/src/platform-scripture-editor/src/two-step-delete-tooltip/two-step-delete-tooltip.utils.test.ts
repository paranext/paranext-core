import { describe, it, expect } from 'vitest';
import {
  computeAnchorRect,
  computeCaretAnchorRect,
  confirmingKey,
  getConfirmingKeyDisplayLabel,
  hintMessageKey,
  narrowToArmedMarkerText,
  readArmedHint,
} from './two-step-delete-tooltip.utils';

// Mock element factory — avoids a jsdom dependency for pure-function tests. Only the two members
// the utils touch (getAttribute, getBoundingClientRect) are implemented. A missing attribute
// yields undefined here; `readArmedHint` treats that the same as the DOM's null (neither matches).
/* eslint-disable no-type-assertion/no-type-assertion */
const makeAttrEl = (attrs: Record<string, string>): Element =>
  ({
    getAttribute: (name: string) => attrs[name],
  }) as unknown as Element;

const makeRectEl = (rect: {
  top: number;
  left: number;
  width: number;
  height: number;
}): HTMLElement =>
  ({
    getBoundingClientRect: () => ({
      top: rect.top,
      left: rect.left,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      width: rect.width,
      height: rect.height,
      x: rect.left,
      y: rect.top,
      toJSON: () => ({}),
    }),
  }) as unknown as HTMLElement;
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
  // Mock element: only `style.getPropertyValue` is read.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const makeStyledEl = (properties: Record<string, string>) =>
    ({
      style: { getPropertyValue: (name: string) => properties[name] ?? '' },
    }) as unknown as HTMLElement;
  /* eslint-enable no-type-assertion/no-type-assertion */

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
  const anchor = {
    ...makeRectEl({ top: -200, left: 50, width: 800, height: 600 }),
    contains: (node: unknown) => node === caretNode,
  };
  // Mock selection: only the members the util reads.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const makeSelection = (
    caret: { top: number; left: number; width: number; height: number },
    { isCollapsed = true, startContainer = caretNode } = {},
  ) =>
    ({
      rangeCount: 1,
      isCollapsed,
      getRangeAt: () => ({
        startContainer,
        getBoundingClientRect: () => makeRectEl(caret).getBoundingClientRect(),
      }),
    }) as unknown as Selection;
  const positionAnchor = anchor as unknown as HTMLElement;
  /* eslint-enable no-type-assertion/no-type-assertion */

  it('returns the caret rect relative to the position anchor', () => {
    const selection = makeSelection({ top: -100, left: 90, width: 1, height: 18 });
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

  it('returns undefined for a range that is not collapsed', () => {
    const selection = makeSelection(
      { top: 0, left: 0, width: 40, height: 18 },
      { isCollapsed: false },
    );
    expect(computeCaretAnchorRect(selection, positionAnchor)).toBeUndefined();
  });

  it('returns undefined for a caret outside the position anchor', () => {
    const selection = makeSelection(
      { top: 0, left: 0, width: 1, height: 18 },
      { startContainer: {} },
    );
    expect(computeCaretAnchorRect(selection, positionAnchor)).toBeUndefined();
  });

  it('returns undefined when the browser gives the caret no box', () => {
    const selection = makeSelection({ top: 0, left: 0, width: 0, height: 0 });
    expect(computeCaretAnchorRect(selection, positionAnchor)).toBeUndefined();
  });
});
