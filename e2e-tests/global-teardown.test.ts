/**
 * Unit tests for the renderer dev server's platform-addressed kill.
 *
 * `killDevServerProcess` is a one-line delegate to {@link killProcessTree}. The cross-platform kill
 * mechanics themselves — taskkill vs. process-group signalling, the ESRCH/EPERM liveness reads —
 * are pinned directly against `killProcessTree` in `fixtures/helpers.test.ts`. What stays here is
 * specific to this call site: that `killDevServerProcess` forwards its pid, SIGTERM, and platform
 * through unchanged, plus one integration case (EPERM-means-alive) that is not exercised anywhere
 * else, since `helpers.test.ts`'s own `killProcessTree` tests inject `isPidAlive` directly rather
 * than going through its real EPERM interpretation.
 */
import { execFileSync } from 'node:child_process';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { killProcessTree } from './fixtures/helpers';
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

// Wraps the real killProcessTree rather than replacing it, so every test below still exercises the
// actual kill logic (through the node:child_process mock above and each test's own process.kill
// spy) while still giving `killDevServerProcess`'s forwarded arguments something to assert against.
vi.mock('./fixtures/helpers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./fixtures/helpers')>();
  return { ...actual, killProcessTree: vi.fn(actual.killProcessTree) };
});

afterEach(() => {
  // restoreAllMocks (not clearAllMocks) also puts back the real implementation behind any
  // vi.spyOn in this file — a safety net for a test that forgets its own .mockRestore(), so a
  // mocked process.kill or console.warn can never leak into a later test.
  vi.restoreAllMocks();
});

describe('stopping the renderer dev server on the platform that spawned it', () => {
  it('delegates to killProcessTree with SIGTERM and the pid/platform it was given', () => {
    const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => true);

    killDevServerProcess(4242, 'win32');

    expect(killProcessTree).toHaveBeenCalledExactlyOnceWith(4242, 'SIGTERM', 'win32');

    killSpy.mockRestore();
  });

  it('forwards whatever platform it is given, not just win32', () => {
    const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => true);

    killDevServerProcess(4242, 'linux');

    expect(killProcessTree).toHaveBeenCalledExactlyOnceWith(4242, 'SIGTERM', 'linux');

    killSpy.mockRestore();
  });

  it('still calls taskkill when the liveness probe is refused with EPERM', () => {
    // A refused signal (Windows, or a pid owned by another user) proves the process EXISTS — the
    // same EPERM-is-alive reading `isPidAlive` in fixtures/helpers.ts makes for the backup-ownership
    // checks. Reading it as dead here would skip taskkill for a dev server that is actually still
    // running under a different permission context, leaving it holding the port. This is the one
    // case not already covered by killProcessTree's own tests in helpers.test.ts, which inject
    // isPidAlive directly rather than exercising its real EPERM interpretation.
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
});
