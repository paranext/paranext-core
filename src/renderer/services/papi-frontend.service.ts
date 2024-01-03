/**
 * Unified module for accessing API features in the renderer.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import * as commandService from '@shared/services/command.service';
import * as papiUtil from '@shared/utils/papi-util';
import papiLogger from '@shared/services/logger.service';
import { papiNetworkService, PapiNetworkService } from '@shared/services/network.service';
import { WebViewServiceType } from '@shared/services/web-view.service-model';
import webViewService from '@shared/services/web-view.service';
import internetService, { InternetService } from '@shared/services/internet.service';
import dataProviderService, { DataProviderService } from '@shared/services/data-provider.service';
import { ProjectLookupServiceType } from '@shared/services/project-lookup.service-model';
import projectLookupService from '@shared/services/project-lookup.service';
import {
  papiFrontendProjectDataProviderService,
  PapiFrontendProjectDataProviderService,
} from '@shared/services/project-data-provider.service';
import settingsService, { SettingsService } from '@shared/services/settings.service';
import dialogService from '@shared/services/dialog.service';
import { DialogService } from '@shared/services/dialog.service-model';
import * as papiReact from '@renderer/services/papi-frontend-react.service';
import PapiRendererWebSocket from '@renderer/services/renderer-web-socket.service';
import PapiRendererXMLHttpRequest from './renderer-xml-http-request.service';

// IMPORTANT NOTES:
// 1) When adding new services here, consider whether they also belong in papi-backend.service.ts.
// 2) We need to provide type assertions for all members so they carry the JSDoc comments on the
// papi.d.ts file so extension developers see the comments. Please add to all properties you add.
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion */
// 3) The "JSDOC DESTINATION" comments are there to provide anchors for JSDocs to be copied in.
// Please add to all properties you add.
// 4) Anytime you add anything to PAPI also add it to the destructured export below
const papi = {
  // Classes
  /** JSDOC DESTINATION PapiEventEmitter */
  EventEmitter: PapiEventEmitter,

  // Functions
  /** This is just an alias for internet.fetch */
  fetch: internetService.fetch,

  // Classes
  /** JSDOC DESTINATION PapiRendererWebSocket */
  WebSocket: PapiRendererWebSocket,
  /** JSDOC DESTINATION PapiRendererXMLHttpRequest */
  XMLHttpRequest: PapiRendererXMLHttpRequest,

  // Services/modules
  /** JSDOC DESTINATION commandService */
  commands: commandService,
  /** JSDOC DESTINATION papiUtil */
  utils: papiUtil,
  /** JSDOC DESTINATION papiWebViewService */
  webViews: webViewService as WebViewServiceType,
  /** JSDOC DESTINATION dialogService */
  dialogs: dialogService as DialogService,
  /** JSDOC DESTINATION papiNetworkService */
  network: papiNetworkService as PapiNetworkService,
  /** JSDOC DESTINATION logger */
  logger: papiLogger,
  /** JSDOC DESTINATION internetService */
  internet: internetService as InternetService,
  /** JSDOC DESTINATION dataProviderService */
  dataProviders: dataProviderService as DataProviderService,
  /** JSDOC DESTINATION papiFrontendProjectDataProviderService */
  projectDataProviders:
    papiFrontendProjectDataProviderService as PapiFrontendProjectDataProviderService,
  /** JSDOC DESTINATION projectLookupService */
  projectLookup: projectLookupService as ProjectLookupServiceType,
  /**
   * JSDOC SOURCE papiReact
   *
   * React hooks that enable interacting with the `papi` in React components more easily.
   */
  react: papiReact,
  /** JSDOC DESTINATION settingsService */
  settings: settingsService as SettingsService,
};
/* eslint-enable */

export default papi;

// If you add to the PAPI you need to add to this

/** JSDOC DESTINATION PapiEventEmitter */
export const { EventEmitter } = papi;
/** This is just an alias for internet.fetch */
export const { fetch } = papi;
/** JSDOC DESTINATION PapiRendererWebSocket */
export const { WebSocket } = papi;
/** JSDOC DESTINATION PapiRendererXMLHttpRequest */
export const { XMLHttpRequest } = papi;
/** JSDOC DESTINATION commandService */
export const { commands } = papi;
/** JSDOC DESTINATION papiUtil */
export const { utils } = papi;
/** JSDOC DESTINATION papiWebViewService */
export const { webViews } = papi;
/** JSDOC DESTINATION dialogService */
export const { dialogs } = papi;
/** JSDOC DESTINATION papiNetworkService */
export const { network } = papi;
/** JSDOC DESTINATION logger */
export const { logger } = papi;
/** JSDOC DESTINATION internetService */
export const { internet } = papi;
/** JSDOC DESTINATION dataProviderService */
export const { dataProviders } = papi;
/** JSDOC DESTINATION papiBackendProjectDataProviderService */
export const { projectDataProviders } = papi;
/** JSDOC DESTINATION projectLookupService */
export const { projectLookup } = papi;
/** JSDOC DESTINATION papiReact */
export const { react } = papi;
/** JSDOC DESTINATION settingsService */
export const { settings } = papi;

export type Papi = typeof papi;
