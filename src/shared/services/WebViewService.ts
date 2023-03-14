/**
 * Service that handles WebView-related operations
 */

import { WebViewProps } from '@renderer/components/WebView';
import { isRenderer } from '@shared/util/InternalUtil';
import {
  aggregateUnsubscriberAsyncs,
  CommandHandler,
} from '@shared/util/PapiUtil';
import * as CommandService from '@shared/services/CommandService';
import { newGuid } from '@shared/util/Util';
// We need the papi here to pass it into WebViews. Don't use it anywhere else in this file
// eslint-disable-next-line import/no-cycle
import papi from '@shared/services/papi';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createNetworkEventEmitter } from '@shared/services/NetworkService';
import {
  WebViewContents,
  WebViewContentsReact,
  WebViewContentType,
} from '@shared/data/WebViewTypes';

/** Event emitted when webViews are added */
export type AddWebViewEvent = {
  webView: WebViewProps;
};

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Emitter for when a webview is added */
const onDidAddWebViewEmitter = createNetworkEventEmitter<AddWebViewEvent>(
  'webView:onDidAddWebView',
);
/** Event that emits with webView info when a webView is added */
export const onDidAddWebView = onDidAddWebViewEmitter.event;

// #region Renderer-only stuff

/** Map of WebView id to its corresponding papi instance */
const webViewPapis = new Map<string, typeof papi>();
/**
 * Sets a papi instance associated with the specified WebView.
 * @param webViewId id for the WebView whose papi to set
 * @param webViewPapi papi for the webView in question
 */
const setWebViewPapi = (webViewId: string, webViewPapi: typeof papi) =>
  webViewPapis.set(webViewId, webViewPapi);
/**
 * Gets the papi instance associated with the specified WebView. Can only be run once per WebView so other WebViews don't try to access
 * @param webViewId id for the webView whose papi to get
 * @returns papi for the webView in question
 */
const getWebViewPapi = (webViewId: string) => {
  const webViewPapi = webViewPapis.get(webViewId);
  if (!webViewPapi)
    throw new Error(`Cannot find papi for WebView with id ${webViewId}`);

  webViewPapis.delete(webViewId);
  return webViewPapi;
};

// TODO: Hacking in React, createRoot, and getWebViewPapi onto window for now so webViews can access it. Make this TypeScript-y
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).getWebViewPapi = getWebViewPapi;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).createRoot = createRoot;

// #endregion

/**
 * Adds a WebView and runs all event handlers who are listening to this event
 * @param webView full html document to set as the webview iframe contents. Can be shortened to just a string
 * @returns promise that resolves nothing if we successfully handled the webView
 */
export const addWebView = async (webView: WebViewContents) => {
  if (!isRenderer()) {
    return CommandService.sendCommand<[WebViewContents], void>(
      'addWebView',
      webView,
    );
  }

  // Create a papi instance for this WebView
  const webViewId = newGuid();
  setWebViewPapi(webViewId, papi);

  // WebView.contentType is assumed to be React by default. Extensions can specify otherwise
  const contentType = webView.contentType
    ? webView.contentType
    : WebViewContentType.React;

  /** String that sets up 'import' statements in the webview to pull in libraries and clear out internet access and such */
  const imports = `
  var papi = window.parent.getWebViewPapi('${webViewId}');
  var React = window.parent.React;
  var createRoot = window.parent.createRoot;
  delete window.parent;
  delete window.top;
  delete window.frameElement;
  delete window.fetch;
  delete window.XMLHttpRequest;
  delete window.WebSocket;
  delete window.Image;
  `;

  // Build the contents of the iframe
  let webViewContents: string;
  switch (contentType) {
    case WebViewContentType.HTML:
      // Add wrapping to turn a plain string into an iframe
      webViewContents = webView.contents.includes('<html')
        ? webView.contents
        : `<html><head></head><body>${webView.contents}</body></html>`;
      break;
    default: {
      const reactWebView = webView as WebViewContentsReact;
      // Add the component as a script
      webViewContents = `
        <html>
          <head>
          </head>
          <body>
            <div id="root">
            </div>
            <script>
              ${reactWebView.contents}

              function initializeReact() {
                const container = document.getElementById('root');
                const root = createRoot(container);
                root.render(React.createElement(${reactWebView.componentName}, null));
              }

              if (document.readyState === 'loading')
                document.addEventListener('DOMContentLoaded', initializeReact);
              else initializeReact();
            </script>
          </body>
        </html>`;
      break;
    }
  }

  // Add a script at the start of the head to give access to papi
  const headStart = webViewContents.indexOf('<head');
  const headEnd = webViewContents.indexOf('>', headStart);

  // Inject the import scripts into the html
  webViewContents = `${webViewContents.substring(0, headEnd + 1)}<script>
    ${imports}
    </script>${webViewContents.substring(headEnd + 1)}`;

  const updatedWebView: WebViewProps = {
    ...webView,
    contents: webViewContents,
  };
  // Inform web view consumers we added a web view
  onDidAddWebViewEmitter.emit({ webView: updatedWebView });

  // Resolve this promise
  return undefined;
};

/** Commands that this process will handle if it is the renderer. Registered automatically at initialization */
const rendererCommandFunctions: { [commandName: string]: CommandHandler } = {
  addWebView,
};

/** Sets up the WebViewService. Runs only once */
export const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // Set up subscriptions that the service needs to work

    // Register built-in commands
    if (isRenderer()) {
      // TODO: make a registerRequestHandlers function that we use here and in NetworkService.initialize?
      const unsubPromises = Object.entries(rendererCommandFunctions).map(
        ([commandName, handler]) =>
          CommandService.registerCommand(commandName, handler),
      );

      const unsubscribeCommands = aggregateUnsubscriberAsyncs(
        unsubPromises.map(({ unsubscriber }) => unsubscriber),
      );

      // Wait to successfully register all commands
      await Promise.all(unsubPromises.map(({ promise }) => promise));

      // On closing, try to remove command listeners
      // TODO: should do this on the server when the connection closes or when the server exists as well
      if (isRenderer())
        window.addEventListener('beforeunload', async () => {
          await unsubscribeCommands();
        });
    }

    isInitialized = true;
  })();

  return initializePromise;
};
