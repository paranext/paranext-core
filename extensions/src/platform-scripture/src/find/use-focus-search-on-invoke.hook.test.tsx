// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFocusSearchOnInvoke } from './use-focus-search-on-invoke.hook';

const THIS_WEB_VIEW_ID = 'find-tab-1';

type Props = { isViewVisible: boolean; shouldFocusSearch: boolean };

/** Renders the hook with controllable visibility and focus request, and a spy for the focus call. */
function renderFocusSearchOnInvoke(initialProps: Props) {
  const focusSearchInput = vi.fn();
  const { result, rerender } = renderHook(
    ({ isViewVisible, shouldFocusSearch }: Props) =>
      useFocusSearchOnInvoke({
        webViewId: THIS_WEB_VIEW_ID,
        shouldFocusSearch,
        isViewVisible,
        focusSearchInput,
      }),
    { initialProps },
  );
  return {
    focusSearchInput,
    result,
    setProps: (props: Props) => rerender(props),
  };
}

describe('useFocusSearchOnInvoke', () => {
  describe('the request carried in web view state (the invoke rebuilt this web view)', () => {
    it('focuses the search box on mount when the request is set and the view is visible', () => {
      const { focusSearchInput } = renderFocusSearchOnInvoke({
        isViewVisible: true,
        shouldFocusSearch: true,
      });

      expect(focusSearchInput).toHaveBeenCalledTimes(1);
    });

    it('does not focus anything when no request was made', () => {
      const { focusSearchInput } = renderFocusSearchOnInvoke({
        isViewVisible: true,
        shouldFocusSearch: false,
      });

      expect(focusSearchInput).not.toHaveBeenCalled();
    });

    it('defers the focus until the tab is shown, then takes it', () => {
      // The case this exists for: in Simple mode the Find tab is inactive when Ctrl+F is pressed, so
      // its pane is `display: none` and focusing an element inside it would be a silent no-op.
      const { focusSearchInput, setProps } = renderFocusSearchOnInvoke({
        isViewVisible: false,
        shouldFocusSearch: true,
      });
      expect(focusSearchInput).not.toHaveBeenCalled();

      act(() => setProps({ isViewVisible: true, shouldFocusSearch: true }));

      expect(focusSearchInput).toHaveBeenCalledTimes(1);
    });

    it('consumes the request once, not on every re-render', () => {
      // The flag lives in web view state, which is persisted and re-read; without the once-per-mount
      // guard an unrelated re-render would keep yanking the caret back out of wherever the user put
      // it.
      const { focusSearchInput, setProps } = renderFocusSearchOnInvoke({
        isViewVisible: true,
        shouldFocusSearch: true,
      });
      expect(focusSearchInput).toHaveBeenCalledTimes(1);

      act(() => setProps({ isViewVisible: true, shouldFocusSearch: true }));
      act(() => setProps({ isViewVisible: false, shouldFocusSearch: true }));
      act(() => setProps({ isViewVisible: true, shouldFocusSearch: true }));

      expect(focusSearchInput).toHaveBeenCalledTimes(1);
    });
  });

  describe('the request delivered as an event (the invoke reused this web view as-is)', () => {
    it('focuses the search box for an event naming this web view', () => {
      const { focusSearchInput, result } = renderFocusSearchOnInvoke({
        isViewVisible: true,
        shouldFocusSearch: false,
      });

      act(() => result.current({ webViewId: THIS_WEB_VIEW_ID }));

      expect(focusSearchInput).toHaveBeenCalledTimes(1);
    });

    it('ignores an event naming a different web view', () => {
      // Power mode can hold more than one Find panel. Taking the caret is only correct for the panel
      // the invoke resolved; every other one must leave the user's focus alone.
      const { focusSearchInput, result } = renderFocusSearchOnInvoke({
        isViewVisible: true,
        shouldFocusSearch: false,
      });

      act(() => result.current({ webViewId: 'some-other-find-tab' }));

      expect(focusSearchInput).not.toHaveBeenCalled();
    });

    it('defers an event that arrives before the tab is on screen', () => {
      // Bringing the tab to the front and the event crossing the iframe boundary are not
      // synchronized, so the request can land a frame before the pane has layout.
      const { focusSearchInput, result, setProps } = renderFocusSearchOnInvoke({
        isViewVisible: false,
        shouldFocusSearch: false,
      });

      act(() => result.current({ webViewId: THIS_WEB_VIEW_ID }));
      expect(focusSearchInput).not.toHaveBeenCalled();

      act(() => setProps({ isViewVisible: true, shouldFocusSearch: false }));

      expect(focusSearchInput).toHaveBeenCalledTimes(1);
    });

    it('focuses again for a second invoke, unlike the once-per-mount state request', () => {
      // Every Ctrl+F on an unchanged panel arrives as its own event, and each one is a fresh ask.
      const { focusSearchInput, result } = renderFocusSearchOnInvoke({
        isViewVisible: true,
        shouldFocusSearch: false,
      });

      act(() => result.current({ webViewId: THIS_WEB_VIEW_ID }));
      act(() => result.current({ webViewId: THIS_WEB_VIEW_ID }));

      expect(focusSearchInput).toHaveBeenCalledTimes(2);
    });
  });
});
