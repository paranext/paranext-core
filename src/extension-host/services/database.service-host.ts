import Sqlite3 from 'better-sqlite3';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { dataProviderService } from '@shared/services/data-provider.service';
import {
  DatabaseDataTypes,
  databaseServiceProviderName,
  IDatabaseService,
  databaseServiceObjectToProxy,
  TableInfo,
  ColumnInfo,
} from '@shared/services/database.service-model';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { newNonce } from '@shared/utils/util';
import { Uri } from '@shared/data/file-system.model';
import { getUriFromExtensionUri } from '@extension-host/services/asset-retrieval.service';
import { getPathFromUri } from '@node/utils/util';

// Need to make sure `bindings` gets loaded before replacing `require` so the excluded package
// `better-sqlite3` can import it on the fly internally
// https://github.com/WiseLibs/better-sqlite3/blob/335ccad4f0d24d4377eed1118bea5daec0b61647/lib/database.js#L48
const tempDb = Sqlite3(':memory:');
tempDb.close();

class DatabaseDataProviderEngine
  extends DataProviderEngine<DatabaseDataTypes>
  implements IDataProviderEngine<DatabaseDataTypes>
{
  #databases: Map<string, Sqlite3.Database> = new Map();

  @dataProviderService.decorators.ignore
  async getAll(databaseNonce: string, query: string, ...params: unknown[]): Promise<unknown[]> {
    const db = this.#getDatabase(databaseNonce);

    return db.prepare(query).all(...params);
  }

  async openDatabase(fileUri: Uri, options?: Sqlite3.Options): Promise<string> {
    const db = new Sqlite3(getPathFromUri(getUriFromExtensionUri(fileUri)), options);
    const nonce = newNonce();
    this.#databases.set(nonce, db);
    return nonce;
  }

  async closeDatabase(databaseNonce: string): Promise<void> {
    const db = this.#getDatabase(databaseNonce);

    db.close();
    this.#databases.delete(databaseNonce);
  }

  async attachDatabase(databaseNonce: string, fileUri: Uri, schemaName: string): Promise<void> {
    const db = this.#getDatabase(databaseNonce);

    db.prepare(`ATTACH DATABASE ? AS ?`).run(
      getPathFromUri(getUriFromExtensionUri(fileUri)),
      schemaName,
    );
  }

  async detachDatabase(databaseNonce: string, name: string): Promise<void> {
    const db = this.#getDatabase(databaseNonce);

    db.prepare(`DETACH DATABASE ?`).run(name);
  }

  async getTables(databaseNonce: string): Promise<TableInfo[]> {
    const db = this.#getDatabase(databaseNonce);

    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
      .all();

    return tables.map((table: unknown) => {
      if (!table || !(typeof table === 'object') || !('name' in table))
        throw new Error(`Invalid table ${JSON.stringify(table)}. This should not happen.`);

      const columns = db
        .prepare(`PRAGMA table_info(${table.name});`)
        .all()
        .map((column: unknown) => {
          if (
            !column ||
            !(typeof column === 'object') ||
            !('name' in column) ||
            !('cid' in column) ||
            !('type' in column) ||
            !('notnull' in column) ||
            !('dflt_value' in column) ||
            !('pk' in column)
          )
            throw new Error(`Invalid column ${JSON.stringify(column)}. This should not happen.`);
          // Just checked it
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          return column as ColumnInfo;
        });

      // Just checked it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return { name: table.name, columns } as TableInfo;
    });
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setTables(): Promise<DataProviderUpdateInstructions<DatabaseDataTypes>> {
    throw new Error('setTables disabled. Use `run` to change the tables.');
  }

  async run(
    databaseNonce: string,
    query: string,
    ...params: unknown[]
  ): Promise<Sqlite3.RunResult> {
    const db = this.#getDatabase(databaseNonce);

    return db.prepare(query).run(...params);
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
let dataProvider: IDatabaseService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await dataProviderService.registerEngine(
            databaseServiceProviderName,
            new DatabaseDataProviderEngine(),
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

// This will be needed later for disposing of the data provider, choosing to ignore instead of
// remove code that will be used later
// @ts-ignore 6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const databaseService = createSyncProxyForAsyncObject<IDatabaseService>(async () => {
  await initialize();
  return dataProvider;
}, databaseServiceObjectToProxy);
