import papi from 'papi-backend';
import resourceViewerWebView from './resource-viewer.web-view?inline';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';
import { IWebViewProvider } from 'shared/models/web-view-provider.model';
import { SavedWebViewDefinition, WebViewDefinition } from 'shared/data/web-view.model';
import type { ResourceDataTypes } from 'resource-viewer';
import resourceData from './resource1.data.json';
import { UnsubscriberAsync } from 'shared/utils/papi-util';

const {
  logger,
  dataProvider: { DataProviderEngine },
} = papi;
logger.info('Resource Viewer is importing!');

const unsubscribers: UnsubscriberAsync[] = [];
class ResourceDataProviderEngine
  extends DataProviderEngine<ResourceDataTypes>
  implements IDataProviderEngine<ResourceDataTypes>
{
  constructor() {
    super();
  }

  getName = async () => {
    return resourceData.Name;
  };

  getFullName = async () => {
    return resourceData.FullName;
  };

  getId = async () => {
    return resourceData.Id;
  };

  getDirectory = async () => {
    return resourceData.Directory;
  };

  getFullPath = async () => {
    return resourceData.FullPath;
  };

  getBooksPresentSet = async () => {
    return resourceData.BooksPresentSet;
  };

  getUsfm = async () => {
    return resourceData.USFM;
  };

  getResource = async (name: string) => {
    return resourceData.USFM;
  };

  async setName(selector: string) {
    logger.log('This method should never be called. Tried to set: ' + selector);
    return false; //Read only resource viewer right now
  }

  async setFullName(selector: string) {
    logger.log('This method should never be called. Tried to set: ' + selector);
    return false; //Read only resource viewer right now
  }

  async setId(selector: string) {
    logger.log('This method should never be called. Tried to set: ' + selector);
    return false; //Read only resource viewer right now
  }

  async setDirectory(selector: string) {
    logger.log('This method should never be called. Tried to set: ' + selector);
    return false; //Read only resource viewer right now
  }

  async setFullPath(selector: string) {
    logger.log('This method should never be called. Tried to set: ' + selector);
    return false; //Read only resource viewer right now
  }

  async setBooksPresentSet(selector: string) {
    logger.log('This method should never be called. Tried to set: ' + selector);
    return false; //Read only resource viewer right now
  }

  async setUsfm(selector: string) {
    logger.log('This method should never be called. Tried to set: ' + selector);
    return false; //Read only resource viewer right now
  }

  async setResource(name: string, usfm: string) {
    return true;
  }
}

const resourceWebViewType = 'resourceViewer.react';

/**
 * Simple web view provider that provides Resource web views when papi requests them
 */
const resourceWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== resourceWebViewType)
      throw new Error(
        `${resourceWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Resource Viewer',
      content: resourceViewerWebView,
    };
  },
};

export async function activate() {
  logger.info('Resource viewer is activating!');

  const resourceDataProvider = await papi.dataProvider.registerEngine(
    'resource-viewer.resources',
    new ResourceDataProviderEngine(),
  );

  const resourceWebViewProviderPromise = papi.webViewProviders.register(
    resourceWebViewType,
    resourceWebViewProvider,
  );

  const unsubPromises = [
    papi.commands.registerCommand('resourceViewer.getUsfm', () => {
      return resourceDataProvider.getUsfm('1');
    }),
  ];

  // Create a webview or get an existing webview if one already exists for this type
  // Note: here, we are using `existingId: '?'` to indicate we do not want to create a new webview
  // if one already exists. The webview that already exists could have been created by anyone
  // anywhere; it just has to match `webViewType`.
  papi.webViews.getWebView(resourceWebViewType, undefined, { existingId: '?' });

  if (resourceDataProvider) {
    // Test subscribing to a data provider
    const unsubResources = await resourceDataProvider.subscribeResource(
      'aeaf859b-5718-4299-af35-08d730c95e45',
      (mockUsfm: string) =>
        logger.info(`Resource with id, aeaf859b-5718-4299-af35-08d730c95e45, has usfm:${mockUsfm}`),
    );
    unsubscribers.push(unsubResources);
  }

  // For now, let's just make things easy and await the registration promises at the end so we don't hold everything else up
  const resourceWebViewProviderResolved = await resourceWebViewProviderPromise;

  const combinedUnsubscriber: UnsubscriberAsync = papi.util.aggregateUnsubscriberAsyncs(
    (await Promise.all(unsubPromises)).concat([
      resourceDataProvider.dispose,
      resourceWebViewProviderResolved.dispose,
    ]),
  );
  logger.info('The Resource Viewer is finished activating!');
  return combinedUnsubscriber;
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}

export { ResourceDataTypes };
