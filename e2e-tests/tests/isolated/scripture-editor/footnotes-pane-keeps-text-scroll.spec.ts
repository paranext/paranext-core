/**
 * E2E for the Scripture text keeping its scroll position while the footnotes pane opens and closes.
 * The text scrolls inside its own panel in `FootnotesLayout`; if showing or hiding the pane swapped
 * that scrolling element for another one, the text would land back at the top of the chapter.
 *
 * Matthew 5 is long enough to scroll well past its first verse and carries footnote callers through
 * its middle (verses 5, 18, 22, 26, 27, 29, 30, 43 and 47 in
 * `c-sharp/assets/WEB/41MATengWEBUS.SFM`).
 *
 * Every check is about what the reader sees — which verses sit inside the text's visible area — not
 * about exact pixel offsets, which depend on the window, the font and the pane's stored size.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a second Electron
 * instance against the shared renderer dev server can fail to render new dock tabs (see
 * isolated.fixture.ts). The scenarios run as test.step()s sharing one instance.
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/footnotes-pane-keeps-text-scroll.spec.ts`.
 */
import { type Frame } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  getEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  sendCommandWithId,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

// Power mode: the editor opens in Standard view, and a caller click there shows the pane.
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const FOOTNOTES_PANE_SELECTOR = '[data-footnotes-pane]';

/** The in-text caller of a footnote (shared shape with cross-references, scoped to footnotes). */
const TEXT_FOOTNOTE_CALLER_SELECTOR =
  '.note[data-note-kind="footnote"] .immutable-note-caller > button';

/** What the reader sees of the text: the verses inside its visible area and how far it scrolled. */
type TextViewport = { scrollTop: number; visibleVerses: number[] };

/**
 * Reads which verse numbers are inside the text's visible area, found the way the app finds it: the
 * nearest ancestor of the text that is styled to scroll and actually overflows.
 */
async function readTextViewport(frame: Frame): Promise<TextViewport> {
  return frame.evaluate(() => {
    const container = document.querySelector<HTMLElement>('.editor-container');
    if (!container) throw new Error('No .editor-container in the editor frame');
    let scroller: HTMLElement | undefined = container;
    while (scroller) {
      const { overflowY } = getComputedStyle(scroller);
      if (
        (overflowY === 'auto' || overflowY === 'scroll') &&
        scroller.scrollHeight > scroller.clientHeight
      )
        break;
      scroller = scroller.parentElement ?? undefined;
    }
    if (!scroller) return { scrollTop: 0, visibleVerses: [] };
    const view = scroller.getBoundingClientRect();
    const visibleVerses = Array.from(
      container.querySelectorAll<HTMLElement>('span[data-marker="v"][data-number]'),
    )
      .filter((verse) => {
        const rect = verse.getBoundingClientRect();
        return rect.height > 0 && rect.top >= view.top - 1 && rect.bottom <= view.bottom + 1;
      })
      .map((verse) => Number(verse.dataset.number));
    return { scrollTop: scroller.scrollTop, visibleVerses };
  });
}

/**
 * Waits until the text has stopped moving: the load-time scroll to the current verse (smooth, and
 * started only once the chapter has laid out) must not land after, and undo, a scroll made here.
 */
async function waitForTextToSettle(frame: Frame): Promise<void> {
  let previous: string | undefined;
  let unchangedReads = 0;
  await expect
    .poll(
      async () => {
        const current = JSON.stringify(await readTextViewport(frame));
        unchangedReads = current === previous ? unchangedReads + 1 : 0;
        previous = current;
        return unchangedReads;
      },
      { timeout: 20_000, intervals: [250] },
    )
    .toBeGreaterThanOrEqual(3);
}

/**
 * Scrolls the text so `verseNumber`'s marker sits just below the top of its visible area — as a
 * reader scrolling there with the mouse wheel would leave it.
 */
async function scrollVerseToTop(frame: Frame, verseNumber: number): Promise<void> {
  await frame.evaluate((targetVerse) => {
    const verse = document.querySelector<HTMLElement>(
      `.editor-container span[data-marker="v"][data-number="${targetVerse}"]`,
    );
    if (!verse) throw new Error(`Verse ${targetVerse} is not rendered`);
    let scroller: HTMLElement | undefined = verse;
    while (scroller) {
      const { overflowY } = getComputedStyle(scroller);
      if (
        (overflowY === 'auto' || overflowY === 'scroll') &&
        scroller.scrollHeight > scroller.clientHeight
      )
        break;
      scroller = scroller.parentElement ?? undefined;
    }
    if (!scroller) throw new Error('The text has no scrolling ancestor');
    const delta = verse.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 8;
    scroller.scrollTop += delta;
  }, verseNumber);
}

/**
 * Scrolls the text so the caller of the footnote at `callerIndex` sits just above the bottom of the
 * text's visible area — where the pane, which opens below the text, takes its room from.
 */
async function scrollCallerNearBottom(frame: Frame, callerIndex: number): Promise<void> {
  await frame.evaluate(
    ([selector, index]) => {
      const caller = document.querySelectorAll<HTMLElement>(selector)[index];
      if (!caller) throw new Error(`No footnote caller at index ${index}`);
      let scroller: HTMLElement | undefined = caller;
      while (scroller) {
        const { overflowY } = getComputedStyle(scroller);
        if (
          (overflowY === 'auto' || overflowY === 'scroll') &&
          scroller.scrollHeight > scroller.clientHeight
        )
          break;
        scroller = scroller.parentElement ?? undefined;
      }
      if (!scroller) throw new Error('The text has no scrolling ancestor');
      const delta =
        caller.getBoundingClientRect().bottom - (scroller.getBoundingClientRect().bottom - 24);
      scroller.scrollTop += delta;
    },
    [TEXT_FOOTNOTE_CALLER_SELECTOR, callerIndex] as const,
  );
}

/** Whether the caller of the footnote at `callerIndex` is fully inside the text's visible area. */
async function isCallerInView(frame: Frame, callerIndex: number): Promise<boolean> {
  return frame.evaluate(
    ([selector, index]) => {
      const caller = document.querySelectorAll<HTMLElement>(selector)[index];
      if (!caller) return false;
      let scroller: HTMLElement | undefined = caller.parentElement ?? undefined;
      while (scroller) {
        const { overflowY } = getComputedStyle(scroller);
        if (
          (overflowY === 'auto' || overflowY === 'scroll') &&
          scroller.scrollHeight > scroller.clientHeight
        )
          break;
        scroller = scroller.parentElement ?? undefined;
      }
      if (!scroller) return false;
      const view = scroller.getBoundingClientRect();
      const rect = caller.getBoundingClientRect();
      return rect.height > 0 && rect.top >= view.top - 1 && rect.bottom <= view.bottom + 1;
    },
    [TEXT_FOOTNOTE_CALLER_SELECTOR, callerIndex] as const,
  );
}

/** The document-order index of the first footnote caller inside verse `verseNumber`. */
async function callerIndexInVerse(frame: Frame, verseNumber: number): Promise<number> {
  const index = await frame.evaluate(
    ([selector, targetVerse]) => {
      const verseSelector = '.editor-container span[data-marker="v"]';
      // One query over both shapes returns them in document order, so the verse a caller belongs
      // to is the last verse marker met before it.
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(`${verseSelector}, ${selector}`),
      );
      const callersWithVerse = elements.reduce<(string | undefined)[]>(
        (callerVerses, element, position) => {
          if (element.matches(verseSelector)) return callerVerses;
          const owner = elements
            .slice(0, position)
            .filter((candidate) => candidate.matches(verseSelector))
            .at(-1);
          return [...callerVerses, owner?.dataset.number];
        },
        [],
      );
      return callersWithVerse.indexOf(String(targetVerse));
    },
    [TEXT_FOOTNOTE_CALLER_SELECTOR, verseNumber] as const,
  );
  if (index < 0) throw new Error(`No footnote caller in verse ${verseNumber}`);
  return index;
}

test.describe('footnotes pane and the Scripture text scroll position', () => {
  test('opening and closing the footnotes pane leaves the text where the reader scrolled it', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, several pane toggles).
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrameLocator = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrameLocator.locator('.editor-container').waitFor({ timeout: 60_000 });

    await navigateToolbarBcv(mainPage, 'Matthew 5:1');
    // The chapter's LAST verse rendered: the whole chapter is laid out before anything is measured.
    await expect(
      editorFrameLocator.locator('.editor-container span[data-marker="v"][data-number="48"]'),
    ).toBeAttached({ timeout: 60_000 });
    const frame = await getEditorFrame(mainPage, editorId);
    const pane = frame.locator(FOOTNOTES_PANE_SELECTOR);

    // The pane starts hidden in a fresh editor; the scenarios below rely on that.
    await expect(pane).toHaveCount(0);

    let versesInViewBefore: number[] = [];

    await test.step('scroll the text to the middle of the chapter', async () => {
      await waitForTextToSettle(frame);
      await scrollVerseToTop(frame, 20);
      await expect
        .poll(async () => (await readTextViewport(frame)).visibleVerses, { timeout: 10_000 })
        .toContain(20);
      await waitForTextToSettle(frame);
      const viewport = await readTextViewport(frame);
      expect(viewport.visibleVerses).toContain(20);
      // Positive control: really scrolled away from the top of the chapter.
      expect(viewport.scrollTop).toBeGreaterThan(0);
      expect(viewport.visibleVerses).not.toContain(1);
      versesInViewBefore = viewport.visibleVerses;
    });

    await test.step('showing the pane from its menu command keeps the same verses in view', async () => {
      await sendCommandWithId(mainPage, 'platformScriptureEditor.toggleFootnotes', editorId);
      await expect(pane).toHaveCount(1, { timeout: 20_000 });
      // The pane takes its room from below the text, so the verse at the top stays put.
      await expect
        .poll(async () => (await readTextViewport(frame)).visibleVerses, { timeout: 10_000 })
        .toContain(versesInViewBefore[0]);
      expect((await readTextViewport(frame)).visibleVerses).not.toContain(1);
    });

    await test.step('closing the pane with its X keeps the same verses in view', async () => {
      await frame.getByRole('button', { name: 'Close footnotes pane' }).click();
      await expect(pane).toHaveCount(0, { timeout: 20_000 });
      await expect
        .poll(async () => (await readTextViewport(frame)).visibleVerses, { timeout: 10_000 })
        .toContain(versesInViewBefore[0]);
      expect((await readTextViewport(frame)).visibleVerses).not.toContain(1);
    });

    await test.step('clicking a caller near the bottom of the text keeps that caller in view as the pane opens', async () => {
      const callerIndex = await callerIndexInVerse(frame, 26);
      await scrollCallerNearBottom(frame, callerIndex);
      await expect.poll(() => isCallerInView(frame, callerIndex), { timeout: 10_000 }).toBe(true);
      // Positive control: this caller sits where the opening pane would cover it.
      expect((await readTextViewport(frame)).visibleVerses).not.toContain(1);

      await frame.locator(TEXT_FOOTNOTE_CALLER_SELECTOR).nth(callerIndex).click();
      await expect(pane).toHaveCount(1, { timeout: 20_000 });
      await expect.poll(() => isCallerInView(frame, callerIndex), { timeout: 10_000 }).toBe(true);
      expect((await readTextViewport(frame)).visibleVerses).not.toContain(1);
    });
  });
});
