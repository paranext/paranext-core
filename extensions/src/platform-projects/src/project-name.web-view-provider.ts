/**
 * === NEW IN PT10 === Reason: Web view providers don't exist in PT9's WinForms architecture. Maps
 * to: UI-PKG-002
 */

import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import projectNameWebView from './project-name.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const projectNameWebViewType = 'platformProjects.projectName';

/** Input configuration for the Project Name form */
export interface ProjectNameFormConfig {
  /** Whether short name can be edited */
  allowShortNameEdit: boolean;
  /** Whether full name can be edited */
  allowFullNameEdit: boolean;
  /** Whether copyright can be edited */
  allowCopyrightEdit: boolean;
  /** Whether to show registry change message for restricted projects */
  showRegistryMessage: boolean;
}

/** Initial values for the Project Name form */
export interface ProjectNameFormInitialValues {
  fullName: string;
  shortName: string;
  copyright: string;
}

/** Options for opening the Project Name web view */
export interface ProjectNameWebViewOptions extends OpenWebViewOptions {
  /** Initial values for the form */
  initialValues?: ProjectNameFormInitialValues;
  /** Configuration for field editability */
  config?: ProjectNameFormConfig;
  /** Existing project names for uniqueness validation */
  existingProjectNames?: string[];
}

/** Web view provider for the Project Name form */
export class ProjectNameWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ProjectNameWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    // Get values from options or saved state
    const initialValues = getWebViewOptions.initialValues ||
      savedWebView.state?.initialValues || {
        fullName: '',
        shortName: '',
        copyright: '',
      };

    const config = getWebViewOptions.config ||
      savedWebView.state?.config || {
        allowShortNameEdit: true,
        allowFullNameEdit: true,
        allowCopyrightEdit: true,
        showRegistryMessage: false,
      };

    const existingProjectNames =
      getWebViewOptions.existingProjectNames || savedWebView.state?.existingProjectNames || [];

    // Get localized title
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_projectName_title%',
    });

    return {
      ...savedWebView,
      title: title || 'Project Identification',
      content: projectNameWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        initialValues,
        config,
        existingProjectNames,
      },
    };
  }
}

export default ProjectNameWebViewProvider;
