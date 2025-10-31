import { describe, it, expect } from 'vitest';
import { getPaneSizeLimits } from './pane-utils';

describe('getPaneSizeLimits', () => {
  it('calculates correct min/max for normal height with default options', () => {
    const { minPercent, maxPercent } = getPaneSizeLimits(500);
    expect(minPercent).toBeGreaterThan(0);
    expect(maxPercent).toBeLessThanOrEqual(90);
  });

  it('falls back to absolute min/max for very small height with default options', () => {
    const { minPercent, maxPercent } = getPaneSizeLimits(10);
    expect(minPercent).toBe(3);
    expect(maxPercent).toBe(90);
  });

  it('falls back to absolute min/max when options specify min heights greater than available ', () => {
    const { minPercent, maxPercent } = getPaneSizeLimits(502, {
      secondaryPaneMinHeightPx: 50,
      mainPaneMinHeightPx: 450,
      splitterHeightPx: 10,
      absoluteMinPercent: 5,
      absoluteMaxPercent: 50,
    });
    expect(minPercent).toBe(5);
    expect(maxPercent).toBe(50);
  });

  it('calculates actual percentages based on given pane minimums', () => {
    const { minPercent, maxPercent } = getPaneSizeLimits(304, {
      secondaryPaneMinHeightPx: 30,
      mainPaneMinHeightPx: 100,
    });
    expect(minPercent).toBe(10);
    expect(maxPercent).toBe(66);
  });
});
