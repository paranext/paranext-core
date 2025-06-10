import type { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { SerializedVerseRef } from '@sillsdev/scripture';
// Used in JSDoc link
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LocalizeKey, ScrollGroupId } from 'platform-bible-utils';

/**
 * The type of code that defines a webview's content.
 *
 * If `react`: This webview is a React webview. It must specify its component by setting it to
 * `globalThis.webViewComponent`. See {@link WebViewDefinitionReact} for more information.
 *
 * If `html`: This webview is a raw HTML/JS/CSS webview. See {@link WebViewDefinitionHtml} for more
 * information.
 *
 * If `url`: This webview's content is fetched from the url specified (iframe `src` attribute). Note
 * that webViews of this type cannot access the `papi` because they cannot be on the same origin as
 * the parent window. See {@link WebViewDefinitionURL} for more information.
 */
export type WebViewContentType = 'react' | 'html' | 'url';

/**
 * String values for each {@link WebViewContentType}. As opposed to {@link WebViewContentType}, these
 * can only be used in core
 */
export const WEB_VIEW_CONTENT_TYPE = Object.freeze({
  REACT: 'react',
  HTML: 'html',
  URL: 'url',
});

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
   * With which scroll group this web view is synced or the SerializedVerseRef this web view is
   * focusing independently of a scroll group
   */
  scrollGroupScrRef?: ScrollGroupScrRef;
  /** The last time (`Date.now()`) the WebView tab was instructed to flash its contents in the UI. */
  flashTriggerTime?: number;
  /**
   * General object to store unique state for this webview.
   *
   * WARNING: This storage is not private; other extensions can access this data. Do not store
   * secrets in here
   */
  state?: Record<string, unknown>;
  /**
   * Whether to allow the WebView iframe to interact with its parent as a same-origin website.
   * Setting this to true adds `allow-same-origin` to the WebView iframe's [sandbox
   * attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox). Defaults
   * to `true`.
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
   * the WebView iframe's [sandbox
   * attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox). Defaults
   * to `true` for HTML and React WebViews and `false` for URL WebViews
   *
   * WARNING: Setting this to `true` increases the possibility of a security threat occurring. If it
   * is not necessary to run scripts in your WebView, you should set this to `false` to reduce
   * risk.
   */
  allowScripts?: boolean;
  /**
   * **For HTML and React WebViews:** List of [Host or scheme
   * values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#host-source)
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
  /**
   * Whether a toolbar should be displayed at the top of the web view. Currently this toolbar cannot
   * be modified and is provided as is. It displays a BookChapterControl and a ScrollGroupSelector.
   */
  shouldShowToolbar?: boolean;
};

/** WebView representation using React */
export type WebViewDefinitionReact = WebViewDefinitionBase & {
  /** Indicates this WebView uses React. See {@link WebViewContentType} for more information. */
  contentType?: 'react';
  /** String of styles to be loaded into the iframe for this WebView */
  styles?: string;
};

/** WebView representation using HTML */
export type WebViewDefinitionHtml = WebViewDefinitionBase & {
  /** Indicates this WebView uses HTML. See {@link WebViewContentType} for more information. */
  contentType: 'html';
};

/**
 * WebView representation using a URL.
 *
 * Note: you can only use `papi-extension:` and `https:` urls
 */
export type WebViewDefinitionURL = WebViewDefinitionBase & {
  /** Indicates this WebView uses a URL. See {@link WebViewContentType} for more information. */
  contentType: 'url';
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
// If you add to these, please make sure they are in `WebViewDefinition`
// See also the following function that makes use of these omitted properties:
// `web-view.service.ts` -> `convertWebViewDefinitionToSaved`
export const SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS = [
  // We don't want to keep the webView content so the web view provider can provide it again when
  // deserializing
  'content',
  'styles',
  // We don't want to keep security-related properties so the web view doesn't get loaded with the
  // wrong security somehow. The web view provider should provide this every time it provides the
  // content
  'allowScripts',
  'allowSameOrigin',
  'allowedFrameSources',
  'allowPopups',
] as const;

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
  // Required properties
  Pick<WebViewDefinitionBase, 'id' | 'webViewType'>;

/**
 * The keys of properties on a WebViewDefinition that may be updated when that webview is already
 * displayed
 */
// If you add to these, please make sure they are in `WebViewDefinition`
// See also the following function that makes use of these updatable properties:
// `web-view.service.ts` -> `mergeUpdatablePropertiesIntoWebViewDefinition`
export const WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS = [
  'iconUrl',
  'title',
  'tooltip',
  'projectId',
  'scrollGroupScrRef',
  'flashTriggerTime',
] as const;

/** The properties on a WebViewDefinition that may be updated when that webview is already displayed */
export type WebViewDefinitionUpdatableProperties = Pick<
  WebViewDefinitionBase,
  (typeof WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS)[number]
>;

/**
 * WebViewDefinition properties for updating a WebView that is already displayed. Any unspecified
 * properties will stay the same
 */
// To allow more properties to be updated, add them in
// `web-view.service.ts` -> `getUpdatablePropertiesFromWebViewDefinition`
export type WebViewDefinitionUpdateInfo = Partial<WebViewDefinitionUpdatableProperties>;

// This hook is found in `use-web-view-state.hook.ts`
// Note: the following comment uses ＠, not the actual @ character, to hackily provide @param and
// such on this type. It seem that, for some reason, JSDoc does not carry these annotations on
// destructured members of object types, so using WebViewProps as
// `{ useWebViewState }: WebViewProps` was not carrying the annotations out to the new
// `useWebViewState` variable. One day, this may work, so we can fix this JSDoc back to using real @
/**
 * JSDOC SOURCE UseWebViewStateHook
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

// This hook is found in `use-web-view-scroll-group-scr-ref.hook.ts`
// Note: the following comment uses ＠, not the actual @ character, to hackily provide @param and
// such on this type. It seem that, for some reason, JSDoc does not carry these annotations on
// destructured members of object types, so using WebViewProps as
// `{ useWebViewScrollGroupScrRef }: WebViewProps` was not carrying the annotations out to the new
// `useWebViewScrollGroupScrRef` variable. One day, this may work, so we can fix this JSDoc back to using real @
/**
 * JSDOC SOURCE UseWebViewScrollGroupScrRefHook
 *
 * A React hook for working with this web view's scroll group and Scripture Reference. Returns a
 * value and a function to set the value for both the SerializedVerseRef and the
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
  scrRef: SerializedVerseRef,
  setScrRef: (newScrRef: SerializedVerseRef) => void,
  scrollGroupId: ScrollGroupId | undefined,
  setScrollGroupId: (newScrollGroupId: ScrollGroupId | undefined) => void,
];

// Note: the following comment uses ＠, not the actual @ character, to hackily provide @param and
// such on this type. It seem that, for some reason, JSDoc does not carry these annotations on
// destructured members of object types. See comment above UseWebViewStateHook for more info.
/**
 * JSDOC SOURCE GetSavedWebViewDefinition
 *
 * Gets the saved properties on this WebView's WebView definition
 *
 * _＠returns_ saved properties this WebView's WebView definition or undefined if not found for some
 * reason
 */
export type GetSavedWebViewDefinition = () => SavedWebViewDefinition | undefined;

// Note: the following comment uses ＠, not the actual @ character, to hackily provide @param and
// such on this type. It seem that, for some reason, JSDoc does not carry these annotations on
// destructured members of object types. See comment above UseWebViewStateHook for more info.
/**
 * JSDOC SOURCE UpdateWebViewDefinition
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
  /** JSDOC DESTINATION UseWebViewStateHook */
  useWebViewState: UseWebViewStateHook;
  /** JSDOC DESTINATION UseWebViewScrollGroupScrRefHook */
  useWebViewScrollGroupScrRef: UseWebViewScrollGroupScrRefHook;
  /** JSDOC DESTINATION UpdateWebViewDefinition */
  updateWebViewDefinition: UpdateWebViewDefinition;
};

/** Options that affect what `webViews.openWebView` does */
export type OpenWebViewOptions = {
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
   * `existingId` at all is the only way to specify we are not looking for an existing WebView
   */
  existingId?: string | '?' | undefined;
  /**
   * Whether to create a WebView with a new ID and a WebView with ID `existingId` was not found.
   * Only relevant if `existingId` is provided. If `existingId` is not provided, this property is
   * ignored.
   *
   * Defaults to true
   */
  createNewIfNotFound?: boolean;
  /**
   * Whether to bring the WebView to the front if it already exists. Only relevant if `existingId`
   * is provided. If `existingId` is not provided, this property is ignored.
   *
   * Defaults to true
   *
   * If a new WebView is created, it is always brought to the front, regardless of this option.
   */
  bringToFront?: boolean;
};

/** @deprecated 16 May 2025. Renamed to {@link OpenWebViewOptions}. */
// This can't live in web-view.service-model.ts because extensions can see it
export type GetWebViewOptions = OpenWebViewOptions;
