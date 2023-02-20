/**
 * File system calls from Node
 */

import fs from 'fs';
import { Uri } from '@shared/data/FileSystemTypes';
import { getPathFromUri, joinUris } from '@node/util/util';
import { groupBy } from '@shared/util/Util';

/**
 * Reads a text file asynchronously
 * @param uri Uri of file
 * @returns promise that resolves to the contents of the file
 */
export function readFileText(uri: Uri): Promise<string> {
  return fs.promises.readFile(getPathFromUri(uri), 'utf8');
}

/**
 * Writes the string to a file asynchronously
 * @param uri Uri of file
 * @param fileContents string to write into the file
 * @returns promise that resolves after writing the file
 */
export function writeFileText(uri: Uri, fileContents: string): Promise<void> {
  return fs.promises.writeFile(getPathFromUri(uri), fileContents);
}

/** Type of file system item in a directory */
export enum EntryType {
  File = 'file',
  Directory = 'directory',
  Unknown = 'unknown',
}

/** All entries in a directory, mapped from entry type to array of uris for the entries */
export type DirectoryEntries = Readonly<{
  [entryType in EntryType]: Uri[];
}>;

/**
 * Reads a directory and returns lists of entries in the directory by entry type
 * @param uri uri of directory
 * @returns map of entry type to list of uris for each entry in the directory with that type
 */
export async function readDir(uri: Uri): Promise<DirectoryEntries> {
  const dirents = await fs.promises.readdir(getPathFromUri(uri), {
    withFileTypes: true,
  });
  return Object.fromEntries(
    groupBy(
      dirents,
      (dirent): EntryType => {
        if (dirent.isFile()) return EntryType.File;
        if (dirent.isDirectory()) return EntryType.Directory;
        return EntryType.Unknown;
      },
      (dirent) => joinUris(uri, dirent.name),
    ),
  ) as DirectoryEntries;
}
