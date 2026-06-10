import { describe, it, expect } from 'vitest';
import { computePosition, extractMarker } from './paragraph-marker-tooltip.utils';

// Mock element factory — avoids jsdom dependency for pure-function tests.
// scrollContainer is treated as an ancestor of positionAnchor, so its getBoundingClientRect().top
// determines the visible-area boundary used for clamping. No scrollTop property is needed.
// Type assertion needed to satisfy HTMLElement interface when creating mock object without jsdom dependency
// eslint-disable-next-line no-type-assertion/no-type-assertion
const makeEl = (rect: { top: number; bottom: number; left: number }): HTMLElement =>
  ({
    getBoundingClientRect: () => ({
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.left + 200,
      width: 200,
      height: rect.bottom - rect.top,
      x: rect.left,
      y: rect.top,
      toJSON: () => ({}),
    }),
  }) as unknown as HTMLElement;

describe('extractMarker', () => {
  it('extracts a simple marker', () => {
    expect(extractMarker('para usfm_p')).toBe('p');
  });

  it('extracts a composite marker', () => {
    expect(extractMarker('para usfm_q1 ContentEditable__root')).toBe('q1');
  });

  it('returns undefined when no usfm_ token is present', () => {
    expect(extractMarker('para something-else')).toBeUndefined();
  });

  it('returns undefined for an empty string', () => {
    expect(extractMarker('')).toBeUndefined();
  });
});

// In these tests scrollContainer is an ancestor of positionAnchor.  When the user has
// scrolled N px down, positionAnchor's viewport top is at -N (it moved up), para viewport
// positions follow from their content positions, and the scroller stays at viewport 0.
describe('computePosition', () => {
  it('returns correct top and left=0 for a visible para with no scroll', () => {
    // No scroll: anchor at viewport 0, para at content position 100 → viewport 100
    const anchor = makeEl({ top: 0, bottom: 800, left: 0 });
    const para = makeEl({ top: 100, bottom: 150, left: 20 });
    const scroller = makeEl({ top: 0, bottom: 800, left: 0 });
    // topInContent = 100-0=100; visibleAreaTop = 0-0=0; clamp→100
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 100, left: 0 });
  });

  it('always returns left=0 regardless of para horizontal position (leading margin)', () => {
    const anchor = makeEl({ top: 0, bottom: 800, left: 50 });
    const para = makeEl({ top: 100, bottom: 150, left: 70 });
    const scroller = makeEl({ top: 0, bottom: 800, left: 0 });
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 100, left: 0 });
  });

  it('para and anchor move together on scroll so topInContent reflects content position', () => {
    // Scrolled 200px: anchor at viewport -200, para at content pos 300 → viewport 100
    const anchor = makeEl({ top: -200, bottom: 400, left: 0 });
    const para = makeEl({ top: 100, bottom: 200, left: 0 });
    const scroller = makeEl({ top: 0, bottom: 600, left: 0 });
    // topInContent = 100-(-200)=300; visibleAreaTop = 0-(-200)=200; clamp→max(300,200)=300
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 300, left: 0 });
  });

  it('clamps to visible area top when para has partially scrolled above viewport', () => {
    // Scrolled 200px: anchor at -200; para content pos 50-350, viewport top = -150 (above viewport)
    const anchor = makeEl({ top: -200, bottom: 400, left: 0 });
    const para = makeEl({ top: -150, bottom: 150, left: 0 });
    const scroller = makeEl({ top: 0, bottom: 600, left: 0 });
    // topInContent = -150-(-200)=50; visibleAreaTop = 0-(-200)=200; clamp→max(50,200)=200
    // bottomInContent = 150-(-200)=350; finalTop = min(200,349)=200
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 200, left: 0 });
  });

  it('caps at para bottom minus 1 when para is almost entirely scrolled past', () => {
    // Scrolled 500px: anchor at -500; para content pos 200-510, viewport top=-300, bottom=10
    const anchor = makeEl({ top: -500, bottom: 100, left: 0 });
    const para = makeEl({ top: -300, bottom: 10, left: 0 });
    const scroller = makeEl({ top: 0, bottom: 600, left: 0 });
    // topInContent = -300-(-500)=200; visibleAreaTop = 0-(-500)=500
    // clampedTop = max(200,500)=500; bottomInContent = 10-(-500)=510
    // finalTop = min(500,509)=500
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 500, left: 0 });
  });

  it('caps at para bottom minus 1 when para is tiny and near-fully scrolled past', () => {
    // Tiny para (10px) with only a sliver visible: anchor at -100, para content pos 50-60
    const anchor = makeEl({ top: -100, bottom: 500, left: 0 });
    const para = makeEl({ top: -50, bottom: -40, left: 0 });
    const scroller = makeEl({ top: 0, bottom: 600, left: 0 });
    // topInContent = -50-(-100)=50; visibleAreaTop = 0-(-100)=100
    // clampedTop = max(50,100)=100; bottomInContent = -40-(-100)=60
    // finalTop = min(100,59)=59
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 59, left: 0 });
  });
});
