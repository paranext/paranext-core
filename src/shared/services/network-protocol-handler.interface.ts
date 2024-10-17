import {
  ConnectionStatus,
  InternalEvent,
  InternalNetworkEventHandler,
  InternalRequestHandler,
  RequestHandler,
} from '@shared/data/internal-connection.model';

/**
 * Interface that defines the network connection functionality the server and the client must
 * implement. Used by NetworkConnectorFactory to supply the right kind of NetworkConnector to
 * ConnectionService
 */
export default interface INetworkProtocolHandler {
  /**
   * Whether this connector is setting up or has finished setting up its connection and is ready to
   * communicate on the network
   */
  connectionStatus: ConnectionStatus;

  /**
   * Sets up the NetworkConnector by populating connector info, setting up event handlers, and doing
   * one of the following:
   *
   * - On Client: connecting to the server.
   * - On Server: opening an endpoint for clients to connect.
   *
   * MUST ALSO RUN notifyClientConnected() WHEN PROMISE RESOLVES
   *
   * @param localRequestHandler Function that handles requests from the connection. Only called when
   *   this connector can handle the request
   * @param requestRouter Function that returns a clientId to which to send the request based on the
   *   requestType. If requestRouter returns this connector's clientId, localRequestHandler is used
   * @param localEventHandler Function that handles events from the server by accepting an eventType
   *   and an event and emitting the event locally
   * @param networkConnectorEventHandlers Functions that run when network connector events occur
   *   like when clients are disconnected
   * @returns Promise that resolves when finished connecting
   */
  connect: (localEventHandler: InternalNetworkEventHandler) => Promise<boolean>;
  /**
   * Disconnects from the connection:
   *
   * - On Client: disconnects from the server
   * - On Server: disconnects from clients and closes its connection endpoint
   */
  disconnect: () => void;
  /**
   * Send a request to the server/a client and resolve after receiving a response
   *
   * @param requestType The type of request
   * @param requestParams Parameters to send in the request
   * @returns Promise that resolves with the response message
   */
  request: RequestHandler;
  /** Register a method that will be called if an RPC request is made */
  registerMethod: (methodName: string, method: InternalRequestHandler) => Promise<boolean>;
  unregisterMethod: (methodName: string) => Promise<boolean>;
  /**
   * Sends an event to other processes. Does NOT run the local event subscriptions as they should be
   * run by NetworkEventEmitter after sending on network.
   *
   * @param eventType Unique network event type for coordinating between processes
   * @param event Event to emit on the network
   */
  emitEventOnNetwork: <T>(eventType: string, event: InternalEvent<T>) => void;
}
