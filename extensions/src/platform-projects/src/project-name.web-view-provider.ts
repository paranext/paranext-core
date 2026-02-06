import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import projectNameWebView from './project-name.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export interface ProjectNameWebViewOptions extends OpenWebViewOptions {
  fullName?: string;
  shortName?: string;
  copyright?: string;
  allowShortNameEdit?: boolean;
  allowFullNameEdit?: boolean;
  allowCopyrightEdit?: boolean;
  showRegistryMessage?: boolean;
}

export const projectNameWebViewType = 'platformProjects.projectName';

export class ProjectNameWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ProjectNameWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_projectName_title%',
    });

    return {
      ...savedWebView,
      title,
      content: projectNameWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        fullName: getWebViewOptions.fullName ?? savedWebView.state?.fullName ?? '',
        shortName: getWebViewOptions.shortName ?? savedWebView.state?.shortName ?? '',
        copyright: getWebViewOptions.copyright ?? savedWebView.state?.copyright ?? '',
        allowShortNameEdit:
          getWebViewOptions.allowShortNameEdit ?? savedWebView.state?.allowShortNameEdit ?? true,
        allowFullNameEdit:
          getWebViewOptions.allowFullNameEdit ?? savedWebView.state?.allowFullNameEdit ?? true,
        allowCopyrightEdit:
          getWebViewOptions.allowCopyrightEdit ?? savedWebView.state?.allowCopyrightEdit ?? true,
        showRegistryMessage:
          getWebViewOptions.showRegistryMessage ?? savedWebView.state?.showRegistryMessage ?? false,
      },
    };
  }
}

export default ProjectNameWebViewProvider;
