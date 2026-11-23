// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { logger } from '@papi/frontend';
import { useData } from '@papi/frontend/react';
import type { FocusSubject } from '@papi/core';
import { PlatformError, newPlatformError } from 'platform-bible-utils';
import { useEditorFocusLocation } from './use-editor-focus-location.hook';

vi.mock('@papi/frontend/react', () => ({ useData: vi.fn() }));
vi.mock('@papi/frontend', () => ({
  default: { window: { dataProviderName: 'platform.windowServiceDataProvider' } },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const OWN_WEB_VIEW_ID = 'editor-1';

/** What the window data provider's `Focus` subscription currently holds. */
let deliveredFocus: FocusSubject | PlatformError | undefined;

describe('useEditorFocusLocation', () => {
  beforeEach(() => {
    deliveredFocus = undefined;
    // The window data provider's `Focus` subscription is a PAPI boundary, so it is mocked. Read
    // through a variable so a test can deliver a new subject between renders.
    vi.mocked(useData).mockImplementation(
      () =>
        // `useData` returns a proxy with one hook per data type; only `Focus` matters here
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ({ Focus: () => [deliveredFocus, undefined, false] }) as never,
    );
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);
    vi.mocked(logger.warn).mockClear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps getFocusLocation stable across re-renders and new focus subjects, reading the latest subject', () => {
    deliveredFocus = { focusType: 'webView', id: OWN_WEB_VIEW_ID };
    const { result, rerender } = renderHook(() => useEditorFocusLocation(OWN_WEB_VIEW_ID));
    const firstGetFocusLocation = result.current.getFocusLocation;

    rerender();
    expect(result.current.getFocusLocation).toBe(firstGetFocusLocation);

    deliveredFocus = { focusType: 'webView', id: 'find' };
    rerender();
    expect(result.current.getFocusLocation).toBe(firstGetFocusLocation);
    expect(firstGetFocusLocation()).toBe('anotherWebView');
  });

  it('changes focusLocationKey when a new subject is delivered, and keeps it when nothing new is', () => {
    const firstSubject: FocusSubject = { focusType: 'webView', id: OWN_WEB_VIEW_ID };
    deliveredFocus = firstSubject;
    const { result, rerender } = renderHook(() => useEditorFocusLocation(OWN_WEB_VIEW_ID));
    const firstKey = result.current.focusLocationKey;

    rerender();
    expect(result.current.focusLocationKey).toBe(firstKey);

    deliveredFocus = { focusType: 'webView', id: 'find' };
    rerender();
    expect(result.current.focusLocationKey).not.toBe(firstKey);
  });

  it('reports thisEditor when the subject has not arrived', () => {
    // The document lacks focus, so a subject naming this editor would read as settling instead.
    vi.mocked(document.hasFocus).mockReturnValue(false);
    const { result } = renderHook(() => useEditorFocusLocation(OWN_WEB_VIEW_ID));

    expect(result.current.getFocusLocation()).toBe('thisEditor');
  });

  it('reports thisEditor when the subject is a PlatformError, not the last subject that arrived', () => {
    deliveredFocus = { focusType: 'webView', id: 'find' };
    const { result, rerender } = renderHook(() => useEditorFocusLocation(OWN_WEB_VIEW_ID));
    expect(result.current.getFocusLocation()).toBe('anotherWebView');

    deliveredFocus = newPlatformError('window service unavailable');
    rerender();
    expect(result.current.getFocusLocation()).toBe('thisEditor');
  });

  it('reports anotherWebView when the subject names another web view', () => {
    deliveredFocus = { focusType: 'webView', id: 'find' };
    const { result } = renderHook(() => useEditorFocusLocation(OWN_WEB_VIEW_ID));

    expect(result.current.getFocusLocation()).toBe('anotherWebView');
  });

  it("reports settling when the subject names this editor's iframe but the document has no focus", () => {
    deliveredFocus = { focusType: 'webView', id: OWN_WEB_VIEW_ID };
    const { result } = renderHook(() => useEditorFocusLocation(OWN_WEB_VIEW_ID));
    expect(result.current.getFocusLocation()).toBe('thisEditor');

    vi.mocked(document.hasFocus).mockReturnValue(false);
    expect(result.current.getFocusLocation()).toBe('settling');
  });

  describe('logging a focus subject that came back as an error', () => {
    it('warns once with the error message', () => {
      deliveredFocus = newPlatformError('window service unavailable');

      renderHook(() => useEditorFocusLocation(OWN_WEB_VIEW_ID));

      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(vi.mocked(logger.warn).mock.calls[0][0]).toContain('window service unavailable');
    });

    it('does not warn again when re-rendered with the same error', () => {
      deliveredFocus = newPlatformError('window service unavailable');
      const { rerender } = renderHook(() => useEditorFocusLocation(OWN_WEB_VIEW_ID));
      expect(logger.warn).toHaveBeenCalledTimes(1);

      rerender();
      rerender();

      expect(logger.warn).toHaveBeenCalledTimes(1);
    });

    it('does not warn for a focus subject', () => {
      deliveredFocus = { focusType: 'webView', id: 'find' };
      const { rerender } = renderHook(() => useEditorFocusLocation(OWN_WEB_VIEW_ID));
      rerender();
      expect(logger.warn).not.toHaveBeenCalled();

      // The same hook does warn once an error is delivered, so the silence above is meaningful.
      deliveredFocus = newPlatformError('window service unavailable');
      rerender();
      expect(logger.warn).toHaveBeenCalledTimes(1);
    });
  });
});
