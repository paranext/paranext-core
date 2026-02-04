/**
 * === NEW IN PT10 === Reason: Platform.Bible web view provider pattern for React-based dialogs Maps
 * to: UI-PKG-005, SCR-005, BHV-514, VAL-006
 */
import type { EditFilingPatternWebViewOptions } from 'platform-projects';
import { IWebViewProvider, WebViewDefinition } from '@papi/core';
import editFilingPatternWebView from './edit-filing-pattern.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export const editFilingPatternWebViewType = 'platformProjects.editFilingPattern';

/**
 * Web view provider for the Edit Filing Pattern dialog. This dialog allows users to customize the
 * book file naming pattern with a live preview showing how the pattern resolves to actual
 * filenames.
 *
 * Maps to: UI-PKG-005, SCR-005, BHV-514, VAL-006
 */
export class EditFilingPatternWebViewProvider implements IWebViewProvider {
  // needs to be a class method, not static method
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: WebViewDefinition,
    _getWebViewOptions: unknown,
    options: EditFilingPatternWebViewOptions,
  ): Promise<WebViewDefinition> {
    return {
      ...savedWebView,
      title: 'Book File Naming Convention',
      content: editFilingPatternWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        initialPattern: options.initialPattern ?? '{nn}{BBB}{project}.SFM',
        previewContext: options.previewContext ?? {
          projectShortName: 'PROJECT',
          sampleBookId: 'MAT',
          sampleBookNumber: 41,
        },
      },
    };
  }
}
