import {
  dataProtectionServiceNetworkObjectName,
  IDataProtectionService,
} from '@shared/models/data-protection.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import { createCachedInitializer } from '@shared/utils/cached-initializer';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';

let networkObject: IDataProtectionService;
const initialize = createCachedInitializer(async () => {
  const localDataProtectionService = await networkObjectService.get<IDataProtectionService>(
    dataProtectionServiceNetworkObjectName,
  );
  if (!localDataProtectionService)
    throw new Error(
      `${dataProtectionServiceNetworkObjectName} is not available as a network object`,
    );
  networkObject = localDataProtectionService;
});

/**
 * JSDOC SOURCE dataProtectionService
 *
 * Provides functions related to encrypting and decrypting strings like user data, secrets, etc.
 *
 * Uses Electron's [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API.
 *
 * Note that these encryption mechanisms are not transferrable between computers. We recommend using
 * them with `papi.storage` methods to store data safely.
 *
 * WARNING: The primary purpose of this service is to enable extensions to encrypt and decrypt data
 * to be stored securely in local files. It is not intended to protect data passed over a network
 * connection. Please note that using this service passes the unencrypted string between local
 * processes using the PAPI WebSocket.
 */
export const dataProtectionService = createSyncProxyForAsyncObject<IDataProtectionService>(
  async () => {
    await initialize();
    return networkObject;
  },
);

export default dataProtectionService;
