import { describe, expectTypeOf, it } from 'vitest';
import type { ContentJsonPath, PropertyJsonPath } from './usj-reader-writer.model';

// This package's vitest config does not enable `test.typecheck`, so the `expectTypeOf`
// assertions below only run their type checks when vitest itself is invoked with `--typecheck`
// against a matching file glob. Giving `deepContentPath` and `deepPropertyPath` explicit type
// annotations makes a depth regression fail `npm run typecheck` (tsc) directly, independent of
// how this file is run. `tooDeep`'s `@ts-expect-error` pins the bound from the other direction:
// tsc fails if `ContentJsonPath` ever collapses to `string` and silently accepts a ninth clause.
const deepContentPath: ContentJsonPath =
  '$.content[0].content[1].content[2].content[3].content[4].content[5].content[6].content[7]';
// @ts-expect-error ts(2322) - nine content clauses exceed the eight-clause bound
const tooDeep: ContentJsonPath =
  '$.content[0].content[1].content[2].content[3].content[4].content[5].content[6].content[7].content[8]';
// `PropertyJsonPath`'s catch-all `` `$.${string}` `` member matches any string starting with
// `$.`, so this assertion type-checks regardless of how many `.content[${number}]` clauses
// precede `['lemma']` — it does not, on its own, guard the eight-clause depth bound. It is kept
// for shape parity with `deepContentPath` above and to exercise the type at the intended depth.
// For the same reason, no nine-clause `@ts-expect-error` counterpart is possible here: a too-deep
// property path still matches the catch-all and type-checks.
const deepPropertyPath: PropertyJsonPath =
  "$.content[0].content[1].content[2].content[3].content[4].content[5].content[6].content[7]['lemma']";

describe('jsonPath depth', () => {
  it('accepts eight content clauses', () => {
    expectTypeOf(deepContentPath).toMatchTypeOf<ContentJsonPath>();
    expectTypeOf(deepPropertyPath).toMatchTypeOf<PropertyJsonPath>();
  });

  it('rejects nine content clauses', () => {
    // The `@ts-expect-error` above `tooDeep`'s declaration is the actual assertion; referencing it
    // here only satisfies the unused-variable lint rule.
    expectTypeOf(tooDeep).toMatchTypeOf<ContentJsonPath>();
  });
});
