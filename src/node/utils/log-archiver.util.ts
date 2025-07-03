import log, { LogFile } from 'electron-log';
import path from 'path';
import fs from 'fs';

/** Max number of log files including the current one and archived old ones */
const NUM_LOG_FILES = 5;
/** Number of bytes the log file should be allowed to be before archiving and starting a new file */
// 3 MB
const LOG_FILE_MAX_SIZE_BYTES = 3 * 1024 * 1024;

// Set the max log file size
log.transports.file.maxSize = LOG_FILE_MAX_SIZE_BYTES;

// archiveLogFn maintains NUM_LOG_FILES number of log files. Modified from default found at
// https://github.com/megahertz/electron-log/blob/HEAD/docs/transports/file.md#archivelogfn-oldlogfile-logfile--void
log.transports.file.archiveLogFn = (oldLogFile: LogFile) => {
  const oldFilePath = oldLogFile.toString();
  const oldFilePathInfo = path.parse(oldFilePath);

  // Rename archive files oldest-to-newest
  // The original file is "0", so we don't need to loop on 0
  for (let i = NUM_LOG_FILES - 1; i > 0; i--) {
    const existingFilePath =
      i - 1 > 0
        ? path.join(
            oldFilePathInfo.dir,
            `${oldFilePathInfo.name}.old-${i - 1}${oldFilePathInfo.ext}`,
          )
        : oldFilePath;
    const newFilePath = path.join(
      oldFilePathInfo.dir,
      `${oldFilePathInfo.name}.old-${i}${oldFilePathInfo.ext}`,
    );
    try {
      fs.renameSync(existingFilePath, newFilePath);
    } catch (e) {
      if (!(e instanceof Error) || !('code' in e) || e.code !== 'ENOENT') {
        // Don't want to create an infinite loop by logging in a function run on log
        // eslint-disable-next-line no-console
        console.warn('Could not rotate log', e);

        // Something actually went wrong, so stop renaming
        return;
      }

      // There wasn't already an old file at this index, which is fine. Continue
    }
  }
};
