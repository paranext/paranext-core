import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString, type LocalizeKey } from 'platform-bible-utils';
import configureChecksWebView from './configure-checks.web-view?inline';
import configureChecksWebViewStyles from './configure-checks.web-view.scss?inline';

export const configureChecksWebViewType = 'platformScripture.configureChecks';

export interface ConfigureChecksWebViewOptions extends GetWebViewOptions {
  projectId: string | undefined;
}

export default class ConfigureChecksWebViewProvider implements IWebViewProvider {
  constructor(public titleKey: LocalizeKey) {}

  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ConfigureChecksWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    let projectName: string | undefined;

    if (projectId) {
      const pdp = await papi.projectDataProviders.get('platform.base', projectId);
      projectName = (await pdp.getSetting('platform.name')) ?? projectId;
    }

    const title = formatReplacementString(
      await papi.localization.getLocalizedString({
        localizeKey: this.titleKey,
      }),
      {
        projectName,
      },
    );

    return {
      ...savedWebView,
      title,
      projectId,
      content: configureChecksWebView,
      styles: configureChecksWebViewStyles,
      state: {
        ...savedWebView.state,
      },
    };
  }
}
