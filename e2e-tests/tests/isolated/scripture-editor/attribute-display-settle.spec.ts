/**
 * End-to-end verification for Standard view's USFM-attribute display: Standard view renders a char
 * span's `|…` attribute bytes as engine-owned editable text, and edits to that text re-tokenize on
 * caret departure (pend/settle) instead of freezing the span. The contract those bytes answer to is
 * in `docs/standard-view-invariants.md` in the scripture-editors repo.
 *
 * The bundled sample WEB project ships no `\w`/`\+w` word-list markers, so this spec CREATES both
 * shapes by typing literal USFM marker syntax into the live editor — Standard view's `\` keydown
 * handler is passive when the caret is collapsed (no active selection), so `\` and the marker text
 * that follows land as ordinary literal characters; the marker-edit engine re-tokenizes on a
 * terminator (a space/NBSP or `*` immediately after a marker name).
 *
 * Scenarios (adapted from the design's zzz6 discovery case, `\wj \+w dsa|stuff\+w*`):
 *
 * - A nested attribute-bearing char span (`\+w` inside `\wj`) is created by typing; its bare
 *   attribute run (`|stuff`) is visible. Deleting its own nested closing glyph (the historical
 *   "never settles" bug — deferred finding 2) settles into a stable state on caret departure
 *   instead of freezing, and the edit survives a save/reload round-trip.
 * - Typing the NAMED form of a marker's default attribute (`|lemma="gloss"` on `\w`, whose default
 *   attribute is `lemma`) settles to the PT9-simplified bare collapsed form (`|gloss`).
 * - Cycling the SAME editor to the formatted/hidden view (`platformScriptureEditor.changeView`, the
 *   view-cycling affordance also used to reach Simple mode's view) hides the intact span's
 *   attribute bytes and all marker glyphs while keeping word content visible — proving the hiding
 *   is real (not a vacuous check against content that was never there). Bytes the closer-deletion
 *   scenario degraded to literal content stay visible there, because they ARE content now.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a SECOND Electron
 * instance launched against the shared webpack renderer dev server has a documented failure mode
 * where new dock tabs never render (see isolated.fixture.ts). Scenarios run as test.step()s sharing
 * the one instance and one edited document, which also lets the Simple-view check assert against
 * genuinely-populated content instead of an empty positive control.
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB (installed
 * by the C# backend into the empty root): `npm run test:e2e:isolated scripture-editor`.
 */
import { FrameLocator, Locator } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  sendPapiCommandWhenRegistered,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

// Power mode so the editor opens in Standard view (marker-editable) — the surface this feature
// targets. DEV_NOISY=false keeps the normal Home layout (see standard-default-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/**
 * Click the very start of `glyph`'s rendered text (the boundary immediately BEFORE it) — the
 * insertion point a user would click to type new content right before a marker glyph. A plain
 * `.click()` lands mid-glyph at an unpredictable offset; clicking just inside the left edge (x: 1)
 * is the reliable way to place the caret at a specific structural boundary in a contentEditable
 * without counting characters (glyph text length varies with `+`-nesting).
 */
async function clickBeforeGlyph(glyph: Locator): Promise<void> {
  const box = await glyph.boundingBox();
  if (!box) throw new Error('Glyph has no bounding box (not visible/attached)');
  await glyph.click({ position: { x: 1, y: box.height / 2 } });
}

test.describe('scripture editor attribute display', () => {
  test('char-span attribute bytes display and settle in Standard view and hide in Simple view', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, several typed marker
    // sequences each awaiting a settle). 3x "slow" budget — see standard-default-power-mode.spec.ts.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame: FrameLocator = mainPage.frameLocator(
      `iframe[data-web-view-id="${editorId}"]`,
    );
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Luke 4 ships many `\wj` (Words of Jesus) char spans and nothing else char-styled — a clean
    // canvas with no pre-existing `\w`/attribute content to collide with what this spec types.
    await navigateToolbarBcv(mainPage, 'Luke 4:1');
    const editorInput = editorFrame.locator('.editor-input.marker-editable');
    await expect(editorInput).toBeAttached({ timeout: 60_000 });
    // Chapter content actually rendered (positive control before the scoped edits below) — Luke
    // 4:43 is the last verse carrying a `\wj` span in this chapter (see the closer picked below).
    await expect(editorInput).toContainText('Kingdom', { timeout: 60_000 });

    await test.step('a nested attribute-bearing span is created by typing and its bare run is visible', async () => {
      // The LAST `\wj` closing glyph in the loaded chapter (Luke 4:43) — content ends there with
      // nothing else riding the same span, unlike earlier verses that carry a trailing footnote.
      const wjCloser = editorFrame.locator('span.closing[data-marker="wj"]').last();
      await expect(wjCloser).toBeAttached();
      await clickBeforeGlyph(wjCloser);

      // Type the nested word-list marker directly before \wj*'s closer: opener+space and
      // closer+`*` are BOTH tokenizer terminators, so this single burst creates a real nested
      // CharNode with content "dsa" and a bare (marker-default) attribute — the zzz6 shape.
      await editorInput.pressSequentially('\\+w dsa|stuff\\+w*', { delay: 30 });

      await expect(editorInput).toContainText('dsa|stuff', { timeout: 15_000 });
      await expect(editorFrame.locator('span.closing[data-marker="w"]')).toHaveCount(1);
      await expect(editorFrame.locator('span.opening[data-marker="w"]')).toHaveCount(1);
    });

    await test.step('editing the nested closer glyph settles on caret departure (deferred finding 2)', async () => {
      // Caret right after the nested `\+w*` closer (== right before `\wj*`, its only neighbor).
      const wjCloser = editorFrame.locator('span.closing[data-marker="wj"]').last();
      await clickBeforeGlyph(wjCloser);

      // Backspace through the whole nested closing glyph (`\+w*` is 4 characters) — the exact
      // gesture the design names as the historical "never settles" bug: were the attribute run
      // treated as an opaque sentinel, this edit would never re-tokenize.
      await editorInput.press('Backspace');
      await editorInput.press('Backspace');
      await editorInput.press('Backspace');
      await editorInput.press('Backspace');

      // Depart the edited span (move the caret elsewhere) to trigger the Tier-2 settle.
      await editorInput.click();
      await editorInput.press('Home');

      // If this never settles (the historical bug), the closer stays gone from the DOM but the
      // rebuild never converges and this bounded poll times out — the regression signal.
      await expect(editorFrame.locator('span.closing[data-marker="w"]')).toHaveCount(0, {
        timeout: 20_000,
      });
      // Content survived the implicit close (merged as literal text, not dropped).
      await expect(editorInput).toContainText('dsa|stuff', { timeout: 20_000 });
    });

    await test.step('the settled edit survives a save and chapter-navigation round-trip', async () => {
      // Navigating away flushes the pending save; returning re-loads from the PDP, proving the
      // settle was actually persisted and not just an ephemeral client-side render.
      await navigateToolbarBcv(mainPage, 'Luke 5:1');
      await expect(editorInput).toContainText('Gennesaret', { timeout: 60_000 });
      await navigateToolbarBcv(mainPage, 'Luke 4:1');
      await expect(editorInput).toContainText('dsa|stuff', { timeout: 60_000 });
      await expect(editorFrame.locator('span.closing[data-marker="w"]')).toHaveCount(0);
    });

    await test.step('typing the named form of a default attribute settles to the collapsed form', async () => {
      // Append after Luke 4:44's own text ("He was preaching in the synagogues of Galilee.") — a
      // short, plain, single-visual-line verse with no char spans, so `End` reliably reaches its
      // true end rather than a soft-wrapped line boundary or a boundary inside a `\wj` span.
      // Luke 4 says "Galilee" three times (v14, v31, v44) — `.last()` is verse 44's, the only one
      // that both follows this chapter's edits and is a plain, char-span-free verse.
      await editorInput.getByText('Galilee', { exact: false }).last().click();
      await editorInput.press('End');

      // The closing `*` is the first terminator this span ever sees, so extractAttributes derives
      // `lemma="gloss"` straight from the typed named form and redisplays it canonically per PT9's
      // settle-time simplification: a lone default attribute collapses to `|value`.
      await editorInput.pressSequentially('\\w mid|lemma="gloss"\\w*', { delay: 30 });

      await expect(editorInput).toContainText('mid|gloss', { timeout: 15_000 });
      await expect(editorInput).not.toContainText('lemma=');
    });

    await test.step('the Simple-view rendering hides the intact span attribute bytes', async () => {
      // The view-cycling affordance (`platformScriptureEditor.changeView`) is the same command
      // Simple mode's view is pinned to: power mode cycles standard -> markers -> formatted, and
      // 'formatted' resolves to markerMode 'hidden' regardless of `platform.interfaceMode` — the
      // exact rendering path formatted-default-simple-mode.spec.ts pins for Simple-mode users.
      // Cycling the SAME instance (rather than a fresh simple-mode Electron instance) keeps this
      // check against the real edited content above instead of an empty, vacuous chapter.
      await sendPapiCommandWhenRegistered('platformScriptureEditor.changeView', editorId);
      // Wait for the intermediate 'markers' (visible) step to actually land before firing the
      // second cycle command — otherwise a second command dispatched before the first React state
      // update flushes would read stale state and fail to advance past 'markers'.
      await expect(editorFrame.locator('.editor-input.marker-visible')).toBeAttached({
        timeout: 20_000,
      });
      await sendPapiCommandWhenRegistered('platformScriptureEditor.changeView', editorId);

      const formattedInput = editorFrame.locator('.editor-input.marker-hidden');
      await expect(formattedInput).toBeAttached({ timeout: 20_000 });

      // Positive control: the content typed above is still there. "dsa|stuff" appears WITH its
      // pipe: deleting the nested closer above degraded those attribute bytes to literal text
      // content (an unclosed span leaves the tokenizer no closer to derive attributes from), and
      // the formatted view must never hide real content — its visibility here is itself the pin
      // that degraded-to-content bytes render as content rather than being hidden as attributes.
      await expect(formattedInput).toContainText('dsa|stuff', { timeout: 20_000 });
      // "Galilee.mid", not bare "mid": the span was appended directly after verse 44's closing
      // "Galilee." with no separator, and the anchored form cannot be satisfied by pre-existing
      // chapter text ("middle" appears twice in Luke 4, so bare "mid" would match even if the
      // typed span never rendered — exactly the vacuous-control failure this step must avoid).
      await expect(formattedInput).toContainText('Galilee.mid', { timeout: 20_000 });
      // The intact attribute-bearing span (`\w mid|gloss\w*`) is the real hiding check: its
      // attribute value must not render ANYWHERE — bare "gloss" (not just "|gloss") so a
      // regression that strips only the pipe still fails, safe because "gloss" appears nowhere
      // in the chapter's own text — and no marker glyphs may render anywhere in the chapter.
      await expect(formattedInput).not.toContainText('gloss');
      await expect(formattedInput).not.toContainText('lemma=');
      await expect(editorFrame.locator('span.opening[data-marker]')).toHaveCount(0);
      await expect(editorFrame.locator('span.closing[data-marker]')).toHaveCount(0);
    });
  });
});
