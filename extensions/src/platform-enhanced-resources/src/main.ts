import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  EnhancedResourceWebViewProvider,
  EnhancedResourceWebViewOptions,
  ENHANCED_RESOURCE_WEB_VIEW_TYPE,
} from './enhanced-resource.web-view-provider';
import { GuideWebViewProvider, GUIDE_WEB_VIEW_TYPE } from './guide.web-view-provider';

async function openEnhancedResource(
  webViewId: string | undefined,
  resourceId: string | undefined,
): Promise<string | undefined> {
  const options: EnhancedResourceWebViewOptions = {
    ...(webViewId ? { existingId: webViewId } : {}),
    ...(resourceId ? { resourceId } : {}),
  };
  return papi.webViews.openWebView(ENHANCED_RESOURCE_WEB_VIEW_TYPE, { type: 'tab' }, options);
}

async function openGuide(webViewId: string | undefined): Promise<string | undefined> {
  return papi.webViews.openWebView(
    GUIDE_WEB_VIEW_TYPE,
    { type: 'float', floatSize: { width: 700, height: 600 } },
    webViewId ? { existingId: webViewId } : undefined,
  );
}

export async function activate(context: ExecutionActivationContext) {
  logger.debug('platformEnhancedResources is activating!');

  const enhancedResourceWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    ENHANCED_RESOURCE_WEB_VIEW_TYPE,
    new EnhancedResourceWebViewProvider(),
  );

  const guideWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    GUIDE_WEB_VIEW_TYPE,
    new GuideWebViewProvider(),
  );

  const openEnhancedResourcePromise = papi.commands.registerCommand(
    'platformEnhancedResources.openEnhancedResource',
    openEnhancedResource,
    {
      method: {
        summary: 'Open an Enhanced Resource viewer',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'Optional existing web view ID to reuse',
            schema: { type: 'string' },
          },
          {
            name: 'resourceId',
            required: false,
            summary: 'Optional enhanced resource ID to display',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened Enhanced Resource web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const openGuidePromise = papi.commands.registerCommand(
    'platformEnhancedResources.openGuide',
    openGuide,
    {
      method: {
        summary: 'Open the Enhanced Resources Getting Started guide',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'Optional existing web view ID',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened guide web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  context.registrations.add(
    await enhancedResourceWebViewProviderPromise,
    await guideWebViewProviderPromise,
    await openEnhancedResourcePromise,
    await openGuidePromise,
  );

  logger.debug('platformEnhancedResources is finished activating!');
}

export async function deactivate() {
  logger.debug('platformEnhancedResources is deactivating!');
  return true;
}
