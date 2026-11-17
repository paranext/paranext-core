import { beforeEach, describe, expect, it, vi } from 'vitest';

async function loadFreshModule() {
  vi.resetModules();
  return import('@client/services/launch-secrets');
}

describe('launch secrets', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('hands the secrets out once', async () => {
    const { setLaunchSecrets, takeLaunchSecrets } = await loadFreshModule();
    setLaunchSecrets({ clientSecret: 'client', serverSecret: 'server' });

    expect(takeLaunchSecrets()).toEqual({ clientSecret: 'client', serverSecret: 'server' });
    expect(takeLaunchSecrets()).toBeUndefined();
  });

  it('has nothing to hand out when none were set', async () => {
    const { takeLaunchSecrets } = await loadFreshModule();

    expect(takeLaunchSecrets()).toBeUndefined();
  });

  it('is unidentified until marked', async () => {
    const { getLocalConnectionIdentity, markLocalConnectionIdentified } = await loadFreshModule();

    expect(getLocalConnectionIdentity()).toBe('unidentified');
    markLocalConnectionIdentified('extensionHost');
    expect(getLocalConnectionIdentity()).toBe('extensionHost');
  });
});
