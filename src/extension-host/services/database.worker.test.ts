import { vi, describe, it, expect, beforeEach } from 'vitest';
// testingWorker exports createMessageHandler for direct injection in tests,
// avoiding any need to mock node: built-in modules.
import { testingWorker } from './database.worker';

type WorkerResponse = { id: string; result?: unknown; error?: string };

type MockStatement = {
  run: ReturnType<typeof vi.fn>;
  all: ReturnType<typeof vi.fn>;
};

type MockDb = {
  prepare: ReturnType<typeof vi.fn>;
  close: ReturnType<typeof vi.fn>;
};

const { createMessageHandler } = testingWorker;

type DbFactory = new (
  path: string,
  options?: { readOnly?: boolean },
) => import('node:sqlite').DatabaseSync;

const MockDatabaseSync = vi.fn();

function createMockStatement(overrides?: Partial<MockStatement>): MockStatement {
  return {
    run: vi.fn().mockReturnValue({ changes: 0, lastInsertRowid: 0n }),
    all: vi.fn().mockReturnValue([]),
    ...overrides,
  };
}

function createMockDb(): MockDb {
  return {
    prepare: vi.fn().mockReturnValue(createMockStatement()),
    close: vi.fn(),
  };
}

/** Returns the most recently created DatabaseSync mock instance */
function getLastDb(): MockDb {
  const last = MockDatabaseSync.mock.results.at(-1);
  if (!last || last.type !== 'return') throw new Error('No DatabaseSync instance was created');
  // Cast mock result to MockDb type for test assertions
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return last.value as MockDb;
}

/** Returns the most recently prepared statement on a db */
function getLastStmt(db: MockDb = getLastDb()): MockStatement {
  const last = db.prepare.mock.results.at(-1);
  if (!last || last.type !== 'return') throw new Error('No statement was prepared');
  // Cast mock result to MockStatement type for test assertions
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return last.value as MockStatement;
}

// Per-test fresh handler with injected dependencies
let mockPort: { postMessage: ReturnType<typeof vi.fn> };
let databases: Map<string, unknown>;
let handler: ReturnType<typeof createMessageHandler>;

/** Dispatch a message to the worker and return the postMessage response */
function send(message: unknown): WorkerResponse {
  // Cast to `never` so arbitrary test messages bypass the WorkerMessage type constraint
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  handler(message as never);
  // Cast mock.lastCall to typed array to extract the WorkerResponse parameter
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const [response] = mockPort.postMessage.mock.lastCall as [WorkerResponse];
  return response;
}

/** Open a database by nonce and return the response */
function openDb(nonce = 'db1', path = '/test/db.sqlite', readOnly = false): WorkerResponse {
  return send({ id: `open-${nonce}`, type: 'open', nonce, path, readOnly });
}

beforeEach(() => {
  MockDatabaseSync.mockClear();
  MockDatabaseSync.mockImplementation(createMockDb);
  mockPort = { postMessage: vi.fn() };
  databases = new Map();
  handler = createMessageHandler(
    // Cast empty Map to DatabaseSync type for dependency injection
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    databases as Map<string, import('node:sqlite').DatabaseSync>,
    { postMessage: mockPort.postMessage },
    // Cast mock constructor to DbFactory type for dependency injection
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    MockDatabaseSync as unknown as DbFactory,
  );
});

describe('open', () => {
  it('constructs a DatabaseSync with the correct path and readOnly: false', () => {
    openDb('nonce1', '/my/db.sqlite', false);

    expect(MockDatabaseSync).toHaveBeenCalledOnce();
    expect(MockDatabaseSync).toHaveBeenCalledWith('/my/db.sqlite', { readOnly: false });
  });

  it('passes readOnly: true when specified', () => {
    openDb('nonce1', '/my/db.sqlite', true);

    expect(MockDatabaseSync).toHaveBeenCalledWith('/my/db.sqlite', { readOnly: true });
  });

  it('responds with result: undefined', () => {
    const response = openDb('nonce1');

    expect(response.id).toBe('open-nonce1');
    expect(response.error).toBeUndefined();
    expect(response.result).toBeUndefined();
  });

  it('can open multiple databases with different nonces', () => {
    openDb('nonce1');
    openDb('nonce2');
    openDb('nonce3');

    expect(MockDatabaseSync).toHaveBeenCalledTimes(3);
  });

  it('sends an error response if DatabaseSync throws', () => {
    MockDatabaseSync.mockImplementationOnce(() => {
      throw new Error('cannot open file');
    });

    const response = openDb('bad');

    expect(response.error).toBe('cannot open file');
    expect(response.result).toBeUndefined();
  });
});

describe('close', () => {
  it('calls close() on the correct database', () => {
    openDb('nonce1');
    const db = getLastDb();

    const response = send({ id: 'req', type: 'close', nonce: 'nonce1' });

    expect(db.close).toHaveBeenCalledOnce();
    expect(response.error).toBeUndefined();
  });

  it('removes the database from the map — a second close on the same nonce fails', () => {
    openDb('nonce1');
    send({ id: 'req1', type: 'close', nonce: 'nonce1' });

    const response = send({ id: 'req2', type: 'close', nonce: 'nonce1' });

    expect(response.error).toBe('Database with nonce "nonce1" is not open.');
  });

  it('sends an error when the nonce is not open', () => {
    const response = send({ id: 'req', type: 'close', nonce: 'unknown' });

    expect(response.error).toBe('Database with nonce "unknown" is not open.');
  });
});

describe('attach', () => {
  it('interpolates the schema name as a quoted identifier, not a parameter', () => {
    openDb('nonce1');
    const db = getLastDb();

    const response = send({
      id: 'req',
      type: 'attach',
      nonce: 'nonce1',
      path: '/other/db.sqlite',
      schemaName: 'other',
    });

    // Schema name must be a quoted SQL identifier in the statement text, not a ?
    // parameter — SQLite does not allow parameter markers in identifier positions.
    expect(db.prepare).toHaveBeenCalledWith('ATTACH DATABASE ? AS other');
    // The path remains a safe parameter binding; the schema name is not passed to run()
    expect(getLastStmt(db).run).toHaveBeenCalledWith('/other/db.sqlite');
    expect(response.error).toBeUndefined();
  });

  it('rejects a schema name that contains characters outside [a-zA-Z_][a-zA-Z0-9_]*', () => {
    openDb('nonce1');

    const response = send({
      id: 'req',
      type: 'attach',
      nonce: 'nonce1',
      path: '/other/db.sqlite',
      schemaName: 'bad; DROP TABLE users--',
    });

    expect(response.error).toMatch(/invalid schema name/i);
  });

  it('rejects a schema name that starts with a digit', () => {
    openDb('nonce1');

    const response = send({
      id: 'req',
      type: 'attach',
      nonce: 'nonce1',
      path: '/x.sqlite',
      schemaName: '1bad',
    });

    expect(response.error).toMatch(/invalid schema name/i);
  });

  it('rejects an empty schema name', () => {
    openDb('nonce1');

    const response = send({
      id: 'req',
      type: 'attach',
      nonce: 'nonce1',
      path: '/x.sqlite',
      schemaName: '',
    });

    expect(response.error).toMatch(/invalid schema name/i);
  });

  it('sends an error when the nonce is not open', () => {
    const response = send({
      id: 'req',
      type: 'attach',
      nonce: 'unknown',
      path: '/x.sqlite',
      schemaName: 'x',
    });

    expect(response.error).toBe('Database with nonce "unknown" is not open.');
  });
});

describe('detach', () => {
  it('interpolates the schema name as a quoted identifier, not a parameter', () => {
    openDb('nonce1');
    const db = getLastDb();

    const response = send({ id: 'req', type: 'detach', nonce: 'nonce1', schemaName: 'mySchema' });

    // Schema name must appear in the SQL text as a quoted identifier, not bound via ?
    expect(db.prepare).toHaveBeenCalledWith('DETACH DATABASE mySchema');
    expect(getLastStmt(db).run).toHaveBeenCalledWith();
    expect(response.error).toBeUndefined();
  });

  it('rejects a schema name that contains characters outside [a-zA-Z_][a-zA-Z0-9_]*', () => {
    openDb('nonce1');

    const response = send({
      id: 'req',
      type: 'detach',
      nonce: 'nonce1',
      schemaName: 'bad"quote',
    });

    expect(response.error).toMatch(/invalid schema name/i);
  });

  it('rejects an empty schema name', () => {
    openDb('nonce1');

    const response = send({ id: 'req', type: 'detach', nonce: 'nonce1', schemaName: '' });

    expect(response.error).toMatch(/invalid schema name/i);
  });

  it('sends an error when the nonce is not open', () => {
    const response = send({ id: 'req', type: 'detach', nonce: 'unknown', schemaName: 'x' });

    expect(response.error).toBe('Database with nonce "unknown" is not open.');
  });
});

describe('run', () => {
  it('prepares and runs the query, returning changes and lastId as numbers', () => {
    openDb('nonce1');
    const db = getLastDb();
    db.prepare.mockReturnValue(
      createMockStatement({ run: vi.fn().mockReturnValue({ changes: 3, lastInsertRowid: 42n }) }),
    );

    const response = send({
      id: 'req',
      type: 'run',
      nonce: 'nonce1',
      query: 'DELETE FROM items WHERE id = ?',
      args: [5],
    });

    expect(db.prepare).toHaveBeenCalledWith('DELETE FROM items WHERE id = ?');
    expect(getLastStmt(db).run).toHaveBeenCalledWith(5);
    expect(response.result).toEqual({ changes: 3, lastId: 42 });
  });

  it('converts bigint changes and lastInsertRowid to numbers', () => {
    openDb('nonce1');
    const db = getLastDb();
    db.prepare.mockReturnValue(
      createMockStatement({
        run: vi.fn().mockReturnValue({ changes: BigInt(999), lastInsertRowid: BigInt(1234) }),
      }),
    );

    const response = send({
      id: 'req',
      type: 'run',
      nonce: 'nonce1',
      query: 'INSERT INTO t VALUES (?)',
      args: ['x'],
    });

    expect(response.result).toEqual({ changes: 999, lastId: 1234 });
  });

  it('passes multiple args as positional parameters', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'run',
      nonce: 'nonce1',
      query: 'UPDATE t SET a=?, b=? WHERE id=?',
      args: ['val1', 'val2', 10],
    });

    expect(getLastStmt(db).run).toHaveBeenCalledWith('val1', 'val2', 10);
  });

  it('calls run() with no arguments when args is empty', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({ id: 'req', type: 'run', nonce: 'nonce1', query: 'DELETE FROM t', args: [] });

    expect(getLastStmt(db).run).toHaveBeenCalledWith();
  });

  it('sends an error when the nonce is not open', () => {
    const response = send({
      id: 'req',
      type: 'run',
      nonce: 'unknown',
      query: 'SELECT 1',
      args: [],
    });

    expect(response.error).toBe('Database with nonce "unknown" is not open.');
  });

  it('sends an error when the query throws', () => {
    openDb('nonce1');
    const db = getLastDb();
    db.prepare.mockReturnValue(
      createMockStatement({
        run: vi.fn().mockImplementation(() => {
          throw new Error('SQL syntax error');
        }),
      }),
    );

    const response = send({
      id: 'req',
      type: 'run',
      nonce: 'nonce1',
      query: 'INVALID SQL',
      args: [],
    });

    expect(response.error).toBe('SQL syntax error');
  });

  it('sanitizes undefined values to null in positional parameters', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'run',
      nonce: 'nonce1',
      query: 'INSERT INTO t VALUES (?, ?)',
      args: ['val', undefined],
    });

    // Testing that undefined values are sanitized to null in the database layer
    // eslint-disable-next-line no-null/no-null
    expect(getLastStmt(db).run).toHaveBeenCalledWith('val', null);
  });

  it('passes named parameters with values', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'run',
      nonce: 'nonce1',
      query: 'INSERT INTO t (name, age) VALUES (:name, :age)',
      args: [{ name: 'Alice', age: 30 }],
    });

    expect(getLastStmt(db).run).toHaveBeenCalledWith({ name: 'Alice', age: 30 });
  });

  it('sanitizes undefined values to null in named parameters', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'run',
      nonce: 'nonce1',
      query: 'UPDATE t SET name=:name, status=:status WHERE id=:id',
      args: [{ name: 'Bob', status: undefined, id: 1 }],
    });

    // Testing that undefined values in named parameters are sanitized to null
    // eslint-disable-next-line no-null/no-null
    expect(getLastStmt(db).run).toHaveBeenCalledWith({ name: 'Bob', status: null, id: 1 });
  });

  it('passes mixed named and positional parameters', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'run',
      nonce: 'nonce1',
      query: 'INSERT INTO t (name, value1, value2) VALUES (:name, ?, ?)',
      args: [{ name: 'Charlie' }, 100, 200],
    });

    expect(getLastStmt(db).run).toHaveBeenCalledWith({ name: 'Charlie' }, 100, 200);
  });

  it('sanitizes undefined in mixed named and positional parameters', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'run',
      nonce: 'nonce1',
      query: 'UPDATE t SET flag=:flag, val1=?, val2=? WHERE id=:id',
      args: [{ flag: true, id: 5 }, undefined, 'data'],
    });

    // Testing that undefined in mixed parameter types is sanitized to null
    // eslint-disable-next-line no-null/no-null
    expect(getLastStmt(db).run).toHaveBeenCalledWith({ flag: true, id: 5 }, null, 'data');
  });
});

describe('select', () => {
  it('prepares and calls all() with the query and args, returning all rows', () => {
    const rows = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
    ];
    openDb('nonce1');
    const db = getLastDb();
    db.prepare.mockReturnValue(createMockStatement({ all: vi.fn().mockReturnValue(rows) }));

    const response = send({
      id: 'req',
      type: 'select',
      nonce: 'nonce1',
      query: 'SELECT * FROM items',
      args: [],
    });

    expect(db.prepare).toHaveBeenCalledWith('SELECT * FROM items');
    expect(getLastStmt(db).all).toHaveBeenCalledWith();
    expect(response.result).toEqual(rows);
  });

  it('passes args to the all() call', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'select',
      nonce: 'nonce1',
      query: 'SELECT * FROM items WHERE id = ?',
      args: [42],
    });

    expect(getLastStmt(db).all).toHaveBeenCalledWith(42);
  });

  it('returns an empty array when no rows match', () => {
    openDb('nonce1');

    const response = send({
      id: 'req',
      type: 'select',
      nonce: 'nonce1',
      query: 'SELECT * FROM items WHERE id = ?',
      args: [9999],
    });

    expect(response.result).toEqual([]);
  });

  it('sends an error when the nonce is not open', () => {
    const response = send({
      id: 'req',
      type: 'select',
      nonce: 'unknown',
      query: 'SELECT 1',
      args: [],
    });

    expect(response.error).toBe('Database with nonce "unknown" is not open.');
  });

  it('sanitizes undefined values to null in positional parameters', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'select',
      nonce: 'nonce1',
      query: 'SELECT * FROM items WHERE name=? AND status=?',
      args: ['item1', undefined],
    });

    // Testing that undefined values in select query parameters are sanitized to null
    // eslint-disable-next-line no-null/no-null
    expect(getLastStmt(db).all).toHaveBeenCalledWith('item1', null);
  });

  it('passes named parameters with values', () => {
    const rows = [{ id: 1, name: 'test' }];
    openDb('nonce1');
    const db = getLastDb();
    db.prepare.mockReturnValue(createMockStatement({ all: vi.fn().mockReturnValue(rows) }));

    const response = send({
      id: 'req',
      type: 'select',
      nonce: 'nonce1',
      query: 'SELECT * FROM items WHERE name=:name AND active=:active',
      args: [{ name: 'Alice', active: true }],
    });

    expect(getLastStmt(db).all).toHaveBeenCalledWith({ name: 'Alice', active: true });
    expect(response.result).toEqual(rows);
  });

  it('sanitizes undefined values to null in named parameters', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'select',
      nonce: 'nonce1',
      query: 'SELECT * FROM users WHERE id=:id AND status=:status',
      args: [{ id: 42, status: undefined }],
    });

    // Testing that undefined values in named select parameters are sanitized to null
    // eslint-disable-next-line no-null/no-null
    expect(getLastStmt(db).all).toHaveBeenCalledWith({ id: 42, status: null });
  });

  it('passes mixed named and positional parameters', () => {
    const rows = [{ id: 1, value: 'result' }];
    openDb('nonce1');
    const db = getLastDb();
    db.prepare.mockReturnValue(createMockStatement({ all: vi.fn().mockReturnValue(rows) }));

    const response = send({
      id: 'req',
      type: 'select',
      nonce: 'nonce1',
      query: 'SELECT * FROM data WHERE userId=:userId AND minVal>? AND maxVal<?',
      args: [{ userId: 100 }, 10, 999],
    });

    expect(getLastStmt(db).all).toHaveBeenCalledWith({ userId: 100 }, 10, 999);
    expect(response.result).toEqual(rows);
  });

  it('sanitizes undefined in mixed named and positional parameters', () => {
    openDb('nonce1');
    const db = getLastDb();

    send({
      id: 'req',
      type: 'select',
      nonce: 'nonce1',
      query: 'SELECT * FROM t WHERE category=:category AND minVal=? AND maxVal=?',
      args: [{ category: 'A' }, 5, undefined],
    });

    // Testing that undefined in mixed select parameter types is sanitized to null
    // eslint-disable-next-line no-null/no-null
    expect(getLastStmt(db).all).toHaveBeenCalledWith({ category: 'A' }, 5, null);
  });
});

describe('dispose', () => {
  it('calls close() on every open database', () => {
    openDb('nonce1');
    const db1 = getLastDb();
    openDb('nonce2');
    const db2 = getLastDb();

    send({ id: 'req', type: 'dispose' });

    expect(db1.close).toHaveBeenCalledOnce();
    expect(db2.close).toHaveBeenCalledOnce();
  });

  it('clears the databases map — subsequent operations on disposed nonces fail', () => {
    openDb('nonce1');

    send({ id: 'req-dispose', type: 'dispose' });
    const response = send({ id: 'req-close', type: 'close', nonce: 'nonce1' });

    expect(response.error).toBe('Database with nonce "nonce1" is not open.');
  });

  it('responds with result: undefined', () => {
    openDb('nonce1');

    const response = send({ id: 'req', type: 'dispose' });

    expect(response.error).toBeUndefined();
    expect(response.result).toBeUndefined();
  });

  it('succeeds when no databases are open', () => {
    const response = send({ id: 'req', type: 'dispose' });

    expect(response.error).toBeUndefined();
  });

  it('closes all databases even when one throws, and reports all errors', () => {
    openDb('nonce1');
    const db1 = getLastDb();
    openDb('nonce2');
    const db2 = getLastDb();
    openDb('nonce3');
    const db3 = getLastDb();

    db2.close.mockImplementation(() => {
      throw new Error('disk I/O error');
    });

    const response = send({ id: 'req', type: 'dispose' });

    expect(db1.close).toHaveBeenCalledOnce();
    expect(db2.close).toHaveBeenCalledOnce();
    expect(db3.close).toHaveBeenCalledOnce();
    expect(response.error).toContain('nonce2');
    expect(response.error).toContain('disk I/O error');
  });
});
