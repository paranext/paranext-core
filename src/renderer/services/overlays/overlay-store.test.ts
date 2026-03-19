import { describe, it, expect, vi, beforeEach } from 'vitest';
import { newPlatformError } from 'platform-bible-utils';
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
import { OverlayEntry, PopoverContent } from './overlay.service-model';
import {
  addOverlay,
  getOverlays,
  getOverlaysByWebView,
  subscribe,
  getOverlayById,
  clearAllOverlays,
  resolveAndRemoveOverlay,
  rejectAndRemoveOverlay,
  updateOverlayContent,
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

    it('should throw on duplicate overlay id', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const duplicate = createContextMenuEntry('overlay-1', 'webview-2');
      expect(() => addOverlay(duplicate)).toThrow('Overlay with id overlay-1 already exists');
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
      const result = resolveAndRemoveOverlay('overlay-1', 'contextMenu', 'ext.test');
      expect(result).toBe(true);
      expect(entry.resolve).toHaveBeenCalledWith('ext.test');
      expect(getOverlays()).toHaveLength(0);
    });

    it('should return false and not throw when overlay not found', () => {
      const result = resolveAndRemoveOverlay('non-existent', 'contextMenu', undefined);
      expect(result).toBe(false);
    });

    it('should notify listeners', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const listener = vi.fn();
      subscribe(listener);
      resolveAndRemoveOverlay('overlay-1', 'contextMenu', undefined);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should throw on overlay type mismatch', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      expect(() => resolveAndRemoveOverlay('overlay-1', 'popover', undefined)).toThrow(
        'Overlay type mismatch: expected popover, got contextMenu',
      );
      // Entry should NOT have been removed since the mismatch threw before resolve
      expect(getOverlays()).toHaveLength(1);
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
      resolveAndRemoveOverlay('overlay-1', 'contextMenu', undefined);
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

  describe('updateOverlayContent', () => {
    it('should update content of a popover overlay and return true', () => {
      const popoverEntry: OverlayEntry = {
        type: 'popover',
        id: 'popover-1',
        webViewId: 'webview-1',
        request: {
          anchor: { x: 10, y: 20 },
          content: { type: 'text', body: 'Original' },
        },
        content: { type: 'text', body: 'Original' },
        position: { x: 10, y: 20 },
        resolve: vi.fn(),
        reject: vi.fn(),
      };
      addOverlay(popoverEntry);

      const newContent = { type: 'text' as const, body: 'Updated' };
      const result = updateOverlayContent('popover-1', newContent);
      expect(result).toBe(true);

      const overlay = getOverlayById('popover-1');
      expect(overlay?.type).toBe('popover');
      // overlay is a union type and we know it's a popover from the prior line
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      expect((overlay as { content: PopoverContent }).content).toEqual(newContent);
    });

    it('should return false when overlay is not found', () => {
      const result = updateOverlayContent('nonexistent', { type: 'text', body: 'Test' });
      expect(result).toBe(false);
    });

    it('should return false when overlay is not a popover', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);
      const result = updateOverlayContent('overlay-1', { type: 'text', body: 'Test' });
      expect(result).toBe(false);
    });

    it('should notify listeners when content is updated', () => {
      const popoverEntry: OverlayEntry = {
        type: 'popover',
        id: 'popover-1',
        webViewId: 'webview-1',
        request: {
          anchor: { x: 10, y: 20 },
          content: { type: 'text', body: 'Original' },
        },
        content: { type: 'text', body: 'Original' },
        position: { x: 10, y: 20 },
        resolve: vi.fn(),
        reject: vi.fn(),
      };
      addOverlay(popoverEntry);

      const listener = vi.fn();
      subscribe(listener);

      updateOverlayContent('popover-1', { type: 'text', body: 'Updated' });
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearAllOverlays', () => {
    it('should notify listeners when overlays are cleared', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);

      const listener = vi.fn();
      subscribe(listener);

      clearAllOverlays();
      expect(listener).toHaveBeenCalledTimes(1);
      expect(getOverlays()).toHaveLength(0);
    });

    it('should not notify listeners when store is already empty', () => {
      const listener = vi.fn();
      subscribe(listener);

      clearAllOverlays();
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('rejectAndRemoveOverlay listener notification', () => {
    it('should notify listeners when an overlay is rejected and removed', () => {
      const entry = createContextMenuEntry('overlay-1', 'webview-1');
      addOverlay(entry);

      const listener = vi.fn();
      subscribe(listener);

      const error = newPlatformError('test rejection');
      rejectAndRemoveOverlay('overlay-1', error);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should not notify listeners when overlay is not found', () => {
      const listener = vi.fn();
      subscribe(listener);

      const error = newPlatformError('test rejection');
      rejectAndRemoveOverlay('nonexistent', error);
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
