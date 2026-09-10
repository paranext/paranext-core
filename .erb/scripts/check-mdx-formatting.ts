/**
 * Fails if any tracked MDX file is not already in the shape `remark --output` would write it.
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

import { execFileSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/** Pathspec limiting which tracked MDX files to check, relative to the current working directory. */
const PATHSPEC = process.argv[2] ?? 'src/**/*.mdx';

/** Matches remark's refusal to process a file excluded by `.remarkignore`. */
const IGNORED_MESSAGE = /Cannot process specified file: it.s ignored/;

/**
 * Finds the remark CLI by walking up from the current working directory, so this works from the
 * repository root and from a workspace whose binaries are hoisted.
 */
function resolveRemarkBin(): string {
  let dir = process.cwd();
  for (;;) {
    const candidate = path.join(dir, 'node_modules', '.bin', 'remark');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir)
      throw new Error('Could not find the remark CLI. Run `npm ci` at the repository root first.');
    dir = parent;
  }
}

function checkMdxFormatting(): void {
  const remarkBin = resolveRemarkBin();

  const files = execFileSync('git', ['ls-files', '--', PATHSPEC], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);

  const unformatted: string[] = [];
  const failed: string[] = [];
  let ignoredCount = 0;

  files.forEach((file) => {
    const result = spawnSync(remarkBin, ['--no-color', '--quiet', file], { encoding: 'utf8' });

    if (result.status !== 0) {
      if (IGNORED_MESSAGE.test(result.stderr)) ignoredCount += 1;
      else failed.push(`${file}\n${result.stderr.trim()}`);
      return;
    }

    if (result.stdout !== fs.readFileSync(file, 'utf8')) unformatted.push(file);
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
        'Run `npm run format` to fix them. If remark is the one that is wrong (it strips the',
        'indentation of JSX inside attribute values), add the file to .remarkignore instead.',
      ].join('\n'),
    );
  }

  if (failed.length > 0 || unformatted.length > 0) process.exit(1);

  console.log(
    `${files.length - ignoredCount} MDX file(s) match remark's output` +
      `${ignoredCount > 0 ? `; ${ignoredCount} excluded by .remarkignore` : ''}.`,
  );
}

checkMdxFormatting();
