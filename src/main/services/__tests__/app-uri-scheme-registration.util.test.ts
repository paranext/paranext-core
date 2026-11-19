import { beforeEach, describe, expect, it, vi } from 'vitest';
import { registerAppUriScheme } from '@main/services/app-uri-scheme-registration.util';
import { logger } from '@shared/services/logger.service';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

const SCHEME = 'platform-bible';
const LAUNCH_PATH = '/opt/platform-bible/platform-bible';
const ARGS = ['--no-sandbox'];

describe('registerAppUriScheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not ask Electron to register the scheme inside a snap, and logs no error', () => {
    const setAsDefaultProtocolClient = vi.fn(() => false);

    registerAppUriScheme(SCHEME, LAUNCH_PATH, ARGS, setAsDefaultProtocolClient, {
      SNAP: '/snap/platform-bible/x4',
    });

    expect(setAsDefaultProtocolClient).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalledWith(expect.stringContaining('desktop file'));
  });

  it('registers the scheme outside a snap', () => {
    const setAsDefaultProtocolClient = vi.fn(() => true);

    registerAppUriScheme(SCHEME, LAUNCH_PATH, ARGS, setAsDefaultProtocolClient, {});

    expect(setAsDefaultProtocolClient).toHaveBeenCalledWith(SCHEME, LAUNCH_PATH, ARGS);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('logs an error outside a snap when Electron reports the registration failed', () => {
    const setAsDefaultProtocolClient = vi.fn(() => false);

    registerAppUriScheme(SCHEME, LAUNCH_PATH, ARGS, setAsDefaultProtocolClient, {});

    expect(setAsDefaultProtocolClient).toHaveBeenCalledWith(SCHEME, LAUNCH_PATH, ARGS);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(`as the ${SCHEME}:// URI handler`),
    );
  });
});
