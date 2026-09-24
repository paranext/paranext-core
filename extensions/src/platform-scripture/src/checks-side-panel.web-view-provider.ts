import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  ScrollGroupScrRef,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import checksSidePanelWebView from './checks-side-panel.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const checksSidePanelWebViewType = 'platformScripture.checksSidePanel';

export interface ChecksSidePanelWebViewOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  editorScrollGroupId: ScrollGroupScrRef | undefined;
  /**
   * ID of WebView that called to open this Checks Side Panel WebView. Should be of `webViewType`
   * `platformScriptureEditor.react`
   */
  editorWebViewId?: string;
}

export class ChecksSidePanelWebViewProvider implements IWebViewProvider {
  // getWebView doesn't use instance state but cannot be static because it implements the
  // IWebViewProvider interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ChecksSidePanelWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    const [title, interfaceMode] = await Promise.all([
      papi.localization.getLocalizedString({
        localizeKey: '%webView_checksSidePanel_title%',
      }),
      papi.settings.get('platform.interfaceMode'),
    ]);

    return {
      ...savedWebView,
      title,
      projectId,
      // In Simple mode this is a Column 3 tab, pinned like its siblings there: `getTabGroup` routes
      // a non-closable tab of this type to Column 3's rc-dock group, which keeps it from being
      // dragged into another column. Power mode docks it as an ordinary closable panel. Computed per
      // provider, like its Column 3 siblings, until PT-4405 moves this into the renderer.
      isClosable: interfaceMode !== 'simple',
      content: checksSidePanelWebView,
      styles: tailwindStyles,
      scrollGroupScrRef: getWebViewOptions.editorScrollGroupId,
      state: {
        ...savedWebView.state,
        editorWebViewId: getWebViewOptions.editorWebViewId ?? savedWebView.state?.editorWebViewId,
      },
    };
  }
}

export default ChecksSidePanelWebViewProvider;
