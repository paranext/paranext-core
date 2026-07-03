/**
 * Namespace to use for features like commands, settings, etc. on the PAPI that are provided by
 * Platform.Bible core
 */
export const PLATFORM_NAMESPACE = 'platform';

/** Query parameter passed to the renderer. Determines which log level to use */
export const LOG_LEVEL_QUERY_PARAMETER = 'logLevel';

/** Query parameter passed to the renderer. Determines if it should enable noisy dev mode */
export const DEV_MODE_QUERY_PARAMETER = 'noisyDevMode';

/**
 * Query parameter passed to the renderer. Advertises the port this app's PAPI WebSocket server is
 * listening on
 */
export const WEBSOCKET_PORT_QUERY_PARAMETER = 'webSocketPort';

/**
 * Parse a string that should contain a WebSocket port number
 *
 * Note: this lives here rather than in `rpc.model.ts` because it is used in each process's
 * `global-this.model.ts`, which must not (transitively) import `logger.service` — the logger reads
 * `globalThis` variables at module initialization, before `global-this.model.ts` sets them.
 *
 * @param portString String to parse, e.g. from a command-line argument, environment variable, or
 *   query parameter
 * @returns The port number, or `undefined` if the string is missing or is not a valid port number
 *   (an integer from 1 to 65535)
 */
export function parseWebSocketPort(portString: string | undefined): number | undefined {
  if (portString === undefined) return undefined;
  const port = Number(portString);
  if (Number.isInteger(port) && port > 0 && port <= 65535) return port;
  return undefined;
}

/** ID of the default theme family for use in the application */
export const DEFAULT_THEME_FAMILY = '';
/** Type of the default theme for use in the application */
export const DEFAULT_THEME_TYPE = 'light';

/** Constants related to zoom factor of entire application */
export const DEFAULT_ZOOM_FACTOR = 1.0;
export const MIN_ZOOM_FACTOR = 0.5;
export const MAX_ZOOM_FACTOR = 3.0;
