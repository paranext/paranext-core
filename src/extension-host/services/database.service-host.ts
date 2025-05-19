import { AsyncDatabase } from 'promised-sqlite3';
import { OPEN_READWRITE, OPEN_READONLY, OPEN_FULLMUTEX } from 'sqlite3';
import {
  databaseServiceNetworkObjectName,
  IDatabaseService,
  databaseServiceObjectToProxy,
  RunResult,
  OpenDatabaseOptions,
} from '@shared/services/database.service-model';
import { createSyncProxyForAsyncObject, startsWith } from 'platform-bible-utils';
import { newNonce } from '@shared/utils/util';
import { getUriFromExtensionUri } from '@extension-host/services/asset-retrieval.service';
import { getPathFromUri } from '@node/utils/util';
import { networkObjectService } from '@shared/services/network-object.service';
import { EXTENSION_ASSET_PROTOCOL_NAME } from '@shared/utils/extension-asset.utils';

// FYI sqlite3 5.1.7 has a bug that prevents building properly in some cases:
// https://github.com/TryGhost/node-sqlite3/issues/1748#issuecomment-1880671655
// As such, we are fixed to 5.1.6 for now as of 19 May 2025.

class DatabaseService implements IDatabaseService {
  #databases: Map<string, AsyncDatabase> = new Map();

  async openDatabase(
    extensionFileUri: string,
    { readOnly, fullMutex }: OpenDatabaseOptions = {},
  ): Promise<string> {
    const databasePath = getPathFromUri(getUriFromExtensionUri(extensionFileUri));

    let mode =
      // Extension asset files are always read-only
      !readOnly && !startsWith(extensionFileUri, EXTENSION_ASSET_PROTOCOL_NAME)
        ? OPEN_READWRITE
        : OPEN_READONLY;

    // The mode passed into the database is bitwise, so we must use it
    // eslint-disable-next-line no-bitwise
    if (fullMutex) mode |= OPEN_FULLMUTEX;

    const db = await AsyncDatabase.open(databasePath, mode);
    const nonce = newNonce();
    this.#databases.set(nonce, db);
    return nonce;
  }

  async closeDatabase(databaseNonce: string): Promise<void> {
    const db = this.#getDatabase(databaseNonce);

    await db.close();
    this.#databases.delete(databaseNonce);
  }

  async attachDatabase(
    databaseNonce: string,
    extensionFileUri: string,
    schemaName: string,
  ): Promise<void> {
    const db = this.#getDatabase(databaseNonce);

    await db.run(
      `ATTACH DATABASE ? AS ?`,
      getPathFromUri(getUriFromExtensionUri(extensionFileUri)),
      schemaName,
    );
  }

  async detachDatabase(databaseNonce: string, schemaName: string): Promise<void> {
    const db = this.#getDatabase(databaseNonce);

    await db.run(`DETACH DATABASE ?`, schemaName);
  }

  async run(databaseNonce: string, query: string, ...args: unknown[]): Promise<RunResult> {
    const db = this.#getDatabase(databaseNonce);

    const { changes, lastID } = await db.run(query, ...args);

    // SQLite returns a `Statement` object with these extra properties, but we just want the result
    // info
    return {
      changes,
      lastId: lastID,
    };
  }

  async select(databaseNonce: string, query: string, ...args: unknown[]): Promise<unknown[]> {
    const db = this.#getDatabase(databaseNonce);

    return db.all(query, ...args);
  }

  async dispose(): Promise<boolean> {
    await Promise.all([...this.#databases.values()].map((db) => db.close()));
    this.#databases.clear();
    return true;
  }

  #getDatabase(databaseNonce: string): AsyncDatabase {
    const db = this.#databases.get(databaseNonce);
    if (!db) {
      throw new Error(`Database with nonce "${databaseNonce}" is not open.`);
    }
    return db;
  }
}

let initializationPromise: Promise<void>;
let databaseServiceNetworkObject: IDatabaseService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          databaseServiceNetworkObject = await networkObjectService.set<IDatabaseService>(
            databaseServiceNetworkObjectName,
            new DatabaseService(),
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

// This will be needed later for disposing of the network object, choosing to ignore instead of
// remove code that will be used later
// @ts-ignore 6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const databaseService = createSyncProxyForAsyncObject<IDatabaseService>(async () => {
  await initialize();
  return databaseServiceNetworkObject;
}, databaseServiceObjectToProxy);
