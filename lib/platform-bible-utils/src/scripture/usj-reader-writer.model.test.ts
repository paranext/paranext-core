import { describe, expect, expectTypeOf, it } from 'vitest';
import type { ContentJsonPath, PropertyJsonPath } from './usj-reader-writer.model';

// The real gate here is `tsc`, not vitest: this package's vitest config does not enable
// `test.typecheck`, so `expectTypeOf` erases at runtime and asserts nothing on its own. The
// annotated `const` declarations below are what `npm run typecheck` checks (the package tsconfig
// includes `src`, which covers this file), and the `@ts-expect-error` pins the bound from the other
// direction — it fails typecheck if `ContentJsonPath` ever collapses to `string` and silently
// accepts a ninth clause. The `expect` calls exist so each `it` asserts something rather than
// having an empty body; they cannot fail at runtime — `tsc` is the only gate.
//
// Keep this file mirrored with the editor's copy in `@eten-tech-foundation/scripture-utilities`
// (`packages/utilities/src/converters/usj/usj-document-location.model.test.ts`). The two
// declarations must be widened in lock-step or the cross-repo assignment stops type-checking.
const EIGHT_CLAUSES =
  '$.content[0].content[1].content[2].content[3].content[4].content[5].content[6].content[7]';

describe('jsonPath depth', () => {
  it('accepts eight content clauses', () => {
    expectTypeOf<typeof EIGHT_CLAUSES>().toMatchTypeOf<ContentJsonPath>();
    const deepContentPath: ContentJsonPath = EIGHT_CLAUSES;
    expect(deepContentPath).toBe(EIGHT_CLAUSES);
  });

  it('accepts a property on the eighth content clause', () => {
    const prop = `${EIGHT_CLAUSES}['lemma']` as const;
    // `PropertyJsonPath`'s catch-all `` `$.${string}` `` member matches any string starting with
    // `$.`, so this assertion type-checks regardless of how many `.content[${number}]` clauses
    // precede `['lemma']` — it does not, on its own, guard the eight-clause depth bound. It is kept
    // for shape parity with the `ContentJsonPath` case above. For the same reason there is no
    // nine-clause rejection counterpart: a too-deep property path still matches the catch-all.
    expectTypeOf<typeof prop>().toMatchTypeOf<PropertyJsonPath>();
    const deepPropertyPath: PropertyJsonPath = prop;
    expect(deepPropertyPath).toBe(prop);
  });

  it('rejects nine content clauses', () => {
    const nineClauses = `${EIGHT_CLAUSES}.content[8]` as const;
    // @ts-expect-error ts(2322) - nine content clauses exceed the eight-clause bound
    const tooDeep: ContentJsonPath = nineClauses;
    expect(tooDeep).toBe(nineClauses);
  });
});
