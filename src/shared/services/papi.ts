/**
 * Unified module for accessing API features in extensions
 */

import * as CommandService from '@shared/services/CommandService';
import * as PapiUtil from '@shared/util/PapiUtil';
// We need the WebViewService here to include on the papi, but WebViewService passes papi into WebViews
// eslint-disable-next-line import/no-cycle
import * as WebViewService from '@shared/services/WebViewService';

export default {
  commands: CommandService,
  util: PapiUtil,
  webViews: WebViewService,
};
