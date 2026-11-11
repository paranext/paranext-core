/**
 * Fails if any MDX file git knows of — tracked, or untracked and not gitignored — is not already in
 * the shape `remark --output` would write it.
 *
 * The obvious spelling of this check, `remark . --ext .mdx` with no `--output`, does not check
 * anything: remark reports plugin messages but never compares its serialized output to the bytes on
 * disk, so it exits 0 on a file that `npm run format` would rewrite. That gap lets MDX drift sit in
 * the repo until someone runs a full format — in practice, the release version bump, which then
 * carries unrelated reformatting into its pull request.
 *
 * Files listed in `.remarkignore` are skipped. remark refuses an explicitly named ignored file with
 * an "it's ignored" error, so honoring the ignore file needs no reimplementation of its matching
 * here.
 */

import { execFileSync, spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

/**
 * Pathspec limiting which MDX files to check, relative to the current working directory.
 *
 * `:(glob)` lets `**` match zero directories, as it does in the root `format:core` remark run that
 * formats these files; git's default pathspec rules would skip MDX directly under `src/`.
 */
const PATHSPEC = process.argv[2] ?? ':(glob)src/**/*.mdx';

/** Matches remark's refusal to process a file excluded by `.remarkignore`. */
const IGNORED_MESSAGE = /Cannot process specified file: it.s ignored/;

/** Returns remark-cli's `cli.js` from the nearest `node_modules` at or above `start`. */
function findRemarkCliFrom(start: string): string | undefined {
  let dir = start;
  for (;;) {
    const candidate = path.join(dir, 'node_modules', 'remark-cli', 'cli.js');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
}

/**
 * Finds the remark CLI's entry script by walking up from the current directory, then from this
 * script's directory. The current directory comes first so a workspace's own remark-cli, the one
 * its `format:mdx` runs, is the one that checks its files.
 *
 * This runs the JavaScript entry point with Node rather than `node_modules/.bin/remark`: on Windows
 * that is a shell script `spawn` cannot start, and the `remark.cmd` beside it needs a shell.
 * `require.resolve` cannot find it either, because remark-cli's package exports nothing.
 */
function resolveRemarkCli(): string {
  const remarkCli = findRemarkCliFrom(process.cwd()) ?? findRemarkCliFrom(__dirname);
  if (!remarkCli)
    throw new Error('Could not find the remark CLI. Run `npm ci` at the repository root first.');
  return remarkCli;
}

type RemarkResult =
  | { kind: 'formatted' }
  | { kind: 'unformatted' }
  | { kind: 'ignored' }
  | { kind: 'failed'; message: string };

function runRemark(remarkCli: string, file: string): Promise<RemarkResult> {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [remarkCli, '--no-color', '--quiet', file]);
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8').on('data', (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.setEncoding('utf8').on('data', (chunk: string) => {
      stderr += chunk;
    });
    child.on('error', (error) => resolve({ kind: 'failed', message: error.message }));
    child.on('close', (status) => {
      if (status !== 0) {
        if (IGNORED_MESSAGE.test(stderr)) resolve({ kind: 'ignored' });
        else resolve({ kind: 'failed', message: stderr.trim() });
        return;
      }
      resolve({ kind: stdout === fs.readFileSync(file, 'utf8') ? 'formatted' : 'unformatted' });
    });
  });
}

/**
 * Runs remark on every file, a bounded number at a time since each run is a separate Node process.
 * Results come back in the order of `files`, so the output does not depend on which run ends
 * first.
 */
async function runRemarkOnAll(remarkCli: string, files: string[]): Promise<RemarkResult[]> {
  const results: RemarkResult[] = new Array(files.length);
  let next = 0;
  // Each worker takes the next file once its current one is done.
  async function worker(): Promise<void> {
    if (next >= files.length) return;
    const index = next;
    next += 1;
    results[index] = await runRemark(remarkCli, files[index]);
    await worker();
  }
  const workerCount = Math.min(os.availableParallelism(), files.length);
  await Promise.all(Array.from({ length: workerCount }, worker));
  return results;
}

async function checkMdxFormatting(): Promise<void> {
  const remarkCli = resolveRemarkCli();

  // `-z` so git does not C-quote paths with non-ASCII characters into names remark cannot open.
  // `--others --exclude-standard` adds new files not yet staged, but not gitignored build output.
  const files = execFileSync(
    'git',
    ['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', PATHSPEC],
    { encoding: 'utf8' },
  )
    .split('\0')
    .filter(Boolean)
    // A tracked file deleted from disk is still listed; it has nothing left to check.
    .filter((file) => fs.existsSync(file));

  // Checking nothing must not pass: that is the silent no-op this script replaces.
  if (files.length === 0) {
    console.error(`No MDX files match ${PATHSPEC} in ${process.cwd()}.`);
    process.exit(1);
  }

  const results = await runRemarkOnAll(remarkCli, files);

  const unformatted: string[] = [];
  const failed: string[] = [];
  let ignoredCount = 0;

  results.forEach((result, index) => {
    const file = files[index];
    if (result.kind === 'unformatted') unformatted.push(file);
    else if (result.kind === 'ignored') ignoredCount += 1;
    else if (result.kind === 'failed') failed.push(`${file}\n${result.message}`);
  });

  if (failed.length > 0) {
    console.error(`remark could not process:\n${failed.join('\n')}`);
  }

  if (unformatted.length > 0) {
    console.error(
      [
        'These MDX files are not formatted as remark would write them:',
        ...unformatted.map((file) => `  ${file}`),
        '',
        'Run `npm run format:mdx` to fix them. If remark is the one that is wrong (it strips the',
        'indentation of JSX inside attribute values and puts multi-line JSX attributes on one',
        `line), add the file to ${path.join(process.cwd(), '.remarkignore')} instead, creating`,
        'that file if it does not exist.',
      ].join('\n'),
    );
  }

  if (failed.length > 0 || unformatted.length > 0) process.exit(1);

  console.log(
    `${files.length - ignoredCount} MDX file(s) match remark's output` +
      `${ignoredCount > 0 ? `; ${ignoredCount} excluded by .remarkignore` : ''}.`,
  );
}

checkMdxFormatting().catch((error) => {
  console.error(error);
  process.exit(1);
});
