import papi, { logger } from '@papi/frontend';
import { useData } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useCallback, useEffect, useRef } from 'react';
import { getEditorFocusLocation } from './platform-scripture-editor.web-view.utils';
import type { EditorFocusLocation } from './use-editor-pdp-sync.hook';

/**
 * Where keyboard focus is, from this editor's point of view, read from the window's focus subject.
 * Feeds `useEditorPdpSync`'s `getFocusLocation` and `focusLocationKey`.
 *
 * @param webViewId This editor's web view id
 * @returns `getFocusLocation`, a stable function that reads the latest subject and this document's
 *   focus, and `focusLocationKey`, the latest subject, whose identity changes when a new one is
 *   delivered
 */
export function useEditorFocusLocation(webViewId: string): {
  getFocusLocation: () => EditorFocusLocation;
  focusLocationKey: unknown;
} {
  // The window's focus subject is only read on focus changes, so the re-render this subscription
  // causes happens at click rate; that re-render is what carries `focusLocationKey` to the caller.
  const [focusSubjectPossiblyError] = useData(papi.window.dataProviderName).Focus(
    undefined,
    undefined,
  );
  // Logged once per delivered value, not on every render this subscription causes.
  useEffect(() => {
    if (isPlatformError(focusSubjectPossiblyError))
      logger.warn(
        `platform-scripture-editor window focus came back as error: ${getErrorMessage(focusSubjectPossiblyError)}`,
      );
  }, [focusSubjectPossiblyError]);
  // A `PlatformError` or a value that has not arrived yet is treated as unknown focus.
  const focusSubject = isPlatformError(focusSubjectPossiblyError)
    ? undefined
    : focusSubjectPossiblyError;
  const focusSubjectRef = useRef(focusSubject);
  focusSubjectRef.current = focusSubject;
  // Stable identity (reads the latest subject from a ref; `webViewId` is fixed for the web view's
  // lifetime): `useEditorPdpSync` lists it as an effect dependency, and a fresh function each
  // render would re-run that effect on every render.
  const getFocusLocation = useCallback(
    () => getEditorFocusLocation(focusSubjectRef.current, webViewId, document.hasFocus()),
    [webViewId],
  );
  return { getFocusLocation, focusLocationKey: focusSubject };
}
