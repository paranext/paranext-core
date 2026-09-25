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

  it('steps an off-grid factor to the next tenth in the direction of travel', () => {
    // An off-grid factor first drops to the grid mark it has passed in the direction of travel, so
    // one step never skips the nearest mark: 1.37 goes to 1.4 on `+1` and to 1.3 on `-1`.
    expect(adjustZoomFactor(1.37, 1)).toBe(1.4);
    expect(adjustZoomFactor(1.37, -1)).toBe(1.3);
    expect(adjustZoomFactor(1.25, 1)).toBe(1.3);
    expect(adjustZoomFactor(1.25, -1)).toBe(1.2);
    expect(adjustZoomFactor(1.34, -1)).toBe(1.3);
    expect(adjustZoomFactor(1.15, -1)).toBe(1.1);
    // Several steps count from that mark.
    expect(adjustZoomFactor(1.37, 2)).toBe(1.5);
    expect(adjustZoomFactor(1.37, -2)).toBe(1.2);
    // Near the bounds the step still clamps.
    expect(adjustZoomFactor(2.95, 1)).toBe(3);
    expect(adjustZoomFactor(0.55, -1)).toBe(0.5);
  });

  it('keeps an on-grid factor on the grid despite float noise in its tenths', () => {
    // 1.1 * 10, 2.3 * 10 and 0.7 * 10 are not whole numbers in binary floating point; a factor on
    // the grid must still move by exactly one mark.
    expect(adjustZoomFactor(1.1, 1)).toBe(1.2);
    expect(adjustZoomFactor(1.1, -1)).toBe(1);
    expect(adjustZoomFactor(2.3, 1)).toBe(2.4);
    expect(adjustZoomFactor(2.3, -1)).toBe(2.2);
    expect(adjustZoomFactor(0.7, 1)).toBe(0.8);
    expect(adjustZoomFactor(0.7, -1)).toBe(0.6);
    expect(adjustZoomFactor(2.9000000000000004, -1)).toBe(2.8);
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
