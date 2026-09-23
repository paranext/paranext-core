import { useEvent } from 'platform-bible-react';
import { deepEqual } from 'platform-bible-utils';
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

  // Whether `state` holds the default value because the web view state has no value at stateKey.
  // While it does, an update that still has no value at stateKey keeps the current default object
  // instead of swapping in the caller's latest `defaultStateValue`, which is often a new object
  // every render and would re-run the caller's effects on every unrelated state update
  const isDefaultRef = useRef(false);

  // `getWebViewState` returns the given default itself when the state has no value at stateKey
  const readState = useCallback((key: string) => {
    const value = this.getWebViewState(key, defaultStateValueRef.current);
    isDefaultRef.current = Object.is(value, defaultStateValueRef.current);
    return value;
  }, []);

  // Value of the WebView state for the given stateKey. Directly reflects the state value from the
  // WebView service; not changed directly in here
  const [state, setStateInternal] = useState(() => readState(stateKey));

  useEffect(() => {
    // Get the setting for the new key when the key changes
    setStateInternal(readState(stateKey));
  }, [readState, stateKey]);

  // Keep the state value up-to-date with changes (internal to this hook and from external changes)
  useEvent(
    this.papi.webViews.onDidUpdateWebView,
    useCallback(
      ({ webView: { id: updatedWebViewId, state: updatedState } }) => {
        if (updatedWebViewId !== this.webViewId) return;

        if (updatedState && stateKey in updatedState) {
          isDefaultRef.current = false;
          // Every update carries a freshly deserialized copy of the whole state, so keep the current
          // object when the saved value is unchanged; otherwise an update to any other key would
          // re-run the caller's effects that depend on this value
          setStateInternal((currentState) =>
            deepEqual(currentState, updatedState[stateKey])
              ? currentState
              : // We are trusting the developer used the correct type as we have no way to validate state
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                (updatedState[stateKey] as T),
          );
          return;
        }

        // No value at stateKey and the slot already shows the default, so keep it
        if (isDefaultRef.current) return;

        // The state at stateKey was removed, so reset to default
        isDefaultRef.current = true;
        setStateInternal(defaultStateValueRef.current);
      },
      [stateKey],
    ),
  );

  const setState = useCallback(
    (newStateValue: T) => {
      isDefaultRef.current = false;
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
