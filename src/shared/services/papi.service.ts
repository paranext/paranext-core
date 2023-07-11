/**
 * Unified module for accessing API features in extensions.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import * as commandService from '@shared/services/command.service';
import * as papiUtil from '@shared/utils/papi-util';
import logger from '@shared/services/logger.service';
import { papiNetworkService } from '@shared/services/network.service';
import { papiWebViewService } from '@shared/services/web-view.service';
import { papiWebViewProviderService } from '@shared/services/web-view-provider.service';
import internetService from '@shared/services/internet.service';
import dataProviderService from '@shared/services/data-provider.service';

const papi = {
  // Classes
  EventEmitter: PapiEventEmitter,

  // Functions
  fetch: internetService.fetch, // Alias for internet.fetch for easy access

  // Services/modules
  commands: commandService,
  util: papiUtil,
  webViews: papiWebViewService,
  webViewProviders: papiWebViewProviderService,
  network: papiNetworkService,
  logger,
  internet: internetService,
  dataProvider: dataProviderService,
};
export default papi;
