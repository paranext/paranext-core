import {
  ASSESSED_NON_SPDX,
  canonicalTextCredit,
  cell,
  classifyLicense,
  classifyTerm,
  electLicense,
  identifyLicenseFromText,
  isFrameworkPackage,
  isLicenseFileName,
  licenseIdOf,
  xmlMatch,
} from './generate-third-party-notices.util';

describe('classifyLicense', () => {
  // The two SPDX operators pull in opposite directions, and reading `AND` as if it were `OR` is how
  // "MIT AND GPL-3.0-only" once classified as `ok` — silently defeating the gate these tests exist
  // to protect. `OR` is a choice, so a disjunction is as permissive as its BEST branch; `AND` is
  // cumulative, so a conjunction is only as permissive as its WORST term.
  const OPERATOR_CASES: [string, string][] = [
    ['MIT', 'ok'],
    ['MIT OR GPL-3.0-or-later', 'ok'],
    ['GPL-3.0-only', 'blocking'],
    ['MIT AND GPL-3.0-only', 'blocking'],
    ['Apache-2.0 AND GPL-3.0-or-later', 'blocking'],
    ['(MIT AND GPL-2.0)', 'blocking'],
    ['(BSD-3-Clause AND Apache-2.0)', 'ok'],
    ['(MIT AND Zlib)', 'ok'],
    // The worst term of a conjunction wins, even when it is only file-level copyleft.
    ['MIT AND MPL-2.0', 'weak'],
    // An unreadable branch is a better outcome than a blocking one (it may yet resolve to
    // something permissive), but it is not `ok` and still has to be reported.
    ['GPL-3.0-only OR SEE LICENSE IN foo', 'unknown'],
  ];

  it.each(OPERATOR_CASES)('classifies %j as %s', (expression, expected) => {
    expect(classifyLicense(expression)).toBe(expected);
  });

  // Reading an unreadable grant as permissive is exactly how a proprietary dependency would clear
  // this gate unnoticed: `UNLICENSED` means "no license granted", and `SEE LICENSE IN <file>` is
  // what npm records for custom terms nobody has read yet.
  const NON_SPDX_CASES: [string | undefined, string][] = [
    ['UNLICENSED', 'unknown'],
    ['SEE LICENSE IN LICENSE.md', 'unknown'],
    ['UNKNOWN', 'unknown'],
    ['NONE', 'unknown'],
    ['', 'unknown'],
    [undefined, 'unknown'],
  ];

  it.each(NON_SPDX_CASES)(
    'treats the non-SPDX value %j as %s, never ok',
    (expression, expected) => {
      expect(classifyLicense(expression)).toBe(expected);
    },
  );

  const SEVERITY_CASES: [string, string][] = [
    ['MPL-2.0', 'weak'],
    ['CDDL-1.0', 'weak'],
    ['EPL-2.0', 'weak'],
    // File-level copyleft on one branch of a choice is not binding when a permissive branch exists.
    ['MPL-2.0 OR Apache-2.0', 'ok'],
    // MS-RL is the reciprocal Microsoft license (weak copyleft); MS-PL is the permissive one. They
    // differ by a single letter, so classify both explicitly rather than trusting a near miss.
    ['MS-RL', 'weak'],
    ['MS-PL', 'ok'],
    ['MS-PL OR Apache-2.0', 'ok'],
    // ...and `MPL` must not be read off the front of `MS-PL` either.
    ['MS-PL AND MIT', 'ok'],
    ['AGPL-3.0-or-later', 'blocking'],
    ['LGPL-2.1', 'blocking'],
    ['SSPL-1.0', 'blocking'],
    ['CeCILL-2.1', 'blocking'],
    // A `WITH <exception>` qualifier is still one SPDX identifier, not free text.
    ['Apache-2.0 WITH LLVM-exception', 'ok'],
    ['0BSD', 'ok'],
    ['BlueOak-1.0.0', 'ok'],
    ['Unicode-3.0', 'ok'],
    ['ISC', 'ok'],
  ];

  it.each(SEVERITY_CASES)('classifies %j as %s', (expression, expected) => {
    expect(classifyLicense(expression)).toBe(expected);
  });

  // These are whole free-text values a human has already ruled on. They are matched BEFORE the
  // operator split, which matters most for "ICU (Unicode-3.0)": stripping its parentheses first
  // would leave "ICU Unicode-3.0", which is not an SPDX identifier and would warn as unresolved.
  const ASSESSED_CASES: [string, string][] = [
    ['Proprietary — SIL Global / United Bible Societies', 'ok'],
    ['ICU (Unicode-3.0)', 'ok'],
    ['MICROSOFT .NET LIBRARY', 'ok'],
  ];

  it.each(ASSESSED_CASES)('honors the recorded assessment of %j (%s)', (expression, expected) => {
    expect(classifyLicense(expression)).toBe(expected);
  });

  it.each(Object.entries(ASSESSED_NON_SPDX))(
    'classifies every assessed value, including %j, as its recorded verdict',
    (expression, verdict) => {
      expect(classifyLicense(expression)).toBe(verdict);
    },
  );

  it('does not treat an unassessed free-text value as assessed', () => {
    expect(classifyLicense('Proprietary — some other vendor')).toBe('unknown');
  });

  it('ignores surrounding whitespace when matching an assessed value', () => {
    expect(classifyLicense('  ICU (Unicode-3.0)  ')).toBe('ok');
  });
});

describe('classifyTerm', () => {
  const TERM_CASES: [string, string][] = [
    ['MIT', 'ok'],
    ['GPL-3.0-only', 'blocking'],
    ['MPL-2.0', 'weak'],
    ['UNLICENSED', 'unknown'],
    // A single term never contains spaces unless it is a `WITH` clause; anything else is free text.
    ['SEE LICENSE IN LICENSE.md', 'unknown'],
    ['Apache-2.0 WITH LLVM-exception', 'ok'],
  ];

  it.each(TERM_CASES)('classifies the single term %j as %s', (term, expected) => {
    expect(classifyTerm(term)).toBe(expected);
  });
});

describe('isLicenseFileName', () => {
  // `LICENSE-MIT` / `LICENSE-APACHE` are how dual-licensed packages ship both texts. A pattern that
  // only allowed a dot separator reported those packages as shipping no license text at all.
  const MATCHING = [
    'LICENSE',
    'LICENCE',
    'COPYING',
    'LICENSE.md',
    'LICENSE.txt',
    'LICENSE-MIT',
    'LICENSE-APACHE',
    'LICENSE_MIT',
    'LICENSE-MIT.txt',
    'license',
    'COPYING.LESSER',
  ];

  it.each(MATCHING)('treats %j as a license file', (name) => {
    expect(isLicenseFileName(name)).toBe(true);
  });

  // Reproducing a package's `license.js` verbatim inside a legal document would be worse than
  // reporting no text at all, and nothing about the filename says it is not a license.
  const NOT_MATCHING = [
    'license.js',
    'LICENSE.svg',
    'licensing.md',
    'README.md',
    'LICENSE.d.ts',
    'LICENSE.map',
    'license.json',
    'LICENSE.png',
    'copyrights.txt',
  ];

  it.each(NOT_MATCHING)('does not treat %j as a license file', (name) => {
    expect(isLicenseFileName(name)).toBe(false);
  });
});

describe('electLicense', () => {
  it('leaves a declared expression alone when nothing has been elected', () => {
    expect(electLicense('MIT', undefined)).toEqual({ license: 'MIT', effective: 'MIT' });
  });

  // The display value has to name both halves: the artifact exists to remove the ambiguity, and it
  // only does that if a reader can see which branch was taken AND what it was taken from.
  it('shows the elected branch and the expression it was elected from', () => {
    expect(
      electLicense('MS-PL OR Apache-2.0', { elected: 'Apache-2.0', of: 'MS-PL OR Apache-2.0' })
        .license,
    ).toBe('Apache-2.0 (elected from MS-PL OR Apache-2.0)');
  });

  // The gate must judge what is actually relied on, not what was declared. Classifying the display
  // value instead would report every elected package as unresolved, because "MIT (elected from …)"
  // is not a parseable SPDX expression.
  it('classifies the elected branch, not the declared expression', () => {
    const { license, effective } = electLicense('MIT OR GPL-3.0-or-later', {
      elected: 'MIT',
      of: 'MIT OR GPL-3.0-or-later',
    });
    expect(effective).toBe('MIT');
    expect(classifyLicense(effective)).toBe('ok');
    expect(classifyLicense(license)).not.toBe('ok');
  });

  // An election is what makes a weak-copyleft branch irrelevant: `dompurify` ships as Apache-2.0,
  // so the MPL branch it also offers imposes nothing.
  it('resolves a disjunction whose other branch is copyleft', () => {
    expect(
      electLicense('(MPL-2.0 OR Apache-2.0)', {
        elected: 'Apache-2.0',
        of: 'MPL-2.0 OR Apache-2.0',
      }),
    ).toEqual({
      license: 'Apache-2.0 (elected from MPL-2.0 OR Apache-2.0)',
      effective: 'Apache-2.0',
    });
  });
});

describe('canonicalTextCredit', () => {
  // A canonical text carries SPDX's placeholder rather than any package's holder, so the package's
  // own copyright notice is what pairs the two.
  it('quotes the copyright notice a package records', () => {
    expect(
      canonicalTextCredit({
        name: 'CsvHelper',
        version: '33.1.0',
        ecosystem: 'NuGet',
        copyright: 'Copyright © 2009-2024 Josh Close',
      }),
    ).toBe('`CsvHelper@33.1.0` (NuGet) — Copyright © 2009-2024 Josh Close');
  });

  it('collapses a multi-line copyright notice onto one line', () => {
    expect(
      canonicalTextCredit({
        name: 'x',
        version: '1.0.0',
        ecosystem: 'NuGet',
        copyright: '  Copyright (c)\n  Example   Corp  ',
      }),
    ).toBe('`x@1.0.0` (NuGet) — Copyright (c) Example Corp');
  });

  // Three distinct facts that must never collapse into one another, because each says something
  // different about what was actually checked. A blank would read as "nobody looked".
  it('says a nuspec declares no copyright rather than leaving it blank', () => {
    expect(
      canonicalTextCredit({ name: 'ParatextChecks', version: '9.5.0', ecosystem: 'NuGet' }),
    ).toBe('`ParatextChecks@9.5.0` (NuGet) — its nuspec declares no copyright notice');
  });

  it('says an npm manifest has no field for a copyright notice', () => {
    expect(canonicalTextCredit({ name: 'dlv', version: '1.1.3', ecosystem: 'npm' })).toBe(
      '`dlv@1.1.3` (npm) — no copyright notice — an npm manifest has no field for one',
    );
  });

  // "Never read" is not "read and found empty": `Microsoft.ICU.ICU4C.Runtime` is restored only on
  // Windows, so claiming its nuspec declares nothing would assert something never checked.
  it('distinguishes a package that was never on disk from one with no notice', () => {
    expect(
      canonicalTextCredit({
        name: 'Microsoft.ICU.ICU4C.Runtime',
        version: '72.1.0.3',
        ecosystem: 'NuGet',
        inspected: false,
      }),
    ).toBe(
      '`Microsoft.ICU.ICU4C.Runtime@72.1.0.3` (NuGet) — not present in the local package folder, ' +
        'so no copyright notice could be read',
    );
  });

  it('prefers a recorded notice over the not-inspected fallback', () => {
    expect(
      canonicalTextCredit({
        name: 'x',
        version: '1.0.0',
        ecosystem: 'NuGet',
        copyright: '© Example',
        inspected: false,
      }),
    ).toBe('`x@1.0.0` (NuGet) — © Example');
  });
});

describe('licenseIdOf', () => {
  it('reads the modern string form', () => {
    expect(licenseIdOf({ license: 'MIT' })).toBe('MIT');
  });

  it('reads the object form npm used before SPDX strings', () => {
    expect(licenseIdOf({ license: { type: 'BSD-3-Clause', url: 'https://example.test/l' } })).toBe(
      'BSD-3-Clause',
    );
  });

  it('joins the legacy `licenses` array with OR, since listing several meant a choice', () => {
    expect(licenseIdOf({ licenses: [{ type: 'MIT' }, { type: 'Apache-2.0' }] })).toBe(
      'MIT OR Apache-2.0',
    );
  });

  it('accepts bare strings inside the legacy `licenses` array', () => {
    expect(licenseIdOf({ licenses: ['MIT', 'ISC'] })).toBe('MIT OR ISC');
  });

  it('falls back to UNKNOWN when the manifest declares nothing', () => {
    expect(licenseIdOf({})).toBe('UNKNOWN');
    // ...and UNKNOWN is what the gate reports as unresolved, not as permissive.
    expect(classifyLicense(licenseIdOf({}))).toBe('unknown');
  });
});

describe('identifyLicenseFromText', () => {
  const IDENTIFIABLE: [string, string, string][] = [
    ['MIT', 'MIT License\n\nCopyright (c) 2026 Example\n\nPermission is hereby granted', 'MIT'],
    [
      'Apache-2.0',
      '                                 Apache License\n' +
        '                           Version 2.0, January 2004\n',
      'Apache-2.0',
    ],
    [
      'BSD-3-Clause',
      'Neither the name of the copyright holder nor the names of its contributors may be used to ' +
        'endorse or promote products derived from this software',
      'BSD-3-Clause',
    ],
    ['ISC', 'ISC License\n\nCopyright (c) 2026 Example', 'ISC'],
  ];

  it.each(IDENTIFIABLE)('identifies %s from its bundled text', (_label, text, expected) => {
    expect(identifyLicenseFromText(text)).toBe(expected);
  });

  // Deliberately conservative: an unrecognized text stays `(verify)` in the generated file rather
  // than being guessed at, because a wrong identifier in a notices file is worse than an admitted
  // gap.
  it('returns undefined rather than guessing at an unrecognized text', () => {
    expect(
      identifyLicenseFromText('Copyright (c) 2026 Example. All rights reserved.'),
    ).toBeUndefined();
  });
});

describe('xmlMatch', () => {
  const NUSPEC = [
    '<package><metadata>',
    '  <license type="expression">MIT</license>',
    '  <copyright>',
    '    Copyright (c)',
    '    Example Corp',
    '  </copyright>',
    '  <projectUrl>   </projectUrl>',
    '</metadata></package>',
  ].join('\n');

  it('extracts the first capture', () => {
    expect(xmlMatch(NUSPEC, /<license\s+type="expression"[^>]*>([\s\S]*?)<\/license>/i)).toBe(
      'MIT',
    );
  });

  it('collapses the whitespace of a multi-line value into one line', () => {
    expect(xmlMatch(NUSPEC, /<copyright>([\s\S]*?)<\/copyright>/i)).toBe(
      'Copyright (c) Example Corp',
    );
  });

  it('returns undefined when the element is absent', () => {
    expect(xmlMatch(NUSPEC, /<licenseUrl>([\s\S]*?)<\/licenseUrl>/i)).toBeUndefined();
  });

  it('returns undefined for a present but empty element, so callers need only one check', () => {
    expect(xmlMatch(NUSPEC, /<projectUrl>([\s\S]*?)<\/projectUrl>/i)).toBeUndefined();
  });
});

describe('cell', () => {
  it('escapes pipes so a license value cannot break the Markdown table', () => {
    expect(cell('MIT | GPL')).toBe('MIT \\| GPL');
  });

  it('collapses newlines and runs of whitespace, and trims', () => {
    expect(cell('  Copyright (c)\n  Example   Corp  ')).toBe('Copyright (c) Example Corp');
  });

  it('renders a missing value as an empty cell', () => {
    expect(cell(undefined)).toBe('');
  });
});

describe('isFrameworkPackage', () => {
  const FRAMEWORK: [string, string][] = [
    // Per-RID asset shims carry no code of their own; their payload belongs to the .NET runtime.
    ['runtime.linux-x64.Microsoft.NETCore.App', '8.0.0'],
    ['runtime.native.System.IO.Ports', '7.0.0'],
    // Every servicing bump inside an overridden major is still superseded.
    ['System.Buffers', '4.4.0'],
    ['System.Buffers', '4.5.1'],
    ['System.Security.Cryptography.Xml', '4.7.1'],
    // The override list is matched case-insensitively, as NuGet ids are.
    ['system.buffers', '4.5.1'],
  ];

  it.each(FRAMEWORK)('reports %s@%s as superseded by the shared framework', (id, version) => {
    expect(isFrameworkPackage(id, version)).toBe(true);
  });

  const SHIPPED: [string, string][] = [
    // The modern re-release of a superseded family ships again, so only the major is compared.
    ['System.Security.Cryptography.Xml', '9.0.0'],
    ['System.Collections.Immutable', '8.0.0'],
    ['Newtonsoft.Json', '13.0.3'],
    ['SharpZipLib', '1.4.2'],
  ];

  it.each(SHIPPED)('reports %s@%s as a package that still ships', (id, version) => {
    expect(isFrameworkPackage(id, version)).toBe(false);
  });
});
