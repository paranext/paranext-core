import Sqlite3 from 'better-sqlite3';

export const databaseServiceNetworkObjectName = 'DatabaseService';
export const databaseServiceObjectToProxy = Object.freeze({});

/**
 * JSDOC SOURCE databaseService
 *
 * Service that allows to interact with SQLite databases. You can create an instance of a SQLite
 * database using `openDatabase`, and then run queries on it using `run` or `select`. You can also
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
   * WARNING: You must call `closeDatabase` on any database you open with this method. If you do
   * not, you will leak memory, and indeterminate behavior may occur. Read more from [SQLite
   * documentation](https://www.sqlite.org/c3ref/close.html)
   *
   * @param extensionFileUri - The file URL of the SQLite database. This can only be an extension
   *   asset URI like `papi-extension://<extension-name>/assets/<path-to-asset>`.
   * @param options - Options to pass to the `better-sqlite3` Database constructor.
   * @returns A nonce that must be used to access the database with other methods.
   */
  openDatabase(extensionFileUri: string, options?: Sqlite3.Options): Promise<string>;

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
   * Attach a database file to an existing open database instance.
   *
   * Runs the SQLite [`ATTACH DATABASE`](https://sqlite.org/lang_attach.html) command on the
   * database associated with the provided nonce.
   *
   * WARNING: Each database instance can have at most 10 attached databases.
   *
   * @param databaseNonce - The nonce of the database to attach to. You get this nonce from
   *   `openDatabase`.
   * @param extensionFileUri - The file URI of the SQLite database to attach. This can only be an
   *   extension asset URI like `papi-extension://<extension-name>/assets/<path-to-asset>`.
   * @param schemaName - The schema name to associate with the attached database.
   * @returns A promise that resolves when the database is successfully attached.
   */
  attachDatabase(
    databaseNonce: string,
    extensionFileUri: string,
    schemaName: string,
  ): Promise<void>;

  /**
   * Detach a database file from an existing open database instance.
   *
   * Runs the SQLite [`DETACH DATABASE`](https://sqlite.org/lang_detach.html) command on the
   * database associated with the provided nonce.
   *
   * @param databaseNonce - The nonce of the database to detach from. You get this nonce from
   *   `openDatabase`.
   * @param schemaName - The schema name to associate with the attached database.
   * @returns A promise that resolves when the database is successfully detached.
   */
  detachDatabase(databaseNonce: string, schemaName: string): Promise<void>;

  /**
   * Execute a query on a specific database instance and receive some information about changes you
   * made.
   *
   * This method is used for queries that modify the database such as `INSERT`, `UPDATE`, `DELETE`,
   * and some `PRAGMA` queries. For queries that return data like `SELECT`, use `select`.
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
   * Execute a query on a specific database instance and receive all rows returned from the query.
   *
   * This method is used for queries that return data like `SELECT` and some `PRAGMA` queries. For
   * queries that modify the database such as `INSERT`, `UPDATE`, and `DELETE`, use `run`.
   *
   * Note: This method is not only for `SELECT` queries but is for any queries that return data. It
   * is named `select` for ease of association.
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
  select(databaseNonce: string, query: string, ...args: unknown[]): Promise<unknown[]>;
} & typeof databaseServiceObjectToProxy;
