import { describe, expectTypeOf, it } from 'vitest';
import type { ContentJsonPath, PropertyJsonPath } from './usj-reader-writer.model';

// The real gate here is `tsc`, not vitest: this package's vitest config does not enable
// `test.typecheck`, so `expectTypeOf` erases at runtime. `toExtend` and `not.toExtend` fail
// `npm run typecheck` (the package tsconfig includes `src`, which covers this file) when the type
// relationship does not hold, so `not.toExtend` fails it if `ContentJsonPath` ever collapses to
// `string` and silently accepts a ninth clause.
//
// Keep this file mirrored with the editor's copy in `@eten-tech-foundation/scripture-utilities`
// (`packages/utilities/src/converters/usj/usj-document-location.model.test.ts`). Locations cross
// between the two repos in both directions, so widening either declaration alone fails typecheck in
// the other repo.
type EightClauses =
  '$.content[0].content[1].content[2].content[3].content[4].content[5].content[6].content[7]';

describe('jsonPath depth', () => {
  it('accepts eight content clauses', () => {
    expectTypeOf<EightClauses>().toExtend<ContentJsonPath>();
  });

  it('accepts a property on the eighth content clause', () => {
    // `PropertyJsonPath`'s catch-all `` `$.${string}` `` member matches any string starting with
    // `$.`, so this assertion holds regardless of how many `.content[${number}]` clauses precede
    // `['lemma']` — it does not, on its own, guard the eight-clause depth bound. It is kept for
    // shape parity with the `ContentJsonPath` case above. For the same reason there is no
    // nine-clause rejection counterpart: a too-deep property path still matches the catch-all.
    expectTypeOf<`${EightClauses}['lemma']`>().toExtend<PropertyJsonPath>();
  });

  it('rejects nine content clauses', () => {
    expectTypeOf<`${EightClauses}.content[8]`>().not.toExtend<ContentJsonPath>();
  });
});
