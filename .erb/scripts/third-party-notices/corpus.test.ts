import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { identifyText } from './identify';

const FIXTURES = path.join(__dirname, '__fixtures__', 'licenses');

// Ruby is a Linux-only prerequisite. The Windows and macOS CI legs run `npm test` but only ever
// verify against the committed lock, so this suite skips there rather than failing.
//
// The probe is licensee itself, not `bundle -v`: GitHub's macos and windows images ship Ruby with
// Bundler, so a `bundle` executable exists on every leg and only the GEM is Linux-only. Probing for
// the executable un-skipped this suite on both other legs, where it then failed on "Could not find
// licensee-10.1.0 in locally installed gems".
const hasLicensee = (() => {
  try {
    execFileSync('bundle', ['exec', 'ruby', '-e', 'require "licensee"'], {
      cwd: path.resolve(__dirname, '..', '..', '..'),
      stdio: 'ignore',
    });
    return true;
  } catch {
    return false;
  }
})();

// Every entry is a REAL license file. The first six are the files the previous matcher got wrong.
//
// dompurify-LICENSE-MPL.txt is the file that catches a substring matcher: dompurify's plain
// LICENSE is Apache-2.0 prose with no GPL mention, while LICENSE-MPL is the MPL-2.0 text whose
// section 1.12 quotes the GPL - enough for an unanchored search to answer 'GPL-3.0-or-later' for a
// file that is not GPL at all.
//
// argparse-LICENSE.txt and jszip-LICENSE.markdown are pinned to 'NOASSERTION' rather than to
// 'Python-2.0' and 'MIT': licensee declines to name a single id for either, and licensee is
// right. Neither file is a single canonical license text —
//   - argparse-LICENSE.txt is CPython's own LICENSE file: four concatenated historical license
//     agreements (CWI, CNRI, BeOpen, and the current PSF License Agreement), of which only the
//     PSF section corresponds to the SPDX Python-2.0 text.
//   - jszip-LICENSE.markdown concatenates the full MIT text and the full GPLv3 text under a "you
//     may choose either" preamble, since JSZip is dual-licensed MIT OR GPL-3.0.
// A whole-file corpus match correctly declines to assert a single id for either — this is the
// NOASSERTION sentinel (matcher: 'none', confidence: 0) passing through unchanged, which is also
// the coverage this suite exists for. The old matcher's behavior on these exact files shows
// why an unanchored substring search is worse than admitting the gap: it returned
// 'GPL-3.0-or-later' for argparse and 'AGPL-3.0-or-later' for jszip — neither license applies,
// and AGPL is not even one of jszip's two actual license choices.
const EXPECTED: Record<string, string> = {
  'dompurify-LICENSE.txt': 'Apache-2.0',
  'dompurify-LICENSE-MPL.txt': 'MPL-2.0',
  'axe-core-LICENSE.txt': 'MPL-2.0',
  'lightningcss-LICENSE.txt': 'MPL-2.0',
  'argparse-LICENSE.txt': 'NOASSERTION',
  'jszip-LICENSE.markdown': 'NOASSERTION',
  'react-LICENSE.txt': 'MIT',
  'rc-dock-LICENSE.txt': 'Apache-2.0',
};

describe.skipIf(!hasLicensee)('license text identification over real files', () => {
  it.each(Object.entries(EXPECTED))('identifies %s as %s', async (file, expected) => {
    const detected = await identifyText(fs.readFileSync(path.join(FIXTURES, file), 'utf8'));
    expect(detected.spdxId).toBe(expected);
  });

  it('never identifies an MPL-2.0 text as GPL', async () => {
    // The specific regression: MPL-2.0 section 1.12 quotes "the GNU General Public License,
    // Version 2.0" when defining Secondary License. A matcher that searches for license names
    // anywhere in the file rather than on title lines fires on that quotation.
    const mpl = fs.readFileSync(path.join(FIXTURES, 'axe-core-LICENSE.txt'), 'utf8');
    const detected = await identifyText(mpl);
    expect(detected.spdxId).not.toMatch(/GPL/);
  });
});
