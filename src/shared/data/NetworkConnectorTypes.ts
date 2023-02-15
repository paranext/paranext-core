/**
 * Types that are relevant particularly to the implementation of communication on NetworkConnector.ts files
 * Do not use these types outside of ClientNetworkConnector.ts and ServerNetworkConnector.ts
 */

import {
  InternalRequest,
  InternalResponse,
  NetworkConnectorInfo,
} from '@shared/data/InternalConnectionTypes';

/** Port to use for the websocket */
export const WEBSOCKET_PORT = 8876;

/** Number of attempts a client will make to connect to the WebSocket server before failing */
export const WEBSOCKET_ATTEMPTS_MAX = 5;
/** Time in ms for the client to wait before attempting to connect to the WebSocket server again after a failure */
export const WEBSOCKET_ATTEMPTS_WAIT = 1000;

/** Websocket message type that indicates how to handle it */
export enum MessageType {
  InitClient = 'init-client',
  ClientConnect = 'client-connect',
  Request = 'request',
  Response = 'response',
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
  /** clientGuid for this client the last time it was connected to the server. Used when reconnecting (like if the browser refreshes):
   * if the server has a connection with this clientGuid, it will unregister all requests on that client so the reconnecting client
   * can register its request handlers again.
   */
  reconnectingClientGuid?: string | null;
};

/** Request to do something and to respond */
export type WebsocketRequest<TParam = unknown> = {
  type: MessageType.Request;
  /** What kind of request this is. Certain command, event, etc */
  requestType: string;
} & InternalRequest<TParam>;

/** Response to a request */
export type WebsocketResponse<TReturn = unknown> = {
  type: MessageType.Response;
  /** What kind of request this is. Certain command, event, etc */
  requestType: string;
} & InternalResponse<TReturn>;

/** Messages send by the WebSocket */
export type Message =
  | InitClient
  | ClientConnect
  | WebsocketRequest
  | WebsocketResponse;
