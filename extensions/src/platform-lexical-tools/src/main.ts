import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  SavedWebViewDefinition,
  WebViewDefinition,
  IWebViewProvider,
  OpenWebViewOptions,
  ScrollGroupScrRef,
} from '@papi/core';
import { getErrorMessage } from 'platform-bible-utils';
import dictionaryWebViewReact from './web-views/dictionary.web-view?inline';
import tailwindCssStyles from './tailwind.css?inline';
import { LexicalReferenceService } from './lexical-reference.service';
import { LexicalReferenceTextManager } from './lexical-reference-text-manager.model';
import { LexicalReferenceProjectDataProviderEngineFactory } from './lexical-reference-project-data-provider-engine-factory.model';
import { LEXICAL_REFERENCE_PROJECT_INTERFACES } from './lexical-reference-project-data-provider-engine.model';

const DICTIONARY_WEB_VIEW_TYPE = 'platformLexicalTools.dictionary';

export interface DictionaryWebViewOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  editorScrollGroupId: ScrollGroupScrRef | undefined;
  editorWebViewId: string | undefined;
}

const dictionaryWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: DictionaryWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== DICTIONARY_WEB_VIEW_TYPE)
      throw new Error(
        `${DICTIONARY_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    // Re-read every call so mode changes are picked up at open/replace/restore time, matching the
    // other fixed Column 3 panels (e.g. comment-list-panel-web-view.factory.ts).
    const interfaceMode = await papi.settings.get('platform.interfaceMode');

    return {
      ...savedWebView,
      title: '%platformLexicalTools_dictionary_title_sdbhSdbg%',
      content: dictionaryWebViewReact,
      styles: tailwindCssStyles,
      shouldShowToolbar: true,
      projectId,
      // In Simple mode this is the pinned Column 3 tab, forced onto scroll group 0 to stay
      // verse-synced with the Scripture editor (also forced to 0 there) regardless of which editor
      // last invoked `openDictionary` — matches Bible Texts/Commentaries/Comments' own forcing.
      // Power mode preserves whichever scroll group the invoking editor asked to follow.
      scrollGroupScrRef: interfaceMode === 'simple' ? 0 : getWebViewOptions.editorScrollGroupId,
      iconUrl: 'papi-extension://platformLexicalTools/assets/text-initial.svg',
      isClosable: interfaceMode === 'power',
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.debug('Platform Lexical Tools is activating!');

  const dictionaryWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    DICTIONARY_WEB_VIEW_TYPE,
    dictionaryWebViewProvider,
  );

  const openDictionaryCommandPromise = papi.commands.registerCommand(
    'platformLexicalTools.openDictionary',
    async (editorWebViewId: string | undefined) => {
      let projectId;
      let editorScrollGroupId;

      if (editorWebViewId) {
        const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(editorWebViewId);
        projectId = webViewDefinition?.projectId;
        editorScrollGroupId = webViewDefinition?.scrollGroupScrRef;
      }
      const dictionaryWebViewOptions: DictionaryWebViewOptions = {
        projectId,
        editorWebViewId,
        editorScrollGroupId,
      };
      return papi.webViews.openWebView(
        DICTIONARY_WEB_VIEW_TYPE,
        {
          type: 'tab',
        },
        dictionaryWebViewOptions,
      );
    },
  );

  const lexicalReferenceTextManager = new LexicalReferenceTextManager();

  const lexicalReferenceServicePromise = papi.dataProviders.registerEngine(
    'platformLexicalTools.lexicalReferenceService',
    new LexicalReferenceService(lexicalReferenceTextManager),
  );

  const lexicalReferenceProjectDataProviderEngineFactory =
    new LexicalReferenceProjectDataProviderEngineFactory(lexicalReferenceTextManager);

  const lexicalReferencePdpefPromise =
    papi.projectDataProviders.registerProjectDataProviderEngineFactory(
      'platformLexicalTools.lexicalReferencePdpf',
      LEXICAL_REFERENCE_PROJECT_INTERFACES,
      lexicalReferenceProjectDataProviderEngineFactory,
    );

  const lexicalReferenceService = await lexicalReferenceServicePromise;
  try {
    await lexicalReferenceTextManager.registerLexicalReferenceText(
      'papi-extension://platformLexicalTools/assets/lexical-db/lexical.db',
    );
  } catch (error) {
    logger.warn(
      `Platform Lexical Tools: Failed to load lexical database. The Dictionary will open but show no entries, and lexical reference queries will return empty results. Reason: ${getErrorMessage(error)}`,
    );
  }

  context.registrations.add(
    await dictionaryWebViewProviderPromise,
    await openDictionaryCommandPromise,
    lexicalReferenceTextManager,
    lexicalReferenceService,
    await lexicalReferencePdpefPromise,
  );
}

export async function deactivate() {
  logger.debug('Platform Lexical Tools is deactivating!');
  return true;
}
