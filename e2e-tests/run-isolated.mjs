#!/usr/bin/env node
// Runner for the `isolated` e2e suite — the common set of locally-runnable tests, organized in
// subdirectories by feature under `e2e-tests/tests/isolated/`.
//
//   npm run test:e2e:isolated                     List the available subsets (exits non-zero; runs nothing)
//   npm run test:e2e:isolated all                 Run every isolated test
//   npm run test:e2e:isolated <subset>            Run one subdirectory (e.g. scroll-groups)
//   npm run test:e2e:isolated <path>              Run a path filter (e.g. tests/isolated/scroll-groups/)
//   npm run test:e2e:isolated <subset> -- --debug Extra args after `--` go to Playwright
//   npm run test:e2e:isolated -- --list           Flags go straight to Playwright (all subsets)
import { spawnSync } from 'child_process';
import { readdirSync } from 'fs';
import { createRequire } from 'module';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const e2eDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(e2eDir, '..');
const isolatedDir = join(e2eDir, 'tests', 'isolated');

const subsets = readdirSync(isolatedDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

function printUsage() {
  console.log('Isolated e2e subsets (each test launches its own Electron instance):\n');
  subsets.forEach((subset) => console.log(`  ${subset}`));
  console.log(`
Usage:
  npm run test:e2e:isolated all                  Run every isolated test
  npm run test:e2e:isolated <subset>             Run one subset (e.g. ${subsets[0]})
  npm run test:e2e:isolated <subset> -- --debug  Extra args after -- go to Playwright
  npm run test:e2e:isolated -- --list            Enumerate individual tests`);
}

const [first, ...rest] = process.argv.slice(2);

if (!first) {
  // No subset given: list what's available but exit non-zero — nothing ran, so a scripted caller
  // (or muscle memory expecting the old run-everything script) does not get a false green.
  printUsage();
  process.exit(1);
}

const playwrightArgs = [
  'test',
  '--config',
  relative(repoRoot, join(e2eDir, 'playwright.config.ts')),
  '--project=isolated',
];

// A path (contains a separator) is passed straight to Playwright as a path filter, preserving the
// old `test:e2e:isolated -- <path>` behavior alongside the bare subset-name shorthand.
const isPath = first.includes('/') || first.includes('\\');

if (first === 'all') {
  // No path filter: run every isolated test
  playwrightArgs.push(...rest);
} else if (first.startsWith('-') || subsets.includes(first) || isPath) {
  // A flag (e.g. --list, --grep), a subset directory name, or a path. Playwright treats a positional
  // arg as a path filter, so the subdirectory name selects that subset.
  playwrightArgs.push(first, ...rest);
} else {
  console.error(`Unknown subset '${first}'.\n`);
  printUsage();
  process.exit(1);
}

const require = createRequire(import.meta.url);
const playwrightCli = require.resolve('@playwright/test/cli');
const result = spawnSync(process.execPath, [playwrightCli, ...playwrightArgs], {
  stdio: 'inherit',
  cwd: repoRoot,
});
process.exit(result.status ?? 1);
