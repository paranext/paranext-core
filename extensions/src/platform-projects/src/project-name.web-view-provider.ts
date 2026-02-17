import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import projectNameWebView from './project-name.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const projectNameWebViewType = 'platformProjects.projectName';

export class ProjectNameWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%platformProjects_projectName_title%',
    });

    return {
      ...savedWebView,
      title,
      content: projectNameWebView,
      styles: tailwindStyles,
    };
  }
}

export default ProjectNameWebViewProvider;
