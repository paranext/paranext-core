/**
 * Simple-mode default-view e2e: a scripture editor opened with no previously saved view state keeps
 * the pre-Standard-view 'formatted' default when `platform.interfaceMode` is 'simple', so nothing
 * changes for Simple users — the power-mode Standard default (see
 * standard-default-power-mode.spec.ts) must not leak into Simple mode.
 *
 * The flow mirrors the power-mode spec exactly (same project, same open command, same navigation);
 * the ONLY variable is `interfaceMode`, so a failure here isolates the interface-mode gating of the
 * default rather than anything about how the editor was opened.
 *
 * It also checks that Ctrl+E, Power's Standard view and Preview toggle, changes nothing in Simple,
 * and that a project with a non-default font and size reaches the editor text, the verse numbers,
 * the headings and the footnotes pane's rows.
 *
 * ONE test() per spec file on purpose — see standard-default-power-mode.spec.ts.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import {
  ensureFootnotesVisible,
  getEditorFrame,
  installSampleProjectWithFont,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  rewriteSampleProjectChapterUsfm,
  SAMPLE_WEB_PROJECT_ID,
} from '../../../fixtures/scripture-editor-helpers';

// interfaceMode 'simple' overrides the fixture's 'power' default — this spec IS the guard that
// Simple mode keeps the formatted view.
// DEV_NOISY=false: the noisy dev test layout replaces the normal layouts (see
// scroll-group-sync.spec.ts).
// 15pt is 20px, not the 16px a default-size project gives, so a regression to the default size or
// to the platform font stack fails the font assertions below.
const PROJECT_FONT_NAME = 'Scheherazade New';
const PROJECT_FONT_SIZE_PT = 15;
const PROJECT_FONT_SIZE_PX = (PROJECT_FONT_SIZE_PT * 4) / 3;

test.use({
  interfaceMode: 'simple',
  // Past first run, so Simple mode starts in the app rather than the setup wizard.
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: {
    isolatedProjectRoot: true,
    envOverrides: { DEV_NOISY: 'false' },
    prepareProjectRoot: installSampleProjectWithFont({
      fontName: PROJECT_FONT_NAME,
      fontSize: PROJECT_FONT_SIZE_PT,
    }),
  },
});

test.describe('scripture editor default view', () => {
  test('a first-open editor keeps the formatted view in simple mode', async ({ mainPage }) => {
    // Heavy isolated test: it launches its own Electron instance, installs the bundled sample
    // project into a fresh root, opens the editor, and polls several backend-readiness gates. A cold
    // first run measured ~84s against the default 120s budget (~70%), so a colder or
    // memory-pressured machine could spuriously time out before the calibrated per-step timeouts
    // fire. Give it Playwright's 3x "slow" budget for headroom (a passing run still exits in seconds).
    test.slow();
    // This is a Simple-mode spec, so the onboarding tour opens on its own; suppress it before its
    // full-screen overlay can intercept the BCV trigger click below.
    await waitForAppReady(mainPage);
    // No `waitForHomeTab` here: simple mode loads the static simpleLayout, which has NO Home tab
    // (simple-layout.data.ts). The open helper below carries its own app-readiness gates (first
    // iframe attached = initial loadLayout() done; PAPI command registration; retry loop).
    await makeSampleProjectEditable();
    // The sample has no heading; put one at the top of the chapter, tolerating any line ending.
    await rewriteSampleProjectChapterUsfm({ book: 'OBA', chapterNum: 1, verseNum: 1 }, (usfm) =>
      usfm.replace(
        /(\\c 1[ \t]*)(\r?\n)/,
        (_match, chapter, newline) => `${chapter}${newline}\\s1 Heading${newline}`,
      ),
    );
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Same book as the power-mode spec; the verse-number wait doubles as the positive control
    // that chapter content finished rendering BEFORE the negative assertions below run (an
    // empty editor would pass them vacuously).
    await navigateToolbarBcv(mainPage, 'Obadiah 1:1');
    await expect(editorFrame.locator('span[data-marker="v"][data-number="1"]')).toBeAttached({
      timeout: 60_000,
    });

    // Formatted view POSITIVE signal, asserted with a wait so the view has actually SETTLED to
    // formatted before the negative checks below (the two toHaveCount(0) checks alone are satisfied
    // by the pre-settle DOM and could pass vacuously). The contentEditable root carries the
    // formatted marker-mode class `marker-hidden`: non-power 'formatted' resolves to markerMode
    // 'hidden' in getViewOptionsForType, which the editor maps onto `.editor-input.marker-hidden`
    // (see _usj-nodes.scss), symmetric to the power spec's `.editor-input.marker-editable`. A
    // Simple->Standard regression (the power-default corrective effect wrongly firing in simple
    // mode) would flip this root class to `marker-editable`, failing HERE by construction instead of
    // slipping past the count-0 checks.
    await expect(editorFrame.locator('.editor-input.marker-hidden')).toBeAttached({
      timeout: 60_000,
    });

    // And no editable-marker mode class or inline marker glyphs anywhere in the content (MarkerNodes
    // exist only in Standard view's editable marker mode). The power-mode corrective effect must
    // never fire in simple mode.
    await expect(editorFrame.locator('.editor-input.marker-editable')).toHaveCount(0);
    await expect(editorFrame.locator('span.opening[data-marker]')).toHaveCount(0);

    await test.step('uses the project font and size', async () => {
      const computedStyle = (selector: string) =>
        editorFrame
          .locator(selector)
          .first()
          .evaluate((element) => {
            const { fontFamily, fontSize } = getComputedStyle(element);
            return { fontFamily, fontSize: parseFloat(fontSize) };
          });
      const startsWithProjectFont = (fontFamily: string) =>
        fontFamily.replace(/^"/, '').startsWith(PROJECT_FONT_NAME);

      // The editor root carries the project's family and size.
      await expect
        .poll(async () => (await computedStyle('.editor-input.usfm')).fontSize, { timeout: 30_000 })
        .toBeCloseTo(PROJECT_FONT_SIZE_PX, 1);
      expect(startsWithProjectFont((await computedStyle('.editor-input.usfm')).fontFamily)).toBe(
        true,
      );
      // Verse numbers are 13/16 of the project size and headings 0.8 of it.
      await expect
        .poll(
          async () => (await computedStyle('span[data-marker="v"][data-number="1"]')).fontSize,
          {
            timeout: 30_000,
          },
        )
        .toBeCloseTo((PROJECT_FONT_SIZE_PX * 13) / 16, 1);
      await expect
        .poll(async () => (await computedStyle('.usfm_s1')).fontSize, { timeout: 30_000 })
        .toBeCloseTo(PROJECT_FONT_SIZE_PX * 0.8, 1);

      // The footnotes pane's static rows use the project font too.
      await ensureFootnotesVisible(mainPage, await getEditorFrame(mainPage, editorId), editorId);
      const rows = editorFrame.locator('[data-footnotes-pane] li[role="option"]');
      // Positive control: the chapter has notes, so the assertions below do not run on nothing.
      await expect(rows.first()).toBeAttached({ timeout: 30_000 });
      const noteText = rows.first().locator('.usfm_ft').first();
      const noteStyle = () =>
        noteText.evaluate((element) => {
          const { fontFamily, fontSize } = getComputedStyle(element);
          return { fontFamily, fontSize: parseFloat(fontSize) };
        });
      await expect
        .poll(async () => (await noteStyle()).fontSize, { timeout: 30_000 })
        .toBeCloseTo(PROJECT_FONT_SIZE_PX, 1);
      expect(startsWithProjectFont((await noteStyle()).fontFamily)).toBe(true);
    });

    await test.step('Ctrl+E changes nothing in Simple', async () => {
      const mainInput = editorFrame.locator('.editor-input.marker-hidden');
      // A verse paragraph with no note, so the click moves the caret rather than opening a note.
      await mainInput.locator('p:has(span[data-marker="v"]):not(:has(.note))').first().click();
      await mainPage.keyboard.press('Control+e');
      // Nothing happening has no event to wait for. In Power the same keystroke switches the view
      // and shows the notice within a PAPI round trip, far inside this window.
      await mainPage.waitForTimeout(2_000);
      await expect(mainInput).toBeAttached();
      await expect(mainInput).toHaveAttribute('contenteditable', 'true');
      await expect(mainPage.locator('[data-sonner-toast]', { hasText: 'read-only' })).toHaveCount(
        0,
      );
      // Positive control: the caret was in the text, so the keystroke reached the editor.
      await mainPage.keyboard.type('zq');
      await expect(mainInput).toContainText('zq');
    });
  });
});
