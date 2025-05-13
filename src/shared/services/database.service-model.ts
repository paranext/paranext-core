import Sqlite3 from 'better-sqlite3';
import {
  DataProviderDataType,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { OnDidDispose } from 'platform-bible-utils';
import { IDataProvider } from '@shared/services/papi-core.service';
import { Uri } from '@shared/data/file-system.model';

/** JSDOC DESTINATION databaseServiceProviderName */
export const databaseServiceProviderName = 'platform.databaseServiceDataProvider';
export const databaseServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE databaseServiceProviderName
   *
   * This name is used to register the database service data provider on the papi. You can use this
   * name to find the data provider when accessing it using the useData hook
   */
  dataProviderName: databaseServiceProviderName,
});

/** Information about a column in a table in a database. This is directly from sqlite3 */
export interface ColumnInfo {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: unknown;
  pk: number;
}

/** Information about a table in a database */
export interface TableInfo {
  name: string;
  columns: ColumnInfo[];
}

// Data Type to initialize data provider engine with
export type DatabaseDataTypes = {
  Tables: DataProviderDataType<string, TableInfo[], never>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [databaseServiceProviderName]: IDatabaseService;
  }
}

/**
 * JSDOC SOURCE databaseService
 *
 * Service that allows to interact with SQLite databases. You can create an instance of a SQLite
 * database using `openDatabase`, and then run queries on it using `run` or `getAll`. You can also
 * attach and detach databases to the current database instance using `attachDatabase` and
 * `detachDatabase`.
 *
 * Make sure to call `closeDatabase` on any database you open with `openDatabase` to avoid memory
 * leaks.
 */
export type IDatabaseService = {
  /**
   * Open a database file into a new database instance. Only those who have the returned `nonce` can
   * access this database, so only share it with those you trust.
   *
   * WARNING: You must call `closeDatabase` on any database you open with this method.
   *
   * @param fileUri - The file URL of the SQLite database. This can only be an extension asset URI
   *   like `papi-extension://<extension-name>/assets/<path-to-asset>`.
   * @param options - Options to pass to the `better-sqlite3` Database constructor.
   * @returns A nonce that must be used to access the database with other methods.
   */
  openDatabase(fileUri: Uri, options?: Sqlite3.Options): Promise<string>;

  /**
   * Close a database instance.
   *
   * WARNING: You must call this method to close any database you open with `openDatabase`.
   *
   * @param databaseNonce - The nonce of the database to close. You get this nonce from
   *   `openDatabase`.
   */
  closeDatabase(databaseNonce: string): Promise<void>;

  /**
   * Attach a database file to an existing open database.
   *
   * Runs the SQLite [`ATTACH DATABASE`](https://sqlite.org/lang_attach.html) command on the
   * database associated with the provided nonce.
   *
   * WARNING: Each database instance can have at most 10 attached databases.
   *
   * @param databaseNonce - The nonce of the database to attach to. You get this nonce from
   *   `openDatabase`.
   * @param fileUri - The file URI of the SQLite database to attach. This can only be an extension
   *   asset URI like `papi-extension://<extension-name>/assets/<path-to-asset>`.
   * @param schemaName - The schema name to associate with the attached database.
   * @returns A promise that resolves when the database is successfully attached.
   */
  attachDatabase(databaseNonce: string, fileUri: Uri, schemaName: string): Promise<void>;

  /**
   * Detach a database file from an existing open database.
   *
   * Runs the SQLite [`DETACH DATABASE`](https://sqlite.org/lang_detach.html) command on the
   * database associated with the provided nonce.
   *
   * @param databaseNonce - The nonce of the database to detach from. You get this nonce from
   *   `openDatabase`.
   * @param name - The name of the attached database to detach.
   * @returns A promise that resolves when the database is successfully detached.
   */
  detachDatabase(databaseNonce: string, name: string): Promise<void>;

  /**
   * Retrieve information about tables in a specific database.
   *
   * @param databaseNonce - The nonce of the database to query. You get this nonce from
   *   `openDatabase`.
   * @returns A promise that resolves to an array of table information objects.
   */
  getTables(databaseNonce: string): Promise<TableInfo[]>;

  /**
   * Execute a query on a specific database.
   *
   * @param databaseNonce - The nonce of the database to query. You get this nonce from
   *   `openDatabase`.
   * @param query - The SQL query to execute.
   * @param args - Optional arguments to pass into the query. See [`better-sqlite3` documentation on
   *   binding
   *   parameters](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#binding-parameters)
   *   for more information
   * @returns A promise that resolves to the result of the query execution.
   */
  run(databaseNonce: string, query: string, ...args: unknown[]): Promise<Sqlite3.RunResult>;

  /**
   * Retrieve all rows from a query on a specific database.
   *
   * @param databaseNonce - The nonce of the database to query. You get this nonce from
   *   `openDatabase`.
   * @param query - The SQL query to execute.
   * @param args - Optional arguments to pass into the query. See [`better-sqlite3` documentation on
   *   binding
   *   parameters](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#binding-parameters)
   *   for more information
   * @returns A promise that resolves to an array of rows retrieved by the query.
   */
  getAll(databaseNonce: string, query: string, ...args: unknown[]): Promise<unknown[]>;

  /**
   * This data cannot be changed this way. Trying to use this setter this will always throw. Use
   * `run` to change the tables.
   */
  setTables(
    databaseNonce: string,
    value: never,
  ): Promise<DataProviderUpdateInstructions<DatabaseDataTypes>>;
} & OnDidDispose &
  typeof databaseServiceObjectToProxy &
  IDataProvider<DatabaseDataTypes>;
