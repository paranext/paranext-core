import { beforeEach, describe, expect, it, vi } from 'vitest';

async function loadFreshModule() {
  vi.resetModules();
  return import('@client/services/launch-credentials');
}

describe('launch credentials', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('hands the credentials out once', async () => {
    const { setLaunchCredentials, takeLaunchCredentials } = await loadFreshModule();
    setLaunchCredentials({ clientSecret: 'client', serverSecret: 'server' });

    expect(takeLaunchCredentials()).toEqual({ clientSecret: 'client', serverSecret: 'server' });
    expect(takeLaunchCredentials()).toBeUndefined();
  });

  it('has nothing to hand out when none were set', async () => {
    const { takeLaunchCredentials } = await loadFreshModule();

    expect(takeLaunchCredentials()).toBeUndefined();
  });

  it('is unidentified until marked', async () => {
    const { getLocalConnectionIdentity, markLocalConnectionIdentified } = await loadFreshModule();

    expect(getLocalConnectionIdentity()).toBe('unidentified');
    markLocalConnectionIdentified('extensionHost');
    expect(getLocalConnectionIdentity()).toBe('extensionHost');
  });
});
