import { useScrollGroupScrRef } from '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { useEvent } from 'platform-bible-react';
import { ScrollGroupId } from 'platform-bible-utils';
import { useCallback, useState } from 'react';

// We don't add this to PAPI directly like other hooks because `this` has to be bound to a web view's iframe context
/** See `web-view.model.ts` for normal hook documentation */
export function useWebViewScrollGroupScrRef(
  // We need to use some things on the WebView's globalThis. Using `globalThis` directly in this
  // hook would refer to the renderer's globalThis, not the WebView's. List the specific properties
  // here so we are more explicit about what we need and do not run into TypeScript complaining
  // about `this` capturing `globalThis` for some reason.
  this: Pick<typeof globalThis, 'getSavedWebViewDefinition' | 'updateWebViewDefinition' | 'papi'>,
): [
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
