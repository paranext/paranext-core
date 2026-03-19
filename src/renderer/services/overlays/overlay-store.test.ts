import { describe, it, expect, vi, beforeEach } from 'vitest';
import { newPlatformError } from 'platform-bible-utils';
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
import { OverlayEntry } from './overlay.service-model';
import {
  addOverlay,
  getOverlays,
  getOverlaysByWebView,
  subscribe,
  getOverlayById,
  clearAllOverlays,
  resolveAndRemoveOverlay,
  rejectAndRemoveOverlay,
} from './overlay-store';

function createContextMenuEntry(
  id: string,
  webViewId: string,
  items?: OverlayContextMenuItem[],
): OverlayEntry {
  return {
    type: 'contextMenu',
    id,
    webViewId,
    items: items ?? [{ type: 'item', id: 'item1', label: 'Test Item' }],
    position: { x: 100, y: 200 },
    resolve: vi.fn<(result: string | undefined) => void>(),
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

  describe('resolveAndRemoveOverlay', () => {
    it('should call resolve on the entry, remove it, and return true', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const result = resolveAndRemoveOverlay('overlay-1', 'ext.test');
      expect(result).toBe(true);
      expect(entry.resolve).toHaveBeenCalledWith('ext.test');
      expect(getOverlays()).toHaveLength(0);
    });

    it('should return false and not throw when overlay not found', () => {
      const result = resolveAndRemoveOverlay('non-existent', undefined);
      expect(result).toBe(false);
    });

    it('should notify listeners', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const listener = vi.fn();
      subscribe(listener);
      resolveAndRemoveOverlay('overlay-1', undefined);
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('rejectAndRemoveOverlay', () => {
    it('should call reject on the entry, remove it, and return true', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const error = newPlatformError('test error');
      const result = rejectAndRemoveOverlay('overlay-1', error);
      expect(result).toBe(true);
      expect(entry.reject).toHaveBeenCalledWith(error);
      expect(getOverlays()).toHaveLength(0);
    });

    it('should return false when overlay not found', () => {
      const error = newPlatformError('test error');
      const result = rejectAndRemoveOverlay('non-existent', error);
      expect(result).toBe(false);
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

    it('should notify listeners when overlays are resolved and removed', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const listener = vi.fn();
      subscribe(listener);
      resolveAndRemoveOverlay('overlay-1', undefined);
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
  });
});
