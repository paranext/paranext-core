/* eslint-disable import/no-duplicates */
/**
 * Unified module for accessing API features in the extension host.
 *
 * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
 */

import papiShared from '@shared/services/papi.service';
import extensionStorageService from '@extension-host/services/extension-storage.service';
// Leave the "unused" type import below in place.  It causes Intellisense problems if you remove it.
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ExtensionStorageService } from '@extension-host/services/extension-storage.service';

const papi = {
  ...papiShared,
  storage: extensionStorageService,
};
export default papi;
