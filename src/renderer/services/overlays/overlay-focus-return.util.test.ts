import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  markOverlayFocusReturnIfFocusInside,
  resetOverlayFocusReturnMarks,
  takeOverlayFocusReturnMark,
} from './overlay-focus-return.util';
import { addOverlay, clearAllOverlays, resolveAndRemoveOverlay } from './overlay-store';

function addPopover(id: string): void {
  addOverlay({
    type: 'popover',
    id,
    webViewId: 'webview-1',
    request: { anchor: { x: 0, y: 0 }, content: { type: 'text', body: 'Hello' } },
    content: { type: 'text', body: 'Hello' },
    position: { x: 0, y: 0 },
    resolve: vi.fn(),
    reject: vi.fn(),
  });
}

describe('overlay focus-return marks', () => {
  afterEach(() => {
    clearAllOverlays();
    resetOverlayFocusReturnMarks();
  });

  it('keeps a mark made while the overlay is open until it is taken once', () => {
    addPopover('popover-1');

    markOverlayFocusReturnIfFocusInside('popover-1');

    expect(takeOverlayFocusReturnMark('popover-1')).toBe(true);
    expect(takeOverlayFocusReturnMark('popover-1')).toBe(false);
  });

  it('ignores a mark made after the overlay was removed', () => {
    addPopover('popover-1');
    resolveAndRemoveOverlay('popover-1', 'popover', undefined);

    markOverlayFocusReturnIfFocusInside('popover-1');

    expect(takeOverlayFocusReturnMark('popover-1')).toBe(false);
  });

  it('drops every mark on reset', () => {
    addPopover('popover-1');
    markOverlayFocusReturnIfFocusInside('popover-1');

    resetOverlayFocusReturnMarks();

    expect(takeOverlayFocusReturnMark('popover-1')).toBe(false);
  });
});
