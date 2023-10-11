import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// See src/shared/global-this.model.ts for normal hook documentation
// We don't add this to PAPI directly like other hooks because `this` has to be bound to a web view's iframe context
export default function useWebViewState(
  this: {
    getWebViewState: () => Record<string, string>;
    setWebViewState: (state: Record<string, string>) => void;
  },
  stateKey: string,
): [webViewState: string, setWebViewState: Dispatch<SetStateAction<string>>] {
  const startingState: Record<string, string> = this.getWebViewState();
  const [state, setState] = useState(startingState[stateKey] ?? '');
  // Whenever the webview state changes, save the updated value
  useEffect(() => {
    const currentState: Record<string, string> = this.getWebViewState();
    currentState[stateKey] = state;
    this.setWebViewState(currentState);
  }, [state, stateKey]);

  return [state, setState];
}
