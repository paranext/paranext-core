import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import type { EnhancedResourceWebViewOptions } from 'platform-enhanced-resources';
import enhancedResourceWebViewReact from './web-views/enhanced-resource.web-view?inline';
import tailwindCssStyles from './tailwind.css?inline';
import enhancedResourceWebViewStyles from './enhanced-resource.web-view.scss?inline';

const ENHANCED_RESOURCE_WEB_VIEW_TYPE = 'platformEnhancedResources.enhancedResource';

// TODO(GAP-001): replace this default with a real Enhanced Resource picker UI.
// Until the picker lands, ESV16UK+ is the sole resource we E2E test against because it is
// reliably installed in the test fixture environment. Removing the hardcoding will require
// surfacing a picker (see GAP-001 in post-phase-3-followups.md).
const HARDCODED_DEFAULT_RESOURCE_ID = 'ESV16UK+';

/**
 * Provider for the Enhanced Resource web view (UI-PKG-009 launcher target).
 *
 * Mirrors the `platform-lexical-tools` registration pattern. Forwards the editor's scroll group (so
 * verse navigation stays in sync) and persists `resourceId` in the web view state.
 *
 * `resolveResourceObjectId` validation is intentionally omitted at provider time - the UI shell
 * renders an empty state when `tokens === undefined`, which is what TS-043 expects when no Enhanced
 * Resource is selected or when the factory has no marble data installed.
 *
 * @experimental This web view provider, its WebView state shape, and its options
 *   ({@link EnhancedResourceWebViewOptions}) are not yet a stable contract and may change without
 *   notice. The provider is also marked experimental at registration via `x-experimental` (see
 *   `activate`).
 */
const enhancedResourceWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: EnhancedResourceWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== ENHANCED_RESOURCE_WEB_VIEW_TYPE)
      throw new Error(
        `${ENHANCED_RESOURCE_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const resourceId =
      getWebViewOptions.resourceId ||
      (typeof savedWebView.state?.resourceId === 'string'
        ? savedWebView.state.resourceId
        : undefined);

    return {
      ...savedWebView,
      title: '%platformEnhancedResources_title_enhancedResource%',
      content: enhancedResourceWebViewReact,
      styles: `${tailwindCssStyles}\n${enhancedResourceWebViewStyles}`,
      shouldShowToolbar: true,
      scrollGroupScrRef: getWebViewOptions.editorScrollGroupId,
      state: {
        ...savedWebView.state,
        resourceId,
      },
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.debug('Platform Enhanced Resources is activating!');

  const enhancedResourceWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    ENHANCED_RESOURCE_WEB_VIEW_TYPE,
    enhancedResourceWebViewProvider,
    undefined,
    // Experimental: the Enhanced Resource web view, its state shape, and its options are not yet a
    // stable contract. See the experimental APIs wiki page.
    { 'x-experimental': true },
  );

  const openEnhancedResourceCommandPromise = papi.commands.registerCommand(
    'platformEnhancedResources.openEnhancedResource',
    async (editorWebViewId?: string) => {
      let editorScrollGroupId;
      if (editorWebViewId) {
        const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(editorWebViewId);
        editorScrollGroupId = webViewDefinition?.scrollGroupScrRef;
      }

      // TODO(GAP-001): once a picker UI exists, drop the hardcoded default and let the picker
      // supply the resourceId. The shell's empty state (TS-043) still kicks in if the factory
      // has no marble data installed for the resolved resourceId.
      const enhancedResourceWebViewOptions: EnhancedResourceWebViewOptions = {
        resourceId: HARDCODED_DEFAULT_RESOURCE_ID,
        editorScrollGroupId,
      };

      return papi.webViews.openWebView(
        ENHANCED_RESOURCE_WEB_VIEW_TYPE,
        { type: 'tab' },
        enhancedResourceWebViewOptions,
      );
    },
    {
      method: {
        // Experimental: this command's contract is not yet stable.
        'x-experimental': true,
        summary: 'Opens the Enhanced Resource web view',
        params: [
          {
            name: 'editorWebViewId',
            required: false,
            summary:
              "The id of the editor web view the user opened the Enhanced Resource from. Used to inherit the editor's scroll group and project id when present.",
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary:
            'Web view id for the new Enhanced Resource web view, or undefined if not created',
          schema: { type: ['string', 'null'] },
        },
      },
    },
  );

  // UI-PKG-008: register the `platformEnhancedResources.showMarbleGuide` boolean setting validator.
  // The setting is consumed by the ER web view via `useSetting` to decide whether the MarbleGuide
  // tutorial dialog auto-shows on first ER open per application session.
  const showMarbleGuideValidatorPromise = papi.settings.registerValidator(
    'platformEnhancedResources.showMarbleGuide',
    async (newValue) => typeof newValue === 'boolean',
  );

  // UI-PKG-008 / BHV-461 / TS-067: cross-tab session guard. Each application session, the first ER
  // open that asks `requestAutoShowGuide` and finds the setting `true` gets `true` back; every
  // subsequent call in the same session gets `false`. The flag lives in extension-host memory so
  // it resets on app restart (matching PT9's `haveShownMarbleGuide` static).
  let haveShownMarbleGuide = false;
  const requestAutoShowGuideCommandPromise = papi.commands.registerCommand(
    'platformEnhancedResources.requestAutoShowGuide',
    async () => {
      if (haveShownMarbleGuide) return false;
      try {
        const showMarbleGuide = await papi.settings.get(
          'platformEnhancedResources.showMarbleGuide',
        );
        if (!showMarbleGuide) return false;
      } catch (e) {
        logger.warn(
          `requestAutoShowGuide: failed to read showMarbleGuide setting, defaulting to true: ${e}`,
        );
        // If we can't read the setting, fall back to the install-default behavior (true), so the
        // tutorial still surfaces on a fresh install where the setting key may not exist yet.
      }
      haveShownMarbleGuide = true;
      return true;
    },
    {
      method: {
        // Experimental: this command's contract is not yet stable.
        'x-experimental': true,
        summary:
          'Asks the extension whether the MarbleGuide tutorial should auto-show on this Enhanced Resource open',
        params: [],
        result: {
          name: 'return value',
          summary:
            'True only on the first call per application session and only when the showMarbleGuide setting is true',
          schema: { type: 'boolean' },
        },
      },
    },
  );

  context.registrations.add(
    await enhancedResourceWebViewProviderPromise,
    await openEnhancedResourceCommandPromise,
    await showMarbleGuideValidatorPromise,
    await requestAutoShowGuideCommandPromise,
  );
}

export async function deactivate() {
  logger.debug('Platform Enhanced Resources is deactivating!');
  return true;
}
