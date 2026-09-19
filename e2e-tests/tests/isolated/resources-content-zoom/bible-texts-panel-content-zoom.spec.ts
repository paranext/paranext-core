/**
 * E2E for the Bible Texts panel's per-pane content zoom (`platformScriptureEditor.bibleTexts`, area
 * id `bible-texts`): Ctrl+`=` and Ctrl+wheel scale the panel's content while the resource-selector
 * header stays fixed, Ctrl+`0` returns it to the Settings default, the level reaches memory under a
 * `resource:<container project>:bible-texts` key (and leaves it again on reset), and the Scripture
 * editor's own `main` area is untouched throughout. Restore-on-reopen is not exercised here — it is
 * the Enhanced Resources spec's case, and the platform's own suites cover the read path.
 *
 * This is the one content-zoom e2e for the Resources views that runs without real resources:
 * `tests/enhanced-resources/` needs real Marble/DBL resources instead. To get real chapter content
 * into the panel without one, the container project's PERSONAL (user-scope) reference list is
 * pointed at a second disposable project copy — `resolveReferenced` in
 * `downloaded-resources.utils.ts` resolves an ordinary Paratext project reference without any DBL
 * catalog involved, and `useEffectiveResourceReferenceList` merges the user list in alongside the
 * (empty, for a fresh project) admin one.
 *
 * ONE test() with test.step()s sharing one Electron instance, matching every other content-zoom
 * suite: a second Electron instance against the shared renderer dev server has a documented
 * dock-tab failure mode.
 *
 * `npm run test:e2e:isolated resources-content-zoom`
 */
import { type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  cleanupCommentTestProject,
  createCommentTestProject,
  type CommentTestProject,
} from '../../../fixtures/comment-test-helpers';
import {
  ctrlWheel,
  areaBox,
  INDICATOR_SELECTOR,
  readContentZoomMemory,
  readIndicatorText,
} from '../../../fixtures/content-zoom-helpers';
import { sendPapiRequestOnce, waitForPapiMethodRegistered } from '../../../fixtures/helpers';
import {
  getEditorFrame,
  openEditableScriptureEditorForProject,
  readFactor,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

// Power mode, matching the other content-zoom specs: Simple mode auto-opens the most recently used
// project on launch, which races this spec's own project setup for the initial dock layout.
//
// The Bible Texts panel itself is Simple-mode-only (see `resource-text-panel.component.tsx`'s
// `editor-container-simple` comment), so this spec exercises it in a mode it does not ship in — a
// known limitation of this coverage, not something to fix by converting the spec to Simple mode.
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
});

/**
 * `platformScriptureEditor.openResourceText` (`main.ts`), restated because e2e specs cannot import
 * extension source.
 */
const OPEN_RESOURCE_TEXT_COMMAND = 'platformScriptureEditor.openResourceText';

/**
 * `contentZoomArea` for the Bible Texts tab (`resourceType === 'ScriptureResource'`) in
 * `resource-text-panel.component.tsx`.
 */
const BIBLE_TEXTS_AREA_ID = 'bible-texts';

/**
 * `RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID` (`resource-text-panel.component.tsx`) — the wrapper
 * around the read-only `Editorial` that only mounts once the panel has resolved a chapter, so
 * waiting for it is what tells a genuinely rendered chapter apart from the panel's own loading,
 * missing-book or blank-chapter states (all of which the `ContentZoomRoot` above them also wraps).
 */
const RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID = 'resource-text-editor-container';

/**
 * Points `containerProjectId`'s PERSONAL reference list at `sourceProject`, so the Bible Texts
 * panel opened for `containerProjectId` resolves a real chapter with no DBL resource involved. Goes
 * through the USER-scope setter (`setUserReferencedProjectsAndResources`) rather than the
 * project-level `platformScripture.referencedProjectsAndResources` setting: the latter is
 * admin-gated (`text-collection-schema.spec.ts`), while the personal list needs no special project
 * role.
 */
async function referenceProjectAsBibleText(
  page: Page,
  containerProjectId: string,
  sourceProject: CommentTestProject,
): Promise<void> {
  await page.evaluate(
    async ({ containerId, sourceId, sourceName }) => {
      // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
      // scripture-text-grid-zoom.spec.ts's afterEach cleanup).
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const win = window as unknown as {
        papi: {
          projectDataProviders: {
            get: (
              pdpType: string,
              projectId: string,
            ) => Promise<{
              setUserReferencedProjectsAndResources: (value: unknown) => Promise<boolean>;
            }>;
          };
        };
      };
      const pdp = await win.papi.projectDataProviders.get(
        'platformScripture.textConnectionSettings',
        containerId,
      );
      await pdp.setUserReferencedProjectsAndResources({
        dataVersion: '1.1.0',
        items: [{ type: 'project', name: sourceName, id: sourceId }],
      });
    },
    {
      containerId: containerProjectId,
      sourceId: sourceProject.projectId,
      sourceName: sourceProject.shortName,
    },
  );
}

test.describe('Bible Texts panel content zoom', () => {
  let containerProject: CommentTestProject;
  let sourceProject: CommentTestProject;

  test.beforeAll(async () => {
    // `containerProject` is both the project opened in the Scripture editor (the editor's own
    // `main` area) and the panel's own container identity (`openResourceText`'s second argument
    // becomes the panel definition's `projectId`, which is what the memory key is built from — see
    // `memoryIdentityFor` in `web-view-content-zoom.service.ts`). `sourceProject` supplies the actual
    // chapter text; it is never opened anywhere directly.
    containerProject = await createCommentTestProject([], '_container');
    sourceProject = await createCommentTestProject([], '_source');
  });

  test.afterAll(() => {
    cleanupCommentTestProject(containerProject);
    cleanupCommentTestProject(sourceProject);
  });

  test('Ctrl+= and Ctrl+wheel scale the panel, Ctrl+0 resets it, the level reaches memory, and the editor is untouched', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, two project copies, several zoom gestures each
    // waiting on a debounced write). Give it Playwright's 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);

    const editorId = await openEditableScriptureEditorForProject(
      mainPage,
      containerProject.projectId,
    );
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Read BEFORE touching the Bible Texts panel at all, so the editor-untouched check below
    // compares against the editor's own genuine starting point rather than assuming it is untouched
    // by construction.
    //
    // Polled rather than read once: `readFactor` returns 0 (`Number('')`) before the bootstrap has
    // written the variable onto this pane, so a bare read here can race that write and record a
    // vacuous 0 — which would let the editor-untouched check below silently degrade to `0 === 0` if
    // the editor ever stopped setting this variable at all. `toBeGreaterThan(0)` rules out both the
    // race and the vacuous baseline, without assuming the Settings default is exactly 1 (the panel's
    // own `before` factor below makes that same choice, for the same reason).
    await expect.poll(() => readFactor(editorFrame, '')).toBeGreaterThan(0);
    const mainAreaBefore = await readFactor(editorFrame, '');

    await referenceProjectAsBibleText(mainPage, containerProject.projectId, sourceProject);

    await waitForPapiMethodRegistered(`command:${OPEN_RESOURCE_TEXT_COMMAND}`);
    const bibleTextsPanelId = await sendPapiRequestOnce<string | undefined>(
      `command:${OPEN_RESOURCE_TEXT_COMMAND}`,
      ['ScriptureResource', containerProject.projectId],
      undefined,
      60_000,
    );
    if (!bibleTextsPanelId) throw new Error('openResourceText returned no web view id');
    await mainPage
      .locator(`iframe[data-web-view-id="${bibleTextsPanelId}"]`)
      .waitFor({ state: 'attached', timeout: 60_000 });
    const bibleTextsFrame = await getEditorFrame(mainPage, bibleTextsPanelId);

    // Wait for a genuinely rendered chapter — the panel's pre-content states (no project,
    // selecting/installing, readiness not configured, install failed) mark no zoom area at all, so
    // asserting before real content arrives would fail for that reason rather than a real one.
    const editorContainer = bibleTextsFrame.getByTestId(RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID);
    await editorContainer.waitFor({ timeout: 60_000 });

    // Measure the rendered verse text itself, never a wrapper. The container above is
    // `tw:flex-1 tw:overflow-auto`, so the flex layout fixes its outer box and a height ratio taken
    // on it reads 1.0 even with the zoom rule broken. A verse span's height is intrinsic to its own
    // rendered text at the pane's current zoom, so it is what actually moves when the rule applies.
    //
    // The same element is the established measurement target in the Scripture editor's own
    // `content-zoom.spec.ts`. Don't reason about the editor's internal `.editor-container` box here:
    // `extensions/src/platform-scripture-editor/src/_editor-overrides.scss` documents its
    // `height`/`overflow-y` as currently inert, so the box is content-driven in some contexts and
    // flex-sized in others.
    const verse1 = editorContainer
      .locator('.editor-container span[data-marker="v"][data-number="1"]')
      .first();
    await verse1.waitFor({ timeout: 60_000 });

    // The resource-selector dropdown's trigger is the only button the panel renders outside the
    // ContentZoomRoot — the header-height check below needs an element the area's zoom cannot reach.
    const headerButton = bibleTextsFrame.getByRole('button').first();
    // Self-verifying: proves this matched the resource-selector trigger outside the ContentZoomRoot,
    // not some other button the panel might grow inside the zoomed area.
    const headerHasZoomRootAncestor = await headerButton.evaluate(
      (element) => !!element.closest('[data-platform-content-zoom-root]'),
    );
    expect(headerHasZoomRootAncestor).toBe(false);

    // Read this pane's own starting factor rather than assuming the Settings default is 1.0 — a
    // prior local run can have left a different default behind.
    const before = await readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID);

    let afterCtrlPlus = before;
    // Populated inside the Ctrl+= step below, at the exact before/after of that single zoom step;
    // asserted several steps later (see the dedicated step after the memory check) rather than right
    // where it is measured. That placement is deliberate: a `test.step` failure aborts the rest of
    // the test, so asserting it here would, on a failure, also swallow the evidence that the
    // factor/indicator/wheel/memory checks below it are unaffected. Asserting it last, after those
    // have already run and passed, means a failure of this check alone narrows the fault to the CSS
    // rule that consumes the zoom variable — the other checks having already passed rules out a
    // broken report path as the cause.
    let contentRatioAfterCtrlPlus = 1;
    await test.step('Ctrl+= with the panel focused raises --platform-content-zoom-bible-texts, and leaves the header height unchanged', async () => {
      const headerBoxBefore = await headerButton.boundingBox();
      if (!headerBoxBefore) throw new Error('Resource-selector header not found');
      const verseBoxBefore = await verse1.boundingBox();
      if (!verseBoxBefore) throw new Error('Verse 1 not found');

      await editorContainer.click();
      await mainPage.keyboard.press('Control+=');
      await expect.poll(() => readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID)).not.toBe(before);
      afterCtrlPlus = await readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID);
      expect(afterCtrlPlus).toBeCloseTo(before + 0.1, 5);

      // Measured here, at the exact before/after of this one zoom step, but not yet asserted — see
      // the comment on `contentRatioAfterCtrlPlus` above.
      const verseBoxAfter = await verse1.boundingBox();
      if (!verseBoxAfter) throw new Error('Verse 1 not found after zoom');
      contentRatioAfterCtrlPlus = verseBoxAfter.height / verseBoxBefore.height;

      await expect
        .poll(() => bibleTextsFrame.locator(INDICATOR_SELECTOR).getAttribute('data-area'), {
          timeout: 2_000,
        })
        .toBe(BIBLE_TEXTS_AREA_ID);
      // These two assertions check the badge's CONTENT, not that a user actually saw it: the hide
      // timer only fades the badge to `opacity: 0` and never removes it, and `textContent()` does
      // not require visibility.
      await expect
        .poll(() => readIndicatorText(bibleTextsFrame), { timeout: 2_000 })
        .toBe(`${Math.round(afterCtrlPlus * 100)}%`);

      // The exact bound, not a slack range: nothing legitimate changes this control's height (a
      // scrollbar appearing in the content area changes its width, not its height), so any
      // difference at all is a regression.
      const headerBoxAfter = await headerButton.boundingBox();
      if (!headerBoxAfter) throw new Error('Resource-selector header not found after zoom');
      expect(headerBoxAfter.height).toBe(headerBoxBefore.height);
    });

    let afterWheel = afterCtrlPlus;
    await test.step('Ctrl+wheel over the marked area changes the same variable', async () => {
      // Aimed at the area's own centre rather than a content element (the precedent's approach):
      // safe only because the factor is still near 1 here, so the area's box still fits inside the
      // window. A taller area, or a much larger accumulated factor, can put its centre outside the
      // viewport, where the wheel event would land nowhere.
      const box = await areaBox(bibleTextsFrame, BIBLE_TEXTS_AREA_ID);
      await ctrlWheel(mainPage, box, -120);
      await expect
        .poll(() => readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID))
        .not.toBe(afterCtrlPlus);
      afterWheel = await readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID);
      expect(afterWheel).toBeCloseTo(afterCtrlPlus + 0.1, 5);
    });

    // Checked here, before the reset below: `resetContentZoom` deletes the memory entry outright
    // rather than writing back the default, so a level worth finding in memory has to be read while
    // the pane is still at a non-default level.
    await test.step('memory key shape — resource:<container project>:bible-texts', async () => {
      const normalizedId = containerProject.projectId.toUpperCase();
      await expect
        .poll(
          async () =>
            (await readContentZoomMemory(mainPage))[
              `resource:${normalizedId}:${BIBLE_TEXTS_AREA_ID}`
            ],
        )
        .toBe(afterWheel);
    });

    await test.step('the Ctrl+= step actually scaled the rendered verse text, not just the variable', async () => {
      // The factor variable moving does not by itself prove the rule that consumes it ever applied:
      // `pushContentZoom` writes `--platform-content-zoom-bible-texts` for every reported area
      // regardless of whether `zoom: var(--platform-content-zoom-bible-texts, …)` matches anything,
      // so a broken rule would leave the factor, the memory entry, and the indicator all correct with
      // nothing on screen actually bigger — exactly what the checks above this one, run and passed,
      // cannot tell apart from a working rule. The verse's own rendered height is measured in the
      // direction that would catch that: as a ratio against its own prior size, not re-derived from
      // the factor above (which would just be checking the same variable twice). `toBeCloseTo(1.1,
      // 1)` bounds the match within 0.05 of 1.1 (1.05–1.15), which a ratio of 1.0 — what a broken rule
      // produces — cannot satisfy.
      expect(contentRatioAfterCtrlPlus).toBeCloseTo(1.1, 1);
    });

    await test.step('Ctrl+0 returns the panel to its starting factor and drops the memory entry', async () => {
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID)).toBe(before);

      // `resetContentZoom` deletes the pane's memory entry outright rather than writing back the
      // default, and that is the mechanism by which sibling panes of the same identity follow a
      // reset — a regression that left the key behind would silently re-seed the old level into the
      // next-opened pane. The write is on the same 250 ms debounce as every other memory write, so
      // poll rather than reading once.
      const normalizedId = containerProject.projectId.toUpperCase();
      await expect
        .poll(
          async () =>
            (await readContentZoomMemory(mainPage))[
              `resource:${normalizedId}:${BIBLE_TEXTS_AREA_ID}`
            ],
        )
        .toBeUndefined();
    });

    await test.step("the editor's own area is untouched", async () => {
      const mainAreaAfter = await readFactor(editorFrame, '');
      expect(mainAreaAfter).toBe(mainAreaBefore);
    });
  });
});
