// **********************************************************************************************
// NOTE: The types defined in this file should match what is defined in NetworkConnectorTypes.cs
// **********************************************************************************************

/**
 * Types that are relevant particularly to the implementation of communication on
 * NetworkConnector.ts files Do not use these types outside of ClientNetworkConnector.ts and
 * ServerNetworkConnector.ts
 */

import {
  InternalEvent,
  InternalRequest,
  InternalResponse,
  NetworkConnectorInfo,
} from '@shared/data/internal-connection.model';

/** Port to use for the webSocket */
export const WEBSOCKET_PORT = 8877;

/** Number of attempts a client will make to connect to the WebSocket server before failing */
export const WEBSOCKET_ATTEMPTS_MAX = 5;
/**
 * Time in ms for the client to wait before attempting to connect to the WebSocket server again
 * after a failure
 */
export const WEBSOCKET_ATTEMPTS_WAIT = 1000;

/** WebSocket message type that indicates how to handle it */
export enum MessageType {
  InitClient = 'init-client',
  ClientConnect = 'client-connect',
  Request = 'request',
  Response = 'response',
  Event = 'event',
}

/** Message sent to the client to give it NetworkConnectorInfo */
export type InitClient = {
  type: MessageType.InitClient;
  senderId: number;
  connectorInfo: NetworkConnectorInfo;
  /** Guid unique to this connection. Used to verify important messages like reconnecting */
  clientGuid: string;
};

/** Message responding to the server to let it know this connection is ready to receive messages */
export type ClientConnect = {
  type: MessageType.ClientConnect;
  senderId: number;
  /**
   * ClientGuid for this client the last time it was connected to the server. Used when reconnecting
   * (like if the browser refreshes): if the server has a connection with this clientGuid, it will
   * unregister all requests on that client so the reconnecting client can register its request
   * handlers again.
   */
  reconnectingClientGuid?: string;
};

/** Request to do something and to respond */
export type WebSocketRequest<TParam = unknown> = {
  type: MessageType.Request;
  /** What kind of request this is. Certain command, etc */
  requestType: string;
} & InternalRequest<TParam>;

/** Response to a request */
export type WebSocketResponse<TReturn = unknown> = {
  type: MessageType.Response;
  /** What kind of request this is. Certain command, etc */
  requestType: string;
} & InternalResponse<TReturn>;

/** Event to be sent out throughout all processes */
export type WebSocketEvent<T> = {
  type: MessageType.Event;
  /** What kind of event this is */
  eventType: string;
} & InternalEvent<T>;

/** Messages send by the WebSocket */
export type Message =
  | InitClient
  | ClientConnect
  | WebSocketRequest
  | WebSocketResponse
  | WebSocketEvent<unknown>;
