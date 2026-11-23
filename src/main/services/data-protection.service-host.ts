import {
  dataProtectionServiceNetworkObjectName,
  IDataProtectionService,
} from '@shared/models/data-protection.service-model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { safeStorage } from 'electron';

const NO_LINUX_KEYRING_REASON =
  'No keyring service that safeStorage can encrypt with is available on this system. Install one of the supported services to continue; the setup steps are documented at https://github.com/paranext/paranext/wiki/How-to-set-up-Platform.Bible-on-Linux#how-secrets-are-stored';

/**
 * Tag at the start of ciphertext that Chromium encrypted on Linux with its fixed fallback key. That
 * key is derived from a constant in Chromium's source, so anyone can decrypt such ciphertext.
 */
const LINUX_FALLBACK_KEY_TAG = 'v10';

/**
 * Whether async safeStorage on Linux is encrypting with Chromium's fixed fallback key rather than a
 * key held by a keyring service.
 *
 * When the selected backend is a keyring that does not answer (for example, no Secret Service on
 * the session bus), `isAsyncEncryptionAvailable` still resolves `true` and `encryptStringAsync`
 * falls back to that fixed key. Neither call nor `getSelectedStorageBackend` reveals this, so
 * encrypt a probe value and read its tag. A keyring-held key writes `v11`.
 */
async function isLinuxUsingFallbackKey(): Promise<boolean> {
  const probe = await safeStorage.encryptStringAsync('keyring probe');
  return (
    probe.subarray(0, LINUX_FALLBACK_KEY_TAG.length).toString('latin1') === LINUX_FALLBACK_KEY_TAG
  );
}

/** If encryption is not available, return reason why. If encryption is available, return `undefined` */
async function getReasonEncryptionIsNotAvailable(): Promise<string | undefined> {
  const isLinux = process.platform === 'linux';
  if (isLinux) {
    const backend = safeStorage.getSelectedStorageBackend();
    if (!backend || backend === 'basic_text') {
      if (process.env.ALLOW_BASIC_TEXT_KEYRING === 'true') {
        safeStorage.setUsePlainTextEncryption(true);
        return undefined;
      }
      return NO_LINUX_KEYRING_REASON;
    }
  }
  if (!(await safeStorage.isAsyncEncryptionAvailable())) {
    return 'safeStorage.isAsyncEncryptionAvailable returned false';
  }
  if (
    isLinux &&
    process.env.ALLOW_BASIC_TEXT_KEYRING !== 'true' &&
    (await isLinuxUsingFallbackKey())
  ) {
    return NO_LINUX_KEYRING_REASON;
  }
  return undefined;
}

/** If encryption is not available, throw */
async function validateEncryptionAvailable() {
  const reason = await getReasonEncryptionIsNotAvailable();
  if (reason) {
    throw new Error(reason);
  }
}

async function isEncryptionAvailable() {
  return (await getReasonEncryptionIsNotAvailable()) === undefined;
}

async function encryptString(text: string) {
  await validateEncryptionAvailable();
  const buffer = await safeStorage.encryptStringAsync(text);
  return buffer.toString('base64');
}

async function decryptString(encryptedText: string) {
  await validateEncryptionAvailable();
  const buffer = Buffer.from(encryptedText, 'base64');
  const { result, shouldReEncrypt } = await safeStorage.decryptStringAsync(buffer);
  // The caller owns the stored ciphertext, so this method can't replace it, and callers aren't told.
  // TODO: surface shouldReEncrypt so callers can re-encrypt and store again.
  if (shouldReEncrypt)
    logger.warn(
      'safeStorage reports that decrypted data should be re-encrypted (its key was rotated or a stronger one is available); this service cannot store it, so the caller keeps the old ciphertext',
    );
  return result;
}

const dataProtectionService: IDataProtectionService = {
  isEncryptionAvailable,
  encryptString,
  decryptString,
};

/** Register the network object that backs this service */
export async function startDataProtectionService(): Promise<void> {
  await networkObjectService.set<IDataProtectionService>(
    dataProtectionServiceNetworkObjectName,
    dataProtectionService,
  );
}
