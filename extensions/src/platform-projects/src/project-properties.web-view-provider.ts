import type { ProjectPropertiesWebViewOptions } from 'platform-projects';
import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import projectPropertiesWebView from './project-properties.web-view?inline';
import projectPropertiesStyles from './tailwind.css?inline';

export const projectPropertiesWebViewType = 'platformProjects.projectProperties';

const titleKeyCreate = '%webView_projectProperties_title_create%';
const titleKeyEdit = '%webView_projectProperties_title_edit%';
const tooltipKeyCreate = '%webView_projectProperties_tooltip_create%';
const tooltipKeyEdit = '%webView_projectProperties_tooltip_edit%';

export class ProjectPropertiesWebViewProvider implements IWebViewProvider {
  // needs to be a class method, not static method
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ProjectPropertiesWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== projectPropertiesWebViewType)
      throw new Error(
        `${projectPropertiesWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const savedMode = savedWebView.state?.mode;
    const mode =
      getWebViewOptions?.mode ??
      (savedMode === 'create' || savedMode === 'edit' ? savedMode : undefined) ??
      'create';
    const projectGuid =
      getWebViewOptions?.projectGuid ??
      (typeof savedWebView.state?.projectGuid === 'string'
        ? savedWebView.state.projectGuid
        : undefined);

    const titleKey = mode === 'create' ? titleKeyCreate : titleKeyEdit;
    const tooltipKey = mode === 'create' ? tooltipKeyCreate : tooltipKeyEdit;

    const { [titleKey]: title, [tooltipKey]: tooltip } =
      await papi.localization.getLocalizedStrings({ localizeKeys: [titleKey, tooltipKey] });

    return {
      ...savedWebView,
      title,
      tooltip,
      content: projectPropertiesWebView,
      styles: projectPropertiesStyles,
      state: {
        ...savedWebView.state,
        mode,
        projectGuid,
      },
    };
  }
}
