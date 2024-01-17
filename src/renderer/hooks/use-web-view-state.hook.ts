import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// We don't add this to PAPI directly like other hooks because `this` has to be bound to a web view's iframe context
/** See `web-view.model.ts` for normal hook documentation */
export default function useWebViewState<T>(
  this: {
    getWebViewState: (stateKey: string) => T | undefined;
    setWebViewState: (stateKey: string, stateValue: NonNullable<T>) => void;
    resetWebViewState: (stateKey: string) => void;
  },
  stateKey: string,
  defaultStateValue: NonNullable<T>,
): [
  webViewState: NonNullable<T>,
  setWebViewState: Dispatch<SetStateAction<NonNullable<T>>>,
  resetWebViewState: () => void,
] {
  const [state, setState] = useState(() => this.getWebViewState(stateKey) ?? defaultStateValue);

  // Whenever the state changes, save the updated value
  useEffect(() => {
    if (state === defaultStateValue) return;
    this.setWebViewState(stateKey, state);
  }, [defaultStateValue, state, stateKey]);

  const resetState = () => {
    setState(defaultStateValue);
    this.resetWebViewState(stateKey);
  };

  return [state, setState, resetState];
}
