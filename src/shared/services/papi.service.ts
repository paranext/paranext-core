/**
 * Unified module for accessing API features in extensions.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import * as commandService from '@shared/services/command.service';
import * as papiUtil from '@shared/utils/papi-util';
import logger from '@shared/services/logger.service';
// Leave the "unused" type imports below in place.  It causes Intellisense problems if you remove them.
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { papiNetworkService, PapiNetworkService } from '@shared/services/network.service';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { papiWebViewService, PapiWebViewService } from '@shared/services/web-view.service';
// @ts-ignore
// eslint-disable-next-line import/no-duplicates
import { papiWebViewProviderService } from '@shared/services/web-view-provider.service';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/no-duplicates
import { PapiWebViewProviderService } from '@shared/services/web-view-provider.service';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import internetService, { InternetService } from '@shared/services/internet.service';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dataProviderService, { DataProviderService } from '@shared/services/data-provider.service';

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
