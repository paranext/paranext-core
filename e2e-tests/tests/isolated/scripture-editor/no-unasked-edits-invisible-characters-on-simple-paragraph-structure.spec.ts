/**
 * Whitespace and invisible characters survive the whole app, with the project's "allow invisible
 * characters" setting ON (`<AllowInvisibleChars>T</AllowInvisibleChars>`: a no-break space is
 * U+00A0 in the file and `~` is a tilde) — in Simple mode's editable view, the paragraph-structure
 * preset (markers hidden, paragraph markers in a gutter), which every Simple user edits in.
 *
 * The body, and what each step proves, is `runInvisibleCharacters` in
 * `e2e-tests/fixtures/no-unasked-edits.body.ts`; its sibling specs run it with the other setting
 * and in the other editable view. One test() per spec: the setting is seeded before the app starts,
 * so each setting and view gets its own launch.
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/no-unasked-edits-invisible-characters-on-simple-paragraph-structure.spec.ts`.
 */
import { test } from '../../../fixtures/isolated.fixture';
import {
  invisibleCharactersTestOptions,
  SIMPLE_PARAGRAPH_STRUCTURE_VIEW,
  runInvisibleCharacters,
} from '../../../fixtures/no-unasked-edits.body';

test.use(invisibleCharactersTestOptions(SIMPLE_PARAGRAPH_STRUCTURE_VIEW, 'on'));

test.describe('whitespace and invisible characters survive the whole app', () => {
  // TODO(PT-5055): run again once the editor's saves can no longer be dropped or land out of order.
  test.fixme(
    true,
    'PT-5055: deleting the pasted characters one by one can leave the file holding an older editor state (a save dropped while another is in flight, or an older save landing after a newer one)',
  );

  test('Simple paragraph-structure view, allow invisible characters on: opening writes nothing, an edit keeps the seeded characters, typed and pasted characters save as Paratext 9 saves them, and a copy gives them out', async ({
    mainPage,
    electronApp,
  }) => {
    await runInvisibleCharacters({ mainPage, electronApp }, SIMPLE_PARAGRAPH_STRUCTURE_VIEW, 'on');
  });
});
