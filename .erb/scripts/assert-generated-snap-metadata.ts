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
import JSON5 from 'json5';
import {
  checkGeneratedSnapMetadata,
  readSnapMetadata,
  resolveSnapArtifact,
} from './assert-generated-snap-metadata.util';

const REPO_ROOT = path.join(__dirname, '..', '..');

/** A plain object, for walking into parsed config without asserting a shape. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && !!value && !Array.isArray(value);
}

/**
 * Where electron-builder was told to put its output.
 *
 * Read from the config rather than restated here: a hardcoded copy that fell out of step would send
 * this check to an empty directory, and it would then report "no snap artifact found" -- blaming
 * the build for a wrong path.
 */
function readOutDir(): string {
  const config: unknown = JSON5.parse(
    readFileSync(path.join(REPO_ROOT, 'electron-builder.json5'), 'utf8'),
  );
  const directories = isRecord(config) ? config.directories : undefined;
  const output = isRecord(directories) ? directories.output : undefined;

  if (typeof output !== 'string')
    throw new Error(
      'electron-builder.json5 has no string `directories.output`, so there is no output directory ' +
        'to look for a snap in. If the config was restructured, this check needs revisiting.',
    );

  return path.join(REPO_ROOT, output);
}

function main(): void {
  const snapPath = resolveSnapArtifact(readOutDir());
  const problems = checkGeneratedSnapMetadata(readSnapMetadata(snapPath));

  if (problems.length > 0) {
    console.error(`The snap this build produced is wrong (${snapPath}):\n`);
    problems.forEach((problem) => console.error(`  - ${problem}\n`));
    process.exit(1);
  }

  console.log(`Snap mounts the correct GNOME platform plug (${snapPath}).`);
}

try {
  main();
} catch (error) {
  // A failure to find or read the metadata is a failure of the check, not a reason to skip it.
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
