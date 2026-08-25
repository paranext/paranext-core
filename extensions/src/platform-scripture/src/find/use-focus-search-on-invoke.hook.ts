import { useCallback, useEffect, useRef } from 'react';
import { useRunWhenVisible } from 'platform-bible-react';
import type { FindFocusSearchEvent } from 'platform-scripture';

/** What {@link useFocusSearchOnInvoke} needs to decide whether and when to take the caret. */
export type FocusSearchOnInvokeOptions = {
  /** This Find web view's own id, compared against the id an incoming event names. */
  webViewId: string;
  /**
   * The focus request carried in this web view's state, set by the invoke that built this web view.
   * Consumed once per mount.
   */
  shouldFocusSearch: boolean;
  /** Whether this web view is on screen — pass `useViewVisibility()`. */
  isViewVisible: boolean;
  /** Puts the caret in the search box. Called at most once per request, and only while visible. */
  focusSearchInput: () => void;
};

/**
 * Puts the caret in Find's search box when the user invokes Find, and only then.
 *
 * Invoking Find brings its tab to the front, which focuses the web view's iframe — but that lands
 * on the iframe's `body`, so without this the user arrives at Find unable to type and their
 * keystrokes go nowhere. Landing on the search box is the whole point of an invoke; a plain tab
 * click is deliberately left alone, so the platform's own restore-last-focused-element behavior
 * still returns a user to whichever field they were last in.
 *
 * A request reaches this hook by one of two routes, because `platformScripture.openFind` has three
 * exits: two reuse an already-mounted panel and one rebuilds it, and no single route covers both
 * shapes.
 *
 * - **In state**, via `shouldFocusSearch`, when the invoke reloaded or created the web view. Those
 *   paths mount this component fresh, so the request is already in the initial state and there is
 *   nothing to race. Consumed once per mount — the flag is persisted with the rest of the web view
 *   state, so re-reading it on a later render would yank the caret back out of wherever the user
 *   has since put it.
 * - **As an event**, via the returned handler, when the invoke found the panel already open and
 *   correct. Nothing remounts on that path, so the state route cannot deliver it. Each event is its
 *   own fresh ask, so repeated invokes each take the caret.
 *
 * Both routes go through `useRunWhenVisible`, which is what makes them work while the Find tab is
 * the inactive one: its pane is `display: none` until rc-dock re-renders, and focusing an element
 * inside a hidden subtree is a silent no-op. The front-ing and the request are not synchronized
 * across the iframe boundary, so a request can arrive a frame early and is deferred to the
 * visibility transition rather than lost.
 *
 * @returns Handler for the `platformScripture.focusFindSearch` event — pass it to `useEvent`. It
 *   ignores events naming a different web view, since more than one Find panel can be open in Power
 *   mode and only the one the invoke resolved should take the caret.
 */
export function useFocusSearchOnInvoke({
  webViewId,
  shouldFocusSearch,
  isViewVisible,
  focusSearchInput,
}: FocusSearchOnInvokeOptions): (event: FindFocusSearchEvent) => void {
  // Read through a ref so the deferred callback below can stay referentially stable.
  const focusSearchInputRef = useRef(focusSearchInput);
  focusSearchInputRef.current = focusSearchInput;

  const requestFocusSearchInput = useRunWhenVisible(isViewVisible, () =>
    focusSearchInputRef.current(),
  );

  const hasConsumedStateRequestRef = useRef(false);
  useEffect(() => {
    if (!shouldFocusSearch || hasConsumedStateRequestRef.current) return;
    hasConsumedStateRequestRef.current = true;
    requestFocusSearchInput();
  }, [shouldFocusSearch, requestFocusSearchInput]);

  return useCallback(
    (event: FindFocusSearchEvent) => {
      if (event.webViewId === webViewId) requestFocusSearchInput();
    },
    [webViewId, requestFocusSearchInput],
  );
}

export default useFocusSearchOnInvoke;
