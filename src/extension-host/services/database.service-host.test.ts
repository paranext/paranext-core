import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { Worker } from 'node:worker_threads';
import { EXTENSION_ASSET_PROTOCOL_NAME } from '@shared/utils/extension-asset.utils';
import { testingDatabaseService } from '@extension-host/services/database.service-host';

type WorkerMessage = { id: string; result?: unknown; error?: string };
type WorkerRequest = { [key: string]: unknown; id: string; type: string };

// Use vi.hoisted so all mock functions are available inside vi.mock factories
// (vi.mock calls are hoisted before const declarations)
const {
  mockGetUriFromExtensionUri,
  mockGetPathFromUri,
  mockNewNonce,
  mockWorkerPostMessage,
  mockWorkerTerminate,
  mockWorkerOn,
  mockNetworkObjectSet,
  mockDefaultWorkerTerminate,
  DefaultFakeWorker,
} = vi.hoisted(() => {
  const defaultWorkerTerminate = vi.fn();
  // Fake worker returned by the mocked node:worker_threads Worker constructor. This is only used
  // when `initialize` builds a DatabaseService with the default (non-injected) worker factory; the
  // class tests below inject their own mockWorker and never hit this.
  class FakeWorker {
    terminate = defaultWorkerTerminate;

    private handlers: Record<string, (...args: unknown[]) => void> = {};

    on(event: string, handler: (...args: unknown[]) => void) {
      this.handlers[event] = handler;
    }

    postMessage(message: { id: string }) {
      // Acknowledge every request so #sendRequest (e.g. the dispose sent during failed-setup
      // cleanup) resolves without a real worker thread.
      queueMicrotask(() => this.handlers.message?.({ id: message.id }));
    }
  }
  return {
    mockGetUriFromExtensionUri: vi.fn(),
    mockGetPathFromUri: vi.fn(),
    mockNewNonce: vi.fn(),
    mockWorkerPostMessage: vi.fn(),
    mockWorkerTerminate: vi.fn(),
    mockWorkerOn: vi.fn(),
    mockNetworkObjectSet: vi.fn(),
    mockDefaultWorkerTerminate: defaultWorkerTerminate,
    DefaultFakeWorker: FakeWorker,
  };
});

vi.mock('@extension-host/services/asset-retrieval.service', () => ({
  getUriFromExtensionUri: mockGetUriFromExtensionUri,
}));

vi.mock('@node/utils/util', () => ({
  getPathFromUri: mockGetPathFromUri,
}));

vi.mock('@shared/utils/util', () => ({
  newNonce: mockNewNonce,
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: mockNetworkObjectSet },
}));

vi.mock('node:worker_threads', () => ({
  Worker: DefaultFakeWorker,
  default: { Worker: DefaultFakeWorker },
}));

const { DatabaseService } = testingDatabaseService;

// Cast mock object to Worker type for dependency injection in tests
// eslint-disable-next-line no-type-assertion/no-type-assertion
const mockWorker = {
  on: mockWorkerOn,
  postMessage: mockWorkerPostMessage,
  terminate: mockWorkerTerminate,
} as unknown as Worker;

/** Creates a DatabaseService that uses the mock worker */
function createService() {
  return new DatabaseService(() => mockWorker);
}

const FAKE_URI = 'app://installed-extensions/my-ext/assets/db.sqlite';
const FAKE_PATH = '/path/to/db.sqlite';
const EXTENSION_URI = `${EXTENSION_ASSET_PROTOCOL_NAME}://my-ext/assets/db.sqlite`;
const NON_ASSET_URI = 'resources://my-ext/db.sqlite';

let nonceCounter: number;

/** Get the event handler registered on the mock worker for a given event name */
function getRegisteredHandler(event: 'message'): (msg: WorkerMessage) => void;
function getRegisteredHandler(event: 'error'): (err: Error) => void;
function getRegisteredHandler(event: 'exit'): (code: number) => void;
function getRegisteredHandler(event: string): (arg: unknown) => void {
  // Cast mock.calls array to typed format for finding event handlers
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const call = (mockWorkerOn.mock.calls as [string, (arg: unknown) => void][]).find(
    ([evt]) => evt === event,
  );
  if (!call) throw new Error(`No '${event}' handler was registered on the worker`);
  return call[1];
}

/** Returns the most recently posted worker request */
function getLastRequest(): WorkerRequest {
  // Cast mock.lastCall to typed array to extract the WorkerRequest parameter
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (mockWorkerPostMessage.mock.lastCall as [WorkerRequest])[0];
}

/** Simulate the worker sending a success response to the most recent postMessage */
function respondSuccess(result?: unknown): void {
  const { id } = getLastRequest();
  getRegisteredHandler('message')({ id, result });
}

/** Simulate the worker sending an error response to the most recent postMessage */
function respondError(errorMessage: string): void {
  const { id } = getLastRequest();
  getRegisteredHandler('message')({ id, error: errorMessage });
}

/** Open a database and simulate a successful worker response, returning the db nonce */
async function openDb(
  service: { openDatabase(uri: string): Promise<string> },
  uri = NON_ASSET_URI,
): Promise<string> {
  const openPromise = service.openDatabase(uri);
  respondSuccess();
  return openPromise;
}

beforeEach(() => {
  vi.clearAllMocks();
  nonceCounter = 0;
  mockNewNonce.mockImplementation(() => {
    nonceCounter += 1;
    return `nonce-${nonceCounter}`;
  });
  mockGetUriFromExtensionUri.mockReturnValue(FAKE_URI);
  mockGetPathFromUri.mockReturnValue(FAKE_PATH);
  mockWorkerTerminate.mockResolvedValue(0);
  mockDefaultWorkerTerminate.mockResolvedValue(0);
});

describe('openDatabase', () => {
  it('sends an open request to the worker with readOnly: false for non-asset URIs', async () => {
    const service = createService();

    const openPromise = service.openDatabase(NON_ASSET_URI);

    const msg = getLastRequest();
    expect(msg.type).toBe('open');
    expect(msg.path).toBe(FAKE_PATH);
    expect(msg.readOnly).toBe(false);
    // nonce-1 is the first newNonce() call (db nonce), nonce-2 is the req id
    expect(msg.nonce).toBe('nonce-1');

    respondSuccess();
    expect(await openPromise).toBe('nonce-1');
  });

  it('sends readOnly: true for an extension asset URI', async () => {
    const service = createService();

    const openPromise = service.openDatabase(EXTENSION_URI);

    const msg = getLastRequest();
    expect(msg.type).toBe('open');
    expect(msg.readOnly).toBe(true);

    respondSuccess();
    await openPromise;
  });

  it('sends readOnly: true when the readOnly option is true', async () => {
    const service = createService();

    const openPromise = service.openDatabase(NON_ASSET_URI, { readOnly: true });

    expect(getLastRequest().readOnly).toBe(true);

    respondSuccess();
    await openPromise;
  });

  it('ignores fullMutex — worker thread provides inherent serialization', async () => {
    const service = createService();

    const openPromise = service.openDatabase(NON_ASSET_URI, { fullMutex: true });

    const msg = getLastRequest();
    // readOnly should still be false; fullMutex should not appear in the message
    expect(msg.readOnly).toBe(false);
    expect(msg).not.toHaveProperty('fullMutex');

    respondSuccess();
    await openPromise;
  });

  it('resolves the URI through getUriFromExtensionUri and getPathFromUri', async () => {
    const service = createService();
    const resolvedUri = 'app://installed-extensions/other/db.sqlite';
    const resolvedPath = '/other/path/db.sqlite';
    mockGetUriFromExtensionUri.mockReturnValue(resolvedUri);
    mockGetPathFromUri.mockReturnValue(resolvedPath);

    const openPromise = service.openDatabase(NON_ASSET_URI);

    expect(mockGetUriFromExtensionUri).toHaveBeenCalledWith(NON_ASSET_URI);
    expect(mockGetPathFromUri).toHaveBeenCalledWith(resolvedUri);
    expect(getLastRequest().path).toBe(resolvedPath);

    respondSuccess();
    await openPromise;
  });

  it('returns unique nonces for each opened database', async () => {
    const service = createService();

    const open1 = service.openDatabase(NON_ASSET_URI);
    respondSuccess();
    const nonce1 = await open1;

    const open2 = service.openDatabase(NON_ASSET_URI);
    respondSuccess();
    const nonce2 = await open2;

    expect(nonce1).not.toBe(nonce2);
  });

  it('propagates errors from the worker', async () => {
    const service = createService();

    const openPromise = service.openDatabase(NON_ASSET_URI);

    respondError('File not found');

    await expect(openPromise).rejects.toThrow('File not found');
  });
});

describe('closeDatabase', () => {
  it('sends a close request with the database nonce', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const closePromise = service.closeDatabase(nonce);

    const msg = getLastRequest();
    expect(msg.type).toBe('close');
    expect(msg.nonce).toBe(nonce);

    respondSuccess();
    await closePromise;
  });

  it('propagates worker errors (e.g., nonce not found)', async () => {
    const service = createService();

    const closePromise = service.closeDatabase('unknown-nonce');

    respondError('Database with nonce "unknown-nonce" is not open.');

    await expect(closePromise).rejects.toThrow('Database with nonce "unknown-nonce" is not open.');
  });
});

describe('attachDatabase', () => {
  it('sends an attach request with the resolved path and schema name', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const attachPath = '/path/to/attached.sqlite';
    mockGetPathFromUri.mockReturnValue(attachPath);

    const attachPromise = service.attachDatabase(nonce, NON_ASSET_URI, 'mySchema');

    const msg = getLastRequest();
    expect(msg.type).toBe('attach');
    expect(msg.nonce).toBe(nonce);
    expect(msg.path).toBe(attachPath);
    expect(msg.schemaName).toBe('mySchema');

    respondSuccess();
    await attachPromise;
  });

  it('resolves the attach URI through getUriFromExtensionUri and getPathFromUri', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const attachUri = 'papi-extension://other-ext/assets/other.sqlite';
    const attachResolvedUri = 'app://installed-extensions/other-ext/assets/other.sqlite';
    const attachPath = '/other/path/other.sqlite';
    mockGetUriFromExtensionUri.mockReturnValue(attachResolvedUri);
    mockGetPathFromUri.mockReturnValue(attachPath);

    const attachPromise = service.attachDatabase(nonce, attachUri, 'schema');

    expect(mockGetUriFromExtensionUri).toHaveBeenCalledWith(attachUri);
    expect(mockGetPathFromUri).toHaveBeenCalledWith(attachResolvedUri);

    respondSuccess();
    await attachPromise;
  });

  it('propagates worker errors', async () => {
    const service = createService();

    const attachPromise = service.attachDatabase('bad-nonce', NON_ASSET_URI, 'schema');

    respondError('Database with nonce "bad-nonce" is not open.');

    await expect(attachPromise).rejects.toThrow('Database with nonce "bad-nonce" is not open.');
  });
});

describe('detachDatabase', () => {
  it('sends a detach request with the nonce and schema name', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const detachPromise = service.detachDatabase(nonce, 'mySchema');

    const msg = getLastRequest();
    expect(msg.type).toBe('detach');
    expect(msg.nonce).toBe(nonce);
    expect(msg.schemaName).toBe('mySchema');

    respondSuccess();
    await detachPromise;
  });

  it('propagates worker errors', async () => {
    const service = createService();

    const detachPromise = service.detachDatabase('bad-nonce', 'mySchema');

    respondError('Database with nonce "bad-nonce" is not open.');

    await expect(detachPromise).rejects.toThrow('Database with nonce "bad-nonce" is not open.');
  });
});

describe('run', () => {
  it('sends a run request and returns the RunResult from the worker', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const runPromise = service.run(nonce, 'DELETE FROM items WHERE id = ?', 5);

    const msg = getLastRequest();
    expect(msg.type).toBe('run');
    expect(msg.nonce).toBe(nonce);
    expect(msg.query).toBe('DELETE FROM items WHERE id = ?');
    expect(msg.args).toEqual([5]);

    respondSuccess({ changes: 3, lastId: 42 });
    expect(await runPromise).toEqual({ changes: 3, lastId: 42 });
  });

  it('packs multiple variadic args into the args array', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const runPromise = service.run(nonce, 'UPDATE t SET a=?, b=? WHERE id=?', 'val1', 'val2', 10);

    expect(getLastRequest().args).toEqual(['val1', 'val2', 10]);

    respondSuccess({ changes: 1, lastId: 0 });
    await runPromise;
  });

  it('sends an empty args array when no args are provided', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const runPromise = service.run(nonce, 'DELETE FROM items');

    expect(getLastRequest().args).toEqual([]);

    respondSuccess({ changes: 0, lastId: 0 });
    expect(await runPromise).toEqual({ changes: 0, lastId: 0 });
  });

  it('propagates worker errors', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const runPromise = service.run(nonce, 'INVALID SQL');

    respondError('SQL syntax error');

    await expect(runPromise).rejects.toThrow('SQL syntax error');
  });
});

describe('select', () => {
  it('sends a select request and returns all rows from the worker', async () => {
    const service = createService();
    const nonce = await openDb(service);
    const rows = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
    ];

    const selectPromise = service.select(nonce, 'SELECT * FROM items');

    const msg = getLastRequest();
    expect(msg.type).toBe('select');
    expect(msg.nonce).toBe(nonce);
    expect(msg.query).toBe('SELECT * FROM items');
    expect(msg.args).toEqual([]);

    respondSuccess(rows);
    expect(await selectPromise).toEqual(rows);
  });

  it('packs variadic args into the args array', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const selectPromise = service.select(nonce, 'SELECT * FROM items WHERE id = ?', 1);

    expect(getLastRequest().args).toEqual([1]);

    respondSuccess([]);
    await selectPromise;
  });

  it('returns an empty array when the worker returns no rows', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const selectPromise = service.select(nonce, 'SELECT * FROM items WHERE id = ?', 9999);

    respondSuccess([]);
    expect(await selectPromise).toEqual([]);
  });

  it('propagates worker errors', async () => {
    const service = createService();
    const nonce = await openDb(service);

    const selectPromise = service.select(nonce, 'SELECT * FROM nonexistent');

    respondError('Table does not exist');

    await expect(selectPromise).rejects.toThrow('Table does not exist');
  });
});

describe('dispose', () => {
  it('sends a dispose request and terminates the worker, returning true', async () => {
    const service = createService();

    const disposePromise = service.dispose();

    expect(getLastRequest().type).toBe('dispose');

    respondSuccess();
    expect(await disposePromise).toBe(true);
    expect(mockWorkerTerminate).toHaveBeenCalledOnce();
  });

  it('does not terminate the worker until the dispose request resolves', async () => {
    const service = createService();

    const disposePromise = service.dispose();

    // Worker has not responded yet
    expect(mockWorkerTerminate).not.toHaveBeenCalled();

    respondSuccess();
    await disposePromise;

    expect(mockWorkerTerminate).toHaveBeenCalledOnce();
  });

  it('returns true even when no databases were opened', async () => {
    const service = createService();

    const disposePromise = service.dispose();

    respondSuccess();
    expect(await disposePromise).toBe(true);
  });

  it('propagates errors from the worker during dispose', async () => {
    const service = createService();

    const disposePromise = service.dispose();

    respondError('Failed to close a database');

    await expect(disposePromise).rejects.toThrow('Failed to close a database');
    expect(mockWorkerTerminate).toHaveBeenCalledOnce();
  });
});

describe('worker error event', () => {
  it('rejects all pending requests when the worker thread crashes', async () => {
    const service = createService();

    // Start two operations without resolving them
    const runPromise = service.run('some-nonce', 'SELECT 1');
    const selectPromise = service.select('other-nonce', 'SELECT 2');

    // Simulate a worker crash via the 'error' event
    getRegisteredHandler('error')(new Error('Worker crashed unexpectedly'));

    await expect(runPromise).rejects.toThrow('Worker crashed unexpectedly');
    await expect(selectPromise).rejects.toThrow('Worker crashed unexpectedly');
  });
});

describe('worker exit event', () => {
  it('rejects all pending requests when the worker exits unexpectedly', async () => {
    const service = createService();

    const runPromise = service.run('some-nonce', 'SELECT 1');
    const selectPromise = service.select('other-nonce', 'SELECT 2');

    getRegisteredHandler('exit')(1);

    await expect(runPromise).rejects.toThrow('Database worker exited with code 1');
    await expect(selectPromise).rejects.toThrow('Database worker exited with code 1');
  });

  it('rejects the pending dispose request when the worker exits before responding', async () => {
    const service = createService();

    // Start dispose — this sets #isDisposing = true and sends the dispose request
    const disposePromise = service.dispose();

    // Worker exits before sending a response (e.g. process.exit() called deep in the worker)
    getRegisteredHandler('exit')(1);

    // The pending request must be rejected so dispose() doesn't hang forever.
    // terminate() should still be called via the finally block.
    await expect(disposePromise).rejects.toThrow('Database worker exited with code 1');
    expect(mockWorkerTerminate).toHaveBeenCalledOnce();
  });
});

describe('initialize (cleanup on failed setup)', () => {
  // initialize is a cached initializer with module-level state, so re-import a fresh module per
  // test to start from an uninitialized state (mocks persist across vi.resetModules).
  async function importInitialize(): Promise<() => Promise<void>> {
    vi.resetModules();
    const module = await import('@extension-host/services/database.service-host');
    return module.initialize;
  }

  it('terminates the worker when networkObjectService.set fails so a retry is not leaked', async () => {
    const initialize = await importInitialize();
    mockNetworkObjectSet.mockRejectedValueOnce(new Error('network object set failed'));

    await expect(initialize()).rejects.toThrow('network object set failed');

    // The DatabaseService built for the failed attempt was disposed (worker terminated) before the
    // error propagated, so the worker thread is not leaked.
    expect(mockDefaultWorkerTerminate).toHaveBeenCalledOnce();
  });

  it('builds a fresh service and succeeds when a retry after failure can register', async () => {
    const initialize = await importInitialize();
    const fakeNetworkObject = {};
    mockNetworkObjectSet
      .mockRejectedValueOnce(new Error('network object set failed'))
      .mockResolvedValueOnce(fakeNetworkObject);

    // First attempt fails and clears the cached rejection
    await expect(initialize()).rejects.toThrow('network object set failed');
    // Retry runs the initializer again with a fresh DatabaseService and succeeds
    await expect(initialize()).resolves.toBeUndefined();

    expect(mockNetworkObjectSet).toHaveBeenCalledTimes(2);
    // Only the failed attempt's worker was terminated; the successful service's worker stays alive
    expect(mockDefaultWorkerTerminate).toHaveBeenCalledOnce();
  });
});
