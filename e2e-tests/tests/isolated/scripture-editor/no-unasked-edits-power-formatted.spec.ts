/**
 * The app makes no unasked edits to Scripture — in Power mode's formatted view (markers hidden),
 * opened explicitly with `OpenEditorOptions.viewType: 'formatted'` since Power mode defaults to
 * Standard.
 *
 * The body, and what each step proves, is `e2e-tests/fixtures/no-unasked-edits.body.ts`. ONE test()
 * per spec file on purpose (the isolated fixture is test-scoped).
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/no-unasked-edits-power-formatted.spec.ts`.
 */
import { test } from '../../../fixtures/isolated.fixture';
import {
  noUnaskedEditsTestOptions,
  POWER_FORMATTED_VIEW,
  runNoUnaskedEdits,
} from '../../../fixtures/no-unasked-edits.body';

test.use(noUnaskedEditsTestOptions(POWER_FORMATTED_VIEW));

test.describe('the app makes no unasked edits to Scripture', () => {
  test('Power formatted view: opening writes nothing, an edit undone restores the file, and an edit stays in its verse', async ({
    mainPage,
    electronApp,
  }) => {
    await runNoUnaskedEdits({ mainPage, electronApp }, POWER_FORMATTED_VIEW);
  });
});
