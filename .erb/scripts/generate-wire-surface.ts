/**
 * CLI entry point: walks `src/**` and the bundled `extensions/src/**` (TypeScript) plus
 * `c-sharp/**` (C#), scans every file for the wire-visible registration patterns
 * `generate-wire-surface.util.ts` and `generate-wire-surface.csharp.util.ts` recognise, and writes
 * the result to `lib/papi-dts/wire-surface.json` — the generated-public-surface snapshot alongside
 * `papi.d.ts`. Run via `npm run build:wire-surface`, and as part of `npm run build` so CI's "verify
 * no files changed after build" step catches a stale snapshot.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  findStaleLivenessAnnotations,
  generateWireSurfaceDocument,
  serializeWireSurfaceDocument,
  VirtualFile,
} from './generate-wire-surface.util';

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

function walkFiles(
  absoluteRoot: string,
  relativeRoot: string,
  excludedDirNames: ReadonlySet<string>,
  isMatch: (fileName: string) => boolean,
): VirtualFile[] {
  const results: VirtualFile[] = [];

  function walk(absoluteDir: string, relativeDir: string): void {
    const entries = fs
      .readdirSync(absoluteDir, { withFileTypes: true })
      // The filesystem does not promise a stable enumeration order across platforms; sort so the
      // scan itself never depends on it (the output is also sorted independently of this).
      .sort((a, b) => a.name.localeCompare(b.name));

    entries.forEach((dirEntry) => {
      if (excludedDirNames.has(dirEntry.name)) return;

      const absolutePath = path.join(absoluteDir, dirEntry.name);
      const relativePath = relativeDir ? `${relativeDir}/${dirEntry.name}` : dirEntry.name;

      if (dirEntry.isDirectory()) {
        walk(absolutePath, relativePath);
        return;
      }
      if (!dirEntry.isFile()) return;
      if (!isMatch(dirEntry.name)) return;

      results.push({ path: relativePath, text: fs.readFileSync(absolutePath, 'utf8') });
    });
  }

  walk(absoluteRoot, relativeRoot);
  return results;
}

function collectSourceFiles(): VirtualFile[] {
  return SCAN_ROOTS.flatMap((root) =>
    walkFiles(
      path.join(REPO_ROOT, root),
      root,
      EXCLUDED_DIR_NAMES,
      (fileName) => /\.tsx?$/.test(fileName) && !/\.test\.tsx?$/.test(fileName),
    ),
  );
}

function collectCSharpFiles(): VirtualFile[] {
  return walkFiles(
    path.join(REPO_ROOT, CSHARP_SCAN_ROOT),
    CSHARP_SCAN_ROOT,
    CSHARP_EXCLUDED_DIR_NAMES,
    (fileName) => fileName.endsWith('.cs'),
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

console.log(
  `Generated wire surface snapshot at ${OUTPUT_PATH}: ${document.registrations.length} declared ` +
    `registrations (${csharpRegistrationCount} C#), ${document.dynamicRegistrations.length} dynamic ` +
    `(unresolvable-name) registrations (${csharpDynamicCount} C#).`,
);
