/**
 * Types that are internal to the communication we do through WebSocket. These types should not need
 * to be used outside of NetworkConnectors and ConnectionService.ts
 */

import { SerializedRequestType } from '@shared/utils/util';
import {
  JSONRPC,
  JSONRPCErrorCode,
  JSONRPCErrorResponse,
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCSuccessResponse,
} from 'json-rpc-2.0';

/** Prefix on requests that indicates that the request is a command */
export const CATEGORY_COMMAND = 'command';

/**
 * Whether this connector is setting up or has finished setting up its connection and is ready to
 * communicate on the network
 */
export enum ConnectionStatus {
  /** This connector is not connected to the network */
  Disconnected,
  /** This connector is attempting to connect to the network and retrieve connectorInfo */
  Connecting,
  /** This connector has finished setting up its connection - has connectorInfo and such */
  Connected,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestParams = Array<any>;

export type CallerData = {
  origin: string;
};

export type RequestHandler = (
  requestType: SerializedRequestType,
  requestParams: RequestParams,
  callerData?: CallerData,
) => Promise<JSONRPCResponse>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InternalRequestHandler = (...params: any[]) => any;

/** Event to be sent out throughout all processes */
export type InternalEvent<T> = {
  /** Contents of the event */
  event: T;
};

/** Handler for events coming from on the network */
export type InternalNetworkEventHandler = <T>(
  eventType: string,
  incomingEvent: InternalEvent<T>,
) => void;

/** Handler for events from on the network */
export type NetworkEventHandler = <T>(eventType: string, event: T) => void;

export function createRequest(
  requestId: number | string,
  requestType: SerializedRequestType,
  requestParams: RequestParams,
): JSONRPCRequest {
  return { jsonrpc: JSONRPC, id: requestId, method: requestType, params: requestParams };
}

export function createSuccessResponse<T>(
  requestId: number | string,
  contents: T,
): JSONRPCSuccessResponse {
  return { jsonrpc: JSONRPC, id: requestId, result: contents };
}

export function createErrorResponse(
  requestId: number | string,
  errorMessage: string,
  errorCode: JSONRPCErrorCode = JSONRPCErrorCode.InternalError,
): JSONRPCErrorResponse {
  return { id: requestId, jsonrpc: JSONRPC, error: { code: errorCode, message: errorMessage } };
}

export const REGISTER_METHOD = 'network:registerMethod';
export const UNREGISTER_METHOD = 'network:unregisterMethod';
export const GET_METHODS = 'network:getMethods';
