/**
 * File system calls from Node
 */

import fs, { BigIntStats } from 'fs';
import path from 'path';
import { Uri } from '@shared/data/file-system.model';
import { getPathFromUri, joinUriPaths } from '@node/utils/util';
import { groupBy } from '@shared/utils/util';

/**
 * Reads a text file asynchronously
 * @param uri URI of file
 * @returns promise that resolves to the contents of the file
 */
export async function readFileText(uri: Uri): Promise<string> {
  return fs.promises.readFile(getPathFromUri(uri), 'utf8');
}

/**
 * Reads a binary file asynchronously
 * @param uri URI of file
 * @returns promise that resolves to the contents of the file
 */
export async function readFileBinary(uri: Uri): Promise<Buffer> {
  return fs.promises.readFile(getPathFromUri(uri));
}

/**
 * Writes the data to a file asynchronously
 * @param uri URI of file
 * @param fileContents string or Buffer to write into the file
 * @returns promise that resolves after writing the file
 */
export async function writeFile(uri: Uri, fileContents: string | Buffer): Promise<void> {
  const filePath: string = getPathFromUri(uri);
  const directoryName: string = path.dirname(filePath);
  await fs.promises.mkdir(directoryName, { recursive: true });
  return fs.promises.writeFile(filePath, fileContents);
}

/**
 * Delete a file if it exists
 * @param uri URI of file
 * @returns promise that resolves when the file is deleted or determined to not exist
 */
export async function deleteFile(uri: Uri): Promise<void> {
  const filePath: string = getPathFromUri(uri);
  if (fs.existsSync(filePath)) await fs.promises.rm(filePath);
}

/**
 * Get stats about the file. Note that BigInts are used instead of ints to avoid
 * https://en.wikipedia.org/wiki/Year_2038_problem
 * @param uri URI of file
 * @returns Promise to object of type https://nodejs.org/api/fs.html#class-fsstats representing the file stats
 */
export async function getFileStats(uri: Uri): Promise<BigIntStats | undefined> {
  const filePath: string = getPathFromUri(uri);
  return fs.existsSync(filePath) ? fs.promises.stat(filePath, { bigint: true }) : undefined;
}

/**
 * Set the last modified and accessed times for the file
 * @param uri URI of file
 * @returns Promise that resolves if the operation completed, rejects otherwise
 */
export async function touchFile(uri: Uri, date: Date): Promise<void> {
  const filePath: string = getPathFromUri(uri);
  if (fs.existsSync(filePath)) await fs.promises.utimes(filePath, date, date);
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
 * @param uri URI of directory
 * @param entryFilter function to filter out entries in the directory based on their names
 * @returns map of entry type to list of uris for each entry in the directory with that type
 */
export async function readDir(
  uri: Uri,
  entryFilter?: (entryName: string) => boolean,
): Promise<DirectoryEntries> {
  const dirPath: string = getPathFromUri(uri);
  if (!fs.existsSync(dirPath)) return <DirectoryEntries>{};
  const unfilteredDirEntries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  const dirEntries = entryFilter
    ? unfilteredDirEntries.filter((dirent) => entryFilter(dirent.name))
    : unfilteredDirEntries;
  return Object.fromEntries(
    groupBy(
      dirEntries,
      (dirEntry): EntryType => {
        if (dirEntry.isFile()) return EntryType.File;
        if (dirEntry.isDirectory()) return EntryType.Directory;
        return EntryType.Unknown;
      },
      (dirent) => joinUriPaths(uri, dirent.name),
    ),
  ) as DirectoryEntries;
}

/**
 * Create a directory in the file system
 * @param uri URI of directory
 * @returns Promise that resolves once the directory has been created
 */
export async function createDir(uri: Uri): Promise<void> {
  const dirPath: string = getPathFromUri(uri);
  await fs.promises.mkdir(dirPath, { recursive: true });
}

/**
 * Remove a directory and all its contents recursively from the file system
 * @param uri URI of directory
 * @param force Boolean indicating whether to pass the `force` flag to the system call, defaults to `false`
 * @returns Promise that resolves to true if the directory existed and was deleted, false if it didn't exist
 */
export async function deleteDir(uri: Uri, force: boolean = false): Promise<boolean> {
  const dirPath: string = getPathFromUri(uri);
  if (!fs.existsSync(dirPath)) return false;

  const dirStat = await fs.promises.stat(dirPath);
  if (!dirStat.isDirectory()) return Promise.reject(new Error(`${uri} is not a directory`));

  await fs.promises.rm(dirPath, { recursive: true, force, maxRetries: 1 });
  return true;
}
