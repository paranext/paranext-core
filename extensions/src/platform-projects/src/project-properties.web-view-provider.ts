/**
 * === NEW IN PT10 === Reason: Web view providers don't exist in PT9's WinForms architecture Maps
 * to: UI-PKG-001
 */

import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import projectPropertiesWebView from './project-properties.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const projectPropertiesWebViewType = 'platformProjects.projectProperties';

export interface ProjectPropertiesWebViewOptions extends OpenWebViewOptions {
  /** Mode: 'create' for new project, 'edit' for existing project */
  mode: 'create' | 'edit';
  /** Project GUID for edit mode */
  projectGuid?: string;
}

/** Web view provider for the Project Properties form */
export class ProjectPropertiesWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ProjectPropertiesWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const mode = getWebViewOptions.mode || savedWebView.state?.mode || 'create';
    const projectGuid = getWebViewOptions.projectGuid || savedWebView.state?.projectGuid;

    // Get localized title
    const titleKey =
      mode === 'create'
        ? '%webView_projectProperties_title_create%'
        : '%webView_projectProperties_title_edit%';

    const title = await papi.localization.getLocalizedString({
      localizeKey: titleKey,
    });

    return {
      ...savedWebView,
      title: title || (mode === 'create' ? 'Create New Project' : 'Edit Project'),
      content: projectPropertiesWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        mode,
        projectGuid,
      },
    };
  }
}

export default ProjectPropertiesWebViewProvider;
