#!/usr/bin/env node
/**
 * Verifies MDX files are formatted by remark.
 *
 * Reads each matched file, runs it through remark with the same plugins and
 * settings as .remarkrc.mjs, and compares the output to the original content.
 * Exits 1 and lists unformatted files if any differ.
 *
 * Files where remark is not idempotent (e.g. complex JSX inside attribute
 * expressions — a known remark-mdx limitation) are skipped rather than
 * flagged, since there is no stable target to compare against.
 *
 * Usage: node check-remark-format.mjs <glob> [<glob> ...]
 *
 * Example (root):   node .erb/scripts/check-remark-format.mjs "./src/**\/*.mdx"
 * Example (lib):    node ../../.erb/scripts/check-remark-format.mjs "**\/*.mdx"
 */

import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { readFileSync } from 'fs';
import pkg from 'glob';
const { glob } = pkg;
import path from 'path';

const patterns = process.argv.slice(2);
if (patterns.length === 0) {
  console.error('Usage: check-remark-format.mjs <glob> [<glob> ...]');
  process.exit(1);
}

// Mirror settings from .remarkrc.mjs (shared by root and lib configs)
const processor = remark()
  .use(remarkMdx)
  .use(remarkGfm)
  .data('settings', { bullet: '-', rule: '-' });

const files = patterns.flatMap((pattern) =>
  glob.sync(pattern, { ignore: ['**/node_modules/**'] }),
);

if (files.length === 0) process.exit(0);

// First pass: run all files through remark in parallel
const firstPass = await Promise.all(
  files.map(async (file) => {
    const original = readFileSync(file, 'utf8');
    return { file, original, r1: String(await processor.process(original)) };
  }),
);

// Second pass: idempotency check in parallel, only for files that differ
const needsCheck = firstPass.filter(({ original, r1 }) => r1 !== original);
const secondPass = await Promise.all(
  needsCheck.map(async ({ file, r1 }) => ({
    file,
    isIdempotent: String(await processor.process(r1)) === r1,
  })),
);

// A file needs formatting only if remark converges to a stable (but different) form
const unformatted = secondPass
  .filter(({ isIdempotent }) => isIdempotent)
  .map(({ file }) => path.normalize(file));

if (unformatted.length > 0) {
  console.error('The following MDX files are not formatted with remark:');
  for (const file of unformatted) {
    console.error(`  ${file}`);
  }
  console.error('\nRun the format script to fix them.');
  process.exit(1);
}
