import { describe, it, expect } from 'vitest';
import {
  DEFAULT_ZOOM_FACTOR,
  MIN_ZOOM_FACTOR,
  MAX_ZOOM_FACTOR,
  clampZoom,
  roundZoom,
  adjustZoomFactor,
} from './resource-zoom.utils';

describe('resource-zoom.utils', () => {
  it('exposes the agreed constants', () => {
    expect(DEFAULT_ZOOM_FACTOR).toBe(1);
    expect(MIN_ZOOM_FACTOR).toBe(0.5);
    expect(MAX_ZOOM_FACTOR).toBe(3);
  });

  it('clamps below min and above max', () => {
    expect(clampZoom(0.1)).toBe(MIN_ZOOM_FACTOR);
    expect(clampZoom(9)).toBe(MAX_ZOOM_FACTOR);
    expect(clampZoom(1.2)).toBe(1.2);
  });

  it('rounds to one decimal to avoid float drift', () => {
    expect(roundZoom(1.2000000000000002)).toBe(1.2);
    expect(roundZoom(0.7999999999)).toBe(0.8);
  });

  it('adjusts by whole steps and stays within bounds', () => {
    expect(adjustZoomFactor(1, 1)).toBe(1.1);
    expect(adjustZoomFactor(1, -1)).toBe(0.9);
    // No overshoot at the ceiling/floor.
    expect(adjustZoomFactor(3, 1)).toBe(3);
    expect(adjustZoomFactor(0.5, -1)).toBe(0.5);
    // Accumulated float error does not leak.
    expect(adjustZoomFactor(1.1, 1)).toBe(1.2);
  });
});
