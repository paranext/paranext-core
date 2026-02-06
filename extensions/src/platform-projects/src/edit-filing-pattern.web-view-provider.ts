/**
 * === NEW IN PT10 === Reason: Web view providers don't exist in PT9's WinForms architecture. Maps
 * to: UI-PKG-005
 */

import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import editFilingPatternWebView from './edit-filing-pattern.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const editFilingPatternWebViewType = 'platformProjects.editFilingPattern';

/** Context needed for resolving pattern placeholders in preview */
export interface PreviewContext {
  /** Project short name (e.g., "TEST") */
  projectShortName: string;
  /** Sample book ID for preview (e.g., "MAT") */
  sampleBookId: string;
  /** Sample book number for preview (e.g., 41) */
  sampleBookNumber: number;
}

/** Options for opening the Edit Filing Pattern web view */
export interface EditFilingPatternWebViewOptions extends OpenWebViewOptions {
  /** Initial pattern value */
  initialPattern?: string;
  /** Context for preview generation */
  previewContext?: PreviewContext;
}

/** Default pattern when none is provided */
const DEFAULT_PATTERN = '{nn}{BBB}{project}.SFM';

/** Default preview context */
const DEFAULT_PREVIEW_CONTEXT: PreviewContext = {
  projectShortName: 'project',
  sampleBookId: 'MAT',
  sampleBookNumber: 41,
};

/** Web view provider for the Edit Filing Pattern form */
export class EditFilingPatternWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: EditFilingPatternWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    // Get initial pattern from options or saved state (using simple property access pattern)
    const initialPattern =
      getWebViewOptions.initialPattern || savedWebView.state?.initialPattern || DEFAULT_PATTERN;

    // Get preview context from options or saved state, with defaults
    const previewContext =
      getWebViewOptions.previewContext ||
      savedWebView.state?.previewContext ||
      DEFAULT_PREVIEW_CONTEXT;

    // Get localized title
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_editFilingPattern_title%',
    });

    return {
      ...savedWebView,
      title: title || 'Book File Naming Convention',
      content: editFilingPatternWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        initialPattern,
        previewContext,
      },
    };
  }
}

export default EditFilingPatternWebViewProvider;
