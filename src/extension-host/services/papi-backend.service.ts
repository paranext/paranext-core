/* eslint-disable import/no-duplicates */
/**
 * Unified module for accessing API features in the extension host.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import papiShared from '@shared/services/papi.service';
import extensionStorageService from '@extension-host/services/extension-storage.service';
// If you try to combine these imports, our automatic formatting breaks the single line directives
// If you try to set both of these single line directives for the entire file, only the one on top works
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ExtensionStorageService } from '@extension-host/services/extension-storage.service';

const papi = {
  ...papiShared,
  storage: extensionStorageService,
};
export default papi;
