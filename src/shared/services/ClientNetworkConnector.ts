import {
  CONNECTOR_INFO_DISCONNECTED,
  InternalRequest,
  InternalRequestHandler,
  NetworkConnectorInfo,
} from '@shared/data/InternalConnectionTypes';
import INetworkConnector from './INetworkConnector';

/**
 * Handles the connection from the client to the server
 */
export default class ClientNetworkConnector implements INetworkConnector {
  connectorInfo: NetworkConnectorInfo = CONNECTOR_INFO_DISCONNECTED;

  connecting = false;

  connected = false;

  /** Function that removes this handleRequest from the connection */
  private unsubscribeConnectionRequestHandler?: () => boolean;

  /**
   * Gets the electron client connection if connected. Throws otherwise.
   * Similar in concept to a sendMessage function in that it checks for connection and then lets you do connection things.
   * @param unsafe whether to get the client even if we aren't connected. WARNING: SETTING THIS FLAG MEANS NOT CHECKING FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. There may be no clientId
   * @returns electronAPI.client for use in communicating to the main process
   */
  private getClient(unsafe = false) {
    // TODO: add message queueing?
    if (!unsafe && !this.connected)
      throw new Error(`Trying to use network connector when not connected!`);
    return window.electronAPI.client;
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
    // For electron, we don't need to create a connection, but we still need to get the id
    const newConnectorInfo = await this.getClient(true).getConnectorInfo();

    // If we disconnected since we started connecting, throw error
    if (!this.connecting) throw new Error('No longer connecting!');

    // Listen for requests from the server
    this.unsubscribeConnectionRequestHandler =
      this.getClient(true).handleRequest(requestHandler);

    this.connectorInfo = newConnectorInfo;
    this.connected = true;
    return this.connectorInfo;
  }

  async notifyClientConnected() {
    return this.getClient().notifyClientConnected(this.connectorInfo);
  }

  disconnect() {
    this.connecting = false;
    this.connected = false;
    this.connectPromise = undefined;
    this.connectorInfo = CONNECTOR_INFO_DISCONNECTED;
    if (this.unsubscribeConnectionRequestHandler)
      this.unsubscribeConnectionRequestHandler();
  }

  async request<TParam, TReturn>(
    requestType: string,
    request: InternalRequest<TParam>,
  ) {
    return this.getClient().request<TParam, TReturn>(requestType, request);
  }
}
