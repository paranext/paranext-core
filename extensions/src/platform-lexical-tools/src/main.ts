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
import { DICTIONARY_TITLE_KEY } from './utils/dictionary.utils';

const DICTIONARY_WEB_VIEW_TYPE = 'platformLexicalTools.dictionary';

export interface DictionaryWebViewOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  editorScrollGroupId: ScrollGroupScrRef | undefined;
  editorWebViewId: string | undefined;
}

/**
 * Resolves the project and scroll group a Dictionary tab opened from `editorWebViewId` should use.
 * Degrades to a tab with no project, on the default scroll group, rather than rejecting when the
 * editor's definition can't be resolved — the request still opens a usable tab, just without an
 * associated project.
 */
async function resolveDictionaryWebViewOptions(
  editorWebViewId: string | undefined,
): Promise<DictionaryWebViewOptions> {
  let projectId: string | undefined;
  let editorScrollGroupId: ScrollGroupScrRef | undefined;

  if (editorWebViewId) {
    try {
      const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(editorWebViewId);
      projectId = webViewDefinition?.projectId;
      editorScrollGroupId = webViewDefinition?.scrollGroupScrRef;
    } catch (e) {
      logger.warn(
        `Could not resolve the project for web view ${editorWebViewId}: ${getErrorMessage(e)}`,
      );
    }
  }

  return { projectId, editorWebViewId, editorScrollGroupId };
}

/**
 * Raises an open Dictionary tab without reloading it, and opens nothing when none is open. Mirrors
 * `showOrCreateTab` in `platform-scripture-editor/src/show-panel.util.ts`, which the scripture
 * editor's other Simple Tools items use.
 */
const RAISE_EXISTING_DICTIONARY_TAB_ONLY: OpenWebViewOptions = {
  existingId: '?',
  createNewIfNotFound: false,
  bringToFront: true,
};

/**
 * Brings the pinned Dictionary tab to the front, the way clicking it would. An open tab is raised,
 * never reloaded, so its current lookup survives.
 *
 * This is `openDictionary`'s Simple-mode behavior: Simple mode's Dictionary is the one pinned,
 * non-closable Column 3 tab, defined by the static Simple layout, so it should always already be
 * open. Deliberately does NOT fall back to creating one if the probe can't find it — that tab would
 * land outside the 3-column layout while still being forced non-closable (Simple mode), i.e. a
 * second, permanently-stuck tab, which is worse than reporting that none was found.
 *
 * @returns The Dictionary web view's ID, or `undefined` if the pinned tab could not be found
 */
async function raiseOrOpenDictionaryPanel(): Promise<string | undefined> {
  const existingId = await papi.webViews.openWebView(
    DICTIONARY_WEB_VIEW_TYPE,
    undefined,
    RAISE_EXISTING_DICTIONARY_TAB_ONLY,
  );
  if (existingId) return existingId;

  logger.warn(
    'Could not find the pinned Dictionary tab in Simple mode; not creating a second, non-closable tab outside the 3-column layout.',
  );
  return undefined;
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

    const title = DICTIONARY_TITLE_KEY;

    // Run concurrently, and tolerate either one rejecting: an uncaught rejection here would throw
    // `getWebView` itself, leaving the tab stuck on the `%tab_title_unknown%` placeholder
    // (non-closable in Simple mode, since this is the pinned Column 3 tab) with nothing to recover
    // it short of a restart. Degrading to a sane default is safer than that.
    const [interfaceMode, tooltip] = await Promise.all([
      // Re-read every call so mode changes are picked up at open/replace/restore time, matching the
      // other fixed Column 3 panels (e.g. comment-list-panel-web-view.factory.ts).
      papi.settings.get('platform.interfaceMode').catch((e): 'simple' => {
        logger.warn(
          `Could not read the interface mode for the Dictionary tab; defaulting to Simple mode: ${getErrorMessage(e)}`,
        );
        return 'simple';
      }),
      // `PlatformTabTitle` resolves a `%...%` title itself (live, on locale change), but it renders
      // `tooltip` verbatim with no such resolution, so the tooltip has to arrive already localized.
      // This is only the tab's INITIAL tooltip, for a fresh/reloaded tab, since `getWebView` doesn't
      // re-run just because a setting changed; dictionary.web-view.tsx's own effect keeps it current
      // on a subsequent interface-language change.
      papi.localization
        .getLocalizedString({ localizeKey: title })
        .catch((e): string | undefined => {
          logger.warn(
            `Could not resolve the Dictionary tooltip; showing no tooltip until it resolves: ${getErrorMessage(e)}`,
          );
          // Falls back to no tooltip rather than the raw `%...%` key: `PlatformTabTitle` renders a
          // tooltip verbatim with no localization of its own, so a raw key would show on hover until
          // the web view mounts and its own effect resolves the real string.
          return undefined;
        }),
    ]);

    return {
      ...savedWebView,
      title,
      content: dictionaryWebViewReact,
      styles: tailwindCssStyles,
      shouldShowToolbar: interfaceMode === 'power',
      projectId,
      // Set unconditionally rather than gated on Simple mode: `PlatformTabTitle` already
      // suppresses a tooltip that merely repeats the visible title unless the tab is icon-only, so
      // a mode gate here would only re-implement that suppression one layer further out — and if
      // Power mode ever did collapse to icon-only, this keeps working with no change.
      tooltip,
      // In Simple mode this is the pinned Column 3 tab, forced onto scroll group 0 to stay
      // verse-synced with the Scripture editor.
      scrollGroupScrRef: interfaceMode === 'simple' ? 0 : getWebViewOptions.editorScrollGroupId,
      // Shown in both Power and Simple mode (product decision) — see dictionary.web-view.tsx for
      // the live theme/selection-adaptive swap, likewise unconditional.
      iconUrl: 'papi-extension://platformLexicalTools/assets/book-a.svg',
      // TODO(PT-4405) move this per-mode computation into the renderer.
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

  // Opens a Dictionary tab. In Power mode, this creates a new tab per call, allowing each one to
  // independently track a different scroll group via its own toolbar selector. In Simple mode,
  // this raises the pinned Column 3 tab instead of opening a duplicate.
  const openDictionaryCommandPromise = papi.commands.registerCommand(
    'platformLexicalTools.openDictionary',
    async (editorWebViewId: string | undefined) => {
      const interfaceMode = await papi.settings.get('platform.interfaceMode');
      if (interfaceMode === 'simple') return raiseOrOpenDictionaryPanel();

      const dictionaryWebViewOptions = await resolveDictionaryWebViewOptions(editorWebViewId);
      return papi.webViews.openWebView(
        DICTIONARY_WEB_VIEW_TYPE,
        { type: 'tab' },
        dictionaryWebViewOptions,
      );
    },
    {
      method: {
        summary:
          'Open the Dictionary tab. In Simple mode, brings the pinned tab to the front; in Power mode, opens a new tab.',
        params: [
          {
            name: 'editorWebViewId',
            required: false,
            summary: 'The scripture editor whose project is associated with a newly opened tab',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the Dictionary web view, or undefined if it could not be shown',
          schema: { type: 'string' },
        },
      },
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
