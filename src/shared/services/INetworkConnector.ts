import {
  InternalRequestHandler,
  NetworkConnectorInfo,
} from '@shared/data/InternalConnectionTypes';

/**
 * Interface that defines the network connection functionality the server and the client must implement.
 * Used by NetworkConnectorFactory to supply the right kind of NetworkConnector to ConnectionService
 */
export default interface INetworkConnector {
  /** Information about the connector. Populated by the server while connecting */
  connectorInfo: NetworkConnectorInfo;
  /** Whether the connection is being set up or has finished connecting (does not return to false when connected is true) */
  connecting: boolean;
  /** Whether this connector has finished setting up its connection - has connectorInfo and such */
  connected: boolean;

  /**
   * Sets up the NetworkConnector by populating connector info, setting up event handlers, and doing one of the following:
   * - On Client: connecting to the server.
   * - On Server: opening an endpoint for clients to connect.
   * MUST ALSO RUN notifyClientConnected() WHEN PROMISE RESOLVES
   * @param localRequestHandler function that handles requests from the connection. Only called when this connector can handle the request
   * @param requestRouter function that returns a clientId to which to send the request based on the requestType. If requestRouter returns this connector's clientId, localRequestHandler is used
   * @returns Promise that resolves with connector info when finished connecting
   */
  connect: (
    localRequestHandler: InternalRequestHandler,
    requestRouter: (requestType: string) => number,
  ) => Promise<NetworkConnectorInfo>;
  /**
   * Notify the server that this client has received its connectorInfo and is ready to go.
   * MUST RUN AFTER connect() WHEN ITS PROMISE RESOLVES
   * TODO: Is this necessary?
   */
  notifyClientConnected: () => Promise<void>;
  /**
   * Disconnects from the connection:
   * - On Client: disconnects from the server
   * - On Server: disconnects from clients and closes its connection endpoint
   */
  disconnect: () => void;
  /**
   * Send a request to the server/a client and resolve after receiving a response
   * @param requestType the type of request
   * @param contents contents to send in the request
   * @returns promise that resolves with the response message
   */
  request: InternalRequestHandler;
  /**
   * Register a handler on this connection to run when it receives a request.
   * Not needed as we are passing in the requestHandler with connect().
   * But should we make onRequest run callbacks that want to listen for requests?
   * @param callback handler to run with request from requestor, async returns a response to the requestor
   * @returns unsubscriber to remove this handler from running on requests
   */
  /* onRequest: (callback: InternalRequestHandler) => Unsubscriber; */
}
