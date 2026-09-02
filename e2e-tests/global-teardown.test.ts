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
vi.mock('node:child_process', () => {
  const execFileSyncMock = vi.fn();
  return {
    execFileSync: execFileSyncMock,
    default: { execFileSync: execFileSyncMock },
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('stopping the renderer dev server on the platform that spawned it', () => {
  it('kills the whole tree via taskkill on Windows, not process.kill', () => {
    const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => true);

    killDevServerProcess(4242, 'win32');

    expect(execFileSync).toHaveBeenCalledExactlyOnceWith('taskkill', ['/pid', '4242', '/t', '/f'], {
      stdio: 'pipe',
    });
    expect(killSpy).not.toHaveBeenCalled();

    killSpy.mockRestore();
  });

  it('does not throw when taskkill itself fails on Windows (already stopped)', () => {
    vi.mocked(execFileSync).mockImplementationOnce(() => {
      throw new Error('no such process');
    });

    expect(() => killDevServerProcess(4242, 'win32')).not.toThrow();
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
