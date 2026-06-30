#!/usr/bin/env tsx
// One-off build-time CLI that prints results for the operator; not part of the
// runtime where the platform logger would otherwise be required.
/* eslint-disable no-console */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { auditScss } from './audit';

// The commentaries whose SCSS is generated from a committed CSS snapshot. Keep in sync with the
// keys in extensions/.../use-commentary-marker-styles.hook.ts.
const RESOURCES = ['hbkeng', 'tnn', 'tnd'];

// tools/pt9-css-converter/src -> repo root. Resolved from the script location so the audit works
// regardless of the caller's cwd.
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const CSS_DIR = path.join(REPO_ROOT, 'data/pt9-css');
const MARKER_STYLES_DIR = path.join(
  REPO_ROOT,
  'extensions/src/platform-scripture-editor/src/marker-styles',
);
const BASE_SCSS = path.join(
  REPO_ROOT,
  'extensions/src/platform-scripture-editor/src/_usj-nodes.scss',
);

// Report the first line where committed and freshly-converted SCSS diverge, so the operator can see
// what drifted without paging through the whole file.
function firstDifference(expected: string, actual: string): string {
  const expectedLines = expected.split('\n');
  const actualLines = actual.split('\n');
  const max = Math.max(expectedLines.length, actualLines.length);
  for (let i = 0; i < max; i += 1) {
    if (expectedLines[i] !== actualLines[i]) {
      return [
        `    first difference at line ${i + 1}:`,
        `      committed:  ${JSON.stringify(expectedLines[i])}`,
        `      regenerated:${JSON.stringify(actualLines[i])}`,
      ].join('\n');
    }
  }
  return '    (files differ only in length)';
}

function main(): void {
  const baseScss = readFileSync(BASE_SCSS, 'utf-8');
  let drift = false;

  RESOURCES.forEach((id) => {
    const css = readFileSync(path.join(CSS_DIR, `${id}.css`), 'utf-8');
    const committedScss = readFileSync(path.join(MARKER_STYLES_DIR, `${id}.scss`), 'utf-8');
    const result = auditScss(committedScss, css, { baseScss });
    if (result.inSync) {
      console.log(`✓ ${id}: marker-styles/${id}.scss matches data/pt9-css/${id}.css`);
    } else {
      drift = true;
      console.error(`✗ ${id}: marker-styles/${id}.scss is OUT OF SYNC with data/pt9-css/${id}.css`);
      console.error(firstDifference(result.expected, result.actual));
    }
  });

  if (drift) {
    console.error(
      '\nDrift detected. Re-run the converter (see tools/pt9-css-converter/README.md) or fix the source CSS.',
    );
    process.exit(1);
  }
  console.log(
    `\nAll ${RESOURCES.length} commentary stylesheets are in sync with their source CSS.`,
  );
}

function isMainModule(): boolean {
  if (!process.argv[1]) return false;
  try {
    return import.meta.url === pathToFileURL(process.argv[1]).href;
  } catch {
    return false;
  }
}

if (isMainModule()) main();
