/**
 * Unified module for accessing API features in extensions.
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

// Note: we need to provide type assertions for all members so they carry the JSDoc comments on the
// papi.d.ts file so extension developers see the comments. Please add to all properties you add.
const papi = {
  // Classes
  EventEmitter: PapiEventEmitter,

  // Functions
  fetch: internetService.fetch, // Alias for internet.fetch for easy access

  // Services/modules
  commands: commandService,
  util: papiUtil,
  webViews: papiWebViewService as PapiWebViewService,
  webViewProviders: papiWebViewProviderService as PapiWebViewProviderService,
  network: papiNetworkService as PapiNetworkService,
  logger,
  internet: internetService as InternetService,
  dataProvider: dataProviderService as DataProviderService,
};
export default papi;
