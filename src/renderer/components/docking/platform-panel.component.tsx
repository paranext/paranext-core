import { PropsWithChildren, useEffect } from 'react';
import { windowService } from '@shared/services/window.service';
import { getErrorMessage } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { TabInfo } from '@shared/models/docking-framework.model';
import { WEB_VIEW_CONTENT_TYPE, WebViewDefinition } from '@shared/models/web-view.model';
import './platform-panel.component.css';

type PlatformPanelProps = PropsWithChildren<{
  /** ID of the tab */
  id: string;
  tabType: string;
  data?: TabInfo['data'];
}>;

/**
 * Used for possible styling on every panel in Platform
 *
 * @param children The children of the panel (usually supplied from an extension)
 */
export function PlatformPanel({ id, tabType, data, children }: PlatformPanelProps) {
  // Will only use this variable if tabType is `webView`. We need to assert out here because eslint
  // will think we want to track all of data if the assertion is inside the useEffect. We specifically
  // don't want to track all of data because we only want this focus useEffect to run on mount.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const webViewDefinition = data as WebViewDefinition | undefined;
  // Focus this tab when it is first mounted
  useEffect(() => {
    // Don't focus the tab if it has a src iframe because it doesn't work here. Focused on load in
    // `web-view.component.tsx`
    if (tabType === 'webView' && webViewDefinition?.contentType === WEB_VIEW_CONTENT_TYPE.URL)
      return;

    (async () => {
      try {
        await windowService.setFocus({
          focusType: 'tab',
          id,
        });
      } catch (e) {
        logger.warn(`platform-panel failed to set focus on tab ${id}: ${getErrorMessage(e)}`);
      }
    })();
  }, [webViewDefinition?.contentType, id, tabType]);

  return (
    <div data-tab-id={id} className="platform-panel">
      {children}
    </div>
  );
}

export default PlatformPanel;
