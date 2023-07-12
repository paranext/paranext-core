/**
 * Unified module for accessing API features in the extension host.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import papiShared from '@shared/services/papi.service';
import extensionStorageService, {
  ExtensionStorageService,
} from '@extension-host/services/extension-storage.service';

// Note: we need to provide type assertions for all members so they carry the JSDoc comments on the
// papi.d.ts file so extension developers see the comments. Please add to all properties you add.
const papi = {
  ...papiShared,
  storage: extensionStorageService as ExtensionStorageService,
};
export default papi;
