import { describe, expect, it } from 'vitest';
import { describeBlock, stalePolicyEntries } from './report';

const block = {
  ecosystem: 'npm' as const,
  name: 'weird-pkg',
  version: '2.1.0',
  verdict: 'blocked' as const,
  spdxId: undefined,
  reason: 'declares MIT but its LICENSE identifies as Apache-2.0 (99% confidence)',
  declared: 'MIT',
  detected: 'Apache-2.0',
  matchedFile: 'LICENSE',
  textSha256: 'deadbeef',
};

describe('describeBlock', () => {
  it('names the package and both signals', () => {
    const message = describeBlock(block);
    expect(message).toContain('weird-pkg@2.1.0');
    expect(message).toContain('MIT');
    expect(message).toContain('Apache-2.0');
    expect(message).toContain('LICENSE');
  });

  it('includes a pasteable exception entry with the hash precomputed', () => {
    // No named owner means whoever trips the gate is probably seeing it for the first time. Their
    // job should be supplying a reason and a reviewer, not reverse-engineering a schema.
    const message = describeBlock(block);
    const json = message.slice(message.indexOf('{'), message.lastIndexOf('}') + 1);
    const parsed = JSON.parse(json);
    expect(parsed.package).toBe('npm:weird-pkg@2.1.0');
    expect(parsed.textSha256).toBe('deadbeef');
    expect(parsed.reviewer).toBeDefined();
  });

  it('leaves the reviewer AND the date for a human to fill in', () => {
    // `applyException` blocks an entry with no reviewer and no date, because "without a name and a
    // date it is not reviewable". Pre-filling today's date satisfies half of that automatically:
    // the developer pastes an entry already carrying a date they did not choose, against a
    // determination they have not yet made. Both fields are placeholders, and the hash - which IS a
    // fact this run computed - is the only thing filled in for them.
    const message = describeBlock(block);
    const parsed = JSON.parse(message.slice(message.indexOf('{'), message.lastIndexOf('}') + 1));
    expect(parsed.date).not.toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(parsed.date).toContain('YYYY-MM-DD');
    expect(parsed.reviewer).toContain('<');
    expect(parsed.textSha256).toBe('deadbeef');
  });

  it('names the file the developer must edit', () => {
    expect(describeBlock(block)).toContain('notices-policy.json');
  });

  // A package that ships NO license text cannot be cleared by an exception at all: applyException
  // refuses one that is not pinned to a text hash. Offering that template here would be remedy
  // advice the gate then rejects, which is how a package ends up with no instrument able to clear
  // it - the failure this branch exists to prevent.
  const noText = {
    ecosystem: 'npm' as const,
    name: 'radix-ish',
    version: '1.1.1',
    verdict: 'blocked' as const,
    spdxId: undefined,
    reason: 'OFL-1.1 is not on the allowed list',
    declared: 'OFL-1.1',
    detected: undefined,
    matchedFile: undefined,
    textSha256: undefined,
  };

  it('never offers an exception for a package with no license text', () => {
    const message = describeBlock(noText);
    expect(message).not.toContain('"exceptions"');
    expect(message).not.toContain('textSha256');
    expect(message).toContain('cannot clear it');
  });

  it('points a single declared identifier at the allow list', () => {
    const message = describeBlock(noText);
    expect(message).toContain('"allowed"');
    expect(message).toContain('OFL-1.1');
  });

  it('points a multi-operand declaration at an election, keyed without the version', () => {
    const message = describeBlock({ ...noText, declared: 'MIT OR GPL-3.0-or-later' });
    expect(message).toContain('"elections"');
    // Elections and overrides are keyed `ecosystem:name`; only exceptions carry the version.
    expect(message).toContain('"npm:radix-ish"');
    expect(message).not.toContain('"npm:radix-ish@1.1.1"');
  });

  it('offers a pasteable override when the package declares nothing usable', () => {
    const message = describeBlock({ ...noText, declared: undefined });
    expect(message).toContain('"overrides"');
    const json = message.slice(message.indexOf('{'), message.lastIndexOf('}') + 1);
    const parsed = JSON.parse(json);
    expect(parsed['npm:radix-ish'].license).toBeDefined();
    expect(parsed['npm:radix-ish'].note).toBeDefined();
  });

  it('says an override is not pinned to a text, unlike an exception', () => {
    // The governance difference is real and easy to miss: an exception re-blocks when the package's
    // license TEXT changes, an override cannot - which is why it has to record which version the
    // determination was read from instead.
    const message = describeBlock({ ...noText, declared: undefined });
    expect(message).toContain('not pinned to a license text');
    expect(message).toContain('holds at any version');
  });

  // Both fields are required by the gate. A template omitting them is advice the gate then
  // rejects: a free-text value is refused without `nonSpdx`, and an entry recording neither
  // `version` nor `versionIndependent` is refused outright.
  it('offers an override template carrying every field the gate requires', () => {
    const message = describeBlock({ ...noText, declared: undefined });
    const parsed = JSON.parse(
      message.slice(message.indexOf('{'), message.lastIndexOf('}') + 1).replace(/^ {4}/gm, ''),
    );
    expect(Object.keys(parsed['npm:radix-ish'])).toEqual(
      expect.arrayContaining(['license', 'nonSpdx', 'version', 'versionIndependent']),
    );
  });

  it('still reports both signals as absent when nothing was found at all', () => {
    const message = describeBlock({ ...noText, declared: undefined });
    expect(message).toContain('(nothing declared)');
    expect(message).toContain('(no text identified)');
    expect(message).toContain('(none)');
  });
});

describe('stalePolicyEntries', () => {
  // A dead entry is not a build failure - the package simply left - but it is not nothing either.
  // It is a recorded determination about a package a reader may believe still ships, and it would
  // auto-apply the moment that name@version came back, an election silently. A stale EXCEPTION is
  // reported today only when it FIRES and its hash no longer matches; one belonging to a package
  // that left the closure fires never and so says nothing at all.
  const verdicts = [
    { ecosystem: 'npm', name: 'jszip', version: '3.10.1' },
    { ecosystem: 'nuget', name: 'CsvHelper', version: '33.1.0' },
  ];

  it('reports an election for a package that is not in the shipping set', () => {
    const entries = stalePolicyEntries(
      { elections: { 'npm:jszip': {}, 'npm:harmony-reflect': {} } },
      verdicts,
    );
    expect(entries).toEqual([
      'election "npm:harmony-reflect" - no such package in the shipping set',
    ]);
  });

  it('reports an exception whose package is present at a DIFFERENT version', () => {
    // Version-scoped, because that is how an exception is keyed: an entry pinned to 3.9.0 is dead
    // once the package moves to 3.10.1, and it never fires to say so.
    const entries = stalePolicyEntries(
      { exceptions: [{ package: 'npm:jszip@3.9.0' }, { package: 'npm:jszip@3.10.1' }] },
      verdicts,
    );
    expect(entries).toEqual([
      'exception "npm:jszip@3.9.0" - no such package at that version in the shipping set',
    ]);
  });

  it('reports an unbundled-dependency entry once its package IS in the shipping set', () => {
    // Inverted against every other table here: this entry records that nothing bundles a declared
    // dependency, so it goes stale when the package ARRIVES rather than when it leaves. Left
    // behind, it suppresses nothing - the row is there either way - but it stands as a finding
    // that is no longer true, and the next reader has no reason to re-derive it.
    const entries = stalePolicyEntries(
      { unbundledDependencies: { jszip: {}, 'electron-updater': {} } },
      verdicts,
    );
    expect(entries).toEqual([
      'unbundled dependency "jszip" - it is in the shipping set now, so the entry no longer ' +
        'describes it',
    ]);
  });

  it('matches on ecosystem too, so an npm entry is not satisfied by a NuGet package', () => {
    const entries = stalePolicyEntries({ elections: { 'npm:CsvHelper': {} } }, verdicts);
    expect(entries).toEqual(['election "npm:CsvHelper" - no such package in the shipping set']);
  });

  // The one table pinned to neither a version nor a text hash, and mostly read from a package's
  // REPOSITORY rather than its tarball - so an upstream rename leaves the entry behind and the
  // package it credited silently loses its attribution, with nothing else able to notice.
  it('reports a copyright notice for a package that is not in the shipping set', () => {
    const entries = stalePolicyEntries(
      {
        copyrightNotices: {
          'npm:jszip': 'Copyright (c) 2009-2016 Stuart Knightley',
          'npm:harmony-reflect': 'Copyright (c) 2013 Tom Van Cutsem',
        },
      },
      verdicts,
    );
    expect(entries).toEqual([
      'copyright notice "npm:harmony-reflect" - no such package in the shipping set',
    ]);
  });

  it('reports nothing when every entry matched a package in the run', () => {
    const entries = stalePolicyEntries(
      {
        elections: { 'npm:jszip': {}, 'nuget:CsvHelper': {} },
        exceptions: [{ package: 'npm:jszip@3.10.1' }],
        copyrightNotices: { 'nuget:CsvHelper': 'Copyright © 2009-2024 Josh Close' },
      },
      verdicts,
    );
    expect(entries).toEqual([]);
  });

  it('reports nothing for a policy with no elections or exceptions at all', () => {
    expect(stalePolicyEntries({}, verdicts)).toEqual([]);
  });
});

describe('a remedy the gate would reject is not offered', () => {
  const POLICY = {
    copyleft: ['GPL-3.0-or-later', 'AGPL-3.0-or-later'],
    allowed: ['MIT', 'Apache-2.0', 'BSD-3-Clause'],
  };

  // `describeBlock` routes on `textSha256` alone, and a text that IDENTIFIES as copyleft is the
  // commonest block there is - so this is the template most people meet. Offering the exception
  // template here would be advice with no correct completion: the entry would record the copyleft
  // identifier, which `applyException` refuses outright, and an exception may not override a
  // positively identified copyleft text at all.
  const copyleftText = {
    ecosystem: 'npm' as const,
    name: 'gpl-pkg',
    version: '1.0.0',
    verdict: 'blocked' as const,
    spdxId: undefined,
    reason: 'text-derived GPL-3.0-or-later is copyleft with no election available',
    declared: undefined,
    detected: 'GPL-3.0-or-later',
    matchedFile: 'COPYING',
    textSha256: 'cafe',
  };

  it('does not offer an exception for a positively identified copyleft text', () => {
    const message = describeBlock(copyleftText, POLICY);
    expect(message).not.toContain('"exceptions" array');
    expect(message).not.toContain('<your email>');
  });

  it('says why, and names what could actually resolve it', () => {
    const message = describeBlock(copyleftText, POLICY);
    expect(message).toContain('COPYING');
    expect(message).toContain('cannot clear this block');
    expect(message).toContain('elections');
    expect(message).toContain('the dependency itself has to change');
  });

  // Without the policy the remedy cannot know, and falls back to offering the exception. Pinned so
  // that a caller who forgets to pass it is a visible difference rather than a silent one.
  it('still offers the exception when no copyleft list is supplied', () => {
    expect(describeBlock(copyleftText)).toContain('"exceptions" array');
  });

  // A conjunction leaves `detected` undefined, so this printed a placeholder asking the reader for
  // something already on the line above. What such an exception must record is the compound
  // expression - the shape all three conjunction entries in the closure carry.
  it('records the declared expression for a conjunction rather than a placeholder', () => {
    const message = describeBlock(
      {
        ecosystem: 'npm' as const,
        name: 'dual-pkg',
        version: '3.0.0',
        verdict: 'blocked' as const,
        spdxId: undefined,
        reason:
          'MIT AND Apache-2.0 contains a conjunction (AND) - every operand applies simultaneously',
        declared: 'MIT AND Apache-2.0',
        detected: undefined,
        matchedFile: undefined,
        textSha256: 'f00d',
      },
      POLICY,
    );
    const json = message.slice(message.indexOf('{'), message.lastIndexOf('}') + 1);
    expect(JSON.parse(json).spdx).toBe('MIT AND Apache-2.0');
    expect(message).not.toContain('<SPDX identifier this package is actually under>');
  });

  // The three operator shapes reach `policyRemedy` when the package ships no license text, and NO
  // policy entry can clear any of them - `resolveDeclaredPrefix` refuses them before any list
  // lookup, `applyException` refuses two of them by name, and `applyOverride` is only reached for a
  // declaration that does not parse. Offering an allow-list or elections route is advice the gate
  // rejects, which is the failure this function exists to prevent.
  it.each([
    ['Apache-2.0 WITH LLVM-exception', 'license exception'],
    ['Apache-2.0+', 'or later'],
    ['LicenseRef-Commercial', 'not a grant this project can verify'],
  ])('offers no policy instrument for %s, which none of them can clear', (declared, expected) => {
    const message = describeBlock(
      {
        ecosystem: 'npm' as const,
        name: 'operator-pkg',
        version: '1.0.0',
        verdict: 'blocked' as const,
        spdxId: undefined,
        reason: 'blocked on an SPDX operator',
        declared,
        detected: undefined,
        matchedFile: undefined,
        textSha256: undefined,
      },
      POLICY,
    );
    expect(message).toContain(expected);
    expect(message).toContain('the dependency');
    expect(message).not.toContain('"elections"');
    expect(message).not.toContain('"overrides"');
    expect(message).not.toContain('add that identifier to');
  });

  // An SPDX `WITH` operand names a license exception that modifies the grant its base identifier
  // makes, and `applyException` refuses one outright. Filling the template's `spdx` with the base
  // identifier hands back an entry the gate accepts while the document reproduces the plain text
  // for a grant that is not plain.
  it('does not drop a WITH operand from the template it prints', () => {
    const message = describeBlock(
      {
        ecosystem: 'npm' as const,
        name: 'with-pkg',
        version: '1.0.0',
        verdict: 'blocked' as const,
        spdxId: undefined,
        reason: 'Apache-2.0 WITH LLVM-exception carries a license exception',
        declared: 'Apache-2.0 WITH LLVM-exception',
        detected: undefined,
        matchedFile: undefined,
        textSha256: 'beef',
      },
      POLICY,
    );
    const json = message.slice(message.indexOf('{'), message.lastIndexOf('}') + 1);
    expect(JSON.parse(json).spdx).toBe('<SPDX identifier this package is actually under>');
  });

  // The live case: `npm:jszip@3.10.1` declares `(MIT OR GPL-3.0-or-later)` and its LICENSE.markdown
  // concatenates both texts, so nothing clears the threshold and `detected` is undefined. Falling
  // back to the whole expression printed a paste-ready entry `applyException` is guaranteed to
  // re-block, for the very operand that caused the block.
  const disjunction = {
    ecosystem: 'npm' as const,
    name: 'either-pkg',
    version: '3.10.1',
    verdict: 'blocked' as const,
    spdxId: undefined,
    reason: 'no license text cleared the confidence threshold',
    declared: '(MIT OR GPL-3.0-or-later)',
    detected: undefined,
    matchedFile: 'LICENSE.markdown',
    textSha256: 'beef',
  };

  it('records the admissible branch of a disjunction, not the whole expression', () => {
    const message = describeBlock(disjunction, POLICY);
    const json = message.slice(message.indexOf('{'), message.lastIndexOf('}') + 1);
    expect(JSON.parse(json).spdx).toBe('MIT');
  });

  it('falls back to the placeholder when no branch of a disjunction would clear the gate', () => {
    const message = describeBlock(
      { ...disjunction, declared: '(AGPL-3.0-or-later OR GPL-3.0-or-later)' },
      POLICY,
    );
    const json = message.slice(message.indexOf('{'), message.lastIndexOf('}') + 1);
    expect(JSON.parse(json).spdx).toBe('<SPDX identifier this package is actually under>');
  });
});
