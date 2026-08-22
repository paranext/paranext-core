import * as fs from 'fs';
import * as path from 'path';
import JSON5 from 'json5';
import { describe, expect, it } from 'vitest';

const REPO = path.resolve(__dirname, '..', '..', '..');
const config = JSON5.parse(fs.readFileSync(path.join(REPO, 'electron-builder.json5'), 'utf8'));

const extraResources: unknown[] = config.extraResources || [];

// A narrowing helper rather than `(r as { from: string }).from`: this repo bans type assertions
// (`no-type-assertion/no-type-assertion`) and does not exempt test files.
function resourcePath(entry: unknown): string {
  if (typeof entry === 'string') return entry;
  if (entry && typeof entry === 'object' && 'from' in entry && typeof entry.from === 'string')
    return entry.from;
  return '';
}

const asStrings = extraResources.map(resourcePath);

describe('electron-builder packaging', () => {
  it('ships THIRD-PARTY-NOTICES.md', () => {
    // Third-party attribution obligations apply to the binary regardless of the terms it ships
    // under, so the notices travel with the installer rather than living only in the repository.
    expect(asStrings.some((r) => r.includes('THIRD-PARTY-NOTICES.md'))).toBe(true);
  });

  it('ships LICENSE', () => {
    expect(asStrings.some((r) => r.includes('LICENSE'))).toBe(true);
  });

  it('does not configure an installer EULA', () => {
    // nsis.license / dmg license is a DIFFERENT artifact - an end-user licence shown during
    // install - and the end-user terms are deliberately undecided. Adding one here would assert
    // an answer nobody has given. BOTH are checked, because the comment named both while the
    // assertion covered only the Windows one - so a macOS EULA could have been configured with
    // this test still green, which is the shape of a test that certifies more than it checks.
    expect(config.nsis?.license).toBeUndefined();
    expect(config.dmg?.license).toBeUndefined();
  });
});
