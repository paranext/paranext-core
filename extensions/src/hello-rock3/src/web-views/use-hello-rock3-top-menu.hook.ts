import papi, { logger } from '@papi/frontend';
import { useData, useEvaluatedMenu } from '@papi/frontend/react';
import {
  createMenuTemplateVars,
  getErrorMessage,
  isPlatformError,
  type Localized,
  type MultiColumnMenu,
} from 'platform-bible-utils';
import { useMemo } from 'react';
import { HELLO_ROCK_3_REACT_WEBVIEW_TYPE } from '../util';

const defaultWebViewMenu = {
  topMenu: undefined,
  includeDefaults: true,
  contextMenu: undefined,
};

/**
 * Reads the Hello Rock3 web view's top menu from the menu data provider and evaluates its `when` /
 * `enabledWhen` gates against the web view and project it belongs to.
 */
export function useHelloRock3TopMenu(
  webViewId: string,
  projectId: string | undefined,
): Localized<MultiColumnMenu> | undefined {
  const [webViewMenuPossiblyError] = useData(papi.menuData.dataProviderName).WebViewMenu(
    HELLO_ROCK_3_REACT_WEBVIEW_TYPE,
    defaultWebViewMenu,
  );

  const webViewMenu = useMemo(() => {
    if (isPlatformError(webViewMenuPossiblyError)) {
      logger.warn(
        `Failed to load web view menu for ${HELLO_ROCK_3_REACT_WEBVIEW_TYPE}: ${getErrorMessage(
          webViewMenuPossiblyError,
        )}`,
      );
      return defaultWebViewMenu;
    }
    return webViewMenuPossiblyError;
  }, [webViewMenuPossiblyError]);

  const menuTemplateVars = useMemo(
    () =>
      createMenuTemplateVars({
        webViewId,
        webViewType: HELLO_ROCK_3_REACT_WEBVIEW_TYPE,
        projectId,
      }),
    [webViewId, projectId],
  );

  return useEvaluatedMenu(webViewMenu.topMenu, menuTemplateVars);
}
