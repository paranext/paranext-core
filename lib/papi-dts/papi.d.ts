/// <reference types="react" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
declare module 'shared/utils/util' {
  import { ProcessType } from 'shared/global-this.model';
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
   * Allow an object to bind all its class-defined functions to itself to ensure all references to
   * "this" in its functions refer to the object rather than the caller of the function. For example,
   * if a function on the class is provided to a callback, if "this" isn't bound to the object then
   * "this" will refer to the entity running the callback.
   */
  export function bindClassMethods<T extends object>(this: T): void;
}
declare module 'shared/services/scroll-group.service-model' {
  import { PlatformEvent, ScriptureReference, ScrollGroupId } from 'platform-bible-utils';
  export const NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE = 'ScrollGroupService';
  /** Name to use when creating a network event that is fired when webViews are updated */
  export const EVENT_NAME_ON_DID_UPDATE_SCR_REF: `${string}:${string}`;
  /**
   * Combination of a {@link ScrollGroupId} and a {@link ScriptureReference}. If this value is a number,
   * that means this should be synced with the scroll group sharing that number. If this value is an
   * object, that means it is an independent Scripture reference and should not be synced with any
   * scroll group.
   */
  export type ScrollGroupScrRef = ScrollGroupId | ScriptureReference;
  /**
   * Information about an update to a scroll group. Informs about the new {@link ScriptureReference} at
   * a {@link ScrollGroupId}
   */
  export type ScrollGroupUpdateInfo = {
    scrRef: ScriptureReference;
    scrollGroupId: ScrollGroupId;
  };
  /** Parts of the Scroll Group Service that are exposed through the network object */
  export interface IScrollGroupRemoteService {
    /**
     * Get the {@link ScriptureReference} associated with the provided scroll group
     *
     * @param scrollGroupId Scroll group whose Scripture reference to get. Defaults to 0
     * @returns Scripture reference associated with the provided scroll group
     */
    getScrRef(scrollGroupId?: ScrollGroupId): Promise<ScriptureReference>;
    /**
     * Sets the {@link ScriptureReference} associated with the provided scroll group
     *
     * @param scrollGroupId Scroll group whose Scripture reference to get. If `undefined`, defaults to
     *   0
     * @param scrRef Scripture reference to which to set the scroll group
     * @returns `true` if the Scripture reference changed. `false` otherwise
     */
    setScrRef(
      scrollGroupId: ScrollGroupId | undefined,
      scrRef: ScriptureReference,
    ): Promise<boolean>;
  }
  /**
   *
   * Provides functions related to scroll groups and Scripture references at those scroll groups
   */
  export interface IScrollGroupService extends IScrollGroupRemoteService {
    /** Event that emits with information about a changed Scripture Reference for a scroll group */
    onDidUpdateScrRef: PlatformEvent<ScrollGroupUpdateInfo>;
  }
}
declare module 'shared/models/web-view.model' {
  import type { ScrollGroupScrRef } from 'shared/services/scroll-group.service-model';
  import { ScriptureReference, ScrollGroupId, LocalizeKey } from 'platform-bible-utils';
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
    /**
     * The content for the WebView that papi puts into an iframe. This field differs significantly
     * depending on which `contentType` you use in your `WebViewDefinition` as described below. If you
     * are using a React or HTML WebView, you will probably want to use a bundler to bundle your code
     * together and provide it here.
     * [`paranext-extension-template`](https://github.com/paranext/paranext-extension-template) is set
     * up for this use case. Feel free to use it for your extension!
     *
     *     ---
     *
     * **For React WebViews (default):** string containing all the code you want to run in the iframe
     * on the frontend. You should set a function component to `globalThis.webViewComponent` in this
     * code.
     *
     * For example, you could pass the bundled output of the following code to as your React Web View
     * `content`:
     *
     * ```tsx
     * globalThis.webViewComponent = function MyWebView() {
     *  return <div>Hello World!! This is my React WebView!</div>;
     * }
     * ```
     *
     * **For HTML WebViews:** string containing all the code you want to run in the iframe on the
     * frontend. This should be a complete HTML document. Usually,
     *
     * For example, you could pass the following string as your HTML Web View `content`:
     *
     * ```html
     * <html>
     *   <head>
     *     <style>
     *       .title {
     *         color: darkgreen;
     *       }
     *     </style>
     *   </head>
     *   <body>
     *     <div class="title">Hello World!! This is my HTML Web View!</div>
     *   </body>
     * </html>
     * ```
     *
     *     ---
     *
     * **For URL WebViews:** the url you want to load into the iframe on the frontend.
     *
     * Note: URL WebViews must have `papi-extension:` or `https:` urls.
     *
     * For example, you could pass the following string as your URL Web View `content`:
     *
     * ```plain
     * https://example.com/
     * ```
     */
    content: string;
    /**
     * Url of image to show on the title bar of the tab
     *
     * Defaults to the software's standard logo.
     */
    iconUrl?: string;
    /**
     * Name of the tab (or a localizeKey for the name that will automatically be localized) for the
     * WebView
     */
    title?: string | LocalizeKey;
    /** Tooltip that is shown when hovering over the webview title */
    tooltip?: string;
    /**
     * Project id associated with this web view.
     *
     * Note: This field may be used in other contexts (like menu commands) for project-specific
     * operations related to this web view.
     */
    projectId?: string;
    /**
     * With which scroll group this web view is synced or the {@link ScriptureReference} this web view
     * is focusing independently of a scroll group
     */
    scrollGroupScrRef?: ScrollGroupScrRef;
    /**
     * General object to store unique state for this webview.
     *
     * WARNING: This storage is not private; other extensions can access this data. Do not store
     * secrets in here
     */
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
    /**
     * Whether to allow this iframe to open separate windows with window.open and anchor tags with
     * `target="_blank"`. Setting this to true adds `allow-popups` to the WebView iframe's [sandbox
     * attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox). Defaults
     * to `false`
     */
    allowPopups?: boolean;
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
   * The keys of properties on a WebViewDefinition that are omitted when converting to a
   * {@link SavedWebViewDefinition}
   */
  export const SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS: readonly [
    'content',
    'styles',
    'allowScripts',
    'allowSameOrigin',
    'allowedFrameSources',
    'allowPopups',
  ];
  /**
   * The keys of properties on a WebViewDefinition that are omitted when converting to a
   * {@link SavedWebViewDefinition}
   */
  export type SavedWebViewDefinitionOmittedKeys =
    (typeof SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS)[number];
  /**
   * Saved WebView information that does not contain the actual content of the WebView. Saved into
   * layouts. Could have as little as the type and ID. WebView providers load these into actual
   * {@link WebViewDefinition}s and verify any existing properties on the WebViews.
   */
  export type SavedWebViewDefinition = (
    | Partial<Omit<WebViewDefinitionReact, SavedWebViewDefinitionOmittedKeys>>
    | Partial<Omit<WebViewDefinitionHtml, SavedWebViewDefinitionOmittedKeys>>
    | Partial<Omit<WebViewDefinitionURL, SavedWebViewDefinitionOmittedKeys>>
  ) &
    Pick<WebViewDefinitionBase, 'id' | 'webViewType'>;
  /**
   * The keys of properties on a WebViewDefinition that may be updated when that webview is already
   * displayed
   */
  export const WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS: readonly [
    'iconUrl',
    'title',
    'tooltip',
    'projectId',
    'scrollGroupScrRef',
  ];
  /** The properties on a WebViewDefinition that may be updated when that webview is already displayed */
  export type WebViewDefinitionUpdatableProperties = Pick<
    WebViewDefinitionBase,
    (typeof WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS)[number]
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
   * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   * updated every render
   *
   * _＠param_ `defaultStateValue` Value to use if the web view state didn't contain a value for the
   * given 'stateKey'
   *
   * Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   * to re-run with its new value. Running `resetWebViewState()` will always update the state value
   * returned to the latest `defaultStateValue`, and changing the `stateKey` will use the latest
   * `defaultStateValue`. However, if `defaultStateValue` is changed while a state is
   * `defaultStateValue` (meaning it is reset and has no value), the returned state value will not be
   * updated to the new `defaultStateValue`.
   *
   * _＠returns_ `[stateValue, setStateValue, resetWebViewState]`
   *
   * - `webViewStateValue`: The current value for the web view state at the key specified or
   *   `defaultStateValue` if a state was not found
   * - `setWebViewState`: Function to use to update the web view state value at the key specified
   * - `resetWebViewState`: Function that removes the web view state and resets the value to
   *   `defaultStateValue`
   *
   * _＠example_
   *
   * ```typescript
   * const [lastPersonSeen, setLastPersonSeen] = useWebViewState('lastSeen', 'No one');
   * ```
   */
  export type UseWebViewStateHook = <T>(
    stateKey: string,
    defaultStateValue: T,
  ) => [
    webViewStateValue: T,
    setWebViewState: (stateValue: T) => void,
    resetWebViewState: () => void,
  ];
  /**
   *
   * A React hook for working with this web view's scroll group and Scripture Reference. Returns a
   * value and a function to set the value for both the {@link ScriptureReference} and the
   * {@link ScrollGroupId} with which this web view is synced (using this web view's
   * `scrollGroupScrRef` property). Use similarly to `useState`.
   *
   * Only used in WebView iframes. Please use `useScrollGroupScrRef` outside of WebViews.
   *
   * _＠returns_ `[scrRef, setScrRef, scrollGroupId, setScrollGroupId]`
   *
   * - `scrRef`: The current value for the Scripture reference this web view is on
   * - `setScrRef`: Function to use to update the Scripture reference this web view is on. If it is
   *   synced to a scroll group, sets the scroll group's Scripture reference
   * - `scrollGroupId`: The current value for the scroll group this web view is synced with. If not
   *   synced to a scroll group, this is `undefined`
   * - `setScrollGroupId`: Function to use to update the scroll group with which this web view is synced
   *
   * _＠example_
   *
   * ```typescript
   * const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useWebViewScrollGroupScrRef();
   * ```
   */
  export type UseWebViewScrollGroupScrRefHook = () => [
    scrRef: ScriptureReference,
    setScrRef: (newScrRef: ScriptureReference) => void,
    scrollGroupId: ScrollGroupId | undefined,
    setScrollGroupId: (newScrollGroupId: ScrollGroupId | undefined) => void,
  ];
  /**
   *
   * Gets the saved properties on this WebView's WebView definition
   *
   * _＠returns_ saved properties this WebView's WebView definition or undefined if not found for some
   * reason
   */
  export type GetSavedWebViewDefinition = () => SavedWebViewDefinition | undefined;
  /**
   *
   * Updates this WebView with the specified properties
   *
   * _＠param_ `updateInfo` properties to update on the WebView. Any unspecified properties will stay
   * the same
   *
   * _＠returns_ true if successfully found the WebView to update and actually updated any properties;
   * false otherwise
   *
   * _＠example_
   *
   * ```typescript
   * updateWebViewDefinition({ title: `Hello ${name}` });
   * ```
   */
  export type UpdateWebViewDefinition = (updateInfo: WebViewDefinitionUpdateInfo) => boolean;
  /** Props that are passed into the web view itself inside the iframe in the web view tab component */
  export type WebViewProps = SavedWebViewDefinition & {
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
     * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
     * updated every render
     *
     * _＠param_ `defaultStateValue` Value to use if the web view state didn't contain a value for the
     * given 'stateKey'
     *
     * Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
     * to re-run with its new value. Running `resetWebViewState()` will always update the state value
     * returned to the latest `defaultStateValue`, and changing the `stateKey` will use the latest
     * `defaultStateValue`. However, if `defaultStateValue` is changed while a state is
     * `defaultStateValue` (meaning it is reset and has no value), the returned state value will not be
     * updated to the new `defaultStateValue`.
     *
     * _＠returns_ `[stateValue, setStateValue, resetWebViewState]`
     *
     * - `webViewStateValue`: The current value for the web view state at the key specified or
     *   `defaultStateValue` if a state was not found
     * - `setWebViewState`: Function to use to update the web view state value at the key specified
     * - `resetWebViewState`: Function that removes the web view state and resets the value to
     *   `defaultStateValue`
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
     * A React hook for working with this web view's scroll group and Scripture Reference. Returns a
     * value and a function to set the value for both the {@link ScriptureReference} and the
     * {@link ScrollGroupId} with which this web view is synced (using this web view's
     * `scrollGroupScrRef` property). Use similarly to `useState`.
     *
     * Only used in WebView iframes. Please use `useScrollGroupScrRef` outside of WebViews.
     *
     * _＠returns_ `[scrRef, setScrRef, scrollGroupId, setScrollGroupId]`
     *
     * - `scrRef`: The current value for the Scripture reference this web view is on
     * - `setScrRef`: Function to use to update the Scripture reference this web view is on. If it is
     *   synced to a scroll group, sets the scroll group's Scripture reference
     * - `scrollGroupId`: The current value for the scroll group this web view is synced with. If not
     *   synced to a scroll group, this is `undefined`
     * - `setScrollGroupId`: Function to use to update the scroll group with which this web view is synced
     *
     * _＠example_
     *
     * ```typescript
     * const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useWebViewScrollGroupScrRef();
     * ```
     */
    useWebViewScrollGroupScrRef: UseWebViewScrollGroupScrRefHook;
    /**
     *
     * Updates this WebView with the specified properties
     *
     * _＠param_ `updateInfo` properties to update on the WebView. Any unspecified properties will stay
     * the same
     *
     * _＠returns_ true if successfully found the WebView to update and actually updated any properties;
     * false otherwise
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
    GetSavedWebViewDefinition,
    SavedWebViewDefinition,
    UpdateWebViewDefinition,
    UseWebViewScrollGroupScrRefHook,
    UseWebViewStateHook,
    WebViewDefinitionUpdateInfo,
    WebViewId,
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
    /** The id of the current web view. Only used in WebView iframes. */
    var webViewId: WebViewId;
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
     * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
     * updated every render
     *
     * _＠param_ `defaultStateValue` Value to use if the web view state didn't contain a value for the
     * given 'stateKey'
     *
     * Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
     * to re-run with its new value. Running `resetWebViewState()` will always update the state value
     * returned to the latest `defaultStateValue`, and changing the `stateKey` will use the latest
     * `defaultStateValue`. However, if `defaultStateValue` is changed while a state is
     * `defaultStateValue` (meaning it is reset and has no value), the returned state value will not be
     * updated to the new `defaultStateValue`.
     *
     * _＠returns_ `[stateValue, setStateValue, resetWebViewState]`
     *
     * - `webViewStateValue`: The current value for the web view state at the key specified or
     *   `defaultStateValue` if a state was not found
     * - `setWebViewState`: Function to use to update the web view state value at the key specified
     * - `resetWebViewState`: Function that removes the web view state and resets the value to
     *   `defaultStateValue`
     *
     * _＠example_
     *
     * ```typescript
     * const [lastPersonSeen, setLastPersonSeen] = useWebViewState('lastSeen', 'No one');
     * ```
     */
    var useWebViewState: UseWebViewStateHook;
    /**
     *
     * A React hook for working with this web view's scroll group and Scripture Reference. Returns a
     * value and a function to set the value for both the {@link ScriptureReference} and the
     * {@link ScrollGroupId} with which this web view is synced (using this web view's
     * `scrollGroupScrRef` property). Use similarly to `useState`.
     *
     * Only used in WebView iframes. Please use `useScrollGroupScrRef` outside of WebViews.
     *
     * _＠returns_ `[scrRef, setScrRef, scrollGroupId, setScrollGroupId]`
     *
     * - `scrRef`: The current value for the Scripture reference this web view is on
     * - `setScrRef`: Function to use to update the Scripture reference this web view is on. If it is
     *   synced to a scroll group, sets the scroll group's Scripture reference
     * - `scrollGroupId`: The current value for the scroll group this web view is synced with. If not
     *   synced to a scroll group, this is `undefined`
     * - `setScrollGroupId`: Function to use to update the scroll group with which this web view is synced
     *
     * _＠example_
     *
     * ```typescript
     * const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useWebViewScrollGroupScrRef();
     * ```
     */
    var useWebViewScrollGroupScrRef: UseWebViewScrollGroupScrRefHook;
    /**
     * Retrieve the value from web view state with the given 'stateKey', if it exists. Otherwise
     * return default value
     */
    var getWebViewState: <T>(stateKey: string, defaultValue: T) => T;
    /** Set the value for a given key in the web view state. */
    var setWebViewState: <T>(stateKey: string, stateValue: T) => void;
    /** Remove the value for a given key in the web view state */
    var resetWebViewState: (stateKey: string) => void;
    var getSavedWebViewDefinitionById: (webViewId: string) => SavedWebViewDefinition | undefined;
    var updateWebViewDefinitionById: (
      webViewId: string,
      webViewDefinitionUpdateInfo: WebViewDefinitionUpdateInfo,
    ) => boolean;
    /**
     *
     * Gets the saved properties on this WebView's WebView definition
     *
     * _＠returns_ saved properties this WebView's WebView definition or undefined if not found for some
     * reason
     */
    var getSavedWebViewDefinition: GetSavedWebViewDefinition;
    /**
     *
     * Updates this WebView with the specified properties
     *
     * _＠param_ `updateInfo` properties to update on the WebView. Any unspecified properties will stay
     * the same
     *
     * _＠returns_ true if successfully found the WebView to update and actually updated any properties;
     * false otherwise
     *
     * _＠example_
     *
     * ```typescript
     * updateWebViewDefinition({ title: `Hello ${name}` });
     * ```
     */
    var updateWebViewDefinition: UpdateWebViewDefinition;
    /** Indicates whether test code meant just for developers to see should be run */
    var isNoisyDevModeEnabled: boolean;
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
declare module 'shared/data/rpc.model' {
  import { SerializedRequestType } from 'shared/utils/util';
  import {
    JSONRPCErrorCode,
    JSONRPCErrorResponse,
    JSONRPCRequest,
    JSONRPCResponse,
    JSONRPCSuccessResponse,
  } from 'json-rpc-2.0';
  /** Port to use for the WebSocket */
  export const WEBSOCKET_PORT = 8876;
  /**
   * Whether an RPC object is setting up or has finished setting up its connection and is ready to
   * communicate on the network
   */
  export enum ConnectionStatus {
    /** Not connected to the network */
    Disconnected = 0,
    /** Attempting to connect to the network */
    Connecting = 1,
    /** Finished setting up its connection */
    Connected = 2,
  }
  /** Parameters provided to an RPC request message */
  export type RequestParams = Array<any>;
  /**
   * Function to call internally when a request is received. The return value is sent back as the
   * response to the request. If the request was received over the network, the response will be
   * packaged into a JSONRPCSuccessResponse message.
   */
  export type InternalRequestHandler = (...requestParams: RequestParams) => any;
  /** Function that processes an event received locally or over the network */
  export type EventHandler = <T>(eventType: string, event: T) => void;
  /**
   * ID of an individual request. It must be unique between an RPC client and server for a single
   * connection. Once a connection has closed and reopens, IDs can be reused.
   */
  export type RequestId = number | string;
  /**
   * Create a JSONRPCRequest message
   *
   * @param requestType Indicates what to do with the request
   * @param requestParams Parameters to pass along when the request is processed
   * @param requestId Unique ID for this connection of this request
   * @returns JSONRPCRequest message that can be serialized and sent over a connection
   */
  export function createRequest(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
    requestId: RequestId,
  ): JSONRPCRequest;
  /**
   * Create a JSONRPCSuccessResponse message
   *
   * @param contents Data to return to the requester when the request succeeds
   * @param requestId ID of the request that this response is intended to address. If no ID was
   *   provided, don't pass a value to this parameter.
   * @returns JSONRPCSuccessResponse message that can be serialized and sent over a connection
   */
  export function createSuccessResponse<T>(
    contents: T,
    requestId?: RequestId,
  ): JSONRPCSuccessResponse;
  /**
   * Create a JSONRPCErrorResponse message
   *
   * @param errorMessage Text to provide to the requester about why this request failed
   * @param errorCode JSONRPCErrorCode value that best aligns with the purpose of the failure
   * @param requestId ID of the request that this response is intended to address. If no ID was
   *   provided, don't pass a value to this parameter.
   * @returns JSONRPCErrorResponse message that can be serialized and sent over a connection
   */
  export function createErrorResponse(
    errorMessage: string,
    errorCode?: JSONRPCErrorCode,
    requestId?: RequestId,
  ): JSONRPCErrorResponse;
  /** Serialize a payload, if needed, and send it over the provided WebSocket */
  export function sendPayloadToWebSocket(ws: WebSocket | undefined, payload: unknown): void;
  /**
   * Deserialize a payload from the network and return it as a JSONRPC message or array of messages.
   * Note that all `null` values from the payload will be converted into `undefined` values except for
   * `result` values in JSONRPCSuccessResponse messages. A `null` value as the response to a request
   * must not be converted to `undefined` per the JSONRPC protocol.
   *
   * After a request has been processed by the protocol stack, call `fixupResponse` to restore
   * `undefined` responses.
   */
  export function deserializeMessage(
    payload: string,
  ): JSONRPCRequest | JSONRPCResponse | Array<JSONRPCRequest | JSONRPCResponse>;
  /**
   * Convert `null` results back to `undefined` once we're out of the protocol stack.
   *
   * This works in tandem with `deserializeMessage` to properly handle `null` values in JSONRPC
   * messages.
   */
  export function fixupResponse(response: JSONRPCResponse): JSONRPCResponse;
  /**
   * Runs the request callback and retries a number of times if `requestCallback` resolves to a method
   * not found error
   *
   * @param requestCallback Function to run to send a JSON-RPC request. Should return a JSONRPC error
   *   with code {@link JSONRPCErrorCode.MethodNotFound} if it fails to find the method
   * @param name Name of the handler running this request for logging purposes
   * @param requestType Type of request for logging purposes
   * @returns The response from the request including the method not found error if it times out
   */
  export function requestWithRetry(
    requestCallback: () => Promise<JSONRPCResponse>,
    name: string,
    requestType: string,
  ): Promise<JSONRPCResponse>;
  /**
   * Register a method on the network so that requests of the given type are routed to your request
   * handler.
   */
  export const REGISTER_METHOD = 'network:registerMethod';
  /**
   * Unregister a method on the network so that requests of the given type are no longer routed to
   * your request handler.
   */
  export const UNREGISTER_METHOD = 'network:unregisterMethod';
  /**
   * Get all methods that are currently registered on the network. Required to be 'rpc.discover' by
   * the OpenRPC specification.
   */
  export const GET_METHODS = 'rpc.discover';
  /** Prefix on requests that indicates that the request is a command */
  export const CATEGORY_COMMAND = 'command';
}
declare module 'shared/models/papi-network-event-emitter.model' {
  import { PlatformEventHandler, PlatformEventEmitter } from 'platform-bible-utils';
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
  export default class PapiNetworkEventEmitter<T> extends PlatformEventEmitter<T> {
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
      networkSubscriber: PlatformEventHandler<T>,
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
declare module 'shared/models/openrpc.model' {
  import type { JSONSchema7 } from 'json-schema';
  /**
   * Describes APIs available to call using JSON-RPC 2.0
   *
   * See https://github.com/open-rpc/meta-schema/releases - Release 1.14.2 aligns with OpenRPC 1.2.6.
   * https://github.com/open-rpc/meta-schema/releases/download/1.14.2/open-rpc-meta-schema.json
   *
   * We don't want to go past 1.2.6 because https://playground.open-rpc.org/ doesn't support anything
   * past 1.2.6 for now. See https://github.com/open-rpc/playground/issues/606.
   *
   * Note that the types from https://www.npmjs.com/package/@open-rpc/meta-schema/v/1.14.2 are not
   * very good. For example, all the properties of `Components` are of type `any` instead of the
   * specific types they should be, and they redefine types for JSON Schema. So we're using our own
   * types here instead.
   */
  export type OpenRpc = {
    openrpc: string;
    info: Info;
    servers?: Server[];
    methods: Method[];
    components?: Components;
    externalDocs?: ExternalDocumentation;
  };
  export type Components = {
    schemas?: {
      [key: string]: Schema;
    };
    contentDescriptors?: {
      [key: string]: ContentDescriptor;
    };
    examples?: {
      [key: string]: Example;
    };
    links?: {
      [key: string]: Link;
    };
    errors?: {
      [key: string]: Error;
    };
    tags?: {
      [key: string]: Tag;
    };
  };
  export type ComponentsReference = `#/components/${string}`;
  export type Contact = {
    name?: string;
    email?: string;
    url?: string;
  };
  export type ContentDescriptor = {
    name: string;
    schema: Schema;
    required?: boolean;
    summary?: string;
    description?: string;
    deprecated?: boolean;
  };
  export type Error = {
    code: number;
    message: string;
    data?: any;
  };
  export type Example = {
    name: string;
    value: any;
    summary?: string;
    description?: string;
  };
  export type ExamplePairingObject = {
    name: string;
    params: (Example | Reference)[];
    result: Example | Reference;
    description?: string;
  };
  export type ExternalDocumentation = {
    url: string;
    description?: string;
  };
  export type Info = {
    title: string;
    version: string;
    description?: string;
    termsOfService?: string;
    contact?: Contact;
    license?: License;
  };
  export type License = {
    name: string;
    url?: string;
  };
  export type Link = {
    name?: string;
    summary?: string;
    description?: string;
    method?: string;
    params?: {
      [key: string]: any;
    };
    server?: Server;
  };
  export type Method = {
    /** The canonical name for the method. The name MUST be unique within the methods array. */
    name: string;
    params: (ContentDescriptor | Reference)[];
    result: ContentDescriptor | Reference;
    /** A short summary of what the method does. */
    summary?: string;
    /**
     * A verbose explanation of the method behavior. GitHub Flavored Markdown syntax MAY be used for
     * rich text representation.
     */
    description?: string;
    deprecated?: boolean;
    servers?: Server[];
    tags?: (Tag | Reference)[];
    /** Format the server expects the params. Defaults to 'either'. */
    paramStructure?: 'by-name' | 'by-position' | 'either';
    errors?: (Error | Reference)[];
    links?: (Link | Reference)[];
    examples?: (ExamplePairingObject | Reference)[];
    externalDocs?: ExternalDocumentation;
  };
  export type Reference = {
    $ref: ComponentsReference;
  };
  export type Server = {
    url: string;
    name?: string;
    description?: string;
    summary?: string;
    variables?: {
      [key: string]: ServerVariable;
    };
  };
  export type ServerVariable = {
    default: string;
    description?: string;
    enum?: string[];
  };
  export type Schema = JSONSchema7;
  export type Tag = {
    name: string;
    description?: string;
    externalDocs?: ExternalDocumentation;
  };
  export type MethodDocumentationWithoutName = Omit<Method, 'name'>;
  /** Documentation about a single method */
  export type SingleMethodDocumentation = {
    method: MethodDocumentationWithoutName;
    components?: Components;
  };
  /** Documentation about all methods on a network object */
  export type NetworkObjectDocumentation = {
    summary?: string;
    description?: string;
    methods?: Method[];
    components?: Components;
  };
  /** Create an object of type {@link OpenRpc} to hold documentation for PAPI websocket methods */
  export function createEmptyOpenRpc(papiVersion: string): OpenRpc;
  /**
   * Get an empty {@link OpenRpc} method document object. Useful for populating documentation for
   * methods that didn't have their own documentation provided.
   */
  export function getEmptyMethodDocs(): MethodDocumentationWithoutName;
}
declare module 'shared/models/rpc.interface' {
  import {
    ConnectionStatus,
    EventHandler,
    InternalRequestHandler,
    RequestParams,
  } from 'shared/data/rpc.model';
  import { SingleMethodDocumentation } from 'shared/models/openrpc.model';
  import { SerializedRequestType } from 'shared/utils/util';
  import { JSONRPCResponse } from 'json-rpc-2.0';
  /**
   * Defines how to support sending requests on the network and emitting events on the network
   *
   * NOTE: In JSONRPC jargon, a "request" is made to a "method". In our code we talk about "request
   * types", but JSONRPC doesn't have the notion of a "request type". However, a "request type" is
   * really just the name of a method in JSONRPC. So "method names" and "request types" are treated as
   * the same thing. Similarly, what we call a "request handler" is the same thing as a "method" that
   * has been registered with a JSONRPC server.
   */
  export interface IRpcHandler {
    /**
     * Whether this connector is setting up or has finished setting up its connection and is ready to
     * communicate on the network
     */
    connectionStatus: ConnectionStatus;
    /**
     * Sets up the RPC handler by populating connector info, setting up event handlers, and doing one
     * of the following:
     *
     * - On clients: connecting to the server
     * - On servers: opening an endpoint for clients to connect
     *
     * @param localEventHandler Function that handles events from the server by accepting an eventType
     *   and an event and emitting the event locally. Used when receiving an event over the network.
     * @returns Promise that resolves when finished connecting
     */
    connect: (localEventHandler: EventHandler) => Promise<boolean>;
    /**
     * Disconnects from the connection:
     *
     * - On clients: disconnects from the server
     * - On servers: disconnects from all clients and closes its connection endpoint
     */
    disconnect: () => Promise<void>;
    /**
     * Send a request and resolve after receiving a response
     *
     * @param requestType Type of request (or "method" in JSONRPC jargon) to call
     * @param requestParams Parameters associated with this request
     * @returns Promise that resolves to a JSONRPCSuccessResponse or JSONRPCErrorResponse message
     */
    request: (
      requestType: SerializedRequestType,
      requestParams: RequestParams,
    ) => Promise<JSONRPCResponse>;
    /**
     * Sends an event to other processes. Does NOT run the local event subscriptions as they should be
     * run by NetworkEventEmitter after sending on network.
     *
     * @param eventType Unique network event type for coordinating between processes
     * @param event Event data to emit on the network
     */
    emitEventOnNetwork: EventHandler;
  }
  /**
   * Represents anything that handles the RPC protocol and allows callers to register methods that can
   * be called remotely over the network.
   *
   * NOTE: In JSONRPC jargon, a "request" is made to a "method". In our code we talk about "request
   * types", but JSONRPC doesn't have the notion of a "request type". However, a "request type" is
   * really just the name of a method in JSONRPC. So "method names" and "request types" are treated as
   * the same thing. Similarly, what we call a "request handler" is the same thing as a "method" that
   * has been registered with a JSONRPC server.
   */
  export interface IRpcMethodRegistrar extends IRpcHandler {
    /** Register a method that will be called if an RPC request is made */
    registerMethod: (
      methodName: string,
      method: InternalRequestHandler,
      methodDocs?: SingleMethodDocumentation,
    ) => Promise<boolean>;
    /** Unregister a method so it is no longer available to RPC requests */
    unregisterMethod: (methodName: string) => Promise<boolean>;
  }
  export type RegisteredRpcMethodDetails = {
    handler: IRpcHandler;
    methodDocs?: SingleMethodDocumentation;
  };
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
declare module 'client/services/rpc-client' {
  import { JSONRPCResponse } from 'json-rpc-2.0';
  import { IRpcMethodRegistrar } from 'shared/models/rpc.interface';
  import {
    ConnectionStatus,
    EventHandler,
    InternalRequestHandler,
    RequestParams,
  } from 'shared/data/rpc.model';
  import { SerializedRequestType } from 'shared/utils/util';
  import { SingleMethodDocumentation } from 'shared/models/openrpc.model';
  /**
   * Manages the JSON-RPC protocol on the client end of a websocket that connects to main
   *
   * Created by any process that connects to the websocket server owned by main
   */
  export default class RpcClient implements IRpcMethodRegistrar {
    connectionStatus: ConnectionStatus;
    private ws;
    private requestId;
    /** Refers to the current process that created this object (i.e., not main) */
    private readonly jsonRpcServer;
    /** Refers to main */
    private readonly jsonRpcClient;
    private readonly jsonRpcClientServer;
    private readonly connectionMutex;
    private readonly registrationMutexMap;
    private readonly connectionComplete;
    constructor();
    private static handleError;
    private static onError;
    connect(localEventHandler: EventHandler): Promise<boolean>;
    disconnect(): Promise<void>;
    request(
      requestType: SerializedRequestType,
      requestParams: RequestParams,
    ): Promise<JSONRPCResponse>;
    emitEventOnNetwork<T>(eventType: string, event: T): void;
    registerMethod(
      methodName: string,
      method: InternalRequestHandler,
      methodDocs?: SingleMethodDocumentation,
    ): Promise<boolean>;
    unregisterMethod(methodName: string): Promise<boolean>;
    private createNextRequestId;
    private addEventListenersToWebSocket;
    private removeEventListenersFromWebSocket;
    private onWebSocketOpen;
    private onWebSocketClose;
    private onMessageReceivedByWebSocket;
  }
}
declare module 'main/services/rpc-server' {
  import { JSONRPCResponse } from 'json-rpc-2.0';
  import { IRpcHandler, RegisteredRpcMethodDetails } from 'shared/models/rpc.interface';
  import { ConnectionStatus, RequestParams } from 'shared/data/rpc.model';
  import { SerializedRequestType } from 'shared/utils/util';
  import { SingleMethodDocumentation } from 'shared/models/openrpc.model';
  type PropagateEventMethod = <T>(source: RpcServer, eventType: string, event: T) => void;
  /**
   * Manages the JSON-RPC protocol on the server end of a websocket owned by main. This class is not
   * intended to be instantiated by anything other than RpcWebSocketListener.
   *
   * Created by RpcWebSocketListener when a client connects to the web socket server. There is one
   * RpcServer object per client that connects to the web socket server.
   */
  export default class RpcServer implements IRpcHandler {
    connectionStatus: ConnectionStatus;
    private ws;
    private requestId;
    /** Only used for logging to differentiate from other RpcServer objects */
    private readonly name;
    /** Refers to the main process */
    private readonly jsonRpcServer;
    /** Refers to any process that connected to main over the websocket */
    private readonly jsonRpcClient;
    private readonly rpcMethodDetailsByMethodName;
    /** Called by an RpcServer when all other RpcServers should emit an event over the network */
    private readonly propagateEventMethod;
    constructor(
      name: string,
      webSocket: WebSocket,
      propagateEventMethod: PropagateEventMethod,
      rpcMethodDetailsByMethodName: Map<string, RegisteredRpcMethodDetails>,
    );
    connect(): Promise<boolean>;
    disconnect(): Promise<void>;
    request(
      requestType: SerializedRequestType,
      requestParams: RequestParams,
    ): Promise<JSONRPCResponse>;
    emitEventOnNetwork<T>(eventType: string, event: T): void;
    registerRemoteMethod(methodName: string, methodDocs?: SingleMethodDocumentation): boolean;
    unregisterRemoteMethod(methodName: string): boolean;
    private createNextRequestId;
    private addMethodToRpcServer;
    private handleError;
    private addEventListenersToWebSocket;
    private removeEventListenersFromWebSocket;
    private onWebSocketClose;
    private onWebSocketError;
    private onMessageReceivedByWebSocket;
    private processMessage;
  }
}
declare module 'main/services/rpc-websocket-listener' {
  import {
    ConnectionStatus,
    EventHandler,
    InternalRequestHandler,
    RequestParams,
  } from 'shared/data/rpc.model';
  import { IRpcMethodRegistrar } from 'shared/models/rpc.interface';
  import { JSONRPCResponse } from 'json-rpc-2.0';
  import { SerializedRequestType } from 'shared/utils/util';
  import { OpenRpc, SingleMethodDocumentation } from 'shared/models/openrpc.model';
  /**
   * Owns the WebSocketServer that listens for clients to connect to the web socket. When a client
   * connects, an RpcServer is created in this same process to service that connection.
   *
   * Also owns a map of all registered methods tied to the IRpcHandler that knows how to respond to
   * those methods. Methods registered within "main" will be tied to this class. Methods registered by
   * other processes will be tied to the RPCServer that services the connection for that other
   * process.
   *
   * Created by the main process on start up when the network service initializes
   */
  export default class RpcWebSocketListener implements IRpcMethodRegistrar {
    connectionStatus: ConnectionStatus;
    private localEventHandler;
    private webSocketServer;
    private nextSocketNumber;
    private readonly connectionMutex;
    private readonly rpcServerBySocket;
    private readonly rpcMethodDetailsByMethodName;
    private readonly localMethodsByMethodName;
    constructor();
    get nextSocketId(): string;
    connect(localEventHandler: EventHandler): Promise<boolean>;
    disconnect(): Promise<void>;
    request(
      requestType: SerializedRequestType,
      requestParams: RequestParams,
    ): Promise<JSONRPCResponse>;
    registerMethod(
      methodName: string,
      method: InternalRequestHandler,
      methodDocs?: SingleMethodDocumentation,
    ): Promise<boolean>;
    unregisterMethod(methodName: string): Promise<boolean>;
    generateOpenRpcSchema(): OpenRpc;
    emitEventOnNetwork<T>(eventType: string, event: T): void;
    private propagateEvent;
    private onClientConnect;
    private onClientDisconnect;
  }
}
declare module 'shared/services/rpc-handler.factory' {
  import { IRpcMethodRegistrar } from 'shared/models/rpc.interface';
  /** Creates a server or client RPC handler depending on if we're in main or some other process */
  export const createRpcHandler: () => Promise<IRpcMethodRegistrar>;
}
declare module 'shared/services/network.service' {
  /**
   * Handles requests, responses, subscriptions, etc. to the backend. Likely shouldn't need/want to
   * expose this whole service on papi, but there are a few things that are exposed via
   * papiNetworkService
   */
  import { InternalRequestHandler } from 'shared/data/rpc.model';
  import { UnsubscriberAsync, PlatformEventEmitter, PlatformEvent } from 'platform-bible-utils';
  import { SerializedRequestType } from 'shared/utils/util';
  import { SingleMethodDocumentation } from 'shared/models/openrpc.model';
  export function initialize(): Promise<void>;
  /** Closes the network services gracefully */
  export const shutdown: () => Promise<void>;
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
   * @returns Promise that resolves if the request successfully registered and unsubscriber function
   *   to run to stop the passed-in function from handling requests
   */
  export function registerRequestHandler(
    requestType: SerializedRequestType,
    requestHandler: InternalRequestHandler,
    requestDocs?: SingleMethodDocumentation,
  ): Promise<UnsubscriberAsync>;
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
  /**
   * Creates an event emitter that works properly over the network. Other connections receive this
   * event when it is emitted.
   *
   * WARNING: You can only create a network event emitter once per eventType to prevent hijacked event
   * emitters.
   *
   * @param eventType Unique network event type for coordinating between connections
   * @returns Event emitter whose event works between connections
   */
  export const createNetworkEventEmitter: <T>(eventType: string) => PlatformEventEmitter<T>;
  /**
   * Gets the network event with the specified type. Creates the emitter if it does not exist
   *
   * @param eventType Unique network event type for coordinating between connections
   * @returns Event for the event type that runs the callback provided when the event is emitted
   */
  export const getNetworkEvent: <T>(eventType: string) => PlatformEvent<T>;
  export interface PapiNetworkService {
    createNetworkEventEmitter: typeof createNetworkEventEmitter;
    getNetworkEvent: typeof getNetworkEvent;
  }
  /**
   *
   * Service that provides a way to send and receive network events
   */
  export const papiNetworkService: PapiNetworkService;
}
declare module 'shared/services/network-object.service' {
  import { PlatformEvent, UnsubscriberAsync } from 'platform-bible-utils';
  import {
    NetworkObject,
    DisposableNetworkObject,
    NetworkableObject,
    LocalObjectToProxyCreator,
    NetworkObjectDetails,
  } from 'shared/models/network-object.model';
  import { NetworkObjectDocumentation } from 'shared/models/openrpc.model';
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
  export const onDidCreateNetworkObject: PlatformEvent<NetworkObjectDetails>;
  /** Event that fires with a network object ID when that object is disposed locally or remotely */
  export const onDidDisposeNetworkObject: PlatformEvent<string>;
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
    createLocalObjectToProxy?: LocalObjectToProxyCreator<T>,
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
    objectType?: string,
    objectAttributes?:
      | {
          [property: string]: unknown;
        }
      | undefined,
    objectDocumentation?: NetworkObjectDocumentation,
  ) => Promise<DisposableNetworkObject<T>>;
  export interface MinimalNetworkObjectService {
    get: typeof get;
    set: typeof set;
    onDidCreateNetworkObject: typeof onDidCreateNetworkObject;
  }
  export interface NetworkObjectService extends MinimalNetworkObjectService {
    initialize: typeof initialize;
    hasKnown: typeof hasKnown;
  }
  /**
   *
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
  /**
   *
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
  export const minimalNetworkObjectService: MinimalNetworkObjectService;
}
declare module 'shared/models/network-object.model' {
  import {
    Dispose,
    OnDidDispose,
    CannotHaveOnDidDispose,
    CanHaveOnDidDispose,
  } from 'platform-bible-utils';
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
   * @see {@link networkObjectService}
   */
  export type NetworkObject<T extends NetworkableObject> = Omit<CanHaveOnDidDispose<T>, 'dispose'> &
    OnDidDispose;
  /**
   * An object of this type is returned from {@link networkObjectService.set}.
   *
   * @see {@link networkObjectService}
   */
  export type DisposableNetworkObject<T extends NetworkableObject> = NetworkObject<T> & Dispose;
  /**
   * An object of this type is passed into {@link networkObjectService.set}.
   *
   * @see {@link networkObjectService}
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
   * @see {@link networkObjectService}
   */
  export type LocalObjectToProxyCreator<T extends NetworkableObject> = (
    id: string,
    networkObjectPromise: Promise<NetworkObject<T>>,
  ) => Partial<NetworkableObject>;
  /** Data about an object shared on the network */
  export type NetworkObjectDetails = {
    /** ID of the network object that processes use to reference it */
    id: string;
    /**
     * Name of the type of this network object. Note this isn't about TypeScript types, but instead
     * focused on the platform data model. Names of types for the same logical thing (e.g., Project
     * Data Providers => `pdp`) should be the same across all process on the network regardless of
     * what programming language they use. For generic network objects, `networkObject` is
     * appropriate.
     */
    objectType: string;
    /** Array of strings with the function names exposed on this network object */
    functionNames: string[];
    /**
     * Optional object containing properties that describe this network object. The properties
     * associated with this network object depend on the `objectType`.
     */
    attributes?: Record<string, unknown>;
  };
}
declare module 'shared/models/data-provider.model' {
  import { UnsubscriberAsync, PlatformEventHandler } from 'platform-bible-utils';
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
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
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
    callback: PlatformEventHandler<TDataType['getData']>,
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
   * @see {@link DataProviderDataTypes} for more information
   */
  export type DataTypeNames<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
    keyof TDataTypes & string;
  /**
   * Set of all `set<data_type>` methods that a data provider provides according to its data types.
   *
   * @see {@link DataProviderSetter} for more information
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
   * @see {@link DataProviderGetter} for more information
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
   * @see {@link DataProviderSubscriber} for more information
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
   * @see {@link IDataProvider}
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
  import type {
    DataProviderDataType,
    DataProviderDataTypes,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  /**
   * The name of the `projectInterface` representing the essential methods every Base Project Data
   * Provider must implement
   */
  export const PROJECT_INTERFACE_PLATFORM_BASE = 'platform.base';
  /** Indicates to a PDP what extension data is being referenced */
  export type ExtensionDataScope = {
    /** Name of an extension as provided in its manifest */
    extensionName: string;
    /**
     * Name of a unique partition or segment of data within the extension. Some examples include (but
     * are not limited to):
     *
     * - Name of an important data structure that is maintained in a project
     * - Name of a downloaded data set that is being cached
     * - Name of a resource created by a user that should be maintained in a project
     *
     * This is the smallest level of granularity provided by a PDP for accessing extension data. There
     * is no way to get or set just a portion of data identified by a single `dataQualifier` value.
     */
    dataQualifier: string;
  };
  /**
   * `DataProviderDataTypes` that each project data provider **must** implement. They are assumed to
   * exist and are used by other data providers.
   *
   *     ---
   *
   * ### Setting
   *
   * The `Setting` data type handles getting and setting project settings. All Project Data Providers
   * must implement these methods `getSetting` and `setSetting` as well as `resetSetting` in order to
   * properly support project settings.
   *
   * Note: the `Setting` data type is not actually part of {@link MandatoryProjectDataTypes} because
   * the methods would not be able to create a generic type extending from `ProjectSettingNames` in
   * order to return the specific setting type being requested. As such, `getSetting`, `setSetting`,
   * and `subscribeSetting` are all specified on {@link IProjectDataProvider} instead. Unfortunately,
   * as a result, using Intellisense with `useProjectData` will not show `Setting` as a data type
   * option, but you can use `useProjectSetting` instead. However, do note that the `Setting` data
   * type is fully functional.
   *
   * The closest possible representation of the `Setting` data type follows:
   *
   * ```typescript
   * Setting: DataProviderDataType<
   *   ProjectSettingNames,
   *   ProjectSettingTypes[ProjectSettingNames],
   *   ProjectSettingTypes[ProjectSettingNames]
   * >;
   * ```
   *
   * WARNING: Each Project Data Provider **must** fulfill the following requirements for its
   * settings-related methods:
   *
   * - `getSetting`: if a project setting value is present for the key requested, return it. Otherwise,
   *   you must call `papi.projectSettings.getDefault` to get the default value or throw if that call
   *   throws. This functionality preserves the intended type of the setting and avoids returning
   *   `undefined` unexpectedly.
   * - `setSetting`: must call `papi.projectSettings.isValid` before setting the value and should return
   *   false if the call returns `false` and throw if the call throws. This functionality preserves
   *   the intended intended type of the setting and avoids allowing the setting to be set to the
   *   wrong type.
   * - `resetSetting`: deletes the value at the key and sends a setting update event. After this,
   *   `getSetting` should again see the setting value is not present, call
   *   `papi.projectSettings.getDefault`, and return the default value.
   * - Note: see {@link WithProjectDataProviderEngineSettingMethods} for method signatures for these
   *   three methods.
   *
   *   .---
   *
   * ### ExtensionData
   *
   * All Project Data Provider data types must have an `ExtensionData` type. We strongly recommend all
   * Project Data Provider data types extend from this type in order to standardize the
   * `ExtensionData` types.
   *
   * Benefits of following this standard:
   *
   * - If an extension uses the `ExtensionData` endpoint for any project, it will likely use this
   *   standardized interface, so using this interface on your Project Data Provider data types
   *   enables your PDP to support generic extension data
   * - In the future, we may enforce that callers to `ExtensionData` endpoints include `extensionName`,
   *   so following this interface ensures your PDP will not break if such a requirement is
   *   implemented.
   */
  export type MandatoryProjectDataTypes = {
    ExtensionData: DataProviderDataType<ExtensionDataScope, string | undefined, string>;
  };
  /**
   * The `ExtensionData` methods required for a Project Data Provider Engine to fulfill the
   * requirements of {@link MandatoryProjectDataTypes}'s `ExtensionData` data type.
   *
   * Note: These methods are already covered by {@link MandatoryProjectDataTypes}, but this type adds
   * JSDocs for them.
   */
  export type WithProjectDataProviderEngineExtensionDataMethods<
    TProjectDataTypes extends DataProviderDataTypes,
  > = {
    /**
     * Gets an extension's project data identified by `dataScope` in this project
     *
     * @param dataScope Information about what data is being referenced by the calling extension given
     *   to this Project Data Provider
     * @returns Extension project data in this project for an extension to use in serving its
     *   extension project data
     */
    getExtensionData(dataScope: ExtensionDataScope): Promise<string | undefined>;
    /**
     * Sets an extension's project data identified by `dataScope` in this project
     *
     * @param dataScope Information about what data is being referenced by the calling extension given
     *   to this Project Data Provider
     * @param data Updated value of extension project data in this project to set
     * @returns Information that papi uses to interpret whether to send out updates. Defaults to
     *   `true` (meaning send updates only for this data type).
     * @see {@link DataProviderUpdateInstructions} for more info on what to return
     */
    setExtensionData(
      dataScope: ExtensionDataScope,
      data: string,
    ): Promise<DataProviderUpdateInstructions<TProjectDataTypes>>;
  };
}
declare module 'shared/models/data-provider.interface' {
  import {
    DataProviderDataTypes,
    DataProviderGetters,
    DataProviderSetters,
    DataProviderSubscribers,
  } from 'shared/models/data-provider.model';
  import { Dispose, OnDidDispose } from 'platform-bible-utils';
  /**
   * An object on the papi that manages data and has methods for interacting with that data. Created
   * by the papi and layers over an {@link IDataProviderEngine} provided by an extension. Returned from
   * getting a data provider with `papi.dataProviders.get`.
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
   * @see {@link IDataProvider}
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
   * method. papi overwrites this function on the DataProviderEngine itself to emit an update based on
   * the `updateInstructions` and then run the original `notifyUpdateMethod` from the
   * `DataProviderEngine`.
   *
   * _＠example_ To run `notifyUpdate` function so it updates the Verse and Heresy data types (in a
   * data provider engine):
   *
   * ```typescript
   * this.notifyUpdate(['Verse', 'Heresy']);
   * ```
   *
   * _＠example_ You can log the manual updates in your data provider engine by specifying the
   * following `notifyUpdate` function in the data provider engine:
   *
   * ```typescript
   * notifyUpdate(updateInstructions) {
   *   papi.logger.info(updateInstructions);
   * }
   * ```
   *
   * Note: This function's return is treated the same as the return from `set<data_type>`
   *
   * _＠param_ `updateInstructions` Information that papi uses to interpret whether to send out
   * updates. Defaults to `'*'` (meaning send updates for all data types) if parameter
   * `updateInstructions` is not provided or is undefined. Otherwise returns `updateInstructions`.
   * papi passes the interpreted update value into this `notifyUpdate` function. For example, running
   * `this.notifyUpdate()` will call the data provider engine's `notifyUpdate` with
   * `updateInstructions` of `'*'`.
   *
   * _＠see_ {@link DataProviderUpdateInstructions} for more info on the `updateInstructions` parameter
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
   * @see {@link DataProviderEngineNotifyUpdate} for more information on `notifyUpdate`.
   * @see {@link IDataProviderEngine} for more information on using this type.
   */
  export type WithNotifyUpdate<TDataTypes extends DataProviderDataTypes> = {
    /**
     *
     * Method to run to send clients updates for a specific data type outside of the `set<data_type>`
     * method. papi overwrites this function on the DataProviderEngine itself to emit an update based on
     * the `updateInstructions` and then run the original `notifyUpdateMethod` from the
     * `DataProviderEngine`.
     *
     * _＠example_ To run `notifyUpdate` function so it updates the Verse and Heresy data types (in a
     * data provider engine):
     *
     * ```typescript
     * this.notifyUpdate(['Verse', 'Heresy']);
     * ```
     *
     * _＠example_ You can log the manual updates in your data provider engine by specifying the
     * following `notifyUpdate` function in the data provider engine:
     *
     * ```typescript
     * notifyUpdate(updateInstructions) {
     *   papi.logger.info(updateInstructions);
     * }
     * ```
     *
     * Note: This function's return is treated the same as the return from `set<data_type>`
     *
     * _＠param_ `updateInstructions` Information that papi uses to interpret whether to send out
     * updates. Defaults to `'*'` (meaning send updates for all data types) if parameter
     * `updateInstructions` is not provided or is undefined. Otherwise returns `updateInstructions`.
     * papi passes the interpreted update value into this `notifyUpdate` function. For example, running
     * `this.notifyUpdate()` will call the data provider engine's `notifyUpdate` with
     * `updateInstructions` of `'*'`.
     *
     * _＠see_ {@link DataProviderUpdateInstructions} for more info on the `updateInstructions` parameter
     *
     * WARNING: Do not update a data type in its `get<data_type>` method (unless you make a base case)!
     * It will create a destructive infinite loop.
     */
    notifyUpdate: DataProviderEngineNotifyUpdate<TDataTypes>;
  };
  /**
   * The object to register with the DataProviderService to create a data provider. The
   * DataProviderService creates an {@link IDataProvider} on the papi that layers over this engine,
   * providing special functionality.
   *
   * See {@link DataProviderDataTypes} for information on how to make powerful types that work well
   * with Intellisense.
   *
   * Note: papi creates a `notifyUpdate` function on the data provider engine if one is not provided,
   * so it is not necessary to provide one in order to call `this.notifyUpdate`. However, TypeScript
   * does not understand that papi will create one as you are writing your data provider engine, so
   * you can avoid type errors with one of the following options:
   *
   * 1. If you are using a class to create a data provider engine, you can extend the
   *    {@link DataProviderEngine} class, and it will provide `notifyUpdate` for you:
   *
   * ```typescript
   * class MyDPE extends DataProviderEngine<MyDataTypes> implements IDataProviderEngine<MyDataTypes> {
   *   ...
   * }
   * ```
   *
   * 2. If you are using an object or class not extending {@link DataProviderEngine} to create a data
   *    provider engine, you can add a `notifyUpdate` function (and, with an object, add the
   *    {@link WithNotifyUpdate} type) to your data provider engine like so:
   *
   * ```typescript
   * const myDPE: IDataProviderEngine<MyDataTypes> & WithNotifyUpdate<MyDataTypes> = {
   *   notifyUpdate(updateInstructions) {},
   *   ...
   * }
   * ```
   *
   * OR
   *
   * ```typescript
   * class MyDPE implements IDataProviderEngine<MyDataTypes> {
   *   notifyUpdate(updateInstructions?: DataProviderEngineNotifyUpdate<MyDataTypes>) {}
   *   ...
   * }
   * ```
   *
   * @type `TDataTypes` - The data types that this data provider engine serves. For each data type
   *   defined, the engine must have corresponding `get<data_type>` and `set<data_type> function`
   *   functions.
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
       * @see {@link DataProviderSetter} for more information
       */
      DataProviderSetters<TDataTypes> &
      /**
       * Set of all `get<data_type>` methods that a data provider engine must provide according to its
       * data types. Run by the data provider on `get<data_type>`
       *
       * Note: papi requires that each `set<data_type>` method has a corresponding `get<data_type>`
       * method.
       *
       * @see {@link DataProviderGetter} for more information
       */
      DataProviderGetters<TDataTypes> &
      Partial<WithNotifyUpdate<TDataTypes>>;
  export default IDataProviderEngine;
  /**
   *
   * Abstract class that provides a placeholder `notifyUpdate` for data provider engine classes. If a
   * data provider engine class extends this class, it doesn't have to specify its own `notifyUpdate`
   * function in order to use `notifyUpdate`.
   *
   * @see {@link IDataProviderEngine} for more information on extending this class.
   */
  export abstract class DataProviderEngine<TDataTypes extends DataProviderDataTypes>
    implements WithNotifyUpdate<TDataTypes>
  {
    notifyUpdate(updateInstructions?: DataProviderUpdateInstructions<TDataTypes>): void;
  }
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
  type ExtractDataProviderDataTypes<TDataProvider> =
    TDataProvider extends IDataProvider<infer TDataProviderDataTypes>
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
  /**
   * An object associated with a specific `webViewType` that provides a {@link WebViewDefinition} when
   * the PAPI wants to open a web view with that `webViewType`. An extension registers a web view
   * provider with `papi.webViewProviders.register`.
   *
   * Web View Providers provide the contents of all web views in Platform.Bible.
   *
   * If you want to provide {@link WebViewControllers} to facilitate interaction between your web views
   * and extensions, you can extend the abstract class {@link WebViewFactory} to make the process
   * easier. Alternatively, if you want to manage web view controllers manually, you can register them
   * in {@link IWebViewProvider.getWebView}.
   */
  export interface IWebViewProvider extends NetworkableObject {
    /**
     * Receives a {@link SavedWebViewDefinition} and fills it out into a full {@link WebViewDefinition},
     * providing the contents of the web view and other properties that are important for displaying
     * the web view.
     *
     * The PAPI calls this method as part of opening a new web view or (re)loading an existing web
     * view. If you want to create {@link WebViewControllers} for the web views the PAPI creates from
     * this method, you should register it using `papi.webViewProviders.registerWebViewController`
     * before returning from this method (resolving the returned promise). The {@link WebViewFactory}
     * abstract class handles this for you, so please consider extending it.
     *
     * @param savedWebViewDefinition The saved web view information from which to build a complete web
     *   view definition. Filled out with all {@link SavedWebViewDefinition} properties of the existing
     *   web view if an existing webview is being called for (matched by ID). Just provides the
     *   minimal properties required on {@link SavedWebViewDefinition} if this is a new request or if
     *   the web view with the existing ID was not found.
     * @param getWebViewOptions Various options that affect what calling `papi.webViews.openWebView`
     *   should do. When options are passed to `papi.webViews.openWebView`, some defaults are set up
     *   on the options, then those options are passed directly through to this method. That way, if
     *   you want to adjust what this method does based on the contents of the options passed to
     *   `papi.WebViews.openWebView`, you can. You can even read other properties on these options if
     *   someone passes options with other properties to `papi.webViews.openWebView`.
     * @param webViewNonce Nonce used to perform privileged interactions with the web view created
     *   from this method's returned {@link WebViewDefinition} such as
     *   `papi.webViewProviders.postMessageToWebView`. The web view service generates this nonce and
     *   sends it _only here_ to this web view provider that creates the web view with this id. It is
     *   generally recommended that this web view provider not share this nonce with anyone else but
     *   only use it within itself and in the web view controller created for this web view if
     *   applicable (See `papi.webViewProviders.registerWebViewController`).
     * @returns Full {@link WebViewDefinition} including the content and other important display
     *   properties based on the {@link SavedWebViewDefinition} provided
     */
    getWebView(
      savedWebViewDefinition: SavedWebViewDefinition,
      getWebViewOptions: GetWebViewOptions,
      webViewNonce: string,
    ): Promise<WebViewDefinition | undefined>;
  }
  /**
   * A web view provider that has been registered with the PAPI.
   *
   * This is what the papi gives on `webViewProviderService.get` (not exposed on the PAPI). Basically
   * a layer over NetworkObject
   *
   * This type is internal to core and is not used by extensions
   */
  export interface IRegisteredWebViewProvider extends NetworkObject<IWebViewProvider> {}
  /**
   * A web view provider that has been registered with the PAPI and returned to the extension that
   * registered it. It is able to be disposed with `dispose`.
   *
   * The PAPI returns this type from `papi.webViewProviders.register`.
   */
  export interface IDisposableWebViewProvider extends DisposableNetworkObject<IWebViewProvider> {}
}
declare module 'shared/models/network-object-status.service-model' {
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
  /**
   *
   * Provides functions related to the set of available network objects
   */
  export interface NetworkObjectStatusServiceType extends NetworkObjectStatusRemoteServiceType {
    /**
     * Get a promise that resolves when a network object is registered or rejects if a timeout is hit
     *
     * @param objectDetailsToMatch Subset of object details on the network object to wait for.
     *   Compared to object details using {@link isSubset}
     * @param timeoutInMS Max duration to wait for the network object. If not provided, it will wait
     *   indefinitely
     * @returns Promise that either resolves to the {@link NetworkObjectDetails} for a network object
     *   once the network object is registered, or rejects if a timeout is provided and the timeout is
     *   reached before the network object is registered
     */
    waitForNetworkObject: (
      objectDetailsToMatch: Partial<NetworkObjectDetails>,
      timeoutInMS?: number,
    ) => Promise<NetworkObjectDetails>;
  }
  export const networkObjectStatusServiceNetworkObjectName = 'NetworkObjectStatusService';
}
declare module 'shared/services/network-object-status.service' {
  import { NetworkObjectStatusServiceType } from 'shared/models/network-object-status.service-model';
  /**
   *
   * Provides functions related to the set of available network objects
   */
  const networkObjectStatusService: NetworkObjectStatusServiceType;
  export default networkObjectStatusService;
}
declare module 'shared/models/docking-framework.model' {
  import { MutableRefObject, ReactNode } from 'react';
  import { DockLayout, DropDirection, LayoutBase } from 'rc-dock';
  import { WebViewDefinition, WebViewDefinitionUpdateInfo } from 'shared/models/web-view.model';
  import { LocalizeKey } from 'platform-bible-utils';
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
     * Defaults to the software's standard logo.
     */
    tabIconUrl?: string;
    /**
     * Text to show (or a localizeKey that will automatically be localized) on the title bar of the
     * tab
     */
    tabTitle: string | LocalizeKey;
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
  /** Props that are passed to the web view tab component */
  export type WebViewTabProps = WebViewDefinition;
  /**
   * Rc-dock's onLayoutChange prop made asynchronous with `webViewDefinition` added. The dock layout
   * component calls this on the web view service when the layout changes.
   *
   * @param newLayout The changed layout to save.
   * @param currentTabId The tab being changed
   * @param direction The direction the tab is being moved (or deleted or other things - RCDock uses
   *   the word "direction" here loosely)
   * @param webViewDefinition The web view definition if the edit was on a web view; `undefined`
   *   otherwise
   * @returns Promise that resolves when finished doing things
   */
  export type OnLayoutChangeRCDock = (
    newLayout: LayoutBase,
    currentTabId?: string,
    direction?: DropDirection,
    webViewDefinition?: WebViewDefinition,
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
  import {
    GetWebViewOptions,
    SavedWebViewDefinition,
    WebViewId,
    WebViewType,
  } from 'shared/models/web-view.model';
  import { Layout } from 'shared/models/docking-framework.model';
  import { PlatformEvent } from 'platform-bible-utils';
  import { WebViewControllers, WebViewControllerTypes } from 'papi-shared-types';
  import { NetworkObject } from 'shared/models/network-object.model';
  /**
   *
   * Service exposing various functions related to using webViews
   *
   * WebViews are iframes in the Platform.Bible UI into which extensions load frontend code, either
   * HTML or React components.
   */
  export interface WebViewServiceType {
    /** @deprecated 13 November 2024. Renamed to {@link onDidOpenWebView} */
    onDidAddWebView: PlatformEvent<OpenWebViewEvent>;
    /** Event that emits with webView info when a webView is created */
    onDidOpenWebView: PlatformEvent<OpenWebViewEvent>;
    /** Event that emits with webView info when a webView is updated */
    onDidUpdateWebView: PlatformEvent<UpdateWebViewEvent>;
    /** Event that emits with webView info when a webView is closed */
    onDidCloseWebView: PlatformEvent<CloseWebViewEvent>;
    /** @deprecated 6 November 2024. Renamed to {@link openWebView}. */
    getWebView: (
      webViewType: WebViewType,
      layout?: Layout,
      options?: GetWebViewOptions,
    ) => Promise<WebViewId | undefined>;
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
    openWebView: (
      webViewType: WebViewType,
      layout?: Layout,
      options?: GetWebViewOptions,
    ) => Promise<WebViewId | undefined>;
    /** @deprecated 6 November 2024. Renamed to {@link getOpenWebViewDefinition} */
    getSavedWebViewDefinition(webViewId: string): Promise<SavedWebViewDefinition | undefined>;
    /**
     * Gets the saved properties on the WebView definition with the specified ID
     *
     * Note: this only returns a representation of the current web view definition, not the actual web
     * view definition itself. Changing properties on the returned definition does not affect the
     * actual web view definition. You can possibly change the actual web view definition by calling
     * {@link WebViewServiceType.openWebView} with certain `options`, depending on what options the web
     * view provider has made available.
     *
     * @param webViewId The ID of the WebView whose saved properties to get
     * @returns Saved properties of the WebView definition with the specified ID or undefined if not
     *   found
     */
    getOpenWebViewDefinition(webViewId: string): Promise<SavedWebViewDefinition | undefined>;
    /**
     * Get an existing web view controller for an open web view.
     *
     * A Web View Controller is a network object that represents a web view and whose methods
     * facilitate communication between its associated web view and extensions that want to interact
     * with it.
     *
     * Web View Controllers are registered on the web view provider service.
     *
     * @param webViewType Type of webview controller you expect to get. If the web view controller's
     *   `webViewType` does not match this, an error will be thrown
     * @param webViewId Id of web view for which to get the corresponding web view controller if one
     *   exists
     * @returns Web view controller with the given name if one exists, undefined otherwise
     */
    getWebViewController<WebViewType extends WebViewControllerTypes>(
      webViewType: WebViewType,
      webViewId: WebViewId,
    ): Promise<NetworkObject<WebViewControllers[WebViewType]> | undefined>;
  }
  /** Get request type for posting a message to a web view */
  export function getWebViewMessageRequestType(webViewId: WebViewId): `${string}:${string}`;
  /**
   * Type of function to receive messages sent to a web view.
   *
   * See `web-view-provider.service.ts`'s `postMessageToWebView` and `web-view.component` for
   * information on this type
   */
  export type WebViewMessageRequestHandler = (
    webViewNonce: string,
    message: unknown,
    targetOrigin?: string,
  ) => Promise<void>;
  /** Gets the id for the web view controller network object with the given name */
  export const getWebViewControllerObjectId: (webViewId: string) => string;
  /** Network object type for web view controllers */
  export const WEB_VIEW_CONTROLLER_OBJECT_TYPE = 'webViewController';
  export function getWebViewController<WebViewType extends WebViewControllerTypes>(
    webViewType: WebViewType,
    webViewId: WebViewId,
  ): Promise<NetworkObject<WebViewControllers[WebViewType]> | undefined>;
  /** @deprecated 13 November 2024. Renamed to {@link EVENT_NAME_ON_DID_OPEN_WEB_VIEW} */
  export const EVENT_NAME_ON_DID_ADD_WEB_VIEW: `${string}:${string}`;
  /** Name to use when creating a network event that is fired when webViews are created */
  export const EVENT_NAME_ON_DID_OPEN_WEB_VIEW: `${string}:${string}`;
  /** Event emitted when webViews are created */
  export type OpenWebViewEvent = {
    webView: SavedWebViewDefinition;
    layout: Layout;
  };
  /** Name to use when creating a network event that is fired when webViews are updated */
  export const EVENT_NAME_ON_DID_UPDATE_WEB_VIEW: `${string}:${string}`;
  /** Event emitted when webViews are updated */
  export type UpdateWebViewEvent = {
    webView: SavedWebViewDefinition;
  };
  /** Name to use when creating a network event that is fired when webViews are closed */
  export const EVENT_NAME_ON_DID_CLOSE_WEB_VIEW: `${string}:${string}`;
  /** Event emitted when webViews are closed */
  export type CloseWebViewEvent = {
    webView: SavedWebViewDefinition;
  };
  export const NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE = 'WebViewService';
}
declare module 'shared/services/web-view.service' {
  import { WebViewServiceType } from 'shared/services/web-view.service-model';
  const webViewService: WebViewServiceType;
  export default webViewService;
}
declare module 'shared/services/web-view-provider.service' {
  /**
   * Handles registering web view providers and serving web views around the papi. Exposed on the
   * papi.
   */
  import {
    IDisposableWebViewProvider,
    IWebViewProvider,
    IRegisteredWebViewProvider,
  } from 'shared/models/web-view-provider.model';
  import { WebViewControllers, WebViewControllerTypes } from 'papi-shared-types';
  import { DisposableNetworkObject } from 'shared/models/network-object.model';
  import { WebViewId } from 'shared/models/web-view.model';
  /** Sets up the service. Only runs once and always returns the same promise after that */
  const initialize: () => Promise<void>;
  /**
   * Register a web view provider to serve webViews for a specified type of webViews
   *
   * @param webViewType Type of web view to provide
   * @param webViewProvider Object to register as a webView provider including control over disposing
   *   of it.
   *
   *   WARNING: setting a webView provider mutates the provided object.
   * @returns `webViewProvider` modified to be a network object and able to be disposed with `dispose`
   */
  function registerWebViewProvider(
    webViewType: string,
    webViewProvider: IWebViewProvider,
  ): Promise<IDisposableWebViewProvider>;
  /**
   * Get a web view provider that has previously been set up
   *
   * @param webViewType Type of webview provider to get
   * @returns Web view provider with the given name if one exists, undefined otherwise
   */
  function getWebViewProvider(webViewType: string): Promise<IRegisteredWebViewProvider | undefined>;
  /**
   * Register a web view controller to represent a web view. It is expected that a web view provider
   * calls this to register a web view controller for a web view that is being created. If a web view
   * provider extends {@link WebViewFactory}, it will call this function automatically.
   *
   * A Web View Controller is a network object that represents a web view and whose methods facilitate
   * communication between its associated web view and extensions that want to interact with it.
   *
   * You can get web view controllers with {@link webViewService.getWebViewController}.
   *
   * @param webViewType Type of web view for which you are providing this web view controller
   * @param webViewId Id of web view for which to register the web view controller
   * @param webViewController Object to register as a web view controller including control over
   *   disposing of it. Note: the web view controller will be disposed automatically when the web view
   *   is closed
   *
   *   WARNING: setting a web view controller mutates the provided object.
   * @returns `webViewController` modified to be a network object
   */
  function registerWebViewController<WebViewType extends WebViewControllerTypes>(
    webViewType: WebViewType,
    webViewId: WebViewId,
    webViewController: WebViewControllers[WebViewType],
  ): Promise<DisposableNetworkObject<WebViewControllers[WebViewType]>>;
  /**
   * Sends a message to the specified web view. Expected to be used only by the
   * {@link IWebViewProvider} that created the web view or the {@link WebViewControllers} that
   * represents the web view created by the Web View Provider.
   *
   * [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) is used to
   * deliver the message to the web view iframe. The web view can use
   * [`window.addEventListener("message",
   * ...)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#the_dispatched_event)
   * in order to receive these messages.
   *
   * @param webViewId Id of the web view to which to send a message.
   * @param webViewNonce Nonce used to perform privileged interactions with the web view. Pass in the
   *   nonce the web view provider received from {@link IWebViewProvider.getWebView}'s `webViewNonce`
   *   parameter or from {@link WebViewFactory.createWebViewController}'s `webViewNonce` parameter
   * @param message Data to send to the web view. Can only send serializable information
   * @param targetOrigin Expected origin of the web view. Does not send the message if the web view's
   *   origin does not match. See [`postMessage`'s
   *   `targetOrigin`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#targetorigin)
   *   for more information. Defaults to same origin only (works automatically with React and HTML web
   *   views)
   */
  function postMessageToWebView(
    webViewId: WebViewId,
    webViewNonce: string,
    message: unknown,
    targetOrigin?: string,
  ): Promise<void>;
  export interface WebViewProviderService {
    initialize: typeof initialize;
    registerWebViewProvider: typeof registerWebViewProvider;
    getWebViewProvider: typeof getWebViewProvider;
    registerWebViewController: typeof registerWebViewController;
    postMessageToWebView: typeof postMessageToWebView;
  }
  export interface PapiWebViewProviderService {
    /** @deprecated 13 November 2024. Renamed to {@link registerWebViewProvider} */
    register: (
      ...args: Parameters<typeof registerWebViewProvider>
    ) => ReturnType<typeof registerWebViewProvider>;
    registerWebViewProvider: typeof registerWebViewProvider;
    registerWebViewController: typeof registerWebViewController;
    postMessageToWebView: typeof postMessageToWebView;
  }
  const webViewProviderService: WebViewProviderService;
  /**
   *
   * Interface for registering webView providers, registering webView controllers, and performing
   * privileged interactions with web views
   */
  export const papiWebViewProviderService: PapiWebViewProviderService;
  export default webViewProviderService;
}
declare module 'shared/models/web-view-factory.model' {
  import { WebViewControllers, WebViewControllerTypes } from 'papi-shared-types';
  import type { IWebViewProvider } from 'shared/models/web-view-provider.model';
  import {
    SavedWebViewDefinition,
    GetWebViewOptions,
    WebViewDefinition,
  } from 'shared/models/web-view.model';
  /**
   *
   * A partial implementation of {@link IWebViewProvider} that includes creating
   * {@link WebViewControllers} for each web view served by the web view provider. This class handles
   * registering, disposing, and making sure there is only one web view controller for each web view
   * for you.
   *
   * You can create a new class extending this abstract class to create a web view provider that
   * serves web views and web view controllers of a specific `webViewType` to facilitate interaction
   * between those web views and other extensions. You can register it with the PAPI using
   * `papi.webViewProviders.register`.
   *
   * If you want to change your existing `IWebViewProvider` from a plain object to extending this
   * class, you will need to change your object's existing method named `getWebView`
   * ({@link IWebViewProvider.getWebView}) to be named `getWebViewDefinition`
   * ({@link WebViewFactory.getWebViewDefinition}), which is a drop-in replacement. You likely do NOT
   * want to overwrite this class's `getWebView` because that will eliminate most of the benefits
   * associated with using this class.
   *
   * @see {@link IWebViewProvider} for more information on extending this class.
   */
  export abstract class WebViewFactory<WebViewType extends WebViewControllerTypes>
    implements IWebViewProvider
  {
    readonly webViewType: WebViewType;
    private readonly webViewControllersMutexMap;
    private readonly webViewControllersCleanupList;
    private readonly webViewControllersById;
    constructor(webViewType: WebViewType);
    /**
     * Receives a {@link SavedWebViewDefinition} and fills it out into a full {@link WebViewDefinition},
     * providing the contents of the web view and other properties that are important for displaying
     * the web view.
     *
     * WARNING: This method must NOT be overridden if you want any of the benefits of this class. You
     * are probably looking for {@link WebViewFactory.getWebViewDefinition}.
     *
     * If you are transferring a web view provider using a plain object to extending this class, you
     * should rename your existing `getWebView` to `getWebViewDefinition`.
     */
    getWebView(
      savedWebViewDefinition: SavedWebViewDefinition,
      getWebViewOptions: GetWebViewOptions,
      webViewNonce: string,
    ): Promise<WebViewDefinition | undefined>;
    /** Disposes of all WVCs that were created by this provider */
    dispose(): Promise<boolean>;
    /**
     * Receives a {@link SavedWebViewDefinition} and fills it out into a full {@link WebViewDefinition},
     * providing the contents of the web view and other properties that are important for displaying
     * the web view.
     *
     * {@link WebViewFactory} calls this as part of its {@link getWebView}, which is called by the PAPI
     * as part of opening a new web view. It will also create a web view controller after running this
     * if applicable.
     *
     * See {@link IWebViewProvider.getWebView} for more information on how this method works.
     *
     * @param savedWebViewDefinition The saved web view information from which to build a complete web
     *   view definition. Filled out with all {@link SavedWebViewDefinition} properties of the existing
     *   web view if an existing webview is being called for (matched by ID). Just provides the
     *   minimal properties required on {@link SavedWebViewDefinition} if this is a new request or if
     *   the web view with the existing ID was not found.
     * @param getWebViewOptions Various options that affect what calling `papi.webViews.openWebView`
     *   should do. When options are passed to `papi.webViews.openWebView`, some defaults are set up
     *   on the options, then those options are passed directly through to this method. That way, if
     *   you want to adjust what this method does based on the contents of the options passed to
     *   `papi.WebViews.openWebView`, you can. You can even read other properties on these options if
     *   someone passes options with other properties to `papi.webViews.openWebView`.
     * @param webViewNonce Nonce used to perform privileged interactions with the web view created
     *   from this method's returned {@link WebViewDefinition} such as
     *   `papi.webViewProviders.postMessageToWebView`. The web view service generates this nonce and
     *   sends it _only here_ to this web view provider that creates the web view with this id. It is
     *   generally recommended that this web view provider not share this nonce with anyone else but
     *   only use it within itself and in the web view controller created for this web view if
     *   applicable (See `papi.webViewProviders.registerWebViewController`).
     * @returns Full {@link WebViewDefinition} including the content and other important display
     *   properties based on the {@link SavedWebViewDefinition} provided
     */
    abstract getWebViewDefinition(
      savedWebViewDefinition: SavedWebViewDefinition,
      getWebViewOptions: GetWebViewOptions,
      webViewNonce: string,
    ): Promise<WebViewDefinition | undefined>;
    /**
     * Creates a {@link WebViewController} that corresponds to the {@link WebViewDefinition} provided.
     * {@link WebViewFactory} calls this as part of its {@link getWebView}. {@link WebViewFactory} will
     * automatically register this controller with the web view provider service
     * (`papi.webViewProviders.registerWebViewController`), run its `dispose` when the web view is
     * closed or this `WebViewFactory` is disposed, and make sure just one web view controller is
     * created for each web view.
     *
     * Alternatively, if you do not want to create web view controllers (or a controller for a
     * specific web view), feel free to return `undefined` from this method.
     *
     * @param webViewDefinition The definition for the web view for which to create a web view
     *   controller
     * @param webViewNonce Nonce used to perform privileged interactions with the web view created
     *   from the `webViewDefinition` parameter such as `papi.webViewProviders.postMessageToWebView`.
     *   The web view service generates this nonce and sends it _only here_ to this web view provider
     *   that creates the web view with this id. It is generally recommended that this web view
     *   provider not share this nonce with anyone else but only use it within itself and here in the
     *   web view controller created for this web view.
     * @returns Web view controller for the web view with the `webViewDefinition` provided. Or
     *   `undefined` if you do not want to create a web view controller for this web view.
     */
    abstract createWebViewController(
      webViewDefinition: WebViewDefinition,
      webViewNonce: string,
    ): Promise<WebViewControllers[WebViewType]>;
  }
}
declare module 'papi-shared-types' {
  import type { ScriptureReference, UnsubscriberAsync } from 'platform-bible-utils';
  import type {
    DataProviderDataType,
    DataProviderDataTypes,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  import type {
    MandatoryProjectDataTypes,
    PROJECT_INTERFACE_PLATFORM_BASE,
    WithProjectDataProviderEngineExtensionDataMethods,
  } from 'shared/models/project-data-provider.model';
  import type { IDisposableDataProvider } from 'shared/models/data-provider.interface';
  import type IDataProvider from 'shared/models/data-provider.interface';
  import type ExtractDataProviderDataTypes from 'shared/models/extract-data-provider-data-types.model';
  import type { NetworkableObject } from 'shared/models/network-object.model';
  import { WebViewId } from 'shared/models/web-view.model';
  /**
   * Function types for each command available on the papi. Each extension can extend this interface
   * to add commands that it registers on the papi with `papi.commands.registerCommand`.
   *
   * Note: Command names must consist of two strings separated by at least one period. We recommend
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
    'test.echoExtensionHost': (message: string) => Promise<string>;
    'test.throwError': (message: string) => void;
    'platform.restartExtensionHost': () => Promise<void>;
    /** Shut down the application */
    'platform.quit': () => Promise<void>;
    /** Restart the application */
    'platform.restart': () => Promise<void>;
    /** Open a browser to the platform's OpenRPC documentation */
    'platform.openDeveloperDocumentationUrl': () => Promise<void>;
    /**
     * Open a link in a new browser window. Like `window.open` in the frontend with
     * `target='_blank'`
     */
    'platform.openWindow': (url: string) => Promise<void>;
    /** @deprecated 3 December 2024. Renamed to `platform.openSettings` */
    'platform.openProjectSettings': (webViewId: string) => Promise<void>;
    /** @deprecated 3 December 2024. Renamed to `platform.openSettings` */
    'platform.openUserSettings': () => Promise<void>;
    'platform.openSettings': (webViewId?: WebViewId) => Promise<void>;
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
  /**
   * Types corresponding to each user setting available in Platform.Bible. Keys are setting names,
   * and values are setting data types. Extensions can add more user setting types with
   * corresponding user setting IDs by adding details to their `.d.ts` file.
   *
   * Note: Setting names must consist of two strings separated by at least one period. We recommend
   * one period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * An extension can extend this interface to add types for the user settings it registers by
   * adding the following to its `.d.ts` file (in this example, we are adding the
   * `myExtension.highlightColor` setting):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export interface SettingTypes {
   *     'myExtension.highlightColor': string | { r: number; g: number; b: number };
   *   }
   * }
   * ```
   */
  interface SettingTypes {
    /**
     * Current Verse Reference for Scroll Group A. Deprecated - please use `papi.scrollGroups` and
     * `useWebViewScrollGroupScrRef`
     */
    'platform.verseRef': ScriptureReference;
    /**
     * List of locales to use when localizing the interface. First in the list receives highest
     * priority. Please always add 'en' (English) at the end when using this setting so everything
     * localizes to English if it does not have a localization in a higher-priority locale.
     */
    'platform.interfaceLanguage': string[];
    /**
     * Mementos managed in the dotnet process and used for interacting with PtxUtils. Mementos are
     * persisted objects containing some data. They are stored as xml strings.
     */
    'platform.ptxUtilsMementoData': {
      [key: string]: string;
    };
    /**
     * Tracking last S/R registry data cache time managed in the dotnet process and used for
     * interacting with ParatextData.
     */
    'platform.paratextDataLastRegistryDataCachedTimes': {
      [key: string]: string;
    };
    /** Enable reading and writing comments in projects. This is an experimental feature. */
    'platform.commentsEnabled': boolean;
  }
  /**
   * Names for each user setting available on the papi.
   *
   * Automatically includes all extensions' user settings that are added to {@link SettingTypes}.
   *
   * @example 'platform.verseRef'
   */
  type SettingNames = keyof SettingTypes;
  /**
   * Types corresponding to each project setting available in Platform.Bible. Keys are project
   * setting names, and values are project setting data types. Extensions can add more project
   * setting types with corresponding project setting IDs by adding details to their `.d.ts` file.
   *
   * Note: Project setting names must consist of two strings separated by at least one period. We
   * recommend one period and lower camel case in case we expand the api in the future to allow dot
   * notation.
   *
   * An extension can extend this interface to add types for the project settings it registers by
   * adding the following to its `.d.ts` file (in this example, we are adding the
   * `myExtension.highlightColor` project setting):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export interface ProjectSettingTypes {
   *     'myExtension.highlightColor': string | { r: number; g: number; b: number };
   *   }
   * }
   * ```
   */
  interface ProjectSettingTypes {
    /**
     * Localized name of the language in which this project is written. This will be displayed
     * directly in the UI.
     *
     * @example 'English'
     */
    'platform.language': string;
    /**
     * Short name of the project (not necessarily unique). This will be displayed directly in the
     * UI.
     *
     * @example 'WEB'
     */
    'platform.name': string;
    /**
     * Localized full name of the project. This will be displayed directly in the UI.
     *
     * @example 'World English Bible'
     */
    'platform.fullName': string;
    /**
     * Whether or not the project is editable. This is a general "editable", not necessarily that it
     * is editable by the current user.
     *
     * Projects that are not editable are sometimes called "resources".
     */
    'platform.isEditable': boolean;
  }
  /**
   * Names for each user setting available on the papi.
   *
   * Automatically includes all extensions' user settings that are added to
   * {@link ProjectSettingTypes}.
   *
   * @example 'platform.fullName'
   */
  type ProjectSettingNames = keyof ProjectSettingTypes;
  /**
   * The `Setting` methods required for a Project Data Provider Engine to fulfill the requirements
   * of {@link MandatoryProjectDataTypes}'s `Setting` data type.
   */
  type WithProjectDataProviderEngineSettingMethods<
    TProjectDataTypes extends DataProviderDataTypes,
  > = {
    /**
     * Set the value of the specified project setting on this project.
     *
     * Note for implementing: `setSetting` must call `papi.projectSettings.isValid` before allowing
     * the setting change.
     *
     * @param key The string id of the project setting to change
     * @param newSetting The value that is to be set to the project setting.
     * @returns Information that papi uses to interpret whether to send out updates. Defaults to
     *   `true` (meaning send updates only for this data type).
     * @throws If the setting validator failed.
     * @see {@link DataProviderUpdateInstructions} for more info on what to return
     */
    setSetting: <ProjectSettingName extends ProjectSettingNames>(
      key: ProjectSettingName,
      newSetting: ProjectSettingTypes[ProjectSettingName],
    ) => Promise<DataProviderUpdateInstructions<TProjectDataTypes & MandatoryProjectDataTypes>>;
    /**
     * Get the value of the specified project setting.
     *
     * Note: This is good for retrieving a project setting once. If you want to keep the value
     * up-to-date, use `subscribeSetting` instead, which can immediately give you the value and keep
     * it up-to-date.
     *
     * Note for implementing: `getSetting` must call `papi.projectSettings.getDefault` if this
     * project does not have a value for this setting
     *
     * @param key The string id of the project setting to get
     * @returns The value of the specified project setting. Returns default setting value if the
     *   project setting does not exist on the project.
     * @throws If no default value is available for the setting.
     */
    getSetting: <ProjectSettingName extends ProjectSettingNames>(
      key: ProjectSettingName,
    ) => Promise<ProjectSettingTypes[ProjectSettingName]>;
    /**
     * Deletes the specified project setting, setting it back to its default value.
     *
     * Note for implementing: `resetSetting` should remove the value for this setting for this
     * project such that calling `getSetting` later would cause it to call
     * `papi.projectSettings.getDefault` and return the default value.
     *
     * @param key The string id of the project setting to reset
     * @returns `true` if successfully reset the project setting, `false` otherwise
     */
    resetSetting: <ProjectSettingName extends ProjectSettingNames>(
      key: ProjectSettingName,
    ) => Promise<boolean>;
  };
  /**
   * An object on the papi for interacting with that project data. Created by the papi and layers
   * over an {@link IProjectDataProviderEngine} provided by an extension. Returned from getting a
   * project data provider with `papi.projectDataProviders.get`.
   *
   * Project Data Providers are a specialized version of {@link IDataProvider} that work with
   * projects by exposing methods according to a set of `projectInterface`s. For each project
   * available, a Project Data Provider Factory that supports that project with some set of
   * `projectInterface`s creates a new instance of a PDP with the supported `projectInterface`s.
   *
   * Often, these objects are Layering PDPs, meaning they manipulate data provided by Base PDPs
   * which actually control the saving and loading of the data. Base PDPs must implement
   * {@link IBaseProjectDataProvider}, which imposes additional requirements.
   *
   * See more information, including the difference between Base and Layering PDPs, at
   * {@link ProjectDataProviderInterfaces}.
   */
  type IProjectDataProvider<TProjectDataTypes extends DataProviderDataTypes> =
    IDataProvider<TProjectDataTypes>;
  /**
   * An object on the papi for interacting with that project data. Created by the papi and layers
   * over an {@link IBaseProjectDataProviderEngine} provided by an extension. Sometimes returned from
   * getting a project data provider with `papi.projectDataProviders.get` (depending on if the PDP
   * supports the `platform.base` `projectInterface`).
   *
   * Project Data Providers are a specialized version of {@link IDataProvider} that work with
   * projects by exposing methods according to a set of `projectInterface`s. For each project
   * available, a Project Data Provider Factory that supports that project with some set of
   * `projectInterface`s creates a new instance of a PDP with the supported `projectInterface`s.
   *
   * Every Base PDP **must** fulfill the requirements of this interface in order to support the
   * methods the PAPI requires for interacting with project data.
   *
   * See more information, including the difference between Base and Layering PDPs, at
   * {@link ProjectDataProviderInterfaces}.
   */
  type IBaseProjectDataProvider<TProjectDataTypes extends DataProviderDataTypes> =
    IProjectDataProvider<TProjectDataTypes & MandatoryProjectDataTypes> &
      WithProjectDataProviderEngineSettingMethods<TProjectDataTypes> &
      WithProjectDataProviderEngineExtensionDataMethods<TProjectDataTypes> & {
        /**
         * Subscribe to receive updates to the specified project setting.
         *
         * Note: By default, this `subscribeSetting` function automatically retrieves the current
         * project setting value and runs the provided callback as soon as possible. That way, if
         * you want to keep your data up-to-date, you do not also have to run `getSetting`. You can
         * turn this functionality off in the `options` parameter.
         *
         * @param key The string id of the project setting for which to listen to changes
         * @param callback Function to run with the updated project setting value
         * @param options Various options to adjust how the subscriber emits updates
         * @returns Unsubscriber to stop listening for updates
         */
        subscribeSetting: <ProjectSettingName extends ProjectSettingNames>(
          key: ProjectSettingName,
          callback: (value: ProjectSettingTypes[ProjectSettingName]) => void,
          options: DataProviderSubscriberOptions,
        ) => Promise<UnsubscriberAsync>;
      };
  /** This is just a simple example so we have more than one. It's not intended to be real. */
  type NotesOnlyProjectDataTypes = MandatoryProjectDataTypes & {
    Notes: DataProviderDataType<string, string | undefined, string>;
  };
  /**
   * {@link IProjectDataProvider} types for each `projectInterface` supported by PAPI. Extensions can
   * add more Project Data Providers with corresponding `projectInterface`s by adding details to
   * their `.d.ts` file and registering a Project Data Provider factory with the corresponding
   * `projectInterface`.
   *
   * There are two types of Project Data Providers (and Project Data Provider Factories that serve
   * them):
   *
   * 1. Base Project Data Provider - provides project data via some `projectInterface`s for its own
   *    projects with **its own unique project ids**. These PDPs **must support the `platform.base`
   *    `projectInterface` by implementing {@link IBaseProjectDataProvider}**. More information
   *    below.
   * 2. Layering Project Data Provider - layers over other PDPs and provides additional
   *    `projectInterface`s for projects on other PDPs. Likely **does not provide its own unique
   *    project ids** but rather layers over base PDPs' project ids. These PDPs **do not need to
   *    support the `platform.base` `projectInterface` and should instead implement
   *    {@link IProjectDataProvider}**. Instead of providing projects themselves, they likely use the
   *    `ExtensionData` data type exposed via the `platform.base` `projectInterface` on Base PDPs to
   *    provide additional project data on top of Base PDPs.
   *
   * All Base Project Data Provider Interfaces' data types **must** implement
   * {@link IBaseProjectDataProvider} (which extends {@link MandatoryProjectDataTypes}) like in the
   * following example. Please see its documentation for information on how Project Data Providers
   * can implement this interface.
   *
   * Note: The keys of this interface are the `projectInterface`s for the associated Project Data
   * Provider Interfaces. `projectInterface`s represent standardized sets of methods on a PDP.
   *
   * WARNING: Each Base Project Data Provider **must** fulfill certain requirements for its
   * `getSetting`, `setSetting`, `resetSetting`, `getExtensionData`, and `setExtensionData` methods.
   * See {@link IBaseProjectDataProvider} and {@link MandatoryProjectDataTypes} for more information.
   *
   * An extension can extend this interface to add types for the Project Data Provider Interfaces
   * its registered factory provides by adding the following to its `.d.ts` file (in this example,
   * we are adding a Base Project Data Provider interface for the `MyExtensionBaseProjectInterface`
   * `projectInterface` and a Layering Project Data Provider interface for the
   * `MyExtensionLayeringProjectInterface` `projectInterface`):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export type MyBaseProjectDataTypes = {
   *     MyProjectData: DataProviderDataType<string, string, string>;
   *   };
   *
   *   export type MyLayeringProjectDataTypes = {
   *     MyOtherProjectData: DataProviderDataType<number, number, number>;
   *   };
   *
   *   export interface ProjectDataProviderInterfaces {
   *     // Note that the base PDP implements `I**Base**ProjectDataProvider`
   *     MyExtensionBaseProjectInterface: IBaseProjectDataProvider<MyProjectDataTypes>;
   *     // Note that the layering PDP only implements `IProjectDataProvider` because the base PDP already
   *     // provides the `platform.base` data types
   *     MyExtensionLayeringProjectInterface: IProjectDataProvider<MyLayeringProjectDataTypes>;
   *   }
   * }
   * ```
   */
  interface ProjectDataProviderInterfaces {
    /**
     * Base `projectInterface` that all PDPs that expose their own unique project ids must
     * implement.
     *
     * There should be a PDP that provides `platform.base` for all available project ids.
     */
    [PROJECT_INTERFACE_PLATFORM_BASE]: IBaseProjectDataProvider<MandatoryProjectDataTypes>;
    'platform.notesOnly': IProjectDataProvider<NotesOnlyProjectDataTypes>;
    'platform.placeholder': IProjectDataProvider<PlaceholderDataTypes>;
  }
  /**
   * Names for each `projectInterface` available on the papi. `projectInterface`s represent
   * standardized sets of methods on a PDP. Extensions can register a Project Data Provider Factory
   * with one or more `projectInterface`s to indicate that factory provides Project Data Providers
   * that have the methods associated with those `projectInterface`s.
   *
   * Automatically includes all extensions' `projectInterface`s that are added to
   * {@link ProjectDataProviderInterfaces}.
   *
   * @example 'platform.notesOnly'
   */
  type ProjectInterfaces = keyof ProjectDataProviderInterfaces;
  /**
   * `DataProviderDataTypes` for each Project Data Provider Interface supported by PAPI. These are
   * the data types served by Project Data Providers for each `projectInterface`.
   *
   * Automatically includes all extensions' `projectInterface`s that are added to
   * {@link ProjectDataProviderInterfaces}.
   *
   * Note: The keys of this interface are the `projectInterface`s for the associated project data
   * provider interface data types. `projectInterface`s represent standardized sets of methods on a
   * PDP.
   *
   * @example
   *
   * ```typescript
   * ProjectInterfaceDataTypes['MyExtensionProjectInterfaceName'] => MandatoryProjectDataTypes & {
   *     MyProjectData: DataProviderDataType<string, string, string>;
   *   }
   * ```
   */
  type ProjectInterfaceDataTypes = {
    [ProjectInterface in ProjectInterfaces]: ExtractDataProviderDataTypes<
      ProjectDataProviderInterfaces[ProjectInterface]
    >;
  };
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
   * {@link IDataProvider} types for each data provider supported by PAPI. Extensions can add more
   * data providers with corresponding data provider IDs by adding details to their `.d.ts` file and
   * registering a data provider engine in their `activate` function with
   * `papi.dataProviders.registerEngine`.
   *
   * Note: Data Provider names must consist of two strings separated by at least one period. We
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
  /**
   * {@link NetworkableObject} types for each web view controller supported by PAPI. A Web View
   * Controller is a network object that represents a web view and whose methods facilitate
   * communication between its associated web view and extensions that want to interact with it.
   * `WebViewControllers` can be created by {@link IWebViewProvider} of the same `webViewType`.
   * Extensions can add web view controllers with corresponding `webViewType`s by adding details to
   * their `.d.ts` file and registering a web view controller in their web view provider's
   * `getWebView` function with `papi.webViewProviders.registerWebViewController`. If you want to
   * create web view controllers, we recommend you create a class derived from the abstract class
   * {@link WebViewFactory}, which automatically manage the lifecycle of the web view controllers for
   * you.
   *
   * Note: The keys of this interface are the `webViewType`s for the web views associated with these
   * web view controllers. They must consist of two strings separated by at least one period. We
   * recommend one period and lower camel case in case we expand the api in the future to allow dot
   * notation.
   *
   * An extension can extend this interface to add a type for the web view controller it registers
   * by adding the following to its `.d.ts` file (in this example, we are adding the
   * `'helloSomeone.peopleWebView'` web view controller type):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export type PeopleWebViewController = NetworkableObject<{
   *     setSelectedPerson(name: string): Promise<boolean>;
   *     testRandomMethod(things: string): Promise<string>;
   *   }>;
   *
   *   export interface WebViewControllers {
   *     'helloSomeone.peopleWebView': PeopleWebViewController;
   *   }
   * }
   * ```
   */
  interface WebViewControllers {
    'platform.stuffWebView': NetworkableObject<{
      doStuff(thing: string): Promise<boolean>;
    }>;
    'platform.placeholderWebView': NetworkableObject<{
      runPlaceholderStuff(thing: string): Promise<boolean>;
    }>;
  }
  /**
   * `webViewType`s for each web view controller available on the papi.
   *
   * Automatically includes all extensions' web view controllers that are added to
   * {@link WebViewControllers}.
   *
   * @example 'platform.placeholderWebView'
   */
  type WebViewControllerTypes = keyof WebViewControllers;
}
declare module 'shared/services/command.service' {
  import { UnsubscriberAsync } from 'platform-bible-utils';
  import { CommandHandlers } from 'papi-shared-types';
  import { SingleMethodDocumentation } from 'shared/models/openrpc.model';
  /**
   * Register a command on the papi to be handled here
   *
   * @param commandName Command name to register for handling here
   *
   *   - Note: Command names must consist of two string separated by at least one period. We recommend one
   *       period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * @param handler Function to run when the command is invoked
   * @returns Promise that resolves if the command successfully registered and unsubscriber function
   *   to run to stop the passed-in function from handling commands
   */
  export const registerCommand: <CommandName extends keyof CommandHandlers>(
    commandName: CommandName,
    handler: CommandHandlers[CommandName],
    commandDocs?: SingleMethodDocumentation,
  ) => Promise<UnsubscriberAsync>;
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
   *
   * The command service allows you to exchange messages with other components in the platform. You
   * can register a command that other services and extensions can send you. You can send commands to
   * other services and extensions that have registered commands.
   */
  export type moduleSummaryComments = {};
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
declare module 'shared/models/notification.service-model' {
  import { CommandHandlers } from 'papi-shared-types';
  import { LocalizeKey } from 'platform-bible-utils';
  export type Severity = 'info' | 'warning' | 'error';
  /** Data needed to display a notification to the user */
  export interface PlatformNotification {
    /**
     * Text to display to the user.
     *
     * Automatically localized if this is a {@link LocalizeKey}.
     */
    message: string | LocalizeKey;
    /** Severity of the notification */
    severity: Severity;
    /**
     * Optional label for users to click when the notification shows.
     *
     * Automatically localized if this is a {@link LocalizeKey}.
     */
    clickCommandLabel?: string | LocalizeKey;
    /** Optional command to run if users click on the label in the notification */
    clickCommand?: keyof CommandHandlers;
    /** Optional ID of a previous notification to update instead of showing a new notification */
    notificationId?: string | number;
  }
  /**
   *
   * Service that sends notifications to users in the UI
   */
  export interface INotificationService {
    /**
     * Send a notification to the user. If a notification with the same ID is already showing, it will
     * be updated with the new notification.
     *
     * @param notification Notification to send
     * @returns Promise that resolves with the ID of the notification
     */
    send(notification: PlatformNotification): Promise<string | number>;
  }
  export const NotificationServiceNetworkObjectName = 'NotificationService';
}
declare module 'shared/services/notification.service' {
  import { type INotificationService } from 'shared/models/notification.service-model';
  /**
   *
   * Service that sends notifications to users in the UI
   */
  const notificationService: INotificationService;
  export default notificationService;
}
declare module 'shared/services/data-provider.service' {
  /** Handles registering data providers and serving data around the papi. Exposed on the papi. */
  import { DataProviderDataTypes } from 'shared/models/data-provider.model';
  import IDataProviderEngine, {
    DataProviderEngine,
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
   * Indicate if we are aware of an existing data provider with the given name. If a data provider
   * with the given name is somewhere else on the network, this function won't tell you about it
   * unless something else in the existing process is subscribed to it.
   */
  function hasKnown(providerName: string): boolean;
  /**
   *
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
  function ignore(target: object, member: string): void;
  /**
   *
   * Decorator function that marks a data provider engine `set<data_type>` method not to automatically
   * emit an update and notify subscribers of a change to the data. papi will still consider the
   * `set<data_type>` method to be a data type method, but it will not layer over it to emit updates.
   *
   * @example Use this as a decorator on a class's method:
   *
   * ```typescript
   * class MyDataProviderEngine {
   * ＠papi.dataProviders.decorators.doNotNotify
   * async setVerse() {}
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
   *   async setVerse() {},
   * };
   * papi.dataProviders.decorators.ignore(dataProviderEngine.setVerse);
   * ```
   *
   * @param method The method not to layer over to send an automatic update
   */
  function doNotNotify(
    method: Function & {
      doNotNotify?: boolean;
    },
  ): void;
  /**
   * Decorator function that marks a data provider engine `set<data_type>` method not to automatically
   * emit an update and notify subscribers of a change to the data. papi will still consider the
   * `set<data_type>` method to be a data type method, but it will not layer over it to emit updates.
   *
   * @param target The class that has the method not to layer over to send an automatic update
   * @param member The name of the method not to layer over to send an automatic update
   *
   *   Note: this is the signature that provides the actual decorator functionality. However, since
   *   users will not be using this signature, the example usage is provided in the signature above.
   */
  function doNotNotify(target: object, member: string): void;
  /**
   *
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
    /**
     *
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
    ignore: typeof ignore;
    /**
     *
     * Decorator function that marks a data provider engine `set<data_type>` method not to automatically
     * emit an update and notify subscribers of a change to the data. papi will still consider the
     * `set<data_type>` method to be a data type method, but it will not layer over it to emit updates.
     *
     * @example Use this as a decorator on a class's method:
     *
     * ```typescript
     * class MyDataProviderEngine {
     * ＠papi.dataProviders.decorators.doNotNotify
     * async setVerse() {}
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
     *   async setVerse() {},
     * };
     * papi.dataProviders.decorators.ignore(dataProviderEngine.setVerse);
     * ```
     *
     * @param method The method not to layer over to send an automatic update
     */
    doNotNotify: typeof doNotNotify;
  };
  /**
   *
   * Creates a data provider to be shared on the network layering over the provided data provider
   * engine.
   *
   * @param providerName Name this data provider should be called on the network
   * @param dataProviderEngine The object to layer over with a new data provider object
   * @param dataProviderType String to send in a network event to clarify what type of data provider
   *   is represented by this engine. For generic data providers, the default value of `dataProvider`
   *   can be used. For data provider types that have multiple instances (e.g., project data
   *   providers), a unique type name should be used to distinguish from generic data providers.
   * @param dataProviderAttributes Optional object that will be sent in a network event to provide
   *   additional metadata about the data provider represented by this engine.
   *
   *   WARNING: registering a dataProviderEngine mutates the provided object. Its `notifyUpdate` and
   *   `set` methods are layered over to facilitate data provider subscriptions.
   * @returns The data provider including control over disposing of it. Note that this data provider
   *   is a new object distinct from the data provider engine passed in.
   */
  function registerEngine<DataProviderName extends DataProviderNames>(
    providerName: DataProviderName,
    dataProviderEngine: IDataProviderEngine<DataProviderTypes[DataProviderName]>,
    dataProviderType?: string,
    dataProviderAttributes?:
      | {
          [property: string]: unknown;
        }
      | undefined,
  ): Promise<DisposableDataProviders[DataProviderName]>;
  /**
   * Creates a data provider to be shared on the network layering over the provided data provider
   * engine.
   *
   * @type `TDataTypes` - The data provider data types served by the data provider to create.
   *
   *   This is not exposed on the papi as it is a helper function to enable other services to layer over
   *   this service and create their own subsets of data providers with other types than
   *   `DataProviders` types using this function and {@link getByType}
   * @param providerName Name this data provider should be called on the network
   * @param dataProviderEngine The object to layer over with a new data provider object
   * @param dataProviderType String to send in a network event to clarify what type of data provider
   *   is represented by this engine. For generic data providers, the default value of `dataProvider`
   *   can be used. For data provider types that have multiple instances (e.g., project data
   *   providers), a unique type name should be used to distinguish from generic data providers.
   * @param dataProviderAttributes Optional object that will be sent in a network event to provide
   *   additional metadata about the data provider represented by this engine.
   *
   *   WARNING: registering a dataProviderEngine mutates the provided object. Its `notifyUpdate` and
   *   `set` methods are layered over to facilitate data provider subscriptions.
   * @returns The data provider including control over disposing of it. Note that this data provider
   *   is a new object distinct from the data provider engine passed in.
   */
  export function registerEngineByType<TDataTypes extends DataProviderDataTypes>(
    providerName: string,
    dataProviderEngine: IDataProviderEngine<TDataTypes>,
    dataProviderType?: string,
    dataProviderAttributes?:
      | {
          [property: string]: unknown;
        }
      | undefined,
  ): Promise<IDisposableDataProvider<IDataProvider<TDataTypes>>>;
  /**
   *
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
    /**
     *
     * Indicate if we are aware of an existing data provider with the given name. If a data provider
     * with the given name is somewhere else on the network, this function won't tell you about it
     * unless something else in the existing process is subscribed to it.
     */
    hasKnown: typeof hasKnown;
    /**
     *
     * Creates a data provider to be shared on the network layering over the provided data provider
     * engine.
     *
     * @param providerName Name this data provider should be called on the network
     * @param dataProviderEngine The object to layer over with a new data provider object
     * @param dataProviderType String to send in a network event to clarify what type of data provider
     *   is represented by this engine. For generic data providers, the default value of `dataProvider`
     *   can be used. For data provider types that have multiple instances (e.g., project data
     *   providers), a unique type name should be used to distinguish from generic data providers.
     * @param dataProviderAttributes Optional object that will be sent in a network event to provide
     *   additional metadata about the data provider represented by this engine.
     *
     *   WARNING: registering a dataProviderEngine mutates the provided object. Its `notifyUpdate` and
     *   `set` methods are layered over to facilitate data provider subscriptions.
     * @returns The data provider including control over disposing of it. Note that this data provider
     *   is a new object distinct from the data provider engine passed in.
     */
    registerEngine: typeof registerEngine;
    /**
     *
     * Get a data provider that has previously been set up
     *
     * @param providerName Name of the desired data provider
     * @returns The data provider with the given name if one exists, undefined otherwise
     */
    get: typeof get;
    /**
     *
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
    decorators: typeof decorators;
    /**
     *
     * Abstract class that provides a placeholder `notifyUpdate` for data provider engine classes. If a
     * data provider engine class extends this class, it doesn't have to specify its own `notifyUpdate`
     * function in order to use `notifyUpdate`.
     *
     * @see {@link IDataProviderEngine} for more information on extending this class.
     */
    DataProviderEngine: typeof DataProviderEngine;
  }
  /**
   *
   * Service that allows extensions to send and receive data to/from other extensions
   */
  const dataProviderService: DataProviderService;
  export default dataProviderService;
}
declare module 'shared/models/project-metadata.model' {
  import { ProjectInterfaces } from 'papi-shared-types';
  /**
   * Low-level information describing a project that Platform.Bible directly manages and uses to load
   * project data
   *
   * Returned from Project Data Provider Factories in order to inform others about what projects they
   * support in what form. Layered over to create {@link ProjectMetadata}
   */
  export type ProjectMetadataWithoutFactoryInfo = {
    /** ID of the project (must be unique and case insensitive) */
    id: string;
    /**
     * All `projectInterface`s (aka standardized sets of methods on a PDP) that Project Data Providers
     * for this project support. Indicates what sort of project data should be available on this
     * project.
     */
    projectInterfaces: ProjectInterfaces[];
  };
  export type ProjectDataProviderFactoryMetadataInfo = {
    /**
     * Which `projectInterface`s (aka standardized sets of methods on a PDP) the Project Data Provider
     * for this project created by this Project Data Provider Factory supports. Indicates what sort of
     * project data should be available on this project from this PDP Factory.
     */
    projectInterfaces: ProjectInterfaces[];
  };
  /**
   * Low-level information describing a project that Platform.Bible directly manages and uses to load
   * project data
   *
   * `papi.projectLookup` retrieves, aggregates, and augments
   * {@link ProjectMetadataWithoutFactoryInfo}s from Project Data Provider Factories to create these in
   * order to inform others about what projects are available and in what forms. This metadata may be
   * merged from metadata provided by multiple PDPFs.
   */
  export type ProjectMetadata = ProjectMetadataWithoutFactoryInfo & {
    /**
     * Specifics regarding which Project Data Provider Factories provide which `projectInterface`s.
     * This is additional metadata in addition to the `projectInterfaces` property that may be useful
     * in a few specific situations. All `projectInterfaces` contained in this data are already listed
     * in `projectInterfaces`, so you can use that unless you have a specific need to use this extra
     * information.
     *
     * The keys of this object are ids of the PDP Factories that provide the metadata, namely the
     * `projectInterface`s for this project (meaning this PDPF can provide a Project Data Provider for
     * this project with these `projectInterfaces`)
     */
    pdpFactoryInfo: {
      [pdpFactoryId: string]: ProjectDataProviderFactoryMetadataInfo | undefined;
    };
  };
}
declare module 'shared/models/project-data-provider-factory.interface' {
  import { Dispose, ModifierProject } from 'platform-bible-utils';
  import { ProjectMetadataWithoutFactoryInfo } from 'shared/models/project-metadata.model';
  export const PDP_FACTORY_OBJECT_TYPE: string;
  export type ProjectMetadataFilterOptions = ModifierProject & {
    /** Project IDs to include */
    includeProjectIds?: string | string[];
    /** Project IDs to exclude */
    excludeProjectIds?: string | string[];
  };
  /**
   * Network object that creates Project Data Providers of a specific set of `projectInterface`s as
   * requested on the `papi`. These are created internally within the platform to layer over
   * TypeScript-extension-provided {@link IProjectDataProviderEngineFactory} or are created by
   * independent processes on the `papi`.
   *
   * A PDP Factory can provide its own unique project ids (Base PDP Factory) or layer over other PDPFs
   * and provide additional `projectInterface`s on those projects (Layering PDP Factory). Base PDP
   * Factories must create PDPs that support the `platform.base` `projectInterface`. See
   * {@link IBaseProjectDataProvider} and {@link ProjectDataProviderInterfaces} for more information.
   */
  interface IProjectDataProviderFactory extends Dispose {
    /**
     *
     * Get metadata about all projects that can be served by PDPs created by this PDP factory.
     *
     * If this is a Base PDP Factory, this method should return this PDP Factory's own unique project
     * IDs.
     *
     * If this is a Layering PDP Factory, this method should call
     * `papi.projectLookup.getMetadataForAllProjects` with some set of metadata filters in order to
     * determine which projects it can layer over. The set of metadata filters relevant to this PDP
     * Factory **absolutely must** be merged with the `layeringFilters` provided using
     * `papi.projectLookup.mergeMetadataFilters`, or it will get into an infinite loop of calling
     * other layering PDPs.
     *
     * WARNING: If this is a Layering PDP Factory, it **absolutely must** merge its metadata filters
     * with `layeringFilters` provided using `papi.projectLookup.mergeMetadataFilters`! Otherwise you
     * will cause an infinite loop that will break things.
     *
     * @param layeringFilters If applicable, filters used to prevent this Layering PDP Factory from
     *   entering an infinite loop with another Layering PDP Factory. You **absolutely must** merge
     *   these filters with your own filters using `papi.projectLookup.mergeMetadataFilters` when
     *   calling `papi.projectLookup.getMetadataForAllProjects` inside this method. If you are not
     *   calling `getMetadataForAllProjects` inside this method (likely if this is a Base PDPF), you
     *   can safely ignore this parameter.
     */
    getAvailableProjects(
      layeringFilters?: ProjectMetadataFilterOptions,
    ): Promise<ProjectMetadataWithoutFactoryInfo[]>;
    /**
     * Returns the registered network object name of a PDP for the given project ID. Called by the
     * platform when someone uses the project data provider service to access a project's data.
     *
     * @param projectId Id of the project for which to return a project data provider.
     * @returns Id of the project data provider this `IProjectDataProviderFactory` created for this
     *   project id. It should return the same project data provider for the same combination of
     *   parameters throughout one session (in other words, in general, there should just be one
     *   project data provider for one project id).
     */
    getProjectDataProviderId(projectId: string): Promise<string>;
  }
  export default IProjectDataProviderFactory;
}
declare module 'shared/models/project-lookup.service-model' {
  import {
    ProjectDataProviderFactoryMetadataInfo,
    ProjectMetadata,
  } from 'shared/models/project-metadata.model';
  import { ProjectInterfaces } from 'papi-shared-types';
  import { ProjectMetadataFilterOptions } from 'shared/models/project-data-provider-factory.interface';
  export const NETWORK_OBJECT_NAME_PROJECT_LOOKUP_SERVICE = 'ProjectLookupService';
  /**
   * Transform the well-known pdp factory id into an id for its network object to use
   *
   * @param pdpFactoryId Id extensions use to identify this pdp factory
   * @returns Id for then network object for this pdp factory
   */
  export function getPDPFactoryNetworkObjectNameFromId(pdpFactoryId: string): string;
  /**
   * Transform a network object id for a pdp factory into its well-known pdp factory id
   *
   * @param pdpFactoryNetworkObjectName Id for then network object for this pdp factory
   * @returns Id extensions use to identify this pdp factory
   */
  export function getPDPFactoryIdFromNetworkObjectName(pdpFactoryNetworkObjectName: string): string;
  /**
   *
   * Provides metadata for projects known by the platform
   *
   * Note: this service runs locally everywhere in the TypeScript processes. It is also exposed on the
   * PAPI websocket. Note these functions are all asynchronous on the PAPI websocket regardless of if
   * their types are synchronous locally.
   */
  export type ProjectLookupServiceType = {
    /**
     * Provide metadata for all projects that have PDP factories
     *
     * Note: If there are multiple PDPs available whose metadata matches the conditions provided by
     * the parameters, their project metadata will all be combined, so all available
     * `projectInterface`s provided by the PDP Factory with the matching ID (or all PDP Factories if
     * no ID is specified) for the project will be returned. If you need `projectInterface`s supported
     * by specific PDP Factories, you can access it at {@link ProjectMetadata.pdpFactoryInfo}.
     *
     * @param options Options for specifying filters for the project metadata retrieved. If a PDP
     *   Factory ID does not match the filter, it will not be contacted at all for this function call.
     *   As a result, a PDP factory that intends to layer over other PDP factories **must** specify
     *   its ID in `options.excludePdpFactoryIds` to avoid an infinite loop of calling this function.
     * @returns ProjectMetadata for all projects stored on the local system
     */
    getMetadataForAllProjects(options?: ProjectMetadataFilterOptions): Promise<ProjectMetadata[]>;
    /**
     * Look up metadata for a specific project ID
     *
     * Note: If there are multiple PDPs available whose metadata matches the conditions provided by
     * the parameters, their project metadata will all be combined, so all available
     * `projectInterface`s provided by the PDP Factory with the matching id (or all PDP Factories if
     * no id is specified) for the project will be returned. If you need `projectInterface`s supported
     * by specific PDP Factories, you can access it at {@link ProjectMetadata.pdpFactoryInfo}.
     *
     * @param projectId ID of the project to load
     * @param projectInterface Optional `projectInterface` of the project to load. If not provided,
     *   then look at all `projectInterface`s for the given project ID.
     * @param pdpFactoryId Optional ID of the PDP factory where the project ID should be loaded. If
     *   not provided, then look in all available PDP factories for the given project ID.
     * @returns ProjectMetadata for the given project
     */
    getMetadataForProject(
      projectId: string,
      projectInterface?: ProjectInterfaces,
      pdpFactoryId?: string,
    ): Promise<ProjectMetadata>;
    /**
     * Compare two project ids to determine if they are equal
     *
     * We're treating project IDs as case insensitive strings.
     *
     * From
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator:
     *
     * Only strings that differ in base letters or accents and other diacritic marks compare as
     * unequal. Examples: a ≠ b, a ≠ á, a = A.
     */
    areProjectIdsEqual(projectIdA: string, projectIdB: string): boolean;
    /** Filter an array of {@link ProjectMetadata} in various ways */
    filterProjectsMetadata(
      projectsMetadata: ProjectMetadata[],
      options: ProjectMetadataFilterOptions,
    ): ProjectMetadata[];
    /** Combines two project metadata filters, removing duplicate items */
    mergeMetadataFilters(
      metadataFilter1: ProjectMetadataFilterOptions | undefined,
      metadataFilter2: ProjectMetadataFilterOptions | undefined,
    ): ProjectMetadataFilterOptions;
    /**
     * Get the PDP Factory info whose `projectInterface`s are most minimally matching to the provided
     * `projectInterface`
     *
     * Hopefully this will allow us to get the PDP that most closely matches the `projectInterface`s
     * to avoid unnecessary redirects through layered PDPs
     *
     * @param projectMetadata Metadata for project for which to get minimally matching PDPF
     * @param projectInterface Which `projectInterface` to minimally match for
     * @returns PDP Factory id whose `projectInterface`s minimally match the provided
     *   `projectInterface` if at least one PDP Factory was found that supports the `projectInterface`
     *   provided
     */
    getMinimalMatchPdpFactoryId(
      projectMetadata: ProjectMetadata,
      projectInterface: ProjectInterfaces,
    ): string | undefined;
  };
  /** Local object of functions to run locally on each process as part of the project lookup service */
  export const projectLookupServiceBase: ProjectLookupServiceType;
  /**
   * Gets project metadata from PDPFs filtered down by various filtering options
   *
   * Note: If there are multiple PDPs available whose metadata matches the conditions provided by the
   * parameters, their project metadata will all be combined, so all available `projectInterface`s
   * provided by the PDP Factory with the matching id (or all PDP Factories if no id is specified) for
   * the project will be returned. If you need `projectInterface`s supported by specific PDP
   * Factories, you can access it at {@link ProjectMetadata.pdpFactoryInfo}.
   */
  function internalGetMetadata(options?: ProjectMetadataFilterOptions): Promise<ProjectMetadata[]>;
  function transformGetMetadataForProjectParametersToFilter(
    projectId?: string,
    projectInterface?: ProjectInterfaces,
    pdpFactoryId?: string,
  ): {
    includeProjectIds: string | undefined;
    includeProjectInterfaces: string | undefined;
    includePdpFactoryIds: string | undefined;
  };
  /**
   * Determines whether the given project interfaces are included based on specified inclusion and
   * exclusion rules.
   *
   * This function checks if a set of project interfaces meets the criteria defined by regular
   * expressions for inclusion and exclusion.
   *
   * - A project interface is excluded if it matches any of the provided exclusion patterns.
   * - A project interface is included only if it matches at least one of the provided inclusion
   *   patterns.
   *
   * @param projectInterfaces - An array of project interfaces to evaluate against the inclusion and
   *   exclusion patterns.
   * @param includeProjectInterfaces - An array of regular expressions or arrays of regular
   *   expressions defining which interfaces should be included.
   * @param excludeProjectInterfaces - An array of regular expressions or arrays of regular
   *   expressions defining which interfaces should be excluded.
   * @returns A boolean value indicating whether the project interfaces satisfy the inclusion and
   *   exclusion criteria.
   */
  export function areProjectInterfacesIncluded(
    projectInterfaces: ProjectInterfaces[],
    includeProjectInterfaces: (RegExp | RegExp[])[],
    excludeProjectInterfaces: (RegExp | RegExp[])[],
  ): boolean;
  /**
   * Compare function (for array sorting and such) that compares two PDPF Metadata infos by most
   * minimal match to the `projectInterface` in question.
   *
   * Hopefully this will allow us to get the PDP that most closely matches the `projectInterface`s to
   * avoid unnecessary redirects through layered PDPs
   *
   * @param pdpFMetadataInfoA First ProjectDataProviderFactoryMetadataInfo to compare
   * @param pdpFMetadataInfoB Second ProjectDataProviderFactoryMetadataInfo to compare
   * @returns -1 if a is less than b, 0 if equal, and 1 otherwise
   */
  function compareProjectDataProviderFactoryMetadataInfoMinimalMatch(
    pdpFMetadataInfoA: ProjectDataProviderFactoryMetadataInfo | undefined,
    pdpFMetadataInfoB: ProjectDataProviderFactoryMetadataInfo | undefined,
  ): -1 | 0 | 1;
  /** This is an internal-only export for testing purposes and should not be used in development */
  export const testingProjectLookupService: {
    internalGetMetadata: typeof internalGetMetadata;
    compareProjectDataProviderFactoryMetadataInfoMinimalMatch: typeof compareProjectDataProviderFactoryMetadataInfoMinimalMatch;
    transformGetMetadataForProjectParametersToFilter: typeof transformGetMetadataForProjectParametersToFilter;
    LOAD_TIME_GRACE_PERIOD_MS: number;
  };
}
declare module 'shared/services/project-lookup.service' {
  const projectLookupService: import('shared/models/project-lookup.service-model').ProjectLookupServiceType;
  export default projectLookupService;
}
declare module 'shared/models/project-data-provider-engine-factory.model' {
  import { ProjectInterfaces } from 'papi-shared-types';
  import { ProjectMetadataFilterOptions } from 'shared/models/project-data-provider-factory.interface';
  import { ProjectMetadataWithoutFactoryInfo } from 'shared/models/project-metadata.model';
  import { IProjectDataProviderEngine } from 'shared/models/project-data-provider-engine.model';
  /**
   * A factory object registered with the papi that creates a Project Data Provider Engine for each
   * project with the factory's specified `projectInterface`s when the papi requests. Used by the papi
   * to create {@link IProjectDataProviderEngine}s for a specific project and `projectInterface` when
   * someone gets a project data provider with `papi.projectDataProviders.get`. When this factory
   * object is registered with `papi.projectDataProviders.registerProjectDataProviderEngineFactory`,
   * the papi creates a {@link ProjectDataProviderFactory} that layers over this engine to create
   * {@link IProjectDataProvider}s.
   *
   * Project Data Provider Engine Factories create Project Data Provider Engines for specific
   * `projectInterface`s. For each project id available on a Project Data Provider Factory, the
   * factory that supports that project with some set of `projectInterface`s creates a new instance of
   * a PDP with the supported `projectInterface`s.
   *
   * A PDP Factory can provide its own unique project ids (Base PDP Factory) or layer over other PDPFs
   * and provide additional `projectInterface`s on those projects (Layering PDP Factory). Base PDP
   * Factories must create PDPs that support the `platform.base` `projectInterface`. See
   * {@link IBaseProjectDataProvider} and {@link ProjectDataProviderInterfaces} for more information.
   *
   * WARNING: For Layering PDPFs, `getAvailableProjects` has very specific requirements that
   * **absolutely must** be met. Please see
   * {@link IProjectDataProviderEngineFactory.getAvailableProjects} for more information on the
   * requirements.
   *
   * To make creating a Layering PDPF easier, you can extend
   * {@link LayeringProjectDataProviderEngineFactory}, which automatically fulfills the special
   * requirements for Layering PDPFs. We highly recommend using it.
   */
  export interface IProjectDataProviderEngineFactory<
    SupportedProjectInterfaces extends ProjectInterfaces[],
  > {
    /**
     *
     * Get metadata about all projects that can be served by PDPs created by this PDP factory.
     *
     * If this is a Base PDP Factory, this method should return this PDP Factory's own unique project
     * IDs.
     *
     * If this is a Layering PDP Factory, this method should call
     * `papi.projectLookup.getMetadataForAllProjects` with some set of metadata filters in order to
     * determine which projects it can layer over. The set of metadata filters relevant to this PDP
     * Factory **absolutely must** be merged with the `layeringFilters` provided using
     * `papi.projectLookup.mergeMetadataFilters`, or it will get into an infinite loop of calling
     * other layering PDPs.
     *
     * WARNING: If this is a Layering PDP Factory, it **absolutely must** merge its metadata filters
     * with `layeringFilters` provided using `papi.projectLookup.mergeMetadataFilters`! Otherwise you
     * will cause an infinite loop that will break things.
     *
     * @param layeringFilters If applicable, filters used to prevent this Layering PDP Factory from
     *   entering an infinite loop with another Layering PDP Factory. You **absolutely must** merge
     *   these filters with your own filters using `papi.projectLookup.mergeMetadataFilters` when
     *   calling `papi.projectLookup.getMetadataForAllProjects` inside this method. If you are not
     *   calling `getMetadataForAllProjects` inside this method (likely if this is a Base PDPF), you
     *   can safely ignore this parameter.
     */
    getAvailableProjects(
      layeringFilters?: ProjectMetadataFilterOptions,
    ): Promise<ProjectMetadataWithoutFactoryInfo[]>;
    /**
     * Create a {@link IProjectDataProviderEngine} for the project requested so the papi can create an
     * {@link IProjectDataProvider} for the project. This project will have the same
     * `projectInterface`s as this Project Data Provider Engine Factory
     *
     * @param projectId Id of the project for which to create a {@link IProjectDataProviderEngine}
     * @returns A promise that resolves to a {@link IProjectDataProviderEngine} for the project passed
     *   in
     */
    createProjectDataProviderEngine(
      projectId: string,
    ): Promise<IProjectDataProviderEngine<SupportedProjectInterfaces>>;
  }
  /**
   *
   * Abstract class with partial implementation of {@link IProjectDataProviderEngineFactory}
   * specifically for Layering PDPFs. You can extend this class to make creating a Layering PDPF
   * easier.
   *
   * Extending this class automatically fulfills the special requirements for Layering PDPfs, so we
   * highly recommend extending this class. Please see
   * {@link IProjectDataProviderEngineFactory.getAvailableProjects} for more information on the
   * requirements.
   */
  export abstract class LayeringProjectDataProviderEngineFactory<
    SupportedProjectInterfaces extends ProjectInterfaces[],
  > {
    pdpfId: string;
    /** Regex-escaped string of this `pdpfId`. */
    protected pdpfIdRegexString: string;
    /**
     * String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s
     * (using the
     * [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
     * function) to determine if they should be included in the available projects this Layering PDPF
     * provides. This is used as {@link ProjectMetadataFilterOptions.includeProjectInterfaces} when
     * determining what available projects this layering PDPF supports. You should list here all
     * combinations of `projectInterface`s your Layering PDPs require to make sure this layering PDPF
     * announces that it supports the right projects.
     *
     * See {@link ProjectMetadataFilterOptions.includeProjectInterfaces} for more information on how to
     * use this field.
     *
     * @example
     *
     * ```typescript
     * projectInterfacesToLayerOver: ['one', ['two', 'three']];
     * ```
     *
     * This layering PDPF will announce that it supports projects whose `projectInterface`s fulfill at
     * least one of the following conditions (At least one entry in the array must match) and will
     * provide `providedProjectInterfaces` for those projects:
     *
     * - Include `one`
     * - Include both `two` and `three`.
     */
    abstract projectInterfacesToLayerOver: undefined | string | (string | string[])[];
    /**
     * The list of `projectInterface`s that this layering PDPF provides on top of existing projects.
     *
     * @example
     *
     * ```typescript
     * providedProjectInterfaces: ['four', 'five'];
     * ```
     *
     * This layering PDPF will announce that its provides the `projectInterface`s `four` and `five`
     * for projects that match `projectInterfacesToLayerOver`.
     */
    abstract providedProjectInterfaces: SupportedProjectInterfaces;
    /** @param pdpfId The id of this Project Data Provider Factory */
    constructor(pdpfId: string);
    /**
     * Implementation of {@link IProjectDataProviderEngineFactory.getAvailableProjects} that properly
     * fulfills the requirements of the method for Layering PDPFs. Announces that this Layering PDPF
     * provides the `providedProjectInterfaces` for projects that match
     * `projectInterfacesToLayerOver`.
     */
    getAvailableProjects(
      layeringFilters?: ProjectMetadataFilterOptions,
    ): Promise<ProjectMetadataWithoutFactoryInfo[]>;
  }
}
declare module 'shared/models/project-data-provider-engine.model' {
  import { ProjectInterfaces, ProjectInterfaceDataTypes } from 'papi-shared-types';
  import IDataProviderEngine, {
    DataProviderEngine,
  } from 'shared/models/data-provider-engine.model';
  import { DataProviderDataTypes } from 'shared/models/data-provider.model';
  import { UnionToIntersection } from 'platform-bible-utils';
  /**
   * The object to return from
   * {@link IProjectDataProviderEngineFactory.createProjectDataProviderEngine} that the PAPI registers
   * to create a Project Data Provider for a specific project. The ProjectDataProviderService creates
   * an {@link IProjectDataProvider} on the papi that layers over this engine, providing special
   * functionality.
   *
   * See {@link DataProviderDataTypes} for information on how to make powerful types that work well
   * with Intellisense.
   *
   * Note: papi creates a `notifyUpdate` function on the Project Data Provider Engine if one is not
   * provided, so it is not necessary to provide one in order to call `this.notifyUpdate`. However,
   * TypeScript does not understand that papi will create one as you are writing your Project Data
   * Provider Engine, so you can avoid type errors with one of the following options:
   *
   * 1. If you are using a class to create a Project Data Provider Engine, you can extend the
   *    {@link ProjectDataProviderEngine} class, and it will provide `notifyUpdate` as well as inform
   *    Intellisense that you can run `notifyUpdate` with the `Setting` data type for you:
   *
   * ```typescript
   * class MyPDPE extends ProjectDataProviderEngine<['MyProjectData']> implements IProjectDataProviderEngine<['MyProjectData']> {
   *   ...
   * }
   * ```
   *
   * 2. If you are using an object or class not extending {@link ProjectDataProviderEngine} to create a
   *    Project Data Provider Engine, you can add a `notifyUpdate` function (and, with an object, add
   *    the {@link WithNotifyUpdate} type) to your Project Data Provider Engine like so:
   *
   * ```typescript
   * const myPDPE: IProjectDataProviderEngine<['MyProjectData']> & WithNotifyUpdate<ProjectDataTypes['MyProjectData']> = {
   *   notifyUpdate(updateInstructions) {},
   *   ...
   * }
   * ```
   *
   * OR
   *
   * ```typescript
   * class MyPDPE implements IProjectDataProviderEngine<['MyProjectData']> {
   *   notifyUpdate(updateInstructions?: DataProviderEngineNotifyUpdate<ProjectDataTypes['MyProjectData']>) {}
   *   ...
   * }
   * ```
   */
  export type IProjectDataProviderEngine<SupportedProjectInterfaces extends ProjectInterfaces[]> =
    IDataProviderEngine<
      UnionToIntersection<ProjectInterfaceDataTypes[SupportedProjectInterfaces[number]]> & {}
    >;
  /**
   *
   * Abstract class that provides a placeholder `notifyUpdate` for Project Data Provider Engine
   * classes. If a Project Data Provider Engine class extends this class, it doesn't have to specify
   * its own `notifyUpdate` function in order to use `notifyUpdate`.
   *
   * Additionally, extending this class informs Intellisense that you can run `notifyUpdate` with the
   * `Setting` data type if needed like so:
   *
   * ```typescript
   * this.notifyUpdate('Setting');
   * ```
   *
   * @see {@link IProjectDataProviderEngine} for more information on extending this class.
   */
  export abstract class ProjectDataProviderEngine<
    SupportedProjectInterfaces extends ProjectInterfaces[],
    AdditionalDataTypes extends DataProviderDataTypes = {},
  > extends DataProviderEngine<
    UnionToIntersection<ProjectInterfaceDataTypes[SupportedProjectInterfaces[number]]> &
      AdditionalDataTypes
  > {}
}
declare module 'shared/models/base-project-data-provider-engine.model' {
  import {
    ProjectInterfaces,
    ProjectInterfaceDataTypes,
    WithProjectDataProviderEngineSettingMethods,
    ProjectSettingNames,
    ProjectSettingTypes,
  } from 'papi-shared-types';
  import {
    PROJECT_INTERFACE_PLATFORM_BASE,
    WithProjectDataProviderEngineExtensionDataMethods,
  } from 'shared/models/project-data-provider.model';
  import { DataProviderDataType } from 'shared/models/data-provider.model';
  import { UnionToIntersection } from 'platform-bible-utils';
  import {
    IProjectDataProviderEngine,
    ProjectDataProviderEngine,
  } from 'shared/models/project-data-provider-engine.model';
  /**
   * The object to return from
   * {@link IProjectDataProviderEngineFactory.createProjectDataProviderEngine} that the PAPI registers
   * to create a Base Project Data Provider for a specific project. The ProjectDataProviderService
   * creates an {@link IBaseProjectDataProvider} on the papi that layers over this engine, providing
   * special functionality.
   *
   * See {@link DataProviderDataTypes} for information on how to make powerful types that work well
   * with Intellisense.
   *
   * Note: papi creates a `notifyUpdate` function on the Project Data Provider Engine if one is not
   * provided, so it is not necessary to provide one in order to call `this.notifyUpdate`. However,
   * TypeScript does not understand that papi will create one as you are writing your Base Project
   * Data Provider Engine, so you can avoid type errors with one of the following options:
   *
   * 1. If you are using a class to create a Base Project Data Provider Engine, you can extend the
   *    {@link BaseProjectDataProviderEngine} class, and it will provide `notifyUpdate` as well as
   *    inform Intellisense that you can run `notifyUpdate` with the `Setting` data type for you:
   *
   * ```typescript
   * class MyPDPE extends BaseProjectDataProviderEngine<['MyProjectData']> implements IBaseProjectDataProviderEngine<['MyProjectData']> {
   *   ...
   * }
   * ```
   *
   * 2. If you are using an object or class not extending {@link BaseProjectDataProviderEngine} to create
   *    a Base Project Data Provider Engine, you can add a `notifyUpdate` function (and, with an
   *    object, add the {@link WithNotifyUpdate} type) to your Base Project Data Provider Engine like
   *    so:
   *
   * ```typescript
   * const myPDPE: IBaseProjectDataProviderEngine<['MyProjectData']> & WithNotifyUpdate<ProjectDataTypes['MyProjectData']> = {
   *   notifyUpdate(updateInstructions) {},
   *   ...
   * }
   * ```
   *
   * OR
   *
   * ```typescript
   * class MyPDPE implements IBaseProjectDataProviderEngine<['MyProjectData']> {
   *   notifyUpdate(updateInstructions?: DataProviderEngineNotifyUpdate<ProjectDataTypes['MyProjectData']>) {}
   *   ...
   * }
   * ```
   */
  export type IBaseProjectDataProviderEngine<
    SupportedProjectInterfaces extends ProjectInterfaces[],
  > = IProjectDataProviderEngine<
    [typeof PROJECT_INTERFACE_PLATFORM_BASE, ...SupportedProjectInterfaces]
  > &
    WithProjectDataProviderEngineSettingMethods<
      UnionToIntersection<ProjectInterfaceDataTypes[SupportedProjectInterfaces[number]]> & {}
    > &
    WithProjectDataProviderEngineExtensionDataMethods<
      UnionToIntersection<ProjectInterfaceDataTypes[SupportedProjectInterfaces[number]]> & {}
    >;
  /**
   *
   * Abstract class that provides a placeholder `notifyUpdate` for Base Project Data Provider Engine
   * classes. If a Base Project Data Provider Engine class extends this class, it doesn't have to
   * specify its own `notifyUpdate` function in order to use `notifyUpdate`.
   *
   * Additionally, extending this class informs Intellisense that you can run `notifyUpdate` with the
   * `Setting` data type if needed like so:
   *
   * ```typescript
   * this.notifyUpdate('Setting');
   * ```
   *
   * @see {@link IBaseProjectDataProviderEngine} for more information on extending this class.
   */
  export abstract class BaseProjectDataProviderEngine<
    SupportedProjectInterfaces extends ProjectInterfaces[],
  > extends ProjectDataProviderEngine<
    [typeof PROJECT_INTERFACE_PLATFORM_BASE, ...SupportedProjectInterfaces],
    {
      Setting: DataProviderDataType<
        ProjectSettingNames,
        ProjectSettingTypes[ProjectSettingNames],
        ProjectSettingTypes[ProjectSettingNames]
      >;
    }
  > {}
}
declare module 'shared/services/project-data-provider.service' {
  import { ProjectInterfaces, ProjectDataProviderInterfaces } from 'papi-shared-types';
  import { Dispose } from 'platform-bible-utils';
  import { IProjectDataProviderEngineFactory } from 'shared/models/project-data-provider-engine-factory.model';
  /**
   * Add a new Project Data Provider Factory to PAPI that uses the given engine.
   *
   * @param pdpFactoryId Unique id for this PDP factory
   * @param projectInterfaces The standardized sets of methods (`projectInterface`s) supported by the
   *   Project Data Provider Engines produced by this factory. Indicates what sort of project data
   *   should be available on the PDPEs created by this factory.
   * @param pdpEngineFactory Used in a ProjectDataProviderFactory to create ProjectDataProviders
   * @returns Promise that resolves to a disposable object when the registration operation completes
   */
  export function registerProjectDataProviderEngineFactory<
    SupportedProjectInterfaces extends ProjectInterfaces[],
  >(
    pdpFactoryId: string,
    projectInterfaces: SupportedProjectInterfaces,
    pdpEngineFactory: IProjectDataProviderEngineFactory<SupportedProjectInterfaces>,
  ): Promise<Dispose>;
  /**
   * Get a Project Data Provider for the given project ID.
   *
   * @example
   *
   * ```typescript
   * const pdp = await get('platformScripture.USFM_Verse', 'ProjectID12345');
   * pdp.getVerseUSFM(new VerseRef('JHN', '1', '1'));
   * ```
   *
   * @param projectInterface `projectInterface` that the project to load must support. The TypeScript
   *   type for the returned project data provider will have the project data provider interface type
   *   associated with this `projectInterface`. If the project does not implement this
   *   `projectInterface` (according to its metadata), an error will be thrown.
   * @param projectId ID for the project to load
   * @param pdpFactoryId Optional ID of the PDP factory from which to get the project data provider if
   *   the PDP factory supports this project id and project interface. If not provided, then look in
   *   all available PDP factories for the given project ID.
   * @returns Project data provider with types that are associated with the given `projectInterface`
   * @throws If did not find a project data provider for the project id that supports the requested
   *   `projectInterface` (and from the requested PDP factory if specified)
   */
  export function get<ProjectInterface extends ProjectInterfaces>(
    projectInterface: ProjectInterface,
    projectId: string,
    pdpFactoryId?: string,
  ): Promise<ProjectDataProviderInterfaces[ProjectInterface]>;
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
   * - `app://` - goes to the `.platform.bible` directory inside the user's home directory.
   *
   *   - On Linux and Mac, this is `$HOME/.platform.bible`
   *   - On Windows, this is `%USERPROFILE%/.platform.bible`
   *   - Note: In development, `app://` always goes to `paranext-core/dev-appdata`
   * - `cache://` - goes to the app's temporary file cache at `app://cache`
   * - `data://` - goes to the app's data storage location at `app://data`
   * - `resources://` - goes to the `resources` directory inside the install directory
   *
   *   - Note: In development, `resources://` always goes to the repo root, `paranext-core`. Not all files
   *       are copied into the production `resources` folder, though. See `electron-builder.json5`'s
   *       `extraResources` for some that are copied.
   * - `file://` - an absolute file path from drive root
   *
   * Note: projects are stored in the production version of `app://projects` regardless of whether you
   * are in production or development
   */
  export type Uri = string;
}
declare module 'node/utils/util' {
  import { Uri } from 'shared/data/file-system.model';
  export const FILE_PROTOCOL = 'file://';
  export const RESOURCES_PROTOCOL = 'resources://';
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
  /**
   * Determines if running in noisy dev mode
   *
   * @returns True if the process is running in noisy dev mode, false otherwise
   */
  export const isNoisyDevModeEnvVariableSet: () => boolean;
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
   * Moves a file from one location to another
   *
   * @param sourceUri The location of the file to move
   * @param destinationUri The uri where the file should be moved
   */
  export function moveFile(sourceUri: Uri, destinationUri: Uri): Promise<void>;
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
  /**
   * Calculates the hash of a given data buffer
   *
   * @param hashAlgorithm Name of the hash algorithm to use, such as "sha512"
   * @param encodingType String encoding to use for returning the binary hash value that is calculated
   * @param buffer Raw data to be fed into the hash algorithm
   * @returns String encoded value of the digest (https://csrc.nist.gov/glossary/term/hash_digest)
   */
  export function generateHashFromBuffer(
    hashAlgorithm: string,
    encodingType: 'base64' | 'base64url' | 'hex' | 'binary',
    buffer: Buffer,
  ): string;
}
declare module 'shared/models/extension-basic-data.model' {
  /** Represents an object that contains the most basic information about an extension */
  export type ExtensionBasicData = {
    /** Name of an extension */
    name: string;
  };
}
declare module 'node/models/execution-token.model' {
  import { ExtensionBasicData } from 'shared/models/extension-basic-data.model';
  /** For now this is just for extensions, but maybe we will want to expand this in the future */
  export type ExecutionTokenType = 'extension';
  /** Execution tokens can be passed into API calls to provide context about their identity */
  export class ExecutionToken implements ExtensionBasicData {
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
  import { Buffer } from 'node:buffer';
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
  import { LocalizeKey } from 'platform-bible-utils';
  /** General options to adjust dialogs (created from `papi.dialogs`) */
  export type DialogOptions = {
    /**
     * Dialog title to display in the header. If you provide a {@link LocalizeKey}, it will be
     * localized before displaying.
     *
     * Default depends on the dialog
     */
    title?: string | LocalizeKey;
    /** Url of dialog icon to display in the header. Default is Platform.Bible logo */
    iconUrl?: string;
    /**
     * The message to show the user in the dialog. If you provide a {@link LocalizeKey}, it will be
     * localized before displaying.
     *
     * Default depends on the dialog
     */
    prompt?: string | LocalizeKey;
  };
  /** Keys of properties on {@link DialogOptions} that should be localized if they are LocalizeKeys */
  export const DIALOG_OPTIONS_LOCALIZABLE_PROPERTY_KEYS: readonly ['title', 'prompt'];
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
  import { ProjectMetadataFilterOptions } from 'shared/models/project-data-provider-factory.interface';
  /** The tabType for the select project dialog in `select-project.dialog.tsx` */
  export const SELECT_PROJECT_DIALOG_TYPE = 'platform.selectProject';
  /** The tabType for the select multiple projects dialog in `select-multiple-projects.dialog.tsx` */
  export const SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE = 'platform.selectMultipleProjects';
  /** The tabType for the select books dialog in `select-books.dialog.tsx` */
  export const SELECT_BOOKS_DIALOG_TYPE = 'platform.selectBooks';
  type ProjectDialogOptionsBase = DialogOptions & ProjectMetadataFilterOptions;
  /** Options to provide when showing the Select Project dialog */
  export type SelectProjectDialogOptions = ProjectDialogOptionsBase;
  /** Options to provide when showing the Select Multiple Project dialog */
  export type SelectMultipleProjectsDialogOptions = ProjectDialogOptionsBase & {
    /** Project IDs that should start selected in the dialog */
    selectedProjectIds?: string[];
  };
  /** Options to provide when showing the Select Books dialog */
  export type SelectBooksDialogOptions = DialogOptions & {
    /** Books IDs that should start selected in the dialog */
    selectedBookIds?: string[];
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
    [SELECT_BOOKS_DIALOG_TYPE]: DialogDataTypes<SelectBooksDialogOptions, string[]>;
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
  import {
    DialogTabTypes,
    DialogTypes,
    SelectProjectDialogOptions,
  } from 'renderer/components/dialogs/dialog-definition.model';
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
     * Shows a select project dialog to the user and prompts the user to select a project
     *
     * @param options Various options for configuring the dialog that shows
     * @returns Returns the user's selected project id or `undefined` if the user cancels
     */
    selectProject(options?: SelectProjectDialogOptions): Promise<string | undefined>;
  }
  /** Prefix on requests that indicates that the request is related to dialog operations */
  export const CATEGORY_DIALOG = 'dialog';
}
declare module 'shared/services/dialog.service' {
  import { DialogService } from 'shared/services/dialog.service-model';
  const dialogService: DialogService;
  export default dialogService;
}
declare module 'shared/models/create-process-privilege.model' {
  import {
    ChildProcess,
    ChildProcessByStdio,
    ForkOptions,
    SpawnOptionsWithStdioTuple,
    StdioPipe,
  } from 'child_process';
  import { Readable, Writable } from 'stream';
  import { ExtensionBasicData } from 'shared/models/extension-basic-data.model';
  /**
   * Run {@link spawn} to create a child process. The platform will automatically kill all child
   * processes created this way in packaged builds. Child processes are not killed when running in
   * development.
   *
   * This method is essentially a layer over the [`spawn`
   * method](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options) from
   * the Node `child_process` module. Please see its documentation for more information.
   *
   * @example The following example assumes there are subdirectories in the extension's files for
   * win32, linux, and macOS that include appropriate executables.
   *
   * ```@typescript
   * export async function activate(context: ExecutionActivationContext) {
   *   const { executionToken } = context;
   *   const { createProcess } = context.elevatedPrivileges;
   *   if (!createProcess)
   *     throw new Error('Forgot to add "createProcess" to "elevatedPrivileges" in manifest.json');
   *   switch (createProcess.osData.platform) {
   *     case 'win32':
   *       createProcess.spawn(executionToken, 'win32/RunMe.exe', [], { stdio: [null, null, null] });
   *       break;
   *     case 'linux':
   *       createProcess.spawn(executionToken, 'linux/runMe', [], { stdio: [null, null, null] });
   *       break;
   *     case 'darwin':
   *       createProcess.spawn(executionToken, 'macOS/runMe', [], { stdio: [null, null, null] });
   *       break;
   *     default:
   *       throw new Error(`Unsupported platform: ${createProcess.osData.platform}`);
   *   }
   * ```
   *
   * @param executionToken ExecutionToken object provided when an extension was activated
   * @param command Command to run to start the process
   * @param args Arguments to pass to the command
   * @param options Options to pass to `spawn`. The `cwd` option will be overridden to the extension's
   *   root directory.
   * @returns A {@link ChildProcessByStdio} object representing the command
   */
  export type PlatformSpawn = (
    executionToken: ExtensionBasicData,
    command: string,
    args: readonly string[],
    options: SpawnOptionsWithStdioTuple<StdioPipe, StdioPipe, StdioPipe>,
  ) => ChildProcessByStdio<Writable, Readable, Readable>;
  /**
   * Run {@link fork} to create a child process. The platform will automatically kill all child
   * processes created this way in packaged builds. Child processes are not killed when running in
   * development.
   *
   * This method is essentially a layer over the [`fork`
   * method](https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options) from
   * the Node `child_process` module. Please see its documentation for more information.
   *
   * @example The following example assumes there is a file named `childProcess.js` in the extension's
   * `assets` subdirectory
   *
   * ```@typescript
   * export async function activate(context: ExecutionActivationContext) {
   *   const { executionToken } = context;
   *   const { createProcess } = context.elevatedPrivileges;
   *   if (!createProcess)
   *     throw new Error('Forgot to add "createProcess" to "elevatedPrivileges" in manifest.json');
   *   createProcess.fork(executionToken, 'assets/childProcess.js');
   * ```
   *
   * @param executionToken ExecutionToken object provided when an extension was activated
   * @param modulePath The module to run in the child
   * @param args Arguments to pass when creating the node process
   * @param options Options to pass to `fork`. The `cwd` option will be overridden to the extension's
   *   root directory.
   * @returns A {@link ChildProcess} object representing the process running the module
   */
  export type PlatformFork = (
    executionToken: ExtensionBasicData,
    modulePath: string,
    args?: readonly string[],
    options?: ForkOptions,
  ) => ChildProcess;
  /** Data about the operating system on which this process is running */
  export type OperatingSystemData = {
    /** Value of `os.platform()` in Node */
    platform: string;
    /** Value of `os.type()` in Node */
    type: string;
    /** Value of `os.release()` in Node */
    release: string;
  };
  export type CreateProcess = {
    spawn: PlatformSpawn;
    fork: PlatformFork;
    osData: OperatingSystemData;
  };
}
declare module 'shared/models/manage-extensions-privilege.model' {
  /** Base64 encoded hash values */
  export type HashValues = Partial<{
    sha256: string;
    sha512: string;
  }>;
  /** Represents an extension that can be enabled or disabled */
  export type ExtensionIdentifier = {
    extensionName: string;
    extensionVersion: string;
  };
  /**
   * Represents all extensions that are installed. Note that packaged extensions cannot be disabled,
   * so they are implied to always be enabled.
   */
  export type InstalledExtensions = {
    /**
     * Extensions that are explicitly bundled to be part of the application. They cannot be disabled.
     * At runtime no extensions can be added or removed from the set of packaged extensions.
     */
    packaged: ExtensionIdentifier[];
    /**
     * Extensions that are running but can be dynamically disabled. At runtime extensions can be added
     * or removed from the set of enabled extensions.
     */
    enabled: ExtensionIdentifier[];
    /**
     * Extensions that are not running but can be dynamically enabled. At runtime extensions can be
     * added or removed from the set of disabled extensions.
     *
     * The only difference between a disabled extension and an extension that isn't installed is that
     * disabled extensions do not need to be downloaded again to run them.
     */
    disabled: ExtensionIdentifier[];
  };
  /**
   * Download an extension from a given URL and enable it
   *
   * @param extensionUrlToDownload URL to the extension ZIP file to download
   * @param fileSize Expected size of the file
   * @param fileHashes Hash value(s) of the file to download. Note that only one hash value may be
   *   validated, but multiple hash values may be provided so the installer can choose any of them for
   *   validation. For example, if you provide a sha256 hash value and a sha512 hash value, the
   *   installer may only use the sha512 hash value for validation.
   * @returns Promise that resolves when the extension has been installed
   */
  export type InstallExtensionFunction = (
    extensionUrlToDownload: string,
    fileSize: number,
    fileHashes: HashValues,
  ) => Promise<void>;
  /**
   * Start running an extension that had been previously downloaded and disabled
   *
   * @param extensionIdentifier Details of the extension to enable
   * @returns Promise that resolves when the extension has been enabled, throws if enabling fails
   */
  export type EnableExtensionFunction = (extensionIdentifier: ExtensionIdentifier) => Promise<void>;
  /**
   * Stop running an extension that had been previously downloaded and enabled
   *
   * @param extensionIdentifier Details of the extension to disable
   * @returns Promise that resolves when the extension has been enabled, throws if enabling fails
   */
  export type DisableExtensionFunction = (
    extensionIdentifier: ExtensionIdentifier,
  ) => Promise<void>;
  /** Get extension identifiers of all extensions on the system */
  export type GetInstalledExtensionsFunction = () => Promise<InstalledExtensions>;
  /** Functions needed to manage extensions */
  export type ManageExtensions = {
    /** Function to download an extension and enable it */
    installExtension: InstallExtensionFunction;
    /** Function to start running an extension that had been previously downloaded and disabled */
    enableExtension: EnableExtensionFunction;
    /** Function to stop running an extension that had been previously downloaded and enabled */
    disableExtension: DisableExtensionFunction;
    /** Function to retrieve details about all installed extensions */
    getInstalledExtensions: GetInstalledExtensionsFunction;
  };
}
declare module 'shared/models/handle-uri-privilege.model' {
  import { Unsubscriber } from 'platform-bible-utils';
  /** Function that is called when the system navigates to a URI that this handler is set up to handle. */
  export type UriHandler = (uri: string) => Promise<void> | void;
  /**
   * Function that registers a {@link UriHandler} to be called when the system navigates to a URI that
   * matches the handler's scope
   */
  export type RegisterUriHandler = (uriHandler: UriHandler) => Unsubscriber;
  /**
   * Functions and properties related to listening for when the system navigates to a URI built for an
   * extension
   */
  export type HandleUri = {
    /**
     * Register a handler function to listen for when the system navigates to a URI built for this
     * extension. Each extension can only register one uri handler at a time.
     *
     * Each extension has its own exclusive URI that it can handle. Extensions cannot handle each
     * others' URIs. The URIs this extension's handler will receive will have the following
     * structure:
     *
     *     `<redirect-uri><additional-data>`;
     *
     * - `<redirect-uri>` is {@link HandleUri.redirectUri}.
     * - `<additional-data>` is anything else that is on the URI as the application receives it. This
     *   could include path, query (aka parameters), and fragment (aka anchor).
     *
     * Handling URIs is useful for authentication workflows and other interactions with this extension
     * from outside the application.
     *
     * Note: There is currently no check in place to guarantee that a call to this handler will only
     * come from navigating to the uri; a process connecting over the PAPI WebSocket could fake a call
     * to this handler. However, there is no expectation for this to happen.
     */
    registerUriHandler: RegisterUriHandler;
    /**
     * The most basic URI this extension can handle with {@link HandleUri.registerUriHandler}. This
     * `redirectUri` has the following structure:
     *
     *     `<app-uri-scheme>://<extension-publisher>.<extension-name>`;
     *
     * - `<app-uri-scheme>` is the URI scheme this application supports. TODO: link name here
     * - `<extension-publisher>` is the publisher id of this extension as specified in the extension
     *   manifest
     * - `<extension-name>` is the name of this extension as specified in the extension manifest
     *
     * Additional data can be added to the end of the URI; this is just the scheme and authority. See
     * {@link HandleUri.registerUriHandler} for more information.
     */
    redirectUri: string;
  };
}
declare module 'shared/models/elevated-privileges.model' {
  import { CreateProcess } from 'shared/models/create-process-privilege.model';
  import { ManageExtensions } from 'shared/models/manage-extensions-privilege.model';
  import { HandleUri } from 'shared/models/handle-uri-privilege.model';
  /** String constants that are listed in an extension's manifest.json to state needed privileges */
  export enum ElevatedPrivilegeNames {
    createProcess = 'createProcess',
    manageExtensions = 'manageExtensions',
    handleUri = 'handleUri',
  }
  /** Object that contains properties with special capabilities for extensions that required them */
  export type ElevatedPrivileges = {
    /** Functions that can be run to start new processes */
    createProcess: CreateProcess | undefined;
    /** Functions that can be run to manage what extensions are running */
    manageExtensions: ManageExtensions | undefined;
    /**
     * Functions and properties related to listening for when the system navigates to a URI built for
     * this extension
     */
    handleUri: HandleUri | undefined;
  };
}
declare module 'extension-host/extension-types/extension-activation-context.model' {
  import { ExecutionToken } from 'node/models/execution-token.model';
  import { UnsubscriberAsyncList } from 'platform-bible-utils';
  import { ElevatedPrivileges } from 'shared/models/elevated-privileges.model';
  /** An object of this type is passed into `activate()` for each extension during initialization */
  export type ExecutionActivationContext = {
    /** Canonical name of the extension */
    name: string;
    /** Used to save and load data by the storage service. */
    executionToken: ExecutionToken;
    /**
     * Objects that provide special capabilities required by an extension based on the
     * `elevatedPrivileges` values listed in its manifest. For example, if an extension needs to be
     * able to manage other extensions, then it should include `manageExtensions` in the
     * `elevatedPrivileges` array in `manifest.json`. Then when the extension is activated this
     * {@link ElevatedPrivileges} object will have the `manageExtensions` property set to an object
     * with functions used to manage extensions.
     *
     * See {@link ElevatedPrivilegeNames} for the full list of elevated privileges available.
     */
    elevatedPrivileges: ElevatedPrivileges;
    /** Tracks all registrations made by an extension so they can be cleaned up when it is unloaded */
    registrations: UnsubscriberAsyncList;
  };
}
declare module 'renderer/hooks/papi-hooks/use-dialog-callback.hook' {
  import { DialogTabTypes, DialogTypes } from 'renderer/components/dialogs/dialog-definition.model';
  export type UseDialogCallbackOptions = {
    /**
     * How many dialogs are allowed to be open at once from this dialog callback. Calling the callback
     * when this number of maximum open dialogs has been reached does nothing. Set to -1 for
     * unlimited. Defaults to 1.
     */
    maximumOpenDialogs?: number;
  };
  /**
   *
   * Enables using `papi.dialogs.showDialog` in React more easily. Returns a callback to run that will
   * open a dialog with the provided `dialogType` and `options` then run the `resolveCallback` with
   * the dialog response or `rejectCallback` if there is an error. By default, only one dialog can be
   * open at a time.
   *
   * If you need to open multiple dialogs and track which dialog is which, you can set
   * `options.shouldOpenMultipleDialogs` to `true` and add a counter to the `options` when calling the
   * callback. Then `resolveCallback` will be resolved with that options object including your
   * counter.
   *
   * @type `DialogTabType` The dialog type you are using. Should be inferred by parameters
   * @param dialogType Dialog type you want to show on the screen
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that updating this parameter will not cause a new
   *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
   *   effect on the functionality of this hook. Calling the callback will always use the latest
   *   `dialogType`.
   * @param options Various options for configuring the dialog that shows and this hook. If an
   *   `options` parameter is also provided to the returned `showDialog` callback, those
   *   callback-provided `options` merge over these hook-provided `options`
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that updating this parameter will not cause a new
   *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
   *   effect on the functionality of this hook. Calling the callback will always use the latest
   *   `options`.
   * @param resolveCallback `(response, dialogType, options)` The function that will be called if the
   *   dialog request resolves properly
   *
   *   - `response` - the resolved value of the dialog call. Either the user's response or `undefined` if
   *       the user cancels
   *   - `dialogType` - the value of `dialogType` at the time that this dialog was called
   *   - `options` the `options` provided to the dialog at the time that this dialog was called. This
   *       consists of the `options` provided to the returned `showDialog` callback merged over the
   *       `options` provided to the hook and additionally contains {@link UseDialogCallbackOptions}
   *       properties
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that updating this parameter will not cause a new
   *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
   *   effect on the functionality of this hook. When the dialog resolves, it will always call the
   *   latest `resolveCallback`.
   * @param rejectCallback `(error, dialogType, options)` The function that will be called if the
   *   dialog request throws an error
   *
   *   - `error` - the error thrown while calling the dialog
   *   - `dialogType` - the value of `dialogType` at the time that this dialog was called
   *   - `options` the `options` provided to the dialog at the time that this dialog was called. This
   *       consists of the `options` provided to the returned `showDialog` callback merged over the
   *       `options` provided to the hook and additionally contains {@link UseDialogCallbackOptions}
   *       properties
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that updating this parameter will not cause a new
   *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
   *   effect on the functionality of this hook. If the dialog throws an error, it will always call
   *   the latest `rejectCallback`.
   * @returns `showDialog(options?)` - callback to run to show the dialog to prompt the user for a
   *   response
   *
   *   - `optionsOverrides?` - `options` object you may specify that will merge over the `options` you
   *       provide to the hook before passing to the dialog. All properties are optional, so you may
   *       specify as many or as few properties here as you want to overwrite the properties in the
   *       `options` you provide to the hook
   */
  function useDialogCallback<
    DialogTabType extends DialogTabTypes,
    DialogOptions extends DialogTypes[DialogTabType]['options'],
  >(
    dialogType: DialogTabType,
    options: DialogOptions & UseDialogCallbackOptions,
    resolveCallback: (
      response: DialogTypes[DialogTabType]['responseType'] | undefined,
      dialogType: DialogTabType,
      options: DialogOptions,
    ) => void,
    rejectCallback: (error: unknown, dialogType: DialogTabType, options: DialogOptions) => void,
  ): (optionOverrides?: Partial<DialogOptions & UseDialogCallbackOptions>) => Promise<void>;
  /**
   *
   * Enables using `papi.dialogs.showDialog` in React more easily. Returns a callback to run that will
   * open a dialog with the provided `dialogType` and `options` then run the `resolveCallback` with
   * the dialog response or `rejectCallback` if there is an error. By default, only one dialog can be
   * open at a time.
   *
   * If you need to open multiple dialogs and track which dialog is which, you can set
   * `options.shouldOpenMultipleDialogs` to `true` and add a counter to the `options` when calling the
   * callback. Then `resolveCallback` will be resolved with that options object including your
   * counter.
   *
   * @type `DialogTabType` The dialog type you are using. Should be inferred by parameters
   * @param dialogType Dialog type you want to show on the screen
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that updating this parameter will not cause a new
   *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
   *   effect on the functionality of this hook. Calling the callback will always use the latest
   *   `dialogType`.
   * @param options Various options for configuring the dialog that shows and this hook. If an
   *   `options` parameter is also provided to the returned `showDialog` callback, those
   *   callback-provided `options` merge over these hook-provided `options`
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that updating this parameter will not cause a new
   *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
   *   effect on the functionality of this hook. Calling the callback will always use the latest
   *   `options`.
   * @param resolveCallback `(response, dialogType, options)` The function that will be called if the
   *   dialog request resolves properly
   *
   *   - `response` - the resolved value of the dialog call. Either the user's response or `undefined` if
   *       the user cancels
   *   - `dialogType` - the value of `dialogType` at the time that this dialog was called
   *   - `options` the `options` provided to the dialog at the time that this dialog was called. This
   *       consists of the `options` provided to the returned `showDialog` callback merged over the
   *       `options` provided to the hook and additionally contains {@link UseDialogCallbackOptions}
   *       properties
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that updating this parameter will not cause a new
   *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
   *   effect on the functionality of this hook. When the dialog resolves, it will always call the
   *   latest `resolveCallback`.
   * @param rejectCallback `(error, dialogType, options)` The function that will be called if the
   *   dialog request throws an error
   *
   *   - `error` - the error thrown while calling the dialog
   *   - `dialogType` - the value of `dialogType` at the time that this dialog was called
   *   - `options` the `options` provided to the dialog at the time that this dialog was called. This
   *       consists of the `options` provided to the returned `showDialog` callback merged over the
   *       `options` provided to the hook and additionally contains {@link UseDialogCallbackOptions}
   *       properties
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that updating this parameter will not cause a new
   *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
   *   effect on the functionality of this hook. If the dialog throws an error, it will always call
   *   the latest `rejectCallback`.
   * @returns `showDialog(options?)` - callback to run to show the dialog to prompt the user for a
   *   response
   *
   *   - `optionsOverrides?` - `options` object you may specify that will merge over the `options` you
   *       provide to the hook before passing to the dialog. All properties are optional, so you may
   *       specify as many or as few properties here as you want to overwrite the properties in the
   *       `options` you provide to the hook
   */
  function useDialogCallback<
    DialogTabType extends DialogTabTypes,
    DialogOptions extends DialogTypes[DialogTabType]['options'],
  >(
    dialogType: DialogTabType,
    options: DialogOptions & UseDialogCallbackOptions,
    resolveCallback: (
      response: DialogTypes[DialogTabType]['responseType'] | undefined,
      dialogType: DialogTabType,
      options: DialogOptions,
    ) => void,
  ): (optionOverrides?: Partial<DialogOptions & UseDialogCallbackOptions>) => Promise<void>;
  export default useDialogCallback;
}
declare module 'shared/services/localization.service-model' {
  import IDataProvider from 'shared/models/data-provider.interface';
  import {
    DataProviderDataType,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  import { LanguageInfo } from 'platform-bible-react';
  import { LanguageStrings, LocalizeKey, OnDidDispose } from 'platform-bible-utils';
  export type LocalizationData = LanguageStrings;
  export type LocalizationSelector = {
    localizeKey: LocalizeKey;
    locales?: string[];
  };
  export type LocalizationSelectors = {
    localizeKeys: LocalizeKey[];
    locales?: string[];
  };
  /**
   *
   * This name is used to register the localization data provider on the papi. You can use this name
   * to find the data provider when accessing it using the useData hook
   */
  export const localizationServiceProviderName = 'platform.localizationDataServiceDataProvider';
  export const localizationServiceObjectToProxy: Readonly<{
    /**
     *
     * This name is used to register the localization data provider on the papi. You can use this name
     * to find the data provider when accessing it using the useData hook
     */
    dataProviderName: 'platform.localizationDataServiceDataProvider';
  }>;
  export type LocalizationDataDataTypes = {
    LocalizedString: DataProviderDataType<LocalizationSelector, string, never>;
    LocalizedStrings: DataProviderDataType<LocalizationSelectors, LocalizationData, never>;
    AvailableInterfaceLanguages: DataProviderDataType<
      undefined,
      Record<string, LanguageInfo>,
      never
    >;
  };
  module 'papi-shared-types' {
    interface DataProviders {
      [localizationServiceProviderName]: ILocalizationService;
    }
  }
  /**
   *
   * Service that allows to get and store localizations
   */
  export type ILocalizationService = {
    /**
     * Look up localized string for specific localizeKey
     *
     * @param selector Made up of a string key that corresponds to a localized value and an array of
     *   BCP 47 language codes
     * @returns Localized string
     */
    getLocalizedString: (selector: LocalizationSelector) => Promise<string>;
    /**
     * Look up localized strings for all localizeKeys provided
     *
     * @param selectors An array of LocalizationSelectors. A LocalizationSelector is made up of a
     *   string key that corresponds to a localized value and an array of BCP 47 language codes
     * @returns Object whose keys are localizeKeys and values are localized strings
     */
    getLocalizedStrings: (selectors: LocalizationSelectors) => Promise<LocalizationData>;
    /**
     * Get a collection of known user-interface languages
     *
     * @returns All user-interface languages
     */
    getAvailableInterfaceLanguages: () => Promise<Record<string, LanguageInfo>>;
    /**
     * This data cannot be changed. Trying to use this setter this will always throw
     *
     * @returns Unsubscriber function
     */
    setLocalizedString(): Promise<DataProviderUpdateInstructions<LocalizationDataDataTypes>>;
    /**
     * This data cannot be changed. Trying to use this setter this will always throw
     *
     * @returns Unsubscriber function
     */
    setLocalizedStrings(): Promise<DataProviderUpdateInstructions<LocalizationDataDataTypes>>;
    /**
     * This data cannot be changed. Trying to use this setter this will always throw
     *
     * @returns Unsubscriber function
     */
    setAvailableInterfaceLanguages(): Promise<
      DataProviderUpdateInstructions<LocalizationDataDataTypes>
    >;
  } & OnDidDispose &
    typeof localizationServiceObjectToProxy & {
      /**
       * This function is used to take a book number from a verse ref and return the localized name of
       * the book so that the book name can be displayed in the UI language within the UI
       */
      getLocalizedIdFromBookNumber(bookNum: number, localizationLanguage: string): Promise<string>;
    } & IDataProvider<LocalizationDataDataTypes>;
}
declare module 'shared/data/platform.data' {
  /**
   * Namespace to use for features like commands, settings, etc. on the PAPI that are provided by
   * Platform.Bible core
   */
  export const PLATFORM_NAMESPACE = 'platform';
  /**
   * Name of this application like `platform-bible`.
   *
   * Note: this is an identifier for the application, not this application's executable file name
   */
  export const APP_NAME: string;
  /** Version of this application in [semver](https://semver.org/) format. */
  export const APP_VERSION: string;
  /**
   * URI scheme that this application handles. Navigating to a URI with this scheme will open this
   * application. This application will handle the URI as it sees fit. For example, the URI may be
   * handled by an extension - see {@link ElevatedPrivileges.registerUriHandler } for more
   * information.
   *
   * This is the same as {@link APP_NAME}.
   */
  export const APP_URI_SCHEME: string;
  /** Query string passed to the renderer when starting if it should enable noisy dev mode */
  export const DEV_MODE_RENDERER_INDICATOR = '?noisyDevMode';
}
declare module 'shared/log-error.model' {
  /** Error that force logs the error message before throwing. Useful for debugging in some situations. */
  export default class LogError extends Error {
    constructor(message?: string);
  }
}
declare module 'shared/services/localization.service' {
  import { ILocalizationService } from 'shared/services/localization.service-model';
  const localizationService: ILocalizationService;
  export default localizationService;
}
declare module 'shared/utils/settings-document-combiner-base' {
  import { SettingNames, SettingTypes } from 'papi-shared-types';
  import {
    DocumentCombiner,
    JsonDocumentLike,
    Localized,
    Setting,
    SettingsGroup,
  } from 'platform-bible-utils';
  /**
   * Information about one specific setting. Basically just {@link Setting} but with specific default
   * type info
   */
  type SettingInfo<SettingName extends SettingNames> = Setting & {
    default: SettingTypes[SettingName];
  };
  /** Information about all settings. Keys are setting keys, values are information for that setting */
  type AllSettingsInfo = {
    [SettingName in SettingNames]: SettingInfo<SettingName>;
  };
  export type SettingsContributionInfo = {
    /** Map of extension name to that extension's provided settings groups if provided */
    contributions: {
      [extensionName: string]: SettingsGroup[] | undefined;
    };
    /**
     * Map of setting name to setting definition. For type specificity and ease of accessing settings
     * since they're a bit hard to find in `contributions`
     */
    settings: Partial<AllSettingsInfo>;
  };
  export type LocalizedSettingsContributionInfo = Localized<SettingsContributionInfo>;
  export default abstract class SettingsDocumentCombinerBase extends DocumentCombiner {
    /** Name for type of setting to use in error messages */
    protected readonly settingTypeName: string;
    /** Cached promise for getting the localized output */
    private localizedOutputPromise;
    constructor(baseDocument: JsonDocumentLike);
    /**
     * This method is intended to be layered over by a child class to expose the localized setting
     * info.
     *
     * Get the current set of settings contribution info given all the input documents with all
     * localized string keys localized properly.
     *
     * NOTE: If the input documents might have changed since the last time the settings contributions
     * were retrieved, you can call `rebuild` to incorporate those document changes before calling
     * this getter. For example, if one of the input document objects changed and
     * `addOrUpdateContribution` wasn't called explicitly, those document changes will not be seen in
     * the current set of settings contributions. If all the input documents are static, then there is
     * no need to ever rebuild once all the documents have been contributed to this combiner.
     */
    protected getLocalizedOutput(): Promise<LocalizedSettingsContributionInfo | undefined>;
    protected validateBaseDocument(baseDocument: JsonDocumentLike): void;
    protected transformBaseDocumentAfterValidation(
      baseDocument: JsonDocumentLike,
    ): JsonDocumentLike;
    protected validateContribution(documentName: string, document: JsonDocumentLike): void;
    protected transformContributionAfterValidation(
      documentName: string,
      document: JsonDocumentLike,
    ): JsonDocumentLike;
    protected validateOutput(): void;
    /** Validate the base and contribution documents against the JSON schema */
    protected abstract performSchemaValidation(document: JsonDocumentLike, docType: string): void;
  }
}
declare module 'shared/services/settings.service-model' {
  import { SettingNames, SettingTypes } from 'papi-shared-types';
  import { OnDidDispose, UnsubscriberAsync } from 'platform-bible-utils';
  import IDataProvider from 'shared/models/data-provider.interface';
  import {
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  import { LocalizedSettingsContributionInfo } from 'shared/utils/settings-document-combiner-base';
  /** Name prefix for registered commands that call settings validators */
  export const CATEGORY_EXTENSION_SETTING_VALIDATOR = 'extensionSettingValidator';
  /**
   *
   * This name is used to register the settings service data provider on the papi. You can use this
   * name to find the data provider when accessing it using the useData hook
   */
  export const settingsServiceDataProviderName = 'platform.settingsServiceDataProvider';
  export const settingsServiceObjectToProxy: Readonly<{
    /**
     *
     * This name is used to register the settings service data provider on the papi. You can use this
     * name to find the data provider when accessing it using the useData hook
     */
    dataProviderName: 'platform.settingsServiceDataProvider';
    /**
     *
     * Registers a function that validates whether a new setting value is allowed to be set.
     *
     * @param key The string id of the setting to validate
     * @param validator Function to call to validate the new setting value
     * @returns Unsubscriber that should be called whenever the providing extension is deactivated
     */
    registerValidator: <SettingName extends keyof SettingTypes>(
      key: SettingName,
      validator: SettingValidator<SettingName>,
    ) => Promise<UnsubscriberAsync>;
  }>;
  /**
   * SettingDataTypes handles getting and setting Platform.Bible core application and extension
   * settings.
   *
   * Note: the unnamed (`''`) data type is not actually part of `SettingDataTypes` because the methods
   * would not be able to create a generic type extending from `SettingNames` in order to return the
   * specific setting type being requested. As such, `get`, `set`, `reset` and `subscribe` are all
   * specified on {@link ISettingsService} instead. Unfortunately, as a result, using Intellisense with
   * `useData` will not show the unnamed data type (`''`) as an option, but you can use `useSetting`
   * instead. However, do note that the unnamed data type (`''`) is fully functional.
   *
   * The closest possible representation of the unnamed (````) data type follows:
   *
   * ```typescript
   * '': DataProviderDataType<SettingName, SettingTypes[SettingName], SettingTypes[SettingName]>;
   * ```
   */
  export type SettingDataTypes = {};
  export type AllSettingsData = {
    [SettingName in SettingNames]: SettingTypes[SettingName];
  };
  /** Function that validates whether a new setting value should be allowed to be set */
  export type SettingValidator<SettingName extends SettingNames> = (
    newValue: SettingTypes[SettingName],
    currentValue: SettingTypes[SettingName],
    allChanges: Partial<SettingTypes>,
  ) => Promise<boolean>;
  /** Validators for all settings. Keys are setting keys, values are functions to validate new settings */
  export type AllSettingsValidators = {
    [SettingName in SettingNames]: SettingValidator<SettingName>;
  };
  module 'papi-shared-types' {
    interface DataProviders {
      [settingsServiceDataProviderName]: ISettingsService;
    }
  }
  /** */
  export type ISettingsService = {
    /**
     * Retrieves the value of the specified setting
     *
     * @param key The string id of the setting for which the value is being retrieved
     * @returns The value of the specified setting, parsed to an object. Returns default setting if
     *   setting does not exist
     * @throws If no default value is available for the setting.
     */
    get<SettingName extends SettingNames>(key: SettingName): Promise<SettingTypes[SettingName]>;
    /**
     * Validates the setting at the given key with the new value provided
     *
     * @param key The string id of the setting to validate
     * @param newValue The value to validate
     * @param currentValue The value already set to the setting
     * @param allChanges
     */
    validateSetting<SettingName extends SettingNames>(
      key: SettingName,
      newValue: SettingTypes[SettingName],
      currentValue: SettingTypes[SettingName],
      allChanges?: Partial<SettingTypes>,
    ): Promise<boolean>;
    /**
     * Sets the value of the specified setting
     *
     * @param key The string id of the setting for which the value is being set
     * @param newSetting The value that is to be set for the specified key
     * @returns Information that papi uses to interpret whether to send out updates. Defaults to
     *   `true` (meaning send updates only for this data type).
     * @see {@link DataProviderUpdateInstructions} for more info on what to return
     */
    set<SettingName extends SettingNames>(
      key: SettingName,
      newSetting: SettingTypes[SettingName],
    ): Promise<DataProviderUpdateInstructions<SettingDataTypes>>;
    /**
     * Removes the setting from memory and resets it to its default value
     *
     * @param key The string id of the setting for which the value is being removed
     * @returns `true` if successfully reset the project setting. `false` otherwise
     */
    reset<SettingName extends SettingNames>(key: SettingName): Promise<boolean>;
    /**
     * Subscribes to updates of the specified setting. Whenever the value of the setting changes, the
     * callback function is executed.
     *
     * @param key The string id of the setting for which the value is being subscribed to
     * @param callback The function that will be called whenever the specified setting is updated
     * @param options Various options to adjust how the subscriber emits updates
     * @returns Unsubscriber that should be called whenever the subscription should be deleted
     */
    subscribe<SettingName extends SettingNames>(
      key: SettingName,
      callback: (newSetting: SettingTypes[SettingName]) => void,
      options?: DataProviderSubscriberOptions,
    ): Promise<UnsubscriberAsync>;
    /**
     *
     * Registers a function that validates whether a new setting value is allowed to be set.
     *
     * @param key The string id of the setting to validate
     * @param validator Function to call to validate the new setting value
     * @returns Unsubscriber that should be called whenever the providing extension is deactivated
     */
    registerValidator<SettingName extends SettingNames>(
      key: SettingName,
      validator: SettingValidator<SettingName>,
    ): Promise<UnsubscriberAsync>;
    /**
     * Get the current set of settings contribution info given all the input documents with all
     * localized string keys localized properly.
     *
     * @returns Localized project settings contribution info or undefined
     */
    getLocalizedSettingsContributionInfo(): Promise<LocalizedSettingsContributionInfo | undefined>;
  } & OnDidDispose &
    IDataProvider<SettingDataTypes> &
    typeof settingsServiceObjectToProxy;
}
declare module 'shared/utils/project-settings-document-combiner' {
  import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
  import {
    JsonDocumentLike,
    Localized,
    ProjectSetting,
    ProjectSettingsGroup,
  } from 'platform-bible-utils';
  import SettingsDocumentCombinerBase from 'shared/utils/settings-document-combiner-base';
  /**
   * Information about one specific setting. Basically just {@link Setting} but with specific default
   * type info
   */
  type ProjectSettingInfo<ProjectSettingName extends ProjectSettingNames> = ProjectSetting & {
    default: ProjectSettingTypes[ProjectSettingName];
  };
  /** Information about all settings. Keys are setting keys, values are information for that setting */
  type AllProjectSettingsInfo = {
    [ProjectSettingName in ProjectSettingNames]: ProjectSettingInfo<ProjectSettingName>;
  };
  export type ProjectSettingsContributionInfo = {
    /** Map of extension name to that extension's provided settings groups if provided */
    contributions: {
      [extensionName: string]: ProjectSettingsGroup[] | undefined;
    };
    /**
     * Map of setting name to setting definition. For type specificity and ease of accessing settings
     * since they're a bit hard to find in `contributions`
     */
    settings: Partial<AllProjectSettingsInfo>;
  };
  export type LocalizedProjectSettingsContributionInfo = Localized<ProjectSettingsContributionInfo>;
  export default class ProjectSettingsDocumentCombiner extends SettingsDocumentCombinerBase {
    protected readonly settingTypeName = 'Project Setting';
    /**
     * Get the current set of project settings contribution info given all the input documents.
     * Localized string keys have not been localized to corresponding strings.
     *
     * NOTE: If the input documents might have changed since the last time the project settings
     * contributions were retrieved, you can call `rebuild` to incorporate those document changes
     * before calling this getter. For example, if one of the input document objects changed and
     * `addOrUpdateContribution` wasn't called explicitly, those document changes will not be seen in
     * the current set of project settings contributions. If all the input documents are static, then
     * there is no need to ever rebuild once all the documents have been contributed to this
     * combiner.
     */
    getProjectSettingsContributionInfo(): ProjectSettingsContributionInfo | undefined;
    /**
     * Get the current set of settings contribution info given all the input documents with all
     * localized string keys localized properly.
     *
     * NOTE: If the input documents might have changed since the last time the settings contributions
     * were retrieved, you can call `rebuild` to incorporate those document changes before calling
     * this getter. For example, if one of the input document objects changed and
     * `addOrUpdateContribution` wasn't called explicitly, those document changes will not be seen in
     * the current set of settings contributions. If all the input documents are static, then there is
     * no need to ever rebuild once all the documents have been contributed to this combiner.
     */
    getLocalizedProjectSettingsContributionInfo(): Promise<
      LocalizedProjectSettingsContributionInfo | undefined
    >;
    protected performSchemaValidation(document: JsonDocumentLike, docType: string): void;
  }
}
declare module 'shared/services/project-settings.service-model' {
  import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
  import { UnsubscriberAsync } from 'platform-bible-utils';
  import { LocalizedProjectSettingsContributionInfo } from 'shared/utils/project-settings-document-combiner';
  /** Name prefix for registered commands that call project settings validators */
  export const CATEGORY_EXTENSION_PROJECT_SETTING_VALIDATOR = 'extensionProjectSettingValidator';
  export const projectSettingsServiceNetworkObjectName = 'ProjectSettingsService';
  export const projectSettingsServiceObjectToProxy: Readonly<{
    /**
     *
     * Registers a function that validates whether a new project setting value is allowed to be set.
     *
     * @param key The string id of the setting to validate
     * @param validator Function to call to validate the new setting value
     * @returns Unsubscriber that should be called whenever the providing extension is deactivated
     */
    registerValidator: <ProjectSettingName extends keyof ProjectSettingTypes>(
      key: ProjectSettingName,
      validator: ProjectSettingValidator<ProjectSettingName>,
    ) => Promise<UnsubscriberAsync>;
  }>;
  /**
   *
   * Provides utility functions that project data providers should call when handling project settings
   */
  export interface IProjectSettingsService {
    /**
     * Calls registered project settings validators to determine whether or not a project setting
     * change is valid.
     *
     * Every Project Data Provider **must** run this function when it receives a request to set a
     * project setting before changing the value of the setting.
     *
     * @param newValue The new value requested to set the project setting value to
     * @param currentValue The current project setting value
     * @param key The project setting key being set
     * @param projectInterfaces The `projectInterface`s supported by the calling PDP for the project
     *   whose setting is being changed
     * @param allChanges All project settings changes being set in one batch
     * @returns `true` if change is valid, `false` otherwise
     */
    isValid<ProjectSettingName extends ProjectSettingNames>(
      key: ProjectSettingName,
      newValue: ProjectSettingTypes[ProjectSettingName],
      currentValue: ProjectSettingTypes[ProjectSettingName],
      allChanges?: SimultaneousProjectSettingsChanges,
    ): Promise<boolean>;
    /**
     * Gets default value for a project setting
     *
     * Every Project Data Providers **must** run this function when it receives a request to get a
     * project setting if the project does not have a value for the project setting requested. It
     * should return the response from this function directly, either the returned default value or
     * throw.
     *
     * @param key The project setting key for which to get the default value
     * @returns The default value for the setting if a default value is registered
     * @throws If a default value is not registered for the setting
     */
    getDefault<ProjectSettingName extends ProjectSettingNames>(
      key: ProjectSettingName,
    ): Promise<ProjectSettingTypes[ProjectSettingName]>;
    /**
     *
     * Registers a function that validates whether a new project setting value is allowed to be set.
     *
     * @param key The string id of the setting to validate
     * @param validator Function to call to validate the new setting value
     * @returns Unsubscriber that should be called whenever the providing extension is deactivated
     */
    registerValidator<ProjectSettingName extends ProjectSettingNames>(
      key: ProjectSettingName,
      validatorCallback: ProjectSettingValidator<ProjectSettingName>,
    ): Promise<UnsubscriberAsync>;
    /**
     * Get the current set of project settings contribution info given all the input documents with
     * all localized string keys localized properly.
     *
     * @returns Localized project settings contribution info or undefined
     */
    getLocalizedContributionInfo(): Promise<LocalizedProjectSettingsContributionInfo | undefined>;
  }
  /**
   * All project settings changes being set in one batch
   *
   * Project settings may be circularly dependent on one another, so multiple project settings may
   * need to be changed at once in some cases
   */
  export type SimultaneousProjectSettingsChanges = {
    [ProjectSettingName in ProjectSettingNames]?: {
      /** The new value requested to set the project setting value to */
      newValue: ProjectSettingTypes[ProjectSettingName];
      /** The current project setting value */
      currentValue: ProjectSettingTypes[ProjectSettingName];
    };
  };
  /**
   * Function that validates whether a new project setting value should be allowed to be set
   *
   * @param newValue The new value requested to set the project setting value to
   * @param currentValue The current project setting value
   * @param allChanges All project settings changes being set in one batch
   */
  export type ProjectSettingValidator<ProjectSettingName extends ProjectSettingNames> = (
    newValue: ProjectSettingTypes[ProjectSettingName],
    currentValue: ProjectSettingTypes[ProjectSettingName],
    allChanges: SimultaneousProjectSettingsChanges,
  ) => Promise<boolean>;
  /**
   * Validators for all project settings. Keys are setting keys, values are functions to validate new
   * settings
   */
  export type AllProjectSettingsValidators = {
    [ProjectSettingName in ProjectSettingNames]: ProjectSettingValidator<ProjectSettingName>;
  };
}
declare module '@papi/core' {
  /** Exporting empty object so people don't have to put 'type' in their import statements */
  const core: {};
  export default core;
  export type { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
  export type { ExecutionToken } from 'node/models/execution-token.model';
  export type { ElevatedPrivileges } from 'shared/models/elevated-privileges.model';
  export type {
    ExtensionIdentifier,
    HashValues,
    InstalledExtensions,
    ManageExtensions,
  } from 'shared/models/manage-extensions-privilege.model';
  export type {
    HandleUri,
    RegisterUriHandler,
    UriHandler,
  } from 'shared/models/handle-uri-privilege.model';
  export type { DialogTypes } from 'renderer/components/dialogs/dialog-definition.model';
  export type { UseDialogCallbackOptions } from 'renderer/hooks/papi-hooks/use-dialog-callback.hook';
  export type {
    default as IDataProvider,
    IDisposableDataProvider,
  } from 'shared/models/data-provider.interface';
  export type {
    DataProviderUpdateInstructions,
    DataProviderDataType,
    DataProviderSubscriberOptions,
  } from 'shared/models/data-provider.model';
  export type { WithNotifyUpdate } from 'shared/models/data-provider-engine.model';
  export type { default as IDataProviderEngine } from 'shared/models/data-provider-engine.model';
  export type { DialogOptions } from 'shared/models/dialog-options.model';
  export type { NetworkableObject, NetworkObject } from 'shared/models/network-object.model';
  export type { PlatformNotification } from 'shared/models/notification.service-model';
  export type {
    Components as ComponentsDocumentation,
    MethodDocumentationWithoutName,
    NetworkObjectDocumentation,
    SingleMethodDocumentation,
  } from 'shared/models/openrpc.model';
  export type {
    ExtensionDataScope,
    MandatoryProjectDataTypes,
  } from 'shared/models/project-data-provider.model';
  export type { IProjectDataProviderEngine } from 'shared/models/project-data-provider-engine.model';
  export type { IProjectDataProviderEngineFactory } from 'shared/models/project-data-provider-engine-factory.model';
  export type { IBaseProjectDataProviderEngine } from 'shared/models/base-project-data-provider-engine.model';
  export type {
    default as IProjectDataProviderFactory,
    ProjectMetadataFilterOptions,
  } from 'shared/models/project-data-provider-factory.interface';
  export type {
    ProjectDataProviderFactoryMetadataInfo,
    ProjectMetadata,
    ProjectMetadataWithoutFactoryInfo,
  } from 'shared/models/project-metadata.model';
  export type {
    LocalizationData,
    LocalizationSelector,
    LocalizationSelectors,
  } from 'shared/services/localization.service-model';
  export type { NetworkObjectDetails } from 'shared/models/network-object.model';
  export type { SettingValidator } from 'shared/services/settings.service-model';
  export type { ScrollGroupScrRef } from 'shared/services/scroll-group.service-model';
  export type {
    GetWebViewOptions,
    SavedWebViewDefinition,
    UseWebViewStateHook,
    UseWebViewScrollGroupScrRefHook,
    WebViewContentType,
    WebViewDefinition,
    WebViewProps,
  } from 'shared/models/web-view.model';
  export type {
    IDisposableWebViewProvider,
    IWebViewProvider,
  } from 'shared/models/web-view-provider.model';
  export type {
    SimultaneousProjectSettingsChanges,
    ProjectSettingValidator,
  } from 'shared/services/project-settings.service-model';
}
declare module 'shared/services/menu-data.service-model' {
  import {
    OnDidDispose,
    UnsubscriberAsync,
    MultiColumnMenu,
    ReferencedItem,
    WebViewMenu,
    Localized,
  } from 'platform-bible-utils';
  import {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  import { IDataProvider } from '@papi/core';
  /**
   *
   * This name is used to register the menu data data provider on the papi. You can use this name to
   * find the data provider when accessing it using the useData hook
   */
  export const menuDataServiceProviderName = 'platform.menuDataServiceDataProvider';
  export const menuDataServiceObjectToProxy: Readonly<{
    /**
     *
     * This name is used to register the menu data data provider on the papi. You can use this name to
     * find the data provider when accessing it using the useData hook
     */
    dataProviderName: 'platform.menuDataServiceDataProvider';
  }>;
  export type MenuDataDataTypes = {
    MainMenu: DataProviderDataType<undefined, Localized<MultiColumnMenu>, never>;
    WebViewMenu: DataProviderDataType<ReferencedItem, Localized<WebViewMenu>, never>;
  };
  module 'papi-shared-types' {
    interface DataProviders {
      [menuDataServiceProviderName]: IMenuDataService;
    }
  }
  /**
   *
   * Service that allows to get and store menu data
   */
  export type IMenuDataService = {
    /** Rebuild the menus with the latest inputs from all extensions. */
    rebuildMenus(): Promise<void>;
    /**
     *
     * Get menu content for the main menu
     *
     * @param mainMenuType Does not have to be defined
     * @returns MultiColumnMenu object of main menu content
     */
    getMainMenu(mainMenuType: undefined): Promise<MultiColumnMenu>;
    /**
     *
     * Get menu content for the main menu
     *
     * @param mainMenuType Does not have to be defined
     * @returns MultiColumnMenu object of main menu content
     */
    getMainMenu(): Promise<MultiColumnMenu>;
    /**
     * This data cannot be changed. Trying to use this setter this will always throw
     *
     * @param mainMenuType Does not have to be defined
     * @param value MultiColumnMenu object to set as the main menu
     * @returns Unsubscriber function
     */
    setMainMenu(
      mainMenuType: undefined,
      value: never,
    ): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>>;
    /**
     * Subscribe to run a callback function when the main menu data is changed
     *
     * @param mainMenuType Does not have to be defined
     * @param callback Function to run with the updated menuContent for this selector
     * @param options Various options to adjust how the subscriber emits updates
     * @returns Unsubscriber function (run to unsubscribe from listening for updates)
     */
    subscribeMainMenu(
      mainMenuType: undefined,
      callback: (menuContent: Localized<MultiColumnMenu>) => void,
      options?: DataProviderSubscriberOptions,
    ): Promise<UnsubscriberAsync>;
    /**
     * Get menu content for a web view
     *
     * @param webViewType The type of webview for which a menu should be retrieved
     * @returns WebViewMenu object of web view menu content
     */
    getWebViewMenu(webViewType: ReferencedItem): Promise<WebViewMenu>;
    /**
     * This data cannot be changed. Trying to use this setter this will always throw
     *
     * @param webViewType The type of webview for which a menu should be set
     * @param value Menu of specified webViewType
     * @returns Unsubscriber function
     */
    setWebViewMenu(
      webViewType: ReferencedItem,
      value: never,
    ): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>>;
    /**
     * Subscribe to run a callback function when the web view menu data is changed
     *
     * @param webViewType The type of webview for which a menu should be subscribed
     * @param callback Function to run with the updated menuContent for this selector
     * @param options Various options to adjust how the subscriber emits updates
     * @returns Unsubscriber function (run to unsubscribe from listening for updates)
     */
    subscribeWebViewMenu(
      webViewType: ReferencedItem,
      callback: (menuContent: Localized<WebViewMenu>) => void,
      options?: DataProviderSubscriberOptions,
    ): Promise<UnsubscriberAsync>;
  } & OnDidDispose &
    typeof menuDataServiceObjectToProxy &
    IDataProvider<MenuDataDataTypes>;
}
declare module 'shared/services/menu-data.service' {
  import { IMenuDataService } from 'shared/services/menu-data.service-model';
  const menuDataService: IMenuDataService;
  export default menuDataService;
}
declare module 'shared/services/scroll-group.service' {
  import { IScrollGroupService } from 'shared/services/scroll-group.service-model';
  /**
   *
   * Provides functions related to scroll groups and Scripture references at those scroll groups
   */
  const scrollGroupService: IScrollGroupService;
  export default scrollGroupService;
}
declare module 'shared/services/settings.service' {
  import { ISettingsService } from 'shared/services/settings.service-model';
  const settingsService: ISettingsService;
  export default settingsService;
}
declare module 'shared/services/project-settings.service' {
  import { IProjectSettingsService } from 'shared/services/project-settings.service-model';
  import { Localized } from 'platform-bible-utils';
  import { ProjectSettingsContributionInfo } from 'shared/utils/project-settings-document-combiner';
  import { ProjectDataProviderInterfaces } from 'papi-shared-types';
  /**
   * Filters project settings contributions based on the provided project interfaces.
   *
   * This function iterates over a set of project settings contributions and filters their properties
   * based on whether the project's interfaces match the specified inclusion and exclusion criteria.
   *
   * @param contributions - An object containing project settings contributions, which may be
   *   localized.
   * @param projectInterfaces - An array of keys representing the project interfaces to filter the
   *   contributions by.
   * @returns A filtered set of contributions, or `undefined` if no contributions match the project
   *   interfaces.
   */
  export function filterProjectSettingsContributionsByProjectInterfaces(
    contributions: Localized<ProjectSettingsContributionInfo['contributions']> | undefined,
    projectInterfaces: (keyof ProjectDataProviderInterfaces)[],
  ): Localized<ProjectSettingsContributionInfo['contributions']> | undefined;
  const projectSettingsService: IProjectSettingsService;
  export default projectSettingsService;
}
declare module 'shared/models/data-protection.service-model' {
  /**
   *
   * Provides functions related to encrypting and decrypting strings like user data, secrets, etc.
   *
   * Uses Electron's [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API.
   *
   * Note that these encryption mechanisms are not transferrable between computers. We recommend using
   * them with `papi.storage` methods to store data safely.
   *
   * WARNING: The primary purpose of this service is to enable extensions to encrypt and decrypt data
   * to be stored securely in local files. It is not intended to protect data passed over a network
   * connection. Please note that using this service passes the unencrypted string between local
   * processes using the PAPI WebSocket.
   */
  export interface IDataProtectionService {
    /**
     * Encrypts a string using Electron's
     * [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API. Transforms the
     * returned buffer to a base64-encoded string using
     * [`buffer.toString('base64')`](https://nodejs.org/api/buffer.html#buftostringencoding-start-end).
     *
     * This method throws if the encryption mechanism is not available such as on Linux without a
     * supported package installed. See
     * [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) for more information.
     *
     * Note that this encryption mechanism is not transferrable between computers. We recommend using
     * it with `papi.storage` methods to store data safely.
     *
     * WARNING: The primary purpose of this service is to enable extensions to encrypt and decrypt
     * data to be stored securely in local files. It is not intended to protect data passed over a
     * network connection. Please note that using this service passes the unencrypted string between
     * local processes using the PAPI WebSocket.
     *
     * @param text String to encrypt
     * @returns Encrypted string. Use `papi.dataProtection.decryptString` to decrypt
     */
    encryptString(text: string): Promise<string>;
    /**
     * Decrypts a string using Electron's
     * [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API. Transforms the
     * input base64-encoded string to a buffer using [`Buffer.from(text,
     * 'base64')`](https://nodejs.org/api/buffer.html#static-method-bufferfromstring-encoding).
     *
     * This method throws if the decryption mechanism is not available such as on Linux without a
     * supported package installed. See
     * [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) for more information.
     *
     * Note that this encryption mechanism is not transferrable between computers. We recommend using
     * it with `papi.storage` methods to store data safely.
     *
     * WARNING: The primary purpose of this service is to enable extensions to encrypt and decrypt
     * data to be stored securely in local files. It is not intended to protect data passed over a
     * network connection. Please note that using this service passes the unencrypted string between
     * local processes using the PAPI WebSocket.
     *
     * @param encryptedText String to decrypt. This string should have been encrypted by
     *   `papi.dataProtection.encryptString`
     * @returns Decrypted string
     */
    decryptString(encryptedText: string): Promise<string>;
    /**
     * Returns `true` if encryption is currently available. Returns `false` if the decryption
     * mechanism is not available such as on Linux without a supported package installed. See
     * Electron's [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API for
     * more information.
     *
     * WARNING: The primary purpose of this service is to enable extensions to encrypt and decrypt
     * data to be stored securely in local files. It is not intended to protect data passed over a
     * network connection. Please note that using this service passes the unencrypted string between
     * local processes using the PAPI WebSocket.
     *
     * @returns `true` if encryption is currently available; `false` otherwise
     */
    isEncryptionAvailable(): Promise<boolean>;
  }
  export const dataProtectionServiceNetworkObjectName = 'DataProtectionService';
}
declare module 'shared/services/data-protection.service' {
  import { IDataProtectionService } from 'shared/models/data-protection.service-model';
  /**
   *
   * Provides functions related to encrypting and decrypting strings like user data, secrets, etc.
   *
   * Uses Electron's [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API.
   *
   * Note that these encryption mechanisms are not transferrable between computers. We recommend using
   * them with `papi.storage` methods to store data safely.
   *
   * WARNING: The primary purpose of this service is to enable extensions to encrypt and decrypt data
   * to be stored securely in local files. It is not intended to protect data passed over a network
   * connection. Please note that using this service passes the unencrypted string between local
   * processes using the PAPI WebSocket.
   */
  const dataProtectionService: IDataProtectionService;
  export default dataProtectionService;
}
declare module '@papi/backend' {
  /**
   * Unified module for accessing API features in the extension host.
   *
   * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
   */
  import * as commandService from 'shared/services/command.service';
  import { PapiNetworkService } from 'shared/services/network.service';
  import { WebViewServiceType } from 'shared/services/web-view.service-model';
  import { PapiWebViewProviderService } from 'shared/services/web-view-provider.service';
  import { InternetService } from 'shared/services/internet.service';
  import { DataProviderService } from 'shared/services/data-provider.service';
  import { DataProviderEngine as PapiDataProviderEngine } from 'shared/models/data-provider-engine.model';
  import { ProjectDataProviderEngine as PapiProjectDataProviderEngine } from 'shared/models/project-data-provider-engine.model';
  import { BaseProjectDataProviderEngine as PapiBaseProjectDataProviderEngine } from 'shared/models/base-project-data-provider-engine.model';
  import { LayeringProjectDataProviderEngineFactory as PapiLayeringProjectDataProviderEngineFactory } from 'shared/models/project-data-provider-engine-factory.model';
  import { PapiBackendProjectDataProviderService } from 'shared/services/project-data-provider.service';
  import { ExtensionStorageService } from 'extension-host/services/extension-storage.service';
  import { ProjectLookupServiceType } from 'shared/models/project-lookup.service-model';
  import { DialogService } from 'shared/services/dialog.service-model';
  import { IMenuDataService } from 'shared/services/menu-data.service-model';
  import { IScrollGroupService } from 'shared/services/scroll-group.service-model';
  import { ILocalizationService } from 'shared/services/localization.service-model';
  import { MinimalNetworkObjectService } from 'shared/services/network-object.service';
  import { NetworkObjectStatusServiceType } from 'shared/models/network-object-status.service-model';
  import { ISettingsService } from 'shared/services/settings.service-model';
  import { IProjectSettingsService } from 'shared/services/project-settings.service-model';
  import { WebViewFactory as PapiWebViewFactory } from 'shared/models/web-view-factory.model';
  import { INotificationService } from 'shared/models/notification.service-model';
  const papi: {
    /**
     *
     * Abstract class that provides a placeholder `notifyUpdate` for data provider engine classes. If a
     * data provider engine class extends this class, it doesn't have to specify its own `notifyUpdate`
     * function in order to use `notifyUpdate`.
     *
     * @see {@link IDataProviderEngine} for more information on extending this class.
     */
    DataProviderEngine: typeof PapiDataProviderEngine;
    /**
     *
     * Abstract class that provides a placeholder `notifyUpdate` for Project Data Provider Engine
     * classes. If a Project Data Provider Engine class extends this class, it doesn't have to specify
     * its own `notifyUpdate` function in order to use `notifyUpdate`.
     *
     * Additionally, extending this class informs Intellisense that you can run `notifyUpdate` with the
     * `Setting` data type if needed like so:
     *
     * ```typescript
     * this.notifyUpdate('Setting');
     * ```
     *
     * @see {@link IProjectDataProviderEngine} for more information on extending this class.
     */
    ProjectDataProviderEngine: typeof PapiProjectDataProviderEngine;
    /**
     *
     * Abstract class that provides a placeholder `notifyUpdate` for Base Project Data Provider Engine
     * classes. If a Base Project Data Provider Engine class extends this class, it doesn't have to
     * specify its own `notifyUpdate` function in order to use `notifyUpdate`.
     *
     * Additionally, extending this class informs Intellisense that you can run `notifyUpdate` with the
     * `Setting` data type if needed like so:
     *
     * ```typescript
     * this.notifyUpdate('Setting');
     * ```
     *
     * @see {@link IBaseProjectDataProviderEngine} for more information on extending this class.
     */
    BaseProjectDataProviderEngine: typeof PapiBaseProjectDataProviderEngine;
    /**
     *
     * Abstract class with partial implementation of {@link IProjectDataProviderEngineFactory}
     * specifically for Layering PDPFs. You can extend this class to make creating a Layering PDPF
     * easier.
     *
     * Extending this class automatically fulfills the special requirements for Layering PDPfs, so we
     * highly recommend extending this class. Please see
     * {@link IProjectDataProviderEngineFactory.getAvailableProjects} for more information on the
     * requirements.
     */
    LayeringProjectDataProviderEngineFactory: typeof PapiLayeringProjectDataProviderEngineFactory;
    /**
     *
     * A partial implementation of {@link IWebViewProvider} that includes creating
     * {@link WebViewControllers} for each web view served by the web view provider. This class handles
     * registering, disposing, and making sure there is only one web view controller for each web view
     * for you.
     *
     * You can create a new class extending this abstract class to create a web view provider that
     * serves web views and web view controllers of a specific `webViewType` to facilitate interaction
     * between those web views and other extensions. You can register it with the PAPI using
     * `papi.webViewProviders.register`.
     *
     * If you want to change your existing `IWebViewProvider` from a plain object to extending this
     * class, you will need to change your object's existing method named `getWebView`
     * ({@link IWebViewProvider.getWebView}) to be named `getWebViewDefinition`
     * ({@link WebViewFactory.getWebViewDefinition}), which is a drop-in replacement. You likely do NOT
     * want to overwrite this class's `getWebView` because that will eliminate most of the benefits
     * associated with using this class.
     *
     * @see {@link IWebViewProvider} for more information on extending this class.
     */
    WebViewFactory: typeof PapiWebViewFactory;
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
     * Provides functions related to encrypting and decrypting strings like user data, secrets, etc.
     *
     * Uses Electron's [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API.
     *
     * Note that these encryption mechanisms are not transferrable between computers. We recommend using
     * them with `papi.storage` methods to store data safely.
     *
     * WARNING: The primary purpose of this service is to enable extensions to encrypt and decrypt data
     * to be stored securely in local files. It is not intended to protect data passed over a network
     * connection. Please note that using this service passes the unencrypted string between local
     * processes using the PAPI WebSocket.
     */
    dataProtection: import('shared/models/data-protection.service-model').IDataProtectionService;
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
     * Interface for registering webView providers, registering webView controllers, and performing
     * privileged interactions with web views
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
    networkObjects: MinimalNetworkObjectService;
    /**
     *
     * Provides functions related to the set of available network objects
     */
    networkObjectStatus: NetworkObjectStatusServiceType;
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
     *
     * Note: this service runs locally everywhere in the TypeScript processes. It is also exposed on the
     * PAPI websocket. Note these functions are all asynchronous on the PAPI websocket regardless of if
     * their types are synchronous locally.
     */
    projectLookup: ProjectLookupServiceType;
    /**
     *
     * Provides utility functions that project data providers should call when handling project settings
     */
    projectSettings: IProjectSettingsService;
    /**
     *
     * This service provides extensions in the extension host the ability to read/write data based on
     * the extension identity and current user (as identified by the OS). This service will not work
     * within the renderer.
     */
    storage: ExtensionStorageService;
    /** */
    settings: ISettingsService;
    /**
     *
     * Service that allows to get and store menu data
     */
    menuData: IMenuDataService;
    /**
     *
     * Provides functions related to scroll groups and Scripture references at those scroll groups
     */
    scrollGroups: IScrollGroupService;
    /**
     *
     * Service that allows to get and store localizations
     */
    localization: ILocalizationService;
    /**
     *
     * Service that sends notifications to users in the UI
     */
    notifications: INotificationService;
  };
  export default papi;
  /**
   *
   * Abstract class that provides a placeholder `notifyUpdate` for data provider engine classes. If a
   * data provider engine class extends this class, it doesn't have to specify its own `notifyUpdate`
   * function in order to use `notifyUpdate`.
   *
   * @see {@link IDataProviderEngine} for more information on extending this class.
   */
  export const DataProviderEngine: typeof PapiDataProviderEngine;
  /**
   *
   * Abstract class that provides a placeholder `notifyUpdate` for Project Data Provider Engine
   * classes. If a Project Data Provider Engine class extends this class, it doesn't have to specify
   * its own `notifyUpdate` function in order to use `notifyUpdate`.
   *
   * Additionally, extending this class informs Intellisense that you can run `notifyUpdate` with the
   * `Setting` data type if needed like so:
   *
   * ```typescript
   * this.notifyUpdate('Setting');
   * ```
   *
   * @see {@link IProjectDataProviderEngine} for more information on extending this class.
   */
  export const ProjectDataProviderEngine: typeof PapiProjectDataProviderEngine;
  /**
   *
   * Abstract class that provides a placeholder `notifyUpdate` for Base Project Data Provider Engine
   * classes. If a Base Project Data Provider Engine class extends this class, it doesn't have to
   * specify its own `notifyUpdate` function in order to use `notifyUpdate`.
   *
   * Additionally, extending this class informs Intellisense that you can run `notifyUpdate` with the
   * `Setting` data type if needed like so:
   *
   * ```typescript
   * this.notifyUpdate('Setting');
   * ```
   *
   * @see {@link IBaseProjectDataProviderEngine} for more information on extending this class.
   */
  export const BaseProjectDataProviderEngine: typeof PapiBaseProjectDataProviderEngine;
  /**
   *
   * Abstract class with partial implementation of {@link IProjectDataProviderEngineFactory}
   * specifically for Layering PDPFs. You can extend this class to make creating a Layering PDPF
   * easier.
   *
   * Extending this class automatically fulfills the special requirements for Layering PDPfs, so we
   * highly recommend extending this class. Please see
   * {@link IProjectDataProviderEngineFactory.getAvailableProjects} for more information on the
   * requirements.
   */
  export const LayeringProjectDataProviderEngineFactory: typeof PapiLayeringProjectDataProviderEngineFactory;
  /**
   *
   * A partial implementation of {@link IWebViewProvider} that includes creating
   * {@link WebViewControllers} for each web view served by the web view provider. This class handles
   * registering, disposing, and making sure there is only one web view controller for each web view
   * for you.
   *
   * You can create a new class extending this abstract class to create a web view provider that
   * serves web views and web view controllers of a specific `webViewType` to facilitate interaction
   * between those web views and other extensions. You can register it with the PAPI using
   * `papi.webViewProviders.register`.
   *
   * If you want to change your existing `IWebViewProvider` from a plain object to extending this
   * class, you will need to change your object's existing method named `getWebView`
   * ({@link IWebViewProvider.getWebView}) to be named `getWebViewDefinition`
   * ({@link WebViewFactory.getWebViewDefinition}), which is a drop-in replacement. You likely do NOT
   * want to overwrite this class's `getWebView` because that will eliminate most of the benefits
   * associated with using this class.
   *
   * @see {@link IWebViewProvider} for more information on extending this class.
   */
  export const WebViewFactory: typeof PapiWebViewFactory;
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
   * Provides functions related to encrypting and decrypting strings like user data, secrets, etc.
   *
   * Uses Electron's [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API.
   *
   * Note that these encryption mechanisms are not transferrable between computers. We recommend using
   * them with `papi.storage` methods to store data safely.
   *
   * WARNING: The primary purpose of this service is to enable extensions to encrypt and decrypt data
   * to be stored securely in local files. It is not intended to protect data passed over a network
   * connection. Please note that using this service passes the unencrypted string between local
   * processes using the PAPI WebSocket.
   */
  export const dataProtection: import('shared/models/data-protection.service-model').IDataProtectionService;
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
   * Interface for registering webView providers, registering webView controllers, and performing
   * privileged interactions with web views
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
  export const networkObjects: MinimalNetworkObjectService;
  /**
   *
   * Provides functions related to the set of available network objects
   */
  export const networkObjectStatus: NetworkObjectStatusServiceType;
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
   *
   * Note: this service runs locally everywhere in the TypeScript processes. It is also exposed on the
   * PAPI websocket. Note these functions are all asynchronous on the PAPI websocket regardless of if
   * their types are synchronous locally.
   */
  export const projectLookup: ProjectLookupServiceType;
  /**
   *
   * Provides utility functions that project data providers should call when handling project settings
   */
  export const projectSettings: IProjectSettingsService;
  /**
   *
   * This service provides extensions in the extension host the ability to read/write data based on
   * the extension identity and current user (as identified by the OS). This service will not work
   * within the renderer.
   */
  export const storage: ExtensionStorageService;
  /** */
  export const settings: ISettingsService;
  /**
   *
   * Service that allows to get and store menu data
   */
  export const menuData: IMenuDataService;
  /**
   *
   * Provides functions related to scroll groups and Scripture references at those scroll groups
   */
  export const scrollGroups: IScrollGroupService;
  /**
   *
   * Service that allows to get and store localizations
   */
  export const localization: ILocalizationService;
  /**
   *
   * Service that sends notifications to users in the UI
   */
  export const notifications: INotificationService;
}
declare module 'extension-host/extension-types/extension.interface' {
  import { UnsubscriberAsync } from 'platform-bible-utils';
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
  import { ElevatedPrivilegeNames } from 'shared/models/elevated-privileges.model';
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
    /** List of special permissions required by the extension to work as intended */
    elevatedPrivileges: `${ElevatedPrivilegeNames}`[];
    /**
     * Path to the TypeScript type declaration file that describes this extension and its interactions
     * on the PAPI. Relative to the extension's root folder.
     *
     * If not provided, Platform.Bible will look in the following locations:
     *
     * 1. `<extension-name>.d.ts` (kebab-case version of the extension name)
     * 2. `<extension-name><other_stuff>.d.ts` (kebab-case version of the extension name)
     * 3. `index.d.ts`
     *
     * See [Extension Anatomy - Type Declaration
     * Files](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#type-declaration-files-dts)
     * for more information about extension type declaration files.
     */
    types?: string;
    /** Path to the JSON file that defines the menu items this extension is adding. */
    menus?: string;
    /** Path to the JSON file that defines the settings this extension is adding. */
    settings?: string;
    /** Path to the JSON file that defines the project settings this extension is adding. */
    projectSettings?: string;
    /** Path to the JSON file that defines the localized strings this extension is adding. */
    localizedStrings?: string;
    /**
     * List of events that occur that should cause this extension to be activated. Not yet
     * implemented.
     */
    activationEvents: string[];
    /** Id of publisher who published this extension on the extension marketplace */
    publisher?: string;
  };
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
  import { PlatformError } from 'platform-bible-utils';
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
        DataProviderTypes[DataProviderName][TDataType]['getData'] | PlatformError,
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
   * _＠param_ `subscriberOptions` various options to adjust how the subscriber emits updates
   *
   * Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   * to re-run with its new value. This means that `subscriberOptions` will be passed to the data
   * provider's `subscribe<data_type>` method as soon as possible and will not be updated again until
   * `dataProviderSource` or `selector` changes.
   *
   * _＠returns_ `[data, setData, isLoading]`
   *
   * - `data`: the current value for the data from the data provider with the specified data type and
   *   selector. This will be the `defaultValue`, the resolved data, or a {@link PlatformError} if the
   *   data provider throws an error. You can call {@link isPlatformError} on this value to check if it
   *   is an error.
   * - `setData`: asynchronous function to request that the data provider update the data at this data
   *   type and selector. Returns `true` if successful. Note that this function does not update the
   *   data. The data provider sends out an update to this subscription if it successfully updates
   *   data.
   * - `isLoading`: whether the data with the data type and selector is awaiting retrieval from the data
   *   provider
   */
  const useData: UseDataHook;
  export default useData;
}
declare module 'renderer/services/scroll-group.service-host' {
  import { ScrollGroupUpdateInfo } from 'shared/services/scroll-group.service-model';
  import { ScriptureReference, ScrollGroupId } from 'platform-bible-utils';
  /**
   * All Scroll Group IDs that are intended to be shown in scroll group selectors. This is a
   * placeholder and will be refactored significantly in
   * https://github.com/paranext/paranext-core/issues/788
   */
  export const availableScrollGroupIds: (number | undefined)[];
  /** Event that emits with information about a changed Scripture Reference for a scroll group */
  export const onDidUpdateScrRef: import('platform-bible-utils').PlatformEvent<ScrollGroupUpdateInfo>;
  /** See {@link IScrollGroupRemoteService.getScrRef} */
  export function getScrRefSync(scrollGroupId?: ScrollGroupId): ScriptureReference;
  /**
   * See {@link IScrollGroupRemoteService.setScrRef}
   *
   * @param shouldSetVerseRefSetting If `true`: if scroll group 0's reference changes, update the
   *   `platform.verseRef` setting to keep it in sync for backwards compatibility. Defaults to `true`.
   *   Only set to `false` when running this from subscription to updates to the setting
   */
  export function setScrRefSync(
    scrollGroupId: ScrollGroupId | undefined,
    scrRef: ScriptureReference,
    shouldSetVerseRefSetting?: boolean,
  ): boolean;
  /** Register the network object that backs the scroll group service */
  export function startScrollGroupService(): Promise<void>;
}
declare module 'renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook' {
  import { ScrollGroupScrRef } from 'shared/services/scroll-group.service-model';
  import { ScriptureReference, ScrollGroupId } from 'platform-bible-utils';
  /**
   * React hook for working with a {@link ScrollGroupScrRef}. Returns a value and a function to set the
   * value for both the {@link ScriptureReference} and the {@link ScrollGroupId} for the provided
   * `scrollGroupScrRef`. Use similarly to `useState`.
   *
   * @param scrollGroupScrRef {@link ScrollGroupScrRef} representing a scroll group and/or Scripture
   *   reference. Defaults to 0 meaning synced with scroll group 0 (A in English)
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param setScrollGroupScrRef Function to run to set `scrollGroupScrRef`. Should return `true` if
   *   actually updated any properties; `false` otherwise
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that updating this parameter will not cause a new
   *   callback to be returned. However, because this is just used when needed and doesn't have any
   *   reason to render changes, this has no adverse effect on the functionality of this hook. It will
   *   always set using the latest value of this callback
   * @returns `[scrRef, setScrRef, scrollGroupId, setScrollGroupId]`
   *
   *   - `scrRef`: The current value for the Scripture reference this `scrollGroupScrRef` represents
   *   - `setScrRef`: Function to use to update the Scripture reference this `scrollGroupScrRef`
   *       represents. If it is synced to a scroll group, sets the scroll group's Scripture reference
   *   - `scrollGroupId`: The current value for the scroll group this `scrollGroupScrRef` is synced with.
   *       If not synced to a scroll group, this is `undefined`
   *   - `setScrollGroupId`: Function to use to update the scroll group with which this
   *       `scrollGroupScrRef` is synced
   */
  export default function useScrollGroupScrRef(
    scrollGroupScrRef: ScrollGroupScrRef | undefined,
    setScrollGroupScrRef: (scrollGroupScrRef: ScrollGroupScrRef) => boolean,
  ): [
    scrRef: ScriptureReference,
    setScrRef: (newScrRef: ScriptureReference) => void,
    scrollGroupId: ScrollGroupId | undefined,
    setScrollGroupId: (newScrollGroupId: ScrollGroupId | undefined) => void,
  ];
}
declare module 'renderer/hooks/papi-hooks/use-setting.hook' {
  import { SettingTypes } from 'papi-shared-types';
  import {
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  import { SettingDataTypes } from 'shared/services/settings.service-model';
  /**
   * Gets, sets and resets a setting on the papi. Also notifies subscribers when the setting changes
   * and gets updated when the setting is changed by others.
   *
   * @param key The string id that is used to identify the setting that will be stored on the papi
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param defaultState The initial value to return while first awaiting the setting value
   * @param subscriberOptions Various options to adjust how the subscriber emits updates
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that `subscriberOptions` will be passed to the data
   *   provider's `subscribe<data_type>` method as soon as possible and will not be updated again
   *   until `dataProviderSource` or `selector` changes.
   * @returns `[setting, setSetting, resetSetting]`
   *
   *   - `setting`: The current state of the setting, either `defaultState` or the stored state on the
   *       papi, if any
   *   - `setSetting`: Function that updates the setting to a new value
   *   - `resetSetting`: Function that removes the setting and resets the value to `defaultState`
   *
   * @throws When subscription callback function is called with an update that has an unexpected
   *   message type
   */
  const useSetting: <SettingName extends keyof SettingTypes>(
    key: SettingName,
    defaultState: SettingTypes[SettingName],
    subscriberOptions?: DataProviderSubscriberOptions,
  ) => [
    setting: SettingTypes[SettingName],
    setSetting: (
      newData: SettingTypes[SettingName],
    ) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>,
    resetSetting: () => void,
    isLoading: boolean,
  ];
  export default useSetting;
}
declare module 'renderer/hooks/papi-hooks/use-project-data-provider.hook' {
  import { ProjectDataProviderInterfaces } from 'papi-shared-types';
  /**
   * Gets a project data provider with specified provider name
   *
   * @param projectInterface `projectInterface` that the project to load must support. The TypeScript
   *   type for the returned project data provider will have the project data provider interface type
   *   associated with this `projectInterface`. If the project does not implement this
   *   `projectInterface` (according to its metadata), an error will be thrown.
   * @param projectDataProviderSource String name of the id of the project to get OR
   *   projectDataProvider (result of useProjectDataProvider, if you want this hook to just return the
   *   data provider again)
   * @param pdpFactoryId Optional ID of the PDP factory from which to get the project data provider if
   *   the PDP factory supports this project id and project interface. If not provided, then look in
   *   all available PDP factories for the given project ID.
   * @returns `undefined` if the Project Data Provider has not been retrieved, the requested Project
   *   Data Provider if it has been retrieved and is not disposed, and undefined again if the Project
   *   Data Provider is disposed
   */
  const useProjectDataProvider: <ProjectInterface extends keyof ProjectDataProviderInterfaces>(
    projectInterface: ProjectInterface,
    projectDataProviderSource: string | ProjectDataProviderInterfaces[ProjectInterface] | undefined,
    pdpFactoryId?: string,
  ) => ProjectDataProviderInterfaces[ProjectInterface] | undefined;
  export default useProjectDataProvider;
}
declare module 'renderer/hooks/papi-hooks/use-project-data.hook' {
  import {
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from 'shared/models/data-provider.model';
  import {
    ProjectDataProviderInterfaces,
    ProjectInterfaceDataTypes,
    ProjectInterfaces,
  } from 'papi-shared-types';
  /**
   * React hook to use data from a Project Data Provider
   *
   * @example `useProjectData('platformScripture.USFM_Verse', 'project id').VerseUSFM(...);`
   */
  type UseProjectDataHook = {
    <ProjectInterface extends ProjectInterfaces>(
      projectInterface: ProjectInterface,
      projectDataProviderSource:
        | string
        | ProjectDataProviderInterfaces[ProjectInterface]
        | undefined,
    ): {
      [TDataType in keyof ProjectInterfaceDataTypes[ProjectInterface]]: (
        // @ts-ignore TypeScript pretends it can't find `selector`, but it works just fine
        selector: ProjectInterfaceDataTypes[ProjectInterface][TDataType]['selector'],
        // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
        defaultValue: ProjectInterfaceDataTypes[ProjectInterface][TDataType]['getData'],
        subscriberOptions?: DataProviderSubscriberOptions,
      ) => [
        // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
        ProjectInterfaceDataTypes[ProjectInterface][TDataType]['getData'],
        (
          | ((
              // @ts-ignore TypeScript pretends it can't find `setData`, but it works just fine
              newData: ProjectInterfaceDataTypes[ProjectInterface][TDataType]['setData'],
            ) => Promise<
              DataProviderUpdateInstructions<ProjectInterfaceDataTypes[ProjectInterface]>
            >)
          | undefined
        ),
        boolean,
      ];
    };
  };
  /**
   * ```typescript
   * useProjectData<ProjectInterface extends ProjectInterfaces>(
   *     projectInterface: ProjectInterface,
   *     projectDataProviderSource: string | ProjectDataProviderInterfaces[ProjectInterface] | undefined,
   *   ).DataType(
   *       selector: ProjectInterfaceDataTypes[ProjectInterface][DataType]['selector'],
   *       defaultValue: ProjectInterfaceDataTypes[ProjectInterface][DataType]['getData'],
   *       subscriberOptions?: DataProviderSubscriberOptions,
   *     ) => [
   *       ProjectInterfaceDataTypes[ProjectInterface][DataType]['getData'],
   *       (
   *         | ((
   *             newData: ProjectInterfaceDataTypes[ProjectInterface][DataType]['setData'],
   *           ) => Promise<DataProviderUpdateInstructions<ProjectInterfaceDataTypes[ProjectInterface]>>)
   *         | undefined
   *       ),
   *       boolean,
   *     ]
   * ```
   *
   * React hook to use data from a Project Data Provider. Subscribes to run a callback on a Project
   * Data Provider's data with specified selector on the specified data type that the Project Data
   * Provider serves according to its supported `projectInterface`s.
   *
   * Usage: Specify the `projectInterface`, the project id, and the data type on the Project Data
   * Provider with `useProjectData('<projectInterface>', '<project_id>').<data_type>` and use like any
   * other React hook.
   *
   * _＠example_ Subscribing to Verse USFM info at JHN 11:35 on a `platformScripture.USFM_Verse`
   * project with projectId `32664dc3288a28df2e2bb75ded887fc8f17a15fb`:
   *
   * ```typescript
   * const [verse, setVerse, verseIsLoading] = useProjectData(
   *   'platformScripture.USFM_Verse',
   *   '32664dc3288a28df2e2bb75ded887fc8f17a15fb',
   * ).VerseUSFM(
   *   useMemo(() => new VerseRef('JHN', '11', '35', ScrVers.English), []),
   *   'Loading verse ',
   * );
   * ```
   *
   * _＠param_ `projectInterface` `projectInterface` that the project to load must support. The
   * TypeScript type for the returned project data provider will have the project data provider
   * interface type associated with this `projectInterface`. If the project does not implement this
   * `projectInterface` (according to its metadata), an error will be thrown.
   *
   * _＠param_ `projectDataProviderSource` String name of the id of the project to get OR
   * projectDataProvider (result of useProjectDataProvider if you want to consolidate and only get the
   * Project Data Provider once)
   *
   * _＠param_ `selector` tells the provider what data this listener is listening for
   *
   * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   * updated every render
   *
   * _＠param_ `defaultValue` the initial value to return while first awaiting the data
   *
   * _＠param_ `subscriberOptions` various options to adjust how the subscriber emits updates
   *
   * Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   * to re-run with its new value. This means that `subscriberOptions` will be passed to the Project
   * Data Provider's `subscribe<data_type>` method as soon as possible and will not be updated again
   * until `projectDataProviderSource` or `selector` changes.
   *
   * _＠returns_ `[data, setData, isLoading]`
   *
   * - `data`: the current value for the data from the Project Data Provider with the specified data
   *   type and selector, either the `defaultValue` or the resolved data
   * - `setData`: asynchronous function to request that the Project Data Provider update the data at
   *   this data type and selector. Returns `true` if successful. Note that this function does not
   *   update the data. The Project Data Provider sends out an update to this subscription if it
   *   successfully updates data.
   * - `isLoading`: whether the data with the data type and selector is awaiting retrieval from the data
   *   provider
   */
  const useProjectData: UseProjectDataHook;
  export default useProjectData;
}
declare module 'renderer/hooks/papi-hooks/use-project-setting.hook' {
  import { IBaseProjectDataProvider, ProjectSettingTypes } from 'papi-shared-types';
  import { DataProviderSubscriberOptions } from 'shared/models/data-provider.model';
  /**
   * Gets, sets and resets a project setting on the papi for a specified project. Also notifies
   * subscribers when the project setting changes and gets updated when the project setting is changed
   * by others.
   *
   * @param projectDataProviderSource `projectDataProviderSource` String name of the id of the project
   *   to get OR projectDataProvider (result of `useProjectDataProvider` if you want to consolidate
   *   and only get the Project Data Provider once). If you provide a project id, this hook will use a
   *   PDP for this project that supports the `platform.base` `projectInterface`.
   *
   *   Note: If you provide a projectDataProvider directly, it must be an
   *   {@link IBaseProjectDataProvider}
   * @param key The string id of the project setting to interact with
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param defaultValue The initial value to return while first awaiting the project setting value
   * @param subscriberOptions Various options to adjust how the subscriber emits updates
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that `subscriberOptions` will be passed to the data
   *   provider's `subscribe<data_type>` method as soon as possible and will not be updated again
   *   until `dataProviderSource` or `selector` changes.
   * @returns `[setting, setSetting, resetSetting]`
   *
   *   - `setting`: the current value for the project setting from the Project Data Provider with the
   *       specified key, either the `defaultValue` or the resolved setting value
   *   - `setSetting`: asynchronous function to request that the Project Data Provider update the project
   *       setting with the specified key. Returns `true` if successful. Note that this function does
   *       not update the data. The Project Data Provider sends out an update to this subscription if
   *       it successfully updates data.
   *   - `resetSetting`: asynchronous function to request that the Project Data Provider reset the project
   *       setting
   *   - `isLoading`: whether the setting value is awaiting retrieval from the Project Data Provider
   *
   * @throws When subscription callback function is called with an update that has an unexpected
   *   message type
   */
  const useProjectSetting: <ProjectSettingName extends keyof ProjectSettingTypes>(
    projectDataProviderSource: string | IBaseProjectDataProvider<any> | undefined,
    key: ProjectSettingName,
    defaultValue: ProjectSettingTypes[ProjectSettingName],
    subscriberOptions?: DataProviderSubscriberOptions,
  ) => [
    setting: ProjectSettingTypes[ProjectSettingName],
    setSetting: ((newSetting: ProjectSettingTypes[ProjectSettingName]) => void) | undefined,
    resetSetting: (() => void) | undefined,
    isLoading: boolean,
  ];
  export default useProjectSetting;
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
declare module 'renderer/hooks/papi-hooks/use-localized-strings-hook' {
  import { LocalizationData } from 'shared/services/localization.service-model';
  import { DataProviderSubscriberOptions } from 'shared/models/data-provider.model';
  import { LocalizeKey } from 'platform-bible-utils';
  /**
   * Gets localizations on the papi.
   *
   * @param localizationKeys Array of keys to get localizations of
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param localizationLocales Array of localization languages to look up the keys in
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param subscriberOptions Various options to adjust how the subscriber emits updates
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that `subscriberOptions` will be passed to the data
   *   provider's `subscribe<data_type>` method as soon as possible and will not be updated again
   *   until `dataProviderSource` or `selector` changes.
   * @returns `[localizedStrings]`
   *
   *   - `localizedStrings`: The current state of the localizations, either `defaultState` or the stored
   *       state on the papi, if any
   */
  const useLocalizedStrings: (
    localizationKeys: LocalizeKey[],
    localizationLocales?: string[],
    subscriberOptions?: DataProviderSubscriberOptions,
  ) => [localizedStrings: LocalizationData, isLoading: boolean];
  export default useLocalizedStrings;
}
declare module 'renderer/hooks/papi-hooks/use-web-view-controller.hook' {
  import { WebViewControllers } from 'papi-shared-types';
  import { NetworkObject } from 'shared/models/network-object.model';
  import { WebViewId } from 'shared/models/web-view.model';
  /**
   * Gets a Web View Controller with specified provider name
   *
   * @param webViewType `webViewType` that the web view controller must support. The TypeScript type
   *   for the returned web view controller will have the web view controller interface type
   *   associated with this `webViewType`. If the web view controller does not implement this
   *   `webViewType` (according to its metadata), an error will be thrown.
   * @param webViewId Id of the web view for which to get the web view controller OR
   *   `webViewController` (result of `useWebViewController`, if you want this hook to just return the
   *   controller again)
   * @param pdpFactoryId Optional ID of the PDP factory from which to get the Web View Controller if
   *   the PDP factory supports this project id and project interface. If not provided, then look in
   *   all available PDP factories for the given project ID.
   * @returns `undefined` if the Web View Controller has not been retrieved, the requested Web View
   *   Controller if it has been retrieved and is not disposed, and undefined again if the Web View
   *   Controller is disposed
   */
  const useWebViewController: <WebViewType extends keyof WebViewControllers>(
    webViewType: WebViewType,
    webViewId: WebViewId | NetworkObject<WebViewControllers[WebViewType]> | undefined,
  ) => NetworkObject<WebViewControllers[WebViewType]> | undefined;
  export default useWebViewController;
}
declare module 'renderer/hooks/papi-hooks/index' {
  export { default as useDataProvider } from 'renderer/hooks/papi-hooks/use-data-provider.hook';
  export { default as useData } from 'renderer/hooks/papi-hooks/use-data.hook';
  export { default as useScrollGroupScrRef } from 'renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook';
  export { default as useSetting } from 'renderer/hooks/papi-hooks/use-setting.hook';
  export { default as useProjectData } from 'renderer/hooks/papi-hooks/use-project-data.hook';
  export { default as useProjectDataProvider } from 'renderer/hooks/papi-hooks/use-project-data-provider.hook';
  export { default as useProjectSetting } from 'renderer/hooks/papi-hooks/use-project-setting.hook';
  export { default as useDialogCallback } from 'renderer/hooks/papi-hooks/use-dialog-callback.hook';
  export { default as useDataProviderMulti } from 'renderer/hooks/papi-hooks/use-data-provider-multi.hook';
  export { default as useLocalizedStrings } from 'renderer/hooks/papi-hooks/use-localized-strings-hook';
  export { default as useWebViewController } from 'renderer/hooks/papi-hooks/use-web-view-controller.hook';
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
  import * as commandService from 'shared/services/command.service';
  import { PapiNetworkService } from 'shared/services/network.service';
  import { WebViewServiceType } from 'shared/services/web-view.service-model';
  import { InternetService } from 'shared/services/internet.service';
  import { DataProviderService } from 'shared/services/data-provider.service';
  import { ProjectLookupServiceType } from 'shared/models/project-lookup.service-model';
  import { PapiFrontendProjectDataProviderService } from 'shared/services/project-data-provider.service';
  import { ISettingsService } from 'shared/services/settings.service-model';
  import { DialogService } from 'shared/services/dialog.service-model';
  import * as papiReact from '@papi/frontend/react';
  import PapiRendererWebSocket from 'renderer/services/renderer-web-socket.service';
  import { IMenuDataService } from 'shared/services/menu-data.service-model';
  import { IScrollGroupService } from 'shared/services/scroll-group.service-model';
  import { ILocalizationService } from 'shared/services/localization.service-model';
  import { INotificationService } from 'shared/models/notification.service-model';
  import PapiRendererXMLHttpRequest from 'renderer/services/renderer-xml-http-request.service';
  const papi: {
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
     *
     * Note: this service runs locally everywhere in the TypeScript processes. It is also exposed on the
     * PAPI websocket. Note these functions are all asynchronous on the PAPI websocket regardless of if
     * their types are synchronous locally.
     */
    projectLookup: ProjectLookupServiceType;
    /**
     *
     * React hooks that enable interacting with the `papi` in React components more easily.
     */
    react: typeof papiReact;
    /** */
    settings: ISettingsService;
    /**
     *
     * Service that allows to get and store menu data
     */
    menuData: IMenuDataService;
    /**
     *
     * Provides functions related to scroll groups and Scripture references at those scroll groups
     */
    scrollGroups: IScrollGroupService;
    /**
     *
     * Service that allows to get and store localizations
     */
    localization: ILocalizationService;
    /**
     *
     * Service that sends notifications to users in the UI
     */
    notifications: INotificationService;
  };
  export default papi;
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
   *
   * Note: this service runs locally everywhere in the TypeScript processes. It is also exposed on the
   * PAPI websocket. Note these functions are all asynchronous on the PAPI websocket regardless of if
   * their types are synchronous locally.
   */
  export const projectLookup: ProjectLookupServiceType;
  /**
   *
   * React hooks that enable interacting with the `papi` in React components more easily.
   */
  export const react: typeof papiReact;
  /** */
  export const settings: ISettingsService;
  /**
   *
   * Service that allows to get and store menu data
   */
  export const menuData: IMenuDataService;
  /**
   *
   * Provides functions related to scroll groups and Scripture references at those scroll groups
   */
  export const scrollGroups: IScrollGroupService;
  /**
   *
   * Service that allows to get and store localizations
   */
  export const localization: ILocalizationService;
  /**
   *
   * Service that sends notifications to users in the UI
   */
  export const notifications: INotificationService;
  export type Papi = typeof papi;
}
