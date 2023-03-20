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

/** Event emitted when client connections are established */
export type ClientConnectEvent = {
  clientId: number;
  didReconnect: boolean;
};

/** Event emitted when client connections are lost */
export type ClientDisconnectEvent = { clientId: number };

/**
 * Functions that run when network connector events occur.
 * These should likely be emit functions from NetworkEventEmitters so the events inform all interested connections
 */
export type NetworkConnectorEventHandlers = {
  /** Handles when a new connection is established */
  didClientConnectHandler?: (event: ClientConnectEvent) => void;
  /** Handles when a client disconnects */
  didClientDisconnectHandler?: (event: ClientDisconnectEvent) => void;
};

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

/** Handler for requests from the server. Used internally between network connector and Connection Service */
export type InternalRequestHandler = <TParam, TReturn>(
  requestType: string,
  request: InternalRequest<TParam>,
) => Promise<InternalResponse<TReturn>>;

/** Handler for requests from the server */
export type RequestHandler = <TParam, TReturn>(
  requestType: string,
  request: ComplexRequest<TParam>,
) => Promise<ComplexResponse<TReturn>>;

/** Function that returns a clientId to which to send the request based on the requestType */
export type RequestRouter = (requestType: string) => number;

/** Event to be sent out throughout all processes */
export type InternalEvent<T> = {
  /** The process that emitted this Event */
  senderId: number;
  /** Contents of the event */
  event: T;
};

/** Handler for events from on the network. Used internally between network connector and Connection Service */
export type InternalNetworkEventHandler = <T>(
  eventType: string,
  incomingEvent: InternalEvent<T>,
) => void;

/** Handler for events from on the network */
export type NetworkEventHandler = <T>(eventType: string, event: T) => void;
