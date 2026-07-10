#!/usr/bin/env node
// Runner for the `isolated` e2e suite — the common set of locally-runnable tests, organized in
// subdirectories by feature under `e2e-tests/tests/isolated/`.
//
//   npm run test:e2e:isolated                     List the available subsets and usage
//   npm run test:e2e:isolated all                 Run every isolated test
//   npm run test:e2e:isolated <subset>            Run one subdirectory (e.g. scroll-groups)
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
  printUsage();
  process.exit(0);
}

const playwrightArgs = [
  'test',
  '--config',
  relative(repoRoot, join(e2eDir, 'playwright.config.ts')),
  '--project=isolated',
];

if (first.startsWith('-')) {
  // Flags only (e.g. --list, --grep): pass straight through, no subset filter
  playwrightArgs.push(first, ...rest);
} else if (first === 'all') {
  playwrightArgs.push(...rest);
} else if (subsets.includes(first)) {
  // Playwright treats positional args as path filters; the subdirectory name selects the subset
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
