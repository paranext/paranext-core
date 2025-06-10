import papi, { logger, WebViewFactory } from '@papi/backend';
import type {
  ExecutionActivationContext,
  OpenWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import type { HelloRock3Event, HelloRock3ProjectWebViewController } from 'hello-rock3';
import { getErrorMessage, isPlatformError, PlatformEventEmitter } from 'platform-bible-utils';
import { checkDetails, createHelloCheck } from './checks';
import { HelloRock3ProjectDataProviderEngineFactory } from './models/hello-rock3-project-data-provider-engine-factory.model';
import { HELLO_ROCK3_PROJECT_INTERFACES } from './models/hello-rock3-project-data-provider-engine.model';
import tailwindStyles from './tailwind.css?inline';
import { HTML_COLOR_NAMES } from './util';
import helloRock3ReactWebView2Styles from './web-views/hello-rock3-2.web-view.scss?inline';
import helloRock3ReactWebView2 from './web-views/hello-rock3-2.web-view?inline';
import helloRock3ProjectViewerWebView from './web-views/hello-rock3-project/hello-rock3-project-viewer.web-view?inline';
import helloRock3ProjectWebViewStyles from './web-views/hello-rock3-project/hello-rock3-project.web-view.scss?inline';
import helloRock3ProjectWebView from './web-views/hello-rock3-project/hello-rock3-project.web-view?inline';
import helloRock3HtmlWebView from './web-views/hello-rock3.web-view.html?inline';
import helloRock3ReactWebViewStyles from './web-views/hello-rock3.web-view.scss?inline';
import helloRock3ReactWebView from './web-views/hello-rock3.web-view?inline';

/** User data storage key for all hello rock3 project data */
const allProjectDataStorageKey = 'allHelloRock3ProjectData';

type IWebViewProviderWithType = IWebViewProvider & { webViewType: string };

logger.info('Hello Rock3 is importing!');

// #region General Web Views for this extension

/** Simple web view provider that provides sample html web views when the PAPI requests them */
const htmlWebViewProvider: IWebViewProviderWithType = {
  webViewType: 'helloRock3.html',
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Hello Third Rock HTML',
      contentType: 'html',
      content: helloRock3HtmlWebView,
    };
  },
};

/** Simple web view provider that provides React web views when the PAPI requests them */
const reactWebViewProvider: IWebViewProviderWithType = {
  webViewType: 'helloRock3.react',
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      iconUrl: 'papi-extension://helloRock3/assets/offline.svg',
      title: 'Hello Third Rock React',
      ...savedWebView,
      content: helloRock3ReactWebView,
      styles: helloRock3ReactWebViewStyles,
      state: {
        ...savedWebView.state,
        clicks: Math.floor(Math.random() * 100),
      },
    };
  },
};

/**
 * Simple web view provider that provides another type of React web views when the PAPI requests
 * them
 */
const reactWebView2Provider: IWebViewProviderWithType = {
  webViewType: 'helloRock3.react2',
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Hello Third Rock React 2',
      content: helloRock3ReactWebView2,
      styles: helloRock3ReactWebView2Styles,
    };
  },
};

// #endregion

// #region Hello World Project Web View, commands, etc.

interface HelloRock3ProjectOptions extends OpenWebViewOptions {
  /** The project ID this viewer should focus on */
  projectId?: string;
}

const HELLO_ROCK3_PROJECT_WEB_VIEW_TYPE = 'helloRock3.projectWebView';
/** Simple web view provider that provides helloRock3 project web views when the PAPI request them */
class HelloRock3ProjectWebViewFactory extends WebViewFactory<
  typeof HELLO_ROCK3_PROJECT_WEB_VIEW_TYPE
> {
  constructor() {
    super(HELLO_ROCK3_PROJECT_WEB_VIEW_TYPE);
  }

  override async getWebViewDefinition(
    savedWebView: SavedWebViewDefinition,
    openWebViewOptions: HelloRock3ProjectOptions,
  ): Promise<WebViewDefinition | undefined> {
    const projectId = openWebViewOptions.projectId || savedWebView.projectId || undefined;
    return {
      title: projectId
        ? `Hello Third Rock Project: ${
            (await (
              await papi.projectDataProviders.get('platform.base', projectId)
            ).getSetting('platform.name')) ?? projectId
          }`
        : 'Hello Third Rock Project',
      ...savedWebView,
      content: helloRock3ProjectWebView,
      styles: helloRock3ProjectWebViewStyles,
      projectId,
    };
  }

  override async createWebViewController(
    webViewDefinition: WebViewDefinition,
    webViewNonce: string,
  ): Promise<HelloRock3ProjectWebViewController> {
    return {
      async focusName(name) {
        try {
          logger.info(
            `Hello Rock3 Project Web View Controller ${webViewDefinition.id} received request to focus ${name}`,
          );
          await papi.webViewProviders.postMessageToWebView(webViewDefinition.id, webViewNonce, {
            method: 'focusName',
            name,
          });
          return true;
        } catch (e) {
          logger.warn(
            `Hello Rock3 Project Web View Controller ${webViewDefinition.id} threw while running focusName! ${e}`,
          );
          return false;
        }
      },
    };
  }
}

const helloRock3ProjectWebViewProvider = new HelloRock3ProjectWebViewFactory();

/**
 * Function to prompt for a project and open it in the hello rock3 project web view. Registered as a
 * command handler.
 */
async function openHelloRock3ProjectWebView(
  projectId: string | undefined,
): Promise<string | undefined> {
  let projectIdForWebView = projectId;
  if (!projectIdForWebView) {
    projectIdForWebView = await papi.dialogs.selectProject({
      title: 'Open Hello Third Rock Project',
      prompt: 'Choose the Hello Third Rock project to view:',
      includeProjectInterfaces: '^helloRock3$',
    });
  }
  if (!projectIdForWebView) return undefined;

  const options: HelloRock3ProjectOptions = { projectId: projectIdForWebView };
  return papi.webViews.openWebView(
    helloRock3ProjectWebViewProvider.webViewType,
    undefined,
    options,
  );
}

// #endregion

function selectProjectToDelete(): Promise<string | undefined> {
  return papi.dialogs.selectProject({
    includeProjectInterfaces: 'helloRock3',
    title: 'Delete Hello Third Rock Project',
    prompt: 'Please choose a project to delete:',
  });
}

interface HelloRock3ProjectViewerOptions extends HelloRock3ProjectOptions {
  /** The id of the web view that opened this viewer if opened from a web view */
  callerWebViewId?: string;
}

/**
 * Simple web view provider that provides helloRock3 project viewer web views when the PAPI request
 * them
 */
const helloRock3ProjectViewerProvider: IWebViewProviderWithType = {
  webViewType: 'helloRock3.projectViewer',
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: HelloRock3ProjectViewerOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    // We know that the projectId (if present in the state) will be a string.
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;
    return {
      title: projectId
        ? `Hello Third Rock Project Viewer: ${
            (await (
              await papi.projectDataProviders.get('platform.base', projectId)
            ).getSetting('platform.name')) ?? projectId
          }`
        : 'Hello Third Rock Project Viewer',
      ...savedWebView,
      content: helloRock3ProjectViewerWebView,
      styles: tailwindStyles,
      projectId,
      state: {
        ...savedWebView.state,
        callerWebViewId: getWebViewOptions.callerWebViewId || savedWebView.state?.callerWebViewId,
      },
    };
  },
};

/** Number of times the `helloRock3` function has been called */
let helloRock3Count = 0;
/** Emitter to inform subscribers when `helloRock3` is called */
let onHelloRock3Emitter: PlatformEventEmitter<HelloRock3Event>;
const onHelloRock3EventType = 'helloRock3.onHelloRock3';

/**
 * Simple function to return `Hello Third Rock!`. Registered as a command handler.
 *
 * Also counts up how many times anyone has called this function and sends events notifying
 * subscribers when someone has called this function.
 */
function helloRock3() {
  helloRock3Count += 1;
  onHelloRock3Emitter?.emit({ times: helloRock3Count });
  return 'Hello Third Rock!';
}

/** Simple function to throw a customized exception. Registered as a command handler */
function helloRock3Exception(message: string) {
  throw new Error(`Hello Rock3 Exception! ${message}`);
}

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.info('Hello rock3 is activating!');

  if (!context.elevatedPrivileges.handleUri) {
    logger.warn(
      'Hello Rock3 could not get handleUri. Maybe need to add handleUri in elevatedPrivileges',
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
            logger.info(`Hello Rock3 extension received a uri at an unknown path! ${uri}`);
            break;
        }
      }),
    );
    logger.info(
      `Hello Rock3 is listening to URIs. You can navigate to ${context.elevatedPrivileges.handleUri.redirectUri}/greet?name=your_name to say hello`,
    );
  }

  // test data protection
  try {
    const data = 'Hello, third rock!';
    const isEncryptionAvailable = await papi.dataProtection.isEncryptionAvailable();
    const dataEncrypted = await papi.dataProtection.encryptString(data);
    const dataDecrypted = await papi.dataProtection.decryptString(dataEncrypted);
    if (!isEncryptionAvailable || data === dataEncrypted || data !== dataDecrypted)
      logger.warn(
        `Hello Rock3 Data Protection test failed! data = '${data}'. dataEncrypted = '${dataEncrypted}'. dataDecrypted = '${dataDecrypted}'. isEncryptionAvailable = ${isEncryptionAvailable}`,
      );
  } catch (e) {
    logger.warn(`Hello Rock3 Data Protection test failed! ${e}`);
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

  const helloRock3ProjectDataProviderEngineFactory = new HelloRock3ProjectDataProviderEngineFactory(
    readRawDataForAllProjects,
    writeRawDataForAllProjects,
  );

  const helloRock3PdpefPromise = papi.projectDataProviders.registerProjectDataProviderEngineFactory(
    'helloRock3.helloRock3Pdpf',
    HELLO_ROCK3_PROJECT_INTERFACES,
    helloRock3ProjectDataProviderEngineFactory,
  );

  const openHelloRock3ProjectPromise = papi.commands.registerCommand(
    'helloRock3.openProject',
    openHelloRock3ProjectWebView,
  );

  const createNewHelloRock3ProjectPromise = papi.commands.registerCommand(
    'helloRock3.createNewProject',
    async (openWebView = true) => {
      const projectId = await helloRock3ProjectDataProviderEngineFactory.createNewProject();

      if (openWebView) papi.commands.sendCommand('helloRock3.openProject', projectId);

      return projectId;
    },
  );

  const deleteHelloRock3ProjectPromise = papi.commands.registerCommand(
    'helloRock3.deleteProject',
    async (projectId) => {
      const projectIdToDelete = projectId ?? (await selectProjectToDelete());

      if (!projectIdToDelete) return false;

      // TODO: close web views if this is successful (we don't currently have a way to close them or
      // to query for open ones)
      return helloRock3ProjectDataProviderEngineFactory.deleteProject(projectIdToDelete);
    },
  );

  const deleteHelloRock3ProjectByWebViewIdPromise = papi.commands.registerCommand(
    'helloRock3.deleteProjectByWebViewId',
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
      return helloRock3ProjectDataProviderEngineFactory.deleteProject(projectIdToDelete);
    },
  );

  const openHelloRock3ProjectViewerByWebViewIdPromise = papi.commands.registerCommand(
    'helloRock3.openViewerByWebViewId',
    async (webViewId) => {
      let projectId: string | undefined;
      if (webViewId) {
        const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
        projectId = webViewDefinition?.projectId;
      }
      const projectIdForWebView =
        projectId ??
        (await papi.dialogs.selectProject({
          includeProjectInterfaces: 'helloRock3',
          title: 'Open Hello Third Rock Project Viewer',
          prompt: 'Please choose a project for which to open the viewer:',
        }));

      if (!projectIdForWebView) return undefined;

      const options: HelloRock3ProjectViewerOptions = {
        projectId: projectIdForWebView,
        callerWebViewId: webViewId,
      };
      return papi.webViews.openWebView(
        helloRock3ProjectViewerProvider.webViewType,
        { type: 'float', position: 'center', floatSize: { width: 480, height: 320 } },
        options,
      );
    },
  );

  const helloRock3PersonNamePromise = papi.settings.registerValidator(
    'helloRock3.personName',
    async (newValue) => typeof newValue === 'string',
  );

  const helloRock3HeaderSizePromise = papi.projectSettings.registerValidator(
    'helloRock3.headerSize',
    async (newValue) => typeof newValue === 'number' && Number.isInteger(newValue) && newValue > 0,
  );

  const helloRock3HeaderColorPromise = papi.projectSettings.registerValidator(
    'helloRock3.headerColor',
    async (newValue) => HTML_COLOR_NAMES.includes(newValue),
  );

  const helloRock3ProjectWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    helloRock3ProjectWebViewProvider.webViewType,
    helloRock3ProjectWebViewProvider,
  );

  const helloRock3ProjectViewerProviderPromise = papi.webViewProviders.registerWebViewProvider(
    helloRock3ProjectViewerProvider.webViewType,
    helloRock3ProjectViewerProvider,
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

  onHelloRock3Emitter =
    papi.network.createNetworkEventEmitter<HelloRock3Event>(onHelloRock3EventType);

  const helloRock3Promise = papi.commands.registerCommand('helloRock3.helloRock3', helloRock3);

  const helloExceptionPromise = papi.commands.registerCommand(
    'helloRock3.helloException',
    helloRock3Exception,
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
    await helloRock3PdpefPromise,
    await helloRock3ProjectWebViewProviderPromise,
    await helloRock3ProjectViewerProviderPromise,
    await openHelloRock3ProjectPromise,
    await createNewHelloRock3ProjectPromise,
    await deleteHelloRock3ProjectPromise,
    await deleteHelloRock3ProjectByWebViewIdPromise,
    await openHelloRock3ProjectViewerByWebViewIdPromise,
    await helloRock3PersonNamePromise,
    await helloRock3HeaderSizePromise,
    await helloRock3HeaderColorPromise,
    await htmlWebViewProviderPromise,
    await reactWebViewProviderPromise,
    await reactWebView2ProviderPromise,
    onHelloRock3Emitter,
    await helloRock3Promise,
    await helloExceptionPromise,
    await checkPromise,
  );

  // Create webviews or get an existing webview if one already exists for this type
  // Note: here, we are using `existingId: '?'` to indicate we do not want to create a new webview
  // if one already exists. The webview that already exists could have been created by anyone
  // anywhere; it just has to match `webViewType`. See `hello-someone.ts` for an example of keeping
  // an existing webview that was specifically created by `hello-someone`.
  papi.webViews.openWebView(htmlWebViewProvider.webViewType, undefined, { existingId: '?' });
  papi.webViews.openWebView(reactWebViewProvider.webViewType, undefined, { existingId: '?' });
  papi.webViews.openWebView(reactWebView2Provider.webViewType, undefined, { existingId: '?' });

  try {
    const peopleDataProvider = await papi.dataProviders.get('helloSomeone.people');
    if (peopleDataProvider) {
      // Test subscribing to a data provider
      const unsubGreetings = await peopleDataProvider.subscribeGreeting('Bill', (billGreeting) => {
        if (isPlatformError(billGreeting)) {
          logger.warn(
            `Hello rock3 main Bill's greeting subscription threw! ${getErrorMessage(billGreeting)}`,
          );
          return;
        }
        logger.debug(`Bill's greeting: ${billGreeting}`);
      });

      context.registrations.add(unsubGreetings);
    }
  } catch (e) {
    logger.error(`Hello Rock3 error! Could not get people data provider ${e}`);
  }

  logger.info('Hello Rock3 is finished activating!');
}
