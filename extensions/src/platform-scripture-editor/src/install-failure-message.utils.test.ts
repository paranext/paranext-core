import { describe, expect, it } from 'vitest';
import {
  getInstallFailureMessageKey,
  type InstallFailureMessageKeys,
} from './install-failure-message.utils';

const KEYS: InstallFailureMessageKeys = {
  failed: '%test_failed%',
  failedOffline: '%test_failedOffline%',
  installedButUnavailable: '%test_installedButUnavailable%',
};

describe('getInstallFailureMessageKey', () => {
  it('reports a rejected install plainly while online', () => {
    expect(getInstallFailureMessageKey('installRejected', true, KEYS)).toBe(KEYS.failed);
  });

  it('adds the connection hint to a rejected install while offline', () => {
    expect(getInstallFailureMessageKey('installRejected', false, KEYS)).toBe(KEYS.failedOffline);
  });

  it('says the resource is installed, with no connection hint, when the catalog has not caught up', () => {
    expect(getInstallFailureMessageKey('listNotConverging', false, KEYS)).toBe(
      KEYS.installedButUnavailable,
    );
    expect(getInstallFailureMessageKey('listNotConverging', true, KEYS)).toBe(
      KEYS.installedButUnavailable,
    );
  });
});
