import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { diffDocument, buildLock, diffLock, diffShippingSet, readLock, writeLock } from './lock';

/** Stand-in for the rendered `THIRD-PARTY-NOTICES.md` a lock is written beside. */
const DOCUMENT = '# Third-party notices\n';

const verdict = (name: string, spdxId: string, textSha256: string, matchedFile = 'LICENSE') => ({
  ecosystem: 'npm' as const,
  name,
  version: '1.0.0',
  verdict: 'allowed' as const,
  spdxId,
  confidence: 100,
  matchedFile,
  textSha256,
  reason: 'r',
});

const lock = (...v: ReturnType<typeof verdict>[]) =>
  buildLock({ verdicts: v, licenseeVersion: '9.18.0', corpusVersion: '6.6.0' }, DOCUMENT);

describe('buildLock', () => {
  it('sorts packages by ecosystem, name, then version for a stable, reviewable diff', () => {
    // Nothing else in this file asserts on buildLock's own output shape - every other test reads
    // the result only through diffLock, which (deliberately, see below) does not depend on this
    // order. The sort exists purely so the committed lock file's own diff stays small and
    // reviewable across a PR, which is worth pinning in its own right.
    const result = buildLock(
      {
        verdicts: [verdict('c', 'MIT', 'h3'), verdict('a', 'MIT', 'h1'), verdict('b', 'MIT', 'h2')],
        licenseeVersion: '9.18.0',
        corpusVersion: '6.6.0',
      },
      DOCUMENT,
    );
    expect(result.packages.map((p) => p.name)).toEqual(['a', 'b', 'c']);
  });

  it('sorts by ecosystem when only ecosystem differs', () => {
    // The name-only case above hardcodes ecosystem: 'npm' (verdict()'s default) on every fixture,
    // so a broken ecosystem tie-break term would still pass it. Not hypothetical: the real
    // artifact carries both npm and NuGet closures side by side.
    const result = buildLock(
      {
        verdicts: [
          { ...verdict('same-pkg', 'MIT', 'h1'), ecosystem: 'nuget' as const },
          verdict('same-pkg', 'MIT', 'h1'),
        ],
        licenseeVersion: '9.18.0',
        corpusVersion: '6.6.0',
      },
      DOCUMENT,
    );
    expect(result.packages.map((p) => p.ecosystem)).toEqual(['npm', 'nuget']);
  });

  it('sorts by version when only version differs', () => {
    // Every other fixture in this file hardcodes version: '1.0.0' (verdict()'s default), so a
    // broken version tie-break term would still pass every other test. Not hypothetical: the real
    // artifact carries lucide-react at both 0.475.0 and 1.8.0.
    const result = buildLock(
      {
        verdicts: [
          { ...verdict('lucide-react', 'MIT', 'h2'), version: '1.8.0' },
          { ...verdict('lucide-react', 'MIT', 'h1'), version: '0.475.0' },
        ],
        licenseeVersion: '9.18.0',
        corpusVersion: '6.6.0',
      },
      DOCUMENT,
    );
    expect(result.packages.map((p) => p.version)).toEqual(['0.475.0', '1.8.0']);
  });
});

describe('diffLock', () => {
  it('reports no drift for an identical set', () => {
    expect(diffLock(lock(verdict('a', 'MIT', 'h1')), lock(verdict('a', 'MIT', 'h1')))).toEqual([]);
  });

  it('reports a changed license text under the same version', () => {
    // The failure this exists to catch: a dependency bump - or a republish - silently changing a
    // license. Without the hash, the only evidence would be a diff buried in a 6,000-line document.
    const drift = diffLock(
      lock(verdict('a', 'MIT', 'h1')),
      lock(verdict('a', 'MIT', 'CHANGED', 'NOTICE.txt')),
    );
    expect(drift).toHaveLength(1);
    expect(drift[0]).toContain('license text changed');
    // The whole point of this message is telling the developer WHICH file to open - a message
    // that says text changed but not where would send them back to re-derive that themselves. A
    // distinct filename (rather than the default 'LICENSE', which could coincidentally overlap
    // with other message text) pins this to the matchedFile value specifically.
    expect(drift[0]).toContain('NOTICE.txt');
  });

  it('reports the matched file changing under an identical text', () => {
    // Not a license change - same identifier, same hash - but it IS a change to what the committed
    // lock records, so the next regeneration rewrites the file. Reporting nothing for it lets
    // `--verify` say "verified" about a lock that is about to change.
    const drift = diffLock(
      lock(verdict('a', 'MIT', 'h1', 'LICENSE')),
      lock(verdict('a', 'MIT', 'h1', 'LICENSE.md')),
    );
    expect(drift).toHaveLength(1);
    expect(drift[0]).toContain('from LICENSE (100%) to LICENSE.md (100%)');
  });

  it('reports a changed SPDX id, in the correct direction', () => {
    const drift = diffLock(lock(verdict('a', 'MIT', 'h1')), lock(verdict('a', 'Apache-2.0', 'h1')));
    // An ordered substring, not two separate toContains: two separate checks pass identically
    // whichever way the interpolation is ordered, so they cannot tell "MIT -> Apache-2.0" apart
    // from a reversed "Apache-2.0 -> MIT" - a developer reading the reversed message would
    // misdiagnose the direction of the drift and could clear a real change as benign.
    expect(drift[0]).toContain('from MIT to Apache-2.0');
  });

  it('reports an added package', () => {
    const drift = diffLock(
      lock(verdict('a', 'MIT', 'h1')),
      lock(verdict('a', 'MIT', 'h1'), verdict('b', 'MIT', 'h2')),
    );
    // The label word itself, not just the package key - swapping the 'added'/'removed' label
    // strings while keeping the correct !before.has/!after.has logic would otherwise pass this
    // test, and would read as an added package silently being reported as removed.
    expect(drift[0]).toContain('added: npm:b@1.0.0');
  });

  it('reports a removed package', () => {
    const drift = diffLock(
      lock(verdict('a', 'MIT', 'h1'), verdict('b', 'MIT', 'h2')),
      lock(verdict('a', 'MIT', 'h1')),
    );
    expect(drift[0]).toContain('removed: npm:b@1.0.0');
  });

  it('reports a licensee version change, in the correct direction, because it can change verdicts', () => {
    const a = buildLock(
      {
        verdicts: [verdict('a', 'MIT', 'h1')],
        licenseeVersion: '9.18.0',
        corpusVersion: '6.6.0',
      },
      DOCUMENT,
    );
    const b = buildLock(
      {
        verdicts: [verdict('a', 'MIT', 'h1')],
        licenseeVersion: '9.19.0',
        corpusVersion: '6.6.0',
      },
      DOCUMENT,
    );
    const drift = diffLock(a, b);
    const message = drift.find((d) => d.includes('licensee'));
    // Guard clause, not `if (message) expect(...)`: this repo's `vitest/no-conditional-expect`
    // rule flags an assertion inside a conditional (see declared.test.ts for the same pattern).
    if (!message) throw new Error('expected a licensee-version drift message');
    // Ordered substring: see the SPDX-id test above for why two separate toContains cannot tell
    // the direction of the change apart from its reverse.
    expect(message).toContain('from 9.18.0 to 9.19.0');
  });

  it('reports a corpus version change, distinguishable from a licensee version change', () => {
    // Mirrors the licensee-version case above: every OTHER test in this file passes the same
    // corpusVersion constant on both sides, so nothing else exercises this comparison. The remedy
    // for a corpus bump (review the SPDX text index) differs from a licensee bump (review the
    // verdict diff), so a reader must be able to tell which one happened from the message alone.
    const a = buildLock(
      {
        verdicts: [verdict('a', 'MIT', 'h1')],
        licenseeVersion: '9.18.0',
        corpusVersion: '6.6.0',
      },
      DOCUMENT,
    );
    const b = buildLock(
      {
        verdicts: [verdict('a', 'MIT', 'h1')],
        licenseeVersion: '9.18.0',
        corpusVersion: '6.7.0',
      },
      DOCUMENT,
    );
    const drift = diffLock(a, b);
    const message = drift.find((d) => d.includes('corpus'));
    if (!message) throw new Error('expected a corpus-version drift message');
    expect(message).toContain('from 6.6.0 to 6.7.0');
    expect(drift.some((d) => d.includes('licensee'))).toBe(false);
  });

  it('is insensitive to package ordering', () => {
    const a = lock(verdict('a', 'MIT', 'h1'), verdict('b', 'MIT', 'h2'));
    const b = lock(verdict('b', 'MIT', 'h2'), verdict('a', 'MIT', 'h1'));
    expect(diffLock(a, b)).toEqual([]);
  });

  it('is insensitive to package ordering even when the packages array is not pre-sorted', () => {
    // `buildLock` sorts internally, so two `lock(...)` calls with arguments in a different order
    // still produce identically-ordered `packages` arrays - the case above alone cannot tell an
    // order-insensitive `diffLock` from one that merely inherited order-insensitivity from
    // `buildLock`'s sort. Construct the `Lock` shape by hand, out of order, to pin `diffLock`'s own
    // behavior independent of `buildLock`.
    const base = { licenseeVersion: '9.18.0', corpusVersion: '6.6.0' };
    const packageA = verdict('a', 'MIT', 'h1');
    const packageB = verdict('b', 'MIT', 'h2');
    const toLockPackage = (v: ReturnType<typeof verdict>) => ({
      ecosystem: v.ecosystem,
      name: v.name,
      version: v.version,
      spdxId: v.spdxId,
      confidence: v.confidence,
      matchedFile: v.matchedFile,
      textSha256: v.textSha256,
    });
    const a = { ...base, packages: [toLockPackage(packageA), toLockPackage(packageB)] };
    const b = { ...base, packages: [toLockPackage(packageB), toLockPackage(packageA)] };
    expect(diffLock(a, b)).toEqual([]);
  });
});

describe('diffShippingSet', () => {
  // Unlike diffLock, this never touches spdxId/confidence/matchedFile/textSha256 - the cheap
  // cross-platform check has none of that (no license identification runs), so the fixtures below
  // deliberately carry only name/version, the one shape `--verify-shipping-set` actually produces.
  const npm = (name: string, version = '1.0.0') => ({ ecosystem: 'npm' as const, name, version });
  const nuget = (name: string, version = '1.0.0') => ({
    ecosystem: 'nuget' as const,
    name,
    version,
  });
  const lockOf = (
    ...packages: { ecosystem: 'npm' | 'nuget'; name: string; version: string }[]
  ) => ({
    licenseeVersion: '9.18.0',
    corpusVersion: '6.6.0',
    packages,
  });

  it('reports no drift when the current npm set matches the lock exactly', () => {
    expect(diffShippingSet(lockOf(npm('a'), npm('b')), [npm('a'), npm('b')])).toEqual([]);
  });

  it('is insensitive to ordering on both sides', () => {
    expect(diffShippingSet(lockOf(npm('b'), npm('a')), [npm('a'), npm('b')])).toEqual([]);
  });

  it('names a package this platform ships that the lock does not record', () => {
    // The genuine per-platform divergence: an optional dependency whose `os`/`cpu` constraints
    // match here installs, so this platform ships a package the committed lock does not record.
    const drift = diffShippingSet(lockOf(npm('a')), [npm('a'), npm('windows-only')]);
    expect(drift).toContain('added: windows-only@1.0.0');
  });

  it('names a package the lock records that this platform does not ship', () => {
    const drift = diffShippingSet(lockOf(npm('a'), npm('linux-only')), [npm('a')]);
    expect(drift).toContain('removed: linux-only@1.0.0');
  });

  it('reports a version change as both an addition and a removal, naming each version', () => {
    // There is no separate "version changed" message here (unlike diffLock's SPDX-id case) - the
    // key is name@version, so a version bump is indistinguishable from swapping one package for
    // another. Both messages together still name exactly what changed.
    const drift = diffShippingSet(lockOf(npm('a', '1.0.0')), [npm('a', '2.0.0')]);
    expect(drift).toContain('added: a@2.0.0');
    expect(drift).toContain('removed: a@1.0.0');
  });

  it('ignores NuGet entries in the lock entirely', () => {
    // This check never runs NuGet - no dotnet, no network - so a NuGet-only entry in the lock must
    // never surface as a "removed" package just because the current (npm-only) set omits it.
    expect(diffShippingSet(lockOf(npm('a'), nuget('SomeNugetPackage')), [npm('a')])).toEqual([]);
  });
});

describe('writeLock / readLock', () => {
  it('round-trips without diffLock seeing a difference, even with undefined fields', () => {
    // JSON.stringify DROPS an object key whose value is undefined, rather than writing null - a
    // NuGet package's matchedFile/textSha256 are routinely undefined (no license file is even
    // expected, see policy.ts), so this is the realistic case, not an edge case. The round-trip
    // is not byte-for-byte identical (the key is simply absent after a read), but it must be
    // EQUIVALENT under diffLock: an absent key and a present-but-undefined key must compare as no
    // drift, or every NuGet-only package would show false drift on every run.
    const original = buildLock(
      {
        verdicts: [
          {
            ecosystem: 'nuget',
            name: 'SomePackage',
            version: '1.0.0',
            spdxId: 'MIT',
            confidence: 100,
            matchedFile: undefined,
            textSha256: undefined,
          },
        ],
        licenseeVersion: '9.18.0',
        corpusVersion: '6.6.0',
      },
      DOCUMENT,
    );
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-lock-'));
    try {
      const file = path.join(dir, 'notices-lock.json');
      writeLock(file, original);
      const roundTripped = readLock(file);
      expect(diffLock(original, roundTripped)).toEqual([]);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('diffDocument', () => {
  const documentLock = buildLock(
    { verdicts: [verdict('a', 'MIT', 'h1')], licenseeVersion: '10.1.0', corpusVersion: '6.6.0' },
    DOCUMENT,
  );

  it('agrees when the document is the one the lock was written beside', () => {
    expect(diffDocument(documentLock, 'THIRD-PARTY-NOTICES.md', DOCUMENT)).toEqual([]);
  });

  it('reports a document that was edited after it was generated', () => {
    // The case no other field in the lock can see: deleting a copyleft row, or swapping one license
    // text for another, leaves every package entry identical. Without this hash the release
    // workflows' only notices gate cannot see a hand-edited document at all.
    const [drift] = diffDocument(documentLock, 'THIRD-PARTY-NOTICES.md', `${DOCUMENT}edited\n`);
    expect(drift).toContain('THIRD-PARTY-NOTICES.md');
    expect(drift).toContain('edited by hand');
  });

  it('reports a lock that records no hash rather than reading silence as agreement', () => {
    // A lock written before this field existed cannot answer the question, and the one thing it
    // must not do is answer it in the permissive direction.
    const { documentSha256, ...withoutHash } = documentLock;
    expect(documentSha256).toBeDefined();
    expect(diffDocument(withoutHash, 'THIRD-PARTY-NOTICES.md', DOCUMENT)).toHaveLength(1);
  });
});
