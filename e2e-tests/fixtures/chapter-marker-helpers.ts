/**
 * Shared pieces of the chapter-marker specs (`chapter-marker-repair.spec.ts`,
 * `chapter-marker-restore.spec.ts`): the editable Standard-view editor on the sample project, the
 * project data provider's chapter reads, the correction notice's wording, and the one gesture those
 * specs use to put the caret on a chapter line.
 */
import { type FrameLocator, type Locator, type Page } from '@playwright/test';
import { LAUNCH_PHASE_TIMEOUT_MS, sendPapiRequestOnce } from './helpers';
import {
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
} from './scripture-editor-helpers';

export const WEBSOCKET_PORT = 8876;
export const PDP_REQUEST_TIMEOUT_MS = 30_000;

/**
 * How `%webView_platformScriptureEditor_error_chapterMarkerCorrected_format%` reads for chapter
 * `chapterNum` of `bookName`. The chapter is part of the match on purpose: the notice has to name
 * the chapter it repaired, which is not always the chapter on screen.
 */
export const chapterMarkerCorrectionMessage = (chapterNum: number, bookName: string) =>
  `The chapter marker in ${bookName} ${chapterNum} did not match the chapter, so it was corrected`;

/** The sample project's project data provider id, once the backend has registered it. */
export function getSampleProjectDataProviderId(): Promise<string> {
  return sendPapiRequestOnce<string>(
    'object:platform.Paratext-pdpf.getProjectDataProviderId',
    [SAMPLE_WEB_PROJECT_ID],
    WEBSOCKET_PORT,
    LAUNCH_PHASE_TIMEOUT_MS,
  );
}

/** One chapter of a book as the project data provider holds it, read as USFM. */
export function getChapterUsfmFromProvider(
  pdpId: string,
  book: string,
  chapterNum: number,
): Promise<string> {
  return sendPapiRequestOnce<string>(
    `object:${pdpId}.getChapterUSFM`,
    [{ book, chapterNum, verseNum: 1 }],
    WEBSOCKET_PORT,
    PDP_REQUEST_TIMEOUT_MS,
  );
}

/**
 * Open the sample project in the editable Standard-view editor (Power mode) and return its frame
 * and its contenteditable root. `.first()` because the footnote-editor popover renders its own
 * `.editor-input.marker-editable`.
 */
export async function openSampleEditorInStandardView(
  mainPage: Page,
): Promise<{ editorFrame: FrameLocator; editorInput: Locator }> {
  const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
  const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
  await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
  return { editorFrame, editorInput: editorFrame.locator('.editor-input.marker-editable').first() };
}

/**
 * Click the chapter line's glyph to put the focus in the editor. A glyph is not focusable and
 * clicking it does not leave a usable caret, so the caret is placed with the keys that follow
 * (`End`, `Home`, arrows) and those keys must reach the contenteditable: send them through
 * `mainPage.keyboard` once this click has focused the editor, or press them on the editor root.
 * `press` / `pressSequentially` on the glyph itself would focus that unfocusable `<span>` and drop
 * the caret, so the keys reach no Lexical selection at all and the document is left untouched, a
 * silently vacuous test.
 */
export async function clickChapterMarkerGlyph(chapterMarker: Locator): Promise<void> {
  await chapterMarker.locator('span').first().click();
}
