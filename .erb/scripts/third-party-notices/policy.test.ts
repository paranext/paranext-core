import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import correct from 'spdx-correct';
import { describe, expect, it } from 'vitest';
import { parseDeclared } from './declared';
import { classify, loadPolicy, CONFIDENCE_THRESHOLD } from './policy';
import type { Detection, Exception } from './types';

// Typed empty array rather than `[] as object[]`: `no-type-assertion/no-type-assertion` is an
// error in this repo and does not exempt test files.
const NO_EXCEPTIONS: Exception[] = [];

const POLICY = {
  allowed: ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'MPL-2.0'],
  // MPL-2.0 is deliberately on BOTH lists. If a copyleft check anywhere in `classify` were ever
  // deleted, a test that used only a copyleft-only id (e.g. GPL-3.0-or-later) could still pass "for
  // the wrong reason" - the id would simply be unlisted and block via the allow-list check instead.
  // Putting one id on both lists means only the copyleft gate can produce a block for it, so
  // deleting that gate flips the verdict to `allowed`/`elected` and the test actually fails.
  copyleft: ['GPL-3.0-or-later', 'MPL-2.0'],
  elections: {
    'npm:dompurify': { elected: 'Apache-2.0', of: 'MPL-2.0 OR Apache-2.0', reason: 'test' },
  },
  exceptions: NO_EXCEPTIONS,
};

const detected = (spdxId: string, confidence = 100, sha256 = 'abc') => ({
  dir: '/x',
  files: [{ filename: 'LICENSE', spdxId, matcher: 'exact', confidence, sha256, text: 'text' }],
});

// For the multi-file reconciliation cases: each entry is [filename, spdxId], defaulting to 100%
// confidence and a per-file hash derived from the filename so files hash distinctly.
const detectedFiles = (entries: [string, string][]) => ({
  dir: '/x',
  files: entries.map(([filename, spdxId]) => ({
    filename,
    spdxId,
    matcher: 'exact',
    confidence: 100,
    sha256: `sha-${filename}`,
    text: 'text',
  })),
});

// Same, but each entry carries its own confidence - for the cases about which files may raise an
// OBJECTION as opposed to which may resolve a verdict, where the whole point is a file sitting
// below CONFIDENCE_THRESHOLD alongside one above it.
const detectedFilesAt = (entries: [string, string, number][]) => ({
  dir: '/x',
  files: entries.map(([filename, spdxId, confidence]) => ({
    filename,
    spdxId,
    matcher: 'exact',
    confidence,
    sha256: `sha-${filename}`,
    text: 'text',
  })),
});

const base = { name: 'p', version: '1.0.0', ecosystem: 'npm' as const, policy: POLICY };

describe('classify', () => {
  it('confidence threshold is 98', () => {
    // Pins the literal value directly: a mutant changing 98 to some other number would otherwise
    // only be caught indirectly (if at all) by threshold-adjacent test cases.
    expect(CONFIDENCE_THRESHOLD).toBe(98);
  });

  it('allows when declared and detected agree', () => {
    const v = classify({ ...base, declaredField: 'MIT', detection: detected('MIT') });
    expect(v.verdict).toBe('allowed');
    expect(v.spdxId).toBe('MIT');
  });

  it('elects a named disjunct', () => {
    const v = classify({
      ...base,
      name: 'dompurify',
      declaredField: '(MPL-2.0 OR Apache-2.0)',
      detection: detected('MPL-2.0'),
    });
    expect(v.verdict).toBe('elected');
    expect(v.spdxId).toBe('Apache-2.0');
  });

  it('blocks a disjunction with no election entry', () => {
    const v = classify({
      ...base,
      name: 'unknown-dual',
      declaredField: 'MIT OR GPL-3.0-or-later',
      detection: detected('MIT'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('no election is recorded');
  });

  it('blocks when declared and detected disagree', () => {
    const v = classify({ ...base, declaredField: 'MIT', detection: detected('Apache-2.0') });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('MIT');
    expect(v.reason).toContain('Apache-2.0');
  });

  it('treats sub-threshold confidence as no detection at all', () => {
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detected('MIT', CONFIDENCE_THRESHOLD - 1),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('no license text could be identified');
  });

  it('treats exactly-threshold confidence as usable', () => {
    // Pins `>=` against a mutant that weakens it to `>`: at exactly the threshold, `>` would
    // exclude the file and this would block instead.
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detected('MIT', CONFIDENCE_THRESHOLD),
    });
    expect(v.verdict).toBe('allowed');
  });

  it('allows a text-derived id when nothing is declared', () => {
    const v = classify({ ...base, declaredField: undefined, detection: detected('MIT') });
    expect(v.verdict).toBe('allowed');
    expect(v.reason).toContain('text-derived');
  });

  it('treats an all-whitespace declaredField the same as an empty one', () => {
    // parseDeclared already treats '' and '   ' identically ('no license declared'); classify must
    // not diverge by keying one branch off declaredField's raw truthiness and another off
    // declared.ok - both should follow the same text-derived path when usable text exists.
    const v = classify({ ...base, declaredField: '   ', detection: detected('MIT') });
    expect(v.verdict).toBe('allowed');
    expect(v.reason).toContain('text-derived');
  });

  it('blocks a text-derived id that is neither on the allow list nor the copyleft list', () => {
    // CRITICAL: the text-derived path has to use the allowlist, like every other path in
    // `policy.ts`. Testing `copyleft.has(...)` alone makes it a denylist, and an npm package with
    // no license field and a GPL LICENSE file then comes back `allowed`. BSD-2-Clause here is
    // neither vetted-permissive (not in this test policy's allowed list) nor copyleft, so it must
    // not default to allowed just because it isn't copyleft.
    const v = classify({ ...base, declaredField: undefined, detection: detected('BSD-2-Clause') });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not on the allowed list');
  });

  it('blocks a text-derived MPL-2.0 as copyleft even though it is also on the allow list', () => {
    // Kills a mutant that deletes the text-derived path's copyleft check specifically: MPL-2.0 is
    // on both lists in this test policy, so if only the copyleft check were removed, the allow-list
    // check alone would (wrongly) let it through as `allowed`.
    const v = classify({ ...base, declaredField: undefined, detection: detected('MPL-2.0') });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('copyleft');
  });

  it('normalizes a deprecated detected id before comparing against the copyleft list', () => {
    // ROOT CAUSE: licensee emits deprecated SPDX ids for several copyleft licenses (GPL-3.0, not
    // GPL-3.0-or-later) while notices-policy.json uses current forms. Without normalizing through
    // spdx-correct first, a real copyleft license would silently miss both the copyleft gate (this
    // case) and the declared-vs-detected agreement check (the next test).
    const v = classify({ ...base, declaredField: undefined, detection: detected('GPL-3.0') });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('copyleft');
  });

  it('normalizes a deprecated detected id before the declared-vs-detected agreement check', () => {
    // Without normalization, a package declaring the current form (GPL-3.0-or-later) whose text
    // detects as the deprecated form (GPL-3.0) would read as a "disagreement" and block for a
    // bogus reason instead of being correctly recognized and then blocked as copyleft.
    const v = classify({
      ...base,
      declaredField: 'GPL-3.0-or-later',
      detection: detected('GPL-3.0'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).not.toContain('identifies as GPL-3.0 ');
    expect(v.reason).toContain('copyleft');
  });

  it('blocks copyleft with no election available', () => {
    const v = classify({ ...base, declaredField: 'MPL-2.0', detection: detected('MPL-2.0') });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('copyleft');
  });

  it('blocks a non-grant disjunct rather than electing it', () => {
    const v = classify({
      ...base,
      declaredField: 'AGPL-3.0-or-later OR LicenseRef-Commercial',
      detection: detected('AGPL-3.0-or-later'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not a grant');
  });

  it('blocks a conjunction rather than routing it to an election', () => {
    // CRITICAL: AND means both operands apply - there is no branch to elect, unlike an OR
    // disjunction. parseDeclared's flattened `ids` list cannot tell AND from OR, so without an
    // explicit check a recorded election naming one operand would silently discard the other's
    // obligation. An election is deliberately recorded here (for MIT) to prove it is not consulted.
    const policy = {
      ...POLICY,
      elections: {
        ...POLICY.elections,
        'npm:p': { elected: 'MIT', of: 'MIT AND GPL-3.0-or-later', reason: 'should never be used' },
      },
    };
    const v = classify({
      ...base,
      policy,
      declaredField: 'MIT AND GPL-3.0-or-later',
      detection: detected('MIT'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not a choice');
  });

  it('blocks a NuGet conjunction the same way, even with a recorded election', () => {
    const policy = {
      ...POLICY,
      elections: {
        ...POLICY.elections,
        'nuget:conjunctivepkg': {
          elected: 'MIT',
          of: 'MIT AND GPL-3.0-or-later',
          reason: 'should never be used',
        },
      },
    };
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      name: 'conjunctivepkg',
      policy,
      declaredField: 'MIT AND GPL-3.0-or-later',
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not a choice');
  });

  it('blocks a single declared id that agrees with detected text but is not on the allow list', () => {
    // Kills a mutant deleting the allow-list check on the main declared==detected agreement path:
    // BSD-2-Clause is neither copyleft nor on this test policy's allow list.
    const v = classify({
      ...base,
      declaredField: 'BSD-2-Clause',
      detection: detected('BSD-2-Clause'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not on the allowed list');
  });

  // Multiple usable license files are reconciled against the DECLARED expression rather than
  // blocking on any disagreement outright - two usable ids is the normal shape both for a
  // dual-licensed package (it ships both texts) and for a package that bundles a third-party
  // attribution alongside its own license. These cases are real, not synthetic: the round-2 fix's
  // unconditional "any disagreement blocks" rule broke npm:dompurify (a named election in the
  // shipped policy - ships LICENSE=Apache-2.0 and LICENSE-MPL=MPL-2.0, declares
  // "(MPL-2.0 OR Apache-2.0)") and npm:doctrine (declares plain Apache-2.0, bundles esprima's
  // BSD-2-Clause LICENSE.esprima alongside its own LICENSE).

  it('resolves a dual-licensed package whose detected ids match its declared disjunction', () => {
    // npm:dompurify's real shape, with its real filenames. LICENSE-MPL listed FIRST deliberately:
    // it is NOT the elected id, so a `best`/`common` computed from an arbitrary "first usable file"
    // pick (rather than looked up by the id actually elected) would misattribute the record to the
    // wrong file - this ordering is what makes the assertions below actually exercise that.
    const v = classify({
      ...base,
      name: 'dompurify',
      declaredField: '(MPL-2.0 OR Apache-2.0)',
      detection: detectedFiles([
        ['LICENSE-MPL', 'MPL-2.0'],
        ['LICENSE', 'Apache-2.0'],
      ]),
    });
    expect(v.verdict).toBe('elected');
    expect(v.spdxId).toBe('Apache-2.0');
    // The record names the file that actually matches the elected id, not an arbitrary pick among
    // the two usable files.
    expect(v.matchedFile).toBe('LICENSE');
    expect(v.textSha256).toBe('sha-LICENSE');
  });

  it('resolves on the declared id when a bundled extra is allow-listed', () => {
    // npm:doctrine's real shape and real filenames. The extra's real detected id is BSD-2-Clause,
    // which IS on the real notices-policy.json's allow list - substituted here with BSD-3-Clause
    // only because this test's local POLICY (line 20) is a deliberately reduced fixture that other
    // tests in this file rely on treating BSD-2-Clause as unlisted (see the "not on the allowed
    // list" tests below). The mechanism under test - an allow-listed extra passes through - is
    // identical either way.
    const v = classify({
      ...base,
      name: 'doctrine',
      declaredField: 'Apache-2.0',
      detection: detectedFiles([
        ['LICENSE', 'Apache-2.0'],
        ['LICENSE.esprima', 'BSD-3-Clause'],
      ]),
    });
    expect(v.verdict).toBe('allowed');
    expect(v.spdxId).toBe('Apache-2.0');
    expect(v.matchedFile).toBe('LICENSE');
  });

  it('blocks when a bundled extra is copyleft, even though the primary id is permissive', () => {
    // An undisclosed copyleft obligation must not hide behind a permissive primary license.
    // Reconciliation deliberately does not block on every disagreement between files, and this is
    // the disagreement it must still block on.
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detectedFiles([
        ['LICENSE', 'MIT'],
        ['COPYING', 'GPL-3.0-or-later'],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('COPYING');
    expect(v.reason).toContain('GPL-3.0-or-later');
    expect(v.reason).toContain('copyleft');
  });

  it('checks a bundled extra for copyleft independently of the allow list', () => {
    // MPL-2.0 is deliberately on BOTH lists in this test policy (see POLICY above). If the
    // bundled-extra check only tested `!allowed.has(...)` and dropped the `copyleft.has(...)`
    // half, this would still "pass" the allow-list half and wrongly resolve to `allowed` -
    // exactly the "blocks for the wrong reason" trap this repo's tests are written to avoid.
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detectedFiles([
        ['LICENSE', 'MIT'],
        ['COPYING.mpl', 'MPL-2.0'],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('COPYING.mpl');
    expect(v.reason).toContain('copyleft');
  });

  it('blocks a lone license file that identifies as none of a declared disjunction', () => {
    // The gap CASE 0 covers: ONE identified file, a declaration naming several. CASE 1 and CASE 2
    // both compare detected against declared, and the single-id declaration path compares
    // `declaredId !== best.spdxId` - but a lone file under a MULTI-id declaration otherwise takes
    // `[best] = usable` straight to `resolveElection`, which reads only `declared.ids` and the
    // recorded election, so `best` is never consulted again. Against the real shipped policy that
    // means declared `(MIT OR Apache-2.0)` with a single AGPL-3.0-or-later file at 100% confidence
    // resolving to `elected MIT`. GPL-3.0-or-later here rather than an unlisted id, so the block
    // cannot come from the copyleft or allow-list gates - the disjunction's own operands are what
    // must reject it.
    const v = classify({
      ...base,
      name: 'dompurify',
      declaredField: '(MPL-2.0 OR Apache-2.0)',
      detection: detected('GPL-3.0-or-later'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('GPL-3.0-or-later');
    expect(v.reason).toContain('not one of the declared operands');
  });

  it('reconciles two files agreeing on ONE id the same way as a single file', () => {
    // `usableIds.size`, not `usable.length`: two files that both identify as the same id are one
    // detected id, and collapsing them into `[best] = usable` reaches the election path exactly as
    // a single file does. Keying the check on the file COUNT instead would leave this shape open.
    const v = classify({
      ...base,
      name: 'dompurify',
      declaredField: '(MPL-2.0 OR Apache-2.0)',
      detection: detectedFiles([
        ['LICENSE', 'GPL-3.0-or-later'],
        ['COPYING', 'GPL-3.0-or-later'],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not one of the declared operands');
  });

  it('elects when a lone file IS one of the declared operands', () => {
    // The permissiveness control for the two above. A dual-licensed package that ships only ONE of
    // its two texts is the normal shape the election exists to resolve, and this must not have
    // become collateral damage.
    const v = classify({
      ...base,
      name: 'dompurify',
      declaredField: '(MPL-2.0 OR Apache-2.0)',
      detection: detected('MPL-2.0'),
    });
    expect(v.verdict).toBe('elected');
    expect(v.spdxId).toBe('Apache-2.0');
  });

  it('blocks a disjunction with only a PARTIAL detected match', () => {
    // Not every detected id is an operand of the declared disjunction (Artistic-2.0 is not "MPL-2.0
    // OR Apache-2.0"), so this must NOT take the CASE 1 pass-through - an unrelated bundled file
    // must not ride along with a real dual-license match unexamined. Falls to CASE 3 and blocks.
    const v = classify({
      ...base,
      name: 'dompurify',
      declaredField: '(MPL-2.0 OR Apache-2.0)',
      detection: detectedFiles([
        ['LICENSE', 'Apache-2.0'],
        ['LICENSE.vendored', 'Artistic-2.0'],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('disagree');
  });

  it('blocks when a bundled extra is neither allowed nor copyleft', () => {
    // Artistic-2.0 is a real SPDX id that is on neither list in this test policy - proves the
    // extra-file check is an allowlist (blocks anything unlisted), not only a copyleft denylist.
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detectedFiles([
        ['LICENSE', 'MIT'],
        ['LICENSE.vendored', 'Artistic-2.0'],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('LICENSE.vendored');
    expect(v.reason).toContain('not on the allowed list');
  });

  // The confidence threshold decides which files may RESOLVE a verdict, not which may raise an
  // OBJECTION. These three pin that the objecting scan is an allowlist and that it still ignores
  // a file licensee could not identify at all.
  it('objects to a below-threshold bundled file whose id is on neither list', () => {
    // GPL-1.0-or-later is on neither list in this test policy - the exact hole a denylist leaves,
    // since only ids somebody already enumerated can be seen. The real policy's copyleft list omits
    // this one too.
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detectedFilesAt([
        ['LICENSE', 'MIT', 100],
        ['LICENSE.GPL1', 'GPL-1.0-or-later', CONFIDENCE_THRESHOLD - 3],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('LICENSE.GPL1');
    expect(v.reason).toContain('not on the allowed list');
  });

  it('objects to a below-threshold bundled file that is copyleft', () => {
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detectedFilesAt([
        ['LICENSE', 'MIT', 100],
        ['LICENSE.GPL', 'GPL-3.0-or-later', CONFIDENCE_THRESHOLD - 3],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('LICENSE.GPL');
    expect(v.reason).toContain('copyleft');
  });

  it('does not object to a file licensee could not identify', () => {
    // The sentinel is not an unlisted id, and case (2) below decides what an unidentifiable text
    // means with the declaration in hand. `!allowed.has('NOASSERTION')` is true, so without an
    // explicit sentinel guard every package shipping one unreadable file would block here.
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detectedFilesAt([
        ['LICENSE', 'MIT', 100],
        ['NOTICE', 'NOASSERTION', 0],
      ]),
    });
    expect(v.verdict).toBe('allowed');
    expect(v.spdxId).toBe('MIT');
  });

  it('blocks a conjunction whose files match its operands AS a conjunction', () => {
    // The two files agree exactly - with each other and with the declaration - so "license files
    // disagree" would be not merely unhelpful but false, sending the reader looking for a conflict
    // between two consistent files. CASE 1 excludes this shape (it is not a choice an election can
    // resolve) and CASE 2 excludes it (more than one declared id), so it falls through to CASE 3.
    const v = classify({
      ...base,
      declaredField: 'MIT AND Apache-2.0',
      detection: detectedFiles([
        ['LICENSE-MIT', 'MIT'],
        ['LICENSE-APACHE', 'Apache-2.0'],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('conjunction');
    expect(v.reason).not.toContain('disagree');
  });

  it('does not swallow a conjunction whose files do NOT match its operands', () => {
    // Still a real conflict: Artistic-2.0 is no operand of the declaration, so this must keep
    // falling to CASE 3 rather than being excused as "just a conjunction".
    const v = classify({
      ...base,
      declaredField: 'MIT AND Apache-2.0',
      detection: detectedFiles([
        ['LICENSE-MIT', 'MIT'],
        ['LICENSE.vendored', 'Artistic-2.0'],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('disagree');
  });

  it('blocks when no detected id matches the declaration at all', () => {
    // A declaration is present, but neither usable file corresponds to it - a real conflict, not
    // a bundled-attribution shape.
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detectedFiles([
        ['LICENSE', 'Apache-2.0'],
        ['COPYING', 'GPL-3.0-or-later'],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('disagree');
  });

  it('blocks when multiple usable license files disagree and nothing is declared', () => {
    // detect.rb orders files by filename score, not confidence or severity - picking usable[0]
    // alone could silently choose the permissive one and ignore a file naming a stricter license
    // sitting right next to it. With no declaration at all, there is nothing to reconcile against.
    const v = classify({
      ...base,
      declaredField: undefined,
      detection: detectedFiles([
        ['LICENSE', 'MIT'],
        ['COPYING', 'GPL-3.0-or-later'],
      ]),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('disagree');
  });

  it('hashes the file that produced the verdict, not files[0]', () => {
    // A verdict naming one file's spdxId while hashing a different file's text would let an
    // exception get pinned against the wrong text - the matched file's text could change while the
    // untouched files[0] keeps a stale exception silently alive.
    const v = classify({
      ...base,
      declaredField: undefined,
      detection: {
        dir: '/x',
        files: [
          {
            filename: 'COPYING',
            spdxId: 'NOASSERTION',
            matcher: 'none',
            confidence: 0,
            sha256: 'irrelevant',
            text: 't',
          },
          {
            filename: 'LICENSE',
            spdxId: 'MIT',
            matcher: 'exact',
            confidence: 100,
            sha256: 'matched-hash',
            text: 't',
          },
        ],
      },
    });
    expect(v.verdict).toBe('allowed');
    expect(v.matchedFile).toBe('LICENSE');
    expect(v.textSha256).toBe('matched-hash');
  });

  it('applies an exception matching name, version and text hash', () => {
    const policy = {
      ...POLICY,
      exceptions: [
        {
          package: 'npm:weird@1.0.0',
          spdx: 'BSD-3-Clause',
          reason: 'custom preamble',
          reviewer: 'x@y',
          date: '2026-08-20',
          textSha256: 'abc',
        },
      ],
    };
    const v = classify({
      ...base,
      name: 'weird',
      policy,
      declaredField: 'SEE LICENSE IN X',
      detection: detected('NOASSERTION', 100, 'abc'),
    });
    expect(v.verdict).toBe('excepted');
    expect(v.spdxId).toBe('BSD-3-Clause');
  });

  it('refuses an exception that records a copyleft id', () => {
    // The exception is the ONE instrument that clears a blocked verdict, so the mechanism itself
    // has to bound what it can clear TO: without this check an entry naming a copyleft id returns
    // `excepted` under it, hash pin satisfied and every other gate in this file bypassed. A
    // data-level test over the COMMITTED policy is not a substitute - by construction it cannot
    // cover an entry added in the same pull request as the policy change that would accompany it. MPL-2.0 is on both lists in this
    // fixture (see POLICY), so only the copyleft gate can produce this block.
    const policy = {
      ...POLICY,
      exceptions: [
        {
          package: 'npm:weird@1.0.0',
          spdx: 'MPL-2.0',
          reason: 'r',
          reviewer: 'x@y',
          date: '2026-08-20',
          textSha256: 'abc',
        },
      ],
    };
    const v = classify({
      ...base,
      name: 'weird',
      policy,
      declaredField: 'SEE LICENSE IN X',
      detection: detected('NOASSERTION', 100, 'abc'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('is copyleft');
  });

  it('refuses an exception that records an id which is not on the allowed list', () => {
    // Artistic-2.0 is a real SPDX id on neither list in this fixture. An exception records WHICH
    // license an unidentifiable text actually is; it is not a license to ship under terms the
    // project has not accepted, and adding an identifier to `allowed` is a visible reviewable line
    // rather than one buried in a per-package entry.
    const policy = {
      ...POLICY,
      exceptions: [
        {
          package: 'npm:weird@1.0.0',
          spdx: 'Artistic-2.0',
          reason: 'r',
          reviewer: 'x@y',
          date: '2026-08-20',
          textSha256: 'abc',
        },
      ],
    };
    const v = classify({
      ...base,
      name: 'weird',
      policy,
      declaredField: 'SEE LICENSE IN X',
      detection: detected('NOASSERTION', 100, 'abc'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not on the allowed list');
  });

  it('refuses an exception whose recorded spdx is not an SPDX expression at all', () => {
    // The `overrides` table is the instrument for a free-text determination, and it is deliberately
    // narrower (it applies only where nothing parseable is declared AND no text identified). An
    // exception carrying free text would route around that.
    const policy = {
      ...POLICY,
      exceptions: [
        {
          package: 'npm:weird@1.0.0',
          spdx: 'Proprietary - negotiated separately',
          reason: 'r',
          reviewer: 'x@y',
          date: '2026-08-20',
          textSha256: 'abc',
        },
      ],
    };
    const v = classify({
      ...base,
      name: 'weird',
      policy,
      declaredField: 'SEE LICENSE IN X',
      detection: detected('NOASSERTION', 100, 'abc'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not an SPDX expression');
  });

  it('accepts an exception recording a CONJUNCTION whose every operand is allowed', () => {
    // The permissiveness control. `npm:chroma-js`'s real shipped shape: one file holding two grants
    // (BSD-3-Clause for the library, Apache-2.0 for the colour tables it embeds), which is exactly
    // what its manifest declares. A conjunction is unresolvable as a DECLARATION (no branch to
    // elect) but is the truthful answer for an exception, so the check must be per-operand rather
    // than a rejection of anything with more than one id.
    const policy = {
      ...POLICY,
      exceptions: [
        {
          package: 'npm:weird@1.0.0',
          spdx: '(BSD-3-Clause AND Apache-2.0)',
          reason: 'two grants in one file',
          reviewer: 'x@y',
          date: '2026-08-20',
          textSha256: 'abc',
        },
      ],
    };
    const v = classify({
      ...base,
      name: 'weird',
      policy,
      declaredField: 'SEE LICENSE IN X',
      detection: detected('NOASSERTION', 100, 'abc'),
    });
    expect(v.verdict).toBe('excepted');
    expect(v.spdxId).toBe('(BSD-3-Clause AND Apache-2.0)');
  });

  it('ignores an exception whose text hash no longer matches', () => {
    // An exception must not outlive the text it was granted for. If the package changes its
    // license, the hash stops matching and the block returns rather than being silently carried.
    const policy = {
      ...POLICY,
      exceptions: [
        {
          package: 'npm:weird@1.0.0',
          spdx: 'BSD-3-Clause',
          reason: 'r',
          reviewer: 'x@y',
          date: '2026-08-20',
          textSha256: 'STALE',
        },
      ],
    };
    const v = classify({
      ...base,
      name: 'weird',
      policy,
      declaredField: 'SEE LICENSE IN X',
      detection: detected('NOASSERTION', 100, 'abc'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('stale');
  });

  it('does not apply an exception with no textSha256 recorded (unpinned)', () => {
    // CRITICAL: with no license text at all, sha256 is undefined; with the entry's textSha256 key
    // simply omitted, entry.textSha256 is also undefined. `undefined !== undefined` is false, so
    // the naive comparison would apply this exception - granting a copyleft id with zero text, zero
    // hash, zero verification. An explicit `textSha256: null` fails the comparison on its own; the
    // hole is specifically the OMITTED key, which is the shape most likely to be hand-authored by
    // mistake.
    const policy = {
      ...POLICY,
      exceptions: [
        {
          package: 'npm:weird@1.0.0',
          spdx: 'MIT',
          reason: 'unpinned',
          reviewer: 'x@y',
          date: '2026-08-20',
        },
      ],
    };
    const v = classify({
      ...base,
      name: 'weird',
      policy,
      declaredField: 'GPL-3.0-or-later',
      detection: { dir: '/x', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not hash-pinned');
  });

  it('does not apply an exception with no spdx id recorded', () => {
    const policy = {
      ...POLICY,
      exceptions: [
        {
          package: 'npm:weird@1.0.0',
          reason: 'r',
          reviewer: 'x@y',
          date: '2026-08-20',
          textSha256: 'abc',
        },
      ],
    };
    const v = classify({
      ...base,
      name: 'weird',
      policy,
      declaredField: 'MIT',
      detection: detected('Apache-2.0', 100, 'abc'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('no spdx id recorded');
  });

  it('does not apply an exception when the package already resolves without a block', () => {
    // Exceptions are an override applied AFTER a block, never something a passing reconciliation
    // routes through on its own. If `withException` were applied unconditionally, this
    // exception - a different, wrong spdx id, and otherwise validly hash-pinned - would silently
    // override an already-correct `allowed` verdict.
    const policy = {
      ...POLICY,
      exceptions: [
        {
          package: 'npm:p@1.0.0',
          spdx: 'BSD-3-Clause',
          reason: 'should never apply',
          reviewer: 'x@y',
          date: '2026-08-20',
          textSha256: 'abc',
        },
      ],
    };
    const v = classify({
      ...base,
      policy,
      declaredField: 'MIT',
      detection: detected('MIT', 100, 'abc'),
    });
    expect(v.verdict).toBe('allowed');
    expect(v.spdxId).toBe('MIT');
  });

  it.each(['NOASSERTION', 'NONE'])('blocks licensee sentinel %s', (sentinel) => {
    const v = classify({ ...base, declaredField: undefined, detection: detected(sentinel) });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('no license text could be identified');
  });

  it('allows a NuGet package that declares a license and ships no license file', () => {
    // Shipping no license file is normal, not a missing signal - nuget-license reports nuspec
    // metadata and packages routinely ship no file. Attribution is discharged by reproducing the
    // canonical SPDX text on the package's behalf.
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      declaredField: 'MIT',
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('allowed');
    expect(v.reason).toContain('canonical text');
  });

  it('still blocks a package with no declared license and no license file', () => {
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      declaredField: undefined,
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('ships no license file and declares no license');
  });

  it('still blocks copyleft when there is no license file to read', () => {
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      declaredField: 'MPL-2.0',
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('copyleft');
  });

  it('blocks when validationErrors is not an array', () => {
    // {}.length is undefined, which duck-types as "no errors" under a naive truthiness check and
    // would silently disable this gate. Same runtime-object construction as above, for the same
    // no-type-assertion reason.
    const malformed: Record<string, unknown> = { validationErrors: {} };
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      declaredField: 'MIT',
      detection: { dir: '', files: [] },
      ...malformed,
    });
    expect(v.verdict).toBe('blocked');
  });

  // The contrast pair below is the whole design: an UNREADABLE license file is not the same fact as
  // an ABSENT one. A package that ships a file nobody can identify is unusual and blocks for review;
  // a package that ships no file at all is ordinary and resolves on its declaration.

  it('elects a disjunction through its recorded election when no license file exists', () => {
    // nuget:CsvHelper is exactly this shape - "MS-PL OR Apache-2.0", elects Apache-2.0 - and NuGet
    // detection is always {dir:'', files:[]} by design (nuget-license reports nuspec metadata, not
    // file contents), so this is the *only* path any NuGet election ever resolves through. An
    // unpinnable exception (there is no text on disk to hash) would be worse governance than the
    // election it replaces, since the election carries a written rationale reviewed at PR time.
    const policy = {
      ...POLICY,
      elections: {
        ...POLICY.elections,
        'nuget:csvhelper': { elected: 'Apache-2.0', of: 'MS-PL OR Apache-2.0', reason: 'test' },
      },
    };
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      name: 'csvhelper',
      policy,
      declaredField: 'MS-PL OR Apache-2.0',
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('elected');
    expect(v.spdxId).toBe('Apache-2.0');
  });

  it('elects an npm disjunction the same way when the package ships no license file', () => {
    // The ecosystem does not enter into it. Blocking here instead - on the premise that npm always
    // offers a license file as a second signal - is false for monorepo-published families, and
    // leaves those packages with no instrument that can clear them.
    const v = classify({
      ...base,
      name: 'dompurify',
      declaredField: '(MPL-2.0 OR Apache-2.0)',
      detection: { dir: '/x', files: [] },
    });
    expect(v.verdict).toBe('elected');
    expect(v.spdxId).toBe('Apache-2.0');
  });

  it('blocks an npm disjunction whose license file exists but cannot be identified', () => {
    // npm:jszip is the live case: LICENSE.markdown concatenates the full MIT and GPLv3 texts, so
    // licensee identifies nothing. An unidentifiable text is evidence something is unusual, and it
    // must not resolve on the recorded election - unlike the absent-file case above.
    const v = classify({
      ...base,
      name: 'dompurify',
      declaredField: '(MPL-2.0 OR Apache-2.0)',
      detection: detected('NOASSERTION', 0),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('no license text could be identified');
  });

  it('blocks a NuGet disjunction whose recorded election names a copyleft branch', () => {
    // Mirrors "still blocks copyleft on the single-signal path" above, but for a disjunction:
    // resolving via the election is still resolving the declared expression, so an elected id that
    // is copyleft still blocks, not "elects" - even though (deliberately, in this test policy)
    // MPL-2.0 is also on the allow list, so only the copyleft check specifically can produce this.
    const policy = {
      ...POLICY,
      elections: {
        ...POLICY.elections,
        'nuget:copyleftdual': {
          elected: 'MPL-2.0',
          of: 'MPL-2.0 OR GPL-3.0-or-later',
          reason: 'deliberately bad election for the test',
        },
      },
    };
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      name: 'copyleftdual',
      policy,
      declaredField: 'MPL-2.0 OR GPL-3.0-or-later',
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('copyleft');
  });

  it('blocks an npm disjunction whose recorded election names a copyleft branch', () => {
    const policy = {
      ...POLICY,
      elections: {
        ...POLICY.elections,
        'npm:copyleftdual': {
          elected: 'MPL-2.0',
          of: 'MPL-2.0 OR GPL-3.0-or-later',
          reason: 'deliberately bad election for the test',
        },
      },
    };
    const v = classify({
      ...base,
      name: 'copyleftdual',
      policy,
      declaredField: 'MPL-2.0 OR GPL-3.0-or-later',
      detection: detected('MPL-2.0'),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('copyleft');
  });

  it('blocks a NuGet disjunction with no election recorded', () => {
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      name: 'no-election-nuget-package',
      declaredField: 'MIT OR Apache-2.0',
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('no election is recorded');
  });

  it('blocks a NuGet disjunction whose recorded election names a branch not in the declared expression', () => {
    const policy = {
      ...POLICY,
      elections: {
        ...POLICY.elections,
        'nuget:stale-election': {
          elected: 'BSD-3-Clause',
          of: 'MIT OR Apache-2.0',
          reason: 'test',
        },
      },
    };
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      name: 'stale-election',
      policy,
      declaredField: 'MIT OR Apache-2.0',
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('is not one of');
  });

  it('blocks a NuGet disjunction whose recorded election names an id absent from the allow list', () => {
    const policy = {
      ...POLICY,
      elections: {
        ...POLICY.elections,
        'nuget:unlisted-nuget-election': {
          elected: 'BSD-2-Clause',
          of: 'MIT OR BSD-2-Clause',
          reason: 'test',
        },
      },
    };
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      name: 'unlisted-nuget-election',
      policy,
      declaredField: 'MIT OR BSD-2-Clause',
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not on the allowed list');
  });

  it('blocks when the upstream tool reported a validation error', () => {
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      declaredField: 'MIT',
      detection: { dir: '', files: [] },
      validationErrors: ['could not resolve license url'],
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('could not resolve');
  });

  // --- The corrected three-case rule, stated as tests --------------------------------------------
  //
  // (1) file identifies -> must agree with the declaration; (2) file exists but does NOT identify ->
  // block; (3) no file at all -> resolve on the declaration and reproduce canonical text. The
  // distinction between (2) and (3) is the load-bearing part.

  it('resolves on the declaration when a package ships no license file', () => {
    // The ten @radix-ui/* primitives, imurmurhash, isarray, rc-new-window and react-remove-scroll-bar
    // are all exactly this: a monorepo-published package declaring MIT against a root license.
    // Blocking them would leave NO instrument able to clear them - an exception is refused without a
    // text hash, and an override applies only where nothing parseable is declared.
    const v = classify({ ...base, declaredField: 'MIT', detection: { dir: '/x', files: [] } });
    expect(v.verdict).toBe('allowed');
    expect(v.spdxId).toBe('MIT');
    expect(v.reason).toContain('canonical text reproduced');
  });

  it('blocks instead when a license file exists but cannot be identified', () => {
    // Same declaration, same ecosystem; the only difference is that a file EXISTS and defeated the
    // matcher. That is not an absence of information, it is unusual information.
    const v = classify({
      ...base,
      declaredField: 'MIT',
      detection: detected('NOASSERTION', 0),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('no license text could be identified');
  });

  it('blocks a declaration contradicted by the license file', () => {
    // npm:quill-delta@5.1.0 declares MIT and ships a BSD-3-Clause LICENSE. This is the check the
    // two-signal design exists for, and relaxing case 3 must not touch it.
    const v = classify({ ...base, declaredField: 'MIT', detection: detected('BSD-3-Clause') });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('identifies as BSD-3-Clause');
  });

  it('blocks a copyleft declaration with no file to soften it', () => {
    const v = classify({
      ...base,
      declaredField: 'GPL-3.0-or-later',
      detection: { dir: '/x', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('copyleft');
  });

  it('blocks an unlisted identifier declared with no file', () => {
    // @fontsource-variable/ibm-plex-sans ships no license file and declares OFL-1.1, which is not
    // on the allow list. Relaxing the no-file case must not turn the allow list into a formality.
    const v = classify({ ...base, declaredField: 'OFL-1.1', detection: { dir: '/x', files: [] } });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not on the allowed list');
  });

  it('blocks a conjunction declared with no file, which no election can resolve', () => {
    // npm:pako declares "(MIT AND Zlib)": both sets of terms apply at once, so there is no branch
    // to elect.
    const v = classify({
      ...base,
      declaredField: '(MIT AND GPL-3.0-or-later)',
      detection: { dir: '/x', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not a choice');
  });

  it('blocks a declaration that is not an SPDX expression at all', () => {
    // The three NuGet packages whose nuspec carries a legacy <licenseUrl> rather than an
    // expression. Blocking is the fail-closed direction; they need recorded overrides.
    const v = classify({
      ...base,
      ecosystem: 'nuget',
      declaredField: 'https://opensource.org/licenses/Zlib',
      detection: { dir: '', files: [] },
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not an SPDX expression');
  });
});

describe('notices-policy.json', () => {
  // IMPORTANT: these cases check the shipped policy as DATA - that it parses, that its lists are
  // disjoint, that each election resolves against its own "of" expression and allow list, and that
  // its copyleft ids are ones licensee can actually emit. Nothing else looks at the file that way,
  // and an unreachable copyleft entry (a deprecated spelling licensee never emits) is invisible to
  // every behavioral test in this file.
  const POLICY_PATH = path.join(__dirname, 'notices-policy.json');
  const policy = loadPolicy(POLICY_PATH);

  it('parses and has the expected top-level shape', () => {
    expect(Array.isArray(policy.allowed)).toBe(true);
    expect(Array.isArray(policy.copyleft)).toBe(true);
    expect(typeof policy.elections).toBe('object');
    expect(Array.isArray(policy.exceptions)).toBe(true);
    expect(typeof policy.copyrightNotices).toBe('object');
    expect(typeof policy.overrides).toBe('object');
  });

  // Losing either table silently removes data from a legal artifact: the copyright notices discharge an
  // MIT/BSD/ISC attribution obligation that SPDX's `<copyright holders>` placeholder does not, and
  // the alwaysList flag is the only thing that puts a genuinely shipped Windows dependency in the
  // document (its PackageReference is conditioned on the HOST OS, so no restore on Linux resolves
  // it whatever runtime identifier is asked for).
  it('keeps a copyright notice for each yalc dev-linked package', () => {
    // Asserted by INCLUSION, not equality. `loadPolicy` documents this table as carrying the
    // copyright line for any npm package whose own license file cannot be read on the generating
    // machine; the yalc dev-linked pair are the packages that made it necessary, not its
    // definition. Pinning the exact key set made adding a notice for any other unreadable package
    // fail a test about dev links.
    expect(Object.keys(policy.copyrightNotices ?? {})).toEqual(
      expect.arrayContaining([
        'npm:@eten-tech-foundation/platform-editor',
        'npm:@eten-tech-foundation/scripture-utilities',
      ]),
    );
  });

  it('carries a copyright notice for every package whose license file cannot be read', () => {
    // These ship, they are MIT/BSD/ISC, and the obligation those licenses actually impose is that
    // the copyright notice travels with copies - which SPDX's `<copyright holders>` placeholder
    // does not discharge. Each notice was read from the package's own license file: from its
    // repository where the published tarball omits one (the @radix-ui family publishes dozens of
    // packages from one monorepo), or from the README where the package embeds its license there.
    // `rc-new-window` is deliberately absent - its Apache-2.0 LICENSE leaves the boilerplate
    // appendix unfilled and it ships no NOTICE, so it asserts no copyright notice.
    const notices = policy.copyrightNotices ?? {};
    [
      'npm:@radix-ui/number',
      'npm:@radix-ui/react-compose-refs',
      'npm:@radix-ui/react-use-size',
      'npm:@xmldom/xmldom',
      'npm:fsevents',
      'npm:imurmurhash',
      'npm:isarray',
      'npm:react-remove-scroll-bar',
    ].forEach((key) => {
      expect(notices[key]).toBeDefined();
      expect(notices[key]).toMatch(/copyright/i);
    });
  });

  it('keys every copyright notice by ecosystem and records a non-empty notice', () => {
    Object.entries(policy.copyrightNotices ?? {}).forEach(([key, notice]) => {
      expect(key).toMatch(/^(npm|nuget):/);
      // The whole value of an entry is that someone read the package's own license file. An empty
      // one would pair a canonical SPDX text with nothing, which is the state it exists to fix.
      expect(notice.trim().length).toBeGreaterThan(0);
    });
  });

  it('keeps the Windows-only ICU runtime marked alwaysList', () => {
    expect(policy.overrides?.['nuget:Microsoft.ICU.ICU4C.Runtime']?.alwaysList).toBe(true);
  });

  it('keys every override by ecosystem and names a license for each', () => {
    Object.entries(policy.overrides ?? {}).forEach(([key, override]) => {
      expect(key).toMatch(/^(npm|nuget):/);
      expect(typeof override.license).toBe('string');
      expect(override.license.length).toBeGreaterThan(0);
    });
  });

  it('marks every free-text override nonSpdx, and no SPDX-valued one', () => {
    // Both directions. A missing flag means the copyleft check silently did not run for that entry;
    // a flag on a value that DOES parse claims the check cannot run when it can, which would make
    // the marker meaningless as a review signal if it drifted into being ticked by habit.
    const free: string[] = [];
    const spurious: string[] = [];
    Object.entries(policy.overrides ?? {}).forEach(([key, override]) => {
      const parsed = parseDeclared(override.license);
      if (!parsed.ok && !override.nonSpdx) free.push(key);
      if (parsed.ok && override.nonSpdx) spurious.push(key);
    });
    expect({ unflagged: free, spurious }).toEqual({ unflagged: [], spurious: [] });
  });

  it('has disjoint allowed and copyleft lists', () => {
    const overlap = policy.allowed.filter((id: string) => policy.copyleft.includes(id));
    expect(overlap).toEqual([]);
  });

  it('every copyleft id is already in its spdx-correct canonical form', () => {
    // Licensee only ever emits (after normalization) a license's current SPDX id, never a
    // deprecated alias. A deprecated id sitting in this list is either unreachable dead weight or,
    // before the root-cause fix, silently decorative. This is the check that would have caught it.
    const stale = policy.copyleft.filter((id: string) => {
      const c = correct(id);
      // spdx-correct returns falsy (its own "cannot correct" sentinel) for anything it does not
      // recognize; a truthiness check avoids comparing against that sentinel by name, which this
      // repo's `no-null/no-null` rule forbids anyway.
      return Boolean(c) && c !== id;
    });
    expect(stale).toEqual([]);
  });

  Object.entries(policy.elections).forEach(([key, election]) => {
    it(`election "${key}" names an elected id present in its "of" expression and on the allow list`, () => {
      const parsed = parseDeclared(election.of);
      if (!parsed.ok)
        throw new Error(`election "${key}"'s "of" field does not parse: ${parsed.reason}`);
      expect(parsed.ids).toContain(election.elected);
      expect(policy.allowed).toContain(election.elected);
    });
  });

  // An exception is the instrument that lets a package through the gate, so the shipped list is
  // where a governance failure would actually live. `applyException` enforces the hash pin at
  // classification time; these check the entries a reviewer is asked to trust are complete before
  // anything reaches that point - a missing reviewer or an undated entry is not reviewable, and an
  // entry whose textSha256 is not a real digest cannot have been produced by reading the file.
  policy.exceptions.forEach((entry) => {
    it(`exception "${entry.package}" is complete and hash-pinned`, () => {
      expect(entry.package).toMatch(/^(npm|nuget):.+@.+$/);
      expect(entry.spdx.length).toBeGreaterThan(0);
      // Long enough to be a sentence about the license, not a shrug. The whole value of an
      // exception is that someone read the file once and wrote down what they found.
      expect(entry.reason.length).toBeGreaterThan(40);
      expect(entry.reviewer).toMatch(/@/);
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.textSha256).toMatch(/^[0-9a-f]{64}$/);
    });
  });

  it('records at most one exception per package', () => {
    // `applyException` uses `find`, so a second entry for the same package is dead data that
    // silently loses to the first - and appending is what the paste-ready template in `report.ts`
    // invites. `loadPolicy` refuses the file outright; this is the shipped file passing that rule.
    const keys = policy.exceptions.map((entry) => entry.package);
    expect(keys).toHaveLength(new Set(keys).size);
  });

  it('no reviewed exception admits a copyleft license', () => {
    // `applyException` enforces this in the MECHANISM, against both lists, at apply time
    // (`adr-notices-derived-from-what-ships`): a data-level check over the committed policy cannot
    // cover an entry added in the same pull request as the change it accompanies. This one is kept
    // as the cheaper, earlier signal over the shipped file, and because a copyleft exception is the
    // specific failure worth naming on its own.
    const copyleft = new Set(policy.copyleft);
    const admitted = policy.exceptions.filter((entry) => {
      const parsed = parseDeclared(entry.spdx);
      return parsed.ok && parsed.ids.some((id: string) => copyleft.has(id));
    });
    expect(admitted.map((entry) => entry.package)).toEqual([]);
  });
});

describe('curated overrides', () => {
  // The three SIL packages come from an internal feed whose nuspecs declare nothing, so
  // nuget-license reports LicenseInformationOrigin "Unknown" AND a validation error. Both routes
  // must reach the override, or the whole .NET section blocks on packages a human already ruled on.
  const OVERRIDE_POLICY = {
    ...POLICY,
    // The shipped policy lists `Unicode-DFS-2016` under `allowed`, and so must this fixture: an
    // override whose value parses as an SPDX expression is checked against the same predicate an
    // exception's recorded id is, so a fixture that omitted it would be testing a policy this
    // repository does not have.
    allowed: [...POLICY.allowed, 'Unicode-DFS-2016'],
    overrides: {
      'nuget:ParatextData': {
        license: 'Proprietary - SIL Global / United Bible Societies',
        nonSpdx: true,
        versionIndependent: true,
      },
      'nuget:Microsoft.ICU.ICU4C.Runtime': {
        license: 'Unicode-DFS-2016',
        alwaysList: true,
        versionIndependent: true,
        note: 'Windows only.',
      },
    },
  };

  const nuget = (name: string, extra: object = {}) => ({
    name,
    version: '1.0.0',
    ecosystem: 'nuget' as const,
    policy: OVERRIDE_POLICY,
    detection: { dir: '', files: [] },
    declaredField: undefined,
    ...extra,
  });

  it('resolves a package whose nuspec declares nothing at all', () => {
    const v = classify(nuget('Microsoft.ICU.ICU4C.Runtime'));
    expect(v.verdict).toBe('overridden');
    expect(v.spdxId).toBe('Unicode-DFS-2016');
  });

  it('blocks an override recording a parseable identifier that is not on the allowed list', () => {
    // The override half of the same gap: the copyleft-only test admitted any real SPDX identifier
    // the policy has never allowed. `nonSpdx` is the flag for a value deliberately outside SPDX;
    // one that parses has a list to be checked against.
    const v = classify(
      nuget('Some.Restrictive.Package', {
        policy: {
          ...OVERRIDE_POLICY,
          overrides: {
            'nuget:Some.Restrictive.Package': { license: 'BUSL-1.1', versionIndependent: true },
          },
        },
      }),
    );
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('BUSL-1.1');
  });

  it('resolves a package the upstream tool reported a validation error for', () => {
    const v = classify(
      nuget('ParatextData', { validationErrors: ['No license information found'] }),
    );
    expect(v.verdict).toBe('overridden');
    expect(v.spdxId).toBe('Proprietary - SIL Global / United Bible Societies');
  });

  it('leaves a package with no override entry blocked', () => {
    const v = classify(nuget('SomeOtherInternalPackage'));
    expect(v.verdict).toBe('blocked');
  });

  // The copyleft check below reads `recorded.ok && ...`, which is `false` - not a block - for any
  // value that is not an SPDX expression, and free text is what this field is FOR. Without the
  // `nonSpdx` requirement the gate is strictest on the input class it can check and silent on the
  // one it cannot: an entry reading "GNU General Public License v3" resolves while the same
  // determination spelled `GPL-3.0-only` blocks. An unparseable value still cannot be tested, so
  // what is required is
  // that the entry SAY it is deliberately free text, which puts the bypass in the policy file where
  // a reviewer sees it.
  it('blocks a free-text override that is not marked nonSpdx', () => {
    const v = classify(
      nuget('Unflagged', {
        policy: {
          ...OVERRIDE_POLICY,
          overrides: {
            ...OVERRIDE_POLICY.overrides,
            'nuget:Unflagged': {
              license: 'GNU General Public License v3',
              versionIndependent: true,
            },
          },
        },
      }),
    );
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not an SPDX expression');
    expect(v.reason).toContain('nonSpdx');
  });

  it('does not let nonSpdx admit a value that IS a parseable copyleft identifier', () => {
    // The flag records "this value cannot be checked", not "do not check this value". A value that
    // parses is checked whatever the entry claims about it.
    const v = classify(
      nuget('Mislabelled', {
        policy: {
          ...OVERRIDE_POLICY,
          overrides: {
            ...OVERRIDE_POLICY.overrides,
            'nuget:Mislabelled': {
              license: 'GPL-3.0-or-later',
              nonSpdx: true,
              versionIndependent: true,
            },
          },
        },
      }),
    );
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('copyleft');
  });

  // An override answers "this package establishes nothing"; it must never answer "this package
  // says something I would rather it did not". If ParatextData ever starts declaring copyleft, the
  // entry that clears it today must not keep clearing it.
  it('never overrides a package that declares something parseable', () => {
    const v = classify(nuget('ParatextData', { declaredField: 'GPL-3.0-or-later' }));
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('copyleft');
  });

  // Same rule on the other signal: a text-derived copyleft finding is a fact about the package.
  it('never overrides a package whose own license text was identified', () => {
    const v = classify({
      ...nuget('ParatextData'),
      detection: detected('GPL-3.0-or-later'),
    });
    expect(v.verdict).toBe('blocked');
  });

  // The malformed-value guard reports a CALLER BUG, not a licensing fact, so no recorded
  // determination may make it look resolved.
  it('never overrides a malformed validationErrors value', () => {
    const malformed: Record<string, unknown> = { validationErrors: {} };
    const v = classify({ ...nuget('ParatextData'), ...malformed });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('malformed');
  });

  // A reviewed exception is pinned to one version AND one license text, so it is the more specific
  // instrument; an override must not rescue a package whose exception failed its own pinning.
  it('does not rescue a package whose reviewed exception is stale', () => {
    const v = classify({
      ...nuget('ParatextData'),
      policy: {
        ...OVERRIDE_POLICY,
        exceptions: [
          {
            package: 'nuget:ParatextData@1.0.0',
            spdx: 'MIT',
            reason: 'r',
            reviewer: 'x@example.test',
            date: '2026-01-01',
            textSha256: 'stale',
          },
        ],
      },
    });
    expect(v.verdict).toBe('blocked');
  });
});

describe('what a reviewed exception may override', () => {
  // An exception is the instrument that clears a block. `applyException` bounds what it may RECORD
  // (against both policy lists); these bound what it may record it AGAINST, and what shape the
  // recorded value may take.
  const pinned = (spdx: string) => [
    {
      package: 'npm:p@1.0.0',
      spdx,
      reason: 'the license file was read and this is what it says',
      reviewer: 'x@example.test',
      date: '2026-01-01',
      textSha256: 'abc',
    },
  ];

  it('cannot override a copyleft text identified at or above the threshold', () => {
    // The two independent signals disagree and the text is unambiguous. Without this the entry
    // returned `excepted MIT` while `joinTexts` reproduced the GPL text under a row labelled MIT.
    const v = classify({
      ...base,
      policy: { ...POLICY, exceptions: pinned('MIT') },
      declaredField: undefined,
      detection: detected('GPL-3.0-or-later', CONFIDENCE_THRESHOLD),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('cannot override a positive identification');
  });

  it('cannot override a positively identified id that is merely UNLISTED', () => {
    // The gap the copyleft-only bound left. `BUSL-1.1` is on neither list, so `copyleft.has` read
    // it as "not copyleft" and the exception cleared the package: the row rendered as
    // `MIT (reviewed exception)` with the Business Source License text reproduced under it. The
    // bound is an ALLOW LIST for the same reason `applyException`'s bound on what may be RECORDED
    // is - an id nobody has admitted must not default to admissible by being absent from a denylist.
    const v = classify({
      ...base,
      policy: { ...POLICY, exceptions: pinned('MIT') },
      declaredField: undefined,
      detection: detected('BUSL-1.1', 100),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('BUSL-1.1');
    expect(v.reason).toContain('is not on the allowed list');
  });

  it('still clears an unlisted text identified BELOW the threshold', () => {
    // The permissiveness control for the widening above: an exception must still clear the
    // unidentifiable text it exists for, whichever list the low-confidence guess lands outside of.
    const v = classify({
      ...base,
      policy: { ...POLICY, exceptions: pinned('MIT') },
      declaredField: undefined,
      detection: detected('BUSL-1.1', CONFIDENCE_THRESHOLD - 1),
    });
    expect(v.verdict).toBe('excepted');
    expect(v.spdxId).toBe('MIT');
  });

  it('still clears a copyleft text identified BELOW the threshold', () => {
    // The npm:jszip shape - a LICENSE.markdown concatenating the full MIT and GPLv3 texts, which no
    // matcher identifies confidently. That is precisely the unidentifiable text an exception exists
    // to resolve, so scoping the bar to positively identified files is what keeps the instrument
    // useful rather than merely safe.
    const v = classify({
      ...base,
      policy: { ...POLICY, exceptions: pinned('MIT') },
      declaredField: undefined,
      detection: detected('GPL-3.0-or-later', CONFIDENCE_THRESHOLD - 1),
    });
    expect(v.verdict).toBe('excepted');
    expect(v.spdxId).toBe('MIT');
  });

  // The instrument is a REVIEWED exception, and nothing read the two fields that make it one. The
  // data-level test over the committed policy cannot cover an entry added in the same pull request
  // as the change it accompanies - the identical hole that put the allow/copyleft bound into
  // `applyException` rather than leaving it to a test.
  it.each([
    ['reviewer', { reviewer: '' }],
    ['date', { date: '' }],
  ])('refuses an exception recorded with no %s', (field, missing) => {
    const v = classify({
      ...base,
      policy: { ...POLICY, exceptions: [{ ...pinned('MIT')[0], ...missing }] },
      declaredField: undefined,
      detection: detected('GPL-3.0-or-later', CONFIDENCE_THRESHOLD - 1),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain(`records no ${field}`);
  });

  it('refuses a date that is not an ISO calendar date', () => {
    const v = classify({
      ...base,
      policy: { ...POLICY, exceptions: [{ ...pinned('MIT')[0], date: 'last Tuesday' }] },
      declaredField: undefined,
      detection: detected('GPL-3.0-or-later', CONFIDENCE_THRESHOLD - 1),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('not an ISO calendar date');
  });

  it('cannot record an operand whose "+" SPDX cannot express', () => {
    // `resolveDeclaredPrefix` refuses `Apache-2.0+` in a DECLARATION because SPDX publishes no
    // `Apache-2.0-or-later`, so resolving on the base id records terms narrower than the package
    // offers - and `render` then reproduces the plain Apache-2.0 text. A human recording the same
    // value buys no license to state something narrower than the package grants.
    const v = classify({
      ...base,
      policy: { ...POLICY, exceptions: pinned('Apache-2.0+') },
      declaredField: undefined,
      detection: detected('GPL-3.0-or-later', CONFIDENCE_THRESHOLD - 1),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('Apache-2.0+');
    expect(v.reason).toContain('or later');
  });

  it('cannot record an SPDX expression carrying a WITH operand', () => {
    // A license exception modifies the grant its base identifier makes, and bounding `ids` alone
    // accepted it on the base id: `MIT WITH <restrictive-clause>` would clear with the clause
    // checked against nothing. `resolveDeclaredPrefix` refuses the same shape for a declaration.
    const v = classify({
      ...base,
      policy: { ...POLICY, exceptions: pinned('Apache-2.0 WITH LLVM-exception') },
      declaredField: undefined,
      detection: detected('GPL-3.0-or-later', CONFIDENCE_THRESHOLD - 1),
    });
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('license exception');
    expect(v.reason).toContain('LLVM-exception');
  });
});

describe('what a curated override may carry across', () => {
  const overridden = {
    name: 'X',
    version: '2.0.0',
    ecosystem: 'nuget' as const,
    declaredField: undefined,
    detection: { dir: '', files: [] },
  };
  const withOverride = (entry: object) => ({
    ...overridden,
    policy: { ...POLICY, overrides: { 'nuget:X': entry } },
  });

  // An override is keyed by NAME and pinned to no license text. `stalePolicyEntries` reports one
  // matching NO package; nothing can report one matching a DIFFERENT package than the reviewer had
  // in front of them. So the entry has to say which of the two it is - a determination read off one
  // version's metadata, or one that holds at every version - rather than leaving the answer to an
  // absent field.
  it('refuses an override recording neither a version nor versionIndependent', () => {
    const v = classify(withOverride({ license: 'MIT' }));
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('versionIndependent');
    // Names the version in hand, so the entry can be pinned by pasting the message's own value.
    expect(v.reason).toContain('2.0.0');
  });

  it('applies a versionIndependent override to any version', () => {
    expect(classify(withOverride({ license: 'MIT', versionIndependent: true })).verdict).toBe(
      'overridden',
    );
  });

  it('applies a version-pinned override to that version', () => {
    expect(classify(withOverride({ license: 'MIT', version: '2.0.0' })).verdict).toBe('overridden');
  });

  it('refuses a version-pinned override on a different version', () => {
    const v = classify(withOverride({ license: 'MIT', version: '1.0.0' }));
    expect(v.verdict).toBe('blocked');
    expect(v.reason).toContain('1.0.0');
    expect(v.reason).toContain('re-read the package');
  });
});

describe('a curated override cannot clear a package that identifies its own license', () => {
  // An override is the instrument for a package that establishes NOTHING. Testing `!best` for that
  // is wrong in two directions at once: `best` is undefined when the license files DISAGREE and
  // when none of them clears the confidence threshold, and in both of those the package has said
  // something. Each case below resolves to `overridden` under the `!best` test.
  const overridden = (detection: Detection) => ({
    name: 'X',
    version: '2.0.0',
    ecosystem: 'nuget' as const,
    declaredField: undefined,
    detection,
    policy: {
      ...POLICY,
      overrides: {
        'nuget:X': {
          license: 'Proprietary - SIL Global',
          nonSpdx: true,
          versionIndependent: true,
        },
      },
    },
  });

  it('refuses where two license files disagree and one is copyleft', () => {
    const v = classify(
      overridden(
        detectedFiles([
          ['LICENSE', 'MIT'],
          ['LICENSE.GPL', 'GPL-3.0-or-later'],
        ]),
      ),
    );
    expect(v.verdict).toBe('blocked');
    expect(v.spdxId).toBeUndefined();
  });

  it('refuses where the only license file identifies as copyleft below the threshold', () => {
    const v = classify(
      overridden(detectedFilesAt([['LICENSE', 'GPL-3.0-or-later', CONFIDENCE_THRESHOLD - 3]])),
    );
    expect(v.verdict).toBe('blocked');
  });

  it('refuses where a permissive file identifies below the threshold', () => {
    // Below the threshold an id cannot RESOLVE a verdict, but it is still the package saying
    // something - which is the one premise an override rests on. The bound is any identification,
    // not only a copyleft one.
    const v = classify(overridden(detectedFilesAt([['LICENSE', 'MIT', CONFIDENCE_THRESHOLD - 3]])));
    expect(v.verdict).toBe('blocked');
  });

  it('still applies where licensee identified nothing at all', () => {
    // `NOASSERTION` is licensee reporting that it could not identify the text, which is exactly the
    // case the instrument exists for - so an unidentifiable file must not bar it.
    const v = classify(overridden(detectedFilesAt([['LICENSE', 'NOASSERTION', 0]])));
    expect(v.verdict).toBe('overridden');
    expect(v.spdxId).toBe('Proprietary - SIL Global');
  });
});

describe("a bundled file does not displace a package's own grant", () => {
  // `new Map(usable.map(...))` let a later file with the same identifier win, and detect.rb orders
  // by filename score - so `LICENSE.thirdparty` could displace `LICENSE`. The verdict then names
  // the bundled file and `buildLock` pins ITS hash, after which the lock's one drift signal - text
  // changed under an unchanged name@version - watches a third-party file and the package
  // relicensing its own text produces no drift at all.
  it('keeps the first file for a repeated identifier', () => {
    const v = classify({
      ...base,
      policy: POLICY,
      declaredField: 'MIT',
      detection: detectedFiles([
        ['LICENSE', 'MIT'],
        ['LICENSE.thirdparty', 'MIT'],
      ]),
    });
    expect(v.verdict).toBe('allowed');
    expect(v.matchedFile).toBe('LICENSE');
  });
});

describe('loadPolicy', () => {
  /** Writes a policy file and returns its path. */
  const write = (policy: unknown) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-policy-'));
    const file = path.join(dir, 'notices-policy.json');
    fs.writeFileSync(file, JSON.stringify(policy), 'utf8');
    return file;
  };

  const entry = (spdx: string) => ({
    package: 'npm:p@1.0.0',
    spdx,
    reason: 'the license file was read and this is what it says',
    reviewer: 'x@example.test',
    date: '2026-01-01',
    textSha256: 'abc',
  });

  it('refuses two exceptions for the same package', () => {
    // `applyException` uses `find`: the second entry is never consulted, so a re-review appended
    // rather than edited in place leaves the STALE determination in force with nothing reporting
    // it. `stalePolicyEntries` cannot see it either - both entries key a package that is still in
    // the closure, so both look used.
    const file = write({ exceptions: [entry('MIT'), entry('BSD-3-Clause')] });
    expect(() => loadPolicy(file)).toThrow(/more than one "exceptions" entry for npm:p@1\.0\.0/);
  });

  it('accepts one entry per package', () => {
    const file = write({ exceptions: [entry('MIT'), { ...entry('MIT'), package: 'npm:q@2.0.0' }] });
    expect(loadPolicy(file).exceptions).toHaveLength(2);
  });
});
