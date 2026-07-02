/**
 * Creates the WebSocketServer that hosts this app's PAPI network.
 *
 * All paranext-based apps prefer the same default port, so the preferred port may already be taken
 * — e.g. Paratext 10 Studio and Platform.Bible running side by side, or a leftover dev instance. In
 * that case, fall back to an automatically assigned free port so this app runs its own fully
 * isolated PAPI network instead of its clients silently attaching to the other app's network. See
 * https://paratextstudio.atlassian.net/browse/PT-4109
 */

import { CommandLineArgs, getCommandLineArgument } from '@node/utils/command-line.util';
import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { WebSocketServer } from 'ws';

/**
 * Environment variable that specifies which port to prefer for this app's PAPI WebSocket server.
 * The {@link CommandLineArgs.WebSocketPort} command-line argument takes precedence over this.
 */
export const WEBSOCKET_PORT_ENV_VAR = 'PAPI_WEBSOCKET_PORT';

interface PapiWebSocketServerInfo {
  webSocketServer: WebSocketServer;
  /** Port the WebSocket server is actually listening on */
  port: number;
}

/**
 * Determine which port this app should try first for its PAPI WebSocket server: the
 * `--webSocketPort` command-line argument, then the {@link WEBSOCKET_PORT_ENV_VAR} environment
 * variable, then {@link WEBSOCKET_PORT}
 */
export function getPreferredWebSocketPort(): number {
  const portString =
    getCommandLineArgument(CommandLineArgs.WebSocketPort) ?? process.env[WEBSOCKET_PORT_ENV_VAR];
  if (portString === undefined) return WEBSOCKET_PORT;

  const port = Number(portString);
  if (Number.isInteger(port) && port > 0 && port <= 65535) return port;

  logger.warn(
    `Ignoring invalid PAPI WebSocket port "${portString}" from the command line or ${WEBSOCKET_PORT_ENV_VAR}. Using default port ${WEBSOCKET_PORT}`,
  );
  return WEBSOCKET_PORT;
}

/** Start a WebSocketServer listening on the given port. Rejects if the server fails to start */
function startWebSocketServerOnPort(port: number): Promise<WebSocketServer> {
  return new Promise((resolve, reject) => {
    const webSocketServer = new WebSocketServer({ port });

    function removeStartupListeners() {
      webSocketServer.removeListener('listening', onListening);
      webSocketServer.removeListener('error', onError);
    }
    function onListening() {
      removeStartupListeners();
      resolve(webSocketServer);
    }
    function onError(error: Error) {
      removeStartupListeners();
      webSocketServer.close();
      reject(error);
    }

    webSocketServer.on('listening', onListening);
    webSocketServer.on('error', onError);
  });
}

/** Get the port a listening WebSocketServer is bound to */
function getListeningPort(webSocketServer: WebSocketServer): number {
  const address = webSocketServer.address();
  // address() only returns a string for servers listening on a pipe/unix socket, which we never do
  if (typeof address === 'object' && address) return address.port;
  throw new Error(`Could not determine PAPI WebSocket server port from address "${address}"`);
}

/**
 * Create the WebSocketServer that hosts this app's PAPI network, listening on `preferredPort` if it
 * is available or an automatically assigned free port otherwise
 *
 * @param preferredPort Port to try first. Defaults to {@link getPreferredWebSocketPort}
 * @returns The listening server and the port it is actually listening on
 * @throws If a server could not be started even on an automatically assigned port
 */
export async function createPapiWebSocketServer(
  preferredPort: number = getPreferredWebSocketPort(),
): Promise<PapiWebSocketServerInfo> {
  try {
    const webSocketServer = await startWebSocketServerOnPort(preferredPort);
    return { webSocketServer, port: preferredPort };
  } catch (error) {
    logger.warn(
      `PAPI WebSocket server could not listen on port ${preferredPort}: ${getErrorMessage(error)}. The port is probably in use by another paranext-based app or a leftover instance of this app. Falling back to an automatically assigned port so this app runs its own isolated PAPI network.`,
    );
  }

  const webSocketServer = await startWebSocketServerOnPort(0);
  return { webSocketServer, port: getListeningPort(webSocketServer) };
}
