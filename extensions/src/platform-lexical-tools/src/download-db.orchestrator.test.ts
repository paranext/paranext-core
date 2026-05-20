import { describe, it, expect, vi } from 'vitest';
import { runDownload, FileNotFoundError, type OrgDetectionResult } from '../lib/download-db';

type Deps = Parameters<typeof runDownload>[1];

function makeDeps(overrides: Partial<Deps> = {}): Deps {
  return {
    fetchRemoteChecksum: vi.fn(async () => 'abc123'),
    downloadFile: vi.fn(async () => {}),
    calculateChecksum: vi.fn(async () => 'abc123'),
    extractXzFile: vi.fn(async (p: string) => p.replace('.xz', '')),
    fileExists: vi.fn(() => false),
    ensureDir: vi.fn(),
    log: vi.fn(),
    warn: vi.fn(),
    ...overrides,
  };
}

const baseOpts = {
  localDbDir: '/tmp/lexical-db',
  localDbPath: '/tmp/lexical-db/lexical.db.xz',
  dbFilename: 'lexical.db.xz',
  checksumFilename: 'lexical.db.xz.sha256',
};

describe('runDownload', () => {
  it('strict + happy path: downloads and extracts', async () => {
    const deps = makeDeps();
    await runDownload(
      { ...baseOpts, detection: { org: 'paranext' } satisfies OrgDetectionResult },
      deps,
    );
    expect(deps.downloadFile).toHaveBeenCalledTimes(1);
    expect(deps.extractXzFile).toHaveBeenCalledTimes(1);
    expect(deps.warn).not.toHaveBeenCalled();
  });

  it('strict + 404 on checksum: rethrows FileNotFoundError', async () => {
    const fetchUrl =
      'https://raw.githubusercontent.com/paranext/dependencies/main/lexical-db/lexical.db.xz.sha256';
    const deps = makeDeps({
      fetchRemoteChecksum: vi.fn(async () => {
        throw new FileNotFoundError(fetchUrl);
      }),
    });
    await expect(
      runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps),
    ).rejects.toBeInstanceOf(FileNotFoundError);
    expect(deps.downloadFile).not.toHaveBeenCalled();
  });

  it('lenient + 404 on checksum: logs and returns cleanly', async () => {
    const fetchUrl =
      'https://raw.githubusercontent.com/tjcouch-sil/dependencies/main/lexical-db/lexical.db.xz.sha256';
    const log = vi.fn();
    const deps = makeDeps({
      fetchRemoteChecksum: vi.fn(async () => {
        throw new FileNotFoundError(fetchUrl);
      }),
      log,
    });
    await runDownload({ ...baseOpts, detection: { org: 'tjcouch-sil' } }, deps);
    const messages = log.mock.calls.flat().join('\n');
    expect(messages).toContain('Lexical database files not found');
    expect(messages).toContain(fetchUrl);
    expect(messages).toContain('extension will run without lexical data');
  });

  it('lenient + 404 on DB download: logs and returns cleanly', async () => {
    const dbUrl =
      'https://media.githubusercontent.com/media/tjcouch-sil/dependencies/main/lexical-db/lexical.db.xz';
    const log = vi.fn();
    const deps = makeDeps({
      downloadFile: vi.fn(async () => {
        throw new FileNotFoundError(dbUrl);
      }),
      log,
    });
    await runDownload({ ...baseOpts, detection: { org: 'tjcouch-sil' } }, deps);
    const messages = log.mock.calls.flat().join('\n');
    expect(messages).toContain('Lexical database files not found');
    expect(messages).toContain(dbUrl);
  });

  it('lenient + non-404 network error: rethrows', async () => {
    const deps = makeDeps({
      fetchRemoteChecksum: vi.fn(async () => {
        throw new Error('ECONNREFUSED');
      }),
    });
    await expect(
      runDownload({ ...baseOpts, detection: { org: 'tjcouch-sil' } }, deps),
    ).rejects.toThrow('ECONNREFUSED');
  });

  it('strict + non-404 network error: rethrows', async () => {
    const deps = makeDeps({
      fetchRemoteChecksum: vi.fn(async () => {
        throw new Error('ECONNREFUSED');
      }),
    });
    await expect(
      runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps),
    ).rejects.toThrow('ECONNREFUSED');
  });

  it('detection failure: warns with reason and skips download', async () => {
    const warn = vi.fn();
    const deps = makeDeps({ warn });
    await runDownload(
      {
        ...baseOpts,
        detection: { org: undefined, reason: 'no .git directory found' },
      },
      deps,
    );
    expect(deps.fetchRemoteChecksum).not.toHaveBeenCalled();
    expect(deps.downloadFile).not.toHaveBeenCalled();
    expect(deps.extractXzFile).not.toHaveBeenCalled();
    const warnings = warn.mock.calls.flat().join('\n');
    expect(warnings).toContain('no .git directory found');
    expect(warnings).toContain('lenient mode');
  });

  it('local file present + matching checksum: skips download, skips extract if extracted file exists', async () => {
    const deps = makeDeps({
      fileExists: vi.fn(
        (p: string) => p === '/tmp/lexical-db/lexical.db.xz' || p === '/tmp/lexical-db/lexical.db',
      ),
      calculateChecksum: vi.fn(async () => 'abc123'),
    });
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(deps.downloadFile).not.toHaveBeenCalled();
    expect(deps.extractXzFile).not.toHaveBeenCalled();
  });

  it('local file present + matching checksum + missing extracted file: extracts', async () => {
    const deps = makeDeps({
      fileExists: vi.fn((p: string) => p === '/tmp/lexical-db/lexical.db.xz'),
      calculateChecksum: vi.fn(async () => 'abc123'),
    });
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(deps.downloadFile).not.toHaveBeenCalled();
    expect(deps.extractXzFile).toHaveBeenCalledTimes(1);
  });

  it('downloaded file with mismatched checksum: throws', async () => {
    const deps = makeDeps({
      fetchRemoteChecksum: vi.fn(async () => 'remote-hash'),
      calculateChecksum: vi.fn(async () => 'local-hash'),
    });
    await expect(
      runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps),
    ).rejects.toThrow('Checksum verification failed');
  });
});
