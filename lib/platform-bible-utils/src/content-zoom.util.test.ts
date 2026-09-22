import { describe, it, expect } from 'vitest';
import {
  MIN_ZOOM_FACTOR,
  MAX_ZOOM_FACTOR,
  ZOOM_STEP,
  clampZoom,
  roundZoom,
  adjustZoomFactor,
} from './content-zoom.util';

describe('content-zoom.util', () => {
  it('exposes the agreed range and step', () => {
    expect(MIN_ZOOM_FACTOR).toBe(0.5);
    expect(MAX_ZOOM_FACTOR).toBe(3);
    expect(ZOOM_STEP).toBe(0.1);
  });

  it('clamps below min and above max', () => {
    expect(clampZoom(0.1)).toBe(MIN_ZOOM_FACTOR);
    expect(clampZoom(0.2)).toBe(MIN_ZOOM_FACTOR);
    expect(clampZoom(9)).toBe(MAX_ZOOM_FACTOR);
    expect(clampZoom(1.2)).toBe(1.2);
  });

  it('rounds to one decimal to avoid float drift', () => {
    expect(roundZoom(1.2000000000000002)).toBe(1.2);
    expect(roundZoom(0.7999999999)).toBe(0.8);
    expect(roundZoom(0.75)).toBe(0.8);
  });

  it('adjusts by whole steps and stays within bounds', () => {
    expect(adjustZoomFactor(1, 1)).toBe(1.1);
    expect(adjustZoomFactor(1, -1)).toBe(0.9);
    expect(adjustZoomFactor(1.1, 1)).toBe(1.2);
    expect(adjustZoomFactor(1.2, -1)).toBe(1.1);
    // No overshoot at the ceiling/floor.
    expect(adjustZoomFactor(3, 1)).toBe(3);
    expect(adjustZoomFactor(0.5, -1)).toBe(0.5);
  });

  it('snaps an off-grid factor to the nearest tenth as it steps', () => {
    // An off-grid factor lands back on the tenth grid, so a step is not always 10 points: from a
    // stored 1.25, `+1` moves 15 points and `-1` moves 5, because `Math.round` breaks the .5 tie
    // upward in both directions.
    expect(adjustZoomFactor(1.25, 1)).toBe(1.4);
    expect(adjustZoomFactor(1.25, -1)).toBe(1.2);
  });

  it('avoids accumulated float drift across many repeated steps', () => {
    let factor = 1;
    for (let i = 0; i < 20; i += 1) factor = adjustZoomFactor(factor, 1);
    expect(factor).toBe(3);

    let factorDown = 1;
    for (let i = 0; i < 5; i += 1) factorDown = adjustZoomFactor(factorDown, -1);
    expect(factorDown).toBe(0.5);

    expect(adjustZoomFactor(2.9000000000000004, 1)).toBe(3);
  });
});
