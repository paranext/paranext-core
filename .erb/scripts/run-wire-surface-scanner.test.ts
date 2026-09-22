import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it, vi } from 'vitest';
import { runCSharpWireSurfaceScanner } from './run-wire-surface-scanner';
import { CSharpScanResult } from './wire-surface.model';

const REPO_ROOT = '/repo';
const TRACKED_FILES = ['c-sharp/Fixtures/FixtureA.cs', 'c-sharp/Fixtures/FixtureB.cs'];

const SCAN_RESULT: CSharpScanResult = {
  registrations: [
    {
      category: 'networkObject',
      name: 'platformScripture.fixtureService',
      file: 'c-sharp/Fixtures/FixtureA.cs',
      registeredVia: 'NetworkObject.RegisterNetworkObjectAsync',
      documented: true,
      docsStaticallyResolved: true,
      experimental: false,
      language: 'csharp',
    },
  ],
  dynamicRegistrations: [],
};

function fakeSpawnResult(
  overrides: Partial<childProcess.SpawnSyncReturns<string>> = {},
): childProcess.SpawnSyncReturns<string> {
  return {
    pid: 4242,
    // `output`/`signal` are typed `T | Buffer | null` / `NodeJS.Signals | null` -- a stream that
    // was not separately captured is represented by an explicit null, not undefined.
    // eslint-disable-next-line no-null/no-null
    output: [null, '', ''],
    stdout: '',
    stderr: '',
    status: 0,
    // Same as above: a signal-free exit is represented as an explicit null, not undefined.
    // eslint-disable-next-line no-null/no-null
    signal: null,
    ...overrides,
  };
}

/** A fake `spawn` that writes `scanResult` to the `--out` path and reports a clean exit. */
function makeSuccessfulSpawn(
  scanResult: CSharpScanResult,
): (
  command: string,
  args: readonly string[],
  options: childProcess.SpawnSyncOptionsWithStringEncoding,
) => childProcess.SpawnSyncReturns<string> {
  return (_command, args) => {
    const outPath = args[args.indexOf('--out') + 1];
    fs.writeFileSync(outPath, JSON.stringify(scanResult));
    return fakeSpawnResult();
  };
}

describe('runCSharpWireSurfaceScanner: success path', () => {
  it('parses the scanner output on a successful run', () => {
    const result = runCSharpWireSurfaceScanner(
      REPO_ROOT,
      TRACKED_FILES,
      makeSuccessfulSpawn(SCAN_RESULT),
    );
    expect(result).toEqual(SCAN_RESULT);
  });

  it('writes the tracked file list, LF-separated, to the path passed as --tracked-files', () => {
    let writtenTrackedFilesText: string | undefined;
    runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, (_command, args) => {
      const trackedFilesPath = args[args.indexOf('--tracked-files') + 1];
      writtenTrackedFilesText = fs.readFileSync(trackedFilesPath, 'utf8');
      const outPath = args[args.indexOf('--out') + 1];
      fs.writeFileSync(outPath, JSON.stringify(SCAN_RESULT));
      return fakeSpawnResult();
    });
    expect(writtenTrackedFilesText).toBe(
      'c-sharp/Fixtures/FixtureA.cs\nc-sharp/Fixtures/FixtureB.cs\n',
    );
  });

  it('removes the temporary directory after a successful run', () => {
    let capturedTempDir = '';
    runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, (_command, args) => {
      const outPath = args[args.indexOf('--out') + 1];
      capturedTempDir = path.dirname(outPath);
      fs.writeFileSync(outPath, JSON.stringify(SCAN_RESULT));
      return fakeSpawnResult();
    });
    expect(capturedTempDir).not.toBe('');
    expect(fs.existsSync(capturedTempDir)).toBe(false);
  });
});

describe('runCSharpWireSurfaceScanner: warnings on the success path', () => {
  it('forwards non-empty stderr to console.warn when the scanner exits 0', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const skippedFileWarning =
        'wire-surface: these compiled files are not in the tracked-file list and were skipped:\n' +
        '  c-sharp/Fixtures/FixtureC.cs\n';
      runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, (_command, args) => {
        const outPath = args[args.indexOf('--out') + 1];
        fs.writeFileSync(outPath, JSON.stringify(SCAN_RESULT));
        return fakeSpawnResult({ stderr: skippedFileWarning });
      });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      const [warned] = warnSpy.mock.calls[0];
      expect(warned).toContain('[wire-surface C# scanner]');
      expect(warned).toContain(skippedFileWarning);
    } finally {
      warnSpy.mockRestore();
    }
  });

  it('does not call console.warn when the scanner exits 0 with empty stderr', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, makeSuccessfulSpawn(SCAN_RESULT));
      expect(warnSpy).not.toHaveBeenCalled();
    } finally {
      warnSpy.mockRestore();
    }
  });
});

describe('runCSharpWireSurfaceScanner: the exact CLI argument vector', () => {
  it('matches the design contract exactly', () => {
    let capturedCommand: string | undefined;
    let capturedArgs: readonly string[] | undefined;
    let capturedOptions: childProcess.SpawnSyncOptionsWithStringEncoding | undefined;

    runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, (command, args, options) => {
      capturedCommand = command;
      capturedArgs = args;
      capturedOptions = options;
      const outPath = args[args.indexOf('--out') + 1];
      fs.writeFileSync(outPath, JSON.stringify(SCAN_RESULT));
      return fakeSpawnResult();
    });

    expect(capturedCommand).toBe('dotnet');
    expect(capturedOptions).toMatchObject({
      cwd: REPO_ROOT,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });

    if (!capturedArgs) throw new Error('spawn was never called');
    const args = capturedArgs;
    const trackedFilesPath = args[9];
    const outPath = args[11];

    expect(args).toEqual([
      'run',
      '--project',
      'c-sharp/Paranext.WireSurface/Paranext.WireSurface.csproj',
      '--',
      '--project',
      path.resolve(REPO_ROOT, 'c-sharp/ParanextDataProvider.csproj'),
      '--repo-root',
      REPO_ROOT,
      '--tracked-files',
      trackedFilesPath,
      '--out',
      outPath,
    ]);
    // The temp paths themselves are only known once mkdtemp runs, but they must sit under the same
    // private temp directory and be named distinctly.
    expect(path.dirname(trackedFilesPath)).toBe(path.dirname(outPath));
    expect(path.basename(trackedFilesPath)).not.toBe(path.basename(outPath));
  });
});

describe('runCSharpWireSurfaceScanner: failure paths', () => {
  it('throws naming the exit status and the captured stderr when the scanner exits non-zero', () => {
    expect(() =>
      runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, () =>
        fakeSpawnResult({ status: 2, stderr: 'the data provider project does not compile' }),
      ),
    ).toThrow(/status 2[\s\S]*the data provider project does not compile/);
  });

  it('throws naming the underlying error when the process could not be spawned at all', () => {
    expect(() =>
      runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, () =>
        // `spawnSync` reports a failure to launch the process itself via `status: null` plus `error`.
        // eslint-disable-next-line no-null/no-null
        fakeSpawnResult({ status: null, error: new Error('ENOENT: dotnet not found') }),
      ),
    ).toThrow(/ENOENT: dotnet not found/);
  });

  it('rejects output that is not valid JSON at all', () => {
    expect(() =>
      runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, (_command, args) => {
        const outPath = args[args.indexOf('--out') + 1];
        fs.writeFileSync(outPath, '{ this is not valid json');
        return fakeSpawnResult();
      }),
    ).toThrow();
  });

  it('rejects output that parses as JSON but does not match the CSharpScanResult shape', () => {
    expect(() =>
      runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, (_command, args) => {
        const outPath = args[args.indexOf('--out') + 1];
        fs.writeFileSync(outPath, JSON.stringify({ someOtherShape: true }));
        return fakeSpawnResult();
      }),
    ).toThrow(/isCSharpScanResult/);
  });

  it('removes the temporary directory even when the scanner exits non-zero', () => {
    let capturedTempDir = '';
    expect(() =>
      runCSharpWireSurfaceScanner(REPO_ROOT, TRACKED_FILES, (_command, args) => {
        const outPath = args[args.indexOf('--out') + 1];
        capturedTempDir = path.dirname(outPath);
        return fakeSpawnResult({ status: 2, stderr: 'boom' });
      }),
    ).toThrow();
    expect(capturedTempDir).not.toBe('');
    expect(fs.existsSync(capturedTempDir)).toBe(false);
  });
});
