/**
 * File system calls from Node
 */

import fs from 'fs';
import { Uri } from '@shared/data/FileSystemTypes';
import { getPathFromUri } from '@node/util/util';

/**
 * Reads a text file asynchronously
 * @param uri Uri of file
 * @returns promise that resolves to the contents of the file
 */
export async function readFileText(uri: Uri): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(getPathFromUri(uri), 'utf8', (err, data) => {
      if (err) reject(err.message);
      else resolve(data);
    });
  });
}

/**
 * Writes the string to a file asynchronously
 * @param uri Uri of file
 * @param fileContents string to write into the file
 * @returns promise that resolves after writing the file
 */
export async function writeFileText(
  uri: Uri,
  fileContents: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(getPathFromUri(uri), fileContents, (err) => {
      if (err) reject(err.message);
      else resolve();
    });
  });
}
