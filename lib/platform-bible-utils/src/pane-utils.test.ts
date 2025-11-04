import { getPaneSizeLimits } from './pane-utils';

describe('getPaneSizeLimits', () => {
  it('calculates correct min/max for normal size with default options', () => {
    const { minPercent, maxPercent } = getPaneSizeLimits(500);
    expect(minPercent).toBeGreaterThan(0);
    expect(maxPercent).toBeLessThanOrEqual(90);
  });

  it('falls back to absolute min/max for very small size with default options', () => {
    const { minPercent, maxPercent } = getPaneSizeLimits(10);
    expect(minPercent).toBe(3);
    expect(maxPercent).toBe(90);
  });

  it('falls back to absolute min/max when options specify min sizes greater than available', () => {
    const { minPercent, maxPercent } = getPaneSizeLimits(502, {
      secondaryPaneMinSizePx: 50,
      mainPaneMinSizePx: 450,
      splitterThicknessPx: 10,
      absoluteMinPercent: 5,
      absoluteMaxPercent: 50,
    });
    expect(minPercent).toBe(5);
    expect(maxPercent).toBe(50);
  });

  it('calculates actual percentages based on given pane minimums', () => {
    const { minPercent, maxPercent } = getPaneSizeLimits(304, {
      secondaryPaneMinSizePx: 30,
      mainPaneMinSizePx: 100,
    });
    expect(minPercent).toBe(10);
    expect(maxPercent).toBe(66);
  });
});
