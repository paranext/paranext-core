import {
  getLastSelectedWebViewId,
  onDidChangeLastSelectedWebViewId,
} from '@renderer/services/window.service-host';
import { WebViewId } from '@shared/models/web-view.model';
import { useEvent } from 'platform-bible-react';
import { useState } from 'react';

/**
 * Returns the id of the web view the user most recently selected, updating whenever the selection
 * changes. `undefined` when no web view has been selected or the selected one closed.
 */
export function useLastSelectedWebViewId(): WebViewId | undefined {
  const [lastSelectedWebViewId, setLastSelectedWebViewId] = useState<WebViewId | undefined>(() =>
    getLastSelectedWebViewId(),
  );
  useEvent(onDidChangeLastSelectedWebViewId, setLastSelectedWebViewId);
  return lastSelectedWebViewId;
}

export default useLastSelectedWebViewId;
