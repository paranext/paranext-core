import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import projectPropertiesWebView from './project-properties.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export interface ProjectPropertiesWebViewOptions extends OpenWebViewOptions {
  mode?: 'create' | 'edit';
  projectGuid?: string;
}

export const projectPropertiesWebViewType = 'platformProjects.projectProperties';

export class ProjectPropertiesWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ProjectPropertiesWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const mode = getWebViewOptions.mode ?? savedWebView.state?.mode ?? 'create';

    const titleKey =
      mode === 'create'
        ? '%webView_projectProperties_title_create%'
        : '%webView_projectProperties_title_edit%';

    const title = await papi.localization.getLocalizedString({
      localizeKey: titleKey,
    });

    return {
      ...savedWebView,
      title,
      content: projectPropertiesWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        mode,
        projectGuid: getWebViewOptions.projectGuid ?? savedWebView.state?.projectGuid,
      },
    };
  }
}

export default ProjectPropertiesWebViewProvider;
