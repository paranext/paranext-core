import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  declaredLicenseField,
  isLicenseFileName,
  isNoticeFileName,
  isNugetLicenseFileName,
  readNugetLicenseFiles,
  readPackageNotices,
} from './package-files';

const roots: string[] = [];

/** A throwaway package directory holding the named files. */
function packageDir(files: Record<string, string>) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-package-files-'));
  roots.push(dir);
  Object.entries(files).forEach(([name, text]) => fs.writeFileSync(path.join(dir, name), text));
  return dir;
}

afterAll(() => roots.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true })));

describe('isNoticeFileName', () => {
  // A NOTICE is not a license and grants nothing, but Apache-2.0 section 4(d) requires its
  // attributions to be redistributed - an obligation reproducing the license text does not
  // discharge.
  it.each(['NOTICE', 'NOTICE.txt', 'NOTICE.md', 'notice'])(
    'treats %j as an attribution notice',
    (name) => {
      expect(isNoticeFileName(name)).toBe(true);
    },
  );

  it.each(['LICENSE', 'NOTICES.md', 'notice.js', 'README.md'])(
    'does not treat %j as an attribution notice',
    (name) => {
      expect(isNoticeFileName(name)).toBe(false);
    },
  );
});

describe('isLicenseFileName', () => {
  it.each(['LICENSE', 'LICENSE.txt', 'LICENSE.TXT', 'license.md', 'COPYING', 'LICENSE-MIT'])(
    'treats %j as license text to reproduce',
    (name) => {
      expect(isLicenseFileName(name)).toBe(true);
    },
  );

  // A package root may hold `license.js` or `license.svg`. Reproducing one verbatim inside a legal
  // document is worse than reporting no text at all, and reading a binary as UTF-8 yields
  // replacement characters that corrupt the fenced block around them.
  it.each(['license.js', 'license.svg', 'LICENSE.png', 'NOTICE', 'README.md', 'licensing.ts'])(
    'does not treat %j as license text',
    (name) => {
      expect(isLicenseFileName(name)).toBe(false);
    },
  );
});

describe('readPackageNotices', () => {
  it('reads every NOTICE a package ships, in filename order', () => {
    const dir = packageDir({
      'NOTICE.txt': 'second',
      NOTICE: 'first',
      LICENSE: 'not a notice',
      'README.md': 'nor this',
    });
    expect(readPackageNotices(dir)).toEqual([
      { name: 'NOTICE', text: 'first' },
      { name: 'NOTICE.txt', text: 'second' },
    ]);
  });

  // Some upstream files are CRLF and git normalizes them on commit, so without normalizing here the
  // committed artifact would never match freshly generated output.
  it('normalizes line endings and trims', () => {
    const dir = packageDir({ NOTICE: '\r\nline one\r\nline two\r\n' });
    expect(readPackageNotices(dir)).toEqual([{ name: 'NOTICE', text: 'line one\nline two' }]);
  });

  it('reports nothing for a package with no notice, and for no directory at all', () => {
    expect(readPackageNotices(packageDir({ LICENSE: 'mit' }))).toEqual([]);
    expect(readPackageNotices(undefined)).toEqual([]);
    expect(readPackageNotices(path.join(os.tmpdir(), 'notices-does-not-exist'))).toEqual([]);
  });
});

describe('declaredLicenseField', () => {
  it('reads the modern string form', () => {
    expect(declaredLicenseField({ license: 'MIT' })).toBe('MIT');
  });

  it('reads the object form npm used before SPDX strings', () => {
    expect(
      declaredLicenseField({ license: { type: 'BSD-3-Clause', url: 'https://example.test/l' } }),
    ).toBe('BSD-3-Clause');
  });

  it('joins the legacy `licenses` array with OR, since listing several meant a choice', () => {
    expect(declaredLicenseField({ licenses: [{ type: 'MIT' }, { type: 'Apache-2.0' }] })).toBe(
      'MIT OR Apache-2.0',
    );
  });

  it('accepts bare strings inside the legacy `licenses` array', () => {
    expect(declaredLicenseField({ licenses: ['MIT', 'ISC'] })).toBe('MIT OR ISC');
  });

  // Reporting a placeholder would make an absent declaration indistinguishable from a package that
  // literally declares the word UNKNOWN, and `parseDeclared` already reports the absence itself.
  it('reports nothing when the manifest declares nothing', () => {
    expect(declaredLicenseField({})).toBeUndefined();
    expect(declaredLicenseField({ licenses: [] })).toBeUndefined();
  });
});

describe('isNugetLicenseFileName', () => {
  // NuGet packages name their grant in ways npm packages do not. `System.Net.Http` 4.3.4 ships
  // `dotnet_library_license.txt` - 9,451 bytes opening "MICROSOFT SOFTWARE LICENSE TERMS /
  // MICROSOFT .NET LIBRARY", verbatim the licence its nuspec `<licenseUrl>` points at - and the
  // artifact asserted it bundles none, reproducing nothing, while the text sat in the restored
  // package folder.

  it.each([
    'dotnet_library_license.txt',
    'MIT-LICENSE.txt',
    'LICENSE',
    'LICENSE.txt',
    'license.md',
    'COPYING',
  ])('reproduces %s', (name) => {
    expect(isNugetLicenseFileName(name)).toBe(true);
  });

  it.each([
    // The reason this is a separate matcher rather than a widened `LICENSE_FILE`: a package NAMED
    // "...-license" makes every one of its own metadata files match on the stem alone.
    'nuget-license.nuspec',
    'nuget-license.nupkg',
    'nuget-license.4.0.16.nupkg.sha512',
    'license.png',
    'licenseKey.js',
    'THIRD-PARTY-NOTICES.TXT',
    'README.md',
  ])('does not reproduce %s', (name) => {
    expect(isNugetLicenseFileName(name)).toBe(false);
  });

  it('stays stricter for npm, where the file is a verdict signal rather than a reproduction', () => {
    // For npm the licence file is the second signal `policy.ts` reconciles the manifest against, so
    // a loosely matched filename would weaken a verdict rather than enrich a reproduction.
    expect(isLicenseFileName('dotnet_library_license.txt')).toBe(false);
    expect(isNugetLicenseFileName('dotnet_library_license.txt')).toBe(true);
  });
});

describe('readNugetLicenseFiles', () => {
  it('reads a grant whose filename does not begin with the word', () => {
    const dir = packageDir({
      'dotnet_library_license.txt': 'MICROSOFT SOFTWARE LICENSE TERMS\nMICROSOFT .NET LIBRARY',
      'THIRD-PARTY-NOTICES.TXT': 'unrelated aggregate notices',
    });
    expect(readNugetLicenseFiles(dir)).toEqual([
      {
        name: 'dotnet_library_license.txt',
        text: 'MICROSOFT SOFTWARE LICENSE TERMS\nMICROSOFT .NET LIBRARY',
      },
    ]);
  });
});
