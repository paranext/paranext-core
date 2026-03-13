import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  translateCoordinates,
  getWebViewIframe,
  clampToViewport,
} from '@renderer/services/overlay-coordinates';

describe('overlay-coordinates', () => {
  describe('getWebViewIframe', () => {
    let mockIframe: HTMLIFrameElement;

    beforeEach(() => {
      mockIframe = document.createElement('iframe');
      mockIframe.setAttribute('data-web-view-id', 'test-webview-1');
      document.body.appendChild(mockIframe);
    });

    afterEach(() => {
      document.body.removeChild(mockIframe);
    });

    it('should find an iframe by data-web-view-id', () => {
      const result = getWebViewIframe('test-webview-1');
      expect(result).toBe(mockIframe);
    });

    it('should return null for a non-existent webViewId', () => {
      const result = getWebViewIframe('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('translateCoordinates', () => {
    let mockIframe: HTMLIFrameElement;

    beforeEach(() => {
      mockIframe = document.createElement('iframe');
      mockIframe.setAttribute('data-web-view-id', 'test-webview-1');
      document.body.appendChild(mockIframe);

      // Mock getBoundingClientRect
      vi.spyOn(mockIframe, 'getBoundingClientRect').mockReturnValue({
        top: 50,
        left: 100,
        bottom: 550,
        right: 500,
        width: 400,
        height: 500,
        x: 100,
        y: 50,
        toJSON: () => ({}),
      });
    });

    afterEach(() => {
      document.body.removeChild(mockIframe);
      vi.restoreAllMocks();
    });

    it('should translate iframe-relative coordinates to document-relative', () => {
      const result = translateCoordinates('test-webview-1', { x: 10, y: 20 });
      // iframe left=100, top=50, so document coords = (110, 70)
      expect(result).toEqual({ x: 110, y: 70 });
    });

    it('should return the original coordinates if iframe is not found', () => {
      const result = translateCoordinates('non-existent', { x: 10, y: 20 });
      expect(result).toEqual({ x: 10, y: 20 });
    });
  });

  describe('clampToViewport', () => {
    beforeEach(() => {
      // Mock window dimensions
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    });

    it('should not modify coordinates within viewport', () => {
      const result = clampToViewport({ x: 100, y: 200 });
      expect(result).toEqual({ x: 100, y: 200 });
    });

    it('should clamp negative x to padding', () => {
      const result = clampToViewport({ x: -10, y: 200 }, 4);
      expect(result.x).toBe(4);
    });

    it('should clamp negative y to padding', () => {
      const result = clampToViewport({ x: 100, y: -10 }, 4);
      expect(result.y).toBe(4);
    });

    it('should clamp x exceeding viewport width', () => {
      const result = clampToViewport({ x: 1100, y: 200 }, 4);
      expect(result.x).toBe(1020); // 1024 - 4
    });

    it('should clamp y exceeding viewport height', () => {
      const result = clampToViewport({ x: 100, y: 800 }, 4);
      expect(result.y).toBe(764); // 768 - 4
    });

    it('should use default padding of 0', () => {
      const result = clampToViewport({ x: -5, y: -5 });
      expect(result).toEqual({ x: 0, y: 0 });
    });
  });
});
