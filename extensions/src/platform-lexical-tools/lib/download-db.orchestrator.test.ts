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
    // attribution and license notice to travel with the work, and the rest is distributable only
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

  // The DB is skipped when a checksum says the local copy is already the right one. A notice file
  // has no checksum, so the only gate available is existence - and a file that EXISTS can still be
  // wrong: a truncated write, or a captive-portal interstitial answered with HTTP 200, would then
  // be kept forever and copied into every installer. They are a few kilobytes, so they are
  // re-fetched every run instead.
  it('DB up to date and notices present: still re-fetches the notices', async () => {
    const deps = makeDeps({ fileExists: vi.fn(() => true) });
    await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    expect(downloadedUrls(deps)).toEqual([`${RAW_BASE}/LICENSE.md`, `${RAW_BASE}/SOURCE.md`]);
    // The DB itself is still gated on its checksum - that one is large, and the gate is sound.
    expect(downloadedUrls(deps).filter((url) => !isNoticeUrl(url))).toEqual([]);
    expect(deps.extractXzFile).not.toHaveBeenCalled();
  });

  it('re-downloading the DB re-fetches the notices too', async () => {
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
    ).rejects.toThrow(`${RAW_BASE}/SOURCE.md`);
  });

  it('strict + both notices missing: names every URL, not just the first to fail', async () => {
    // The strict half of the `allSettled` contract. Throwing `failures[0]` alone leaves a
    // maintainer with both files missing publishing the one the message names, re-running, and only
    // then learning about the other - the second round the lenient path also avoids.
    const deps = makeDeps({
      downloadFile: vi.fn(async (url: string) => {
        if (isNoticeUrl(url)) throw new FileNotFoundError(url);
      }),
    });
    let thrown: unknown;
    try {
      await runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps);
    } catch (error: unknown) {
      thrown = error;
    }
    const message = thrown instanceof Error ? thrown.message : String(thrown);
    expect(message).toContain('LICENSE.md');
    expect(message).toContain('SOURCE.md');
    expect(downloadedUrls(deps).filter(isNoticeUrl)).toHaveLength(2);
  });

  it('strict + a non-404 notice failure: fails naming the cause, not just the URL', async () => {
    // The extension README's contract: "expected missing" is the only condition treated leniently,
    // so a connection failure is fatal in both modes - but the message has to say WHY, or a
    // maintainer reads a network outage as an unpublished file and goes looking in the wrong repo.
    const deps = makeDeps({
      downloadFile: vi.fn(async (url: string) => {
        if (isNoticeUrl(url)) throw new Error('socket hang up');
      }),
    });
    await expect(
      runDownload({ ...baseOpts, detection: { org: 'paranext' } }, deps),
    ).rejects.toThrow('socket hang up');
  });

  it('lenient + a non-404 notice failure: still fails, per the documented contract', async () => {
    const deps = makeDeps({
      downloadFile: vi.fn(async (url: string) => {
        if (isNoticeUrl(url)) throw new Error('getaddrinfo ENOTFOUND');
      }),
    });
    await expect(
      runDownload({ ...baseOpts, detection: { org: 'tjcouch-sil' } }, deps),
    ).rejects.toThrow('getaddrinfo ENOTFOUND');
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
    expect(messages).toContain('attribution and license text');
  });

  it('lenient + both notices missing: names every URL it could not fetch', async () => {
    // Every url has to be named. `Promise.all` would reject on the first failure and abandon the
    // fetch still in flight, leaving the warning naming ONE url while telling the maintainer to
    // publish both files - and which one depends on whichever request happens to fail first.
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
