import papi, { logger, WebViewFactory } from '@papi/backend';
import type {
  ExecutionActivationContext,
  WebViewContentType,
  WebViewDefinition,
  SavedWebViewDefinition,
  IWebViewProvider,
  GetWebViewOptions,
} from '@papi/core';
import { PlatformEventEmitter } from 'platform-bible-utils';
import type { HelloWorldEvent, HelloWorldProjectWebViewController } from 'hello-world';
import helloWorldReactWebView from './web-views/hello-world.web-view?inline';
import helloWorldReactWebViewStyles from './web-views/hello-world.web-view.scss?inline';
import helloWorldReactWebView2 from './web-views/hello-world-2.web-view?inline';
import helloWorldReactWebView2Styles from './web-views/hello-world-2.web-view.scss?inline';
import helloWorldHtmlWebView from './web-views/hello-world.web-view.html?inline';
import HelloWorldProjectDataProviderEngineFactory from './models/hello-world-project-data-provider-engine-factory.model';
import helloWorldProjectWebView from './web-views/hello-world-project/hello-world-project.web-view?inline';
import helloWorldProjectWebViewStyles from './web-views/hello-world-project/hello-world-project.web-view.scss?inline';
import helloWorldProjectViewerWebView from './web-views/hello-world-project/hello-world-project-viewer.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
import { HTML_COLOR_NAMES } from './util';
import { HELLO_WORLD_PROJECT_INTERFACES } from './models/hello-world-project-data-provider-engine.model';
import { checkDetails, createHelloCheck } from './checks';

/** User data storage key for all hello world project data */
const allProjectDataStorageKey = 'allHelloWorldProjectData';

type IWebViewProviderWithType = IWebViewProvider & { webViewType: string };

logger.info('Hello world is importing!');

// #region Hello World General Web Views

/** Simple web view provider that provides sample html web views when papi requests them */
const htmlWebViewProvider: IWebViewProviderWithType = {
  webViewType: 'helloWorld.html',
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Hello World HTML',
      // Can't use the enum value from a definition file so assert the type from the string literal.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      contentType: 'html' as WebViewContentType.HTML,
      content: helloWorldHtmlWebView,
    };
  },
};

/** Simple web view provider that provides React web views when papi requests them */
const reactWebViewProvider: IWebViewProviderWithType = {
  webViewType: 'helloWorld.react',
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      iconUrl: 'papi-extension://helloWorld/assets/offline.svg',
      title: 'Hello World React',
      ...savedWebView,
      content: helloWorldReactWebView,
      styles: helloWorldReactWebViewStyles,
      state: {
        ...savedWebView.state,
        clicks: Math.floor(Math.random() * 100),
      },
    };
  },
};

/** Simple web view provider that provides other React web views when papi requests them */
const reactWebView2Provider: IWebViewProviderWithType = {
  webViewType: 'helloWorld.react2',
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Hello World React 2',
      content: helloWorldReactWebView2,
      styles: helloWorldReactWebView2Styles,
    };
  },
};

// #endregion

// #region Hello World Project Web View, Command, etc.

interface HelloWorldProjectOptions extends GetWebViewOptions {
  /** The project ID this viewer should focus on */
  projectId?: string;
}

const HELLO_WORLD_PROJECT_WEB_VIEW_TYPE = 'helloWorld.projectWebView';
/** Simple web view provider that provides helloWorld project web views when papi requests them */
class HelloWorldProjectWebViewFactory extends WebViewFactory<
  typeof HELLO_WORLD_PROJECT_WEB_VIEW_TYPE
> {
  constructor() {
    super(HELLO_WORLD_PROJECT_WEB_VIEW_TYPE);
  }

  override async getWebViewDefinition(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: HelloWorldProjectOptions,
  ): Promise<WebViewDefinition | undefined> {
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;
    return {
      title: projectId
        ? `Hello World Project: ${
            (await (
              await papi.projectDataProviders.get('platform.base', projectId)
            ).getSetting('platform.name')) ?? projectId
          }`
        : 'Hello World Project',
      ...savedWebView,
      content: helloWorldProjectWebView,
      styles: helloWorldProjectWebViewStyles,
      projectId,
    };
  }

  override async createWebViewController(
    webViewDefinition: WebViewDefinition,
    webViewNonce: string,
  ): Promise<HelloWorldProjectWebViewController> {
    return {
      async focusName(name) {
        try {
          logger.info(
            `Hello World Project Web View Controller ${webViewDefinition.id} received request to focus ${name}`,
          );
          await papi.webViewProviders.postMessageToWebView(webViewDefinition.id, webViewNonce, {
            method: 'focusName',
            name,
          });
          return true;
        } catch (e) {
          logger.warn(
            `Hello World Project Web View Controller ${webViewDefinition.id} threw while running focusName! ${e}`,
          );
          return false;
        }
      },
    };
  }
}

const helloWorldProjectWebViewProvider = new HelloWorldProjectWebViewFactory();

/**
 * Function to prompt for a project and open it in the hello world project web view. Registered as a
 * command handler.
 */
async function openHelloWorldProjectWebView(
  projectId: string | undefined,
): Promise<string | undefined> {
  let projectIdForWebView = projectId;
  if (!projectIdForWebView) {
    projectIdForWebView = await papi.dialogs.selectProject({
      title: 'Open Hello World Project',
      prompt: 'Choose the Hello World project to view:',
      includeProjectInterfaces: '^helloWorld$',
    });
  }
  if (!projectIdForWebView) return undefined;

  const options: HelloWorldProjectOptions = { projectId: projectIdForWebView };
  return papi.webViews.openWebView(
    helloWorldProjectWebViewProvider.webViewType,
    undefined,
    options,
  );
}

// #endregion

function selectProjectToDelete(): Promise<string | undefined> {
  return papi.dialogs.selectProject({
    includeProjectInterfaces: 'helloWorld',
    title: 'Delete Hello World Project',
    prompt: 'Please choose a project to delete:',
  });
}

interface HelloWorldProjectViewerOptions extends HelloWorldProjectOptions {
  /** The id of the web view that opened this viewer if opened from a web view */
  callerWebViewId?: string;
}

/**
 * Simple web view provider that provides helloWorld project viewer web views when papi requests
 * them
 */
const helloWorldProjectViewerProvider: IWebViewProviderWithType = {
  webViewType: 'helloWorld.projectViewer',
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: HelloWorldProjectViewerOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    // We know that the projectId (if present in the state) will be a string.
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;
    return {
      title: projectId
        ? `Hello World Project Viewer: ${
            (await (
              await papi.projectDataProviders.get('platform.base', projectId)
            ).getSetting('platform.name')) ?? projectId
          }`
        : 'Hello World Project Viewer',
      ...savedWebView,
      content: helloWorldProjectViewerWebView,
      styles: tailwindStyles,
      projectId,
      state: {
        ...savedWebView.state,
        callerWebViewId: getWebViewOptions.callerWebViewId || savedWebView.state?.callerWebViewId,
      },
    };
  },
};

/** Number of times the `helloWorld` function has been called */
let helloWorldCount = 0;
/** Emitter to inform subscribers when `helloWorld` is called */
let onHelloWorldEmitter: PlatformEventEmitter<HelloWorldEvent>;
const onHelloWorldEventType = 'helloWorld.onHelloWorld';

/**
 * Simple function to return hello world. Registered as a command handler.
 *
 * Also counts up how many times anyone has called this function and sends events notifying
 * subscribers when someone has called this function.
 */
function helloWorld() {
  helloWorldCount += 1;
  onHelloWorldEmitter?.emit({ times: helloWorldCount });
  return 'Hello world!';
}

/** Simple function to throw a customized exception. Registered as a command handler */
function helloException(message: string) {
  throw new Error(`Hello World Exception! ${message}`);
}

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.info('Hello world is activating!');

  if (!context.elevatedPrivileges.handleUri) {
    logger.warn(
      'Hello World could not get handleUri. Maybe need to add handleUri in elevatedPrivileges',
    );
  } else {
    context.registrations.add(
      context.elevatedPrivileges.handleUri.registerUriHandler(async (uri) => {
        const url = new URL(uri);
        switch (url?.pathname) {
          case '/greet':
            logger.info(`Hello, ${url.searchParams.get('name')}!`);
            break;
          case '/greetAndOpen': {
            const avatarUrl = `https://ui-avatars.com/api/?background=random&${url.searchParams}`;
            logger.info(
              `Hello, ${url.searchParams.get('name')}! Pulling up a generated avatar for you at ${avatarUrl}`,
            );
            await papi.commands.sendCommand('platform.openWindow', avatarUrl);
            break;
          }
          default:
            logger.info(`Hello World extension received a uri at an unknown path! ${uri}`);
            break;
        }
      }),
    );
    logger.info(
      `Hello world is listening to URIs. You can navigate to ${context.elevatedPrivileges.handleUri.redirectUri}/greet?name=your_name to say hello`,
    );
  }

  // test data protection
  try {
    const data = 'Hello, world!';
    const isEncryptionAvailable = await papi.dataProtection.isEncryptionAvailable();
    const dataEncrypted = await papi.dataProtection.encryptString(data);
    const dataDecrypted = await papi.dataProtection.decryptString(dataEncrypted);
    if (!isEncryptionAvailable || data === dataEncrypted || data !== dataDecrypted)
      logger.warn(
        `Hello World Data Protection test failed! data = '${data}'. dataEncrypted = '${dataEncrypted}'. dataDecrypted = '${dataDecrypted}'. isEncryptionAvailable = ${isEncryptionAvailable}`,
      );
  } catch (e) {
    logger.warn(`Hello World Data Protection test failed! ${e}`);
  }

  async function readRawDataForAllProjects(): Promise<string> {
    try {
      return await papi.storage.readUserData(context.executionToken, allProjectDataStorageKey);
    } catch {
      // No project data found or some other issue. With more important project data, we would be
      // more careful not to do something that would overwrite project data if there were an error
      return '{}';
    }
  }

  async function writeRawDataForAllProjects(data: string): Promise<void> {
    return papi.storage.writeUserData(context.executionToken, allProjectDataStorageKey, data);
  }

  const helloWorldProjectDataProviderEngineFactory = new HelloWorldProjectDataProviderEngineFactory(
    readRawDataForAllProjects,
    writeRawDataForAllProjects,
  );

  const helloWorldPdpefPromise = papi.projectDataProviders.registerProjectDataProviderEngineFactory(
    'helloWorld.helloWorldPdpf',
    HELLO_WORLD_PROJECT_INTERFACES,
    helloWorldProjectDataProviderEngineFactory,
  );

  const openHelloWorldProjectPromise = papi.commands.registerCommand(
    'helloWorld.openProject',
    openHelloWorldProjectWebView,
  );

  const createNewHelloWorldProjectPromise = papi.commands.registerCommand(
    'helloWorld.createNewProject',
    async (openWebView = true) => {
      const projectId = await helloWorldProjectDataProviderEngineFactory.createNewProject();

      if (openWebView) papi.commands.sendCommand('helloWorld.openProject', projectId);

      return projectId;
    },
  );

  const deleteHelloWorldProjectPromise = papi.commands.registerCommand(
    'helloWorld.deleteProject',
    async (projectId) => {
      const projectIdToDelete = projectId ?? (await selectProjectToDelete());

      if (!projectIdToDelete) return false;

      // TODO: close web views if this is successful (we don't currently have a way to close them or
      // to query for open ones)
      return helloWorldProjectDataProviderEngineFactory.deleteProject(projectIdToDelete);
    },
  );

  const deleteHelloWorldProjectByWebViewIdPromise = papi.commands.registerCommand(
    'helloWorld.deleteProjectByWebViewId',
    async (webViewId) => {
      let projectId: string | undefined;
      if (webViewId) {
        const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
        projectId = webViewDefinition?.projectId;
      }
      const projectIdToDelete = projectId ?? (await selectProjectToDelete());

      if (!projectIdToDelete) return false;

      // TODO: close web views if this is successful (we don't currently have a way to close them or
      // to query for open ones)
      return helloWorldProjectDataProviderEngineFactory.deleteProject(projectIdToDelete);
    },
  );

  const openHelloWorldProjectViewerByWebViewIdPromise = papi.commands.registerCommand(
    'helloWorld.openViewerByWebViewId',
    async (webViewId) => {
      let projectId: string | undefined;
      if (webViewId) {
        const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
        projectId = webViewDefinition?.projectId;
      }
      const projectIdForWebView =
        projectId ??
        (await papi.dialogs.selectProject({
          includeProjectInterfaces: 'helloWorld',
          title: 'Open Hello World Project Viewer',
          prompt: 'Please choose a project for which to open the viewer:',
        }));

      if (!projectIdForWebView) return undefined;

      const options: HelloWorldProjectViewerOptions = {
        projectId: projectIdForWebView,
        callerWebViewId: webViewId,
      };
      return papi.webViews.openWebView(
        helloWorldProjectViewerProvider.webViewType,
        { type: 'float', position: 'center', floatSize: { width: 480, height: 320 } },
        options,
      );
    },
  );

  const helloWorldPersonNamePromise = papi.settings.registerValidator(
    'helloWorld.personName',
    async (newValue) => typeof newValue === 'string',
  );

  const helloWorldHeaderSizePromise = papi.projectSettings.registerValidator(
    'helloWorld.headerSize',
    async (newValue) => typeof newValue === 'number' && Number.isInteger(newValue) && newValue > 0,
  );

  const helloWorldHeaderColorPromise = papi.projectSettings.registerValidator(
    'helloWorld.headerColor',
    async (newValue) => HTML_COLOR_NAMES.includes(newValue),
  );

  const helloWorldProjectWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    helloWorldProjectWebViewProvider.webViewType,
    helloWorldProjectWebViewProvider,
  );

  const helloWorldProjectViewerProviderPromise = papi.webViewProviders.registerWebViewProvider(
    helloWorldProjectViewerProvider.webViewType,
    helloWorldProjectViewerProvider,
  );

  const htmlWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    htmlWebViewProvider.webViewType,
    htmlWebViewProvider,
  );

  const reactWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    reactWebViewProvider.webViewType,
    reactWebViewProvider,
  );

  const reactWebView2ProviderPromise = papi.webViewProviders.registerWebViewProvider(
    reactWebView2Provider.webViewType,
    reactWebView2Provider,
  );

  onHelloWorldEmitter =
    papi.network.createNetworkEventEmitter<HelloWorldEvent>(onHelloWorldEventType);

  const helloWorldPromise = papi.commands.registerCommand('helloWorld.helloWorld', helloWorld);

  const helloExceptionPromise = papi.commands.registerCommand(
    'helloWorld.helloException',
    helloException,
  );

  papi
    .fetch('https://www.example.com')
    .catch((e) => logger.error(`Could not get data from example.com! Reason: ${e}`));

  const checkPromise = papi.commands.sendCommand(
    'platformScripture.registerCheck',
    checkDetails,
    createHelloCheck,
  );

  // Await the registration promises at the end so we don't hold everything else up
  context.registrations.add(
    await helloWorldPdpefPromise,
    await helloWorldProjectWebViewProviderPromise,
    await helloWorldProjectViewerProviderPromise,
    await openHelloWorldProjectPromise,
    await createNewHelloWorldProjectPromise,
    await deleteHelloWorldProjectPromise,
    await deleteHelloWorldProjectByWebViewIdPromise,
    await openHelloWorldProjectViewerByWebViewIdPromise,
    await helloWorldPersonNamePromise,
    await helloWorldHeaderSizePromise,
    await helloWorldHeaderColorPromise,
    await htmlWebViewProviderPromise,
    await reactWebViewProviderPromise,
    await reactWebView2ProviderPromise,
    onHelloWorldEmitter,
    await helloWorldPromise,
    await helloExceptionPromise,
    await checkPromise,
  );

  // Create webviews or get an existing webview if one already exists for this type
  // Note: here, we are using `existingId: '?'` to indicate we do not want to create a new webview
  // if one already exists. The webview that already exists could have been created by anyone
  // anywhere; it just has to match `webViewType`. See `hello-someone.ts` for an example of keeping
  // an existing webview that was specifically created by `hello-someone`.
  papi.webViews.getWebView(htmlWebViewProvider.webViewType, undefined, { existingId: '?' });
  papi.webViews.getWebView(reactWebViewProvider.webViewType, undefined, { existingId: '?' });
  papi.webViews.getWebView(reactWebView2Provider.webViewType, undefined, { existingId: '?' });

  try {
    const peopleDataProvider = await papi.dataProviders.get('helloSomeone.people');
    if (peopleDataProvider) {
      // Test subscribing to a data provider
      const unsubGreetings = await peopleDataProvider.subscribeGreeting(
        'Bill',
        (billGreeting: string | undefined) => logger.debug(`Bill's greeting: ${billGreeting}`),
      );

      context.registrations.add(unsubGreetings);
    }
  } catch (e) {
    logger.error(`Hello world error! Could not get people data provider ${e}`);
  }

  logger.info('Hello World is finished activating!');
}
