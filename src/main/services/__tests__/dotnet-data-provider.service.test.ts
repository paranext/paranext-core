import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { dotnetDataProvider } from '@main/services/dotnet-data-provider.service';

const mocks = vi.hoisted(() => ({
  spawn: vi.fn(),
  loggerInfo: vi.fn(),
  loggerError: vi.fn(),
  existsSync: vi.fn(),
}));

/**
 * A stand-in for the spawned child. The service attaches `data` listeners to stdout/stderr and
 * `once` handlers for exit/close, so those have to exist or `start` throws before we can assert
 * anything about the arguments it spawned with.
 */
function fakeChildProcess() {
  return {
    stdout: { on: vi.fn(), removeListener: vi.fn() },
    stderr: { on: vi.fn(), removeListener: vi.fn() },
    once: vi.fn(),
    kill: vi.fn(() => true),
  };
}

// Both a named and a default export: the service imports `spawn` by name, but esModuleInterop
// means the transpiled require still reaches for `default` on the module record.
vi.mock('child_process', () => ({
  spawn: mocks.spawn,
  default: { spawn: mocks.spawn },
}));
vi.mock('fs', () => ({
  existsSync: mocks.existsSync,
  default: { existsSync: mocks.existsSync },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: mocks.loggerInfo, error: mocks.loggerError, warn: vi.fn(), debug: vi.fn() },
}));

const RESOURCES_PATH = '/repo';

describe('dotnetDataProvider.start', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.spawn.mockReturnValue(fakeChildProcess());
    // A Debug build is present unless a test says otherwise, so the missing-build error stays out
    // of the way of the argument assertions.
    mocks.existsSync.mockReturnValue(true);
    globalThis.resourcesPath = RESOURCES_PATH;
    globalThis.isPackaged = false;
    delete process.env.PT_DOTNET_NO_WATCH;
  });

  afterEach(() => {
    // `start` is a no-op while a child is recorded, so drop it or the next test spawns nothing.
    dotnetDataProvider.kill();
    delete process.env.PT_DOTNET_NO_WATCH;
  });

  test('runs dotnet watch by default', () => {
    dotnetDataProvider.start();

    expect(mocks.spawn).toHaveBeenCalledTimes(1);
    const [command, args] = mocks.spawn.mock.calls[0];
    expect(command).toBe('dotnet');
    expect(args).toEqual(['watch', '--project', 'c-sharp/ParanextDataProvider.csproj']);
  });

  test('PT_DOTNET_NO_WATCH=true runs the prebuilt assembly, from the project directory', () => {
    process.env.PT_DOTNET_NO_WATCH = 'true';

    dotnetDataProvider.start();

    const [command, args, options] = mocks.spawn.mock.calls[0];
    expect(command).toBe('dotnet');
    expect(args).toEqual([
      'run',
      '--project',
      `${RESOURCES_PATH}/c-sharp/ParanextDataProvider.csproj`,
      '--no-build',
    ]);
    // Matches the cwd `dotnet watch --project` would have used, so the two dev modes agree
    expect(options).toEqual({ cwd: `${RESOURCES_PATH}/c-sharp` });
    // A stale C# build is invisible from the outside, so the mode has to announce itself
    expect(mocks.loggerInfo).toHaveBeenCalledWith(
      expect.stringContaining('PT_DOTNET_NO_WATCH is set'),
    );
  });

  test('any value other than exactly "true" is ignored', () => {
    process.env.PT_DOTNET_NO_WATCH = '1';

    dotnetDataProvider.start();

    const [, args] = mocks.spawn.mock.calls[0];
    expect(args).toEqual(['watch', '--project', 'c-sharp/ParanextDataProvider.csproj']);
    expect(mocks.loggerInfo).not.toHaveBeenCalledWith(
      expect.stringContaining('PT_DOTNET_NO_WATCH is set'),
    );
  });

  test('the packaged branch wins even when the flag is set', () => {
    globalThis.isPackaged = true;
    // Electron adds `process.resourcesPath` and the packaged branch reads it directly. Defined
    // rather than assigned so this needs no type assertion for a property Node's types lack.
    Object.defineProperty(process, 'resourcesPath', {
      value: RESOURCES_PATH,
      configurable: true,
    });
    process.env.PT_DOTNET_NO_WATCH = 'true';

    dotnetDataProvider.start();

    const [command, args] = mocks.spawn.mock.calls[0];
    // Packaged runs the shipped binary with no arguments, whatever the dev flag says
    expect(command).not.toBe('dotnet');
    expect(args).toEqual([]);
  });

  test('logs a legible error when no Debug build exists', () => {
    process.env.PT_DOTNET_NO_WATCH = 'true';
    mocks.existsSync.mockReturnValue(false);

    dotnetDataProvider.start();

    expect(mocks.loggerError).toHaveBeenCalledWith(
      expect.stringContaining('no Debug build was found'),
    );
  });
});
