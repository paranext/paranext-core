import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { applyDirectionToIframeElement, applyLayoutDirection } from './layout-direction.service';

const mockDebug = vi.fn();
vi.mock('@shared/services/logger.service', () => ({
  logger: {
    debug: (...args: unknown[]) => mockDebug(...args),
  },
}));

const mockPersistDirection = vi.fn();
vi.mock('platform-bible-react', () => ({
  persistDirection: (...args: unknown[]) => mockPersistDirection(...args),
}));

describe('layout-direction.service — applyLayoutDirection', () => {
  beforeEach(() => {
    mockDebug.mockClear();
    mockPersistDirection.mockClear();
    document.documentElement.removeAttribute('dir');
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.documentElement.removeAttribute('dir');
    document.body.innerHTML = '';
  });

  it('persists the direction via persistDirection', () => {
    applyLayoutDirection('rtl');
    expect(mockPersistDirection).toHaveBeenCalledTimes(1);
    expect(mockPersistDirection).toHaveBeenCalledWith('rtl');
  });

  it('sets the dir attribute on document.documentElement', () => {
    applyLayoutDirection('rtl');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
    applyLayoutDirection('ltr');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });

  it('sets the dir attribute on each iframe in the DOM', () => {
    const iframeA = document.createElement('iframe');
    const iframeB = document.createElement('iframe');
    document.body.appendChild(iframeA);
    document.body.appendChild(iframeB);

    applyLayoutDirection('rtl');

    expect(iframeA.getAttribute('dir')).toBe('rtl');
    expect(iframeB.getAttribute('dir')).toBe('rtl');
  });

  it("sets the dir attribute on each iframe's inner documentElement when same-origin", () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    // jsdom gives the iframe a same-origin (blank) contentDocument by default.
    expect(iframe.contentDocument).not.toBeNull();

    applyLayoutDirection('rtl');

    expect(iframe.contentDocument?.documentElement.getAttribute('dir')).toBe('rtl');
  });

  it('swallows cross-origin contentDocument errors and logs at debug', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    // Simulate cross-origin: accessing contentDocument throws.
    Object.defineProperty(iframe, 'contentDocument', {
      get() {
        throw new Error('cross-origin');
      },
    });

    expect(() => applyLayoutDirection('rtl')).not.toThrow();
    expect(iframe.getAttribute('dir')).toBe('rtl');
    expect(mockDebug).toHaveBeenCalledTimes(1);
    expect(mockDebug.mock.calls[0][0]).toMatch(/cross-origin/);
  });
});

describe('layout-direction.service — applyDirectionToIframeElement', () => {
  beforeEach(() => {
    mockDebug.mockClear();
    document.body.innerHTML = '';
  });

  it('sets the dir attribute on the iframe element', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    applyDirectionToIframeElement(iframe, 'rtl');
    expect(iframe.getAttribute('dir')).toBe('rtl');
  });

  it("sets the dir attribute on the iframe's same-origin contentDocument.documentElement", () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    applyDirectionToIframeElement(iframe, 'rtl');
    expect(iframe.contentDocument?.documentElement.getAttribute('dir')).toBe('rtl');
  });

  it('swallows cross-origin contentDocument errors and logs at debug', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    Object.defineProperty(iframe, 'contentDocument', {
      get() {
        throw new Error('cross-origin');
      },
    });

    expect(() => applyDirectionToIframeElement(iframe, 'rtl')).not.toThrow();
    expect(iframe.getAttribute('dir')).toBe('rtl');
    expect(mockDebug).toHaveBeenCalledTimes(1);
  });
});
