import { describe, it, expect } from 'vitest';
import { DEFAULT_ZOOM_FACTOR } from './resource-zoom.utils';

describe('resource-zoom.utils', () => {
  it('exposes the default zoom factor', () => {
    expect(DEFAULT_ZOOM_FACTOR).toBe(1);
  });
});
