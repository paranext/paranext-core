import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// See src/shared/global-this.model.ts for normal hook documentation
// We don't add this to PAPI directly like other hooks because `this` has to be bound to a web view's iframe context
export default function useWebViewState<T>(
  this: {
    getWebViewState: (stateKey: string) => T | undefined;
    setWebViewState: (stateKey: string, stateValue: NonNullable<T>) => void;
  },
  stateKey: string,
  defaultStateValue: NonNullable<T>,
): [webViewState: NonNullable<T>, setWebViewState: Dispatch<SetStateAction<NonNullable<T>>>] {
  const [state, setState] = useState(() => this.getWebViewState(stateKey) ?? defaultStateValue);

  // Whenever the state changes, save the updated value
  useEffect(() => {
    this.setWebViewState(stateKey, state);
  }, [stateKey, state]);

  return [state, setState];
}
