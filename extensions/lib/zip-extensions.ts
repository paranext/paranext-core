import path from 'path';
import fs from 'fs';
import zipFolder from 'zip-folder-promise';
import { getExtensions, outputFolder } from '../webpack/webpack.util';
import { rootDir } from '../webpack/webpack.config.base';

/** Folder for where the zipped files should be placed */
const releaseFolder = path.join(rootDir, 'release');

/** Creates a zip for each extension and puts them in the release folder */
async function zipExtensions() {
  // Get all the extensions (this is technically based on source files, not on the output files)
  const extensions = await getExtensions();

  // Delete the release folder if it exists
  await fs.promises.rm(releaseFolder, { recursive: true, force: true });
  // Create the release folder as zipFolder doesn't work unless that folder exists
  await fs.promises.mkdir(releaseFolder, { recursive: true });

  const zipPromises = extensions.map(async (extension) => {
    try {
      /** Directory to zip. The output extension folder */
      const dirToZip = path.join(rootDir, outputFolder, extension.dirName);
      /**
       * The file to output. Into release folder.
       * `<extension_directory_name>_<extension_manifest_version>.zip`
       */
      const outputFile = path.join(releaseFolder, `${extension.dirName}_${extension.version}.zip`);

      return zipFolder(dirToZip, outputFile);
    } catch (e) {
      const error = `Error on zipping ${extension.dirName}: ${e}`;
      console.error(error);
      throw new Error(error);
    }
  });

  return Promise.all(zipPromises);
}

zipExtensions();
