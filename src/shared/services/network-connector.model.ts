import {
  ConnectionStatus,
  InternalEvent,
  InternalNetworkEventHandler,
  InternalRequestHandler,
  NetworkConnectorEventHandlers,
  NetworkConnectorInfo,
  RequestRouter,
} from '@shared/data/InternalConnectionTypes';

/**
 * Interface that defines the network connection functionality the server and the client must implement.
 * Used by NetworkConnectorFactory to supply the right kind of NetworkConnector to ConnectionService
 */
export default interface INetworkConnector {
  /** Information about the connector. Populated by the server while connecting */
  connectorInfo: NetworkConnectorInfo;

  /** Whether this connector is setting up or has finished setting up its connection and is ready to communicate on the network */
  connectionStatus: ConnectionStatus;

  /**
   * Sets up the NetworkConnector by populating connector info, setting up event handlers, and doing one of the following:
   * - On Client: connecting to the server.
   * - On Server: opening an endpoint for clients to connect.
   * MUST ALSO RUN notifyClientConnected() WHEN PROMISE RESOLVES
   * @param localRequestHandler function that handles requests from the connection. Only called when this connector can handle the request
   * @param requestRouter function that returns a clientId to which to send the request based on the requestType. If requestRouter returns this connector's clientId, localRequestHandler is used
   * @param localEventHandler function that handles events from the server by accepting an eventType and an event and emitting the event locally
   * @param networkConnectorEventHandlers functions that run when network connector events occur like when clients are disconnected
   * @returns Promise that resolves with connector info when finished connecting
   */
  connect: (
    localRequestHandler: InternalRequestHandler,
    requestRouter: RequestRouter,
    localEventHandler: InternalNetworkEventHandler,
    networkConnectorEventHandlers: NetworkConnectorEventHandlers,
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
   * Sends an event to other processes. Does NOT run the local event subscriptions
   * as they should be run by NetworkEventEmitter after sending on network.
   * @param eventType unique network event type for coordinating between processes
   * @param event event to emit on the network
   */
  emitEventOnNetwork: <T>(eventType: string, event: InternalEvent<T>) => Promise<void>;
}
