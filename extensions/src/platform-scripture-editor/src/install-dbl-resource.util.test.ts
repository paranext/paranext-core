import { afterEach, describe, expect, it, vi } from 'vitest';

// vi.hoisted so the spy exists before the hoisted vi.mock factory references it.
const { warn } = vi.hoisted(() => ({ warn: vi.fn() }));
vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn, error: vi.fn() },
}));

// Imported after the mock so the util picks up the mocked logger.
// eslint-disable-next-line import/first
import { installDblResource } from './install-dbl-resource.util';

afterEach(() => {
  vi.clearAllMocks();
});

describe('installDblResource', () => {
  it('returns false without installing when the provider has not resolved yet', async () => {
    const result = await installDblResource(undefined, 'uid-a', 'model text panel');
    expect(result).toBe(false);
  });

  it('installs the uid and returns true on success', async () => {
    const installDblResourceMethod = vi.fn(async () => {});
    const provider = { installDblResource: installDblResourceMethod };

    const result = await installDblResource(provider, 'uid-a', 'model text panel');

    expect(result).toBe(true);
    expect(installDblResourceMethod).toHaveBeenCalledWith('uid-a');
  });

  it('logs a warning and rethrows on failure (so the caller can show its install-failed state)', async () => {
    const error = new Error('install boom');
    const provider = {
      installDblResource: vi.fn(async () => {
        throw error;
      }),
    };

    await expect(installDblResource(provider, 'uid-a', 'resource text panel')).rejects.toThrow(
      'install boom',
    );
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('resource text panel'));
  });
});
