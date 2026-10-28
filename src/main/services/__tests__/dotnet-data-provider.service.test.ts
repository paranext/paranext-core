import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import path from 'path';
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
const SAMPLE_PROJECT_VARIABLE = 'PLATFORM_BIBLE_INSTALL_SAMPLE_PROJECT';

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
    vi.stubEnv(SAMPLE_PROJECT_VARIABLE, undefined);
  });

  afterEach(() => {
    // `start` is a no-op while a child is recorded, so drop it or the next test spawns nothing.
    dotnetDataProvider.kill();
    delete process.env.PT_DOTNET_NO_WATCH;
    vi.unstubAllEnvs();
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
    // Built with `path.join`, as the service builds it: the separator is platform-specific, so a
    // forward-slash literal cannot match on Windows.
    expect(args).toEqual([
      'run',
      '--project',
      path.join(RESOURCES_PATH, 'c-sharp', 'ParanextDataProvider.csproj'),
      '--no-build',
    ]);
    // Matches the cwd `dotnet watch --project` would have used, so the two dev modes agree
    expect(options).toMatchObject({ cwd: path.join(RESOURCES_PATH, 'c-sharp') });
    expect(options.env[SAMPLE_PROJECT_VARIABLE]).toBe('true');
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

  test('opts a dev run into the sample project and keeps the rest of the environment', () => {
    vi.stubEnv('SOME_OTHER_VARIABLE', 'kept');

    dotnetDataProvider.start();

    const [, , options] = mocks.spawn.mock.calls[0];
    expect(options.env[SAMPLE_PROJECT_VARIABLE]).toBe('true');
    expect(options.env.SOME_OTHER_VARIABLE).toBe('kept');
  });

  test('a dev run keeps a sample project setting from its environment', () => {
    vi.stubEnv(SAMPLE_PROJECT_VARIABLE, 'false');

    dotnetDataProvider.start();

    const [, , options] = mocks.spawn.mock.calls[0];
    expect(options.env[SAMPLE_PROJECT_VARIABLE]).toBe('false');
  });

  test('a dev run treats an empty sample project setting as unset', () => {
    vi.stubEnv(SAMPLE_PROJECT_VARIABLE, '');

    dotnetDataProvider.start();

    const [, , options] = mocks.spawn.mock.calls[0];
    expect(options.env[SAMPLE_PROJECT_VARIABLE]).toBe('true');
  });

  test('a packaged build is not opted into the sample project', () => {
    globalThis.isPackaged = true;
    Object.defineProperty(process, 'resourcesPath', {
      value: RESOURCES_PATH,
      configurable: true,
    });

    dotnetDataProvider.start();

    // Spawned with the inherited environment, which does not set the variable
    const [, , options] = mocks.spawn.mock.calls[0];
    expect(options.env).toBeUndefined();
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

describe('dotnetDataProvider.waitForClose', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.isPackaged = false;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /**
   * The service keeps its close promise at module level and it never resets once the child exits,
   * so each test starts a fresh copy of the service rather than the one imported above.
   */
  async function startFreshDataProvider() {
    const child = fakeChildProcess();
    mocks.spawn.mockReturnValue(child);
    vi.resetModules();
    const service = (await import('@main/services/dotnet-data-provider.service'))
      .dotnetDataProvider;
    service.start();
    /** What the child does when it exits by itself */
    const exit = () => {
      const onExit = child.once.mock.calls.find(([event]) => event === 'exit')?.[1];
      if (!onExit) throw new Error('The service did not listen for the child exiting');
      onExit(0, undefined);
    };
    return { service, child, exit };
  }

  test('kills the data provider when it does not exit within the time given', async () => {
    const { service, child } = await startFreshDataProvider();

    const waiting = service.waitForClose(2000);
    await vi.advanceTimersByTimeAsync(2000);
    await waiting;

    expect(child.kill).toHaveBeenCalledTimes(1);
  });

  test('does not kill the data provider when it exits by itself in time', async () => {
    const { service, child, exit } = await startFreshDataProvider();

    const waiting = service.waitForClose(2000);
    // As the provider does once main closes its PAPI connection
    exit();
    await vi.advanceTimersByTimeAsync(2000);
    await waiting;

    expect(child.kill).not.toHaveBeenCalled();
  });
});
