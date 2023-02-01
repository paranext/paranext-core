import { ipcMain } from 'electron';
import {
  CLIENT_ID_SERVER,
  InternalRequest,
  InternalRequestHandler,
  InternalResponse,
  NetworkConnectorInfo,
} from '@shared/data/InternalConnectionTypes';
import INetworkConnector from '@shared/services/INetworkConnector';

/**
 * Handles the endpoint and connections from the server to the clients
 */
export default class ServerNetworkConnector implements INetworkConnector {
  connectorInfo: NetworkConnectorInfo = { clientId: CLIENT_ID_SERVER };

  connecting = false;

  connected = false;

  /** Function that removes this handleRequest from the connection */
  private unsubscribeConnectionRequestHandler?: () => boolean;

  /**
   * Gets the electron ipcMain if connected. Throws otherwise.
   * Similar in concept to a sendMessage function in that it checks for connection and then lets you do connection things.
   * @param unsafe whether to get the ipcMain even if we aren't connected. WARNING: SETTING THIS FLAG MEANS NOT CHECKING FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. There may be no connection
   * @returns ipcMain for use in communicating to the clients
   */
  private getServer(unsafe = false) {
    // TODO: add message queueing?
    if (!unsafe && !this.connected)
      throw new Error(`Trying to use network connector when not connected!`);
    return ipcMain;
  }

  /** Promise that resolves when the connection is finished or rejects if disconnected before the connection finishes */
  private connectPromise?: Promise<NetworkConnectorInfo>;

  async connect(requestHandler: InternalRequestHandler) {
    // NOTE: This does not protect against sending two different request handlers. See ConnectionService for that
    if (this.connectPromise) return this.connectPromise;
    this.connectPromise = this.memoizedConnect(requestHandler);
    return this.connectPromise;
  }

  /** Memoized version of connect - runs once per connection. See connect() for details */
  private async memoizedConnect(requestHandler: InternalRequestHandler) {
    this.connecting = true;

    // For the server, we already have our connection info

    /** Handles ipc request events */
    const ipcRequestHandler = async (
      _event: Electron.IpcMainInvokeEvent,
      requestType: string,
      request: InternalRequest,
    ): Promise<InternalResponse> => {
      return requestHandler(requestType, request);
    };

    // Listen for requests from the client
    this.getServer(true).handle(
      'electronAPI.client.request',
      ipcRequestHandler,
    );

    this.unsubscribeConnectionRequestHandler = () => {
      this.getServer(true).removeListener(
        'electronAPI.client.request',
        ipcRequestHandler,
      );
      return true;
    };

    this.connected = true;
    return this.connectorInfo;
  }

  // Don't need self here because there's nothing to do. This is just implementing the interface method as a placeholder for now
  // eslint-disable-next-line class-methods-use-this
  async notifyClientConnected() {
    // Don't think we need to do anything to tell the client that the server is ready
    return Promise.resolve();
  }

  disconnect() {
    this.connecting = false;
    this.connected = false;
    this.connectPromise = undefined;
    if (this.unsubscribeConnectionRequestHandler)
      this.unsubscribeConnectionRequestHandler();
  }

  async request<TParam, TReturn>(
    requestType: string,
    request: InternalRequest<TParam>,
  ) {
    return this.getServer().request<TParam, TReturn>(requestType, request);
  }
}
