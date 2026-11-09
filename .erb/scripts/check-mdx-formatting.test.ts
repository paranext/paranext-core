import { execFileSync, spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { pathToFileURL } from 'url';
import { afterEach, describe, expect, it } from 'vitest';

const SCRIPT = path.join(__dirname, 'check-mdx-formatting.ts');
/** Resolved from here: a bare `--import tsx` would resolve from the fixture, which has no packages. */
const TSX_LOADER = pathToFileURL(require.resolve('tsx')).href;

/** Already in the shape remark writes: an ATX heading and a paragraph. */
const FORMATTED = '# Title\n\nSome text.\n';
/** A setext heading, which remark rewrites as `# Title`. */
const UNFORMATTED = 'Title\n=====\n';

// Each run spawns tsx plus one remark process per file.
const RUN_TIMEOUT_MS = 30_000;

let tempDirs: string[] = [];

afterEach(() => {
  tempDirs.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true }));
  tempDirs = [];
});

/**
 * Creates a git repository holding the given files, all staged so `git ls-files` lists them. There
 * is no remark config, so remark formats the files as plain Markdown.
 */
function createRepo(files: Record<string, string>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'check-mdx-formatting-'));
  tempDirs.push(dir);
  execFileSync('git', ['init', '--quiet'], { cwd: dir });
  Object.entries(files).forEach(([file, content]) => {
    fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
    fs.writeFileSync(path.join(dir, file), content);
  });
  execFileSync('git', ['add', '--all'], { cwd: dir });
  return dir;
}

/** Runs the check the way npm does, from `cwd`, with its default pathspec unless `args` names one. */
function runCheck(cwd: string, args: string[] = []) {
  const result = spawnSync(process.execPath, ['--import', TSX_LOADER, SCRIPT, ...args], {
    cwd,
    encoding: 'utf8',
  });
  return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

describe('check-mdx-formatting', () => {
  it(
    'passes when every MDX file matches remark, counting .remarkignore exclusions separately',
    () => {
      const repo = createRepo({
        // Directly under src/, which a pathspec without `:(glob)` would never list.
        'src/top.mdx': FORMATTED,
        'src/nested/deep.mdx': FORMATTED,
        'src/hand-formatted.mdx': UNFORMATTED,
        '.remarkignore': 'src/hand-formatted.mdx\n',
      });

      const { status, stdout, stderr } = runCheck(repo);

      // Matched with stderr so a failure shows what the script printed.
      expect({ status, stderr }).toMatchObject({ status: 0 });
      expect(stdout.trim()).toBe(
        "2 MDX file(s) match remark's output; 1 excluded by .remarkignore.",
      );
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'fails and names each MDX file that remark would rewrite',
    () => {
      const repo = createRepo({
        'src/top.mdx': UNFORMATTED,
        'src/nested/deep.mdx': FORMATTED,
        'src/nested/drifted.mdx': UNFORMATTED,
      });

      const { status, stderr } = runCheck(repo);

      expect(status).toBe(1);
      expect(stderr).toContain('  src/top.mdx\n');
      expect(stderr).toContain('  src/nested/drifted.mdx\n');
      expect(stderr).not.toContain('deep.mdx');
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'reports every file, in path order, when there are more files than parallel remark runs',
    () => {
      // More files than the script runs at once, so each run slot handles several in turn.
      const count = 2 * os.availableParallelism() + 1;
      const names = Array.from(
        { length: count },
        (_, i) => `src/${String(i).padStart(3, '0')}.mdx`,
      );
      const repo = createRepo(
        Object.fromEntries(names.map((name, i) => [name, i % 2 ? FORMATTED : UNFORMATTED])),
      );

      const { status, stderr } = runCheck(repo);

      expect(status).toBe(1);
      const listed = stderr.split('\n').filter((line) => line.startsWith('  src/'));
      expect(listed).toEqual(names.filter((_, i) => i % 2 === 0).map((name) => `  ${name}`));
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'checks a new MDX file that is not staged yet, but not one git ignores',
    () => {
      const repo = createRepo({ 'src/top.mdx': FORMATTED, '.gitignore': 'src/build/\n' });
      fs.writeFileSync(path.join(repo, 'src/new.mdx'), UNFORMATTED);
      fs.mkdirSync(path.join(repo, 'src/build'));
      fs.writeFileSync(path.join(repo, 'src/build/output.mdx'), UNFORMATTED);

      const { status, stderr } = runCheck(repo);

      expect(status).toBe(1);
      expect(stderr).toContain('  src/new.mdx\n');
      expect(stderr).not.toContain('output.mdx');
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'skips a tracked MDX file that was deleted from disk',
    () => {
      const repo = createRepo({ 'src/top.mdx': FORMATTED, 'src/deleted.mdx': FORMATTED });
      fs.rmSync(path.join(repo, 'src/deleted.mdx'));

      const { status, stdout, stderr } = runCheck(repo);

      expect({ status, stderr }).toMatchObject({ status: 0 });
      expect(stdout.trim()).toBe("1 MDX file(s) match remark's output.");
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'checks only the files an explicit pathspec names',
    () => {
      const repo = createRepo({
        'top.mdx': FORMATTED,
        'src/nested.mdx': UNFORMATTED,
      });

      const { status, stdout, stderr } = runCheck(repo, ['*.mdx']);

      // `*.mdx` crosses directories in a git pathspec, so `src/nested.mdx` is checked too.
      expect(status).toBe(1);
      expect(stderr).toContain('  src/nested.mdx\n');
      expect(stdout).toBe('');

      const topOnly = runCheck(repo, ['top.mdx']);
      expect({ status: topOnly.status, stderr: topOnly.stderr }).toMatchObject({ status: 0 });
      expect(topOnly.stdout.trim()).toBe("1 MDX file(s) match remark's output.");
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'fails naming the file when remark cannot process it, not as unformatted',
    () => {
      const repo = createRepo({
        'src/top.mdx': FORMATTED,
        '.remarkrc.json': JSON.stringify({ plugins: ['remark-does-not-exist'] }),
      });

      const { status, stderr } = runCheck(repo);

      expect(status).toBe(1);
      expect(stderr).toContain('remark could not process:\nsrc/top.mdx\n');
      expect(stderr).toContain('remark-does-not-exist');
      expect(stderr).not.toContain('not formatted as remark would write them');
    },
    RUN_TIMEOUT_MS,
  );

  it(
    "runs the remark-cli nearest the current directory, as that directory's `format:mdx` does",
    () => {
      const repo = createRepo({
        'src/top.mdx': FORMATTED,
        'node_modules/remark-cli/cli.js':
          "process.stderr.write('stub remark-cli near the current directory');\nprocess.exit(1);\n",
      });

      const { status, stderr } = runCheck(repo);

      expect(status).toBe(1);
      expect(stderr).toContain('stub remark-cli near the current directory');
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'fails when no MDX file matches, rather than passing having checked nothing',
    () => {
      const repo = createRepo({ 'docs/elsewhere.mdx': FORMATTED });

      const { status, stderr } = runCheck(repo);

      expect(status).toBe(1);
      expect(stderr).toContain('No MDX files match');
    },
    RUN_TIMEOUT_MS,
  );
});
