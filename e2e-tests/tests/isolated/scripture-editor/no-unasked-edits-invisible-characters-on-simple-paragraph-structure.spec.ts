/**
 * Whitespace and invisible characters survive the whole app, with the project's "allow invisible
 * characters" setting ON (`<AllowInvisibleChars>T</AllowInvisibleChars>`: a no-break space is
 * U+00A0 in the file and `~` is a tilde) — in Simple mode's editable view, the paragraph-structure
 * preset (markers hidden, paragraph markers in a gutter), which every Simple user edits in.
 *
 * The body, and what each step proves, is `runInvisibleCharacters` in
 * `e2e-tests/fixtures/no-unasked-edits.body.ts`; its sibling specs run it with the other setting
 * and in the other editable view. ONE test() per spec file on purpose (the isolated fixture is
 * test-scoped, and the setting is seeded before the app starts).
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
  test('Simple paragraph-structure view, allow invisible characters on: opening writes nothing, an edit keeps the seeded characters, typed and pasted characters save as entered, and a copy gives them out', async ({
    mainPage,
    electronApp,
  }) => {
    await runInvisibleCharacters({ mainPage, electronApp }, SIMPLE_PARAGRAPH_STRUCTURE_VIEW, 'on');
  });
});
