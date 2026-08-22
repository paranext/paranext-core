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

  it('says an override is not pinned, unlike an exception', () => {
    // The governance difference is real and easy to miss: an exception re-blocks when the package
    // changes, an override does not.
    expect(describeBlock({ ...noText, declared: undefined })).toContain('NOT pinned');
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
  // that left the closure fires never and so says nothing at all. `npm:harmony-reflect` is the live
  // case in the committed policy.
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

  it('matches on ecosystem too, so an npm entry is not satisfied by a NuGet package', () => {
    const entries = stalePolicyEntries({ elections: { 'npm:CsvHelper': {} } }, verdicts);
    expect(entries).toEqual(['election "npm:CsvHelper" - no such package in the shipping set']);
  });

  it('reports nothing when every entry matched a package in the run', () => {
    const entries = stalePolicyEntries(
      {
        elections: { 'npm:jszip': {}, 'nuget:CsvHelper': {} },
        exceptions: [{ package: 'npm:jszip@3.10.1' }],
      },
      verdicts,
    );
    expect(entries).toEqual([]);
  });

  it('reports nothing for a policy with no elections or exceptions at all', () => {
    expect(stalePolicyEntries({}, verdicts)).toEqual([]);
  });
});
