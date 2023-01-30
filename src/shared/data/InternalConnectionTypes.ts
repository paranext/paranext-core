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
