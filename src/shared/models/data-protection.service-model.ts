// Functions that are exposed through the network object
/** JSDOC DESTINATION dataProtectionService */
export interface IDataProtectionService {
  /**
   * Encrypts a string using Electron's
   * [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API. Transforms the
   * returned buffer to a base64-encoded string using
   * [`buffer.toString('base64')`](https://nodejs.org/api/buffer.html#buftostringencoding-start-end).
   *
   * This method throws if the encryption mechanism is not available such as on Linux without a
   * supported package installed. See
   * [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) for more information.
   *
   * Note that this encryption mechanism is not transferrable between computers. We recommend using
   * it with `papi.storage` methods to store data safely.
   *
   * WARNING: This command passes the string across processes over WebSocket, so please note it is
   * not secure to the same extent that Electron's `safeStorage` API is.
   *
   * @param text String to encrypt
   * @returns Encrypted string. Use `papi.dataProtection.decryptString` to decrypt
   */
  encryptString(text: string): Promise<string>;
  /**
   * Decrypts a string using Electron's
   * [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API. Transforms the
   * input base64-encoded string to a buffer using [`Buffer.from(text,
   * 'base64')`](https://nodejs.org/api/buffer.html#static-method-bufferfromstring-encoding).
   *
   * This method throws if the decryption mechanism is not available such as on Linux without a
   * supported package installed. See
   * [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) for more information.
   *
   * Note that this encryption mechanism is not transferrable between computers. We recommend using
   * it with `papi.storage` methods to store data safely.
   *
   * WARNING: This command passes the string across processes over WebSocket, so please note it is
   * not secure to the same extent that Electron's `safeStorage` API is.
   *
   * @param encryptedText String to decrypt. This string should have been encrypted by
   *   `papi.dataProtection.encryptString`
   * @returns Decrypted string
   */
  decryptString(encryptedText: string): Promise<string>;
  /**
   * Returns `true` if encryption is currently available. Returns `false` if the decryption
   * mechanism is not available such as on Linux without a supported package installed. See
   * Electron's [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage) API for
   * more information.
   *
   * WARNING: This command passes the string across processes over WebSocket, so please note it is
   * not secure to the same extent that Electron's `safeStorage` API is.
   *
   * @returns `true` if encryption is currently available; `false` otherwise
   */
  isEncryptionAvailable(): Promise<boolean>;
}

export const dataProtectionServiceNetworkObjectName = 'DataProtectionService';
