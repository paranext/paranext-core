/**
 * Unified module for accessing API features in extensions
 */

import * as CommandService from '@shared/services/CommandService';
import { papiExports } from '@shared/services/NetworkService';
import * as PapiUtil from '@shared/util/PapiUtil';
// We need the WebViewService here to include on the papi, but WebViewService passes papi into WebViews
// eslint-disable-next-line import/no-cycle
import * as WebViewService from '@shared/services/WebViewService';
import papiComponents from '@renderer/components/papi-components/papi-components';
import papiContext from '@renderer/context/papi-context/papi-context';
import papiHooks from '@renderer/hooks/papi-hooks/papi-hooks';
import { EventEmitter } from '@shared/util/Event';

export default {
  // Classes
  EventEmitter,

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
};
