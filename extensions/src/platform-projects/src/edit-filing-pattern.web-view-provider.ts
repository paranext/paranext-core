import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import editFilingPatternWebView from './edit-filing-pattern.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const editFilingPatternWebViewType = 'platformProjects.editFilingPattern';

export class EditFilingPatternWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%platformProjects_editFilingPattern_title%',
    });

    return {
      ...savedWebView,
      title,
      content: editFilingPatternWebView,
      styles: tailwindStyles,
    };
  }
}

export default EditFilingPatternWebViewProvider;
