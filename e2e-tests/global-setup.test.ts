/**
 * Unit test for marking a run boundary in `.dev-server.log` when this run reuses a renderer dev
 * server it did not spawn.
 *
 * The server that owns the log is still running and still holds it open at its own write offset, so
 * truncating the path out from under that handle does not move the handle back to the start — its
 * next write lands past the new, shorter end of file, and the gap in between reads back as NUL
 * bytes rather than as either run's real output. Appending a boundary marker instead leaves the
 * still-open handle alone and gives anyone reading the file afterwards a place to start from.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it, vi } from 'vitest';
import { clearInheritedPidFile, markDevServerLogRunBoundary } from './global-setup';

describe('marking the dev server log for a reused server', () => {
  it('appends a boundary line rather than truncating a log a running child still holds open', () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync');
    const appendSpy = vi.spyOn(fs, 'appendFileSync').mockImplementation(() => {});

    markDevServerLogRunBoundary('/tmp/e2e-fixture/.dev-server.log');

    expect(writeSpy).not.toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalledExactlyOnceWith(
      '/tmp/e2e-fixture/.dev-server.log',
      expect.stringContaining('e2e run boundary'),
    );

    writeSpy.mockRestore();
    appendSpy.mockRestore();
  });

  it('marks the boundary with a leading newline, so it starts its own line regardless of what preceded it', () => {
    const appendSpy = vi.spyOn(fs, 'appendFileSync').mockImplementation(() => {});

    markDevServerLogRunBoundary('/tmp/e2e-fixture/.dev-server.log');

    const [, written] = appendSpy.mock.calls[0];
    expect(String(written).startsWith('\n')).toBe(true);

    appendSpy.mockRestore();
  });

  it('really appends to a file on disk, leaving what was already there intact', () => {
    // No fs mocking here: the two tests above only confirm which fs function gets called, which
    // would stay green even if that function's own behavior changed. This drives a real file
    // through the real function and reads it back, so a regression to a truncating write (or to
    // any other path that loses prior content) shows up as a failed read rather than a call that
    // still looks right.
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pt-e2e-dev-server-log-'));
    const logPath = path.join(tempDir, '.dev-server.log');
    const priorContent = 'webpack compiled successfully\n';
    fs.writeFileSync(logPath, priorContent);

    try {
      markDevServerLogRunBoundary(logPath);

      const contents = fs.readFileSync(logPath, 'utf-8');
      expect(contents.startsWith(priorContent)).toBe(true);
      expect(contents).toContain('e2e run boundary');
      expect(contents.length).toBeGreaterThan(priorContent.length);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});

describe('clearing an inherited dev-server pid file', () => {
  it('removes a pid file left behind by a run that spawned the server, not this one', () => {
    const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    const unlinkSpy = vi.spyOn(fs, 'unlinkSync').mockImplementation(() => {});

    clearInheritedPidFile('/tmp/e2e-fixture/.dev-server.pid');

    expect(unlinkSpy).toHaveBeenCalledExactlyOnceWith('/tmp/e2e-fixture/.dev-server.pid');

    existsSpy.mockRestore();
    unlinkSpy.mockRestore();
  });

  it('does nothing when there is no pid file to inherit', () => {
    const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const unlinkSpy = vi.spyOn(fs, 'unlinkSync').mockImplementation(() => {});

    clearInheritedPidFile('/tmp/e2e-fixture/.dev-server.pid');

    expect(unlinkSpy).not.toHaveBeenCalled();

    existsSpy.mockRestore();
    unlinkSpy.mockRestore();
  });
});
