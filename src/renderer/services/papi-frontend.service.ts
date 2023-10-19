/**
 * Unified module for accessing API features in the renderer.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import * as commandService from '@shared/services/command.service';
import * as papiUtil from '@shared/utils/papi-util';
import logger from '@shared/services/logger.service';
import { papiNetworkService, PapiNetworkService } from '@shared/services/network.service';
import { papiWebViewService, PapiWebViewService } from '@shared/services/web-view.service';
import internetService, { InternetService } from '@shared/services/internet.service';
import dataProviderService, { DataProviderService } from '@shared/services/data-provider.service';
import { ProjectLookupServiceType } from '@shared/services/project-lookup.service-model';
import projectLookupService from '@shared/services/project-lookup.service';
import {
  papiFrontendProjectDataProviderService,
  PapiFrontendProjectDataProviderService,
} from '@shared/services/project-data-provider.service';
import papiContext, { PapiContext } from '@renderer/context/papi-context';
import papiHooks, { PapiHooks } from '@renderer/hooks/papi-hooks';
import settingsService, { SettingsService } from '@shared/services/settings.service';
import dialogService from '@shared/services/dialog.service';
import { DialogService } from '@shared/services/dialog.service-model';

// IMPORTANT NOTES:
// 1) When adding new services here, consider whether they also belong in papi-backend.service.ts.
// 2) We need to provide type assertions for all members so they carry the JSDoc comments on the
// papi.d.ts file so extension developers see the comments. Please add to all properties you add.
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion */
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
  /** JSDOC DESTINATION dialogService */
  dialogs: dialogService as DialogService,
  /** JSDOC DESTINATION papiNetworkService */
  network: papiNetworkService as PapiNetworkService,
  /** JSDOC DESTINATION logger */
  logger,
  /** JSDOC DESTINATION internetService */
  internet: internetService as InternetService,
  /** JSDOC DESTINATION dataProviderService */
  dataProvider: dataProviderService as DataProviderService,
  /** JSDOC DESTINATION papiFrontendProjectDataProviderService */
  projectDataProvider:
    papiFrontendProjectDataProviderService as PapiFrontendProjectDataProviderService,
  /** JSDOC DESTINATION projectLookupService */
  projectLookup: projectLookupService as ProjectLookupServiceType,
  react: {
    /** JSDOC DESTINATION papiContext */
    context: papiContext as PapiContext,
    /** JSDOC DESTINATION papiHooks */
    hooks: papiHooks as PapiHooks,
  },
  /** JSDOC DESTINATION settingsService */
  settings: settingsService as SettingsService,
};
export default papi;

export type Papi = typeof papi;
