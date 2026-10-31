/**
 * The app makes no unasked edits to Scripture — in Simple mode's editable view, the
 * paragraph-structure preset (markers hidden, paragraph markers in a gutter), which every Simple
 * user edits in.
 *
 * The body, and what each step proves, is `e2e-tests/fixtures/no-unasked-edits.body.ts`. ONE test()
 * per spec file on purpose (the isolated fixture is test-scoped).
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/no-unasked-edits-simple-paragraph-structure.spec.ts`.
 */
import { test } from '../../../fixtures/isolated.fixture';
import {
  noUnaskedEditsTestOptions,
  runNoUnaskedEdits,
  SIMPLE_PARAGRAPH_STRUCTURE_VIEW,
} from '../../../fixtures/no-unasked-edits.body';

test.use(noUnaskedEditsTestOptions(SIMPLE_PARAGRAPH_STRUCTURE_VIEW));

test.describe('the app makes no unasked edits to Scripture', () => {
  test('Simple paragraph-structure view: opening writes nothing, an edit undone restores the file, and an edit stays in its verse', async ({
    mainPage,
    electronApp,
  }) => {
    await runNoUnaskedEdits({ mainPage, electronApp }, SIMPLE_PARAGRAPH_STRUCTURE_VIEW);
  });
});
