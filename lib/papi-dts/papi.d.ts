/// <reference types="react" />
/// <reference types="node" />
/// <reference types="node" />
declare module 'shared/models/web-view.model' {
  import { Dispatch, SetStateAction } from 'react';
  /** The type of code that defines a webview's content */
  export enum WebViewContentType {
    /**
     * This webview is a React webview. It must specify its component by setting it to
     * `globalThis.webViewComponent`
     */
    React = 'react',
    /** This webview is a raw HTML/JS/CSS webview. */
    HTML = 'html',
    /**
     * This webview's content is fetched from the url specified (iframe `src` attribute). Note that
     * webViews of this type cannot access the `papi` because they cannot be on the same origin as the
     * parent window.
     */
    URL = 'url',
  }
  /** What type a WebView is. Each WebView definition must have a unique type. */
  export type WebViewType = string;
  /** ID for a specific WebView. Each WebView has a unique ID */
  export type WebViewId = string;
  /** Base WebView properties that all WebViews share */
  type WebViewDefinitionBase = {
    /** What type of WebView this is. Unique to all other WebView definitions */
    webViewType: WebViewType;
    /** Unique ID among webviews specific to this webview instance. */
    id: WebViewId;
    /** The code for the WebView that papi puts into an iframe */
    content: string;
    /**
     * Url of image to show on the title bar of the tab
     *
     * Defaults to Platform.Bible logo
     */
    iconUrl?: string;
    /** Name of the tab for the WebView */
    title?: string;
    /** Tooltip that is shown when hovering over the webview title */
    tooltip?: string;
    /** General object to store unique state for this webview */
    state?: Record<string, unknown>;
    /**
     * Whether to allow the WebView iframe to interact with its parent as a same-origin website.
     * Setting this to true adds `allow-same-origin` to the WebView iframe's [sandbox attribute]
     * (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox). Defaults to
     * `true`.
     *
     * Setting this to false on an HTML or React WebView prevents the iframe from importing the `papi`
     * and such and also prevents others from accessing its document. This could be useful when you
     * need secure input from the user because other WebViews may be able to attach event listeners to
     * your inputs if you are on the same origin. Setting this to `false` on HTML or React WebViews is
     * a big security win, but it makes interacting with the platform more challenging in some ways.
     *
     * Setting this to false on a URL WebView prevents the iframe from accessing same-origin features
     * on its host website like storage APIs (localstorage, cookies, etc) and such. This will likely
     * break many websites.
     *
     * It is best practice to set this to `false` where possible.
     *
     * Note: Until we have a message-passing API for WebViews, there is currently no way to interact
     * with the platform via a WebView with `allowSameOrigin: false`.
     *
     * WARNING: If your WebView accepts secure user input like passwords on HTML or React WebViews,
     * you MUST set this to `false` or you will risk exposing that secure input to other extensions
     * who could be phishing for it.
     */
    allowSameOrigin?: boolean;
    /**
     * Whether to allow scripts to run in this iframe. Setting this to true adds `allow-scripts` to
     * the WebView iframe's [sandbox attribute]
     * (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox). Defaults to `true`
     * for HTML and React WebViews and `false` for URL WebViews
     *
     * WARNING: Setting this to `true` increases the possibility of a security threat occurring. If it
     * is not necessary to run scripts in your WebView, you should set this to `false` to reduce
     * risk.
     */
    allowScripts?: boolean;
    /**
     * **For HTML and React WebViews:** List of [Host or scheme
     * values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#hosts_values)
     * to include in the [`frame-src`
     * directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src)
     * for this WebView's iframe content-security-policy. This allows iframes with `src` attributes
     * matching these host values to be loaded in your WebView. You can only specify values starting
     * with `papi-extension:` and `https:`; any others are ignored. Specifying urls in this array
     * whitelists those urls so you can embed iframes with those urls as the `src` attribute. By
     * default, no urls are available to be iframes. If you want to embed iframes with the `src`
     * attribute in your webview, you must include them in this property.
     *
     * For example, if you specify `allowFrameSources: ['https://example.com/']`, you will be able to
     * embed iframes with urls starting with `papi-extension:` and on the same host as
     * `https://example.com/`
     *
     * If you plan on embedding any iframes in your WebView, it is best practice to list only the host
     * values you need to function. The more you list, the higher the theoretical security risks.
     *
     *     ---
     *
     * **For URL WebViews:** List of strings representing RegExp patterns (passed into [the RegExp
     * constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp))
     * to match against the `content` url specified (using the
     * [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
     * function) to determine whether this iframe will be allowed to load. Specifying urls in this
     * array is essentially a security check to make sure the url you pass is one of the urls you
     * intend it to be. By default, the url you specify in `content` will be accepted (you do not have
     * to specify this unless you want to, but it is recommended in some scenarios).
     *
     * Note: URL WebViews must have `papi-extension:` or `https:` urls. This property does not
     * override that requirement.
     *
     * For example, if you specify `allowFrameSources: ['^papi-extension:',
     * '^https://example\\.com.*']`, only `papi-extension:` and `https://example.com` urls will be
     * accepted.
     *
     * If your WebView url is a `const` string and cannot change for any reason, you do not need to
     * specify this property. However, if your WebView url is dynamic and can change in any way, it is
     * best practice to specify this property and to list only the urls you need for your URL WebView
     * to function. The more you list, the higher the theoretical security risks.
     */
    allowedFrameSources?: string[];
  };
  /** WebView representation using React */
  export type WebViewDefinitionReact = WebViewDefinitionBase & {
    /** Indicates this WebView uses React */
    contentType?: WebViewContentType.React;
    /** String of styles to be loaded into the iframe for this WebView */
    styles?: string;
  };
  /** WebView representation using HTML */
  export type WebViewDefinitionHtml = WebViewDefinitionBase & {
    /** Indicates this WebView uses HTML */
    contentType: WebViewContentType.HTML;
  };
  /**
   * WebView representation using a URL.
   *
   * Note: you can only use `papi-extension:` and `https:` urls
   */
  export type WebViewDefinitionURL = WebViewDefinitionBase & {
    /** Indicates this WebView uses a URL */
    contentType: WebViewContentType.URL;
  };
  /** Properties defining a type of WebView created by extensions to show web content */
  export type WebViewDefinition =
    | WebViewDefinitionReact
    | WebViewDefinitionHtml
    | WebViewDefinitionURL;
  /**
   * Saved WebView information that does not contain the actual content of the WebView. Saved into
   * layouts. Could have as little as the type and ID. WebView providers load these into actual
   * {@link WebViewDefinition}s and verify any existing properties on the WebViews.
   */
  export type SavedWebViewDefinition = (
    | Partial<Omit<WebViewDefinitionReact, 'content' | 'styles' | 'allowScripts'>>
    | Partial<Omit<WebViewDefinitionHtml, 'content' | 'allowScripts'>>
    | Partial<Omit<WebViewDefinitionURL, 'content' | 'allowScripts'>>
  ) &
    Pick<WebViewDefinitionBase, 'id' | 'webViewType'>;
  /** The properties on a WebViewDefinition that may be updated when that webview is already displayed */
  export type WebViewDefinitionUpdatableProperties = Pick<
    WebViewDefinitionBase,
    'iconUrl' | 'title' | 'tooltip'
  >;
  /**
   * WebViewDefinition properties for updating a WebView that is already displayed. Any unspecified
   * properties will stay the same
   */
  export type WebViewDefinitionUpdateInfo = Partial<WebViewDefinitionUpdatableProperties>;
  /**
   *
   * A React hook for working with a state object tied to a webview. Returns a WebView state value and
   * a function to set it. Use similarly to `useState`.
   *
   * Only used in WebView iframes.
   *
   * _＠param_ `stateKey` Key of the state value to use. The webview state holds a unique value per
   * key.
   *
   * NOTE: `stateKey` needs to be a constant string, not something that could change during execution.
   *
   * _＠param_ `defaultStateValue` Value to use if the web view state didn't contain a value for the
   * given 'stateKey'
   *
   * _＠returns_ `[stateValue, setStateValue]`
   *
   * - `stateValue`: the current value for the web view state at the key specified or
   *   `defaultStateValue` if a state was not found
   * - `setStateValue`: function to use to update the web view state value at the key specified
   *
   * _＠example_
   *
   * ```typescript
   * const [lastPersonSeen, setLastPersonSeen] = useWebViewState('lastSeen', 'No one');
   * ```
   */
  export type UseWebViewStateHook = <T>(
    stateKey: string,
    defaultStateValue: NonNullable<T>,
  ) => [webViewState: NonNullable<T>, setWebViewState: Dispatch<SetStateAction<NonNullable<T>>>];
  /**
   *
   * Gets the updatable properties on this WebView's WebView definition
   *
   * _＠returns_ updatable properties this WebView's WebView definition or undefined if not found for
   * some reason
   */
  export type GetWebViewDefinitionUpdatableProperties = () =>
    | WebViewDefinitionUpdatableProperties
    | undefined;
  /**
   *
   * Updates this WebView with the specified properties
   *
   * _＠param_ `updateInfo` properties to update on the WebView. Any unspecified properties will stay
   * the same
   *
   * _＠returns_ true if successfully found the WebView to update; false otherwise
   *
   * _＠example_
   *
   * ```typescript
   * updateWebViewDefinition({ title: `Hello ${name}` });
   * ```
   */
  export type UpdateWebViewDefinition = (updateInfo: WebViewDefinitionUpdateInfo) => boolean;
  /** Props that are passed into the web view itself inside the iframe in the web view tab component */
  export type WebViewProps = {
    /**
     *
     * A React hook for working with a state object tied to a webview. Returns a WebView state value and
     * a function to set it. Use similarly to `useState`.
     *
     * Only used in WebView iframes.
     *
     * _＠param_ `stateKey` Key of the state value to use. The webview state holds a unique value per
     * key.
     *
     * NOTE: `stateKey` needs to be a constant string, not something that could change during execution.
     *
     * _＠param_ `defaultStateValue` Value to use if the web view state didn't contain a value for the
     * given 'stateKey'
     *
     * _＠returns_ `[stateValue, setStateValue]`
     *
     * - `stateValue`: the current value for the web view state at the key specified or
     *   `defaultStateValue` if a state was not found
     * - `setStateValue`: function to use to update the web view state value at the key specified
     *
     * _＠example_
     *
     * ```typescript
     * const [lastPersonSeen, setLastPersonSeen] = useWebViewState('lastSeen', 'No one');
     * ```
     */
    useWebViewState: UseWebViewStateHook;
    /**
     *
     * Gets the updatable properties on this WebView's WebView definition
     *
     * _＠returns_ updatable properties this WebView's WebView definition or undefined if not found for
     * some reason
     */
    getWebViewDefinitionUpdatableProperties: GetWebViewDefinitionUpdatableProperties;
    /**
     *
     * Updates this WebView with the specified properties
     *
     * _＠param_ `updateInfo` properties to update on the WebView. Any unspecified properties will stay
     * the same
     *
     * _＠returns_ true if successfully found the WebView to update; false otherwise
     *
     * _＠example_
     *
     * ```typescript
     * updateWebViewDefinition({ title: `Hello ${name}` });
     * ```
     */
    updateWebViewDefinition: UpdateWebViewDefinition;
  };
  /** Options that affect what `webViews.getWebView` does */
  export type GetWebViewOptions = {
    /**
     * If provided and if a web view with this ID exists, requests from the web view provider an
     * existing WebView with this ID if one exists. The web view provider can deny the request if it
     * chooses to do so.
     *
     * Alternatively, set this to '?' to attempt to find any existing web view with the specified
     * webViewType.
     *
     * Note: setting `existingId` to `undefined` counts as providing in this case (providing is tested
     * with `'existingId' in options`, not just testing if `existingId` is truthy). Not providing an
     * `existingId` at all is the only way to specify we are not looking for an existing webView
     */
    existingId?: string | '?' | undefined;
    /**
     * Whether to create a webview with a new ID and a webview with ID `existingId` was not found.
     * Only relevant if `existingId` is provided. If `existingId` is not provided, this property is
     * ignored.
     *
     * Defaults to true
     */
    createNewIfNotFound?: boolean;
  };
}
declare module 'shared/global-this.model' {
  import { LogLevel } from 'electron-log';
  import { FunctionComponent } from 'react';
  import {
    GetWebViewDefinitionUpdatableProperties,
    UpdateWebViewDefinition,
    UseWebViewStateHook,
    WebViewDefinitionUpdatableProperties,
    WebViewDefinitionUpdateInfo,
    WebViewProps,
  } from 'shared/models/web-view.model';
  /**
   * Variables that are defined in global scope. These must be defined in main.ts (main), index.ts
   * (renderer), and extension-host.ts (extension host)
   */
  global {
    /** Type of process this is. Helps with running specific code based on which process you're in */
    var processType: ProcessType;
    /** Whether this process is packaged or running from sources */
    var isPackaged: boolean;
    /**
     * Path to the app's resources directory. This is a string representation of the resources uri on
     * frontend
     */
    var resourcesPath: string;
    /** How much logging should be recorded. Defaults to 'debug' if not packaged, 'info' if packaged */
    var logLevel: LogLevel;
    /**
     * A function that each React WebView extension must provide for Paranext to display it. Only used
     * in WebView iframes.
     */
    var webViewComponent: FunctionComponent<WebViewProps>;
    /**
     *
     * A React hook for working with a state object tied to a webview. Returns a WebView state value and
     * a function to set it. Use similarly to `useState`.
     *
     * Only used in WebView iframes.
     *
     * _＠param_ `stateKey` Key of the state value to use. The webview state holds a unique value per
     * key.
     *
     * NOTE: `stateKey` needs to be a constant string, not something that could change during execution.
     *
     * _＠param_ `defaultStateValue` Value to use if the web view state didn't contain a value for the
     * given 'stateKey'
     *
     * _＠returns_ `[stateValue, setStateValue]`
     *
     * - `stateValue`: the current value for the web view state at the key specified or
     *   `defaultStateValue` if a state was not found
     * - `setStateValue`: function to use to update the web view state value at the key specified
     *
     * _＠example_
     *
     * ```typescript
     * const [lastPersonSeen, setLastPersonSeen] = useWebViewState('lastSeen', 'No one');
     * ```
     */
    var useWebViewState: UseWebViewStateHook;
    /** Retrieve the value from web view state with the given 'stateKey', if it exists. */
    var getWebViewState: <T>(stateKey: string) => T | undefined;
    /** Set the value for a given key in the web view state. */
    var setWebViewState: <T>(stateKey: string, stateValue: NonNullable<T>) => void;
    var getWebViewDefinitionUpdatablePropertiesById: (
      webViewId: string,
    ) => WebViewDefinitionUpdatableProperties | undefined;
    var updateWebViewDefinitionById: (
      webViewId: string,
      webViewDefinitionUpdateInfo: WebViewDefinitionUpdateInfo,
    ) => boolean;
    /**
     *
     * Gets the updatable properties on this WebView's WebView definition
     *
     * _＠returns_ updatable properties this WebView's WebView definition or undefined if not found for
     * some reason
     */
    var getWebViewDefinitionUpdatableProperties: GetWebViewDefinitionUpdatableProperties;
    /**
     *
     * Updates this WebView with the specified properties
     *
     * _＠param_ `updateInfo` properties to update on the WebView. Any unspecified properties will stay
     * the same
     *
     * _＠returns_ true if successfully found the WebView to update; false otherwise
     *
     * _＠example_
     *
     * ```typescript
     * updateWebViewDefinition({ title: `Hello ${name}` });
     * ```
     */
    var updateWebViewDefinition: UpdateWebViewDefinition;
  }
  /** Type of Paranext process */
  export enum ProcessType {
    Main = 'main',
    Renderer = 'renderer',
    ExtensionHost = 'extension-host',
  }
}
declare module 'shared/utils/internal-util' {
  /** Utility functions specific to the internal technologies we are using. */
  import { ProcessType } from 'shared/global-this.model';
  /**
   * Determine if running on a client process (renderer, extension-host) or on the server.
   *
   * @returns Returns true if running on a client, false otherwise
   */
  export const isClient: () => boolean;
  /**
   * Determine if running on the server process (main)
   *
   * @returns Returns true if running on the server, false otherwise
   */
  export const isServer: () => boolean;
  /**
   * Determine if running on the renderer process
   *
   * @returns Returns true if running on the renderer, false otherwise
   */
  export const isRenderer: () => boolean;
  /**
   * Determine if running on the extension host
   *
   * @returns Returns true if running on the extension host, false otherwise
   */
  export const isExtensionHost: () => boolean;
  /**
   * Gets which kind of process this is (main, renderer, extension-host)
   *
   * @returns ProcessType for this process
   */
  export const getProcessType: () => ProcessType;
}
declare module 'shared/services/logger.service' {
  import log from 'electron-log';
  export const WARN_TAG = '<WARN>';
  /**
   * Format a string of a service message
   *
   * @param message Message from the service
   * @param serviceName Name of the service to show in the log
   * @param tag Optional tag at the end of the service name
   * @returns Formatted string of a service message
   */
  export function formatLog(message: string, serviceName: string, tag?: string): string;
  /**
   *
   * All extensions and services should use this logger to provide a unified output of logs
   */
  const logger: log.MainLogger & {
    default: log.MainLogger;
  };
  export default logger;
}
declare module 'shared/utils/util' {
  export function newGuid(): string;
  /**
   * Create a nonce that is at least 128 bits long and should be (is not currently) cryptographically
   * random. See nonce spec at https://w3c.github.io/webappsec-csp/#security-nonces
   *
   * WARNING: THIS IS NOT CURRENTLY CRYPTOGRAPHICALLY SECURE! TODO: Make this cryptographically
   * random! Use some polymorphic library that works in all contexts?
   * https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues only works in browser
   */
  export function newNonce(): string;
  /**
   * Determine whether the object is a string
   *
   * @param o Object to determine if it is a string
   * @returns True if the object is a string; false otherwise
   */
  export function isString(o: unknown): o is string;
  /**
   * Get a function that reduces calls to the function passed in
   *
   * @param fn The function to debounce
   * @param delay How much delay in milliseconds after the most recent call to the debounced function
   *   to call the function
   * @returns Function that, when called, only calls the function passed in at maximum every delay ms
   */
  export function debounce<T extends (...args: any[]) => void>(fn: T, delay?: number): T;
  /**
   * Groups each item in the array of items into a map according to the keySelector
   *
   * @param items Array of items to group by
   * @param keySelector Function to run on each item to get the key for the group to which it belongs
   * @param valueSelector Function to run on each item to get the value it should have in the group
   *   (like map function). If not provided, uses the item itself
   * @returns Map of keys to groups of values corresponding to each item
   */
  export function groupBy<T, K>(items: T[], keySelector: (item: T) => K): Map<K, Array<T>>;
  export function groupBy<T, K, V>(
    items: T[],
    keySelector: (item: T) => K,
    valueSelector: (item: T, key: K) => V,
  ): Map<K, Array<V>>;
  /**
   * Function to get an error message from the object (useful for getting error message in a catch
   * block)
   *
   * @example `try {...} catch (e) { logger.info(getErrorMessage(e)) }`
   *
   * @param error Error object whose message to get
   * @returns Message of the error - if object has message, returns message. Otherwise tries to
   *   stringify
   */
  export function getErrorMessage(error: unknown): string;
  /** Asynchronously waits for the specified number of milliseconds. (wraps setTimeout in a promise) */
  export function wait(ms: number): Promise<void>;
  /**
   * Runs the specified function and will timeout if it takes longer than the specified wait time
   *
   * @param fn The function to run
   * @param maxWaitTimeInMS The maximum amount of time to wait for the function to resolve
   * @returns Promise that resolves to the resolved value of the function or undefined if it ran
   *   longer than the specified wait time
   */
  export function waitForDuration<TResult>(
    fn: () => Promise<TResult>,
    maxWaitTimeInMS: number,
  ): Promise<Awaited<TResult> | undefined>;
  /**
   * Get all functions on an object and its prototype chain (so we don't miss any class methods or any
   * object methods). Note that the functions on the final item in the prototype chain (i.e., Object)
   * are skipped to avoid including functions like `__defineGetter__`, `__defineSetter__`, `toString`,
   * etc.
   *
   * @param obj Object whose functions to get
   * @param objId Optional ID of the object to use for debug logging
   * @returns Array of all function names on an object
   */
  export function getAllObjectFunctionNames(
    obj: {
      [property: string]: unknown;
    },
    objId?: string,
  ): Set<string>;
}
declare module 'shared/utils/papi-util' {
  import { ProcessType } from 'shared/global-this.model';
  /** Function to run to dispose of something. Returns true if successfully unsubscribed */
  export type Unsubscriber = () => boolean;
  /**
   * Returns an Unsubscriber function that combines all the unsubscribers passed in.
   *
   * @param unsubscribers All unsubscribers to aggregate into one unsubscriber
   * @returns Function that unsubscribes from all passed in unsubscribers when run
   */
  export const aggregateUnsubscribers: (unsubscribers: Unsubscriber[]) => Unsubscriber;
  /**
   * Function to run to dispose of something that runs asynchronously. The promise resolves to true if
   * successfully unsubscribed
   */
  export type UnsubscriberAsync = () => Promise<boolean>;
  /**
   * Returns an UnsubscriberAsync function that combines all the unsubscribers passed in.
   *
   * @param unsubscribers - All unsubscribers to aggregate into one unsubscriber.
   * @returns Function that unsubscribes from all passed in unsubscribers when run
   */
  export const aggregateUnsubscriberAsyncs: (
    unsubscribers: (UnsubscriberAsync | Unsubscriber)[],
  ) => UnsubscriberAsync;
  /**
   * Creates a safe version of a register function that returns a Promise<UnsubscriberAsync>.
   *
   * @param unsafeRegisterFn Function that does some kind of async registration and returns an
   *   unsubscriber and a promise that resolves when the registration is finished
   * @param isInitialized Whether the service associated with this safe UnsubscriberAsync function is
   *   initialized
   * @param initialize Promise that resolves when the service is finished initializing
   * @returns Safe version of an unsafe function that returns a promise to an UnsubscriberAsync
   *   (meaning it will wait to register until the service is initialized)
   */
  export const createSafeRegisterFn: <TParam extends unknown[]>(
    unsafeRegisterFn: (...args: TParam) => Promise<UnsubscriberAsync>,
    isInitialized: boolean,
    initialize: () => Promise<void>,
  ) => (...args: TParam) => Promise<UnsubscriberAsync>;
  /**
   * Type of object passed to a complex request handler that provides information about the request.
   * This type is used as the public-facing interface for requests
   */
  export type ComplexRequest<TParam = unknown> = {
    /** The one who sent the request */
    senderId: number;
    contents: TParam;
  };
  type ComplexResponseSuccess<TReturn = unknown> = {
    /** Whether the handler that created this response was successful in handling the request */
    success: true;
    /**
     * Content with which to respond to the request. Must be provided unless the response failed or
     * TReturn is undefined
     */
    contents: TReturn;
  };
  type ComplexResponseFailure = {
    /** Whether the handler that created this response was successful in handling the request */
    success: false;
    /**
     * Content with which to respond to the request. Must be provided unless the response failed or
     * TReturn is undefined Removed from failure so we do not change the type of contents for type
     * safety. We could add errorContents one day if we really need it
     */
    /** Error explaining the problem that is only populated if success is false */
    errorMessage: string;
  };
  /**
   * Type of object to create when handling a complex request where you desire to provide additional
   * information beyond the contents of the response This type is used as the public-facing interface
   * for responses
   */
  export type ComplexResponse<TReturn = unknown> =
    | ComplexResponseSuccess<TReturn>
    | ComplexResponseFailure;
  /** Type of request handler - indicates what type of parameters and what return type the handler has */
  export enum RequestHandlerType {
    Args = 'args',
    Contents = 'contents',
    Complex = 'complex',
  }
  /**
   * Check that two objects are deeply equal, comparing members of each object and such
   *
   * @param a The first object to compare
   * @param b The second object to compare
   *
   *   WARNING: Objects like arrays from different iframes have different constructor function
   *   references even if they do the same thing, so this deep equality comparison fails objects that
   *   look the same but have different constructors because different constructors could produce
   *   false positives in [a few specific
   *   situations](https://github.com/planttheidea/fast-equals/blob/a41afc0a240ad5a472e47b53791e9be017f52281/src/comparator.ts#L96).
   *   This means that two objects like arrays from different iframes that look the same will fail
   *   this check. Please use some other means to check deep equality in those situations.
   *
   *   Note: This deep equality check considers `undefined` values on keys of objects NOT to be equal to
   *   not specifying the key at all. For example, `{ stuff: 3, things: undefined }` and `{ stuff: 3
   *   }` are not considered equal in this case
   *
   *   - For more information and examples, see [this
   *       CodeSandbox](https://codesandbox.io/s/deepequallibrarycomparison-4g4kk4?file=/src/index.mjs).
   *
   * @returns True if a and b are deeply equal; false otherwise
   */
  export function deepEqual(a: unknown, b: unknown): boolean;
  /**
   * Converts a JavaScript value to a JSON string, changing `undefined` properties to `null`
   * properties in the JSON string.
   *
   * WARNING: `null` and `undefined` values are treated as the same thing by this function and will be
   * dropped when passed to {@link deserialize}. For example, `{ a: 1, b: undefined, c: null }` will
   * become `{ a: 1 }` after passing through {@link serialize} then {@link deserialize}. If you are
   * passing around user data that needs to retain `null` and/or `undefined` values, you should wrap
   * them yourself in a string before using this function. Alternatively, you can write your own
   * replacer that will preserve `null` and `undefined` values in a way that a custom reviver will
   * understand when deserializing.
   *
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer A function that transforms the results. Note that all `null` and `undefined`
   *   values returned by the replacer will be further transformed into a moniker that deserializes
   *   into `undefined`.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON
   *   text to make it easier to read. See the `space` parameter of `JSON.stringify` for more
   *   details.
   */
  export function serialize(
    value: unknown,
    replacer?: (this: unknown, key: string, value: unknown) => unknown,
    space?: string | number,
  ): string;
  /**
   * Converts a JSON string into a value.
   *
   * WARNING: `null` and `undefined` values that were serialized by {@link serialize} will both be made
   * into `undefined` values by this function. If those values are properties of objects, those
   * properties will simply be dropped. For example, `{ a: 1, b: undefined, c: null }` will become `{
   * a: 1 }` after passing through {@link serialize} then {@link deserialize}. If you are passing around
   * user data that needs to retain `null` and/or `undefined` values, you should wrap them yourself in
   * a string before using this function. Alternatively, you can write your own reviver that will
   * preserve `null` and `undefined` values in a way that a custom replacer will encode when
   * serializing.
   *
   * @param text A valid JSON string.
   * @param reviver A function that transforms the results. This function is called for each member of
   *   the object. If a member contains nested objects, the nested objects are transformed before the
   *   parent object is.
   */
  export function deserialize(
    value: string,
    reviver?: (this: unknown, key: string, value: unknown) => unknown,
  ): any;
  /**
   * Check to see if the value is serializable without losing information
   *
   * @param value Value to test
   * @returns True if serializable; false otherwise
   *
   *   Note: the values `undefined` and `null` are serializable (on their own or in an array), but
   *   `undefined` and `null` properties of objects are dropped when serializing/deserializing. That
   *   means `undefined` and `null` properties on a value passed in will cause it to fail.
   *
   *   WARNING: This is inefficient right now as it stringifies, parses, stringifies, and === the value.
   *   Please only use this if you need to
   *
   *   DISCLAIMER: this does not successfully detect that values are not serializable in some cases:
   *
   *   - Losses of removed properties like functions and `Map`s
   *   - Class instances (not deserializable into class instances without special code)
   *
   *   We intend to improve this in the future if it becomes important to do so. See [`JSON.stringify`
   *   documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)
   *   for more information.
   */
  export function isSerializable(value: unknown): boolean;
  /** Separator between parts of a serialized request */
  const REQUEST_TYPE_SEPARATOR = ':';
  /** Information about a request that tells us what to do with it */
  export type RequestType = {
    /** The general category of request */
    category: string;
    /** Specific identifier for this type of request */
    directive: string;
  };
  /**
   * String version of a request type that tells us what to do with a request.
   *
   * Consists of two strings concatenated by a colon
   */
  export type SerializedRequestType = `${string}${typeof REQUEST_TYPE_SEPARATOR}${string}`;
  /**
   * Create a request message requestType string from a category and a directive
   *
   * @param category The general category of request
   * @param directive Specific identifier for this type of request
   * @returns Full requestType for use in network calls
   */
  export function serializeRequestType(category: string, directive: string): SerializedRequestType;
  /** Split a request message requestType string into its parts */
  export function deserializeRequestType(requestType: SerializedRequestType): RequestType;
  /**
   * HTML Encodes the provided string. Thanks to ChatGPT
   *
   * @param str String to HTML encode
   * @returns HTML-encoded string
   */
  export const htmlEncode: (str: string) => string;
  /**
   * Modules that someone might try to require in their extensions that we have similar apis for. When
   * an extension requires these modules, an error throws that lets them know about our similar api.
   */
  export const MODULE_SIMILAR_APIS: Readonly<{
    [moduleName: string]:
      | string
      | {
          [process in ProcessType | 'default']?: string;
        }
      | undefined;
  }>;
  /**
   * Get a message that says the module import was rejected and to try a similar api if available.
   *
   * @param moduleName Name of `require`d module that was rejected
   * @returns String that says the import was rejected and a similar api to try
   */
  export function getModuleSimilarApiMessage(moduleName: string): string;
  /**
   *
   * PapiUtil is a collection of functions, objects, and types that are used as helpers in other
   * services. Extensions should not use or rely on anything in papiUtil unless some other service
   * requires it.
   */
  export type moduleSummaryComments = {};
}
declare module 'shared/models/papi-event.model' {
  import { Unsubscriber, UnsubscriberAsync } from 'shared/utils/papi-util';
  /** Callback function that accepts an event and should run when an event is emitted */
  export type PapiEventHandler<T> = (event: T) => void;
  /**
   * Function that subscribes the provided callback to run when this event is emitted.
   *
   * @param callback Function to run with the event when it is emitted
   * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
   *   emitted
   */
  export type PapiEvent<T> = (callback: PapiEventHandler<T>) => Unsubscriber;
  /**
   * A PapiEvent that subscribes asynchronously and resolves an asynchronous unsubscriber.
   *
   * Note: The callback itself is not asynchronous.
   */
  export type PapiEventAsync<T> = (callback: PapiEventHandler<T>) => Promise<UnsubscriberAsync>;
}
declare module 'shared/data/internal-connection.model' {
  /**
   * Types that are internal to the communication we do through WebSocket. These types should not need
   * to be used outside of NetworkConnectors and ConnectionService.ts
   */
  import { ComplexRequest, ComplexResponse, SerializedRequestType } from 'shared/utils/papi-util';
  /** Represents when the client id has not been assigned by the server */
  export const CLIENT_ID_UNASSIGNED = -1;
  /** "Client id" for the server */
  export const CLIENT_ID_SERVER = 0;
  /** Represents when the connector info has not been populated by the server */
  export const CONNECTOR_INFO_DISCONNECTED: Readonly<{
    clientId: -1;
  }>;
  /** Prefix on requests that indicates that the request is a command */
  export const CATEGORY_COMMAND = 'command';
  /** Information about the network connector */
  export type NetworkConnectorInfo = Readonly<{
    clientId: number;
  }>;
  /** Event emitted when client connections are established */
  export type ClientConnectEvent = {
    clientId: number;
    didReconnect: boolean;
  };
  /** Event emitted when client connections are lost */
  export type ClientDisconnectEvent = {
    clientId: number;
  };
  /**
   * Functions that run when network connector events occur. These should likely be emit functions
   * from NetworkEventEmitters so the events inform all interested connections
   */
  export type NetworkConnectorEventHandlers = {
    /** Handles when a new connection is established */
    didClientConnectHandler?: (event: ClientConnectEvent) => void;
    /** Handles when a client disconnects */
    didClientDisconnectHandler?: (event: ClientDisconnectEvent) => void;
  };
  /**
   * Whether this connector is setting up or has finished setting up its connection and is ready to
   * communicate on the network
   */
  export enum ConnectionStatus {
    /** This connector is not connected to the network */
    Disconnected = 0,
    /** This connector is attempting to connect to the network and retrieve connectorInfo */
    Connecting = 1,
    /** This connector has finished setting up its connection - has connectorInfo and such */
    Connected = 2,
  }
  /** Request to do something and to respond */
  export type InternalRequest<TParam = unknown> = {
    requestId: number;
  } & ComplexRequest<TParam>;
  /** Response to a request */
  export type InternalResponse<TReturn = unknown> = {
    /** The process that sent this Response */
    senderId: number;
    requestId: number;
    /** The process that originally sent the Request that matches to this response */
    requesterId: number;
  } & ComplexResponse<TReturn>;
  /**
   * Handler for requests from the server. Used internally between network connector and Connection
   * Service
   */
  export type InternalRequestHandler = <TParam, TReturn>(
    requestType: string,
    request: InternalRequest<TParam>,
  ) => Promise<InternalResponse<TReturn>>;
  /** Handler for requests from the server */
  export type RequestHandler = <TParam, TReturn>(
    requestType: SerializedRequestType,
    request: ComplexRequest<TParam>,
  ) => Promise<ComplexResponse<TReturn>>;
  /** Function that returns a clientId to which to send the request based on the requestType */
  export type RequestRouter = (requestType: string) => number;
  /** Event to be sent out throughout all processes */
  export type InternalEvent<T> = {
    /** The process that emitted this Event */
    senderId: number;
    /** Contents of the event */
    event: T;
  };
  /**
   * Handler for events from on the network. Used internally between network connector and Connection
   * Service
   */
  export type InternalNetworkEventHandler = <T>(
    eventType: string,
    incomingEvent: InternalEvent<T>,
  ) => void;
  /** Handler for events from on the network */
  export type NetworkEventHandler = <T>(eventType: string, event: T) => void;
}
declare module 'shared/services/network-connector.interface' {
  import {
    ConnectionStatus,
    InternalEvent,
    InternalNetworkEventHandler,
    InternalRequestHandler,
    NetworkConnectorEventHandlers,
    NetworkConnectorInfo,
    RequestRouter,
  } from 'shared/data/internal-connection.model';
  /**
   * Interface that defines the network connection functionality the server and the client must
   * implement. Used by NetworkConnectorFactory to supply the right kind of NetworkConnector to
   * ConnectionService
   */
  export default interface INetworkConnector {
    /** Information about the connector. Populated by the server while connecting */
    connectorInfo: NetworkConnectorInfo;
    /**
     * Whether this connector is setting up or has finished setting up its connection and is ready to
     * communicate on the network
     */
    connectionStatus: ConnectionStatus;
    /**
     * Sets up the NetworkConnector by populating connector info, setting up event handlers, and doing
     * one of the following:
     *
     * - On Client: connecting to the server.
     * - On Server: opening an endpoint for clients to connect.
     *
     * MUST ALSO RUN notifyClientConnected() WHEN PROMISE RESOLVES
     *
     * @param localRequestHandler Function that handles requests from the connection. Only called when
     *   this connector can handle the request
     * @param requestRouter Function that returns a clientId to which to send the request based on the
     *   requestType. If requestRouter returns this connector's clientId, localRequestHandler is used
     * @param localEventHandler Function that handles events from the server by accepting an eventType
     *   and an event and emitting the event locally
     * @param networkConnectorEventHandlers Functions that run when network connector events occur
     *   like when clients are disconnected
     * @returns Promise that resolves with connector info when finished connecting
     */
    connect: (
      localRequestHandler: InternalRequestHandler,
      requestRouter: RequestRouter,
      localEventHandler: InternalNetworkEventHandler,
      networkConnectorEventHandlers: NetworkConnectorEventHandlers,
    ) => Promise<NetworkConnectorInfo>;
    /**
     * Notify the server that this client has received its connectorInfo and is ready to go.
     *
     * MUST RUN AFTER connect() WHEN ITS PROMISE RESOLVES
     *
     * TODO: Is this necessary?
     */
    notifyClientConnected: () => Promise<void>;
    /**
     * Disconnects from the connection:
     *
     * - On Client: disconnects from the server
     * - On Server: disconnects from clients and closes its connection endpoint
     */
    disconnect: () => void;
    /**
     * Send a request to the server/a client and resolve after receiving a response
     *
     * @param requestType The type of request
     * @param contents Contents to send in the request
     * @returns Promise that resolves with the response message
     */
    request: InternalRequestHandler;
    /**
     * Sends an event to other processes. Does NOT run the local event subscriptions as they should be
     * run by NetworkEventEmitter after sending on network.
     *
     * @param eventType Unique network event type for coordinating between processes
     * @param event Event to emit on the network
     */
    emitEventOnNetwork: <T>(eventType: string, event: InternalEvent<T>) => Promise<void>;
  }
}
declare module 'shared/data/network-connector.model' {
  /**
   * Types that are relevant particularly to the implementation of communication on
   * NetworkConnector.ts files Do not use these types outside of ClientNetworkConnector.ts and
   * ServerNetworkConnector.ts
   */
  import {
    InternalEvent,
    InternalRequest,
    InternalResponse,
    NetworkConnectorInfo,
  } from 'shared/data/internal-connection.model';
  /** Port to use for the webSocket */
  export const WEBSOCKET_PORT = 8876;
  /** Number of attempts a client will make to connect to the WebSocket server before failing */
  export const WEBSOCKET_ATTEMPTS_MAX = 5;
  /**
   * Time in ms for the client to wait before attempting to connect to the WebSocket server again
   * after a failure
   */
  export const WEBSOCKET_ATTEMPTS_WAIT = 1000;
  /** WebSocket message type that indicates how to handle it */
  export enum MessageType {
    InitClient = 'init-client',
    ClientConnect = 'client-connect',
    Request = 'request',
    Response = 'response',
    Event = 'event',
  }
  /** Message sent to the client to give it NetworkConnectorInfo */
  export type InitClient = {
    type: MessageType.InitClient;
    senderId: number;
    connectorInfo: NetworkConnectorInfo;
    /** Guid unique to this connection. Used to verify important messages like reconnecting */
    clientGuid: string;
  };
  /** Message responding to the server to let it know this connection is ready to receive messages */
  export type ClientConnect = {
    type: MessageType.ClientConnect;
    senderId: number;
    /**
     * ClientGuid for this client the last time it was connected to the server. Used when reconnecting
     * (like if the browser refreshes): if the server has a connection with this clientGuid, it will
     * unregister all requests on that client so the reconnecting client can register its request
     * handlers again.
     */
    reconnectingClientGuid?: string;
  };
  /** Request to do something and to respond */
  export type WebSocketRequest<TParam = unknown> = {
    type: MessageType.Request;
    /** What kind of request this is. Certain command, etc */
    requestType: string;
  } & InternalRequest<TParam>;
  /** Response to a request */
  export type WebSocketResponse<TReturn = unknown> = {
    type: MessageType.Response;
    /** What kind of request this is. Certain command, etc */
    requestType: string;
  } & InternalResponse<TReturn>;
  /** Event to be sent out throughout all processes */
  export type WebSocketEvent<T> = {
    type: MessageType.Event;
    /** What kind of event this is */
    eventType: string;
  } & InternalEvent<T>;
  /** Messages send by the WebSocket */
  export type Message =
    | InitClient
    | ClientConnect
    | WebSocketRequest
    | WebSocketResponse
    | WebSocketEvent<unknown>;
}
declare module 'shared/models/disposal.model' {
  import { PapiEvent } from 'shared/models/papi-event.model';
  import { UnsubscriberAsync } from 'shared/utils/papi-util';
  /** Require a `dispose` function */
  export interface Dispose {
    /** Release resources and notify dependent services when tearing down an object */
    dispose: UnsubscriberAsync;
  }
  /** Require an `onDidDispose` event */
  export interface OnDidDispose {
    /** Event that emits when `dispose` is called on an object */
    onDidDispose: PapiEvent<void>;
  }
  /**
   * Indicates than an object cannot have an `onDidDispose` event. Also allows an object to include a
   * `dispose` function.
   */
  export interface CannotHaveOnDidDispose {
    /** Release resources and notify dependent services when tearing down an object */
    dispose?: UnsubscriberAsync;
    /** Event that emits when `dispose` is called on an object */
    onDidDispose?: undefined;
  }
  /** Allow onDidDispose to exist on the type if it was previously disallowed by CannotHaveOnDidDispose */
  export type CanHaveOnDidDispose<T extends CannotHaveOnDidDispose> = Omit<T, 'onDidDispose'>;
}
declare module 'shared/models/papi-event-emitter.model' {
  /** Interfaces, classes, and functions related to events and event emitters */
  import { PapiEvent } from 'shared/models/papi-event.model';
  import { Dispose } from 'shared/models/disposal.model';
  /**
   *
   * Event manager - accepts subscriptions to an event and runs the subscription callbacks when the
   * event is emitted Use eventEmitter.event(callback) to subscribe to the event. Use
   * eventEmitter.emit(event) to run the subscriptions. Generally, this EventEmitter should be
   * private, and its event should be public. That way, the emitter is not publicized, but anyone can
   * subscribe to the event.
   */
  export default class PapiEventEmitter<T> implements Dispose {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    subscribe: PapiEvent<T>;
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    private subscriptions?;
    /** Event for listeners to subscribe to. Lazy loaded */
    private lazyEvent?;
    /** Whether this emitter has been disposed */
    private isDisposed;
    /**
     * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted.
     * Use like `const unsubscriber = event(callback)`
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    get event(): PapiEvent<T>;
    /** Disposes of this event, preparing it to release from memory */
    dispose: () => Promise<boolean>;
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    emit: (event: T) => void;
    /**
     * Function that runs the subscriptions for the event. Added here so children can override emit
     * and still call the base functionality. See NetworkEventEmitter.emit for example
     */
    protected emitFn(event: T): void;
    /** Check to make sure this emitter is not disposed. Throw if it is */
    protected assertNotDisposed(): void;
    /**
     * Disposes of this event, preparing it to release from memory. Added here so children can
     * override emit and still call the base functionality.
     */
    protected disposeFn(): Promise<boolean>;
  }
}
declare module 'client/services/web-socket.interface' {
  /**
   * Interface that defines the webSocket functionality the extension host and the renderer must
   * implement. Used by WebSocketFactory to supply the right kind of WebSocket to
   * ClientNetworkConnector. For now, we are just using the browser WebSocket type. We may need
   * specific functionality that don't line up between the ws library's implementation and the browser
   * implementation. We can adjust as needed at that point.
   */
  export type IWebSocket = WebSocket;
}
declare module 'renderer/services/renderer-web-socket.service' {
  /** Once our network is running, run this to stop extensions from connecting to it directly */
  export const blockWebSocketsToPapiNetwork: () => void;
  /** This wraps the browser's WebSocket implementation to provide
   * better control over internet access. It is isomorphic with the standard WebSocket, so it should
   * act as a drop-in replacement.
   *
   * Note that the Node WebSocket implementation is different and not wrapped here.
   */
  export default class PapiRendererWebSocket implements WebSocket {
    readonly CONNECTING: 0;
    readonly OPEN: 1;
    readonly CLOSING: 2;
    readonly CLOSED: 3;
    addEventListener: <K extends keyof WebSocketEventMap>(
      type: K,
      listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ) => void;
    binaryType: BinaryType;
    bufferedAmount: number;
    close: (code?: number, reason?: string) => void;
    dispatchEvent: (event: Event) => boolean;
    extensions: string;
    onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
    onerror: ((this: WebSocket, ev: Event) => any) | null;
    onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
    onopen: ((this: WebSocket, ev: Event) => any) | null;
    protocol: string;
    readyState: number;
    removeEventListener: <K extends keyof WebSocketEventMap>(
      type: K,
      listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
      options?: boolean | EventListenerOptions,
    ) => void;
    send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
    url: string;
    constructor(url: string | URL, protocols?: string | string[]);
  }
}
declare module 'extension-host/services/extension-host-web-socket.model' {
  import ws from 'ws';
  /**
   * Extension-host client uses ws as its WebSocket client, but the renderer can't use it. So we need
   * to exclude it from the renderer webpack bundle like this.
   */
  export default ws;
}
declare module 'client/services/web-socket.factory' {
  import { IWebSocket } from 'client/services/web-socket.interface';
  /**
   * Creates a WebSocket for the renderer or extension host depending on where you're running
   *
   * @returns WebSocket
   */
  export const createWebSocket: (url: string) => Promise<IWebSocket>;
}
declare module 'client/services/client-network-connector.service' {
  import {
    ConnectionStatus,
    InternalEvent,
    InternalNetworkEventHandler,
    InternalRequest,
    InternalRequestHandler,
    InternalResponse,
    NetworkConnectorInfo,
    RequestRouter,
  } from 'shared/data/internal-connection.model';
  import INetworkConnector from 'shared/services/network-connector.interface';
  /** Handles the connection from the client to the server */
  export default class ClientNetworkConnector implements INetworkConnector {
    connectorInfo: NetworkConnectorInfo;
    connectionStatus: ConnectionStatus;
    /** The webSocket connected to the server */
    private webSocket?;
    /**
     * All message subscriptions - emitters that emit an event each time a message with a specific
     * message type comes in
     */
    private messageEmitters;
    /**
     * Promise that resolves when the connection is finished or rejects if disconnected before the
     * connection finishes
     */
    private connectPromise?;
    /** Function that removes this initClient handler from the connection */
    private unsubscribeHandleInitClientMessage?;
    /** Function that removes this response handler from the connection */
    private unsubscribeHandleResponseMessage?;
    /** Function that removes this handleRequest from the connection */
    private unsubscribeHandleRequestMessage?;
    /** Function that removes this handleEvent from the connection */
    private unsubscribeHandleEventMessage?;
    /**
     * Function to call when we receive a request that is registered on this connector. Handles
     * requests from the connection and returns a response to send back
     */
    private localRequestHandler?;
    /**
     * Function to call when we are sending a request. Returns a clientId to which to send the request
     * based on the requestType
     */
    private requestRouter?;
    /**
     * Function to call when we receive an event. Handles events from the connection by emitting the
     * event locally
     */
    private localEventHandler?;
    /** All requests that are waiting for a response */
    private requests;
    /** Unique Guid associated with this connection. Used to verify certain things with server */
    private clientGuid;
    connect: (
      localRequestHandler: InternalRequestHandler,
      requestRouter: RequestRouter,
      localEventHandler: InternalNetworkEventHandler,
    ) => Promise<
      Readonly<{
        clientId: number;
      }>
    >;
    notifyClientConnected: () => Promise<void>;
    disconnect: () => void;
    request: <TParam, TReturn>(
      requestType: string,
      request: InternalRequest<TParam>,
    ) => Promise<InternalResponse<TReturn>>;
    emitEventOnNetwork: <T>(eventType: string, event: InternalEvent<T>) => Promise<void>;
    /**
     * Send a message to the server via webSocket. Throws if not connected
     *
     * @param message Message to send
     */
    private sendMessage;
    /**
     * Receives and appropriately publishes server webSocket messages
     *
     * @param event WebSocket message information
     * @param fromSelf Whether this message is from this connector instead of from someone else
     */
    private onMessage;
    /**
     * Subscribes a function to run on webSocket messages of a particular type
     *
     * @param messageType The type of message on which to subscribe the function
     * @param callback Function to run with the contents of the webSocket message
     * @returns Unsubscriber function to run to stop calling the passed-in function on webSocket
     *   messages
     */
    private subscribe;
    /**
     * Function that handles webSocket messages of type Response. Resolves the request associated with
     * the received response message
     *
     * @param response Response message to resolve
     */
    private handleResponseMessage;
    /**
     * Function that handles incoming webSocket messages and locally sent messages of type Request.
     * Runs the requestHandler provided in connect() and sends a message with the response
     *
     * @param requestMessage Request message to handle
     * @param isIncoming Whether this message is coming from the server and we should definitely
     *   handle it locally or if it is a locally sent request and we should send to the server if we
     *   don't have a local handler
     */
    private handleRequestMessage;
    /**
     * Function that handles incoming webSocket messages of type Event. Runs the eventHandler provided
     * in connect()
     *
     * @param eventMessage Event message to handle
     */
    private handleEventMessage;
  }
}
declare module 'main/services/server-network-connector.service' {
  import {
    ConnectionStatus,
    InternalEvent,
    InternalNetworkEventHandler,
    InternalRequest,
    InternalRequestHandler,
    InternalResponse,
    NetworkConnectorEventHandlers,
    NetworkConnectorInfo,
    RequestRouter,
  } from 'shared/data/internal-connection.model';
  import INetworkConnector from 'shared/services/network-connector.interface';
  /** Handles the endpoint and connections from the server to the clients */
  export default class ServerNetworkConnector implements INetworkConnector {
    connectorInfo: NetworkConnectorInfo;
    connectionStatus: ConnectionStatus;
    /** The webSocket connected to the server */
    private webSocketServer?;
    /** The next client id to use for a new connection. Starts at 1 because the server is 0 */
    private nextClientId;
    /** The webSocket clients that are connected and information about them */
    private clientSockets;
    /**
     * All message subscriptions - emitters that emit an event each time a message with a specific
     * message type comes in
     */
    private messageEmitters;
    /**
     * Promise that resolves when finished starting the server or rejects if disconnected before the
     * server finishes
     */
    private connectPromise?;
    /** Function that removes this clientConnect handler from connections */
    private unsubscribeHandleClientConnectMessage?;
    /** Function that removes this response handler from connections */
    private unsubscribeHandleResponseMessage?;
    /** Function that removes this handleRequest from connections */
    private unsubscribeHandleRequestMessage?;
    /** Function that removes this handleEvent from the connection */
    private unsubscribeHandleEventMessage?;
    /**
     * Function to call when we receive a request that is registered on this connector. Handles
     * requests from connections and returns a response to send back
     */
    private localRequestHandler?;
    /**
     * Function to call when we are sending a request. Returns a clientId to which to send the request
     * based on the requestType
     */
    private requestRouter?;
    /**
     * Function to call when we receive an event. Handles events from connections and emits the event
     * locally
     */
    private localEventHandler?;
    /** Functions to run when network connector events occur like when clients are disconnected */
    private networkConnectorEventHandlers?;
    /** All requests that are waiting for a response */
    private requests;
    connect: (
      localRequestHandler: InternalRequestHandler,
      requestRouter: RequestRouter,
      localEventHandler: InternalNetworkEventHandler,
      networkConnectorEventHandlers: NetworkConnectorEventHandlers,
    ) => Promise<
      Readonly<{
        clientId: number;
      }>
    >;
    notifyClientConnected: () => Promise<void>;
    disconnect: () => void;
    request: <TParam, TReturn>(
      requestType: string,
      request: InternalRequest<TParam>,
    ) => Promise<InternalResponse<TReturn>>;
    emitEventOnNetwork: <T>(eventType: string, event: InternalEvent<T>) => Promise<void>;
    /** Get the client socket for a certain clientId. Throws if not found */
    private getClientSocket;
    /**
     * Attempts to get the client socket for a certain clientGuid. Returns undefined if not found.
     * This does not throw because it will likely be very common that we do not have a clientId for a
     * certain clientGuid as connecting clients will often supply old clientGuids.
     */
    private getClientSocketFromGuid;
    /** Get the clientId for a certain webSocket. Throws if not found */
    private getClientIdFromSocket;
    /**
     * Send a message to a client via webSocket. Throws if not connected
     *
     * @param message Message to send
     * @param recipientId The client to which to send the message. TODO: determine if we can intuit
     *   this instead
     */
    private sendMessage;
    /**
     * Receives and appropriately publishes webSocket messages
     *
     * @param event WebSocket message information
     * @param fromSelf Whether this message is from this connector instead of from someone else
     */
    private onMessage;
    /**
     * Subscribes a function to run on webSocket messages of a particular type
     *
     * @param messageType The type of message on which to subscribe the function
     * @param callback Function to run with the contents of the webSocket message
     * @returns Unsubscriber function to run to stop calling the passed-in function on webSocket
     *   messages
     */
    private subscribe;
    /**
     * Registers an incoming webSocket connection and sends connection info with InitClient. Does not
     * consider the client fully connected yet until they respond and tell us they connected with
     * ClientConnect
     */
    private onClientConnect;
    /** Handles when client connection disconnects. Unregisters and such */
    private onClientDisconnect;
    /** Closes connection and unregisters a client webSocket when it has disconnected */
    private disconnectClient;
    /**
     * Function that handles webSocket messages of type ClientConnect. Mark the connection fully
     * connected and notify that a client connected or reconnected
     *
     * @param clientConnect Message from the client about the connection
     * @param connectorId ClientId of the client who is sending this ClientConnect message
     */
    private handleClientConnectMessage;
    /**
     * Function that handles webSocket messages of type Response. Resolves the request associated with
     * the received response message or forwards to appropriate client
     *
     * @param response Response message to resolve
     * @param responderId Responding client
     */
    private handleResponseMessage;
    /**
     * Function that handles incoming webSocket messages and locally sent messages of type Request.
     * Handles the request and sends a response if we have a handler or forwards to the appropriate
     * client
     *
     * @param requestMessage Request to handle
     * @param requesterId Who sent this message
     */
    private handleRequestMessage;
    /**
     * Function that handles incoming webSocket messages of type Event. Runs the eventHandler provided
     * in connect() and forwards the event to other clients
     *
     * @param eventMessage Event message to handle
     */
    private handleEventMessage;
  }
}
declare module 'shared/services/network-connector.factory' {
  import INetworkConnector from 'shared/services/network-connector.interface';
  /**
   * Creates a NetworkConnector for the client or the server depending on where you're running
   *
   * @returns NetworkConnector
   */
  export const createNetworkConnector: () => Promise<INetworkConnector>;
}
declare module 'shared/services/connection.service' {
  /**
   * Handles setting up a connection to the electron backend and exchanging simple messages. Do not
   * use outside NetworkService.ts. For communication, use NetworkService.ts as it is an abstraction
   * over this.
   */
  import {
    NetworkConnectorEventHandlers,
    NetworkEventHandler,
    RequestHandler,
    RequestRouter,
  } from 'shared/data/internal-connection.model';
  import { ComplexResponse } from 'shared/utils/papi-util';
  /**
   * Send a request to the server and resolve after receiving a response
   *
   * @param requestType The type of request
   * @param contents Contents to send in the request
   * @returns Promise that resolves with the response message
   */
  export const request: <TParam, TReturn>(
    requestType: string,
    contents: TParam,
  ) => Promise<ComplexResponse<TReturn>>;
  /**
   * Sends an event to other processes. Does NOT run the local event subscriptions as they should be
   * run by NetworkEventEmitter after sending on network.
   *
   * @param eventType Unique network event type for coordinating between processes
   * @param event Event to emit on the network
   */
  export const emitEventOnNetwork: <T>(eventType: string, event: T) => Promise<void>;
  /** Disconnects from the server */
  export const disconnect: () => void;
  /**
   * Sets up the ConnectionService by connecting to the server and setting up event handlers
   *
   * @param localRequestHandler Function that handles requests from the server by accepting a
   *   requestType and a ComplexRequest and returning a Promise of a Complex Response
   * @param networkRequestRouter Function that determines the appropriate clientId to which to send
   *   requests of the given type
   * @param localEventHandler Function that handles events from the server by accepting an eventType
   *   and an event and emitting the event locally
   * @param connectorEventHandlers Functions that run when network connector events occur like when
   *   clients are disconnected
   * @returns Promise that resolves when finished connecting
   */
  export const connect: (
    localRequestHandler: RequestHandler,
    networkRequestRouter: RequestRouter,
    localEventHandler: NetworkEventHandler,
    connectorEventHandlers: NetworkConnectorEventHandlers,
  ) => Promise<void>;
  /** Gets this connection's clientId */
  export const getClientId: () => number;
}
declare module 'shared/models/papi-network-event-emitter.model' {
  import { PapiEventHandler } from 'shared/models/papi-event.model';
  import PapiEventEmitter from 'shared/models/papi-event-emitter.model';
  /**
   * Networked version of EventEmitter - accepts subscriptions to an event and runs the subscription
   * callbacks when the event is emitted. Events on NetworkEventEmitters can be emitted across
   * processes. They are coordinated between processes by their type. Use eventEmitter.event(callback)
   * to subscribe to the event. Use eventEmitter.emit(event) to run the subscriptions. Generally, this
   * EventEmitter should be private, and its event should be public. That way, the emitter is not
   * publicized, but anyone can subscribe to the event.
   *
   * WARNING: Do not use this class directly outside of NetworkService, or it will not do what you
   * expect. Use NetworkService.createNetworkEventEmitter.
   *
   * WARNING: You cannot emit events with complex types on the network.
   */
  export default class PapiNetworkEventEmitter<T> extends PapiEventEmitter<T> {
    /** Callback that sends the event to other processes on the network when it is emitted */
    private networkSubscriber;
    /** Callback that runs when the emitter is disposed - should handle unlinking from the network */
    private networkDisposer;
    /**
     * Creates a NetworkEventEmitter
     *
     * @param networkSubscriber Callback that accepts the event and emits it to other processes
     * @param networkDisposer Callback that unlinks this emitter from the network
     */
    constructor(
      /** Callback that sends the event to other processes on the network when it is emitted */
      networkSubscriber: PapiEventHandler<T>,
      /** Callback that runs when the emitter is disposed - should handle unlinking from the network */
      networkDisposer: () => void,
    );
    emit: (event: T) => void;
    /**
     * Runs only the subscriptions for the event that are on this process. Does not send over network
     *
     * @param event Event data to provide to subscribed callbacks
     */
    emitLocal(event: T): void;
    dispose: () => Promise<boolean>;
  }
}
declare module 'shared/services/network.service' {
  /**
   * Handles requests, responses, subscriptions, etc. to the backend. Likely shouldn't need/want to
   * expose this whole service on papi, but there are a few things that are exposed via
   * papiNetworkService
   */
  import { ClientConnectEvent, ClientDisconnectEvent } from 'shared/data/internal-connection.model';
  import {
    ComplexRequest,
    ComplexResponse,
    RequestHandlerType,
    SerializedRequestType,
    UnsubscriberAsync,
  } from 'shared/utils/papi-util';
  import PapiEventEmitter from 'shared/models/papi-event-emitter.model';
  import { PapiEvent } from 'shared/models/papi-event.model';
  /**
   * Args handler function for a request. Called when a request is handled. The function should accept
   * the spread of the contents array of the request as its parameters. The function should return an
   * object that becomes the contents object of the response. This type of handler is a normal
   * function.
   */
  type ArgsRequestHandler<TParam extends Array<unknown> = any[], TReturn = any> = (
    ...args: TParam
  ) => Promise<TReturn> | TReturn;
  /**
   * Contents handler function for a request. Called when a request is handled. The function should
   * accept the contents object of the request as its single parameter. The function should return an
   * object that becomes the contents object of the response.
   */
  type ContentsRequestHandler<TParam = any, TReturn = any> = (contents: TParam) => Promise<TReturn>;
  /**
   * Complex handler function for a request. Called when a request is handled. The function should
   * accept a ComplexRequest object as its single parameter. The function should return a
   * ComplexResponse object that becomes the response.. This type of handler is the most flexible of
   * the request handlers.
   */
  type ComplexRequestHandler<TParam = any, TReturn = any> = (
    request: ComplexRequest<TParam>,
  ) => Promise<ComplexResponse<TReturn>>;
  /** Event that emits with clientId when a client connects */
  export const onDidClientConnect: PapiEvent<ClientConnectEvent>;
  /** Event that emits with clientId when a client disconnects */
  export const onDidClientDisconnect: PapiEvent<ClientDisconnectEvent>;
  /** Closes the network services gracefully */
  export const shutdown: () => void;
  /** Sets up the NetworkService. Runs only once */
  export const initialize: () => Promise<void>;
  /**
   * Send a request on the network and resolve the response contents.
   *
   * @param requestType The type of request
   * @param args Arguments to send in the request (put in request.contents)
   * @returns Promise that resolves with the response message
   */
  export const request: <TParam extends unknown[], TReturn>(
    requestType: SerializedRequestType,
    ...args: TParam
  ) => Promise<TReturn>;
  /**
   * Register a local request handler to run on requests.
   *
   * @param requestType The type of request on which to register the handler
   * @param handler Function to register to run on requests
   * @param handlerType Type of handler function - indicates what type of parameters and what return
   *   type the handler has
   * @returns Promise that resolves if the request successfully registered and unsubscriber function
   *   to run to stop the passed-in function from handling requests
   */
  export function registerRequestHandler(
    requestType: SerializedRequestType,
    handler: ArgsRequestHandler,
    handlerType?: RequestHandlerType,
  ): Promise<UnsubscriberAsync>;
  export function registerRequestHandler(
    requestType: SerializedRequestType,
    handler: ContentsRequestHandler,
    handlerType?: RequestHandlerType,
  ): Promise<UnsubscriberAsync>;
  export function registerRequestHandler(
    requestType: SerializedRequestType,
    handler: ComplexRequestHandler,
    handlerType?: RequestHandlerType,
  ): Promise<UnsubscriberAsync>;
  /**
   * Creates an event emitter that works properly over the network. Other connections receive this
   * event when it is emitted.
   *
   * WARNING: You can only create a network event emitter once per eventType to prevent hijacked event
   * emitters.
   *
   * WARNING: You cannot emit events with complex types on the network.
   *
   * @param eventType Unique network event type for coordinating between connections
   * @returns Event emitter whose event works between connections
   */
  export const createNetworkEventEmitter: <T>(eventType: string) => PapiEventEmitter<T>;
  /**
   * Gets the network event with the specified type. Creates the emitter if it does not exist
   *
   * @param eventType Unique network event type for coordinating between connections
   * @returns Event for the event type that runs the callback provided when the event is emitted
   */
  export const getNetworkEvent: <T>(eventType: string) => PapiEvent<T>;
  /**
   * Creates a function that is a request function with a baked requestType. This is also nice because
   * you get TypeScript type support using this function.
   *
   * @param requestType RequestType for request function
   * @returns Function to call with arguments of request that performs the request and resolves with
   *   the response contents
   */
  export const createRequestFunction: <TParam extends unknown[], TReturn>(
    requestType: SerializedRequestType,
  ) => (...args: TParam) => Promise<TReturn>;
  export interface PapiNetworkService {
    onDidClientConnect: typeof onDidClientConnect;
    onDidClientDisconnect: typeof onDidClientDisconnect;
    createNetworkEventEmitter: typeof createNetworkEventEmitter;
    getNetworkEvent: typeof getNetworkEvent;
  }
  /**
   *
   * Service that provides a way to send and receive network events
   */
  export const papiNetworkService: PapiNetworkService;
}
declare module 'shared/utils/async-variable' {
  /** This class provides a convenient way for one task to wait on a variable that another task sets. */
  export default class AsyncVariable<T> {
    private readonly variableName;
    private readonly promiseToValue;
    private resolver;
    private rejecter;
    /**
     * Creates an instance of the class
     *
     * @param variableName Name to use when logging about this variable
     * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
     *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
     *   do not want a timeout at all.
     */
    constructor(variableName: string, rejectIfNotSettledWithinMS?: number);
    /**
     * Get this variable's promise to a value. This always returns the same promise even after the
     * value has been resolved or rejected.
     *
     * @returns The promise for the value to be set
     */
    get promise(): Promise<T>;
    /**
     * A simple way to see if this variable's promise was resolved or rejected already
     *
     * @returns Whether the variable was already resolved or rejected
     */
    get hasSettled(): boolean;
    /**
     * Resolve this variable's promise to the given value
     *
     * @param value This variable's promise will resolve to this value
     * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
     *   or rejected
     */
    resolveToValue(value: T, throwIfAlreadySettled?: boolean): void;
    /**
     * Reject this variable's promise for the value with the given reason
     *
     * @param reason This variable's promise will be rejected with this reason
     * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
     *   or rejected
     */
    rejectWithReason(reason: string, throwIfAlreadySettled?: boolean): void;
    /** Prevent any further updates to this variable */
    private complete;
  }
}
declare module 'shared/services/network-object.service' {
  import { UnsubscriberAsync } from 'shared/utils/papi-util';
  import { PapiEvent } from 'shared/models/papi-event.model';
  import {
    NetworkObject,
    DisposableNetworkObject,
    NetworkableObject,
    LocalObjectToProxyCreator,
    NetworkObjectDetails,
  } from 'shared/models/network-object.model';
  /** Sets up the service. Only runs once and always returns the same promise after that */
  const initialize: () => Promise<void>;
  /**
   * Search locally known network objects for the given ID. Don't look on the network for more
   * objects.
   *
   * @returns Whether we know of an existing network object with the provided ID already on the
   *   network
   */
  const hasKnown: (id: string) => boolean;
  /**
   * Event that fires when a new object has been created on the network (locally or remotely). The
   * event contains information about the new network object.
   */
  export const onDidCreateNetworkObject: PapiEvent<NetworkObjectDetails>;
  /** Event that fires with a network object ID when that object is disposed locally or remotely */
  export const onDidDisposeNetworkObject: PapiEvent<string>;
  interface IDisposableObject {
    dispose?: UnsubscriberAsync;
  }
  /** If `dispose` already exists on `objectToMutate`, we will call it in addition to `newDispose` */
  export function overrideDispose(
    objectToMutate: IDisposableObject,
    newDispose: UnsubscriberAsync,
  ): void;
  /**
   * Get a network object that has previously been set up to be shared on the network. A network
   * object is a proxy to an object living somewhere else that local code can use.
   *
   * Running this function twice with the same inputs yields the same network object.
   *
   * @param id ID of the network object - all processes must use this ID to look up this network
   *   object
   * @param createLocalObjectToProxy Function that creates an object that the network object proxy
   *   will be based upon. The object this function creates cannot have an `onDidDispose` property.
   *   This function is useful for setting up network events on a network object.
   * @returns A promise for the network object with specified ID if one exists, undefined otherwise
   */
  const get: <T extends object>(
    id: string,
    createLocalObjectToProxy?: LocalObjectToProxyCreator<T> | undefined,
  ) => Promise<NetworkObject<T> | undefined>;
  /**
   * Set up an object to be shared on the network.
   *
   * @param id ID of the object to share on the network. All processes must use this ID to look it up.
   * @param objectToShare The object to set up as a network object. It will have an event named
   *   `onDidDispose` added to its properties. An error will be thrown if the object already had an
   *   `onDidDispose` property on it. If the object already contained a `dispose` function, a new
   *   `dispose` function will be set that calls the existing function (amongst other things). If the
   *   object did not already define a `dispose` function, one will be added.
   *
   *   WARNING: setting a network object mutates the provided object.
   * @returns `objectToShare` modified to be a network object
   */
  const set: <T extends NetworkableObject>(
    id: string,
    objectToShare: T,
  ) => Promise<DisposableNetworkObject<T>>;
  interface NetworkObjectService {
    initialize: typeof initialize;
    hasKnown: typeof hasKnown;
    get: typeof get;
    set: typeof set;
    onDidCreateNetworkObject: typeof onDidCreateNetworkObject;
  }
  /**
   * Network objects are distributed objects within PAPI for TS/JS objects. @see
   * https://en.wikipedia.org/wiki/Distributed_object
   *
   * Objects registered via {@link networkObjectService.set} are retrievable using
   * {@link networkObjectService.get}.
   *
   * Function calls made on network objects retrieved via {@link networkObjectService.get} are proxied
   * and sent to the original objects registered via {@link networkObjectService.set}. All functions on
   * the registered object are proxied except for constructors, `dispose`, and functions starting with
   * `on` since those should be events (which are not intended to be proxied) based on our naming
   * convention. If you don't want a function to be proxied, don't make it a property of the
   * registered object.
   *
   * Functions on a network object will be called asynchronously by other processes regardless of
   * whether the functions are synchronous or asynchronous, so it is best to make them all
   * asynchronous. All shared functions' arguments and return values must be serializable to be called
   * across processes.
   *
   * When a service registers an object via {@link networkObjectService.set}, it is the responsibility
   * of that service, and only that service, to call `dispose` on that object when it is no longer
   * intended to be shared with other services.
   *
   * When an object is disposed by calling `dispose`, all functions registered with the `onDidDispose`
   * event handler will be called. After an object is disposed, calls to its functions will no longer
   * be proxied to the original object.
   */
  const networkObjectService: NetworkObjectService;
  export default networkObjectService;
}
declare module 'shared/models/network-object.model' {
  import {
    Dispose,
    OnDidDispose,
    CannotHaveOnDidDispose,
    CanHaveOnDidDispose,
  } from 'shared/models/disposal.model';
  /**
   * An object of this type is returned from {@link networkObjectService.get}.
   *
   * Override the NetworkableObject type's force-undefined onDidDispose to NetworkObject's
   * onDidDispose type because it will have an onDidDispose added.
   *
   * If an object of type T had `dispose` on it, `networkObjectService.get` will remove the ability to
   * call that method. This is because we don't want users of network objects to dispose of them. Only
   * the caller of `networkObjectService.set` should be able to dispose of the network object.
   *
   * @see networkObjectService
   */
  export type NetworkObject<T extends NetworkableObject> = Omit<CanHaveOnDidDispose<T>, 'dispose'> &
    OnDidDispose;
  /**
   * An object of this type is returned from {@link networkObjectService.set}.
   *
   * @see networkObjectService
   */
  export type DisposableNetworkObject<T extends NetworkableObject> = NetworkObject<T> & Dispose;
  /**
   * An object of this type is passed into {@link networkObjectService.set}.
   *
   * @see networkObjectService
   */
  export type NetworkableObject<T = object> = T & CannotHaveOnDidDispose;
  /**
   * If a network object with the provided ID exists remotely but has not been set up to use inside
   * this process, this function is run in {@link networkObjectService.get}, and the returned object is
   * used as a base on which to set up a NetworkObject for use on this process. All properties that
   * are exposed in the base object will be used as-is, and all other properties will be assumed to
   * exist on the remote network object.
   *
   * @param id ID of the network object to get
   * @param networkObjectContainer Holds a reference to the NetworkObject that will be setup within
   *   {@link networkObjectService.get}. It is passed in to allow the return value to call functions on
   *   the NetworkObject. NOTE: networkObjectContainer.contents does not point to a real NetworkObject
   *   while this function is running. The real reference is assigned later, but before the
   *   NetworkObject will be used. The return value should always reference the NetworkObject as
   *   `networkObjectContainer.contents` to avoid acting upon an undefined NetworkObject.
   * @returns The local object to proxy into a network object.
   *
   *   Note: This function should return Partial<T>. For some reason, TypeScript can't infer the type
   *   (probably has to do with that it's a wrapped and layered type). Functions that implement this
   *   type should return Partial<T>
   * @see networkObjectService
   */
  export type LocalObjectToProxyCreator<T extends NetworkableObject> = (
    id: string,
    networkObjectPromise: Promise<NetworkObject<T>>,
  ) => Partial<NetworkableObject>;
  /**
   * Data about an object shared on the network
   *
   * @param id ID of the network object that processes use to reference it
   * @param functionNames Array of strings with the function names exposed on this network object
   */
  export type NetworkObjectDetails = {
    id: string;
    functionNames: string[];
  };
}
declare module 'shared/models/data-provider.model' {
  import { UnsubscriberAsync } from 'shared/utils/papi-util';
  import { PapiEventHandler } from 'shared/models/papi-event.model';
  import { NetworkableObject } from 'shared/models/network-object.model';
  /** Various options to adjust how the data provider subscriber emits updates */
  export type DataProviderSubscriberOptions = {
    /**
     * Whether to immediately retrieve the data for this subscriber and run the callback as soon as
     * possible.
     *
     * This allows a subscriber to simply subscribe and provide a callback instead of subscribing,
     * running `get`, and managing the race condition of an event coming in to update the data and the
     * initial `get` coming back in.
     *
     * @default true
     */
    retrieveDataImmediately?: boolean;
    /**
     * Under which conditions to run the callback when we receive updates to the data.
     *
     * - `'deeply-equal'` - only run the update callback when the data at this selector has changed.
     *
     *   For example, suppose your selector is targeting John 3:5, and the data provider updates its
     *   data for Luke 5:3. Your data at John 3:5 does not change, and your callback will not run.
     * - `'*'` - run the update callback every time the data has been updated whether or not the data at
     *   this selector has changed.
     *
     *   For example, suppose your selector is targeting John 3:5, and the data provider updates its
     *   data for Luke 5:3. Your data at John 3:5 does not change, but your callback will run again
     *   with the same data anyway.
     *
     * @default 'deeply-equal'
     */
    whichUpdates?: 'deeply-equal' | '*';
  };
  /**
   * Information that papi uses to interpret whether to send out updates on a data provider when the
   * engine runs `set<data_type>` or `notifyUpdate`.
   *
   * - `'*'` update subscriptions for all data types on this data provider
   * - `string` name of data type - update subscriptions for this data type
   * - `string[]` names of data types - update subscriptions for the data types in the array
   * - `true` (or other truthy values other than strings and arrays)
   *
   *   - In `set<data_type>` - update subscriptions for this data type
   *   - In `notifyUpdate` - same as '*'
   * - `false` (or falsy) do not update subscriptions
   */
  export type DataProviderUpdateInstructions<TDataTypes extends DataProviderDataTypes> =
    | '*'
    | DataTypeNames<TDataTypes>
    | DataTypeNames<TDataTypes>[]
    | boolean;
  /**
   * Set a subset of data according to the selector.
   *
   * Note: if a data provider engine does not provide `set` (possibly indicating it is read-only),
   * this will throw an exception.
   *
   * @param selector Tells the provider what subset of data is being set
   * @param data The data that determines what to set at the selector
   * @returns Information that papi uses to interpret whether to send out updates. Defaults to `true`
   *   (meaning send updates only for this data type).
   * @see DataProviderUpdateInstructions for more info on what to return
   */
  export type DataProviderSetter<
    TDataTypes extends DataProviderDataTypes,
    DataType extends keyof TDataTypes,
  > = (
    selector: TDataTypes[DataType]['selector'],
    data: TDataTypes[DataType]['setData'],
  ) => Promise<DataProviderUpdateInstructions<TDataTypes>>;
  /**
   * Get a subset of data from the provider according to the selector.
   *
   * Note: This is good for retrieving data from a provider once. If you want to keep the data
   * up-to-date, use `subscribe` instead, which can immediately give you the data and keep it
   * up-to-date.
   *
   * @param selector Tells the provider what subset of data to get
   * @returns The subset of data represented by the selector
   */
  export type DataProviderGetter<TDataType extends DataProviderDataType> = (
    selector: TDataType['selector'],
  ) => Promise<TDataType['getData']>;
  /**
   * Subscribe to receive updates relevant to the provided selector from this data provider for a
   * specific data type.
   *
   * Note: By default, this `subscribe<data_type>` function automatically retrieves the current state
   * of the data and runs the provided callback as soon as possible. That way, if you want to keep
   * your data up-to-date, you do not also have to run `get<data_type>`. You can turn this
   * functionality off in the `options` parameter.
   *
   * @param selector Tells the provider what data this listener is listening for
   * @param callback Function to run with the updated data for this selector
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber to stop listening for updates
   */
  export type DataProviderSubscriber<TDataType extends DataProviderDataType> = (
    selector: TDataType['selector'],
    callback: PapiEventHandler<TDataType['getData']>,
    options?: DataProviderSubscriberOptions,
  ) => Promise<UnsubscriberAsync>;
  /**
   * A helper type describing the types associated with a data provider's methods for a specific data
   * type it handles.
   *
   * @type `TSelector` - The type of selector used to get some data from this provider at this data
   *   type. A selector is an object a caller provides to the data provider to tell the provider what
   *   subset of data it wants at this data type.
   * @type `TGetData` - The type of data provided by this data provider when you run `get<data_type>`
   *   based on a provided selector
   * @type `TSetData` - The type of data ingested by this data provider when you run `set<data_type>`
   *   based on a provided selector
   */
  export type DataProviderDataType<
    TSelector = unknown,
    TGetData = TSelector,
    TSetData = TGetData,
  > = {
    /**
     * The type of selector used to get some data from this provider at this data type. A selector is
     * an object a caller provides to the data provider to tell the provider what subset of data it
     * wants at this data type.
     */
    selector: TSelector;
    /**
     * The type of data provided by this data provider when you run `get<data_type>` based on a
     * provided selector
     */
    getData: TGetData;
    /**
     * The type of data ingested by this data provider when you run `set<data_type>` based on a
     * provided selector
     */
    setData: TSetData;
  };
  /**
   * A helper type describing all the data types a data provider handles. Each property on this type
   * (consisting of a DataProviderDataType, which describes the types that correspond to that data
   * type) describes a data type that the data provider handles. The data provider has a
   * `set<data_type>`, `get<data_type>`, and `subscribe<data_type>` for each property (aka data type)
   * listed in this type.
   *
   * @example A data provider that handles greeting strings and age numbers (as well as an All data
   * type that just provides all the data) could have a DataProviderDataTypes that looks like the
   * following:
   *
   * ```typescript
   * {
   * Greeting: DataProviderDataType<string, string | undefined, string>;
   * Age: DataProviderDataType<string, number | undefined, number>;
   * All: DataProviderDataType<undefined, { greeting: string, age: number }, never>;
   * }
   * ```
   */
  export type DataProviderDataTypes = {
    [dataType: string]: DataProviderDataType;
  };
  /**
   * Names of data types in a DataProviderDataTypes type. Indicates the data types that a data
   * provider can handle (so it will have methods with these names like `set<data_type>`)
   *
   * @see DataProviderDataTypes for more information
   */
  export type DataTypeNames<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
    keyof TDataTypes & string;
  /**
   * Set of all `set<data_type>` methods that a data provider provides according to its data types.
   *
   * @see DataProviderSetter for more information
   */
  export type DataProviderSetters<TDataTypes extends DataProviderDataTypes> = {
    [DataType in keyof TDataTypes as `set${DataType & string}`]: DataProviderSetter<
      TDataTypes,
      DataType
    >;
  };
  /**
   * Set of all `get<data_type>` methods that a data provider provides according to its data types.
   *
   * @see DataProviderGetter for more information
   */
  export type DataProviderGetters<TDataTypes extends DataProviderDataTypes> = {
    [DataType in keyof TDataTypes as `get${DataType & string}`]: DataProviderGetter<
      TDataTypes[DataType]
    >;
  };
  /**
   * Set of all `subscribe<data_type>` methods that a data provider provides according to its data
   * types.
   *
   * @see DataProviderSubscriber for more information
   */
  export type DataProviderSubscribers<TDataTypes extends DataProviderDataTypes> = {
    [DataType in keyof TDataTypes as `subscribe${DataType & string}`]: DataProviderSubscriber<
      TDataTypes[DataType]
    >;
  };
  /**
   * An internal object created locally when someone runs dataProviderService.registerEngine. This
   * object layers over the data provider engine and runs its methods along with other methods. This
   * object is transformed into an IDataProvider by networkObjectService.set.
   *
   * @see IDataProvider
   */
  type DataProviderInternal<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
    NetworkableObject<
      DataProviderSetters<TDataTypes> &
        DataProviderGetters<TDataTypes> &
        DataProviderSubscribers<TDataTypes>
    >;
  /**
   * Get the data type for a data provider function based on its name
   *
   * @param fnName Name of data provider function e.g. `getVerse`
   * @returns Data type for that data provider function e.g. `Verse`
   */
  export function getDataProviderDataTypeFromFunctionName<
    TDataTypes extends DataProviderDataTypes = DataProviderDataTypes,
  >(fnName: string): DataTypeNames<TDataTypes>;
  export default DataProviderInternal;
}
declare module 'shared/models/project-data-provider.model' {
  import type { DataProviderDataType } from 'shared/models/data-provider.model';
  /** Indicates to a PDP what extension data is being referenced */
  export type ExtensionDataScope = {
    /** Name of an extension as provided in its manifest */
    extensionName: string;
    /**
     * Name of a unique partition or segment of data within the extension Some examples include (but
     * are not limited to):
     *
     * - Name of an important data structure that is maintained in a project
     * - Name of a downloaded data set that is being cached
     * - Name of a resource created by a user that should be maintained in a project
     *
     * This is the smallest level of granularity provided by a PDP for accessing extension data. There
     * is no way to get or set just a portion of data identified by a single dataQualifier value.
     */
    dataQualifier: string;
  };
  /**
   * All Project Data Provider data types must have an `ExtensionData` type. We strongly recommend all
   * Project Data Provider data types extend from this type in order to standardize the
   * `ExtensionData` types.
   *
   * Benefits of following this standard:
   *
   * - All PSIs that support this `projectType` can use a standardized `ExtensionData` interface
   * - If an extension uses the `ExtensionData` endpoint for any project, it will likely use this
   *   standardized interface, so using this interface on your Project Data Provider data types
   *   enables your PDP to support generic extension data
   * - In the future, we may enforce that callers to `ExtensionData` endpoints include `extensionName`,
   *   so following this interface ensures your PDP will not break if such a requirement is
   *   implemented.
   */
  export type MandatoryProjectDataType = {
    ExtensionData: DataProviderDataType<ExtensionDataScope, string | undefined, string>;
  };
}
declare module 'shared/models/data-provider.interface' {
  import {
    DataProviderDataTypes,
    DataProviderGetters,
    DataProviderSetters,
    DataProviderSubscribers,
  } from 'shared/models/data-provider.model';
  import { Dispose, OnDidDispose } from 'shared/models/disposal.model';
  /**
   * An object on the papi that manages data and has methods for interacting with that data. Created
   * by the papi and layers over an IDataProviderEngine provided by an extension. Returned from
   * getting a data provider with dataProviderService.get.
   *
   * Note: each `set<data_type>` method has a corresponding `get<data_type>` and
   * `subscribe<data_type>` method.
   */
  type IDataProvider<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
    DataProviderSetters<TDataTypes> &
      DataProviderGetters<TDataTypes> &
      DataProviderSubscribers<TDataTypes> &
      OnDidDispose;
  export default IDataProvider;
  /**
   * A data provider that has control over disposing of it with dispose. Returned from registering a
   * data provider (only the service that set it up should dispose of it) with
   * dataProviderService.registerEngine
   *
   * @see IDataProvider
   */
  export type IDisposableDataProvider<TDataProvider extends IDataProvider<any>> = TDataProvider &
    Dispose;
}
declare module 'shared/models/data-provider-engine.model' {
  import {
    DataProviderDataTypes,
    DataProviderGetters,
    DataProviderUpdateInstructions,
    DataProviderSetters,
  } from 'shared/models/data-provider.model';
  import { NetworkableObject } from 'shared/models/network-object.model';
  /**
   *
   * Method to run to send clients updates for a specific data type outside of the `set<data_type>`
   * method. papi overwrites this function on the DataProviderEngine itself to emit an update after
   * running the `notifyUpdate` method in the DataProviderEngine.
   *
   * @example To run `notifyUpdate` function so it updates the Verse and Heresy data types (in a data
   * provider engine):
   *
   * ```typescript
   * this.notifyUpdate(['Verse', 'Heresy']);
   * ```
   *
   * @example You can log the manual updates in your data provider engine by specifying the following
   * `notifyUpdate` function in the data provider engine:
   *
   * ```typescript
   * notifyUpdate(updateInstructions) {
   * papi.logger.info(updateInstructions);
   * }
   * ```
   *
   * Note: This function's return is treated the same as the return from `set<data_type>`
   *
   * @param updateInstructions Information that papi uses to interpret whether to send out updates.
   *   Defaults to `'*'` (meaning send updates for all data types) if parameter `updateInstructions`
   *   is not provided or is undefined. Otherwise returns `updateInstructions`. papi passes the
   *   interpreted update value into this `notifyUpdate` function. For example, running
   *   `this.notifyUpdate()` will call the data provider engine's `notifyUpdate` with
   *   `updateInstructions` of `'*'`.
   * @see DataProviderUpdateInstructions for more info on the `updateInstructions` parameter
   *
   * WARNING: Do not update a data type in its `get<data_type>` method (unless you make a base case)!
   * It will create a destructive infinite loop.
   */
  export type DataProviderEngineNotifyUpdate<TDataTypes extends DataProviderDataTypes> = (
    updateInstructions?: DataProviderUpdateInstructions<TDataTypes>,
  ) => void;
  /**
   * Addon type for IDataProviderEngine to specify that there is a `notifyUpdate` method on the data
   * provider engine. You do not need to specify this type unless you are creating an object that is
   * to be registered as a data provider engine and you need to use `notifyUpdate`.
   *
   * @see DataProviderEngineNotifyUpdate for more information on `notifyUpdate`.
   * @see IDataProviderEngine for more information on using this type.
   */
  export type WithNotifyUpdate<TDataTypes extends DataProviderDataTypes> = {
    /**
     *
     * Method to run to send clients updates for a specific data type outside of the `set<data_type>`
     * method. papi overwrites this function on the DataProviderEngine itself to emit an update after
     * running the `notifyUpdate` method in the DataProviderEngine.
     *
     * @example To run `notifyUpdate` function so it updates the Verse and Heresy data types (in a data
     * provider engine):
     *
     * ```typescript
     * this.notifyUpdate(['Verse', 'Heresy']);
     * ```
     *
     * @example You can log the manual updates in your data provider engine by specifying the following
     * `notifyUpdate` function in the data provider engine:
     *
     * ```typescript
     * notifyUpdate(updateInstructions) {
     * papi.logger.info(updateInstructions);
     * }
     * ```
     *
     * Note: This function's return is treated the same as the return from `set<data_type>`
     *
     * @param updateInstructions Information that papi uses to interpret whether to send out updates.
     *   Defaults to `'*'` (meaning send updates for all data types) if parameter `updateInstructions`
     *   is not provided or is undefined. Otherwise returns `updateInstructions`. papi passes the
     *   interpreted update value into this `notifyUpdate` function. For example, running
     *   `this.notifyUpdate()` will call the data provider engine's `notifyUpdate` with
     *   `updateInstructions` of `'*'`.
     * @see DataProviderUpdateInstructions for more info on the `updateInstructions` parameter
     *
     * WARNING: Do not update a data type in its `get<data_type>` method (unless you make a base case)!
     * It will create a destructive infinite loop.
     */
    notifyUpdate: DataProviderEngineNotifyUpdate<TDataTypes>;
  };
  /**
   * The object to register with the DataProviderService to create a data provider. The
   * DataProviderService creates an IDataProvider on the papi that layers over this engine, providing
   * special functionality.
   *
   * @type TDataTypes - The data types that this data provider engine serves. For each data type
   *   defined, the engine must have corresponding `get<data_type>` and `set<data_type> function`
   *   functions.
   * @see DataProviderDataTypes for information on how to make powerful types that work well with
   * Intellisense.
   *
   * Note: papi creates a `notifyUpdate` function on the data provider engine if one is not provided, so it
   * is not necessary to provide one in order to call `this.notifyUpdate`. However, TypeScript does
   * not understand that papi will create one as you are writing your data provider engine, so you can
   * avoid type errors with one of the following options:
   *
   * 1. If you are using an object or class to create a data provider engine, you can add a
   * `notifyUpdate` function (and, with an object, add the WithNotifyUpdate type) to
   * your data provider engine like so:
   * ```typescript
   * const myDPE: IDataProviderEngine<MyDataTypes> & WithNotifyUpdate<MyDataTypes> = {
   *   notifyUpdate(updateInstructions) {},
   *   ...
   * }
   * ```
   * OR
   * ```typescript
   * class MyDPE implements IDataProviderEngine<MyDataTypes> {
   *   notifyUpdate(updateInstructions?: DataProviderEngineNotifyUpdate<MyDataTypes>) {}
   *   ...
   * }
   * ```
   *
   * 2. If you are using a class to create a data provider engine, you can extend the `DataProviderEngine`
   * class, and it will provide `notifyUpdate` for you:
   * ```typescript
   * class MyDPE extends DataProviderEngine<MyDataTypes> implements IDataProviderEngine<MyDataTypes> {
   *   ...
   * }
   * ```
   */
  type IDataProviderEngine<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
    NetworkableObject &
      /**
       * Set of all `set<data_type>` methods that a data provider engine must provide according to its
       * data types. papi overwrites this function on the DataProviderEngine itself to emit an update
       * after running the defined `set<data_type>` method in the DataProviderEngine.
       *
       * Note: papi requires that each `set<data_type>` method has a corresponding `get<data_type>`
       * method.
       *
       * Note: to make a data type read-only, you can always return false or throw from
       * `set<data_type>`.
       *
       * WARNING: Do not run this recursively in its own `set<data_type>` method! It will create as
       * many updates as you run `set<data_type>` methods.
       *
       * @see DataProviderSetter for more information
       */
      DataProviderSetters<TDataTypes> &
      /**
       * Set of all `get<data_type>` methods that a data provider engine must provide according to its
       * data types. Run by the data provider on `get<data_type>`
       *
       * Note: papi requires that each `set<data_type>` method has a corresponding `get<data_type>`
       * method.
       *
       * @see DataProviderGetter for more information
       */
      DataProviderGetters<TDataTypes> &
      Partial<WithNotifyUpdate<TDataTypes>>;
  export default IDataProviderEngine;
}
declare module 'shared/models/extract-data-provider-data-types.model' {
  import IDataProviderEngine from 'shared/models/data-provider-engine.model';
  import IDataProvider, { IDisposableDataProvider } from 'shared/models/data-provider.interface';
  import DataProviderInternal from 'shared/models/data-provider.model';
  /**
   * Get the `DataProviderDataTypes` associated with the `IDataProvider` - essentially, returns
   * `TDataTypes` from `IDataProvider<TDataTypes>`.
   *
   * Works with generic types `IDataProvider`, `DataProviderInternal`, `IDisposableDataProvider`, and
   * `IDataProviderEngine` along with the `papi-shared-types` extensible interfaces `DataProviders`
   * and `DisposableDataProviders`
   */
  type ExtractDataProviderDataTypes<TDataProvider> = TDataProvider extends IDataProvider<
    infer TDataProviderDataTypes
  >
    ? TDataProviderDataTypes
    : TDataProvider extends DataProviderInternal<infer TDataProviderDataTypes>
    ? TDataProviderDataTypes
    : TDataProvider extends IDisposableDataProvider<infer TDataProviderDataTypes>
    ? TDataProviderDataTypes
    : TDataProvider extends IDataProviderEngine<infer TDataProviderDataTypes>
    ? TDataProviderDataTypes
    : never;
  export default ExtractDataProviderDataTypes;
}
declare module 'papi-shared-types' {
  import type { ScriptureReference } from 'papi-components';
  import type { DataProviderDataType } from 'shared/models/data-provider.model';
  import type { MandatoryProjectDataType } from 'shared/models/project-data-provider.model';
  import type { IDisposableDataProvider } from 'shared/models/data-provider.interface';
  import type IDataProvider from 'shared/models/data-provider.interface';
  import type ExtractDataProviderDataTypes from 'shared/models/extract-data-provider-data-types.model';
  /**
   * Function types for each command available on the papi. Each extension can extend this interface
   * to add commands that it registers on the papi with `papi.commands.registerCommand`.
   *
   * Note: Command names must consist of two string separated by at least one period. We recommend
   * one period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * An extension can extend this interface to add types for the commands it registers by adding the
   * following to its `.d.ts` file:
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export interface CommandHandlers {
   *     'myExtension.myCommand1': (foo: string, bar: number) => string;
   *     'myExtension.myCommand2': (foo: string) => Promise<void>;
   *   }
   * }
   * ```
   */
  interface CommandHandlers {
    'test.echo': (message: string) => string;
    'test.echoRenderer': (message: string) => Promise<string>;
    'test.echoExtensionHost': (message: string) => Promise<string>;
    'test.throwError': (message: string) => void;
    'platform.restartExtensionHost': () => Promise<void>;
    'platform.quit': () => Promise<void>;
    'test.addMany': (...nums: number[]) => number;
    'test.throwErrorExtensionHost': (message: string) => void;
  }
  /**
   * Names for each command available on the papi.
   *
   * Automatically includes all extensions' commands that are added to {@link CommandHandlers}.
   *
   * @example 'platform.quit';
   */
  type CommandNames = keyof CommandHandlers;
  interface SettingTypes {
    'platform.verseRef': ScriptureReference;
    placeholder: undefined;
  }
  type SettingNames = keyof SettingTypes;
  /** This is just a simple example so we have more than one. It's not intended to be real. */
  type NotesOnlyProjectDataTypes = MandatoryProjectDataType & {
    Notes: DataProviderDataType<string, string | undefined, string>;
  };
  /**
   * Data types for each project data provider supported by PAPI. Extensions can add more data types
   * with corresponding project data provider IDs by adding details to their `.d.ts` file. Note that
   * all project data types should extend `MandatoryProjectDataTypes` like the following example.
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export type MyProjectDataTypes = MandatoryProjectDataTypes & {
   *     MyProjectData1: DataProviderDataType<string, string, string>;
   *     MyProjectData2: DataProviderDataType<string, string, string>;
   *   };
   *
   *   export interface ProjectDataTypes {
   *     MyExtensionProjectTypeName: MyProjectDataTypes;
   *   }
   * }
   * ```
   */
  interface ProjectDataTypes {
    NotesOnly: NotesOnlyProjectDataTypes;
    placeholder: MandatoryProjectDataType;
  }
  /**
   * Identifiers for all project types supported by PAPI. These are not intended to correspond 1:1
   * to the set of project types available in Paratext.
   */
  type ProjectTypes = keyof ProjectDataTypes;
  type StuffDataTypes = {
    Stuff: DataProviderDataType<string, number, never>;
  };
  type PlaceholderDataTypes = {
    Placeholder: DataProviderDataType<
      {
        thing: number;
      },
      string[],
      number
    >;
  };
  /**
   * `IDataProvider` types for each data provider supported by PAPI. Extensions can add more data
   * providers with corresponding data provider IDs by adding details to their `.d.ts` file and
   * registering a data provider engine in their `activate` function with
   * `papi.dataProviders.registerEngine`.
   *
   * Note: Data Provider names must consist of two string separated by at least one period. We
   * recommend one period and lower camel case in case we expand the api in the future to allow dot
   * notation.
   *
   * An extension can extend this interface to add types for the data provider it registers by
   * adding the following to its `.d.ts` file (in this example, we are adding the
   * `'helloSomeone.people'` data provider types):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export type PeopleDataTypes = {
   *     Greeting: DataProviderDataType<string, string | undefined, string>;
   *     Age: DataProviderDataType<string, number | undefined, number>;
   *     People: DataProviderDataType<undefined, PeopleData, never>;
   *   };
   *
   *   export type PeopleDataMethods = {
   *     deletePerson(name: string): Promise<boolean>;
   *     testRandomMethod(things: string): Promise<string>;
   *   };
   *
   *   export type PeopleDataProvider = IDataProvider<PeopleDataTypes> & PeopleDataMethods;
   *
   *   export interface DataProviders {
   *     'helloSomeone.people': PeopleDataProvider;
   *   }
   * }
   * ```
   */
  interface DataProviders {
    'platform.stuff': IDataProvider<StuffDataTypes>;
    'platform.placeholder': IDataProvider<PlaceholderDataTypes>;
  }
  /**
   * Names for each data provider available on the papi.
   *
   * Automatically includes all extensions' data providers that are added to {@link DataProviders}.
   *
   * @example 'platform.placeholder'
   */
  type DataProviderNames = keyof DataProviders;
  /**
   * `DataProviderDataTypes` for each data provider supported by PAPI. These are the data types
   * served by each data provider.
   *
   * Automatically includes all extensions' data providers that are added to {@link DataProviders}.
   *
   * @example
   *
   * ```typescript
   * DataProviderTypes['helloSomeone.people'] => {
   *     Greeting: DataProviderDataType<string, string | undefined, string>;
   *     Age: DataProviderDataType<string, number | undefined, number>;
   *     People: DataProviderDataType<undefined, PeopleData, never>;
   *   }
   * ```
   */
  type DataProviderTypes = {
    [DataProviderName in DataProviderNames]: ExtractDataProviderDataTypes<
      DataProviders[DataProviderName]
    >;
  };
  /**
   * Disposable version of each data provider type supported by PAPI. These objects are only
   * returned from `papi.dataProviders.registerEngine` - only the one who registers a data provider
   * engine is allowed to dispose of the data provider.
   *
   * Automatically includes all extensions' data providers that are added to {@link DataProviders}.
   */
  type DisposableDataProviders = {
    [DataProviderName in DataProviderNames]: IDisposableDataProvider<
      DataProviders[DataProviderName]
    >;
  };
}
declare module 'shared/services/command.service' {
  import { UnsubscriberAsync } from 'shared/utils/papi-util';
  import { CommandHandlers, CommandNames } from 'papi-shared-types';
  module 'papi-shared-types' {
    interface CommandHandlers {
      'test.addThree': typeof addThree;
      'test.squareAndConcat': typeof squareAndConcat;
    }
  }
  function addThree(a: number, b: number, c: number): Promise<number>;
  function squareAndConcat(a: number, b: string): Promise<string>;
  /** Sets up the CommandService. Only runs once and always returns the same promise after that */
  export const initialize: () => Promise<void>;
  /** Send a command to the backend. */
  export const sendCommand: <CommandName extends keyof CommandHandlers>(
    commandName: CommandName,
    ...args: Parameters<CommandHandlers[CommandName]>
  ) => Promise<Awaited<ReturnType<CommandHandlers[CommandName]>>>;
  /**
   * Creates a function that is a command function with a baked commandName. This is also nice because
   * you get TypeScript type support using this function.
   *
   * @param commandName Command name for command function
   * @returns Function to call with arguments of command that sends the command and resolves with the
   *   result of the command
   */
  export const createSendCommandFunction: <CommandName extends keyof CommandHandlers>(
    commandName: CommandName,
  ) => (
    ...args: Parameters<CommandHandlers[CommandName]>
  ) => Promise<Awaited<ReturnType<CommandHandlers[CommandName]>>>;
  /**
   * Register a command on the papi to be handled here
   *
   * @param commandName Command name to register for handling here
   *
   *   - Note: Command names must consist of two string separated by at least one period. We recommend one
   *       period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * @param handler Function to run when the command is invoked
   * @returns True if successfully registered, throws with error message if not
   */
  export const registerCommand: <CommandName extends CommandNames>(
    commandName: CommandName,
    handler: CommandHandlers[CommandName],
  ) => Promise<UnsubscriberAsync>;
  /**
   *
   * The command service allows you to exchange messages with other components in the platform. You
   * can register a command that other services and extensions can send you. You can send commands to
   * other services and extensions that have registered commands.
   */
  export type moduleSummaryComments = {};
}
declare module 'shared/models/docking-framework.model' {
  import { MutableRefObject, ReactNode } from 'react';
  import { DockLayout, DropDirection, LayoutBase } from 'rc-dock';
  import {
    SavedWebViewDefinition,
    WebViewDefinition,
    WebViewDefinitionUpdateInfo,
  } from 'shared/models/web-view.model';
  /**
   * Saved information used to recreate a tab.
   *
   * - {@link TabLoader} loads this into {@link TabInfo}
   * - {@link TabSaver} saves {@link TabInfo} into this
   */
  export type SavedTabInfo = {
    /**
     * Tab ID - a unique identifier that identifies this tab. If this tab is a WebView, this ID will
     * match the `WebViewDefinition.id`
     */
    id: string;
    /** Type of tab - indicates what kind of built-in tab this info represents */
    tabType: string;
    /** Data needed to load the tab */
    data?: unknown;
  };
  /**
   * Information that Paranext uses to create a tab in the dock layout.
   *
   * - {@link TabLoader} loads {@link SavedTabInfo} into this
   * - {@link TabSaver} saves this into {@link SavedTabInfo}
   */
  export type TabInfo = SavedTabInfo & {
    /**
     * Url of image to show on the title bar of the tab
     *
     * Defaults to Platform.Bible logo
     */
    tabIconUrl?: string;
    /** Text to show on the title bar of the tab */
    tabTitle: string;
    /** Text to show when hovering over the title bar of the tab */
    tabTooltip?: string;
    /** Content to show inside the tab. */
    content: ReactNode;
    /** (optional) Minimum width that the tab can become in CSS `px` units */
    minWidth?: number;
    /** (optional) Minimum height that the tab can become in CSS `px` units */
    minHeight?: number;
  };
  /**
   * Function that takes a {@link SavedTabInfo} and creates a Paranext tab out of it. Each type of tab
   * must provide a {@link TabLoader}.
   *
   * For now all tab creators must do their own data type verification
   */
  export type TabLoader = (savedTabInfo: SavedTabInfo) => TabInfo;
  /**
   * Function that takes a Paranext tab and creates a saved tab out of it. Each type of tab can
   * provide a {@link TabSaver}. If they do not provide one, the properties added by `TabInfo` are
   * stripped from TabInfo by `saveTabInfoBase` before saving (so it is just a {@link SavedTabInfo}).
   *
   * @param tabInfo The Paranext tab to save
   * @returns The saved tab info for Paranext to persist. If `undefined`, does not save the tab
   */
  export type TabSaver = (tabInfo: TabInfo) => SavedTabInfo | undefined;
  /** Information about a tab in a panel */
  interface TabLayout {
    type: 'tab';
  }
  /**
   * Indicates where to display a floating window
   *
   * - `cascade` - place the window a bit below and to the right of the previously created floating
   *   window
   * - `center` - center the window in the dock layout
   */
  type FloatPosition = 'cascade' | 'center';
  /** The dimensions for a floating tab in CSS `px` units */
  export type FloatSize = {
    width: number;
    height: number;
  };
  /** Information about a floating window */
  export interface FloatLayout {
    type: 'float';
    floatSize?: FloatSize;
    /** Where to display the floating window. Defaults to `cascade` */
    position?: FloatPosition;
  }
  export type PanelDirection =
    | 'left'
    | 'right'
    | 'bottom'
    | 'top'
    | 'before-tab'
    | 'after-tab'
    | 'maximize'
    | 'move'
    | 'active'
    | 'update';
  /** Information about a panel */
  interface PanelLayout {
    type: 'panel';
    direction?: PanelDirection;
    /** If undefined, it will add in the `direction` relative to the previously added tab. */
    targetTabId?: string;
  }
  /** Information about how a Paranext tab fits into the dock layout */
  export type Layout = TabLayout | FloatLayout | PanelLayout;
  /** Event emitted when webViews are created */
  export type AddWebViewEvent = {
    webView: SavedWebViewDefinition;
    layout: Layout;
  };
  /** Props that are passed to the web view tab component */
  export type WebViewTabProps = WebViewDefinition;
  /** Rc-dock's onLayoutChange prop made asynchronous - resolves */
  export type OnLayoutChangeRCDock = (
    newLayout: LayoutBase,
    currentTabId?: string,
    direction?: DropDirection,
  ) => Promise<void>;
  /** Properties related to the dock layout */
  export type PapiDockLayout = {
    /** The rc-dock dock layout React element ref. Used to perform operations on the layout */
    dockLayout: DockLayout;
    /**
     * A ref to a function that runs when the layout changes. We set this ref to our
     * {@link onLayoutChange} function
     */
    onLayoutChangeRef: MutableRefObject<OnLayoutChangeRCDock | undefined>;
    /**
     * Add or update a tab in the layout
     *
     * @param savedTabInfo Info for tab to add or update
     * @param layout Information about where to put a new tab
     * @returns If tab added, final layout used to display the new tab. If existing tab updated,
     *   `undefined`
     */
    addTabToDock: (savedTabInfo: SavedTabInfo, layout: Layout) => Layout | undefined;
    /**
     * Add or update a webview in the layout
     *
     * @param webView Web view to add or update
     * @param layout Information about where to put a new webview
     * @returns If WebView added, final layout used to display the new webView. If existing webView
     *   updated, `undefined`
     */
    addWebViewToDock: (webView: WebViewTabProps, layout: Layout) => Layout | undefined;
    /**
     * Remove a tab in the layout
     *
     * @param tabId ID of the tab to remove
     */
    removeTabFromDock: (tabId: string) => boolean;
    /**
     * Gets the WebView definition for the web view with the specified ID
     *
     * @param webViewId The ID of the WebView whose web view definition to get
     * @returns WebView definition with the specified ID or undefined if not found
     */
    getWebViewDefinition: (webViewId: string) => WebViewDefinition | undefined;
    /**
     * Updates the WebView with the specified ID with the specified properties
     *
     * @param webViewId The ID of the WebView to update
     * @param updateInfo Properties to update on the WebView. Any unspecified properties will stay the
     *   same
     * @returns True if successfully found the WebView to update; false otherwise
     */
    updateWebViewDefinition: (
      webViewId: string,
      updateInfo: WebViewDefinitionUpdateInfo,
    ) => boolean;
    /**
     * The layout to use as the default layout if the dockLayout doesn't have a layout loaded.
     *
     * TODO: This should be removed and the `testLayout` imported directly in this file once this
     * service is refactored to split the code between processes. The only reason this is passed from
     * `platform-dock-layout.component.tsx` is that we cannot import `testLayout` here since this
     * service is currently all shared code. Refactor should happen in #203
     */
    testLayout: LayoutBase;
  };
}
declare module 'shared/services/web-view.service-model' {
  import { GetWebViewOptions, WebViewId, WebViewType } from 'shared/models/web-view.model';
  import { AddWebViewEvent, Layout } from 'shared/models/docking-framework.model';
  import { PapiEvent } from 'shared/models/papi-event.model';
  /**
   *
   * Service exposing various functions related to using webViews
   *
   * WebViews are iframes in the Platform.Bible UI into which extensions load frontend code, either
   * HTML or React components.
   */
  export interface WebViewServiceType {
    /** Event that emits with webView info when a webView is added */
    onDidAddWebView: PapiEvent<AddWebViewEvent>;
    /**
     * Creates a new web view or gets an existing one depending on if you request an existing one and
     * if the web view provider decides to give that existing one to you (it is up to the provider).
     *
     * @param webViewType Type of WebView to create
     * @param layout Information about where you want the web view to go. Defaults to adding as a tab
     * @param options Options that affect what this function does. For example, you can provide an
     *   existing web view ID to request an existing web view with that ID.
     * @returns Promise that resolves to the ID of the webview we got or undefined if the provider did
     *   not create a WebView for this request.
     * @throws If something went wrong like the provider for the webViewType was not found
     */
    getWebView: (
      webViewType: WebViewType,
      layout?: Layout,
      options?: GetWebViewOptions,
    ) => Promise<WebViewId | undefined>;
  }
  /** Name to use when creating a network event that is fired when webViews are created */
  export const EVENT_NAME_ON_DID_ADD_WEB_VIEW: `${string}:${string}`;
  export const NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE = 'WebViewService';
}
declare module 'shared/services/network-object-status.service-model' {
  import { NetworkObjectDetails } from 'shared/models/network-object.model';
  export interface NetworkObjectStatusRemoteServiceType {
    /**
     * Get details about all available network objects
     *
     * @returns Object whose keys are the names of the network objects and whose values are the
     *   {@link NetworkObjectDetails} for each network object
     */
    getAllNetworkObjectDetails: () => Promise<Record<string, NetworkObjectDetails>>;
  }
  /** Provides functions related to the set of available network objects */
  export interface NetworkObjectStatusServiceType extends NetworkObjectStatusRemoteServiceType {
    /**
     * Get a promise that resolves when a network object is registered or rejects if a timeout is hit
     *
     * @returns Promise that either resolves to the {@link NetworkObjectDetails} for a network object
     *   once the network object is registered, or rejects if a timeout is provided and the timeout is
     *   reached before the network object is registered
     */
    waitForNetworkObject: (id: string, timeoutInMS?: number) => Promise<NetworkObjectDetails>;
  }
  export const networkObjectStatusServiceNetworkObjectName = 'NetworkObjectStatusService';
}
declare module 'shared/services/network-object-status.service' {
  import { NetworkObjectStatusServiceType } from 'shared/services/network-object-status.service-model';
  const networkObjectStatusService: NetworkObjectStatusServiceType;
  export default networkObjectStatusService;
}
declare module 'shared/services/web-view.service' {
  import { WebViewServiceType } from 'shared/services/web-view.service-model';
  const webViewService: WebViewServiceType;
  export default webViewService;
}
declare module 'shared/models/web-view-provider.model' {
  import {
    GetWebViewOptions,
    WebViewDefinition,
    SavedWebViewDefinition,
  } from 'shared/models/web-view.model';
  import {
    DisposableNetworkObject,
    NetworkObject,
    NetworkableObject,
  } from 'shared/models/network-object.model';
  import { CanHaveOnDidDispose } from 'shared/models/disposal.model';
  export interface IWebViewProvider extends NetworkableObject {
    /**
     * @param savedWebView Filled out if an existing webview is being called for (matched by ID). Just
     *   ID if this is a new request or if the web view with the existing ID was not found
     * @param getWebViewOptions
     */
    getWebView(
      savedWebView: SavedWebViewDefinition,
      getWebViewOptions: GetWebViewOptions,
    ): Promise<WebViewDefinition | undefined>;
  }
  export interface WebViewProvider
    extends NetworkObject<NetworkableObject>,
      CanHaveOnDidDispose<IWebViewProvider> {}
  export interface DisposableWebViewProvider
    extends DisposableNetworkObject<NetworkableObject>,
      Omit<WebViewProvider, 'dispose'> {}
}
declare module 'shared/services/web-view-provider.service' {
  /**
   * Handles registering web view providers and serving web views around the papi. Exposed on the
   * papi.
   */
  import {
    DisposableWebViewProvider,
    IWebViewProvider,
    WebViewProvider,
  } from 'shared/models/web-view-provider.model';
  /** Sets up the service. Only runs once and always returns the same promise after that */
  const initialize: () => Promise<void>;
  /**
   * Indicate if we are aware of an existing web view provider with the given type. If a web view
   * provider with the given type is somewhere else on the network, this function won't tell you about
   * it unless something else in the existing process is subscribed to it.
   *
   * @param webViewType Type of webView to check for
   */
  function hasKnown(webViewType: string): boolean;
  /**
   * Register a web view provider to serve webViews for a specified type of webViews
   *
   * @param webViewType Type of web view to provide
   * @param webViewProvider Object to register as a webView provider including control over disposing
   *   of it.
   *
   *   WARNING: setting a webView provider mutates the provided object.
   * @returns `webViewProvider` modified to be a network object
   */
  function register(
    webViewType: string,
    webViewProvider: IWebViewProvider,
  ): Promise<DisposableWebViewProvider>;
  /**
   * Get a web view provider that has previously been set up
   *
   * @param webViewType Type of webview provider to get
   * @returns Web view provider with the given name if one exists, undefined otherwise
   */
  function get(webViewType: string): Promise<WebViewProvider | undefined>;
  export interface WebViewProviderService {
    initialize: typeof initialize;
    hasKnown: typeof hasKnown;
    register: typeof register;
    get: typeof get;
  }
  export interface PapiWebViewProviderService {
    register: typeof register;
  }
  const webViewProviderService: WebViewProviderService;
  /**
   *
   * Interface for registering webView providers
   */
  export const papiWebViewProviderService: PapiWebViewProviderService;
  export default webViewProviderService;
}
declare module 'shared/services/internet.service' {
  /** Our shim over fetch. Allows us to control internet access. */
  const papiFetch: typeof fetch;
  export interface InternetService {
    fetch: typeof papiFetch;
  }
  /**
   *
   * Service that provides a way to call `fetch` since the original function is not available
   */
  const internetService: InternetService;
  export default internetService;
}
declare module 'shared/services/data-provider.service' {
  /** Handles registering data providers and serving data around the papi. Exposed on the papi. */
  import { DataProviderDataTypes } from 'shared/models/data-provider.model';
  import IDataProviderEngine, {
    DataProviderEngineNotifyUpdate,
  } from 'shared/models/data-provider-engine.model';
  import {
    DataProviderNames,
    DataProviderTypes,
    DataProviders,
    DisposableDataProviders,
  } from 'papi-shared-types';
  import IDataProvider, { IDisposableDataProvider } from 'shared/models/data-provider.interface';
  /**
   *
   * Abstract class that provides a placeholder `notifyUpdate` for data provider engine classes. If a
   * data provider engine class extends this class, it doesn't have to specify its own `notifyUpdate`
   * function in order to use `notifyUpdate`.
   *
   * @see IDataProviderEngine for more information on extending this class.
   */
  export abstract class DataProviderEngine<TDataTypes extends DataProviderDataTypes> {
    notifyUpdate: DataProviderEngineNotifyUpdate<TDataTypes>;
  }
  /**
   * Indicate if we are aware of an existing data provider with the given name. If a data provider
   * with the given name is somewhere else on the network, this function won't tell you about it
   * unless something else in the existing process is subscribed to it.
   */
  function hasKnown(providerName: string): boolean;
  /**
   * Decorator function that marks a data provider engine `set___` or `get___` method to be ignored.
   * papi will not layer over these methods or consider them to be data type methods
   *
   * @example Use this as a decorator on a class's method:
   *
   * ```typescript
   * class MyDataProviderEngine {
   * ＠papi.dataProviders.decorators.ignore
   * async getInternal() {}
   * }
   * ```
   *
   * WARNING: Do not copy and paste this example. The `@` symbol does not render correctly in JSDoc
   * code blocks, so a different unicode character was used. Please use a normal `@` when using a
   * decorator.
   *
   * OR
   *
   * @example Call this function signature on an object's method:
   *
   * ```typescript
   * const myDataProviderEngine = {
   *   async getInternal() {},
   * };
   * papi.dataProviders.decorators.ignore(dataProviderEngine.getInternal);
   * ```
   *
   * @param method The method to ignore
   */
  function ignore(
    method: Function & {
      isIgnored?: boolean;
    },
  ): void;
  /**
   * Decorator function that marks a data provider engine `set___` or `get___` method to be ignored.
   * papi will not layer over these methods or consider them to be data type methods
   *
   * @param target The class that has the method to ignore
   * @param member The name of the method to ignore
   *
   *   Note: this is the signature that provides the actual decorator functionality. However, since
   *   users will not be using this signature, the example usage is provided in the signature above.
   */
  function ignore<T extends object>(target: T, member: keyof T): void;
  /**
   * A collection of decorators to be used with the data provider service
   *
   * @example To use the `ignore` a decorator on a class's method:
   *
   * ```typescript
   * class MyDataProviderEngine {
   * ＠papi.dataProviders.decorators.ignore
   * async getInternal() {}
   * }
   * ```
   *
   * WARNING: Do not copy and paste this example. The `@` symbol does not render correctly in JSDoc
   * code blocks, so a different unicode character was used. Please use a normal `@` when using a
   * decorator.
   */
  const decorators: {
    ignore: typeof ignore;
  };
  /**
   * Creates a data provider to be shared on the network layering over the provided data provider
   * engine.
   *
   * @param providerName Name this data provider should be called on the network
   * @param dataProviderEngine The object to layer over with a new data provider object
   *
   *   WARNING: registering a dataProviderEngine mutates the provided object. Its `notifyUpdate` and
   *   `set` methods are layered over to facilitate data provider subscriptions.
   * @returns The data provider including control over disposing of it. Note that this data provider
   *   is a new object distinct from the data provider engine passed in.
   */
  function registerEngine<DataProviderName extends DataProviderNames>(
    providerName: DataProviderName,
    dataProviderEngine: IDataProviderEngine<DataProviderTypes[DataProviderName]>,
  ): Promise<DisposableDataProviders[DataProviderName]>;
  /**
   * Create a mock local data provider object for connecting to the remote data provider
   *
   * @type `TDataTypes` - The data provider data types served by the data provider to create.
   *
   *   This is not exposed on the papi as it is a helper function to enable other services to layer over
   *   this service and create their own subsets of data providers with other types than
   *   `DataProviders` types using this function and {@link getByType}
   * @param dataProviderObjectId Network object id corresponding to this data provider
   * @param dataProviderContainer Container that holds a reference to the data provider so this
   *   subscribe function can reference the data provider
   * @param providerName Name this data provider should be called on the network
   * @param dataProviderEngine The object to layer over with a new data provider object
   *
   *   WARNING: registering a dataProviderEngine mutates the provided object. Its `notifyUpdate` and
   *   `set` methods are layered over to facilitate data provider subscriptions.
   * @returns Local data provider object that represents a remote data provider
   *
   *   Creates a data provider to be shared on the network layering over the provided data provider
   *   engine.
   * @returns The data provider including control over disposing of it. Note that this data provider
   *   is a new object distinct from the data provider engine passed in.
   */
  export function registerEngineByType<TDataTypes extends DataProviderDataTypes>(
    providerName: string,
    dataProviderEngine: IDataProviderEngine<TDataTypes>,
  ): Promise<IDisposableDataProvider<IDataProvider<TDataTypes>>>;
  /**
   * Get a data provider that has previously been set up
   *
   * @param providerName Name of the desired data provider
   * @returns The data provider with the given name if one exists, undefined otherwise
   */
  function get<DataProviderName extends DataProviderNames>(
    providerName: DataProviderName,
  ): Promise<DataProviders[DataProviderName] | undefined>;
  /**
   * Get a data provider that has previously been set up
   *
   * @type `T` - The type of data provider to get. Use `IDataProvider<TDataProviderDataTypes>`,
   *   specifying your own types, or provide a custom data provider type
   *
   *   This is not exposed on the papi as it is a helper function to enable other services to layer over
   *   this service and create their own subsets of data providers with other types than
   *   `DataProviders` types using this function and {@link registerEngineByType}
   * @param providerName Name of the desired data provider
   * @returns The data provider with the given name if one exists, undefined otherwise
   */
  export function getByType<T extends IDataProvider<any>>(
    providerName: string,
  ): Promise<T | undefined>;
  export interface DataProviderService {
    hasKnown: typeof hasKnown;
    registerEngine: typeof registerEngine;
    get: typeof get;
    decorators: typeof decorators;
    DataProviderEngine: typeof DataProviderEngine;
  }
  /**
   *
   * Service that allows extensions to send and receive data to/from other extensions
   */
  const dataProviderService: DataProviderService;
  export default dataProviderService;
}
declare module 'shared/models/project-data-provider-engine.model' {
  import { ProjectTypes, ProjectDataTypes } from 'papi-shared-types';
  import type IDataProvider from 'shared/models/data-provider.interface';
  import type IDataProviderEngine from 'shared/models/data-provider-engine.model';
  /** All possible types for ProjectDataProviderEngines: IDataProviderEngine<ProjectDataType> */
  export type ProjectDataProviderEngineTypes = {
    [ProjectType in ProjectTypes]: IDataProviderEngine<ProjectDataTypes[ProjectType]>;
  };
  /** All possible types for ProjectDataProviders: IDataProvider<ProjectDataType> */
  export type ProjectDataProvider = {
    [ProjectType in ProjectTypes]: IDataProvider<ProjectDataTypes[ProjectType]>;
  };
  export interface ProjectDataProviderEngineFactory<ProjectType extends ProjectTypes> {
    createProjectDataProviderEngine(
      projectId: string,
      projectStorageInterpreterId: string,
    ): ProjectDataProviderEngineTypes[ProjectType];
  }
}
declare module 'shared/utils/unsubscriber-async-list' {
  import { Dispose } from 'shared/models/disposal.model';
  import { Unsubscriber, UnsubscriberAsync } from 'shared/utils/papi-util';
  /** Simple collection for UnsubscriberAsync objects that also provides an easy way to run them. */
  export default class UnsubscriberAsyncList {
    private name;
    readonly unsubscribers: Set<Unsubscriber | UnsubscriberAsync>;
    constructor(name?: string);
    /**
     * Add unsubscribers to the list. Note that duplicates are not added twice.
     *
     * @param unsubscribers - Objects that were returned from a registration process.
     */
    add(...unsubscribers: (UnsubscriberAsync | Unsubscriber | Dispose)[]): void;
    /**
     * Run all unsubscribers added to this list and then clear the list.
     *
     * @returns `true` if all unsubscribers succeeded, `false` otherwise.
     */
    runAllUnsubscribers(): Promise<boolean>;
  }
}
declare module 'shared/models/project-metadata.model' {
  import { ProjectTypes } from 'papi-shared-types';
  /**
   * Low-level information describing a project that Platform.Bible directly manages and uses to load
   * project data
   */
  export type ProjectMetadata = {
    /** ID of the project (must be unique and case insensitive) */
    id: string;
    /** Short name of the project (not necessarily unique) */
    name: string;
    /** Indicates how the project is persisted to storage */
    storageType: string;
    /**
     * Indicates what sort of project this is which implies its data shape (e.g., what data streams
     * should be available)
     */
    projectType: ProjectTypes;
  };
}
declare module 'shared/services/project-lookup.service-model' {
  import { ProjectMetadata } from 'shared/models/project-metadata.model';
  /**
   *
   * Provides metadata for projects known by the platform
   */
  export interface ProjectLookupServiceType {
    /**
     * Provide metadata for all projects found on the local system
     *
     * @returns ProjectMetadata for all projects stored on the local system
     */
    getMetadataForAllProjects: () => Promise<ProjectMetadata[]>;
    /**
     * Look up metadata for a specific project ID
     *
     * @param projectId ID of the project to load
     * @returns ProjectMetadata from the 'meta.json' file for the given project
     */
    getMetadataForProject: (projectId: string) => Promise<ProjectMetadata>;
  }
  export const projectLookupServiceNetworkObjectName = 'ProjectLookupService';
}
declare module 'shared/services/project-lookup.service' {
  import { ProjectLookupServiceType } from 'shared/services/project-lookup.service-model';
  const projectLookupService: ProjectLookupServiceType;
  export default projectLookupService;
}
declare module 'shared/services/project-data-provider.service' {
  import { ProjectTypes } from 'papi-shared-types';
  import {
    ProjectDataProvider,
    ProjectDataProviderEngineFactory,
  } from 'shared/models/project-data-provider-engine.model';
  import { Dispose } from 'shared/models/disposal.model';
  /**
   * Add a new Project Data Provider Factory to PAPI that uses the given engine. There must not be an
   * existing factory already that handles the same project type or this operation will fail.
   *
   * @param projectType Type of project that pdpEngineFactory supports
   * @param pdpEngineFactory Used in a ProjectDataProviderFactory to create ProjectDataProviders
   * @returns Promise that resolves to a disposable object when the registration operation completes
   */
  export function registerProjectDataProviderEngineFactory<ProjectType extends ProjectTypes>(
    projectType: ProjectType,
    pdpEngineFactory: ProjectDataProviderEngineFactory<ProjectType>,
  ): Promise<Dispose>;
  /**
   * Get a Project Data Provider for the given project ID.
   *
   * @example
   *
   * ```typescript
   * const pdp = await get('ParatextStandard', 'ProjectID12345');
   * pdp.getVerse(new VerseRef('JHN', '1', '1'));
   * ```
   *
   * @param projectType Indicates what you expect the `projectType` to be for the project with the
   *   specified id. The TypeScript type for the returned project data provider will have the project
   *   data provider type associated with this project type. If this argument does not match the
   *   project's actual `projectType` (according to its metadata), a warning will be logged
   * @param projectId ID for the project to load
   * @returns Data provider with types that are associated with the given project type
   */
  export function get<ProjectType extends ProjectTypes>(
    projectType: ProjectType,
    projectId: string,
  ): Promise<ProjectDataProvider[ProjectType]>;
  export interface PapiBackendProjectDataProviderService {
    registerProjectDataProviderEngineFactory: typeof registerProjectDataProviderEngineFactory;
    get: typeof get;
  }
  /**
   *
   * Service that registers and gets project data providers
   */
  export const papiBackendProjectDataProviderService: PapiBackendProjectDataProviderService;
  export interface PapiFrontendProjectDataProviderService {
    get: typeof get;
  }
  /**
   *
   * Service that gets project data providers
   */
  export const papiFrontendProjectDataProviderService: {
    get: typeof get;
  };
}
declare module 'shared/data/file-system.model' {
  /** Types to use with file system operations */
  /**
   * Represents a path in file system or other. Has a scheme followed by :// followed by a relative
   * path. If no scheme is provided, the app scheme is used. Available schemes are as follows:
   *
   * - `app://` - goes to the app's home directory and into `.platform.bible` (platform-dependent)
   * - `cache://` - goes to the app's temporary file cache at `app://cache`
   * - `data://` - goes to the app's data storage location at `app://data`
   * - `resources://` - goes to the resources directory installed in the app
   * - `file://` - an absolute file path from root
   */
  export type Uri = string;
}
declare module 'node/utils/util' {
  import { Uri } from 'shared/data/file-system.model';
  export const FILE_PROTOCOL: string;
  export const RESOURCES_PROTOCOL: string;
  export function resolveHtmlPath(htmlFileName: string): string;
  /**
   * Gets the platform-specific user Platform.Bible folder for this application
   *
   * When running in development: `<repo_directory>/dev-appdata`
   *
   * When packaged: `<user_home_directory>/.platform.bible`
   */
  export const getAppDir: import('memoize-one').MemoizedFn<() => string>;
  /**
   * Resolves the uri to a path
   *
   * @param uri The uri to resolve
   * @returns Real path to the uri supplied
   */
  export function getPathFromUri(uri: Uri): string;
  /**
   * Combines the uri passed in with the paths passed in to make one uri
   *
   * @param uri Uri to start from
   * @param paths Paths to combine into the uri
   * @returns One uri that combines the uri and the paths in left-to-right order
   */
  export function joinUriPaths(uri: Uri, ...paths: string[]): Uri;
}
declare module 'node/services/node-file-system.service' {
  /** File system calls from Node */
  import fs, { BigIntStats } from 'fs';
  import { Uri } from 'shared/data/file-system.model';
  /**
   * Read a text file
   *
   * @param uri URI of file
   * @returns Promise that resolves to the contents of the file
   */
  export function readFileText(uri: Uri): Promise<string>;
  /**
   * Read a binary file
   *
   * @param uri URI of file
   * @returns Promise that resolves to the contents of the file
   */
  export function readFileBinary(uri: Uri): Promise<Buffer>;
  /**
   * Write data to a file
   *
   * @param uri URI of file
   * @param fileContents String or Buffer to write into the file
   * @returns Promise that resolves after writing the file
   */
  export function writeFile(uri: Uri, fileContents: string | Buffer): Promise<void>;
  /**
   * Copies a file from one location to another. Creates the path to the destination if it does not
   * exist
   *
   * @param sourceUri The location of the file to copy
   * @param destinationUri The uri to the file to create as a copy of the source file
   * @param mode Bitwise modifiers that affect how the copy works. See
   *   [`fsPromises.copyFile`](https://nodejs.org/api/fs.html#fspromisescopyfilesrc-dest-mode) for
   *   more information
   */
  export function copyFile(
    sourceUri: Uri,
    destinationUri: Uri,
    mode?: Parameters<typeof fs.promises.copyFile>[2],
  ): Promise<void>;
  /**
   * Delete a file if it exists
   *
   * @param uri URI of file
   * @returns Promise that resolves when the file is deleted or determined to not exist
   */
  export function deleteFile(uri: Uri): Promise<void>;
  /**
   * Get stats about the file or directory. Note that BigInts are used instead of ints to avoid.
   * https://en.wikipedia.org/wiki/Year_2038_problem
   *
   * @param uri URI of file or directory
   * @returns Promise that resolves to object of type https://nodejs.org/api/fs.html#class-fsstats if
   *   file or directory exists, undefined if it doesn't
   */
  export function getStats(uri: Uri): Promise<BigIntStats | undefined>;
  /**
   * Set the last modified and accessed times for the file or directory
   *
   * @param uri URI of file or directory
   * @returns Promise that resolves once the touch operation finishes
   */
  export function touch(uri: Uri, date: Date): Promise<void>;
  /** Type of file system item in a directory */
  export enum EntryType {
    File = 'file',
    Directory = 'directory',
    Unknown = 'unknown',
  }
  /** All entries in a directory, mapped from entry type to array of uris for the entries */
  export type DirectoryEntries = Readonly<{
    [entryType in EntryType]: Uri[];
  }>;
  /**
   * Reads a directory and returns lists of entries in the directory by entry type.
   *
   * @param uri - URI of directory.
   * @param entryFilter - Function to filter out entries in the directory based on their names.
   * @returns Map of entry type to list of uris for each entry in the directory with that type.
   */
  export function readDir(
    uri: Uri,
    entryFilter?: (entryName: string) => boolean,
  ): Promise<DirectoryEntries>;
  /**
   * Create a directory in the file system if it does not exist. Does not throw if it already exists.
   *
   * @param uri URI of directory
   * @returns Promise that resolves once the directory has been created
   */
  export function createDir(uri: Uri): Promise<void>;
  /**
   * Remove a directory and all its contents recursively from the file system
   *
   * @param uri URI of directory
   * @returns Promise that resolves when the delete operation finishes
   */
  export function deleteDir(uri: Uri): Promise<void>;
}
declare module 'node/utils/crypto-util' {
  export function createUuid(): string;
  /**
   * Create a cryptographically secure nonce that is at least 128 bits long. See nonce spec at
   * https://w3c.github.io/webappsec-csp/#security-nonces
   *
   * @param encoding: "base64url" (HTML safe, shorter string) or "hex" (longer string) From
   *   https://base64.guru/standards/base64url, the purpose of this encoding is "the ability to use
   *   the encoding result as filename or URL address"
   * @param numberOfBytes: Number of bytes the resulting nonce should contain
   * @returns Cryptographically secure, pseudo-randomly generated value encoded as a string
   */
  export function createNonce(encoding: 'base64url' | 'hex', numberOfBytes?: number): string;
}
declare module 'node/models/execution-token.model' {
  /** For now this is just for extensions, but maybe we will want to expand this in the future */
  export type ExecutionTokenType = 'extension';
  /** Execution tokens can be passed into API calls to provide context about their identity */
  export class ExecutionToken {
    readonly type: ExecutionTokenType;
    readonly name: string;
    readonly nonce: string;
    constructor(tokenType: ExecutionTokenType, name: string);
    getHash(): string;
  }
}
declare module 'node/services/execution-token.service' {
  import { ExecutionToken } from 'node/models/execution-token.model';
  /**
   * This should be called when extensions are being loaded
   *
   * @param extensionName Name of the extension to register
   * @returns Token that can be passed to `tokenIsValid` to authenticate or authorize API callers. It
   *   is important that the token is not shared to avoid impersonation of API callers.
   */
  function registerExtension(extensionName: string): ExecutionToken;
  /**
   * Remove a registered token. Note that a hash of a token is what is needed to unregister, not the
   * full token itself (notably not the nonce), so something can be delegated the ability to
   * unregister a token without having been given the full token itself.
   *
   * @param extensionName Name of the extension that was originally registered
   * @param tokenHash Value of `getHash()` of the token that was originally registered.
   * @returns `true` if the token was successfully unregistered, `false` otherwise
   */
  function unregisterExtension(extensionName: string, tokenHash: string): boolean;
  /**
   * This should only be needed by services that need to contextualize the response for the caller
   *
   * @param executionToken Token that was previously registered.
   * @returns `true` if the token matches a token that was previous registered, `false` otherwise.
   */
  function tokenIsValid(executionToken: ExecutionToken): boolean;
  const executionTokenService: {
    registerExtension: typeof registerExtension;
    unregisterExtension: typeof unregisterExtension;
    tokenIsValid: typeof tokenIsValid;
  };
  export default executionTokenService;
}
declare module 'extension-host/services/extension-storage.service' {
  import { ExecutionToken } from 'node/models/execution-token.model';
  import { Buffer } from 'buffer';
  /**
   * This is only intended to be called by the extension service. This service cannot call into the
   * extension service or it causes a circular dependency.
   */
  export function setExtensionUris(urisPerExtension: Map<string, string>): void;
  /** Return a path to the specified file within the extension's installation directory */
  export function buildExtensionPathFromName(extensionName: string, fileName: string): string;
  /**
   * Read a text file from the the extension's installation directory
   *
   * @param token ExecutionToken provided to the extension when `activate()` was called
   * @param fileName Name of the file to be read
   * @returns Promise for a string with the contents of the file
   */
  function readTextFileFromInstallDirectory(
    token: ExecutionToken,
    fileName: string,
  ): Promise<string>;
  /**
   * Read a binary file from the the extension's installation directory
   *
   * @param token ExecutionToken provided to the extension when `activate()` was called
   * @param fileName Name of the file to be read
   * @returns Promise for a Buffer with the contents of the file
   */
  function readBinaryFileFromInstallDirectory(
    token: ExecutionToken,
    fileName: string,
  ): Promise<Buffer>;
  /**
   * Read data specific to the user (as identified by the OS) and extension (as identified by the
   * ExecutionToken)
   *
   * @param token ExecutionToken provided to the extension when `activate()` was called
   * @param key Unique identifier of the data
   * @returns Promise for a string containing the data
   */
  function readUserData(token: ExecutionToken, key: string): Promise<string>;
  /**
   * Write data specific to the user (as identified by the OS) and extension (as identified by the
   * ExecutionToken)
   *
   * @param token ExecutionToken provided to the extension when `activate()` was called
   * @param key Unique identifier of the data
   * @param data Data to be written
   * @returns Promise that will resolve if the data is written successfully
   */
  function writeUserData(token: ExecutionToken, key: string, data: string): Promise<void>;
  /**
   * Delete data previously written that is specific to the user (as identified by the OS) and
   * extension (as identified by the ExecutionToken)
   *
   * @param token ExecutionToken provided to the extension when `activate()` was called
   * @param key Unique identifier of the data
   * @returns Promise that will resolve if the data is deleted successfully
   */
  function deleteUserData(token: ExecutionToken, key: string): Promise<void>;
  export interface ExtensionStorageService {
    readTextFileFromInstallDirectory: typeof readTextFileFromInstallDirectory;
    readBinaryFileFromInstallDirectory: typeof readBinaryFileFromInstallDirectory;
    readUserData: typeof readUserData;
    writeUserData: typeof writeUserData;
    deleteUserData: typeof deleteUserData;
  }
  /**
   *
   * This service provides extensions in the extension host the ability to read/write data based on
   * the extension identity and current user (as identified by the OS). This service will not work
   * within the renderer.
   */
  const extensionStorageService: ExtensionStorageService;
  export default extensionStorageService;
}
declare module 'shared/models/dialog-options.model' {
  /** General options to adjust dialogs (created from `papi.dialogs`) */
  export type DialogOptions = {
    /** Dialog title to display in the header. Default depends on the dialog */
    title?: string;
    /** Url of dialog icon to display in the header. Default is Platform.Bible logo */
    iconUrl?: string;
    /** The message to show the user in the dialog. Default depends on the dialog */
    prompt?: string;
  };
  /** Data in each tab that is a dialog. Added to DialogOptions in `dialog.service-host.ts` */
  export type DialogData = DialogOptions & {
    isDialog: true;
  };
}
declare module 'renderer/components/dialogs/dialog-base.data' {
  import { FloatSize, TabLoader, TabSaver } from 'shared/models/docking-framework.model';
  import { DialogData } from 'shared/models/dialog-options.model';
  import { ReactElement } from 'react';
  /** Base type for DialogDefinition. Contains reasonable defaults for dialogs */
  export type DialogDefinitionBase = Readonly<{
    /** Overwritten in {@link DialogDefinition}. Must be specified by all DialogDefinitions */
    tabType?: string;
    /** Overwritten in {@link DialogDefinition}. Must be specified by all DialogDefinitions */
    Component?: (props: DialogProps) => ReactElement;
    /**
     * The default icon for this dialog. This may be overridden by the `DialogOptions.iconUrl`
     *
     * Defaults to the Platform.Bible logo
     */
    defaultIconUrl?: string;
    /**
     * The default title for this dialog. This may be overridden by the `DialogOptions.title`
     *
     * Defaults to the DialogDefinition's `tabType`
     */
    defaultTitle?: string;
    /** The width and height at which the dialog will be loaded in CSS `px` units */
    initialSize: FloatSize;
    /** The minimum width to which the dialog can be set in CSS `px` units */
    minWidth?: number;
    /** The minimum height to which the dialog can be set in CSS `px` units */
    minHeight?: number;
    /**
     * The function used to load the dialog into the dock layout. Default uses the `Component` field
     * and passes in the `DialogProps`
     */
    loadDialog: TabLoader;
    /**
     * The function used to save the dialog into the dock layout
     *
     * Default does not save the dialog as they cannot properly be restored yet.
     *
     * TODO: preserve requests between refreshes - save the dialog info in such a way that it works
     * when loading again after refresh
     */
    saveDialog: TabSaver;
  }>;
  /** Props provided to the dialog component */
  export type DialogProps<TData = unknown> = DialogData & {
    /**
     * Sends the data as a resolved response to the dialog request and closes the dialog
     *
     * @param data Data with which to resolve the request
     */
    submitDialog(data: TData): void;
    /** Cancels the dialog request (resolves the response with `undefined`) and closes the dialog */
    cancelDialog(): void;
    /**
     * Rejects the dialog request with the specified message and closes the dialog
     *
     * @param errorMessage Message to explain why the dialog request was rejected
     */
    rejectDialog(errorMessage: string): void;
  };
  /**
   * Set the functionality of submitting and canceling dialogs. This should be called specifically by
   * `dialog.service-host.ts` immediately on startup and by nothing else. This is only here to
   * mitigate a dependency cycle
   *
   * @param dialogServiceFunctions Functions from the dialog service host for resolving and rejecting
   *   dialogs
   */
  export function hookUpDialogService({
    resolveDialogRequest: resolve,
    rejectDialogRequest: reject,
  }: {
    resolveDialogRequest: (id: string, data: unknown | undefined) => void;
    rejectDialogRequest: (id: string, message: string) => void;
  }): void;
  /**
   * Static definition of a dialog that can be shown in Platform.Bible
   *
   * For good defaults, dialogs can include all the properties of this dialog. Dialogs must then
   * specify `tabType` and `Component` in order to comply with `DialogDefinition`
   *
   * Note: this is not a class that can be inherited because all properties would be static but then
   * we would not be able to use the default `loadDialog` because it would be using a static reference
   * to a nonexistent `Component`. Instead of inheriting this as a class, any dialog definition can
   * spread this `{ ...DIALOG_BASE }`
   */
  const DIALOG_BASE: DialogDefinitionBase;
  export default DIALOG_BASE;
}
declare module 'renderer/components/dialogs/dialog-definition.model' {
  import { DialogOptions } from 'shared/models/dialog-options.model';
  import { DialogDefinitionBase, DialogProps } from 'renderer/components/dialogs/dialog-base.data';
  import { ReactElement } from 'react';
  /** The tabType for the select project dialog in `select-project.dialog.tsx` */
  export const SELECT_PROJECT_DIALOG_TYPE = 'platform.selectProject';
  /** The tabType for the select multiple projects dialog in `select-multiple-projects.dialog.tsx` */
  export const SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE = 'platform.selectMultipleProjects';
  /** Options to provide when showing the Select Project dialog */
  export type SelectProjectDialogOptions = DialogOptions & {
    /** Project IDs to exclude from showing in the dialog */
    excludeProjectIds?: string[];
  };
  /** Options to provide when showing the Select Multiple Project dialog */
  export type SelectMultipleProjectsDialogOptions = DialogOptions & {
    /** Project IDs to exclude from showing in the dialog */
    excludeProjectIds?: string[];
    /** Project IDs that should start selected in the dialog */
    selectedProjectIds?: string[];
  };
  /**
   * Mapped type for dialog functions to use in getting various types for dialogs
   *
   * Keys should be dialog names, and values should be {@link DialogDataTypes}
   *
   * If you add a dialog here, you must also add it on {@link DIALOGS}
   */
  export interface DialogTypes {
    [SELECT_PROJECT_DIALOG_TYPE]: DialogDataTypes<SelectProjectDialogOptions, string>;
    [SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE]: DialogDataTypes<
      SelectMultipleProjectsDialogOptions,
      string[]
    >;
  }
  /** Each type of dialog. These are the tab types used in the dock layout */
  export type DialogTabTypes = keyof DialogTypes;
  /** Types related to a specific dialog */
  export type DialogDataTypes<TOptions extends DialogOptions, TReturnType> = {
    /**
     * The dialog options to specify when calling the dialog. Passed into `loadDialog` as
     * SavedTabInfo.data
     *
     * The default implementation of `loadDialog` passes all the options down to the dialog component
     * as props
     */
    options: TOptions;
    /** The type of the response to the dialog request */
    responseType: TReturnType;
    /** Props provided to the dialog component */
    props: DialogProps<TReturnType> & TOptions;
  };
  export type DialogDefinition<DialogTabType extends DialogTabTypes> = Readonly<
    DialogDefinitionBase & {
      /**
       * Type of tab - indicates what kind of built-in dock layout tab this dialog definition
       * represents
       */
      tabType: DialogTabType;
      /**
       * React component to render for this dialog
       *
       * This must be specified only if you do not overwrite the default `loadDialog`
       *
       * @param props Props that will be passed through from the dialog tab's data
       * @returns React element to render
       */
      Component: (
        props: DialogProps<DialogTypes[DialogTabType]['responseType']> &
          DialogTypes[DialogTabType]['options'],
      ) => ReactElement;
    }
  >;
}
declare module 'shared/services/dialog.service-model' {
  import { DialogTabTypes, DialogTypes } from 'renderer/components/dialogs/dialog-definition.model';
  import { DialogOptions } from 'shared/models/dialog-options.model';
  /**
   *
   * Prompt the user for responses with dialogs
   */
  export interface DialogService {
    /**
     * Shows a dialog to the user and prompts the user to respond
     *
     * @type `TReturn` - The type of data the dialog responds with
     * @param dialogType The type of dialog to show the user
     * @param options Various options for configuring the dialog that shows
     * @returns Returns the user's response or `undefined` if the user cancels
     */
    showDialog<DialogTabType extends DialogTabTypes>(
      dialogType: DialogTabType,
      options?: DialogTypes[DialogTabType]['options'],
    ): Promise<DialogTypes[DialogTabType]['responseType'] | undefined>;
    /**
     * Shows a select project dialog to the user and prompts the user to select a dialog
     *
     * @param options Various options for configuring the dialog that shows
     * @returns Returns the user's selected project id or `undefined` if the user cancels
     */
    selectProject(options?: DialogOptions): Promise<string | undefined>;
  }
  /** Prefix on requests that indicates that the request is related to dialog operations */
  export const CATEGORY_DIALOG = 'dialog';
}
declare module 'shared/services/dialog.service' {
  import { DialogService } from 'shared/services/dialog.service-model';
  const dialogService: DialogService;
  export default dialogService;
}
declare module '@papi/backend' {
  /**
   * Unified module for accessing API features in the extension host.
   *
   * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
   */
  import PapiEventEmitter from 'shared/models/papi-event-emitter.model';
  import * as commandService from 'shared/services/command.service';
  import * as papiUtil from 'shared/utils/papi-util';
  import { PapiNetworkService } from 'shared/services/network.service';
  import { WebViewServiceType } from 'shared/services/web-view.service-model';
  import { PapiWebViewProviderService } from 'shared/services/web-view-provider.service';
  import { InternetService } from 'shared/services/internet.service';
  import {
    DataProviderService,
    DataProviderEngine as PapiDataProviderEngine,
  } from 'shared/services/data-provider.service';
  import { PapiBackendProjectDataProviderService } from 'shared/services/project-data-provider.service';
  import { ExtensionStorageService } from 'extension-host/services/extension-storage.service';
  import { ProjectLookupServiceType } from 'shared/services/project-lookup.service-model';
  import { DialogService } from 'shared/services/dialog.service-model';
  const papi: {
    /**
     *
     * Event manager - accepts subscriptions to an event and runs the subscription callbacks when the
     * event is emitted Use eventEmitter.event(callback) to subscribe to the event. Use
     * eventEmitter.emit(event) to run the subscriptions. Generally, this EventEmitter should be
     * private, and its event should be public. That way, the emitter is not publicized, but anyone can
     * subscribe to the event.
     */
    EventEmitter: typeof PapiEventEmitter;
    /**
     *
     * Abstract class that provides a placeholder `notifyUpdate` for data provider engine classes. If a
     * data provider engine class extends this class, it doesn't have to specify its own `notifyUpdate`
     * function in order to use `notifyUpdate`.
     *
     * @see IDataProviderEngine for more information on extending this class.
     */
    DataProviderEngine: typeof PapiDataProviderEngine;
    /** This is just an alias for internet.fetch */
    fetch: typeof globalThis.fetch;
    /**
     *
     * The command service allows you to exchange messages with other components in the platform. You
     * can register a command that other services and extensions can send you. You can send commands to
     * other services and extensions that have registered commands.
     */
    commands: typeof commandService;
    /**
     *
     * PapiUtil is a collection of functions, objects, and types that are used as helpers in other
     * services. Extensions should not use or rely on anything in papiUtil unless some other service
     * requires it.
     */
    utils: typeof papiUtil;
    /**
     *
     * Service exposing various functions related to using webViews
     *
     * WebViews are iframes in the Platform.Bible UI into which extensions load frontend code, either
     * HTML or React components.
     */
    webViews: WebViewServiceType;
    /**
     *
     * Interface for registering webView providers
     */
    webViewProviders: PapiWebViewProviderService;
    /**
     *
     * Prompt the user for responses with dialogs
     */
    dialogs: DialogService;
    /**
     *
     * Service that provides a way to send and receive network events
     */
    network: PapiNetworkService;
    /**
     *
     * All extensions and services should use this logger to provide a unified output of logs
     */
    logger: import('electron-log').MainLogger & {
      default: import('electron-log').MainLogger;
    };
    /**
     *
     * Service that provides a way to call `fetch` since the original function is not available
     */
    internet: InternetService;
    /**
     *
     * Service that allows extensions to send and receive data to/from other extensions
     */
    dataProviders: DataProviderService;
    /**
     *
     * Service that registers and gets project data providers
     */
    projectDataProviders: PapiBackendProjectDataProviderService;
    /**
     *
     * Provides metadata for projects known by the platform
     */
    projectLookup: ProjectLookupServiceType;
    /**
     *
     * This service provides extensions in the extension host the ability to read/write data based on
     * the extension identity and current user (as identified by the OS). This service will not work
     * within the renderer.
     */
    storage: ExtensionStorageService;
  };
  export default papi;
  /**
   *
   * Event manager - accepts subscriptions to an event and runs the subscription callbacks when the
   * event is emitted Use eventEmitter.event(callback) to subscribe to the event. Use
   * eventEmitter.emit(event) to run the subscriptions. Generally, this EventEmitter should be
   * private, and its event should be public. That way, the emitter is not publicized, but anyone can
   * subscribe to the event.
   */
  export const EventEmitter: typeof PapiEventEmitter;
  /**
   *
   * Abstract class that provides a placeholder `notifyUpdate` for data provider engine classes. If a
   * data provider engine class extends this class, it doesn't have to specify its own `notifyUpdate`
   * function in order to use `notifyUpdate`.
   *
   * @see IDataProviderEngine for more information on extending this class.
   */
  export const DataProviderEngine: typeof PapiDataProviderEngine;
  /** This is just an alias for internet.fetch */
  export const fetch: typeof globalThis.fetch;
  /**
   *
   * The command service allows you to exchange messages with other components in the platform. You
   * can register a command that other services and extensions can send you. You can send commands to
   * other services and extensions that have registered commands.
   */
  export const commands: typeof commandService;
  /**
   *
   * PapiUtil is a collection of functions, objects, and types that are used as helpers in other
   * services. Extensions should not use or rely on anything in papiUtil unless some other service
   * requires it.
   */
  export const utils: typeof papiUtil;
  /**
   *
   * Service exposing various functions related to using webViews
   *
   * WebViews are iframes in the Platform.Bible UI into which extensions load frontend code, either
   * HTML or React components.
   */
  export const webViews: WebViewServiceType;
  /**
   *
   * Interface for registering webView providers
   */
  export const webViewProviders: PapiWebViewProviderService;
  /**
   *
   * Prompt the user for responses with dialogs
   */
  export const dialogs: DialogService;
  /**
   *
   * Service that provides a way to send and receive network events
   */
  export const network: PapiNetworkService;
  /**
   *
   * All extensions and services should use this logger to provide a unified output of logs
   */
  export const logger: import('electron-log').MainLogger & {
    default: import('electron-log').MainLogger;
  };
  /**
   *
   * Service that provides a way to call `fetch` since the original function is not available
   */
  export const internet: InternetService;
  /**
   *
   * Service that allows extensions to send and receive data to/from other extensions
   */
  export const dataProviders: DataProviderService;
  /**
   *
   * Service that registers and gets project data providers
   */
  export const projectDataProviders: PapiBackendProjectDataProviderService;
  /**
   *
   * Provides metadata for projects known by the platform
   */
  export const projectLookup: ProjectLookupServiceType;
  /**
   *
   * This service provides extensions in the extension host the ability to read/write data based on
   * the extension identity and current user (as identified by the OS). This service will not work
   * within the renderer.
   */
  export const storage: ExtensionStorageService;
}
declare module 'extension-host/extension-types/extension-activation-context.model' {
  import { ExecutionToken } from 'node/models/execution-token.model';
  import UnsubscriberAsyncList from 'shared/utils/unsubscriber-async-list';
  /** An object of this type is passed into `activate()` for each extension during initialization */
  export type ExecutionActivationContext = {
    /** Canonical name of the extension */
    name: string;
    /** Used to save and load data from the storage service. */
    executionToken: ExecutionToken;
    /** Tracks all registrations made by an extension so they can be cleaned up when it is unloaded */
    registrations: UnsubscriberAsyncList;
  };
}
declare module 'extension-host/extension-types/extension.interface' {
  import { UnsubscriberAsync } from 'shared/utils/papi-util';
  import { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
  /** Interface for all extensions to implement */
  export interface IExtension {
    /**
     * Sets up this extension! Runs when paranext wants this extension to activate. For example,
     * activate() should register commands for this extension
     *
     * @param context Data and utilities that are specific to this particular extension
     */
    activate: (context: ExecutionActivationContext) => Promise<void>;
    /**
     * Deactivate anything in this extension that is not covered by the registrations in the context
     * object given to activate().
     *
     * @returns Promise that resolves to true if successfully deactivated
     */
    deactivate?: UnsubscriberAsync;
  }
}
declare module 'extension-host/extension-types/extension-manifest.model' {
  /** Information about an extension provided by the extension developer. */
  export type ExtensionManifest = {
    /** Name of the extension */
    name: string;
    /**
     * Extension version - expected to be [semver](https://semver.org/) like `"0.1.3"`.
     *
     * Note: semver may become a hard requirement in the future, so we recommend using it now.
     */
    version: string;
    /**
     * Path to the JavaScript file to run in the extension host. Relative to the extension's root
     * folder.
     *
     * Must be specified. Can be an empty string if the extension does not have any JavaScript to run.
     */
    main: string;
    /**
     * Path to the TypeScript type declaration file that describes this extension and its interactions
     * on the PAPI. Relative to the extension's root folder.
     *
     * If not provided, Platform.Bible will look in the following locations:
     *
     * 1. `<extension_name>.d.ts`
     * 2. `<extension_name><other_stuff>.d.ts`
     * 3. `index.d.ts`
     *
     * See [Extension Anatomy - Type Declaration
     * Files](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#type-declaration-files-dts)
     * for more information about extension type declaration files.
     */
    types?: string;
    /**
     * List of events that occur that should cause this extension to be activated. Not yet
     * implemented.
     */
    activationEvents: string[];
  };
}
declare module 'shared/services/settings.service' {
  import { Unsubscriber } from 'shared/utils/papi-util';
  import { SettingNames, SettingTypes } from 'papi-shared-types';
  /** Event to set or update a setting */
  export type UpdateSettingEvent<SettingName extends SettingNames> = {
    type: 'update-setting';
    setting: SettingTypes[SettingName];
  };
  /** Event to remove a setting */
  export type ResetSettingEvent = {
    type: 'reset-setting';
  };
  /** All supported setting events */
  export type SettingEvent<SettingName extends SettingNames> =
    | UpdateSettingEvent<SettingName>
    | ResetSettingEvent;
  /**
   * Retrieves the value of the specified setting
   *
   * @param key The string id of the setting for which the value is being retrieved
   * @param defaultSetting The default value used for the setting if no value is available for the key
   * @returns The value of the specified setting, parsed to an object. Returns `undefined` if setting
   *   is not present or no value is available
   * @throws When defaultSetting is required but not provided
   */
  const getSetting: <SettingName extends keyof SettingTypes>(
    key: SettingName,
    defaultSetting: SettingTypes[SettingName],
  ) => SettingTypes[SettingName];
  /**
   * Sets the value of the specified setting
   *
   * @param key The string id of the setting for which the value is being retrieved
   * @param newSetting The value that is to be stored. Setting the new value to `undefined` is the
   *   equivalent of deleting the setting
   */
  const setSetting: <SettingName extends keyof SettingTypes>(
    key: SettingName,
    newSetting: SettingTypes[SettingName],
  ) => void;
  /**
   * Removes the setting from memory
   *
   * @param key The string id of the setting for which the value is being removed
   */
  const resetSetting: <SettingName extends keyof SettingTypes>(key: SettingName) => void;
  /**
   * Subscribes to updates of the specified setting. Whenever the value of the setting changes, the
   * callback function is executed.
   *
   * @param key The string id of the setting for which the value is being subscribed to
   * @param callback The function that will be called whenever the specified setting is updated
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  const subscribeToSetting: <SettingName extends keyof SettingTypes>(
    key: SettingName,
    callback: (newSetting: SettingEvent<SettingName>) => void,
  ) => Unsubscriber;
  export interface SettingsService {
    get: typeof getSetting;
    set: typeof setSetting;
    reset: typeof resetSetting;
    subscribe: typeof subscribeToSetting;
  }
  /**
   *
   * Service that allows to get and set settings in local storage
   */
  const settingsService: SettingsService;
  export default settingsService;
}
declare module 'renderer/hooks/papi-hooks/use-promise.hook' {
  /**
   * Awaits a promise and returns a loading value while the promise is unresolved
   *
   * @param promiseFactoryCallback A function that returns the promise to await. If this callback is
   *   undefined, the current value will be returned (defaultValue unless it was previously changed
   *   and preserveValue is true), and there will be no loading.
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
   *   every render
   * @param defaultValue The initial value to return while first awaiting the promise. If
   *   preserveValue is false, this value is also shown while awaiting the promise on subsequent
   *   calls.
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param preserveValue Whether to leave the value as the most recent resolved promise value or set
   *   it back to defaultValue while running the promise again. Default to true
   * @returns `[value, isLoading]`
   *
   *   - `value`: the current value for the promise, either the defaultValue or the resolved promise value
   *   - `isLoading`: whether the promise is waiting to be resolved
   */
  const usePromise: <T>(
    promiseFactoryCallback: (() => Promise<T>) | undefined,
    defaultValue: T,
    preserveValue?: boolean,
  ) => [value: T, isLoading: boolean];
  export default usePromise;
}
declare module 'renderer/hooks/papi-hooks/use-event.hook' {
  import { PapiEvent, PapiEventHandler } from 'shared/models/papi-event.model';
  /**
   * Adds an event handler to an event so the event handler runs when the event is emitted
   *
   * @param event The event to subscribe to. Can be either a string or an Event
   *
   *   - If event is a `string`, the network event associated with this type will automatically be used
   *   - If event is a `PapiEvent`, that event will be used
   *   - If event is undefined, the callback will not be subscribed. Useful if the event is not yet
   *       available for example
   *
   * @param eventHandler The callback to run when the event is emitted
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
   *   every render
   */
  const useEvent: <T>(
    event: string | PapiEvent<T> | undefined,
    eventHandler: PapiEventHandler<T>,
  ) => void;
  export default useEvent;
}
declare module 'renderer/hooks/papi-hooks/use-event-async.hook' {
  import { PapiEvent, PapiEventAsync, PapiEventHandler } from 'shared/models/papi-event.model';
  /**
   * Adds an event handler to an asynchronously subscribing/unsubscribing event so the event handler
   * runs when the event is emitted
   *
   * @param event The asynchronously (un)subscribing event to subscribe to. Can be either a string or
   *   an Event
   *
   *   - If event is a `string`, the network event associated with this type will automatically be used
   *   - If event is a `PapiEvent` or `PapiEventAsync`, that event will be used
   *   - If event is undefined, the callback will not be subscribed. Useful if the event is not yet
   *       available for example
   *
   * @param eventHandler The callback to run when the event is emitted
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
   *   every render
   */
  const useEventAsync: <T>(
    event: string | PapiEvent<T> | PapiEventAsync<T> | undefined,
    eventHandler: PapiEventHandler<T>,
  ) => void;
  export default useEventAsync;
}
declare module 'renderer/hooks/hook-generators/create-use-network-object-hook.util' {
  import { NetworkObject } from 'shared/models/network-object.model';
  /**
   * This function takes in a getNetworkObject function and creates a hook with that function in it
   * which will return a network object
   *
   * @param getNetworkObject A function that takes in an id string and returns a network object
   * @param mapParametersToNetworkObjectSource Function that takes the parameters passed into the hook
   *   and returns the `networkObjectSource` associated with those parameters. Defaults to taking the
   *   first parameter passed into the hook and using that as the `networkObjectSource`.
   *
   *   - Note: `networkObjectSource` is string name of the network object to get OR `networkObject`
   *       (result of this hook, if you want this hook to just return the network object again)
   *
   * @returns A function that takes in a networkObjectSource and returns a NetworkObject
   */
  function createUseNetworkObjectHook<THookParams extends unknown[]>(
    getNetworkObject: (...args: THookParams) => Promise<NetworkObject<object> | undefined>,
    mapParametersToNetworkObjectSource?: (
      ...args: THookParams
    ) => string | NetworkObject<object> | undefined,
  ): (...args: THookParams) => NetworkObject<object> | undefined;
  export default createUseNetworkObjectHook;
}
declare module 'renderer/hooks/papi-hooks/use-data-provider.hook' {
  import { DataProviders } from 'papi-shared-types';
  /**
   * Gets a data provider with specified provider name
   *
   * @type `T` - The type of data provider to return. Use `IDataProvider<TDataProviderDataTypes>`,
   *   specifying your own types, or provide a custom data provider type
   * @param dataProviderSource String name of the data provider to get OR dataProvider (result of
   *   useDataProvider, if you want this hook to just return the data provider again)
   * @returns Undefined if the data provider has not been retrieved, data provider if it has been
   *   retrieved and is not disposed, and undefined again if the data provider is disposed
   */
  const useDataProvider: <DataProviderName extends keyof DataProviders>(
    dataProviderSource: DataProviderName | DataProviders[DataProviderName] | undefined,
  ) => DataProviders[DataProviderName] | undefined;
  export default useDataProvider;
}
declare module 'renderer/hooks/hook-generators/create-use-data-hook.util' {
  import {
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  import IDataProvider from 'shared/models/data-provider.interface';
  import ExtractDataProviderDataTypes from 'shared/models/extract-data-provider-data-types.model';
  /**
   * The final function called as part of the `useData` hook that is the actual React hook
   *
   * This is the `.Greeting(...)` part of `useData('helloSomeone.people').Greeting(...)`
   */
  type UseDataFunctionWithProviderType<
    TDataProvider extends IDataProvider<any>,
    TDataType extends keyof ExtractDataProviderDataTypes<TDataProvider>,
  > = (
    selector: ExtractDataProviderDataTypes<TDataProvider>[TDataType]['selector'],
    defaultValue: ExtractDataProviderDataTypes<TDataProvider>[TDataType]['getData'],
    subscriberOptions?: DataProviderSubscriberOptions,
  ) => [
    ExtractDataProviderDataTypes<TDataProvider>[TDataType]['getData'],
    (
      | ((
          newData: ExtractDataProviderDataTypes<TDataProvider>[TDataType]['setData'],
        ) => Promise<DataProviderUpdateInstructions<ExtractDataProviderDataTypes<TDataProvider>>>)
      | undefined
    ),
    boolean,
  ];
  /**
   * A proxy that serves the actual hooks for a single data provider
   *
   * This is the `useData('helloSomeone.people')` part of
   * `useData('helloSomeone.people').Greeting(...)`
   */
  type UseDataProxy<TDataProvider extends IDataProvider<any>> = {
    [TDataType in keyof ExtractDataProviderDataTypes<TDataProvider>]: UseDataFunctionWithProviderType<
      TDataProvider,
      TDataType
    >;
  };
  /**
   * React hook to use data provider data with various data types
   *
   * @example `useData('helloSomeone.people').Greeting('Bill', 'Greeting loading')`
   *
   * @type `TDataProvider` - The type of data provider to get. Use
   *   `IDataProvider<TDataProviderDataTypes>`, specifying your own types, or provide a custom data
   *   provider type
   */
  type UseDataHookGeneric<TUseDataProviderParams extends unknown[]> = {
    <TDataProvider extends IDataProvider<any>>(
      ...args: TUseDataProviderParams
    ): UseDataProxy<TDataProvider>;
  };
  /**
   * Create a `useData(...).DataType(selector, defaultValue, options)` hook for a specific subset of
   * data providers as supported by `useDataProviderHook`
   *
   * @param useDataProviderHook Hook that gets a data provider from a specific subset of data
   *   providers
   * @returns `useData` hook for getting data from a data provider
   */
  function createUseDataHook<TUseDataProviderParams extends unknown[]>(
    useDataProviderHook: (...args: TUseDataProviderParams) => IDataProvider | undefined,
  ): UseDataHookGeneric<TUseDataProviderParams>;
  export default createUseDataHook;
}
declare module 'renderer/hooks/papi-hooks/use-data.hook' {
  import {
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  import { DataProviderNames, DataProviderTypes, DataProviders } from 'papi-shared-types';
  /**
   * React hook to use data from a data provider
   *
   * @example `useData('helloSomeone.people').Greeting('Bill', 'Greeting loading')`
   */
  type UseDataHook = {
    <DataProviderName extends DataProviderNames>(
      dataProviderSource: DataProviderName | DataProviders[DataProviderName] | undefined,
    ): {
      [TDataType in keyof DataProviderTypes[DataProviderName]]: (
        // @ts-ignore TypeScript pretends it can't find `selector`, but it works just fine
        selector: DataProviderTypes[DataProviderName][TDataType]['selector'],
        // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
        defaultValue: DataProviderTypes[DataProviderName][TDataType]['getData'],
        subscriberOptions?: DataProviderSubscriberOptions,
      ) => [
        // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
        DataProviderTypes[DataProviderName][TDataType]['getData'],
        (
          | ((
              // @ts-ignore TypeScript pretends it can't find `setData`, but it works just fine
              newData: DataProviderTypes[DataProviderName][TDataType]['setData'],
            ) => Promise<DataProviderUpdateInstructions<DataProviderTypes[DataProviderName]>>)
          | undefined
        ),
        boolean,
      ];
    };
  };
  /**
   * ```typescript
   * useData<DataProviderName extends DataProviderNames>(
   *     dataProviderSource: DataProviderName | DataProviders[DataProviderName] | undefined,
   *   ).DataType(
   *       selector: DataProviderTypes[DataProviderName][DataType]['selector'],
   *       defaultValue: DataProviderTypes[DataProviderName][DataType]['getData'],
   *       subscriberOptions?: DataProviderSubscriberOptions,
   *     ) => [
   *       DataProviderTypes[DataProviderName][DataType]['getData'],
   *       (
   *         | ((
   *             newData: DataProviderTypes[DataProviderName][DataType]['setData'],
   *           ) => Promise<DataProviderUpdateInstructions<DataProviderTypes[DataProviderName]>>)
   *         | undefined
   *       ),
   *       boolean,
   *     ]
   * ```
   *
   * React hook to use data from a data provider. Subscribes to run a callback on a data provider's
   * data with specified selector on the specified data type that data provider serves.
   *
   * Usage: Specify the data provider and the data type on the data provider with
   * `useData('<data_provider>').<data_type>` and use like any other React hook.
   *
   * _＠example_ Subscribing to Verse data at JHN 11:35 on the `'quickVerse.quickVerse'` data provider:
   *
   * ```typescript
   * const [verseText, setVerseText, verseTextIsLoading] = useData('quickVerse.quickVerse').Verse(
   *   'JHN 11:35',
   *   'Verse text goes here',
   * );
   * ```
   *
   * _＠param_ `dataProviderSource` string name of data provider to get OR dataProvider (result of
   * useDataProvider if you want to consolidate and only get the data provider once)
   *
   * _＠param_ `selector` tells the provider what data this listener is listening for
   *
   * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   * updated every render
   *
   * _＠param_ `defaultValue` the initial value to return while first awaiting the data
   *
   * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   * updated every render
   *
   * _＠param_ `subscriberOptions` various options to adjust how the subscriber emits updates
   *
   * WARNING: If provided, MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference
   * must not be updated every render
   *
   * _＠returns_ `[data, setData, isLoading]`
   *
   * - `data`: the current value for the data from the data provider with the specified data type and
   *   selector, either the defaultValue or the resolved data
   * - `setData`: asynchronous function to request that the data provider update the data at this data
   *   type and selector. Returns true if successful. Note that this function does not update the
   *   data. The data provider sends out an update to this subscription if it successfully updates
   *   data.
   * - `isLoading`: whether the data with the data type and selector is awaiting retrieval from the data
   *   provider
   */
  const useData: UseDataHook;
  export default useData;
}
declare module 'renderer/hooks/papi-hooks/use-setting.hook' {
  import { SettingTypes } from 'papi-shared-types';
  /**
   * Gets, sets and resets a setting on the papi. Also notifies subscribers when the setting changes
   * and gets updated when the setting is changed by others.
   *
   * @param key The string id that is used to store the setting in local storage
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param defaultState The default state of the setting. If the setting already has a value set to
   *   it in local storage, this parameter will be ignored.
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @returns `[setting, setSetting, resetSetting]`
   *
   *   - `setting`: The current state of the setting, either the defaultState or the stored state on the
   *       papi, if any
   *   - `setSetting`: Function that updates the setting to a new value
   *   - `resetSetting`: Function that removes the setting
   *
   * @throws When subscription callback function is called with an update that has an unexpected
   *   message type
   */
  const useSetting: <SettingName extends keyof SettingTypes>(
    key: SettingName,
    defaultState: SettingTypes[SettingName],
  ) => [SettingTypes[SettingName], (newSetting: SettingTypes[SettingName]) => void, () => void];
  export default useSetting;
}
declare module 'renderer/hooks/papi-hooks/use-project-data-provider.hook' {
  import { ProjectDataTypes } from 'papi-shared-types';
  import IDataProvider from 'shared/models/data-provider.interface';
  /**
   * Gets a project data provider with specified provider name
   *
   * @param projectType Indicates what you expect the `projectType` to be for the project with the
   *   specified id. The TypeScript type for the returned project data provider will have the project
   *   data provider type associated with this project type. If this argument does not match the
   *   project's actual `projectType` (according to its metadata), a warning will be logged
   * @param projectDataProviderSource String name of the id of the project to get OR
   *   projectDataProvider (result of useProjectDataProvider, if you want this hook to just return the
   *   data provider again)
   * @returns `undefined` if the project data provider has not been retrieved, the requested project
   *   data provider if it has been retrieved and is not disposed, and undefined again if the project
   *   data provider is disposed
   */
  const useProjectDataProvider: <ProjectType extends keyof ProjectDataTypes>(
    projectType: ProjectType,
    projectDataProviderSource: string | IDataProvider<ProjectDataTypes[ProjectType]> | undefined,
  ) => IDataProvider<ProjectDataTypes[ProjectType]> | undefined;
  export default useProjectDataProvider;
}
declare module 'renderer/hooks/papi-hooks/use-project-data.hook' {
  import {
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  import IDataProvider from 'shared/models/data-provider.interface';
  import { ProjectDataTypes, ProjectTypes } from 'papi-shared-types';
  /**
   * React hook to use data from a project data provider
   *
   * @example `useProjectData('ParatextStandard', 'project id').VerseUSFM(...);`
   */
  type UseProjectDataHook = {
    <ProjectType extends ProjectTypes>(
      projectType: ProjectType,
      projectDataProviderSource: string | IDataProvider<ProjectDataTypes[ProjectType]> | undefined,
    ): {
      [TDataType in keyof ProjectDataTypes[ProjectType]]: (
        // @ts-ignore TypeScript pretends it can't find `selector`, but it works just fine
        selector: ProjectDataTypes[ProjectType][TDataType]['selector'],
        // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
        defaultValue: ProjectDataTypes[ProjectType][TDataType]['getData'],
        subscriberOptions?: DataProviderSubscriberOptions,
      ) => [
        // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
        ProjectDataTypes[ProjectType][TDataType]['getData'],
        (
          | ((
              // @ts-ignore TypeScript pretends it can't find `setData`, but it works just fine
              newData: ProjectDataTypes[ProjectType][TDataType]['setData'],
            ) => Promise<DataProviderUpdateInstructions<ProjectDataTypes[ProjectType]>>)
          | undefined
        ),
        boolean,
      ];
    };
  };
  /**
   * ```typescript
   * useProjectData<ProjectType extends ProjectTypes>(
   *     projectType: ProjectType,
   *     projectDataProviderSource: string | IDataProvider<ProjectDataTypes[ProjectType]> | undefined,
   *   ).DataType(
   *       selector: ProjectDataTypes[ProjectType][DataType]['selector'],
   *       defaultValue: ProjectDataTypes[ProjectType][DataType]['getData'],
   *       subscriberOptions?: DataProviderSubscriberOptions,
   *     ) => [
   *       ProjectDataTypes[ProjectType][DataType]['getData'],
   *       (
   *         | ((
   *             newData: ProjectDataTypes[ProjectType][DataType]['setData'],
   *           ) => Promise<DataProviderUpdateInstructions<ProjectDataTypes[ProjectType]>>)
   *         | undefined
   *       ),
   *       boolean,
   *     ]
   * ```
   *
   * React hook to use data from a project data provider. Subscribes to run a callback on a project
   * data provider's data with specified selector on the specified data type that the project data
   * provider serves according to its `projectType`.
   *
   * Usage: Specify the project type, the project id, and the data type on the project data provider
   * with `useProjectData('<project_type>', '<project_id>').<data_type>` and use like any other React
   * hook.
   *
   * _＠example_ Subscribing to Verse USFM info at JHN 11:35 on a `ParatextStandard` project with
   * projectId `32664dc3288a28df2e2bb75ded887fc8f17a15fb`:
   *
   * ```typescript
   * const [verse, setVerse, verseIsLoading] = useProjectData(
   *   'ParatextStandard',
   *   '32664dc3288a28df2e2bb75ded887fc8f17a15fb',
   * ).VerseUSFM(
   *   useMemo(() => new VerseRef('JHN', '11', '35', ScrVers.English), []),
   *   'Loading verse ',
   * );
   * ```
   *
   * _＠param_ `projectType` Indicates what you expect the `projectType` to be for the project with the
   * specified id. The TypeScript type for the returned project data provider will have the project
   * data provider type associated with this project type. If this argument does not match the
   * project's actual `projectType` (according to its metadata), a warning will be logged
   *
   * _＠param_ `projectDataProviderSource` String name of the id of the project to get OR
   * projectDataProvider (result of useProjectDataProvider if you want to consolidate and only get the
   * project data provider once)
   *
   * _＠param_ `selector` tells the provider what data this listener is listening for
   *
   * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   * updated every render
   *
   * _＠param_ `defaultValue` the initial value to return while first awaiting the data
   *
   * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   * updated every render
   *
   * _＠param_ `subscriberOptions` various options to adjust how the subscriber emits updates
   *
   * WARNING: If provided, MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference
   * must not be updated every render
   *
   * _＠returns_ `[data, setData, isLoading]`
   */
  const useProjectData: UseProjectDataHook;
  export default useProjectData;
}
declare module 'renderer/hooks/papi-hooks/use-dialog-callback.hook' {
  import { DialogTabTypes, DialogTypes } from 'renderer/components/dialogs/dialog-definition.model';
  /**
   * Enables using `papi.dialogs.showDialog` in React more easily. Provides a callback to run to get a
   * response from a dialog as well as states that indicate the dialog's response and whether the
   * dialog is open.
   *
   * Calling the dialog callback returned from this hook does nothing if you already previously opened
   * the dialog and have not received a response
   *
   * @type `DialogTabType` The dialog type you are using. Should be inferred by parameters
   * @type `TResponse` The type that the response can be. If you do not specify a `defaultResponse`,
   *   this can be the dialog response type or `undefined`. If you specify a `defaultResponse`, this
   *   will be just the dialog response type. Should be inferred by parameters.
   *
   *   - This mostly works. Unfortunately, if you specify a literal as `defaultResponse`, `TResponse` then
   *       becomes that literal instead of being the dialog response type. You can type assert it to
   *       the appropriate type. Let us know if you run into an issue with this!
   *
   * @param dialogType Dialog type you want to show on the screen
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param options Various options for configuring the dialog that shows
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param defaultResponse The starting value for the response. Once a response is received, this is
   *   no longer used. Defaults to `undefined`
   * @returns `[response, showDialogCallback, errorMessage, isShowingDialog]`
   *
   *   - `response` - the response from the dialog or `defaultResponse` if a response has not been
   *       received (does not reset to `defaultResponse` if the user cancels the dialog). DOES NOT
   *       reset every time the callback is run
   *   - `showDialogCallback` - callback to run to show the dialog to prompt the user for a response. If
   *       this callback is run while the dialog is open, nothing happens
   *   - `errorMessage` - the error from the dialog if there is an error while calling the dialog or
   *       `undefined` if there is no error. DOES reset to `undefined` every time the callback is run
   *   - `isShowingDialog` - whether this dialog is showing (the callback has been run but has not
   *       responded)
   */
  function useDialogCallback<
    DialogTabType extends DialogTabTypes,
    TResponse extends DialogTypes[DialogTabType]['responseType'] | undefined =
      | DialogTypes[DialogTabType]['responseType']
      | undefined,
  >(
    dialogType: DialogTabType,
    options?: DialogTypes[DialogTabType]['options'],
    defaultResponse?: TResponse,
  ): [TResponse, () => Promise<void>, string | undefined, boolean];
  export default useDialogCallback;
}
declare module 'renderer/hooks/papi-hooks/use-data-provider-multi.hook' {
  import { DataProviderNames, DataProviders } from 'papi-shared-types';
  /**
   * Gets an array of data providers based on an array of input sources
   *
   * @type `T` - The types of data providers to return. Use `IDataProvider<TDataProviderDataTypes>`,
   *   specifying your own types, or provide a custom data provider type for each item in the array.
   *   Note that if you provide more than one data type, each item in the returned array will be
   *   considered to be any of those types. For example, if you call `useDataProviderMulti<Type1,
   *   Type2>`, all items in the returned array will be considered to be of type `Type1 | Type2 |
   *   undefined`. Although you can determine the actual type based on the array index, TypeScript
   *   will not know, so you will need to type assert the array items for later type checking to
   *   work.
   * @param dataProviderSources Array containing string names of the data providers to get OR data
   *   providers themselves (i.e., the results of useDataProvider/useDataProviderMulti) if you want
   *   this hook to return the data providers again. It is fine to have a mix of strings and data
   *   providers in the array.
   *
   *   WARNING: THE ARRAY MUST BE STABLE - const or wrapped in useState, useMemo, etc. It must not be
   *   updated every render.
   * @returns An array of data providers that correspond by index to the values in
   *   `dataProviderSources`. Each item in the array will be (a) undefined if the data provider has
   *   not been retrieved or has been disposed, or (b) a data provider if it has been retrieved and is
   *   not disposed.
   */
  function useDataProviderMulti<EachDataProviderName extends DataProviderNames[]>(
    dataProviderSources: (
      | EachDataProviderName[number]
      | DataProviders[EachDataProviderName[number]]
      | undefined
    )[],
  ): (DataProviders[EachDataProviderName[number]] | undefined)[];
  export default useDataProviderMulti;
}
declare module 'renderer/hooks/papi-hooks/index' {
  export { default as usePromise } from 'renderer/hooks/papi-hooks/use-promise.hook';
  export { default as useEvent } from 'renderer/hooks/papi-hooks/use-event.hook';
  export { default as useEventAsync } from 'renderer/hooks/papi-hooks/use-event-async.hook';
  export { default as useDataProvider } from 'renderer/hooks/papi-hooks/use-data-provider.hook';
  export { default as useData } from 'renderer/hooks/papi-hooks/use-data.hook';
  export { default as useSetting } from 'renderer/hooks/papi-hooks/use-setting.hook';
  export { default as useProjectData } from 'renderer/hooks/papi-hooks/use-project-data.hook';
  export { default as useProjectDataProvider } from 'renderer/hooks/papi-hooks/use-project-data-provider.hook';
  export { default as useDialogCallback } from 'renderer/hooks/papi-hooks/use-dialog-callback.hook';
  export { default as useDataProviderMulti } from 'renderer/hooks/papi-hooks/use-data-provider-multi.hook';
}
declare module '@papi/frontend/react' {
  export * from 'renderer/hooks/papi-hooks/index';
}
declare module 'renderer/services/renderer-xml-http-request.service' {
  /** This wraps the browser's XMLHttpRequest implementation to
   * provide better control over internet access. It is isomorphic with the standard XMLHttpRequest,
   * so it should act as a drop-in replacement.
   *
   * Note that Node doesn't have a native implementation, so this is only for the renderer.
   */
  export default class PapiRendererXMLHttpRequest implements XMLHttpRequest {
    readonly DONE: 4;
    readonly HEADERS_RECEIVED: 2;
    readonly LOADING: 3;
    readonly OPENED: 1;
    readonly UNSENT: 0;
    abort: () => void;
    addEventListener: <K extends keyof XMLHttpRequestEventMap>(
      type: K,
      listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ) => void;
    dispatchEvent: (event: Event) => boolean;
    getAllResponseHeaders: () => string;
    getResponseHeader: (name: string) => string | null;
    open: (
      method: string,
      url: string,
      async?: boolean,
      username?: string | null,
      password?: string | null,
    ) => void;
    onabort: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onerror: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onload: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onloadend: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onloadstart: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onprogress: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null;
    ontimeout: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    overrideMimeType: (mime: string) => void;
    readyState: number;
    removeEventListener: <K extends keyof XMLHttpRequestEventMap>(
      type: K,
      listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any,
      options?: boolean | EventListenerOptions,
    ) => void;
    response: any;
    responseText: string;
    responseType: XMLHttpRequestResponseType;
    responseURL: string;
    responseXML: Document | null;
    send: (body?: Document | XMLHttpRequestBodyInit | null) => void;
    setRequestHeader: (name: string, value: string) => void;
    status: number;
    statusText: string;
    timeout: number;
    upload: XMLHttpRequestUpload;
    withCredentials: boolean;
    constructor();
  }
}
declare module '@papi/frontend' {
  /**
   * Unified module for accessing API features in the renderer.
   *
   * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
   */
  import PapiEventEmitter from 'shared/models/papi-event-emitter.model';
  import * as commandService from 'shared/services/command.service';
  import * as papiUtil from 'shared/utils/papi-util';
  import { PapiNetworkService } from 'shared/services/network.service';
  import { WebViewServiceType } from 'shared/services/web-view.service-model';
  import { InternetService } from 'shared/services/internet.service';
  import { DataProviderService } from 'shared/services/data-provider.service';
  import { ProjectLookupServiceType } from 'shared/services/project-lookup.service-model';
  import { PapiFrontendProjectDataProviderService } from 'shared/services/project-data-provider.service';
  import { SettingsService } from 'shared/services/settings.service';
  import { DialogService } from 'shared/services/dialog.service-model';
  import * as papiReact from '@papi/frontend/react';
  import PapiRendererWebSocket from 'renderer/services/renderer-web-socket.service';
  import PapiRendererXMLHttpRequest from 'renderer/services/renderer-xml-http-request.service';
  const papi: {
    /**
     *
     * Event manager - accepts subscriptions to an event and runs the subscription callbacks when the
     * event is emitted Use eventEmitter.event(callback) to subscribe to the event. Use
     * eventEmitter.emit(event) to run the subscriptions. Generally, this EventEmitter should be
     * private, and its event should be public. That way, the emitter is not publicized, but anyone can
     * subscribe to the event.
     */
    EventEmitter: typeof PapiEventEmitter;
    /** This is just an alias for internet.fetch */
    fetch: typeof globalThis.fetch;
    /** This wraps the browser's WebSocket implementation to provide
     * better control over internet access. It is isomorphic with the standard WebSocket, so it should
     * act as a drop-in replacement.
     *
     * Note that the Node WebSocket implementation is different and not wrapped here.
     */
    WebSocket: typeof PapiRendererWebSocket;
    /** This wraps the browser's XMLHttpRequest implementation to
     * provide better control over internet access. It is isomorphic with the standard XMLHttpRequest,
     * so it should act as a drop-in replacement.
     *
     * Note that Node doesn't have a native implementation, so this is only for the renderer.
     */
    XMLHttpRequest: typeof PapiRendererXMLHttpRequest;
    /**
     *
     * The command service allows you to exchange messages with other components in the platform. You
     * can register a command that other services and extensions can send you. You can send commands to
     * other services and extensions that have registered commands.
     */
    commands: typeof commandService;
    /**
     *
     * PapiUtil is a collection of functions, objects, and types that are used as helpers in other
     * services. Extensions should not use or rely on anything in papiUtil unless some other service
     * requires it.
     */
    utils: typeof papiUtil;
    /**
     *
     * Service exposing various functions related to using webViews
     *
     * WebViews are iframes in the Platform.Bible UI into which extensions load frontend code, either
     * HTML or React components.
     */
    webViews: WebViewServiceType;
    /**
     *
     * Prompt the user for responses with dialogs
     */
    dialogs: DialogService;
    /**
     *
     * Service that provides a way to send and receive network events
     */
    network: PapiNetworkService;
    /**
     *
     * All extensions and services should use this logger to provide a unified output of logs
     */
    logger: import('electron-log').MainLogger & {
      default: import('electron-log').MainLogger;
    };
    /**
     *
     * Service that provides a way to call `fetch` since the original function is not available
     */
    internet: InternetService;
    /**
     *
     * Service that allows extensions to send and receive data to/from other extensions
     */
    dataProviders: DataProviderService;
    /**
     *
     * Service that gets project data providers
     */
    projectDataProviders: PapiFrontendProjectDataProviderService;
    /**
     *
     * Provides metadata for projects known by the platform
     */
    projectLookup: ProjectLookupServiceType;
    /**
     *
     * React hooks that enable interacting with the `papi` in React components more easily.
     */
    react: typeof papiReact;
    /**
     *
     * Service that allows to get and set settings in local storage
     */
    settings: SettingsService;
  };
  export default papi;
  /**
   *
   * Event manager - accepts subscriptions to an event and runs the subscription callbacks when the
   * event is emitted Use eventEmitter.event(callback) to subscribe to the event. Use
   * eventEmitter.emit(event) to run the subscriptions. Generally, this EventEmitter should be
   * private, and its event should be public. That way, the emitter is not publicized, but anyone can
   * subscribe to the event.
   */
  export const EventEmitter: typeof PapiEventEmitter;
  /** This is just an alias for internet.fetch */
  export const fetch: typeof globalThis.fetch;
  /** This wraps the browser's WebSocket implementation to provide
   * better control over internet access. It is isomorphic with the standard WebSocket, so it should
   * act as a drop-in replacement.
   *
   * Note that the Node WebSocket implementation is different and not wrapped here.
   */
  export const WebSocket: typeof PapiRendererWebSocket;
  /** This wraps the browser's XMLHttpRequest implementation to
   * provide better control over internet access. It is isomorphic with the standard XMLHttpRequest,
   * so it should act as a drop-in replacement.
   *
   * Note that Node doesn't have a native implementation, so this is only for the renderer.
   */
  export const XMLHttpRequest: typeof PapiRendererXMLHttpRequest;
  /**
   *
   * The command service allows you to exchange messages with other components in the platform. You
   * can register a command that other services and extensions can send you. You can send commands to
   * other services and extensions that have registered commands.
   */
  export const commands: typeof commandService;
  /**
   *
   * PapiUtil is a collection of functions, objects, and types that are used as helpers in other
   * services. Extensions should not use or rely on anything in papiUtil unless some other service
   * requires it.
   */
  export const utils: typeof papiUtil;
  /**
   *
   * Service exposing various functions related to using webViews
   *
   * WebViews are iframes in the Platform.Bible UI into which extensions load frontend code, either
   * HTML or React components.
   */
  export const webViews: WebViewServiceType;
  /**
   *
   * Prompt the user for responses with dialogs
   */
  export const dialogs: DialogService;
  /**
   *
   * Service that provides a way to send and receive network events
   */
  export const network: PapiNetworkService;
  /**
   *
   * All extensions and services should use this logger to provide a unified output of logs
   */
  export const logger: import('electron-log').MainLogger & {
    default: import('electron-log').MainLogger;
  };
  /**
   *
   * Service that provides a way to call `fetch` since the original function is not available
   */
  export const internet: InternetService;
  /**
   *
   * Service that allows extensions to send and receive data to/from other extensions
   */
  export const dataProviders: DataProviderService;
  /**
   *
   * Service that registers and gets project data providers
   */
  export const projectDataProviders: PapiFrontendProjectDataProviderService;
  /**
   *
   * Provides metadata for projects known by the platform
   */
  export const projectLookup: ProjectLookupServiceType;
  /**
   *
   * React hooks that enable interacting with the `papi` in React components more easily.
   */
  export const react: typeof papiReact;
  /**
   *
   * Service that allows to get and set settings in local storage
   */
  export const settings: SettingsService;
  export type Papi = typeof papi;
}
declare module '@papi/core' {
  /** Exporting empty object so people don't have to put 'type' in their import statements */
  const core: {};
  export default core;
  export type { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
  export type { ExecutionToken } from 'node/models/execution-token.model';
  export type { DialogTypes } from 'renderer/components/dialogs/dialog-definition.model';
  export type { default as IDataProvider } from 'shared/models/data-provider.interface';
  export type {
    DataProviderUpdateInstructions,
    DataProviderDataType,
    DataProviderSubscriberOptions,
  } from 'shared/models/data-provider.model';
  export type { WithNotifyUpdate } from 'shared/models/data-provider-engine.model';
  export type { default as IDataProviderEngine } from 'shared/models/data-provider-engine.model';
  export type { DialogOptions } from 'shared/models/dialog-options.model';
  export type { PapiEvent } from 'shared/models/papi-event.model';
  export type { default as PapiEventEmitter } from 'shared/models/papi-event-emitter.model';
  export type {
    ExtensionDataScope,
    MandatoryProjectDataType,
  } from 'shared/models/project-data-provider.model';
  export type { ProjectMetadata } from 'shared/models/project-metadata.model';
  export type {
    GetWebViewOptions,
    SavedWebViewDefinition,
    UseWebViewStateHook,
    WebViewContentType,
    WebViewDefinition,
    WebViewProps,
  } from 'shared/models/web-view.model';
  export type { Unsubscriber, UnsubscriberAsync } from 'shared/utils/papi-util';
  export type { IWebViewProvider } from 'shared/models/web-view-provider.model';
  export type { SettingEvent as SettingMessage } from 'shared/services/settings.service';
}
