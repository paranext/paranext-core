import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { IDataProtectionService } from '@shared/models/data-protection.service-model';

const mocks = vi.hoisted(() => {
  const syncCallNotAllowed = (name: string) =>
    vi.fn(() => {
      throw new Error(`${name} is deprecated in Electron 45; use its async replacement`);
    });
  return {
    safeStorage: {
      getSelectedStorageBackend: vi.fn(),
      setUsePlainTextEncryption: vi.fn(),
      isAsyncEncryptionAvailable: vi.fn(),
      encryptStringAsync: vi.fn(),
      decryptStringAsync: vi.fn(),
      isEncryptionAvailable: syncCallNotAllowed('isEncryptionAvailable'),
      encryptString: syncCallNotAllowed('encryptString'),
      decryptString: syncCallNotAllowed('decryptString'),
    },
    setNetworkObject: vi.fn(),
    warn: vi.fn(),
  };
});

vi.mock('electron', () => ({ safeStorage: mocks.safeStorage }));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: mocks.setNetworkObject },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: mocks.warn, error: vi.fn(), debug: vi.fn() },
}));

// The module under test, imported after the mocks above are established.
// eslint-disable-next-line import/first
import { startDataProtectionService } from '@main/services/data-protection.service-host';

const originalPlatform = process.platform;

function setPlatform(platform: typeof process.platform) {
  Object.defineProperty(process, 'platform', { value: platform, configurable: true });
}

/** Registers the service and returns the object it hands to the network object service */
async function getService(): Promise<IDataProtectionService> {
  mocks.setNetworkObject.mockClear();
  await startDataProtectionService();
  const [[, service]] = mocks.setNetworkObject.mock.calls;
  return service;
}

describe('data protection service host', () => {
  beforeEach(() => {
    setPlatform('win32');
    mocks.safeStorage.getSelectedStorageBackend.mockReset();
    mocks.safeStorage.setUsePlainTextEncryption.mockReset();
    mocks.safeStorage.isAsyncEncryptionAvailable.mockReset().mockResolvedValue(true);
    mocks.safeStorage.encryptStringAsync.mockReset();
    mocks.safeStorage.decryptStringAsync.mockReset();
    mocks.safeStorage.isEncryptionAvailable.mockClear();
    mocks.safeStorage.encryptString.mockClear();
    mocks.safeStorage.decryptString.mockClear();
    mocks.warn.mockReset();
  });

  afterEach(() => {
    setPlatform(originalPlatform);
    vi.unstubAllEnvs();
  });

  it('encryptString uses encryptStringAsync and returns base64', async () => {
    mocks.safeStorage.encryptStringAsync.mockResolvedValue(Buffer.from('cipher'));
    const service = await getService();

    await expect(service.encryptString('plain')).resolves.toBe('Y2lwaGVy');
    expect(mocks.safeStorage.encryptStringAsync).toHaveBeenCalledWith('plain');
  });

  it('decryptString uses decryptStringAsync and returns its result', async () => {
    mocks.safeStorage.decryptStringAsync.mockResolvedValue({
      result: 'plain',
      shouldReEncrypt: false,
    });
    const service = await getService();

    await expect(service.decryptString(Buffer.from('cipher').toString('base64'))).resolves.toBe(
      'plain',
    );
    expect(mocks.warn).not.toHaveBeenCalled();
  });

  it('passes the stored ciphertext bytes to decryptStringAsync unchanged', async () => {
    const legacyCiphertext = Buffer.from([0x76, 0x31, 0x30, 0x00, 0xff, 0x7f]);
    mocks.safeStorage.decryptStringAsync.mockResolvedValue({
      result: 'stored before the upgrade',
      shouldReEncrypt: false,
    });
    const service = await getService();

    await expect(service.decryptString(legacyCiphertext.toString('base64'))).resolves.toBe(
      'stored before the upgrade',
    );
    const [[passed]] = mocks.safeStorage.decryptStringAsync.mock.calls;
    expect(Buffer.isBuffer(passed)).toBe(true);
    expect(Buffer.compare(passed, legacyCiphertext)).toBe(0);
  });

  it('logs a warning when shouldReEncrypt is true', async () => {
    mocks.safeStorage.decryptStringAsync.mockResolvedValue({
      result: 'plain',
      shouldReEncrypt: true,
    });
    const service = await getService();

    await expect(service.decryptString(Buffer.from('cipher').toString('base64'))).resolves.toBe(
      'plain',
    );
    expect(mocks.warn).toHaveBeenCalledTimes(1);
  });

  it('isEncryptionAvailable is false on Linux with basic_text and no ALLOW_BASIC_TEXT_KEYRING', async () => {
    setPlatform('linux');
    vi.stubEnv('ALLOW_BASIC_TEXT_KEYRING', '');
    mocks.safeStorage.getSelectedStorageBackend.mockReturnValue('basic_text');
    const service = await getService();

    await expect(service.isEncryptionAvailable()).resolves.toBe(false);
    await expect(service.encryptString('plain')).rejects.toThrow('No keyring service');
    expect(mocks.safeStorage.encryptStringAsync).not.toHaveBeenCalled();
    expect(mocks.safeStorage.setUsePlainTextEncryption).not.toHaveBeenCalled();
  });

  it('ALLOW_BASIC_TEXT_KEYRING=true allows basic_text', async () => {
    setPlatform('linux');
    vi.stubEnv('ALLOW_BASIC_TEXT_KEYRING', 'true');
    mocks.safeStorage.getSelectedStorageBackend.mockReturnValue('basic_text');
    mocks.safeStorage.encryptStringAsync.mockResolvedValue(Buffer.from('v10cipher'));
    const service = await getService();

    await expect(service.isEncryptionAvailable()).resolves.toBe(true);
    await expect(service.encryptString('plain')).resolves.toBe(
      Buffer.from('v10cipher').toString('base64'),
    );
  });

  describe('Linux with a keyring backend selected', () => {
    beforeEach(() => {
      setPlatform('linux');
      vi.stubEnv('ALLOW_BASIC_TEXT_KEYRING', '');
      mocks.safeStorage.getSelectedStorageBackend.mockReturnValue('gnome_libsecret');
    });

    it('refuses when the keyring does not answer and Chromium falls back to its fixed key', async () => {
      mocks.safeStorage.encryptStringAsync.mockResolvedValue(Buffer.from('v10cipher'));
      const service = await getService();

      await expect(service.isEncryptionAvailable()).resolves.toBe(false);
      await expect(service.encryptString('secret')).rejects.toThrow('No keyring service');
      await expect(service.decryptString('Y2lwaGVy')).rejects.toThrow('No keyring service');
      expect(mocks.safeStorage.encryptStringAsync).not.toHaveBeenCalledWith('secret');
      expect(mocks.safeStorage.decryptStringAsync).not.toHaveBeenCalled();
    });

    it('encrypts when the keyring holds the key', async () => {
      mocks.safeStorage.encryptStringAsync.mockResolvedValue(Buffer.from('v11cipher'));
      const service = await getService();

      await expect(service.isEncryptionAvailable()).resolves.toBe(true);
      await expect(service.encryptString('secret')).resolves.toBe(
        Buffer.from('v11cipher').toString('base64'),
      );
      expect(mocks.safeStorage.encryptStringAsync).toHaveBeenCalledWith('secret');
    });

    it('allows the fixed key when ALLOW_BASIC_TEXT_KEYRING=true', async () => {
      vi.stubEnv('ALLOW_BASIC_TEXT_KEYRING', 'true');
      mocks.safeStorage.encryptStringAsync.mockResolvedValue(Buffer.from('v10cipher'));
      const service = await getService();

      await expect(service.isEncryptionAvailable()).resolves.toBe(true);
      await expect(service.encryptString('secret')).resolves.toBe(
        Buffer.from('v10cipher').toString('base64'),
      );
    });
  });

  it('isEncryptionAvailable is false when isAsyncEncryptionAvailable resolves false', async () => {
    mocks.safeStorage.isAsyncEncryptionAvailable.mockResolvedValue(false);
    const service = await getService();

    await expect(service.isEncryptionAvailable()).resolves.toBe(false);
    await expect(service.decryptString('Y2lwaGVy')).rejects.toThrow();
    expect(mocks.safeStorage.decryptStringAsync).not.toHaveBeenCalled();
  });

  it('no synchronous safeStorage encrypt/decrypt/isEncryptionAvailable is called', async () => {
    mocks.safeStorage.encryptStringAsync.mockResolvedValue(Buffer.from('cipher'));
    mocks.safeStorage.decryptStringAsync.mockResolvedValue({
      result: 'plain',
      shouldReEncrypt: false,
    });
    const service = await getService();

    await service.isEncryptionAvailable();
    await service.encryptString('plain');
    await service.decryptString('Y2lwaGVy');

    expect(mocks.safeStorage.isEncryptionAvailable).not.toHaveBeenCalled();
    expect(mocks.safeStorage.encryptString).not.toHaveBeenCalled();
    expect(mocks.safeStorage.decryptString).not.toHaveBeenCalled();
  });
});
