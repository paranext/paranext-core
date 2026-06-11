import { join } from 'node:path';
import { Worker } from 'node:worker_threads';
import {
  databaseServiceNetworkObjectName,
  IDatabaseService,
  databaseServiceObjectToProxy,
  RunResult,
  SqlValue,
  OpenDatabaseOptions,
  SqlOutputRow,
  NamedSqlParameters,
} from '@shared/services/database.service-model';
import { createSyncProxyForAsyncObject, startsWith } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { newNonce } from '@shared/utils/util';
import { getUriFromExtensionUri } from '@extension-host/services/asset-retrieval.service';
import { getPathFromUri } from '@node/utils/util';
import { networkObjectService } from '@shared/services/network-object.service';
import { EXTENSION_ASSET_PROTOCOL_NAME } from '@shared/utils/extension-asset.utils';
import { SqlQueryArgs, WorkerMessageTypes } from './database.worker';

/**
 * Response message from the worker thread. Includes the request ID for correlation, the typed
 * result (or undefined for void operations), and optional error.
 */
type WorkerMessage = {
  id: string;
  result?: WorkerMessageTypes[keyof WorkerMessageTypes]['result'];
  error?: string;
};
type PendingRequest = { resolve: (value: unknown) => void; reject: (error: Error) => void };

/** Factory that creates the SQLite worker. Overridable in tests. */
type WorkerFactory = () => Worker;

const defaultWorkerFactory: WorkerFactory = () => {
  // In development the extension-host runs TypeScript directly (no webpack), so point to the
  // .ts source file and register tsx for TypeScript support in the worker thread.
  // In production the worker is compiled by webpack to database.worker.js alongside the bundle.
  const workerPath = join(__dirname, `database.worker.${globalThis.isPackaged ? 'js' : 'ts'}`);
  return new Worker(
    workerPath,
    globalThis.isPackaged
      ? {}
      : { execArgv: ['--require', 'tsx/cjs', '--require', 'tsconfig-paths/register'] },
  );
};

class DatabaseService implements IDatabaseService {
  #worker: Worker;
  #pendingRequests: Map<string, PendingRequest> = new Map();
  #isDisposing = false;

  constructor(workerFactory: WorkerFactory = defaultWorkerFactory) {
    this.#worker = workerFactory();

    this.#worker.on('message', (message: WorkerMessage) => {
      const pending = this.#pendingRequests.get(message.id);
      if (!pending) return;
      this.#pendingRequests.delete(message.id);
      if (message.error !== undefined) {
        pending.reject(new Error(message.error));
      } else {
        pending.resolve(message.result);
      }
    });

    this.#worker.on('error', (error) => {
      logger.error('Database worker crashed:', error);
      this.#rejectAllPending(error);
    });

    this.#worker.on('exit', (code) => {
      if (!this.#isDisposing) {
        logger.error(`Database worker exited unexpectedly with code ${code}`);
      }
      this.#rejectAllPending(new Error(`Database worker exited with code ${code}`));
    });
  }

  async openDatabase(
    extensionFileUri: string,
    { readOnly }: OpenDatabaseOptions = {},
  ): Promise<string> {
    const databasePath = getPathFromUri(getUriFromExtensionUri(extensionFileUri));

    // Extension asset files are always read-only
    const isReadOnly = !!(readOnly || startsWith(extensionFileUri, EXTENSION_ASSET_PROTOCOL_NAME));

    // The worker thread serializes all operations, so fullMutex is inherently satisfied
    const nonce = newNonce();
    await this.#sendRequest('open', { nonce, path: databasePath, readOnly: isReadOnly });
    return nonce;
  }

  async closeDatabase(databaseNonce: string): Promise<void> {
    await this.#sendRequest('close', { nonce: databaseNonce });
  }

  async attachDatabase(
    databaseNonce: string,
    extensionFileUri: string,
    schemaName: string,
  ): Promise<void> {
    const path = getPathFromUri(getUriFromExtensionUri(extensionFileUri));
    await this.#sendRequest('attach', { nonce: databaseNonce, path, schemaName });
  }

  async detachDatabase(databaseNonce: string, schemaName: string): Promise<void> {
    await this.#sendRequest('detach', { nonce: databaseNonce, schemaName });
  }

  async run(
    databaseNonce: string,
    query: string,
    ...anonymousParameters: SqlValue[]
  ): Promise<RunResult>;
  async run(
    databaseNonce: string,
    query: string,
    namedParameters: NamedSqlParameters,
    ...anonymousParameters: SqlValue[]
  ): Promise<RunResult>;
  async run(databaseNonce: string, query: string, ...args: SqlQueryArgs): Promise<RunResult> {
    return this.#sendRequest('run', {
      nonce: databaseNonce,
      query,
      args,
    });
  }

  async select(
    databaseNonce: string,
    query: string,
    ...anonymousParameters: SqlValue[]
  ): Promise<SqlOutputRow[]>;
  async select(
    databaseNonce: string,
    query: string,
    namedParameters: NamedSqlParameters,
    ...anonymousParameters: SqlValue[]
  ): Promise<SqlOutputRow[]>;
  async select(
    databaseNonce: string,
    query: string,
    ...args: SqlQueryArgs
  ): Promise<SqlOutputRow[]> {
    return this.#sendRequest('select', {
      nonce: databaseNonce,
      query,
      args,
    });
  }

  async dispose(): Promise<boolean> {
    this.#isDisposing = true;
    try {
      await this.#sendRequest('dispose', {});
    } finally {
      await this.#worker.terminate();
    }
    return true;
  }

  #rejectAllPending(error: Error): void {
    this.#pendingRequests.forEach(({ reject }) => reject(error));
    this.#pendingRequests.clear();
  }

  #sendRequest<T extends keyof WorkerMessageTypes>(
    type: T,
    messageParameters: WorkerMessageTypes[T]['parameters'],
  ): Promise<WorkerMessageTypes[T]['result']> {
    // The worker response is untyped (unknown). We trust the protocol defined in WorkerMessageTypes
    // to guarantee the resolved value matches WorkerMessageTypes[T]['result'].
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return new Promise<unknown>((resolve, reject) => {
      const id = newNonce();
      this.#pendingRequests.set(id, { resolve, reject });
      this.#worker.postMessage({ id, type, ...messageParameters });
    }) as Promise<WorkerMessageTypes[T]['result']>;
  }
}

/** This is an internal-only export for testing purposes and should not be used in development */
export const testingDatabaseService = { DatabaseService };

let initializationPromise: Promise<void> | undefined;
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
          // Clear the cached promise so the next call retries instead of failing forever
          initializationPromise = undefined;
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
