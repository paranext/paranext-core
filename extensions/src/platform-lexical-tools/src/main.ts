import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  SavedWebViewDefinition,
  WebViewDefinition,
  IWebViewProvider,
} from '@papi/core';
import dictionaryWebViewReact from './web-views/dictionary.web-view?inline';
import tailwindCssStyles from './tailwind.css?inline';

const DICTIONARY_WEB_VIEW_TYPE = 'platformLexicalTools.dictionary';

const dictionaryWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== DICTIONARY_WEB_VIEW_TYPE)
      throw new Error(
        `${DICTIONARY_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Dictionary Extension',
      content: dictionaryWebViewReact,
      styles: tailwindCssStyles,
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.info('Platform Lexical Tools is activating!');

  const dictionaryWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    DICTIONARY_WEB_VIEW_TYPE,
    dictionaryWebViewProvider,
  );

  const openDictionaryCommandPromise = papi.commands.registerCommand(
    'platformLexicalTools.openDictionary',
    async () => {
      return papi.webViews.openWebView(DICTIONARY_WEB_VIEW_TYPE, {
        type: 'tab',
      });
    },
  );

  context.registrations.add(
    await dictionaryWebViewProviderPromise,
    await openDictionaryCommandPromise,
  );
}

export async function deactivate() {
  logger.info('Platform Lexical Tools is deactivating!');
  return true;
}
