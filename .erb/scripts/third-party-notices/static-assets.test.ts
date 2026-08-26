import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  assertStaticAssetNoticesRecorded,
  findStaticAssetNotices,
  staticAssetNoticeTexts,
} from './static-assets';
import { loadPolicy } from './policy';
import type { Policy } from './types';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const POLICY_PATH = path.join(__dirname, 'notices-policy.json');

let repo: string;

beforeEach(() => {
  repo = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-static-assets-'));
});
afterEach(() => {
  fs.rmSync(repo, { recursive: true, force: true });
});

/** Writes a file under a fake repository, creating its directories. */
function write(relative: string, contents: string) {
  const full = path.join(repo, relative);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
  return full;
}

const sha256 = (text: string) => crypto.createHash('sha256').update(text).digest('hex');

const policyOf = (staticAssetNotices: Policy['staticAssetNotices']): Policy => ({
  allowed: [],
  copyleft: [],
  elections: {},
  exceptions: [],
  staticAssetNotices,
});

describe('findStaticAssetNotices', () => {
  it('finds notice-shaped files under an extension’s copied static trees', () => {
    write('extensions/src/quick-verse/assets/ATTRIBUTION.md', 'x');
    write('extensions/src/other/public/LICENSE.txt', 'y');
    write('extensions/src/other/assets/nested/NOTICE', 'z');

    expect(findStaticAssetNotices(repo)).toEqual([
      'extensions/src/other/assets/nested/NOTICE',
      'extensions/src/other/public/LICENSE.txt',
      'extensions/src/quick-verse/assets/ATTRIBUTION.md',
    ]);
  });

  it('looks only at the trees copy-webpack-plugin actually copies', () => {
    // The gate is about what is REDISTRIBUTED. An extension's source tree is compiled, so anything
    // third-party in it reaches the module graph and is already covered; only `assets/` and
    // `public/` are copied verbatim (see `webpack.util.ts`'s `staticFiles`).
    write('extensions/src/quick-verse/src/LICENSE.md', 'not copied');
    write('extensions/src/quick-verse/LICENSE', 'the extension’s own, stamped by git.util.ts');

    expect(findStaticAssetNotices(repo)).toEqual([]);
  });

  it('reads the repository-root assets tree, which extraResources packs the same way', () => {
    // `electron-builder.json5` names `./assets/**` beside `./extensions/dist/`. A notice file is as
    // invisible and as redistributed in one as in the other.
    write('assets/THIRD-PARTY-NOTICES.md', 'x');

    expect(findStaticAssetNotices(repo)).toEqual(['assets/THIRD-PARTY-NOTICES.md']);
  });

  it('finds a notice whose filename puts a qualifier before the word', () => {
    // Reading only the first word misses every convention that qualifies it, and these are the
    // spellings real packages use: `typescript` and `monaco-editor` ship `ThirdPartyNotices.txt`,
    // `reflect-metadata` ships `CopyrightNotice.txt`, and `electron` ships `LICENSES.chromium.html`
    // - which the anchored spelling also misses because `E`->`S` is not a word boundary.
    write('extensions/src/a/assets/ThirdPartyNotices.txt', 'x');
    write('extensions/src/a/assets/CopyrightNotice.txt', 'x');
    write('extensions/src/a/assets/LICENSES.chromium.html', 'x');
    write('extensions/src/a/assets/NODE-LICENSE.md', 'x');
    write('extensions/src/a/assets/license_header', 'x');

    expect(findStaticAssetNotices(repo)).toEqual([
      'extensions/src/a/assets/CopyrightNotice.txt',
      'extensions/src/a/assets/LICENSES.chromium.html',
      'extensions/src/a/assets/NODE-LICENSE.md',
      'extensions/src/a/assets/ThirdPartyNotices.txt',
      'extensions/src/a/assets/license_header',
    ]);
  });

  it('does not read source or assets that merely contain one of the words', () => {
    // Matching a word anywhere needs the extension test to hold the line, or every icon and every
    // `attributes.d.ts` in a copied tree becomes a policy entry somebody has to write.
    write('extensions/src/a/assets/attributes.d.ts', 'x');
    write('extensions/src/a/assets/IconCopyright.mjs', 'x');
    write('extensions/src/a/assets/copyright.svg', 'x');
    write('extensions/src/a/assets/.gitattributes', 'x');
    write('extensions/src/a/assets/displayData.json', 'x');

    expect(findStaticAssetNotices(repo)).toEqual([]);
  });
});

describe('assertStaticAssetNoticesRecorded', () => {
  it('refuses a notice file the policy does not record, with a pasteable entry', () => {
    // The live gap this closes: `extensions/src/quick-verse/assets/letter-q.png` is third-party
    // artwork whose `ATTRIBUTION.md` names an author and terms, it is packed into every installer,
    // and it appeared nowhere in THIRD-PARTY-NOTICES.md - because no module graph can see a file
    // that was copied rather than compiled.
    write('extensions/src/quick-verse/assets/ATTRIBUTION.md', 'Author: Somebody\n');

    expect(() => assertStaticAssetNoticesRecorded(repo, policyOf({}))).toThrow(
      /quick-verse\/assets\/ATTRIBUTION\.md[\s\S]*staticAssetNotices/,
    );
  });

  it('accepts a recorded file whose hash still matches', () => {
    const text = 'Author: Somebody\n';
    write('extensions/src/quick-verse/assets/ATTRIBUTION.md', text);

    expect(() =>
      assertStaticAssetNoticesRecorded(
        repo,
        policyOf({
          'extensions/src/quick-verse/assets/ATTRIBUTION.md': {
            reason: 'the icon’s terms',
            sha256: sha256(text),
          },
        }),
      ),
    ).not.toThrow();
  });

  it('refuses a recorded file that has been edited since it was read', () => {
    // The text is reproduced verbatim in the document, so an edited copy is a changed legal claim -
    // the same reason a vendored licence text is hash-pinned.
    write('extensions/src/quick-verse/assets/ATTRIBUTION.md', 'Author: Somebody else\n');

    expect(() =>
      assertStaticAssetNoticesRecorded(
        repo,
        policyOf({
          'extensions/src/quick-verse/assets/ATTRIBUTION.md': {
            reason: 'the icon’s terms',
            sha256: sha256('Author: Somebody\n'),
          },
        }),
      ),
    ).toThrow(/no longer hash to what the notices policy records/);
  });

  it('requires an unpinned entry to say so even when the file IS on disk', () => {
    // The worse half of the same rule: a present file with an unpinned entry has its text
    // reproduced by nothing and checked by nothing, so it must not pass for being present.
    write('extensions/src/quick-verse/assets/ATTRIBUTION.md', 'Author: Somebody\n');

    expect(() =>
      assertStaticAssetNoticesRecorded(
        repo,
        policyOf({
          'extensions/src/quick-verse/assets/ATTRIBUTION.md': { reason: 'the icon\u2019s terms' },
        }),
      ),
    ).toThrow(/neither a sha256 nor/);
  });

  it('requires an unpinned entry to say that being unpinned is deliberate', () => {
    // A file fetched at install time has nothing stable to pin, which is a decision; "no hash"
    // must not be able to mean "nobody read it".
    expect(() =>
      assertStaticAssetNoticesRecorded(
        repo,
        policyOf({
          'extensions/src/platform-lexical-tools/assets/lexical-db/LICENSE.md': {
            reason: 'downloaded at install time',
          },
        }),
      ),
    ).toThrow(/neither a sha256 nor/);
  });
});

describe('the committed policy against this repository', () => {
  const policy = loadPolicy(POLICY_PATH);

  it('records every notice file in every packed static tree today', () => {
    expect(() => assertStaticAssetNoticesRecorded(REPO_ROOT, policy)).not.toThrow();
  });

  it('reproduces the text of every tracked entry, and of no untracked one', () => {
    // An install-time file has no committed copy, so reproducing whatever happened to be on the
    // generating machine would put a text into the artifact that no other run could reproduce.
    const reproduced = staticAssetNoticeTexts(REPO_ROOT, policy).map((entry) => entry.name);
    expect(reproduced).toContain('extensions/src/quick-verse/assets/ATTRIBUTION.md');
    expect(reproduced.every((name) => !name.includes('lexical-db'))).toBe(true);
  });
});
