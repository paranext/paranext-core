/**
 * Whitespace and invisible characters survive the whole app, with the project's "allow invisible
 * characters" setting ON (`<AllowInvisibleChars>T</AllowInvisibleChars>`: a no-break space is
 * U+00A0 in the file and `~` is a tilde) — in Power mode's Standard view, the view whose save path
 * carries the most conversion (markers as editable text, a stored no-break space shown as `~` or as
 * an internal stand-in).
 *
 * The body, and what each step proves, is `runInvisibleCharacters` in
 * `e2e-tests/fixtures/no-unasked-edits.body.ts`; its sibling specs run it with the other setting
 * and in the other editable view. One test() per spec: the setting is seeded before the app starts,
 * so each setting and view gets its own launch.
 *
 * This is the spec that runs the setting ON while the Simple-mode spec for it is switched off
 * (TODO(PT-5055)): the body branches on the setting and on the view independently, so once that
 * spec runs again this one only recombines branches the other specs reach and can be removed.
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/no-unasked-edits-invisible-characters-on-power-standard.spec.ts`.
 */
import { test } from '../../../fixtures/isolated.fixture';
import {
  invisibleCharactersTestOptions,
  POWER_STANDARD_VIEW,
  runInvisibleCharacters,
} from '../../../fixtures/no-unasked-edits.body';

test.use(invisibleCharactersTestOptions(POWER_STANDARD_VIEW, 'on'));

test.describe('whitespace and invisible characters survive the whole app', () => {
  test('Standard view, allow invisible characters on: opening writes nothing, an edit keeps the seeded characters, typed and pasted characters save as Paratext 9 saves them, and a copy gives them out', async ({
    mainPage,
    electronApp,
  }) => {
    await runInvisibleCharacters({ mainPage, electronApp }, POWER_STANDARD_VIEW, 'on');
  });
});
