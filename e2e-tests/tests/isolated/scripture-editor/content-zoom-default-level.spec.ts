/**
 * E2E for content zoom's per-area reset floor: a non-100% `platform.webViewContentZoom` Settings
 * default is what a per-area reset returns to, not 1.0.
 *
 * This is its own spec file (rather than a `test.step()` in `content-zoom.spec.ts`) because it
 * needs its own `seedSettings` — the isolated fixture seeds settings once, before Electron
 * launches, and a spec must never call `preConfigureSettings` itself (see the `IsolatedFixtures`
 * doc in `fixtures/isolated.fixture.ts`).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  CONTENT_ZOOM_COMMANDS,
  getEditorFrame,
  makeSampleProjectEditable,
  openEditableScriptureEditorForProject,
  readFactor,
  SAMPLE_WEB_PROJECT_ID,
  sendCommandWithId,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
  // The fixture's documented seeding channel — specs must never call preConfigureSettings
  // themselves (see the IsolatedFixtures doc).
  seedSettings: { 'platform.webViewContentZoom': 1.2 },
});

test.describe('scripture editor content zoom — non-default Settings level', () => {
  test('a per-area reset returns to the seeded Settings default, not 1.0', async ({ mainPage }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await test.step('the editor opens at the seeded default with no per-area level stored', async () => {
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.2);
    });

    await test.step('zooming in steps from the seeded default', async () => {
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.in, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.3);
    });

    await test.step('reset lands on the seeded default (1.2), not 1.0, and the indicator says so', async () => {
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.2);

      // Format is `<label> · <percent>` (web-view-content-zoom.service.ts's resetContentZoom); the
      // percent half uses a narrow no-break space before `%`, stripped here so whitespace shape
      // doesn't matter.
      const indicator = editorFrame.locator('#platform-content-zoom-indicator');
      await expect
        .poll(async () => (await indicator.textContent())?.replace(/\s/gu, ''), { timeout: 2_000 })
        .toBe('Default·120%');
    });
  });
});
