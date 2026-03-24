/**
 * Worker thread for SQLite database operations using the built-in node:sqlite module. All
 * operations are synchronous within this thread, keeping the main thread non-blocking.
 *
 * In production this file is compiled by webpack as a separate entry (database.worker.js) and
 * loaded by file path. In development it is loaded as a TypeScript source file via tsx.
 */

import { RunResult, SqlOutputRow, SqlValue } from '@shared/services/database.service-model';
import { DatabaseSync, type SQLInputValue } from 'node:sqlite';
import { parentPort } from 'node:worker_threads';

/**
 * Args mirrors the node:sqlite StatementSync overloads: either positional SqlValues, or a
 * named-parameter object followed by optional positional SqlValues. Any of these may be `undefined`
 * and will be converted to `null` for SQLite binding.
 *
 * This type requires at least one element for compatibility with the overload implementation
 * signature in `database.service-host.ts` (a rest parameter typed as `[] | [T, ...U[]]` breaks
 * overload TS2394 checks). Use `SqlQueryArgsOrEmpty` for the worker message protocol, where zero
 * parameters are valid.
 */
export type SqlQueryArgs = [Record<string, SqlValue | undefined> | SqlValue, ...SqlValue[]];

/**
 * Like {@link SqlQueryArgs} but also allows an empty array, for use in the worker message protocol
 * where a query with no parameters is valid.
 */
export type SqlQueryArgsOrEmpty = SqlQueryArgs | [];

/**
 * Maps each worker message type to its parameters (excluding `id` and `type`, which are added by
 * the sender) and its result type.
 */
export interface WorkerMessageTypes {
  open: { parameters: { nonce: string; path: string; readOnly: boolean }; result: void };
  close: { parameters: { nonce: string }; result: void };
  attach: { parameters: { nonce: string; path: string; schemaName: string }; result: void };
  detach: { parameters: { nonce: string; schemaName: string }; result: void };
  run: {
    parameters: { nonce: string; query: string; args: SqlQueryArgsOrEmpty };
    result: RunResult;
  };
  select: {
    parameters: { nonce: string; query: string; args: SqlQueryArgsOrEmpty };
    result: SqlOutputRow[];
  };
  dispose: { parameters: Record<string, never>; result: void };
}

/**
 * Discriminated union type for all possible messages the worker can receive from the host. Each
 * message has an `id` for request-response correlation, a `type` discriminant, and type-safe
 * parameters determined by the `WorkerMessageTypes` mapping. This ensures each message handler
 * receives exactly the parameters its operation requires.
 */
type WorkerMessage = {
  [K in keyof WorkerMessageTypes]: { id: string; type: K } & WorkerMessageTypes[K]['parameters'];
}[keyof WorkerMessageTypes];

type WorkerPort = Pick<NonNullable<typeof parentPort>, 'postMessage'>;
type DatabaseSyncConstructor = new (path: string, options?: { readOnly?: boolean }) => DatabaseSync;

/**
 * Returns true when `arg` is a plain named-parameter object (not a primitive, null, or typed
 * array). Used to distinguish the named-parameter overload from the positional overload.
 */
function isNamedParams(
  arg: SqlValue | Record<string, SqlValue> | undefined,
): arg is Record<string, SqlValue> {
  return typeof arg === 'object' && !!arg && !ArrayBuffer.isView(arg);
}

/**
 * Sanitizes a named-parameter object before SQLite binding. node:sqlite requires `null` for SQL
 * NULL values, but callers may pass `undefined` to indicate "no filter" (i.e. the parameter should
 * not constrain the query). This converts `undefined` values to `null` so SQLite can bind them
 * correctly.
 */
function sanitizeNamedParams(
  params: Record<string, SqlValue | undefined>,
): Record<string, SQLInputValue> {
  return Object.fromEntries(
    Object.entries(params).map(([k, v]) => [
      k,
      // node:sqlite requires null for SQL NULL; callers pass undefined for "no filter" → null
      // eslint-disable-next-line no-null/no-null
      v !== undefined ? v : null,
    ]),
  );
}

/**
 * Sanitizes an array of positional parameters before SQLite binding. Converts `undefined` values to
 * `null` so SQLite can bind them correctly.
 *
 * Accepts the wider element type that TypeScript infers when destructuring the `SqlQueryArgs` union
 * tuple — records cannot appear as positional args and are mapped to `null` as a safe fallback.
 */
function sanitizePositional(args: SqlValue[]): SQLInputValue[] {
  // node:sqlite requires null for SQL NULL; callers pass undefined for "no filter" → null
  // eslint-disable-next-line no-null/no-null
  return args.map((v) => (v !== undefined ? v : null));
}

function createMessageHandler(
  databases: Map<string, DatabaseSync>,
  port: WorkerPort,
  // This is a class constructor, so we are capitalizing it
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DatabaseSyncImplementation: DatabaseSyncConstructor = DatabaseSync,
): (message: WorkerMessage) => void {
  function getDatabase(nonce: string): DatabaseSync {
    const db = databases.get(nonce);
    if (!db) throw new Error(`Database with nonce "${nonce}" is not open.`);
    return db;
  }

  return (message: WorkerMessage) => {
    const { id } = message;
    try {
      let result: unknown;

      switch (message.type) {
        case 'open': {
          const db = new DatabaseSyncImplementation(message.path, { readOnly: message.readOnly });
          databases.set(message.nonce, db);
          break;
        }

        case 'close': {
          const db = getDatabase(message.nonce);
          db.close();
          databases.delete(message.nonce);
          break;
        }

        case 'attach': {
          const db = getDatabase(message.nonce);
          db.prepare('ATTACH DATABASE ? AS ?').run(message.path, message.schemaName);
          break;
        }

        case 'detach': {
          const db = getDatabase(message.nonce);
          db.prepare('DETACH DATABASE ?').run(message.schemaName);
          break;
        }

        case 'run': {
          const db = getDatabase(message.nonce);
          const [namedOrFirst, ...positional] = message.args;
          let changes: number | bigint;
          let lastInsertRowid: number | bigint;
          if (isNamedParams(namedOrFirst)) {
            ({ changes, lastInsertRowid } = db
              .prepare(message.query)
              .run(sanitizeNamedParams(namedOrFirst), ...sanitizePositional(positional)));
          } else {
            // If no args were passed in, don't pass any in. If there was at least one arg, pass it
            const allArgs = message.args.length > 0 ? [namedOrFirst, ...positional] : [];
            ({ changes, lastInsertRowid } = db
              .prepare(message.query)
              .run(...sanitizePositional(allArgs)));
          }
          result = { changes: Number(changes), lastId: Number(lastInsertRowid) };
          break;
        }

        case 'select': {
          const db = getDatabase(message.nonce);
          const [namedOrFirst, ...positional] = message.args;
          if (isNamedParams(namedOrFirst)) {
            result = db
              .prepare(message.query)
              .all(sanitizeNamedParams(namedOrFirst), ...sanitizePositional(positional));
          } else {
            // If no args were passed in, don't pass any in. If there was at least one arg, pass it
            const allArgs = message.args.length > 0 ? [namedOrFirst, ...positional] : [];
            result = db.prepare(message.query).all(...sanitizePositional(allArgs));
          }
          break;
        }

        case 'dispose': {
          const errors: string[] = [];
          databases.forEach((db, nonce) => {
            try {
              db.close();
            } catch (e) {
              errors.push(`${nonce}: ${e instanceof Error ? e.message : String(e)}`);
            }
          });
          databases.clear();
          if (errors.length > 0) throw new Error(`Failed to close databases: ${errors.join('; ')}`);
          break;
        }

        default: {
          const exhaustiveCheck: never = message;
          throw new Error(`Unknown message type: ${JSON.stringify(exhaustiveCheck)}`);
        }
      }

      port.postMessage({ id, result });
    } catch (err) {
      port.postMessage({ id, error: err instanceof Error ? err.message : String(err) });
    }
  };
}

if (parentPort) {
  // Capture narrowed non-null reference before use in callbacks
  const port = parentPort;
  const databases = new Map<string, DatabaseSync>();
  port.on('message', createMessageHandler(databases, port));
}

/** This is an internal-only export for testing purposes and should not be used in development */
export const testingWorker = { createMessageHandler };
