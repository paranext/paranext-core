/**
 * E2E for the Bible Texts panel's per-pane content zoom (`platformScriptureEditor.bibleTexts`, area
 * id `bible-texts`): Ctrl+`=` and Ctrl+wheel scale the panel's content while the resource-selector
 * header stays fixed, Ctrl+`0` returns it to the Settings default, the level is remembered under a
 * `resource:<container project>:bible-texts` key, and the Scripture editor's own `main` area is
 * untouched throughout.
 *
 * This is the one content-zoom e2e for the Resources views that runs on this machine:
 * `tests/enhanced-resources/` needs real Marble/DBL resources this box does not have. To get real
 * chapter content into the panel without one, the container project's PERSONAL (user-scope)
 * reference list is pointed at a second disposable project copy — `resolveReferenced` in
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
 * `resource-text-panel.component.tsx` — Task 5's area id.
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
    // `containerProject` is both the project opened in the Scripture editor (case 5's `main` area)
    // and the panel's own container identity (`openResourceText`'s second argument becomes the
    // panel definition's `projectId`, which is what the memory key is built from — see
    // `memoryIdentityFor` in `web-view-content-zoom.service.ts`). `sourceProject` supplies the actual
    // chapter text; it is never opened anywhere directly.
    containerProject = await createCommentTestProject([], '_container');
    sourceProject = await createCommentTestProject([], '_source');
  });

  test.afterAll(() => {
    cleanupCommentTestProject(containerProject);
    cleanupCommentTestProject(sourceProject);
  });

  test('Ctrl+= and Ctrl+wheel scale the panel, Ctrl+0 resets it, the level is remembered, and the editor is untouched', async ({
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

    // Read BEFORE touching the Bible Texts panel at all, so case 5 below compares against the
    // editor's own genuine starting point rather than assuming it is untouched by construction.
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

    // The resource-selector dropdown's trigger is the only button the panel renders outside the
    // ContentZoomRoot (case 1's "unchanged header height" needs an element the area's zoom cannot
    // reach).
    const headerButton = bibleTextsFrame.getByRole('button').first();

    // Read this pane's own starting factor rather than assuming the Settings default is 1.0 — a
    // prior local run can have left a different default behind.
    const before = await readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID);

    let afterCtrlPlus = before;
    await test.step('Ctrl+= with the panel focused raises --platform-content-zoom-bible-texts, and the header height is unchanged', async () => {
      const headerBoxBefore = await headerButton.boundingBox();
      if (!headerBoxBefore) throw new Error('Resource-selector header not found');

      await editorContainer.click();
      await mainPage.keyboard.press('Control+=');
      await expect.poll(() => readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID)).not.toBe(before);
      afterCtrlPlus = await readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID);
      expect(afterCtrlPlus).toBeCloseTo(before + 0.1, 5);

      await expect
        .poll(() => bibleTextsFrame.locator(INDICATOR_SELECTOR).getAttribute('data-area'), {
          timeout: 2_000,
        })
        .toBe(BIBLE_TEXTS_AREA_ID);
      await expect
        .poll(() => readIndicatorText(bibleTextsFrame), { timeout: 2_000 })
        .toBe(`${Math.round(afterCtrlPlus * 100)}%`);

      const headerBoxAfter = await headerButton.boundingBox();
      if (!headerBoxAfter) throw new Error('Resource-selector header not found after zoom');
      expect(Math.abs(headerBoxAfter.height - headerBoxBefore.height)).toBeLessThanOrEqual(2);
    });

    let afterWheel = afterCtrlPlus;
    await test.step('Ctrl+wheel over the marked area changes the same variable', async () => {
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

    await test.step('Ctrl+0 returns it to the Settings default', async () => {
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(bibleTextsFrame, BIBLE_TEXTS_AREA_ID)).toBe(before);
    });

    await test.step("the editor's own area is untouched", async () => {
      const mainAreaAfter = await readFactor(editorFrame, '');
      expect(mainAreaAfter).toBe(mainAreaBefore);
    });
  });
});
