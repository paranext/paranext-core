/**
 * Unified module for accessing API features in the renderer.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import * as papiReact from '@renderer/services/papi-frontend-react.service';
import { PapiRendererWebSocket } from '@renderer/services/renderer-web-socket.service';
import { INotificationService } from '@shared/models/notification.service-model';
import { ProjectLookupServiceType } from '@shared/models/project-lookup.service-model';
import { appService } from '@shared/services/app.service';
import * as commandService from '@shared/services/command.service';
import { dataProviderService, DataProviderService } from '@shared/services/data-provider.service';
import { dialogService } from '@shared/services/dialog.service';
import { DialogService } from '@shared/services/dialog.service-model';
import { internetService, InternetService } from '@shared/services/internet.service';
import { localizationService } from '@shared/services/localization.service';
import { ILocalizationService } from '@shared/services/localization.service-model';
import papiLogger from '@shared/services/logger.service';
import { menuDataService } from '@shared/services/menu-data.service';
import { IMenuDataService } from '@shared/services/menu-data.service-model';
import { papiNetworkService, PapiNetworkService } from '@shared/services/network.service';
import { notificationService } from '@shared/services/notification.service';
import {
  papiFrontendProjectDataProviderService,
  PapiFrontendProjectDataProviderService,
} from '@shared/services/project-data-provider.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { scrollGroupService } from '@shared/services/scroll-group.service';
import { IScrollGroupService } from '@shared/services/scroll-group.service-model';
import { settingsService } from '@shared/services/settings.service';
import { ISettingsService } from '@shared/services/settings.service-model';
import { windowService } from '@shared/services/window.service';
import { IWindowService } from '@shared/services/window.service-model';
import { localThemeService } from '@renderer/services/theme.service-host';
import { IThemeServiceLocal } from '@shared/services/theme.service-model';
import { webViewService } from '@shared/services/web-view.service';
import { WebViewServiceType } from '@shared/services/web-view.service-model';
import { PapiRendererXMLHttpRequest } from '@renderer/services/renderer-xml-http-request.service';
import {
  FrontendNetworkObjectService,
  frontendNetworkObjectService,
} from '@shared/services/network-object.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { NetworkObjectStatusServiceType } from '@shared/models/network-object-status.service-model';

// IMPORTANT NOTES:
// 1) When adding new services here, consider whether they also belong in papi-backend.service.ts.
// 2) We need to provide type assertions for all members so they carry the JSDoc comments on the
// papi.d.ts file so extension developers see the comments. Please add to all properties you add.
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion */
// 3) The "JSDOC DESTINATION" comments are there to provide anchors for JSDocs to be copied in.
// Please add to all properties you add.
// 4) Anytime you add anything to PAPI also add it to the destructured export below
const papi = {
  // Functions
  /** This is just an alias for internet.fetch */
  fetch: internetService.fetch,

  // Classes
  /** JSDOC DESTINATION PapiRendererWebSocket */
  WebSocket: PapiRendererWebSocket,
  /** JSDOC DESTINATION PapiRendererXMLHttpRequest */
  XMLHttpRequest: PapiRendererXMLHttpRequest,

  // Services/modules
  /** JSDOC DESTINATION appService */
  app: appService,
  /** JSDOC DESTINATION commandService */
  commands: commandService,
  /** JSDOC DESTINATION papiWebViewService */
  webViews: webViewService as WebViewServiceType,
  /** JSDOC DESTINATION dialogService */
  dialogs: dialogService as DialogService,
  /** JSDOC DESTINATION papiNetworkService */
  network: papiNetworkService as PapiNetworkService,
  /** JSDOC DESTINATION networkObjectService */
  networkObjects: frontendNetworkObjectService as FrontendNetworkObjectService,
  /** JSDOC DESTINATION networkObjectStatusService */
  networkObjectStatus: networkObjectStatusService as NetworkObjectStatusServiceType,
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
  settings: settingsService as ISettingsService,
  /** JSDOC DESTINATION themeService */
  themes: localThemeService as IThemeServiceLocal,
  /** JSDOC DESTINATION menuDataService */
  menuData: menuDataService as IMenuDataService,
  /** JSDOC DESTINATION scrollGroupService */
  scrollGroups: scrollGroupService as IScrollGroupService,
  /** JSDOC DESTINATION localizationDataService */
  localization: localizationService as ILocalizationService,
  /** JSDOC DESTINATION notificationService */
  notifications: notificationService as INotificationService,
  /** JSDOC DESTINATION windowService */
  window: windowService as IWindowService,
};
/* eslint-enable */

// The PAPI object should not change at this point
Object.freeze(papi);

export default papi;

// If you add to the PAPI you need to add to this

/** This is just an alias for internet.fetch */
export const { fetch } = papi;
Object.freeze(papi.fetch);
/** JSDOC DESTINATION PapiRendererWebSocket */
export const { WebSocket } = papi;
Object.freeze(papi.WebSocket);
/** JSDOC DESTINATION PapiRendererXMLHttpRequest */
export const { XMLHttpRequest } = papi;
Object.freeze(papi.XMLHttpRequest);
/** JSDOC DESTINATION appService */
export const { app } = papi;
Object.freeze(papi.app);
/** JSDOC DESTINATION commandService */
export const { commands } = papi;
Object.freeze(papi.commands);
/** JSDOC DESTINATION papiWebViewService */
export const { webViews } = papi;
Object.freeze(papi.webViews);
/** JSDOC DESTINATION dialogService */
export const { dialogs } = papi;
Object.freeze(papi.dialogs);
/** JSDOC DESTINATION papiNetworkService */
export const { network } = papi;
Object.freeze(papi.network);
/** JSDOC DESTINATION networkObjectService */
export const { networkObjects } = papi;
Object.freeze(papi.networkObjects);
/** JSDOC DESTINATION networkObjectStatusService */
export const { networkObjectStatus } = papi;
Object.freeze(papi.networkObjectStatus);
/** JSDOC DESTINATION logger */
export const { logger } = papi;
Object.freeze(papi.logger);
/** JSDOC DESTINATION internetService */
export const { internet } = papi;
Object.freeze(papi.internet);
/** JSDOC DESTINATION dataProviderService */
export const { dataProviders } = papi;
Object.freeze(papi.dataProviders);
/** JSDOC DESTINATION papiBackendProjectDataProviderService */
export const { projectDataProviders } = papi;
Object.freeze(papi.projectDataProviders);
/** JSDOC DESTINATION projectLookupService */
export const { projectLookup } = papi;
Object.freeze(papi.projectLookup);
/** JSDOC DESTINATION papiReact */
export const { react } = papi;
Object.freeze(papi.react);
/** JSDOC DESTINATION settingsService */
export const { settings } = papi;
Object.freeze(papi.settings);
/** JSDOC DESTINATION themeService */
export const { themes } = papi;
Object.freeze(papi.themes);
/** JSDOC DESTINATION menuDataService */
export const { menuData } = papi;
Object.freeze(papi.menuData);
/** JSDOC DESTINATION scrollGroupService */
export const { scrollGroups } = papi;
Object.freeze(papi.scrollGroups);
/** JSDOC DESTINATION localizationDataService */
export const { localization } = papi;
Object.freeze(papi.localization);
/** JSDOC DESTINATION notificationService */
export const { notifications } = papi;
Object.freeze(papi.notifications);
/** JSDOC DESTINATION windowService */
export const { window } = papi;
Object.freeze(papi.window);

export type Papi = typeof papi;
