import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  addOverlay,
  removeOverlay,
  getOverlays,
  getOverlaysByWebView,
  removeOverlaysByWebView,
  subscribe,
  getOverlayById,
  clearAllOverlays,
} from '@renderer/services/overlay-store';
import { OverlayEntry, ContextMenuItem } from '@shared/models/overlay.service-model';

function createContextMenuEntry(
  id: string,
  webViewId: string,
  items?: ContextMenuItem[],
): OverlayEntry {
  return {
    type: 'contextMenu',
    id,
    webViewId,
    items: items ?? [{ type: 'item', id: 'item1', label: 'Test Item' }],
    position: { x: 100, y: 200 },
    resolve: vi.fn(),
    reject: vi.fn(),
  };
}

describe('overlay-store', () => {
  beforeEach(() => {
    clearAllOverlays();
  });

  describe('addOverlay', () => {
    it('should add an overlay entry to the store', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      expect(getOverlays()).toHaveLength(1);
      expect(getOverlays()[0]).toBe(entry);
    });

    it('should support multiple overlays', () => {
      const entry1 = createContextMenuEntry('overlay-1', 'webview-1');
      const entry2 = createContextMenuEntry('overlay-2', 'webview-2');
      addOverlay(entry1);
      addOverlay(entry2);
      expect(getOverlays()).toHaveLength(2);
    });
  });

  describe('removeOverlay', () => {
    it('should remove an overlay by id and return it', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const removed = removeOverlay('overlay-1');
      expect(removed).toBe(entry);
      expect(getOverlays()).toHaveLength(0);
    });

    it('should return undefined when removing a non-existent overlay', () => {
      const removed = removeOverlay('non-existent');
      expect(removed).toBeUndefined();
    });
  });

  describe('getOverlaysByWebView', () => {
    it('should return overlays for a specific webViewId', () => {
      const entry1 = createContextMenuEntry('overlay-1', 'webview-1');
      const entry2 = createContextMenuEntry('overlay-2', 'webview-1');
      const entry3 = createContextMenuEntry('overlay-3', 'webview-2');
      addOverlay(entry1);
      addOverlay(entry2);
      addOverlay(entry3);
      const webView1Overlays = getOverlaysByWebView('webview-1');
      expect(webView1Overlays).toHaveLength(2);
      expect(webView1Overlays).toContain(entry1);
      expect(webView1Overlays).toContain(entry2);
    });

    it('should return empty array when no overlays match', () => {
      expect(getOverlaysByWebView('non-existent')).toHaveLength(0);
    });
  });

  describe('removeOverlaysByWebView', () => {
    it('should remove all overlays for a webViewId', () => {
      const entry1 = createContextMenuEntry('overlay-1', 'webview-1');
      const entry2 = createContextMenuEntry('overlay-2', 'webview-1');
      const entry3 = createContextMenuEntry('overlay-3', 'webview-2');
      addOverlay(entry1);
      addOverlay(entry2);
      addOverlay(entry3);
      removeOverlaysByWebView('webview-1');
      expect(getOverlays()).toHaveLength(1);
      expect(getOverlays()[0]).toBe(entry3);
    });
  });

  describe('getOverlayById', () => {
    it('should return the overlay with the given id', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      expect(getOverlayById('overlay-1')).toBe(entry);
    });

    it('should return undefined for non-existent id', () => {
      expect(getOverlayById('non-existent')).toBeUndefined();
    });
  });

  describe('subscribe', () => {
    it('should notify listeners when overlays are added', () => {
      const listener = vi.fn();
      subscribe(listener);
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should notify listeners when overlays are removed', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const listener = vi.fn();
      subscribe(listener);
      removeOverlay('overlay-1');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should stop notifying after unsubscribe', () => {
      const listener = vi.fn();
      const unsubscribe = subscribe(listener);
      unsubscribe();
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      expect(listener).not.toHaveBeenCalled();
    });

    it('should notify listeners when overlays are removed by webViewId', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const listener = vi.fn();
      subscribe(listener);
      removeOverlaysByWebView('webview-1');
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
