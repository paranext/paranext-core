import {
  getLastSelectedScriptureNavigableWebViewId,
  onDidChangeLastSelectedScriptureNavigableWebViewId,
} from '@renderer/services/window.service-host';
import { WebViewId } from '@shared/models/web-view.model';
import { useEvent } from 'platform-bible-react';
import { useState } from 'react';

/**
 * Returns the id of the scripture-navigable web view the user most recently selected (the
 * navigation target of the top toolbar's book/chapter/verse controls and the navigation commands),
 * updating whenever it changes. Selecting a web view that is not scripture-navigable retains the
 * previous value. `undefined` when no scripture-navigable web view has been selected or the
 * selected one closed.
 */
export function useLastSelectedScriptureNavigableWebViewId(): WebViewId | undefined {
  const [lastSelectedScriptureNavigableWebViewId, setLastSelectedScriptureNavigableWebViewId] =
    useState<WebViewId | undefined>(() => getLastSelectedScriptureNavigableWebViewId());
  useEvent(
    onDidChangeLastSelectedScriptureNavigableWebViewId,
    setLastSelectedScriptureNavigableWebViewId,
  );
  return lastSelectedScriptureNavigableWebViewId;
}

export default useLastSelectedScriptureNavigableWebViewId;
