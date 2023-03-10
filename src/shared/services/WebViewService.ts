/**
 * Service that handles WebView-related operations
 */

import { WebViewProps } from '@renderer/components/WebView';
import { isRenderer } from '@shared/util/InternalUtil';
import {
  aggregateUnsubscriberAsyncs,
  CommandHandler,
  Unsubscriber,
} from '@shared/util/PapiUtil';
import * as CommandService from '@shared/services/CommandService';
import { newGuid } from '@shared/util/Util';
// We need the papi here to pass it into WebViews. Don't use it anywhere else in this file
// eslint-disable-next-line import/no-cycle
import papi from '@shared/services/papi';
import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** functions to run when adding a WebView */
const addWebViewCallbacks: ((webView: WebViewProps) => void)[] = [];

/**
 * Subscribe to run an event handler when a WebView is added
 * @param eventHandler function that takes a WebView that runs when a WebView is added
 * @returns unsubscriber that stops the function from running when a WebView is added
 */
export const subscribeAddWebView = (
  eventHandler: (webView: WebViewProps) => void,
): Unsubscriber => {
  if (!isRenderer()) throw new Error('Events are not yet implemented!');
  if (!eventHandler || typeof eventHandler !== 'function')
    throw new Error(`eventHandler must be a function!`);
  addWebViewCallbacks.push(eventHandler);
  return () => {
    const eventHandlerIndex = addWebViewCallbacks.indexOf(eventHandler);
    if (eventHandlerIndex < 0) return false; // Did not find this callback

    // Remove the callback
    addWebViewCallbacks.splice(eventHandlerIndex, 1);
    return true;
  };
};

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
export const addWebView = async (webView: WebViewProps) => {
  if (!isRenderer()) {
    return CommandService.sendCommand<[WebViewProps], void>(
      'addWebView',
      webView,
    );
  }

  // Create a papi instance for this WebView
  const webViewId = newGuid();
  setWebViewPapi(webViewId, papi);

  /** String that sets up 'import' statements in the webview to pull in libraries */
  const imports = `var papi = window.parent.getWebViewPapi('${webViewId}');var React = window.parent.React;var createRoot = window.parent.createRoot;`;

  let updatedWebView: WebViewProps;
  if (webView.hasReact) {
    // Thanks to user585776 at https://stackoverflow.com/a/67359410 for temporary solution of running code from a string using data url
    // TODO: Fix so we are serving all webview content from the backend or something
    // TODO: test to see if exceptions bring Paranext down or if they still occur within the iframe
    const reactWebViewString = `${imports}${webView.contents}` as string;
    const dataUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(
      reactWebViewString,
    )}`;
    const reactWebViewModule = await import(/* webpackIgnore: true */ dataUrl);
    const reactWebViewComponent = reactWebViewModule.default;

    updatedWebView = {
      ...webView,
      contents: createElement(reactWebViewComponent, null),
    };
  } else {
    // Build the contents of the iframe
    // Add wrapping to turn a plain string into an iframe
    let webViewContents = webView.contents.includes('<html')
      ? webView.contents
      : `<html><head></head><body>${webView.contents}</body></html>`;

    // Add some script to give access to papi
    const headStart = webViewContents.indexOf('<head');
    const headEnd = webViewContents.indexOf('>', headStart);

    // Add a connection to the papi
    webViewContents = `${webViewContents.substring(0, headEnd + 1)}<script>
    ${imports}
    </script>${webViewContents.substring(headEnd + 1)}`;

    updatedWebView = { ...webView, contents: webViewContents };
  }

  // Inform web view consumers we added a web view
  addWebViewCallbacks.forEach((callback) => callback(updatedWebView));

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
