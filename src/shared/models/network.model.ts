/**
 * A process main can identify: `'renderer'` (the app's windows and every WebView in them),
 * `'extensionHost'` (all backend extensions), `'dotnetDataProvider'`.
 */
export type RequestCallerProcess = 'renderer' | 'extensionHost' | 'dotnetDataProvider';

/** Options related to calling a method over the network */
export type NetworkMethodHandlerOptions = {
  /**
   * Custom timeout to use for callers of a method instead of the platform-wide timeout value. Set
   * to 0 to disable the timeout.
   */
  timeoutMilliseconds?: number;
  /**
   * Processes that may call this handler; main always may. When omitted, anything may call it,
   * including browser pages and local tools. A refused caller gets `MethodNotFound`.
   *
   * Names processes, not extensions: `'extensionHost'` admits every extension and `'renderer'`
   * every WebView. Ignored for request types the platform restricts itself.
   */
  allowedCallers?: readonly RequestCallerProcess[];
};
