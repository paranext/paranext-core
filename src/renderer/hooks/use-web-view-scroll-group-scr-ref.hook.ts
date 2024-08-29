import {
  GetSavedWebViewDefinition,
  WebViewDefinitionUpdateInfo,
} from '@shared/models/web-view.model';
import { ScrollGroup } from '@shared/services/scroll-group.service-model';
import { UpdateWebViewEvent } from '@shared/services/web-view.service-model';
import { useEvent } from 'platform-bible-react';
import { PlatformEvent, ScriptureReference } from 'platform-bible-utils';
import { useState, useCallback } from 'react';
import useScrollGroupScrRef from '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook';

// We don't add this to PAPI directly like other hooks because `this` has to be bound to a web view's iframe context
/** See `web-view.model.ts` for normal hook documentation */
export default function useWebViewScrollGroupScrRef(this: {
  getSavedWebViewDefinition: GetSavedWebViewDefinition;
  updateWebViewDefinition: (webView: WebViewDefinitionUpdateInfo) => boolean;
  papi: {
    webViews: {
      onDidUpdateWebView: PlatformEvent<UpdateWebViewEvent>;
    };
  };
}): [
  scrRef: ScriptureReference,
  setScrRef: (newScrRef: ScriptureReference) => void,
  scrollGroup: ScrollGroup | undefined,
  setScrollGroup: (newScrollGroup: ScrollGroup | undefined) => void,
] {
  // Get the saved web view definition's id and scrollGroupScrRef and stay up to date
  const [savedWebViewDefinition, setSavedWebViewDefinition] = useState(() => {
    const savedDefinition = this.getSavedWebViewDefinition();

    if (!savedDefinition)
      throw new Error(
        'useWebViewScrollGroupScrRef error! getSavedWebViewDefinition returned undefined! Is this hook being used outside a web view?',
      );
    return savedDefinition;
  });
  useEvent(
    this.papi.webViews.onDidUpdateWebView,
    useCallback(
      ({ webView: newSavedWebViewDefinition }) => {
        if (newSavedWebViewDefinition.id === savedWebViewDefinition.id)
          setSavedWebViewDefinition(newSavedWebViewDefinition);
      },
      [savedWebViewDefinition],
    ),
  );
  const { scrollGroupScrRef } = savedWebViewDefinition;

  return useScrollGroupScrRef(
    scrollGroupScrRef,
    useCallback(
      (newScrollGroupScrRef) =>
        this.updateWebViewDefinition({ scrollGroupScrRef: newScrollGroupScrRef }),
      [],
    ),
  );
}
