/**
 * Adds a single shadcn/ui component, applies standard file transformations, runs format and
 * lint-fix, and commits the result as a clean baseline. Mirrors apply-shadcn-preset.ts's
 * commit-on-success behavior.
 *
 * Run via: npm run add-shadcn-component -- <component-name> <preset>
 */

import { execFileSync, execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  applyTransformationsToFiles,
  parseProtectedVarsFromIndexCss,
} from './shadcn-transform-utils';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const LIB_DIR = join(SCRIPT_DIR, '..');
const INDEX_CSS = join(LIB_DIR, 'src', 'index.css');

export function main(): void {
  // Step 1: Get the component name and preset from CLI args
  const component = process.argv[2];
  const preset = process.argv[3];
  if (!component || !preset) {
    process.stderr.write('Usage: npm run add-shadcn-component -- <component-name> <preset>\n');
    process.exit(1);
  }

  // Step 2: Abort if there are uncommitted working changes
  const gitStatus = execSync('git status --porcelain', {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  if (gitStatus.trim()) {
    process.stderr.write('Aborting: there are uncommitted working changes:\n');
    process.stderr.write(gitStatus);
    process.exit(1);
  }

  console.log(`Adding shadcn component "${component}"…`);

  const problems: string[] = [];

  // Step 3: Run `npx shadcn add <component> -y`
  console.log('\n--- Running shadcn add ---');
  try {
    execFileSync('npx', ['shadcn', 'add', component, '-y'], {
      cwd: LIB_DIR,
      stdio: 'inherit',
    });
    console.log('--- shadcn add finished ---\n');
  } catch (e) {
    problems.push(`shadcn add failed: ${e instanceof Error ? e.message : String(e)}`);
    console.log('--- shadcn add failed ---\n');
  }

  // Step 4: Compute protected CSS vars from index.css
  let css = '';
  try {
    css = readFileSync(INDEX_CSS, 'utf8');
  } catch (e) {
    problems.push(`Failed to read index.css: ${e instanceof Error ? e.message : String(e)}`);
  }
  const rootVars = parseProtectedVarsFromIndexCss(css);

  // Step 5: Apply standard file transformations to changed .ts/.tsx files (always runs)
  const changedFilesRetryNote =
    'Manually fix changed .ts/.tsx files: replace \'import * as React from "react"\' with ' +
    "'import React from \\'react\\'', replace 'rtl:tw:' with 'tw:rtl:', and rewrite " +
    'var(--xxx) to var(--tw-xxx) for Tailwind theme vars.';

  console.log('Applying fixes to changed files…');
  try {
    const gitRoot = execSync('git rev-parse --show-toplevel', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();

    const statusOutput = execSync('git status --porcelain', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const changedFiles = statusOutput
      .split('\n')
      .filter(Boolean)
      .map((line) => line.slice(3).trim())
      .filter((f) => /\.(ts|tsx)$/.test(f))
      .map((f) => join(gitRoot, f));

    const { modifiedCount, errors: transformErrors } = applyTransformationsToFiles(
      changedFiles,
      rootVars,
    );

    if (transformErrors.length > 0) {
      problems.push(...transformErrors);
      problems.push(changedFilesRetryNote);
    } else if (modifiedCount > 0) {
      console.log(`Applied fixes to ${modifiedCount} file(s).`);
    } else {
      console.log('No fixes needed in changed files.');
    }
  } catch (e) {
    problems.push(
      `Changed file fixes failed: ${e instanceof Error ? e.message : String(e)}. ${changedFilesRetryNote}`,
    );
  }

  // Step 6: Format and lint-fix (always runs, even if earlier steps failed)
  const formatLintRetryNote =
    'Run both "npm run format" and "npm run lint-fix" from lib/platform-bible-react and make sure both succeed before committing.';

  console.log('Running npm run format…');
  try {
    execFileSync('npm', ['run', 'format'], { cwd: LIB_DIR, stdio: 'inherit' });
    console.log('Formatting done.');
  } catch (e) {
    problems.push(
      `npm run format failed: ${e instanceof Error ? e.message : String(e)}. ${formatLintRetryNote}`,
    );
  }

  console.log('Running npm run lint-fix…');
  try {
    execFileSync('npm', ['run', 'lint-fix'], { cwd: LIB_DIR, stdio: 'inherit' });
    console.log('Lint-fix done.');
  } catch (e) {
    problems.push(
      `npm run lint-fix failed: ${e instanceof Error ? e.message : String(e)}. ${formatLintRetryNote}`,
    );
  }

  // Commit message used in both paths so the user can reproduce it manually if needed
  const commitMessage = `chore: add shadcn component ${component} (npx shadcn apply --preset ${preset}) as a new baseline`;

  const addReminder =
    'This script is meant to be run during /add-shadcn-component.\n' +
    'If this was not run during /add-shadcn-component, make sure to follow /add-shadcn-component carefully!';

  // Report problems and bail, giving the user the commit command to run after fixing
  if (problems.length > 0) {
    process.stderr.write('\n--- Problems encountered ---\n');
    problems.forEach((p) => process.stderr.write(`  • ${p}\n`));
    process.stderr.write('\nFix the problems above, then commit with:\n');
    process.stderr.write(
      `  git add lib/platform-bible-react && git add package-lock.json && git commit --no-verify -m '${commitMessage}'\n`,
    );
    console.log(`\n${addReminder}`);
    process.exit(1);
  }

  // Stage everything under lib/platform-bible-react and commit
  try {
    execFileSync('git', ['add', LIB_DIR], { stdio: 'inherit' });
    execFileSync('git', ['add', 'package-lock.json'], { stdio: 'inherit' });
    execFileSync('git', ['commit', '--no-verify', '-m', commitMessage], { stdio: 'inherit' });
  } catch (e) {
    process.stderr.write(
      `\nCommit failed: ${e instanceof Error ? e.message : String(e)}\n` +
        'Manually commit with:\n' +
        `  git add lib/platform-bible-react && git add package-lock.json && git commit --no-verify -m '${commitMessage}'\n`,
    );
    console.log(`\n${addReminder}`);
    process.exit(1);
  }

  console.log(`\nDone! Component "${component}" added and committed successfully.\n${addReminder}`);
}

// Only run main() when this file is invoked directly (not when imported by tests)
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
