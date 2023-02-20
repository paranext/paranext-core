/**
 * Unified module for accessing API features in extensions
 */

import * as CommandService from '@shared/services/CommandService';
import * as PapiUtil from '@shared/util/PapiUtil';

export default { commands: CommandService, util: PapiUtil };
