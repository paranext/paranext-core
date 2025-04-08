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
   * - `<app-uri-scheme>` is the URI scheme this application supports. You can retrieve this value
   *   using `papi.app.getAppInfo()`
   * - `<extension-publisher>` is the publisher id of this extension as specified in the extension
   *   manifest
   * - `<extension-name>` is the name of this extension as specified in the extension manifest
   *
   * Additional data can be added to the end of the URI; this is just the scheme and authority. See
   * {@link HandleUri.registerUriHandler} for more information.
   */
  redirectUri: string;
};
