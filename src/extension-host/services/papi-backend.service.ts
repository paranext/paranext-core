/**
 * Unified module for accessing API features in the extension host.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import * as commandService from '@shared/services/command.service';
import * as papiUtil from '@shared/utils/papi-util';
import logger from '@shared/services/logger.service';
import { papiNetworkService, PapiNetworkService } from '@shared/services/network.service';
import { papiWebViewService, PapiWebViewService } from '@shared/services/web-view.service';
import {
  papiWebViewProviderService,
  PapiWebViewProviderService,
} from '@shared/services/web-view-provider.service';
import internetService, { InternetService } from '@shared/services/internet.service';
import dataProviderService, { DataProviderService } from '@shared/services/data-provider.service';
import extensionStorageService, {
  ExtensionStorageService,
} from '@extension-host/services/extension-storage.service';

// IMPORTANT NOTES:
// 1) When adding new services here, consider whether they also belong in papi-frontend.service.ts.
// 2) We need to provide type assertions for all members so they carry the JSDoc comments on the
// papi.d.ts file so extension developers see the comments. Please add to all properties you add.
// 3) The "JSDOC DESTINATION" comments are there to provide anchors for JSDocs to be copied in.
// Please add to all properties you add.
const papi = {
  // Classes
  /** JSDOC DESTINATION PapiEventEmitter */
  EventEmitter: PapiEventEmitter,

  // Functions
  /** This is just an alias for internet.fetch */
  fetch: internetService.fetch,

  // Services/modules
  /** JSDOC DESTINATION commandService */
  commands: commandService,
  /** JSDOC DESTINATION papiUtil */
  util: papiUtil,
  /** JSDOC DESTINATION papiWebViewService */
  webViews: papiWebViewService as PapiWebViewService,
  /** JSDOC DESTINATION papiWebViewProviderService */
  webViewProviders: papiWebViewProviderService as PapiWebViewProviderService,
  /** JSDOC DESTINATION papiNetworkService */
  network: papiNetworkService as PapiNetworkService,
  /** JSDOC DESTINATION logger */
  logger,
  /** JSDOC DESTINATION internetService */
  internet: internetService as InternetService,
  /** JSDOC DESTINATION dataProviderService */
  dataProvider: dataProviderService as DataProviderService,
  /** JSDOC DESTINATION extensionStorageService */
  storage: extensionStorageService as ExtensionStorageService,
};
export default papi;
