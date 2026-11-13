/** A process main can identify on the PAPI network */
export type RequestCallerProcess = 'renderer' | 'extensionHost' | 'dotnetDataProvider';

/** Options related to calling a method over the network */
export type NetworkMethodHandlerOptions = {
  /**
   * Custom timeout to use for callers of a method instead of the platform-wide timeout value. Set
   * to 0 to disable the timeout.
   */
  timeoutMilliseconds?: number;
  /**
   * Processes allowed to call this handler. When omitted, any connection may call it. Main can
   * always call it.
   *
   * This identifies processes, not extensions: every extension shares the extension host process,
   * so `'extensionHost'` admits all of them. A request type that core restricts itself keeps core's
   * rule; this option cannot widen it.
   */
  allowedCallers?: RequestCallerProcess[];
};
