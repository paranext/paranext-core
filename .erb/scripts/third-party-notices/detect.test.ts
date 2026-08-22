import { execFileSync } from 'child_process';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

const REPO = path.resolve(__dirname, '..', '..', '..');
const SCRIPT = path.join(__dirname, 'detect.rb');

type DetectResult = {
  dir: string;
  files: {
    filename: string;
    spdxId: string;
    matcher: string;
    confidence: number;
    sha256: string;
    text: string;
  }[];
};

function detect(dirs: string[]): DetectResult[] {
  const out = execFileSync('bundle', ['exec', 'ruby', SCRIPT], {
    cwd: REPO,
    input: dirs.join('\n'),
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  const results: DetectResult[] = JSON.parse(out);
  return results;
}

// Probes what this suite actually needs - licensee, resolvable through the repository's Gemfile -
// rather than the mere existence of a `bundle` executable. GitHub's macos and windows runner images
// ship Ruby with Bundler preinstalled, so `bundle -v` succeeded there and the suite ran, only to
// fail on "Could not find licensee-10.1.0 in locally installed gems": the gem is installed on the
// Linux leg alone. `npm test` runs on all three.
const hasLicensee = (() => {
  try {
    execFileSync('bundle', ['exec', 'ruby', '-e', 'require "licensee"'], {
      cwd: REPO,
      stdio: 'ignore',
    });
    return true;
  } catch {
    return false;
  }
})();

// Ruby is a Linux-only prerequisite: notices are generated on Linux, and the other platforms only
// verify against the committed lock. Skipping keeps their `npm test` green without weakening the
// Linux leg, which is where this suite is authoritative.
describe.skipIf(!hasLicensee)('detect.rb', () => {
  it('identifies a plain MIT package', () => {
    const [result] = detect([path.join(REPO, 'node_modules', 'json-rpc-2.0')]);
    expect(result.files).toHaveLength(1);
    expect(result.files[0].spdxId).toBe('MIT');
    expect(result.files[0].confidence).toBeGreaterThanOrEqual(98);
  });

  it('reports every license file, not just the best one', () => {
    // dompurify ships LICENSE (Apache-2.0) and LICENSE-MPL (MPL-2.0). Reconciliation of its
    // `(MPL-2.0 OR Apache-2.0)` declaration needs both, so a single best-match answer is not enough.
    const [result] = detect([path.join(REPO, 'node_modules', 'dompurify')]);
    const ids = result.files.map((f) => f.spdxId).sort();
    expect(ids).toContain('MPL-2.0');
  });

  it('does not read package.json to infer a license', () => {
    // The declared field is read separately by declared.js. If licensee also consulted it, the two
    // signals would not be independent and "detected disagrees with declared" could never fire.
    const [result] = detect([path.join(REPO, 'node_modules', 'dompurify')]);
    // The filenames are asserted as a set rather than inside a `forEach`, which asserts nothing at
    // all when the list is empty - and an empty list is exactly what the regression this test
    // exists to catch would produce alongside a `package.json` entry disappearing.
    expect(result.files.length).toBeGreaterThan(0);
    expect(result.files.map((f) => f.filename)).not.toContain('package.json');
  });

  it('returns an empty file list for a directory with no license', () => {
    const [result] = detect([path.join(REPO, '.erb', 'scripts', 'third-party-notices')]);
    expect(result.files).toEqual([]);
  });
});
