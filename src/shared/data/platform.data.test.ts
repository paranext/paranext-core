import { describe, expect, test } from 'vitest';
import * as platformData from './platform.data';
import { URL_PARAMETERS } from './platform.data';

describe('URL_PARAMETERS', () => {
  // What this catches: an export named `*_QUERY_PARAMETER` (or the one hardcoded exception,
  // `WINDOW_ID`) added without a matching table entry, because the expected set below is
  // derived from the module's own exports rather than hand-copied.
  //
  // What this does NOT catch: a new parameter named the way `WINDOW_ID` is — not ending in
  // `_QUERY_PARAMETER` — is excluded by the filter on both sides, so adding one and forgetting
  // its table entry passes silently. `WINDOW_ID` is not a hypothetical case of this; it is the
  // existing instance. Naming a new parameter that way requires adding its name to the filter
  // below too.
  test('every `*_QUERY_PARAMETER` export, plus `WINDOW_ID`, has a spec in the table', () => {
    const declared = Object.entries(platformData)
      .filter(([name]) => name.endsWith('_QUERY_PARAMETER') || name === 'WINDOW_ID')
      .map(([, value]) => value);

    expect(Object.keys(URL_PARAMETERS).sort()).toEqual(declared.sort());

    // Guards the filter's own hardcoded exception: if `WINDOW_ID` is ever renamed without
    // updating the filter above, this fails on its own, direct cause rather than surfacing only
    // as an unexplained mismatch in the comparison above.
    expect(platformData).toHaveProperty('WINDOW_ID');
  });
});
