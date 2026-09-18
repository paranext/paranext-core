/**
 * End-to-end verification that Standard view's programmatic positions address the text a caller
 * names. In editable marker mode a char span renders as `[MarkerNode "\wj", TextNode "<NBSP>Come
 * and see.", MarkerNode "\wj*"]` — the NBSP between the opening glyph and the span's content is
 * display scaffolding the editor→USJ conversion strips, so it occupies no USJ offset. A coordinate
 * model that counts it shifts every USJ text offset inside a char marker by one in BOTH directions
 * — an annotation over the span's last two characters wraps the two before them, and a caret
 * reported from inside the span comes back one too high.
 *
 * USJ→Lexical→USJ round-trip checks cannot see that class of defect: a shift applied consistently
 * in both directions cancels out. So each scenario below pins ONE direction against an outside
 * oracle. The USJ offsets themselves come from the chapter's own USJ, read from the project data
 * provider that feeds the editor — the offsets a real caller (a checks result, a comment anchor)
 * computes.
 *
 * Scenarios:
 *
 * - A caret CLICKED to the end of the span's text reports that text's own length as its offset (live
 *   → USJ). The gesture is the oracle: nothing translated coordinates on the way in.
 * - `selectRange` over the span's last two settled offsets highlights exactly those two characters
 *   (USJ → live). The browser's own selection is the oracle, not a report the editor derives back
 *   through the same model.
 * - A collapsed `selectRange` (`start` and `end` at the same location) at settled offset 0 lands the
 *   caret right after the NBSP separator, not on it and not on the marker glyph — against both the
 *   browser's own selection and the editor's own `getSelection()` report.
 * - `setAnnotation` over those same settled offsets marks exactly those two characters — not the
 *   separator, not the two before them.
 *
 * The last two talk to the editor through the scripture editor's web view controller network object
 * (`object:webViewController<webViewId>.…`), the same surface extensions use.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a SECOND Electron
 * instance launched against the shared webpack renderer dev server has a documented failure mode
 * where new dock tabs never render (see isolated.fixture.ts). The scenarios run as test.step()s
 * sharing the one instance and one loaded chapter, in an order that leaves the tree-splitting
 * annotation until last.
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB (installed
 * by the C# backend into the empty root): `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/standard-view-annotation-positions.spec.ts`.
 */
import { FrameLocator } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  LAUNCH_PHASE_TIMEOUT_MS,
  sendPapiRequestOnce,
  waitForPapiMethodRegistered,
} from '../../../fixtures/helpers';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

const WEBSOCKET_PORT = 8876;
const REQUEST_TIMEOUT_MS = 30_000;

/**
 * John 2:4 is `\wj "Woman, what does that have to do with you and me? My hour has not yet
 * come."\wj*` — one plain text string, so its settled offsets are the string's own indexes with
 * nothing in between. Chapter 2 deliberately: a `ScriptureRange` built from USJ document locations
 * carries no verse number, so the editor extension derives one by walking the loaded chapter's USJ
 * for a book id (`convertScriptureRangeToEditorRange` in platform-scripture-editor.utils.ts); only
 * a chapter-1 USJ carries the `id` marker, so a chapter-2 target exercises that book-id fallback
 * end to end on every `ScriptureRange` this spec sends.
 */
const TARGET_REFERENCE = 'John 2:4';
const TARGET_VERSE_REF = { book: 'JHN', chapterNum: 2, verseNum: 4 };
const CHAR_MARKER = 'wj';
/**
 * Pins the fixture data: a sample project whose `\wj` content at this verse drifted would silently
 * move the offsets.
 */
const EXPECTED_CHAR_TEXT =
  '“Woman, what does that have to do with you and me? My hour has not yet come.”';

/**
 * Annotation identity. The editor prefixes an externally-set annotation type with `external-` and
 * renders the mark as `<mark class="editor-typed-mark-external-<type> annotationId-<id>">`, so both
 * halves double as locators. Both are spelled to be valid CSS class name suffixes.
 */
const ANNOTATION_TYPE = 'spelling';
const ANNOTATION_ID = 'settled-offset-probe';

/** The display separator the editor places between an opening marker glyph and its content. */
const NBSP = '\u00a0';

/** The PDP factory that layers the USJ `projectInterface`s over the C# Paratext projects. */
const SCRIPTURE_EXTENDER_PDP_ID_METHOD =
  'object:platformScripture.scriptureExtenderPdpf-pdpf.getProjectDataProviderId';

/** A USJ node: a marker object whose `content` holds text and further marker objects. */
interface UsjMarkerObject {
  type: string;
  marker?: string;
  content?: (string | UsjMarkerObject)[];
}

/** The USJ document the PDP returns for one chapter. */
interface UsjDocument {
  content?: (string | UsjMarkerObject)[];
}

/** Where a char span's text sits in a USJ document, in the coordinates the editor is addressed in. */
interface CharSpanTextLocation {
  /** JSONPath to the text string itself, e.g. `$.content[6].content[1].content[0]`. */
  jsonPath: string;
  /** The text string at that path. */
  text: string;
}

/** A document location as the editor reports it back through `getSelection`. */
interface ReportedDocumentLocation {
  jsonPath?: string;
  offset?: number;
}

/** The selection shape `getSelection` resolves to (`ScriptureRangeUsjVerseRefChapterLocation`). */
interface ReportedSelection {
  start?: { documentLocation?: ReportedDocumentLocation };
  end?: { documentLocation?: ReportedDocumentLocation };
}

/** Build the JSONPath for a chain of `content` indexes, the form USJ document locations use. */
function contentJsonPath(indexes: readonly number[]): string {
  return indexes.reduce((path, index) => `${path}.content[${index}]`, '$');
}

/**
 * Depth-first search for the first char span with `marker` whose content starts with plain text,
 * returning that text and its JSONPath. Recursive rather than index-arithmetic against a known
 * shape so the location stays correct if the chapter gains or loses content before the span.
 */
function findCharSpanText(
  content: readonly (string | UsjMarkerObject)[],
  marker: string,
  indexes: readonly number[],
): CharSpanTextLocation | undefined {
  return content.reduce<CharSpanTextLocation | undefined>((found, node, index) => {
    if (found || typeof node === 'string') return found;
    const nodeIndexes = [...indexes, index];
    const children = node.content ?? [];
    if (node.type === 'char' && node.marker === marker) {
      const textIndex = children.findIndex((child) => typeof child === 'string');
      const text = children[textIndex];
      if (typeof text === 'string')
        return { jsonPath: contentJsonPath([...nodeIndexes, textIndex]), text };
    }
    return findCharSpanText(children, marker, nodeIndexes);
  }, undefined);
}

/**
 * Read one chapter's USJ straight from the project data provider — the editor's own source, and the
 * oracle the editor's answers are measured against here.
 */
async function getChapterUsj(verseRef: typeof TARGET_VERSE_REF): Promise<UsjDocument> {
  await waitForPapiMethodRegistered(
    SCRIPTURE_EXTENDER_PDP_ID_METHOD,
    WEBSOCKET_PORT,
    LAUNCH_PHASE_TIMEOUT_MS,
  );
  const pdpId = await sendPapiRequestOnce<string>(
    SCRIPTURE_EXTENDER_PDP_ID_METHOD,
    [SAMPLE_WEB_PROJECT_ID],
    WEBSOCKET_PORT,
    REQUEST_TIMEOUT_MS,
  );
  // A PDP's network object carries a `-data` suffix on top of the id its factory reports (the
  // platform's own `getDataProviderObjectId` rule). The C# factories report the suffixed name
  // already; the TypeScript layering factory this one comes from reports the bare id.
  const pdpObjectId = pdpId.endsWith('-data') ? pdpId : `${pdpId}-data`;
  return sendPapiRequestOnce<UsjDocument>(
    `object:${pdpObjectId}.getChapterUSJ`,
    [verseRef],
    WEBSOCKET_PORT,
    REQUEST_TIMEOUT_MS,
  );
}

/** JSON-RPC method name for one method on an editor's web view controller network object. */
function webViewControllerMethod(editorId: string, method: string): string {
  return `object:webViewController${editorId}.${method}`;
}

/** A chapter-relative USJ location for `jsonPath` at `offset`, the shape a `ScriptureRange` takes. */
function chapterLocation(jsonPath: string, offset: number) {
  return {
    verseRef: TARGET_VERSE_REF,
    granularity: 'chapter',
    documentLocation: { jsonPath, offset },
  };
}

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor settled positions', () => {
  test('programmatic positions inside a char marker address the text they name', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, a chapter load and
    // three editor round trips). 3x "slow" budget — see standard-default-power-mode.spec.ts.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame: FrameLocator = mainPage.frameLocator(
      `iframe[data-web-view-id="${editorId}"]`,
    );
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await navigateToolbarBcv(mainPage, TARGET_REFERENCE);
    // `.first()`: an open footnote popover carries its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    await expect(editorInput).toBeAttached({ timeout: 60_000 });
    // Positive control, and the gate that the chapter finished loading before its USJ is read.
    await expect(editorInput).toContainText(EXPECTED_CHAR_TEXT, { timeout: 60_000 });
    // Standard view actually renders the char span's marker glyphs, so the NBSP separator that
    // makes these coordinates non-trivial is really present.
    await expect(
      editorInput.locator(`span.opening[data-marker="${CHAR_MARKER}"]`).first(),
    ).toBeAttached({ timeout: 30_000 });

    const chapterUsj = await getChapterUsj(TARGET_VERSE_REF);
    const charSpanText = findCharSpanText(chapterUsj.content ?? [], CHAR_MARKER, []);
    if (!charSpanText)
      throw new Error(
        `No \\${CHAR_MARKER} char span with plain text content in ${TARGET_REFERENCE}'s USJ`,
      );
    expect(charSpanText.text).toBe(EXPECTED_CHAR_TEXT);

    const { jsonPath, text: charText } = charSpanText;
    const controllerSetAnnotation = webViewControllerMethod(editorId, 'setAnnotation');
    await waitForPapiMethodRegistered(
      controllerSetAnnotation,
      WEBSOCKET_PORT,
      LAUNCH_PHASE_TIMEOUT_MS,
    );

    /** The editor's current selection, or undefined while the controller is still waiting for one. */
    const readSelection = async (): Promise<ReportedSelection | undefined> => {
      try {
        return await sendPapiRequestOnce<ReportedSelection>(
          webViewControllerMethod(editorId, 'getSelection'),
          [],
          WEBSOCKET_PORT,
          REQUEST_TIMEOUT_MS,
        );
      } catch {
        // The controller blocks its first caller until the editor reports a selection, so a slow
        // first report is a retry, not a result.
        return undefined;
      }
    };

    await test.step("a caret clicked to the span's end reports the span text's own last offset", async () => {
      // Click just inside the left edge of the closing glyph — the insertion point immediately
      // BEFORE `\wj*`, which is the end of the span's text (a plain click lands mid-glyph at an
      // unpredictable offset). Reaching the position by gesture is what makes this the LIVE→USJ
      // direction: nothing translated coordinates on the way in, so the number the editor reports
      // answers only to where the caret physically sits.
      const closingGlyph = editorInput
        .locator(`span.closing[data-marker="${CHAR_MARKER}"]`)
        .first();
      const glyphBox = await closingGlyph.boundingBox();
      if (!glyphBox) throw new Error('The char span closing glyph has no bounding box');
      await closingGlyph.click({ position: { x: 1, y: glyphBox.height / 2 } });

      // The editor reports asynchronously, so poll for the caret to land in the span's text; the
      // offset below is then a hard assertion.
      await expect
        .poll(async () => (await readSelection())?.start?.documentLocation?.jsonPath, {
          timeout: 30_000,
        })
        .toBe(jsonPath);

      const selection = await readSelection();
      // The span text's own length, not one more: the NBSP separator physically precedes that text
      // in the editor and is not part of the text the USJ addresses.
      expect(selection?.start?.documentLocation?.offset).toBe(charText.length);
      expect(selection?.end?.documentLocation?.offset).toBe(charText.length);
    });

    await test.step("selecting the span's last two characters highlights exactly those characters", async () => {
      await sendPapiRequestOnce(
        webViewControllerMethod(editorId, 'selectRange'),
        [
          {
            start: chapterLocation(jsonPath, charText.length - 2),
            end: chapterLocation(jsonPath, charText.length),
          },
        ],
        WEBSOCKET_PORT,
        REQUEST_TIMEOUT_MS,
      );

      // What the browser highlights is the oracle. Asking the editor to report the range back
      // would prove nothing: a shift applied on the way in and again on the way out cancels.
      await expect
        .poll(
          async () =>
            editorInput.evaluate((root) => root.ownerDocument.getSelection()?.toString() ?? ''),
          { timeout: 20_000 },
        )
        .toBe(charText.slice(-2));
    });

    await test.step('a collapsed selectRange at settled offset 0 lands inside the span text, not on the separator', async () => {
      const location = chapterLocation(jsonPath, 0);
      await sendPapiRequestOnce(
        webViewControllerMethod(editorId, 'selectRange'),
        // `start` and `end` at the same location is how a caller asks for a collapsed selection (a
        // cursor position, not a range) — the shape `comment-list.web-view.tsx` sends.
        [{ start: location, end: location }],
        WEBSOCKET_PORT,
        REQUEST_TIMEOUT_MS,
      );

      // The browser's own selection is the oracle for where the caret visually lands: the span's
      // content is one DOM text node holding `<NBSP>` followed by the span's text, so a caret at
      // settled offset 0 must sit at DOM offset 1 in that node — immediately after the NBSP,
      // immediately before the first character of the span's text.
      await expect
        .poll(
          async () =>
            editorInput.evaluate((root) => {
              const sel = root.ownerDocument.getSelection();
              return {
                anchorText: sel?.anchorNode?.textContent ?? undefined,
                anchorOffset: sel?.anchorOffset ?? undefined,
                isCollapsed: sel?.isCollapsed ?? undefined,
              };
            }),
          { timeout: 20_000 },
        )
        .toEqual({ anchorText: NBSP + charText, anchorOffset: 1, isCollapsed: true });

      // The editor reports app-placed selections explicitly, so the webViewController's own
      // getSelection() is checked too, not just the DOM. Poll on the OFFSET, not the jsonPath: the
      // previous step's selection already sits at this same jsonPath (offset `charText.length - 2`),
      // so polling on jsonPath alone would match the stale selection immediately.
      await expect
        .poll(async () => (await readSelection())?.start?.documentLocation?.offset, {
          timeout: 30_000,
        })
        .toBe(0);

      const selection = await readSelection();
      // Offset 0, not 1: the NBSP separator is display scaffolding the USJ the editor reports
      // through does not address.
      expect(selection?.start?.documentLocation).toEqual({ jsonPath, offset: 0 });
      expect(selection?.end?.documentLocation).toEqual({ jsonPath, offset: 0 });
    });

    await test.step("an annotation over the span's last two characters marks exactly those characters", async () => {
      const expectedAnnotatedText = charText.slice(-2);
      await sendPapiRequestOnce(
        controllerSetAnnotation,
        [
          {
            start: chapterLocation(jsonPath, charText.length - 2),
            end: chapterLocation(jsonPath, charText.length),
          },
          ANNOTATION_TYPE,
          ANNOTATION_ID,
        ],
        WEBSOCKET_PORT,
        REQUEST_TIMEOUT_MS,
      );

      const annotatedMark = editorInput.locator(`mark.annotationId-${ANNOTATION_ID}`);
      await expect(annotatedMark).toHaveCount(1, { timeout: 30_000 });
      // The annotation type routed through as well, not just some mark.
      await expect(annotatedMark).toHaveClass(
        new RegExp(`(^|\\s)editor-typed-mark-external-${ANNOTATION_TYPE}(\\s|$)`),
      );

      const annotatedText = await annotatedMark.textContent();
      // Exact, not `toContainText`: an off-by-one marks two characters just like a correct call
      // does, so only the identity of those characters separates the two outcomes. The failure
      // this guards against yields `charText.slice(-3, -1)` — the two characters BEFORE the ones
      // the caller addressed — because the span's NBSP display separator occupies no USJ offset.
      expect(annotatedText).toBe(expectedAnnotatedText);
      expect(annotatedText).not.toContain(NBSP);
      // Marking a range must not move or consume the span's marker glyphs.
      await expect(annotatedMark.locator('span.opening, span.closing')).toHaveCount(0);
      await expect(editorInput).toContainText(charText);
    });
  });
});
