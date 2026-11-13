import { describe, expect, it } from 'vitest';
import { REGISTRY_TOKEN_REQUEST_TYPE } from '@node/services/request-registry-tokens.service-model';
import { dataProtectionServiceNetworkObjectName } from '@shared/models/data-protection.service-model';
import * as requestAccess from './request-access.data';
import {
  getRequestAccessRule,
  isCallAllowed,
  isRegistrationAllowed,
  parseAllowedCallers,
} from './request-access.data';

const RESTRICTED_REQUEST_TYPES = [
  'requestRegistryTokens:getAccessToken',
  'object:paratextRegistration.internetSettingsDataProvider-data.setInternetSettings',
  'command:paratextRegistration.setParatextDataInternetSettings',
  'command:paratextRegistration.setParatextRegistrationData',
  'command:paratextRegistration.resetForFirstRun',
  'command:platform.resetFirstRun',
  'object:DataProtectionService.encryptString',
  'object:DataProtectionService.decryptString',
  'command:platform.getLogFileContent',
];

describe('request access table', () => {
  it('refuses an unidentified caller every table row', () => {
    RESTRICTED_REQUEST_TYPES.forEach((requestType) => {
      expect(isCallAllowed(requestType, 'unidentified')).toBe(false);
      expect(isCallAllowed(requestType, 'main')).toBe(true);
    });
  });

  it('allows exactly the listed callers', () => {
    expect(isCallAllowed('requestRegistryTokens:getAccessToken', 'extensionHost')).toBe(true);
    expect(isCallAllowed('requestRegistryTokens:getAccessToken', 'renderer')).toBe(false);
    expect(isCallAllowed('requestRegistryTokens:getAccessToken', 'dotnetDataProvider')).toBe(false);
    expect(isCallAllowed('command:platform.resetFirstRun', 'renderer')).toBe(true);
    expect(isCallAllowed('command:platform.resetFirstRun', 'extensionHost')).toBe(false);
    expect(
      isCallAllowed('command:paratextRegistration.setParatextRegistrationData', 'renderer'),
    ).toBe(true);
    expect(
      isCallAllowed('command:paratextRegistration.setParatextRegistrationData', 'extensionHost'),
    ).toBe(true);
    expect(isCallAllowed('command:paratextRegistration.resetForFirstRun', 'renderer')).toBe(false);
    expect(isCallAllowed('command:paratextRegistration.resetForFirstRun', 'extensionHost')).toBe(
      false,
    );
    expect(isCallAllowed('object:DataProtectionService.decryptString', 'renderer')).toBe(false);
    expect(isCallAllowed('command:platform.getLogFileContent', 'renderer')).toBe(true);
  });

  it('covers a new request type in a controlled category', () => {
    expect(isCallAllowed('requestRegistryTokens:somethingNew', 'renderer')).toBe(false);
    expect(isCallAllowed('requestRegistryTokens:somethingNew', 'extensionHost')).toBe(true);
  });

  it('does not treat a longer category name as the controlled one', () => {
    expect(getRequestAccessRule('requestRegistryTokensX:foo')).toBeUndefined();
    expect(getRequestAccessRule('command:platform.getLogFileContentX')).toBeUndefined();
  });

  it('lets only the registrant register', () => {
    const tokens = 'requestRegistryTokens:getAccessToken';
    expect(isRegistrationAllowed(tokens, 'dotnetDataProvider')).toBe(true);
    expect(isRegistrationAllowed(tokens, 'unidentified')).toBe(false);
    expect(isRegistrationAllowed(tokens, 'extensionHost')).toBe(false);
    expect(isRegistrationAllowed(tokens, 'main')).toBe(false);
    expect(isRegistrationAllowed('command:platform.getLogFileContent', 'main')).toBe(true);
    expect(isRegistrationAllowed('command:platform.getLogFileContent', 'renderer')).toBe(false);
    expect(isRegistrationAllowed('command:anything.else', 'unidentified')).toBe(true);
  });

  it('applies a registrant restriction to unlisted request types', () => {
    expect(isCallAllowed('command:x.y', 'unidentified', ['renderer'])).toBe(false);
    expect(isCallAllowed('command:x.y', 'extensionHost', ['renderer'])).toBe(false);
    expect(isCallAllowed('command:x.y', 'renderer', ['renderer'])).toBe(true);
    expect(isCallAllowed('command:x.y', 'main', ['renderer'])).toBe(true);
    expect(isCallAllowed('command:x.y', 'unidentified')).toBe(true);
  });

  it('does not let a registrant restriction widen a table row', () => {
    expect(
      isCallAllowed('command:platform.getLogFileContent', 'extensionHost', ['extensionHost']),
    ).toBe(false);
  });

  it('is frozen', () => {
    const exportedFunctionNames = Object.entries(requestAccess)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name)
      .sort();
    expect(exportedFunctionNames).toEqual([
      'getRequestAccessRule',
      'isCallAllowed',
      'isRegistrationAllowed',
      'parseAllowedCallers',
    ]);

    RESTRICTED_REQUEST_TYPES.forEach((requestType) => {
      const rule = getRequestAccessRule(requestType);
      expect(rule).toBeDefined();
      expect(Object.isFrozen(rule)).toBe(true);
      expect(Object.isFrozen(rule?.callers)).toBe(true);
    });
  });

  it('rejects a malformed allowedCallers', () => {
    expect(parseAllowedCallers(undefined)).toBeUndefined();
    expect(parseAllowedCallers(['renderer'])).toEqual(['renderer']);
    expect(parseAllowedCallers(['renderer', 'extensionHost', 'dotnetDataProvider'])).toEqual([
      'renderer',
      'extensionHost',
      'dotnetDataProvider',
    ]);
    ['renderer', [1], ['main'], ['unidentified'], {}, JSON.parse('null')].forEach((malformed) => {
      expect(() => parseAllowedCallers(malformed)).toThrow();
    });
  });

  it('matches the request types the real handlers register', () => {
    expect(getRequestAccessRule(REGISTRY_TOKEN_REQUEST_TYPE)).toBeDefined();
    expect(
      getRequestAccessRule(`object:${dataProtectionServiceNetworkObjectName}.encryptString`),
    ).toBeDefined();
    expect(
      getRequestAccessRule(`object:${dataProtectionServiceNetworkObjectName}.decryptString`),
    ).toBeDefined();
  });
});
