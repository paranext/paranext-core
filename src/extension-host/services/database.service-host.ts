import Sqlite3 from 'better-sqlite3';
import {
  databaseServiceNetworkObjectName,
  IDatabaseService,
  databaseServiceObjectToProxy,
} from '@shared/services/database.service-model';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { newNonce } from '@shared/utils/util';
import { getUriFromExtensionUri } from '@extension-host/services/asset-retrieval.service';
import { getPathFromUri } from '@node/utils/util';
import { networkObjectService } from '@shared/services/network-object.service';

// Need to make sure `bindings` gets loaded before replacing `require` so the excluded package
// `better-sqlite3` can import it on the fly internally
// https://github.com/WiseLibs/better-sqlite3/blob/335ccad4f0d24d4377eed1118bea5daec0b61647/lib/database.js#L48
const tempDb = Sqlite3(':memory:');
tempDb.close();

class DatabaseService implements IDatabaseService {
  #databases: Map<string, Sqlite3.Database> = new Map();

  async openDatabase(extensionFileUri: string, options?: Sqlite3.Options): Promise<string> {
    const db = new Sqlite3(getPathFromUri(getUriFromExtensionUri(extensionFileUri)), options);
    const nonce = newNonce();
    this.#databases.set(nonce, db);
    return nonce;
  }

  async closeDatabase(databaseNonce: string): Promise<void> {
    const db = this.#getDatabase(databaseNonce);

    db.close();
    this.#databases.delete(databaseNonce);
  }

  async attachDatabase(
    databaseNonce: string,
    extensionFileUri: string,
    schemaName: string,
  ): Promise<void> {
    const db = this.#getDatabase(databaseNonce);

    db.prepare(`ATTACH DATABASE ? AS ?`).run(
      getPathFromUri(getUriFromExtensionUri(extensionFileUri)),
      schemaName,
    );
  }

  async detachDatabase(databaseNonce: string, schemaName: string): Promise<void> {
    const db = this.#getDatabase(databaseNonce);

    db.prepare(`DETACH DATABASE ?`).run(schemaName);
  }

  async run(
    databaseNonce: string,
    query: string,
    ...params: unknown[]
  ): Promise<Sqlite3.RunResult> {
    const db = this.#getDatabase(databaseNonce);

    return db.prepare(query).run(...params);
  }

  async select(databaseNonce: string, query: string, ...params: unknown[]): Promise<unknown[]> {
    const db = this.#getDatabase(databaseNonce);

    return db.prepare(query).all(...params);
  }

  async dispose(): Promise<boolean> {
    this.#databases.forEach((db) => db.close());
    this.#databases.clear();
    return true;
  }

  #getDatabase(databaseNonce: string): Sqlite3.Database {
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
