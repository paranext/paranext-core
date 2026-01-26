import {
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
  OpenWebViewOptions,
} from '@papi/core';
import papi from '@papi/backend';
import projectPropertiesWebView from './project-properties.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

/** Web view type identifier for the Project Properties form. */
export const projectPropertiesWebViewType = 'paratextProjectCreation.projectProperties';

/** Localization key for the web view title */
const titleKeyNew = '%projectCreation_title_new%';
const titleKeyEdit = '%projectCreation_title_edit%';
const tooltipKey = '%projectCreation_webView_tooltip%';

/**
 * Provider for the Project Properties web view.
 *
 * This provider creates web views for the Project Properties form, which is used for both creating
 * new projects and editing existing project settings.
 */
export class ProjectPropertiesWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    _openWebViewOptions: OpenWebViewOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _webViewNonce: string,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== projectPropertiesWebViewType)
      throw new Error(
        `${projectPropertiesWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    // Check if there's a pending project guid for edit mode
    const pendingGuid = (globalThis as Record<string, unknown>).__pendingProjectGuid as
      | string
      | undefined;
    const mode = pendingGuid ? 'edit' : 'new';
    const projectGuid = pendingGuid || undefined;

    // Get localized title based on mode
    const titleKey = mode === 'new' ? titleKeyNew : titleKeyEdit;
    const { [titleKey]: titleTemplate, [tooltipKey]: tooltip } =
      await papi.localization.getLocalizedStrings({
        localizeKeys: [titleKey, tooltipKey],
      });

    // For edit mode, try to get the project name for the title
    let title = titleTemplate || (mode === 'new' ? 'New Project' : 'Project Properties');
    if (mode === 'edit' && projectGuid) {
      // The title will be updated by the web view component with the actual project name
      title = title.replace('{name}', 'Project');
    }

    return {
      ...savedWebView,
      title,
      tooltip: tooltip || 'Configure project properties',
      content: projectPropertiesWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        webViewState: {
          mode,
          projectGuid,
        },
      },
    };
  }
}
