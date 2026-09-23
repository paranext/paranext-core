import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString } from 'platform-bible-utils';
import checklistWebView from './checklist.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const markersChecklistWebViewType = 'platformScripture.markersChecklist';

/**
 * Options for opening the Markers Checklist web view.
 *
 * @experimental
 */
export interface ChecklistWebViewOptions extends GetWebViewOptions {
  projectId: string | undefined;
}

/**
 * Web view provider for the Markers Checklist tool. Formats the tab title from the
 * `%markersChecklist_windowTitle%` localize key with the project's short name, via
 * `papi.localization.getLocalizedProjectTitle`.
 *
 * @experimental This web view provider, its WebView state shape, and its options
 *   ({@link ChecklistWebViewOptions}) are not yet a stable contract and may change without notice.
 *   The provider is also marked experimental at registration via `x-experimental` (see `main.ts`).
 */
export class ChecklistWebViewProvider implements IWebViewProvider {
  // getWebView doesn't use instance state but cannot be static because it implements the
  // IWebViewProvider interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ChecklistWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== markersChecklistWebViewType)
      throw new Error(
        `${markersChecklistWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    const title = projectId
      ? await papi.localization.getLocalizedProjectTitle({
          localizeKey: '%markersChecklist_windowTitle%',
          projectId,
        })
      : formatReplacementString(
          await papi.localization.getLocalizedString({
            localizeKey: '%markersChecklist_windowTitle%',
          }),
          { projectName: '' },
        );

    return {
      ...savedWebView,
      title,
      projectId,
      content: checklistWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        webViewType: markersChecklistWebViewType,
      },
      shouldShowToolbar: true,
    };
  }
}

export default ChecklistWebViewProvider;
