/**
 * Unified module for accessing API features in the extension host.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import papiShared from '@shared/services/papi.service';
import extensionStorageService from '@extension-host/services/extension-storage.service';

const papi = {
  ...papiShared,
  storage: extensionStorageService,
};
export default papi;
