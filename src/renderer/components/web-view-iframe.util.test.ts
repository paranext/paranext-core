import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getWebViewIframe } from './web-view-iframe.util';

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

describe('getWebViewIframe with another element carrying the same id', () => {
  it('finds the iframe, not a tab header that comes first in the document', () => {
    const header = document.createElement('div');
    header.setAttribute('data-web-view-id', 'test-webview-1');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('data-web-view-id', 'test-webview-1');
    document.body.append(header, iframe);
    try {
      expect(getWebViewIframe('test-webview-1')).toBe(iframe);
    } finally {
      header.remove();
      iframe.remove();
    }
  });
});
