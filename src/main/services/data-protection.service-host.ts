import {
  dataProtectionServiceNetworkObjectName,
  IDataProtectionService,
} from '@shared/models/data-protection.service-model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { safeStorage } from 'electron';

/** If encryption is not available, return reason why. If encryption is available, return `undefined` */
async function getReasonEncryptionIsNotAvailable(): Promise<string | undefined> {
  if (process.platform === 'linux') {
    const backend = safeStorage.getSelectedStorageBackend();
    if (!backend || backend === 'basic_text') {
      if (process.env.ALLOW_BASIC_TEXT_KEYRING === 'true') {
        safeStorage.setUsePlainTextEncryption(true);
        return undefined;
      }
      return 'No keyring service that safeStorage can encrypt with is available on this system. Install one of the supported services to continue; the setup steps are documented at https://github.com/paranext/paranext/wiki/How-to-set-up-Platform.Bible-on-Linux#how-secrets-are-stored';
    }
  }
  if (!(await safeStorage.isAsyncEncryptionAvailable())) {
    return 'safeStorage.isAsyncEncryptionAvailable returned false';
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
  // This service only decrypts; the caller stores the ciphertext, so there is nowhere here to put a
  // re-encrypted value. Callers that want the new key's protection must encrypt and store again.
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
