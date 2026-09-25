/**
 * End-to-end cover for the BACKEND half of the chapter-marker repair — `ChapterMarkerCorrection.cs`
 * wired into the Paratext PDP's chapter setters, the backstop for writers that never go through the
 * editor.
 *
 * `ChapterMarkerCorrectionTests.cs` pins the algorithm to Paratext 9's own `[TestCase]` table and
 * `ChapterMarkerCorrectionWiringTests.cs` pins the setters to calling it, but neither can show the
 * one thing that matters most: that the shape the correction produces is a shape real Paratext will
 * actually take. `ScrText.ValidateChapterNumber` is the code that refuses these documents, and only
 * a live write reaches it — so a correction that fixed the marker but left, say, content ahead of
 * it would pass every unit test and still fail every save. That is not hypothetical: the renderer
 * port shipped exactly that bug during development (a restored marker placed after a leading `\id`)
 * and only cross-checking the two ports caught it.
 *
 * No UI: the assertions go straight to the project data provider over PAPI, so this is the cheap
 * half of the feature's e2e cover. `chapter-marker-repair.spec.ts` covers the editor half.
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { sendPapiRequestOnce, LAUNCH_PHASE_TIMEOUT_MS } from '../../../fixtures/helpers';
import {
  makeSampleProjectEditable,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const WEBSOCKET_PORT = 8876;
const PDP_REQUEST_TIMEOUT_MS = 30_000;

/** Jonah 2 — a chapter after the first, so its document must BEGIN with its chapter marker. */
const JONAH_2 = { book: 'JON', chapterNum: 2, verseNum: 1 };
/** A phrase from Jonah 2:1 that must survive every round trip, proving the write kept the content. */
const JONAH_2_PHRASE = 'prayed to Yahweh, his God';

/** Every `\c N` marker in a USFM document, in order. `\ca`/`\cl`/`\cp` do not match. */
function chapterMarkers(usfm: string): string[] {
  return [...usfm.matchAll(/\\c\s+(\d+)/g)].map((match) => match[1]);
}

test.describe('chapter-marker correction in the project data provider', () => {
  test('accepts a chapter whose markers disagree with it, and stores it corrected', async ({
    mainPage,
  }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();

    const pdpId = await sendPapiRequestOnce<string>(
      'object:platform.Paratext-pdpf.getProjectDataProviderId',
      [SAMPLE_WEB_PROJECT_ID],
      WEBSOCKET_PORT,
      LAUNCH_PHASE_TIMEOUT_MS,
    );
    const getChapterUsfm = () =>
      sendPapiRequestOnce<string>(
        `object:${pdpId}.getChapterUSFM`,
        [JONAH_2],
        WEBSOCKET_PORT,
        PDP_REQUEST_TIMEOUT_MS,
      );
    const setChapterUsfm = (usfm: string) =>
      sendPapiRequestOnce<boolean>(
        `object:${pdpId}.setChapterUSFM`,
        [JONAH_2, usfm],
        WEBSOCKET_PORT,
        PDP_REQUEST_TIMEOUT_MS,
      );

    const original = await getChapterUsfm();
    expect(chapterMarkers(original)).toEqual(['2']);
    expect(original).toContain(JONAH_2_PHRASE);

    await test.step('a wrong chapter number is put back rather than refused', async () => {
      // Without the correction this write is rejected outright ("Wrong chapter number"), so the
      // request below rejects and the test fails before reaching any assertion — which is exactly
      // the silent, unsurfaced save failure this correction exists to prevent.
      await setChapterUsfm(original.replace(/\\c\s+2/, '\\c 9'));

      const stored = await getChapterUsfm();
      expect(chapterMarkers(stored)).toEqual(['2']);
      expect(stored).toContain(JONAH_2_PHRASE);
    });

    await test.step('a second chapter marker typed into the chapter is dropped', async () => {
      // "Multiple chapter markers present." — the rejection a `\c` typed mid-chapter produces.
      const stored = await getChapterUsfm();
      await setChapterUsfm(`${stored.trimEnd()}\n\\c 9\n`);

      const repaired = await getChapterUsfm();
      expect(chapterMarkers(repaired)).toEqual(['2']);
      expect(repaired).toContain(JONAH_2_PHRASE);
    });

    await test.step('a deleted chapter marker is restored at the very start of the document', async () => {
      // "No chapter marker present." — and the restored marker has to go at position 0, because
      // Paratext also refuses any content ahead of a chapter marker after the first
      // ("Text present before chapter marker.").
      const stored = await getChapterUsfm();
      await setChapterUsfm(stored.replace(/\\c\s+2\s*/, ''));

      const repaired = await getChapterUsfm();
      expect(chapterMarkers(repaired)).toEqual(['2']);
      expect(repaired.trimStart().startsWith('\\c 2')).toBe(true);
      expect(repaired).toContain(JONAH_2_PHRASE);
    });
  });
});
