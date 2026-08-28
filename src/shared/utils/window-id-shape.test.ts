import { describe, expect, test } from 'vitest';
import { WINDOW_ID_SHAPE_PATTERN_SOURCE } from './util';
// The e2e project cannot resolve `@shared/*` (it has no path aliases and does not import from
// `src`), so it hand-mirrors this pattern as `WINDOW_ID_SHAPE_SOURCE`. Importing that mirror here
// (by relative path, since it lives outside `src`) is what lets this test catch it drifting from
// the source it copies. Read from the mirror's own import-free module rather than from
// `fixtures/helpers`, which would pull Playwright into this suite's module graph to compare a string.
import { WINDOW_ID_SHAPE_SOURCE } from '../../../e2e-tests/fixtures/window-id-shape';

describe('window id shape mirror', () => {
  test('the e2e mirror stays byte-identical to WINDOW_ID_SHAPE_PATTERN_SOURCE', () => {
    // A plain `toBe` failure would only show the two regex fragments side by side; this throws a
    // message that names the file to fix, since that is not otherwise obvious from a diff of two
    // hex-group patterns.
    if (WINDOW_ID_SHAPE_SOURCE !== WINDOW_ID_SHAPE_PATTERN_SOURCE) {
      throw new Error(
        'WINDOW_ID_SHAPE_SOURCE in e2e-tests/fixtures/window-id-shape.ts no longer matches ' +
          'WINDOW_ID_SHAPE_PATTERN_SOURCE in src/shared/utils/util.ts. Update the constant in ' +
          'e2e-tests/fixtures/window-id-shape.ts to match — every e2e matcher built from it silently ' +
          'stops recognizing real window ids otherwise.',
      );
    }
    expect(WINDOW_ID_SHAPE_SOURCE).toBe(WINDOW_ID_SHAPE_PATTERN_SOURCE);
  });
});
