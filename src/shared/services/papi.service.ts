/**
 * Unified module for accessing API features in extensions.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import * as commandService from '@shared/services/command.service';
import { papiNetworkService } from '@shared/services/network.service';
import * as papiUtil from '@shared/utils/papi-util';
// We need the WebViewService here to include on the papi, but WebViewService passes papi into WebViews
// eslint-disable-next-line import/no-cycle
import * as webViewService from '@shared/services/web-view.service';
import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import logger from '@shared/services/logger.service';
import { isExtensionHost, isRenderer } from '@shared/utils/internal-util';
import internetService from '@shared/services/internet.service';
import dataProviderService from '@shared/services/data-provider.service';
import type { ExtensionStorageService } from '@extension-host/services/extension-storage.service';
import type { PapiComponents } from 'papi-components';
import type { PapiContext } from '@renderer/context/papi-context';
import type { PapiHooks } from '@renderer/hooks/papi-hooks';

// TODO: Fix these to use NormalModuleReplacementPlugin or something https://webpack.js.org/plugins/normal-module-replacement-plugin/
const extensionStorageService: ExtensionStorageService = isExtensionHost()
  ? require('@extension-host/services/extension-storage.service').default
  : {};
const papiComponents: PapiComponents = isRenderer()
  ? require('papi-components').papiComponents
  : {};
const papiContext: PapiContext = isRenderer()
  ? require('@renderer/context/papi-context').default
  : {};
const papiHooks: PapiHooks = isRenderer() ? require('@renderer/hooks/papi-hooks').default : {};

const papi = {
  // Classes
  EventEmitter: PapiEventEmitter,

  // Functions
  fetch: internetService.fetch, // Alias for internet.fetch for easy access

  // Services/modules
  commands: commandService,
  util: papiUtil,
  webViews: webViewService,
  react: {
    components: papiComponents,
    context: papiContext,
    hooks: papiHooks,
  },
  network: papiNetworkService,
  logger,
  internet: internetService,
  dataProvider: dataProviderService,
  storage: extensionStorageService,
};
export default papi;
