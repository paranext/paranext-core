import { afterEach, describe, expect, it } from 'vitest';
import {
  identifyClientSecret,
  issueLaunchSecrets,
  revokeLaunchSecrets,
} from '@main/services/launch-secrets.service';

const BASE64URL_OF_32_BYTES = /^[A-Za-z0-9_-]{43}$/;

describe('launch secrets', () => {
  afterEach(() => {
    revokeLaunchSecrets('extensionHost');
    revokeLaunchSecrets('dotnetDataProvider');
  });

  it('issues two different base64url secrets of 32 bytes', () => {
    const { clientSecret, serverSecret } = issueLaunchSecrets('extensionHost');
    expect(clientSecret).toMatch(BASE64URL_OF_32_BYTES);
    expect(serverSecret).toMatch(BASE64URL_OF_32_BYTES);
    expect(clientSecret).not.toBe(serverSecret);
  });

  it('identifies a presented client secret', () => {
    const extensionHost = issueLaunchSecrets('extensionHost');
    const dotnet = issueLaunchSecrets('dotnetDataProvider');

    expect(identifyClientSecret(extensionHost.clientSecret)).toMatchObject({
      identity: 'extensionHost',
      serverSecret: extensionHost.serverSecret,
    });
    expect(identifyClientSecret(dotnet.clientSecret)).toMatchObject({
      identity: 'dotnetDataProvider',
      serverSecret: dotnet.serverSecret,
    });
  });

  it('rejects malformed input without throwing', () => {
    issueLaunchSecrets('extensionHost');
    ['', 'short', '='.repeat(43), 'a'.repeat(10_000)].forEach((presented) => {
      expect(identifyClientSecret(presented)).toBeUndefined();
    });
  });

  it('forgets the previous launch when secrets are issued again', () => {
    const first = issueLaunchSecrets('extensionHost');
    const firstLaunchId = identifyClientSecret(first.clientSecret)?.launchId;
    const second = issueLaunchSecrets('extensionHost');

    expect(identifyClientSecret(first.clientSecret)).toBeUndefined();
    const secondLaunch = identifyClientSecret(second.clientSecret);
    expect(secondLaunch?.identity).toBe('extensionHost');
    expect(secondLaunch?.launchId).not.toBe(firstLaunchId);
  });

  it('never matches the server secret as a client secret', () => {
    const { serverSecret } = issueLaunchSecrets('dotnetDataProvider');
    expect(identifyClientSecret(serverSecret)).toBeUndefined();
  });

  it('revokes', () => {
    const { clientSecret } = issueLaunchSecrets('dotnetDataProvider');
    revokeLaunchSecrets('dotnetDataProvider');
    expect(identifyClientSecret(clientSecret)).toBeUndefined();
  });
});
