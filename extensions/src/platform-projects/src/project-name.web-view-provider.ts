import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import projectNameWebView from './project-name.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

/** === NEW IN PT10 === Reason: Web view provider pattern for Platform.Bible Maps to: UI-PKG-002 */

/** Configuration options for the project name form */
export interface ProjectNameWebViewOptions {
  initialValues?: {
    fullName: string;
    shortName: string;
    copyright: string;
  };
  config?: {
    allowShortNameEdit: boolean;
    allowFullNameEdit: boolean;
    allowCopyrightEdit: boolean;
    showRegistryMessage: boolean;
  };
  existingProjectNames?: string[];
}

export const projectNameWebViewType = 'platformProjects.projectName';

const titleKey = '%webView_projectName_title%';
const tooltipKey = '%webView_projectName_tooltip%';

/**
 * Web view provider for the Project Name dialog
 *
 * This dialog provides a focused interface for editing project name fields:
 *
 * - Full name
 * - Short name (with auto-generation from full name)
 * - Copyright
 *
 * Key behaviors implemented:
 *
 * - BHV-601: Auto-generate short name from full name
 * - BHV-306: Replace backslash with forward slash in full name
 * - BHV-307: User typing in short name disables auto-generation
 * - VAL-001: Short name validation rules
 */
export class ProjectNameWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: unknown,
    options?: ProjectNameWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== projectNameWebViewType)
      throw new Error(
        `${projectNameWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const { [titleKey]: title, [tooltipKey]: tooltip } =
      await papi.localization.getLocalizedStrings({
        localizeKeys: [titleKey, tooltipKey],
      });

    // Build input data from options
    const inputData = {
      initialValues: options?.initialValues ?? {
        fullName: '',
        shortName: '',
        copyright: '',
      },
      config: options?.config ?? {
        allowShortNameEdit: true,
        allowFullNameEdit: true,
        allowCopyrightEdit: true,
        showRegistryMessage: false,
      },
      existingProjectNames: options?.existingProjectNames ?? [],
    };

    return {
      ...savedWebView,
      title: title || 'Project Identification',
      tooltip: tooltip || 'Edit project name fields',
      content: projectNameWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        inputData,
      },
    };
  }
}
