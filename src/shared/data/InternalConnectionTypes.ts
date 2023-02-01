/**
 * Types that are internal to the communication we do through Electron.
 * These types should not need to be used on the renderer outside of preload.ts and ClientConnectionService.ts
 * and they should not need to be used on the server outside of ____
 */

import { ComplexRequest, ComplexResponse } from '@shared/util/PapiUtil';

/** Request to do something and to respond */
export type InternalRequest<TParam = unknown> = {
  /* /** What kind of request this is. Certain command, event, etc * /
  requestType: string; */
  senderId: number;
  requestId: number;
} & ComplexRequest<TParam>;

/** Response to a request */
export type InternalResponse<TReturn = unknown> = {
  /* /** What kind of request this is. Certain command, event, etc * /
  requestType: string; */
  /** The process that originally sent the Request that matches to this response */
  senderId: number;
  requestId: number;
  /** The process that sent this Response */
  responderId: number;
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

/** Represents when the client id has not been assigned by the server */
export const CLIENT_ID_UNASSIGNED = -1;

/** "Client id" for the server */
export const CLIENT_ID_SERVER = 0;

/** Represents when the connector info has not been populated by the server */
export const CONNECTOR_INFO_DISCONNECTED = { clientId: CLIENT_ID_UNASSIGNED };

/** Information about the network connector */
export type NetworkConnectorInfo = {
  clientId: number;
};
