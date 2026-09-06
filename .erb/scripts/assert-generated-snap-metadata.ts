/**
 * Asserts that the snap electron-builder actually generated mounts exactly one GNOME platform plug,
 * named and provided for the platform snap that pairs with its own `base`.
 *
 * Run after a packaging run that built a snap. Its companion,
 * `electron-builder-snap-config.test.ts`, checks the same pairing from the inputs -- this repo's
 * config and the patched snapcraft template -- and runs in milliseconds on every OS. Neither
 * replaces the other: everything that turns those inputs into the shipped plug list lives in
 * app-builder-lib's `snap.js` and is visible only from here.
 */

import { readFileSync } from 'fs';
import path from 'path';
import {
  checkGeneratedSnapMetadata,
  resolveGeneratedSnapMetadataPath,
} from './assert-generated-snap-metadata.util';

/** Matches `directories.output` in `electron-builder.json5`. */
const OUT_DIR = path.join(__dirname, '..', '..', 'release', 'build');

function main(): void {
  const metadataPath = resolveGeneratedSnapMetadataPath(OUT_DIR);
  const problems = checkGeneratedSnapMetadata(readFileSync(metadataPath, 'utf8'));

  if (problems.length > 0) {
    console.error(`Generated snap metadata is wrong (${metadataPath}):\n`);
    problems.forEach((problem) => console.error(`  - ${problem}\n`));
    process.exit(1);
  }

  console.log(`Generated snap metadata mounts the correct GNOME platform plug (${metadataPath}).`);
}

try {
  main();
} catch (error) {
  // A failure to find or read the metadata is a failure of the check, not a reason to skip it.
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
