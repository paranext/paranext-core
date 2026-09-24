import { describe, expect, it } from 'vitest';
import { contentZoomOverlayStyle } from './overlay-content-zoom.util';

describe('contentZoomOverlayStyle', () => {
  it('adds nothing at interface scale, so an unzoomed pane renders exactly as before', () => {
    expect(contentZoomOverlayStyle(1, 'popover')).toEqual({});
  });

  it('adds nothing for a scale that is not a usable number', () => {
    expect(contentZoomOverlayStyle(Number.NaN, 'popover')).toEqual({});
    expect(contentZoomOverlayStyle(0, 'popover')).toEqual({});
  });

  it('scales the content and divides the available space by the same factor', () => {
    expect(contentZoomOverlayStyle(1.5, 'popover')).toEqual({
      zoom: 1.5,
      maxWidth: 'calc(var(--radix-popover-content-available-width) / 1.5)',
      maxHeight: 'calc(var(--radix-popover-content-available-height) / 1.5)',
    });
  });

  it('uses the primitive the caller names for its variables', () => {
    expect(contentZoomOverlayStyle(2, 'dropdown-menu')).toEqual({
      zoom: 2,
      maxWidth: 'calc(var(--radix-dropdown-menu-content-available-width) / 2)',
      maxHeight: 'calc(var(--radix-dropdown-menu-content-available-height) / 2)',
    });
  });
});
