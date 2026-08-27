import { execFileSync } from 'child_process';
import * as path from 'path';
import type { Detection } from './types';

const REPO = path.resolve(__dirname, '..', '..', '..');
const SCRIPT = path.join(__dirname, 'detect.rb');

/**
 * Detects license texts for many directories in ONE Ruby process.
 *
 * Ruby's interpreter start-up is roughly 200ms. Invoking it per package across a 262-package
 * shipping set would spend about a minute doing nothing but booting. detect.rb loads licensee once
 * and iterates a directory list instead.
 *
 * @param dirs Absolute package directories.
 * @returns Keyed by directory.
 */
export function identify(dirs: string[]): Map<string, Detection> {
  const empty = new Map<string, Detection>();
  if (dirs.length === 0) return empty;

  let out: string;
  try {
    out = execFileSync('bundle', ['exec', 'ruby', SCRIPT], {
      cwd: REPO,
      input: dirs.join('\n'),
      encoding: 'utf8',
      // License texts are reproduced in full, so the payload is megabytes, not kilobytes.
      maxBuffer: 256 * 1024 * 1024,
    });
  } catch (error: unknown) {
    // A missing Ruby toolchain otherwise reaches the developer as `spawnSync bundle ENOENT`, which
    // names neither Ruby, nor Bundler, nor licensee, nor what to do - and it arrives after four
    // `dotnet restore` passes have already run, so it is the end of a long command rather than the
    // start of one. This is the only path that needs the interpreter, so it is the only place the
    // remedy can be stated: `licenseeVersion` in `main.ts` reads the committed `Gemfile.lock` and
    // so never fires on a machine that simply has no Ruby.
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT')
      throw new Error(
        'licence identification needs Bundler, which is not on PATH. This step runs licensee ' +
          '(pinned in Gemfile.lock) over each package directory, and nothing else can produce the ' +
          'verdicts this artifact rests on.\n' +
          'Install Ruby >= 3.2, then:\n' +
          '    gem install --user-install bundler\n' +
          '    bundle install\n' +
          'See README.md, "Prerequisites" step 3.',
      );
    throw error;
  }

  const detections: Detection[] = JSON.parse(out);
  return new Map(detections.map((entry) => [entry.dir, entry]));
}
