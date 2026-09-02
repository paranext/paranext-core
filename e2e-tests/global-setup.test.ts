/**
 * Unit test for refreshing `.dev-server.log` when this run reuses a renderer dev server it did not
 * spawn.
 *
 * Nothing else writes to that file in that case, so a stale log left over from an earlier session
 * would sit there unchanged — and anyone tailing it to diagnose a failure in THIS run would be
 * reading someone else's output instead.
 */
import fs from 'fs';
import { describe, expect, it, vi } from 'vitest';
import { refreshDevServerLog } from './global-setup';

describe('refreshing the dev server log for a reused server', () => {
  it('empties the log file rather than leaving stale content in place', () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    refreshDevServerLog('/tmp/e2e-fixture/.dev-server.log');

    expect(writeSpy).toHaveBeenCalledExactlyOnceWith('/tmp/e2e-fixture/.dev-server.log', '');

    writeSpy.mockRestore();
  });
});
