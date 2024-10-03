import { useState, useCallback, useEffect, useRef } from 'react';

// We don't add this to PAPI directly like other hooks because `this` has to be bound to a web view's iframe context
/** See `web-view.model.ts` for normal hook documentation */
export default function useWebViewState<T>(
  this: {
    getWebViewState: (stateKey: string, defaultValue: T) => T;
    setWebViewState: (stateKey: string, stateValue: T) => void;
    resetWebViewState: (stateKey: string) => void;
  },
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

  const [state, setStateInternal] = useState(() =>
    this.getWebViewState(stateKey, defaultStateValueRef.current),
  );

  useEffect(() => {
    // Get the setting for the new key when the key changes
    setStateInternal(this.getWebViewState(stateKey, defaultStateValueRef.current));
  }, [stateKey]);

  const setState = useCallback(
    (newStateValue: T) => {
      this.setWebViewState(stateKey, newStateValue);
      setStateInternal(newStateValue);
    },
    [stateKey],
  );

  const resetState = useCallback(() => {
    this.resetWebViewState(stateKey);
    setStateInternal(defaultStateValueRef.current);
  }, [stateKey]);

  return [state, setState, resetState];
}
