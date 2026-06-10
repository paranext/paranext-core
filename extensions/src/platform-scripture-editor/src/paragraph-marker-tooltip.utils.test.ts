import { describe, it, expect } from 'vitest';
import { computePosition, extractMarker } from './paragraph-marker-tooltip.utils';

// Mock element factory — avoids jsdom dependency for pure-function tests.
const makeEl = (rect: { top: number; bottom: number; left: number }, scrollTop = 0): HTMLElement =>
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
    scrollTop,
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

describe('computePosition', () => {
  it('returns top-left of a visible para when scrollTop is 0', () => {
    const anchor = makeEl({ top: 0, bottom: 800, left: 0 });
    const para = makeEl({ top: 100, bottom: 150, left: 20 });
    const scroller = makeEl({ top: 0, bottom: 800, left: 0 }, 0);
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 100, left: 20 });
  });

  it('subtracts anchor left from para left', () => {
    const anchor = makeEl({ top: 0, bottom: 800, left: 50 });
    const para = makeEl({ top: 100, bottom: 150, left: 70 });
    const scroller = makeEl({ top: 0, bottom: 800, left: 0 }, 0);
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 100, left: 20 });
  });

  it('adds scrollTop to produce content-relative top', () => {
    const anchor = makeEl({ top: 0, bottom: 600, left: 0 });
    const para = makeEl({ top: 300, bottom: 400, left: 0 });
    const scroller = makeEl({ top: 0, bottom: 600, left: 0 }, 200);
    // topInContent = 300 + 200 = 500; clampedTop = max(500, 200) = 500
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 500, left: 0 });
  });

  it('clamps to scrollTop when para top has scrolled above viewport', () => {
    // para.top = -50 means the top of the para is 50px above the viewport
    const anchor = makeEl({ top: 0, bottom: 600, left: 0 });
    const para = makeEl({ top: -50, bottom: 300, left: 0 });
    const scroller = makeEl({ top: 0, bottom: 600, left: 0 }, 200);
    // topInContent = -50 + 200 = 150; clampedTop = max(150, 200) = 200
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 200, left: 0 });
  });

  it('caps at para bottom minus 1 when para is almost entirely scrolled past', () => {
    // Only 10px of the para remains visible at the top of the viewport
    const anchor = makeEl({ top: 0, bottom: 600, left: 0 });
    const para = makeEl({ top: -300, bottom: 10, left: 0 });
    const scroller = makeEl({ top: 0, bottom: 600, left: 0 }, 500);
    // topInContent = -300 + 500 = 200; bottomInContent = 10 + 500 = 510
    // clampedTop = max(200, 500) = 500; finalTop = min(500, 509) = 500
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 500, left: 0 });
  });

  it('caps at para bottom minus 1 when para is tiny and near-fully scrolled past', () => {
    // Tiny para (10px tall) with only a sliver left in view
    const anchor = makeEl({ top: 0, bottom: 600, left: 0 });
    const para = makeEl({ top: -50, bottom: -40, left: 0 });
    const scroller = makeEl({ top: 0, bottom: 600, left: 0 }, 100);
    // topInContent = -50 + 100 = 50; bottomInContent = -40 + 100 = 60
    // clampedTop = max(50, 100) = 100; finalTop = min(100, 59) = 59
    expect(computePosition(para, anchor, scroller)).toEqual({ top: 59, left: 0 });
  });
});
