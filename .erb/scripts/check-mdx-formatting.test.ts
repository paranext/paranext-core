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

/** Runs the check the way npm does, from `cwd` with its default pathspec. */
function runCheck(cwd: string) {
  const result = spawnSync(process.execPath, ['--import', TSX_LOADER, SCRIPT], {
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
    'fails when no tracked MDX file matches, rather than passing having checked nothing',
    () => {
      const repo = createRepo({ 'docs/elsewhere.mdx': FORMATTED });

      const { status, stderr } = runCheck(repo);

      expect(status).toBe(1);
      expect(stderr).toContain('No tracked MDX files match');
    },
    RUN_TIMEOUT_MS,
  );
});
