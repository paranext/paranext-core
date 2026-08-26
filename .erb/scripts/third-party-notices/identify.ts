import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
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
    // A missing Ruby toolchain reached the developer as `spawnSync bundle ENOENT`, which names
    // neither Ruby, nor Bundler, nor licensee, nor what to do - and it arrives after four
    // `dotnet restore` passes have already run, so it is the end of a long command rather than the
    // start of one. `licenseeVersion` in `main.ts` fails with an explicit remedy, but it reads
    // `Gemfile.lock` (which is committed) and so never fires on a machine that simply has no Ruby:
    // this is the only path that actually needs the interpreter, and it was the silent one.
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

/**
 * Identifies a single license text. Used by the corpus test, which holds texts rather than
 * directories; production callers use `identify`, which batches.
 */
export async function identifyText(
  text: string,
): Promise<{ spdxId: string; confidence: number; matcher: string }> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-identify-'));
  try {
    fs.writeFileSync(path.join(dir, 'LICENSE'), text);
    const [entry] = [...identify([dir]).values()];
    if (!entry || entry.files.length === 0)
      return { spdxId: 'NONE', confidence: 0, matcher: 'none' };
    const { spdxId, confidence, matcher } = entry.files[0];
    return { spdxId, confidence, matcher };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
