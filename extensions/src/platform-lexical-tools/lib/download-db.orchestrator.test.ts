import path from 'path';
import { describe, it, expect, vi } from 'vitest';
import { runDownload, FileNotFoundError, type OrgDetectionResult } from './download-db';

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
  noticeFilenames: ['LICENSE.md', 'SOURCE.md'],
};

const RAW_BASE = 'https://raw.githubusercontent.com/paranext/dependencies/main/lexical-db';

/** Every URL `downloadFile` was asked for, in call order. */
function downloadedUrls(deps: Deps): string[] {
  return vi.mocked(deps.downloadFile).mock.calls.map(([url]) => url);
}

/**
 * The DB archive and the notice files that travel with it are both fetched through `downloadFile`,
 * so assertions about one have to say which they mean.
 */
const isDbUrl = (url: string) => url.endsWith('.xz');
const isNoticeUrl = (url: string) => url.endsWith('.md');

describe('runDownload', () => {
  it('strict + happy path: downloads and extracts', async () => {
    const deps = makeDeps();
    await runDownload(
      { ...baseOpts, detection: { org: 'paranext' } satisfies OrgDetectionResult },
      deps,
    );
    expect(downloadedUrls(deps).filter(isDbUrl)).toHaveLength(1);
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

  it('detection failure: throws with the underlying reason and never starts the download', async () => {
    // We throw (instead of warning + skipping) so an unexpected git/origin problem can't silently
    // turn into a missing lexical DB at runtime. The reason from the detector is surfaced in the
    // error message so the cause is debuggable without digging into download-db.ts.
    const deps = makeDeps();
    await expect(
      runDownload(
        {
          ...baseOpts,
          detection: { org: undefined, reason: 'no .git directory found' },
        },
        deps,
      ),
    ).rejects.toThrow(/no \.git directory found/);
    expect(deps.fetchRemoteChecksum).not.toHaveBeenCalled();
    expect(deps.downloadFile).not.toHaveBeenCalled();
    expect(deps.extractXzFile).not.toHaveBeenCalled();
    expect(deps.warn).not.toHaveBeenCalled();
  });

  it('local file present + matching checksum: skips download, skips extract if extracted file exists', async () => {
    const deps = makeDeps({
      fileExists: vi.fn(
        (p: string) => p === '/tmp/lexical-db/lexical.db.xz' || p === '/tmp/lexical-db/lexical.db',
      ),
      calculateChecksum: vi.fn(async () => 'abc123'),
    });
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(downloadedUrls(deps).filter(isDbUrl)).toHaveLength(0);
    expect(deps.extractXzFile).not.toHaveBeenCalled();
  });

  it('local file present + matching checksum + missing extracted file: extracts', async () => {
    const deps = makeDeps({
      fileExists: vi.fn((p: string) => p === '/tmp/lexical-db/lexical.db.xz'),
      calculateChecksum: vi.fn(async () => 'abc123'),
    });
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(downloadedUrls(deps).filter(isDbUrl)).toHaveLength(0);
    expect(deps.extractXzFile).toHaveBeenCalledTimes(1);
  });

  it('local file present + checksum mismatch: re-downloads and re-extracts', async () => {
    // Simulate the "stale local file" scenario: file exists locally, but its checksum differs
    // from the remote, so we should re-download and re-extract.
    const deps = makeDeps({
      fileExists: vi.fn((p: string) => p === '/tmp/lexical-db/lexical.db.xz'),
      fetchRemoteChecksum: vi.fn(async () => 'remote-hash'),
      calculateChecksum: vi
        .fn()
        .mockResolvedValueOnce('local-hash-stale') // local file → stale
        .mockResolvedValueOnce('remote-hash'), // re-downloaded file → matches
    });
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(downloadedUrls(deps).filter(isDbUrl)).toHaveLength(1);
    expect(deps.extractXzFile).toHaveBeenCalledTimes(1);
  });

  it('lenient + happy path (fork with dependencies repo): downloads and extracts', async () => {
    const deps = makeDeps();
    await runDownload(
      { ...baseOpts, detection: { org: 'tjcouch-sil' } satisfies OrgDetectionResult },
      deps,
    );
    expect(downloadedUrls(deps).filter(isDbUrl)).toHaveLength(1);
    expect(deps.extractXzFile).toHaveBeenCalledTimes(1);
    expect(deps.warn).not.toHaveBeenCalled();
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

  it('fetches the notice files into the DB directory', async () => {
    // Portions of the DB are UBS material under CC BY-SA 4.0, whose section 3(a)(1) requires the
    // attribution and licence notice to travel with the work, and the rest is distributable only
    // under UBS's grant to Paratext. The extension's `assets` directory is
    // copied wholesale into every installer, so landing the notices beside the DB is what actually
    // puts them in front of a user.
    const deps = makeDeps();
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(vi.mocked(deps.downloadFile).mock.calls.filter(([url]) => isNoticeUrl(url))).toEqual([
      [`${RAW_BASE}/LICENSE.md`, path.join(baseOpts.localDbDir, 'LICENSE.md')],
      [`${RAW_BASE}/SOURCE.md`, path.join(baseOpts.localDbDir, 'SOURCE.md')],
    ]);
  });

  it('DB up to date, one notice missing: fetches only the missing notice', async () => {
    const deps = makeDeps({
      fileExists: vi.fn(
        (p: string) =>
          p === baseOpts.localDbPath ||
          p === baseOpts.localDbPath.replace('.xz', '') ||
          p === path.join(baseOpts.localDbDir, 'LICENSE.md'),
      ),
    });
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(downloadedUrls(deps)).toEqual([`${RAW_BASE}/SOURCE.md`]);
  });

  it('DB up to date and notices present: downloads nothing', async () => {
    const deps = makeDeps({ fileExists: vi.fn(() => true) });
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(deps.downloadFile).not.toHaveBeenCalled();
    expect(deps.extractXzFile).not.toHaveBeenCalled();
  });

  it('re-downloading the DB re-fetches the notices, so they cannot go stale against it', async () => {
    const deps = makeDeps({
      fileExists: vi.fn(() => true),
      fetchRemoteChecksum: vi.fn(async () => 'remote-hash'),
      calculateChecksum: vi
        .fn()
        .mockResolvedValueOnce('local-hash-stale')
        .mockResolvedValueOnce('remote-hash'),
    });
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(downloadedUrls(deps).filter(isNoticeUrl)).toEqual([
      `${RAW_BASE}/LICENSE.md`,
      `${RAW_BASE}/SOURCE.md`,
    ]);
  });

  it('strict + 404 on a notice: rethrows rather than packaging the DB bare', async () => {
    const deps = makeDeps({
      downloadFile: vi.fn(async (url: string) => {
        if (url === `${RAW_BASE}/SOURCE.md`) throw new FileNotFoundError(url);
      }),
    });
    await expect(
      runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps),
    ).rejects.toBeInstanceOf(FileNotFoundError);
  });

  it('lenient + 404 on a notice: warns about the obligation but still prepares the DB', async () => {
    const noticeUrl =
      'https://raw.githubusercontent.com/tjcouch-sil/dependencies/main/lexical-db/LICENSE.md';
    const warn = vi.fn();
    const deps = makeDeps({
      downloadFile: vi.fn(async (url: string) => {
        if (isNoticeUrl(url)) throw new FileNotFoundError(noticeUrl);
      }),
      warn,
    });
    await runDownload({ ...baseOpts, detection: { org: 'tjcouch-sil' } }, deps);
    expect(deps.extractXzFile).toHaveBeenCalledTimes(1);
    const messages = warn.mock.calls.flat().join('\n');
    expect(messages).toContain(noticeUrl);
    expect(messages).toContain('attribution and licence text');
  });

  it('lenient + both notices missing: names every URL it could not fetch', async () => {
    // `Promise.all` rejected on the first failure and abandoned the fetch still in flight, so this
    // warning named ONE url while telling the maintainer to publish both files - and which one it
    // named depended on which request happened to fail first.
    const warn = vi.fn();
    const deps = makeDeps({
      downloadFile: vi.fn(async (url: string) => {
        if (isNoticeUrl(url)) throw new FileNotFoundError(url);
      }),
      warn,
    });
    await runDownload({ ...baseOpts, detection: { org: 'tjcouch-sil' } }, deps);
    const messages = warn.mock.calls.flat().join('\n');
    expect(messages).toContain('LICENSE.md');
    expect(messages).toContain('SOURCE.md');
    // Both were attempted, rather than the second being abandoned when the first failed.
    expect(downloadedUrls(deps).filter(isNoticeUrl)).toHaveLength(2);
  });

  it('lenient + 404 on a notice: does not claim the DB is missing', async () => {
    // The outer handler's message ("extension will run without lexical data") is about a missing
    // DB. By the time notices are fetched the DB is on disk, so reusing that message would send a
    // reader after the wrong problem.
    const log = vi.fn();
    const deps = makeDeps({
      downloadFile: vi.fn(async (url: string) => {
        if (isNoticeUrl(url)) throw new FileNotFoundError(url);
      }),
      log,
    });
    await runDownload({ ...baseOpts, detection: { org: 'tjcouch-sil' } }, deps);
    const messages = log.mock.calls.flat().join('\n');
    expect(messages).not.toContain('extension will run without lexical data');
    expect(messages).toContain('DB file preparation complete.');
  });
});
