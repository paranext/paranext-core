// **********************************************************************************************
// NOTE: The types defined in this file should match what is defined in NetworkConnectorTypes.cs
// **********************************************************************************************

/**
 * Types that are relevant particularly to the implementation of communication on NetworkConnector.ts files
 * Do not use these types outside of ClientNetworkConnector.ts and ServerNetworkConnector.ts
 */

import {
  InternalRequest,
  InternalResponse,
  NetworkConnectorInfo,
} from '@shared/data/InternalConnectionTypes';

/** Websocket message type that indicates how to handle it */
export enum MessageType {
  InitClient = 'initClient',
  ClientConnect = 'clientConnect',
  Request = 'request',
  Response = 'response',
}

/** Message sent to the client to give it NetworkConnectorInfo */
export type InitClient = {
  type: MessageType.InitClient;
  senderId: number;
  connectorInfo: NetworkConnectorInfo;
};

/** Message responding to the server to let it know this connection is ready to receive messages */
export type ClientConnect = {
  type: MessageType.ClientConnect;
  senderId: number;
  connectorInfo: NetworkConnectorInfo;
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
