import { describe, expect, it } from 'vitest';
import { parseDeclared } from './declared';

describe('parseDeclared', () => {
  it.each([
    ['MIT', ['MIT']],
    ['Apache-2.0', ['Apache-2.0']],
    ['(MPL-2.0 OR Apache-2.0)', ['MPL-2.0', 'Apache-2.0']],
    ['MIT OR GPL-3.0-or-later', ['MIT', 'GPL-3.0-or-later']],
    ['(MIT AND Apache-2.0)', ['MIT', 'Apache-2.0']],
    ['Apache-2.0 WITH LLVM-exception', ['Apache-2.0']],
  ])('parses %s', (input, ids) => {
    const result = parseDeclared(input);
    // A guard clause rather than `if (result.ok) expect(...)`: vitest's `no-conditional-expect`
    // rule flags an assertion inside a conditional, and an early throw both narrows `result` for
    // TypeScript and fails the test with a clear reason instead of silently skipping the assertion.
    if (!result.ok) throw new Error(`expected ${input} to parse, got: ${result.reason}`);
    expect(result.ids.sort()).toEqual([...ids].sort());
  });

  // Typed array rather than an inline `as` on each element: this repo's
  // `no-type-assertion/no-type-assertion` rule is an error and does not exempt test files.
  const invalid: (string | undefined)[] = [
    '',
    undefined,
    'UNLICENSED',
    'SEE LICENSE IN COPYING',
    'MIT OR',
    '((((MIT',
  ];

  it.each(invalid)('rejects %s', (input) => {
    expect(parseDeclared(input).ok).toBe(false);
  });

  it('does not overflow the stack on deeply nested input', () => {
    // The hand-rolled parser recursed without a depth bound and crashed the process here, which is
    // a verdict escape: a crashed generator wrote no artifact but also blocked nothing.
    const nested = `${'('.repeat(50_000)}MIT${')'.repeat(50_000)}`;
    expect(() => parseDeclared(nested)).not.toThrow();
    expect(parseDeclared(nested).ok).toBe(false);
  });

  it('flags a disjunct that is not a grant', () => {
    // `AGPL-3.0-or-later OR LicenseRef-Commercial` offers one grant and one sales offer. Electing
    // the second is a procurement action, not a code decision, so it must not be auto-elected.
    const result = parseDeclared('AGPL-3.0-or-later OR LicenseRef-Commercial');
    if (!result.ok) throw new Error(`expected to parse, got: ${result.reason}`);
    expect(result.hasNonGrantDisjunct).toBe(true);
  });

  it('does not flag ordinary dual licenses', () => {
    const result = parseDeclared('MIT OR GPL-3.0-or-later');
    if (!result.ok) throw new Error(`expected to parse, got: ${result.reason}`);
    expect(result.hasNonGrantDisjunct).toBe(false);
  });

  it('flags a conjunction so it is not treated as a choice', () => {
    // AND means both operands apply - there is no branch to elect, unlike an OR disjunction.
    const result = parseDeclared('MIT AND GPL-3.0-or-later');
    if (!result.ok) throw new Error(`expected to parse, got: ${result.reason}`);
    expect(result.hasConjunction).toBe(true);
  });

  it('flags a conjunction nested inside a disjunction', () => {
    // ids.length alone cannot see this: flattening the tree discards the operator, so
    // "(MIT AND MPL-2.0) OR Apache-2.0" looks identical in ids to an ordinary 3-way choice.
    const result = parseDeclared('(MIT AND MPL-2.0) OR Apache-2.0');
    if (!result.ok) throw new Error(`expected to parse, got: ${result.reason}`);
    expect(result.hasConjunction).toBe(true);
  });

  it('does not flag an ordinary disjunction as a conjunction', () => {
    const result = parseDeclared('MIT OR GPL-3.0-or-later');
    if (!result.ok) throw new Error(`expected to parse, got: ${result.reason}`);
    expect(result.hasConjunction).toBe(false);
  });
});
