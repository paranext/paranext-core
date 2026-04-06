import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import {
  translateCoordinates,
  getWebViewIframe,
  clampToViewport,
  isWebViewVisible,
  isPositionInViewport,
} from './overlay-coordinates';

// jsdom doesn't provide CSS.escape; polyfill for tests.
// Only the escape method is needed; other CSS static methods are unused in the tested code.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const cssPolyfill = {
  escape: (value: string) => value.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&'),
} as typeof CSS;

beforeAll(() => {
  if (typeof CSS === 'undefined' || !CSS.escape) {
    globalThis.CSS = cssPolyfill;
  }
});

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

    it('should return null without throwing when webViewId contains CSS selector characters', () => {
      // Without CSS.escape, characters like " or ] would break the attribute selector
      // and cause querySelector to throw a DOMException
      expect(() => getWebViewIframe('malicious"]iframe')).not.toThrow();
      expect(getWebViewIframe('malicious"]iframe')).toBeNull();
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

  describe('isWebViewVisible', () => {
    let mockIframe: HTMLIFrameElement;

    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });

      mockIframe = document.createElement('iframe');
      mockIframe.setAttribute('data-web-view-id', 'test-webview-1');
      document.body.appendChild(mockIframe);
    });

    afterEach(() => {
      document.body.removeChild(mockIframe);
      vi.restoreAllMocks();
    });

    it('should return true for "renderer" pseudo-webViewId', () => {
      expect(isWebViewVisible('renderer')).toBe(true);
    });

    it('should return false for a non-existent webViewId', () => {
      expect(isWebViewVisible('non-existent')).toBe(false);
    });

    it('should return true for an iframe within the viewport', () => {
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
      expect(isWebViewVisible('test-webview-1')).toBe(true);
    });

    it('should return false for an iframe with zero dimensions', () => {
      vi.spyOn(mockIframe, 'getBoundingClientRect').mockReturnValue({
        top: 50,
        left: 100,
        bottom: 50,
        right: 100,
        width: 0,
        height: 0,
        x: 100,
        y: 50,
        toJSON: () => ({}),
      });
      expect(isWebViewVisible('test-webview-1')).toBe(false);
    });

    it('should return false for an iframe entirely off-screen to the right', () => {
      vi.spyOn(mockIframe, 'getBoundingClientRect').mockReturnValue({
        top: 50,
        left: 1200,
        bottom: 550,
        right: 1600,
        width: 400,
        height: 500,
        x: 1200,
        y: 50,
        toJSON: () => ({}),
      });
      expect(isWebViewVisible('test-webview-1')).toBe(false);
    });

    it('should return false for an iframe entirely below the viewport', () => {
      vi.spyOn(mockIframe, 'getBoundingClientRect').mockReturnValue({
        top: 900,
        left: 100,
        bottom: 1400,
        right: 500,
        width: 400,
        height: 500,
        x: 100,
        y: 900,
        toJSON: () => ({}),
      });
      expect(isWebViewVisible('test-webview-1')).toBe(false);
    });

    it('should return false for an iframe entirely above the viewport', () => {
      vi.spyOn(mockIframe, 'getBoundingClientRect').mockReturnValue({
        top: -600,
        left: 100,
        bottom: -100,
        right: 500,
        width: 400,
        height: 500,
        x: 100,
        y: -600,
        toJSON: () => ({}),
      });
      expect(isWebViewVisible('test-webview-1')).toBe(false);
    });

    it('should return false for an iframe entirely to the left of the viewport', () => {
      vi.spyOn(mockIframe, 'getBoundingClientRect').mockReturnValue({
        top: 50,
        left: -500,
        bottom: 550,
        right: -100,
        width: 400,
        height: 500,
        x: -500,
        y: 50,
        toJSON: () => ({}),
      });
      expect(isWebViewVisible('test-webview-1')).toBe(false);
    });

    it('should return true for an iframe partially overlapping the viewport', () => {
      vi.spyOn(mockIframe, 'getBoundingClientRect').mockReturnValue({
        top: -100,
        left: -100,
        bottom: 200,
        right: 200,
        width: 300,
        height: 300,
        x: -100,
        y: -100,
        toJSON: () => ({}),
      });
      expect(isWebViewVisible('test-webview-1')).toBe(true);
    });
  });

  describe('isPositionInViewport', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    });

    it('should return true for a position well within the viewport', () => {
      expect(isPositionInViewport({ x: 500, y: 400 })).toBe(true);
    });

    it('should return true for a position at the origin', () => {
      expect(isPositionInViewport({ x: 0, y: 0 })).toBe(true);
    });

    it('should return true for a position at the viewport edge', () => {
      expect(isPositionInViewport({ x: 1024, y: 768 })).toBe(true);
    });

    it('should return true for a position slightly outside viewport within default margin', () => {
      // Default margin is 50px
      expect(isPositionInViewport({ x: -30, y: -30 })).toBe(true);
      expect(isPositionInViewport({ x: 1060, y: 800 })).toBe(true);
    });

    it('should return false for a position far outside viewport beyond default margin', () => {
      expect(isPositionInViewport({ x: -100, y: 400 })).toBe(false);
      expect(isPositionInViewport({ x: 500, y: -100 })).toBe(false);
      expect(isPositionInViewport({ x: 1200, y: 400 })).toBe(false);
      expect(isPositionInViewport({ x: 500, y: 900 })).toBe(false);
    });

    it('should respect custom margin parameter', () => {
      // With margin=0, anything outside [0, innerWidth] x [0, innerHeight] is out
      expect(isPositionInViewport({ x: -1, y: 0 }, 0)).toBe(false);
      expect(isPositionInViewport({ x: 0, y: -1 }, 0)).toBe(false);
      expect(isPositionInViewport({ x: 1025, y: 0 }, 0)).toBe(false);
      expect(isPositionInViewport({ x: 0, y: 769 }, 0)).toBe(false);

      // With larger margin, more tolerance
      expect(isPositionInViewport({ x: -99, y: 0 }, 100)).toBe(true);
      expect(isPositionInViewport({ x: 1123, y: 0 }, 100)).toBe(true);
    });

    it('should return false at exactly the margin boundary (exclusive)', () => {
      // At exactly -margin, x >= -margin is true (boundary is inclusive)
      expect(isPositionInViewport({ x: -50, y: 0 })).toBe(true);
      // Just past the margin
      expect(isPositionInViewport({ x: -51, y: 0 })).toBe(false);
    });
  });
});
