/** File system calls from Node */

import fs, { BigIntStats } from 'fs';
import path from 'path';
import { Uri } from '@shared/data/file-system.model';
import { getPathFromUri, joinUriPaths } from '@node/utils/util';
import { groupBy } from '@shared/utils/util';

/**
 * Read a text file
 *
 * @param uri URI of file
 * @returns Promise that resolves to the contents of the file
 */
export async function readFileText(uri: Uri): Promise<string> {
  return fs.promises.readFile(getPathFromUri(uri), 'utf8');
}

/**
 * Read a binary file
 *
 * @param uri URI of file
 * @returns Promise that resolves to the contents of the file
 */
export async function readFileBinary(uri: Uri): Promise<Buffer> {
  return fs.promises.readFile(getPathFromUri(uri));
}

/**
 * Write data to a file
 *
 * @param uri URI of file
 * @param fileContents String or Buffer to write into the file
 * @returns Promise that resolves after writing the file
 */
export async function writeFile(uri: Uri, fileContents: string | Buffer): Promise<void> {
  const filePath: string = getPathFromUri(uri);
  const directoryName: string = path.dirname(filePath);
  await fs.promises.mkdir(directoryName, { recursive: true });
  return fs.promises.writeFile(filePath, fileContents);
}

/**
 * Delete a file if it exists
 *
 * @param uri URI of file
 * @returns Promise that resolves when the file is deleted or determined to not exist
 */
export async function deleteFile(uri: Uri): Promise<void> {
  const stats = await getStats(uri);
  if (stats && stats.isFile()) await fs.promises.rm(getPathFromUri(uri));
}

/**
 * Get stats about the file or directory. Note that BigInts are used instead of ints to avoid.
 * https://en.wikipedia.org/wiki/Year_2038_problem
 *
 * @param uri URI of file or directory
 * @returns Promise that resolves to object of type https://nodejs.org/api/fs.html#class-fsstats if
 *   file or directory exists, undefined if it doesn't
 */
export async function getStats(uri: Uri): Promise<BigIntStats | undefined> {
  try {
    return await fs.promises.stat(getPathFromUri(uri), { bigint: true });
  } catch (error) {
    return undefined;
  }
}

/**
 * Set the last modified and accessed times for the file or directory
 *
 * @param uri URI of file or directory
 * @returns Promise that resolves once the touch operation finishes
 */
export async function touch(uri: Uri, date: Date): Promise<void> {
  await fs.promises.utimes(getPathFromUri(uri), date, date);
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
 * Fill in each missing EntryType with an empty array.
 *
 * @param entryMap - Map of Uris to entry type. Defaults to empty map.
 * @returns Updated entryMap with missing properties filled with empty arrays.
 */
function fillMissingEntryTypeProperties(
  entryMap: Map<EntryType, Uri[]> = new Map(),
): Map<EntryType, Uri[]> {
  Object.values(EntryType).forEach((entryType) => {
    if (!entryMap.has(entryType)) entryMap.set(entryType, []);
  });
  return entryMap;
}

/**
 * Reads a directory and returns lists of entries in the directory by entry type.
 *
 * @param uri - URI of directory.
 * @param entryFilter - Function to filter out entries in the directory based on their names.
 * @returns Map of entry type to list of uris for each entry in the directory with that type.
 */
export async function readDir(
  uri: Uri,
  entryFilter?: (entryName: string) => boolean,
): Promise<DirectoryEntries> {
  const stats = await getStats(uri);
  if (!stats || !stats.isDirectory())
    // Assert return type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return Object.freeze(Object.fromEntries(fillMissingEntryTypeProperties())) as DirectoryEntries;

  const unfilteredDirEntries = await fs.promises.readdir(getPathFromUri(uri), {
    withFileTypes: true,
  });
  const dirEntries = entryFilter
    ? unfilteredDirEntries.filter((dirent) => entryFilter(dirent.name))
    : unfilteredDirEntries;

  // Group each entry by EntryType
  const entryMap: Map<EntryType, Uri[]> = groupBy(
    dirEntries,
    (dirEntry): EntryType => {
      if (dirEntry.isFile()) return EntryType.File;
      if (dirEntry.isDirectory()) return EntryType.Directory;
      return EntryType.Unknown;
    },
    (dirent) => joinUriPaths(uri, dirent.name),
  );

  fillMissingEntryTypeProperties(entryMap);

  // Assert return type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return Object.freeze(Object.fromEntries(entryMap)) as DirectoryEntries;
}

/**
 * Create a directory in the file system
 *
 * @param uri URI of directory
 * @returns Promise that resolves once the directory has been created
 */
export async function createDir(uri: Uri): Promise<void> {
  const dirPath: string = getPathFromUri(uri);
  await fs.promises.mkdir(dirPath, { recursive: true });
}

/**
 * Remove a directory and all its contents recursively from the file system
 *
 * @param uri URI of directory
 * @returns Promise that resolves when the delete operation finishes
 */
export async function deleteDir(uri: Uri): Promise<void> {
  const stats = await getStats(uri);
  if (!stats || !stats.isDirectory()) return;
  await fs.promises.rm(getPathFromUri(uri), { recursive: true, maxRetries: 1 });
}
