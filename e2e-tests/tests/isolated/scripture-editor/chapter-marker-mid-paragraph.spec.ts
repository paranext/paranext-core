/**
 * End-to-end cover for a chapter marker typed in the middle of a paragraph, which the
 * chapter-marker save-boundary repair removes: Paratext refuses a chapter holding a second chapter
 * marker, so the repair takes it out, pushes the document back into the editor and tells the user.
 *
 * The editor holds such a marker as the paragraph cut short, the marker, and the rest of the
 * paragraph's text standing outside any paragraph. Paratext 9 removes only the marker's own bytes,
 * so the paragraph stays whole; the repair has to put that text back into it, and the caret back
 * where the marker was. Only the running app shows both: that the caret lands inside the rejoined
 * text, and that the chapter then saves as one paragraph.
 *
 * The marker is typed key by key, which is what makes the editor save: the `\` opens the marker
 * menu, and the space after `c` commits what was typed as the same bytes typing alone would leave.
 * Keys go through `mainPage.keyboard` with the editor focused (`locator.press` focuses its target
 * first and is slow per key).
 *
 * ONE test() per spec file on purpose (see chapter-marker-repair.spec.ts).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { sendPapiRequestOnce, LAUNCH_PHASE_TIMEOUT_MS } from '../../../fixtures/helpers';
import {
  findScriptureEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';
import { installToastProbe, recordedToasts } from '../../../fixtures/toast-recorder';

// Power mode: the editable Standard view. DEV_NOISY=false keeps the normal Home layout (see
// standard-default-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const WEBSOCKET_PORT = 8876;
const PDP_REQUEST_TIMEOUT_MS = 30_000;

const RUTH_2 = { book: 'RUT', chapterNum: 2, verseNum: 1 };

/** How the correction notice reads for the Ruth 2 this spec types a marker into. */
const CORRECTION_MESSAGE =
  'The chapter marker in Ruth 2 did not match the chapter, so it was corrected';

/** The text the marker is typed into the middle of, split where it goes. */
const TEXT_BEFORE_MARKER = 'Naomi had ';
const TEXT_AFTER_MARKER = 'a relative of her husband';

/** Between keys, so each is handled before the next arrives. */
const KEY_DELAY_MS = 80;

/** Typed once the correction is on screen, to show where the caret came back. */
const CARET_TOKEN = 'ZZMID';

test.describe('scripture editor chapter marker typed mid-paragraph', () => {
  test('removes the marker, keeps the paragraph whole, and returns the caret to where it was', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates). Playwright's 3x "slow"
    // budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();

    const pdpId = await sendPapiRequestOnce<string>(
      'object:platform.Paratext-pdpf.getProjectDataProviderId',
      [SAMPLE_WEB_PROJECT_ID],
      WEBSOCKET_PORT,
      LAUNCH_PHASE_TIMEOUT_MS,
    );
    const getRuth2Usfm = () =>
      sendPapiRequestOnce<string>(
        `object:${pdpId}.getChapterUSFM`,
        [RUTH_2],
        WEBSOCKET_PORT,
        PDP_REQUEST_TIMEOUT_MS,
      );
    // Whitespace-normalized: saving through the editor rewrites the file's line-end spacing.
    const normalized = (usfm: string) => usfm.replace(/\s+/g, ' ').trim();

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    // `.first()` because the footnote-editor popover renders its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    const editorEvalFrame = await findScriptureEditorFrame(mainPage);

    await installToastProbe(mainPage);

    await navigateToolbarBcv(mainPage, 'Ruth 2:1');
    await expect(editorInput).toContainText(TEXT_BEFORE_MARKER + TEXT_AFTER_MARKER, {
      timeout: 60_000,
    });
    const storedUsfm = normalized(await getRuth2Usfm());
    expect(storedUsfm).toContain(TEXT_BEFORE_MARKER + TEXT_AFTER_MARKER);

    await test.step('a chapter marker is typed into the middle of verse 1', async () => {
      const placed = await editorEvalFrame.evaluate(
        ({ before, after }) => {
          const root = document.querySelector<HTMLElement>('.editor-input.marker-editable');
          if (!root) return false;
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            const offset = (node.textContent ?? '').indexOf(before + after);
            if (offset >= 0) {
              root.focus();
              document.getSelection()?.collapse(node, offset + before.length);
              return true;
            }
          }
          return false;
        },
        { before: TEXT_BEFORE_MARKER, after: TEXT_AFTER_MARKER },
      );
      expect(placed).toBe(true);
      await mainPage.keyboard.type('\\c 5 ', { delay: KEY_DELAY_MS });
    });

    await test.step('the marker is removed and the user is told', async () => {
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(CORRECTION_MESSAGE)]));
      await expect(editorFrame.locator('p.chapter[data-marker="c"]')).toHaveCount(1, {
        timeout: 30_000,
      });
      await expect(editorInput).toContainText(TEXT_BEFORE_MARKER + TEXT_AFTER_MARKER, {
        timeout: 30_000,
      });
    });

    await test.step('the caret is back where the marker was typed', async () => {
      // The caret restore runs once the corrected document has loaded; until then a key would go
      // wherever the load left the caret, so wait for the caret to sit in the rejoined text.
      await expect
        .poll(
          () =>
            editorEvalFrame.evaluate((before) => {
              const selection = document.getSelection();
              const node = selection?.anchorNode;
              if (!selection || !node || node.nodeType !== Node.TEXT_NODE) return '';
              return (node.textContent ?? '').slice(0, selection.anchorOffset).endsWith(before)
                ? 'after-the-text-before-the-marker'
                : (node.textContent ?? '').slice(0, selection.anchorOffset);
            }, TEXT_BEFORE_MARKER),
          { timeout: 20_000 },
        )
        .toBe('after-the-text-before-the-marker');
      await mainPage.keyboard.type(CARET_TOKEN, { delay: KEY_DELAY_MS });
    });

    await test.step('the chapter saves with its one marker and the paragraph whole', async () => {
      const expected = storedUsfm.replace(
        TEXT_BEFORE_MARKER + TEXT_AFTER_MARKER,
        TEXT_BEFORE_MARKER + CARET_TOKEN + TEXT_AFTER_MARKER,
      );
      await expect
        .poll(async () => normalized(await getRuth2Usfm()), { timeout: 30_000 })
        .toBe(expected);
    });
  });
});
