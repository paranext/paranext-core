import { describe, it, expect } from 'vitest';
import { computeAnchorRect, confirmingKey, readArmedHint } from './verse-delete-tooltip.utils';

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

  it('returns undefined for an unrecognized kind (e.g. a paragraph merge exposes none)', () => {
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

describe('confirmingKey', () => {
  it('maps deleteBackward to Backspace', () => {
    expect(confirmingKey('deleteBackward')).toBe('Backspace');
  });

  it('maps deleteForward to Delete', () => {
    expect(confirmingKey('deleteForward')).toBe('Delete');
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
