/**
 * The app makes no unasked edits to Scripture — in Power mode's Preview, the formatted view, which
 * is read-only there. Opened explicitly with `OpenEditorOptions.viewType: 'formatted'`, since Power
 * mode defaults to Standard view. Nothing done in Preview may write to the project: reading,
 * navigating, scrolling, clicking, selecting, copying, opening a footnote from its caller,
 * switching to Standard view and back, or trying to edit.
 *
 * The body is `runPreviewWritesNothing` in `e2e-tests/fixtures/no-unasked-edits.body.ts`, beside
 * the body its sibling specs run in the editable views. One test() on its own launch (the isolated
 * fixture starts a new app for every test()).
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/no-unasked-edits-power-preview.spec.ts`.
 */
import { test } from '../../../fixtures/isolated.fixture';
import {
  noUnaskedEditsTestOptions,
  runPreviewWritesNothing,
} from '../../../fixtures/no-unasked-edits.body';

test.use(noUnaskedEditsTestOptions({ interfaceMode: 'power' }));

test.describe('the app makes no unasked edits to Scripture', () => {
  test('Preview: nothing done in the read-only view writes to the project', async ({
    mainPage,
    electronApp,
  }) => {
    await runPreviewWritesNothing({ mainPage, electronApp });
  });
});
