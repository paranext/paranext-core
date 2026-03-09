import { vi, describe, it, expect, beforeEach } from 'vitest';

// Use vi.hoisted so all constants/mock functions are available inside vi.mock factories
// (vi.mock calls are hoisted before const declarations)
const {
  OPEN_READONLY,
  OPEN_READWRITE,
  OPEN_FULLMUTEX,
  mockOpen,
  mockGetUriFromExtensionUri,
  mockGetPathFromUri,
  mockNewNonce,
} = vi.hoisted(() => ({
  // These values match the actual sqlite3 constants
  OPEN_READONLY: 1,
  OPEN_READWRITE: 2,
  OPEN_FULLMUTEX: 65536,
  mockOpen: vi.fn(),
  mockGetUriFromExtensionUri: vi.fn(),
  mockGetPathFromUri: vi.fn(),
  mockNewNonce: vi.fn(),
}));

vi.mock('promised-sqlite3', () => ({
  AsyncDatabase: { open: mockOpen },
}));

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
  networkObjectService: { set: vi.fn() },
}));

import { EXTENSION_ASSET_PROTOCOL_NAME } from '@shared/utils/extension-asset.utils';
import { testingDatabaseService } from '@extension-host/services/database.service-host';

const { DatabaseService } = testingDatabaseService;

const FAKE_URI = 'app://installed-extensions/my-ext/assets/db.sqlite';
const FAKE_PATH = '/path/to/db.sqlite';
const FAKE_NONCE = 'test-nonce-123';
const EXTENSION_URI = `${EXTENSION_ASSET_PROTOCOL_NAME}://my-ext/assets/db.sqlite`;
const NON_ASSET_URI = 'resources://my-ext/db.sqlite';

const createMockDb = () => ({
  close: vi.fn().mockResolvedValue(undefined),
  run: vi.fn().mockResolvedValue({ changes: 0, lastID: 0 }),
  all: vi.fn().mockResolvedValue([]),
});

let mockDb: ReturnType<typeof createMockDb>;

beforeEach(() => {
  vi.clearAllMocks();
  mockDb = createMockDb();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockOpen.mockResolvedValue(mockDb as any);
  mockGetUriFromExtensionUri.mockReturnValue(FAKE_URI);
  mockGetPathFromUri.mockReturnValue(FAKE_PATH);
  mockNewNonce.mockReturnValue(FAKE_NONCE);
});

describe('openDatabase', () => {
  it('opens with OPEN_READWRITE for a non-extension-asset URI by default', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);

    expect(mockOpen).toHaveBeenCalledWith(FAKE_PATH, OPEN_READWRITE);
    expect(nonce).toBe(FAKE_NONCE);
  });

  it('opens with OPEN_READONLY for an extension asset URI regardless of readOnly option', async () => {
    const service = new DatabaseService();
    await service.openDatabase(EXTENSION_URI);

    expect(mockOpen).toHaveBeenCalledWith(FAKE_PATH, OPEN_READONLY);
  });

  it('opens with OPEN_READONLY when readOnly option is true', async () => {
    const service = new DatabaseService();
    await service.openDatabase(NON_ASSET_URI, { readOnly: true });

    expect(mockOpen).toHaveBeenCalledWith(FAKE_PATH, OPEN_READONLY);
  });

  it('includes OPEN_FULLMUTEX flag when fullMutex option is true', async () => {
    const service = new DatabaseService();
    await service.openDatabase(NON_ASSET_URI, { fullMutex: true });

    // eslint-disable-next-line no-bitwise
    expect(mockOpen).toHaveBeenCalledWith(FAKE_PATH, OPEN_READWRITE | OPEN_FULLMUTEX);
  });

  it('includes OPEN_FULLMUTEX along with OPEN_READONLY when both options are set', async () => {
    const service = new DatabaseService();
    await service.openDatabase(NON_ASSET_URI, { readOnly: true, fullMutex: true });

    // eslint-disable-next-line no-bitwise
    expect(mockOpen).toHaveBeenCalledWith(FAKE_PATH, OPEN_READONLY | OPEN_FULLMUTEX);
  });

  it('includes OPEN_FULLMUTEX with OPEN_READONLY for extension asset URIs with fullMutex option', async () => {
    const service = new DatabaseService();
    await service.openDatabase(EXTENSION_URI, { fullMutex: true });

    // eslint-disable-next-line no-bitwise
    expect(mockOpen).toHaveBeenCalledWith(FAKE_PATH, OPEN_READONLY | OPEN_FULLMUTEX);
  });

  it('resolves the URI through getUriFromExtensionUri and getPathFromUri', async () => {
    const service = new DatabaseService();
    const resolvedUri = 'app://installed-extensions/other/db.sqlite';
    const resolvedPath = '/other/path/db.sqlite';
    mockGetUriFromExtensionUri.mockReturnValue(resolvedUri);
    mockGetPathFromUri.mockReturnValue(resolvedPath);

    await service.openDatabase(NON_ASSET_URI);

    expect(mockGetUriFromExtensionUri).toHaveBeenCalledWith(NON_ASSET_URI);
    expect(mockGetPathFromUri).toHaveBeenCalledWith(resolvedUri);
    expect(mockOpen).toHaveBeenCalledWith(resolvedPath, expect.any(Number));
  });

  it('returns unique nonces for each opened database', async () => {
    const service = new DatabaseService();
    mockNewNonce.mockReturnValueOnce('nonce-1').mockReturnValueOnce('nonce-2');

    const nonce1 = await service.openDatabase(NON_ASSET_URI);
    const nonce2 = await service.openDatabase(NON_ASSET_URI);

    expect(nonce1).toBe('nonce-1');
    expect(nonce2).toBe('nonce-2');
    expect(nonce1).not.toBe(nonce2);
  });

  it('propagates errors from AsyncDatabase.open', async () => {
    const service = new DatabaseService();
    mockOpen.mockRejectedValue(new Error('File not found'));

    await expect(service.openDatabase(NON_ASSET_URI)).rejects.toThrow('File not found');
  });
});

describe('closeDatabase', () => {
  it('closes the database connection', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);

    await service.closeDatabase(nonce);

    expect(mockDb.close).toHaveBeenCalledOnce();
  });

  it('removes the database so the nonce is no longer valid after closing', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);

    await service.closeDatabase(nonce);

    await expect(service.run(nonce, 'SELECT 1')).rejects.toThrow(
      `Database with nonce "${nonce}" is not open.`,
    );
  });

  it('throws if the nonce is not found', async () => {
    const service = new DatabaseService();

    await expect(service.closeDatabase('unknown-nonce')).rejects.toThrow(
      'Database with nonce "unknown-nonce" is not open.',
    );
  });

  it('does not close other open databases', async () => {
    const service = new DatabaseService();
    mockNewNonce.mockReturnValueOnce('nonce-a').mockReturnValueOnce('nonce-b');

    const mockDb2 = createMockDb();
    mockOpen.mockResolvedValueOnce(mockDb as never).mockResolvedValueOnce(mockDb2 as never);

    await service.openDatabase(NON_ASSET_URI);
    await service.openDatabase(NON_ASSET_URI);
    await service.closeDatabase('nonce-a');

    expect(mockDb.close).toHaveBeenCalledOnce();
    expect(mockDb2.close).not.toHaveBeenCalled();
  });

  it('propagates errors from db.close', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    mockDb.close.mockRejectedValue(new Error('Close failed'));

    await expect(service.closeDatabase(nonce)).rejects.toThrow('Close failed');
  });
});

describe('attachDatabase', () => {
  it('runs ATTACH DATABASE with the resolved path and schema name', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);

    const attachPath = '/path/to/attached.sqlite';
    mockGetPathFromUri.mockReturnValue(attachPath);

    await service.attachDatabase(nonce, 'resources://my-ext/attached.sqlite', 'mySchema');

    expect(mockDb.run).toHaveBeenCalledWith('ATTACH DATABASE ? AS ?', attachPath, 'mySchema');
  });

  it('throws if the nonce is not found', async () => {
    const service = new DatabaseService();

    await expect(service.attachDatabase('bad-nonce', NON_ASSET_URI, 'schema')).rejects.toThrow(
      'Database with nonce "bad-nonce" is not open.',
    );
  });
});

describe('detachDatabase', () => {
  it('runs DETACH DATABASE with the schema name', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);

    await service.detachDatabase(nonce, 'mySchema');

    expect(mockDb.run).toHaveBeenCalledWith('DETACH DATABASE ?', 'mySchema');
  });

  it('throws if the nonce is not found', async () => {
    const service = new DatabaseService();

    await expect(service.detachDatabase('bad-nonce', 'mySchema')).rejects.toThrow(
      'Database with nonce "bad-nonce" is not open.',
    );
  });
});

describe('run', () => {
  it('executes the query and returns changes and lastId', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    mockDb.run.mockResolvedValue({ changes: 3, lastID: 42 });

    const result = await service.run(nonce, 'DELETE FROM items WHERE id = ?', 5);

    expect(mockDb.run).toHaveBeenCalledWith('DELETE FROM items WHERE id = ?', 5);
    expect(result).toEqual({ changes: 3, lastId: 42 });
  });

  it('maps sqlite3 lastID to lastId in the result', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    mockDb.run.mockResolvedValue({ changes: 1, lastID: 99 });

    const result = await service.run(nonce, 'INSERT INTO items (name) VALUES (?)', 'foo');

    expect(result.lastId).toBe(99);
    expect(result).not.toHaveProperty('lastID');
  });

  it('forwards multiple args to the underlying db.run', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    mockDb.run.mockResolvedValue({ changes: 1, lastID: 1 });

    await service.run(nonce, 'UPDATE t SET a=?, b=? WHERE id=?', 'val1', 'val2', 10);

    expect(mockDb.run).toHaveBeenCalledWith('UPDATE t SET a=?, b=? WHERE id=?', 'val1', 'val2', 10);
  });

  it('works with no extra args', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    mockDb.run.mockResolvedValue({ changes: 0, lastID: 0 });

    const result = await service.run(nonce, 'DELETE FROM items');

    expect(mockDb.run).toHaveBeenCalledWith('DELETE FROM items');
    expect(result).toEqual({ changes: 0, lastId: 0 });
  });

  it('throws if the nonce is not found', async () => {
    const service = new DatabaseService();

    await expect(service.run('bad-nonce', 'SELECT 1')).rejects.toThrow(
      'Database with nonce "bad-nonce" is not open.',
    );
  });

  it('propagates errors from db.run', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    mockDb.run.mockRejectedValue(new Error('SQL syntax error'));

    await expect(service.run(nonce, 'INVALID SQL')).rejects.toThrow('SQL syntax error');
  });
});

describe('select', () => {
  it('returns all rows from the query', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    const rows = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
    ];
    mockDb.all.mockResolvedValue(rows);

    const result = await service.select(nonce, 'SELECT * FROM items');

    expect(mockDb.all).toHaveBeenCalledWith('SELECT * FROM items');
    expect(result).toEqual(rows);
  });

  it('forwards args to the underlying db.all', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    mockDb.all.mockResolvedValue([{ id: 1 }]);

    await service.select(nonce, 'SELECT * FROM items WHERE id = ?', 1);

    expect(mockDb.all).toHaveBeenCalledWith('SELECT * FROM items WHERE id = ?', 1);
  });

  it('returns an empty array when no rows match', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    mockDb.all.mockResolvedValue([]);

    const result = await service.select(nonce, 'SELECT * FROM items WHERE id = ?', 9999);

    expect(result).toEqual([]);
  });

  it('throws if the nonce is not found', async () => {
    const service = new DatabaseService();

    await expect(service.select('bad-nonce', 'SELECT 1')).rejects.toThrow(
      'Database with nonce "bad-nonce" is not open.',
    );
  });

  it('propagates errors from db.all', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);
    mockDb.all.mockRejectedValue(new Error('Table does not exist'));

    await expect(service.select(nonce, 'SELECT * FROM nonexistent')).rejects.toThrow(
      'Table does not exist',
    );
  });
});

describe('dispose', () => {
  it('closes all open databases and returns true', async () => {
    const service = new DatabaseService();
    mockNewNonce.mockReturnValueOnce('nonce-1').mockReturnValueOnce('nonce-2');

    const mockDb2 = createMockDb();
    mockOpen.mockResolvedValueOnce(mockDb as never).mockResolvedValueOnce(mockDb2 as never);

    await service.openDatabase(NON_ASSET_URI);
    await service.openDatabase(NON_ASSET_URI);

    const result = await service.dispose();

    expect(result).toBe(true);
    expect(mockDb.close).toHaveBeenCalledOnce();
    expect(mockDb2.close).toHaveBeenCalledOnce();
  });

  it('returns true even if no databases are open', async () => {
    const service = new DatabaseService();

    const result = await service.dispose();

    expect(result).toBe(true);
    expect(mockDb.close).not.toHaveBeenCalled();
  });

  it('clears all database references so nonces are no longer valid after dispose', async () => {
    const service = new DatabaseService();
    const nonce = await service.openDatabase(NON_ASSET_URI);

    await service.dispose();

    await expect(service.run(nonce, 'SELECT 1')).rejects.toThrow(
      `Database with nonce "${nonce}" is not open.`,
    );
  });

  it('initiates all close calls concurrently', async () => {
    const service = new DatabaseService();
    mockNewNonce.mockReturnValueOnce('nonce-1').mockReturnValueOnce('nonce-2');

    let resolveClose1!: () => void;
    let resolveClose2!: () => void;
    const close1Promise = new Promise<void>((res) => {
      resolveClose1 = res;
    });
    const close2Promise = new Promise<void>((res) => {
      resolveClose2 = res;
    });

    const mockDb1 = { ...createMockDb(), close: vi.fn().mockReturnValue(close1Promise) };
    const mockDb2 = { ...createMockDb(), close: vi.fn().mockReturnValue(close2Promise) };
    mockOpen.mockResolvedValueOnce(mockDb1 as never).mockResolvedValueOnce(mockDb2 as never);

    await service.openDatabase(NON_ASSET_URI);
    await service.openDatabase(NON_ASSET_URI);

    const disposePromise = service.dispose();

    // Both close calls should have been initiated before either resolves
    expect(mockDb1.close).toHaveBeenCalledOnce();
    expect(mockDb2.close).toHaveBeenCalledOnce();

    resolveClose1();
    resolveClose2();
    await disposePromise;
  });
});
