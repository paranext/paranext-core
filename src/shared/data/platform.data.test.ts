import { describe, expect, test } from 'vitest';
import * as platformData from './platform.data';
import { URL_PARAMETERS } from './platform.data';

describe('URL_PARAMETERS', () => {
  // Falsifiable by construction: the expected set is derived from the module's own exports
  // (anything named `*_QUERY_PARAMETER`, plus `WINDOW_ID`) rather than hand-copied here, so
  // adding a seventh query parameter and forgetting its table entry fails this test.
  test('every query parameter the app defines has a spec in the table', () => {
    const declared = Object.entries(platformData)
      .filter(([name]) => name.endsWith('_QUERY_PARAMETER') || name === 'WINDOW_ID')
      .map(([, value]) => value);

    expect(Object.keys(URL_PARAMETERS).sort()).toEqual(declared.sort());
  });
});
