import { joinUriPaths } from '@node/utils/util';
import {
  readFileText,
  readFileBinary,
  writeFile,
  deleteFile,
} from '@node/services/node-file-system.service';
import { ExecutionToken } from '@node/models/execution-token.model';
import { executionTokenService } from '@node/services/execution-token.service';
import { Buffer } from 'node:buffer';
import { stringLength, includes } from 'platform-bible-utils';

// #region Functions that need to be called by other services to initialize this service

let registeredUrisPerExtension: Map<string, string> = new Map();

/**
 * This is only intended to be called by the extension service. This service cannot call into the
 * extension service or it causes a circular dependency.
 */
export function setExtensionUris(urisPerExtension: Map<string, string>) {
  registeredUrisPerExtension = urisPerExtension;
}

// #endregion

// #region Helper functions

/** Allow alphanumeric characters and the following: -_.()/\ */
function isValidFileOrDirectoryName(name: string): boolean {
  // Regex with no match returns null
  // eslint-disable-next-line no-null/no-null
  return /^[\w\d-_.()/\\]*$/.exec(name) !== null;
}

/** Replace any characters that are not alphanumeric or one of the following: -_.() */
function sanitizeDirectoryName(str: string): string {
  return str.replace(/[^\w\d-_.()]/g, '-').trim();
}

/** Return a path to the specified file within the extension's installation directory */
function buildExtensionPathFromToken(token: ExecutionToken, fileName: string): string {
  if (!executionTokenService.tokenIsValid(token)) throw new Error('Invalid token');
  return buildExtensionPathFromName(token.name, fileName);
}

/** Return a path to the specified file within the extension's installation directory */
export function buildExtensionPathFromName(extensionName: string, fileName: string): string {
  const baseUri: string | undefined = registeredUrisPerExtension.get(extensionName);
  if (!baseUri) throw new Error(`Extension directory for ${extensionName} is not known`);

  // TODO: If we really care about the potential to jump into other directories, this probably
  // needs some work. For example, this doesn't detect symlinks. There might be many other holes.
  if (!isValidFileOrDirectoryName(fileName)) throw new Error(`Invalid file name: ${fileName}`);
  if (includes(fileName, '..')) throw new Error('Cannot include ".." in the file name');

  return joinUriPaths(baseUri, fileName);
}

/**
 * Return a path to a file unique to:
 *
 * 1. The extension identified by the token,
 * 2. The current user (as identified by the OS), and
 * 3. The key provided by the extension
 */
function buildUserDataPath(token: ExecutionToken, key: string): string {
  if (!executionTokenService.tokenIsValid(token)) throw new Error('Invalid token');
  const subDir: string = sanitizeDirectoryName(token.name);
  if (!subDir || stringLength(subDir) === 0) throw new Error('Bad extension name');

  // From https://base64.guru/standards/base64url, the purpose of "base64url" encoding is
  // "the ability to use the encoding result as filename or URL address"
  const encodedKey: string = Buffer.from(key, 'utf-8').toString('base64url');

  return joinUriPaths('app://extensions', subDir, 'user-data', encodedKey);
}

// #endregion

// #region Functions to be exported

// TODO: Add functions to read/write to project files once we have something to represent projects

/**
 * Read a text file from the the extension's installation directory
 *
 * @param token ExecutionToken provided to the extension when `activate()` was called
 * @param fileName Name of the file to be read
 * @returns Promise for a string with the contents of the file
 */
async function readTextFileFromInstallDirectory(
  token: ExecutionToken,
  fileName: string,
): Promise<string> {
  return readFileText(buildExtensionPathFromToken(token, fileName));
}

/**
 * Read a binary file from the the extension's installation directory
 *
 * @param token ExecutionToken provided to the extension when `activate()` was called
 * @param fileName Name of the file to be read
 * @returns Promise for a Buffer with the contents of the file
 */
async function readBinaryFileFromInstallDirectory(
  token: ExecutionToken,
  fileName: string,
): Promise<Buffer> {
  return readFileBinary(buildExtensionPathFromToken(token, fileName));
}

/**
 * Read data specific to the user (as identified by the OS) and extension (as identified by the
 * ExecutionToken)
 *
 * @param token ExecutionToken provided to the extension when `activate()` was called
 * @param key Unique identifier of the data
 * @returns Promise for a string containing the data
 */
async function readUserData(token: ExecutionToken, key: string): Promise<string> {
  // This could be changed to some store other than the file system
  return readFileText(buildUserDataPath(token, key));
}

/**
 * Write data specific to the user (as identified by the OS) and extension (as identified by the
 * ExecutionToken)
 *
 * @param token ExecutionToken provided to the extension when `activate()` was called
 * @param key Unique identifier of the data
 * @param data Data to be written
 * @returns Promise that will resolve if the data is written successfully
 */
async function writeUserData(token: ExecutionToken, key: string, data: string): Promise<void> {
  // This could be changed to some store other than the file system
  return writeFile(buildUserDataPath(token, key), data);
}

/**
 * Delete data previously written that is specific to the user (as identified by the OS) and
 * extension (as identified by the ExecutionToken)
 *
 * @param token ExecutionToken provided to the extension when `activate()` was called
 * @param key Unique identifier of the data
 * @returns Promise that will resolve if the data is deleted successfully
 */
async function deleteUserData(token: ExecutionToken, key: string): Promise<void> {
  return deleteFile(buildUserDataPath(token, key));
}

// #endregion

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface ExtensionStorageService {
  readTextFileFromInstallDirectory: typeof readTextFileFromInstallDirectory;
  readBinaryFileFromInstallDirectory: typeof readBinaryFileFromInstallDirectory;
  readUserData: typeof readUserData;
  writeUserData: typeof writeUserData;
  deleteUserData: typeof deleteUserData;
}

/**
 * JSDOC SOURCE extensionStorageService
 *
 * This service provides extensions in the extension host the ability to read/write data based on
 * the extension identity and current user (as identified by the OS). This service will not work
 * within the renderer.
 */
export const extensionStorageService: ExtensionStorageService = {
  readTextFileFromInstallDirectory,
  readBinaryFileFromInstallDirectory,
  readUserData,
  writeUserData,
  deleteUserData,
};

export default extensionStorageService;
