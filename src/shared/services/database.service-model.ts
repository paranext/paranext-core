export const databaseServiceNetworkObjectName = 'DatabaseService';
export const databaseServiceObjectToProxy = Object.freeze({});

/**
 * Options for opening a SQLite database connection. These options are passed to the SQLite `open`
 * method.
 *
 * See more information about these options in [the SQLite
 * documentation](https://www.sqlite.org/c3ref/open.html)
 */
export interface OpenDatabaseOptions {
  /**
   * Whether the database connection should be read-only and prevent writing. Defaults to `false`
   * for non-extension asset files. However, extension asset files are always read-only and cannot
   * be edited.
   */
  readOnly?: boolean;
  /**
   * Whether the database should only allow one database connection to access it at one time.
   * Defaults to `false`.
   *
   * See more information about this option in [the SQLite
   * documentation](https://www.sqlite.org/c3ref/open.html)
   */
  fullMutex?: boolean;
}

/**
 * Information about the result of a query execution. This is the result of a query that modifies
 * the database such as `INSERT`, `UPDATE`, `DELETE`, and some `PRAGMA` queries.
 */
export interface RunResult {
  /** The last row id that was inserted by the query. This is only available for `INSERT` queries. */
  lastId: number;
  /**
   * The number of rows that were changed or deleted by `UPDATE` or `DELETE` queries. This does not
   * include inserted rows
   */
  changes: number;
}

/**
 * JSDOC SOURCE databaseService
 *
 * Service that allows to interact with SQLite databases. You can create an instance of a SQLite
 * database connection using `openDatabase`, and then run queries on it using `run` or `select`. You
 * can also attach and detach databases to the current database connection instance using
 * `attachDatabase` and `detachDatabase`.
 *
 * [A database connection](https://www.sqlite.org/c3ref/open.html) is an instance of sqlite3 pointed
 * to a database file. There may be multiple instances of database connections pointing to the same
 * file, and one instance of a database connection may have additional database files attached to
 * it.
 *
 * Make sure to call `closeDatabase` on any database connection you open with `openDatabase` to
 * avoid memory leaks.
 */
export type IDatabaseService = {
  /**
   * Open a database file into a new database connection instance. Only those who have the returned
   * `nonce` can access this database connection, so only share it with those you trust.
   *
   * WARNING: You must call `closeDatabase` on any database you open with this method. If you do
   * not, you will leak memory, and indeterminate behavior may occur. Read more from [SQLite
   * documentation](https://www.sqlite.org/c3ref/close.html)
   *
   * @param extensionFileUri - The file URL of the SQLite database. This can only be an extension
   *   asset URI like `papi-extension://<extension-name>/assets/<path-to-asset>`.
   * @param options - Options for opening the database
   * @returns A nonce that must be used to access this newly opened database connection with other
   *   methods.
   */
  openDatabase(extensionFileUri: string, options?: OpenDatabaseOptions): Promise<string>;

  /**
   * Close an instance of a database connection.
   *
   * WARNING: You must call this method to close every instance of a database connection you open
   * with `openDatabase`.
   *
   * @param databaseNonce - The nonce of the database connection to close. You get this nonce from
   *   `openDatabase`.
   */
  closeDatabase(databaseNonce: string): Promise<void>;

  /**
   * Attach a database file to an existing open database connection instance.
   *
   * Runs the SQLite [`ATTACH DATABASE`](https://sqlite.org/lang_attach.html) command on the
   * database connection associated with the provided nonce.
   *
   * WARNING: Each database connection instance can have at most 10 attached databases.
   *
   * @param databaseNonce - The nonce of the database connection to attach to. You get this nonce
   *   from `openDatabase`.
   * @param extensionFileUri - The file URI of the SQLite database to attach. This can only be an
   *   extension asset URI like `papi-extension://<extension-name>/assets/<path-to-asset>`.
   * @param schemaName - The schema name to associate with the attached database.
   * @returns A promise that resolves when the database file is successfully attached.
   */
  attachDatabase(
    databaseNonce: string,
    extensionFileUri: string,
    schemaName: string,
  ): Promise<void>;

  /**
   * Detach a database file from an existing open database connection instance.
   *
   * Runs the SQLite [`DETACH DATABASE`](https://sqlite.org/lang_detach.html) command on the
   * database associated with the provided nonce.
   *
   * @param databaseNonce - The nonce of the database connection to detach from. You get this nonce
   *   from `openDatabase`.
   * @param schemaName - The schema name to associate with the attached database.
   * @returns A promise that resolves when the database file is successfully detached.
   */
  detachDatabase(databaseNonce: string, schemaName: string): Promise<void>;

  /**
   * Execute a query on a specific database connection instance and receive some information about
   * changes you made.
   *
   * This method is used for queries that modify the database such as `INSERT`, `UPDATE`, `DELETE`,
   * and some `PRAGMA` queries. For queries that return data like `SELECT`, use `select`.
   *
   * @param databaseNonce - The nonce of the database connection to query. You get this nonce from
   *   `openDatabase`.
   * @param query - The SQL query to execute.
   * @param args - Optional arguments to pass into the query. You can use `?` in the query and
   *   specify arguments to replace those `?`s in order, or you can use named parameters like `$id`
   *   and pass in an object whose keys match the named parameters and whose values are the argument
   *   values you would like to pass into the parameters. Parameters are not allowed to be used for
   *   table or column names. See [`sqlite3`'s documentation on
   *   `run`](https://github.com/TryGhost/node-sqlite3/wiki/API#runsql--param---callback) for more
   *   information about various ways to pass in arguments.
   * @returns A promise that resolves to the result of the query execution.
   */
  run(databaseNonce: string, query: string, ...args: unknown[]): Promise<RunResult>;

  /**
   * Execute a query on a specific database connection instance and receive all rows returned from
   * the query.
   *
   * This method is used for queries that return data like `SELECT` and some `PRAGMA` queries. For
   * queries that modify the database such as `INSERT`, `UPDATE`, and `DELETE`, use `run`.
   *
   * Note: This method is not only for `SELECT` queries but is for any queries that return data. It
   * is named `select` for ease of association.
   *
   * @param databaseNonce - The nonce of the database connection to query. You get this nonce from
   *   `openDatabase`.
   * @param query - The SQL query to execute.
   * @param args - Optional arguments to pass into the query. You can use `?` in the query and
   *   specify arguments to replace those `?`s in order, or you can use named parameters like `$id`
   *   and pass in an object whose keys match the named parameters and whose values are the argument
   *   values you would like to pass into the parameters. Parameters are not allowed to be used for
   *   table or column names. See [`sqlite3`'s documentation on
   *   `run`](https://github.com/TryGhost/node-sqlite3/wiki/API#runsql--param---callback) for more
   *   information about various ways to pass in arguments.
   * @returns A promise that resolves to an array of rows retrieved by the query.
   */
  select(databaseNonce: string, query: string, ...args: unknown[]): Promise<unknown[]>;
} & typeof databaseServiceObjectToProxy;
