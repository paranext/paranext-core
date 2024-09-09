import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
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
    // We know that the projectId (if present in the state) will be a string.
    const projectId =
      getWebViewOptions.projectId ||
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (savedWebView.state?.projectId as string) ||
      undefined;

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
      title,
      projectId,
      ...savedWebView,
      content: configureChecksWebView,
      styles: configureChecksWebViewStyles,
      state: {
        ...savedWebView.state,
      },
    };
  }
}
