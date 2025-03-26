import { useScrollGroupScrRef } from '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook';
import {
  GetSavedWebViewDefinition,
  WebViewDefinitionUpdateInfo,
} from '@shared/models/web-view.model';
import { UpdateWebViewEvent } from '@shared/services/web-view.service-model';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { useEvent } from 'platform-bible-react';
import { PlatformEvent, ScrollGroupId } from 'platform-bible-utils';
import { useCallback, useState } from 'react';

// We don't add this to PAPI directly like other hooks because `this` has to be bound to a web view's iframe context
/** See `web-view.model.ts` for normal hook documentation */
export function useWebViewScrollGroupScrRef(this: {
  getSavedWebViewDefinition: GetSavedWebViewDefinition;
  updateWebViewDefinition: (webView: WebViewDefinitionUpdateInfo) => boolean;
  papi: {
    webViews: {
      onDidUpdateWebView: PlatformEvent<UpdateWebViewEvent>;
    };
  };
}): [
  scrRef: SerializedVerseRef,
  setScrRef: (newScrRef: SerializedVerseRef) => void,
  scrollGroupId: ScrollGroupId | undefined,
  setScrollGroupId: (newScrollGroupId: ScrollGroupId | undefined) => void,
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

export default useWebViewScrollGroupScrRef;
