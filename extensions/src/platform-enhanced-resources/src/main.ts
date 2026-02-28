import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import enhancedResourceWebViewProvider, {
  ER_WEB_VIEW_TYPE,
  EnhancedResourceWebViewOptions,
} from './web-views/enhanced-resource.web-view-provider';

export async function activate(context: ExecutionActivationContext) {
  logger.debug('Platform Enhanced Resources is activating!');

  const erWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    ER_WEB_VIEW_TYPE,
    enhancedResourceWebViewProvider,
  );

  const openErCommandPromise = papi.commands.registerCommand(
    'platformEnhancedResources.openEnhancedResource',
    async (resourceId?: string) => {
      const options: EnhancedResourceWebViewOptions = {
        resourceId: resourceId || undefined,
        editorScrollGroupId: undefined,
      };
      return papi.webViews.openWebView(ER_WEB_VIEW_TYPE, { type: 'tab' }, options);
    },
    {
      method: {
        summary: 'Open an Enhanced Resource web view',
        params: [
          {
            name: 'resourceId',
            required: false,
            summary: 'The ID of the enhanced resource to open',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  context.registrations.add(await erWebViewProviderPromise, await openErCommandPromise);
}

export async function deactivate() {
  logger.debug('Platform Enhanced Resources is deactivating!');
  return true;
}
