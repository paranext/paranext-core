/**
 * Unified module for accessing API features in extensions
 */

import * as CommandService from '@shared/services/CommandService';
import { papiExports } from '@shared/services/NetworkService';
import * as PapiUtil from '@shared/util/PapiUtil';
// We need the WebViewService here to include on the papi, but WebViewService passes papi into WebViews
// eslint-disable-next-line import/no-cycle
import * as WebViewService from '@shared/services/WebViewService';
import { PEventEmitter } from '@shared/util/PEvent';
import logger from '@shared/util/logger';
import { isRenderer } from '@shared/util/InternalUtil';

// TODO: Fix these to use NormalModuleReplacementPlugin or something https://webpack.js.org/plugins/normal-module-replacement-plugin/
const papiComponents = isRenderer()
  ? require('@renderer/components/papi-components/papi-components').default
  : {};
const papiContext = isRenderer()
  ? require('@renderer/context/papi-context/papi-context').default
  : {};
const papiHooks = isRenderer()
  ? require('@renderer/hooks/papi-hooks/papi-hooks').default
  : {};

export default {
  // Classes
  PEventEmitter,

  // Services/modules
  commands: CommandService,
  util: PapiUtil,
  webViews: WebViewService,
  react: {
    components: papiComponents,
    context: papiContext,
    hooks: papiHooks,
  },
  network: papiExports,
  logger,
};
