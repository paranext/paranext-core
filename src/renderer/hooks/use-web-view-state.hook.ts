import { useEvent } from 'platform-bible-react';
import { useState, useCallback, useEffect, useRef } from 'react';

// We don't add this to PAPI directly like other hooks because `this` has to be bound to a web view's iframe context
/** See `web-view.model.ts` for normal hook documentation */
export function useWebViewState<T>(
  // We need to use some things on the WebView's globalThis. Using `globalThis` directly in this
  // hook would refer to the renderer's globalThis, not the WebView's. List the specific properties
  // here so we are more explicit about what we need and do not run into TypeScript complaining
  // about `this` capturing `globalThis` for some reason.
  this: Pick<
    typeof globalThis,
    | 'getWebViewState'
    | 'setWebViewState'
    | 'resetWebViewState'
    | 'webViewId'
    | 'updateWebViewDefinition'
    | 'papi'
  >,
  stateKey: string,
  defaultStateValue: T,
): [
  webViewStateValue: T,
  setWebViewState: (newStateValue: T) => void,
  resetWebViewState: () => void,
] {
  // Use defaultStateValue as a ref so it doesn't update dependency arrays
  const defaultStateValueRef = useRef(defaultStateValue);
  defaultStateValueRef.current = defaultStateValue;

  // Value of the WebView state for the given stateKey. Directly reflects the state value from the
  // WebView service; not changed directly in here
  const [state, setStateInternal] = useState(() =>
    this.getWebViewState(stateKey, defaultStateValueRef.current),
  );

  useEffect(() => {
    // Get the setting for the new key when the key changes
    setStateInternal(this.getWebViewState(stateKey, defaultStateValueRef.current));
  }, [stateKey]);

  // Keep the state value up-to-date with changes (internal to this hook and from external changes)
  useEvent(
    this.papi.webViews.onDidUpdateWebView,
    useCallback(
      ({ webView: { id: updatedWebViewId, state: updatedState } }) => {
        if (updatedWebViewId !== this.webViewId) return;

        // We are trusting the developer used the correct type as we have no way to validate state
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        if (updatedState && stateKey in updatedState) setStateInternal(updatedState[stateKey] as T);
        // The state at stateKey was removed, so reset to default
        else setStateInternal(defaultStateValueRef.current);
      },
      [stateKey],
    ),
  );

  const setState = useCallback(
    (newStateValue: T) => {
      this.setWebViewState(stateKey, newStateValue);
    },
    [stateKey],
  );

  const resetState = useCallback(() => {
    this.resetWebViewState(stateKey);
  }, [stateKey]);

  return [state, setState, resetState];
}

export default useWebViewState;
