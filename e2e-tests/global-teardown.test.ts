/**
 * Unit tests for the renderer dev server's platform-addressed kill.
 *
 * `global-setup.ts` spawns it with `shell: true` and `detached: true`. On POSIX that puts it in its
 * own process group, addressable with a negative PID. On Windows neither half of that holds:
 * `detached` does not create a process group `-pid` could reach, and `shell: true` means the PID
 * names cmd.exe rather than the npm/webpack tree underneath it — so a Windows kill has to walk that
 * tree by a different mechanism (`taskkill /t`) instead of signalling a PID directly.
 */
import { execFileSync } from 'node:child_process';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { killDevServerProcess } from './global-teardown';

// vi.mock calls are hoisted to the top of the file by Vitest, so this runs before the imports
// above at runtime even though it appears below them in source order. The `default` entry is
// needed for vite-node's CJS interop with this Node builtin — omitting it throws "No 'default'
// export is defined on the ... mock" from deep inside global-teardown.ts's own import, not here.
// execSync is mocked alongside execFileSync because global-teardown.ts's default export (not yet
// covered by a test here) also calls it, for the process-name cleanup sweep — leaving it real would
// let an eventual test of that path spawn `npm run stop` for real instead of observing the call.
vi.mock('node:child_process', () => {
  const execFileSyncMock = vi.fn();
  const execSyncMock = vi.fn();
  return {
    execFileSync: execFileSyncMock,
    execSync: execSyncMock,
    default: { execFileSync: execFileSyncMock, execSync: execSyncMock },
  };
});

afterEach(() => {
  // restoreAllMocks (not clearAllMocks) also puts back the real implementation behind any
  // vi.spyOn in this file — a safety net for a test that forgets its own .mockRestore(), so a
  // mocked process.kill or console.warn can never leak into a later test.
  vi.restoreAllMocks();
});

describe('stopping the renderer dev server on the platform that spawned it', () => {
  it('kills the whole tree via taskkill on Windows, not process.kill, bounded by a timeout', () => {
    // The liveness check reuses process.kill (signal 0), so this also stands in for "the pid is
    // alive" — the taskkill-not-called assertion below is what proves it is a genuinely separate
    // call, not process.kill being used to do the killing.
    const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => true);

    killDevServerProcess(4242, 'win32');

    expect(execFileSync).toHaveBeenCalledExactlyOnceWith('taskkill', ['/pid', '4242', '/t', '/f'], {
      stdio: 'pipe',
      timeout: 10_000,
    });
    expect(killSpy).toHaveBeenCalledExactlyOnceWith(4242, 0);

    killSpy.mockRestore();
  });

  it('does not call taskkill at all when the pid is not alive', () => {
    // No mock: pid 4242 is not a real process in the test runner, so the real liveness check
    // reports it as gone — pinning that a dead pid never reaches taskkill, recycled or not.
    killDevServerProcess(4242, 'win32');

    expect(execFileSync).not.toHaveBeenCalled();
  });

  it('still calls taskkill when the liveness probe is refused with EPERM', () => {
    // A refused signal (Windows, or a pid owned by another user) proves the process EXISTS — the
    // same EPERM-is-alive reading `isPidAlive` in fixtures/helpers.ts makes for the backup-ownership
    // checks. Reading it as dead here would skip taskkill for a dev server that is actually still
    // running under a different permission context, leaving it holding the port.
    const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => {
      const error: NodeJS.ErrnoException = new Error('operation not permitted');
      error.code = 'EPERM';
      throw error;
    });

    killDevServerProcess(4242, 'win32');

    expect(execFileSync).toHaveBeenCalledExactlyOnceWith('taskkill', ['/pid', '4242', '/t', '/f'], {
      stdio: 'pipe',
      timeout: 10_000,
    });

    killSpy.mockRestore();
  });

  it('does not throw when taskkill itself fails on Windows (already stopped), and logs it', () => {
    const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => true);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.mocked(execFileSync).mockImplementationOnce(() => {
      throw new Error('no such process');
    });

    expect(() => killDevServerProcess(4242, 'win32')).not.toThrow();
    expect(warnSpy).toHaveBeenCalledExactlyOnceWith(expect.stringContaining('no such process'));

    killSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('signals the process group on POSIX, not taskkill', () => {
    const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => true);

    killDevServerProcess(4242, 'linux');

    expect(killSpy).toHaveBeenCalledExactlyOnceWith(-4242, 'SIGTERM');
    expect(execFileSync).not.toHaveBeenCalled();

    killSpy.mockRestore();
  });

  it('falls back to the bare PID on POSIX when the group signal fails', () => {
    const killSpy = vi
      .spyOn(process, 'kill')
      .mockImplementationOnce(() => {
        throw new Error('ESRCH');
      })
      .mockImplementationOnce(() => true);

    killDevServerProcess(4242, 'darwin');

    expect(killSpy).toHaveBeenNthCalledWith(1, -4242, 'SIGTERM');
    expect(killSpy).toHaveBeenNthCalledWith(2, 4242, 'SIGTERM');

    killSpy.mockRestore();
  });

  it('does not throw when both POSIX signals fail (already stopped)', () => {
    const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => {
      throw new Error('ESRCH');
    });

    expect(() => killDevServerProcess(4242, 'linux')).not.toThrow();

    killSpy.mockRestore();
  });
});
