import { createStandaloneWebView } from '@renderer/services/web-view.service-host';
import { WebViewTabProps } from '@shared/models/docking-framework.model';
import { WebViewType } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook that creates a standalone WebView definition (without adding to dock layout) and manages its
 * lifecycle. Used by Simple mode panels to render WebView components directly.
 *
 * @param webViewType The webview type to create
 * @param options Options passed to the webview provider (e.g. projectId, isReadOnly)
 * @returns The WebView definition and loading state
 */
export default function useStandaloneWebView(
  webViewType: WebViewType | undefined,
  options: Record<string, unknown> = {},
) {
  const [definition, setDefinition] = useState<WebViewTabProps | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  // Track current request to avoid stale updates
  const requestIdRef = useRef(0);
  // Serialize options for dependency tracking
  const optionsKey = JSON.stringify(options);

  const load = useCallback(async () => {
    if (!webViewType) {
      setDefinition(undefined);
      return;
    }

    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;
    setIsLoading(true);

    try {
      const result = await createStandaloneWebView(webViewType, options);
      // Only update if this is still the current request
      if (currentRequestId === requestIdRef.current) {
        setDefinition(result?.definition);
      }
    } catch (e) {
      if (currentRequestId === requestIdRef.current) {
        logger.warn(`useStandaloneWebView: Error creating ${webViewType}: ${e}`);
        setDefinition(undefined);
      }
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webViewType, optionsKey]);

  useEffect(() => {
    load();
  }, [load]);

  return { definition, isLoading, reload: load };
}
