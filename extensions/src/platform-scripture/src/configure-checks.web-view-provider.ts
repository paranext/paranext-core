import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { LocalizeKey } from 'platform-bible-utils';
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

    let title: string = await papi.localization.getLocalizedString({
      localizeKey: this.titleKey,
    });

    let projectName: string | undefined;

    if (projectId) {
      const pdp = await papi.projectDataProviders.get('platform.base', projectId);
      projectName = (await pdp.getSetting('platform.name')) ?? projectId;

      title += ` - ${projectName}`;
    }

    return {
      title,
      ...savedWebView,
      content: configureChecksWebView,
      styles: configureChecksWebViewStyles,
      state: {
        projectName,
        projectId,
        ...savedWebView.state,
      },
    };
  }
}
