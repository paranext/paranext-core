/** Options related to calling a method over the network */
export type NetworkMethodHandlerOptions = {
  /**
   * Custom timeout to use for callers of a method instead of the platform-wide timeout value. Set
   * to 0 to disable the timeout.
   */
  timeoutMilliseconds?: number;
};
