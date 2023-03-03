/**
 * Types that are internal to the communication we do through WebSocket.
 * These types should not need to be used outside of NetworkConnectors and ConnectionService.ts
 */

import { ComplexRequest, ComplexResponse } from '@shared/util/PapiUtil';

/** Represents when the client id has not been assigned by the server */
export const CLIENT_ID_UNASSIGNED = -1;

/** "Client id" for the server */
export const CLIENT_ID_SERVER = 0;

/** Represents when the connector info has not been populated by the server */
export const CONNECTOR_INFO_DISCONNECTED = Object.freeze({
  clientId: CLIENT_ID_UNASSIGNED,
});

/** Information about the network connector */
export type NetworkConnectorInfo = Readonly<{
  clientId: number;
}>;

/** Whether this connector is setting up or has finished setting up its connection and is ready to communicate on the network */
export enum ConnectionStatus {
  /** This connector is not connected to the network */
  Disconnected,
  /** This connector is attempting to connect to the network and retrieve connectorInfo */
  Connecting,
  /** This connector has finished setting up its connection - has connectorInfo and such */
  Connected,
}

/** Request to do something and to respond */
export type InternalRequest<TParam = unknown> = {
  senderId: number;
  requestId: number;
} & ComplexRequest<TParam>;

/** Response to a request */
export type InternalResponse<TReturn = unknown> = {
  /** The process that sent this Response */
  senderId: number;
  requestId: number;
  /** The process that originally sent the Request that matches to this response */
  requesterId: number;
} & ComplexResponse<TReturn>;

/** Handler for requests from the server */
export type InternalRequestHandler = <TParam, TReturn>(
  requestType: string,
  request: InternalRequest<TParam>,
) => Promise<InternalResponse<TReturn>>;

/** Handler for requests from the server */
export type RequestHandler = <TParam, TReturn>(
  requestType: string,
  request: ComplexRequest<TParam>,
) => Promise<ComplexResponse<TReturn>>;

export type InternalEvent<T> = {
  /** The process that emitted this Event */
  senderId: number;
  /** Contents of the event */
  event: T;
};
