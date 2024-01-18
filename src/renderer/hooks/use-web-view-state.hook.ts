import { useState, useCallback, useEffect } from 'react';

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
): [webViewState: T, setWebViewState: (newStateValue: T) => void, resetWebViewState: () => void] {
  const [state, setStateInternal] = useState(() =>
    this.getWebViewState(stateKey, defaultStateValue),
  );

  useEffect(() => {
    if (
      this.getWebViewState(stateKey, defaultStateValue) === defaultStateValue &&
      state !== defaultStateValue
    )
      setStateInternal(defaultStateValue);
  }, [defaultStateValue, state, stateKey]);

  const setState = useCallback(
    (newStateValue: T) => {
      setStateInternal(newStateValue);
      this.setWebViewState(stateKey, newStateValue);
    },
    [stateKey],
  );

  const resetState = useCallback(() => {
    setStateInternal(defaultStateValue);
    this.resetWebViewState(stateKey);
  }, [defaultStateValue, stateKey]);

  return [state, setState, resetState];
}
