import { describe, expectTypeOf, it } from 'vitest';
import type { ContentJsonPath, PropertyJsonPath } from './usj-reader-writer.model';

// This package's vitest config does not enable `test.typecheck`, so the `expectTypeOf`
// assertions below only run their type checks when vitest itself is invoked with `--typecheck`
// against a matching file glob. Giving these two constants explicit type annotations makes a
// depth regression fail `npm run typecheck` (tsc) directly, independent of how this file is run.
const deepContentPath: ContentJsonPath =
  '$.content[0].content[1].content[2].content[3].content[4].content[5].content[6].content[7]';
const deepPropertyPath: PropertyJsonPath =
  "$.content[0].content[1].content[2].content[3].content[4].content[5].content[6].content[7]['lemma']";

describe('jsonPath depth', () => {
  it('accepts eight content clauses', () => {
    expectTypeOf(deepContentPath).toMatchTypeOf<ContentJsonPath>();
    expectTypeOf(deepPropertyPath).toMatchTypeOf<PropertyJsonPath>();
  });
});
