/**
 * CLI entry point: walks `src/**` and the bundled `extensions/src/**` (TypeScript) plus
 * `c-sharp/**` (C#), scans every file for the wire-visible registration patterns
 * `generate-wire-surface.util.ts` and `generate-wire-surface.csharp.util.ts` recognise, and writes
 * the result to `lib/papi-dts/wire-surface.json` — the generated-public-surface snapshot alongside
 * `papi.d.ts`. Run via `npm run build:wire-surface`, and as part of `npm run build` so CI's "verify
 * no files changed after build" step catches a stale snapshot.
 */

import * as childProcess from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import {
  findStaleLivenessAnnotations,
  generateWireSurfaceDocument,
  serializeWireSurfaceDocument,
  VirtualFile,
} from './generate-wire-surface.util';
import { compareCodeUnits } from './generate-wire-surface.csharp.util';

const REPO_ROOT = path.resolve(__dirname, '../..');
const SCAN_ROOTS = ['src', 'extensions/src'];
const EXCLUDED_DIR_NAMES = new Set(['node_modules', 'dist', 'temp-build', '__tests__']);
const CSHARP_SCAN_ROOT = 'c-sharp';
// Paranext.Analyzers[.Tests] are Roslyn tooling, not part of the wire surface, and its test project
// specifically embeds C#-look-alike source inside string fixtures that this pattern-based scanner
// has no business trying to interpret as real declarations.
const CSHARP_EXCLUDED_DIR_NAMES = new Set([
  'bin',
  'obj',
  'Paranext.Analyzers',
  'Paranext.Analyzers.Tests',
]);

/**
 * Repo-relative paths of every file git tracks under the given roots, in git's own order.
 *
 * The wire surface is a property of committed source, so the scan reads the INDEX rather than the
 * filesystem. Walking the filesystem instead made the generated snapshot depend on build state: a
 * build writes files into these trees, so a machine that had built saw a different set from one
 * that had not, and two platforms that had built saw different sets again. The artifact is
 * regenerated on three platforms and compared byte for byte, so its input has to be the same set
 * everywhere.
 *
 * One consequence to know: a newly created file is invisible here until it is staged. That suits
 * the commit-time and CI paths, which are the ones that gate.
 */
function listTrackedFiles(roots: readonly string[]): string[] {
  const result = childProcess.spawnSync('git', ['ls-files', '-z', '--', ...roots], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  // Fail loudly rather than fall back to a filesystem walk: a silent fallback would reintroduce the
  // build-state dependence on exactly the machine where git is unavailable, and the snapshot would
  // look healthy while being generated from a different input set.
  if (result.error)
    throw new Error(
      `Could not run git to list tracked files (${result.error.message}). This generator reads the ` +
        `git index deliberately; it has no filesystem fallback because that would make its output ` +
        `depend on build state.`,
    );
  if (result.status !== 0)
    throw new Error(
      `git ls-files exited ${result.status}: ${result.stderr.trim()}. Run this from a git checkout.`,
    );
  // Sorted here rather than relying on git's index order: that order is byte-sorted today, but it
  // is an assumption about another tool, and this file's output has to be identical on three
  // platforms.
  return result.stdout
    .split('\u0000')
    .filter((entry) => entry.length > 0)
    .sort(compareCodeUnits);
}

function readTracked(
  roots: readonly string[],
  excludedDirNames: ReadonlySet<string>,
  isMatch: (fileName: string) => boolean,
): VirtualFile[] {
  return listTrackedFiles(roots)
    .filter((filePath) => {
      const segments = filePath.split('/');
      const fileName = segments[segments.length - 1] ?? '';
      if (!isMatch(fileName)) return false;
      return !segments.slice(0, -1).some((segment) => excludedDirNames.has(segment));
    })
    .map((filePath) => ({
      path: filePath,
      text: fs.readFileSync(path.join(REPO_ROOT, filePath), 'utf8'),
    }));
}

function collectSourceFiles(): VirtualFile[] {
  return readTracked(
    SCAN_ROOTS,
    EXCLUDED_DIR_NAMES,
    (fileName) => /\.tsx?$/.test(fileName) && !/\.test\.tsx?$/.test(fileName),
  );
}

function collectCSharpFiles(): VirtualFile[] {
  return readTracked([CSHARP_SCAN_ROOT], CSHARP_EXCLUDED_DIR_NAMES, (fileName) =>
    fileName.endsWith('.cs'),
  );
}

const OUTPUT_PATH = path.resolve(REPO_ROOT, 'lib/papi-dts/wire-surface.json');

const files = collectSourceFiles();
const csharpFiles = collectCSharpFiles();
const document = generateWireSurfaceDocument(files, csharpFiles);

// This scan is the real, whole codebase (unlike this module's unit tests, which scan small fixture
// file sets and would trip this check on every annotated name they don't happen to include) -- so a
// name in LIVENESS_ANNOTATIONS that matches nothing here means the registration was renamed or
// removed and the annotation was not updated to follow. Fail loudly rather than let it rot unnoticed.
const staleLivenessAnnotations = findStaleLivenessAnnotations(document.registrations);
if (staleLivenessAnnotations.length > 0) {
  throw new Error(
    `LIVENESS_ANNOTATIONS (generate-wire-surface.util.ts) names a registration that no longer ` +
      `exists -- fix or remove the stale entry before regenerating: ` +
      `${staleLivenessAnnotations.join(', ')}`,
  );
}

const serialized = serializeWireSurfaceDocument(document);

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, serialized);

const csharpRegistrationCount = document.registrations.filter(
  (r) => r.language === 'csharp',
).length;
const csharpDynamicCount = document.dynamicRegistrations.filter(
  (r) => r.language === 'csharp',
).length;

// Two digests, because they answer different questions when a platform regenerates this file
// differently. The INPUT digest covers exactly the bytes the scan read; the OUTPUT digest covers
// what it produced. Together they partition the failure:
//
// - input digests equal, output digests differ -> the generator itself is not deterministic.
// - input digests differ -> the scan read a different tree, which is what a generator racing a
//   task that writes into the trees it scans looks like.
//
// An output digest alone cannot tell those apart: it only restates what the staleness gate already
// reported. The input array's order is fixed by the sorted directory walk, so this is stable by
// construction rather than by luck.
const inputDigest = crypto
  .createHash('sha256')
  .update([...files, ...csharpFiles].map((file) => `${file.path}\u0000${file.text}`).join('\u0000'))
  .digest('hex')
  .slice(0, 16);
const outputDigest = crypto.createHash('sha256').update(serialized).digest('hex').slice(0, 16);

console.log(
  `Scanned ${files.length} TypeScript and ${csharpFiles.length} C# source files; ` +
    `input digest ${inputDigest}, output digest ${outputDigest}.`,
);
console.log(
  `Generated wire surface snapshot at ${OUTPUT_PATH}: ${document.registrations.length} declared ` +
    `registrations (${csharpRegistrationCount} C#), ${document.dynamicRegistrations.length} dynamic ` +
    `(unresolvable-name) registrations (${csharpDynamicCount} C#).`,
);
