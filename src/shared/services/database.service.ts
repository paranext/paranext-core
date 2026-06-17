import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { networkObjectService } from '@shared/services/network-object.service';
import {
  IDatabaseService,
  databaseServiceObjectToProxy,
  databaseServiceNetworkObjectName,
} from '@shared/services/database.service-model';
import { createCachedInitializer } from '@shared/utils/cached-initializer';

let networkObject: IDatabaseService;
const initialize = createCachedInitializer(async () => {
  const localDatabaseService = await networkObjectService.get<IDatabaseService>(
    databaseServiceNetworkObjectName,
  );
  if (!localDatabaseService)
    throw new Error(`${databaseServiceNetworkObjectName} is not available as a network object`);
  networkObject = localDatabaseService;
});

export const databaseService = createSyncProxyForAsyncObject<IDatabaseService>(async () => {
  await initialize();
  return networkObject;
}, databaseServiceObjectToProxy);

export default databaseService;
