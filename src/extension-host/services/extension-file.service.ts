import { joinUriPaths } from '@node/utils/util';
import { readFileText, writeFileText } from '@node/services/node-file-system.service';
import { ExecutionToken } from '@node/models/execution-token.model';
import executionTokenService from '@node/services/execution-token.service';

// #region Functions that need to be called by other services to initialize this service

let registeredUrisPerExtension: Map<string, string> = new Map();

/** This is only intended to be called by the extension service.
 *  This service cannot call into the extension service or it causes a circular dependency.
 */
export function setExtensionUris(urisPerExtension: Map<string, string>) {
  registeredUrisPerExtension = urisPerExtension;
}

// #endregion

// #region Helper functions

function isValidFileOrDirectoryName(name: string): boolean {
  // Check if the name contains any invalid characters
  const invalidChars = /[\\/:*?"<>|]/;
  if (invalidChars.test(name)) {
    return false;
  }
  // If the name passes all checks, it is considered valid
  return true;
}

export function sanitizeDirectoryName(str: string): string {
  // Replace any characters that are not alphanumeric or one of the following: -_.()
  const sanitized = str.replace(/[^a-zA-Z0-9-_.()]/g, '-');
  // Trim the resulting string and return it
  return sanitized.trim();
}

function buildPath(baseUri: string, subDir: string, fileName: string): string {
  if (!isValidFileOrDirectoryName(fileName)) throw new Error(`Invalid file name: ${fileName}`);
  if (!isValidFileOrDirectoryName(subDir)) throw new Error(`Invalid sub directory: ${subDir}`);

  return joinUriPaths(baseUri, subDir, fileName);
}

function buildExtensionPath(token: ExecutionToken, fileName: string): string {
  if (!executionTokenService.tokenIsValid(token)) throw new Error('Invalid token');
  const baseUri: string | undefined = registeredUrisPerExtension.get(token.name);
  if (!baseUri) throw new Error(`Extension directory for ${token.name} is not known`);

  return buildPath(baseUri, 'assets', fileName);
}

function buildUserDataPath(token: ExecutionToken, fileName: string): string {
  if (!executionTokenService.tokenIsValid(token)) throw new Error('Invalid token');
  const extensionSubDir: string = sanitizeDirectoryName(token.name);
  if (!extensionSubDir || extensionSubDir.length === 0) throw new Error('Bad extension name');

  return buildPath('app://', extensionSubDir, fileName);
}

// #endregion

// #region Exports intended to be used by extensions

/** Read a file from within the `assets` subdirectory of the extension's installation directory
 *  @param token ExecutionToken provided to the extension when `activate()` was called
 *  @param fileName Name of the file to be read
 *  @returns Promise for a string with the contents of the file
 */
function readFileFromInstallDirectory(token: ExecutionToken, fileName: string): Promise<string> {
  return readFileText(buildExtensionPath(token, fileName));
}

/** Read a file in a location specific to the user (as identified by the OS) and extension (as
 *  identified by the ExecutionToken)
 *  @param token ExecutionToken provided to the extension when `activate()` was called
 *  @param fileName Name of the file to be read
 *  @returns Promise for a string with the contents of the file
 */
function readUserFile(token: ExecutionToken, fileName: string): Promise<string> {
  return readFileText(buildUserDataPath(token, fileName));
}

/** Write a file to a location specific to the user (as identified by the OS) and extension (as
 *  identified by the ExecutionToken)
 *  @param token ExecutionToken provided to the extension when `activate()` was called
 *  @param fileName Name of the file to be written
 *  @param data Data to be written to the file
 *  @returns Promise that will resolve if the file is written successfully
 */
function writeUserFile(token: ExecutionToken, fileName: string, data: string): Promise<void> {
  return writeFileText(buildUserDataPath(token, fileName), data);
}

// TODO: Add functions to read/write to project files once we have something to represent projects

/** This service provides extensions in the extension host the ability to read/write files
 *  based on the extension identity and current user (as identified by the OS). This service will
 *  not work within the renderer.
 */
const extensionFileService = {
  readFileFromInstallDirectory,
  readUserFile,
  writeUserFile,
};

export default extensionFileService;

export type ExtensionFileService = typeof extensionFileService;

// #endregion
