import papi from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString } from 'platform-bible-utils';
import hyphenationWebView from './hyphenation.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const hyphenationWebViewType = 'platformScripture.hyphenation';

export interface HyphenationWebViewOptions extends OpenWebViewOptions {
  projectId: string | undefined;
}

/**
 * === NEW IN PT10 === Reason: WebView provider infrastructure for the Hyphenation tool (PT9 hosts
 * hyphenation inside the WinForms Wordlist tool instead) Maps to:
 * research/paratext-9-features/05_Spelling_Wordlist.md §5.6
 */
export class HyphenationWebViewProvider implements IWebViewProvider {
  // getWebView doesn't use instance state but cannot be static because it implements the
  // IWebViewProvider interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: HyphenationWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== hyphenationWebViewType)
      throw new Error(
        `${hyphenationWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    // Fall back to the raw project ID (or blank) if the project's data provider is not available
    // (e.g. freshly launched app or a saved layout whose project was removed) — the web view
    // itself renders a "no project" message in that case, so the title should not block opening
    let projectName: string = projectId ?? '';
    if (projectId) {
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', projectId);
        projectName = (await pdp.getSetting('platform.name')) ?? projectId;
      } catch {
        projectName = projectId;
      }
    }

    const title = formatReplacementString(
      await papi.localization.getLocalizedString({
        localizeKey: '%webView_hyphenation_title%',
      }),
      { projectName },
    );

    return {
      ...savedWebView,
      title,
      projectId,
      content: hyphenationWebView,
      styles: tailwindStyles,
      shouldShowToolbar: true,
    };
  }
}

export default HyphenationWebViewProvider;
