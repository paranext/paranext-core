/**
 * Unified module for accessing API features in the extension host.
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
import {
  papiWebViewProviderService,
  PapiWebViewProviderService,
} from '@shared/services/web-view-provider.service';
import internetService, { InternetService } from '@shared/services/internet.service';
import dataProviderService, {
  DataProviderService,
  DataProviderEngine as PapiDataProviderEngine,
} from '@shared/services/data-provider.service';
import {
  papiBackendProjectDataProviderService,
  PapiBackendProjectDataProviderService,
} from '@shared/services/project-data-provider.service';
import extensionStorageService, {
  ExtensionStorageService,
} from '@extension-host/services/extension-storage.service';
import { ProjectLookupServiceType } from '@shared/services/project-lookup.service-model';
import projectLookupService from '@shared/services/project-lookup.service';
import dialogService from '@shared/services/dialog.service';
import { DialogService } from '@shared/services/dialog.service-model';

// IMPORTANT NOTES:
// 1) When adding new services here, consider whether they also belong in papi-frontend.service.ts.
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
  /** JSDOC DESTINATION DataProviderEngine */
  DataProviderEngine: PapiDataProviderEngine,

  // Functions
  /** This is just an alias for internet.fetch */
  fetch: internetService.fetch,

  // Services/modules
  /** JSDOC DESTINATION commandService */
  commands: commandService,
  /** JSDOC DESTINATION papiUtil */
  utils: papiUtil,
  /** JSDOC DESTINATION papiWebViewService */
  webViews: webViewService as WebViewServiceType,
  /** JSDOC DESTINATION papiWebViewProviderService */
  webViewProviders: papiWebViewProviderService as PapiWebViewProviderService,
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
  /** JSDOC DESTINATION papiBackendProjectDataProviderService */
  projectDataProvider:
    papiBackendProjectDataProviderService as PapiBackendProjectDataProviderService,
  /** JSDOC DESTINATION projectLookupService */
  projectLookup: projectLookupService as ProjectLookupServiceType,
  /** JSDOC DESTINATION extensionStorageService */
  storage: extensionStorageService as ExtensionStorageService,
};
/* eslint-enable */

export default papi;

// This is the destructured export, if you add to the PAPI you need to add to this

/** JSDOC DESTINATION PapiEventEmitter */
export const { EventEmitter } = papi;
/** JSDOC DESTINATION DataProviderEngine */
export const { DataProviderEngine } = papi;
/** This is just an alias for internet.fetch */
export const { fetch } = papi;
/** JSDOC DESTINATION commandService */
export const { commands } = papi;
/** JSDOC DESTINATION papiUtil */
export const { utils } = papi;
/** JSDOC DESTINATION papiWebViewService */
export const { webViews } = papi;
/** JSDOC DESTINATION papiWebViewProviderService */
export const { webViewProviders } = papi;
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
export const { projectDataProvider } = papi;
/** JSDOC DESTINATION projectLookupService */
export const { projectLookup } = papi;
/** JSDOC DESTINATION extensionStorageService */
export const { storage } = papi;
