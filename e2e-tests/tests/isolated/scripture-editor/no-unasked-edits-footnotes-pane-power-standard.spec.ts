/**
 * The app makes no unasked edits to Scripture — in the footnotes pane's row editor, from Power
 * mode's Standard view. Opening a footnote's row and leaving it writes nothing; typing in the note,
 * or pasting a copy of its own text, saves exactly that and nothing else; deleting it again
 * restores the book byte for byte.
 *
 * The body, and what each step proves, is `runFootnotesPaneRowEdits` in
 * `e2e-tests/fixtures/no-unasked-edits.body.ts`; its Simple-mode sibling runs the same body. ONE
 * test() per spec file on purpose (the isolated fixture is test-scoped).
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/no-unasked-edits-footnotes-pane-power-standard.spec.ts`.
 */
import { test } from '../../../fixtures/isolated.fixture';
import {
  noUnaskedEditsTestOptions,
  POWER_STANDARD_VIEW,
  runFootnotesPaneRowEdits,
} from '../../../fixtures/no-unasked-edits.body';

test.use(noUnaskedEditsTestOptions(POWER_STANDARD_VIEW));

test.describe('the app makes no unasked edits to Scripture', () => {
  test('footnotes pane from Standard view: opening a row writes nothing, and an edit in a row changes only what was typed', async ({
    mainPage,
    electronApp,
  }) => {
    await runFootnotesPaneRowEdits({ mainPage, electronApp }, POWER_STANDARD_VIEW);
  });
});
