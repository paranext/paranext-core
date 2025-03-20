import {
  dataProtectionServiceNetworkObjectName,
  IDataProtectionService,
} from '@shared/models/data-protection.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import { safeStorage } from 'electron';

/** If encryption is not available, return reason why. If encryption is available, return `undefined` */
function getReasonEncryptionIsNotAvailable() {
  if (process.platform === 'linux' && safeStorage.getSelectedStorageBackend() === 'basic_text')
    return 'safeStorage did not find a keyring service it could use for encryption. Please install a supported service. See https://github.com/paranext/paranext/wiki/How-to-set-up-Platform.Bible-on-Linux#install-a-keyring-service for more information';
  if (!safeStorage.isEncryptionAvailable()) {
    return 'safeStorage.isEncryptionAvailable returned false';
  }
  return undefined;
}

/** If encryption is not available, throw */
function validateEncryptionAvailable() {
  const reason = getReasonEncryptionIsNotAvailable();
  if (reason) {
    throw new Error(reason);
  }
}

async function isEncryptionAvailable() {
  return getReasonEncryptionIsNotAvailable() === undefined;
}

async function encryptString(text: string) {
  validateEncryptionAvailable();
  const buffer = safeStorage.encryptString(text);
  return buffer.toString('base64');
}

async function decryptString(encryptedText: string) {
  validateEncryptionAvailable();
  const buffer = Buffer.from(encryptedText, 'base64');
  return safeStorage.decryptString(buffer);
}

const dataProtectionService: IDataProtectionService = {
  isEncryptionAvailable,
  encryptString,
  decryptString,
};

/** Register the network object that backs this service */
// This doesn't really represent this service module, so we're not making it default. To use this
// service, you should use `data-protection.service.ts`
// eslint-disable-next-line import/prefer-default-export
export async function startDataProtectionService(): Promise<void> {
  await networkObjectService.set<IDataProtectionService>(
    dataProtectionServiceNetworkObjectName,
    dataProtectionService,
  );
}
