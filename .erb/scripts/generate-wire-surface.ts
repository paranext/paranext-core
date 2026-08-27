/**
 * CLI entry point: walks `src/**` and the bundled `extensions/src/**`, scans every TypeScript file
 * for the wire-visible registration patterns `generate-wire-surface.util.ts` recognises, and writes
 * the result to `lib/papi-dts/wire-surface.json` — the generated-public-surface snapshot alongside
 * `papi.d.ts`. Run via `npm run build:wire-surface`, and as part of `npm run build` so CI's "verify
 * no files changed after build" step catches a stale snapshot.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  generateWireSurfaceDocument,
  serializeWireSurfaceDocument,
  VirtualFile,
} from './generate-wire-surface.util';

const REPO_ROOT = path.resolve(__dirname, '../..');
const SCAN_ROOTS = ['src', 'extensions/src'];
const EXCLUDED_DIR_NAMES = new Set(['node_modules', 'dist', 'temp-build', '__tests__']);
const OUTPUT_PATH = path.resolve(REPO_ROOT, 'lib/papi-dts/wire-surface.json');

function collectSourceFiles(): VirtualFile[] {
  const results: VirtualFile[] = [];

  function walk(absoluteDir: string, relativeDir: string): void {
    const entries = fs
      .readdirSync(absoluteDir, { withFileTypes: true })
      // The filesystem does not promise a stable enumeration order across platforms; sort so the
      // scan itself never depends on it (the output is also sorted independently of this).
      .sort((a, b) => a.name.localeCompare(b.name));

    entries.forEach((dirEntry) => {
      if (EXCLUDED_DIR_NAMES.has(dirEntry.name)) return;

      const absolutePath = path.join(absoluteDir, dirEntry.name);
      const relativePath = relativeDir ? `${relativeDir}/${dirEntry.name}` : dirEntry.name;

      if (dirEntry.isDirectory()) {
        walk(absolutePath, relativePath);
        return;
      }
      if (!dirEntry.isFile()) return;
      if (!/\.tsx?$/.test(dirEntry.name)) return;
      if (/\.test\.tsx?$/.test(dirEntry.name)) return;

      results.push({ path: relativePath, text: fs.readFileSync(absolutePath, 'utf8') });
    });
  }

  SCAN_ROOTS.forEach((root) => walk(path.join(REPO_ROOT, root), root));

  return results;
}

const files = collectSourceFiles();
const document = generateWireSurfaceDocument(files);
const serialized = serializeWireSurfaceDocument(document);

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, serialized);

console.log(
  `Generated wire surface snapshot at ${OUTPUT_PATH}: ${document.registrations.length} declared ` +
    `registrations, ${document.dynamicRegistrations.length} dynamic (unresolvable-name) registrations.`,
);
